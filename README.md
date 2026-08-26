# Medication & Body Art Interaction Checker

> Check how prescription drugs, over-the-counter painkillers, numbing creams and supplements affect bleeding, healing and fainting risk before a tattoo or piercing.

[![License](https://img.shields.io/github/license/Poli-International/medication-interaction-checker)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Poli-International/medication-interaction-checker)](https://github.com/Poli-International/medication-interaction-checker/commits/main)
[![GitHub Stars](https://img.shields.io/github/stars/Poli-International/medication-interaction-checker?style=social)](https://github.com/Poli-International/medication-interaction-checker/stargazers)

**Live:** <https://poliinternational.com/tools/medication-interaction-checker/>

**Read this in:** [English](README.md) · [Français](docs/README_FR.md) · [Italiano](docs/README_IT.md) · [Español](docs/README_ES.md) · [Deutsch](docs/README_DE.md) · [Nederlands](docs/README_NL.md) · [Português](docs/README_PT.md)

---

## What this is

A free, open-source reference for one specific question: **does what I am taking change what happens when a needle goes into my skin?**

Blood thinners make a session bleed longer. Isotretinoin makes skin tear. Beta blockers blunt the adrenaline response and make people faint. Nicotine starves a fresh piercing of oxygen. Most clients never think to mention any of it, and most consent forms never ask.

The tool covers **38 medications and substances across 13 categories**, each with what it does to a tattoo, what it does to a piercing, and whether a wait or washout is sensible. It runs entirely in the browser. No account, no server, no tracking, no build step.

## What this is not

**This is an educational reference, not medical advice.** It does not know your history, your dose or your reason for taking anything. Never stop or change a prescribed medication because of something you read here. That decision belongs to the doctor who prescribed it.

## Features

- **38 medications, 13 categories, 3 concern levels.** NSAIDs, numbing creams, anticoagulants, retinoids, sedatives and blood pressure drugs, hormones and HRT, stimulants, GLP-1 and diabetes drugs, corticosteroids, immunosuppressants and biologics, herbal supplements, antibiotics and antivirals, and lifestyle substances.
- **Supplement interaction checker backed by real papers.** 66 supplements, 49 supplement-drug pairs that have actually been studied, and 132 human or clinical papers behind them, snapshotted from [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Retracted papers are excluded. Where we hold no studies, the tool says so instead of implying safety.
- **Published sources, shown in the tool.** Individual medications carry PubMed citations. Only citations that passed human review appear; nothing is auto-attached.
- **Seven interface languages, with the clinical text actually translated.** English, French, Italian, Spanish, German, Dutch and Portuguese. The 684 clinical strings are hand-authored, not machine-translated, and every page outside English carries a permanent notice saying the English is the version we stand behind.
- **"Find nearby" links that search in the local language.** Studio, doctor, pharmacy and hospital links open Google Maps with the query phrased in the language of where you physically are, not the language you are reading in. A French reader in Bangkok searching "pharmacie" finds almost nothing; the Thai term finds every chemist on the street. 38 query languages, 217 mapped timezones. **No geolocation permission is requested** and no location data leaves the page, only a search word goes to Google.
- **The emergency guide shows your local emergency number.** It used to print "911 / 112" for everyone, which is wrong in Thailand (medical line 1669), the UK (999), Australia (000), Japan (119) and many more. 172 timezones map to 19 numbers, anything unmapped falls back to "112 / 911", and the guide always tells you to confirm your own country’s number and keep it on the studio wall rather than trusting a timezone guess.
- **Artist brief and doctor note.** Turn a selection into a summary to hand your artist, or a draft message to your doctor.
- **Reminders and washout timing**, a studio safety section, and an FAQ.
- **Works offline-first in spirit:** everything is static. Clone it, open `index.html`, and it works with no internet beyond the Maps links.

## Evidence policy

This tool is about drugs and wounds, so the sourcing rules are stricter than the code:

- A claim that cannot be supported does not ship. Three claims were removed for exactly this reason: alcohol, ibuprofen and naproxen were all described as pushing ink out of the skin. Two Europe PMC literature passes found no evidence, so the text now states that the effect on ink retention has not been studied rather than asserting it.
- Citations attach on proof, never automatically. A bare identifier next to a sentence is not a citation until a human has confirmed the paper says what the sentence says.
- "We hold no data" is written as "we hold no data", never as "safe".

## Install

### Use it online

<https://poliinternational.com/tools/medication-interaction-checker/>

### Run it locally

Pure HTML, CSS and JavaScript. No dependencies, no build step, no package manager.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# open index.html in your browser, or serve the folder:
python3 -m http.server 8000
```

All asset paths are relative, so the folder works from disk, from any subdirectory, or behind any static host.

### Embed it

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

The page listens for a `poli-theme` `postMessage` so a host page can drive light or dark mode. See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md).

## Documentation

- [Technical documentation](TECHNICAL_DOCUMENTATION.md) - architecture, data schemas, the i18n system, the geo-search design, embedding and customization. Also in [FR](docs/TECHNICAL_DOCUMENTATION_FR.md) · [IT](docs/TECHNICAL_DOCUMENTATION_IT.md) · [ES](docs/TECHNICAL_DOCUMENTATION_ES.md) · [DE](docs/TECHNICAL_DOCUMENTATION_DE.md) · [NL](docs/TECHNICAL_DOCUMENTATION_NL.md) · [PT](docs/TECHNICAL_DOCUMENTATION_PT.md)
- [Contributing](CONTRIBUTING.md)

## Contributing

Corrections to the medical content are the most valuable contributions, and the bar is a citation. If you can point to a paper that contradicts something here, open an issue with the PMID or DOI and we will act on it.

Translation corrections are equally welcome. Say which language, which medication, and what the phrasing should be.

## License

MIT. See [LICENSE](LICENSE).

## Support

- Email: <support@poliinternational.com>
- Bugs: [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Built by [Poli International](https://poliinternational.com)

[Website](https://poliinternational.com) · [Free tools](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
