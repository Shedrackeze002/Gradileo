import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-1-d',
  lessonId: 'm31-4-1',
  title: 'The Power, Constant and Sum Rules, Part 4: Roots and Reciprocals',
  thumbnailTitle: 'Roots and Reciprocals',
  thumbnail: false,
  summary: 'Rewriting roots and reciprocals as powers before using the power rule: y = 4x³ − 6/x + 2√x has dy/dx = 12x² + 6/x² + 1/√x, and dividing f(x) = (x² + 3)/√x into x^(3/2) + 3x^(−1/2) first gives f′(x) = 3√x/2 − 3/(2x√x). Why the derivative of 1/x³ is not 1/(3x²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 4', title: 'Roots and Reciprocals', subtitle: 'Rewrite as powers, then differentiate' }],
      lines: [
        { say: 'The power rule only works on a power of x. Square roots and fractions do not look like powers, but every one of them can be written as one.', show: 'title' },
        { say: 'In this video, you will rewrite roots and reciprocals as powers, differentiate them with the power rule, and write the answer neatly.' },
      ],
    },
    {
      chapter: 'Rewrite first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{x} = x^{1/2} \\qquad \\sqrt[3]{x^{2}} = x^{2/3}', '\\dfrac{1}{x^{3}} = x^{-3} \\qquad \\dfrac{5}{\\sqrt{x}} = 5x^{-1/2}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Exponent laws', md: 'A root is a fractional exponent: $\\sqrt[n]{x^m} = x^{m/n}$. One over a power is a negative exponent: $\\dfrac{1}{x^n} = x^{-n}$.' },
      ],
      lines: [
        { say: 'Before you differentiate, rewrite every root and every reciprocal as a power of x, using the exponent laws.', show: 'key' },
        { say: 'A root is a fractional exponent. The square root of x is x to the power one half, and the cube root of x squared is x to the power two thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'One over a power is a negative exponent. One over x cubed is x to the power negative three. And five over the square root of x is five times x to the power negative one half: the five stays on top, as a coefficient.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Rewrite, differentiate, tidy up',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\dfrac{dy}{dx}$ for $y = 4x^{3} - \\dfrac{6}{x} + 2\\sqrt{x}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'y = 4x^{3} - 6x^{-1} + 2x^{1/2}',
            '\\dfrac{dy}{dx} = 12x^{2} - 6(-1)x^{-2} + 2\\left(\\tfrac{1}{2}\\right)x^{-1/2}',
            '= 12x^{2} + 6x^{-2} + x^{-1/2}',
            '= \\good{12x^{2} + \\dfrac{6}{x^{2}} + \\dfrac{1}{\\sqrt{x}}}',
          ],
        },
      ],
      lines: [
        { say: 'Find d y by d x for y equals four x cubed, minus six over x, plus two root x.', show: 'q' },
        { say: 'Rewrite: six over x is six x to the power negative one, and two root x is two x to the power one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Now use the power rule on each term. Four x cubed gives twelve x squared. Negative six x to the negative one gives negative six times negative one, x to the negative two. And two x to the one half gives two times one half, x to the negative one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Simplify the coefficients. Negative six times negative one is positive six, and two times one half is one.', show: 'm.2', focus: 'm.2' },
        { say: 'Finally, tidy up with positive exponents: twelve x squared, plus six over x squared, plus one over root x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Divide first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $f(x) = \\dfrac{x^{2} + 3}{\\sqrt{x}}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\dfrac{x^{2}}{x^{1/2}} + \\dfrac{3}{x^{1/2}} = x^{3/2} + 3x^{-1/2}',
            'f\'(x) = \\tfrac{3}{2}x^{1/2} - \\tfrac{3}{2}x^{-3/2}',
            '= \\good{\\dfrac{3\\sqrt{x}}{2} - \\dfrac{3}{2x\\sqrt{x}}}',
          ],
        },
      ],
      lines: [
        { say: 'There is no rule yet for a quotient. So when a function is a fraction, simplify it into a sum of powers first. Differentiate f of x equals x squared plus three, over root x.', show: 'q' },
        { say: 'Divide each term on the top by x to the one half. x squared over x to the one half is x to the power two minus one half, which is three halves. And three over x to the one half is three x to the negative one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Now differentiate. x to the three halves gives three halves x to the one half. Three x to the negative one half gives three times negative one half, which is negative three halves, times x to the negative three halves.', show: 'm.1', focus: 'm.1' },
        { say: 'With positive exponents: three root x over two, minus three over two x root x. Here x to the three halves is x times root x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reciprocals are not powers of the denominator', md: 'Do not differentiate the bottom of a fraction. Rewrite first: $\\dfrac{1}{x^{3}} = x^{-3}$. Watch the coefficients too: $\\dfrac{1}{2x^{2}} = \\tfrac{1}{2}x^{-2}$, not $2x^{-2}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{d}{dx}\\left(\\dfrac{1}{x^{3}}\\right) = \\dfrac{1}{3x^{2}}}', '\\good{\\dfrac{d}{dx}\\left(x^{-3}\\right) = -3x^{-4} = -\\dfrac{3}{x^{4}}}'] },
      ],
      lines: [
        { say: 'A common mistake is to differentiate the bottom of a fraction: to say that one over x cubed has derivative one over three x squared.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That is wrong. Rewrite first: one over x cubed is x to the power negative three. Its derivative is negative three x to the negative four, which is negative three over x to the fourth.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch the coefficients too. One over two x squared is one half times x to the negative two, because the two is on the bottom. It is not two x to the negative two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = \\dfrac{2}{x^{2}}$.',
          choices: ['$\\dfrac{1}{x}$', '$-\\dfrac{4}{x}$', '$-\\dfrac{2}{x^{3}}$', '$-\\dfrac{4}{x^{3}}$'],
          answer: 3,
          working: 'Rewrite: $y = 2x^{-2}$. Then $\\dfrac{dy}{dx} = 2(-2)x^{-3} = -4x^{-3} = -\\dfrac{4}{x^{3}}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals two over x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Rewrite y as two x to the power negative two. Its derivative is two times negative two, x to the negative three, which is negative four over x cubed. Choice A differentiates the bottom of the fraction, which is the mistake from this video.', show: 'q.answer' },
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
            'Rewrite roots as fractional exponents and reciprocals as negative exponents first.',
            'Simplify a fraction into a sum of powers before you differentiate.',
            'Give the answer with positive exponents.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rewrite roots as fractional exponents, and reciprocals as negative exponents, before you differentiate.', show: 'sum.0' },
        { say: 'Simplify a fraction into a sum of powers first, since there is no quotient rule yet.', show: 'sum.1' },
        { say: 'And give the answer with positive exponents. In the next part, we use derivatives to find tangent slopes and velocities. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
