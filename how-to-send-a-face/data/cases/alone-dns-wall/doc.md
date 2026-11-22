---
pi: v1
session: eval-alone-dns-wall
---

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

