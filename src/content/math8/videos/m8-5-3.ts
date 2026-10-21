import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The order of operations: brackets, then multiply and divide, then add and subtract.
const order = (id: string) =>
  figure(
    id,
    [
      ladder({
        symbols: ['(\\;\\;)', '\\times \\;\\; \\div', '+ \\;\\; -'],
        captions: ['\\text{brackets}', '\\text{multiply, divide}', '\\text{add, subtract}'],
        width: 2.8,
        gap: 2,
      }),
    ],
    210,
  );

const video: Explainer = {
  id: 'm8-5-3',
  lessonId: 'm8-5-3',
  title: 'Order of Operations with Integers, Part 1: Multiply Before You Add',
  thumbnailTitle: 'Multiply Before You Add',
  thumbnail: 'or',
  summary:
    'The order of operations: brackets first, then multiply and divide from left to right, then add and subtract from left to right. (−3) + 4 × (−2): multiply first, 4 × (−2) = −8, then (−3) + (−8) = −11. Working from left to right gives −2, which is wrong. 6 − 3 × (−4) = 6 − (−12) = 6 + 12 = 18.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 1', title: 'Multiply Before You Add', subtitle: 'The order of operations with integers' }],
      lines: [
        { say: 'Simran scores four points for each correct answer in a maths contest, and loses two points for each wrong answer. To find the score, you need several operations with integers, done in the right order.', show: 'title' },
        { say: 'In this part, you will use the order of operations with integers.' },
      ],
    },
    {
      chapter: 'The order of operations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Order of operations', md: 'Do the operations inside **brackets** first. Then **multiply and divide** from left to right. Then **add and subtract** from left to right.' },
        order('or'),
      ],
      lines: [
        { say: 'When an expression has more than one operation, everyone must do them in the same order. Otherwise we would all get different answers. This agreed order is called the order of operations.', show: 'def' },
        { say: 'First, do the operations inside brackets.', show: 'or.b0', focus: 'or.b0' },
        { say: 'Second, multiply and divide, from left to right.', show: ['or.a1', 'or.b1'], focus: 'or.b1' },
        { say: 'Third, add and subtract, from left to right.', show: ['or.a2', 'or.b2'], focus: 'or.b2' },
        { say: 'These are the same rules you use with whole numbers. Now the numbers can be negative, so watch the signs at every step.' },
      ],
    },
    {
      chapter: 'Multiply first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $(-3) + 4 \\times (-2)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-3) + \\underline{4 \\times (-2)}', '= (-3) + (-8)', '= -11'] },
      ],
      lines: [
        { say: 'Evaluate negative three plus four times negative two. To evaluate means to find the value.', show: 'q' },
        { say: 'There are no brackets, so multiply first. Four times negative two is negative eight, because the signs are different.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the expression is negative three plus negative eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add. Negative three plus negative eight is negative eleven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Working from left to right', md: 'In $(-3) + 4 \\times (-2)$, do **not** add first. Multiplication comes before addition, even when the addition is on the left.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-3) + 4 = 1, \\quad 1 \\times (-2) = -2 \\;\\bad{\\times}', '4 \\times (-2) = -8, \\quad (-3) + (-8) = -11 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people work straight from left to right. Negative three plus four is one, and one times negative two is negative two.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That is wrong. Multiplication comes before addition, even when the addition is on the left.', focus: 'oops' },
        { say: 'Multiply first, then add, and you get the right answer: negative eleven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Subtracting a product',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $6 - 3 \\times (-4)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 - \\underline{3 \\times (-4)}', '= 6 - (-12)', '= 6 + 12', '= 18'] },
      ],
      lines: [
        { say: 'Here is another one. Evaluate six minus three times negative four.', show: 'q' },
        { say: 'Multiply first. Three times negative four is negative twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the expression is six minus negative twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtracting a negative is the same as adding its opposite. So six minus negative twelve is six plus twelve.', show: 'm.2', focus: 'm.2' },
        { say: 'And six plus twelve is eighteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $5 + (-3) \\times 4$.',
          choices: ['$8$', '$-17$', '$-7$', '$7$'],
          answer: 2,
          working: 'Multiply first: $(-3) \\times 4 = -12$. Then add: $5 + (-12) = -7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate five plus negative three times four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative seven. Multiply first: negative three times four is negative twelve. Then five plus negative twelve is negative seven. Choice A adds first, from left to right, which breaks the order of operations.', show: 'q.answer' },
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
            'Brackets first.',
            'Then multiply and divide, from left to right.',
            'Then add and subtract, from left to right.',
            'Watch the signs at every step: $(-3) + 4 \\times (-2) = -11$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In the order of operations, do the brackets first.', show: 'sum.0' },
        { say: 'Then multiply and divide, from left to right.', show: 'sum.1' },
        { say: 'Then add and subtract, from left to right.', show: 'sum.2' },
        { say: 'And watch the signs at every step. In the next part, you will work with brackets and longer expressions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
