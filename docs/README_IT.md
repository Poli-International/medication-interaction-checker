# Verificatore di interazioni tra farmaci e body art

> Verifica come farmaci da prescrizione, antidolorifici da banco, creme anestetiche e integratori influiscono su sanguinamento, guarigione e rischio di svenimento prima di un tatuaggio o di un piercing.

**Online:** <https://poliinternational.com/tools/medication-interaction-checker/>

**Leggi in un'altra lingua:** [English](../README.md) · [Français](README_FR.md) · [Italiano](README_IT.md) · [Español](README_ES.md) · [Deutsch](README_DE.md) · [Nederlands](README_NL.md) · [Português](README_PT.md)

---

## Che cos'è

Un riferimento libero e gratuito per una domanda precisa: **quello che sto prendendo cambia ciò che accade quando un ago entra nella mia pelle?**

Gli anticoagulanti fanno sanguinare una seduta più a lungo. L'isotretinoina rende la pelle così fragile da lacerarsi. I betabloccanti attenuano la risposta all'adrenalina e favoriscono gli svenimenti. La nicotina priva un piercing fresco dell'ossigeno di cui ha bisogno. Quasi nessun cliente pensa a dirlo, e quasi nessun modulo di consenso lo chiede.

Lo strumento copre **38 farmaci e sostanze in 13 categorie**, ciascuno con l'effetto su un tatuaggio, l'effetto su un piercing e l'eventuale attesa o sospensione da rispettare. Tutto gira nel browser. Nessun account, nessun server, nessun tracciamento, nessuna fase di build.

## Che cosa non è

**Questo è un riferimento educativo, non un parere medico.** Non conosce la tua storia clinica, il tuo dosaggio né il motivo per cui prendi qualcosa. Non interrompere né modificare mai un farmaco prescritto per qualcosa che hai letto qui. Quella decisione spetta al medico che te lo ha prescritto.

## Funzionalità

- **38 farmaci, 13 categorie, 3 livelli di attenzione.** FANS, creme anestetiche, anticoagulanti, retinoidi, sedativi e farmaci per la pressione, ormoni e terapia ormonale, stimolanti, antidiabetici e agonisti del GLP-1, corticosteroidi, immunosoppressori e biologici, integratori erboristici, antibiotici e antivirali, e sostanze legate allo stile di vita.
- **Un verificatore di integratori basato su pubblicazioni reali.** 66 integratori, 49 coppie integratore-farmaco realmente studiate e 132 studi umani o clinici, estratti da [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Gli articoli ritirati sono esclusi. Dove non abbiamo studi, lo strumento lo dice invece di lasciar intendere che non ci sia rischio.
- **Fonti pubblicate, mostrate nello strumento.** Alcuni farmaci portano riferimenti PubMed. Compaiono solo le citazioni approvate da una persona: nulla viene allegato automaticamente.
- **Sette lingue di interfaccia, con il contenuto clinico davvero tradotto.** Inglese, francese, italiano, spagnolo, tedesco, olandese e portoghese. Le 684 stringhe cliniche sono scritte a mano, non tradotte a macchina, e ogni pagina non inglese porta un avviso permanente che indica l'inglese come versione di riferimento.
- **Collegamenti "qui vicino" che cercano nella lingua del posto.** I link a studio, medico, farmacia e ospedale aprono Google Maps con la richiesta formulata nella lingua del paese in cui ti trovi, non in quella che stai leggendo. Un lettore italiano a Bangkok che cerca "farmacia" non trova quasi nulla; il termine thailandese trova tutte le farmacie della via. 38 lingue di ricerca, 217 fusi orari mappati. **Non viene richiesta alcuna autorizzazione di geolocalizzazione** e nessun dato di posizione lascia la pagina: a Google va solo una parola di ricerca.
- **La guida d’emergenza mostra il numero dei soccorsi del suo paese.** Prima stampava « 911 / 112 » per tutti, il che è sbagliato in Thailandia (linea medica 1669), nel Regno Unito (999), in Australia (000), in Giappone (119) e altrove. 172 fusi orari rimandano a 19 numeri, un fuso non mappato ricade su « 112 / 911 », e la guida chiede sempre di verificare il numero del proprio paese e di tenerlo scritto sul muro dello studio invece di fidarsi di una deduzione.
- **Scheda per il professionista e messaggio al medico.** Trasforma una selezione in un riepilogo da consegnare al tatuatore o in una bozza di messaggio per il medico.
- **Promemoria e tempi di sospensione**, una sezione sulla sicurezza in studio e una sezione FAQ.
- **Completamente statico.** Clona il repository, apri `index.html` e funziona senza connessione, a parte i link a Maps.

## Politica sulle prove

Questo strumento parla di farmaci e di ferite, quindi le regole sulle fonti sono più severe di quelle sul codice:

- Un'affermazione che non possiamo sostenere non viene pubblicata. Tre affermazioni sono state rimosse proprio per questo: alcol, ibuprofene e naprossene erano tutti descritti come capaci di spingere l'inchiostro fuori dalla pelle. Due ricerche su Europe PMC non hanno trovato prove, e il testo ora dice che l'effetto sulla tenuta dell'inchiostro non è stato studiato, invece di affermarlo.
- Le citazioni si allegano sulla prova, mai automaticamente. Un identificativo isolato accanto a una frase non è una citazione finché una persona non ha confermato che l'articolo dice ciò che dice la frase.
- "Non abbiamo dati" si scrive "non abbiamo dati", mai "sicuro".

## Installazione

### Online

<https://poliinternational.com/tools/medication-interaction-checker/>

### In locale

HTML, CSS e JavaScript puri. Nessuna dipendenza, nessuna build, nessun gestore di pacchetti.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# apri index.html nel browser, oppure servi la cartella:
python3 -m http.server 8000
```

Tutti i percorsi sono relativi: la cartella funziona da disco, da qualsiasi sottodirectory o dietro qualsiasi hosting statico.

### Incorporamento

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

La pagina ascolta un `postMessage` di tipo `poli-theme` perché il sito ospitante possa imporre il tema chiaro o scuro. Vedi la [documentazione tecnica](TECHNICAL_DOCUMENTATION_IT.md).

## Documentazione

- [Documentazione tecnica](TECHNICAL_DOCUMENTATION_IT.md): architettura, schemi dei dati, sistema di internazionalizzazione, progettazione della ricerca geografica, incorporamento e personalizzazione.
- [Guida ai contributi](../CONTRIBUTING.md)

## Contribuire

Le correzioni al contenuto medico sono i contributi più preziosi, e il criterio è la citazione. Se puoi indicare un articolo che contraddice qualcosa qui, apri una segnalazione con il PMID o il DOI e interverremo.

Sono altrettanto benvenute le correzioni di traduzione. Indica la lingua, il farmaco e la formulazione corretta.

## Licenza

MIT. Vedi [LICENSE](../LICENSE).

## Assistenza

- Email: <support@poliinternational.com>
- Segnalazioni: [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Realizzato da [Poli International](https://poliinternational.com)

[Sito](https://poliinternational.com) · [Strumenti gratuiti](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
