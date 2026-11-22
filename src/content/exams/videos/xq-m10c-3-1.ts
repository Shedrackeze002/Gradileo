import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 3.1 (prime factors, GCF and LCM): hot dogs come in packages of
// ten and buns in packs of eight; what is the smallest number that buys the same number of each?
// The question is an exercise from OpenStax Prealgebra 2e, word for word (section 2.5, Prime
// Factorization and the Least Common Multiple, CC BY-NC-SA 4.0), whose answer key gives 40:
// 10 = 2 × 5 and 8 = 2³, so the LCM is 2³ × 5 = 40, which is 4 packages of hot dogs and 5 of buns.

const QUESTION =
  'Hot dogs are sold in packages of ten, but hot dog buns come in packs of eight. What is the smallest number of hot dogs and buns that can be purchased if you want to have the same number of hot dogs and buns? (Hint: it is the LCM!)';

const video: Explainer = {
  id: 'xq-m10c-3-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-3-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 2.5, Prime Factorization and the Least Common Multiple',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-5-prime-factorization-and-the-least-common-multiple',
    question: QUESTION,
  },
  title: 'Exam Question: Hot Dogs and Buns. The Least Common Multiple',
  thumbnailTitle: 'Hot Dogs and Buns',
  thumbnail: 'f',
  summary:
    'A real test question, solved one small step at a time: hot dogs come in packages of 10 and buns in packs of 8, and we find the smallest number that gives the same number of each. We list the multiples, then find the least common multiple with prime factors, and check that it buys whole packages. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Hot Dogs and Buns', subtitle: 'The least common multiple, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about buying hot dogs and buns, with the least common multiple. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '40 (4 packages of hot dogs and 5 packs of buns)', working: '$10 = 2 \\times 5$ and $8 = 2^3$, so the LCM is $2^3 \\times 5 = 40$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Hot dogs are sold in packages of ten, but hot dog buns come in packs of eight. What is the smallest number of hot dogs and buns that can be purchased if you want to have the same number of hot dogs and buns? And there is a hint: it is the L C M.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'lg', md: 'Hot dogs: $10, 20, 30, \\ldots$ **Buns**: $8, 16, 24, \\ldots$' },
        { kind: 'text', id: 'b', size: 'md', md: 'We can only buy **whole packs**, so we want the smallest number that is in **both** lists.' },
      ],
      lines: [
        { say: 'Let us picture the shop. You can only buy whole packs. Buy hot dogs, and you have 10, then 20, then 30, and so on. Buy buns, and you have 8, then 16, then 24.', show: 't' },
        { say: 'We want the same number of each, as small as possible. That is the smallest number that is in both lists.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Least common multiple (LCM)', md: 'The **smallest** number that is a multiple of **each** of the numbers.' },
        { kind: 'text', id: 't', size: 'md', md: 'With prime factors: take **each prime** the **greatest number of times** it appears in any one number, and multiply.' },
      ],
      lines: [
        { say: 'Here is what we need. The least common multiple, or L C M, of two numbers is the smallest number that is a multiple of each of them.', show: 'def' },
        { say: 'One way to find it uses prime factors. Write each number as a product of primes. Then take each prime the greatest number of times it appears in any one of the numbers, and multiply.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the **multiples** of $10$ and of $8$', 'Check with **prime factors**', 'Count the **packs** to check'] }],
      lines: [
        { say: 'Here is the plan. First, list the multiples of 10 and of 8 until they meet.', show: 'plan.0' },
        { say: 'Second, check it with prime factors, the method that works for any numbers.', show: 'plan.1' },
        { say: 'Third, count the packs to check.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: List the multiples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['Packs', '1', '2', '3', '4', '5'],
          rows: [
            ['Hot dogs ($\\times 10$)', '$10$', '$20$', '$30$', '$\\good{40}$', '$50$'],
            ['Buns ($\\times 8$)', '$8$', '$16$', '$24$', '$32$', '$\\good{40}$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The multiples of 10 are 10, 20, 30, 40, 50.', show: 'm' },
        { say: 'The multiples of 8 are 8, 16, 24, 32, 40.', },
        { say: 'The first number in both lists is 40. So the least common multiple is 40.' },
      ],
    },
    {
      chapter: 'Step 2: Prime factors',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['10 = 2 \\times 5', '8 = 2 \\times 2 \\times 2 = 2^3', '\\text{LCM} = 2^3 \\times 5 = \\good{40}'] }],
      lines: [
        { say: 'Step two. Let us check with prime factors. 10 is 2 times 5.', show: 'f.0' },
        { say: 'And 8 is 2 times 2 times 2, which is 2 cubed.', show: 'f.1' },
        { say: 'The prime 2 appears at most three times, in the 8, and the prime 5 appears once, in the 10. So the L C M is 2 cubed times 5, which is 8 times 5, or 40. It agrees.', show: 'f.2', focus: 'f.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40 \\div 10 = 4 \\text{ packages of hot dogs} \\ \\checkmark', '40 \\div 8 = 5 \\text{ packs of buns} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 40 hot dogs is 40 divided by 10, which is 4 whole packages.', show: 'm.0' },
        { say: 'And 40 buns is 40 divided by 8, which is 5 whole packs. So you buy 4 packages of hot dogs and 5 packs of buns, and every hot dog gets a bun. The answer is 40.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Multiplying $10 \\times 8$', '$80$: it works, but it is **not the smallest**'],
            ['Finding the greatest common **factor**', '$2$: smaller than one pack'],
            ['Adding $10 + 8$', '$18$: not a multiple of either'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying 10 by 8 gives 80. That is a common multiple, so the hot dogs and buns would match, but it is not the smallest. You would buy twice as many as you need.' },
        { say: 'The greatest common factor of 10 and 8 is 2. That is the biggest number that divides both, which is a different question, and you cannot buy 2 hot dogs.' },
        { say: 'And adding gives 18, which is not a multiple of 10 or of 8.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Paper plates are sold in packages of 12 and party cups come in packs of 8. What is the smallest number of plates and cups you can buy if you want to have the same number of each?',
          choices: ['24', '96', '4', '20'],
          answer: 0,
          working: '$12 = 2^2 \\times 3$ and $8 = 2^3$, so the LCM is $2^3 \\times 3 = 24$: 2 packages of plates and 3 packs of cups.',
        },
      ],
      lines: [
        { say: 'Your turn. Paper plates are sold in packages of 12 and party cups come in packs of 8. What is the smallest number of plates and cups you can buy if you want to have the same number of each? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '12 is 2 squared times 3, and 8 is 2 cubed. The L C M is 2 cubed times 3, which is 24. That is choice A: 2 packages of plates and 3 packs of cups. 96 multiplied, 4 is the greatest common factor, and 20 added.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The **LCM** is the smallest number both divide into', 'List multiples, or use **prime factors**', 'Each prime the **greatest** number of times it appears', 'Check: it should give **whole** packs'] }],
      lines: [
        { say: 'Here is what to remember. The least common multiple is the smallest number that both numbers divide into.', show: 'sum.0' },
        { say: 'You can list multiples, or use prime factors.', show: 'sum.1' },
        { say: 'With prime factors, take each prime the greatest number of times it appears in any one number.', show: 'sum.2' },
        { say: 'And check that your answer gives whole packs. For more on prime factors and the least common multiple, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
