# Wechselwirkungs-Check für Medikamente und Body Art

> Prüfen Sie, wie verschreibungspflichtige Medikamente, rezeptfreie Schmerzmittel, Betäubungscremes und Nahrungsergänzungsmittel Blutung, Heilung und Ohnmachtsrisiko vor einem Tattoo oder Piercing beeinflussen.

**Online:** <https://poliinternational.com/tools/medication-interaction-checker/>

**In einer anderen Sprache lesen:** [English](../README.md) · [Français](README_FR.md) · [Italiano](README_IT.md) · [Español](README_ES.md) · [Deutsch](README_DE.md) · [Nederlands](README_NL.md) · [Português](README_PT.md)

---

## Worum es geht

Eine freie, kostenlose Referenz für eine einzige Frage: **Ändert das, was ich einnehme, was passiert, wenn eine Nadel in meine Haut geht?**

Gerinnungshemmer lassen eine Sitzung länger bluten. Isotretinoin macht die Haut so brüchig, dass sie einreißt. Betablocker dämpfen die Adrenalinreaktion und begünstigen Ohnmachten. Nikotin nimmt einem frischen Piercing den Sauerstoff, den es braucht. Kaum ein Kunde kommt von selbst darauf, es zu erwähnen, und kaum ein Einverständnisformular fragt danach.

Das Werkzeug deckt **38 Medikamente und Substanzen in 13 Kategorien** ab, jeweils mit der Wirkung auf ein Tattoo, der Wirkung auf ein Piercing und der sinnvollen Warte- oder Karenzzeit. Alles läuft im Browser. Kein Konto, kein Server, kein Tracking, kein Build-Schritt.

## Was es nicht ist

**Dies ist eine Bildungsreferenz, keine medizinische Beratung.** Sie kennt weder Ihre Vorgeschichte noch Ihre Dosis noch den Grund, aus dem Sie etwas einnehmen. Setzen Sie niemals ein verordnetes Medikament ab und ändern Sie es nie wegen etwas, das Sie hier gelesen haben. Diese Entscheidung liegt bei dem Arzt, der es verordnet hat.

## Funktionen

- **38 Medikamente, 13 Kategorien, 3 Aufmerksamkeitsstufen.** NSAR, Betäubungscremes, Gerinnungshemmer, Retinoide, Beruhigungs- und Blutdruckmittel, Hormone und Hormonersatztherapie, Stimulanzien, Diabetesmittel und GLP-1-Agonisten, Kortikosteroide, Immunsuppressiva und Biologika, pflanzliche Präparate, Antibiotika und Virostatika sowie Substanzen aus dem Alltag.
- **Ein Nahrungsergänzungs-Check auf Basis echter Publikationen.** 66 Präparate, 49 tatsächlich untersuchte Paare aus Präparat und Medikament und 132 Human- oder klinische Studien, entnommen aus [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Zurückgezogene Arbeiten sind ausgeschlossen. Wo keine Studien vorliegen, sagt das Werkzeug genau das, statt Unbedenklichkeit anzudeuten.
- **Veröffentlichte Quellen, direkt im Werkzeug sichtbar.** Einzelne Medikamente tragen PubMed-Belege. Es erscheinen nur Zitate, die eine Person geprüft hat; nichts wird automatisch angehängt.
- **Sieben Oberflächensprachen, mit tatsächlich übersetztem klinischem Inhalt.** Englisch, Französisch, Italienisch, Spanisch, Deutsch, Niederländisch und Portugiesisch. Die 684 klinischen Texte sind von Hand verfasst, nicht maschinell übersetzt, und jede nicht englische Seite trägt einen dauerhaften Hinweis, dass die englische Fassung die maßgebliche ist.
- **"In der Nähe"-Links, die in der Sprache des Aufenthaltsorts suchen.** Die Links zu Studio, Arzt, Apotheke und Krankenhaus öffnen Google Maps mit einer Suchanfrage in der Sprache des Landes, in dem Sie sich befinden, nicht in der Sprache, in der Sie lesen. Wer auf Deutsch in Bangkok nach "Apotheke" sucht, findet fast nichts; der thailändische Begriff findet jede Apotheke der Straße. 38 Suchsprachen, 217 zugeordnete Zeitzonen. **Es wird keine Standortfreigabe angefordert**, und keine Standortdaten verlassen die Seite: an Google geht nur ein Suchwort.
- **Der Notfall-Leitfaden zeigt die Notrufnummer Ihres Landes.** Früher stand dort für alle »911 / 112«, was in Thailand (medizinische Leitung 1669), im Vereinigten Königreich (999), in Australien (000), in Japan (119) und anderswo falsch ist. 172 Zeitzonen verweisen auf 19 Nummern, jede nicht zugeordnete Zone fällt auf »112 / 911« zurück, und der Leitfaden fordert immer dazu auf, die Nummer des eigenen Landes zu prüfen und im Studio an die Wand zu hängen, statt einer Zeitzonen-Vermutung zu vertrauen.
- **Übersicht für den Piercer und Nachricht an den Arzt.** Verwandeln Sie eine Auswahl in eine Zusammenfassung für Ihren Tätowierer oder in den Entwurf einer Nachricht an Ihren Arzt.
- **Erinnerungen und Karenzzeiten**, ein Abschnitt zur Studiosicherheit und häufige Fragen.
- **Vollständig statisch.** Repository klonen, `index.html` öffnen, und es funktioniert ohne Internet, abgesehen von den Maps-Links.

## Belegregeln

Dieses Werkzeug handelt von Medikamenten und Wunden, deshalb sind die Regeln für Quellen strenger als die für Code:

- Eine Aussage, die wir nicht belegen können, geht nicht online. Genau deshalb wurden drei Aussagen entfernt: Alkohol, Ibuprofen und Naproxen wurden alle so beschrieben, als drückten sie Farbe aus der Haut. Zwei Literaturrecherchen in Europe PMC fanden keinen Beleg dafür, und der Text sagt nun, dass die Wirkung auf die Farbhaltbarkeit nicht untersucht ist, statt sie zu behaupten.
- Belege werden nur bei Nachweis angehängt, nie automatisch. Eine bloße Kennung neben einem Satz ist kein Beleg, solange kein Mensch bestätigt hat, dass die Arbeit sagt, was der Satz sagt.
- "Wir haben keine Daten" wird als "wir haben keine Daten" geschrieben, nie als "unbedenklich".

## Installation

### Online nutzen

<https://poliinternational.com/tools/medication-interaction-checker/>

### Lokal ausführen

Reines HTML, CSS und JavaScript. Keine Abhängigkeiten, kein Build-Schritt, kein Paketmanager.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# index.html im Browser öffnen oder den Ordner ausliefern:
python3 -m http.server 8000
```

Alle Pfade sind relativ: Der Ordner funktioniert von der Festplatte, aus jedem Unterverzeichnis und hinter jedem statischen Hosting.

### Einbetten

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

Die Seite lauscht auf ein `postMessage` vom Typ `poli-theme`, damit eine Gastgeberseite Hell- oder Dunkelmodus vorgeben kann. Siehe die [technische Dokumentation](TECHNICAL_DOCUMENTATION_DE.md).

## Dokumentation

- [Technische Dokumentation](TECHNICAL_DOCUMENTATION_DE.md): Architektur, Datenschemata, Internationalisierung, Aufbau der Umkreissuche, Einbettung und Anpassung.
- [Beitragsleitfaden](../CONTRIBUTING.md)

## Mitwirken

Korrekturen am medizinischen Inhalt sind die wertvollsten Beiträge, und der Maßstab ist der Beleg. Wenn Sie auf eine Arbeit verweisen können, die etwas hier widerlegt, öffnen Sie ein Issue mit PMID oder DOI, und wir handeln.

Übersetzungskorrekturen sind ebenso willkommen. Nennen Sie Sprache, Medikament und die richtige Formulierung.

## Lizenz

MIT. Siehe [LICENSE](../LICENSE).

## Support

- E-Mail: <support@poliinternational.com>
- Fehler: [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Erstellt von [Poli International](https://poliinternational.com)

[Website](https://poliinternational.com) · [Kostenlose Werkzeuge](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
