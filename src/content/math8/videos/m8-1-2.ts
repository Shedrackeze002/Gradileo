import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// √36 = 6 and √49 = 7, with √40 a little past 6.
const roots = figure(
  'nl',
  [
    numberLine({
      min: 5,
      max: 8,
      step: 0.5,
      every: 2,
      length: 12,
      points: [
        { id: 'p36', value: 6, tex: '\\sqrt{36}', tone: 'adj' },
        { id: 'p40', value: Math.sqrt(40), tex: '\\sqrt{40}', tone: 'theta' },
        { id: 'p49', value: 7, tex: '\\sqrt{49}', tone: 'adj' },
      ],
    }),
  ],
  200,
);

// From 36 to 49: 40 is 4 steps past 36 and 9 steps short of 49.
const steps = figure(
  'st',
  [
    numberLine({
      min: 36,
      max: 49,
      step: 1,
      every: 1,
      length: 13,
      points: [{ id: 'p', value: 40, tex: '40', tone: 'theta' }],
      spans: [
        { id: 'near', from: 36, to: 40, tone: 'good', label: '4' },
        { id: 'far', from: 40, to: 49, tone: 'opp', label: '9' },
      ],
    }),
  ],
  200,
);

const video: Explainer = {
  id: 'm8-1-2',
  lessonId: 'm8-1-2',
  title: 'Estimating Square Roots, Part 1: Between Two Whole Numbers',
  thumbnailTitle: 'Between Two Whole Numbers',
  thumbnail: 'nl',
  summary:
    'A non-perfect square, like 40, has a square root that is not a whole number. Use the perfect squares just below and just above it as benchmarks: 36 < 40 < 49, so √40 is between √36 = 6 and √49 = 7. 40 is 4 more than 36 and 9 less than 49, so √40 is closer to 6. √40 is not 20: 20 × 20 = 400.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 1', title: 'Between Two Whole Numbers', subtitle: 'Estimating square roots' }],
      lines: [
        { say: 'Amara wants a square garden with an area of forty square metres. How long is each side? No whole number times itself makes forty, so the answer is not a whole number.', show: 'title' },
        { say: 'In this lesson, you will estimate square roots like this one without a calculator. This first part finds the two whole numbers that a square root is between.' },
      ],
    },
    {
      chapter: 'Non-perfect squares',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Non-perfect square', md: 'A **non-perfect square** is a whole number that is not a perfect square, like $2$, $40$ or $90$. Its square root is not a whole number.' },
        { kind: 'callout', id: 'bench', tone: 'definition', title: 'Benchmark', md: 'A **benchmark** is a number you know well that helps you estimate. To estimate a square root, use the perfect squares just **below** and just **above** the number.' },
      ],
      lines: [
        { say: 'Most whole numbers are not perfect squares. A number like two, forty or ninety is called a non-perfect square. Its square root is not a whole number.', show: 'def' },
        { say: 'In fact, its square root is a decimal that goes on and on, with no repeating pattern. But you can still estimate it.' },
        { say: 'To estimate, we use benchmarks. A benchmark is a number you know well that helps you estimate.', show: 'bench' },
        { say: 'For a square root, the benchmarks are the perfect squares just below and just above the number.' },
      ],
    },
    {
      chapter: 'Between 6 and 7',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Between which two consecutive whole numbers is $\\sqrt{40}$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['36 < 40 < 49', '\\sqrt{36} < \\sqrt{40} < \\sqrt{49}', '6 < \\sqrt{40} < 7'] },
        roots,
      ],
      lines: [
        { say: 'Between which two consecutive whole numbers is the square root of forty? Consecutive means next to each other, like six and seven.', show: 'q' },
        { say: 'The perfect square just below forty is thirty-six, which is six squared. The perfect square just above forty is forty-nine, which is seven squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Forty is between thirty-six and forty-nine. So its square root is between the square root of thirty-six and the square root of forty-nine.', show: 'm.1', focus: 'm.1' },
        { say: 'The square root of thirty-six is six, and the square root of forty-nine is seven. So the square root of forty is between six and seven.', show: ['m.2', 'nl.axis', 'nl.p36', 'nl.p49'], focus: 'm.2' },
        { say: 'On a number line, it sits a little past six.', show: 'nl.p40', focus: 'nl.p40' },
      ],
    },
    {
      chapter: 'Not half the number',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A square root is not half the number', md: '$\\sqrt{40}$ is not $20$. Check: $20 \\times 20 = 400$, which is far from $40$. Always look for the perfect squares near the number.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. The square root of forty is not twenty.', show: 'oops' },
        { say: 'Check by multiplying. Twenty times twenty is four hundred, which is far from forty.' },
        { say: 'Dividing by two never finds a square root. Always look for the perfect squares near the number.' },
      ],
    },
    {
      chapter: 'Closer to 6 or to 7?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Is $\\sqrt{40}$ closer to $6$ or to $7$?' },
        steps,
        { kind: 'math', id: 'm', size: 'lg', lines: ['40 - 36 = 4 \\qquad 49 - 40 = 9'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$40$ is closer to $36$, so $\\sqrt{40}$ is closer to $6$.' },
      ],
      lines: [
        { say: 'Is the square root of forty closer to six or to seven? Look at how far forty is from each benchmark.', show: ['q', 'st.axis', 'st.p'] },
        { say: 'Forty is four more than thirty-six.', show: 'st.near', focus: 'st.near' },
        { say: 'And it is nine less than forty-nine.', show: ['st.far', 'm'], focus: 'st.far' },
        { say: 'Forty is much closer to thirty-six than to forty-nine. So the square root of forty is closer to six than to seven.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Between which two consecutive whole numbers is $\\sqrt{70}$?',
          choices: ['$7$ and $8$', '$34$ and $36$', '$6$ and $7$', '$8$ and $9$'],
          answer: 3,
          working: '$64 < 70 < 81$, so $\\sqrt{64} < \\sqrt{70} < \\sqrt{81}$, which means $8 < \\sqrt{70} < 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Between which two consecutive whole numbers is the square root of seventy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eight and nine. Sixty-four is eight squared and eighty-one is nine squared, and seventy is between them. Choice B, thirty-four and thirty-six, is around seventy divided by two, and a square root is not half the number.', show: 'q.answer' },
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
            'The square root of a **non-perfect square** is not a whole number.',
            'Use the perfect squares just below and just above the number as benchmarks: $6 < \\sqrt{40} < 7$.',
            'Compare the distances to find the closer whole number: $\\sqrt{40}$ is closer to $6$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The square root of a non-perfect square is not a whole number, but you can estimate it.', show: 'sum.0' },
        { say: 'Find the perfect squares just below and just above the number. The square root is between their square roots.', show: 'sum.1' },
        { say: 'Compare the distances to see which whole number it is closer to. In the next part, you will estimate a square root to one decimal place. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
