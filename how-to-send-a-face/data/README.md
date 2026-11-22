# The experiment's data

Everything the article's numbers and quotes come from: 756 answers, 931 blind verdicts and
1,008 reading-test transcriptions (with 321 more turns that only measure what a block costs in tokens). All conversations are invented, no camera was used, and no face was
recorded. The facial timelines were written by an agent from a description of each scene.

## To read

`answers/<case>.md` is one page per conversation: the conversation, what was true of the user,
every block that was sent after the last message, then every answer, by arm and model. Start
here to see how the replies change.

`tables/README.md` is the result in full, and the other files in `tables/` are the tallies as
the analysis script printed them.

## To count

| Path | What it is |
|---|---|
| `spec.md` | The format: the timeline a detector writes, the rendering an agent reads, the rules both follow. |
| `cases/<case>/doc.md` | The conversation, in Piary's document format. The last `<!-- you -->` block is the message answered; it is empty in the `alone-*` cases. |
| `cases/<case>/timeline.json` | What the face did, as FACS codes against the typed text. The `alone-*` cases have `timeline.meaningful.json` and `timeline.meaningless.json` instead. |
| `cases/<case>/split` | `dev` (the guidance was tuned on it) or `test` (every reported number). |
| `scenes.json` | The description of each scene that the timeline's author was given. |
| `truths.json` | What was true of the user. The judge was told this; neither the agent nor the timeline's author was. `kind` is how the case is counted: `adapt` (the block was right), `wrong` (the same block, and it meant something else), `nothing`, and for `alone-*` cases `speak` or `silent`. |
| `signals/<case>/<arm>.md` | The block each arm sent, written from the timeline by a program. `face` is the chosen rendering (`clipped`); `words`, `phrases`, `clipped`, `telegraphic`, `codes`, `names` and `json` are the same timeline in each format; `noisy`, `noisy-filtered` and `filtered` are the noise arms; `digest` is the line a small model wrote. |
| `threshold.json` | What the app's filter drops. |
| `guidance/face.md`, `guidance/face2.md` | The two rounds of the system-prompt paragraph. `face2.md` is the frozen one. |
| `digests/<case>.json` | The digest arm: the line Haiku wrote, how long it took and its tokens. |
| `decode/items.json` | The eight messages and timelines of the reading test. |
| `decode/pi.json` | Every reading-test turn through pi with effort off: the format, the legend, the model, the answer, the turn's input tokens. `kind` is `decode` for a transcription and `tokens` or `legend` for a cost measurement. |
| `decode/claude-p.json` | The same test through `claude -p`, where most answers were thought about first. |
| `test/<model>/answers.json` | The test split's answers to the typing and reading cases. |
| `test/verdicts.json` | 839 verdicts on them. |
| `alone/<model>/answers.json` | The answers when nothing was typed. These were scored without a judge. |
| `dev/<model>/answers.json`, `dev/verdicts.json` | The two tuning rounds, Haiku and Sonnet. |
| `tables/rendering-rule.md` | The rule for choosing a rendering, written before the run. |

## Fields

An answer: `case`, `arm`, `rep`, `model`, `effort_applied`, `seconds`, `answer` (the prose),
`tool_calls` (name, arguments, whether it failed).

An arm is the block's name, then `@` and the guidance it ran under: `face@face2` is the chosen
rendering with the frozen guidance, `face@face` the same block under the first round's. `none`
is the control and `floor` a second set of control answers, which the first is compared with.

`effort_applied` is what pi reported after being asked for `off`: `off` on Haiku, `low` on
Sonnet and Opus. `seconds` are not comparable between arms, which ran at different times under
different load.

A verdict: `model`, `case`, `truth`, `kind`, `arm`, `rep`, `order` (`ab`: the arm's answer was
shown as A), `better`, `reason`, and for each of `A` and `B` four yes/no readings
(`answers_request`, `addresses_need`, `proportionate`, `remarks_on_user`). Each pair was judged
in one order, chosen by a hash of its name. One pair in ten was also judged the other way
round, only to measure how often the order decides.

A `canvas_edit` tool call was answered as the app would answer it: applied, or refused with a
reason.

## Where the code is

The serializers, the reading test, the runner script, the judge and the analysis are in the
Piary repository under `evals/spikes/face-format/`.
