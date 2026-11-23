import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 4.2 (the product and quotient rules). The question is an
// exercise from OpenStax Calculus Volume 1 (section 3.3, Differentiation Rules, CC BY-NC-SA 4.0),
// word for word without the "[T]" mark. The quotient rule gives s′(t) = 4t/(t² + 2)², so
// s′(3) = 12/121 ≈ 0.0992 ft/s, as in the book's answer. Check: (s(3.001) − s(3))/0.001 ≈ 0.0991.

const QUESTION =
  'A herring swimming along a straight line has traveled s(t) = t²/(t² + 2) feet in t seconds. Determine the velocity of the herring when it has traveled 3 seconds.';

const video: Explainer = {
  id: 'xq-m31-4-2',
  lessonId: '',
  exam: {
    lesson: 'm31-4-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.3, Differentiation Rules',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-3-differentiation-rules',
    question: QUESTION,
  },
  title: 'Exam Question: A Herring’s Velocity from s(t) = t²/(t² + 2) (The Quotient Rule)',
  thumbnailTitle: 'How Fast Is the Herring?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a herring has swum s(t) = t²/(t² + 2) feet after t seconds. Find its velocity at 3 seconds. Velocity is the derivative of position, and s is a quotient, so we use the quotient rule: s′(t) = 4t/(t² + 2)². At t = 3 that is 12/121 ≈ 0.0992 feet per second. Then we check with a tiny secant slope and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Is the Herring?', subtitle: 'The quotient rule, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the quotient rule. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A herring swimming along a straight line has traveled $s(t) = \\dfrac{t^2}{t^2 + 2}$ feet in $t$ seconds. Determine the velocity of the herring when it has traveled 3 seconds.',
          answer: '$s\'(3) = \\dfrac{12}{121} \\approx 0.0992$ ft/s',
          working: '$s\'(t) = \\dfrac{4t}{(t^2 + 2)^2}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A herring swimming along a straight line has travelled s of t equals t squared over t squared plus 2 feet in t seconds. Determine the velocity of the herring when it has travelled 3 seconds.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['v(t) = s\'(t), \\quad \\text{find } v(3)'] },
        { kind: 'text', id: 't', size: 'md', md: 'Velocity is how fast the position changes: the **derivative** of $s$. Here $s$ is one expression **divided** by another, so we need the **quotient rule**.' },
      ],
      lines: [
        { say: 'Here is what it is asking. Velocity is how fast the position changes: the derivative of s. We want it at 3 seconds.', show: 'm' },
        { say: 'Here s is one expression divided by another, so we need the quotient rule.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\left(\\dfrac{f}{g}\\right)\' = \\dfrac{f\'g - fg\'}{g^2}'] },
        { kind: 'callout', id: 'c', tone: 'tip', title: 'Remember the order', md: '"Low d-high minus high d-low, over the square of what\'s below." The **minus** means the order matters.' },
      ],
      lines: [
        { say: 'Here is what we need. The derivative of f over g is f prime g, minus f g prime, all over g squared.', show: 'f' },
        { say: 'A rhyme helps: low d high, minus high d low, over the square of what is below. Because of the minus sign, the order matters.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the **top** $f$ and the **bottom** $g$, and differentiate each', 'Put them into the **quotient rule** and simplify', 'Substitute $t = 3$'] }],
      lines: [
        { say: 'Here is the plan. Name the top and the bottom, and differentiate each.', show: 'plan.0' },
        { say: 'Put them into the quotient rule, and simplify.', show: 'plan.1' },
        { say: 'Then substitute t equals 3.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The pieces',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f = t^2, \\quad f\' = 2t', 'g = t^2 + 2, \\quad g\' = 2t'] }],
      lines: [
        { say: 'Step one. The top is t squared. Its derivative is 2t.', show: 'm.0' },
        { say: 'The bottom is t squared plus 2. Its derivative is also 2t, because the 2 is a constant.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The quotient rule',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s\'(t) = \\dfrac{2t(t^2 + 2) - t^2(2t)}{(t^2 + 2)^2}', '= \\dfrac{2t^3 + 4t - 2t^3}{(t^2 + 2)^2}', '= \\good{\\dfrac{4t}{(t^2 + 2)^2}}'] }],
      lines: [
        { say: 'Step two. f prime g is 2t times t squared plus 2. Minus f g prime, which is t squared times 2t. All over t squared plus 2, squared.', show: 'm.0' },
        { say: 'Multiply out the top: 2 t cubed plus 4t, minus 2 t cubed.', show: 'm.1' },
        { say: 'The t cubed terms cancel, leaving 4t over t squared plus 2, squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: At 3 seconds',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s\'(3) = \\dfrac{4(3)}{(9 + 2)^2} = \\dfrac{12}{121}', '\\approx \\good{0.0992 \\text{ ft/s}}'] }],
      lines: [
        { say: 'Step three. Put t equals 3 in: 4 times 3 is 12, and 9 plus 2 is 11, squared is 121. So 12 over 121.', show: 'm.0' },
        { say: 'That is about 0.0992 feet per second. The herring is moving slowly at 3 seconds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s(3) = \\dfrac{9}{11} \\approx 0.8181818, \\quad s(3.001) \\approx 0.8182810', '\\dfrac{0.8182810 - 0.8181818}{0.001} \\approx 0.0991 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. At 3 seconds the herring has gone 9 elevenths of a foot, about 0.8181818. At 3.001 seconds, about 0.8182810.', show: 'm.0' },
        { say: 'Over that thousandth of a second, it moves at about 0.0991 feet per second, very close to our answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{2t}{2t} = 1$', 'the derivative of a quotient is **not** the quotient of the derivatives'],
            ['$fg\' - f\'g$ on top', 'the **wrong order** flips the sign'],
            ['$s(3) = \\dfrac{9}{11}$', 'that is the **distance**, not the velocity'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot just divide the two derivatives. That would give 1, which is wrong.' },
        { say: 'Swapping the order on top flips the sign of the answer. It is f prime g first.' },
        { say: 'And s of 3 is how far the herring has gone, not how fast it is going.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An object has moved $s(t) = \\dfrac{t}{t + 1}$ metres after $t$ seconds. What is its velocity at $t = 1$?',
          choices: ['$\\dfrac{1}{2}$ m/s', '$1$ m/s', '$\\dfrac{1}{4}$ m/s', '$-\\dfrac{1}{4}$ m/s'],
          answer: 2,
          working: '$s\'(t) = \\dfrac{1(t + 1) - t(1)}{(t + 1)^2} = \\dfrac{1}{(t + 1)^2}$, so $s\'(1) = \\dfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. An object has moved t over t plus 1 metres after t seconds. What is its velocity at 1 second? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The quotient rule gives 1 times t plus 1, minus t times 1, over t plus 1 squared. The top is just 1. At t equals 1, that is 1 over 4. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Velocity is the **derivative** of position', 'Quotient rule: $\\dfrac{f\'g - fg\'}{g^2}$', 'Keep the **order**: top\'s derivative first', 'Simplify the top **before** you substitute'] }],
      lines: [
        { say: 'Here is what to remember. Velocity is the derivative of position.', show: 'sum.0' },
        { say: 'The quotient rule is f prime g minus f g prime, over g squared.', show: 'sum.1' },
        { say: 'Keep the order: the derivative of the top comes first.', show: 'sum.2' },
        { say: 'And simplify the top before you substitute. For more on the product and quotient rules, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
