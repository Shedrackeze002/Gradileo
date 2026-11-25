import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arcArrow, caption, join, letterS, mark, place, regular, shape, turns } from '@/content/math9/videos/lib/m9-9-figures.ts';

// Exam question for Math 9 lesson 9.2 (rotation symmetry). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit test. The
// order is the number of times a shape fits onto itself in one full turn, and the smallest angle of
// rotation is 360° ÷ order: regular hexagon order 6, 60°; letter S order 2, 180°.

const QUESTION =
  'For each shape, give the order of rotation symmetry and the smallest angle of rotation. (a) a regular hexagon (b) the letter S';

const HEX = regular(6, 1, 90);
const S = place(letterS(), 0, 0, 0.4);

const pair = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ name: 'h', pieces: [place(regular(6, 1.8, 90), 0, 0)], tone: 'hyp' }),
        mark({ name: 'h', id: 'ctr', at: [0, 0], tone: 'ink' }),
        arcArrow({ name: 'h', id: 'spin', c: [0, 0], r: 2.5, from: 20, to: 110 }),
        caption({ name: 'h', id: 'cap', at: [0, -3.1], tex: '\\text{(a) regular hexagon}' }),
        shape({ name: 's', pieces: [place(letterS(), 8, 0, 0.7)], tone: 'adj' }),
        mark({ name: 's', id: 'ctr', at: [8, 0], tone: 'ink' }),
        arcArrow({ name: 's', id: 'spin', c: [8, 0], r: 2.5, from: 20, to: 110 }),
        caption({ name: 's', id: 'cap', at: [8, -3.1], tex: '\\text{(b) letter S}' }),
      ),
    ],
    340,
  );

const hexTurns = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [HEX],
        marker: [0, 1],
        angles: [0, 60, 120, 180, 240, 300, 360],
        gap: 3,
        labels: ['\\text{start}', '60^\\circ', '120^\\circ', '180^\\circ', '240^\\circ', '300^\\circ', '360^\\circ'],
        tones: ['ink', 'good', 'good', 'good', 'good', 'good', 'good'],
      }),
    ],
    250,
  );

const sTurns = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [S],
        marker: [0.8, 1],
        angles: [0, 90, 180, 270, 360],
        gap: 3,
        labels: ['\\text{start}', '90^\\circ\\ \\text{no}', '180^\\circ \\to 1', '270^\\circ\\ \\text{no}', '360^\\circ \\to 2'],
        tones: ['ink', 'bad', 'good', 'bad', 'good'],
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'xq-m9-9-2',
  lessonId: '',
  exam: {
    lesson: 'm9-9-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Order and Angle of Rotation (Rotation Symmetry)',
  thumbnailTitle: 'Order and Angle of Rotation',
  thumbnail: 'hx',
  summary:
    'An exam-style question, solved one small step at a time: for each shape, give the order of rotation symmetry and the smallest angle of rotation. (a) a regular hexagon (b) the letter S. The order is the number of times a shape fits onto itself during one full turn, and the smallest angle of rotation is 360° divided by the order. The hexagon fits 6 times, so its order is 6 and its angle is 60°. The S fits only after a half turn and a full turn, so its order is 2 and its angle is 180°. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Order and Angle of Rotation', subtitle: 'Rotation symmetry, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about rotation symmetry. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'For each shape, give the order of rotation symmetry and the smallest angle of rotation. (a) a regular hexagon (b) the letter S',
          answer: '(a) order $6$, $60^\\circ$ (b) order $2$, $180^\\circ$',
          working: 'angle = 360° ÷ order',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'For each shape, give the order of rotation symmetry and the smallest angle of rotation. Part a: a regular hexagon. Part b: the letter S.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pair('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Order of rotation', md: 'Turn a shape about its centre. The **order** is how many times it **fits onto itself** in one full turn. The **angle of rotation** is the smallest turn that fits.' }],
      lines: [
        { say: 'Here are the two shapes, each with its centre of rotation.', show: ['ask.h-shape', 'ask.h-ctr', 'ask.h-cap', 'ask.s-shape', 'ask.s-ctr', 'ask.s-cap'] },
        { say: 'Turn each shape about its centre. The order is how many times it fits onto itself in one full turn. The angle of rotation is the smallest turn that makes it fit.', show: ['ask.h-spin', 'ask.s-spin', 'c'], focus: ['ask.h-spin', 'ask.s-spin'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{order} = \\text{fits in one full turn}', '\\text{angle} = 360^\\circ \\div \\text{order}'] }],
      lines: [
        { say: 'Here is what we need. The order is the number of fits in one full turn, counting the full turn itself once.', show: 'm.0' },
        { say: 'The fits are equally spaced, so the smallest angle of rotation is 360 degrees divided by the order.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Turn** the shape about its centre', '**Count** the fits up to $360^\\circ$', '**Divide** $360^\\circ$ by the order'] }],
      lines: [
        { say: 'Here is the plan. Turn the shape about its centre.', show: 'plan.0' },
        { say: 'Count the fits, up to and including the full turn.', show: 'plan.1' },
        { say: 'Then divide 360 degrees by the order.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Turn and count',
      layout: 'center',
      main: [hexTurns('hx'), sTurns('sx')],
      lines: [
        { say: 'Step one, part a. Here is the hexagon. The yellow dot shows how far it has turned.', show: 'hx.c0' },
        { say: 'Turn it 60 degrees, and it fits. Again at 120, 180, 240 and 300 degrees.', show: ['hx.c1', 'hx.c2', 'hx.c3', 'hx.c4', 'hx.c5'], focus: ['hx.c1', 'hx.c2', 'hx.c3', 'hx.c4', 'hx.c5'] },
        { say: 'And the full turn, 360 degrees, makes 6 fits. The order is 6, and the smallest angle is 60 degrees.', show: 'hx.c6', focus: 'hx.c6' },
        { say: 'Step two, part b. Here is the letter S.', show: 'sx.c0' },
        { say: 'After a quarter turn, 90 degrees, it lies on its side. No fit. After a half turn, 180 degrees, it fits.', show: ['sx.c1', 'sx.c2'], focus: ['sx.c1', 'sx.c2'] },
        { say: 'At 270 degrees it does not fit, and at 360 degrees it is back at the start. 2 fits, so the order is 2, and the smallest angle is 180 degrees.', show: ['sx.c3', 'sx.c4'], focus: ['sx.c3', 'sx.c4'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } 360^\\circ \\div 6 = 60^\\circ \\ \\checkmark', '\\text{(b) } 360^\\circ \\div 2 = 180^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the rule. For the hexagon, 360 divided by 6 is 60 degrees, the turn we found.', show: 'm.0', focus: 'm.0' },
        { say: 'For the S, 360 divided by 2 is 180 degrees, a half turn. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['hexagon: order $7$', 'counted the start **and** the full turn: count it **once**'],
            ['S: order $1$', 'it **does** fit after a half turn'],
            ['S: order $4$', 'after a quarter turn the S lies on its **side**: no fit'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Order 7 for the hexagon counts the start and the full turn as two fits. They are the same position, so count it once.' },
        { say: 'Order 1 for the S misses the half turn. Turn an S upside down, and it is still an S.' },
        { say: 'And order 4 for the S counts the quarter turns. After a quarter turn, the S lies on its side, so it does not fit.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A shape has rotation symmetry of order $5$. What is its smallest angle of rotation?',
          choices: ['$60^\\circ$', '$72^\\circ$', '$36^\\circ$', '$5^\\circ$'],
          answer: 1,
          working: '360° ÷ 5 = 72°.',
        },
      ],
      lines: [
        { say: 'Your turn. A shape has rotation symmetry of order 5. What is its smallest angle of rotation? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '360 divided by 5 is 72. The smallest angle of rotation is 72 degrees. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Turn** about the centre', 'Order: fits in **one** full turn', 'Count the full turn **once**', 'Angle $= 360^\\circ \\div$ **order**'] }],
      lines: [
        { say: 'Here is what to remember. Turn the shape about its centre.', show: 'sum.0' },
        { say: 'The order is the number of fits in one full turn.', show: 'sum.1' },
        { say: 'Count the full turn once, not the start as well.', show: 'sum.2' },
        { say: 'And the smallest angle of rotation is 360 degrees divided by the order. For more on rotation symmetry, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
