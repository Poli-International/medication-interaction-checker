# Vérificateur d'interactions médicaments et body art

> Vérifiez comment les médicaments sur ordonnance, les antalgiques en vente libre, les crèmes anesthésiantes et les compléments alimentaires influencent le saignement, la cicatrisation et le risque de malaise avant un tatouage ou un piercing.

**En ligne :** <https://poliinternational.com/tools/medication-interaction-checker/>

**Lire dans une autre langue :** [English](../README.md) · [Français](README_FR.md) · [Italiano](README_IT.md) · [Español](README_ES.md) · [Deutsch](README_DE.md) · [Nederlands](README_NL.md) · [Português](README_PT.md)

---

## De quoi s'agit-il

Une référence libre et gratuite pour une question précise : **ce que je prends change-t-il ce qui se passe quand une aiguille entre dans ma peau ?**

Les anticoagulants font saigner une séance plus longtemps. L'isotrétinoïne fragilise la peau au point qu'elle se déchire. Les bêtabloquants atténuent la réponse à l'adrénaline et favorisent les malaises. La nicotine prive un piercing frais de l'oxygène dont il a besoin. La plupart des clients ne pensent jamais à le mentionner, et la plupart des fiches de consentement ne le demandent jamais.

L'outil couvre **38 médicaments et substances répartis en 13 catégories**, chacun avec son effet sur un tatouage, son effet sur un piercing, et l'éventuel délai d'attente ou d'arrêt à respecter. Tout fonctionne dans le navigateur. Pas de compte, pas de serveur, pas de traçage, pas d'étape de compilation.

## Ce que ce n'est pas

**Il s'agit d'une référence éducative, pas d'un avis médical.** L'outil ne connaît ni vos antécédents, ni votre posologie, ni la raison pour laquelle vous prenez quelque chose. N'arrêtez jamais un traitement prescrit et n'en modifiez jamais la dose à cause de ce que vous lisez ici. Cette décision appartient au médecin qui vous l'a prescrit.

## Fonctionnalités

- **38 médicaments, 13 catégories, 3 niveaux de vigilance.** AINS, crèmes anesthésiantes, anticoagulants, rétinoïdes, sédatifs et médicaments de la tension, hormones et THS, stimulants, antidiabétiques et analogues du GLP-1, corticoïdes, immunosuppresseurs et biothérapies, compléments à base de plantes, antibiotiques et antiviraux, et substances liées au mode de vie.
- **Un vérificateur de compléments alimentaires appuyé sur de vraies publications.** 66 compléments, 49 couples complément-médicament réellement étudiés et 132 études humaines ou cliniques, extraits de [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Les articles rétractés sont exclus. Lorsque nous n'avons aucune étude, l'outil le dit au lieu de laisser croire à une absence de risque.
- **Des sources publiées, affichées dans l'outil.** Certains médicaments portent des références PubMed. Seules les références validées par un humain apparaissent ; rien n'est rattaché automatiquement.
- **Sept langues d'interface, avec le contenu clinique réellement traduit.** Anglais, français, italien, espagnol, allemand, néerlandais et portugais. Les 684 chaînes cliniques sont rédigées à la main, pas traduites automatiquement, et chaque page non anglaise porte un avertissement permanent indiquant que la version anglaise est celle que nous garantissons.
- **Des liens « à proximité » qui cherchent dans la langue du lieu.** Les liens studio, médecin, pharmacie et hôpital ouvrent Google Maps avec une requête formulée dans la langue du pays où vous vous trouvez, et non dans la langue que vous lisez. Un lecteur francophone à Bangkok qui cherche « pharmacie » ne trouve presque rien ; le terme thaï trouve toutes les pharmacies de la rue. 38 langues de requête, 217 fuseaux horaires cartographiés. **Aucune autorisation de géolocalisation n'est demandée** et aucune donnée de position ne quitte la page : seul un mot de recherche est envoyé à Google.
- **Fiche pour le praticien et message au médecin.** Transformez une sélection en résumé à remettre à votre tatoueur, ou en brouillon de message pour votre médecin.
- **Rappels et délais d'arrêt**, une section sécurité en studio et une FAQ.
- **Entièrement statique.** Clonez le dépôt, ouvrez `index.html`, et tout fonctionne sans connexion, à l'exception des liens Maps.

## Politique de preuve

Cet outil parle de médicaments et de plaies, donc les règles sur les sources sont plus strictes que celles sur le code :

- Une affirmation que nous ne pouvons pas étayer ne part pas en production. Trois affirmations ont été retirées pour cette raison précise : l'alcool, l'ibuprofène et le naproxène étaient tous décrits comme chassant l'encre hors de la peau. Deux recherches dans Europe PMC n'ont trouvé aucune preuve, et le texte indique désormais que l'effet sur la tenue de l'encre n'a pas été étudié, au lieu de l'affirmer.
- Les citations sont rattachées sur preuve, jamais automatiquement. Un identifiant seul à côté d'une phrase n'est pas une citation tant qu'un humain n'a pas confirmé que l'article dit bien ce que dit la phrase.
- « Nous n'avons pas de données » s'écrit « nous n'avons pas de données », jamais « sans danger ».

## Installation

### En ligne

<https://poliinternational.com/tools/medication-interaction-checker/>

### En local

HTML, CSS et JavaScript purs. Aucune dépendance, aucune compilation, aucun gestionnaire de paquets.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# ouvrez index.html dans votre navigateur, ou servez le dossier :
python3 -m http.server 8000
```

Tous les chemins sont relatifs : le dossier fonctionne depuis le disque, depuis n'importe quel sous-répertoire ou derrière n'importe quel hébergement statique.

### Intégration

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

La page écoute un `postMessage` de type `poli-theme` pour qu'un site hôte puisse imposer le mode clair ou sombre. Voir la [documentation technique](TECHNICAL_DOCUMENTATION_FR.md).

## Documentation

- [Documentation technique](TECHNICAL_DOCUMENTATION_FR.md) : architecture, schémas de données, système d'internationalisation, conception de la recherche géographique, intégration et personnalisation.
- [Guide de contribution](../CONTRIBUTING.md)

## Contribuer

Les corrections du contenu médical sont les contributions les plus précieuses, et le critère est la citation. Si vous pouvez pointer un article qui contredit quelque chose ici, ouvrez un ticket avec le PMID ou le DOI et nous agirons.

Les corrections de traduction sont tout aussi bienvenues. Précisez la langue, le médicament et la formulation attendue.

## Licence

MIT. Voir [LICENSE](../LICENSE).

## Assistance

- Courriel : <support@poliinternational.com>
- Anomalies : [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Réalisé par [Poli International](https://poliinternational.com)

[Site](https://poliinternational.com) · [Outils gratuits](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
