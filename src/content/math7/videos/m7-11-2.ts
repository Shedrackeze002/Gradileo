import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { join, note } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { coin, die, spinner } from '@/content/math6/videos/lib/m6-12-figures.ts';

type P = [number, number];

// One coin (heads, tails) and one die (1 to 6): two sample spaces.
const coinAndDie = (id: string) => {
  const parts: Part[] = [coin('h', [0, 0.8], '\\text{H}'), coin('t', [2.6, 0.8], '\\text{T}', 'muted'), note('cn', [1.3, -0.9], '\\text{H, T}', 'center', 'theta')];
  for (let k = 1; k <= 6; k++) parts.push(die(`d${k}`, [5 + (k - 1) * 2, 0] as P, k, { number: true, size: 1.5 }));
  parts.push(note('dn', [5 + 5 * 2 / 2 + 0.75, -2.1], '1,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6', 'center', 'theta'));
  return figure(id, [join(...parts)], 240);
};

// A spinner with 4 equal sections.
const spin = (id: string) => figure(id, [spinner({ labels: ['Red', 'Blue', 'Green', 'Yellow'], tones: ['bad', 'adj', 'good', 'theta'], pointTo: 2, r: 2.4 })], 380);

// One outcome of a coin and a die together: heads and a 3, written H3.
const pair = (id: string) => figure(id, [join(coin('h', [0, 0.75], '\\text{H}'), die('d3', [2, 0] as P, 3, { size: 1.5 }), note('w', [1.75, -0.9], '\\text{H3}', 'center', 'theta'))], 220);

const video: Explainer = {
  id: 'm7-11-2',
  lessonId: 'm7-11-2',
  title: 'Sample Spaces for Two Events, Part 1: Sample Spaces',
  thumbnailTitle: 'Sample Spaces',
  thumbnail: 'cd',
  summary:
    'The sample space is the list of all possible outcomes of an experiment: H, T for one coin, 1 to 6 for one die, and red, blue, green, yellow for a spinner with 4 equal sections. When you do two things at once, each outcome is a pair, like H3 for heads and a 3. Two events are independent when the result of one does not change the probabilities of the other, like flipping a coin and rolling a die.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Sample Spaces', subtitle: 'Every outcome that can happen' }],
      lines: [
        { say: 'In many games you do two things at once: flip a coin and spin a spinner, or roll two dice. Before you can find a probability, you need to know every outcome that can happen.', show: 'title' },
        { say: 'In this video, you will meet the sample space, the list of every outcome.' },
      ],
    },
    {
      chapter: 'The sample space',
      layout: 'center',
      main: [
        coinAndDie('cd'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sample space', md: 'The **sample space** is the list of all possible outcomes of an experiment.' },
      ],
      lines: [
        { say: 'The sample space is the list of all the possible outcomes of an experiment.', show: 'def' },
        { say: 'For one coin, the sample space is heads and tails. We often write H for heads and T for tails.', show: ['cd.h', 'cd.t', 'cd.cn'] },
        { say: 'For one six-sided die, the sample space is one, two, three, four, five and six.', show: ['cd.d1', 'cd.d2', 'cd.d3', 'cd.d4', 'cd.d5', 'cd.d6', 'cd.dn'] },
      ],
    },
    {
      chapter: 'One spinner',
      layout: 'split',
      leftWidth: 520,
      left: [spin('sp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A spinner has $4$ equal sections coloured red, blue, green and yellow. What is its sample space?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{red, blue, green, yellow}', '4 \\text{ outcomes}'] },
      ],
      lines: [
        { say: 'A spinner has four equal sections, coloured red, blue, green and yellow. What is its sample space?', show: ['sp.s0', 'sp.s1', 'sp.s2', 'sp.s3', 'sp.pointer', 'q'] },
        { say: 'Each colour is one possible outcome. So the sample space is red, blue, green and yellow: four outcomes.', show: ['m.0', 'm.1'], focus: 'm.0' },
        { say: 'The sections are equal, so the four outcomes are equally likely.' },
      ],
    },
    {
      chapter: 'Two things at once',
      layout: 'split',
      leftWidth: 480,
      left: [pair('pr')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'When you do two things, each outcome is a **pair**: one result for each object. **H3** means heads and a $3$. $(2,\\ 5)$ means a $2$ on the red die and a $5$ on the blue die.' }],
      lines: [
        { say: 'Now flip a coin and roll a die at the same time. What does one outcome look like?', show: ['pr.h', 'pr.d3'] },
        { say: 'Each outcome is a pair: one result for the coin, and one result for the die. Heads and a three is one outcome. We write it as H three.', show: ['pr.w', 't'], focus: 'pr.w' },
        { say: 'With two dice, we can write a pair of numbers in brackets. Two, five means a two on the red die and a five on the blue die.' },
      ],
    },
    {
      chapter: 'Independent events',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Independent events', md: 'Two events are **independent** when the result of one does **not change** the probabilities of the other.' },
        { kind: 'bullets', id: 'b', items: ['Flipping a coin and rolling a die: **independent**. The coin does not care what the die shows.', 'Picking a marble, keeping it, then picking another: **not independent**. The bag has changed.'] },
      ],
      lines: [
        { say: 'Two events are independent when the result of one does not change the probabilities of the other.', show: 'def' },
        { say: 'Flipping a coin and rolling a die are independent. The coin does not care what the die shows. Whatever the coin does, the die still has six equally likely outcomes.', show: 'b.0' },
        { say: 'Here is an example that is not independent. Pick a marble from a bag, keep it, then pick another. The first pick changes what is left in the bag, so it changes the chances for the second pick.', show: 'b.1' },
        { say: 'In this lesson, every pair of events is independent, like a coin and a die.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You flip a coin and roll a six-sided die. Which of these is **one outcome** in the sample space?',
          choices: ['heads', 'T4', '$7$', 'H and T'],
          answer: 1,
          working: 'Each outcome is a pair: one result for the coin and one for the die. T4 means tails and a $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. You flip a coin and roll a six-sided die. Which of these is one outcome in the sample space? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: T four, which means tails and a four. Each outcome is a pair, one result for each object. Choice A gives only the coin’s result, and leaves out the die.', show: 'q.answer' },
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
          items: ['The sample space is the list of all possible outcomes.', 'With two objects, each outcome is a pair, like H3.', 'Two events are independent when one does not change the probabilities of the other.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The sample space is the list of all the possible outcomes.', show: 'sum.0' },
        { say: 'With two objects, each outcome is a pair, like H three.', show: 'sum.1' },
        { say: 'And two events are independent when one does not change the probabilities of the other. In the next part, you will list the sample space of two events in a table. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
