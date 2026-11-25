import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, note, piece, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Exam question for Math 6 lesson 9.3 (area of composite shapes). The free OpenStax books have no
// question like this at this level, so this one is written by Gradileo in the style of a Grade 6
// mathematics unit test. A signpost: a rectangle 6 cm by 4 cm with a triangle on its right end
// (base 4 cm, the rectangle's right side, and height 3 cm). Area = 6 × 4 + (4 × 3) ÷ 2 = 24 + 6 = 30.

const QUESTION =
  'A signpost is shaped like an arrow. It is a rectangle 6 cm long and 4 cm tall, with a triangle joined to its right end. The base of the triangle is the 4 cm right side of the rectangle, and the height of the triangle is 3 cm. Find the area of the signpost.';

type P = [number, number];
const SIGN: P[] = [[0, 0], [6, 0], [9, 2], [6, 4], [0, 4]];

const sign = (id: string, split: boolean) =>
  figure(id, [
    piece('shape', SIGN, { tone: 'brand', shade: split ? 0 : 0.2 }),
    piece('rect', [[0, 0], [6, 0], [6, 4], [0, 4]], { tone: 'good', shade: 0.3, outline: false }),
    piece('tri', [[6, 0], [9, 2], [6, 4]], { tone: 'theta', shade: 0.3, outline: false }),
    seg('cut', [6, 0], [6, 4], { tone: 'theta', dashed: true, weight: 3 }),
    seg('b', [0, 0], [6, 0], { tone: 'adj', weight: 5, label: '6\\text{ cm}', side: 'right' }),
    seg('l', [0, 4], [0, 0], { tone: 'opp', weight: 5, label: '4\\text{ cm}', side: 'right' }),
    height('h', [9, 2], [6, 2], [6, 3], { label: '3\\text{ cm}', side: 'left', at: 0.5 }),
    note('a1', [3, 2], '24\\text{ cm}^2'),
    note('a2', [7, 2.75], '6\\text{ cm}^2'),
  ]);

const video: Explainer = {
  id: 'xq-m6-9-3',
  lessonId: '',
  exam: {
    lesson: 'm6-9-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: The Area of an Arrow-Shaped Signpost (Area of Composite Shapes)',
  thumbnailTitle: 'Area of a Signpost',
  thumbnail: 'sp',
  summary:
    'An exam-style question, solved one small step at a time: a signpost is a rectangle 6 cm long and 4 cm tall, with a triangle on its right end whose base is 4 cm and whose height is 3 cm. What is its area? Split it into the rectangle and the triangle. The rectangle is 6 × 4 = 24 cm², the triangle is (4 × 3) ÷ 2 = 6 cm², so the signpost is 24 + 6 = 30 cm². Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Area of a Signpost', subtitle: 'Area of composite shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about the area of a composite shape. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A signpost is shaped like an arrow. It is a rectangle $6$ cm long and $4$ cm tall, with a triangle joined to its right end. The base of the triangle is the $4$ cm right side of the rectangle, and the height of the triangle is $3$ cm. Find the area of the signpost.',
          answer: '$30$ cm²',
          working: '24 + 6 = 30',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A signpost is shaped like an arrow. It is a rectangle 6 centimetres long and 4 centimetres tall, with a triangle joined to its right end. The base of the triangle is the 4 centimetre right side of the rectangle, and the height of the triangle is 3 centimetres. Find the area of the signpost.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [sign('sg', false)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Composite shape', md: 'A **composite shape** is made of simpler shapes, such as rectangles and triangles. Its **area** is the **sum** of the areas of its parts.' }],
      lines: [
        { say: 'Here is the signpost. It is not a rectangle, and it is not a triangle. It is both.', show: 'sg.shape' },
        { say: 'A shape like this is called a composite shape. Its area is the sum of the areas of its parts.', show: 'c', focus: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rectangle: } A = b \\times h', '\\text{triangle: } A = \\tfrac{1}{2} \\times b \\times h'] }],
      lines: [
        { say: 'Here is what we need. The area of a rectangle is base times height.', show: 'm.0' },
        { say: 'The area of a triangle is half of base times height. The height is the straight distance from the base to the far corner, at a right angle.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Split** the shape into a rectangle and a triangle', 'Find the **area of each** part', '**Add** the areas'] }],
      lines: [
        { say: 'Here is the plan. Split the shape into a rectangle and a triangle.', show: 'plan.0' },
        { say: 'Find the area of each part.', show: 'plan.1' },
        { say: 'Then add them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Split, find, add',
      layout: 'split',
      leftWidth: 520,
      left: [sign('sp', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{rectangle: } 6 \\times 4 = 24}', '\\thc{\\text{triangle: } (4 \\times 3) \\div 2 = 6}', '24 + 6 = 30', 'A = \\good{30 \\text{ cm}^2}'] }],
      lines: [
        { say: 'Step one. Split the signpost along the dashed line. On the left is a rectangle. On the right is a triangle: the point of the arrow.', show: ['sp.shape', 'sp.cut', 'sp.rect', 'sp.tri'], focus: 'sp.cut' },
        { say: 'Step two. The rectangle is 6 centimetres long and 4 centimetres tall. 6 times 4 is 24 square centimetres.', show: ['sp.b', 'sp.l', 'm.0', 'sp.a1'], focus: ['sp.rect', 'm.0'] },
        { say: 'The triangle stands on the dashed line, so its base is 4 centimetres. Its height is 3 centimetres, from the dashed line straight across to the tip. 4 times 3 is 12, and half of 12 is 6 square centimetres.', show: ['sp.h', 'm.1', 'sp.a2'], focus: ['sp.h', 'm.1'] },
        { say: 'Step three. Add the parts. 24 plus 6 is 30. The area of the signpost is 30 square centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9 \\times 4 = 36 \\text{ (box around it)}', '36 - 30 = 6 = 2 \\text{ corners of } 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Draw a box around the whole signpost: 9 centimetres long and 4 tall. Its area is 36 square centimetres.', show: 'm.0' },
        { say: 'The signpost leaves out two small corner triangles at the tip, each half of a 3 by 2 rectangle, so 3 square centimetres each. 36 minus 6 is 30. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$36$ cm²', 'forgot to **halve** the triangle'],
            ['$18$ cm²', 'halved the **rectangle** too: only the triangle is halved'],
            ['$30$ cm', 'area is in **square** centimetres'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '36 forgets to halve the triangle, and counts it as 12.' },
        { say: '18 halves the rectangle as well. Only the triangle is half of base times height.' },
        { say: 'And 30 centimetres has the wrong units. Area is measured in square centimetres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A house shape is a rectangle $8$ m wide and $3$ m tall, with a triangular roof on top. The roof has a base of $8$ m and a height of $4$ m. What is the area of the house shape?',
          choices: ['$40$ m²', '$56$ m²', '$28$ m²', '$32$ m²'],
          answer: 0,
          working: 'Rectangle 8 × 3 = 24, roof (8 × 4) ÷ 2 = 16, total 24 + 16 = 40 m².',
        },
      ],
      lines: [
        { say: 'Your turn. A house shape is a rectangle 8 metres wide and 3 metres tall, with a triangular roof on top. The roof has a base of 8 metres and a height of 4 metres. What is the area of the house shape? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The rectangle is 8 times 3, which is 24. The roof is 8 times 4, which is 32, halved: 16. 24 plus 16 is 40 square metres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Split** into shapes you know', 'Rectangle: $b \\times h$', 'Triangle: $\\tfrac{1}{2} \\times b \\times h$', '**Add** the parts'] }],
      lines: [
        { say: 'Here is what to remember. Split a composite shape into shapes you know.', show: 'sum.0' },
        { say: 'A rectangle is base times height.', show: 'sum.1' },
        { say: 'A triangle is half of base times height.', show: 'sum.2' },
        { say: 'And add the parts to find the whole area. For more on the area of composite shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
