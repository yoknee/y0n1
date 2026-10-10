#!/usr/bin/env node
// Baton synthetic data generator.
//
// Reconstructed for portfolio purposes. The process, decisions and role are
// real. Screens, data, names and figures are illustrative and do not depict
// the production product.
//
// Node 22, ES module, zero dependencies. Every value derives from the seed
// through a seeded PRNG (cyrb53 string hash feeding mulberry32). Each entity
// draws from its own sub-stream so a change in one entity's rules leaves the
// others untouched. The same seed produces byte-identical output.
//
// Usage:
//   node generate.mjs                      write out/ with seed baton-01
//   node generate.mjs --seed baton-02      write out/ with another seed
//   node generate.mjs --out /tmp/x         write somewhere else
//   node generate.mjs --check              regenerate in memory and compare
//                                          sha256 against out/manifest.json
//
// Dates are day indices relative to the synthetic engagement calendar.
// Day 0 renders as Monday 2027-01-04. Data files never carry ISO dates.

import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const GENERATOR = { name: 'baton-data-generator', version: '1.0.0' };
const DEFAULT_SEED = 'baton-01';
const EPOCH = {
  day_zero: '2027-01-04',
  day_zero_weekday: 'Monday',
  rule: 'A date renders as day_zero plus the day index. Weekday is day index mod 7 with 0 as Monday. Data files store day indices only.'
};
const FEEDBACK_LABEL = 'synthetic distribution over the stated 1,600+ total; theme, severity and status shares are illustrative';
const ILLUSTRATIVE = 'illustrative synthetic data generated from seed';

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
function argValue(flag, fallback) {
  const i = args.indexOf(flag);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
}
const SEED = argValue('--seed', DEFAULT_SEED);
const OUT_DIR = resolve(argValue('--out', join(here, 'out')));
const CHECK = args.includes('--check');
const QUIET = args.includes('--quiet');

// ---------------------------------------------------------------------------
// Seeded randomness
// ---------------------------------------------------------------------------

function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function mulberry32(a) {
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeRng(seed, stream) {
  const next = mulberry32(cyrb53(`${seed}:${stream}`) >>> 0);
  const rng = {
    next,
    // integer in [lo, hi] inclusive
    int(lo, hi) {
      return lo + Math.floor(next() * (hi - lo + 1));
    },
    chance(p) {
      return next() < p;
    },
    pick(arr) {
      return arr[Math.floor(next() * arr.length)];
    },
    // pairs: [[value, weight], ...]
    weighted(pairs) {
      let total = 0;
      for (const [, w] of pairs) total += w;
      let r = next() * total;
      for (const [v, w] of pairs) {
        r -= w;
        if (r < 0) return v;
      }
      return pairs[pairs.length - 1][0];
    },
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
      }
      return a;
    },
    sample(arr, k) {
      return rng.shuffle(arr).slice(0, Math.min(k, arr.length));
    },
    normal(mean = 0, sd = 1) {
      let u = 0;
      let v = 0;
      while (u === 0) u = next();
      while (v === 0) v = next();
      return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    // median = exp(mu); sigma controls the right tail
    lognormal(median, sigma) {
      return median * Math.exp(sigma * rng.normal());
    }
  };
  return rng;
}

const round2 = (x) => Math.round(x * 100) / 100;
const round3 = (x) => Math.round(x * 1000) / 1000;
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const pad = (n, w) => String(n).padStart(w, '0');
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// Vocabularies (all enums fixed by the plan)
// ---------------------------------------------------------------------------

const ROLES = ['associate', 'senior', 'manager', 'partner', 'methodology_reviewer', 'data_lead'];
const REGIONS = ['North', 'South', 'East', 'West', 'Central'];
const AREAS = ['revenue', 'inventory', 'cash', 'fixed_assets', 'payables'];
const AREA_CODE = { revenue: 'REV', inventory: 'INV', cash: 'CSH', fixed_assets: 'FXA', payables: 'PAY' };
const ASSERTIONS = ['existence', 'completeness', 'accuracy', 'cutoff', 'valuation', 'rights_and_obligations', 'presentation'];
const RISKS = ['low', 'moderate', 'high'];
const INDUSTRIES = ['manufacturing', 'distribution', 'software', 'healthcare_services', 'retail', 'logistics', 'professional_services', 'construction'];
const PROC_TYPES = ['risk_assessment', 'test_of_details', 'analytical', 'controls'];
const PROC_STATUSES = ['planned', 'in_progress', 'needs_review', 'concluded', 'signed'];
const SELECTION_METHODS = ['random', 'monetary_unit', 'judgmental', 'agent_proposed'];
const MATCH_STATUSES = ['matched', 'exception', 'unresolved'];
const EVIDENCE_TYPES = ['invoice', 'contract', 'bank_statement', 'confirmation', 'system_report', 'shipping_document', 'receiving_report', 'approval_memo'];
const SOURCE_SYSTEMS = ['client_erp', 'bank_portal', 'confirmation_service', 'document_request', 'prior_year_file'];
const DATA_CLASSES = ['public', 'engagement_internal', 'client_confidential', 'restricted'];
const QUALITIES = ['clean', 'partial', 'illegible'];
const EXC_TYPES = ['amount_mismatch', 'cutoff', 'missing_evidence', 'unauthorized', 'duplicate', 'conflicting_evidence'];
const EXC_STATUSES = ['open', 'investigating', 'explained', 'misstatement', 'waived'];
const RUN_STATES = ['queued', 'planning', 'running', 'needs_review', 'approved', 'edited', 'rejected', 'rerun', 'concluded'];
const STEP_TYPES = ['plan', 'evidence_retrieval', 'extraction', 'matching', 'exception_detection', 'draft_conclusion'];
const STEP_STATUSES = ['done', 'needs_review', 'rejected', 'skipped', 'failed'];
const FAILURE_TYPES = ['none', 'source_unavailable', 'low_confidence', 'conflicting_evidence', 'timeout'];
const OUTCOMES = ['approved', 'edited', 'rejected', 'none'];
const REVIEW_ACTIONS = ['approve', 'edit', 'reject_step', 'request_rerun', 'comment', 'sign'];
const CONCLUSION_STATUSES = ['draft', 'reviewed', 'final'];
const SIGN_ROLES = ['senior', 'manager', 'partner'];
const SIGN_STATUSES = ['pending', 'signed', 'reopened'];
const THEMES = [
  'provenance_visibility', 'checkpoint_placement', 'exception_handling', 'evidence_viewer',
  'sample_selection', 'field_structure_fit', 'performance', 'data_access_and_permissions',
  'terminology', 'navigation_and_findability', 'keyboard_and_accessibility',
  'training_and_onboarding', 'review_workflow', 'integration_with_workpapers'
];
const FB_TYPES = ['defect', 'usability', 'missing_capability', 'methodology_question', 'performance', 'trust_and_explainability', 'data_access', 'training'];
const FB_AREAS = ['planning_and_risk', 'fieldwork_and_testing', 'platform_foundation'];
const FB_STATUSES = ['triaged', 'fixed', 'declined', 'duplicate'];
const TEAM_IDS = Array.from({ length: 20 }, (_, i) => `T${pad(i + 1, 2)}`);

// Synthetic calendar. Day 0 is the engagement calendar start. AS_OF is the
// day the dataset is "frozen" at: nothing happens after it.
const AS_OF = 270;

const RELEASES = [
  { id: 'R0', name: 'pilot', start_day: 0, end_day: 41, teams: TEAM_IDS.slice(0, 3) },
  { id: 'R1', name: 'dry run', start_day: 42, end_day: 97, teams: TEAM_IDS.slice(0, 20) },
  { id: 'R2', name: 'agentic 1', start_day: 98, end_day: 153, teams: TEAM_IDS.slice(0, 6) },
  { id: 'R3', name: 'agentic 2', start_day: 154, end_day: 209, teams: TEAM_IDS.slice(0, 10) },
  { id: 'R4', name: 'scale', start_day: 210, end_day: 300, teams: TEAM_IDS.slice(0, 20) }
];
function releaseForDay(day) {
  for (const r of RELEASES) if (day >= r.start_day && day <= r.end_day) return r.id;
  return RELEASES[RELEASES.length - 1].id;
}

// Outcome mix per release. Illustrative trend only.
const OUTCOME_MIX = {
  R0: { approved: 22, edited: 36, rejected: 42 },
  R1: { approved: 34, edited: 36, rejected: 30 },
  R2: { approved: 45, edited: 34, rejected: 21 },
  R3: { approved: 56, edited: 30, rejected: 14 },
  R4: { approved: 64, edited: 27, rejected: 9 }
};
// Share of runs with a failure type, per release. Illustrative.
const FAILURE_SHARE = { R0: 0.22, R1: 0.18, R2: 0.14, R3: 0.11, R4: 0.09 };
const FAILURE_MIX = [['source_unavailable', 38], ['low_confidence', 30], ['conflicting_evidence', 20], ['timeout', 12]];

// ---------------------------------------------------------------------------
// Invented names
// ---------------------------------------------------------------------------

// Entity names are built from syllables, never dictionary proper nouns.
const SYL_A = ['kes', 'trom', 'vai', 'vir', 'quen', 'bra', 'lith', 'vex', 'nol', 'pir', 'drel', 'fen', 'mir', 'tor', 'vel', 'cas', 'dun', 'wyl', 'zar', 'ren', 'ost', 'bel', 'tav', 'sorv', 'thren', 'gald'];
const SYL_MID = ['en', 'ar', 'o', 'i', 'ul', 'ev'];
const SYL_END = ['ek', 'um', 'or', 'ane', 'ure', 'enz', 'ova', 'ast', 'ine', 'esk', 'oth', 'arn', 'ult', 'ost'];
const SYL_C = ['vaile', 'moren', 'tarsk', 'quill', 'hollin', 'brask', 'eldon', 'varro', 'nestr', 'calder', 'ossen', 'pryce', 'thane', 'wexley', 'dorran'];
const SUFFIXES = ['Group', 'Holdings', 'Industries', 'Partners', 'Co'];

function entityName(rng) {
  const first = cap(rng.pick(SYL_A) + (rng.chance(0.35) ? rng.pick(SYL_MID) : '') + rng.pick(SYL_END));
  const second = rng.chance(0.75) ? ' ' + cap(rng.pick(SYL_C)) : '';
  return `${first}${second} ${rng.pick(SUFFIXES)}`;
}

// 36 users. Five come from the persona set and appear exactly once each.
// The other 31 are invented and reviewed by hand against the banned list.
const PERSONA_USERS = [
  ['Dana Whitlock', 'senior'],
  ['Rafael Osei', 'manager'],
  ['Ingrid Haller', 'partner'],
  ['Tomasz Brenner', 'methodology_reviewer'],
  ['Caleb Marsh', 'associate']
];
const INVENTED_USERS = [
  // associates (11 more, 12 total with the persona)
  ['Vesna Ashgrove', 'associate'], ['Oriol Vantrell', 'associate'], ['Thandeka Oakhurst', 'associate'],
  ['Kasimir Strombeck', 'associate'], ['Liesl Haverly', 'associate'], ['Bastien Quenneville', 'associate'],
  ['Maren Rasmund', 'associate'], ['Ozren Thornquist', 'associate'], ['Ilka Belmonde', 'associate'],
  ['Tiberiu Castellane', 'associate'], ['Anouk Wrenfield', 'associate'],
  // seniors (8 more, 9 total)
  ['Fenwick Kolbeck', 'senior'], ['Ludovica Marrowick', 'senior'], ['Petros Dalmore', 'senior'],
  ['Yevgenia Fenshaw', 'senior'], ['Caspian Greywell', 'senior'], ['Odalys Harkness', 'senior'],
  ['Rurik Ivarsen', 'senior'], ['Mireille Lamberton', 'senior'],
  // managers (6 more, 7 total)
  ['Sigrun Morrowfield', 'manager'], ['Teodor Norquist', 'manager'], ['Hilde Ostrander', 'manager'],
  ['Anselm Pellingham', 'manager'], ['Nkechi Quarrie', 'manager'], ['Ivo Rosvall', 'manager'],
  // partners (2 more, 3 total)
  ['Branwen Sablewood', 'partner'], ['Lazlo Tarrant', 'partner'],
  // methodology reviewers (1 more, 2 total)
  ['Ottilie Ulverston', 'methodology_reviewer'],
  // data leads (3)
  ['Wendeline Vossberg', 'data_lead'], ['Ingram Yarrowby', 'data_lead'], ['Saveria Brightmore', 'data_lead']
];

// ---------------------------------------------------------------------------
// Domain tables
// ---------------------------------------------------------------------------

const AREA_PROFILE = {
  revenue: { count: [8000, 60000], amount: [20e6, 400e6], evidence: ['invoice', 'contract', 'shipping_document', 'confirmation', 'system_report'] },
  inventory: { count: [2000, 20000], amount: [5e6, 80e6], evidence: ['receiving_report', 'system_report', 'invoice', 'shipping_document'] },
  cash: { count: [5000, 40000], amount: [10e6, 200e6], evidence: ['bank_statement', 'confirmation', 'system_report'] },
  fixed_assets: { count: [300, 4000], amount: [5e6, 120e6], evidence: ['invoice', 'approval_memo', 'contract', 'system_report'] },
  payables: { count: [3000, 30000], amount: [8e6, 150e6], evidence: ['invoice', 'receiving_report', 'confirmation', 'approval_memo', 'system_report'] }
};

const SOURCE_BY_EVIDENCE = {
  invoice: [['client_erp', 60], ['document_request', 35], ['prior_year_file', 5]],
  contract: [['document_request', 85], ['prior_year_file', 15]],
  bank_statement: [['bank_portal', 90], ['document_request', 10]],
  confirmation: [['confirmation_service', 95], ['document_request', 5]],
  system_report: [['client_erp', 95], ['prior_year_file', 5]],
  shipping_document: [['client_erp', 55], ['document_request', 45]],
  receiving_report: [['client_erp', 60], ['document_request', 40]],
  approval_memo: [['document_request', 90], ['prior_year_file', 10]]
};

const DATA_CLASS_BY_EVIDENCE = {
  invoice: [['engagement_internal', 25], ['client_confidential', 65], ['restricted', 7], ['public', 3]],
  contract: [['client_confidential', 60], ['restricted', 35], ['engagement_internal', 5]],
  bank_statement: [['client_confidential', 55], ['restricted', 45]],
  confirmation: [['engagement_internal', 45], ['client_confidential', 50], ['restricted', 5]],
  system_report: [['engagement_internal', 30], ['client_confidential', 62], ['public', 8]],
  shipping_document: [['engagement_internal', 40], ['client_confidential', 55], ['public', 5]],
  receiving_report: [['engagement_internal', 40], ['client_confidential', 57], ['public', 3]],
  approval_memo: [['engagement_internal', 20], ['client_confidential', 60], ['restricted', 20]]
};

const FIELD_POOL = {
  revenue: [
    ['invoice_number', 'reference'], ['invoice_date', 'date'], ['amount', 'amount'], ['customer', 'text'],
    ['ship_date', 'date'], ['quantity', 'amount'], ['contract_reference', 'reference'], ['approved', 'boolean']
  ],
  inventory: [
    ['item_code', 'reference'], ['count_date', 'date'], ['quantity', 'amount'], ['unit_cost', 'amount'],
    ['location', 'text'], ['received_date', 'date'], ['po_number', 'reference'], ['in_transit', 'boolean']
  ],
  cash: [
    ['bank_reference', 'reference'], ['statement_date', 'date'], ['amount', 'amount'], ['payee', 'text'],
    ['cleared', 'boolean'], ['ledger_reference', 'reference'], ['value_date', 'date']
  ],
  fixed_assets: [
    ['asset_tag', 'reference'], ['acquisition_date', 'date'], ['cost', 'amount'], ['supplier', 'text'],
    ['approved', 'boolean'], ['useful_life_months', 'amount'], ['disposal_date', 'date'], ['memo_reference', 'reference']
  ],
  payables: [
    ['invoice_number', 'reference'], ['invoice_date', 'date'], ['amount', 'amount'], ['supplier', 'text'],
    ['po_number', 'reference'], ['received_date', 'date'], ['approved', 'boolean'], ['payment_date', 'date']
  ]
};

const FS_BASE = [
  ['revenue', 'Invoice to shipping document match', ['existence', 'accuracy', 'cutoff'], ['invoice', 'shipping_document']],
  ['revenue', 'Invoice to contract pricing check', ['accuracy', 'valuation'], ['invoice', 'contract']],
  ['revenue', 'Period end cutoff test', ['cutoff', 'completeness'], ['invoice', 'shipping_document']],
  ['revenue', 'Credit note authorization', ['existence', 'accuracy'], ['approval_memo', 'invoice']],
  ['revenue', 'Receivable confirmation to ledger', ['existence', 'rights_and_obligations'], ['confirmation', 'system_report']],
  ['inventory', 'Count sheet to perpetual record', ['existence', 'completeness'], ['system_report', 'receiving_report']],
  ['inventory', 'Receiving report to purchase invoice', ['accuracy', 'valuation'], ['receiving_report', 'invoice']],
  ['inventory', 'Cost to net realizable value', ['valuation'], ['invoice', 'system_report']],
  ['inventory', 'In transit cutoff', ['cutoff', 'rights_and_obligations'], ['shipping_document', 'receiving_report']],
  ['cash', 'Bank statement to ledger reconciliation', ['existence', 'completeness', 'accuracy'], ['bank_statement', 'system_report']],
  ['cash', 'Outstanding item clearance', ['completeness', 'cutoff'], ['bank_statement']],
  ['cash', 'Confirmation reply to ledger balance', ['existence', 'rights_and_obligations'], ['confirmation', 'system_report']],
  ['cash', 'Transfer cutoff', ['cutoff', 'existence'], ['bank_statement']],
  ['fixed_assets', 'Addition to invoice and approval memo', ['existence', 'accuracy', 'rights_and_obligations'], ['invoice', 'approval_memo']],
  ['fixed_assets', 'Disposal to proceeds and authorization', ['existence', 'completeness'], ['approval_memo', 'bank_statement']],
  ['fixed_assets', 'Depreciation recalculation', ['valuation', 'accuracy'], ['system_report']],
  ['fixed_assets', 'Physical existence verification', ['existence'], ['system_report', 'contract']],
  ['payables', 'Invoice to receiving report three way match', ['existence', 'accuracy', 'completeness'], ['invoice', 'receiving_report']],
  ['payables', 'Unrecorded liability search', ['completeness', 'cutoff'], ['invoice', 'bank_statement']],
  ['payables', 'Supplier statement reconciliation', ['completeness', 'accuracy'], ['confirmation', 'system_report']],
  ['payables', 'Payment authorization', ['existence', 'presentation'], ['approval_memo', 'invoice']],
  ['payables', 'Accrual to subsequent invoice', ['completeness', 'valuation'], ['invoice', 'system_report']]
];
const FS_VARIANTS = ['standard', 'high risk', 'low volume'];

const ASSERTIONS_BY_PROC_TYPE = {
  risk_assessment: ['existence', 'completeness', 'valuation'],
  analytical: ['completeness', 'accuracy', 'valuation'],
  controls: ['existence', 'accuracy', 'cutoff', 'rights_and_obligations', 'presentation']
};

const TEMPLATE_IDS = ['TPL-01', 'TPL-02', 'TPL-03', 'TPL-04', 'TPL-05', 'TPL-06', 'TPL-07', 'TPL-08'];

const REJECT_REASONS = {
  draft_conclusion: ['Cited evidence does not support the stated amount', 'Conclusion omits an open exception', 'Wording asserts more than the sample supports', 'Draft cites a superseded field structure version'],
  matching: ['Conflicting amounts across two sources', 'Tolerance applied to the wrong field', 'Wrong period selected for cutoff'],
  extraction: ['Extracted date read from the wrong document region', 'Amount extracted without currency unit', 'Partial document treated as complete'],
  evidence_retrieval: ['Source unavailable after three attempts', 'Retrieved item belongs to a different population', 'Restricted item retrieved without the approval step']
};

// ---------------------------------------------------------------------------
// Dry run feedback vocabulary
// ---------------------------------------------------------------------------

// Theme weights shape the Pareto. Illustrative.
const THEME_WEIGHT = {
  provenance_visibility: 14, exception_handling: 12, evidence_viewer: 11, checkpoint_placement: 10,
  review_workflow: 9, performance: 8, navigation_and_findability: 7, data_access_and_permissions: 6,
  sample_selection: 5, field_structure_fit: 5, terminology: 4, integration_with_workpapers: 4,
  training_and_onboarding: 3, keyboard_and_accessibility: 2
};
// How many of the 20 teams a theme reaches. Drives the frequency axis of the triage 2x2.
const THEME_TEAM_REACH = {
  provenance_visibility: 20, exception_handling: 19, evidence_viewer: 18, checkpoint_placement: 17,
  review_workflow: 16, performance: 15, navigation_and_findability: 14, data_access_and_permissions: 11,
  sample_selection: 10, field_structure_fit: 9, terminology: 12, integration_with_workpapers: 8,
  training_and_onboarding: 7, keyboard_and_accessibility: 5
};
const THEME_AREA = {
  provenance_visibility: [['fieldwork_and_testing', 70], ['planning_and_risk', 15], ['platform_foundation', 15]],
  checkpoint_placement: [['fieldwork_and_testing', 75], ['planning_and_risk', 20], ['platform_foundation', 5]],
  exception_handling: [['fieldwork_and_testing', 85], ['planning_and_risk', 10], ['platform_foundation', 5]],
  evidence_viewer: [['fieldwork_and_testing', 80], ['platform_foundation', 20]],
  sample_selection: [['planning_and_risk', 70], ['fieldwork_and_testing', 30]],
  field_structure_fit: [['planning_and_risk', 65], ['fieldwork_and_testing', 35]],
  performance: [['platform_foundation', 70], ['fieldwork_and_testing', 30]],
  data_access_and_permissions: [['platform_foundation', 65], ['planning_and_risk', 20], ['fieldwork_and_testing', 15]],
  terminology: [['platform_foundation', 40], ['planning_and_risk', 30], ['fieldwork_and_testing', 30]],
  navigation_and_findability: [['platform_foundation', 60], ['fieldwork_and_testing', 25], ['planning_and_risk', 15]],
  keyboard_and_accessibility: [['platform_foundation', 80], ['fieldwork_and_testing', 20]],
  training_and_onboarding: [['platform_foundation', 50], ['planning_and_risk', 30], ['fieldwork_and_testing', 20]],
  review_workflow: [['fieldwork_and_testing', 75], ['planning_and_risk', 15], ['platform_foundation', 10]],
  integration_with_workpapers: [['platform_foundation', 55], ['fieldwork_and_testing', 45]]
};
const THEME_TYPE = {
  provenance_visibility: [['trust_and_explainability', 55], ['usability', 25], ['missing_capability', 15], ['methodology_question', 5]],
  checkpoint_placement: [['usability', 40], ['trust_and_explainability', 30], ['methodology_question', 20], ['missing_capability', 10]],
  exception_handling: [['defect', 30], ['usability', 35], ['missing_capability', 25], ['methodology_question', 10]],
  evidence_viewer: [['defect', 35], ['usability', 40], ['performance', 15], ['missing_capability', 10]],
  sample_selection: [['methodology_question', 45], ['trust_and_explainability', 25], ['missing_capability', 20], ['usability', 10]],
  field_structure_fit: [['methodology_question', 50], ['missing_capability', 35], ['usability', 15]],
  performance: [['performance', 80], ['defect', 20]],
  data_access_and_permissions: [['data_access', 70], ['defect', 20], ['missing_capability', 10]],
  terminology: [['usability', 55], ['methodology_question', 30], ['training', 15]],
  navigation_and_findability: [['usability', 70], ['missing_capability', 20], ['defect', 10]],
  keyboard_and_accessibility: [['defect', 45], ['usability', 45], ['missing_capability', 10]],
  training_and_onboarding: [['training', 75], ['usability', 25]],
  review_workflow: [['usability', 40], ['missing_capability', 35], ['defect', 15], ['methodology_question', 10]],
  integration_with_workpapers: [['missing_capability', 55], ['defect', 25], ['usability', 20]]
};
// Severity weights per theme over the shared 1 to 4 scale.
const THEME_SEVERITY = {
  provenance_visibility: [12, 38, 36, 14], checkpoint_placement: [10, 32, 40, 18], exception_handling: [8, 30, 42, 20],
  evidence_viewer: [18, 42, 30, 10], sample_selection: [20, 45, 28, 7], field_structure_fit: [15, 40, 35, 10],
  performance: [10, 35, 38, 17], data_access_and_permissions: [6, 24, 40, 30], terminology: [45, 40, 13, 2],
  navigation_and_findability: [30, 45, 20, 5], keyboard_and_accessibility: [20, 35, 30, 15],
  training_and_onboarding: [35, 45, 17, 3], review_workflow: [12, 38, 36, 14], integration_with_workpapers: [15, 35, 35, 15]
};
const FB_ROLE_MIX = [['associate', 38], ['senior', 32], ['manager', 18], ['partner', 4], ['methodology_reviewer', 5], ['data_lead', 3]];
const FB_STATUS_MIX = [['fixed', 40], ['triaged', 35], ['duplicate', 15], ['declined', 10]];

// Templated text. Slots: {area} audit area, {step} agent step, {role} role.
const FB_TEXT = {
  provenance_visibility: [
    'Cannot tell which evidence item the agent used for the amount in the {area} draft.',
    'The {step} step shows a result but not the source it came from.',
    'Need to open the cited document from the conclusion without searching for it.',
    'Confidence number appears with no note on what it is based on.'
  ],
  checkpoint_placement: [
    'The review stop comes after the draft is written. It should come before the agent matches {area} items.',
    'Too many stops on low risk {area} procedures. One stop before the conclusion would do.',
    'A {role} should be able to set where the checkpoint sits for the procedure.',
    'Checkpoint at {step} interrupts a run that was going well.'
  ],
  exception_handling: [
    'Exceptions from the {area} run land in one list with no severity or owner.',
    'Cannot mark an exception as explained without leaving the procedure view.',
    'An exception the agent flagged was a duplicate of one already under investigation.',
    'Status of an exception does not change when the sample item is re-tested.'
  ],
  evidence_viewer: [
    'The highlighted span in the {area} invoice sits on the wrong line.',
    'Multi page documents open on page one every time. Open on the cited page.',
    'Zoom resets when switching between two evidence items.',
    'Partial scans render blank instead of showing the readable part.'
  ],
  sample_selection: [
    'Not clear how the agent proposed selection relates to the monetary unit method.',
    'Need to replace one proposed {area} item with a judgmental pick and keep the rest.',
    'Sample size shown does not match the planned size in the procedure.',
    'Proposed sample excludes items under the threshold with no stated reason.'
  ],
  field_structure_fit: [
    'The {area} field structure asks for a field this population does not carry.',
    'Tolerance rule is fixed. Our methodology allows a range here.',
    'No way to mark a required field as not applicable for a small population.',
    'Two field structures cover the same test with different required evidence.'
  ],
  performance: [
    'The {step} step on a {area} procedure took long enough that the team moved to other work.',
    'Opening the procedure list with filters applied takes several seconds.',
    'Run status stays on running after the steps have finished.',
    'Large evidence files stall the viewer.'
  ],
  data_access_and_permissions: [
    'Restricted {area} evidence shows as retrieved before anyone approved the access.',
    'An associate can see a restricted item that the manager cannot.',
    'Prior year file items are not available to the {role} who needs them.',
    'Permission error message names an internal code and nothing else.'
  ],
  terminology: [
    'The label on the {step} step uses a word the methodology does not use.',
    'Field structure and template mean the same thing on two screens.',
    'Severity scale labels differ between exceptions and feedback.',
    'Run state names are not the ones a {role} uses in review.'
  ],
  navigation_and_findability: [
    'Cannot find the procedure again after closing the run timeline.',
    'Filters on the {area} procedure list reset on every return.',
    'The path from an exception back to its sample item takes four clicks.',
    'No saved views for the procedures a {role} reviews each day.'
  ],
  keyboard_and_accessibility: [
    'Tab order skips the approve control on the checkpoint panel.',
    'The focus ring is not visible on the dark theme grid.',
    'The run timeline cannot be operated without a pointer.',
    'Status is shown by color alone in the {area} procedure list.'
  ],
  training_and_onboarding: [
    'First run needs a walkthrough. The team learned the {step} step by trial.',
    'No short guide for a {role} on what to check at a checkpoint.',
    'The practice engagement differs from the live one in field structures.',
    'Office hours answered a question the product should answer in place.'
  ],
  review_workflow: [
    'Edits to the draft conclusion are not visible as a diff to the next reviewer.',
    'A rejected {step} step cannot be rerun on its own. The whole run restarts.',
    'The manager approval and the sign off are two steps that feel like one.',
    'Comments on a run are not shown on the {area} procedure.'
  ],
  integration_with_workpapers: [
    'The conclusion export drops the evidence citations.',
    'Workpaper reference numbers do not carry into the {area} procedure.',
    'Sign off in the platform is not reflected in the workpaper index.',
    'Need the exception list as a table in the workpaper file.'
  ]
};

// Roadmap: 24 items, authored. Rank movement and driving theme only. No item
// counts of any kind and no relation to feedback items.
// [title, driving_theme, before_rank, after_rank, phase_before, phase_after]
const ROADMAP = [
  ['Agent proposed sample selection', 'sample_selection', 1, 9, 'P5', 'P6'],
  ['Field structure editor for methodology reviewers', 'field_structure_fit', 2, 8, 'P5', 'P5'],
  ['Evidence viewer with highlighted source spans', 'evidence_viewer', 3, 4, 'P5', 'P5'],
  ['Batch runs across an audit area', 'performance', 4, 15, 'P5', 'P6'],
  ['Analytical procedure templates', 'field_structure_fit', 5, 17, 'P5', 'P6'],
  ['Conclusion drafting from matched evidence', 'review_workflow', 6, 7, 'P5', 'P5'],
  ['Agent run timeline with step states', 'provenance_visibility', 7, 5, 'P5', 'P5'],
  ['Procedure search and saved filters', 'navigation_and_findability', 8, 10, 'P5', 'P6'],
  ['Review checkpoint before draft conclusion', 'checkpoint_placement', 9, 2, 'P6', 'P5'],
  ['Exception triage queue with severity and owner', 'exception_handling', 10, 3, 'P6', 'P5'],
  ['Workpaper export of conclusions with citations', 'integration_with_workpapers', 11, 12, 'P6', 'P6'],
  ['Provenance panel on every agent output', 'provenance_visibility', 12, 1, 'P6', 'P5'],
  ['Approval step for restricted data retrieval', 'data_access_and_permissions', 13, 6, 'P6', 'P5'],
  ['Confidence display with calibration note', 'provenance_visibility', 14, 11, 'P6', 'P5'],
  ['Rerun from a rejected step', 'review_workflow', 15, 13, 'P6', 'P5'],
  ['Guided first run for new teams', 'training_and_onboarding', 16, 14, 'P6', 'P6'],
  ['Dark theme for long sessions', 'keyboard_and_accessibility', 17, 21, 'P6', 'P7'],
  ['Glossary and in product term definitions', 'terminology', 18, 16, 'P7', 'P6'],
  ['Sign off chain with reopen', 'review_workflow', 19, 18, 'P7', 'P6'],
  ['Keyboard shortcut map and focus order pass', 'keyboard_and_accessibility', 20, 19, 'P7', 'P6'],
  ['Prior year file import', 'data_access_and_permissions', 21, 22, 'P7', 'P7'],
  ['Engagement risk heat map', 'navigation_and_findability', 22, 20, 'P7', 'P7'],
  ['Streaming agent output with reduced motion state', 'performance', 23, 24, 'P7', 'backlog'],
  ['Multi engagement portfolio view', 'navigation_and_findability', 24, 23, 'backlog', 'backlog']
];

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

function genUsers(seed) {
  const rng = makeRng(seed, 'users');
  const all = PERSONA_USERS.concat(INVENTED_USERS);
  if (all.length !== 36) throw new Error(`expected 36 users, got ${all.length}`);
  // Persona users keep their own role. Order the file by role then by name
  // so ids are stable and readable.
  const ordered = ROLES.flatMap((role) => all.filter(([, r]) => r === role));
  return ordered.map(([display_name, role], i) => ({
    id: `USR-${pad(i + 1, 3)}`,
    role,
    display_name,
    region: rng.pick(REGIONS)
  }));
}

function genEngagements(seed, users) {
  const rng = makeRng(seed, 'engagements');
  const byRole = (role) => users.filter((u) => u.role === role).map((u) => u.id);
  const windows = [[0, 80], [20, 100], [70, 150], [100, 180], [140, 220], [170, 250], [200, 280], [225, 305]];
  const industries = rng.shuffle(INDUSTRIES);
  const names = new Set();
  const out = [];
  for (let i = 0; i < 8; i++) {
    let name = entityName(rng);
    while (names.has(name)) name = entityName(rng);
    names.add(name);
    const [start, end] = windows[i];
    const id = `ENG-${pad(i + 1, 4)}`;
    out.push({
      id,
      name,
      industry: industries[i],
      fiscal_year_end_day: start + rng.int(14, 35),
      overall_risk: rng.weighted([['low', 25], ['moderate', 50], ['high', 25]]),
      team: {
        partner: rng.sample(byRole('partner'), 1),
        manager: rng.sample(byRole('manager'), 1),
        senior: rng.sample(byRole('senior'), 2),
        associate: rng.sample(byRole('associate'), 3),
        methodology_reviewer: rng.sample(byRole('methodology_reviewer'), 1),
        data_lead: rng.sample(byRole('data_lead'), 1)
      },
      area_ids: AREAS.map((_, j) => `ARE-${pad(i * 5 + j + 1, 4)}`),
      // internal, stripped before output
      _window: [start, end]
    });
  }
  return out;
}

function genAreas(seed, engagements) {
  const rng = makeRng(seed, 'areas');
  const out = [];
  for (const eng of engagements) {
    AREAS.forEach((name, j) => {
      const p = AREA_PROFILE[name];
      const bump = eng.overall_risk === 'high' ? 1 : eng.overall_risk === 'low' ? -1 : 0;
      const assertion_risk = {};
      for (const a of ASSERTIONS) {
        const base = rng.weighted([['low', 35], ['moderate', 45], ['high', 20]]);
        let idx = RISKS.indexOf(base) + (rng.chance(0.5) ? bump : 0);
        idx = clamp(idx, 0, 2);
        assertion_risk[a] = RISKS[idx];
      }
      out.push({
        id: eng.area_ids[j],
        engagement_id: eng.id,
        name,
        population_count: rng.int(p.count[0], p.count[1]),
        population_amount: Math.round(p.amount[0] + rng.next() * (p.amount[1] - p.amount[0])),
        assertion_risk
      });
    });
  }
  return out;
}

function genFieldStructures(seed) {
  const rng = makeRng(seed, 'field_structures');
  const out = [];
  let n = 0;
  for (const [area, base, assertions, evidence] of FS_BASE) {
    for (const variant of FS_VARIANTS) {
      if (n >= 64) break;
      n++;
      const pool = FIELD_POOL[area];
      const k = rng.int(3, Math.min(6, pool.length));
      const fields = rng.sample(pool, k).map(([name, type]) => ({ name, type }));
      const rule = variant === 'high risk'
        ? rng.weighted([['exact', 60], ['tolerance', 30], ['presence', 10]])
        : rng.weighted([['exact', 30], ['tolerance', 40], ['range', 15], ['presence', 15]]);
      const tolerance = rule === 'tolerance' ? rng.pick([0.005, 0.01, 0.02, 0.05]) : rule === 'range' ? rng.pick([0.05, 0.1]) : 0;
      const applicable = [area];
      if (rng.chance(0.2)) applicable.push(rng.pick(AREAS.filter((a) => a !== area)));
      out.push({
        id: `FS-${pad(n, 3)}`,
        name: variant === 'standard' ? base : `${base} (${variant})`,
        applicable_areas: applicable,
        target_assertions: assertions,
        required_fields: fields,
        evidence_types_required: evidence,
        matching_rule: rule,
        tolerance,
        version: rng.weighted([[1, 50], [2, 35], [3, 15]])
      });
    }
  }
  return out;
}

function procStatusFor(rng, start, due) {
  if (start > AS_OF) return 'planned';
  if (due + 21 <= AS_OF) return rng.weighted([['signed', 72], ['concluded', 22], ['needs_review', 6]]);
  if (due <= AS_OF) return rng.weighted([['concluded', 40], ['needs_review', 35], ['in_progress', 25]]);
  return rng.weighted([['in_progress', 75], ['needs_review', 15], ['planned', 10]]);
}

function genProcedures(seed, engagements, areas, fieldStructures) {
  const rng = makeRng(seed, 'procedures');
  const fsByArea = {};
  for (const fs of fieldStructures) {
    for (const a of fs.applicable_areas) (fsByArea[a] ||= []).push(fs.id);
  }
  const engById = Object.fromEntries(engagements.map((e) => [e.id, e]));
  const out = [];
  let n = 0;
  for (const area of areas) {
    const eng = engById[area.engagement_id];
    const [wStart] = eng._window;
    const types = ['risk_assessment', 'test_of_details', 'test_of_details', rng.pick(['analytical', 'controls'])];
    const highRisk = Object.values(area.assertion_risk).filter((r) => r === 'high').length >= 3;
    for (const type of types) {
      n++;
      const start_day = wStart + (type === 'risk_assessment' ? rng.int(0, 10) : rng.int(8, 55));
      const due_day = start_day + rng.int(14, 30);
      let field_structure_id = null;
      let target_assertions;
      let planned_sample_size;
      if (type === 'test_of_details') {
        field_structure_id = rng.pick(fsByArea[area.name]);
        const fs = fieldStructures.find((f) => f.id === field_structure_id);
        target_assertions = fs.target_assertions;
        planned_sample_size = rng.int(20, 46) + (highRisk ? 5 : 0);
      } else {
        target_assertions = rng.sample(ASSERTIONS_BY_PROC_TYPE[type], rng.int(2, 3));
        target_assertions = ASSERTIONS.filter((a) => target_assertions.includes(a));
        planned_sample_size = type === 'risk_assessment' ? rng.int(3, 8) : type === 'analytical' ? rng.int(5, 15) : rng.int(15, 30);
      }
      out.push({
        id: `PRC-${pad(n, 4)}`,
        area_id: area.id,
        type,
        field_structure_id,
        target_assertions,
        planned_sample_size,
        owner_role: type === 'risk_assessment' ? 'senior' : rng.weighted([['associate', 65], ['senior', 35]]),
        reviewer_role: type === 'risk_assessment' ? 'manager' : rng.weighted([['senior', 55], ['manager', 45]]),
        status: procStatusFor(rng, start_day, due_day),
        start_day,
        due_day
      });
    }
  }
  return out;
}

// Sample items, evidence items, exceptions and their status changes are
// generated together per procedure because they share day indices.
function genFieldwork(seed, engagements, areas, procedures, fieldStructures) {
  const rng = makeRng(seed, 'fieldwork');
  const engById = Object.fromEntries(engagements.map((e) => [e.id, e]));
  const areaById = Object.fromEntries(areas.map((a) => [a.id, a]));
  const fsById = Object.fromEntries(fieldStructures.map((f) => [f.id, f]));
  const sampleItems = [];
  const evidenceItems = [];
  const exceptions = [];
  const statusChanges = [];
  let smpN = 0;
  let evdN = 0;
  let excN = 0;

  // Counterparties recur across a client's documents, so draw from one pool.
  const counterparties = Array.from({ length: 80 }, () => entityName(rng));
  const refValue = (type, sample) => {
    switch (type) {
      case 'amount': return round2(sample.amount * (1 + rng.normal(0, 0.004)));
      case 'date': return sample.tested_day - rng.int(5, 60);
      case 'reference': return `DOC-${pad(rng.int(1, 999999), 6)}`;
      case 'boolean': return rng.chance(0.9);
      default: return rng.pick(counterparties);
    }
  };

  // byDay: the evidence arrived on or before this day (the sample's test day,
  // or the procedure start for evidence shared across its items).
  const makeEvidence = (eng, area, type, sample, fs, byDay) => {
    evdN++;
    const quality = rng.weighted([['clean', 78], ['partial', 16], ['illegible', 6]]);
    const pool = fs ? fs.required_fields : FIELD_POOL[area.name].map(([name, t]) => ({ name, type: t }));
    const picked = rng.sample(pool, rng.int(2, Math.min(4, pool.length)));
    const extracted_fields = {};
    for (const f of picked) {
      extracted_fields[f.name] = quality === 'illegible' && rng.chance(0.5) ? null : refValue(f.type, sample);
    }
    const page_count = type === 'contract' ? rng.int(4, 40) : type === 'bank_statement' ? rng.int(2, 12) : rng.int(1, 4);
    const spanCount = quality === 'illegible' ? 1 : rng.chance(0.3) ? 2 : 1;
    const highlight_spans = [];
    for (let s = 0; s < spanCount && s < picked.length; s++) {
      highlight_spans.push({
        page: rng.int(1, page_count),
        field: picked[s].name,
        x: round2(rng.next() * 0.7),
        y: round2(0.08 + rng.next() * 0.8),
        w: round2(0.1 + rng.next() * 0.2),
        h: round3(0.015 + rng.next() * 0.015)
      });
    }
    const ev = {
      id: `EVD-${pad(evdN, 5)}`,
      engagement_id: eng.id,
      area_id: area.id,
      type,
      source_system: rng.weighted(SOURCE_BY_EVIDENCE[type]),
      data_class: rng.weighted(DATA_CLASS_BY_EVIDENCE[type]),
      received_day: clamp(byDay - rng.int(0, 25), eng._window[0] - 10, AS_OF),
      page_count,
      extracted_fields,
      quality,
      highlight_spans
    };
    evidenceItems.push(ev);
    return ev;
  };

  for (const proc of procedures) {
    if (proc.status === 'planned') continue;
    const area = areaById[proc.area_id];
    const eng = engById[area.engagement_id];
    const fs = proc.field_structure_id ? fsById[proc.field_structure_id] : null;
    const evidenceTypes = fs ? fs.evidence_types_required : AREA_PROFILE[area.name].evidence;
    const lastTestDay = Math.min(proc.due_day, AS_OF);
    const share = proc.status === 'in_progress' ? 0.55 + rng.next() * 0.4 : 1;
    const count = Math.max(1, Math.round(proc.planned_sample_size * share));
    const agentShare = { R0: 0.1, R1: 0.25, R2: 0.4, R3: 0.5, R4: 0.55 }[releaseForDay(proc.start_day)];
    const methodMix = [['random', 30], ['monetary_unit', 30], ['judgmental', 15], ['agent_proposed', Math.round(100 * agentShare)]];
    // Shared evidence covers several items of one procedure (bank statements, reports).
    const sharedTypes = evidenceTypes.filter((t) => t === 'bank_statement' || t === 'system_report');
    const sharedCount = sharedTypes.length ? rng.int(1, 3) : 0;
    const shared = [];
    const excRateBase = proc.type === 'test_of_details' ? 0.07 : proc.type === 'controls' ? 0.06 : 0.03;

    for (let i = 0; i < count; i++) {
      smpN++;
      const tested_day = rng.int(proc.start_day, lastTestDay);
      const amount = round2(clamp(rng.lognormal(24000, 1.1), 200, 2500000));
      const sample = {
        id: `SMP-${pad(smpN, 5)}`,
        procedure_id: proc.id,
        population_ref: `${AREA_CODE[area.name]}-${pad(rng.int(1, area.population_count), 6)}`,
        amount,
        selection_method: rng.weighted(methodMix),
        evidence_ids: [],
        match_status: 'matched',
        tested_day
      };
      while (shared.length < sharedCount) {
        shared.push(makeEvidence(eng, area, rng.pick(sharedTypes), sample, fs, proc.start_day));
      }
      const ownTypes = evidenceTypes.filter((t) => !sharedTypes.includes(t));
      const ownCount = ownTypes.length ? rng.int(1, 2) : 0;
      for (let k = 0; k < ownCount; k++) {
        sample.evidence_ids.push(makeEvidence(eng, area, rng.pick(ownTypes), sample, fs, tested_day).id);
      }
      if (shared.length && (ownCount === 0 || rng.chance(0.5))) sample.evidence_ids.push(rng.pick(shared).id);
      if (sample.evidence_ids.length === 0) sample.evidence_ids.push(makeEvidence(eng, area, rng.pick(evidenceTypes), sample, fs, tested_day).id);

      // Exceptions
      if (rng.chance(excRateBase)) {
        excN++;
        sample.match_status = 'exception';
        const type = rng.weighted([['amount_mismatch', 34], ['cutoff', 18], ['missing_evidence', 20], ['unauthorized', 8], ['duplicate', 8], ['conflicting_evidence', 12]]);
        let amount_difference;
        switch (type) {
          case 'amount_mismatch': amount_difference = round2(amount * (0.005 + rng.next() * 0.15) * (rng.chance(0.5) ? 1 : -1)); break;
          case 'conflicting_evidence': amount_difference = round2(amount * (0.002 + rng.next() * 0.04) * (rng.chance(0.5) ? 1 : -1)); break;
          case 'cutoff': amount_difference = round2(amount * (rng.chance(0.5) ? 1 : -1)); break;
          default: amount_difference = round2(amount);
        }
        const absDiff = Math.abs(amount_difference);
        const severity = absDiff > 75000 ? 'high' : absDiff > 12000 ? 'moderate' : rng.weighted([['low', 80], ['moderate', 20]]);
        const detected_by = rng.chance(0.3 + agentShare * 0.7) ? 'agent' : 'auditor';
        const opened_day = tested_day;
        const procDone = proc.status === 'signed' || proc.status === 'concluded';
        let status;
        if (procDone) status = rng.weighted([['explained', 62], ['waived', 24], ['misstatement', 14]]);
        else status = rng.weighted([['open', 20], ['investigating', 30], ['explained', 32], ['waived', 10], ['misstatement', 8]]);
        const investigatingDay = opened_day + rng.int(1, 6);
        let resolved_day = null;
        if (status !== 'open' && investigatingDay > AS_OF) status = 'open';
        if (status !== 'open' && status !== 'investigating') {
          resolved_day = investigatingDay + Math.round(clamp(rng.lognormal(9, 0.7), 1, 45));
          if (resolved_day > AS_OF) { status = 'investigating'; resolved_day = null; }
        }
        const resolver_role = status === 'open' ? null : status === 'investigating' ? rng.weighted([['associate', 50], ['senior', 50]]) : rng.weighted([['senior', 55], ['manager', 40], ['partner', 5]]);
        const exc = {
          id: `EXC-${pad(excN, 4)}`,
          procedure_id: proc.id,
          sample_item_id: sample.id,
          type,
          amount_difference,
          severity,
          detected_by,
          status,
          opened_day,
          resolved_day,
          resolver_role
        };
        exceptions.push(exc);
        statusChanges.push({ exception_id: exc.id, day: opened_day, status: 'open', actor_role: detected_by === 'agent' ? 'associate' : rng.weighted([['associate', 60], ['senior', 40]]) });
        if (status !== 'open') statusChanges.push({ exception_id: exc.id, day: investigatingDay, status: 'investigating', actor_role: rng.weighted([['associate', 50], ['senior', 50]]) });
        if (resolved_day !== null) statusChanges.push({ exception_id: exc.id, day: resolved_day, status, actor_role: resolver_role });
      } else if (rng.chance(proc.status === 'in_progress' ? 0.18 : proc.status === 'needs_review' ? 0.08 : 0.02)) {
        sample.match_status = 'unresolved';
      }
      sampleItems.push(sample);
    }
  }
  return { sampleItems, evidenceItems, exceptions, statusChanges };
}

// Agent runs, their steps and the human review actions on them.
function genAgentRuns(seed, procedures, sampleItems, evidenceItems, fieldStructures) {
  const rng = makeRng(seed, 'agent');
  const samplesByProc = {};
  for (const s of sampleItems) (samplesByProc[s.procedure_id] ||= []).push(s);
  const evById = Object.fromEntries(evidenceItems.map((e) => [e.id, e]));
  const fsById = Object.fromEntries(fieldStructures.map((f) => [f.id, f]));
  const runs = [];
  const steps = [];
  const actions = [];
  let runN = 0;
  let rvaN = 0;
  let inFlightSeen = 0;

  // Quota balancer: pick the allowed outcome whose realized share in the
  // release sits furthest below its target share.
  const tallies = Object.fromEntries(RELEASES.map((r) => [r.id, { approved: 0, edited: 0, rejected: 0, n: 0 }]));
  function pickOutcome(release_id, allowed) {
    const t = tallies[release_id];
    const mix = OUTCOME_MIX[release_id];
    const total = mix.approved + mix.edited + mix.rejected;
    let best = allowed[0];
    let bestGap = -Infinity;
    for (const o of allowed) {
      const gap = mix[o] / total - (t.n ? t[o] / t.n : 0);
      if (gap > bestGap) { bestGap = gap; best = o; }
    }
    t[best]++;
    t.n++;
    return best;
  }

  const stepDuration = { plan: [1, 3], evidence_retrieval: [2, 12], extraction: [3, 15], matching: [2, 8], exception_detection: [1, 5], draft_conclusion: [2, 6] };

  function buildRun(proc, started_day, rerun_of) {
    runN++;
    const id = `RUN-${pad(runN, 4)}`;
    const release_id = releaseForDay(started_day);
    const samples = samplesByProc[proc.id] || [];
    const batch = rng.sample(samples, rng.int(Math.min(4, samples.length), Math.min(10, samples.length)));
    const evidenceIds = [];
    for (const s of batch) for (const e of s.evidence_ids) if (!evidenceIds.includes(e)) evidenceIds.push(e);
    const touchesRestricted = evidenceIds.some((e) => evById[e].data_class === 'restricted');
    const checkpoints_required = touchesRestricted ? ['evidence_retrieval', 'draft_conclusion'] : ['draft_conclusion'];
    const inFlight = started_day >= AS_OF - 3;
    const lateReview = !inFlight && started_day >= AS_OF - 14 && rng.chance(0.2);

    // Failure first, then outcome conditioned on it.
    let failure_type = 'none';
    if (rng.chance(FAILURE_SHARE[release_id] * (rerun_of ? 0.4 : 1))) failure_type = rng.weighted(FAILURE_MIX);

    let state;
    let outcome = 'none';
    if (inFlight) {
      // The first four in flight runs cycle through the four in flight states
      // so every state appears at least once in the dataset.
      const forced = ['queued', 'planning', 'running', 'needs_review'];
      state = rerun_of ? 'rerun' : inFlightSeen < forced.length ? forced[inFlightSeen] : rng.weighted([['queued', 20], ['planning', 15], ['running', 30], ['needs_review', 35]]);
      if (!rerun_of) inFlightSeen++;
    } else if (lateReview) {
      state = 'needs_review';
    } else {
      // Failures narrow the allowed outcomes. Within what is allowed, a quota
      // balancer per release keeps realized shares on the OUTCOME_MIX targets,
      // so the trend in chart 12c does not depend on sampling noise.
      let allowed = ['approved', 'edited', 'rejected'];
      if (failure_type === 'source_unavailable' || failure_type === 'timeout') allowed = ['rejected'];
      else if (failure_type === 'conflicting_evidence') allowed = ['edited', 'rejected'];
      else if (failure_type === 'low_confidence') allowed = rng.chance(0.85) ? ['edited', 'rejected'] : allowed;
      outcome = pickOutcome(release_id, allowed);
      const procDone = proc.status === 'signed' || proc.status === 'concluded';
      state = outcome === 'rejected' ? 'rejected' : procDone && rng.chance(0.85) ? 'concluded' : outcome;
    }

    let confidence;
    if (failure_type === 'low_confidence') confidence = rng.normal(0.52, 0.05);
    else if (outcome === 'approved') confidence = rng.normal(0.86, 0.06);
    else if (outcome === 'edited') confidence = rng.normal(0.75, 0.08);
    else if (outcome === 'rejected') confidence = rng.normal(0.64, 0.1);
    else confidence = rng.normal(0.78, 0.1);
    confidence = round2(clamp(confidence, 0.3, 0.99));
    if (failure_type === 'low_confidence') confidence = Math.min(confidence, 0.59);

    const human_review_minutes = outcome === 'none' ? null
      : Math.round(clamp(rng.lognormal(outcome === 'edited' ? 45 : outcome === 'approved' ? 20 : 15, 0.7), 3, 480));

    const run = {
      id, procedure_id: proc.id, release_id, started_day, state, confidence, checkpoints_required,
      outcome, failure_type, rerun_of: rerun_of || null, human_review_minutes
    };
    runs.push(run);

    // Steps. The failing step and the rejected step decide statuses.
    const failStep = failure_type === 'source_unavailable' ? 1 : failure_type === 'timeout' ? rng.pick([1, 2]) : -1;
    let rejectStep = -1;
    if (outcome === 'rejected') {
      if (failStep >= 0) rejectStep = failStep;
      else if (failure_type === 'conflicting_evidence') rejectStep = 3;
      else rejectStep = rng.weighted([[5, 60], [3, 25], [2, 15]]);
    }
    // Where an in flight run currently is.
    let liveStep = 6;
    if (state === 'queued') liveStep = 0;
    else if (state === 'planning') liveStep = 0;
    else if (state === 'running' || state === 'rerun') liveStep = rng.int(1, 4);
    else if (state === 'needs_review') {
      liveStep = failStep >= 0 ? failStep : (checkpoints_required.includes('evidence_retrieval') && rng.chance(0.35)) ? 1 : 5;
    }

    let minute = 0;
    let draftMinute = null;
    const exceptionsInBatch = batch.filter((s) => s.match_status === 'exception').length;
    const sources = [...new Set(evidenceIds.map((e) => evById[e].source_system))];
    const fsName = proc.field_structure_id ? fsById[proc.field_structure_id].name : proc.type.replace(/_/g, ' ');
    STEP_TYPES.forEach((type, index) => {
      let status;
      let started_minute = null;
      let duration_minutes = null;
      let rejected_reason = null;
      const reached = index < liveStep || (index === liveStep && state === 'needs_review');
      const stopped = failStep >= 0 && index > failStep;
      if (!reached && !stopped) status = null;
      else if (stopped) status = 'skipped';
      else {
        started_minute = minute;
        const [lo, hi] = stepDuration[type];
        duration_minutes = rng.int(lo, hi);
        if (failure_type === 'timeout' && index === failStep) duration_minutes = rng.int(30, 60);
        minute += duration_minutes;
        if (index === failStep) { status = 'failed'; rejected_reason = rng.pick(REJECT_REASONS[type]); }
        else if (index === rejectStep) { status = 'rejected'; rejected_reason = rng.pick(REJECT_REASONS[type]); }
        else if (state === 'needs_review' && index === liveStep) status = 'needs_review';
        else status = 'done';
        if (type === 'draft_conclusion') draftMinute = minute;
      }
      let output_summary = null;
      if (status !== null && status !== 'skipped') {
        switch (type) {
          case 'plan': output_summary = `Planned ${batch.length} sample items against ${fsName}`; break;
          case 'evidence_retrieval': output_summary = status === 'failed'
            ? `Retrieval stopped: ${rejected_reason.toLowerCase()}`
            : `Retrieved ${evidenceIds.length} evidence items from ${sources.join(' and ')}`; break;
          case 'extraction': {
            const partial = evidenceIds.filter((e) => evById[e].quality !== 'clean').length;
            output_summary = status === 'failed' ? `Extraction stopped: ${rejected_reason.toLowerCase()}` : `Extracted fields from ${evidenceIds.length} items with ${partial} partial reads`; break;
          }
          case 'matching': output_summary = `Matched ${batch.length - exceptionsInBatch} of ${batch.length} items within rule${failure_type === 'conflicting_evidence' ? '. Two sources disagree on one amount' : ''}`; break;
          case 'exception_detection': output_summary = exceptionsInBatch ? `Flagged ${exceptionsInBatch} candidate exceptions` : 'No exceptions flagged'; break;
          case 'draft_conclusion': output_summary = `Drafted conclusion citing ${Math.min(evidenceIds.length, 6)} evidence items with ${exceptionsInBatch} exceptions noted`; break;
        }
      }
      const stepConf = status === null || status === 'skipped' ? null : round2(clamp(type === 'plan' ? 0.9 + rng.next() * 0.09 : confidence + rng.normal(0, 0.05), 0.2, 0.99));
      steps.push({
        run_id: id,
        index,
        type,
        started_minute,
        duration_minutes,
        input_refs: type === 'plan' ? [proc.id].concat(proc.field_structure_id ? [proc.field_structure_id] : []).concat(batch.map((s) => s.id)) : [`${id}#${index - 1}`],
        source_evidence_ids: ['evidence_retrieval', 'extraction', 'matching'].includes(type) && status !== null && status !== 'skipped' ? evidenceIds : [],
        output_summary,
        confidence: stepConf,
        status,
        rejected_reason
      });
    });

    // Review actions.
    const draftAt = draftMinute === null ? minute : draftMinute;
    const push = (actor_role, action, step_index, minutes_since_draft, edit_diff_size) => {
      rvaN++;
      actions.push({
        id: `RVA-${pad(rvaN, 5)}`,
        run_id: id,
        step_index,
        actor_role,
        action,
        day: Math.min(AS_OF, started_day + Math.floor((draftAt + minutes_since_draft) / 1440)),
        minutes_since_draft: Math.round(minutes_since_draft),
        edit_diff_size: edit_diff_size ?? null
      });
    };
    const latencyMedian = { R0: 95, R1: 80, R2: 60, R3: 48, R4: 40 }[release_id];
    if (outcome === 'approved' || outcome === 'edited') {
      let t = clamp(rng.lognormal(12, 0.8), 2, 300);
      if (rng.chance(0.3)) push(rng.weighted([['senior', 70], ['methodology_reviewer', 30]]), 'comment', rng.chance(0.5) ? 5 : null, t);
      if (outcome === 'edited') {
        t += clamp(rng.lognormal(20, 0.8), 3, 400);
        push('senior', 'edit', 5, t, rng.int(20, 800));
      } else {
        t += clamp(rng.lognormal(8, 0.8), 1, 200);
        push('senior', 'approve', 5, t);
      }
      t += clamp(rng.lognormal(latencyMedian, 0.9), 5, 4000);
      push('manager', 'approve', null, t);
      if (state === 'concluded') push(rng.weighted([['manager', 70], ['partner', 30]]), 'sign', null, t + clamp(rng.lognormal(240, 0.8), 30, 6000));
    } else if (outcome === 'rejected') {
      let t = clamp(rng.lognormal(15, 0.8), 2, 400);
      const actor = rng.weighted([['senior', 60], ['manager', 35], ['methodology_reviewer', 5]]);
      push(actor, 'reject_step', rejectStep, t);
      if (rng.chance(0.5)) push(actor, 'comment', rejectStep, t + rng.int(1, 10));
      run._rerunRequested = rng.chance(0.7);
      if (run._rerunRequested) push(actor, 'request_rerun', null, t + rng.int(2, 30));
    } else if (state === 'needs_review' && rng.chance(0.4)) {
      push('senior', 'comment', liveStep, clamp(rng.lognormal(30, 0.8), 2, 500));
    }
    return run;
  }

  for (const proc of procedures) {
    if (proc.status === 'planned' || !samplesByProc[proc.id]) continue;
    const count = proc.type === 'test_of_details' ? rng.int(3, 7) : rng.int(1, 3);
    const lastStart = Math.min(proc.due_day + 3, AS_OF);
    for (let i = 0; i < count; i++) {
      const started_day = rng.int(proc.start_day, Math.max(proc.start_day, lastStart));
      const run = buildRun(proc, started_day, null);
      if (run._rerunRequested) {
        const rerunDay = started_day + rng.int(1, 4);
        if (rerunDay <= AS_OF) buildRun(proc, rerunDay, run.id);
      }
    }
  }
  // Guarantee one run in state rerun: re-execute the latest rejected run
  // that has no rerun yet, starting the day before the as of day.
  if (!runs.some((r) => r.state === 'rerun')) {
    const hasRerun = new Set(runs.filter((r) => r.rerun_of).map((r) => r.rerun_of));
    const candidates = runs.filter((r) => r.state === 'rejected' && !hasRerun.has(r.id) && r.started_day < AS_OF - 1)
      .sort((a, b) => b.started_day - a.started_day || a.id.localeCompare(b.id));
    if (candidates.length) {
      const original = candidates[0];
      const proc = procedures.find((p) => p.id === original.procedure_id);
      if (!original._rerunRequested) {
        rvaN++;
        actions.push({ id: `RVA-${pad(rvaN, 5)}`, run_id: original.id, step_index: null, actor_role: 'senior', action: 'request_rerun', day: AS_OF - 1, minutes_since_draft: (AS_OF - 1 - original.started_day) * 1440, edit_diff_size: null });
      }
      buildRun(proc, AS_OF - 1, original.id);
    }
  }
  for (const r of runs) delete r._rerunRequested;
  return { runs, steps, actions };
}

function genConclusionsAndSignOffs(seed, procedures, runs, steps, sampleItems, exceptions, areas, engagements) {
  const rng = makeRng(seed, 'conclusions');
  const runsByProc = {};
  for (const r of runs) (runsByProc[r.procedure_id] ||= []).push(r);
  // Evidence a run touched: the list on its evidence_retrieval step.
  const runEvidence = {};
  for (const s of steps) if (s.type === 'evidence_retrieval') runEvidence[s.run_id] = s.source_evidence_ids;
  const samplesByProc = {};
  for (const s of sampleItems) (samplesByProc[s.procedure_id] ||= []).push(s);
  const excByProc = {};
  for (const e of exceptions) (excByProc[e.procedure_id] ||= []).push(e.id);
  const areaById = Object.fromEntries(areas.map((a) => [a.id, a]));
  const engById = Object.fromEntries(engagements.map((e) => [e.id, e]));
  const conclusions = [];
  const signOffs = [];
  let sgnN = 0;

  procedures.forEach((proc, i) => {
    const accepted = (runsByProc[proc.id] || [])
      .filter((r) => r.outcome === 'approved' || r.outcome === 'edited')
      .sort((a, b) => a.started_day - b.started_day || a.id.localeCompare(b.id));
    const run = accepted.length ? accepted[accepted.length - 1] : null;
    // An agent drafted conclusion cites evidence its run touched. An auditor
    // drafted one cites evidence from the procedure's sample items.
    let evidence = run ? (runEvidence[run.id] || []).slice() : [];
    if (evidence.length < 3) {
      evidence = [];
      for (const s of samplesByProc[proc.id] || []) for (const e of s.evidence_ids) if (!evidence.includes(e)) evidence.push(e);
    }
    const status = proc.status === 'planned' || proc.status === 'in_progress' ? 'draft'
      : proc.status === 'needs_review' ? rng.weighted([['draft', 40], ['reviewed', 60]])
      : proc.status === 'concluded' ? 'reviewed' : 'final';
    conclusions.push({
      id: `CON-${pad(i + 1, 4)}`,
      procedure_id: proc.id,
      run_id: run ? run.id : null,
      drafted_by: run ? 'agent' : 'auditor',
      template_id: rng.pick(TEMPLATE_IDS),
      cited_evidence_ids: rng.sample(evidence, Math.min(evidence.length, rng.int(3, 8))).sort(),
      exception_ids: (excByProc[proc.id] || []).slice(),
      version: run && run.outcome === 'edited' ? rng.int(2, 3) : rng.weighted([[1, 70], [2, 30]]),
      status
    });

    if (proc.status === 'planned') return;
    const area = areaById[proc.area_id];
    const eng = engById[area.engagement_id];
    const highRisk = eng.overall_risk === 'high' || Object.values(area.assertion_risk).filter((r) => r === 'high').length >= 3;
    const roles = ['senior', 'manager'].concat(highRisk || rng.chance(0.2) ? ['partner'] : []);
    const baseDay = Math.min(proc.due_day, AS_OF);
    let day = baseDay + rng.int(0, 4);
    roles.forEach((role, k) => {
      sgnN++;
      let signStatus;
      if (proc.status === 'signed') signStatus = 'signed';
      else if (proc.status === 'concluded') signStatus = k === 0 ? 'signed' : 'pending';
      else signStatus = k === 0 && rng.chance(0.3) ? 'signed' : 'pending';
      if (signStatus === 'signed' && rng.chance(0.05)) signStatus = 'reopened';
      signOffs.push({ id: `SGN-${pad(sgnN, 4)}`, procedure_id: proc.id, role, day: Math.min(day, AS_OF), status: signStatus });
      day += rng.int(1, 6);
    });
  });
  return { conclusions, signOffs };
}

function genFeedback(seed) {
  const rng = makeRng(seed, 'feedback');
  const r1 = RELEASES[1];
  const themeTeams = {};
  for (const t of THEMES) themeTeams[t] = rng.sample(TEAM_IDS, THEME_TEAM_REACH[t]);
  const themePairs = THEMES.map((t) => [t, THEME_WEIGHT[t]]);
  const items = [];
  for (let i = 0; i < 1600; i++) {
    const theme = rng.weighted(themePairs);
    const sev = rng.weighted(THEME_SEVERITY[theme].map((w, k) => [k + 1, w]));
    const role = rng.weighted(FB_ROLE_MIX);
    const area = rng.weighted(THEME_AREA[theme]);
    const areaWord = rng.pick(AREAS).replace(/_/g, ' ');
    const text = rng.pick(FB_TEXT[theme])
      .replace('{area}', areaWord)
      .replace('{step}', rng.pick(STEP_TYPES).replace(/_/g, ' '))
      .replace('{role}', role.replace(/_/g, ' '));
    items.push({
      id: `FB-${pad(i + 1, 4)}`,
      team_id: rng.pick(themeTeams[theme]),
      role,
      area,
      theme,
      type: rng.weighted(THEME_TYPE[theme]),
      severity: sev,
      frequency: 0,
      status: rng.weighted(FB_STATUS_MIX),
      // Reports cluster in the middle weeks of the dry run window.
      submitted_day: clamp(Math.round(rng.normal((r1.start_day + r1.end_day) / 2, 12)), r1.start_day, r1.end_day),
      text
    });
  }
  // frequency: distinct teams reporting the same theme across the repository.
  const seen = {};
  for (const it of items) (seen[it.theme] ||= new Set()).add(it.team_id);
  for (const it of items) it.frequency = seen[it.theme].size;
  return items;
}

function genRoadmap() {
  const before = ROADMAP.map((r) => r[2]).sort((a, b) => a - b);
  const after = ROADMAP.map((r) => r[3]).sort((a, b) => a - b);
  for (let i = 0; i < 24; i++) {
    if (before[i] !== i + 1 || after[i] !== i + 1) throw new Error('roadmap ranks must each be a permutation of 1..24');
  }
  return ROADMAP.map(([title, driving_theme, before_rank, after_rank, phase_before, phase_after], i) => ({
    id: `RM-${pad(i + 1, 3)}`, title, before_rank, after_rank, driving_theme, phase_before, phase_after
  }));
}

// ---------------------------------------------------------------------------
// Chart aggregates (shapes documented in README.md)
// ---------------------------------------------------------------------------

function quantile(sorted, q) {
  if (!sorted.length) return null;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return round2(sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo));
}

function buildCharts(seed, d) {
  const engById = Object.fromEntries(d.engagement.map((e) => [e.id, e]));
  const procById = Object.fromEntries(d.procedure.map((p) => [p.id, p]));
  const sourceNote = `${ILLUSTRATIVE} ${seed}`;

  // 12a coverage: per audit area, population against tested against exceptions.
  const tested = {};
  for (const s of d.sample_item) {
    const areaId = procById[s.procedure_id].area_id;
    const t = (tested[areaId] ||= { count: 0, amount: 0 });
    t.count++;
    t.amount += s.amount;
  }
  const excByArea = {};
  for (const e of d.exception) {
    const areaId = procById[e.procedure_id].area_id;
    const t = (excByArea[areaId] ||= { count: 0, amount: 0 });
    t.count++;
    t.amount += Math.abs(e.amount_difference);
  }
  const coverage = {
    label: sourceNote,
    derivation: 'tested_count and tested_amount sum sample_item rows whose procedure belongs to the area. exception_count counts exception rows through the same path; exception_amount sums the absolute amount_difference. coverage_amount_pct is tested_amount over population_amount.',
    areas: d.audit_area.map((a) => {
      const t = tested[a.id] || { count: 0, amount: 0 };
      const x = excByArea[a.id] || { count: 0, amount: 0 };
      return {
        area_id: a.id, engagement_id: a.engagement_id, engagement: engById[a.engagement_id].name, area: a.name,
        population_count: a.population_count, population_amount: a.population_amount,
        tested_count: t.count, tested_amount: round2(t.amount),
        exception_count: x.count, exception_amount: round2(x.amount),
        coverage_count_pct: round2(100 * t.count / a.population_count),
        coverage_amount_pct: round2(100 * t.amount / a.population_amount)
      };
    })
  };

  // 12b funnel: exception_status_change by status and week.
  const weeks = Math.floor(AS_OF / 7) + 1;
  const byWeek = Array.from({ length: weeks }, (_, w) => ({ week: w, day_start: w * 7, open: 0, investigating: 0, explained: 0, misstatement: 0, waived: 0 }));
  const counts = Object.fromEntries(EXC_STATUSES.map((s) => [s, 0]));
  for (const c of d.exception_status_change) {
    byWeek[Math.floor(c.day / 7)][c.status]++;
    counts[c.status]++;
  }
  const cumulative = [];
  const acc = Object.fromEntries(EXC_STATUSES.map((s) => [s, 0]));
  for (const w of byWeek) {
    for (const s of EXC_STATUSES) acc[s] += w[s];
    cumulative.push({ week: w.week, day_start: w.day_start, ...acc });
  }
  const openDay = {};
  for (const c of d.exception_status_change) if (c.status === 'open') openDay[c.exception_id] = c.day;
  const toInvestigating = [];
  const toResolved = [];
  for (const c of d.exception_status_change) {
    if (c.status === 'investigating') toInvestigating.push(c.day - openDay[c.exception_id]);
    else if (c.status !== 'open') toResolved.push(c.day - openDay[c.exception_id]);
  }
  toInvestigating.sort((a, b) => a - b);
  toResolved.sort((a, b) => a - b);
  const funnel = {
    label: sourceNote,
    derivation: 'One exception_status_change row per transition. stages counts rows per status, so open is every exception ever opened and the three terminal statuses sum to the resolved count. by_week counts transitions in the week of their day; cumulative_by_week runs the totals forward. days_to_stage measures from the open row of the same exception.',
    stages: EXC_STATUSES.map((s) => ({ status: s, count: counts[s] })),
    resolved_total: counts.explained + counts.misstatement + counts.waived,
    by_week: byWeek,
    cumulative_by_week: cumulative,
    days_to_stage: {
      investigating: { n: toInvestigating.length, median: quantile(toInvestigating, 0.5), p90: quantile(toInvestigating, 0.9) },
      resolved: { n: toResolved.length, median: quantile(toResolved, 0.5), p90: quantile(toResolved, 0.9) }
    }
  };

  // 12c outcomes by release.
  const outcomes = {
    label: `${sourceNote}. The trend across releases is illustrative`,
    derivation: 'agent_run rows grouped by release_id and outcome. in_flight counts runs whose outcome is none. Shares divide by runs with an outcome.',
    releases: RELEASES.map((r) => {
      const rows = d.agent_run.filter((x) => x.release_id === r.id);
      const n = (o) => rows.filter((x) => x.outcome === o).length;
      const decided = n('approved') + n('edited') + n('rejected');
      return {
        release_id: r.id, name: r.name, start_day: r.start_day, end_day: r.end_day,
        approved: n('approved'), edited: n('edited'), rejected: n('rejected'), in_flight: n('none'), total: rows.length,
        approved_share: decided ? round2(n('approved') / decided) : null,
        edited_share: decided ? round2(n('edited') / decided) : null,
        rejected_share: decided ? round2(n('rejected') / decided) : null
      };
    })
  };

  // 12d latency: manager approvals, minutes since draft.
  const runById = Object.fromEntries(d.agent_run.map((r) => [r.id, r]));
  const approvals = d.review_action.filter((a) => a.action === 'approve' && a.actor_role === 'manager');
  const values = approvals.map((a) => a.minutes_since_draft).sort((a, b) => a - b);
  const edges = [0, 15, 30, 60, 120, 240, 480, 960, 1920, 3840, Infinity];
  const bins = [];
  for (let i = 0; i < edges.length - 1; i++) {
    const lo = edges[i];
    const hi = edges[i + 1];
    bins.push({ lo, hi: hi === Infinity ? null : hi, label: hi === Infinity ? `${lo}+` : `${lo} to ${hi}`, count: values.filter((v) => v >= lo && v < hi).length });
  }
  const latency = {
    label: sourceNote,
    unit: 'minutes',
    derivation: 'review_action rows where action is approve and actor_role is manager. Each run carries at most one such row. minutes_since_draft counts from the end of the draft_conclusion step. Bins are left closed and right open.',
    n: values.length,
    summary: { median: quantile(values, 0.5), p75: quantile(values, 0.75), p90: quantile(values, 0.9), p95: quantile(values, 0.95), max: values.length ? values[values.length - 1] : null },
    bins,
    by_release: RELEASES.map((r) => {
      const v = approvals.filter((a) => runById[a.run_id].release_id === r.id).map((a) => a.minutes_since_draft).sort((a, b) => a - b);
      return { release_id: r.id, name: r.name, n: v.length, median: quantile(v, 0.5), p90: quantile(v, 0.9) };
    }),
    values
  };

  // 12e lineage for one conclusion.
  const stepsByRun = {};
  for (const s of d.agent_run_step) (stepsByRun[s.run_id] ||= []).push(s);
  const evById = Object.fromEntries(d.evidence_item.map((e) => [e.id, e]));
  const excById = Object.fromEntries(d.exception.map((e) => [e.id, e]));
  const candidates = d.conclusion.filter((c) => c.status === 'final' && c.run_id && c.exception_ids.length >= 1 && c.cited_evidence_ids.length >= 4
    && runById[c.run_id].checkpoints_required.length === 2 && runById[c.run_id].state === 'concluded');
  const pickFrom = candidates.length ? candidates : d.conclusion.filter((c) => c.run_id);
  const chosen = pickFrom.sort((a, b) => a.id.localeCompare(b.id))[0];
  const run = runById[chosen.run_id];
  const nodes = [];
  const links = [];
  const addNode = (n) => { if (!nodes.find((x) => x.id === n.id)) nodes.push(n); };
  const addLink = (source, target, type) => links.push({ source, target, type });
  const proc = procById[chosen.procedure_id];
  addNode({ id: chosen.id, type: 'conclusion', label: `Conclusion ${chosen.id}`, status: chosen.status, drafted_by: chosen.drafted_by, version: chosen.version });
  addNode({ id: run.id, type: 'run', label: `Run ${run.id}`, state: run.state, confidence: run.confidence, release_id: run.release_id, checkpoints_required: run.checkpoints_required });
  addNode({ id: proc.id, type: 'procedure', label: `Procedure ${proc.id}`, procedure_type: proc.type, target_assertions: proc.target_assertions });
  addLink(proc.id, run.id, 'executes');
  addLink(run.id, chosen.id, 'produces');
  const steps = (stepsByRun[run.id] || []).slice().sort((a, b) => a.index - b.index);
  let prev = null;
  for (const s of steps) {
    const sid = `${run.id}#${s.index}`;
    addNode({ id: sid, type: 'step', label: s.type.replace(/_/g, ' '), step_type: s.type, status: s.status, confidence: s.confidence, checkpoint: run.checkpoints_required.includes(s.type), output_summary: s.output_summary });
    if (prev) addLink(prev, sid, 'next');
    prev = sid;
  }
  for (const eid of chosen.cited_evidence_ids) {
    const ev = evById[eid];
    addNode({ id: ev.source_system, type: 'source', label: ev.source_system.replace(/_/g, ' ') });
    addNode({ id: eid, type: 'evidence', label: `${ev.type.replace(/_/g, ' ')} ${eid}`, evidence_type: ev.type, data_class: ev.data_class, quality: ev.quality, received_day: ev.received_day });
    addLink(ev.source_system, eid, 'provides');
    addLink(eid, `${run.id}#1`, 'retrieved_by');
    addLink(eid, chosen.id, 'cited_by');
  }
  // Sample items in this run's batch sit on the plan step. Exceptions on
  // those items were flagged by this run. The conclusion addresses every
  // exception of the procedure, including ones other runs or auditors raised.
  const batchIds = new Set((steps[0] ? steps[0].input_refs : []).filter((r) => r.startsWith('SMP-')));
  for (const xid of chosen.exception_ids) {
    const x = excById[xid];
    addNode({ id: xid, type: 'exception', label: `${x.type.replace(/_/g, ' ')} ${xid}`, exception_type: x.type, severity: x.severity, status: x.status, detected_by: x.detected_by, flagged_by_this_run: batchIds.has(x.sample_item_id) });
    if (batchIds.has(x.sample_item_id)) addLink(`${run.id}#4`, xid, 'flags');
    addLink(xid, chosen.id, 'addressed_in');
  }
  for (const a of d.review_action.filter((x) => x.run_id === run.id)) {
    addNode({ id: a.id, type: 'review_action', label: `${a.action.replace(/_/g, ' ')} by ${a.actor_role.replace(/_/g, ' ')}`, action: a.action, actor_role: a.actor_role, day: a.day, minutes_since_draft: a.minutes_since_draft });
    addLink(a.step_index === null ? `${run.id}#5` : `${run.id}#${a.step_index}`, a.id, 'reviewed_by');
  }
  const lineage = {
    label: sourceNote,
    derivation: 'One conclusion with status final, drafted by an agent run that touched restricted evidence (two checkpoints). Nodes: the procedure, the run, its six steps, every cited evidence item and its source system, every exception the conclusion addresses and every review action on the run. Links name the relation.',
    conclusion_id: chosen.id,
    run_id: run.id,
    procedure_id: proc.id,
    node_types: ['procedure', 'run', 'step', 'source', 'evidence', 'exception', 'review_action', 'conclusion'],
    nodes,
    links
  };

  // 12f risk heat map: area by assertion, risk and coverage.
  const samplesByProc = {};
  for (const s of d.sample_item) (samplesByProc[s.procedure_id] ||= []).push(s);
  const cells = [];
  for (const a of d.audit_area) {
    const procs = d.procedure.filter((p) => p.area_id === a.id);
    for (const assertion of ASSERTIONS) {
      const targeting = procs.filter((p) => p.target_assertions.includes(assertion));
      let items = 0;
      let amount = 0;
      for (const p of targeting) for (const s of samplesByProc[p.id] || []) { items++; amount += s.amount; }
      cells.push({ area_id: a.id, assertion, risk: a.assertion_risk[assertion], procedures: targeting.length, tested_items: items, tested_amount: round2(amount), coverage_amount_pct: round2(100 * amount / a.population_amount) });
    }
  }
  const risk = {
    label: sourceNote,
    derivation: 'risk is audit_area.assertion_risk for the cell. procedures counts procedure rows of the area whose target_assertions include the assertion. tested_items and tested_amount sum the sample_item rows of those procedures, so one item counts toward every assertion its procedure targets.',
    assertions: ASSERTIONS,
    risk_levels: RISKS,
    areas: d.audit_area.map((a) => ({ area_id: a.id, engagement_id: a.engagement_id, engagement: engById[a.engagement_id].name, area: a.name, overall_risk: engById[a.engagement_id].overall_risk })),
    cells
  };

  // 12g feedback: theme by severity, Pareto of themes, roadmap rank movement.
  const themeCount = Object.fromEntries(THEMES.map((t) => [t, 0]));
  const matrix = {};
  for (const f of d.dry_run_feedback_item) {
    themeCount[f.theme]++;
    matrix[`${f.theme}|${f.severity}`] = (matrix[`${f.theme}|${f.severity}`] || 0) + 1;
  }
  const total = d.dry_run_feedback_item.length;
  const pareto = THEMES.map((t) => ({ theme: t, count: themeCount[t], share: round2(themeCount[t] / total) }))
    .sort((a, b) => b.count - a.count || a.theme.localeCompare(b.theme));
  let cum = 0;
  for (const p of pareto) { cum += p.count; p.cumulative_share = round2(cum / total); }
  const themeTeams = {};
  for (const f of d.dry_run_feedback_item) (themeTeams[f.theme] ||= new Set()).add(f.team_id);
  const feedback = {
    label: FEEDBACK_LABEL,
    total,
    derivation: 'pareto counts dry_run_feedback_item rows per theme, sorted by count. matrix counts rows per theme and severity. teams_reporting is the distinct team_id count per theme. roadmap lists every roadmap_item with its rank before and after the reset and the driving theme as a label. No count of feedback items is attributed to any roadmap item or to the roadmap as a whole.',
    severity_scale: { 1: 'cosmetic', 2: 'slows the task', 3: 'forces a workaround', 4: 'blocks the task' },
    pareto,
    matrix: THEMES.flatMap((t) => [1, 2, 3, 4].map((s) => ({ theme: t, severity: s, count: matrix[`${t}|${s}`] || 0 }))),
    teams_reporting: THEMES.map((t) => ({ theme: t, teams: themeTeams[t] ? themeTeams[t].size : 0 })),
    roadmap: {
      note: 'rank movement and driving theme only; no item counts',
      items: d.roadmap_item.map((r) => ({ id: r.id, title: r.title, driving_theme: r.driving_theme, before_rank: r.before_rank, after_rank: r.after_rank, phase_before: r.phase_before, phase_after: r.phase_after }))
    }
  };

  return {
    '12a-coverage.json': coverage,
    '12b-funnel.json': funnel,
    '12c-outcomes.json': outcomes,
    '12d-latency.json': latency,
    '12e-lineage.json': lineage,
    '12f-risk.json': risk,
    '12g-feedback.json': feedback
  };
}

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

// One record per line inside a JSON array: compact, still diffable.
function jsonRows(rows) {
  if (!rows.length) return '[]\n';
  return '[\n' + rows.map((r) => JSON.stringify(r)).join(',\n') + '\n]\n';
}
function jsonPretty(obj) {
  return JSON.stringify(obj, null, 1) + '\n';
}

// RFC 4180 quoting. LF line endings. Arrays join with "|". Null is empty.
function csvCell(v) {
  if (v === null || v === undefined) return '';
  if (Array.isArray(v)) v = v.join('|');
  else if (typeof v === 'object') v = JSON.stringify(v);
  const s = String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function csv(rows) {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(',')];
  for (const r of rows) lines.push(keys.map((k) => csvCell(r[k])).join(','));
  return lines.join('\n') + '\n';
}

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

// Entities that also get a CSV. The four left out carry nested objects
// (engagement.team, field_structure.required_fields, evidence_item
// extracted_fields and highlight_spans, agent_run_step input lists) and are
// read from JSON.
const CSV_ENTITIES = ['audit_area', 'procedure', 'sample_item', 'exception', 'exception_status_change', 'agent_run', 'review_action', 'conclusion', 'sign_off', 'user', 'release', 'dry_run_feedback_item', 'roadmap_item'];

function flattenForCsv(entity, rows) {
  if (entity === 'audit_area') {
    return rows.map((a) => {
      const { assertion_risk, ...rest } = a;
      const flat = { ...rest };
      for (const k of ASSERTIONS) flat[`risk_${k}`] = assertion_risk[k];
      return flat;
    });
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function generate(seed) {
  const user = genUsers(seed);
  const release = RELEASES.map((r) => ({ id: r.id, name: r.name, start_day: r.start_day, end_day: r.end_day, teams: r.teams }));
  const engagementsRaw = genEngagements(seed, user);
  const audit_area = genAreas(seed, engagementsRaw);
  const field_structure = genFieldStructures(seed);
  const procedure = genProcedures(seed, engagementsRaw, audit_area, field_structure);
  const fw = genFieldwork(seed, engagementsRaw, audit_area, procedure, field_structure);
  const ag = genAgentRuns(seed, procedure, fw.sampleItems, fw.evidenceItems, field_structure);
  const cs = genConclusionsAndSignOffs(seed, procedure, ag.runs, ag.steps, fw.sampleItems, fw.exceptions, audit_area, engagementsRaw);
  const dry_run_feedback_item = genFeedback(seed);
  const roadmap_item = genRoadmap();
  const engagement = engagementsRaw.map(({ _window, ...e }) => e);

  const data = {
    engagement, audit_area, field_structure, procedure,
    sample_item: fw.sampleItems, evidence_item: fw.evidenceItems, exception: fw.exceptions, exception_status_change: fw.statusChanges,
    agent_run: ag.runs, agent_run_step: ag.steps, review_action: ag.actions,
    conclusion: cs.conclusions, sign_off: cs.signOffs, user, release, dry_run_feedback_item, roadmap_item
  };
  if (data.dry_run_feedback_item.length !== 1600) throw new Error('dry_run_feedback_item must be exactly 1,600');
  if (data.user.length !== 36) throw new Error('user must be exactly 36');
  if (data.roadmap_item.length !== 24) throw new Error('roadmap_item must be exactly 24');

  const charts = buildCharts(seed, data);
  const sample50 = makeRng(seed, 'sample50').shuffle(data.dry_run_feedback_item).slice(0, 50);

  // Build every file in memory, in a fixed order. The manifest comes last.
  const files = new Map();
  for (const [name, rows] of Object.entries(data)) files.set(`${name}.json`, jsonRows(rows));
  for (const name of CSV_ENTITIES) files.set(`${name}.csv`, csv(flattenForCsv(name, data[name])));
  for (const [name, obj] of Object.entries(charts)) files.set(`charts/${name}`, jsonPretty(obj));
  files.set('dry_run_feedback_sample50.csv', csv(sample50));

  const sums = [...files.entries()].map(([p, s]) => `${sha256(s)}  ${p}`).join('\n') + '\n';
  files.set('SHA256SUMS', sums);

  const manifest = {
    seed,
    generator: GENERATOR,
    epoch: EPOCH,
    as_of_day: AS_OF,
    labels: {
      dry_run_feedback: FEEDBACK_LABEL,
      dry_run_feedback_sample50: `${FEEDBACK_LABEL}. 50 rows drawn by a seeded shuffle of the 1,600; carry this label in the header of any copy`,
      all_other_data: ILLUSTRATIVE
    },
    counts: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.length])),
    files: Object.fromEntries([...files.entries()].map(([p, s]) => [p, { bytes: Buffer.byteLength(s), sha256: sha256(s) }])),
    rules: [
      'Every value derives from the seed through cyrb53 and mulberry32. One sub-stream per entity.',
      'Dates are day indices from the synthetic calendar start. Day 0 renders as Monday 2027-01-04. No ISO dates in data files.',
      'Entity names are built from invented syllables plus a generic suffix. User names are invented. No real firm, product, client, person or place.',
      'Amounts are plain numbers in a synthetic currency unit.',
      'dry_run_feedback_item is exactly 1,600 rows with status in triaged, fixed, declined, duplicate. No status marks an item as in the roadmap.',
      'roadmap_item carries rank before and after and a driving theme label. No item counts. No relation from feedback items to roadmap items.',
      'procedure.target_assertions is set for every procedure type. exception_status_change holds one row per transition.',
      'agent_run.checkpoints_required always includes draft_conclusion and adds evidence_retrieval when any evidence the run touched is data_class restricted.',
      'Run outcomes vary by release as an illustrative trend. Review latency is right skewed by construction.',
      'Charts under charts/ are aggregates of these files. Each carries its derivation and a label.',
      'No wall clock timestamps anywhere. Regenerating with the same seed reproduces every byte.'
    ]
  };
  files.set('manifest.json', jsonPretty(manifest));
  return { data, files, manifest };
}

function main() {
  const { files, manifest } = generate(SEED);
  if (CHECK) {
    const manifestPath = join(OUT_DIR, 'manifest.json');
    if (!existsSync(manifestPath)) {
      console.error(`check: ${manifestPath} not found`);
      process.exit(1);
    }
    const committed = JSON.parse(readFileSync(manifestPath, 'utf8'));
    let bad = 0;
    for (const [p, s] of files) {
      const got = sha256(s);
      const onDisk = existsSync(join(OUT_DIR, p)) ? sha256(readFileSync(join(OUT_DIR, p))) : null;
      // The manifest cannot list its own hash, so it is compared to disk only.
      const want = p === 'manifest.json' ? got : (committed.files[p] || {}).sha256;
      if (want !== got || onDisk !== got) {
        bad++;
        console.error(`check: MISMATCH ${p}`);
      }
    }
    for (const p of Object.keys(committed.files)) if (!files.has(p)) { bad++; console.error(`check: EXTRA in manifest ${p}`); }
    if (bad) { console.error(`check: FAIL, ${bad} files differ (seed ${SEED})`); process.exit(1); }
    if (!QUIET) console.log(`check: ok, ${files.size} files match manifest (seed ${SEED})`);
    return;
  }
  mkdirSync(join(OUT_DIR, 'charts'), { recursive: true });
  let bytes = 0;
  for (const [p, s] of files) {
    writeFileSync(join(OUT_DIR, p), s);
    bytes += Buffer.byteLength(s);
  }
  if (!QUIET) {
    console.log(`seed ${SEED}: wrote ${files.size} files, ${(bytes / 1e6).toFixed(2)} MB to ${OUT_DIR}`);
    for (const [k, v] of Object.entries(manifest.counts)) console.log(`  ${k.padEnd(26)} ${String(v).padStart(6)}`);
  }
}

main();
