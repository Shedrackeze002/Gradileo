/**
 * More English Topics: lessons that other school systems' English courses teach and Gradileo's own
 * grade courses do not (roadmap item 5, step 4, "fill the gaps"). The curriculum maps file these
 * lessons into their courses (evaluating a statement and comparing two texts in GCSE English
 * Language), and Browse by topic lists them with the other lessons of their topics. It is not a
 * course to take on its own, so it is not offered in the course pickers (`extra`), and each lesson
 * carries its own level (`grade`). Every text in it was written for these lessons.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'RE1', strand: 'Evaluating and comparing texts', text: 'Evaluate a statement about a text: weigh the evidence for and against it, explain the writer’s methods and reach a judgement.' },
  { code: 'RE2', strand: 'Evaluating and comparing texts', text: 'Summarise the differences between two texts, with evidence from each and an inference.' },
  { code: 'RE3', strand: 'Evaluating and comparing texts', text: 'Compare two writers’ viewpoints and the methods each uses to convey them.' },
  { code: 'WF1', strand: 'Writing in a form', text: 'Write to present a viewpoint as an article, a formal letter or a speech, with the features, structure and register that suit the form and its audience.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  grade: number,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, grade, outcomes, skills, objectives, minutes: 60, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Evaluating and Comparing Texts ----------------
  L('ex-1-1', 'ex-u1', '1.1', 'Evaluating a Statement: How Far Do You Agree?', 10, ['RE1'],
    ['ex-evaluate-evidence', 'ex-evaluate-response'],
    ['Choose the evidence that supports a statement about a text, and the evidence that challenges it', 'Write an evaluation that judges the statement, quotes the text and explains the writer’s methods'],
    ['evaluate', 'statement', 'evidence', 'method', 'judgement']),
  L('ex-1-2', 'ex-u1', '1.2', 'Summarising the Differences between Two Texts', 10, ['RE2'],
    ['ex-summary-difference', 'ex-summary-inference'],
    ['State a difference between two texts and support it with a quotation from each', 'Select only the details the question asks about, and infer what they suggest'],
    ['summary', 'synthesis', 'inference', 'source']),
  L('ex-1-3', 'ex-u1', '1.3', 'Comparing Writers’ Viewpoints and Methods', 10, ['RE3'],
    ['ex-compare-viewpoints', 'ex-compare-methods'],
    ['Identify each writer’s viewpoint and attitude, and compare them', 'Compare the methods two writers use to convey their viewpoints'],
    ['viewpoint', 'attitude', 'tone', 'method', 'comparison']),

  // ---------------- Unit 2: Writing in a Form ----------------
  L('ex-2-1', 'ex-u2', '2.1', 'Writing an Article, a Letter and a Speech', 10, ['WF1'],
    ['ex-form-features', 'ex-form-register'],
    ['Use the features and structure of an article, a formal letter and a speech', 'Match the register of the writing to its audience'],
    ['form', 'audience', 'purpose', 'register', 'headline', 'sign-off']),
];

export const UNITS: UnitMeta[] = [
  { id: 'ex-u1', number: 1, title: 'Evaluating and Comparing Texts', description: 'Evaluating a statement about a text, summarising the differences between two texts, and comparing two writers’ viewpoints and methods.', outcomes: ['RE1', 'RE2', 'RE3'], lessons: [], color: 'violet' },
  { id: 'ex-u2', number: 2, title: 'Writing in a Form', description: 'The article, the formal letter and the speech: their features, their structure and the register that suits the audience.', outcomes: ['WF1'], lessons: [], color: 'rose' },
];
for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENGMORE: CourseMeta = {
  id: 'eng-more',
  title: 'More English Topics',
  shortTitle: 'More English',
  grade: 10,
  subject: 'English',
  description: 'Topics that school systems around the world teach and Gradileo’s grade courses do not: evaluating a statement about a text, summarising and comparing two texts, and writing an article, a formal letter and a speech.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  extra: true,
};
