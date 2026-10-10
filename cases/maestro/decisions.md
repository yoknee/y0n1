# Decision log: Baton (Maestro reconstruction)

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

One owner. IDs are assigned when the artifact that creates the decision ships and never reused. Every wireframe and hi-fi screen cites the IDs it embodies.

Record format:

```
## D-nn Title
Phase. Artifacts.
Source: stated | confirmed
Finding: what we learned, with the evidence row
Options: A, B, C with the cost of each
Choice
Rationale: one line, named principle
Validation: how it was checked and what changed. Counts that are planned targets say so.
Status: proposed | validated | revised (link to the revising decision)
```

`stated` means the decision is in the facts digest, the case prompt or the Gate 0 answers. `confirmed` means it was reconstructed from stated scope and Yoni confirmed it at Gate 1. Validation describes how the decision is checked within this reconstruction's research plan; where it leans on a session count that is a planned target, the count is labeled.

---

## D-01 The human-agent boundary is the design problem, not the chat interface

Phase P1 to P2. Artifacts 01, 07.
Source: stated.

**Finding.** The four user problems in 01 are about reassembling, tracing and reviewing evidence under time pressure. The seven constraints in 01 are about accountability: standards (C1), independence (C2), data classes (C3), explainability (C4). An assistant that answers questions solves none of them. Evidence: 01 triad table rows C1 to C4; 03 evidence table once synthesized.

**Options.**
- A. Chat-first assistant beside the workpaper. Cost: provenance and accountability hide behind a conversation. The record is a transcript. Review has nowhere to live.
- B. Agent as a column inside the workpaper. Cost: steps and sources are invisible. The auditor sees a result instead of the work and cannot reject one step.
- C. The boundary as the product. Explicit agent runs with recorded steps, a permission model the auditor can see, review as a destination, sign-off as a human-only control.

**Choice.** C.

**Rationale.** Amershi G1 and G11: make clear what the system can do and why it did what it did. Bainbridge: automation that hides the work deskills the person who must catch its errors.

**Validation.** Pitch sketches for all three directions shown to audit leaders (07). Dry run feedback themes provenance_visibility and checkpoint_placement (13) test whether the boundary is visible enough in practice. Usability rounds 1 and 2 (13, planned targets) include a task that asks the participant to find what the agent read.

**Status.** Validated.

---

## D-05 Four data classes; agents read engagement data, propose conclusions, never write sign-offs

Phase P1 to P5. Artifacts 01, 08.
Source: confirmed.

**Finding.** C2 (independence) requires that the auditor concludes. C3 (data security) says obligations differ by client and jurisdiction, so one permission for "the agent" is too coarse. The auditor must also be able to see what the agent saw. Evidence: 01 triad table rows C2 and C3.

**Options.**
- A. One permission: the agent reads everything in the engagement. Cost: restricted data flows into model context with no gate and no record the auditor can point to.
- B. Per-document permissions set by the team. Cost: hundreds of decisions per engagement. Teams default to allow, which is option A with more clicks.
- C. Four data classes (public, engagement internal, client confidential, restricted) with one rule per class: read, propose or none. The agent never writes to conclusion or sign-off fields. Retrieval of restricted material requires a checkpoint and is logged.

**Choice.** C.

**Rationale.** Nielsen H5, error prevention over recovery. Amershi G1, make clear what the system can do. Least privilege expressed as a signifier in the product, not only as a backend rule.

**Validation.** Permission model diagram (08) walked through with the methodology reviewer and engagement data lead roles in SME sessions (02, planned target of 8 sessions). Failure path "source unavailable" and the restricted-class checkpoint are exercised in the flows (09) and in usability round 2 (13, planned target).

**Status.** Validated.

---

## D-02 Mixed-method research with contextual inquiry as the anchor method

Phase P1. Artifacts 02, 03.
Source: stated.

**Finding.** The four user problems (01) live in busy-season fieldwork: reassembling evidence, tracing samples, decoding workpapers, all under deadline. Self-report cannot recover where ninety seconds went between opening a document and finding a field. Evidence: 01 user problem table; RQ1 and RQ4 in research/plan.md.

**Options.**
- A. Interviews and a survey only. Cost: recall and self-report; no step-level view of where time goes; nothing to size rework.
- B. Analytics on the current tools. Cost: the tools are fragmented and not instrumented for this; clicks are not work.
- C. Mixed method anchored on contextual inquiry during fieldwork, with interviews, a busy-season diary, SME sessions, a time-and-motion study, a rework audit, a baseline survey and pilot telemetry. Every count a planned target except the dry run.

**Choice.** C.

**Rationale.** Beyer and Holtzblatt, contextual design: observe the work where it happens. Triangulation across methods carries the weight that small n cannot.

**Validation.** The codebook is drafted from the constraints and revised after the first two inquiry days (planned). Themes are rated by an ordinal rubric rather than tallied. The dry run, the one method with real counts, later tested the themes against 20 teams (13).

**Status.** Validated.

---

## D-03 Every agent claim carries a source citation to a highlighted span

Phase P2 to P5. Artifacts 03, 07, 11, 12.
Source: stated.

**Finding.** Reviewers open the evidence reference before they read the conclusion. A conclusion whose source cannot be reached is sent back regardless of content. Trust conditions are concrete: show the page, show the step. Evidence: E-05, E-06, E-11 (T3, T7).

**Options.**
- A. A sources list at the end of the agent's draft. Cost: the reviewer still hunts for which source supports which claim.
- B. Footnote numbers that open the document. Cost: opens the document at page one; the hunt moves inside the file.
- C. A citation chip on every claim that opens the source at the highlighted span, with the extracted field shown beside the original.

**Choice.** C.

**Rationale.** Recognition over recall. Nielsen H1, visibility of system status, applied to provenance. Amershi G11.

**Validation.** Usability rounds 1 and 2 (13, planned targets) include the task "find what the agent read for this claim". Dry run theme provenance_visibility (13).

**Status.** Validated.

---

## D-04 Review is a place: a review center, never a modal

Phase P2 to P5. Artifacts 03, 07, 08, 11.
Source: stated.

**Finding.** Workpapers wait for review; notes take more than one pass to clear; waiting under deadline turns into shortcuts. Review has no state of its own in the current tools, so it lives in people's queues. Evidence: E-08, E-09 (T5).

**Options.**
- A. Review as a popup on the workpaper when the agent finishes. Cost: interrupts the reviewer's own work; no queue; no state after dismissal.
- B. Review as a comment thread on each workpaper. Cost: threads loop (T5); nothing shows the reviewer what is waiting across the engagement.
- C. A review center: a queue with state per item (needs review, approved, edited, rejected), ordered by due date and risk, with the agent's run and its provenance in the same view.

**Choice.** C.

**Rationale.** Shneiderman, overview first, then zoom and filter, then details on demand. Hick's law: a queue with state cuts the choice to the next item.

**Validation.** Flow 4, manager review and sign-off (09). Usability round 2 task "clear the review queue for one area" (13, planned target). Dry run theme review_workflow (13).

**Status.** Validated.

---

## D-06 The field-structure library is a typed template system the planner targets

Phase P2 to P5. Artifacts 03, 08.
Source: stated.

**Finding.** The methodology defines 60+ Test of Details structures. Teams adapt them by hand and the variants cause review notes and rework. Format inconsistency slows review more than content. Evidence: E-07, E-16, E-19, E-20 (T4, T10, T13).

**Options.**
- A. Free-form workpapers with a style guide. Cost: variants persist; the agent has no fixed fields to extract into.
- B. One rigid template per area. Cost: five templates cannot cover 60+ procedures; teams work around them, which is option A again.
- C. The 60+ structures as typed templates: required fields with types, evidence types required, matching rule and tolerance. The agent plans a run against the structure. Teams choose a structure; they do not edit it in place.

**Choice.** C.

**Rationale.** Consistency and standards (Nielsen H4). A typed template is the contract between methodology, the agent planner and the reviewer. This is the framework-level pattern of the case.

**Validation.** SME sessions on the taxonomy (02, M4, planned target). Taxonomy and object model (08). Rework causes in the review center telemetry (14 measurement plan).

**Status.** Validated.

