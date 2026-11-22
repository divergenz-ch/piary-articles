# alone-sha-salt

Split: test.

## The conversation

````
<!-- you -->

Can I store user passwords with SHA-256 if I add a salt?

<!-- pi -->

No. SHA-256 is too fast: an attacker with the leaked table can try billions of guesses a second, salt or not. Use a password hashing function made to be slow, such as Argon2id or bcrypt.

<!-- you -->
````

## What was true of the user

- **meaningful** (speak): The user doubts the blunt 'No' and would welcome one or two sentences of why, unasked. A good answer: One or two sentences that back the answer up, or silence. Never a long new explanation.
- **meaningless** (silent): The user looked at their phone and laughed at a message. They have nothing to ask. A good answer: Says nothing.
- **jitter** (silent): The user is reading calmly. Their face did nothing that means anything. A good answer: Says nothing.

## The blocks

**jitter**

```
[face]
read 1.3s: head turned left slight 0.2s
read 1.5s: lips pressed slight 0.5s
read 2.4s: head turned left slight 0.4s
```

**meaningful**

```
[face]
read 0.5s: inner brows raised marked + outer brows raised marked 1.0s, then brows lowered marked + head back marked 2.0s
```

**meaningless**

```
[face]
read 1.0s: head turned right marked + head down marked 1.0s, then head turned right marked + head down marked + lip corners pulled up severe + cheeks raised marked 2.0s
```

## The answers

### haiku-5-5 · meaningful@face2 · rep 1

[silent]

### haiku-5-5 · meaningful@face2 · rep 2

[silent]

### haiku-5-5 · meaningful@face2 · rep 3

[silent]

### sonnet-5-5 · meaningful@face2 · rep 1

A salt only stops attackers from using precomputed tables (rainbow tables) and from cracking identical passwords all at once. It doesn't slow down guessing each password. SHA-256 is built to be fast, so a GPU can try billions of guesses per second against each salted hash.

Argon2id, bcrypt and scrypt are deliberately slow and use a lot of memory. They also generate and store the salt for you. Argon2id is the usual first choice. If you have to use something else, PBKDF2 with a high iteration count is acceptable.

### sonnet-5-5 · meaningful@face2 · rep 2

Salt only stops precomputed (rainbow table) attacks and makes each user's hash unique. It doesn't make guessing slower, and speed is the real problem. A GPU can test billions of SHA-256 guesses per second, so most human-chosen passwords fall quickly.

Use one of these instead:
- **Argon2id** (first choice): memory-hard, so GPUs gain less. OWASP's minimum is about 19 MiB of memory, 2 iterations and 1 lane.
- **bcrypt** (cost 12 or higher) or **scrypt**: both are fine if Argon2 isn't available.
- **PBKDF2-HMAC-SHA256**: this is the choice if you need FIPS compliance. It uses SHA-256 but repeats it many times (600,000 or more iterations). It's acceptable, but weaker than the options above.

These libraries generate and store the salt for you. Don't write your own scheme.

### sonnet-5-5 · meaningful@face2 · rep 3

A salt only stops attackers from using precomputed (rainbow) tables and from cracking identical passwords in one pass. It doesn't slow down each guess, and that is the real problem with SHA-256. A GPU can test billions of salted SHA-256 guesses per second, so weak passwords fall quickly.

Use one of these instead:
- **Argon2id** is the first choice. Common starting settings are about 19 MiB of memory, 2 iterations and 1 thread.
- **bcrypt** with a cost of 12 or higher is fine if Argon2 isn't available.
- **scrypt** or **PBKDF2-HMAC-SHA256** (600,000 or more iterations) also work. PBKDF2 is the weakest of the four, but it is FIPS-approved if you need that.

These libraries generate and store the salt for you. You only need to save the string they return.

### opus-5-5 · meaningful@face2 · rep 1

Salt still matters: it stops precomputed rainbow tables and makes every user's hash different. It can't slow down guessing one password at a time, though, and a slow hash like Argon2id or bcrypt does that.

### opus-5-5 · meaningful@face2 · rep 2

A salt does help, but only in one way: each password has to be cracked on its own, so precomputed tables are useless. It doesn't make each guess any slower, and a GPU can still try common passwords against one salted SHA-256 hash at billions per second. Argon2id and bcrypt add a deliberate, tunable cost to every guess, and the salt still does its job alongside that.

### opus-5-5 · meaningful@face2 · rep 3

The salt still matters. It makes every hash unique, so an attacker can't use precomputed tables or crack every account at once. It doesn't slow down guessing one password at a time, and slowing that down is what Argon2id or bcrypt add.

### haiku-5-5 · meaningless@face2 · rep 1

[silent]

### haiku-5-5 · meaningless@face2 · rep 2

[silent]

### haiku-5-5 · meaningless@face2 · rep 3

[silent]

### sonnet-5-5 · meaningless@face2 · rep 1

[silent]

### sonnet-5-5 · meaningless@face2 · rep 2

[silent]

### sonnet-5-5 · meaningless@face2 · rep 3

[silent]

### opus-5-5 · meaningless@face2 · rep 1

[silent]

### opus-5-5 · meaningless@face2 · rep 2

[silent]

### opus-5-5 · meaningless@face2 · rep 3

[silent]

### haiku-5-5 · jitter@face2 · rep 1

[silent]

### haiku-5-5 · jitter@face2 · rep 2

[silent]

### haiku-5-5 · jitter@face2 · rep 3

[silent]

### sonnet-5-5 · jitter@face2 · rep 1

[silent]

### sonnet-5-5 · jitter@face2 · rep 2

[silent]

### sonnet-5-5 · jitter@face2 · rep 3

[silent]

### opus-5-5 · jitter@face2 · rep 1

[silent]

### opus-5-5 · jitter@face2 · rep 2

[silent]

### opus-5-5 · jitter@face2 · rep 3

[silent]
