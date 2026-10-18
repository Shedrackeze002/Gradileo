import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { fuelData, fuelModel, guide, hline, numbers, playersData, playersModel, scatter, tag } from './lib/m302-5-graphs.ts';

// The fuel model, its lowest point (70, 6.05) and the speeds where it gives 7 L/100 km.
const fu = plane({ x: [30, 130], y: [5, 11], xStep: 10, every: 0, width: 9, height: 6.5, titles: { x: '\\text{Speed (km/h)}', y: '\\text{Fuel use (L/100 km)}' } });
const root = Math.sqrt(0.0057);
const [r1, r2] = [(0.21 - root) / 0.003, (0.21 + root) / 0.003];
const fuel = () =>
  figure('fuel', [
    fu,
    numbers(fu, 20, 1),
    scatter(fu, 'pts', fuelData),
    hline(fu, 'seven', 7, 'adj'),
    tag(fu, 'seven-t', 129, 7, 'y = 7', 'above left', 'adj'),
    plot(fu, { id: 'curve', f: fuelModel, from: 40, to: 120, tone: 'opp', samples: 200 }),
    guide(fu, 'gv', [70, 5], [70, 6.05], 'good'),
    dots(fu, [
      { id: 'V', x: 70, y: 6.05, tex: '(70, 6.05)', tone: 'good', place: 'below right' },
      { id: 'R1', x: r1, y: 7, tex: '45', tone: 'adj', place: 'below left', group: 'roots' },
      { id: 'R2', x: r2, y: 7, tex: '95', tone: 'adj', place: 'above left', group: 'roots' },
    ]),
  ]);

// The game's players, and the estimate at 10 months.
const pl = plane({ name: 'p', x: [0, 20], y: [0, 70], xStep: 2, yStep: 10, every: 0, width: 9, height: 7, titles: { x: '\\text{Months since launch}', y: '\\text{Players (thousands)}' } });

const video: Explainer = {
  id: 'm302-5-2-c',
  lessonId: 'm302-5-2',
  title: 'Modelling Data with Polynomial Functions, Part 3: Using Quadratic and Cubic Models',
  thumbnailTitle: 'Quadratic and Cubic Models',
  thumbnail: 'fuel',
  summary: 'Using a quadratic regression model: the lowest fuel use at the vertex, x = −b/(2a) = 70 km/h, and the speeds where y = 0.0015x² − 0.21x + 13.4 gives 7 L/100 km (about 45 and 95 km/h) by the quadratic formula; and evaluating a cubic model of a game’s players, y = 0.06x³ − 1.6x² + 13x + 3, at 10 months (33 thousand).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 3', title: 'Using Quadratic and Cubic Models', subtitle: 'Lowest points, target values and estimates' }],
      lines: [
        { say: 'At what speed does a car use the least fuel? How many people will be playing a new game after ten months? A regression model can answer questions like these.', show: 'title' },
        { say: 'In this video, you will find the maximum or minimum of a quadratic model, find when it reaches a target value, and evaluate a cubic model.' },
      ],
    },
    {
      chapter: 'The vertex',
      layout: 'split',
      leftWidth: 540,
      left: [fuel()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 0.0015x^2 - 0.21x + 13.4', 'x = -\\dfrac{b}{2a} = -\\dfrac{-0.21}{2(0.0015)} = 70', 'y = 7.35 - 14.7 + 13.4', 'y = 6.05'] }],
      lines: [
        { say: 'A quadratic model has a maximum or a minimum at its vertex. The vertex is on the axis of symmetry, x equals negative b over two "a".', show: ['fuel.grid', 'fuel.axes', 'fuel.pts', 'fuel.curve'] },
        { say: 'Here is the fuel model again: y equals 0.0015 x squared, minus 0.21 x, plus 13.4. The value of "a", 0.0015, is positive, so the parabola opens up, and its vertex is a minimum: the lowest fuel use.', show: 'm.0', focus: 'm.0' },
        { say: 'x equals negative, negative 0.21, over two times 0.0015. That is 0.21 over 0.003, which is 70.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute 70 into the model: 7.35, minus 14.7, plus 13.4, which is 6.05.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So the lowest fuel use is about 6.05 litres per hundred kilometres, at a speed of 70 kilometres per hour.', show: ['fuel.V', 'fuel.gv'], focus: 'fuel.V' },
      ],
    },
    {
      chapter: 'Reaching a value',
      layout: 'split',
      leftWidth: 540,
      left: [fuel()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0.0015x^2 - 0.21x + 13.4 = 7', '0.0015x^2 - 0.21x + 6.4 = 0', 'x = \\dfrac{0.21 \\pm \\sqrt{0.0057}}{0.003}', 'x \\approx 45 \\quad\\text{or}\\quad x \\approx 95'] }],
      lines: [
        { say: 'At what speeds does the model give a fuel use of 7 litres per hundred kilometres? Set y equal to seven.', show: ['fuel.grid', 'fuel.axes', 'fuel.pts', 'fuel.curve', 'fuel.V', 'fuel.gv', 'm.0'], focus: 'm.0' },
        { say: 'Subtract seven from both sides: 0.0015 x squared, minus 0.21 x, plus 6.4, equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Use the quadratic formula. b squared minus four "a" c is 0.0441, minus 0.0384, which is 0.0057. So x equals 0.21, plus or minus the square root of 0.0057, all over 0.003.', show: 'm.2', focus: 'm.2' },
        { say: 'That gives x of about 45, or about 95.', show: 'm.3', focus: 'm.3' },
        { say: 'On the graph, those are the two places where the curve meets the line y equals seven. So the model gives 7 litres per hundred kilometres at about 45 and about 95 kilometres per hour. With technology, you can find them as the points where the two graphs intersect.', show: ['fuel.seven', 'fuel.seven-t', 'fuel.roots'], focus: ['fuel.seven', 'fuel.roots'] },
      ],
    },
    {
      chapter: 'A cubic model',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('pl', [
          pl,
          numbers(pl, 4, 10),
          scatter(pl, 'pts', playersData),
          plot(pl, { id: 'curve', f: playersModel, from: 0, to: 18, tone: 'opp', samples: 200 }),
          guide(pl, 'gx', [10, 0], [10, 33], 'good', { group: 'est' }),
          guide(pl, 'gy', [10, 33], [0, 33], 'good', { group: 'est' }),
          dots(pl, [{ id: 'E', x: 10, y: 33, tone: 'good', group: 'est' }]),
          tag(pl, 'E-t', 10.5, 25, '(10, 33)', 'right', 'good', 'est'),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 0.06x^3 - 1.6x^2 + 13x + 3', 'x = 10\\colon', 'y = 60 - 160 + 130 + 3', 'y = 33'] },
      ],
      lines: [
        { say: 'A cubic model is used the same way: substitute the x-value, and evaluate.', show: ['pl.p-grid', 'pl.p-axes', 'pl.p-pts'] },
        { say: 'A game company models its active players, y, in thousands, x months after launch, for the first 18 months, with y equals 0.06 x cubed, minus 1.6 x squared, plus 13 x, plus three.', show: ['m.0', 'pl.p-curve'], focus: ['m.0', 'pl.p-curve'] },
        { say: 'The curve rises quickly after launch, levels off and dips a little, then rises again. That is two changes of direction, so a cubic suits these data.', focus: 'pl.p-curve' },
        { say: 'Estimate the number of players after ten months. Substitute ten for x.', show: 'm.1', focus: 'm.1' },
        { say: '0.06 times ten cubed is 60. 1.6 times ten squared is 160. 13 times ten is 130. So y is 60, minus 160, plus 130, plus three, which is 33.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So the model estimates about 33 thousand players after ten months. Ten months is inside the data, so this is interpolation.', show: 'pl.p-est', focus: 'pl.p-E' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball’s height, in metres, $x$ seconds after it is thrown is modelled by $y = -4.9x^2 + 19.6x + 2$. When does it reach its maximum height, and what is that height?',
          choices: ['After $2$ s, at $2$ m', 'After $-2$ s, at $-56.8$ m', 'After $2$ s, at $21.6$ m', 'After $4$ s, at $2$ m'],
          answer: 2,
          working: '$x = -\\dfrac{19.6}{2(-4.9)} = 2$, and $y = -4.9(2)^2 + 19.6(2) + 2 = -19.6 + 39.2 + 2 = 21.6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball’s height, in metres, x seconds after it is thrown is modelled by y equals negative 4.9 x squared, plus 19.6 x, plus two. When does it reach its maximum height, and what is that height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. x equals negative 19.6 over two times negative 4.9, which is two. Then y is negative 19.6, plus 39.2, plus two: 21.6 metres. Choice D is when the ball comes back down to its starting height of two metres, not its highest point.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A quadratic model’s maximum or minimum is at its vertex, $x = -\\dfrac{b}{2a}$.', 'To find when a model reaches a value, set $y$ equal to it and solve.', 'A cubic model is used the same way: substitute and evaluate.'] }],
      lines: [
        { say: 'Let’s sum up. A quadratic model has its maximum or minimum at its vertex, where x equals negative b over two "a".', show: 'sum.0' },
        { say: 'To find when a model reaches a value, set y equal to that value and solve, with the quadratic formula or with technology.', show: 'sum.1' },
        { say: 'And a cubic model is used the same way: substitute and evaluate. In the next part, we ask whether a prediction is reasonable. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
