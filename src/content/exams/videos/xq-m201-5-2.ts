import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 5.2 (multiplying and dividing radicals): 7/(2 + √3) in
// simplest form. The question is a Try It from OpenStax College Algebra 2e, word for word (section
// 1.3, Radicals and Rational Exponents, CC BY-NC-SA 4.0), whose answer gives 14 − 7√3: multiply by
// the conjugate 2 − √3, and the denominator becomes 4 − 3 = 1.

const QUESTION = 'Write 7/(2 + √3) in simplest form.';

const video: Explainer = {
  id: 'xq-m201-5-2',
  lessonId: '',
  exam: {
    lesson: 'm201-5-2',
    source: 'OpenStax, College Algebra 2e, Try It in section 1.3, Radicals and Rational Exponents',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/1-3-radicals-and-rational-exponents',
    question: QUESTION,
  },
  title: 'Exam Question: Write 7/(2 + √3) in Simplest Form (Rationalizing With a Conjugate)',
  thumbnailTitle: 'Simplify 7/(2 + √3)',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: write 7/(2 + √3) in simplest form. A radical in the denominator is not simplest form, so we multiply the top and bottom by the conjugate, 2 − √3. The bottom becomes 4 − 3 = 1, and the answer is 14 − 7√3. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Rationalize the Denominator', subtitle: 'Multiplying and dividing radicals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing radicals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Write $\\dfrac{7}{2 + \\sqrt{3}}$ in simplest form.',
          answer: '$14 - 7\\sqrt{3}$',
          working: '$\\dfrac{7}{2 + \\sqrt{3}} \\cdot \\dfrac{2 - \\sqrt{3}}{2 - \\sqrt{3}} = \\dfrac{14 - 7\\sqrt{3}}{4 - 3}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Write 7 over 2 plus root 3 in simplest form.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'In simplest form, there is **no radical in the denominator**. We need to get rid of $\\sqrt{3}$ from the bottom without changing the value.' }],
      lines: [{ say: 'An expression in simplest form has no radical in the denominator. So we need to clear root 3 out of the bottom, without changing the value of the fraction. This is called rationalizing the denominator.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'conj', tone: 'definition', title: 'Conjugates', md: '$2 + \\sqrt{3}$ and $2 - \\sqrt{3}$ are **conjugates**: the same terms with the opposite sign between them.' },
        { kind: 'callout', id: 'ds', tone: 'key', title: 'Difference of squares', md: '$(a + b)(a - b) = a^2 - b^2$, so $(2 + \\sqrt{3})(2 - \\sqrt{3}) = 4 - 3 = 1$: the radical **disappears**.' },
      ],
      lines: [
        { say: 'Here is what we need. 2 plus root 3 and 2 minus root 3 are conjugates: the same two terms, with the opposite sign between them.', show: 'conj' },
        { say: 'A sum times a difference is a difference of squares. So 2 plus root 3, times 2 minus root 3, is 4 minus 3, which is 1. The radical disappears.', show: 'ds' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply top and bottom by the **conjugate**', 'Simplify the **denominator**', 'Simplify the **numerator**'] }],
      lines: [
        { say: 'Here is the plan. First, multiply the top and the bottom by the conjugate of the denominator. That is multiplying by 1, so the value does not change.', show: 'plan.0' },
        { say: 'Second, simplify the denominator.', show: 'plan.1' },
        { say: 'Third, simplify the numerator.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Multiply by the conjugate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{2 + \\sqrt{3}} \\cdot \\dfrac{2 - \\sqrt{3}}{2 - \\sqrt{3}}'] }],
      lines: [
        { say: 'Step one. The conjugate of 2 plus root 3 is 2 minus root 3. Multiply the top and bottom by it. 2 minus root 3 over itself is just 1.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The denominator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(2 + \\sqrt{3})(2 - \\sqrt{3}) = 2^2 - (\\sqrt{3})^2', '= 4 - 3 = \\good{1}'] }],
      lines: [
        { say: 'Step two. The bottom is a difference of squares: 2 squared minus root 3 squared.', show: 'm.0' },
        { say: 'That is 4 minus 3, which is 1. The radical is gone from the denominator.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The numerator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7(2 - \\sqrt{3}) = 14 - 7\\sqrt{3}', '\\dfrac{14 - 7\\sqrt{3}}{1} = \\good{14 - 7\\sqrt{3}}'] }],
      lines: [
        { say: 'Step three. On top, 7 times 2 minus root 3 is 14 minus 7 root 3.', show: 'm.0' },
        { say: 'Divided by 1, that stays the same. So the answer is 14 minus 7 root 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{2 + 1.7321} = \\dfrac{7}{3.7321} \\approx 1.876', '14 - 7(1.7321) = 14 - 12.124 \\approx 1.876 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. Root 3 is about 1.7321. The original fraction is 7 over 3.7321, about 1.876.', show: 'm.0' },
        { say: 'Our answer is 14 minus 7 times 1.7321: 14 minus 12.124, also about 1.876. The value has not changed.', show: 'm.1' },
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
            ['multiplying by $\\dfrac{\\sqrt{3}}{\\sqrt{3}}$', 'that gives $2\\sqrt{3} + 3$ below: still a radical'],
            ['multiplying only the **bottom**', 'multiply top **and** bottom, or the value changes'],
            ['$(2 + \\sqrt{3})(2 - \\sqrt{3}) = 4 + 3$', '$(\\sqrt{3})^2 = 3$ is **taken away**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying by root 3 over root 3 works for a single radical, but here it leaves 2 root 3 plus 3 in the denominator. Use the conjugate.' },
        { say: 'Multiply the top and the bottom. Changing only one of them changes the value.' },
        { say: 'And in the difference of squares, root 3 squared is taken away: 4 minus 3, not 4 plus 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Write $\\dfrac{4}{3 - \\sqrt{5}}$ in simplest form.',
          choices: ['$3 + \\sqrt{5}$', '$3 - \\sqrt{5}$', '$\\dfrac{6 + 2\\sqrt{5}}{7}$', '$12 + 4\\sqrt{5}$'],
          answer: 0,
          working: '$\\dfrac{4(3 + \\sqrt{5})}{9 - 5} = \\dfrac{4(3 + \\sqrt{5})}{4} = 3 + \\sqrt{5}$',
        },
      ],
      lines: [
        { say: 'Your turn. Write 4 over 3 minus root 5 in simplest form. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Multiply top and bottom by the conjugate, 3 plus root 5. The bottom is 9 minus 5, which is 4. The top is 4 times 3 plus root 5. The 4s cancel, leaving 3 plus root 5, choice A. C uses 9 plus 5 below, and D forgets to divide by 4.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simplest form: **no radical** in the denominator', 'For $a + \\sqrt{b}$ below, use the **conjugate** $a - \\sqrt{b}$', '$(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$', 'Multiply **top and bottom**'] }],
      lines: [
        { say: 'Here is what to remember. In simplest form, there is no radical in the denominator.', show: 'sum.0' },
        { say: 'When the denominator is a sum or difference with a root, multiply by its conjugate.', show: 'sum.1' },
        { say: 'A number plus a root, times the same number minus the root, is the first squared minus what is under the root.', show: 'sum.2' },
        { say: 'And always multiply the top and the bottom. For more on multiplying and dividing radicals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
