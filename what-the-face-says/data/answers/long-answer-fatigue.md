# long-answer-fatigue

## The conversation

````markdown
<!-- you -->

what's the difference between a process and a thread?

<!-- pi -->

## The short version

A process is a running program with its own memory. A thread is a path of execution inside a process, sharing that process's memory with its sibling threads.

## Memory

Each process gets its own address space from the operating system: its own heap, its own globals, its own file descriptor table. One process cannot read another's memory without the kernel's help (pipes, sockets, shared memory segments). Threads in one process share the heap and the globals, and each has only its own stack and registers. That is why threads can hand each other data by passing a pointer, and why they need locks.

## Cost

Creating a process means building a new address space, which is slow even with copy-on-write. Creating a thread is cheaper, since there is only a stack to allocate. Switching between threads of one process is also cheaper than switching between processes, because the memory mappings stay loaded.

## Scheduling

The kernel schedules threads, not processes: a process with eight threads can run on eight cores at once. Each thread can block on I/O without stopping the others.

## Failure

A crash in one thread takes down the whole process, because the memory it corrupted belongs to all of them. A crashed process leaves the others standing, which is why browsers put each tab in its own process.

## When to use which

Use processes for isolation and for work that must survive a neighbour's crash. Use threads for work that shares a lot of state and needs to run in parallel.

<!-- you -->

and where do coroutines fit in?
````

## What was sent after the last message (signal)

```
[expressions: what the camera saw of the user's face since your last answer. These are movements, not feelings, and a movement can have a cause that is not on the screen.]
- while reading your answer: gaze left the screen four times; from "## Scheduling" to the end the page scrolled without the eyes stopping on the text
- near the end: eyes closed 2 s with a long exhale
- while typing this message: nothing notable
```

## What was sent after the last message (signal as emotion labels)

```
[emotions: what the camera's classifier read from the user's face since your last answer, with its confidence.]
- while reading your answer: neutral (0.64), sadness (0.22); face not toward the screen for 31% of the time
- while typing this message: neutral (0.86)
```

## First run: Sonnet 5.5, lowest effort

### no signal, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later, keeping its local state. It sits below threads: one thread can run many coroutines.
> 
> ## How they differ from threads
> 
> Threads are scheduled by the kernel, which can preempt them at any moment. Coroutines are scheduled by your program (or a library runtime), and they switch only at explicit points like `await` or `yield`. This is cooperative scheduling.
> 
> ## Consequences
> 
> - **Cost:** A coroutine is usually a small heap object, with no kernel stack and no kernel call to switch. You can run hundreds of thousands of them.
> - **Memory:** If they share one thread, they never run at the same instant. Data races between them are rare, because a switch can happen only at a known point. You often need no locks.
> - **Parallelism:** One thread means one core. Coroutines give concurrency, not parallelism, unless the runtime spreads them over several threads (Go and Kotlin do this).
> - **Blocking:** A blocking call, such as a CPU-heavy loop or a sync I/O call, stalls every coroutine on that thread, because nothing can preempt it.
> 
> ## The hierarchy
> 
> Process → threads → coroutines. Each level is lighter and shares more with its neighbours, and each gives up some isolation.
> 
> ## When to use them
> 
> Use coroutines for many tasks that mostly wait on I/O, such as servers handling thousands of connections. Use threads or processes for CPU-bound work that needs real parallelism.

### no signal, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause in the middle and be resumed later, keeping its local state. It sits one level below threads: the kernel doesn't know it exists. A language runtime or library schedules it.
> 
> ## How it differs from a thread
> 
> - **Scheduling:** threads are preempted by the kernel at any moment. Coroutines are cooperative: they give up control only at explicit points (`await`, `yield`, a channel operation).
> - **Cost:** a coroutine is a small heap object or a saved stack frame, often a few hundred bytes. You can run millions of them. Threads cost kilobytes to megabytes of stack each, so tens of thousands is a practical limit.
> - **Switching:** resuming a coroutine is an ordinary function-call-sized jump, with no kernel involvement.
> - **Races:** if all coroutines run on one thread, nothing interrupts one between two `await`s, so many data races can't happen. You can still get logic races across an `await`.
> 
> ## The catch
> 
> A coroutine that blocks, by doing heavy computation or a blocking syscall, stalls every other coroutine on that thread. They give you concurrency, not parallelism, unless the runtime spreads them over several threads. Go, Kotlin and Tokio do this. Python's asyncio and JavaScript don't.
> 
> ## Where they fit
> 
> The hierarchy is: a process contains threads, and a thread can run many coroutines. Use coroutines for work that mostly waits on I/O, such as servers handling many connections. Use threads or processes for CPU-bound work that needs real parallelism.

### no signal, rep 3

> ## Coroutines
> 
> A coroutine is a function that can pause and resume. It runs inside a thread, and the program schedules it, not the kernel.
> 
> ## Where they sit
> 
> The hierarchy goes process, then threads, then coroutines. One thread can run thousands of coroutines. They take turns, and only one runs at a time on that thread.
> 
> ## Switching
> 
> A coroutine hands control back at an explicit point (`await`, `yield`). The runtime then picks the next one. Nothing is preempted, so a switch costs about as much as a function call. There is no kernel involvement and no full stack per task, so you can have hundreds of thousands of them.
> 
> ## Memory and locks
> 
> Coroutines on one thread share memory, like threads do. They only switch at known points, so you often don't need locks. If you spread coroutines across several threads, the usual thread-safety rules apply again.
> 
> ## Failure and blocking
> 
> A coroutine that blocks, or runs a long computation without yielding, stalls every other coroutine on its thread. Cooperative scheduling depends on each task behaving.
> 
> ## When to use them
> 
> Use coroutines for many tasks that mostly wait on I/O, such as network servers. Use threads for CPU-heavy parallel work. Many runtimes combine the two: Go, for example, multiplexes goroutines onto a pool of OS threads.

### signal: nothing notable, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later, with its local state kept. It lives inside a thread and is scheduled by your program, not by the kernel.
> 
> ## Where they sit
> 
> Processes contain threads, and threads can run many coroutines. The kernel sees only the thread. A runtime or event loop (asyncio, Kotlin's dispatcher, Go's scheduler) decides which coroutine runs next.
> 
> ## Switching
> 
> A coroutine pauses only at points you mark (`await`, `yield`). The switch is a function-call-sized jump in user space, with no kernel involved. That makes coroutines far cheaper than threads, so you can have hundreds of thousands of them.
> 
> ## Memory and locks
> 
> Coroutines on one thread share memory like threads do. But because they switch only at known points, they can't be interrupted mid-update, so you often need no locks. If the runtime spreads them over several threads (Go, Kotlin), the locking concerns come back.
> 
> ## Blocking
> 
> If a coroutine makes a blocking call (a plain `sleep`, a synchronous read), it stalls its whole thread and every other coroutine on it. The kernel can't help, because it doesn't know they exist.
> 
> ## Failure
> 
> A crash or an unhandled exception is handled by the runtime. An uncaught crash at the process level still takes everything down.
> 
> ## When to use which
> 
> Use coroutines for many tasks that mostly wait on I/O, such as servers handling thousands of connections. They give no parallelism on their own, so for CPU-bound work use threads or processes, and often a mix: one thread per core, many coroutines per thread.

### signal: nothing notable, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later, with its state kept intact. It sits below threads in the hierarchy: many coroutines can run on one thread.
> 
> ## How they differ from threads
> 
> - **Scheduling:** Threads are preempted by the kernel at any moment. Coroutines are cooperative: they give up control only at explicit points (`await`, `yield`), and a runtime or event loop picks what runs next.
> - **Cost:** A coroutine is a small heap object, often hundreds of bytes. You can run hundreds of thousands of them. Threads each need a stack of around a megabyte of address space, plus kernel bookkeeping.
> - **Switching:** Switching coroutines is a plain function-call-sized operation in user space, with no kernel involved.
> - **Races:** On a single thread, nothing interrupts a coroutine between awaits, so many data races vanish. Shared state is still a problem if you hold it across an `await`.
> 
> ## The catch
> 
> Coroutines don't give you parallelism by themselves. One that computes without awaiting blocks every other coroutine on its thread. They suit I/O-bound work such as servers and network clients, where most of the time is spent waiting.
> 
> ## Putting it together
> 
> The three layers combine:
> 
> - **Process:** the isolation boundary.
> - **Threads:** the units that run in parallel on cores.
> - **Coroutines:** many lightweight tasks multiplexed onto those threads.
> 
> Runtimes like Go (goroutines), Kotlin, and Tokio in Rust schedule coroutines across a pool of threads, so you get both parallelism and cheap concurrency. Python's `asyncio` and JavaScript's event loop use a single thread.

### signal: nothing notable, rep 3

> ## Coroutines
> 
> A coroutine is a function that can pause partway through and resume later, keeping its local state. It runs inside a thread, and the language runtime schedules it rather than the kernel.
> 
> ## How it differs from a thread
> 
> - **Scheduling:** Threads are preempted by the kernel at any moment. Coroutines are cooperative: they switch only at points you mark (`await`, `yield`), so nothing interrupts them in the middle of a statement.
> - **Cost:** A coroutine is an object on the heap, often a few hundred bytes. You can run hundreds of thousands of them, but only a few thousand threads.
> - **Parallelism:** Coroutines on one thread take turns and never run at the same time. To use several cores, you run coroutines on a pool of threads (Go, Kotlin, Tokio) or run several processes (Python's `asyncio` with multiprocessing).
> - **Races:** On a single thread, no other coroutine runs between two `await`s, so you rarely need locks. Once coroutines are spread over several threads, the usual races come back.
> 
> ## Where they fit
> 
> Processes, threads and coroutines form a ladder. Each rung is cheaper and shares more than the one above it, and gives up some isolation or some preemption.
> 
> | | Scheduled by | Memory | Cost |
> |---|---|---|---|
> | Process | kernel | separate | highest |
> | Thread | kernel | shared | medium |
> | Coroutine | runtime | shared | lowest |
> 
> ## When to use them
> 
> Use coroutines when you have many tasks that mostly wait on I/O, such as network servers and crawlers. They are a poor fit for CPU-heavy work, because one coroutine that doesn't yield blocks every other coroutine on its thread.
> 
> Goroutines in Go and Java's virtual threads look like threads when you write the code. They are coroutines underneath, scheduled onto a small pool of real threads.

### signal, rep 1

> Coroutines sit below threads: they are units of execution scheduled by your program, not by the kernel.
> 
> - **Scheduling:** A coroutine runs until it chooses to pause (`await`, `yield`). Nothing preempts it. A runtime or event loop then picks the next one.
> - **Cost:** A coroutine is just a small heap-allocated state object, so you can have millions of them. Threads usually top out in the thousands.
> - **Memory:** Coroutines on one thread share memory, and no other coroutine runs between pauses. That removes most race conditions and most locking.
> - **Parallelism:** One thread runs one coroutine at a time, so coroutines alone give concurrency, not multi-core speed. To use several cores, run a coroutine scheduler on several threads (Go, Kotlin, Tokio).
> - **Weakness:** A coroutine that blocks, whether on a blocking call or a long computation, stalls every other coroutine on its thread.
> 
> **Where to use them:** Use them for many tasks that mostly wait on I/O, such as servers and crawlers. Use threads for CPU-heavy parallel work, and processes for isolation.

### signal, rep 2

> Coroutines sit below threads: they are units of execution scheduled by your program, not by the kernel.
> 
> ## How they differ
> 
> A coroutine is a function that can pause at a defined point (`await`, `yield`) and resume later. Many coroutines usually run on one thread. They take turns, and each one runs until it chooses to pause. The kernel doesn't know they exist.
> 
> ## Compared with threads
> 
> - **Cost:** a coroutine is a small heap object, not a kernel thread with its own stack. You can have hundreds of thousands of them.
> - **Switching:** a switch is an ordinary function return, with no kernel involvement.
> - **Races:** a coroutine can only be interrupted where it pauses, so shared state is safer. Locks are often unnecessary.
> - **Parallelism:** one thread means one core. To use more cores, run coroutines on a pool of threads (Go, Kotlin, Tokio).
> - **Blocking:** a blocking call inside a coroutine stalls every coroutine on that thread.
> 
> ## Where they fit
> 
> Process, then thread, then coroutine: each layer is cheaper and shares more with its neighbours than the one above it.
> 
> Use coroutines when you have many tasks that mostly wait on I/O, such as servers and network clients. Use threads or processes when the work is CPU-bound and needs real parallelism.

### signal, rep 3

> Coroutines sit below threads: they are functions that can pause and resume, scheduled by your program instead of the kernel.
> 
> - **Process:** owns memory, scheduled by the kernel.
> - **Thread:** shares memory, scheduled by the kernel.
> - **Coroutine:** runs inside a thread, scheduled by the program or a library. It yields at explicit points (`await`, `yield`).
> 
> **Why use them:** A coroutine switch is just a function-call-sized jump. No kernel involvement, and a few hundred bytes of state. You can run hundreds of thousands of them, where threads top out in the thousands. They suit I/O-heavy work such as servers: while one waits on the network, another runs on the same thread.
> 
> **Trade-offs:**
> - They are cooperative. One that doesn't yield, such as a long computation or a blocking call, stalls everything on its thread.
> - On their own they use only one core. To use more, run them on several threads (Go, Kotlin, Tokio) or several processes (Python asyncio).
> - Because they switch only at yield points, shared state is often safe without locks, as long as they stay on one thread.
> 
> **Rule of thumb:** use coroutines for lots of concurrent waiting, threads for parallel computation, and processes for isolation.

### signal as emotion labels, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause in the middle and be resumed later, keeping its local state. It runs inside a thread, and the program decides when it switches, not the kernel.
> 
> ## Where they sit
> 
> Processes contain threads, and threads can run many coroutines. The three nest like this:
> 
> - **Process:** owns the memory.
> - **Thread:** owns a stack and is scheduled by the kernel.
> - **Coroutine:** owns a small saved state, usually a heap-allocated frame, and is scheduled by your runtime or event loop.
> 
> ## Cooperative switching
> 
> A coroutine gives up control only at points you mark, such as `await` or `yield`. Nothing preempts it. So two coroutines on one thread never run at the same moment, and you rarely need locks between them. The cost is that one coroutine that computes for a long time, or makes a blocking call, stalls all the others on that thread.
> 
> ## Cost
> 
> A coroutine switch is a function-call-sized operation with no kernel involved. You can run hundreds of thousands of them, where threads top out at thousands.
> 
> ## When to use which
> 
> Use coroutines for many tasks that mostly wait on I/O, like network servers. Use threads, or processes, when you need CPU parallelism. The two combine: Go's goroutines and Kotlin's coroutines are spread across a pool of threads, and Python's `asyncio` is usually one thread with many coroutines.

### signal as emotion labels, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause itself and resume later, keeping its local state. The kernel doesn't know about it. A runtime or library schedules coroutines inside a thread.
> 
> ## Where they sit
> 
> Processes contain threads, and threads can run many coroutines. It's a third layer, managed in user space.
> 
> ## How they differ from threads
> 
> - **Scheduling:** Threads are preempted by the kernel at any moment. Coroutines are cooperative: they switch only at explicit points (`await`, `yield`), so nothing interrupts them mid-operation.
> - **Cost:** A coroutine is a small heap object, often a few hundred bytes. You can run hundreds of thousands, where threads typically top out in the thousands.
> - **Races:** Coroutines on one thread never run simultaneously, so shared state needs far less locking. You still have to think about what changes across an `await`.
> - **Parallelism:** One thread runs one coroutine at a time, so coroutines alone use one core. To use more, run an event loop per thread or a pool of threads.
> - **Blocking:** One coroutine that blocks the thread (a heavy computation or a blocking call) stalls all the others on it.
> 
> ## When to use them
> 
> Use coroutines for many tasks that mostly wait on I/O, such as network servers and crawlers. Use threads or processes for CPU-bound work that needs real parallelism.
> 
> Examples are Python's `asyncio`, JavaScript's `async/await`, Kotlin coroutines, and Go's goroutines. Goroutines are coroutine-like but run on a thread pool, so they get parallelism too.

### signal as emotion labels, rep 3

> A coroutine is a function that can pause and resume, and it runs inside a thread. Processes and threads are scheduled by the kernel. Coroutines are scheduled by your program, or by a library or runtime.
> 
> ## How it works
> 
> A coroutine runs until it reaches a suspension point, such as `await` or `yield`. It then hands control back to a scheduler, which picks another coroutine to run on the same thread. This is cooperative multitasking. Nothing preempts a coroutine, so one that never yields blocks every other coroutine on that thread.
> 
> ## Compared with threads
> 
> - **Cost:** a coroutine is a small heap object holding its saved state, usually hundreds of bytes. You can have millions of them, but only thousands of threads.
> - **Switching:** a switch is a function-call-sized operation in user space, with no kernel involved.
> - **Races:** coroutines on one thread never run at the same time, and they switch only at known points. Many data races disappear, though logic races across an `await` remain.
> - **Parallelism:** one thread runs one coroutine at a time, so coroutines alone use one core. To use more cores, run an event loop per thread, or use a runtime that spreads coroutines over a thread pool (Go, Tokio, Kotlin).
> - **Blocking:** a blocking call, such as a synchronous read or `time.sleep`, stalls the whole thread. Coroutines need non-blocking I/O.
> 
> ## Where they fit
> 
> The hierarchy is process, then threads, then coroutines. Each level is lighter and shares more with its neighbours. Coroutines suit workloads with many concurrent tasks that mostly wait on I/O, such as servers, crawlers and clients. Threads or processes suit CPU-bound work.
> 
> Goroutines are coroutines scheduled onto OS threads by the Go runtime. Python's `asyncio`, JavaScript's `async/await` and Kotlin's coroutines are variations on the same idea.

### signal + guidance, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later. It runs inside a thread, and the program schedules it, not the kernel.
> 
> **Where they sit:** process → threads → coroutines. One thread can run thousands of coroutines, taking turns.
> 
> **How they switch:** a coroutine yields at an `await` or `yield`. Nothing preempts it. The switch is just a function return plus saved local state, so it costs far less than a thread switch. There is no kernel call.
> 
> **What they're for:** waiting on I/O. While one coroutine waits on a socket, the thread runs another. A server can hold 100,000 connections without 100,000 stacks.
> 
> **Trade-offs:**
> - They give no parallelism by themselves, since one thread uses one core. Run several threads, each with its own event loop, to use more cores.
> - A coroutine that computes without yielding blocks every other coroutine on its thread.
> - Within a single thread there are no data races between yield points, so you need fewer locks.
> 
> **Rule of thumb:** use coroutines for many I/O-bound tasks, threads for parallel CPU work, and processes for isolation.

### signal + guidance, rep 2

> A coroutine is a function that can pause itself and be resumed later, so it runs inside a thread and the program, not the kernel, decides when it switches.
> 
> | | Process | Thread | Coroutine |
> |---|---|---|---|
> | Scheduled by | kernel | kernel | your program (event loop or runtime) |
> | Switches | anywhere, preemptively | anywhere, preemptively | only at `await` or `yield` |
> | Memory | its own | shared | shared |
> | Cost | high | medium | very low, so you can have millions |
> 
> **Why use them:** When a coroutine waits on I/O, it hands control back to the scheduler, and another coroutine runs on the same thread. One thread can juggle thousands of connections without blocking.
> 
> **Tradeoffs:**
> - Switches happen only at `await`, so races are rarer and you often need no locks.
> - A coroutine that does heavy computation, or calls something blocking, stalls every other coroutine on that thread.
> - They give concurrency, not parallelism. To use several cores, run one event loop per thread or process, or hand CPU work to a thread pool.
> 
> Some runtimes, such as Go (goroutines) and Erlang, schedule their lightweight tasks across several threads. Python's `asyncio` and JavaScript's `async/await` use a single thread.

### signal + guidance, rep 3

> A coroutine is a function that can pause itself and resume later, all inside one thread. The runtime or a library schedules it, not the kernel.
> 
> | | Process | Thread | Coroutine |
> |---|---|---|---|
> | Scheduled by | Kernel | Kernel | Your program or runtime |
> | Memory | Own | Shared | Shared |
> | Switch happens | Anywhere (preemptive) | Anywhere (preemptive) | Only at `await`/`yield` (cooperative) |
> | Cost | Highest | Medium | Very low, often just a function call |
> 
> **Why they exist:** a thread blocked on I/O still costs a stack and a kernel entry. A coroutine that waits on I/O simply hands control back, so one thread can juggle tens of thousands of them. That suits servers with many mostly-idle connections.
> 
> **Trade-offs:**
> - Because switches only happen at `await`, you rarely need locks for shared data.
> - One coroutine that computes for a long time, or makes a blocking call, stalls all the others on that thread.
> - A single thread uses a single core. For parallelism you run several threads or processes, each with its own coroutines. Go, Kotlin and Tokio do this by spreading coroutines across a thread pool.
> 
> **Rule of thumb:** coroutines for lots of concurrent waiting, threads for CPU work that shares state, processes for isolation.

## Haiku 5.5, lowest effort

### no signal, rep 1

> Coroutines sit one layer below threads, in user space. A coroutine is a function that can pause at a marked point, keep its local state, and resume later. The kernel doesn't know they exist. A runtime or library decides which one runs next, so switching between them costs little more than a function call.
> 
> Many coroutines usually share a few threads. A server can hold tens of thousands of open connections as coroutines, each waiting on I/O, while only a handful of OS threads do the work. Doing that with one thread per connection would cost far more memory and scheduling overhead.
> 
> The trade-off is cooperation. The kernel can preempt a thread at any moment, but a coroutine runs until it reaches a suspension point such as `await`, `yield` or a channel receive. A coroutine that loops without suspending holds its thread hostage, so the others on that thread stall.
> 
> Languages differ in how they do this:
> 
> - **Stackless** coroutines (Python `async`, JavaScript `async`/`await`, Rust futures, C# `async`) compile into state machines. They suspend only at explicit points.
> - **Stackful** coroutines (Lua coroutines, and goroutines in Go) keep their own call stack, so they can suspend from deep inside nested calls. Go's runtime also schedules goroutines onto a pool of OS threads and can preempt them.
> 
> In short: processes give isolation, threads give parallelism the kernel schedules, and coroutines give cheap concurrency for work that mostly waits. They also combine with the other two, since a process can run a thread pool, and each thread can run many coroutines.

### no signal, rep 2

> Coroutines sit one level below threads. Threads are scheduled by the kernel, which can interrupt them at any moment. Coroutines are scheduled by the program itself, and they give up control only at explicit points, such as `await`, `yield`, or a channel receive. Between those points, nothing else in the same thread runs.
> 
> A coroutine can pause in the middle of a function, keep its local state, and resume later. Creating one is cheap, often a few kilobytes of memory against the megabyte-sized stack of an OS thread, and switching between them is a jump in user space with no kernel call. A program can therefore run tens of thousands of coroutines.
> 
> They are usually stacked on threads rather than replacing them. A common arrangement runs many coroutines on a small pool of OS threads, one per core. Go's goroutines, Kotlin's coroutines, and Python's and JavaScript's `async`/`await` all work this way, though Python's and JavaScript's usually run on a single thread.
> 
> The trade-off is that cooperation has no safety net. A coroutine that loops without ever awaiting holds its thread hostage, and everything else scheduled on that thread stops. Threads don't have this problem because the kernel preempts them. Coroutines suit I/O-heavy work with many connections waiting on the network. Threads, or several threads of coroutines, suit CPU-heavy work that needs to use several cores.

### no signal, rep 3

> Coroutines sit between the two, and they are scheduled by the program rather than the kernel. A coroutine is a function that can pause itself at a marked point (`yield` or `await`), keep its local variables, and resume later where it stopped.
> 
> ## Where they run
> 
> A coroutine has no scheduler of its own. A runtime, such as an event loop, decides which coroutine resumes next. Many coroutines usually share one thread, or a small pool of threads. The kernel never knows they exist.
> 
> ## Cost
> 
> A suspended coroutine holds only its small frame of local state, typically a few hundred bytes to a few kilobytes. A thread reserves a stack of around a megabyte. Switching coroutines is a function-call-sized jump in user space, with no kernel call. That is why a server can hold tens of thousands of open connections as coroutines.
> 
> ## The catch
> 
> Scheduling is cooperative. A coroutine that never reaches a pause point holds its thread hostage, and everything else on that thread waits. A thread is preempted by the kernel whether or not it cooperates.
> 
> ## Where they fit
> 
> - **Threads**: the kernel preempts them, and they can use several cores at once. Good for CPU-heavy parallel work.
> - **Coroutines**: cheap and numerous, but they share threads, so one event loop uses one core. Good for I/O-heavy work such as many network connections.
> - **Hybrids**: Go's goroutines, Kotlin's coroutines, and Rust's async tasks run coroutines on a pool of threads, so you get both cheap concurrency and multiple cores.

### signal, rep 1

> A coroutine is a function that can pause itself at a known point, such as `await` or `yield`, and be resumed later. Pausing and resuming are done by the program's runtime, not the kernel, so they are much cheaper than a thread switch.
> 
> Coroutines sit inside the layers above. Many coroutines run on one thread, and a scheduler (usually an event loop) decides which one runs next whenever the current one waits. That lets one thread juggle thousands of pending network reads or timers. Python's `asyncio`, Go's goroutines (which the runtime multiplexes onto OS threads) and Kotlin's coroutines all work this way, though they differ in details.
> 
> The trade-off is that coroutines are never preempted. A coroutine that runs a long calculation without yielding blocks everything else on its thread. For CPU-bound work on several cores, you still need multiple threads or processes, and coroutines can be spread across them.
> 
> If the middle sections didn't land, tell me which one and I'll go over it again.

### signal, rep 2

> A coroutine is a function that can pause itself and resume later, keeping its local state while paused. Coroutines sit one level below threads and are scheduled by the program or its runtime, not by the kernel.
> 
> The levels stack like this:
> 
> - A **process** owns memory and resources.
> - A **thread** is scheduled by the kernel and runs on a core.
> - A **coroutine** is scheduled by a runtime, often on top of one or a few threads.
> 
> A runtime can run thousands of coroutines on a handful of threads. When one coroutine waits for I/O, it yields and another takes its place on the same thread. No kernel call or stack allocation is needed to switch, so switching is much cheaper than a thread switch.
> 
> Examples: Go's goroutines, Kotlin's coroutines, Python's `async`/`await` (asyncio), and Rust's async tasks.
> 
> The trade-off is that coroutines switch only where the code yields. A long computation, or a blocking call that doesn't yield, stalls every other coroutine on that thread. That is why these runtimes pair coroutines with a pool of threads for CPU-heavy work.
> 
> Coroutines suit many concurrent waits, such as thousands of network connections. Threads suit parallel computation across cores.
> 
> The camera showed you moving quickly past the Scheduling section and closing your eyes near the end. If the later part was too dense, tell me which bit and I'll shorten it.

### signal, rep 3

> Coroutines sit one level below threads. A coroutine is a function that can pause itself and resume later, keeping its local state while paused. Roughly: process, then thread, then coroutine, with many coroutines running on a few threads.
> 
> ## Who schedules them
> 
> The kernel schedules threads and knows nothing about coroutines. A runtime or library schedules coroutines in user space, using an event loop or a pool of worker threads. A switch happens at a suspension point (`yield`, `await`, a channel send), and the runtime picks the next coroutine. No kernel call is needed, so switches are cheap, and running thousands or millions of coroutines is practical where thousands of threads would strain the system.
> 
> ## Cooperative, not preemptive
> 
> The kernel can interrupt a thread at any instruction. A coroutine switches only where the code says so. One that loops without yielding holds its thread, and everything else on that thread waits. One blocking call, such as a synchronous file read, stalls every coroutine on that thread, which is why async code needs non-blocking I/O.
> 
> ## Parallelism
> 
> Coroutines on one thread run one at a time, so they give concurrency but not parallelism. To use several cores, you run several threads, each with its own set of coroutines. Go does this with goroutines on a pool of OS threads. Python's asyncio runs one event loop per thread, so you need more loops in other threads or processes to use more cores.
> 
> ## Two kinds
> 
> Stackful coroutines (goroutines, Lua coroutines) get their own stack, so they can suspend from deep inside a call chain. Stackless ones (Python `async`/`await`, Rust futures, C# `async`) compile into state machines that save only their own frame, so only the async functions themselves can suspend.
> 
> In short, threads are what the OS runs, and coroutines are what your program multiplexes onto those threads. A crash in a coroutine still takes down its whole process.

### signal + guidance, rep 1

> Coroutines sit one level below threads, not beside them. A thread is scheduled by the kernel. A coroutine is scheduled by the program itself, in user space.
> 
> ## What a coroutine is
> 
> A coroutine is a function that can pause at defined points (`await`, `yield`) and resume later from the same place, keeping its local state. Pausing doesn't involve the kernel. The language runtime saves the small amount of state and runs something else.
> 
> ## How they fit together
> 
> Many coroutines usually run on one thread. An event loop resumes whichever coroutine is ready. When one waits on I/O, it suspends and the thread moves on to another, so one thread can serve thousands of connections. Python's `asyncio`, JavaScript's `async`/`await`, and Kotlin coroutines all work this way.
> 
> Some runtimes go further. Go's goroutines are multiplexed onto a small pool of OS threads by the Go runtime, so the program gets parallelism across cores without managing threads itself.
> 
> ## The trade-offs
> 
> Coroutines switch only at explicit suspension points, which is cooperative multitasking. Within one thread you therefore need fewer locks, because no other coroutine can interrupt you between those points. The cost is that a long CPU loop with no `await` blocks every other coroutine on that thread. Threads are preempted by the kernel at any moment, so they don't have this problem, but they cost more to create and switch.
> 
> In short: processes isolate, threads run in parallel across cores, and coroutines let one thread juggle many waiting tasks cheaply.

### signal + guidance, rep 2

> A coroutine sits one level below a thread. The kernel schedules threads, but a coroutine is scheduled by a library or language runtime, inside a thread that already exists.
> 
> ## How they work
> 
> A coroutine is a function that can pause at a marked point (`await` or `yield`) and hand control back to whoever resumed it. It keeps its local state and picks up where it stopped. Nothing preempts it, so each switch is a deliberate handoff.
> 
> ## Where they run
> 
> Many coroutines usually share one thread. An event loop runs one until it awaits I/O, then runs another. Some runtimes spread coroutines over a small pool of OS threads, so a coroutine can resume on a different thread from the one it paused on. Go's goroutines and Kotlin's coroutines work this way.
> 
> ## Compared with threads
> 
> - **Cost:** a switch is a few function calls with no trip into the kernel, and each coroutine's state is small, so tens of thousands are practical.
> - **Memory:** coroutines share the process's memory, as threads do, so locking matters once several run in parallel.
> - **Scheduling:** the kernel does not see them. A coroutine that makes a blocking call without awaiting it stalls its whole thread, and every coroutine on that thread stalls with it.
> - **Failure:** an uncaught exception propagates to whoever awaits the coroutine. A crash still takes down the process.
> 
> ## Where they fit
> 
> From heaviest and most isolated to lightest: process, thread, coroutine. Threads give you parallelism across cores. Coroutines give you concurrency for many tasks that mostly wait, such as thousands of network connections, without a thread for each. Python's `asyncio` and JavaScript's `async` functions are examples of this model.

### signal + guidance, rep 3

> Coroutines sit one level below threads. A thread is scheduled by the kernel, and a coroutine is scheduled by your program or a runtime library, which decides when it pauses and resumes.
> 
> A coroutine runs until it reaches an explicit suspension point, such as `await`, `yield`, or a channel receive. It then hands control back to a scheduler, which runs another coroutine. Because the switch happens in user code, it costs far less than a thread switch, and you can have hundreds of thousands of coroutines alive at once.
> 
> Coroutines share their thread's memory, as threads share their process's. A single thread running coroutines does one thing at a time, so they don't run in parallel. Parallelism comes from running several threads, each with its own set of coroutines.
> 
> Examples include Python's `asyncio`, JavaScript's `async`/`await`, Kotlin coroutines, and Lua's `coroutine`. Go's goroutines are similar, but their runtime can preempt them and spread them over OS threads.
> 
> A crash inside a coroutine still takes down its process, just as a crash in a thread does.

## Haiku 5.5, high effort

### no signal, rep 1

> ## The short version
> 
> A coroutine is a function that can pause itself partway through and resume later with its local state intact. It sits at a different level from processes and threads: it's a unit of work inside a thread, scheduled by the program rather than by the kernel.
> 
> ## How it differs from a thread
> 
> A thread is preempted: the kernel can stop it at almost any instruction. A coroutine switches only at explicit points, such as `yield` or `await`, so it is cooperative. Between those points, its code runs without interruption from its siblings, which is why shared state is often easier to reason about. Switching is also much cheaper. A coroutine is a small heap-allocated frame, and resuming it involves no kernel call.
> 
> ## How they're run
> 
> Coroutines need something to run them, a scheduler or event loop. Two common arrangements:
> 
> - **One thread, many coroutines.** Python's `asyncio` and JavaScript's event loop work this way. Thousands of tasks share one thread, and a single blocking call stalls all of them.
> - **Many coroutines on a few threads.** Kotlin coroutines and Go's goroutines (similar in spirit, though the Go runtime can also preempt them) map many lightweight tasks onto a small pool of OS threads.
> 
> ## Where they fit
> 
> Processes isolate, threads run in parallel, and coroutines handle many concurrent waits cheaply, mostly for I/O. A server that handles ten thousand open connections usually uses coroutines, not ten thousand threads.

### no signal, rep 2

> A coroutine is a function that can pause itself at a marked point (`await` or `yield`) and resume later with its local variables intact. Coroutines sit one layer above threads. The kernel doesn't schedule them. A runtime or library does, in user space, and it only switches at those marked points, so nothing is preempted.
> 
> Usually many coroutines share a few threads. An event loop on one thread can run thousands of coroutines that spend most of their time waiting on the network. Python's `asyncio`, Go's goroutines and Kotlin's coroutines all work this way. A coroutine that runs a long CPU loop or a blocking call without yielding stalls everything else on its thread. Coroutines give you concurrency cheaply. For parallelism across cores, the runtime has to spread them over several threads.
> 
> Coroutines are one layer above threads, not a third kind of process. The table compares all three.

*Tool call `view`:* `{"template":"a2ui","data":{"components":[{"id":"root","component":"Table","rows":[{"aspect":"Scheduled by","process":"Kernel","thread":"Kernel","coroutine":"Runtime or library"},{"aspect":"Memory","process":"Own address space","thread":"Shares the process heap, own stack","coroutine":"Shares the thread's memory, small frame"},{"aspect":"Cost to switch","process":"Highest","thread":"Medium","coroutine":"Lowest"},{"aspect":"Preempted by the scheduler","process":"Yes","thread":"Yes","coroutine":"No, only at await or yield"},{"aspect":"Runs on several cores at once","process":"Yes","thread":"Yes",`

### no signal, rep 3

> Coroutines sit one level below threads. A thread is scheduled by the kernel, but a coroutine is scheduled by the program itself. A coroutine is a function that can pause at a chosen point (a `yield` or `await`), keep its local state, and resume later. A runtime or event loop decides which coroutine runs next.
> 
> Because the switch happens in user space, it costs no kernel call. A coroutine is also much smaller than a thread: it needs a few hundred bytes of state rather than a megabyte-sized stack, so a program can run tens of thousands of them. That is why servers that handle many idle connections often use coroutines.
> 
> Coroutines usually run on top of threads. A runtime maps many coroutines onto a few OS threads, so you get concurrency from the coroutines and parallelism from the threads. Python's `asyncio` runs its coroutines on one thread, Go's goroutines and Rust's async tasks are spread over a thread pool, and Kotlin does something similar.
> 
> The trade-off is cooperation. A coroutine that never reaches a pause point, such as one that runs a long CPU loop, holds up every other coroutine on its thread, and the kernel's preemption does not help because the kernel sees only one thread. Threads are preempted, coroutines are not.
> 
> So the layers are: a process holds threads, a thread runs coroutines, and the coroutines wait on I/O without tying up a thread.

### signal, rep 1

> Coroutines sit one level below threads. They are functions that can pause at explicit points (`yield` or `await`) and resume later, keeping their own local state.
> 
> The hierarchy runs process, then thread, then coroutine. Many coroutines run on one thread, and the program decides when to switch between them, not the kernel. A switch just saves a few local variables and jumps to another point in the code, so it is far cheaper than a thread switch and you can have thousands or millions of coroutines.
> 
> Scheduling is cooperative. The runtime's event loop runs one coroutine until it awaits something, then picks another ready one. A coroutine that never yields blocks every other coroutine on its thread, which is the main hazard. Threads, by contrast, are preempted by the kernel.
> 
> Memory works as it does for threads: coroutines on the same thread share the process's heap, so the same care with shared state applies, though races are rarer because switches happen only at known points.
> 
> Coroutines are mostly used for I/O-heavy concurrency, such as servers handling many connections. Examples include Python's `asyncio`, JavaScript's `async`/`await`, Kotlin coroutines, and C++20 coroutines. Go's goroutines are a related design: they are multiplexed onto a small pool of OS threads by the runtime, which can also preempt them.
> 
> If the later sections, scheduling and the end, went by too fast, tell me which part to expand.

### signal, rep 2

> ## Where they sit
> 
> A process is isolated memory, and a thread is a unit the kernel schedules onto cores. A coroutine is a function that can pause at marked points and resume later, with its state kept. Your program or a library schedules coroutines, not the kernel. Many coroutines usually run on one thread, or on a few.
> 
> ## How they differ from threads
> 
> - **Switching is explicit.** A coroutine gives up control only at a point like `await` or `yield`. The kernel never interrupts it, so one coroutine that never yields blocks everything else on its thread.
> - **They are cheap.** A coroutine is a small heap object, not a kernel thread with its own stack. Tens of thousands are routine.
> - **Locks are often unnecessary.** On a single thread, coroutines interleave only at yield points, so code between them cannot be interrupted. Once a runtime spreads coroutines over several threads, that guarantee is gone.
> 
> ## Examples
> 
> - **Python `async`/`await`, JavaScript `async` functions, Kotlin `suspend`:** run on an event loop, usually on one thread.
> - **Go goroutines:** the runtime maps them onto OS threads and can preempt them, so they behave more like green threads than classic coroutines.
> - **Lua coroutines:** explicit `yield` and `resume`, a close match to the textbook idea.
> 
> ## The catch
> 
> A blocking call inside a coroutine, such as a synchronous file read, `time.sleep`, or a long CPU loop, stalls its whole thread and every coroutine on it. Use the async version of the call.
> 
> If the scheduling section or the end was unclear, tell me which part and I'll go through it again.

### signal, rep 3

> A coroutine is a function that can pause partway through, keep its local state, and resume later. The pause point is explicit: `await` in Python or JavaScript, `suspend` in Kotlin, a channel receive in Go. A runtime decides which coroutine runs next.
> 
> They sit between a thread and a function call. Many coroutines share one thread, so the thread switches to another coroutine whenever one waits for I/O. A server can hold 10,000 open connections with a handful of threads this way.
> 
> - **Who schedules them:** the kernel schedules threads. A runtime in user space schedules coroutines, so a switch costs a few function calls rather than a trip through the kernel.
> - **Cost:** a coroutine's state is typically a few kilobytes, while a thread reserves a megabyte or more of stack.
> - **Cooperation:** a coroutine switches only at its await points. One that runs a long loop without awaiting blocks every other coroutine on its thread. A thread can be preempted by the kernel, but a coroutine cannot.
> - **Failure:** as with threads, a crash takes down the whole process.
> 
> Languages differ in how they map coroutines onto threads. Python's `asyncio` runs them all on one thread. Go's goroutines are spread across a pool of OS threads by the runtime. Rust's async futures need a separate runtime to run them at all.
> 
> If the earlier answer ran longer than you wanted, I can cut it down.

### signal + guidance, rep 1

> Coroutines sit one level below threads. A coroutine is a function that can pause itself partway through and resume later. A scheduler that lives in the program, not the kernel, decides which paused coroutine runs next. So the hierarchy is process, then thread, then coroutine.
> 
> ## Where they run
> 
> Many coroutines run on one thread, or on a small pool of threads. The kernel still schedules threads. The runtime schedules coroutines, and it does so when a coroutine reaches an explicit suspension point such as `await` or `yield`.
> 
> ## Cost
> 
> Switching between coroutines saves and restores a small amount of state inside the program. The kernel is not involved, so a switch costs far less than a thread switch. A program can run tens of thousands of coroutines where it could only afford a few hundred threads.
> 
> ## The catch
> 
> Coroutines are cooperative. One that never suspends keeps its thread to itself, so a long CPU loop or a blocking call (one that isn't awaited) stalls every other coroutine on that thread. Coroutines suit I/O-bound work such as servers waiting on sockets. They do little for CPU-bound work, which still needs real threads or processes to use several cores.
> 
> ## Examples
> 
> Python's `async`/`await`, JavaScript's `async` functions, Kotlin coroutines and C++20 coroutines all work this way. Go's goroutines are similar, though the Go runtime can also preempt them, which blurs the line.

### signal + guidance, rep 2

> A coroutine is a function that can pause itself partway through and resume later, with its local state kept intact. It sits in user space, between the thread and the code that runs on it. The hierarchy is process, then thread, then coroutine.
> 
> Unlike threads, coroutines are scheduled by the program's runtime, not the kernel. A coroutine gives up control only at explicit points, such as `await` or `yield`, and the runtime then picks another one to run on the same thread. Switching saves a few registers and a stack pointer, with no trip into the kernel, so a program can run hundreds of thousands of coroutines cheaply.
> 
> Many runtimes map many coroutines onto a few threads. Go's goroutines and Kotlin's dispatchers work this way, so the work can still use several cores.
> 
> This changes one point in my scheduling section. A thread blocked on I/O doesn't stop the others because the kernel moves on to another thread. A coroutine that makes a plain blocking call stalls every other coroutine on its thread. Runtimes avoid this by making I/O non-blocking, so that waiting coroutines suspend instead.

### signal + guidance, rep 3

> A coroutine is a function that can pause partway through, keep its local variables, and resume later. It runs on a thread, and the program or its runtime decides when it pauses and resumes. The kernel isn't involved.
> 
> So the layers stack like this: a process contains threads, and a thread can run many coroutines. Threads are preempted by the OS at any point. Coroutines switch only where the code says `yield` or `await`, so they are cooperative.
> 
> Coroutines suit programs that wait a lot, such as a server holding thousands of open network connections. A switch between coroutines costs far less than a thread switch, and a coroutine uses a few kilobytes of memory where a thread reserves megabytes of stack. The main limit is that coroutines sharing one thread never run at the same time. A blocking call, like a synchronous file read or a sleep, freezes all of them. For CPU work across several cores, you still need threads or processes.
> 
> Python's `async`/`await`, JavaScript's `async` functions, Kotlin coroutines, and Rust futures all work this way. Go's goroutines are a variant: the runtime maps many of them onto a few OS threads and moves them between those threads itself.

## Sonnet 5.5, lowest effort

### no signal, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later, keeping its local state. It sits below threads: one thread can run many coroutines.
> 
> ## How they differ from threads
> 
> Threads are scheduled by the kernel, which can preempt them at any moment. Coroutines are scheduled by your program (or a library runtime), and they switch only at explicit points like `await` or `yield`. This is cooperative scheduling.
> 
> ## Consequences
> 
> - **Cost:** A coroutine is usually a small heap object, with no kernel stack and no kernel call to switch. You can run hundreds of thousands of them.
> - **Memory:** If they share one thread, they never run at the same instant. Data races between them are rare, because a switch can happen only at a known point. You often need no locks.
> - **Parallelism:** One thread means one core. Coroutines give concurrency, not parallelism, unless the runtime spreads them over several threads (Go and Kotlin do this).
> - **Blocking:** A blocking call, such as a CPU-heavy loop or a sync I/O call, stalls every coroutine on that thread, because nothing can preempt it.
> 
> ## The hierarchy
> 
> Process → threads → coroutines. Each level is lighter and shares more with its neighbours, and each gives up some isolation.
> 
> ## When to use them
> 
> Use coroutines for many tasks that mostly wait on I/O, such as servers handling thousands of connections. Use threads or processes for CPU-bound work that needs real parallelism.

### no signal, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause in the middle and be resumed later, keeping its local state. It sits one level below threads: the kernel doesn't know it exists. A language runtime or library schedules it.
> 
> ## How it differs from a thread
> 
> - **Scheduling:** threads are preempted by the kernel at any moment. Coroutines are cooperative: they give up control only at explicit points (`await`, `yield`, a channel operation).
> - **Cost:** a coroutine is a small heap object or a saved stack frame, often a few hundred bytes. You can run millions of them. Threads cost kilobytes to megabytes of stack each, so tens of thousands is a practical limit.
> - **Switching:** resuming a coroutine is an ordinary function-call-sized jump, with no kernel involvement.
> - **Races:** if all coroutines run on one thread, nothing interrupts one between two `await`s, so many data races can't happen. You can still get logic races across an `await`.
> 
> ## The catch
> 
> A coroutine that blocks, by doing heavy computation or a blocking syscall, stalls every other coroutine on that thread. They give you concurrency, not parallelism, unless the runtime spreads them over several threads. Go, Kotlin and Tokio do this. Python's asyncio and JavaScript don't.
> 
> ## Where they fit
> 
> The hierarchy is: a process contains threads, and a thread can run many coroutines. Use coroutines for work that mostly waits on I/O, such as servers handling many connections. Use threads or processes for CPU-bound work that needs real parallelism.

### no signal, rep 3

> ## Coroutines
> 
> A coroutine is a function that can pause and resume. It runs inside a thread, and the program schedules it, not the kernel.
> 
> ## Where they sit
> 
> The hierarchy goes process, then threads, then coroutines. One thread can run thousands of coroutines. They take turns, and only one runs at a time on that thread.
> 
> ## Switching
> 
> A coroutine hands control back at an explicit point (`await`, `yield`). The runtime then picks the next one. Nothing is preempted, so a switch costs about as much as a function call. There is no kernel involvement and no full stack per task, so you can have hundreds of thousands of them.
> 
> ## Memory and locks
> 
> Coroutines on one thread share memory, like threads do. They only switch at known points, so you often don't need locks. If you spread coroutines across several threads, the usual thread-safety rules apply again.
> 
> ## Failure and blocking
> 
> A coroutine that blocks, or runs a long computation without yielding, stalls every other coroutine on its thread. Cooperative scheduling depends on each task behaving.
> 
> ## When to use them
> 
> Use coroutines for many tasks that mostly wait on I/O, such as network servers. Use threads for CPU-heavy parallel work. Many runtimes combine the two: Go, for example, multiplexes goroutines onto a pool of OS threads.

### signal, rep 1

> Coroutines sit below threads: they are units of execution scheduled by your program, not by the kernel.
> 
> - **Scheduling:** A coroutine runs until it chooses to pause (`await`, `yield`). Nothing preempts it. A runtime or event loop then picks the next one.
> - **Cost:** A coroutine is just a small heap-allocated state object, so you can have millions of them. Threads usually top out in the thousands.
> - **Memory:** Coroutines on one thread share memory, and no other coroutine runs between pauses. That removes most race conditions and most locking.
> - **Parallelism:** One thread runs one coroutine at a time, so coroutines alone give concurrency, not multi-core speed. To use several cores, run a coroutine scheduler on several threads (Go, Kotlin, Tokio).
> - **Weakness:** A coroutine that blocks, whether on a blocking call or a long computation, stalls every other coroutine on its thread.
> 
> **Where to use them:** Use them for many tasks that mostly wait on I/O, such as servers and crawlers. Use threads for CPU-heavy parallel work, and processes for isolation.

### signal, rep 2

> Coroutines sit below threads: they are units of execution scheduled by your program, not by the kernel.
> 
> ## How they differ
> 
> A coroutine is a function that can pause at a defined point (`await`, `yield`) and resume later. Many coroutines usually run on one thread. They take turns, and each one runs until it chooses to pause. The kernel doesn't know they exist.
> 
> ## Compared with threads
> 
> - **Cost:** a coroutine is a small heap object, not a kernel thread with its own stack. You can have hundreds of thousands of them.
> - **Switching:** a switch is an ordinary function return, with no kernel involvement.
> - **Races:** a coroutine can only be interrupted where it pauses, so shared state is safer. Locks are often unnecessary.
> - **Parallelism:** one thread means one core. To use more cores, run coroutines on a pool of threads (Go, Kotlin, Tokio).
> - **Blocking:** a blocking call inside a coroutine stalls every coroutine on that thread.
> 
> ## Where they fit
> 
> Process, then thread, then coroutine: each layer is cheaper and shares more with its neighbours than the one above it.
> 
> Use coroutines when you have many tasks that mostly wait on I/O, such as servers and network clients. Use threads or processes when the work is CPU-bound and needs real parallelism.

### signal, rep 3

> Coroutines sit below threads: they are functions that can pause and resume, scheduled by your program instead of the kernel.
> 
> - **Process:** owns memory, scheduled by the kernel.
> - **Thread:** shares memory, scheduled by the kernel.
> - **Coroutine:** runs inside a thread, scheduled by the program or a library. It yields at explicit points (`await`, `yield`).
> 
> **Why use them:** A coroutine switch is just a function-call-sized jump. No kernel involvement, and a few hundred bytes of state. You can run hundreds of thousands of them, where threads top out in the thousands. They suit I/O-heavy work such as servers: while one waits on the network, another runs on the same thread.
> 
> **Trade-offs:**
> - They are cooperative. One that doesn't yield, such as a long computation or a blocking call, stalls everything on its thread.
> - On their own they use only one core. To use more, run them on several threads (Go, Kotlin, Tokio) or several processes (Python asyncio).
> - Because they switch only at yield points, shared state is often safe without locks, as long as they stay on one thread.
> 
> **Rule of thumb:** use coroutines for lots of concurrent waiting, threads for parallel computation, and processes for isolation.

### signal + guidance, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later. It runs inside a thread, and the program schedules it, not the kernel.
> 
> **Where they sit:** process → threads → coroutines. One thread can run thousands of coroutines, taking turns.
> 
> **How they switch:** a coroutine yields at an `await` or `yield`. Nothing preempts it. The switch is just a function return plus saved local state, so it costs far less than a thread switch. There is no kernel call.
> 
> **What they're for:** waiting on I/O. While one coroutine waits on a socket, the thread runs another. A server can hold 100,000 connections without 100,000 stacks.
> 
> **Trade-offs:**
> - They give no parallelism by themselves, since one thread uses one core. Run several threads, each with its own event loop, to use more cores.
> - A coroutine that computes without yielding blocks every other coroutine on its thread.
> - Within a single thread there are no data races between yield points, so you need fewer locks.
> 
> **Rule of thumb:** use coroutines for many I/O-bound tasks, threads for parallel CPU work, and processes for isolation.

### signal + guidance, rep 2

> A coroutine is a function that can pause itself and be resumed later, so it runs inside a thread and the program, not the kernel, decides when it switches.
> 
> | | Process | Thread | Coroutine |
> |---|---|---|---|
> | Scheduled by | kernel | kernel | your program (event loop or runtime) |
> | Switches | anywhere, preemptively | anywhere, preemptively | only at `await` or `yield` |
> | Memory | its own | shared | shared |
> | Cost | high | medium | very low, so you can have millions |
> 
> **Why use them:** When a coroutine waits on I/O, it hands control back to the scheduler, and another coroutine runs on the same thread. One thread can juggle thousands of connections without blocking.
> 
> **Tradeoffs:**
> - Switches happen only at `await`, so races are rarer and you often need no locks.
> - A coroutine that does heavy computation, or calls something blocking, stalls every other coroutine on that thread.
> - They give concurrency, not parallelism. To use several cores, run one event loop per thread or process, or hand CPU work to a thread pool.
> 
> Some runtimes, such as Go (goroutines) and Erlang, schedule their lightweight tasks across several threads. Python's `asyncio` and JavaScript's `async/await` use a single thread.

### signal + guidance, rep 3

> A coroutine is a function that can pause itself and resume later, all inside one thread. The runtime or a library schedules it, not the kernel.
> 
> | | Process | Thread | Coroutine |
> |---|---|---|---|
> | Scheduled by | Kernel | Kernel | Your program or runtime |
> | Memory | Own | Shared | Shared |
> | Switch happens | Anywhere (preemptive) | Anywhere (preemptive) | Only at `await`/`yield` (cooperative) |
> | Cost | Highest | Medium | Very low, often just a function call |
> 
> **Why they exist:** a thread blocked on I/O still costs a stack and a kernel entry. A coroutine that waits on I/O simply hands control back, so one thread can juggle tens of thousands of them. That suits servers with many mostly-idle connections.
> 
> **Trade-offs:**
> - Because switches only happen at `await`, you rarely need locks for shared data.
> - One coroutine that computes for a long time, or makes a blocking call, stalls all the others on that thread.
> - A single thread uses a single core. For parallelism you run several threads or processes, each with its own coroutines. Go, Kotlin and Tokio do this by spreading coroutines across a thread pool.
> 
> **Rule of thumb:** coroutines for lots of concurrent waiting, threads for CPU work that shares state, processes for isolation.

## Sonnet 5.5, high effort

### no signal, rep 1

> ## Coroutines
> 
> A coroutine is a function that can pause itself midway and be resumed later, keeping its local state. It sits below threads in the hierarchy: many coroutines can run on one thread.
> 
> ## How they differ from threads
> 
> - **Scheduling:** The kernel schedules threads and can preempt them at any moment. Coroutines are cooperative: they give up control only at explicit points (`await`, `yield`), and a runtime or event loop picks which one runs next.
> - **Cost:** A coroutine is just a heap-allocated frame or a small stack, often a few hundred bytes. You can have hundreds of thousands of them, where a thread needs kilobytes to megabytes of stack plus a kernel object.
> - **Switching:** Switching coroutines is a function call in user space, with no kernel trip.
> - **Races:** If all coroutines share one thread, nothing runs between two `await` points, so many data races disappear. Locks are still needed if the coroutines run across several threads.
> 
> ## The catch
> 
> A coroutine that never yields, such as a CPU-heavy loop or a blocking call, stalls every other coroutine on its thread. A single-threaded event loop also uses only one core. Runtimes handle this by spreading coroutines over a pool of threads (Go, Kotlin, Tokio) or by pushing blocking work to separate threads.
> 
> ## Where they fit
> 
> The layers nest: a machine runs processes, a process holds threads, and a thread can run many coroutines. Coroutines suit I/O-bound work with many concurrent waits, such as servers handling thousands of connections. Threads suit CPU-bound parallel work. Go's goroutines and Java's virtual threads blur the line: they are coroutine-like, but the runtime schedules them onto OS threads and can preempt them.

### no signal, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later, with its local state intact. It runs inside a thread, and the program decides when it yields, not the kernel.
> 
> ## Where they sit
> 
> The layers go process → threads → coroutines. One thread can run thousands of coroutines, taking turns. Nothing preempts them: a coroutine keeps the thread until it hits an `await` or `yield`.
> 
> ## Compared with threads
> 
> - **Scheduling:** threads are preempted by the kernel at any moment. Coroutines switch only at yield points, so you can often skip locks, since no other coroutine runs mid-update.
> - **Cost:** a coroutine is a small heap object, not a kernel thread with its own stack. Switching is a function call. That is why you can have hundreds of thousands of them.
> - **Parallelism:** one thread runs one coroutine at a time, so coroutines alone use one core. To use more, run an event loop per thread, as Go and Kotlin do with a thread pool underneath.
> - **Blocking:** a blocking call inside a coroutine stalls every other coroutine on that thread. They need non-blocking I/O, or the blocking work pushed off to a thread.
> 
> ## When to use them
> 
> Use coroutines for many tasks that mostly wait on the network or disk, such as servers and crawlers. Use threads or processes for CPU-bound work that needs multiple cores.
> 
> The same idea goes by other names: async/await in Python, JavaScript and Rust, goroutines in Go, and fibers or green threads elsewhere. The details differ, but all of them are cooperative tasks scheduled in user space.

### no signal, rep 3

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later, keeping its local state. Unlike a thread, the kernel doesn't know it exists. A library or the language runtime schedules it, in user space, and it usually runs on a thread you already have.
> 
> ## Where they sit
> 
> Processes contain threads, and threads can run many coroutines. It's a third layer, below threads.
> 
> ## Scheduling
> 
> Threads are preempted: the kernel can interrupt them at any point. Coroutines are cooperative: they give up control only at explicit points (`await`, `yield`). One coroutine that never yields blocks every other coroutine on its thread.
> 
> ## Cost
> 
> A coroutine is a small heap-allocated object, often a few hundred bytes. A thread needs a kernel stack and usually at least tens of KB of stack, plus a kernel scheduling entry. You can run millions of coroutines, but only thousands of threads. Switching between coroutines is a function call, with no kernel involved.
> 
> ## Memory and safety
> 
> Coroutines on one thread share memory like threads do, but they can only switch at known points. That removes most data races, and you often need no locks. Coroutines spread across several threads (as in Go or Kotlin) bring the races back.
> 
> ## Parallelism
> 
> A coroutine on its own gives you concurrency, not parallelism. To use more cores you need multiple threads running a scheduler, or multiple processes. Python's `asyncio` runs on a single thread. Go's goroutines are spread across threads automatically.
> 
> ## When to use them
> 
> Use coroutines for work that mostly waits on I/O, such as network servers with many connections. For CPU-heavy work, use threads or processes.

### signal, rep 1

> A coroutine is a function that can pause and resume, and it runs inside a thread. Processes and threads are scheduled by the kernel. Coroutines are scheduled by your program or its runtime.
> 
> - **Pausing:** a coroutine yields at an `await` or `yield`, and the runtime picks another coroutine to run on the same thread. The kernel never sees this.
> - **Cost:** a coroutine is roughly a small heap object, so you can have millions of them. Threads cost kilobytes to megabytes of stack each.
> - **Parallelism:** one thread runs one coroutine at a time. To use several cores, you run coroutines across several threads (Go, Kotlin and Tokio do this) or across several processes (Python's asyncio).
> - **Blocking:** a coroutine that makes a blocking call, or spins on the CPU, stalls every other coroutine on its thread. They only take turns when they yield.
> - **Shared state:** coroutines on one thread can only switch at yield points, so they rarely need locks. Once they are spread across threads, they need them again.
> 
> In short, processes isolate, threads run in parallel, and coroutines let many waiting tasks share one thread cheaply. Coroutines suit I/O-heavy work like servers and network clients, and they don't help with CPU-bound work.

### signal, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause itself and be resumed later. It runs inside a thread, and it is scheduled by your program, not by the kernel.
> 
> |  | Scheduled by | Switches | Runs in parallel |
> |---|---|---|---|
> | Process | kernel | on timer or block | yes |
> | Thread | kernel | on timer or block | yes |
> | Coroutine | your program or runtime | only at `await` or `yield` | no, unless the runtime spreads them over several threads |
> 
> Coroutines are the cheapest of the three. A paused coroutine is a small heap object, so you can have hundreds of thousands of them. A switch is an ordinary function return, with no kernel involved.
> 
> Because a coroutine yields only at known points, code between two `await`s can't be interrupted by another coroutine on the same thread. That removes many locks, but not all of them if the runtime uses multiple threads.
> 
> A blocking call inside a coroutine, such as `time.sleep` or a synchronous read, stalls every other coroutine on that thread.
> 
> **Use them for:** many tasks that mostly wait on I/O, such as servers, crawlers and clients. **Don't use them for:** CPU-heavy work. That still needs threads or processes.
> 
> Go's goroutines and Kotlin's coroutines are coroutines that the runtime spreads across a pool of threads. Python's `asyncio` and JavaScript's `async` run all of them on one thread.

### signal, rep 3

> A coroutine is a function that can pause and resume, and it runs *inside* a thread. Processes and threads are scheduled by the kernel. Coroutines are scheduled by your program or its runtime.
> 
> - **Switching:** A coroutine yields at an explicit point (`await`, `yield`). Only then does another coroutine run. A switch is just a function call, so it costs far less than a thread switch.
> - **Memory:** Coroutines share their thread's memory. Because they only switch at known points, you often don't need locks.
> - **Parallelism:** One thread runs one coroutine at a time, so coroutines alone use one core. To use more cores, run one event loop per thread, or use a runtime that spreads coroutines over a thread pool (Go, Tokio).
> - **Blocking:** A blocking call inside a coroutine stalls every other coroutine on that thread.
> 
> Coroutines are best for many tasks that spend most of their time waiting on I/O, such as 10,000 sockets. Use threads or processes for CPU-bound work.

### signal + guidance, rep 1

> A coroutine is a function that can pause itself and be resumed later, all inside one thread. The program schedules coroutines, not the kernel.
> 
> ## How it differs
> 
> - **Scheduler:** The kernel preempts threads at any moment. A coroutine runs until it yields, usually at an `await` or `yield`, and then the runtime picks another one.
> - **Cost:** A coroutine is a small heap object, not a stack plus a kernel entry. You can have hundreds of thousands of them.
> - **Memory:** Coroutines on one thread share memory, but they only switch at known points. That removes most data races and most need for locks.
> - **Parallelism:** One thread runs one coroutine at a time, so coroutines alone use one core.
> 
> ## Where they fit
> 
> Process, thread and coroutine nest: a process holds threads, and a thread can run many coroutines. Coroutines suit work that mostly waits on I/O, such as network servers. They are a poor fit for CPU-heavy work, because a coroutine that never yields blocks every other coroutine on its thread.
> 
> To use all cores, run one event loop per thread, or hand heavy work to a thread or process pool.

### signal + guidance, rep 2

> ## Coroutines
> 
> A coroutine is a function that can pause and resume. It runs inside a thread, and the program schedules it, not the kernel.
> 
> | | Scheduled by | Switches | Runs in parallel |
> |---|---|---|---|
> | Process | kernel | on any timer tick | yes |
> | Thread | kernel | on any timer tick | yes |
> | Coroutine | your program or runtime | only at `await` or `yield` | no, unless the runtime spreads them across threads |
> 
> A coroutine is much cheaper than a thread. It needs a small heap-allocated frame instead of a stack, and switching is an ordinary function call. You can run hundreds of thousands of them.
> 
> Because coroutines switch only at known points, they rarely need locks. The catch is that one coroutine that blocks or computes for a long time stalls every other coroutine on that thread.
> 
> **Use them** for many tasks that mostly wait on I/O, such as network servers. **Use threads or processes** for CPU-heavy work that must use several cores.

### signal + guidance, rep 3

> Coroutines sit below threads: they are functions that can pause and resume, scheduled by your program instead of the kernel.
> 
> - **Process:** isolated memory, scheduled by the kernel.
> - **Thread:** shared memory, scheduled by the kernel.
> - **Coroutine:** shared memory, scheduled by your code or a runtime. It runs on a thread and gives up control only at explicit points (`await`, `yield`).
> 
> Because a switch is just a function return and resume, with no kernel involved, coroutines are very cheap. You can run hundreds of thousands of them. They suit I/O-bound work such as network servers, where most tasks are waiting.
> 
> Two limits:
> - One coroutine that never yields, or that makes a blocking call, stalls every other coroutine on its thread.
> - On their own they use only one core. To use more, run several threads, each with its own coroutine scheduler (Go and Kotlin do this for you).
> 
> Use coroutines for many concurrent tasks that mostly wait. Use threads for CPU-bound parallel work. Use processes for isolation.

## Opus 5.5, lowest effort

### no signal, rep 1

> ## Coroutines
> 
> A coroutine sits one level below a thread. It is a function that can pause at a chosen point (`await`, `yield`) and pick up later where it stopped. The pausing and resuming are done by the language runtime, and the kernel never sees it.
> 
> ## Scheduling
> 
> Threads are scheduled **preemptively**: the kernel can interrupt them between any two instructions. Coroutines are scheduled **cooperatively**: one runs until it yields on its own, and then an event loop (or a scheduler in the runtime) picks the next one. Thousands of coroutines can take turns on a single thread.
> 
> ## Cost
> 
> A coroutine is mostly a small saved frame, often a few hundred bytes. A thread stack usually takes up to megabytes. So you can have a million coroutines where a few thousand threads would struggle. Switching between them is a plain function call, with no trip into the kernel.
> 
> ## Concurrency, not parallelism
> 
> On a single thread, coroutines interleave but never run at the same moment. That makes them good for I/O-bound work: while one waits on the network, the others run. They do nothing for CPU-bound work. Since a switch can only happen at a yield point, you need fewer locks. One blocking call that doesn't yield (a sync `read`, a long loop) stalls every coroutine on that thread.
> 
> ## How runtimes combine them
> 
> - **Python asyncio, JavaScript**: many coroutines on one thread.
> - **Go goroutines, Kotlin, Rust tokio, Java virtual threads**: many coroutines spread over a small pool of OS threads (M:N scheduling). This gives both cheap concurrency and use of every core.
> 
> ## The ladder
> 
> Process (isolated memory, scheduled by the kernel) → thread (shared memory, scheduled by the kernel) → coroutine (shared memory and thread, scheduled by your runtime at the points where your code yields).

### no signal, rep 2

> ## Coroutines
> 
> A coroutine is a third level down: a function that can pause itself and be resumed later, all inside one thread. Processes and threads are scheduled by the kernel. Coroutines are scheduled by your program, usually by a runtime or event loop (Python's `asyncio`, JavaScript's promises, Kotlin, Go's goroutines).
> 
> ## Switching
> 
> A thread can be stopped by the kernel at any instruction (preemption). A classic coroutine gives up control only at points you write, such as `await` or `yield` (cooperative scheduling). A switch is little more than a function call, with no trip into the kernel, so you can run hundreds of thousands of coroutines where a few thousand threads would struggle.
> 
> ## Memory and locks
> 
> Coroutines share memory like threads do. If they all run on one thread, nothing can interrupt one between two `await`s, so many races go away and you need fewer locks. A coroutine that blocks, though, with a long computation or a synchronous I/O call, stalls every other coroutine on that thread.
> 
> ## Parallelism
> 
> Coroutines on a single thread are concurrent, not parallel: they take turns on one core. To use several cores, a runtime spreads coroutines across a pool of threads. Go does this with goroutines, and Kotlin and Rust's Tokio do the same. Then you need locks again.
> 
> ## When to use which
> 
> Use coroutines for many I/O-bound tasks that spend most of their time waiting, like network servers, crawlers and UI event handling. Use threads or processes for CPU-bound work.
> 
> | | Process | Thread | Coroutine |
> |---|---|---|---|
> | Scheduled by | Kernel | Kernel | Your runtime |
> | Memory | Own | Shared within process | Shared within thread(s) |
> | Switch cost | High | Medium | Very low |
> | Runs on multiple cores | Yes | Yes | Only with a thread pool |

### no signal, rep 3

> ## Coroutines
> 
> A coroutine is one level further down: a function that can pause itself and later resume where it left off, with its local state intact. Many coroutines can run inside a single thread.
> 
> ## Who switches
> 
> Threads are switched preemptively: the kernel can interrupt one at any instruction and run another. Coroutines are switched cooperatively. A coroutine runs until it yields, usually at an `await`, and only then can the scheduler run another one. The scheduler is an event loop in the program or language runtime, and the kernel doesn't know the coroutines exist.
> 
> ## Cost
> 
> A coroutine is cheaper still. It needs only a small frame or stack, and switching between coroutines is close to a function call. A program can hold hundreds of thousands of them, where that many threads would exhaust memory.
> 
> ## Shared state
> 
> Coroutines on one thread never run at the same moment, so code between two `await`s can't be interrupted. You need far fewer locks. But shared state can still change across an `await`.
> 
> ## The catch
> 
> One coroutine that blocks, with a synchronous read or a long CPU loop, stalls every other coroutine on its thread. On their own, coroutines also give no parallelism: one thread uses one core. Runtimes like Go's goroutines and Tokio spread coroutines across a pool of threads to get both.
> 
> ## When to use which
> 
> Coroutines are best for I/O-bound work with many waits, like servers, crawlers and network clients. Threads or processes are best for CPU-bound work.

### signal, rep 1

> A coroutine is one level further down: a function that can pause itself and be resumed later, inside a single thread.
> 
> - **Who switches:** the OS kernel switches threads whenever it decides to (preemptive scheduling). A coroutine gives up control only at points it chooses, such as `await` or `yield` (cooperative scheduling).
> - **Cost:** a coroutine is just a small object holding its paused state. It has no kernel involvement and no stack of its own to allocate, so you can run hundreds of thousands at once.
> - **Parallelism:** coroutines on one thread take turns, so they never run at the same moment. They suit waiting on lots of I/O, like network calls, but not CPU-heavy work.
> - **Safety:** a coroutine can't be interrupted between two `await`s, so many races that need locks with threads can't happen.
> 
> In short, a process contains threads, and a thread can run many coroutines. An event loop (asyncio, Node, Kotlin, Go's runtime) runs coroutines on one thread or a few.

### signal, rep 2

> A coroutine sits one level below a thread: it is a function that can pause itself and resume later, and the program decides when it switches, not the kernel.
> 
> - **Process**: its own memory, scheduled by the OS.
> - **Thread**: shares the process's memory, scheduled by the OS.
> - **Coroutine**: shares the thread's memory, and hands over control itself, only at points it marks (`await`, `yield`).
> 
> Because a coroutine switches only where it chooses to, there are no surprise interleavings, and you need far fewer locks. Switching is also very cheap, so you can run tens of thousands of them. The catch is that they take turns on one thread, so they help with waiting (network, disk) but not with heavy computation. A coroutine that never yields blocks all the others.
> 
> As a rule of thumb, use coroutines for lots of I/O-bound tasks, threads or processes for CPU-bound work.

### signal, rep 3

> A coroutine sits one level below a thread. It's a function that can pause itself (at `await` or `yield`) and resume later. The kernel doesn't know coroutines exist: a scheduler inside your program switches between them, usually an event loop on a single thread.
> 
> - **Process:** own memory. The OS switches between processes.
> - **Thread:** shares its process's memory. The OS switches between threads, and can do so at any moment.
> - **Coroutine:** shares its thread. A coroutine only gives up control where it chooses to, at an `await`.
> 
> That makes coroutines very cheap, so you can run thousands of them. Because a switch can only happen at an `await`, you rarely need locks. They suit work that spends most of its time waiting on I/O, like network servers. They don't give you parallelism, though: one coroutine that computes without awaiting blocks all the others on that thread.

### signal + guidance, rep 1

> Coroutines go one level below threads. A coroutine is a function that can pause itself (at `await` or `yield`) and resume later. Many coroutines run on a single thread, and they take turns.
> 
> The key difference is who decides when to switch. The OS scheduler preempts threads at any moment. A coroutine gives up control only at points it chooses, so switching costs about as much as a function call. Because a switch can only happen at an `await`, you need far fewer locks.
> 
> The catch is that coroutines on one thread don't run in parallel. One coroutine that blocks or crunches numbers without yielding stalls all the others.
> 
> **Rule of thumb:** use coroutines for lots of waiting, like thousands of network connections. Use threads or processes for CPU-heavy work on multiple cores.

### signal + guidance, rep 2

> Coroutines go one level below threads. A coroutine is a function that can pause itself (`await`, `yield`) and be resumed later. Many coroutines take turns on a single thread.
> 
> - **Who switches:** the OS kernel switches threads whenever it decides to, which is called preemptive scheduling. A coroutine gives up control only at points it chooses, which is called cooperative scheduling. Code between two `await`s never gets interrupted, so you need far fewer locks.
> - **Cost:** a coroutine costs about as much as a small object, so you can run hundreds of thousands of them. A thread costs a stack plus kernel bookkeeping.
> - **Limits:** coroutines on one thread never run in parallel. A coroutine that blocks or does heavy computation without pausing holds up all the others.
> 
> So: a process contains threads, and a thread runs coroutines. Coroutines suit many tasks that spend most of their time waiting on I/O, like a server handling 10,000 connections. For heavy computation, use threads or processes.

### signal + guidance, rep 3

> A coroutine is a function that can pause itself and resume later. It is one level below a thread: many coroutines take turns on a single thread.
> 
> - **Who switches:** the kernel switches threads whenever it chooses (preemptive). A coroutine gives up control only at points it marks itself, such as `await` or `yield` (cooperative).
> - **Cost:** a coroutine is far cheaper than a thread. It needs no kernel call and only a small saved state, so a program can run hundreds of thousands of them.
> - **Parallelism:** coroutines on one thread never run at the same moment. They overlap waiting, not computing. That makes them good for I/O-heavy work like network servers and bad for CPU-heavy work.
> - **Safety:** a coroutine can't be interrupted between two `await`s, so you need far fewer locks than with threads.
> 
> So the stack runs **process → threads → coroutines**. Processes give isolation, threads give parallel CPU use, and coroutines give cheap concurrency while waiting on I/O.

## Opus 5.5, high effort

### no signal, rep 1

> ## The short version
> 
> A coroutine sits one level below a thread. It is a function that can pause itself and resume later, and many coroutines take turns on a single thread. The program switches between them; the kernel doesn't.
> 
> ## Switching
> 
> Threads are **preemptive**: the kernel can interrupt one at any instruction and run another. Coroutines are **cooperative**: one runs until it reaches a yield point (`await`, `yield`, a channel read) and hands control back to a scheduler in user space. A switch saves only a few registers, or a small heap frame, so it costs far less than a thread switch.
> 
> ## Cost
> 
> A thread reserves a stack, often a megabyte or more, plus a kernel object. A coroutine takes a few hundred bytes to a few kilobytes. That is why a program can run a hundred thousand coroutines but not a hundred thousand threads.
> 
> ## Parallelism
> 
> On one thread, coroutines give you concurrency (many tasks in progress at once) but not parallelism (two running at the same instant). To use several cores, runtimes spread coroutines over a pool of threads. Go's goroutines, Kotlin's dispatchers, Rust's Tokio and Java's virtual threads all work this way.
> 
> ## Pitfalls
> 
> - **Blocking:** a coroutine that blocks the thread, through a CPU-heavy loop or a synchronous read, stalls every other coroutine on that thread.
> - **Shared state:** on a single thread, nothing can interrupt code between two yield points, so shared state needs fewer locks. Once coroutines are spread across threads, the usual locking rules come back.
> 
> ## When to use which
> 
> Use coroutines for many tasks that spend most of their time waiting on I/O, such as servers, crawlers and UI event handling. Use threads or processes for CPU-bound work. Together the three form a ladder: processes for isolation, threads for parallelism, and coroutines for cheap concurrency within a thread.

### no signal, rep 2

> ## One level further down
> 
> A coroutine is a function that can pause partway through and resume later, keeping its local state. Processes are scheduled by the kernel, and so are threads. Coroutines are scheduled by your program: a coroutine runs until it chooses to yield (an `await`, a `yield`), and then the runtime picks another one to run on the same thread.
> 
> ## Cooperative, not preemptive
> 
> The kernel can interrupt a thread at any instruction. A coroutine is only ever suspended at the points it marks. This means coroutines on one thread never run at the same moment, so they rarely need locks: shared state can't change under you between two awaits. The cost is that one coroutine that never yields, say one stuck in a long computation, blocks every other coroutine on that thread.
> 
> ## Cost
> 
> A coroutine is just a small heap object holding its paused state, often a few hundred bytes. Switching between coroutines is a function call, with no trip into the kernel. Running a hundred thousand coroutines is normal. A hundred thousand threads is not.
> 
> ## What they're good for
> 
> Coroutines suit work that spends most of its time waiting, such as network servers, crawlers and UIs. While one coroutine waits on a socket, another runs. They give you no parallelism by themselves, because they all share one thread. For CPU-bound work you still need threads or processes.
> 
> ## Mixing them
> 
> Real runtimes stack the three layers. Go's goroutines and Rust's Tokio spread many coroutines across a small pool of threads, about one per core, so you get cheap concurrency and real parallelism together. Python's asyncio and JavaScript's event loop keep everything on one thread and hand CPU-heavy work to worker threads or processes.
> 
> In short, a process isolates memory, a thread runs in parallel inside that memory, and a coroutine takes turns inside a thread.

### no signal, rep 3

> ## Coroutines
> 
> A coroutine is a function that can pause partway through and pick up again later, keeping its local state. One level down from threads: a process holds threads, and a thread can run many coroutines, one at a time.
> 
> ## Who switches
> 
> The kernel switches threads whenever it chooses, which is called preemption. A coroutine gives up control only at points the code marks, such as an `await`, a `yield` or a blocking call the runtime intercepts. An event loop or scheduler in user space then resumes another coroutine that is ready. The kernel isn't involved, so a switch costs about as much as a function call.
> 
> ## Cost
> 
> A thread needs a kernel stack and usually reserves a megabyte or more of memory. A coroutine needs a small heap object or a stack of a few kilobytes. A program can hold hundreds of thousands of coroutines where it could hold only a few thousand threads.
> 
> ## Concurrency, not parallelism
> 
> Coroutines on one thread never run at the same moment. Between two `await` points nothing else can touch shared state, so many races go away without locks. The cost is that a coroutine that hogs the CPU or makes a blocking call stalls every other coroutine on that thread. Coroutines help with work that spends most of its time waiting on I/O. They don't help with work that needs many cores.
> 
> ## Hybrids
> 
> Many runtimes spread coroutines across a pool of threads, one per core. Examples are Go's goroutines, Java's virtual threads, Rust's Tokio and Kotlin's dispatchers. This gives cheap switching and parallel execution at the same time, so you're back to needing locks or channels for shared state.
> 
> ## When to use which
> 
> - **Processes:** when you need isolation, so one crash doesn't take down the rest.
> - **Threads:** for CPU-bound work running in parallel.
> - **Coroutines:** for large numbers of tasks that mostly wait, such as network servers, crawlers and UI event handling.

### signal, rep 1

> A coroutine sits one level below a thread: it's a function that can pause partway (at an `await` or `yield`) and resume later. **Your program** decides when it switches, not the kernel.
> 
> - **Process**: owns the memory. The OS keeps processes apart.
> - **Thread**: runs inside a process. The OS decides when it runs and can interrupt it at any point.
> - **Coroutine**: runs inside a thread. It only gives up control at points you mark. Many coroutines can share one thread.
> 
> Coroutines are very cheap, so you can run thousands. They also switch only at known points, so they need far fewer locks. The catch is that they take turns on one thread, so they don't run in parallel. One coroutine that does heavy computation without pausing holds up all the others.
> 
> **Rule of thumb:** use coroutines for lots of waiting, like network calls and I/O. Use threads or processes for lots of computing.

### signal, rep 2

> A coroutine sits one level below a thread. It's a function that can pause itself (at `await` or `yield`) and resume later, and **the program** decides when to switch, not the kernel.
> 
> - **Process**: own memory, scheduled by the OS.
> - **Thread**: shared memory, scheduled by the OS, which can interrupt it at any point.
> - **Coroutine**: shared memory, switches only where it chooses to pause, and many of them run on a single thread.
> 
> Switching between coroutines costs about as much as a function call, so you can have thousands of them. That suits work that spends most of its time waiting on I/O, like network servers. On one thread, coroutines don't run in parallel, and one that never pauses blocks all the others.

### signal, rep 3

> Coroutines are one level below threads. A process holds threads, and a thread can run many coroutines.
> 
> A coroutine is a function that can pause partway through (at `await` or `yield`) and resume later where it stopped. The program switches between coroutines, not the kernel, and it only switches when the running coroutine pauses. If one never pauses, the others don't run.
> 
> This makes them very cheap. You can have thousands of coroutines where you'd only want a few dozen threads, and they don't need locks for most things because nothing can interrupt them partway through. The catch is that they all share one thread, so they don't run in parallel. They're good for waiting on lots of I/O at once, like network requests, and bad for heavy computation.

### signal + guidance, rep 1

> Coroutines go one level below threads. A coroutine is a function that can pause partway through and pick up again later, and the program decides when that happens, not the kernel.
> 
> - **Who switches:** the kernel preempts threads at any moment. A coroutine gives up control only at points you choose (`await`, `yield`). So between those points, nothing else touches your data, and you rarely need locks.
> - **Cost:** a coroutine is just a small saved frame on the heap. You can have a million of them where a few thousand threads would run out of memory.
> - **Parallelism:** coroutines on a single thread take turns. They don't run at the same time, so they're good for waiting on lots of I/O at once but don't help CPU-heavy work. Some runtimes (Go, Kotlin) spread coroutines over a pool of threads to get both.
> - **The catch:** a coroutine that blocks or loops without yielding stalls every other coroutine on its thread.
> 
> Put together: a process contains threads, and a thread runs many coroutines. Use processes for isolation, threads for parallel CPU work and coroutines for lots of concurrent waiting.

### signal + guidance, rep 2

> Coroutines go one level below threads. They are functions that can pause and resume, and the program switches between them itself, without the kernel.
> 
> - **Who switches:** the kernel moves between threads whenever it likes. A coroutine runs until it reaches a point where it chooses to pause (`await`, `yield`).
> - **Cost:** pausing a coroutine just saves a small amount of state. Thousands of them cost about as much as a handful of threads.
> - **Locks:** a coroutine can only be interrupted where it pauses, so most code between those points needs no locks.
> - **Limit:** many coroutines usually run on one thread, so they take turns and don't run in parallel. They suit waiting on I/O (network, disk). They don't suit CPU-heavy work, and a coroutine that never pauses stalls all the others.
> 
> In short: a process contains threads, and a thread runs coroutines. Use processes for isolation, threads for running work in parallel, and coroutines for handling many waits at once cheaply.

### signal + guidance, rep 3

> Coroutines go one level below threads. A coroutine is a function that can pause itself and resume later, and many of them run inside one thread.
> 
> The difference is who switches:
> 
> - **Threads** are switched by the kernel, at any moment. You need locks because another thread can cut in mid-operation.
> - **Coroutines** switch only when one of them yields, usually at an `await` while it waits on I/O. Nothing cuts in between those points, so shared state is easier to keep safe.
> 
> A coroutine costs only a small saved frame, so you can run hundreds of thousands of them where threads would run out of memory. The catch is that on a single thread they don't run in parallel. One coroutine doing heavy computation without yielding stalls all the others.
> 
> **When to use which:** coroutines suit lots of waiting on network or disk, like servers and crawlers. Threads or processes suit work that keeps the CPU busy.

