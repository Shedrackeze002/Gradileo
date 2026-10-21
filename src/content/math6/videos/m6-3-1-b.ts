import type { Explainer } from '@/video/script.ts';
import { factorTree } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Two factor trees for 60: one starting 60 = 6 × 10, the other 60 = 4 × 15. Both end in 2, 2, 3, 5.
const treeA = (id: string) => figure(id, [factorTree({ tree: [60, [6, 2, 3], [10, 2, 5]], gap: 1.6, drop: 1.7 })]);
const treeB = (id: string) => figure(id, [factorTree({ tree: [60, [4, 2, 2], [15, 3, 5]], gap: 1.6, drop: 1.7 })]);

const video: Explainer = {
  id: 'm6-3-1-b',
  lessonId: 'm6-3-1',
  title: 'Prime Factorization, Part 2: Factor Trees',
  thumbnailTitle: 'Factor Trees',
  thumbnail: 'fa',
  summary:
    'The prime factorization of a number writes it as a product of primes. A factor tree splits 60 into 6 × 10, then 2 × 3 and 2 × 5, so 60 = 2 × 2 × 3 × 5; a tree that starts 60 = 4 × 15 ends with the same primes. Stopping at 4 × 15 is too soon, because 4 and 15 are composite.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 2', title: 'Factor Trees', subtitle: 'Breaking a number into primes' }],
      lines: [
        { say: 'Every composite number can be broken into prime numbers, the way a word can be broken into letters.', show: 'title' },
        { say: 'In this part, you will use a factor tree to find the prime factorization of a number.' },
      ],
    },
    {
      chapter: 'Prime factorization',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Prime factorization', md: 'The **prime factorization** of a number writes it as a product of prime numbers. For example, $12 = 2 \\times 2 \\times 3$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['12 = \\good{2} \\times \\good{2} \\times \\good{3}'] },
      ],
      lines: [
        { say: 'First, a word you will need. A product is the answer to a multiplication. Twelve is the product of two times two times three.', show: 'm.0' },
        { say: 'Two, two and three are all prime numbers. Each one has exactly two factors: one and itself.', focus: 'm.0' },
        { say: 'So two times two times three is called the prime factorization of twelve. The prime factorization of a number writes it as a product of prime numbers only.', show: 'def' },
      ],
    },
    {
      chapter: 'Factor trees',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factor tree', md: 'A **factor tree** splits a number into two factors, then splits each composite factor again. The tree stops when every branch ends in a prime number.' },
      ],
      lines: [
        { say: 'How do you find the prime factorization of a bigger number? A factor tree is a good way.', show: 'def' },
        { say: 'Write the number at the top. Split it into two factors, with a branch down to each one.' },
        { say: 'Then look at each factor. If it is composite, split it again. Keep going until every branch ends in a prime number.' },
      ],
    },
    {
      chapter: 'A factor tree for 60',
      layout: 'split',
      leftWidth: 520,
      left: [treeA('fa')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Write the prime factorization of $60$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['60 = 6 \\times 10', '6 = 2 \\times 3', '10 = 2 \\times 5', '60 = 2 \\times 2 \\times 3 \\times 5', '\\text{Check: } 4 \\times 15 = 60 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Let’s find the prime factorization of sixty. Write sixty at the top of the tree.', show: ['t', 'fa.level0'] },
        { say: 'Split sixty into two factors. Six times ten is sixty, so draw a branch to six and a branch to ten.', show: ['fa.level1', 'm.0'], focus: ['fa.n0', 'fa.n1', 'm.0'] },
        { say: 'Six is composite, so split it again. Six is two times three. Two and three are both prime.', show: ['fa.b00', 'fa.n00', 'fa.b01', 'fa.n01', 'm.1'], focus: ['fa.n00', 'fa.n01', 'm.1'] },
        { say: 'Ten is composite as well, so split it. Ten is two times five. Two and five are both prime.', show: ['fa.b10', 'fa.n10', 'fa.b11', 'fa.n11', 'm.2'], focus: ['fa.n10', 'fa.n11', 'm.2'] },
        { say: 'Now every branch ends in a prime number, so the tree is finished. Let’s circle the primes: two, three, two and five.', show: 'fa.primes', focus: 'fa.primes' },
        { say: 'So sixty equals two times two times three times five. It is a good habit to write the primes in order, from smallest to largest.', show: 'm.3', focus: 'm.3' },
        { say: 'Always check by multiplying. Two times two is four, and three times five is fifteen. Four times fifteen is sixty. It checks!', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Another tree for 60',
      layout: 'split',
      leftWidth: 520,
      left: [treeB('fb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['60 = 4 \\times 15', '4 = 2 \\times 2', '15 = 3 \\times 5', '60 = 2 \\times 2 \\times 3 \\times 5'] }],
      lines: [
        { say: 'You can start a factor tree in a different way. This time, split sixty into four times fifteen.', show: ['fb.level0', 'fb.level1', 'm.0'], focus: 'm.0' },
        { say: 'Four is composite. Four is two times two.', show: ['fb.b00', 'fb.n00', 'fb.b01', 'fb.n01', 'm.1'], focus: 'm.1' },
        { say: 'Fifteen is composite. Fifteen is three times five.', show: ['fb.b10', 'fb.n10', 'fb.b11', 'fb.n11', 'm.2'], focus: 'm.2' },
        { say: 'Circle the primes: two, two, three and five. These are the same primes as before!', show: ['fb.primes', 'm.3'], focus: ['fb.primes', 'm.3'] },
        { say: 'It does not matter how you start. Every factor tree for a number ends with the same primes. So each number has only one prime factorization.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping too soon', md: '$60 = 4 \\times 15$ is not a prime factorization, because $4$ and $15$ are composite. Keep splitting until every factor is prime.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['60 = \\bad{4} \\times \\bad{15} \\quad \\text{not finished}', '60 = \\good{2 \\times 2 \\times 3 \\times 5} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Sixty equals four times fifteen is true. But it is not a prime factorization.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Four and fifteen are composite. Four can be split into two times two, and fifteen into three times five.' },
        { say: 'So keep splitting until every factor is prime. Then you have the prime factorization: two times two times three times five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the prime factorization of $90$?',
          choices: ['$2 \\times 3 \\times 3 \\times 5$', '$9 \\times 10$', '$2 \\times 3 \\times 5$', '$3 \\times 3 \\times 10$'],
          answer: 0,
          working: '$90 = 9 \\times 10$, then $9 = 3 \\times 3$ and $10 = 2 \\times 5$. So $90 = 2 \\times 3 \\times 3 \\times 5$. Check: $2 \\times 3 \\times 3 \\times 5 = 6 \\times 15 = 90$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the prime factorization of ninety? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ninety is nine times ten. Nine is three times three, and ten is two times five. So ninety is two times three times three times five. Choice B, nine times ten, stops too soon: nine and ten are composite.', show: 'q.answer' },
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
            'The **prime factorization** writes a number as a product of primes: $60 = 2 \\times 2 \\times 3 \\times 5$.',
            'A **factor tree** splits a number until every branch ends in a prime.',
            'Every factor tree for a number ends with the same primes.',
            'Check by multiplying the primes back together.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The prime factorization writes a number as a product of prime numbers.', show: 'sum.0' },
        { say: 'A factor tree splits a number into factors, until every branch ends in a prime.', show: 'sum.1' },
        { say: 'Every factor tree for a number ends with the same primes, however you start.', show: 'sum.2' },
        { say: 'And you can check by multiplying the primes back together. In the next part, you will see that a number can be written as a product in many ways. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
