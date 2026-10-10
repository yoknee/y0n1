| | |
|---|---|
| Title | Time-and-motion protocol: evidence review in a Test of Details |
| Artifact | 02 Research plan and instruments |
| Question it answers | Where does the time go when an auditor traces one sampled item to its evidence, step by step? Which steps could an agent take over? |
| Decisions it feeds | D-02 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

## 1. Purpose and scope

Phase P1. Interviews and the diary give self-reported time. This protocol measures it. One observer sits with one auditor during live evidence review and times each step of tracing a sampled item. The output is a step-level time profile that tells the design which steps are worth automating and where a checkpoint costs the least.

Planned target: 12 sessions of 90 minutes. Planned mix: 8 Associates, 4 Seniors. At least two sessions per audit area across revenue, inventory, cash, fixed assets and payables. No session is reported in this reconstruction.

Role split. I defined the step taxonomy and the rule that only step names and durations are recorded. We run the sessions, keep the sheets and compute the statistics.

## 2. Session setup

| Item | Rule |
|---|---|
| Length | 90 minutes. Setup 10, observation 70, debrief 10. |
| People | One observer, one auditor. No one else in the room or on the call. |
| Work | The auditor's real queue of sampled items for a Test of Details in progress. The observer never chooses items. |
| Location | Office or remote with shared screen. On a client site only with the engagement partner's approval. |
| Consent | Verbal script in section 3, recorded as yes or no on the session sheet. |
| What is recorded | Step codes, start and end times, interruption codes, evidence type, evidence source category, cycle outcome. Nothing else. |
| What is never recorded | Client names, amounts, document contents, reference numbers, screenshots, screen recording, audio. The only free-text field is `notes`, checked before the sheet leaves the room. |
| Observer position | Beside the auditor, screen visible. Remote: the auditor shares the screen; the observer records nothing from it. |
| Stop rule | The auditor may pause or end at any time. Any item involving restricted data is skipped at the auditor's call and logged as `skipped_restricted` with no duration. |

## 3. Consent script

> I am here to time the steps of your work, not to judge it. I write down step names and how long each takes. I do not write down anything about the client, the amounts or the documents. There is no recording. Your name is not on the sheet, only a session number. You can stop at any time or ask me to skip an item. Is that all right?

## 4. Step taxonomy

One cycle is one sampled item traced from the sample list to handoff. Steps run in roughly this order. A step may repeat within a cycle; each repeat is a new row with `repeat` set.

| Code | Step | Starts when | Ends when |
|---|---|---|---|
| S1 | Locate the sample item | The auditor turns to the sample list or selection schedule | The item's identifier and expected values are on screen |
| S2 | Request or locate evidence | The auditor begins looking for or asking for the document | The document is in hand. Or the request is sent and the item is parked |
| S3 | Open the document | The auditor opens the file, portal page or image | The relevant page is visible |
| S4 | Find the field | The auditor scans for the value to compare | The value is located on the page |
| S5 | Compare to the record | The auditor checks the document value against the recorded value, including any tolerance or recalculation | The auditor states or marks match or no match |
| S6 | Record the result | The auditor begins entering the result in the workpaper or tracker | The result is saved |
| S7 | Flag an exception | Only on no match. The auditor starts documenting the difference | The exception is logged or the item is marked for follow-up |
| S8 | Annotate the workpaper | The auditor adds tick marks, references, notes or links to the evidence | Annotation saved |
| S9 | Hand off | The auditor moves the item or the workpaper to the next person or files it for review | The handoff action completes |

Parked items: when S2 ends with a request sent, the cycle closes with outcome `parked`. If the auditor returns to it inside the session, a new cycle opens at S3 with `parked_return` set.

## 5. Timing method

- One stopwatch in lap mode. One lap per step. The observer notes the step code and the lap time without speaking.
- Times to the second. A step under two seconds is recorded as 2.
- Interruptions are timed on a second stopwatch and logged with a code. Interruption time is subtracted from the step it fell in. Codes: I1 colleague question, I2 message or email, I3 phone or call, I4 system wait (loading, login, timeout), I5 break, I6 other. I4 is the one the design can touch. Keep it distinct from I2.
- Thinking time with no visible action counts in the current step. Do not open a new step for it.
- If the observer loses track, the current step is marked `unclear` and timing resumes at the next clear boundary. The cycle is kept with the flag.
- Target throughput: 10 to 20 cycles per 70-minute observation. Fewer is fine. Never ask the auditor to speed up.

Observer training: one practice session on a mock queue of synthetic items. One paired session early in the study (two observers, one auditor) to check that step boundaries agree. Boundary disagreements are resolved by tightening the start and end triggers above.

## 6. Data sheet

Session sheet, one per session:

| Column | Values |
|---|---|
| session_id | TM-01 to TM-12 |
| observer_id | Initials code |
| date, start_time, end_time | |
| role | associate, senior |
| audit_area | revenue, inventory, cash, fixed_assets, payables |
| procedure_type | test_of_details |
| setting | office, remote, client_site |
| tool_categories_in_use | workpaper tool, document repository, client portal, spreadsheet, email, other (tick all that apply) |
| consent | yes, no |
| cycles_completed, cycles_parked, cycles_skipped_restricted | counts |

Step sheet, one row per step occurrence:

| Column | Values |
|---|---|
| session_id | |
| cycle_no | 1, 2, 3 and so on |
| step_code | S1 to S9 |
| repeat | 0 or 1 |
| start_s, end_s, duration_s | Seconds from observation start |
| interruption_code | none, I1 to I6 |
| interruption_s | Seconds subtracted |
| evidence_type | invoice, contract, bank_statement, confirmation, system_report, shipping_document, receiving_report, approval_memo, other |
| evidence_source | client_erp, bank_portal, confirmation_service, document_request, prior_year_file, other |
| cycle_outcome | matched, exception, parked, skipped_restricted, unclear (set on the last row of the cycle) |
| parked_return | 0 or 1 |
| notes | Step-level remark. No client data. Checked before the sheet leaves the room. |

## 7. Analysis

1. Descriptive statistics per step: n, median, interquartile range, minimum and maximum of `duration_s`. Means sit beside medians because waits skew the distributions.
2. Where time goes: share of total cycle time per step, overall and by audit area. Small multiples by area, one bar per step, with text labels so the chart reads without color (artifact 12 rules).
3. Repeats: share of cycles with any repeated step, by step. A repeat is rework inside the cycle.
4. Interruptions: interruption minutes per observed hour by code. I4 system wait reported on its own.
5. Parked rate: share of cycles parked at S2, by evidence source. Waiting on documents is the wait the design can shorten with earlier requests.
6. Agent takeover map. For each step: what the agent could do, what the human must still do, which checkpoint would sit there. The table below is the starting hypothesis. The data revises it.

| Step | Agent could | Human must | Checkpoint candidate |
|---|---|---|---|
| S1 | Present the next item with expected values | Confirm the sample was selected correctly | Before the run starts |
| S2 | Retrieve from connected sources. Draft the request list | Approve requests to the client. Approve any restricted retrieval | Restricted class only |
| S3 | Open and page to the relevant span | Nothing | None |
| S4 | Extract the field and show the span | Confirm the extraction when confidence is low | Low confidence only |
| S5 | Apply the matching rule and tolerance | Judge any no match | Every no match |
| S6 | Propose the result | Accept the result | Per item or per batch |
| S7 | Detect and draft the exception | Classify and resolve it | Every exception |
| S8 | Draft annotations with citations | Review the annotation | Per workpaper |
| S9 | Route to the reviewer | Decide it is ready | Per workpaper |

7. Output: a step-level time profile per area and the takeover map, labeled planned target for n and illustrative for any number shown. These feed the evidence table (03), the opportunity map (06) and checkpoint placement (08, 09).

## 8. Limitations

- Observation changes behavior. Auditors may work faster or more carefully when timed. Report this beside the result.
- Twelve sessions across five areas gives a shape, not an estimate. No per-area comparison is significant.
- Step boundaries are judgments. The paired session checks them once. Drift is possible.
- Cycles vary by evidence type. A bank statement and a signed contract do not take the same path. Analysis splits by evidence type where n allows.
- Parked items hide the longest wait, which happens outside the session. The diary covers that wait.
- Remote sessions lose body language and off-screen interruptions.
- Busy season scheduling limits who can be observed. Associates are over-represented by design because they do most of the tracing.
