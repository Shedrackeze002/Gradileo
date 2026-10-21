import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { tip } from './lib/m7-6-figures.ts';

// 8 + 4 = 12: level. Two more marbles on each pan (hidden at first) keep it level.
const keep = (id: string) =>
  figure(
    id,
    [
      balance({
        perRow: 7,
        left: { marbles: [{ id: 'eight', count: 8 }, { id: 'four', count: 4, tone: 'opp' }, { id: 'add', count: 2, tone: 'hyp' }] },
        right: { marbles: [{ id: 'twelve', count: 12 }, { id: 'add', count: 2, tone: 'hyp' }] },
      }),
    ],
    330,
  );

// (8 + 4) × 3 = 12 × 3: three rows of 8 + 4 on the left, three rows of 12 on the right.
const ROWS = [0, 1, 2];
const triple = (id: string) =>
  figure(
    id,
    [
      balance({
        perRow: 12,
        left: { marbles: ROWS.flatMap((r) => [{ id: `a${r}`, count: 8 }, { id: `b${r}`, count: 4, tone: 'opp' as const }]) },
        right: { marbles: ROWS.map((r) => ({ id: `c${r}`, count: 12, tone: r % 2 ? ('good' as const) : ('theta' as const) })) },
        labels: ['(8 + 4) \\times 3 = 36', '12 \\times 3 = 36'],
      }),
    ],
    330,
  );

// 8 + 4 × 3 on the left is only 8 + 12 = 20 marbles, against 36: it tips down on the right.
const wrong = (id: string) =>
  figure(
    id,
    [
      tip(
        balance({
          perRow: 12,
          left: { marbles: [{ id: 'eight', count: 8 }, { id: 'twelve', count: 12, tone: 'opp' }] },
          right: { marbles: ROWS.map((r) => ({ id: `c${r}`, count: 12, tone: r % 2 ? ('good' as const) : ('theta' as const) })) },
          labels: ['8 + 4 \\times 3 = 20', '12 \\times 3 = 36'],
        }),
        { down: 'right', slope: 0.07 },
      ),
    ],
    330,
  );

// 4x + 3 = 19 after two different steps: 3 taken from the left only (tipped), or from both sides (level).
const options = (id: string) =>
  figure(
    id,
    [
      tip(
        balance({ name: 'one', tex: 'x', bagsPerRow: 4, perRow: 5, left: { bags: 4 }, right: { marbles: [{ id: 'all', count: 19 }] }, labels: ['4x', '19'] }),
        { name: 'one', down: 'right' },
      ),
      shift(balance({ name: 'two', tex: 'x', bagsPerRow: 4, perRow: 5, left: { bags: 4 }, right: { marbles: [{ id: 'all', count: 16 }] }, labels: ['4x', '16'] }), 13, 0),
    ],
    300,
  );

const video: Explainer = {
  id: 'm7-6-2-b',
  lessonId: 'm7-6-2',
  title: 'Preserving Equality, Part 2: Preservation of Equality',
  thumbnailTitle: 'Preservation of Equality',
  thumbnail: 'tr',
  summary:
    'Preservation of equality: an equation stays true when you do the same operation to both sides, adding, subtracting, multiplying or dividing by the same number (not 0). Multiplying both sides of 8 + 4 = 12 by 3 gives 36 = 36, but the whole side must be multiplied: 8 + 4 × 3 is only 20. To keep 4x + 3 = 19 balanced, subtract 3 from both sides: 4x = 16.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Preservation of Equality', subtitle: 'Do the same to both sides' }],
      lines: [
        { say: 'An equation is like a level balance. But what happens when you change one side of it?', show: 'title' },
        { say: 'In this video, you will learn the one rule that keeps an equation balanced, whatever you do to it.' },
      ],
    },
    {
      chapter: 'Keep it level',
      layout: 'center',
      main: [keep('kp'), { kind: 'math', id: 'm', size: 'lg', lines: ['8 + 4 = 12', '8 + 4 + 2 = 12 + 2'] }],
      lines: [
        { say: 'This balance shows eight plus four equals twelve. Eight yellow marbles and four orange marbles on the left balance twelve marbles on the right.', show: ['kp.stand', 'kp.l-eight', 'kp.l-four', 'kp.r-twelve', 'm.0'] },
        { say: 'If you put two more marbles on one pan only, that side gets heavier, and the balance tips.' },
        { say: 'But if you put two more marbles on each pan, both sides get heavier by the same amount. The balance stays level.', show: ['kp.l-add', 'kp.r-add', 'm.1'], focus: ['kp.l-add', 'kp.r-add', 'm.1'] },
        { say: 'Taking away works the same way. Take the same number of marbles from each pan, and the balance stays level.' },
      ],
    },
    {
      chapter: 'Preservation of equality',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Preservation of equality', md: 'An equation stays balanced (true) when you do the **same operation to both sides**.' },
        { kind: 'bullets', id: 'b', items: ['Add the same number to both sides.', 'Subtract the same number from both sides.', 'Multiply both sides by the same number.', 'Divide both sides by the same number, but never by $0$.'] },
      ],
      lines: [
        { say: 'This idea has a name: preservation of equality. To preserve something means to keep it. Equality means being equal. So preservation of equality means keeping the two sides equal.', show: 'def' },
        { say: 'An equation stays true when you do the same operation to both sides. You can add the same number to both sides, or subtract the same number from both sides.', show: ['b.0', 'b.1'] },
        { say: 'You can multiply both sides by the same number, or divide both sides by the same number.', show: ['b.2', 'b.3'] },
        { say: 'There is just one number you must never divide by, and that is zero. Dividing by zero has no answer.', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Multiply both sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8 + 4 = 12', '(8 + 4) \\times 3 = 12 \\times 3', '12 \\times 3 = 36 \\qquad 12 \\times 3 = 36'] }, triple('tr')],
      lines: [
        { say: 'The equation eight plus four equals twelve is true. Multiply both sides by three. Is it still true?', show: 'm.0' },
        { say: 'Multiply the whole left side by three. Put brackets around eight plus four, then multiply by three. Multiply the right side by three as well.', show: 'm.1', focus: 'm.1' },
        { say: 'On the left, eight plus four is twelve, and twelve times three is thirty-six. On the right, twelve times three is also thirty-six.', show: 'm.2', focus: 'm.2' },
        { say: 'On the balance, each pan now holds three times as many marbles: thirty-six on each side. Both sides are equal, so the equation is still balanced.', show: ['tr.stand', 'tr.l-a0', 'tr.l-b0', 'tr.l-a1', 'tr.l-b1', 'tr.l-a2', 'tr.l-b2', 'tr.r-c0', 'tr.r-c1', 'tr.r-c2', 'tr.labels'] },
      ],
    },
    {
      chapter: 'Change the whole side',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Change the whole side', md: 'Writing $8 + 4 \\times 3 = 12 \\times 3$ only multiplies the $4$. The left side becomes $8 + 12 = 20$, but the right side is $36$.' },
        wrong('wr'),
      ],
      lines: [
        { say: 'Watch out for this mistake. Someone writes eight plus four times three equals twelve times three, with no brackets.', show: 'oops' },
        { say: 'The order of operations says multiply first. So only the four is multiplied by three. The left side becomes eight plus twelve, which is twenty.', show: ['wr.stand', 'wr.l-eight', 'wr.l-twelve', 'wr.labels'], focus: 'wr.l-twelve' },
        { say: 'But the right side is thirty-six. Twenty is not thirty-six, so the balance tips.', show: ['wr.r-c0', 'wr.r-c1', 'wr.r-c2'] },
        { say: 'So put brackets around the whole side before you multiply or divide it. Every part of the side must change.' },
      ],
    },
    {
      chapter: 'Which step keeps the balance?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4x + 3 = 19', '\\text{Step one: } 4x + 3 - 3 = 19 \\quad \\bad{\\text{tips}}', '\\text{Step two: } 4x + 3 - 3 = 19 - 3 \\quad \\good{\\text{level}}', '4x = 16'] },
        options('op'),
      ],
      lines: [
        { say: 'Here is the equation four x plus three equals nineteen. Which of these two steps keeps it balanced?', show: 'm.0' },
        { say: 'Step one subtracts three from the left side only. The left side is now four x, but the right side is still nineteen. The sides are no longer equal, so the balance tips.', show: ['m.1', 'op.one-stand', 'op.one-lbags', 'op.one-r-all', 'op.one-labels'], focus: 'm.1' },
        { say: 'Step two subtracts three from both sides. The left side is four x, and the right side is nineteen minus three, which is sixteen.', show: ['m.2', 'op.two-stand', 'op.two-lbags', 'op.two-r-all', 'op.two-labels'], focus: 'm.2' },
        { say: 'The same thing was done to both sides, so the balance stays level: four x equals sixteen. Step two keeps the equation balanced.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The equation $10 - 4 = 6$ is true. Divide both sides by $2$. Which equation is still true?',
          choices: ['$10 - 4 \\div 2 = 6 \\div 2$', '$(10 - 4) \\div 2 = 6$', '$(10 - 4) \\div 2 = 6 \\div 2$', '$10 - 4 = 6 \\div 2$'],
          answer: 2,
          working: 'Divide the whole left side and the whole right side: $(10 - 4) \\div 2 = 6 \\div 2$, so $3 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The equation ten minus four equals six is true. Divide both sides by two. Which equation is still true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The brackets divide the whole left side by two, and the right side is divided by two as well, so both sides are three. Choice A divides only the four: ten minus two is eight, but six divided by two is three.', show: 'q.answer' },
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
          items: ['**Preservation of equality**: do the same operation to both sides, and the equation stays true.', 'You can add, subtract, multiply or divide (but not by $0$).', 'Change the **whole** side: put brackets around it before you multiply or divide.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Preservation of equality means that an equation stays true when you do the same operation to both sides.', show: 'sum.0' },
        { say: 'You can add, subtract, multiply or divide both sides by the same number, but never divide by zero.', show: 'sum.1' },
        { say: 'And always change the whole side, with brackets if you need them. In the next part, you will use these steps to find the number of marbles in a bag. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
