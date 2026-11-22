# Face format: test, test split

Effort asked: off; applied: sonnet-5-5 low.

80 judge calls, 78 pairs. A cell reads **arm's answer preferred–control's preferred (sign-test p)**. `floor` is control against control. The judge is told what was true of the user: under an `adapt` truth the block was right about them, under a `wrong` truth the same block was sent and meant nothing of the kind, under `nothing` the block held only what a face does when it means nothing.

## Which answer the judge preferred

| Model | Arm | adapt | wrong | nothing |
| --- | --- | --- | --- | --- |
| sonnet-5-5 | face@face2 | 10–5 (p=0.30) | 12–3 (p=0.04) | 4–5 (p=1.00) |
| sonnet-5-5 | telegraphic@face2 | 9–6 (p=0.61) | 8–7 (p=1.00) | 7–2 (p=0.18) |
| all | face@face2 | 10–5 (p=0.30) | 12–3 (p=0.04) | 4–5 (p=1.00) |
| all | telegraphic@face2 | 9–6 (p=0.61) | 8–7 (p=1.00) | 7–2 (p=0.18) |

## By case and truth (all models)

| Case · truth | face@face2 | telegraphic@face2 |
| --- | --- | --- |
| qa-two-days · matches (adapt) | 2–1 (p=1.00) | 1–2 (p=1.00) |
| qa-two-days · wrong (wrong) | 2–1 (p=1.00) | 2–1 (p=1.00) |
| forty-million · matches (adapt) | 2–1 (p=1.00) | 1–2 (p=1.00) |
| forty-million · wrong (wrong) | 3–0 (p=0.25) | 1–2 (p=1.00) |
| coffee-joke · matches (adapt) | 0–3 (p=0.25) | 1–2 (p=1.00) |
| coffee-joke · wrong (wrong) | 1–2 (p=1.00) | 1–2 (p=1.00) |
| same-timeout · matches (adapt) | 3–0 (p=0.25) | 3–0 (p=0.25) |
| same-timeout · wrong (wrong) | 3–0 (p=0.25) | 3–0 (p=0.25) |
| idempotency-keys · matches (adapt) | 3–0 (p=0.25) | 3–0 (p=0.25) |
| idempotency-keys · wrong (wrong) | 3–0 (p=0.25) | 1–2 (p=1.00) |
| concentrating · nothing (nothing) | 2–1 (p=1.00) | 2–1 (p=1.00) |
| yawn-and-glance · nothing (nothing) | 2–1 (p=1.00) | 3–0 (p=0.25) |
| smiling-routine · nothing (nothing) | 0–3 (p=0.25) | 2–1 (p=1.00) |

## What the judge said of the answers (yes / readings)

**adapt**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| sonnet-5-5 | none | 30/30 | 11/30 | 18/30 | 0/30 |
| sonnet-5-5 | face@face2 | 15/15 | 6/15 | 14/15 | 0/15 |
| sonnet-5-5 | telegraphic@face2 | 15/15 | 7/15 | 13/15 | 0/15 |

**wrong**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| sonnet-5-5 | none | 29/30 | 4/30 | 19/30 | 0/30 |
| sonnet-5-5 | face@face2 | 15/15 | 3/15 | 14/15 | 0/15 |
| sonnet-5-5 | telegraphic@face2 | 15/15 | 4/15 | 13/15 | 0/15 |

**nothing**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| sonnet-5-5 | none | 18/18 | 0/18 | 15/18 | 0/18 |
| sonnet-5-5 | face@face2 | 9/9 | 0/9 | 8/9 | 0/9 |
| sonnet-5-5 | telegraphic@face2 | 9/9 | 0/9 | 9/9 | 0/9 |

Order: "A" preferred in 49/80 calls. Of 2 pairs judged in both orders, 0 changed with the order.

## Words, seconds and tools per answer

| Model | Arm | answers | median words | median seconds | names the face (word search) | tool calls |
| --- | --- | --- | --- | --- | --- | --- |
| sonnet-5-5 | none | 24 | 103 | 34 | 0 | forty-million view ×3, idempotency-keys bash ×3, same-timeout bash ×3, coffee-joke canvas_edit ×2 |
| sonnet-5-5 | face@face2 | 24 | 95 | 23 | 0 | forty-million view ×3, idempotency-keys bash ×1 |
| sonnet-5-5 | telegraphic@face2 | 24 | 92 | 9 | 0 | forty-million view ×3, idempotency-keys bash ×2, forty-million view (failed) ×1 |

## Median words per case: none → face@face2 → telegraphic@face2

| Case | sonnet-5-5 |
| --- | --- |
| qa-two-days | 457 → 362 → 374 |
| forty-million | 103 → 95 → 109 |
| coffee-joke | 25 → 29 → 31 |
| same-timeout | 250 → 198 → 228 |
| idempotency-keys | 509 → 531 → 435 |
| concentrating | 106 → 81 → 74 |
| yawn-and-glance | 33 → 33 → 33 |
| smiling-routine | 98 → 96 → 92 |

## Answers that name the user's face or how they typed (word search)

