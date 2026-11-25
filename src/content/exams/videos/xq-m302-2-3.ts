import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 2.3 (permutations with repetition and restrictions). The
// question is an exercise from OpenStax College Algebra 2e, word for word (section 13.5, Counting
// Principles, CC BY-NC-SA 4.0). "mountains" has vowels o, u, a, i and consonants m, n, t, n, s.
// Glued together, the vowels make one block, so there are 6 items with n twice: 6!/2! = 360 orders,
// and the vowels can be ordered 4! = 24 ways inside the block: 360 × 24 = 8,640, as in the book's
// answer. The check lists the 12 arrangements of "bead" with its vowels together.

const QUESTION = 'How many arrangements can be made from the letters of the word “mountains” if all the vowels must form a string?';

const video: Explainer = {
  id: 'xq-m302-2-3',
  lessonId: '',
  exam: {
    lesson: 'm302-2-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 13.5, Counting Principles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/13-5-counting-principles',
    question: QUESTION,
  },
  title: 'Exam Question: Arranging "mountains" With the Vowels Together (Permutations with Repetition and Restrictions)',
  thumbnailTitle: 'Arrange "mountains", Vowels Together',
  thumbnail: 'w',
  summary:
    'A real test question, solved one small step at a time: how many arrangements of the letters of "mountains" keep all the vowels together? Glue the 4 vowels into one block, which leaves 6 items with the n twice, so 6!/2! = 360 orders. The vowels can be ordered 4! = 24 ways inside the block, so there are 360 × 24 = 8,640 arrangements. Then we check with a small word and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Arrange "mountains", Vowels Together', subtitle: 'Permutations with repetition and restrictions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about arrangements with repeated letters and a restriction. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '$\\dfrac{6!}{2!} \\times 4! = 8640$',
          working: 'Glue the vowels into one block: $6$ items with n twice, then order the vowels inside.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'How many arrangements can be made from the letters of the word "mountains" if all the vowels must form a string?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'w', size: 'xl', lines: ['m \\ \\good{o} \\ \\good{u} \\ n \\ t \\ \\good{a} \\ \\good{i} \\ n \\ s'] },
        { kind: 'text', id: 't', size: 'md', md: 'Rearrange all $9$ letters so that the vowels o, u, a, i sit **next to each other**, in any order, for example t s **oiua** n m n.' },
      ],
      lines: [
        { say: 'Here are the 9 letters of "mountains". The vowels are o, u, "a" and i.', show: 'w' },
        { say: 'We rearrange all 9 letters, but the 4 vowels must sit next to each other, in any order among themselves.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rep', tone: 'key', title: 'Repeated objects', md: '$n$ objects with one repeated $a$ times: $\\dfrac{n!}{a!}$ arrangements.' },
        { kind: 'callout', id: 'block', tone: 'tip', title: 'Objects that must stay together', md: 'Glue them into **one block**, arrange the block with the rest, then multiply by the orders **inside** the block.' },
      ],
      lines: [
        { say: 'Here is what we need. n objects, with one of them repeated "a" times, can be arranged in n factorial over "a" factorial ways.', show: 'rep' },
        { say: 'And when some objects must stay together, glue them into one block. Arrange the block with everything else, then multiply by the number of orders inside the block.', show: 'block' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Glue the vowels into **one block**', 'Arrange the block and the consonants: watch the **repeat**', 'Order the vowels **inside** the block, and multiply'] }],
      lines: [
        { say: 'Here is the plan. First, glue the vowels into one block.', show: 'plan.0' },
        { say: 'Second, arrange the block with the consonants, watching for the repeated letter.', show: 'plan.1' },
        { say: 'Third, order the vowels inside the block, and multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: One block',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\boxed{\\text{o u a i}} \\quad m \\quad n \\quad t \\quad n \\quad s', '6 \\text{ items, with } n \\text{ twice}'] }],
      lines: [
        { say: 'Step one. Glue the 4 vowels into one block. Now we have the block and the 5 consonants: m, n, t, n and s.', show: 'm.0' },
        { say: 'That is 6 items to arrange, and the letter n appears twice.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Arrange the 6 items',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6!}{2!} = \\dfrac{720}{2} = \\good{360}'] }],
      lines: [
        { say: 'Step two. 6 items can be arranged in 6 factorial, which is 720, ways. But swapping the two n\'s gives the same word, so divide by 2 factorial, which is 2. That gives 360.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: Inside the block',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4! = 24 \\text{ orders of o, u, a, i}', '360 \\times 24 = \\good{8640}'] }],
      lines: [
        { say: 'Step three. Inside the block, the 4 different vowels can be ordered in 4 factorial, which is 24, ways.', show: 'm.0' },
        { say: 'Every arrangement of the block goes with every order inside it, so multiply: 360 times 24 is 8,640 arrangements.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{bead: } 3! \\times 2! = 12', '\\good{\\text{ea}}\\text{bd}, \\ \\good{\\text{ea}}\\text{db}, \\ \\text{b}\\good{\\text{ea}}\\text{d}, \\ \\text{d}\\good{\\text{ea}}\\text{b}, \\ \\text{bd}\\good{\\text{ea}}, \\ \\text{db}\\good{\\text{ea}}', '\\good{\\text{ae}}\\text{bd}, \\ \\good{\\text{ae}}\\text{db}, \\ \\text{b}\\good{\\text{ae}}\\text{d}, \\ \\text{d}\\good{\\text{ae}}\\text{b}, \\ \\text{bd}\\good{\\text{ae}}, \\ \\text{db}\\good{\\text{ae}} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the method on a word small enough to list: "bead", with its vowels e and "a" together. The block, b and d make 3 items, so 3 factorial, times 2 factorial for the vowels inside. That is 12.', show: 'm.0' },
        { say: 'Listing them with e first: 6 arrangements.', show: 'm.1' },
        { say: 'And with "a" first: 6 more. Exactly 12, so the method works.', show: 'm.2', focus: 'm.2' },
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
            ['$6! \\times 4! = 17{,}280$', 'the two n\'s are **identical**: divide by $2!$'],
            ['$\\dfrac{6!}{2!} = 360$', 'the vowels can be **ordered** inside the block'],
            ['$\\dfrac{9!}{2!} = 181{,}440$', 'that lets the vowels **split up**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Forgetting the repeated n counts every word twice, giving 17,280.' },
        { say: 'Stopping at 360 forgets that the vowels can be shuffled inside their block.' },
        { say: 'And 9 factorial over 2 factorial counts every arrangement, including ones where the vowels are split up.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In how many ways can the letters of the word "canoe" be arranged if the vowels must stay together?',
          choices: ['$120$', '$36$', '$6$', '$12$'],
          answer: 1,
          working: 'Block (a, o, e), c, n: $3!$ ways; vowels inside: $3!$. $\\ 6 \\times 6 = 36$.',
        },
      ],
      lines: [
        { say: 'Your turn. In how many ways can the letters of the word "canoe" be arranged if the vowels must stay together? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The vowel block, c and n make 3 items: 3 factorial, which is 6. The 3 vowels inside: 3 factorial, which is 6 again. 6 times 6 is 36: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Must stay together: glue into **one block**', 'Identical letters: divide by the **factorial** of each repeat', 'Multiply by the orders **inside** the block', 'Check on a small word you can list'] }],
      lines: [
        { say: 'Here is what to remember. Objects that must stay together are glued into one block.', show: 'sum.0' },
        { say: 'Identical letters: divide by the factorial of each repeat.', show: 'sum.1' },
        { say: 'Then multiply by the number of orders inside the block.', show: 'sum.2' },
        { say: 'And check the method on a small word you can list. For more on permutations with repetition and restrictions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
