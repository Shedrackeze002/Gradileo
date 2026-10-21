import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';

// A level balance: `bags` bags of x marbles and `loose` marbles on the left; on the right, one
// group of `each` marbles for every bag (the share for each bag), then the `loose` marbles to take away.
const scale = (id: string, o: { bags: number; each: number; loose: number; labels: [string, string]; height?: number }) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: o.each,
        left: { bags: o.bags, marbles: [{ id: 'take', count: o.loose, tone: 'hyp' }] },
        right: {
          marbles: [
            ...Array.from({ length: o.bags }, (_, g) => ({ id: `g${g}`, count: o.each, tone: g % 2 ? ('opp' as const) : ('theta' as const) })),
            { id: 'take', count: o.loose, tone: 'hyp' as const },
          ],
        },
        labels: o.labels,
      }),
    ],
    o.height ?? 380,
  );
const all = (id: string, bags: number) => [`${id}.stand`, `${id}.lbags`, `${id}.l-take`, `${id}.r-take`, ...Array.from({ length: bags }, (_, g) => `${id}.r-g${g}`)];
const groups = (id: string, bags: number) => Array.from({ length: bags }, (_, g) => `${id}.r-g${g}`);

const video: Explainer = {
  id: 'm7-6-2-c',
  lessonId: 'm7-6-2',
  title: 'Preserving Equality, Part 3: Using the Balance to Solve',
  thumbnailTitle: 'Solve with a Balance',
  thumbnail: 'bal',
  summary:
    'Solving 2x + 3 = 11 by keeping the balance level at every step: take 3 marbles from each pan (2x = 8), then split each pan into 2 equal groups (x = 4), and check that 2(4) + 3 = 11. In the same way, 3x + 2 = 11 gives 3x = 9 and x = 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Using the Balance to Solve', subtitle: 'Keep it level at every step' }],
      lines: [
        { say: 'Two bags of marbles and three loose marbles balance eleven marbles. How many marbles are in each bag?', show: 'title' },
        { say: 'In this video, you will find out, by changing both sides of the balance in the same way, so that it stays level at every step.' },
      ],
    },
    {
      chapter: 'The balance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x + 3 = 11'] }, scale('bal', { bags: 2, each: 4, loose: 3, labels: ['2x + 3', '11'] })],
      lines: [
        { say: 'Here is the balance. On the left, there are two bags, each holding x marbles, and three loose marbles. On the right, there are eleven marbles.', show: all('bal', 2) },
        { say: 'The balance is level, so it shows the equation two x plus three equals eleven.', show: ['m.0', 'bal.labels'], focus: 'm.0' },
        { say: 'Our goal is to get one bag all by itself on one side. Then the other side will tell us how many marbles are in it.' },
      ],
    },
    {
      chapter: 'Take away three',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x + 3 - 3 = 11 - 3', '2x = 8'] }, scale('bal', { bags: 2, each: 4, loose: 3, labels: ['2x', '8'] })],
      lines: [
        { say: 'First, get rid of the three loose marbles on the left. Take three marbles away from each pan.', show: [...all('bal', 2), 'm.0'], focus: ['bal.l-take', 'bal.r-take', 'm.0'] },
        { say: 'We did the same thing to both sides, so the balance stays level.', hide: ['bal.l-take', 'bal.r-take'] },
        { say: 'Now two bags balance eight marbles. The equation is two x equals eight.', show: ['m.1', 'bal.labels'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Split into equal groups',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x = 8', '\\dfrac{2x}{2} = \\dfrac{8}{2}', 'x = 4'] }, scale('bal', { bags: 2, each: 4, loose: 3, labels: ['2x', '8'], height: 300 })],
      lines: [
        { say: 'Two bags balance eight marbles. Now split each pan into two equal groups: one bag on each half of the left pan, and four marbles in each group on the right.', show: ['bal.stand', 'bal.lbags', 'bal.labels', ...groups('bal', 2), 'm.0'], focus: groups('bal', 2) },
        { say: 'Splitting into two equal groups is dividing by two. We divide both sides by two.', show: 'm.1', focus: 'm.1' },
        { say: 'So one bag balances four marbles. Each bag holds four marbles: x equals four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['2(4) + 3', '= 8 + 3', '= 11 \\;\\checkmark'] }],
      lines: [
        { say: 'Always check your answer. Put four back in place of x in the first equation: two times four, plus three.', show: 'm.0' },
        { say: 'Two times four is eight, and eight plus three is eleven.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'That matches the eleven marbles on the right. So x equals four is correct.' },
      ],
    },
    {
      chapter: 'Another balance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3x + 2 = 11', '3x + 2 - 2 = 11 - 2 \\quad\\to\\quad 3x = 9', '\\dfrac{3x}{3} = \\dfrac{9}{3} \\quad\\to\\quad x = 3'] }, scale('b2', { bags: 3, each: 3, loose: 2, labels: ['3x + 2', '11'], height: 320 })],
      lines: [
        { say: 'Here is one more. Three bags and two loose marbles balance eleven marbles. The equation is three x plus two equals eleven.', show: [...all('b2', 3), 'b2.labels', 'm.0'] },
        { say: 'Take two marbles from each pan. Now three bags balance nine marbles: three x equals nine.', show: 'm.1', hide: ['b2.l-take', 'b2.r-take', 'b2.labels'], focus: 'm.1' },
        { say: 'Split each side into three equal groups. Each bag balances three marbles, so x equals three.', show: 'm.2', focus: ['m.2', ...groups('b2', 3)] },
        { say: 'Check: three times three is nine, and nine plus two is eleven. It works!' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4x + 1 = 13$.',
          choices: ['$x = 3$', '$x = 12$', '$x = 3.5$', '$x = 4$'],
          answer: 0,
          working: 'Take $1$ from both sides: $4x = 12$. Divide both sides by $4$: $x = 3$. Check: $4(3) + 1 = 13$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four x plus one equals thirteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, x equals three. Take one from both sides: four x equals twelve. Divide both sides by four: x equals three. Choice B stops too early: twelve is four x, the four bags, not one bag.', show: 'q.answer' },
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
          items: ['Keep the balance level: do the same thing to both sides at every step.', 'Take away the loose marbles from both sides first.', 'Then split both sides into equal groups, one for each bag.', 'Check by putting the answer back into the equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve an equation, keep the balance level, by doing the same thing to both sides at every step.', show: 'sum.0' },
        { say: 'Take away the loose marbles from both sides first.', show: 'sum.1' },
        { say: 'Then split both sides into equal groups, one group for each bag.', show: 'sum.2' },
        { say: 'And check your answer in the first equation. In the next part, you will find the mistake in someone else’s solution. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
