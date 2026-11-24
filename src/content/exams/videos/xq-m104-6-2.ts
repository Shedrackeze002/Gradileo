import { ruler } from '@/video/measure.ts';
import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 6.2 (reading rulers and tape measures). The free OpenStax
// books have no ruler-reading question with a picture at this level, so this one is written by
// Gradileo in the style of a Grade 10 workplace mathematics unit test, with both marks stated in the
// question. The ends are at 2 cm and 9.4 cm, so the bolt is 9.4 − 2 = 7.4 cm = 74 mm.
// Check: from 2 cm to 9 cm is 70 mm, and 4 mm more makes 74 mm.

const bolt = (height = 300) =>
  figure('r', [ruler({ system: 'metric', length: 11, start: 2, end: 9.4, startReading: '2 \\text{ cm}', reading: '9.4 \\text{ cm}' })], height);

const QUESTION =
  'A bolt is placed along a ruler marked in centimetres and millimetres. Its left end lines up with the 2 cm mark, and its right end lines up with the 4th millimetre mark after 9 cm. How long is the bolt, in millimetres?';

const video: Explainer = {
  id: 'xq-m104-6-2',
  lessonId: '',
  exam: {
    lesson: 'm104-6-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Bolt? (Reading Rulers and Tape Measures)',
  thumbnailTitle: 'How Long Is the Bolt?',
  thumbnail: 'r',
  summary:
    'An exam-style question, solved one small step at a time: a bolt lies along a ruler, with its left end at the 2 cm mark and its right end at the 4th millimetre mark after 9 cm. How long is the bolt, in millimetres? We read the right end as 9.4 cm, subtract the start, 9.4 − 2 = 7.4 cm, and change to millimetres: 74 mm. Then we check by counting and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Bolt?', subtitle: 'Reading rulers and tape measures, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about reading a ruler. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A bolt is placed along a ruler marked in centimetres and millimetres. Its left end lines up with the $2$ cm mark, and its right end lines up with the 4th millimetre mark after $9$ cm. How long is the bolt, in millimetres?',
          answer: '$74$ mm',
          working: '$9.4 - 2 = 7.4$ cm $= 74$ mm',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A bolt is placed along a ruler marked in centimetres and millimetres. Its left end lines up with the 2 centimetre mark, and its right end lines up with the 4th millimetre mark after 9 centimetres. How long is the bolt, in millimetres?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bolt(), { kind: 'text', id: 't', size: 'md', md: 'The bolt does **not** start at $0$. Its length is the distance **between** its ends.' }],
      lines: [
        { say: 'Here is the ruler, marked in centimetres, with a small mark for every millimetre.', show: 'r.scale' },
        { say: 'Here is the bolt. Its left end is at the 2 centimetre mark,', show: ['r.bar', 'r.start'] },
        { say: 'and its right end is 4 small marks past the 9.', show: 'r.end' },
        { say: 'Notice that the bolt does not start at zero. Its length is the distance between its two ends.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1 \\text{ cm} = 10 \\text{ mm}', '\\text{length} = \\text{end} - \\text{start}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Small marks are millimetres', md: 'Each centimetre is cut into **$10$** millimetres. A reading **$4$ marks past $9$** is $9.4$ cm, or $94$ mm.' },
      ],
      lines: [
        { say: 'Here is what we need. 1 centimetre is 10 millimetres. And when an object does not start at zero, its length is the end reading minus the start reading.', show: 'f' },
        { say: 'Each centimetre is cut into 10 millimetres, so a reading 4 small marks past 9 is 9.4 centimetres.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read **both ends**', '**Subtract**: end minus start', 'Change to **millimetres**'] }],
      lines: [
        { say: 'Here is the plan. Read both ends of the bolt.', show: 'plan.0' },
        { say: 'Subtract: the end minus the start.', show: 'plan.1' },
        { say: 'Then change the answer to millimetres.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read the ends',
      layout: 'center',
      main: [bolt(320), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{start} = 2 \\text{ cm}, \\quad \\text{end} = 9.4 \\text{ cm}'] }],
      lines: [
        { say: 'Step one. The left end reads 2 centimetres.', show: ['r.scale', 'r.bar', 'r.start', 'r.start-reading'] },
        { say: 'The right end is 4 millimetres past 9, which reads 9.4 centimetres.', show: ['r.end', 'r.reading', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9.4 - 2 = 7.4 \\text{ cm}'] }],
      lines: [
        { say: 'Step two. Take the start from the end: 9.4 minus 2 is 7.4 centimetres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Millimetres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7.4 \\times 10 = \\good{74 \\text{ mm}}'] }],
      lines: [
        { say: 'Step three. There are 10 millimetres in a centimetre, so multiply by 10. 7.4 times 10 is 74. The bolt is 74 millimetres long.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\text{ cm} \\to 9 \\text{ cm}: \\ 7 \\text{ cm} = 70 \\text{ mm}', '70 + 4 = 74 \\text{ mm} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by counting. From the 2 to the 9 is 7 whole centimetres, which is 70 millimetres.', show: 'm.0' },
        { say: 'Then 4 more small marks: 70 plus 4 is 74 millimetres. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$94$ mm', 'read only the end: the bolt starts at **2 cm**, not $0$'],
            ['$7.4$ mm', 'that is in **centimetres**: multiply by $10$'],
            ['$11.4$ cm', '**added** the readings: subtract the start'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '94 millimetres reads only the right end. That would be right if the bolt started at zero, but it starts at 2.' },
        { say: '7.4 is the length in centimetres. In millimetres, it is 10 times bigger.' },
        { say: 'And adding the two readings gives 11.4, longer than the ruler shows. Subtract the start.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A washer lies along a ruler. Its left edge is at the $1$ cm mark, and its right edge is at the $3.5$ cm mark. How wide is the washer, in millimetres?',
          choices: ['$35$ mm', '$25$ mm', '$2.5$ mm', '$45$ mm'],
          answer: 1,
          working: '$3.5 - 1 = 2.5$ cm, and $2.5 \\times 10 = 25$ mm.',
        },
      ],
      lines: [
        { say: 'Your turn. A washer lies along a ruler. Its left edge is at the 1 centimetre mark, and its right edge is at the 3.5 centimetre mark. How wide is the washer, in millimetres? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3.5 minus 1 is 2.5 centimetres, and 2.5 times 10 is 25 millimetres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Small marks are **millimetres**', 'Length $=$ **end** $-$ **start**', '$1$ cm $= 10$ mm', 'Check by **counting** the marks'] }],
      lines: [
        { say: 'Here is what to remember. On a metric ruler, the small marks are millimetres.', show: 'sum.0' },
        { say: 'If the object does not start at zero, its length is the end minus the start.', show: 'sum.1' },
        { say: '1 centimetre is 10 millimetres.', show: 'sum.2' },
        { say: 'And check by counting the marks. For more on reading rulers and tape measures, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
