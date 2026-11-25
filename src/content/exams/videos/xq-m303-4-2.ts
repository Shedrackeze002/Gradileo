import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 4.2 (dilations and scale factors). The question is a "Your
// Turn" from OpenStax Contemporary Mathematics, word for word (section 10.3, Triangles,
// CC BY-NC-SA 4.0). The sun's rays make the same angle with the ground for both, so the tree's
// right triangle is a dilation of the garage's with scale factor 180/30 = 6, and the tree is
// 6 × 10 = 60 ft tall, as in the book's answer (x/180 = 10/30).

const S = 0.1; // diagram units per foot

/** The garage and its 30 ft shadow, and the tree and its 180 ft shadow; `h` labels the tree. */
const scene = (o: { h?: string } = {}, height = 380): DiagramEl => {
  const gx = 0;
  const tx = 6.5;
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'G0' },
    { kind: 'thing', id: 'garage', type: 'building', at: 'G0', top: 'GT', side: 'left', width: 1.4, group: 'gar' },
    { kind: 'line', id: 'gh', from: 'G0', to: 'GT', tone: 'opp', weight: 5, label: '10\\text{ ft}', labelSide: 'left', group: 'gar' },
    { kind: 'line', id: 'gs', from: 'G0', to: 'GS', tone: 'adj', weight: 5, label: '30\\text{ ft}', group: 'gar' },
    { kind: 'line', id: 'gr', from: 'GT', to: 'GS', tone: 'theta', dashed: true, group: 'gar' },
    { kind: 'right', id: 'grt', at: 'G0', from: 'GT', to: 'GS', group: 'gar' },
    { kind: 'thing', id: 'tree', type: 'tree', at: 'T0', top: 'TT', group: 'tre' },
    { kind: 'line', id: 'th', from: 'T0', to: 'TT', tone: 'opp', weight: 5, label: o.h ?? 'x', labelSide: 'left', labelAt: 0.3, group: 'tre' },
    { kind: 'line', id: 'ts', from: 'T0', to: 'TS', tone: 'adj', weight: 5, label: '180\\text{ ft}', group: 'tre' },
    { kind: 'line', id: 'tr', from: 'TT', to: 'TS', tone: 'theta', dashed: true, group: 'tre' },
    { kind: 'right', id: 'trt', at: 'T0', from: 'TT', to: 'TS', group: 'tre' },
    { kind: 'angle', id: 'ga', at: 'GS', from: 'G0', to: 'GT', tone: 'good', r: 34, group: 'sun' },
    { kind: 'angle', id: 'ta', at: 'TS', from: 'T0', to: 'TT', tone: 'good', r: 70, group: 'sun' },
  ];
  return {
    kind: 'diagram',
    id: 'd',
    height,
    points: {
      G0: [gx, 0],
      GT: [gx, 10 * S],
      GS: [gx + 30 * S, 0],
      T0: [tx, 0],
      TT: [tx, 60 * S],
      TS: [tx + 180 * S, 0],
    },
    items,
  };
};

const QUESTION =
  'A tree casts a shadow of 180 feet early in the morning. A 10-foot high garage casts a shadow of 30 feet at the same time in the morning. What is the height of the tree?';

const video: Explainer = {
  id: 'xq-m303-4-2',
  lessonId: '',
  exam: {
    lesson: 'm303-4-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.3, Triangles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Tree? Shadows and Scale Factors (Dilations)',
  thumbnailTitle: 'How Tall Is the Tree?',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a tree casts a 180-foot shadow, and at the same time a 10-foot garage casts a 30-foot shadow. How tall is the tree? The sun makes the same angle with both, so the tree\'s triangle is a dilation of the garage\'s, with scale factor 180 ÷ 30 = 6. The tree is 6 × 10 = 60 feet tall. Then we check the ratios and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Tree?', subtitle: 'Dilations and scale factors, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about scale factors. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '$60$ ft',
          working: 'Scale factor $\\dfrac{180}{30} = 6$, so the tree is $6 \\times 10 = 60$ ft tall.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'A tree casts a shadow of 180 feet early in the morning. A 10-foot high garage casts a shadow of 30 feet at the same time in the morning. What is the height of the tree?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [scene(), { kind: 'text', id: 't', size: 'md', md: 'Same time, same **sun**: the two triangles have the **same shape**.' }],
      lines: [
        { say: 'Here is the garage. It is 10 feet high, and its shadow is 30 feet long.', show: ['d.ground', 'd.gar'] },
        { say: 'Here is the tree. Its shadow is 180 feet long, and we want its height, x.', show: 'd.tre', focus: 'd.th' },
        { say: 'It is the same time, so the sun\'s rays hit the ground at the same angle. The two triangles have the same shape.', show: ['d.sun', 't'], focus: 'd.sun' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dil', tone: 'definition', title: 'Dilation', md: 'A dilation makes a shape **bigger or smaller** without changing its shape: **every** length is multiplied by the same scale factor $k$.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['k = \\dfrac{\\text{image length}}{\\text{original length}}'] },
      ],
      lines: [
        { say: 'Here is what we need. A dilation makes a shape bigger or smaller without changing its shape. Every length is multiplied by the same scale factor, k.', show: 'dil' },
        { say: 'To find k, divide a length in the image by the matching length in the original.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **scale factor** from the shadows', 'Multiply the garage\'s **height** by it', 'Check the **ratios**'] }],
      lines: [
        { say: 'Here is the plan. First, find the scale factor from the two shadows, the lengths we know in both triangles.', show: 'plan.0' },
        { say: 'Second, multiply the garage\'s height by the scale factor.', show: 'plan.1' },
        { say: 'Third, check that the height and shadow keep the same ratio.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The scale factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['k = \\dfrac{\\text{tree\'s shadow}}{\\text{garage\'s shadow}} = \\dfrac{180}{30} = \\good{6}'] }],
      lines: [
        { say: 'Step one. The tree\'s triangle is a dilation of the garage\'s. Divide the tree\'s shadow by the garage\'s shadow: 180 over 30 is 6. So every length in the tree\'s triangle is 6 times the garage\'s.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The height',
      layout: 'center',
      main: [scene({ h: 'x = 60\\text{ ft}' }), { kind: 'math', id: 'm', size: 'md', lines: ['x = 6 \\times 10 = \\good{60 \\text{ ft}}'] }],
      lines: [
        { say: 'Step two. The heights match too, so the tree\'s height is 6 times the garage\'s.', show: ['d.ground', 'd.gar', 'd.tre', 'd.sun'] },
        { say: '6 times 10 is 60. The tree is 60 feet tall.', show: 'm.0', focus: ['m.0', 'd.th'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{garage: } \\dfrac{10}{30} = \\dfrac{1}{3}', '\\text{tree: } \\dfrac{60}{180} = \\dfrac{1}{3} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. For the garage, the height is 10 out of a 30 foot shadow: one third.', show: 'm.0' },
        { say: 'For the tree, 60 out of 180 is also one third. Both are as tall as one third of their shadows, which is what the same sun angle means. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$k = \\dfrac{30}{180}$', 'that **shrinks**: image over original, tree over garage'],
            ['$180 \\times 3 = 540$', 'the shadow is $3$ times the height: **divide** by $3$'],
            ['$180 - 30 + 10 = 160$', 'a dilation **multiplies**; it does not add'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '30 over 180 is a scale factor of one sixth, which would shrink the garage. The tree is bigger, so it is 180 over 30.' },
        { say: 'Each shadow is 3 times as long as the height, so divide the shadow by 3. Multiplying gives 540 feet.' },
        { say: 'And a dilation multiplies every length by the same number. Adding the difference in shadows does not work.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $1.5$ m fence post casts a $2$ m shadow. At the same time, a flagpole casts a $12$ m shadow. How tall is the flagpole?',
          choices: ['$16$ m', '$11.5$ m', '$9$ m', '$4$ m'],
          answer: 2,
          working: '$k = \\dfrac{12}{2} = 6$, so the flagpole is $6 \\times 1.5 = 9$ m tall.',
        },
      ],
      lines: [
        { say: 'Your turn. A 1.5 metre fence post casts a 2 metre shadow. At the same time, a flagpole casts a 12 metre shadow. How tall is the flagpole? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The scale factor is 12 over 2, which is 6. So the flagpole is 6 times 1.5, which is 9 metres: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same angles: one triangle is a **dilation** of the other', 'Scale factor: image $\\div$ original', '**Every** length is multiplied by $k$', 'Check: the ratios **match**'] }],
      lines: [
        { say: 'Here is what to remember. When two triangles have the same angles, one is a dilation of the other.', show: 'sum.0' },
        { say: 'The scale factor is a length in the image divided by the matching length in the original.', show: 'sum.1' },
        { say: 'Every length is multiplied by that scale factor.', show: 'sum.2' },
        { say: 'And check that the ratios match. For more on dilations and scale factors, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
