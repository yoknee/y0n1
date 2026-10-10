| | |
|---|---|
| Title | Jobs to be done |
| Artifact | 06 Jobs to be done and opportunity map |
| Question it answers | What is each role trying to get done in their situation and what outcome do they want? |
| Decisions it feeds | D-10, D-11 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided** The outcome statement, the cut line for MVP and Test of Details as the anchor workflow. **We built** The job statements from the coded material, the tree in two working sessions with PMs and the feasibility ratings with the engineering leads.

Reconstructed. Value and feasibility ratings are the lead's judgment under the constraints in 01, argued with PMs and engineering leads. They are not measured.

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
| Senior | an agent has done the matching | to see the differences first and the page it read beside each one | I check in seconds instead of trusting | T7, T3 |
| Manager | I review a workpaper | to reach the source of any claim in one action | I judge substance instead of hunting references | T3 |
| Manager | five engagements hit review in the same week | a queue with state across all of them | I clear what is waiting in the right order and notes stop looping | T5 |
| Manager | an agent step is wrong | to reject that step and rerun it with the right input | I keep the rest of the run and the history | T7 |
| Partner | I am asked to sign | the exception trail and the checkpoint record in the file | I can defend the file a year later | T8, T3 |
| Partner | a tool touched client data | to know what it read and that a human approved anything restricted | independence and data obligations hold | T9, T8 |
| Methodology reviewer | teams adapt standard structures | the structure to fit the procedure in the first place | variants stop causing rework and quality findings | T13 |
| Methodology reviewer | I set a data handling or checkpoint rule | the product to enforce it | teams do not have to remember it under pressure | T9, T6 |
| Engagement data lead | I connect client systems to an engagement | to assign each source a data class once | every agent run respects the class without per-document decisions | T9 |

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

Revenue and payables carry the highest sample volumes in a Test of Details and cover both directions of testing, existence and completeness. Between them they use the largest share of the 60+ structures.

## Cut for MVP and why

| ID | Solution | State | Why |
|---|---|---|---|
| S2 | Agent chases open client requests | later | Needs client-facing communication rules; independence review first (C2). |
| S4 | Fatigue-aware batching that pauses long sessions | cut | Solves a symptom S3 removes. Revisit if late-session errors persist in telemetry. |
| S6 | Full-text search across all engagement evidence | later | Indexing across data classes needs the permission model first (C3). Returns in P5. |
| S8 | Inline comments on the workpaper | cut | Reproduces the note loop the research found (T5). Rejected on evidence, not on cost. |
| S10 | Agent-proposed exception resolutions | cut | Every role named exception judgment as human work (T6). Independence (C2). Not a cost cut, a boundary cut. |
| S12 | Structured handoff notes between roles | cut | Notes are another place for state to live. S11 makes the run the place. |
| S14 | Templates for analytical procedures | later | Different agent reasoning (expectation forming). Prove the boundary pattern on Test of Details first (D-10, D-11). Returns in P5. |
