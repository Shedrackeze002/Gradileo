import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-2-2-c',
  lessonId: 'm31-2-2',
  title: 'Evaluating Limits Algebraically, Part 3: Rationalizing',
  thumbnailTitle: 'Rationalizing with the Conjugate',
  summary: 'When a square root causes 0/0, multiply the numerator and denominator by the conjugate: (√A − B)(√A + B) = A − B² removes the root. The limit of (√(x + 9) − 3)/x as x → 0 is 1/6, which a table of values confirms; leave the denominator factored so the common factor can cancel.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 3', title: 'Rationalizing', subtitle: 'Clearing a square root with the conjugate' }],
      lines: [
        { say: 'Factoring cancels the zero over zero in many limits. But when a square root is involved, there is often nothing obvious to factor.', show: 'title' },
        { say: 'In this video, you will learn a second method: multiplying by the conjugate, which removes the square root so the common factor appears.' },
      ],
    },
    {
      chapter: 'A square root',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = \\dfrac{\\sqrt{x + 9} - 3}{x} \\qquad f(0)\\colon \\ \\dfrac{\\sqrt{9} - 3}{0} = \\dfrac{0}{0}'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$-0.1$', '$0.16713$'], ['$-0.01$', '$0.16671$'], ['$0.01$', '$0.16662$'], ['$0.1$', '$0.16621$']] },
      ],
      lines: [
        { say: 'Evaluate the limit as x approaches zero of the square root of x plus nine, minus three, all over x.', show: 'm', focus: 'm' },
        { say: 'Substituting zero gives the square root of nine, minus three, over zero. That is zero over zero again.', focus: 'm' },
        { say: 'A table suggests an answer. From the left, the values are about 0.1671, then 0.1667. From the right, about 0.1666, then 0.1662. They close in on about 0.1667, which is one sixth. Now let’s prove it.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'The conjugate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conjugate', md: 'The conjugate of $\\sqrt{A} - B$ is $\\sqrt{A} + B$: the same two terms with the opposite sign between them.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(\\sqrt{A} - B)(\\sqrt{A} + B) = A - B^2', '(\\sqrt{x + 9} - 3)(\\sqrt{x + 9} + 3) = (x + 9) - 9 = x'] },
      ],
      lines: [
        { say: 'The conjugate of the square root of A, minus B, is the square root of A, plus B. It has the same two terms, with the opposite sign between them.', show: 'def' },
        { say: 'Multiplying a pair of conjugates is like a difference of squares. The middle terms cancel, and the square root, squared, is just A. So the product is A minus B squared, with no square root left.', show: 'm.0', focus: 'm.0' },
        { say: 'Here, the numerator is the square root of x plus nine, minus three. Times its conjugate, it becomes x plus nine, minus nine, which is just x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Multiplying by the conjugate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{\\sqrt{x + 9} - 3}{x} \\cdot \\dfrac{\\sqrt{x + 9} + 3}{\\sqrt{x + 9} + 3}', '= \\dfrac{(x + 9) - 9}{x(\\sqrt{x + 9} + 3)} = \\dfrac{\\bad{x}}{\\bad{x}(\\sqrt{x + 9} + 3)}', '= \\dfrac{1}{\\sqrt{x + 9} + 3} \\quad (x \\ne 0)', '\\lim_{x \\to 0} \\dfrac{1}{\\sqrt{x + 9} + 3} = \\dfrac{1}{3 + 3} = \\dfrac{1}{6}'],
        },
      ],
      lines: [
        { say: 'Multiply the top and the bottom by the conjugate of the numerator, the square root of x plus nine, plus three. That is the same as multiplying by one, so the value does not change.', show: 'm.0', focus: 'm.0' },
        { say: 'The top becomes x plus nine, minus nine, which is x. Leave the bottom as x times the square root of x plus nine, plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the common factor shows itself. Cancel x from the top and the bottom, which leaves one over the square root of x plus nine, plus three.', show: 'm.2', focus: 'm.2' },
        { say: 'This time, substituting zero causes no trouble: one over three plus three, which is one sixth. That matches the table.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Leave the denominator factored',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Leave the denominator factored', md: 'After multiplying by the conjugate, do **not** expand the denominator. You want to see the factor that cancels.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{x(\\sqrt{x + 9} + 3)} \\qquad \\bad{x\\sqrt{x + 9} + 3x}'] },
      ],
      lines: [
        { say: 'Here is a tip. After multiplying by the conjugate, leave the denominator in factored form.', show: 'tip' },
        { say: 'Written as x times the square root of x plus nine, plus three, the factor x is easy to see and cancel. If you expand it, the x is hidden in two separate terms, and the cancelling is much harder to spot.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$.',
          choices: ['$\\dfrac{1}{4}$', '$4$', '$0$', '$\\dfrac{1}{2}$'],
          answer: 0,
          working: 'Multiply by $\\dfrac{\\sqrt{x} + 2}{\\sqrt{x} + 2}$: $\\dfrac{x - 4}{(x - 4)(\\sqrt{x} + 2)} = \\dfrac{1}{\\sqrt{x} + 2}$, so the limit is $\\dfrac{1}{2 + 2} = \\dfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches four of the square root of x, minus two, over x minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply the top and bottom by the square root of x, plus two. The top becomes x minus four, which cancels with the bottom, leaving one over the square root of x, plus two. At four, that is one quarter. Choice D drops the plus two in the denominator.', show: 'q.answer' },
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
          items: ['When a square root causes $0/0$, multiply the top and bottom by the conjugate.', '$(\\sqrt{A} - B)(\\sqrt{A} + B) = A - B^2$ removes the root.', 'Leave the denominator factored, cancel, then substitute.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When a square root causes zero over zero, multiply the top and the bottom by the conjugate.', show: 'sum.0' },
        { say: 'A pair of conjugates multiplies to A minus B squared, which removes the square root.', show: 'sum.1' },
        { say: 'Leave the denominator factored, cancel the common factor, then substitute. In the next part, we meet a special limit that no algebra can cancel. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
