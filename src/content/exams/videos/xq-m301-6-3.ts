import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 6.3 (proving identities). The question is an exercise from
// OpenStax Precalculus 2e, word for word (section 7.1, Solving Trigonometric Equations with
// Identities, CC BY-NC-SA 4.0), with its set's instruction in front of it. Working on the left side
// only: cos²x = 1 − sin²x and tan²x = sec²x − 1, so cos²x − tan²x = 1 − sin²x − sec²x + 1 =
// 2 − sin²x − sec²x, as in the book's sample proof. At x = π/4 both sides are −1/2.

const QUESTION = 'Verify the identity. cos²x − tan²x = 2 − sin²x − sec²x';

const video: Explainer = {
  id: 'xq-m301-6-3',
  lessonId: '',
  exam: {
    lesson: 'm301-6-3',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.1, Solving Trigonometric Equations with Identities',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-1-solving-trigonometric-equations-with-identities',
    question: QUESTION,
  },
  title: 'Exam Question: Prove cos²x − tan²x = 2 − sin²x − sec²x (Proving Identities)',
  thumbnailTitle: 'Verify a Pythagorean Identity',
  thumbnail: 'ids',
  summary:
    'A real test question, solved one small step at a time: verify the identity cos²x − tan²x = 2 − sin²x − sec²x. We work on the left side only, swap cos²x for 1 − sin²x and tan²x for sec²x − 1, and tidy up until it matches the right side. Then we check with x = π/4 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Verify a Pythagorean Identity', subtitle: 'Proving identities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about proving trigonometric identities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Precalculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Verify the identity. $\\cos^2 x - \\tan^2 x = 2 - \\sin^2 x - \\sec^2 x$',
          answer: '$\\cos^2 x - \\tan^2 x = (1 - \\sin^2 x) - (\\sec^2 x - 1) = 2 - \\sin^2 x - \\sec^2 x$',
          working: 'Work on the left side only: $\\cos^2 x = 1 - \\sin^2 x$ and $\\tan^2 x = \\sec^2 x - 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Verify the identity. cos squared x minus tan squared x equals 2, minus sin squared x, minus sec squared x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Show that the two sides are **always** equal. We change **one side** with identities, one step at a time, until it looks **exactly** like the other side.' }],
      lines: [
        { say: 'To verify an identity, we show the two sides are equal for every x where they are defined.', show: 't' },
        { say: 'We do not solve it like an equation. We change one side with identities, one step at a time, until it looks exactly like the other side.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ids', size: 'lg', lines: ['\\sin^2 x + \\cos^2 x = 1 \\ \\Rightarrow \\ \\cos^2 x = 1 - \\sin^2 x', '1 + \\tan^2 x = \\sec^2 x \\ \\Rightarrow \\ \\tan^2 x = \\sec^2 x - 1'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Match the target', md: 'The right side has $\\sin^2 x$ and $\\sec^2 x$, so rewrite $\\cos^2 x$ and $\\tan^2 x$ **in those**.' },
      ],
      lines: [
        { say: 'Here is what we need: two Pythagorean identities. sin squared plus cos squared is 1, so cos squared x is 1 minus sin squared x.', show: 'ids.0' },
        { say: 'And 1 plus tan squared is sec squared, so tan squared x is sec squared x minus 1.', show: 'ids.1' },
        { say: 'The right side uses sin squared and sec squared. So rewrite the left side in those.', show: 'tip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Start with the **left side** only', 'Swap $\\cos^2 x$ and $\\tan^2 x$ with **Pythagorean identities**', '**Tidy up** until it matches the right side'] }],
      lines: [
        { say: 'Here is the plan. First, start with the left side only.', show: 'plan.0' },
        { say: 'Second, swap cos squared x and tan squared x using the Pythagorean identities.', show: 'plan.1' },
        { say: 'Third, tidy up until it matches the right side.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The left side',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{LS} = \\cos^2 x - \\tan^2 x'] }],
      lines: [
        { say: 'Step one. Write down the left side, and call it L S. We will not touch the right side.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Swap',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{LS} = \\good{(1 - \\sin^2 x)} - \\tan^2 x', '\\text{LS} = (1 - \\sin^2 x) - \\good{(\\sec^2 x - 1)}'] }],
      lines: [
        { say: 'Step two. Replace cos squared x with 1 minus sin squared x.', show: 'm.0' },
        { say: 'Then replace tan squared x with sec squared x minus 1. Keep it in brackets, because the minus sign in front belongs to all of it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Tidy up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{LS} = 1 - \\sin^2 x - \\sec^2 x + 1', '\\text{LS} = \\good{2 - \\sin^2 x - \\sec^2 x} = \\text{RS} \\ \\checkmark'] }],
      lines: [
        { say: 'Step three. Open the brackets. The minus in front of the second bracket changes both signs: minus sec squared x, plus 1.', show: 'm.0' },
        { say: '1 plus 1 is 2, so the left side is 2, minus sin squared x, minus sec squared x. That is exactly the right side, so the identity is verified.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = \\dfrac{\\pi}{4}: \\quad \\text{LS} = \\dfrac{1}{2} - 1 = {-\\dfrac{1}{2}}', '\\text{RS} = 2 - \\dfrac{1}{2} - 2 = {-\\dfrac{1}{2}} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with x equals pi over 4. cos squared is one half and tan squared is 1, so the left side is one half minus 1, which is negative one half.', show: 'm.0' },
        { say: 'sin squared is one half and sec squared is 2, so the right side is 2 minus one half minus 2, which is also negative one half. They match.', show: 'm.1', focus: 'm.1' },
        { say: 'One value cannot prove an identity, but it is a quick way to catch a mistake.' },
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
            ['moving terms across the $=$', 'we do not know they are equal yet: change **one side** only'],
            ['$\\tan^2 x = 1 - \\sec^2 x$', 'it is $\\sec^2 x - 1$, since $\\sec^2 x = 1 + \\tan^2 x$'],
            ['$- \\sec^2 x - 1$', 'the minus changes **both** signs in the bracket: $- \\sec^2 x + 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not move terms from one side to the other, as in an equation. We do not know the sides are equal yet. Change one side only.' },
        { say: 'Get the identity the right way round. sec squared is 1 plus tan squared, so tan squared is sec squared minus 1.' },
        { say: 'And the minus sign in front of the bracket changes both signs inside it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Divide $\\sin^2 x + \\cos^2 x = 1$ by $\\sin^2 x$. Which identity do you get?',
          choices: ['$\\tan^2 x + 1 = \\sec^2 x$', '$1 + \\cot^2 x = \\sec^2 x$', '$1 + \\tan^2 x = \\csc^2 x$', '$1 + \\cot^2 x = \\csc^2 x$'],
          answer: 3,
          working: '$\\dfrac{\\sin^2 x}{\\sin^2 x} + \\dfrac{\\cos^2 x}{\\sin^2 x} = \\dfrac{1}{\\sin^2 x}$, so $1 + \\cot^2 x = \\csc^2 x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Divide sin squared x plus cos squared x equals 1 by sin squared x. Which identity do you get? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'sin squared over sin squared is 1. cos squared over sin squared is cot squared. And 1 over sin squared is csc squared. So 1 plus cot squared x equals csc squared x: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Change **one side** until it matches the other', 'Rewrite in the functions the **other side** uses', '$\\cos^2 x = 1 - \\sin^2 x$, $\\ \\tan^2 x = \\sec^2 x - 1$', 'A test value catches mistakes, but is **not** a proof'] }],
      lines: [
        { say: 'Here is what to remember. To prove an identity, change one side until it matches the other.', show: 'sum.0' },
        { say: 'Rewrite it in the functions that the other side uses.', show: 'sum.1' },
        { say: 'cos squared x is 1 minus sin squared x, and tan squared x is sec squared x minus 1.', show: 'sum.2' },
        { say: 'And a test value catches mistakes, but it is not a proof. For more on proving identities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
