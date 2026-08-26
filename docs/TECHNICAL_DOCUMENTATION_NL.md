# Interactiechecker voor medicijnen en body art - Technische documentatie

**Andere talen:** [English](../TECHNICAL_DOCUMENTATION.md) · [Français](TECHNICAL_DOCUMENTATION_FR.md) · [Italiano](TECHNICAL_DOCUMENTATION_IT.md) · [Español](TECHNICAL_DOCUMENTATION_ES.md) · [Deutsch](TECHNICAL_DOCUMENTATION_DE.md) · [Português](TECHNICAL_DOCUMENTATION_PT.md)

---

## Inhoud

1. [Architectuur](#architectuur)
2. [Bestandsindeling](#bestandsindeling)
3. [Dataschema's](#dataschemas)
4. [Het vertaalsysteem](#het-vertaalsysteem)
5. [Omgevingszoekfunctie: Maps-links in de lokale taal](#omgevingszoekfunctie-maps-links-in-de-lokale-taal)
6. [Bewijs en bronnen](#bewijs-en-bronnen)
7. [Status en opslag](#status-en-opslag)
8. [Insluiten](#insluiten)
9. [Aanpassen](#aanpassen)
10. [Beveiliging](#beveiliging)
11. [Browserondersteuning](#browserondersteuning)

---

## Architectuur

Statische HTML, CSS en ES2015+-JavaScript. Geen framework, geen bundler, geen pakketbeheerder en geen netwerkoproepen tijdens gebruik, op de Google Maps-links na die de gebruiker zelf aanklikt.

Elke dataset is **bij het bouwen bevroren in een JavaScript-bestand**, en dat is bewust. De tool roept nooit SUPP.AI, PubMed of een andere API aan terwijl een klant hem gebruikt. Hij kan dus niet stukgaan doordat een derde partij offline is, hij kan niet verraden wat iemand opzoekt, en zijn gedrag is reproduceerbaar uit alleen de repository.

De laadvolgorde is van belang: de databestanden declareren `const` op het hoogste niveau die `app.js` uitleest, dus `app.js` komt als laatste.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (klinische tekst, 6 talen)
  -> js/medication-sources.js    (goedgekeurde bronnen)
  -> js/supplement-stacking.js   (SUPP.AI-momentopname)
  -> js/geo-search.js            (Maps-zoektermen + tijdzonekaart)
  -> js/app.js                   (data, interface, weergave)
```

Zes tabbladen, client-side geschakeld, zonder routing: `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## Bestandsindeling

| Pad | Grootte | Rol |
|---|---|---|
| `index.html` | ~43 KB | Markup, JSON-LD, tabbladstructuur, themabrug voor iframes |
| `css/style.css` | ~60 KB | Alle componentstyling, licht en donker via tokens op `:root` |
| `css/a11y.css` | ~1 KB | Hulpklassen voor zichtbare focus en schermlezers |
| `css/print.css` | ~2 KB | Afdrukregels voor het overzicht voor de piercer |
| `js/app.js` | ~181 KB | `CATEGORIES`-data, 65 functies, alle weergave |
| `js/med-content-i18n.js` | ~127 KB | 684 met de hand geschreven klinische teksten |
| `js/supplement-stacking.js` | ~48 KB | 66 supplementen, 49 combinaties, 132 artikelen |
| `js/geo-search.js` | ~14 KB | 38 zoektalen, 217 tijdzonekoppelingen |
| `js/medication-sources.js` | ~2 KB | Goedgekeurde PubMed-bronnen per medicijn |

## Dataschema's

### `CATEGORIES` (in `app.js`)

De enige bron van waarheid voor medicijnen. 13 categorieën, 38 medicijnen.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // stabiele sleutel, gebruikt door alle andere bestanden
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // Engelse brontekst
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // zoeksynoniemen, inclusief regionale merknamen
      }
    ]
  }
]
```

`medMap` is een platte koppeling `id -> medicijn` die hieruit bij het opstarten wordt opgebouwd.

Categorie-id's: `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**Het niveau gaat over het risico van de behandeling, niet over de ernst van het medicijn.** `high` betekent dat de wisselwerking met een naald aanzienlijk is. Een levensnoodzakelijk medicijn kan prima `low` zijn.

### `MED_CONTENT_I18N` (in `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 medicijnen x 3 velden x 6 talen = 684 teksten. Engels staat in `CATEGORIES` en wordt hier dus niet herhaald.

### `SUPPLEMENT_STACKING` (in `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Gegenereerd uit SUPP.AI. Alleen combinaties met minstens één humane of klinische studie worden opgenomen; ingetrokken artikelen zijn uitgesloten. `cui` is de UMLS-conceptcode en maakt de koppeling controleerbaar.

### `MEDICATION_SOURCES` (in `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` benoemt waarvoor het artikel wordt aangehaald. Een leeg object levert geen bronnenregel op, nooit een lege kop.

## Het vertaalsysteem

Twee gescheiden lagen, en ze verwarren is de klassieke fout:

1. **Interfaceteksten** staan in `TRANSLATIONS` (in `app.js`), geordend op taal en dan op sleutel, en worden toegepast via de attributen `data-i18n` en `data-i18n-placeholder`.
2. **Klinische teksten** staan in `med-content-i18n.js` en worden gelezen via `medText(med, field)`.

`medText()` geeft Engels terug als een vertaling ontbreekt en zet een `medTextFellBack`-vlag, die een zichtbare melding toont. Zwijgen is geen optie: wie een Nederlandse interface ziet, gaat ervan uit dat de medicijninformatie in het Nederlands is nagekeken.

Elke niet-Engelse weergave draagt een permanente melding dat de pagina vertaald is en dat de Engelse versie de versie is waar wij voor instaan. Dat is geen banner "vertaling in uitvoering": hij is permanent, want de garantie verandert niet.

**De klinische tekst is met de hand geschreven, niet machinaal vertaald.** De volgorde waarin dat gebeurde is het herbruikbare deel: eerst Frans, en alleen de medicijnen met het hoogste aandachtsniveau, omdat dat het enige deel was dat een beoordelaar echt kon controleren voordat het live ging. Na die controle werd de woordkeuze bindend voor de andere vijf talen. De terminologiekeuzes staan in de kop van `med-content-i18n.js` en moeten worden gelezen voordat je een taal toevoegt.

## Omgevingszoekfunctie: Maps-links in de lokale taal

`geo-search.js` voedt vier links: studio, arts, apotheek en ziekenhuis.

**Het label staat in de interfacetaal van de lezer. De Maps-zoekopdracht staat in de taal van de plek waar hij zich fysiek bevindt.** Dat verschil is opzettelijk. Wie in Bangkok in het Nederlands `apotheek` zoekt, vindt bijna niets; `ร้านขายยา` vindt elke apotheek in de straat.

De locatie wordt afgeleid uit `Intl.DateTimeFormat().resolvedOptions().timeZone` en via `GEO_SEARCH_ZONES` (217 vermeldingen) omgezet naar een van de 38 zoektalen, met Engels als standaard.

**Er wordt nooit om locatietoestemming gevraagd**, en dat is een ontwerpkeuze, geen omissie:

- Google Maps centreert een "in de buurt"-zoekopdracht al op het apparaat zelf, dus coördinaten zijn helemaal niet nodig om de zoekopdracht te laten werken.
- Het enige wat de locatie bepaalt is de taal van de zoekopdracht, en de tijdzone beantwoordt dat zonder toestemmingsvenster, zonder API-sleutel, zonder netwerkoproep en zonder dat er persoonsgegevens de pagina verlaten.
- Een toestemmingsvenster op een medische pagina kost vertrouwen, en iedereen die weigert raakt de functie helemaal kwijt.

De prijs is dat een VPN de verkeerde zone meldt: daarom biedt de interface een handmatige taalkeuze, bewaard in `localStorage`.

In de tabel staan alleen zones waarvan de taal **niet** Engels is; al het andere valt terug op de Engelse standaard, waar Maps wereldwijd goed mee omgaat.

Eén valkuil die behouden moet blijven: de Thaise zoekterm voor een studio is `ร้านสัก`, nooit `สัก` alleen, wat ook teak betekent en houtzagerijen oplevert.

`geo-search.js` heeft een offline zelfcontrole. Draai `node js/geo-search.js` om te controleren dat elke taal alle vier de termen heeft, dat elke gekoppelde zone naar een bekende taal wijst en dat onbekende talen correct op Engels terugvallen.

### Het lokale alarmnummer

`geoEmergencyNumber()` zet dezelfde tijdzone om in een lokaal alarmnummer: 172 zones
verwijzen naar 19 nummers, en elke niet-gekoppelde zone valt terug op `112 / 911`.

**Deze tabel heeft het omgekeerde risicoprofiel van de Maps-termen hierboven en is daar
ook naar gebouwd.** Een verkeerde Maps-zoekopdracht levert niets op; een verkeerd
alarmnummer kost tijd in de enige situatie waarin tijd het hele probleem is. Daarom staan
er alleen goed vastgelegde nummers in, wordt er niets gegokt, en drukt de interface naast
de gedetecteerde waarde altijd af: "controleer het juiste nummer voor jouw land en hang
het in de studio aan de muur". Waar een land een aparte ambulancelijn naast de politie
heeft (Noorwegen 113, Zwitserland 144, Brazilië 192, Rusland 103) staat het **medische**
nummer vermeld: deze gids wordt geopend bij anafylaxie en bloeding, niet bij een misdrijf.

Het nummer wordt ingevuld bij het openen van het venster en niet bij het laden van de
pagina, zodat een telefoon die in een ander land landt het nieuwe nummer toont zonder
herladen.

## Bewijs en bronnen

De regels voor de inhoud zijn strenger dan die voor de code.

- **Onderbouwde beweringen alleen.** Alcohol, ibuprofen en naproxen werden elk beschreven als middelen die inkt uit de huid duwen. Twee zoekrondes in Europe PMC leverden geen bewijs op. De tekst zegt nu dat het effect op inktbehoud niet is onderzocht.
- **Bronnen worden op bewijs gekoppeld.** Een losse identificatie naast een zin blijft ongecontroleerd tot een mens bevestigt dat het artikel die zin ondersteunt. `medication-sources.js` krijgt uitsluitend goedgekeurde bronnen.
- **Ontbrekende gegevens worden geschreven als ontbrekende gegevens**, nooit als veiligheid.

Sorteer bij literatuuronderzoek op relevantie en niet op aantal citaties. Sorteren op citaties levert het bekendste uit het vakgebied op, niet wat het meest ter zake doet.

## Status en opslag

Alle status blijft bij de client. Er wordt niets ergens naartoe gestuurd.

| `localStorage`-sleutel | Inhoud |
|---|---|
| `ui_lang_v1` | Gekozen interfacetaal |
| `geo_search_lang_v1` | Handmatige keuze van de Maps-zoektaal |
| `readiness_assessment_autosave_v1` | Waarden van de voorbereidingscalculator |
| `recent_searches_v1` | Recent gezochte medicijnen |
| `appointment_datetime` | Afspraaktijd voor de aftelklokken |

Elke lees- en schrijfactie zit in een `try/catch`: privévensters en browsers die sitegegevens blokkeren mogen de pagina niet slopen.

## Insluiten

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

De pagina merkt `window.self !== window.top` op, schakelt standaard naar donker en luistert dan naar een themabericht:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

`index.html` draagt `noindex, nofollow`, zodat een ingesloten kopie nooit concurreert met de canonieke pagina in de zoekresultaten. Verwijder die metatag als je hem als je eigen hoofdpagina host.

## Aanpassen

**Een medicijn toevoegen:** voeg het toe aan de juiste `CATEGORIES[].meds`-array in `app.js`. Alleen `id`, `name`, `cat`, `sev`, `tattoo` en `piercing` zijn verplicht. Voeg daarna de zes vertalingen toe in `med-content-i18n.js` onder dezelfde `id`, anders valt de tool terug op Engels en toont hij de terugvalmelding.

**Een taal toevoegen:** maak een `TRANSLATIONS`-blok voor de interface, voeg de taal toe aan elk medicijn in `med-content-i18n.js` en lees eerst de terminologiekop van dat bestand, zodat het vakjargon consistent blijft. Een halve taal is slechter dan geen taal.

**Een Maps-zoektaal toevoegen:** voeg een vermelding toe aan `GEO_SEARCH_TERMS`, een endoniem aan `GEO_SEARCH_LANG_NAMES` en de betreffende tijdzones aan `GEO_SEARCH_ZONES`. Draai daarna `node js/geo-search.js`.

**Restylen:** alles komt voort uit CSS-custom properties op `:root`, met een `.light-mode`-overschrijving. Wijzig de tokens, niet de componenten.

## Beveiliging

- **Alle ingevoegde inhoud gaat door `escHtml()`**, dat `&`, `<`, `>` en `"` neutraliseert. Het DOM wordt met template literals opgebouwd: elke niet-geneutraliseerde waarde zou een injectiepunt zijn.
- **Er wordt geen gebruikersinvoer verzonden.** Er is geen backend, geen analytics-aanroep en geen script van derden.
- **Maps-links dragen `rel="noopener noreferrer"`** en openen in een nieuw tabblad.
- **Er bestaat nergens een veld voor inloggegevens, betaalgegevens of identiteitsgegevens.**

## Browserondersteuning

Elke browser met ES2015, `Intl`, CSS-custom properties en `localStorage`: Chrome, Edge, Firefox, Safari en hun mobiele tegenhangers. Er is geen polyfill-laag en geen transpilatiestap.

---

## Ondersteuning

- E-mail: <support@poliinternational.com>
- Issues: <https://github.com/Poli-International/medication-interaction-checker/issues>
