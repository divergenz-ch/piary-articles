# Code or catalog? How we decided what an AI agent draws with

Open `article.html` in a browser. It needs the `images/` folder beside it and nothing else: no
network, no build step.

## Files

- `article.html`: the article, with the interactive comparisons.
- `article.md`: the same text as markdown, with static figures. This is the source of the prose.
- `images/`: every figure. `images/answers/` holds the 48 answer screenshots the comparisons use
  (4 requests, 3 answers each, 4 ways of drawing).
- `build.mjs`: turns `article.md` into `article.html`. The comparison widgets, their labels and
  their captions live here.
- `figures.mjs`: draws the three charts and the diagram.

## Editing

For a small change, edit `article.html` directly.

To rebuild from the markdown, `build.mjs` needs the `marked` package and `figures.mjs` needs
`@playwright/test`. Both take the path of a folder whose `node_modules` has them:

    node build.mjs <folder-with-node_modules>
    node figures.mjs <folder-with-node_modules> ./images
