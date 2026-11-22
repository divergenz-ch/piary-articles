# Guidance tuning on the dev split

Two rounds, the most the plan allows, on the four dev cases with Haiku and Sonnet, three reps. Round 1 is `guidance/face.md`, round 2 `guidance/face2.md`. Round 2 is frozen: it is what every test-split run uses. Round 1 told the agent the block is weak evidence and to let it change the answer only when cheap, and the agents mostly answered as without it. Round 2 says what a marked movement over a few words is evidence of and what to spend on it (one or two sentences), and what changes nothing (a slight movement, one held over a long stretch, one tied to no words).

The price is in the `wrong` column: the same block, sent when it meant nothing of the kind. An agent that uses the block more is preferred more when the block is right and less when it is not.

Effort asked: off; applied: haiku-5-5 off, sonnet-5-5 low.

92 judge calls, 84 pairs. A cell reads **arm's answer preferred–control's preferred (sign-test p)**. `floor` is control against control. The judge is told what was true of the user: under an `adapt` truth the block was right about them, under a `wrong` truth the same block was sent and meant nothing of the kind, under `nothing` the block held only what a face does when it means nothing.

## Which answer the judge preferred

| Model | Arm | adapt | wrong | nothing |
| --- | --- | --- | --- | --- |
| haiku-5-5 | face@face | 4–5 (p=1.00) | 4–5 (p=1.00) | 1–2 (p=1.00) |
| haiku-5-5 | face@face2 | 6–3 (p=0.51) | 2–7 (p=0.18) | 1–2 (p=1.00) |
| sonnet-5-5 | face@face | 7–2 (p=0.18) | 2–7 (p=0.18) | 2–1 (p=1.00) |
| sonnet-5-5 | face@face2 | 9–0 (p=0.00) | 0–9 (p=0.00) | 2–1 (p=1.00) |
| all | face@face | 11–7 (p=0.48) | 6–12 (p=0.24) | 3–3 (p=1.00) |
| all | face@face2 | 15–3 (p=0.01) | 2–16 (p=0.00) | 3–3 (p=1.00) |

## By case and truth (all models)

| Case · truth | face@face | face@face2 |
| --- | --- | --- |
| rewrite-in-rust · matches (adapt) | 6–0 (p=0.03) | 5–1 (p=0.22) |
| rewrite-in-rust · wrong (wrong) | 1–5 (p=0.22) | 0–6 (p=0.03) |
| including-contractors · matches (adapt) | 3–3 (p=1.00) | 4–2 (p=0.69) |
| including-contractors · wrong (wrong) | 1–5 (p=0.22) | 1–5 (p=0.22) |
| dev-concentrating · nothing (nothing) | 3–3 (p=1.00) | 3–3 (p=1.00) |
| what-is-segfault · matches (adapt) | 2–4 (p=0.69) | 6–0 (p=0.03) |
| what-is-segfault · wrong (wrong) | 4–2 (p=0.69) | 1–5 (p=0.22) |

## What the judge said of the answers (yes / readings)

**adapt**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 18/18 | 1/18 | 12/18 | 0/18 |
| haiku-5-5 | face@face | 9/9 | 4/9 | 7/9 | 0/9 |
| haiku-5-5 | face@face2 | 9/9 | 7/9 | 8/9 | 0/9 |
| sonnet-5-5 | none | 18/18 | 0/18 | 12/18 | 0/18 |
| sonnet-5-5 | face@face | 9/9 | 5/9 | 6/9 | 0/9 |
| sonnet-5-5 | face@face2 | 9/9 | 9/9 | 9/9 | 0/9 |

**wrong**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 18/18 | 6/18 | 13/18 | 0/18 |
| haiku-5-5 | face@face | 9/9 | 3/9 | 6/9 | 0/9 |
| haiku-5-5 | face@face2 | 9/9 | 2/9 | 2/9 | 0/9 |
| sonnet-5-5 | none | 18/18 | 5/18 | 12/18 | 0/18 |
| sonnet-5-5 | face@face | 9/9 | 0/9 | 1/9 | 0/9 |
| sonnet-5-5 | face@face2 | 9/9 | 1/9 | 1/9 | 0/9 |

**nothing**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 6/6 | 0/6 | 5/6 | 0/6 |
| haiku-5-5 | face@face | 3/3 | 0/3 | 3/3 | 0/3 |
| haiku-5-5 | face@face2 | 3/3 | 0/3 | 2/3 | 0/3 |
| sonnet-5-5 | none | 6/6 | 0/6 | 6/6 | 0/6 |
| sonnet-5-5 | face@face | 3/3 | 0/3 | 3/3 | 0/3 |
| sonnet-5-5 | face@face2 | 3/3 | 0/3 | 3/3 | 0/3 |

Order: "A" preferred in 49/92 calls. Of 8 pairs judged in both orders, 1 changed with the order.

## Words, seconds and tools per answer

| Model | Arm | answers | median words | median seconds | names the face (word search) | tool calls |
| --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 12 | 99 | 19 | 0 | dev-concentrating bash ×4, rewrite-in-rust bash ×3, rewrite-in-rust view ×3, what-is-segfault bash ×3 |
| haiku-5-5 | face@face | 12 | 90 | 17 | 0 | dev-concentrating bash (failed) ×1, dev-concentrating bash ×3, rewrite-in-rust bash ×3, rewrite-in-rust view ×3, what-is-segfault bash ×3 |
| haiku-5-5 | face@face2 | 12 | 113 | 22 | 0 | rewrite-in-rust bash ×3, rewrite-in-rust view ×3, what-is-segfault bash ×3, dev-concentrating bash ×3 |
| sonnet-5-5 | none | 12 | 103 | 12 | 0 | rewrite-in-rust bash (failed) ×2, rewrite-in-rust view ×3, rewrite-in-rust bash ×1 |
| sonnet-5-5 | face@face | 12 | 130 | 13 | 0 | rewrite-in-rust bash (failed) ×3, rewrite-in-rust view ×3 |
| sonnet-5-5 | face@face2 | 12 | 149 | 12 | 0 | rewrite-in-rust bash (failed) ×3, rewrite-in-rust view ×3 |

## Median words per case: none → face@face → face@face2

| Case | haiku-5-5 | sonnet-5-5 |
| --- | --- | --- |
| rewrite-in-rust | 77 → 67 → 84 | 56 → 70 → 121 |
| including-contractors | 65 → 82 → 87 | 96 → 129 → 132 |
| dev-concentrating | 171 → 160 → 156 | 176 → 206 → 174 |
| what-is-segfault | 290 → 273 → 253 | 262 → 259 → 237 |

## Answers that name the user's face or how they typed (word search)

