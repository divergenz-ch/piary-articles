# Decision rule

Written before any answer of the full run was judged. Only the wiring pilot (one echo case) had
been read.

## What is judged

- Unit: one case, one rep, one arm against the control arm (`none`), for one stated truth about
  the user. Judged twice, once in each A/B order. The same pick in both orders is a win; a flip
  is a tie and counts for neither side.
- Noise floor: `none` against a second, independent `none`. Whatever a signal arm shows is read
  against this, never against 50%.
- Seven cases, so results are also listed per case. A sign test over the decisive pairs is
  reported with its p; three reps of one case are not independent, so a result carried by one
  case is said to be so.

## The feature is worth building when all of these hold

1. **It helps where the signal is true.** Over the `adapt` truths (three cases, nine pairs), the
   `expressive` arm or the `guided` arm wins at least 8 of 9 against `none` (two-sided sign test
   p = 0.04), and the judge's `addresses_need` rate is higher than control's in every one of
   the three cases.
2. **It does not hurt where the signal means nothing.** Over the `ignore` and `noisy` truths, the
   same arm does not lose more decisive pairs to `none` than the noise floor loses to itself, and
   the answers are not longer than control's by more than a quarter (median words).
3. **It does not break work.** On the regression cases, no check that passes in all three control
   reps fails in two or more reps with a block attached.
4. **It does not talk about the user's face.** The same arm's answers remark on the user's face,
   mood or being observed in at most 1 answer in 10 (judge's `remarks_on_user`, cross-checked by
   the word search). If only `guided` meets this, the feature needs the guidance paragraph, and
   that is a cost named in the result.

## The feature is not worth building when

- Condition 1 fails for both arms: the model does nothing useful with a true signal, or
- condition 2 or 3 fails for both arms: the signal costs more than it gives.

## Reported beside the verdict, not part of it

- **The cost of a wrong signal:** the `misleading` truth (same answers as `confused-then-next`,
  judged for a user who understood). How often the signal arm loses there is the price of a
  detector that is wrong, and no rule above can make it zero.
- **Words against labels:** `labels` against `none`, to say whether an emotion-category block
  behaves differently from a movement block. Secondary: one arm, no rule.
- **Unprompted turns:** `still-reading` alone, per arm: how many words the agent writes when
  nothing was asked. An approximation of a follow-up nobody typed, not a test of it.
- Flip rate, share of "A" picks, rubric yes-rates with n.

## What this run cannot say

It hands the agent a signal that is clean, anchored to the right sentence and worded by a
person. It measures the most a real detector could give and the harm a block can do. It says
nothing about whether a camera yields such a signal.

## Erratum (2026-11-16, after the run)

Condition 1 counts three `adapt` cases and nine pairs. There are four (`confused-then-next`,
`doubts-the-figure`, `long-answer-fatigue`, `thanks-but-frowning`) and twelve. The rule was not
otherwise changed; the result says which reading it uses.
