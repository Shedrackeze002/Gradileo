import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { tickLabels } from '@/content/math5/videos/lib/m5-1-figures.ts';

// The five numbers on a number line from 1.8 to 2.3, labels above and below in turn.
const line = figure('nl', [
  numberLine({
    min: 1.8,
    max: 2.3,
    step: 0.05,
    every: 0,
    length: 14,
    points: [
      { id: 'p0', value: 1.875, tex: '1\\dfrac78', tone: 'opp' },
      { id: 'p1', value: 2, tex: '2', tone: 'adj', below: true },
      { id: 'p2', value: 2.15, tex: '2.15', tone: 'good' },
      { id: 'p3', value: 2.205, tex: '2.205', tone: 'hyp', below: true },
      { id: 'p4', value: 2.25, tex: '\\dfrac94', tone: 'theta' },
    ],
  }),
  tickLabels({ min: 1.8, max: 2.3, length: 14, values: [{ id: 'lo', value: 1.8, tex: '1.8' }, { id: 'hi', value: 2.3, tex: '2.3' }] }),
], 260);

const video: Explainer = {
  id: 'm7-1-3-d',
  lessonId: 'm7-1-3',
  title: 'Comparing and Ordering Numbers, Part 4: Ordering a Set of Numbers',
  thumbnailTitle: 'Ordering a Set of Numbers',
  thumbnail: 'nl',
  summary:
    'To order a set of numbers: write every number as a decimal, compare the whole-number parts first, then the decimal parts place by place, and give the answer in the original forms. From least to greatest: 1 7/8 (1.875), 2, 2.15, 2.205, 9/4 (2.25). A number line checks the order: numbers farther right are greater.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 4', title: 'Ordering a Set of Numbers', subtitle: 'From least to greatest' }],
      lines: [
        { say: 'Comparing two numbers is one thing. But what about putting five numbers in order, when some are fractions, some are decimals and one is a whole number?', show: 'title' },
        { say: 'In this part, you will learn four steps that order any set of numbers, and check the order on a number line.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Write every number as a decimal.',
            '**2.** Compare the whole-number parts first.',
            '**3.** Then compare the decimal parts, place by place.',
            '**4.** Write the numbers in order, in their **original** form.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the four steps. One: write every number as a decimal, so they are all in the same form.', show: 'b.0' },
        { say: 'Two: compare the whole-number parts first. A number with a smaller whole-number part is smaller, whatever comes after the decimal point.', show: 'b.1' },
        { say: 'Three: then compare the decimal parts, place by place, from left to right.', show: 'b.2' },
        { say: 'Four: write the numbers in order, but in their original form, the way the question gave them.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Write each as a decimal',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'As a decimal'],
          rows: [
            ['$1\\dfrac{7}{8}$', '$1.875$'],
            ['$2$', '$2.000$'],
            ['$\\dfrac{9}{4}$', '$2.250$'],
            ['$2.15$', '$2.150$'],
            ['$2.205$', '$2.205$'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Order from least to greatest: $1\\dfrac{7}{8}$, $2$, $\\dfrac{9}{4}$, $2.15$, $2.205$' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1\\dfrac78 = 1 + 0.875 = 1.875', '\\dfrac94 = 2\\dfrac14 = 2.25'] },
      ],
      lines: [
        { say: 'Let’s order these five numbers from least to greatest: one and seven eighths, two, nine quarters, two point one five, and two point two zero five.', show: 'q' },
        { say: 'Step one: write each as a decimal. One and seven eighths is one plus zero point eight seven five, which is one point eight seven five.', show: ['m.0', 't.0'], focus: ['m.0', 't.0'] },
        { say: 'Two is two point zero zero zero. Writing the zeros helps us line up the places.', show: 't.1', focus: 't.1' },
        { say: 'Nine quarters is more than one whole. Eight quarters make two wholes, and one quarter is left. So nine quarters is two and one quarter, which is two point two five.', show: ['m.1', 't.2'], focus: ['m.1', 't.2'] },
        { say: 'The last two are already decimals. Give them three places as well: two point one five zero, and two point two zero five.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Put them in order',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\opp{1}.875 \\text{ is the only number less than } 2', '2 = 2.000', '2.150 < 2.205 < 2.250'] },
        { kind: 'text', id: 'a', size: 'lg', align: 'center', md: '$1\\dfrac{7}{8}$, $\\ 2$, $\\ 2.15$, $\\ 2.205$, $\\ \\dfrac{9}{4}$' },
      ],
      lines: [
        { say: 'Step two: compare the whole-number parts. One point eight seven five is the only number with a one in the ones place. All the others have a two. So it comes first.', show: 'm.0', focus: 'm.0' },
        { say: 'Of the numbers starting with two, two point zero zero zero has nothing after the decimal point. So it comes next.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: compare the rest place by place. Two point one five zero has one tenth, and the other two have two tenths, so it is smallest. Then, in the hundredths place, zero is less than five. So two point two zero five comes before two point two five.', show: 'm.2', focus: 'm.2' },
        { say: 'Step four: write them in their original form. One and seven eighths, two, two point one five, two point two zero five, and nine quarters.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Check with a number line',
      layout: 'center',
      main: [
        line,
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with a number line', md: 'Placing the numbers on a number line is a good way to check your order. Numbers farther to the **right** are **greater**.' },
      ],
      lines: [
        { say: 'Placing the numbers on a number line is a good way to check. This one runs from one point eight to two point three.', show: ['nl.axis', 'nl.ticks'] },
        { say: 'One and seven eighths is between one point eight and two. Two sits on its mark.', show: ['nl.p0', 'nl.p1'] },
        { say: 'Then come two point one five, two point two zero five, and nine quarters, at two point two five.', show: ['nl.p2', 'nl.p3', 'nl.p4'] },
        { say: 'Reading from left to right gives the same order. Numbers farther to the right are greater.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which list is in order from **least to greatest**?',
          choices: [
            '$\\dfrac23,\\ 0.65,\\ 0.7,\\ \\dfrac34$',
            '$0.65,\\ 0.7,\\ \\dfrac23,\\ \\dfrac34$',
            '$\\dfrac34,\\ 0.7,\\ \\dfrac23,\\ 0.65$',
            '$0.65,\\ \\dfrac23,\\ 0.7,\\ \\dfrac34$',
          ],
          answer: 3,
          working: 'As decimals: $\\dfrac23 = 0.666\\ldots$ and $\\dfrac34 = 0.75$. So the order is $0.650 < 0.666\\ldots < 0.700 < 0.750$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which list is in order from least to greatest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. As decimals, two thirds is zero point six six six, and so on, and three quarters is zero point seven five. Choice C has the right order, but from greatest to least.', show: 'q.answer' },
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
            'Write every number as a decimal.',
            'Compare the whole-number parts, then the decimal parts place by place.',
            'Give the answer in the original forms, and check with a number line.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To order a set of numbers, first write every number as a decimal.', show: 'sum.0' },
        { say: 'Compare the whole-number parts first, then the decimal parts, place by place.', show: 'sum.1' },
        { say: 'Write the answer in the original forms, and check it on a number line. In the next unit, you will add, subtract, multiply and divide decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
