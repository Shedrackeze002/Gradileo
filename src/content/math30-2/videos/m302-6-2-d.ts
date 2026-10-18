import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, hline, name, numbers, plane, plot } from './lib/m302-6-graphs.ts';

// y = 2^(3x + 1) meets y = 81 at x ≈ 1.78.
const g = plane({ x: [0, 2.5], y: [0, 120], xStep: 0.25, yStep: 10, every: 0, width: 8, height: 8 });
const f = (x: number) => 2 ** (3 * x + 1);
const sol = (Math.log10(81) / Math.log10(2) - 1) / 3;

const video: Explainer = {
  id: 'm302-6-2-d',
  lessonId: 'm302-6-2',
  title: 'Solving Exponential Equations, Part 4: An Expression in the Exponent',
  thumbnailTitle: 'Expressions in Exponents',
  thumbnail: 'gr',
  summary: 'Solving exponential equations with an expression in the exponent by bringing it down in brackets: 2^(3x + 1) = 81 (x ≈ 1.78, checked on a graph) and 5^(x − 2) = 30 (x ≈ 4.11), and what goes wrong without the brackets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 4', title: 'An Expression in the Exponent', subtitle: 'Bring it down in brackets' }],
      lines: [
        { say: 'Sometimes the exponent is not just x, but an expression, like three x plus one. The method still works, as long as you keep that expression together.', show: 'title' },
        { say: 'In this video, you will solve exponential equations with an expression in the exponent, and check the answer with a graph.' },
      ],
    },
    {
      chapter: 'Brackets matter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2^{3x + 1} = 81', '\\log 2^{3x + 1} = \\log 81', '\\opp{(3x + 1)}\\log 2 = \\log 81', '3x + 1 = \\dfrac{\\log 81}{\\log 2} = 6.33985\\ldots', '3x = 5.33985\\ldots', 'x = 1.77995\\ldots \\approx 1.78'] },
      ],
      lines: [
        { say: 'Solve two to the power three x plus one equals 81, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'There is no common base, because 81 is not a power of two. So take the log of both sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Now bring down the whole exponent, in brackets: three x plus one, times log two, equals log 81.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide both sides by log two. Three x plus one equals log 81 over log two, which is 6.33985.', show: 'm.3', focus: 'm.3' },
        { say: 'Now it is a linear equation. Subtract one: three x equals 5.33985. Keep every digit until the end.', show: 'm.4', focus: 'm.4' },
        { say: 'Divide by three: x equals 1.77995, which is about 1.78.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Check with technology',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gr', [
          g,
          numbers(g, 0.5, 20),
          hline(g, 'line', 81, 'opp', false),
          name(g, 'line-t', 2.48, 81, 'y = 81', 'above left', 'opp'),
          plot(g, { id: 'curve', f, samples: 300 }),
          name(g, 'curve-t', 1.88, 30, 'y = 2^{3x + 1}', 'right'),
          guide(g, 'down', [sol, 81], [sol, 0], 'good'),
          dots(g, [{ id: 'S', x: sol, y: 81, tex: '(1.78, 81)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3(1.78) + 1 = 6.34', '2^{6.34} \\approx 81.0 \\;\\checkmark'] }],
      lines: [
        { say: 'Check with technology. Graph y equals two to the power three x plus one, and the line y equals 81.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.curve-t', 'gr.line', 'gr.line-t'] },
        { say: 'They intersect at about 1.78, 81. The x-coordinate of the point of intersection matches our answer.', show: ['gr.S', 'gr.down'], focus: ['gr.S', 'gr.down'] },
        { say: 'You can also check by substituting. Three times 1.78, plus one, is 6.34, and two to the power 6.34 is about 81.0. It works.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['5^{x - 2} = 30', '(x - 2)\\log 5 = \\log 30', 'x - 2 = \\dfrac{\\log 30}{\\log 5} = 2.11328\\ldots', 'x = 4.11328\\ldots \\approx 4.11', '5^{2} = 25 < 30 < 125 = 5^{3}, \\text{ so } 2 < x - 2 < 3 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'One more. Solve five to the power x minus two equals 30, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the log of both sides, and bring down the whole exponent in brackets: x minus two, times log five, equals log 30.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by log five: x minus two equals log 30 over log five, which is 2.11328.', show: 'm.2', focus: 'm.2' },
        { say: 'Add two to both sides: x equals 4.11328, about 4.11.', show: 'm.3', focus: 'm.3' },
        { say: 'Does that make sense? Five squared is 25 and five cubed is 125, and 30 is between them. So the exponent, x minus two, must be between two and three, and 2.11 is.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving out the brackets', md: 'Without brackets, $3x + 1\\log 2$ multiplies only the $1$ by $\\log 2$. The whole exponent, $3x + 1$, must be multiplied.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3x + 1\\log 2 = \\log 81} \\;\\to\\; x \\approx 0.54', '2^{3(0.54) + 1} = 2^{2.62} \\approx 6.1, \\text{ not } 81'] },
      ],
      lines: [
        { say: 'The brackets are not optional. Without them, you would write three x, plus one times log two, equals log 81. That multiplies only the one by log two.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Solving that gives x of about 0.54. But check it: two to the power three times 0.54, plus one, is two to the power 2.62, which is only about 6.1, not 81.', show: 'm.1', focus: 'm.1' },
        { say: 'So always bring down the whole exponent, in brackets, and check your answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $3^{2x - 1} = 50$ to the nearest hundredth.',
          choices: ['$x \\approx 1.28$', '$x \\approx 3.56$', '$x \\approx 1.09$', '$x \\approx 2.28$'],
          answer: 3,
          working: '$(2x - 1)\\log 3 = \\log 50$, so $2x - 1 = \\dfrac{\\log 50}{\\log 3} = 3.5609\\ldots$, $2x = 4.5609\\ldots$ and $x = 2.2804\\ldots \\approx 2.28$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve three to the power two x minus one equals 50, to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Bring down the whole exponent in brackets: two x minus one, times log three, equals log 50. So two x minus one is about 3.5609, two x is about 4.5609, and x is about 2.28. Choice A subtracts the one instead of adding it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Take $\\log$ of both sides and bring the whole exponent down, in brackets.', 'Then solve the linear equation, keeping every digit until the end.', 'Check by substituting, or by graphing both sides and finding the intersection.'] }],
      lines: [
        { say: 'Let’s sum up. When the exponent is an expression, take the log of both sides, and bring the whole exponent down, in brackets.', show: 'sum.0' },
        { say: 'Then solve the linear equation that is left, keeping every digit until the end.', show: 'sum.1' },
        { say: 'And check by substituting, or by graphing both sides and finding where they intersect. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
