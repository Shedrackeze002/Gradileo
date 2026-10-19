import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { panels } from './lib/m31-3-graphs.ts';

// The two special cases: y = x (slope 1 everywhere) and y = 3 (slope 0 everywhere).
const special = figure(
  'sp',
  [
    panels({
      x: [-3, 3],
      y: [-3, 4],
      size: 4.2,
      gap: 7.5,
      list: [
        { name: 'p1', f: (x) => x, caption: 'y = x', sub: '\\text{slope } 1', subTone: 'good' },
        { name: 'p2', f: () => 3, tone: 'opp', caption: 'y = 3', sub: '\\text{slope } 0', subTone: 'good' },
      ],
    }),
  ],
  330,
);

const video: Explainer = {
  id: 'm31-4-1',
  lessonId: 'm31-4-1',
  title: 'The Power, Constant and Sum Rules, Part 1: The Power Rule',
  thumbnailTitle: 'The Power Rule',
  thumbnail: false,
  summary: 'The derivatives found from first principles (x², x³, 1/x and √x) all follow one pattern, the power rule: the derivative of xⁿ is nxⁿ⁻¹ for any real n. The special cases d/dx(x) = 1 and d/dx(c) = 0, and differentiating x⁷, x⁻³ and x^(2/3), including subtracting 1 from a negative or fractional exponent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 1', title: 'The Power Rule', subtitle: 'Any power of x, in one step' }],
      lines: [
        { say: 'Finding derivatives from the limit definition works, but it takes many lines of algebra. Imagine expanding x plus h, all to the power ten!', show: 'title' },
        { say: 'In this video, you will meet the power rule, which differentiates any power of x in a single step.' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Derivative (from first principles)'],
          rows: [
            ['$x^2$', '$2x^1$'],
            ['$x^3$', '$3x^2$'],
            ['$\\dfrac{1}{x} = x^{-1}$', '$-\\dfrac{1}{x^2} = -1x^{-2}$'],
            ['$\\sqrt{x} = x^{1/2}$', '$\\dfrac{1}{2\\sqrt{x}} = \\tfrac{1}{2}x^{-1/2}$'],
          ],
        },
      ],
      lines: [
        { say: 'From first principles, we found that x squared has derivative two x, which is two x to the power one. And x cubed has derivative three x squared.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'In each case, the old power comes down in front, and the new power is one less.' },
        { say: 'Now look at one over x. Written as a power, it is x to the power negative one. Its derivative, negative one over x squared, is negative one times x to the power negative two. The power negative one came down in front, and the new power is one less: negative two.', show: 't.2', focus: 't.2' },
        { say: 'And the square root of x is x to the power one half. Its derivative, one over two root x, is one half times x to the power negative one half. Again, the power came down, and one half minus one is negative one half.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'The power rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Power rule', md: 'For any real number $n$, the derivative of $x^n$ is $nx^{n-1}$. Bring the exponent down as a coefficient, then subtract $1$ from the exponent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\left(x^{\\opp{n}}\\right) = \\opp{n}x^{\\opp{n} - 1}'] },
      ],
      lines: [
        { say: 'This pattern is called the power rule. For any real number n, the derivative of x to the power n is n times x to the power n minus one.', show: ['def', 'm'], focus: 'm' },
        { say: 'In words: bring the exponent down in front, as a coefficient. Then subtract one from the exponent.' },
        { say: 'The rule works for every real exponent: whole numbers, negative numbers and fractions. In the next part, we prove it for positive whole numbers.' },
      ],
    },
    {
      chapter: 'Two special cases',
      layout: 'center',
      main: [
        special,
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{d}{dx}(x) = 1x^0 = 1 \\qquad \\dfrac{d}{dx}(c) = 0'] },
      ],
      lines: [
        { say: 'Two special cases are worth knowing by heart. First, x is x to the power one. The power rule gives one times x to the power zero, which is one.', show: ['m', 'sp.p1-grid', 'sp.p1-axes', 'sp.p1-curve', 'sp.p1-text'], focus: 'sp.p1-curve' },
        { say: 'That makes sense: the graph of y equals x is a straight line with slope one everywhere.' },
        { say: 'Second, the derivative of any constant is zero. The graph of a constant, such as y equals three, is a horizontal line. Its slope is zero everywhere, so its derivative is zero.', show: ['sp.p2-grid', 'sp.p2-axes', 'sp.p2-curve', 'sp.p2-text'], focus: 'sp.p2-curve' },
      ],
    },
    {
      chapter: 'Single powers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $x^7$, $x^{-3}$ and $x^{2/3}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{d}{dx}\\left(x^{7}\\right) = 7x^{6}',
            '\\dfrac{d}{dx}\\left(x^{-3}\\right) = -3x^{-4} = -\\dfrac{3}{x^{4}}',
            '\\dfrac{d}{dx}\\left(x^{2/3}\\right) = \\tfrac{2}{3}x^{-1/3} = \\dfrac{2}{3\\sqrt[3]{x}}',
          ],
        },
      ],
      lines: [
        { say: 'Let’s use the rule. Differentiate x to the seventh, x to the power negative three, and x to the power two thirds.', show: 'q' },
        { say: 'For x to the seventh, bring the seven down, and subtract one from the exponent: seven x to the sixth.', show: 'm.0', focus: 'm.0' },
        { say: 'For x to the power negative three, bring negative three down. Then subtract one: negative three minus one is negative four. So the derivative is negative three x to the power negative four, which is negative three over x to the fourth.', show: 'm.1', focus: 'm.1' },
        { say: 'For x to the power two thirds, bring two thirds down. Two thirds minus one is negative one third. So the derivative is two thirds x to the power negative one third.', show: 'm.2', focus: 'm.2' },
        { say: 'A negative exponent means one over a power, and an exponent of one third is a cube root. So this is two, over three times the cube root of x.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting 1 from a negative exponent', md: 'Subtracting $1$ always makes the exponent **smaller**, even when it is negative: $-3 - 1 = -4$, not $-2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{d}{dx}\\left(x^{-3}\\right) = -3x^{-2}}', '\\good{\\dfrac{d}{dx}\\left(x^{-3}\\right) = -3x^{-4}}'] },
      ],
      lines: [
        { say: 'Watch out with negative exponents. A common mistake is to go from negative three to negative two.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But subtracting one always makes a number smaller. On a number line, one less than negative three is negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'The same goes for fractions. One half minus one is negative one half, and two thirds minus one is negative one third.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $x^{-5}$.',
          choices: ['$-5x^{-6}$', '$-5x^{-4}$', '$5x^{-6}$', '$-4x^{-6}$'],
          answer: 0,
          working: 'Bring $-5$ down and subtract $1$ from the exponent: $-5 - 1 = -6$, so the derivative is $-5x^{-6} = -\\dfrac{5}{x^6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate x to the power negative five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Bring negative five down, and subtract one from the exponent: negative five minus one is negative six. So the derivative is negative five x to the power negative six. Choice B goes up from negative five to negative four, instead of down.', show: 'q.answer' },
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
          items: [
            'Power rule: $\\dfrac{d}{dx}\\left(x^n\\right) = nx^{n-1}$, for any real $n$.',
            '$\\dfrac{d}{dx}(x) = 1$, and the derivative of a constant is $0$.',
            'Subtracting $1$ from a negative exponent makes it more negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The power rule says the derivative of x to the power n is n times x to the power n minus one, for any real number n.', show: 'sum.0' },
        { say: 'The derivative of x is one, and the derivative of a constant is zero.', show: 'sum.1' },
        { say: 'And subtracting one from a negative exponent makes it more negative. In the next part, we see why the power rule works. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
