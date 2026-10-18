import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

/** A box of 40 spark plugs: 6 defective (red) and 34 that work (green). */
const plugs = (id: string) => figure(id, [marbles({ groups: [{ id: 'bad', count: 6, tone: 'bad' }, { id: 'ok', count: 34, tone: 'good' }], perRow: 8 })], 330);

const video: Explainer = {
  id: 'm303-7-1',
  lessonId: 'm303-7-1',
  title: 'Probability and Odds, Part 1: Probability as a Fraction, Decimal and Percent',
  thumbnailTitle: 'What Is Probability?',
  thumbnail: 'pl',
  summary: 'Probability as favourable outcomes over all outcomes, from 0 (impossible) to 1 (certain), written as a fraction, a decimal and a percent: a box of 40 spark plugs with 6 defective gives 3/20, 0.15 or 15%, and the complement, the chance a plug works, is 1 − 0.15 = 0.85. Part 2 covers odds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Probability as a Fraction, Decimal and Percent', subtitle: 'Putting a number on how likely something is' }],
      lines: [
        { say: 'Will it snow tomorrow? Is this box of spark plugs likely to hold a dud? Is a raffle ticket worth buying? Probability puts a number on how likely something is.', show: 'title' },
        { say: 'In this video, you will find a probability by counting, and write it as a fraction, a decimal and a percent. You will also find the probability that something does not happen.' },
      ],
    },
    {
      chapter: 'What probability means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Probability', md: 'When all the outcomes are equally likely, the **probability** of an event is the number of favourable outcomes divided by the total number of outcomes.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}'] },
      ],
      lines: [
        { say: 'An outcome is one possible result. When you take one plug from a box of forty plugs without looking, there are forty possible outcomes, one for each plug.', show: 'def' },
        { say: 'An event is the result you are asking about, such as “the plug is defective”. The favourable outcomes are the ones that make the event happen.' },
        { say: 'When all the outcomes are equally likely, the probability of an event is the number of favourable outcomes, divided by the total number of outcomes. We write it as P of the event.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From impossible to certain',
      layout: 'center',
      main: [
        figure('scale', [
          numberLine({
            min: 0,
            max: 1,
            step: 0.25,
            length: 12,
            points: [
              { id: 'imp', value: 0, tex: '\\text{impossible}', tone: 'bad' },
              { id: 'even', value: 0.5, tex: '\\text{even chance}', tone: 'theta' },
              { id: 'cert', value: 1, tex: '\\text{certain}', tone: 'good' },
            ],
          }),
        ], 170),
        { kind: 'text', id: 't', size: 'md', md: 'A probability is never less than $0$ and never more than $1$. It can be written as a **fraction**, a **decimal** or a **percent**.' },
      ],
      lines: [
        { say: 'A probability is always between zero and one. A probability of zero means the event is impossible: it can never happen.', show: ['scale.axis', 'scale.imp'] },
        { say: 'A probability of one means the event is certain: it always happens.', show: 'scale.cert' },
        { say: 'And a probability of one half, in the middle, means the event is just as likely to happen as not, like a fair coin landing heads.', show: 'scale.even' },
        { say: 'A probability can be written as a fraction, a decimal or a percent. All three say the same thing.', show: 't' },
      ],
    },
    {
      chapter: 'Spark plugs',
      layout: 'split',
      leftWidth: 460,
      left: [plugs('pl')],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A box of 40 spark plugs holds 6 defective plugs. A mechanic takes one plug at random. What is the probability that it is defective?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{favourable: } 6, \\quad \\text{total: } 40', '\\text{fraction: } \\dfrac{6}{40} = \\dfrac{3}{20}', '\\text{decimal: } 6 \\div 40 = 0.15', '\\text{percent: } 0.15 \\times 100 = 15\\%'] },
      ],
      lines: [
        { say: 'A box of forty spark plugs is delivered to a repair shop. Six of the plugs are defective. A mechanic takes one plug at random. What is the probability that it is defective?', show: ['p', 'pl'] },
        { say: 'The favourable outcomes are the six defective plugs, and there are forty plugs in all.', show: 'm.0', focus: ['pl.bad', 'm.0'] },
        { say: 'As a fraction, the probability is six fortieths. Both numbers divide by two, so in lowest terms it is three twentieths.', show: 'm.1', focus: 'm.1' },
        { say: 'As a decimal, divide the top by the bottom: six divided by forty is 0.15.', show: 'm.2', focus: 'm.2' },
        { say: 'As a percent, multiply the decimal by a hundred: 0.15 times a hundred is fifteen percent.', show: 'm.3', focus: 'm.3' },
        { say: 'So the probability is three twentieths, or 0.15, or fifteen percent. About fifteen plugs in every hundred are defective.', focus: 'pl' },
      ],
    },
    {
      chapter: 'The complement',
      layout: 'split',
      leftWidth: 460,
      left: [plugs('pl2')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'The complement', md: 'The probability that an event does **not** happen is $1 - P(\\text{event})$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{works}) = 1 - 0.15 = 0.85 = 85\\%', '\\text{check: } \\dfrac{34}{40} = 0.85 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'What is the probability that the plug works? “The plug works” is the complement of “the plug is defective”: it is the event not happening.', show: ['pl2', 'tip'] },
        { say: 'Every plug either works or is defective, so the two probabilities add to one. The probability that an event does not happen is one minus the probability that it does.' },
        { say: 'So the probability that the plug works is one minus 0.15, which is 0.85, or eighty-five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Check by counting: thirty-four of the forty plugs work, and thirty-four divided by forty is 0.85.', show: 'm.1', focus: ['m.1', 'pl2.ok'] },
      ],
    },
    {
      chapter: 'Check your answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'The favourable outcomes go on **top**. $40 \\div 6 \\approx 6.67$ cannot be a probability: it is more than $1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{40}{6} \\approx 6.67} \\qquad \\good{\\dfrac{6}{40} = 0.15}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide the wrong way: forty divided by six, which is about 6.67.', show: 'oops' },
        { say: 'That cannot be right, because a probability is never more than one. The favourable outcomes go on top, and the total goes on the bottom.', show: 'm', focus: 'm' },
        { say: 'So always check that your answer is between zero and one, or between zero and a hundred percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A carton of 24 eggs holds 3 cracked eggs. One egg is taken at random. What is the probability that it is cracked, as a percent?',
          choices: ['$3\\%$', '$8\\%$', '$12.5\\%$', '$87.5\\%$'],
          answer: 2,
          working: '$\\dfrac{3}{24} = \\dfrac{1}{8} = 0.125 = 12.5\\%$. The probability that the egg is not cracked is $1 - 0.125 = 0.875$, or $87.5\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A carton of twenty-four eggs holds three cracked eggs. One egg is taken at random. What is the probability that it is cracked, as a percent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 12.5 percent. Three out of twenty-four is one eighth, which is 0.125, or 12.5 percent. Choice D, 87.5 percent, is the complement: the probability that the egg is not cracked.', show: 'q.answer' },
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
            '$P(\\text{event}) = \\dfrac{\\text{favourable}}{\\text{total}}$, from $0$ (impossible) to $1$ (certain).',
            'Write it as a fraction in lowest terms, a decimal (divide) or a percent (multiply by 100).',
            'The probability that an event does not happen is $1 - P(\\text{event})$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A probability is the number of favourable outcomes over the total number of outcomes. It runs from zero, impossible, to one, certain.', show: 'sum.0' },
        { say: 'You can write it as a fraction in lowest terms, as a decimal by dividing, or as a percent by multiplying the decimal by a hundred.', show: 'sum.1' },
        { say: 'And the probability that an event does not happen is one minus the probability that it does. In part two, we describe chances with odds. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
