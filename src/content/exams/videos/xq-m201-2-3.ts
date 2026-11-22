import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 2.3 (the sine law): the height of a building from two angles
// of elevation, 35° and then 53° after walking 250 feet closer. The question is an exercise from
// OpenStax Algebra and Trigonometry 2e, word for word (section 10.1, Non-right Triangles: Law of
// Sines, CC BY-NC-SA 4.0), whose answer key gives 371 ft. In triangle ABT the angles are 35°, 127°
// and 18°, so BT = 250 sin 35° / sin 18° ≈ 464.0 and the height is BT sin 53° ≈ 370.6 ft.

const H = 370.6;
const FOOT = 529.3;

/**
 * The street, the building and the two lines of sight, drawn to scale. `inner` shows the angles of
 * triangle ABT at B and T; `h` shows the height.
 */
const scene = (height = 380, opts: { inner?: boolean; h?: boolean } = {}): DiagramEl => {
  const { inner = true, h = true } = opts;
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'A' },
    { kind: 'thing', id: 'bldg', type: 'building', at: 'F', top: 'T', side: 'right', width: 90 },
    { kind: 'label', id: 'al', at: 'A', tex: 'A', place: 'below', dot: true, group: 'base' },
    { kind: 'label', id: 'bl', at: 'B', tex: 'B', place: 'below', dot: true, group: 'base' },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'adj', weight: 5, label: '250\\text{ ft}', labelSide: 'right', group: 'base' },
    { kind: 'label', id: 'tl', at: 'T', tex: 'T', place: 'above left', group: 'sight' },
    { kind: 'line', id: 'at', from: 'A', to: 'T', tone: 'ink', group: 'sight' },
    { kind: 'line', id: 'bt', from: 'B', to: 'T', tone: 'hyp', weight: 5, group: 'sight' },
    { kind: 'angle', id: 'a35', at: 'A', from: 'B', to: 'T', tone: 'theta', label: '35^\\circ', r: 70, labelDist: 105, group: 'sight' },
    { kind: 'angle', id: 'a53', at: 'B', from: 'F', to: 'T', tone: 'theta', label: '53^\\circ', r: 55, labelDist: 90, group: 'sight' },
  ];
  if (inner) {
    items.push(
      { kind: 'region', id: 'tri', points: ['A', 'B', 'T'], tone: 'good', shade: 0.12, group: 'inner' },
      { kind: 'angle', id: 'a127', at: 'B', from: 'A', to: 'T', tone: 'opp', label: '127^\\circ', r: 30, labelDist: 70, group: 'inner' },
      { kind: 'angle', id: 'a18', at: 'T', from: 'A', to: 'B', tone: 'good', label: '18^\\circ', r: 80, labelDist: 115, group: 'inner' },
    );
  }
  if (h) {
    items.push(
      { kind: 'line', id: 'ht', from: 'F', to: 'T', tone: 'opp', weight: 6, label: 'h', labelSide: 'left', group: 'h' },
      { kind: 'line', id: 'bf', from: 'B', to: 'F', tone: 'muted', dashed: true, group: 'h' },
      { kind: 'right', id: 'rt', at: 'F', from: 'B', to: 'T', group: 'h' },
    );
  }
  return {
    kind: 'diagram',
    id: 'pic',
    height,
    points: { A: [0, 0], B: [250, 0], F: [FOOT, 0], T: [FOOT, H] },
    items,
  };
};

const QUESTION =
  'In order to estimate the height of a building, two students stand at a certain distance from the building at street level. From this point, they find the angle of elevation from the street to the top of the building to be 35°. They then move 250 feet closer to the building and find the angle of elevation to be 53°. Assuming that the street is level, estimate the height of the building to the nearest foot.';

const video: Explainer = {
  id: 'xq-m201-2-3',
  lessonId: '',
  exam: {
    lesson: 'm201-2-3',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 10.1, Non-right Triangles: Law of Sines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/10-1-non-right-triangles-law-of-sines',
    question: QUESTION,
  },
  title: 'Exam Question: How Tall Is the Building? Two Angles of Elevation (The Sine Law)',
  thumbnailTitle: 'How Tall Is the Building?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: two students see the top of a building at 35°, walk 250 feet closer and see it at 53°. We find the angles of the triangle with no right angle, use the sine law for the line of sight, and then the sine ratio for the height: about 371 feet. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is the Building?', subtitle: 'The sine law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'In order to estimate the height of a building, two students stand at a certain distance from the building at street level. From this point, they find the angle of elevation from the street to the top of the building to be $35^\\circ$. They then move $250$ feet closer to the building and find the angle of elevation to be $53^\\circ$. Assuming that the street is level, estimate the height of the building to the nearest foot.',
          answer: 'about $371$ ft',
          working: '$BT = \\dfrac{250 \\sin 35^\\circ}{\\sin 18^\\circ} \\approx 464.0$, and $h = BT \\sin 53^\\circ \\approx 370.6$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'In order to estimate the height of a building, two students stand at a certain distance from the building at street level. From this point, they find the angle of elevation from the street to the top of the building to be 35 degrees.' },
        { say: 'They then move 250 feet closer to the building and find the angle of elevation to be 53 degrees. Assuming that the street is level, estimate the height of the building to the nearest foot.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        scene(360, { inner: false, h: false }),
        { kind: 'text', id: 't', size: 'md', md: 'We do **not** know how far the building is. The triangle $ABT$ has **no right angle**, but we know one side and its angles.' },
      ],
      lines: [
        { say: 'Let us draw it. The students first stand at point \"A\", then walk 250 feet to point \"B\". The top of the building is point T.', show: ['pic', 'pic.base'] },
        { say: 'From \"A\", the top is 35 degrees up. From \"B\", it is 53 degrees up.', show: 'pic.sight', focus: 'pic.sight' },
        { say: 'We do not know how far away the building is, so we cannot use one right triangle straight away. But triangle \"A\" B T, with no right angle, has a side we know, 250 feet. That is a job for the sine law.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'definition', title: 'The sine law', md: 'In any triangle, each side divided by the sine of the **opposite** angle gives the same number: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$.' },
        { kind: 'callout', id: 'sum', tone: 'key', title: 'Angles', md: 'The angles of a triangle add to $180^\\circ$, and so do the two angles on a **straight line**.' },
      ],
      lines: [
        { say: 'Here is what we need. The sine law: in any triangle, each side divided by the sine of the angle opposite it gives the same number.', show: 'law' },
        { say: 'And the angles of a triangle add to 180 degrees, and so do two angles that sit side by side on a straight line.', show: 'sum' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **angles** of triangle $ABT$', 'Use the **sine law** for the line of sight $BT$', 'Use the **sine ratio** for the height'] }],
      lines: [
        { say: 'Here is the plan. First, find the angles of triangle \"A\" B T.', show: 'plan.0' },
        { say: 'Second, use the sine law to find the line of sight from B to the top.', show: 'plan.1' },
        { say: 'Third, use the sine ratio in the right triangle to find the height.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The angles',
      layout: 'center',
      main: [
        scene(360, { h: false }),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle B = 180^\\circ - 53^\\circ = 127^\\circ', '\\angle T = 180^\\circ - 35^\\circ - 127^\\circ = 18^\\circ'] },
      ],
      lines: [
        { say: 'Step one. The angle inside the triangle at B sits on a straight line with the 53 degree angle, so it is 180 minus 53, which is 127 degrees.', show: ['pic', 'pic.base', 'pic.sight', 'pic.tri', 'pic.a127', 'm.0'], focus: 'pic.a127' },
        { say: 'The three angles add to 180, so the angle at the top is 180 minus 35 minus 127, which is 18 degrees.', show: ['pic.a18', 'm.1'], focus: 'pic.a18' },
      ],
    },
    {
      chapter: 'Step 2: The sine law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{BT}{\\sin 35^\\circ} = \\dfrac{250}{\\sin 18^\\circ}', 'BT = \\dfrac{250 \\sin 35^\\circ}{\\sin 18^\\circ}', '\\approx \\dfrac{250(0.5736)}{0.3090} \\approx \\good{464.0 \\text{ ft}}'] }],
      lines: [
        { say: 'Step two. The side B T is opposite the 35 degree angle at \"A\". The 250 foot side is opposite the 18 degree angle at T. So B T over the sine of 35 degrees equals 250 over the sine of 18 degrees.', show: 'm.0' },
        { say: 'Multiply both sides by the sine of 35 degrees.', show: 'm.1' },
        { say: 'The sine of 35 degrees is about 0.5736, and the sine of 18 degrees is about 0.3090. So B T is about 464.0 feet. That is the line of sight from B to the top.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The height',
      layout: 'center',
      main: [
        scene(360),
        { kind: 'math', id: 'm', size: 'md', lines: ['h = BT \\sin 53^\\circ \\approx 464.0(0.7986)', 'h \\approx 370.6 \\approx \\good{371 \\text{ ft}}'] },
      ],
      lines: [
        { say: 'Step three. Now drop the height h from the top to the street. The triangle from B up to the top and down to the foot of the building has a right angle. The height is opposite the 53 degree angle, and B T is the hypotenuse.', show: ['pic', 'pic.base', 'pic.sight', 'pic.inner', 'pic.h'], focus: 'pic.h' },
        { say: 'So h is B T times the sine of 53 degrees: 464.0 times 0.7986.', show: 'm.0' },
        { say: 'That is about 370.6 feet. To the nearest foot, the building is about 371 feet tall. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['BF = 464.0 \\cos 53^\\circ \\approx 279.3', '\\tan 35^\\circ \\approx \\dfrac{370.6}{250 + 279.3} = \\dfrac{370.6}{529.3} \\approx 0.700 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check from the first spot. The distance from B to the foot of the building is 464.0 times the cosine of 53 degrees, about 279.3 feet.', show: 'm.0' },
        { say: 'So point \"A\" is 250 plus 279.3, or 529.3 feet from the building. The height over that distance is about 0.700, and the tangent of 35 degrees is about 0.700 too. The answer fits.', show: 'm.1' },
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
            ['$\\angle B = 53^\\circ$ in triangle $ABT$', 'the angle **inside** the triangle is $180^\\circ - 53^\\circ = 127^\\circ$'],
            ['$h = 250 \\tan 53^\\circ$', '$250$ ft is not the distance **to the building**'],
            ['$BT \\approx 464$ ft', 'that is the **line of sight**, not the height'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 53 degree angle is outside triangle \"A\" B T. The angle inside, at B, is 127 degrees.' },
        { say: '250 feet is the walk between the two spots, not the distance to the building, so it is not the side of a right triangle with the height.' },
        { say: 'And 464 feet is the slanted line of sight. One more step turns it into the height.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\triangle ABC$, $\\angle A = 40^\\circ$, $\\angle B = 60^\\circ$ and $a = 10$. Find $b$ to the nearest tenth.',
          choices: ['$7.4$', '$15.0$', '$11.5$', '$13.5$'],
          answer: 3,
          working: '$\\dfrac{b}{\\sin 60^\\circ} = \\dfrac{10}{\\sin 40^\\circ}$, so $b = \\dfrac{10 \\sin 60^\\circ}{\\sin 40^\\circ} \\approx 13.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle \"A\" B C, angle \"A\" is 40 degrees, angle B is 60 degrees, and side \"a\" is 10. Find side \"b\" to the nearest tenth. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'By the sine law, \"b\" over the sine of 60 degrees equals 10 over the sine of 40 degrees. So \"b\" is 10 times the sine of 60, over the sine of 40: about 13.5, choice D. A puts the sines the wrong way up, and B divides the angles instead of their sines.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Draw** the picture and name the points', 'Find every **angle** of the triangle first', '$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$: side over sine of the **opposite** angle', 'Finish with a **right** triangle for the height'] }],
      lines: [
        { say: 'Here is what to remember. Draw the picture and name the points.', show: 'sum.0' },
        { say: 'Find every angle of the triangle first, using straight lines and the 180 degree rule.', show: 'sum.1' },
        { say: 'The sine law pairs each side with the sine of the angle opposite it.', show: 'sum.2' },
        { say: 'And finish with a right triangle to turn a slanted length into a height. For more on the sine law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
