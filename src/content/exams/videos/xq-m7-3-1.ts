import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 3.1 (adding and subtracting fractions). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 4.5, Add and Subtract Fractions with
// Different Denominators, CC BY-NC-SA 4.0). LCD of 12 and 15 is 60: 35/60 + 44/60 = 79/60.

const QUESTION = 'Add: 7/12 + 11/15.';

const video: Explainer = {
  id: 'xq-m7-3-1',
  lessonId: '',
  exam: {
    lesson: 'm7-3-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 4.5, Add and Subtract Fractions with Different Denominators',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-5-add-and-subtract-fractions-with-different-denominators',
    question: QUESTION,
  },
  title: 'Exam Question: Add 7/12 + 11/15 (Adding and Subtracting Fractions)',
  thumbnailTitle: 'Add 7/12 + 11/15',
  summary:
    'A real test question, solved one small step at a time: add 7/12 + 11/15. The denominators are different, so find the least common denominator: 12 = 2 × 2 × 3 and 15 = 3 × 5, so the LCD is 60. Then 7/12 = 35/60 and 11/15 = 44/60, and 35/60 + 44/60 = 79/60, which is 1 and 19/60. Then we check with an estimate and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Add 7/12 + 11/15', subtitle: 'Adding and subtracting fractions, step by step' }],
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
          prompt: 'Add: $\\dfrac{7}{12} + \\dfrac{11}{15}$.',
          answer: '$\\dfrac{79}{60}$',
          working: '7/12 + 11/15 = 35/60 + 44/60 = 79/60',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Add 7 twelfths and 11 fifteenths.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Different sized pieces', md: 'Twelfths and fifteenths are **different sized pieces**, so we cannot just count them together. First we cut both into pieces of the **same size**: a **common denominator**.' }],
      lines: [
        { say: 'Twelfths and fifteenths are different sized pieces, so we cannot just count them together.', show: 'c' },
        { say: 'First we must cut both fractions into pieces of the same size. That is called a common denominator.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'The least common denominator', md: 'The **least common denominator** (LCD) is the smallest number that **both** denominators go into. Write each fraction with the LCD, by multiplying its **top and bottom** by the same number. Then **add the tops** and keep the bottom.' }],
      lines: [
        { say: 'Here is what we need. The least common denominator is the smallest number that both denominators go into.', show: 'c' },
        { say: 'Rewrite each fraction with that denominator, by multiplying its top and bottom by the same number. Then add the tops, and keep the bottom the same.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **LCD** of $12$ and $15$', 'Rewrite **both** fractions with the LCD', '**Add the tops**, then simplify if you can'] }],
      lines: [
        { say: 'Here is the plan. Find the least common denominator of 12 and 15.', show: 'plan.0' },
        { say: 'Rewrite both fractions with it.', show: 'plan.1' },
        { say: 'Then add the tops, and simplify if you can.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Common denominator, then add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 = 2 \\times 2 \\times 3, \\quad 15 = 3 \\times 5', '\\text{LCD} = 2 \\times 2 \\times 3 \\times 5 = \\adj{60}', '\\dfrac{7 \\times 5}{12 \\times 5} + \\dfrac{11 \\times 4}{15 \\times 4} = \\dfrac{35}{60} + \\dfrac{44}{60}', '= \\good{\\dfrac{79}{60}} = 1\\tfrac{19}{60}'] }],
      lines: [
        { say: 'Step one. Break each denominator into prime factors. 12 is 2 times 2 times 3, and 15 is 3 times 5.', show: 'm.0', focus: 'm.0' },
        { say: 'The LCD needs every factor, with 3 only once because both share it: 2 times 2 times 3 times 5, which is 60.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. 12 times 5 is 60, so multiply the top and bottom of 7 twelfths by 5: 35 sixtieths. 15 times 4 is 60, so multiply 11 fifteenths by 4 on top and bottom: 44 sixtieths.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Add the tops: 35 plus 44 is 79. The answer is 79 sixtieths. 79 is a prime number, so it does not simplify. As a mixed number it is 1 and 19 sixtieths.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{12} \\approx 0.58, \\quad \\dfrac{11}{15} \\approx 0.73', '0.58 + 0.73 = 1.31 \\approx \\dfrac{79}{60} = 1.316\\ldots \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. 7 twelfths is about 0.58, and 11 fifteenths is about 0.73. Each is a bit more than a half.', show: 'm.0' },
        { say: 'Together they make about 1.31. And 79 sixtieths is 1.316, a little more than 1. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{18}{27}$', 'added the tops **and** the bottoms: only the tops are added'],
            ['$\\dfrac{18}{60}$', 'changed the bottoms but **not the tops**: multiply both'],
            ['$\\dfrac{46}{60}$', 'changed only **one** fraction: rewrite **both** with $60$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '18 twenty sevenths adds the tops and the bottoms. Only the tops are added, once the pieces are the same size. And it is less than 1, which cannot be right for two fractions that are each more than a half.' },
        { say: '18 sixtieths puts both fractions over 60 without changing the tops. Whatever you multiply the bottom by, multiply the top by too.' },
        { say: 'And 46 sixtieths changes 7 twelfths into 35 sixtieths but leaves 11 as it is. Rewrite both fractions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Add: $\\dfrac{1}{4} + \\dfrac{5}{6}$.',
          choices: ['$\\dfrac{6}{10}$', '$\\dfrac{6}{12}$', '$\\dfrac{8}{12}$', '$\\dfrac{13}{12}$'],
          answer: 3,
          working: 'LCD 12: 1/4 = 3/12 and 5/6 = 10/12, so 3/12 + 10/12 = 13/12.',
        },
      ],
      lines: [
        { say: 'Your turn. Add 1 quarter and 5 sixths. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The LCD of 4 and 6 is 12. 1 quarter is 3 twelfths, and 5 sixths is 10 twelfths. 3 plus 10 is 13, so the answer is 13 twelfths. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **LCD**', 'Multiply **top and bottom** by the same number', '**Add the tops**, keep the bottom', '**Simplify**, then estimate to check'] }],
      lines: [
        { say: 'Here is what to remember. Find the least common denominator.', show: 'sum.0' },
        { say: 'Rewrite each fraction, multiplying the top and the bottom by the same number.', show: 'sum.1' },
        { say: 'Add the tops, and keep the bottom.', show: 'sum.2' },
        { say: 'Then simplify, and estimate to check. For more on adding and subtracting fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
