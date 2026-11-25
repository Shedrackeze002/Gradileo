import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 1.2 (fractions and decimals). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.3, Decimals and Fractions, CC BY-NC-SA 4.0).
// 27/11 = 27 ÷ 11: 11 goes into 27 twice, remainder 5; 50 ÷ 11 = 4 r 6; 60 ÷ 11 = 5 r 5; the
// remainder 5 comes back, so the digits 4, 5 repeat: 2.4545… = 2.(45) with a bar over 45.

const QUESTION = 'Write as a decimal: 27/11.';

const video: Explainer = {
  id: 'xq-m7-1-2',
  lessonId: '',
  exam: {
    lesson: 'm7-1-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.3, Decimals and Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-3-decimals-and-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Write 27/11 as a Decimal (Fractions and Decimals)',
  thumbnailTitle: '27/11 as a Decimal',
  summary:
    'A real test question, solved one small step at a time: write 27/11 as a decimal. A fraction is a division, so we divide 27 by 11. 11 goes into 27 twice with 5 left over, then 50 ÷ 11 is 4 with 6 left over, and 60 ÷ 11 is 5 with 5 left over. The remainder 5 has come back, so the digits 4 and 5 repeat forever: 27/11 = 2.4545… = 2.45 with a bar over the 45. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '27/11 as a Decimal', subtitle: 'Fractions and decimals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about writing a fraction as a decimal. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Write as a decimal: $\\dfrac{27}{11}$.',
          answer: '$2.\\overline{45}$',
          working: '27 ÷ 11 = 2.4545…',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Write as a decimal: 27 elevenths.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A fraction is a division', md: 'The fraction bar means **divide**: $\\dfrac{27}{11} = 27 \\div 11$. Some divisions stop (**terminate**). Others go on forever with a block of digits that **repeats**, shown with a **bar** over it.' }],
      lines: [
        { say: 'The fraction bar means divide. 27 elevenths is 27 divided by 11.', show: 'c' },
        { say: 'Some divisions stop. Others go on forever, with a block of digits that repeats. We show the repeating digits with a bar over them.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Spotting a repeat', md: 'In long division, keep bringing down zeros. If a **remainder comes back**, the digits after it will come back too, in the **same order**: the decimal repeats from there.' }],
      lines: [
        { say: 'Here is what we need. In long division, keep bringing down zeros after the decimal point.', show: 'c' },
        { say: 'If a remainder comes back that you have seen before, the same digits will come back too, in the same order. The decimal repeats from there.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Divide $27$ by $11$', 'Bring down **zeros** after the point', 'Stop when a **remainder repeats**, and draw the **bar**'] }],
      lines: [
        { say: 'Here is the plan. Divide 27 by 11.', show: 'plan.0' },
        { say: 'Bring down zeros after the decimal point.', show: 'plan.1' },
        { say: 'Stop when a remainder repeats, and draw the bar.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide until it repeats',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['27 \\div 11 = 2 \\text{ remainder } \\thc{5}', '50 \\div 11 = 4 \\text{ remainder } 6', '60 \\div 11 = 5 \\text{ remainder } \\thc{5}', '\\dfrac{27}{11} = 2.4545\\ldots = \\good{2.\\overline{45}}'] }],
      lines: [
        { say: 'Step one. 11 goes into 27 two times, because 2 times 11 is 22. 27 minus 22 leaves a remainder of 5. So the whole number part is 2.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Put the decimal point, and bring down a zero: 50. 11 goes into 50 four times, because 4 times 11 is 44. The remainder is 6. The first decimal digit is 4.', show: 'm.1', focus: 'm.1' },
        { say: 'Bring down another zero: 60. 11 goes into 60 five times, because 5 times 11 is 55. The remainder is 5. The next digit is 5.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. The remainder 5 has come back. So we will get 50 again, then 4, then 60, then 5, forever. The decimal is 2.4545 and so on. Draw a bar over the 4 and the 5.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['11 \\times 2.45 = 26.95 \\approx 27 \\ \\checkmark', '\\tfrac{27}{11} \\text{ is between } \\tfrac{22}{11} = 2 \\text{ and } \\tfrac{33}{11} = 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 11 times 2.45 is 26.95, very close to 27. Each extra 45 we add makes it closer still.', show: 'm.0' },
        { say: 'And 27 elevenths is between 22 elevenths, which is 2, and 33 elevenths, which is 3. Our answer is between 2 and 3. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$0.407$', 'divided $11$ by $27$: the **top** is divided by the **bottom**'],
            ['$2.5$', 'wrote the remainder $5$ as the decimal: keep dividing'],
            ['$2.4\\overline{5}$', 'the bar must cover the **whole** repeating block, $45$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0.407 divides 11 by 27. The top number is divided by the bottom number.' },
        { say: '2.5 writes the remainder as a decimal digit. A remainder is not a decimal. Keep dividing.' },
        { say: 'And a bar over only the 5 means 2.4555 and so on. The bar must cover the whole block that repeats: 4 and 5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Write $\\dfrac{5}{6}$ as a decimal.',
          choices: ['$0.\\overline{56}$', '$0.\\overline{83}$', '$1.2$', '$0.8\\overline{3}$'],
          answer: 3,
          working: '5 ÷ 6: 50 ÷ 6 = 8 r 2, then 20 ÷ 6 = 3 r 2 again and again: 0.8333… = 0.83 with a bar over the 3.',
        },
      ],
      lines: [
        { say: 'Your turn. Write 5 sixths as a decimal. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '50 divided by 6 is 8, remainder 2. Then 20 divided by 6 is 3, remainder 2, again and again. Only the 3 repeats: 0.8333 and so on, with the bar over the 3. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A fraction means **top ÷ bottom**', 'Bring down **zeros** after the point', 'A **remainder** that comes back means a **repeat**', 'The **bar** covers the whole repeating block'] }],
      lines: [
        { say: 'Here is what to remember. A fraction means the top divided by the bottom.', show: 'sum.0' },
        { say: 'Bring down zeros after the decimal point.', show: 'sum.1' },
        { say: 'When a remainder comes back, the digits repeat.', show: 'sum.2' },
        { say: 'And the bar covers the whole block that repeats. For more on fractions and decimals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
