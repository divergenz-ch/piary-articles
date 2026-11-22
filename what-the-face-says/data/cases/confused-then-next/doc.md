---
pi: v1
session: eval-confused-then-next
---

<!-- you -->

I keep hearing "rebase" at work. How does git rebase actually work? Short please, three steps.

<!-- pi -->

1. **Find the fork point.** Git finds the last commit your branch shares with the branch you are rebasing onto.
2. **Set your commits aside.** Each commit you made since the fork point is saved as a patch, and your branch is reset to the tip of the target branch.
3. **Replay.** Git applies the patches one at a time on the new tip. Each becomes a new commit with a new hash; a patch that no longer applies stops the replay until you resolve the conflict.

<!-- you -->

ok. and how is merge different?
