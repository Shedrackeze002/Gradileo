import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { revolveX } from './lib/m31-9-figures.ts';
import { guide, numbers, plane, tag } from './lib/m31-8-graphs.ts';

// A cone from the line y = (r/h)x on [0, h] (drawn with r = 3, h = 5).
const c = plane({ x: [-0.5, 6.5], y: [-3.6, 3.6], xStep: 0.5, yStep: 0.5, every: 0, width: 7, height: 7.2 });
const cone = figure('cone', [
  c,
  revolveX(c, { id: 'V', f: (x) => 0.6 * x, from: 0, to: 5, slice: { x: 3 } }),
  guide(c, 'r', [5, 0], [5, 3], 'adj', { dashed: false, weight: 4 }),
  tag(c, 'rt', 5.1, 1.5, 'r', 'right', 'adj'),
  tag(c, 'ht', 5, -3.1, 'x = h', 'below', 'ink'),
  tag(c, 'name', 2.6, 2.6, 'y = \\tfrac{r}{h}x', 'left', 'brand'),
]);

// A sphere from the semicircle y = √(r² − x²) on [−r, r] (drawn with r = 3).
const s = plane({ x: [-3.6, 3.6], y: [-3.6, 3.6], xStep: 0.5, yStep: 0.5, every: 0, width: 7.2, height: 7.2 });
const sphere = figure('sph', [
  s,
  revolveX(s, { id: 'V', f: (x) => Math.sqrt(Math.max(0, 9 - x * x)), from: -3, to: 3, slice: { x: 1.5, R: '\\sqrt{r^2 - x^2}', Rplace: 'above right' }, samples: 200 }),
  tag(s, 'rt', 3, 0, 'r', 'below right', 'ink'),
  tag(s, 'mt', -3, 0, '-r', 'below left', 'ink'),
]);

// The cone from y = 2x on [0, 3]: radius 6, height 3, volume 36π.
const e = plane({ x: [-0.5, 5], y: [-6.5, 6.5], xStep: 0.5, yStep: 1, every: 0, width: 5.5, height: 13 });
const example = figure('ex', [e, numbers(e, 1, 2), revolveX(e, { id: 'V', f: (x) => 2 * x, from: 0, to: 3, slice: { x: 2, R: '2x', Rplace: 'below right' } }), tag(e, 'name', 4.0, 5.5, 'y = 2x', 'right', 'brand')]);

const video: Explainer = {
  id: 'm31-9-2-b',
  lessonId: 'm31-9-2',
  title: 'Volumes of Revolution, Part 2: A Cone and a Sphere',
  thumbnailTitle: 'A Cone and a Sphere',
  thumbnail: 'sph',
  summary: 'The disc method rebuilds familiar formulas: rotating y = (r/h)x on [0, h] gives a cone, V = π∫₀ʰ (r²/h²)x² dx = ⅓πr²h, and rotating y = √(r² − x²) on [−r, r] gives a sphere, V = π∫ (r² − x²) dx = ⁴⁄₃πr³. The region under y = 2x on [0, 3] makes a cone of volume 36π ≈ 113.10, which checks with ⅓π(6)²(3); and why the integrand is π[f(x)]², not πf(x).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 2', title: 'A Cone and a Sphere', subtitle: 'The disc method rebuilds the formulas' }],
      lines: [
        { say: 'You have used formulas for the volume of a cone and a sphere for years. Where do they come from?', show: 'title' },
        { say: 'In this video, the disc method rebuilds both formulas, then finds the volume of a particular cone, and warns about the most common slip.' },
      ],
    },
    {
      chapter: 'A cone',
      layout: 'split',
      leftWidth: 560,
      left: [cone],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\pi\\int_0^h \\left(\\dfrac{r}{h}x\\right)^2 dx', '= \\pi\\dfrac{r^2}{h^2}\\int_0^h x^2\\,dx', '= \\pi\\dfrac{r^2}{h^2}\\cdot\\dfrac{h^3}{3} = \\dfrac{1}{3}\\pi r^2 h'] },
      ],
      lines: [
        { say: 'Take the straight line y equals r over h, times x, from x equals zero to x equals h. At x equals h, its height is r.', show: ['cone.grid', 'cone.axes', 'cone.V-curve', 'cone.V-region', 'cone.name', 'cone.r', 'cone.rt', 'cone.ht'] },
        { say: 'Rotate the triangle under it about the x-axis. It sweeps out a cone, lying on its side, with its point at the origin: height h, and radius r.', show: 'cone.V-solid', focus: 'cone.V-solid' },
        { say: 'Each slice is a disc of radius r over h times x. So the volume is pi times the integral from zero to h of, r over h times x, squared. The constants come outside: pi r squared over h squared, times the integral of x squared.', show: ['cone.V-disc', 'cone.V-R', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'The integral of x squared from zero to h is h cubed over three. Cancel h squared, and the volume is one third pi r squared h: the cone formula.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A sphere',
      layout: 'split',
      leftWidth: 540,
      left: [sphere],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\pi\\int_{-r}^{r} (r^2 - x^2)\\,dx', '= \\pi\\Big[r^2 x - \\dfrac{x^3}{3}\\Big]_{-r}^{r}', '= \\pi\\left(\\dfrac{2r^3}{3} + \\dfrac{2r^3}{3}\\right) = \\dfrac{4}{3}\\pi r^3'] },
      ],
      lines: [
        { say: 'Now a sphere. The top half of a circle of radius r is y equals the square root of r squared minus x squared, from negative r to r.', show: ['sph.grid', 'sph.axes', 'sph.V-curve', 'sph.V-region', 'sph.rt', 'sph.mt'] },
        { say: 'Rotate it about the x-axis, and it sweeps out a sphere.', show: 'sph.V-solid', focus: 'sph.V-solid' },
        { say: 'Each slice is a disc whose radius is the square root of r squared minus x squared. Squaring it removes the root, so the volume is pi times the integral from negative r to r of, r squared minus x squared.', show: ['sph.V-disc', 'sph.V-R', 'm.0'], focus: 'm.0' },
        { say: 'An antiderivative is r squared x, minus x cubed over three. At r, that is r cubed minus r cubed over three: two thirds r cubed. At negative r, it is negative two thirds r cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract: two thirds plus two thirds, r cubed, times pi. That is four thirds pi r cubed: the sphere formula.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A cone with numbers',
      layout: 'split',
      leftWidth: 460,
      left: [example],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\pi\\int_0^3 (2x)^2\\,dx = \\pi\\int_0^3 4x^2\\,dx', '= \\pi\\Big[\\dfrac{4x^3}{3}\\Big]_0^3 = 36\\pi \\approx 113.10', '\\text{check: } \\tfrac{1}{3}\\pi(6)^2(3) = 36\\pi \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'The region under y equals two x, from x equals zero to three, is rotated about the x-axis. Find the volume.', show: ['ex.grid', 'ex.axes', 'ex.V-curve', 'ex.V-region', 'ex.name', 'ex.V-solid'] },
        { say: 'Each disc has radius two x, so the volume is pi times the integral from zero to three of, two x, squared: four x squared.', show: ['ex.V-disc', 'ex.V-R', 'm.0'], focus: 'm.0' },
        { say: 'An antiderivative is four x cubed over three. At three, that is four times 27 over three: 36. So the volume is 36 pi, about 113.10 cubic units.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the formula. The solid is a cone with height three, and radius two times three, which is six. One third pi, times six squared, times three, is 36 pi. It matches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square the radius, keep the pi', md: 'The integrand is $\\pi\\big[f(x)\\big]^2$, **not** $\\pi f(x)$ or $\\big[f(x)\\big]^2$. For $y = \\sqrt{x}$, the integrand is $\\pi x$, not $\\pi\\sqrt{x}$.' },
      ],
      lines: [
        { say: 'Two slips are common. The first is forgetting to square the radius. Each slice is a disc with area pi r squared, so the radius must be squared. For y equals root x, the integrand is pi times x, not pi times root x.', show: 'oops' },
        { say: 'The second is dropping the pi. Without it, you have added up squares, not circles. So the integrand is always pi, times f of x, squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The region under $y = 3x$ from $x = 0$ to $x = 2$ is rotated about the $x$-axis. Find the volume.',
          choices: ['$6\\pi$', '$24\\pi$', '$72\\pi$', '$12\\pi$'],
          answer: 1,
          working: '$V = \\pi\\int_0^2 9x^2\\,dx = \\pi\\Big[3x^3\\Big]_0^2 = 24\\pi$. Check: a cone of radius $6$ and height $2$ has $\\tfrac{1}{3}\\pi(36)(2) = 24\\pi$.',
        },
      ],
      lines: [
        { say: 'Your turn. The region under y equals three x, from x equals zero to two, is rotated about the x-axis. Find the volume. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 24 pi. The radius is three x, so the integrand is pi times nine x squared. Its antiderivative is three x cubed, which is 24 at x equals two. Check: a cone of radius six and height two has volume one third pi, times 36, times two: 24 pi.', show: 'q.answer' },
        { say: 'Choice C, 72 pi, is pi r squared h: the volume of a cylinder. A cone is one third of that.' },
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
          items: ['Rotating $y = \\dfrac{r}{h}x$ gives a cone: $V = \\dfrac{1}{3}\\pi r^2 h$.', 'Rotating $y = \\sqrt{r^2 - x^2}$ gives a sphere: $V = \\dfrac{4}{3}\\pi r^3$.', 'The integrand is $\\pi\\big[f(x)\\big]^2$: square the radius and keep the $\\pi$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rotating a straight line through the origin gives a cone, and the disc method gives one third pi r squared h.', show: 'sum.0' },
        { say: 'Rotating a semicircle gives a sphere, with volume four thirds pi r cubed.', show: 'sum.1' },
        { say: 'And the integrand is always pi times the radius squared. In the next part, we rotate a region about the y-axis instead. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
