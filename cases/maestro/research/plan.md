| | |
|---|---|
| Title | Research plan |
| Artifact | 02 Research plan and instruments |
| Question it answers | How did we learn how engagement teams work, with what methods, what rigor and what limits? |
| Decisions it feeds | D-02 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided** the method mix, the sampling frame per method and that contextual inquiry anchors the plan. **We built** the instruments, ran the screeners and coded the material as a team.

Every participant count in this plan is a planned target except two real figures: the dry run involved 20 engagement teams and produced 1,600+ feedback items. No result is reported in this document. Results, where this reconstruction shows them, live in artifact 03 as reconstructed findings and in artifact 13 as illustrative metrics, each labeled.

## 1. Research questions

| ID | Question | Why it matters to the boundary |
|---|---|---|
| RQ1 | How do engagement teams gather, test and review evidence during busy season? Where does the time go? | Tells us which steps an agent should take over (Q1) and how much of the work must stay visible (Q3). |
| RQ2 | What makes a workpaper hard to review, and what does a reviewer look for first? | Shapes the review center and the checkpoint design (Q2). |
| RQ3 | What would each role hand to an agent, what would they never hand off and what would make them trust it? | Sets the trust calibration targets and the failure design (Q4). |
| RQ4 | Where in the lifecycle do errors and rework originate? | Tells us where a checkpoint pays for itself (Q2) and what the agent must get right first. |
| RQ5 | What baseline do we measure change against? | Without it every outcome is a story. With it, outcomes are directional with a mechanism. |

## 2. Design of the plan

Mixed method. Qualitative methods answer how and why. Quantitative methods size where time and rework go and set a baseline. Contextual inquiry is the anchor: everything else either prepares for it (SME sessions, screener) or tests what it found (interviews, diary, survey, time-and-motion, rework audit). Methods run in phase P1 unless noted. SME sessions continue through P5 because the checkpoint rules change as agentic workflows arrive.

Why contextual inquiry anchors it: busy-season fieldwork is where the problem lives. Self-report cannot recover where ninety seconds went between opening a document and finding a field. Watching can.

Why a diary study in busy season: interviews happen after the fact and compress two weeks into one story. Daily entries catch the rework and the blockers while they are fresh.

Why quantitative at all with these n: not to claim significance. To find where time concentrates (time-and-motion), what rework costs and why (rework audit) and to have a before number (survey) so that change after release is directional with a mechanism rather than an anecdote.

## 3. Methods

### M1 Contextual inquiry, full fieldwork days {#m1}

- Planned target: 6 engagement teams, 2 full days each, during fieldwork in busy season.
- Recruiting: teams in active fieldwork; mix of industries and engagement sizes; engagement partner consent; one Senior as host; the observer signs the engagement's confidentiality terms; no client data recorded, step names and durations only.
- Protocol: shadow one Senior and one Associate across a working day. Observe how a sample is traced to its evidence, how exceptions are raised and resolved, how review notes are received and cleared. Ask only clarifying questions in the moment; save why questions for the end-of-day debrief (20 minutes).
- Field note template: timestamp, lifecycle stage (plan, assess risk, design procedures, gather evidence, test, evaluate exceptions, conclude, review, sign), observation, quote, tool in use, interruption, code candidate.
- Analysis: notes coded to the codebook in artifact 03. Pain points placed on the nine lifecycle stages for the heat map.
- Limitations: observer effect; teams that consent during busy season are the better-run teams; six teams cannot represent every territory or industry.

### M2 Semi-structured interviews

- Planned target: 20 interviews, four per role: Associate, Senior, Manager, Partner, Quality and Methodology reviewer. 45 minutes each.
- Instrument: [discussion-guide.md](instruments/discussion-guide.md).
- Recruiting: at least two territories per role; mix of tenure; not from the M1 teams, so the two methods are independent.
- Analysis: transcripts coded to the codebook. Themes rated by the ordinal evidence rubric in 03.
- Limitations: self-report and recall; role-specific probes can lead if the interviewer drifts.

### M3 Diary study

- Planned target: 10 participants (Associates and Seniors), two weeks in busy season.
- Instrument: [diary-prompt.md](instruments/diary-prompt.md).
- Analysis: entries coded by lifecycle stage and rework cause. Weekly check-ins coded like interviews.
- Limitations: attrition under deadline pressure; entries skew to memorable events.

### M4 SME sessions with methodology reviewers

- Planned target: 8 sessions, 60 minutes, P1 through P5.
- Instrument: [sme-session-guide.md](instruments/sme-session-guide.md).
- Four session types: validate the constraints (01); build the procedure taxonomy and the field-structure library; set the checkpoint rules; walk the failure paths.
- Outputs: decisions to decisions.md; taxonomy, state machine guards and permission model to 08.
- Limitations: a methodology view, not a field view. Sessions validate rules; they do not observe behavior.

### M5 Time-and-motion study of evidence review

- Planned target: 12 sessions, 90 minutes, one observer and one auditor each.
- Instrument: [time-and-motion-protocol.md](instruments/time-and-motion-protocol.md).
- Analysis: descriptive statistics of step durations; where time goes by step; which steps an agent could take over and which must stay visible.
- Limitations: small n; one observer; step boundaries are a judgment.

### M6 Workpaper rework audit

- Planned target: 40 completed workpapers from prior engagements, anonymized, across the five audit areas.
- Instrument: [rework-audit-protocol.md](instruments/rework-audit-protocol.md).
- Analysis: rework causes by audit area and lifecycle stage. A 10-workpaper subset is double coded with an agreement check.
- Limitations: review notes record what reviewers wrote, not what they thought; prior engagements only.

### M7 Baseline survey

- Planned target: 120 respondents across the five roles.
- Instrument: [survey.md](instruments/survey.md). SUS applied to the current tool set, eight tool-satisfaction items, three perceived-effort items, two open-text items.
- Analysis: SUS by the standard formula; satisfaction descriptives by role. The same SUS items run again in usability round 3 (M13) so the trend is like for like.
- Limitations: response bias toward the dissatisfied; SUS is blunt for a tool set rather than one tool.

### M8 Pilot telemetry {#m8}

- Planned target: 40 pilot users from P3 onward.
- Event set: procedure started, agent run started, step completed, checkpoint reached, checkpoint action (approve, edit, reject step, rerun), exception opened, exception resolved, conclusion drafted, conclusion signed, time to conclusion, review latency from agent draft to manager approval.
- Analysis: descriptives only. No inferential claims from pilot data.
- Limitations: pilot users are early adopters; events measure the product, not the audit.

### Later methods, specified in their own artifacts

| ID | Method | Phase | Planned target | Where |
|---|---|---|---|---|
| M9 | Usability round 1, moderated think-aloud | P3 | 8 sessions | 13 |
| M10 | Dry run with engagement teams | P4 | **20 teams, 1,600+ items (real)** | 13 |
| M11 | Usability round 2, task-based with metrics | P4 | 12 sessions | 13 |
| M12 | Card sort and tree test | P5 | 30 participants | 08 |
| M13 | Usability round 3, unmoderated with SUS | P6 | 40 participants | 13 |

## 4. Recruiting rules shared by every method

- Participants are auditors in the roles named. No clients, no client staff.
- Consent in writing. Participation is voluntary and does not reach performance reviews.
- No client data in any note, recording, diary entry, survey answer or screenshot. The observer records step names, durations and the auditor's words about the work, never the work itself.
- Territory is recorded as one of five synthetic regions in this reconstruction. The production study's territories are not depicted.
- Incentive: time back. Sessions are booked inside working hours with the engagement manager's agreement.

## 5. Analysis method

1. Codebook first. The codebook (03) is drafted from the constraints in 01 and the research questions, then revised after the first two contextual inquiry days.
2. Two coders on every qualitative source. Disagreements resolved in a weekly 30-minute session; the codebook changes when a disagreement repeats.
3. Themes are rated by an ordinal rubric: methods that surfaced the theme (named), roles that raised it (listed), consistency (high, medium, low). No tallies. With planned-target counts, a tally would be a number nobody measured.
4. Quantitative streams report descriptives. Where time goes, what rework costs, what the baseline is. No significance testing at these n.
5. Every finding carries its source method and, once decisions exist, the decision IDs it drove. That is the evidence table in 03.

## 6. Limitations of the plan as a whole

- Every count outside the dry run is a planned target. This reconstruction reports the plan, not the attainment.
- Busy season access shapes the sample. Teams that can host an observer are not the teams under the most pressure.
- The plan was written for one firm's methodology. Other firms sequence the lifecycle differently.
- The lead designed the plan and also made the product decisions it informed. Two coders and the SME sessions are the check on that.

## 7. What feeds what

| Output | Feeds |
|---|---|
| Codebook, themes, evidence table | 03 |
| Role goals, tasks, frustrations, AI stance | 04 |
| Lifecycle stages, pain and opportunity rows | 05 |
| Jobs and opportunities | 06 |
| Constraint validation, taxonomy, checkpoint rules | 08, decisions.md |
| Baseline SUS and satisfaction | 13, 14 measurement plan |
