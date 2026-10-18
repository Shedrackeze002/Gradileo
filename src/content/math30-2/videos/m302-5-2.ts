import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { fuelData, fuelModel, numbers, panels, scatter } from './lib/m302-5-graphs.ts';

// Three scatter plots: no change of direction, one, and two.
const shapes = panels({
  x: [0, 10],
  y: [0, 10],
  size: 4.4,
  gap: 6.4,
  list: [
    { name: 'l', f: (x) => 0.8 * x + 1, tone: 'opp', pts: [[1, 1.6], [2, 2.9], [3, 3.1], [4, 4.6], [5, 4.8], [6, 6.1], [7, 6.4], [8, 7.8], [9, 8]], caption: '\\text{no turns}', sub: '\\text{linear}' },
    { name: 'q', f: (x) => -0.35 * (x - 5) ** 2 + 8.5, tone: 'opp', pts: [[1, 3.2], [2, 5.1], [3, 7.3], [4, 8], [5, 8.7], [6, 8.3], [7, 6.8], [8, 5.6], [9, 2.6]], caption: '\\text{one turn}', sub: '\\text{quadratic}' },
    { name: 'c', f: (x) => 0.1 * (x - 5) ** 3 - 2 * (x - 5) + 5, tone: 'opp', pts: [[0.5, 5.2], [1.5, 7.4], [2.5, 8.7], [3.5, 7.5], [4.5, 6.3], [5.5, 3.8], [6.5, 2.6], [7.5, 1.4], [8.5, 2.6], [9.5, 4.9]], caption: '\\text{two turns}', sub: '\\text{cubic}' },
  ],
});

// The fuel test.
const fu = plane({ x: [30, 130], y: [5, 11], xStep: 10, every: 0, width: 9, height: 6.5, titles: { x: '\\text{Speed (km/h)}', y: '\\text{Fuel use (L/100 km)}' } });

// Scatter, not a turning point: a steady trend with one point a little high and the next a little low.
const sc = plane({ name: 's', x: [0, 8], y: [0, 8], every: 0, width: 8, height: 8 });
const wobble: [number, number][] = [[1, 1.5], [2, 2.4], [3, 3.6], [4, 3.3], [5, 4.6], [6, 5.3], [7, 6.4]];

const video: Explainer = {
  id: 'm302-5-2',
  lessonId: 'm302-5-2',
  title: 'Modelling Data with Polynomial Functions, Part 1: Choosing a Type of Model',
  thumbnailTitle: 'Choosing a Regression Model',
  thumbnail: 'fuel',
  summary: 'What regression is, choosing linear, quadratic or cubic regression by counting how many times a scatter plot changes direction, a car’s fuel use against speed (quadratic: y = 0.0015x² − 0.21x + 13.4), and why one point a little above its neighbours is scatter, not a turning point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 1', title: 'Choosing a Model', subtitle: 'Linear, quadratic or cubic regression' }],
      lines: [
        { say: 'Real data rarely fall exactly on a line or a curve, but they often follow one closely. Graphing technology can find the line or curve that fits best.', show: 'title' },
        { say: 'In this video, you will see what regression is, and choose between a linear, a quadratic and a cubic model by looking at the shape of the data.' },
      ],
    },
    {
      chapter: 'Regression',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Regression', md: 'A method that finds the equation of the line or curve of best fit for a set of data. A graphing calculator or spreadsheet gives a **linear**, **quadratic** or **cubic** regression equation.' },
        { kind: 'callout', id: 'job', tone: 'key', title: 'Your job', md: 'The equation is given to you. Choose the right **type** of model, **use** its equation, and decide when to **trust** its predictions.' },
      ],
      lines: [
        { say: 'Regression is a method that finds the equation of the line or curve of best fit for a set of data. A graphing calculator or a spreadsheet can give a linear, a quadratic or a cubic regression equation.', show: 'def' },
        { say: 'The curve of best fit does not have to pass through every point. It follows the overall pattern, with points on both sides of it.' },
        { say: 'In this lesson, the regression equation is always given to you. Your job is to choose the right type of model, use its equation, and decide when to trust its predictions.', show: 'job' },
      ],
    },
    {
      chapter: 'Count the turns',
      layout: 'center',
      main: [
        figure('sh', [shapes]),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Choosing a model', md: 'Count how many times the pattern changes direction: **none**, linear; **one**, quadratic; **two**, cubic.' },
      ],
      lines: [
        { say: 'To choose a model, look at the overall shape of the scatter plot, and count how many times the pattern changes direction.', show: ['sh.l-grid', 'sh.l-axes', 'sh.q-grid', 'sh.q-axes', 'sh.c-grid', 'sh.c-axes'] },
        { say: 'If the points rise or fall at a steady rate, they never change direction. A linear model fits: a straight line.', show: ['sh.l-pts', 'sh.l-curve', 'sh.l-text'], focus: 'sh.l-curve' },
        { say: 'If they rise then fall, or fall then rise, they change direction once. A quadratic model fits, because a parabola has exactly one turning point.', show: ['sh.q-pts', 'sh.q-curve', 'sh.q-text'], focus: 'sh.q-curve' },
        { say: 'And if the pattern changes direction twice, up, down, then up, or down, up, then down, a cubic model fits.', show: ['sh.c-pts', 'sh.c-curve', 'sh.c-text'], focus: 'sh.c-curve' },
        { say: 'So count the turns. None means linear, one means quadratic, and two means cubic.', show: 'key', focus: 'sh' },
      ],
    },
    {
      chapter: 'Fuel use and speed',
      layout: 'split',
      leftWidth: 560,
      left: [figure('fuel', [fu, numbers(fu, 20, 1), scatter(fu, 'pts', fuelData), plot(fu, { id: 'curve', f: fuelModel, from: 40, to: 120, tone: 'opp', samples: 200 })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A car’s fuel use was measured at speeds from 40 km/h to 120 km/h. Which type of regression suits the data?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{one turn: quadratic}', 'y = 0.0015x^2 - 0.21x + 13.4'] },
      ],
      lines: [
        { say: 'A driver tested a car on a track, and recorded its fuel use at speeds from 40 to 120 kilometres per hour. Fuel use is measured in litres per hundred kilometres. Which type of regression suits the data?', show: ['q', 'fuel.grid', 'fuel.axes', 'fuel.pts'] },
        { say: 'Read the pattern from left to right. The fuel use falls as the speed rises to about 70 kilometres per hour. Then it rises again.', focus: 'fuel.pts' },
        { say: 'The pattern changes direction once, like a parabola that opens up. So quadratic regression suits these data.', show: 'm.0', focus: 'm.0' },
        { say: 'The technology gives y equals 0.0015 x squared, minus 0.21 x, plus 13.4. Its curve runs through the middle of the points, with some above it and some below.', show: ['m.1', 'fuel.curve'], focus: ['m.1', 'fuel.curve'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('wb', [
          sc,
          polyline(sc, { id: 'join', points: wobble, tone: 'bad', dashed: true }),
          plot(sc, { id: 'line', f: (x) => 0.8 * x + 0.7, from: 0.5, to: 7.5, tone: 'opp' }),
          scatter(sc, 'pts', wobble),
        ]),
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Chasing single points', md: 'A model describes the overall trend. One point slightly above or below its neighbours is scatter, not a turning point. Look at the shape the points make together.' }],
      lines: [
        { say: 'A common mistake is to chase single points. In these data, the third point is a little high, and the fourth is a little low.', show: ['wb.s-grid', 'wb.s-axes', 'wb.s-pts'], focus: 'wb.s-pts' },
        { say: 'Join the dots, and the pattern seems to go up, then down, then up again. That looks like two changes of direction, so you might pick a cubic.', show: 'wb.s-join', focus: 'wb.s-join' },
        { say: 'But look at the points together. They rise at a steady rate, and the wobble is just scatter. A straight line fits them well, so a linear model is the right choice.', show: 'wb.s-line', focus: 'wb.s-line' },
        { say: 'A model describes the overall trend. One point slightly above or below its neighbours is not a turning point.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A scatter plot of a shop’s weekly sales rises, then falls, then rises again. Which type of regression suits the data?',
          choices: ['Linear', 'Quadratic', 'Linear, because the sales end higher than they start', 'Cubic'],
          answer: 3,
          working: 'The pattern changes direction twice (up, down, up), so it has two turning points: a cubic model.',
        },
      ],
      lines: [
        { say: 'Your turn. A scatter plot of a shop’s weekly sales rises, then falls, then rises again. Which type of regression suits the data? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The pattern changes direction twice, up, down, then up again, so it has two turning points, and a cubic model fits. Choice B fits a pattern that changes direction only once.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Regression finds the equation of the line or curve of best fit.', 'Count the changes of direction: none, linear; one, quadratic; two, cubic.', 'Look at the overall trend, not at single points.'] }],
      lines: [
        { say: 'Let’s sum up. Regression finds the equation of the line or curve of best fit for a set of data.', show: 'sum.0' },
        { say: 'To choose the type, count how many times the pattern changes direction. None means linear, one means quadratic, and two means cubic.', show: 'sum.1' },
        { say: 'And look at the overall trend, not at single points. In the next part, we use a model to estimate values inside and outside the data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
