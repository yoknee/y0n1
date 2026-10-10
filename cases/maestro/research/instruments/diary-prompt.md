| | |
|---|---|
| Title | Two-week busy season diary study |
| Artifact | 02 Research plan and instruments |
| Question it answers | Where does an auditor's day go during busy season, what blocks it, what gets redone and what would they hand to an agent? |
| Decisions it feeds | D-02 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided:** a busy-season diary over a retrospective interview, the five-question shape and the two-week window. **We built:** the prompts, the onboarding and the weekly check-ins. Design team of three at this phase.

## 1. Purpose and scope

Phase P1, discovery. Interviews capture one remembered instance. The diary captures ten working days as they happen, in the weeks when time pressure is highest. It fills the lifecycle heat map in artifact 03 with day-by-day data and gives the time-and-motion study its context.

Planned target: 10 participants for 10 working days (two weeks). Planned mix: 4 Associates, 4 Seniors, 2 Managers. Partners and reviewers are out of scope here; their time is covered by interviews and SME sessions. No entry is reported in this reconstruction.

Role split. I chose the five questions and the five-minute ceiling. We onboard, remind, read entries weekly and code them.

## 2. Recruiting

| Criterion | Rule |
|---|---|
| Role | Associate, Senior or Manager, in fieldwork during the study window. |
| Engagement | At least one engagement in the test stage during the two weeks. |
| Area | Across the 10, at least three of the five areas: revenue, inventory, cash, fixed assets, payables. |
| Region | At least three of the five regions: North, South, East, West, Central. |
| Approval | The participant's engagement manager agrees to five minutes a day of study time. Managers in the sample get approval from their partner. |
| Exclusions | Platform product team. Interview participants (INT-01 to INT-20) are not reused, so the diary brings new people. |
| Replacement | A participant who misses four of the first five days is thanked and replaced. The replacement starts a fresh two weeks. |

## 3. Onboarding script (15 minutes, video call)

Read or paraphrase. Confirm each step.

> Thanks for joining. For the next two weeks we ask for five minutes at the end of each working day. You answer five short questions in the diary form. Nothing else.
> The questions are about where your time went, what got in your way and what you had to redo. The last question asks what you would hand to a software agent if one existed today.
> You never write a client name, an engagement name, an amount, a document name or a colleague's name. Say "the client", "the invoice", "my senior". If something slips in, we remove it and tell you.
> The form is open from 16:00 to 23:59 your time. You get a reminder at 18:30 and a second at 21:00 if there is no entry. A missed day stays missed. Do not fill in yesterday.
> Once a week we talk for 15 minutes about your entries.
> Your entries sit under a participant number. Your manager sees nothing you write. You can stop at any time and ask us to delete your entries.
> Do you agree to take part? Do you agree to the weekly call?

Then: show the form, complete a practice entry about today together, confirm the reminder channel, book both weekly check-ins, send the never-include card.

## 4. Consent

Recorded in the onboarding notes: participant ID (DRY-01 to DRY-10), role, region, two yes answers, date. Withdrawal: entries deleted within 24 hours, confirmed by message. A participant who withdraws after day 5 is not replaced.

## 5. Daily prompt

Five questions. Target five minutes. Fields are fixed so entries code cleanly.

| # | Question | Field type | Note to participant |
|---|---|---|---|
| 1 | Which stages did you work in today? | Multi-select from the nine stages, with hours per stage to the nearest half hour | Stages: plan, assess risk, design procedures, gather evidence, test, evaluate exceptions, conclude, review, sign. Pick "none" only on a non-working day. |
| 2 | Where did the time go? Name the three activities that took longest. | Three short text fields plus hours each | An activity, not a stage. "Chasing a confirmation" is an activity. |
| 3 | What blocked you today? | Short text plus pick-list: waiting on client, waiting on colleague, waiting on system, missing access, unclear instruction, tool failure, nothing | Say how long you waited. |
| 4 | What did you have to redo today and why? | Short text plus pick-list: missing evidence, wrong reference, format inconsistency, calculation, conclusion wording, cutoff, sample selection, unclear exception resolution, other, nothing | The pick-list matches the rework audit codes so the two streams compare. |
| 5 | One thing you did today that you would hand to an agent. What would you check before trusting it? | Two short text fields | One task. The second field is required. |

A closing field, "Anything else about today?", is optional. Entries are stamped with date and participant ID. Nothing else is collected.

## 6. Weekly check-in guide (15 minutes)

Held on day 5 and day 10. The moderator reads the week's entries beforehand and marks three to probe.

| Minutes | Step |
|---|---|
| 0 to 2 | Thanks. Confirm the entries were theirs and complete. Ask about any missed day. |
| 2 to 9 | Three probes from the entries. "On day 3 you wrote that you redid the tie-out. What happened?" Ask for sequence, cause, who decided, time lost. |
| 9 to 12 | Question 5 review. Read back the week's handoff candidates. "Which of these would you still hand off on reflection? What changed?" |
| 12 to 14 | Strikes. Tell the participant about any redactions made. Confirm the rule. |
| 14 to 15 | Next week. Confirm the reminder time still works. Day 10: thank and close. Restate when the name to ID mapping is deleted. |

Notes follow the interview note template: timestamp, quote, observation, code candidate.

## 7. Never include

Printed card sent at onboarding. Shown at the top of the form.

- Client names, group names or any name that points at a client.
- Engagement codes or names.
- Amounts, balances, thresholds or percentages from the file.
- Document names, invoice numbers, contract titles or reference numbers.
- Names of colleagues, client staff or specialists. Use role words.
- Screenshots or attachments. The form accepts none.
- Locations that identify a client site.

Research ops scans every entry within 24 hours. A hit is redacted to `[removed]`, logged under the participant ID and raised at the weekly check-in. Two hits in a week: a reminder call. Three: the participant is thanked and only the clean entries are kept.

## 8. Reminder cadence

| When | Channel | Message |
|---|---|---|
| Day 0 | Message | Confirm onboarding done. Form link. Card attached. |
| Daily, 18:30 local | Message | "Five minutes for today's diary." Link. |
| Daily, 21:00 local | Message, only if no entry | "Still time for today's entry. A missed day is fine. Please do not back-fill." |
| Day 5 and day 10 | Calendar | Weekly check-in. |
| Weekend | None | Weekend entries are accepted if the participant worked. Never prompted. |
| Day 11 | Message | Thanks. State the date the ID mapping is deleted. |

Response tracking: a sheet with one row per participant per day, status entered, missed or redacted. Research ops reviews it each morning.

## 9. How entries are coded

Unit of analysis: one daily entry. Coding happens after week 1 and again after week 2, so week 1 codes are checked against week 2.

| Pass | Field | Scheme | Output |
|---|---|---|---|
| 1 | Q1 stages and hours | Closed, the nine stages | Hours per stage per participant day. Feeds the lifecycle heat map in 03, labeled reconstructed. |
| 1 | Q3 pick-list | Closed | Blocker type by role and stage. Wait hours where given. |
| 1 | Q4 pick-list | Closed, same list as the rework audit | Rework cause by stage, self-reported. Compared with the file-based audit. |
| 2 | Q2, Q3 text, Q4 text, closing field | Open, codebook in `research/codebook.md` (03) | Coded observations with method tag `diary`. |
| 2 | Q5 task | Open, then grouped to the agent step types: plan, evidence retrieval, extraction, matching, exception detection, draft conclusion, other | Handoff candidates by step and role. |
| 2 | Q5 check | Open, then grouped: see the source, see the steps, compare to my own, second person checks, sample it, would not trust | Trust condition by step and role. Feeds the stance block in 04 and checkpoint placement in 08. |

Two coders on every entry. Calibration: both coders code the week 1 entries of DRY-01 and DRY-02 first and compare. Disagreements are talked through and definitions tightened before the rest is coded; later disagreements go to the weekly coding review in plan.md section 5. Weekly check-in notes are coded with the interview notes.

Reporting: patterns by role and by stage, in words, with the evidence strength rubric from 03. Hours are reported as medians per participant day and labeled illustrative wherever they appear in the case. No entry counts are reported.

## 10. Data handling

- The form stores participant ID, date and answers. No name, email or device data.
- The ID to name mapping lives in one file held by research ops and is deleted at study end.
- Exports go to `research/raw/diary/` by ID. The folder is not committed.
- A quote used in any artifact is checked against the never-include list a second time.

## 11. Limitations

- Ten participants, one busy season. Patterns, not estimates.
- Self-reported hours. Checked for shape against the time-and-motion study, not used as measurements.
- End-of-day recall compresses the morning. Expect the afternoon to be over-represented.
- People who keep a diary for two weeks under deadline are not typical. Expect the conscientious.
- The pick-lists shape the answers. The text fields exist to catch what the lists miss.
- Question 5 names the agent, so handoff ideas are prompted, not spontaneous.
