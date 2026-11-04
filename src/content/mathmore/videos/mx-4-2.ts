import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 3], y: [-1, 11], every: 2 });

const video: Explainer = {
  id: 'mx-4-2',
  lessonId: 'mx-4-2',
  title: 'Complex Solutions of Quadratic Equations',
  thumbnail: 'gr',
  summary: 'For a positive number n, √(−n) = i√n, so x² + 16 = 0 gives x = ±4i. When the discriminant b² − 4ac is negative, the quadratic formula gives two complex solutions that are conjugates: x² + 2x + 5 = 0 has x = −1 ± 2i, and its graph never crosses the x-axis.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Complex Numbers and Polynomials', title: 'Complex Solutions of Quadratic Equations', subtitle: 'Every quadratic has solutions' }],
      lines: [
        { say: 'The graph of y equals x squared plus two x plus five never touches the x-axis. So the equation x squared plus two x plus five equals zero has no real solutions.', show: 'title' },
        { say: 'With complex numbers, it has two. In this video, you will learn to find complex solutions, so that every quadratic equation can be solved.' },
      ],
    },
    {
      chapter: 'Square roots of negative numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The square root of a negative number', md: 'For a positive number $n$, $\\sqrt{-n} = i\\sqrt{n}$. So $x^2 = -n$ has the two solutions $x = \\pm i\\sqrt{n}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x^2 + 16 = 0', 'x^2 = -16', 'x = \\pm\\sqrt{-16} = \\pm 4i'] },
      ],
      lines: [
        { say: 'For a positive number n, the square root of negative n is i times the square root of n. So x squared equals negative n has two solutions: plus or minus i times the square root of n.', show: 'def' },
        { say: 'Let’s solve x squared plus sixteen equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract sixteen: x squared equals negative sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'So x is plus or minus the square root of negative sixteen, which is plus or minus four i. The solutions are four i and negative four i.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The discriminant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['x = \\dfrac{-b \\pm \\sqrt{\\opp{b^2 - 4ac}}}{2a}'] },
        { kind: 'bullets', id: 'b', items: ['$b^2 - 4ac > 0$: two real solutions.', '$b^2 - 4ac = 0$: one real solution (a repeated root).', '$b^2 - 4ac < 0$: two **complex** solutions, $p + qi$ and $p - qi$, which are conjugates.'] },
      ],
      lines: [
        { say: 'Recall the quadratic formula: x equals negative b, plus or minus the square root of b squared minus four "a" c, all over two "a".', show: 'f' },
        { say: 'The part under the square root, b squared minus four "a" c, is called the discriminant. It decides what kind of solutions there are.', focus: 'f' },
        { say: 'When it is positive, there are two real solutions. When it is zero, there is one real solution, a repeated root.', show: ['b.0', 'b.1'] },
        { say: 'And when it is negative, there are two complex solutions, p plus q i and p minus q i. They are conjugates of each other.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Two complex solutions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x^2 + 2x + 5 = 0 \\qquad a = 1,\\ b = 2,\\ c = 5', 'b^2 - 4ac = 4 - 20 = -16', 'x = \\dfrac{-2 \\pm \\sqrt{-16}}{2} = \\dfrac{-2 \\pm 4i}{2}', 'x = -1 + 2i \\quad \\text{or} \\quad x = -1 - 2i'] },
      ],
      lines: [
        { say: 'Now let’s solve x squared plus two x plus five equals zero. Here "a" is one, b is two, and c is five.', show: 'm.0', focus: 'm.0' },
        { say: 'The discriminant is two squared, minus four times one times five. That is four minus twenty, which is negative sixteen. It is negative, so we expect two complex solutions.', show: 'm.1', focus: 'm.1' },
        { say: 'The square root of negative sixteen is four i. So x equals negative two, plus or minus four i, all over two.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide both parts by two. x is negative one plus two i, or negative one minus two i. They are conjugates, just as expected.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'What the graph shows',
      layout: 'center',
      main: [
        figure('gr', [g, plot(g, { id: 'p', f: (x) => x * x + 2 * x + 5, tone: 'brand' })], 520),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing only one term', md: 'In $\\dfrac{-2 \\pm 4i}{2}$, **both** $-2$ and $4i$ are divided by $2$: $-1 \\pm 2i$, not $-2 \\pm 2i$.' },
      ],
      lines: [
        { say: 'Here is the graph of y equals x squared plus two x plus five. Its lowest point is at negative one, four, so it stays above the x-axis.', show: ['gr.grid', 'gr.axes', 'gr.p'], focus: 'gr.p' },
        { say: 'It never crosses the x-axis, so there are no real solutions. A quadratic with a negative discriminant always looks like this, with its two complex solutions off the real number line.' },
        { say: 'One last warning. In negative two plus or minus four i, over two, divide both terms by two, to get negative one plus or minus two i. Writing negative two plus or minus two i divides only the imaginary part.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 - 4x + 13 = 0$.',
          choices: ['$x = 2 \\pm 3i$', '$x = -2 \\pm 3i$', '$x = 4 \\pm 6i$', '$x = 2 \\pm 6i$'],
          answer: 0,
          working: 'Discriminant: $16 - 52 = -36$, and $\\sqrt{-36} = 6i$. So $x = \\dfrac{4 \\pm 6i}{2} = 2 \\pm 3i$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared minus four x plus thirteen equals zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The discriminant is sixteen minus 52, which is negative 36, and its square root is six i. So x is four plus or minus six i, over two, which is two plus or minus three i. Choice D divides only the real part by two.', show: 'q.answer' },
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
          items: ['$\\sqrt{-n} = i\\sqrt{n}$, so $x^2 = -n$ gives $x = \\pm i\\sqrt{n}$.', 'A negative discriminant gives two complex solutions.', 'They are conjugates, $p + qi$ and $p - qi$.', 'The graph does not cross the $x$-axis.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The square root of negative n is i times the square root of n, so x squared equals negative n has the solutions plus or minus i root n.', show: 'sum.0' },
        { say: 'When the discriminant is negative, the quadratic formula gives two complex solutions.', show: 'sum.1' },
        { say: 'The two solutions are conjugates, p plus q i and p minus q i.', show: 'sum.2' },
        { say: 'And the graph of such a quadratic does not cross the x-axis. In the next lesson, we look at polynomial identities, and count the roots of any polynomial. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
