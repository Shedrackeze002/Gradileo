import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 2.2 (evaluating limits algebraically). The question is an
// exercise from OpenStax Calculus Volume 1 (section 2.3, The Limit Laws, CC BY-NC-SA 4.0): the
// book's instruction "In the following exercises, use direct substitution to show that each limit
// leads to the indeterminate form 0/0. Then, evaluate the limit." is put with the one limit it asks
// about. Multiplying by the conjugate √t + 3 gives lim (√t + 3) = 6, as in the book's answer.

const QUESTION =
  'Use direct substitution to show that the limit leads to the indeterminate form 0/0. Then, evaluate the limit: lim t→9 (t − 9)/(√t − 3).';

const L = '\\lim_{t \\to 9} \\dfrac{t - 9}{\\sqrt{t} - 3}';

const video: Explainer = {
  id: 'xq-m31-2-2',
  lessonId: '',
  exam: {
    lesson: 'm31-2-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 2.3, The Limit Laws',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/2-3-the-limit-laws',
    question: QUESTION,
  },
  title: 'Exam Question: The Limit of (t − 9)/(√t − 3) as t → 9 (Rationalizing a Limit)',
  thumbnailTitle: '0/0 Is Not the Answer',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: show that the limit of (t − 9)/(√t − 3) as t approaches 9 gives 0/0 by direct substitution, then evaluate it. We multiply the top and the bottom by the conjugate √t + 3, cancel the t − 9, and substitute again to get 6. Then we check with numbers close to 9 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '0/0 Is Not the Answer', subtitle: 'Evaluating limits, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about evaluating a limit with algebra. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use direct substitution to show that the limit leads to the indeterminate form $\\dfrac{0}{0}$. Then, evaluate the limit: $\\displaystyle\\lim_{t \\to 9} \\dfrac{t - 9}{\\sqrt{t} - 3}$.',
          answer: '$\\dfrac{9 - 9}{3 - 3} = \\dfrac{0}{0}$; the limit is $6$.',
          working: 'Multiply by $\\dfrac{\\sqrt{t} + 3}{\\sqrt{t} + 3}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Use direct substitution to show that the limit leads to 0 over 0. Then evaluate the limit as t approaches 9 of t minus 9, over root t minus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: [L] },
        { kind: 'text', id: 't', size: 'md', md: 'First, try putting $t = 9$ straight in. When that gives $\\dfrac{0}{0}$, **change the form** of the fraction until it does not, then try again.' },
      ],
      lines: [
        { say: 'Here is what it is asking. First, try putting 9 straight in.', show: 'm' },
        { say: 'When that gives 0 over 0, we change the form of the fraction, without changing its value, until it does not. Then we try again.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['(\\sqrt{t} - 3)(\\sqrt{t} + 3) = t - 9'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Conjugate', md: 'When a **square root** makes $\\dfrac{0}{0}$, multiply the top and the bottom by the **conjugate**: the same two terms with the other sign.' },
      ],
      lines: [
        { say: 'Here is what we need. Root t minus 3, times root t plus 3, is t minus 9. It is a difference of squares, and the square root disappears.', show: 'f' },
        { say: 'So when a square root gives 0 over 0, multiply the top and the bottom by the conjugate: the same two terms with the other sign in the middle.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Substitute $t = 9$: get $\\dfrac{0}{0}$', 'Multiply by the **conjugate** over itself', '**Cancel**, then substitute again'] }],
      lines: [
        { say: 'Here is the plan. Substitute 9, and see 0 over 0.', show: 'plan.0' },
        { say: 'Multiply the top and the bottom by the conjugate.', show: 'plan.1' },
        { say: 'Cancel the part that made the 0, then substitute again.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{9 - 9}{\\sqrt{9} - 3} = \\dfrac{9 - 9}{3 - 3} = \\good{\\dfrac{0}{0}}'] }],
      lines: [
        { say: 'Step one. Put t equals 9 in. The top is 9 minus 9, which is 0. The bottom is root 9 minus 3, which is 3 minus 3, which is also 0.', show: 'm.0' },
        { say: 'So we get 0 over 0, the indeterminate form. That does not mean the limit is 0. It means we need more work.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The conjugate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{t - 9}{\\sqrt{t} - 3} \\cdot \\dfrac{\\sqrt{t} + 3}{\\sqrt{t} + 3}', '= \\dfrac{(t - 9)(\\sqrt{t} + 3)}{t - 9}', '= \\good{\\sqrt{t} + 3} \\quad (t \\ne 9)'] }],
      lines: [
        { say: 'Step two. Multiply the top and the bottom by root t plus 3. That is multiplying by 1, so the value does not change.', show: 'm.0' },
        { say: 'On the bottom, root t minus 3 times root t plus 3 is t minus 9. Keep the top in factored form.', show: 'm.1' },
        { say: 'Now t minus 9 is on the top and the bottom. Since t is near 9 but not equal to it, t minus 9 is not 0, so we can cancel it. We are left with root t plus 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Substitute again',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: [`${L} = \\lim_{t \\to 9} (\\sqrt{t} + 3)`, '= \\sqrt{9} + 3 = \\good{6}'] }],
      lines: [
        { say: 'Step three. The limit is the same as the limit of root t plus 3.', show: 'm.0' },
        { say: 'Now substitution works: root 9 plus 3 is 6. The limit is 6.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$t$', '$8.99$', '$8.9999$', '$9.0001$', '$9.01$'],
          rows: [['$\\dfrac{t - 9}{\\sqrt{t} - 3}$', '$5.998$', '$5.99998$', '$6.00002$', '$6.002$']],
        },
      ],
      lines: [
        { say: 'Let us check with numbers close to 9, on both sides.', show: 'tab' },
        { say: 'Just below 9, the fraction is a little under 6. Just above 9, it is a little over 6. Both sides head to 6. It checks out.', focus: 'tab' },
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
            ['"$\\dfrac{0}{0}$, so the answer is $0$"', '$\\dfrac{0}{0}$ means **more work**, not $0$'],
            ['Multiply only the **bottom**', 'that changes the value: do **both**'],
            ['$(\\sqrt{t} - 3)(\\sqrt{t} + 3) = t - 3$', 'it is $t - 9$: square **both** terms'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0 over 0 is not 0, and not 1. It is a signal to do more work.' },
        { say: 'Multiply the top and the bottom by the conjugate, not just the bottom, or the value changes.' },
        { say: 'And in the difference of squares, square both terms: root t squared is t, and 3 squared is 9.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to 4} \\dfrac{x - 4}{\\sqrt{x} - 2}$.',
          choices: ['$4$', '$0$', '$2$', 'does not exist'],
          answer: 0,
          working: 'Multiply by $\\dfrac{\\sqrt{x} + 2}{\\sqrt{x} + 2}$: the limit is $\\sqrt{4} + 2 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches 4 of x minus 4, over root x minus 2. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Substitution gives 0 over 0. Multiply by root x plus 2 over itself, and the bottom becomes x minus 4, which cancels. What is left is root x plus 2, which is 2 plus 2, or 4. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Always try **direct substitution** first', '$\\dfrac{0}{0}$ means: change the form', 'Square root? Multiply by the **conjugate**', 'Cancel, then **substitute again**'] }],
      lines: [
        { say: 'Here is what to remember. Always try direct substitution first.', show: 'sum.0' },
        { say: '0 over 0 means you need to change the form of the fraction.', show: 'sum.1' },
        { say: 'With a square root, multiply the top and the bottom by the conjugate.', show: 'sum.2' },
        { say: 'Then cancel, and substitute again. For more on evaluating limits, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
