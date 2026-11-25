import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

// Exam question for Math 8 lesson 1.4 (using the Pythagorean theorem). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 9.3, Use Properties of Angles, Triangles, and
// the Pythagorean Theorem, CC BY-NC-SA 4.0). The ladder is the hypotenuse, 13 ft, and the ground
// is a leg, 5 ft: h² = 13² − 5² = 169 − 25 = 144, so h = 12 ft.

const QUESTION = 'John puts the base of a 13-ft ladder 5 feet from the wall of his house. How far up the wall does the ladder reach?';

// The wall runs up from A to C, the ground from A to B, and the ladder leans from B to C.
const ladder = (id: string, h: string) =>
  figure(id, [triangle({ A: [0, 0], B: [5, 0], C: [0, 12], right: 'A', sides: { AB: '5 \\text{ ft}', CA: h, BC: '13 \\text{ ft}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 420);

const video: Explainer = {
  id: 'xq-m8-1-4',
  lessonId: '',
  exam: {
    lesson: 'm8-1-4',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: John’s Ladder (Using the Pythagorean Theorem)',
  thumbnailTitle: 'John’s Ladder',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: John puts the base of a 13-foot ladder 5 feet from the wall of his house. How far up the wall does the ladder reach? The wall, the ground and the ladder make a right triangle, and the ladder is the hypotenuse. So h² + 5² = 13², which gives h² = 169 − 25 = 144, and h = 12 feet. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'John’s Ladder', subtitle: 'Using the Pythagorean theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using the Pythagorean theorem. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'John puts the base of a $13$-ft ladder $5$ feet from the wall of his house. How far up the wall does the ladder reach?',
          answer: '$12$ feet',
          working: 'h² + 5² = 13², h² = 144, h = 12',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'John puts the base of a 13 foot ladder 5 feet from the wall of his house. How far up the wall does the ladder reach?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 460,
      left: [ladder('ask', 'h')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Draw a right triangle', md: 'The **wall** stands straight up from the **ground**, so they make a **right angle**. The **ladder** leans across, so it is the **hypotenuse**, $13$ ft. We want the height up the wall, $h$.' }],
      lines: [
        { say: 'Draw a picture. The wall stands straight up from the ground, so they make a right angle.', show: ['ask.shape', 'c'], focus: ['ask.AB', 'ask.CA'] },
        { say: 'The ladder leans across, from the ground to the wall. It is across from the right angle, so the ladder is the hypotenuse: 13 feet.', focus: 'ask.BC' },
        { say: 'The ground from the wall to the ladder is a leg, 5 feet. We want the other leg, the height up the wall. Call it "h".', focus: 'ask.CA' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{leg}^2 + \\text{leg}^2 = \\text{hypotenuse}^2', '\\text{missing leg}^2 = \\text{hypotenuse}^2 - \\text{known leg}^2'] }],
      lines: [
        { say: 'Here is what we need. In a right triangle, the two legs squared add up to the hypotenuse squared.', show: 'm.0' },
        { say: 'So when the missing side is a leg, take the known leg squared away from the hypotenuse squared.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **hypotenuse**: the ladder', 'Write the theorem with $h$ as a **leg**', '**Subtract**, then take the **square root**'] }],
      lines: [
        { say: 'Here is the plan. Find the hypotenuse: it is the ladder.', show: 'plan.0' },
        { say: 'Write the theorem, with "h" as a leg.', show: 'plan.1' },
        { say: 'Then subtract, and take the square root.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Set up and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['h^2 + \\adj{5}^2 = 13^2', 'h^2 + 25 = 169', 'h^2 = 169 - 25 = 144', 'h = \\sqrt{144} = \\good{12 \\text{ ft}}'] }],
      lines: [
        { say: 'Step one. The legs are "h" and 5, and the hypotenuse is 13. So "h" squared plus 5 squared equals 13 squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 5 squared is 25, and 13 squared is 169.', show: 'm.1', focus: 'm.1' },
        { say: 'Take 25 away from both sides. "h" squared is 169 minus 25, which is 144.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. "h" is the square root of 144, which is 12. The ladder reaches 12 feet up the wall.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 460,
      left: [ladder('ck', '12 \\text{ ft}')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12^2 + 5^2 = 144 + 25', '= 169 = 13^2 \\ \\checkmark', '12 < 13: \\text{ the ladder is longest} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put 12 back into the triangle. 12 squared plus 5 squared is 144 plus 25.', show: ['ck.shape', 'm.0'], focus: 'm.0' },
        { say: 'That is 169, which is 13 squared, the ladder.', show: 'm.1', focus: 'm.1' },
        { say: 'And 12 feet is less than the 13 foot ladder, as it must be, because the hypotenuse is the longest side. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$\\approx 13.9$ ft', 'added the squares: the ladder is the **hypotenuse**, so **subtract**'],
            ['$8$ ft', 'subtracted the lengths: subtract the **squares**'],
            ['$144$ ft', 'stopped at $h^2$: take the **square root**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'About 13.9 feet comes from adding 169 and 25. That treats the ladder as a leg. The ladder is the hypotenuse, so subtract. Besides, the wall height cannot be longer than the ladder.' },
        { say: '8 feet is 13 minus 5. Subtract the squares, not the lengths.' },
        { say: 'And 144 is "h" squared. Take the square root to get 12.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $10$ m ladder leans against a wall, with its base $6$ m from the wall. How far up the wall does it reach?',
          choices: ['$4$ m', '$16$ m', '$8$ m', '$11.7$ m'],
          answer: 2,
          working: 'h² = 10² − 6² = 100 − 36 = 64, so h = 8 m.',
        },
      ],
      lines: [
        { say: 'Your turn. A 10 metre ladder leans against a wall, with its base 6 metres from the wall. How far up the wall does it reach? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The ladder is the hypotenuse. 10 squared is 100, and 6 squared is 36. 100 minus 36 is 64, and the square root of 64 is 8. It reaches 8 metres up. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Draw** the right triangle', 'The side across from the right angle is the **hypotenuse**', 'Missing leg: **subtract** the squares', '**Square root** last, then check'] }],
      lines: [
        { say: 'Here is what to remember. Draw the right triangle from the story.', show: 'sum.0' },
        { say: 'The side across from the right angle is the hypotenuse. Here, it was the ladder.', show: 'sum.1' },
        { say: 'To find a missing leg, subtract the squares.', show: 'sum.2' },
        { say: 'Take the square root last, then check. For more on using the Pythagorean theorem, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
