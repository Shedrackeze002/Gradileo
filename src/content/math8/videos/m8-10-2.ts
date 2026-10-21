import type { DiagramTone, Explainer, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { marbles } from '@/video/charts.ts';
import { coin, die } from '@/content/math6/videos/lib/m6-12-figures.ts';

type P = [number, number];

/** A label (TeX) at a point, with no dot: the part `id`. */
const label = (id: string, at: P, tex: string, place: Place = 'center', tone: DiagramTone = 'ink'): Part => ({ points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place, tone }] });

// A die and a coin: neither can change the other.
const dieCoin = (id: string) => figure(id, [die('die', [0, 0], 4, { size: 2 }), coin('coin', [4.4, 1], '\\text{H}', 'theta')], 300);

// A bag of 3 red and 2 blue marbles. A red marble is picked. Put back: 3 red and 2 blue again, so
// P(red) = 3/5. Kept out: 2 red and 2 blue are left, so P(red) = 2/4.
const bags = (id: string) =>
  figure(
    id,
    [
      label('t1', [-0.6, 0], '\\text{Put it back:}', 'left', 'good'),
      marbles({ name: 'back', groups: [{ id: 'red', count: 3, tone: 'bad' }, { id: 'blue', count: 2, tone: 'adj' }], at: [0, 0] }),
      label('p1', [5, 0], 'P(\\text{red}) = \\dfrac{3}{5}', 'right'),
      label('t2', [-0.6, -2.4], '\\text{Keep it out:}', 'left', 'bad'),
      marbles({ name: 'out', groups: [{ id: 'red', count: 2, tone: 'bad' }, { id: 'blue', count: 2, tone: 'adj' }], at: [0, -2.4] }),
      label('p2', [5, -2.4], 'P(\\text{red}) = \\dfrac{2}{4}', 'right'),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-10-2',
  lessonId: 'm8-10-2',
  title: 'Probability of Independent Events, Part 1: Independent Events',
  thumbnailTitle: 'Independent Events',
  thumbnail: 'bg',
  summary:
    'Two events are independent when the result of one does not change the probability of the other. Rolling a die and flipping a coin are independent. Picking a marble, putting it back and picking again are independent, because the bag is the same both times (3 red of 5, so P(red) = 3/5 each time); keeping the first marble out changes the bag (2 red of 4), so those picks are not independent. Spinning a spinner twice is independent; drawing two names from a hat without putting the first back is not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 1', title: 'Independent Events', subtitle: 'When one result does not change the other' }],
      lines: [
        { say: 'What is the chance it rains on both days of your camping weekend? What is the chance a basketball player makes two free throws in a row?', show: 'title' },
        { say: 'Questions like these are about two events at once. In this video, you will learn when two events are independent. That is the key to answering them.' },
      ],
    },
    {
      chapter: 'Outcomes and events',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Outcome, event and probability',
          md: 'An **outcome** is one possible result, like rolling a $4$. An **event** is an outcome or a group of outcomes, like rolling an even number. Its **probability** is a number from $0$ (impossible) to $1$ (certain).',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{even}) = \\dfrac{\\text{favourable outcomes}}{\\text{all outcomes}} = \\dfrac{3}{6} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'First, a quick reminder of some words. An outcome is one possible result, like rolling a four on a die.', show: 'def' },
        { say: 'An event is one outcome, or a group of outcomes, like rolling an even number.' },
        { say: 'The probability of an event is a number from zero to one that tells how likely it is. Zero means impossible, and one means certain.' },
        { say: 'When the outcomes are equally likely, the probability is the number of favourable outcomes, over the number of all the outcomes. A die has three even numbers out of six, so the probability of rolling an even number is three sixths, which is one half.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Independent events',
      layout: 'split',
      leftWidth: 520,
      left: [dieCoin('dc')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Independent events', md: 'Two events are **independent** when the result of one does **not change** the probability of the other.' }],
      lines: [
        { say: 'Two events are independent when the result of one does not change the probability of the other.', show: 'def' },
        { say: 'Roll a die, and flip a coin. The die cannot change the coin.', show: ['dc.die', 'dc.coin'] },
        { say: 'Whatever number you roll, the coin still has a one half chance of landing heads. So rolling a die and flipping a coin are independent events.', focus: 'dc.coin' },
      ],
    },
    {
      chapter: 'Putting it back',
      layout: 'split',
      leftWidth: 700,
      left: [bags('bg')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Put it back', md: 'Putting the first item **back** keeps the picks independent. Keeping it **out** changes what is left, so the picks are **not** independent.' }],
      lines: [
        { say: 'Now picture a bag with three red marbles and two blue marbles. You pick one without looking, and it is red.', show: ['bg.t1', 'bg.back-red', 'bg.back-blue'] },
        { say: 'If you put the marble back, the bag is the same as before for the second pick. The chance of red is still three out of five. The two picks are independent.', show: 'bg.p1', focus: 'bg.p1' },
        { say: 'But if you keep the red marble out, the bag has changed. Now only two of the four marbles are red, so the chance of red is two out of four. These picks are not independent.', show: ['bg.t2', 'bg.out-red', 'bg.out-blue', 'bg.p2'], focus: 'bg.p2' },
        { say: 'Cards work the same way. Picking a card, putting it back, and picking again gives independent picks. Picking twice without putting the first card back does not.', show: 'key' },
      ],
    },
    {
      chapter: 'Independent or not?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which pair of events is independent?' },
        {
          kind: 'table',
          id: 't',
          head: ['Events', 'Independent?'],
          rows: [
            ['(a) Draw a name from a hat, keep it out, then draw a second name.', 'No: fewer names are left.'],
            ['(b) Spin a spinner twice.', 'Yes: the spinner is the same both times.'],
          ],
        },
      ],
      lines: [
        { say: 'Try these. Which pair of events is independent?', show: 'q' },
        { say: 'First: drawing a name from a hat, keeping it out, then drawing a second name. After the first name is kept out, there are fewer names in the hat, so the chances for the second draw change. Not independent.', show: 't.0', focus: 't.0' },
        { say: 'Second: spinning a spinner twice. The spinner is exactly the same for both spins, so the first spin cannot change the second. Independent!', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pair of events is **independent**?',
          choices: [
            'Picking a marble, keeping it, then picking another from the same bag',
            'Drawing two cards from a deck without putting the first one back',
            'Choosing a class captain, then a vice-captain from the students left',
            'Rolling a die, then flipping a coin',
          ],
          answer: 3,
          working: 'The die cannot change the coin, so rolling a die and flipping a coin are independent. In the other three, the first choice changes what is left for the second.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair of events is independent? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D: rolling a die, then flipping a coin. The die cannot change the coin. Choice A is not independent, because keeping the first marble out changes what is left in the bag.', show: 'q.answer' },
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
          items: ['Two events are **independent** when one does not change the probability of the other.', 'Putting an item back keeps the picks independent.', 'Keeping it out changes what is left, so the picks are not independent.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two events are independent when the result of one does not change the probability of the other.', show: 'sum.0' },
        { say: 'Putting an item back keeps the picks independent.', show: 'sum.1' },
        { say: 'Keeping it out changes what is left, so the picks are not independent. In the next part, you will find the probability that two independent events both happen. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
