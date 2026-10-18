import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, boltGroups } from './lib/m303-9-figures.ts';

const outcomes = figure(
  'o',
  [
    balance({ name: 'l', at: [0, 0], tilt: -1, left: 1, right: 1, label: '\\text{left side lighter}' }),
    balance({ name: 'e', at: [7, 0], tilt: 0, left: 1, right: 1, label: '\\text{balanced}' }),
    balance({ name: 'r', at: [14, 0], tilt: 1, left: 1, right: 1, label: '\\text{right side lighter}' }),
  ],
  300,
);

/** Every part of one balance in the figure "o". */
const bal = (k: string) => ['stand', 'beam', 'pans', 'lbolts', 'rbolts', 'label'].map((p) => `o.${k}-${p}`);

const video: Explainer = {
  id: 'm303-9-1-e',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 5: Weighing Puzzles',
  thumbnailTitle: 'Weighing Puzzles',
  thumbnail: 'o',
  summary: 'One of 12 bolts is lighter than the rest. A balance scale has three outcomes (left lighter, right lighter or balanced), so split into three groups of 4: one weighing leaves 4 bolts, weighing 1 against 1 leaves at most 2, and a third weighing finds the light bolt. In general, w weighings can handle up to 3^w items, so 12 bolts need 3 weighings, and splitting into two groups wastes the third outcome.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 5', title: 'Weighing Puzzles', subtitle: 'Finding the light bolt' }],
      lines: [
        { say: 'You have twelve bolts that look exactly the same, but one of them is lighter than the others. With a balance scale, how few weighings can be sure to find it?', show: 'title' },
        { say: 'In this video, you will use the three outcomes of a balance scale to find the light bolt in three weighings, and see why three is the fewest.' },
      ],
    },
    {
      chapter: 'The puzzle',
      layout: 'center',
      main: [
        figure('all', [boltGroups({ groups: [12], perRow: 6 })], 200),
        { kind: 'text', id: 'p', size: 'md', md: 'You have $12$ bolts, and one is **lighter** than the rest. Using only a balance scale, what is the fewest number of weighings that is **sure** to find the light bolt?' },
      ],
      lines: [
        { say: 'Here is the puzzle. You have twelve bolts, and one is lighter than the rest. You have a balance scale, but no weights. What is the fewest number of weighings that is sure to find the light bolt?', show: ['all', 'p'] },
        { say: 'Sure is the key word. We want a plan that works every time, even with bad luck, not one that only works if we happen to pick the right bolt.' },
      ],
    },
    {
      chapter: 'Three outcomes',
      layout: 'center',
      main: [outcomes, { kind: 'text', id: 't', size: 'md', md: 'One weighing can give **three** different answers.' }],
      lines: [
        { say: 'Start by thinking about the scale. When you put something on each side, there are three possible outcomes.', show: 't' },
        { say: 'The left side can rise, because it is lighter.', show: bal('l') },
        { say: 'The two sides can balance.', show: bal('e') },
        { say: 'Or the right side can rise, because it is lighter. Three outcomes, not two. A good plan uses all three.', show: bal('r') },
      ],
    },
    {
      chapter: 'The first weighing',
      layout: 'center',
      main: [
        figure('g', [boltGroups({ groups: [4, 4, 4], labels: ['\\text{Group A}', '\\text{Group B}', '\\text{Group C}'], perRow: 2, gap: 3 })], 230),
        { kind: 'bullets', id: 'b', items: ['Weigh group A against group B.', 'If one side rises, the light bolt is in that group.', 'If they balance, the light bolt is in group C, which was left off.'] },
      ],
      lines: [
        { say: 'So split the twelve bolts into three groups of four: A, B and C.', show: 'g' },
        { say: 'Weigh group A against group B, and leave group C off the scale.', show: 'b.0' },
        { say: 'If one side rises, the light bolt is in that group.', show: 'b.1' },
        { say: 'If the two sides balance, the light bolt is not in A or B, so it must be in group C, the one left off.', show: 'b.2' },
        { say: 'Whatever happens, after one weighing, only four bolts are left to check.' },
      ],
    },
    {
      chapter: 'The second and third weighings',
      layout: 'center',
      main: [
        figure('g2', [boltGroups({ groups: [1, 1, 2], labels: ['\\text{one}', '\\text{one}', '\\text{two left off}'], perRow: 2, gap: 3 })], 210),
        { kind: 'bullets', id: 'b', items: ['Weigh 1 bolt against 1 bolt, leaving 2 off.', 'If one side rises, that bolt is the light one: 2 weighings.', 'If they balance, weigh the 2 left off against each other: 3 weighings.'] },
      ],
      lines: [
        { say: 'Now take the four bolts that are left. Weigh one bolt against one bolt, and leave the other two off.', show: ['g2', 'b.0'] },
        { say: 'If one side rises, that bolt is the light one, and you found it in two weighings.', show: 'b.1' },
        { say: 'If they balance, the light bolt is one of the two left off. Weigh those two against each other. The lighter side rises, and that is the light bolt: three weighings.', show: 'b.2' },
        { say: 'So three weighings are always enough to find the light bolt among twelve.' },
      ],
    },
    {
      chapter: 'Why three groups?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Weighings', 'Most items it can handle'], rows: [['$1$', '$3$'], ['$2$', '$3 \\times 3 = 9$'], ['$3$', '$3 \\times 3 \\times 3 = 27$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['w \\text{ weighings can handle up to } 3^w \\text{ items}'] },
      ],
      lines: [
        { say: 'Each weighing has three outcomes, so each one can cut the suspects to a third. With one weighing, you can find the light one among three items: weigh one against one, and leave one off.', show: 't.0', focus: 't.0' },
        { say: 'With two weighings, you can handle three times three, or nine items. With three weighings, twenty-seven.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'In general, if the number of weighings is w, you can handle up to three to the power w items.', show: 'm', focus: 'm' },
        { say: 'Twelve is more than nine, so two weighings cannot always be enough. Three weighings is the fewest that is sure to work for twelve bolts.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Splitting into two groups', md: 'Weighing half against half never uses the “balanced” outcome. With $27$ bolts, halves take $4$ weighings ($13$ vs $13$, then $6$ vs $6$, then $3$ vs $3$, then $1$ vs $1$), but thirds take only $3$ ($9$, $3$, $1$).' },
      ],
      lines: [
        { say: 'A common mistake is to split the bolts into two halves each time. Weighing half against half never uses the third outcome, balanced.', show: 'oops' },
        { say: 'With twenty-seven bolts, halving takes four weighings: thirteen against thirteen, then six against six, then three against three, then one against one. With bad luck, the light bolt is always in the bigger pile.' },
        { say: 'Splitting into thirds takes only three weighings: nine against nine, then three against three, then one against one. Three groups make every weighing count.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'One of 9 coins is lighter than the others. What is the fewest number of weighings on a balance scale that is sure to find it?',
          choices: ['$4$', '$3$', '$2$', '$1$'],
          answer: 2,
          working: '$9 = 3^2$. Weigh 3 against 3 with 3 left off: the light coin is in one group of 3. Then weigh 1 against 1 with 1 left off.',
        },
      ],
      lines: [
        { say: 'Your turn. One of nine coins is lighter than the others. What is the fewest number of weighings on a balance scale that is sure to find it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two. Weigh three coins against three, leaving three off, to find the group of three with the light coin. Then weigh one against one, leaving one off. Choice B is what you get by splitting into two groups each time.', show: 'q.answer' },
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
          items: ['A balance scale has three outcomes: left lighter, right lighter or balanced.', 'Split into three groups, and weigh two of them.', '$w$ weighings can handle up to $3^w$ items.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A balance scale has three outcomes: the left side lighter, the right side lighter, or balanced.', show: 'sum.0' },
        { say: 'So split the items into three groups, and weigh two of them against each other.', show: 'sum.1' },
        { say: 'Each weighing cuts the suspects to a third. So if the number of weighings is w, you can handle up to three to the power w items. In part six, we get everyone across a river with one small boat. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
