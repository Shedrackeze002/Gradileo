import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const k = Math.log(1.6) / 3;
const N = (t: number) => 500 * Math.exp(k * t);
const g = plane({ x: [0, 10], y: [0, 2500], xStep: 2, yStep: 500, width: 6, height: 5, titles: { x: 't', y: 'N' } });

const video: Explainer = {
  id: 'mx-19-6',
  lessonId: 'mx-19-6',
  title: 'Separable Differential Equations',
  thumbnail: 'gr',
  summary: 'A differential equation dy/dx = f(x)g(y) is separable: ∫1/g(y) dy = ∫f(x) dx. So dy/dx = 2xy with y = 3 at x = 0 gives y = 3e^(x²). Growth at a rate proportional to size, dN/dt = kN, gives N = N₀e^(kt): from N = 500 and 800 at t = 3, k ≈ 0.157 and N ≈ 2395 at t = 10. Cooling to a room at 20°C gives θ = 20 + Ae^(−kt).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Calculus and Numerical Methods', title: 'Separable Differential Equations', subtitle: 'Growth, decay and cooling' }],
      lines: [
        { say: 'A population that grows faster the bigger it gets, or a cup of tea that cools faster the hotter it is, is described by a differential equation: an equation with a derivative in it.', show: 'title' },
        { say: 'Many can be solved by separating the variables. In this video, you will solve them, and use them as models.' },
      ],
    },
    {
      chapter: 'Separating the variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Separable', md: 'If $\\dfrac{dy}{dx} = f(x)g(y)$, then $\\displaystyle\\int \\frac{1}{g(y)}\\,dy = \\int f(x)\\,dx$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{dy}{dx} = 2xy \\quad\\Rightarrow\\quad \\int \\frac{1}{y}\\,dy = \\int 2x\\,dx', '\\ln|y| = x^2 + c \\quad\\Rightarrow\\quad y = Ae^{x^2}', 'y = 3 \\text{ at } x = 0 \\quad\\Rightarrow\\quad A = 3, \\quad y = 3e^{x^2}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'One constant is enough', md: 'The constants from both sides combine into one. Add it on the side with $x$, straight away.' },
      ],
      lines: [
        { say: 'If d y by d x is a function of x times a function of y, put everything with y on one side and everything with x on the other. Then integrate both sides.', show: 'def' },
        { say: 'Solve d y by d x equals two x y, given that y is three when x is zero. Dividing by y, the integral of one over y d y equals the integral of two x d x.', show: 'm.0', focus: 'm.0' },
        { say: 'So ln of y equals x squared plus c. Taking e to the power of both sides, y equals "A" e to the x squared, where "A" is e to the c. This is the general solution.', show: 'm.1', focus: 'm.1' },
        { say: 'Putting in x equals zero and y equals three gives "A" equals three. So the particular solution is y equals three e to the x squared.', show: 'm.2', focus: 'm.2' },
        { say: 'You only need one constant. Add it on the side with x as soon as you integrate, and find it before you rearrange.', show: 'mis' },
      ],
    },
    {
      chapter: 'Modelling growth',
      layout: 'split',
      leftWidth: 520,
      left: [figure('gr', [g, plot(g, { id: 'n', f: N, from: 0, to: 10, label: 'N = 500e^{kt}', labelAt: 0.55 }), dots(g, [{ id: 'p0', x: 0, y: 500, tex: '(0, 500)', place: 'below right' }, { id: 'p3', x: 3, y: 800, tex: '(3, 800)', place: 'below right' }, { id: 'p10', x: 10, y: N(10), tex: '(10, 2395)', place: 'left', tone: 'theta' }])], 440)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{dN}{dt} = kN \\quad\\Rightarrow\\quad N = N_0e^{kt}', '800 = 500e^{3k}', 'k = \\tfrac{1}{3}\\ln 1.6 \\approx 0.157', 'N(10) = 500e^{10k} \\approx 2395'] },
        { kind: 'callout', id: 'cool', tone: 'key', title: 'Cooling', md: 'In a room at $20^\\circ$C: $\\dfrac{d\\theta}{dt} = -k(\\theta - 20)$, so $\\theta = 20 + Ae^{-kt}$.' },
      ],
      lines: [
        { say: 'If a quantity N grows at a rate proportional to its size, then d N by d t equals k N. Separating the variables gives N equals N nought e to the k t.', show: 'm.0', focus: 'm.0' },
        { say: 'A population is five hundred at the start, and eight hundred at t equals three. So eight hundred equals five hundred e to the three k.', show: ['gr.grid', 'gr.axes', 'gr.n', 'gr.p0', 'gr.p3', 'm.1'], focus: 'm.1' },
        { say: 'Divide by five hundred and take logs: k is a third of ln one point six, about zero point one five seven. A positive k means growth, and a negative k would mean decay.', show: 'm.2', focus: 'm.2' },
        { say: 'The model predicts N is about two thousand three hundred ninety five when t is ten. Keep k unrounded in your calculator to get this.', show: ['m.3', 'gr.p10'], focus: ['m.3', 'gr.p10'] },
        { say: 'A cooling object follows a similar rule. In a room at twenty degrees, the temperature theta is twenty plus "A" e to the negative k t, so it falls towards twenty.', show: 'cool' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{dy}{dx} = y$, given that $y = 5$ when $x = 0$.',
          choices: ['$y = e^x + 5$', '$y = 5x$', '$y = 5e^x$', '$y = e^{5x}$'],
          answer: 2,
          working: '$\\displaystyle\\int \\frac{1}{y}\\,dy = \\int 1\\,dx$, so $\\ln|y| = x + c$ and $y = Ae^x$. At $x = 0$, $A = 5$, so $y = 5e^x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve d y by d x equals y, given that y is five when x is zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Separating gives ln y equals x plus c, so y equals "A" e to the x. When x is zero, "A" is five, so y equals five e to the x. Choice A adds the constant in the wrong place.', show: 'q.answer' },
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
          items: ['For $\\dfrac{dy}{dx} = f(x)g(y)$: $\\displaystyle\\int \\frac{1}{g(y)}\\,dy = \\int f(x)\\,dx$.', 'Add one constant, and use a known point to find it.', '$\\dfrac{dN}{dt} = kN$ gives $N = N_0e^{kt}$; cooling gives $\\theta = T + Ae^{-kt}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a separable differential equation, separate the variables and integrate both sides.', show: 'sum.0' },
        { say: 'Add one constant, and use a known point to find it.', show: 'sum.1' },
        { say: 'And growth at a rate proportional to size gives an exponential model. That completes the A level topics. Well done, and good luck in your exams!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
