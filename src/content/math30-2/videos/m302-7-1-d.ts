import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { degTex, edgeNumbers, hline, note, span, steps, turnCircle } from './lib/m302-7-graphs.ts';

const PI = Math.PI;
const rad = (deg: number) => (deg * PI) / 180;

/** y = sin x and y = sin(3x), with x in degrees. */
const g = plane({ x: [0, 360], y: [-1.5, 1.5], xStep: 30, yStep: 0.5, every: 0, width: 9, height: 3 });
const s1 = (x: number) => Math.sin(rad(x));
const s3 = (x: number) => Math.sin(rad(3 * x));

/** y = 2 sin(4x) − 3, with x in radians. */
const r = plane({ x: [0, 2 * PI], y: [-6, 0], xStep: PI / 4, yStep: 1, every: 0, width: 6.4, height: 3.6 });
const f = (x: number) => 2 * Math.sin(4 * x) - 3;

const video: Explainer = {
  id: 'm302-7-1-d',
  lessonId: 'm302-7-1',
  title: 'Periodic Behaviour and Sinusoidal Functions, Part 4: The Period in Degrees and Radians',
  thumbnailTitle: 'The Period: Degrees and Radians',
  thumbnail: 'g',
  summary: 'Why the period of y = sin(bx) is 360°/b: b is the number of cycles in 360°, so y = sin(3x) has a period of 120°, not 3 × 360°. Radians, where 360° = 2π, and the period 2π/b with x in radians: y = 2 sin(4x) − 3 has a period of π/2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 4', title: 'The Period in Degrees and Radians', subtitle: 'Why a larger $b$ gives a shorter period' }],
      lines: [
        { say: 'The value of b in a sinusoidal equation controls how quickly the wave repeats. It is also the feature that is easiest to get backwards.', show: 'title' },
        { say: 'In this video, you will see why the period is 360 degrees divided by b, and find the period when x is measured in radians instead of degrees.' },
      ],
    },
    {
      chapter: 'What b does',
      layout: 'center',
      main: [
        figure('g', [
          g,
          edgeNumbers(g, { xs: steps(0, 360, 60), ys: [-1, 0, 1], xTex: degTex }),
          plot(g, { id: 'one', f: s1, samples: 240 }),
          plot(g, { id: 'three', f: s3, tone: 'opp', samples: 360 }),
          note(g, { id: 'one-t', x: 120, y: 1.95, tex: 'y = \\sin x', tone: 'brand', group: 'one' }),
          note(g, { id: 'three-t', x: 285, y: 1.95, tex: 'y = \\sin(3x)', tone: 'opp', group: 'three' }),
          span(g, { id: 'p0', from: [0, -2.6], to: [120, -2.6], label: '120^\\circ', place: 'below', tone: 'opp' }),
          span(g, { id: 'p1', from: [120, -2.6], to: [240, -2.6], label: '120^\\circ', place: 'below', tone: 'opp' }),
          span(g, { id: 'p2', from: [240, -2.6], to: [360, -2.6], label: '120^\\circ', place: 'below', tone: 'opp' }),
        ]),
      ],
      lines: [
        { say: 'Here is y equals sine x, from zero to 360 degrees. It makes exactly one cycle, so its period is 360 degrees.', show: ['g.grid', 'g.axes', 'g.one'], focus: 'g.one' },
        { say: 'Now here is y equals sine three x, in orange. Multiplying x by three makes the wave run three times as fast, so it fits three whole cycles into the same 360 degrees.', show: 'g.three', focus: 'g.three' },
        { say: 'Three cycles share 360 degrees, so each one is 360 over three, which is 120 degrees long. The period of y equals sine three x is 120 degrees.', show: ['g.p0', 'g.p1', 'g.p2'], focus: ['g.p0', 'g.p1', 'g.p2'] },
        { say: 'In general, b is the number of cycles in 360 degrees. So the period is 360 degrees divided by b.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'The period of $y = \\sin(3x)$ is $\\dfrac{360^\\circ}{3} = 120^\\circ$, not $3 \\times 360^\\circ$. A larger $b$ squeezes more cycles into the same distance, so the period gets **shorter**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3 \\times 360^\\circ = 1{,}080^\\circ}', '\\good{\\dfrac{360^\\circ}{3} = 120^\\circ}'] },
      ],
      lines: [
        { say: 'A common mistake is to multiply instead of divide: three times 360 degrees is 1,080 degrees.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But a period of 1,080 degrees would mean that the wave takes three times as long to repeat. The graph shows the opposite: a larger b squeezes more cycles into the same distance, so the period gets shorter.' },
        { say: 'So always divide: the period is 360 degrees over b, which here is 120 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'A quick check: when b is bigger than one, the period must be less than 360 degrees.' },
      ],
    },
    {
      chapter: 'Radians',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('uc', [
          turnCircle({
            points: [
              { deg: 0, tex: '2\\pi', place: 'right' },
              { deg: 90, tex: '\\tfrac{\\pi}{2}', place: 'above' },
              { deg: 180, tex: '\\pi', place: 'left' },
              { deg: 270, tex: '\\tfrac{3\\pi}{2}', place: 'below' },
            ],
          }),
        ]),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Degrees', 'Radians'],
          rows: [
            ['$360^\\circ$', '$2\\pi$'],
            ['$180^\\circ$', '$\\pi$'],
            ['$90^\\circ$', '$\\dfrac{\\pi}{2}$'],
            ['$270^\\circ$', '$\\dfrac{3\\pi}{2}$'],
          ],
        },
      ],
      lines: [
        { say: 'Angles can also be measured in radians. One full turn, 360 degrees, is two pi radians. Pi is about 3.14, so two pi is about 6.28.', show: ['uc.axes', 'uc.circle', 'uc.p0', 't.0'], focus: ['uc.p0', 't.0'] },
        { say: 'Half a turn, 180 degrees, is half of two pi: pi radians.', show: ['uc.p180', 't.1'], focus: ['uc.p180', 't.1'] },
        { say: 'A quarter turn, ninety degrees, is pi over two radians.', show: ['uc.p90', 't.2'], focus: ['uc.p90', 't.2'] },
        { say: 'And three quarters of a turn, 270 degrees, is three pi over two radians.', show: ['uc.p270', 't.3'], focus: ['uc.p270', 't.3'] },
        { say: 'Graphing calculators and other technology often work in radians, so you will meet them again when you model real data.' },
      ],
    },
    {
      chapter: 'The period in radians',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('r', [
          r,
          edgeNumbers(r, { xs: steps(0, 2 * PI, PI / 2), ys: [-5, -3, -1] }),
          hline(r, { id: 'mid', y: -3, tone: 'adj' }),
          plot(r, { id: 'curve', f, samples: 400 }),
          dots(r, [0, 1, 2, 3, 4].map((k) => ({ id: `z${k}`, x: (k * PI) / 2, y: -3, tone: 'theta' as const, group: 'starts' }))),
          ...[0, 1, 2, 3].map((k) => span(r, { id: `p${k}`, from: [(k * PI) / 2, -7.7], to: [((k + 1) * PI) / 2, -7.7], label: piTex(PI / 2), place: 'below', tone: 'theta' })),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{period} = \\dfrac{2\\pi}{b}', 'y = 2\\sin(4x) - 3', '\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}', '\\text{amplitude } 2', '\\text{midline } y = -3'] },
      ],
      lines: [
        { say: 'With x in radians, one cycle of y equals sine x is two pi long, instead of 360 degrees. So the period is two pi divided by b.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, take y equals two sine four x, minus three, with x in radians.', show: ['r.grid', 'r.axes', 'r.curve', 'm.1'], focus: 'm.1' },
        { say: 'b is four, so the period is two pi over four, which simplifies to pi over two.', show: 'm.2', focus: 'm.2' },
        { say: 'The graph agrees: it fits four whole cycles between zero and two pi, and each one is pi over two long.', show: ['r.starts', 'r.p0', 'r.p1', 'r.p2', 'r.p3'], focus: ['r.p0', 'r.p1', 'r.p2', 'r.p3'] },
        { say: 'The other features do not depend on how angles are measured. The amplitude is two, and the midline is y equals negative three.', show: ['m.3', 'm.4', 'r.mid'], focus: ['m.3', 'm.4', 'r.mid'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'With $x$ in radians, what is the period of $y = 5\\cos(6x) + 1$?',
          choices: ['$12\\pi$', '$\\dfrac{\\pi}{6}$', '$\\dfrac{\\pi}{3}$', '$3\\pi$'],
          answer: 2,
          working: 'The period is $\\dfrac{2\\pi}{b} = \\dfrac{2\\pi}{6} = \\dfrac{\\pi}{3}$. A larger $b$ gives a shorter period, so the answer must be less than $2\\pi$.',
        },
      ],
      lines: [
        { say: 'Your turn. With x in radians, what is the period of y equals five cosine six x, plus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The period is two pi over six, which simplifies to pi over three. Choice A multiplies two pi by six instead of dividing, which gives a much longer period, not a shorter one.', show: 'q.answer' },
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
            'The period is $\\dfrac{360^\\circ}{b}$ in degrees, or $\\dfrac{2\\pi}{b}$ in radians.',
            'A larger $b$ fits more cycles into the same distance, so the period is **shorter**.',
            '$360^\\circ = 2\\pi$, $180^\\circ = \\pi$ and $90^\\circ = \\frac{\\pi}{2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The period is 360 degrees over b with x in degrees, or two pi over b with x in radians.', show: 'sum.0' },
        { say: 'A larger b fits more cycles into the same distance, so the period is shorter. Divide; never multiply.', show: 'sum.1' },
        { say: 'And 360 degrees is two pi radians, 180 degrees is pi, and ninety degrees is pi over two. In the next part, you will use these features to describe real situations: the tide at a dock, and a ride on a Ferris wheel. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
