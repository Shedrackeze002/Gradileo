import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { hops } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { note, vertical, xAt } from './lib/m6-1-figures.ts';

// A horizontal number line from −6 to 6, zero in the middle: negatives to the left, positives to the right.
const across = figure(
  'nl',
  [
    numberLine({
      min: -6,
      max: 6,
      step: 1,
      spans: [
        { id: 'neg', from: -6, to: 0, tone: 'adj', label: '\\text{negative}' },
        { id: 'pos', from: 0, to: 6, tone: 'opp', label: '\\text{positive}' },
      ],
    }),
  ],
  300,
);

// −4 and 4: four steps left of zero, and four steps right.
const plot = figure(
  'pl',
  [
    numberLine({
      min: -6,
      max: 6,
      step: 1,
      points: [
        { id: 'zero', value: 0, tex: '', tone: 'ink' },
        { id: 'm4', value: -4, tex: '', tone: 'adj' },
        { id: 'p4', value: 4, tex: '', tone: 'opp' },
      ],
    }),
    hops({ name: 'left', min: -6, max: 6, from: -4, step: 1, count: 4, tone: 'adj' }),
    hops({ name: 'right', min: -6, max: 6, from: 0, step: 1, count: 4, tone: 'opp' }),
    note({ id: 'lnote', at: [xAt(-2, -6, 6), 1.55], tex: '4\\text{ steps left}', tone: 'adj' }),
    note({ id: 'rnote', at: [xAt(2, -6, 6), 1.55], tex: '4\\text{ steps right}', tone: 'opp' }),
  ],
  320,
);

// A plain vertical number line, then a thermometer showing −6 at 7 a.m.
const upright = figure(
  'up',
  [
    vertical({
      min: -5,
      max: 5,
      unit: 0.55,
      points: [
        { id: 'p3', value: 3, tex: '3\\text{ is above } 0', tone: 'opp' },
        { id: 'm3', value: -3, tex: '{-3}\\text{ is below } 0', tone: 'adj' },
      ],
      room: 4.5,
    }),
  ],
  540,
);

const thermo = figure(
  'th',
  [
    vertical({
      tube: true,
      min: -10,
      max: 10,
      every: 2,
      unit: 0.3,
      fills: [{ id: 'fill', value: -6, tone: 'bad' }],
      moves: [{ id: 'down', from: 0, to: -6, label: '6\\text{ marks down}', tone: 'theta', x: 1.1 }],
      room: 4.6,
    }),
  ],
  560,
);

const video: Explainer = {
  id: 'm6-1-1-b',
  lessonId: 'm6-1-1',
  title: 'Negative Numbers and Magnitude, Part 2: Horizontal and Vertical Number Lines',
  thumbnailTitle: 'Number Lines with Negatives',
  thumbnail: 'pl',
  summary: 'On a horizontal number line, negative numbers are to the left of zero and positive numbers to the right; on a vertical number line, such as a thermometer, they are below and above zero. Plotting −4 and 4, and reading a thermometer that shows −6 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 2', title: 'Horizontal and Vertical Number Lines', subtitle: 'Zero in the middle' }],
      lines: [
        { say: 'A number line is a picture of numbers in order. Once we have negative numbers, the number line needs room on both sides of zero.', show: 'title' },
        { say: 'In this video, you will see where positive and negative numbers go on a number line that goes across, and on one that stands up, like a thermometer.' },
      ],
    },
    {
      chapter: 'Zero in the middle',
      layout: 'center',
      main: [
        across,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Horizontal number line', md: 'Positive numbers are to the **right** of $0$. Negative numbers are to the **left** of $0$.' },
      ],
      lines: [
        { say: 'Here is a number line that goes across, from side to side. We call it a horizontal number line. Zero sits in the middle.', show: 'nl.axis' },
        { say: 'The positive numbers are to the right of zero: one, two, three, and so on.', show: 'nl.pos', focus: 'nl.pos' },
        { say: 'The negative numbers are to the left of zero: negative one, negative two, negative three, and so on. Each step to the left takes you one more below zero.', show: 'nl.neg', focus: 'nl.neg' },
        { say: 'So positive numbers are to the right of zero, and negative numbers are to the left.', show: 'key', focus: 'nl' },
      ],
    },
    {
      chapter: 'Plotting points',
      layout: 'center',
      main: [plot, { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{-4} \\qquad \\opp{4}'] }],
      lines: [
        { say: 'Let’s put two numbers on the line. Every count starts at zero.', show: ['pl.axis', 'pl.zero'], focus: 'pl.zero' },
        { say: 'To show negative four, start at zero and take four steps to the left. One, two, three, four. Put a dot there.', show: ['pl.left-hops', 'pl.lnote', 'pl.m4', 'm.0'], focus: ['pl.m4', 'pl.left-hops'] },
        { say: 'To show four, start at zero and take four steps to the right. Put a dot there.', show: ['pl.right-hops', 'pl.rnote', 'pl.p4'], focus: ['pl.p4', 'pl.right-hops'] },
        { say: 'Negative four and four are on opposite sides of zero. The negative sign tells us to go left.', focus: ['pl.m4', 'pl.p4', 'm.0'] },
      ],
    },
    {
      chapter: 'Standing up',
      layout: 'split',
      leftWidth: 460,
      left: [upright],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Vertical number line', md: 'Positive numbers are **above** $0$. Negative numbers are **below** $0$.' }],
      lines: [
        { say: 'A number line can also stand up, going up and down. We call this a vertical number line.', show: 'up.axis' },
        { say: 'On a vertical number line, positive numbers are above zero. Three is three steps up from zero.', show: 'up.p3', focus: 'up.p3' },
        { say: 'Negative numbers are below zero. Negative three is three steps down from zero.', show: 'up.m3', focus: 'up.m3' },
        { say: 'Turn a horizontal number line a quarter turn, and you get a vertical one. Right becomes up, and left becomes down.', show: 'key' },
      ],
    },
    {
      chapter: 'Reading a thermometer',
      layout: 'split',
      leftWidth: 480,
      left: [thermo],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The thermometer shows the temperature at 7 a.m. on a winter morning. What is the temperature?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{below } 0 \\Rightarrow \\text{negative}', '6 \\text{ marks below } 0', '{-6}^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'A thermometer is a vertical number line. This one shows the temperature at seven in the morning on a winter day. What is the temperature?', show: ['q', 'th.axis', 'th.fill'] },
        { say: 'First, find zero. The top of the coloured column is below zero, so the temperature is negative.', show: 'm.0', focus: ['th.num10', 'm.0'] },
        { say: 'Next, count the marks down from zero. Each mark is one degree. One, two, three, four, five, six. The column stops six marks below zero.', show: ['th.down', 'm.1'], focus: ['th.down', 'm.1'] },
        { say: 'So the temperature is negative six degrees Celsius. That is a chilly morning!', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a vertical number line, a point is $9$ units **below** $0$. Which number is it?',
          choices: ['$9$', '$-1$', '$+9$', '$-9$'],
          answer: 3,
          working: 'Below $0$ means negative, and the point is $9$ units from $0$. So it is $-9$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a vertical number line, a point is nine units below zero. Which number is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative nine. Below zero means negative, and the point is nine units from zero. Choice A forgets the negative sign, so it would be nine units above zero.', show: 'q.answer' },
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
            'On a **horizontal** number line, negative numbers are to the left of $0$ and positive numbers to the right.',
            'On a **vertical** number line, negative numbers are below $0$ and positive numbers above.',
            'A thermometer is a vertical number line.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a horizontal number line, negative numbers are to the left of zero, and positive numbers are to the right.', show: 'sum.0' },
        { say: 'On a vertical number line, negative numbers are below zero, and positive numbers are above.', show: 'sum.1' },
        { say: 'And a thermometer is a vertical number line. In the next part, we measure how far a number is from zero. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
