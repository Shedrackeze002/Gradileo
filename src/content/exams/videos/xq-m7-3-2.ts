import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 3.2 (adding and subtracting mixed numbers). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 4.6, Add and Subtract Mixed Numbers,
// CC BY-NC-SA 4.0). 2 3/8 + 1 1/8: wholes 2 + 1 = 3, fractions 3/8 + 1/8 = 4/8 = 1/2, so 3 1/2 yards.

const QUESTION =
  'Sewing Renata is sewing matching shirts for her husband and son. According to the patterns she will use, she needs 2 3/8 yards of fabric for her husband’s shirt and 1 1/8 yards of fabric for her son’s shirt. How much fabric does she need to make both shirts?';

const video: Explainer = {
  id: 'xq-m7-3-2',
  lessonId: '',
  exam: {
    lesson: 'm7-3-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.6, Add and Subtract Mixed Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-6-add-and-subtract-mixed-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Fabric for Two Shirts (Adding and Subtracting Mixed Numbers)',
  thumbnailTitle: 'Fabric for Two Shirts',
  summary:
    'A real test question, solved one small step at a time: Renata needs 2 3/8 yards of fabric for one shirt and 1 1/8 yards for another. How much fabric does she need for both? Add the whole numbers, 2 + 1 = 3, then add the fractions, 3/8 + 1/8 = 4/8, which simplifies to 1/2. She needs 3 1/2 yards. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fabric for Two Shirts', subtitle: 'Adding and subtracting mixed numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding mixed numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Sewing** Renata is sewing matching shirts for her husband and son. According to the patterns she will use, she needs $2\\dfrac{3}{8}$ yards of fabric for her husband’s shirt and $1\\dfrac{1}{8}$ yards of fabric for her son’s shirt. How much fabric does she need to make both shirts?',
          answer: '$3\\dfrac{1}{2}$ yards',
          working: '2 3/8 + 1 1/8 = 3 4/8 = 3 1/2',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Renata is sewing matching shirts for her husband and son. According to the patterns she will use, she needs 2 and 3 eighths yards of fabric for her husband\'s shirt, and 1 and 1 eighth yards for her son\'s shirt. How much fabric does she need to make both shirts?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Mixed numbers', md: 'A **mixed number** like $2\\dfrac{3}{8}$ is a whole number and a fraction together: $2$ whole yards **and** $\\dfrac{3}{8}$ of a yard. She needs fabric for **both** shirts, so we **add**.' }],
      lines: [
        { say: 'A mixed number like 2 and 3 eighths is a whole number and a fraction together: 2 whole yards, and 3 eighths of another yard.', show: 'c' },
        { say: 'Renata needs fabric for both shirts, so we add the two amounts.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Adding mixed numbers', md: 'Add the **whole numbers**, then add the **fractions**. With the same denominator, add the **tops** and keep the bottom. Then **simplify** the fraction.' }],
      lines: [
        { say: 'Here is what we need. To add mixed numbers, add the whole numbers, and then add the fractions.', show: 'c' },
        { say: 'When the fractions have the same denominator, add the tops and keep the bottom. Then simplify.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the **whole numbers**', 'Add the **fractions**', '**Simplify** and give the unit'] }],
      lines: [
        { say: 'Here is the plan. Add the whole numbers.', show: 'plan.0' },
        { say: 'Add the fractions.', show: 'plan.1' },
        { say: 'Then simplify, and give the answer in yards.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Wholes, then fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 + 1 = \\adj{3}', '\\dfrac{3}{8} + \\dfrac{1}{8} = \\opp{\\dfrac{4}{8}} = \\dfrac{1}{2}', '\\adj{3} + \\dfrac{1}{2} = \\good{3\\dfrac{1}{2} \\text{ yards}}'] }],
      lines: [
        { say: 'Step one. Add the whole numbers: 2 plus 1 is 3.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Add the fractions. They are both eighths, so add the tops: 3 plus 1 is 4. That makes 4 eighths. 4 and 8 can both be divided by 4, so 4 eighths is 1 half.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Put them together: 3 and 1 half. Renata needs 3 and a half yards of fabric.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{3}{8} = 2.375, \\quad 1\\dfrac{1}{8} = 1.125', '2.375 + 1.125 = 3.5 = 3\\dfrac{1}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. 1 eighth is 0.125, so 2 and 3 eighths is 2.375, and 1 and 1 eighth is 1.125.', show: 'm.0' },
        { say: '2.375 plus 1.125 is 3.5, which is 3 and a half. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$3\\dfrac{4}{16}$', 'added the **bottoms** too: eighths plus eighths are still eighths'],
            ['$1\\dfrac{1}{4}$', 'subtracted: **both** shirts means **add**'],
            ['$\\dfrac{1}{2}$ yard', 'added the fractions but **forgot the whole yards**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 and 4 sixteenths adds the bottoms as well as the tops. 3 eighths plus 1 eighth is 4 eighths, still eighths.' },
        { say: '1 and 1 quarter is the difference between the two amounts. She needs fabric for both shirts, so add.' },
        { say: 'And half a yard is only the fraction part. Remember the 3 whole yards.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A plank is $5\\dfrac{3}{4}$ feet long. Jo cuts off $2\\dfrac{1}{4}$ feet. How long is the piece that is left?',
          choices: ['$3\\dfrac{1}{2}$ feet', '$8$ feet', '$3\\dfrac{2}{8}$ feet', '$7\\dfrac{1}{2}$ feet'],
          answer: 0,
          working: 'Wholes: 5 − 2 = 3. Fractions: 3/4 − 1/4 = 2/4 = 1/2. So 3 1/2 feet.',
        },
      ],
      lines: [
        { say: 'Your turn. A plank is 5 and 3 quarters feet long. Jo cuts off 2 and 1 quarter feet. How long is the piece that is left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Subtract the wholes: 5 minus 2 is 3. Subtract the fractions: 3 quarters minus 1 quarter is 2 quarters, which is 1 half. So 3 and a half feet. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add the **whole numbers**', 'Add the **fractions**: tops only', '**Simplify** the fraction', 'Check with **decimals**'] }],
      lines: [
        { say: 'Here is what to remember. Add the whole numbers.', show: 'sum.0' },
        { say: 'Add the fractions: add the tops, and keep the bottom.', show: 'sum.1' },
        { say: 'Simplify the fraction.', show: 'sum.2' },
        { say: 'And check with decimals. For more on adding and subtracting mixed numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
