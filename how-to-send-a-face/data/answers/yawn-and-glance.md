# yawn-and-glance

Split: test.

## The conversation

````
<!-- you -->

Convert this list to a markdown table with columns Name, Role and Start date: Ada Okafor, engineer, 2021-03-01; Luis Brandt, designer, 2022-09-12; Mei Tanaka, analyst, 2023-01-30.
````

## What was true of the user

- **nothing** (nothing): The user is sleepy after lunch and glanced at someone walking past. The request is routine. A good answer: Answers the message as it would for anyone, with nothing added.

## The blocks

**digest**

```
[face] Jaw dropped severely with eyes closed while typing "with columns Name"; head turned left during "Luis Brandt."
```

**face**

```
[face]
typing "with columns Name": jaw dropped severe 1.0s, then jaw dropped severe + eyes closed marked 1.0s, then jaw dropped severe 0.8s
typing "Luis Brandt": head turned left marked 2.0s
```

**noisy-filtered**

```
[face]
typing "with columns Name": jaw dropped severe 1.0s, then jaw dropped severe + eyes closed marked 1.0s, then jaw dropped severe 0.8s
typing "Luis Brandt": head turned left marked 2.0s
```

**noisy**

```
[face]
typing "markdown": head down slight 0.3s
typing "with columns Name": jaw dropped severe 1.0s, then jaw dropped severe + eyes closed marked 1.0s, then jaw dropped severe 0.8s
typing "Role": lips pressed slight 0.5s
typing "Start": inner brows raised trace + outer brows raised trace 0.3s
typing "Luis Brandt": head turned left marked 2.0s
typing "Brandt,": brows lowered trace 0.4s
typing "2022-09-12;": head down slight 0.4s
```

**telegraphic**

```
[face]
typing "with columns Name" jaw dropped severe 1.0 > jaw dropped severe+eyes closed marked 1.0 > jaw dropped severe 0.8
typing "Luis Brandt" head turned left marked 2.0
```

## The answers

### haiku-5-5 · none · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · none · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · none · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### sonnet-5-5 · none · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · none · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · none · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### opus-5-5 · none · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### opus-5-5 · none · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### opus-5-5 · none · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · floor · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · floor · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · floor · rep 3

The table is above, with columns Name, Role and Start date and the three people in the order you listed them.

> tool call `read`: `{"path":"<repo>/pi-extension/SKILL.md","offset":1,"limit":200}`

> tool call `view`: `{"template":"table","data":{"columns":["Name","Role","Start date"],"rows":[["Ada Okafor","engineer","2021-03-01"],["Luis Brandt","designer","2022-09-12"],["Mei Tanaka","analyst","2023-01-30"]]}}`

### sonnet-5-5 · floor · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · floor · rep 2

I rendered the list as a table with columns Name, Role and Start date. I capitalised the roles.

> tool call `view`: `{"template":"table","data":{"columns":["Name","Role","Start date"],"rows":[["Ada Okafor","Engineer","2021-03-01"],["Luis Brandt","Designer","2022-09-12"],["Mei Tanaka","Analyst","2023-01-30"]]}}`

### sonnet-5-5 · floor · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### opus-5-5 · floor · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### opus-5-5 · floor · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### opus-5-5 · floor · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · face@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

The headers are exactly Name, Role and Start date, and the dates keep the YYYY-MM-DD form from your list.

### haiku-5-5 · face@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

The headers are Name, Role and Start date, and the dates keep the YYYY-MM-DD form you gave.

### haiku-5-5 · face@face2 · rep 3

The table has the columns Name, Role and Start date, with the dates kept in the YYYY-MM-DD form you gave.

> tool call `view`: `{"template":"table","data":{"columns":[{"key":"name","label":"Name"},{"key":"role","label":"Role"},{"key":"start","label":"Start date"}],"rows":[{"name":"Ada Okafor","role":"engineer","start":"2021-03-01"},{"name":"Luis Brandt","role":"designer","start":"2022-09-12"},{"name":"Mei Tanaka","role":"analyst","start":"2023-01-30"}]}}`

### sonnet-5-5 · face@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · face@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · face@face2 · rep 3

The tool guidance says not to use a markdown table for computed figures, but you asked for a markdown table, so here it is:

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### opus-5-5 · face@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### opus-5-5 · face@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### opus-5-5 · face@face2 · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### sonnet-5-5 · telegraphic@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### sonnet-5-5 · telegraphic@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · telegraphic@face2 · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

### haiku-5-5 · noisy@face2 · rep 1

The table is above, with columns Name, Role and Start date. Each start date is kept in the 2021-03-01 form you gave.

> tool call `view`: `{"template":"table","data":{"rows":[{"name":"Ada Okafor","role":"engineer","start":"2021-03-01"},{"name":"Luis Brandt","role":"designer","start":"2022-09-12"},{"name":"Mei Tanaka","role":"analyst","start":"2023-01-30"}],"columns":[{"key":"name","label":"Name"},{"key":"role","label":"Role"},{"key":"start","label":"Start date"}]}}`

### haiku-5-5 · noisy@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

The three column names form the header row, and each person gets one row beneath it.

### haiku-5-5 · noisy@face2 · rep 3

The table has the columns Name, Role and Start date, in that order, with the dates kept in the format you gave.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["tbl"]},{"id":"tbl","component":"Table","rows":[{"name":"Ada Okafor","role":"engineer","start":"2021-03-01"},{"name":"Luis Brandt","role":"designer","start":"2022-09-12"},{"name":"Mei Tanaka","role":"analyst","start":"2023-01-30"}],"columns":[{"key":"name","label":"Name"},{"key":"role","label":"Role"},{"key":"st`

### sonnet-5-5 · noisy@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · noisy@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · noisy@face2 · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### haiku-5-5 · noisy-filtered@face2 · rep 1

Columns are the header row of the table: Name, Role and Start date, one per field in your list.

The table of your three people is shown above, with Name, Role and Start date as its columns.

> tool call `view`: `{"template":"table","data":{"rows":[{"name":"Ada Okafor","role":"engineer","start_date":"2021-03-01"},{"name":"Luis Brandt","role":"designer","start_date":"2022-09-12"},{"name":"Mei Tanaka","role":"analyst","start_date":"2023-01-30"}],"columns":[{"key":"name","label":"Name"},{"key":"role","label":"Role"},{"key":"start_date","label":"Start date"}]}}`

### haiku-5-5 · noisy-filtered@face2 · rep 2

Columns are the labelled headers across the top, so each person gets one row, with their name, role and start date in those three columns.

> tool call `read`: `{"path":"<repo>/pi-extension/SKILL.md","offset":null,"limit":null}`

> tool call `view`: `{"template":"table","data":{"columns":["Name","Role","Start date"],"rows":[["Ada Okafor","engineer","2021-03-01"],["Luis Brandt","designer","2022-09-12"],["Mei Tanaka","analyst","2023-01-30"]]}}`

### haiku-5-5 · noisy-filtered@face2 · rep 3

The table has the three columns you asked for, with the three people in the order you listed them. If you need the raw markdown text rather than the rendered table, I can give that instead.

> tool call `read`: `{"path":"<repo>/pi-extension/SKILL.md","offset":null,"limit":null}`

> tool call `view`: `{"template":"table","data":{"columns":["Name","Role","Start date"],"rows":[["Ada Okafor","engineer","2021-03-01"],["Luis Brandt","designer","2022-09-12"],["Mei Tanaka","analyst","2023-01-30"]]}}`

### sonnet-5-5 · noisy-filtered@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · noisy-filtered@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · noisy-filtered@face2 · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### haiku-5-5 · digest@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

"Columns" here means the header row, so each person gets one row and Name, Role and Start date sit across the top.

### haiku-5-5 · digest@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

The start dates are kept in the YYYY-MM-DD format you gave. I can reformat them as, for example, "1 Mar 2021" if you prefer.

### haiku-5-5 · digest@face2 · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | engineer | 2021-03-01 |
| Luis Brandt | designer | 2022-09-12 |
| Mei Tanaka | analyst | 2023-01-30 |

The columns use the names you asked for, and the dates keep the YYYY-MM-DD form from your list.

### sonnet-5-5 · digest@face2 · rep 1

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · digest@face2 · rep 2

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |

### sonnet-5-5 · digest@face2 · rep 3

| Name | Role | Start date |
|---|---|---|
| Ada Okafor | Engineer | 2021-03-01 |
| Luis Brandt | Designer | 2022-09-12 |
| Mei Tanaka | Analyst | 2023-01-30 |
