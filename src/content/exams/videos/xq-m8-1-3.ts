import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

// Exam question for Math 8 lesson 1.3 (the Pythagorean theorem). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 9.3, Use Properties of Angles, Triangles, and the
// Pythagorean Theorem, CC BY-NC-SA 4.0), with the book's figure description in brackets. The legs
// are 15 and 8: c² = 225 + 64 = 289, and √289 = 17.

const QUESTION =
  'Use the Pythagorean Theorem to find the length of the hypotenuse. [The figure: a right triangle is shown. The right angle is marked with a box. The side across from the right angle is labeled as c. One of the sides touching the right angle is labeled as 15, the other is labeled 8.]';

const tri = (id: string, c: string) =>
  figure(id, [triangle({ A: [0, 0], B: [15, 0], C: [0, 8], right: 'A', sides: { AB: '15', CA: '8', BC: c }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 340);

const video: Explainer = {
  id: 'xq-m8-1-3',
  lessonId: '',
  exam: {
    lesson: 'm8-1-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Hypotenuse (The Pythagorean Theorem)',
  thumbnailTitle: 'Find the Hypotenuse',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: a right triangle has legs of 15 and 8. Use the Pythagorean theorem to find the length of the hypotenuse, c. The theorem says a² + b² = c². So c² = 15² + 8² = 225 + 64 = 289, and c = √289 = 17. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Hypotenuse', subtitle: 'The Pythagorean theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the Pythagorean theorem. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the Pythagorean Theorem to find the length of the hypotenuse. The figure is a right triangle. The sides touching the right angle are $15$ and $8$, and the side across from it is $c$.',
          answer: '$c = 17$',
          working: 'c² = 15² + 8² = 289, c = 17',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Use the Pythagorean Theorem to find the length of the hypotenuse. The figure is a right triangle. The sides touching the right angle are 15 and 8, and the side across from the right angle is "c".' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [tri('ask', 'c')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Legs and hypotenuse', md: 'The two sides that make the **right angle** are the **legs**: $15$ and $8$. The side **across** from the right angle is the **hypotenuse**, $c$. It is always the **longest** side.' }],
      lines: [
        { say: 'Here is the right triangle. The two sides that make the right angle are called the legs. They are 15 and 8.', show: ['ask.shape', 'c'], focus: ['ask.AB', 'ask.CA'] },
        { say: 'The side across from the right angle is the hypotenuse, "c". It is always the longest side. That is what we want to find.', focus: 'ask.BC' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{a}^2 + \\opp{b}^2 = \\good{c}^2', '\\good{c} = \\sqrt{\\adj{a}^2 + \\opp{b}^2}'] }],
      lines: [
        { say: 'Here is what we need. In a right triangle, the square of one leg plus the square of the other leg equals the square of the hypotenuse.', show: 'm.0' },
        { say: 'So to find the hypotenuse, add the squares of the legs, then take the square root.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Square** each leg', '**Add** the squares', 'Take the **square root**'] }],
      lines: [
        { say: 'Here is the plan. Square each leg.', show: 'plan.0' },
        { say: 'Add the squares.', show: 'plan.1' },
        { say: 'Then take the square root.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Square, add, root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = \\adj{15}^2 + \\opp{8}^2', 'c^2 = 225 + 64 = 289', 'c = \\sqrt{289} = \\good{17}'] }],
      lines: [
        { say: 'Step one. Put the legs into the theorem: "c" squared equals 15 squared plus 8 squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 15 squared is 225, and 8 squared is 64. Add them: "c" squared is 289.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. "c" is the square root of 289. 17 times 17 is 289, so "c" is 17. The hypotenuse is 17.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [tri('ck', '17')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['17 > 15 \\text{ and } 17 > 8 \\ \\checkmark', '17 < 15 + 8 = 23 \\ \\checkmark', '17^2 = 289 = 225 + 64 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The hypotenuse must be the longest side, and 17 is longer than both 15 and 8.', show: ['ck.shape', 'm.0'], focus: 'm.0' },
        { say: 'It must also be shorter than the two legs put together, which is 23. 17 is.', show: 'm.1', focus: 'm.1' },
        { say: 'And 17 squared is 289, which is 225 plus 64. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$23$', 'added the legs: add their **squares**'],
            ['$289$', 'stopped at $c^2$: take the **square root**'],
            ['$\\approx 12.7$', 'subtracted the squares: that finds a **leg**, not the hypotenuse'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '23 just adds the two legs. The theorem adds their squares.' },
        { say: '289 is "c" squared, not "c". Take the square root to finish.' },
        { say: 'And about 12.7 comes from 225 minus 64. Subtracting finds a missing leg. Here we want the hypotenuse, so we add.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A right triangle has legs of $9$ cm and $12$ cm. How long is the hypotenuse?',
          choices: ['$15$ cm', '$21$ cm', '$225$ cm', '$7.9$ cm'],
          answer: 0,
          working: '9² + 12² = 81 + 144 = 225, and √225 = 15 cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A right triangle has legs of 9 centimetres and 12 centimetres. How long is the hypotenuse? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '9 squared is 81, and 12 squared is 144. Together they make 225, and the square root of 225 is 15. The hypotenuse is 15 centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a^2 + b^2 = c^2$', 'The **legs** make the right angle', 'Add the **squares**, then take the **root**', 'The hypotenuse is the **longest** side'] }],
      lines: [
        { say: 'Here is what to remember. In a right triangle, "a" squared plus "b" squared equals "c" squared.', show: 'sum.0' },
        { say: 'The legs are the two sides that make the right angle.', show: 'sum.1' },
        { say: 'To find the hypotenuse, add the squares of the legs, then take the square root.', show: 'sum.2' },
        { say: 'And the hypotenuse is always the longest side. For more on the Pythagorean theorem, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
