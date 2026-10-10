# Changelog

One entry per commit that changes a case study. Newest first. Entries name the case by its stand-in brand because this file is outside the lint's narrative allowlist.

## Unreleased

### Baton case (the audit platform reconstruction)

- Gate 1 plan. Adds `cases/<audit-platform>/PLAN.md`: chapter plan, artifact list 01 to 15 with acceptance criteria, Baton brand sheet, synthetic data schema, provisional decision register, research summary with planned-target labels, build order with estimates, hostile-reviewer protocol, QA checklist and open points for approval. Starts this changelog. A four-lens hostile review of the plan runs next; its confirmed fixes land in a follow-up commit.
- Lint narrative allowlist. `scripts/lint.sh` allows the firm's public name in README.md, one-pager.md, talk-track.md, decisions.md and PLAN.md, the same way as the two public product names. Still banned under artifacts/, prototype/ and data/.
