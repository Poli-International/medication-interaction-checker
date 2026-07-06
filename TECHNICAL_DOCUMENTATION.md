# Medication & Body Art Interaction Checker - Technical Documentation

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Data Schemas](#data-schemas)
- [Calculation / Logic Algorithms](#calculation--logic-algorithms)
- [API Reference](#api-reference)
- [Integration Guide](#integration-guide)
- [Customization](#customization)
- [Performance](#performance)
- [Browser Compatibility](#browser-compatibility)
- [Security](#security)
- [Version History](#version-history)
- [Support / Contact](#support--contact)

## Architecture Overview

### Technology Stack

- **HTML5**, Single-page tool interface with semantic markup
- **CSS3**, External stylesheet at `/tools/medication-interaction-checker/css/style.css`
- **JavaScript (ES6)**, Vanilla JS, no frameworks, no external dependencies

### File Structure

```
medication-interaction-checker/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

### Component / Logic Breakdown

| Component | File | Description |
|-----------|------|-------------|
| Tool wrapper | `index.html` | Outer container with header, badge, info note, medication list container, result container, and disclaimer |
| Medication list | `app.js` | Dynamically built from `CATEGORIES` constant, renders grouped checkboxes with medication names and subtypes |
| Result panel | `app.js` | Dynamically rendered interaction cards with severity badges, tattoo/piercing effects, and wait-time guidance |
| Clear button | `app.js` | Injected into result panel, resets all checkboxes and clears results |
| Theme listener | `index.html` | Embedded script that listens for `poli-theme` postMessage events for iframe embedding |

## Data Schemas

### `CATEGORIES` Array (Constant)

Top-level array of category objects. Each category contains a label and an array of medication objects.

```javascript
CATEGORIES = [
  {
    label: "Blood thinners / Anticoagulants",    // string, category heading
    meds: [                                       // array of medication objects
      {
        id: "warfarin",                           // string, unique identifier
        name: "Warfarin",                         // string, display name
        sub: "Coumadin",                          // string, subtype / brand name
        sev: "high",                              // string, severity level: "high" | "mod" | "low"
        tattoo: "Significant bleeding during...", // string, tattoo-specific interaction description
        piercing: "Excessive bleeding during...", // string, piercing-specific interaction description
        wait: "Discuss stopping or bridging..."   // string, wait time / guidance note
      },
      // ...more medications
    ]
  },
  // ...more categories
]
```

### `medMap` Object (Lookup Map)

Built dynamically from `CATEGORIES` for O(1) medication lookups by ID.

```javascript
medMap = {
  "warfarin": { /* full medication object */ },
  "apixaban": { /* full medication object */ },
  // ...all medication IDs as keys
}
```

### Severity Levels

| Value | Label | CSS Variable |
|-------|-------|--------------|
| `"high"` | High concern | `var(--sev-high)` |
| `"mod"` | Moderate concern | `var(--sev-mod)` |
| `"low"` | Low concern | `var(--sev-low)` |

## Calculation / Logic Algorithms

### `renderResults()`, Main Display Function

**Trigger:** Fires on every `change` event on the medication list container (`#med-list`).

**Step-by-step logic:**

1. **Collect checked medications**, Queries all `<input data-med-id>` elements that are `:checked`, extracts their `data-med-id` values into the `checked` array.

2. **Early return**, If `checked.length === 0`, clears `resultEl.innerHTML` and exits.

3. **Sort by severity**, Uses `sevOrder` lookup (`{ high: 0, mod: 1, low: 2 }`) to sort checked IDs so highest-concern medications appear first.

4. **Count severity levels**, Counts how many checked medications have `sev === "high"` and `sev === "mod"`.

5. **Determine summary color**, Sets `summaryColor` CSS variable:
   - If any high-severity medication is selected → `var(--sev-high)`
   - Else if any moderate-severity medication is selected → `var(--sev-mod)`
   - Else → `var(--sev-low)`

6. **Build interaction cards**, Maps each sorted ID to an HTML card containing:
   - Medication name and subtype
   - Severity badge (color-coded by severity level)
   - Tattoo effect row
   - Piercing effect row
   - Wait note (if `m.wait` is truthy)

7. **Render result panel**, Injects HTML into `resultEl` containing:
   - Summary header with count and severity summary
   - Clear all button
   - All interaction cards

8. **Attach clear handler**, Binds click event to `#clear-btn` that unchecks all checkboxes and clears results.

### `escHtml(s)`, XSS Sanitization

**Input:** Any string value  
**Output:** HTML-escaped string safe for innerHTML injection

Replaces: `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`

Applied to all user-facing text rendered via template literals.

### Severity Ordering Algorithm

```javascript
const sevOrder = { high: 0, mod: 1, low: 2 };
const sorted = [...checked].sort((a, b) => sevOrder[medMap[a].sev] - sevOrder[medMap[b].sev]);
```

Sorts medications from highest concern to lowest concern for display priority.

## API Reference

### Public Functions

#### `escHtml(s)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `string` | Raw string to sanitize |

**Returns:** `string`, HTML-escaped safe string.

**Behavior:** Replaces `&`, `<`, `>`, `"` with their HTML entity equivalents.

---

#### `renderResults()`

| Parameter | Type | Description |
|-----------|------|-------------|
| (none) |, | Reads from DOM state |

**Returns:** `void`, Updates `resultEl.innerHTML` directly.

**Behavior:** Reads all checked medication checkboxes, sorts by severity, builds and renders interaction cards.

---

### Event Handlers

#### `medListEl.addEventListener('change', renderResults)`

**Trigger:** Any change event on any checkbox within `#med-list`.

**Behavior:** Delegated event listener, calls `renderResults()` whenever a checkbox is toggled.

---

#### `#clear-btn click handler`

**Trigger:** Click on the dynamically injected "Clear all" button.

**Behavior:** Unchecks all `input[data-med-id]:checked` elements and clears the result container.

---

### PostMessage API (Embedding)

#### `message` event listener

| Property | Type | Description |
|----------|------|-------------|
| `e.data.type` | `string` | Must equal `"poli-theme"` |
| `e.data.light` | `boolean` | `true` for light theme, `false` for dark theme |

**Behavior:** Sets `data-theme` attribute on `<html>` element to `"light"` or `"dark"`. Only active when tool is loaded in an iframe (`window.self !== window.top`).

## Integration Guide

### Standalone Embedding

The tool is fully self-contained static HTML/CSS/JS with zero external dependencies. Embed via iframe:

```html
<iframe
  src="https://poliinternational.com/tools/medication-interaction-checker/"
  width="100%"
  height="800"
  frameborder="0"
  title="Medication Interaction Checker"
></iframe>
```

### Theme Control (Iframe)

When embedded, the tool listens for `postMessage` events to sync with a parent page theme:

```javascript
// From parent page, switch to light theme
document.querySelector('iframe').contentWindow.postMessage({
  type: 'poli-theme',
  light: true
}, '*');

// Switch to dark theme
document.querySelector('iframe').contentWindow.postMessage({
  type: 'poli-theme',
  light: false
}, '*');
```

### Important Notes

- The tool sets `noindex, nofollow` meta robots tag, it is designed for embedding, not standalone SEO.
- No API keys, backend services, or external resources are required.
- All data is hardcoded in the JavaScript, no network requests are made.

## Customization

### Adding Medications

Edit the `CATEGORIES` array in `js/app.js`. Each medication object requires:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique string identifier (used for checkbox values) |
| `name` | Yes | Display name |
| `sub` | Yes | Subtype or brand name (shown in small text) |
| `sev` | Yes | Severity level: `"high"`, `"mod"`, or `"low"` |
| `tattoo` | Yes | Tattoo-specific interaction text |
| `piercing` | Yes | Piercing-specific interaction text |
| `wait` | No | Wait time or guidance note (shown with ⏱ icon) |

### Adding Categories

Add a new object to the `CATEGORIES` array:

```javascript
{
  label: "New Category Name",
  meds: [ /* array of medication objects */ ]
}
```

### Styling

All visual styling is in `css/style.css`. Key CSS custom properties used by the JavaScript:

```css
:root {
  --sev-high: /* color for high severity */;
  --sev-mod:  /* color for moderate severity */;
  --sev-low:  /* color for low severity */;
  --text-muted: /* muted text color */;
}
```

## Performance

- **Zero network requests**, All data is hardcoded in the JavaScript bundle.
- **DOM updates only on interaction**, `renderResults()` only fires on checkbox change events.
- **No animations or transitions**, Minimal repaint cost.
- **No external libraries**, Vanilla JS keeps payload under 10KB uncompressed.
- **Event delegation**, Single `change` listener on the container, not individual checkboxes.

## Browser Compatibility

- **ES6 features used:** `const`, `let`, arrow functions, template literals, `Array.from()`, `Array.prototype.sort()`, `Map` iteration.
- **Requires:** Modern browsers with ES6 support (Chrome 49+, Firefox 52+, Safari 10+, Edge 14+, Opera 36+).
- **No polyfills provided**, Not compatible with Internet Explorer 11 or older browsers without transpilation.

## Security

### Input Handling

- All user-facing text is sanitized through `escHtml()` before being injected into the DOM via `innerHTML`.
- Checkbox values are read from `data-med-id` attributes, not from user input.
- No form submission, no URL parameters, no localStorage, no cookies.

### XSS Prevention

- The `escHtml()` function escapes `&`, `<`, `>`, and `"` characters.
- Medication data is hardcoded, no dynamic content from external sources.
- No `eval()`, `document.write()`, or `setTimeout()` with string arguments.

### Iframe Security

- The tool sets `noindex, nofollow` to prevent direct search indexing.
- Theme synchronization uses `postMessage` with no sensitive data transmission.
- No `allow-scripts` or `allow-same-origin` sandbox restrictions imposed, embedder should apply appropriate sandbox attributes.

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Initial release | Core medication interaction checker with 7 categories, 17 medications, severity sorting, and iframe embedding support |

## Support / Contact

For technical support, integration questions, or to request additions to the medication database:

**Email:** support@poliinternational.com

**Note:** This tool is an educational reference only and does not constitute medical advice. Never stop or adjust prescribed medication without consulting a physician.
