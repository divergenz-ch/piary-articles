# noisy-technical

## The conversation

````markdown
In Python, why does `0.1 + 0.2 == 0.3` give False, and what should I use instead?
````

## What was sent after the last message (signal)

```
[expressions: what the camera saw of the user's face since your last answer. These are movements, not feelings, and a movement can have a cause that is not on the screen.]
- while typing this message: jaw dropped 3 s (a yawn); lower lip bitten; gaze left the screen to the left for 8 s; brows raised, brief; head turned 20°; eyes closed 1.5 s; one cheek puffed
```

## What was sent after the last message (signal as emotion labels)

```
[emotions: what the camera's classifier read from the user's face since your last answer, with its confidence.]
- while typing this message: surprise (0.52), 3 s; neutral (0.61); sadness (0.30); fear (0.21); face not toward the screen for 8 s
```

## First run: Sonnet 5.5, lowest effort

### no signal, rep 1

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value:
> 
> - `0.1` is stored as 0.1000000000000000055511151231257827…
> - `0.2` is stored as 0.200000000000000011102230246251565…
> - `0.1 + 0.2` rounds to 0.3000000000000000444089209850062616…
> - `0.3` is stored as 0.299999999999999988897769753748434…
> 
> The sum and the literal `0.3` land on different neighbouring doubles, so `==` returns False. `0.1 + 0.2` prints `0.30000000000000004`.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)               # True; default rel_tol=1e-09
>   math.isclose(a, b, abs_tol=1e-12)          # add abs_tol when comparing against 0
>   ```
>   `rel_tol` is relative, so it fails for values near 0. In that case you need `abs_tol`.
> - **Use exact decimal arithmetic**, for example for money:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings. `Decimal(0.1)` copies the float's error.
> - **Use exact rationals:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> - **Use integers**, such as cents instead of dollars.
> - **For NumPy arrays,** use `numpy.isclose` or `numpy.allclose`.

### no signal, rep 2

> Python floats are binary (IEEE 754 double) numbers. 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable value. When you add 0.1 and 0.2, the rounding errors don't land on the double nearest 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897...
> ```
> 
> The two values differ by about 5.5e-17, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (the usual choice):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>   math.isclose(a, b, abs_tol=1e-9)              # add abs_tol when comparing against 0
>   ```
> - **Exact decimal arithmetic**, for money or other base-10 values:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build them from strings, not floats.
> - **Exact rationals**:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> - **Integers**, such as cents instead of dollars, also avoid the problem.
> - **NumPy arrays:** use `numpy.isclose` or `numpy.allclose`.
> 
> `math.isclose` is the right choice for ordinary float work. Use `Decimal` or integers when you need exact decimal results.

### no signal, rep 3

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value, and the rounding errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.3:.20f}", f"{0.1+0.2:.20f}"
> ('0.29999999999999998890', '0.30000000000000004441')
> ```
> 
> The sum lands one representable value above the double nearest 0.3, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09)
>   math.isclose(x, 0.0, abs_tol=1e-9)            # set abs_tol when comparing against 0
>   ```
>   `rel_tol` alone never matches values near zero, so pass `abs_tol` for those.
> - **Use exact decimal arithmetic.** This suits money and other base-10 values:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build the values from strings, not floats.
> - **Use rational numbers.** `fractions.Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> - **Use integers.** For example, store cents instead of dollars.
> - **For NumPy arrays**, use `np.isclose` or `np.allclose`.

### signal: nothing notable, rep 1

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each one is stored as the nearest representable value:
> 
> - `0.1` is stored as 0.1000000000000000055511151231257827…
> - `0.2` is stored as 0.200000000000000011102230246251565…
> - `0.3` is stored as 0.299999999999999988897769753748434…
> 
> Adding 0.1 and 0.2 rounds to 0.30000000000000004441…, which is the next double above the one stored for `0.3`. So `0.1 + 0.2` prints `0.30000000000000004`, and `==` compares the exact bits, so it returns False.
> 
> **What to use instead**
> 
> 1. **Compare with a tolerance.** This is the usual choice:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                  # True; default rel_tol=1e-09
>    math.isclose(x, 0.0, abs_tol=1e-12)           # add abs_tol when comparing near zero
>    ```
>    `rel_tol` alone never works when one side is 0, so set `abs_tol` for that case.
> 
> 2. **Use exact decimal arithmetic.** This suits money and other base-10 values:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build `Decimal` from strings, not floats. `Decimal(0.1)` carries the binary error with it.
> 
> 3. **Use exact rationals:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> 
> 4. **Use integers**, for example cents instead of dollars.
> 
> For NumPy arrays, use `np.isclose` or `np.allclose`.

### signal: nothing notable, rep 2

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable value. The errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}", f"{0.3:.20f}"
> ('0.10000000000000000555', '0.29999999999999998890')
> ```
> 
> The sum rounds to a double slightly above the double nearest 0.3, so `==` is False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (most cases):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                 # True (rel_tol=1e-09 by default)
>   math.isclose(x, 0, abs_tol=1e-9)             # use abs_tol when comparing near zero
>   ```
> - **Exact decimal arithmetic** (money, base-10 values):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Construct from strings, not floats.
> - **Exact rationals**:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> - **NumPy arrays**: `np.isclose` / `np.allclose`.
> - **Integers**: for money, store cents as `int`.
> 
> Don't use a hardcoded `abs(a - b) < 1e-9` everywhere. It breaks for very large or very small magnitudes, which is why `math.isclose` is the better default.

### signal: nothing notable, rep 3

> Python floats are binary (IEEE 754 double precision). 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.3:.20f}"
> '0.29999999999999998890'
> ```
> 
> The sum lands one representable step above the double nearest 0.3, so `==` returns False.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance** (the usual answer):
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                  # True
>    math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12)
>    ```
>    Set `abs_tol` when comparing against 0. The default `rel_tol` alone fails there.
> 
> 2. **`decimal.Decimal`** for exact decimal arithmetic, such as money. Build it from strings, not floats:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
> 
> 3. **`fractions.Fraction`** for exact rational values:
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>    ```
> 
> 4. **Integers** (e.g. cents) for currency: `10 + 20 == 30`.
> 
> 5. **NumPy**: `numpy.isclose` or `numpy.allclose` for arrays.
> 
> Avoid hand-rolled `abs(a-b) < 1e-9`. It breaks for very large or very small magnitudes, which `math.isclose` handles.

### signal, rep 1

> Python floats are binary (IEEE 754 doubles). 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as a nearby approximation. Adding 0.1 and 0.2 gives `0.30000000000000004`, which is a different double from the one stored for `0.3`. `==` compares exact values, so it returns False.
> 
> What to use instead:
> 
> ```python
> import math
> 
> # Floats: compare with a tolerance
> math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-9)
> math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
> 
> # Exact decimal arithmetic (money, etc.)
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> # Exact rationals
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> Rules of thumb:
> - Use `math.isclose` for general float comparisons. Add `abs_tol` when a value may be near 0.
> - Use `Decimal` for currency and other base-10 values. Or store integer cents.
> - Use `numpy.isclose` or `numpy.allclose` for arrays.
> - In tests, use `pytest.approx`.

### signal, rep 2

> Python floats are binary (IEEE 754 doubles). 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable value. Adding 0.1 and 0.2 gives `0.30000000000000004`, which is a different double from the one stored for `0.3`. So `==` returns False.
> 
> **What to use instead**
> 
> Compare with a tolerance:
> 
> ```python
> import math
> math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-09)
> math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
> ```
> 
> If you need exact decimal arithmetic, for example for money:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> For NumPy arrays, use `np.isclose` or `np.allclose`.
> 
> **Rule of thumb:** use `math.isclose` for measurements and calculations, and `Decimal` or integers (such as cents) for currency.

### signal, rep 3

> Python floats are binary (IEEE 754 doubles). Values like 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as a slightly different number:
> 
> - `0.1` is stored as 0.1000000000000000055511151231257827…
> - `0.2` is stored as 0.200000000000000011102230246251565…
> - `0.1 + 0.2` rounds to 0.3000000000000000444089209850062616…
> - `0.3` is stored as 0.299999999999999988897769753748434…
> 
> The sum and the literal `0.3` land on different doubles, so `==` returns False. `0.1 + 0.2` prints as `0.30000000000000004`.
> 
> **What to use instead**
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)                    # True (default rel_tol=1e-09)
> math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12) # add abs_tol when comparing against 0
> ```
> 
> For exact decimal arithmetic, such as money, use `decimal` or `fractions`:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> In tests, use `pytest.approx(0.3)` or `unittest`'s `assertAlmostEqual`. For arrays, use `numpy.isclose` or `numpy.allclose`.
> 
> **Rule of thumb:** never compare floats with `==`. Use `math.isclose` for measurements and `Decimal` for currency.

### signal as emotion labels, rep 1

> Python floats are binary (IEEE 754 double precision), and 0.1, 0.2 and 0.3 have no exact binary representation. Each is stored as the nearest representable value. When you add 0.1 and 0.2, the rounding errors combine:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3
> ```
> 
> The two results are neighbouring but different doubles, so `==` returns False. This isn't a Python bug. Any language using IEEE 754 doubles behaves the same way.
> 
> **What to use instead**
> 
> 1. **`math.isclose`** is the usual choice for floats:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                   # True (default rel_tol=1e-09)
>    math.isclose(a, b, abs_tol=1e-12)              # add abs_tol when comparing against 0
>    ```
>    `rel_tol` alone never matches values near 0, so set `abs_tol` for those cases.
> 
> 2. **`decimal.Decimal`** is for exact decimal arithmetic, such as money. Build it from strings, not floats:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
> 
> 3. **`fractions.Fraction`** gives exact rational arithmetic:
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>    ```
> 
> 4. **Integers**: store cents instead of dollars, for example.
> 
> 5. **NumPy**: use `np.isclose` or `np.allclose` for arrays.
> 
> For tests, `pytest.approx(0.3)` does the same job as `isclose`.

### signal as emotion labels, rep 2

> Python floats are binary (IEEE 754 double) numbers. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.3:.20f}", f"{0.1+0.2:.20f}"
> ('0.29999999999999998890', '0.30000000000000004441')
> ```
> 
> The two results are different doubles, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                # True (rel_tol=1e-09 by default)
>   math.isclose(a, b, abs_tol=1e-9)            # add abs_tol when comparing against 0
>   ```
>   Without `abs_tol`, `isclose(1e-12, 0)` is False, because the default tolerance is relative.
> - **Use `decimal.Decimal` for exact decimal arithmetic**, such as money. Build it from strings, not floats:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
> - **Use `fractions.Fraction` for exact rational arithmetic:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> - **Use integers**, for example cents instead of dollars.
> - **In NumPy,** use `np.isclose` or `np.allclose`.

### signal as emotion labels, rep 3

> Python floats are binary (IEEE 754 double) numbers. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.3:.20f}"
> '0.29999999999999998890'
> ```
> 
> The sum lands on a different double than the literal `0.3`, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (the usual choice):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                 # True
>   math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12)
>   ```
>   Set `abs_tol` when you compare against values near 0. The default `rel_tol` alone fails there.
> - **Exact decimal arithmetic** (money, fixed precision):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings, not floats.
> - **Exact rationals:** `fractions.Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` gives True.
> - **NumPy arrays:** use `np.isclose` or `np.allclose`.
> - **Integers:** for money, store cents as `int`.

### signal + guidance, rep 1

> Python floats are binary (IEEE 754 doubles). Most decimal fractions, such as 0.1, 0.2 and 0.3, have no exact binary representation, so each one is stored as the nearest representable value. When you add the stored values, the result is slightly off:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually stored as 0.299999999999999988...
> ```
> 
> `==` compares the exact stored bits, and those two doubles differ in the last place.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-9)
>   math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
>   ```
>   In NumPy, use `np.isclose` or `np.allclose`.
> 
> - **Use exact decimal arithmetic.** This suits money and other cases where decimal digits matter:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings, not floats.
> 
> - **Use rationals.** `Fraction` gives exact results:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Use integers.** For money, store cents as `int`.
> 
> Never use `==` on computed floats. Use `math.isclose` for scientific or general work. Use `Decimal` or integers for money.

### signal + guidance, rep 2

> Python floats are binary (IEEE 754 double precision). Most decimal fractions, such as 0.1, 0.2 and 0.3, have no exact binary representation. Each is stored as the nearest representable value, and the small errors show up in arithmetic:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The sum of the two rounded values is not the same double as the rounded `0.3`, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09)
>   math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
>   ```
> - **Use exact decimal arithmetic**, for example for money:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings, not floats.
> - **Use exact rationals:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> - **Use integers**, such as cents instead of dollars.
> - **For NumPy arrays**, use `np.isclose` or `np.allclose`.
> 
> Don't use `round(x, n) == y` as a general fix. It can still fail near rounding boundaries.

### signal + guidance, rep 3

> Python floats are binary (IEEE 754 double) numbers. 0.1, 0.2 and 0.3 have no exact binary representation, in the same way 1/3 has no exact decimal one. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The sum lands one step away from the double that `0.3` is stored as, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (most cases):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True
>   math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12)
>   ```
>   Set `abs_tol` when you compare against 0. The default `rel_tol` is relative only, so `isclose(1e-20, 0)` is False.
> 
> - **Exact decimal arithmetic** (money, where decimal digits matter):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build them from strings, not floats.
> 
> - **Exact rationals:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> 
> - **Integers**, such as cents instead of dollars.
> 
> - **NumPy arrays:** use `np.isclose` or `np.allclose`.
> 
> Don't use `==` on floats that come from computation.

## Haiku 5.5, lowest effort

### no signal, rep 1

> Floats are stored in binary, and most decimal fractions have no exact binary form. `0.1` and `0.2` are stored as the nearest binary approximations, so their sum is slightly off:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3
> ```
> 
> The sum and `0.3` land on different neighbouring doubles, so `==` returns `False`. Each operation rounds to the nearest representable value, and those small errors don't cancel.
> 
> **What to use instead:**
> 
> - **Comparing floats:** `math.isclose`, which compares within a tolerance.
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)   # True
>   ```
>   Pass `abs_tol=` when comparing against 0, because the default relative tolerance doesn't help there.
> 
> - **Money or exact decimal values:** `decimal.Decimal`, built from strings, not floats.
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
> 
> - **Exact rational arithmetic:** `fractions.Fraction`.
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)   # True
>   ```
> 
> - **NumPy arrays:** `numpy.isclose` or `numpy.allclose`.
> 
> Avoid `round(a + b, 2) == 0.3` as a general fix. It works for one known precision, but it hides the problem and fails when the precision changes.

### no signal, rep 2

> Because `0.1`, `0.2` and `0.3` have no exact representation in binary floating point, which is what Python's `float` uses. Each is stored as the nearest binary fraction, so there are small errors:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3
> ```
> 
> The sum lands one unit in the last place above the stored `0.3`, so the comparison is `False`. Any decimal fraction that isn't a sum of powers of two (like 0.1) behaves this way.
> 
> What to use instead depends on the goal:
> 
> - **Comparing floats:** use a tolerance.
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9)
>   math.isclose(x, 0.0, abs_tol=1e-12)       # use abs_tol when comparing to zero
>   ```
>   NumPy has the equivalent `np.isclose` and `np.allclose` for arrays.
> 
> - **Exact decimal arithmetic** (money, tax, anything that must match decimal rules):
>   ```python
>   from decimal import Decimal
>   Decimal('0.1') + Decimal('0.2') == Decimal('0.3')   # True
>   ```
>   Build the values from strings, not floats, so the error never enters. `Decimal('0.1')` is exact, but `Decimal(0.1)` carries the float error.
> 
> - **Exact rational arithmetic:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Money specifically:** store integer cents (or the smallest unit) and convert only for display.

### no signal, rep 3

> Floats are stored in binary, and most decimal fractions, including 0.1 and 0.2, have no exact binary representation. Each is stored as the nearest binary approximation, and their sum lands slightly above 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9 by default)
> math.isclose(x, 0.0, abs_tol=1e-12)       # compare to zero: pass abs_tol, since rel_tol is useless near 0
> ```
> 
> If you need exact decimal arithmetic, such as for money, use `Decimal` and build it from strings:
> 
> ```python
> from decimal import Decimal
> 
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
> ```
> 
> Building a `Decimal` from a float (`Decimal(0.1)`) carries the binary error over, so use strings.
> 
> `fractions.Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)` is also exact. For NumPy arrays, use `np.isclose` or `np.allclose`.

### signal, rep 1

> Floats are stored in binary, and 0.1 and 0.2 have no exact binary representation. Each is slightly off, and their sum lands on the neighbouring double, not the one nearest 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)            # True (relative tolerance 1e-9)
> math.isclose(0.1 + 0.2, 0.3, abs_tol=1e-12)  # use abs_tol too when comparing values near 0
> ```
> 
> If you need exact decimal arithmetic, for example with money, use `Decimal` and pass strings:
> 
> ```python
> from decimal import Decimal
> 
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")  # True
> ```
> 
> `Decimal(0.1)` built from a float would carry the float's error, so always pass a string. `fractions.Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is also exact.

### signal, rep 2

> `0.1` and `0.2` have no exact binary floating-point representation, so each is stored as the nearest binary fraction. Their sum comes out slightly above the float nearest to `0.3`:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, use a tolerance:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9)
> math.isclose(x, 0, abs_tol=1e-12)         # for values near zero, set an absolute tolerance
> ```
> 
> If you need exact decimal arithmetic, for example with money, use `Decimal` with string arguments:
> 
> ```python
> from decimal import Decimal
> 
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
> ```
> 
> Or store amounts as integers (for example, cents). For NumPy arrays, use `np.isclose`.

### signal, rep 3

> Floats are stored in binary (base 2), and `0.1` and `0.2` have no exact binary representation. Each is rounded slightly, and the rounding errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> >>> f"{0.3:.20f}"
> '0.29999999999999998890'
> ```
> 
> The sum is the nearest double to 0.30000000000000004, which is not the same double as the one nearest to 0.3.
> 
> What to use depends on the goal:
> 
> - **Comparing floats:** use a tolerance.
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9)
>   math.isclose(x, 0.0, abs_tol=1e-12)       # needed when comparing to zero
>   ```
> - **Money or other exact decimal values:** use `Decimal` with string arguments, or work in integer units such as cents.
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Passing a float to `Decimal` (`Decimal(0.1)`) keeps the binary error, so use strings.
> - **Exact rational numbers:** use `fractions.Fraction`, e.g. `Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)`.

### signal + guidance, rep 1

> Floats are stored in binary, and 0.1 and 0.2 have no exact binary representation. Each is slightly off, so their sum lands a little above the double nearest to 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9)
> math.isclose(x, 0.0, abs_tol=1e-12)       # needed when comparing against 0
> ```
> 
> If you need exact decimal arithmetic, for example for money, use `Decimal` with string arguments:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
> ```
> 
> `Fraction` also gives exact results: `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is `True`. For NumPy arrays, use `np.isclose` or `np.allclose`.

### signal + guidance, rep 2

> Floats are stored in binary, and most decimal fractions, including 0.1, 0.2 and 0.3, have no exact binary representation. Each is stored as the nearest binary approximation, and the rounding errors don't cancel when you add them:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)   # True (default relative tolerance 1e-9)
> ```
> 
> For values near zero, where a relative tolerance is not enough, add an absolute one: `math.isclose(a, b, abs_tol=1e-12)`.
> 
> If the numbers are really decimal quantities, such as money, use `Decimal` so the arithmetic is exact in base 10:
> 
> ```python
> from decimal import Decimal
> 
> Decimal('0.1') + Decimal('0.2') == Decimal('0.3')   # True
> ```
> 
> Build the values from strings, as shown. `Decimal(0.1)` would copy the binary approximation.

### signal + guidance, rep 3

> Floats are stored in binary, and most decimal fractions, including 0.1 and 0.2, have no exact binary representation. Each is rounded slightly, so the sum is slightly off from the rounded 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> Use a tolerance comparison for floats:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9 by default)
> math.isclose(0.1 + 0.2, 0.3, abs_tol=1e-12)  # True, also works when comparing to 0
> ```
> 
> If you need exact decimal arithmetic, for example with money, use `decimal`:
> 
> ```python
> from decimal import Decimal
> 
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")  # True
> ```
> 
> `Decimal` values must be built from strings. `Decimal(0.1)` captures the float's binary error.

## Haiku 5.5, high effort

### no signal, rep 1

> Floats are stored in binary (base 2), and most decimal fractions like 0.1 have no exact binary form. Each literal is rounded to the nearest representable double:
> 
> - `0.1` is stored as about `0.1000000000000000055511`
> - `0.2` is stored as about `0.2000000000000000111022`
> - Their sum rounds to `0.30000000000000004`, while `0.3` is stored as about `0.299999999999999988898`
> 
> So the two sides differ in the last bits:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> **What to use instead**
> 
> - **Comparing floats:** use a tolerance.
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9)
>   math.isclose(x, 0, abs_tol=1e-12)         # compare to zero: set abs_tol
>   ```
>   For NumPy arrays, use `numpy.isclose`.
> 
> - **Exact decimal values, such as money:** use `Decimal`, built from strings.
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   `Decimal("0.1")` is exact, but `Decimal(0.1)` inherits the binary error, so pass strings.
> 
> - **Exact rational values:** use `fractions.Fraction`.
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Money in practice:** store integer cents (`1010` instead of `10.10`) and convert only for display.
> 
> Use `math.isclose` when you are comparing measurements or computed results. Use `Decimal` or integers when the values must match decimal rules exactly.

### no signal, rep 2

> Floats are stored in binary, and most decimal fractions have no exact binary form. `0.1` and `0.2` are both slightly off, and their sum lands on the neighbouring double:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> Use a tolerance comparison for computed floats:
> 
> ```python
> import math
> math.isclose(0.1 + 0.2, 0.3)   # True (relative tolerance 1e-9 by default)
> math.isclose(x, 0, abs_tol=1e-12)  # when comparing against zero, give an absolute tolerance
> ```
> 
> For money or any value that must be exact in decimal, use `Decimal` with string arguments:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")  # True
> ```
> 
> `Fraction` also works for exact rational arithmetic. If you use NumPy, use `np.isclose` or `np.allclose` instead.

### no signal, rep 3

> Floats are stored in binary, and most decimal fractions have no exact binary form. `0.1` and `0.2` are each stored as the nearest binary fraction, slightly above the true value. Their sum is `0.30000000000000004`, while the float nearest to `0.3` is slightly below the true value, so the two results differ:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> Which fix to use depends on the situation:
> 
> - **Comparing floats that come from arithmetic:** use `math.isclose`. It compares with a relative tolerance, so `math.isclose(0.1 + 0.2, 0.3)` is `True`. Pass `abs_tol=` when the values may be near zero, because a relative tolerance alone never accepts a comparison against 0.
> - **Exact decimal arithmetic, such as money:** use `decimal.Decimal`, and build it from strings. `Decimal("0.1") + Decimal("0.2") == Decimal("0.3")` is `True`. `Decimal(0.1)` gives the binary error back, so avoid it.
> - **Exact rational numbers:** use `fractions.Fraction`. `Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)` is `True`.
> - **Arrays:** use `numpy.isclose` or `numpy.allclose`.
> 
> Avoid `round(a + b, 2) == 0.3` as a general fix. It often works, but it still compares binary floats and only hides the error at one precision.

### signal, rep 1

> Floats are stored in binary, and most decimal fractions can't be represented exactly in base 2. `0.1` and `0.2` are each slightly off, so their sum lands on a neighbouring value:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.3:.20f}"
> '0.29999999999999998890'
> ```
> 
> The sum and `0.3` are different doubles, so `==` returns `False`.
> 
> What to use instead depends on the case:
> 
> - **Comparing floats:** use `math.isclose`, which checks relative difference:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)              # True
>   ```
>   Pass `abs_tol=1e-12` as well if either value might be near zero, since a relative check alone fails for values like `0` versus `1e-17`. With NumPy arrays, use `numpy.isclose` or `numpy.allclose`.
> 
> - **Exact decimal arithmetic (money, tax, anything that must match decimal rules):** use `decimal.Decimal`, and build it from strings:
>   ```python
>   from decimal import Decimal
>   Decimal('0.1') + Decimal('0.2') == Decimal('0.3')   # True
>   ```
>   `Decimal(0.1)` would copy the binary error in, so don't pass floats.
> 
> - **Exact rational numbers:** use `fractions.Fraction`:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)   # True
>   ```
> 
> - **Money in particular:** store integer cents, such as `30` instead of `0.30`, and convert only for display.

### signal, rep 2

> Floats are stored in binary, and most decimal fractions, including 0.1 and 0.2, have no exact binary form. Each one is stored as the nearest binary approximation, and the sum lands slightly above 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> math.isclose(0.1 + 0.2, 0.3)              # True
> math.isclose(x, 0)                        # needs abs_tol, e.g. abs_tol=1e-12
> ```
> 
> If you need exact decimal arithmetic, for example with money, use `Decimal` with string inputs or `Fraction`:
> 
> ```python
> from decimal import Decimal
> from fractions import Fraction
> 
> Decimal('0.1') + Decimal('0.2') == Decimal('0.3')          # True
> Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)        # True
> ```
> 
> In tests, `pytest.approx` does the same job: `assert 0.1 + 0.2 == pytest.approx(0.3)`.

### signal, rep 3

> Floats are stored in binary (IEEE 754 double precision), and most decimal fractions like 0.1 and 0.2 have no exact binary form. Each is stored as the nearest representable value:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> The sum rounds to a value one step away from the nearest double to 0.3, so the comparison fails.
> 
> Use one of these instead:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)          # True: compares within a relative tolerance (1e-9 by default)
> math.isclose(x, 0.0, abs_tol=1e-12)   # for values near zero, pass abs_tol, since relative tolerance alone fails there
> 
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True: exact decimal arithmetic, good for money
> 
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True: exact rational arithmetic
> ```
> 
> For most code, `math.isclose` is the right choice. Use `Decimal` (built from strings) when the values must be exact decimals, such as currency.

### signal + guidance, rep 1

> Floats are stored in binary, and 0.1 and 0.2 have no exact binary representation. Each is stored slightly off, so their sum is `0.30000000000000004`, which is not the float closest to 0.3.
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> math.isclose(0.1 + 0.2, 0.3)   # True
> ```
> 
> `math.isclose` uses a relative tolerance of 1e-9 by default. If you compare values near zero, pass an absolute tolerance too, for example `math.isclose(x, 0, abs_tol=1e-12)`.
> 
> If you need exact decimal arithmetic, as with money, use `Decimal` with string inputs:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
> ```
> 
> For exact rational arithmetic, use `Fraction`:
> 
> ```python
> from fractions import Fraction
> Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)   # True
> ```
> 
> In tests, `pytest.approx` does the same job: `assert 0.1 + 0.2 == pytest.approx(0.3)`.

### signal + guidance, rep 2

> Floats are stored in binary, and most decimal fractions like 0.1 and 0.2 have no exact binary representation. Each is stored as the nearest binary approximation, and their sum rounds to a value slightly above 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, check that they are close enough:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)              # True (default rel_tol=1e-9)
> math.isclose(x, 0.0, abs_tol=1e-12)       # use abs_tol when comparing with zero
> ```
> 
> If you need exact decimal arithmetic, for example with money, use `Decimal` built from strings:
> 
> ```python
> from decimal import Decimal
> 
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
> ```
> 
> With NumPy arrays, use `np.isclose(a, b)` or `np.allclose(a, b)`.

### signal + guidance, rep 3

> Python floats are binary (base 2), and `0.1` and `0.2` have no exact binary representation, just as `1/3` has none in decimal. Each is stored as the nearest double, and their sum rounds to a value slightly above the double nearest `0.3`:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> To compare floats, allow a small tolerance:
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)              # True (relative tolerance 1e-9)
> math.isclose(x, 0.0, abs_tol=1e-12)       # use abs_tol when comparing near zero
> ```
> 
> If you need exact decimal arithmetic, for example with money, use `decimal` or `fractions`:
> 
> ```python
> from decimal import Decimal
> from fractions import Fraction
> 
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")          # True
> Fraction(1, 10) + Fraction(1, 5) == Fraction(3, 10)        # True
> ```
> 
> For money specifically, storing integer cents is also common.

## Sonnet 5.5, lowest effort

### no signal, rep 1

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value:
> 
> - `0.1` is stored as 0.1000000000000000055511151231257827…
> - `0.2` is stored as 0.200000000000000011102230246251565…
> - `0.1 + 0.2` rounds to 0.3000000000000000444089209850062616…
> - `0.3` is stored as 0.299999999999999988897769753748434…
> 
> The sum and the literal `0.3` land on different neighbouring doubles, so `==` returns False. `0.1 + 0.2` prints `0.30000000000000004`.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)               # True; default rel_tol=1e-09
>   math.isclose(a, b, abs_tol=1e-12)          # add abs_tol when comparing against 0
>   ```
>   `rel_tol` is relative, so it fails for values near 0. In that case you need `abs_tol`.
> - **Use exact decimal arithmetic**, for example for money:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings. `Decimal(0.1)` copies the float's error.
> - **Use exact rationals:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> - **Use integers**, such as cents instead of dollars.
> - **For NumPy arrays,** use `numpy.isclose` or `numpy.allclose`.

### no signal, rep 2

> Python floats are binary (IEEE 754 double) numbers. 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable value. When you add 0.1 and 0.2, the rounding errors don't land on the double nearest 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897...
> ```
> 
> The two values differ by about 5.5e-17, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (the usual choice):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>   math.isclose(a, b, abs_tol=1e-9)              # add abs_tol when comparing against 0
>   ```
> - **Exact decimal arithmetic**, for money or other base-10 values:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build them from strings, not floats.
> - **Exact rationals**:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> - **Integers**, such as cents instead of dollars, also avoid the problem.
> - **NumPy arrays:** use `numpy.isclose` or `numpy.allclose`.
> 
> `math.isclose` is the right choice for ordinary float work. Use `Decimal` or integers when you need exact decimal results.

### no signal, rep 3

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value, and the rounding errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.3:.20f}", f"{0.1+0.2:.20f}"
> ('0.29999999999999998890', '0.30000000000000004441')
> ```
> 
> The sum lands one representable value above the double nearest 0.3, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09)
>   math.isclose(x, 0.0, abs_tol=1e-9)            # set abs_tol when comparing against 0
>   ```
>   `rel_tol` alone never matches values near zero, so pass `abs_tol` for those.
> - **Use exact decimal arithmetic.** This suits money and other base-10 values:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build the values from strings, not floats.
> - **Use rational numbers.** `fractions.Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> - **Use integers.** For example, store cents instead of dollars.
> - **For NumPy arrays**, use `np.isclose` or `np.allclose`.

### signal, rep 1

> Python floats are binary (IEEE 754 doubles). 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as a nearby approximation. Adding 0.1 and 0.2 gives `0.30000000000000004`, which is a different double from the one stored for `0.3`. `==` compares exact values, so it returns False.
> 
> What to use instead:
> 
> ```python
> import math
> 
> # Floats: compare with a tolerance
> math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-9)
> math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
> 
> # Exact decimal arithmetic (money, etc.)
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> # Exact rationals
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> Rules of thumb:
> - Use `math.isclose` for general float comparisons. Add `abs_tol` when a value may be near 0.
> - Use `Decimal` for currency and other base-10 values. Or store integer cents.
> - Use `numpy.isclose` or `numpy.allclose` for arrays.
> - In tests, use `pytest.approx`.

### signal, rep 2

> Python floats are binary (IEEE 754 doubles). 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable value. Adding 0.1 and 0.2 gives `0.30000000000000004`, which is a different double from the one stored for `0.3`. So `==` returns False.
> 
> **What to use instead**
> 
> Compare with a tolerance:
> 
> ```python
> import math
> math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-09)
> math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
> ```
> 
> If you need exact decimal arithmetic, for example for money:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> For NumPy arrays, use `np.isclose` or `np.allclose`.
> 
> **Rule of thumb:** use `math.isclose` for measurements and calculations, and `Decimal` or integers (such as cents) for currency.

### signal, rep 3

> Python floats are binary (IEEE 754 doubles). Values like 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as a slightly different number:
> 
> - `0.1` is stored as 0.1000000000000000055511151231257827…
> - `0.2` is stored as 0.200000000000000011102230246251565…
> - `0.1 + 0.2` rounds to 0.3000000000000000444089209850062616…
> - `0.3` is stored as 0.299999999999999988897769753748434…
> 
> The sum and the literal `0.3` land on different doubles, so `==` returns False. `0.1 + 0.2` prints as `0.30000000000000004`.
> 
> **What to use instead**
> 
> ```python
> import math
> 
> math.isclose(0.1 + 0.2, 0.3)                    # True (default rel_tol=1e-09)
> math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12) # add abs_tol when comparing against 0
> ```
> 
> For exact decimal arithmetic, such as money, use `decimal` or `fractions`:
> 
> ```python
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> In tests, use `pytest.approx(0.3)` or `unittest`'s `assertAlmostEqual`. For arrays, use `numpy.isclose` or `numpy.allclose`.
> 
> **Rule of thumb:** never compare floats with `==`. Use `math.isclose` for measurements and `Decimal` for currency.

### signal + guidance, rep 1

> Python floats are binary (IEEE 754 doubles). Most decimal fractions, such as 0.1, 0.2 and 0.3, have no exact binary representation, so each one is stored as the nearest representable value. When you add the stored values, the result is slightly off:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually stored as 0.299999999999999988...
> ```
> 
> `==` compares the exact stored bits, and those two doubles differ in the last place.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-9)
>   math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
>   ```
>   In NumPy, use `np.isclose` or `np.allclose`.
> 
> - **Use exact decimal arithmetic.** This suits money and other cases where decimal digits matter:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings, not floats.
> 
> - **Use rationals.** `Fraction` gives exact results:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Use integers.** For money, store cents as `int`.
> 
> Never use `==` on computed floats. Use `math.isclose` for scientific or general work. Use `Decimal` or integers for money.

### signal + guidance, rep 2

> Python floats are binary (IEEE 754 double precision). Most decimal fractions, such as 0.1, 0.2 and 0.3, have no exact binary representation. Each is stored as the nearest representable value, and the small errors show up in arithmetic:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The sum of the two rounded values is not the same double as the rounded `0.3`, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09)
>   math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
>   ```
> - **Use exact decimal arithmetic**, for example for money:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings, not floats.
> - **Use exact rationals:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> - **Use integers**, such as cents instead of dollars.
> - **For NumPy arrays**, use `np.isclose` or `np.allclose`.
> 
> Don't use `round(x, n) == y` as a general fix. It can still fail near rounding boundaries.

### signal + guidance, rep 3

> Python floats are binary (IEEE 754 double) numbers. 0.1, 0.2 and 0.3 have no exact binary representation, in the same way 1/3 has no exact decimal one. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The sum lands one step away from the double that `0.3` is stored as, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (most cases):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True
>   math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12)
>   ```
>   Set `abs_tol` when you compare against 0. The default `rel_tol` is relative only, so `isclose(1e-20, 0)` is False.
> 
> - **Exact decimal arithmetic** (money, where decimal digits matter):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build them from strings, not floats.
> 
> - **Exact rationals:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> 
> - **Integers**, such as cents instead of dollars.
> 
> - **NumPy arrays:** use `np.isclose` or `np.allclose`.
> 
> Don't use `==` on floats that come from computation.

## Sonnet 5.5, high effort

### no signal, rep 1

> Python floats are IEEE 754 binary64 numbers. Most decimal fractions, including 0.1, 0.2 and 0.3, have no exact binary representation. Each one is stored as the nearest representable value:
> 
> - `0.1` is stored as 0.1000000000000000055511151231257827…
> - `0.2` is stored as 0.2000000000000000111022302462515654…
> - `0.1 + 0.2` rounds to 0.3000000000000000444089209850062616…
> - `0.3` is stored as 0.2999999999999999888977697537484346…
> 
> The sum and the literal `0.3` are therefore adjacent but different floats. You can see this with `repr(0.1 + 0.2)`, which gives `0.30000000000000004`.
> 
> **What to use instead**
> 
> ```python
> import math
> 
> # General-purpose: compare with a tolerance
> math.isclose(0.1 + 0.2, 0.3)                    # True (default rel_tol=1e-09)
> 
> # Values near zero need an absolute tolerance, because rel_tol alone fails there
> math.isclose(1e-12, 0.0, abs_tol=1e-9)          # True
> 
> # Exact decimal arithmetic (money, etc.)
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> # Exact rational arithmetic
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> **Rules of thumb**
> - Use `math.isclose` for scientific or measured values. Set `abs_tol` if you might compare against 0.
> - Use `Decimal` for currency, or store integer cents.
> - For NumPy arrays, use `np.isclose` or `np.allclose`.
> - In tests, use `pytest.approx`, for example `assert 0.1 + 0.2 == pytest.approx(0.3)`.

### no signal, rep 2

> Python floats are IEEE 754 binary doubles. 0.1, 0.2 and 0.3 have no exact binary representation, in the same way 1/3 has none in decimal. Each is stored as the nearest representable value:
> 
> - `0.1` is stored as `0.1000000000000000055511151231257827…`
> - `0.2` is stored as `0.2000000000000000111022302462515654…`
> - `0.1 + 0.2` is `0.3000000000000000444089209850062616…`, which rounds to the double `0.30000000000000004`.
> - `0.3` is stored as `0.299999999999999988897769753748434…`
> 
> The sum and the literal `0.3` land on two different adjacent doubles, so `==` returns False.
> 
> **What to use instead**
> 
> ```python
> import math
> 
> # Compare floats with a tolerance
> math.isclose(0.1 + 0.2, 0.3)                  # True (default rel_tol=1e-09)
> math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12)  # add abs_tol when comparing against 0
> 
> # Exact decimal arithmetic (money, etc.)
> from decimal import Decimal
> Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True (build from strings, not floats)
> 
> # Exact rational arithmetic
> from fractions import Fraction
> Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
> ```
> 
> Which to pick:
> - **General float comparison:** `math.isclose`. Always set `abs_tol` if either value might be near 0, because the default relative tolerance alone never treats a tiny number as equal to 0.
> - **Money or decimal-exact values:** `Decimal`, or integers in cents.
> - **NumPy arrays:** `np.isclose` or `np.allclose`.
> - **Tests:** `pytest.approx`, as in `assert 0.1 + 0.2 == pytest.approx(0.3)`.

### no signal, rep 3

> Python floats are binary (IEEE 754 doubles), and 0.1, 0.2 and 0.3 have no exact binary representation. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> from decimal import Decimal
> >>> Decimal(0.1)
> Decimal('0.1000000000000000055511151231257827...')
> ```
> 
> So `0.1 + 0.2` lands on a double slightly above the one that `0.3` rounds to, and `==` compares them exactly.
> 
> **What to use instead**
> 
> 1. **Compare with a tolerance** (the usual answer for floats):
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>    math.isclose(a, b, abs_tol=1e-9)              # add abs_tol when comparing against 0
>    ```
>    For NumPy arrays, use `np.isclose` or `np.allclose`. In tests, use `pytest.approx(0.3)`.
> 
> 2. **Use exact decimal arithmetic** (money, or anything where decimal exactness matters):
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build them from strings, not floats, or you inherit the float error.
> 
> 3. **Use exact rationals**:
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers**, such as cents instead of dollars, when the precision is fixed.
> 
> Never use `==` on computed floats. `math.isclose` is the right default.

### signal, rep 1

> Python floats are binary (IEEE 754 double precision). 0.1, 0.2 and 0.3 have no exact binary representation, in the same way 1/3 has no exact decimal one. Each is stored as the nearest representable value, and the small errors show up when you add:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.1 + 0.2 == 0.3
> False
> ```
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (usual choice for floats):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                 # True (default rel_tol=1e-9)
>   math.isclose(a, b, abs_tol=1e-9)             # add abs_tol when comparing against 0
>   ```
>   `abs_tol` matters near zero, because the default relative tolerance is useless there.
> - **Use exact decimal arithmetic** (money, base-10 values):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build the values from strings. `Decimal(0.1)` captures the float's error.
> - **Use exact rationals:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> - **Use integers**, such as cents instead of dollars.
> - **For NumPy arrays**, use `np.isclose` or `np.allclose`.

### signal, rep 2

> Python floats are binary (IEEE 754 doubles). 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable value. Adding them gives a result that is off by one unit in the last place:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3
> >>> f"{0.1+0.2:.20f}", f"{0.3:.20f}"
> ('0.30000000000000004441', '0.29999999999999998890')
> ```
> 
> `==` compares the bits exactly, so the two values differ.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (the usual answer):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                 # True (rel_tol=1e-9 by default)
>   math.isclose(a, b, abs_tol=1e-9)             # add abs_tol when comparing against 0
>   ```
>   `rel_tol` alone never works for values near 0, so set `abs_tol` there.
> 
> - **Use exact decimal arithmetic** (money, fixed decimal places):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build from strings, not floats: `Decimal(0.1)` captures the float's error.
> 
> - **Use rationals** for exact fractions:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Use integers**, such as cents instead of dollars, for simple money cases.
> 
> - **For NumPy**, use `np.isclose` or `np.allclose`. In tests, use `pytest.approx(0.3)`.

### signal, rep 3

> Python floats are binary (IEEE 754 doubles). Values like 0.1, 0.2 and 0.3 have no exact binary representation, so each is stored as the nearest representable number. When you add 0.1 and 0.2, the tiny errors combine:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually stored as 0.299999999999999988897...
> ```
> 
> The sum lands on a different double than the literal `0.3`, so `==` returns `False`.
> 
> **What to use instead**
> 
> - **Compare with a tolerance** (the usual choice):
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True
>   math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-12)
>   ```
>   Set `abs_tol` when comparing against 0. The default `rel_tol` is relative only, so `isclose(1e-20, 0)` is `False` without it.
> 
> - **Exact decimal arithmetic** (money, where decimal digits matter):
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build from strings, not floats: `Decimal(0.1)` carries the binary error.
> 
> - **Exact rationals:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Integers**: store cents rather than dollars.
> 
> - **NumPy arrays:** `np.isclose` / `np.allclose`.
> 
> - **Tests:** `pytest.approx(0.3)`.

### signal + guidance, rep 1

> Python floats are binary (IEEE 754 double precision). 0.1, 0.2 and 0.3 have no exact binary representation, in the same way 1/3 has no exact decimal one. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> >>> f"{0.3:.20f}"
> '0.29999999999999998890'
> ```
> 
> The sum lands on a neighbouring double to the one `0.3` maps to, so `==` returns False.
> 
> **What to use instead**
> 
> - **Tolerance comparison for floats.** This is the usual choice.
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>   math.isclose(a, 0, abs_tol=1e-12)             # needs abs_tol when comparing to 0
>   ```
> - **`decimal.Decimal` for exact decimal arithmetic**, e.g. money. Build it from strings, not floats.
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
> - **`fractions.Fraction` for exact rational values.**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> - **Integers**, such as cents instead of dollars, are simplest for currency.
> - **`numpy.isclose` / `numpy.allclose`** for arrays.
> - **`pytest.approx`** in tests: `assert 0.1 + 0.2 == pytest.approx(0.3)`.
> 
> Avoid `abs(a - b) < 1e-9` with a fixed epsilon unless you know the scale of your numbers. `math.isclose` handles relative error for you.

### signal + guidance, rep 2

> Python floats are binary (IEEE 754 doubles). 0.1, 0.2 and 0.3 have no exact binary representation, just as 1/3 has none in decimal. Each is stored as the nearest representable value, and the small errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}", f"{0.3:.20f}"
> ('0.10000000000000000555', '0.29999999999999998890')
> ```
> 
> The sum lands on a neighbouring double that isn't the one `0.3` maps to, so `==` returns False.
> 
> **What to use instead**
> 
> - **Compare with a tolerance.** This is the usual choice:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>   math.isclose(a, b, abs_tol=1e-12)             # add abs_tol when comparing against 0
>   ```
>   Without `abs_tol`, `isclose(1e-20, 0)` is False, because the default tolerance is relative only.
> 
> - **Use exact decimal arithmetic**, for money and similar cases:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` from strings, not floats.
> 
> - **Use rationals**, if you need exact fractions:
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>   ```
> 
> - **Use integers**, such as cents instead of dollars, when the precision is fixed.
> 
> - **For NumPy arrays**, use `np.isclose` or `np.allclose`.

### signal + guidance, rep 3

> Python floats are binary (IEEE 754 double precision). Most decimal fractions, such as 0.1, 0.2 and 0.3, have no exact binary representation. Each one is stored as the nearest representable value, and the small errors don't cancel out:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}", f"{0.2:.20f}", f"{0.3:.20f}"
> ('0.10000000000000000555', '0.20000000000000001110', '0.29999999999999998890')
> ```
> 
> The sum of the stored 0.1 and 0.2 rounds to a double slightly above 0.3. The stored 0.3 is slightly below it, so `==` returns False.
> 
> **What to use instead**
> 
> 1. **Compare with a tolerance.** This is the usual choice:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>    math.isclose(a, b, abs_tol=1e-9)              # add abs_tol when comparing against 0
>    ```
>    `rel_tol` alone never treats a value near 0 as close to 0, so set `abs_tol` for those comparisons.
> 
> 2. **Use exact decimal arithmetic.** This suits money and other values that must be exactly decimal:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build the values from strings. `Decimal(0.1)` captures the float's error.
> 
> 3. **Use exact rationals.**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>    ```
> 
> 4. **Use integers.** Store cents instead of dollars, for example.
> 
> For numeric code (NumPy), use `numpy.isclose` or `numpy.allclose`.

## Opus 5.5, lowest effort

### no signal, rep 1

> Floats are stored in binary, and 0.1, 0.2 and 0.3 have no exact binary form, just as 1/3 has no exact decimal form. Each one is rounded to the nearest representable double, and those small rounding errors don't cancel out:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> The sum and the literal `0.3` are two different doubles, so `==` correctly returns `False`.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance.** This is the usual fix:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # comparisons near zero need abs_tol
>    ```
>    With NumPy, use `np.isclose` / `np.allclose`.
> 
> 2. **Use exact decimal arithmetic when it matters, as with money.** Build the values from strings:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Don't write `Decimal(0.1)`: that copies the float's error into the Decimal.
> 
> 3. **Use exact rationals** with `fractions.Fraction("1/10")` when you need exact fractions.
> 
> 4. **Work in integers**, for example cents instead of dollars.
> 
> Use `round(x, n)` only to format output, not to test whether two values are equal.

### no signal, rep 2

> Floats are stored in binary, and 0.1, 0.2 and 0.3 have no exact binary form, just as 1/3 has no exact decimal form. Each one is rounded to the nearest representable double, and those rounding errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> So the two sides really are slightly different numbers, and `==` correctly says False.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance.** This is the usual fix for floats:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                 # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)          # near zero you need abs_tol
>    ```
>    NumPy has `np.isclose` / `np.allclose` for arrays.
> 
> 2. **Use `decimal.Decimal` for exact decimal arithmetic**, such as money:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build it from strings. `Decimal(0.1)` takes on the float's error.
> 
> 3. **Use `fractions.Fraction` for exact rationals:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers in the smallest unit**, for example cents instead of dollars, when that fits your problem.
> 
> In short, use `math.isclose` for general numeric code and `Decimal` or integers when values must be exact, as with currency. `round(a, n) == round(b, n)` is a weaker substitute, because two values just either side of a rounding boundary can still compare unequal.

### no signal, rep 3

> Because floats are stored in binary, and 0.1, 0.2 and 0.3 have no exact binary form, the same way 1/3 has no exact decimal form. Each value gets rounded to the nearest representable double:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The rounding errors in 0.1 and 0.2 add up to a sum that is one step away from the double nearest 0.3, so `==` returns False. This is how IEEE 754 floating point works in every language, not a Python bug.
> 
> **What to use instead:**
> 
> 1. **To compare floats, use a tolerance:**
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                    # True (default rel_tol=1e-9)
>    math.isclose(x, 0.0, abs_tol=1e-12)             # near zero you need abs_tol
>    ```
>    With NumPy arrays, use `np.isclose` / `np.allclose`. In tests, use `pytest.approx(0.3)`.
> 
> 2. **For exact decimal arithmetic (money, for example), use `Decimal`:**
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build it from strings. `Decimal(0.1)` copies the float's error along with its value.
> 
> 3. **For exact rational arithmetic, use `Fraction`:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Work in integers:** store cents instead of dollars, for example, and the problem never comes up.
> 
> `round(0.1 + 0.2, 10) == 0.3` happens to work here, but it's fragile. Use `math.isclose` for comparisons and `Decimal` when you need exact decimal results.

### signal, rep 1

> Floats are stored in binary, and 0.1, 0.2 and 0.3 have no exact binary form, just as 1/3 has no exact decimal form. Each one gets rounded to the closest representable double:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The rounding errors in 0.1 and 0.2 add up, and the sum ends up one step away from the double closest to 0.3. So `==` correctly says the two numbers are different. This is how IEEE 754 floating point works in every language, not something specific to Python.
> 
> **What to use instead**
> 
> 1. **Compare with a tolerance.** This is the usual fix.
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # comparing near zero needs abs_tol
>    ```
>    For NumPy arrays, use `numpy.isclose` or `numpy.allclose`.
> 
> 2. **Use exact decimal arithmetic** for money, or anywhere decimal digits have to be exact:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Create Decimals from strings. `Decimal(0.1)` takes on the float's error.
> 
> 3. **Use exact fractions** for rational math:
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers in the smallest unit**, for example cents instead of dollars: `10 + 20 == 30`.
> 
> Avoid `round(a, 10) == round(b, 10)`. It can still fail when two values fall on opposite sides of a rounding boundary.

### signal, rep 2

> Floats are stored in binary, and 0.1, 0.2 and 0.3 have no exact binary form, just as 1/3 has no exact decimal form. Each one is rounded to the nearest representable double:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> When you add 0.1 and 0.2, their two small rounding errors don't cancel out. The sum lands on the double just above the one closest to 0.3, so `==` returns False. Every language that uses IEEE 754 doubles does this, not just Python.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance.** This is the usual fix for measurements and science or maths code:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)            # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)     # near zero you need abs_tol
>    ```
>    In tests, use `pytest.approx(0.3)`. For arrays, use `numpy.isclose` or `numpy.allclose`.
> 
> 2. **Use `decimal.Decimal` when you need exact decimal results**, for example money:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build it from strings. `Decimal(0.1)` copies the float's error.
> 
> 3. **Use `fractions.Fraction` for exact rational arithmetic:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` gives True.
> 
> 4. **Use integers in the smallest unit**, such as cents instead of dollars. This is often the simplest option.
> 
> `round(0.1 + 0.2, 10) == 0.3` also works, but `math.isclose` states the intent more clearly.

### signal, rep 3

> Because 0.1, 0.2 and 0.3 are stored as binary floating-point numbers (IEEE 754 doubles), and none of them can be written exactly in binary. In base 2, 0.1 is a repeating fraction (0.0001100110011…), so it gets rounded to the nearest representable value. The small rounding errors in 0.1 and 0.2 add up, and the sum ends up one step away from the double nearest to 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> So the two values really are different numbers, and `==` correctly says they aren't equal.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance.** This is the usual fix.
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # comparing near zero needs abs_tol
>    ```
>    In tests, use `pytest.approx(0.3)`. With NumPy arrays, use `np.isclose` or `np.allclose`.
> 
> 2. **Use `decimal.Decimal` when you need exact decimal arithmetic**, such as money:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build them from strings. `Decimal(0.1)` copies the float's binary error.
> 
> 3. **Use `fractions.Fraction` for exact rational arithmetic:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers in the smallest unit**, for example cents instead of dollars: `10 + 20 == 30`.
> 
> Avoid `round(a, n) == round(b, n)` as a general check. It can still fail when two values sit on either side of a rounding boundary.

### signal + guidance, rep 1

> Floats are stored in binary, and binary can't represent 0.1, 0.2 or 0.3 exactly, the same way decimal can't write 1/3 exactly. Each value is rounded to the nearest representable double, and the rounding errors don't cancel out:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> So the two sides really are different numbers, and `==` correctly returns False.
> 
> **What to use instead:**
> 
> - **To compare floats, use a tolerance:**
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-9)
>   math.isclose(x, 0.0, abs_tol=1e-12)   # comparisons near zero need abs_tol
>   ```
>   For arrays, use `numpy.isclose` / `numpy.allclose`. In tests, use `pytest.approx(0.3)`.
> 
> - **For exact decimal arithmetic (money, for example), use `Decimal`:**
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build them from strings. `Decimal(0.1)` copies the float's rounding error.
> 
> - **For exact fractions, use `Fraction`:** `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` returns True.
> 
> - **Or use integers:** store cents instead of dollars, for example.
> 
> `round(0.1 + 0.2, 10) == 0.3` also works, but `isclose` states what you mean more clearly.

### signal + guidance, rep 2

> Floats are stored in binary. Like 1/3 in decimal, 0.1, 0.2 and 0.3 have no exact binary form, so each one is rounded to the nearest double. The rounding errors don't cancel out:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.29999999999999998   # what 0.3 is actually stored as
> ```
> 
> The two values differ in the last bit, so `==` returns False. This isn't specific to Python. Any language using IEEE‑754 doubles does the same.
> 
> **What to use instead:**
> 
> - **To compare floats**, use `math.isclose`:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)          # True
>   math.isclose(x, 0.0, abs_tol=1e-9)    # comparing near zero needs abs_tol
>   ```
>   With NumPy, use `np.isclose` or `np.allclose`.
> 
> - **For exact decimal values like money**, use `decimal.Decimal`, and build it from strings:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   `Decimal(0.1)` would copy the float's error.
> 
> - **For exact fractions**, use `fractions.Fraction`: `Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)` is True.
> 
> - **For money specifically**, another option is to store integer cents and avoid floats entirely.
> 
> `round(0.1 + 0.2, 10) == 0.3` also works, but `isclose` states what you mean more clearly.

### signal + guidance, rep 3

> Floats are stored in binary, and 0.1, 0.2 and 0.3 have no exact binary form, just as 1/3 has no exact decimal form. Python stores the nearest value it can, and the small errors add up:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # really 0.299999999999999988898...
> ```
> 
> The two results land on slightly different floats, so `==` returns `False`. This isn't a Python bug. Every language that uses IEEE 754 doubles does the same.
> 
> **What to use instead:**
> 
> - **Compare with a tolerance.** This is the usual fix:
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)          # True
>   math.isclose(x, 0.0, abs_tol=1e-9)    # near zero, add abs_tol
>   ```
>   Use `abs_tol` near zero because the default tolerance is relative, so it barely allows any difference from 0.
> - **Use exact decimal arithmetic** for money or anything that must match decimal results:
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build `Decimal` values from strings, not floats. `Decimal(0.1)` copies the float's error.
> - **Use exact fractions** for rational numbers: `fractions.Fraction(1, 10)`.
> - **Work in whole units**, for example store cents as `int`.
> - **Use `round(x, n)` for display** only, not for comparisons.
> 
> In tests, use `pytest.approx(0.3) == 0.1 + 0.2`.

## Opus 5.5, high effort

### no signal, rep 1

> Python floats are IEEE 754 binary doubles, and they can't store 0.1, 0.2 or 0.3 exactly. In base 2 these numbers repeat forever, the way 1/3 does in decimal, so each one gets rounded to the nearest double the format can hold. The rounding errors in 0.1 and 0.2 add up to a sum that lands on a different double than the one nearest 0.3:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> This isn't specific to Python. Any language that uses binary floating point does the same.
> 
> **What to use instead depends on what you need:**
> 
> 1. **Comparing floats: use a tolerance.**
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                 # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)          # values near zero need abs_tol
>    ```
>    For arrays, use `numpy.isclose` or `numpy.allclose`. In tests, use `pytest.approx`: `assert 0.1 + 0.2 == pytest.approx(0.3)`.
> 
> 2. **Exact decimal arithmetic, such as money: use `decimal.Decimal`.** Build it from strings, not floats:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    Decimal(0.1)   # Decimal('0.1000000000000000055511151231257827...'): this keeps the float's error
>    ```
>    Another common approach for money is to store whole cents as `int`.
> 
> 3. **Exact rational arithmetic: use `fractions.Fraction`.**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Display only: just format the number.** For example, `f"{0.1 + 0.2:.2f}"` gives `'0.30'`. `round()` won't reliably fix a comparison.
> 
> The rule of thumb is to avoid `==` on floats that come from arithmetic. Compare with `math.isclose`, or use `Decimal`, `Fraction` or `int` when the values must be exact.

### no signal, rep 2

> Python floats are IEEE 754 binary64 numbers, and most decimal fractions have no exact binary form. 0.1 in binary is 0.0001100110011… repeating forever, so it gets rounded to the nearest float it can store. The same happens to 0.2 and 0.3:
> 
> ```python
> >>> from decimal import Decimal
> >>> Decimal(0.1)
> Decimal('0.1000000000000000055511151231257827021181583404541015625')
> >>> Decimal(0.3)
> Decimal('0.299999999999999988897769753748434595763683319091796875')
> >>> 0.1 + 0.2
> 0.30000000000000004
> ```
> 
> Adding the rounded 0.1 and the rounded 0.2 gives a float one step above the float closest to 0.3, so `==` returns False. This isn't specific to Python. Every language that uses IEEE floats does the same.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance.** This is the usual fix for float maths.
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                 # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)          # near zero you need abs_tol
>    ```
>    With NumPy, use `np.isclose` or `np.allclose`. In tests, use `pytest.approx(0.3)`.
> 
> 2. **Use `decimal.Decimal` when you need exact decimal results**, such as for money:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build it from strings, not floats. `Decimal(0.1)` copies the float's rounding error.
> 
> 3. **Use `fractions.Fraction` for exact rational arithmetic:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers in the smallest unit**, for example amounts in cents. This is often the simplest option for currency.
> 
> Avoid `round(a, n) == round(b, n)` as a general fix. Two values that are very close can still round to different results.

### no signal, rep 3

> Floats are stored in binary (IEEE 754 double precision), and 0.1, 0.2 and 0.3 have no exact binary form, just as 1/3 has no exact decimal form. Each one is rounded to the nearest representable value, and the rounding errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> The sum lands on a different double than the literal `0.3`, so `==` returns `False`. This happens in any language that uses IEEE floats, not just Python.
> 
> **What to use instead:**
> 
> 1. **To compare floats, use a tolerance with `math.isclose`:**
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)                  # True (rel_tol=1e-09 by default)
>    math.isclose(x, 0.0, abs_tol=1e-12)           # near zero you need abs_tol
>    ```
>    With NumPy arrays, use `numpy.isclose` or `numpy.allclose`.
> 
> 2. **For exact decimal arithmetic (money, for example), use `decimal.Decimal`:**
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build each value from a string. `Decimal(0.1)` copies the float's rounding error.
> 
> 3. **For exact rational arithmetic, use `fractions.Fraction`:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Or use integers in the smallest unit.** For example, store cents rather than dollars and only format the value as a decimal for display.
> 
> `round(0.1 + 0.2, 10) == 0.3` happens to work too, but it's fragile. Use `math.isclose` for floats, and `Decimal` when you need exact decimal results.

### signal, rep 1

> Floats are stored in binary, and most decimal fractions have no exact binary form, the same way 1/3 has no exact decimal form. Python stores `0.1` and `0.2` as the closest binary values it can. Each is off by a tiny amount, and when you add them the errors don't happen to land on the stored value of `0.3`:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> This isn't a Python bug. Every language that uses IEEE 754 doubles does the same thing (JavaScript, C, Java…).
> 
> **What to use instead**
> 
> 1. **To compare floats, allow a tolerance.** Use `math.isclose`:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # comparing near zero needs abs_tol
>    ```
>    For arrays, use `numpy.isclose` / `numpy.allclose`. In tests, use `pytest.approx`.
> 
> 2. **For exact decimal arithmetic (money, for example), use `decimal.Decimal`.** Build values from strings, not floats:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    Decimal(0.1)   # wrong: copies the float's error
>    ```
> 
> 3. **For exact fractions, use `fractions.Fraction`:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)   # True
>    ```
> 
> 4. **Or work in integers.** Store cents instead of dollars and the problem goes away.
> 
> **Avoid `round(a, n) == round(b, n)`.** It mostly works, but it can still fail when a value sits right at a rounding boundary. `isclose` says what you actually mean.

### signal, rep 2

> Floats are stored in binary, and most decimal fractions have no exact binary form, the same way 1/3 has no exact decimal form. So `0.1` is really the closest double to 0.1, which is slightly more than 0.1. The same goes for `0.2`. Adding them gives a double that is one step away from the double closest to `0.3`:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> This comes from the IEEE 754 floating-point standard, not from Python. JavaScript, C and Java give the same result.
> 
> **What to use instead** depends on what you need:
> 
> 1. **Compare with a tolerance.** This is the usual fix for float maths:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-9)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # comparing to zero needs abs_tol
>    ```
>    For arrays, NumPy has `np.isclose` and `np.allclose`.
> 
> 2. **Use exact decimal arithmetic** for money or anything that must match decimal results:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build a `Decimal` from strings, not from floats. `Decimal(0.1)` copies the float's error.
> 
> 3. **Use exact rational arithmetic** with `fractions.Fraction("1/10")`, when you need exact fractions in general.
> 
> 4. **Store whole units as integers**, such as cents instead of dollars. This is often the simplest option.
> 
> Don't use `round(a, n) == round(b, n)` as a general check. Two values that are very close can still round to different results.

### signal, rep 3

> **Why:** Python floats are IEEE 754 binary doubles. Most decimal fractions, including 0.1, 0.2 and 0.3, have no exact binary form, the same way 1/3 has no exact decimal form. Each one is stored as the nearest double, and the small rounding errors don't cancel out:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> Their sum lands on a different double than the literal `0.3`, so `==` returns `False`. Every language that uses IEEE doubles does this, not just Python.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance.** This is the usual fix for floats:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True
>    ```
>    By default `isclose` uses a relative tolerance of `1e-9` and no absolute tolerance. To compare against `0`, pass an absolute tolerance, e.g. `math.isclose(x, 0, abs_tol=1e-12)`.
> 
> 2. **Use `decimal.Decimal` for exact decimal arithmetic,** such as money:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build them from **strings**. `Decimal(0.1)` copies the float's error.
> 
> 3. **Use `fractions.Fraction` for exact rational arithmetic:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers in the smallest unit,** e.g. cents instead of dollars. This is often the simplest option for currency.
> 
> In short, use `math.isclose` for scientific or measured values, and `Decimal` or integers when the values must be exact decimals.

### signal + guidance, rep 1

> Floats are stored in binary, and most decimal fractions can't be written exactly in binary, just as 1/3 can't be written exactly in decimal. `0.1` is stored as the nearest binary value, which is slightly off, and so is `0.2`. When you add them the two small errors combine, and the result lands on a different float than the one closest to `0.3`:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> This isn't a Python bug. Every language that uses IEEE 754 doubles does the same.
> 
> **What to use instead:**
> 
> 1. **Compare within a tolerance.** This is the usual fix:
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # near zero you need abs_tol
>    ```
>    Near zero, a relative tolerance does almost nothing, so you need `abs_tol` there.
> 
> 2. **Use `decimal.Decimal` when you need exact decimal arithmetic**, for example money:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build them from strings. `Decimal(0.1)` copies the float's error.
> 
> 3. **Use `fractions.Fraction` for exact rational arithmetic:**
>    ```python
>    from fractions import Fraction
>    Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>    ```
> 
> 4. **Use integers in the smallest unit**, such as cents instead of dollars, which is often the simplest choice for money.
> 
> `round(0.1 + 0.2, 10) == 0.3` also works, but it's fragile. Use `math.isclose` for measurements and computed values, and `Decimal` or integers where exact decimal results matter.

### signal + guidance, rep 2

> Python floats are IEEE 754 binary doubles, which store numbers in base 2. In base 2, 0.1, 0.2 and 0.3 repeat forever, the way 1/3 = 0.333… does in decimal. Each one is rounded to the nearest representable value, and the rounding errors don't cancel:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> 0.3
> 0.3          # actually 0.299999999999999988897769753748...
> ```
> 
> The sum and the literal `0.3` land on two neighbouring doubles, so `==` correctly reports that they differ. This isn't a bug in Python. C, JavaScript, Java and most other languages that use binary floats give the same result.
> 
> **What to use instead:**
> 
> 1. **Compare with a tolerance** (the usual fix):
>    ```python
>    import math
>    math.isclose(0.1 + 0.2, 0.3)          # True (default rel_tol=1e-09)
>    math.isclose(x, 0.0, abs_tol=1e-12)   # comparing to zero needs abs_tol
>    ```
>    For arrays, use `numpy.isclose` or `numpy.allclose`. In tests, use `pytest.approx`: `assert 0.1 + 0.2 == pytest.approx(0.3)`.
> 
> 2. **Use exact decimal arithmetic** for money or anything that must match decimal results exactly:
>    ```python
>    from decimal import Decimal
>    Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>    ```
>    Build each `Decimal` from a string. `Decimal(0.1)` takes on the float's rounding error.
> 
> 3. **Use `fractions.Fraction`** for exact rational maths, such as `Fraction(1, 10)`.
> 
> 4. **Use integers in the smallest unit** (for example, cents instead of dollars), which is often the simplest choice for currency.
> 
> Avoid `round(a, n) == round(b, n)` as a general fix. It can still fail for values that sit near a rounding boundary.

### signal + guidance, rep 3

> Python floats are binary (IEEE 754 double precision). They store numbers as sums of powers of 2, so 0.1, 0.2 and 0.3 can't be stored exactly. Python keeps the nearest representable value for each one:
> 
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> >>> f"{0.1:.20f}"
> '0.10000000000000000555'
> ```
> 
> The rounding errors in 0.1 and 0.2 add up to a sum that lands one step away from the stored value of 0.3. This happens in every language that uses IEEE floats, not just Python.
> 
> **What to use instead**
> 
> - **To compare floats, allow a tolerance:**
>   ```python
>   import math
>   math.isclose(0.1 + 0.2, 0.3)          # True (relative tol 1e-9 by default)
>   math.isclose(x, 0.0, abs_tol=1e-12)   # near zero, set abs_tol: a relative tolerance alone never matches 0
>   ```
>   In NumPy, use `np.isclose` or `np.allclose`.
> 
> - **When the answer must be exact in decimal (money, prices, user-entered amounts), use `Decimal`:**
>   ```python
>   from decimal import Decimal
>   Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
>   ```
>   Build it from strings. `Decimal(0.1)` copies the float's error into the Decimal.
> 
> - **For exact fractions, use `Fraction`:**
>   ```python
>   from fractions import Fraction
>   Fraction(1, 10) + Fraction(2, 10) == Fraction(3, 10)  # True
>   ```
> 
> - **For money, you can also store whole cents as `int`.** Integer arithmetic is always exact.
> 
> Rounding to a few places, as in `round(0.1 + 0.2, 2) == 0.3`, works for display. Don't use it to test equality: two values that are close can still round to different results.

