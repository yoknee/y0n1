| | |
|---|---|
| Title | Findings: themes with evidence strength |
| Artifact | 03 Research synthesis |
| Question it answers | What did the research find and how strong is each finding? |
| Decisions it feeds | D-03, D-04, D-06 |
| Status | Draft |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

**I decided** The codebook structure, the ordinal evidence rubric instead of tallies and which themes became decisions. **We built** The coding, two coders per source, the affinity sessions and the evidence table. Theme names were argued out in the weekly coding review.

Reconstructed. Every finding here is a reconstruction of what the research found, rated by an ordinal rubric. No observation, participant or quote count appears because every n except the dry run is a planned target.

## Evidence rubric

Each theme is rated on three ordinal dimensions. No tallies appear anywhere in this synthesis.

| Dimension | Values | Meaning |
|---|---|---|
| Methods | named list | which methods surfaced the theme independently |
| Roles | named list | which roles raised it |
| Consistency | high, medium, low | high: every source that touched the topic agrees; medium: agreement with exceptions; low: contested |

A theme rated high on all three is treated as settled for design purposes. A medium theme drives a decision only with a validation step named in decisions.md.

## Themes

### T1 Locating evidence costs more than judging it

Auditors spend their effort finding and assembling evidence across systems and requests. The judgment, once the document is in front of them, is fast.

| | |
|---|---|
| Methods | M1, M3, M5 |
| Roles | Associate, Senior |
| Consistency | high |
| Lifecycle stages | Gather evidence, Test |
| Boundary questions | Q1, Q3 |
| Codes | `EV-LOCATE`, `EV-REQUEST`, `TM-INTERRUPT` |
| Label | reconstructed |

**What it means for the boundary.** Retrieval is the first candidate for the agent (Q1). What it retrieved must stay visible (Q3).

### T2 Tracing a sample to its documents is the repetitive core

Field-by-field comparison of each sampled item to its documents is the bulk of fieldwork hours. It is procedural and it is where attention fades.

| | |
|---|---|
| Methods | M1, M5, M2 |
| Roles | Associate, Senior |
| Consistency | high |
| Lifecycle stages | Test |
| Boundary questions | Q1 |
| Codes | `EV-TRACE`, `TM-PEAK` |
| Label | reconstructed |

**What it means for the boundary.** Extraction and matching are agent work. The field-structure library defines what to match (D-06).

### T3 Reviewers look for the source first, the conclusion second

Managers and partners open the evidence reference before they read the conclusion. A conclusion without a reachable source is not reviewable.

| | |
|---|---|
| Methods | M2, M6, M4 |
| Roles | Manager, Partner, Methodology |
| Consistency | high |
| Lifecycle stages | Review, Sign |
| Boundary questions | Q3 |
| Codes | `RV-FIRSTLOOK`, `WP-REFERENCE`, `ST-DOC` |
| Label | reconstructed |

**What it means for the boundary.** Every claim carries a citation that opens the source at the span (D-03).

### T4 Rework originates in references and format, not judgment

Review notes and second passes cluster on missing references, inconsistent layout and conclusion wording. Judgment calls are rarely the cause of rework.

| | |
|---|---|
| Methods | M6, M3 |
| Roles | Senior, Manager |
| Consistency | medium |
| Lifecycle stages | Conclude, Review |
| Boundary questions | Q3 |
| Codes | `WP-REFERENCE`, `WP-FORMAT`, `WP-REWORK`, `WP-CONCLUSION` |
| Label | reconstructed |

**What it means for the boundary.** An agent that drafts with references and a fixed structure removes the common causes of rework without touching judgment.

### T5 Review latency compounds under deadline and notes loop

Workpapers wait for review, then notes take more than one pass to clear. The waiting is where deadline pressure turns into shortcuts.

| | |
|---|---|
| Methods | M3, M2, M1 |
| Roles | Senior, Manager |
| Consistency | high |
| Lifecycle stages | Review |
| Boundary questions | Q2 |
| Codes | `RV-LATENCY`, `RV-NOTES`, `TM-PEAK` |
| Label | reconstructed |

**What it means for the boundary.** Review needs a place with a queue and state, not a popup on a workpaper (D-04).

### T6 Exceptions are where judgment lives and nobody hands that off

Detecting a difference is mechanical. Deciding what it means is professional judgment and every role names it as theirs.

| | |
|---|---|
| Methods | M2, M4, M1 |
| Roles | Associate, Senior, Manager, Partner, Methodology |
| Consistency | high |
| Lifecycle stages | Evaluate exceptions |
| Boundary questions | Q2 |
| Codes | `EX-RAISE`, `EX-RESOLVE`, `EX-JUDGMENT`, `AI-NEVER` |
| Label | reconstructed |

**What it means for the boundary.** The agent detects and documents exceptions. Resolution is a human checkpoint by design, not by default.

### T7 Trust requires seeing what the agent read and rejecting one step

Trust conditions are concrete: show the page, show the step, let me redo one step with the right input. A black box with a confidence number does not qualify.

| | |
|---|---|
| Methods | M2, M4 |
| Roles | Manager, Partner, Methodology |
| Consistency | high |
| Lifecycle stages | Review |
| Boundary questions | Q3, Q4 |
| Codes | `AI-TRUST`, `AI-STEP`, `RV-FIRSTLOOK` |
| Label | reconstructed |

**What it means for the boundary.** Step-level provenance and step-level rejection with rerun (D-13, D-14). Confidence shows its basis (D-08).

### T8 Accountability fear: if it is wrong, it is my name

Auditors expect to carry the consequence of an agent's error. They will route around a tool that makes that risk invisible.

| | |
|---|---|
| Methods | M2 |
| Roles | Senior, Manager, Partner |
| Consistency | high |
| Lifecycle stages | Conclude, Sign |
| Boundary questions | Q2, Q4 |
| Codes | `AI-FEAR`, `ST-INDEP`, `RV-SIGN` |
| Label | reconstructed |

**What it means for the boundary.** Sign-off stays human-only with its own affordance (D-05). Failure is visible and recoverable (D-12).

### T9 Teams want the system to enforce data limits

Rules about what may be shared with a tool are known by methodology and partially by teams. Teams would rather the product refuse than remember.

| | |
|---|---|
| Methods | M4, M2 |
| Roles | Methodology, Senior |
| Consistency | medium |
| Lifecycle stages | Gather evidence |
| Boundary questions | Q1 |
| Codes | `ST-DATA`, `EV-LOCATE` |
| Label | reconstructed |

**What it means for the boundary.** Data classes with per-class agent permission, visible in the product (D-05, D-09).

### T10 Format inconsistency slows review more than content does

Reviewers decode layout before substance. The same structure with the same fields in the same place would remove that step.

| | |
|---|---|
| Methods | M6, M2 |
| Roles | Manager, Methodology |
| Consistency | medium |
| Lifecycle stages | Review |
| Boundary questions | Q3 |
| Codes | `WP-FORMAT`, `WP-STRUCTURE`, `RV-FIRSTLOOK` |
| Label | reconstructed |

**What it means for the boundary.** Typed templates from the field-structure library fix the structure (D-06).

### T11 Handoffs between roles and days lose context

State is re-explained at every handoff: what was tested, what is open, what was asked of the client. The context lives in people, not in the file.

| | |
|---|---|
| Methods | M1, M3 |
| Roles | Associate, Senior, Manager |
| Consistency | medium |
| Lifecycle stages | Test, Review |
| Boundary questions | Q3 |
| Codes | `TM-HANDOFF`, `TM-INTERRUPT` |
| Label | reconstructed |

**What it means for the boundary.** The agent timeline and run state carry context across handoffs. The run, not the person, holds the state.

### T12 Experts want fewer clicks, not more guidance

Seniors and managers know the procedure. They want speed, keyboard operation and density. Explanatory UI slows them.

| | |
|---|---|
| Methods | M1, M2 |
| Roles | Senior, Manager |
| Consistency | medium |
| Lifecycle stages | Test, Review |
| Boundary questions | framework |
| Codes | `TM-PEAK`, `TM-INTERRUPT` |
| Label | reconstructed |

**What it means for the boundary.** Dense, keyboard-first layout (D-15). Guidance is progressive, never modal.

### T13 Standard Test of Details structures are adapted by hand

The methodology defines the structures. Teams adapt them locally. The local variants are a rework and review source. Nobody wants variation; they want the structure to fit.

| | |
|---|---|
| Methods | M4, M6 |
| Roles | Methodology, Senior |
| Consistency | medium |
| Lifecycle stages | Design procedures, Test |
| Boundary questions | Q1 |
| Codes | `WP-STRUCTURE`, `WP-REWORK` |
| Label | reconstructed |

**What it means for the boundary.** The 60+ structures become typed templates the agent plans against (D-06). Fit is a property of the library, not a local hack.

