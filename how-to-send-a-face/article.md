# How do you tell an agent what a face did?

*Divergenz. November 2026.*

In [the first experiment](../what-the-face-says/article.md) we handed an agent a note about the user's face and watched what it did. A true note tied to a passage improved the answer. A wrong one made it worse every time. That was enough to decide to build the thing.

It was not enough to build it. The notes in that experiment were written by hand, and the best of them said things like "brows lowered while reading this sentence, read twice". Knowing which sentence someone is reading takes eye tracking, and a laptop has a webcam. So this second experiment starts from what we can have today and asks practical questions. What does the note look like? How short can it be? Who writes it? What happens when most of what a face does means nothing, which is most of the time?

This article is not about whether to do it. It is about how, and what each choice costs. About 760 answers, 930 blind judgements and 1,000 reading tests later, the short version:

- **Write it in plain words, not codes.** There is a standard numbering for facial movements and models half-know it, which is worse than not knowing it.
- **Sixty-four tokens is enough**, and the last three tokens we tried to save broke it.
- **A fixed rule in the app should do the filtering and the writing.** A small model in between added seconds and nothing else.
- **The gains are modest, and so is the harm.** With the block, answers were preferred a little more often, whether or not the block was right about the user.
- **An agent can be trusted to stay silent**, but it cannot tell a strong reaction to its answer from a strong reaction to something else.

## What a webcam and a keyboard know

Two sources, both available now.

A face model such as MediaPipe's gives, for every camera frame, scores for about fifty facial movements and the head's pose. It can say *brows lowered, strongly, for two seconds*. It cannot say what the eyes were on.

The app's own keystroke log knows what no camera does: which words were being typed at each moment, where typing stopped and for how long, and what was typed and then deleted.

Put together, they give something precise for free. While the user types, a movement can be tied to the exact words under their fingers. No clock, no gaze. While the user reads, the best we have is the first few seconds after an answer appears, with no idea where they were looking.

So a face note can say four kinds of thing: this happened **while typing** these words; this happened during a **pause** after these words; this happened over words that were then **deleted**; this happened some seconds into **reading**, place unknown.

## Two layers

The detector and the agent need different things, so they get different formats.

**From the detector to the app** goes a timeline: structured data, with the movements as codes of the Facial Action Coding System, the old standard every detector can be mapped to. Code 4 is the brow lowerer, 24 the lip pressor, and a letter from A to E says how strong.

```json
{ "type": [
  { "kind": "during", "text": "like you said", "run": [ { "units": [[4,"C"]], "dur": 2.6 } ] },
  { "kind": "pause", "after": "by Friday", "pause": 6.2,
    "run": [ { "units": [[1,"B"],[2,"B"]], "dur": 1.4 }, { "units": [[4,"C"]], "dur": 2.0 } ] }
] }
```

**From the app to the agent** goes a few lines of text at the end of the user's message, written from that timeline by a fixed rule. No model is involved. The full specification, with the grammar and the rules for quoting text, is in [`data/spec.md`](data/spec.md).

In the experiment every case had one timeline, and everything an agent was shown was generated from it. Two formats being compared therefore always said the same thing. (In the first experiment they did not, and we could not tell the format's effect from the content's.) The timelines were written by a separate agent that was given a description of each scene and never saw what a good answer would be.

## Why not just send the codes

The tempting design is to send the codes themselves. They are compact, standard and unambiguous:

```
[face/1]
t "like you said" 4C 2.6
p "by Friday" 6.2 1B+2B 1.4 > 4C 2.0
```

We tested this the plain way: show a model the block and ask it to transcribe it back into structured data, then compare with the timeline. No judge, exact match.

It failed in an instructive way. With no explanation, each model did something different. Sonnet read the bare codes almost perfectly: 98% of lines. Haiku got 57%. Opus got 19%, and not by declining to guess. Shown `4C`, the brow lowerer, it answered "lips pressed". Models have seen this numbering, but not reliably, and none of them said so.

So we added a legend to the system prompt. Haiku went to 100% and Opus to 88%. Sonnet, which had been reading the bare codes correctly, fell to 48% with the full table in front of it: it read code 24 as "cheeks raised", and in four of its 24 answers it wrote one transcription, then a second that disagreed with the first. Replacing the numbers with fixed names (`brow-down:C`) did better, but no combination of codes or names, with or without a legend, was read at 95% by all three models. And a legend costs 300 to 550 tokens on every turn, to save the 20 or so that a code block saves over plain words.

Plain words needed no legend and were read right. So the codes stay between the detector and the app, where a program reads them, and the agent gets words.

## How few words

Then the question becomes how terse the words can be. We wrote the same timeline four ways and ran the reading test on all three models, three times each, with no legend for any of them. The rule for choosing was written down first: the cheapest rendering that every model reads at 95% or better.

| Rendering | Example line | Tokens per block | Haiku | Sonnet | Opus |
|---|---|---|---|---|---|
| words | `- paused 3.8 s after typing "…summary. Could you make": eyes closed (marked), 1.5 s`, under a long header | 113 | 100% | 100% | 100% |
| phrases | `- paused 3.8 s after "summary. Could you make": eyes closed (marked), 1.5 s` | 80 | 93% | 93% | 100% |
| clipped | `pause 3.8s after "summary. Could you make": eyes closed marked 1.5s` | 64 | 100% | 100% | 100% |
| telegraphic | `pause "summary. Could you make" 3.8 eyes closed marked 1.5` | 61 | 100% | 93% | 100% |

**Clipped** wins: read without a single wrong line out of 126, at a little over half the cost of the version we started with.

The telegraphic row is the interesting one. It saves three tokens, and Sonnet misread the same line in three runs out of three. The line was a pause. In the clipped form it says `pause 3.8s after "summary. Could you make"`. In the telegraphic form the word "after" is gone, and Sonnet placed the pause at the full stop inside the quotation instead of at its end. Nothing in the line said the quoted words came *before* the pause. One preposition was carrying the meaning.

We nearly missed it. The key we run agents on hit its spending limit that day, so we first ran the reading test through a different harness, where we could not turn the models' thinking off. There, telegraphic scored 98%, 100% and 100% and would have been chosen. Sonnet thought before all three of its answers to that line there, and read it right all three times. Through our own harness with thinking off, it read it wrong all three times. The two runs differ in harness as well as in thinking, so we cannot be certain which did it. But an agent that answers without thinking, in the app's own harness, is the case a format has to survive, so the second run decided.

(The phrases row falling under the bar looks like chance: two answers lost their place in the list. The rule counts it anyway.)

This is the block for a user who has just been told, for the second time, to clear a cache:

```
[face]
deleted "this is the second time I have done this": brows lowered severe + lips pressed marked 8.0s
typing "like you said": brows lowered marked 2.6s
typing "the same timeout": head shake marked 0.8s
```

## Does the agent use it?

Sixteen conversations for the test (eight with movements while typing, four with a reading window, four with nothing typed) and four more held back for tuning. Each answered with and without the block, three times, on Haiku 5.5, Sonnet 5.5 and Opus 5.5. A judge (Opus, in a separate process) read each pair without knowing which answer had seen a block. It was told what was true of the user, which the agent was not.

Three kinds of truth, because the same frown can mean different things:

- the block was **right** about the user (they really were fed up, or unsure, or doubtful);
- the same block was **wrong** (they frowned at the screen's brightness);
- the block held **nothing** but what faces do anyway (concentration, a yawn).

And in every model we compared the control with a second batch of control answers. That "floor" shows how much two sets of answers differ when nothing was changed.

For movements tied to typed words, eight conversations:

| What was true | With the block: preferred–not | Floor |
|---|---|---|
| The block was right | 29–16 | 24–21 |
| The same block, wrong | 27–18 | 24–21 |
| Nothing meaningful | 16–11 | 9–18 |

Read the floor column first. Control against control gave 9–18 in one cell. That is the noise, and 29–16 is not far outside it. The honest reading: **the block helps a little when it is right.** The judge said the answer met the user's unspoken need in 23 of 45 answers with the block, and in 15 of 45 without.

Where it worked, it looked like this. To the cache user above, the control began "Since the cache and the restart didn't help…" and walked on through the earlier list. With the block, Opus began: "Sorry, the cache step was a detour." Then it went straight to the cause.

The second row needs care. Its answers are the same answers as the first row's. Only what the judge was told about the user differs. So 29–16 against 27–18 says that the judge's preference barely moved with the truth: the answers written with the block were liked a little better whatever the user's state. They were somewhat shorter (a median of 82 to 118 words without the block, 78 to 105 with it) and the judge more often called them proportionate. We cannot separate the block from the paragraph of guidance that came with it, because the control had neither.

What we can say is that a wrong block did not do the damage it did in the first experiment, where a wrong signal lost every time. There the agent re-explained a passage at length. Here the guidance caps what a movement may cost: one or two sentences on the words it was tied to. On the four tuning conversations the same guidance did lose under the wrong truth, 2–16, so the cap is not a guarantee.

Did the agents talk about the user's face? Of 360 answers that had a block of some kind, one did. Haiku, given the noisy version of the cache user's block, opened with "You're right to be frustrated." The user had not said so. Compare Opus's "Sorry, the cache step was a detour", which answers the same frown without naming it.

## The paragraph that goes with it

That guidance took two tries, on the four held-back conversations only. The first version called the block weak evidence and said to change the answer only when the change was cheap. Agents then mostly answered as if the block were not there (11–7 where it was right). The second version says what a marked movement over a few words is evidence of (the user may be unsure, doubtful or stuck there), what to spend on it, and what changes nothing: a slight movement, one held over a long stretch of text, one tied to no words. That moved it to 15–3 on those four conversations, and we froze it before touching the test set. It costs 385 tokens a turn.

Telling an agent to be careful made it do nothing. Telling it what the evidence means and what it may spend made it useful.

## Reading, without knowing where

For the first four seconds after an answer appears we know what the face did and not what it was looking at. Is that worth sending?

Where the block was right, the answer with it was preferred 19–8 (floor 15–12). Where it was wrong, 14–13. So yes, on four conversations. It seemed to help more after a long answer than after a short one, which is the opposite of what we expected, but that rests on one short conversation and we would not build on it.

## When the user has typed nothing

The uncomfortable feature: the user reads the answer, says nothing, and the agent speaks anyway. For that, the block is sent alone a few seconds after the answer. The guidance tells the agent to reply with exactly `[silent]`, which the app would not show, unless the movements make it likely that its answer left the user stuck.

No judge is needed for the first question. Did it speak or not, and should it have?

| Model | Spoke when it should | Silent when it should | Words when it spoke |
|---|---|---|---|
| Haiku 5.5 | 0 of 9 | 27 of 27 | – |
| Sonnet 5.5 | 7 of 9 | 24 of 27 | 80 |
| Opus 5.5 | 9 of 9 | 24 of 27 | 46 |

Every model can stay silent, and random twitches never made one speak: 36 of 36. Haiku stayed silent always, including when it should have helped. Sonnet and Opus spoke when the face said the user was lost, and what they said was a short second explanation ("Put simply, an operator is a program that…").

Then there are the six failures, and they are all one conversation. The user leaned in, tilted their head and pressed their lips, strongly, right after the answer appeared. They were wiping a mark off the screen. Both Sonnet and Opus spoke, three times out of three, and re-explained an answer nobody had a problem with. A strong reaction to the answer and a strong reaction to something else look the same. No wording will fix that. It is a limit of the signal, and the product has to be designed around it: an unprompted remark must be easy to ignore.

## Noise, and who cleans it

A real detector misses things and invents things. We made a noisy version of every timeline with a seeded generator: 15% of true movements dropped, five brief weak ones added. Then three ways of dealing with it, on Haiku and Sonnet:

| What was true | Clean | Noisy | Noisy, filtered by the app | Digest by a small model |
|---|---|---|---|---|
| The block was right | 21–9 | 19–11 | 23–7 | 21–9 |
| The block was wrong | 21–9 | 18–12 | 15–15 | 13–17 |
| Nothing meaningful | 8–10 | 8–10 | 8–10 | 8–10 |

The noise barely mattered. Five extra lines of trace-strength twitches did not derail either model. The filter is a fixed rule in the app (drop blinks, drop anything weaker than "marked", drop anything shorter than half a second). It costs nothing and it keeps the block from growing with the noise. Its column is the best where the block was right and no better than the others where it was wrong.

The last column is the idea we most expected to work: let a small, fast model read the timeline and the message and write one line for the main agent. It did no better than the fixed rendering. It added a model call of four to thirty-four seconds before the agent could start. Its lines stayed with movements and named no feelings, which we had worried about, but three of sixteen leaked a code into the text ("AU4", "85C"), the very thing the rendering exists to keep out. A rule is faster, free and cannot improvise.

## What we will build

| Choice | Decision | Cost |
|---|---|---|
| Detector to app | A timeline in JSON with FACS codes | none to the agent |
| App to agent | Clipped plain words, one line per observation | about 64 tokens a message |
| Filtering | A fixed rule in the app | no model call |
| Guidance | One paragraph in the system prompt | 385 tokens a turn |
| Reading | The first four seconds, place unknown | as above |
| Nothing typed | The block alone; the agent answers `[silent]` or a sentence or two | one extra turn |
| Small models | No unprompted turn for a model that never takes it | – |

## What this does not show

The faces are invented. An agent wrote each timeline from a description of a scene, and a generator wrote the noise. No camera was used and no face was recorded. Whether a real detector's output looks like our timelines is the next experiment, and it is the one that matters most.

The counts are small: three runs of a handful of conversations. The floor column is there so that nobody, including us, reads 29–16 as more than it is. The reading-test results are firmer, because they are exact matches and the failure that decided them happened three times out of three.

The block never ran without its guidance paragraph, and the control had neither. Where answers with the block were tighter, that may be the paragraph's doing as much as the block's.

And the judge is a model that was told the truth. It can say which answer suits a user who is fed up. It cannot say whether a real fed-up user would have noticed.

## The data

Everything is in this article's [`data/`](data/README.md) folder: 756 answers, 931 blind verdicts with the judge's reason for each, 1,008 reading-test transcriptions, every timeline and every block, the specification, both versions of the guidance and the rule we wrote before choosing a rendering.

The quickest way in is one page per conversation, with the blocks and every model's answers:

- [The same timeout](data/answers/same-timeout.md): the cache user
- [Nothing typed, a reaction to something else](data/answers/alone-operator-jargon.md)
- [The joke about the coffee machine](data/answers/coffee-joke.md): the one that went the other way
- [Concentrating](data/answers/concentrating.md): a long frown that means nothing

## References

- Ekman, Friesen. *Facial Action Coding System*, 1978; the codes are summarised on [Wikipedia](https://en.wikipedia.org/wiki/Facial_Action_Coding_System).
- Google. [MediaPipe Face Landmarker](https://ai.google.dev/mediapipe/solutions/vision/face_landmarker): 52 facial movement scores and a head pose from an ordinary camera.
- Barrett, Adolphs, Marsella, Martinez, Pollak. [Emotional Expressions Reconsidered](https://pmc.ncbi.nlm.nih.gov/articles/PMC6640856). *Psychological Science in the Public Interest*, 2019. Why the note says movements and not feelings.

All conversations and data in the test cases are invented.
