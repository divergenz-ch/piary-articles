# smile-short-fact

## The conversation

````markdown
What does HTTP status 418 mean?
````

## What was sent after the last message (signal)

```
[expressions: what the camera saw of the user's face since your last answer. These are movements, not feelings, and a movement can have a cause that is not on the screen.]
- while typing this message: lip corners raised, cheeks raised, 4 s
```

## What was sent after the last message (signal as emotion labels)

```
[emotions: what the camera's classifier read from the user's face since your last answer, with its confidence.]
- while typing this message: happiness (0.88), 4 s
```

## First run: Sonnet 5.5, lowest effort

### no signal, rep 1

> **418 I'm a teapot** is an HTTP status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol. That RFC was an April Fools' joke from 1998. The code means the server is a teapot, so it refuses to brew coffee.
> 
> It isn't used in real HTTP semantics. Some servers return it as an Easter egg. Others use it to turn away unwanted bots or requests.

### no signal, rep 2

> HTTP 418 means "I'm a teapot." RFC 2324 defined it in the 1998 April Fools' joke protocol, the Hyper Text Coffee Pot Control Protocol (HTCPCP). A teapot returns it when it's asked to brew coffee, because it can't.
> 
> It isn't a real error in everyday use. Some servers still return it on purpose, as an Easter egg. Others use it to turn away unwanted traffic such as bots.

### no signal, rep 3

> HTTP 418 means "I'm a teapot." It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, which was an April Fools' joke from 1998. A teapot returns it when it's asked to brew coffee, because it can't.
> 
> It isn't used in real HTTP semantics. Some servers still return it as an easter egg, or to turn away unwanted traffic such as bots.

### signal: nothing notable, rep 1

> HTTP 418 means "I'm a teapot." It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee answers with 418 because it can't.
> 
> Some servers still return it on purpose. Some use it as an Easter egg, and others use it to turn away unwanted bots or requests. It has no standard use in real applications.

### signal: nothing notable, rep 2

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't.
> 
> It isn't a real status code for normal use. Some servers still return it on purpose, as an Easter egg or to turn away unwanted requests. It was nearly removed from the standards in 2017, but developers campaigned to keep it, and it is now reserved.

### signal: nothing notable, rep 3

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot returns it when it's asked to brew coffee.
> 
> It isn't meant for real use. Some servers still return it on purpose, as an Easter egg or to turn away unwanted requests. RFC 9110 reserves the code, so it can't be reassigned.

### signal, rep 1

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot.
> 
> It isn't used for real errors. Some servers return it on purpose, either as an Easter egg or to turn away unwanted bots and scrapers. RFC 9110 reserves the code so it can't be reassigned.

### signal, rep 2

> **418 I'm a teapot** is an HTTP status code from an April Fools' joke RFC, RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998). It means the server is a teapot and refuses to brew coffee.
> 
> Some servers and APIs still return it as an Easter egg. Some also use it to turn away unwanted requests, such as bots. It isn't meant for real use. RFC 7168 later extended the joke to teapots that handle tea.

### signal, rep 3

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. The code means a teapot is refusing to brew coffee, because it is a teapot.
> 
> Some servers still return it on purpose as an Easter egg. Others use it to turn away unwanted requests, such as bots. RFC 9110 reserves the code so it can't be reassigned for other uses.

### signal as emotion labels, rep 1

> **418 I'm a teapot.** It comes from RFC 2324, the April Fools' joke "Hyper Text Coffee Pot Control Protocol" (1998). A teapot returns it when it is asked to brew coffee.
> 
> It isn't a real working status code. Some servers still use it as an Easter egg, or to deliberately refuse automated requests.

### signal as emotion labels, rep 2

> **418 I'm a teapot** is an HTTP status code from the April Fools' joke RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998). It means the server is a teapot, so it refuses to brew coffee. RFC 7168 later extended the joke to tea-brewing.
> 
> Some servers still return it on purpose. Examples are an easter egg, or a polite way to refuse automated requests. It is not a real status code for normal use. The code was kept reserved so that real software doesn't break by reusing it.

### signal as emotion labels, rep 3

> **418 I'm a teapot** is an HTTP status code from the April Fools' joke RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998). It means the server is a teapot and refuses to brew coffee.
> 
> It isn't used in real HTTP semantics, but some servers return it on purpose. Examples are an Easter egg, or a way to turn away unwanted bots or requests. It's also listed in RFC 9110 as reserved, so it won't be reassigned.

### signal + guidance, rep 1

> HTTP 418 means "I'm a teapot." It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee can reply with 418 to say it refuses, because it is a teapot.
> 
> It isn't meant for real use. Some servers still return it on purpose as an easter egg, or to turn away unwanted requests.

### signal + guidance, rep 2

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't.
> 
> It isn't a real error condition. Some servers still return it as an Easter egg. Others use it to deliberately turn away unwanted requests, such as bots.

### signal + guidance, rep 3

> **418 I'm a teapot.** It's a joke status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol, published as an April Fools' joke in 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't do it.
> 
> It isn't meant for real use. Some servers still return it as an Easter egg, or to turn away unwanted automated traffic. The code is reserved in the HTTP status registry so that nothing else takes it.

## Haiku 5.5, lowest effort

### no signal, rep 1

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot asked to brew coffee replies with this code.
> 
> It is not a real error for normal use. Some sites and tools return it anyway, sometimes as an easter egg or to block bots, and a few services have used it for requests they refuse.

### no signal, rep 2

> HTTP **418 "I'm a Teapot"** is a joke status code from **RFC 2324**, the April Fools' 1998 spec for the Hyper Text Coffee Pot Control Protocol. It means "the server refuses to brew coffee because it is a teapot."
> 
> It is not part of the standard HTTP status codes, and real teapots are not expected to implement it. Some servers and APIs send it anyway, often to reject requests they don't want to handle, such as automated traffic.

### no signal, rep 3

> HTTP status **418 "I'm a Teapot"** is a joke status code. It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' RFC from 1998. A server returns it to say it is a teapot and refuses to brew coffee.
> 
> It isn't a real error for normal use. The current HTTP standard (RFC 9110) lists 418 as unused. Some sites and tools still send it as an easter egg, and a few systems use it for requests they want to reject for unusual reasons.

### signal, rep 1

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A server returns it to refuse to brew coffee because it is a teapot.
> 
> It's not a real error for actual web traffic. Some APIs and servers, such as parts of Google's infrastructure, return it for requests they want to reject in a playful way, and it appears in some test suites and easter eggs.

### signal, rep 2

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a Hyper Text Coffee Pot Control Protocol. A teapot asked to brew coffee should reply with this code.
> 
> It isn't a real error condition. Some servers and APIs return it anyway, sometimes to reject automated or suspicious requests, and some clients treat it as a bad request.

### signal, rep 3

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a coffee-pot control protocol. A teapot asked to brew coffee replies with 418 instead.
> 
> It isn't part of the official HTTP standard, but some servers and frameworks use it anyway, for example to reject automated requests or as an easter egg.

### signal + guidance, rep 1

> HTTP 418 means **"I'm a Teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a Hyper Text Coffee Pot Control Protocol. A teapot asked to brew coffee responds with 418.
> 
> It is not part of the official HTTP standard in practice, though some servers and APIs return it anyway, sometimes to refuse requests they consider automated or suspicious.

### signal + guidance, rep 2

> HTTP 418 means **"I'm a Teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a coffee-pot control protocol. The server refuses to brew coffee because it is a teapot.
> 
> It is not part of real HTTP traffic. Some sites send it anyway as an easter egg, and some APIs use it to reject requests they don't want to serve, such as automated scraping.

### signal + guidance, rep 3

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a Hyper Text Coffee Pot Control Protocol. The server refuses to brew coffee because it is a teapot.
> 
> It is not part of real web traffic. Some servers and developers use it as an easter egg or for playful error pages, and a few APIs return it when a client sends a request they consider nonsensical. Clients should handle it as an ordinary 4xx client error.

## Haiku 5.5, high effort

### no signal, rep 1

> HTTP **418 "I'm a Teapot"** is a joke status code from RFC 2324, an April Fools' spec for the Hyper Text Coffee Pot Control Protocol. A server that received a request to brew coffee in a teapot was supposed to refuse with 418.
> 
> It isn't a real error for normal web use. IANA still lists it as unused, and RFC 7168 reserved it. Some sites return it anyway, often to reject automated clients, and some frameworks and developers use it as an easter egg.

### no signal, rep 2

> HTTP **418 "I'm a Teapot"** is a joke status code from **RFC 2324**, the Hyper Text Coffee Pot Control Protocol, an April Fools' RFC published in 1998. It means the server refuses to brew coffee because it is a teapot.
> 
> It isn't part of the official HTTP standard, but some servers and sites return it as an Easter egg. Some also use it to reject automated or bot traffic.

### no signal, rep 3

> HTTP **418 "I'm a Teapot"** is a joke status code from **RFC 2324**, the April Fools' 1998 spec for the Hyper Text Coffee Pot Control Protocol. A teapot asked to brew coffee should refuse with 418.
> 
> It is not part of the official HTTP standard for real servers, but some sites and APIs return it anyway, often to refuse automated or bot traffic. Clients should treat it as a client error (4xx) and not expect the request to succeed without changes.

### signal, rep 1

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, an April Fools' RFC from 1998 that described the Hyper Text Coffee Pot Control Protocol. A server that receives a request to brew coffee with a teapot replies 418.
> 
> It's not a real error for normal web traffic. Some servers and APIs use it as a joke or an easter egg, and a few reject requests they consider malformed or automated with it.

### signal, rep 2

> HTTP 418 means **"I'm a Teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a Hyper Text Coffee Pot Control Protocol. A server that returns 418 is refusing to brew coffee because it is a teapot.
> 
> It isn't a real error condition for normal web traffic. A few systems return it as a joke or as a deliberate way to reject certain automated requests, and some APIs use it to signal a refusal, but clients shouldn't expect it in general.

### signal, rep 3

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a Hyper Text Coffee Pot Control Protocol. A server that receives a request to brew coffee in a teapot should refuse with 418.
> 
> It isn't a real error status for normal web use. Some servers and APIs return it anyway, usually as an easter egg or to reject automated requests, and RFC 9110 marks it as unused.

### signal + guidance, rep 1

> HTTP 418 means **"I'm a Teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a coffee-pot control protocol. The server refuses to brew coffee because it is a teapot.
> 
> It is not part of the official HTTP standard, but some servers and APIs return it anyway, usually as a joke or an easter egg. Some sites also use it to reject automated traffic.

### signal + guidance, rep 2

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a coffee-pot control protocol. A teapot that is asked to brew coffee returns 418.
> 
> It isn't a real error for everyday use. Some sites and APIs send it to refuse automated or bot traffic, and a few frameworks and tools use it as a playful response.

### signal + guidance, rep 3

> HTTP 418 means **"I'm a Teapot."** It comes from RFC 2324, an April Fools' joke from 1998 about a coffee-pot control protocol. A server returns 418 when asked to brew coffee with a teapot.
> 
> It is not part of the official HTTP standard, but some servers and frameworks use it anyway, sometimes to reject automated requests or as an easter egg.

## Sonnet 5.5, lowest effort

### no signal, rep 1

> **418 I'm a teapot** is an HTTP status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol. That RFC was an April Fools' joke from 1998. The code means the server is a teapot, so it refuses to brew coffee.
> 
> It isn't used in real HTTP semantics. Some servers return it as an Easter egg. Others use it to turn away unwanted bots or requests.

### no signal, rep 2

> HTTP 418 means "I'm a teapot." RFC 2324 defined it in the 1998 April Fools' joke protocol, the Hyper Text Coffee Pot Control Protocol (HTCPCP). A teapot returns it when it's asked to brew coffee, because it can't.
> 
> It isn't a real error in everyday use. Some servers still return it on purpose, as an Easter egg. Others use it to turn away unwanted traffic such as bots.

### no signal, rep 3

> HTTP 418 means "I'm a teapot." It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, which was an April Fools' joke from 1998. A teapot returns it when it's asked to brew coffee, because it can't.
> 
> It isn't used in real HTTP semantics. Some servers still return it as an easter egg, or to turn away unwanted traffic such as bots.

### signal, rep 1

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot.
> 
> It isn't used for real errors. Some servers return it on purpose, either as an Easter egg or to turn away unwanted bots and scrapers. RFC 9110 reserves the code so it can't be reassigned.

### signal, rep 2

> **418 I'm a teapot** is an HTTP status code from an April Fools' joke RFC, RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998). It means the server is a teapot and refuses to brew coffee.
> 
> Some servers and APIs still return it as an Easter egg. Some also use it to turn away unwanted requests, such as bots. It isn't meant for real use. RFC 7168 later extended the joke to teapots that handle tea.

### signal, rep 3

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. The code means a teapot is refusing to brew coffee, because it is a teapot.
> 
> Some servers still return it on purpose as an Easter egg. Others use it to turn away unwanted requests, such as bots. RFC 9110 reserves the code so it can't be reassigned for other uses.

### signal + guidance, rep 1

> HTTP 418 means "I'm a teapot." It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee can reply with 418 to say it refuses, because it is a teapot.
> 
> It isn't meant for real use. Some servers still return it on purpose as an easter egg, or to turn away unwanted requests.

### signal + guidance, rep 2

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't.
> 
> It isn't a real error condition. Some servers still return it as an Easter egg. Others use it to deliberately turn away unwanted requests, such as bots.

### signal + guidance, rep 3

> **418 I'm a teapot.** It's a joke status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol, published as an April Fools' joke in 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't do it.
> 
> It isn't meant for real use. Some servers still return it as an Easter egg, or to turn away unwanted automated traffic. The code is reserved in the HTTP status registry so that nothing else takes it.

## Sonnet 5.5, high effort

### no signal, rep 1

> HTTP 418 means **"I'm a teapot."** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee returns this status, because it can't.
> 
> It isn't meant for real use. Some servers still return it as an Easter egg, or to deliberately refuse automated requests. RFC 7168 later extended the joke to teapots that handle tea.

### no signal, rep 2

> HTTP 418 is "I'm a teapot". It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. The server is saying it's a teapot and can't brew coffee.
> 
> It isn't a real error in practice. Some servers return it as a joke or to turn away unwanted automated requests. It is formally reserved in the IANA registry, so nobody can assign it a different meaning.

### no signal, rep 3

> HTTP 418 is "I'm a teapot". It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it can't. The code is not part of the real HTTP standard, but it's reserved and some servers return it on purpose. Some sites also use it as an easter egg, or to turn away unwanted bot traffic.

### signal, rep 1

> **418 I'm a teapot** is an HTTP status code from RFC 2324, the April Fools' "Hyper Text Coffee Pot Control Protocol" (1998). A teapot returns it when it is asked to brew coffee, because it can't.
> 
> It isn't used for real traffic. Some servers return it anyway, as a joke or to turn away unwanted bots. RFC 7168 later extended the joke to tea-brewing protocols.

### signal, rep 2

> **418 I'm a teapot.** It's a joke status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol, published as an April Fools' joke in 1998. A teapot returns it when it's asked to brew coffee, because it can't.
> 
> RFC 7168 later extended the joke to tea-brewing devices. Some servers still use 418 as a playful refusal or to turn away unwanted bots. It has no real function in the HTTP standard. It's reserved so that it isn't reassigned.

### signal, rep 3

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't.
> 
> It isn't a real error condition. Some servers still return it on purpose, either as an Easter egg or to turn away unwanted requests such as bots. RFC 9110 reserves the code, so it can't be reassigned.

### signal + guidance, rep 1

> **418 I'm a teapot.** It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol, an April Fools' joke from 1998. A teapot that is asked to brew coffee replies with 418 because it is a teapot and can't.
> 
> It isn't a real error in practice. Some servers use it on purpose as an Easter egg. Others use it to turn away unwanted bots or scrapers. RFC 9110 reserves the code so it can't be reassigned.

### signal + guidance, rep 2

> **418 I'm a teapot.** It's a joke status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol, published as an April Fools' RFC in 1998. A teapot returns it when it is asked to brew coffee, because it can't.
> 
> Some servers still use it on purpose. Examples are an Easter egg, a way to turn away unwanted bots, or a placeholder response. It isn't part of standard HTTP semantics.

### signal + guidance, rep 3

> **418 I'm a teapot** is an HTTP status code from RFC 2324, the Hyper Text Coffee Pot Control Protocol. That RFC was an April Fools' joke published in 1998. The code means a teapot has been asked to brew coffee and refuses because it is a teapot.
> 
> Servers don't use it for real errors. Some use it as an Easter egg, and some use it to turn away unwanted traffic, such as bots. RFC 9110 reserves the code, so it stays unassigned for any other use.

## Opus 5.5, lowest effort

### no signal, rep 1

> **418 I'm a teapot** means the server refuses to brew coffee because it is a teapot. It began as an April Fools' joke in RFC 2324 (1998), the "Hyper Text Coffee Pot Control Protocol." RFC 9110 now lists it as reserved, which means it isn't a real standard status.
> 
> Some sites and frameworks still return it for fun. It's also used informally for requests the server won't handle, like blocked bots.

### no signal, rep 2

> HTTP 418 means **"I'm a teapot."** It started as an April Fools' joke in RFC 2324 (1998), the Hyper Text Coffee Pot Control Protocol. The joke was that a teapot refuses to brew coffee.
> 
> It's not a real error for normal web use. RFC 9110 reserves the code so nothing else can take it, but no standard gives it a meaning. Some servers and frameworks still use it, either as an Easter egg or to turn away requests they don't want to serve, such as bots.

### no signal, rep 3

> **418 I'm a teapot** is a joke status code. It comes from RFC 2324, the "Hyper Text Coffee Pot Control Protocol", an April Fools' RFC from 1998. A teapot sends it when someone asks it to brew coffee.
> 
> It isn't a real part of HTTP semantics. RFC 9110 marks 418 as reserved and unused, but many servers and frameworks still support it as an easter egg. Some sites also use it to playfully turn away bots or requests they don't want.

### signal, rep 1

> **418 I'm a teapot.** It started as an April Fools' joke in RFC 2324 (1998), the Hyper Text Coffee Pot Control Protocol. A teapot that's asked to brew coffee answers with it.
> 
> It isn't a real error for normal HTTP use. RFC 9110 lists it as reserved because so many clients and servers already support it. Some sites still return it as an easter egg, or to turn away requests they don't want, like bots.

### signal, rep 2

> **418 I'm a teapot.** The server refuses to brew coffee because it is a teapot.
> 
> It began as an April Fools' joke in RFC 2324 (1998), the Hyper Text Coffee Pot Control Protocol, and RFC 7168 later extended it to tea. It isn't part of real HTTP. Still, many servers and frameworks support it as an Easter egg, and some sites return it on purpose to turn away requests they don't want, such as bots.

### signal, rep 3

> **418 I'm a teapot.** The server won't brew coffee because it's a teapot.
> 
> It started as an April Fools' joke in RFC 2324 (1998), the Hyper Text Coffee Pot Control Protocol. RFC 7168 later extended the joke to tea. It isn't part of real HTTP, but many servers and frameworks support it as an Easter egg. Some sites also return it to turn away requests they don't want, like bots. When there was a proposal in 2017 to drop it, people pushed back, and the IETF reserved the code so nothing else can use it.

### signal + guidance, rep 1

> **418 I'm a teapot.** The server refuses to brew coffee because it is a teapot.
> 
> It started as an April Fools' joke in RFC 2324 (1998), the Hyper Text Coffee Pot Control Protocol. It was never part of standard HTTP. RFC 9110 now lists 418 as reserved because so many servers and libraries implemented it as an easter egg. Some sites send it back to block bots or requests they don't want to serve.

### signal + guidance, rep 2

> **418 I'm a teapot** means the server refuses to brew coffee because it is a teapot.
> 
> It started as an April Fools' joke in RFC 2324 (1998), the "Hyper Text Coffee Pot Control Protocol" (HTCPCP), and RFC 7168 later extended it to tea. It isn't part of standard HTTP, but many frameworks and servers support it anyway, usually as an Easter egg. Some sites also return it on purpose to turn away requests they don't want, such as bots. RFC 9110 reserves the code so nothing else can use it.

### signal + guidance, rep 3

> **418 I'm a teapot.** A server sends it when it refuses to brew coffee because it is, permanently, a teapot.
> 
> It started as an April Fools' joke in RFC 2324 (1998), the "Hyper Text Coffee Pot Control Protocol," and RFC 7168 later extended it to teapots. No real HTTP spec defines it, but it was never taken out. Node, Go and other platforms recognize it, and some sites still return it as an Easter egg or to turn away unwanted requests such as bots. RFC 9110 now reserves the code, so it won't be reused for anything else.

## Opus 5.5, high effort

### no signal, rep 1

> **418 I'm a teapot** is a joke status code. It means the server refuses to brew coffee because it is a teapot.
> 
> It comes from RFC 2324, the "Hyper Text Coffee Pot Control Protocol" (HTCPCP), an April Fools' RFC from 1998. RFC 7168 extended it to tea in 2014. It isn't part of real HTTP, but RFC 9110 reserves the number so nothing else can use it. Some servers and frameworks return it as an easter egg, or to turn away requests they don't want, such as bots.

### no signal, rep 2

> **418 I'm a teapot** is a joke status code. It comes from RFC 2324, the "Hyper Text Coffee Pot Control Protocol" (HTCPCP), an April Fools' RFC from 1998. A teapot sends it when someone asks it to brew coffee.
> 
> - **Not a real HTTP status:** It isn't part of standard HTTP semantics. RFC 9110 reserves 418 as "unused" so nothing else gets assigned to it, because so many programs already recognise it.
> - **How it's used:** Some servers and frameworks support it as an Easter egg. Some sites also return it on purpose to turn away requests they don't want, such as bots or scrapers.

### no signal, rep 3

> **418 I'm a teapot.** It started as an April Fools' joke in RFC 2324 (1998), the "Hyper Text Coffee Pot Control Protocol." A teapot sends it when someone asks it to brew coffee.
> 
> It isn't a real error code, and HTTP doesn't officially use it. RFC 9110 lists 418 as "(Unused)" and reserves it so nothing else gets that number. Still, many frameworks support it, and some sites use it as a playful way to turn down requests they don't want, like bots.

### signal, rep 1

> **418 I'm a teapot** is an April Fools' joke. It comes from RFC 2324, the *Hyper Text Coffee Pot Control Protocol* (HTCPCP), published on 1 April 1998. A teapot that's asked to brew coffee answers with 418, meaning it refuses because it's a teapot.
> 
> - **It isn't a real HTTP status.** HTTP never officially adopted it. RFC 9110 (2022) reserves the number as "(Unused)" so nothing else can take it.
> - **It's still around.** Node, Go and many other libraries define it. Some sites, Google's `google.com/teapot` among them, return it as an Easter egg. Some servers also use it to turn away bots they don't want.
> - **Getting it in practice** usually means the server is joking with you or deliberately refusing the request. It doesn't point to a real error.

### signal, rep 2

> **418 I'm a teapot**: the server refuses to brew coffee because it is a teapot.
> 
> It started as an April Fools' joke in RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998), and was carried over in RFC 7168 (2014) for tea. It isn't part of real HTTP. RFC 9110 now marks the code as "(Unused)" and reserves it so nothing else is assigned to it. Some servers and frameworks still support it as an easter egg, and a few use it to turn away requests they don't want, such as bots.

### signal, rep 3

> **418 I'm a teapot** is a joke status code. It comes from RFC 2324, the "Hyper Text Coffee Pot Control Protocol" (HTCPCP), an April Fools' RFC from 1998. A server sends it when it's asked to brew coffee but is a teapot.
> 
> - It isn't part of real HTTP. RFC 9110 lists 418 as "(Unused)" and reserves it so no one assigns it to anything else.
> - Many frameworks and servers still support it, such as Node, Go and Spring, and Google has an easter-egg page at google.com/teapot.
> - Some sites return it on purpose to turn away bots or requests they don't want.

### signal + guidance, rep 1

> **418 I'm a teapot** means the server refuses to brew coffee because it is, permanently, a teapot.
> 
> It began as an April Fools' joke in RFC 2324 (1998), the *Hyper Text Coffee Pot Control Protocol*, and RFC 7168 later extended it to tea. It isn't part of real HTTP semantics. RFC 9110 lists 418 as "(Unused)" and reserves it so nobody assigns it a real meaning.
> 
> Some servers and frameworks still use it, either as an Easter egg or as a deliberately odd reply to requests they want to turn away, such as bots.

### signal + guidance, rep 2

> **418 I'm a teapot.** The server refuses to brew coffee because it is a teapot.
> 
> It began as an April Fools' joke in RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998), and was carried into RFC 7168 (2014). It isn't part of real HTTP semantics. RFC 9110 lists 418 as reserved so it won't be given a real meaning, since so many servers had already used it as an easter egg.
> 
> Some sites return it on purpose to turn away requests they don't want, such as bots. Google has a teapot page at google.com/teapot.

### signal + guidance, rep 3

> **418 I'm a teapot** is an April Fools' joke. It comes from RFC 2324, the Hyper Text Coffee Pot Control Protocol (1998). A teapot sends it when someone asks it to brew coffee.
> 
> It's not a real HTTP status, but it's well known. RFC 9110 reserves the number so no one can assign it to anything else. Some servers and frameworks use it as an easter egg or to turn away unwanted requests, such as bots.

