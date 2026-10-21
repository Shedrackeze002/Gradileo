import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { factorTree } from '@/video/numbers.ts';
import { chips } from '@/content/math6/videos/lib/m6-3-figures.ts';
import { tag } from './lib/m8-1-figures.ts';

// 72 = 8 × 9 = 2 × 2 × 2 × 3 × 3.
const tree72 = figure('tr', [factorTree({ tree: [72, [8, 2, [4, 2, 2]], [9, 3, 3]] })], 400);

// 324 = 4 × 81 = 2 × 2 × 3 × 3 × 3 × 3.
const tree324 = figure('tr', [factorTree({ tree: [324, [4, 2, 2], [81, [9, 3, 3], [9, 3, 3]]] })], 400);

// The primes of 324 shared between two equal groups: 2 × 3 × 3 = 18 in each.
const groups324 = figure(
  'gr',
  [
    chips({ name: 'g1', values: [2, 3, 3], at: [0, 1.5], title: '\\text{Group 1}' }),
    chips({ name: 'g2', values: [2, 3, 3], at: [0, 0], title: '\\text{Group 2}' }),
    tag('g1-eq', [3, 1.5], '= 18', { place: 'right', tone: 'good' }),
    tag('g2-eq', [3, 0], '= 18', { place: 'right', tone: 'good' }),
  ],
  260,
);

// The primes of 72: each group gets a 2 and a 3, and one 2 is left over.
const groups72 = figure(
  'gr',
  [
    chips({ name: 'g1', values: [2, 3], at: [0, 1.5], title: '\\text{Group 1}' }),
    chips({ name: 'g2', values: [2, 3], at: [0, 0], title: '\\text{Group 2}' }),
    chips({ name: 'odd', values: [2], at: [4.2, 0.75], tone: 'bad' }),
    tag('odd-note', [4.2, 0.1], '\\text{left over}', { place: 'below', tone: 'bad' }),
  ],
  260,
);

const video: Explainer = {
  id: 'm8-1-1-d',
  lessonId: 'm8-1-1',
  title: 'Perfect Squares and Square Roots, Part 4: Perfect Squares and Prime Factors',
  thumbnailTitle: 'Perfect Squares and Prime Factors',
  thumbnail: 'tr',
  summary:
    'The prime factorization of a number writes it as a product of primes: 72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3². A perfect square splits into two identical groups of prime factors, so every prime factor appears an even number of times. 324 = 2² × 3⁴ splits into two groups of 2 × 3 × 3 = 18, so √324 = 18. In 72, the prime 2 appears 3 times, so 72 is not a perfect square, but 72 × 2 = 144 = 12² is.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 4', title: 'Perfect Squares and Prime Factors', subtitle: 'Two identical groups' }],
      lines: [
        { say: 'Is three hundred twenty-four a perfect square? You could try to set out three hundred twenty-four tiles in a square, but that is a lot of tiles!', show: 'title' },
        { say: 'In this part, you will use prime factors to decide whether a big number is a perfect square, and to find its square root.' },
      ],
    },
    {
      chapter: 'Prime factorization',
      layout: 'split',
      leftWidth: 460,
      left: [tree72],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Prime factorization', md: 'The **prime factorization** of a number writes it as a product of prime numbers only.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['72 = 2 \\times 2 \\times 2 \\times 3 \\times 3', '72 = 2^3 \\times 3^2'] },
      ],
      lines: [
        { say: 'A prime number has exactly two factors, one and itself. Two, three, five and seven are the first few primes.' },
        { say: 'The prime factorization of a number writes it as a product of prime numbers only.', show: 'def' },
        { say: 'A factor tree finds it. Seventy-two is eight times nine.', show: ['tr.level0', 'tr.level1'] },
        { say: 'Eight is two times four, and four is two times two. Nine is three times three. Every branch now ends in a prime, circled in green.', show: ['tr.level2', 'tr.level3', 'tr.primes'] },
        { say: 'So seventy-two is two times two times two times three times three.', show: 'm.0', focus: 'm.0' },
        { say: 'With exponents, that is two cubed times three squared. Two cubed means two times two times two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Is 324 a perfect square?',
      layout: 'split',
      leftWidth: 460,
      left: [tree324],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['324 = 2 \\times 2 \\times 3 \\times 3 \\times 3 \\times 3', '324 = 2^2 \\times 3^4'] }],
      lines: [
        { say: 'Now let’s test three hundred twenty-four. It is four times eighty-one.', show: ['tr.level0', 'tr.level1'] },
        { say: 'Four is two times two. Eighty-one is nine times nine, and each nine is three times three.', show: ['tr.level2', 'tr.level3', 'tr.primes'] },
        { say: 'So three hundred twenty-four is two times two, times three times three times three times three.', show: 'm.0', focus: 'm.0' },
        { say: 'With exponents, it is two squared times three to the fourth. Look at the exponents: two and four. Both are even.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two identical groups',
      layout: 'center',
      main: [
        groups324,
        { kind: 'math', id: 'm', size: 'lg', lines: ['324 = 18 \\times 18, \\text{ so } \\sqrt{324} = 18'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Perfect squares and prime factors', md: 'In a perfect square, **every prime factor appears an even number of times**.' },
      ],
      lines: [
        { say: 'A perfect square is a number times itself. So its prime factors can be shared between two groups that are exactly the same.' },
        { say: 'The prime two appears twice: put a two in each group. The prime three appears four times: put two of them in each group.', show: ['gr.g1-c0', 'gr.g2-c0', 'gr.g1-c1', 'gr.g2-c1', 'gr.g1-c2', 'gr.g2-c2', 'gr.g1-title', 'gr.g2-title'] },
        { say: 'Each group is two times three times three, which is eighteen. So three hundred twenty-four is eighteen times eighteen.', show: ['gr.g1-eq', 'gr.g2-eq'], focus: ['gr.g1-eq', 'gr.g2-eq'] },
        { say: 'That means three hundred twenty-four is a perfect square, and its square root is eighteen.', show: 'm', focus: 'm' },
        { say: 'This works because each prime has to be shared equally between the two groups. So in a perfect square, every prime factor appears an even number of times.', show: 'key' },
      ],
    },
    {
      chapter: 'Is 72 a perfect square?',
      layout: 'center',
      main: [
        groups72,
        { kind: 'math', id: 'm', size: 'lg', lines: ['72 = 2^3 \\times 3^2', '72 \\times 2 = 144 = 2^4 \\times 3^2 = 12^2'] },
      ],
      lines: [
        { say: 'Now try seventy-two. Its prime factorization is two cubed times three squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Share the factors between two groups. Each group gets a two and a three.', show: ['gr.g1-c0', 'gr.g2-c0', 'gr.g1-c1', 'gr.g2-c1', 'gr.g1-title', 'gr.g2-title'] },
        { say: 'But there is a third two, and it has nowhere to go. The prime two appears three times, which is an odd number.', show: ['gr.odd-c0', 'gr.odd-note'], focus: 'gr.odd-c0' },
        { say: 'The factors cannot be shared into two identical groups, so seventy-two is not a perfect square.' },
        { say: 'But one more two fixes it. Seventy-two times two is one hundred forty-four, which is two to the fourth times three squared. Now every exponent is even, and one hundred forty-four is twelve times twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these numbers is a perfect square?',
          choices: ['$2^3 \\times 5^2$', '$2^2 \\times 3^3$', '$2^4 \\times 5^2$', '$3 \\times 7^2$'],
          answer: 2,
          working: 'In $2^4 \\times 5^2$, every exponent is even, so the primes share into two groups of $2 \\times 2 \\times 5 = 20$: it is $20 \\times 20 = 400$. Each of the others has a prime that appears an odd number of times.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is a perfect square? Look at the exponents. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Every exponent is even, so the primes share into two groups of two times two times five, which is twenty. The number is twenty times twenty, four hundred. In choice A, the prime two appears three times, an odd number, so it is not a perfect square.', show: 'q.answer' },
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
            'The **prime factorization** writes a number as a product of primes: $72 = 2^3 \\times 3^2$.',
            'A perfect square shares its primes into two identical groups: $324 = 18 \\times 18$.',
            'In a perfect square, every prime factor appears an even number of times.',
            '$72$ is not a perfect square, but $72 \\times 2 = 144 = 12^2$ is.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The prime factorization writes a number as a product of primes only.', show: 'sum.0' },
        { say: 'A perfect square’s primes can be shared into two identical groups. Each group multiplies to the square root.', show: 'sum.1' },
        { say: 'So in a perfect square, every prime factor appears an even number of times.', show: 'sum.2' },
        { say: 'If one prime appears an odd number of times, the number is not a perfect square. In the next lesson, you will estimate the square roots of numbers that are not perfect squares. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
