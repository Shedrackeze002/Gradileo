import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 5.1 (working with radicals): 3√(80x) − 4√(45x). The question
// is a Try It from OpenStax College Algebra 2e, word for word (section 1.3, Radicals and Rational
// Exponents, CC BY-NC-SA 4.0), whose answer is 0: √80 = 4√5 and √45 = 3√5, so both terms are
// 12√(5x).

const QUESTION = 'Subtract 3√(80x) − 4√(45x).';

const video: Explainer = {
  id: 'xq-m201-5-1',
  lessonId: '',
  exam: {
    lesson: 'm201-5-1',
    source: 'OpenStax, College Algebra 2e, Try It in section 1.3, Radicals and Rational Exponents',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/1-3-radicals-and-rational-exponents',
    question: QUESTION,
  },
  title: 'Exam Question: Subtract 3√(80x) − 4√(45x) (Working With Radicals)',
  thumbnailTitle: 'Subtract 3√80x − 4√45x',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: subtract 3√(80x) − 4√(45x). The radicals look different, but in simplest form √80 = 4√5 and √45 = 3√5, so both terms are 12√(5x) and the answer is 0. Then we check with a number and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Subtract the Radicals', subtitle: 'Working with radicals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about working with radicals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Subtract $3\\sqrt{80x} - 4\\sqrt{45x}$.',
          answer: '$0$',
          working: '$3\\sqrt{80x} = 3 \\cdot 4\\sqrt{5x} = 12\\sqrt{5x}$ and $4\\sqrt{45x} = 4 \\cdot 3\\sqrt{5x} = 12\\sqrt{5x}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Subtract 3 root 80 x, minus 4 root 45 x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We can only subtract **like radicals**, with the same radicand. $80x$ and $45x$ are different, so first write each radical in **simplest form**.' }],
      lines: [{ say: 'Radicals can only be added or subtracted when they are like radicals, with the same number under the root. 80 x and 45 x are different, so we cannot subtract yet. First, we write each radical in simplest form.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sf', tone: 'definition', title: 'Simplest form', md: '$\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$. Take out the **largest perfect square** factor: $\\sqrt{80} = \\sqrt{16 \\cdot 5} = 4\\sqrt{5}$.' },
        { kind: 'callout', id: 'like', tone: 'key', title: 'Like radicals', md: 'Add or subtract the **coefficients** and keep the radical: $7\\sqrt{2} - 3\\sqrt{2} = 4\\sqrt{2}$.' },
      ],
      lines: [
        { say: 'Here is what we need. The root of a product is the product of the roots. So take out the largest perfect square factor: root 80 is root 16 times root 5, which is 4 root 5.', show: 'sf' },
        { say: 'And like radicals combine the same way as like terms: add or subtract the numbers in front, and keep the radical. 7 root 2 minus 3 root 2 is 4 root 2.', show: 'like' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Simplify $\\sqrt{80x}$', 'Simplify $\\sqrt{45x}$', 'Subtract the **like radicals**'] }],
      lines: [
        { say: 'Here is the plan. First, simplify root 80 x.', show: 'plan.0' },
        { say: 'Second, simplify root 45 x.', show: 'plan.1' },
        { say: 'Third, subtract the like radicals.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Simplify √80x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['80 = 16 \\times 5', '\\sqrt{80x} = \\sqrt{16}\\sqrt{5x} = 4\\sqrt{5x}', '3\\sqrt{80x} = \\good{12\\sqrt{5x}}'] }],
      lines: [
        { say: 'Step one. The largest perfect square that divides 80 is 16: 80 is 16 times 5.', show: 'm.0' },
        { say: 'So root 80 x is root 16 times root 5 x, which is 4 root 5 x.', show: 'm.1' },
        { say: 'Multiply by the 3 in front: 3 root 80 x is 12 root 5 x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Simplify √45x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['45 = 9 \\times 5', '\\sqrt{45x} = \\sqrt{9}\\sqrt{5x} = 3\\sqrt{5x}', '4\\sqrt{45x} = \\good{12\\sqrt{5x}}'] }],
      lines: [
        { say: 'Step two. The largest perfect square that divides 45 is 9: 45 is 9 times 5.', show: 'm.0' },
        { say: 'So root 45 x is root 9 times root 5 x, which is 3 root 5 x.', show: 'm.1' },
        { say: 'Multiply by the 4 in front: 4 root 45 x is also 12 root 5 x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3\\sqrt{80x} - 4\\sqrt{45x} = 12\\sqrt{5x} - 12\\sqrt{5x}', '= (12 - 12)\\sqrt{5x} = \\good{0}'] }],
      lines: [
        { say: 'Step three. Now both terms are like radicals: 12 root 5 x minus 12 root 5 x.', show: 'm.0' },
        { say: '12 minus 12 is 0, so the answer is 0. The two terms were the same amount written in different ways.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\quad 3\\sqrt{80} \\approx 3(8.944) \\approx 26.83', '4\\sqrt{45} \\approx 4(6.708) \\approx 26.83 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a number. Take x equals 1. Root 80 is about 8.944, so 3 root 80 is about 26.83.', show: 'm.0' },
        { say: 'Root 45 is about 6.708, so 4 root 45 is also about 26.83. They are equal, so their difference is 0.', show: 'm.1' },
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
            ['$-\\sqrt{35x}$', 'subtract coefficients of **like** radicals, never the radicands'],
            ['$\\sqrt{80x} = 2\\sqrt{20x}$', 'take out the **largest** perfect square, $16$'],
            ['$4\\sqrt{5x} - 3\\sqrt{5x} = \\sqrt{5x}$', 'keep the $3$ and the $4$ in front of the radicals'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot subtract the numbers under the roots. 80 x minus 45 x is not allowed. Only like radicals combine.' },
        { say: 'Take out the largest perfect square. Root 80 is 2 root 20, but 20 still has the perfect square 4 inside. Using 16 straight away gives 4 root 5.' },
        { say: 'And keep the 3 and the 4 in front. Dropping them gives root 5 x, which is wrong.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $2\\sqrt{12} + \\sqrt{27}$.',
          choices: ['$\\sqrt{39}$', '$3\\sqrt{39}$', '$5\\sqrt{3}$', '$7\\sqrt{3}$'],
          answer: 3,
          working: '$2\\sqrt{12} = 2 \\cdot 2\\sqrt{3} = 4\\sqrt{3}$ and $\\sqrt{27} = 3\\sqrt{3}$, so the sum is $7\\sqrt{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify 2 root 12, plus root 27. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Root 12 is 2 root 3, so 2 root 12 is 4 root 3. Root 27 is 3 root 3. 4 root 3 plus 3 root 3 is 7 root 3, choice D. A and B add the numbers under the roots, and C forgets the 2 in front.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Take out the **largest** perfect square', 'Only **like radicals** combine', 'Combine the **coefficients**, keep the radical', 'Check with a number'] }],
      lines: [
        { say: 'Here is what to remember. Take out the largest perfect square factor.', show: 'sum.0' },
        { say: 'Only like radicals can be added or subtracted.', show: 'sum.1' },
        { say: 'Combine the numbers in front, and keep the radical.', show: 'sum.2' },
        { say: 'And you can check with a number. For more on radicals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
