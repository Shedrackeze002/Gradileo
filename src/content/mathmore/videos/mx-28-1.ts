import type { Explainer } from '@/video/script.ts';

const data: [number, number][] = [[1, 3], [2, 5], [3, 4], [4, 8], [5, 10]];
/** The y-axis is drawn at half scale, so the graph is not too tall and narrow. */
const fit = (x: number) => (0.9 + 1.7 * x) / 2;
const points: Record<string, [number, number]> = { O: [0, 0], X: [6, 0], Y: [0, 5.5], L0: [0.4, fit(0.4)], L1: [5.6, fit(5.6)], M: [3, 3] };
data.forEach(([x, y], i) => {
  points[`p${i}`] = [x, y / 2];
  points[`f${i}`] = [x, fit(x)];
});

const video: Explainer = {
  id: 'mx-28-1',
  lessonId: 'mx-28-1',
  title: 'The Least Squares Regression Line',
  thumbnail: 'm',
  summary: 'The least squares regression line of y on x, y = a + bx, makes the sum of the squared residuals as small as possible. Its gradient is b = Sxy/Sxx and its intercept is a = ȳ − bx̄, because it passes through the mean point. For x: 1 to 5 and y: 3, 5, 4, 8, 10, Sxx = 10 and Sxy = 17, so y = 0.9 + 1.7x. Interpolation inside the data is reliable; extrapolation is not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Regression, Expected Value and Statistical Tests', title: 'The Least Squares Regression Line', subtitle: 'A line of best fit by calculation' }],
      lines: [
        { say: 'When a scatter graph shows a straight-line pattern, we can draw a line of best fit by eye. But two people will draw two different lines.', show: 'title' },
        { say: 'In this video, you will learn to calculate the least squares regression line, so everyone with the same data gets the same line, and to use it for estimates.' },
      ],
    },
    {
      chapter: 'Residuals',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 440,
          points,
          items: [
            { kind: 'line', id: 'xa', from: 'O', to: 'X', arrow: true, weight: 2.5 },
            { kind: 'line', id: 'ya', from: 'O', to: 'Y', arrow: true, weight: 2.5 },
            { kind: 'line', id: 'fit', from: 'L0', to: 'L1', tone: 'brand', weight: 3 },
            ...data.map((_, i) => ({ kind: 'line' as const, id: `r${i}`, from: `p${i}`, to: `f${i}`, tone: 'bad' as const, weight: 2.5 })),
            ...data.map((_, i) => ({ kind: 'label' as const, id: `d${i}`, at: `p${i}`, tex: '', dot: true })),
            { kind: 'label', id: 'mp', at: 'M', tex: '(\\bar{x}, \\bar{y})', place: 'above left', dot: true, tone: 'theta' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Least squares regression line', md: 'The line $y = a + bx$ that makes the sum of the squared **residuals** as small as possible.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['b = \\dfrac{S_{xy}}{S_{xx}}, \\quad a = \\bar{y} - b\\bar{x}'] },
      ],
      lines: [
        { say: 'Here are five points on a scatter graph, and a line through them.', show: ['g.xa', 'g.ya', 'g.d0', 'g.d1', 'g.d2', 'g.d3', 'g.d4', 'g.fit'] },
        { say: 'Each short vertical gap between a point and the line is called a residual.', show: ['g.r0', 'g.r1', 'g.r2', 'g.r3', 'g.r4'] },
        { say: 'The least squares regression line of y on x is the one line that makes the sum of the squared residuals as small as possible.', show: 'def' },
        { say: 'Its gradient is S x y over S x x, and it always passes through the mean point, which gives the intercept: "a" equals y bar minus b times x bar.', show: ['m.0', 'g.mp'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'From a table',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$x$: $1, 2, 3, 4, 5$ and $y$: $3, 5, 4, 8, 10$', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\textstyle\\sum x = 15, \\ \\sum y = 30, \\ \\sum x^2 = 55, \\ \\sum xy = 107', 'S_{xx} = 55 - \\dfrac{15^2}{5} = 10, \\quad S_{xy} = 107 - \\dfrac{15 \\times 30}{5} = 17', 'b = 1.7, \\quad a = 6 - 1.7 \\times 3 = 0.9', 'y = 0.9 + 1.7x'] },
      ],
      lines: [
        { say: 'Let’s find the regression line for these five pairs.', show: 'q' },
        { say: 'First find the sums: the sum of x is fifteen, the sum of y is thirty, the sum of x squared is fifty-five, and the sum of x y is a hundred and seven.', show: 'm.0', focus: 'm.0' },
        { say: 'S x x is fifty-five minus fifteen squared over five, which is ten. S x y is a hundred and seven minus fifteen times thirty over five, which is seventeen.', show: 'm.1', focus: 'm.1' },
        { say: 'So b is seventeen over ten, one point seven. The means are three and six, so "a" is six minus one point seven times three, which is zero point nine.', show: 'm.2', focus: 'm.2' },
        { say: 'The regression line is y equals zero point nine plus one point seven x. A calculator in statistics mode gives the same values straight from the table.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Using the line',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Revision time $x$ hours ($2$ to $12$) and test mark $y$: $y = 34 + 3x$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 7: \\ y = 34 + 3 \\times 7 = 55'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Interpolation and extrapolation', md: 'An estimate inside the range of the data is usually reliable. Outside the range, it is not.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the wrong line', md: 'The line of $y$ on $x$ is for estimating $y$ from $x$, not $x$ from $y$.' },
      ],
      lines: [
        { say: 'The regression line for some data on revision time and test marks is y equals thirty-four plus three x. The gradient, three, means that each extra hour of revision adds about three marks, on average.', show: 'q' },
        { say: 'To estimate the mark for seven hours, put x equal to seven into the equation. The estimate is fifty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven is inside the range of the data, so this is interpolation, and it is usually reliable. An estimate for thirty hours would be extrapolation, which is not reliable, because nothing tells us the pattern carries on.', show: 'tip' },
        { say: 'And use this line only to estimate y from x. Rearranging it to estimate x from y does not give the best estimate.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\bar{x} = 4$, $\\bar{y} = 20$, $S_{xx} = 50$ and $S_{xy} = 125$. Find the regression line of $y$ on $x$.',
          choices: ['$y = 2.5 + 20x$', '$y = 0.4 + 18.4x$', '$y = 20 + 2.5x$', '$y = 10 + 2.5x$'],
          answer: 3,
          working: '$b = \\dfrac{125}{50} = 2.5$ and $a = 20 - 2.5 \\times 4 = 10$, so $y = 10 + 2.5x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the regression line of y on x from these summary statistics. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. B is a hundred and twenty-five over fifty, which is two point five, and "a" is twenty minus two point five times four, which is ten. Choice C forgets to subtract b times x bar.', show: 'q.answer' },
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
          items: ['$y = a + bx$ with $b = \\dfrac{S_{xy}}{S_{xx}}$ and $a = \\bar{y} - b\\bar{x}$.', 'It passes through $(\\bar{x}, \\bar{y})$.', '$b$ is the average change in $y$ for each unit of $x$.', 'Interpolation is reliable; extrapolation is not.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The regression line of y on x has gradient S x y over S x x, and intercept y bar minus b x bar.', show: 'sum.0' },
        { say: 'It always passes through the mean point.', show: 'sum.1' },
        { say: 'Its gradient is the average change in y for each unit of x.', show: 'sum.2' },
        { say: 'And estimates inside the range of the data are reliable, while those outside it are not. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
