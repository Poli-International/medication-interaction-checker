# Medication & Body Art Interaction Checker - Technical Documentation

**Also in:** [Français](docs/TECHNICAL_DOCUMENTATION_FR.md) · [Italiano](docs/TECHNICAL_DOCUMENTATION_IT.md) · [Español](docs/TECHNICAL_DOCUMENTATION_ES.md) · [Deutsch](docs/TECHNICAL_DOCUMENTATION_DE.md) · [Nederlands](docs/TECHNICAL_DOCUMENTATION_NL.md) · [Português](docs/TECHNICAL_DOCUMENTATION_PT.md)

---

## Table of contents

1. [Architecture](#architecture)
2. [File layout](#file-layout)
3. [Data schemas](#data-schemas)
4. [The internationalization system](#the-internationalization-system)
5. [Geo search: local-language Maps links](#geo-search-local-language-maps-links)
6. [Evidence and sourcing](#evidence-and-sourcing)
7. [State and storage](#state-and-storage)
8. [Embedding](#embedding)
9. [Customization](#customization)
10. [Security](#security)
11. [Browser support](#browser-support)

---

## Architecture

Static HTML, CSS and ES2015+ JavaScript. No framework, no bundler, no package manager, no runtime network calls except the Google Maps links the user clicks.

Every data set is **snapshotted at build time into a JavaScript file**, deliberately. The tool never calls SUPP.AI, PubMed or any other API while a client is using it. That means it cannot break because a third party is down, it cannot leak what a user is looking up, and its behaviour is reproducible from the repository alone.

Load order matters: the data files declare top-level `const`s that `app.js` reads, so `app.js` is last.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (clinical text, 6 languages)
  -> js/medication-sources.js    (approved citations)
  -> js/supplement-stacking.js   (SUPP.AI snapshot)
  -> js/geo-search.js            (Maps query terms + timezone map)
  -> js/app.js                   (data, UI, rendering)
```

Six tabs, switched client-side, no routing: `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## File layout

| Path | Size | Role |
|---|---|---|
| `index.html` | ~43 KB | Markup, JSON-LD, tab shell, iframe theme bridge |
| `css/style.css` | ~60 KB | All component styling, light and dark via `:root` tokens |
| `css/a11y.css` | ~1 KB | Focus-visible and screen-reader utilities |
| `css/print.css` | ~2 KB | Print rules for the artist brief |
| `js/app.js` | ~181 KB | `CATEGORIES` data, 65 functions, all rendering |
| `js/med-content-i18n.js` | ~127 KB | 684 hand-authored clinical strings |
| `js/supplement-stacking.js` | ~48 KB | 66 supplements, 49 pairs, 132 papers |
| `js/geo-search.js` | ~14 KB | 38 query languages, 217 timezone mappings |
| `js/medication-sources.js` | ~2 KB | Approved PubMed citations per medication |

## Data schemas

### `CATEGORIES` (in `app.js`)

The single source of truth for medications. 13 categories, 38 medications.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // stable key, used by every other data file
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // English source text
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // search synonyms, incl. regional brands
      }
    ]
  }
]
```

`medMap` is a flat `id -> medication` lookup built from this at startup.

Category ids: `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**Severity is about procedure risk, not about how serious the drug is.** `high` means the interaction with a needle is significant. A vital medication can be `low`.

### `MED_CONTENT_I18N` (in `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 medications x 3 fields x 6 languages = 684 strings. English lives in `CATEGORIES`, so it is not repeated here.

### `SUPPLEMENT_STACKING` (in `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Generated from SUPP.AI. Only pairs with at least one human or clinical study are included; retracted papers are excluded. `cui` is the UMLS concept id, which is what makes the mapping auditable.

### `MEDICATION_SOURCES` (in `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` states what the paper is being cited *for*. An empty object renders as no sources line, never as a broken heading.

## The internationalization system

Two separate layers, and conflating them is the classic bug:

1. **Interface strings** live in `TRANSLATIONS` in `app.js`, keyed by language then key, applied through `data-i18n` and `data-i18n-placeholder` attributes.
2. **Clinical strings** live in `med-content-i18n.js` and are read through `medText(med, field)`.

`medText()` returns English when a translation is missing and sets a `medTextFellBack` flag, which renders a visible notice. Silence is not an option: a reader seeing a French interface will assume the drug guidance is French-reviewed.

Every non-English view carries a permanent notice stating the page is translated and that the English version is the one we stand behind. That notice is not a "translation in progress" banner, it is permanent, because the guarantee never changes.

**The clinical text is hand-authored, not machine-translated.** The order it was built in is the reusable part: French first, high-severity medications only, because that was the only tranche a reviewer could actually check before it went live. Once reviewed, its vocabulary became fixed for the other five languages. The terminology decisions are recorded in the header of `med-content-i18n.js` and should be read before adding a language.

## Geo search: local-language Maps links

`geo-search.js` powers four links: studio, doctor, pharmacy, hospital.

**The button label is in the reader's UI language. The Maps query is in the language of where they physically are.** Those are deliberately different. A French reader in Bangkok searching `pharmacie` finds almost nothing; `ร้านขายยา` finds every chemist on the street.

Location is resolved from `Intl.DateTimeFormat().resolvedOptions().timeZone`, mapped through `GEO_SEARCH_ZONES` (217 entries) to one of 38 query languages, defaulting to English.

**Geolocation permission is never requested**, and that is a design decision, not an omission:

- Google Maps already centres a "nearby" search on the device, so coordinates are not needed for the search to work at all.
- The only thing location decides is the query language, and the timezone answers that with no prompt, no API key, no network call and nothing personal leaving the page.
- A permission dialog on a medical page costs trust, and every user who declines loses the feature outright.

The cost is that a VPN reports the wrong zone, so the UI carries a language override persisted to `localStorage`.

Only zones whose language is **not** English are listed in the table; everything else falls through to the English default, which Maps handles well worldwide.

One trap worth preserving: the Thai studio query is `ร้านสัก`, never bare `สัก`, which also means teak and returns timber yards.

`geo-search.js` has an offline self-check. Run `node js/geo-search.js` to assert every language has all four terms, every mapped zone points at a known language, and unknown languages fall back correctly.

## Evidence and sourcing

The rules that govern content are stricter than the ones that govern code.

- **Unsupported claims do not ship.** Alcohol, ibuprofen and naproxen were each described as pushing ink out of the skin. Two Europe PMC literature passes found no evidence for it. The text now states that the effect on ink retention has not been studied.
- **Citations attach on proof.** A bare identifier next to a sentence is unverified until a human confirms the paper supports that sentence. `medication-sources.js` only ever receives approved citations.
- **Absence of data is written as absence of data**, never as safety.

When searching literature for a claim, sort by relevance rather than citation count. Sorting by citations returns whatever is most famous in the field, not what is most relevant to the question.

## State and storage

All state is client-side. Nothing is transmitted anywhere.

| `localStorage` key | Holds |
|---|---|
| `ui_lang_v1` | Chosen interface language |
| `geo_search_lang_v1` | Manual override for the Maps query language |
| `readiness_assessment_autosave_v1` | Prep calculator and readiness form values |
| `recent_searches_v1` | Recent medication searches |
| `appointment_datetime` | Appointment time for washout countdowns |

Every read and write is wrapped in `try/catch`; private windows and blocked site data must not break the page.

## Embedding

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

The page detects `window.self !== window.top` and defaults to dark, then listens for a theme message:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

`index.html` carries `noindex, nofollow` so an embedded copy never competes with the canonical page in search results. Remove that meta tag if you are self-hosting as your own primary page.

## Customization

**Add a medication:** append to the relevant `CATEGORIES[].meds` array in `app.js`. Only `id`, `name`, `cat`, `sev`, `tattoo` and `piercing` are required. Then add the six translations to `med-content-i18n.js` under the same `id`, or it will fall back to English and show the fallback notice.

**Add a language:** add a `TRANSLATIONS` block for the interface, add the language to every medication in `med-content-i18n.js`, and read that file's terminology header first so the trade vocabulary stays consistent. A partial language is worse than none.

**Add a Maps query language:** add a `GEO_SEARCH_TERMS` entry, an endonym in `GEO_SEARCH_LANG_NAMES`, and the relevant timezones in `GEO_SEARCH_ZONES`. Then run `node js/geo-search.js`.

**Restyle:** everything derives from CSS custom properties on `:root` with a `.light-mode` override. Change the tokens, not the components.

## Security

- **All interpolated content passes through `escHtml()`**, which escapes `&`, `<`, `>` and `"`. Template literals build the DOM, so any unescaped value would be an injection point.
- **No user input is transmitted.** There is no backend, no analytics call and no third-party script.
- **Maps links carry `rel="noopener noreferrer"`** and open in a new tab.
- **No credential, payment or identity input exists anywhere in the tool.**

## Browser support

Any browser with ES2015, `Intl`, CSS custom properties and `localStorage`: Chrome, Edge, Firefox, Safari, and their mobile equivalents. There is no polyfill layer and no transpilation step.

---

## Support

- Email: <support@poliinternational.com>
- Issues: <https://github.com/Poli-International/medication-interaction-checker/issues>
