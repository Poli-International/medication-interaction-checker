# Verificatore di interazioni tra farmaci e body art - Documentazione tecnica

**Altre lingue:** [English](../TECHNICAL_DOCUMENTATION.md) · [Français](TECHNICAL_DOCUMENTATION_FR.md) · [Español](TECHNICAL_DOCUMENTATION_ES.md) · [Deutsch](TECHNICAL_DOCUMENTATION_DE.md) · [Nederlands](TECHNICAL_DOCUMENTATION_NL.md) · [Português](TECHNICAL_DOCUMENTATION_PT.md)

---

## Indice

1. [Architettura](#architettura)
2. [Struttura dei file](#struttura-dei-file)
3. [Schemi dei dati](#schemi-dei-dati)
4. [Il sistema di internazionalizzazione](#il-sistema-di-internazionalizzazione)
5. [Ricerca geografica: link a Maps nella lingua locale](#ricerca-geografica-link-a-maps-nella-lingua-locale)
6. [Prove e fonti](#prove-e-fonti)
7. [Stato e archiviazione](#stato-e-archiviazione)
8. [Incorporamento](#incorporamento)
9. [Personalizzazione](#personalizzazione)
10. [Sicurezza](#sicurezza)
11. [Browser supportati](#browser-supportati)

---

## Architettura

HTML, CSS e JavaScript ES2015+ statici. Nessun framework, nessun bundler, nessun gestore di pacchetti e nessuna chiamata di rete a runtime tranne i link di Google Maps che l'utente sceglie di cliccare.

Ogni insieme di dati è **congelato in fase di build dentro un file JavaScript**, deliberatamente. Lo strumento non chiama mai SUPP.AI, PubMed o altre API mentre un cliente lo sta usando. Non può quindi rompersi perché un servizio esterno è offline, non può rivelare che cosa sta consultando un utente, e il suo comportamento è riproducibile dal solo repository.

L'ordine di caricamento conta: i file di dati dichiarano `const` di primo livello che `app.js` legge, quindi `app.js` viene per ultimo.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (testo clinico, 6 lingue)
  -> js/medication-sources.js    (citazioni approvate)
  -> js/supplement-stacking.js   (istantanea SUPP.AI)
  -> js/geo-search.js            (termini di ricerca Maps + mappa dei fusi)
  -> js/app.js                   (dati, interfaccia, rendering)
```

Sei schede, commutate lato client, senza routing: `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## Struttura dei file

| Percorso | Dimensione | Ruolo |
|---|---|---|
| `index.html` | ~43 KB | Markup, JSON-LD, struttura a schede, ponte del tema per iframe |
| `css/style.css` | ~60 KB | Tutto lo stile dei componenti, chiaro e scuro tramite token su `:root` |
| `css/a11y.css` | ~1 KB | Utility per focus visibile e screen reader |
| `css/print.css` | ~2 KB | Regole di stampa per la scheda professionale |
| `js/app.js` | ~181 KB | Dati `CATEGORIES`, 65 funzioni, tutto il rendering |
| `js/med-content-i18n.js` | ~127 KB | 684 stringhe cliniche scritte a mano |
| `js/supplement-stacking.js` | ~48 KB | 66 integratori, 49 coppie, 132 articoli |
| `js/geo-search.js` | ~14 KB | 38 lingue di ricerca, 217 corrispondenze di fusi |
| `js/medication-sources.js` | ~2 KB | Citazioni PubMed approvate per farmaco |

## Schemi dei dati

### `CATEGORIES` (in `app.js`)

L'unica fonte di verità per i farmaci. 13 categorie, 38 farmaci.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // chiave stabile, usata da tutti gli altri file
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // testo sorgente inglese
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // sinonimi di ricerca, marchi regionali inclusi
      }
    ]
  }
]
```

`medMap` è una tabella piatta `id -> farmaco` costruita da questa struttura all'avvio.

Identificatori di categoria: `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**Il livello di attenzione riguarda il rischio della procedura, non la gravità del farmaco.** `high` significa che l'interazione con un ago è rilevante. Un farmaco salvavita può benissimo essere `low`.

### `MED_CONTENT_I18N` (in `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 farmaci x 3 campi x 6 lingue = 684 stringhe. L'inglese sta in `CATEGORIES` e quindi non viene ripetuto qui.

### `SUPPLEMENT_STACKING` (in `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Generato da SUPP.AI. Sono incluse solo le coppie con almeno uno studio umano o clinico; gli articoli ritirati sono esclusi. `cui` è l'identificativo di concetto UMLS, ed è ciò che rende la corrispondenza verificabile.

### `MEDICATION_SOURCES` (in `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` indica che cosa l'articolo sta sostenendo. Un oggetto vuoto non mostra alcuna riga di fonti, mai un titolo vuoto.

## Il sistema di internazionalizzazione

Due livelli distinti, e confonderli è l'errore classico:

1. **Le stringhe di interfaccia** stanno in `TRANSLATIONS` (in `app.js`), indicizzate per lingua e poi per chiave, e vengono applicate tramite gli attributi `data-i18n` e `data-i18n-placeholder`.
2. **Le stringhe cliniche** stanno in `med-content-i18n.js` e si leggono con `medText(med, field)`.

`medText()` restituisce l'inglese quando manca una traduzione e alza un flag `medTextFellBack`, che mostra un avviso visibile. Il silenzio non è un'opzione: chi vede un'interfaccia italiana darà per scontato che le indicazioni cliniche siano state riviste in italiano.

Ogni vista non inglese porta un avviso permanente che dichiara la pagina tradotta e indica l'inglese come versione di riferimento. Non è un banner "traduzione in corso": è permanente, perché la garanzia non cambia.

**Il testo clinico è scritto a mano, non tradotto a macchina.** L'ordine in cui è stato costruito è la parte riutilizzabile: prima il francese, e solo i farmaci ad attenzione elevata, perché era l'unica porzione che un revisore potesse davvero controllare prima della pubblicazione. Una volta rivista, il suo lessico è diventato vincolante per le altre cinque lingue. Le scelte terminologiche sono annotate nell'intestazione di `med-content-i18n.js` e vanno lette prima di aggiungere una lingua.

## Ricerca geografica: link a Maps nella lingua locale

`geo-search.js` alimenta quattro link: studio, medico, farmacia, ospedale.

**L'etichetta del pulsante è nella lingua di interfaccia del lettore. La richiesta a Maps è nella lingua del luogo in cui si trova fisicamente.** Le due cose sono volutamente diverse. Un lettore italiano a Bangkok che cerca `farmacia` non trova quasi nulla; `ร้านขายยา` trova tutte le farmacie della via.

La posizione si ricava da `Intl.DateTimeFormat().resolvedOptions().timeZone`, convertita tramite `GEO_SEARCH_ZONES` (217 voci) in una delle 38 lingue di ricerca, con l'inglese come valore predefinito.

**Non viene mai richiesta l'autorizzazione alla geolocalizzazione**, ed è una scelta progettuale, non una dimenticanza:

- Google Maps centra già una ricerca "qui vicino" sul dispositivo stesso, quindi le coordinate non servono affinché la ricerca funzioni.
- L'unica cosa che la posizione determina è la lingua della richiesta, e il fuso orario risponde senza richiesta di permesso, senza chiave API, senza chiamate di rete e senza che alcun dato personale lasci la pagina.
- Una finestra di autorizzazione su una pagina medica costa fiducia, e ogni utente che rifiuta perde del tutto la funzionalità.

Il prezzo è che una VPN dichiara il fuso sbagliato: per questo l'interfaccia offre una scelta manuale della lingua, conservata in `localStorage`.

Nella tabella compaiono solo i fusi la cui lingua **non** è l'inglese; tutto il resto ricade sull'inglese predefinito, che Maps gestisce bene in tutto il mondo.

Una trappola da conservare: la ricerca thailandese per uno studio è `ร้านสัก`, mai `สัก` da solo, che significa anche teak e restituisce segherie.

`geo-search.js` include un controllo offline. Esegui `node js/geo-search.js` per verificare che ogni lingua abbia i quattro termini, che ogni fuso mappato punti a una lingua nota e che le lingue sconosciute ricadano correttamente sull'inglese.

### Il numero dei soccorsi locali

`geoEmergencyNumber()` converte lo stesso fuso orario in un numero di emergenza locale:
172 fusi rimandano a 19 numeri, e qualunque fuso non mappato ricade su `112 / 911`.

**Questa tabella ha il profilo di rischio opposto a quello dei termini Maps qui sopra, ed
è costruita di conseguenza.** Una ricerca Maps sbagliata non restituisce nulla; un numero
di emergenza sbagliato costa tempo nell'unica situazione in cui il tempo è tutto il
problema. Sono quindi elencati solo numeri ben consolidati, nulla è indovinato, e
l'interfaccia stampa sempre « verifichi il numero corretto per il suo paese e lo tenga
sul muro dello studio » accanto al valore rilevato. Dove un paese ha una linea di
ambulanza distinta da quella della polizia (Norvegia 113, Svizzera 144, Brasile 192,
Russia 103) viene indicato il numero **medico**: questa guida si apre per un'anafilassi o
un'emorragia, non per un reato.

Il numero viene inserito all'apertura della finestra e non al caricamento della pagina,
così un telefono che atterra in un altro paese mostra il nuovo numero senza ricaricare.

## Prove e fonti

Le regole che governano il contenuto sono più severe di quelle che governano il codice.

- **Le affermazioni non sostenute non vengono pubblicate.** Alcol, ibuprofene e naprossene erano tutti descritti come capaci di spingere l'inchiostro fuori dalla pelle. Due ricerche su Europe PMC non hanno trovato prove. Il testo ora dice che l'effetto sulla tenuta dell'inchiostro non è stato studiato.
- **Le citazioni si allegano sulla prova.** Un identificativo isolato accanto a una frase resta non verificato finché una persona non conferma che l'articolo sostiene quella frase. `medication-sources.js` riceve solo citazioni approvate.
- **L'assenza di dati si scrive come assenza di dati**, mai come assenza di rischio.

Quando cerchi letteratura a supporto di un'affermazione, ordina per pertinenza e non per numero di citazioni. L'ordinamento per citazioni restituisce ciò che è più famoso nel campo, non ciò che è più pertinente alla domanda.

## Stato e archiviazione

Tutto lo stato è lato client. Nulla viene trasmesso da nessuna parte.

| Chiave `localStorage` | Contenuto |
|---|---|
| `ui_lang_v1` | Lingua di interfaccia scelta |
| `geo_search_lang_v1` | Scelta manuale della lingua di ricerca su Maps |
| `readiness_assessment_autosave_v1` | Valori del calcolatore di preparazione |
| `recent_searches_v1` | Ricerche recenti di farmaci |
| `appointment_datetime` | Orario dell'appuntamento per i conti alla rovescia |

Ogni lettura e ogni scrittura è racchiusa in un `try/catch`: le finestre private e i browser che bloccano i dati dei siti non devono rompere la pagina.

## Incorporamento

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

La pagina rileva `window.self !== window.top`, passa in scuro come impostazione predefinita e poi ascolta un messaggio di tema:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

`index.html` porta `noindex, nofollow` perché una copia incorporata non faccia mai concorrenza alla pagina canonica nei risultati di ricerca. Rimuovi quel meta tag se la ospiti come pagina principale tua.

## Personalizzazione

**Aggiungere un farmaco:** aggiungilo all'array `CATEGORIES[].meds` pertinente in `app.js`. Solo `id`, `name`, `cat`, `sev`, `tattoo` e `piercing` sono obbligatori. Aggiungi poi le sei traduzioni in `med-content-i18n.js` sotto lo stesso `id`, altrimenti lo strumento ricadrà sull'inglese e mostrerà l'avviso di ripiego.

**Aggiungere una lingua:** crea un blocco `TRANSLATIONS` per l'interfaccia, aggiungi la lingua a ogni farmaco in `med-content-i18n.js` e leggi prima l'intestazione terminologica di quel file, perché il lessico del settore resti coerente. Una lingua parziale è peggio di nessuna lingua.

**Aggiungere una lingua di ricerca su Maps:** aggiungi una voce in `GEO_SEARCH_TERMS`, un endonimo in `GEO_SEARCH_LANG_NAMES` e i fusi interessati in `GEO_SEARCH_ZONES`. Poi esegui `node js/geo-search.js`.

**Cambiare lo stile:** tutto deriva da proprietà personalizzate CSS su `:root`, con una sovrascrittura `.light-mode`. Modifica i token, non i componenti.

## Sicurezza

- **Ogni contenuto interpolato passa da `escHtml()`**, che neutralizza `&`, `<`, `>` e `"`. Il DOM è costruito con template literal: qualunque valore non neutralizzato sarebbe un punto di iniezione.
- **Nessun input dell'utente viene trasmesso.** Non c'è backend, non ci sono chiamate analitiche e non ci sono script di terze parti.
- **I link a Maps portano `rel="noopener noreferrer"`** e si aprono in una nuova scheda.
- **Non esiste alcun campo per credenziali, pagamenti o dati identificativi.**

## Browser supportati

Qualsiasi browser con ES2015, `Intl`, proprietà personalizzate CSS e `localStorage`: Chrome, Edge, Firefox, Safari e i corrispettivi mobili. Non c'è alcun livello di polyfill né una fase di transpilazione.

---

## Assistenza

- Email: <support@poliinternational.com>
- Segnalazioni: <https://github.com/Poli-International/medication-interaction-checker/issues>
