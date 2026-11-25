import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { factorRings } from '@/content/math9/videos/lib/m9-2-figures.ts';

// Exam question for Math 9 lesson 2.2 (exponent laws). The question is a Try It from OpenStax
// Elementary Algebra 2e, word for word (section 6.2, Use Multiplication Properties of Exponents,
// CC BY-NC-SA 4.0). Same base, so add the exponents: (a) 5 · 5⁵ = 5¹ · 5⁵ = 5⁶ and
// (b) 4⁹ · 4⁹ = 4¹⁸. The traps are multiplying the exponents (4⁸¹) and multiplying the bases (16¹⁸).

const QUESTION = 'Simplify: (a) 5 · 5⁵ (b) 4⁹ · 4⁹.';

const rings = (id: string) =>
  figure(
    id,
    [
      factorRings({
        groups: [
          { id: 'one', values: ['5'], tone: 'adj', below: '5^1' },
          { id: 'five', values: ['5', '5', '5', '5', '5'], tone: 'opp', below: '5^5' },
        ],
        gap: 1.4,
        groupGap: 0.8,
        r: 0.58,
        over: '6 \\text{ factors of } 5',
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m9-2-2',
  lessonId: '',
  exam: {
    lesson: 'm9-2-2',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 6.2, Use Multiplication Properties of Exponents',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents',
    question: QUESTION,
  },
  title: 'Exam Question: Multiplying Powers With the Same Base (Exponent Laws)',
  thumbnailTitle: 'Multiplying Powers: 5 · 5⁵ and 4⁹ · 4⁹',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: simplify (a) 5 · 5⁵ and (b) 4⁹ · 4⁹. When we multiply powers with the same base, we keep the base and add the exponents. A 5 on its own is 5¹, so 5 · 5⁵ = 5⁶, and 4⁹ · 4⁹ = 4¹⁸. Then we check by counting factors and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Multiplying Powers: 5 · 5⁵ and 4⁹ · 4⁹', subtitle: 'Exponent laws, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about exponent laws. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: (a) $5 \\cdot 5^5$ (b) $4^9 \\cdot 4^9$.',
          answer: '(a) $5^6$ (b) $4^{18}$',
          working: '(a) 5¹ · 5⁵ = 5¹⁺⁵ (b) 4⁹⁺⁹',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify. Part a: 5 times 5 to the power of 5. Part b: 4 to the power of 9, times 4 to the power of 9.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [rings('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Simplify', md: 'To **simplify** a product of powers with the **same base**, write it as **one** power of that base.' }],
      lines: [
        { say: 'Here is part a, with each factor in a ring. A single 5, and then 5 to the power of 5, which is five 5s.', show: ['ask.one', 'ask.one-b', 'ask.five', 'ask.five-b'] },
        { say: 'To simplify a product of powers with the same base, write it as one power of that base.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a^m \\cdot a^n = a^{m + n}', '5 = 5^1'] }],
      lines: [
        { say: 'Here is what we need. The product law: to multiply powers with the same base, keep the base and add the exponents.', show: 'm.0' },
        { say: 'And a number on its own is that number to the power of 1. So 5 is 5 to the power of 1.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Check the **bases** are the same', 'Write any lone number as a **power of 1**', 'Keep the base, **add** the exponents'] }],
      lines: [
        { say: 'Here is the plan. Check that the bases are the same.', show: 'plan.0' },
        { say: 'Write any number on its own as a power of 1.', show: 'plan.1' },
        { say: 'Then keep the base, and add the exponents.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Add the exponents',
      layout: 'split',
      leftWidth: 560,
      left: [rings('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } 5^1 \\cdot 5^5', '= 5^{1 + 5} = \\good{5^6}', '\\text{(b) } 4^9 \\cdot 4^9', '= 4^{9 + 9} = \\good{4^{18}}'] }],
      lines: [
        { say: 'Step one, part a. Both factors have base 5. The single 5 is 5 to the power of 1.', show: ['st.one', 'st.one-b', 'm.0'], focus: ['st.one', 'm.0'] },
        { say: 'Step two. Keep the base 5, and add the exponents: 1 plus 5 is 6. The rings show it too: 1 five and 5 more fives is 6 factors of 5. So part a is 5 to the power of 6.', show: ['st.five', 'st.five-b', 'st.over', 'm.1'], focus: ['st.over', 'm.1'] },
        { say: 'Step three, part b. Both factors have base 4.', show: 'm.2', focus: 'm.2' },
        { say: 'Keep the base 4, and add the exponents: 9 plus 9 is 18. So part b is 4 to the power of 18.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\cdot 5^5 = 5 \\times 3\\,125 = 15\\,625', '5^6 = 15\\,625 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part a with the actual numbers. 5 to the power of 5 is 3 thousand 125. Times 5 is 15 thousand 625.', show: 'm.0', focus: 'm.0' },
        { say: 'And 5 to the power of 6 is also 15 thousand 625. The same. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$4^{81}$', '**multiplied** the exponents: for a product, **add** them'],
            ['$16^{18}$', 'multiplied the bases: **keep** the base'],
            ['$5^5$', 'forgot the lone $5$ is $5^1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 to the power of 81 multiplies the exponents. When we multiply powers, we add the exponents.' },
        { say: '16 to the power of 18 multiplies the bases too. The base stays the same.' },
        { say: 'And 5 to the power of 5 forgets the lone 5. It is 5 to the power of 1, so it adds one more factor.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $7^6 \\cdot 7^8$.',
          choices: ['$7^{48}$', '$49^{14}$', '$7^2$', '$7^{14}$'],
          answer: 3,
          working: 'Same base: 7⁶⁺⁸ = 7¹⁴.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify 7 to the power of 6, times 7 to the power of 8. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The bases are the same, so keep the 7 and add the exponents: 6 plus 8 is 14. 7 to the power of 14. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same base: **keep** it', 'Multiplying powers: **add** the exponents', 'A lone number is a **power of 1**', 'Check by **counting factors**'] }],
      lines: [
        { say: 'Here is what to remember. When the bases are the same, keep the base.', show: 'sum.0' },
        { say: 'To multiply powers, add the exponents.', show: 'sum.1' },
        { say: 'A number on its own is a power of 1.', show: 'sum.2' },
        { say: 'And you can check by counting the factors. For more on exponent laws, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
