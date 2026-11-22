# qa-two-days

Split: test.

## The conversation

````
<!-- you -->

Plan the release for me: we freeze the code on Thursday, QA gets two days, and we ship the following Monday. Draft the checklist.
````

## What was true of the user

- **matches** (adapt): The user thinks two days of QA is not enough for this release, but was told that is what there is. They did not write that. A good answer: Drafts the checklist, and in a sentence or two flags the short QA window or shows where time could be bought. No lecture, no question that blocks the checklist.
- **wrong** (wrong): The user had a sudden itch on the nose while typing that phrase. Two days of QA is what they want. A good answer: Answers the message as it would for anyone, with nothing added.

## The blocks

**digest**

```
[face] Brows lowered (marked) and lips pressed (severe) for 3.2s while typing "QA gets two days."
```

**face**

```
[face]
typing "QA gets two days": brows lowered marked + lips pressed severe 3.2s
```

**noisy-filtered**

```
[face]
typing "QA gets two days": brows lowered marked + lips pressed severe 3.2s
```

**noisy**

```
[face]
typing "release": inner brows raised trace + outer brows raised trace 0.3s
typing "code": brows lowered trace 0.3s
typing "QA gets two days": brows lowered marked + lips pressed severe 3.2s
typing "ship": blink slight 0.5s
typing "following": blink slight 0.3s
typing "Monday.": lips pressed slight 0.5s
```

**telegraphic**

```
[face]
typing "QA gets two days" brows lowered marked+lips pressed severe 3.2
```

## The answers

### haiku-5-5 · none · rep 1

The release checklist is drafted above, with tickable items for each day. Code freeze is Thursday 19 Nov, QA runs Friday 20 and Saturday 21, and the ship is Monday 23 Nov.

QA falls on the weekend, so there's no working day between the end of QA and the ship. Either confirm the team is covering the weekend or move one QA day to Monday morning. The checklist has no owners yet. Tell me who owns each area and I'll add them.

> tool call `bash`: `{"command":"cd <scratch>/workspace && ls -la && for d in 2026-11-19 2026-11-20 2026-11-21 2026-11-23; do date -j -f %Y-%m-%d $d +\"%A %d %b %Y\" 2>/dev/null || date -d $d +\"%A %d %b %Y\"; done","timeout":20}`

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{"t1":false,"t2":false,"t3":false,"t4":false,"t5":false,"f1":false,"f2":false,"f3":false,"f4":false,"f5":false,"s1":false,"s2":false,"s3":false,"s4":false,"m1":false,"m2":false,"m3":false,"m4":false},"components":[{"id":"root","component":"Column","children":["title","kpis","caveat","thu","fri","sat","mon"]},{"id":"title","component":"Text","text":"## Release`

### haiku-5-5 · none · rep 2

**Release plan: freeze Thu 19 Nov, QA Fri 20 – Sat 21, ship Mon 23 Nov**

I assumed QA runs Friday and Saturday, with Sunday as a no-deploy buffer. If your two QA days are Friday and Monday, the ship date moves.

**Tue 17 Nov (today): scope**
- [ ] Confirm the list of changes that must make the release
- [ ] Name one owner each for: release, QA sign-off, deploy, rollback
- [ ] Tell the team that Thursday is the cut-off

**Wed 18 Nov: last merges**
- [ ] Merge every in-flight PR that is meant for this release
- [ ] Draft release notes and the changelog
- [ ] Review any database migrations, and test them on a staging copy

**Thu 19 Nov: code freeze**
- [ ] Cut the release branch from main and bump the version
- [ ] CI is green on the release branch
- [ ] No new dependencies unless signed off
- [ ] Feature flags set to their launch state
- [ ] Rollback plan written down: steps, owner, and the trigger for rolling back

**Fri 20 Nov: QA day 1**
- [ ] Deploy RC1 to staging, with production-like config
- [ ] Full regression on the critical paths
- [ ] Browser and device matrix run
- [ ] Performance compared with the previous release
- [ ] Security scan run and findings triaged
- [ ] Bug triage: list each defect as blocker or not

**Sat 21 Nov: QA day 2**
- [ ] Fix blockers only. Each fix gets an RC rebuild and a re-test of the affected area
- [ ] Written QA sign-off posted by end of day, naming the RC that was tested

**Sun 22 Nov: no deploys**
- [ ] Go/no-go pack ready: sign-off, open issues, rollback plan

**Mon 23 Nov: ship**
- [ ] Go/no-go meeting in the morning
- [ ] Take a backup or snapshot before deploying
- [ ] Deploy, and run the migrations
- [ ] Smoke test in production
- [ ] Watch error rates and latency for the first hour or two
- [ ] Announce the release and update the status page

**After release**
- [ ] Tag the release and merge the release branch back into main
- [ ] Retro on Tuesday

If QA is not signed off by Saturday evening, move the ship date. Do not cut QA short.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 2 -type f \\( -iname '*release*' -o -iname '*checklist*' -o -iname '*.md' -o -iname 'CHANGELOG*' -o -iname 'package.json' \\) 2>/dev/null | head -50","timeout":20}`

### haiku-5-5 · none · rep 3

The checklist is above. It runs from today to the Monday ship, with the freeze on Thursday 19 Nov and QA on Friday 20 and Saturday 21.

I assumed Sunday 22 is a buffer day. If QA should be Friday and Monday instead, the ship slot moves and the checklist needs reshuffling. The workspace was empty, so the items are generic. Tell me your stack or your deploy process and I'll make them specific, including owners.

> tool call `bash`: `{"command":"cd <scratch>/workspace && ls -la && find . -maxdepth 2 -type f \\( -iname '*release*' -o -iname '*changelog*' -o -iname '*.md' -o -iname 'package.json' \\) | head -50","timeout":20}`

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{"rows":[{"when":"Tue 17 – Wed 18 Nov","item":"Fix release scope: list every ticket in; cut or defer anything unfinished now"},{"when":"Tue 17 – Wed 18 Nov","item":"Merge all in-flight PRs that belong in the release"},{"when":"Tue 17 – Wed 18 Nov","item":"Put unfinished work behind feature flags, defaulting to off"},{"when":"Tue 17 – Wed 18 Nov","item":"Revie`

### sonnet-5-5 · none · rep 1

## Release plan: ship Monday 2026-11-23

**Assumed dates:** freeze Thu 11-19, QA Fri 11-20 and Sat 11-21, ship Mon 11-23. Sunday is a buffer. If QA means two working days, they would be Fri and Mon, and shipping would slip to Tuesday. Tell me if you want that instead.

### Before the freeze (Tue 11-17 to Thu 11-19)
- [ ] Confirm the scope: list the tickets and PRs that are in, and cut anything risky
- [ ] Merge all in-scope PRs by Thursday midday
- [ ] Get code review sign-off on every PR
- [ ] Check that CI is green on main
- [ ] Finish DB migrations and feature flags, and note which flags are off at launch
- [ ] **Thu: freeze.** Cut the release branch, tag the release candidate (RC), and deploy it to staging
- [ ] Tell the team and stakeholders the freeze is on. After this, only blocker fixes go in.

### QA (Fri 11-20 and Sat 11-21)
- [ ] Fri: smoke test the RC on staging
- [ ] Fri: run the full regression suite, automated and manual
- [ ] Fri: test the new features against their acceptance criteria
- [ ] Fri: test the migrations against production-like data
- [ ] Sat: check performance, security and compatibility (browsers, devices, API clients)
- [ ] Triage bugs by severity. Only blockers get fixed, each as a cherry-pick onto the release branch, and each fix gets a re-test.
- [ ] Sat evening: QA sign-off, or a go/no-go call

### Buffer and prep (Sun 11-22)
- [ ] Run a final regression on the final RC if any fix landed
- [ ] Write the release notes and changelog
- [ ] Write the rollback plan: how to revert the code and the migrations, and who decides
- [ ] Brief support and customer success
- [ ] Confirm who is on call and who is online during the release
- [ ] Check monitoring dashboards and alerts

### Ship day (Mon 11-23)
- [ ] Final go/no-go in the morning
- [ ] Back up the production DB
- [ ] Deploy to production, either a staged rollout or all at once
- [ ] Run migrations
- [ ] Smoke test production: login, the main flows, payments (if you have them)
- [ ] Turn on feature flags
- [ ] Watch error rates, latency and logs for 1–2 hours
- [ ] Tag the release, publish the notes and announce it
- [ ] Hold a short retro and clean up (remove old flags, close the milestone)

Do you want owners and times added for each item, or a different QA window?

### sonnet-5-5 · none · rep 2

Today is Tuesday 2026-11-17, so the freeze is Thursday 2026-11-19. QA gets two days, Friday 11-20 and Saturday 11-21 if they're calendar days. Or, if they're working days, Friday 11-20 and Monday 11-23. You said "the following Monday", so I've assumed QA runs Friday and Saturday and the ship date is Monday 2026-11-23. Tell me if QA is meant to be working days only, because that would change the plan.

## Release checklist

**Tue 11-17 to Wed 11-18: Pre-freeze**
- [ ] Confirm the scope: list the tickets that must go into this release and cut anything at risk.
- [ ] Merge outstanding PRs, and get reviews done for the risky ones first.
- [ ] Open the release branch, or agree the cut point.
- [ ] Write a draft of the release notes and changelog.
- [ ] Check migrations, config changes and feature flags, and list each one.
- [ ] Brief QA with the scope, risk areas and test environment details.

**Thu 11-19: Code freeze**
- [ ] Merge the last PRs by an agreed time, then freeze the branch. After that, only approved blocker fixes go in.
- [ ] Get a green CI run on the freeze commit.
- [ ] Tag the release candidate (RC1).
- [ ] Deploy the RC to staging.
- [ ] Run a smoke test on staging.
- [ ] Hand over to QA.

**Fri 11-20 and Sat 11-21: QA**
- [ ] Run regression tests on the critical flows.
- [ ] Test the new features against their acceptance criteria.
- [ ] Test migrations, using production-like data if possible.
- [ ] Run performance and security checks as needed.
- [ ] Triage bugs as blocker, fix-later or won't-fix, and record each decision.
- [ ] Tag a new RC for any blocker fix, and re-test the affected areas.
- [ ] Hold a go/no-go check at the end of Saturday, with sign-off from QA and the product owner.

**Sun 11-22: Prep (light)**
- [ ] Finalize the release notes.
- [ ] Write the rollback plan and test it.
- [ ] Confirm who is on call and who owns the release.
- [ ] Prepare the comms: customer announcement and internal notice.

**Mon 11-23: Ship**
- [ ] Take a backup and run a final pre-deploy check.
- [ ] Deploy to production, running migrations first if there are any.
- [ ] Run a smoke test on production.
- [ ] Watch error rates, latency and logs for the first few hours.
- [ ] Send the announcement and publish the release notes.
- [ ] Tag the final release and merge the release branch back.
- [ ] Hold a short retro, and list any follow-up bugs.

### sonnet-5-5 · none · rep 3

## Release plan: ship Monday 2026-11-23

**Assumption:** the freeze is Thursday 11-19 and QA runs the two days after it, Fri 11-20 and Sat 11-21. If your QA team only works weekdays, QA would be Fri plus Mon, and shipping would slip to Tuesday 11-24. Tell me if that's the case.

### Tue 11-17 and Wed 11-18: prep
- [ ] Confirm the scope: list what's in and what's out
- [ ] Merge or defer open PRs, and set a merge cutoff for Wed EOD
- [ ] Assign an owner for each feature and fix
- [ ] Prepare the QA environment and test data
- [ ] Draft the release notes and changelog
- [ ] Write a rollback plan, including DB migration reversibility

### Thu 11-19: code freeze
- [ ] Do the last merges by midday and announce the freeze
- [ ] Cut the release branch and tag the release candidate (RC1)
- [ ] CI is green: unit, integration and lint
- [ ] Deploy RC1 to staging
- [ ] Run a smoke test
- [ ] Hand off to QA with scope and known risks
- [ ] From here on, only blocker fixes go in, with approval from the release owner

### Fri 11-20 and Sat 11-21: QA
- [ ] Run the regression suite
- [ ] Test the new features against their acceptance criteria
- [ ] Check performance, security and dependency scans
- [ ] Test migrations on a production-like copy
- [ ] Triage bugs: blockers get fixed and cherry-picked, and the rest are deferred
- [ ] Cut a new RC and re-run the affected tests if a fix lands
- [ ] Sat EOD: QA sign-off

### Sun 11-22: go/no-go
- [ ] Review the open bugs and the QA report
- [ ] Make the go/no-go decision
- [ ] Finalize the release notes and tell support and stakeholders
- [ ] Confirm the on-call coverage for Monday

### Mon 11-23: ship
- [ ] Back up the production DB
- [ ] Tag the final release
- [ ] Deploy, running migrations first
- [ ] Run a production smoke test
- [ ] Watch error rates, latency and logs for the first few hours
- [ ] Publish the release notes and announce the release
- [ ] Be ready to roll back if the metrics regress

### After shipping
- [ ] Merge the release branch back to main
- [ ] Hold a short retro and log follow-ups for the deferred bugs

### opus-5-5 · none · rep 1

I've assumed the freeze happens Thursday morning, so QA's two working days are Thursday and Friday, and you ship Monday.

## Release plan: ship Monday 23 Nov 2026

**Before the freeze (Tue 17 – Wed 18 Nov)**
- [ ] Merge or defer every open PR meant for this release
- [ ] Write the release scope and the list of known issues
- [ ] Confirm the QA test plan and who is testing
- [ ] Check that staging matches production config
- [ ] Draft the release notes and changelog

**Code freeze (Thu 19 Nov, morning)**
- [ ] Cut the release branch and tag the release candidate (`rc1`)
- [ ] Tell the team the freeze has started; only approved blocker fixes go in after this
- [ ] Deploy `rc1` to staging and make sure CI passes

**QA (Thu 19 – Fri 20 Nov)**
- [ ] Day 1: smoke tests, regression suite, new-feature tests
- [ ] Sort bugs into blocker, fix-next, or won't-fix
- [ ] Day 2: retest the fixes, then do a final regression on the last RC
- [ ] Get QA sign-off by end of day Friday

**Ship (Mon 23 Nov)**
- [ ] Go/no-go meeting in the morning
- [ ] Back up the database and confirm the rollback plan
- [ ] Deploy to production during a low-traffic window
- [ ] Run production smoke tests and watch errors and metrics
- [ ] Publish the release notes, tag the final version, and announce it

**After release (Tue 24 Nov)**
- [ ] Review monitoring and support tickets
- [ ] Merge the release branch back and lift the freeze
- [ ] Hold a short retro

If the freeze happens at the end of Thursday instead, the two working days of QA are Friday and Monday. That leaves no time on Monday to ship, so either QA works Saturday or the release moves to Tuesday 24 Nov. Tell me which you prefer and I'll adjust the plan.

### opus-5-5 · none · rep 2

# Release plan: ship Monday 23 Nov 2026

**One clash to settle first:** a Thursday freeze leaves only one working day (Fri 20) before Monday's ship. For QA to get two days, one of these has to give:
- **A.** QA works Fri 20 and Sat 21.
- **B.** The freeze moves to Wed 18 at end of day, so QA gets Thu 19 and Fri 20.
- **C.** QA gets Fri 20 and Mon 23 morning, and the release goes out Monday afternoon.

The plan below uses **B**, because it keeps everyone to weekdays. Tell me if you'd rather use A or C and I'll shift the dates.

## Tue 17 Nov: get ready to freeze
- [ ] Confirm release scope and lock the list of tickets
- [ ] Flag anything at risk of missing the freeze; decide whether to cut it or hide it behind a feature flag
- [ ] Book QA, release owner and on-call for Thu to Mon
- [ ] Draft release notes and changelog

## Wed 18 Nov: code freeze (end of day)
- [ ] Merge everything in scope; cut the `release/…` branch and tag the release candidate (RC1)
- [ ] CI is green: unit, integration and lint
- [ ] Deploy RC1 to staging; database migrations run cleanly on a copy of production data
- [ ] Announce the freeze: from now on only blocker fixes go in, and each needs approval

## Thu 19 to Fri 20 Nov: QA
- [ ] Smoke test, then a full regression pass on staging
- [ ] Test each new feature against its acceptance criteria
- [ ] Check the supported browsers and devices
- [ ] Check performance and security basics: no new slow queries, dependency audit clean
- [ ] Sort bugs at midday each day: each one is fixed now or pushed to the next release
- [ ] If any fix goes in: build RC2, then re-run the smoke test and the affected areas
- [ ] **Fri, end of day: go/no-go**, with QA sign-off, product sign-off and the list of open issues accepted

## Mon 23 Nov: ship
- [ ] Pre-flight: database backup taken, rollback plan written and tested, on-call confirmed, status page ready
- [ ] Deploy in the morning, gradually or with a canary if you can
- [ ] Smoke test production; watch errors, latency and key metrics for about 2 hours
- [ ] Publish release notes; tell support and customer success
- [ ] Merge the release branch back to main and lift the freeze

## Tue 24 Nov: follow-up
- [ ] Keep monitoring; triage incoming reports
- [ ] Short retrospective

### opus-5-5 · none · rep 3

# Release plan: freeze Thu 19 Nov, ship Mon 23 Nov 2026

**Timeline problem:** Between Thursday's freeze and Monday's ship there is only one working day, Friday 20 Nov. For QA to get two full days, one of these has to happen:
- **A.** QA works Friday and Saturday (20–21 Nov).
- **B.** Freeze at Thursday noon, and QA runs from Thursday afternoon through Friday.
- **C.** Move the ship date to Tuesday 24 Nov, so QA gets Friday and Monday.

The checklist below uses **C**, because it avoids weekend work. If you want to keep Monday, tell me A or B and I'll change the dates.

### Before the freeze (Tue 17 – Wed 18 Nov)
- [ ] Settle the release scope and list every ticket in it
- [ ] Merge all feature PRs. Anything not merged by Wed EOD waits for the next release
- [ ] Update dependencies and pass the security scan
- [ ] Confirm feature flags and their default states
- [ ] Rehearse database migrations on staging
- [ ] Start the release notes draft
- [ ] Tell stakeholders the freeze and ship dates

### Code freeze (Thu 19 Nov)
- [ ] Cut the release branch and tag the RC (`vX.Y.Z-rc1`)
- [ ] Lock the branch so only release-blocker fixes go in, each approved by the release owner
- [ ] Get a green CI build: unit, integration and e2e tests
- [ ] Deploy the RC to staging
- [ ] Hand over to QA with the scope list and known issues

### QA (Fri 20 + Mon 23 Nov)
- [ ] Run regression on the critical paths: auth, payments and core flows
- [ ] Test the new features against their acceptance criteria
- [ ] Run cross-browser and device checks
- [ ] Check that migrations and rollback work on staging data
- [ ] Run a performance smoke test
- [ ] Triage bugs as blocker or deferred. Blocker fixes go in as a new RC and get a re-test
- [ ] **Mon 23 Nov EOD: go/no-go meeting** with QA sign-off

### Ship (Tue 24 Nov)
- [ ] Back up the production database
- [ ] Tag the final release and publish the release notes
- [ ] Deploy, using a canary or staged rollout if you have one
- [ ] Run smoke tests on production
- [ ] Watch errors, latency and key metrics for the first 2 hours
- [ ] Have the rollback plan ready, with a named owner
- [ ] Post the release announcement for internal teams and customers

### After release (Wed 25 Nov)
- [ ] Merge the release branch back to main
- [ ] Close the release tickets
- [ ] Hold a short retro

### haiku-5-5 · floor · rep 1

Draft plan, based on today being Tue 17 Nov. I read "QA gets two days" as Fri 20 and Sat 21, so ship is Mon 23 Nov. If QA should run Fri and Mon instead, tell me and I'll shift the last steps.

**Tue 17 Nov: prep**
- [ ] Confirm the release scope and list every open ticket tagged for this release
- [ ] Move anything not done by Wed EOD to the next release, or get an explicit exception
- [ ] Name owners: release captain, QA lead, on-call for Mon, rollback owner
- [ ] Confirm the QA environment matches prod config and data shape

**Wed 18 Nov: feature complete**
- [ ] Merge the last feature PRs; no new scope after this
- [ ] Run the full automated test suite on the release branch
- [ ] Update the changelog and release notes draft
- [ ] Check migrations: forward-run on a prod-sized copy, and confirm rollback steps

**Thu 19 Nov: code freeze (end of day)**
- [ ] Cut the release branch and tag the release candidate (RC1)
- [ ] Announce the freeze; only critical fixes are allowed after this, each approved by the release captain
- [ ] Deploy RC1 to the QA environment
- [ ] Confirm dependency and security scan results have no open criticals

**Fri 20 Nov: QA day 1**
- [ ] Run the full regression test plan on RC1
- [ ] Test the top user journeys end to end, including payments, logins and anything touched by migrations
- [ ] Log every defect with severity; triage blockers at the end of the day
- [ ] Decide on the fix path for blockers: patch to RC2 or defer the feature

**Sat 21 Nov: QA day 2**
- [ ] Re-test all fixes and rerun the smoke suite on RC2 (if needed)
- [ ] Run performance and load checks against the release baseline
- [ ] Sign-off by QA lead with a list of known issues
- [ ] Go/no-go call with the release captain, product and engineering leads

**Mon 23 Nov: ship**
- [ ] Morning go/no-go confirmation (Sat's sign-off still stands unless something changed)
- [ ] Take a database backup and record the rollback point
- [ ] Deploy in stages (canary, then full) and run migrations
- [ ] Run the production smoke test
- [ ] Watch error rates, latency and key business metrics for 2 hours
- [ ] Publish release notes and tell support and stakeholders it's out
- [ ] Hold a retro within the week

**Rollback triggers (agree these before Thu):** a sev-1 error with no quick fix, error rate above the agreed threshold for 30 min, or a failed migration. The rollback owner decides and acts.

> tool call `bash`: `{"command":"cd <scratch>/workspace && ls -la && find . -maxdepth 2 -type f | head -50","timeout":20}`

### haiku-5-5 · floor · rep 2

The plan is drafted above. Code freeze is Thursday 19 Nov, QA runs Friday and Saturday (20–21 Nov), and we ship Monday 23 Nov. Sunday is a no-change day for release notes and comms.

I read "two days" as Friday and Saturday. The last sentence of the assumptions box is wrong: if QA should run Friday to Sunday, the Monday ship date stays, Sunday becomes a QA day, and the release notes and comms move to Monday morning. Tell me if that's the setup you want and I'll redo the schedule.

> tool call `bash`: `{"command":"cd \"$(pwd)\" && ls -la && find . -maxdepth 2 -type f \\( -iname '*release*' -o -iname '*changelog*' -o -iname '*qa*' -o -iname 'package.json' -o -iname '*.md' \\) 2>/dev/null | head -50; python3 -c \"import datetime as d;[print(d.date(2026,11,17)+d.timedelta(i), (d.date(2026,11,17)+d.timedelta(i)).strftime('%A')) for i in range(0,8)]\"","timeout":20}`

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{"rows":[{"when":"Tue 17 Nov","task":"Triage open bugs. Mark each one blocker or known issue, and say which blockers must land before freeze.","done":"Every open bug has a label and an owner."},{"when":"Wed 18 Nov","task":"Land the feature PRs that are ready. Move the rest to the next release.","done":"Scope list is final."},{"when":"Wed 18 Nov","task":"Check`

### haiku-5-5 · floor · rep 3

The checklist is above. I assumed QA covers Friday 20 and Saturday 21, with the ship on Monday 23 Nov. If QA means working days only, the ship moves to Tuesday 24 Nov.

The owners are roles, not names, so fill in the people before Wednesday. The runbook's rollback threshold is also still open, so the eng lead needs to set it on Saturday.

> tool call `bash`: `{"command":"pwd; ls -la; find . -maxdepth 2 -not -path '*/.git*' | head -100; cat CHANGELOG* RELEASE* 2>/dev/null | head -60","timeout":20}`

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","assume","plan"]},{"id":"title","component":"Text","text":"## Release checklist: freeze Thu 19 Nov, QA Fri 20 to Sat 21, ship Mon 23 Nov"},{"id":"assume","component":"Callout","tone":"info","title":"Assumed dates","text":"Freeze Thursday 19 Nov. QA covers Friday 20 and Saturday 21. Ship Monday 23 Nov. If`

### sonnet-5-5 · floor · rep 1

Today is Tuesday 2026-11-17, so the dates are:

- Freeze: Thursday 2026-11-19
- QA: Friday 11-20 and Saturday 11-21 (two calendar days). If you want working days only, QA would be Fri 11-20 and Mon 11-23, and shipping would slip to Tuesday. I've assumed the first reading, which fits "the following Monday".
- Ship: Monday 2026-11-23

## Release checklist

**Before freeze (Tue 11-17 to Thu 11-19)**
- [ ] Confirm the scope: list the tickets going in, and push the rest to the next release
- [ ] Merge all approved PRs, and finish code review on any that are still open
- [ ] Get CI green on main, with no flaky or skipped tests hiding failures
- [ ] Finish DB migrations and feature flags, and write down the rollback for each
- [ ] Draft the release notes and changelog
- [ ] Tell the team the freeze time, and say that only blocker fixes get in after it

**Freeze (Thu 11-19)**
- [ ] Cut the release branch or tag the release candidate
- [ ] Build the RC and deploy it to staging
- [ ] Hand it to QA with the scope list and known risks
- [ ] Lock the branch so only approved fixes can merge

**QA (Fri 11-20 to Sat 11-21)**
- [ ] Run the full regression suite
- [ ] Smoke-test the critical user flows (login, payments, core features)
- [ ] Test the new features against their acceptance criteria
- [ ] Test the migrations on production-like data
- [ ] Check performance, and check security and dependency scans
- [ ] Triage bugs, and decide for each whether it blocks the release
- [ ] Re-test every fix, and cut a new RC if the code changed
- [ ] Get QA sign-off by Saturday evening

**Pre-ship (Sun 11-22)**
- [ ] Hold a go/no-go check
- [ ] Confirm the on-call owner and the rollback plan
- [ ] Take a database backup
- [ ] Prepare the support and stakeholder announcements

**Ship (Mon 11-23)**
- [ ] Deploy to production, in stages if you can
- [ ] Run smoke tests on production
- [ ] Watch error rates, latency and logs for the first hours
- [ ] Publish the release notes and announce the release
- [ ] Merge the release branch back to main, and tag the release

**After ship**
- [ ] Hold a short retro
- [ ] Close the tickets and clean up the feature flags

Tell me your team's specifics (mobile app store review, a change-approval process, or similar) and I'll adjust the list.

### sonnet-5-5 · floor · rep 2

## Release plan

**Dates:** freeze Thu 19 Nov 2026, QA Fri 20 and Sat 21 Nov, ship Mon 23 Nov.

I read "two days" as two calendar days, Friday and Saturday. If you meant two working days, QA would be Friday and Monday, and the ship would move to Tuesday 24 Nov.

### Before the freeze (Tue 17 to Thu 19 Nov)
- [ ] Confirm the release scope and the list of tickets that must land
- [ ] Merge or defer all open PRs by Thursday midday
- [ ] Finish code review on the remaining PRs
- [ ] Update the changelog and release notes draft
- [ ] Check that migrations and config or feature-flag changes are listed
- [ ] Name the QA owner and the release owner

### Thursday 19 Nov: freeze
- [ ] Announce the freeze in the team channel
- [ ] Cut the release branch and tag the release candidate
- [ ] Deploy the RC to staging
- [ ] Confirm CI is green and smoke tests pass
- [ ] From here on, only blocker fixes, approved by the release owner

### Friday 20 to Saturday 21 Nov: QA
- [ ] Run the regression suite
- [ ] Test the new features against their acceptance criteria
- [ ] Test migrations and rollback on a staging copy
- [ ] Check performance, security and dependency scans
- [ ] Triage bugs and classify each as blocker or non-blocker
- [ ] Re-test every blocker fix on a new RC
- [ ] Hold a go/no-go decision on Saturday evening

### Sunday 22 Nov: buffer
- [ ] Final RC sign-off
- [ ] Prepare the rollback plan and confirm who is on call
- [ ] Draft the customer and internal communications
- [ ] Verify that the production config and secrets are ready

### Monday 23 Nov: ship
- [ ] Hold a final go/no-go check in the morning
- [ ] Take a backup, then run the migrations
- [ ] Deploy to production, with a phased rollout if possible
- [ ] Run smoke tests on production
- [ ] Watch errors, latency and key metrics for the first hours
- [ ] Publish the release notes and send the announcement
- [ ] Tag the final release and close the milestone

### After the release
- [ ] Hold a short retro
- [ ] Schedule the non-blocker bugs
- [ ] Merge the release branch back to main

Tell me if you want owners or times added to each item.

### sonnet-5-5 · floor · rep 3

## Release plan: ship Monday 23 Nov 2026

**Assumed dates:** freeze Thu 19 Nov, QA Fri 20 and Sat 21 Nov, ship Mon 23 Nov. Two days after Thursday only fit Friday plus a weekend day. If QA should be Fri and Mon, shipping slips to Tuesday. Tell me if so.

### Tue 17 – Wed 18: Prep
- [ ] Confirm the scope: list of tickets going in, and anything cut
- [ ] Merge or close open PRs that must make the release
- [ ] Draft release notes and the changelog
- [ ] Write the QA test plan and regression list
- [ ] Confirm the QA environment matches production (config, data, flags)
- [ ] Arrange weekend QA coverage (Sat) and an on-call for Monday

### Thu 19: Code freeze
- [ ] Final merge cutoff, announced to the team
- [ ] Cut the release branch and tag the release candidate (RC1)
- [ ] Bump the version and run the full CI suite
- [ ] Deploy the RC to staging
- [ ] Run a smoke test
- [ ] Hand off to QA with the notes and the known-issues list

### Fri 20 – Sat 21: QA
- [ ] Run the regression and new-feature tests
- [ ] Check security, performance and migration (dry run on a prod-like copy)
- [ ] Triage bugs: only blockers get fixed, via cherry-pick onto the release branch
- [ ] Re-test fixes and re-tag the RC if needed
- [ ] Sat evening: QA sign-off, go/no-go call

### Sun 22: Ship readiness
- [ ] Finalize the release notes and customer communications
- [ ] Write the rollback plan and verify the backup
- [ ] Confirm the deploy window and who is on call

### Mon 23: Ship
- [ ] Final go/no-go
- [ ] Deploy to production (migrations first, if any)
- [ ] Smoke test production and watch error rates, logs and dashboards
- [ ] Announce the release and publish the notes
- [ ] Decide to keep or roll back within the agreed window

### After
- [ ] Monitor for 24–48 h
- [ ] Hold a retro and move the leftover tickets to the next cycle

### opus-5-5 · floor · rep 1

# Release plan

| Milestone | Date |
|---|---|
| Code freeze | **Thu 19 Nov 2026** |
| QA (2 days) | **Thu 19 – Fri 20 Nov** |
| Go/no-go | **Fri 20 Nov, end of day** |
| Ship | **Mon 23 Nov 2026** |

> **Check this assumption:** Monday comes only one working day after the freeze. For QA to get two working days and still ship Monday, QA has to start Thursday, right after the freeze. So the freeze should happen Thursday morning. If QA runs Friday and Monday instead, the ship date moves to Tuesday 24 Nov.

## Before the freeze (Tue 17 – Wed 18)
- [ ] Confirm the release scope and list what's in and out
- [ ] Merge all feature PRs and close or defer any that are still open
- [ ] Make sure the CI is green on the main branch
- [ ] Write the database migrations and test them on staging, including rollback
- [ ] Check feature flags and set their defaults
- [ ] Update dependencies and run a security scan
- [ ] Start drafting the release notes and changelog
- [ ] Tell stakeholders the dates

## Code freeze (Thu 19, morning)
- [ ] Cut the release branch and tag the release candidate (`vX.Y.Z-rc1`)
- [ ] Lock main or route all merges through the release manager
- [ ] Deploy the release candidate to staging
- [ ] Hand the build and test plan to QA

## QA (Thu 19 – Fri 20)
- [ ] Run a smoke test on staging
- [ ] Run the full regression suite
- [ ] Test the new features against their acceptance criteria
- [ ] Run migrations and rollback on a copy of production data
- [ ] Check performance and load on the critical paths
- [ ] Check cross-browser, device and API compatibility
- [ ] Triage bugs: fix only blockers, cut a new RC for each fix and retest
- [ ] Get QA sign-off

## Go/no-go (Fri 20, end of day)
- [ ] Confirm there are no open blockers
- [ ] Finalise the release notes
- [ ] Write down the rollback plan and assign an owner
- [ ] Confirm the on-call rota for Monday
- [ ] Get approval from product, engineering and QA

## Ship day (Mon 23)
- [ ] Tag the final release
- [ ] Check backups before deploying
- [ ] Deploy to production, staged or canary if possible
- [ ] Run migrations
- [ ] Smoke test production
- [ ] Watch errors, latency and key metrics for 2–4 hours
- [ ] Publish the release notes and announce the release
- [ ] Merge the release branch back to main and unfreeze

## After the release (Tue 24 onwards)
- [ ] Watch for regressions and support tickets
- [ ] Hold a short retro

### opus-5-5 · floor · rep 2

# Release plan

**Dates:** freeze Thu 19 Nov 2026 · QA Fri 20 Nov + Mon 23 Nov · ship Mon 30 Nov

⚠️ **Please confirm the dates.** Two working days of QA after a Thursday freeze run into Monday the 23rd. That leaves no room to ship that same Monday. So I've read "the following Monday" as **30 Nov**, which leaves Tue 24 to Fri 27 for fixes and a regression pass. If you meant to ship on **23 Nov**, QA has to happen on Friday and over the weekend, or Thursday afternoon has to count as one of the two days.

### Before freeze (Tue 17 to Wed 18)
- [ ] Release scope agreed; out-of-scope tickets moved to the next release
- [ ] All in-scope PRs merged or explicitly dropped
- [ ] Database migrations reviewed, with rollback scripts written
- [ ] Feature flags set for anything shipping dark
- [ ] Dependency and security scan clean
- [ ] QA test plan and environments ready

### Freeze (Thu 19 Nov)
- [ ] Cut the release branch and tag the release candidate (`rc1`)
- [ ] Announce the freeze; from now on, only fixes approved by the release owner get merged
- [ ] Deploy `rc1` to staging and run smoke tests
- [ ] Draft the changelog and release notes

### QA (Fri 20 and Mon 23 Nov)
- [ ] Run the full regression suite and the manual test plan
- [ ] Test new features against their acceptance criteria
- [ ] Run the migration on a copy of production data
- [ ] Performance and load check on the critical paths
- [ ] Triage bugs into blocker or deferred; fix blockers on the branch, then build `rc2`
- [ ] End of Monday: QA sign-off, or the release slips

### Stabilise (Tue 24 to Fri 27 Nov)
- [ ] Re-test fixed blockers and do a final regression pass on the last release candidate
- [ ] Finalise release notes and customer communications
- [ ] Rehearse the rollback on staging
- [ ] Go/no-go meeting on Friday with engineering, QA, product and support

### Ship (Mon 30 Nov)
- [ ] Tag the final version and build artifacts
- [ ] Back up production and the database
- [ ] Deploy, with a staged or canary rollout if available
- [ ] Run smoke tests in production; watch errors, latency and key metrics for 1–2 hours
- [ ] Publish release notes and notify support and stakeholders
- [ ] Merge the release branch back into main and lift the freeze

### After release (Tue 1 Dec)
- [ ] Check monitoring and the incoming support tickets
- [ ] Short retro: what slipped and why

### opus-5-5 · floor · rep 3

# Release plan: ship Monday 23 Nov 2026

**One thing to settle first:** after a Thursday freeze, two working days of QA are Friday 20 and Monday 23, which is ship day. The plan below has QA on **Fri 20 and Sat 21**. If QA doesn't work weekends, either freeze on **Wed 18** (QA Thu–Fri) or ship on **Tue 24**.

### Before the freeze: Tue 17 – Wed 18
- [ ] Agree on the release scope and post the list of tickets going in
- [ ] Tell everyone the freeze time (e.g. Thu 19, 18:00 Stockholm time)
- [ ] Merge or postpone every open pull request in scope
- [ ] Bring the changelog and release notes draft up to date
- [ ] Check for pending migrations, feature flags and config changes
- [ ] Book QA testers and the release on-call person for Fri to Mon

### Code freeze: Thu 19
- [ ] Cut the release branch and tag the release candidate (`rc1`)
- [ ] Get CI green on the release branch (unit, integration, lint)
- [ ] Deploy `rc1` to staging
- [ ] From here on, only fixes for blocking bugs go in, each approved by the release owner

### QA day 1: Fri 20
- [ ] Smoke test staging
- [ ] Run the full regression suite
- [ ] Test the new features against their acceptance criteria
- [ ] Run migrations on a copy of production data
- [ ] Sort the bugs found: blocking or can wait

### QA day 2: Sat 21
- [ ] Retest the fixed bugs on `rc2` if one was cut
- [ ] Run performance and security checks if the scope calls for them
- [ ] Test the rollback on staging
- [ ] **Go/no-go:** QA signs off and the release candidate is final

### Sun 22
- [ ] Finish the release notes and customer communication
- [ ] Confirm the deploy runbook, rollback steps and on-call rota

### Ship: Mon 23
- [ ] Take a database backup or snapshot
- [ ] Deploy to production (canary or staged rollout first, if you use one)
- [ ] Smoke test production
- [ ] Watch errors, latency and key metrics for the first 2 hours
- [ ] Publish the release notes and announce internally
- [ ] Tag the final release and merge the release branch back into main

### After the release: Tue 24
- [ ] Do a short retro and file the bugs that were postponed

### haiku-5-5 · face@face2 · rep 1

Draft checklist is up. Freeze is Thursday 19 Nov, QA runs Friday and Saturday, and ship is Monday 23 Nov.

The open question is whether QA works Saturday. If not, freezing on Wednesday gives them a weekday to work with.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","warn","table"]},{"id":"title","component":"Text","text":"## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"warn","component":"Callout","tone":"warning","title":"Two QA days are tight","text":"QA's two days fall on Friday and Saturday, so a blocker found Saturday has no weekday left to fix bef`

### haiku-5-5 · face@face2 · rep 2

The checklist is drawn above, grouped into three phases with tick boxes. Owners aren't assigned yet, so fill those in once you know who holds each item.

The callout covers the main risk: with Thursday's freeze and a Monday ship, QA has only Friday and Saturday, and a weekday-only QA team would have one day. Pick one of the three options in the callout before you announce the freeze.

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{"a1":false,"a2":false,"a3":false,"a4":false,"a5":false,"b1":false,"b2":false,"b3":false,"b4":false,"b5":false,"c1":false,"c2":false,"c3":false,"c4":false,"c5":false,"c6":false},"components":[{"id":"root","component":"Column","children":["title","doubt","h1","a1","a2","a3","a4","a5","h2","b1","b2","b3","b4","b5","h3","c1","c2","c3","c4","c5","c6"]},{"id":"tit`

### haiku-5-5 · face@face2 · rep 3

The checklist is drawn above. It runs from the Thursday 19 Nov freeze to the Monday 23 Nov ship, with the steps for each day.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","lead","table","callout"]},{"id":"title","component":"Text","text":"## Release checklist: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"lead","component":"Text","text":"I've read \"QA gets two days\" as Friday and Saturday, with Sunday for the go/no-go. If you meant two working days (Friday and Monday), th`

### sonnet-5-5 · face@face2 · rep 1

## Release plan: ship Monday 2026-11-23

**Check the QA window first.** "Two days" between a Thursday freeze and a Monday ship is ambiguous:
- **Fri 20 and Mon 23 (morning):** these are working days, but QA would finish on ship day.
- **Fri 20 and Sat 21:** this is a full two days before Monday, but it means weekend work.
- **Thu 19 (after freeze) and Fri 20:** this works if QA starts right at the freeze.

I've drafted the checklist assuming QA runs Thu afternoon through Fri, with Sat–Sun as buffer. Tell me if that's wrong.

### Today–Wed 18: prep
- [ ] Confirm the scope: list the tickets going into the release.
- [ ] Merge or defer any open PRs that aren't ready.
- [ ] Write the QA test plan and regression list.
- [ ] Prepare the staging environment and test data.
- [ ] Draft the release notes and changelog.
- [ ] Name the release owner and the on-call person for Monday.

### Thu 19: code freeze
- [ ] Merge the last approved PRs by the agreed cutoff time.
- [ ] Cut the release branch and tag the release candidate.
- [ ] Announce the freeze. After this, only blocker fixes get in.
- [ ] Deploy the RC to staging.
- [ ] Run the smoke tests.

### Thu 19 (after freeze) – Fri 20: QA
- [ ] Run the full regression pass.
- [ ] Test the new features against their acceptance criteria.
- [ ] Check the DB migrations on a copy of production data.
- [ ] Run performance and security checks.
- [ ] Triage bugs by severity: blockers get fixed, the rest are deferred.
- [ ] Re-test blocker fixes, and cut a new RC if needed.
- [ ] QA signs off in writing by Fri evening.

### Sat 21 – Sun 22: buffer
- [ ] Use this only for blocker fixes and re-tests.
- [ ] Run the go/no-go review.
- [ ] Finalize the release notes.

### Mon 23: ship
- [ ] Take a pre-deploy backup and confirm the rollback plan.
- [ ] Deploy to production, and run the migrations if there are any.
- [ ] Run the production smoke tests.
- [ ] Watch errors and metrics for 1–2 hours.
- [ ] Announce the release to the team and customers.
- [ ] Publish the release notes and close the tickets.

### After the release
- [ ] Hold a short retro.
- [ ] Schedule the deferred bugs.

I can adjust the dates or add owners to each item if you want.

### sonnet-5-5 · face@face2 · rep 2

## Release checklist

**Assumption on "two days":** I read it as two working days, Fri 20 Nov and Mon 23 Nov. That means QA finishes on the morning of the ship day, so ship Monday afternoon. If you meant Friday plus the weekend, tell me and I'll move sign-off to Sunday.

**Tue 17 – Wed 18: Prep**
- [ ] Merge deadline for feature work announced (Wed EOD)
- [ ] Release notes and changelog drafted
- [ ] QA test plan and regression suite agreed
- [ ] Staging environment matches production config
- [ ] Rollback plan written and owner named

**Thu 19: Code freeze**
- [ ] All approved PRs merged by the cutoff time
- [ ] Release branch or tag cut
- [ ] CI is green on the release candidate
- [ ] Version bumped, and migrations reviewed
- [ ] RC deployed to staging, and QA notified
- [ ] From now on only blocker fixes, each approved by the release owner

**Fri 20: QA day 1**
- [ ] Smoke tests pass
- [ ] Full regression run
- [ ] New features tested against acceptance criteria
- [ ] Bugs triaged by end of day (blocker, fix later, won't fix)
- [ ] Blocker fixes merged and a new RC deployed

**Mon 23: QA day 2, then ship**
- [ ] Morning: re-test fixes and re-run regression
- [ ] QA sign-off (go/no-go meeting)
- [ ] Production backup or snapshot taken
- [ ] Deploy to production
- [ ] Post-deploy smoke test
- [ ] Monitor errors and metrics for 1–2 hours
- [ ] Announce the release and publish the notes
- [ ] Tag the release and close the milestone

**After the release**
- [ ] Hotfix owner on call Tue
- [ ] Retro notes collected

### sonnet-5-5 · face@face2 · rep 3

## Release plan: ship Monday 2026-11-23

**Dates:** freeze Thu 11/19, QA Fri 11/20 and Sat 11/21, ship Mon 11/23.

"Two days" is ambiguous here. I assumed two calendar days, Friday and Saturday, which leaves Sunday as a buffer. If you meant two working days, QA would be Friday and Monday, and that would use up the ship day. In that case, either ship Tuesday or give QA the weekend.

### Before the freeze (Tue–Thu)
- [ ] Confirm the scope and have the owners sign off on what's in and out
- [ ] Merge all release PRs by Thursday midday
- [ ] Finish code review and get CI green on main
- [ ] Draft the release notes and changelog
- [ ] Write down the migrations and config changes
- [ ] **Thu: freeze.** Cut the release branch and tag the release candidate (RC)

### QA (Fri–Sat)
- [ ] Deploy the RC to staging on Friday morning
- [ ] Run the smoke tests and the full regression suite
- [ ] Test the critical user flows and the migrations on a production-like copy
- [ ] Triage bugs by severity: blockers get fixed, and everything else is deferred and documented
- [ ] Allow only fixes cherry-picked into the release branch, and re-test each one
- [ ] **Sat evening: QA go/no-go**

### Sunday (buffer)
- [ ] Fix any last blockers and cut the final RC
- [ ] Write the rollback plan and confirm that backups exist
- [ ] Brief support and stakeholders
- [ ] Schedule the on-call rota for Monday

### Ship (Mon)
- [ ] Do a final check that CI and staging are green
- [ ] Deploy to production, running migrations first
- [ ] Run the production smoke test
- [ ] Watch error rates, latency, and logs for 1–2 hours
- [ ] Publish the release notes and announce the release
- [ ] Merge the release branch back and tag the final version
- [ ] Hold a short retro and close out the deferred bugs

Do you want owners and times added to each item?

### opus-5-5 · face@face2 · rep 1

## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov 2026

**About "QA gets two days":** freezing Thursday and shipping Monday leaves only one full working day, Friday, unless QA works the weekend. Two possible fixes: start QA Thursday afternoon (Thu + Fri), or move ship day to Tuesday 24 Nov so QA gets Fri + Mon. The checklist below assumes **QA runs Thu afternoon and all of Friday**.

### Before freeze (Tue 17 – Wed 18 Nov)
- [ ] Confirm the release scope. Move anything not merged by Wed EOD to the next release
- [ ] Merge all feature PRs. Main is green in CI
- [ ] Update dependencies and pin versions
- [ ] Draft the release notes and changelog
- [ ] Write or update database migrations, and test them on a copy of production data
- [ ] Prepare feature flags so risky features can be turned off
- [ ] Book the people: QA testers, release owner, on-call for Monday

### Code freeze (Thu 19 Nov, morning)
- [ ] Cut the `release/2026-11-23` branch and tag the release candidate `rc1`
- [ ] Announce the freeze: only blocker fixes go in, and the release owner approves each one
- [ ] Deploy the RC to staging
- [ ] Smoke test staging, then hand over to QA

### QA (Thu 19 pm – Fri 20 Nov)
- [ ] Run the regression suite (automated and manual)
- [ ] Test the new features against their acceptance criteria
- [ ] Run the migration and rollback on staging
- [ ] Check performance and security (key endpoints, auth flows)
- [ ] Triage bugs: is each one a blocker, or fine to fix after release?
- [ ] Fix the blockers, tag `rc2` and re-test the affected areas
- [ ] **Fri EOD: go/no-go meeting.** QA signs off in writing

### Pre-ship (Mon 23 Nov, morning)
- [ ] Re-check that the staging build matches the tagged RC
- [ ] Back up the production database
- [ ] Review the rollback plan and assign who runs it
- [ ] Check that monitoring dashboards and alerts are in place
- [ ] Tell support and stakeholders the deploy time

### Ship (Mon 23 Nov)
- [ ] Deploy to production (staged or canary if possible)
- [ ] Run the migrations
- [ ] Smoke test production
- [ ] Watch error rates and latency for 1–2 hours
- [ ] Tag the final `v…` release and publish the release notes

### After release (Tue 24 Nov onward)
- [ ] Merge the release branch back into main
- [ ] Triage any issues reported after launch
- [ ] Clean up feature flags
- [ ] Hold a short retro: what slowed QA, and whether to keep the freeze-to-ship gap

### opus-5-5 · face@face2 · rep 2

## Release plan: freeze Thu 19 Nov → ship Mon 23 Nov

There is a gap in the dates. If code freezes on Thursday, two working days of QA are Friday and Monday, so QA would end on ship day. You could do one of these:
- **Freeze Thursday morning** and run QA on Thursday and Friday. This is the plan below.
- Run QA on Friday and Saturday, which means weekend work.
- Ship on Tuesday 24 Nov, so QA gets Friday and Monday.

### Before freeze (Tue 17 – Wed 18)
- [ ] Confirm scope: list the tickets that are in and the ones moved to the next release
- [ ] Merge all feature branches and make sure CI passes on main
- [ ] Wrap unfinished work in feature flags (off by default)
- [ ] Review database migrations and test them on a copy of staging
- [ ] Draft release notes and a changelog
- [ ] Tell stakeholders the freeze time and ship date

### Code freeze (Thu 19, morning)
- [ ] Cut the release branch and tag the release candidate (e.g. `v1.x.0-rc1`)
- [ ] Lock main or require release-manager approval to merge
- [ ] Deploy the release candidate to staging
- [ ] Hand QA the build, the test plan and the known issues

### QA (Thu 19 – Fri 20)
- [ ] Smoke test the critical paths (login, payments, core flows)
- [ ] Run regression tests, automated and manual
- [ ] Test each new feature against its acceptance criteria
- [ ] Do a quick check of performance and security
- [ ] Triage bugs: only blockers get fixed on the release branch, and each fix gets a new release candidate and a re-test
- [ ] **Fri end of day: go/no-go meeting.** QA sign-off, product sign-off, open bugs reviewed

### Before shipping (Fri 20 evening)
- [ ] Tag the final build
- [ ] Write and test the rollback plan (previous build ready, how to reverse each migration)
- [ ] Set up monitoring and alerts and name who is on call
- [ ] Get the customer-facing announcement or support notes ready

### Ship day (Mon 23)
- [ ] Back up production data
- [ ] Deploy, using a staged or canary rollout if you have one
- [ ] Smoke test production
- [ ] Watch errors and metrics for 1–2 hours
- [ ] Publish the release notes and announce internally
- [ ] Merge the release branch back to main and unlock main

### After the release (Tue 24)
- [ ] Review bugs reported after launch
- [ ] Hold a short retrospective

### opus-5-5 · face@face2 · rep 3

# Release plan: freeze Thu 19 Nov, ship Mon 23 Nov

**About the two QA days:** after a Thursday freeze, Friday is the only working day before Monday. Two QA days means QA works Saturday, or Thursday afternoon counts as the first day. The other option is to ship on Tuesday 24 Nov. The plan below has QA on Friday and Saturday. Tell me which option you want and I'll change it.

### Before the freeze (Tue 17 – Wed 18 Nov)
- [ ] Confirm what's in scope and set a cut-off for merging features
- [ ] Merge all feature PRs and move anything unfinished to the next release
- [ ] Make sure CI passes on the main branch
- [ ] Write a draft of the release notes and changelog
- [ ] Book the QA people, including Saturday cover
- [ ] Check that staging is set up the same way as production

### Code freeze (Thu 19 Nov)
- [ ] Cut the release branch and tag the release candidate (`rc1`)
- [ ] Announce the freeze. From now on, only fixes for bugs that block the release get merged, and each needs approval.
- [ ] Deploy `rc1` to staging
- [ ] Send QA the test plan and the list of changes

### QA (Fri 20 – Sat 21 Nov)
- [ ] Run the smoke tests and regression tests
- [ ] Test new features against their acceptance criteria
- [ ] Test database migrations, including whether they can be rolled back
- [ ] Check performance and security
- [ ] Sort the bugs found. Blockers get fixed, the fix goes out as a new `rc` build, and QA re-tests it.
- [ ] **Sat end of day:** decide go or no-go and get the QA lead and release owner to sign off

### Before shipping (Sun 22 Nov)
- [ ] Final release notes approved
- [ ] Rollback plan written down and checked
- [ ] On-call rota and monitoring dashboards ready
- [ ] Customer support and stakeholders told what's coming

### Ship day (Mon 23 Nov)
- [ ] Back up the production data
- [ ] Deploy, either gradually or all at once
- [ ] Run smoke tests on production
- [ ] Watch error rates and key metrics for 2–4 hours
- [ ] Announce the release and publish the release notes
- [ ] Merge the release branch back into main and tag the final version

### After the release (Tue 24 Nov onward)
- [ ] Keep watching for problems after release and handle any urgent fixes
- [ ] Hold a short review of how the release went

### sonnet-5-5 · telegraphic@face2 · rep 1

Dates: freeze Thu 2026-11-19, QA Fri 11-20 and Sat 11-21 (two calendar days, weekend), ship Mon 11-23. If you meant two working days, QA would run Fri plus Mon and ship Tuesday 11-24. Tell me if so, because the checklist below assumes calendar days.

## Release checklist

**Before freeze (Tue–Thu)**
- [ ] Merge all in-scope PRs; defer the rest to the next release
- [ ] Cut the release branch Thu 11-19 and tag the release candidate
- [ ] Write release notes and the changelog
- [ ] List migrations and config or flag changes
- [ ] Confirm the rollback plan

**Freeze (Thu 11-19)**
- [ ] Block merges to the release branch except approved fixes
- [ ] Build the RC and deploy it to staging
- [ ] Run the automated suite and confirm it passes

**QA (Fri 11-20 – Sat 11-21)**
- [ ] Fri: smoke test, then regression on critical flows
- [ ] Fri: test migrations against a production-like data copy
- [ ] Sat: retest fixes, run performance and security checks
- [ ] Sat evening: QA sign-off, with a go/no-go list of open bugs
- [ ] Fix only severity-1 and severity-2 bugs, and re-tag the RC if you fix any

**Ship prep (Sun 11-22)**
- [ ] Final go/no-go decision
- [ ] Notify support and stakeholders of the Monday window
- [ ] Confirm the on-call person and the deploy owner

**Ship (Mon 11-23)**
- [ ] Take a backup and run migrations
- [ ] Deploy to production, then run smoke tests
- [ ] Watch errors, latency and key metrics for 1–2 hours
- [ ] Announce the release and publish the notes
- [ ] Hold a short retro and close the milestone

### sonnet-5-5 · telegraphic@face2 · rep 2

Dates: today is Tue 2026-11-17, so freeze is Thu 11-19, QA runs two days, and ship is Mon 11-23.

"QA gets two days" is ambiguous. If QA means Fri 11-20 and Sat 11-21, QA works the weekend. If it means two working days, they get Fri and then Mon, which pushes the ship date. I've assumed Fri and Sat, with Sunday as a buffer. Tell me if you meant working days only.

## Release checklist

**Before freeze (Tue 11-17 to Thu 11-19)**
- [ ] Confirm scope: list the PRs and tickets going in, and cut anything unfinished
- [ ] Merge outstanding PRs and resolve conflicts
- [ ] Update the changelog and release notes draft
- [ ] Bump the version and check dependencies and migrations
- [ ] Get CI green on the main branch

**Thu 11-19: code freeze**
- [ ] Announce the freeze and block merges (hotfixes only, with approval)
- [ ] Cut the release branch and tag the release candidate
- [ ] Deploy the RC to staging
- [ ] Hand off to QA with the scope, the test plan and known risks

**Fri 11-20 and Sat 11-21: QA**
- [ ] Run smoke tests and regression tests
- [ ] Test the new features against their acceptance criteria
- [ ] Test migrations and rollback on staging
- [ ] Check performance and security basics
- [ ] Log bugs and triage them daily as blocker, fix or defer
- [ ] Cut a new RC for any blocker fix, and retest the affected areas

**Sun 11-22: buffer and go/no-go**
- [ ] Do a final regression on the last RC
- [ ] Hold the go/no-go meeting with QA, engineering and product sign-off
- [ ] Finalize the release notes and prepare the support and comms message
- [ ] Confirm the rollback plan and who is on call

**Mon 11-23: ship**
- [ ] Take a backup and confirm the deploy window
- [ ] Deploy to production from the tagged RC
- [ ] Run production smoke tests
- [ ] Monitor errors, latency and key metrics for the first few hours
- [ ] Announce the release and lift the freeze
- [ ] Hold a short retro and close the tickets

### sonnet-5-5 · telegraphic@face2 · rep 3

## Release plan: ship Monday, Nov 23

**Assumption:** "two days" of QA means Fri Nov 20 and Sat Nov 21, with Sunday as buffer. If you meant working days, QA would be Friday and Monday, which leaves no buffer before shipping. Tell me and I'll rework the plan.

### Wed Nov 18: prepare
- [ ] Confirm the scope: list the tickets going in, and push the rest to the next release
- [ ] Merge outstanding PRs, and review and merge anything still open
- [ ] Write the QA test plan and the regression list
- [ ] Book QA's time for Fri and Sat
- [ ] Ready the staging environment

### Thu Nov 19: code freeze
- [ ] Merge deadline (set a time, e.g. 15:00)
- [ ] Cut the release branch and tag the release candidate
- [ ] CI is green: unit, integration and lint
- [ ] Deploy the RC to staging
- [ ] Announce the freeze. After this, only blocker fixes go in, with lead approval.
- [ ] Draft the release notes and changelog

### Fri Nov 20 – Sat Nov 21: QA
- [ ] Smoke test the RC on staging
- [ ] Run the full regression and the new-feature tests
- [ ] Test migrations and the upgrade path
- [ ] Run performance and security checks
- [ ] Triage bugs: blocker, fix now or defer
- [ ] Cherry-pick blocker fixes and re-run the affected tests
- [ ] Sat evening: QA sign-off (go or no-go)

### Sun Nov 22: buffer
- [ ] Re-test any late fixes
- [ ] Finalize the release notes
- [ ] Write the rollback plan and confirm the backups
- [ ] Confirm who is on call for Monday

### Mon Nov 23: ship
- [ ] Final go/no-go call
- [ ] Tag the final release
- [ ] Deploy to production, with a migration run if needed
- [ ] Smoke test production
- [ ] Watch errors and metrics for the first few hours
- [ ] Publish the release notes and tell stakeholders and support
- [ ] Hold a short retro and close out the tickets

### haiku-5-5 · noisy@face2 · rep 1

The checklist is above. The dates work out to freeze Thu 19 Nov, QA Fri 20 and Sat 21, sign-off Sun 22, ship Mon 23.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","qaNote","freezeHead","f1","f2","f3","qaHead","q1","q2","q3","q4","shipHead","s1","s2","s3","s4"]},{"id":"title","component":"Text","text":"## Release checklist: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"qaNote","component":"Callout","tone":"warning","title":"Check what \"two days\" means","text":"I pl`

### haiku-5-5 · noisy@face2 · rep 2

The checklist is drafted above, with dates for this week: freeze Thursday 19 Nov, QA on Friday and Saturday, ship Monday 23 Nov.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","window","before","freeze","qa1","qa2","weekend","ship"]},{"id":"title","component":"Text","text":"## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"window","component":"Callout","tone":"warning","title":"Check the QA window","text":"Two days of QA here means Friday and Saturday. If QA works w`

### haiku-5-5 · noisy@face2 · rep 3

The draft checklist is above, with the day-by-day schedule and tick boxes for each item.

The one thing to settle is the QA window. Thursday to Monday leaves Friday and Saturday, so QA either works the weekend or gets only Friday.

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{"c1":false,"c2":false,"c3":false,"c4":false,"c5":false,"c6":false,"c7":false,"c8":false,"c9":false,"c10":false,"c11":false,"c12":false,"c13":false,"c14":false},"components":[{"id":"root","component":"Column","children":["title","callout","schedule","h1","c1","c2","c3","c4","c5","c6","h2","c7","c8","c9","h3","c10","c11","c12","c13","c14"]},{"id":"title","comp`

### sonnet-5-5 · noisy@face2 · rep 1

## Release checklist

Today is Tue 2026-11-17, so the dates are:
- Code freeze: Thu 11-19
- QA: Fri 11-20 and Sat 11-21, or Fri and Mon, depending on how you count "two days".
- Ship: Mon 11-23

"QA gets two days" is the ambiguous part. If QA must be done by the weekend, Fri and Sat means weekend work. If it's two working days, Fri plus Mon leaves no buffer before shipping on Monday. I've assumed Fri and Sat/Sun, with Sunday as the buffer. Tell me if you mean something else.

**Before the freeze (Tue–Thu)**
- [ ] Merge all in-scope PRs; defer the rest to the next release
- [ ] Finalize the version number and changelog draft
- [ ] Confirm migrations and config changes are reviewed
- [ ] CI is green on the release branch
- [ ] **Thu: freeze.** Cut the release branch and allow only blocker fixes

**QA (Fri–Sat)**
- [ ] Deploy the release candidate to staging
- [ ] Run the full regression and smoke suites
- [ ] Test the new features against their acceptance criteria
- [ ] Test upgrade and migration paths, and check performance
- [ ] Triage bugs: fix only blockers, with sign-off from the release owner
- [ ] Re-test any fixes and rebuild the RC if one is needed
- [ ] **Sat evening: QA go/no-go**

**Sunday (buffer)**
- [ ] Final RC verified and artifacts built and tagged
- [ ] Release notes and the support/communications brief are ready
- [ ] Rollback plan written and tested; on-call confirmed

**Ship (Mon 11-23)**
- [ ] Final go/no-go in the morning
- [ ] Deploy to production (staged rollout if possible)
- [ ] Smoke-test production; watch errors and metrics
- [ ] Publish release notes and announce
- [ ] Merge the release branch back to main

**After shipping**
- [ ] Monitor for 24–48 hours
- [ ] Hold a short retro and record follow-ups

### sonnet-5-5 · noisy@face2 · rep 2

## Release checklist: ship Monday 2026-11-23

**Assumption to confirm:** you said "QA gets two days". Between a Thursday freeze and a Monday ship there is only one working day (Friday). I've assumed QA runs **Fri 20 and Sat 21**, with Sunday as buffer. If QA means two *working* days, they are Fri and Mon. Then shipping moves to Monday evening or Tuesday, or QA finishes Monday morning with a tight go/no-go.

**Before the freeze (Tue 17 – Thu 19)**
- [ ] Confirm the scope: list the tickets going in, and defer the rest
- [ ] Merge all in-scope PRs by Thursday midday
- [ ] Update the changelog and release notes draft
- [ ] Book the QA people for Fri and Sat
- [ ] Check that migrations, config and feature flags are ready

**Thu 19: freeze**
- [ ] Cut the release branch and tag the release candidate (RC)
- [ ] Block merges to the release branch, except approved fixes
- [ ] Deploy the RC to staging and run a smoke test

**Fri 20 – Sat 21: QA**
- [ ] Run the regression suite and the critical-path manual tests
- [ ] Test upgrade and migration on production-like data
- [ ] Check performance and security
- [ ] Triage bugs by severity. Only blockers get fixed, and each fix needs review and a new RC
- [ ] Record QA sign-off on Saturday evening

**Sun 22: buffer**
- [ ] Re-test any blocker fixes
- [ ] Make the go/no-go call
- [ ] Prepare the rollback plan and confirm the on-call rota
- [ ] Send a heads-up to support and stakeholders

**Mon 23: ship**
- [ ] Take a backup and confirm the rollback steps
- [ ] Deploy to production, then run a smoke test
- [ ] Watch errors and metrics for the first hours
- [ ] Publish the release notes and announce the release
- [ ] Merge the release branch back to main

**After**
- [ ] Run a short retro and log the follow-up items

I can adjust the dates if QA means working days.

### sonnet-5-5 · noisy@face2 · rep 3

Note on "QA gets two days": freeze Thursday 11/19, QA Friday 11/20 and Monday 11/23 would leave no QA before shipping on Monday, so I've assumed QA runs Fri + Sat/Sun (calendar days). If you meant working days, QA would eat Monday and the ship moves to Tuesday 11/24.

## Release checklist (ship Monday 2026-11-23)

**Tue 11/17 – Wed 11/18: Prep**
- [ ] Confirm the scope: list the PRs and tickets that must land before freeze
- [ ] Merge or defer open PRs; assign owners for the remaining blockers
- [ ] Prepare the QA test plan and regression suite
- [ ] Set up the staging environment and test data
- [ ] Draft release notes and the changelog

**Thu 11/19: Code freeze**
- [ ] Final merge cutoff (agree on a time, e.g. 12:00)
- [ ] Cut the release branch and tag the release candidate (RC1)
- [ ] Deploy the RC to staging
- [ ] Run the smoke test and announce the freeze to the team
- [ ] From now on, only approved blocker fixes are allowed

**Fri 11/20 – Sun 11/22: QA (2 days)**
- [ ] Run the full regression and the new-feature test plan
- [ ] Check performance, security and migrations (including rollback)
- [ ] Log bugs and triage them daily (blocker / fix later)
- [ ] Re-test blocker fixes and cut RC2 if needed
- [ ] Sun evening: QA sign-off, then a go/no-go decision

**Mon 11/23: Ship**
- [ ] Confirm the go decision and that the on-call person is ready
- [ ] Back up the data and verify the rollback plan
- [ ] Deploy to production, then run the post-deploy smoke test
- [ ] Monitor errors, latency and key metrics for 1–2 hours
- [ ] Publish release notes and announce to the team and customers
- [ ] Tag the final release and merge the release branch back

**After**
- [ ] Hold a short retro and list the follow-up bugs

Which QA interpretation do you want: calendar days (as above) or working days? I'll adjust the dates.

### haiku-5-5 · noisy-filtered@face2 · rep 1

The checklist is drafted above. The one thing to settle is the QA window: Friday and Saturday are the only days between the Thursday freeze and the Monday ship, so QA's two days fall on a weekend. If that isn't workable, moving the freeze to Wednesday or the ship to Tuesday gives QA two weekdays.

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{},"components":[{"id":"root","component":"Column","children":["title","warn","plan"]},{"id":"title","component":"Text","text":"## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"warn","component":"Callout","tone":"warning","title":"Check the QA window","text":"Between the Thursday freeze and Monday ship, QA only has Friday 20 and Saturday 21. If QA`

### haiku-5-5 · noisy-filtered@face2 · rep 2

I read "two days" as Friday and Saturday, with Sunday as buffer and Monday 23 Nov as ship day. That's the tightest part: a blocker found Saturday leaves no time to retest. Freezing on Wednesday would give QA a third day and still ship Monday.

The plan is drawn above: freeze Thursday 19 Nov, QA Friday and Saturday, ship Monday 23 Nov, with the checklist grouped by phase.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","timeline","checkBefore","checkQa","checkShip","risk"]},{"id":"title","component":"Text","text":"## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"timeline","component":"Table","rows":[{"day":"Tue 17 Nov","milestone":"Today: agree the scope cut list"},{"day":"Wed 18 Nov","milestone":"Last feat`

### haiku-5-5 · noisy-filtered@face2 · rep 3

"Two days" here means Friday and Saturday, so QA runs over the weekend. If you meant two working days, Monday can't be the ship day, and I'd move the date.

The plan is above: freeze Thursday 19 Nov, QA Friday 20 and Saturday 21, go/no-go and ship Monday 23 Nov. The checklist is grouped by before freeze, QA, and ship.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","timeline","before","qa","ship","cutoff"]},{"id":"title","component":"Text","text":"## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"timeline","component":"Table","rows":[{"phase":"Freeze","when":"Thu 19 Nov","what":"Code frozen, release branch cut, RC1 tagged"},{"phase":"QA","when":"Fri 20 t`

### sonnet-5-5 · noisy-filtered@face2 · rep 1

## Release plan: ship Monday 2026-11-23

**Assumption on "QA gets two days":** I've taken this as Friday 20 and Saturday 21, which are calendar days and include a weekend day. If you meant two working days, QA would be Friday and Monday. Shipping Monday would then be too tight, so you'd either ship Tuesday or get weekend QA coverage. Tell me which you want.

**Tue 17 – Wed 18: prep**
- [ ] Merge-deadline reminder sent to all contributors
- [ ] Scope confirmed: list of what's in and what's out
- [ ] Release owner and QA lead named
- [ ] QA environment and test data ready
- [ ] Regression test plan and smoke tests reviewed
- [ ] Rollback plan drafted

**Thu 19: code freeze**
- [ ] Last PRs merged by an agreed cutoff time
- [ ] Release branch cut and tagged as a release candidate
- [ ] Version number and changelog drafted
- [ ] Release candidate deployed to staging
- [ ] CI green on the release branch
- [ ] From now on, only approved blocker fixes go in

**Fri 20 – Sat 21: QA**
- [ ] Smoke test on staging (Fri morning)
- [ ] Full regression run
- [ ] Bugs triaged each day as blocker or non-blocker
- [ ] Blocker fixes cherry-picked, then retested
- [ ] Performance, security and migration checks
- [ ] QA sign-off by Sat evening

**Sun 22: go/no-go prep**
- [ ] Release notes and customer comms finalized
- [ ] Production deploy runbook reviewed
- [ ] On-call and support briefed
- [ ] Backups verified

**Mon 23: ship**
- [ ] Go/no-go decision
- [ ] Deploy to production
- [ ] Post-deploy smoke test
- [ ] Monitor errors and metrics for the first hours
- [ ] Announcement sent
- [ ] Rollback trigger criteria agreed in advance

**After ship**
- [ ] Retro scheduled
- [ ] Deferred bugs ticketed

### sonnet-5-5 · noisy-filtered@face2 · rep 2

Dates: freeze Thursday 2026-11-19, so QA runs Friday 11-20 and Saturday 11-21 (two calendar days, weekend), and ship Monday 11-23. If you meant two working days, QA would be Fri 11-20 and Mon 11-23, and shipping would slip to Tuesday 11-24. I've assumed the former.

## Release checklist

**Before freeze (Tue 11-17 to Thu 11-19)**
- [ ] Confirm the scope: list the tickets that must land and cut the rest
- [ ] Merge all approved PRs; no new features after Thursday
- [ ] Update the changelog and version number
- [ ] Check that CI is green on the release branch
- [ ] Prepare the QA environment and test data
- [ ] **Thu: code freeze.** Tag the release candidate (RC1)

**QA (Fri 11-20 and Sat 11-21)**
- [ ] Deploy RC1 to staging
- [ ] Run the regression suite and smoke tests
- [ ] Test the new features against their acceptance criteria
- [ ] Check migrations, performance and security
- [ ] Triage bugs: only blockers and criticals get fixed, and each fix goes in as a cherry-pick (RC2)
- [ ] Sat evening: QA sign-off or a no-go decision

**Ship prep (Sun 11-22)**
- [ ] Write the release notes and the customer communication
- [ ] Write and review the rollback plan
- [ ] Confirm who is on call and who has the final go/no-go

**Ship (Mon 11-23)**
- [ ] Final go/no-go check
- [ ] Back up the database
- [ ] Deploy to production
- [ ] Run smoke tests on production
- [ ] Watch error rates and monitoring for the first few hours
- [ ] Announce the release

**After (Mon 11-23 onward)**
- [ ] Merge the release branch back to main
- [ ] Hold a short retrospective

Is QA two calendar days (the weekend) or two working days? I can shift the dates if it's the latter.

### sonnet-5-5 · noisy-filtered@face2 · rep 3

## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov

**Assumption on "two days":** Thursday to Monday has only one working day (Fri 20 Nov) before the ship date. I've planned QA as **Fri 20 and Mon 23 morning**, with the ship in the afternoon. If you mean Fri and Sat, QA works the weekend and Monday is a buffer. Tell me which and I'll adjust.

**Today to Wed 18 Nov: prep**
- [ ] Confirm release scope and cut anything that is not ready
- [ ] Merge all feature PRs. Only fixes are allowed after the freeze
- [ ] Draft release notes and the changelog
- [ ] Write the QA test plan and regression list, and book the QA people
- [ ] Prepare the staging environment and test data

**Thu 19 Nov: freeze**
- [ ] Do a final merge and review the open PRs
- [ ] Cut the release branch and tag the release candidate (RC1)
- [ ] Confirm CI is green (tests, lint, build)
- [ ] Deploy RC1 to staging and run a smoke test
- [ ] Announce the freeze and hand over to QA

**Fri 20 Nov: QA day 1**
- [ ] Run the full regression and the new-feature tests
- [ ] Test upgrades, migrations and compatibility
- [ ] Triage bugs by severity. Only blockers get fixed
- [ ] Hold a mid-day sync, then a go/no-go checkpoint in the evening
- [ ] Cut RC2 if blocker fixes were merged

**Mon 23 Nov: QA day 2 and ship**
- [ ] Re-test blocker fixes and run a final smoke test on RC
- [ ] Hold the go/no-go meeting (by 12:00)
- [ ] Take a backup and confirm the rollback plan
- [ ] Deploy to production and run post-deploy smoke checks
- [ ] Watch errors and metrics for the first few hours
- [ ] Publish release notes and announce the release

**Risks:**
- Only one working QA day. Decide ahead of time who may approve exceptions.
- A blocker found on Monday forces a slip to Tuesday. Pre-agree that fallback.

### haiku-5-5 · digest@face2 · rep 1

The checklist is above. It assumes QA runs Friday and Saturday, so the weekend is covered. The callout covers the risk with two days: if regression runs long, freezing Wednesday is safer than moving the ship date.

> tool call `view`: `{"template":"a2ui","data":{"components":[{"id":"root","component":"Column","children":["title","table","callout"]},{"id":"title","component":"Text","text":"## Release checklist: freeze Thu 19 Nov, ship Mon 23 Nov\n\nAssumes QA runs Friday and Saturday."},{"id":"table","component":"Table","rows":[{"day":"Tue 17 Nov","task":"Confirm release scope. Name the release manager and the QA sign-off owner."`

### haiku-5-5 · digest@face2 · rep 2

## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov

Between a Thursday freeze and a Monday ship there are only two working days, Friday and Monday. "Two days" of QA therefore means either a weekend (Fri–Sat) or Friday plus Monday morning, which leaves no time to fix anything QA finds. Do you want weekend QA, or should the freeze move to Wednesday?

**Thu 19 Nov: code freeze**
- [ ] Cut the release branch and block merges without release-manager approval
- [ ] Confirm the release branch builds green
- [ ] Publish the list of included changes
- [ ] Draft release notes

**Fri 20 – Sat 21 Nov: QA**
- [ ] Run the full regression suite on the release candidate
- [ ] Manually test core user paths (login, main flows, payments if any)
- [ ] Test the upgrade path from the current production version
- [ ] Log every bug and triage each as blocker or fix-later
- [ ] Allow blocker fixes only, each re-tested and approved as a freeze exception
- [ ] QA sign-off on the release candidate build by Saturday evening

**Sun 22 Nov: preparation (no code changes)**
- [ ] Write the deploy runbook and confirm the rollback steps
- [ ] Set the Monday on-call rota
- [ ] Check monitoring dashboards and alert thresholds
- [ ] Notify stakeholders of the ship window

**Mon 23 Nov: ship**
- [ ] Go/no-go call in the morning
- [ ] Deploy the exact build QA signed off
- [ ] Run the production smoke test
- [ ] Watch error rates and key metrics after release
- [ ] Publish release notes and announce
- [ ] Tag the release and merge it back to main

If you tell me the product and where it deploys, I can adjust the steps to match.

### haiku-5-5 · digest@face2 · rep 3

The plan above has the schedule and a freeze checklist. Check the two QA days first: as written, they fall on Friday and Saturday, so QA runs over a weekend. If you meant two working days, freezing on Wednesday gives Thursday and Friday for QA and still ships Monday.

> tool call `view`: `{"template":"a2ui","data":{"dataModel":{"c1":false,"c2":false,"c3":false,"c4":false,"c5":false,"c6":false,"c7":false,"c8":false},"components":[{"id":"root","component":"Column","children":["title","schedule","warn","checkHead","c1","c2","c3","c4","c5","c6","c7","c8"]},{"id":"title","component":"Text","text":"## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov"},{"id":"schedule","component":"Table"`

### sonnet-5-5 · digest@face2 · rep 1

## Release plan: freeze Thu 19 Nov, ship Mon 23 Nov

**Assumption to confirm:** "two days" of QA after a Thursday freeze leaves only one working day (Fri 20) before Monday. I've assumed QA runs **Fri 20 and Mon 23 morning**, or Fri plus Sat if the weekend is available. Tell me which and I'll adjust.

### Tue 17 – Wed 18: Prep
- [ ] Merge deadline announced; list of in-flight PRs agreed
- [ ] Release owner and QA lead named
- [ ] Release notes and changelog draft started
- [ ] Test plan and regression suite ready; test environment matches production
- [ ] Rollback plan written, and DB migrations checked as reversible

### Thu 19: Code freeze
- [ ] Last merges in by an agreed cutoff time
- [ ] Release branch cut and version tagged as a release candidate
- [ ] CI green on the release branch
- [ ] RC deployed to staging
- [ ] Only blocker fixes allowed from here, each approved by the release owner

### Fri 20 – Sat 21 (or Mon morning): QA
- [ ] Smoke test on staging
- [ ] Full regression run
- [ ] New features tested against acceptance criteria
- [ ] Migrations tested on a production-sized data copy
- [ ] Performance and security checks
- [ ] Bugs triaged by severity; blockers fixed and the RC re-tagged
- [ ] QA sign-off recorded, with go/no-go decided by the end of QA

### Sun 22: Buffer
- [ ] Final release notes and customer or support comms ready
- [ ] On-call and support staffed for Monday
- [ ] Production backup verified

### Mon 23: Ship
- [ ] Final go/no-go check
- [ ] Deploy to production
- [ ] Post-deploy smoke test
- [ ] Monitoring, error rates and key metrics watched for the first hours
- [ ] Release announced; tag and notes published
- [ ] Rollback triggered if the agreed thresholds are hit

### After release
- [ ] Retro and a list of follow-ups

### sonnet-5-5 · digest@face2 · rep 2

## Release plan: ship Monday, 23 Nov 2026

**Assumption on "two days":** two *working* days would be Friday and Monday, which collides with the ship date. I've used Friday 20 Nov as QA day 1 and Monday morning as QA day 2 (final sign-off before shipping). If you meant Fri and Sat/Sun, shift the QA items to those days.

### Tue 17 – Wed 18: Prep
- [ ] Confirm release scope and list of merged or pending PRs
- [ ] Merge or defer all risky or unfinished work
- [ ] Draft release notes and changelog
- [ ] Prepare the QA test plan and regression suite
- [ ] Confirm the QA environment matches production (config, data, flags)
- [ ] Name the release owner and the on-call person for Monday

### Thu 19: Code freeze
- [ ] Final merge cut-off, with a time announced to the team
- [ ] Cut the release branch and tag a release candidate (RC1)
- [ ] CI green: unit, integration and lint
- [ ] Bump the version and check migrations and dependency updates
- [ ] Deploy RC1 to staging and run a smoke test
- [ ] Hand off to QA with notes on what changed and known risks

### Fri 20: QA day 1
- [ ] Run the full regression suite
- [ ] Test new features against their acceptance criteria
- [ ] Test migrations on a copy of production data
- [ ] Run performance and security checks
- [ ] Triage bugs: blockers get fixed, the rest are deferred
- [ ] Only blocker fixes are cherry-picked, and each one gets a new RC

### Mon 23 (morning): QA day 2 and go/no-go
- [ ] Re-verify the blocker fixes on the final RC
- [ ] Final smoke test on staging
- [ ] Go/no-go decision from QA, product and engineering
- [ ] Rollback plan and backups confirmed

### Mon 23: Ship
- [ ] Deploy to production, with migrations first if there are any
- [ ] Production smoke test
- [ ] Watch error rates, latency and logs for at least 1–2 hours
- [ ] Publish release notes and notify support and stakeholders
- [ ] Tag the final release and merge the release branch back
- [ ] Hold a short retro and log follow-ups

**Risk:** with a Friday-to-Monday QA window, any blocker found late has little room for a fix. Agree now on who can approve a one-day slip.

### sonnet-5-5 · digest@face2 · rep 3

Dates: today is Tuesday 2026-11-17, so the freeze is Thursday 2026-11-19. "QA gets two days" is ambiguous, so I read it two ways:

- **Working days:** QA runs Fri 11/20 and Mon 11/23. Shipping the "following Monday" would then mean Mon 11/23 itself, with no buffer. That doesn't fit.
- **Calendar days (my assumption):** QA runs Fri 11/20 and Sat 11/21, or Fri and the weekend. Ship on Monday 11/23.

I've assumed QA runs Friday 11/20 to Sunday 11/22 and you ship on Monday 11/23. Tell me if QA should be strictly two working days. Then the ship date moves to Tuesday 11/24, or QA works through the weekend.

## Release checklist

**Before freeze (Tue 11/17 – Thu 11/19)**
- [ ] Confirm scope: list of tickets going into the release
- [ ] Merge or defer all open PRs by Thursday midday
- [ ] Update the changelog and release notes draft
- [ ] Check that migrations, feature flags and config changes are listed
- [ ] Confirm that QA staff are available Fri–Sun, and the test plan is ready

**Thursday 11/19: freeze**
- [ ] Announce the code freeze in the team channel
- [ ] Cut the release branch and tag the release candidate (RC1)
- [ ] Deploy RC1 to staging
- [ ] Run a CI smoke test on staging
- [ ] From now on, only blocker fixes get merged, each with the release owner's approval

**Fri 11/20 – Sun 11/22: QA**
- [ ] Run the regression suite and the new feature tests
- [ ] Test upgrades and migrations against a copy of production data
- [ ] Check performance, security and permissions
- [ ] Triage bugs daily: blocker, fix or defer
- [ ] Tag a new RC and re-test the affected areas after any fix
- [ ] Sunday evening: QA sign-off, go or no-go

**Sun 11/22: ship prep**
- [ ] Write the rollback plan and test it
- [ ] Prepare the production migrations and backups
- [ ] Finalize the release notes and customer communication
- [ ] Confirm who is on call Monday

**Mon 11/23: ship**
- [ ] Take a backup and start the deploy
- [ ] Run the production smoke test
- [ ] Watch the error rate, latency and logs for the first few hours
- [ ] Announce the release and publish the notes
- [ ] Merge the release branch back to main

**After (Tue 11/24)**
- [ ] Hold a retro, and collect issues found after release
- [ ] Lift the freeze and plan any hotfix
