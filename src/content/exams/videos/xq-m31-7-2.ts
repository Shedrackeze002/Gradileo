import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 7.2 (related rates). The question is an exercise from OpenStax
// Calculus Volume 1 (section 4.1, Related Rates, CC BY-NC-SA 4.0): the book's set-up "For the
// following exercises, consider a right cone that is leaking water. The dimensions of the conical
// tank are a height of 16 ft and a radius of 5 ft." is put with the one question it asks about,
// word for word. Similar triangles give r = 5h/16, so V = 25πh³/768 and dV/dt = (25πh²/256) dh/dt.
// With dV/dt = −10 and h = 10, dh/dt = −128/(125π) ≈ −0.326 ft/min, as in the book's answer.
// Check: the water surface then has area π(3.125)² ≈ 30.7 ft², and 10/30.7 ≈ 0.326.

const QUESTION =
  'Consider a right cone that is leaking water. The dimensions of the conical tank are a height of 16 ft and a radius of 5 ft. How fast does the depth of the water change when the water is 10 ft high if the cone leaks water at a rate of 10 ft³/min?';

const R10 = 3.125; // the water's radius when it is 10 ft deep

/** The cone, point down, with the water 10 ft deep inside it. */
const cone = (height = 470): DiagramEl => ({
  kind: 'diagram',
  id: 'd',
  height,
  points: { O: [0, 0], TL: [-5, 16], TR: [5, 16], C: [0, 16], WL: [-R10, 10], WR: [R10, 10], W: [0, 10], H0: [7, 0], H1: [7, 10] },
  items: [
    { kind: 'region', id: 'water', points: ['O', 'WR', 'WL'], tone: 'adj', shade: 0.25, group: 'wet' },
    { kind: 'line', id: 'surface', from: 'WL', to: 'WR', tone: 'adj', weight: 3, group: 'wet' },
    { kind: 'line', id: 'left', from: 'O', to: 'TL', tone: 'ink', weight: 4, group: 'tank' },
    { kind: 'line', id: 'right', from: 'O', to: 'TR', tone: 'ink', weight: 4, group: 'tank' },
    { kind: 'line', id: 'rim', from: 'TL', to: 'TR', tone: 'ink', weight: 3, dashed: true, group: 'tank' },
    { kind: 'line', id: 'R', from: 'C', to: 'TR', tone: 'opp', weight: 3, label: '5', labelSide: 'left', group: 'dims' },
    { kind: 'line', id: 'Hh', from: 'O', to: 'C', tone: 'opp', weight: 2, dashed: true, label: '16', labelSide: 'left', group: 'dims' },
    { kind: 'line', id: 'r', from: 'W', to: 'WR', tone: 'theta', weight: 3, label: 'r', labelSide: 'left', group: 'water-dims' },
    { kind: 'line', id: 'h', from: 'H0', to: 'H1', tone: 'theta', weight: 3, label: 'h = 10', labelSide: 'right', group: 'water-dims' },
  ],
});

const video: Explainer = {
  id: 'xq-m31-7-2',
  lessonId: '',
  exam: {
    lesson: 'm31-7-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 4.1, Related Rates',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-1-related-rates',
    question: QUESTION,
  },
  title: 'Exam Question: How Fast Does the Water Drop in a Leaking Cone? (Related Rates)',
  thumbnailTitle: 'A Leaking Cone',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a conical tank 16 ft tall with a 5 ft radius leaks 10 ft³ of water a minute. How fast is the depth changing when the water is 10 ft deep? Similar triangles give r = 5h/16, so the volume of water is V = 25πh³/768. Differentiating with respect to time gives dV/dt = (25πh²/256) dh/dt, and with dV/dt = −10 and h = 10 we get dh/dt = −128/(125π) ≈ −0.326 ft/min. Then we check with the area of the water surface and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Leaking Cone', subtitle: 'Related rates, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about related rates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Consider a right cone that is leaking water. The dimensions of the conical tank are a height of 16 ft and a radius of 5 ft. How fast does the depth of the water change when the water is 10 ft high if the cone leaks water at a rate of 10 ft³/min?',
          answer: '$\\dfrac{dh}{dt} = -\\dfrac{128}{125\\pi} \\approx -0.326$ ft/min (falling)',
          working: '$V = \\dfrac{25\\pi}{768}h^3$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Consider a right cone that is leaking water. The tank has a height of 16 feet and a radius of 5 feet. How fast does the depth of the water change when the water is 10 feet high, if the cone leaks water at 10 cubic feet per minute?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [cone()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{know: } \\dfrac{dV}{dt} = -10', '\\text{want: } \\dfrac{dh}{dt} \\text{ when } h = 10'] }],
      lines: [
        { say: 'Here is the tank, point down: 16 feet tall, with a radius of 5 feet at the top.', show: ['d.tank', 'd.dims'] },
        { say: 'The water inside is a smaller cone, with depth h and radius r. Right now, h is 10.', show: ['d.wet', 'd.water-dims'] },
        { say: 'We know how fast the volume changes: it falls by 10 cubic feet a minute, so dV by dt is negative 10. We want how fast the depth changes: dh by dt.', show: 'm' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = \\dfrac{1}{3}\\pi r^2 h'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Related rates', md: 'Write an equation linking the quantities, then **differentiate both sides with respect to time** $t$. Substitute the numbers only **after** differentiating.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a cone is one third pi r squared h.', show: 'f' },
        { say: 'For related rates: write an equation linking the quantities, then differentiate both sides with respect to time. Put the numbers in only after differentiating.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Similar triangles**: write $r$ in terms of $h$', 'Write $V$ in terms of $h$ only', 'Differentiate with respect to $t$, then substitute'] }],
      lines: [
        { say: 'Here is the plan. Use similar triangles to write r in terms of h.', show: 'plan.0' },
        { say: 'Write the volume in terms of h only.', show: 'plan.1' },
        { say: 'Differentiate with respect to time, then substitute.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Similar triangles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{r}{h} = \\dfrac{5}{16} \\implies r = \\dfrac{5h}{16}', 'V = \\dfrac{1}{3}\\pi\\left(\\dfrac{5h}{16}\\right)^2 h = \\good{\\dfrac{25\\pi}{768}h^3}'] }],
      lines: [
        { say: 'Step one. The water cone and the tank have the same shape, so radius over height is the same for both: r over h is 5 over 16. So r is 5h over 16.', show: 'm.0' },
        { say: 'Put that into the volume: one third pi, times 25 h squared over 256, times h. That is 25 pi over 768, times h cubed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Differentiate in time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{dV}{dt} = \\dfrac{25\\pi}{768} \\cdot 3h^2 \\dfrac{dh}{dt} = \\good{\\dfrac{25\\pi h^2}{256}\\dfrac{dh}{dt}}'] }],
      lines: [
        { say: 'Step two. Differentiate both sides with respect to t. h depends on time, so the chain rule gives 3 h squared times dh by dt.', show: 'm.0' },
        { say: 'And 3 over 768 is 1 over 256. So dV by dt is 25 pi h squared over 256, times dh by dt.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-10 = \\dfrac{25\\pi(100)}{256}\\dfrac{dh}{dt}', '\\dfrac{dh}{dt} = \\dfrac{-10 \\cdot 256}{2500\\pi} = \\good{-\\dfrac{128}{125\\pi} \\approx -0.326 \\text{ ft/min}}'] }],
      lines: [
        { say: 'Step three. Now put in dV by dt equals negative 10, and h equals 10, so h squared is 100.', show: 'm.0' },
        { say: 'Solve: negative 10 times 256, over 2,500 pi. That simplifies to negative 128 over 125 pi, about negative 0.326 feet per minute. The water level is falling by about a third of a foot each minute.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{surface: } \\pi(3.125)^2 \\approx 30.7 \\text{ ft}^2', '\\dfrac{10 \\text{ ft}^3/\\text{min}}{30.7 \\text{ ft}^2} \\approx 0.326 \\text{ ft/min} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. At 10 feet deep, the water surface has radius 50 sixteenths, which is 3.125 feet. Its area is about 30.7 square feet.', show: 'm.0' },
        { say: 'Losing 10 cubic feet a minute from a surface of 30.7 square feet lowers it by about 0.326 feet a minute. The same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['Substitute $h = 10$ first', '$h$ becomes a constant and its rate **vanishes**'],
            ['Keep $r = 5$', 'the **water\'s** radius changes: $r = \\dfrac{5h}{16}$'],
            ['$\\dfrac{dV}{dt} = +10$', 'it is **leaking**: the volume falls, so $-10$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'If you put h equals 10 in before differentiating, h becomes a constant, and its rate disappears. Differentiate first.' },
        { say: 'The radius of the tank is 5, but the radius of the water changes with h.' },
        { say: 'And the tank is leaking, so the volume is falling: negative 10.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A spherical balloon is inflated at $100$ cm³/s. How fast is its radius growing when $r = 5$ cm? $\\left(V = \\tfrac{4}{3}\\pi r^3\\right)$',
          choices: ['$\\dfrac{1}{\\pi}$ cm/s', '$\\dfrac{1}{4\\pi}$ cm/s', '$4\\pi$ cm/s', '$1$ cm/s'],
          answer: 0,
          working: '$\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$: $100 = 4\\pi(25)\\dfrac{dr}{dt}$, so $\\dfrac{dr}{dt} = \\dfrac{1}{\\pi}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spherical balloon is inflated at 100 cubic centimetres per second. How fast is its radius growing when the radius is 5 centimetres? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Differentiate in time: dV by dt is 4 pi r squared times dr by dt. So 100 equals 100 pi times dr by dt, and dr by dt is 1 over pi centimetres per second. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Draw it, and list what you **know** and **want**', 'Cut to one variable (here, **similar triangles**)', 'Differentiate with respect to **time**', 'Substitute numbers **last**; check the sign'] }],
      lines: [
        { say: 'Here is what to remember. Draw a picture, and list what you know and what you want.', show: 'sum.0' },
        { say: 'Cut down to one changing quantity if you can. Here, similar triangles did that.', show: 'sum.1' },
        { say: 'Differentiate both sides with respect to time.', show: 'sum.2' },
        { say: 'Then substitute the numbers, and check the sign. For more on related rates, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
