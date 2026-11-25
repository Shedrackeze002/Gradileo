import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rect } from '@/content/math5/videos/lib/m5-10-figures.ts';

// Exam question for Math 5 lesson 10.2 (area and perimeter of rectangles). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word with its instruction (section 9.4, Use
// Properties of Rectangles, Triangles, and Trapezoids, CC BY-NC-SA 4.0). Perimeter: 15 + 14 + 15 + 14
// = 58 ft. Area: 15 × 14 = 210 sq. ft. Both as in the book's answer.

const QUESTION = 'Find the (a) perimeter and (b) area of each rectangle. A rectangular room is 15 feet wide by 14 feet long.';

/** The room, 15 ft by 14 ft, with all four sides labelled. */
const room = (id: string) =>
  figure(id, [rect({ w: 3, h: 2.8, labels: { bottom: '15\\ \\text{ft}', right: '14\\ \\text{ft}', top: '15\\ \\text{ft}', left: '14\\ \\text{ft}' } })], 360);

const video: Explainer = {
  id: 'xq-m5-10-2',
  lessonId: '',
  exam: {
    lesson: 'm5-10-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: The Perimeter and Area of a Room (Area and Perimeter of Rectangles)',
  thumbnailTitle: 'Around It, or Inside It?',
  thumbnail: 'r',
  summary:
    'A real test question, solved one small step at a time: a rectangular room is 15 feet wide by 14 feet long. Find its perimeter and its area. The perimeter is the distance around: 15 + 14 + 15 + 14 = 58 feet. The area is the surface inside: 15 × 14 = 210 square feet. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Around It, or Inside It?', subtitle: 'Area and perimeter of rectangles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the perimeter and area of a rectangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the (a) perimeter and (b) area of each rectangle. A rectangular room is $15$ feet wide by $14$ feet long.',
          answer: '(a) $58$ ft (b) $210$ sq. ft',
          working: '15 + 14 + 15 + 14 = 58; 15 × 14 = 210',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the perimeter and the area of the rectangle. A rectangular room is 15 feet wide by 14 feet long.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [room('r')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Perimeter and area', md: 'The **perimeter** is the distance **around** the room, like a border along the walls. The **area** is the surface **inside**, like the carpet on the floor.' }],
      lines: [
        { say: 'Here is the room: 15 feet wide and 14 feet long. Opposite sides of a rectangle are equal, so it has two sides of 15 feet and two sides of 14 feet.', show: ['r.shape', 'r.bottom', 'r.right', 'r.top', 'r.left'] },
        { say: 'The perimeter is the distance around the room, like a border along the walls. The area is the surface inside, like the carpet on the floor.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['To find', 'Do this', 'Unit'],
          rows: [
            ['**perimeter**', '**add** all four sides', 'feet'],
            ['**area**', '**multiply** the width by the length', 'square feet'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. To find the perimeter, add all four sides. The answer is a length, in feet.', show: 't', focus: 't.0' },
        { say: 'To find the area of a rectangle, multiply the width by the length. The answer counts squares, so it is in square feet.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the four sides for the perimeter', '**Multiply** $15 \\times 14$ for the area', 'Give each answer its **unit**'] }],
      lines: [
        { say: 'Here is the plan. Add the four sides for the perimeter.', show: 'plan.0' },
        { say: 'Multiply 15 by 14 for the area.', show: 'plan.1' },
        { say: 'Then give each answer its unit.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The perimeter',
      layout: 'split',
      leftWidth: 520,
      left: [room('a')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['P = 15 + 14 + 15 + 14', '= 29 + 29', '= \\good{58 \\text{ ft}}'] }],
      lines: [
        { say: 'Part a. Go around the room and add all four sides: 15, plus 14, plus 15, plus 14.', show: ['a.shape', 'a.bottom', 'a.right', 'a.top', 'a.left', 'm.0'] },
        { say: '15 plus 14 is 29, and there are two of those. 29 plus 29 is 58.', show: 'm.1' },
        { say: 'So the perimeter is 58 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (b): The area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = 15 \\times 14', '= 15 \\times 10 + 15 \\times 4', '= 150 + 60 = \\good{210 \\text{ sq. ft}}'] }],
      lines: [
        { say: 'Part b. The area is the width times the length: 15 times 14.', show: 'm.0' },
        { say: 'Split the 14 into 10 and 4. 15 times 10 is 150, and 15 times 4 is 60.', show: 'm.1' },
        { say: '150 plus 60 is 210. So the area is 210 square feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\times (15 + 14) = 2 \\times 29 = 58 \\ \\checkmark', '210 \\div 15 = 14 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the perimeter another way: two widths and two lengths make 2 times 29, which is 58.', show: 'm.0' },
        { say: 'And check the area by dividing: 210 divided by 15 is 14, the length of the room. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $29$ ft', 'added only **two** sides: a rectangle has **four**'],
            ['(a) $210$ ft', 'mixed them up: the perimeter **adds**, the area **multiplies**'],
            ['(b) $210$ ft', 'area is in **square** feet, not feet'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '29 feet adds only one width and one length. Going all the way around passes four sides.' },
        { say: '210 for the perimeter mixes up the two ideas. The perimeter adds the sides, and the area multiplies.' },
        { say: 'And 210 feet has the wrong unit. Area counts squares, so it is 210 square feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A garden is $9$ m long and $6$ m wide. What are its perimeter and area?',
          choices: ['$15$ m and $54\\ \\text{m}^2$', '$54$ m and $30\\ \\text{m}^2$', '$30$ m and $54\\ \\text{m}^2$', '$30\\ \\text{m}^2$ and $54$ m'],
          answer: 2,
          working: 'Perimeter: 9 + 6 + 9 + 6 = 30 m. Area: 9 × 6 = 54 m².',
        },
      ],
      lines: [
        { say: 'Your turn. A garden is 9 metres long and 6 metres wide. What are its perimeter and area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The perimeter is 9 plus 6 plus 9 plus 6, which is 30 metres. The area is 9 times 6, which is 54 square metres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Perimeter**: add all four sides', '**Area**: width times length', 'Perimeter in **feet**, area in **square feet**', '**Check** another way'] }],
      lines: [
        { say: 'Here is what to remember. For the perimeter, add all four sides.', show: 'sum.0' },
        { say: 'For the area of a rectangle, multiply the width by the length.', show: 'sum.1' },
        { say: 'The perimeter is a length, and the area is in square units.', show: 'sum.2' },
        { say: 'And check another way. For more on the area and perimeter of rectangles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
