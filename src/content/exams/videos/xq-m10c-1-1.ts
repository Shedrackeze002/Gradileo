import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 1.1 (referents, estimation and units). Gradileo wrote this one,
// in the style of a Grade 10 measurement test, since the free question banks have no question on
// referents: a hand span of about 20 cm used seven times along a table is about 140 cm, or 1.4 m.

/** A table measured with seven hand spans. */
const spans = (height = 240): DiagramEl => ({
  kind: 'diagram',
  id: 'table',
  height,
  points: Object.fromEntries([
    ['t0', [0, 0]],
    ['t1', [140, 0]],
    ...Array.from({ length: 8 }, (_, i) => [`s${i}`, [i * 20, 12]] as [string, [number, number]]),
  ]),
  items: [
    { kind: 'line', id: 'top', from: 't0', to: 't1', tone: 'ink', weight: 10, label: '\\text{table}', labelSide: 'right' },
    ...Array.from({ length: 7 }, (_, i) => ({
      kind: 'line' as const,
      id: `span${i}`,
      from: `s${i}`,
      to: `s${i + 1}`,
      tone: (i % 2 ? 'opp' : 'adj') as 'opp' | 'adj',
      weight: 6,
      label: i === 0 ? '\\approx 20\\text{ cm}' : undefined,
      labelSide: 'left' as const,
      group: 'spans',
    })),
  ],
});

const QUESTION =
  'Maya’s hand span, from the tip of her thumb to the tip of her little finger, is about 20 cm. She uses it as a referent to measure a table, and finds that the table is 7 hand spans long. Which is the best estimate of the length of the table?';
const CHOICES = ['0.14 m', '1.4 m', '14 m', '27 cm'];

const video: Explainer = {
  id: 'xq-m10c-1-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 measurement test',
    licence: 'Written by Gradileo',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Measure a Table With Your Hand. Referents and Estimation',
  thumbnailTitle: 'Measure With Your Hand',
  thumbnail: 'table',
  summary:
    'An exam-style question, solved one small step at a time: Maya\'s hand span is about 20 cm, and a table is 7 hand spans long. We use the hand span as a referent, multiply to estimate the length, and change centimetres to metres. Then we check the answer is a sensible size for a table and look at the traps in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Measure With Your Hand', subtitle: 'Referents and estimation, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about estimating a length with a referent. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 measurement test. It says so at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, choices: CHOICES, answer: 1, working: '$7 \\times 20 = 140$ cm, and $140$ cm $= 1.4$ m.' }],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Maya’s hand span, from the tip of her thumb to the tip of her little finger, is about 20 centimetres. She uses it as a referent to measure a table, and finds that the table is 7 hand spans long. Which is the best estimate of the length of the table?' },
        { say: 'The choices are 0.14 metres, 1.4 metres, 14 metres, and 27 centimetres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [spans(), { kind: 'text', id: 't', size: 'md', md: 'Seven hand spans laid along the table: about how long is it?' }],
      lines: [
        { say: 'Let us picture it. Maya lays her hand along the table, one span after another. It takes 7 spans to reach the other end.', show: ['table', 'table.spans'] },
        { say: 'Each span is about 20 centimetres, so the question asks for an estimate of the whole length.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'A referent', md: 'Something whose size you know, used to **estimate** a measurement: a fingernail is about $1$ cm wide, a hand span about $20$ cm, a door about $2$ m tall.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['100\\text{ cm} = 1\\text{ m}'] },
      ],
      lines: [
        { say: 'Here is what we need. A referent is something whose size you know, that you use to estimate a measurement. A fingernail is about 1 centimetre wide, a hand span about 20 centimetres, and a door about 2 metres tall.', show: 'def' },
        { say: 'And there are 100 centimetres in a metre.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply: **number of spans** times **one span**', 'Change centimetres to **metres**', 'Check the size makes sense for a table'] }],
      lines: [
        { say: 'Here is the plan. First, multiply the number of spans by the length of one span.', show: 'plan.0' },
        { say: 'Second, change centimetres to metres, to match the choices.', show: 'plan.1' },
        { say: 'Third, check that the size makes sense for a table.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Multiply',
      layout: 'center',
      main: [spans(200), { kind: 'math', id: 'm', size: 'lg', lines: ['7 \\times 20\\text{ cm} = 140\\text{ cm}'] }],
      lines: [{ say: 'Step one. 7 spans of about 20 centimetres each is 7 times 20, which is about 140 centimetres.', show: ['table', 'table.spans', 'm.0'], focus: 'm.0' }],
    },
    {
      chapter: 'Step 2: Metres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['140\\text{ cm} \\div 100 = \\good{1.4\\text{ m}}'] }],
      lines: [{ say: 'Step two. To change centimetres to metres, divide by 100: 140 centimetres is 1.4 metres. That is choice B.', show: 'm.0', focus: 'm.0' }],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A door is about $2$ m tall. A table **shorter than a door is tall**, $1.4$ m, makes sense.' }],
      lines: [{ say: 'Let us check with another referent. A door is about 2 metres tall. A table a little shorter than a door is tall, about 1.4 metres long, is a sensible size for a table.', show: 't' }],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$0.14$ m', 'Divided by $1000$ instead of $100$: smaller than a hand'],
            ['$14$ m', 'Divided by $10$: as long as a bus'],
            ['$27$ cm', '**Added** $20 + 7$ instead of multiplying'],
            ['$1.4$ m', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.14 metres divides by 1,000 instead of 100. That is smaller than Maya’s hand, so it cannot be right.' },
        { say: '14 metres divides by 10. That is as long as a bus. And 27 centimetres adds 20 and 7 instead of multiplying.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A paper clip is about 3 cm long. A pencil is about 6 paper clips long. Which is the best estimate of the length of the pencil?',
          choices: ['9 cm', '2 cm', '18 cm', '1.8 m'],
          answer: 2,
          working: '$6 \\times 3 = 18$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A paper clip is about 3 centimetres long. A pencil is about 6 paper clips long. Which is the best estimate of the length of the pencil? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '6 times 3 is 18 centimetres. That is choice C. 9 added instead of multiplying, and 1.8 metres is taller than most people.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **referent** is something whose size you know', 'Estimate: count the referents, then **multiply**', '$100$ cm $= 1$ m', 'Check the answer is a sensible size'] }],
      lines: [
        { say: 'Here is what to remember. A referent is something whose size you know, like your hand span.', show: 'sum.0' },
        { say: 'To estimate, count how many referents fit, then multiply.', show: 'sum.1' },
        { say: 'There are 100 centimetres in a metre.', show: 'sum.2' },
        { say: 'And always check the answer is a sensible size. For more on referents and estimation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
