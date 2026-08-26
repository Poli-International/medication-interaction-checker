# Wechselwirkungs-Check für Medikamente und Body Art - Technische Dokumentation

**Andere Sprachen:** [English](../TECHNICAL_DOCUMENTATION.md) · [Français](TECHNICAL_DOCUMENTATION_FR.md) · [Italiano](TECHNICAL_DOCUMENTATION_IT.md) · [Español](TECHNICAL_DOCUMENTATION_ES.md) · [Nederlands](TECHNICAL_DOCUMENTATION_NL.md) · [Português](TECHNICAL_DOCUMENTATION_PT.md)

---

## Inhalt

1. [Architektur](#architektur)
2. [Dateiaufbau](#dateiaufbau)
3. [Datenschemata](#datenschemata)
4. [Das Internationalisierungssystem](#das-internationalisierungssystem)
5. [Umkreissuche: Maps-Links in der Landessprache](#umkreissuche-maps-links-in-der-landessprache)
6. [Belege und Quellen](#belege-und-quellen)
7. [Zustand und Speicherung](#zustand-und-speicherung)
8. [Einbettung](#einbettung)
9. [Anpassung](#anpassung)
10. [Sicherheit](#sicherheit)
11. [Browserunterstützung](#browserunterstützung)

---

## Architektur

Statisches HTML, CSS und ES2015+-JavaScript. Kein Framework, kein Bundler, kein Paketmanager und keine Netzwerkaufrufe zur Laufzeit außer den Google-Maps-Links, die der Nutzer selbst anklickt.

Jeder Datensatz ist **zur Bauzeit in eine JavaScript-Datei eingefroren**, und zwar bewusst. Das Werkzeug ruft niemals SUPP.AI, PubMed oder eine andere API auf, während ein Kunde es benutzt. Es kann also nicht ausfallen, weil ein Dritter offline ist, es kann nicht verraten, was jemand nachschlägt, und sein Verhalten ist allein aus dem Repository reproduzierbar.

Die Ladereihenfolge ist wichtig: Die Datendateien deklarieren `const` auf oberster Ebene, die `app.js` liest, deshalb kommt `app.js` zuletzt.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (klinischer Text, 6 Sprachen)
  -> js/medication-sources.js    (geprüfte Belege)
  -> js/supplement-stacking.js   (SUPP.AI-Momentaufnahme)
  -> js/geo-search.js            (Maps-Suchbegriffe + Zeitzonenkarte)
  -> js/app.js                   (Daten, Oberfläche, Darstellung)
```

Sechs Reiter, clientseitig umgeschaltet, ohne Routing: `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## Dateiaufbau

| Pfad | Größe | Rolle |
|---|---|---|
| `index.html` | ~43 KB | Markup, JSON-LD, Reitergerüst, Theme-Brücke für iframes |
| `css/style.css` | ~60 KB | Gesamtes Komponenten-Styling, hell und dunkel über Tokens auf `:root` |
| `css/a11y.css` | ~1 KB | Hilfsklassen für sichtbaren Fokus und Screenreader |
| `css/print.css` | ~2 KB | Druckregeln für die Piercer-Übersicht |
| `js/app.js` | ~181 KB | `CATEGORIES`-Daten, 65 Funktionen, gesamte Darstellung |
| `js/med-content-i18n.js` | ~127 KB | 684 von Hand verfasste klinische Texte |
| `js/supplement-stacking.js` | ~48 KB | 66 Präparate, 49 Paare, 132 Arbeiten |
| `js/geo-search.js` | ~14 KB | 38 Suchsprachen, 217 Zeitzonenzuordnungen |
| `js/medication-sources.js` | ~2 KB | Geprüfte PubMed-Belege je Medikament |

## Datenschemata

### `CATEGORIES` (in `app.js`)

Die einzige Wahrheitsquelle für Medikamente. 13 Kategorien, 38 Medikamente.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // stabiler Schlüssel, von allen anderen Dateien genutzt
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // englischer Quelltext
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // Suchsynonyme, auch regionale Markennamen
      }
    ]
  }
]
```

`medMap` ist eine flache Zuordnung `id -> Medikament`, die beim Start daraus aufgebaut wird.

Kategorie-Kennungen: `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**Die Stufe bezieht sich auf das Risiko des Eingriffs, nicht auf die Schwere des Medikaments.** `high` heißt, dass die Wechselwirkung mit einer Nadel erheblich ist. Ein lebenswichtiges Medikament kann durchaus `low` sein.

### `MED_CONTENT_I18N` (in `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 Medikamente x 3 Felder x 6 Sprachen = 684 Texte. Englisch steht in `CATEGORIES` und wird hier deshalb nicht wiederholt.

### `SUPPLEMENT_STACKING` (in `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Aus SUPP.AI erzeugt. Aufgenommen werden nur Paare mit mindestens einer Human- oder klinischen Studie; zurückgezogene Arbeiten sind ausgeschlossen. `cui` ist die UMLS-Konzeptkennung und macht die Zuordnung überprüfbar.

### `MEDICATION_SOURCES` (in `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` benennt, wofür die Arbeit zitiert wird. Ein leeres Objekt erzeugt keine Quellenzeile, niemals eine leere Überschrift.

## Das Internationalisierungssystem

Zwei getrennte Ebenen, und sie zu vermischen ist der klassische Fehler:

1. **Oberflächentexte** stehen in `TRANSLATIONS` (in `app.js`), nach Sprache und dann nach Schlüssel abgelegt, und werden über die Attribute `data-i18n` und `data-i18n-placeholder` angewendet.
2. **Klinische Texte** stehen in `med-content-i18n.js` und werden über `medText(med, field)` gelesen.

`medText()` liefert Englisch, wenn eine Übersetzung fehlt, und setzt ein `medTextFellBack`-Flag, das einen sichtbaren Hinweis erzeugt. Schweigen ist keine Option: Wer eine deutsche Oberfläche sieht, nimmt an, dass die Medikamentenhinweise auf Deutsch geprüft wurden.

Jede nicht englische Ansicht trägt einen dauerhaften Hinweis, dass die Seite übersetzt ist und die englische Fassung die maßgebliche bleibt. Das ist kein Banner "Übersetzung in Arbeit", sondern dauerhaft, weil sich die Zusage nicht ändert.

**Der klinische Text ist von Hand verfasst, nicht maschinell übersetzt.** Die Reihenfolge, in der er entstanden ist, ist der übertragbare Teil: zuerst Französisch, und nur die Medikamente der höchsten Stufe, weil das der einzige Teil war, den eine prüfende Person vor der Veröffentlichung wirklich kontrollieren konnte. Nach der Prüfung wurde dessen Wortschatz für die anderen fünf Sprachen verbindlich. Die Terminologieentscheidungen stehen im Kopf von `med-content-i18n.js` und sind vor dem Hinzufügen einer Sprache zu lesen.

## Umkreissuche: Maps-Links in der Landessprache

`geo-search.js` versorgt vier Links: Studio, Arzt, Apotheke, Krankenhaus.

**Die Beschriftung steht in der Oberflächensprache des Lesers. Die Maps-Anfrage steht in der Sprache des Ortes, an dem er sich körperlich befindet.** Das ist absichtlich verschieden. Wer auf Deutsch in Bangkok nach `Apotheke` sucht, findet fast nichts; `ร้านขายยา` findet jede Apotheke der Straße.

Der Ort wird aus `Intl.DateTimeFormat().resolvedOptions().timeZone` abgeleitet und über `GEO_SEARCH_ZONES` (217 Einträge) einer von 38 Suchsprachen zugeordnet, standardmäßig Englisch.

**Eine Standortfreigabe wird nie angefordert**, und das ist eine Entwurfsentscheidung, kein Versäumnis:

- Google Maps zentriert eine Umkreissuche bereits auf dem Gerät selbst, Koordinaten sind für die Funktion also gar nicht nötig.
- Das Einzige, was der Ort bestimmt, ist die Sprache der Anfrage, und die Zeitzone beantwortet das ohne Abfrage, ohne API-Schlüssel, ohne Netzwerkaufruf und ohne dass personenbezogene Daten die Seite verlassen.
- Ein Berechtigungsdialog auf einer medizinischen Seite kostet Vertrauen, und jeder, der ablehnt, verliert die Funktion ganz.

Der Preis dafür ist, dass ein VPN die falsche Zone meldet: Deshalb bietet die Oberfläche eine manuelle Sprachwahl, die in `localStorage` erhalten bleibt.

In der Tabelle stehen nur Zonen, deren Sprache **nicht** Englisch ist; alles andere fällt auf den englischen Standard zurück, den Maps weltweit gut beherrscht.

Eine Falle, die erhalten bleiben sollte: Die thailändische Studio-Suche lautet `ร้านสัก`, niemals `สัก` allein, was auch Teakholz bedeutet und Sägewerke liefert.

`geo-search.js` bringt eine Offline-Selbstprüfung mit. `node js/geo-search.js` prüft, dass jede Sprache alle vier Begriffe hat, jede zugeordnete Zone auf eine bekannte Sprache zeigt und unbekannte Sprachen korrekt auf Englisch zurückfallen.

### Die örtliche Notrufnummer

`geoEmergencyNumber()` wandelt dieselbe Zeitzone in eine örtliche Notrufnummer um:
172 Zonen verweisen auf 19 Nummern, und jede nicht zugeordnete Zone fällt auf
`112 / 911` zurück.

**Diese Tabelle hat das umgekehrte Risikoprofil der Maps-Begriffe oben und ist
entsprechend gebaut.** Eine falsche Maps-Anfrage liefert nichts; eine falsche Notrufnummer
kostet Zeit in der einen Lage, in der Zeit das ganze Problem ist. Deshalb sind nur gut
etablierte Nummern aufgeführt, nichts ist geraten, und die Oberfläche schreibt neben den
erkannten Wert immer »prüfen Sie die richtige Nummer für Ihr Land und hängen Sie sie im
Studio an die Wand«. Wo ein Land eine eigene Rettungsleitung getrennt von der Polizei
betreibt (Norwegen 113, Schweiz 144, Brasilien 192, Russland 103), steht die
**medizinische** Nummer: Dieser Leitfaden wird bei Anaphylaxie und Blutung geöffnet,
nicht bei einer Straftat.

Die Nummer wird beim Öffnen des Fensters gesetzt, nicht beim Laden der Seite, damit ein
Telefon, das in einem anderen Land landet, die neue Nummer ohne Neuladen zeigt.

## Belege und Quellen

Die Regeln für den Inhalt sind strenger als die für den Code.

- **Unbelegte Aussagen gehen nicht online.** Alkohol, Ibuprofen und Naproxen wurden jeweils so beschrieben, als drückten sie Farbe aus der Haut. Zwei Literaturrecherchen in Europe PMC fanden keinen Beleg. Der Text sagt jetzt, dass die Wirkung auf die Farbhaltbarkeit nicht untersucht ist.
- **Belege werden bei Nachweis angehängt.** Eine bloße Kennung neben einem Satz bleibt ungeprüft, bis ein Mensch bestätigt, dass die Arbeit diesen Satz stützt. `medication-sources.js` erhält ausschließlich geprüfte Belege.
- **Fehlende Daten werden als fehlende Daten geschrieben**, nie als Unbedenklichkeit.

Wer Literatur zu einer Aussage sucht, sortiert nach Relevanz und nicht nach Zitationszahl. Nach Zitationen zu sortieren liefert das Bekannteste des Fachgebiets, nicht das für die Frage Passendste.

## Zustand und Speicherung

Der gesamte Zustand liegt im Browser. Es wird nichts irgendwohin übertragen.

| `localStorage`-Schlüssel | Inhalt |
|---|---|
| `ui_lang_v1` | Gewählte Oberflächensprache |
| `geo_search_lang_v1` | Manuelle Wahl der Maps-Suchsprache |
| `readiness_assessment_autosave_v1` | Werte des Vorbereitungsrechners |
| `recent_searches_v1` | Zuletzt gesuchte Medikamente |
| `appointment_datetime` | Termin für die Karenz-Countdowns |

Jeder Lese- und Schreibzugriff ist in `try/catch` gefasst: Private Fenster und Browser, die Seitendaten blockieren, dürfen die Seite nicht zerstören.

## Einbettung

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

Die Seite erkennt `window.self !== window.top`, schaltet standardmäßig auf Dunkel und lauscht dann auf eine Theme-Nachricht:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

`index.html` trägt `noindex, nofollow`, damit eine eingebettete Kopie der kanonischen Seite in den Suchergebnissen nie Konkurrenz macht. Entfernen Sie das Meta-Tag, wenn Sie die Seite selbst als Hauptseite betreiben.

## Anpassung

**Medikament hinzufügen:** an das passende `CATEGORIES[].meds`-Array in `app.js` anhängen. Pflicht sind nur `id`, `name`, `cat`, `sev`, `tattoo` und `piercing`. Danach die sechs Übersetzungen unter derselben `id` in `med-content-i18n.js` ergänzen, sonst fällt das Werkzeug auf Englisch zurück und zeigt den Rückfallhinweis.

**Sprache hinzufügen:** einen `TRANSLATIONS`-Block für die Oberfläche anlegen, die Sprache bei jedem Medikament in `med-content-i18n.js` ergänzen und zuvor den Terminologiekopf dieser Datei lesen, damit der Fachwortschatz stimmig bleibt. Eine halbe Sprache ist schlechter als keine.

**Maps-Suchsprache hinzufügen:** einen Eintrag in `GEO_SEARCH_TERMS`, ein Endonym in `GEO_SEARCH_LANG_NAMES` und die betreffenden Zeitzonen in `GEO_SEARCH_ZONES` ergänzen. Danach `node js/geo-search.js` ausführen.

**Umgestalten:** Alles leitet sich aus CSS-Custom-Properties auf `:root` mit einer `.light-mode`-Überschreibung ab. Ändern Sie die Tokens, nicht die Komponenten.

## Sicherheit

- **Jeder eingesetzte Inhalt läuft durch `escHtml()`**, das `&`, `<`, `>` und `"` maskiert. Das DOM wird aus Template-Literalen gebaut: jeder nicht maskierte Wert wäre ein Einfallstor.
- **Keine Nutzereingabe wird übertragen.** Es gibt kein Backend, keinen Analyseaufruf und kein Drittanbieterskript.
- **Maps-Links tragen `rel="noopener noreferrer"`** und öffnen in einem neuen Tab.
- **Es existiert kein Feld für Zugangsdaten, Zahlungsdaten oder Ausweisdaten.**

## Browserunterstützung

Jeder Browser mit ES2015, `Intl`, CSS-Custom-Properties und `localStorage`: Chrome, Edge, Firefox, Safari und deren mobile Entsprechungen. Es gibt keine Polyfill-Schicht und keinen Transpilationsschritt.

---

## Support

- E-Mail: <support@poliinternational.com>
- Issues: <https://github.com/Poli-International/medication-interaction-checker/issues>
