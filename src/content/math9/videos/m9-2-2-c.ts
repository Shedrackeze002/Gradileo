import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pattern } from '@/video/numbers.ts';

// Powers of 3 from 3⁴ down to 3⁰: each step down divides by 3.
const threes = figure('pt', [pattern({ top: ['3^4', '3^3', '3^2', '3^1', '3^0'], values: ['81', '27', '9', '3', '1'], step: '\\div 3', gap: 2.2 })], 270);
// Powers of 2 from 2⁴ down to 2⁰: each step down divides by 2.
const twos = figure('pt', [pattern({ top: ['2^4', '2^3', '2^2', '2^1', '2^0'], values: ['16', '8', '4', '2', '1'], step: '\\div 2', gap: 2.2 })], 270);

const video: Explainer = {
  id: 'm9-2-2-c',
  lessonId: 'm9-2-2',
  title: 'Exponent Laws, Part 3: The Zero Exponent',
  thumbnailTitle: 'The Zero Exponent',
  thumbnail: 'pt',
  summary:
    'Follow the pattern 3⁴ = 81, 3³ = 27, 3² = 9, 3¹ = 3: each time the exponent goes down by 1, the value is divided by 3, so 3⁰ = 1. The quotient law agrees: 3² ÷ 3² = 3⁰, and any number divided by itself is 1. So a power with a non-zero base and an exponent of 0 equals 1: 8⁰ = 1 and (−5)⁰ = 1, but −5⁰ = −(5⁰) = −1. A zero exponent gives 1, not 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 3', title: 'The Zero Exponent', subtitle: 'Why any number to the power of zero is one' }],
      lines: [
        { say: 'Three to the power of four means four factors of three. But what could three to the power of zero mean? Zero factors of three?', show: 'title' },
        { say: 'In this part, you will use a pattern and the quotient law to find out, and both give the same answer.' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'center',
      main: [threes, { kind: 'math', id: 'm', size: 'lg', lines: ['3^0 = 1'] }],
      lines: [
        { say: 'Here are some powers of three. Three to the power of four is eighty-one.', show: 'pt.c0' },
        { say: 'Three cubed is twenty-seven. Going from eighty-one to twenty-seven, we divide by three.', show: 'pt.c1', focus: 'pt.c1' },
        { say: 'Three squared is nine, and three to the power of one is three. Each time the exponent goes down by one, the value is divided by three.', show: ['pt.c2', 'pt.c3'], focus: ['pt.c2', 'pt.c3'] },
        { say: 'Keep the pattern going. The next exponent is zero, and three divided by three is one. So three to the power of zero is one.', show: ['pt.c4', 'm'], focus: ['pt.c4', 'm'] },
      ],
    },
    {
      chapter: 'Powers of two',
      layout: 'center',
      main: [twos, { kind: 'math', id: 'm', size: 'lg', lines: ['2^0 = 1'] }],
      lines: [
        { say: 'Try it with powers of two. Two to the power of four is sixteen, two cubed is eight, two squared is four, and two to the power of one is two.', show: ['pt.c0', 'pt.c1', 'pt.c2', 'pt.c3'] },
        { say: 'Each step down divides by two. So the next step, two divided by two, gives one. Two to the power of zero is one as well.', show: ['pt.c4', 'm'], focus: ['pt.c4', 'm'] },
      ],
    },
    {
      chapter: 'The quotient law agrees',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3^2}{3^2} = 3^{2 - 2} = 3^0', '\\dfrac{3^2}{3^2} = \\dfrac{9}{9} = 1', '3^0 = 1'] },
      ],
      lines: [
        { say: 'The quotient law gives the same answer. Divide three squared by three squared. Subtract the exponents: two take away two is zero, so it is three to the power of zero.', show: 'm.0', focus: 'm.0' },
        { say: 'But any number divided by itself is one. Nine divided by nine is one.', show: 'm.1', focus: 'm.1' },
        { say: 'So three to the power of zero must be one. The pattern and the law agree.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The zero exponent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Zero exponent', md: 'A power with a base that is not $0$ and an exponent of $0$ equals $1$: $a^0 = 1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8^0 = 1 \\qquad (-5)^0 = 1', '-5^0 = -(5^0) = {-1}'] },
      ],
      lines: [
        { say: 'So here is the rule. A power with a base that is not zero, and an exponent of zero, equals one.', show: 'def' },
        { say: 'Eight to the power of zero is one. Negative five, all to the power of zero, is one as well, because the whole base is in the brackets.', show: 'm.0', focus: 'm.0' },
        { say: 'But watch the base. The negative of five to the power of zero has the base five. Five to the power of zero is one, so the answer is negative one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One, not zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A zero exponent gives one', md: '$8^0$ is **not** $0$, and it is not $8$. Any base that is not $0$, to the power of $0$, is $1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{8^0 \\ne 0} \\qquad \\bad{8^0 \\ne 8} \\qquad \\good{8^0 = 1}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. It is tempting to think that an exponent of zero gives zero, or leaves the number as it was.', show: 'oops' },
        { say: 'But eight to the power of zero is neither zero nor eight. It is one, just like three to the power of zero at the end of the pattern.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $4^0 + 7^0$.',
          choices: ['$0$', '$2$', '$11$', '$1$'],
          answer: 1,
          working: 'Each power has an exponent of $0$ and a base that is not $0$, so each is $1$: $4^0 + 7^0 = 1 + 1 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate four to the power of zero, plus seven to the power of zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two. Each power has an exponent of zero, so each one is one, and one plus one is two. Choice A, zero, treats a zero exponent as giving zero, but each power equals one.', show: 'q.answer' },
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
            'In the pattern $3^4, 3^3, 3^2, 3^1, 3^0$, each step divides by $3$, so $3^0 = 1$.',
            'The quotient law agrees: $3^2 \\div 3^2 = 3^0 = 1$.',
            'Zero exponent: $a^0 = 1$ when $a$ is not $0$.',
            'Watch the base: $(-5)^0 = 1$, but $-5^0 = -1$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In the pattern of powers of three, each step down divides by three, so three to the power of zero is one.', show: 'sum.0' },
        { say: 'The quotient law agrees, because any number divided by itself is one.', show: 'sum.1' },
        { say: 'So any base that is not zero, to the power of zero, equals one.', show: 'sum.2' },
        { say: 'And watch the base, as always. In the next part, you will raise powers, products and fractions to a power. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
