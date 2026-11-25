import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure } from '@/video/solids.ts';

// Exam question for Math 8 lesson 8.3 (surface area of prisms). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 9.6, Solve Geometry Applications: Volume and
// Surface Area, CC BY-NC-SA 4.0). V = 9 × 4 × 6 = 216 cu. ft. The faces come in pairs: 9 × 4 = 36,
// 9 × 6 = 54 and 4 × 6 = 24, so SA = 2(36) + 2(54) + 2(24) = 228 sq. ft.

const QUESTION = 'A rectangular box has length 9 feet, width 4 feet, and height 6 feet. Find its (a) volume and (b) surface area.';

const L = { l: '9\\text{ ft}', w: '4\\text{ ft}', h: '6\\text{ ft}' };
const solid = (id: string) => figure(id, [box({ l: 9, w: 4, h: 6, labels: L })], 400);
const AREAS = { top: '36', bottom: '36', front: '54', back: '54', left: '24', right: '24' };
const net = (id: string) => figure(id, [boxNet({ l: 9, w: 4, h: 6, labels: { l: '9', w: '4', h: '6' }, areas: AREAS })], 380);

const video: Explainer = {
  id: 'xq-m8-8-3',
  lessonId: '',
  exam: {
    lesson: 'm8-8-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: Volume and Surface Area of a Box (Surface Area of Prisms)',
  thumbnailTitle: 'Surface Area of a Box',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: a rectangular box has length 9 feet, width 4 feet and height 6 feet. Find its (a) volume and (b) surface area. The volume is 9 × 4 × 6 = 216 cubic feet. The surface area adds the areas of all six faces, which come in matching pairs: 9 × 4 = 36, 9 × 6 = 54 and 4 × 6 = 24, so the surface area is 2(36) + 2(54) + 2(24) = 228 square feet. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Surface Area of a Box', subtitle: 'Surface area of prisms, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the surface area of prisms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A rectangular box has length $9$ feet, width $4$ feet, and height $6$ feet. Find its (a) volume and (b) surface area.',
          answer: '(a) $216$ cubic feet (b) $228$ square feet',
          working: 'V = 9 × 4 × 6; add the six faces',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A rectangular box has length 9 feet, width 4 feet, and height 6 feet. Find its, a, volume, and, b, surface area.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [solid('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Volume and surface area', md: 'The **volume** is the space **inside** the box, in **cubic** feet. The **surface area** is the total area of all **six** faces on the **outside**, in **square** feet.' }],
      lines: [
        { say: 'Here is the box: 9 feet long, 4 feet wide, and 6 feet high.', show: ['ask.shape', 'ask.front-face', 'ask.top-face', 'ask.side-face', 'ask.l', 'ask.w', 'ask.h'] },
        { say: 'The volume is the space inside the box. It is measured in cubic feet.', show: 'c' },
        { say: 'The surface area is the total area of all six faces on the outside, like the cardboard needed to make the box. It is measured in square feet.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = l \\times w \\times h', 'SA = 2lw + 2lh + 2wh'] }],
      lines: [
        { say: 'Here is what we need. The volume of a box is length times width times height.', show: 'm.0' },
        { say: 'A box has six faces in three matching pairs: top and bottom, front and back, and the two ends. So the surface area is 2 "l" "w", plus 2 "l" "h", plus 2 "w" "h".', caption: 'A box has six faces in three matching pairs: top and bottom, front and back, and the two ends. So SA = 2lw + 2lh + 2wh.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Multiply** length, width and height', '(b) Find the area of each **pair** of faces', '**Add** all six faces'] }],
      lines: [
        { say: 'Here is the plan. For part a, multiply the length, the width and the height.', show: 'plan.0' },
        { say: 'For part b, find the area of each pair of faces.', show: 'plan.1' },
        { say: 'Then add all six faces.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Volume, faces, add',
      layout: 'split',
      leftWidth: 560,
      left: [net('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } V = 9 \\times 4 \\times 6 = \\good{216 \\text{ ft}^3}', '\\text{top, bottom: } 9 \\times 4 = 36', '\\text{front, back: } 9 \\times 6 = 54', '\\text{ends: } 4 \\times 6 = 24', '\\text{(b) } 72 + 108 + 48 = \\good{228 \\text{ ft}^2}'] }],
      lines: [
        { say: 'Step one, part a. The volume is 9 times 4 times 6. 9 times 4 is 36, and 36 times 6 is 216. So the volume is 216 cubic feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two, part b. Unfold the box into its net, to see all six faces.', show: ['st.l', 'st.w', 'st.h'] },
        { say: 'The top and the bottom are each 9 by 4: 36 square feet.', show: ['st.tb', 'm.1'], focus: ['st.tb', 'm.1'] },
        { say: 'The front and the back are each 9 by 6: 54 square feet.', show: ['st.fb', 'm.2'], focus: ['st.fb', 'm.2'] },
        { say: 'The two ends are each 4 by 6: 24 square feet.', show: ['st.ends', 'm.3'], focus: ['st.ends', 'm.3'] },
        { say: 'Step three. Add all six faces: 2 times 36 is 72, 2 times 54 is 108, and 2 times 24 is 48. 72 plus 108 plus 48 is 228. So the surface area is 228 square feet.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['36 + 54 + 24 = 114', '2 \\times 114 = 228 \\ \\checkmark', '4 \\times 6 = 24, \\ 24 \\times 9 = 216 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b another way. Add one face from each pair: 36 plus 54 plus 24 is 114.', show: 'm.0', focus: 'm.0' },
        { say: 'Every face has a matching face, so double it. 2 times 114 is 228. The same.', show: 'm.1', focus: 'm.1' },
        { say: 'And part a: the end of the box is 4 by 6, which is 24 square feet, and 9 slices of 24 cubic feet make 216. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$114 \\text{ ft}^2$', 'only **three** faces: each face has a **matching** one'],
            ['$216 \\text{ ft}^2$', 'that is the **volume**: surface area **adds** the faces'],
            ['volume in $\\text{ft}^2$', 'volume is in **cubic** feet, $\\text{ft}^3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '114 square feet counts only three faces. A box has six faces, and each face has a matching one opposite it.' },
        { say: '216 for the surface area is the volume again. The surface area adds up the areas of the faces.' },
        { say: 'And the volume is in cubic feet, not square feet. Volume fills space, so its unit is cubed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A box is $5$ cm long, $3$ cm wide and $2$ cm high. What is its **surface area**?',
          choices: ['$62 \\text{ cm}^2$', '$31 \\text{ cm}^2$', '$30 \\text{ cm}^2$', '$60 \\text{ cm}^2$'],
          answer: 0,
          working: 'Faces: 5 × 3 = 15, 5 × 2 = 10, 3 × 2 = 6. SA = 2(15 + 10 + 6) = 62 cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A box is 5 centimetres long, 3 centimetres wide, and 2 centimetres high. What is its surface area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The faces are 5 times 3, which is 15, 5 times 2, which is 10, and 3 times 2, which is 6. Together that is 31, and each face has a match, so double it: 62 square centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume $= l \\times w \\times h$, in **cubic** units', 'A box has **6** faces in **3** pairs', 'Surface area **adds** all six faces', 'Surface area is in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a box is length times width times height, in cubic units.', show: 'sum.0' },
        { say: 'A box has six faces, in three matching pairs.', show: 'sum.1' },
        { say: 'The surface area adds the areas of all six faces.', show: 'sum.2' },
        { say: 'And surface area is in square units. For more on the surface area of prisms, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
