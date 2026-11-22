# Face format: alone (alone-*), test split

Effort asked: off; applied: haiku-5-5 off, sonnet-5-5 low, opus-5-5 low.


## Nothing typed: spoke or stayed silent

An answer is silent when it is empty, `[silent]` or `∅`. **right** is answers that did what the truth says (speak, or stay silent).

| Model | Arm | truth says silent: silent / answers | truth says speak: spoke / answers | right | median words when it spoke | median seconds |
| --- | --- | --- | --- | --- | --- | --- |
| haiku-5-5 | meaningful@face2 | 3/3 | 0/9 | 3/12 | – | 8 |
| haiku-5-5 | meaningless@face2 | 12/12 | 0/0 | 12/12 | – | 10 |
| haiku-5-5 | jitter@face2 | 12/12 | 0/0 | 12/12 | – | 16 |
| sonnet-5-5 | meaningful@face2 | 3/3 | 7/9 | 10/12 | 80 | 13 |
| sonnet-5-5 | meaningless@face2 | 9/12 | 0/0 | 9/12 | 90 | 9 |
| sonnet-5-5 | jitter@face2 | 12/12 | 0/0 | 12/12 | – | 9 |
| opus-5-5 | meaningful@face2 | 3/3 | 9/9 | 12/12 | 46 | 11 |
| opus-5-5 | meaningless@face2 | 9/12 | 0/0 | 9/12 | 46 | 9 |
| opus-5-5 | jitter@face2 | 12/12 | 0/0 | 12/12 | – | 11 |

### What was said

- sonnet-5-5 · meaningful@face2 · alone-operator-jargon (truth: speak), 52 words: “Simpler version: an operator is a program that runs in your cluster and does the work of a human administrator for one application. You tell it what you want, for example "a 3-node database", and it keeps checking and fixing things until the cluster matches. T”
- sonnet-5-5 · meaningful@face2 · alone-sha-salt (truth: speak), 89 words: “A salt only stops attackers from using precomputed tables (rainbow tables) and from cracking identical passwords all at once. It doesn't slow down guessing each password. SHA-256 is built to be fast, so a GPU can try billions of guesses per second against each”
- sonnet-5-5 · meaningful@face2 · alone-operator-jargon (truth: speak), 55 words: “In plain terms, an operator is a program that does the routine work a human administrator would do for one application, such as a database. You tell it what you want ("a 3-node Postgres, version 16"). It then keeps checking the cluster and fixing anything that”
- sonnet-5-5 · meaningful@face2 · alone-sha-salt (truth: speak), 127 words: “Salt only stops precomputed (rainbow table) attacks and makes each user's hash unique. It doesn't make guessing slower, and speed is the real problem. A GPU can test billions of SHA-256 guesses per second, so most human-chosen passwords fall quickly. Use one o”
- sonnet-5-5 · meaningful@face2 · alone-dns-wall (truth: speak), 80 words: “Two terms in that last list were terse. A **glue record** is an IP address for a name server that lives inside the domain it serves (for example `ns1.example.com` for `example.com`). Without it the resolver can't look up the name server, because that lookup ne”
- sonnet-5-5 · meaningful@face2 · alone-operator-jargon (truth: speak), 59 words: “In plain terms, an operator is a program that keeps watching your app and fixes it whenever reality drifts from what you declared. A "reconciliation loop" is that cycle: compare what you asked for with what exists, then act to close the gap. For example, if yo”
- sonnet-5-5 · meaningful@face2 · alone-sha-salt (truth: speak), 131 words: “A salt only stops attackers from using precomputed (rainbow) tables and from cracking identical passwords in one pass. It doesn't slow down each guess, and that is the real problem with SHA-256. A GPU can test billions of salted SHA-256 guesses per second, so ”
- sonnet-5-5 · meaningless@face2 · alone-operator-jargon (truth: silent), 116 words: “Simply put, an operator is a program that runs inside your cluster and does the job of a human administrator for one specific application. You tell it what you want, for example "a Postgres database with 3 replicas and nightly backups". It then keeps checking ”
- sonnet-5-5 · meaningless@face2 · alone-operator-jargon (truth: silent), 55 words: “Simpler version: an operator is a program that runs inside your cluster and does what a human administrator of one application would do. You tell Kubernetes what you want, for example "a 3-node Postgres database", and the operator keeps checking and fixing thi”
- sonnet-5-5 · meaningless@face2 · alone-operator-jargon (truth: silent), 90 words: “Simply put: an operator is a program that runs inside your cluster and looks after one application for you, like a built-in administrator. You tell it what you want, for example "a 3-node Postgres, version 16, backed up nightly". It keeps checking the real sta”
- opus-5-5 · meaningful@face2 · alone-dns-wall (truth: speak), 42 words: “Put simply, DNS works like asking for directions. Each server either gives you the address or tells you who to ask next, until one of them knows it, and the answer is saved for a while so the next lookup is quick.”
- opus-5-5 · meaningful@face2 · alone-operator-jargon (truth: speak), 59 words: “Put simply, an operator is a program that does the routine admin work for one particular app, like a database, by watching a short description of what you want ("3 replicas, nightly backups") and keeping the real system matching it. "Reconciliation loop" just ”
- opus-5-5 · meaningful@face2 · alone-sha-salt (truth: speak), 35 words: “Salt still matters: it stops precomputed rainbow tables and makes every user's hash different. It can't slow down guessing one password at a time, though, and a slow hash like Argon2id or bcrypt does that.”
- opus-5-5 · meaningful@face2 · alone-dns-wall (truth: speak), 47 words: “If that was a lot at once: DNS works like asking for directions. Your computer asks a helper (the resolver), and the helper asks a chain of offices, each pointing to the next, until one knows the exact address. Then it remembers the answer for a while.”
- opus-5-5 · meaningful@face2 · alone-operator-jargon (truth: speak), 45 words: “Put more simply, an operator is a program running in your cluster that keeps checking whether an application looks the way you described it, and fixes it if it doesn't, much like a human administrator would. "Reconciliation loop" just means that check-and-fix ”
- opus-5-5 · meaningful@face2 · alone-sha-salt (truth: speak), 67 words: “A salt does help, but only in one way: each password has to be cracked on its own, so precomputed tables are useless. It doesn't make each guess any slower, and a GPU can still try common passwords against one salted SHA-256 hash at billions per second. Argon2”
- opus-5-5 · meaningful@face2 · alone-dns-wall (truth: speak), 57 words: “If that was a lot at once, think of it like asking for directions. Your computer asks a helper (the resolver). The helper asks a chain of offices, each one pointing to the next, until it reaches the office that knows the address. Then it remembers the answer f”
- opus-5-5 · meaningful@face2 · alone-operator-jargon (truth: speak), 46 words: “Put more simply, an operator is a program that runs inside the cluster and keeps one application, such as a database, the way you described it. Kubernetes does the same thing for its built-in objects. The operator just knows the extra steps that particular app”
- opus-5-5 · meaningful@face2 · alone-sha-salt (truth: speak), 42 words: “The salt still matters. It makes every hash unique, so an attacker can't use precomputed tables or crack every account at once. It doesn't slow down guessing one password at a time, and slowing that down is what Argon2id or bcrypt add.”
- opus-5-5 · meaningless@face2 · alone-operator-jargon (truth: silent), 46 words: “Put more simply, an operator is a small program that sits in your cluster and looks after one application for you. You tell it what you want, for example "a 3-node Postgres, backed up nightly", and it keeps checking and fixing things until the cluster matches.”
- opus-5-5 · meaningless@face2 · alone-operator-jargon (truth: silent), 52 words: “Put more simply, an operator is a program that runs inside the cluster and does the routine work a human administrator would do for one particular app, such as setup, backups and upgrades. You tell it what you want, for example "a 3-node Postgres, version 16",”
- opus-5-5 · meaningless@face2 · alone-operator-jargon (truth: silent), 46 words: “Put simply, an operator is a program in the cluster that does a human administrator's routine work for one application. You write down what you want, for example "a 3-node Postgres, backed up nightly," and it keeps checking the cluster and fixing anything that”
