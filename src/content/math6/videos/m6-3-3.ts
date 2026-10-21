import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips } from './lib/m6-3-figures.ts';

const TONES: DiagramTone[] = ['adj', 'adj', 'adj', 'opp', 'opp', 'good'];

// The primes of 360 = 2³ × 3² × 5 in a row, and a dashed 7 after them that is not there.
const primes = (id: string) =>
  figure(id, [
    chips({ name: 'n', values: [2, 2, 2, 3, 3, 5], tones: TONES, gap: 1.25, r: 0.5, title: '360' }),
    chips({ name: 's', values: [7], xs: [8.1], r: 0.5, missing: [0] }),
  ], 190);

// The primes of 66 = 2 × 3 × 11.
const sixtySix = (id: string) =>
  figure(id, [chips({ name: 'n', values: [2, 3, 11], tones: ['adj', 'opp', 'good'], gap: 1.1, r: 0.48, title: '66' })], 160);

const video: Explainer = {
  id: 'm6-3-3',
  lessonId: 'm6-3-3',
  title: 'Common Factors and Divisibility, Part 1: Divisibility by a Prime',
  thumbnailTitle: 'Divisibility by a Prime',
  thumbnail: 'pf',
  summary:
    'A number is divisible by a prime only if that prime is in its prime factorization. 2³ × 3² × 5 (which is 360) is divisible by 5 but not by 7, and 2 × 3 × 11 is divisible by 11 but not by 5. A power is always divisible by its base: 7⁴ ÷ 7 = 7³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 1', title: 'Divisibility by a Prime', subtitle: 'Read it from the prime factorization' }],
      lines: [
        { say: 'A prime factorization is like a picture of a number. It shows every number that divides it.', show: 'title' },
        { say: 'In this part, you will decide whether a number is divisible by a prime, just by looking at its prime factorization.' },
      ],
    },
    {
      chapter: 'Divisible',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Divisible', md: 'A number is **divisible** by another number if it divides evenly, with no remainder. $360$ is divisible by $5$ because $360 \\div 5 = 72$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['360 \\div 5 = 72 \\quad \\good{\\text{no remainder}}', '360 \\div 7 = 51 \\text{ R } 3 \\quad \\bad{\\text{remainder}}'] },
      ],
      lines: [
        { say: 'First, a word you will use a lot. A number is divisible by another number if it divides evenly, with no remainder.', show: 'def' },
        { say: 'Three hundred sixty is divisible by five, because three hundred sixty divided by five is seventy-two, with nothing left over.', show: 'm.0', focus: 'm.0' },
        { say: 'But three hundred sixty is not divisible by seven. Three hundred sixty divided by seven is fifty-one, remainder three.', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing works, but it can take a while. A prime factorization can tell you the answer without dividing.' },
      ],
    },
    {
      chapter: 'Divisible by 5? By 7?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A number is $2^3 \\times 3^2 \\times 5$. Is it divisible by $5$? Is it divisible by $7$?' },
        primes('pf'),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\text{ is there} \\;\\to\\; \\good{\\text{divisible by } 5}', '7 \\text{ is not there} \\;\\to\\; \\bad{\\text{not divisible by } 7}'] },
      ],
      lines: [
        { say: 'A number has the prime factorization two cubed times three squared times five. Is it divisible by five? Is it divisible by seven?', show: 't' },
        { say: 'Write out all of its primes. Two cubed is three factors of two. Three squared is two factors of three. And there is one five. The number is three hundred sixty.', show: ['pf.n-c0', 'pf.n-c1', 'pf.n-c2', 'pf.n-c3', 'pf.n-c4', 'pf.n-c5', 'pf.n-title'] },
        { say: 'Is it divisible by five? Five is one of the prime factors. So the number is five times all the other factors, and five divides it evenly.', focus: 'pf.n-c5' },
        { say: 'So yes, the number is divisible by five.', show: 'm.0', focus: 'm.0' },
        { say: 'Is it divisible by seven? Look for seven in the factorization. The only primes are two, three and five. Seven is not there.', show: 'pf.s-c0', focus: 'pf.s-c0' },
        { say: 'So no, the number is not divisible by seven. That matches the remainder we found when we divided three hundred sixty by seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Divisible by a prime', md: 'A number is divisible by a prime **only if** that prime is in its prime factorization.' },
        sixtySix('sx'),
        { kind: 'math', id: 'm', size: 'md', lines: ['66 \\div 11 = 6 \\;\\good{\\checkmark} \\qquad 66 \\div 5 = 13 \\text{ R } 1'] },
      ],
      lines: [
        { say: 'Here is the rule. A number is divisible by a prime only if that prime is in its prime factorization.', show: 'key' },
        { say: 'Try another one. A number is two times three times eleven. Is it divisible by eleven? Is it divisible by five?', show: 'sx' },
        { say: 'Eleven is one of the primes, so the number is divisible by eleven. Five is not there, so it is not divisible by five.', focus: 'sx.n-c2' },
        { say: 'Check: the number is sixty-six. Sixty-six divided by eleven is six. But sixty-six divided by five is thirteen, remainder one.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A power and its base',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A power is divisible by its base', md: '$7^4 = 7 \\times 7 \\times 7 \\times 7$. The base $7$ is one of the factors, so $7^4$ is divisible by $7$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7^4 = 7 \\times (7 \\times 7 \\times 7)', '7^4 \\div 7 = 7 \\times 7 \\times 7 = 7^3'] },
      ],
      lines: [
        { say: 'Here is a tip. A power is always divisible by its base.', show: 'tip' },
        { say: 'Seven to the power of four is seven times seven times seven times seven. Seven is one of the factors, so seven divides it evenly.', show: 'm.0', focus: 'm.0' },
        { say: 'In fact, seven to the power of four divided by seven is seven cubed. Dividing by seven takes away one factor of seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A number is $2 \\times 3^2 \\times 7$. Which prime is it divisible by?',
          choices: ['$5$', '$11$', '$13$', '$7$'],
          answer: 3,
          working: '$7$ is one of the primes in the factorization, so the number is divisible by $7$. The number is $126$, and $126 \\div 7 = 18$.',
        },
      ],
      lines: [
        { say: 'Your turn. A number is two times three squared times seven. Which prime is it divisible by? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, seven. Seven is one of the primes in the factorization, so seven divides the number evenly. Choice A, five, is not in the factorization, so the number is not divisible by five. The number is one hundred twenty-six.', show: 'q.answer' },
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
            'A number is **divisible** by another if it divides evenly, with no remainder.',
            'A number is divisible by a prime only if that prime is in its prime factorization.',
            'A power is always divisible by its base: $7^4 \\div 7 = 7^3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number is divisible by another number if it divides evenly, with no remainder.', show: 'sum.0' },
        { say: 'A number is divisible by a prime only if that prime is in its prime factorization.', show: 'sum.1' },
        { say: 'And a power is always divisible by its base. In the next part, you will use prime factorizations to find common factors. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
