import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { join, piece } from './lib/m6-9-figures.ts';
import { coin, die, spinner } from './lib/m6-12-figures.ts';

type P = [number, number];

// The six faces of a die in two rows, each with a green highlight (`hl<n>`) to show it is in an event.
const AT: Record<number, P> = { 1: [0, 2.7], 2: [2.3, 2.7], 3: [4.6, 2.7], 4: [0, 0], 5: [2.3, 0], 6: [4.6, 0] };
const dice = (id: string, highlights = true) => {
  const parts: Part[] = [];
  for (let k = 1; k <= 6 && highlights; k++) {
    const [x, y] = AT[k];
    parts.push(piece(`hl${k}`, [[x - 0.25, y - 0.75], [x + 1.85, y - 0.75], [x + 1.85, y + 1.85], [x - 0.25, y + 1.85]], { tone: 'good', shade: 0.3, weight: 3 }));
  }
  for (let k = 1; k <= 6; k++) parts.push(die(`d${k}`, AT[k], k, { number: true }));
  return figure(id, [join(...parts)], 420);
};
const faces = (id: string) => [1, 2, 3, 4, 5, 6].map((k) => `${id}.d${k}`);

const video: Explainer = {
  id: 'm6-12-2',
  lessonId: 'm6-12-2',
  title: 'Experiments and Likelihood, Part 1: Outcomes and Events',
  thumbnailTitle: 'Outcomes and Events',
  thumbnail: 'dc',
  summary: 'An outcome is one possible result of an experiment, and outcomes are equally likely when each has the same chance: a coin has 2 (heads, tails), a six-sided die has 6, and a spinner with 4 equal sections has 4. An event is one or more outcomes: “a number greater than 4” on a die is made of the 2 outcomes 5 and 6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 1', title: 'Outcomes and Events', subtitle: 'What can happen?' }],
      lines: [
        { say: 'Toss a coin ten times. Will you get exactly five heads? Maybe, and maybe not! To think about chance, you first need to know what can happen.', show: 'title' },
        { say: 'In this video, you will learn about outcomes and events, the building blocks of probability.' },
      ],
    },
    {
      chapter: 'Outcomes',
      layout: 'split',
      leftWidth: 460,
      left: [figure('cn', [coin('h', [0, 0], '\\text{H}'), coin('t', [3, 0], '\\text{T}', 'muted')], 300)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Outcome and equally likely', md: 'An **outcome** is one possible result of an experiment. Outcomes are **equally likely** when each one has the same chance of happening.' }],
      lines: [
        { say: 'When you toss a coin, it lands on heads or on tails. These are the two possible results.', show: ['cn.h', 'cn.t'] },
        { say: 'Each possible result is called an outcome. An outcome is one possible result of an experiment, like tossing a coin.', show: 'def' },
        { say: 'Heads and tails have the same chance of happening. We say the two outcomes are equally likely.', focus: ['cn.h', 'cn.t'] },
      ],
    },
    {
      chapter: 'A die and a spinner',
      layout: 'split',
      leftWidth: 520,
      left: [dice('dc', false)],
      right: [figure('sp', [spinner({ labels: ['Blue', 'Orange', 'Green', 'Yellow'], r: 2.4 })], 340)],
      lines: [
        { say: 'Rolling a six-sided die has six equally likely outcomes: one, two, three, four, five and six.', show: faces('dc') },
        { say: 'This spinner has four equal sections: blue, orange, green and yellow. So it has four equally likely outcomes.', show: 'sp' },
        { say: 'The sections must be equal. If one section were much bigger, the pointer would land there more often, and the outcomes would not be equally likely.', focus: 'sp' },
      ],
    },
    {
      chapter: 'Events',
      layout: 'split',
      leftWidth: 520,
      left: [dice('ev')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Event', md: 'An **event** is one or more outcomes, such as “getting an even number” when you roll a die.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{even: } 2,\\ 4,\\ 6', '\\text{greater than } 4\\!: \\ 5,\\ 6'] },
      ],
      lines: [
        { say: 'An event is one or more outcomes. For example, getting an even number is an event when you roll a die.', show: [...faces('ev'), 'def'] },
        { say: 'The event getting an even number is made of three outcomes: two, four and six.', show: ['ev.hl2', 'ev.hl4', 'ev.hl6', 'm.0'], focus: 'm.0' },
        { say: 'Now try this event: a number greater than four. List all the outcomes, and check each one. One, two, three and four are not greater than four.', hide: ['ev.hl2', 'ev.hl4', 'ev.hl6'] },
        { say: 'Only five and six are greater than four. So this event is made of two outcomes: five and six.', show: ['ev.hl5', 'ev.hl6', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Events on a spinner',
      layout: 'split',
      leftWidth: 520,
      left: [figure('se', [spinner({ labels: ['Blue', 'Orange', 'Green', 'Yellow'], r: 2.4 })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{blue or green: } 2 \\text{ outcomes}', '\\text{not yellow: } 3 \\text{ outcomes}'] }],
      lines: [
        { say: 'Events work the same way on the spinner. Its four equally likely outcomes are blue, orange, green and yellow.', show: 'se' },
        { say: 'The event the pointer lands on blue or green is made of two outcomes: blue and green.', show: 'm.0', focus: ['se.s0', 'se.s2', 'm.0'] },
        { say: 'And the event the pointer does not land on yellow is made of three outcomes: blue, orange and green. An event can be made of one outcome, or of several.', show: 'm.1', focus: ['se.s0', 'se.s1', 'se.s2', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You roll a six-sided die. Which outcomes make up the event “an odd number”?',
          choices: ['$1$, $3$ and $5$', '$2$, $4$ and $6$', '$1$ and $3$', '$5$ and $6$'],
          answer: 0,
          working: 'The outcomes are $1$ to $6$. The odd ones are $1$, $3$ and $5$.',
        },
      ],
      lines: [
        { say: 'Your turn. You roll a six-sided die. Which outcomes make up the event an odd number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: one, three and five. Choice B lists the even numbers instead, and choice C misses the five.', show: 'q.answer' },
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
          items: ['An outcome is one possible result of an experiment.', 'Equally likely outcomes each have the same chance.', 'An event is one or more outcomes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outcome is one possible result of an experiment.', show: 'sum.0' },
        { say: 'Outcomes are equally likely when each one has the same chance of happening, like the faces of a die.', show: 'sum.1' },
        { say: 'And an event is one or more outcomes. In the next part, you will predict how likely an event is. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
