import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from '@/content/math6/videos/lib/m6-12-figures.ts';

// Exam question for Math 7 lesson 3.3 (solving fraction problems). The question is an exercise
// from OpenStax Prealgebra 2e, word for word (section 4.6, Add and Subtract Mixed Numbers,
// CC BY-NC-SA 4.0). Two borders: 1 1/2 + 1 1/2 = 3, and 8 1/2 − 3 = 5 1/2 inches.

const QUESTION =
  'Printing Nishant is printing invitations on his computer. The paper is 8 1/2 inches wide, and he sets the print area to have a 1 1/2-inch border on each side. How wide is the print area on the sheet of paper?';

const paper = (id: string) =>
  figure(
    id,
    [
      stackBar({
        width: 12,
        whole: '8\\tfrac{1}{2} \\text{ in}',
        parts: [
          { id: 'left', value: 1.5, tone: 'opp', label: '1\\tfrac{1}{2}', below: '\\text{border}' },
          { id: 'print', value: 5.5, tone: 'good', label: '5\\tfrac{1}{2}', below: '\\text{print area}' },
          { id: 'right', value: 1.5, tone: 'opp', label: '1\\tfrac{1}{2}', below: '\\text{border}' },
        ],
      }),
    ],
    220,
  );

const video: Explainer = {
  id: 'xq-m7-3-3',
  lessonId: '',
  exam: {
    lesson: 'm7-3-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.6, Add and Subtract Mixed Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-6-add-and-subtract-mixed-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: How Wide Is the Print Area? (Solving Fraction Problems)',
  thumbnailTitle: 'How Wide Is the Print Area?',
  thumbnail: 'pa',
  summary:
    'A real test question, solved one small step at a time: the paper is 8 1/2 inches wide, with a 1 1/2-inch border on each side. How wide is the print area? There are two borders, so together they take 1 1/2 + 1 1/2 = 3 inches. The print area is what is left: 8 1/2 − 3 = 5 1/2 inches. Then we check by adding the pieces back up and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Wide Is the Print Area?', subtitle: 'Solving fraction problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that uses mixed numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: '**Printing** Nishant is printing invitations on his computer. The paper is $8\\dfrac{1}{2}$ inches wide, and he sets the print area to have a $1\\dfrac{1}{2}$-inch border on each side. How wide is the print area on the sheet of paper?',
          answer: '$5\\dfrac{1}{2}$ inches',
          working: '8 1/2 − (1 1/2 + 1 1/2) = 8 1/2 − 3 = 5 1/2',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Nishant is printing invitations on his computer. The paper is 8 and a half inches wide, and he sets the print area to have a 1 and a half inch border on each side. How wide is the print area on the sheet of paper?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A border on each side', md: 'Across the paper there is a **border** on the left, then the **print area**, then a **border** on the right. **Each side** means **two** borders. The print area is the width that is **left over**.' }],
      lines: [
        { say: 'Go across the paper from left to right. First there is a border, then the print area, then another border.', show: 'c' },
        { say: 'Each side means two borders. The print area is the width that is left over.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Mixed numbers', md: 'To add or subtract mixed numbers, work with the **whole numbers** and the **fractions** separately, then put them together. Two halves make **one whole**.' }],
      lines: [
        { say: 'Here is what we need. To add or subtract mixed numbers, work with the whole numbers and the fractions separately, then put them together.', show: 'c' },
        { say: 'And remember that two halves make one whole.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the **two borders**', '**Subtract** them from the paper width', 'Check that the pieces **add back** to $8\\dfrac{1}{2}$'] }],
      lines: [
        { say: 'Here is the plan. Add the two borders.', show: 'plan.0' },
        { say: 'Subtract them from the width of the paper.', show: 'plan.1' },
        { say: 'Then check that the pieces add back up to 8 and a half.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Borders, then what is left',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\dfrac{1}{2} + 1\\dfrac{1}{2} = 2 + \\dfrac{2}{2} = 2 + 1 = \\opp{3}', '8\\dfrac{1}{2} - \\opp{3} = \\good{5\\dfrac{1}{2} \\text{ inches}}'] }],
      lines: [
        { say: 'Step one. Add the two borders. The wholes: 1 plus 1 is 2. The fractions: a half plus a half is 2 halves, which is 1 whole. So 2 plus 1 is 3. The borders take 3 inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Take the borders away from the paper. 8 and a half minus 3: 8 minus 3 is 5, and the half stays. The print area is 5 and a half inches wide.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [paper('pa')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1\\tfrac{1}{2} + 5\\tfrac{1}{2} + 1\\tfrac{1}{2}', '= 7 + \\tfrac{3}{2} = 8\\tfrac{1}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Here is the paper: a border, the print area, and another border.', show: ['pa.left', 'pa.print', 'pa.right', 'pa.whole'] },
        { say: 'Add the three pieces back together: 1 and a half, plus 5 and a half, plus 1 and a half.', show: 'm.0', focus: 'm.0' },
        { say: 'The wholes make 7, and 3 halves are 1 and a half more. That is 8 and a half, the width of the paper. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$7$ inches', 'took away **one** border: there is one on **each side**'],
            ['$10$ inches', 'added the border: the print area is what is **left**, so subtract'],
            ['$6$ inches', 'treated $\\tfrac{1}{2} + \\tfrac{1}{2}$ as $\\tfrac{2}{4}$: two halves make **one whole**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '7 inches takes away only one border. There is a border on each side, so take away two.' },
        { say: '10 inches adds the border on. The print area is inside the paper, so it must be narrower than 8 and a half. Subtract.' },
        { say: 'And 6 inches comes from adding the halves wrongly: a half plus a half is not 2 quarters. It is 2 halves, 1 whole, so the borders take 3 inches, not 2 and a half.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A photo is $10\\dfrac{3}{4}$ inches wide. A frame adds a $1\\dfrac{1}{4}$-inch strip on each side. How wide is the photo in its frame?',
          choices: ['$12$ inches', '$8\\dfrac{1}{4}$ inches', '$13\\dfrac{1}{4}$ inches', '$13$ inches'],
          answer: 2,
          working: 'Two strips: 1 1/4 + 1 1/4 = 2 1/2. Then 10 3/4 + 2 1/2 = 10 3/4 + 2 2/4 = 12 5/4 = 13 1/4.',
        },
      ],
      lines: [
        { say: 'Your turn. A photo is 10 and 3 quarters inches wide. A frame adds a 1 and 1 quarter inch strip on each side. How wide is the photo in its frame? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Two strips make 2 and 2 quarters, which is 2 and a half. This time the frame is added on: 10 and 3 quarters plus 2 and 2 quarters is 12 and 5 quarters, which is 13 and 1 quarter inches. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read **each side** as **two** pieces', 'Work with **wholes** and **fractions** separately', 'Decide: **add on** or **take away**', 'Check that the pieces **add back**'] }],
      lines: [
        { say: 'Here is what to remember. Each side means two pieces.', show: 'sum.0' },
        { say: 'Work with the whole numbers and the fractions separately.', show: 'sum.1' },
        { say: 'Decide whether the pieces are added on, or taken away.', show: 'sum.2' },
        { say: 'And check that the pieces add back to the whole. For more on solving fraction problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
