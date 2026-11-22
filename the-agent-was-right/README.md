# The agent was right and the page was wrong

Open `article.html` in a browser. It needs the `images/` folder beside it and nothing else: no
network, no build step.

## Files

- `article.html`: the article, with the interactive comparisons.
- `article.md`: the same text as markdown, with static figures. This is the source of the prose.
- `images/`: every figure.
- `build.mjs`: turns `article.md` into `article.html`. The comparison widgets, their labels and
  which builds each one offers live here.

## Editing

For a small change, edit `article.html` directly.

To rebuild from the markdown, `build.mjs` needs the `marked` package. It takes the path of a
folder whose `node_modules` has it (the root of this repository, after `npm install`):

    node build.mjs ..

Add `--inline` to write every image into the page, for a single file to send to someone.
