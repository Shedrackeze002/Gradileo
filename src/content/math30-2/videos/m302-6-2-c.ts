import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, hline, name, numbers, plane, plot } from './lib/m302-6-graphs.ts';

// y = 2^x meets y = 20 at x = log 20 / log 2 ≈ 4.32.
const g = plane({ x: [0, 6], y: [0, 40], yStep: 5, every: 0, width: 8, height: 8 });
const x20 = Math.log10(20) / Math.log10(2);

const video: Explainer = {
  id: 'm302-6-2-c',
  lessonId: 'm302-6-2',
  title: 'Solving Exponential Equations, Part 3: Solving with Logarithms',
  thumbnailTitle: 'Solving with Logarithms',
  thumbnail: 'gr',
  summary: 'When there is no common base, take the common logarithm of both sides and bring the exponent down with log(bˣ) = x log b: solving 3ˣ = 50 (x ≈ 3.56), 2ˣ = 20 on a graph (x ≈ 4.32) and 400(0.85)ˣ = 100 (x ≈ 8.53), and why log 50 / log 3 is not log(50/3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 3', title: 'Solving with Logarithms', subtitle: 'When there is no common base' }],
      lines: [
        { say: 'Three to the power x equals 50. Fifty is not a power of three, so there is no common base. How can you find x?', show: 'title' },
        { say: 'In this video, you will solve exponential equations like this one with the log key on your calculator.' },
      ],
    },
    {
      chapter: 'No common base',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3^{3} = 27 < 50 < 81 = 3^{4}', '\\text{so } 3 < x < 4'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The common logarithm', md: 'The LOG key gives the **common logarithm**, $\\log$, with base $10$. It brings an exponent down as a factor: $\\log(b^x) = x\\log b$.' },
      ],
      lines: [
        { say: 'First, estimate. Three cubed is 27, and three to the fourth is 81. Fifty is between them, so x is between three and four. But it is not a whole number, and there is no common base to use.', show: ['m.0', 'm.1'], focus: 'm.0' },
        { say: 'The tool for this is the common logarithm. It is the log key on your calculator, and it uses base ten.', show: 'key' },
        { say: 'It has one property that makes it perfect here: the log of b to the power x equals x times log b. The exponent comes down as a factor, so the unknown is no longer stuck in an exponent.' },
      ],
    },
    {
      chapter: 'Take the log of both sides',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3^{x} = 50', '\\log 3^{x} = \\log 50', 'x\\log 3 = \\log 50', 'x = \\dfrac{\\log 50}{\\log 3} = \\dfrac{1.69897\\ldots}{0.47712\\ldots} = 3.5609\\ldots', 'x \\approx 3.56 \\qquad \\text{Check: } 3^{3.56} \\approx 49.95'] },
      ],
      lines: [
        { say: 'Solve three to the power x equals 50, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'If two numbers are equal, their logs are equal. So take the log of both sides: log of three to the power x equals log 50.', show: 'm.1', focus: 'm.1' },
        { say: 'Bring the exponent down: x times log three equals log 50.', show: 'm.2', focus: 'm.2' },
        { say: 'Now divide both sides by log three. x equals log 50 over log three. On a calculator, log 50 is 1.69897, and log three is 0.47712. Dividing gives 3.5609.', show: 'm.3', focus: 'm.3' },
        { say: 'So x is about 3.56, between three and four, as estimated. Check: three to the power 3.56 is about 49.95, very close to 50.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gr', [
          g,
          numbers(g, 1, 10),
          hline(g, 'line', 20, 'opp', false),
          name(g, 'line-t', 0.1, 20, 'y = 20', 'above right', 'opp'),
          plot(g, { id: 'curve', f: (x) => 2 ** x, samples: 200 }),
          name(g, 'curve-t', 5.1, 26, 'y = 2^x', 'right'),
          guide(g, 'down', [x20, 20], [x20, 0], 'good'),
          dots(g, [{ id: 'S', x: x20, y: 20, tex: '(4.32, 20)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2^{x} = 20', 'x = \\dfrac{\\log 20}{\\log 2} \\approx 4.32'] }],
      lines: [
        { say: 'A graph shows the same idea. The solution of two to the power x equals 20 is where the curve y equals two to the power x meets the line y equals 20.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.curve-t', 'gr.line', 'gr.line-t', 'm.0'] },
        { say: 'They meet at about 4.32, 20. So x is about 4.32.', show: ['gr.S', 'gr.down'], focus: ['gr.S', 'gr.down'] },
        { say: 'With logarithms: x equals log 20 over log two, which is also about 4.32. Graphing technology and logarithms give the same answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A decay equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['400(0.85)^{x} = 100', '0.85^{x} = 0.25', 'x\\log 0.85 = \\log 0.25', 'x = \\dfrac{\\log 0.25}{\\log 0.85} = \\dfrac{-0.60206\\ldots}{-0.07058\\ldots} = 8.5300\\ldots', 'x \\approx 8.53'] },
      ],
      lines: [
        { say: 'Solve 400 times 0.85 to the power x equals 100, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'First isolate the power. Divide both sides by 400: 0.85 to the power x equals 0.25.', show: 'm.1', focus: 'm.1' },
        { say: 'Take the log of both sides, and bring the exponent down: x times log 0.85 equals log 0.25.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide: x equals log 0.25 over log 0.85. Both logs are negative, because both numbers are less than one, so the answer is positive: 8.5300.', show: 'm.3', focus: 'm.3' },
        { say: 'So x is about 8.53.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing inside the logarithm', md: '$\\dfrac{\\log 50}{\\log 3}$ is **not** $\\log \\dfrac{50}{3}$. Find each logarithm, then divide the two numbers.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\log 50}{\\log 3} \\approx \\good{3.56}', '\\log \\dfrac{50}{3} = \\log 16.67 \\approx \\bad{1.22}'] },
      ],
      lines: [
        { say: 'Be careful with the last step. Log 50 over log three is not the log of 50 over three.', show: 'oops' },
        { say: 'Log 50 divided by log three is about 3.56.', show: 'm.0', focus: 'm.0' },
        { say: 'But the log of 50 over three is the log of 16.67, which is only about 1.22. So find each logarithm first, then divide the two numbers.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $6^{x} = 40$ to the nearest hundredth.',
          choices: ['$x \\approx 0.82$', '$x \\approx 2.06$', '$x \\approx 6.67$', '$x \\approx 0.49$'],
          answer: 1,
          working: '$x\\log 6 = \\log 40$, so $x = \\dfrac{\\log 40}{\\log 6} = \\dfrac{1.60206\\ldots}{0.77815\\ldots} \\approx 2.06$. Check: $6^2 = 36$, a little less than $40$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve six to the power x equals 40, to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Take the log of both sides: x times log six equals log 40. So x is log 40 over log six, about 2.06. That makes sense, because six squared is 36, a little less than 40. Choice A divides inside the logarithm: it finds the log of 40 over six.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['With no common base, isolate the power and take $\\log$ of both sides.', '$\\log b^x = x\\log b$, so $x = \\dfrac{\\log N}{\\log b}$.', 'Find each logarithm, then divide.', 'Check by substituting, or by graphing both sides.'] }],
      lines: [
        { say: 'Let’s sum up. When there is no common base, isolate the power, and take the log of both sides.', show: 'sum.0' },
        { say: 'The exponent comes down as a factor, so x equals the log of the number over the log of the base.', show: 'sum.1' },
        { say: 'Find each logarithm, then divide.', show: 'sum.2' },
        { say: 'And check your answer by substituting it, or by graphing both sides. In the next part, we solve equations with an expression in the exponent. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
