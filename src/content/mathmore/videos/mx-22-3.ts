import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-22-3',
  lessonId: 'mx-22-3',
  title: 'Simple Quadratic Equations',
  thumbnail: 'm',
  summary: 'The equation x² = k has two solutions when k is positive, one when k is zero and none when k is negative. x² = 49 gives x = 7 or x = −7. Get x² by itself first: x² − 81 = 0 gives x = ±9. When k is not a perfect square, leave ±√k or round: x² = 20 gives x ≈ ±4.47.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions and Simple Quadratic Equations', title: 'Simple Quadratic Equations', subtitle: 'Solving x² = k' }],
      lines: [
        { say: 'A square garden has an area of forty-nine square metres. How long is each side? Answering that question means solving the simplest kind of quadratic equation.', show: 'title' },
        { say: 'In this video, you will learn to solve equations where a variable squared equals a number, and to tell how many solutions there are.' },
      ],
    },
    {
      chapter: 'Quadratic equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic equation', md: 'An equation in which the highest power of the variable is $2$. A **solution** is a value of the variable that makes the equation true.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['x^2 = k'] },
      ],
      lines: [
        { say: 'A quadratic equation is an equation in which the highest power of the variable is two.', show: 'def' },
        { say: 'The simplest kind says that x squared equals a number, which we call k. A solution is a value of x that makes the equation true.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two solutions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x^2 = 49', '7 \\times 7 = 49', '({-7}) \\times ({-7}) = 49', 'x = 7 \\ \\text{ or } \\ x = {-7}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the negative solution', md: '$\\sqrt{49}$ means the positive root only. The equation $x^2 = 49$ asks for **every** number whose square is $49$.' },
      ],
      lines: [
        { say: 'Solve x squared equals forty-nine. We ask: which numbers have a square of forty-nine?', show: 'm.0', focus: 'm.0' },
        { say: 'Seven times seven is forty-nine, so seven is a solution.', show: 'm.1', focus: 'm.1' },
        { say: 'But negative seven times negative seven is also forty-nine, because a negative times a negative is positive.', show: 'm.2', focus: 'm.2' },
        { say: 'So the equation has two solutions: seven and negative seven. We can write this as plus or minus seven.', show: 'm.3', focus: 'm.3' },
        { say: 'The square root symbol gives only the positive root. The equation asks for every number that works, so do not forget the negative one.', show: 'oops' },
      ],
    },
    {
      chapter: 'How many solutions?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['$k$ is', 'Solutions of $x^2 = k$', 'Example'],
          rows: [
            ['positive', 'two: $\\sqrt{k}$ and $-\\sqrt{k}$', '$x^2 = 25$: $x = \\pm 5$'],
            ['zero', 'one: $x = 0$', '$x^2 = 0$'],
            ['negative', 'none', '$x^2 = -16$'],
          ],
        },
      ],
      lines: [
        { say: 'The number of solutions depends on the sign of k. When k is positive, there are two solutions: the positive square root and the negative square root.', show: 'tb.0' },
        { say: 'When k is zero, there is one solution, zero.', show: 'tb.1' },
        { say: 'When k is negative, there is no solution among the real numbers, because the square of a number is never negative.', show: 'tb.2' },
      ],
    },
    {
      chapter: 'Rearranging first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 81 = 0', 'x^2 = 81', 'x = \\pm 9'] },
        { kind: 'math', id: 'n', size: 'lg', lines: ['x^2 - 20 = 0 \\ \\Rightarrow \\ x = \\pm\\sqrt{20} \\approx \\pm 4.47'] },
      ],
      lines: [
        { say: 'When the equation is not in this form yet, get x squared by itself first. Solve x squared minus eighty-one equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Add eighty-one to both sides. Now x squared equals eighty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'Take both square roots. The solutions are nine and negative nine.', show: 'm.2', focus: 'm.2' },
        { say: 'When k is not a perfect square, the solutions are irrational. For x squared equals twenty, we can leave them as plus or minus the square root of twenty, or round them to plus or minus four point four seven.', show: 'n.0', focus: 'n.0' },
        { say: 'In a real context, keep only the solutions that make sense. The side of the garden cannot be negative, so it is seven metres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 + 36 = 0$.',
          choices: ['$x = 6$ or $x = -6$', '$x = 6$ only', '$x = -6$ only', 'No solution'],
          answer: 3,
          working: 'Subtract $36$: $x^2 = -36$. The square of a number is never negative, so there is no solution.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared plus thirty-six equals zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Subtract thirty-six from both sides, and x squared equals negative thirty-six. The square of a number is never negative, so there is no solution. Choice A would be right for x squared minus thirty-six.', show: 'q.answer' },
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
          items: ['$x^2 = k$ with $k > 0$: two solutions, $x = \\pm\\sqrt{k}$.', '$k = 0$: one solution. $k < 0$: no solution.', 'Get $x^2$ by itself before taking square roots.', 'In a context, keep only the solutions that make sense.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When k is positive, x squared equals k has two solutions: plus and minus the square root of k.', show: 'sum.0' },
        { say: 'When k is zero there is one solution, and when k is negative there is none.', show: 'sum.1' },
        { say: 'Get x squared by itself before taking square roots.', show: 'sum.2' },
        { say: 'And in a real context, keep only the solutions that make sense. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
