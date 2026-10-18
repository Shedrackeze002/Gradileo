import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { band, dots, guide, model, numbers, plane, plot, tag } from './lib/m302-6-graphs.ts';

// The club's members, x years after 2018: y = 320(1.18)^x, with data for 2018 to 2024.
const g = plane({ x: [0, 9], y: [0, 1400], yStep: 100, every: 0, width: 8, height: 7, titles: { x: '\\text{Years since 2018}', y: '\\text{Members}' } });
const club = (x: number) => 320 * 1.18 ** x;
const members = () =>
  figure('cl', [
    g,
    numbers(g, 1, 200),
    band(g, 'data', 0, 6),
    tag(g, 'data-t', 3, 1320, '\\text{data}', 'center', 'adj'),
    model(g, { id: 'm', f: club, from: 0, to: 6, end: 8.6 }),
    guide(g, 'g5', [5, 0], [5, club(5)], 'good', { group: 'in' }),
    guide(g, 'g8', [8, 0], [8, club(8)], 'opp', { group: 'out' }),
    dots(g, [
      { id: 'P5', x: 5, y: club(5), tex: '(5, 732)', tone: 'good', place: 'above left', group: 'in' },
      { id: 'P8', x: 8, y: club(8), tex: '(8, 1203)', tone: 'opp', place: 'above left', group: 'out' },
    ]),
  ]);

// Pastries decorated per hour after x days of practice: y = 12.5 + 6.2 ln x.
const p = plane({ name: 'p', x: [0, 30], y: [0, 40], yStep: 5, every: 0, width: 8, height: 7, titles: { x: '\\text{Days of practice}', y: '\\text{Pastries per hour}' } });
const bake = (x: number) => 12.5 + 6.2 * Math.log(x);

const video: Explainer = {
  id: 'm302-6-4-c',
  lessonId: 'm302-6-4',
  title: 'Modelling with Exponential and Logarithmic Functions, Part 3: Using a Regression Equation',
  thumbnailTitle: 'Exponential and Logarithmic Regression',
  thumbnail: 'cl',
  summary: 'Using a given exponential regression equation, y = 320(1.18)ˣ for an online club’s members, to interpolate (about 732 members five years in) and extrapolate (about 1203 members eight years in), and a logarithmic regression, y = 12.5 + 6.2 ln x, for data that rise quickly and then level off.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 3', title: 'Using a Regression Equation', subtitle: 'Exponential and logarithmic models from data' }],
      lines: [
        { say: 'When data grow by about the same percent each step, technology can fit an exponential curve to them. When data rise quickly and then level off, it can fit a logarithmic curve instead.', show: 'title' },
        { say: 'In this video, you will use given regression equations of both kinds to make estimates, and decide how far to trust them.' },
      ],
    },
    {
      chapter: 'Exponential regression',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exponential regression', md: 'Technology can fit an exponential equation $y = a(b)^x$ to data. In this lesson the equation is given: your job is to use it and judge the answer.' },
        { kind: 'text', id: 'q', size: 'md', md: 'An online gaming club tracked its members from 2018 to 2024. Exponential regression gives $y = 320(1.18)^x$, where $x$ is the number of years since 2018.' },
      ],
      lines: [
        { say: 'With technology, you can fit an exponential regression equation, y equals "a" times b to the power x, to a set of data. In this lesson, the equation is always given to you. Your job is to use it, and judge the answer.', show: 'def' },
        { say: 'An online gaming club tracked its members from twenty eighteen to twenty twenty-four. Exponential regression gives y equals 320 times 1.18 to the power x, where x is the number of years since twenty eighteen.', show: 'q' },
        { say: 'Read the model first. The initial value, 320, is about the number of members at the start. The base, 1.18, is one plus 0.18, so the club grew by about eighteen percent a year.' },
      ],
    },
    {
      chapter: 'Inside the data',
      layout: 'split',
      leftWidth: 540,
      left: [members()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2023\\colon\\quad x = 5', 'y = 320(1.18)^{5}', 'y = 732.08\\ldots', '\\text{about 732 members}'] }],
      lines: [
        { say: 'Here is the model. It is solid over the six years of data, and dashed beyond them.', show: ['cl.grid', 'cl.axes', 'cl.data', 'cl.data-t', 'cl.m'] },
        { say: 'Estimate the number of members in twenty twenty-three. That is five years after twenty eighteen, so x is five.', show: 'm.0', focus: 'm.0' },
        { say: 'y equals 320 times 1.18 to the fifth, which is 732.08. You cannot have part of a member, so that is about 732 members.', show: ['m.1', 'm.2', 'm.3', 'cl.in'], focus: ['m.2', 'm.3', 'cl.P5'] },
        { say: 'Twenty twenty-three is inside the data, between twenty eighteen and twenty twenty-four. So this is interpolation, and it is fairly reliable.', focus: ['cl.data', 'cl.P5'] },
      ],
    },
    {
      chapter: 'Outside the data',
      layout: 'split',
      leftWidth: 540,
      left: [members()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2026\\colon\\quad x = 8', 'y = 320(1.18)^{8}', 'y = 1202.8\\ldots', '\\text{about 1203 members}'] }],
      lines: [
        { say: 'Now estimate the members in twenty twenty-six. That is eight years after twenty eighteen, so x is eight.', show: ['cl.grid', 'cl.axes', 'cl.data', 'cl.data-t', 'cl.m', 'm.0'], focus: 'm.0' },
        { say: 'y equals 320 times 1.18 to the eighth, which is 1,202.8: about 1,203 members.', show: ['m.1', 'm.2', 'm.3', 'cl.m-ext', 'cl.out'], focus: ['m.2', 'm.3', 'cl.P8'] },
        { say: 'Twenty twenty-six is outside the data, so this is extrapolation. It is less reliable, because eighteen percent growth a year may not continue. The club might run out of new players to attract, or a new game might draw them away.', focus: ['cl.m-ext', 'cl.P8'] },
      ],
    },
    {
      chapter: 'Logarithmic regression',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('bk', [
          p,
          numbers(p, 5, 10),
          plot(p, { id: 'curve', f: bake, from: 1, to: 30, samples: 200 }),
          guide(p, 'g10', [10, 0], [10, bake(10)], 'good', { group: 'est' }),
          dots(p, [{ id: 'E', x: 10, y: bake(10), tex: '(10, 26.8)', tone: 'good', place: 'below right', group: 'est' }]),
        ]),
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A new baker decorates $y$ pastries per hour after $x$ days: $y = 12.5 + 6.2\\ln x$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 12.5 + 6.2\\ln 10', 'y = 12.5 + 6.2(2.3025\\ldots)', 'y \\approx 26.8'] },
      ],
      lines: [
        { say: 'Some data rise quickly and then level off. They can be modelled by a logarithmic regression: y equals "a" plus b times the natural logarithm of x.', show: ['bk.p-grid', 'bk.p-axes'] },
        { say: 'The natural logarithm is a logarithm with a special base, and your calculator has a key for it: the L N key.' },
        { say: 'For example, a new baker can decorate y pastries per hour after x days, where y equals 12.5 plus 6.2 times the natural log of x.', show: ['q', 'bk.p-curve'], focus: 'bk.p-curve' },
        { say: 'The curve rises quickly at first, while the baker is learning, then levels off. Each extra day of practice adds less and less.' },
        { say: 'After ten days, y equals 12.5 plus 6.2 times the natural log of ten. The natural log of ten is 2.3025, so y is about 26.8 pastries per hour.', show: ['m.0', 'm.1', 'm.2', 'bk.p-est'], focus: ['m.2', 'bk.p-E'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A town’s population is modelled by $y = 4500(1.025)^x$, where $x$ is the number of years since the data began. The data cover 10 years. Estimate the population at $x = 4$, and say whether this is interpolation or extrapolation.',
          choices: ['$4950$; interpolation', '$4967$; extrapolation', '$4967$; interpolation', '$18\\,450$; interpolation'],
          answer: 2,
          working: '$y = 4500(1.025)^4 = 4500(1.10381\\ldots) = 4967.15\\ldots$, about $4967$. Since $4$ is inside the $10$ years of data, this is interpolation.',
        },
      ],
      lines: [
        { say: 'Your turn. A town’s population is modelled by y equals 4,500 times 1.025 to the power x, where x is the number of years since the data began. The data cover ten years. Estimate the population at x equals four, and say whether this is interpolation or extrapolation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. 1.025 to the fourth is about 1.1038, and 4,500 times that is about 4,967. Year four is inside the ten years of data, so this is interpolation. Choice A adds two and a half percent of 4,500 each year, but exponential growth multiplies by 1.025 each year, so each year’s growth is a little bigger than the last.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exponential regression $y = a(b)^x$ fits data that grow or decay by about the same percent each step.', 'A logarithmic regression $y = a + b\\ln x$ fits data that rise quickly and then level off.', 'Interpolation, inside the data, is more reliable than extrapolation, outside it.'] }],
      lines: [
        { say: 'Let’s sum up. An exponential regression fits data that grow or decay by about the same percent each step.', show: 'sum.0' },
        { say: 'A logarithmic regression fits data that rise quickly and then level off. Use the L N key to evaluate it.', show: 'sum.1' },
        { say: 'And an estimate inside the data is more reliable than a prediction outside it. In the next part, we look at logarithmic scales: p H, decibels and earthquakes. See you there!', caption: 'And an estimate inside the data is more reliable than a prediction outside it. In the next part, we look at logarithmic scales: pH, decibels and earthquakes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
