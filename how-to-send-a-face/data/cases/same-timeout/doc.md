---
pi: v1
session: eval-same-timeout
---

<!-- you -->

My CSV export times out after 30 seconds on large accounts. What should I try?

<!-- pi -->

Three things, in order:

1. **Clear the export cache.** A stale cache entry can make the job rebuild everything: `bin/cache clear export`.
2. **Restart the worker.** `systemctl restart export-worker` picks up the cleared cache.
3. **Check the query.** If it still times out, the export query is probably missing an index on `account_id`.

<!-- you -->

The export still fails. I cleared the cache like you said, restarted the worker, and it throws the same timeout after 30 seconds on the big accounts.
