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
- B. Agent as a column inside the workpaper. Cost: steps and sources are invisible. The auditor sees a result, not the work, and cannot reject one step.
- C. The boundary as the product. Explicit agent runs with recorded steps, a permission model the auditor can see, review as a destination, sign-off as a human-only control.

**Choice.** C.

**Rationale.** Amershi G1 and G11: make clear what the system can do and why it did what it did. Bainbridge: automation that hides the work deskills the person who must catch its errors.

**Validation.** Pitch sketches for all three directions shown to audit leaders (07). Dry run feedback themes provenance_visibility and checkpoint_placement (13) test whether the boundary is visible enough in practice. Usability rounds 1 and 2 (13, planned targets) include a task that asks the participant to find what the agent read.

**Status.** Validated.

---

## D-05 Four data classes; agents read engagement data, propose conclusions, never write sign-offs

Phase P1 to P5. Artifacts 01, 08.
Source: confirmed.

**Finding.** C2 (independence) requires that the auditor concludes. C3 (data security) says obligations differ by client and jurisdiction, so one permission for "the agent" is too coarse, and the auditor must be able to see what the agent saw. Evidence: 01 triad table rows C2 and C3.

**Options.**
- A. One permission: the agent reads everything in the engagement. Cost: restricted data flows into model context with no gate and no record the auditor can point to.
- B. Per-document permissions set by the team. Cost: hundreds of decisions per engagement. Teams default to allow, which is option A with more clicks.
- C. Four data classes (public, engagement internal, client confidential, restricted) with one rule per class: read, propose or none. The agent never writes to conclusion or sign-off fields. Retrieval of restricted material requires a checkpoint and is logged.

**Choice.** C.

**Rationale.** Nielsen H5, error prevention over recovery. Amershi G1, make clear what the system can do. Least privilege expressed as a signifier in the product, not only as a backend rule.

**Validation.** Permission model diagram (08) walked through with the methodology reviewer and engagement data lead roles in SME sessions (02, planned target of 8 sessions). Failure path "source unavailable" and the restricted-class checkpoint are exercised in the flows (09) and in usability round 2 (13, planned target).

**Status.** Validated.
