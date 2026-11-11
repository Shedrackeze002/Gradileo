import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-27-2',
  lessonId: 'mx-27-2',
  title: 'The Angle of Inclination of a Line',
  thumbnail: 'm',
  summary: 'The angle of inclination θ is measured anticlockwise from the positive x-axis, from 0° to 180°, and the gradient is m = tan θ. A gradient of 2 gives θ = 63.4°. For a negative gradient, add 180° to the calculator’s answer: m = −1.5 gives 123.7°. The angle between two lines is the difference of their inclinations, and m = tan θ gives the gradient back from the angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry Theorems, Vectors and Transformation Matrices', title: 'The Angle of Inclination of a Line', subtitle: 'Gradients as angles' }],
      lines: [
        { say: 'The gradient tells us how steep a line is, as a number. The same steepness can be given as an angle, and trigonometry links the two.', show: 'title' },
        { say: 'In this video, you will learn to change between a line’s gradient and its angle of inclination.' },
      ],
    },
    {
      chapter: 'The angle of inclination',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 400,
          points: { O: [-1, 0], X: [6, 0], P: [0, 0], Q: [4, 0], R: [4, 3], S: [5, 3.75] },
          items: [
            { kind: 'line', id: 'xa', from: 'O', to: 'X', arrow: true, weight: 2.5 },
            { kind: 'line', id: 'ln', from: 'P', to: 'S', tone: 'brand', weight: 3 },
            { kind: 'line', id: 'run', from: 'P', to: 'Q', tone: 'adj', label: '\\text{run}', labelSide: 'right' },
            { kind: 'line', id: 'rise', from: 'Q', to: 'R', tone: 'opp', label: '\\text{rise}', labelSide: 'left' },
            { kind: 'angle', id: 'th', at: 'P', from: 'Q', to: 'R', tone: 'theta', label: '\\theta', r: 60, labelDist: 85 },
            { kind: 'right', id: 'rt', at: 'Q', from: 'P', to: 'R' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle of inclination', md: 'The angle $\\theta$ from the positive $x$-axis to the line, measured anticlockwise, with $0° \\le \\theta < 180°$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = \\dfrac{\\text{rise}}{\\text{run}} = \\tan\\theta'] },
      ],
      lines: [
        { say: 'The angle of inclination of a line is the angle it makes with the positive direction of the x-axis, measured anticlockwise.', show: ['g.xa', 'g.ln', 'g.th', 'def'] },
        { say: 'Under the line is a right-angled triangle. Its horizontal side is the run, and its vertical side is the rise.', show: ['g.run', 'g.rise', 'g.rt'] },
        { say: 'The gradient is rise over run, which is also opposite over adjacent for the angle theta. So the gradient is tan theta.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Gradient to angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = 2: \\ \\theta = \\tan^{-1}(2) \\approx 63.4°', 'm = {-1.5}: \\ \\tan^{-1}({-1.5}) \\approx {-56.3}°', '\\theta = 180° - 56.3° = 123.7°'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving a negative angle', md: 'An angle of inclination is never negative. For a negative gradient, add $180°$.' },
      ],
      lines: [
        { say: 'To go from a gradient to an angle, use the inverse tangent. A gradient of two gives an angle of about sixty-three point four degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'A line that slopes downwards has a negative gradient. For a gradient of negative one point five, the calculator gives about negative fifty-six point three degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add on a hundred and eighty degrees. The angle of inclination is a hundred and twenty-three point seven degrees, which is obtuse.', show: 'm.2', focus: 'm.2' },
        { say: 'An angle of inclination is never negative, so always add on a hundred and eighty degrees when the gradient is negative.', show: 'oops' },
      ],
    },
    {
      chapter: 'Between two lines',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 3x - 1: \\ \\theta_1 = \\tan^{-1}(3) \\approx 71.57°', 'y = {-x} + 4: \\ \\theta_2 = 180° - 45° = 135°', '135° - 71.57° \\approx 63.4°'] },
        { kind: 'math', id: 'n', size: 'lg', lines: ['\\theta = 45°, \\ (2, 7): \\ m = 1, \\ c = 5, \\ y = x + 5'] },
      ],
      lines: [
        { say: 'Two lines that cross make an angle equal to the difference between their inclinations. The first line has a gradient of three, so its inclination is about seventy-one point five seven degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'The second has a gradient of negative one, so its inclination is a hundred and thirty-five degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The difference is about sixty-three point four degrees, which is already acute. If it were more than ninety, we would subtract it from a hundred and eighty.', show: 'm.2', focus: 'm.2' },
        { say: 'Going the other way, the gradient is tan theta. A line at forty-five degrees has a gradient of one, and through the point with x equal to two and y equal to seven, its equation is y equals x plus five.', show: 'n.0', focus: 'n.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the angle of inclination of the line through $(1, 2)$ and $(5, 9)$.',
          choices: ['$29.7°$', '$60.3°$', '$119.7°$', '$74.1°$'],
          answer: 1,
          working: '$m = \\dfrac{9 - 2}{5 - 1} = \\dfrac{7}{4}$, so $\\theta = \\tan^{-1}\\left(\\dfrac{7}{4}\\right) \\approx 60.3°$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the angle of inclination of the line through these two points. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The gradient is seven over four, and the inverse tangent of seven over four is about sixty point three degrees. Choice A uses four over seven, the run over the rise.', show: 'q.answer' },
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
          items: ['$\\theta$ is measured anticlockwise from the positive $x$-axis.', '$m = \\tan\\theta$, so $\\theta = \\tan^{-1}(m)$.', 'For a negative gradient, add $180°$.', 'The angle between two lines is the difference of their inclinations.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The angle of inclination is measured anticlockwise from the positive x-axis.', show: 'sum.0' },
        { say: 'The gradient is tan theta, so the angle is the inverse tangent of the gradient.', show: 'sum.1' },
        { say: 'For a negative gradient, add on a hundred and eighty degrees.', show: 'sum.2' },
        { say: 'And the angle between two lines is the difference of their inclinations. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
