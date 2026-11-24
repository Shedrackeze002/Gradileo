import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 8.1 (the tangent ratio). The question is a Check Your
// Understanding exercise from OpenStax Contemporary Mathematics, word for word (section 10.8,
// Right Triangle Trigonometry, CC BY-NC-SA 4.0), with the book's figure described in brackets from
// its alt text: the shadow ends 105 ft from the house and the sun's ray meets the ground at 13°.
// The height is opposite the 13° angle and 105 ft is adjacent, so y = 105 tan 13° ≈ 24.2 ft, as
// in the book's answer. Check: 24.24 ÷ 105 ≈ 0.2309 ≈ tan 13°.

const H = 105 * Math.tan((13 * Math.PI) / 180);

/** The house, its shadow on the ground, and the sun's ray over the tip of the roof, to scale. */
const scene = (height = 380): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { B: [0, 0], R: [0, H], E: [105, 0] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'B' },
    { kind: 'thing', id: 'house', type: 'building', at: 'B', top: 'R', side: 'left', width: 26 },
    { kind: 'line', id: 'shadow', from: 'B', to: 'E', tone: 'adj', weight: 5, label: '105 \\text{ ft}', labelSide: 'right', group: 'tri' },
    { kind: 'line', id: 'ray', from: 'R', to: 'E', tone: 'theta', dashed: true, group: 'tri' },
    { kind: 'angle', id: 'a', at: 'E', from: 'R', to: 'B', tone: 'theta', label: '13^\\circ', r: 70, labelDist: 120, group: 'tri' },
    { kind: 'right', id: 'rt', at: 'B', from: 'R', to: 'E', group: 'tri' },
    { kind: 'line', id: 'y', from: 'B', to: 'R', tone: 'opp', weight: 6, label: 'y', labelSide: 'right', group: 'height' },
  ],
});

const QUESTION =
  'The sun casts a shadow over the roof of a house that ends 105 ft from the front door as shown in the figure. How high is the house to the tip of the roof? [The figure: a right triangle. The vertical side is the height of the house. The horizontal side, along the ground to the end of the shadow, is 105 ft. The sun’s ray over the tip of the roof meets the ground at an angle of 13°.]';

const video: Explainer = {
  id: 'xq-m103-8-1',
  lessonId: '',
  exam: {
    lesson: 'm103-8-1',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 10.8, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-8-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How High Is the House? (The Tangent Ratio)',
  thumbnailTitle: 'How High Is the House?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: the sun casts a shadow over the roof of a house, and the shadow ends 105 ft from the front door. The sun’s ray meets the ground at 13°. How high is the house to the tip of the roof? The height is opposite the 13° angle and the 105 ft is next to it, so we use the tangent: tan 13° = y/105, and y = 105 tan 13° ≈ 24.2 ft. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How High Is the House?', subtitle: 'The tangent ratio, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the tangent ratio. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 640,
      left: [scene()],
      right: [{ kind: 'text', id: 'q', size: 'md', md: '**The question:** The sun casts a shadow over the roof of a house that ends $105$ ft from the front door as shown in the figure. How high is the house to the tip of the roof?' }],
      lines: [
        { say: 'Here is the question, from the book, with our drawing of its figure.', show: ['pic.ground', 'pic.house', 'pic.tri', 'q'] },
        { say: 'The sun casts a shadow over the roof of a house. The shadow ends 105 feet from the front door, and the sun\'s ray meets the ground at 13 degrees. How high is the house to the tip of the roof?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [scene()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'From the $13^\\circ$ angle: the height $y$ is **opposite**, and the $105$ ft is **adjacent** (next to it).' }],
      lines: [
        { say: 'The house, the ground and the sun\'s ray make a right triangle. The right angle is at the bottom of the house.', show: ['pic.ground', 'pic.house', 'pic.tri'] },
        { say: 'We want the height of the house. Call it y.', show: 'pic.y' },
        { say: 'Stand at the 13 degree angle. The height y is across from it, the opposite side. The 105 feet runs from it to the right angle, the adjacent side.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\tan \\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Opposite and adjacent', md: 'When the sides are **opposite** and **adjacent**, use **tangent**. Set your calculator to **degrees**.' },
      ],
      lines: [
        { say: 'Here is what we need. The tangent of an angle is the opposite side divided by the adjacent side.', show: 'f' },
        { say: 'Our two sides are the opposite and the adjacent, so tangent is the ratio to use. And make sure your calculator is in degree mode.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **tangent** equation', '**Multiply** both sides by $105$', 'Use a **calculator** and round'] }],
      lines: [
        { say: 'Here is the plan. Write the tangent equation.', show: 'plan.0' },
        { say: 'Multiply both sides by 105.', show: 'plan.1' },
        { say: 'Then use a calculator, and round.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tan 13^\\circ = \\dfrac{y}{105}'] }],
      lines: [
        { say: 'Step one. The tangent of 13 degrees is the opposite, y, over the adjacent, 105.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = 105 \\tan 13^\\circ'] }],
      lines: [
        { say: 'Step two. y is divided by 105, so multiply both sides by 105. y equals 105 times the tangent of 13 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Calculate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y \\approx 105 \\times 0.2309 \\approx 24.24', 'y \\approx \\good{24.2 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The tangent of 13 degrees is about 0.2309. 105 times that is about 24.24.', show: 'm.0' },
        { say: 'Rounded to the nearest tenth, the house is about 24.2 feet high to the tip of the roof.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{24.2}{105} \\approx 0.230 \\approx \\tan 13^\\circ \\ \\checkmark', '\\text{small angle} \\Rightarrow \\text{height much less than } 105 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 24.2 divided by 105 is about 0.230, which matches the tangent of 13 degrees.', show: 'm.0' },
        { say: 'And the size makes sense. The sun is low, only 13 degrees up, so the shadow is much longer than the house is tall. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$105 \\sin 13^\\circ \\approx 23.6$', '$105$ ft is **adjacent**, not the hypotenuse: use tan'],
            ['$105 \\div \\tan 13^\\circ \\approx 455$', '$y$ is on **top**: multiply by $105$'],
            ['$105 \\tan 13 \\approx 48.6$', 'calculator in **radians**: switch to degrees'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Sine uses the hypotenuse. The 105 feet is next to the angle, so it is the adjacent side, and we use tangent.' },
        { say: 'y is on top of the fraction, so multiply by 105. Dividing gives 455 feet, a house taller than the shadow is long.' },
        { say: 'And if your calculator is in radian mode, you get about 48.6. Switch it to degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tree casts a shadow $40$ ft long when the sun’s rays meet the ground at $35^\\circ$. How tall is the tree, to the nearest tenth of a foot?',
          choices: ['$28.0$ ft', '$22.9$ ft', '$57.1$ ft', '$32.8$ ft'],
          answer: 0,
          working: '$h = 40 \\tan 35^\\circ \\approx 40 \\times 0.7002 \\approx 28.0$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A tree casts a shadow 40 feet long when the sun\'s rays meet the ground at 35 degrees. How tall is the tree, to the nearest tenth of a foot? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The height is opposite the angle, and the shadow is adjacent. So the height is 40 times the tangent of 35 degrees, which is about 28.0 feet. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\tan \\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$', 'Name the sides **from the angle** you know', 'Unknown on top: **multiply**', 'Calculator in **degrees**'] }],
      lines: [
        { say: 'Here is what to remember. The tangent of an angle is the opposite over the adjacent.', show: 'sum.0' },
        { say: 'Name the sides from the angle you know.', show: 'sum.1' },
        { say: 'When the unknown is on top of the fraction, multiply.', show: 'sum.2' },
        { say: 'And keep your calculator in degrees. For more on the tangent ratio, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
