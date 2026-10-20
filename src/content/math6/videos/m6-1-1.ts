import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from './lib/m6-1-figures.ts';

// A thermometer from −10 to 10: a warm day at 8 degrees above zero, then a cold one at 8 below.
const thermo = figure(
  'th',
  [
    vertical({
      tube: true,
      min: -10,
      max: 10,
      every: 2,
      unit: 0.3,
      fills: [
        { id: 'warm', value: 8, tone: 'opp' },
        { id: 'cold', value: -8, tone: 'adj' },
      ],
      points: [
        { id: 'p8', value: 8, tex: '8\\text{ above zero}', tone: 'opp' },
        { id: 'm8', value: -8, tex: '8\\text{ below zero}', tone: 'adj' },
        { id: 'z', value: 0, tex: '\\text{zero}', tone: 'ink' },
      ],
      room: 4.2,
    }),
  ],
  560,
);

// Floors of a building as a vertical number line: the ground floor is 0, and the elevator stops 2 floors below it.
const floors = figure(
  'fl',
  [
    vertical({
      min: -3,
      max: 3,
      unit: 0.9,
      points: [
        { id: 'g', value: 0, tex: '\\text{ground floor}', tone: 'ink' },
        { id: 'stop', value: -2, tex: '\\text{elevator stop}', tone: 'theta' },
      ],
      room: 4.2,
    }),
  ],
  500,
);

// 15 degrees above zero and 15 below, far apart on a thermometer from −20 to 20.
const mistake = figure(
  'mt',
  [
    vertical({
      tube: true,
      min: -20,
      max: 20,
      step: 5,
      unit: 0.15,
      points: [
        { id: 'warm', value: 15, tex: '15^\\circ\\text{C: warm}', tone: 'opp' },
        { id: 'cold', value: -15, tex: '{-15}^\\circ\\text{C: cold}', tone: 'adj' },
      ],
      room: 4.4,
    }),
  ],
  540,
);

const video: Explainer = {
  id: 'm6-1-1',
  lessonId: 'm6-1-1',
  title: 'Negative Numbers and Magnitude, Part 1: Numbers Below Zero',
  thumbnailTitle: 'Numbers Below Zero',
  thumbnail: 'th',
  summary: 'Positive numbers are greater than zero and negative numbers are less than zero; zero is neither. Negative numbers describe temperatures below zero, debts and places below a surface: 15 degrees below zero is −15, saving $40 is +40, and an elevator stop 2 floors below the ground floor is −2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 1', title: 'Numbers Below Zero', subtitle: 'Positive numbers, negative numbers and zero' }],
      lines: [
        { say: 'On a cold winter morning, the temperature can drop below zero. A diver can swim deep under the surface of a lake. And a friend might owe you five dollars.', show: 'title' },
        { say: 'We describe all of these with negative numbers. In this video, you will learn what positive and negative numbers are, and how to write a number for a real situation.' },
      ],
    },
    {
      chapter: 'Above and below zero',
      layout: 'split',
      leftWidth: 520,
      left: [thermo],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8\\text{ above zero} = +8', '8\\text{ below zero} = -8'] }],
      lines: [
        { say: 'Think about a thermometer. It shows how warm or cold it is. Zero is the starting point, near the middle.', show: ['th.axis', 'th.z'] },
        { say: 'On a warm day, the coloured column rises above zero. Here it shows eight degrees above zero. We write that as positive eight.', show: ['th.warm', 'th.p8', 'm.0'], focus: ['th.p8', 'm.0'] },
        { say: 'On a very cold day, the column drops below zero. Here it shows eight degrees below zero. We write that as negative eight.', hide: 'th.warm', show: ['th.cold', 'th.m8', 'm.1'], focus: ['th.m8', 'm.1'] },
        { say: 'Both temperatures are eight degrees away from zero. The sign tells us which side of zero they are on.', focus: ['th.p8', 'th.m8'] },
      ],
    },
    {
      chapter: 'Positive and negative numbers',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Positive and negative numbers',
          md: 'A **positive number** is greater than $0$, like $8$. You can write it with or without a plus sign: $+8$ and $8$ are the same number. A **negative number** is less than $0$. It always has a negative sign, like $-8$.',
        },
        { kind: 'callout', id: 'zero', tone: 'key', title: 'Zero', md: 'Zero is **neither** positive nor negative. It is the starting point.' },
      ],
      lines: [
        { say: 'Here are the words to know. A positive number is greater than zero, like eight. You can write it with a plus sign in front, or with no sign at all. Plus eight and eight are the same number.', show: 'def' },
        { say: 'A negative number is less than zero. It always has a negative sign in front, like negative eight. We read that small dash as the word negative.' },
        { say: 'And what about zero itself? Zero is neither positive nor negative. Zero is the starting point that we measure from.', show: 'zero' },
      ],
    },
    {
      chapter: 'Below a starting point',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Temperature:** $8$ degrees below zero is ${-8}^\\circ\\text{C}$.',
            '**Debt:** owing \\$8 is a debt of \\$8. We write it as $-8$ dollars.',
            '**Elevation:** a diver $8$ m below the surface of a lake is at $-8$ m.',
          ],
        },
      ],
      lines: [
        { say: 'Negative numbers describe things that are below a starting point of zero. Here are three of them.' },
        { say: 'Temperature. Zero degrees is the starting point. Eight degrees below zero is negative eight degrees.', show: 'b.0' },
        { say: 'Money. Having no money at all is zero. If you owe someone eight dollars, you have a debt of eight dollars. We can write that as negative eight dollars.', show: 'b.1' },
        { say: 'Elevation, which means height. The surface of a lake is zero. A diver eight metres below the surface is at negative eight metres.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Matching numbers to situations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Number'],
          rows: [
            ['5 degrees above zero', '$+5$'],
            ['12 degrees below zero', '$-12$'],
            ['Saving \\$20', '$+20$'],
            ['Owing \\$6', '$-6$'],
            ['A diver 3 m below the surface', '$-3$'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s practise. Five degrees above zero is above the starting point, so it is positive five.', show: 't.0', focus: 't.0' },
        { say: 'Twelve degrees below zero is below the starting point, so it is negative twelve.', show: 't.1', focus: 't.1' },
        { say: 'Saving twenty dollars adds to your money, so it is positive twenty. Owing six dollars is a debt, so it is negative six.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And a diver three metres below the surface is at negative three. Words like below, owing and under often mean a negative number.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Writing a number',
      layout: 'split',
      leftWidth: 460,
      left: [floors],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write a number for each: a) $15$ degrees below zero, b) \\$40 saved in a piggy bank, c) an elevator stop $2$ floors below the ground floor.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{a) } {-15}', '\\text{b) } 40 \\text{ or } {+40}', '\\text{c) } {-2}'] },
      ],
      lines: [
        { say: 'Write a positive or negative number for each situation. Part A: a temperature of fifteen degrees below zero.', show: 'q' },
        { say: 'Below zero means negative. So the number is negative fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Part B: having forty dollars saved in a piggy bank. Money that is saved is positive, so the number is forty, or positive forty.', show: 'm.1', focus: 'm.1' },
        { say: 'Part C: an elevator stops two floors below the ground floor. Picture the floors of the building as a number line standing up. The ground floor is zero.', show: ['fl.axis', 'fl.g'], focus: 'fl.g' },
        { say: 'Floors above the ground are positive, and floors below it are negative. Two floors down from zero is negative two.', show: ['fl.stop', 'm.2'], focus: ['fl.stop', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 480,
      left: [mistake],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the negative sign', md: '“$15$ degrees below zero” is $-15$, not $15$. Without the negative sign, it means $15$ degrees **above** zero.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Fifteen degrees below zero is negative fifteen, not fifteen.', show: ['oops', 'mt.axis', 'mt.cold'], focus: 'mt.cold' },
        { say: 'If you forget the negative sign, the number means fifteen degrees above zero. That is a warm spring day, not a cold winter one!', show: 'mt.warm', focus: 'mt.warm' },
        { say: 'Look how far apart they are on the thermometer. One small sign makes a big difference, so always write the negative sign.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is described by a **negative** number?',
          choices: ['Saving \\$12', 'A temperature $6$ degrees below zero', 'A bird $30$ m above the ground', 'A temperature of $0$ degrees'],
          answer: 1,
          working: '“Below zero” means negative: $6$ degrees below zero is $-6$. Saving money and being above the ground are positive, and $0$ is neither positive nor negative.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these situations is described by a negative number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Six degrees below zero is below the starting point, so it is negative six. Choice D is zero degrees, and zero is neither positive nor negative.', show: 'q.answer' },
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
          items: [
            'A **positive** number is greater than $0$. A **negative** number is less than $0$ and has a negative sign.',
            'Zero is neither positive nor negative.',
            'Negative numbers describe temperatures below zero, debts, and places below a surface.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A positive number is greater than zero. A negative number is less than zero, and it always has a negative sign.', show: 'sum.0' },
        { say: 'Zero is neither positive nor negative. It is the starting point.', show: 'sum.1' },
        { say: 'We use negative numbers for temperatures below zero, for debts, and for places below a surface. In the next part, we put positive and negative numbers on a number line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
