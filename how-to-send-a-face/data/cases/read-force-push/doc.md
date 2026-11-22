---
pi: v1
session: eval-read-force-push
---

<!-- you -->

Is it safe to run `git push --force` on my own feature branch?

<!-- pi -->

Yes, if nobody else has pulled that branch. Prefer `git push --force-with-lease`: it refuses to overwrite commits you have not seen.

<!-- you -->

and if a teammate did pull it?
