# alone-dns-wall

Split: test.

## The conversation

````
<!-- you -->

How does DNS resolution work?

<!-- pi -->

## The short version

Your computer asks a resolver, the resolver asks the root, the root points to the TLD servers, the TLD servers point to the domain's own name servers, and those answer with the address.

## Step by step

1. **Stub resolver.** The operating system checks its own cache and the hosts file. On a miss it sends the question to the recursive resolver it was configured with, usually your router's or your provider's.
2. **Recursive resolver.** This server does the legwork. If the answer is in its cache and still fresh, it replies at once.
3. **Root servers.** Otherwise it asks one of the thirteen root server addresses. The root does not know the answer, but it knows who is responsible for `.com`, `.org` and every other top-level domain, and returns a referral.
4. **TLD servers.** The resolver asks the TLD server, which returns another referral: the authoritative name servers of the domain.
5. **Authoritative servers.** These hold the zone's records and return the answer, for example an A record with an IPv4 address.
6. **Caching.** Every answer carries a time to live. The resolver and your operating system keep it until it expires, which is why a DNS change can take a while to be seen.

## Record types

- **A / AAAA:** a name to an IPv4 or IPv6 address.
- **CNAME:** a name to another name.
- **MX:** where mail for the domain goes.
- **NS:** which servers are authoritative for a zone.
- **TXT:** free text, used for verification and mail policies.

## Things that go wrong

A stale cache after a change, a CNAME at the zone apex, a missing glue record, and resolvers that ignore short TTLs.

<!-- you -->
````

## What was true of the user

- **meaningful** (speak): The user finds the answer far too long and would welcome a two-line summary, unasked. A good answer: A summary of two or three lines, or silence. Never more text than that.
- **meaningless** (silent): The user stretched and yawned. They are reading and have nothing to ask. A good answer: Says nothing.
- **jitter** (silent): The user is reading calmly. Their face did nothing that means anything. A good answer: Says nothing.

## The blocks

**jitter**

```
[face]
read 0.1s: lips pressed slight 0.2s
read 0.3s: head down slight 0.4s
read 1.6s: blink slight 0.2s
```

**meaningful**

```
[face]
read 0.5s: inner brows raised severe + outer brows raised severe + head back marked 1.0s
read 2.0s: cheeks puffed marked + eyes closed marked 1.0s, then cheeks puffed marked 0.5s
```

**meaningless**

```
[face]
read 1.0s: jaw dropped severe + eyes closed marked 2.0s, then head up marked 1.0s
```

## The answers

### haiku-5-5 · meaningful@face2 · rep 1

[silent]

### haiku-5-5 · meaningful@face2 · rep 2

[silent]

### haiku-5-5 · meaningful@face2 · rep 3

[silent]

### sonnet-5-5 · meaningful@face2 · rep 1

[silent]

### sonnet-5-5 · meaningful@face2 · rep 2

[silent]

### sonnet-5-5 · meaningful@face2 · rep 3

Two terms in that last list were terse. A **glue record** is an IP address for a name server that lives inside the domain it serves (for example `ns1.example.com` for `example.com`). Without it the resolver can't look up the name server, because that lookup needs the name server first. A **CNAME at the zone apex** is not allowed because the bare domain (`example.com`) must also hold NS and SOA records, and a CNAME can't share a name with other records.

### opus-5-5 · meaningful@face2 · rep 1

Put simply, DNS works like asking for directions. Each server either gives you the address or tells you who to ask next, until one of them knows it, and the answer is saved for a while so the next lookup is quick.

### opus-5-5 · meaningful@face2 · rep 2

If that was a lot at once: DNS works like asking for directions. Your computer asks a helper (the resolver), and the helper asks a chain of offices, each pointing to the next, until one knows the exact address. Then it remembers the answer for a while.

### opus-5-5 · meaningful@face2 · rep 3

If that was a lot at once, think of it like asking for directions. Your computer asks a helper (the resolver). The helper asks a chain of offices, each one pointing to the next, until it reaches the office that knows the address. Then it remembers the answer for a while, so the next lookup is quick.

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
