---
pi: v1
session: eval-long-answer-fatigue
---

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
