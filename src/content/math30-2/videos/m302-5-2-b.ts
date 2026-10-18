import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, guide, numbers, tag } from './lib/m302-5-graphs.ts';

// Iced drinks sold against the day's high temperature: data from 12 °C to 32 °C, and y = 4.6x + 38.2.
const g = plane({ x: [0, 45], y: [0, 250], xStep: 5, yStep: 25, every: 0, width: 9, height: 7, titles: { x: '\\text{High temperature } (^\\circ\\text{C})', y: '\\text{Iced drinks sold}' } });
const m = (x: number) => 4.6 * x + 38.2;
const drinks = () =>
  figure('dr', [
    g,
    numbers(g, 5, 50),
    band(g, 'data', 12, 32),
    tag(g, 'data-t', 22, 238, '\\text{data}', 'center', 'adj'),
    polyline(g, { id: 'fit', points: [[12, m(12)], [32, m(32)]], tone: 'brand' }),
    polyline(g, { id: 'high', points: [[32, m(32)], [45, m(45)]], tone: 'brand', dashed: true }),
    guide(g, 'g1', [25, 0], [25, m(25)], 'good', { group: 'in' }),
    guide(g, 'g2', [40, 0], [40, m(40)], 'opp', { group: 'out' }),
    dots(g, [
      { id: 'P1', x: 25, y: m(25), tex: '(25, 153.2)', tone: 'good', place: 'above left', group: 'in' },
      { id: 'P2', x: 40, y: m(40), tex: '(40, 222.2)', tone: 'opp', place: 'below right', group: 'out' },
    ]),
  ]);

const video: Explainer = {
  id: 'm302-5-2-b',
  lessonId: 'm302-5-2',
  title: 'Modelling Data with Polynomial Functions, Part 2: Interpolating and Extrapolating',
  thumbnailTitle: 'Interpolating and Extrapolating',
  thumbnail: 'dr',
  summary: 'Interpolation (estimating inside the range of the data) and extrapolation (predicting outside it) with a café’s linear model y = 4.6x + 38.2 for iced drinks against temperature: about 153 drinks at 25 °C and about 222 at 40 °C, what the slope means, and why you round only at the end.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 2', title: 'Interpolating and Extrapolating', subtitle: 'Predictions inside and outside the data' }],
      lines: [
        { say: 'Once you have a model, you can use it to make predictions. But some predictions deserve more trust than others.', show: 'title' },
        { say: 'In this video, you will use a regression equation to estimate values, and tell an estimate inside the data from a prediction outside it.' },
      ],
    },
    {
      chapter: 'Inside or outside',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Interpolation and extrapolation', md: '**Interpolation** estimates a value **inside** the range of the data. **Extrapolation** predicts a value **outside** that range.' }],
      lines: [
        { say: 'There are two kinds of prediction. Interpolation estimates a value inside the range of the data. Extrapolation predicts a value outside that range.', show: 'def' },
        { say: 'The difference matters. Inside the data, the model has been checked against real values all around it. Outside the data, nobody knows whether the pattern carries on.' },
      ],
    },
    {
      chapter: 'Iced drinks',
      layout: 'split',
      leftWidth: 560,
      left: [drinks()],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Data from 12°C to 32°C give $y = 4.6x + 38.2$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 4.6(25) + 38.2', 'y = 115 + 38.2 = 153.2', '\\text{about 153 drinks}'] },
      ],
      lines: [
        { say: 'A café recorded the daily high temperature, x, in degrees Celsius, and the number of iced drinks it sold, y. The temperatures in the data run from 12 to 32 degrees.', show: ['q', 'dr.grid', 'dr.axes', 'dr.data', 'dr.data-t'], focus: 'dr.data' },
        { say: 'Linear regression gives y equals 4.6 x plus 38.2.', show: 'dr.fit', focus: 'dr.fit' },
        { say: 'Estimate the sales on a day with a high of 25 degrees. Substitute 25 for x.', show: 'm.0', focus: 'm.0' },
        { say: '4.6 times 25 is 115, and 115 plus 38.2 is 153.2. You cannot sell part of a drink, so that is about 153 drinks.', show: ['m.1', 'm.2', 'dr.in'], focus: ['m.1', 'm.2', 'dr.in'] },
        { say: 'Twenty-five degrees is inside the data, between 12 and 32. So this is interpolation, and it is usually reliable.', focus: ['dr.P1', 'dr.data'] },
      ],
    },
    {
      chapter: 'Outside the data',
      layout: 'split',
      leftWidth: 560,
      left: [drinks()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 4.6(40) + 38.2', 'y = 184 + 38.2 = 222.2', '\\text{about 222 drinks}'] }],
      lines: [
        { say: 'Now predict the sales on a day with a high of 40 degrees.', show: ['dr.grid', 'dr.axes', 'dr.data', 'dr.data-t', 'dr.fit', 'm.0'], focus: 'm.0' },
        { say: '4.6 times 40 is 184, and 184 plus 38.2 is 222.2: about 222 drinks.', show: ['m.1', 'm.2', 'dr.high', 'dr.out'], focus: ['m.1', 'm.2', 'dr.out'] },
        { say: 'But 40 degrees is outside the data, so this is extrapolation. The dashed line carries the pattern on, but nobody checked that it really continues past 32 degrees. In very hot weather, the café might run out of ice, or fewer people might go out.', focus: ['dr.high', 'dr.P2'] },
        { say: 'So an extrapolation is less reliable than an interpolation, and the further outside the data you go, the less you can trust it.' },
      ],
    },
    {
      chapter: 'What the slope means',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = \\opp{4.6}x + \\adj{38.2}'] },
        { kind: 'bullets', id: 'b', items: ['Slope [[opp:4.6]]: each 1°C rise in temperature goes with about 4.6 more iced drinks sold.', '$y$-intercept [[adj:38.2]]: the model’s sales at 0°C, but 0°C is outside the data, so this is extrapolation too.'] },
      ],
      lines: [
        { say: 'The numbers in a linear model have a meaning in context.', show: 'm.0' },
        { say: 'The slope is 4.6. So each one degree rise in temperature goes with about 4.6 more iced drinks sold.', show: 'b.0' },
        { say: 'The y-intercept, 38.2, would be the sales on a day with a high of zero degrees. But zero is outside the data, from 12 to 32, so reading it is an extrapolation too, and it may not be reliable.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Keep every digit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep every digit', md: 'Substitute into the equation exactly as given, and round only the final answer. Rounding along the way can change the answer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 0.0015x^2 - 0.21x + 13.4', '0.0015(100)^2 - 0.21(100) + 13.4 = 15 - 21 + 13.4 = \\good{7.4}', '0.002(100)^2 - 0.21(100) + 13.4 = 20 - 21 + 13.4 = \\bad{12.4}'] },
      ],
      lines: [
        { say: 'One more tip. Substitute into the equation exactly as it is given, and round only the final answer.', show: 'tip' },
        { say: 'Take the fuel model from the last part, y equals 0.0015 x squared, minus 0.21 x, plus 13.4, at 100 kilometres per hour.', show: 'm.0', focus: 'm.0' },
        { say: 'With every digit, the fuel use is 15, minus 21, plus 13.4, which is 7.4.', show: 'm.1', focus: 'm.1' },
        { say: 'But round 0.0015 to 0.002 first, and you get 20, minus 21, plus 13.4: 12.4. A tiny rounding in a coefficient made the answer far too big.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Data for $x$ from $10$ to $50$ give the linear model $y = 2.5x + 12$. Estimate $y$ when $x = 30$. Is this interpolation or extrapolation?',
          choices: ['$87$; extrapolation', '$87$; interpolation', '$75$; interpolation', '$435$; interpolation'],
          answer: 1,
          working: '$y = 2.5(30) + 12 = 75 + 12 = 87$. Since $30$ is between $10$ and $50$, inside the data, this is interpolation.',
        },
      ],
      lines: [
        { say: 'Your turn. Data for x from ten to 50 give the linear model y equals 2.5 x plus twelve. Estimate y when x is 30. Is this interpolation or extrapolation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. 2.5 times 30 is 75, and 75 plus twelve is 87. Thirty is between ten and 50, inside the data, so this is interpolation. Choice A has the right number, but calls it extrapolation.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Interpolation estimates inside the range of the data: usually reliable.', 'Extrapolation predicts outside it: less reliable the further it goes.', 'The slope of a linear model is the change in $y$ for each increase of $1$ in $x$.', 'Substitute exactly as given, and round only at the end.'] }],
      lines: [
        { say: 'Let’s sum up. Interpolation estimates a value inside the range of the data, and it is usually reliable.', show: 'sum.0' },
        { say: 'Extrapolation predicts a value outside that range, and it is less reliable the further it goes.', show: 'sum.1' },
        { say: 'The slope of a linear model is the change in y for each increase of one in x.', show: 'sum.2' },
        { say: 'And substitute exactly as given, rounding only at the end. In the next part, we use quadratic and cubic models. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
