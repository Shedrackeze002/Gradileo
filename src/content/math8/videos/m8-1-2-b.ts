import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { tag } from './lib/m8-1-figures.ts';

// 40 is 4 of the 13 steps from 36 to 49, so √40 is about 4/13 of the way from 6 to 7.
const along = figure(
  'al',
  [
    numberLine({ name: 'sq', min: 36, max: 49, step: 1, every: 1, length: 13, points: [{ id: 'p', value: 40, tex: '', tone: 'theta' }], spans: [{ id: 'part', from: 36, to: 40, tone: 'good', label: '4 \\text{ of } 13 \\text{ steps}' }] }),
    shift(numberLine({ name: 'rt', min: 6, max: 7, step: 0.1, every: 10, length: 13, points: [{ id: 'p', value: 6 + 4 / 13, tex: '\\approx 6.31', tone: 'theta' }] }), 0, -2.6),
    tag('sq-name', [-0.7, 0], '\\text{numbers}', { place: 'left', tone: 'adj' }),
    tag('rt-name', [-0.7, -2.6], '\\text{square roots}', { place: 'left', tone: 'adj' }),
    // Room on the left for the names of the lines.
    { points: { room: [-4.2, -1.3] }, items: [] },
  ],
  300,
);

// 6.3² = 39.69 and 6.4² = 40.96: 40 is much closer to 39.69.
const check40 = figure(
  'ck',
  [
    numberLine({
      min: 39.5,
      max: 41,
      step: 0.1,
      every: 0,
      length: 12,
      points: [
        { id: 'a', value: 39.69, tex: '6.3^2 = 39.69', tone: 'adj', below: true },
        { id: 'b', value: 40.96, tex: '6.4^2 = 40.96', tone: 'adj', below: true },
        { id: 'p', value: 40, tex: '40', tone: 'theta' },
      ],
      spans: [
        { id: 'near', from: 39.69, to: 40, tone: 'good' },
        { id: 'far', from: 40, to: 40.96, tone: 'opp' },
      ],
    }),
  ],
  190,
);

// 9.4² = 88.36 and 9.5² = 90.25: 90 is much closer to 90.25.
const check90 = figure(
  'ck',
  [
    numberLine({
      min: 88,
      max: 91,
      step: 0.2,
      every: 0,
      length: 12,
      points: [
        { id: 'a', value: 88.36, tex: '9.4^2 = 88.36', tone: 'adj', below: true },
        { id: 'b', value: 90.25, tex: '9.5^2 = 90.25', tone: 'adj', below: true },
        { id: 'p', value: 90, tex: '90', tone: 'theta' },
      ],
      spans: [
        { id: 'far', from: 88.36, to: 90, tone: 'opp' },
        { id: 'near', from: 90, to: 90.25, tone: 'good' },
      ],
    }),
  ],
  190,
);

const video: Explainer = {
  id: 'm8-1-2-b',
  lessonId: 'm8-1-2',
  title: 'Estimating Square Roots, Part 2: To One Decimal Place',
  thumbnailTitle: 'To One Decimal Place',
  thumbnail: 'al',
  summary:
    'To estimate √40 to one decimal place: it is between 6 and 7, and 40 is 4 of the 13 steps from 36 to 49, so √40 is about 6 + 4/13 ≈ 6.31. Check by squaring the tenths on either side: 6.3² = 39.69 and 6.4² = 40.96, and 40 is closer to 39.69, so √40 ≈ 6.3. In the same way, √90 is about 9 + 9/19 ≈ 9.47; 9.4² = 88.36 and 9.5² = 90.25, so √90 ≈ 9.5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 2', title: 'To One Decimal Place', subtitle: 'Estimate, then check by squaring' }],
      lines: [
        { say: 'The square root of forty is between six and seven, and it is closer to six. Can we get even closer?', show: 'title' },
        { say: 'In this part, you will estimate a square root to one decimal place, and check your estimate by squaring.' },
      ],
    },
    {
      chapter: 'How far along?',
      layout: 'center',
      main: [
        along,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4}{13} \\approx 0.31, \\text{ so } \\sqrt{40} \\approx 6.31'] },
      ],
      lines: [
        { say: 'Think about how far along forty is between the two perfect squares. From thirty-six up to forty-nine is thirteen steps.', show: ['al.sq-axis', 'al.sq-name'] },
        { say: 'Forty is four of those thirteen steps along.', show: ['al.sq-part', 'al.sq-p'], focus: 'al.sq-part' },
        { say: 'So the square root of forty is about four thirteenths of the way from six to seven.', show: ['al.rt-axis', 'al.rt-name'] },
        { say: 'Four divided by thirteen is about zero point three one. So the square root of forty is about six point three one.', show: ['m', 'al.rt-p'], focus: ['m', 'al.rt-p'] },
      ],
    },
    {
      chapter: 'Check by squaring',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['6.3^2 = 6.3 \\times 6.3 = 39.69', '6.4^2 = 6.4 \\times 6.4 = 40.96'] },
        check40,
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$40$ is closer to $39.69$, so $\\sqrt{40} \\approx 6.3$.' },
      ],
      lines: [
        { say: 'Now check the tenths on either side, six point three and six point four, by squaring them.' },
        { say: 'Six point three squared is thirty-nine point six nine.', show: ['m.0', 'ck.axis', 'ck.a'], focus: ['m.0', 'ck.a'] },
        { say: 'Six point four squared is forty point nine six.', show: ['m.1', 'ck.b'], focus: ['m.1', 'ck.b'] },
        { say: 'Forty is between them, and it is much closer to thirty-nine point six nine. So, to one decimal place, the square root of forty is about six point three.', show: ['ck.p', 'ck.near', 'ck.far', 'a'], focus: 'ck.near' },
        { say: 'So each side of Amara’s garden would be about six point three metres long.' },
      ],
    },
    {
      chapter: 'Estimating the square root of 90',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Estimate $\\sqrt{90}$ to one decimal place.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['81 < 90 < 100, \\text{ so } 9 < \\sqrt{90} < 10', '\\dfrac{9}{19} \\approx 0.47, \\text{ so } \\sqrt{90} \\approx 9.47'] },
      ],
      lines: [
        { say: 'Let’s try another one. Estimate the square root of ninety to one decimal place.', show: 'q' },
        { say: 'Ninety is between eighty-one and one hundred, the perfect squares nine squared and ten squared. So its square root is between nine and ten.', show: 'm.0', focus: 'm.0' },
        { say: 'From eighty-one to one hundred is nineteen steps, and ninety is nine of them. Nine divided by nineteen is about zero point four seven, so the square root is about nine point four seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Which tenth is better?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['9.4^2 = 88.36 \\qquad 9.5^2 = 90.25'] },
        check90,
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check by squaring', md: 'The steps estimate gets you close. Squaring the tenths on either side tells you which one is better.' },
      ],
      lines: [
        { say: 'Which tenth is better, nine point four or nine point five? Square them. Nine point four squared is eighty-eight point three six. Nine point five squared is ninety point two five.', show: ['m', 'ck.axis', 'ck.a', 'ck.b'] },
        { say: 'Ninety is much closer to ninety point two five. So the square root of ninety is about nine point five, not nine point four.', show: ['ck.p', 'ck.near', 'ck.far'], focus: 'ck.near' },
        { say: 'The steps estimate gets you close. Squaring the tenths on either side tells you which one is better.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Estimate $\\sqrt{30}$ to one decimal place.',
          choices: ['$5.4$', '$5.5$', '$15$', '$6.5$'],
          answer: 1,
          working: '$25 < 30 < 36$, so $\\sqrt{30}$ is between $5$ and $6$. Check the tenths: $5.4^2 = 29.16$ and $5.5^2 = 30.25$. $30$ is closer to $30.25$, so $\\sqrt{30} \\approx 5.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Estimate the square root of thirty to one decimal place. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, five point five. Five point four squared is twenty-nine point one six, and five point five squared is thirty point two five. Thirty is closer to thirty point two five. Choice A, five point four, is the other tenth, but its square is further from thirty.', show: 'q.answer' },
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
            'Find the two perfect squares around the number: $\\sqrt{40}$ is between $6$ and $7$.',
            'Estimate how far along it is: $40$ is $4$ of the $13$ steps from $36$ to $49$.',
            'Square the tenths on either side to choose: $6.3^2 = 39.69$, so $\\sqrt{40} \\approx 6.3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, find the two perfect squares around the number.', show: 'sum.0' },
        { say: 'Then estimate how far along the number is between them.', show: 'sum.1' },
        { say: 'Finally, square the tenths on either side, and choose the one whose square is closer. In the next part, you will use square roots to solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
