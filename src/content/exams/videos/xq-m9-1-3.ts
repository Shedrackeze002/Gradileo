import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cake } from '@/content/math9/videos/lib/m9-1-figures.ts';

// Exam question for Math 9 lesson 1.3 (surface area of composite objects). The free textbooks we
// use have no question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit
// test. Box: 2(10 × 6) + 2(10 × 4) + 2(6 × 4) = 120 + 80 + 48 = 248 cm². Cube: 6 × 16 = 96 cm².
// The cube hides 16 cm² of the box's top and its own 16 cm² bottom: 248 + 96 − 2 × 16 = 312 cm².
// Check: the box less the covered patch is 232, plus the cube's 5 faces we can see (80) is 312.

const QUESTION =
  'A rectangular box is 10 cm long, 6 cm wide and 4 cm high. A cube with 4 cm edges is glued to the middle of its top. [The figure: the cube sits on the centre of the top face of the box.] Find the surface area of the object.';

const DIMS = { l1: '10\\text{ cm}', w1: '6\\text{ cm}', h1: '4\\text{ cm}', l2: '4\\text{ cm}', w2: '4\\text{ cm}', h2: '4\\text{ cm}' };
const joined = (id: string) => figure(id, [cake({ bottom: [10, 6, 4], top: [4, 4, 4], labels: DIMS }), { points: { room: [-1.5, 3] }, items: [] }], 440);
const lifted = (id: string) => figure(id, [cake({ bottom: [10, 6, 4], top: [4, 4, 4], lift: 3, labels: { l2: '4\\text{ cm}', w2: '4\\text{ cm}' } })], 460);

const video: Explainer = {
  id: 'xq-m9-1-3',
  lessonId: '',
  exam: {
    lesson: 'm9-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: A Cube on a Box (Surface Area of Composite Objects)',
  thumbnailTitle: 'A Cube Glued on a Box',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: a box 10 cm long, 6 cm wide and 4 cm high has a cube with 4 cm edges glued to the middle of its top. Find the surface area of the object. The box has 248 cm² and the cube has 96 cm². Where they touch, two 16 cm² faces are hidden, so we subtract 16 twice: 248 + 96 − 32 = 312 cm². Then we check another way and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Cube Glued on a Box', subtitle: 'Surface area of composite objects, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about the surface area of composite objects. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A rectangular box is $10$ cm long, $6$ cm wide and $4$ cm high. A cube with $4$ cm edges is glued to the middle of its top. Find the surface area of the object.',
          answer: '$312 \\text{ cm}^2$',
          working: '248 + 96 − 2 × 16 = 312',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A rectangular box is 10 centimetres long, 6 centimetres wide and 4 centimetres high. A cube with 4 centimetre edges is glued to the middle of its top. Find the surface area of the object.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [joined('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Composite object', md: 'A **composite object** is made of simpler shapes joined together. Its **surface area** is the area of every face you could paint on the **outside**.' }],
      lines: [
        { say: 'Here is the object: the box, with the cube on top.', show: ['ask.bottom', 'ask.top', 'ask.b-l', 'ask.b-w', 'ask.b-h', 'ask.t-l', 'ask.t-w', 'ask.t-h'] },
        { say: 'A composite object is made of simpler shapes joined together. Its surface area is the area of every face you could paint on the outside.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['SA_{\\text{box}} = 2lw + 2lh + 2wh', 'SA_{\\text{cube}} = 6s^2', 'SA = SA_1 + SA_2 - 2 \\times \\text{overlap}'] }],
      lines: [
        { say: 'Here is what we need. A box has three pairs of matching faces, so its surface area is 2 "l" "w", plus 2 "l" "h", plus 2 "w" "h".', show: 'm.0' },
        { say: 'A cube has 6 equal square faces, so its surface area is 6 times "s" squared.', show: 'm.1' },
        { say: 'For the whole object, add the two surface areas, then subtract the overlap twice, once for each hidden face.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the surface area of the **box**', 'Find the surface area of the **cube**', 'Add, and subtract the **overlap twice**'] }],
      lines: [
        { say: 'Here is the plan. Find the surface area of the box.', show: 'plan.0' },
        { say: 'Find the surface area of the cube.', show: 'plan.1' },
        { say: 'Then add them, and subtract the overlap twice.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The box and the cube',
      layout: 'split',
      leftWidth: 560,
      left: [joined('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2(10 \\times 6) = 120', '2(10 \\times 4) = 80', '2(6 \\times 4) = 48', '\\text{box: } \\adj{248 \\text{ cm}^2}', '\\text{cube: } 6 \\times 4^2 = \\opp{96 \\text{ cm}^2}'] }],
      lines: [
        { say: 'Here is the object again.', show: ['st.bottom', 'st.top', 'st.b-l', 'st.b-w', 'st.b-h', 'st.t-l', 'st.t-w', 'st.t-h'] },
        { say: 'Step one, the box. The top and the bottom are each 10 by 6. Two times 60 is 120.', show: 'm.0', focus: ['st.bottom', 'm.0'] },
        { say: 'The front and the back are each 10 by 4. Two times 40 is 80.', show: 'm.1', focus: 'm.1' },
        { say: 'The two ends are each 6 by 4. Two times 24 is 48.', show: 'm.2', focus: 'm.2' },
        { say: '120 plus 80 plus 48 is 248 square centimetres for the box.', show: 'm.3', focus: 'm.3' },
        { say: 'Step two, the cube. Each face is 4 by 4, which is 16, and there are 6 faces. 6 times 16 is 96 square centimetres.', show: 'm.4', focus: ['st.top', 'm.4'] },
      ],
    },
    {
      chapter: 'Step 3: Subtract the overlap twice',
      layout: 'split',
      leftWidth: 560,
      left: [lifted('lf')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{overlap} = 4 \\times 4 = 16', '248 + 96 - 2 \\times 16', '= \\good{312 \\text{ cm}^2}'] }],
      lines: [
        { say: 'Step three. Imagine lifting the cube off the box. Where they touched, two faces were hidden.', show: ['lf.bottom', 'lf.top'] },
        { say: 'One is the patch on top of the box, where the cube sat.', show: 'lf.overlap', focus: 'lf.overlap' },
        { say: 'The other is the bottom face of the cube itself. Both are 4 by 4, which is 16 square centimetres.', show: ['lf.under', 'lf.t-l', 'lf.t-w', 'm.0'], focus: ['lf.under', 'm.0'] },
        { say: 'So add the two surface areas, and subtract 16 twice. 248 plus 96 is 344, and 344 minus 32 is 312. The surface area is 312 square centimetres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{box without the patch: } 248 - 16 = 232', '\\text{cube without its bottom: } 5 \\times 16 = 80', '232 + 80 = 312 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way, by counting only the faces we can paint. The box loses the patch under the cube: 248 minus 16 is 232.', show: 'm.0', focus: 'm.0' },
        { say: 'The cube shows only 5 of its faces: 5 times 16 is 80.', show: 'm.1', focus: 'm.1' },
        { say: '232 plus 80 is 312. The same answer. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$344 \\text{ cm}^2$', 'just added: the two **hidden** faces are not outside'],
            ['$328 \\text{ cm}^2$', 'subtracted the overlap **once**: two faces are hidden'],
            ['$312 \\text{ cm}^3$', 'surface area is in **square** units, not cubic'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '344 just adds the two surface areas. But the two faces where they touch are not on the outside.' },
        { say: '328 subtracts the overlap only once. Two faces are hidden: the patch on the box, and the bottom of the cube.' },
        { say: 'And surface area is an area, so its units are square centimetres, not cubic centimetres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two cubes, each with $2$ cm edges, are glued face to face. What is the surface area of the object?',
          choices: ['$48 \\text{ cm}^2$', '$44 \\text{ cm}^2$', '$40 \\text{ cm}^2$', '$24 \\text{ cm}^2$'],
          answer: 2,
          working: 'Each cube has 6 × 4 = 24 cm². 24 + 24 − 2 × 4 = 40 cm².',
        },
      ],
      lines: [
        { say: 'Your turn. Two cubes, each with 2 centimetre edges, are glued face to face. What is the surface area of the object? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Each cube has 6 faces of 4 square centimetres, which is 24. Add: 48. The overlap is 4, and we subtract it twice: 48 minus 8 is 40 square centimetres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the surface area of **each** part', '**Add** them', 'Subtract the overlap **twice**', 'Answer in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. Find the surface area of each part.', show: 'sum.0' },
        { say: 'Add them.', show: 'sum.1' },
        { say: 'Subtract the overlap twice, once for each hidden face.', show: 'sum.2' },
        { say: 'And give the answer in square units. For more on the surface area of composite objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
