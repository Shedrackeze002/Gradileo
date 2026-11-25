import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 8.3 (solving right-triangle problems). The question is a Your
// Turn from OpenStax Contemporary Mathematics, word for word (section 10.8, Right Triangle
// Trigonometry, CC BY-NC-SA 4.0). The angle of depression equals the angle of elevation from the
// ground (alternate angles), and tan θ = 1,450/6,864, so θ = tan⁻¹(0.2113) ≈ 11.9°, as in the
// book's answer. Check: 6,864 × tan 11.9° ≈ 1,446 ≈ 1,450.

const UP = 1450;
const OUT = 6864;

/** The tower, the line of sight down to the Magnificent Mile, and the level line from the deck. */
const scene = (height = 380): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { B: [0, 0], D: [0, UP], M: [OUT, 0], L: [OUT, UP] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'B' },
    { kind: 'thing', id: 'tower', type: 'tower', at: 'B', top: 'D' },
    { kind: 'label', id: 'deck', at: 'D', tex: '\\text{deck}', place: 'left', dot: true },
    { kind: 'label', id: 'mile', at: 'M', tex: '\\text{Magnificent Mile}', place: 'below left', dot: true },
    { kind: 'line', id: 'h', from: 'B', to: 'D', tone: 'opp', weight: 5, label: '1{,}450 \\text{ ft}', labelSide: 'left', group: 'tri' },
    { kind: 'line', id: 'g', from: 'B', to: 'M', tone: 'adj', weight: 5, label: '6{,}864 \\text{ ft}', labelSide: 'left', labelAt: 0.4, group: 'tri' },
    { kind: 'line', id: 'sight', from: 'D', to: 'M', tone: 'hyp', group: 'tri' },
    { kind: 'right', id: 'rt', at: 'B', from: 'D', to: 'M', group: 'tri' },
    { kind: 'line', id: 'level', from: 'D', to: 'L', tone: 'muted', dashed: true, group: 'dep' },
    { kind: 'angle', id: 'dep-angle', at: 'D', from: 'L', to: 'M', tone: 'theta', label: '\\theta', r: 90, labelDist: 150, group: 'dep' },
    { kind: 'angle', id: 'up-angle', at: 'M', from: 'B', to: 'D', tone: 'theta', label: '\\theta', r: 90, labelDist: 150, group: 'up' },
  ],
});

const QUESTION =
  'You travel to Chicago and visit the observation deck at Willis Tower, 1,450 ft above ground. You can see the Magnificent Mile to the northeast 6,864 ft away. What is the angle of depression from the observation deck to the Magnificent Mile?';

const video: Explainer = {
  id: 'xq-m103-8-3',
  lessonId: '',
  exam: {
    lesson: 'm103-8-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.8, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-8-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: The Angle of Depression From Willis Tower (Solving Right Triangles)',
  thumbnailTitle: 'Looking Down From Willis Tower',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: the observation deck at Willis Tower is 1,450 ft above the ground, and the Magnificent Mile is 6,864 ft away. What is the angle of depression from the deck to the Magnificent Mile? The angle of depression equals the angle of elevation from the ground, and the two known sides are opposite and adjacent, so tan θ = 1,450/6,864. The inverse tangent gives θ ≈ 11.9°. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Looking Down From Willis Tower', subtitle: 'Solving right triangles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding an angle in a right triangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You travel to Chicago and visit the observation deck at Willis Tower, $1{,}450$ ft above ground. You can see the Magnificent Mile to the northeast $6{,}864$ ft away. What is the angle of depression from the observation deck to the Magnificent Mile?',
          answer: 'about $11.9^\\circ$',
          working: '$\\theta = \\tan^{-1}\\left(\\dfrac{1{,}450}{6{,}864}\\right)$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You visit the observation deck at Willis Tower in Chicago, 1,450 feet above the ground. You can see the Magnificent Mile, 6,864 feet away. What is the angle of depression from the deck to the Magnificent Mile?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 680,
      left: [scene()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The **angle of depression** is measured **down from the level line** at your eye.' }],
      lines: [
        { say: 'Here is the tower, 1,450 feet up to the deck, and the Magnificent Mile, 6,864 feet away along the ground.', show: ['pic.ground', 'pic.tower', 'pic.deck', 'pic.mile', 'pic.h', 'pic.g', 'pic.rt'] },
        { say: 'You look down from the deck along this line of sight.', show: 'pic.sight' },
        { say: 'The angle of depression is measured down from a level line at your eye to the line of sight.', show: ['pic.dep', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 680,
      left: [scene()],
      right: [
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same angle at the bottom', md: 'The level line is **parallel** to the ground, so the angle of depression **equals** the angle up from the ground.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\theta = \\tan^{-1}\\left(\\dfrac{\\text{opp}}{\\text{adj}}\\right)'] },
      ],
      lines: [
        { say: 'Here is the key idea. The level line at the deck is parallel to the ground. So the angle of depression at the top is the same as the angle of elevation at the bottom. They are alternate angles.', show: ['pic.ground', 'pic.tower', 'pic.tri', 'pic.dep', 'pic.up', 'c'] },
        { say: 'From the bottom angle, the tower is opposite and the ground distance is adjacent. To find an angle from two sides, use the inverse tangent.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $\\tan \\theta$ from the two sides', 'Use the **inverse tangent**', '**Round** to a tenth of a degree'] }],
      lines: [
        { say: 'Here is the plan. Write the tangent of the angle using the two sides.', show: 'plan.0' },
        { say: 'Use the inverse tangent to find the angle.', show: 'plan.1' },
        { say: 'Then round to a tenth of a degree.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The tangent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tan \\theta = \\dfrac{1{,}450}{6{,}864} \\approx 0.2113'] }],
      lines: [
        { say: 'Step one. The tangent of the angle is the opposite, 1,450, over the adjacent, 6,864. That is about 0.2113.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Inverse tangent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\theta = \\tan^{-1}\\left(\\dfrac{1{,}450}{6{,}864}\\right) \\approx 11.93^\\circ'] }],
      lines: [
        { say: 'Step two. The inverse tangent undoes the tangent and gives the angle. On a calculator in degree mode, the inverse tangent of 1,450 over 6,864 is about 11.93 degrees. Use brackets around the fraction.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Round',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\theta \\approx \\good{11.9^\\circ}'] }],
      lines: [
        { say: 'Step three. To the nearest tenth, the angle of depression from the deck to the Magnificent Mile is about 11.9 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6{,}864 \\times \\tan 11.9^\\circ \\approx 1{,}447 \\approx 1{,}450 \\ \\checkmark', '\\text{far away, not high} \\Rightarrow \\text{a small angle} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working forwards. 6,864 times the tangent of 11.9 degrees is about 1,447 feet, very close to 1,450. The small difference is from rounding.', show: 'm.0' },
        { say: 'And the size makes sense. The Magnificent Mile is far away compared with the height of the deck, so you look down only a little. A small angle is right. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\tan^{-1}\\left(\\tfrac{6{,}864}{1{,}450}\\right) \\approx 78.1^\\circ$', 'that is the angle from the **tower**, not the level line'],
            ['$\\sin^{-1}\\left(\\tfrac{1{,}450}{6{,}864}\\right) \\approx 12.2^\\circ$', '$6{,}864$ is **adjacent**, not the hypotenuse'],
            ['$\\theta = 0.2113$', 'that is $\\tan \\theta$: use the **inverse**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'With the fraction upside down, you get 78.1 degrees. That is the angle measured from the tower, not down from the level line.' },
        { say: 'Inverse sine needs the hypotenuse. 6,864 feet is along the ground, the adjacent side, so use the inverse tangent.' },
        { say: 'And 0.2113 is the tangent of the angle, not the angle. Use the inverse tangent to get degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'From the top of a $120$ ft lighthouse, you see a boat $500$ ft from the base. What is the angle of depression to the boat, to the nearest tenth?',
          choices: ['$76.5^\\circ$', '$13.9^\\circ$', '$13.5^\\circ$', '$0.24^\\circ$'],
          answer: 2,
          working: '$\\theta = \\tan^{-1}\\left(\\dfrac{120}{500}\\right) = \\tan^{-1}(0.24) \\approx 13.5^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. From the top of a 120-foot lighthouse, you see a boat 500 feet from the base. What is the angle of depression to the boat, to the nearest tenth? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The height is opposite and the distance is adjacent, so the angle is the inverse tangent of 120 over 500, which is about 13.5 degrees. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Depression: measured **down** from the level line', 'It **equals** the angle of elevation from below', 'Two sides known: use an **inverse** ratio', 'Opposite and adjacent: $\\theta = \\tan^{-1}\\left(\\tfrac{\\text{opp}}{\\text{adj}}\\right)$'] }],
      lines: [
        { say: 'Here is what to remember. An angle of depression is measured down from a level line.', show: 'sum.0' },
        { say: 'It equals the angle of elevation from the bottom, because the level line and the ground are parallel.', show: 'sum.1' },
        { say: 'When you know two sides and want the angle, use an inverse ratio.', show: 'sum.2' },
        { say: 'With the opposite and the adjacent, that is the inverse tangent. For more on solving right-triangle problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
