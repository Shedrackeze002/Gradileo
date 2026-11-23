import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 3.3 (perimeters, mitre cuts and central angles). The question
// is a "Your Turn" from OpenStax Contemporary Mathematics, word for word (section 10.4, Polygons,
// Perimeter, and Circumference, CC BY-NC-SA 4.0). The book's window is 2 ft wide with 5.3 ft sides
// and a semicircle of diameter 2 ft on top, and its answer is 2 + 2(5.3) + ½π(2) ≈ 15.74 ft. The
// line where the semicircle meets the rectangle is inside the window, so it gets no trim.

const rad = (d: number) => (d * Math.PI) / 180;
const ARC: Record<string, [number, number]> = {};
for (let k = 0; k <= 12; k++) ARC[`R${k}`] = [1 + Math.cos(rad(15 * k)), 5.3 + Math.sin(rad(15 * k))];
const ARC_IDS = Object.keys(ARC);

/** The window: a 2 ft by 5.3 ft rectangle with a semicircle on top; `inner` adds the hidden line. */
const window_ = (o: { inner?: boolean; arc?: string } = {}, height = 500): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'region', id: 'glass', points: ['BL', 'BR', ...ARC_IDS], tone: 'adj', shade: 0.16 },
    { kind: 'line', id: 'bottom', from: 'BL', to: 'BR', tone: 'theta', weight: 5, label: '2\\text{ ft}', group: 'straight' },
    { kind: 'line', id: 'right', from: 'BR', to: 'TR', tone: 'opp', weight: 5, label: '5.3\\text{ ft}', group: 'straight' },
    { kind: 'line', id: 'left', from: 'BL', to: 'TL', tone: 'opp', weight: 5, label: '5.3\\text{ ft}', group: 'straight' },
    { kind: 'curve', id: 'arc', points: ARC_IDS, tone: 'hyp', weight: 5, label: o.arc ?? '' },
  ];
  if (o.inner) {
    items.push(
      { kind: 'line', id: 'mid', from: 'TL', to: 'TR', tone: 'muted', dashed: true, label: 'd = 2\\text{ ft}', labelSide: 'right', group: 'inner' },
    );
  }
  return { kind: 'diagram', id: 'd', height, points: { BL: [0, 0], BR: [2, 0], TR: [2, 5.3], TL: [0, 5.3], ...ARC }, items };
};

const QUESTION = 'To make a trim for the window in the figure shown, you need the perimeter. How many feet of trim do you need to buy?';

const video: Explainer = {
  id: 'xq-m303-3-3',
  lessonId: '',
  exam: {
    lesson: 'm303-3-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.4, Polygons, Perimeter, and Circumference',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-4-polygons-perimeter-and-circumference',
    question: `${QUESTION} [A window shaped like a rectangle 2 feet wide, with sides of 5.3 feet, and a semicircle on top.]`,
  },
  title: 'Exam Question: How Much Trim for an Arched Window? (Perimeter)',
  thumbnailTitle: 'Trim for an Arched Window',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a window is a rectangle 2 feet wide with 5.3-foot sides, and a semicircle on top. How many feet of trim go around it? The straight parts are 2 + 5.3 + 5.3 = 12.6 feet, the semicircle is half of π × 2, about 3.14 feet, so the trim is about 15.74 feet. Then we check it is a sensible length and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Trim for an Arched Window', subtitle: 'Perimeter, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about perimeter. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: `${QUESTION} (Window on the next screen.)`,
          answer: 'about $15.74$ ft',
          working: '$2 + 2(5.3) + \\tfrac{1}{2}\\pi(2) \\approx 12.6 + 3.14 = 15.74$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'To make a trim for the window in the figure shown, you need the perimeter. How many feet of trim do you need to buy?' },
      ],
    },
    {
      chapter: 'The window',
      layout: 'split',
      leftWidth: 520,
      left: [window_()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The trim goes **around the outside**: three straight edges and a **curved** top.' }],
      lines: [
        { say: 'Here is the window. The bottom is 2 feet wide, and each side is 5.3 feet tall.', show: ['d.glass', 'd.straight'] },
        { say: 'On top sits a half circle, called a semicircle.', show: 'd.arc', focus: 'd.arc' },
        { say: 'The trim goes around the outside: three straight edges and the curved top.', show: 't' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'per', tone: 'definition', title: 'Perimeter', md: 'The distance **all the way around** the outside of a shape.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['C = \\pi d, \\qquad \\text{semicircle} = \\tfrac{1}{2}\\pi d'] },
      ],
      lines: [
        { say: 'Here is what we need. The perimeter is the distance all the way around the outside of a shape.', show: 'per' },
        { say: 'The distance around a circle is pi times its diameter, so the curve of a semicircle is half of that: one half pi d.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the three **straight** edges', 'Find the **curved** edge', 'Add them up'] }],
      lines: [
        { say: 'Here is the plan. First, add the three straight edges.', show: 'plan.0' },
        { say: 'Second, find the length of the curved edge.', show: 'plan.1' },
        { say: 'Third, add them up.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Straight edges',
      layout: 'split',
      leftWidth: 520,
      left: [window_()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 + 5.3 + 5.3', '= \\good{12.6 \\text{ ft}}'] }],
      lines: [
        { say: 'Step one. The bottom is 2 feet, and the two sides are 5.3 feet each.', show: ['d.glass', 'd.straight', 'm.0'], focus: 'd.straight' },
        { say: '2 plus 5.3 plus 5.3 is 12.6 feet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The curve',
      layout: 'split',
      leftWidth: 520,
      left: [window_({ inner: true, arc: '\\approx 3.14\\text{ ft}' })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{2}\\pi(2) = \\pi', '\\approx \\good{3.14 \\text{ ft}}'] }],
      lines: [
        { say: 'Step two. The semicircle sits on the top of the rectangle, so its diameter is the window\'s width, 2 feet.', show: ['d.glass', 'd.straight', 'd.inner'], focus: 'd.mid' },
        { say: 'Half of pi times 2 is just pi, about 3.14 feet.', show: ['m.0', 'm.1', 'd.arc'], focus: ['m.1', 'd.arc'] },
        { say: 'The dashed line across the middle is inside the window, so it gets no trim.' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12.6 + 3.14 = \\good{15.74 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. 12.6 plus 3.14 is 15.74. You need about 15.74 feet of trim, so in a store you would buy at least that much.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{flat top: } 12.6 + 2 = 14.6', '\\text{square top: } 12.6 + 1 + 2 + 1 = 16.6', '14.6 < 15.74 < 16.6 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. If the top were flat, the trim would be 12.6 plus 2, which is 14.6 feet. The curve bulges up, so the real trim is longer than that.', show: 'm.0' },
        { say: 'If the curve were replaced by a box 1 foot tall, the top would be 1 plus 2 plus 1, so 16.6 feet. The curve cuts the corners, so the real trim is shorter than that.', show: 'm.1' },
        { say: '15.74 sits between 14.6 and 16.6. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$12.6 + 2\\pi \\approx 18.88$', 'the top is **half** a circle'],
            ['$12.6 + 2 + 3.14 = 17.74$', 'the line under the arch is **inside**: no trim'],
            ['$12.6 + \\tfrac{1}{2}\\pi(1) \\approx 14.17$', '$1$ ft is the **radius**: use $C = \\pi d$ with $d = 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The top is half a circle, not a whole one. A whole circle would give about 18.88 feet.' },
        { say: 'The line under the arch is inside the window. Adding it gives 17.74 feet, which is too much.' },
        { say: 'And 1 foot is the radius. With pi d, use the diameter, 2 feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A window is a rectangle $3$ ft wide with $4$ ft sides, and a semicircle on top. How much trim goes around it?',
          choices: ['$15.71$ ft', '$20.42$ ft', '$18.71$ ft', '$13.36$ ft'],
          answer: 0,
          working: '$3 + 4 + 4 = 11$; $\\ \\tfrac{1}{2}\\pi(3) \\approx 4.71$; $\\ 11 + 4.71 = 15.71$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A window is a rectangle 3 feet wide with 4 foot sides, and a semicircle on top. How much trim goes around it? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The straight edges are 3 plus 4 plus 4, which is 11 feet. The semicircle is half of pi times 3, about 4.71 feet. Together, 15.71 feet: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Perimeter: only the **outside** edges', 'Add the **straight** edges', 'Semicircle: $\\tfrac{1}{2}\\pi d$', 'Check: between a flat top and a square top'] }],
      lines: [
        { say: 'Here is what to remember. The perimeter uses only the outside edges.', show: 'sum.0' },
        { say: 'Add up the straight edges.', show: 'sum.1' },
        { say: 'A semicircle\'s curve is one half pi d.', show: 'sum.2' },
        { say: 'And check that the answer makes sense. For more on perimeters, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
