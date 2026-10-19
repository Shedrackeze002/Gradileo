import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { faces, revolveX } from './lib/m31-9-figures.ts';
import { numbers, plane, tag } from './lib/m31-8-graphs.ts';

// The region under y = √x on [0, 4], turned about the x-axis: discs of radius √x, volume 8π.
const solid = (id: string) => {
  const g = plane({ x: [-0.5, 5], y: [-2.6, 2.6], xStep: 0.5, yStep: 0.5, every: 0, width: 5.5, height: 5.2 });
  return figure(id, [g, numbers(g, 1, 1), revolveX(g, { id: 'V', f: Math.sqrt, from: 0, to: 4, slice: { x: 2.5, R: 'r = \\sqrt{x}', Rplace: 'above left' } }), tag(g, 'name', 1.1, 0.45, 'y = \\sqrt{x}', 'center', 'brand')]);
};
const disc = figure('dsc', [faces({ r: 2, R: 2, rIn: 1, only: 'disc', labels: { r: 'r', R: '', rIn: '', disc: '\\text{area } \\pi r^2' } })], 300);

const video: Explainer = {
  id: 'm31-9-2',
  lessonId: 'm31-9-2',
  title: 'Volumes of Revolution, Part 1: Slicing into Discs',
  thumbnailTitle: 'Volumes by Slicing into Discs',
  thumbnail: 'sv',
  summary: 'A solid of revolution is made by turning a flat region about an axis. Turning the region under y = f(x) about the x-axis, each slice is a disc of radius f(x) and thickness Δx, with volume π[f(x)]²Δx, so V = π∫ₐᵇ [f(x)]² dx. The region under y = √x from 0 to 4 sweeps out a solid of volume π∫₀⁴ x dx = 8π ≈ 25.13 cubic units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 1', title: 'Volumes by Slicing into Discs', subtitle: 'Solids of revolution' }],
      lines: [
        { say: 'A woodturner shapes a table leg by spinning a block on a lathe, and a potter shapes a bowl on a wheel. Each solid is traced out by turning a flat shape around an axis.', show: 'title' },
        { say: 'In this video, you will slice such a solid into thin discs, and turn its volume into an integral.' },
      ],
    },
    {
      chapter: 'A solid of revolution',
      layout: 'split',
      leftWidth: 560,
      left: [solid('sv')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Solid of revolution', md: 'The solid formed when a flat region is rotated about a line, the **axis of rotation**.' }],
      lines: [
        { say: 'Take the region under the curve y equals the square root of x, from x equals zero to x equals four.', show: ['sv.grid', 'sv.axes', 'sv.V-curve', 'sv.name', 'sv.V-region'], focus: 'sv.V-region' },
        { say: 'Now spin that region all the way around the x-axis. The curve sweeps out a smooth, rounded solid, like a bullet lying on its side. Its mirror image below the axis is dashed, and the flat end at x equals four is a circle, seen at a slant.', show: 'sv.V-solid', focus: 'sv.V-solid' },
        { say: 'A solid made this way is called a solid of revolution, and the line it turns about is the axis of rotation.', show: 'def' },
      ],
    },
    {
      chapter: 'One slice',
      layout: 'split',
      leftWidth: 560,
      left: [solid('sv2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{radius} = f(x)', '\\text{thickness} = \\Delta x', '\\text{volume} \\approx \\pi\\big[f(x)\\big]^2\\,\\Delta x'] },
      ],
      lines: [
        { say: 'Slice the solid straight across, at right angles to the axis. Each slice is a thin disc, like a coin.', show: ['sv2.grid', 'sv2.axes', 'sv2.V-curve', 'sv2.name', 'sv2.V-region', 'sv2.V-solid', 'sv2.V-disc'], focus: 'sv2.V-disc' },
        { say: 'The radius of the disc at x is the distance from the axis up to the curve: f of x. Here, that is the square root of x.', show: ['sv2.V-R', 'm.0'], focus: ['sv2.V-R', 'm.0'] },
        { say: 'Its thickness is a small step along the axis, delta x.', show: 'm.1', focus: 'm.1' },
        { say: 'A disc is a very short cylinder. Its volume is the area of its face, pi r squared, times its thickness. So the slice has volume about pi times f of x, squared, times delta x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The disc method',
      layout: 'split',
      leftWidth: 420,
      left: [disc],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Disc method', md: '$V = \\pi\\displaystyle\\int_a^b \\big[f(x)\\big]^2\\,dx$, where the radius $f(x)$ is the distance from the axis to the curve.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sum \\pi\\big[f(x_i)\\big]^2\\,\\Delta x \\;\\longrightarrow\\; \\pi\\int_a^b \\big[f(x)\\big]^2\\,dx'] },
      ],
      lines: [
        { say: 'Here is the face of one disc. Its area is pi r squared, where r is the radius f of x.', show: 'dsc' },
        { say: 'Add up the volumes of all the discs, and let delta x go to zero. As with areas, the sum becomes an integral.', show: 'm.0', focus: 'm.0' },
        { say: 'This is the disc method. The volume is pi times the integral from "a" to b of, f of x, squared, d x. The radius, f of x, is the distance from the axis to the curve.', show: 'def' },
      ],
    },
    {
      chapter: 'A disc integral',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['V = \\pi\\int_0^4 \\left(\\sqrt{x}\\right)^2 dx = \\pi\\int_0^4 x\\,dx', '= \\pi\\Big[\\dfrac{x^2}{2}\\Big]_0^4 = \\pi(8 - 0)', 'V = 8\\pi \\approx 25.13 \\text{ cubic units}'] },
      ],
      lines: [
        { say: 'Now find the volume of our solid. Each disc has radius root x, so the volume is pi times the integral from zero to four of, root x, squared, d x.', show: 'm.0', focus: 'm.0' },
        { say: 'Root x, squared, is just x. So the integral is pi times the integral of x, from zero to four.', focus: 'm.0' },
        { say: 'The antiderivative of x is x squared over two. At four, that is eight, and at zero, it is zero. So the volume is pi times eight.', show: 'm.1', focus: 'm.1' },
        { say: 'The volume is eight pi: about 25.13 cubic units. Give the exact answer in terms of pi, or round only at the end.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The region under $y = x^2$ from $x = 0$ to $x = 1$ is rotated about the $x$-axis. Find the volume.',
          choices: ['$\\dfrac{\\pi}{3}$', '$\\dfrac{1}{5}$', '$\\dfrac{\\pi}{5}$', '$\\dfrac{2\\pi}{5}$'],
          answer: 2,
          working: '$V = \\pi\\int_0^1 \\left(x^2\\right)^2 dx = \\pi\\int_0^1 x^4\\,dx = \\pi\\Big[\\dfrac{x^5}{5}\\Big]_0^1 = \\dfrac{\\pi}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The region under y equals x squared, from x equals zero to one, is rotated about the x-axis. Find the volume. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, pi over five. Each disc has radius x squared, so the volume is pi times the integral of, x squared, squared, which is x to the fourth. Its antiderivative is x to the fifth over five, which is one fifth at x equals one. So the volume is pi over five.', show: 'q.answer' },
        { say: 'Choice A uses x squared as the integrand, without squaring the radius.' },
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
          items: ['Rotating a region about an axis makes a solid of revolution.', 'A slice across the axis is a disc of radius $f(x)$ and thickness $\\Delta x$.', 'Disc method: $V = \\pi\\int_a^b \\big[f(x)\\big]^2\\,dx$.', 'Give exact answers in terms of $\\pi$, or round at the end.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rotating a flat region about an axis makes a solid of revolution.', show: 'sum.0' },
        { say: 'A slice across the axis is a disc, with radius f of x and thickness delta x.', show: 'sum.1' },
        { say: 'Adding the discs gives the disc method: pi times the integral of f of x, squared.', show: 'sum.2' },
        { say: 'And give exact answers in terms of pi, or round only at the end. In the next part, the disc method rebuilds the formulas for a cone and a sphere. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
