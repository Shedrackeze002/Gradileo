import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { vennBox } from '../../math30-2/videos/lib/m302-3-figures.ts';

/** A bin of 60 washers: 18 zinc, 12 stainless steel, 10 brass and 20 nylon. */
const bin = (id: string) =>
  figure(
    id,
    [
      marbles({
        groups: [
          { id: 'zinc', count: 18, tone: 'adj' },
          { id: 'steel', count: 12, tone: 'hyp' },
          { id: 'brass', count: 10, tone: 'theta' },
          { id: 'nylon', count: 20, tone: 'good' },
        ],
        perRow: 10,
      }),
    ],
    300,
  );

const legend = '**18** [[adj:zinc]], **12** [[hyp:stainless steel]], **10** [[theta:brass]] and **20** [[good:nylon]] washers.';

const video: Explainer = {
  id: 'm303-7-2',
  lessonId: 'm303-7-2',
  title: 'Probability of Combined Events, Part 1: Mutually Exclusive Events',
  thumbnailTitle: 'Mutually Exclusive Events',
  thumbnail: 'bin',
  summary: 'Events that cannot happen at the same time are mutually exclusive, and P(A or B) = P(A) + P(B). A parts bin of 18 zinc, 12 stainless steel, 10 brass and 20 nylon washers gives P(stainless or brass) = 12/60 + 10/60 = 11/30. Adding is only right when the events cannot overlap.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Mutually Exclusive Events', subtitle: '$P(A \\text{ or } B) = P(A) + P(B)$' }],
      lines: [
        { say: 'A quality inspector checks three parts, not one. A roofer needs two dry days in a row. Questions like these ask about two or more events at once.', show: 'title' },
        { say: 'The key questions are: can both events happen together, and does one change the chances of the other? In this video, you will find the probability that one event or another happens, when they cannot both happen.' },
      ],
    },
    {
      chapter: 'Cannot happen together',
      layout: 'split',
      leftWidth: 600,
      left: [figure('v', [vennBox({ titles: ['\\text{a 2}', '\\text{a 5}'], values: { a: '2', b: '5', out: '1,\\ 3,\\ 4,\\ 6' }, apart: true })], 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mutually exclusive events', md: 'Two events are **mutually exclusive** if they cannot happen at the same time.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(A \\text{ or } B) = P(A) + P(B)'] },
      ],
      lines: [
        { say: 'Two events are mutually exclusive if they cannot happen at the same time.', show: 'def' },
        { say: 'One roll of a die cannot be both a two and a five. So rolling a two and rolling a five are mutually exclusive. In a diagram, their circles do not overlap.', show: ['v.box', 'v.a', 'v.b', 'v.values'] },
        { say: 'In the same way, one washer cannot be both zinc and brass, and one card cannot be both a heart and a club.' },
        { say: 'For mutually exclusive events, the probability that one or the other happens is the sum of their probabilities: P of A or B equals P of A plus P of B.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A parts bin',
      layout: 'split',
      leftWidth: 460,
      left: [bin('bin')],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: `A parts bin holds ${legend} An apprentice takes one washer without looking. What is the probability that it is stainless steel or brass?` },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{total: } 18 + 12 + 10 + 20 = 60', 'P(\\text{stainless}) = \\dfrac{12}{60}', 'P(\\text{brass}) = \\dfrac{10}{60}', '\\dfrac{12}{60} + \\dfrac{10}{60} = \\dfrac{22}{60} = \\dfrac{11}{30}'],
        },
      ],
      lines: [
        { say: 'A parts bin holds eighteen zinc washers, twelve stainless steel washers, ten brass washers and twenty nylon washers. An apprentice takes one washer without looking. What is the probability that it is stainless steel or brass?', show: ['p', 'bin'] },
        { say: 'First, find the total: eighteen plus twelve plus ten plus twenty is sixty washers.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve of the sixty are stainless steel, so P of stainless is twelve sixtieths. Ten are brass, so P of brass is ten sixtieths.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 'bin.steel', 'bin.brass'] },
        { say: 'One washer cannot be both stainless steel and brass, so the events are mutually exclusive. Add: twelve sixtieths plus ten sixtieths is twenty-two sixtieths, which is eleven thirtieths.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Why adding works',
      layout: 'split',
      leftWidth: 460,
      left: [bin('bin2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12 + 10 = 22 \\text{ favourable washers}', 'P = \\dfrac{22}{60} = \\dfrac{11}{30}'] },
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'No washer is counted twice, because no washer is both stainless steel **and** brass.' },
      ],
      lines: [
        { say: 'Why does adding work? Count the favourable washers directly. There are twelve stainless steel washers and ten brass ones, so twenty-two washers are stainless steel or brass.', show: ['bin2', 'm.0'], focus: ['bin2.steel', 'bin2.brass', 'm.0'] },
        { say: 'Twenty-two out of sixty is eleven thirtieths, the same answer.', show: 'm.1', focus: 'm.1' },
        { say: 'Adding the probabilities is the same as adding the counts. It works because no washer is counted twice: none is both stainless steel and brass.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding events that can overlap', md: 'Rolling an **even number** and rolling a **number greater than 3** can happen together: $4$ and $6$ are both. Adding $\\dfrac{3}{6} + \\dfrac{3}{6} = 1$ counts them twice.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{even or greater than 3: } 2,\\ 4,\\ 5,\\ 6 \\;\\to\\; \\good{\\dfrac{4}{6} = \\dfrac{2}{3}} \\qquad \\bad{\\dfrac{3}{6} + \\dfrac{3}{6} = 1}'] },
      ],
      lines: [
        { say: 'Only add when the events cannot happen together. Rolling an even number, and rolling a number greater than three, are not mutually exclusive: a four or a six is both.', show: 'oops' },
        { say: 'Adding three sixths and three sixths gives one, which would mean the event is certain. But a one or a three is neither. The four and the six were counted twice.' },
        { say: 'List the outcomes instead: two, four, five and six. That is four outcomes out of six, or two thirds.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A jar holds 15 red, 9 blue and 6 green buttons. One button is taken at random. What is the probability that it is blue or green?',
          choices: ['$\\dfrac{3}{10}$', '$\\dfrac{1}{5}$', '$\\dfrac{3}{50}$', '$\\dfrac{1}{2}$'],
          answer: 3,
          working: 'There are $15 + 9 + 6 = 30$ buttons. Blue and green are mutually exclusive, so $\\dfrac{9}{30} + \\dfrac{6}{30} = \\dfrac{15}{30} = \\dfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A jar holds fifteen red, nine blue and six green buttons. One button is taken at random. What is the probability that it is blue or green? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one half. There are thirty buttons, and a button cannot be both blue and green, so add: nine thirtieths plus six thirtieths is fifteen thirtieths, or one half. Choice C multiplies the two probabilities instead of adding them.', show: 'q.answer' },
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
            'Mutually exclusive events cannot happen at the same time.',
            'For them, $P(A \\text{ or } B) = P(A) + P(B)$.',
            'If the events can happen together, adding counts some outcomes twice.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Mutually exclusive events cannot happen at the same time.', show: 'sum.0' },
        { say: 'For mutually exclusive events, the probability of one or the other is the sum of their probabilities.', show: 'sum.1' },
        { say: 'But if the events can happen together, adding counts some outcomes twice, so list the outcomes instead. In part two, we find the probability that two independent events both happen. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
