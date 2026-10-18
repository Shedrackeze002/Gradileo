import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, note, num, plane, plot, rename, tangent } from './lib/m31-6-graphs.ts';

// y = √x and its tangent line L(x) = 5 + (x − 25)/10 at (25, 5).
const g = rename(plane({ x: [0, 42], y: [0, 8], xStep: 5, yStep: 1, every: 0, width: 7.4, height: 4.6 }), 'x', 'y');

const video: Explainer = {
  id: 'm31-6-1-d',
  lessonId: 'm31-6-1',
  title: 'Tangent Lines and Linear Approximation, Part 4: Linear Approximation',
  thumbnailTitle: 'Linear Approximation',
  thumbnail: false,
  summary: 'Near x = a, the tangent line L(x) = f(a) + f′(a)(x − a) stays close to the curve, so f(x) ≈ L(x). Estimating √26 ≈ 5.1 from a = 25, estimating a change with Δf ≈ f′(a)Δx (a cube of edge 10 cm grows by about 30 cm³ when each edge grows by 0.1 cm), and why a must be close to x: from a = 25, √40 comes out 6.5 instead of 6.32.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 4', title: 'Linear Approximation', subtitle: 'Estimating with the tangent line' }],
      lines: [
        { say: 'Without a calculator, what is the square root of 26? It is a little more than five, but how much more?', show: 'title' },
        { say: 'Near a point, a curve and its tangent line are almost the same, and a line is easy to work out. In this video, you will use the tangent line to estimate values like this one.' },
      ],
    },
    {
      chapter: 'The linearization',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear approximation', md: 'The **linearization** of $f$ at $a$ is the tangent-line function $L(x)$. For $x$ near $a$, the **linear approximation** is $f(x) \\approx L(x)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ["L(x) = f(a) + f'(a)(x - a)"] },
      ],
      lines: [
        { say: 'Solve the tangent line equation for y, and call it L of x: L of x equals f of "a", plus f prime of "a", times x minus "a". This is called the linearization of f at "a".', show: ['def', 'm'], focus: 'm' },
        { say: 'For x near "a", the tangent line stays very close to the curve, so f of x is approximately L of x. That is the linear approximation.' },
        { say: 'Choose "a" close to the x you want, with f of "a" and f prime of "a" easy to find.' },
      ],
    },
    {
      chapter: 'Estimating a square root',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\sqrt{x}, \\quad a = 25, \\quad f(25) = 5',
            "f'(x) = \\frac{1}{2\\sqrt{x}}, \\quad f'(25) = \\frac{1}{10}",
            'L(x) = 5 + \\tfrac{1}{10}(x - 25)',
            'L(26) = 5 + \\tfrac{1}{10}(1) = 5.1',
          ],
        },
        { kind: 'text', id: 'c', md: 'A calculator gives $\\sqrt{26} = 5.0990\\ldots$' },
      ],
      lines: [
        { say: 'Estimate the square root of 26. Use f of x equals the square root of x, and choose "a" equals 25, the nearest perfect square. f of 25 is five.', show: 'm.0', focus: 'm.0' },
        { say: 'The derivative of the square root of x is one over two times the square root of x. At 25, that is one over two times five: one tenth.', show: 'm.1', focus: 'm.1' },
        { say: 'So the linearization is L of x equals five, plus one tenth, times x minus 25.', show: 'm.2', focus: 'm.2' },
        { say: 'At x equals 26, x minus 25 is one, so L of 26 is five plus one tenth: 5.1. The square root of 26 is about 5.1.', show: 'm.3', focus: 'm.3' },
        { say: 'A calculator gives 5.0990, so the estimate is off by only about one thousandth.', show: 'c' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'center',
      main: [
        figure('la', [
          g,
          edgeNumbers(g, { xs: [0, 5, 10, 15, 20, 25, 30, 35, 40], ys: [0, 2, 4, 6, 8], xTex: num, yTex: num }),
          plot(g, { id: 'f', f: Math.sqrt, samples: 300 }),
          note(g, { id: 'f-t', x: 20, y: 2.6, tex: 'y = \\sqrt{x}', tone: 'brand' }),
          tangent(g, { id: 't', a: 25, y: 5, m: 0.1, left: 23, right: 17, tone: 'opp', dot: '(25, 5)', place: 'above left' }),
          note(g, { id: 't-t', x: 12, y: 5.3, tex: 'L(x)', tone: 'opp' }),
          dots(g, [
            { id: 'e', x: 40, y: 6.5, tex: '6.5', tone: 'opp', place: 'above left', group: 'far' },
            { id: 'r', x: 40, y: Math.sqrt(40), tex: '6.32', tone: 'brand', place: 'below right', group: 'far' },
          ]),
        ]),
      ],
      lines: [
        { say: 'Here is the graph of y equals the square root of x, with its tangent line at the point at 25, five.', show: ['la.grid', 'la.axes', 'la.f', 'la.f-t', 'la.t-all', 'la.t-t'] },
        { say: 'Near x equals 25, the curve and the line are almost the same, which is why 5.1 is such a good estimate.', focus: 'la.t' },
        { say: 'The curve bends downward, so the tangent line lies slightly above it. That means this estimate is a little too big: 5.1 is just above the true value, 5.0990.', focus: 'la.f' },
        { say: 'But farther away, the gap grows. At x equals 40, the line is at 6.5, while the curve is at only about 6.32.', show: 'la.far', focus: 'la.far' },
      ],
    },
    {
      chapter: 'Estimating a change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Small changes', md: "The same idea estimates a change: $\\Delta f \\approx f'(a)\\,\\Delta x$." },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ["V = s^{3}, \\quad V'(s) = 3s^{2}, \\quad V'(10) = 300", '\\Delta V \\approx 300(0.1) = 30\\text{ cm}^{3}', 'V(10.1) \\approx 1000 + 30 = 1030\\text{ cm}^{3} \\quad (\\text{exact: } 1030.301)'],
        },
      ],
      lines: [
        { say: 'The same idea estimates a change. A small change in x, delta x, changes f by about f prime of "a" times delta x.', show: 'key' },
        { say: 'A cube has edges of ten centimetres. Its volume is s cubed, and the derivative is three s squared, which is 300 when s is ten.', show: 'm.0', focus: 'm.0' },
        { say: 'If each edge grows by 0.1 centimetres, the volume grows by about 300 times 0.1: thirty cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'So the new volume is about one thousand and thirty cubic centimetres. The exact volume is 1,030.301 cubic centimetres: very close.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Straying too far from a', md: 'The approximation is only good **near** $a$. Using $a = 25$ to estimate $\\sqrt{40}$ gives $L(40) = 6.5$, but $\\sqrt{40} \\approx 6.32$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{a = 25\\colon\\ L(40) = 5 + \\tfrac{1}{10}(15) = 6.5}', '\\good{a = 36\\colon\\ L(40) = 6 + \\tfrac{1}{12}(4) \\approx 6.33}'] },
      ],
      lines: [
        { say: 'Watch out: the approximation is only good near "a". Using "a" equals 25 to estimate the square root of 40 gives 6.5, but the true value is about 6.32.', show: 'oops' },
        { say: 'Forty is fifteen away from 25, and over that distance the curve bends well away from the line.', show: 'm.0', focus: 'm.0' },
        { say: 'Choose a closer perfect square instead. From "a" equals 36, f of 36 is six and f prime of 36 is one twelfth, so L of 40 is six plus four twelfths, about 6.33: much better.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use a linear approximation at $a = 49$ to estimate $\\sqrt{50}$.',
          choices: ['$7.5$', '$7.071$', '$7.143$', '$7.010$'],
          answer: 1,
          working: "$f(49) = 7$ and $f'(49) = \\dfrac{1}{2\\sqrt{49}} = \\dfrac{1}{14}$, so $L(50) = 7 + \\dfrac{1}{14}(1) \\approx 7.071$.",
        },
      ],
      lines: [
        { say: 'Your turn. Use a linear approximation at "a" equals 49 to estimate the square root of 50. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. f of 49 is seven, and f prime of 49 is one over two times seven: one fourteenth. So L of 50 is seven plus one fourteenth, about 7.071. Choice C forgets the two in the derivative, and uses one seventh.', show: 'q.answer' },
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
          items: ["Linear approximation: $f(x) \\approx f(a) + f'(a)(x - a)$ for $x$ near $a$.", "Changes: $\\Delta f \\approx f'(a)\\,\\Delta x$.", 'Choose $a$ close to $x$, with $f(a)$ and $f\'(a)$ easy to find.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For x near "a", f of x is approximately f of "a", plus f prime of "a" times x minus "a": the height of the tangent line.', show: 'sum.0' },
        { say: 'A small change in x changes f by about f prime of "a", times the change in x.', show: 'sum.1' },
        { say: 'And choose "a" close to x, where f of "a" and f prime of "a" are easy to find. Next, we use the derivative to find where a function rises, falls, and reaches its highest and lowest values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
