import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cutAndSlide, parallelogram } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Exam question for Math 6 lesson 9.1 (area of a parallelogram). The question is an exercise from
// OpenStax Contemporary Mathematics, word for word (section 10.6, Area, CC BY-NC-SA 4.0). Area = base ×
// height = 20 × 22 = 440 square inches. The figure is drawn at a fifth of the size (4 by 4.4).

const QUESTION = 'Find the area of a parallelogram with base equal to 20 in, and height equal to 22 in.';

const L = { b: '20\\text{ in}', h: '22\\text{ in}' };

const shape = (id: string) => figure(id, [parallelogram({ b: 4, h: 4.4, s: 1.6, labels: L })]);
const slide = (id: string) => figure(id, [cutAndSlide({ b: 4, h: 4.4, s: 1.6, labels: L })]);

const video: Explainer = {
  id: 'xq-m6-9-1',
  lessonId: '',
  exam: {
    lesson: 'm6-9-1',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 10.6, Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-6-area',
    question: QUESTION,
  },
  title: 'Exam Question: Area of a Parallelogram, Base 20 in and Height 22 in (Area of a Parallelogram)',
  thumbnailTitle: 'Area of a Parallelogram',
  thumbnail: 'pg',
  summary:
    'A real test question, solved one small step at a time: find the area of a parallelogram with a base of 20 inches and a height of 22 inches. A parallelogram can be cut and slid into a rectangle with the same base and height, so its area is base times height: 20 × 22 = 440 square inches. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Area of a Parallelogram', subtitle: 'Base times height, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area of a parallelogram. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the area of a parallelogram with base equal to $20$ in, and height equal to $22$ in.',
          answer: '$440$ square inches',
          working: '20 × 22 = 440',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the area of a parallelogram with base equal to 20 inches, and height equal to 22 inches.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 460,
      left: [shape('pg')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Base and height', md: 'A **parallelogram** has two pairs of parallel sides. The **base** is one side. The **height** is the **straight-up** distance from the base to the opposite side, at a right angle: it is **not** the slanted side. **Area** is the number of square inches inside.' }],
      lines: [
        { say: 'A parallelogram is a four sided shape with two pairs of parallel sides. It looks like a rectangle that has been pushed over.', show: 'pg.shape' },
        { say: 'The base is one side. Here it is 20 inches.', show: ['pg.base', 'c'], focus: 'pg.base' },
        { say: 'The height is the straight up distance from the base to the opposite side, at a right angle. It is not the slanted side. Here it is 22 inches.', show: 'pg.h0', focus: 'pg.h0' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 460,
      left: [slide('cs')],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Area of a parallelogram', md: 'Cut off the triangle at one end and slide it to the other end: the parallelogram becomes a **rectangle** with the **same base and height**. So $A = b \\times h$.' }],
      lines: [
        { say: 'Here is what we need. Cut the triangle off one end of the parallelogram, along the height.', show: ['cs.rest', 'cs.piece', 'cs.cut', 'cs.base'], focus: 'cs.piece' },
        { say: 'Slide it to the other end. Now the parallelogram is a rectangle, with the same base and the same height. Nothing was added or lost.', show: ['cs.moved', 'cs.rb', 'cs.rh', 'cs.corners', 'c'], focus: 'cs.moved' },
        { say: 'So the area of a parallelogram is base times height, just like a rectangle.', focus: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **base** and the **height**', 'Multiply: $A = b \\times h$', 'Write the units: **square** inches'] }],
      lines: [
        { say: 'Here is the plan. Find the base and the height.', show: 'plan.0' },
        { say: 'Multiply them.', show: 'plan.1' },
        { say: 'Then write the answer in square inches.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Base times height',
      layout: 'split',
      leftWidth: 460,
      left: [shape('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b = 20, \\quad h = 22', 'A = 20 \\times 22', '= 20 \\times 20 + 20 \\times 2', '= 400 + 40 = 440', 'A = \\good{440 \\text{ in}^2}'] }],
      lines: [
        { say: 'Step one. The base is 20 inches, and the height is 22 inches.', show: ['st.shape', 'st.base', 'st.h0', 'm.0'], focus: ['st.base', 'st.h0'] },
        { say: 'Step two. The area is base times height: 20 times 22.', show: 'm.1', focus: 'm.1' },
        { say: 'To multiply, split 22 into 20 and 2. 20 times 20 is 400, and 20 times 2 is 40.', show: 'm.2', focus: 'm.2' },
        { say: '400 plus 40 is 440.', show: 'm.3', focus: 'm.3' },
        { say: 'Step three. Inches times inches gives square inches. The area is 440 square inches.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['440 \\div 20 = 22 \\ \\checkmark', '20 \\times 20 = 400, \\text{ so a bit more than } 400 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Divide the area by the base: 440 divided by 20 is 22, the height.', show: 'm.0' },
        { say: 'And a 20 by 20 square has an area of 400, so a height of a little more than 20 should give a little more than 400. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$42$ in²', '**added** $20$ and $22$: area **multiplies**'],
            ['$220$ in²', 'halved it: halving is for **triangles**, not parallelograms'],
            ['$440$ in', 'area is in **square** inches'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '42 adds the base and the height. Area multiplies them.' },
        { say: '220 halves the answer. Halving is for triangles. A parallelogram is a whole rectangle, cut and slid.' },
        { say: 'And 440 inches has the wrong units. Area is measured in square inches.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A parallelogram has a base of $9$ cm and a height of $6$ cm. What is its area?',
          choices: ['$15$ cm²', '$54$ cm²', '$27$ cm²', '$30$ cm²'],
          answer: 1,
          working: 'Area = base × height = 9 × 6 = 54 cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has a base of 9 centimetres and a height of 6 centimetres. What is its area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Base times height: 9 times 6 is 54 square centimetres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The height is **straight up**, not the slanted side', 'Cut and slide: a **rectangle**', '$A = b \\times h$', 'Area is in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. The height is the straight up distance, not the slanted side.', show: 'sum.0' },
        { say: 'A parallelogram can be cut and slid into a rectangle.', show: 'sum.1' },
        { say: 'So its area is base times height.', show: 'sum.2' },
        { say: 'And area is measured in square units. For more on the area of a parallelogram, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
