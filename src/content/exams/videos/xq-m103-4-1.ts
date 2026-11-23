import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ruler } from '@/video/measure.ts';

// Exam question for Math 10-3 lesson 4.1 (reading rulers and tape measures). The free OpenStax
// books have no ruler-reading questions, so this one is written by Gradileo in the style of a
// Grade 10 workplace mathematics unit test, with the readings stated in the question. The trim
// runs from 1 3/16 in to 4 5/8 in = 4 10/16 in, so it is 4 10/16 − 1 3/16 = 3 7/16 in long.
// Check: 1 3/16 + 3 7/16 = 4 10/16 = 4 5/8.

const QUESTION =
  'A piece of trim is measured with a ruler marked in sixteenths of an inch. The left end of the trim lines up with the 1 3/16 in mark, and the right end lines up with the 4 5/8 in mark. How long is the piece of trim?';

const trim = (height = 280) =>
  figure('r', [ruler({ system: 'imperial', length: 6, start: 1.1875, end: 4.625, division: 16, startReading: '1\\tfrac{3}{16}', reading: '4\\tfrac{5}{8}' })], height);

const video: Explainer = {
  id: 'xq-m103-4-1',
  lessonId: '',
  exam: {
    lesson: 'm103-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Measuring Trim That Does Not Start at Zero (Reading Rulers)',
  thumbnailTitle: 'How Long Is the Trim?',
  thumbnail: 'r',
  summary:
    'An exam-style question, solved one small step at a time: a piece of trim lines up with the 1 3/16 in mark at one end and the 4 5/8 in mark at the other, on a ruler marked in sixteenths. How long is it? The trim does not start at zero, so we subtract the readings. Writing 4 5/8 as 4 10/16, the length is 4 10/16 − 1 3/16 = 3 7/16 in. Then we check by adding and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Trim?', subtitle: 'Reading rulers, step by step' }],
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
          prompt: 'A piece of trim is measured with a ruler marked in sixteenths of an inch. The left end of the trim lines up with the $1\\tfrac{3}{16}$ in mark, and the right end lines up with the $4\\tfrac{5}{8}$ in mark. How long is the piece of trim?',
          answer: '$3\\tfrac{7}{16}$ in',
          working: '$4\\tfrac{10}{16} - 1\\tfrac{3}{16} = 3\\tfrac{7}{16}$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A piece of trim is measured with a ruler marked in sixteenths of an inch. The left end lines up with the 1 and three sixteenths inch mark. The right end lines up with the 4 and five eighths inch mark. How long is the trim?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        trim(),
        { kind: 'text', id: 't', size: 'md', md: 'The trim does **not** start at $0$. Its length is the **distance between** the two readings.' },
      ],
      lines: [
        { say: 'Here is the ruler. Each inch is cut into 16 small parts.', show: 'r.scale' },
        { say: 'Here is the trim. It starts at 1 and three sixteenths inches, and ends at 4 and five eighths inches.', show: ['r.bar', 'r.start', 'r.end', 'r.start-reading', 'r.reading'] },
        { say: 'The trim does not start at zero, so the end reading is not its length. The length is the distance between the two readings.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{length} = \\text{end reading} - \\text{start reading}', '\\tfrac{5}{8} = \\tfrac{10}{16}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same denominator', md: 'To subtract fractions, write them with the **same denominator**. On this ruler, use **sixteenths**.' },
      ],
      lines: [
        { say: 'Here is what we need. The length is the end reading minus the start reading.', show: 'f.0' },
        { say: 'Five eighths is the same as ten sixteenths, because an eighth is two sixteenths.', show: 'f.1' },
        { say: 'To subtract fractions, write them with the same denominator. On this ruler, that is sixteenths.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write both readings in **sixteenths**', '**Subtract**: end minus start', '**Simplify** if you can'] }],
      lines: [
        { say: 'Here is the plan. Write both readings in sixteenths.', show: 'plan.0' },
        { say: 'Subtract the start from the end.', show: 'plan.1' },
        { say: 'Then simplify the fraction if you can.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sixteenths',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4\\tfrac{5}{8} = 4\\tfrac{10}{16}', '1\\tfrac{3}{16} \\text{ stays as it is}'] }],
      lines: [
        { say: 'Step one. Five eighths is ten sixteenths, so 4 and five eighths is 4 and ten sixteenths.', show: 'm.0' },
        { say: '1 and three sixteenths is already in sixteenths.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4\\tfrac{10}{16} - 1\\tfrac{3}{16}', '= (4 - 1) + \\tfrac{10 - 3}{16} = \\good{3\\tfrac{7}{16} \\text{ in}}'] }],
      lines: [
        { say: 'Step two. Subtract: 4 and ten sixteenths minus 1 and three sixteenths.', show: 'm.0' },
        { say: 'Subtract the whole inches, 4 minus 1 is 3, and the sixteenths, 10 minus 3 is 7. The trim is 3 and seven sixteenths inches long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{7}{16}: \\ 7 \\text{ is odd, so it cannot be simplified}'] }],
      lines: [
        { say: 'Step three. Can seven sixteenths be simplified? 7 is odd, and 16 only has factors of 2, so no. The answer stays 3 and seven sixteenths inches.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\tfrac{3}{16} + 3\\tfrac{7}{16} = 4\\tfrac{10}{16} = 4\\tfrac{5}{8} \\ \\checkmark', '\\text{about } 4.6 - 1.2 = 3.4 \\text{ in} \\approx 3\\tfrac{7}{16} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by adding. Start at 1 and three sixteenths, and add 3 and seven sixteenths. That is 4 and ten sixteenths, which is 4 and five eighths, the end reading.', show: 'm.0' },
        { say: 'And a quick estimate: about 4.6 minus about 1.2 is about 3.4 inches. Seven sixteenths is just under a half, so 3 and seven sixteenths is about 3.4. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$4\\tfrac{5}{8}$ in', 'the trim does **not** start at $0$: subtract'],
            ['$\\tfrac{5}{8} - \\tfrac{3}{16} = \\tfrac{2}{8}$', 'make the denominators the **same** first'],
            ['each small mark is $0.1$ in', 'on this ruler, each mark is $\\tfrac{1}{16}$ in'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The end reading is not the length, because the trim does not start at zero. Subtract the start reading.' },
        { say: 'You cannot just subtract the tops of five eighths and three sixteenths. Make the denominators the same first.' },
        { say: 'And imperial rulers are not marked in tenths. On this ruler, each small mark is one sixteenth of an inch.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bolt is measured with a ruler marked in sixteenths. One end lines up with the $2\\tfrac{1}{4}$ in mark and the other with the $5\\tfrac{1}{16}$ in mark. How long is the bolt?',
          choices: ['$2\\tfrac{13}{16}$ in', '$3\\tfrac{3}{16}$ in', '$3\\tfrac{3}{12}$ in', '$7\\tfrac{5}{16}$ in'],
          answer: 0,
          working: '$5\\tfrac{1}{16} - 2\\tfrac{4}{16} = 4\\tfrac{17}{16} - 2\\tfrac{4}{16} = 2\\tfrac{13}{16}$ in.',
        },
      ],
      lines: [
        { say: 'Your turn. A bolt is measured with a ruler marked in sixteenths. One end lines up with the 2 and a quarter inch mark, and the other with the 5 and one sixteenth inch mark. How long is the bolt? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A quarter is four sixteenths. One sixteenth minus four sixteenths does not work, so borrow an inch: 5 and one sixteenth is 4 and seventeen sixteenths. Then 4 and seventeen sixteenths minus 2 and four sixteenths is 2 and thirteen sixteenths inches. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Length $=$ end reading $-$ start reading', 'Imperial marks are **sixteenths**, not tenths', 'Use the **same denominator** to subtract', 'Check by adding back'] }],
      lines: [
        { say: 'Here is what to remember. The length is the end reading minus the start reading.', show: 'sum.0' },
        { say: 'Imperial rulers are marked in sixteenths of an inch, not tenths.', show: 'sum.1' },
        { say: 'Write the fractions with the same denominator before you subtract.', show: 'sum.2' },
        { say: 'And check by adding back. For more on reading rulers and tape measures, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
