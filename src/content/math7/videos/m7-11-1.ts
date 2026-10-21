import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { marbles } from '@/video/charts.ts';
import { join, piece } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { die, likelihood } from '@/content/math6/videos/lib/m6-12-figures.ts';

type P = [number, number];

// The six faces of a die in a row, each with a green highlight (`hl<n>`) for an event.
const dice = (id: string) => {
  const parts: Part[] = [];
  for (let k = 1; k <= 6; k++) {
    const x = (k - 1) * 2.3;
    parts.push(piece(`hl${k}`, [[x - 0.25, -0.75], [x + 1.85, -0.75], [x + 1.85, 1.85], [x - 0.25, 1.85]], { tone: 'good', shade: 0.3, weight: 3 }));
  }
  for (let k = 1; k <= 6; k++) parts.push(die(`d${k}`, [(k - 1) * 2.3, 0] as P, k, { number: true }));
  return figure(id, [join(...parts)], 230);
};
const faces = (id: string) => [1, 2, 3, 4, 5, 6].map((k) => `${id}.d${k}`);

// A bag of 3 red, 5 blue and 2 green marbles.
const bag = (id: string) =>
  figure(
    id,
    [
      marbles({
        groups: [
          { id: 'red', count: 3, tone: 'bad' },
          { id: 'blue', count: 5, tone: 'adj' },
          { id: 'green', count: 2, tone: 'good' },
        ],
        perRow: 5,
      }),
    ],
    260,
  );

// From impossible (0) to certain (1).
const scale = (id: string) =>
  figure(
    id,
    [
      likelihood({
        marks: [
          { at: 0, word: 'impossible' },
          { at: 0.5, word: 'as likely as not' },
          { at: 1, word: 'certain' },
        ],
        notes: [
          { id: 'zero', at: 0, tex: 'P = 0', tone: 'bad' },
          { id: 'half', at: 0.5, tex: 'P = \\tfrac{1}{2}', tone: 'adj' },
          { id: 'one', at: 1, tex: 'P = 1', tone: 'good' },
        ],
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm7-11-1',
  lessonId: 'm7-11-1',
  title: 'Expressing Probabilities, Part 1: Outcomes, Events and Probability',
  thumbnailTitle: 'Outcomes, Events and Probability',
  thumbnail: 'bg',
  summary:
    'An outcome is one possible result of an experiment, like rolling a 4 on a die; an event is one outcome or a group of outcomes, like rolling an even number, and its favourable outcomes are the ones that fit it. When all outcomes are equally likely, P(event) = favourable outcomes ÷ total outcomes, from 0 (impossible) to 1 (certain). From a bag of 3 red, 5 blue and 2 green marbles, P(blue) = 5/10 = 1/2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Outcomes, Events and Probability', subtitle: 'How likely is it?' }],
      lines: [
        { say: 'Will the spinner land on red? Will your name be drawn for the prize? Probability is a number that tells how likely something is.', show: 'title' },
        { say: 'In this video, you will learn the words we use for chance, and find a probability by counting.' },
      ],
    },
    {
      chapter: 'Outcomes and events',
      layout: 'center',
      main: [
        dice('dc'),
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Outcome, event and favourable outcome',
          md: 'An **outcome** is one possible result of an experiment, like rolling a $4$. An **event** is one outcome or a group of outcomes, like rolling an even number. A **favourable outcome** is an outcome that fits the event.',
        },
      ],
      lines: [
        { say: 'Roll a six-sided die. It can land on one, two, three, four, five or six. Each possible result is called an outcome.', show: faces('dc') },
        { say: 'Rolling a four is one outcome. An outcome is one possible result of an experiment, like rolling a die.', show: 'def', focus: 'dc.d4' },
        { say: 'An event is one outcome, or a group of outcomes. Rolling an even number is an event. It is made of three outcomes: two, four and six.', show: ['dc.hl2', 'dc.hl4', 'dc.hl6'], focus: ['dc.hl2', 'dc.hl4', 'dc.hl6'] },
        { say: 'The outcomes that fit an event are called favourable outcomes. For rolling an even number, the favourable outcomes are two, four and six.' },
      ],
    },
    {
      chapter: 'Probability',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Probability', md: 'When all the outcomes are equally likely:' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of possible outcomes}}'] },
        scale('sc'),
      ],
      lines: [
        { say: 'When all the outcomes are equally likely, you can find a probability by counting. Equally likely means each outcome has the same chance, like the faces of a fair die.', show: 'def' },
        { say: 'The probability of an event is the number of favourable outcomes, divided by the total number of possible outcomes. We write P, then the event in brackets.', show: 'm', focus: 'm' },
        { say: 'A probability is always between zero and one. Zero means the event is impossible. One means it is certain to happen. One half means it is as likely as not.', show: ['sc.line', 'sc.zero', 'sc.half', 'sc.one'] },
      ],
    },
    {
      chapter: 'Picking a marble',
      layout: 'split',
      leftWidth: 520,
      left: [bag('bg')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A bag has $3$ red, $5$ blue and $2$ green marbles. Jun picks one without looking. What is $P(\\text{blue})$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{favourable: } 5 \\text{ blue}', '\\text{total: } 3 + 5 + 2 = 10', 'P(\\text{blue}) = \\dfrac{5}{10} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'A bag has three red marbles, five blue marbles and two green marbles. Jun picks one marble without looking. What is the probability that it is blue?', show: ['bg.red', 'bg.blue', 'bg.green', 'q'] },
        { say: 'Picking without looking makes every marble equally likely. The favourable outcomes are the blue marbles. There are five of them.', show: 'm.0', focus: ['bg.blue', 'm.0'] },
        { say: 'The total number of outcomes is all the marbles: three plus five plus two is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'So the probability of blue is five out of ten. In lowest terms, that is one half. Jun is as likely to pick blue as not.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Impossible and certain',
      layout: 'split',
      leftWidth: 520,
      left: [bag('ic')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{yellow}) = \\dfrac{0}{10} = 0', 'P(\\text{red, blue or green}) = \\dfrac{10}{10} = 1'] }],
      lines: [
        { say: 'What is the probability of picking a yellow marble from the same bag?', show: ['ic.red', 'ic.blue', 'ic.green'] },
        { say: 'There are no yellow marbles, so there are zero favourable outcomes. The probability is zero out of ten, which is zero. Picking yellow is impossible.', show: 'm.0', focus: 'm.0' },
        { say: 'And the probability of picking red, blue or green? Every marble fits, so it is ten out of ten, which is one. That is certain.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag has $4$ red, $1$ blue and $3$ green marbles. You pick one without looking. What is $P(\\text{green})$?',
          choices: ['$\\dfrac{3}{5}$', '$\\dfrac{1}{3}$', '$\\dfrac{3}{8}$', '$\\dfrac{3}{4}$'],
          answer: 2,
          working: 'There are $3$ green marbles out of $4 + 1 + 3 = 8$ marbles, so $P(\\text{green}) = \\dfrac{3}{8}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag has four red, one blue and three green marbles. You pick one without looking. What is the probability of green? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C: three eighths. There are three green marbles, out of eight marbles in all. Choice A compares the green marbles with the five that are not green, instead of with all eight.', show: 'q.answer' },
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
          items: ['An outcome is one possible result. An event is one or more outcomes.', '$P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$, when the outcomes are equally likely.', 'A probability is from $0$ (impossible) to $1$ (certain).'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outcome is one possible result. An event is one or more outcomes.', show: 'sum.0' },
        { say: 'When the outcomes are equally likely, the probability of an event is the number of favourable outcomes over the total number of outcomes.', show: 'sum.1' },
        { say: 'A probability is always from zero, impossible, to one, certain. In the next part, you will write a probability in three ways. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
