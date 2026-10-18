import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, ferrisWheel, hline, note, retitle, span, steps } from './lib/m302-7-graphs.ts';

const PI = Math.PI;

/** The depth at the dock t hours after 4:00 a.m.: high tide 7.2 m at t = 0, low tide 1.6 m at t = 6.2. */
const depth = (t: number) => 2.8 * Math.cos((2 * PI * t) / 12.4) + 4.4;
const g = retitle(plane({ x: [0, 13], y: [0, 9], xStep: 1, yStep: 1, every: 0, width: 7, height: 3.8, titles: { y: 'd\\text{ (m)}' } }), 't\\text{ (h)}');

const wheel = () => figure('w', [ferrisWheel({ r: 25, c: 27, labels: { r: '25', low: '2\\text{ m}', mid: '27\\text{ m}', top: '52\\text{ m}' } })]);

const video: Explainer = {
  id: 'm302-7-1-e',
  lessonId: 'm302-7-1',
  title: 'Periodic Behaviour and Sinusoidal Functions, Part 5: Sinusoidal Situations',
  thumbnailTitle: 'Sinusoidal Situations',
  thumbnail: 'g',
  summary: 'Finding the amplitude, midline and period of real periodic situations from their description: a tide with high water 7.2 m at 4:00 a.m. and low water 1.6 m 6.2 hours later (amplitude 2.8 m, midline 4.4, period 12.4 h, next high tide at 4:24 p.m.), sketched inside a frame, and a Ferris wheel 50 m across, boarded 2 m above the ground.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 5', title: 'Sinusoidal Situations', subtitle: 'Tides and Ferris wheels' }],
      lines: [
        { say: 'Tides, Ferris wheels and the seasons all follow sinusoidal patterns. In a real situation, the features of the wave come from the description, not from an equation.', show: 'title' },
        { say: 'In this video, you will find the amplitude, midline and period of two real situations: the tide at a dock, and a ride on a Ferris wheel.' },
      ],
    },
    {
      chapter: 'Features in context',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The **maximum** and **minimum** come from the description: the highest and lowest values.',
            'Midline $y = \\dfrac{\\text{max} + \\text{min}}{2}$; amplitude $= \\dfrac{\\text{max} - \\text{min}}{2}$.',
            'The **period** is the time for one full cycle.',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Sketch the frame first', md: 'Draw the maximum, minimum and midline as horizontal lines, mark one period along the time axis, and then fit the wave inside that frame.' },
      ],
      lines: [
        { say: 'In context, the maximum and minimum usually come straight from the description: the highest and lowest values of the quantity.', show: 'b.0' },
        { say: 'The midline and amplitude follow from them, exactly as on a graph: the midline is their average, and the amplitude is half their difference.', show: 'b.1' },
        { say: 'And the period is the time for one full cycle: from one high point to the next.', show: 'b.2' },
        { say: 'To picture the situation, sketch the frame first. Draw the maximum, minimum and midline as horizontal lines, mark one period along the time axis, and then fit the wave inside that frame.', show: 'tip' },
      ],
    },
    {
      chapter: 'High and low tide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At a dock in Saint John, high tide is at 4:00 a.m. with a depth of 7.2 m. The next low tide is 6.2 hours later, with a depth of 1.6 m. Find the amplitude, the midline, the period and the time of the next high tide.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{amplitude} = \\dfrac{7.2 - 1.6}{2} = 2.8\\text{ m}', '\\text{midline: } y = \\dfrac{7.2 + 1.6}{2} = 4.4', '\\text{period} = 2 \\times 6.2 = 12.4\\text{ h}'] },
      ],
      lines: [
        { say: 'At a dock in Saint John, high tide is at four a.m., with a depth of 7.2 metres. The next low tide is 6.2 hours later, with a depth of 1.6 metres. Find the amplitude, the midline, the period, and the time of the next high tide.', show: 'p' },
        { say: 'The maximum depth is 7.2 metres, at high tide, and the minimum is 1.6 metres, at low tide. So the amplitude is 7.2 minus 1.6, which is 5.6, divided by two: 2.8 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The midline is 7.2 plus 1.6, which is 8.8, divided by two: y equals 4.4.', show: 'm.1', focus: 'm.1' },
        { say: 'Careful with the period. From high tide to the next low tide is only half a cycle: the water still has to come back up. So the period is two times 6.2, which is 12.4 hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Sketch the frame',
      layout: 'split',
      leftWidth: 640,
      left: [
        figure('g', [
          g,
          edgeNumbers(g, { xs: steps(0, 12, 2), ys: steps(0, 8, 2), xTex: String }),
          hline(g, { id: 'max', y: 7.2, tone: 'good', group: 'frame' }),
          hline(g, { id: 'mid', y: 4.4, tone: 'adj', group: 'frame' }),
          hline(g, { id: 'min', y: 1.6, tone: 'opp', group: 'frame' }),
          note(g, { id: 'max-t', x: 3.1, y: 7.75, tex: '7.2', tone: 'good', group: 'frame' }),
          note(g, { id: 'mid-t', x: 6.2, y: 4.95, tex: '4.4', tone: 'adj', group: 'frame' }),
          note(g, { id: 'min-t', x: 9.9, y: 1.05, tex: '1.6', tone: 'opp', group: 'frame' }),
          span(g, { id: 'per', from: [0, -2.1], to: [12.4, -2.1], label: '12.4\\text{ h}', place: 'below' }),
          plot(g, { id: 'curve', f: depth, from: 0, to: 13, samples: 300 }),
          dots(g, [
            { id: 'H1', x: 0, y: 7.2, tone: 'good', group: 'pts' },
            { id: 'L', x: 6.2, y: 1.6, tone: 'opp', group: 'pts' },
            { id: 'H2', x: 12.4, y: 7.2, tone: 'good', group: 'pts' },
          ]),
          note(g, { id: 'when', x: 11.2, y: 8.4, tex: '\\text{4:24 p.m.}', tone: 'good' }),
        ]),
      ],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$t$ = hours after 4:00 a.m.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0.4\\text{ h} = 0.4 \\times 60 = 24\\text{ min}', '12.4\\text{ h} = 12\\text{ h } 24\\text{ min}', '\\text{4:00 a.m.} + 12\\text{ h } 24\\text{ min}', '= \\text{4:24 p.m.}'] },
      ],
      lines: [
        { say: 'Now sketch it. First draw the frame: the maximum, 7.2, the midline, 4.4, and the minimum, 1.6, as horizontal lines.', show: ['g.grid', 'g.axes', 'g.frame'], focus: 'g.frame' },
        { say: 'Then mark one period, 12.4 hours, along the time axis. Here, t is the number of hours after four a.m.', show: ['g.per', 't'], focus: 'g.per' },
        { say: 'Fit the wave inside the frame: high tide at time zero, low tide 6.2 hours later, and high tide again after one full period.', show: ['g.curve', 'g.pts'], focus: ['g.curve', 'g.pts'] },
        { say: 'So the next high tide is 12.4 hours after four a.m. 0.4 hours is 0.4 times sixty minutes, which is 24 minutes. So 12.4 hours is twelve hours and 24 minutes.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Twelve hours after four a.m. is four p.m., and 24 minutes later is four twenty-four p.m. The next high tide is at four twenty-four p.m.', show: ['m.2', 'm.3', 'g.when'], focus: ['m.3', 'g.H2', 'g.when'] },
      ],
    },
    {
      chapter: 'A Ferris wheel',
      layout: 'split',
      leftWidth: 540,
      left: [wheel()],
      right: [
        { kind: 'text', id: 'p', size: 'md', md: 'A Ferris wheel has a diameter of 50 m, riders board from a platform 2 m above the ground, and one rotation takes 60 s. Find the maximum height, the amplitude, the midline and the period.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\max = 2 + 50 = 52\\text{ m}', '\\text{amplitude} = 25\\text{ m}', '\\text{midline: } y = 2 + 25 = 27', '\\text{period} = 60\\text{ s}'] },
      ],
      lines: [
        { say: 'A Ferris wheel has a diameter of fifty metres. Riders board from a platform two metres above the ground, and one rotation takes sixty seconds. Find the maximum height, the amplitude, the midline and the period.', show: ['p', 'w.ground', 'w.spokes', 'w.wheel', 'w.hub', 'w.platform'] },
        { say: 'The lowest point of the ride is at the platform, two metres above the ground.', show: 'w.low-all', focus: 'w.low-all' },
        { say: 'The highest point is a whole diameter higher: two plus fifty, which is 52 metres. That is the maximum.', show: ['w.top-all', 'm.0'], focus: ['w.top-all', 'm.0'] },
        { say: 'The amplitude is half the distance from the lowest point to the highest: half of fifty, which is the radius of the wheel, 25 metres.', show: ['w.r', 'm.1'], focus: ['w.r', 'm.1'] },
        { say: 'The midline is the height of the centre of the wheel: two plus 25, so y equals 27. As a check, the average of 52 and two is also 27.', show: ['w.mid-all', 'm.2'], focus: ['w.mid-all', 'm.2'] },
        { say: 'And one rotation takes sixty seconds, so the period is sixty seconds.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A Ferris wheel has a diameter of $30$ m. Riders board $3$ m above the ground, and one rotation takes $80$ s. What is the midline of a rider’s height?',
          choices: ['$y = 15$', '$y = 18$', '$y = 33$', '$y = 16.5$'],
          answer: 1,
          working: 'The radius is $15$ m, so the centre of the wheel is $3 + 15 = 18$ m above the ground. Check: the maximum is $3 + 30 = 33$ and $\\dfrac{33 + 3}{2} = 18$.',
        },
      ],
      lines: [
        { say: 'Your turn. A Ferris wheel has a diameter of thirty metres. Riders board three metres above the ground, and one rotation takes eighty seconds. What is the midline of a rider’s height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The radius is fifteen metres, so the centre of the wheel is three plus fifteen, which is eighteen metres above the ground. Choice A is the radius: that is the amplitude, not the midline.', show: 'q.answer' },
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
            'Read the maximum and minimum from the description; the midline and amplitude follow from them.',
            'High tide to low tide is **half** a cycle, so the period is twice that time.',
            'A Ferris wheel: amplitude = radius, midline = height of the centre, period = time for one rotation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In context, read the maximum and minimum from the description. The midline and amplitude follow from them, and a sketch inside a frame shows the whole cycle.', show: 'sum.0' },
        { say: 'From high tide to low tide is only half a cycle, so the period is twice that time.', show: 'sum.1' },
        { say: 'And for a Ferris wheel, the amplitude is the radius, the midline is the height of the centre, and the period is the time for one rotation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
