import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 3.3 (solving triangle problems). The question is an exercise
// from OpenStax Precalculus 2e, word for word (section 8.1, Non-right Triangles: Law of Sines,
// CC BY-NC-SA 4.0), with the book's figure description in brackets. The angle at the blimp is
// 180° − 70° − 62° = 48°, the sine law gives BC = 145 sin 70° / sin 48° ≈ 183.4 yd, and the height
// is BC sin 62° ≈ 161.9 yd.

type Stage = 'given' | 'C' | 'BC' | 'h';

/** The end zones A and B, 145 yd apart, and the blimp C above the field, drawn to scale (1 unit = 10 yd). */
const field = (stage: Stage, height = 480) => {
  const t = triangle({
    A: [0, 0],
    B: [14.5, 0],
    C: [5.892, 16.19],
    names: ['A', 'B', 'C'],
    sides: { AB: '145\\text{ yd}', ...(stage === 'BC' || stage === 'h' ? { BC: 'a \\approx 183.4' } : {}) },
    tones: stage === 'BC' || stage === 'h' ? { BC: 'opp' } : {},
    angles: { A: '70^\\circ', B: '62^\\circ', ...(stage === 'C' || stage === 'BC' ? { C: '48^\\circ' } : {}) },
    ...(stage === 'h' ? { altitude: 'C' as const, altitudeLabel: 'h' } : {}),
  });
  const dist: Record<string, number> = { aA: 80, aB: 85, aC: 120 };
  return figure('f', [{ ...t, items: t.items.map((it) => (it.kind === 'angle' && dist[it.id] ? { ...it, labelDist: dist[it.id] } : it)) }], height);
};

const BASE = ['f.shape', 'f.names', 'f.aA', 'f.aB'];

const QUESTION =
  'The diagram shown represents the height of a blimp flying over a football stadium. [An oblique triangle formed from three vertices A, B, and C. Vertices A and B are points on the ground, and vertex C is the blimp in the air between them. The distance between A and B is 145 yards. The angle at vertex A is 70 degrees, and the angle at vertex B is 62 degrees.] Find the height of the blimp if the angle of elevation at the southern end zone, point A, is 70°, the angle of elevation from the northern end zone, point B, is 62°, and the distance between the viewing points of the two end zones is 145 yards.';

const video: Explainer = {
  id: 'xq-m202-3-3',
  lessonId: '',
  exam: {
    lesson: 'm202-3-3',
    source: 'OpenStax, Precalculus 2e, Exercise in section 8.1, Non-right Triangles: Law of Sines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/8-1-non-right-triangles-law-of-sines',
    question: QUESTION,
  },
  title: 'Exam Question: How High Is the Blimp Over the Stadium? (Solving Triangle Problems)',
  thumbnailTitle: 'How High Is the Blimp?',
  thumbnail: 'f',
  summary:
    'A real test question, solved one small step at a time: from the two end zones of a stadium, 145 yards apart, a blimp is seen at angles of elevation of 70° and 62°. How high is it? We find the third angle, 48°, use the sine law to find the distance from one end zone to the blimp, about 183.4 yards, and then use a right triangle to find the height, about 161.9 yards. Then we check it another way and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How High Is the Blimp?', subtitle: 'Solving triangle problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that needs more than one triangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Precalculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'The diagram shown represents the height of a blimp flying over a football stadium. Find the height of the blimp if the angle of elevation at the southern end zone, point A, is $70^\\circ$, the angle of elevation from the northern end zone, point B, is $62^\\circ$, and the distance between the viewing points of the two end zones is 145 yards.',
          answer: 'about $161.9$ yd',
          working: '$\\angle C = 48^\\circ$; $a = \\dfrac{145 \\sin 70^\\circ}{\\sin 48^\\circ} \\approx 183.4$; $h = a \\sin 62^\\circ \\approx 161.9$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The diagram shown represents the height of a blimp flying over a football stadium. Find the height of the blimp if the angle of elevation at the southern end zone, point "A", is 70 degrees, the angle of elevation from the northern end zone, point B, is 62 degrees, and the distance between the viewing points of the two end zones is 145 yards.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [field('given')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The **height** is the straight-down distance from the blimp $C$ to the ground. It is **not** a side of triangle $ABC$.' }],
      lines: [
        { say: 'Here is the picture. "A" and B are the two end zones, 145 yards apart. The blimp, C, is in the air between them.', show: ['f.shape', 'f.names'] },
        { say: 'From "A", the blimp is 70 degrees above the ground. From B, it is 62 degrees above the ground.', show: ['f.aA', 'f.aB'], focus: ['f.aA', 'f.aB'] },
        { say: 'We want the height: the straight-down distance from the blimp to the field. That is not a side of the triangle, so we will need two steps.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'key', title: 'The sine law', md: '$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$, for **any** triangle.' },
        { kind: 'callout', id: 'right', tone: 'definition', title: 'In a right triangle', md: '$\\sin \\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$, so $\\text{opposite} = \\text{hypotenuse} \\times \\sin \\theta$.' },
      ],
      lines: [
        { say: 'Here is what we need. The sine law works in any triangle, including one with no right angle, like triangle "A" B C.', show: 'law' },
        { say: 'And in a right triangle, sine is opposite over hypotenuse, so the opposite side is the hypotenuse times the sine of the angle.', show: 'right' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the angle at the **blimp**', 'Use the **sine law** to find $BC$', 'Use a **right triangle** to find the height'] }],
      lines: [
        { say: 'Here is the plan. First, find the angle at the blimp, so we have a complete pair: the 145 yard side and the angle opposite it.', show: 'plan.0' },
        { say: 'Second, use the sine law to find the distance from B to the blimp.', show: 'plan.1' },
        { say: 'Third, drop a line straight down from the blimp, and use the right triangle it makes to find the height.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The angle at the blimp',
      layout: 'split',
      leftWidth: 620,
      left: [field('C')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle C = 180^\\circ - 70^\\circ - 62^\\circ', '\\angle C = \\good{48^\\circ}'] }],
      lines: [
        { say: 'Step one. The angles of triangle "A" B C add to 180 degrees.', show: [...BASE, 'm.0'] },
        { say: 'So the angle at the blimp is 180, minus 70, minus 62, which is 48 degrees. It is opposite the 145 yard side, so now we have a complete pair.', show: ['m.1', 'f.aC'], focus: ['f.aC', 'f.AB'] },
      ],
    },
    {
      chapter: 'Step 2: The sine law',
      layout: 'split',
      leftWidth: 620,
      left: [field('BC')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{a}{\\sin 70^\\circ} = \\dfrac{145}{\\sin 48^\\circ}', 'a = \\dfrac{145 \\sin 70^\\circ}{\\sin 48^\\circ}', 'a \\approx \\good{183.4}\\text{ yd}'] }],
      lines: [
        { say: 'Step two. Side "a", from B to the blimp, is opposite the 70 degree angle at "A".', show: [...BASE, 'f.aC', 'f.BC'], focus: ['f.BC', 'f.aA'] },
        { say: 'So "a" over sine 70 degrees equals 145 over sine 48 degrees.', show: 'm.0' },
        { say: 'Multiply by sine 70 degrees: "a" equals 145 sine 70 degrees, divided by sine 48 degrees.', show: 'm.1' },
        { say: 'That is about 183.4 yards from the northern end zone to the blimp.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The height',
      layout: 'split',
      leftWidth: 620,
      left: [field('h')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sin 62^\\circ = \\dfrac{h}{183.4}', 'h = 183.4 \\sin 62^\\circ', 'h \\approx \\good{161.9}\\text{ yd}'] }],
      lines: [
        { say: 'Step three. Drop a line straight down from the blimp to the field. That is the height, h, and it makes a right triangle with side "a".', show: [...BASE, 'f.BC', 'f.alt'], focus: 'f.alt' },
        { say: 'In that right triangle, the 183.4 yard side is the hypotenuse, and h is opposite the 62 degree angle at B. So sine 62 degrees equals h over 183.4.', show: 'm.0' },
        { say: 'So h equals 183.4 times sine 62 degrees.', show: 'm.1' },
        { say: 'The blimp is about 161.9 yards high.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['b = \\dfrac{145 \\sin 62^\\circ}{\\sin 48^\\circ} \\approx 172.3', 'h = 172.3 \\sin 70^\\circ \\approx 161.9 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going the other way, through end zone "A". The side from "A" to the blimp, b, is 145 sine 62 degrees over sine 48 degrees, about 172.3 yards.', show: 'm.0' },
        { say: 'Then the height is 172.3 times sine 70 degrees, which is about 161.9 yards again. Both routes agree.', show: 'm.1', focus: 'm.1' },
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
            ['$h = 145 \\tan 70^\\circ$', 'triangle $ABC$ has **no right angle** at $B$'],
            ['skipping $\\angle C$', 'the sine law needs the angle **opposite** 145 yd'],
            ['stopping at $183.4$', 'that is the **slant** distance, not the height'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot use tangent in triangle "A" B C, because it has no right angle. Right-triangle ratios only work after you drop the height.' },
        { say: 'Find the angle at the blimp first. The sine law needs the angle opposite the 145 yard side.' },
        { say: 'And 183.4 yards is the slanted distance to the blimp. The height needs one more step.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\triangle PQR$ you know all three sides. Which should you use first to find an angle?',
          choices: ['the sine law', 'SOH CAH TOA', 'the cosine law', 'the angle sum'],
          answer: 2,
          working: 'With three sides and no angle, there is no complete pair for the sine law, so use the **cosine law**.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle P Q R you know all three sides. Which should you use first to find an angle? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'With three sides and no angles, there is no complete pair for the sine law, the triangle may have no right angle, and the angle sum needs two angles. So start with the cosine law: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Draw the triangle and **mark** what you know', 'Get a **complete pair** for the sine law', 'Drop a **height** to make a right triangle', 'Check by another **route**'] }],
      lines: [
        { say: 'Here is what to remember. Draw the triangle and mark what you know.', show: 'sum.0' },
        { say: 'Find a complete pair, a side and its opposite angle, so you can use the sine law.', show: 'sum.1' },
        { say: 'Drop a height to make a right triangle when you need one.', show: 'sum.2' },
        { say: 'And check your answer by another route. For more on solving triangle problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
