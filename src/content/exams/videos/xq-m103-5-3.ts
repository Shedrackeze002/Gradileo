import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 5.3 (surface area of 3-D objects). The question is an exercise
// from OpenStax Contemporary Mathematics, word for word (section 10.7, Volume and Surface Area,
// CC BY-NC-SA 4.0). The book prints no answer for it. The two long walls are 2 × 20 × 8 = 320 sq ft,
// the two short walls 2 × 14 × 8 = 224 sq ft and the ceiling 20 × 14 = 280 sq ft, so the surface to
// paint is 824 sq ft. Check: the whole box is 2(20·14) + 2(20·8) + 2(14·8) = 1,104, less the floor
// (280) is 824.

const QUESTION =
  'You decide to paint the living room. You will need the surface area of the 4 walls and the ceiling. The room measures 20 ft long and 14 ft wide, and the ceiling is 8 ft high.';

const room = (height = 380) => figure('room', [box({ l: 20, w: 14, h: 8, labels: { l: '20 \\text{ ft}', w: '14 \\text{ ft}', h: '8 \\text{ ft}' } })], height);

const video: Explainer = {
  id: 'xq-m103-5-3',
  lessonId: '',
  exam: {
    lesson: 'm103-5-3',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 10.7, Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-7-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: The Area to Paint in a Living Room (Surface Area)',
  thumbnailTitle: 'How Much Surface to Paint?',
  thumbnail: 'room',
  summary:
    'A real test question, solved one small step at a time: you will paint the 4 walls and the ceiling of a living room 20 ft long, 14 ft wide and 8 ft high. What surface area is that? The two long walls are 2 × 20 × 8 = 320 sq ft, the two short walls 2 × 14 × 8 = 224 sq ft, and the ceiling 20 × 14 = 280 sq ft, for 824 square feet. Then we check by taking the floor off the whole box and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Surface to Paint?', subtitle: 'Surface area, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about surface area. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You decide to paint the living room. You will need the surface area of the $4$ walls and the ceiling. The room measures $20$ ft long and $14$ ft wide, and the ceiling is $8$ ft high.',
          answer: '$824$ sq ft',
          working: '$2(20 \\times 8) + 2(14 \\times 8) + 20 \\times 14$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'You decide to paint the living room, so you need the surface area of the 4 walls and the ceiling. The room is 20 feet long and 14 feet wide, and the ceiling is 8 feet high.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [room()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A room is a **box**. We paint **4 walls** and the **ceiling**, but **not** the floor.' }],
      lines: [
        { say: 'Here is the room. It is a box, 20 feet long, 14 feet wide and 8 feet high.', show: 'room' },
        { say: 'A box has six faces. We paint four of them, the walls, and the top, the ceiling. We do not paint the floor.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'table', id: 'tab', head: ['Face', 'How many', 'Size'], rows: [['long wall', '$2$', '$20$ ft by $8$ ft'], ['short wall', '$2$', '$14$ ft by $8$ ft'], ['ceiling', '$1$', '$20$ ft by $14$ ft']] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Surface area', md: 'Surface area is the **total area of the faces**. Add only the faces the job needs.' },
      ],
      lines: [
        { say: 'Here is what we need. There are two long walls, each 20 feet by 8 feet. There are two short walls, each 14 feet by 8 feet. And there is one ceiling, 20 feet by 14 feet.', show: 'tab' },
        { say: 'Surface area is the total area of the faces. Here, we add only the faces we are painting.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the area of the **walls**', 'Find the area of the **ceiling**', '**Add** them'] }],
      lines: [
        { say: 'Here is the plan. Find the area of the four walls.', show: 'plan.0' },
        { say: 'Find the area of the ceiling.', show: 'plan.1' },
        { say: 'Then add them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The walls',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{long walls: } 2 \\times 20 \\times 8 = 320', '\\text{short walls: } 2 \\times 14 \\times 8 = 224', '\\text{walls: } 320 + 224 = 544 \\text{ sq ft}'] }],
      lines: [
        { say: 'Step one. Each long wall is 20 times 8, which is 160 square feet. There are two, so 320.', show: 'm.0' },
        { say: 'Each short wall is 14 times 8, which is 112. Two of them make 224.', show: 'm.1' },
        { say: 'The four walls together are 320 plus 224, which is 544 square feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The ceiling',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{ceiling: } 20 \\times 14 = 280 \\text{ sq ft}'] }],
      lines: [
        { say: 'Step two. The ceiling is as long and as wide as the room: 20 times 14, which is 280 square feet.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['544 + 280 = \\good{824 \\text{ sq ft}}'] }],
      lines: [
        { say: 'Step three. Add the walls and the ceiling: 544 plus 280 is 824. You will paint 824 square feet.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{whole box: } 2(280) + 2(160) + 2(112) = 1{,}104', '1{,}104 - 280 \\text{ (the floor)} = 824 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. The surface area of the whole box, all six faces, is 2 times 280, plus 2 times 160, plus 2 times 112. That is 1,104 square feet.', show: 'm.0' },
        { say: 'We do not paint the floor, which is 280 square feet. 1,104 minus 280 is 824, the same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$1{,}104$ sq ft', 'that includes the **floor**: we do not paint it'],
            ['$20 \\times 14 \\times 8 = 2{,}240$', 'that is the **volume**, in cubic feet'],
            ['$544$ sq ft', 'forgot the **ceiling**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1,104 square feet is all six faces. It includes the floor, which we are not painting.' },
        { say: 'Multiplying all three lengths gives the volume, 2,240 cubic feet. That is the space inside, not the surface.' },
        { say: 'And 544 square feet is only the walls. The question includes the ceiling too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You will paint the $4$ walls, but not the ceiling, of a bedroom $12$ ft long and $10$ ft wide, with an $8$ ft ceiling. What area will you paint?',
          choices: ['$352$ sq ft', '$472$ sq ft', '$960$ sq ft', '$176$ sq ft'],
          answer: 0,
          working: '$2(12 \\times 8) + 2(10 \\times 8) = 192 + 160 = 352$ sq ft.',
        },
      ],
      lines: [
        { say: 'Your turn. You will paint the 4 walls, but not the ceiling, of a bedroom 12 feet long and 10 feet wide, with an 8-foot ceiling. What area will you paint? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The long walls are 2 times 12 times 8, which is 192. The short walls are 2 times 10 times 8, which is 160. Together, 352 square feet. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Surface area $=$ total area of the **faces**', 'Opposite walls come in **pairs**', 'Add only the faces the job **needs**', 'Volume is not surface area'] }],
      lines: [
        { say: 'Here is what to remember. Surface area is the total area of the faces.', show: 'sum.0' },
        { say: 'In a room, opposite walls come in pairs of the same size.', show: 'sum.1' },
        { say: 'Add only the faces the job needs. For painting a room, that is usually not the floor.', show: 'sum.2' },
        { say: 'And volume is a different thing: it is the space inside. For more on surface area, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
