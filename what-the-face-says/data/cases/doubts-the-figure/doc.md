---
pi: v1
session: eval-doubts-the-figure
---

<!-- you -->

We need a job queue: about 200 jobs a minute, order emails and PDF invoices. Team of three, already on Postgres. SQS, RabbitMQ, or just a Postgres table?

<!-- pi -->

Use a Postgres table, claimed with `SELECT … FOR UPDATE SKIP LOCKED`.

- No new infrastructure for a team of three to run.
- 200 jobs a minute is far below what one table handles: this pattern is comfortable into thousands of jobs per second.
- A job is enqueued in the same transaction as the order, so an order never exists without its email.

Move to SQS on the day another service needs to consume the same events.

<!-- you -->

fine, let's go with that. write the table schema.
