| | |
|---|---|
| Title | Workpaper rework audit protocol |
| Artifact | 02 Research plan and instruments |
| Question it answers | What causes rework in completed Test of Details workpapers, by audit area and by lifecycle stage, as recorded in review notes and revisions? |
| Decisions it feeds | D-02 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided:** to audit completed workpapers rather than ask reviewers what causes rework. **We built:** the coding scheme with a Quality and Methodology reviewer and ran the double coding. Design team of three at this phase.

## 1. Purpose and scope

Phase P1. Interviews and the diary say why work gets redone. This audit reads the record. Completed workpapers from prior engagements carry review notes and revision trails. Coding them gives a cause profile that does not depend on memory. The profile tells the design which causes a typed template or a pre-handoff check could remove.

Planned target: 40 workpapers, 8 per audit area across revenue, inventory, cash, fixed assets and payables. No workpaper is reported in this reconstruction.

Role split. I set the sampling frame, the coding scheme and the agreement threshold. We code the files in pairs. The Quality and Methodology reviewer role adjudicates.

## 2. Access and confidentiality

| Rule | Detail |
|---|---|
| Access | Granted per engagement by the engagement partner for the study window. Read only. |
| Where coding happens | Inside the engagement file system. Nothing is exported, copied, screenshotted or printed. |
| What leaves the file | The data sheet in section 6. Codes, bands and counts only. |
| Identifiers | Each workpaper gets a study ID (RW-01 to RW-40). The mapping to the engagement is held by research ops and deleted at study end. |
| Never recorded | Client name, engagement name, amounts, dates that identify a period, document names, preparer or reviewer names, note text. |
| Coders | Two coders from the research team. Each has audit background or is paired with someone who does. One Quality and Methodology reviewer as adjudicator. |
| Independence | Coders do not code workpapers from engagements they worked on. |

## 3. Sampling frame

| Criterion | Rule |
|---|---|
| Population | Test of Details workpapers in engagement files closed in the prior cycle. |
| Inclusion | The workpaper has at least one review note or one recorded revision after first submission. |
| Strata | Audit area (5) by engagement size band (small, medium, large). Target 8 per area with at least two per size band. |
| Region | At least three of the five regions across the 40. |
| Selection | Random within strata from the list of eligible workpapers, drawn by research ops before access is requested. |
| Replacement | A workpaper that turns out to be out of scope (not a Test of Details, no notes) is replaced from the same stratum. Record the replacement. |
| Oversample | Draw 50. Use the first 40 that pass inclusion. Keep 10 in reserve. |

Bias note: the inclusion rule selects workpapers with rework. Workpapers with no notes are counted in the frame so the share with no rework can be stated. They are not coded.

## 4. Unit of analysis

One rework event: a review note that required a change or a recorded revision after first submission. A note that asked a question with no change is coded `clarification` and kept separate. Workpaper-level fields are recorded once per workpaper.

## 5. Coding scheme

### 5.1 Cause codes

One primary cause per event. A secondary cause is allowed and marked. R9 requires a one-line generic description with no client content.

| Code | Cause | Definition | Inclusion rule | Generic example |
|---|---|---|---|---|
| R1 | Missing evidence | Support for a sampled item was absent or insufficient at review | Note asks for a document, confirmation or additional support | "No shipping document for item 7" |
| R2 | Wrong reference | Cross-reference points to the wrong document, page, cell or workpaper | Note corrects a reference. The evidence itself was fine | "Tick mark references the prior year schedule" |
| R3 | Format inconsistency | Layout, tick marks, naming or structure differ from the expected format | Note is about presentation, not substance | "Use the standard tie-out layout" |
| R4 | Calculation | Arithmetic, tolerance, recalculation or formula error | Note identifies a numeric error made by the preparer | "Variance column does not foot" |
| R5 | Conclusion wording | Conclusion is unclear, overstated, understated or does not match the results | Note changes the conclusion text without changing the evidence | "Conclusion says no exceptions. Two are listed" |
| R6 | Cutoff | Period assignment error or missing cutoff testing | Note concerns the period a transaction belongs to | "Item recorded in the wrong period, not addressed" |
| R7 | Sample selection | Sample size, method or population does not match the plan | Note questions how items were chosen or how many | "Population excludes manual entries" |
| R8 | Unclear exception resolution | An exception is noted but how it was resolved is not documented or not supported | Note asks how an exception was closed | "Explain how the difference was cleared" |
| R9 | Other | Anything else | Required generic description | |
| R0 | Clarification | Question with no change required | Kept separate from rework | |

### 5.2 Stage codes

Stage introduced and stage caught, from the nine lifecycle stages: plan, assess risk, design procedures, gather evidence, test, evaluate exceptions, conclude, review, sign. Stage introduced is the coder's judgment of where the cause arose. Stage caught is where the note was raised, review or sign for almost every event.

### 5.3 Bands

- Fix effort: small (under 15 minutes, judged), medium (15 to 60), large (over 60), unknown. Judged from the revision trail. Mark unknown when the trail does not show it.
- Days open: from note raised to note cleared, from the file's timestamps. Bands: 0, 1 to 2, 3 to 7, over 7.

## 6. Data sheet

Workpaper sheet, one row per workpaper:

| Column | Values |
|---|---|
| study_id | RW-01 to RW-40 |
| audit_area | revenue, inventory, cash, fixed_assets, payables |
| engagement_size_band | small, medium, large |
| region | North, South, East, West, Central |
| preparer_role, first_reviewer_role, final_reviewer_role | associate, senior, manager, partner |
| review_rounds | count of distinct review passes |
| events_total, events_rework, events_clarification | counts |
| coder_id | |
| double_coded | 0 or 1 |

Event sheet, one row per event:

| Column | Values |
|---|---|
| study_id, event_no | |
| review_round | 1, 2, 3 and so on |
| reviewer_role | senior, manager, partner, methodology_reviewer |
| primary_cause | R0 to R9 |
| secondary_cause | none, R1 to R9 |
| stage_introduced | one of the nine stages |
| stage_caught | review, sign |
| resolution | revised, explained, withdrawn |
| fix_effort_band | small, medium, large, unknown |
| days_open_band | 0, 1 to 2, 3 to 7, over 7 |
| coder_id | |
| generic_note | Required for R9. No client content. |

## 7. Double coding and agreement

1. Subset: 10 workpapers, two per audit area, chosen at random from the 40 before coding starts.
2. Both coders code the subset independently, events and workpaper fields, without seeing each other's sheet.
3. Agreement on `primary_cause`: percent agreement and Cohen's kappa. Agreement on `stage_introduced`: percent agreement.
4. Threshold: kappa at least 0.70 on primary cause. Below it, both coders meet with the adjudicator, tighten the definitions and inclusion rules in 5.1 and recode the subset once. Record before and after in the coding memo.
5. Residual disagreements are adjudicated by the Quality and Methodology reviewer. The adjudicated code stands.
6. After the subset passes, the remaining 30 are split between the coders. Every tenth workpaper thereafter is spot-checked by the other coder.
7. The coding memo records every definition change, every adjudication and the agreement figures. Any agreement figure shown in the case is labeled illustrative.

## 8. Analysis

1. Cause profile: share of rework events by primary cause, overall. Table plus a bar chart with text labels.
2. By audit area: cause by area cross-tab, 5 by 9. Small multiples, one per area, same cause order in each.
3. By lifecycle stage: cause by stage introduced. Shows which causes start upstream of the test stage (sample selection, design procedures) and which start in test or conclude.
4. Stage caught: how much rework reaches sign before it is caught.
5. Effort and days open by cause, as bands.
6. Preventability map. For each cause: could a typed field structure (08) or a pre-handoff validation have caught it before review? Coded yes, partly or no, with a one-line reason. This is the bridge to the field-structure library and the checkpoint rules.
7. Comparison: cause shares against diary question 4 and survey item O1, which use the same code list. Agreement between the record and self-report is reported in words.
8. Output: cause tables and the preventability map, labeled planned target for n. These feed the evidence table (03), the opportunity map (06) and the taxonomy work in 08.

## 9. Limitations

- Review notes record what reviewers wrote. Rework fixed by the preparer before submission leaves no trace.
- Closed files may have had notes cleared or tidied. Some trails are incomplete.
- The inclusion rule selects workpapers with notes. The result describes rework when it happens, not how often it happens.
- Stage introduced is a judgment made after the fact.
- Prior-cycle tools may differ from current tools. The causes are durable. The frequencies may not be.
- Forty workpapers across five areas and three size bands leave small cells. Area comparisons are directional.
- Coders bring their own audit experience. Double coding limits this. It does not remove it.
