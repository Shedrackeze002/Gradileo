import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-19-5',
  lessonId: 'mx-19-5',
  title: 'Integrating with Partial Fractions',
  thumbnail: 'm',
  summary: 'Split a fraction with linear factors into partial fractions, then integrate each part with ∫1/(ax + b) dx = (1/a) ln|ax + b| + C. So (5x + 1)/((x − 1)(x + 1)) = 3/(x − 1) + 2/(x + 1), and its integral from 2 to 3 is 3 ln 2 + 2 ln 4/3 = ln(128/9) ≈ 2.65. Remember to divide by the coefficient of x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Calculus and Numerical Methods', title: 'Integrating with Partial Fractions', subtitle: 'Splitting a fraction into logarithms' }],
      lines: [
        { say: 'A fraction such as five x plus one, over x minus one times x plus one, has no obvious integral.', show: 'title' },
        { say: 'But split it into partial fractions, and each part integrates to a logarithm. In this video, you will integrate fractions like this, and write the answer as a single log.' },
      ],
    },
    {
      chapter: 'Linear fractions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\int \\frac{1}{x - a}\\,dx = \\ln|x - a| + C', '\\int \\frac{1}{ax + b}\\,dx = \\frac{1}{a}\\ln|ax + b| + C'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Divide by the coefficient of x', md: '$\\displaystyle\\int \\frac{6}{2x + 1}\\,dx = 3\\ln|2x + 1| + C$, not $6\\ln|2x + 1| + C$.' },
      ],
      lines: [
        { say: 'One over x integrates to ln of x. In the same way, one over x minus some number integrates to ln of the modulus of x minus that number.', show: 'f.0', focus: 'f.0' },
        { say: 'If x has a coefficient, divide by it. The integral of one over "a" x plus b is one over "a", times ln of the modulus of "a" x plus b.', show: 'f.1', focus: 'f.1' },
        { say: 'For example, the integral of six over two x plus one is three ln of two x plus one, not six. Differentiating ln of two x plus one gives two over two x plus one, so we divide by two.', show: 'mis' },
      ],
    },
    {
      chapter: 'A worked example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Find $\\displaystyle\\int_2^3 \\frac{5x + 1}{(x - 1)(x + 1)}\\,dx$, as a single logarithm.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5x + 1 \\equiv A(x + 1) + B(x - 1) \\quad\\Rightarrow\\quad A = 3, \\quad B = 2', '\\int_2^3 \\left(\\frac{3}{x - 1} + \\frac{2}{x + 1}\\right) dx = \\Big[3\\ln|x - 1| + 2\\ln|x + 1|\\Big]_2^3', '= (3\\ln 2 + 2\\ln 4) - (0 + 2\\ln 3) = 3\\ln 2 + 2\\ln\\tfrac{4}{3}', '= \\ln 8 + \\ln\\tfrac{16}{9} = \\ln\\tfrac{128}{9} \\approx 2.65'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Log laws', md: '$n\\ln a = \\ln a^n$, $\\quad \\ln a + \\ln b = \\ln ab$, $\\quad \\ln a - \\ln b = \\ln\\dfrac{a}{b}$' },
      ],
      lines: [
        { say: 'Find the integral from two to three of five x plus one, over x minus one times x plus one, as a single logarithm.', show: 'q' },
        { say: 'First, partial fractions. Five x plus one is "A" times x plus one, plus B times x minus one. Putting x equal to one gives "A" equals three, and x equal to negative one gives B equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'Each part integrates to a log: three ln of x minus one, plus two ln of x plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Put in the limits. At three, we get three ln two plus two ln four. At two, we get zero plus two ln three. The difference is three ln two, plus two ln of four thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'Now use the log laws. Three ln two is ln eight, and two ln of four thirds is ln of sixteen ninths. Adding logs multiplies, so the answer is ln of one hundred twenty eight over nine, about two point six five.', show: ['m.3', 'tip'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\int \\frac{4}{2x + 1}\\,dx$.',
          choices: ['$4\\ln|2x + 1| + C$', '$2\\ln|2x + 1| + C$', '$8\\ln|2x + 1| + C$', '$\\ln|2x + 1| + C$'],
          answer: 1,
          working: '$\\displaystyle\\int \\frac{4}{2x + 1}\\,dx = 4 \\times \\tfrac{1}{2}\\ln|2x + 1| + C = 2\\ln|2x + 1| + C$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the integral of four over two x plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Divide by the coefficient of x: four times a half, times ln of two x plus one, is two ln of two x plus one, plus C. Choice A forgets to divide by two, and choice C multiplies by two instead.', show: 'q.answer' },
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
          items: ['Split into partial fractions first.', '$\\displaystyle\\int \\frac{1}{ax + b}\\,dx = \\frac{1}{a}\\ln|ax + b| + C$.', 'Combine logs with $n\\ln a = \\ln a^n$, $\\ln a + \\ln b = \\ln ab$ and $\\ln a - \\ln b = \\ln\\dfrac{a}{b}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To integrate a fraction with linear factors, split it into partial fractions first.', show: 'sum.0' },
        { say: 'Each part integrates to a log. Remember to divide by the coefficient of x.', show: 'sum.1' },
        { say: 'And use the log laws to write the answer as a single log. In the next lesson, we solve differential equations by separating the variables. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
