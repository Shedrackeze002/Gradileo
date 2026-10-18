import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-3-b',
  lessonId: 'm302-4-3',
  title: 'Rational Equations, Part 2: Extraneous Roots',
  thumbnailTitle: 'Extraneous Roots',
  summary: 'Why multiplying by an expression that can be zero can create an extraneous root, an equation with no solution (x/(x − 3) = 2 + 3/(x − 3), whose only root x = 3 is rejected), and x/(x + 4) + 2/(x − 4) = 16/(x² − 16), where x = 4 is rejected and x = −2 survives the check. Part 3 solves work-rate problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 2', title: 'Extraneous Roots', subtitle: 'Answers that make a denominator zero' }],
      lines: [
        { say: 'Multiplying both sides of an equation by an expression with the variable in it can create answers that do not work in the original equation.', show: 'title' },
        { say: 'In this video, you will see why, reject these extraneous roots, and solve an equation that has no solution at all.' },
      ],
    },
    {
      chapter: 'Extraneous roots',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'A solution of the cleared equation that is a non-permissible value of the original equation. It must be rejected.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 3: \\quad \\text{multiplying by } (x - 3) \\text{ is multiplying by } 0'] },
      ],
      lines: [
        { say: 'An extraneous root is a solution of the cleared equation, the one without fractions, that is a non-permissible value of the original equation. It must be rejected.', show: 'def' },
        { say: 'Why does this happen? Suppose you multiply both sides by x minus three. When x is three, you are multiplying both sides by zero, and zero equals zero is always true.', show: 'm', focus: 'm' },
        { say: 'So the cleared equation can be true at x equals three, even though the original equation is undefined there.' },
      ],
    },
    {
      chapter: 'No solution',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x}{x - 3} = 2 + \\dfrac{3}{x - 3}, \\quad x \\ne 3',
            'x = 2(x - 3) + 3',
            'x = 2x - 6 + 3 = 2x - 3 \\quad\\to\\quad x = 3',
            'x = 3 \\text{ is non-permissible: extraneous}',
            '\\text{no solution}',
          ],
        },
      ],
      lines: [
        { say: 'Solve x over x minus three equals two plus three over x minus three. The non-permissible value is x equals three.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply every term by x minus three, including the two. That gives x equals two times x minus three, plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand: two x minus six plus three is two x minus three. So x equals two x minus three. Subtract x from both sides, and add three: x equals three.', show: 'm.2', focus: 'm.2' },
        { say: 'But x equals three makes both denominators zero. It is extraneous, so it must be rejected.', show: 'm.3', focus: 'm.3' },
        { say: 'It was the only root, so this equation has no solution at all.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'One root survives',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x}{x + 4} + \\dfrac{2}{x - 4} = \\dfrac{16}{x^2 - 16}',
            'x^2 - 16 = (x + 4)(x - 4), \\quad x \\ne -4, \\ 4',
            'x(x - 4) + 2(x + 4) = 16',
            'x^2 - 4x + 2x + 8 = 16 \\quad\\to\\quad x^2 - 2x - 8 = 0',
            '(x - 4)(x + 2) = 0 \\quad\\to\\quad x = 4 \\ \\text{or} \\ x = -2',
          ],
        },
      ],
      lines: [
        { say: 'Solve x over x plus four, plus two over x minus four, equals sixteen over x squared minus sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor the last denominator: x plus four, times x minus four. So the non-permissible values are negative four and four, and the LCD is x plus four, times x minus four.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply every term by the LCD. The first term keeps x minus four: x times x minus four. The second keeps x plus four: two times x plus four. And the right side is just sixteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand: x squared minus four x, plus two x plus eight, equals sixteen. Collect the terms, and subtract sixteen: x squared minus two x minus eight equals zero.', show: 'm.3', focus: 'm.3' },
        { say: 'Factor: x minus four, times x plus two, equals zero. So x is four, or x is negative two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Reject and check',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x = 4 \\text{ is non-permissible: extraneous}',
            '\\text{left: } \\dfrac{-2}{2} + \\dfrac{2}{-6} = -1 - \\dfrac{1}{3} = -\\dfrac{4}{3}',
            '\\text{right: } \\dfrac{16}{4 - 16} = \\dfrac{16}{-12} = -\\dfrac{4}{3} \\ \\checkmark',
            'x = -2',
          ],
        },
      ],
      lines: [
        { say: 'Four is a non-permissible value: it makes two of the denominators zero. So x equals four is extraneous, and it is rejected.', show: 'm.0', focus: 'm.0' },
        { say: 'Check negative two in the original equation. The left side is negative two over two, plus two over negative six: negative one minus one third, which is negative four thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'The right side is sixteen over four minus sixteen: sixteen over negative twelve, which is also negative four thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'So the only solution is x equals negative two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the check', md: 'Every algebra step can be correct and the answer still be wrong. Always compare your answers with the non-permissible values you wrote down at the start.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{x = 4 \\text{ or } x = -2} \\qquad \\good{x = -2}'] },
      ],
      lines: [
        { say: 'The most common mistake is to stop after factoring, and give both roots as the answer.', show: 'oops' },
        { say: 'Every algebra step was correct, and still x equals four is wrong, because the original equation is undefined there.', show: 'm', focus: 'm' },
        { say: 'So always compare your answers with the non-permissible values you wrote down at the start. That is why you write them down first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{x^2}{x - 2} = \\dfrac{4}{x - 2}$.',
          choices: ['$x = 2$', '$x = -2$', '$x = 2$ or $x = -2$', 'No solution'],
          answer: 1,
          working: '$x \\ne 2$. Multiply by $x - 2$: $x^2 = 4$, so $x = \\pm 2$. $x = 2$ is non-permissible, so it is extraneous. Check $x = -2$: $\\dfrac{4}{-4} = -1 = \\dfrac{4}{-4}$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared over x minus two equals four over x minus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Multiply both sides by x minus two: x squared equals four, so x is two or negative two. But two makes the denominators zero, so it is extraneous. Check negative two: four over negative four is negative one, on both sides. Choice C forgets to reject the extraneous root.', show: 'q.answer' },
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
          items: ['An extraneous root solves the cleared equation but is a non-permissible value.', 'Reject it; if every root is rejected, there is no solution.', 'Compare every answer with the non-permissible values, and check it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An extraneous root solves the cleared equation, but it is a non-permissible value of the original one.', show: 'sum.0' },
        { say: 'Reject it. If every root is rejected, the equation has no solution.', show: 'sum.1' },
        { say: 'And compare every answer with the non-permissible values, then check it. In part three, we use rational equations to find how long a job takes when people work together. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
