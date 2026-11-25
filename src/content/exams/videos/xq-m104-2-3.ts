import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 2.3 (adding and subtracting fractions). The question is an
// Everyday Math exercise from OpenStax Prealgebra 2e, word for word, with the book's missing full
// stop (section 4.5, Add and Subtract Fractions with Different Denominators, CC BY-NC-SA 4.0).
// 1 1/4 + 1 1/8 = 1 2/8 + 1 1/8 = 2 3/8 cups, as in the book. Check: 1.25 + 1.125 = 2.375 = 2 3/8.

const QUESTION =
  'Baking Vanessa is baking chocolate chip cookies and oatmeal cookies. She needs 1 1/4 cups of sugar for the chocolate chip cookies, and 1 1/8 cups for the oatmeal cookies How much sugar does she need altogether?';

const video: Explainer = {
  id: 'xq-m104-2-3',
  lessonId: '',
  exam: {
    lesson: 'm104-2-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.5, Add and Subtract Fractions with Different Denominators',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-5-add-and-subtract-fractions-with-different-denominators',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Sugar Altogether? (Adding Fractions)',
  thumbnailTitle: 'How Much Sugar Altogether?',
  summary:
    'A real test question, solved one small step at a time: Vanessa needs 1 1/4 cups of sugar for chocolate chip cookies and 1 1/8 cups for oatmeal cookies. How much sugar does she need altogether? We write 1/4 as 2/8 so both fractions are eighths, add the whole cups and the eighths, and get 2 3/8 cups. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Sugar Altogether?', subtitle: 'Adding fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Baking** Vanessa is baking chocolate chip cookies and oatmeal cookies. She needs $1\\tfrac{1}{4}$ cups of sugar for the chocolate chip cookies, and $1\\tfrac{1}{8}$ cups for the oatmeal cookies How much sugar does she need altogether?',
          answer: '$2\\tfrac{3}{8}$ cups',
          working: '$1\\tfrac{2}{8} + 1\\tfrac{1}{8} = 2\\tfrac{3}{8}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Vanessa is baking chocolate chip cookies and oatmeal cookies. She needs 1 and one quarter cups of sugar for the chocolate chip cookies, and 1 and one eighth cups for the oatmeal cookies. How much sugar does she need altogether?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['1\\tfrac{1}{4} + 1\\tfrac{1}{8} = \\ ?'] },
        { kind: 'text', id: 't', size: 'md', md: '"Altogether" means **add**. But quarters and eighths are **different sized** pieces.' },
      ],
      lines: [
        { say: 'Altogether means we add the two amounts: 1 and one quarter, plus 1 and one eighth.', show: 'm' },
        { say: 'But a quarter and an eighth are different sized pieces of a cup. We cannot add them until they are the same size.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{1}{4} = \\dfrac{1 \\times 2}{4 \\times 2} = \\dfrac{2}{8}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same denominator, then add the tops', md: 'Change the fractions to the **same denominator**. Then add the **numerators** and keep the denominator. Add the **whole numbers** separately.' },
      ],
      lines: [
        { say: 'Here is what we need. One quarter is the same as two eighths: multiply the top and bottom by 2.', show: 'f' },
        { say: 'Once the fractions have the same denominator, add the tops and keep the bottom. And add the whole numbers on their own.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $\\tfrac{1}{4}$ in **eighths**', 'Add the **whole** cups', 'Add the **eighths**'] }],
      lines: [
        { say: 'Here is the plan. Write one quarter in eighths.', show: 'plan.0' },
        { say: 'Add the whole cups.', show: 'plan.1' },
        { say: 'Then add the eighths.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Same denominator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\tfrac{1}{4} = 1\\tfrac{2}{8}'] }],
      lines: [
        { say: 'Step one. 8 is a multiple of 4, so eighths will work. One quarter is two eighths, so 1 and one quarter is 1 and two eighths.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Whole cups',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\tfrac{2}{8} + 1\\tfrac{1}{8}', '1 + 1 = 2 \\text{ cups}'] }],
      lines: [
        { say: 'Step two. Now the sum is 1 and two eighths, plus 1 and one eighth.', show: 'm.0' },
        { say: 'Add the whole cups first: 1 plus 1 is 2 cups.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Eighths',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{2}{8} + \\tfrac{1}{8} = \\tfrac{3}{8}', '2 + \\tfrac{3}{8} = \\good{2\\tfrac{3}{8} \\text{ cups}}'] }],
      lines: [
        { say: 'Step three. Add the eighths. Two eighths plus one eighth is three eighths. Keep the 8 on the bottom.', show: 'm.0' },
        { say: 'Put it together: Vanessa needs 2 and three eighths cups of sugar altogether.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.25 + 1.125 = 2.375', '2\\tfrac{3}{8} = 2 + 0.375 = 2.375 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. 1 and one quarter is 1.25, and 1 and one eighth is 1.125. Together that is 2.375.', show: 'm.0' },
        { say: 'And three eighths is 0.375, so 2 and three eighths is 2.375 too. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{1}{4} + \\dfrac{1}{8} = \\dfrac{2}{12}$', 'never add the **bottoms**: make them the same'],
            ['$\\dfrac{1}{4} + \\dfrac{1}{8} = \\dfrac{2}{8}$', 'changed the bottom but not the **top** of $\\dfrac{1}{4}$'],
            ['$\\dfrac{3}{8}$ cup', 'forgot the **whole** cups: $1 + 1 = 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding the bottoms, 4 plus 8, gives twelfths. That is not how fractions add. Make the bottoms the same, then add only the tops.' },
        { say: 'When one quarter becomes eighths, the top changes too. One quarter is two eighths, not one eighth.' },
        { say: 'And do not forget the whole cups. Three eighths of a cup is far too little.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A baker uses $2\\tfrac{1}{2}$ cups of flour for bread and $1\\tfrac{1}{3}$ cups for muffins. How much flour is that altogether?',
          choices: ['$3\\dfrac{2}{5}$ cups', '$3\\dfrac{5}{6}$ cups', '$3\\dfrac{1}{6}$ cups', '$4\\dfrac{1}{6}$ cups'],
          answer: 1,
          working: '$2\\dfrac{3}{6} + 1\\dfrac{2}{6} = 3\\dfrac{5}{6}$ cups.',
        },
      ],
      lines: [
        { say: 'Your turn. A baker uses 2 and a half cups of flour for bread and 1 and a third cups for muffins. How much flour is that altogether? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Halves and thirds both go into sixths. One half is three sixths, and one third is two sixths. The wholes give 3, and the sixths give five sixths. That is 3 and five sixths cups. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['"Altogether" means **add**', 'Make the denominators the **same** first', 'Add the **tops**, keep the bottom', 'Add the **whole numbers** too'] }],
      lines: [
        { say: 'Here is what to remember. Altogether means add.', show: 'sum.0' },
        { say: 'Make the denominators the same first.', show: 'sum.1' },
        { say: 'Then add the tops, and keep the bottom.', show: 'sum.2' },
        { say: 'And add the whole numbers too. For more on adding and subtracting fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
