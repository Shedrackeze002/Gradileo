import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 4.2 (adding, subtracting and multiplying radicals):
// (7 + √3)(9 − √3). The question is an exercise from OpenStax Intermediate Algebra 2e, word for word
// (section 8.4, Add, Subtract, and Multiply Radical Expressions, CC BY-NC-SA 4.0), with the set's
// instruction in front of it. The four products are 63, −7√3, 9√3 and −3, and collecting like
// terms gives 60 + 2√3, as in the book's answer.

const QUESTION = 'Multiply. (7 + √3)(9 − √3)';

const video: Explainer = {
  id: 'xq-m202-4-2',
  lessonId: '',
  exam: {
    lesson: 'm202-4-2',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 8.4, Add, Subtract, and Multiply Radical Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/8-4-add-subtract-and-multiply-radical-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Multiply (7 + √3)(9 − √3) (Adding, Subtracting and Multiplying Radicals)',
  thumbnailTitle: 'Multiply (7 + √3)(9 − √3)',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: multiply (7 + √3)(9 − √3). We multiply every term in the first bracket by every term in the second, using √3 × √3 = 3, then collect the whole numbers and the like radicals to get 60 + 2√3. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Multiply the Radicals', subtitle: 'Adding, subtracting and multiplying radicals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying radicals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Multiply. $(7 + \\sqrt{3})(9 - \\sqrt{3})$',
          answer: '$60 + 2\\sqrt{3}$',
          working: '$63 - 7\\sqrt{3} + 9\\sqrt{3} - 3 = 60 + 2\\sqrt{3}$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Multiply: 7 plus root 3, times 9 minus root 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Multiply two **brackets**, each with a whole number and a radical. Then write the answer as simply as possible.' }],
      lines: [{ say: 'We need to multiply two brackets. Each bracket has a whole number and a radical in it. Then we write the answer as simply as we can.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dist', tone: 'key', title: 'Multiplying brackets', md: 'Multiply **every** term in the first bracket by **every** term in the second: $4$ products in all.' },
        { kind: 'callout', id: 'sq', tone: 'definition', title: 'A root times itself', md: '$\\sqrt{3} \\times \\sqrt{3} = 3$, because that is what a square root means.' },
        { kind: 'callout', id: 'like', tone: 'tip', title: 'Like radicals', md: 'Only like radicals combine: $9\\sqrt{3} - 7\\sqrt{3} = 2\\sqrt{3}$, just like $9x - 7x = 2x$.' },
      ],
      lines: [
        { say: 'Here is what we need. To multiply two brackets, multiply every term in the first by every term in the second. With two terms in each, that is four products.', show: 'dist' },
        { say: 'Root 3 times root 3 is just 3. That is what square root means: the number that, times itself, gives 3.', show: 'sq' },
        { say: 'And like radicals combine just like like terms. 9 root 3 minus 7 root 3 is 2 root 3, the same way 9 x minus 7 x is 2 x.', show: 'like' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **4 products**', 'Simplify $\\sqrt{3} \\times \\sqrt{3}$', '**Collect** like terms'] }],
      lines: [
        { say: 'Here is the plan. First, find the four products.', show: 'plan.0' },
        { say: 'Second, simplify root 3 times root 3.', show: 'plan.1' },
        { say: 'Third, collect the whole numbers together and the radicals together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The four products',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7 \\times 9 = 63', '7 \\times (-\\sqrt{3}) = -7\\sqrt{3}', '\\sqrt{3} \\times 9 = 9\\sqrt{3}', '\\sqrt{3} \\times (-\\sqrt{3}) = -\\sqrt{3} \\times \\sqrt{3}'] }],
      lines: [
        { say: 'Step one. Multiply each term of the first bracket by each term of the second. First, 7 times 9 is 63.', show: 'm.0' },
        { say: '7 times negative root 3 is negative 7 root 3.', show: 'm.1' },
        { say: 'Root 3 times 9 is 9 root 3.', show: 'm.2' },
        { say: 'And root 3 times negative root 3 is negative root 3 times root 3. That is all four products.', show: 'm.3' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Simplify and collect',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['63 - 7\\sqrt{3} + 9\\sqrt{3} - \\sqrt{3} \\times \\sqrt{3}', '= 63 - 7\\sqrt{3} + 9\\sqrt{3} - 3', '= (63 - 3) + (9 - 7)\\sqrt{3}', '= \\good{60 + 2\\sqrt{3}}'] }],
      lines: [
        { say: 'Here are the four products, added together.', show: 'm.0' },
        { say: 'Step two. Root 3 times root 3 is 3, so the last product is negative 3.', show: 'm.1' },
        { say: 'Step three. Collect the whole numbers: 63 minus 3 is 60. Collect the like radicals: 9 root 3 minus 7 root 3 is 2 root 3.', show: 'm.2' },
        { say: 'So the answer is 60 plus 2 root 3. These two terms are not alike, so this is as simple as it gets.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{3} \\approx 1.732', '(8.732)(7.268) \\approx 63.46', '60 + 2(1.732) \\approx 63.46 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. Root 3 is about 1.732.', show: 'm.0' },
        { say: 'So the first bracket is about 8.732 and the second is about 7.268. Their product is about 63.46.', show: 'm.1' },
        { say: 'And 60 plus 2 times 1.732 is also about 63.46. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$63 - 3 = 60$', 'only **2** products: the middle terms are missing'],
            ['$\\sqrt{3} \\times \\sqrt{3} = 9$', 'a root times itself is the number **under** it: $3$'],
            ['$60 + 2\\sqrt{3} = 62\\sqrt{3}$', '$60$ and $2\\sqrt{3}$ are **not** like terms'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not multiply only the first terms and the last terms. There are four products, and the two middle ones give the radical part.' },
        { say: 'Root 3 times root 3 is 3, not 9.' },
        { say: 'And 60 plus 2 root 3 cannot be squashed into 62 root 3. A whole number and a radical are not like terms.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Multiply. $(5 + \\sqrt{2})(3 - \\sqrt{2})$',
          choices: ['$13 - 2\\sqrt{2}$', '$17 - 2\\sqrt{2}$', '$13 + 8\\sqrt{2}$', '$15 - 2\\sqrt{2}$'],
          answer: 0,
          working: '$15 - 5\\sqrt{2} + 3\\sqrt{2} - 2 = 13 - 2\\sqrt{2}$',
        },
      ],
      lines: [
        { say: 'Your turn. Multiply 5 plus root 2, times 3 minus root 2. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The four products are 15, negative 5 root 2, 3 root 2, and negative 2. Collect them: 15 minus 2 is 13, and negative 5 root 2 plus 3 root 2 is negative 2 root 2. So the answer is 13 minus 2 root 2: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply **every** term by **every** term', '$\\sqrt{a} \\times \\sqrt{a} = a$', 'Collect whole numbers and **like** radicals', 'A number and a radical do **not** combine'] }],
      lines: [
        { say: 'Here is what to remember. Multiply every term in one bracket by every term in the other.', show: 'sum.0' },
        { say: 'A square root times itself is the number under the root.', show: 'sum.1' },
        { say: 'Collect the whole numbers together, and the like radicals together.', show: 'sum.2' },
        { say: 'And a whole number and a radical do not combine. For more on adding, subtracting and multiplying radicals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
