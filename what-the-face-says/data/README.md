# The experiment's data

Everything the article's numbers and quotes come from: 504 answers and 816 blind verdicts. All
conversations are invented, no camera was used, and no face was recorded.

## To read

`answers/<case>.md` is one page per conversation: the conversation, the block sent after the
last message, then every answer to it, by model, effort setting and arm. Start here to see how
the replies change.

## To count

| Path | What it is |
|---|---|
| `cases/<case>/doc.md` | The conversation, in Piary's document format. The last `<!-- you -->` block is the message answered. |
| `cases/<case>/case.json` | The case's title, rubric and automatic checks. |
| `signals/<case>/expressive.md` | The block of facial movements sent after the message (the "signal" arm, and with the guidance paragraph the "signal + guidance" arm). |
| `signals/<case>/labels.md` | The same moment as emotion labels (first run only). |
| `signals/_default/neutral.md` | A block that says nothing notable (first run only). |
| `signals/_default/frown.md` | The block attached to the regression cases. |
| `guidance.md` | The paragraph added to the system prompt in the "signal + guidance" arm. |
| `truths.json` | What was true of the user in each case. The judge was told this; the agent was not. `kind` is how the case is counted: `adapt`, `ignore`, `noisy`, `misleading`, `proactive`. |
| `decision-rule.md` | The rule for reading the result, written before any verdict, with its erratum. |
| `first-run/answers.json` | Sonnet 5.5 at its lowest effort setting, five arms. The control (`none`) has six reps: reps 4 to 6 are the second control the first is compared with. |
| `first-run/verdicts.json` | 240 verdicts on the first run, from a judge that read each answer's prose only. |
| `first-run/regression/answers.json` | Four of Piary's existing eval cases, with and without a frown attached. |
| `matrix/<model>__<effort>/answers.json` | One model at one effort setting, three arms, three reps. |
| `matrix/<model>__<effort>/verdicts.json` | 96 verdicts each, from a judge that also saw each answer's tool calls. |
| `tables/` | The tallies the article quotes, as the analysis scripts printed them. |

`matrix/sonnet-5-5__off` holds the same answers as the first run's `none` (reps 1 to 3),
`expressive` and `guided` arms, judged again by the second judge.

## Fields

An answer: `case`, `arm` (`none` is the control, `expressive` the signal, `guided` the signal
with guidance), `rep`, `model`, `effort_asked`, `seconds`, `answer` (the prose), `tool_calls`
(name, arguments, whether it failed) and `checks`.

`effort_asked` is what the run asked for. Sonnet and Opus are given `low` when asked for `off`,
and the level is a budget: whether an answer was thought about first is not recorded.

A verdict: `case`, `truth`, `kind`, `arm`, `rep`, `order` (which of A and B was the arm's
answer), `better`, `reason`, and for each of `A` and `B` the four yes/no readings
(`answers_request`, `addresses_need`, `proportionate`, `remarks_on_user`). Each pair has two
verdicts, one per order. The article counts a win only when both pick the same answer.

A `canvas_edit` tool call marked failed did not fail on its merits: the test harness has no page
to apply an edit to.

## Where the code is

The runner, judge and analysis scripts are in the Piary repository under
`evals/spikes/expressions/`.
