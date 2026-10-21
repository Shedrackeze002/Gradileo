import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { days, join, note } from './lib/m9-10-figures.ts';

// Ten days with weather like this: rain (blue) on 7 of them, dry (yellow) on 3.
const forecast = (id: string) =>
  figure(
    id,
    [
      join(
        days({ name: 'w', count: 10, which: [0, 1, 3, 4, 6, 7, 9], tone: 'adj', rest: 'theta' }),
        note({ id: 'rain', at: [0, 1.7], tex: '\\adj{\\blacksquare}\\ \\text{rain: } 7 \\text{ days}', place: 'right' }),
        note({ id: 'dry', at: [6.5, 1.7], tex: '\\thc{\\blacksquare}\\ \\text{dry: } 3 \\text{ days}', place: 'right' }),
      ),
    ],
    220,
  );

// Three sets of 5 cereal boxes, where 1 box in every 5 has a prize over a very large number of
// boxes: one set has no prize, one has 1, and one has 2.
const boxes = (id: string) =>
  figure(
    id,
    [
      join(
        days({ name: 's0', count: 5, which: [], tone: 'good', rest: 'muted', at: [0, 0] }),
        days({ name: 's1', count: 5, which: [3], tone: 'good', rest: 'muted', at: [0, -1.8] }),
        days({ name: 's2', count: 5, which: [0, 4], tone: 'good', rest: 'muted', at: [0, -3.6] }),
        note({ id: 'n0', at: [6.4, 0.5], tex: '0 \\text{ prizes}', place: 'right', tone: 'bad' }),
        note({ id: 'n1', at: [6.4, -1.3], tex: '1 \\text{ prize}', place: 'right' }),
        note({ id: 'n2', at: [6.4, -3.1], tex: '2 \\text{ prizes}', place: 'right' }),
        note({ id: 'key', at: [0, 1.6], tex: '\\good{\\blacksquare}\\ \\text{a box with a prize}', place: 'right' }),
      ),
    ],
    330,
  );

const video: Explainer = {
  id: 'm9-10-4-b',
  lessonId: 'm9-10-4',
  title: 'Probability in Society, Part 2: What a Probability Means',
  thumbnailTitle: 'What a Probability Means',
  thumbnail: 'fc',
  summary:
    'A probability describes what happens over many similar situations; it never guarantees what will happen next time. A 70% chance of rain tomorrow means that on many days with weather like this, rain falls on about 7 of every 10: rain is likely but not certain, and it does not mean rain for 70% of the day. "1 in every 5 boxes contains a prize" describes a very large number of boxes, so buying 5 boxes does not guarantee a prize. Words like "definitely", "exactly" and "sure to" claim too much.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 2', title: 'What a Probability Means', subtitle: 'Likely is not the same as certain' }],
      lines: [
        { say: 'You hear probabilities every day: a seventy percent chance of rain, or one prize in every five boxes. But what do they really mean?', show: 'title' },
        { say: 'In this video, you will learn to read probability statements correctly, and to spot statements that claim too much.' },
      ],
    },
    {
      chapter: 'A forecast',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The forecast for a town says there is a $70\\%$ chance of rain tomorrow. What does that mean?' },
        forecast('fc'),
        { kind: 'text', id: 'a', size: 'md', md: 'Rain is **likely**, but **not certain**. It does **not** mean rain for $70\\%$ of the day.' },
      ],
      lines: [
        { say: 'The forecast for a town says there is a seventy percent chance of rain tomorrow. What does that mean?', show: 'q' },
        { say: 'Think about many days with weather just like tomorrow’s. On about seven out of every ten of those days, it rains. On the other three, it stays dry.', show: 'fc', focus: 'fc.w-shaded' },
        { say: 'So rain is likely. But tomorrow could still be one of the dry days. Rain is not certain.', focus: 'fc.w-others' },
        { say: 'And it does not mean that it will rain for seventy percent of the day. The probability is about whether it rains at all, not about how long.', show: 'a' },
      ],
    },
    {
      chapter: 'One in five',
      layout: 'split',
      leftWidth: 560,
      left: [boxes('bx')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'A cereal maker says “$1$ in every $5$ boxes contains a prize.” If you buy $5$ boxes, are you **sure** to win?' }],
      lines: [
        { say: 'A cereal maker says one in every five boxes contains a prize. If you buy five boxes, are you sure to win a prize?', show: 'q' },
        { say: 'One in five means the probability of a prize is one fifth, over a very large number of boxes. Out of thousands of boxes, about one fifth have prizes.', show: 'bx.key' },
        { say: 'But the prize boxes are mixed in at random. So any five boxes you happen to buy could have no prize at all, or one prize, or even two prizes.', show: ['bx.s0-others', 'bx.n0', 'bx.s1-shaded', 'bx.s1-others', 'bx.n1', 'bx.s2-shaded', 'bx.s2-others', 'bx.n2'] },
        { say: 'So no, you are not sure to win. Buying five boxes does not guarantee a prize.', focus: ['bx.s0-others', 'bx.n0'] },
      ],
    },
    {
      chapter: 'Not a promise',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Probability is not a promise',
          md: 'A $90\\%$ chance is not a guarantee, and a $10\\%$ chance can still happen. Words like **“definitely”**, **“exactly”** and **“sure to”** are signs that a statement claims too much.',
        },
      ],
      lines: [
        { say: 'Here is the big idea. A probability describes what happens over many similar situations. It never promises what will happen next time.', show: 'oops' },
        { say: 'A ninety percent chance is not a guarantee. And a ten percent chance can still happen. Unlikely things happen all the time, just not very often.' },
        { say: 'Watch out for words like definitely, exactly and sure to. They are signs that a statement about chance claims too much.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A game says there is a “$1$ in $10$” chance of winning a prize on each play. Which statement is true?',
          choices: [
            'If you play $10$ times, you will win exactly once.',
            'If you lose $9$ times in a row, you are sure to win on the next play.',
            'Over a very large number of plays, about $1$ play in every $10$ wins a prize.',
            'If you play $10$ times and never win, the game must be broken.',
          ],
          answer: 2,
          working: 'A probability describes what happens over many plays. In $10$ plays you could win no times, once, or more than once, and losing $9$ times does not change the chance on the next play.',
        },
      ],
      lines: [
        { say: 'Your turn. A game says there is a one in ten chance of winning a prize on each play. Which statement is true? Pause the video and try it.', show: 'q', wait: 10 },
        { say: 'The answer is C. A probability describes what happens over a very large number of plays. Choice A treats the probability as a promise, but ten plays could give no wins, one win, or more.', show: 'q.answer' },
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
            'A probability describes what happens over **many** similar situations.',
            'A $70\\%$ chance of rain: rain on about $7$ of every $10$ days like this. Likely, not certain.',
            '“$1$ in $5$” does not promise a prize in any $5$ boxes.',
            'A probability is **never** a promise about one event.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A probability describes what happens over many similar situations.', show: 'sum.0' },
        { say: 'A seventy percent chance of rain means rain on about seven of every ten days like this. Rain is likely, but not certain.', show: 'sum.1' },
        { say: 'One in five does not promise a prize in any five boxes.', show: 'sum.2' },
        { say: 'And a probability is never a promise about one event. In the next part, you will use probability to predict how often something happens. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
