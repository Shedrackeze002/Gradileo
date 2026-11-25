import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, piece, seg, triangle } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Exam question for Math 6 lesson 9.2 (area of a triangle). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 9.4, Use Properties of Rectangles, Triangles, and
// Trapezoids, CC BY-NC-SA 4.0). A triangle is half of a parallelogram with the same base and
// height: (14 × 7) ÷ 2 = 98 ÷ 2 = 49 square inches. The figure is drawn at half size (7 by 3.5).

const QUESTION = 'Find the area of a triangle with base 14 inches and height 7 inches.';

const L = { b: '14\\text{ in}', h: '7\\text{ in}' };

const tri = (id: string) => figure(id, [triangle({ b: 7, apex: [2.5, 3.5], labels: L })]);

// The same triangle and a copy turned round, making a parallelogram with the same base and height.
const halves = (id: string) =>
  figure(id, [
    join(
      piece('copy', [[7, 0], [9.5, 3.5], [2.5, 3.5]], { tone: 'muted', shade: 0.12, dashed: true }),
      triangle({ b: 7, apex: [2.5, 3.5], labels: L }),
      seg('top', [2.5, 3.5], [9.5, 3.5], { tone: 'muted', dashed: true, weight: 2.5 }),
    ),
  ]);

const video: Explainer = {
  id: 'xq-m6-9-2',
  lessonId: '',
  exam: {
    lesson: 'm6-9-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: Area of a Triangle, Base 14 in and Height 7 in (Area of a Triangle)',
  thumbnailTitle: 'Area of a Triangle',
  thumbnail: 'tr',
  summary:
    'A real test question, solved one small step at a time: find the area of a triangle with a base of 14 inches and a height of 7 inches. Two copies of a triangle make a parallelogram, so a triangle is half of base times height: (14 × 7) ÷ 2 = 98 ÷ 2 = 49 square inches. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Area of a Triangle', subtitle: 'Half of base times height, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area of a triangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the area of a triangle with base $14$ inches and height $7$ inches.',
          answer: '$49$ square inches',
          working: '(14 × 7) ÷ 2 = 49',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the area of a triangle with base 14 inches and height 7 inches.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 480,
      left: [tri('tr')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Base and height', md: 'The **base** is the side the triangle sits on. The **height** is the **straight-up** distance from the base to the top corner, at a right angle. **Area** is the number of square inches inside.' }],
      lines: [
        { say: 'Here is the triangle. The base is the side it sits on: 14 inches.', show: ['tr.shape', 'tr.base', 'c'], focus: 'tr.base' },
        { say: 'The height is the straight up distance from the base to the top corner, at a right angle: 7 inches. The area is how many square inches fit inside.', show: 'tr.h', focus: 'tr.h' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 560,
      left: [halves('hv')],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Area of a triangle', md: 'Two copies of a triangle fit together to make a **parallelogram** with the same base and height. So a triangle is **half** of it: $A = \\tfrac{1}{2} \\times b \\times h$.' }],
      lines: [
        { say: 'Here is what we need. Take the triangle, and a copy of it turned around.', show: ['hv.shape', 'hv.base', 'hv.h'] },
        { say: 'Together they make a parallelogram, with the same base and the same height. Its area is base times height.', show: ['hv.copy', 'hv.top', 'c'], focus: 'hv.copy' },
        { say: 'The triangle is exactly half of it. So the area of a triangle is half of base times height.', focus: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply the **base** by the **height**', 'Take **half**', 'Write the units: **square** inches'] }],
      lines: [
        { say: 'Here is the plan. Multiply the base by the height.', show: 'plan.0' },
        { say: 'Take half.', show: 'plan.1' },
        { say: 'Then write the answer in square inches.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Half of base times height',
      layout: 'split',
      leftWidth: 480,
      left: [tri('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b \\times h = 14 \\times 7 = 98', '98 \\div 2 = 49', 'A = \\good{49 \\text{ in}^2}'] }],
      lines: [
        { say: 'Step one. The base is 14 inches and the height is 7 inches. 14 times 7 is 98. That is the area of the whole parallelogram.', show: ['st.shape', 'st.base', 'st.h', 'm.0'], focus: 'm.0' },
        { say: 'Step two. The triangle is half of that. 98 divided by 2 is 49.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. The area is 49 square inches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{2} \\times 14 = 7, \\quad 7 \\times 7 = 49 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by taking half first. Half of the base, 14, is 7. Then 7 times the height, 7, is 49. The same answer. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$98$ in²', 'forgot to **halve**: that is the parallelogram'],
            ['$21$ in²', '**added** $14$ and $7$: area **multiplies**'],
            ['$49$ in', 'area is in **square** inches'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '98 forgets to take half. That is the area of the whole parallelogram, two triangles.' },
        { say: '21 adds the base and the height. Area multiplies.' },
        { say: 'And 49 inches has the wrong units. Area is measured in square inches.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A triangle has a base of $10$ m and a height of $6$ m. What is its area?',
          choices: ['$60$ m²', '$16$ m²', '$30$ m²', '$8$ m²'],
          answer: 2,
          working: 'Area = (10 × 6) ÷ 2 = 60 ÷ 2 = 30 m².',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has a base of 10 metres and a height of 6 metres. What is its area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '10 times 6 is 60, and half of 60 is 30 square metres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two triangles make a **parallelogram**', '$A = \\tfrac{1}{2} \\times b \\times h$', 'The height is **straight up** from the base', 'Area is in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. Two copies of a triangle make a parallelogram.', show: 'sum.0' },
        { say: 'So the area of a triangle is half of base times height.', show: 'sum.1' },
        { say: 'The height is the straight up distance from the base to the top corner.', show: 'sum.2' },
        { say: 'And area is measured in square units. For more on the area of a triangle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
