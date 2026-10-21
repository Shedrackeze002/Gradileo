import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tree } from './lib/m7-11-figures.ts';

const t = (s: string) => `\\text{${s}}`;

// A coin, then a spinner with red, blue and green: 2 × 3 = 6 paths.
const COIN = ['H', 'T'];
const SPIN = ['R', 'B', 'G'];
const coinSpin = (id: string) => figure(id, [tree({ first: COIN.map(t), second: SPIN.map(t), outcome: (i, j) => `\\to\\ ${t(COIN[i] + SPIN[j])}` })], 440);
const branches = (id: string, i: number, n: number) => [`${id}.b${i}`, ...Array.from({ length: n }, (_, j) => `${id}.b${i}-${j}`)];
const outcomes = (id: string, i: number, n: number) => Array.from({ length: n }, (_, j) => `${id}.o${i}-${j}`);

// A large coin, then a small coin: HH, HT, TH, TT.
const twoCoins = (id: string) => figure(id, [tree({ first: COIN.map(t), second: COIN.map(t), gap: 1.2, outcome: (i, j) => `\\to\\ ${t(COIN[i] + COIN[j])}` })], 360);

const video: Explainer = {
  id: 'm7-11-2-c',
  lessonId: 'm7-11-2',
  title: 'Sample Spaces for Two Events, Part 3: Tree Diagrams',
  thumbnailTitle: 'Tree Diagrams',
  thumbnail: 'tr',
  summary:
    'A tree diagram shows the outcomes of the first event as branches, then the outcomes of the second event as new branches from each; follow a path from left to right to read one outcome. A coin and a spinner with red, blue and green sections give 2 × 3 = 6 outcomes: HR, HB, HG, TR, TB, TG. With two different coins, HT and TH are different outcomes, so the sample space is HH, HT, TH, TT: 4 outcomes, not 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Tree Diagrams', subtitle: 'Follow every path' }],
      lines: [
        { say: 'A tree grows from its trunk into branches, and each branch splits into smaller branches. A tree diagram works the same way.', show: 'title' },
        { say: 'In this video, you will use a tree diagram to list every outcome of two events.' },
      ],
    },
    {
      chapter: 'Tree diagrams',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Tree diagram',
          md: 'A **tree diagram** shows the outcomes of the first event as branches. From each branch, new branches show the outcomes of the second event. Follow a path from left to right to read one outcome.',
        },
      ],
      lines: [
        { say: 'A tree diagram shows the outcomes of the first event as branches.', show: 'def' },
        { say: 'Then, from the end of each branch, new branches show the outcomes of the second event.' },
        { say: 'To read one outcome, follow a path from left to right, from the start all the way to the end of a branch.' },
      ],
    },
    {
      chapter: 'A coin and a spinner',
      layout: 'split',
      leftWidth: 620,
      left: [coinSpin('tr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Malik flips a coin and spins a spinner with $3$ equal sections: red (R), blue (B) and green (G). List the sample space.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{HR, HB, HG, TR, TB, TG}', '2 \\times 3 = 6 \\text{ outcomes}'] },
      ],
      lines: [
        { say: 'Malik flips a coin and spins a spinner with three equal sections: red, blue and green. Let’s draw a tree diagram.', show: ['q', 'tr.root'] },
        { say: 'The coin comes first. It gives two branches: H for heads, and T for tails.', show: ['tr.b0', 'tr.b1'], focus: ['tr.b0', 'tr.b1'] },
        { say: 'From the heads branch, the spinner gives three new branches: red, blue and green. Follow each path to read its outcome: H R, H B and H G.', show: [...branches('tr', 0, 3), ...outcomes('tr', 0, 3)], focus: outcomes('tr', 0, 3) },
        { say: 'The tails branch splits the same way, giving T R, T B and T G.', show: [...branches('tr', 1, 3), ...outcomes('tr', 1, 3)], focus: outcomes('tr', 1, 3) },
        { say: 'So the sample space has six outcomes. That matches the shortcut: two outcomes for the coin, times three for the spinner, is six.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 600,
      left: [twoCoins('tc')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'HT and TH are different', md: 'Heads on the large coin and tails on the small coin (**HT**) is a different outcome from tails on the large coin and heads on the small coin (**TH**). The sample space is HH, HT, TH, TT: $4$ outcomes, not $3$.' },
      ],
      lines: [
        { say: 'Watch out. Flip a large coin and a small coin. You might think there are three outcomes: two heads, two tails, or one of each.', show: ['tc.root', ...branches('tc', 0, 2), ...branches('tc', 1, 2)] },
        { say: 'But follow the paths. Heads on the large coin, then tails on the small coin, is H T.', show: ['tc.o0-0', 'tc.o0-1'], focus: 'tc.o0-1' },
        { say: 'Tails on the large coin, then heads on the small coin, is T H. That is a different outcome, on a different path.', show: ['tc.o1-0', 'tc.o1-1'], focus: 'tc.o1-0' },
        { say: 'So the sample space is H H, H T, T H and T T. That is four outcomes, not three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You flip a large coin and a small coin. How many outcomes in the sample space have **exactly one** head?',
          choices: ['$2$', '$1$', '$3$', '$4$'],
          answer: 0,
          working: 'The sample space is HH, HT, TH, TT. Exactly one head: HT and TH, which are $2$ outcomes.',
        },
      ],
      lines: [
        { say: 'Your turn. You flip a large coin and a small coin. How many outcomes in the sample space have exactly one head? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: two. The outcomes H T and T H each have exactly one head. Choice B counts them as one outcome, but they are different paths on the tree.', show: 'q.answer' },
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
          items: ['A tree diagram has branches for the first event, then branches for the second event.', 'Each path from left to right is one outcome.', 'HT and TH are different outcomes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A tree diagram has branches for the first event, and then branches for the second event from each one.', show: 'sum.0' },
        { say: 'Each path from left to right is one outcome.', show: 'sum.1' },
        { say: 'And H T and T H are different outcomes. In the next part, you will count the outcomes that fit an event, with two dice. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
