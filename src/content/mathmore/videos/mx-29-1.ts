import type { DiagramItem, Explainer } from '@/video/script.ts';

/** y = x² + 1 drawn with the y-axis squashed by 4, so the figure is not too tall. */
const f = (x: number) => (x * x + 1) / 4;
const points: Record<string, [number, number]> = { O: [0, 0], X: [4.6, 0], Y: [0, 4.8] };
const curve: string[] = [];
for (let i = 0; i <= 21; i++) {
  const x = i * 0.2;
  points[`c${i}`] = [x, f(x)];
  curve.push(`c${i}`);
}
const rects: DiagramItem[] = [];
for (let k = 0; k < 4; k++) {
  const h = f(k + 0.5);
  Object.assign(points, { [`a${k}`]: [k, 0], [`b${k}`]: [k + 1, 0], [`t${k}`]: [k + 1, h], [`u${k}`]: [k, h], [`m${k}`]: [k + 0.5, h] });
  rects.push({ kind: 'region', id: `r${k}`, points: [`a${k}`, `b${k}`, `t${k}`, `u${k}`], tone: 'brand', shade: 0.3 });
}

const video: Explainer = {
  id: 'mx-29-1',
  lessonId: 'mx-29-1',
  title: 'The Mid-Ordinate Rule',
  thumbnail: 'm',
  summary: 'The mid-ordinate rule estimates an area with rectangles whose heights are the y values at the midpoints of n equal strips: area ≈ h(y₁ + … + yₙ), with h = (b − a)/n. For the integral of x² + 1 from 0 to 4 with 4 strips, the mid-ordinates 1.25, 3.25, 7.25 and 13.25 give 25, against the exact 25.33. It underestimates for a curve that bends upwards and overestimates for one that bends downwards.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Mid-Ordinate Rule and Voronoi Diagrams', title: 'The Mid-Ordinate Rule', subtitle: 'Estimating areas with rectangles' }],
      lines: [
        { say: 'Many areas under curves cannot be found exactly by integration, and sometimes we only have a table of values. The trapezium rule is one way to estimate them.', show: 'title' },
        { say: 'In this video, you will learn another way, the mid-ordinate rule, which uses rectangles instead of trapezia.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 440,
          points,
          items: [
            ...rects,
            { kind: 'line', id: 'xa', from: 'O', to: 'X', arrow: true, weight: 2.5 },
            { kind: 'line', id: 'ya', from: 'O', to: 'Y', arrow: true, weight: 2.5 },
            { kind: 'curve', id: 'cv', points: curve, tone: 'theta', weight: 3 },
            { kind: 'label', id: 'l0', at: 'm0', tex: '', dot: true },
            { kind: 'label', id: 'l1', at: 'm1', tex: '', dot: true },
            { kind: 'label', id: 'l2', at: 'm2', tex: '', dot: true },
            { kind: 'label', id: 'l3', at: 'm3', tex: '', dot: true },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mid-ordinate rule', md: 'Split the area into $n$ strips of width $h$. Each rectangle’s height is $y$ at the **midpoint** of its strip.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\displaystyle\\int_a^b y\\,dx \\approx h(y_1 + \\dots + y_n)', 'h = \\dfrac{b - a}{n}'] },
      ],
      lines: [
        { say: 'Here is the area under a curve from x equals zero to x equals four.', show: ['g.xa', 'g.ya', 'g.cv'] },
        { say: 'The mid-ordinate rule splits it into strips of equal width, h. On each strip it draws a rectangle whose height is the value of y at the midpoint of the strip, called the mid-ordinate.', show: ['g.r0', 'g.r1', 'g.r2', 'g.r3', 'g.l0', 'g.l1', 'g.l2', 'g.l3', 'def'] },
        { say: 'Part of each rectangle sits above the curve, and part of the curve sits above the rectangle, so the errors partly cancel.' },
        { say: 'The estimate is the strip width times the sum of the mid-ordinates, where h is the width of the interval divided by the number of strips.', show: ['m.0', 'm.1'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'From a formula',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Estimate $\\displaystyle\\int_0^4 (x^2 + 1)\\,dx$ with $4$ strips.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['h = 1, \\quad x = 0.5, \\ 1.5, \\ 2.5, \\ 3.5', 'y = 1.25, \\ 3.25, \\ 7.25, \\ 13.25', '\\text{area} \\approx 1 \\times 25 = 25'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the ends of the strips', md: 'With $n$ strips there are $n$ mid-ordinates; the trapezium rule uses $n + 1$ ordinates.' },
      ],
      lines: [
        { say: 'Let’s estimate this integral with four strips.', show: 'q' },
        { say: 'The width of each strip is four over four, which is one. So the midpoints are zero point five, one point five, two point five and three point five.', show: 'm.0', focus: 'm.0' },
        { say: 'Putting these into x squared plus one gives the mid-ordinates: one point two five, three point two five, seven point two five and thirteen point two five.', show: 'm.1', focus: 'm.1' },
        { say: 'They add up to twenty-five, and the width is one, so the estimate is twenty-five.', show: 'm.2', focus: 'm.2' },
        { say: 'Use the y values at the middle of each strip, not at its ends.', show: 'oops' },
      ],
    },
    {
      chapter: 'How accurate is it?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left[\\dfrac{x^3}{3} + x\\right]_0^4 = \\dfrac{76}{3} \\approx 25.33', '\\dfrac{25.33 - 25}{25.33} \\times 100 \\approx 1.3\\%'] },
        { kind: 'text', id: 'bend', md: 'Bends upwards (convex): an **underestimate**. Bends downwards (concave): an **overestimate**. The trapezium rule does the opposite.', size: 'md' },
      ],
      lines: [
        { say: 'Integrating exactly gives seventy-six over three, about twenty-five point three three.', show: 'm.0', focus: 'm.0' },
        { say: 'So the percentage error is about one point three percent. More strips give a better estimate.', show: 'm.1', focus: 'm.1' },
        { say: 'Whether the rule gives too much or too little depends on how the curve bends. For a curve that bends upwards, like this one, it gives an underestimate. For a curve that bends downwards, it gives an overestimate. The trapezium rule does the opposite, so the true area lies between the two estimates.', show: 'bend' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The mid-ordinates of four strips of width $0.5$ are $2.1$, $2.6$, $3.4$ and $4.5$. Estimate the area.',
          choices: ['$12.6$', '$25.2$', '$3.15$', '$6.3$'],
          answer: 3,
          working: 'Area $\\approx 0.5(2.1 + 2.6 + 3.4 + 4.5) = 0.5 \\times 12.6 = 6.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Estimate the area from these four mid-ordinates, with strips of width zero point five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The mid-ordinates add up to twelve point six, and half of that is six point three. Choice A forgets to multiply by the width.', show: 'q.answer' },
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
          items: ['Area $\\approx h(y_1 + \\dots + y_n)$, with $y$ at the midpoints.', '$h = \\dfrac{b - a}{n}$; more strips give a better estimate.', 'It underestimates when the curve bends upwards.', 'It overestimates when the curve bends downwards.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mid-ordinate rule multiplies the strip width by the sum of the y values at the midpoints of the strips.', show: 'sum.0' },
        { say: 'The width is the interval divided by the number of strips, and more strips give a better estimate.', show: 'sum.1' },
        { say: 'It underestimates for a curve that bends upwards.', show: 'sum.2' },
        { say: 'And it overestimates for a curve that bends downwards. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
