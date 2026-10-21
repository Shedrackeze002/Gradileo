import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squares } from './lib/m6-3-figures.ts';

// Twelve squares in equal rows: 1 row of 12, 2 rows of 6 and 3 rows of 4.
const twelve = (id: string) =>
  figure(id, [
    squares({ name: 'a', rows: 1, cols: 12, label: '1 \\times 12' }),
    squares({ name: 'b', rows: 2, cols: 6, at: [0, -2.6], tone: 'opp', label: '2 \\times 6' }),
    squares({ name: 'c', rows: 3, cols: 4, at: [8, -2.6], tone: 'good', label: '3 \\times 4' }),
  ]);

// Seven squares: one row of 7 works, but 2 or 3 equal rows leave one square over.
const seven = (id: string) =>
  figure(id, [
    squares({ name: 'a', rows: 1, cols: 7, tone: 'good', label: '1 \\times 7' }),
    squares({ name: 'b', rows: 2, cols: 3, extra: 1, at: [0, -2.3], label: '2 \\times 3 + 1' }),
    squares({ name: 'c', rows: 3, cols: 2, extra: 1, at: [4.6, -2.3], label: '3 \\times 2 + 1' }),
  ]);

const video: Explainer = {
  id: 'm6-3-1',
  lessonId: 'm6-3-1',
  title: 'Prime Factorization, Part 1: Prime and Composite Numbers',
  thumbnailTitle: 'Prime and Composite Numbers',
  thumbnail: 'sv',
  summary:
    'Factors as equal rows of squares (12 as 1 × 12, 2 × 6 and 3 × 4), prime numbers with exactly two factors (7 only makes one row), composite numbers with more than two, and 1, which is neither. Quick checks for 2, 3 and 5 show that 51 = 3 × 17 is composite, and that odd numbers are not always prime.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 1', title: 'Prime and Composite Numbers', subtitle: 'The building blocks of numbers' }],
      lines: [
        { say: 'Words are built from letters. In the same way, every whole number greater than one is built from special numbers called prime numbers.', show: 'title' },
        { say: 'In this part, you will learn what prime numbers and composite numbers are, and how to tell them apart.' },
      ],
    },
    {
      chapter: 'Factors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factor', md: 'A **factor** of a number divides it evenly, with no remainder. The factors of $12$ are $1, 2, 3, 4, 6$ and $12$.' },
        twelve('tw'),
      ],
      lines: [
        { say: 'First, a reminder. A factor of a number divides it evenly, with no remainder.', show: 'def' },
        { say: 'Here are twelve squares in one long row. One row of twelve is one times twelve. So one and twelve are factors of twelve.', show: ['tw.a-sq', 'tw.a-label'], focus: 'tw.a-sq' },
        { say: 'We can also put the twelve squares in two equal rows of six. So two and six are factors of twelve as well.', show: ['tw.b-sq', 'tw.b-label'], focus: 'tw.b-sq' },
        { say: 'And we can put them in three equal rows of four. So three and four are factors.', show: ['tw.c-sq', 'tw.c-label'], focus: 'tw.c-sq' },
        { say: 'So the factors of twelve are one, two, three, four, six and twelve. Twelve has six factors.', focus: 'tw' },
      ],
    },
    {
      chapter: 'Prime numbers',
      layout: 'split',
      leftWidth: 520,
      left: [seven('sv')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Prime number', md: 'A **prime number** has exactly two factors: $1$ and itself. Examples: $2, 3, 5, 7, 11, 13$.' }],
      lines: [
        { say: 'Now try seven squares. One row of seven works. So one and seven are factors of seven.', show: ['sv.a-sq', 'sv.a-label'], focus: 'sv.a-sq' },
        { say: 'Can we make two equal rows? Two rows of three use six squares, and one square is left over. So two is not a factor of seven.', show: ['sv.b-sq', 'sv.b-extra', 'sv.b-label'], focus: 'sv.b-extra' },
        { say: 'Three equal rows of two leave one square over as well. Try four, five or six rows, and there is always a square left over.', show: ['sv.c-sq', 'sv.c-extra', 'sv.c-label'], focus: 'sv.c-extra' },
        { say: 'So seven has exactly two factors: one and seven. A number like this is called a prime number.', focus: 'sv.a-sq' },
        { say: 'A prime number has exactly two factors: one and itself. The first few prime numbers are two, three, five, seven, eleven and thirteen.', show: 'def' },
      ],
    },
    {
      chapter: 'Composite numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Composite number', md: 'A **composite number** has more than two factors. Examples: $4, 6, 9, 12, 15$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'Factors', 'Type'],
          rows: [
            ['$7$', '$1, 7$', 'prime'],
            ['$12$', '$1, 2, 3, 4, 6, 12$', 'composite'],
            ['$9$', '$1, 3, 9$', 'composite'],
            ['$1$', '$1$', 'neither'],
          ],
        },
      ],
      lines: [
        { say: 'Twelve has six factors, which is more than two. A number with more than two factors is called a composite number.', show: 'def' },
        { say: 'Let’s sort some numbers. Seven has exactly two factors, one and seven. So seven is prime.', show: 't.0', focus: 't.0' },
        { say: 'Twelve has six factors. So twelve is composite.', show: 't.1', focus: 't.1' },
        { say: 'Nine has three factors: one, three and nine. More than two factors means composite.', show: 't.2', focus: 't.2' },
        { say: 'And what about the number one? One has only one factor: itself. That is not two factors, so one is not prime. It is not composite either. One is neither prime nor composite.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Quick checks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Quick checks', md: 'A number is **divisible** by $2$ if its last digit is even, by $5$ if its last digit is $0$ or $5$, and by $3$ if the sum of its digits is divisible by $3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['34\\colon\\ \\text{last digit } 4 \\text{ is even} \\;\\to\\; 34 = 2 \\times 17', '65\\colon\\ \\text{last digit } 5 \\;\\to\\; 65 = 5 \\times 13', '81\\colon\\ 8 + 1 = 9 \\;\\to\\; 81 = 3 \\times 27'] },
      ],
      lines: [
        { say: 'To decide whether a number is prime, look for factors. These quick checks help. A number is divisible by another number when it divides evenly, with no remainder.', show: 'tip' },
        { say: 'A number is divisible by two if its last digit is even. Thirty-four ends in four, which is even, so two is a factor.', show: 'm.0', focus: 'm.0' },
        { say: 'A number is divisible by five if its last digit is zero or five. Sixty-five ends in five, so five is a factor.', show: 'm.1', focus: 'm.1' },
        { say: 'And a number is divisible by three if the sum of its digits is divisible by three. For eighty-one, eight plus one is nine, and nine is divisible by three. So three is a factor of eighty-one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is 51 prime?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Is $51$ a prime number or a composite number?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['51 \\text{ is odd} \\;\\to\\; \\text{not divisible by } 2', '5 + 1 = 6 \\;\\to\\; \\text{try } 3', '51 \\div 3 = 17, \\text{ so } 51 = 3 \\times 17', '\\text{Factors: } 1,\\ 3,\\ 17,\\ 51 \\;\\to\\; \\good{\\text{composite}}'],
        },
      ],
      lines: [
        { say: 'Let’s try one. Is fifty-one a prime number or a composite number?', show: 't' },
        { say: 'Try dividing by small primes. Fifty-one ends in one, which is odd. So two is not a factor.', show: 'm.0', focus: 'm.0' },
        { say: 'Now add the digits. Five plus one is six, and six is divisible by three. So try three.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifty-one divided by three is seventeen, with no remainder. So fifty-one equals three times seventeen.', show: 'm.2', focus: 'm.2' },
        { say: 'That means fifty-one has the factors one, three, seventeen and fifty-one. That is more than two factors, so fifty-one is composite.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Odd numbers are not always prime', md: '$9$, $15$, $21$, $27$, $49$ and $51$ are all odd, but they are composite. For example, $49 = 7 \\times 7$. Always check for factors.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['9 = 3 \\times 3 \\qquad 15 = 3 \\times 5 \\qquad 21 = 3 \\times 7', '27 = 3 \\times 9 \\qquad 49 = 7 \\times 7 \\qquad 51 = 3 \\times 17'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is easy to think that every odd number is prime. It is not true!', show: 'oops' },
        { say: 'Nine is three times three. Fifteen is three times five. Twenty-one is three times seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-seven is three times nine. Forty-nine is seven times seven. And fifty-one is three times seventeen.', show: 'm.1', focus: 'm.1' },
        { say: 'All of these numbers are odd, but they are composite. So always check for factors. And remember that two is prime, even though it is even. Two is the only even prime number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is **prime**?',
          choices: ['$21$', '$39$', '$29$', '$45$'],
          answer: 2,
          working: '$29$ has only two factors, $1$ and $29$. The others are composite: $21 = 3 \\times 7$, $39 = 3 \\times 13$ and $45 = 5 \\times 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-nine. Its only factors are one and twenty-nine. Choice B, thirty-nine, is odd, but its digits add up to twelve, so three is a factor: thirty-nine is three times thirteen.', show: 'q.answer' },
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
            'A **factor** divides a number evenly, with no remainder.',
            'A **prime number** has exactly two factors: $1$ and itself.',
            'A **composite number** has more than two factors. $1$ is neither prime nor composite.',
            'Odd numbers are not always prime. Use the quick checks and look for factors.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A factor divides a number evenly, with no remainder.', show: 'sum.0' },
        { say: 'A prime number has exactly two factors: one and itself.', show: 'sum.1' },
        { say: 'A composite number has more than two factors. And one is neither prime nor composite.', show: 'sum.2' },
        { say: 'Odd numbers are not always prime, so always look for factors. In the next part, you will break a composite number into prime numbers with a factor tree. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
