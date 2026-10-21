import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// 3x + 5 = 26: three bags and 5 marbles on the left; on the right, three groups of 7 (the share
// for each bag) and the 5 to take away.
const G = [0, 1, 2];
const scale = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: 7,
        left: { bags: 3, marbles: [{ id: 'take', count: 5, tone: 'hyp' }] },
        right: { marbles: [...G.map((g) => ({ id: `g${g}`, count: 7, tone: g % 2 ? ('opp' as const) : ('theta' as const) })), { id: 'take', count: 5, tone: 'hyp' as const }] },
        labels: ['3x + 5', '26'],
      }),
    ],
    400,
  );
const all = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-take`, `${id}.r-take`, `${id}.labels`, ...G.map((g) => `${id}.r-g${g}`)];

// x, times 3, plus 5, gives 26; undo: 26, minus 5, gives 21, divided by 3, gives 7.
const steps = (id: string) => figure(id, [chain({ nodes: ['x', '3x', '26'], ops: ['\\times 3', '+\\,5'], back: ['7', '21', '26'], undo: ['\\div 3', '-\\,5'], gap: 2.6 })], 230);

const video: Explainer = {
  id: 'm7-6-4',
  lessonId: 'm7-6-4',
  title: 'Solving Two-Step Equations, Part 1: Undo in Reverse Order',
  thumbnailTitle: 'Two-Step Equations',
  thumbnail: 'ch',
  summary:
    'In 3x + 5 = 26, x is multiplied by 3 and then 5 is added, so undo them in reverse order: subtract 5 from both sides (3x = 21), then divide both sides by 3 (x = 7), and check that 3(7) + 5 = 26. Dividing first does not work, because the 5 is not multiplied by x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Undo in Reverse Order', subtitle: 'Two steps to get x by itself' }],
      lines: [
        { say: 'A phone plan costs twenty-five dollars a month, plus ten dollars for each gigabyte of data. Last month, the bill was sixty-five dollars. How much data was used?', show: 'title' },
        { say: 'This question needs an equation with two steps. In this video, you will learn how to solve equations like that, by undoing the steps in reverse order.' },
      ],
    },
    {
      chapter: 'Two things happen to x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['3x + 5 = 26'] }, steps('ch')],
      lines: [
        { say: 'Look at the equation three x plus five equals twenty-six. Two things happen to x.', show: 'm.0' },
        { say: 'First, x is multiplied by three, which gives three x.', show: ['ch.n0', 'ch.f0', 'ch.n1'], focus: 'ch.f0' },
        { say: 'Then, five is added, which gives twenty-six.', show: ['ch.f1', 'ch.n2'], focus: 'ch.f1' },
        { say: 'To get x by itself, we must undo both steps.' },
      ],
    },
    {
      chapter: 'Reverse order',
      layout: 'center',
      main: [steps('ch'), { kind: 'math', id: 'm', size: 'md', lines: ['3x + 5 - 5 = 26 - 5 \\quad\\to\\quad 3x = 21', '\\dfrac{3x}{3} = \\dfrac{21}{3} \\quad\\to\\quad x = 7'] }],
      lines: [
        { say: 'Think about putting on socks and shoes. Socks go on first, then shoes. To take them off, you go in reverse order: shoes first, then socks.', show: ['ch.n0', 'ch.f0', 'ch.n1', 'ch.f1', 'ch.n2'] },
        { say: 'Equations work the same way. The last thing done to x was adding five, so undo that first. Subtract five from both sides. Twenty-six minus five is twenty-one, so three x equals twenty-one.', show: ['ch.b2', 'ch.u1', 'ch.b1', 'm.0'], focus: ['ch.u1', 'm.0'] },
        { say: 'Then undo multiplying by three. Divide both sides by three. Twenty-one divided by three is seven. So x equals seven.', show: ['ch.u0', 'ch.b0', 'm.1'], focus: ['ch.u0', 'ch.b0', 'm.1'] },
      ],
    },
    {
      chapter: 'On the balance',
      layout: 'center',
      main: [scale('bal')],
      lines: [
        { say: 'Here is the same equation on a balance. Three bags and five pink marbles balance twenty-six marbles.', show: all('bal') },
        { say: 'Undo the adding first: take five marbles from each pan.', focus: ['bal.l-take', 'bal.r-take'] },
        { say: 'The balance stays level. Now three bags balance twenty-one marbles.', hide: ['bal.l-take', 'bal.r-take', 'bal.labels'] },
        { say: 'Then undo the multiplying: share the twenty-one marbles equally among the three bags. Each bag gets seven.', focus: G.map((g) => `bal.r-g${g}`) },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['3(7) + 5', '= 21 + 5', '= 26 \\;\\checkmark'] }],
      lines: [
        { say: 'Check by putting seven back in place of x: three times seven, plus five.', show: 'm.0' },
        { say: 'Three times seven is twenty-one, and twenty-one plus five is twenty-six.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'That matches the right side, so x equals seven is correct.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: 'For $3x + 5 = 26$, dividing only $3x$ by $3$ gives $x + 5 = 26$, which is not balanced. The $5$ is not multiplied by $x$, so subtract it **before** you divide.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3x}{3} + 5 = 26 \\quad \\bad{\\text{not balanced}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people divide first, and divide only the three x by three. That gives x plus five equals twenty-six.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the five and the twenty-six were not divided by three, so the two sides were not treated the same way. The balance tips.' },
        { say: 'The five is added after multiplying, so it is not multiplied by x. Subtract it before you divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $5x + 4 = 39$.',
          choices: ['$x = 7$', '$x = 8.6$', '$x = 35$', '$x = 43$'],
          answer: 0,
          working: 'Subtract $4$ from both sides: $5x = 35$. Divide both sides by $5$: $x = 7$. Check: $5(7) + 4 = 39$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five x plus four equals thirty-nine. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, x equals seven. Subtract four from both sides: five x equals thirty-five. Divide both sides by five: x equals seven. Check: five times seven, plus four, is thirty-nine. Choice C stops after one step: thirty-five is five x, not x.', show: 'q.answer' },
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
          items: ['When two things happen to $x$, undo them in reverse order.', 'Undo adding or subtracting first, then undo multiplying or dividing.', 'Do each step to both sides, then check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When two things happen to x, undo them in reverse order, like taking off shoes before socks.', show: 'sum.0' },
        { say: 'Undo adding or subtracting first, then undo multiplying or dividing.', show: 'sum.1' },
        { say: 'Do each step to both sides, then check. In the next part, you will solve equations with the variable on the right, and number puzzles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
