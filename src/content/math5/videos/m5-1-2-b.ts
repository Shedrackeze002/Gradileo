import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { hops, link, xOf } from './lib/m5-1-figures.ts';

// From 3.4 to 3.5 in jumps of one hundredth: 3.47 is seven jumps after 3.4.
const line = figure('nl', [
  numberLine({
    min: 3.4,
    max: 3.5,
    step: 0.01,
    every: 10,
    length: 14,
    points: [
      { id: 'p42', value: 3.42, tex: '3.42', tone: 'adj', below: true },
      { id: 'p47', value: 3.47, tex: '3.47', tone: 'theta', below: true },
    ],
  }),
  hops({ min: 3.4, max: 3.5, length: 14, from: 3.4, step: 0.01, count: 7 }),
]);

// 2.4 to 2.5, with 2.45 between them.
const between = figure('bt', [numberLine({ min: 2.4, max: 2.5, step: 0.01, every: 10, length: 14, points: [{ id: 'p', value: 2.45, tex: '2.45', tone: 'good' }] })], 200);

// Zooming in: the stretch from 2.41 to 2.42 on the top line, drawn again below in thousandths.
const TOP = 3.4;
const zoom = figure('zm', [
  numberLine({ name: 't', min: 2.4, max: 2.5, step: 0.01, every: 10, length: 12, at: [0, TOP], spans: [{ id: 'z', from: 2.41, to: 2.42, tone: 'theta' }] }),
  numberLine({
    name: 'b',
    min: 2.41,
    max: 2.42,
    step: 0.001,
    every: 10,
    length: 12,
    points: [
      { id: 'p1', value: 2.411, tex: '2.411', tone: 'good' },
      { id: 'p2', value: 2.412, tex: '2.412', tone: 'good', below: true },
    ],
  }),
  link({ id: 'l1', from: [xOf(2.41, 2.4, 2.5), TOP - 0.3], to: [0, 0.35], group: 'links' }),
  link({ id: 'l2', from: [xOf(2.42, 2.4, 2.5), TOP - 0.3], to: [12, 0.35], group: 'links' }),
]);

const video: Explainer = {
  id: 'm5-1-2-b',
  lessonId: 'm5-1-2',
  title: 'Comparing, Ordering and Rounding, Part 2: Decimals on a Number Line',
  thumbnailTitle: 'Decimals on a Number Line',
  thumbnail: 'nl',
  summary: 'Placing decimals on a number line from 3.4 to 3.5 in jumps of one hundredth, what “between” means, finding a decimal between 2.4 and 2.5, and zooming in to see that there is always another decimal between two decimals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 2', title: 'Decimals on a Number Line', subtitle: 'There is always another decimal in between' }],
      lines: [
        { say: 'Where does 3.47 sit on a number line? And how many decimals fit between 2.4 and 2.5? The answer might surprise you!', show: 'title' },
        { say: 'In this video, you will place decimals on a number line, and find decimals between two numbers.' },
      ],
    },
    {
      chapter: 'Jumps of one hundredth',
      layout: 'center',
      main: [line, { kind: 'callout', id: 'key', tone: 'key', title: 'On a number line', md: 'Numbers get **greater** as you move to the **right**.' }],
      lines: [
        { say: 'On a number line, numbers get greater as you move to the right. This line goes from 3.4 to 3.5.', show: ['nl.axis', 'key'] },
        { say: 'From 3.4 to 3.5, there are ten equal jumps. Each jump is one hundredth, 0.01.' },
        { say: 'To find 3.47, start at 3.4 and count seven jumps: 3.41, 3.42, 3.43, 3.44, 3.45, 3.46, 3.47.', show: ['nl.hops', 'nl.p47'], focus: 'nl.p47' },
        { say: '3.42 is only two jumps after 3.4. It is further to the left, so 3.42 is less than 3.47.', show: 'nl.p42', focus: 'nl.p42' },
      ],
    },
    {
      chapter: 'Between',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Between', md: 'A number is **between** two numbers when it is greater than one and less than the other. $3.47$ is between $3.4$ and $3.5$.' }],
      lines: [
        { say: 'We say that 3.47 is between 3.4 and 3.5.', show: 'def' },
        { say: 'A number is between two numbers when it is greater than one of them, and less than the other. 3.47 is greater than 3.4, and it is less than 3.5.' },
      ],
    },
    {
      chapter: 'A decimal in between',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2.4 \\;\\text{and}\\; 2.5', '2.4\\thc{0} \\;\\text{and}\\; 2.5\\thc{0}', '2.41,\\; 2.42,\\; \\ldots,\\; 2.49'] }, between],
      lines: [
        { say: 'Find a decimal between 2.4 and 2.5. At first, it looks like there is nothing in between them!', show: 'm.0' },
        { say: 'Add a zero to each number: 2.40 and 2.50. The zeros do not change the values, but now you can see the hundredths in between.', show: 'm.1', focus: 'm.1' },
        { say: 'Between them are 2.41, 2.42, and so on, all the way up to 2.49.', show: 'm.2', focus: 'm.2' },
        { say: 'So 2.45 is one answer. It sits right in the middle. 2.41 or 2.48 would work as well.', show: ['bt.axis', 'bt.p'], focus: 'bt.p' },
      ],
    },
    {
      chapter: 'Zooming in',
      layout: 'center',
      main: [zoom, { kind: 'callout', id: 'key', tone: 'key', title: 'It never ends', md: 'There is always another decimal between two decimals.' }],
      lines: [
        { say: 'Can we keep going? Let’s zoom in on the stretch from 2.41 to 2.42.', show: ['zm.t-axis', 'zm.t-z'], focus: 'zm.t-z' },
        { say: 'Add another zero to each number: 2.410 and 2.420. Between them are 2.411, 2.412, and so on, all in thousandths.', show: ['zm.links', 'zm.b-axis', 'zm.b-p1', 'zm.b-p2'], focus: ['zm.b-p1', 'zm.b-p2'] },
        { say: 'And we could zoom in again, and again, forever. There is always another decimal between two decimals. It never ends!', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is between $5.6$ and $5.7$?',
          choices: ['$5.07$', '$5.75$', '$6.5$', '$5.63$'],
          answer: 3,
          working: 'Write the numbers as $5.60$ and $5.70$. Any number from $5.61$ to $5.69$ is between them, so $5.63$ is.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is between 5.6 and 5.7? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Write the numbers as 5.60 and 5.70. Any number from 5.61 to 5.69 is between them, so 5.63 is. Choice A, 5.07, has zero tenths, so it is less than 5.6.', show: 'q.answer' },
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
          items: ['Numbers get greater as you move right on a number line.', 'A number between two numbers is greater than one and less than the other.', 'Add zeros to see the decimals in between. There is always another one.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a number line, numbers get greater as you move to the right.', show: 'sum.0' },
        { say: 'A number between two numbers is greater than one and less than the other.', show: 'sum.1' },
        { say: 'And to find a decimal in between, add zeros to see the smaller places. There is always another decimal in between. In the next part, we put numbers in order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
