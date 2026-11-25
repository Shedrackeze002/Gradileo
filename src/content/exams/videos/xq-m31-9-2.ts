import type { DiagramItem, Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 9.2 (volumes of revolution). The question is an exercise from
// OpenStax Calculus Volume 1 (section 6.2, Determining Volumes by Slicing, CC BY-NC-SA 4.0): the
// book's instruction "For the following exercises, draw the region bounded by the curves. Then, find
// the volume when the region is rotated around the x-axis." is put with the one pair of curves it
// asks about. They meet at x = 0 and x = 1, √x is on top, so the washers have R = √x and r = x², and
// V = π∫₀¹ (x − x⁴) dx = π(1/2 − 1/5) = 3π/10, as in the book's answer. Check: the solid fits
// inside the one made by √x alone, π∫₀¹ x dx = π/2 ≈ 1.571, and 3π/10 ≈ 0.942 is less than that.

const QUESTION =
  'Draw the region bounded by the curves. Then, find the volume when the region is rotated around the x-axis. y = √x and y = x²';

const top = (x: number) => Math.sqrt(x);
const bot = (x: number) => x * x;
const g = plane({ x: [0, 1.25], y: [-1.25, 1.25], xStep: 0.25, yStep: 0.25, every: 2, width: 8, height: 7 });

/** The region between the curves from x = 0 to x = 1. */
const region = () => {
  const points: Record<string, [number, number]> = {};
  const ids: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) ** 2;
    points[`t${i}`] = g.map(x, top(x));
    ids.push(`t${i}`);
  }
  for (let i = 40; i >= 0; i--) {
    const x = i / 40;
    points[`b${i}`] = g.map(x, bot(x));
    ids.push(`b${i}`);
  }
  const items: DiagramItem[] = [{ kind: 'region', id: 'area', points: ids, tone: 'theta', shade: 0.3 } as DiagramItem];
  return { points, items };
};

const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      region(),
      plot(g, { id: 'top', f: top, from: 0, to: 1.2, tone: 'adj', samples: 80 }),
      plot(g, { id: 'bot', f: bot, from: 0, to: 1.1, tone: 'opp' }),
      plot(g, { id: 'mtop', f: (x) => -top(x), from: 0, to: 1, tone: 'adj', dashed: true, samples: 160 }),
      plot(g, { id: 'mbot', f: (x) => -bot(x), from: 0, to: 1, tone: 'opp', dashed: true }),
      polyline(g, { id: 'outer', points: [[0.5, -top(0.5)], [0.5, top(0.5)]], tone: 'theta', dashed: true }),
      dots(g, [
        { id: 'p0', x: 0, y: 0, tex: '(0, 0)', tone: 'theta', place: 'above left' },
        { id: 'p1', x: 1, y: 1, tex: '(1, 1)', tone: 'theta', place: 'right' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-9-2',
  lessonId: '',
  exam: {
    lesson: 'm31-9-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 6.2, Determining Volumes by Slicing',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/6-2-determining-volumes-by-slicing',
    question: QUESTION,
  },
  title: 'Exam Question: Rotate the Region Between y = √x and y = x² (Volumes of Revolution)',
  thumbnailTitle: 'Spin It: A Solid With a Hole',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: draw the region between y = √x and y = x², then find the volume when it is rotated around the x-axis. The curves meet at x = 0 and x = 1, and √x is on top. Each slice of the solid is a washer, a disc with a hole, with outer radius √x and inner radius x². So the volume is π times the integral from 0 to 1 of (x − x⁴) dx = π(1/2 − 1/5) = 3π/10 ≈ 0.942 cubic units. Then we check the size of the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Spin It: A Solid With a Hole', subtitle: 'Volumes of revolution, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about volumes of revolution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Draw the region bounded by the curves. Then, find the volume when the region is rotated around the $x$-axis. $y = \\sqrt{x}$ and $y = x^2$',
          answer: '$\\dfrac{3\\pi}{10} \\approx 0.942$ cubic units',
          working: '$\\displaystyle V = \\pi\\int_0^1 \\left(x - x^4\\right)dx$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Draw the region bounded by the curves. Then find the volume when the region is rotated around the x axis. The curves are y equals root x, and y equals x squared.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Blue: $y = \\sqrt{x}$. Orange: $y = x^2$. Spun about the $x$-axis, the shaded region sweeps out a solid with a **hole** down the middle. Each slice is a **washer**.' }],
      lines: [
        { say: 'Here is y equals root x, in blue, and y equals x squared, in orange.', show: ['g.grid', 'g.axes', 'g.top', 'g.bot'] },
        { say: 'They close in a region between the points where they meet.', show: ['g.area', 'g.p0', 'g.p1'] },
        { say: 'Spin it around the x axis, and the curves sweep out to the dashed copies below. The solid has a hole down the middle, because the region does not touch the axis.', show: ['g.mtop', 'g.mbot', 't'] },
        { say: 'Cut a slice straight across, like the dashed line. It is a washer: a disc with a hole in it.', show: 'g.outer' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = \\pi\\int_a^b \\Big(\\big[R(x)\\big]^2 - \\big[r(x)\\big]^2\\Big)\\,dx'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Outer and inner radius', md: '$R$ is the distance from the axis to the **far** curve, and $r$ to the **near** curve. Square each one **separately**.' },
      ],
      lines: [
        { say: 'Here is what we need: the washer method. The volume is pi times the integral of the outer radius squared, minus the inner radius squared.', show: 'f' },
        { say: 'The outer radius R reaches from the axis to the far curve, and the inner radius r to the near curve. Square each one on its own.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set the curves **equal**: find the limits', 'Find the **outer** and **inner** radius', 'Integrate $\\pi(R^2 - r^2)$'] }],
      lines: [
        { say: 'Here is the plan. Set the curves equal, to find the limits.', show: 'plan.0' },
        { say: 'Find the outer and inner radius.', show: 'plan.1' },
        { say: 'Then integrate pi times R squared minus r squared.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Where they meet',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{x} = x^2 \\implies x = x^4', 'x^4 - x = 0 \\implies x(x^3 - 1) = 0', 'x = \\good{0} \\ \\text{and} \\ x = \\good{1}'] }],
      lines: [
        { say: 'Step one. Set them equal: root x equals x squared. Square both sides: x equals x to the 4.', show: 'm.0' },
        { say: 'Move it to one side, and factor out x: x times x cubed minus 1 equals 0.', show: 'm.1' },
        { say: 'So they meet at x equals 0 and x equals 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The two radii',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = \\tfrac{1}{4}: \\ \\sqrt{x} = \\tfrac{1}{2}, \\quad x^2 = \\tfrac{1}{16}', '\\good{R = \\sqrt{x}}, \\quad \\good{r = x^2}', 'R^2 - r^2 = x - x^4'] }],
      lines: [
        { say: 'Step two. Test a point between 0 and 1, say one quarter. Root x is one half, and x squared is one sixteenth. So root x is farther from the axis.', show: 'm.0' },
        { say: 'The outer radius is root x, and the inner radius is x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Square each one: root x squared is x, and x squared, squared, is x to the 4.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Integrate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = \\pi\\int_0^1 \\left(x - x^4\\right)dx = \\pi\\Big[\\tfrac{x^2}{2} - \\tfrac{x^5}{5}\\Big]_0^1', '= \\pi\\left(\\tfrac{1}{2} - \\tfrac{1}{5}\\right) = \\pi \\cdot \\tfrac{3}{10}', '= \\good{\\dfrac{3\\pi}{10} \\approx 0.942 \\text{ cubic units}}'] }],
      lines: [
        { say: 'Step three. The antiderivative of x is x squared over 2, and of x to the 4 is x to the 5 over 5.', show: 'm.0' },
        { say: 'At 1, that is one half minus one fifth, which is three tenths. At 0, everything is 0.', show: 'm.1' },
        { say: 'So the volume is 3 pi over 10, about 0.942 cubic units.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{no hole: } \\pi\\int_0^1 x\\,dx = \\tfrac{\\pi}{2} \\approx 1.571', '\\text{the hole: } \\pi\\int_0^1 x^4\\,dx = \\tfrac{\\pi}{5} \\approx 0.628', '1.571 - 0.628 = 0.942 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Spinning root x alone, with no hole, gives pi over 2, about 1.571.', show: 'm.0' },
        { say: 'The hole is the solid made by x squared: pi over 5, about 0.628.', show: 'm.1' },
        { say: 'The solid minus the hole is 0.942. Our answer is smaller than the solid with no hole, as it must be. It checks out.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$\\pi(R - r)^2$', 'square each radius **separately**: $\\pi(R^2 - r^2)$'],
            ['$R = x^2$, $r = \\sqrt{x}$', 'gives $-\\tfrac{3\\pi}{10}$: $\\sqrt{x}$ is **farther** out'],
            ['Forget the $\\pi$', 'each slice is a circle: area $\\pi \\times$ radius²'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not square R minus r. Square each radius on its own, then subtract.' },
        { say: 'Swapping the radii gives a negative volume. Root x is the one farther from the axis.' },
        { say: 'And do not forget the pi. Each slice is made of circles.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The region under $y = x$ from $x = 0$ to $x = 3$ is rotated about the $x$-axis. Find the volume.',
          choices: ['$27\\pi$', '$\\dfrac{9\\pi}{2}$', '$9\\pi$', '$3\\pi$'],
          answer: 2,
          working: 'Discs of radius $x$: $\\displaystyle\\pi\\int_0^3 x^2\\,dx = \\pi \\cdot \\dfrac{27}{3} = 9\\pi$',
        },
      ],
      lines: [
        { say: 'Your turn. The region under y equals x, from 0 to 3, is rotated about the x axis. Find the volume. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'This region touches the axis, so the slices are discs with radius x. Pi times the integral of x squared from 0 to 3 is pi times 27 over 3, which is 9 pi. Choice C. It is a cone, and a third of pi times 3 squared times 3 is 9 pi too.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Set the curves equal to find the **limits**', '$R$ = far curve, $r$ = near curve', '$V = \\pi\\displaystyle\\int_a^b (R^2 - r^2)\\,dx$', 'Square each radius **separately**'] }],
      lines: [
        { say: 'Here is what to remember. Set the curves equal to find the limits.', show: 'sum.0' },
        { say: 'The outer radius goes to the far curve, and the inner radius to the near curve.', show: 'sum.1' },
        { say: 'The volume is pi times the integral of R squared minus r squared.', show: 'sum.2' },
        { say: 'And square each radius on its own. For more on volumes of revolution, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
