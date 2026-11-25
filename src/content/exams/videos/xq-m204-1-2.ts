import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 1.2 (fractions and mixed numbers). The question is an Exercise
// from OpenStax Prealgebra 2e, word for word (section 4.6, Add and Subtract Mixed Numbers, CC
// BY-NC-SA 4.0). 3 1/4 − 2 2/3 = 3 3/12 − 2 8/12 = 2 15/12 − 2 8/12 = 7/12 yard, as in the book's
// answer. Check: 2 8/12 + 7/12 = 2 15/12 = 3 3/12 = 3 1/4.

const QUESTION =
  'Sewing Pauline has 3 1/4 yards of fabric to make a jacket. The jacket uses 2 2/3 yards. How much fabric will she have left after making the jacket?';

const video: Explainer = {
  id: 'xq-m204-1-2',
  lessonId: '',
  exam: {
    lesson: 'm204-1-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.6, Add and Subtract Mixed Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-6-add-and-subtract-mixed-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Fabric Left Over From a Jacket (Fractions and Mixed Numbers)',
  thumbnailTitle: 'How Much Fabric Is Left?',
  summary:
    'A real test question, solved one small step at a time: Pauline has 3 1/4 yards of fabric, and her jacket uses 2 2/3 yards. How much is left? We write both in twelfths, borrow 1 from the 3, and subtract: 3 1/4 − 2 2/3 = 2 15/12 − 2 8/12 = 7/12 of a yard. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Fabric Is Left?', subtitle: 'Mixed numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about subtracting mixed numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Sewing** Pauline has $3\\frac{1}{4}$ yards of fabric to make a jacket. The jacket uses $2\\frac{2}{3}$ yards. How much fabric will she have left after making the jacket?',
          answer: '$\\frac{7}{12}$ of a yard',
          working: '3 3/12 − 2 8/12 = 2 15/12 − 2 8/12 = 7/12',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Pauline has 3 and a quarter yards of fabric to make a jacket. The jacket uses 2 and two thirds yards. How much fabric will she have left after making the jacket?', caption: 'Pauline has 3 1/4 yards of fabric to make a jacket. The jacket uses 2 2/3 yards. How much fabric will she have left after making the jacket?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3\\tfrac{1}{4} - 2\\tfrac{2}{3}'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Mixed number', md: 'A **mixed number** is a whole number and a fraction together: $3\\frac{1}{4}$ means $3$ whole yards and $\\frac{1}{4}$ of another.' },
      ],
      lines: [
        { say: '"Left after" means we take away what the jacket uses. So we work out 3 and a quarter, minus 2 and two thirds.', caption: '“Left after” means we take away what the jacket uses. So we work out 3 1/4 − 2 2/3.', show: 'm' },
        { say: 'Both are mixed numbers: a whole number and a fraction together. 3 and a quarter means 3 whole yards, and a quarter of another.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c1', tone: 'key', title: 'A common denominator', md: 'To subtract fractions, they need the **same denominator**. For quarters and thirds, use **twelfths**: $4 \\times 3 = 12$.' },
        { kind: 'callout', id: 'c2', tone: 'key', title: 'Borrowing', md: 'If the fraction on top is **smaller**, borrow $1$ whole from the whole number: $1 = \\frac{12}{12}$.' },
      ],
      lines: [
        { say: 'Here is what we need. To subtract fractions, they need the same denominator. For quarters and thirds, twelfths work, because 4 times 3 is 12.', show: 'c1' },
        { say: 'And if the first fraction is smaller than the one we take away, we borrow 1 whole from the whole number. One whole is twelve twelfths.', show: 'c2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write both fractions in **twelfths**', '**Borrow** a whole if needed', 'Subtract the **wholes** and the **fractions**'] }],
      lines: [
        { say: 'Here is the plan. Write both fractions in twelfths.', show: 'plan.0' },
        { say: 'Borrow a whole if we need to.', show: 'plan.1' },
        { say: 'Then subtract the whole numbers and the fractions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Twelfths',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{4} = \\tfrac{3}{12} \\qquad \\tfrac{2}{3} = \\tfrac{8}{12}', '3\\tfrac{3}{12} - 2\\tfrac{8}{12}'] }],
      lines: [
        { say: 'Step one. A quarter is three twelfths, because we multiply the top and bottom by 3. Two thirds is eight twelfths, because we multiply the top and bottom by 4.', show: 'm.0' },
        { say: 'So the subtraction is 3 and three twelfths, minus 2 and eight twelfths.', caption: 'So the subtraction is 3 3/12 − 2 8/12.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Borrow and subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3\\tfrac{3}{12} = 2 + \\tfrac{12}{12} + \\tfrac{3}{12} = 2\\tfrac{15}{12}', '2\\tfrac{15}{12} - 2\\tfrac{8}{12} = \\good{\\tfrac{7}{12}}'] }],
      lines: [
        { say: 'Step two. Three twelfths is smaller than eight twelfths, so we borrow 1 whole from the 3. That leaves 2, and the whole becomes twelve twelfths. Twelve twelfths plus three twelfths is fifteen twelfths.', caption: 'Step two. 3/12 is smaller than 8/12, so we borrow 1 whole from the 3. That leaves 2, and the whole becomes 12/12. 12/12 + 3/12 = 15/12.', show: 'm.0' },
        { say: 'Step three. 2 minus 2 is 0 wholes. Fifteen twelfths minus eight twelfths is seven twelfths.', caption: 'Step three. 2 − 2 = 0 wholes. 15/12 − 8/12 = 7/12.', show: 'm.1', focus: 'm.1' },
        { say: 'Pauline will have seven twelfths of a yard of fabric left, a little more than half a yard.', caption: 'Pauline will have 7/12 of a yard of fabric left, a little more than half a yard.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\tfrac{8}{12} + \\tfrac{7}{12} = 2\\tfrac{15}{12}', '= 3\\tfrac{3}{12} = 3\\tfrac{1}{4} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by adding back. What the jacket used, plus what is left, should be what she started with. 2 and eight twelfths, plus seven twelfths, is 2 and fifteen twelfths.', caption: 'Let us check by adding back. 2 8/12 + 7/12 = 2 15/12.', show: 'm.0' },
        { say: 'Fifteen twelfths is 1 and three twelfths, so that is 3 and three twelfths, which is 3 and a quarter. It checks out.', caption: '15/12 is 1 3/12, so that is 3 3/12, which is 3 1/4. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$1\\frac{5}{12}$ yards', 'took $\\frac{3}{12}$ from $\\frac{8}{12}$, **the wrong way round**: borrow instead'],
            ['$5\\frac{11}{12}$ yards', '**added**: "left after" means **subtract**'],
            ['$7$ yards', 'dropped the **denominator**: it is $\\frac{7}{12}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 and five twelfths takes three twelfths from eight twelfths, the wrong way round. When the top fraction is smaller, borrow a whole.', caption: '1 5/12 takes 3/12 from 8/12, the wrong way round. When the top fraction is smaller, borrow a whole.' },
        { say: '5 and eleven twelfths adds the two amounts. Fabric left after making a jacket means subtract.', caption: '5 11/12 adds the two amounts. Fabric left after making a jacket means subtract.' },
        { say: 'And 7 yards drops the denominator. The answer is seven twelfths of a yard, less than one yard.', caption: 'And 7 yards drops the denominator. The answer is 7/12 of a yard, less than one yard.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A board is $5\\frac{1}{2}$ feet long. A piece $2\\frac{3}{4}$ feet long is cut off. How long is the piece that is left?',
          choices: ['$3\\frac{1}{4}$ ft', '$2\\frac{1}{4}$ ft', '$8\\frac{1}{4}$ ft', '$2\\frac{3}{4}$ ft'],
          answer: 3,
          working: '$5\\frac{2}{4} - 2\\frac{3}{4} = 4\\frac{6}{4} - 2\\frac{3}{4} = 2\\frac{3}{4}$',
        },
      ],
      lines: [
        { say: 'Your turn. A board is 5 and a half feet long. A piece 2 and three quarters feet long is cut off. How long is the piece that is left? Pause the video and try it.', caption: 'Your turn. A board is 5 1/2 feet long. A piece 2 3/4 feet long is cut off. How long is the piece that is left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '5 and a half is 5 and two quarters. Borrow a whole: 4 and six quarters. Minus 2 and three quarters is 2 and three quarters feet. Choice "D".', caption: '5 1/2 = 5 2/4. Borrow a whole: 4 6/4. 4 6/4 − 2 3/4 = 2 3/4 feet. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use a **common denominator**', '**Borrow** a whole when the fraction is too small', 'Subtract wholes and fractions', '**Check** by adding back'] }],
      lines: [
        { say: 'Here is what to remember. Write the fractions with a common denominator.', show: 'sum.0' },
        { say: 'Borrow a whole when the top fraction is too small.', show: 'sum.1' },
        { say: 'Subtract the wholes and the fractions.', show: 'sum.2' },
        { say: 'And check by adding back. For more on fractions and mixed numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
