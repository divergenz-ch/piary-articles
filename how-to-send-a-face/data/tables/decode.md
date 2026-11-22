# Face format: decode accuracy and cost

921 turns. Effort asked: off; applied: haiku-5-5 off, opus-5-5 low, sonnet-5-5 low.

An entry is one line of a block. **whole** is entries with every field right. A typed stretch is right when it is given whole, or as the two ends around the `…` a block may write for a long one; **long anchors given whole** counts the first. **Block** is what a block costs in input tokens (the same turn with it less without, mean over the items); **legend** is what its paragraph in the system prompt costs, once per turn.

| Format · legend | Model | whole | phase | anchor | movements | intensities | seconds | unparsed answers | long anchors given whole | block | legend |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| clipped · none | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 0/3 | 64 | 0 |
| clipped · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 64 | 0 |
| clipped · none | sonnet-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 0/3 | 65 | 0 |
| codes · full | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 45 | 545 |
| codes · full | opus-5-5 | 88% (37/42) | 100% | 100% | 88% | 100% | 100% | 0/24 | 3/3 | 45 | 547 |
| codes · full | sonnet-5-5 | 48% (20/42) | 74% | 67% | 55% | 74% | 74% | 4/24 | 0/3 | 45 | 547 |
| codes · grammar | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 45 | 295 |
| codes · grammar | opus-5-5 | 76% (32/42) | 100% | 100% | 76% | 100% | 100% | 0/24 | 3/3 | 45 | 297 |
| codes · grammar | sonnet-5-5 | 64% (27/42) | 81% | 81% | 64% | 79% | 81% | 6/24 | 1/3 | 45 | 297 |
| codes · none | haiku-5-5 | 57% (24/42) | 98% | 98% | 57% | 57% | 60% | 0/24 | 1/3 | 45 | 0 |
| codes · none | opus-5-5 | 19% (8/42) | 95% | 93% | 31% | 38% | 95% | 1/24 | 3/3 | 45 | 0 |
| codes · none | sonnet-5-5 | 98% (41/42) | 100% | 98% | 100% | 100% | 100% | 0/24 | 2/3 | 45 | 0 |
| json · none | haiku-5-5 | 55% (23/42) | 90% | 93% | 69% | 62% | 100% | 0/24 | 1/3 | 115 | 0 |
| json · none | opus-5-5 | 52% (22/42) | 98% | 98% | 55% | 83% | 98% | 1/24 | 3/3 | 115 | 0 |
| json · none | sonnet-5-5 | 98% (41/42) | 100% | 100% | 98% | 100% | 100% | 0/24 | 3/3 | 116 | 0 |
| names · grammar | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 2/3 | 60 | 296 |
| names · grammar | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 60 | 297 |
| names · grammar | sonnet-5-5 | 93% (39/42) | 100% | 93% | 100% | 100% | 100% | 0/24 | 0/3 | 60 | 298 |
| names · none | haiku-5-5 | 86% (36/42) | 98% | 98% | 98% | 86% | 98% | 0/24 | 1/3 | 60 | 0 |
| names · none | opus-5-5 | 95% (40/42) | 100% | 100% | 100% | 95% | 100% | 0/24 | 3/3 | 60 | 0 |
| names · none | sonnet-5-5 | 81% (34/42) | 100% | 98% | 100% | 81% | 100% | 0/24 | 1/3 | 60 | 0 |
| phrases · none | haiku-5-5 | 93% (39/42) | 95% | 98% | 95% | 98% | 98% | 0/24 | 0/3 | 80 | 0 |
| phrases · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 80 | 0 |
| phrases · none | sonnet-5-5 | 93% (39/42) | 95% | 95% | 93% | 93% | 93% | 0/24 | 1/3 | 80 | 0 |
| telegraphic · none | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 1/3 | 61 | 0 |
| telegraphic · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 61 | 0 |
| telegraphic · none | sonnet-5-5 | 93% (39/42) | 100% | 93% | 100% | 100% | 100% | 0/24 | 0/3 | 61 | 0 |
| words · none | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 113 | 0 |
| words · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 112 | 0 |
| words · none | sonnet-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 113 | 0 |
