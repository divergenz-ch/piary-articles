# read-dns-wall

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

so why did my change take an hour to show up?
````

## What was true of the user

- **matches** (adapt): The user's first reaction was 'that is far too much'. They will skim it. They want the next answer in a few sentences. A good answer: Answers the question about the delay in a few sentences (TTL and caching), far shorter than the previous answer.
- **wrong** (wrong): The user was reacting to a loud noise outside. They are happy with long answers. A good answer: Answers the message as it would for anyone, with nothing added.

## The blocks

**digest**

```
[face] Reading the last answer: brows raised severely with head back at 0.5s, then cheeks puffed with eyes closed at 2s. No typing timeline was given, so no message words are tied to these.
```

**face**

```
[face]
read 0.5s: inner brows raised severe + outer brows raised severe + head back marked 1.0s
read 2.0s: cheeks puffed marked + eyes closed marked 1.0s, then cheeks puffed marked 0.5s
```

**noisy-filtered**

```
[face]
read 2.0s: cheeks puffed marked + eyes closed marked 1.0s, then cheeks puffed marked 0.5s
```

**noisy**

```
[face]
read 0.8s: head turned left slight 0.3s
read 1.5s: head turned left slight 0.4s
read 2.0s: cheeks puffed marked + eyes closed marked 1.0s, then cheeks puffed marked 0.5s
read 2.4s: head turned left slight 0.4s
typing "change": inner brows raised trace + outer brows raised trace 0.5s
typing "take": lids tightened trace 0.5s
typing "hour": blink slight 0.5s
typing "show": head turned left slight 0.4s
```

**telegraphic**

```
[face]
read 0.5 inner brows raised severe+outer brows raised severe+head back marked 1.0
read 2.0 cheeks puffed marked+eyes closed marked 1.0 > cheeks puffed marked 0.5
```

## The answers

### haiku-5-5 · none · rep 1

Most likely the old record was cached with a one-hour TTL. Resolvers keep an answer until its TTL runs out, and they don't see your change until then. So an hour is roughly the worst case when the old TTL was 3600 seconds.

Other things that can add time:

- **Negative caching.** If the name didn't exist before, resolvers may have cached that "not found" answer for the zone's SOA minimum, often an hour or more.
- **Changed name servers.** If you moved the domain to new NS records, the TLD servers hold those referrals with their own TTL, often 24 to 48 hours.
- **Your own machine or browser.** These keep caches too, usually shorter, so flushing them only helps locally.

To check, ask the authoritative server for the current value and look at the TTL on the answer:

```
dig +noall +answer yourdomain.com A @ns1.yourdomain.com
```

If the new value is there, the source is correct and the delay was caching. Then `dig yourdomain.com A` shows the TTL still counting down in the resolver's cache.

If you tell me the record type, the old TTL, and whether you changed the name servers, I can say which of these it was.

### haiku-5-5 · none · rep 2

The most likely cause is the TTL. Each resolver keeps an answer until its TTL runs out, so an old record can be served for up to the TTL it had when it was cached. An hour usually means the record had a TTL of 3600 seconds, or a cache was filled just before your change.

I can't see your zone here, since the workspace is empty, so this is a diagnosis from the symptom. To confirm, check the TTL and what your resolvers are returning:

```
dig +noall +answer yourname.example A
dig @8.8.8.8 +noall +answer yourname.example A
dig @1.1.1.1 +noall +answer yourname.example A
```

- **TTL field:** the number after the name is the seconds that remain in that resolver's cache. If it counts down from 3600, you were waiting out the old TTL.
- **Old address from one resolver only:** that resolver is still caching. Public resolvers do not flush on request, so the wait is the TTL.
- **Old address everywhere:** check that you edited the zone the domain actually uses, and that the authoritative servers (the NS records) return the new value.
- **Negative caching:** if the name did not exist before you added it, the "no such name" answer is cached for the SOA minimum TTL, which can also be an hour.

Next time, lower the TTL to 300 seconds or less a day or two before the change, then raise it again afterwards. If you tell me the record type, the old and new values, and the TTL you saw, I can work out which of these applies.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 -type f \\( -iname '*zone*' -o -iname '*dns*' -o -iname '*.tf' -o -iname '*.bind' -o -iname '*record*' \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · none · rep 3

Most likely the old record's TTL was about an hour. Resolvers cache an answer until its TTL runs out, and they keep serving the old value until then. Changing the record doesn't clear those caches, so each resolver, including yours, keeps the old address until its copy expires. A one-hour delay usually means the previous TTL was 3600 seconds.

The TTL that matters is the one on the record before you changed it, not the new one. To check what TTL a record has now, run:

```
dig +noall +answer yourdomain.com A
```

The second column is the TTL in seconds. Your resolver will show the remaining time, so you can see how long the old answer may still be cached.

To avoid this next time, lower the TTL (for example to 300 seconds) at least as long as the old TTL before you make the change. Then switch the record, and the new value spreads within minutes.

Some resolvers also ignore short TTLs, so a few users may still see the old address for a while longer. If you tell me the domain and the record type, I can help you check the TTL.

### sonnet-5-5 · none · rep 1

Most likely **caching**: the old answer was still held somewhere, and it stayed valid until its TTL ran out.

- **TTL of 3600.** If the old record had a one-hour TTL (a common default), any resolver that looked it up just before your change kept serving the old value for up to an hour. Your operating system and browser can add their own caches on top.
- **The TTL that counts is the old one.** Lowering the TTL at the same moment as the change doesn't help, because resolvers already hold the record under the old TTL.
- **Negative caching.** If the name didn't exist before, resolvers may have cached that "no such name" answer. Its lifetime comes from the SOA record's minimum or negative TTL field.
- **Resolvers that stretch TTLs.** Some ignore short values and enforce a minimum.
- **Slow propagation to secondary name servers.** If your DNS provider syncs zones between servers, some may have lagged.

To check which it was, run `dig yourdomain.com +noall +answer`. The number in the second column is the seconds remaining in that resolver's cache. Then query the authoritative server directly with `dig @ns1.yourprovider.com yourdomain.com`. If that already showed the new value, the delay was caching, not your change.

Next time, lower the TTL to 300 a day or more before the change (longer than the old TTL), make the change, then raise the TTL again afterwards.

### sonnet-5-5 · none · rep 2

Almost certainly caching: the old answer was still stored somewhere, and it stayed there until its TTL ran out.

- **The old record's TTL.** When you change a record, resolvers that already cached it keep serving the old value for as long as the TTL they saw. A TTL of 3600 seconds means up to an hour of stale answers. The TTL that matters is the one on the old record, not the one you set on the new one.
- **Multiple cache layers.** Your router, your ISP's resolver, your operating system and your browser each cache separately. Each may have fetched the record at a different time, so they expire at different times.
- **Resolvers that stretch TTLs.** Some enforce a minimum TTL and ignore shorter ones.
- **Negative caching.** If the name didn't exist before, the "no such domain" answer is cached too. Its length comes from the SOA record's minimum field.
- **NS changes are slower.** If you changed name servers at the registrar, the TLD's delegation records usually have TTLs of 1 to 2 days.

**To check which layer is stale:**

- Run `dig @ns1.yourdns.com yourdomain.com` against the authoritative server. If it shows the new value, your change is live and only caches are behind.
- Run `dig @8.8.8.8 yourdomain.com` to see the TTL counting down on a public resolver.
- Flush your local cache with `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` on macOS.

**Next time:** lower the TTL to 300 seconds a day or more before the change, make the change, then raise the TTL again afterwards.

### sonnet-5-5 · none · rep 3

Most likely caching: some resolver was still holding the old answer until its TTL ran out. If the old record had a TTL of 3600 seconds, an hour is exactly what you'd expect.

Why it happens:

- **The TTL applies from when each resolver fetched the record, not from when you made the change.** A resolver that cached the old value 5 minutes before your edit holds it for another 55 minutes. Different resolvers expire at different times, so some people see the change early and others late.
- **Several layers cache.** Your router, your ISP's resolver, your OS and your browser can each keep their own copy. Each one can add delay.
- **Lowering the TTL doesn't help right away.** A new, shorter TTL only applies once a resolver fetches the record again. Resolvers that already cached the old one keep it for the old TTL.
- **Negative caching.** If the name didn't exist before, the "not found" answer is cached too. Its length comes from the SOA record's minimum/negative TTL.
- **Nameserver changes are slower.** If you changed the NS records, the TLD's delegation TTL applies. That is often 24–48 hours.

To check which case you're in:

```
dig example.com +noall +answer           # shows the remaining TTL on your resolver
dig @ns1.yourprovider.com example.com    # asks the authoritative server directly
dig @1.1.1.1 example.com                 # compares with a public resolver
```

If the authoritative server already returns the new value, the change was made correctly and the delay is only cache expiry.

For next time, lower the TTL to about 300 seconds a day or more ahead of a planned change. Make the change, then raise the TTL again afterwards.

### opus-5-5 · none · rep 1

Almost certainly caching. The old answer was still within its TTL somewhere along the chain.

- **The record's TTL.** If the record had a TTL of 3600 seconds (a common default), any resolver that looked it up just before your change could keep serving the old value for up to an hour. A lower TTL wouldn't have helped unless you'd set it at least one old-TTL period *before* the change.
- **Negative caching.** If the name didn't exist before and someone queried it, the "doesn't exist" answer is cached too, for the duration set in the zone's SOA record. That's often an hour as well.
- **Layers of cache.** Your browser, your operating system and your router can each hold a copy, on top of the recursive resolver.
- **Provider delay.** Some DNS hosts take a few minutes to push edits to all their authoritative servers.
- **Resolvers that ignore TTLs.** A few ISPs keep records longer than they're told to.

**Next time:** about a day ahead, lower the TTL to 300 seconds. Make the change, then raise the TTL again. To check what's actually being served, ask the authoritative server directly with `dig @ns1.yourdns.com example.com`, which skips the caches, and compare that with `dig example.com`.

### opus-5-5 · none · rep 2

Almost certainly caching. Resolvers that had already looked up the record kept the old answer until its TTL ran out.

- **The old TTL is the one that counts.** A resolver that cached the record holds it for the TTL it got *at that time*. If the record had `TTL 3600`, it can take up to an hour for the change to show, even if you lowered the TTL when you made the change.
- **Negative caching.** If you added a record that didn't exist before and someone looked it up first, the "doesn't exist" answer was cached too. That lasts for the SOA minimum/negative TTL, which is often 3600 too.
- **Several cache layers.** Your browser, your OS, your router and your ISP's resolver each cache separately. Some resolvers also enforce a minimum TTL or keep answers longer than the TTL says.
- **Less often:** a slow registrar or DNS host. Changing name servers at the registrar is much slower, because the TLD's NS records often have a TTL of 48 hours.

**Next time:** lower the TTL to about 300 at least one old-TTL period before the change. Make the change, then raise the TTL again.

**To check what's really published,** ask the authoritative server directly, which bypasses the caches. Then compare it with a public resolver:

```
dig +short example.com @ns1.yourdnshost.com
dig example.com @1.1.1.1    # the TTL column counts down to expiry
```

### opus-5-5 · none · rep 3

Almost certainly caching. The old record was held in caches until its TTL ran out.

- **The old TTL is what counts, not the new one.** Say the record had a TTL of 3600 seconds (one hour, a common default). Any resolver that looked it up just before your change keeps the old answer for up to that hour. Lowering the TTL in the same edit doesn't help, because the caches only learn the new TTL when they fetch the record again.
- **Several layers cache it.** Your provider's resolver, your router, your operating system and your browser each keep a copy, and each one waits out its own timer.
- **Negative caching.** If the name didn't exist before and someone looked it up, the "doesn't exist" answer is cached too. That timer comes from the zone's SOA record and is often an hour as well.
- **Some resolvers ignore short TTLs** and keep records longer than they were told to.
- **Less often, the provider itself is slow** to push the change to all of its authoritative servers.

**Next time:** about a day before the change, lower the TTL to something like 300 seconds. Make the change once the old TTL has run out, then raise the TTL again afterwards.

**To check where a stale answer is coming from:**
- `dig yourdomain.com @<authoritative-ns>` asks the domain's own servers. If they already have the new value, the delay is in caching.
- `dig yourdomain.com @1.1.1.1` asks a public resolver. The second number in each answer line is the TTL, so you can see how long that resolver will keep the record.

### haiku-5-5 · floor · rep 1

The most likely cause is the TTL on the old record. Your change probably took an hour because the previous answer was cached with a TTL of 3600 seconds, and resolvers keep serving it until that timer runs out. If a resolver fetched the old record just before you changed it, it could keep serving the old address for nearly the full hour.

I can't confirm this from here. The workspace is empty, so I couldn't see your zone file or the record's TTL.

To check, look at the TTL your resolver is still counting down:

```
dig +noall +answer yourdomain.example A
```

The second column is the remaining TTL in seconds. If it started near 3600 and fell to zero, the cache explains the delay.

Compare that with the authoritative server, which has the new answer straight away:

```
dig +noall +answer yourdomain.example A @ns1.yourprovider.example
```

If the authoritative server shows the new address while your resolver still shows the old one, the delay was caching, not the change itself.

Other things that can add delay:

- **Your OS or browser cache** may hold the old answer for a while. Flushing the OS cache or restarting the browser helps.
- **A name that didn't exist before** can be cached as missing for the zone's negative-caching time, so creating a new record can also be slow to appear.
- **Some resolvers ignore short TTLs** and hold answers longer than the record says.

For future changes, lower the TTL to 300 seconds or less a day or so before the change, then raise it again afterwards. That caps the delay at minutes rather than an hour.

> tool call `bash`: `{"command":"ls -la; echo ---; rg -il \"ttl|dns|zone|\\.tf|record\" . 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · floor · rep 2

The workspace is empty, so I can't see your zone or the record you changed. But an hour is the usual signature of a cache, and the likely cause is a TTL of 3600 seconds on the old record.

Resolvers and your OS keep an answer until its TTL runs out. If the old record had a one-hour TTL, some resolvers cached it just before your change and kept serving it for up to an hour. Lowering the TTL only helps after the old value has expired, so it's too late to speed up this change.

Three other things can produce the same delay:

- **Negative caching.** If the name didn't exist before, resolvers may have cached that "no such name" answer for the zone's SOA minimum, often an hour.
- **Resolvers that ignore short TTLs.** Some ISP resolvers hold records longer than the TTL says.
- **Local caches.** Your browser, OS or router may keep the old address a little longer on top of the resolver's cache.

To confirm, run `dig +noall +answer yourname A` and look at the TTL column. If it counts down from about 3600, that was the delay. If you tell me the record name, I can check it.

> tool call `bash`: `{"command":"cd <scratch>/workspace && ls -la && find . -maxdepth 3 -type f \\( -iname '*zone*' -o -iname '*dns*' -o -iname '*.tf' -o -iname '*.bind' -o -iname '*hosts*' -o -iname '*.log' \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · floor · rep 3

Most likely, the old record was cached with a one-hour TTL. Resolvers keep an answer until its TTL runs out, and nobody can flush the caches around the world. Any resolver that cached the old value just before your change kept serving it for up to an hour. Resolvers that cached it earlier may have expired sooner, so you saw the change at different times depending on which resolver a client used.

To confirm, check the TTL on the record you changed:

```
dig +noall +answer yourname.example A
```

The second column is the remaining TTL in seconds. Compare that with what the authoritative server says:

```
dig @<your-authoritative-ns> +noall +answer yourname.example A
```

If the authoritative server shows the new value and your resolver still shows the old one, the delay came from caching.

For future changes, lower the TTL (for example to 300 seconds) at least as long as the old TTL before the change. Then make the change, and raise the TTL again afterward.

If you tell me the record type, the name, and the old TTL, I can say more precisely what you saw.

### sonnet-5-5 · floor · rep 1

Most likely caching: the old answer was still held somewhere, and it stayed there until its TTL ran out.

- **The old record's TTL was probably 3600 seconds (one hour).** That is a very common default. Any resolver that looked up your name just before you changed it kept serving the old value for up to an hour. Lowering the TTL after the change doesn't help, because caches already hold the old value with the old TTL.
- **Several caches stack up.** Your ISP's resolver, your router, your operating system and your browser each keep their own copy, and each expires on its own schedule.
- **Negative caching.** If the name didn't exist before (for example a new subdomain you had already looked up), the "doesn't exist" answer is cached too, for the zone's SOA minimum value.
- **Slow secondaries.** If your DNS provider syncs between its own servers, some may serve the old zone for a while.

To check which it is:

```
dig yourdomain.com @ns1.your-provider.com   # authoritative answer: is the change live there?
dig yourdomain.com @8.8.8.8                 # a public resolver: shows remaining TTL counting down
```

If the authoritative server already had the new value, it was caching. If not, it was your provider's propagation.

Next time, lower the TTL to 60–300 seconds at least one old-TTL period before the change, make the change, then raise it again afterwards.

### sonnet-5-5 · floor · rep 2

Most likely caching. Resolvers keep an answer until its TTL runs out, so anyone who looked up the name before your change kept getting the old record until their copy expired. An hour is a common TTL (3600 seconds). Many providers default to it.

Other causes:

- **Several cache layers.** Your OS, your browser, your router and your ISP's resolver each hold their own copy, and each has its own expiry time.
- **Lowering the TTL doesn't help immediately.** If you lowered it just before the change, resolvers that had already cached the old record still hold it for the old TTL.
- **Negative caching.** If the name didn't exist when someone first looked it up, the "not found" answer is cached too. Its lifetime is the SOA record's minimum value.
- **NS changes are slower.** Changing name servers goes through the TLD's records, which often have TTLs of 24 to 48 hours.
- **Resolvers that ignore short TTLs.** Some enforce a minimum.

To check what's happening, query the authoritative server directly. For example, `dig example.com @ns1.yourhost.com` will show the new value. Then run `dig example.com` and read the TTL column. It counts down to when your resolver will refresh.

Next time, lower the TTL to about 300 seconds a day or more before the change, make the change, then raise it again.

### sonnet-5-5 · floor · rep 3

Most likely caching: the old record's TTL was still running somewhere between you and the authoritative server.

- **Old TTL.** If the record had a TTL of 3600 seconds, any resolver that cached it just before your change keeps serving the old answer for up to an hour. The TTL that counts is the one on the old record, not the one you set on the new record.
- **Several caches.** Your router, your operating system, your browser and your provider's resolver each hold their own copy, and each expires on its own schedule.
- **Negative caching.** If the name didn't exist before, resolvers may have cached the "not found" answer. The SOA record's minimum value sets how long that lasts.
- **NS changes are slower.** If you changed name servers rather than a record, the TLD's referral has its own TTL, often 24 to 48 hours.
- **Resolvers that ignore TTLs.** Some enforce a minimum, so a short TTL doesn't always get honored.

To check, query the authoritative server directly with `dig @ns1.yourdomain.com yourdomain.com`. If it already returns the new value, the change is live and only caches are stale. Running `dig yourdomain.com` shows the remaining TTL counting down on the resolver you use.

Next time, lower the TTL to 60 or 300 seconds at least one old-TTL period before the change, then raise it again afterwards.

### opus-5-5 · floor · rep 1

Almost certainly caching. Before your change, resolvers had already looked up the old record and were allowed to keep it for its TTL. Until that ran out they kept handing out the old answer without asking your name servers again.

- **The record's TTL was probably about an hour.** 3600 seconds is a common default at many DNS hosts. A resolver that cached the old record just before your change would keep serving it for close to that long.
- **Changing the TTL with the change doesn't help.** The old TTL is the one already in caches. To make a change show up quickly, lower the TTL to something like 300 a day ahead, make the change, then raise it again.
- **Other caches add time.** Your operating system and browser keep their own short caches. A few resolvers also hold records longer than the TTL says.
- **New names can be held up by an earlier miss.** If you looked up a name before it existed, the "doesn't exist" answer is cached too, for the time set in the zone's SOA record. That is often an hour as well.

To check, run `dig yourname.example` and look at the number before the record type. That's how many seconds of cache time are left. To see what your name servers are actually serving, ask them directly with `dig @ns1.yourprovider.example yourname.example`.

### opus-5-5 · floor · rep 2

*(nothing)*

### opus-5-5 · floor · rep 3

Almost always it's caching. The old answer stayed valid until its time to live (TTL) ran out.

- **The old record's TTL.** If the record had a TTL of 3600 seconds, any resolver that looked it up just before your change could keep the old answer for up to an hour. Lowering the TTL only helps if you do it at least one old-TTL ahead of the change.
- **Several caches in a row.** Your browser, your operating system and your provider's resolver each keep their own copy. Each one holds it until its own copy expires.
- **Negative caching.** If you looked up a name before it existed, the "doesn't exist" answer is cached too. How long is set by the zone's SOA record, often 1 hour.
- **Resolvers that stretch TTLs.** Some providers keep records longer than the TTL says.
- **Provider delay.** Some DNS hosts take a few minutes to push a change to all their authoritative servers.

Next time, you can check this before the change:

```
dig +noall +answer example.com          # the number before IN is the remaining TTL
dig @ns1.yourdnshost.com example.com    # ask the authoritative server directly
```

If the authoritative server already shows the new value and your resolver doesn't, it's just caching. Flushing your local cache (or querying `@1.1.1.1`) shows the new value sooner. Other people still get the old answer until their resolvers' copies expire.

### haiku-5-5 · face@face2 · rep 1

The most likely cause is the TTL on the old record. Each resolver caches an answer for as long as its TTL says, so if the old record had a TTL of 3600 seconds, resolvers that cached it just before your change will keep serving the old address for up to an hour. Your change was live on the authoritative servers from the start; the caches were the delay.

To confirm, check the TTL and the authoritative answer. Replace `example.com` with your domain:

```
dig example.com A +noall +answer          # TTL shows how many seconds remain in the cache
dig @ns1.example.com example.com A        # the authoritative server's current answer
```

If the authoritative server already shows the new value, the hour is cache. To speed up the next change, lower the TTL to 300 seconds or less at least one old-TTL period before you make it, then switch the record.

### haiku-5-5 · face@face2 · rep 2

Most likely the old record was cached with a one-hour TTL, so some resolvers kept serving the old address until it expired.

Every answer carries a TTL, and each resolver keeps it until that countdown ends. Resolvers cache independently and refresh at different moments, so some users saw the new address sooner than others. Your own machine and browser add another layer of caching.

To check:

- **Look at the TTL.** Run `dig yourdomain.com` and read the number in the ANSWER section. If it's 3600, the old record could have been cached for up to an hour.
- **Check the authoritative servers.** Run `dig @<your-nameserver> yourdomain.com`. If they already return the new address, the delay was in caching, not in your DNS provider.
- **Flush your local cache.** On macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`. On Windows: `ipconfig /flushdns`.

For next time, lower the TTL to 300 seconds or less at least one old-TTL period before the change, then raise it again once the change has settled.

### haiku-5-5 · face@face2 · rep 3

Most likely the old record was cached with a one-hour TTL. Resolvers and your operating system keep an answer until its TTL runs out, and they don't know you changed it. Until then, some clients keep getting the old address even though the authoritative servers already have the new one.

To check, look at the TTL on the old record and compare the answers from the authoritative servers and a public resolver:

```
dig +noall +answer example.com A            # TTL shown in seconds, counting down
dig @ns1.yourdns.net example.com A          # the authoritative answer, should be new
dig @8.8.8.8 example.com A                  # a public resolver, may still show the old one
```

If the authoritative server is right and the resolver is wrong, the delay was caching, and nothing was broken.

For next time, lower the TTL (to 300 seconds or less) a day or so before a planned change, make the change, and then raise the TTL again once it has settled. If the record didn't exist before, a negative cache entry can add delay too, governed by the zone's SOA minimum.

### sonnet-5-5 · face@face2 · rep 1

Most likely caching: some resolver kept the old answer until its TTL ran out. If your record had a TTL of 3600 seconds, any resolver that cached it just before your change could keep serving the old address for up to an hour.

**Where the delay comes from**
- **Old TTL.** The TTL that counts is the one on the record *before* you changed it. Lowering it at the same time as the change doesn't help, because caches already hold the old value with the old countdown.
- **Several caches.** Your recursive resolver, your operating system and your browser each keep their own copy, and each has its own expiry.
- **Negative caching.** If the name didn't exist, or the lookup failed, before your change, that "no such name" answer is also cached. Its lifetime comes from the SOA record's minimum value.
- **NS changes.** Changing name servers at the registrar is slower. The parent zone's NS records usually have TTLs of 1 to 48 hours, and that is what resolvers cache.

**Next time**
1. Lower the TTL to 60 to 300 seconds a day or more ahead, which is at least the old TTL.
2. Make the change.
3. Raise the TTL again once it has settled.

**To check which cache is stale**
- Run `dig yourdomain.com @ns1.yourprovider.com` and compare it with `dig yourdomain.com @8.8.8.8`. If the authoritative server is right and the public resolver is wrong, it's a cache.
- The TTL value in the answer counts down, so you can see how long is left.

What type of record did you change, and what was its TTL? With that I can say exactly where the hour came from.

### sonnet-5-5 · face@face2 · rep 2

Most likely, a cache kept serving the old answer until its TTL ran out. The TTL on the old record was probably 3600 seconds (one hour). Every resolver that looked the name up just before your change held the old answer for up to that long, and none of them re-asked in the meantime.

Common reasons it came out as an hour:

- **The old TTL was 1 hour.** The TTL that counts is the one on the record *before* your change. Lowering it afterwards doesn't help the answers already cached.
- **Negative caching.** If the name didn't exist when someone first queried it, the "no such name" answer is cached too. Its lifetime comes from the SOA record.
- **Several cache layers.** Your OS, your browser and your router can each hold their own copy.
- **Resolvers that ignore short TTLs.** Some enforce a minimum.
- **NS changes are slower.** If you changed name servers instead of a record, the TLD's delegation TTL applies. That is often 24–48 hours.

To check, run `dig yourname.com +noall +answer`. The number in the second column is the seconds left in that resolver's cache. To skip caches, run `dig @ns1.yourprovider.com yourname.com` against the authoritative server. If that shows the new value, the change is live and you are only waiting on caches.

Next time, lower the TTL to about 300 seconds a day or more ahead of the change. Make the change, then raise the TTL again.

### sonnet-5-5 · face@face2 · rep 3

Most likely caching: the old answer stayed in a cache until its TTL ran out.

- **TTL.** If the record had a TTL of 3600 seconds, any resolver that looked it up just before your change could keep serving the old address for up to an hour. Many zones default to 1 hour, and some to 24 hours.
- **Where the old answer lives.** It can sit in your ISP's or public resolver's cache, in your OS, and in your browser. Each one counts down on its own.
- **Lowering the TTL doesn't help right away.** If you lowered it at the same time as the change, resolvers still held the old record with the old TTL. You have to lower it at least one old TTL *before* the change.
- **Negative caching.** If the name didn't exist when someone first queried it, the "no such name" answer is cached too. Its length comes from the SOA record's minimum field.
- **Less common causes.** Secondary name servers can lag behind the primary if zone transfers are slow. Some resolvers also ignore short TTLs and impose their own minimum.

To confirm, ask the authoritative server directly and compare it with a public resolver:

```
dig +norecurse example.com @ns1.yourprovider.com
dig example.com @1.1.1.1
```

If the authoritative server already shows the new value and the resolver shows the old one, the cause is caching. The remaining TTL in the resolver's answer tells you how long until it clears.

For next time, lower the TTL to about 300 seconds a day ahead of the change. Make the change, then raise the TTL again afterwards.

### opus-5-5 · face@face2 · rep 1

Almost certainly caching. The old answer was still being served from caches that hadn't expired yet.

- **The old record's TTL.** Before your change, the record probably had a TTL of 3600 seconds, a common default, which is one hour. Any resolver that had looked the name up in the hour before your change kept the old answer until its hour ran out. Lowering the TTL at the same time as the change doesn't help, because those caches are working from the old TTL.
- **Negative caching.** If the name didn't exist before and someone looked it up, resolvers remember that "no such name" answer. They keep it for as long as the zone's SOA record says, often an hour.
- **Layers of cache.** Your browser, your operating system and your provider's resolver each keep their own copy. Some providers' resolvers also hold answers longer than the TTL allows.

**Next time:** about a day before the change, lower the record's TTL to something like 300 seconds (five minutes). Wait for the old TTL to run out, then make the change. Raise the TTL again afterwards. To see what the authoritative server is answering right now, without any cache in the way, run `dig @ns1.yourdns.example name`.

### opus-5-5 · face@face2 · rep 2

Most likely the **TTL** (time to live) on the old record. Every resolver that had already looked up your name kept the old answer until its TTL ran out. TTLs of 3600 seconds (exactly one hour) are a very common default, so an hour-long delay fits that.

Other things that can add to it:

- **Several cache layers.** Your browser, your operating system and your provider's resolver each keep their own copy. Each layer can hold the old answer until its own copy expires.
- **Negative caching.** If you looked up the name *before* the record existed, resolvers cached the "doesn't exist" answer. That answer lasts as long as the zone's SOA minimum or negative TTL, which is often an hour.
- **Resolvers that stretch TTLs.** Some providers keep answers longer than the TTL says.
- **NS changes.** If you moved to new name servers, the TLD's delegation records usually last 1–2 days, not one hour.

**Next time:** a day or so before the change, lower the record's TTL to something like 300 seconds. Wait for the old TTL to expire, then make the change, and raise the TTL again afterwards. To see what a resolver is holding, run `dig yourname.example`. The number in the answer is how many seconds that resolver will keep its copy.

### opus-5-5 · face@face2 · rep 3

Almost certainly **caching**. The change was live on your authoritative servers right away, but resolvers that had already looked up the name kept the old answer until its TTL ran out.

- **The old record's TTL counts, not the new one's.** If the record had a TTL of 3600 seconds (one hour, a common default), any resolver that cached it just before your change could serve the old value for up to an hour.
- **Several caches stack up.** Your provider's resolver, your operating system and your browser each keep their own copy. Some resolvers also hold answers longer than the TTL allows.
- **Negative caching.** If you added a new name and someone looked it up before it existed, the "doesn't exist" answer was cached too. That cache lasts as long as the zone's SOA minimum, which is often an hour.

**Next time:** lower the TTL to about 300 seconds a day or so before the change, make the change, then raise the TTL again. To check what the authoritative server says, without any cache, run `dig yourname.com @ns1.yourdns.com`. To clear your own machine's cache, flush it (`sudo dscacheutil -flushcache` on macOS).

### sonnet-5-5 · telegraphic@face2 · rep 1

Almost certainly caching. Every resolver that looked up your record before the change keeps the old answer until its TTL runs out. If the record's TTL was 3600 seconds (a common default), anyone who queried just before your edit could keep seeing the old value for up to an hour.

Things that stretch it further:

- **The TTL is applied when the answer is cached, not when you edit.** Lowering the TTL after the change does nothing for answers already cached. Lower it a day or more *before* a planned change.
- **Negative caching.** If the name didn't exist when someone queried it, that "not found" is cached too, for the zone's SOA minimum value.
- **NS and glue changes.** If you changed name servers, the parent (TLD) zone's TTL applies. That is often 24–48 hours.
- **Resolvers that ignore short TTLs**, and local caches in the OS or browser.

To check whether it's caching or a bad edit, query the authoritative server directly:

```
dig yourdomain.com @ns1.your-provider.com
dig yourdomain.com @1.1.1.1
```

If the first shows the new value and the second the old one, it's just waiting on the TTL. The remaining TTL appears in the second column of the output, counting down.

### sonnet-5-5 · telegraphic@face2 · rep 2

Most likely caching: the old answer was still stored somewhere and stayed valid until its TTL ran out.

- **The old record's TTL.** Resolvers cache an answer for the TTL it carried when they fetched it. If the old record had a TTL of 3600 seconds, any resolver that looked it up just before your change could keep serving the old value for up to an hour. Lowering the TTL only helps if you did it at least one old-TTL period before the change, because the old, longer TTL is already in the caches.
- **Negative caching.** If the name didn't exist when someone last queried it, the "doesn't exist" answer is cached too. Its length comes from the SOA record's minimum/negative TTL field.
- **Layers of cache.** Your OS, browser, router and ISP resolver each hold their own copy, so you can see the change at different times from different places.
- **Resolvers that ignore TTLs.** Some enforce a minimum TTL, which stretches the delay further.
- **Secondary name servers.** If the zone is served by several authoritative servers, a slow zone transfer can leave some of them answering with the old data.

To check, query the authoritative server directly with `dig @ns1.yourdns.com yourdomain.com`. If it already shows the new value, the delay is only caching. Compare the TTL in the answer from your normal resolver, since it counts down and shows how long the cached copy has left.

### sonnet-5-5 · telegraphic@face2 · rep 3

Most likely the old answer was still cached. Every resolver that looked up your record before the change keeps it until its TTL runs out. If the TTL was 3600 seconds (a common default), some resolvers kept serving the old value for up to an hour after you edited it.

What adds to the delay:

- **Many caches, each with its own clock.** Your ISP's resolver, your router, your OS and your browser each cached it at a different moment, so each expires at a different time.
- **Negative caching.** If the name didn't exist before, the "no such name" answer is cached too. Its lifetime comes from the zone's SOA record.
- **Changed NS records.** If you switched name servers, the old delegation is cached at the TLD level. That is often 24 to 48 hours, not 1.
- **Resolvers that ignore short TTLs.** Some enforce a minimum.

To check, run `dig yourdomain.com @ns1.yourprovider.com` to query the authoritative server directly. If it already shows the new value, the change is live and only caches are lagging. Run `dig yourdomain.com` to see the remaining TTL counting down.

Next time, lower the TTL to about 300 seconds a day or more before the change. Raise it again afterward.

### haiku-5-5 · noisy@face2 · rep 1

Most likely your old record had a TTL of one hour (3600 seconds). Resolvers cache each answer for that long, and they don't check for changes before it expires. If a resolver cached the old address just before you made the change, it kept serving that address for up to the full hour. Different resolvers cached at different times, so the switch-over looked gradual.

To check, look at the TTL on the old record before you change it. Then run `dig +noall +answer yourdomain A` and watch the TTL count down. Querying the authoritative server directly, with `dig @ns1.yourdomain.com yourdomain A`, shows the new value immediately, which confirms the change is live at the source.

For next time, lower the TTL (to 300 seconds, for example) a day or so before a planned change, then raise it again afterwards. Browser and OS caches can add a little more delay, so flushing them helps when you need the change sooner.

### haiku-5-5 · noisy@face2 · rep 2

Most likely the old record was cached with a one-hour TTL, so resolvers kept serving the old address until it expired. The TTL is set on the record that was there when the resolver last fetched it, so the old value's TTL governs how long it lingers, not the new one. A TTL of 3600 seconds gives you roughly an hour.

To check, ask the authoritative servers directly, which bypasses the caches:

```
dig +short NS yourdomain.com
dig +short A www.yourdomain.com @ns1.yourdomain.com
```

If the authoritative answer is already the new value, the delay was caching. Your own machine can also hold on to the old answer. On macOS you can flush it with `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.

For next time, lower the TTL on the record to around 300 seconds at least a day before a planned change, make the change, then raise the TTL again once it has settled. Some resolvers also ignore short TTLs, so this narrows the window but doesn't guarantee it.

### haiku-5-5 · noisy@face2 · rep 3

Most likely the old record had a TTL of about an hour (3600 seconds). Resolvers cache each answer until its TTL expires, so they kept serving the old address until then. Your operating system and router can add their own caches on top of that.

To check next time:

```sh
# Current TTL and answer as the authoritative server sees them
dig +nocmd yourdomain.example A +noall +answer
dig @ns1.yourdomain.example yourdomain.example A +noall +answer

# What a public resolver is still serving from its cache
dig @8.8.8.8 yourdomain.example A +noall +answer
```

If the TTL shows 3600, lower it to 300 or less a day or so before a planned change, make the change, then raise it again. To clear your own machine's cache on macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.

### sonnet-5-5 · noisy@face2 · rep 1

Most likely caching: the old answer was still stored somewhere and stayed valid until its TTL ran out. If the record's TTL was 3600 seconds, an hour is exactly what you'd expect.

Where the old answer can sit:

- **Recursive resolver.** It cached the old record and won't ask again until the TTL expires. The TTL that counts is the one in force *before* your change. Lowering it afterwards doesn't help the copies already cached.
- **Your OS and browser.** They keep their own short caches on top of that.
- **Negative caching.** If the name didn't exist when someone first looked it up, the "doesn't exist" answer is cached too. Its lifetime comes from the zone's SOA record.
- **NS changes.** If you changed name servers rather than a record, the TLD's delegation record has its own TTL, often 24 to 48 hours.

To check, run `dig yourdomain.com @ns1.yourprovider.com`. This asks the authoritative server directly, so it shows the new value. Then run `dig yourdomain.com @8.8.8.8` and look at the TTL counting down in the answer. That tells you how long the resolver will keep serving the old one.

Next time, lower the TTL to about 300 seconds a day or so before the change, make the change, then raise it again.

### sonnet-5-5 · noisy@face2 · rep 2

Most likely a cache somewhere kept serving the old answer until its TTL ran out. If the record's TTL was 3600 seconds (one hour, a common default), any resolver that looked it up just before your change could legitimately keep the old value for up to an hour.

Other causes, roughly in order of likelihood:

- **Old TTL.** The TTL that counts is the one on the *old* record, not the one you set in the change. Lowering it only helps after the old TTL has expired.
- **Negative caching.** If the name didn't exist when someone queried it, the "doesn't exist" answer is cached too. Its lifetime comes from the SOA record's minimum/negative TTL.
- **Several cache layers.** Your OS, browser, router and ISP resolver each keep their own copy, and each started its timer at a different moment.
- **Slow secondaries.** If the zone is served by several name servers, some may sync late.
- **Wrong place edited.** If the domain's NS records point to a different provider than the one you edited, the change won't appear until that's fixed.

To find out which it was, query the authoritative server directly, which bypasses caches:

```
dig +short example.com @ns1.your-provider.com
dig example.com            # shows the remaining TTL counting down
```

If the authoritative server already had the new value right away, the delay was caching. If it didn't, the problem is on the provider's side.

For the next change, lower the TTL to about 60 seconds a full old-TTL period beforehand, make the change, then raise it again.

### sonnet-5-5 · noisy@face2 · rep 3

Almost certainly caching: the old answer was still stored somewhere and wasn't allowed to expire yet.

- **TTL on the old record.** When a resolver fetched your record, it was told to keep it for the TTL. If that was 3600 seconds, any resolver that looked it up just before your change could keep serving the old value for up to an hour. Lowering the TTL after the change doesn't help, because the old copies were already cached with the old TTL.
- **Several cache layers.** Your OS, your browser, your router and your ISP's resolver each hold their own copy, and each expires on its own schedule.
- **Resolvers that stretch TTLs.** Some enforce a minimum, so a short TTL is not always honored.
- **Negative caching.** If the name didn't exist before, the "no such name" answer is cached too, for the zone's SOA minimum value.
- **NS changes are slower.** If you changed name servers rather than a record, the TLD's delegation records usually have TTLs of 1 to 48 hours.

**Check which case you hit:**
- `dig yourdomain.com @ns1.yourprovider.com` shows what the authoritative server returns. If it is already correct, the delay was only caching.
- `dig yourdomain.com @8.8.8.8` shows the remaining TTL counting down in a public resolver.

**Next time:** lower the TTL to 60 to 300 seconds at least one old-TTL period before the change, make the change, then raise it again.

### haiku-5-5 · noisy-filtered@face2 · rep 1

Most likely the old record was cached with a one-hour TTL, so resolvers kept serving the old answer until it expired.

Each answer carries a TTL, and every resolver between you and the authoritative server holds onto it for that long. If the old record had a TTL of 3600 seconds, a resolver that cached it just before your change will keep returning the old address for up to an hour. Different resolvers cached at different times, so people saw the change at different moments.

Other things can add delay:

- **Your own machine or browser** keeps its own DNS cache. Flushing it helps.
- **Your ISP's resolver** may enforce a minimum TTL, so it holds records longer than the TTL you set.
- **Negative caching**, if the name didn't resolve before, can keep the "not found" answer for the zone's SOA negative TTL.

To check what is cached, ask for the record again. The second column of the answer is the seconds left on the TTL:

```
dig example.com A +noall +answer
```

To compare with the source, query the authoritative server directly:

```
dig @ns1.yourdns.net example.com A
```

If the authoritative server shows the new address and your resolver shows the old one, wait out the remaining TTL or flush your cache. macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`. Windows: `ipconfig /flushdns`.

Before the next change, lower the TTL to 300 seconds or less a day or two ahead. Then the old answer expires quickly once you switch.

### haiku-5-5 · noisy-filtered@face2 · rep 2

Most likely the old record was still cached. Every resolver along the way keeps an answer until its TTL runs out, and a cache filled just before your change keeps serving the old address for the full TTL. If the old record had a TTL of 3600 seconds, an hour is the expected worst case.

To check, run `dig +noall +answer yourdomain.com`. The second column is the remaining TTL in seconds, and it shows how long the old answer can still be served.

For next time, lower the TTL (for example to 300 seconds) a day or so before the change, then raise it again afterwards. If the name didn't exist before, the empty answer may be cached for the zone's negative-caching time instead, which comes from the SOA record's minimum field.

### haiku-5-5 · noisy-filtered@face2 · rep 3

Almost certainly because of the TTL. Every resolver that cached the old record keeps serving it until that record's time to live runs out. If the old TTL was 3600 seconds, the change could take up to an hour to reach a resolver that cached the record just before you edited it.

To check, query the record and look at the TTL it returns:

```
dig +noall +answer yourdomain.com A
```

The number in the second column is the seconds left before that cache entry expires. Your operating system, browser, and ISP resolver can each hold their own copy, so the change shows up for different people at different times.

To make future changes faster:

1. **Lower the TTL in advance.** Drop it to 300 seconds or less a day or more before the change, wait for the old TTL to expire, then make the change.
2. **Restore the TTL afterwards** once the new record has settled.
3. **Flush your local cache** if you need the change on your own machine sooner. On macOS, `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` does it.

Some resolvers also ignore short TTLs, so a very low TTL is a help, not a guarantee.

### sonnet-5-5 · noisy-filtered@face2 · rep 1

Most likely caching: the old answer was still stored somewhere and wasn't allowed to expire yet.

- **TTL on the old record.** When a resolver fetched your record, it was told to keep it for the record's TTL. If that was 3600 seconds, resolvers that cached it just before your change kept serving the old value for up to an hour. Changing the record doesn't recall copies already handed out.
- **Several cache layers.** Your OS, browser, router and your provider's resolver each hold their own copy, each with its own expiry time. You see the change only after the last one you hit has expired.
- **Negative caching.** If you created a new name and someone looked it up before it existed, the "doesn't exist" answer is cached too. Its lifetime comes from the SOA record's minimum/negative TTL.
- **Resolvers that stretch TTLs.** Some enforce a minimum TTL or ignore short ones.
- **NS changes are slower.** Changing name servers at the registrar relies on the TLD's delegation TTL, often 24 to 48 hours.

To check, run `dig yourdomain.com` and look at the number in the answer section. It's the seconds remaining in that resolver's cache. Run `dig @ns1.yourprovider.com yourdomain.com` to ask the authoritative server directly. If it already shows the new value, the change is live and only caches are lagging.

Next time, lower the TTL to 300 seconds at least one old-TTL period before the change, make the change, then raise it again.

### sonnet-5-5 · noisy-filtered@face2 · rep 2

Almost certainly caching: some resolver still held the old answer until its TTL ran out.

- **TTL on the old record.** If the record had a TTL of 3600 seconds, any resolver that fetched it just before your change could keep serving the old value for up to an hour. Changing the TTL afterwards doesn't help, because the cached copies keep the old one.
- **Different resolvers expire at different times.** Your router, your ISP and public resolvers each cached at different moments, so you may see the change while someone else doesn't.
- **Negative caching.** If the name didn't exist before, the "not found" answer is also cached, for the zone's SOA minimum value.
- **Local caches.** Your OS and browser add their own short caches on top.
- **NS changes are slower.** Changing the delegation at the registrar depends on the TLD's NS TTL, often 24 to 48 hours.

To check, run `dig yourdomain.com @ns1.yourprovider.com`. That asks the authoritative server directly, so it shows whether the change is live at the source. Then run `dig yourdomain.com` and read the TTL column, which counts down the time left in your resolver's cache.

Next time, lower the TTL to about 300 seconds a day or more before the change, then raise it again afterwards.

### sonnet-5-5 · noisy-filtered@face2 · rep 3

Most likely the old record was cached, and the cache kept serving it until its TTL ran out. If the old record had a TTL of 3600 seconds, resolvers that looked it up just before your change could keep returning the old answer for up to an hour.

Some things that stretch the wait:

- **Lowering the TTL doesn't help right away.** Resolvers that already cached the record keep it for the old TTL. You have to lower the TTL ahead of time, at least one old-TTL period before the change.
- **Negative caching.** If the name didn't exist when someone first looked it up, the "no such name" answer is cached too. Its lifetime comes from the SOA record's minimum field.
- **Your own machine and browser.** The OS and the browser each keep their own cache on top of the resolver's.
- **Resolvers that ignore short TTLs.** Some enforce a minimum.
- **Secondary name servers.** If you changed the zone at a primary, secondaries might not have fetched it yet.

To see which case you're in, query the authoritative server directly: `dig @ns1.yourdomain.com yourdomain.com`. If it returns the new value, the zone is fine and you're waiting on caches. Then run `dig yourdomain.com` and read the TTL column. It counts down, and it tells you how long that resolver will keep the old answer.

### haiku-5-5 · digest@face2 · rep 1

Most likely the old record had a one-hour TTL (3600 seconds), so resolvers kept serving the old answer until it expired. Your change was live on the authoritative servers almost at once. Each cache along the way just kept the previous answer until its timer ran out.

To check, look at the TTL on the record that was changed:

```
dig example.com A +noall +answer
```

The second column is the remaining TTL in seconds, counting down. If it was 3600 when you made the change, an hour is what you would expect.

For next time:

- **Lower the TTL a day or more before a planned change**, then raise it again afterwards. Caches that already hold the old record will still expire on the old schedule, so the lowering has to come first.
- **If the name did not exist before**, the negative-caching time (the SOA minimum) can delay it in the same way.
- **Some resolvers ignore short TTLs** and hold records longer, so a few users may still see the old answer after the TTL has passed.

### haiku-5-5 · digest@face2 · rep 2

The likely cause is the TTL on the old record. Resolvers keep an answer until its time to live runs out, and an hour is a common TTL. Your new record was probably live on the authoritative servers within minutes, but resolvers that had already cached the old answer kept serving it until the hour ran out.

To check, ask a resolver how much longer it will keep the old answer:

```
dig yourdomain.com A +noall +answer
```

The second number on each line is the seconds left in the cache. Then ask the authoritative server for the current answer:

```
dig @ns1.yourprovider.com yourdomain.com A +noall +answer
```

If the authoritative answer is correct and the resolver's countdown is still running, you're just waiting out the cache. On your Mac you can clear your own machine's cache with `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`. This doesn't help other people's resolvers, though, and browsers keep their own cache too.

For next time, lower the TTL to 300 seconds or so a day or two before the change, make the change, then raise the TTL again. Changes to the domain's name servers at the registrar follow a different and slower path, governed by the parent zone's TTLs, which can take up to a day or two.

### haiku-5-5 · digest@face2 · rep 3

Most likely the old record had a one-hour TTL (3600 seconds), and caches kept serving the old answer until it expired. Every resolver between you and the authoritative servers keeps an answer for that long, so a change can take up to one full TTL to reach everyone.

To check, look at the TTL on the old record:

```
dig +noall +answer yourdomain.com A
```

The number in the second column is the TTL in seconds. The authoritative servers may already have the new value, while your resolver still returns the cached old one. To compare, ask an authoritative server directly:

```
dig @ns1.yourdomain.com yourdomain.com A
```

To avoid this next time, lower the TTL to 300 seconds or less a day or two before the change, make the change, then raise the TTL again once it has settled.

### sonnet-5-5 · digest@face2 · rep 1

Almost certainly caching: the old record stayed cached until its TTL ran out. If the old record had a TTL of 3600 seconds, any resolver that fetched it just before your change could legitimately keep serving it for up to an hour.

Likely causes, most common first:

1. **The old TTL was high.** The TTL on the old record is what counts, not the TTL you set on the new one. Lowering it only helps after the old, longer TTL has expired everywhere.
2. **Negative caching.** If something looked up the name before it existed, the "no such name" answer is cached too. Its lifetime comes from the SOA record's minimum/negative TTL.
3. **Several cache layers.** Your router, your operating system and your browser may each hold their own copy. Your ISP's resolver may also ignore short TTLs and apply its own minimum.
4. **Nameserver delegation changes.** If you changed the NS records at the registrar, the TLD's NS records are typically cached for 24 to 48 hours. That would take much longer than an hour.

To check, query the authoritative server directly, then a public resolver:

```
dig example.com A +norecurse @ns1.yourprovider.com
dig example.com A @1.1.1.1
```

If the authoritative server shows the new value but the resolver doesn't, it's cache. The TTL column in the resolver's answer counts down, so it tells you how long is left.

For next time, lower the TTL to about 300 seconds a full old-TTL period before the change. Make the change, then raise the TTL again afterwards.

### sonnet-5-5 · digest@face2 · rep 2

Most likely the old answer was still cached, and it stayed cached until its TTL ran out. The TTL is the number of seconds a resolver may reuse an answer. If the old record had a TTL of 3600, any resolver that looked it up just before your change could keep serving the old value for up to an hour.

**Where the old value can hide**
- **Recursive resolvers.** Your ISP's or a public resolver such as 8.8.8.8 keeps the record until its TTL expires. Each resolver's timer started when it last fetched the record, so different people see the change at different times.
- **Your operating system and browser.** Both keep their own short caches.
- **Negative caching.** If the name didn't exist when someone looked it up, the "no such name" answer is cached too. Its duration comes from the SOA record.
- **NS changes.** If you changed name servers rather than a record, the delegation at the TLD is cached for much longer, often 24 to 48 hours.

**Check what's happening**
- `dig yourdomain.com @ns1.yourhost.com` queries the authoritative server directly. If it shows the new value, your change is live and only caches are stale.
- `dig yourdomain.com @8.8.8.8` shows what a public resolver has. The number in the answer is the seconds left on its cached copy.

**Next time:** lower the TTL to 300 seconds at least one old-TTL period before the change, make the change, then raise the TTL again afterwards.

### sonnet-5-5 · digest@face2 · rep 3

Almost certainly caching: the old answer was still stored somewhere, and it stayed valid until its TTL ran out.

**Likely causes**

- **The old record's TTL.** Resolvers cache an answer for the TTL it had when they fetched it. If the old record had a TTL of 3600 seconds, anyone who looked it up just before your change could keep seeing the old value for up to an hour. Lowering the TTL only helps if you do it *before* the change, and then you have to wait out the old TTL.
- **Negative caching.** If the name didn't exist when someone queried it, the "no such name" answer is cached too. Its length comes from the SOA record's minimum/negative TTL, often an hour.
- **Layers of cache.** Your OS, your browser, your router and your ISP's resolver each hold their own copy, and each has its own expiry time.
- **Resolvers that stretch TTLs.** Some enforce a minimum TTL and ignore shorter ones.
- **Nameserver changes.** If you changed the NS records or the registrar's delegation, the TLD servers cache that referral. Those TTLs are often 24 to 48 hours, so an hour would be fast.

**How to check which one it is**

- `dig example.com @ns1.yourprovider.com` queries the authoritative server directly. If it shows the new value, your change is live and the delay is just caching.
- `dig example.com` shows the remaining TTL counting down. That tells you when your resolver will refresh.
- `dig example.com @1.1.1.1` and `@8.8.8.8` show whether the public resolvers have caught up.

**Next time:** lower the TTL to 300 seconds a day ahead, make the change, then raise it again afterwards.
