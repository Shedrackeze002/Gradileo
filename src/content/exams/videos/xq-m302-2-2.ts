import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 2.2 (permutations). The question is a Your Turn from OpenStax
// Contemporary Mathematics, word for word (section 7.2, Permutations, CC BY-NC-SA 4.0). The book
// says "combinations" in the everyday sense, but first, second and third are different prizes, so
// order matters and the count is 15P3 = 15 × 14 × 13 = 2,730, as in the book's solution. The check
// lists the 6 ways 3 pigs can fill first and second.

const QUESTION =
  'One of the big draws at this year’s state fair is the pig race. There are 15 entrants, and prizes are given to the top three finishers. How many different combinations of top-three finishes could there be?';

const video: Explainer = {
  id: 'xq-m302-2-2',
  lessonId: '',
  exam: {
    lesson: 'm302-2-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.2, Permutations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-2-permutations',
    question: QUESTION,
  },
  title: 'Exam Question: Top Three in a Pig Race (Permutations)',
  thumbnailTitle: 'Top Three in a Pig Race',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: 15 pigs race, and prizes go to the top three. How many different top-three finishes could there be? First, second and third are different prizes, so order matters: 15P3 = 15!/12! = 15 × 14 × 13 = 2,730. Then we check with 3 pigs and look at the traps, including why the book\'s word "combinations" does not mean nCr here.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Top Three in a Pig Race', subtitle: 'Permutations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about permutations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '${}_{15}P_3 = 15 \\times 14 \\times 13 = 2730$',
          working: 'First, second and third are different, so order matters: a permutation.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'One of the big draws at this year\'s state fair is the pig race. There are 15 entrants, and prizes are given to the top three finishers. How many different combinations of top-three finishes could there be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A top-three finish names a **first**, a **second** and a **third** place pig. Pig A first and pig B second is a **different** finish from pig B first and pig A second.' }],
      lines: [
        { say: 'A top-three finish names a first place pig, a second place pig and a third place pig.', show: 't' },
        { say: 'Pig A first and pig B second is a different finish from pig B first and pig A second. So the order matters, even though the book uses the everyday word "combinations".' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'npr', tone: 'definition', title: 'Permutations', md: 'Arranging $r$ of $n$ objects **in order**: $\\ {}_nP_r = \\dfrac{n!}{(n - r)!}$' },
        { kind: 'callout', id: 'fact', tone: 'tip', title: 'Factorial', md: '$n! = n \\times (n - 1) \\times \\cdots \\times 2 \\times 1$' },
      ],
      lines: [
        { say: 'Here is what we need. The number of ways to arrange r of n objects in order is n P r: n factorial over n minus r factorial.', show: 'npr' },
        { say: 'And n factorial is n times n minus 1, all the way down to 1.', show: 'fact' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Decide: does **order** matter?', 'Fill the places **one at a time**', 'Match with ${}_nP_r$'] }],
      lines: [
        { say: 'Here is the plan. First, decide whether order matters.', show: 'plan.0' },
        { say: 'Second, fill the three places one at a time.', show: 'plan.1' },
        { say: 'Third, match the answer with the permutation formula.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Does order matter?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{1st, 2nd, 3rd: different prizes}', '\\Rightarrow \\ \\good{\\text{order matters: a permutation}}'] }],
      lines: [
        { say: 'Step one. First, second and third are different prizes.', show: 'm.0' },
        { say: 'So swapping two pigs gives a different finish. Order matters, so this is a permutation.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: One place at a time',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'places',
          head: ['1st', '2nd', '3rd'],
          rows: [['$15$', '$14$', '$13$']],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['15 \\times 14 \\times 13 = \\good{2730}'] },
      ],
      lines: [
        { say: 'Step two. Any of the 15 pigs can win. Once a pig has won, 14 are left for second, and then 13 for third.', show: 'places' },
        { say: 'Multiply: 15 times 14 is 210, and 210 times 13 is 2,730.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: The formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{}_{15}P_3 = \\dfrac{15!}{(15 - 3)!} = \\dfrac{15!}{12!}', '= 15 \\times 14 \\times 13 = \\good{2730}'] }],
      lines: [
        { say: 'Step three. The formula says 15 P 3 is 15 factorial over 12 factorial.', show: 'm.0' },
        { say: 'The 12 factorial cancels everything below 13, leaving 15 times 14 times 13: the same 2,730 top-three finishes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\text{ pigs, top 2: } {}_3P_2 = 3 \\times 2 = 6', '\\text{AB, BA, AC, CA, BC, CB} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the method on a race small enough to list: 3 pigs, A, B and C, and prizes for the top 2. The formula gives 3 times 2, which is 6.', show: 'm.0' },
        { say: 'Listing first then second: A B, B A, A C, C A, B C and C B. Exactly 6, and A B and B A both count. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['${}_{15}C_3 = 455$', 'the places are **different**: order matters'],
            ['$15^3 = 3375$', 'a pig cannot finish in **two** places'],
            ['$15! \\div 3!$', 'the formula divides by $(n - r)! = 12!$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The word "combinations" might tempt you to use n C r, which gives 455. But the three places are different prizes, so order matters.' },
        { say: '15 cubed lets the same pig win twice. Each place leaves one fewer pig.' },
        { say: 'And the permutation formula divides by n minus r factorial, which is 12 factorial, not 3 factorial.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In how many ways can a president, a vice-president and a secretary be chosen from a club of $10$ members?',
          choices: ['$720$', '$120$', '$1000$', '$30$'],
          answer: 0,
          working: 'Different jobs, so order matters: ${}_{10}P_3 = 10 \\times 9 \\times 8 = 720$.',
        },
      ],
      lines: [
        { say: 'Your turn. In how many ways can a president, a vice-president and a secretary be chosen from a club of 10 members? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The jobs are different, so order matters: 10 times 9 times 8 is 720: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Different places or jobs: **order matters**', 'Fill the places one at a time: $n \\times (n - 1) \\times \\cdots$', '${}_nP_r = \\dfrac{n!}{(n - r)!}$', 'Check on a small case you can list'] }],
      lines: [
        { say: 'Here is what to remember. When the places or jobs are different, order matters.', show: 'sum.0' },
        { say: 'Fill the places one at a time, with one fewer choice each time.', show: 'sum.1' },
        { say: 'That is n P r, n factorial over n minus r factorial.', show: 'sum.2' },
        { say: 'And check on a small case you can list. For more on permutations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
