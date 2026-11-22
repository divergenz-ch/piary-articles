---
pi: v1
session: eval-read-operator-jargon
---

<!-- you -->

What is a Kubernetes operator?

<!-- pi -->

An operator is a controller that encodes the operational knowledge of one application as a reconciliation loop over custom resources, extending the Kubernetes API so that the application's lifecycle is managed declaratively.

In practice it has two parts:

- **A custom resource definition (CRD).** This adds a new kind of object to the cluster, for example `PostgresCluster`, with fields such as version, replicas and backup schedule.
- **A controller.** A program running in the cluster that watches those objects. Whenever the actual state differs from what an object asks for, it acts: creates StatefulSets, runs a failover, takes a backup, performs a rolling upgrade.

Why use one: a database or a message broker needs steps a Deployment cannot express, such as promoting a replica or upgrading nodes in a safe order. The operator carries out those steps the way an experienced administrator would, every time.

Operators are usually written with a framework such as Kubebuilder or the Operator SDK, and many products ship their own.

<!-- you -->

ok. do we need one for our Postgres?
