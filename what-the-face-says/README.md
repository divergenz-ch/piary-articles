# What should an agent do with your face?

Open `article.html` in a browser. It is one file with no images and needs no network.

## Files

- `article.html`: the article.
- `article.md`: the same text as markdown. This is the source of the prose.
- `build.mjs`: turns `article.md` into `article.html`.
- `data/`: every answer and verdict of the experiment, with its own README.

## Editing

Edit `article.md`, then rebuild. `build.mjs` needs the `marked` package and takes the path of a
folder whose `node_modules` has it (the root of this repository, after `npm install`):

    node build.mjs ..

## Where the numbers come from

The experiment lives in the Piary repository under `evals/spikes/expressions/`: the cases, the
signal blocks, the guidance paragraph, the judge and the analysis scripts. `data/` here is a copy
of what they produced.
