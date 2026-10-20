import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// 3x + 4 = 19: three bags and 4 marbles on the left; 19 marbles on the right, in three groups of
// 5 (the share for each bag) and the 4 to take away.
const GROUPS = [0, 1, 2];
const scale = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: 5,
        left: { bags: 3, marbles: [{ id: 'take', count: 4, tone: 'hyp' }] },
        right: { marbles: [...GROUPS.map((g) => ({ id: `g${g}`, count: 5, tone: g % 2 ? ('opp' as const) : ('theta' as const) })), { id: 'take', count: 4, tone: 'hyp' as const }] },
        labels: ['3x + 4', '19'],
      }),
    ],
    420,
  );
const all = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-take`, `${id}.r-take`, `${id}.labels`, ...GROUPS.map((g) => `${id}.r-g${g}`)];

// x, times 3, plus 4, gives 19; undo: 19, minus 4, gives 15, divided by 3, gives 5.
const steps = (id: string) =>
  figure(id, [chain({ nodes: ['x', '3x', '19'], ops: ['\\times 3', '+\\,4'], back: ['5', '15', '19'], undo: ['\\div 3', '-\\,4'], gap: 2.6 })], 230);

const video: Explainer = {
  id: 'm6-6-3-b',
  lessonId: 'm6-6-3',
  title: 'Solving Equations, Part 2: Two Operations',
  thumbnailTitle: 'Two Operations',
  thumbnail: 'bal',
  summary:
    'Solving an equation with two operations by undoing them in reverse order: in 3x + 4 = 19, subtract 4 from both sides first (3x = 15), then divide both sides by 3 (x = 5), and check that 3 × 5 + 4 = 19. Guess and check gets there too, and dividing 19 by 3 first is a common mistake.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Two Operations', subtitle: 'Undo them in reverse order' }],
      lines: [
        { say: 'Sometimes two things are done to the variable. In three x plus four, x is multiplied by three, and then four is added.', show: 'title' },
        { say: 'In this video, you will solve equations with two operations, by undoing them in reverse order.' },
      ],
    },
    {
      chapter: 'On the balance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x + 4 = 19'] }, scale('bal')],
      lines: [
        { say: 'Solve three x plus four equals nineteen.', show: 'm.0' },
        { say: 'On the balance, three bags and four pink marbles weigh the same as nineteen marbles.', show: all('bal') },
        { say: 'First, take four marbles away from each side. The balance stays level, because we did the same to both sides.', focus: ['bal.l-take', 'bal.r-take'] },
        { say: 'Now three bags weigh the same as fifteen marbles.', hide: ['bal.l-take', 'bal.r-take'] },
        { say: 'Share the fifteen marbles equally among the three bags. Each bag gets five. So x equals five.', focus: GROUPS.map((g) => `bal.r-g${g}`) },
      ],
    },
    {
      chapter: 'Reverse order',
      layout: 'center',
      main: [steps('ch'), { kind: 'math', id: 'm', size: 'md', lines: ['3x + 4 = 19', '3x = 19 - 4 = 15', 'x = 15 \\div 3 = 5'] }],
      lines: [
        { say: 'Here are the two operations, in order. Start with x. Multiply by three to get three x. Then add four to get nineteen.', show: ['ch.n0', 'ch.f0', 'ch.n1', 'ch.f1', 'ch.n2', 'm.0'] },
        { say: 'To undo them, go backwards, in reverse order. It is like putting on socks and then shoes. To take them off, the shoes come off first.' },
        { say: 'The last thing done was adding four, so undo that first. Subtract four from both sides. Nineteen minus four is fifteen, so three x equals fifteen.', show: ['ch.b2', 'ch.u1', 'ch.b1', 'm.1'], focus: ['ch.u1', 'm.1'] },
        { say: 'Then undo multiplying by three. Divide both sides by three. Fifteen divided by three is five, so x equals five.', show: ['ch.u0', 'ch.b0', 'm.2'], focus: ['ch.u0', 'ch.b0', 'm.2'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['3 \\times 5 + 4', '= 15 + 4', '= 19 \\;\\checkmark'] }],
      lines: [
        { say: 'Check the solution. Put x equals five back into three x plus four.', show: 'm.0' },
        { say: 'Three times five is fifteen. Fifteen plus four is nineteen.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Both sides equal nineteen, so x equals five is correct.' },
      ],
    },
    {
      chapter: 'Guess and check',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$3x + 4$', 'Equal to $19$?'],
          rows: [
            ['$3$', '$13$', '[[bad:No, too small]]'],
            ['$4$', '$16$', '[[bad:No, too small]]'],
            ['$5$', '$19$', '[[good:Yes]]'],
          ],
        },
      ],
      lines: [
        { say: 'There is more than one way to solve an equation. You can also guess and check. Try a value for x, and see whether three x plus four equals nineteen.' },
        { say: 'Try three. Three times three plus four is thirteen. That is too small.', show: 't.0', focus: 't.0' },
        { say: 'Try four. Three times four plus four is sixteen. Still too small, but closer.', show: 't.1', focus: 't.1' },
        { say: 'Try five. Three times five plus four is nineteen. Yes! So x equals five, the same answer as before.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: 'In $3x + 4 = 19$, do **not** divide $19$ by $3$ first. The $4$ is added after multiplying, so take it away first.' },
      ],
      lines: [
        { say: 'Watch out. In three x plus four equals nineteen, do not divide nineteen by three first.', show: 'oops' },
        { say: 'The four was added after multiplying, so it is the first thing to undo. If you divide first, nineteen divided by three does not even come out evenly.' },
        { say: 'Always undo adding or subtracting first. Then undo multiplying or dividing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4x + 8 = 36$.',
          choices: ['$x = 11$', '$x = 1$', '$x = 7$', '$x = 28$'],
          answer: 2,
          working: 'Subtract $8$ from both sides: $4x = 28$. Divide both sides by $4$: $x = 7$. Check: $4 \\times 7 + 8 = 36$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four x plus eight equals thirty-six. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C, x equals seven. Undo adding eight first: thirty-six minus eight is twenty-eight. Then divide by four: twenty-eight divided by four is seven. Check: four times seven plus eight is thirty-six. Choice B divides first, which is the wrong order.',
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
          items: ['With two operations, undo them in reverse order.', 'Undo adding or subtracting first, then multiplying or dividing.', 'You can also guess and check.', 'Check by putting the solution back into the equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With two operations, undo them in reverse order.', show: 'sum.0' },
        { say: 'Undo adding or subtracting first. Then undo multiplying or dividing.', show: 'sum.1' },
        { say: 'You can also guess and check.', show: 'sum.2' },
        { say: 'And always check by putting the solution back into the equation. In the next part, you will simplify an equation before you solve it. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
