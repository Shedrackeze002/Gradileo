import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-17-4',
  lessonId: 'mx-17-4',
  title: 'The Binomial Expansion for Any Rational n',
  thumbnail: 'm',
  summary: 'For any rational n, (1 + x)ⁿ = 1 + nx + n(n − 1)/2! x² + …, which never ends unless n is a positive whole number and is valid only for |x| < 1. (1 + 2x)^½ ≈ 1 + x − ½x², valid for |x| < ½. For (a + bx)ⁿ, take out aⁿ first: (4 + x)^½ = 2 + ¼x − 1/64 x² + … for |x| < 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Algebra and Vectors', title: 'The Binomial Expansion', subtitle: 'For any rational power' }],
      lines: [
        { say: 'For a positive whole number n, one plus x to the power n expands into a finite number of terms.', show: 'title' },
        { say: 'For other powers, such as negative one, or a half for a square root, the same formula still works. But it goes on for ever, and only makes sense when x is small. In this video, you will see how to use it.' },
      ],
    },
    {
      chapter: 'The general expansion',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['(1 + x)^n = 1 + nx + \\frac{n(n - 1)}{2!}x^2 + \\frac{n(n - 1)(n - 2)}{3!}x^3 + \\cdots'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Valid for |x| < 1', md: 'When $n$ is not a positive whole number, the series never ends, and it is **valid** (converges) only for $|x| < 1$.' },
      ],
      lines: [
        { say: 'For any rational number n, one plus x to the power n is one, plus n x, plus n times n minus one over two factorial, x squared, and so on. Each new term brings in the next factor, n minus two, n minus three, and the next factorial.', show: 'f', focus: 'f' },
        { say: 'When n is a positive whole number, a factor eventually becomes zero and the series stops. Otherwise it never ends.', show: 'def' },
        { say: 'An endless series only adds up to a finite value when its terms shrink, so the expansion is valid only when x is between negative one and one.' },
      ],
    },
    {
      chapter: 'A square root',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Expand $(1 + 2x)^{\\frac{1}{2}}$ up to the term in $x^2$, and state when it is valid.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1 + \\tfrac{1}{2}(2x) + \\dfrac{\\tfrac{1}{2}\\left({-\\tfrac{1}{2}}\\right)}{2}(2x)^2', '= 1 + x - \\tfrac{1}{8}(4x^2) = 1 + x - \\tfrac{1}{2}x^2', '|2x| < 1 \\;\\Rightarrow\\; |x| < \\tfrac{1}{2}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Raise the whole term', md: 'The $x^2$ term uses $(2x)^2 = 4x^2$, not $2x^2$.' },
      ],
      lines: [
        { say: 'Expand one plus two x, to the power one half, up to the x squared term. Here n is a half, and the role of x is played by two x.', show: 'q' },
        { say: 'So we get one, plus a half times two x, plus a half times negative a half, over two, times two x all squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Two x squared is four x squared, so this simplifies to one plus x minus a half x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'It is valid when two x is between negative one and one, which means x is between negative a half and a half.', show: 'm.2', focus: 'm.2' },
        { say: 'Put brackets round the whole term before raising it to a power. Squaring two x gives four x squared, not two x squared.', show: 'mis' },
      ],
    },
    {
      chapter: 'Other first terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(a + bx)^n = a^n\\left(1 + \\tfrac{b}{a}x\\right)^n, \\quad |x| < \\left|\\tfrac{a}{b}\\right|', '(4 + x)^{\\frac{1}{2}} = 2\\left(1 + \\tfrac{x}{4}\\right)^{\\frac{1}{2}}', '= 2 + \\tfrac{1}{4}x - \\tfrac{1}{64}x^2 + \\cdots, \\quad |x| < 4'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Approximating', md: '$\\sqrt{1.02} = (1 + 0.02)^{\\frac{1}{2}} \\approx 1 + 0.01 - 0.00005 = 1.00995$' },
      ],
      lines: [
        { say: 'The formula needs a one at the front of the bracket. For "a" plus b x, take out a factor of "a" to the power n first.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, four plus x, to the power a half, is the square root of four, which is two, times one plus x over four, to the power a half.', show: 'm.1', focus: 'm.1' },
        { say: 'Expanding gives two plus a quarter x minus one over sixty four x squared, valid when x over four is between negative one and one: that is, x between negative four and four.', show: 'm.2', focus: 'm.2' },
        { say: 'A few terms with a small x give an excellent estimate. The square root of one point zero two is about one point zero zero nine nine five.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the first two terms of the expansion of $(1 - x)^{-1}$.',
          choices: ['$1 + x$', '$1 - x$', '$-1 + x$', '$1 - 2x$'],
          answer: 0,
          working: '$n = -1$ and the “$x$” is $-x$: $1 + (-1)(-x) = 1 + x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the first two terms of the expansion of one minus x, to the power negative one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. n is negative one, and the role of x is played by negative x. So the second term is negative one times negative x, which is plus x. Choice B misses one of the two negatives.', show: 'q.answer' },
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
          items: ['$(1 + x)^n = 1 + nx + \\dfrac{n(n - 1)}{2!}x^2 + \\cdots$, valid for $|x| < 1$.', 'For $(1 + bx)^n$, replace $x$ by $bx$: valid for $|bx| < 1$.', 'For $(a + bx)^n$, take out $a^n$ first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For any rational n, the binomial expansion of one plus x to the power n is valid for x between negative one and one.', show: 'sum.0' },
        { say: 'For one plus b x, replace x by b x throughout, brackets and all.', show: 'sum.1' },
        { say: 'And for "a" plus b x, take out "a" to the power n first. In the next lesson, we take vectors into three dimensions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
