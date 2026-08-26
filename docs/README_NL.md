# Interactiechecker voor medicijnen en body art

> Controleer hoe voorgeschreven medicijnen, vrij verkrijgbare pijnstillers, verdovende crèmes en supplementen de bloeding, de genezing en het risico op flauwvallen beïnvloeden voor een tatoeage of piercing.

**Online:** <https://poliinternational.com/tools/medication-interaction-checker/>

**Lees in een andere taal:** [English](../README.md) · [Français](README_FR.md) · [Italiano](README_IT.md) · [Español](README_ES.md) · [Deutsch](README_DE.md) · [Nederlands](README_NL.md) · [Português](README_PT.md)

---

## Wat dit is

Een vrije, gratis naslagbron voor één specifieke vraag: **verandert wat ik gebruik wat er gebeurt als er een naald in mijn huid gaat?**

Bloedverdunners laten een sessie langer bloeden. Isotretinoïne maakt de huid zo kwetsbaar dat hij scheurt. Bètablokkers dempen de adrenalinereactie en maken flauwvallen waarschijnlijker. Nicotine ontneemt een verse piercing de zuurstof die hij nodig heeft. Bijna geen enkele klant denkt eraan het te melden, en bijna geen enkel toestemmingsformulier vraagt ernaar.

De tool behandelt **38 medicijnen en stoffen in 13 categorieën**, elk met het effect op een tatoeage, het effect op een piercing en de verstandige wacht- of stopperiode. Alles draait in de browser. Geen account, geen server, geen tracking, geen buildstap.

## Wat dit niet is

**Dit is een educatieve naslagbron, geen medisch advies.** De tool kent je voorgeschiedenis niet, je dosering niet en de reden waarom je iets gebruikt niet. Stop of wijzig nooit een voorgeschreven medicijn om iets wat je hier leest. Die beslissing hoort bij de arts die het heeft voorgeschreven.

## Functies

- **38 medicijnen, 13 categorieën, 3 aandachtsniveaus.** NSAID's, verdovende crèmes, antistollingsmiddelen, retinoïden, kalmerings- en bloeddrukmiddelen, hormonen en hormoontherapie, stimulantia, diabetesmedicatie en GLP-1-agonisten, corticosteroïden, afweeronderdrukkers en biologicals, kruidensupplementen, antibiotica en antivirale middelen, en leefstijlmiddelen.
- **Een supplementenchecker op basis van echte publicaties.** 66 supplementen, 49 werkelijk onderzochte combinaties van supplement en medicijn en 132 humane of klinische studies, overgenomen uit [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Ingetrokken artikelen zijn uitgesloten. Waar we geen studies hebben, zegt de tool dat, in plaats van veiligheid te suggereren.
- **Gepubliceerde bronnen, zichtbaar in de tool.** Losse medicijnen dragen PubMed-verwijzingen. Alleen door een mens goedgekeurde bronnen verschijnen; niets wordt automatisch gekoppeld.
- **Zeven interfacetalen, met de klinische tekst echt vertaald.** Engels, Frans, Italiaans, Spaans, Duits, Nederlands en Portugees. De 684 klinische teksten zijn met de hand geschreven, niet machinaal vertaald, en elke niet-Engelse pagina draagt een permanente melding dat de Engelse versie de versie is waar wij voor instaan.
- **"In de buurt"-links die zoeken in de taal van de plek.** De links naar studio, arts, apotheek en ziekenhuis openen Google Maps met een zoekopdracht in de taal van het land waar je bent, niet in de taal die je leest. Wie in Bangkok in het Nederlands "apotheek" zoekt, vindt bijna niets; de Thaise term vindt elke apotheek in de straat. 38 zoektalen, 217 gekoppelde tijdzones. **Er wordt geen locatietoestemming gevraagd** en er verlaat geen locatiegegeven de pagina: naar Google gaat alleen een zoekwoord.
- **Overzicht voor de piercer en bericht aan de arts.** Zet een selectie om in een samenvatting voor je tatoeageartiest of in een concept-bericht voor je arts.
- **Herinneringen en stoptijden**, een deel over veiligheid in de studio en veelgestelde vragen.
- **Volledig statisch.** Kloon de repository, open `index.html`, en het werkt zonder internet, op de Maps-links na.

## Bewijsbeleid

Deze tool gaat over medicijnen en wonden, dus de regels voor bronnen zijn strenger dan die voor code:

- Een bewering die we niet kunnen onderbouwen gaat niet live. Precies daarom zijn er drie beweringen verwijderd: alcohol, ibuprofen en naproxen werden allemaal beschreven als middelen die inkt uit de huid duwen. Twee zoekrondes in Europe PMC leverden geen bewijs op, en de tekst zegt nu dat het effect op inktbehoud niet is onderzocht, in plaats van het te beweren.
- Bronnen worden op bewijs gekoppeld, nooit automatisch. Een losse identificatie naast een zin is geen bron zolang een mens niet heeft bevestigd dat het artikel zegt wat die zin zegt.
- "Wij hebben geen gegevens" wordt geschreven als "wij hebben geen gegevens", nooit als "veilig".

## Installatie

### Online gebruiken

<https://poliinternational.com/tools/medication-interaction-checker/>

### Lokaal draaien

Puur HTML, CSS en JavaScript. Geen afhankelijkheden, geen buildstap, geen pakketbeheerder.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# open index.html in je browser, of serveer de map:
python3 -m http.server 8000
```

Alle paden zijn relatief: de map werkt vanaf schijf, vanuit elke submap en achter elke statische host.

### Insluiten

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

De pagina luistert naar een `postMessage` van het type `poli-theme`, zodat een gastpagina de licht- of donkermodus kan bepalen. Zie de [technische documentatie](TECHNICAL_DOCUMENTATION_NL.md).

## Documentatie

- [Technische documentatie](TECHNICAL_DOCUMENTATION_NL.md): architectuur, dataschema's, het vertaalsysteem, het ontwerp van de omgevingszoekfunctie, insluiten en aanpassen.
- [Bijdragen](../CONTRIBUTING.md)

## Bijdragen

Correcties op de medische inhoud zijn de waardevolste bijdragen, en de maatstaf is de bron. Kun je een artikel aanwijzen dat iets hier tegenspreekt, open dan een issue met het PMID of DOI en wij handelen ernaar.

Vertaalcorrecties zijn net zo welkom. Noem de taal, het medicijn en de juiste formulering.

## Licentie

MIT. Zie [LICENSE](../LICENSE).

## Ondersteuning

- E-mail: <support@poliinternational.com>
- Fouten: [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Gemaakt door [Poli International](https://poliinternational.com)

[Website](https://poliinternational.com) · [Gratis tools](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
