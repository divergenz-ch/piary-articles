# The rendering carried forward: `clipped`

Chosen by the rule in `rendering-rule.md`, from the run through pi with effort off
(`decode.md`): 288 transcriptions, four renderings, three models, three reps, eight items, no
legend. pi applied `off` on Haiku and `low` on Sonnet and Opus.

| Rendering | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 | tokens per block |
| --- | --- | --- | --- | --- |
| `words` | 100% (42/42) | 100% (42/42) | 100% (42/42) | 113 |
| `phrases` | 93% (39/42) | 93% (39/42) | 100% (42/42) | 80 |
| `clipped` | 100% (42/42) | 100% (42/42) | 100% (42/42) | 64 |
| `telegraphic` | 100% (42/42) | 93% (39/42) | 100% (42/42) | 61 |

`clipped` is the cheapest rendering every model reads at 95% or better: it was read without
one wrong line, at 57% of what `words` costs. `telegraphic` is three tokens cheaper and falls
under the bar on Sonnet, so it is not carried forward; it is the runner-up arm of the typing
phase, on Sonnet.

```
[face]
read 0.6s: brows lowered marked + lips pressed slight 1.8s
typing "drop the cache line": brows lowered marked 2.3s
pause 6.2s after "still ship by Friday": inner brows raised slight 1.4s, then brows lowered marked 2.0s
deleted "this is ridiculous": brows lowered severe 1.1s
```

## What the wrong lines were

Every wrong line was read.

- **`telegraphic`, Sonnet, 3 lines: the same line in all three reps.** `pause "summary. Could
  you make" 3.8 eyes closed marked 1.5 > …` was transcribed with the caret after "summary."
  instead of after "make". The line has no word saying the quoted text came *before* the
  pause, and Sonnet placed the pause at the sentence break inside the quote. `clipped` writes
  `pause 3.8s after "summary. Could you make":` and was read right every time. This is the
  cost of the last few tokens: the word "after".
- **`phrases`, Haiku 3 lines and Sonnet 3.** Not misread words: two answers lost their place.
  Haiku once called a deleted line typing and then gave the deleted line again in place of the
  pause; Sonnet once split a two-step reading run into two entries, which shifted the two
  lines after it. Haiku also once wrote "lip corners pull down" for "pulled down". Nothing
  like it happened in the 126 lines of `words`, which is bulleted too, so it reads as chance,
  but the rule counts it and `phrases` is under the bar on two models.

## What the numbers do not say

- With 42 lines a model, one line is 2.4 points and one answer that loses its place is three
  lines. The `telegraphic` failure is the same line three times out of three and has a cause
  in the text; the `phrases` failures are two answers.
- A long anchor written `"first…last"` is given as the whole stretch by Opus every time, by
  Sonnet in 1 of 9 answers and by Haiku in 1 of 9; the rest repeat it as written, which counts
  as read. Whether a model that repeats it knows which words it covers is not something this
  test shows. It is the one construct to watch in the behaviour runs.

## The same run through `claude -p`, and why it was not enough

pi's Anthropic key was at its usage limit when the renderings were ready, so the run was first
made through `claude -p` (`decode-claude.md`). That harness could not be held to effort off:
206 of its 288 answers were thought about first (`--effort low` and `MAX_THINKING_TOKENS=0`
did not stop Haiku or Sonnet). There `telegraphic` scored 98%, 100% and 100% and would have
been chosen. Sonnet thought before all three of its answers to the pause line there and read it
right each time; through pi with effort off it read it wrong each time. The two runs differ in
harness as well as in thinking, so which of the two did it is not shown. An agent that answers
without thinking, in the harness the app uses, is the case the format has to hold for, so the
pi run decides.

## What was tried first

`decode.md` also holds the code formats, on all three models. Whole lines read right:

| Format · legend in the system prompt | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 | block | legend, per turn |
| --- | --- | --- | --- | --- | --- |
| FACS codes · none | 57% | 98% | 19% | 45 | 0 |
| FACS codes · grammar | 100% | 64% | 76% | 45 | 296 |
| FACS codes · grammar and code table | 100% | 48% | 88% | 45 | 546 |
| names (`brow-down:C`) · none | 86% | 81% | 95% | 60 | 0 |
| names · grammar | 100% | 93% | 100% | 60 | 297 |
| the timeline as JSON · none | 55% | 98% | 52% | 115 | 0 |

No model fails to answer: each misreads with confidence. Opus, shown `4C` (the brow lowerer)
with no legend, transcribed "lips pressed". Sonnet reads bare codes almost perfectly and gets
worse with a legend in front of it: with the full table it read 24 as "cheeks raised", and in four
of its 24 answers it wrote one transcription and then a second that disagreed with it (the
scorer counts such an answer as unparsed). No code or name format, with or without a legend, was
read at 95% by all three models, and a legend costs 300 to 550 tokens on every turn against
the 20 or so a code block saves over `clipped`. That is why the agent reads words and the
codes stay between the detector and the app (`spec.md`).
