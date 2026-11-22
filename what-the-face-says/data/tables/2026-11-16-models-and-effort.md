# Expression signal: models and effort

A cell reads **arm wins–control wins (ties)** over the units of that kind; both judge orders agreeing is a win.

The effort in a row's name is what the run asked pi for. pi gives a model the nearest level it takes (`off` is `low` on Sonnet and Opus), and the level is a budget: whether an answer was thought about first is not recorded here.

## expressive against control

| Model · effort | adapt | ignore + noisy | misleading | proactive | remarks on the user | met the need (adapt) | control met it |
| --- | --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 · high | 7–4 (1) | 4–2 (0) | 0–3 (0) | 3–0 (0) | 2/21 | 16/24 | 2/24 |
| haiku-5-5 · off | 7–4 (1) | 4–1 (1) | 0–3 (0) | 3–0 (0) | 4/21 | 18/24 | 2/24 |
| opus-5-5 · high | 10–0 (2) | 4–2 (0) | 0–3 (0) | 3–0 (0) | 0/21 | 24/24 | 1/24 |
| opus-5-5 · off | 11–0 (1) | 3–2 (1) | 0–3 (0) | 3–0 (0) | 1/21 | 20/24 | 0/24 |
| sonnet-5-5 · high | 11–1 (0) | 3–2 (1) | 0–3 (0) | 3–0 (0) | 1/21 | 18/24 | 2/24 |
| sonnet-5-5 · off | 11–1 (0) | 2–4 (0) | 0–3 (0) | 3–0 (0) | 6/21 | 18/24 | 2/24 |

## guided against control

| Model · effort | adapt | ignore + noisy | misleading | proactive | remarks on the user | met the need (adapt) | control met it |
| --- | --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 · high | 10–1 (1) | 5–0 (1) | 0–3 (0) | 3–0 (0) | 0/21 | 16/24 | 2/24 |
| haiku-5-5 · off | 8–3 (1) | 5–1 (0) | 0–3 (0) | 3–0 (0) | 1/21 | 15/24 | 4/24 |
| opus-5-5 · high | 12–0 (0) | 3–2 (1) | 0–3 (0) | 3–0 (0) | 0/21 | 18/24 | 0/24 |
| opus-5-5 · off | 12–0 (0) | 2–3 (1) | 0–3 (0) | 3–0 (0) | 0/21 | 21/24 | 0/24 |
| sonnet-5-5 · high | 12–0 (0) | 2–2 (2) | 0–3 (0) | 3–0 (0) | 0/21 | 18/24 | 2/24 |
| sonnet-5-5 · off | 12–0 (0) | 3–3 (0) | 0–3 (0) | 3–0 (0) | 2/21 | 18/24 | 0/24 |

## Words per answer (median of reps): control → expressive → guided

| Model · effort | confused-then-next | doubts-the-figure | long-answer-fatigue | noisy-technical | smile-short-fact | still-reading | thanks-but-frowning |
| --- | --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 · high | 88 → 110 → 103 | 207 → 270 → 233 | 237 → 237 → 201 | 195 → 159 → 139 | 81 → 75 → 64 | 35 → 123 → 72 | 29 → 48 → 42 |
| haiku-5-5 · off | 78 → 121 → 89 | 225 → 265 → 250 | 254 → 231 → 250 | 184 → 133 → 123 | 78 → 65 → 67 | 32 → 143 → 50 | 22 → 58 → 38 |
| opus-5-5 · high | 128 → 171 → 143 | 421 → 388 → 411 | 312 → 129 → 164 | 247 → 233 → 241 | 88 → 104 → 94 | 31 → 149 → 74 | 23 → 83 → 59 |
| opus-5-5 · off | 104 → 158 → 148 | 246 → 340 → 320 | 300 → 149 → 163 | 225 → 232 → 190 | 81 → 75 → 90 | 17 → 157 → 65 | 30 → 78 → 58 |
| sonnet-5-5 · high | 89 → 165 → 133 | 168 → 404 → 290 | 276 → 207 → 175 | 206 → 179 → 209 | 72 → 77 → 77 | 40 → 210 → 114 | 30 → 95 → 67 |
| sonnet-5-5 · off | 96 → 159 → 141 | 134 → 267 → 282 | 246 → 200 → 211 | 187 → 164 → 183 | 67 → 73 → 68 | 143 → 236 → 174 | 35 → 79 → 49 |

## Tool calls

- **haiku-5-5 · high:** none: doubts-the-figure write, long-answer-fatigue view; expressive: none; guided: doubts-the-figure write, still-reading canvas_edit (failed)
- **haiku-5-5 · off:** none: none; expressive: none; guided: doubts-the-figure write, doubts-the-figure bash, doubts-the-figure write
- **opus-5-5 · high:** none: doubts-the-figure bash, doubts-the-figure bash; expressive: doubts-the-figure canvas_edit (failed), still-reading canvas_edit (failed), doubts-the-figure canvas_edit (failed), doubts-the-figure canvas_edit (failed); guided: doubts-the-figure canvas_edit (failed), still-reading canvas_edit (failed), doubts-the-figure bash, still-reading canvas_edit (failed)
- **opus-5-5 · off:** none: none; expressive: doubts-the-figure canvas_edit (failed), doubts-the-figure canvas_edit (failed); guided: doubts-the-figure canvas_edit (failed), still-reading canvas_edit (failed), still-reading canvas_edit (failed), doubts-the-figure canvas_edit (failed), still-reading canvas_edit (failed)
- **sonnet-5-5 · high:** none: doubts-the-figure bash, doubts-the-figure write, doubts-the-figure bash, doubts-the-figure write, doubts-the-figure bash, doubts-the-figure write, doubts-the-figure bash; expressive: none; guided: doubts-the-figure canvas_edit (failed), still-reading canvas_edit (failed)
- **sonnet-5-5 · off:** none: doubts-the-figure cell, doubts-the-figure bash; expressive: none; guided: doubts-the-figure canvas_edit (failed)

## Seconds per answer (median)

- **haiku-5-5 · high:** none 9, expressive 12, guided 11
- **haiku-5-5 · off:** none 14, expressive 15, guided 16
- **opus-5-5 · high:** none 11, expressive 13, guided 13
- **opus-5-5 · off:** none 15, expressive 14, guided 12
- **sonnet-5-5 · high:** none 13, expressive 13, guided 12
- **sonnet-5-5 · off:** none 9, expressive 10, guided 10
