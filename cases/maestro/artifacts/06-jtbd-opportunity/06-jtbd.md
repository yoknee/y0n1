| | |
|---|---|
| Title | Jobs to be done |
| Artifact | 06 Jobs to be done and opportunity map |
| Question it answers | What is each role trying to get done in their situation and what outcome do they want? |
| Decisions it feeds | D-10, D-11 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided:** the outcome statement, the cut line for MVP and Test of Details as the anchor workflow. **We built:** the job statements from the coded material, the tree in two working sessions with PMs and the feasibility ratings with the engineering leads. Design team of three at this phase.

Reconstructed. Value and feasibility ratings are my judgment under the constraints in 01, argued with PMs and engineering leads and recorded in half points. They are not measured. Value drew the MVP line; feasibility set the sequence.

## Outcome

Auditors conclude faster with a file that stands up to inspection, and they stay accountable for every conclusion.

## Job statements

Format: when [situation], I want [motivation], so I can [outcome]. Each job cites the themes in 03 it rests on.

| Role | When | I want | So I can | Themes |
|---|---|---|---|---|
| Associate | I am tracing a sample late in a long session | to compare the record to the document without re-finding the field each time | I finish the sample without errors creeping in | T2 |
| Associate | a document comes back partial or illegible | to flag it and move on without losing my place | the request goes out and the trace resumes later | T1 |
| Senior | I plan a Test of Details for an area | a structure that fits the procedure without editing it | the reviewer accepts the format and I am not adapting by hand | T13, T10 |
| Senior | evidence is spread across systems and requests | one place that shows what has arrived and what is still open | I stop opening three systems to find one statement | T1, T11 |
| Senior | I hand the file to the manager | the state of every sample and exception to travel with the file | I do not re-walk the work in the review | T11, T5 |
| Senior | work was done for me | to check it in seconds against what it read | I verify instead of trusting | T7, T3 |
| Manager | I review a workpaper | to reach the source of any claim in one action | I judge substance instead of hunting references | T3 |
| Manager | five engagements hit review in the same week | a queue with state across all of them | I clear what is waiting in the right order and notes stop looping | T5 |
| Manager | one step of delegated work is wrong | to correct that step without redoing the rest | I keep the work I trust and the history | T7 |
| Partner | I am asked to sign | the exception trail and the checkpoint record in the file | I can defend the file a year later | T8, T3 |
| Partner | a tool touched client data | to know what it read and that a human approved anything restricted | independence and data obligations hold | T9, T8 |
| Quality and Methodology reviewer | teams adapt standard structures | the structure to fit the procedure in the first place | variants stop causing rework and quality findings | T13 |
| Quality and Methodology reviewer | I set a data handling or checkpoint rule | the product to enforce it | teams do not have to remember it under pressure | T9, T6 |
| Engagement data lead | I connect client systems to an engagement | its handling rules set once | no run can breach them without a per-document decision | T9 |

## Opportunities

| ID | Opportunity | Themes | Solutions |
|---|---|---|---|
| O1 | Find and assemble evidence without the hunt | T1, T9 | S1 Agent retrieval within data classes, with a log of what was read (MVP); S2 Agent chases open client requests (later) |
| O2 | Trace samples without fatigue | T2, T12 | S3 Extraction and matching against a typed structure, differences first (MVP); S4 Fatigue-aware batching that pauses long sessions (cut) |
| O3 | Reach the source from any claim | T3, T7 | S5 Citation chip on every claim that opens the source at the span (MVP); S6 Full-text search across all engagement evidence (later) |
| O4 | Review with state and without loops | T5, T10 | S7 Review center: a queue with state and provenance in view (MVP); S8 Inline comments on the workpaper (cut) |
| O5 | Keep judgment human and visible | T6, T8 | S9 Exception workbench with mandatory human resolution (MVP); S10 Agent-proposed exception resolutions (cut) |
| O6 | Keep state in the run across handoffs | T11 | S11 The agent run and its timeline as the state holder (MVP); S12 Structured handoff notes between roles (cut) |
| O7 | Structures that fit the procedure | T13, T4 | S13 Typed field-structure library the planner targets (MVP); S14 Templates for analytical procedures (later) |

## MVP scope

Test of Details on two audit areas, revenue and payables, with the full run (plan, retrieve, extract, match, detect exceptions, draft conclusion), the review center and sign-off. No analytical procedures, no controls testing, no cross-engagement search, no agent-to-client communication.

Area choice reconstructed. The two areas test opposite directions, existence for revenue and completeness for payables, so one agent behavior is exercised both ways before it extends. Which two areas the production MVP covered, and why, is for Yoni to confirm.

## Rating anchors

| Value | Feasibility |
|---|---|
| 5: removes a high-consistency theme's pain for every role | 5: buildable with the design system as is |
| 3: removes pain for one role or one stage | 3: needs one new pattern or a methodology ruling |
| 1: nice to have, no theme behind it | 1: blocked by a constraint in 01 until a dependency ships |

I scored; PMs and engineering leads contested; final values are in the tree. Half points mark where a rating moved.

## What changed after the sessions (reconstructed)

| Solution | What changed |
|---|---|
| S13 | Feasibility lowered from 4 to 3 by the engineering leads: 60+ structures must be typed before the planner can target them, so the library ships in batches by area. This is why only two areas made MVP. |
| S7 | Feasibility lowered from 4 to 3.5 by the engineering leads: the review center is a second surface with its own state; PMs kept it in MVP because T5 is where the deadline bites. |
| S2 | Moved from MVP to later after the methodology reviewer raised independence: an agent writing to a client is a C2 question before it is a feature. |

## Cut or deferred for MVP and why

| ID | Solution | State | Why |
|---|---|---|---|
| S2 | Agent chases open client requests | later | Needs client-facing communication rules; independence review first (C2). |
| S4 | Fatigue-aware batching that pauses long sessions | cut | Solves a symptom S3 removes. Revisit if late-session errors persist in telemetry. |
| S6 | Full-text search across all engagement evidence | later | Indexing across data classes needs the permission model first (C3). Returns in P5. |
| S8 | Inline comments on the workpaper | cut | Reproduces the note loop the research found (T5). Rejected on evidence, not on cost. |
| S10 | Agent-proposed exception resolutions | cut | Every role named exception judgment as human work (T6). Independence (C2). Not a cost cut, a boundary cut. |
| S12 | Structured handoff notes between roles | cut | Notes are another place for state to live. S11 makes the run the place. |
| S14 | Templates for analytical procedures | later | Different agent reasoning (expectation forming). Prove the boundary pattern on Test of Details first (D-10, D-11). Returns in P5. |
| A1 | Test of Details on inventory, cash and fixed assets | later | Structures typed in batches by area (S13 feasibility). One agent behavior proved on two areas first (D-10). Return P3 to P5. |
| A2 | Controls testing | later | A different evidence model: operating effectiveness, not transaction tracing. Nothing in T1 to T14 touches it. Return after analytical procedures. |
