import type { Explainer } from '@/video/script.ts';
import { cone, cylinder, figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 3.2 (volume of pyramids, cones and spheres). The question is
// an Exercise from OpenStax Prealgebra 2e, word for word (section 9.6, Solve Geometry Applications:
// Volume and Surface Area, CC BY-NC-SA 4.0). r = 10 ÷ 2 = 5 ft, and V = ⅓π(5²)(10) = 250π/3 ≈
// 261.8 ft³. The book uses 3.14 for π and gets 261.67 ft³; both are about 262 cubic feet.
// Check: 3 × 261.8 = 785.4 ≈ π × 25 × 10, the cylinder the cone fits inside.

/** The teepee's width, written under it, before we halve it. */
const across: Part = { points: { D: [0, -2] }, items: [{ kind: 'label', id: 'd', at: 'D', tex: '10 \\text{ ft across}', tone: 'adj', place: 'below' }] };

/** The height down the middle, labelled outside the narrow cone so the label clears its side (the group `ht`). */
const tall: Part = {
  points: { HL: [-3.4, 5] },
  items: [
    { kind: 'line', id: 'ht', from: 'O', to: 'V', tone: 'opp', dashed: true },
    { kind: 'right', id: 'ht-mark', at: 'O', from: 'V', to: 'R', group: 'ht' },
    { kind: 'label', id: 'ht-label', at: 'HL', tex: '10 \\text{ ft}', tone: 'opp', place: 'left', group: 'ht' },
  ],
};

/** The teepee: a cone 10 ft tall, 10 ft across, with its radius marked once we have halved the width. */
const teepee = (solved = false, height = 360) =>
  figure('tp', [cone({ r: 5, h: 10, labels: solved ? { r: '5 \\text{ ft}' } : {} }), tall, ...(solved ? [] : [across])], height);

const QUESTION = 'Teepee. What is the volume of a cone-shaped teepee tent that is 10 feet tall and 10 feet across at the base?';

const video: Explainer = {
  id: 'xq-m203-3-2',
  lessonId: '',
  exam: {
    lesson: 'm203-3-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Space Is Inside a Teepee? (Volume of Cones)',
  thumbnailTitle: 'How Much Space Is Inside the Teepee?',
  thumbnail: 'tp',
  summary:
    'A real test question, solved one small step at a time: what is the volume of a cone-shaped teepee tent that is 10 feet tall and 10 feet across at the base? A cone holds one third of the cylinder around it, so V = ⅓πr²h. The radius is 10 ÷ 2 = 5 ft, so V = ⅓ × π × 25 × 10 ≈ 261.8, about 262 cubic feet (the book, using 3.14 for π, gives 261.67). Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Space Is Inside a Teepee?', subtitle: 'Volume of cones, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of a cone. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Teepee. What is the volume of a cone-shaped teepee tent that is $10$ feet tall and $10$ feet across at the base?',
          answer: 'about $262\\ \\text{ft}^3$ (the book, using $3.14$ for $\\pi$, gives $261.67$)',
          working: '$r = 5$, and $\\tfrac13 \\pi (5)^2 (10) \\approx 261.8$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'What is the volume of a cone-shaped teepee tent that is 10 feet tall and 10 feet across at the base?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [teepee(), { kind: 'text', id: 't', size: 'md', md: 'The teepee is a **cone**. Its **volume** is the space inside it.' }],
      lines: [
        { say: 'Here is the teepee. It is a cone, 10 feet tall from the ground to the point.', show: ['tp', 'tp.shape', 'tp.lateral', 'tp.ht'] },
        { say: 'And it is 10 feet across at the base. That is the diameter.', show: 'tp.d' },
        { say: 'The volume is the amount of space inside the tent.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 480,
      left: [figure('cc', [cylinder({ r: 2, h: 4, tone: 'muted' }), cone({ name: 'cn', r: 2, h: 4, labels: { r: 'r', h: 'h' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V_{\\text{cylinder}} = \\pi r^2 h', 'V_{\\text{cone}} = \\tfrac13 \\pi r^2 h'] }],
      lines: [
        { say: 'Here is what we need. A cylinder holds pi r squared h.', show: ['cc', 'cc.shape', 'm.0'] },
        { say: 'A cone with the same radius and height fits inside it, and holds exactly one third as much. So the volume of a cone is one third pi r squared h.', show: ['cc.cn-shape', 'cc.cn-lateral', 'cc.cn-r', 'cc.cn-h', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Halve** the width for the radius', 'Put $r$ and $h$ into $V = \\tfrac13 \\pi r^2 h$', '**Round**, with the units'] }],
      lines: [
        { say: 'Here is the plan. Halve the width to get the radius.', show: 'plan.0' },
        { say: 'Put the radius and the height into the formula.', show: 'plan.1' },
        { say: 'Then round, and give the units.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The radius',
      layout: 'center',
      main: [teepee(true, 340), { kind: 'math', id: 'm', size: 'md', lines: ['r = 10 \\div 2 = 5 \\text{ ft}'] }],
      lines: [
        { say: 'Step one. The base is 10 feet across, so the radius is half of that: 5 feet.', show: ['tp', 'tp.shape', 'tp.lateral', 'tp.ht', 'tp.r', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: The volume',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = \\tfrac13 \\pi (5)^2 (10)', '= \\tfrac13 \\times 250\\pi', '\\approx 261.8 \\approx \\good{262 \\text{ ft}^3}'] }],
      lines: [
        { say: 'Step two. The volume is one third, times pi, times 5 squared, times 10.', show: 'm.0' },
        { say: '5 squared is 25, and 25 times 10 is 250. So we have one third of 250 pi.', show: 'm.1' },
        { say: 'Step three. 250 pi is about 785.4, and a third of that is about 261.8. The teepee holds about 262 cubic feet. The book uses 3.14 for pi and gets 261.67, which also rounds to 262.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\pi (5)^2 (10) \\approx 785.4', '785.4 \\div 3 \\approx 261.8 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the cylinder. A cylinder 10 feet tall with a 5 foot radius holds pi times 25 times 10, about 785.4 cubic feet.', show: 'm.0' },
        { say: 'The cone holds a third of that: 785.4 divided by 3 is about 261.8. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$785\\ \\text{ft}^3$', 'forgot the $\\tfrac13$: that is the **cylinder**'],
            ['$1047\\ \\text{ft}^3$', 'used the **width** $10$ as $r$: halve it'],
            ['$52\\ \\text{ft}^3$', 'forgot to **square** the radius'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '785 forgets the one third. That is the cylinder around the teepee, not the cone.' },
        { say: '1 thousand 47 uses the width, 10 feet, as the radius. Halve it first.', caption: '1047 uses the width, 10 feet, as the radius. Halve it first.' },
        { say: 'And 52 uses 5 in place of 5 squared. The radius is squared, because the base is a circle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cone-shaped paper cup is $9$ cm tall and $6$ cm across at the top. What is its volume, to the nearest cubic centimetre?',
          choices: ['$85\\ \\text{cm}^3$', '$254\\ \\text{cm}^3$', '$339\\ \\text{cm}^3$', '$28\\ \\text{cm}^3$'],
          answer: 0,
          working: '$r = 3$, and $\\tfrac13 \\pi (3)^2 (9) = 27\\pi \\approx 84.8\\ \\text{cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone-shaped paper cup is 9 centimetres tall and 6 centimetres across at the top. What is its volume, to the nearest cubic centimetre? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The radius is 3. One third times pi times 9 times 9 is 27 pi, about 84.8, so 85 cubic centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cone: $V = \\tfrac13 \\pi r^2 h$', 'A cone is **one third** of its cylinder', '**Halve** the width for $r$', 'Volume is in **cubic** units'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a cone is one third pi r squared h.', show: 'sum.0' },
        { say: 'A cone holds one third of the cylinder it fits inside.', show: 'sum.1' },
        { say: 'Halve the width across the base to get the radius.', show: 'sum.2' },
        { say: 'And volume is in cubic units, here cubic feet. For more on the volume of pyramids, cones and spheres, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
