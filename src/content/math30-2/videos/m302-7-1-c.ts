import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { degTex, edgeNumbers, hline, note, steps } from './lib/m302-7-graphs.ts';

const PI = Math.PI;
const rad = (deg: number) => (deg * PI) / 180;

/** y = 3 sin(2x) + 4, the graph read in part 2. */
const f = (x: number) => 3 * Math.sin(rad(2 * x)) + 4;
const g = plane({ x: [0, 360], y: [0, 8], xStep: 45, yStep: 1, every: 0, width: 7.2, height: 3.6 });

/** Two small graphs side by side: a negative "a" flips the wave, and c slides it. */
const pair = [
  ['flip', (x: number) => -3 * Math.sin(rad(2 * x)) + 4, 'opp', 'y = -3\\sin(2x) + 4'],
  ['shift', (x: number) => 3 * Math.sin(rad(2 * x - 90)) + 4, 'adj', 'y = 3\\sin(2x - 90^\\circ) + 4'],
] as const;
const sides = pair.flatMap(([name, h, tone, tex], i) => {
  const p = plane({ name, x: [0, 360], y: [0, 8], xStep: 45, yStep: 1, every: 0, width: 4.6, height: 2.6, at: [i * 6.2, 0] });
  return [
    { ...p, items: p.items.filter((it) => !it.id.endsWith('-name')) },
    edgeNumbers(p, { xs: steps(0, 360, 90), ys: [1, 4, 7], xTex: degTex }),
    hline(p, { id: 'mid', y: 4, tone: 'muted' }),
    plot(p, { id: 'base', f, tone: 'muted', samples: 200 }),
    plot(p, { id: 'new', f: h, tone, samples: 200 }),
    note(p, { id: 'name', x: 180, y: 9.4, tex, tone }),
  ];
});

/** y = −4 cos(3x) + 1. */
const e = (x: number) => -4 * Math.cos(rad(3 * x)) + 1;
const ge = plane({ x: [0, 360], y: [-4, 6], xStep: 30, yStep: 1, every: 0, width: 7.2, height: 4 });

const video: Explainer = {
  id: 'm302-7-1-c',
  lessonId: 'm302-7-1',
  title: 'Periodic Behaviour and Sinusoidal Functions, Part 3: Features from the Equation',
  thumbnailTitle: 'Features from the Equation',
  thumbnail: 'ex',
  summary: 'Reading the features of y = a sin(bx + c) + d straight from the equation: amplitude |a|, period 360°/b, midline y = d, maximum d + |a| and minimum d − |a|. A negative a flips the graph and c slides it sideways, but neither changes these features. Worked example: y = −4 cos(3x) + 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 3', title: 'Features from the Equation', subtitle: '$y = a\\sin(bx + c) + d$' }],
      lines: [
        { say: 'Drawing a graph to read its features takes time. But the equation of a sinusoidal function already holds every feature you need.', show: 'title' },
        { say: 'In this video, you will read the amplitude, period, midline, maximum, minimum and range of a sinusoidal function straight from its equation.' },
      ],
    },
    {
      chapter: 'The general form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = a\\sin(bx + c) + d \\qquad y = a\\cos(bx + c) + d \\qquad (b > 0)'] },
        {
          kind: 'table',
          id: 't',
          head: ['Feature', 'From the equation'],
          rows: [
            ['Amplitude', '$\\lvert a \\rvert$'],
            ['Period ($x$ in degrees)', '$\\dfrac{360^\\circ}{b}$'],
            ['Midline', '$y = d$'],
            ['Maximum and minimum', '$d + \\lvert a \\rvert$ and $d - \\lvert a \\rvert$'],
            ['Range', '$d - \\lvert a \\rvert \\le y \\le d + \\lvert a \\rvert$'],
          ],
        },
      ],
      lines: [
        { say: 'Every sinusoidal function can be written as y equals "a" sine, b x plus c, plus d, or the same with cosine, where b is positive.', show: 'm' },
        { say: 'The amplitude is the absolute value of "a": the size of "a", without its sign.', show: 't.0', focus: 't.0' },
        { say: 'With x in degrees, the period is 360 degrees divided by b.', show: 't.1', focus: 't.1' },
        { say: 'The midline is y equals d.', show: 't.2', focus: 't.2' },
        { say: 'So the maximum is d plus the amplitude, and the minimum is d minus the amplitude.', show: 't.3', focus: 't.3' },
        { say: 'And the range, the set of all the y-values the function takes, runs from the minimum up to the maximum.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Checking with a graph',
      layout: 'split',
      leftWidth: 660,
      left: [
        figure('g', [
          g,
          edgeNumbers(g, { xs: steps(0, 360, 45), ys: steps(0, 8, 1), xTex: degTex }),
          hline(g, { id: 'mid', y: 4, tone: 'adj' }),
          plot(g, { id: 'curve', f, samples: 300 }),
          dots(g, [
            { id: 'M1', x: 45, y: 7, tone: 'good', group: 'ext' },
            { id: 'M2', x: 225, y: 7, tone: 'good', group: 'ext' },
            { id: 'N1', x: 135, y: 1, tone: 'opp', group: 'ext' },
            { id: 'N2', x: 315, y: 1, tone: 'opp', group: 'ext' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['y = 3\\sin(2x) + 4', 'a = 3:\\ \\text{amplitude } 3', 'b = 2:\\ \\text{period } \\tfrac{360^\\circ}{2} = 180^\\circ', 'd = 4:\\ \\text{midline } y = 4', '\\max = 7,\\ \\min = 1'],
        },
      ],
      lines: [
        { say: 'Check this with the graph from the last part: y equals three sine two x, plus four.', show: ['g.grid', 'g.axes', 'g.curve', 'm.0'] },
        { say: '"a" is three, so the amplitude is three.', show: 'm.1', focus: 'm.1' },
        { say: 'b is two, so the period is 360 degrees over two, which is 180 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'd is four, so the midline is y equals four.', show: ['m.3', 'g.mid'], focus: ['m.3', 'g.mid'] },
        { say: 'The maximum is four plus three, which is seven, and the minimum is four minus three, which is one. That is exactly what we read from the graph.', show: ['m.4', 'g.ext'], focus: ['m.4', 'g.ext'] },
      ],
    },
    {
      chapter: 'Flips and slides',
      layout: 'center',
      main: [
        figure('s', sides, 360),
        { kind: 'text', id: 't', size: 'md', md: 'A negative $a$ flips the wave, and $c$ slides it sideways. Neither changes the amplitude, the period or the midline.' },
      ],
      lines: [
        { say: 'Two parts of the equation move the graph without changing these features.', show: ['s.flip-grid', 's.flip-axes', 's.flip-mid', 's.flip-base', 's.shift-grid', 's.shift-axes', 's.shift-mid', 's.shift-base'] },
        { say: 'A negative value of "a" flips the graph upside down in its midline. Here is y equals negative three sine two x, plus four, in orange, on top of the grey graph from before. Where the grey graph has a maximum, the orange graph has a minimum.', show: ['s.flip-new', 's.flip-name'], focus: 's.flip-new' },
        { say: 'But the orange wave still rises three above the midline and falls three below it. The amplitude is still three: a distance, which is always positive.' },
        { say: 'And c slides the whole graph left or right. Here c is negative ninety degrees, and the blue graph has slid to the right. It starts its cycles at a different place, but it has the same amplitude, period and midline.', show: ['s.shift-new', 's.shift-name'], focus: 's.shift-new' },
        { say: 'So to find the amplitude, period and midline, you never need c, and you only need the size of "a".', show: 't' },
      ],
    },
    {
      chapter: 'An example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'For $y = -4\\cos(3x) + 1$, with $x$ in degrees, find the amplitude, period, midline, range and $y$-intercept.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{amplitude} = |{-4}| = 4', '\\text{period} = \\dfrac{360^\\circ}{3} = 120^\\circ', '\\text{midline: } y = 1'] },
      ],
      lines: [
        { say: 'Now an example. For y equals negative four cosine three x, plus one, with x in degrees, find the amplitude, period, midline, range and y-intercept.', show: 'p' },
        { say: '"a" is negative four, so the amplitude is the absolute value of negative four, which is four.', show: 'm.0', focus: 'm.0' },
        { say: 'b is three, so the period is 360 degrees over three, which is 120 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'And d is one, so the midline is y equals one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Range and y-intercept',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('ex', [
          ge,
          edgeNumbers(ge, { xs: steps(0, 360, 60), ys: [-3, -1, 1, 3, 5], xTex: degTex }),
          hline(ge, { id: 'mid', y: 1, tone: 'adj' }),
          plot(ge, { id: 'curve', f: e, samples: 300 }),
          dots(ge, [
            { id: 'M1', x: 60, y: 5, tone: 'good', group: 'max' },
            { id: 'M2', x: 180, y: 5, tone: 'good', group: 'max' },
            { id: 'M3', x: 300, y: 5, tone: 'good', group: 'max' },
            { id: 'N1', x: 120, y: -3, tone: 'opp', group: 'min' },
            { id: 'N2', x: 240, y: -3, tone: 'opp', group: 'min' },
            { id: 'Y', x: 0, y: -3, tone: 'theta' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\max = 1 + 4 = 5', '\\min = 1 - 4 = -3', '\\{y \\mid -3 \\le y \\le 5,\\ y \\in \\mathbb{R}\\}', 'y = -4\\cos 0^\\circ + 1', '= -4(1) + 1 = -3'],
        },
      ],
      lines: [
        { say: 'The maximum is the midline plus the amplitude: one plus four, which is five. The minimum is one minus four, which is negative three.', show: ['ex.grid', 'ex.axes', 'ex.mid', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So the range is all real y from negative three to five.', show: 'm.2', focus: 'm.2' },
        { say: 'For the y-intercept, substitute zero for x. Cosine of zero degrees is one, so y equals negative four times one, plus one, which is negative three.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'The graph agrees. It starts at its minimum, negative three, because "a" is negative, and it rises to a maximum of five three times between zero and 360 degrees: once every 120 degrees.', show: ['ex.curve', 'ex.Y', 'ex.max', 'ex.min'], focus: ['ex.Y', 'ex.max'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = -5\\sin(4x) + 2$, with $x$ in degrees, which statement is correct?',
          choices: [
            'Amplitude $5$, period $90^\\circ$, range $-3 \\le y \\le 7$',
            'Amplitude $-5$, period $90^\\circ$, range $-3 \\le y \\le 7$',
            'Amplitude $5$, period $1{,}440^\\circ$, range $-3 \\le y \\le 7$',
            'Amplitude $5$, period $90^\\circ$, range $-7 \\le y \\le 3$',
          ],
          answer: 0,
          working: 'Amplitude $|{-5}| = 5$; period $\\dfrac{360^\\circ}{4} = 90^\\circ$; midline $y = 2$, so the range runs from $2 - 5 = -3$ to $2 + 5 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals negative five sine four x, plus two, with x in degrees, which statement is correct? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The amplitude is the absolute value of negative five, which is five. The period is 360 degrees over four, which is ninety degrees. And the midline is y equals two, so the range runs from two minus five, negative three, up to two plus five, seven. Choice B gives a negative amplitude, but an amplitude is a distance, so it is never negative.', show: 'q.answer' },
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
            'For $y = a\\sin(bx + c) + d$: amplitude $|a|$, period $\\dfrac{360^\\circ}{b}$, midline $y = d$.',
            'Maximum $d + |a|$, minimum $d - |a|$; the range runs between them.',
            'A negative $a$ flips the graph and $c$ slides it, but neither changes these features.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For y equals "a" sine, b x plus c, plus d, the amplitude is the absolute value of "a", the period is 360 degrees over b, and the midline is y equals d.', show: 'sum.0' },
        { say: 'The maximum is d plus the amplitude, the minimum is d minus the amplitude, and the range runs between them.', show: 'sum.1' },
        { say: 'A negative "a" flips the graph and c slides it, but neither changes these features. In the next part, you will look more closely at the period, and find it in radians as well as degrees. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
