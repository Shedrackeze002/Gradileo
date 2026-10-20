import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips } from './lib/m6-3-figures.ts';

const TONES: DiagramTone[] = ['adj', 'adj', 'adj', 'opp', 'opp', 'good'];
const G = 1.05;

// The primes of 360 = 2³ × 3² × 5; under them, the primes 12 needs (all there) and the primes 16
// needs (a fourth 2 is missing).
const needs = (id: string) =>
  figure(id, [
    chips({ name: 'n', values: [2, 2, 2, 3, 3, 5], tones: TONES, gap: G, title: '360' }),
    chips({ name: 't', values: [2, 2, 3], xs: [0, G, 3 * G], tones: ['adj', 'adj', 'opp'], at: [0, -1.6], title: '12' }),
    chips({ name: 's', values: [2, 2, 2, 2], xs: [0, G, 2 * G, 3 * G], tone: 'adj', missing: [3], at: [0, -3.2], title: '16' }),
  ]);

// The primes of 90 = 2 × 3 × 3 × 5, and the two 2s that 4 needs.
const ninety = (id: string) =>
  figure(id, [
    chips({ name: 'n', values: [2, 3, 3, 5], tones: ['adj', 'opp', 'opp', 'good'], gap: G, title: '90' }),
    chips({ name: 'f', values: [2, 2], xs: [0, G], tone: 'adj', missing: [1], at: [0, -1.6], title: '4' }),
  ], 240);

const video: Explainer = {
  id: 'm6-3-3-c',
  lessonId: 'm6-3-3',
  title: 'Common Factors and Divisibility, Part 3: Divisibility by a Composite Number',
  thumbnailTitle: 'Divisibility by a Composite Number',
  thumbnail: 'nd',
  summary:
    'A number is divisible by a composite number if all of its prime factors, repeats included, are in the number’s prime factorization. 2³ × 3² × 5 (360) is divisible by 12 = 2 × 2 × 3 but not by 16 = 2 × 2 × 2 × 2; 14 × 15 = 2 × 7 × 3 × 5 is divisible by 21 = 3 × 7; and 90 has only one 2, so it is not divisible by 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 3', title: 'Divisibility by a Composite Number', subtitle: 'Look for all of its primes' }],
      lines: [
        { say: 'Is three hundred sixty divisible by twelve? Is it divisible by sixteen? You can tell from its prime factorization, without dividing.', show: 'title' },
        { say: 'In this part, you will decide whether a number is divisible by a composite number.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Divisible by a composite number', md: 'Write the divisor as a product of primes too. The number is divisible by it if **all** of those primes are in the number’s prime factorization, repeats included.' },
      ],
      lines: [
        { say: 'You know how to check divisibility by a prime: look for that prime in the prime factorization.', show: 'key' },
        { say: 'A composite divisor is made of several primes. So write the divisor as a product of primes as well.' },
        { say: 'The number is divisible by it if all of those primes are in the number’s prime factorization. If a prime repeats in the divisor, it must repeat in the number as well.' },
      ],
    },
    {
      chapter: 'Divisible by 12? By 16?',
      layout: 'split',
      leftWidth: 600,
      left: [needs('nd')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A number is $2^3 \\times 3^2 \\times 5$. Is it divisible by $12$? By $16$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12 = 2 \\times 2 \\times 3 \\;\\to\\; \\good{\\text{yes}}', '16 = 2 \\times 2 \\times 2 \\times 2 \\;\\to\\; \\bad{\\text{no}}', '360 \\div 12 = 30', '360 \\div 16 = 22.5'] },
      ],
      lines: [
        { say: 'Here is the number from before: two cubed times three squared times five. Is it divisible by twelve? Is it divisible by sixteen?', show: 't' },
        { say: 'Write out its primes: three factors of two, two factors of three, and a five.', show: ['nd.n-c0', 'nd.n-c1', 'nd.n-c2', 'nd.n-c3', 'nd.n-c4', 'nd.n-c5', 'nd.n-title'] },
        { say: 'Twelve is two times two times three. So twelve needs two factors of two and one factor of three.', show: ['nd.t-c0', 'nd.t-c1', 'nd.t-c2', 'nd.t-title'] },
        { say: 'The number has three factors of two and two factors of three. So everything twelve needs is there. The number is divisible by twelve.', show: 'm.0', focus: ['nd.t-c0', 'nd.t-c1', 'nd.t-c2', 'm.0'] },
        { say: 'Sixteen is two times two times two times two. Sixteen needs four factors of two.', show: ['nd.s-c0', 'nd.s-c1', 'nd.s-c2', 'nd.s-title'] },
        { say: 'But the number has only three factors of two. One factor of two is missing, so the number is not divisible by sixteen.', show: ['nd.s-c3', 'm.1'], focus: ['nd.s-c3', 'm.1'] },
        { say: 'Check by dividing. Three hundred sixty divided by twelve is thirty, a whole number. But three hundred sixty divided by sixteen is twenty-two point five, which is not a whole number.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'A product of two numbers',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Without multiplying, decide whether $14 \\times 15$ is divisible by $21$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['14 \\times 15 = 2 \\times \\good{7} \\times \\good{3} \\times 5', '21 = 3 \\times 7', '\\text{Check: } 14 \\times 15 = 210 \\text{ and } 210 \\div 21 = 10'] },
      ],
      lines: [
        { say: 'This works for a product as well. Without multiplying, decide whether fourteen times fifteen is divisible by twenty-one.', show: 't' },
        { say: 'Write each factor as primes. Fourteen is two times seven, and fifteen is three times five. So fourteen times fifteen is two times seven times three times five.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-one is three times seven. Both three and seven are in the product.', show: 'm.1', focus: 'm.1' },
        { say: 'So yes, fourteen times fifteen is divisible by twenty-one. Check: fourteen times fifteen is two hundred ten, and two hundred ten divided by twenty-one is ten.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'One 2 is not enough for 4', md: '$90 = 2 \\times 3 \\times 3 \\times 5$ has a $2$, but $4 = 2 \\times 2$ needs two $2$s. So $90$ is not divisible by $4$.' },
        ninety('nn'),
      ],
      lines: [
        { say: 'Watch out for this mistake. Ninety is two times three times three times five. It has a two, so it is easy to think that ninety is divisible by four.', show: ['oops', 'nn.n-c0', 'nn.n-c1', 'nn.n-c2', 'nn.n-c3', 'nn.n-title'] },
        { say: 'But four is two times two. Four needs two factors of two.', show: ['nn.f-c0', 'nn.f-title'], focus: 'nn.f-c0' },
        { say: 'Ninety has only one factor of two. The second factor of two is missing, so ninety is not divisible by four. In fact, ninety divided by four is twenty-two point five.', show: 'nn.f-c1', focus: 'nn.f-c1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A number is $2 \\times 3^2 \\times 5 \\times 7$. Which number is it divisible by?',
          choices: ['$21$', '$4$', '$27$', '$25$'],
          answer: 0,
          working: '$21 = 3 \\times 7$, and the number has a $3$ and a $7$. It is not divisible by $4 = 2 \\times 2$ (one $2$), $27 = 3 \\times 3 \\times 3$ (two $3$s) or $25 = 5 \\times 5$ (one $5$). The number is $630$, and $630 \\div 21 = 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. A number is two times three squared times five times seven. Which number is it divisible by? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twenty-one. Twenty-one is three times seven, and the number has a three and a seven. Choice B, four, needs two factors of two, but the number has only one.', show: 'q.answer' },
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
            'To check a composite divisor, write it as a product of primes.',
            'The number is divisible by it if **all** of those primes are in its prime factorization, repeats included.',
            '$4 = 2 \\times 2$ needs two $2$s: one $2$ is not enough.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To check divisibility by a composite number, write it as a product of primes.', show: 'sum.0' },
        { say: 'The number is divisible by it if all of those primes are in the number’s prime factorization, repeats included.', show: 'sum.1' },
        { say: 'So four needs two factors of two, and one factor of two is not enough. Great work on prime factorization and powers!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
