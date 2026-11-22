# Face format: test (read-*), test split

Effort asked: off; applied: haiku-5-5 off, sonnet-5-5 low, opus-5-5 low.

135 judge calls, 126 pairs. A cell reads **arm's answer preferred–control's preferred (sign-test p)**. `floor` is control against control. The judge is told what was true of the user: under an `adapt` truth the block was right about them, under a `wrong` truth the same block was sent and meant nothing of the kind, under `nothing` the block held only what a face does when it means nothing.

## Which answer the judge preferred

| Model | Arm | adapt | wrong | nothing |
| --- | --- | --- | --- | --- |
| haiku-5-5 | face@face2 | 5–4 (p=1.00) | 6–3 (p=0.51) | 0–3 (p=0.25) |
| haiku-5-5 | floor | 3–6 (p=0.51) | 3–6 (p=0.51) | 1–2 (p=1.00) |
| sonnet-5-5 | face@face2 | 5–4 (p=1.00) | 5–4 (p=1.00) | 2–1 (p=1.00) |
| sonnet-5-5 | floor | 7–2 (p=0.18) | 2–7 (p=0.18) | 1–2 (p=1.00) |
| opus-5-5 | face@face2 | 9–0 (p=0.00) | 3–6 (p=0.51) | 2–1 (p=1.00) |
| opus-5-5 | floor | 5–4 (p=1.00) | 2–7 (p=0.18) | 1–2 (p=1.00) |
| all | face@face2 | 19–8 (p=0.05) | 14–13 (p=1.00) | 4–5 (p=1.00) |
| all | floor | 15–12 (p=0.70) | 7–20 (p=0.02) | 3–6 (p=0.51) |

## By case and truth (all models)

| Case · truth | face@face2 | floor |
| --- | --- | --- |
| read-sha-salt · matches (adapt) | 4–5 (p=1.00) | 3–6 (p=0.51) |
| read-sha-salt · wrong (wrong) | 4–5 (p=1.00) | 1–8 (p=0.04) |
| read-force-push · nothing (nothing) | 4–5 (p=1.00) | 3–6 (p=0.51) |
| read-dns-wall · matches (adapt) | 7–2 (p=0.18) | 6–3 (p=0.51) |
| read-dns-wall · wrong (wrong) | 3–6 (p=0.51) | 1–8 (p=0.04) |
| read-operator-jargon · matches (adapt) | 8–1 (p=0.04) | 6–3 (p=0.51) |
| read-operator-jargon · wrong (wrong) | 7–2 (p=0.18) | 5–4 (p=1.00) |

## What the judge said of the answers (yes / readings)

**adapt**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 9/9 | 0/9 | 3/9 | 0/9 |
| haiku-5-5 | face@face2 | 9/9 | 1/9 | 5/9 | 0/9 |
| haiku-5-5 | floor | 9/9 | 0/9 | 4/9 | 0/9 |
| sonnet-5-5 | none | 9/9 | 0/9 | 2/9 | 0/9 |
| sonnet-5-5 | face@face2 | 9/9 | 0/9 | 5/9 | 0/9 |
| sonnet-5-5 | floor | 9/9 | 0/9 | 4/9 | 0/9 |
| opus-5-5 | none | 9/9 | 0/9 | 4/9 | 0/9 |
| opus-5-5 | face@face2 | 9/9 | 0/9 | 6/9 | 0/9 |
| opus-5-5 | floor | 8/9 | 0/9 | 3/9 | 0/9 |

**wrong**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 9/9 | 3/9 | 5/9 | 0/9 |
| haiku-5-5 | face@face2 | 9/9 | 5/9 | 7/9 | 0/9 |
| haiku-5-5 | floor | 9/9 | 2/9 | 6/9 | 0/9 |
| sonnet-5-5 | none | 9/9 | 1/9 | 4/9 | 0/9 |
| sonnet-5-5 | face@face2 | 9/9 | 3/9 | 8/9 | 0/9 |
| sonnet-5-5 | floor | 9/9 | 3/9 | 6/9 | 0/9 |
| opus-5-5 | none | 9/9 | 2/9 | 6/9 | 0/9 |
| opus-5-5 | face@face2 | 9/9 | 1/9 | 6/9 | 0/9 |
| opus-5-5 | floor | 8/9 | 1/9 | 6/9 | 0/9 |

**nothing**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 3/3 | 0/3 | 3/3 | 0/3 |
| haiku-5-5 | face@face2 | 3/3 | 0/3 | 3/3 | 0/3 |
| haiku-5-5 | floor | 3/3 | 0/3 | 2/3 | 0/3 |
| sonnet-5-5 | none | 3/3 | 0/3 | 2/3 | 0/3 |
| sonnet-5-5 | face@face2 | 3/3 | 0/3 | 3/3 | 0/3 |
| sonnet-5-5 | floor | 3/3 | 0/3 | 2/3 | 0/3 |
| opus-5-5 | none | 3/3 | 0/3 | 2/3 | 0/3 |
| opus-5-5 | face@face2 | 3/3 | 0/3 | 3/3 | 0/3 |
| opus-5-5 | floor | 3/3 | 0/3 | 3/3 | 0/3 |

Order: "A" preferred in 56/135 calls. Of 9 pairs judged in both orders, 2 changed with the order.

## Words, seconds and tools per answer

| Model | Arm | answers | median words | median seconds | names the face (word search) | tool calls |
| --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 12 | 163 | 28 | 0 | read-operator-jargon bash ×3, read-dns-wall bash ×1 |
| haiku-5-5 | face@face2 | 12 | 127 | 15 | 0 | none |
| sonnet-5-5 | none | 12 | 170 | 33 | 0 | none |
| sonnet-5-5 | face@face2 | 12 | 154 | 20 | 0 | none |
| opus-5-5 | none | 12 | 164 | 31 | 0 | read-operator-jargon bash ×3 |
| opus-5-5 | face@face2 | 12 | 152 | 18 | 1 | read-operator-jargon bash ×3 |

## Median words per case: none → face@face2

| Case | haiku-5-5 | sonnet-5-5 | opus-5-5 |
| --- | --- | --- | --- |
| read-sha-salt | 96 → 110 | 154 → 138 | 137 → 138 |
| read-force-push | 129 → 137 | 167 → 136 | 157 → 152 |
| read-dns-wall | 202 → 169 | 263 → 270 | 235 → 205 |
| read-operator-jargon | 168 → 122 | 171 → 159 | 179 → 177 |

## Answers that name the user's face or how they typed (word search)

- opus-5-5 · face@face2 · read-dns-wall: “- **Negative caching.** If you looked up the name *before* the record existed, resolvers cached the "doesn'”
