import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { revolveY } from './lib/m31-9-figures.ts';
import { numbers, plane, tag } from './lib/m31-8-graphs.ts';

// The region between the y-axis and y = x² (x = √y) up to y = 4, turned about the y-axis: volume 8π.
const bowl = (id: string) => {
  const g = plane({ x: [-2.6, 2.6], y: [-0.5, 5], xStep: 0.5, yStep: 0.5, every: 0, width: 5.2, height: 5.5 });
  return figure(id, [g, numbers(g, 1, 1), revolveY(g, { id: 'V', h: Math.sqrt, from: 0, to: 4, slice: { y: 2.25, R: 'x = \\sqrt{y}' } }), tag(g, 'name', 2.05, 4.5, 'y = x^2', 'right', 'brand')]);
};

const video: Explainer = {
  id: 'm31-9-2-c',
  lessonId: 'm31-9-2',
  title: 'Volumes of Revolution, Part 3: Rotating About the y-Axis',
  thumbnailTitle: 'Rotating About the y-Axis',
  thumbnail: 'bw',
  summary: 'To rotate a region about the y-axis, slice across the y-axis: each slice is a disc of radius x = g(y) and thickness Δy, so V = π∫꜀ᵈ [g(y)]² dy, after solving the curve for x. The first-quadrant region bounded by y = x², the y-axis and y = 4 has x = √y, and V = π∫₀⁴ y dy = 8π ≈ 25.13 cubic units; the limits are y-values.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 3', title: 'Rotating About the y-Axis', subtitle: 'Discs stacked up the axis' }],
      lines: [
        { say: 'A bowl on a potter’s wheel spins about an upright axis, not a horizontal one. To find such a volume, we rotate a region about the y-axis.', show: 'title' },
        { say: 'In this video, you will slice across the y-axis, write the radius in terms of y, and find the volume of a bowl-shaped solid.' },
      ],
    },
    {
      chapter: 'Slicing across the y-axis',
      layout: 'split',
      leftWidth: 560,
      left: [bowl('bw')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Discs about the y-axis', md: 'Each slice is a disc of radius $x = g(y)$ and thickness $\\Delta y$, so' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\pi\\int_c^d \\big[g(y)\\big]^2\\,dy'] },
      ],
      lines: [
        { say: 'Take the region in the first quadrant bounded by the curve y equals x squared, the y-axis, and the line y equals four.', show: ['bw.grid', 'bw.axes', 'bw.V-curve', 'bw.V-region', 'bw.name'], focus: 'bw.V-region' },
        { say: 'Rotate it about the y-axis. The curve sweeps out a bowl, open at the top, where the rim is a circle seen from a little above.', show: 'bw.V-solid', focus: 'bw.V-solid' },
        { say: 'To rotate about the y-axis, slice across the y-axis: horizontally. Each slice is a flat disc, like a coin lying down. Its radius is the distance from the axis to the curve: the x-value of the curve at that height. Its thickness is a small step up the axis, delta y.', show: ['bw.V-disc', 'bw.V-R', 'def'], focus: ['bw.V-disc', 'bw.V-R'] },
        { say: 'So if the curve is x equals g of y, the volume is pi times the integral from c to d of, g of y, squared, d y. The radius must be written in terms of y, and the limits are y-values.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Solve for x first',
      layout: 'split',
      leftWidth: 560,
      left: [bowl('bw2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = x^2 \\;\\Rightarrow\\; x = \\sqrt{y}', 'V = \\pi\\int_0^4 \\left(\\sqrt{y}\\right)^2 dy', '= \\pi\\int_0^4 y\\,dy', '= \\pi\\Big[\\dfrac{y^2}{2}\\Big]_0^4 = 8\\pi \\approx 25.13'] },
      ],
      lines: [
        { say: 'The curve is given as y equals x squared, so first solve for x. In the first quadrant, x is positive, so x equals the square root of y. A slice at height y has radius root y.', show: ['bw2', 'm.0'], focus: ['m.0', 'bw2.V-R'] },
        { say: 'The region runs from y equals zero, at the bottom of the bowl, up to y equals four, at the rim. So the volume is pi times the integral from zero to four of, root y, squared, d y, which is pi times the integral of y.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The antiderivative of y is y squared over two, which is eight at y equals four. So the volume is eight pi: about 25.13 cubic units.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The same solid',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A familiar answer', md: 'Rotating the region under $y = \\sqrt{x}$, $0 \\le x \\le 4$, about the $x$-axis also gave $8\\pi$. Swapping $x$ and $y$ reflects that region onto this one, so the two solids are the same shape, turned on its side.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing the variables', md: 'About the $y$-axis, the radius is $x$ written in terms of $y$, and the limits are $y$-values: $0$ to $4$ here, not the $x$-values $0$ to $2$.' },
      ],
      lines: [
        { say: 'The answer, eight pi, may look familiar. The region under y equals root x, from zero to four, rotated about the x-axis, also had volume eight pi.', show: 'key' },
        { say: 'That is no accident. Swapping x and y reflects one region onto the other, so the two solids are the same shape: one is just the other turned on its side.' },
        { say: 'Watch the variables. About the y-axis, the radius is x, written in terms of y, and the limits are y-values: zero to four here. The x-values of the region, zero to two, are not the limits.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The first-quadrant region bounded by $y = x^2$, the $y$-axis and $y = 9$ is rotated about the $y$-axis. Find the volume.',
          choices: ['$\\dfrac{81\\pi}{2}$', '$\\dfrac{243\\pi}{5}$', '$18\\pi$', '$81\\pi$'],
          answer: 0,
          working: '$x = \\sqrt{y}$, so $V = \\pi\\int_0^9 y\\,dy = \\pi\\Big[\\dfrac{y^2}{2}\\Big]_0^9 = \\dfrac{81\\pi}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The first-quadrant region bounded by y equals x squared, the y-axis, and y equals nine is rotated about the y-axis. Find the volume. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 81 pi over two. The radius is x equals root y, so the volume is pi times the integral from zero to nine of y, d y: pi times 81 over two.', show: 'q.answer' },
        { say: 'Choice C, eighteen pi, integrates root y without squaring the radius.' },
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
          items: ['About the $y$-axis, slice across the $y$-axis: discs of radius $x = g(y)$.', 'Solve the curve for $x$ in terms of $y$ first.', '$V = \\pi\\int_c^d \\big[g(y)\\big]^2\\,dy$, with $y$-values as the limits.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To rotate about the y-axis, slice across the y-axis, into discs whose radius is x, written in terms of y.', show: 'sum.0' },
        { say: 'So solve the curve for x in terms of y first.', show: 'sum.1' },
        { say: 'Then the volume is pi times the integral of, g of y, squared, d y, with y-values as the limits. In the next part, the region has a gap from the axis, and the slices become washers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
