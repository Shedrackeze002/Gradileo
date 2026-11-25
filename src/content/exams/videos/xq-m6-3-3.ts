import type { Explainer } from '@/video/script.ts';
import { factorTree, venn } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 6 lesson 3.3 (common factors and divisibility). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 10.6, Introduction to Factoring Polynomials,
// CC BY-NC-SA 4.0). 54 = 2 · 3 · 3 · 3 and 36 = 2 · 2 · 3 · 3 share 2 · 3 · 3, so the GCF is 18, as
// in the book's answer. Check: 54 = 18 × 3 and 36 = 18 × 2, and 3 and 2 share no factor but 1.

const QUESTION = 'Find the greatest common factor: 54, 36.';

const trees = (id: string) =>
  figure(id, [factorTree({ name: 'a', tree: [54, [6, 2, 3], [9, 3, 3]], gap: 1.3, drop: 1.4 }), factorTree({ name: 'b', tree: [36, [6, 2, 3], [6, 2, 3]], gap: 1.3, drop: 1.4, at: [6.2, 0] })], 300);

const shared = (id: string) => figure(id, [venn({ titles: ['54', '36'], left: ['3'], both: ['2', '3', '3'], right: ['2'] })], 380);

const video: Explainer = {
  id: 'xq-m6-3-3',
  lessonId: '',
  exam: {
    lesson: 'm6-3-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 10.6, Introduction to Factoring Polynomials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/10-6-introduction-to-factoring-polynomials',
    question: QUESTION,
  },
  title: 'Exam Question: The Greatest Common Factor of 54 and 36 (Common Factors and Divisibility)',
  thumbnailTitle: 'The GCF of 54 and 36',
  thumbnail: 'vn',
  summary:
    'A real test question, solved one small step at a time: find the greatest common factor of 54 and 36. We write each number as a product of primes, 54 = 2 · 3 · 3 · 3 and 36 = 2 · 2 · 3 · 3, and multiply the primes they share: 2 · 3 · 3 = 18. Then we check that 18 divides both numbers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The GCF of 54 and 36', subtitle: 'Common factors and divisibility, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the greatest common factor. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the greatest common factor: $54$, $36$.',
          answer: '$18$',
          working: 'shared primes 2 · 3 · 3 = 18',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the greatest common factor of 54 and 36.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Greatest common factor', md: 'A **common factor** divides **both** numbers with no remainder. The **greatest common factor** (GCF) is the **largest** one. For $54$ and $36$, $2$ and $9$ are common factors, but is there a bigger one?' }],
      lines: [
        { say: 'A common factor of two numbers divides both of them with no remainder.', show: 'c' },
        { say: 'The greatest common factor is the largest of them. 2 and 9 both divide 54 and 36, but we want the biggest number that does.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'GCF from prime factors', md: 'Write each number as a **product of primes**. The GCF is the product of the primes they **share**, each used as many times as it appears in **both**.' }],
      lines: [
        { say: 'Here is what we need. Write each number as a product of primes.', show: 'c' },
        { say: 'Then the greatest common factor is the product of the primes they share, each used as many times as it appears in both.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** $54$ and $36$ into primes', 'Find the primes they **share**', '**Multiply** the shared primes'] }],
      lines: [
        { say: 'Here is the plan. Factor 54 and 36 into primes.', show: 'plan.0' },
        { say: 'Find the primes they share.', show: 'plan.1' },
        { say: 'Then multiply the shared primes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Prime factors',
      layout: 'center',
      main: [trees('ft'), { kind: 'math', id: 'm', size: 'md', lines: ['54 = 2 \\cdot 3 \\cdot 3 \\cdot 3', '36 = 2 \\cdot 2 \\cdot 3 \\cdot 3'] }],
      lines: [
        { say: 'Step one. 54 is 6 times 9. 6 is 2 times 3, and 9 is 3 times 3. So 54 is 2 times 3 times 3 times 3.', show: ['ft.a-level0', 'ft.a-level1', 'ft.a-level2', 'ft.a-primes', 'm.0'], focus: 'm.0' },
        { say: '36 is 6 times 6, and each 6 is 2 times 3. So 36 is 2 times 2 times 3 times 3.', show: ['ft.b-level0', 'ft.b-level1', 'ft.b-level2', 'ft.b-primes', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Shared primes',
      layout: 'split',
      leftWidth: 560,
      left: [shared('vn')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{shared: } 2, 3, 3', '\\text{GCF} = 2 \\cdot 3 \\cdot 3', '= \\good{18}'] }],
      lines: [
        { say: 'Step two. Put the primes in two circles. Both numbers have one 2 and two 3s, so those go in the middle, where the circles overlap.', show: ['vn.a', 'vn.b', 'vn.both', 'vn.lens', 'm.0'], focus: 'vn.both' },
        { say: '54 has one more 3, and 36 has one more 2. Those are not shared, so they go on the sides.', show: ['vn.left', 'vn.right'], focus: ['vn.left', 'vn.right'] },
        { say: 'Step three. Multiply the shared primes: 2 times 3 times 3 is 18. The greatest common factor of 54 and 36 is 18.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['54 = 18 \\times 3, \\quad 36 = 18 \\times 2 \\ \\checkmark', '3 \\text{ and } 2 \\text{ share no factor but } 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 18 divides 54 three times, and 36 two times, so 18 is a common factor.', show: 'm.0' },
        { say: 'And what is left, 3 and 2, share no factor except 1, so no bigger common factor exists. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$6$ or $9$', 'common factors, but not the **greatest**'],
            ['$108$', 'that is the **least common multiple**, a multiple of **both**'],
            ['$2 \\cdot 3 = 6$', 'the shared **3** appears **twice** in both: use it twice'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6 and 9 are common factors of 54 and 36, but they are not the greatest.' },
        { say: '108 is the least common multiple. It is a multiple of both numbers, not a factor of them.' },
        { say: 'And 6 uses the shared 3 only once. Both numbers have two 3s, so the 3 is used twice.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the greatest common factor of $24$ and $40$?',
          choices: ['$4$', '$120$', '$2$', '$8$'],
          answer: 3,
          working: '24 = 2 · 2 · 2 · 3 and 40 = 2 · 2 · 2 · 5 share 2 · 2 · 2 = 8.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the greatest common factor of 24 and 40? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '24 is 2 times 2 times 2 times 3, and 40 is 2 times 2 times 2 times 5. They share three 2s, and 2 times 2 times 2 is 8. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factor both numbers into **primes**', 'Find the primes they **share**', '**Multiply** the shared primes', 'Check that it **divides** both'] }],
      lines: [
        { say: 'Here is what to remember. Factor both numbers into primes.', show: 'sum.0' },
        { say: 'Find the primes they share, as many times as both have them.', show: 'sum.1' },
        { say: 'Multiply the shared primes to get the greatest common factor.', show: 'sum.2' },
        { say: 'And check that it divides both numbers. For more on common factors and divisibility, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
