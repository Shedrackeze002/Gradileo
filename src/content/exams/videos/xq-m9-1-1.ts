import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squares } from '@/content/math8/videos/lib/m8-8-figures.ts';

// Exam question for Math 9 lesson 1.1 (square roots of perfect squares). The question is a Try It
// from OpenStax Elementary Algebra 2e, word for word (section 9.1, Simplify and Use Square Roots,
// CC BY-NC-SA 4.0). (a) √9 + √16 = 3 + 4 = 7, but (b) √(9 + 16) = √25 = 5: the square root of a
// sum is not the sum of the square roots. Squares of 9, 16 and 25 unit squares show it.

const QUESTION = 'Simplify: (a) √9 + √16 (b) √(9 + 16).';

// A square of side n, made of n × n unit squares, labelled by its area.
const block = (name: string, n: number, x: number, tone: 'adj' | 'opp' | 'good', label: string) =>
  squares({
    name,
    at: [x, 0],
    cells: Array.from({ length: n * n }, (_, i): [number, number] => [i % n, Math.floor(i / n)]),
    tone,
    group: () => 'sq',
    label,
  });

const blocks = (id: string) =>
  figure(
    id,
    [
      block('a', 3, 0, 'adj', '9 = 3 \\times 3'),
      block('b', 4, 4.2, 'opp', '16 = 4 \\times 4'),
      block('c', 5, 9.6, 'good', '25 = 5 \\times 5'),
    ],
    380,
  );

const video: Explainer = {
  id: 'xq-m9-1-1',
  lessonId: '',
  exam: {
    lesson: 'm9-1-1',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 9.1, Simplify and Use Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/9-1-simplify-and-use-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: Square Roots of 9, 16 and 25 (Square Roots of Perfect Squares)',
  thumbnailTitle: 'Is √9 + √16 the Same as √25?',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: simplify (a) √9 + √16 and (b) √(9 + 16). For part a, take each square root first: 3 + 4 = 7. For part b, add first, because the 9 + 16 is under the root sign: √25 = 5. The answers are different, so the square root of a sum is not the sum of the square roots. Then we check by squaring and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is √9 + √16 the Same as √25?', subtitle: 'Square roots of perfect squares, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about square roots of perfect squares. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: (a) $\\sqrt{9} + \\sqrt{16}$ (b) $\\sqrt{9 + 16}$.',
          answer: '(a) $7$ (b) $5$',
          working: '(a) 3 + 4 = 7 (b) √25 = 5',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify. Part a: the square root of 9, plus the square root of 16. Part b: the square root of 9 plus 16, where the 9 plus 16 is all under the root sign.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [blocks('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Square root', md: 'The **square root** of a number is the side length of a square with that **area**. $\\sqrt{9} = 3$, because $3 \\times 3 = 9$.' }],
      lines: [
        { say: 'Here are three squares. The first has 9 small squares, so it is 3 wide. The next has 16, so it is 4 wide. The last has 25, so it is 5 wide.', show: ['ask.a-sq', 'ask.a-label', 'ask.b-sq', 'ask.b-label', 'ask.c-sq', 'ask.c-label'] },
        { say: 'The square root of a number is the side length of a square with that area. The square root of 9 is 3, because 3 times 3 is 9.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{9} = 3, \\quad \\sqrt{16} = 4, \\quad \\sqrt{25} = 5', '\\text{the root sign is a bracket: work out what is under it first}'] }],
      lines: [
        { say: 'Here is what we need. 9, 16 and 25 are perfect squares. Their square roots are 3, 4 and 5.', show: 'm.0' },
        { say: 'And the root sign acts like a bracket. Whatever is under it is worked out first.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Take **each** square root, then **add**', '(b) **Add** under the root sign, then take the root', '**Compare** the two answers'] }],
      lines: [
        { say: 'Here is the plan. For part a, take each square root, then add.', show: 'plan.0' },
        { say: 'For part b, add under the root sign first, then take the square root.', show: 'plan.1' },
        { say: 'Then compare the two answers.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Root first, or add first',
      layout: 'split',
      leftWidth: 620,
      left: [blocks('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } \\sqrt{9} + \\sqrt{16} = 3 + 4', '= \\good{7}', '\\text{(b) } \\sqrt{9 + 16} = \\sqrt{25}', '= \\good{5}', '7 \\ne 5'] }],
      lines: [
        { say: 'Here are the squares again.', show: ['st.a-sq', 'st.a-label', 'st.b-sq', 'st.b-label', 'st.c-sq', 'st.c-label'] },
        { say: 'Step one, part a. The square root of 9 is 3, and the square root of 16 is 4. These are the side lengths of the first two squares.', show: 'm.0', focus: ['st.a-sq', 'st.b-sq', 'm.0'] },
        { say: '3 plus 4 is 7. So the answer to part a is 7.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two, part b. Now 9 plus 16 is under the root sign, so add first. 9 plus 16 is 25, and the square root of 25 is 5. That is the side of the big square.', show: 'm.2', focus: ['st.c-sq', 'm.2'] },
        { say: 'So the answer to part b is 5.', show: 'm.3', focus: 'm.3' },
        { say: 'Step three. 7 is not 5. The square root of a sum is not the sum of the square roots.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3^2 = 9 \\text{ and } 4^2 = 16 \\ \\checkmark', '5^2 = 25 = 9 + 16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by squaring. 3 squared is 9, and 4 squared is 16. So the roots in part a are right.', show: 'm.0', focus: 'm.0' },
        { say: '5 squared is 25, which is 9 plus 16. So part b is right too. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(b) $= 7$', 'split the root over the $+$: add **under** the root first'],
            ['(a) $= 5$', 'added first: here each number has its **own** root'],
            ['$\\sqrt{9} = 4.5$', 'halved: a square root times **itself** gives the number'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying part b is 7 splits the root over the plus sign. But the root covers the whole sum, so add first.' },
        { say: 'Saying part a is 5 adds first. But in part a, each number has its own root, so take the roots first.' },
        { say: 'And the square root of 9 is not 4.5. That is half of 9. The square root is the number that times itself gives 9, which is 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $\\sqrt{36 + 64}$.',
          choices: ['$14$', '$10$', '$50$', '$100$'],
          answer: 1,
          working: '36 + 64 = 100, and √100 = 10.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify the square root of 36 plus 64, where the 36 plus 64 is all under the root sign. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Add first: 36 plus 64 is 100. The square root of 100 is 10. Choice "B". 14 is the trap: that is 6 plus 8.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **square root** is the side of a square', 'The root sign is a **bracket**: inside first', '$\\sqrt{9 + 16} \\ne \\sqrt{9} + \\sqrt{16}$', 'Check by **squaring**'] }],
      lines: [
        { say: 'Here is what to remember. A square root is the side length of a square with that area.', show: 'sum.0' },
        { say: 'The root sign is like a bracket. Work out what is under it first.', show: 'sum.1' },
        { say: 'The square root of a sum is not the sum of the square roots.', show: 'sum.2' },
        { say: 'And you can check a square root by squaring it. For more on square roots of perfect squares, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
