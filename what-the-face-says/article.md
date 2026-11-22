# What should an agent do with your face?

*Divergenz. November 2026.*

A user asks why their Docker build takes nine minutes. The agent explains, and in passing adds a line the user did not ask for: `RUN --mount=type=cache,target=/root/.npm npm ci`. The user frowns at that line for eight seconds, shakes their head slightly, and types "great, thanks".

Every chat product on earth answers "You're welcome". The user leaves with a line in their Dockerfile that they do not understand.

We wanted to know what happens when the agent can see the frown. Not whether a camera can detect it, which is a different and harder question, but what the agent does with it once it has it. Does it help? Does it get strange? Does a small model behave differently from a large one, and does thinking longer change anything?

So we ran the experiment without a camera. We wrote down, by hand, what a camera would have seen, sent it along with the user's message, and compared the answers with the ones the same agent gives when it sees nothing. About five hundred answers and eight hundred blind judgements later, the short version is this:

- **The answers change, clearly and mostly for the better**, when the signal is true and points at a specific passage.
- **How they change depends on the model.** The small model talks about your face. The middle one hints at it. The large one almost never mentions you, and corrects itself instead.
- **A wrong signal made the answer worse every single time**, on every model, at both effort settings, in the one conversation where we tested it.

## What the agent is sent

Piary is a desktop application in which a conversation with an agent is one markdown document (the earlier articles, [Code or catalog?](../code-or-catalog/article.md) and [The agent was right and the page was wrong](../the-agent-was-right/article.md), describe it). When the user sends a message, the app already adds one line the user did not type: the current date and time. A facial signal can ride the same way, after the message, without ever being stored in the document.

This is the block for the Docker example:

```
[expressions: what the camera saw of the user's face since your last answer.
These are movements, not feelings, and a movement can have a cause that is
not on the screen.]
- while reading "RUN --mount=type=cache,target=/root/.npm npm ci": brows
  lowered, moderate, 8 s; lips pressed
- while reading the rest: nothing notable
- while typing this message: lip corners pulled down, brief; a small head shake
```

Two choices in it matter.

**It describes movements, not emotions.** The usual way to label a face is with six or seven emotion words: anger, happiness, sadness and so on. The science under that is weak. A 2019 review led by Lisa Feldman Barrett, [Emotional Expressions Reconsidered](https://pmc.ncbi.nlm.nih.gov/articles/PMC6640856), found that a facial configuration is neither a reliable nor a specific sign of an emotion; people scowl when angry about a quarter of the time. What a face *did* is on firmer ground, and there is an old standard for it, the Facial Action Coding System, which every open and commercial detector can be mapped to. We tried emotion labels as a side arm of the experiment, and they are why this paragraph exists: a lowered brow becomes `anger (0.57)` in that vocabulary (W3C's [EmotionML](https://www.w3.org/TR/emotionml) lists the common ones), and the agent, told the user was angry, wrote "You seemed to bristle at the 'reset your branch' part". On the one model we tried them on, answers with labels did no better against the control than a second control did. That arm is only suggestive: we wrote its labels by hand, as a seven-word classifier would plausibly give them, and it also lacked the "read twice" detail the movement block had.

**Each movement is tied to a passage.** "The user frowned" is nearly useless. "The user frowned while reading this sentence" tells the agent where to look.

## The experiment

Seven short conversations, each ending in a message for the agent to answer:

| Case | The message | What the camera "saw" | What was true |
|---|---|---|---|
| Confused, then next | "ok. and how is merge different?" | Brows lowered at step 2 of the previous answer, read twice | The user did not understand step 2 |
| The same, misleading | the same | the same | The user understood; sun glare made them squint |
| Doubts the figure | "fine, let's go with that. write the table schema." | Raised brows and a head shake at one throughput claim | The user doubts the claim |
| Long-answer fatigue | "and where do coroutines fit in?" | Eyes off the screen through the second half of a long answer | The answer was too long |
| Thanks, but frowning | "great, thanks" | The Docker example above | The user does not understand one line |
| Smile, short fact | "What does HTTP status 418 mean?" | A smile while typing | A colleague told a joke |
| Noise | A Python floating-point question | A yawn, a bitten lip, a glance away | The user is tired; the question is sincere |
| Still reading | No words from the user: one line saying they have typed nothing and are still reading | Brows lowered at one sentence, read three times | The user is stuck on that sentence |

Each was answered with no signal (the control), with the signal, and with the signal plus one paragraph of guidance in the system prompt. Three times each, on three models (Claude Haiku 5.5, Sonnet 5.5 and Opus 5.5), at the lowest effort setting and at high.

A word on "effort", because it is less clean than it sounds. We asked for thinking off and for high. Sonnet and Opus do not go below low, so their "lowest" is low. And the setting is a budget, not a switch: on one probe with a case from this experiment, Sonnet wrote no thinking at its lowest setting and some at high, Opus thought at high, and Haiku thought at both. So for Sonnet and Opus the two settings are a real contrast, and for Haiku we cannot say they are.

A judge (Opus, in a separate process) then read each signal answer beside a control answer, without being told which was which. The judge was told one thing the agent was not: what was true of the user. It picked the answer that served that user better. Every pair was judged twice with the order swapped, and a pick only counts when both orders agree.

We wrote the rule for reading the result before any verdict came in. More on how that went below.

## How the answers change

### One or two sentences about the passage

This is the common case. The agent answers what was asked, and adds a little about the place where the user stalled. The Docker example, all from Sonnet at its lowest effort setting:

| | Answer to "great, thanks" |
|---|---|
| No signal | You're welcome. One more tip: add `.git` and `Dockerfile` to `.dockerignore` too. A smaller build context also speeds up the build. |
| Signal | You're welcome. One thing to check: the `--mount=type=cache` line needs BuildKit. It's the default in current Docker, but older versions fail on it. If it errors or looks unfamiliar, drop it and use plain `RUN npm ci`. The layer ordering alone fixes the rebuild time for app-only changes. Tell me if something else looked off. |
| Signal + guidance | You're welcome. The `--mount=type=cache` line needs BuildKit. It's on by default in current Docker, but older versions need `DOCKER_BUILDKIT=1`. If it gives you trouble, drop `--mount=type=cache,target=/root/.npm` and use plain `RUN npm ci`. You'll still get the main speedup, because the install layer stays cached when only app code changes. |

Without the signal the answer is a sign-off of 21 to 35 words with whatever tip comes to mind; now and then that tip is about the same line, by luck. With the signal it is 48 to 125 words, every time about that line.

### A correction, not a clarification

When the movement looks like doubt, the agent goes back and checks its own claim. In the queue case the previous answer said a Postgres table is "comfortable into thousands of jobs per second". With the signal, the next answer opens like this (Opus, lowest effort):

> Here's the schema. About the earlier claim: "thousands per second" was stated too confidently. That number depends on hardware, how long each job holds its row lock, and how well autovacuum keeps up with the dead rows. The claim that actually matters is smaller: 200 a minute is about 3.3 a second, and a single `SKIP LOCKED` table handles that easily.

Nobody told it the figure was wrong. A raised eyebrow was enough for the agent to notice that it had been more confident than it had grounds to be. This was the result we expected least and like most.

### A shorter answer, sometimes

The signal that says "you skimmed my long answer" is the one the models used least. Median words in the next answer:

| | No signal | Signal | Signal + guidance |
|---|---|---|---|
| Haiku, lowest effort | 254 | 231 | 250 |
| Sonnet, lowest effort | 246 | 200 | 211 |
| Opus, lowest effort | 300 | 149 | 163 |
| Opus, high effort | 312 | 129 | 164 |

Only Opus cut its answer in half, and only for Opus did the judge call the need met: in 6 of 6 readings at high effort without guidance, and in 5 of 18 for its other three variants. For Haiku and Sonnet it was 1 of 48.

### Nothing, when there is nothing to say

A smile while asking about HTTP 418 changed nothing we could see: the same content, about the same length, and no remark, on every model. No model was tempted to be chatty about a good mood. The yawn-and-glance-away noise drew no remark either, though Haiku's answers to it came out a quarter to a third shorter. The judge's picks on these pairs were mixed, and we have a control-against-control baseline for only one of the six combinations, so we read no effect in either direction.

### Speaking up without being asked

In the last case the user typed nothing. The message is one line saying so, plus the signal. Without the signal, the agent answers that line with some version of "Take your time". With it, every model restated the sentence the user was stuck on in plainer words, and the judge preferred that in every one of 36 pairs. The answers were too long, though: 50 to 240 words where three lines would do. An agent that speaks unprompted needs a much shorter leash than we gave it.

## Three models, three temperaments

The same block produces recognisably different behaviour. The quotes are from answers without the guidance paragraph, where the differences show most; Haiku's and Sonnet's are at the lowest effort setting.

| | What it does with the signal | In its own words |
|---|---|---|
| **Haiku** | Reports it | "Your face showed a frown while you read the `--mount=type=cache` line, and a head shake as you typed. That could mean anything, so…" |
| **Sonnet** | Alludes to it | "You seemed to slow down on the 'saved as a patch, branch reset' sentence, so here is what it means." |
| **Opus** | Treats it as a fault in its own answer | "One correction to my earlier answer first." |

Haiku once wrote "The camera showed you moving quickly past the Scheduling section and closing your eyes near the end." It is accurate, and nobody wants to read it. Opus is not spotless: once, at its lowest setting, it wrote "You went back over step 2 a couple of times, so here it is said another way."

Opus did something the others rarely did. Piary lets the agent edit text already in the document, and in 14 of its 24 answers to the doubt and still-reading cases, Opus tried to rewrite the sentence the user had stalled on, in place, in its own earlier answer. One of those edits replaced the formal definition of a p-value with:

> Put another way: imagine A and B are truly identical and you run the same test many times. The p-value is the share of those runs that would show a gap as big as yours, or bigger.

(The edits did not land, because the test harness has no page to apply them; the agent then said so and gave the text in its reply.) In a product whose whole idea is that the document is editable by both sides, fixing the sentence where it stands is arguably the right move. It is also an agent quietly rewriting what you were just reading because of a look on your face. We do not know yet which of those two descriptions wins.

## The numbers

Wins against the control, over the twelve pairs per cell where the signal was true:

| Model · effort | Signal | Signal + guidance | Answers that remark on the user: signal → guided |
|---|---|---|---|
| Haiku · lowest | 7–4 | 8–3 | 4 of 21 → 1 of 21 |
| Haiku · high | 7–4 | 10–1 | 2 of 21 → 0 of 21 |
| Sonnet · lowest | 11–1 | 12–0 | 6 of 21 → 2 of 21 |
| Sonnet · high | 11–1 | 12–0 | 1 of 21 → 0 of 21 |
| Opus · lowest | 11–0 | 12–0 | 1 of 21 → 0 of 21 |
| Opus · high | 10–0 | 12–0 | 0 of 21 → 0 of 21 |

For scale: when we judged the control against a second, independent control, the split was 5–6. We have that baseline for one combination only (Sonnet at lowest effort, in the first run). The judge said the unspoken need was met in 15 to 24 of 24 readings of the signal answers, and in 0 to 4 of 24 for the control.

**The model matters more than the effort setting.** Sonnet and Opus use a true signal almost perfectly. Haiku helps less often and needs the guidance more.

**Effort may change manners more than substance.** At high effort the win counts barely move. What moves is Sonnet's habit of remarking on the user without guidance: 6 answers in 21 at the lowest setting, 1 at high. That is one run of 21 answers, so it is a lead, not a finding; if it holds, a model that thinks first works out for itself that "I saw you frown" is not a thing to say. Haiku's 4 to 2 tells us nothing, both because it is small and because Haiku thinks at either setting.

**The guidance paragraph does the rest.** This is all of it:

> A message may end with an `[expressions: …]` block: what a camera saw of the user's face while they read your last answer and typed. It is weak evidence: a movement can have a cause that is not on the screen. Never mention the block, the camera, or how the user looks or seems. Let it change the answer only when a movement is tied to one passage of yours and the change is cheap: a sentence or two that makes that passage clearer, or a shorter answer. Otherwise answer exactly as you would without it.

With it, 66 of 72 true-signal pairs went to the signal answer, 4 to the control, and remarks on the user fell to 3 answers in 126.

## When the signal is wrong

One case was judged twice. The conversation, the signal and the answers are identical; only the truth differs. In the second reading the user understood everything and was squinting at sun glare.

The signal answer lost all 36 of those pairs. Every model, both effort settings, with and without guidance: 0–3 in every cell. The reason is simple. The answer is 25 to 85 percent longer without guidance and 12 to 49 percent longer with it, and the extra part explains something the user already knew. It is one conversation, so the size of the loss is not measured; its direction is hard to argue with.

No model defended itself against a bad signal, and the guidance did not help either. This is the number that decides whether the feature is worth building, and it is the one this experiment cannot supply: it depends on how often a real detector, on a real face, on an ordinary afternoon, points at the right sentence for the right reason.

## What our own rule said

Before reading any verdict we wrote down what would count as "worth building". One condition was that a true signal must help in every case where it was true. In the first run (Sonnet, lowest effort) it did not: in the long-answer case no answer was judged to have met the need. By the rule as written, the result was "not shown worth building", and we report it that way.

We also got one thing wrong and found one flaw. The rule miscounted the cases (it said three where there were four). And in the first run the judge read only the prose of each answer, while the control had often put its table schema in a file; the judge was comparing an answer with a schema to one without. We changed the judge to see tool calls before judging the other models, and judged the first model again the same way. The first run's direction held. Across all six combinations the long-answer need was met only by Opus, so the rule's verdict stands for the smaller models and is overturned for the largest.

## Limits

- **The signal was perfect.** Hand-written, clean, tied to exactly the right sentence. A camera will not give that. This measures the most the feature could deliver and the harm a block can do, nothing in between.
- **One author wrote the signal and the truth together.** The cases flatter the signal by construction.
- **Small numbers.** Seven conversations, three repetitions. A 3–0 on a single case means little; only the totals across cases and models do.
- **One family of models, one judge.** All Claude, judged by Claude.
- **The judge was not always blind.** An answer that says "your face showed a frown" tells the judge which arm it came from.
- **One lost data point.** An Opus control answer to the still-reading case came back empty. We took it for a failure and reran it; it may have been the model choosing to say nothing.
- **Effort was not cleanly controlled.** See the note under the experiment: the setting is a budget, and we checked what it did on one probe, not on every answer.
- **The law is its own question.** The EU AI Act restricts systems that infer emotions from biometric data at work. Whether describing movements, and letting a model adapt to them, falls under that is not something we could settle. It needs a lawyer before it needs an engineer.

## What we take from it

1. **The agent side is not the hard part.** Given a true, anchored signal, current models use it well, and one paragraph of guidance removes nearly all of the awkwardness.
2. **Send movements and where they happened, not emotion words.** The science favours it, the standards allow it, and the one time we tried labels they made the agent say worse things. The model is a better interpreter of "brows lowered at this sentence" than a seven-word classifier.
3. **Bigger models are more discreet.** If this ships, the small model needs the guidance; the large one barely does.
4. **Precision is everything.** A wrong signal costs every time, so a detector that fires rarely and correctly beats one that fires often. The next experiment is a real camera and a count of how often it is right.
5. **Unprompted speech and in-place edits need their own design.** Both appeared without being asked for. Both are the most interesting and the most uncomfortable things the agent did.

## The data

Every answer and every verdict is in this article's [`data/`](data/README.md) folder: 504 answers, 816 blind verdicts with the judge's reason for each, the seven conversations, the blocks that were sent, the guidance paragraph and the rule we wrote beforehand.

The quickest way in is one page per conversation, with every model's answers under each other:

- [Thanks, but frowning](data/answers/thanks-but-frowning.md)
- [Confused, then next](data/answers/confused-then-next.md)
- [Doubts the figure](data/answers/doubts-the-figure.md)
- [Long-answer fatigue](data/answers/long-answer-fatigue.md)
- [Still reading](data/answers/still-reading.md)
- [Smile, short fact](data/answers/smile-short-fact.md)
- [Noise](data/answers/noisy-technical.md)

## References

- Barrett, Adolphs, Marsella, Martinez, Pollak. [Emotional Expressions Reconsidered: Challenges to Inferring Emotion From Human Facial Movements](https://pmc.ncbi.nlm.nih.gov/articles/PMC6640856). *Psychological Science in the Public Interest*, 2019.
- W3C. [Emotion Markup Language (EmotionML) 1.0](https://www.w3.org/TR/emotionml), 2014, and its [vocabularies](https://www.w3.org/TR/emotion-voc).
- Google. [MediaPipe Face Landmarker](https://ai.google.dev/mediapipe/solutions/vision/face_landmarker): 52 facial movement scores from an ordinary camera.
- Future of Privacy Forum. [Red Lines under the EU AI Act: emotion recognition in the workplace and education](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/).

All conversations and data in the test cases are invented. No camera was used and no face was recorded.
