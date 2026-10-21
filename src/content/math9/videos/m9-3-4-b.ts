import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fractionSquare } from '@/content/math8/videos/lib/m8-4-figures.ts';

// One half of one half: a unit square cut in half both ways, the overlap is one quarter.
const square = (id: string) =>
  figure(id, [fractionSquare({ cols: 2, rows: 2, colShade: 1, rowShade: 1, colLabel: '\\tfrac{1}{2}', rowLabel: '\\tfrac{1}{2}' })], 400);

const video: Explainer = {
  id: 'm9-3-4-b',
  lessonId: 'm9-3-4',
  title: 'Order of Operations with Rational Numbers, Part 2: Powers and Negative Numbers',
  thumbnailTitle: 'Powers and Negative Numbers',
  thumbnail: 'sq',
  summary:
    'A negative number in brackets, squared, is positive, because two negative factors give a positive product: (−1/2)² = (−1/2) × (−1/2) = 1/4, not −1/4, and (−0.5)² = 0.25. In the order of operations, exponents come straight after brackets: (−1/2)² + 3/4 ÷ (−3/2) = 1/4 + (−1/2) = −1/4, and (−0.5)² × 8 − 3.2 ÷ (−0.4) = 2 − (−8) = 10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 2', title: 'Powers and Negative Numbers', subtitle: 'A negative number squared is positive' }],
      lines: [
        { say: 'What is negative one half, squared? Many people say negative one quarter. The real answer is a little surprising.', show: 'title' },
        { say: 'In this part, you will square negative numbers, and evaluate expressions with powers in them.' },
      ],
    },
    {
      chapter: 'Squaring a negative',
      layout: 'split',
      leftWidth: 460,
      left: [square('sq')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\left(-\\dfrac{1}{2}\\right)^{2} = \\left(-\\dfrac{1}{2}\\right) \\times \\left(-\\dfrac{1}{2}\\right)', '\\text{Sign: same signs} \\;\\to\\; \\text{positive}', '\\text{Size: } \\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}', '\\left(-\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}', '(-0.5)^{2} = (-0.5) \\times (-0.5) = 0.25'] },
      ],
      lines: [
        { say: 'An exponent of two means multiply the number by itself. Negative one half, squared, means negative one half times negative one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Sign first. Both factors are negative, so the signs are the same, and the product is positive.', show: 'm.1', focus: 'm.1' },
        { say: 'Size next. One half of one half is one quarter. In this square, half of the half is one of four equal parts.', show: ['m.2', 'sq'], focus: ['m.2', 'sq.both'] },
        { say: 'So negative one half, squared, is positive one quarter.', show: 'm.3', focus: 'm.3' },
        { say: 'Decimals work the same way. Negative zero point five, squared, is negative zero point five times negative zero point five, which is positive zero point two five.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of a square', md: '$\\left(-\\dfrac{1}{2}\\right)^{2}$ is **not** $-\\dfrac{1}{4}$. Two negative factors give a positive product.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\left(-\\dfrac{1}{2}\\right)^{2} \\ne -\\dfrac{1}{4}}', '\\good{\\left(-\\dfrac{1}{2}\\right)^{2} = \\left(-\\dfrac{1}{2}\\right) \\times \\left(-\\dfrac{1}{2}\\right) = \\dfrac{1}{4}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is tempting to square the one half and simply keep the negative sign, which gives negative one quarter.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But squaring means multiplying by itself, and that means two negative factors. Two negatives give a positive product.', show: 'm.1', focus: 'm.1' },
        { say: 'So a negative number in brackets, squared, is always positive. Write out the two factors whenever you are unsure.' },
      ],
    },
    {
      chapter: 'A squared fraction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $\\left(-\\dfrac{1}{2}\\right)^{2} + \\dfrac{3}{4} \\div \\left(-\\dfrac{3}{2}\\right)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= \\dfrac{1}{4} + \\dfrac{3}{4} \\div \\left(-\\dfrac{3}{2}\\right)', '= \\dfrac{1}{4} + \\dfrac{3}{4} \\times \\left(-\\dfrac{2}{3}\\right) = \\dfrac{1}{4} + \\left(-\\dfrac{6}{12}\\right)', '= \\dfrac{1}{4} - \\dfrac{2}{4} = -\\dfrac{1}{4}'] },
      ],
      lines: [
        { say: 'Now use a square inside a longer expression. Evaluate negative one half, squared, plus three quarters divided by negative three halves.', show: 'q' },
        { say: 'There are no brackets to work out, so the exponent comes first. Negative one half, squared, is one quarter.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, divide. To divide by negative three halves, multiply by its reciprocal, negative two thirds. Three quarters times negative two thirds is negative six twelfths, which is negative one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Last, add. One quarter plus negative one half is one quarter minus two quarters, which is negative one quarter.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Decimals with a power',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $(-0.5)^{2} \\times 8 - 3.2 \\div (-0.4)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= 0.25 \\times 8 - 3.2 \\div (-0.4)', '= 2 - (-8)', '= 2 + 8 = 10'] },
      ],
      lines: [
        { say: 'One more. Evaluate negative zero point five, squared, times eight, minus three point two divided by negative zero point four.', show: 'q' },
        { say: 'Exponent first. Negative zero point five, squared, is zero point two five.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply and divide, from left to right. Zero point two five times eight is two. Three point two divided by negative zero point four is negative eight, because the signs are different and thirty-two divided by four is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Last, subtract. Two minus negative eight is two plus eight, which is ten.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $(-0.3)^{2} + 0.6 \\div (-2)$.',
          choices: ['$-0.39$', '$-0.21$', '$0.39$', '$-0.345$'],
          answer: 1,
          working: 'Exponent: $(-0.3)^{2} = 0.09$. Divide: $0.6 \\div (-2) = -0.3$. Add: $0.09 + (-0.3) = -0.21$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate negative zero point three, squared, plus zero point six divided by negative two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative zero point two one. Negative zero point three, squared, is positive zero point zero nine. Zero point six divided by negative two is negative zero point three. Then zero point zero nine plus negative zero point three is negative zero point two one. Choice A makes the square negative.', show: 'q.answer' },
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
            'A negative number in brackets, squared, is positive: $(-0.5)^{2} = 0.25$.',
            '$\\left(-\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}$, not $-\\dfrac{1}{4}$.',
            'Exponents come right after brackets in the order of operations.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A negative number in brackets, squared, is positive, because two negative factors give a positive product.', show: 'sum.0' },
        { say: 'So negative one half, squared, is one quarter, not negative one quarter.', show: 'sum.1' },
        { say: 'And in the order of operations, exponents come right after brackets. In the next part, you will turn a word problem into one expression. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
