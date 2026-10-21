import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// 4.5 + 2.4 × 3 as a bar: one piece of 4.5 and three pieces of 2.4, 11.7 in all.
const bar = figure('br', [
  bars({
    rows: [
      {
        id: 'r',
        pieces: [
          { w: 4.5, tex: '4.5', tone: 'opp' },
          { w: 2.4, tex: '2.4', tone: 'adj' },
          { w: 2.4, tex: '2.4', tone: 'adj' },
          { w: 2.4, tex: '2.4', tone: 'adj' },
        ],
      },
    ],
    total: '11.7',
  }),
], 240);

const video: Explainer = {
  id: 'm7-2-3',
  lessonId: 'm7-2-3',
  title: 'Order of Operations with Decimals, Part 1: The Order of Operations',
  thumbnailTitle: 'The Order of Operations',
  thumbnail: 'br',
  summary:
    'The order of operations is the agreed order for working out an expression: brackets first, then multiply and divide from left to right, then add and subtract from left to right. So 4.5 + 2.4 × 3 = 4.5 + 7.2 = 11.7 (estimate 5 + 2 × 3 = 11). Working from left to right instead gives 6.9 × 3 = 20.7, which is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 1', title: 'The Order of Operations', subtitle: 'Multiply before you add' }],
      lines: [
        { say: 'Kai and Hana both work out four point five plus two point four times three. Kai gets twenty point seven, and Hana gets eleven point seven. They cannot both be right!', show: 'title' },
        { say: 'Mathematicians agree on one order for the operations, so everyone gets the same answer. In this lesson, you will use that order with decimals, and write expressions to solve problems.' },
      ],
    },
    {
      chapter: 'Two different answers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'q', size: 'xl', lines: ['4.5 + 2.4 \\times 3'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Kai: } 4.5 + 2.4 = 6.9, \\quad 6.9 \\times 3 = 20.7', '\\text{Hana: } 2.4 \\times 3 = 7.2, \\quad 4.5 + 7.2 = 11.7'] },
      ],
      lines: [
        { say: 'Here is the expression: four point five plus two point four times three. An expression is a group of numbers and operations. The operations are add, subtract, multiply and divide.', show: 'q' },
        { say: 'Kai worked from left to right. Four point five plus two point four is six point nine. Then six point nine times three is twenty point seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Hana multiplied first. Two point four times three is seven point two. Then four point five plus seven point two is eleven point seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Both did their arithmetic correctly. They just did the operations in a different order. So which order is right?' },
      ],
    },
    {
      chapter: 'A picture of it',
      layout: 'center',
      main: [
        bar,
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.5 + \\adj{2.4 \\times 3} = 4.5 + 7.2 = 11.7'] },
      ],
      lines: [
        { say: 'Think about what the expression means. It could describe a box with a mass of four point five kilograms, plus three bags with a mass of two point four kilograms each.', show: ['br.r-p0', 'br.r-p1', 'br.r-p2', 'br.r-p3'] },
        { say: 'The two point four is counted three times. The four point five is counted only once. So the times three belongs to the two point four alone.', focus: ['br.r-p1', 'br.r-p2', 'br.r-p3'] },
        { say: 'Three bags of two point four make seven point two. Add the box: eleven point seven kilograms in all. Hana is right.', show: ['m', 'br.total'], focus: 'm' },
      ],
    },
    {
      chapter: 'The agreed order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Order of operations', md: 'The **order of operations** is the agreed order for doing the operations in an expression.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1.** Do the operations inside **brackets** first.', '**2.** **Multiply and divide**, from left to right.', '**3.** **Add and subtract**, from left to right.'],
        },
      ],
      lines: [
        { say: 'To make sure everyone gets the same answer, mathematicians agree on an order. It is called the order of operations.', show: 'def' },
        { say: 'One: do the operations inside brackets first. Brackets are the curved lines that hold part of an expression together.', show: 'b.0' },
        { say: 'Two: multiply and divide, working from left to right.', show: 'b.1' },
        { say: 'Three: add and subtract, working from left to right. So multiplying comes before adding, unless brackets say otherwise.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Multiply before you add',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $4.5 + 2.4 \\times 3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 5 + 2 \\times 3 = 5 + 6 = 11', '4.5 + \\adj{2.4 \\times 3}', '= 4.5 + 7.2', '= 11.7'] },
      ],
      lines: [
        { say: 'Let’s evaluate the expression the agreed way. To evaluate means to find its value.', show: 'q' },
        { say: 'Estimate first, using the same order. Four point five is about five, and two point four is about two. Five plus two times three is five plus six, which is eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'There are no brackets. So multiply first: two point four times three is seven point two.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Then add: four point five plus seven point two is eleven point seven. That is close to the estimate of eleven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Working from left to right', md: 'Kai added first: $4.5 + 2.4 = 6.9$, then $6.9 \\times 3 = 20.7$. Multiplication comes **before** addition, unless brackets say otherwise.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(4.5 + 2.4) \\times 3 = 20.7'] },
      ],
      lines: [
        { say: 'Watch out for Kai’s mistake. Reading from left to right feels natural, so it is tempting to add first.', show: 'oops' },
        { say: 'But multiplication comes before addition, unless brackets say otherwise. Kai’s answer, twenty point seven, is what you get when the expression has brackets around the first two numbers.', show: 'm', focus: 'm' },
        { say: 'The estimate helps here as well. It was about eleven, and twenty point seven is far away from that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $6.4 - 1.2 \\times 2$.',
          choices: ['$10.4$', '$4$', '$8.8$', '$5.2$'],
          answer: 1,
          working: 'Multiply first: $1.2 \\times 2 = 2.4$. Then subtract: $6.4 - 2.4 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate six point four minus one point two times two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, which is four. Multiply first: one point two times two is two point four. Then subtract: six point four minus two point four is four. Choice A works from left to right and subtracts first.', show: 'q.answer' },
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
            'The **order of operations**: brackets first, then multiply and divide, then add and subtract.',
            'Multiply and divide from left to right; add and subtract from left to right.',
            '$4.5 + 2.4 \\times 3 = 4.5 + 7.2 = 11.7$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The order of operations is brackets first, then multiply and divide, then add and subtract.', show: 'sum.0' },
        { say: 'Multiply and divide from left to right, then add and subtract from left to right.', show: 'sum.1' },
        { say: 'So four point five plus two point four times three is eleven point seven. In the next part, you will see how brackets change the order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
