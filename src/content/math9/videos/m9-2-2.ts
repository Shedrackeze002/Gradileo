import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { factorRings } from './lib/m9-2-figures.ts';

// 2³ × 2⁴: three factors of 2 and four more, seven in all.
const seven = figure(
  'rg',
  [
    factorRings({
      groups: [
        { id: 'a', values: ['2', '2', '2'], tone: 'adj', below: '2^3' },
        { id: 'b', values: ['2', '2', '2', '2'], tone: 'opp', below: '2^4' },
      ],
      groupGap: 0.6,
      over: '3 + 4 = 7 \\text{ factors of } 2',
    }),
  ],
  280,
);

const video: Explainer = {
  id: 'm9-2-2',
  lessonId: 'm9-2-2',
  title: 'Exponent Laws, Part 1: The Product Law',
  thumbnailTitle: 'The Product Law',
  thumbnail: 'rg',
  summary:
    'An exponent law is a shortcut for simplifying products, quotients and powers of powers. 2³ × 2⁴ is three factors of 2 and four more, 3 + 4 = 7 factors, so 2³ × 2⁴ = 2⁷. The product law: aᵐ × aⁿ = aᵐ⁺ⁿ, keep the base and add the exponents. Do not multiply the bases (3⁴ × 3² = 3⁶, not 9⁶), and the law only works when the bases are the same.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 1', title: 'The Product Law', subtitle: 'Same base: add the exponents' }],
      lines: [
        { say: 'Multiplying two to the power of ten by two to the power of six by writing out all sixteen factors would take a while.', show: 'title' },
        { say: 'Exponent laws are shortcuts that come straight from what a power means. In this lesson, you will see why each one works, so you never need to memorize them blindly. This first part is about multiplying powers.' },
      ],
    },
    {
      chapter: 'Exponent laws',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exponent law', md: 'An **exponent law** is a rule for simplifying products, quotients and powers of powers. The laws work when the base is not $0$ and the exponents are whole numbers.' },
      ],
      lines: [
        { say: 'An exponent law is a rule for simplifying products, quotients and powers of powers.', show: 'def' },
        { say: 'The laws work when the base is not zero, and the exponents are whole numbers. Every law comes from writing the powers out as repeated multiplication.' },
      ],
    },
    {
      chapter: 'Count the factors',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $2^3 \\times 2^4$ as a single power.' },
        seven,
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^3 \\times 2^4 = 2^{3 + 4} = 2^7'] },
      ],
      lines: [
        { say: 'Write two cubed times two to the power of four as a single power.', show: 'q' },
        { say: 'Two cubed is three factors of two.', show: ['rg.a', 'rg.a-b'], focus: 'rg.a' },
        { say: 'Two to the power of four is four more factors of two.', show: ['rg.b', 'rg.b-b'], focus: 'rg.b' },
        { say: 'Multiply them, and all the factors are twos. Three plus four is seven factors of two in all.', show: 'rg.over', focus: 'rg.over' },
        { say: 'So two cubed times two to the power of four is two to the power of seven.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The product law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'key', title: 'Product law', md: '$a^m \\times a^n = a^{m + n}$: keep the base and **add** the exponents.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^{10} \\times 2^6 = 2^{10 + 6} = 2^{16}', '5^2 \\times 5^3 = 5^{2 + 3} = 5^5'] },
      ],
      lines: [
        { say: 'This works for any base. When you multiply powers with the same base, keep the base and add the exponents.', show: 'law' },
        { say: 'With letters, "a" to the m, times "a" to the n, is "a" to the m plus n. The letters stand for any numbers that fit.' },
        { say: 'So two to the power of ten times two to the power of six is two to the power of sixteen. No need to write out sixteen factors.', show: 'm.0', focus: 'm.0' },
        { say: 'And five squared times five cubed is five to the power of five. Two factors of five and three more make five factors.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Do not multiply the bases',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not multiply the bases', md: '$3^4 \\times 3^2$ is **not** $9^6$, and $2^3 \\times 2^4$ is **not** $4^7$. The base stays the same.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3^4 \\times 3^2 = 3^6 \\qquad \\bad{\\text{not } 9^6}', '2^3 \\times 2^4 = 2^7 = 128 \\qquad \\bad{4^7 = 16\\,384}'] },
      ],
      lines: [
        { say: 'Here is a common mistake: multiplying the bases as well. Three to the power of four times three squared is not nine to the power of six.', show: 'oops' },
        { say: 'All the factors are threes. There are four of them and two more, so six factors of three. The base stays three.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, two cubed times two to the power of four is two to the power of seven, which is one hundred twenty-eight. Four to the power of seven is sixteen thousand three hundred eighty-four, which is far too big.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Different bases',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Different bases', md: 'The product law needs the **same base**. $2^3 \\times 5^2$ has different bases, so you cannot add the exponents. Evaluate each power instead.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^3 \\times 5^2 = 8 \\times 25 = 200'] },
      ],
      lines: [
        { say: 'One more thing to watch for. The product law only works when the bases are the same.', show: 'oops' },
        { say: 'Two cubed times five squared has three factors of two and two factors of five. They are different factors, so there is no single power to add up to.' },
        { say: 'Evaluate each power instead. Two cubed is eight, and five squared is twenty-five. Eight times twenty-five is two hundred.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $6^5 \\times 6^3$ as a single power.',
          choices: ['$6^8$', '$36^8$', '$6^{15}$', '$12^8$'],
          answer: 0,
          working: 'Same base, so keep the base and add the exponents: $6^5 \\times 6^3 = 6^{5 + 3} = 6^8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write six to the power of five, times six cubed, as a single power. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, six to the power of eight. The bases are the same, so keep the base and add the exponents: five plus three is eight. Choice B, thirty-six to the power of eight, multiplies the bases. The base stays six.', show: 'q.answer' },
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
            'An **exponent law** is a shortcut that comes from writing powers out in full.',
            'Product law: $a^m \\times a^n = a^{m + n}$. Keep the base, add the exponents.',
            'Do not multiply the bases: $3^4 \\times 3^2 = 3^6$.',
            'The law needs the same base: $2^3 \\times 5^2 = 200$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An exponent law is a shortcut that comes from writing powers out in full.', show: 'sum.0' },
        { say: 'The product law: to multiply powers with the same base, keep the base and add the exponents.', show: 'sum.1' },
        { say: 'Do not multiply the bases.', show: 'sum.2' },
        { say: 'And the law only works when the bases are the same. In the next part, you will divide powers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
