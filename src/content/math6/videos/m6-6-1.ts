import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder } from './lib/m6-6-figures.ts';

// The four steps in a row: parentheses, powers, multiply and divide, add and subtract.
const steps = (id: string, height = 170) =>
  figure(
    id,
    [
      ladder({
        symbols: ['(\\quad)', '3^{2}', '\\times \\quad \\div', '+ \\quad -'],
        captions: ['\\text{Step 1}', '\\text{Step 2}', '\\text{Step 3}', '\\text{Step 4}'],
      }),
    ],
    height,
  );

const video: Explainer = {
  id: 'm6-6-1',
  lessonId: 'm6-6-1',
  title: 'Order of Operations with Powers, Part 1: The Order of Operations',
  thumbnailTitle: 'The Order of Operations',
  thumbnail: 'ld',
  summary:
    'Why everyone needs the same order: 2 + 3 × 4 is 14, not 20. The order of operations: parentheses, then powers, then multiply and divide from left to right, then add and subtract from left to right, with 12 ÷ 4 × 2 = 6 and 10 − 4 + 1 = 7 worked from left to right.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'The Order of Operations', subtitle: 'So everyone gets the same answer' }],
      lines: [
        { say: 'What is two plus three times four? If you add first, you get twenty. If you multiply first, you get fourteen. Only one answer can be right!', show: 'title' },
        { say: 'In this video, you will learn the order of operations. It is the order everyone uses, so everyone gets the same answer.' },
      ],
    },
    {
      chapter: 'Two answers?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 + 3 \\times 4', '\\text{Add first: } \\opp{2 + 3} \\times 4 = 5 \\times 4 = \\bad{20}', '\\text{Multiply first: } 2 + \\opp{3 \\times 4} = 2 + 12 = \\good{14}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Expression', md: 'An **expression** is a group of numbers and operations, such as $2 + 3 \\times 4$. To **evaluate** an expression means to find its value.' },
      ],
      lines: [
        { say: 'Here is the question again: two plus three times four. This is called an expression. An expression is a group of numbers and operations, like adding, subtracting, multiplying and dividing.', show: ['m.0', 'def'] },
        { say: 'To evaluate an expression means to find its value, the number it is equal to.' },
        { say: 'Suppose you add first. Two plus three is five, and five times four is twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'Now suppose you multiply first. Three times four is twelve, and two plus twelve is fourteen.', show: 'm.2', focus: 'm.2' },
        { say: 'The same expression cannot have two different values. So mathematicians agree on an order. In that order, multiplying comes before adding, so the right answer is fourteen.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The four steps',
      layout: 'center',
      main: [
        steps('ld'),
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'What to do', 'Example'],
          rows: [
            ['1', 'Parentheses', '$(2 + 3) \\times 4 = 5 \\times 4$'],
            ['2', 'Powers', '$2 + 3^{2} = 2 + 9$'],
            ['3', '$\\times$ and $\\div$, left to right', '$12 \\div 4 \\times 2 = 3 \\times 2$'],
            ['4', '$+$ and $-$, left to right', '$10 - 4 + 1 = 6 + 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the order of operations. It has four steps, and you always do them in this order.', show: ['ld.b0', 'ld.b1', 'ld.b2', 'ld.b3', 'ld.a1', 'ld.a2', 'ld.a3', 't'] },
        { say: 'Step one: parentheses. Parentheses are the curved brackets around part of an expression. Work inside them first. In the example, add two plus three inside the brackets first, to get five times four.', focus: ['ld.b0', 't.0'] },
        { say: 'Step two: powers. A power, like three to the power of two, means three times three, which is nine. Do powers next. So two plus three to the power of two is two plus nine. You will learn more about powers in the next part.', focus: ['ld.b1', 't.1'] },
        { say: 'Step three: multiply and divide, from left to right. In twelve divided by four, times two, divide first, because it comes first. Twelve divided by four is three, so we get three times two.', focus: ['ld.b2', 't.2'] },
        { say: 'Step four: add and subtract, from left to right. In ten minus four plus one, subtract first, because it comes first. Ten minus four is six, so we get six plus one.', focus: ['ld.b3', 't.3'] },
      ],
    },
    {
      chapter: 'Ways to remember',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Ways to remember the order',
          md: 'People remember the order with words such as **BEDMAS**, **PEMDAS** or **BODMAS**. The letters stand for the steps: brackets or parentheses, then powers (exponents or orders), then division and multiplication, then addition and subtraction.',
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Pairs that share a step', md: 'Multiplying and dividing share one step: do them **from left to right**. Adding and subtracting share one step too.' },
      ],
      lines: [
        { say: 'People remember the order in different ways, such as BEDMAS, PEMDAS or BODMAS. Each letter stands for a step.', show: 'tip' },
        { say: 'The words are different because people name the steps differently. Brackets and parentheses mean the same thing. Powers are sometimes called exponents, or orders. Use whichever word helps you.' },
        { say: 'But watch out for one thing. In every one of these words, multiplying and dividing share one step. You do them in the order they appear, from left to right. Adding and subtracting share one step in the same way.', show: 'key' },
      ],
    },
    {
      chapter: 'Left to right',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\opp{12 \\div 4} \\times 2 = \\opp{3} \\times 2 = \\good{6}', '\\opp{10 - 4} + 1 = \\opp{6} + 1 = \\good{7}'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying does not always go first', md: 'In $12 \\div 4 \\times 2$, do not multiply $4 \\times 2$ first. That gives $12 \\div 8$, which is wrong. Go from left to right.' },
      ],
      lines: [
        { say: 'Let’s finish both examples. In twelve divided by four, times two, go from left to right. Twelve divided by four is three. Then three times two is six.', show: 'm.0', focus: 'm.0' },
        { say: 'In ten minus four plus one, go from left to right as well. Ten minus four is six. Then six plus one is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch out. Some people think multiplying always comes before dividing. If you multiply four times two first, you get twelve divided by eight, which is not six. Multiplying and dividing are done in order, from left to right.', show: 'oops' },
        { say: 'In the same way, if you add four plus one first in the second example, you get ten minus five, which is five, not seven. Left to right is the rule.' },
      ],
    },
    {
      chapter: 'Putting it together',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['8 + 12 \\div 3 - 2', '= 8 + \\opp{12 \\div 3} - 2', '= \\opp{8 + 4} - 2', '= \\opp{12 - 2}', '= \\good{10}'],
        },
      ],
      lines: [
        { say: 'Let’s use all the steps. Evaluate eight plus twelve divided by three, minus two.', show: 'm.0' },
        { say: 'Are there any parentheses? No. Any powers? No. So go to step three: multiply and divide. The only one is twelve divided by three.', show: 'm.1', focus: 'm.1' },
        { say: 'Twelve divided by three is four. Now we have eight plus four, minus two. Step four: add and subtract from left to right. Eight plus four is twelve.', show: 'm.2', focus: 'm.2' },
        { say: 'Then twelve minus two is ten. So the expression is equal to ten.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $20 - 6 \\div 2 \\times 3$.',
          choices: ['$21$', '$11$', '$19$', '$7$'],
          answer: 1,
          working: 'There are no parentheses or powers. Divide and multiply from left to right: $6 \\div 2 = 3$ and $3 \\times 3 = 9$. Then $20 - 9 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate twenty minus six divided by two, times three. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B, eleven. Divide and multiply from left to right: six divided by two is three, and three times three is nine. Then twenty minus nine is eleven. Choice C multiplies two times three first, but dividing comes first here, because it is on the left.',
          show: 'q.answer',
        },
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
          items: ['Everyone uses the same order, so everyone gets the same answer.', 'Parentheses, then powers.', 'Then $\\times$ and $\\div$ from left to right.', 'Then $+$ and $-$ from left to right.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Everyone uses the same order of operations, so everyone gets the same answer.', show: 'sum.0' },
        { say: 'First, work inside parentheses. Then do powers.', show: 'sum.1' },
        { say: 'Then multiply and divide, from left to right.', show: 'sum.2' },
        { say: 'Then add and subtract, from left to right. In the next part, you will look closely at powers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
