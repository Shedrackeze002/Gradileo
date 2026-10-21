import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { spinner } from '@/content/math6/videos/lib/m6-12-figures.ts';

// A spinner with 8 equal sections, 3 of them blue: P(blue) = 3/8.
const spin = (id: string) =>
  figure(
    id,
    [spinner({ labels: ['1', '2', '3', '4', '5', '6', '7', '8'], tones: ['adj', 'opp', 'adj', 'theta', 'opp', 'adj', 'theta', 'opp'], pointTo: 1, r: 2.6 })],
    440,
  );

const video: Explainer = {
  id: 'm9-10-4',
  lessonId: 'm9-10-4',
  title: 'Probability in Society, Part 1: Three Kinds of Probability',
  thumbnailTitle: 'Three Kinds of Probability',
  thumbnail: 'sp',
  summary:
    'Theoretical probability comes from counting equally likely outcomes, without doing the experiment: a spinner with 8 equal sections, 3 of them blue, gives P(blue) = 3/8. Experimental probability comes from data, the results of trials or records of what happened: a bus late on 30 of the past 200 school days is late with a probability of about 30/200 = 15%. Subjective probability comes from a person’s opinion or judgement, such as a coach who thinks her team has about a 70% chance of winning.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 1', title: 'Three Kinds of Probability', subtitle: 'Counting, data, or opinion' }],
      lines: [
        { say: 'Weather forecasts, sports reports, medicine labels and contest rules all use probability. But not every probability comes from the same place.', show: 'title' },
        { say: 'In this video, you will learn three kinds of probability, theoretical, experimental and subjective, and how to tell them apart.' },
      ],
    },
    {
      chapter: 'Theoretical',
      layout: 'split',
      leftWidth: 520,
      left: [spin('sp')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theoretical probability', md: 'Comes from **counting equally likely outcomes**, without doing the experiment.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{blue}) = \\dfrac{3}{8}', 'P(\\text{rolling a } 6) = \\dfrac{1}{6}'] },
      ],
      lines: [
        { say: 'Here is a spinner with eight equal sections. Three of them are blue.', show: 'sp' },
        { say: 'The first kind is theoretical probability. It comes from counting outcomes that are equally likely, without spinning even once.', show: 'def' },
        { say: 'The eight sections are equal, so each is equally likely. Three of the eight are blue, so the probability of blue is three out of eight.', show: 'm.0', focus: 'm.0' },
        { say: 'A die works the same way. It has six equally likely faces, and one of them is a six, so the probability of rolling a six is one out of six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Experimental',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Experimental probability', md: 'Comes from **data**: the results of trials, or records of what happened in the past.' },
        { kind: 'text', id: 'q', size: 'md', md: 'In the past $200$ school days, the bus was late $30$ times.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{late}) \\approx \\dfrac{30}{200} = 0.15 = 15\\%'] },
      ],
      lines: [
        { say: 'The second kind is experimental probability. It comes from data: the results of trials you have done, or records of what happened in the past.', show: 'def' },
        { say: 'For example, in the past two hundred school days, the school bus was late thirty times.', show: 'q' },
        { say: 'Thirty out of two hundred is zero point one five, or fifteen percent. So the probability that the bus is late tomorrow is about fifteen percent.', show: 'm', focus: 'm' },
        { say: 'Nobody counted equally likely outcomes here. The number comes from what actually happened, so it is experimental.' },
      ],
    },
    {
      chapter: 'Subjective',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subjective probability', md: 'Comes from a person’s **opinion**, feelings or judgement, not from counting or from data.' },
        { kind: 'text', id: 'q', size: 'md', md: 'A coach thinks her team has about a $70\\%$ chance of winning the final.' },
      ],
      lines: [
        { say: 'The third kind is subjective probability. It comes from a person’s opinion, feelings or judgement, not from counting and not from data.', show: 'def' },
        { say: 'For example, a coach thinks her team has about a seventy percent chance of winning the final.', show: 'q' },
        { say: 'The coach may know the team well, but the seventy percent is a judgement. Another coach could give a different number. So it is subjective.' },
      ],
    },
    {
      chapter: 'Which kind?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Statement', 'Kind'],
          rows: [
            ['(a) A spinner has $8$ equal sections and $3$ are blue, so $P(\\text{blue}) = \\frac{3}{8}$.', '**Theoretical**'],
            ['(b) The bus was late on $30$ of the past $200$ school days, so the chance it is late tomorrow is about $15\\%$.', '**Experimental**'],
            ['(c) A coach thinks her team has about a $70\\%$ chance of winning.', '**Subjective**'],
          ],
        },
      ],
      lines: [
        { say: 'To tell them apart, ask where the number came from. The first statement counts equal sections, so it is theoretical.', show: 't.0', focus: 't.0' },
        { say: 'The second statement uses records of what happened, so it is experimental.', show: 't.1', focus: 't.1' },
        { say: 'And the third statement is the coach’s opinion, so it is subjective.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A weather app notes that it rained on $18$ of the last $60$ days that had weather like today, so it gives a $30\\%$ chance of rain tomorrow. Which kind of probability is this?',
          choices: ['Theoretical', 'Experimental', 'Subjective', 'It is not a probability, because it is a percent.'],
          answer: 1,
          working: 'The $30\\%$ comes from records of what happened: $18 \\div 60 = 0.3 = 30\\%$. A probability that comes from data is **experimental**.',
        },
      ],
      lines: [
        { say: 'Your turn. A weather app notes that it rained on eighteen of the last sixty days that had weather like today, so it gives a thirty percent chance of rain tomorrow. Which kind of probability is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, experimental. The thirty percent comes from records of what happened, eighteen out of sixty. Choice A would need equally likely outcomes, and rainy and dry days are not equally likely.', show: 'q.answer' },
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
            '**Theoretical:** from counting equally likely outcomes.',
            '**Experimental:** from data, trials or records.',
            '**Subjective:** from a person’s opinion or judgement.',
            'Ask where the number came from.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Theoretical probability comes from counting equally likely outcomes.', show: 'sum.0' },
        { say: 'Experimental probability comes from data, from trials or records.', show: 'sum.1' },
        { say: 'Subjective probability comes from a person’s opinion or judgement.', show: 'sum.2' },
        { say: 'To tell them apart, ask where the number came from. In the next part, you will find out what a probability really means, and what it does not promise. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
