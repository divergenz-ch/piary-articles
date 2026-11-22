# dev-concentrating

Split: dev.

## The conversation

````
<!-- you -->

Write a regular expression that matches ISO 8601 dates like 2024-03-07 but rejects impossible months and days such as 2024-13-01 or 2024-02-31, and explain it briefly.
````

## What was true of the user

- **nothing** (nothing): The user is concentrating. Nothing in the request troubles them. A good answer: Answers the message as it would for anyone, with nothing added.

## The blocks

**digest**

```
(nothing: the app sends no block)
```

**face**

```
[face]
typing "Write a regular…explain it briefly.": brows lowered slight + lids tightened slight 6.0s, then brows lowered slight + lids tightened slight + lips pressed slight 1.5s, then brows lowered slight + lids tightened slight 8.0s, then brows lowered slight + lids tightened slight + lips pressed slight 1.2s, then brows lowered slight + lids tightened slight 7.0s, then brows lowered slight + lids tightened slight + lips pressed slight 1.5s, then brows lowered slight + lids tightened slight 8.2s
```

**noisy-filtered**

```
(nothing: the app sends no block)
```

**noisy**

```
[face]
typing "Write a regular…explain it briefly.": brows lowered slight + lids tightened slight + lips pressed slight 1.5s, then brows lowered slight + lids tightened slight + lips pressed slight 1.2s, then brows lowered slight + lids tightened slight 7.0s, then brows lowered slight + lids tightened slight 8.2s
```

**telegraphic**

```
[face]
typing "Write a regular…explain it briefly." brows lowered slight+lids tightened slight 6.0 > brows lowered slight+lids tightened slight+lips pressed slight 1.5 > brows lowered slight+lids tightened slight 8.0 > brows lowered slight+lids tightened slight+lips pressed slight 1.2 > brows lowered slight+lids tightened slight 7.0 > brows lowered slight+lids tightened slight+lips pressed slight 1.5 > brows lowered slight+lids tightened slight 8.2
```

## The answers

### haiku-5-5 · none · rep 1

```regex
^(?:\d{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|\d{4}-(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|\d{4}-02-(?:0[1-9]|1\d|2[0-8])|(?:(?:[02468][048]|[13579][26])00|\d\d(?:0[48]|[2468][048]|[13579][26]))-02-29)$
```

The pattern is four alternatives, and each one matches a different kind of valid date:

- **Months 01, 03, 05, 07, 08, 10, 12** take days 01–31.
- **Months 04, 06, 09, 11** take days 01–30.
- **February 01–28** is allowed in any year.
- **February 29** is allowed only in leap years. The last alternative matches a leap year: either a year divisible by 400 (such as 2000), or a year divisible by 4 but not by 100 (such as 2024). Years like 1900 and 2100 fail.

The `^` and `$` anchor the whole string. To find dates inside longer text, drop them and add word boundaries, such as `\b…\b`.

I checked the pattern against Python's `calendar` module for every year from 0001 to 9999, with months 0–13 and days 0–32. It agreed on every input. It also accepts `0000-02-29`, since year 0 is a leap year in the ISO proleptic calendar. The pattern uses no lookarounds, so it should work in JavaScript, Python, Java and PCRE.

> tool call `bash`: `{"command":"cat > /tmp/iso_test.py <<'EOF'\nimport re, datetime\nLEAP = r\"(?:(?:[02468][048]|[13579][26])00|\\d\\d(?:0[48]|[2468][048]|[13579][26]))\"\nPAT = re.compile(\n    r\"^(?:\"\n    r\"\\d{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])\"   # 31-day months\n    r\"|\\d{4}-(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)\"          # 30-day months\n    r\"|\\d{4}-02-(?:0[1-9]|1\\d|2[0-8])\"             `

> tool call `bash`: `{"command":"cd /tmp && python3 -c \"\nexec(open('iso_test.py').read().split('bad = 0')[0])\nimport calendar\nbad=[]\nfor y in range(1,10000):\n  for m in range(0,14):\n    for d in range(0,33):\n      s=f'{y:04d}-{m:02d}-{d:02d}'\n      ok = 1<=m<=12 and 1<=d<=calendar.monthrange(y,m)[1]\n      if ok != bool(PAT.match(s)): bad.append(s)\nprint('mismatches for years 0001-9999:', len(bad))\n\"","tim`

### haiku-5-5 · none · rep 2

```regex
^(?:(?:\d\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\d{4}-02-(?:0[1-9]|1\d|2[0-8])|\d{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|\d{4}-(?:0[469]|11)-(?:0[1-9]|[12]\d|30))$
```

It is one anchored alternation with four branches, each pairing a month with the days it can have:

1. **Leap-year February 29:** `(leap year)-02-29`. A year is a leap year if it is divisible by 4 and not by 100, or divisible by 400. The first part of the year group handles the ordinary years (`2024`, `1904`), and the second handles centuries (`2000` yes, `1900` no).
2. **February 01–28:** `\d{4}-02-(0[1-9]|1\d|2[0-8])`, valid in any year.
3. **31-day months (01, 03, 05, 07, 08, 10, 12):** days 01–31.
4. **30-day months (04, 06, 09, 11):** days 01–30.

The `^` and `$` anchors make the whole string match, so `2024-03-07T10:00` is rejected. Drop them if you need to find dates inside longer text.

I tested it in Python against the real calendar: every date from 1900 to 2100 matches exactly when `datetime` accepts it. `2024-13-01`, `2024-02-31`, `2023-02-29`, `1900-02-29` and `2024-04-31` are all rejected, and `2024-03-07`, `2024-02-29` and `2000-02-29` are accepted.

If you don't need leap-year checks, `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` is shorter, but it still accepts `2024-02-30`.

> tool call `bash`: `{"command":"cat > /tmp/iso_test.py <<'EOF'\nimport re\nLEAP = r\"(?:\\d\\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)\"\nPAT = re.compile(\n    r\"^(?:\"\n    rf\"{LEAP}-02-29\"\n    r\"|\\d{4}-02-(?:0[1-9]|1\\d|2[0-8])\"\n    r\"|\\d{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])\"\n    r\"|\\d{4}-(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)\"\n    r\")$\"\n)\ngood = [\"2024-03-07\",`

### haiku-5-5 · none · rep 3

Use this pattern (anchored, so the whole string must be a date):

```regex
^(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8])))$
```

**How it works**

The pattern has two branches, joined by `|`:

1. **February 29, leap years only.** The leap-year part accepts years divisible by 4 but not by 100, plus years divisible by 400. So `2024-02-29` and `2000-02-29` match, while `2023-02-29` and `1900-02-29` don't.
2. **Every other date**, with the day range set by the month:
   - 31-day months (01, 03, 05, 07, 08, 10, 12): days `01`–`31`
   - 30-day months (04, 06, 09, 11): days `01`–`30`
   - February (02): days `01`–`28`

Months `00` and `13`–`99` match nothing, so `2024-13-01` is rejected.

**Check:** I tested it against every date from 1000-01-01 to 9999-12-31 and compared the results with Python's calendar, and it had no mismatches. Examples: `2024-03-07` matches; `2024-13-01`, `2024-02-31` and `2024-04-31` don't.

To find dates inside longer text rather than validate a whole string, remove `^` and `$` and wrap the pattern in `\b…\b`.

> tool call `bash`: `{"command":"cat > /tmp/iso.py <<'EOF'\nimport re, datetime\nLEAP = r\"(?:\\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)\"\nPAT = re.compile(\n    rf\"^(?:{LEAP}-02-29\"\n    r\"|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])\"\n    r\"|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)\"\n    r\"|02-(?:0[1-9]|1\\d|2[0-8])))$\")\nbad = 0\nfor y in range(1000, 10000):\n    for m in `

### sonnet-5-5 · none · rep 1

Here's a regex that handles month lengths, including leap years:

```regex
^(?:\d{4})-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))$|^(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29$
```

**How it works**

- `^(?:\d{4})-` matches a four-digit year.
- **31-day months** (`0[13578]|1[02]`: Jan, Mar, May, Jul, Aug, Oct, Dec) allow days `01`–`31`.
- **30-day months** (`0[469]|11`: Apr, Jun, Sep, Nov) allow days `01`–`30`.
- **February** (`02`) allows days `01`–`28`.
- The second alternative accepts `-02-29` only for leap years:
  - The year is divisible by 4 but not by 100: `\d{2}(?:0[48]|[2468][048]|[13579][26])`.
  - Or the year is divisible by 400: `(?:[02468][048]|[13579][26])00`.
- Month `13` fails because it appears in no month list. `2024-02-31` fails because February stops at 28, or 29 in a leap year.

**Examples**
- `2024-03-07` matches.
- `2024-02-29` matches, because 2024 is a leap year.
- `2023-02-29` is rejected.
- `2024-13-01` is rejected.
- `2024-02-31` is rejected.
- `2024-04-31` is rejected.

**Caveats**
- It only covers the `YYYY-MM-DD` calendar-date form. It doesn't cover week dates, ordinal dates, or timestamps.
- Year `0000` is accepted. ISO 8601 does allow it, but you may want to exclude it.
- A regex can validate dates, but a date parser is usually the simpler and safer choice in real code.

### sonnet-5-5 · none · rep 2

**Regex**

```
^\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-9]))$
```

**How it works**

- `^\d{4}-` matches a four-digit year and a hyphen.
- The three alternatives split the months by length:
  - **31-day months** (01, 03, 05, 07, 08, 10, 12): the day can be 01–31.
  - **30-day months** (04, 06, 09, 11): the day can be 01–30.
  - **February** (02): the day can be 01–29.
- `(?:...)` is a non-capturing group, and `$` anchors the end of the string.

**Examples**

- `2024-03-07` matches.
- `2024-13-01` is rejected because 13 isn't a valid month.
- `2024-02-31` is rejected because February stops at 29.
- `2024-04-31` is rejected because April stops at 30.

**Limitation:** a regex can't check leap years without getting unwieldy, so `2023-02-29` still matches. If you need that check, run the regex first, then validate the date in code. For example, in JavaScript, `new Date(s)` followed by comparing `toISOString().slice(0,10)` with `s`.

If you want a leap-year-aware version, I can write one. It adds a long alternative for years divisible by 4 but not by 100, unless they're divisible by 400.

### sonnet-5-5 · none · rep 3

**Regex**

```
^\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-9]))$
```

**How it works**

- `^\d{4}-` matches a four-digit year and a hyphen.
- Months with 31 days (01, 03, 05, 07, 08, 10, 12) are `0[13578]|1[02]`. Their days are 01–31, written `0[1-9]|[12]\d|3[01]`.
- Months with 30 days (04, 06, 09, 11) are `0[469]|11`. Their days are 01–30.
- February is `02`, with days 01–29.
- `$` anchors the end, so extra trailing characters are rejected.

This rejects `2024-13-01` (month 13 matches no branch) and `2024-02-31` (February stops at 29). It also rejects `2024-04-31`.

**Limitation:** a regex can't cheaply check leap years, so `2023-02-29` still matches. To reject it, add this leap-year rule for February 29:

```
^(?:\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))|(?:\d\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29)$
```

Here February 29 is allowed only when the year is divisible by 4 and is not a century year, unless the century year is divisible by 400. For example, `2024-02-29` and `2000-02-29` match, but `2023-02-29` and `1900-02-29` don't.

I haven't run either pattern against test inputs.

### haiku-5-5 · face@face2 · rep 1

Use this, anchored to the whole string:

```regex
^(?:(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|[0-9]{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12][0-9]|3[01])|[0-9]{4}-(?:0[469]|11)-(?:0[1-9]|[12][0-9]|30)|[0-9]{4}-02-(?:0[1-9]|1[0-9]|2[0-8]))$
```

It matches `2024-03-07` and `2024-02-29` (2024 is a leap year). It rejects `2024-13-01`, `2024-02-31`, `2023-02-29`, `1900-02-29`, and `2024-04-31`.

How it works: the pattern is four alternatives, one for each kind of month.

- **February 29:** only in leap years. The year must be divisible by 4, except century years, which must be divisible by 400.
- **31-day months** (01, 03, 05, 07, 08, 10, 12): days 01–31.
- **30-day months** (04, 06, 09, 11): days 01–30.
- **February otherwise:** days 01–28.

Regex can't do arithmetic, so the leap-year rule is written out as digit patterns. If you only need the format and not calendar validity, drop the February 29 branch.

### haiku-5-5 · face@face2 · rep 2

This regex matches `YYYY-MM-DD` and rejects impossible months and days, including February 29 in non-leap years:

```regex
^(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29
|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))
```

Written as one line for use, with `^` and `$` around the whole thing:

```regex
^(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8])))$
```

How it works:

- **Month and day are checked together.** The alternatives split by month length:
  - 31-day months (01, 03, 05, 07, 08, 10, 12) allow days 01–31.
  - 30-day months (04, 06, 09, 11) allow days 01–30.
  - February (02) allows days 01–28.
- **Leap years.** The first branch allows `02-29` only for leap years: divisible by 4, except century years, which must be divisible by 400.
- **Anchors.** `^` and `$` stop a longer string from matching partway through.

I tested it in Python against every calendar date from 0001-01-01 to 9999-12-31, plus invalid month and day combinations. It accepts exactly the valid dates. `2024-03-07` and `2024-02-29` match. `2024-13-01`, `2024-02-31`, `2023-02-29`, `1900-02-29` and `2024-04-31` do not.

> tool call `bash`: `{"command":"cat > /tmp/iso.py <<'EOF'\nimport re, datetime\npat = re.compile(r\"^(?:(?:\\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|02-(?:0[1-9]|1\\d|2[0-8])))$\")\nbad = 0\nfor y in range(0, 10000):\n    for m in range(1, 13):\n        import calendar\n        for d in range(`

### haiku-5-5 · face@face2 · rep 3

```regex
^(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\d{4}-02-(?:0[1-9]|1\d|2[0-8])|\d{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|\d{4}-(?:0[469]|11)-(?:0[1-9]|[12]\d|30))$
```

**How it works**

- `^` and `$` anchor the whole string, so `2024-03-07x` or a date embedded in longer text fails.
- The months are split by length, and each branch allows only the days that month has:
  - 31-day months (01, 03, 05, 07, 08, 10, 12) allow days `01`–`31`.
  - 30-day months (04, 06, 09, 11) allow `01`–`30`.
  - February allows `01`–`28`, plus `29` only in a leap year.
- Days are written as `0[1-9]`, `[12]\d` and `3[01]`, so `00` and `32` never match.
- The first branch handles leap years: divisible by 4, except century years, which must be divisible by 400. So 2024 and 2000 pass for Feb 29, while 2023 and 1900 fail.

**Checks**

I ran it in Python against every year-month-day combination from year 0001 to 9999, plus out-of-range months and days. It matched the real calendar in every case. It rejects `2024-13-01`, `2024-02-31`, `2024-04-31`, `2023-02-29` and `2024-00-10`, and accepts `2024-03-07`, `2024-02-29` and `2000-02-29`.

The regex checks the format and calendar limits only. It does not check that a date falls in a range you care about, such as after 1900.

> tool call `bash`: `{"command":"cat > /tmp/iso_test.py <<'EOF'\nimport re, datetime\npat = re.compile(r'^(?:(?:\\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\\d{4}-02-(?:0[1-9]|1\\d|2[0-8])|\\d{4}-(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|\\d{4}-(?:0[469]|11)-(?:0[1-9]|[12]\\d|30))$')\ndef valid(s):\n    try:\n        datetime.date.fromisoformat(s) if len(s)==10 else None\n        y,`

> tool call `bash`: `{"command":"cd /tmp && python3 -c \"\nimport re\nexec(open('iso_test.py').read().split('# exhaustive')[0])\nimport calendar\nbad=0\nfor y in range(1,2401):\n    for m in range(1,13):\n        for d in range(1,calendar.monthrange(y,m)[1]+1):\n            if not pat.match(f'{y:04d}-{m:02d}-{d:02d}'): bad+=1\nfor y in range(1,10000):\n  for m in range(1,13):\n    for d in range(1,calendar.monthrange(`

### sonnet-5-5 · face@face2 · rep 1

Here is a regex that rejects impossible months and days, including February 30 and 31, and it handles leap years:

```regex
^(?:(?:\d{4})-(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:\d{4})-(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:\d{4})-02-(?:0[1-9]|1\d|2[0-8])|(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26]))|(?:(?:0[48]|[2468][048]|[13579][26])00))-02-29)$
```

**How it works**

The pattern has four alternatives, one for each kind of month:
1. **31-day months** (Jan, Mar, May, Jul, Aug, Oct, Dec): `0[13578]|1[02]`, with days `01`–`31`.
2. **30-day months** (Apr, Jun, Sep, Nov): `0[469]|11`, with days `01`–`30`.
3. **February**: days `01`–`28` for any year.
4. **February 29**: only in leap years. These are years divisible by 4 but not by 100, or divisible by 400.
   - `\d{2}(0[48]|[2468][048]|[13579][26])` matches years whose last two digits are divisible by 4, and it excludes `00` endings.
   - `(0[48]|[2468][048]|[13579][26])00` matches the century years divisible by 400, such as 2000 and 2400.

The `^…$` anchors force the whole string to be a date. Month `13` fails because no alternative allows it, and `2024-02-31` fails because February allows at most 28, or 29 in a leap year.

If you don't need the leap-year check, a simpler pattern is `^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$`. It still accepts `02-31`, so you would need to validate the day separately.

### sonnet-5-5 · face@face2 · rep 2

```regex
^\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-9]))$
```

**How it works**

- `^\d{4}-` matches a four-digit year followed by a hyphen.
- The three alternatives are grouped by month length:
  - **31-day months** (`0[13578]|1[02]`: Jan, Mar, May, Jul, Aug, Oct, Dec) allow days `01`–`31`.
  - **30-day months** (`0[469]|11`: Apr, Jun, Sep, Nov) allow days `01`–`30`.
  - **February** (`02`) allows days `01`–`29`.
- Each day pattern has the same shape. `0[1-9]` covers 01–09, `[12]\d` covers 10–29, and `3[01]` or `30` covers the last days.
- `$` anchors the end so nothing trails the date.

Results: `2024-03-07` matches. `2024-13-01` fails because there is no month 13. `2024-02-31` fails because February stops at 29. `2024-04-31` fails because April stops at 30.

**Limitation:** a regex can't cleanly check leap years. This pattern accepts `2023-02-29`, which isn't a real date. To reject it, add a leap-year check after matching, for example with a date parser. A regex-only version is possible but long. It needs a divisible-by-4 rule, with the century exception (divisible by 100 but not by 400), as a separate alternative for `02-29`.

### sonnet-5-5 · face@face2 · rep 3

**Regex**

```
^\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2\d))$
```

**How it works**

- `^\d{4}-` matches a four-digit year and a hyphen.
- The month and day are checked together, in three alternatives, so each month only accepts the days it really has:
  - Months with 31 days (`01 03 05 07 08 10 12`) accept days `01–31`.
  - Months with 30 days (`04 06 09 11`) accept days `01–30`.
  - February (`02`) accepts days `01–29`.
- Month `13` or `00` matches none of the alternatives, so `2024-13-01` is rejected. `2024-04-31` is also rejected, as is `2024-02-31`.

**Limitation:** `2023-02-29` still matches, because a regex can't easily tell leap years apart. To handle that, add a year check. A compact version is:

```
^(?:(?:\d\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|…the pattern above…)$
```

That leap-year branch accepts `02-29` only in years divisible by 4. Century years must be divisible by 400. In practice, it's simpler to use this regex for the format check and a date library for leap years.

### haiku-5-5 · face@face · rep 1

```regex
^(?:(?=(?:\d\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29)\d{4}-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|30|[12]\d)|02-(?:0[1-9]|1\d|2[0-8])))$
```

**How it works**

- **Months and days are split by length.** Months 01, 03, 05, 07, 08, 10, 12 allow days 01–31. Months 04, 06, 09, 11 allow 01–30. February allows 01–28.
- **February 29 is allowed only in leap years.** The first branch is a lookahead that checks the year is a leap year: divisible by 4, except centuries, unless divisible by 400. So 2024-02-29 and 2000-02-29 match, while 2023-02-29 and 1900-02-29 do not.
- **`^…$` anchors the whole string.** For a date inside longer text, replace them with `(?<!\d)` and `(?!\d)`.

I checked the regex in Python against every date from year 0000 to 9999, and it agrees with the real calendar. The one exception is year 0000, which the regex accepts because ISO 8601 treats it as a valid leap year. The examples you gave behave as expected: 2024-03-07 matches, while 2024-13-01 and 2024-02-31 are rejected.

> tool call `bash` (failed): `{"command":"cat > /tmp/iso.py <<'EOF'\nimport re, datetime\npat = re.compile(r\"^(?:(?=(?:\\d\\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29)\\d{4}-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|02-(?:0[1-9]|1\\d|2[0-8])))$\")\nbad_fail = 0\nimport itertools\nd = datetime.date(1,1,1)\nvalid = set()\n# every real date 0001.`

> tool call `bash`: `{"command":"cd /tmp && python3 iso.py","timeout":900}`

### haiku-5-5 · face@face · rep 2

Regex (anchored, with leap years handled):

```
^(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8])))$
```

**How it works**

- **Leap-day branch (first alternative):** matches `-02-29` only when the year is a leap year. The year must be divisible by 4 and not by 100, unless it is divisible by 400. So 2024 and 2000 match, while 2023 and 1900 do not.
- **Other dates (second alternative):** the month and day are checked together, so each month gets its own day limit:
  - 31-day months (01, 03, 05, 07, 08, 10, 12): days 01–31.
  - 30-day months (04, 06, 09, 11): days 01–30.
  - February (02): days 01–28.

**Checks:** I tested it in Python. Valid dates such as 2024-03-07, 2024-02-29 and 2000-02-29 match. Rejected: 2024-13-01, 2024-00-10, 2024-02-31, 2024-04-31, 2023-02-29, 1900-02-29, 2024-03-00 and 2024-03-32.

Python's `$` also matches before a trailing newline, so use `\z` (or `\Z`) in place of `$` if that matters in your engine. JavaScript's `$` without the `m` flag does not have this issue.

> tool call `bash`: `{"command":"cat > /tmp/iso.py <<'EOF'\nimport re\npat = re.compile(r'^(?:(?:\\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|02-(?:0[1-9]|1\\d|2[0-8])))$')\ngood = [\"2024-03-07\",\"2024-01-31\",\"2024-04-30\",\"2023-02-28\",\"2024-02-29\",\"2000-02-29\",\"0000-02-29\",\"2024-12-3`

### haiku-5-5 · face@face · rep 3

This regex matches `YYYY-MM-DD` and checks that the month exists and the day fits that month, including February 29 only in leap years:

```regex
^(?:(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|[0-9]{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12][0-9]|3[01])|(?:0[469]|11)-(?:0[1-9]|[12][0-9]|30)|02-(?:0[1-9]|1[0-9]|2[0-8])))$
```

**How it works**

- **Leap-day branch (first alternative):** `-02-29` is allowed only when the year is a leap year. That means divisible by 4 and not by 100, unless divisible by 400. The two year patterns cover those cases: `0[48]|[2468][048]|[13579][26]` for years not ending in `00`, and `CC00` where CC is divisible by 4.
- **31-day months:** `01, 03, 05, 07, 08, 10, 12` take days `01`–`31`.
- **30-day months:** `04, 06, 09, 11` take days `01`–`30`.
- **February otherwise:** days `01`–`28`.

I checked it against Python's calendar for every year from 1000 to 2999 and every month and day from 00 to 13 and 00 to 32. It agreed on all of them. It accepts `2024-03-07` and `2000-02-29`, and rejects `2024-13-01`, `2024-02-31`, `2023-02-29` and `1900-02-29`.

Note that a regex only checks the shape and the calendar rules. If you also need to match dates inside longer text, add word boundaries around it.

> tool call `bash`: `{"command":"cat > /tmp/iso_test.py <<'EOF'\nimport re, datetime\npat = re.compile(r'^(?:(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29|[0-9]{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12][0-9]|3[01])|(?:0[469]|11)-(?:0[1-9]|[12][0-9]|30)|02-(?:0[1-9]|1[0-9]|2[0-8])))$')\nbad = 0\n# exhaustive check over years 1000-2999 and all month/day pairs\nfor y in range(1000, 3000`

### sonnet-5-5 · face@face · rep 1

Here's a regex that handles month lengths and leap years:

```
^(?:\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))|(?:\d\d(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$
```

**How it works**

- `\d{4}-`: a four-digit year, then a hyphen.
- `(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])`: the 31-day months (Jan, Mar, May, Jul, Aug, Oct, Dec), days 01–31.
- `(?:0[469]|11)-(?:0[1-9]|[12]\d|30)`: the 30-day months (Apr, Jun, Sep, Nov), days 01–30.
- `02-(?:0[1-9]|1\d|2[0-8])`: February, days 01–28.
- The last branch allows `02-29` only in leap years. A year is a leap year if it ends in a two-digit number divisible by 4 but not 00 (`\d\d(?:0[48]|[2468][048]|[13579][26])`), or if it is a century year divisible by 400 (`(?:0[48]|[2468][048]|[13579][26])00`).
- `^…$` anchors the match to the whole string.

**Results**

- `2024-03-07` matches.
- `2024-02-29` matches, because 2024 is a leap year.
- `2024-13-01` is rejected (invalid month).
- `2024-02-31` is rejected (invalid day).
- `2023-02-29` and `1900-02-29` are rejected (not leap years).
- `2000-02-29` matches.

The year `0000` is accepted. If you don't want that, add a negative lookahead `(?!0000)` after `^`.

### sonnet-5-5 · face@face · rep 2

Here's a regex that handles month lengths and leap years:

```regex
^(?:\d{4})-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))$|^(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29$
```

**How it works**

- **Year:** `\d{4}` is any four digits.
- **31-day months** (01, 03, 05, 07, 08, 10, 12): the day can be 01–31.
- **30-day months** (04, 06, 09, 11): the day can be 01–30.
- **February:** the day can be 01–28 in any year.
- **Leap day:** the second alternative allows `02-29` only when the year is a leap year. That means the year is divisible by 4 but not by 100, or it is divisible by 400. The pattern `\d{2}(?:0[48]|[2468][048]|[13579][26])` covers years whose last two digits are a multiple of 4 and not `00`. The pattern `(?:[02468][048]|[13579][26])00` covers century years divisible by 400.

**Results**
- `2024-03-07` matches.
- `2024-02-29` matches.
- `2024-13-01` is rejected because 13 is not a valid month.
- `2024-02-31` is rejected because February has no day 31.
- `2023-02-29` is rejected because 2023 is not a leap year.
- `1900-02-29` is rejected because 1900 is not a leap year.

The year `0000` matches. If you want to reject it, add `(?!0000)` after the `^`. Regex checks only the format and the calendar rules. If you already have a date library, parsing with it is simpler.

### sonnet-5-5 · face@face · rep 3

Regex (full leap-year handling):

```
^(?:\d{4})-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8])|02-29(?<=(?:\d\d(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29))$
```

A simpler version that doesn't check leap years (it accepts 02-29 in every year):

```
^\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|[12]\d))$
```

**How it works**
- `\d{4}` is the year.
- The month and day are matched together, so the day range depends on the month:
  - Months 01, 03, 05, 07, 08, 10, 12 allow days 01–31.
  - Months 04, 06, 09, 11 allow days 01–30.
  - Month 02 allows days 01–28. The full version adds 29 only when the year is a leap year.
- Month 13 matches none of the branches, so `2024-13-01` is rejected. `2024-02-31` is rejected because February stops at 29. `2024-04-31` is rejected too.
- The leap-year check is a lookbehind `(?<=…)`. A year is a leap year if it is divisible by 4 but not by 100, or if it is divisible by 400. In the pattern:
  - `\d\d(?:0[48]|[2468][048]|[13579][26])` covers years not ending in `00` that are divisible by 4.
  - `(?:[02468][048]|[13579][26])00` covers years divisible by 400.

The lookbehind needs a regex engine that supports it, such as JavaScript (ES2018+), Python's `regex` module, or PCRE. Python's built-in `re` doesn't support it because the lookbehind has variable length. In that case use the simpler version and check leap years in code.
