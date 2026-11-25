import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 3.2 (powers). The question is a Try It from OpenStax Prealgebra
// 2e, word for word (section 2.1, Use the Language of Algebra, CC BY-NC-SA 4.0). 5³ = 5 · 5 · 5 =
// 125 and 1⁷ = 1 multiplied seven times = 1, as in the book's answer.

const QUESTION = 'Simplify: (a) 5³ (b) 1⁷';

const video: Explainer = {
  id: 'xq-m6-3-2',
  lessonId: '',
  exam: {
    lesson: 'm6-3-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.1, Use the Language of Algebra',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify 5 Cubed and 1 to the Seventh (Powers)',
  thumbnailTitle: 'Is 5³ Equal to 15?',
  summary:
    'A real test question, solved one small step at a time: simplify 5³ and 1⁷. A power means repeated multiplication: the exponent says how many times the base is used as a factor. So 5³ = 5 · 5 · 5 = 125, and 1⁷ = 1, because 1 times 1 is always 1. Then we check and look at the traps, like 5³ = 15.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is 5³ Equal to 15?', subtitle: 'Powers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about powers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify: (a) $5^3$ (b) $1^7$',
          answer: '(a) $125$ (b) $1$',
          working: '5 · 5 · 5 = 125; 1 · 1 · 1 · 1 · 1 · 1 · 1 = 1',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: part a, 5 to the power 3, and part b, 1 to the power 7.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Base and exponent', md: 'In $5^3$, the big $5$ is the **base** and the small raised $3$ is the **exponent**. **Simplify** means write it as **one number**.' }],
      lines: [
        { say: 'In 5 to the power 3, the big number 5 is the base, and the small raised number 3 is the exponent.', show: 'c' },
        { say: 'Simplify means work out its value, and write it as one number.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'A power is repeated multiplication', md: 'The **exponent** says how many times the **base** is used as a **factor**: $5^3 = 5 \\cdot 5 \\cdot 5$. It does **not** mean $5 \\times 3$.' }],
      lines: [
        { say: 'Here is what we need. The exponent tells us how many times the base is used as a factor.', show: 'c' },
        { say: 'So 5 to the power 3 is 5 times 5 times 5. It does not mean 5 times 3.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the power as a **product**', 'Multiply **two** numbers at a time', 'Do the same for part (b)'] }],
      lines: [
        { say: 'Here is the plan. Write the power as a product.', show: 'plan.0' },
        { say: 'Multiply two numbers at a time.', show: 'plan.1' },
        { say: 'Then do the same for part b.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps: Parts (a) and (b)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5^3 = 5 \\cdot 5 \\cdot 5', '= 25 \\cdot 5 = \\good{125}', '1^7 = 1 \\cdot 1 \\cdot 1 \\cdot 1 \\cdot 1 \\cdot 1 \\cdot 1 = \\good{1}'] }],
      lines: [
        { say: 'Part a. The exponent is 3, so we use 5 as a factor three times: 5 times 5 times 5.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply two at a time. 5 times 5 is 25, and 25 times 5 is 125. So 5 cubed is 125.', show: 'm.1', focus: 'm.1' },
        { say: 'Part b. The exponent is 7, so we use 1 as a factor seven times. 1 times 1 is always 1, however many times we do it. So 1 to the seventh is 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['125 \\div 5 = 25, \\quad 25 \\div 5 = 5, \\quad 5 \\div 5 = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part a by dividing by 5 three times. 125 divided by 5 is 25, then 5, then 1. Three 5s, just as the exponent says. It checks out.', show: 'm', focus: 'm' },
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
            ['(a) $15$', 'multiplied $5 \\times 3$: use $5$ as a factor **three times**'],
            ['(a) $8$', '**added** $5 + 3$'],
            ['(b) $7$', '$1 \\times 7$: but $1 \\cdot 1 \\cdot \\dots \\cdot 1$ is always $1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '15 multiplies the base by the exponent. The exponent says how many times 5 is a factor, so it is 5 times 5 times 5.' },
        { say: '8 adds the base and the exponent. That is not what a power means.' },
        { say: 'And 7 for part b multiplies 1 by 7. But 1 times itself, any number of times, is still 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the value of $2^4$?',
          choices: ['$8$', '$6$', '$16$', '$24$'],
          answer: 2,
          working: '2 · 2 · 2 · 2 = 4 · 2 · 2 = 8 · 2 = 16.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the value of 2 to the power 4? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '2 times 2 times 2 times 2: 4, then 8, then 16. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The **exponent** counts the factors', 'Write the power as a **product**', 'Multiply **two** at a time', '$1$ to **any** power is $1$'] }],
      lines: [
        { say: 'Here is what to remember. The exponent counts how many times the base is a factor.', show: 'sum.0' },
        { say: 'Write the power as a product.', show: 'sum.1' },
        { say: 'Multiply two numbers at a time.', show: 'sum.2' },
        { say: 'And 1 to any power is 1. For more on powers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
