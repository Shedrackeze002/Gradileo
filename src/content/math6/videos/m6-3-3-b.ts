import type { Explainer } from '@/video/script.ts';
import { venn } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { rainbow } from '@/content/math5/videos/lib/m5-3-figures.ts';

// The primes of 24 = 2 × 2 × 2 × 3 and 36 = 2 × 2 × 3 × 3: they share 2, 2 and 3.
const shared = (id: string) => figure(id, [venn({ titles: ['24', '36'], left: ['2'], both: ['2', '2', '3'], right: ['3'] })]);

const video: Explainer = {
  id: 'm6-3-3-b',
  lessonId: 'm6-3-3',
  title: 'Common Factors and Divisibility, Part 2: Common Factors',
  thumbnailTitle: 'Common Factors',
  thumbnail: 'vn',
  summary:
    'A common factor is a factor of both numbers, and the greatest common factor is the largest. 24 = 2 × 2 × 2 × 3 and 36 = 2 × 2 × 3 × 3 share 2 × 2 × 3 = 12, the greatest common factor, so their common factors are the factors of 12: 1, 2, 3, 4, 6 and 12. A shared prime is used only as many times as it appears in both.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 2', title: 'Common Factors', subtitle: 'The primes two numbers share' }],
      lines: [
        { say: 'Twenty-four and thirty-six have some factors in common. Which ones are they? And which one is the greatest?', show: 'title' },
        { say: 'In this part, you will use prime factorizations to find common factors, and the greatest common factor.' },
      ],
    },
    {
      chapter: 'Common factors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common factor', md: 'A **common factor** of two numbers is a factor of both numbers. The **greatest common factor** is the largest one.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12\\colon\\ \\good{1},\\ \\good{2},\\ \\good{3},\\ 4,\\ \\good{6},\\ 12', '18\\colon\\ \\good{1},\\ \\good{2},\\ \\good{3},\\ \\good{6},\\ 9,\\ 18'] },
      ],
      lines: [
        { say: 'A common factor of two numbers is a factor of both numbers. Common means shared.', show: 'def' },
        { say: 'For example, the factors of twelve are one, two, three, four, six and twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The factors of eighteen are one, two, three, six, nine and eighteen.', show: 'm.1', focus: 'm.1' },
        { say: 'One, two, three and six are in both lists, so they are the common factors of twelve and eighteen. The largest one, six, is called the greatest common factor.', focus: 'm' },
      ],
    },
    {
      chapter: 'Using prime factorizations',
      layout: 'split',
      leftWidth: 560,
      left: [shared('vn')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['24 = 2 \\times 2 \\times 2 \\times 3', '36 = 2 \\times 2 \\times 3 \\times 3', '\\text{shared: } \\good{2 \\times 2 \\times 3 = 12}'] }],
      lines: [
        { say: 'Listing factors works for small numbers. For bigger numbers, prime factorizations are faster. Let’s find the common factors of twenty-four and thirty-six.' },
        { say: 'Twenty-four is two times two times two times three.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty-six is two times two times three times three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now find the primes they share. Both have two factors of two, and one factor of three. Put the shared primes in the middle, where the two circles overlap.', show: ['vn.a', 'vn.b', 'vn.both', 'vn.lens'], focus: 'vn.both' },
        { say: 'Twenty-four has one more two, which goes on its own side. Thirty-six has one more three, which goes on the other side.', show: ['vn.left', 'vn.right'], focus: ['vn.left', 'vn.right'] },
        { say: 'Multiply the shared primes: two times two times three is twelve. Twelve is the greatest common factor of twenty-four and thirty-six.', show: 'm.2', focus: ['m.2', 'vn.both'] },
      ],
    },
    {
      chapter: 'Every common factor',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Every factor of the greatest common factor, $12$, is a common factor of $24$ and $36$.' },
        figure('rb', [rainbow({ factors: [1, 2, 3, 4, 6, 12], gap: 1.6 })], 240),
        { kind: 'math', id: 'm', size: 'md', lines: ['24 \\div 4 = 6 \\qquad 36 \\div 4 = 9'] },
      ],
      lines: [
        { say: 'Here is something useful. Every factor of the greatest common factor is a common factor as well.', show: 't' },
        { say: 'The factors of twelve are one, two, three, four, six and twelve. Each one is joined to its partner here.', show: ['rb.f0', 'rb.f1', 'rb.f2', 'rb.f3', 'rb.f4', 'rb.f5', 'rb.p0', 'rb.p1', 'rb.p2'] },
        { say: 'So the common factors of twenty-four and thirty-six are one, two, three, four, six and twelve.' },
        { say: 'Check one of them. Four divides twenty-four six times, and it divides thirty-six nine times. So four really is a common factor.', show: 'm.0', focus: ['m.0', 'rb.f3'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using a shared prime too many times', md: '$24$ has three $2$s and $36$ has two $2$s. They share only **two** $2$s. Use each shared prime only as many times as it appears in **both** lists.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{2 \\times 2 \\times 2 \\times 3 = 24} \\quad 36 \\div 24 = 1 \\text{ R } 12', '\\good{2 \\times 2 \\times 3 = 12} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Twenty-four has three factors of two, but thirty-six has only two factors of two.', show: 'oops' },
        { say: 'If you use all three factors of two, you get two times two times two times three, which is twenty-four. But twenty-four is not a factor of thirty-six: thirty-six divided by twenty-four leaves a remainder.', show: 'm.0', focus: 'm.0' },
        { say: 'They share only two factors of two. So use each shared prime only as many times as it appears in both lists. The greatest common factor is twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the greatest common factor of $18$ and $30$?',
          choices: ['$3$', '$6$', '$90$', '$2$'],
          answer: 1,
          working: '$18 = 2 \\times 3 \\times 3$ and $30 = 2 \\times 3 \\times 5$. They share one $2$ and one $3$, so the greatest common factor is $2 \\times 3 = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the greatest common factor of eighteen and thirty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, six. Eighteen is two times three times three, and thirty is two times three times five. They share one two and one three, and two times three is six. Choice A, three, is a common factor, but it is not the greatest one.', show: 'q.answer' },
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
            'A **common factor** is a factor of both numbers. The **greatest common factor** is the largest.',
            'Write both prime factorizations and find the primes they share.',
            'Multiply the shared primes to get the greatest common factor. Every factor of it is a common factor.',
            'Use a shared prime only as many times as it appears in both.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A common factor is a factor of both numbers, and the greatest common factor is the largest one.', show: 'sum.0' },
        { say: 'To find them, write both prime factorizations and find the primes they share.', show: 'sum.1' },
        { say: 'Multiply the shared primes to get the greatest common factor. Every factor of it is a common factor.', show: 'sum.2' },
        { say: 'And use each shared prime only as many times as it appears in both. In the next part, you will check whether a number is divisible by a composite number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
