# Face format: what the experiment found

The feature is being built whatever this says. The experiment looked for the best way to build
it from what a webcam face model and the app's keystroke log can supply today, and for what
agents do with this kind of information. Every block an agent saw was written from a case's
timeline by `build.ts`; the timelines were written by an agent that saw each scene and never
the truth an answer is judged against.

Models: Haiku 5.5, Sonnet 5.5, Opus 5.5 through the user's own pi with Piary's prompt, effort
asked `off` (pi applied `off` on Haiku and `low` on Sonnet and Opus), three reps. Every number
below is from the `test` split unless it says dev. The judge is Opus through `claude -p`, told
what was true of the user and not which answer saw a block.

## The recommended configuration

| Choice | Recommendation | What it costs |
| --- | --- | --- |
| Detector → app | The timeline as JSON with FACS codes (`spec.md`) | nothing the agent pays |
| App → agent | The `clipped` rendering: plain words, one line per observation | 64 input tokens a block (mean of eight test blocks), no legend |
| Filtering | In the app, a fixed rule before rendering: no blinks, nothing under `marked`, nothing under 0.5 s | no model call |
| Guidance | One paragraph in the system prompt (`guidance/face2.md`) | 385 input tokens a turn, cached |
| Reading | The first 4 s after an answer appears, with no location | as a block |
| Nothing typed | The block alone; the agent replies `[silent]` or one or two sentences | a turn per reading window sent |
| A model in between | No: a digest by a small model did no better and adds seconds | see below |

## 1. Words, and how few of them (`rendering.md`, `decode.md`)

The agent reads plain words; FACS numbers stay between the detector and the app. Bare codes
were read right in 57% of lines by Haiku, 98% by Sonnet and 19% by Opus, which transcribed the
brow lowerer as "lips pressed". With the full legend Haiku read 100%, Opus 88% and Sonnet 48%.
No code or name format was read at 95% by all three, and a legend costs 300 to 550 tokens on
every turn.

Four plain-words renderings were transcribed back into structured data by each model, with no
legend. `clipped` (64 tokens a block) was read without a wrong line in 126. One step terser,
`telegraphic` (61 tokens) lost Sonnet on a pause line in three reps of three, because the line
no longer said the quoted text came *before* the pause. The same run through `claude -p`,
where Sonnet thought before each of those answers, had not shown it.

In the behaviour runs the two were also compared on Sonnet (`runner-up.md`): `clipped` 10–5
and `telegraphic` 9–6 where the block was right about the user. Nothing separates them there;
the reading test is what does.

## 2. A movement tied to typed text (`typing.md`)

Eight typing cases. A cell is the block's answer preferred–the control's preferred, over the
three models; `floor` is control against control.

| Truth | block + guidance | floor |
| --- | --- | --- |
| the block was right about the user (5 cases) | 29–16 (p=0.07) | 24–21 |
| the same block, and it meant nothing of the kind (5 cases) | 27–18 (p=0.23) | 24–21 |
| only what a face does when it means nothing (3 cases) | 16–11 (p=0.44) | 9–18 |

- The judge said the answer met the user's unspoken need in 23 of 45 answers with the block,
  against 15 of 45 for the control beside it and 16 of 45 for the floor's.
- The effect is modest and not uniform. Two cases carry it (`same-timeout` 8–1,
  `idempotency-keys` 8–1); one goes the other way (`coffee-joke` 2–7, where the floor also
  swung 1–8, so its control answers vary a lot by themselves).
- **The first two rows are the same pairs of answers**, judged under two things the judge was
  told about the user. 29–16 against 27–18 therefore says the preference barely moved with the
  truth: answers written with the block were liked a little better whatever the user's state.
  A block that was wrong about the user did not make them worse. On dev the same guidance lost
  2–16 under the wrong truth, on three cases; test does not repeat that, and the floor shows
  how far two sets of control answers drift apart with nothing changed (9–18).
- The block never ran without the guidance paragraph, and the control had neither. What is
  measured is the two together.
- One answer of the 360 that had a block of some kind (typing and reading cases, every arm)
  named the user's state: Haiku under `noisy` opened "You're right to be frustrated", which
  the user had not said. The judge flagged it; a word search for faces and cameras found
  nothing in any arm.
- Answers got somewhat shorter with the block (median words: Haiku 82 → 78, Sonnet 103 → 95,
  Opus 118 → 105).
- The judge's order decided 5 of 16 pairs judged both ways. These answers are close.

## 3. Guidance (`dev.md`)

Tuned on the four dev cases only, two rounds, then frozen. A paragraph that called the block
weak evidence and asked for change only when cheap left agents answering as without it (11–7
where the block was right). A paragraph that says what a marked movement over a few words is
evidence of, what to spend on it (one or two sentences), and what changes nothing (a slight
movement, one held over a long stretch, one tied to no words) moved that to 15–3 on dev.

## 4. The reading window (`reading.md`)

Four cases where the block held only the first four seconds after the previous answer
appeared, with no knowledge of where the user looked.

| Truth | block + guidance | floor |
| --- | --- | --- |
| right about the user (3 cases) | 19–8 (p=0.05) | 15–12 |
| wrong about the user (3 cases) | 14–13 | 7–20 |
| nothing (1 case) | 4–5 | 3–6 |

By the previous answer's length: after a long answer (168 and 289 words) 15–3; after the short
one that had a truth to adapt to (38 words) 4–5. One short case is not a comparison, and the
floor is as noisy here as anywhere (7–20 with nothing changed). An unanchored window is worth
sending; how much it is worth this run cannot say.

## 5. Nothing typed (`alone.md`)

The block sent alone, a few seconds after an answer. Scored without a judge: spoke, or replied
`[silent]`.

| Model | spoke when the truth says speak | silent when the truth says silent | median words when it spoke |
| --- | --- | --- | --- |
| Haiku 5.5 | 0/9 | 27/27 | – |
| Sonnet 5.5 | 7/9 | 24/27 | 80 |
| Opus 5.5 | 9/9 | 24/27 | 46 |

- Every model can stay silent, and jitter never made one speak (36 of 36 silent).
- Haiku never spoke. With this guidance it is a model that cannot be given the unprompted turn.
- Sonnet and Opus spoke when the truth said so, and re-explained the passage in a few
  sentences, which is what the truth asked for. Opus kept to the "one or two sentences" better.
- The six wrong ones are one case: a strong reaction whose cause was off the screen
  (`alone-operator-jargon`, meaningless). Both models spoke in three reps of three. A strong
  movement with nothing to do with the answer cannot be told from one that has, and the cost
  is an unasked re-explanation.
- The app's filter leaves nothing of jitter, so with the filter on that turn is never sent.

## 6. Noise and where to filter (`noise.md`)

Haiku and Sonnet, the typing cases. `noisy` is the timeline as a detector might report it (15%
of true steps missed, five brief weak movements added); `noisy-filtered` is that after the
app's fixed filter; `digest` replaces the rendering with one line written by Haiku from the
message and the filtered timeline.

| Truth | clean | noisy | noisy, filtered | digest |
| --- | --- | --- | --- | --- |
| right about the user | 21–9 | 19–11 | 23–7 | 21–9 |
| wrong about the user | 21–9 | 18–12 | 15–15 | 13–17 |
| nothing | 8–10 | 8–10 | 8–10 | 8–10 |

- Raw detector output did not derail either model: with five extra weak lines in the block the
  answers were about as good. The filter is still the thing to ship: it is free and it keeps
  the block at its 64 tokens instead of growing with the noise. Its column is the best where
  the block was right (23–7) and not where it was wrong (15–15).
- **The digest bought nothing.** Its answers were preferred as often as the rendering's. It
  cost a Haiku call of 4 to 34 seconds (median about 9.5, measured through pi while other runs
  were going) and about 3,100 input tokens before the agent could start. Its lines stayed with
  movements and named no feelings, but three of sixteen carried a FACS code or letter into the
  text (`AU4`, `85C`), which is what the rendering exists to keep out.
- The one answer that named the user's state (§2) was under `noisy`: two of that arm's 78 judge
  readings, both of that answer. None was flagged under any other arm.

## What this run cannot say

- Every count here is three reps of a few cases. The floor rows are the scale: control against
  control gave 24–21, 9–18 and 7–20. Only differences well outside that mean something, and
  few here are.
- The faces are invented. Timelines were written by an agent from a description of the scene,
  and the noise is a generator's. No camera was used.
- Seconds per answer are not comparable between arms: arms ran at different times under
  different load.
- The silence sentence had no dev case; its first test run is its only run.
