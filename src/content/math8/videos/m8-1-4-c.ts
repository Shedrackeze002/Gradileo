import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const T = { AB: 'adj', CA: 'opp', BC: 'hyp' } as const;

// The 3-4-5 right triangle.
const t345 = figure('t', [triangle({ A: [0, 0], B: [4, 0], C: [0, 3], right: 'A', sides: { AB: '4', CA: '3', BC: '5' }, tones: T })], 360);

// 3-4-5 and 6-8-10 side by side, to the same scale: the same shape, twice the size.
const pair = figure('pr', [
  triangle({ name: 'small', A: [0, 0], B: [4, 0], C: [0, 3], right: 'A', sides: { AB: '4', CA: '3', BC: '5' }, tones: T }),
  triangle({ name: 'big', A: [6.5, 0], B: [14.5, 0], C: [6.5, 6], right: 'A', sides: { AB: '8', CA: '6', BC: '10' }, tones: T }),
], 380);

// Legs of 15 m and 36 m give a hypotenuse of exactly 39 m (drawn to scale).
const t153639 = figure('tb', [triangle({ A: [0, 0], B: [36, 0], C: [0, 15], right: 'A', sides: { AB: '36 \\text{ m}', CA: '15 \\text{ m}', BC: '39 \\text{ m}' }, tones: T })], 320);

const video: Explainer = {
  id: 'm8-1-4-c',
  lessonId: 'm8-1-4',
  title: 'Using the Pythagorean Theorem, Part 3: Pythagorean Triples',
  thumbnailTitle: 'Pythagorean Triples',
  thumbnail: 'pr',
  summary:
    'A Pythagorean triple is a set of three whole numbers a, b and c with a² + b² = c², such as 3, 4, 5 and 5, 12, 13 and 8, 15, 17 and 7, 24, 25. Multiplying every number in a triple by the same whole number gives another triple: 3, 4, 5 times 2 is 6, 8, 10, and 5, 12, 13 times 3 is 15, 36, 39, because 225 + 1,296 = 1,521 = 39². So legs of 15 m and 36 m give a hypotenuse of exactly 39 m. Adding the same number to each does not work: 4, 5, 6 is not a triple.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 3', title: 'Pythagorean Triples', subtitle: 'Whole-number right triangles' }],
      lines: [
        { say: 'Three, four and five. Six, eight and ten. Five, twelve and thirteen. These sets of numbers keep turning up in right triangles.', show: 'title' },
        { say: 'In this part, you will learn what a Pythagorean triple is, and how to make new ones.' },
      ],
    },
    {
      chapter: 'What a triple is',
      layout: 'split',
      leftWidth: 480,
      left: [t345],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pythagorean triple', md: 'A **Pythagorean triple** is a set of three whole numbers $a$, $b$ and $c$ with $a^2 + b^2 = c^2$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3^2 + 4^2 = 9 + 16 = 25 = 5^2'] },
      ],
      lines: [
        { say: 'A Pythagorean triple is a set of three whole numbers, "a", b and c, where "a" squared plus b squared equals c squared.', show: 'def' },
        { say: 'The best known is three, four and five. Three squared plus four squared is nine plus sixteen, which is twenty-five, and that is five squared.', show: 'm', focus: 'm' },
        { say: 'So a right triangle with legs of three and four has a hypotenuse of exactly five. No square root key needed!', show: 't.shape' },
      ],
    },
    {
      chapter: 'Common triples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['$a$', '$b$', '$c$', 'Check: $a^2 + b^2 = c^2$'],
          rows: [
            ['$3$', '$4$', '$5$', '$9 + 16 = 25$'],
            ['$5$', '$12$', '$13$', '$25 + 144 = 169$'],
            ['$8$', '$15$', '$17$', '$64 + 225 = 289$'],
            ['$7$', '$24$', '$25$', '$49 + 576 = 625$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some common triples. Three, four and five: nine plus sixteen is twenty-five.', show: 'tb.0' },
        { say: 'Five, twelve and thirteen: twenty-five plus one hundred forty-four is one hundred sixty-nine, which is thirteen squared.', show: 'tb.1' },
        { say: 'Eight, fifteen and seventeen: sixty-four plus two hundred twenty-five is two hundred eighty-nine, which is seventeen squared.', show: 'tb.2' },
        { say: 'And seven, twenty-four and twenty-five: forty-nine plus five hundred seventy-six is six hundred twenty-five, which is twenty-five squared.', show: 'tb.3' },
      ],
    },
    {
      chapter: 'Multiplying a triple',
      layout: 'split',
      leftWidth: 560,
      left: [pair],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3,\\ 4,\\ 5 \\ \\xrightarrow{\\times 2}\\ 6,\\ 8,\\ 10', '6^2 + 8^2 = 36 + 64', '= 100 = 10^2 \\ \\good{\\checkmark}'] }],
      lines: [
        { say: 'If you multiply every number in a triple by the same whole number, you get another triple.', show: 'pr.small-shape' },
        { say: 'Three, four and five, times two, gives six, eight and ten.', show: ['m.0', 'pr.big-shape'], focus: 'm.0' },
        { say: 'Check: thirty-six plus sixty-four is one hundred, which is ten squared. It is a triple.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The bigger triangle has the same shape. Every side is just twice as long.' },
      ],
    },
    {
      chapter: 'Making a new triple',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Multiply the triple $5, 12, 13$ by $3$. Check that the result is a triple.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times 3 = 15, \\quad 12 \\times 3 = 36, \\quad 13 \\times 3 = 39', '15^2 + 36^2 = 225 + 1{,}296 = 1{,}521', '39^2 = 1{,}521 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Multiply the triple five, twelve and thirteen by three. Is the result a triple?', show: 'q' },
        { say: 'Five times three is fifteen, twelve times three is thirty-six, and thirteen times three is thirty-nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen squared is two hundred twenty-five, and thirty-six squared is one thousand two hundred ninety-six. Together, they make one thousand five hundred twenty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'Thirty-nine squared is also one thousand five hundred twenty-one. So fifteen, thirty-six and thirty-nine is a Pythagorean triple.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Triples save time',
      layout: 'center',
      main: [
        t153639,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply, do not add', md: 'Adding the same number to each does not make a triple. $4, 5, 6$ is **not** a triple: $4^2 + 5^2 = 16 + 25 = 41$, not $6^2 = 36$.' },
      ],
      lines: [
        { say: 'Knowing triples saves time. A right triangle with legs of fifteen metres and thirty-six metres has a hypotenuse of exactly thirty-nine metres. You can see it without any working.', show: 'tb.shape' },
        { say: 'But be careful. Only multiplying works. Adding the same number to each one does not make a triple.', show: 'oops' },
        { say: 'Four, five and six is three, four and five with one added to each. But sixteen plus twenty-five is forty-one, not thirty-six. So four, five and six is not a triple.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which set of numbers is a Pythagorean triple?',
          choices: ['$4, 5, 6$', '$2, 3, 4$', '$10, 24, 26$', '$5, 6, 7$'],
          answer: 2,
          working: '$10, 24, 26$ is $5, 12, 13$ times $2$. Check: $10^2 + 24^2 = 100 + 576 = 676 = 26^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which set of numbers is a Pythagorean triple? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. It is five, twelve and thirteen, times two. One hundred plus five hundred seventy-six is six hundred seventy-six, which is twenty-six squared. Choice A adds one to three, four and five, and sixteen plus twenty-five is forty-one, not thirty-six.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'A **Pythagorean triple** is three whole numbers with $a^2 + b^2 = c^2$, like $3, 4, 5$.',
            'Common triples: $3, 4, 5$ and $5, 12, 13$ and $8, 15, 17$ and $7, 24, 25$.',
            'Multiply a triple by a whole number to get another: $15, 36, 39$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A Pythagorean triple is three whole numbers where "a" squared plus b squared equals c squared.', show: 'sum.0' },
        { say: 'Three, four and five is the best known, and there are many others.', show: 'sum.1' },
        { say: 'Multiply every number in a triple by the same whole number to make another triple. In the next part, you will use the theorem backwards, to test for a right triangle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
