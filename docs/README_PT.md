# Verificador de interações entre medicamentos e body art

> Verifique como os medicamentos sujeitos a receita, os analgésicos de venda livre, os cremes anestésicos e os suplementos afetam a hemorragia, a cicatrização e o risco de desmaio antes de uma tatuagem ou de um piercing.

**Online:** <https://poliinternational.com/tools/medication-interaction-checker/>

**Ler noutro idioma:** [English](../README.md) · [Français](README_FR.md) · [Italiano](README_IT.md) · [Español](README_ES.md) · [Deutsch](README_DE.md) · [Nederlands](README_NL.md) · [Português](README_PT.md)

---

## O que é isto

Uma referência livre e gratuita para uma pergunta concreta: **aquilo que estou a tomar altera o que acontece quando uma agulha entra na minha pele?**

Os anticoagulantes fazem uma sessão sangrar durante mais tempo. A isotretinoína torna a pele tão frágil que rasga. Os betabloqueantes atenuam a resposta à adrenalina e favorecem os desmaios. A nicotina priva um piercing recente do oxigénio de que precisa. Quase nenhum cliente se lembra de o mencionar, e quase nenhum formulário de consentimento o pergunta.

A ferramenta cobre **38 medicamentos e substâncias em 13 categorias**, cada um com o efeito numa tatuagem, o efeito num piercing e a espera ou suspensão que faz sentido respeitar. Tudo funciona no navegador. Sem conta, sem servidor, sem rastreio e sem passo de compilação.

## O que não é

**Isto é uma referência educativa, não é aconselhamento médico.** Não conhece o seu historial, a sua dose nem o motivo pelo qual toma algo. Nunca pare nem altere um medicamento prescrito por causa de algo que leu aqui. Essa decisão pertence ao médico que o prescreveu.

## Funcionalidades

- **38 medicamentos, 13 categorias, 3 níveis de atenção.** AINE, cremes anestésicos, anticoagulantes, retinoides, sedativos e medicamentos para a tensão, hormonas e terapia hormonal, estimulantes, antidiabéticos e agonistas do GLP-1, corticoides, imunossupressores e biológicos, suplementos à base de plantas, antibióticos e antivirais, e substâncias do quotidiano.
- **Um verificador de suplementos apoiado em publicações reais.** 66 suplementos, 49 pares suplemento-medicamento efetivamente estudados e 132 estudos humanos ou clínicos, retirados do [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Os artigos retratados são excluídos. Onde não temos estudos, a ferramenta di-lo em vez de sugerir ausência de risco.
- **Fontes publicadas, visíveis na ferramenta.** Alguns medicamentos trazem referências da PubMed. Só aparecem citações aprovadas por uma pessoa; nada é anexado automaticamente.
- **Sete idiomas de interface, com o conteúdo clínico realmente traduzido.** Inglês, francês, italiano, espanhol, alemão, neerlandês e português. As 684 cadeias clínicas são escritas à mão, não traduzidas por máquina, e todas as páginas que não sejam a inglesa trazem um aviso permanente indicando o inglês como versão de referência.
- **Ligações "perto de mim" que pesquisam na língua do local.** As ligações para estúdio, médico, farmácia e hospital abrem o Google Maps com a pesquisa formulada na língua do país onde se encontra, e não na língua em que está a ler. Quem procura "farmácia" em Banguecoque não encontra quase nada; o termo tailandês encontra todas as farmácias da rua. 38 línguas de pesquisa, 217 fusos horários mapeados. **Não é pedida qualquer autorização de geolocalização** e nenhum dado de localização sai da página: para a Google vai apenas uma palavra de pesquisa.
- **O guia de emergência mostra o número de emergência do seu país.** Antes apresentava « 911 / 112 » para toda a gente, o que está errado na Tailândia (linha médica 1669), no Reino Unido (999), na Austrália (000), no Japão (119) e noutros países. 172 fusos horários apontam para 19 números, qualquer fuso não mapeado recai em « 112 / 911 », e o guia pede sempre que confirme o número do seu país e o mantenha escrito na parede do estúdio em vez de confiar numa dedução.
- **Ficha para o profissional e mensagem para o médico.** Transforme uma seleção num resumo para entregar ao seu tatuador ou num rascunho de mensagem para o seu médico.
- **Lembretes e tempos de suspensão**, uma secção sobre segurança no estúdio e perguntas frequentes.
- **Totalmente estático.** Clone o repositório, abra o `index.html` e funciona sem ligação à internet, exceto as ligações ao Maps.

## Política de prova

Esta ferramenta fala de medicamentos e de feridas, por isso as regras sobre fontes são mais rigorosas do que as regras sobre código:

- Uma afirmação que não conseguimos sustentar não é publicada. Foi exatamente por isso que três afirmações foram retiradas: o álcool, o ibuprofeno e o naproxeno eram todos descritos como capazes de expulsar a tinta da pele. Duas pesquisas na Europe PMC não encontraram provas, e o texto diz agora que o efeito na retenção da tinta não foi estudado, em vez de o afirmar.
- As citações são anexadas mediante prova, nunca automaticamente. Um identificador isolado ao lado de uma frase não é uma citação enquanto uma pessoa não confirmar que o artigo diz o que a frase diz.
- "Não temos dados" escreve-se "não temos dados", nunca "seguro".

## Instalação

### Utilizar online

<https://poliinternational.com/tools/medication-interaction-checker/>

### Executar localmente

HTML, CSS e JavaScript puros. Sem dependências, sem compilação e sem gestor de pacotes.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# abra o index.html no navegador, ou sirva a pasta:
python3 -m http.server 8000
```

Todos os caminhos são relativos: a pasta funciona a partir do disco, de qualquer subdiretório ou por trás de qualquer alojamento estático.

### Incorporar

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

A página escuta um `postMessage` do tipo `poli-theme` para que um site anfitrião possa impor o modo claro ou escuro. Consulte a [documentação técnica](TECHNICAL_DOCUMENTATION_PT.md).

## Documentação

- [Documentação técnica](TECHNICAL_DOCUMENTATION_PT.md): arquitetura, esquemas de dados, sistema de internacionalização, conceção da pesquisa por proximidade, incorporação e personalização.
- [Guia de contribuição](../CONTRIBUTING.md)

## Contribuir

As correções ao conteúdo médico são as contribuições mais valiosas, e o critério é a citação. Se conseguir apontar um artigo que contradiga algo aqui, abra uma questão com o PMID ou o DOI e nós agiremos.

As correções de tradução são igualmente bem-vindas. Indique o idioma, o medicamento e a formulação correta.

## Licença

MIT. Consulte [LICENSE](../LICENSE).

## Apoio

- Correio eletrónico: <support@poliinternational.com>
- Erros: [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Criado por [Poli International](https://poliinternational.com)

[Site](https://poliinternational.com) · [Ferramentas gratuitas](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
