import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 7.1 (simple and compound interest). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 6.4, Compound Interest,
// CC BY-NC-SA 4.0). Simple interest is I = Prt = 5000 × 0.03 × 4 = $600, so the CD would be worth
// $5,600, and compound interest earned 5627.54 − 5600 = $27.54 more, as in the book's answer.
// Check: 5000 × 1.03⁴ = 5627.54.

/** Year by year: simple interest adds $150 each year; compound interest adds 3% of the new total. */
const GROWTH = {
  kind: 'table' as const,
  id: 'g',
  head: ['Year', 'Simple', 'Compound'],
  rows: [
    ['$0$', '\\$5,000.00', '\\$5,000.00'],
    ['$1$', '\\$5,150.00', '\\$5,150.00'],
    ['$2$', '\\$5,300.00', '\\$5,304.50'],
    ['$3$', '\\$5,450.00', '\\$5,463.64'],
    ['$4$', '\\$5,600.00', '\\$5,627.54'],
  ],
};

const QUESTION =
  'Oksana deposits $5,000 in a CD that earned 3% compounded annually and was worth $5,627.54 after 4 years. Had Oksana invested in a CD with simple interest, how much would the CD have been worth after 4 years? How much more did Oksana earn using compound interest?';

const video: Explainer = {
  id: 'xq-m203-7-1',
  lessonId: '',
  exam: {
    lesson: 'm203-7-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.4, Compound Interest',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-4-compound-interest',
    question: QUESTION,
  },
  title: 'Exam Question: Simple or Compound Interest? (Simple and Compound Interest)',
  thumbnailTitle: 'Simple or Compound: How Much More?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: Oksana deposits $5,000 in a CD at 3% compounded annually, and it is worth $5,627.54 after 4 years. What would it have been worth with simple interest, and how much more did compound interest earn? Simple interest is I = Prt = 5,000 × 0.03 × 4 = $600, so the CD would be worth $5,600. Compound interest earned $27.54 more. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simple or Compound: How Much More?', subtitle: 'Simple and compound interest, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question comparing simple and compound interest. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt:
            'Oksana deposits \\$5,000 in a CD that earned $3\\%$ compounded annually and was worth \\$5,627.54 after $4$ years. Had Oksana invested in a CD with simple interest, how much would the CD have been worth after $4$ years? How much more did Oksana earn using compound interest?',
          answer: '\\$5,600, and \\$27.54 more with compound interest',
          working: 'I = 5,000 × 0.03 × 4 = 600, and 5,627.54 − 5,600 = 27.54',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Oksana deposits 5 thousand dollars in a CD, a certificate of deposit, that earned 3 percent compounded annually. It was worth 5 thousand 627 dollars and 54 cents after 4 years.', caption: 'Oksana deposits $5,000 in a CD, a certificate of deposit, that earned 3% compounded annually. It was worth $5,627.54 after 4 years.' },
        { say: 'Had she invested in a CD with simple interest, how much would it have been worth after 4 years? And how much more did she earn using compound interest?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 's', tone: 'definition', title: 'Simple interest', md: 'Interest on the **original deposit only**, the same amount every year.' },
        { kind: 'callout', id: 'k', tone: 'definition', title: 'Compound interest', md: 'Interest on the deposit **and** on the interest already earned, so it grows a little faster each year.' },
      ],
      lines: [
        { say: 'Simple interest is paid on the original deposit only, so it is the same amount every year.', show: 's' },
        { say: 'Compound interest is paid on the deposit and on the interest already earned. So it grows a little faster each year.', show: 'k' },
        { say: 'We already know the compound value, 5 thousand 627 dollars and 54 cents. We need the simple value, and the difference.', caption: 'We already know the compound value, $5,627.54. We need the simple value, and the difference.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['I = Prt', 'A = P + I'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The letters', md: '$P$ is the **principal** (the deposit), $r$ the yearly **rate** as a decimal, $t$ the time in **years**, $I$ the **interest** and $A$ the **amount** at the end.' },
      ],
      lines: [
        { say: 'Here is what we need. Simple interest is I equals P r t.', show: 'f.0' },
        { say: 'P is the principal, the money deposited. r is the yearly rate, as a decimal. t is the time in years.', show: 'c' },
        { say: 'And the amount at the end is the principal plus the interest.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the simple **interest**, $I = Prt$', 'Add it to the **principal**', '**Subtract** from the compound value'] }],
      lines: [
        { say: 'Here is the plan. Find the simple interest.', show: 'plan.0' },
        { say: 'Add it to the principal to get the value of the CD.', show: 'plan.1' },
        { say: 'Then subtract that from the compound value.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Simple interest',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['I = 5000 \\times 0.03 \\times 4 = \\$600', 'A = \\$5{,}000 + \\$600 = \\good{\\$5{,}600}'] }],
      lines: [
        { say: 'Step one. 3 percent as a decimal is 0.03. 5 thousand times 0.03 times 4 is 600 dollars of simple interest.', caption: 'Step one. 3% as a decimal is 0.03. 5,000 × 0.03 × 4 = $600 of simple interest.', show: 'm.0' },
        { say: 'Step two. Add it to the principal: 5 thousand plus 600 is 5 thousand 600 dollars. That is what the CD would be worth with simple interest.', caption: 'Step two. Add it to the principal: $5,000 + $600 = $5,600. That is what the CD would be worth with simple interest.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: How much more?',
      layout: 'split',
      leftWidth: 640,
      left: [GROWTH],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\$5{,}627.54 - \\$5{,}600', '= \\good{\\$27.54 \\text{ more}}'] }],
      lines: [
        { say: 'Step three. Here are both CDs year by year. Simple interest adds 150 dollars every year. Compound interest adds 3 percent of a total that keeps growing.', caption: 'Step three. Here are both CDs year by year. Simple interest adds $150 every year. Compound interest adds 3% of a total that keeps growing.', show: 'g' },
        { say: 'After 4 years, 5 thousand 627 dollars and 54 cents minus 5 thousand 600 is 27 dollars and 54 cents. Oksana earned 27 dollars and 54 cents more with compound interest.', caption: 'After 4 years, $5,627.54 − $5,600 = $27.54. Oksana earned $27.54 more with compound interest.', show: ['m.0', 'm.1'], focus: ['g.4', 'm.1'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5000 \\times 1.03^4 \\approx \\$5{,}627.54 \\ \\checkmark', '\\$5{,}600 + \\$27.54 = \\$5{,}627.54 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Compounding 3 percent for 4 years multiplies by 1.03 to the power 4. 5 thousand times that is 5 thousand 627 dollars and 54 cents, the value in the question.', caption: 'Let us check. Compounding 3% for 4 years multiplies by 1.03⁴. 5,000 × 1.03⁴ ≈ $5,627.54, the value in the question.', show: 'm.0' },
        { say: 'And 5 thousand 600 plus 27 dollars and 54 cents is 5 thousand 627 dollars and 54 cents. It checks out.', caption: 'And $5,600 + $27.54 = $5,627.54. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$600', 'that is the **interest**: add the principal for the value'],
            ['\\$5,150', 'used **one** year: $t = 4$'],
            ['\\$627.54 more', 'compared with the **deposit**, not the simple CD'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '600 dollars is the interest. The question asks what the CD is worth, so add the 5 thousand dollar principal.', caption: '$600 is the interest. The question asks what the CD is worth, so add the $5,000 principal.' },
        { say: '5 thousand 150 uses only one year of interest. The time is 4 years.', caption: '$5,150 uses only one year of interest. The time is 4 years.' },
        { say: 'And 627 dollars and 54 cents is all the compound interest. The question asks how much more than the simple interest CD, so compare with 5 thousand 600.', caption: 'And $627.54 is all the compound interest. The question asks how much more than the simple interest CD, so compare with $5,600.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ravi deposits \\$2,000 for $2$ years at $5\\%$. With compound interest (annually) it grows to \\$2,205. How much more is that than with simple interest?',
          choices: ['\\$200', '\\$205', '\\$10', '\\$5'],
          answer: 3,
          working: 'Simple: I = 2,000 × 0.05 × 2 = 200, so 2,200. Then 2,205 − 2,200 = 5.',
        },
      ],
      lines: [
        { say: 'Your turn. Ravi deposits 2 thousand dollars for 2 years at 5 percent. With compound interest, it grows to 2 thousand 205 dollars. How much more is that than with simple interest? Pause the video and try it.', caption: 'Your turn. Ravi deposits $2,000 for 2 years at 5%. With compound interest, it grows to $2,205. How much more is that than with simple interest? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Simple interest is 2 thousand times 0.05 times 2, which is 200 dollars, so 2 thousand 200. 2 thousand 205 minus 2 thousand 200 is 5 dollars. Choice "D".', caption: 'Simple interest is 2,000 × 0.05 × 2 = $200, so $2,200. $2,205 − $2,200 = $5. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simple: $I = Prt$ on the **deposit** only', 'Value $=$ principal $+$ interest', 'Compound earns interest on **interest**', 'Compare **values** with values'] }],
      lines: [
        { say: 'Here is what to remember. Simple interest is P r t, paid on the deposit only.', show: 'sum.0' },
        { say: 'The value at the end is the principal plus the interest.', show: 'sum.1' },
        { say: 'Compound interest also earns interest on the interest, so it grows faster.', show: 'sum.2' },
        { say: 'And compare like with like: a value with a value. For more on simple and compound interest, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
