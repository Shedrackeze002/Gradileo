import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-17-2',
  lessonId: 'mx-17-2',
  title: 'Partial Fractions',
  thumbnail: 'm',
  summary: 'Partial fractions split one fraction into simpler ones, one for each linear factor of the denominator. Multiply through by the denominator and substitute values of x that make a factor zero: (5x + 1)/((x − 1)(x + 2)) ≡ 2/(x − 1) + 3/(x + 2). A repeated factor (x − b)² needs B/(x − b) + C/(x − b)², and an improper fraction needs a whole-number part as well.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Algebra and Vectors', title: 'Partial Fractions', subtitle: 'Splitting a fraction into simpler ones' }],
      lines: [
        { say: 'Adding two over x minus one and three over x plus two gives a single fraction: five x plus one, over x minus one times x plus two.', show: 'title' },
        { say: 'Partial fractions go the other way, splitting one fraction into simpler ones. That makes many fractions easier to expand and to integrate. In this video, you will learn how.' },
      ],
    },
    {
      chapter: 'Splitting a fraction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Partial fractions', md: 'A fraction whose denominator is a product of linear factors is a sum of fractions, one for each factor.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\frac{px + q}{(x - a)(x - b)} \\equiv \\frac{A}{x - a} + \\frac{B}{x - b}', '(x - b)^2: \\ \\frac{B}{x - b} + \\frac{C}{(x - b)^2}'] },
      ],
      lines: [
        { say: 'A fraction whose denominator is a product of linear factors can be written as a sum of partial fractions, one for each factor.', show: 'def' },
        { say: 'So a fraction over x minus "a", times x minus b, splits into capital A over x minus "a", plus capital B over x minus b, for some constants.', show: 'f.0', focus: 'f.0' },
        { say: 'A repeated factor, x minus b all squared, needs two fractions: one over x minus b, and one over x minus b squared.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Finding the constants',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\frac{5x + 1}{(x - 1)(x + 2)} \\equiv \\frac{A}{x - 1} + \\frac{B}{x + 2}', '5x + 1 \\equiv A(x + 2) + B(x - 1)', 'x = 1: \\ 6 = 3A \\;\\Rightarrow\\; A = 2', 'x = {-2}: \\ {-9} = {-3}B \\;\\Rightarrow\\; B = 3', '\\equiv \\frac{2}{x - 1} + \\frac{3}{x + 2}'] },
      ],
      lines: [
        { say: 'Let’s split five x plus one, over x minus one times x plus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by the denominator. Five x plus one is identical to capital A times x plus two, plus capital B times x minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'This is true for every x, so choose values that make a bracket zero. Putting x equal to one removes the B term: six equals three A, so capital A is two.', show: 'm.2', focus: 'm.2' },
        { say: 'Putting x equal to negative two removes the A term: negative nine equals negative three B, so capital B is three.', show: 'm.3', focus: 'm.3' },
        { say: 'So the fraction is two over x minus one, plus three over x plus two. If the denominator is given as a quadratic, factorise it first.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Improper fractions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\frac{x^2 + 3}{(x - 1)(x + 2)} \\equiv 1 + \\frac{A}{x - 1} + \\frac{B}{x + 2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by substituting', md: 'Put a value such as $x = 0$ into the original fraction and into your answer. They should agree.' },
      ],
      lines: [
        { say: 'When the top has as high a power as the bottom, the fraction is improper. Divide first, or include a whole-number part.', show: 'm', focus: 'm' },
        { say: 'Here both have x squared with coefficient one, so the whole-number part is one. Then multiply through and substitute as before.' },
        { say: 'Finally, check your answer: put a value such as x equals zero into the original fraction and into your partial fractions. If they agree, you are almost certainly right.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\dfrac{3x + 5}{(x + 1)(x + 3)} \\equiv \\dfrac{A}{x + 1} + \\dfrac{B}{x + 3}$. Find $A$.',
          choices: ['$2$', '$3$', '$1$', '$-1$'],
          answer: 2,
          working: '$3x + 5 \\equiv A(x + 3) + B(x + 1)$. Put $x = -1$: $2 = 2A$, so $A = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Three x plus five, over x plus one times x plus three, is split into capital A over x plus one, plus capital B over x plus three. Find capital A. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Three x plus five is identical to capital A times x plus three, plus capital B times x plus one. Putting x equal to negative one gives two equals two A, so capital A is one. Choice A is the value of B.', show: 'q.answer' },
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
          items: ['One partial fraction for each linear factor.', 'Multiply by the denominator and substitute values that make a factor zero.', 'A repeated factor needs two fractions.', 'An improper fraction needs a whole-number part.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write one partial fraction for each linear factor.', show: 'sum.0' },
        { say: 'Multiply through by the denominator, and substitute the values of x that make each factor zero.', show: 'sum.1' },
        { say: 'A repeated factor needs two fractions.', show: 'sum.2' },
        { say: 'And an improper fraction needs a whole-number part as well. In the next lesson, we write sums with sigma notation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
