/**
 * Rubrics for written work: a written response is marked on several criteria (ideas, evidence,
 * organization, style, conventions), each at one of four levels, so the mark explains itself to the
 * student and the AI's suggested mark says how each part was judged.
 *
 * Every rubric uses the same four levels, best first: 4 Excellent, 3 Proficient, 2 Developing and
 * 1 Beginning, with 0 for a criterion the response does not show at all. A criterion can count
 * twice or three times as much as the others (its weight). The rubric's total, out of the sum of
 * 4 × weight, is scaled to the question's points, so a rubric fits a question of any value.
 *
 * Shared by the browser, the AI marking and the `grade-submission` Edge Function, so the score a
 * teacher sees is the score that is saved.
 */

export interface RubricCriterion {
  /** Stable within its rubric: the levels a teacher gives are stored by it. */
  id: string;
  name: string;
  /** How much the criterion counts: 1 (the default), 2 or 3. */
  weight?: number;
  /** What each level looks like, best first: Excellent, Proficient, Developing, Beginning. */
  descriptors: string[];
}

export interface Rubric {
  /** The template it started from, or the teacher's own name for it. */
  name?: string;
  criteria: RubricCriterion[];
}

/** The levels a teacher gives on each criterion: criterion id → 0 to 4. */
export type RubricLevels = Record<string, number>;

export const RUBRIC_LEVELS = [
  { level: 4, name: 'Excellent' },
  { level: 3, name: 'Proficient' },
  { level: 2, name: 'Developing' },
  { level: 1, name: 'Beginning' },
  { level: 0, name: 'Not shown' },
] as const;

export const TOP_LEVEL = 4;
export const MAX_CRITERIA = 8;

export function levelName(level: number): string {
  return RUBRIC_LEVELS.find((l) => l.level === level)?.name ?? '';
}

/** What `level` looks like on a criterion (empty for 0, "not shown"). */
export function levelDescriptor(c: RubricCriterion, level: number): string {
  return level >= 1 && level <= TOP_LEVEL ? c.descriptors[TOP_LEVEL - level] ?? '' : '';
}

export const weightOf = (c: RubricCriterion): number => (c.weight === 2 || c.weight === 3 ? c.weight : 1);

/** The rubric's total when every criterion is Excellent. */
export function rubricMax(criteria: readonly RubricCriterion[]): number {
  return criteria.reduce((t, c) => t + TOP_LEVEL * weightOf(c), 0);
}

/** The rubric's total for the levels given (a missing level counts as 0). */
export function rubricEarned(criteria: readonly RubricCriterion[], levels: RubricLevels): number {
  return criteria.reduce((t, c) => t + (levels[c.id] ?? 0) * weightOf(c), 0);
}

/** True when every criterion has a level. */
export function rubricComplete(criteria: readonly RubricCriterion[], levels: RubricLevels | null | undefined): boolean {
  return !!levels && criteria.length > 0 && criteria.every((c) => Number.isInteger(levels[c.id]));
}

/** The score, 0 to 1, for a complete set of levels; null while a criterion has none. */
export function rubricScore01(criteria: readonly RubricCriterion[], levels: RubricLevels | null | undefined): number | null {
  if (!rubricComplete(criteria, levels)) return null;
  const max = rubricMax(criteria);
  return max ? rubricEarned(criteria, levels!) / max : null;
}

/** The question's points for a score, to one decimal place (what the teacher and student see). */
export const pointsOf = (score01: number, points: number): number => Math.round(score01 * points * 10) / 10;

const text = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * A rubric as stored or as written by a teacher or the AI, checked: criteria need a name and four
 * descriptors (blank ones are allowed while a teacher writes them), ids are unique and at most
 * eight criteria are kept. Null when nothing usable is left.
 */
export function cleanRubric(raw: unknown): Rubric | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const seen = new Set<string>();
  const criteria: RubricCriterion[] = [];
  for (const c of Array.isArray(o.criteria) ? (o.criteria as Array<Record<string, unknown>>) : []) {
    if (!c || typeof c !== 'object') continue;
    const name = text(c.name, 80);
    if (!name) continue;
    let id = text(c.id, 40).replace(/[^\w-]/g, '') || `c${criteria.length + 1}`;
    while (seen.has(id)) id = `${id}x`;
    seen.add(id);
    const d = Array.isArray(c.descriptors) ? c.descriptors : [];
    const descriptors = Array.from({ length: TOP_LEVEL }, (_, i) => text(d[i], 400));
    const w = Number(c.weight);
    criteria.push({ id, name, descriptors, ...(w === 2 || w === 3 ? { weight: w } : {}) });
    if (criteria.length >= MAX_CRITERIA) break;
  }
  if (!criteria.length) return null;
  const name = text(o.name, 80);
  return name ? { name, criteria } : { criteria };
}

/** Levels as sent by a teacher or the AI, kept only for the rubric's criteria and only 0 to 4. */
export function cleanLevels(criteria: readonly RubricCriterion[], raw: unknown): RubricLevels {
  const o = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const out: RubricLevels = {};
  for (const c of criteria) {
    const v = Number(o[c.id]);
    if (Number.isInteger(v) && v >= 0 && v <= TOP_LEVEL) out[c.id] = v;
  }
  return out;
}

/** The rubric as plain text, for the AI and for a marking guide. */
export function rubricText(criteria: readonly RubricCriterion[]): string {
  return criteria
    .map((c) => {
      const w = weightOf(c);
      const lines = RUBRIC_LEVELS.filter((l) => l.level > 0).map((l) => `  ${l.level} ${l.name}: ${levelDescriptor(c, l.level) || '(no description)'}`);
      return [`${c.name} [id ${c.id}]${w > 1 ? ` (counts ${w}×)` : ''}`, ...lines, '  0 Not shown: the response does not show this at all.'].join('\n');
    })
    .join('\n');
}

// ---------------------------------------------------------------- templates

const C = (id: string, name: string, descriptors: [string, string, string, string], weight?: number): RubricCriterion => ({ id, name, descriptors, ...(weight ? { weight } : {}) });

const CONVENTIONS = C('conventions', 'Conventions', [
  'Spelling, punctuation, grammar and sentence structure are controlled throughout; the few errors do not distract.',
  'Mostly correct; errors are minor and do not get in the way of meaning.',
  'Noticeable errors, some of which make the meaning unclear in places.',
  'Frequent errors make the response hard to read.',
]);

export interface RubricTemplate {
  id: string;
  name: string;
  /** What it is for, for the teacher choosing one. */
  use: string;
  rubric: Rubric;
}

/** Ready-made rubrics for English written work, matched to how the lessons teach each form. */
export const RUBRIC_TEMPLATES: RubricTemplate[] = [
  {
    id: 'analytical-essay',
    name: 'Analytical essay',
    use: 'An essay that argues a reading of a text (a story, poem or play).',
    rubric: {
      name: 'Analytical essay',
      criteria: [
        C('thesis', 'Thesis and ideas', [
          'An insightful, arguable thesis that goes beyond the obvious and is sustained through the whole essay.',
          'A clear, arguable thesis that the essay keeps to.',
          'A thesis that is too general or only partly arguable, or that the essay drifts away from.',
          'No clear thesis; the essay retells or describes rather than argues.',
        ]),
        C('evidence', 'Evidence and analysis', [
          'Well-chosen quotations, worked smoothly into sentences, with analysis that explains how the language creates meaning.',
          'Relevant quotations with clear explanation of how they support the thesis.',
          'Some evidence, but quotations are dropped in or explained only on the surface.',
          'Little or no evidence from the text, or quotations with no explanation.',
        ], 2),
        C('organization', 'Organization', [
          'A purposeful structure: each paragraph develops one point, and transitions show how the ideas build.',
          'A clear introduction, body and conclusion, with paragraphs that each support the thesis.',
          'Paragraphs are present, but their order or focus is uneven, and transitions are weak.',
          'Little structure; ideas are hard to follow.',
        ]),
        C('style', 'Style and voice', [
          'Precise, formal word choice and varied sentences give a confident academic voice.',
          'Clear, formal writing with some variety in sentences.',
          'Plain or wordy writing, slipping into an informal tone.',
          'Vague or repetitive language with little control of tone.',
        ]),
        CONVENTIONS,
      ],
    },
  },
  {
    id: 'persuasive-essay',
    name: 'Persuasive essay',
    use: 'An essay or speech that argues a position on an issue.',
    rubric: {
      name: 'Persuasive essay',
      criteria: [
        C('position', 'Position and argument', [
          'A clear, compelling position, developed with logical reasons and a fair answer to the strongest counterargument.',
          'A clear position supported by sound reasons; a counterargument is acknowledged.',
          'A position is stated, but the reasons are thin, repeated or not clearly connected.',
          'No clear position, or reasons that do not support it.',
        ]),
        C('evidence', 'Evidence and reasoning', [
          'Specific, convincing evidence (facts, examples, expert views) explained so the reasoning is easy to follow.',
          'Relevant evidence that supports each reason.',
          'General or unsupported claims, with evidence only now and then.',
          'Little or no evidence; claims rest on opinion alone.',
        ], 2),
        C('audience', 'Audience and persuasive techniques', [
          'Appeals to logic, character and emotion are chosen deliberately for the audience and used with restraint.',
          'Persuasive techniques suit the audience and purpose.',
          'Some techniques, but they are overused or do not suit the audience.',
          'Little awareness of the audience or of how to persuade.',
        ]),
        C('organization', 'Organization', [
          'A strong opening and closing, with reasons ordered for the greatest effect and smooth transitions.',
          'A clear introduction, body and conclusion; reasons are in a sensible order.',
          'Some structure, but the order of reasons or the conclusion is weak.',
          'Little structure; the argument is hard to follow.',
        ]),
        CONVENTIONS,
      ],
    },
  },
  {
    id: 'narrative',
    name: 'Narrative',
    use: 'A story or personal narrative.',
    rubric: {
      name: 'Narrative',
      criteria: [
        C('ideas', 'Ideas and plot', [
          'An original idea with a clear conflict that builds to a satisfying resolution.',
          'A clear conflict and a plot that develops and resolves.',
          'A simple plot; the conflict is unclear or resolved too quickly.',
          'Events are listed with little sense of conflict or purpose.',
        ]),
        C('character', 'Character and setting', [
          'Characters and setting come alive through well-chosen detail, dialogue and action.',
          'Characters and setting are developed with some vivid detail.',
          'Characters and setting are named but thinly developed.',
          'Little sense of who the characters are or where the story happens.',
        ]),
        C('organization', 'Organization and pacing', [
          'Pacing is controlled: the story slows for key moments and moves quickly through the rest.',
          'A clear beginning, middle and end with sensible pacing.',
          'The sequence is mostly clear, but parts are rushed or drag.',
          'The sequence of events is hard to follow.',
        ]),
        C('style', 'Style and word choice', [
          'Precise, vivid word choice and varied sentences create a distinct voice and mood.',
          'Descriptive language and some sentence variety.',
          'Plain language with little variety.',
          'Vague or repetitive language.',
        ]),
        CONVENTIONS,
      ],
    },
  },
  {
    id: 'personal-response',
    name: 'Personal response',
    use: 'A response that connects a text to the student\'s own ideas and experience.',
    rubric: {
      name: 'Personal response',
      criteria: [
        C('response', 'Response to the text', [
          'A thoughtful, honest response that explores what the text means and why it matters.',
          'A clear response that shows understanding of the text.',
          'A response that stays on the surface of the text or partly misreads it.',
          'Little response to the text itself.',
        ]),
        C('support', 'Support from the text and experience', [
          'Specific details from the text and well-explained personal connections support every idea.',
          'Relevant details and connections support the main ideas.',
          'Some support, but details are general or connections are not explained.',
          'Ideas are not supported.',
        ], 2),
        C('organization', 'Organization', [
          'Ideas build purposefully from an engaging opening to a reflective close.',
          'Ideas are grouped into clear paragraphs with an opening and a close.',
          'Some grouping of ideas, but the response wanders.',
          'Ideas are hard to follow.',
        ]),
        C('voice', 'Voice', [
          'A sincere, confident voice with precise word choice.',
          'A clear voice suited to the purpose.',
          'A flat or uneven voice.',
          'Little sense of the writer\'s voice.',
        ]),
        CONVENTIONS,
      ],
    },
  },
  {
    id: 'short-response',
    name: 'Short written response',
    use: 'A paragraph that answers a question about a text.',
    rubric: {
      name: 'Short written response',
      criteria: [
        C('answer', 'Answer to the question', [
          'Answers the question directly and insightfully in a clear topic sentence.',
          'Answers the question clearly.',
          'Answers part of the question, or answers it vaguely.',
          'Does not answer the question asked.',
        ]),
        C('evidence', 'Evidence and explanation', [
          'Well-chosen evidence from the text, fully explained.',
          'Relevant evidence with a clear explanation.',
          'Evidence that is general or not explained.',
          'No evidence from the text.',
        ], 2),
        C('clarity', 'Clarity and conventions', [
          'Clear, precise sentences with very few errors.',
          'Clear sentences; errors do not affect meaning.',
          'Some unclear sentences or distracting errors.',
          'Errors make the answer hard to follow.',
        ]),
      ],
    },
  },
];

export const RUBRIC_TEMPLATE_IDS = RUBRIC_TEMPLATES.map((t) => t.id);

/** A fresh copy of a template's rubric, safe to edit. */
export function rubricFromTemplate(id: string): Rubric | null {
  const t = RUBRIC_TEMPLATES.find((x) => x.id === id);
  return t ? (JSON.parse(JSON.stringify(t.rubric)) as Rubric) : null;
}
