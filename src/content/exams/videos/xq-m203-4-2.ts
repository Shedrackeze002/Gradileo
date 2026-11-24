import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 4.2 (problems with two right triangles). The question is an
// Exercise from OpenStax Algebra and Trigonometry 2e, word for word (section 7.2, Right Triangle
// Trigonometry, CC BY-NC-SA 4.0). Both triangles have the 500 ft adjacent side: the building is
// 500 tan 36° ≈ 363.27 ft and the top of the rod is 500 tan 38° ≈ 390.64 ft above the ground, so the
// rod is 390.64 − 363.27 ≈ 27.37 ft, as in the book's answer (27.372 ft).
// Check: 363.27 + 27.37 = 390.64.

/** The rod is drawn taller than it is (27 ft on a 363 ft building would be a speck), and the picture says so. */
const BLDG = 320;
const TOP = 420;

/** The building with its lightning rod, and the two right triangles from the point on the ground. */
const scene = (height = 420): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { G: [0, 0], F: [500, 0], B: [500, BLDG], R: [500, TOP], NS: [480, -60] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'G' },
    { kind: 'thing', id: 'bldg', type: 'building', at: 'F', top: 'B', side: 'right', width: 110 },
    { kind: 'thing', id: 'rod', type: 'flagpole', at: 'B', top: 'R' },
    { kind: 'label', id: 'you', at: 'G', tex: '\\text{you}', place: 'below', dot: true },
    { kind: 'label', id: 'ns', at: 'NS', tex: '\\text{(not to scale)}', tone: 'muted', place: 'below' },
    { kind: 'line', id: 'base', from: 'G', to: 'F', tone: 'adj', label: '500 \\text{ ft}', labelSide: 'right' },
    { kind: 'region', id: 'tb', points: ['G', 'F', 'B'], tone: 'opp', group: 'low' },
    { kind: 'line', id: 'sb', from: 'G', to: 'B', group: 'low' },
    { kind: 'angle', id: 'ab', at: 'G', from: 'F', to: 'B', tone: 'theta', label: '36^\\circ', r: 55, group: 'low' },
    { kind: 'right', id: 'rt', at: 'F', from: 'G', to: 'B', group: 'low' },
    { kind: 'line', id: 'b', from: 'F', to: 'B', tone: 'opp', weight: 6, label: 'b', labelSide: 'left', group: 'low' },
    { kind: 'line', id: 'sr', from: 'G', to: 'R', tone: 'hyp', group: 'high' },
    { kind: 'angle', id: 'ar', at: 'G', from: 'F', to: 'R', tone: 'hyp', label: '38^\\circ', r: 160, group: 'high' },
    { kind: 'line', id: 'x', from: 'B', to: 'R', tone: 'hyp', weight: 6, label: 'x', labelSide: 'right', group: 'high' },
  ],
});
const PIC = ['pic', 'pic.ground', 'pic.bldg', 'pic.rod', 'pic.you', 'pic.ns', 'pic.base'];

const QUESTION =
  'There is lightning rod on the top of a building. From a location 500 feet from the base of the building, the angle of elevation to the top of the building is measured to be 36°. From the same location, the angle of elevation to the top of the lightning rod is measured to be 38°. Find the height of the lightning rod.';

const video: Explainer = {
  id: 'xq-m203-4-2',
  lessonId: '',
  exam: {
    lesson: 'm203-4-2',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 7.2, Right Triangle Trigonometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-2-right-triangle-trigonometry',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Lightning Rod? (Two Right Triangles)',
  thumbnailTitle: 'How Tall Is the Lightning Rod?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: from 500 feet away, the angle of elevation to the top of a building is 36°, and to the top of the lightning rod on it, 38°. Find the height of the lightning rod. Two right triangles share the 500 ft side: the building is 500 tan 36° ≈ 363.27 ft, the top of the rod is 500 tan 38° ≈ 390.64 ft, and the rod is the difference, about 27.37 ft. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Lightning Rod?', subtitle: 'Two right triangles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question with two right triangles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about $27.37$ ft', working: '$500\\tan 38^\\circ - 500\\tan 36^\\circ \\approx 390.64 - 363.27 \\approx 27.37$' }],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'There is a lightning rod on the top of a building. From a location 500 feet from the base of the building, the angle of elevation to the top of the building is 36 degrees.' },
        { say: 'From the same location, the angle of elevation to the top of the lightning rod is 38 degrees. Find the height of the lightning rod.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [scene()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Two right triangles share the $500$ ft side. The rod $x$ is the **difference** between their heights.' }],
      lines: [
        { say: 'Let us picture it. You stand 500 feet from the base of the building, with the lightning rod on top.', show: PIC },
        { say: 'Looking up 36 degrees, you see the top of the building. That makes one right triangle. Call the building\'s height b.', show: 'pic.low' },
        { say: 'Looking up 38 degrees, you see the top of the rod. That makes a taller right triangle. The rod, x, is the piece between the two tops. It is drawn taller than it really is, so we can see it.', show: ['pic.high', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}', '\\text{opposite} = \\text{adjacent} \\times \\tan\\theta'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'One triangle at a time', md: 'The $36^\\circ$ and $38^\\circ$ angles belong to **different** right triangles. Solve each one, then **subtract** the heights.' },
      ],
      lines: [
        { say: 'Here is what we need. In both triangles, the 500 feet is adjacent to the angle, and the height is opposite. So we use tangent: the opposite side is the adjacent side times tan theta.', show: 'f' },
        { say: 'The 36 and 38 degree angles belong to different right triangles. Solve each one, then subtract the heights.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **building**, with $36^\\circ$', 'Find the **top of the rod**, with $38^\\circ$', '**Subtract** for the rod'] }],
      lines: [
        { say: 'Here is the plan. Find the height of the building, with the 36 degree angle.', show: 'plan.0' },
        { say: 'Find the height of the top of the rod, with the 38 degree angle.', show: 'plan.1' },
        { say: 'Then subtract to get the rod.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The two heights',
      layout: 'split',
      left: [scene(400)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['b = 500\\tan 36^\\circ \\approx 363.27 \\text{ ft}', 'b + x = 500\\tan 38^\\circ \\approx 390.64 \\text{ ft}'] }],
      lines: [
        { say: 'Step one. In the lower triangle, the building is 500 times tan 36 degrees, about 363.27 feet.', show: [...PIC, 'pic.low', 'm.0'], focus: 'm.0' },
        { say: 'Step two. In the taller triangle, the top of the rod is 500 times tan 38 degrees, about 390.64 feet above the ground.', show: ['pic.high', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 390.64 - 363.27', '\\approx \\good{27.37 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The rod is the top of the rod minus the top of the building: 390.64 minus 363.27.', show: 'm.0' },
        { say: 'That is about 27.37. The lightning rod is about 27.37 feet tall.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['363.27 + 27.37 = 390.64 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The building plus the rod should reach the top of the rod: 363.27 plus 27.37 is 390.64. It checks out.', show: 'm.0', focus: 'm.0' },
        { say: 'And it makes sense: a 2 degree difference, seen from 500 feet away, is a fairly short rod on a tall building.' },
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
            ['$17.46$ ft', 'used $38^\\circ - 36^\\circ = 2^\\circ$: the angles are in **different** triangles'],
            ['$390.64$ ft', 'stopped at the top of the rod: that is building **plus** rod'],
            ['$13.94$ ft', 'used **sine**: $500$ ft is **adjacent**, so use tangent'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '17.46 subtracts the angles first and uses 500 times tan 2 degrees. There is no right triangle with a 2 degree angle and the 500 foot side, so subtract the heights, not the angles.' },
        { say: '390.64 stops too soon. That is the building and the rod together.' },
        { say: 'And 13.94 uses sine. The 500 feet is next to the angle, the adjacent side, so we need tangent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'From $200$ m away, the angle of elevation to the top of a cliff is $30^\\circ$, and to the top of a lighthouse on the cliff, $35^\\circ$. How tall is the lighthouse, to the nearest metre?',
          choices: ['$17$ m', '$115$ m', '$140$ m', '$25$ m'],
          answer: 3,
          working: '$200\\tan 35^\\circ - 200\\tan 30^\\circ \\approx 140.04 - 115.47 \\approx 24.6$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. From 200 metres away, the angle of elevation to the top of a cliff is 30 degrees, and to the top of a lighthouse on the cliff, 35 degrees. How tall is the lighthouse, to the nearest metre? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '200 times tan 35 degrees is about 140.04, and 200 times tan 30 degrees is about 115.47. The difference is about 24.6, so 25 metres. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two angles from one point: **two** triangles', 'Find the **shared** side first', 'Solve each triangle with **tangent**', '**Subtract** the heights, not the angles'] }],
      lines: [
        { say: 'Here is what to remember. Two angles from one point make two right triangles.', show: 'sum.0' },
        { say: 'Find the side they share. Here, both use the 500 feet along the ground.', show: 'sum.1' },
        { say: 'Solve each triangle on its own, here with tangent.', show: 'sum.2' },
        { say: 'And subtract the heights, not the angles. For more on problems with two right triangles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
