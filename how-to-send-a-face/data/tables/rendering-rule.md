# Which rendering is carried forward: the rule, written before the run

The agent reads plain words (`spec.md`). The decode run asks how few words a line can spend
before a model stops reading it right. Four renderings, none with a legend in the system
prompt: `words` (the first experiment's shape), `phrases`, `clipped`, `telegraphic`.

- **Accuracy** is the *whole* column of `decode.md`: the share of block lines a model
  transcribed with every field right (phase, anchor, movements, intensities, seconds), pooled
  over the eight items and three reps, per model. A line of an answer that did not parse counts
  as wrong.
- **Cost** is the *block* column: input tokens of the same turn with the block less without,
  mean over the items, on Haiku.
- **The choice** is the rendering with the lowest cost among those every one of the three
  models (Haiku 5.5, Sonnet 5.5, Opus 5.5) reads at 95% or better.
- **A long anchor repeated as written is right.** A typed stretch over 48 characters is shown
  to the model as its two ends around `…` in three renderings and whole in `words`. A model
  that transcribes it as the block has it has not misread it, so the anchor counts as right
  when it is the whole stretch or those two ends around `…`. How often the whole stretch came
  back is a column of its own. Decided before any of the three new renderings was run; it
  applies to every format, the earlier ones included.
- **A scorer's artefact is not a misreading.** Every wrong line of a rendering under 95% is
  read before the rendering is ruled out. If the model read the block right and the scorer
  asked for something else, the scorer is fixed for every rendering and the scores are printed
  again. What was changed is said in `rendering.md`.
- The codes, names and JSON formats are not candidates. Their rows stay in `decode.md` as what
  was tried first.

## 2026-11-17: a provisional harness

pi's Anthropic key reached its usage limit before the run ("You have reached your specified API
usage limits. You will regain access on 2026-12-01"). The decode was therefore run through
`claude -p` first (`HARNESS=claude`): the same models, items, question and system prompt text,
with Piary's prompt as the whole system prompt and no tools, into `decode-claude.md`. That
harness is not the one the app runs. Its `words` row on Haiku is compared with the pi run's
(100%, about 113 tokens a block) to see that the two agree, and the choice made from it is to
be confirmed by the same run through pi (`decode.md`) once the key answers again.
