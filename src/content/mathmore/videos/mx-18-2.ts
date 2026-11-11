import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-18-2',
  lessonId: 'mx-18-2',
  title: 'Reciprocal and Inverse Trigonometric Functions',
  thumbnail: 'm',
  summary: 'sec θ = 1/cos θ, cosec θ = 1/sin θ and cot θ = 1/tan θ, and dividing sin²θ + cos²θ = 1 gives 1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ. To solve sec x = 2.5, solve cos x = 0.4: x ≈ 66.4° or 293.6°. The inverse functions give one angle each: arcsin and arctan from −π/2 to π/2, arccos from 0 to π, so arccos(−½) = 2π/3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Trigonometry', title: 'Reciprocal and Inverse Trigonometric Functions', subtitle: 'sec, cosec, cot, and arcsin, arccos, arctan' }],
      lines: [
        { say: 'Dividing one by sine, cos and tan gives three more functions. And undoing sine, cos and tan gives three more again.', show: 'title' },
        { say: 'In this video, you will meet all six, solve equations with them, and see why the inverse functions only work on carefully chosen ranges.' },
      ],
    },
    {
      chapter: 'Sec, cosec and cot',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\operatorname{cosec}\\theta = \\frac{1}{\\sin\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta} = \\frac{\\cos\\theta}{\\sin\\theta}'] },
        { kind: 'math', id: 'i', size: 'md', lines: ['1 + \\tan^2\\theta = \\sec^2\\theta', '1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'sec is not cos⁻¹', md: '$\\sec 60^\\circ = \\dfrac{1}{\\cos 60^\\circ} = 2$, while $\\cos^{-1} 0.5 = 60^\\circ$.' },
      ],
      lines: [
        { say: 'Secant theta is one over cos theta. Cosecant theta is one over sine theta. And cotangent theta is one over tan theta, which is cos theta over sine theta.', show: 'f', focus: 'f' },
        { say: 'Each is undefined where the function underneath it is zero, so their graphs have asymptotes there.' },
        { say: 'Divide sine squared plus cos squared equals one by cos squared, and you get one plus tan squared equals secant squared.', show: 'i.0', focus: 'i.0' },
        { say: 'Divide by sine squared instead, and you get one plus cotangent squared equals cosecant squared.', show: 'i.1', focus: 'i.1' },
        { say: 'Secant is not the inverse of cos. Secant of sixty degrees is one over a half, which is two, while the inverse cos of a half is sixty degrees.', show: 'mis' },
      ],
    },
    {
      chapter: 'Solving with sec',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Solve $\\sec x = 2.5$ for $0^\\circ \\le x < 360^\\circ$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\cos x = \\frac{1}{2.5} = 0.4', 'x = \\cos^{-1} 0.4 \\approx 66.4^\\circ', 'x \\approx 360^\\circ - 66.4^\\circ = 293.6^\\circ'] },
      ],
      lines: [
        { say: 'Solve secant x equals two point five, for x from zero up to three hundred sixty degrees.', show: 'q' },
        { say: 'Turn it upside down: cos x equals one over two point five, which is zero point four.', show: 'm.0', focus: 'm.0' },
        { say: 'The inverse cos of zero point four is about sixty six point four degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Cos is also positive in the fourth quadrant, so the other solution is three hundred sixty minus sixty six point four, which is two hundred ninety three point six degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Inverse functions',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Function', 'Gives an angle from', 'For'], rows: [['$\\arcsin x$', '$-\\tfrac{\\pi}{2}$ to $\\tfrac{\\pi}{2}$', '$-1 \\le x \\le 1$'], ['$\\arccos x$', '$0$ to $\\pi$', '$-1 \\le x \\le 1$'], ['$\\arctan x$', 'between $-\\tfrac{\\pi}{2}$ and $\\tfrac{\\pi}{2}$', 'every real $x$']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\arccos\\left(-\\tfrac{1}{2}\\right) = \\tfrac{2\\pi}{3}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Draw a triangle', md: 'For $\\sin\\left(\\arccos \\tfrac{3}{5}\\right)$: adjacent $3$, hypotenuse $5$, so opposite $4$, and the answer is $\\tfrac{4}{5}$.' },
      ],
      lines: [
        { say: 'The inverse functions undo sine, cos and tan. But many angles share the same sine, so each inverse gives the one angle in a chosen range.', show: 't.0' },
        { say: 'Arc sine gives an angle from negative pi over two to pi over two. Arc cos gives an angle from zero to pi. Both need x between negative one and one.', show: 't.1', focus: ['t.0', 't.1'] },
        { say: 'Arc tan works for every x, and gives an angle strictly between negative pi over two and pi over two.', show: 't.2', focus: 't.2' },
        { say: 'For example, arc cos of negative a half is two pi over three, because that is the angle between zero and pi whose cos is negative a half.', show: 'm', focus: 'm' },
        { say: 'To find something like sine of arc cos three fifths, draw a right-angled triangle with adjacent side three and hypotenuse five. The opposite side is four, so the answer is four fifths.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\operatorname{cosec} x = 2$ for $0^\\circ \\le x < 360^\\circ$.',
          choices: ['$60^\\circ$ and $300^\\circ$', '$30^\\circ$ only', '$60^\\circ$ and $120^\\circ$', '$30^\\circ$ and $150^\\circ$'],
          answer: 3,
          working: '$\\sin x = \\tfrac{1}{2}$, so $x = 30^\\circ$ or $180^\\circ - 30^\\circ = 150^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve cosecant x equals two, for x from zero up to three hundred sixty degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Sine x equals a half, so x is thirty degrees, or one hundred eighty minus thirty, which is one hundred fifty degrees. Choice A solves cos x equals a half instead.', show: 'q.answer' },
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
          items: ['$\\sec\\theta = \\dfrac{1}{\\cos\\theta}$, $\\operatorname{cosec}\\theta = \\dfrac{1}{\\sin\\theta}$, $\\cot\\theta = \\dfrac{1}{\\tan\\theta}$.', '$1 + \\tan^2\\theta = \\sec^2\\theta$ and $1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta$.', 'To solve $\\sec x = k$, solve $\\cos x = \\dfrac{1}{k}$.', '$\\arcsin$, $\\arccos$ and $\\arctan$ each give one angle in a fixed range.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Secant, cosecant and cotangent are one over cos, sine and tan.', show: 'sum.0' },
        { say: 'One plus tan squared is secant squared, and one plus cotangent squared is cosecant squared.', show: 'sum.1' },
        { say: 'To solve an equation in secant, turn it upside down and solve with cos.', show: 'sum.2' },
        { say: 'And the inverse functions each give one angle, in a fixed range. In the next lesson, we combine a sine and a cos into a single wave. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
