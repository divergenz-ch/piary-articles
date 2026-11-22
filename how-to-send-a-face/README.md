# How do you tell an agent what a face did?

Open `article.html` in a browser. It is one file with no images and needs no network.

## Files

- `article.html`: the article.
- `article.md`: the same text as markdown. This is the source of the prose.
- `build.mjs`: turns `article.md` into `article.html`.
- `data/`: every answer, verdict, timeline and block of the experiment, and the format's
  specification, with its own README.

## Editing

Edit `article.md`, then rebuild. `build.mjs` needs the `marked` package and takes the path of a
folder whose `node_modules` has it (the root of this repository, after `npm install`):

    node build.mjs ..

## Where the numbers come from

The experiment lives in the Piary repository under `evals/spikes/face-format/`: the cases and
their timelines, the code that writes every block from a timeline, the guidance paragraph, the
reading test, the judge and the analysis script. `data/` here is a copy of what they produced.
