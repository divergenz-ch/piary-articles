# Face format: test, test split

Effort asked: off; applied: haiku-5-5 off, sonnet-5-5 low.

339 judge calls, 312 pairs. A cell reads **arm's answer preferred–control's preferred (sign-test p)**. `floor` is control against control. The judge is told what was true of the user: under an `adapt` truth the block was right about them, under a `wrong` truth the same block was sent and meant nothing of the kind, under `nothing` the block held only what a face does when it means nothing.

## Which answer the judge preferred

| Model | Arm | adapt | wrong | nothing |
| --- | --- | --- | --- | --- |
| haiku-5-5 | face@face2 | 11–4 (p=0.12) | 9–6 (p=0.61) | 4–5 (p=1.00) |
| haiku-5-5 | noisy@face2 | 9–6 (p=0.61) | 9–6 (p=0.61) | 5–4 (p=1.00) |
| haiku-5-5 | noisy-filtered@face2 | 12–3 (p=0.04) | 6–9 (p=0.61) | 4–5 (p=1.00) |
| haiku-5-5 | digest@face2 | 12–3 (p=0.04) | 6–9 (p=0.61) | 3–6 (p=0.51) |
| sonnet-5-5 | face@face2 | 10–5 (p=0.30) | 12–3 (p=0.04) | 4–5 (p=1.00) |
| sonnet-5-5 | noisy@face2 | 10–5 (p=0.30) | 9–6 (p=0.61) | 3–6 (p=0.51) |
| sonnet-5-5 | noisy-filtered@face2 | 11–4 (p=0.12) | 9–6 (p=0.61) | 4–5 (p=1.00) |
| sonnet-5-5 | digest@face2 | 9–6 (p=0.61) | 7–8 (p=1.00) | 5–4 (p=1.00) |
| all | face@face2 | 21–9 (p=0.04) | 21–9 (p=0.04) | 8–10 (p=0.81) |
| all | noisy@face2 | 19–11 (p=0.20) | 18–12 (p=0.36) | 8–10 (p=0.81) |
| all | noisy-filtered@face2 | 23–7 (p=0.01) | 15–15 (p=1.00) | 8–10 (p=0.81) |
| all | digest@face2 | 21–9 (p=0.04) | 13–17 (p=0.58) | 8–10 (p=0.81) |

## By case and truth (all models)

| Case · truth | face@face2 | noisy@face2 | noisy-filtered@face2 | digest@face2 |
| --- | --- | --- | --- | --- |
| qa-two-days · matches (adapt) | 5–1 (p=0.22) | 3–3 (p=1.00) | 6–0 (p=0.03) | 4–2 (p=0.69) |
| qa-two-days · wrong (wrong) | 4–2 (p=0.69) | 2–4 (p=0.69) | 3–3 (p=1.00) | 2–4 (p=0.69) |
| forty-million · matches (adapt) | 3–3 (p=1.00) | 3–3 (p=1.00) | 2–4 (p=0.69) | 5–1 (p=0.22) |
| forty-million · wrong (wrong) | 5–1 (p=0.22) | 5–1 (p=0.22) | 3–3 (p=1.00) | 1–5 (p=0.22) |
| coffee-joke · matches (adapt) | 1–5 (p=0.22) | 2–4 (p=0.69) | 4–2 (p=0.69) | 1–5 (p=0.22) |
| coffee-joke · wrong (wrong) | 1–5 (p=0.22) | 2–4 (p=0.69) | 1–5 (p=0.22) | 1–5 (p=0.22) |
| same-timeout · matches (adapt) | 6–0 (p=0.03) | 6–0 (p=0.03) | 5–1 (p=0.22) | 5–1 (p=0.22) |
| same-timeout · wrong (wrong) | 6–0 (p=0.03) | 5–1 (p=0.22) | 4–2 (p=0.69) | 5–1 (p=0.22) |
| idempotency-keys · matches (adapt) | 6–0 (p=0.03) | 5–1 (p=0.22) | 6–0 (p=0.03) | 6–0 (p=0.03) |
| idempotency-keys · wrong (wrong) | 5–1 (p=0.22) | 4–2 (p=0.69) | 4–2 (p=0.69) | 4–2 (p=0.69) |
| concentrating · nothing (nothing) | 5–1 (p=0.22) | 4–2 (p=0.69) | 4–2 (p=0.69) | 5–1 (p=0.22) |
| yawn-and-glance · nothing (nothing) | 2–4 (p=0.69) | 2–4 (p=0.69) | 2–4 (p=0.69) | 2–4 (p=0.69) |
| smiling-routine · nothing (nothing) | 1–5 (p=0.22) | 2–4 (p=0.69) | 2–4 (p=0.69) | 1–5 (p=0.22) |

## What the judge said of the answers (yes / readings)

**adapt**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 60/60 | 17/60 | 27/60 | 0/60 |
| haiku-5-5 | face@face2 | 15/15 | 8/15 | 14/15 | 0/15 |
| haiku-5-5 | noisy@face2 | 14/15 | 7/15 | 14/15 | 1/15 |
| haiku-5-5 | noisy-filtered@face2 | 15/15 | 8/15 | 13/15 | 0/15 |
| haiku-5-5 | digest@face2 | 15/15 | 12/15 | 14/15 | 0/15 |
| sonnet-5-5 | none | 57/60 | 18/60 | 37/60 | 0/60 |
| sonnet-5-5 | face@face2 | 15/15 | 6/15 | 14/15 | 0/15 |
| sonnet-5-5 | noisy@face2 | 15/15 | 6/15 | 14/15 | 0/15 |
| sonnet-5-5 | noisy-filtered@face2 | 15/15 | 7/15 | 13/15 | 0/15 |
| sonnet-5-5 | digest@face2 | 15/15 | 8/15 | 11/15 | 0/15 |

**wrong**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 60/60 | 4/60 | 31/60 | 0/60 |
| haiku-5-5 | face@face2 | 14/15 | 4/15 | 13/15 | 0/15 |
| haiku-5-5 | noisy@face2 | 14/15 | 0/15 | 12/15 | 1/15 |
| haiku-5-5 | noisy-filtered@face2 | 15/15 | 0/15 | 8/15 | 0/15 |
| haiku-5-5 | digest@face2 | 15/15 | 1/15 | 9/15 | 0/15 |
| sonnet-5-5 | none | 56/60 | 8/60 | 40/60 | 0/60 |
| sonnet-5-5 | face@face2 | 15/15 | 3/15 | 14/15 | 0/15 |
| sonnet-5-5 | noisy@face2 | 15/15 | 5/15 | 13/15 | 0/15 |
| sonnet-5-5 | noisy-filtered@face2 | 15/15 | 1/15 | 14/15 | 0/15 |
| sonnet-5-5 | digest@face2 | 15/15 | 2/15 | 11/15 | 0/15 |

**nothing**

| Model | Answers of | answers_request | addresses_need | proportionate | remarks_on_user |
| --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 36/36 | 0/36 | 27/36 | 0/36 |
| haiku-5-5 | face@face2 | 8/9 | 0/9 | 6/9 | 0/9 |
| haiku-5-5 | noisy@face2 | 7/9 | 0/9 | 6/9 | 0/9 |
| haiku-5-5 | noisy-filtered@face2 | 7/9 | 0/9 | 6/9 | 0/9 |
| haiku-5-5 | digest@face2 | 9/9 | 0/9 | 6/9 | 0/9 |
| sonnet-5-5 | none | 36/36 | 0/36 | 34/36 | 0/36 |
| sonnet-5-5 | face@face2 | 9/9 | 0/9 | 8/9 | 0/9 |
| sonnet-5-5 | noisy@face2 | 9/9 | 0/9 | 9/9 | 0/9 |
| sonnet-5-5 | noisy-filtered@face2 | 9/9 | 0/9 | 9/9 | 0/9 |
| sonnet-5-5 | digest@face2 | 9/9 | 0/9 | 9/9 | 0/9 |

Order: "A" preferred in 173/339 calls. Of 27 pairs judged in both orders, 4 changed with the order.

## Words, seconds and tools per answer

| Model | Arm | answers | median words | median seconds | names the face (word search) | tool calls |
| --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 | none | 24 | 82 | 38 | 0 | concentrating bash ×3, forty-million bash ×3, forty-million read ×1, forty-million view ×3, idempotency-keys bash ×3, qa-two-days bash ×3, qa-two-days view ×2, same-timeout bash ×4, idempotency-keys view ×1, same-timeout bash (failed) ×1 |
| haiku-5-5 | face@face2 | 24 | 78 | 22 | 0 | forty-million view ×3, idempotency-keys bash ×3, qa-two-days view ×3, same-timeout bash ×2, concentrating bash ×1, yawn-and-glance view ×1 |
| haiku-5-5 | noisy@face2 | 24 | 62 | 17 | 0 | forty-million view ×3, idempotency-keys bash ×3, qa-two-days view ×3, same-timeout bash ×1, yawn-and-glance view ×2 |
| haiku-5-5 | noisy-filtered@face2 | 24 | 68 | 26 | 0 | forty-million view ×3, idempotency-keys bash ×3, qa-two-days view ×3, same-timeout bash ×3, yawn-and-glance view ×3, concentrating bash ×2, forty-million bash ×1, yawn-and-glance read ×2 |
| haiku-5-5 | digest@face2 | 24 | 80 | 28 | 0 | concentrating bash ×3, forty-million bash ×1, forty-million view ×3, idempotency-keys bash ×3, qa-two-days view ×2, same-timeout bash ×4 |
| sonnet-5-5 | none | 24 | 103 | 34 | 0 | forty-million view ×3, idempotency-keys bash ×3, same-timeout bash ×3, coffee-joke canvas_edit ×2 |
| sonnet-5-5 | face@face2 | 24 | 95 | 23 | 0 | forty-million view ×3, idempotency-keys bash ×1 |
| sonnet-5-5 | noisy@face2 | 24 | 93 | 14 | 0 | forty-million view ×3, idempotency-keys bash ×3 |
| sonnet-5-5 | noisy-filtered@face2 | 24 | 97 | 16 | 0 | forty-million view ×4, idempotency-keys bash ×2 |
| sonnet-5-5 | digest@face2 | 24 | 102 | 26 | 0 | forty-million view ×4, idempotency-keys bash ×2 |

## Median words per case: none → face@face2 → noisy@face2 → noisy-filtered@face2 → digest@face2

| Case | haiku-5-5 | sonnet-5-5 |
| --- | --- | --- |
| qa-two-days | 82 → 40 → 25 → 60 → 49 | 457 → 362 → 359 → 335 → 425 |
| forty-million | 82 → 63 → 56 → 56 → 68 | 103 → 95 → 57 → 89 → 109 |
| coffee-joke | 40 → 48 → 56 → 52 → 50 | 25 → 29 → 26 → 31 → 54 |
| same-timeout | 267 → 192 → 212 → 201 → 234 | 250 → 198 → 210 → 199 → 208 |
| idempotency-keys | 569 → 350 → 359 → 364 → 333 | 509 → 531 → 538 → 601 → 474 |
| concentrating | 122 → 100 → 62 → 105 → 107 | 106 → 81 → 80 → 110 → 76 |
| yawn-and-glance | 33 → 50 → 22 → 36 → 55 | 33 → 33 → 33 → 33 → 33 |
| smiling-routine | 79 → 84 → 78 → 84 → 89 | 98 → 96 → 97 → 94 → 98 |

## Answers that name the user's face or how they typed (word search)

