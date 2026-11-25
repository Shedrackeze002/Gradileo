import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shape, shapeIds } from '@/content/math9/videos/lib/m9-7-figures.ts';

// Exam question for Math 9 lesson 7.3 (similar polygons). The question is a Try It from OpenStax
// Elementary Algebra 2e, word for word (section 8.7, Solve Proportion and Similar Figure
// Applications, CC BY-NC-SA 4.0). The sun's rays hit both at the same angle, so the triangles
// (height, shadow) are similar: h/50 = 8/10, h = 50 × 0.8 = 40 ft. Check: 50/10 = 5 and 40/8 = 5.

const QUESTION =
  'A telephone pole casts a shadow that is 50 feet long. Nearby, an 8 foot tall traffic sign casts a shadow that is 10 feet long. How tall is the telephone pole?';

// Drawn at 1 unit = 5 ft for the pole and 1 unit = 2 ft for the sign, so both fit side by side.
const tris = (id: string, solved: boolean) =>
  figure(
    id,
    [
      shape({ name: 's', pts: [[0, 0], [5, 0], [0, 4]], tone: 'adj', rights: [0], sides: [{ tone: 'adj', label: '10\\text{ ft}' }, undefined, { tone: 'opp', label: '8\\text{ ft}' }] }),
      shape({ name: 'p', pts: [[8, 0], [18, 0], [8, 8]], tone: 'good', rights: [0], sides: [{ tone: 'adj', label: '50\\text{ ft}' }, undefined, { tone: 'opp', label: solved ? '40\\text{ ft}' : 'h' }] }),
    ],
    420,
  );

const video: Explainer = {
  id: 'xq-m9-7-3',
  lessonId: '',
  exam: {
    lesson: 'm9-7-3',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 8.7, Solve Proportion and Similar Figure Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/8-7-solve-proportion-and-similar-figure-applications',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Telephone Pole? (Similar Polygons)',
  thumbnailTitle: 'How Tall Is the Telephone Pole?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: a telephone pole casts a shadow 50 feet long. Nearby, an 8 foot tall traffic sign casts a shadow 10 feet long. How tall is the pole? The sun shines on both at the same angle, so each object and its shadow make similar right triangles. Matching sides are in proportion: h/50 = 8/10, so h = 40 feet. Then we check with the scale factor and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Telephone Pole?', subtitle: 'Similar polygons, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about similar polygons. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A telephone pole casts a shadow that is $50$ feet long. Nearby, an $8$ foot tall traffic sign casts a shadow that is $10$ feet long. How tall is the telephone pole?',
          answer: '$40$ feet',
          working: 'h/50 = 8/10',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A telephone pole casts a shadow that is 50 feet long. Nearby, an 8 foot tall traffic sign casts a shadow that is 10 feet long. How tall is the telephone pole?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [tris('ask', false)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Similar triangles', md: '**Similar** triangles have the same shape: equal angles, and matching sides in the **same ratio**. The sun hits the pole and the sign at the **same angle**.' }],
      lines: [
        { say: 'Here is the sign and its shadow, and the pole and its shadow. Each makes a right triangle, with the sun\'s ray along the slanted side.', show: [...shapeIds('ask', 's', { lens: true }), ...shapeIds('ask', 'p', { lens: true })] },
        { say: 'The sun hits both at the same angle, so the triangles have the same shape. They are similar: equal angles, and matching sides in the same ratio.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\text{height}_1}{\\text{shadow}_1} = \\dfrac{\\text{height}_2}{\\text{shadow}_2}'] }],
      lines: [
        { say: 'Here is what we need. In similar triangles, the ratio of height to shadow is the same in both. Match height with height, and shadow with shadow.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Let $h$ be the pole\'s **height**', 'Write a **proportion**: height over shadow', '**Solve** for $h$'] }],
      lines: [
        { say: 'Here is the plan. Let "h" be the height of the pole.', show: 'plan.0' },
        { say: 'Write a proportion: height over shadow, for both.', show: 'plan.1' },
        { say: 'Then solve for "h".', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: A proportion',
      layout: 'split',
      leftWidth: 600,
      left: [tris('st', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{h}{50} = \\dfrac{8}{10}', 'h = 50 \\times \\dfrac{8}{10}', 'h = \\good{40 \\text{ ft}}'] }],
      lines: [
        { say: 'Here are the two triangles again.', show: [...shapeIds('st', 's', { lens: true }), 'st.p', 'st.p-len0'] },
        { say: 'Step one. Let "h" be the height of the pole. Step two. Height over shadow for the pole, "h" over 50, equals height over shadow for the sign, 8 over 10.', show: 'm.0', focus: 'm.0' },
        { say: 'Step three. Multiply both sides by 50, to get "h" on its own.', show: 'm.1', focus: 'm.1' },
        { say: '8 over 10 is 0.8, and 50 times 0.8 is 40. The telephone pole is 40 feet tall.', show: ['m.2', 'st.p-len2'], focus: ['m.2', 'st.p-len2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{shadows: } 50 \\div 10 = 5', '\\text{heights: } 40 \\div 8 = 5 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the scale factor. The pole\'s shadow is 50 divided by 10, which is 5 times as long as the sign\'s.', show: 'm.0', focus: 'm.0' },
        { say: 'So the pole should be 5 times as tall too: 40 divided by 8 is 5. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$62.5$ ft', 'matched height with **shadow**: $\\tfrac{h}{50} = \\tfrac{10}{8}$'],
            ['$48$ ft', 'added the difference ($+40$): similar means **multiply**'],
            ['$6.4$ ft', 'divided the wrong way: the pole is **taller**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '62.5 feet flips the sign\'s ratio. Match height with height, and shadow with shadow: 8 over 10, not 10 over 8.' },
        { say: '48 feet says the shadow grew by 40, so the height grows by 40. But similar figures grow by multiplying, not adding.' },
        { say: 'And 6.4 feet makes the pole shorter than the sign, which cannot be right, since its shadow is longer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $2$ m tall post casts a $3$ m shadow. At the same time, a tree casts a $12$ m shadow. How tall is the tree?',
          choices: ['$18$ m', '$11$ m', '$6$ m', '$8$ m'],
          answer: 3,
          working: 'h/12 = 2/3, so h = 12 × 2/3 = 8 m.',
        },
      ],
      lines: [
        { say: 'Your turn. A 2 metre tall post casts a 3 metre shadow. At the same time, a tree casts a 12 metre shadow. How tall is the tree? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '"h" over 12 equals 2 over 3. Multiply by 12: 12 times 2 thirds is 8. The tree is 8 metres tall. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same sun angle: **similar** triangles', 'Match **height** with height, **shadow** with shadow', 'Solve the **proportion**', 'Check with the **scale factor**'] }],
      lines: [
        { say: 'Here is what to remember. Objects lit by the sun at the same time make similar triangles with their shadows.', show: 'sum.0' },
        { say: 'Match height with height, and shadow with shadow.', show: 'sum.1' },
        { say: 'Solve the proportion.', show: 'sum.2' },
        { say: 'And check with the scale factor. For more on similar polygons, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
