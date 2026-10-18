import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { degTex, edgeNumbers, hline, span, steps } from './lib/m302-7-graphs.ts';

const PI = Math.PI;
/** y = 3 sin(2x) + 4, with x in degrees. */
const f = (x: number) => 3 * Math.sin((2 * x * PI) / 180) + 4;
const g = plane({ x: [0, 360], y: [0, 8], xStep: 45, yStep: 1, every: 0, width: 7.2, height: 3.6 });

type Feature = 'mid' | 'up' | 'down' | 'tot' | 'per' | 'max' | 'min';

/** The graph with the features a scene uses (all of them shown at once on the thumbnail). */
const graph = (id: string, use: Feature[], sparse = false) =>
  figure(id, [
    g,
    // The amplitude needs only the levels 1, 4 and 7 (and fewer numbers keep the thumbnail clear).
    sparse ? edgeNumbers(g, { xs: steps(0, 360, 90), ys: [1, 4, 7], xTex: degTex }) : edgeNumbers(g, { xs: steps(0, 360, 45), ys: steps(0, 8, 1), xTex: degTex }),
    ...(use.includes('mid') ? [hline(g, { id: 'mid', y: 4, tone: 'adj' })] : []),
    plot(g, { id: 'curve', f, samples: 300 }),
    ...(use.includes('up') ? [span(g, { id: 'up', from: [45, 4], to: [45, 7], label: '3', place: 'right' })] : []),
    ...(use.includes('down') ? [span(g, { id: 'down', from: [135, 4], to: [135, 1], label: '3', place: 'right' })] : []),
    ...(use.includes('tot') ? [span(g, { id: 'tot', from: [135, 1], to: [135, 7], label: '6', labelAt: 0.72, place: 'right', tone: 'bad' })] : []),
    ...(use.includes('per') ? [span(g, { id: 'per', from: [45, 7], to: [225, 7], label: '180^\\circ', place: 'below' })] : []),
    dots(g, [
      ...(use.includes('max') ? [{ id: 'M1', x: 45, y: 7, tone: 'good' as const, group: 'max' }, { id: 'M2', x: 225, y: 7, tone: 'good' as const, group: 'max' }] : []),
      ...(use.includes('min') ? [{ id: 'N1', x: 135, y: 1, tone: 'opp' as const, group: 'min' }, { id: 'N2', x: 315, y: 1, tone: 'opp' as const, group: 'min' }] : []),
    ]),
  ]);

const video: Explainer = {
  id: 'm302-7-1-b',
  lessonId: 'm302-7-1',
  title: 'Periodic Behaviour and Sinusoidal Functions, Part 2: Reading a Sinusoidal Graph',
  thumbnailTitle: 'Reading a Sinusoidal Graph',
  thumbnail: 'amp',
  summary: 'Reading the maximum, minimum, midline, amplitude and period from the graph of y = 3 sin(2x) + 4 in degrees: maximum 7, minimum 1, midline y = (7 + 1)/2 = 4, amplitude (7 − 1)/2 = 3 and period 225° − 45° = 180°, and why the amplitude is half the height of the wave.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 2', title: 'Reading a Sinusoidal Graph', subtitle: 'Maximum, minimum, midline, amplitude and period' }],
      lines: [
        { say: 'Every sinusoidal graph is a wave that rises to the same highest value and falls to the same lowest value, over and over again.', show: 'title' },
        { say: 'In this video, you will read five features from the graph of a sinusoidal function: its maximum, its minimum, its midline, its amplitude and its period.' },
      ],
    },
    {
      chapter: 'Maximum and minimum',
      layout: 'split',
      leftWidth: 660,
      left: [graph('g', ['max', 'min'])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 3\\sin(2x) + 4', '\\good{\\text{Maximum: } 7}', '\\opp{\\text{Minimum: } 1}'] }],
      lines: [
        { say: 'Here is the graph of y equals three sine two x, plus four, with x in degrees, from zero to 360 degrees.', show: ['g.grid', 'g.axes', 'g.curve', 'm.0'] },
        { say: 'Its highest points are at a height of seven: at 45 degrees, and again at 225 degrees. The highest value of a function is called its maximum. Here, the maximum is seven.', show: ['g.max', 'm.1'], focus: ['g.max', 'm.1'] },
        { say: 'Its lowest points are at a height of one: at 135 degrees, and at 315 degrees. The lowest value is called the minimum. Here, the minimum is one.', show: ['g.min', 'm.2'], focus: ['g.min', 'm.2'] },
      ],
    },
    {
      chapter: 'The midline',
      layout: 'split',
      leftWidth: 660,
      left: [graph('g', ['mid', 'max', 'min'])],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'The **midline** is the horizontal line halfway between the maximum and the minimum.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{\\text{max} + \\text{min}}{2}', 'y = \\dfrac{7 + 1}{2} = 4'] },
      ],
      lines: [
        { say: 'The midline is the horizontal line halfway between the maximum and the minimum.', show: ['g.grid', 'g.axes', 'g.curve', 'g.max', 'g.min', 't'] },
        { say: 'To find it, add the maximum and the minimum, and divide by two, just like finding an average.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven plus one is eight, and eight divided by two is four. So the midline is the line y equals four.', show: ['m.1', 'g.mid'], focus: ['m.1', 'g.mid'] },
        { say: 'The wave rises above the midline and falls below it by the same amount, so the midline cuts every cycle through the middle.', focus: ['g.mid', 'g.curve'] },
      ],
    },
    {
      chapter: 'The amplitude',
      layout: 'split',
      leftWidth: 660,
      left: [graph('amp', ['mid', 'up', 'down', 'max', 'min'], true)],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'The **amplitude** is the vertical distance from the midline to a maximum.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{amplitude} = \\dfrac{\\text{max} - \\text{min}}{2}', '= \\dfrac{7 - 1}{2} = 3'] },
      ],
      lines: [
        { say: 'The amplitude is the vertical distance from the midline up to a maximum.', show: ['amp.grid', 'amp.axes', 'amp.curve', 'amp.mid', 'amp.max', 'amp.min', 't'] },
        { say: 'To find it, subtract the minimum from the maximum, and divide by two.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven minus one is six, and six divided by two is three. So the amplitude is three.', show: 'm.1', focus: 'm.1' },
        { say: 'You can see it on the graph: the wave rises three above the midline, from four up to seven, and falls three below it, from four down to one.', show: ['amp.up', 'amp.down'], focus: ['amp.up', 'amp.down'] },
      ],
    },
    {
      chapter: 'The period',
      layout: 'split',
      leftWidth: 660,
      left: [graph('g', ['per', 'max', 'min'])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{max at } 45^\\circ \\text{ and } 225^\\circ}', '225^\\circ - 45^\\circ = 180^\\circ', '\\opp{\\text{min at } 135^\\circ \\text{ and } 315^\\circ}', '315^\\circ - 135^\\circ = 180^\\circ'] }],
      lines: [
        { say: 'The period is the horizontal length of one cycle. Measure it between two matching points, such as one maximum and the next.', show: ['g.grid', 'g.axes', 'g.curve', 'g.max', 'g.min'] },
        { say: 'The maximums are at 45 degrees and at 225 degrees.', show: 'm.0', focus: ['m.0', 'g.max'] },
        { say: 'So one cycle is 225 minus 45, which is 180 degrees long. The period is 180 degrees.', show: ['m.1', 'g.per'], focus: ['m.1', 'g.per'] },
        { say: 'You can check with the minimums, at 135 degrees and 315 degrees: 315 minus 135 is also 180 degrees. The wave repeats every 180 degrees, so it fits two whole cycles between zero and 360 degrees.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3', 'g.min'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 660,
      left: [graph('g', ['mid', 'up', 'tot'])],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Amplitude is half the height', md: 'From the minimum to the maximum, $7 - 1 = 6$, is the **total height** of the wave. The amplitude is half of that: $3$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\bad{7 - 1 = 6}\\ \\text{(height)}', '\\good{\\tfrac{6}{2} = 3}\\ \\text{(amplitude)}'] },
      ],
      lines: [
        { say: 'A common mistake is to give the whole height of the wave as the amplitude.', show: ['g.grid', 'g.axes', 'g.curve', 'g.mid', 'oops'] },
        { say: 'From the minimum, one, up to the maximum, seven, is six. That is the total height of the wave, from its lowest point to its highest point.', show: ['g.tot', 'm.0'], focus: ['g.tot', 'm.0'] },
        { say: 'The amplitude is only half of that, three, because it is measured from the midline, not from the bottom of the wave.', show: ['g.up', 'm.1'], focus: ['g.up', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sinusoidal graph has a maximum value of $10$ and a minimum value of $-2$. What are its midline and amplitude?',
          choices: ['Midline $y = 6$, amplitude $4$', 'Midline $y = 4$, amplitude $12$', 'Midline $y = 6$, amplitude $12$', 'Midline $y = 4$, amplitude $6$'],
          answer: 3,
          working: 'Midline: $y = \\dfrac{10 + (-2)}{2} = \\dfrac{8}{2} = 4$. Amplitude: $\\dfrac{10 - (-2)}{2} = \\dfrac{12}{2} = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sinusoidal graph has a maximum value of ten and a minimum value of negative two. What are its midline and amplitude? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. For the midline, ten plus negative two is eight, and half of eight is four, so the midline is y equals four. For the amplitude, ten minus negative two is twelve, and half of twelve is six. Choice B forgets to divide the height of the wave by two.', show: 'q.answer' },
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
            'The **maximum** and **minimum** are the highest and lowest values.',
            'Midline: $y = \\dfrac{\\text{max} + \\text{min}}{2}$. Amplitude: $\\dfrac{\\text{max} - \\text{min}}{2}$.',
            'The **period** is the distance between matching points, such as two maximums in a row.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The maximum and minimum are the highest and lowest values of the function.', show: 'sum.0' },
        { say: 'The midline is halfway between them: the maximum plus the minimum, over two. The amplitude is the maximum minus the minimum, over two.', show: 'sum.1' },
        { say: 'And the period is the distance between matching points, such as two maximums in a row. In the next part, you will read these features straight from the equation, without drawing the graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
