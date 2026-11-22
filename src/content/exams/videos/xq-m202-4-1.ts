import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 4.1 (mixed and entire radicals): √800. The question is an
// exercise from OpenStax Intermediate Algebra 2e, word for word (section 8.2, Simplify Radical
// Expressions, CC BY-NC-SA 4.0), with the set's instruction in front of it. The largest perfect
// square factor of 800 is 400, so √800 = √400 · √2 = 20√2, as in the book's answer.

const QUESTION = 'Use the Product Property to simplify radical expressions. √800';

const video: Explainer = {
  id: 'xq-m202-4-1',
  lessonId: '',
  exam: {
    lesson: 'm202-4-1',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 8.2, Simplify Radical Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/8-2-simplify-radical-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify √800 (Mixed and Entire Radicals)',
  thumbnailTitle: 'Simplify √800',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: use the Product Property to simplify √800. We find the largest perfect square factor of 800, which is 400, and split the root: √800 = √400 × √2 = 20√2. Then we turn the mixed radical back into an entire radical to check, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simplify √800', subtitle: 'Mixed and entire radicals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about mixed and entire radicals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the Product Property to simplify radical expressions. $\\sqrt{800}$',
          answer: '$20\\sqrt{2}$',
          working: '$\\sqrt{800} = \\sqrt{400 \\times 2} = \\sqrt{400} \\times \\sqrt{2} = 20\\sqrt{2}$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the Product Property to simplify radical expressions. The expression is the square root of 800.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$\\sqrt{800}$ is an **entire radical**: the whole number is under the root. Simplify it to a **mixed radical**, like $a\\sqrt{b}$, with the smallest possible number left under the root.' }],
      lines: [
        { say: 'Root 800 is an entire radical, because the whole number sits under the root sign.', show: 't' },
        { say: 'To simplify it, we write it as a mixed radical: a whole number times a root, with the smallest possible number left under the root.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'prod', tone: 'key', title: 'The Product Property', md: '$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$, for $a, b \\ge 0$. For example, $\\sqrt{12} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$.' },
        { kind: 'callout', id: 'sq', tone: 'definition', title: 'Perfect squares', md: '$4, 9, 16, 25, 36, 49, 64, 81, 100, \\ldots, 400$: their roots are whole numbers.' },
      ],
      lines: [
        { say: 'Here is what we need. The Product Property says the root of a product is the product of the roots. For example, root 12 is root 4 times root 3, which is 2 root 3.', show: 'prod' },
        { say: 'And the perfect squares, 4, 9, 16, 25, and so on, have whole number roots. Those are the factors we can take out of the root.', show: 'sq' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **largest perfect square** factor of $800$', '**Split** the root with the Product Property', 'Take the **square root** of the perfect square'] }],
      lines: [
        { say: 'Here is the plan. First, find the largest perfect square that divides 800.', show: 'plan.0' },
        { say: 'Second, split the root into two roots with the Product Property.', show: 'plan.1' },
        { say: 'Third, take the square root of the perfect square.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The largest perfect square',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['800 = 4 \\times 200', '800 = 100 \\times 8', '800 = \\good{400} \\times 2'] },
      ],
      lines: [
        { say: 'Step one. Several perfect squares divide 800. 4 does: 800 is 4 times 200.', show: 'f.0' },
        { say: '100 does too: 800 is 100 times 8.', show: 'f.1' },
        { say: 'But the largest is 400, because 800 is 400 times 2, and 2 has no perfect square factor left. Using the largest one finishes the job in one go.', show: 'f.2', focus: 'f.2' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Split the root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{800} = \\sqrt{400 \\times 2}', '\\sqrt{800} = \\sqrt{400} \\times \\sqrt{2}', '\\sqrt{800} = \\good{20\\sqrt{2}}'] }],
      lines: [
        { say: 'Step two. Write 800 as 400 times 2, under the root.', show: 'm.0' },
        { say: 'By the Product Property, that is root 400 times root 2.', show: 'm.1' },
        { say: 'Step three. Take the root of the perfect square. Root 400 is 20, because 20 times 20 is 400. So root 800 is 20 root 2. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['20\\sqrt{2} = \\sqrt{20^2 \\times 2}', '20\\sqrt{2} = \\sqrt{400 \\times 2} = \\sqrt{800} \\ \\checkmark', '20 \\times 1.414 \\approx 28.28, \\quad 28.28^2 \\approx 800 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going backwards, from the mixed radical to the entire radical. Move the 20 under the root by squaring it.', show: 'm.0' },
        { say: '20 squared is 400, and 400 times 2 is 800. We are back to root 800.', show: 'm.1' },
        { say: 'And with decimals, root 2 is about 1.414, so 20 root 2 is about 28.28. 28.28 squared is about 800. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$10\\sqrt{8}$', 'not simplest: $8 = 4 \\times 2$ still has a **perfect square** factor'],
            ['$400\\sqrt{2}$', 'take the **root** of $400$, which is $20$'],
            ['$\\sqrt{800} = \\sqrt{8} \\times \\sqrt{100} = 8 \\times 10$', '$\\sqrt{8}$ is **not** $8$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 root 8 is equal to root 800, but it is not simplest form, because 8 still has the perfect square factor 4. Keep going: root 8 is 2 root 2, which gives 20 root 2.' },
        { say: '400 root 2 forgets to take the root. The number that comes out is root 400, which is 20.' },
        { say: 'And only perfect squares come out whole. Root 8 is not 8.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Write the mixed radical $3\\sqrt{5}$ as an entire radical.',
          choices: ['$\\sqrt{15}$', '$\\sqrt{8}$', '$\\sqrt{75}$', '$\\sqrt{45}$'],
          answer: 3,
          working: '$3 = \\sqrt{9}$, so $3\\sqrt{5} = \\sqrt{9 \\times 5} = \\sqrt{45}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the mixed radical 3 root 5 as an entire radical. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Move the 3 under the root by squaring it: 3 squared is 9, and 9 times 5 is 45. So 3 root 5 is root 45: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$', 'Use the **largest** perfect square factor', 'Entire to mixed: take the root **out**', 'Mixed to entire: **square** it and put it in'] }],
      lines: [
        { say: 'Here is what to remember. The root of a product is the product of the roots.', show: 'sum.0' },
        { say: 'Use the largest perfect square factor, so you finish in one step.', show: 'sum.1' },
        { say: 'To go from an entire radical to a mixed one, take the root of the perfect square out.', show: 'sum.2' },
        { say: 'And to go back, square the number and put it under the root. For more on mixed and entire radicals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
