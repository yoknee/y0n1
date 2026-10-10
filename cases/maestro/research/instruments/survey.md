| | |
|---|---|
| Title | Baseline survey: SUS and tool satisfaction |
| Artifact | 02 Research plan and instruments |
| Question it answers | How usable and how satisfactory are the tools auditors use today to gather, test and review evidence, by role, before anything new ships? |
| Decisions it feeds | D-02 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

## 1. Purpose and scope

Phase P1. A quantitative baseline for the measurement plan in artifact 14. The same SUS items are re-run in usability round 3 so the trend has a start point. The survey is anonymous and takes under ten minutes.

Planned target: 120 complete responses. No result exists in this reconstruction. Any figure about this survey that appears in a later artifact is labeled illustrative.

Role split. I chose SUS as the comparable score and wrote the satisfaction and effort items against the four user problems in artifact 01. We build the form, run the distribution and clean the data.

## 2. Structure

| Block | Items | Scale | Minutes |
|---|---|---|---|
| A Screener | 4 | Closed | 1 |
| B Instruction | 0 | | 0.5 |
| C SUS | 10 | 5-point agreement | 2.5 |
| D Tool satisfaction | 8 | 7-point satisfaction | 2 |
| E Perceived effort | 3 | 7-point effort | 1 |
| F Open text | 2 | Text | 2 |
| G Close | 0 | | 0.5 |

## 3. Block A: screener

| # | Item | Options | Rule |
|---|---|---|---|
| A1 | What is your current role? | Associate, Senior, Manager, Partner, Quality and Methodology reviewer, Other | Other ends the survey with thanks. |
| A2 | How many years have you worked in audit? | Under 1, 1 to 2, 3 to 5, 6 to 10, Over 10 | None. |
| A3 | Which region are you based in? | North, South, East, West, Central | Region is a synthetic banding used in this reconstruction. No office or country is collected. |
| A4 | Did you work on at least one engagement during the most recent busy season? | Yes, No | No ends the survey with thanks. |

## 4. Block B: instruction

Shown once, then repeated as a one-line reminder above blocks C to E.

> The next questions ask about **the tools you use today to gather, test and review evidence**: the systems, files and templates you use to pull samples, obtain documents, trace items, record results and get workpapers reviewed. Where a question says "the system", think of those tools taken together, as you experience them during a Test of Details.

## 5. Block C: System Usability Scale

Standard wording (Brooke, 1996). Items in the standard order. Scale: 1 Strongly disagree, 2, 3, 4, 5 Strongly agree. One item per row. All ten are required.

| # | Item |
|---|---|
| S1 | I think that I would like to use this system frequently. |
| S2 | I found the system unnecessarily complex. |
| S3 | I thought the system was easy to use. |
| S4 | I think that I would need the support of a technical person to be able to use this system. |
| S5 | I found the various functions in this system were well integrated. |
| S6 | I thought there was too much inconsistency in this system. |
| S7 | I would imagine that most people would learn to use this system very quickly. |
| S8 | I found the system very cumbersome to use. |
| S9 | I felt very confident using the system. |
| S10 | I needed to learn a lot of things before I could get going with this system. |

## 6. Block D: tool satisfaction

Stem: "How satisfied are you with how your current tools support each of the following?" Scale: 1 Very dissatisfied, 2 Dissatisfied, 3 Somewhat dissatisfied, 4 Neither, 5 Somewhat satisfied, 6 Satisfied, 7 Very satisfied. A "Not applicable to my role" option is offered on T2 and T6 only.

| # | Item | User problem in 01 |
|---|---|---|
| T1 | Finding the evidence you need for a sampled item | Fragmented tools |
| T2 | Tracing one sampled item through to its supporting documents | Manual evidence review |
| T3 | Consistency of workpapers across teams and engagements | Inconsistent workpapers |
| T4 | Turnaround of review, from workpaper ready to notes received | Deadline pressure |
| T5 | The amount of rework caused by how evidence and workpapers are handled | Inconsistent workpapers |
| T6 | Handoffs between roles, from preparer to reviewer to signer | Fragmented tools |
| T7 | Your confidence that the final file supports the conclusion | Manual evidence review |
| T8 | Your ability to manage time pressure in the last weeks before a deadline | Deadline pressure |

## 7. Block E: perceived effort

Stem: "Thinking of a typical Test of Details, how much effort does each of these take with your current tools?" Scale: 1 Very low effort to 7 Very high effort.

| # | Item |
|---|---|
| E1 | Tracing one sampled item from the sample list to the field in the document that supports it. |
| E2 | Getting a completed workpaper ready for review. |
| E3 | Clearing one review note. |

## 8. Block F: open text

Both optional. 500 characters each. The never-include rule is shown above both fields: no client names, engagement names, amounts, document names or colleague names.

| # | Item |
|---|---|
| O1 | Describe the last time you had to redo part of a Test of Details workpaper. What caused it? |
| O2 | If one step of evidence review were done for you by software, which step would you choose? What would you want to check before you trusted the result? |

## 9. Block G: close

Thanks. A statement that responses are anonymous and reported in aggregate by role. No contact field.

## 10. Scoring

### 10.1 SUS

Standard formula.

1. Odd items (S1, S3, S5, S7, S9): contribution = response minus 1.
2. Even items (S2, S4, S6, S8, S10): contribution = 5 minus response.
3. Sum the ten contributions (range 0 to 40). Multiply by 2.5.
4. The result is a score from 0 to 100 per respondent. It is not a percentage.

Report mean, standard deviation and a 95% confidence interval, overall and per role. Report the median where a role cell has fewer than 20 responses. The commonly cited reference mean across published studies is 68. Use it as context, not as a pass mark. A response with any missing SUS item is dropped from the SUS score only.

### 10.2 Tool satisfaction

Per item: mean, median, share satisfied (6 or 7) and share dissatisfied (1 to 3), overall and by role. Not applicable is excluded from that item. A composite across T1 to T8 is reported only if Cronbach's alpha is at least 0.70 on the collected data. Otherwise items are reported singly. Items map back to the four user problems in artifact 01 to show which problem the baseline confirms.

### 10.3 Perceived effort

Per item: mean, median and share rating 6 or 7. By role.

### 10.4 Open text

Coded against the codebook in `research/codebook.md` (artifact 03) with method tag `survey`. O1 is also coded with the rework cause list so it compares with the rework audit and diary question 4. O2 is grouped to agent step types and trust conditions, as in the diary coding.

## 11. Distribution and response plan

| Item | Plan |
|---|---|
| Tool | Internal survey tool with an anonymous link. No login capture. No IP capture. |
| Frame | Auditors in the five roles who worked the most recent busy season. |
| Invitation | Stratified by role and region. Sent through practice leads with a fixed invitation text. |
| Window | 14 days, opened after busy season sign-offs so recall is fresh and time is available. |
| Reminders | Day 5 and day 10, through the same leads. |
| Target | 120 complete responses. Planned target. |
| Quotas | Planned minimum per role: Associate 35, Senior 35, Manager 25, Partner 10, Quality and Methodology reviewer 15. A role under 10 is reported as directional only. |
| Completion | A response counts as complete when blocks A, C, D and E are answered. |
| Quality checks | Flag responses under three minutes. Flag straight-lining across C and D (the same answer on all 18 items). Flagged responses are reviewed and reported separately. |
| Response rate | Invitations sent and completes received are both recorded so the rate is stated with the result. |

Invitation text:

> We are building a baseline of how well today's tools support evidence work. The survey is anonymous and takes under ten minutes. It asks nothing about clients. Please complete it within two weeks.

## 12. Reporting

One page per role plus one overall. Each page: n, SUS distribution, the eight satisfaction items, the three effort items, top coded themes from open text. Charts follow the non-color encoding rules in artifact 12. Every number carries the illustrative label in this reconstruction, because no survey was run here.

## 13. Limitations

- SUS was written for a single system. Applied to a toolset it measures the experience of the whole, not any one tool. Block B states this to the respondent.
- Self-selection. Those who respond may be those with the strongest views.
- Region bands are synthetic. They exist to show spread, not to locate anyone.
- Partner responses will be few. Treated as directional.
- One point in time. The round 3 re-run gives a second point, not a trend.
