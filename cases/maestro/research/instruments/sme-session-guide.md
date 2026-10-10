| | |
|---|---|
| Title | Quality and Methodology SME session guide |
| Artifact | 02 Research plan and instruments |
| Question it answers | What do the standards require, which procedures and field structures exist, where must a human review and what happens when the agent fails? |
| Decisions it feeds | D-02 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

## 1. Purpose and scope

Phases P1 to P5. Quality and Methodology reviewers hold the rules the product must obey. These sessions turn their knowledge into four things the design builds on: a validated constraint list, a procedure taxonomy with typed field structures, a checkpoint rule set and a failure path specification. They are working sessions. Each ends with recorded decisions and owners.

Planned target: 8 sessions of 60 minutes. Planned split: 1 of type A, 3 of type B, 2 of type C, 2 of type D. No session is reported in this reconstruction.

Role split. I set the four session types, the capture template and the rule that session decisions stay proposals until the decision log owner records them. We facilitate, capture and carry the outputs into artifacts 01, 08 and 09.

## 2. Participants and roles

| Role | Per session | Notes |
|---|---|---|
| Quality and Methodology reviewers | 2 to 4 | The same core group across sessions where possible, so decisions build on each other. |
| Engagement data lead | 1 | Types A and C only, for data classes and access. |
| Facilitator | 1 | Design lead. Runs the agenda. Does not take notes. |
| Capture lead | 1 | Designer. Fills the capture template live and reads it back. |
| Observer | 0 to 1 | PM or engineering lead. Listens. Speaks in the last ten minutes only. |

Ground rules, read at the start of every session:

1. No client examples. We work on the synthetic engagement in the pre-read.
2. Methodology has the final word on anything that touches C1 or C2 (standards and independence). Design has the final word on how it looks.
3. A disagreement is captured as an open question with an owner. It is not resolved by running over.
4. Decisions recorded here are proposals. They become D-nn entries when the decision log owner records them with their source.

## 3. Session types

| Type | Objective | Inputs | Outputs | Sessions |
|---|---|---|---|---|
| A | Validate the constraint list from artifact 01 | C1 to C7 with design implications. Synthetic engagement summary | Confirmed, revised or added constraints with source. Severity rank | 1 |
| B | Build the procedure taxonomy and the field-structure library | Draft taxonomy. Inventory of Test of Details structures (60+, stated) | Typed templates in the schema in 5.2. Taxonomy tree | 3 |
| C | Set the checkpoint rules | Agent step types. Data classes. Draft permission grid | Filled grid: act, propose or never, per step by data class. Human review points. The never-write list | 2 |
| D | Walk the failure paths | Four paths. Draft of flow 5 from artifact 09. Synthetic failing items | Per path: detection, what the auditor sees, who decides, recovery, what is logged | 2 |

## 4. Pre-read

Sent 48 hours before each session. Reading time 15 minutes. The facilitator confirms receipt the day before.

| Type | Pre-read contents |
|---|---|
| All | One-page synthetic engagement: five areas, team by role, the four questions strip, ground rules. |
| A | The C1 to C7 table from artifact 01 with the design implication column. Three blank rows. |
| B | Draft taxonomy (risk assessment, test of details, analytical, controls). The batch of about 20 structure names for this session with blank template rows. The template schema in 5.2. |
| C | The six agent step types with one-line definitions. The four data classes with one-line definitions. The empty grid in 5.3. |
| D | Flow 5 draft. Four synthetic failing items, one per path, with their state at failure. |

## 5. Agenda and working blocks

Common agenda, 60 minutes.

| Minutes | Block |
|---|---|
| 0 to 5 | Open. Ground rules. Confirm the pre-read. State the session objective in one sentence. |
| 5 to 10 | Recap. The facilitator reads the decisions still open from the last session. |
| 10 to 45 | Working block for the type (5.1 to 5.4). |
| 45 to 55 | Read-back. The capture lead reads every decision, rationale, open question and owner. Participants correct. |
| 55 to 60 | Next steps. Date of the next session. What each owner brings. |

### 5.1 Type A working block: constraints (35 minutes)

For each of C1 to C7, four minutes:

- Is the constraint stated correctly? What is its source: a standard, firm policy or practice?
- What is missing from the design implication? What would a design that broke this constraint look like?
- Rank: how often does this constraint bite a fieldwork team? High, medium or low.

Last seven minutes: candidates for C8 onward. Merge or split as needed. Output goes to decisions.md and a revision of artifact 01.

### 5.2 Type B working block: taxonomy and field structures (35 minutes)

Minutes 10 to 20: taxonomy. Card sort of procedure names into the four types. Disputed cards are parked with an open question.

Minutes 20 to 45: field structures. About 20 structures per session, so the stated 60+ are covered in three sessions. For each structure the group fills one template row:

| Field | Values |
|---|---|
| name | Structure name as methodology knows it |
| applicable_areas | revenue, inventory, cash, fixed_assets, payables (one or more) |
| target_assertions | existence, completeness, accuracy, cutoff, valuation, rights_and_obligations, presentation |
| required_fields | name and type for each: amount, date, text, reference, boolean |
| evidence_types_required | invoice, contract, bank_statement, confirmation, system_report, shipping_document, receiving_report, approval_memo |
| matching_rule | exact, tolerance, range, presence |
| tolerance | value or none |
| human_judgment_fields | fields the agent may never fill |
| version | starts at 1 |

Typing rule: two structures with the same required fields, evidence types and matching rule are one template with two names. Record the merge. Output feeds the taxonomy and the field-structure library in artifact 08 and the `field_structure` entity in the data generator.

### 5.3 Type C working block: checkpoint rules (35 minutes)

The grid: six agent step types (plan, evidence retrieval, extraction, matching, exception detection, draft conclusion) by four data classes (public, engagement internal, client confidential, restricted). Each cell gets one value: `act` (the agent does it and records it), `propose` (the agent drafts and a human accepts) or `never`.

Then three lists:

1. Where a human must review: the steps where `propose` is the answer regardless of class, with the role that reviews.
2. What the agent may propose: drafts, request lists, matches, exception classifications, conclusion text.
3. What it never writes: the conclusion field as final, any sign-off, the sample selection without approval, anything in the restricted class without a logged checkpoint.

Each cell and list item gets a rationale that names the constraint (C1 to C7). Output feeds the permission model and state machine in 08 and decisions D-05 and D-09.

### 5.4 Type D working block: failure paths (35 minutes)

Eight to nine minutes per path: source unavailable, low confidence, conflicting evidence, agent timeout. For each, the group walks the synthetic failing item and answers:

| Question | Captured as |
|---|---|
| How does the system know it failed? | Detection signal |
| What does the auditor see and where? | State and location in the UI |
| What may the agent do on its own? | Retry, wait, park or nothing |
| Who decides what happens next? | Role |
| How does the item get back to a good state? | Recovery path |
| What must be in the record? | Log entries |
| Does methodology need anything documented for the file? | Documentation requirement |

Output feeds flow 5 in artifact 09, the state machine guards in 08 and decision D-12.

## 6. Capture template

Filled live, read back at minute 45, sent to participants within 24 hours.

| # | Decision | Rationale (constraint or principle) | Open question | Owner | Goes to |
|---|---|---|---|---|---|
| A1 | | | | | decisions.md, 01 |
| B1 | | | | | 08 taxonomy, data generator |
| C1 | | | | | 08 permissions, decisions.md |
| D1 | | | | | 09 flow 5, 08 state machine |

Rows are numbered by type and session (A1, B2-07 and so on). Open questions carry a due date. A question open across two sessions is escalated to the methodology lead role.

## 7. Outputs and where they go

| Output | Destination | Owner |
|---|---|---|
| Revised constraint list | `decisions.md` as D-nn entries with source `confirmed`. Artifact 01 `constraints.json` revision | Decision log owner |
| Procedure taxonomy | `artifacts/08-information-architecture/08-taxonomy.svg` | Design |
| Typed field-structure templates | Field-structure library in 08. `data/generate.mjs` `field_structure` entity | Design with the data generator owner |
| Checkpoint grid and never-write list | `08-permissions.svg`, `08-state-machine.svg` guards. D-05, D-09 | Decision log owner |
| Failure path specification | `09-flow-5-failure-paths.svg`. D-12 | Design |
| Session capture sheets | `research/sme/` by session ID (SME-01 to SME-08). Not committed | Capture lead |
| Open questions register | `research/sme/open-questions.md` | Facilitator |

## 8. Scheduling

| Session | Type | Phase | Brings |
|---|---|---|---|
| SME-01 | A | P1 | Constraint list from 01 |
| SME-02 to SME-04 | B | P1 to P2 | Structure batches 1 to 3 |
| SME-05 | C | P2 | Draft grid |
| SME-06 | D | P3 | Flow 5 draft. Pilot failures seen so far |
| SME-07 | C | P5 | Grid revised against the dry run themes data_access_and_permissions and checkpoint_placement |
| SME-08 | D | P5 | Flow 5 revised against the dry run theme exception_handling |

Between sessions: methodology office hours, weekly, 30 minutes, for questions that do not need a full session. Logged in the open questions register.

## 9. Limitations

- Two to four reviewers speak for methodology. Other reviewers may read the standards differently. Outputs are checked with a second reviewer group before release.
- Sessions run on a synthetic engagement. Real edge cases arrive in the dry run.
- Sixty minutes forces batching. Three sessions for 60+ structures leaves little time per structure. Follow-ups are expected.
- The grid treats data class and step type as the only axes. Jurisdiction-specific rules are an open question carried to the data lead.
- Eight sessions is a planned target. The cadence may stretch across phases.
