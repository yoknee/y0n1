Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.

# Baton synthetic data

One domain model feeds every artifact, screen, chart and the prototype of the Baton case. `generate.mjs` builds it from a seed. The outputs under `out/` are committed so the static site needs no build step.

## Regenerate

From this folder:

```
node generate.mjs                  # seed baton-01, writes out/
node generate.mjs --seed baton-02  # another seed
node generate.mjs --out /some/dir  # write elsewhere
node generate.mjs --check          # regenerate in memory, compare to out/manifest.json
```

Node 22. No dependencies. Default seed `baton-01`. The same seed produces the same bytes.

## Reproducibility check

Either of these must pass on a clean checkout.

```
node generate.mjs --check
cd out && sha256sum -c SHA256SUMS
```

`--check` regenerates every file in memory and compares its sha256 with the committed `manifest.json` and with the file on disk. It writes nothing and exits 1 on any mismatch. `SHA256SUMS` lists every output except the manifest itself.

How determinism holds: the seed string is hashed with cyrb53. The low 32 bits seed a mulberry32 stream. Each entity draws from its own sub-stream (`seed:users`, `seed:engagements`, `seed:fieldwork` and so on) so a rule change in one entity leaves the others untouched. There is no wall clock anywhere. Object keys are written in a fixed order. Sorts use total orderings.

## Calendar epoch

Dates in data are integer day indices relative to the synthetic engagement calendar start. Day 0 renders as Monday 2027-01-04. Weekday is the day index mod 7 with 0 as Monday. Screens render dates from the index and state the epoch in their footer. Data files never carry ISO dates. The manifest records the epoch once.

The dataset is frozen at day 270 (`as_of_day` in the manifest). Nothing happens after it. Runs and procedures that would start later are planned or in flight.

Release windows, in days: R0 pilot 0 to 41, R1 dry run 42 to 97, R2 agentic 1 98 to 153, R3 agentic 2 154 to 209, R4 scale 210 to 300. Each of the eight engagements has its own fieldwork window inside this range, so early releases carry fewer runs than late ones.

## Labels

- `dry_run_feedback_item` has exactly 1,600 rows, the floor of the stated 1,600+. The manifest, `charts/12g-feedback.json` and any rendering of the sample carry the label: "synthetic distribution over the stated 1,600+ total; theme, severity and status shares are illustrative".
- No count of feedback items that reached or changed the roadmap exists in any file. `roadmap_item` has no item count field. There is no status that marks an item as in the roadmap. `12g-feedback.json` shows rank movement and driving theme only.
- Every other file is illustrative synthetic data. Chart files carry the label and the generator seed in a `label` field.
- `out/dry_run_feedback_sample50.csv` is a strict RFC 4180 file with no comment line. A copy that renders as `13-dry-run-sample.csv` adds the label to its header.

## Files

| Path | Contents |
|---|---|
| `out/<entity>.json` | One JSON array per entity, one record per line. Seventeen files. |
| `out/<entity>.csv` | CSV for the thirteen tabular entities. RFC 4180 quoting, LF line endings, arrays joined with `\|`, null as empty. `audit_area.csv` flattens `assertion_risk` into seven `risk_<assertion>` columns. |
| `out/charts/12a` to `12g` | Pre-aggregated chart data. Shapes below. |
| `out/dry_run_feedback_sample50.csv` | 50 feedback rows drawn by a seeded shuffle of the 1,600, all fields. |
| `out/SHA256SUMS` | sha256 of every output except the manifest. |
| `out/manifest.json` | Seed, generator version, epoch, as of day, labels, counts per entity, bytes and sha256 per file, generation rules. Written last. |

Entities without a CSV carry nested values and are read from JSON: `engagement` (team map), `field_structure` (required_fields), `evidence_item` (extracted_fields, highlight_spans) and `agent_run_step` (id lists).

## Entities

Keys carry a type prefix. Counts for seed `baton-01` are in the manifest. Fixed counts: 8 engagements, 40 audit areas, 64 field structures, 160 procedures, 36 users, 5 releases, 1,600 feedback items, 24 roadmap items. The others follow from the rules below.

### engagement `ENG-nnnn`

| Field | Type | Notes |
|---|---|---|
| id | string | |
| name | string | Invented syllables plus a generic suffix (Group, Holdings, Industries, Partners, Co) |
| industry | enum | manufacturing, distribution, software, healthcare_services, retail, logistics, professional_services, construction |
| fiscal_year_end_day | int | Day index |
| overall_risk | enum | low, moderate, high |
| team | object | Role to list of user ids: partner, manager, senior, associate, methodology_reviewer, data_lead |
| area_ids | string[] | The five audit areas of the engagement |

### audit_area `ARE-nnnn`

| Field | Type | Notes |
|---|---|---|
| id, engagement_id | string | |
| name | enum | revenue, inventory, cash, fixed_assets, payables |
| population_count | int | Items in the population |
| population_amount | number | Synthetic currency unit |
| assertion_risk | object | Each of existence, completeness, accuracy, cutoff, valuation, rights_and_obligations, presentation to low, moderate or high |

### field_structure `FS-nnn`

| Field | Type | Notes |
|---|---|---|
| id, name | string | Name is a test description with an optional variant in brackets: high risk, low volume |
| applicable_areas | enum[] | Audit area names |
| target_assertions | enum[] | Assertions the structure tests |
| required_fields | object[] | `{name, type}` with type in amount, date, text, reference, boolean |
| evidence_types_required | enum[] | Evidence types |
| matching_rule | enum | exact, tolerance, range, presence |
| tolerance | number | Fraction. 0 when the rule has none |
| version | int | 1 to 3 |

### procedure `PRC-nnnn`

Four per audit area: one risk_assessment, two test_of_details and one analytical or controls.

| Field | Type | Notes |
|---|---|---|
| id, area_id | string | |
| type | enum | risk_assessment, test_of_details, analytical, controls |
| field_structure_id | string or null | Set for test_of_details only |
| target_assertions | enum[] | Set for every type. Test of details inherit from the field structure |
| planned_sample_size | int | |
| owner_role, reviewer_role | enum | Roles |
| status | enum | planned, in_progress, needs_review, concluded, signed |
| start_day, due_day | int | Day indices |

### sample_item `SMP-nnnnn`

| Field | Type | Notes |
|---|---|---|
| id, procedure_id | string | |
| population_ref | string | Area code plus a position in the population, for example `REV-004812` |
| amount | number | Hundreds to low millions, right skewed |
| selection_method | enum | random, monetary_unit, judgmental, agent_proposed |
| evidence_ids | string[] | One to three evidence items. Bank statements and system reports are shared across items of a procedure |
| match_status | enum | matched, exception, unresolved |
| tested_day | int | |

Planned procedures have no sample items. In progress procedures have part of their planned size.

### evidence_item `EVD-nnnnn`

| Field | Type | Notes |
|---|---|---|
| id, engagement_id, area_id | string | |
| type | enum | invoice, contract, bank_statement, confirmation, system_report, shipping_document, receiving_report, approval_memo |
| source_system | enum | client_erp, bank_portal, confirmation_service, document_request, prior_year_file |
| data_class | enum | public, engagement_internal, client_confidential, restricted |
| received_day | int | |
| page_count | int | |
| extracted_fields | object | Two to four fields. Values typed by the field: amounts near the sample amount, dates as day indices, references as `DOC-nnnnnn`, text as a counterparty name from an invented pool, booleans. Null when illegible |
| quality | enum | clean, partial, illegible |
| highlight_spans | object[] | One or two: `{page, field, x, y, w, h}` with coordinates as fractions of the page |

### exception `EXC-nnnn`

| Field | Type | Notes |
|---|---|---|
| id, procedure_id, sample_item_id | string | One exception per flagged sample item |
| type | enum | amount_mismatch, cutoff, missing_evidence, unauthorized, duplicate, conflicting_evidence |
| amount_difference | number | Signed. Full amount for missing, unauthorized and duplicate |
| severity | enum | low, moderate, high. By absolute difference |
| detected_by | enum | agent, auditor |
| status | enum | open, investigating, explained, misstatement, waived |
| opened_day | int | Equals the sample's tested_day |
| resolved_day | int or null | Set for the three terminal statuses |
| resolver_role | enum or null | Null while open |

### exception_status_change (key `exception_id` + `day`)

One row per transition. An exception has one, two or three rows: open, then investigating, then one terminal status. Days strictly increase within an exception.

| Field | Type |
|---|---|
| exception_id | string |
| day | int |
| status | enum, same as exception.status |
| actor_role | enum |

### agent_run `RUN-nnnn`

| Field | Type | Notes |
|---|---|---|
| id, procedure_id, release_id | string | release_id from started_day and the release windows |
| started_day | int | |
| state | enum | queued, planning, running, needs_review, approved, edited, rejected, rerun, concluded |
| confidence | number | 0 to 1, two decimals |
| checkpoints_required | enum[] | Always includes draft_conclusion. Adds evidence_retrieval when any evidence the run touched is data_class restricted |
| outcome | enum | approved, edited, rejected, none |
| failure_type | enum | none, source_unavailable, low_confidence, conflicting_evidence, timeout |
| rerun_of | string or null | The rejected run this run re-executes |
| human_review_minutes | int or null | Minutes a human spent reviewing. Null while in flight |

State machine. queued, planning and running are the in flight states. needs_review is the run waiting at a checkpoint. From needs_review the reviewer approves, edits or rejects. approved and edited move to concluded when the procedure concludes. A rejected run may be re-executed: the new run carries `rerun_of` and sits in state rerun while it executes, then follows the same path. outcome is none for every in flight state, otherwise it names the review result, including for concluded runs. The four failure types each occur in a minority of runs and push the outcome toward edited or rejected.

Outcome shares per release follow a target mix through a quota balancer so chart 12c shows a clear trend. The trend is illustrative.

### agent_run_step (key `run_id` + `index`)

Six steps per run in a fixed order: plan, evidence_retrieval, extraction, matching, exception_detection, draft_conclusion.

| Field | Type | Notes |
|---|---|---|
| run_id | string | |
| index | int | 0 to 5 |
| type | enum | Step type |
| started_minute, duration_minutes | int or null | Minutes from run start. Null until the step runs |
| input_refs | string[] | The plan step lists the procedure, the field structure and every sample item in the run's batch. Later steps reference the previous step as `RUN-nnnn#index` |
| source_evidence_ids | string[] | The evidence the run touched, on evidence_retrieval, extraction and matching. Empty elsewhere |
| output_summary | string or null | Templated |
| confidence | number or null | |
| status | enum or null | done, needs_review, rejected, skipped, failed. Null for a step not yet reached in an in flight run |
| rejected_reason | string or null | Set on failed and rejected steps |

skipped marks steps after a failed step. failed marks the step where source_unavailable or timeout stopped the run. rejected marks the step the reviewer rejected; later steps keep their done status because they ran before the review.

### review_action `RVA-nnnnn`

| Field | Type | Notes |
|---|---|---|
| id, run_id | string | |
| step_index | int or null | Null for actions on the whole run |
| actor_role | enum | senior, manager, partner, methodology_reviewer |
| action | enum | approve, edit, reject_step, request_rerun, comment, sign |
| day | int | |
| minutes_since_draft | int | Minutes from the end of the draft_conclusion step |
| edit_diff_size | int or null | Characters changed, edit actions only |

Approved and edited runs get a senior approve or edit, then one manager approve. Concluded runs add a sign. Rejected runs get a reject_step on the rejected step and a request_rerun when a rerun follows. The manager approve rows feed chart 12d and are right skewed by construction (lognormal, median falling by release).

### conclusion `CON-nnnn`

One per procedure.

| Field | Type | Notes |
|---|---|---|
| id, procedure_id | string | |
| run_id | string or null | The latest approved or edited run of the procedure |
| drafted_by | enum | agent when run_id is set, else auditor |
| template_id | string | TPL-01 to TPL-08 |
| cited_evidence_ids | string[] | Three to eight. An agent draft cites evidence its run touched |
| exception_ids | string[] | Every exception of the procedure |
| version | int | 1 to 3. Edited runs produce version 2 or 3 |
| status | enum | draft, reviewed, final |

### sign_off `SGN-nnnn`

| Field | Type | Notes |
|---|---|---|
| id, procedure_id | string | |
| role | enum | senior, manager, partner. Partner rows on high risk work and a minority of the rest |
| day | int | Sign day, or the day the sign off was requested while pending |
| status | enum | pending, signed, reopened |

### user `USR-nnn`

36 users. Five come from the persona set, once each: Dana Whitlock (senior), Rafael Osei (manager), Ingrid Haller (partner), Tomasz Brenner (methodology_reviewer), Caleb Marsh (associate). The other 31 are invented and reviewed by hand. Roles: 12 associate, 9 senior, 7 manager, 3 partner, 2 methodology_reviewer, 3 data_lead.

| Field | Type | Notes |
|---|---|---|
| id | string | |
| role | enum | associate, senior, manager, partner, methodology_reviewer, data_lead |
| display_name | string | Invented |
| region | enum | North, South, East, West, Central |

### release `R0` to `R4`

| Field | Type | Notes |
|---|---|---|
| id | string | |
| name | string | pilot, dry run, agentic 1, agentic 2, scale |
| start_day, end_day | int | |
| teams | string[] | Dry run team ids `T01` to `T20`. R1 lists all 20. The other lists are illustrative |

### dry_run_feedback_item `FB-nnnn`

Exactly 1,600 rows.

| Field | Type | Notes |
|---|---|---|
| id | string | |
| team_id | string | T01 to T20. Each theme reaches a fixed subset of teams |
| role | enum | The six roles |
| area | enum | planning_and_risk, fieldwork_and_testing, platform_foundation |
| theme | enum | The 14 themes below |
| type | enum | defect, usability, missing_capability, methodology_question, performance, trust_and_explainability, data_access, training |
| severity | int | 1 cosmetic, 2 slows the task, 3 forces a workaround, 4 blocks the task |
| frequency | int | Distinct teams that reported the same theme anywhere in the repository |
| status | enum | triaged, fixed, declined, duplicate |
| submitted_day | int | Inside the R1 window |
| text | string | Templated from theme with area, step and role slots. Generic and synthetic |

Themes (14): provenance_visibility, checkpoint_placement, exception_handling, evidence_viewer, sample_selection, field_structure_fit, performance, data_access_and_permissions, terminology, navigation_and_findability, keyboard_and_accessibility, training_and_onboarding, review_workflow, integration_with_workpapers.

### roadmap_item `RM-nnn`

24 items, authored rather than sampled. The two rank columns are each a permutation of 1 to 24. The generator asserts this.

| Field | Type | Notes |
|---|---|---|
| id, title | string | |
| before_rank, after_rank | int | Rank before and after the roadmap reset |
| driving_theme | enum | A theme label only. No relation to feedback items |
| phase_before, phase_after | enum | P4 dry run, P5 agentic workflows, P6 scale, P7 release and measurement, backlog |

## Relationships

`engagement` 1..n `audit_area` 1..n `procedure` 1..n `sample_item` n..n `evidence_item`. `procedure` 0..n `agent_run` 1..6 `agent_run_step`. `agent_run` 0..n `review_action`. `sample_item` 0..1 `exception` 1..3 `exception_status_change`. `procedure` 1..1 `conclusion`. `procedure` 0..n `sign_off`. `agent_run` n..1 `release`. `agent_run` 0..1 `agent_run` through `rerun_of`. `roadmap_item` stands alone. `dry_run_feedback_item` stands alone.

## Chart aggregates

Every chart file has `label` (the synthetic label with the seed) and `derivation` (the sentence below, repeated on the chart page).

### 12a-coverage.json

Population coverage per audit area. `areas[]` has one row per audit area: `area_id, engagement_id, engagement, area, population_count, population_amount, tested_count, tested_amount, exception_count, exception_amount, coverage_count_pct, coverage_amount_pct`. tested_count and tested_amount sum the sample items whose procedure belongs to the area. exception_count counts exceptions through the same path. exception_amount sums the absolute amount_difference. Coverage divides tested by population. Draw as small multiples, one per area name, with engagements as rows.

### 12b-funnel.json

Exception funnel over the engagement timeline. `stages[]` is `{status, count}` for the five statuses: open is every exception ever opened and the three terminal statuses sum to `resolved_total`. `by_week[]` counts transitions in the week of their day (`week`, `day_start`, one column per status). `cumulative_by_week[]` runs those totals forward. `days_to_stage` gives n, median and p90 days from the open row to investigating and to a terminal status.

### 12c-outcomes.json

Run outcomes by release. `releases[]` has `release_id, name, start_day, end_day, approved, edited, rejected, in_flight, total` and the three shares. Shares divide by runs with an outcome. in_flight counts runs with outcome none.

### 12d-latency.json

Review latency from agent draft to manager approval. Rows are review_action where action is approve and actor_role is manager, at most one per run. `n`, `unit` (minutes), `summary` (median, p75, p90, p95, max), `bins[]` with `lo, hi, label, count` on doubling edges from 15 minutes, left closed and right open. `by_release[]` carries n, median and p90 per release. `values[]` is the sorted list for a strip or a cumulative plot.

### 12e-lineage.json

Evidence lineage for one conclusion. The generator picks the first final conclusion drafted by a concluded run that touched restricted evidence (two checkpoints), with at least one exception and four cited items. `nodes[]` carry `id, type, label` plus type specific fields. Types: procedure, run, step, source, evidence, exception, review_action, conclusion. `links[]` carry `source, target, type`: executes, produces, next, provides, retrieved_by, cited_by, flags, addressed_in, reviewed_by. An exception node has `flagged_by_this_run`; the flags link exists only when its sample item sits in the run's batch.

### 12f-risk.json

Risk heat map. `assertions[]`, `risk_levels[]`, `areas[]` (area_id, engagement_id, engagement, area, overall_risk) and `cells[]` with one row per area and assertion: `risk` from audit_area.assertion_risk, `procedures` counting procedures of the area whose target_assertions include the assertion, `tested_items` and `tested_amount` summing the sample items of those procedures, `coverage_amount_pct` against the population amount. One item counts toward every assertion its procedure targets.

### 12g-feedback.json

Dry run feedback. `label` is the feedback label. `total` is 1600. `severity_scale` names the four anchors. `pareto[]` has `theme, count, share, cumulative_share` sorted by count. `matrix[]` has `theme, severity, count` for all 56 cells. `teams_reporting[]` has `theme, teams`. `roadmap.items[]` lists the 24 roadmap items with `id, title, driving_theme, before_rank, after_rank, phase_before, phase_after`. The roadmap block carries no item counts and no link to feedback rows.

## Generation rules in brief

- Volumes are chosen to make charts legible, not to mirror any production system.
- Entity and counterparty names are built from invented syllable lists plus a generic suffix. No real firm, product, client, person or place appears anywhere under `data/`. `scripts/lint.sh` checks every output against the banned list.
- Amounts are plain numbers in a synthetic currency unit.
- Evidence received before testing. Exceptions open on the test day. Transitions move forward in time. Nothing happens after day 270.
- Agent proposed selection, agent detected exceptions and approved outcomes grow by release. All of it is illustrative.
- To change a rule, edit `generate.mjs`, run it, run `--check` to confirm the manifest was rewritten and commit `out/` with the change.
