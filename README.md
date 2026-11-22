# Piary articles

Write-ups from the Piary project at Divergenz: what we tried, what we measured and what we
decided. Piary is a desktop application in which a conversation with an AI agent is one markdown
document that the user and the agent both write into.

| Article | Read | About |
|---|---|---|
| **Code or catalog? How we decided what an AI agent draws with** | [markdown](code-or-catalog/article.md) · [page](code-or-catalog/article.html) | Free-hand code against a declarative catalog (A2UI) for the answers an agent draws: a blind comparison, the control that took our first result apart, and what we shipped. |
| **The agent was right and the page was wrong** | [markdown](the-agent-was-right/article.md) · [page](the-agent-was-right/article.html) | A rendering bug fixed four ways. When a model's output looks wrong on your screen, do you change its instructions or your screen? |
| **What should an agent do with your face?** | [markdown](what-the-face-says/article.md) · [page](what-the-face-says/article.html) | What an agent does when a message carries what a camera saw of the user's face: a synthetic experiment across three models and two effort settings, with no camera. |
| **How do you tell an agent what a face did?** | [markdown](how-to-send-a-face/article.md) · [page](how-to-send-a-face/article.html) | The follow-up: how to build it from what a webcam and the keystroke log supply. A format for facial movement, how few words it can be, who should write it, and what a meaningless signal costs. |

The first two pages have interactive figures (a divider to drag between two answers). GitHub shows an
`.html` file as source, so to read a page, clone the repository and open the file, or open
`index.html` at the root. The markdown versions read in place, with static figures.

## Editing

Each article is a folder: `article.md` is the source of the prose, `article.html` is built from
it by the folder's `build.mjs`, and `images/` holds its figures. Each folder's `README.md` says
how to rebuild it. To rebuild all of them:

    npm install
    npm run build

All data shown in the screenshots is invented.

## License

The articles, their figures and the code that builds them are source-available under the
[PolyForm Noncommercial License 1.0.0](LICENSE): you may use, change and share them for any
noncommercial purpose. Commercial use needs a separate licence from Divergenz, who hold the
copyright.
