import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { rootLines } from './lib/m9-1-figures.ts';

// 0.55 is 0.06 above 0.49 and 0.09 below 0.64, so √0.55 is a little less than half way from 0.7 to 0.8.
const lines55 = figure(
  'd',
  [
    rootLines({
      numbers: {
        min: 0.49,
        max: 0.64,
        step: 0.01,
        points: [
          { id: 'a', value: 0.49, tex: '0.49', tone: 'adj', below: true },
          { id: 'p', value: 0.55, tex: '0.55', tone: 'theta', below: true },
          { id: 'b', value: 0.64, tex: '0.64', tone: 'adj', below: true },
        ],
        spans: [
          { id: 'near', from: 0.49, to: 0.55, tone: 'good', label: '0.06' },
          { id: 'far', from: 0.55, to: 0.64, tone: 'opp', label: '0.09' },
        ],
      },
      roots: {
        min: 0.7,
        max: 0.8,
        step: 0.01,
        points: [
          { id: 'a', value: 0.7, tex: '0.7', tone: 'adj', below: true },
          { id: 'p', value: 0.74, tex: '\\sqrt{0.55} \\approx 0.74', tone: 'theta', below: true },
          { id: 'b', value: 0.8, tex: '0.8', tone: 'adj', below: true },
        ],
      },
      links: [
        { id: 'la', from: 0.49, to: 0.7 },
        { id: 'lb', from: 0.64, to: 0.8 },
        { id: 'lp', from: 0.55, to: 0.74 },
      ],
      names: ['\\text{numbers}', '\\text{square roots}'],
    }),
  ],
  340,
);

// 52.4 is just past 49, so √52.4 is just past 7.
const lines524 = figure(
  'd',
  [
    rootLines({
      numbers: {
        min: 49,
        max: 64,
        step: 1,
        points: [
          { id: 'a', value: 49, tex: '49', tone: 'adj', below: true },
          { id: 'p', value: 52.4, tex: '52.4', tone: 'theta', below: true },
          { id: 'b', value: 64, tex: '64', tone: 'adj', below: true },
        ],
      },
      roots: {
        min: 7,
        max: 8,
        step: 0.1,
        points: [
          { id: 'a', value: 7, tex: '7', tone: 'adj', below: true },
          { id: 'p', value: 7.2, tex: '\\approx 7.2', tone: 'theta', below: true },
          { id: 'b', value: 8, tex: '8', tone: 'adj', below: true },
        ],
      },
      links: [
        { id: 'la', from: 49, to: 7 },
        { id: 'lb', from: 64, to: 8 },
        { id: 'lp', from: 52.4, to: 7.2 },
      ],
      names: ['\\text{numbers}', '\\text{square roots}'],
    }),
  ],
  320,
);

// Between 0 and 1, each square root is to the right of its number: √0.09 = 0.3 and √0.49 = 0.7.
const bigger = figure(
  'nl',
  [
    numberLine({
      min: 0,
      max: 1,
      step: 0.1,
      length: 14,
      points: [
        { id: 'a', value: 0.09, tex: '0.09', tone: 'adj' },
        { id: 'ra', value: 0.3, tex: '\\sqrt{0.09}', tone: 'theta' },
        { id: 'b', value: 0.49, tex: '0.49', tone: 'adj' },
        { id: 'rb', value: 0.7, tex: '\\sqrt{0.49}', tone: 'theta' },
      ],
    }),
  ],
  200,
);

const video: Explainer = {
  id: 'm9-1-2',
  lessonId: 'm9-1-2',
  title: 'Square Roots of Non-Perfect Squares, Part 1: Estimating with Benchmarks',
  thumbnailTitle: 'Estimating with Benchmarks',
  thumbnail: 'd',
  summary:
    'A non-perfect square, such as 0.55, has a square root that can only be estimated or rounded. Trap it between benchmarks: 0.7² = 0.49 and 0.8² = 0.64, so √0.55 is between 0.7 and 0.8, closer to 0.7, and 0.74² = 0.5476 gives √0.55 ≈ 0.74. In the same way √52.4 is between 7 and 8, about 7.2. Halving is not square rooting: for a number between 0 and 1, the square root is larger than the number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 1', title: 'Estimating with Benchmarks', subtitle: 'Trapping a square root between two numbers' }],
      lines: [
        { say: 'A square room has an area of twelve point five square metres. It still has a side length, but that length is not a tidy decimal.', show: 'title' },
        { say: 'Most numbers are not perfect squares. In this lesson, you will estimate their square roots, and then find them more closely with a calculator. This first part shows how to estimate with benchmarks.' },
      ],
    },
    {
      chapter: 'Non-perfect squares',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Non-perfect square', md: 'A **non-perfect square** is a number whose square root is not an exact fraction or decimal, such as $0.55$ or $\\tfrac{2}{3}$. Its square root can only be estimated or rounded.' },
        { kind: 'callout', id: 'bench', tone: 'definition', title: 'Benchmark', md: 'A **benchmark** is a nearby perfect square that you know well. Benchmarks on each side of a number trap its square root between two values.' },
      ],
      lines: [
        { say: 'A non-perfect square is a number whose square root is not an exact fraction or decimal. Zero point five five and two thirds are non-perfect squares.', show: 'def' },
        { say: 'No decimal times itself gives exactly zero point five five, however many decimal places you use. So its square root can only be estimated, or rounded.' },
        { say: 'To estimate, use benchmarks. A benchmark is a nearby perfect square that you know well.', show: 'bench' },
        { say: 'Find one benchmark just below the number and one just above it. Together, they trap the square root between two values.' },
      ],
    },
    {
      chapter: 'Between 0.7 and 0.8',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Estimate $\\sqrt{0.55}$ to two decimal places, without a calculator.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.7^2 = 0.49 \\qquad 0.8^2 = 0.64', '0.49 < 0.55 < 0.64', '0.7 < \\sqrt{0.55} < 0.8'] },
      ],
      lines: [
        { say: 'Estimate the square root of zero point five five to two decimal places, without a calculator.', show: 'q' },
        { say: 'Think of decimal perfect squares near zero point five five. Zero point seven squared is zero point four nine, and zero point eight squared is zero point six four.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point five five is between zero point four nine and zero point six four. Those are our benchmarks.', show: 'm.1', focus: 'm.1' },
        { say: 'So the square root of zero point five five is between their square roots: between zero point seven and zero point eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Closer to 0.7',
      layout: 'center',
      main: [lines55, { kind: 'math', id: 'm', size: 'lg', lines: ['0.74^2 = 0.5476 \\approx 0.55', '\\sqrt{0.55} \\approx 0.74'] }],
      lines: [
        { say: 'Which is it closer to? Put the numbers on one line, and their square roots on a line below.', show: ['d.n-axis', 'd.r-axis', 'd.names', 'd.n-a', 'd.n-b', 'd.r-a', 'd.r-b', 'd.la', 'd.lb', 'd.n-p'] },
        { say: 'Zero point five five is zero point zero six above zero point four nine, and zero point zero nine below zero point six four.', show: ['d.n-near', 'd.n-far'], focus: ['d.n-near', 'd.n-far'] },
        { say: 'It is a little closer to zero point four nine. So its square root is a little closer to zero point seven, a bit less than half way to zero point eight.', show: ['d.lp', 'd.r-p'], focus: 'd.r-p' },
        { say: 'Try zero point seven four. Zero point seven four squared is zero point five four seven six, which is very close to zero point five five.', show: 'm.0', focus: 'm.0' },
        { say: 'So the square root of zero point five five is about zero point seven four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A larger decimal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Between which two whole numbers is $\\sqrt{52.4}$? Estimate it to one decimal place.' },
        lines524,
        { kind: 'math', id: 'm', size: 'lg', lines: ['7^2 = 49 \\qquad 8^2 = 64 \\qquad 7 < \\sqrt{52.4} < 8', '\\text{Check: } 7.2^2 = 51.84 \\qquad \\sqrt{52.4} \\approx 7.2'] },
      ],
      lines: [
        { say: 'Benchmarks work for larger numbers as well. Between which two whole numbers is the square root of fifty-two point four? Estimate it to one decimal place.', show: 'q' },
        { say: 'Seven squared is forty-nine, and eight squared is sixty-four. Fifty-two point four is between them, so its square root is between seven and eight.', show: ['m.0', 'd.n-axis', 'd.r-axis', 'd.names', 'd.n-a', 'd.n-b', 'd.r-a', 'd.r-b', 'd.la', 'd.lb', 'd.n-p'], focus: 'm.0' },
        { say: 'Fifty-two point four is much closer to forty-nine than to sixty-four. So its square root is a little more than seven.', show: ['d.lp', 'd.r-p'], focus: 'd.r-p' },
        { say: 'Check seven point two. Seven point two squared is fifty-one point eight four, which is close to fifty-two point four. So the square root is about seven point two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Halving is not square rooting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Halving is not square rooting', md: '$\\sqrt{0.5}$ is **not** $0.25$: $0.25^2 = 0.0625$. For a number between $0$ and $1$, the square root is **larger** than the number, because $0.7 \\times 0.7 = 0.49$.' },
        bigger,
      ],
      lines: [
        { say: 'Here is a common mistake. Some people divide by two and say that the square root of zero point five is zero point two five.', show: 'oops' },
        { say: 'Check by squaring. Zero point two five times zero point two five is zero point zero six two five, which is far too small.' },
        { say: 'Between zero and one, a square root is larger than the number itself. Zero point three squared is zero point zero nine, so the square root of zero point zero nine is zero point three.', show: ['nl.axis', 'nl.a', 'nl.ra'], focus: 'nl.ra' },
        { say: 'And the square root of zero point four nine is zero point seven. Each square root sits to the right of its number. So the square root of zero point five is a little more than zero point seven.', show: ['nl.b', 'nl.rb'], focus: 'nl.rb' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the best estimate of $\\sqrt{0.2}$?',
          choices: ['$0.1$', '$0.04$', '$0.02$', '$0.45$'],
          answer: 3,
          working: '$0.4^2 = 0.16$ and $0.5^2 = 0.25$, so $\\sqrt{0.2}$ is between $0.4$ and $0.5$. Check: $0.45^2 = 0.2025$, close to $0.2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best estimate of the square root of zero point two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, zero point four five. Zero point four squared is zero point one six, and zero point five squared is zero point two five, so the root is between zero point four and zero point five. Choice A, zero point one, is half of zero point two, and halving is not square rooting.', show: 'q.answer' },
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
            'A **non-perfect square** has a square root that can only be estimated or rounded.',
            'Trap it between benchmarks: $0.49 < 0.55 < 0.64$, so $0.7 < \\sqrt{0.55} < 0.8$.',
            'See which benchmark is closer, then check a guess by squaring: $\\sqrt{0.55} \\approx 0.74$.',
            'Between $0$ and $1$, a square root is larger than the number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A non-perfect square has a square root that can only be estimated or rounded.', show: 'sum.0' },
        { say: 'Trap the square root between benchmarks, the perfect squares just below and just above the number.', show: 'sum.1' },
        { say: 'See which benchmark is closer, then check your guess by squaring it.', show: 'sum.2' },
        { say: 'And between zero and one, a square root is larger than the number. In the next part, you will use a calculator to find square roots to the nearest hundredth. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
