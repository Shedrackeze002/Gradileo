import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { edgeNumbers, note, num, plane, plot, tangent } from './lib/m31-6-graphs.ts';

// f(x) = x² − 4x + 5, with its tangent y = 2x − 4 and normal y = −x/2 + 7/2 at (3, 2).
const f = (x: number) => x * x - 4 * x + 5;
const g = plane({ x: [-1, 6], y: [-2, 6], xStep: 1, yStep: 1, every: 0, width: 7, height: 8 });
const square: Part = {
  points: { 'ra-o': g.map(3, 2), 'ra-t': g.map(3.4, 2.8), 'ra-n': g.map(2.2, 2.4) },
  items: [{ kind: 'right', id: 'ra', at: 'ra-o', from: 'ra-t', to: 'ra-n' }],
};

// The same parabola at its vertex (2, 1): a horizontal tangent and a vertical normal.
const v = plane({ x: [-1, 5], y: [-1, 6], xStep: 1, yStep: 1, every: 0, width: 6, height: 7 });

const video: Explainer = {
  id: 'm31-6-1-b',
  lessonId: 'm31-6-1',
  title: 'Tangent Lines and Linear Approximation, Part 2: Normal Lines',
  thumbnailTitle: 'Normal Lines',
  thumbnail: 'tn',
  summary: 'The normal line to a curve at a point is perpendicular to the tangent line there, so its slope is the negative reciprocal −1/f′(a). For f(x) = x² − 4x + 5 at x = 3, the tangent is y = 2x − 4 and the normal is y = −x/2 + 7/2; where the tangent is horizontal, the normal is the vertical line x = a.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 2', title: 'Normal Lines', subtitle: 'Perpendicular to the tangent' }],
      lines: [
        { say: 'A ray of light that hits a curved mirror bounces off at an angle measured from a line that is perpendicular to the mirror at that point.', show: 'title' },
        { say: 'That line is called the normal line. In this video, you will find its equation from the tangent line.' },
      ],
    },
    {
      chapter: 'The normal line',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Normal line', md: "The **normal line** to a curve at a point is the line through that point that is **perpendicular** to the tangent line. When $f'(a) \\ne 0$, its slope is the negative reciprocal of the tangent's slope:" },
        { kind: 'math', id: 'm', size: 'lg', lines: ["m_{\\text{normal}} = -\\frac{1}{f'(a)}"] },
      ],
      lines: [
        { say: 'The normal line to a curve at a point is the line through that point that is perpendicular to the tangent line.', show: 'def' },
        { say: 'Perpendicular slopes are negative reciprocals: they multiply to negative one. So if the tangent has slope f prime of "a", the normal has slope negative one over f prime of "a".', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Tangent and normal',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('tn', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4, 5, 6], ys: [-2, 0, 2, 4, 6], xTex: num, yTex: num }),
          plot(g, { id: 'f', f, samples: 200 }),
          tangent(g, { id: 't', a: 3, y: 2, m: 2, tone: 'opp' }),
          tangent(g, { id: 'n', a: 3, y: 2, m: -0.5, tone: 'adj', dashed: true, dot: '' }),
          square,
          note(g, { id: 't-t', x: 4.55, y: 3.7, tex: '\\text{tangent}', tone: 'opp', place: 'right' }),
          note(g, { id: 'n-t', x: 3.9, y: -0.9, tex: '\\text{normal}', tone: 'adj', place: 'right' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ["f(3) = 2, \\quad f'(3) = 2", '\\opp{y - 2 = 2(x - 3)}', '\\opp{y = 2x - 4}', '\\adj{y - 2 = -\\tfrac{1}{2}(x - 3)}', '\\adj{y = -\\tfrac{1}{2}x + \\tfrac{7}{2}}'],
        },
      ],
      lines: [
        { say: 'For f of x equals x squared, minus four x, plus five, at x equals three, find the tangent line and the normal line.', show: ['tn.grid', 'tn.axes', 'tn.f'] },
        { say: 'f of three is nine, minus twelve, plus five, which is two. And f prime of x is two x minus four, so f prime of three is two.', show: 'm.0', focus: 'm.0' },
        { say: 'The tangent line has slope two: y minus two equals two times x minus three, which is y equals two x minus four.', show: ['m.1', 'm.2', 'tn.t-all', 'tn.t-t'], focus: ['m.2', 'tn.t'] },
        { say: 'The normal line has the negative reciprocal slope, negative one half: y minus two equals negative one half, times x minus three. That is y equals negative one half x, plus seven halves.', show: ['m.3', 'm.4', 'tn.n-all', 'tn.n-t', 'tn.ra'], focus: ['m.4', 'tn.n'] },
        { say: 'On the graph, both lines pass through the point at three, two, and they cross at a right angle.', focus: 'tn.ra' },
      ],
    },
    {
      chapter: 'A horizontal tangent',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('hv', [
          v,
          edgeNumbers(v, { xs: [0, 1, 2, 3, 4, 5], ys: [0, 2, 4, 6], xTex: num, yTex: num }),
          plot(v, { id: 'f', f, samples: 200 }),
          tangent(v, { id: 't', a: 2, y: 1, m: 0, tone: 'opp', dot: '' }),
          note(v, { id: 'p', x: 3.4, y: 0.45, tex: '(2, 1)', tone: 'theta', group: 't-all' }),
          {
            points: { 'nv-a': v.map(2, -1), 'nv-b': v.map(2, 6) },
            items: [{ kind: 'line', id: 'nv', from: 'nv-a', to: 'nv-b', tone: 'adj', dashed: true, weight: 3 }],
          },
        ]),
      ],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Slope zero', md: "If $f'(a) = 0$, the tangent is horizontal, $y = f(a)$, and the normal is the **vertical** line $x = a$." },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f'(2) = 0", '\\opp{\\text{tangent: } y = 1}', '\\adj{\\text{normal: } x = 2}'] },
      ],
      lines: [
        { say: 'There is one special case. If f prime of "a" is zero, you cannot divide by it.', show: 'key' },
        { say: 'Then the tangent line is horizontal, and the normal line is vertical, with equation x equals "a".', show: ['hv.grid', 'hv.axes', 'hv.f'] },
        { say: 'For the same parabola at x equals two, f prime of two is zero. The tangent line is y equals one, and the normal line is x equals two.', show: ['m', 'hv.t-all', 'hv.nv'], focus: ['hv.t', 'hv.nv'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find an equation of the normal line to $y = x^{2}$ at $x = 1$.',
          choices: ['$y = 2x - 1$', '$y = -\\dfrac{1}{2}x + \\dfrac{3}{2}$', '$y = \\dfrac{1}{2}x + \\dfrac{1}{2}$', '$y = -2x + 3$'],
          answer: 1,
          working: 'The point is $(1, 1)$ and the tangent slope is $2x = 2$. The normal slope is $-\\dfrac{1}{2}$: $y - 1 = -\\dfrac{1}{2}(x - 1)$, so $y = -\\dfrac{1}{2}x + \\dfrac{3}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find an equation of the normal line to y equals x squared, at x equals one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The point is one, one, and the tangent slope is two times one, which is two. The normal slope is negative one half. So y minus one equals negative one half, times x minus one: y equals negative one half x, plus three halves. Choice A is the tangent line, not the normal.', show: 'q.answer' },
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
          items: ['The normal line is perpendicular to the tangent line at the same point.', "Its slope is the negative reciprocal: $-\\dfrac{1}{f'(a)}$.", "If $f'(a) = 0$, the normal is the vertical line $x = a$."],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The normal line passes through the same point as the tangent line, and is perpendicular to it.', show: 'sum.0' },
        { say: 'Its slope is the negative reciprocal of the tangent’s slope: negative one over f prime of "a".', show: 'sum.1' },
        { say: 'And if f prime of "a" is zero, the normal is the vertical line x equals "a". In the next part, we find where a tangent is horizontal, or parallel to a given line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
