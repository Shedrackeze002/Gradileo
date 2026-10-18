import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, guide, hline, numbers, playersData, playersModel, scatter, tag } from './lib/m302-5-graphs.ts';

// The game model carried on to 24 months.
const pl = plane({ name: 'p', x: [0, 26], y: [0, 240], xStep: 2, yStep: 20, every: 0, width: 9, height: 7, titles: { x: '\\text{Months since launch}', y: '\\text{Players (thousands)}' } });

// The ball: data for the first 2.5 s, then the model carried on below the ground.
const ba = plane({ name: 'b', x: [0, 4.5], y: [-20, 15], xStep: 0.5, yStep: 5, every: 0, width: 8, height: 7, titles: { y: '\\text{Height (m)}' } });
const ball = (x: number) => -4.9 * x * x + 15 * x + 1.5;

const video: Explainer = {
  id: 'm302-5-2-d',
  lessonId: 'm302-5-2',
  title: 'Modelling Data with Polynomial Functions, Part 4: Is the Prediction Reasonable?',
  thumbnailTitle: 'Is the Prediction Reasonable?',
  thumbnail: 'bl',
  summary: 'Why a regression equation only describes the data it came from: a cubic model of a game’s players predicts about 222.8 thousand after 24 months, and a ball’s height model gives −16.9 m after 4 s. Checking every prediction for whether it makes sense in the situation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 4', title: 'Is the Prediction Reasonable?', subtitle: 'When a good fit gives a bad answer' }],
      lines: [
        { say: 'A model can fit its data beautifully, and still give an answer that makes no sense.', show: 'title' },
        { say: 'In this video, you will make predictions far outside the data, and decide whether they are reasonable.' },
      ],
    },
    {
      chapter: 'Only the data it came from',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A model has limits', md: 'A regression equation only describes the data it came from. Far outside that range, the curve keeps going, but the real situation may not.' },
      ],
      lines: [
        { say: 'A regression equation only describes the data it came from. Inside that range, it has been checked against real values.', show: 'key' },
        { say: 'Far outside that range, the curve keeps going, because an equation has no idea what it describes. But the real situation may change, stop or turn around. Let’s see two examples.' },
      ],
    },
    {
      chapter: 'Players after two years',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('pl', [
          pl,
          numbers(pl, 4, 40),
          band(pl, 'data', 0, 18),
          hline(pl, 'top', 69.42, 'muted'),
          tag(pl, 'top-t', 1, 69.42, '\\text{highest in data}', 'above right', 'muted'),
          scatter(pl, 'pts', playersData),
          plot(pl, { id: 'curve', f: playersModel, from: 0, to: 18, tone: 'opp', samples: 200 }),
          plot(pl, { id: 'ext', f: playersModel, from: 18, to: 24, tone: 'opp', dashed: true, samples: 60 }),
          guide(pl, 'g', [24, 0], [24, playersModel(24)], 'bad', { group: 'pred' }),
          dots(pl, [{ id: 'P', x: 24, y: playersModel(24), tex: '(24, 222.8)', tone: 'bad', place: 'left', group: 'pred' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 0.06x^3 - 1.6x^2 + 13x + 3', 'x = 24\\colon', 'y = 829.44 - 921.6 + 312 + 3', 'y \\approx 222.8'] }],
      lines: [
        { say: 'Remember the game company’s cubic model. It was built from the first 18 months after launch.', show: ['pl.p-grid', 'pl.p-axes', 'pl.p-data', 'pl.p-pts', 'pl.p-curve', 'm.0'], focus: 'pl.p-data' },
        { say: 'Use it to predict the number of players 24 months after launch. Substitute 24 for x.', show: 'm.1', focus: 'm.1' },
        { say: '0.06 times 24 cubed is 829.44. 1.6 times 24 squared is 921.6. And 13 times 24 is 312. Add them up, with the three, and y is about 222.8: about 222.8 thousand players.', show: ['m.2', 'm.3', 'pl.p-ext', 'pl.p-pred'], focus: ['m.3', 'pl.p-P'] },
        { say: 'That is more than three times the highest value in the data, about 69 thousand. The right end of the cubic shoots up, because a cubic with a positive leading coefficient rises forever.', show: ['pl.p-top', 'pl.p-top-t'], focus: ['pl.p-top', 'pl.p-ext'] },
        { say: 'But a game cannot keep growing like that forever. The prediction is not reasonable, because it uses the model far outside the data.' },
      ],
    },
    {
      chapter: 'A thrown ball',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('bl', [
          ba,
          numbers(ba, 1, 5),
          band(ba, 'data', 0, 2.5),
          plot(ba, { id: 'curve', f: ball, from: 0, to: 2.5, tone: 'opp', samples: 120 }),
          plot(ba, { id: 'ext', f: ball, from: 2.5, to: 4.5, tone: 'opp', dashed: true, samples: 120 }),
          tag(ba, 'ground', 0.05, 0, '\\text{ground}', 'below right', 'good'),
          guide(ba, 'g', [4, 0], [4, ball(4)], 'bad', { group: 'pred' }),
          dots(ba, [{ id: 'P', x: 4, y: ball(4), tex: '(4, -16.9)', tone: 'bad', place: 'left', group: 'pred' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -4.9x^2 + 15x + 1.5', 'x = 4\\colon', 'y = -78.4 + 60 + 1.5', 'y = -16.9'] }],
      lines: [
        { say: 'Second example. A ball is thrown, and its height in metres, x seconds later, is modelled by y equals negative 4.9 x squared, plus 15 x, plus 1.5. The data cover the first 2.5 seconds.', show: ['bl.b-grid', 'bl.b-axes', 'bl.b-data', 'bl.b-curve', 'm.0'], focus: ['m.0', 'bl.b-data'] },
        { say: 'Predict the height four seconds after the throw. Substitute four for x.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative 4.9 times 16 is negative 78.4, and 15 times four is 60. With the 1.5, the total is negative 16.9 metres.', show: ['m.2', 'm.3', 'bl.b-ext', 'bl.b-pred', 'bl.b-ground'], focus: ['m.3', 'bl.b-P'] },
        { say: 'A ball cannot be 16.9 metres below the ground. The curve keeps going down, but the real ball has already landed, a little after three seconds. So this prediction is not reasonable either.', focus: ['bl.b-ext', 'bl.b-ground'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trusting a good fit everywhere', md: 'A curve that fits the data closely can still give impossible predictions outside the data, such as negative heights, populations or sales.' },
        { kind: 'bullets', id: 'b', items: ['Is the $x$-value inside the data, or outside it?', 'Is the answer possible in the situation?', 'Would the pattern really carry on that far?'] },
      ],
      lines: [
        { say: 'The mistake is to trust a good fit everywhere. A curve that fits the data closely can still give impossible predictions outside the data, such as negative heights, populations or sales.', show: 'oops' },
        { say: 'So check every prediction. Is the x-value inside the data, or outside it?', show: 'b.0' },
        { say: 'Is the answer even possible in the situation?', show: 'b.1' },
        { say: 'And would the pattern really carry on that far? If any answer is no, say that the prediction is not reasonable, and why.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model for the number of fish in a pond, from data for years $0$ to $6$, is $y = -15x^2 + 90x + 400$. For year $10$ it gives $y = -200$. What does this tell you?',
          choices: ['The prediction is not reasonable: year 10 is far outside the data.', 'The pond will have 200 fewer fish than at the start.', 'The model must be wrong for years 0 to 6 as well.', 'The prediction is reasonable, because the model fits the data.'],
          answer: 0,
          working: 'A pond cannot hold a negative number of fish. Year $10$ is outside the data (years $0$ to $6$), so this extrapolation uses the model where it does not apply.',
        },
      ],
      lines: [
        { say: 'Your turn. A model for the number of fish in a pond, from data for years zero to six, is y equals negative 15 x squared, plus 90 x, plus 400. For year ten it gives negative 200. What does this tell you? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A pond cannot hold a negative number of fish. Year ten is outside the data, so the model is being used where it does not apply. Choice D trusts a good fit everywhere: fitting the data closely says nothing about years far outside it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A regression equation only describes the data it came from.', 'Far outside the data, a curve can give impossible values.', 'Check every prediction: inside or outside the data, and possible or not.'] }],
      lines: [
        { say: 'Let’s sum up. A regression equation only describes the data it came from.', show: 'sum.0' },
        { say: 'Far outside the data, the curve keeps going, and it can give impossible values, like negative heights.', show: 'sum.1' },
        { say: 'So check every prediction: is it inside or outside the data, and is it possible in the situation? Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
