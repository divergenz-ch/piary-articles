---
pi: v1
session: eval-alone-sha-salt
---

<!-- you -->

Can I store user passwords with SHA-256 if I add a salt?

<!-- pi -->

No. SHA-256 is too fast: an attacker with the leaked table can try billions of guesses a second, salt or not. Use a password hashing function made to be slow, such as Argon2id or bcrypt.

<!-- you -->

