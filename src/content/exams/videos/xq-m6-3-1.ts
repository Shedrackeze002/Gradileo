import type { Explainer } from '@/video/script.ts';
import { factorTree } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 6 lesson 3.1 (prime factorization). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 2.5, Prime Factorization and the Least Common Multiple, CC
// BY-NC-SA 4.0). 126 = 2 × 63, 63 = 9 × 7 and 9 = 3 × 3, so 126 = 2 · 3 · 3 · 7 = 2 · 3² · 7, as in
// the book's answer. Check: 2 × 9 × 7 = 126.

const QUESTION = 'Find the prime factorization using the factor tree method: 126';

const tree = (id: string) => figure(id, [factorTree({ tree: [126, 2, [63, [9, 3, 3], 7]], gap: 1.6, drop: 1.6 })], 520);

const video: Explainer = {
  id: 'xq-m6-3-1',
  lessonId: '',
  exam: {
    lesson: 'm6-3-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.5, Prime Factorization and the Least Common Multiple',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-5-prime-factorization-and-the-least-common-multiple',
    question: QUESTION,
  },
  title: 'Exam Question: A Factor Tree for 126 (Prime Factorization)',
  thumbnailTitle: 'A Factor Tree for 126',
  thumbnail: 'ft',
  summary:
    'A real test question, solved one small step at a time: find the prime factorization of 126 using a factor tree. We split 126 into 2 × 63, then 63 into 9 × 7, then 9 into 3 × 3, until every branch ends in a prime. So 126 = 2 · 3 · 3 · 7 = 2 · 3² · 7. Then we check by multiplying and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Factor Tree for 126', subtitle: 'Prime factorization, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about prime factorization. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Find the prime factorization using the factor tree method: $126$',
          answer: '$2 \\cdot 3 \\cdot 3 \\cdot 7$, or $2 \\cdot 3^2 \\cdot 7$',
          working: '126 = 2 × 63 = 2 × 9 × 7 = 2 × 3 × 3 × 7',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the prime factorization using the factor tree method: 126.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Prime factorization', md: 'A **prime** number has exactly **two** factors, $1$ and itself: $2, 3, 5, 7, 11, \\dots$ The **prime factorization** of $126$ writes it as a **product of primes** only.' }],
      lines: [
        { say: 'A prime number has exactly two factors, 1 and itself, like 2, 3, 5, 7, and 11.', show: 'c' },
        { say: 'The prime factorization of 126 writes 126 as a multiplication that uses only prime numbers.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'The factor tree method', md: 'Split the number into **two factors**. Keep splitting every factor that is **not prime**. **Circle** each prime: it is the end of its branch. The circled primes multiply to the number.' }],
      lines: [
        { say: 'Here is what we need. In a factor tree, split the number into two factors.', show: 'c' },
        { say: 'Keep splitting every factor that is not prime. When a branch reaches a prime, circle it: that branch is finished. The circled primes multiply to the number.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Split $126$ into **two factors**', 'Keep splitting until every branch is **prime**', 'Write the primes in **order**'] }],
      lines: [
        { say: 'Here is the plan. Split 126 into two factors.', show: 'plan.0' },
        { say: 'Keep splitting until every branch ends in a prime.', show: 'plan.1' },
        { say: 'Then write the primes in order, from smallest to largest.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The factor tree',
      layout: 'split',
      leftWidth: 520,
      left: [tree('ft')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['126 = 2 \\times 63', '63 = 9 \\times 7', '9 = 3 \\times 3', '126 = \\good{2 \\cdot 3^2 \\cdot 7}'] }],
      lines: [
        { say: 'Step one. 126 is even, so 2 is a factor. 126 is 2 times 63.', show: ['ft.level0', 'ft.level1', 'm.0'], focus: 'm.0' },
        { say: '2 is prime, so its branch is finished. Circle it.', show: 'ft.ring0', focus: 'ft.ring0' },
        { say: 'Step two. 63 is not prime. 63 is 9 times 7. 7 is prime, so circle it.', show: ['ft.level2', 'ft.ring11', 'm.1'], focus: 'm.1' },
        { say: '9 is not prime either. 9 is 3 times 3, and both are prime, so circle them.', show: ['ft.level3', 'ft.ring100', 'ft.ring101', 'm.2'], focus: 'm.2' },
        { say: 'Step three. Every branch ends in a prime: 2, 3, 3, and 7. So 126 is 2 times 3 times 3 times 7. With a power, that is 2 times 3 squared times 7.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\times 3 \\times 3 \\times 7 = 6 \\times 21 = 126 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying the primes back. 2 times 3 is 6, 3 times 7 is 21, and 6 times 21 is 126. It checks out.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$2 \\cdot 63$', 'stopped too soon: $63$ is **not prime**'],
            ['$2 \\cdot 9 \\cdot 7$', '$9 = 3 \\times 3$ is **not prime** either'],
            ['$2 \\cdot 3 \\cdot 7$', 'lost a $3$: write **every** circled prime'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 times 63 stops too soon. 63 is not prime, so it must be split again.' },
        { say: '2 times 9 times 7 still has a 9, which is 3 times 3. Keep going until every factor is prime.' },
        { say: 'And 2 times 3 times 7 lost one of the 3s. That only makes 42. Write every circled prime.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the prime factorization of $90$?',
          choices: ['$9 \\cdot 10$', '$2 \\cdot 3^2 \\cdot 5$', '$2 \\cdot 3 \\cdot 5$', '$2 \\cdot 3 \\cdot 15$'],
          answer: 1,
          working: '90 = 9 × 10 = 3 × 3 × 2 × 5 = 2 · 3² · 5.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the prime factorization of 90? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '90 is 9 times 10. 9 is 3 times 3, and 10 is 2 times 5. So 90 is 2 times 3 squared times 5. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Split into **two factors**', 'Keep going until every branch is **prime**', 'Write **every** prime, in order', '**Multiply** back to check'] }],
      lines: [
        { say: 'Here is what to remember. Split the number into two factors.', show: 'sum.0' },
        { say: 'Keep going until every branch ends in a prime.', show: 'sum.1' },
        { say: 'Write every prime, in order. Repeated primes can be written as a power.', show: 'sum.2' },
        { say: 'And multiply back to check. For more on prime factorization, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
