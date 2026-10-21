import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { intLine } from './lib/m7-4-figures.ts';

// (−2) + (−5): start at −2 and move 5 steps left, to −7.
const twoNeg = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -9,
        max: 2,
        signed: true,
        moves: [{ id: 'mv', from: -2, to: -7, tone: 'adj', label: '-5' }],
        points: [
          { id: 'start', value: -2, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -7, tex: '\\text{end}', tone: 'good' },
        ],
      }),
    ],
    250,
  );

// (+4) + (−7): start at +4, move 4 steps left to 0, then 3 more to −3.
const across = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -5,
        max: 6,
        signed: true,
        moves: [
          { id: 'a', from: 4, to: 0, tone: 'adj', label: '4\\text{ steps}' },
          { id: 'b', from: 0, to: -3, tone: 'hyp', label: '3\\text{ more}' },
        ],
        points: [
          { id: 'start', value: 4, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -3, tex: '\\text{end}', tone: 'good' },
        ],
      }),
    ],
    250,
  );

// (−6) + (+4): start at −6 and move 4 steps right, to −2.
const right = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -8,
        max: 3,
        signed: true,
        moves: [{ id: 'mv', from: -6, to: -2, tone: 'opp', label: '+4' }],
        points: [
          { id: 'start', value: -6, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -2, tex: '\\text{end}', tone: 'good' },
        ],
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm7-4-1-c',
  lessonId: 'm7-4-1',
  title: 'Adding Integers, Part 3: Adding on a Number Line',
  thumbnailTitle: 'Adding on a Number Line',
  thumbnail: 'ac',
  summary:
    'To add on a number line, start at the first integer. Adding a positive integer moves right; adding a negative integer moves left. (−2) + (−5): start at −2 and move 5 steps left to −7. (+4) + (−7): 4 steps left reach 0, and 3 more reach −3. (−6) + (+4): 4 steps right from −6 reach −2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 3', title: 'Adding on a Number Line', subtitle: 'Right for positive, left for negative' }],
      lines: [
        { say: 'Counters are one way to add integers. A number line is another. It shows each sum as a trip, step by step.', show: 'title' },
        { say: 'In this part, you will add integers by moving along a number line.' },
      ],
    },
    {
      chapter: 'Which way to move',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Adding on a number line', md: 'Start at the **first** integer. Adding a **positive** integer moves **right**. Adding a **negative** integer moves **left**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{add } \\opp{(+3)} \\;\\to\\; 3 \\text{ steps right}', '\\text{add } \\adj{(-3)} \\;\\to\\; 3 \\text{ steps left}'] },
      ],
      lines: [
        { say: 'Here is how it works. Start at the first integer. Then look at the integer you are adding.', show: 'key' },
        { say: 'Adding a positive integer moves you to the right, toward bigger numbers. Adding positive three means three steps to the right.', show: 'm.0', focus: 'm.0' },
        { say: 'Adding a negative integer moves you to the left, toward smaller numbers. Adding negative three means three steps to the left.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two negatives',
      layout: 'center',
      main: [twoNeg('tn'), { kind: 'math', id: 'm', size: 'lg', lines: ['(-2) + (-5) = -7'] }],
      lines: [
        { say: 'Find negative two plus negative five. Start at negative two.', show: ['tn.axis', 'tn.start'], focus: 'tn.start' },
        { say: 'We are adding negative five, so move five steps to the left. One, two, three, four, five.', show: 'tn.mv', focus: 'tn.mv' },
        { say: 'You land on negative seven. So negative two plus negative five equals negative seven.', show: ['tn.end', 'm.0'], focus: ['tn.end', 'm.0'] },
      ],
    },
    {
      chapter: 'Different signs',
      layout: 'center',
      main: [across('ac'), { kind: 'math', id: 'm', size: 'lg', lines: ['(+4) + (-7) = -3'] }],
      lines: [
        { say: 'Now find positive four plus negative seven. Start at positive four.', show: ['ac.axis', 'ac.start'], focus: 'ac.start' },
        { say: 'Adding negative seven means seven steps to the left. After four steps, you reach zero.', show: 'ac.a', focus: 'ac.a' },
        { say: 'That is only four of the seven steps. Three more steps take you past zero, to negative three.', show: 'ac.b', focus: 'ac.b' },
        { say: 'So positive four plus negative seven equals negative three. Splitting the trip at zero makes it easy to count.', show: ['ac.end', 'm.0'], focus: ['ac.end', 'm.0'] },
      ],
    },
    {
      chapter: 'Adding a positive',
      layout: 'center',
      main: [right('rt'), { kind: 'math', id: 'm', size: 'lg', lines: ['(-6) + (+4) = -2'] }],
      lines: [
        { say: 'Here is one with a positive integer to add. Find negative six plus positive four. Start at negative six.', show: ['rt.axis', 'rt.start'], focus: 'rt.start' },
        { say: 'We are adding positive four, so move four steps to the right. One, two, three, four.', show: 'rt.mv', focus: 'rt.mv' },
        { say: 'You land on negative two. So negative six plus positive four equals negative two. You moved right, toward zero, but did not reach it.', show: ['rt.end', 'm.0'], focus: ['rt.end', 'm.0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use a number line to find $(-3) + (+8)$.',
          choices: ['$+5$', '$-11$', '$-5$', '$+11$'],
          answer: 0,
          working: 'Start at $-3$. Adding $+8$ means $8$ steps right: $3$ steps reach $0$, and $5$ more reach $+5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use a number line to find negative three plus positive eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, positive five. Start at negative three, and move eight steps to the right. Three steps reach zero, and five more reach positive five. Choice B moves eight steps to the left, but adding a positive integer moves right.', show: 'q.answer' },
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
          items: ['Start at the first integer.', 'Adding a positive integer moves **right**.', 'Adding a negative integer moves **left**.', 'Split a long trip at $0$ to count the steps.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add on a number line, start at the first integer.', show: 'sum.0' },
        { say: 'Adding a positive integer moves right.', show: 'sum.1' },
        { say: 'Adding a negative integer moves left.', show: 'sum.2' },
        { say: 'And when a trip crosses zero, split it at zero to count the steps. In the next part, you will add integers with rules, without drawing anything. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
