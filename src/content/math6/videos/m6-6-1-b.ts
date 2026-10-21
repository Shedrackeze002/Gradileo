import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// 4² as a square of tiles, 4 wide and 4 tall: 16 tiles.
const square = (id: string, height?: number) => figure(id, [tiles({ cols: 4, rows: 4, labels: { width: '4', height: '4' } })], height);

// 3 × 4²: three squares of 16 tiles each.
const threeSquares = (id: string) =>
  figure(
    id,
    [0, 1, 2].map((k) => tiles({ name: `s${k}`, cols: 4, rows: 4, at: [k * 5.2, 0], labels: k === 0 ? { width: '4', height: '4' } : {} })),
    320,
  );

// 4² = 16 (a 4 by 4 square) beside 4 × 2 = 8 (a 4 by 2 rectangle).
const compare = (id: string) =>
  figure(
    id,
    [
      tiles({ name: 'sq', cols: 4, rows: 4, labels: { width: '4', height: '4' } }),
      tiles({ name: 'rc', cols: 4, rows: 2, at: [7, 0], labels: { width: '4', height: '2' } }),
    ],
    280,
  );

const video: Explainer = {
  id: 'm6-6-1-b',
  lessonId: 'm6-6-1',
  title: 'Order of Operations with Powers, Part 2: Powers Come Early',
  thumbnailTitle: 'Powers Come Early',
  thumbnail: 'sq',
  summary:
    'A power such as 2³ means 2 × 2 × 2: the base is 2 and the exponent is 3. Powers come right after parentheses, so 5 + 2³ = 5 + 8 = 13 and 3 × 4² = 3 × 16 = 48. Two common mistakes: 4² is 16, not 8, and in 3 × 4² the exponent belongs only to the 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Powers Come Early', subtitle: 'Do the powers before you multiply or add' }],
      lines: [
        { say: 'In the last part, you learned the order of operations. Powers are step two, right after parentheses.', show: 'title' },
        { say: 'In this video, you will see what a power means, and evaluate expressions that have powers in them.' },
      ],
    },
    {
      chapter: 'What a power means',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{2}^{\\opp{3}} = \\adj{2} \\times \\adj{2} \\times \\adj{2} = 8'] },
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Power',
          md: 'A **power** is a short way to write a repeated multiplication. In $2^{3}$, the [[adj:base]] is $2$ and the [[opp:exponent]] is $3$. The exponent tells how many times the base is multiplied.',
        },
      ],
      lines: [
        { say: 'Here is a power: two to the power of three. It is a short way to write two times two times two, which is eight.', show: 'm.0' },
        { say: 'The big number, two, is called the base. It is the number being multiplied.', show: 'def' },
        { say: 'The small raised number, three, is called the exponent. The exponent tells how many times the base is used in the multiplication. Here, the two is used three times.' },
        { say: 'Two times two is four, and four times two is eight. So two to the power of three is eight.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Picture a power',
      layout: 'split',
      leftWidth: 460,
      left: [square('sq')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['4^{2} = 4 \\times 4', '= 16'] }],
      lines: [
        { say: 'Now look at four to the power of two. The base is four and the exponent is two, so it means four times four.', show: 'm.0' },
        { say: 'You can picture it as a square of tiles, four tiles wide and four tiles tall.', show: ['sq.outline', 'sq.grid', 'sq.width', 'sq.height'] },
        { say: 'Four rows of four tiles make sixteen tiles. So four to the power of two is sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Because a power of two makes a square, four to the power of two is also called four squared.' },
      ],
    },
    {
      chapter: 'A power and an addition',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Evaluate $5 + 2^{3}$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['5 + \\opp{2^{3}}', '= 5 + 8', '= 13'] },
      ],
      lines: [
        { say: 'Let’s use powers in the order of operations. Evaluate five plus two to the power of three.', show: ['q', 'm.0'] },
        { say: 'Step one: are there any parentheses? No. Step two: powers. There is one power, two to the power of three.', focus: 'm.0' },
        { say: 'Two to the power of three is two times two times two, which is eight. Now we have five plus eight.', show: 'm.1', focus: 'm.1' },
        { say: 'There is nothing to multiply or divide, so add: five plus eight is thirteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A power and a multiplication',
      layout: 'center',
      main: [threeSquares('ts'), { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times \\opp{4^{2}} = 3 \\times 16 = 48'] }],
      lines: [
        { say: 'Now evaluate three times four to the power of two. Powers come before multiplying, so do the power first.', show: 'm.0' },
        { say: 'Four to the power of two is four times four, which is sixteen. That is one square of sixteen tiles.', show: ['ts.s0-outline', 'ts.s0-grid', 'ts.s0-width', 'ts.s0-height'] },
        { say: 'Three times four to the power of two means three of those squares.', show: ['ts.s1-outline', 'ts.s1-grid', 'ts.s2-outline', 'ts.s2-grid'] },
        { say: 'Three times sixteen is forty-eight. So three times four to the power of two is forty-eight.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        compare('cp'),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying by the exponent', md: '$4^{2}$ is $4 \\times 4 = 16$, **not** $4 \\times 2 = 8$. The exponent tells how many times to use the base.' },
      ],
      lines: [
        { say: 'Watch out for two common mistakes with powers. Here is the first one.', show: 'oops' },
        { say: 'Four to the power of two is four times four. That is the square on the left, with sixteen tiles.', show: ['cp.sq-outline', 'cp.sq-grid', 'cp.sq-width', 'cp.sq-height'], focus: 'cp.sq-outline' },
        { say: 'It is not four times two. Four times two is only eight tiles, the rectangle on the right.', show: ['cp.rc-outline', 'cp.rc-grid', 'cp.rc-width', 'cp.rc-height'], focus: 'cp.rc-outline' },
        { say: 'Do not multiply the base by the exponent. The exponent tells how many times to use the base in the multiplication.' },
      ],
    },
    {
      chapter: 'Whose exponent?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The exponent belongs to one number', md: 'In $3 \\times 4^{2}$, the exponent belongs **only** to the $4$. Do not multiply $3 \\times 4$ first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 4^{2} = 3 \\times 16 = \\good{48}', '(3 \\times 4)^{2} = 12^{2} = \\bad{144}'] },
      ],
      lines: [
        { say: 'Here is the second mistake. In three times four to the power of two, the exponent sits right after the four. So it belongs only to the four.', show: 'oops' },
        { say: 'That is why we work out four to the power of two first, and get three times sixteen, which is forty-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'If you multiply three times four first, you get twelve to the power of two, which is twelve times twelve, or one hundred forty-four. That is a very different number!', show: 'm.1', focus: 'm.1' },
        { say: 'Twelve to the power of two is only right when three times four is in parentheses. The parentheses say: do this part first. You will see more of that in the next part.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $2 \\times 3^{2} + 1$.',
          choices: ['$37$', '$13$', '$20$', '$19$'],
          answer: 3,
          working: 'Power first: $3^{2} = 9$. Then multiply: $2 \\times 9 = 18$. Then add: $18 + 1 = 19$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate two times three to the power of two, plus one. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D, nineteen. Do the power first: three to the power of two is nine. Then multiply: two times nine is eighteen. Then add one, to get nineteen. Choice B uses three times two, instead of three times three.',
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
          items: ['A power is a repeated multiplication: $2^{3} = 2 \\times 2 \\times 2 = 8$.', 'Do powers right after parentheses, before $\\times$, $\\div$, $+$ and $-$.', '$4^{2}$ means $4 \\times 4$, not $4 \\times 2$.', 'An exponent belongs only to the number right before it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A power is a repeated multiplication. Two to the power of three is two times two times two, which is eight.', show: 'sum.0' },
        { say: 'Do powers right after parentheses, before you multiply, divide, add or subtract.', show: 'sum.1' },
        { say: 'Four to the power of two means four times four, not four times two.', show: 'sum.2' },
        { say: 'And an exponent belongs only to the number right before it. In the next part, you will see how parentheses change the order. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
