import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { errorBars } from './lib/m303-1-figures.ts';

// The same 6 mm error on a 40 mm bracket (15%) and on a 2400 mm beam (0.25%), each bar its true length.
const sameError = () =>
  figure(
    'err',
    [
      errorBars({
        rows: [
          { id: 'bracket', label: '\\text{Bracket, truly } 40\\text{ mm}', fraction: 6 / 40, tex: '6\\text{ mm} = 15\\%' },
          { id: 'beam', label: '\\text{Beam, truly } 2400\\text{ mm}', fraction: 6 / 2400, tex: '6\\text{ mm} = 0.25\\%' },
        ],
      }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm303-1-1-d',
  lessonId: 'm303-1-1',
  title: 'Precision and Accuracy, Part 4: Percent Error',
  thumbnailTitle: 'Percent Error',
  thumbnail: 'err',
  summary: 'Comparing the accuracy of measurements of different sizes with percent error, |measured − true| ÷ true × 100%: a 40 mm bracket measured as 40.4 mm (1%) and a 2400 mm beam measured as 2406 mm (0.25%), so the beam measurement is more accurate for its size.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 4', title: 'Percent Error', subtitle: 'Comparing accuracy for objects of different sizes' }],
      lines: [
        { say: 'An error of six millimetres is huge on a bracket that is 40 millimetres long. On a steel beam that is 2,400 millimetres long, it is tiny.', show: 'title' },
        { say: 'So the size of an error alone cannot tell you how good a measurement is. In this video, you will compare accuracy using percent error.' },
      ],
    },
    {
      chapter: 'Same error, different sizes',
      layout: 'center',
      main: [sameError()],
      lines: [
        { say: 'Picture both objects measured six millimetres too long. Each blue bar stands for an object’s true length, drawn the same width, and the red piece is the six millimetre error.', show: ['err.bracket', 'err.beam'] },
        { say: 'On the 40 millimetre bracket, six millimetres is a big piece: six out of 40 is fifteen percent of its length.', show: 'err.bracket-err', focus: 'err.bracket-err' },
        { say: 'On the 2,400 millimetre beam, the same six millimetres is a sliver: a quarter of one percent.', show: 'err.beam-err', focus: 'err.beam-err' },
        { say: 'To compare accuracy fairly, write each error as a percent of the true value.', focus: 'err' },
      ],
    },
    {
      chapter: 'Percent error',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent error', md: 'Divide the error by the true value and multiply by $100\\%$. A smaller percent error means a more accurate measurement for the size of the object.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{percent error} = \\dfrac{|\\text{measured value} - \\text{true value}|}{\\text{true value}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'Percent error is the size of the error, divided by the true value, times 100 percent.', show: ['def', 'm.0'] },
        { say: 'The error is the difference between the measured value and the true value. The bars around it mean the absolute value: you take the error as a positive number, whether the measurement is too big or too small.', focus: 'm.0' },
        { say: 'A smaller percent error means a more accurate measurement for the size of the object.', focus: 'def' },
      ],
    },
    {
      chapter: 'Bracket or beam?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A bracket that is truly $40\\text{ mm}$ is measured as $40.4\\text{ mm}$. A beam that is truly $2400\\text{ mm}$ is measured as $2406\\text{ mm}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Bracket: error} = 40.4 - 40 = 0.4\\text{ mm}',
            '\\dfrac{0.4}{40} \\times 100\\% = \\bad{1\\%}',
            '\\text{Beam: error} = 2406 - 2400 = 6\\text{ mm}',
            '\\dfrac{6}{2400} \\times 100\\% = \\good{0.25\\%}',
          ],
        },
      ],
      lines: [
        { say: 'Now a worked example. A bracket that is truly 40 millimetres long is measured as 40.4 millimetres. A steel beam that is truly 2,400 millimetres long is measured as 2,406 millimetres. Which measurement is more accurate for the size of the object?', show: 'q' },
        { say: 'The bracket first. The error is 40.4 minus 40, which is 0.4 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: '0.4 divided by the true value, 40, is 0.01, and 0.01 times 100 percent is one percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the beam. The error is 2,406 minus 2,400, which is six millimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Six divided by 2,400 is 0.0025, and 0.0025 times 100 percent is 0.25 percent.', show: 'm.3', focus: 'm.3' },
        { say: 'So the beam measurement is more accurate for its size, even though it is off by more millimetres. Its error is a quarter of a percent, against one percent for the bracket.', focus: ['m.1', 'm.3'] },
      ],
    },
    {
      chapter: 'Divide by the true value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Divide by the true value', md: 'The percent error compares the error with the **true** value, not the measured one, because the true value is the size the object really has.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{\\dfrac{0.4}{40} \\times 100\\% = 1\\%} \\qquad \\bad{\\dfrac{0.4}{40.4} \\times 100\\% \\approx 0.99\\%}'] },
      ],
      lines: [
        { say: 'One tip: always divide by the true value, not the measured value. The true value is the size the object really has, so the error is compared with that.', show: 'tip' },
        { say: 'For the bracket, 0.4 over 40 is exactly one percent. Dividing by the measured value, 40.4, would give about 0.99 percent instead. The difference is small here, but it is a different answer.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A test mass of exactly $250\\text{ g}$ reads $252\\text{ g}$ on a scale. What is the percent error?',
          choices: ['$2\\%$', '$0.79\\%$', '$0.8\\%$', '$8\\%$'],
          answer: 2,
          working: 'Error $= 252 - 250 = 2\\text{ g}$, and $\\dfrac{2}{250} \\times 100\\% = 0.8\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A test mass of exactly 250 grams reads 252 grams on a scale. What is the percent error? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The error is 252 minus 250, which is two grams, and two divided by 250 is 0.008, which is 0.8 percent. Choice B divides by the measured value, 252, instead of the true value.', show: 'q.answer' },
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
            'The same error matters more on a small object than on a large one.',
            'Percent error $= \\dfrac{|\\text{measured} - \\text{true}|}{\\text{true}} \\times 100\\%$.',
            'A smaller percent error is more accurate for the size of the object.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The same error matters more on a small object than on a large one.', show: 'sum.0' },
        { say: 'Percent error is the error, divided by the true value, times 100 percent.', show: 'sum.1' },
        { say: 'And a smaller percent error means a more accurate measurement for the size of the object. In the next lesson, we look at uncertainty and tolerance. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
