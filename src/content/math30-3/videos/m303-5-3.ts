import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, drop, guide, line, numbers, tag } from './lib/m303-5-graphs.ts';

// Skid steer bills for 2, 4 and 6 hours: $80 plus $40 an hour.
const g = plane({ x: [0, 8], y: [0, 440], xStep: 1, yStep: 40, every: 0, width: 7, height: 6.5, titles: { x: '\\text{Time (h)}', y: '\\text{Cost (\\$)}' } });
const cost = (h: number) => 40 * h + 80;
const bills = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 80),
    band(g, 'data', 2, 6),
    tag(g, 'data-t', 4, 418, '\\text{data}', 'center', 'adj'),
    line(g, { id: 'fit', m: 40, b: 80, from: 2, to: 6 }),
    line(g, { id: 'lo', m: 40, b: 80, from: 0, to: 2, dashed: true, group: 'ext' }),
    line(g, { id: 'hi', m: 40, b: 80, from: 6, to: 8, dashed: true, group: 'ext' }),
    guide(g, 'up3', [3, 0], [3, cost(3)], 'good', { group: 'at3' }),
    guide(g, 'across3', [3, cost(3)], [0, cost(3)], 'good', { group: 'at3' }),
    guide(g, 'up8', [8, 0], [8, cost(8)], 'opp', { group: 'at8' }),
    dots(g, [2, 4, 6].map((h) => ({ id: `p${h}`, x: h, y: cost(h), tone: 'theta' as const, group: 'pts' }))),
    dots(g, [
      { id: 'P3', x: 3, y: cost(3), tex: '(3, 200)', tone: 'good', place: 'below right', group: 'at3' },
      { id: 'P8', x: 8, y: cost(8), tex: '(8, 400)', tone: 'opp', place: 'above left', group: 'at8' },
      { id: 'P0', x: 0, y: cost(0), tex: '(0, 80)', tone: 'opp', place: 'below right', group: 'at0' },
    ]),
  ]);

const video: Explainer = {
  id: 'm303-5-3',
  lessonId: 'm303-5-3',
  title: 'Interpolating and Extrapolating, Part 1: Interpolation and Extrapolation',
  thumbnailTitle: 'Interpolation and Extrapolation',
  thumbnail: 'sk',
  summary: 'Interpolation (estimating between the data) and extrapolation (estimating beyond it, assuming the trend continues), read from a graph of skid steer bills for 2, 4 and 6 hours: a 3-hour rental costs about $200, checked with the rate of $40 an hour, while 8 hours ($400) and 0 hours ($80) are extrapolations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'Interpolation and Extrapolation', subtitle: 'Estimating values you never measured' }],
      lines: [
        { say: 'A graph or an equation lets you estimate values you never measured: the cost of a three-hour rental when you only have bills for two, four and six hours, or the time when a tank will run dry.', show: 'title' },
        { say: 'In this video, you will learn the two kinds of estimate, interpolation and extrapolation, and read both from a graph.' },
      ],
    },
    {
      chapter: 'Two kinds of estimate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interpolation and extrapolation', md: '**Interpolation** estimates a value **between** the data you have. **Extrapolation** estimates a value **beyond** the data, by assuming the trend keeps going.' },
      ],
      lines: [
        { say: 'Interpolation estimates a value between the data you have. The word starts with “inter”, which means between.', show: 'def' },
        { say: 'Extrapolation estimates a value beyond the data, outside its range. It assumes that the trend keeps going the same way. The word starts with “extra”, which means outside.' },
      ],
    },
    {
      chapter: 'Skid steer bills',
      layout: 'split',
      leftWidth: 580,
      left: [drop(bills('sk'), ['at3', 'at8', 'at0'])],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Bills for renting a skid steer for $2$, $4$ and $6$ hours. The solid line covers the data; the dashed parts are extrapolation.' }],
      lines: [
        { say: 'A contractor has bills for renting a skid steer for two, four and six hours. Here they are as points on a graph.', show: ['q', 'sk.grid', 'sk.axes', 'sk.pts'], focus: 'sk.pts' },
        { say: 'The data cover the times from two to six hours. That range is shaded.', show: ['sk.data', 'sk.data-t'], focus: 'sk.data' },
        { say: 'The points line up, so a straight line joins them. The solid part of the line covers the data.', show: 'sk.fit', focus: 'sk.fit' },
        { say: 'The dashed parts carry the line on, below two hours and above six hours. Reading from the dashed parts is extrapolation.', show: 'sk.ext', focus: 'sk.ext' },
      ],
    },
    {
      chapter: 'A 3-hour rental',
      layout: 'split',
      leftWidth: 580,
      left: [bills('sk2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\text{ h is between } 2 \\text{ h and } 6 \\text{ h}', '\\text{read: about } 200 \\text{ dollars}', '\\text{rate} = \\dfrac{240 - 160}{4 - 2} = 40', '160 + 40 = 200 \\;\\checkmark'] }],
      lines: [
        { say: 'Use the graph to estimate the cost of a three-hour rental. Three hours is between two and six hours, inside the data, so this is interpolation.', show: ['sk2.grid', 'sk2.axes', 'sk2.data', 'sk2.fit', 'sk2.ext', 'sk2.pts', 'm.0'], focus: 'm.0' },
        { say: 'Go up from three on the time axis to the line, then across to the cost axis. It reads 200 dollars.', show: ['sk2.at3', 'm.1'], focus: ['sk2.at3', 'm.1'] },
        { say: 'Check with the rate of change. From two hours to four hours, the cost rises from 160 to 240 dollars: 80 dollars over two hours, which is 40 dollars per hour.', show: 'm.2', focus: ['m.2', 'sk2.p2', 'sk2.p4'] },
        { say: 'Three hours is one hour more than two hours, so the cost is 160 plus 40, which is 200 dollars. A three-hour rental costs about 200 dollars.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Beyond the data',
      layout: 'split',
      leftWidth: 580,
      left: [bills('sk3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 \\text{ h: about } 400 \\text{ dollars}', '0 \\text{ h: } 80 \\text{ dollars}', '\\text{both: extrapolation}'] }],
      lines: [
        { say: 'Now estimate the cost for eight hours. Eight hours is beyond the data, so the estimate comes from the dashed part of the line. This is extrapolation.', show: ['sk3.grid', 'sk3.axes', 'sk3.data', 'sk3.fit', 'sk3.ext', 'sk3.pts'], focus: 'sk3.hi' },
        { say: 'Up from eight hours, the dashed line reaches 400 dollars. Each extra hour adds another 40 dollars, so eight hours costs about 400 dollars, if the shop’s pricing stays the same.', show: ['sk3.at8', 'm.0'], focus: ['sk3.at8', 'm.0'] },
        { say: 'Following the line back to zero hours gives 80 dollars, the shop’s flat fee. That is outside the data too, so it is also an extrapolation.', show: ['sk3.at0', 'm.1', 'm.2'], focus: ['sk3.P0', 'm.1'] },
      ],
    },
    {
      chapter: 'Which is safer?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Inside or outside the data', md: 'Interpolation is usually safe: there are real data on both sides. Extrapolation assumes nothing changes, so it needs good judgment, especially far from the data.' },
      ],
      lines: [
        { say: 'Interpolation is usually safe. There are real data on both sides of the estimate, so the line has been checked all around it.', show: 'key' },
        { say: 'Extrapolation assumes that nothing changes beyond the data. For a rental shop with a fixed price list, that is reasonable. But going far beyond the data needs good judgment, and the last part of this lesson shows how to decide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tree’s height was measured every year from age $10$ to age $40$. Which estimate is an interpolation?',
          choices: ['Its height at age $50$', 'Its height at age $5$', 'Its height at age $25$', 'Its height when planted, at age $0$'],
          answer: 2,
          working: 'Age $25$ is between $10$ and $40$, inside the data, so the estimate is an interpolation. The other three ages are outside the data.',
        },
      ],
      lines: [
        { say: 'Your turn. A tree’s height was measured every year from age ten to age 40. Which estimate is an interpolation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Twenty-five is between ten and 40, inside the data, so estimating there is interpolation. Choice D, age zero, is below the data, so it is an extrapolation, like reading the flat fee off the dashed part of the line.', show: 'q.answer' },
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
          items: ['Interpolation estimates **between** the data values.', 'Extrapolation estimates **beyond** them, assuming the trend continues.', 'On a graph: go up from the axis to the line, then across.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Interpolation estimates a value between the data values.', show: 'sum.0' },
        { say: 'Extrapolation estimates a value beyond them, assuming the trend continues.', show: 'sum.1' },
        { say: 'And on a graph, go up from the axis to the line, then across to read the value. In the next part, we extrapolate with the rate of change and with an equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
