import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 4.3 (dividing radicals): rationalize three one-term
// denominators. The question is a Try It from OpenStax Intermediate Algebra 2e, word for word
// (section 8.5, Divide Radical Expressions, CC BY-NC-SA 4.0), whose answers are 6√5/5, √14/6 and
// √(5x)/x. Part (b) splits the root first: √7/√18 = √7/(3√2), then multiplies by √2/√2.

const QUESTION = 'Simplify: (a) 6/√5 (b) √(7/18) (c) 5/√(5x)';

const video: Explainer = {
  id: 'xq-m202-4-3',
  lessonId: '',
  exam: {
    lesson: 'm202-4-3',
    source: 'OpenStax, Intermediate Algebra 2e, Try It in section 8.5, Divide Radical Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/8-5-divide-radical-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Rationalize the Denominator, 6/√5, √(7/18) and 5/√(5x) (Dividing Radicals)',
  thumbnailTitle: 'Rationalize the Denominator',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: simplify 6/√5, √(7/18) and 5/√(5x). Each one has a root in the denominator, so we multiply the top and bottom by that root to rationalize it, giving 6√5/5, √14/6 and √(5x)/x. Then we check with decimals and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Rationalize the Denominator', subtitle: 'Dividing radicals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing radicals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: (a) $\\dfrac{6}{\\sqrt{5}}$ (b) $\\sqrt{\\dfrac{7}{18}}$ (c) $\\dfrac{5}{\\sqrt{5x}}$',
          answer: '(a) $\\dfrac{6\\sqrt{5}}{5}$ (b) $\\dfrac{\\sqrt{14}}{6}$ (c) $\\dfrac{\\sqrt{5x}}{x}$',
          working: 'Multiply the top and bottom by the root in the denominator: $\\sqrt{5}$, then $\\sqrt{2}$, then $\\sqrt{5x}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Simplify three expressions. Part "A": 6 over root 5. Part B: the square root of 7 over 18. Part C: 5 over root 5 x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A radical is in **simplest form** when there is **no root in the denominator** and no fraction under a root. Each part breaks that rule, so we **rationalize** the denominator.' }],
      lines: [
        { say: 'A radical expression is in simplest form when there is no root in the denominator, and no fraction under a root.', show: 't' },
        { say: 'Every part breaks that rule. Making the denominator a whole number again is called rationalizing the denominator.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'one', tone: 'key', title: 'Multiply by 1', md: '$\\dfrac{\\sqrt{5}}{\\sqrt{5}} = 1$, so multiplying by it changes the **look** of a fraction but not its **value**.' },
        { kind: 'callout', id: 'sq', tone: 'definition', title: 'A root times itself', md: '$\\sqrt{a} \\times \\sqrt{a} = a$, so the root in the denominator **disappears**.' },
        { kind: 'callout', id: 'quo', tone: 'tip', title: 'The Quotient Property', md: '$\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$, for $a \\ge 0$ and $b > 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. Root 5 over root 5 equals 1. Multiplying a fraction by 1 changes how it looks, but not its value.', show: 'one' },
        { say: 'A square root times itself is the number under it. So multiplying the denominator by its own root makes the root disappear.', show: 'sq' },
        { say: 'And the root of a fraction is the root of the top over the root of the bottom.', show: 'quo' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **root** in the denominator', 'Multiply the **top and bottom** by it', '**Simplify** what is left'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, find the root in the denominator.', show: 'plan.0' },
        { say: 'Second, multiply the top and the bottom by that root.', show: 'plan.1' },
        { say: 'Third, simplify what is left.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{\\sqrt{5}} \\times \\dfrac{\\sqrt{5}}{\\sqrt{5}}', '= \\dfrac{6\\sqrt{5}}{\\sqrt{5} \\times \\sqrt{5}}', '= \\good{\\dfrac{6\\sqrt{5}}{5}}'] }],
      lines: [
        { say: 'Step one, part "A". The denominator is root 5, so multiply the top and bottom by root 5.', show: 'm.0' },
        { say: 'On top, 6 times root 5 is 6 root 5. On the bottom, root 5 times root 5.', show: 'm.1' },
        { say: 'Root 5 times root 5 is 5. So part "A" is 6 root 5, over 5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{\\dfrac{7}{18}} = \\dfrac{\\sqrt{7}}{\\sqrt{18}} = \\dfrac{\\sqrt{7}}{3\\sqrt{2}}', '= \\dfrac{\\sqrt{7}}{3\\sqrt{2}} \\times \\dfrac{\\sqrt{2}}{\\sqrt{2}}', '= \\dfrac{\\sqrt{14}}{3 \\times 2} = \\good{\\dfrac{\\sqrt{14}}{6}}'] }],
      lines: [
        { say: 'Step two, part B. Split the root over the top and bottom: root 7 over root 18. Root 18 is root 9 times root 2, which is 3 root 2.', show: 'm.0' },
        { say: 'The root left in the denominator is root 2, so multiply the top and bottom by root 2.', show: 'm.1' },
        { say: 'On top, root 7 times root 2 is root 14. On the bottom, 3 times 2 is 6. So part B is root 14, over 6.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{\\sqrt{5x}} \\times \\dfrac{\\sqrt{5x}}{\\sqrt{5x}}', '= \\dfrac{5\\sqrt{5x}}{5x}', '= \\good{\\dfrac{\\sqrt{5x}}{x}}'] }],
      lines: [
        { say: 'Step three, part C. The denominator is root 5 x, so multiply the top and bottom by root 5 x.', show: 'm.0' },
        { say: 'On the bottom, root 5 x times root 5 x is 5 x. So we have 5 root 5 x, over 5 x.', show: 'm.1' },
        { say: 'The 5 outside the root on top cancels the 5 on the bottom. So part C is root 5 x, over x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a)} \\ \\ 6 \\div 2.236 \\approx 2.683, \\quad \\dfrac{6(2.236)}{5} \\approx 2.683 \\ \\checkmark', '\\text{(b)} \\ \\ \\sqrt{0.3889} \\approx 0.624, \\quad \\dfrac{3.742}{6} \\approx 0.624 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with decimals. For part "A", 6 divided by root 5 is about 2.683, and 6 root 5 over 5 is also about 2.683.', show: 'm.0' },
        { say: 'For part B, 7 over 18 is about 0.3889, and its root is about 0.624. Root 14 over 6 is also about 0.624. Both check out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{6}{\\sqrt{5} \\times \\sqrt{5}} = \\dfrac{6}{5}$', 'multiply the **top** as well, or the value changes'],
            ['$\\dfrac{\\sqrt{7}}{\\sqrt{18}}$', 'still has a **root** in the denominator'],
            ['$\\dfrac{5\\sqrt{5x}}{5x} = \\dfrac{\\sqrt{x}}{x}$', 'only the $5$ **outside** the root cancels'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiply the top and the bottom. Multiplying only the bottom changes the value of the fraction.' },
        { say: 'Root 7 over root 18 is not finished. It still has a root in the denominator.' },
        { say: 'And in part C, the 5 outside the root cancels with the 5 on the bottom. The 5 inside the root stays where it is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Rationalize the denominator: $\\dfrac{4}{\\sqrt{6}}$',
          choices: ['$\\dfrac{4}{6}$', '$\\dfrac{2\\sqrt{6}}{3}$', '$\\dfrac{\\sqrt{6}}{6}$', '$2\\sqrt{6}$'],
          answer: 1,
          working: '$\\dfrac{4}{\\sqrt{6}} \\times \\dfrac{\\sqrt{6}}{\\sqrt{6}} = \\dfrac{4\\sqrt{6}}{6} = \\dfrac{2\\sqrt{6}}{3}$',
        },
      ],
      lines: [
        { say: 'Your turn. Rationalize the denominator of 4 over root 6. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Multiply the top and bottom by root 6, to get 4 root 6 over 6. Then divide the 4 and the 6 by 2: 2 root 6, over 3. That is choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simplest form: **no root** in the denominator', 'Multiply the **top and bottom** by the root', '$\\sqrt{a} \\times \\sqrt{a} = a$', 'Simplify roots and fractions at the end'] }],
      lines: [
        { say: 'Here is what to remember. In simplest form, there is no root in the denominator.', show: 'sum.0' },
        { say: 'To get rid of it, multiply the top and the bottom by that root.', show: 'sum.1' },
        { say: 'A root times itself is the number under it, so the root disappears.', show: 'sum.2' },
        { say: 'And simplify any roots and fractions at the end. For more on dividing radicals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
