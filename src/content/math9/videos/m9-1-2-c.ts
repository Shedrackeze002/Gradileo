import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { rootLines } from './lib/m9-1-figures.ts';

// Square roots from 1.2 to 1.3 come from numbers from 1.44 to 1.69; 1.5 is one of them.
const back = figure(
  'd',
  [
    rootLines({
      numbers: {
        min: 1.44,
        max: 1.69,
        step: 0.01,
        points: [
          { id: 'a', value: 1.44, tex: '1.44', tone: 'adj', below: true },
          { id: 'p', value: 1.5, tex: '1.5', tone: 'good', below: true },
          { id: 'b', value: 1.69, tex: '1.69', tone: 'adj', below: true },
        ],
        spans: [{ id: 'ok', from: 1.44, to: 1.69, tone: 'good', label: '\\text{any number here}' }],
      },
      roots: {
        min: 1.2,
        max: 1.3,
        step: 0.01,
        points: [
          { id: 'a', value: 1.2, tex: '1.2', tone: 'adj', below: true },
          { id: 'p', value: Math.sqrt(1.5), tex: '\\sqrt{1.5} \\approx 1.22', tone: 'good', below: true },
          { id: 'b', value: 1.3, tex: '1.3', tone: 'adj', below: true },
        ],
      },
      links: [
        { id: 'la', from: 1.44, to: 1.2, up: true },
        { id: 'lb', from: 1.69, to: 1.3, up: true },
        { id: 'lp', from: 1.5, to: Math.sqrt(1.5) },
      ],
      names: ['\\text{numbers}', '\\text{square roots}'],
    }),
  ],
  340,
);

// 1.25 is between 1.2 and 1.3, but not between 1.44 and 1.69.
const trap = figure(
  'nl',
  [
    numberLine({
      min: 1.1,
      max: 1.8,
      step: 0.05,
      every: 2,
      length: 14,
      points: [
        { id: 'bad', value: 1.25, tex: '1.25', tone: 'bad' },
        { id: 'good', value: 1.5, tex: '1.5', tone: 'good' },
      ],
      spans: [{ id: 'ok', from: 1.44, to: 1.69, tone: 'good' }],
    }),
  ],
  190,
);

const video: Explainer = {
  id: 'm9-1-2-c',
  lessonId: 'm9-1-2',
  title: 'Square Roots of Non-Perfect Squares, Part 3: Working Backwards',
  thumbnailTitle: 'Working Backwards',
  thumbnail: 'd',
  summary:
    'To find a number whose square root is between two values, square both values: any number between the squares works. 1.2² = 1.44 and 1.3² = 1.69, so 1.5 works (√1.5 ≈ 1.22). 1.25 is between 1.2 and 1.3, but √1.25 ≈ 1.12: the number must be between the squares, not between the values. In the same way, a number with a square root between 0.4 and 0.5 lies between 0.16 and 0.25.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 3', title: 'Working Backwards', subtitle: 'From a square root back to the number' }],
      lines: [
        { say: 'So far, you have started with a number and found its square root. Now let’s go the other way.', show: 'title' },
        { say: 'In this part, you will find a number whose square root is between two given values. The key is to square.' },
      ],
    },
    {
      chapter: 'Square both values',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find a number whose square root is between $1.2$ and $1.3$.' },
        back,
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.2^2 = 1.44 \\qquad 1.3^2 = 1.69', '1.44 < 1.5 < 1.69, \\text{ so } 1.2 < \\sqrt{1.5} < 1.3'] },
      ],
      lines: [
        { say: 'Find a number whose square root is between one point two and one point three.', show: ['q', 'd.r-axis', 'd.r-a', 'd.r-b', 'd.names'] },
        { say: 'Square both values. One point two squared is one point four four, and one point three squared is one point six nine.', show: ['m.0', 'd.n-axis', 'd.n-a', 'd.n-b', 'd.la', 'd.lb'], focus: 'm.0' },
        { say: 'Any number between one point four four and one point six nine has a square root between one point two and one point three.', show: 'd.n-ok', focus: 'd.n-ok' },
        { say: 'Choose one, such as one point five. Its square root is about one point two two, which is between one point two and one point three. It works.', show: ['d.n-p', 'd.lp', 'd.r-p', 'm.1'], focus: ['d.r-p', 'm.1'] },
      ],
    },
    {
      chapter: 'Between the squares',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Choosing a number between the values', md: '$1.25$ is between $1.2$ and $1.3$, but $\\sqrt{1.25} \\approx 1.12$. The number itself must be between the **squares**, $1.44$ and $1.69$.' },
        trap,
      ],
      lines: [
        { say: 'Here is a common mistake. One point two five is between one point two and one point three, so it is tempting to choose it.', show: 'oops' },
        { say: 'But the square root of one point two five is only about one point one two. That is not between one point two and one point three.', show: ['nl.axis', 'nl.bad'], focus: 'nl.bad' },
        { say: 'The number itself must be between the squares, one point four four and one point six nine. One point two five is outside that stretch, and one point five is inside it.', show: ['nl.ok', 'nl.good'], focus: 'nl.ok' },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find a number whose square root is between $0.4$ and $0.5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.4^2 = 0.16 \\qquad 0.5^2 = 0.25', '0.16 < 0.2 < 0.25', '\\sqrt{0.2} \\approx 0.45 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Let’s try one more. Find a number whose square root is between zero point four and zero point five.', show: 'q' },
        { say: 'Square both values. Zero point four squared is zero point one six, and zero point five squared is zero point two five.', show: 'm.0', focus: 'm.0' },
        { say: 'Choose any number between them, such as zero point two.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with a calculator. The square root of zero point two is about zero point four five, which is between zero point four and zero point five.', show: 'm.2', focus: 'm.2' },
        { say: 'Notice that zero point two is less than zero point four. For numbers between zero and one, the number is smaller than its square root.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number has a square root between $2.1$ and $2.2$?',
          choices: ['$4.6$', '$2.15$', '$4.3$', '$4.9$'],
          answer: 0,
          working: '$2.1^2 = 4.41$ and $2.2^2 = 4.84$. Only $4.6$ is between $4.41$ and $4.84$: $\\sqrt{4.6} \\approx 2.14$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number has a square root between two point one and two point two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four point six. Two point one squared is four point four one, and two point two squared is four point eight four, and four point six is between them. Choice B, two point one five, is between the two values themselves, but its square root is only about one point four seven.', show: 'q.answer' },
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
            'To find a number whose square root is between two values, **square** both values.',
            'Any number between the squares works: $1.44 < 1.5 < 1.69$, so $1.2 < \\sqrt{1.5} < 1.3$.',
            'The number must be between the squares, not between the values: $\\sqrt{1.25} \\approx 1.12$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a number whose square root is between two values, square both values.', show: 'sum.0' },
        { say: 'Any number between the two squares works. One point five works for one point two and one point three.', show: 'sum.1' },
        { say: 'The number must be between the squares, not between the values. In the next lesson, you will find the surface area of objects made of simpler solids. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
