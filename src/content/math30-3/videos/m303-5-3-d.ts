import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, line, numbers, tag } from './lib/m303-5-graphs.ts';

// A calf: 40 kg at birth, gaining about 6 kg a week for its first 10 weeks. The real growth
// curve is only a sketch of the shape (fast at first, then slower), so it carries no numbers.
const g = plane({ x: [0, 60], y: [0, 400], xStep: 10, yStep: 50, every: 0, width: 7.5, height: 6.5, titles: { x: '\\text{Age (weeks)}', y: '\\text{Mass (kg)}' } });
const calf = (id: string) =>
  figure(id, [
    g,
    numbers(g, 10, 100),
    band(g, 'data', 0, 10),
    tag(g, 'data-t', 5, 372, '\\text{data}', 'center', 'adj'),
    line(g, { id: 'fit', m: 6, b: 40, from: 0, to: 10 }),
    line(g, { id: 'ext', m: 6, b: 40, from: 10, to: 60, dashed: true }),
    tag(g, 'ext-t', 41, 286, 'M = 6w + 40', 'above left', 'brand'),
    plot(g, { id: 'real', f: (w) => 40 + 240 * (1 - Math.exp(-w / 40)), from: 0, to: 60, tone: 'good', samples: 120 }),
    tag(g, 'real-t', 49, 178, '\\text{growth slows}', 'below', 'good'),
  ]);

const video: Explainer = {
  id: 'm303-5-3-d',
  lessonId: 'm303-5-3',
  title: 'Interpolating and Extrapolating, Part 4: When Is Extrapolation Reasonable?',
  thumbnailTitle: 'Is the Prediction Reasonable?',
  thumbnail: 'cf',
  summary: 'Two questions decide whether an extrapolation is reasonable: does the situation stay the same, and is the answer possible? A calf’s first 10 weeks (M = 6w + 40) predict 3,160 kg at 10 years, which is not reasonable; a tank model gives negative fuel; but a 5-hour bill from a fixed pricing rule is a fair prediction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Is the Prediction Reasonable?', subtitle: 'When extrapolation works, and when it does not' }],
      lines: [
        { say: 'Extrapolation assumes that the trend keeps going. Sometimes it does, and the prediction is useful. Sometimes it does not, and the prediction is nonsense.', show: 'title' },
        { say: 'In this video, you will learn two questions to ask before you trust an extrapolation.' },
      ],
    },
    {
      chapter: 'Two questions',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Does the situation stay the same?** A rental shop’s prices stay the same for a longer job. A calf’s growth slows as it matures.',
            '**Is the answer even possible?** A tank cannot hold negative fuel, and nobody is $4$ m tall.',
          ],
        },
      ],
      lines: [
        { say: 'Extrapolation assumes that nothing changes. So ask two questions.', show: 'b' },
        { say: 'First, does the situation stay the same? A rental shop charges the same hourly price for a longer job, so its line keeps going. But a young animal’s growth slows down as it matures, so its line does not.', focus: 'b.0' },
        { say: 'Second, is the answer even possible? A tank cannot hold a negative amount of fuel, and no person is four metres tall. An impossible answer means the model has been pushed too far.', focus: 'b.1' },
      ],
    },
    {
      chapter: 'A growing calf',
      layout: 'split',
      leftWidth: 600,
      left: [calf('cf')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A calf gained about $6$ kg a week from a birth mass of $40$ kg in its first $10$ weeks. Predict its mass at $10$ years ($520$ weeks).' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['M = 6(520) + 40', 'M = 3120 + 40 = 3160 \\text{ kg}'] },
      ],
      lines: [
        { say: 'A calf gained about six kilograms a week, from a birth mass of 40 kilograms, in its first ten weeks. So its mass M after w weeks is M equals six w, plus 40.', show: ['q', 'cf.grid', 'cf.axes', 'cf.data', 'cf.data-t', 'cf.fit'], focus: 'cf.fit' },
        { say: 'Use the equation to predict its mass at ten years, which is 520 weeks.', show: ['cf.ext', 'cf.ext-t'], focus: 'cf.ext' },
        { say: 'Six times 520 is 3,120, and 3,120 plus 40 is 3,160 kilograms. Is this reasonable?', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'split',
      leftWidth: 600,
      left: [calf('cf2')],
      right: [
        { kind: 'bullets', id: 'b', items: ['$520$ weeks is far beyond the $10$ weeks of data.', 'Calves grow fast at first, then slower.', 'A full-grown cow is a fraction of $3160$ kg.'] },
        { kind: 'callout', id: 'no', tone: 'mistake', title: 'Not reasonable', md: 'The trend from the first $10$ weeks does not continue for years.' },
      ],
      lines: [
        { say: 'No. First, 520 weeks is far beyond the ten weeks of data.', show: ['cf2.grid', 'cf2.axes', 'cf2.data', 'cf2.data-t', 'cf2.fit', 'cf2.ext', 'cf2.ext-t', 'b.0'], focus: 'cf2.data' },
        { say: 'Second, the situation does not stay the same. Calves grow fast at first, then slower and slower as they mature. Their real growth curves bend away from the straight line, like this.', show: ['cf2.real', 'cf2.real-t', 'b.1'], focus: 'cf2.real' },
        { say: 'And a full-grown cow has a mass that is only a fraction of 3,160 kilograms. The trend from the first ten weeks does not continue for years, so the prediction is not reasonable.', show: ['b.2', 'no'] },
      ],
    },
    {
      chapter: 'Is the answer possible?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A tractor’s diesel is $V = 400 - 18h$. How much is left after $30$ hours of work?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V = 400 - 18(30) = 400 - 540 = {-140} \\text{ L}'] },
        { kind: 'callout', id: 'imp', tone: 'key', title: 'Impossible', md: 'A tank cannot hold $-140$ L. The model only works until the tank is empty, after about $22.2$ hours.' },
      ],
      lines: [
        { say: 'Now the second question. A tractor’s diesel is V equals 400 minus eighteen h. How much is left after 30 hours of work?', show: 'q' },
        { say: 'Eighteen times 30 is 540, and 400 minus 540 is negative 140 litres.', show: 'm', focus: 'm' },
        { say: 'That is impossible: a tank cannot hold a negative amount of fuel. The model only works until the tank is empty, after about 22.2 hours. Beyond that, the tractor simply stops.', show: 'imp' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '“Never extrapolate”', md: 'Extrapolation is not always wrong. Predicting a $5$-hour plumbing bill from bills of $1$ to $4$ hours is reasonable, because the pricing rule stays the same.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['C = 95h + 85: \\quad 95(5) + 85 = 475 + 85 = 560'] },
      ],
      lines: [
        { say: 'Do not swing too far the other way, and decide never to extrapolate. Extrapolation is not always wrong.', show: 'oops' },
        { say: 'A plumber charges 85 dollars plus 95 dollars per hour, and you have bills for jobs of one to four hours. A five-hour job costs 95 times five, plus 85, which is 560 dollars.', show: 'm', focus: 'm' },
        { say: 'Five hours is outside the data, but the pricing rule stays the same, so the prediction is reasonable. The danger grows the further you go beyond the data, and the more the situation can change.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A puppy gained about $0.5$ kg a week in its first $12$ weeks, from $1$ kg at birth, so $M = 0.5w + 1$. Which prediction is most reasonable?',
          choices: ['At $520$ weeks: $261$ kg', 'At $14$ weeks: $8$ kg', 'At $200$ weeks: $101$ kg', 'At $-4$ weeks: $-1$ kg'],
          answer: 1,
          working: '$14$ weeks is just past the data, so the puppy is still growing in much the same way: $0.5(14) + 1 = 8$ kg. The others go far beyond the data or give an impossible answer.',
        },
      ],
      lines: [
        { say: 'Your turn. A puppy gained about half a kilogram a week in its first twelve weeks, from one kilogram at birth, so M equals 0.5 w, plus one. Which prediction is most reasonable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Fourteen weeks is only two weeks past the data, so the puppy is still growing in much the same way, and eight kilograms is reasonable. Choice A goes ten years past the data, and no dog has a mass of 261 kilograms.', show: 'q.answer' },
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
          items: ['Ask: does the situation stay the same?', 'Ask: is the answer even possible?', 'A little past the data, with a fixed rule, is reasonable; far past it is risky.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Before you trust an extrapolation, ask: does the situation stay the same?', show: 'sum.0' },
        { say: 'And ask: is the answer even possible?', show: 'sum.1' },
        { say: 'A prediction a little past the data, with a fixed rule, is reasonable. Far past the data, it is risky. That completes this lesson on interpolating and extrapolating. See you in the next one!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
