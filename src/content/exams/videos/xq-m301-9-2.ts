import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 9.2 (permutations). The question is an exercise from OpenStax
// College Algebra 2e, word for word (section 13.5, Counting Principles, CC BY-NC-SA 4.0), with its
// set's instruction in front of it. "academia" has 8 letters, and the letter a appears 3 times, so
// there are 8!/3! = 40,320/6 = 6,720 distinct arrangements, as in the book's answer.

const QUESTION = 'Find the distinct number of arrangements. The letters in the word "academia"';

const video: Explainer = {
  id: 'xq-m301-9-2',
  lessonId: '',
  exam: {
    lesson: 'm301-9-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 13.5, Counting Principles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/13-5-counting-principles',
    question: QUESTION,
  },
  title: 'Exam Question: Arrangements of the Letters in "academia" (Permutations)',
  thumbnailTitle: 'Arrange the Letters of "academia"',
  thumbnail: 'w',
  summary:
    'A real test question, solved one small step at a time: how many distinct arrangements are there of the letters in the word "academia"? There are 8 letters, so 8! arrangements if they were all different, but the 3 a\'s are identical, so each word is counted 3! times. That gives 8!/3! = 6,720. Then we check with a smaller word and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Arrange the Letters of "academia"', subtitle: 'Permutations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about permutations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Find the distinct number of arrangements. The letters in the word "academia"',
          answer: '$\\dfrac{8!}{3!} = 6720$',
          working: '$8$ letters with $3$ identical a\'s: $\\dfrac{8!}{3!}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the distinct number of arrangements. The letters in the word "academia".' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'w', size: 'xl', lines: ['\\good{a} \\ c \\ \\good{a} \\ d \\ e \\ m \\ i \\ \\good{a}'] },
        { kind: 'text', id: 't', size: 'md', md: 'In how many **different** orders can these $8$ letters be written? Swapping two a\'s gives the **same** word, so it must not be counted twice.' },
      ],
      lines: [
        { say: 'Here are the 8 letters of "academia". Notice the letter a appears 3 times.', show: 'w' },
        { say: 'We need the number of different orders. Swapping two of the a\'s gives exactly the same word, so it must only be counted once.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fact', tone: 'definition', title: 'Arranging n different objects', md: '$n! = n \\times (n - 1) \\times \\dots \\times 2 \\times 1$ ways.' },
        { kind: 'callout', id: 'rep', tone: 'key', title: 'With identical objects', md: 'If one object appears $a$ times, another $b$ times, and so on: $\\dfrac{n!}{a! \\, b! \\cdots}$' },
      ],
      lines: [
        { say: 'Here is what we need. n different objects can be arranged in n factorial ways: n times n minus 1, all the way down to 1.', show: 'fact' },
        { say: 'If some objects are identical, divide by the factorial of how many times each one repeats. That removes the double counting.', show: 'rep' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **letters**', 'Count the **repeats**', 'Divide: $\\dfrac{n!}{a!}$'] }],
      lines: [
        { say: 'Here is the plan. First, count the letters.', show: 'plan.0' },
        { say: 'Second, count how many times each letter repeats.', show: 'plan.1' },
        { say: 'Third, divide n factorial by the factorials of the repeats.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count the letters',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = 8', '8! = 8 \\times 7 \\times 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 40{,}320'] }],
      lines: [
        { say: 'Step one. "academia" has 8 letters.', show: 'm.0' },
        { say: 'If all 8 were different, there would be 8 factorial arrangements: 8 times 7 times 6, all the way down to 1, which is 40,320.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Count the repeats',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a: 3 \\text{ times}, \\quad c, d, e, m, i: \\text{ once each}', '3! = 6 \\text{ orders of the a\'s look the same}'] }],
      lines: [
        { say: 'Step two. The letter a appears 3 times. c, d, e, m and i appear once each.', show: 'm.0' },
        { say: 'The 3 a\'s can be shuffled among themselves in 3 factorial, which is 6, ways, and every one of those looks the same. So 8 factorial counts each word 6 times.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{8!}{3!} = \\dfrac{40{,}320}{6}', '= \\good{6720}'] }],
      lines: [
        { say: 'Step three. Divide 8 factorial by 3 factorial: 40,320 over 6.', show: 'm.0' },
        { say: 'That is 6,720 distinct arrangements.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{aab}: \\ \\dfrac{3!}{2!} = 3'] },
        { kind: 'bullets', id: 'list', items: ['aab', 'aba', 'baa'] },
      ],
      lines: [
        { say: 'Let us check the method on a word small enough to list. "aab" has 3 letters, with the a repeated 2 times. The formula gives 3 factorial over 2 factorial, which is 3.', show: 'm.0' },
        { say: 'And listing them: a a b, a b a, and b a a. Exactly 3. So dividing by the factorial of the repeats works.', show: 'list' },
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
            ['$8! = 40{,}320$', 'the a\'s are **identical**: divide by $3!$'],
            ['$\\dfrac{8!}{3} = 13{,}440$', 'divide by $3!$ (the orders of the a\'s), not $3$'],
            ['$\\dfrac{8!}{3! \\cdot 5!}$', 'letters that appear **once** need no division'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 factorial treats the three a\'s as different letters, so it counts each word 6 times.' },
        { say: 'Divide by 3 factorial, not 3. There are 6 ways to order the a\'s, not 3.' },
        { say: 'And the other letters each appear once. 1 factorial is 1, so they need no division.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many distinct arrangements are there of the letters in the word "banana"?',
          choices: ['$60$', '$720$', '$120$', '$360$'],
          answer: 0,
          working: '$6$ letters: a $3$ times, n $2$ times. $\\dfrac{6!}{3! \\, 2!} = \\dfrac{720}{12} = 60$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many distinct arrangements are there of the letters in the word "banana"? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '"banana" has 6 letters. a appears 3 times and n appears 2 times. So 6 factorial over 3 factorial times 2 factorial: 720 over 12, which is 60: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$n$ different objects: $n!$ arrangements', 'Identical objects: divide by the **factorial** of each repeat', '$\\dfrac{n!}{a! \\, b! \\cdots}$', 'Check the method on a small word you can list'] }],
      lines: [
        { say: 'Here is what to remember. n different objects can be arranged in n factorial ways.', show: 'sum.0' },
        { say: 'When some objects are identical, divide by the factorial of each repeat.', show: 'sum.1' },
        { say: 'That is n factorial over "a" factorial, b factorial, and so on.', show: 'sum.2' },
        { say: 'And check the method on a small word you can list. For more on permutations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
