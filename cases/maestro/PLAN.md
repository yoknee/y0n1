# Baton: Gate 1 plan

| | |
|---|---|
| Title | Gate 1 plan for the Maestro case study, reconstructed as Baton |
| Artifact | PLAN (unnumbered, precedes 01) |
| Question it answers | What will this case study contain, in what order will it be built and what does each piece have to prove? |
| Decisions it feeds | Seeds the decision log (section 9). Creates no product decisions itself. |
| Status | Approved at Gate 1. Build in progress |

> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

## 0. What this plan stands on

Memory files were unreachable in this session. The facts digest and the Gate 0 answers are the source. Where the plan goes beyond them it says so.

Facts used as stated:

- Product: Maestro, PwC's AI-native audit platform, used by PwC auditors worldwide.
- Role: AI Product Experience Lead, Apr 2024 to present. One of the first ~50 people shaping the MVP concept pitched to worldwide audit leaders. Design team of 3 at MVP, 5 to 7 after MVP, 12 today.
- Scope today: all UX on the platform. Design system, information architecture, how designers use AI, the component rules PMs and engineers follow when building in Cursor. Works with portfolio leads to translate requirements into UX.
- Agentic work: launching agentic audit workflows, translating auditor procedures into orchestrated agent runs, defining what an agent may access, where human review is required and what the system does when an agent is wrong.
- Scale: 10,000+ auditors. 60+ engineers across 6 product teams, on a platform built by 120+ engineers. 12 PMs. 12 engineering leads. 60+ Test of Details field structures.
- Dry run: 20 engagement teams, 1,600+ feedback items. The items became a stored repository the team tests against.
- Awards: Brandon Hall Group Technology Excellence Award, Best Advance in AI and Generative AI for Business Impact (Jan 2025). Enterprise Asia International Innovation Award, Service and Solution category (2025).
- The design team ships to WCAG as a team practice.

Rules from Gate 0 that bind every artifact:

- Dates: relative phases only. Two calendar anchors are allowed: Apr 2024 (start) and Jan 2025 (Brandon Hall award).
- Research volumes: only 20 teams and 1,600+ items are real. Every other count is labeled **planned target**.
- Outcomes: directional, each with its mechanism. No measured figures. The ~800 hours per week and "5X" figures never appear as measured. No count of how many of the 1,600+ feedback items changed the roadmap, in text, chart, caption or data field. The three roadmap changes in artifact 13 are required examples, not that count.
- Research findings are reconstructed. No observation, participant or quote count appears in any synthesis artifact. Evidence strength is an ordinal rubric, never a tally.
- Off the page: real people, client or engagement names, incident stories, internal team names.
- Name on the page: Yoni Gorodenzik.
- Platform areas by function only: planning and risk assessment; fieldwork and testing; platform foundation.

## 1. What the case must prove

The Bloomberg listing asks for process and systems evidence. Each requirement maps to chapters and artifacts. The same table closes README.md with links once the artifacts exist.

| Bloomberg requirement | Where the case proves it | Primary artifacts |
|---|---|---|
| People leadership through hands-on design | Team from 3 to 12 while he still owns the hardest screens. Critique rubric, review gate, pairing in code. | 15, 11, 12 |
| UCD with qualitative and quantitative research | Mixed-method plan, instruments, synthesis, three usability rounds, the 20-team dry run as a research event. | 02, 03, 13 |
| Complex workflows and decision support | Agentic Test of Details with checkpoints. Exception workbench. Review center. Failure paths. | 08, 09, 11 |
| Large dataset visualization | Seven D3 charts on seeded data, each with chart selection rationale and non-color encoding. | 12 |
| Framework-level patterns | Field-structure library as a typed template system. AI state pattern. Review checkpoint pattern. Component rules for Cursor builds. | 08, 12, 14 |
| Collaboration with PM, engineering and SMEs | Methodology SME sessions, 12 PMs, 12 engineering leads, release train across 6 teams, Gherkin acceptance criteria. | 02, 14, 15 |
| Lifecycle ownership from concept to release | Seven phases from discovery to measurement and retrospective. | 01 to 14 |
| Research findings, personas, journeys, task flows | Named artifacts with evidence links. | 03, 04, 05, 09 |
| Sketches, storyboards, step-by-step wireframes with choices linked to process decisions | Rejected directions shown. Decision trace block on every screen. | 07, 10, 11 |
| Documented collaboration with business, SMEs and engineering | Workshops, office hours, handoff spec, QA checklist. | 14, 15 |

## 2. The framing on every page

Baton is an AI-native audit workspace. Agents do the research and analysis. Auditors stay accountable for the conclusion. The design problem is the boundary between them. Four questions sit under every artifact header as a fixed strip:

1. What may the agent access?
2. Where must a human review?
3. How does the auditor see what the agent did?
4. What happens when the agent is wrong?

Every artifact names which of the four it moves forward. A reviewer can follow one question across all fifteen.

## 3. Chapter plan for README.md

README.md is the narrative. It links out to artifacts and never duplicates them. Target length 6,000 to 8,000 words plus tables. Each chapter ends with an "I decided / we built" pair so the split is visible on every page.

| # | Chapter | Question it answers | Artifacts | I / we evidence |
|---|---|---|---|---|
| 0 | Disclaimer, summary, role card | What is this and what was his part? | none | Role card: title, dates, team size over time, what he owned. Byline: Yoni Gorodenzik. Artifact headers carry no personal name |
| 1 | Context | What is the platform, who uses it, why now? | 01 | I: framing of the human-agent boundary. We: platform scope |
| 2 | Problem and constraints | What breaks for auditors today and what can the design not change? | 01 | I: the triad table. We: constraint discovery with SMEs |
| 3 | Research | How did we learn, with what rigor and what did we find? | 02, 03 | I: method mix and sampling. We: fieldwork and synthesis |
| 4 | Who we designed for | Who are the people and what do they do all day? | 04, 05, 06 | I: persona cut and anti-persona. We: journey mapping sessions |
| 5 | Principles and concept | Which directions did we try and why did the canvas win? | 07 | I: the rejected directions and the principle set. We: pitch materials |
| 6 | Architecture | How is the system organized and what may an agent touch? | 08 | I: state machine and permission model. We: taxonomy with methodology |
| 7 | Flows | What does a run look like end to end, including failure? | 09, 10 | I: checkpoint placement. We: flow walkthroughs with engineers |
| 8 | Design walkthrough | What do the screens do and why each choice? | 11, 12 | I: three-panel layout, AI state vocabulary. We: components in the design system |
| 9 | Validation | What did testing and the dry run change? | 13 | I: intake taxonomy and triage rule. We: 20-team protocol |
| 10 | Shipping at scale | How did 6 teams build to one contract? | 14 | I: component rules as the contract. We: release train |
| 11 | Leading the team | How did 3 become 12 without losing the bar? | 15 | I: org model, ladder, rituals. We: critique and office hours |
| 12 | Outcomes and retrospective | What changed and what would he do differently? | 14 | Directional outcomes with mechanisms. Awards. Three changes |
| 13 | Bloomberg mapping | Where is each listing requirement proven? | all | The table in section 1 with links |
| A | Appendix | Decision index, artifact index, data and reproducibility, how to export PDF | all | |

## 4. Phases and timeline conventions

Seven phases, relative. The case uses phase names, not months, except the two anchors.

| Phase | Name | Team size | What the case shows |
|---|---|---|---|
| P1 | Discovery | 3 | Contextual inquiry, interviews, diary study, SME sessions. Problem framing. |
| P2 | MVP concept and pitch | 3 | Three directions, rejects, principle set, pitch sketches to worldwide audit leaders. Start anchor: Apr 2024. |
| P3 | Pilot | 3 to 5 | First working slice. Usability round 1. Telemetry baseline. |
| P4 | Dry run | 5 to 7 | 20 teams. 1,600+ items. Intake taxonomy. Roadmap reset. Usability round 2. |
| P5 | Agentic workflows | 7 to 9 | Procedures become orchestrated runs with checkpoints. State machine. Permission model. |
| P6 | Scale | 9 to 12 | Design system, component rules for Cursor builds, 6 product teams, embedded designers. Usability round 3. |
| P7 | Release and measurement | 12 | Release train, measurement plan, awards (Brandon Hall anchor: Jan 2025), retrospective. |

Team sizes between the three stated points (3, 5 to 7, 12) are interpolated and will be labeled as such in artifact 15. If Yoni has the real counts per phase they replace the interpolation.

## 5. Artifact list

Each artifact ships as a folder under `cases/maestro/artifacts/NN-slug/` with an `index.html` that renders every SVG in that artifact with its header strip, plus the SVG and data files it uses. Every file carries the header: title, artifact number, the question it answers, the decisions it feeds, status and a one-line role split for that artifact ("I decided: ... We built: ..."). The header component from build item 1 renders this strip, so the split appears on every artifact index page and in every standalone SVG. Acceptance criteria below are what the hostile review checks.

### 01 Problem framing and constraints map

- Files: `01-problem-framing.svg` (constraints map), `index.html` (triad table, framing text).
- Contents: business objective (an AI-native platform that keeps auditors accountable). User problem (fragmented tools, manual evidence review, inconsistent workpapers, deadline pressure). Constraints: auditing standards and documentation requirements, independence rules, data security and access classes, explainability, 10,000+ users across countries, legacy workpaper systems, engineering capacity. Triad table: user need, business objective, technical constraint, design implication, one row per constraint.
- Feeds: D-01 (boundary as the design problem), D-05 (data classes).
- Accept when: every constraint has a design implication a reviewer could test against a later screen. No constraint is decorative.

### 02 Research plan and instruments

- Files: `research/plan.md`, `research/instruments/discussion-guide.md`, `research/instruments/diary-prompt.md`, `research/instruments/survey.md`, `research/instruments/time-and-motion-protocol.md`, `research/instruments/rework-audit-protocol.md`, `research/instruments/sme-session-guide.md`, `02-research-plan.svg` (method map: question, method, phase, n, status).
- Contents: qualitative methods (contextual inquiry for full fieldwork days, semi-structured interviews across the five roles, two-week diary study in busy season, SME sessions with methodology reviewers). Quantitative methods (time-and-motion study of evidence review, workpaper rework audit, baseline survey with SUS and tool-satisfaction items, pilot telemetry: task completion and time to conclusion). Recruiting criteria per method. Planned n per method, every one labeled **planned target** except 20 teams and 1,600+ items. Analysis method per stream (thematic coding with a codebook, descriptive statistics for timing, SUS scoring). Limitations stated.
- Feeds: D-02 (research mix), later evidence table in 03.
- Accept when: a research ops lead could run each instrument from the document alone. Every n carries its label.

### 03 Research synthesis

- Files: `03-affinity-map.svg`, `03-pain-heatmap.svg`, `research/codebook.md`, `research/findings.md` (themes with evidence strength), `research/evidence-table.md`.
- Contents: affinity map of coded observations into themes; nodes carry codes and method tags, never tallies. Codebook with code, definition, inclusion rule, example. Themes rated by evidence strength as an ordinal rubric with no counts: methods that surfaced the theme (named), roles that raised it (listed), consistency (high, medium, low). Because every research n except the dry run is a planned target, no observation, participant or quote count appears anywhere in 03. Pain-point heat map across nine lifecycle stages: plan, assess risk, design procedures, gather evidence, test, evaluate exceptions, conclude, review, sign. Heat intensity is labeled "reconstructed severity, not observed frequency". Evidence table: finding, source method, strength, decision IDs it drove (filled as decisions land). Every evidence row is tagged "reconstructed".
- Feeds: D-03 (provenance on every claim), D-04 (review as a destination), D-06 (field structures as templates).
- Accept when: every finding in later artifacts traces to a row here. Heat map uses text and pattern as well as color. No observation, participant or quote count appears in any 03 file. Every evidence row carries the reconstructed tag.

### 04 Personas

- Files: `04-personas.svg` (four cards plus anti-persona), `index.html`.
- Contents: four composites: Engagement Senior, Engagement Manager, Signing Partner, Quality and Methodology reviewer. Each: goals, core tasks, tools, environment, expertise, frustrations, accountability pressure, stance on AI (would hand off, would never hand off, what builds trust in an agent), evidence rows from 03. Anti-persona: the auditor who routes around the tool, why they do it and the design response. All marked composite. Invented names (section 8.6).
- Feeds: D-07 (role-based review views), D-08 (trust calibration signals).
- Accept when: every persona attribute points at an evidence row. No attribute is invented without a source. Every card carries the composite and reconstructed labels. No attribute carries an observation, participant or quote count.

### 05 Current-state journey and service blueprint

- Files: `05-journey-current.svg`, `05-service-blueprint.svg`, `05-journey-future.svg`.
- Contents: current-state journey across the nine stages with doing, thinking, feeling, pain, opportunity rows and an emotion curve. Service blueprint: frontstage auditor actions, backstage client requests and data pulls, support systems (methodology, workpaper repository, review tooling), with the line of visibility. Future-state journey with agents in the lane so the delta is visible per stage.
- Feeds: D-01, D-04, D-09 (where checkpoints sit in the lifecycle).
- Accept when: the delta between current and future is readable stage by stage without a legend hunt.

### 06 Jobs to be done and opportunity map

- Files: `06-jtbd.md`, `06-opportunity-tree.svg`, `06-prioritization.svg`.
- Contents: JTBD statements per role. Opportunity solution tree from outcome to opportunities to solutions to experiments. Prioritization 2x2 of user value against feasibility under the constraints from 01. Explicit MVP cut list with the reason for each cut.
- Feeds: D-10 (MVP scope), D-11 (Test of Details as the anchor workflow).
- Accept when: every cut has a reason tied to a constraint or a finding.

### 07 Sketches

- Files: `07-direction-a-chat.svg`, `07-direction-b-column.svg`, `07-direction-c-canvas.svg`, `07-pitch-sketches.svg`, `07-principles.svg`. Hand-drawn treatment (section 11).
- Contents: three concept directions. A: chat-first assistant, rejected because it hides accountability and provenance. B: agent as a column inside the workpaper, rejected because steps and sources are invisible. C: workflow canvas with explicit checkpoints, chosen. Pitch sketches used with audit leaders. Principle set: agents do the work, auditors sign it; every claim has a source; review is a place, not a popup; failure is visible and recoverable.
- Feeds: D-01, D-03, D-04, D-12 (failure visibility).
- Accept when: each reject states what it would have cost the auditor, in one line, with a named principle.

### 08 Information architecture

- Files: `08-object-model.svg`, `08-navigation.svg`, `08-taxonomy.svg`, `08-state-machine.svg`, `08-permissions.svg`, `research/card-sort-tree-test-plan.md`.
- Contents: object model (section 8). Navigation model: engagement overview, area workspace, procedure runner, evidence library, exceptions queue, review center, agent activity. Taxonomy for procedure types and the field-structure library. Agent-run state machine: queued, planning, running, needs review, approved, edited, rejected, rerun, concluded, with guards. Permission model: which data classes an agent may read, write or only propose, by role of the requesting auditor. Card sort and tree test plan with results format, labeled planned target.
- Feeds: D-05, D-06, D-09, D-13 (state machine).
- Accept when: every state has an entry guard, an exit and a visible UI signal. Every permission cell is justified by a constraint from 01.

### 09 Task flows and user flows

- Files: `09-flow-1-run-tod.svg`, `09-flow-2-review-reject-step.svg`, `09-flow-3-resolve-exception.svg`, `09-flow-4-manager-review-signoff.svg`, `09-flow-5-failure-paths.svg`.
- Contents: five flows. Run an agentic Test of Details end to end. Review an agent's work and reject one step. Resolve an exception. Manager review and sign-off. Failure paths: source unavailable, low confidence, conflicting evidence, agent timeout. Each flow shows happy path, error paths and edge cases with decision points labeled and the state machine state at each node.
- Feeds: D-09, D-12, D-13, D-14 (rerun semantics).
- Accept when: every decision point names the actor and the information they need to decide. Every failure path ends in a recoverable state.

### 10 Storyboards

- Files: `10-storyboard-senior-runs-tod.svg` (8 frames), `10-storyboard-agent-is-wrong.svg` (6 frames). Hand-drawn treatment.
- Contents: captions in three lines per frame: what the user sees, what the system does, what the design protects.
- Feeds: D-04, D-12.
- Accept when: a reader who knows nothing about auditing follows both stories without the README.

### 11 Wireframes

- Files: one HTML page per flow with step-by-step screens as inline SVG at 1440x900, grayscale: `11-flow-1/`, `11-flow-2/`, `11-flow-3/`, `11-flow-4/`, `11-flow-5/`. Minimum screens: engagement overview; procedure runner with agent plan; agent activity panel with provenance; review checkpoint; exception workbench; evidence viewer with source highlight; manager review center; sign-off.
- Contents: lo-fi first pass and mid-fi second pass per screen where the change matters. Each screen carries a decision trace block: finding, options, choice, rationale with named principle, decision ID.
- Feeds: D-07, D-09, D-12, D-13, D-15 (three-panel layout), D-16 (citation chip).
- Accept when: no screen lacks a trace block. No trace block cites a decision that is missing from decisions.md.

### 12 Hi-fi design and data visualization

- Files: `12-screens/` (HTML, light and dark, Baton tokens), `12-patterns/` (component pattern pages), `12-charts/` (one HTML per chart, D3, reads `data/out/`), `12-shortcut-map.md`.
- Contents: dense three-panel layout (procedures, workspace, agent and provenance). Sticky-header data grids. Published shortcut map. Light and dark themes. WCAG 2.2 AA checked and the check recorded. Patterns as reusable components: AI state pattern (thinking, streaming, needs review, failed, approved), review checkpoint pattern, evidence citation chip that opens the source at the highlighted span, agent timeline, diff view for edited conclusions. Seven charts, each with the question it answers, the reader, the chart chosen, rejected alternatives, encoding rules, non-color accessibility:
  - a. Population coverage per audit area as small multiples: population, tested, exceptions.
  - b. Exception funnel across the engagement timeline.
  - c. Agent run outcomes by release: approved, edited, rejected.
  - d. Review latency distribution: agent draft to manager approval.
  - e. Evidence lineage graph for one conclusion.
  - f. Risk heat map: audit area by assertion, risk and coverage, with text and pattern.
  - g. Dry run feedback: theme by severity heat map, Pareto of themes, before and after roadmap shown as rank movement of the 24 roadmap items marked by driving theme. The roadmap panel carries no item counts. Its caption states that no count of items is attributed to any roadmap change and that the distribution is synthetic over the stated 1,600+ total.
- Feeds: D-08, D-15, D-16, D-17 (AI state vocabulary), D-18 (chart encoding rules).
- Accept when: contrast and focus order pass on every screen in both themes. Every chart reads without color. Every chart cites its data file and the generator seed.

### 13 Usability testing and the dry run

- Files: `13-test-plan.md`, `13-findings.md`, `13-before-after/` (paired wireframes), `13-dry-run-protocol.md`, `13-dry-run-taxonomy.md`, `13-dry-run-sample.csv` (50 synthetic items), `13-triage-2x2.svg`, `13-roadmap-changes.md`.
- Contents: three rounds. Round 1 pilot moderated think-aloud. Round 2 post-dry-run task-based sessions with metrics. Round 3 pre-release unmoderated with SUS. Scenarios, task scripts, success criteria. Metrics: task success, time on task, error count, SUS, trust calibration (user confidence against agent correctness). Findings table with severity on the shared 1 to 4 scale with anchors (4 blocks the task, 3 forces a workaround, 2 slows the task, 1 cosmetic), the same scale the dry run uses. Iterations shown as before and after wireframes. Session counts are planned targets. Results are illustrative and labeled.
- Dry run section. `13-dry-run-protocol.md` has fixed sections: participants (20 teams, real; composition by area, engagement size and region reconstructed and labeled); schedule and duration in relative terms, labeled reconstructed; activities (live engagement work on the pilot slice or scripted scenarios, stated either way); intake channels (in-product form, team debriefs, office hours) with the intake form mapped field by field to the six-field taxonomy (theme, area, role, type, severity, frequency); severity anchors for the 1 to 4 scale; dedup rule (when an item takes status `duplicate`; frequency as teams per theme, matching section 8.2); triage cadence and roles; analysis (coding to the 14 themes in 8.4, a double-coded sample with its agreement figure labeled illustrative); limitations (voluntary reporting, team self-selection, recency bias). Instrumentation means the telemetry events captured during the dry run: the pilot event set from 02 plus agent-run state transitions, specified in the same file. Then `13-dry-run-taxonomy.md`; the triage 2x2 with severity on one axis and frequency on the other and a stated action per quadrant (fix now, schedule, bundle, decline with reason); the 50-item synthetic sample in repository format; three roadmap changes with the evidence that forced them, cited as theme rows and severity, never as item counts; how the repository runs as a regression test bench today.
- Feeds: D-19 (intake taxonomy), D-20 (repository as test bench), revisions to D-13 and D-16.
- Accept when: every reported metric is labeled illustrative or planned target. The three roadmap changes cite theme rows and severity from the taxonomy and state no count of items; `13-roadmap-changes.md` carries the sentence "the number of items that drove each change is not stated". A research ops lead could rerun the intake from `13-dry-run-protocol.md` alone. Every reconstructed element of the protocol carries its label.

### 14 Engineering handoff, release, measurement, retrospective

- Files: `14-spec-format.md`, `14-acceptance-criteria.feature` (Gherkin), `14-component-rules.md`, `14-design-qa-checklist.md`, `14-release-train.svg`, `14-release-notes.md`, `14-measurement-plan.md`, `14-outcomes.md`, `14-retrospective.md`.
- Contents: spec format. Gherkin acceptance criteria for the five flows. Component rules PMs and engineers build against in Cursor: allowed components, required states, spacing and type scale, data-grid rules, AI state vocabulary, accessibility acceptance. Design QA checklist. Release train across 6 teams. Release notes. Measurement plan: adoption, time to conclusion, review time, exception resolution time, agent approval rate, SUS trend. Outcomes under the honesty rule: directional, each with its mechanism. The two awards. Retrospective with three things he would do differently.
- Feeds: D-21 (component rules as the contract), D-22 (measurement plan).
- Accept when: no outcome carries a number he did not state. Every Gherkin scenario maps to a flow node in 09.

### 15 Leadership and collaboration

- Files: `15-org-model.svg`, `15-rituals.md`, `15-growth-ladder.md`, `15-development-plan-sample.md`, `15-designers-and-ai.md`, `15-operating-cadence.svg`, `15-sme-workshops.md`, `15-i-decided-we-built.md`.
- Contents: org model from 3 to 12: designer embedded per product team plus a platform and design-system pod. Hiring profile. Rituals: weekly critique with a rubric, fortnightly design review gate with PM and engineering lead, methodology SME office hours, pairing with engineers in code. Growth ladder. Sample development plan for a mid-level designer with an invented name. How designers use AI: research synthesis, prototyping in code, the rules they follow. Operating cadence with 12 PMs and 12 engineering leads. SME workshops: how run, what they produced. Influence without authority: the design system as the contract. An explicit "I decided" against "we built" ledger.
- Feeds: D-23 (embedded model), D-24 (critique rubric), D-25 (AI use rules for designers).
- Accept when: the ledger has at least one "I decided" and one "we built" row per phase.

## 6. Also produced

| Item | Location | Contents |
|---|---|---|
| Decision log | `cases/maestro/decisions.md` | D-01 onward. Format in section 9. One owner. |
| Research folder | `cases/maestro/research/` | Plan, instruments, codebook, findings, evidence table, card sort plan. |
| Data | `cases/maestro/data/` | Generator, schema doc, committed outputs under `data/out/`, manifest with seed and checksums. |
| Prototype | `cases/maestro/prototype/` | Flows 1, 2 and 5. Keyboard only. Reads `data/out/`. Light and dark. The shell carries the disclaimer and the one-line role split. |
| Talk track | `cases/maestro/talk-track.md` | 20 minutes: 2 context, 3 problem and research, 4 decisions, 6 design walkthrough, 3 validation and outcomes, 2 leadership and what I would change. Slide list. Byline: Yoni Gorodenzik. |
| One-pager | `cases/maestro/one-pager.md` | Role, scope, problem, three decisions, outcome, what it proves. Byline: Yoni Gorodenzik. |
| Shared brand | `shared/brand/baton/` | Tokens as CSS custom properties and JSON. Mark as SVG. |
| Shared design system | `shared/design-system/` | Base tokens, components, states, usage rules shared by both cases. Baton extends it. |
| Templates | `shared/templates/` | Persona, journey, test plan, decision record. Written while building 04, 05, 13 and decisions.md. |
| Scripts | `scripts/` | `export-pdf.mjs` (Playwright print of README, one-pager, talk track and every artifact index), `screenshot.mjs` (render check), `lint.sh` (exists). |
| Changelog | `CHANGELOG.md` at repo root | One entry per commit that changes a case. |

## 7. Stand-in brand sheet: Baton

The brand exists so that no screen resembles the production product or the firm's identity. It is utilitarian by design.

### 7.1 Name and mark

- Name: Baton. The auditor holds the baton. Agents play their parts. The handoff is the product.
- Mark: a short diagonal bar from lower left to upper right with a filled circle at the upper end. Monochrome. Works at 16 px. SVG only. Never a gradient.
- Wordmark: "Baton" in the UI sans at 600 weight. No tagline on screens.

### 7.2 Palette

Light theme values first, dark theme values second. Contrast ratios are against the theme surface. All text pairs meet WCAG 2.2 AA (4.5:1 body, 3:1 large text and UI components). Ratios below are measured by `shared/brand/baton/contrast-check.mjs`, which also checks each semantic color on its tint and on `--bt-surface-2`. Tints (`--bt-*-tint`) sit behind ink text in badges and chips.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--bt-surface` | Page background | `#FFFFFF` | `#0F1319` |
| `--bt-surface-2` | Panels, table header | `#F3F5F8` | `#171C24` |
| `--bt-surface-3` | Hover, selected row | `#E8EBF0` | `#1F2630` |
| `--bt-border` | Hairlines | `#CFD5DD` | `#2C343F` |
| `--bt-ink` | Body text | `#14181F` (17.8:1) | `#E6EAF0` (15.4:1) |
| `--bt-ink-2` | Secondary text | `#4A5361` (7.8:1) | `#A5AEBB` (8.3:1) |
| `--bt-ink-3` | Disabled, placeholders | `#687180` (4.9:1) | `#7E8794` (5.1:1) |
| `--bt-brand` | Links, primary action, focus ring | `#3B4FD8` (6.4:1) | `#8FA0FF` (7.7:1) |
| `--bt-agent` | Anything the agent produced | `#0E7C7B` (5.0:1) | `#5FD3CF` (10.4:1) |
| `--bt-review` | Needs review | `#8E5F00` (5.6:1) | `#E8B84A` (10.1:1) |
| `--bt-approved` | Approved, concluded | `#1F7A3D` (5.4:1) | `#6CCB8A` (9.4:1) |
| `--bt-edited` | Edited by a human | `#6941C6` (6.6:1) | `#B69CFF` (8.2:1) |
| `--bt-failed` | Rejected, failed, source unavailable | `#B42318` (6.6:1) | `#FF8A80` (8.2:1) |

Rules:

- Color never carries state alone. Every state has a glyph and a text label. Charts add pattern fills and direct labels.
- `--bt-agent` is reserved. Human-authored content never uses it. This is the provenance signal.
- No oranges, no reds outside `--bt-failed`, no gradients, no brand photography. The firm's palette hex values live in the gitignored banned list and lint catches them.
- Focus ring: 2 px `--bt-brand` outer, 2 px surface inner, on every focusable element, both themes.

### 7.3 Type

- UI and narrative: IBM Plex Sans (open license, tabular figures available). Fallback: system sans.
- Data and identifiers: IBM Plex Mono. Used for IDs, amounts in grids, shortcut keys, agent step logs.
- Scale, px: 11 (dense table meta), 12 (table body, labels), 13 (default UI), 14 (body in narrative panels), 16 (section titles), 20 (page title), 28 (artifact title). Line height 1.35 in grids, 1.5 in prose.
- Numerals: tabular everywhere a column aligns. Negative amounts in parentheses, never red alone.

### 7.4 Spacing, density and motion

- 4 px base. Row height 28 px in dense grids, 36 px in forms. Panel gutters 12 px.
- Icons: 16 px, 1.5 px stroke, single color, from one in-house set drawn as SVG. No emoji.
- Motion: 120 ms for state changes, none for layout. `prefers-reduced-motion` removes all of it. Streaming agent output shows a static "streaming" glyph when motion is reduced.

### 7.5 What Baton must not resemble

- No firm colors, type or layout grid. No Georgia or Helvetica Neue.
- No product chrome from the production platform. No screenshots, traced or otherwise.
- Any likeness found in review is a defect and gets fixed before the gate.

## 8. Synthetic domain and data schema

One domain model, used by every artifact, screen, chart and the prototype. All data is generated by `cases/maestro/data/generate.mjs` from a seed. Outputs are committed under `data/out/` so the static site needs no build step.

### 8.1 Generator design

- Node 22, no dependencies. Seeded PRNG (mulberry32 over a string hash of the seed). Default seed `baton-01`. Same seed, same bytes. The manifest records seed, counts and a sha256 per file.
- Outputs JSON (one array per entity) plus CSV for tabular entities plus pre-aggregated JSON per chart (`out/charts/12a.json` and so on) so each page loads only what it draws.
- Entity names are built from invented syllable lists, not dictionary proper nouns, plus a generic suffix (example pattern: "Kestrom Vaile Group"). User display names come from a short invented list reviewed by hand. Generated outputs are committed, so `scripts/lint.sh` runs the banned-term check over every name; the full name list is also reviewed by hand at Gate 2. Identifiers carry a type prefix. Dates are day indices from a synthetic engagement start. Screens render them against a synthetic calendar epoch stated in `data/README.md`.
- Volumes are chosen to make charts legible, not to mirror the production system.
- No synthetic count may coincide with or approximate a real figure unless it equals the stated figure exactly and is labeled with both the synthetic n and the stated real figure wherever it renders.

### 8.2 Entities

| Entity | Key | Fields | Volume (seed `baton-01`) |
|---|---|---|---|
| `engagement` | `ENG-nnnn` | name, industry (from list of 8), fiscal_year_end_day, overall_risk (low, moderate, high), team (user ids by role), area_ids | 8 |
| `audit_area` | `ARE-nnnn` | engagement_id, name (revenue, inventory, cash, fixed_assets, payables), population_count, population_amount, assertion_risk map over existence, completeness, accuracy, cutoff, valuation, rights_and_obligations, presentation (each low, moderate, high) | 40 |
| `field_structure` | `FS-nnn` | name, applicable_areas, target_assertions, required_fields (name, type: amount, date, text, reference, boolean), evidence_types_required, matching_rule (exact, tolerance, range, presence), tolerance, version | 64 |
| `procedure` | `PRC-nnnn` | area_id, type (risk_assessment, test_of_details, analytical, controls), field_structure_id (test_of_details only), target_assertions (every type, so 12f coverage counts all procedures), planned_sample_size, owner_role, reviewer_role, status (planned, in_progress, needs_review, concluded, signed), start_day, due_day | ~160 |
| `sample_item` | `SMP-nnnnn` | procedure_id, population_ref, amount, selection_method (random, monetary_unit, judgmental, agent_proposed), evidence_ids, match_status (matched, exception, unresolved), tested_day | ~3,400 |
| `evidence_item` | `EVD-nnnnn` | engagement_id, area_id, type (invoice, contract, bank_statement, confirmation, system_report, shipping_document, receiving_report, approval_memo), source_system (client_erp, bank_portal, confirmation_service, document_request, prior_year_file), data_class (public, engagement_internal, client_confidential, restricted), received_day, page_count, extracted_fields, quality (clean, partial, illegible), highlight_spans | ~5,000 |
| `exception` | `EXC-nnnn` | procedure_id, sample_item_id, type (amount_mismatch, cutoff, missing_evidence, unauthorized, duplicate, conflicting_evidence), amount_difference, severity (low, moderate, high), detected_by (agent, auditor), status (open, investigating, explained, misstatement, waived), opened_day, resolved_day, resolver_role | ~200 |
| `exception_status_change` | `exception_id` + `day` | status, actor_role. One row per transition, so 12b can date every funnel stage | ~600 |
| `agent_run` | `RUN-nnnn` | procedure_id, release_id, started_day, state (queued, planning, running, needs_review, approved, edited, rejected, rerun, concluded), confidence (0 to 1), checkpoints_required (list of step types), outcome (approved, edited, rejected, none), failure_type (none, source_unavailable, low_confidence, conflicting_evidence, timeout), rerun_of, human_review_minutes | ~600 |
| `agent_run_step` | `run_id` + `index` | type (plan, evidence_retrieval, extraction, matching, exception_detection, draft_conclusion), started_minute, duration_minutes, input_refs, source_evidence_ids, output_summary, confidence, status (done, needs_review, rejected, skipped, failed), rejected_reason | ~3,600 |
| `review_action` | `RVA-nnnnn` | run_id, step_index (nullable), actor_role, action (approve, edit, reject_step, request_rerun, comment, sign), day, minutes_since_draft, edit_diff_size | ~1,500 |
| `conclusion` | `CON-nnnn` | procedure_id, run_id (nullable), drafted_by (agent, auditor), template_id, cited_evidence_ids, exception_ids, version, status (draft, reviewed, final) | ~160 |
| `sign_off` | `SGN-nnnn` | procedure_id, role (senior, manager, partner), day, status (pending, signed, reopened) | ~400 |
| `user` | `USR-nnn` | role (associate, senior, manager, partner, methodology_reviewer, data_lead), display_name (invented, from the persona set and a small invented list), region (synthetic: North, South, East, West, Central) | 36 |
| `release` | `R0` to `R4` | name (pilot, dry run, agentic 1, agentic 2, scale), start_day, end_day, teams | 5 |
| `dry_run_feedback_item` | `FB-nnnn` | team_id (`T01` to `T20`), role, area (planning_and_risk, fieldwork_and_testing, platform_foundation), theme (14 themes, section 8.4), type (defect, usability, missing_capability, methodology_question, performance, trust_and_explainability, data_access, training), severity (1 to 4), frequency (teams reporting the same theme), status (triaged, fixed, declined, duplicate), submitted_day, text (templated) | 1,600 |
| `roadmap_item` | `RM-nnn` | title, before_rank, after_rank, driving_theme (label only, no relation to feedback items), phase_before, phase_after | 24 |

The generator emits exactly 1,600 feedback items, the floor of the stated 1,600+. The manifest, every 12g caption and the header of `13-dry-run-sample.csv` carry the label "synthetic distribution over the stated 1,600+ total; theme, severity and status shares are illustrative". No other feedback total appears anywhere in the case. No count of feedback items that reached or changed the roadmap is derived, written to any `charts/*.json`, rendered on any screen or stated in any narrative: `roadmap_item` carries no item count, there is no status that marks an item as in the roadmap and the 12g roadmap panel shows rank movement and driving theme only.

### 8.3 Relationships

`engagement` 1..n `audit_area` 1..n `procedure` 1..n `sample_item` n..n `evidence_item`. `procedure` 0..n `agent_run` 1..n `agent_run_step`. `agent_run` 0..n `review_action`. `sample_item` 0..n `exception`. `procedure` 0..1 `conclusion` 0..n `sign_off`. `agent_run` n..1 `release`. `exception` 1..n `exception_status_change`. `roadmap_item` carries `driving_theme` as a label only. There is no relation from feedback items to roadmap items.

### 8.4 Dry run theme taxonomy (14)

provenance_visibility, checkpoint_placement, exception_handling, evidence_viewer, sample_selection, field_structure_fit, performance, data_access_and_permissions, terminology, navigation_and_findability, keyboard_and_accessibility, training_and_onboarding, review_workflow, integration_with_workpapers.

### 8.5 Chart data mapping

| Chart | Source entities | Aggregate file |
|---|---|---|
| 12a Population coverage | audit_area, sample_item, exception | `charts/12a-coverage.json` |
| 12b Exception funnel | exception_status_change by status and day | `charts/12b-funnel.json` |
| 12c Run outcomes by release | agent_run by release_id and outcome | `charts/12c-outcomes.json` |
| 12d Review latency | review_action where action is approve and actor_role is manager, minutes_since_draft | `charts/12d-latency.json` |
| 12e Evidence lineage | one conclusion, its run, steps, evidence, sources | `charts/12e-lineage.json` |
| 12f Risk heat map | audit_area assertion_risk; coverage per assertion from sample_item through procedure.target_assertions | `charts/12f-risk.json` |
| 12g Dry run feedback | dry_run_feedback_item by theme and severity; roadmap_item rank before and after, no item counts | `charts/12g-feedback.json` |

Each derivation is documented in `data/README.md` and repeated on the chart page.

### 8.6 Invented names

Personas and the development plan use invented names checked against the banned list: Engagement Senior "Dana Whitlock", Engagement Manager "Rafael Osei", Signing Partner "Ingrid Haller", Quality and Methodology reviewer "Tomasz Brenner", anti-persona "Caleb Marsh", mid-level designer in the development plan "Noor Haddad". Yoni can replace any of them at Gate 1.

## 9. Decision log plan

`decisions.md` has one owner. Each record:

```
## D-nn Title
Phase: Pn. Artifacts: ...
Source: stated | confirmed
Finding: what we learned (evidence table row)
Options: A, B, C with the cost of each
Choice: ...
Rationale: one line, named principle
Validation: how we checked, what changed
Status: proposed, validated, revised (link to the revising decision)
```

`stated` means the decision is in the facts digest, the case prompt or the Gate 0 answers. `confirmed` means it was reconstructed from stated scope and Yoni confirmed it at Gate 1 (D-05, D-07, D-08, D-09, D-10, D-14, all confirmed). No decision ships with any other value, so the disclaimer sentence "decisions are real" holds.

Provisional register. IDs are assigned when the artifact that creates the decision ships. The list fixes the order so cross-references in the plan hold. The six rows that went beyond the digest and the case prompt were confirmed by Yoni at Gate 1. Any decision struck later is reworded to stated scope or dropped and is never presented as his.

| ID | Decision | Created in | Source |
|---|---|---|---|
| D-01 | The human-agent boundary is the design problem, not the chat interface | 01, 07 | stated |
| D-02 | Mixed-method research with contextual inquiry as the anchor method | 02 | stated |
| D-03 | Every agent claim carries a source citation to a highlighted span | 03, 07, 11 | stated |
| D-04 | Review is a place: a review center, never a modal | 03, 07, 08 | stated |
| D-05 | Four data classes; agents read engagement data, propose conclusions, never write sign-offs | 01, 08 | confirmed at Gate 1 |
| D-06 | The field-structure library is a typed template system the planner targets | 03, 08 | stated |
| D-07 | Role-based views of the same run: senior, manager, partner, methodology | 04, 11 | confirmed at Gate 1 |
| D-08 | Confidence shown as a band with its basis, not a percentage alone | 04, 12 | confirmed at Gate 1 |
| D-09 | Checkpoints are mandatory before draft conclusion and before any restricted-class retrieval | 05, 08, 09 | confirmed at Gate 1 |
| D-10 | MVP scope: Test of Details for two areas, no analytical procedures | 06 | confirmed at Gate 1 |
| D-11 | Test of Details is the anchor workflow | 06 | stated |
| D-12 | Failure is a first-class state with a visible cause and a recovery action | 07, 09 | stated |
| D-13 | Agent-run state machine with nine states and explicit guards | 08, 09 | stated |
| D-14 | Rerun preserves the rejected step and its reason as history | 09 | confirmed at Gate 1 |
| D-15 | Three-panel layout: procedures, workspace, agent and provenance | 11, 12 | stated |
| D-16 | Evidence citation chip opens the source at the span | 11, 12 | stated |
| D-17 | AI state vocabulary of five states, shared by design and code | 12, 14 | stated |
| D-18 | Chart encoding rules: pattern and text with color, direct labels, small multiples over stacked bars | 12 | stated |
| D-19 | Dry run intake taxonomy with six fields | 13 | stated |
| D-20 | The feedback repository runs as a regression test bench | 13 | stated |
| D-21 | Component rules doc is the contract PMs and engineers build against in Cursor | 14 | stated |
| D-22 | Measurement plan with six metrics, none reported as measured in the case | 14 | stated |
| D-23 | Designer embedded per product team plus a platform and design-system pod | 15 | stated |
| D-24 | Weekly critique scored against a published rubric | 15 | stated |
| D-25 | Rules for how designers use AI | 15 | stated |

## 10. Research plan summary

Full plan and instruments arrive in artifact 02. This table fixes the labels.

| Method | Phase | Planned n | Label |
|---|---|---|---|
| Contextual inquiry, full fieldwork days | P1 | 6 teams, 2 days each | planned target |
| Semi-structured interviews | P1 | 20, four per role across five roles: Associate, Senior, Manager, Partner, Quality and Methodology reviewer | planned target |
| Diary study, two weeks in busy season | P1 | 10 participants | planned target |
| SME sessions with methodology reviewers | P1 to P5 | 8 sessions | planned target |
| Time-and-motion study of evidence review | P1 | 12 sessions | planned target |
| Workpaper rework audit | P1 | 40 workpapers | planned target |
| Baseline survey, SUS and tool satisfaction | P1 | 120 respondents | planned target |
| Pilot telemetry | P3 | 40 pilot users | planned target |
| Usability round 1, moderated think-aloud | P3 | 8 sessions | planned target |
| Dry run | P4 | 20 teams | **real** |
| Dry run feedback items | P4 | 1,600+ | **real** |
| Usability round 2, task-based with metrics | P4 | 12 sessions | planned target |
| Card sort and tree test | P5 | 30 participants | planned target |
| Usability round 3, unmoderated with SUS | P6 | 40 participants | planned target |

If Yoni confirms any real number it replaces the planned target and loses the label.

Role coverage: the six roles in the domain model are Associate, Senior, Manager, Partner, Quality and Methodology reviewer and Engagement data lead. Interviews cover the first five. The data lead is reached through contextual inquiry and the SME sessions, not interviews, because the role touches the product at data setup rather than during fieldwork. Personas are the four roles the case prompt names; the Associate appears in contextual inquiry and in the anti-persona. One severity scale (1 to 4, anchored in artifact 13) serves usability findings and the dry run.

## 11. Technical approach

- Static HTML, CSS and vanilla JS. No framework, no bundler. Each artifact folder is self-contained and opens from `file://` or `python3 -m http.server`.
- Diagrams are SVG, hand-authored or generated by small Node scripts under `scripts/` so they can be regenerated when data changes.
- Charts use D3 v7. Sketches use rough.js. Both vendored under `shared/vendor/` with pinned versions and license files, so the site works offline and the PDF export does not depend on a CDN. This is a deviation from "dependency-free" that the case prompt calls for. Needs approval.
- Fonts: IBM Plex Sans and Plex Mono as vendored woff2 subsets (Latin, tabular figures) with the OFL license under `shared/vendor/fonts/`, so the PDF export keeps the typeface and tabular numerals offline.
- Dev tooling, used by `scripts/` only and never by the site: a `package.json` with pinned `playwright` for screenshots and PDF and a pinned Markdown renderer (`marked`) that turns README.md, one-pager.md and talk-track.md into HTML for print. Chromium is already installed in this environment.
- Hand-drawn treatment: rough.js for shapes, with a fallback SVG filter (`feTurbulence` plus `feDisplacementMap`) for any diagram that must stay library-free.
- Rendering checks: `scripts/screenshot.mjs` renders every `index.html` with Playwright at 1440x900 in light and dark and writes PNGs to a gitignored folder. Every PNG is opened before an artifact is called done.
- PDF export: `scripts/export-pdf.mjs` prints README.md (rendered through a small HTML wrapper) and every artifact index with print styles. One PDF per case plus one per artifact.
- Accessibility checks: a contrast script over the token pairs. Manual keyboard pass on the prototype recorded as a checklist in artifact 12.
- Lint: `scripts/lint.sh` before every commit. The gitignored banned list is local; Yoni mirrors the three removals from Gate 0.

## 12. Build order and time estimates

Estimates are build hours in this environment, including the render check and the hostile review for the gate. They are estimates. Each artifact is one or more commits named `case(maestro): artifact NN <name>`.

| Order | Item | Depends on | Hours | Gate |
|---|---|---|---|---|
| 1 | Shared brand tokens, mark, contrast script, artifact header component with role split, page shell, `screenshot.mjs` | PLAN | 4 | 2 |
| 2 | Shared design system base: tokens, components, states, usage rules | 1 | 4 | 2 |
| 3 | Data generator, schema doc, committed outputs, manifest | PLAN | 5 | 2 |
| 4 | 01 Problem framing | 1 | 2 | 2 |
| 5 | 02 Research plan and instruments | 1 | 4 | 2 |
| 6 | 03 Research synthesis | 3, 5 | 4 | 2 |
| | Hostile review after 03 | | 1.5 | 2 |
| 7 | 04 Personas | 6 | 2.5 | 2 |
| 8 | 05 Journey and blueprint | 6 | 3.5 | 2 |
| 9 | 06 JTBD and opportunity map | 6, 4 | 2.5 | 2 |
| | Gate 2 review: lint, hostile pass, fixes, tag, PR update | | 2 | 2 |
| 10 | 07 Sketches | 9, vendored rough.js | 3.5 | 3 |
| 11 | 08 Information architecture | 3, 10 | 4 | 3 |
| 12 | 09 Flows | 11 | 3.5 | 3 |
| | Hostile review after 09 | | 1.5 | 3 |
| 13 | 10 Storyboards | 12 | 2.5 | 3 |
| 14 | 11 Wireframes, five flows, trace blocks | 12, decisions.md | 7 | 3 |
| 15 | 12 Hi-fi screens and patterns | 14, 2 | 7 | 3 |
| 16 | 12 Charts a to g | 3, vendored D3 | 6 | 3 |
| | Gate 3 review | | 3 | 3 |
| 17 | 13 Usability testing and dry run | 14, 3 | 5 | 4 |
| 18 | 14 Handoff, release, measurement, retrospective | 15, 16 | 4 | 4 |
| 19 | 15 Leadership and collaboration | all | 3.5 | 4 |
| 20 | Prototype, flows 1, 2 and 5, keyboard only | 15, 3 | 6 | 4 |
| 21 | README.md chapters, Bloomberg table | all | 4 | 4 |
| 22 | talk-track.md, one-pager.md | 21 | 1.5 | 4 |
| 23 | PDF export, screenshot pass, QA checklist | all | 3 | 4 |
| | Gate 4 review | | 3 | 4 |
| | **Total** | | **103** | |

Per gate, summed from the table: Gate 2 is 35 hours, Gate 3 is 38, Gate 4 is 30. The hostile review after every three artifacts has its own line where it does not coincide with a gate (after 03 and after 09); the reviews after 06, 12 and 15 are the gate reviews. The two largest risks to the estimate are the wireframes (eight minimum screens across five flows, each with a trace block) and the charts (seven, each with rationale and accessibility checks).

## 13. Hostile-reviewer protocol

After every three artifacts and before every gate, the work is reviewed as a Bloomberg hiring panel would review it. Four lenses, run as independent reviewers:

1. Methodology: would the research survive a question on sampling, instruments, analysis and limitations?
2. Rationale and alternatives: does every decision show options considered and a named principle, and would a senior designer accept the trade-off?
3. Honesty and confidentiality: any number without a source or label, any name, screen or figure that could be real, any banned term that slipped the lint?
4. Craft and voice: WCAG, density, keyboard operability, I/we split on every page, em dashes, Oxford commas, buzzwords, artifact headers. The three words removed from the banned list at Gate 0 (understand, execute, inquiry) appear only as lowercase common nouns or verbs, never as a capitalized area, team or release label.

Each finding gets a severity. Blockers are fixed before the gate. The pass and its fixes are recorded in CHANGELOG.md.

## 14. QA checklist (runs after Gate 4, posted to the PR)

- [ ] `scripts/lint.sh` passes on the final commit.
- [ ] Disclaimer visible on README.md, every artifact index, the prototype and the one-pager.
- [ ] No real screen, real data, client name, colleague name or firm visual identity anywhere. Baton brand on every screen.
- [ ] Every number is either stated by Yoni or labeled planned target, modeled or illustrative. ~800 hours per week and "5X" absent as measured.
- [ ] No artifact states or implies how many of the 1,600+ items changed the roadmap, in text, chart, caption or data field.
- [ ] The dry run feedback total appears only as 1,600+ in narrative or as 1,600 with the synthetic label in data, charts and the sample. No other specific total appears anywhere in the case.
- [ ] No observation, participant or quote count appears in 03 or 04. Every evidence row and persona card carries the reconstructed label.
- [ ] Every artifact file carries the header: title, number, question, decisions fed, status, role split.
- [ ] The words understand, execute and inquiry appear only as lowercase common nouns or verbs, never as capitalized labels.
- [ ] Every wireframe and hi-fi screen cites decision IDs that exist in decisions.md.
- [ ] decisions.md: every record has finding, options, choice, rationale with named principle, validation, status.
- [ ] Evidence table in 03 links every finding to a method and to the decisions it drove.
- [ ] WCAG 2.2 AA: contrast script passes both themes; focus order and keyboard pass recorded for the prototype and hi-fi screens; target size 24 px minimum; reduced motion honored; every chart readable without color.
- [ ] Prototype flows 1, 2 and 5 operable by keyboard alone, with a published shortcut map.
- [ ] Every rendered page screenshotted in light and dark at 1440x900 and opened.
- [ ] PDF export runs and produces README, one-pager, talk track and one PDF per artifact.
- [ ] Data: generator runs from the documented seed and reproduces the committed manifest checksums.
- [ ] Voice: no em dashes, no Oxford commas, no buzzwords. I/we pair at the end of every chapter, in the header of every artifact file, on the prototype shell and in the artifact 15 ledger.
- [ ] Bloomberg mapping table present at the end of README.md with links.
- [ ] Artifact numbering 01 to 15 matches CLAUDE.md.
- [ ] CHANGELOG.md has an entry per commit on this branch.
- [ ] Talk track totals 20 minutes with the fixed timings and a slide list. One-pager has all six sections.

## 15. Gate 1 resolutions

Approved by Yoni. The open points closed as follows.

1. Dev tooling: approved. D3 v7.9.0, rough.js 4.6.6 and IBM Plex Sans and Mono (Latin1 woff2 subsets) are vendored under `shared/vendor/` with their licenses. `package.json` with pinned `playwright` and `marked` lives inside `scripts/`, never at the repo root, so Vercel keeps serving the repo as static files.
2. Invented names: kept as in section 8.6.
3. QA checklist: the section 14 list stands.
4. CHANGELOG.md stays at the repo root and joined the lint narrative allowlist in its own chore commit.
5. Team sizes per phase stay interpolated and labeled in artifact 15.
6. Synthetic calendar epoch: day 0 renders as Monday 2027-01-04. Stated in `data/README.md` and in every screen footer that shows a date.
7. Resolved with point 4.
8. D-05, D-07, D-08, D-09, D-10 and D-14 confirmed. Source column updated.
9. Dry run facts beyond 20 teams and 1,600+ items stay reconstructed and labeled until Yoni confirms any of them.
