# Vérificateur d'interactions médicaments et body art - Documentation technique

**Autres langues :** [English](../TECHNICAL_DOCUMENTATION.md) · [Italiano](TECHNICAL_DOCUMENTATION_IT.md) · [Español](TECHNICAL_DOCUMENTATION_ES.md) · [Deutsch](TECHNICAL_DOCUMENTATION_DE.md) · [Nederlands](TECHNICAL_DOCUMENTATION_NL.md) · [Português](TECHNICAL_DOCUMENTATION_PT.md)

---

## Sommaire

1. [Architecture](#architecture)
2. [Organisation des fichiers](#organisation-des-fichiers)
3. [Schémas de données](#schémas-de-données)
4. [Le système d'internationalisation](#le-système-dinternationalisation)
5. [Recherche géographique : des liens Maps dans la langue locale](#recherche-géographique--des-liens-maps-dans-la-langue-locale)
6. [Preuves et sources](#preuves-et-sources)
7. [État et stockage](#état-et-stockage)
8. [Intégration](#intégration)
9. [Personnalisation](#personnalisation)
10. [Sécurité](#sécurité)
11. [Navigateurs pris en charge](#navigateurs-pris-en-charge)

---

## Architecture

HTML, CSS et JavaScript ES2015+ statiques. Pas de framework, pas de bundler, pas de gestionnaire de paquets, et aucun appel réseau à l'exécution en dehors des liens Google Maps que l'utilisateur clique lui-même.

Chaque jeu de données est **figé à la compilation dans un fichier JavaScript**, et c'est délibéré. L'outil n'appelle jamais SUPP.AI, PubMed ni aucune autre API pendant qu'un client l'utilise. Il ne peut donc pas tomber en panne parce qu'un tiers est indisponible, il ne peut pas divulguer ce qu'un utilisateur consulte, et son comportement est reproductible à partir du seul dépôt.

L'ordre de chargement compte : les fichiers de données déclarent des `const` de premier niveau que lit `app.js`, donc `app.js` vient en dernier.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (texte clinique, 6 langues)
  -> js/medication-sources.js    (citations validées)
  -> js/supplement-stacking.js   (instantané SUPP.AI)
  -> js/geo-search.js            (termes de requête Maps + carte des fuseaux)
  -> js/app.js                   (données, interface, rendu)
```

Six onglets, commutés côté client, sans routage : `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## Organisation des fichiers

| Chemin | Taille | Rôle |
|---|---|---|
| `index.html` | ~43 Ko | Balisage, JSON-LD, structure des onglets, passerelle de thème pour iframe |
| `css/style.css` | ~60 Ko | Tout le style des composants, clair et sombre via des jetons sur `:root` |
| `css/a11y.css` | ~1 Ko | Utilitaires de focus visible et de lecteur d'écran |
| `css/print.css` | ~2 Ko | Règles d'impression pour la fiche praticien |
| `js/app.js` | ~181 Ko | Données `CATEGORIES`, 65 fonctions, tout le rendu |
| `js/med-content-i18n.js` | ~127 Ko | 684 chaînes cliniques rédigées à la main |
| `js/supplement-stacking.js` | ~48 Ko | 66 compléments, 49 couples, 132 articles |
| `js/geo-search.js` | ~14 Ko | 38 langues de requête, 217 correspondances de fuseaux |
| `js/medication-sources.js` | ~2 Ko | Citations PubMed validées par médicament |

## Schémas de données

### `CATEGORIES` (dans `app.js`)

La source de vérité unique pour les médicaments. 13 catégories, 38 médicaments.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // clé stable, utilisée par tous les autres fichiers
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // texte source anglais
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // synonymes de recherche, marques régionales incluses
      }
    ]
  }
]
```

`medMap` est une table plate `id -> médicament` construite à partir de cette structure au démarrage.

Identifiants de catégorie : `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**Le niveau de vigilance porte sur le risque lié à la procédure, pas sur la gravité du médicament.** `high` signifie que l'interaction avec une aiguille est importante. Un traitement vital peut très bien être `low`.

### `MED_CONTENT_I18N` (dans `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 médicaments x 3 champs x 6 langues = 684 chaînes. L'anglais se trouve dans `CATEGORIES` et n'est donc pas répété ici.

### `SUPPLEMENT_STACKING` (dans `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Généré depuis SUPP.AI. Seuls les couples comportant au moins une étude humaine ou clinique sont inclus ; les articles rétractés sont exclus. `cui` est l'identifiant de concept UMLS, et c'est lui qui rend la correspondance auditable.

### `MEDICATION_SOURCES` (dans `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` précise ce que l'article est censé étayer. Un objet vide n'affiche aucune ligne de sources, jamais un intitulé vide.

## Le système d'internationalisation

Deux couches distinctes, et les confondre est l'erreur classique :

1. **Les chaînes d'interface** vivent dans `TRANSLATIONS` (dans `app.js`), indexées par langue puis par clé, et sont appliquées via les attributs `data-i18n` et `data-i18n-placeholder`.
2. **Les chaînes cliniques** vivent dans `med-content-i18n.js` et sont lues par `medText(med, field)`.

`medText()` renvoie l'anglais lorsqu'une traduction manque et lève un indicateur `medTextFellBack`, qui affiche un avis visible. Le silence n'est pas une option : un lecteur voyant une interface française supposera que les informations médicales ont été relues en français.

Chaque affichage non anglais porte un avis permanent indiquant que la page est traduite et que la version anglaise est celle que nous garantissons. Cet avis n'est pas une bannière « traduction en cours » : il est permanent, parce que la garantie, elle, ne change pas.

**Le texte clinique est rédigé à la main, pas traduit automatiquement.** L'ordre dans lequel il a été construit est la partie réutilisable : le français d'abord, et uniquement les médicaments à vigilance élevée, parce que c'était la seule tranche qu'un relecteur pouvait réellement vérifier avant sa mise en ligne. Une fois relue, son vocabulaire est devenu fixe pour les cinq autres langues. Les décisions de terminologie sont consignées dans l'en-tête de `med-content-i18n.js` et doivent être lues avant d'ajouter une langue.

## Recherche géographique : des liens Maps dans la langue locale

`geo-search.js` alimente quatre liens : studio, médecin, pharmacie, hôpital.

**L'intitulé du bouton est dans la langue d'interface du lecteur. La requête Maps est dans la langue du lieu où il se trouve physiquement.** Ces deux langues sont volontairement différentes. Un lecteur francophone à Bangkok qui cherche `pharmacie` ne trouve presque rien ; `ร้านขายยา` trouve toutes les pharmacies de la rue.

La localisation est déduite de `Intl.DateTimeFormat().resolvedOptions().timeZone`, puis convertie via `GEO_SEARCH_ZONES` (217 entrées) en l'une des 38 langues de requête, avec l'anglais par défaut.

**Aucune autorisation de géolocalisation n'est jamais demandée**, et c'est un choix de conception, pas un oubli :

- Google Maps centre déjà une recherche « à proximité » sur l'appareil lui-même, donc les coordonnées ne sont pas nécessaires au fonctionnement.
- La seule chose que la position détermine est la langue de la requête, et le fuseau horaire y répond sans invite, sans clé d'API, sans appel réseau et sans qu'aucune donnée personnelle ne quitte la page.
- Une demande d'autorisation sur une page médicale coûte de la confiance, et tout utilisateur qui refuse perd purement et simplement la fonctionnalité.

Le prix à payer est qu'un VPN annonce un mauvais fuseau : l'interface propose donc un choix manuel de langue, conservé dans `localStorage`.

Seuls les fuseaux dont la langue **n'est pas** l'anglais figurent dans la table ; tout le reste retombe sur l'anglais par défaut, que Maps gère très bien partout dans le monde.

Un piège à conserver : la requête thaïe pour un studio est `ร้านสัก`, jamais `สัก` seul, qui désigne aussi le teck et renvoie des scieries.

`geo-search.js` embarque une vérification hors ligne. Lancez `node js/geo-search.js` pour contrôler que chaque langue possède les quatre termes, que chaque fuseau cartographié pointe vers une langue connue, et que les langues inconnues retombent correctement sur l'anglais.

### Le numéro des secours locaux

`geoEmergencyNumber()` convertit le même fuseau horaire en numéro d'urgence local :
172 fuseaux renvoient vers 19 numéros, et tout fuseau inconnu retombe sur `112 / 911`.

**Cette table a le profil de risque inverse de celui des termes Maps ci-dessus, et elle
est construite en conséquence.** Une mauvaise requête Maps ne renvoie rien ; un mauvais
numéro d'urgence coûte du temps dans la seule situation où le temps est tout le
problème. Seuls des numéros bien établis sont donc listés, rien n'est deviné, et
l'interface affiche toujours « vérifiez le numéro correct pour votre pays et gardez-le
au mur du studio » à côté de la valeur détectée. Lorsqu'un pays dispose d'une ligne
d'ambulance distincte de celle de la police (Norvège 113, Suisse 144, Brésil 192,
Russie 103), c'est le numéro **médical** qui est retenu : ce guide s'ouvre pour une
anaphylaxie ou une hémorragie, pas pour un délit.

Le numéro est rempli à l'ouverture de la fenêtre et non au chargement de la page, afin
qu'un téléphone arrivant dans un autre pays affiche le nouveau numéro sans rechargement.

## Preuves et sources

Les règles qui gouvernent le contenu sont plus strictes que celles qui gouvernent le code.

- **Les affirmations non étayées ne partent pas en production.** L'alcool, l'ibuprofène et le naproxène étaient chacun décrits comme chassant l'encre hors de la peau. Deux recherches dans Europe PMC n'ont trouvé aucune preuve. Le texte indique désormais que l'effet sur la tenue de l'encre n'a pas été étudié.
- **Les citations sont rattachées sur preuve.** Un identifiant seul à côté d'une phrase reste non vérifié tant qu'un humain n'a pas confirmé que l'article étaye cette phrase. `medication-sources.js` ne reçoit que des citations validées.
- **L'absence de données s'écrit comme une absence de données**, jamais comme une absence de risque.

Lors d'une recherche bibliographique, triez par pertinence et non par nombre de citations. Le tri par citations renvoie ce qui est le plus célèbre dans le domaine, pas ce qui est le plus pertinent pour la question posée.

## État et stockage

Tout l'état est côté client. Rien n'est transmis nulle part.

| Clé `localStorage` | Contenu |
|---|---|
| `ui_lang_v1` | Langue d'interface choisie |
| `geo_search_lang_v1` | Choix manuel de la langue de requête Maps |
| `readiness_assessment_autosave_v1` | Valeurs du calculateur de préparation |
| `recent_searches_v1` | Recherches récentes de médicaments |
| `appointment_datetime` | Heure du rendez-vous pour les comptes à rebours d'arrêt |

Chaque lecture et chaque écriture est entourée d'un `try/catch` : les fenêtres privées et les navigateurs qui bloquent les données de site ne doivent pas casser la page.

## Intégration

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

La page détecte `window.self !== window.top`, passe par défaut en sombre, puis écoute un message de thème :

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

`index.html` porte `noindex, nofollow` afin qu'une copie intégrée ne concurrence jamais la page canonique dans les résultats de recherche. Retirez cette balise si vous l'hébergez comme votre propre page principale.

## Personnalisation

**Ajouter un médicament :** ajoutez-le au tableau `CATEGORIES[].meds` concerné dans `app.js`. Seuls `id`, `name`, `cat`, `sev`, `tattoo` et `piercing` sont obligatoires. Ajoutez ensuite les six traductions dans `med-content-i18n.js` sous le même `id`, sinon l'outil retombera sur l'anglais et affichera l'avis de repli.

**Ajouter une langue :** créez un bloc `TRANSLATIONS` pour l'interface, ajoutez la langue à chaque médicament dans `med-content-i18n.js`, et lisez d'abord l'en-tête de terminologie de ce fichier pour que le vocabulaire du métier reste cohérent. Une langue partielle est pire que pas de langue du tout.

**Ajouter une langue de requête Maps :** ajoutez une entrée dans `GEO_SEARCH_TERMS`, un endonyme dans `GEO_SEARCH_LANG_NAMES` et les fuseaux concernés dans `GEO_SEARCH_ZONES`. Puis lancez `node js/geo-search.js`.

**Changer le style :** tout découle de propriétés personnalisées CSS sur `:root`, avec une surcharge `.light-mode`. Modifiez les jetons, pas les composants.

## Sécurité

- **Tout contenu interpolé passe par `escHtml()`**, qui échappe `&`, `<`, `>` et `"`. Le DOM est construit avec des gabarits littéraux : toute valeur non échappée serait un point d'injection.
- **Aucune saisie utilisateur n'est transmise.** Il n'y a pas de serveur, pas d'appel analytique et aucun script tiers.
- **Les liens Maps portent `rel="noopener noreferrer"`** et s'ouvrent dans un nouvel onglet.
- **Aucun champ d'identifiant, de paiement ou d'identité n'existe dans l'outil.**

## Navigateurs pris en charge

Tout navigateur disposant d'ES2015, d'`Intl`, des propriétés personnalisées CSS et de `localStorage` : Chrome, Edge, Firefox, Safari et leurs équivalents mobiles. Il n'y a ni couche de polyfill ni étape de transpilation.

---

## Assistance

- Courriel : <support@poliinternational.com>
- Anomalies : <https://github.com/Poli-International/medication-interaction-checker/issues>
