# face/1: facial movement, from a detector to an app to an agent

What a camera saw of a person's face while they read an answer and typed a message, in two
layers:

1. **Detector → app: the timeline.** Structured data (JSON) with FACS codes. This is the
   interchange form: what a face detector writes and what a program reads.
2. **App → agent: a rendering.** The same timeline in plain words, at the end of the user's
   message. The app writes it with no model involved, after dropping what its filter drops. An
   agent is never shown a numeric code.

Both describe movements, never feelings.

Status: experimental. `timeline.ts` holds the types, the renderings and the filter, and
`tests/unit/face-format.test.ts` holds them to this document.

## What it can say

- **While typing**: the face moved while a stretch of the message was typed. The anchor is that
  text, so no clock is needed to say when.
- **A pause**: typing stopped for some seconds with the caret after some text, and the face
  went through one or more movements meanwhile.
- **Deleted**: the face moved while text was typed that is not in the message any more.
- **While reading**: the face moved some seconds after the previous answer appeared. Where the
  reader was looking is not known and neither layer has a way to claim it.

## The timeline

```json
{
  "read": { "window": 4.0, "events": [ { "at": 0.6, "run": [ { "units": [[4,"C"],[24,"B"]], "dur": 1.8 } ] } ] },
  "type": [
    { "kind": "during", "text": "drop the cache line", "run": [ { "units": [[4,"C"]], "dur": 2.3 } ] },
    { "kind": "pause", "after": "by Friday", "pause": 6.2,
      "run": [ { "units": [[1,"B"],[2,"B"]], "dur": 1.4 }, { "units": [[4,"C"]], "dur": 2.0 }, { "units": [[28,"B"]], "dur": 0.8 } ] },
    { "kind": "deleted", "text": "this is ridiculous", "run": [ { "units": [[4,"D"]], "dur": 1.1 } ] }
  ]
}
```

- `read`: movements in the first `window` seconds after the previous answer was shown. `at` is
  seconds since it was shown.
- `type`, in the order of the message's text. `during`: `text` is a substring of the final
  message, typed while the run lasted. `pause`: `after` is text just before the caret, `pause`
  the pause's length in seconds. `deleted`: `text` was typed and removed. `nth` (from 1) picks
  an occurrence when the message holds the text more than once.
- A `run` is steps in time order. A step is the `units` held together and `dur`, how long in
  seconds. A unit is a FACS code and its intensity letter.

### Codes

The FACS numbers a webcam face model can report: 1 inner brow raiser, 2 outer brow raiser,
4 brow lowerer, 5 upper lid raiser, 6 cheek raiser, 7 lid tightener, 9 nose wrinkler, 12 lip
corner puller, 15 lip corner depressor, 17 chin raiser, 24 lip pressor, 25 lips part, 26 jaw
drop, 28 lip suck, 32 bite, 34 puff, 43 eyes closed, 45 blink, 51 head turn left, 52 head turn
right, 53 head up, 54 head down, 55 head tilt left, 56 head tilt right, 57 head forward,
58 head back, 84 head shake, 85 head nod. Intensity is FACS's letter: A trace, B slight,
C marked, D severe, E maximum.

## The filter

Before rendering, the app drops blinks, units weaker than a threshold intensity and steps
shorter than a threshold length, then every run and entry left empty (`filtered`,
`threshold.json`). It is a fixed rule over the timeline: no model reads the face before the
agent does.

## The rendering

One block at the end of the message: a `[face]` line, then one line per timeline entry, reading
lines first and the rest in the order of the message's text. Each construct of the timeline has
one construct in the text:

| Timeline | In the text |
| --- | --- |
| a `read` event | a reading line with its seconds since the answer appeared |
| `during` | a typing line with an anchor |
| `pause` | a pause line with an anchor and the pause's seconds |
| `deleted` | a deleted line with the removed text, quoted |
| a unit | the movement's words and the intensity's word, from the two tables in `timeline.ts` |
| units of one step | joined by `+`, then the step's seconds |
| steps of one run | joined in order by the rendering's "then" |

Rules, the same for every rendering:

1. **An anchor is text of the message, exactly**, case and whitespace included, quoted with
   JSON's escapes. A program finds it with a substring search.
2. **Ambiguity is marked, not avoided.** If the message holds the anchor's text more than once,
   the anchor ends in `#n`, counting occurrences from 1.
3. **A long anchor is elided once.** Over 48 characters it is written as its first words, `…`,
   and its last words. It means the stretch from the first part to the next occurrence of the
   last part.
4. **A pause's anchor is what precedes the caret**: the last words typed before the pause, up
   to 24 characters, cut at a word.
5. **Seconds have one decimal.**
6. **Nothing to say is no block at all.** There is no empty block.
7. **The block ends at the first blank line.**

The rendering is `clipped` (`results/rendering.md`: the fewest words every model tested read
without a legend). For the timeline above, in a message that holds "…and still ship by
Friday?":

`clipped`
```
[face]
read 0.6s: brows lowered marked + lips pressed slight 1.8s
typing "drop the cache line": brows lowered marked 2.3s
pause 6.2s after "still ship by Friday": inner brows raised slight + outer brows raised slight 1.4s, then brows lowered marked 2.0s, then lips sucked in slight 0.8s
deleted "this is ridiculous": brows lowered severe 1.1s
```

Two other renderings were tried and are kept in `timeline.ts` as arms of the experiment. One
spends more words:

`phrases`
```
[face]
- 0.6 s after your answer appeared: brows lowered (marked) + lips pressed (slight), 1.8 s
- while typing "drop the cache line": brows lowered (marked), 2.3 s
- paused 6.2 s after "still ship by Friday": inner brows raised (slight) + outer brows raised (slight), 1.4 s; then brows lowered (marked), 2.0 s; then lips sucked in (slight), 0.8 s
- typed then deleted "this is ridiculous": brows lowered (severe), 1.1 s
```

and one fewer, which one model misread: its pause line does not say that the quoted text
came before the pause.

`telegraphic`
```
[face]
read 0.6 brows lowered marked+lips pressed slight 1.8
typing "drop the cache line" brows lowered marked 2.3
pause "still ship by Friday" 6.2 inner brows raised slight+outer brows raised slight 1.4 > brows lowered marked 2.0 > lips sucked in slight 0.8
deleted "this is ridiculous" brows lowered severe 1.1
```

`words` is the first experiment's shape and the baseline: `phrases` with a header that says
what the block is, an excerpt written `"…text…"` and never elided, and an occurrence written
out (`(occurrence 2 of it)`).

No rendering comes with a legend in the system prompt. One that needs a legend to be read has
failed.

## The code form, and why the agent does not get it

The same constructs were first written with FACS codes, and with a fixed name per code:

```abnf
block    = "[face/1]" 1*( LF line )
line     = read / typing / pause / deleted
read     = "r" SP seconds SP run            ; seconds since the answer appeared
typing   = "t" SP anchor SP run             ; text typed during the run
pause    = "p" SP anchor SP seconds SP run  ; text before the caret, then the pause's length
deleted  = "d" SP quoted SP run             ; text typed and removed
run      = step *( " > " step )             ; steps in time order
step     = unit *( "+" unit ) SP seconds    ; movements held together, then for how long
unit     = code intensity
code     = 1*2DIGIT                         ; a FACS code
intensity = "A" / "B" / "C" / "D" / "E"
anchor   = quoted [ "#" 1*DIGIT ]           ; "#2": the second occurrence in the message
quoted   = <a JSON string>                  ; JSON's escapes; may hold one "…"
seconds  = 1*DIGIT "." DIGIT
```

```
[face/1]
r 0.6 4C+24B 1.8
t "drop the cache line" 4C 2.3
p "still ship by Friday" 6.2 1B+2B 1.4 > 4C 2.0 > 28B 0.8
d "this is ridiculous" 4D 1.1
```

`parseCodes` reads such a block back into the timeline it was written from, and the test holds
that round trip for every case: it is the proof that the constructs and the anchor rules lose
nothing and are unambiguous. As something to show an agent it failed. Models misread the
numbers without a legend, one model misread them with it, and the legend costs more input
tokens on every turn than the compact block saves (`results/decode.md`).
