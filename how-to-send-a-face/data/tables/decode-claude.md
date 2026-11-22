# Face format: decode accuracy and cost

408 turns. Effort asked: none (`claude -p` could not be held to one; a turn either thought first or did not); applied: haiku-5-5 thinking, haiku-5-5 no thinking, opus-5-5 thinking, opus-5-5 no thinking, sonnet-5-5 thinking, sonnet-5-5 no thinking.

An entry is one line of a block. **whole** is entries with every field right. A typed stretch is right when it is given whole, or as the two ends around the `…` a block may write for a long one; **long anchors given whole** counts the first. **Block** is what a block costs in input tokens (the same turn with it less without, mean over the items); **legend** is what its paragraph in the system prompt costs, once per turn.

| Format · legend | Model | whole | phase | anchor | movements | intensities | seconds | unparsed answers | long anchors given whole | block | legend |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| clipped · none | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 0/3 | 65 | 0 |
| clipped · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 65 | 0 |
| clipped · none | sonnet-5-5 | 95% (40/42) | 100% | 95% | 100% | 100% | 100% | 0/24 | 1/3 | 64 | 0 |
| phrases · none | haiku-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 1/3 | 80 | 0 |
| phrases · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 80 | 0 |
| phrases · none | sonnet-5-5 | 93% (39/42) | 100% | 93% | 100% | 100% | 100% | 0/24 | 0/3 | 80 | 0 |
| telegraphic · none | haiku-5-5 | 98% (41/42) | 100% | 100% | 98% | 98% | 98% | 0/24 | 0/3 | 61 | 0 |
| telegraphic · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 61 | 0 |
| telegraphic · none | sonnet-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 61 | 0 |
| words · none | haiku-5-5 | 95% (40/42) | 100% | 95% | 100% | 100% | 100% | 0/24 | 3/3 | 112 | 0 |
| words · none | opus-5-5 | 100% (42/42) | 100% | 100% | 100% | 100% | 100% | 0/24 | 3/3 | 113 | 0 |
| words · none | sonnet-5-5 | 95% (40/42) | 100% | 95% | 100% | 100% | 100% | 0/24 | 2/3 | 113 | 0 |
