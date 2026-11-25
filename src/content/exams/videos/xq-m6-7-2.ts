import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, tag, type P } from '@/content/math6/videos/lib/m6-7-figures.ts';

// Exam question for Math 6 lesson 7.2 (congruent shapes). The free OpenStax books have no question
// like this at this level, so this one is written by Gradileo in the style of a Grade 6 mathematics
// unit test. A is 5 by 3; B is 3 by 5, the same rectangle turned a quarter turn, so it is congruent
// to A; C is 10 by 6, the same shape with every side twice as long, so it is not congruent.

const QUESTION =
  'On squared paper, rectangle A is 5 squares long and 3 squares tall. Rectangle B is 3 squares long and 5 squares tall. Rectangle C is 10 squares long and 6 squares tall. (a) Which rectangle, B or C, is congruent to rectangle A? (b) Explain why the other one is not.';

const rect = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

const rects = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 25], y: [0, 7] }),
        shape({ id: 'a', pieces: [rect(1, 1, 5, 3)], tone: 'adj', shade: 0.3 }),
        tag({ id: 'na', at: [3.5, 2.5], tex: 'A' }),
        shape({ id: 'b', pieces: [rect(8, 1, 3, 5)], tone: 'good', shade: 0.3 }),
        tag({ id: 'nb', at: [9.5, 3.5], tex: 'B' }),
        shape({ id: 'c', pieces: [rect(13, 0.5, 10, 6)], tone: 'bad', shade: 0.25 }),
        tag({ id: 'nc', at: [18, 3.5], tex: 'C' }),
      ),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m6-7-2',
  lessonId: '',
  exam: {
    lesson: 'm6-7-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Which Rectangle Is Congruent? (Congruent Shapes)',
  thumbnailTitle: 'Which Rectangle Matches?',
  thumbnail: 'rc',
  summary:
    'An exam-style question, solved one small step at a time: rectangle A is 5 by 3 squares, B is 3 by 5, and C is 10 by 6. Which of B and C is congruent to A, and why is the other not? Congruent shapes have the same shape and the same size. B is A turned a quarter turn, with the same side lengths, so B is congruent to A. C has the same shape but every side is twice as long, so it is not. Then we check with areas and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Rectangle Matches?', subtitle: 'Congruent shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about congruent shapes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'On squared paper, rectangle $A$ is $5$ squares long and $3$ squares tall. Rectangle $B$ is $3$ squares long and $5$ squares tall. Rectangle $C$ is $10$ squares long and $6$ squares tall. (a) Which rectangle, $B$ or $C$, is congruent to rectangle $A$? (b) Explain why the other one is not.',
          answer: '(a) $B$ (b) $C$ has sides twice as long: same shape, different size',
          working: 'B is A turned; C is A enlarged',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'On squared paper, rectangle A is 5 squares long and 3 squares tall. Rectangle B is 3 squares long and 5 squares tall. Rectangle C is 10 squares long and 6 squares tall. Part a. Which rectangle, B or C, is congruent to rectangle A? Part b. Explain why the other one is not.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Congruent', md: 'Two shapes are **congruent** when they have the **same shape** and the **same size**: one could be slid, turned or flipped to cover the other **exactly**. Where a shape sits and which way it faces do **not** matter.' }],
      lines: [
        { say: 'Two shapes are congruent when they have the same shape and the same size. One could be slid, turned, or flipped to cover the other exactly.', show: 'c' },
        { say: 'Where a shape sits, and which way it faces, do not matter.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Matching sides', md: 'For polygons to be congruent, **every** side must match a side of the **same length**. For rectangles, compare the **short** sides and the **long** sides. A shape with the same angles but **longer** sides is **not** congruent.' }],
      lines: [
        { say: 'Here is what we need. For two polygons to be congruent, every side must match a side of the same length.', show: 'c' },
        { say: 'For rectangles, compare the short sides with each other, and the long sides with each other. A shape with longer sides is not congruent, even if it looks the same.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the **short** and **long** sides of each', 'Compare **B** with **A**', 'Compare **C** with **A**'] }],
      lines: [
        { say: 'Here is the plan. List the short and long sides of each rectangle.', show: 'plan.0' },
        { say: 'Compare B with A.', show: 'plan.1' },
        { say: 'Then compare C with A.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Compare the sides',
      layout: 'center',
      main: [rects('rc'), { kind: 'table', id: 't', head: ['Rectangle', 'Short side', 'Long side', 'Congruent to A?'], rows: [['A', '$3$', '$5$', '—'], ['B', '$3$', '$5$', '**yes**: A turned'], ['C', '$6$', '$10$', '**no**: twice as big']] }],
      lines: [
        { say: 'Here are the three rectangles on squared paper.', show: ['rc.paper', 'rc.a', 'rc.na', 'rc.b', 'rc.nb', 'rc.c', 'rc.nc'] },
        { say: 'Step one. Rectangle A has short sides of 3 squares and long sides of 5 squares.', show: 't.0', focus: 'rc.a' },
        { say: 'Step two. Rectangle B also has short sides of 3 and long sides of 5. It just stands on its short side. Turn A a quarter turn and it covers B exactly. So B is congruent to A.', show: 't.1', focus: ['rc.b', 't.1'] },
        { say: 'Step three. Rectangle C has short sides of 6 and long sides of 10. That is the same shape as A, but every side is twice as long. It is too big to cover A, so C is not congruent to A.', show: 't.2', focus: ['rc.c', 't.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A: 5 \\times 3 = 15, \\quad B: 3 \\times 5 = 15 \\ \\checkmark', 'C: 10 \\times 6 = 60 \\ne 15'] }],
      lines: [
        { say: 'Let us check with areas. Congruent shapes cover the same number of squares. A covers 5 times 3, which is 15 squares, and B covers 3 times 5, also 15.', show: 'm.0' },
        { say: 'C covers 10 times 6, which is 60 squares, four times as many. So C cannot be congruent to A. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"B is not, it faces another way"', 'turning does **not** change size or shape'],
            ['"C is, it is the same shape"', 'congruent needs the same **size** too'],
            ['"neither"', 'compare **short** with short and **long** with long'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying B is not congruent because it stands the other way forgets that turning a shape does not change its size or shape.' },
        { say: 'Saying C is congruent because it looks the same forgets that congruent shapes must also be the same size.' },
        { say: 'And saying neither one matches comes from comparing 5 with 3. Compare short sides with short sides, and long with long.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A triangle has sides of $4$ cm, $6$ cm and $7$ cm. Which triangle is congruent to it?',
          choices: ['sides $8$, $12$, $14$ cm', 'sides $7$, $4$, $6$ cm', 'sides $4$, $6$, $8$ cm', 'sides $4$, $4$, $7$ cm'],
          answer: 1,
          working: 'The same three lengths in a different order: the triangle is just turned or flipped.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has sides of 4, 6 and 7 centimetres. Which triangle is congruent to it? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '7, 4 and 6 centimetres are the same three lengths in a different order, so that triangle is the same one, just turned or flipped. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Congruent: same **shape** and same **size**', 'Turning or flipping does **not** matter', 'Match sides by **length**', 'Bigger copies are **not** congruent'] }],
      lines: [
        { say: 'Here is what to remember. Congruent shapes have the same shape and the same size.', show: 'sum.0' },
        { say: 'Turning, flipping or sliding a shape does not matter.', show: 'sum.1' },
        { say: 'Match the sides by their lengths, not by where they sit.', show: 'sum.2' },
        { say: 'And a bigger copy of a shape is not congruent to it. For more on congruent shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
