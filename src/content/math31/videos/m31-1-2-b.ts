import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-1-2-b',
  lessonId: 'm31-1-2',
  title: 'Trigonometry and Logarithms for Calculus, Part 2: Solving Equations with e and ln',
  thumbnailTitle: 'Solving with e and ln',
  summary: 'Solving exponential and logarithmic equations with the natural logarithm: isolate the power of e and take ln of both sides (3e^(0.4t) − 2 = 13 gives t ≈ 4.024), combine logs and reject a solution whose log is undefined (ln x + ln(x − 2) = ln 8 gives x = 4), and solve a quadratic in eˣ (e^(2x) − 5eˣ + 6 = 0 gives x = ln 2 or ln 3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 2', title: 'Solving Equations with e and ln', subtitle: 'Isolate, then take the natural log' }],
      lines: [
        { say: 'How long until an investment doubles, or a population reaches a target? Questions like these lead to equations with the unknown in an exponent.', show: 'title' },
        { say: 'In this video, you will solve equations with e and the natural log: three kinds that come up again and again in calculus.' },
      ],
    },
    {
      chapter: 'An exponential equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3e^{0.4t} - 2 = 13', '3e^{0.4t} = 15', 'e^{0.4t} = 5', '\\ln(e^{0.4t}) = \\ln 5 \\quad \\Rightarrow \\quad 0.4t = \\ln 5', 't = \\dfrac{\\ln 5}{0.4} \\approx 4.024'] },
      ],
      lines: [
        { say: 'Solve three e to the power 0.4 t, minus two, equals thirteen. Round to the nearest thousandth.', show: 'm.0', focus: 'm.0' },
        { say: 'The plan is to get the power of e by itself, then take the natural log of both sides. First, add two to both sides: three e to the power 0.4 t equals fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by three: e to the power 0.4 t equals five. Now the power of e is alone.', show: 'm.2', focus: 'm.2' },
        { say: 'Take the natural log of both sides. The natural log undoes e, so the left side is just the exponent: 0.4 t equals the natural log of five.', show: 'm.3', focus: 'm.3' },
        { say: 'Divide by 0.4. The natural log of five is about 1.609, so t is about 4.024.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A logarithmic equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ln x + \\ln(x - 2) = \\ln 8', '\\ln\\big(x(x - 2)\\big) = \\ln 8 \\quad \\Rightarrow \\quad x^2 - 2x = 8', 'x^2 - 2x - 8 = 0 \\quad \\Rightarrow \\quad (x - 4)(x + 2) = 0', 'x = 4 \\quad \\text{or} \\quad \\bad{x = -2}'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check every logarithm', md: 'Every logarithm in the equation needs a positive argument. $x = -2$ gives $\\ln(-2)$, which is undefined, so reject it.' },
      ],
      lines: [
        { say: 'Next, solve the natural log of x, plus the natural log of x minus two, equals the natural log of eight.', show: 'm.0', focus: 'm.0' },
        { say: 'The product law combines the left side into one log: the natural log of x times x minus two. If two natural logs are equal, their arguments are equal, so x squared minus two x equals eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Move the eight across: x squared minus two x minus eight equals zero. This factors as x minus four, times x plus two.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is four, or x is negative two.', show: 'm.3', focus: 'm.3' },
        { say: 'Now check each one in the original equation. With x equals negative two, the first term is the natural log of negative two, which is undefined. So reject negative two.', show: 'tip' },
        { say: 'With x equals four, the left side is the natural log of four plus the natural log of two, which is the natural log of eight. So the only solution is x equals four.' },
      ],
    },
    {
      chapter: 'A quadratic in disguise',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['e^{2x} - 5e^x + 6 = 0', 'e^{2x} = (e^x)^2, \\quad \\text{let } u = e^x\\colon \\quad u^2 - 5u + 6 = 0', '(u - 2)(u - 3) = 0 \\quad \\Rightarrow \\quad e^x = 2 \\ \\text{ or } \\ e^x = 3', 'x = \\ln 2 \\approx 0.693 \\quad \\text{or} \\quad x = \\ln 3 \\approx 1.099'],
        },
      ],
      lines: [
        { say: 'Finally, solve e to the power two x, minus five e to the x, plus six, equals zero. Round to the nearest thousandth.', show: 'm.0', focus: 'm.0' },
        { say: 'Look closely. e to the power two x is e to the x, squared. So if we call e to the x by a new name, u, the equation becomes u squared minus five u plus six equals zero. It is a quadratic in disguise.', show: 'm.1', focus: 'm.1' },
        { say: 'It factors as u minus two, times u minus three. So u is two or three, which means e to the x is two, or e to the x is three.', show: 'm.2', focus: 'm.2' },
        { say: 'Take the natural log of each. x is the natural log of two, about 0.693, or the natural log of three, about 1.099.', show: 'm.3', focus: 'm.3' },
        { say: 'Both are fine, because two and three are positive. If the quadratic had given e to the x equals a negative number, we would reject it: e to the x is always positive.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2e^{3x} + 1 = 9$. Round to the nearest thousandth.',
          choices: ['$x \\approx 0.693$', '$x \\approx 4.159$', '$x \\approx 0.501$', '$x \\approx 0.462$'],
          answer: 3,
          working: '$2e^{3x} = 8$, so $e^{3x} = 4$. Then $3x = \\ln 4$, and $x = \\dfrac{\\ln 4}{3} \\approx 0.462$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two e to the power three x, plus one, equals nine. Round to the nearest thousandth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Subtract one and divide by two: e to the power three x equals four. Take the natural log: three x equals the natural log of four, so x is about 0.462. Choice A forgets to divide by two before taking the natural log.', show: 'q.answer' },
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
          items: ['Isolate the power of $e$, then take $\\ln$ of both sides.', 'Combine logs with the laws; if $\\ln A = \\ln B$, then $A = B$.', 'Reject any solution that puts a zero or negative number inside a log.', 'Spot a quadratic in $e^x$, and let $u = e^x$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve an exponential equation, get the power of e by itself, then take the natural log of both sides.', show: 'sum.0' },
        { say: 'To solve a log equation, combine the logs with the laws. If two natural logs are equal, their arguments are equal.', show: 'sum.1' },
        { say: 'Reject any solution that puts zero or a negative number inside a log.', show: 'sum.2' },
        { say: 'And watch for a quadratic in e to the x. In the next part, we review radians and exact values. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
