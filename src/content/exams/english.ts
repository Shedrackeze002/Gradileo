import type { El, Explainer, Line, Scene } from '@/video/script.ts';

/**
 * English exam question videos (roadmap item 11) share one shape, so each script gives only its
 * words and this builds the scenes, in the series' order: the title, the passage (for a reading
 * question), the question, what it is asking, what you need to know, the plan, the steps, the
 * check, the traps, your turn and the summary. A step is an ordinary scene, so a step can show
 * the passage again and light up the words that answer the question.
 */

/** A bullet, a table row or a line of a list, and what the narrator says as it appears. */
export type Said = [md: string, say: string | string[]];

export interface EnglishExam {
  /** The lesson the question practises, which also names the video ("xq-<lesson>"). */
  lesson: string;
  /** Who set the question and where. A question we wrote says "Exam-style question written by Gradileo, in the style of …". */
  source: string;
  /** The licence, with the credit it asks for. */
  licence: string;
  url?: string;
  /** True when the question is printed word for word, as it was set. */
  verbatim: boolean;
  title: string;
  thumbnailTitle: string;
  summary: string;
  /** The title card's subtitle. */
  subtitle: string;
  /** What the narrator says over the title card. */
  intro: string[];
  /** A passage the question is about, read before the question. */
  passage?: { lines: string[]; by?: string; say: string[] };
  /** The question as it is shown (Markdown; `<u>` underlines), and in plain text for YouTube. */
  question: { prompt: string; text: string; choices?: string[]; answer: number | string; working: string; say: string[] };
  ask: Said[];
  know: { title: string; md: string; say: string[]; example?: { md: string; say: string | string[] } };
  plan: Said[];
  /** The worked steps; each should start a chapter ("Step 1: …"). */
  steps: Scene[];
  check: Said[];
  /** What the narrator says over the table, then each row: the answer, what went wrong, and what is said about it. */
  traps: { head?: [string, string]; say: string; rows: [answer: string, what: string, say: string][] };
  yourTurn: { prompt: string; choices?: string[]; answer: number | string; working: string; ask: string; reveal: string };
  sum: Said[];
}

const says = (s: string | string[]) => (Array.isArray(s) ? s : [s]);

/**
 * A question from a key stage 2 English grammar, punctuation and spelling test (England), word for
 * word. These tests hold no third-party material, so they may be reused under the Open Government
 * Licence v3.0 with the Standards and Testing Agency's own credit line.
 */
export const ks2 = (year: number, question: number) => ({
  source: `Standards and Testing Agency, ${year} key stage 2 English grammar, punctuation and spelling test, Paper 1, question ${question}`,
  licence: `Contains material developed by the Standards and Testing Agency for ${year} national curriculum assessments and licensed under Open Government Licence v3.0`,
  url: `https://www.gov.uk/government/publications/key-stage-2-tests-${year}-english-grammar-punctuation-and-spelling-test-materials`,
  verbatim: true,
});

/** What the narrator says to introduce a key stage 2 grammar test question. */
export const ks2Intro = (topic: string) => [
  `In this video, we solve a real test question about ${topic}. We will take it one small step at a time, so that every step makes sense.`,
  'The question comes from a national test for eleven-year-olds in England, called the key stage two grammar, punctuation and spelling test.',
];

/** The source line of a question we wrote ourselves, in the style of an exam. */
export const ours = (style: string, passage?: string) => ({
  source: `Exam-style question written by Gradileo, in the style of ${style}`,
  licence: passage ? `Question by Gradileo; ${passage}` : 'Question by Gradileo',
  verbatim: false,
});

/** Lines for a list: each item appears as the narrator starts on it. */
function listLines(id: string, items: Said[]): Line[] {
  return items.flatMap(([, say], i) => says(say).map((s, k) => (k === 0 ? { say: s, show: `${id}.${i}` } : { say: s })));
}

/** A quotation: a passage of prose or verse, one entry per line. */
export const quote = (id: string, lines: string[], by?: string, size: 'lg' | 'md' = 'md'): El => ({ kind: 'quote', id, lines, by, size });

/** A centred scene: the elements on the stage and the narrator's lines. */
export const scene = (chapter: string | undefined, main: El[], lines: Line[]): Scene => ({ ...(chapter ? { chapter } : {}), layout: 'center', main, lines });

/** A paragraph of text. */
export const text = (id: string, md: string, size: 'xl' | 'lg' | 'md' = 'md'): El => ({ kind: 'text', id, md, size });

/** A callout box. */
export const callout = (id: string, tone: 'definition' | 'mistake' | 'tip' | 'key', title: string, md: string): El => ({ kind: 'callout', id, tone, title, md });

/** A list of bullets. */
export const bullets = (id: string, items: string[], check = false): El => ({ kind: 'bullets', id, items, ...(check ? { check } : {}) });

/** A table. */
export const table = (id: string, head: string[], rows: string[][]): El => ({ kind: 'table', id, head, rows });

export function englishExam(x: EnglishExam): Explainer {
  const id = `xq-${x.lesson}`;
  const scenes: Scene[] = [];
  scenes.push(
    scene(undefined, [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: x.thumbnailTitle, subtitle: x.subtitle }], [
      ...x.intro.map((say, i) => (i === 0 ? { say, show: 'title' } : { say })),
      { say: 'You will see where the question comes from at the bottom of the screen the whole way through.' },
    ]),
  );
  if (x.passage) {
    const p = x.passage;
    scenes.push(scene('The question', [quote('passage', p.lines, p.by)], p.say.map((say, i) => (i === 0 ? { say, show: 'passage' } : { say }))));
  }
  const q = x.question;
  scenes.push(
    scene(x.passage ? undefined : 'The question', [{ kind: 'try', id: 'q', kicker: 'The question', prompt: q.prompt, ...(q.choices ? { choices: q.choices } : {}), answer: q.answer, working: q.working }], [
      { say: x.verbatim ? 'Here is the question, exactly as it was printed.' : 'Here is the question.', show: 'q' },
      ...q.say.map((say) => ({ say })),
      { say: 'If you would like to try it first, pause the video now.', wait: 5 },
    ]),
  );
  scenes.push(scene('What is it asking?', [bullets('ask', x.ask.map(([md]) => md))], listLines('ask', x.ask)));
  const k = x.know;
  scenes.push(
    scene('What you need to know', [callout('def', 'definition', k.title, k.md), ...(k.example ? [text('ex', k.example.md)] : [])], [
      ...k.say.map((say, i) => (i === 0 ? { say, show: 'def' } : { say })),
      ...(k.example ? says(k.example.say).map((say, i) => (i === 0 ? { say, show: 'ex' } : { say })) : []),
    ]),
  );
  scenes.push(scene('The plan', [bullets('plan', x.plan.map(([md]) => md))], listLines('plan', x.plan)));
  scenes.push(...x.steps);
  scenes.push(scene('Check the answer', [bullets('chk', x.check.map(([md]) => md))], listLines('chk', x.check)));
  scenes.push(
    scene('The traps', [table('traps', x.traps.head ?? ['Answer', 'What happened'], x.traps.rows.map(([a, b]) => [a, b]))], [
      { say: x.traps.say, show: 'traps' },
      ...x.traps.rows.map(([, , say], i) => ({ say, focus: `traps.${i}` })),
    ]),
  );
  const t = x.yourTurn;
  scenes.push(
    scene('Your turn', [{ kind: 'try', id: 'q2', prompt: t.prompt, ...(t.choices ? { choices: t.choices } : {}), answer: t.answer, working: t.working }], [
      { say: `Your turn. ${t.ask} Pause the video and try it.`, show: 'q2', wait: 6 },
      { say: t.reveal, show: 'q2.answer' },
    ]),
  );
  scenes.push(scene('Summary', [bullets('sum', x.sum.map(([md]) => md), true)], listLines('sum', x.sum)));
  return {
    id,
    lessonId: '',
    exam: { lesson: x.lesson, source: x.source, licence: x.licence, ...(x.url ? { url: x.url } : {}), question: q.text, ...(q.choices ? { choices: q.choices.map(plain) } : {}) },
    title: `Exam Question: ${x.title}`,
    thumbnailTitle: x.thumbnailTitle,
    thumbnail: false,
    summary: x.summary,
    scenes,
  };
}

/** A choice as plain text, for the YouTube description. */
export const plain = (md: string) =>
  md
    .replace(/<\/?u>/g, '')
    .replace(/<br>/g, ' ')
    .replace(/\*\*|__|\*/g, '')
    .replace(/\[\[\w+:([^\]]+)\]\]/g, '$1');
