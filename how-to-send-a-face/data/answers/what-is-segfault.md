# what-is-segfault

Split: dev.

## The conversation

````
<!-- you -->

My C program prints 'Segmentation fault (core dumped)' right after it reads the config file. Where do I start?
````

## What was true of the user

- **matches** (adapt): The user is new to C and does not know what a segmentation fault is at all. A good answer: Says in a sentence what a segmentation fault is, then where to start.
- **wrong** (wrong): The user is an experienced C programmer and frowned because the bug is annoying. They want only where to start. A good answer: Answers the message as it would for anyone, with nothing added.

## The blocks

**digest**

```
[face] While typing "Segmentation fault (core dumped)", brows lowered (marked) and head tilted left (marked) for about 6.4 seconds.
```

**face**

```
[face]
typing "Segmentation fault (core dumped)": brows lowered marked + head tilted left marked 6.4s
```

**noisy-filtered**

```
[face]
typing "Segmentation fault (core dumped)": brows lowered marked + head tilted left marked 6.4s
```

**noisy**

```
[face]
typing "prints": inner brows raised trace + outer brows raised trace 0.5s
typing "'Segmentation": blink slight 0.2s
typing "Segmentation fault (core dumped)": brows lowered marked + head tilted left marked 6.4s
typing "file.": brows lowered trace 0.3s
typing "Where": blink slight 0.3s
typing "start?": blink slight 0.4s
```

**telegraphic**

```
[face]
typing "Segmentation fault (core dumped)" brows lowered marked+head tilted left marked 6.4
```

## The answers

### haiku-5-5 · none · rep 1

Start by finding the exact line that crashes. The config read is probably just where the bad data first gets used.

1. **Get a backtrace.** Build with debug symbols and no optimization, then run it under a debugger:
   ```sh
   gcc -g -O0 -Wall -Wextra -o myprog main.c
   gdb ./myprog        # Linux; on macOS use: lldb ./myprog
   (gdb) run path/to/config
   (gdb) bt            # shows the file and line that crashed
   ```
   Or run `valgrind ./myprog` (Linux) or build with `-fsanitize=address -g`, which reports the bad read or write with a line number.

2. **Check the config-reading code for the usual causes:**
   - **`fopen` returned NULL** (wrong path, wrong working directory, no permission) and the code used the handle anyway.
   - **A buffer or pointer was never allocated or initialized**, for example `char *val;` used before `malloc`, or a struct field not set.
   - **A lookup returned NULL and was used**: `strchr` or `strtok` on a line with no `=`, or a key search that found nothing, followed by `+ 1`, `strcpy`, or `strdup` on the result.
   - **A buffer overflow**: `fgets` or `scanf("%s")` into a fixed-size array with a line longer than the buffer, or `strcpy` with no length check.
   - **A value from the file used as an index or size**: `arr[atoi(val)]` with a value out of range, or `malloc(n)` where `n` is garbage or negative after a failed parse.
   - **Missing return checks**: `fscanf` or `sscanf` returned fewer fields than expected, so the variables it should have set are still uninitialized.

3. **Add a quick check.** Print each value right after it is parsed. The last print before the crash shows which key or line is bad, and the file's line endings and trailing whitespace are worth checking too (`cat -A config`).

If you paste the config-reading function and a sample config (with any secrets removed), I can point to the likely line. The workspace here is empty, so I can't see your code yet.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name \"*.c\" -o -name \"*.h\" -o -name \"Makefile\" -o -name \"*.conf\" -o -name \"*.cfg\" -o -name \"*.ini\" \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · none · rep 2

The workspace is empty, so I can't see your code. Here's where I'd start.

**1. Get the exact line.** Rebuild with debug info and run it under a debugger:

```sh
gcc -g -O0 -Wall -Wextra -o prog *.c
gdb ./prog          # on macOS: lldb ./prog
(gdb) run
(gdb) bt            # backtrace: the top frame is the faulting line
```

If you have a core file, run `ulimit -c unlimited` before the program, then `gdb ./prog core`, and `bt`.

**2. Or let AddressSanitizer name the bug.** It reports the exact out-of-bounds or NULL access and the line:

```sh
gcc -g -O0 -fsanitize=address,undefined -o prog *.c && ./prog
```

**3. Check the usual suspects in the config-reading code.** Since the crash comes right after reading the file, look at:

- **`fopen` / `malloc` / `strdup` return values** that aren't checked for NULL.
- **Lookups that can return NULL**, such as `strtok`, `strchr`, or your own `get_value("key")`, followed by a dereference without a check.
- **Fixed-size buffers** written with `strcpy`, `sprintf`, or `fgets` with the wrong size. A line longer than the buffer, or a value without a `'\0'`, overflows it.
- **Off-by-one errors** when a line has no trailing newline, or the file is empty or has a blank line.
- **`sscanf`/`scanf`** with `%s` into a non-pointer or an unsized array.
- **Uninitialized pointers** or a struct field that was never set before the code uses it.

**4. Narrow it down if the debugger isn't available.** Add `fprintf(stderr, "reached X\n");` at points after the config read. The last message printed tells you which step crashes.

If you paste the config-reading function, a sample of the config file, and the `bt` output, I can point at the exact line.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name \"*.c\" -o -name \"*.h\" -o -name \"Makefile\" -o -name \"*.conf\" -o -name \"*.cfg\" -o -name \"*.ini\" \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · none · rep 3

The workspace is empty, so I can't see your code yet. Here's where I'd start.

1. **Get the exact line.** Rebuild with debug info and a sanitizer, then run it again:
   ```
   gcc -g -O0 -fsanitize=address,undefined -o prog *.c
   ./prog
   ```
   ASan prints the file and line of the bad access. Without ASan, run `gdb ./prog`, then `run`, then `bt`. On macOS, use `lldb ./prog`, then `run`, then `bt`.

2. **Check the code right after the config read.** The crash usually comes from one of these:
   - A pointer returned by the config parser (a `get_value()`-style lookup, for example) is `NULL` because the key is missing, and it gets dereferenced.
   - `fopen`, `malloc`, or `strdup` returned `NULL` and the code didn't check.
   - A string read into a fixed buffer isn't null-terminated, or a line is longer than the buffer (`fgets` with the wrong size, `strcpy`, `sscanf("%s")` with no width).
   - A number from the config is used as an array index or size without a range check.
   - A `char *` pointing into a temporary or freed buffer is used after the parser has returned.

3. **Shrink the input.** Try a minimal config: one line, then remove keys one at a time. If the crash goes away when a specific key is missing or present, you've found the field the code mishandles.

4. **Confirm the parser's return values.** Add a check after every config lookup, for example `if (!val) { fprintf(stderr, "missing key X\n"); exit(1); }`. Then the bug shows up as a clear message instead of a crash.

If you paste the function that reads the config, the code that uses its results, and the config file (or the gdb/ASan backtrace), I can point to the specific line.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name \"*.c\" -o -name \"*.h\" -o -name \"Makefile\" -o -name \"*.conf\" -o -name \"*.cfg\" -o -name \"*.ini\" \\) 2>/dev/null | head -50","timeout":20}`

### sonnet-5-5 · none · rep 1

Start by getting the crash location, then work backward from it.

**1. Rebuild with debug info**
```
gcc -g -O0 -fsanitize=address,undefined -o myprog *.c
./myprog
```
AddressSanitizer prints the exact line and kind of bad access (NULL deref, overflow, use-after-free), usually with a stack trace. This is often the whole answer.

**2. If you'd rather use a debugger**
```
gdb ./myprog
(gdb) run
(gdb) bt
(gdb) frame 0
(gdb) info locals
(gdb) print *ptr
```
`bt` shows the call chain. Check which pointer in frame 0 is NULL or garbage.

**3. Or use a core dump / Valgrind**
```
valgrind --track-origins=yes ./myprog
```

**Likely culprits right after reading a config file:**
- `fopen` returned NULL (wrong path or working directory) and you never checked it. `fgets`, `fscanf` and `fclose` on NULL will crash.
- `strtok`, `strchr` or `strstr` returned NULL and you used the result directly, for example on a line with no `=`.
- A fixed-size buffer overflowed by a long line (`char buf[64]` with `fscanf("%s")` or `strcpy`).
- A config struct or string field that was never `malloc`'d, or was freed and then used.
- `atoi` or `strdup` results used without checking that the key was present.
- A loop that processes the last line without a trailing newline, or a blank line, and runs past the end.

**4. Quick bisect**
Add `fprintf(stderr, "here 1\n");` after each step following the read. The last line printed shows how far the program got.

If you paste the `bt` or ASan output, plus the config-parsing code, I can point at the exact bug.

### sonnet-5-5 · none · rep 2

Start by getting the crash location from the debugger. It will point you to the line.

1. **Rebuild with symbols and a sanitizer**
   ```
   gcc -g -O0 -fsanitize=address,undefined -o app main.c
   ./app
   ```
   ASan prints the exact line and the kind of bug: overflow, use-after-free, or NULL dereference. This often solves it on its own.

2. **Get a backtrace** if you'd rather use a debugger:
   ```
   gdb ./app
   (gdb) run
   (gdb) bt
   (gdb) frame 0
   (gdb) info locals
   ```
   You can also use `valgrind ./app`.

3. **Check the usual suspects right after a config read:**
   - `fopen` returned `NULL` (wrong path or working directory) and you never checked it.
   - `fgets`, `strtok`, `strchr` or `getenv` returned `NULL` and you used the result anyway. A missing key or a malformed line causes this.
   - A fixed-size buffer overflowed (`strcpy`, `sscanf("%s")`, `gets`) on a long line.
   - A config struct or pointer is uninitialized, or you `free`d it or closed the `FILE*` and then used it.
   - `fclose` was called twice, or you used the `FILE*` after closing it.
   - A `sscanf` format doesn't match its arguments, for example `%d` given a non-pointer.
   - An `atoi(NULL)` or `strlen(NULL)` call on a value that was never set.

4. **Narrow it down.** If the debugger shows nothing useful, add `fprintf(stderr, ...)` markers around the config parsing. Use stderr because it isn't buffered, so the output appears before the crash.

If you paste the backtrace, or the config-reading function and a sample config, I can point to the exact bug.

### sonnet-5-5 · none · rep 3

**Start by getting a backtrace.** Guessing is slower.

1. **Rebuild with debug info and no optimization:**
   ```
   gcc -g -O0 -fsanitize=address,undefined -o myprog *.c
   ./myprog
   ```
   AddressSanitizer usually names the exact line and the kind of error (null deref, overflow, use-after-free).

2. **If that doesn't settle it, use a debugger:**
   ```
   gdb ./myprog
   (gdb) run
   (gdb) bt
   (gdb) frame 0
   (gdb) info locals
   ```
   The top frame is the line that crashed. Check which pointer is NULL or garbage.

3. **Or use Valgrind** (on Linux):
   ```
   valgrind --track-origins=yes ./myprog
   ```

**Likely causes right after reading a config file:**
- `fopen` returned NULL (wrong path or cwd) and you never checked it. You then call `fgets` or `fscanf` on it, or `fclose(NULL)`.
- `fgets`, `strtok` or `strchr` returned NULL, and you used the result without checking. Examples are a missing `=` in a line, or an empty line.
- A fixed-size buffer overflowed because a config line is longer than expected, or you used `strcpy` or `sscanf("%s")` without a width.
- A struct or array of settings was never allocated or initialized, or `malloc` failed and you didn't check.
- You used a string after `free`, or you returned a pointer to a local buffer.
- `fscanf` or `printf` format specifiers don't match the argument types, or the arguments are missing.
- You closed the file, then kept using pointers into its buffer.

**Quick check:** put `fprintf(stderr, "after read\n");` at a few points. Use stderr because it is unbuffered, so the output isn't lost in the crash.

If you paste the `bt` output and the config-parsing code, I can point at the exact bug.

### haiku-5-5 · face@face2 · rep 1

**Segmentation fault** means the program touched memory it isn't allowed to use, such as a NULL pointer or a position past the end of an array. **(core dumped)** means the OS saved a snapshot of the process memory at the crash, which a debugger can open.

Since the crash comes right after the config read, start with the config code:

1. **Get the exact line.** Rebuild with debug info and no optimization, then run it in a debugger:
   ```
   gcc -g -O0 -fsanitize=address -o prog prog.c
   ./prog
   ```
   AddressSanitizer prints the file and line of the bad access. Without it, run `gdb ./prog`, then `run`, then `bt` (or `lldb ./prog`, `run`, `bt` on macOS). The backtrace shows the crashing line.

2. **Check the usual suspects in the config-reading code:**
   - `fopen` returns NULL (wrong path or no file), and the code uses the result anyway.
   - A key is missing, so `strtok`, `strchr`, or a lookup returns NULL and gets dereferenced.
   - A line longer than the buffer overflows a fixed-size `char[]` (`fgets` or `strcpy` into a small array).
   - Parsed values go into an array or struct without a bounds check.
   - A pointer or struct is used before it is allocated or initialized.

3. **If you're stuck,** add `fprintf(stderr, ...)` after each step of the config read to see how far it gets.

I didn't find your source in this workspace (it's empty). If you paste the config-reading function and a sample config file, I can point at the exact line.

> tool call `bash`: `{"command":"ls -la; find . -maxdepth 3 \\( -name \"*.c\" -o -name \"*.h\" -o -name \"Makefile\" -o -name \"core*\" \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · face@face2 · rep 2

A segfault means the program touched memory it doesn't own, usually through a NULL or garbage pointer or an out-of-bounds write. The OS stopped it, and "core dumped" means it saved a snapshot of the crash.

Since the crash comes right after the config read, start there:

1. **Get the exact line.** On macOS, build with debug info and sanitizers, then run it:
   ```
   clang -g -O0 -fsanitize=address -Wall -Wextra prog.c -o prog
   ./prog
   ```
   AddressSanitizer prints the file and line of the bad access. If you prefer a debugger, run `lldb ./prog`, then `run`, then `bt` to get a backtrace.

2. **Check the config-reading code first.** These are the usual causes:
   - `fopen` returned NULL (wrong path or file missing) and the code used the result anyway.
   - A key is missing from the file, so a lookup or `strtok` returned NULL and was dereferenced.
   - A fixed-size buffer overflowed on a longer line, or a string was never NUL-terminated.
   - `malloc` or `calloc` returned NULL and wasn't checked, or a struct pointer was used before it was allocated.

3. **Print the values at that line.** If the crash is in a `strcpy`, `sscanf` or `->` access, print the pointer and buffer sizes just before it to see which one is NULL or too small.

If you paste the config-reading function and the config file's format, I can point to the likely line.

> tool call `bash`: `{"command":"ls -la; find . -maxdepth 3 \\( -name \"*.c\" -o -name \"*.h\" -o -name \"*.conf\" -o -name \"*.cfg\" -o -name \"Makefile\" \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · face@face2 · rep 3

**Segmentation fault** means the program touched memory it doesn't own, usually through a NULL or otherwise bad pointer, or by writing past the end of a buffer. **(core dumped)** means the OS saved a snapshot of memory to a core file.

The workspace is empty, so I can't see your code. Here is where I'd start:

1. **Get the crash line.** Rebuild with debug info and no optimization: `cc -g -O0 -o app main.c`. Then run it under a debugger:
   - macOS: `lldb ./app`, then `run`, and when it crashes, `bt`.
   - Linux: `gdb ./app`, then `run`, and when it crashes, `bt`.

   The top frame of the backtrace is the line that crashed.

2. **Inspect the variables on that line.** Use `print name` in the debugger. If a pointer shows `0x0` or a garbage address, that is the bug. Then find where that pointer was assigned.

3. **Check the config-reading code first**, since the crash comes right after it:
   - `fopen()` returns NULL when the file is missing or the path is wrong. Using that handle crashes.
   - Fixed-size buffers: `char buf[64]` filled by `fgets`, `strcpy` or `sscanf("%s")` overflows on a longer line.
   - `strchr`, `strtok` or `getline` results that are NULL when a line has no `=` or a key is missing, and then get used.
   - Trailing newlines or spaces that stop a key lookup from matching.
   - Struct fields or pointers the config is supposed to set, used before they are allocated or assigned.
   - `malloc` return values that aren't checked.

4. **For a clearer report**, rebuild with `cc -g -fsanitize=address -o app main.c`. AddressSanitizer names the exact error (overflow, use-after-free, NULL) and the line, instead of a bare segfault.

If you paste the config-reading function and the `bt` output, I can point to the likely line.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name \"*.c\" -o -name \"*.h\" -o -name \"*.conf\" -o -name \"*.cfg\" -o -name \"Makefile\" \\) 2>/dev/null | head -50","timeout":20}`

### sonnet-5-5 · face@face2 · rep 1

A segfault means your program touched memory it isn't allowed to (the OS killed it). "Core dumped" just means it saved a snapshot of the crashed process, which you can inspect.

**Start here:**

1. **Rebuild with debug info and sanitizers**
   ```
   gcc -g -O0 -fsanitize=address,undefined -o prog main.c
   ./prog
   ```
   AddressSanitizer usually prints the exact line and the kind of bad access.

2. **Or get a backtrace with gdb**
   ```
   gdb ./prog
   (gdb) run
   (gdb) bt
   ```
   The top frame in `bt` that is your code is where to look. If you have a core file: `gdb ./prog core`.

3. **Or use valgrind**: `valgrind ./prog` reports invalid reads and writes with line numbers (build with `-g`).

**Likely culprits right after reading a config file:**
- `fopen` returned `NULL` (wrong path or working directory) and you used the `FILE *` without checking.
- Using a pointer from `fgets`, `strtok`, `strchr`, or `getenv` that returned `NULL`, for example on a line with no `=`.
- A fixed-size buffer overflowed by a long line (`strcpy`, `sscanf("%s")`, `gets`).
- Missing `NUL` terminator, or `fclose` called twice or before the data was used.
- Parsed values stored in a struct or array that was never allocated, or indexed past its end.
- `sscanf`/`fscanf` format specifiers that don't match the arguments (a missing `&`, for example).

If you paste the config-reading function and the `bt` output, I can point to the exact cause.

### sonnet-5-5 · face@face2 · rep 2

A segfault means your program touched memory it isn't allowed to touch. Typical causes are dereferencing a NULL or freed pointer, or reading or writing past the end of a buffer. "(core dumped)" only means the OS saved a snapshot of the crash. It isn't a second error.

Since it crashes right after the config read, these are the usual suspects:

- **`fopen` returned NULL.** The path is wrong or the working directory differs, and the code then calls `fgets` or `fscanf` on that NULL.
- **Unchecked parse results.** A missing key makes `strtok`, `strchr` or `strstr` return NULL, and the code dereferences it.
- **Fixed-size buffers.** A long line overflows `char buf[64]`, or `strcpy` and `sscanf("%s")` have no length limit.
- **Use after `fclose` or `free`.** For example, you keep a pointer into a buffer you've already released.
- **Uninitialized struct or pointer fields.** A config struct that was never `memset` or `calloc`'d.

**Steps, in order:**

1. Rebuild with debug info and sanitizers:
   ```
   gcc -g -O0 -fsanitize=address,undefined -o prog prog.c
   ./prog
   ```
   AddressSanitizer usually prints the exact line and the kind of bad access.

2. If that isn't enough, run it under a debugger:
   ```
   gdb ./prog
   (gdb) run
   (gdb) bt
   ```
   `bt` shows the call stack at the crash. Use `frame N` and `print var` to inspect the values.

3. Or use Valgrind if you can't recompile: `valgrind ./prog`.

4. Check every return value in the config code: `fopen`, `malloc`, `fgets` and `strtok`.

If you paste the config-reading function and the `bt` or ASan output, I can point to the exact bug.

### sonnet-5-5 · face@face2 · rep 3

A segfault means your program touched memory it isn't allowed to (a bad pointer, usually NULL or already freed). "Core dumped" just means the OS saved a snapshot of the crash, which a debugger can read.

**Start here:**

1. **Rebuild with debug info and sanitizers:**
   ```
   gcc -g -O0 -fsanitize=address,undefined -o myprog main.c
   ./myprog
   ```
   AddressSanitizer usually prints the exact line and the kind of bad access (NULL dereference, buffer overflow, use-after-free).

2. **Or get a backtrace with gdb:**
   ```
   gdb ./myprog
   (gdb) run
   (gdb) bt
   ```
   `bt` shows the call chain at the crash. Look at the first frame that is in your code.

3. **Or use valgrind** if you can't recompile: `valgrind ./myprog`

**Likely causes right after reading a config file:**
- `fopen` returned NULL (wrong path or working directory) and the result was never checked.
- You parse a line, key or value that is missing (`strtok` or `strchr` returned NULL) and then use it.
- A fixed-size buffer overflowed (`char buf[64]` with `strcpy` or `sscanf("%s")` on a longer line).
- The config struct or its strings were never allocated or initialized, or the pointer was freed or `fclose`d and then used.
- You call `fclose` on a NULL or already-closed `FILE*`.

If you paste the backtrace, or the config-reading function, I can point at the exact line.

### haiku-5-5 · face@face · rep 1

The workspace I'm in is empty, so I haven't seen your code. Here's where I'd start.

1. **Get the crash location.** Rebuild with debug info and no optimization, then run it under a debugger:
   ```sh
   cc -g -O0 -o myprog *.c
   lldb ./myprog        # on macOS; gdb on Linux
   (lldb) run
   (lldb) bt            # backtrace: shows the exact file and line
   ```
   Your crash is probably in the config-loading code or the first function that uses its results.

2. **Let a sanitizer name the bug.** Rebuild with AddressSanitizer and UBSan, which report the overflow or bad pointer with a line number:
   ```sh
   cc -g -O0 -fsanitize=address,undefined -o myprog *.c && ./myprog
   ```

3. **Check the usual suspects in the config code:**
   - `fopen` return value not checked, so a NULL `FILE *` goes into `fgets`, `fscanf` or `fclose`.
   - A fixed-size buffer filled by `strcpy`, `sscanf("%s")` or `gets`-style reads without a length limit.
   - Strings not NUL-terminated after `strncpy` or a manual read.
   - `malloc` results used without a NULL check, or struct fields that are never allocated.
   - A config value that is missing or empty, so `NULL` reaches `strlen`, `strcmp` or `%s`. Or a parsed number used as an array index without a bounds check.
   - Stripping the newline with `s[strlen(s)-1] = 0` on an empty line, which writes to index -1.

4. **Confirm the config data.** Print each parsed value to `stderr` right after it's read. A value that's NULL, empty, huge or negative usually points straight at the bad line.

If you tell me the file names or paste the config-reading function (and the `bt` output if you get it), I can pinpoint the line.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name '*.c' -o -name '*.h' -o -name 'Makefile' -o -name '*.conf' -o -name '*.cfg' -o -name '*.ini' \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · face@face · rep 2

The message means the program touched memory it doesn't own, and the OS killed it. The crash comes right after the config read, so the bug is most likely in the code that handles the config's contents. Start here:

1. **Get the exact line.** Rebuild with debug info and AddressSanitizer, then run it:
   ```
   cc -g -O0 -fsanitize=address -fno-omit-frame-pointer -o prog *.c
   ./prog
   ```
   ASan prints the file and line of the bad access, which usually settles it. On Linux, `valgrind ./prog` does a similar job.

2. **Or get a backtrace.** On macOS, core dumps are usually off, so use lldb: `lldb ./prog`, then `run`, then `bt` after the crash. (gdb works the same way on Linux.)

3. **Check the code right after the config read.** The usual causes are:
   - A `NULL` pointer from `fopen`, `malloc`, `strtok`, or a key lookup that was not found, then dereferenced.
   - A fixed-size buffer overrun, for example `char buf[64]` filled by a longer line, or a missing `'\0'`.
   - A missing or extra value (a line with no `=`, an empty value) that the parser assumes is there.
   - An uninitialized struct field or pointer that is used before being set.

4. **Confirm with a bad input.** Run it with an empty config, a missing config, and one with a malformed line. If it only crashes on some of these, the parser's handling of that case is the bug.

If you paste the function that reads the config, and the config file with anything sensitive removed, I can point at the line. The workspace I have is empty, so I can't see your code yet.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name '*.c' -o -name '*.h' -o -name 'Makefile' -o -name '*.conf' -o -name '*.cfg' -o -name '*.ini' \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · face@face · rep 3

The stack trace will point at the exact line, so start there. Your workspace is empty, so I can't see the code yet.

1. **Get the crash location.** Rebuild with debug info and no optimisation, then run it under a debugger:
   ```
   gcc -g -O0 -Wall -Wextra -o prog main.c
   gdb ./prog          # on macOS: lldb ./prog
   (gdb) run
   (gdb) bt            # backtrace: the top frame is the faulting line
   ```
   Or run `valgrind ./prog` (Linux), or compile with `-fsanitize=address -g` to get a report that names the line.

2. **Check the usual suspects in the config-reading code**, since the crash comes right after it:
   - `fopen` returns `NULL` (wrong path, wrong working directory) and the code uses the handle anyway.
   - `strtok`, `strchr` or a lookup returns `NULL` for a missing or malformed key, and the code dereferences it.
   - `malloc`/`calloc` result not checked.
   - A fixed-size buffer (`char line[64]`, `strcpy`, `sscanf("%s")`) overflowed by a long line.
   - A value from the file used as an array index or pointer without a range check.
   - Reading past the end of the file, or a missing `\n` or terminator in the parsed string.

3. **Confirm with a test.** Print the parsed values right after each read, or try a config with a missing key, an empty file, and a very long line. If it crashes only on some inputs, you've found the bug.

If you paste the config-reading function, the config file's contents (or a sample), and the `bt` output, I can point to the exact line.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 3 \\( -name '*.c' -o -name '*.h' -o -name 'Makefile' -o -name '*.conf' -o -name '*.cfg' -o -name '*.ini' \\) 2>/dev/null | head -50","timeout":20}`

### sonnet-5-5 · face@face · rep 1

Start by getting the crash location from the debugger, then check the usual config-reading mistakes.

**1. Build with debug info and the sanitizer**
```
gcc -g -O0 -fsanitize=address,undefined -o myprog *.c
./myprog
```
AddressSanitizer prints the exact line and the kind of error (null dereference, buffer overflow, use-after-free) with a stack trace. This is often all you need.

**2. Or use a debugger**
```
gdb ./myprog
(gdb) run
(gdb) bt
```
`bt` shows the faulting line and the call chain. Use `lldb` on macOS (`run`, then `bt`). Then try `frame 1` and `print var` to inspect the pointers.

**3. Also run Valgrind if you're on Linux**
```
valgrind --track-origins=yes ./myprog
```

**Likely causes right after reading a config file**
- `fopen` returned `NULL` (wrong path or working directory) and the result wasn't checked, so `fgets`, `fscanf` or `fclose` crashed on it.
- `fgets` or `getline` returned `NULL` at EOF and the buffer was used anyway.
- `strtok`, `strchr` or `strstr` returned `NULL` (a line with no `=`, or a blank line) and was dereferenced.
- A fixed-size buffer overflowed on a long line, for example `strcpy` or `sscanf("%s")` without a width.
- A struct or string pointer was never allocated, or `malloc` failed and wasn't checked.
- `fclose` was called twice, or the data was freed and then used.
- A `fscanf` argument is missing `&`, or its format doesn't match the argument types.

If you paste the backtrace, or the config-parsing function, I can point to the exact bug.

### sonnet-5-5 · face@face · rep 2

Start by getting the crash location from the debugger. Guessing is slower.

**1. Rebuild with symbols and sanitizers**
```
gcc -g -O0 -fsanitize=address,undefined -o prog prog.c
./prog
```
AddressSanitizer prints the exact line and the kind of bad access (NULL dereference, buffer overflow, use-after-free). That is often the whole answer.

**2. If you'd rather use a debugger**
```
gdb ./prog
(gdb) run
(gdb) bt
(gdb) frame 0
(gdb) info locals
```
`bt` shows the call stack at the crash. Look at which pointer is NULL or garbage in `info locals`.

**3. Or use Valgrind**
```
valgrind --leak-check=full ./prog
```

**What usually goes wrong right after reading a config file**
- `fopen` returned NULL (wrong path or working directory) and the result was used without a check.
- `fgets`, `getline` or `strtok` returned NULL at the end of the file or on a malformed line, and the code then dereferenced it.
- `strtok` or `strchr` found no `=` or delimiter, so the code used a NULL pointer to parse the value.
- A fixed-size buffer is too small for a long line, or you used `sscanf("%s")` with no width limit.
- Struct or array fields were never allocated or initialised, or you `fclose`d the file and then kept using the `FILE*`.
- `strdup` or `malloc` results weren't checked, or the config struct was passed by value when it should have been passed by pointer.

**4. Narrow it down**
Check every return value in the config-reading code:
```c
FILE *f = fopen(path, "r");
if (!f) { perror("fopen"); return -1; }
```

If you paste the output of `bt` (or the ASan report) and the config-parsing function, I can point at the exact bug.

### sonnet-5-5 · face@face · rep 3

Start by getting the crash to point at a line. Don't guess yet.

**1. Rebuild with debug info and sanitizers**
```
gcc -g -O0 -fsanitize=address,undefined -o prog *.c
./prog
```
AddressSanitizer prints the exact line and the kind of bad access (NULL deref, buffer overflow, use-after-free).

**2. Or use a debugger**
```
gdb ./prog
(gdb) run
(gdb) bt
```
`bt` shows the call stack at the crash. Look at the top frame in your code, then use `frame N` and `print var` to see which pointer is NULL or garbage.

**3. Common causes right after reading a config file**
- `fopen` returned NULL (wrong path or working directory) and you never checked it, then `fgets`/`fscanf`/`fclose` got NULL.
- Parsing with `strtok`, `strchr` or `sscanf` returned NULL, and you used the result anyway.
- A line or field is longer than its buffer (`strcpy`, `sprintf`, `gets`, `%s` without a width).
- `fscanf` or `sscanf` is given a value instead of an address (missing `&`), or the wrong format specifier.
- The config struct or array was never allocated or initialised, or `malloc` failed.
- Using the data after `fclose` or `free`, or `fclose` called twice.
- An empty file, or a missing trailing newline or `=`, which makes your parser index past the end.

**4. Check later if needed**
- Run `valgrind ./prog` if you can't use sanitizers.
- Enable core dumps with `ulimit -c unlimited` and run `gdb ./prog core`.

If you paste the `bt` or ASan output, plus the config-reading code, I can point at the exact bug.
