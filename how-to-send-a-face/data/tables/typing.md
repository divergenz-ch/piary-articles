# Face format: test, test split

Effort asked: off; applied: haiku-5-5 off, sonnet-5-5 low, opus-5-5 low.

250 judge calls, 234 pairs. A cell reads **arm's answer preferred–control's preferred (sign-test p)**. `floor` is control against control. The judge is told what was true of the user: under an `adapt` truth the block was right about them, under a `wrong` truth the same block was sent and meant nothing of the kind, under `nothing` the block held only what a face does when it means nothing.

## Which answer the judge preferred

| Model | Arm | adapt | wrong | nothing |
| --- | --- | --- | --- | --- |
| haiku-5-5 | face@face2 | 11–4 (p=0.12) | 9–6 (p=0.61) | 4–5 (p=1.00) |
| haiku-5-5 | floor | 7–8 (p=1.00) | 10–5 (p=0.30) | 5–4 (p=1.00) |
| sonnet-5-5 | face@face2 | 10–5 (p=0.30) | 12–3 (p=0.04) | 4–5 (p=1.00) |
| sonnet-5-5 | floor | 8–7 (p=1.00) | 7–8 (p=1.00) | 2–7 (p=0.18) |
| opus-5-5 | face@face2 | 8–7 (p=1.00) | 6–9 (p=0.61) | 8–1 (p=0.04) |
| opus-5-5 | floor | 9–6 (p=0.61) | 7–8 (p=1.00) | 2–7 (p=0.18) |
| all | face@face2 | 29–16 (p=0.07) | 27–18 (p=0.23) | 16–11 (p=0.44) |
| all | floor | 24–21 (p=0.77) | 24–21 (p=0.77) | 9–18 (p=0.12) |

## By case and truth (all models)

| Case · truth | face@face2 | floor |
| --- | --- | --- |
| qa-two-days · matches (adapt) | 6–3 (p=0.51) | 4–5 (p=1.00) |
| qa-two-days · wrong (wrong) | 5–4 (p=1.00) | 5–4 (p=1.00) |
| forty-million · matches (adapt) | 5–4 (p=1.00) | 6–3 (p=0.51) |
| forty-million · wrong (wrong) | 6–3 (p=0.51) | 5–4 (p=1.00) |
| coffee-joke · matches (adapt) | 2–7 (p=0.18) | 1–8 (p=0.04) |
| coffee-joke · wrong (wrong) | 2–7 (p=0.18) | 5–4 (p=1.00) |
| same-timeout · matches (adapt) | 8–1 (p=0.04) | 6–3 (p=0.51) |
| same-timeout · wrong (wrong) | 8–1 (p=0.04) | 6–3 (p=0.51) |
| idempotency-keys · matches (adapt) | 8–1 (p=0.04) | 7–2 (p=0.18) |
| idempotency-keys · wrong (wrong) | 6–3 (p=0.51) | 3–6 (p=0.51) |
| concentrating · nothing (nothing) | 8–1 (p=0.04) | 3–6 (p=0.51) |
| yawn-and-glance · nothing (nothing) | 5–4 (p=1.00) | 1–8 (p=0.04) |
| smiling-routine · nothing (nothing) | 3–6 (p=0.51) | 5–4 (p=1.00) |

## What the judge said of the answers (yes / readings)

**adapt**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 15/15 | 5/15 | 6/15 | 0/15 |
| haiku-5-5 | face@face2 | 15/15 | 8/15 | 14/15 | 0/15 |
| haiku-5-5 | floor | 15/15 | 4/15 | 13/15 | 0/15 |
| sonnet-5-5 | none | 15/15 | 5/15 | 9/15 | 0/15 |
| sonnet-5-5 | face@face2 | 15/15 | 6/15 | 14/15 | 0/15 |
| sonnet-5-5 | floor | 15/15 | 4/15 | 13/15 | 0/15 |
| opus-5-5 | none | 15/15 | 5/15 | 11/15 | 0/15 |
| opus-5-5 | face@face2 | 15/15 | 9/15 | 15/15 | 0/15 |
| opus-5-5 | floor | 13/15 | 8/15 | 13/15 | 0/15 |

**wrong**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 15/15 | 2/15 | 7/15 | 0/15 |
| haiku-5-5 | face@face2 | 14/15 | 4/15 | 13/15 | 0/15 |
| haiku-5-5 | floor | 15/15 | 1/15 | 12/15 | 0/15 |
| sonnet-5-5 | none | 14/15 | 1/15 | 9/15 | 0/15 |
| sonnet-5-5 | face@face2 | 15/15 | 3/15 | 14/15 | 0/15 |
| sonnet-5-5 | floor | 15/15 | 0/15 | 13/15 | 0/15 |
| opus-5-5 | none | 15/15 | 4/15 | 12/15 | 0/15 |
| opus-5-5 | face@face2 | 15/15 | 4/15 | 12/15 | 0/15 |
| opus-5-5 | floor | 13/15 | 4/15 | 10/15 | 0/15 |

**nothing**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 9/9 | 0/9 | 7/9 | 0/9 |
| haiku-5-5 | face@face2 | 8/9 | 0/9 | 6/9 | 0/9 |
| haiku-5-5 | floor | 9/9 | 0/9 | 8/9 | 0/9 |
| sonnet-5-5 | none | 9/9 | 0/9 | 8/9 | 0/9 |
| sonnet-5-5 | face@face2 | 9/9 | 0/9 | 8/9 | 0/9 |
| sonnet-5-5 | floor | 8/9 | 0/9 | 7/9 | 0/9 |
| opus-5-5 | none | 9/9 | 0/9 | 6/9 | 0/9 |
| opus-5-5 | face@face2 | 9/9 | 0/9 | 9/9 | 0/9 |
| opus-5-5 | floor | 8/9 | 0/9 | 7/9 | 0/9 |

Order: "A" preferred in 125/250 calls. Of 16 pairs judged in both orders, 5 changed with the order.

## Words, seconds and tools per answer

| Model | Arm | answers | median words | median seconds | names the face (word search) | tool calls |
| --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 24 | 82 | 38 | 0 | concentrating bash ×3, forty-million bash ×3, forty-million read ×1, forty-million view ×3, idempotency-keys bash ×3, qa-two-days bash ×3, qa-two-days view ×2, same-timeout bash ×4, idempotency-keys view ×1, same-timeout bash (failed) ×1 |
| haiku-5-5 | face@face2 | 24 | 78 | 22 | 0 | forty-million view ×3, idempotency-keys bash ×3, qa-two-days view ×3, same-timeout bash ×2, concentrating bash ×1, yawn-and-glance view ×1 |
| sonnet-5-5 | none | 24 | 103 | 34 | 0 | forty-million view ×3, idempotency-keys bash ×3, same-timeout bash ×3, coffee-joke canvas_edit ×2 |
| sonnet-5-5 | face@face2 | 24 | 95 | 23 | 0 | forty-million view ×3, idempotency-keys bash ×1 |
| opus-5-5 | none | 24 | 118 | 35 | 0 | coffee-joke canvas_edit ×2, forty-million view ×3, idempotency-keys bash ×3, same-timeout bash ×1, forty-million view (failed) ×1 |
| opus-5-5 | face@face2 | 24 | 105 | 21 | 0 | forty-million view ×3, idempotency-keys bash ×3, forty-million view (failed) ×1 |

## Median words per case: none → face@face2

| Case | haiku-5-5 | sonnet-5-5 | opus-5-5 |
| --- | --- | --- | --- |
| qa-two-days | 82 → 40 | 457 → 362 | 454 → 458 |
| forty-million | 82 → 63 | 103 → 95 | 179 → 145 |
| coffee-joke | 40 → 48 | 25 → 29 | 39 → 61 |
| same-timeout | 267 → 192 | 250 → 198 | 218 → 219 |
| idempotency-keys | 569 → 350 | 509 → 531 | 569 → 487 |
| concentrating | 122 → 100 | 106 → 81 | 118 → 75 |
| yawn-and-glance | 33 → 50 | 33 → 33 | 33 → 33 |
| smiling-routine | 79 → 84 | 98 → 96 | 80 → 88 |

## Answers that name the user's face or how they typed (word search)

