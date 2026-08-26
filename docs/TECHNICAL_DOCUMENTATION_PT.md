# Verificador de interações entre medicamentos e body art - Documentação técnica

**Outros idiomas:** [English](../TECHNICAL_DOCUMENTATION.md) · [Français](TECHNICAL_DOCUMENTATION_FR.md) · [Italiano](TECHNICAL_DOCUMENTATION_IT.md) · [Español](TECHNICAL_DOCUMENTATION_ES.md) · [Deutsch](TECHNICAL_DOCUMENTATION_DE.md) · [Nederlands](TECHNICAL_DOCUMENTATION_NL.md)

---

## Índice

1. [Arquitetura](#arquitetura)
2. [Estrutura dos ficheiros](#estrutura-dos-ficheiros)
3. [Esquemas de dados](#esquemas-de-dados)
4. [O sistema de internacionalização](#o-sistema-de-internacionalização)
5. [Pesquisa por proximidade: ligações ao Maps na língua local](#pesquisa-por-proximidade-ligações-ao-maps-na-língua-local)
6. [Provas e fontes](#provas-e-fontes)
7. [Estado e armazenamento](#estado-e-armazenamento)
8. [Incorporação](#incorporação)
9. [Personalização](#personalização)
10. [Segurança](#segurança)
11. [Navegadores suportados](#navegadores-suportados)

---

## Arquitetura

HTML, CSS e JavaScript ES2015+ estáticos. Sem framework, sem empacotador, sem gestor de pacotes e sem chamadas de rede em execução, à exceção das ligações ao Google Maps que o utilizador decide clicar.

Cada conjunto de dados está **congelado em tempo de compilação dentro de um ficheiro JavaScript**, deliberadamente. A ferramenta nunca chama o SUPP.AI, a PubMed nem qualquer outra API enquanto um cliente a utiliza. Não pode, portanto, avariar porque um terceiro está indisponível, não pode revelar o que alguém está a consultar, e o seu comportamento é reproduzível apenas a partir do repositório.

A ordem de carregamento importa: os ficheiros de dados declaram `const` de topo que o `app.js` lê, por isso o `app.js` vem em último lugar.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (texto clínico, 6 idiomas)
  -> js/medication-sources.js    (citações aprovadas)
  -> js/supplement-stacking.js   (instantâneo do SUPP.AI)
  -> js/geo-search.js            (termos de pesquisa do Maps + mapa de fusos)
  -> js/app.js                   (dados, interface, apresentação)
```

Seis separadores, comutados no cliente, sem encaminhamento: `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## Estrutura dos ficheiros

| Caminho | Tamanho | Função |
|---|---|---|
| `index.html` | ~43 KB | Marcação, JSON-LD, estrutura de separadores, ponte de tema para iframe |
| `css/style.css` | ~60 KB | Todo o estilo dos componentes, claro e escuro através de tokens em `:root` |
| `css/a11y.css` | ~1 KB | Utilitários de foco visível e leitor de ecrã |
| `css/print.css` | ~2 KB | Regras de impressão para a ficha do profissional |
| `js/app.js` | ~181 KB | Dados `CATEGORIES`, 65 funções, toda a apresentação |
| `js/med-content-i18n.js` | ~127 KB | 684 cadeias clínicas escritas à mão |
| `js/supplement-stacking.js` | ~48 KB | 66 suplementos, 49 pares, 132 artigos |
| `js/geo-search.js` | ~14 KB | 38 línguas de pesquisa, 217 correspondências de fusos |
| `js/medication-sources.js` | ~2 KB | Citações da PubMed aprovadas por medicamento |

## Esquemas de dados

### `CATEGORIES` (em `app.js`)

A única fonte de verdade para os medicamentos. 13 categorias, 38 medicamentos.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // chave estável, usada por todos os outros ficheiros
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // texto de origem em inglês
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // sinónimos de pesquisa, marcas regionais incluídas
      }
    ]
  }
]
```

`medMap` é uma tabela plana `id -> medicamento` construída a partir desta estrutura no arranque.

Identificadores de categoria: `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**O nível diz respeito ao risco do procedimento, não à gravidade do medicamento.** `high` significa que a interação com uma agulha é significativa. Um medicamento vital pode perfeitamente ser `low`.

### `MED_CONTENT_I18N` (em `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 medicamentos x 3 campos x 6 idiomas = 684 cadeias. O inglês está em `CATEGORIES`, pelo que não é repetido aqui.

### `SUPPLEMENT_STACKING` (em `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Gerado a partir do SUPP.AI. Só são incluídos os pares com pelo menos um estudo humano ou clínico; os artigos retratados são excluídos. `cui` é o identificador de conceito UMLS, e é o que torna a correspondência auditável.

### `MEDICATION_SOURCES` (em `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` indica aquilo que o artigo está a sustentar. Um objeto vazio não apresenta qualquer linha de fontes, nunca um título vazio.

## O sistema de internacionalização

Duas camadas distintas, e confundi-las é o erro clássico:

1. **As cadeias de interface** estão em `TRANSLATIONS` (em `app.js`), indexadas por idioma e depois por chave, e são aplicadas através dos atributos `data-i18n` e `data-i18n-placeholder`.
2. **As cadeias clínicas** estão em `med-content-i18n.js` e são lidas com `medText(med, field)`.

`medText()` devolve o inglês quando falta uma tradução e levanta um sinalizador `medTextFellBack`, que apresenta um aviso visível. O silêncio não é opção: quem vê uma interface em português assumirá que a informação clínica foi revista em português.

Todas as vistas que não sejam a inglesa trazem um aviso permanente que declara a página traduzida e indica o inglês como versão de referência. Não é um cartaz de "tradução em curso": é permanente, porque a garantia não muda.

**O texto clínico é escrito à mão, não traduzido por máquina.** A ordem por que foi construído é a parte reutilizável: primeiro o francês, e apenas os medicamentos de nível elevado, porque essa era a única parte que um revisor conseguia realmente verificar antes de ir para o ar. Depois de revista, o seu vocabulário passou a ser fixo para os outros cinco idiomas. As decisões de terminologia estão registadas no cabeçalho de `med-content-i18n.js` e devem ser lidas antes de acrescentar um idioma.

## Pesquisa por proximidade: ligações ao Maps na língua local

O `geo-search.js` alimenta quatro ligações: estúdio, médico, farmácia e hospital.

**O rótulo do botão está no idioma de interface do leitor. A pesquisa no Maps está na língua do local onde ele se encontra fisicamente.** São deliberadamente diferentes. Quem procura `farmácia` em Banguecoque não encontra quase nada; `ร้านขายยา` encontra todas as farmácias da rua.

A localização é deduzida de `Intl.DateTimeFormat().resolvedOptions().timeZone` e convertida através de `GEO_SEARCH_ZONES` (217 entradas) numa das 38 línguas de pesquisa, com o inglês por omissão.

**Nunca é pedida autorização de geolocalização**, e essa é uma decisão de conceção, não um esquecimento:

- O Google Maps já centra uma pesquisa "perto de mim" no próprio dispositivo, pelo que as coordenadas não são necessárias para a pesquisa funcionar.
- A única coisa que a localização determina é a língua da pesquisa, e o fuso horário responde a isso sem janela de autorização, sem chave de API, sem chamada de rede e sem que qualquer dado pessoal saia da página.
- Uma janela de autorização numa página médica custa confiança, e todos os que recusam perdem a funcionalidade por completo.

O preço é que uma VPN declara o fuso errado: por isso a interface oferece uma escolha manual de língua, guardada em `localStorage`.

Na tabela constam apenas os fusos cuja língua **não** é o inglês; tudo o resto recai no inglês por omissão, que o Maps trata bem em todo o mundo.

Uma armadilha que convém preservar: a pesquisa tailandesa por um estúdio é `ร้านสัก`, nunca `สัก` sozinho, que também significa teca e devolve serrações.

O `geo-search.js` inclui uma autoverificação offline. Execute `node js/geo-search.js` para confirmar que cada língua tem os quatro termos, que cada fuso mapeado aponta para uma língua conhecida e que as línguas desconhecidas recaem corretamente no inglês.

## Provas e fontes

As regras que governam o conteúdo são mais rigorosas do que as que governam o código.

- **As afirmações sem suporte não são publicadas.** O álcool, o ibuprofeno e o naproxeno eram todos descritos como capazes de expulsar a tinta da pele. Duas pesquisas na Europe PMC não encontraram provas. O texto diz agora que o efeito na retenção da tinta não foi estudado.
- **As citações são anexadas mediante prova.** Um identificador isolado ao lado de uma frase permanece por verificar até uma pessoa confirmar que o artigo sustenta essa frase. O `medication-sources.js` só recebe citações aprovadas.
- **A ausência de dados escreve-se como ausência de dados**, nunca como ausência de risco.

Ao procurar literatura para sustentar uma afirmação, ordene por relevância e não por número de citações. Ordenar por citações devolve o que é mais famoso na área, não o que é mais pertinente para a pergunta.

## Estado e armazenamento

Todo o estado fica do lado do cliente. Nada é transmitido para lado nenhum.

| Chave de `localStorage` | Conteúdo |
|---|---|
| `ui_lang_v1` | Idioma de interface escolhido |
| `geo_search_lang_v1` | Escolha manual da língua de pesquisa no Maps |
| `readiness_assessment_autosave_v1` | Valores da calculadora de preparação |
| `recent_searches_v1` | Pesquisas recentes de medicamentos |
| `appointment_datetime` | Hora da marcação para as contagens decrescentes |

Cada leitura e cada escrita está envolvida num `try/catch`: as janelas privadas e os navegadores que bloqueiam dados de sites não podem partir a página.

## Incorporação

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

A página deteta `window.self !== window.top`, passa a escuro por omissão e depois escuta uma mensagem de tema:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

O `index.html` traz `noindex, nofollow` para que uma cópia incorporada nunca concorra com a página canónica nos resultados de pesquisa. Remova essa meta-etiqueta se a alojar como a sua própria página principal.

## Personalização

**Acrescentar um medicamento:** adicione-o ao array `CATEGORIES[].meds` adequado em `app.js`. Apenas `id`, `name`, `cat`, `sev`, `tattoo` e `piercing` são obrigatórios. Acrescente depois as seis traduções em `med-content-i18n.js` sob o mesmo `id`, ou a ferramenta recairá no inglês e mostrará o aviso de recurso.

**Acrescentar um idioma:** crie um bloco `TRANSLATIONS` para a interface, acrescente o idioma a cada medicamento em `med-content-i18n.js` e leia primeiro o cabeçalho de terminologia desse ficheiro, para que o vocabulário do ofício se mantenha coerente. Um idioma parcial é pior do que nenhum.

**Acrescentar uma língua de pesquisa no Maps:** acrescente uma entrada em `GEO_SEARCH_TERMS`, um endónimo em `GEO_SEARCH_LANG_NAMES` e os fusos em causa em `GEO_SEARCH_ZONES`. Depois execute `node js/geo-search.js`.

**Mudar o estilo:** tudo deriva de propriedades personalizadas CSS em `:root`, com uma substituição `.light-mode`. Altere os tokens, não os componentes.

## Segurança

- **Todo o conteúdo interpolado passa por `escHtml()`**, que neutraliza `&`, `<`, `>` e `"`. O DOM é construído com template literals: qualquer valor não neutralizado seria um ponto de injeção.
- **Nenhuma entrada do utilizador é transmitida.** Não há backend, não há chamadas analíticas e não há scripts de terceiros.
- **As ligações ao Maps trazem `rel="noopener noreferrer"`** e abrem num novo separador.
- **Não existe qualquer campo de credenciais, pagamento ou identidade na ferramenta.**

## Navegadores suportados

Qualquer navegador com ES2015, `Intl`, propriedades personalizadas CSS e `localStorage`: Chrome, Edge, Firefox, Safari e os equivalentes móveis. Não existe camada de polyfill nem passo de transpilação.

---

## Apoio

- Correio eletrónico: <support@poliinternational.com>
- Questões: <https://github.com/Poli-International/medication-interaction-checker/issues>
