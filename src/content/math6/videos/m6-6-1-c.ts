import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// (2 + 3)² is a 5 by 5 square of 25 tiles; 2 + 3² is 2 tiles and a 3 by 3 square, 11 tiles.
const both = (id: string) =>
  figure(
    id,
    [
      tiles({ name: 'big', cols: 5, rows: 5, labels: { width: '2 + 3', height: '2 + 3' } }),
      tiles({ name: 'one', cols: 1, rows: 1, at: [8, 0] }),
      tiles({ name: 'two', cols: 1, rows: 1, at: [9.4, 0] }),
      tiles({ name: 'sq', cols: 3, rows: 3, at: [11.2, 0], labels: { width: '3', height: '3' } }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm6-6-1-c',
  lessonId: 'm6-6-1',
  title: 'Order of Operations with Powers, Part 3: Parentheses Come First',
  thumbnailTitle: 'Parentheses Come First',
  thumbnail: 'bt',
  summary:
    'Parentheses change the order: (2 + 3)² = 5² = 25, but 2 + 3² = 2 + 9 = 11. Longer expressions step by step: (6 − 2)² ÷ 8 + 3 × 5 = 17, and 2 × (5² − 13) + 4 = 28, with a power inside the parentheses, writing the whole expression again after each step.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Parentheses Come First', subtitle: 'Longer expressions, one step at a time' }],
      lines: [
        { say: 'Parentheses are step one of the order of operations. They can change the answer completely.', show: 'title' },
        { say: 'In this video, you will evaluate longer expressions with parentheses and powers, one step at a time.' },
      ],
    },
    {
      chapter: 'With and without parentheses',
      layout: 'center',
      main: [both('bt'), { kind: 'math', id: 'm', size: 'md', lines: ['(\\opp{2 + 3})^{2} = 5^{2} = 25 \\qquad 2 + \\opp{3^{2}} = 2 + 9 = 11'] }],
      lines: [
        { say: 'Look at two plus three in brackets, all to the power of two. The parentheses say: work inside them first.', show: 'm.0' },
        { say: 'Two plus three is five. Then five to the power of two is five times five, which is twenty-five. Picture a square of tiles, five wide and five tall.', show: ['bt.big-outline', 'bt.big-grid', 'bt.big-width', 'bt.big-height'] },
        { say: 'Now take away the parentheses: two plus three to the power of two. With no parentheses, the power comes first, and it belongs only to the three.' },
        { say: 'Three to the power of two is nine. Then two plus nine is eleven. That is two single tiles, and a square of nine.', show: ['bt.one-outline', 'bt.two-outline', 'bt.sq-outline', 'bt.sq-grid', 'bt.sq-width', 'bt.sq-height'] },
        { say: 'Same numbers, same operations, but twenty-five is not eleven. The parentheses changed the order, and the answer.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $(6 - 2)^{2} \\div 8 + 3 \\times 5$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['(\\opp{6 - 2})^{2} \\div 8 + 3 \\times 5', '= \\opp{4^{2}} \\div 8 + 3 \\times 5', '= \\opp{16 \\div 8} + \\opp{3 \\times 5}', '= \\opp{2 + 15}', '= 17'],
        },
      ],
      lines: [
        { say: 'Here is a longer one. Evaluate six minus two in brackets, to the power of two, divided by eight, plus three times five.', show: ['q', 'm.0'] },
        { say: 'Step one: parentheses. Six minus two is four. Write the whole expression again, with four in place of the brackets.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two: powers. Four to the power of two is sixteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three: multiply and divide, from left to right. Sixteen divided by eight is two, and three times five is fifteen.', show: 'm.3', focus: 'm.3' },
        { say: 'Step four: add. Two plus fifteen is seventeen. So the whole expression is equal to seventeen.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A power inside parentheses',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $2 \\times (5^{2} - 13) + 4$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['2 \\times (\\opp{5^{2}} - 13) + 4', '= 2 \\times (\\opp{25 - 13}) + 4', '= \\opp{2 \\times 12} + 4', '= \\opp{24 + 4}', '= 28'],
        },
      ],
      lines: [
        { say: 'Sometimes there is a power inside the parentheses. Evaluate two times, five to the power of two, minus thirteen, in brackets, plus four.', show: ['q', 'm.0'] },
        { say: 'Parentheses come first. Inside them, use the same order: the power comes before subtracting. Five to the power of two is twenty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'Still inside the parentheses, twenty-five minus thirteen is twelve. Now the brackets are done.', show: 'm.2', focus: 'm.2' },
        { say: 'Next, multiply: two times twelve is twenty-four.', show: 'm.3', focus: 'm.3' },
        { say: 'Last, add: twenty-four plus four is twenty-eight.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'One step at a time',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Rewrite after each step',
          md: 'Write the whole expression again after each step. You can see what is left, and you will not skip a step.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times (5^{2} - 13) + 4', '= 2 \\times (25 - 13) + 4', '= 2 \\times 12 + 4', '= 24 + 4 = 28'] },
      ],
      lines: [
        { say: 'Did you notice what we did after every step? We wrote the whole expression again.', show: 'm' },
        { say: 'Here is a tip. Write the whole expression again after each step. Then you can see what is left to do, and you will not skip a step or lose a number.', show: 'tip' },
        { say: 'Each new line is shorter than the one before. When only one number is left, you are done.', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $3 \\times (4 + 2)^{2} \\div 9$.',
          choices: ['$12$', '$36$', '$4$', '$108$'],
          answer: 0,
          working: 'Parentheses: $4 + 2 = 6$. Power: $6^{2} = 36$. Then left to right: $3 \\times 36 = 108$ and $108 \\div 9 = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate three times, four plus two in brackets, to the power of two, divided by nine. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is A, twelve. Parentheses first: four plus two is six. Then the power: six times six is thirty-six. Then, from left to right, three times thirty-six is one hundred eight, and one hundred eight divided by nine is twelve. Choice C uses six times two, not six times six.',
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
          items: ['Parentheses come first: $(2 + 3)^{2} = 25$, but $2 + 3^{2} = 11$.', 'Inside parentheses, use the same order: powers before $\\times$, $\\div$, $+$ and $-$.', 'Write the whole expression again after each step.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Parentheses come first. Two plus three in brackets, to the power of two, is twenty-five, but two plus three to the power of two is eleven.', show: 'sum.0' },
        { say: 'Inside parentheses, use the same order: powers before multiplying, dividing, adding and subtracting.', show: 'sum.1' },
        { say: 'And write the whole expression again after each step. In the next lesson, you will tidy up expressions that have letters in them. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
