# Changelog

One entry per commit that changes a case study. Newest first. Entries name the case by its stand-in brand because this file is outside the lint's narrative allowlist.

## Unreleased

### Baton case (the audit platform reconstruction)

- Gate 1 plan, review fixes. Four-lens hostile review of the plan (methodology, design rationale, honesty and confidentiality, craft and voice) returned 48 findings, deduplicated to 16; 9 blocker or major findings confirmed by a refutation pass, 1 refuted, 6 minor. Fixes: roadmap data can no longer yield a count of feedback items that changed the roadmap (field, status and relation removed; 12g shows rank movement only); synthetic feedback volume set to exactly 1,600 and labeled wherever it renders; synthesis and personas carry no observation or participant counts and are tagged reconstructed; decision register gains a Source column with six rows marked reconstructed for Gate 1 confirmation; the I/we split joins every artifact header and the prototype shell; the dry run protocol is specified section by section; one severity scale across usability and dry run; exception status history and procedure target assertions added so charts 12b and 12f derive correctly; entity names built from syllables, not dictionary nouns; dev tooling and fonts stated as one open point; build hours recomputed to 103 with the every-three-artifacts reviews on their own lines.
- Gate 1 plan. Adds `cases/<audit-platform>/PLAN.md`: chapter plan, artifact list 01 to 15 with acceptance criteria, Baton brand sheet, synthetic data schema, provisional decision register, research summary with planned-target labels, build order with estimates, hostile-reviewer protocol, QA checklist and open points for approval. Starts this changelog. A four-lens hostile review of the plan runs next; its confirmed fixes land in a follow-up commit.
- Lint narrative allowlist. `scripts/lint.sh` allows the firm's public name in README.md, one-pager.md, talk-track.md, decisions.md and PLAN.md, the same way as the two public product names. Still banned under artifacts/, prototype/ and data/.
