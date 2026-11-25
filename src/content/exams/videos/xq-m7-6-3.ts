import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 6.3 (solving one-step equations). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 8.2, Solve Equations Using the Division and
// Multiplication Properties of Equality, CC BY-NC-SA 4.0). 4z = −52: divide both sides by 4,
// z = −13, and 4(−13) = −52 checks.

const QUESTION = 'Solve: 4z = −52.';

const video: Explainer = {
  id: 'xq-m7-6-3',
  lessonId: '',
  exam: {
    lesson: 'm7-6-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 8.2, Solve Equations Using the Division and Multiplication Properties of Equality',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/8-2-solve-equations-using-the-division-and-multiplication-properties-of-equality',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 4z = −52 (Solving One-Step Equations)',
  thumbnailTitle: 'Solve 4z = −52',
  summary:
    'A real test question, solved one small step at a time: solve 4z = −52. 4z means 4 times z, so undo the multiplication by dividing both sides by 4. A negative divided by a positive is negative, so z = −52 ÷ 4 = −13. Then we check, 4 × (−13) = −52, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 4z = −52', subtitle: 'Solving one-step equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a one-step equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve: $4z = -52$.',
          answer: '$z = -13$',
          working: '4z ÷ 4 = −52 ÷ 4, z = −13',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: 4 "z" equals negative 52.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'What 4z means', md: '$4z$ means **$4$ times $z$**. The equation says: $4$ times some number is $-52$. **Solve** means find that number, the value of $z$ that makes it **true**.' }],
      lines: [
        { say: '4 "z" means 4 times "z". So the equation says: 4 times some number is negative 52.', show: 'c' },
        { say: 'To solve it, we find that number: the value of "z" that makes the equation true.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Undo with the opposite', md: '**Division undoes multiplication.** Divide **both sides** by the same number, and the equation stays **balanced**. And a **negative** divided by a **positive** is **negative**.' }],
      lines: [
        { say: 'Here is what we need. Division undoes multiplication. If we divide both sides by the same number, the equation stays balanced.', show: 'c' },
        { say: 'And a negative number divided by a positive number gives a negative answer.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['$z$ is **multiplied** by $4$', 'Divide **both sides** by $4$', 'Watch the **sign**, then check'] }],
      lines: [
        { say: 'Here is the plan. "z" is multiplied by 4.', show: 'plan.0' },
        { say: 'So divide both sides by 4.', show: 'plan.1' },
        { say: 'Watch the sign, then check.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide both sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4z = -52', '\\dfrac{4z}{\\adj{4}} = \\dfrac{-52}{\\adj{4}}', '\\good{z = -13}'] }],
      lines: [
        { say: 'Step one. Here is the equation: 4 "z" equals negative 52. "z" is being multiplied by 4.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. To undo times 4, divide both sides by 4. On the left, 4 "z" divided by 4 leaves just "z".', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. On the right, 52 divided by 4 is 13, and a negative divided by a positive is negative. So "z" is negative 13.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4(-13) = -52', '-52 = -52 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put negative 13 back in for "z": 4 times negative 13.', show: 'm.0' },
        { say: '4 times 13 is 52, and a positive times a negative is negative: negative 52. Both sides match. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$z = 13$', 'lost the **sign**: negative $\\div$ positive is **negative**'],
            ['$z = -56$', 'subtracted $4$: $4z$ means **times**, so **divide**'],
            ['$z = -208$', 'multiplied by $4$: undo times with **divide**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"z" equals 13 loses the sign. Check it: 4 times 13 is positive 52, not negative 52.' },
        { say: 'Negative 56 subtracts 4 from both sides, as if the equation were "z" plus 4. But 4 "z" means 4 times "z", so divide.' },
        { say: 'And negative 208 multiplies by 4 instead of dividing. To undo times 4, divide by 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $-6p = 42$.',
          choices: ['$p = -7$', '$p = 7$', '$p = 36$', '$p = -252$'],
          answer: 0,
          working: 'Divide both sides by −6: p = 42 ÷ (−6) = −7.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: negative 6 "p" equals 42. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide both sides by negative 6. 42 divided by negative 6 is negative 7. Check: negative 6 times negative 7 is 42. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$4z$ means $4$ **times** $z$', '**Divide** both sides to undo it', 'Watch the **signs**', '**Substitute** back to check'] }],
      lines: [
        { say: 'Here is what to remember. 4 "z" means 4 times "z".', show: 'sum.0' },
        { say: 'Divide both sides by the number, to undo the multiplying.', show: 'sum.1' },
        { say: 'Watch the signs.', show: 'sum.2' },
        { say: 'And substitute your answer back to check. For more on solving one-step equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
