import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileGroups } from '@/content/math6/videos/lib/m6-6-figures.ts';

// 3n + 5 as tiles, then the same tiles with each n replaced by 4.
const sub = (id: string) =>
  figure(
    id,
    [
      tileGroups({
        groups: [
          { id: 'e', x: 3, units: 5, tex: 'n', caption: '3n + 5' },
          { id: 'v', x: 3, units: 5, tex: '4', caption: '3 \\times 4 + 5' },
        ],
        gap: 1.2,
      }),
    ],
    360,
  );

// 2(x + 3): two equal groups of x + 3, then the same groups with x = 6.
const twice = (id: string) =>
  figure(
    id,
    [
      tileGroups({
        groups: [
          { id: 'g1', x: 1, units: 3, tex: '6', caption: '6 + 3' },
          { id: 'g2', x: 1, units: 3, tex: '6', caption: '6 + 3' },
        ],
        gap: 1,
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'm7-6-1-d',
  lessonId: 'm7-6-1',
  title: 'Expressions and Equations, Part 4: Evaluating Expressions',
  thumbnailTitle: 'Evaluating Expressions',
  thumbnail: 'sb',
  summary:
    'To evaluate an expression, replace each variable with its value, then calculate in the order of operations: brackets first, then multiply and divide, then add and subtract. 3n + 5 is 17 when n = 4, and 2(x + 3) is 18 when x = 6. When n = 4, 3n means 3 × 4 = 12, not 34.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 4', title: 'Evaluating Expressions', subtitle: 'Replace, then calculate' }],
      lines: [
        { say: 'An expression like three n plus five has no single value, because n could be any number. But once you know n, you can work out exactly what the expression is worth.', show: 'title' },
        { say: 'Finding that value is called evaluating the expression. In this video, you will evaluate expressions step by step, and avoid a very common mistake.' },
      ],
    },
    {
      chapter: 'What evaluate means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Evaluate', md: 'To **evaluate** an expression, replace each variable with its value, then calculate.' },
        { kind: 'callout', id: 'order', tone: 'key', title: 'The order of operations', md: '**Brackets** first, then **multiply and divide**, then **add and subtract**.' },
      ],
      lines: [
        { say: 'To evaluate an expression means to find its value. First, replace each variable with the number it stands for. This is called substituting.', show: 'def' },
        { say: 'Then calculate. Use the order of operations, so that everyone gets the same answer.', show: 'order' },
        { say: 'Work out anything in brackets first. Then multiply and divide. Then add and subtract last.', focus: 'order' },
      ],
    },
    {
      chapter: 'One variable',
      layout: 'split',
      leftWidth: 620,
      left: [sub('sb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $3n + 5$ when $n = 4$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3 \\times 4 + 5', '= 12 + 5', '= 17'] },
      ],
      lines: [
        { say: 'Evaluate three n plus five, when n equals four.', show: ['q', 'sb.e-xs', 'sb.e-us', 'sb.e-box', 'sb.e-cap'] },
        { say: 'Three n means three times n. In the tiles, there are three n tiles and five small tiles.', focus: 'sb.e-xs' },
        { say: 'Now replace n with four. Each n tile becomes a four. So three n becomes three times four.', show: ['sb.v-xs', 'sb.v-us', 'sb.v-box', 'sb.v-cap', 'm.0'], focus: ['sb.v-xs', 'm.0'] },
        { say: 'Multiply first: three times four is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: twelve plus five is seventeen. So the value of the expression is seventeen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Brackets',
      layout: 'split',
      leftWidth: 560,
      left: [twice('tw')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $2(x + 3)$ when $x = 6$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['2(6 + 3)', '= 2 \\times 9', '= 18'] },
      ],
      lines: [
        { say: 'Evaluate two times x plus three, with x plus three in brackets, when x equals six.', show: 'q' },
        { say: 'A number right next to a bracket means multiply. So this means two groups of x plus three.' },
        { say: 'Replace x with six. Now each group is six plus three.', show: ['tw.g1-xs', 'tw.g1-us', 'tw.g1-box', 'tw.g1-cap', 'tw.g2-xs', 'tw.g2-us', 'tw.g2-box', 'tw.g2-cap', 'm.0'], focus: 'm.0' },
        { say: 'Brackets first: six plus three is nine. So we have two groups of nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply: two times nine is eighteen. The value is eighteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '3n is not thirty-something', md: 'When $n = 4$, $3n$ is $3 \\times 4 = 12$, not $34$. Write the multiplication sign when you substitute.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3n \\;\\to\\; \\bad{34} \\quad \\text{wrong}', '3n \\;\\to\\; 3 \\times 4 = \\good{12} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Here is a very common mistake. When n is four, some people write three n as thirty-four, by putting the four right next to the three.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But three n means three times n. When n is four, three n is three times four, which is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'To stay safe, write the multiplication sign when you substitute: three times four. Then the mistake cannot happen.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $4(y + 2)$ when $y = 5$.',
          choices: ['$22$', '$47$', '$28$', '$11$'],
          answer: 2,
          working: 'Replace $y$ with $5$: $4(5 + 2)$. Brackets first: $5 + 2 = 7$. Then multiply: $4 \\times 7 = 28$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate four times y plus two, with y plus two in brackets, when y equals five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-eight. Replace y with five. Brackets first: five plus two is seven. Then four times seven is twenty-eight. Choice A multiplies only the five by four, and forgets to multiply the two.', show: 'q.answer' },
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
          items: ['To **evaluate** an expression, replace each variable with its value, then calculate.', 'Use the order of operations: brackets, then multiply and divide, then add and subtract.', 'When $n = 4$, $3n$ means $3 \\times 4 = 12$, not $34$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To evaluate an expression, replace each variable with its value, then calculate.', show: 'sum.0' },
        { say: 'Use the order of operations: brackets first, then multiply and divide, then add and subtract.', show: 'sum.1' },
        { say: 'And remember that three n means three times n. Write the multiplication sign when you substitute. In the next part, you will use a formula with more than one variable. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
