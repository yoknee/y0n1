| | |
|---|---|
| Title | Codebook |
| Artifact | 03 Research synthesis |
| Question it answers | What did we code for, how is each code defined and when does it apply? |
| Decisions it feeds | D-03, D-04, D-06 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided:** the codebook structure, the ordinal evidence rubric instead of tallies and which themes became decisions. **We built:** the coding, two coders per source, the affinity sessions and the evidence table. Design team of three at this phase. Theme names were argued out in the weekly coding review.

Reconstructed. Every finding here is a reconstruction of what the research found, rated by an ordinal rubric. No observation, participant or quote count appears because every n except the dry run is a planned target. Ratings are my judgment, checked by the rubric.

D-01 to D-11 have records. IDs from D-12 onward are provisional register IDs from PLAN.md section 9; their records are created when artifacts 07 to 14 ship and the links are added then.

## How the codebook was built

Drafted from the seven constraints in 01 and the five research questions in 02. Revised after the first two contextual inquiry days and again whenever two coders disagreed on the same code twice. Two coders on every source. Final version has 28 codes in 7 groups.

## EV Evidence

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `EV-LOCATE` | Finding where a piece of evidence lives across systems or requests. | Any search, request or wait to obtain a document. | Opening three systems to find one bank statement. |
| `EV-TRACE` | Tracing one sampled item to the documents that support it. | Field-by-field comparison of record to document. | Matching an invoice amount and date to the ledger line. |
| `EV-QUALITY` | Evidence that is partial, illegible or the wrong version. | Any rework caused by the document itself. | A scanned contract with the signature page missing. |
| `EV-REQUEST` | Client requests and the waiting they cause. | Request raised, chased or re-raised. | Second request for shipping documents after the first came back incomplete. |

## WP Workpaper

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `WP-FORMAT` | Workpaper format or layout differs from what the reviewer expects. | Reviewer time spent decoding layout before substance. | Reviewer asks where the population summary is. |
| `WP-REFERENCE` | Reference to evidence or another workpaper is missing or wrong. | Review notes about references. | Note: reference points at prior-year file. |
| `WP-REWORK` | Work redone after review or after a finding. | Any second pass on completed work. | Sample retested after the population changed. |
| `WP-CONCLUSION` | Conclusion wording questioned or rewritten. | Notes on how the conclusion is phrased. | Conclusion does not state the assertion covered. |
| `WP-STRUCTURE` | A Test of Details structure adapted by hand from the methodology template. | Any local variant of a standard structure. | Team adds two columns to the standard structure and drops one. |

## RV Review

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `RV-FIRSTLOOK` | What the reviewer checks first. | Explicit statements or observed first actions in review. | Manager opens the evidence reference before reading the conclusion. |
| `RV-NOTES` | Review note loops: raise, clear, re-raise. | Any note that takes more than one pass to clear. | Note cleared, then reopened by the partner. |
| `RV-LATENCY` | Waiting for review to happen. | Time between ready for review and reviewed. | Workpaper waits three days for the manager. |
| `RV-SIGN` | Hesitation or extra checking before sign-off. | Any statement about what the signer needs to see. | Partner asks to see the exception resolution before signing. |

## EX Exceptions

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `EX-RAISE` | An exception is detected and recorded. | The act of flagging, not the judgment. | Amount differs from invoice by more than tolerance. |
| `EX-RESOLVE` | Work to explain, waive or escalate an exception. | Follow-up requests, calls, memos. | Calling the client controller about a cutoff difference. |
| `EX-JUDGMENT` | Professional judgment applied to an exception. | Statements that this step cannot be delegated. | Whether a difference is a misstatement is my call. |

## TM Time and handoff

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `TM-PEAK` | Busy season concentration of work. | Statements about volume or hours in peak weeks. | Everything lands in the same three weeks. |
| `TM-INTERRUPT` | Interruptions that break a tracing task. | Any switch away from the task before it completes. | Client call mid-sample; restart from the beginning. |
| `TM-HANDOFF` | Context lost between roles or days. | Any re-explanation of state at a handoff. | Senior re-walks the sample for the manager. |
| `TM-EXPERT` | Experienced users choosing speed, density or keyboard operation over explanatory UI. | Any complaint about click count, modal help or guidance that cannot be dismissed; any observed keyboard-only operation through a task. | Keyboard through the sample; the help panel stays closed. |

## AI Stance on agents

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `AI-HANDOFF` | Work the person would hand to an agent. | Explicit offers to delegate. | It can do the matching. I will look at the differences. |
| `AI-NEVER` | Work the person would never hand off. | Explicit refusals. | The conclusion is mine. |
| `AI-TRUST` | What would make the person trust an agent's output. | Conditions stated for trust. | Show me the page it read. |
| `AI-FEAR` | Accountability fear about agent errors. | Statements about blame or liability. | If it is wrong, it is still my name on the file. |
| `AI-STEP` | Wanting to reject or redo one step rather than the whole run. | Any request for step-level control. | I would rerun just the retrieval with the right file. |

## ST Standards and data

| Code | Definition | Inclusion rule | Example |
|---|---|---|---|
| `ST-DOC` | Documentation requirements shaping the work. | Statements about what the file must contain. | The reviewer must be able to re-perform from the file. |
| `ST-INDEP` | Independence shaping who may conclude. | Statements that the auditor must conclude. | A tool cannot sign. |
| `ST-DATA` | Data handling and access limits. | Statements about what may be shared or stored where. | That file cannot leave the client network. |

## Codes to themes

| Theme | Codes |
|---|---|
| T1 Locating evidence costs more than judging it | `EV-LOCATE`, `EV-REQUEST`, `EV-QUALITY`, `TM-INTERRUPT` |
| T2 Tracing a sample to its documents is the repetitive core | `EV-TRACE`, `TM-PEAK` |
| T3 Reviewers look for the source first, the conclusion second | `RV-FIRSTLOOK`, `WP-REFERENCE`, `ST-DOC` |
| T4 Rework originates in references and format, not judgment | `WP-REFERENCE`, `WP-FORMAT`, `WP-REWORK`, `WP-CONCLUSION` |
| T5 Review latency compounds under deadline and notes loop | `RV-LATENCY`, `RV-NOTES`, `TM-PEAK` |
| T6 Exceptions are where judgment lives and nobody hands that off | `EX-RAISE`, `EX-RESOLVE`, `EX-JUDGMENT`, `AI-NEVER` |
| T7 Trust requires seeing what the agent read and rejecting one step | `AI-TRUST`, `AI-STEP`, `RV-FIRSTLOOK` |
| T8 Accountability fear: if it is wrong, it is my name | `AI-FEAR`, `ST-INDEP`, `RV-SIGN` |
| T9 Teams want the system to enforce data limits | `ST-DATA`, `EV-LOCATE` |
| T10 Format inconsistency slows review more than content does | `WP-FORMAT`, `WP-STRUCTURE`, `RV-FIRSTLOOK` |
| T11 Handoffs between roles and days lose context | `TM-HANDOFF`, `TM-INTERRUPT` |
| T12 Experts want fewer clicks, not more guidance | `TM-EXPERT`, `TM-PEAK` |
| T13 Standard Test of Details structures are adapted by hand | `WP-STRUCTURE`, `WP-REWORK` |
| T14 Every role offers the agent its repetitive work and keeps its judgment | `AI-HANDOFF`, `EV-TRACE`, `EX-RAISE` |
