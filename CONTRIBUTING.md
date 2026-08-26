# Contributing to the Medication & Body Art Interaction Checker

Thanks for your interest. This tool is part of the Poli International widget suite.

## Development setup

There is no build process, no package manager and no dependencies.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# open index.html directly, or serve the folder:
python3 -m http.server 8000
```

The only automated check in the repository is the geo-search self-test:

```bash
node js/geo-search.js
```

It asserts that every query language has all four search terms, that every mapped
timezone points at a known language, and that unknown languages fall back to English.

## Corrections to the medical content

**These are the most valuable contributions, and the bar is a citation.**

If something here is wrong, open an issue with a PMID or DOI and quote the sentence
you are disputing. We will check the paper against the sentence and act on it.

Three rules govern this content, and pull requests are held to them:

1. **A claim we cannot support does not ship.** If the literature does not answer the
   question, the text says the question has not been studied. It does not guess, and
   it does not soften a guess into a hedge.
2. **Citations attach on proof.** An identifier next to a sentence is not a citation
   until a human has confirmed the paper supports that specific sentence.
3. **Absence of evidence is written as absence of evidence, never as safety.**

When searching the literature, sort by relevance rather than citation count. Sorting
by citations returns whatever is most famous in the field, not what answers the
question.

## Translation corrections

Equally welcome. Say which language, which medication, and what the phrasing should be.

Before proposing a new language or reworking an existing one, read the terminology
header at the top of `js/med-content-i18n.js`. It records the vocabulary each language
is committed to, checked against that language's own professional bodies rather than
guessed. Consistency across 38 medications matters more than any single elegant phrase.

A partially translated language is worse than no translation at all: someone reading a
French interface will assume the drug guidance was reviewed in French. If you add a
language, add it for every medication.

## Code contributions

- Everything interpolated into the DOM must pass through `escHtml()`.
- No new runtime network calls. Data sets are snapshotted into JavaScript files
  deliberately, so the tool cannot break because a third party is down and cannot leak
  what a user is looking up.
- No new dependencies. If it needs a package, it probably does not belong here.
- Wrap every `localStorage` read and write in `try/catch`.

---

**Part of:** [Poli International widget suite](https://poliinternational.com/tools/)
**License:** MIT
**Maintained by:** Poli International Co., Ltd.
