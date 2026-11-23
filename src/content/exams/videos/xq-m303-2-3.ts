import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 2.3 (choosing the sine law or the cosine law). The question is
// an exercise from OpenStax Precalculus 2e, word for word (section 8.1, Non-right Triangles: Law of
// Sines, CC BY-NC-SA 4.0), with the book's figure description in brackets. The panel makes
// 38° − 20° = 18° with the roof; the vertical support makes 90° + 20° = 110° with the roof on the
// downhill side, so the angle at the top is 52°. The panel (8 ft) is across from the 110° angle and
// the support across from the 18° angle: s = 8 sin 18° / sin 110° ≈ 2.63, so 2.6 ft, as in the
// book's answer. Check: 8 sin 38° − 8 cos 38° tan 20° ≈ 4.925 − 2.294 = 2.63.

const rad = (d: number) => (d * Math.PI) / 180;
const T: [number, number] = [8 * Math.cos(rad(38)), 8 * Math.sin(rad(38))];
const R: [number, number] = [T[0], T[0] * Math.tan(rad(20))];
const along = (d: number): [number, number] => [d * Math.cos(rad(20)), d * Math.sin(rad(20))];

/** The roof, the horizontal at the bottom of the panel, the 8 ft panel and the vertical support. */
const panel = (o: { inside?: boolean; s?: string } = {}, height = 460): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'line', id: 'flat', from: 'P', to: 'H', tone: 'muted', dashed: true, group: 'roof' },
    { kind: 'line', id: 'roofline', from: 'G', to: 'E', tone: 'ink', weight: 4, group: 'roof' },
    { kind: 'angle', id: 'a20', at: 'P', from: 'H', to: 'E', tone: 'muted', label: '20^\\circ', r: 150, labelDist: 190, group: 'roof' },
    { kind: 'line', id: 'pan', from: 'P', to: 'T', tone: 'opp', weight: 6, label: '8\\text{ ft}', labelSide: 'left', group: 'panel' },
    { kind: 'angle', id: 'a38', at: 'P', from: 'H', to: 'T', tone: 'theta', label: '38^\\circ', r: 60, labelDist: 85, labelAt: 1.25, group: 'panel' },
    { kind: 'line', id: 'sup', from: 'T', to: 'R', tone: 'hyp', weight: 5, dashed: true, label: o.s ?? 's', labelSide: 'left', group: 'support' },
  ];
  if (o.inside) {
    items.push(
      { kind: 'angle', id: 'a18', at: 'P', from: 'E', to: 'T', tone: 'good', label: '18^\\circ', r: 105, labelDist: 140 },
      { kind: 'angle', id: 'a110', at: 'R', from: 'P', to: 'T', tone: 'good', label: '110^\\circ', r: 30, labelDist: 62 },
      { kind: 'angle', id: 'a52', at: 'T', from: 'P', to: 'R', tone: 'good', label: '52^\\circ', r: 45, labelDist: 75, labelAt: 1.4 },
    );
  }
  return { kind: 'diagram', id: 'd', height, points: { P: [0, 0], H: [7.4, 0], G: along(-1.2), E: along(7.6), T, R }, items };
};

const QUESTION =
  'The roof of a house is at a 20° angle. An 8-foot solar panel is to be mounted on the roof and should be angled 38° relative to the horizontal for optimal results. (See the figure. [A triangle whose sides are the solar panel, the roof which goes past the solar panel, and the vertical support for the panel. The solar panel side is 8 feet long. There are horizontal dotted lines at the bottom of the solar panel and the bottom of the roof. The angle between the solar panel and the horizontal is 38 degrees. The angle between the roof and the horizontal is 20 degrees.]) How long does the vertical support holding up the back of the panel need to be? Round to the nearest tenth.';

const video: Explainer = {
  id: 'xq-m303-2-3',
  lessonId: '',
  exam: {
    lesson: 'm303-2-3',
    source: 'OpenStax, Precalculus 2e, Exercise in section 8.1, Non-right Triangles: Law of Sines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/8-1-non-right-triangles-law-of-sines',
    question: QUESTION,
  },
  title: 'Exam Question: The Support for a Solar Panel on a Roof (Choosing a Law)',
  thumbnailTitle: 'The Solar Panel Support',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a roof slopes at 20°, and an 8-foot solar panel on it must tilt at 38° to the horizontal. How long is the vertical support at the back of the panel? We find the three angles of the triangle (18°, 110° and 52°), choose the sine law because the 8-foot side faces a known angle, and get about 2.6 feet. Then we check with right triangles and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Solar Panel Support', subtitle: 'Choosing a law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about choosing between the sine law and the cosine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The roof of a house is at a $20^\\circ$ angle. An 8-foot solar panel is to be mounted on the roof and should be angled $38^\\circ$ relative to the horizontal for optimal results. (Figure on the next screen.) How long does the vertical support holding up the back of the panel need to be? Round to the nearest tenth.',
          answer: 'about $2.6$ ft',
          working: 'Angles $18^\\circ$, $110^\\circ$, $52^\\circ$; $\\ s = \\dfrac{8 \\sin 18^\\circ}{\\sin 110^\\circ} \\approx 2.63$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The roof of a house is at a 20 degree angle. An 8-foot solar panel is to be mounted on the roof and should be angled 38 degrees relative to the horizontal for optimal results. How long does the vertical support holding up the back of the panel need to be? Round to the nearest tenth.' },
      ],
    },
    {
      chapter: 'The figure',
      layout: 'split',
      leftWidth: 620,
      left: [panel()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The panel, the roof and the **vertical** support make a triangle. We need the support, $s$.' }],
      lines: [
        { say: 'Here is the figure, drawn again. The roof rises at 20 degrees from the horizontal.', show: 'd.roof' },
        { say: 'The 8 foot panel sits on the roof at its bottom edge, and tilts up more steeply, at 38 degrees from the horizontal.', show: 'd.panel', focus: 'd.pan' },
        { say: 'A support goes straight down from the top of the panel to the roof. We need its length, s.', show: ['d.support', 't'], focus: 'd.sup' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'laws',
          head: ['You know', 'Use'],
          rows: [
            ['a side **and** the angle across from it', 'the **sine law**'],
            ['two sides and the angle **between** them', 'the **cosine law**'],
            ['all three sides', 'the **cosine law**'],
          ],
        },
        { kind: 'callout', id: 'v', tone: 'tip', title: 'Vertical', md: 'A vertical line makes $90^\\circ$ with the **horizontal**, not with a sloping roof.' },
      ],
      lines: [
        { say: 'Here is what we need. If we know a side and the angle across from it, the sine law can start. With two sides and the angle between them, or all three sides, we need the cosine law.', show: 'laws' },
        { say: 'And a vertical support makes a right angle with the horizontal, not with the sloping roof.', show: 'v' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **angles** inside the triangle', '**Choose** a law', 'Solve for $s$ and round'] }],
      lines: [
        { say: 'Here is the plan. First, find the angles inside the triangle, because the question gives angles to the horizontal instead.', show: 'plan.0' },
        { say: 'Second, choose the law that fits what we know.', show: 'plan.1' },
        { say: 'Third, solve for s, and round to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The angles',
      layout: 'split',
      leftWidth: 620,
      left: [panel({ inside: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['38^\\circ - 20^\\circ = \\good{18^\\circ}', '90^\\circ + 20^\\circ = \\good{110^\\circ}', '180^\\circ - 18^\\circ - 110^\\circ = \\good{52^\\circ}'] }],
      lines: [
        { say: 'Step one. At the bottom of the panel, the panel is at 38 degrees and the roof at 20 degrees, both from the same horizontal. So the angle between the panel and the roof is 38 minus 20, which is 18 degrees.', show: ['d.roof', 'd.panel', 'd.support', 'm.0', 'd.a18'], focus: ['m.0', 'd.a18'] },
        { say: 'At the foot of the support, the support is vertical, so it makes 90 degrees with the horizontal. Looking back down the roof, the roof drops another 20 degrees below the horizontal. So that angle is 90 plus 20, which is 110 degrees.', show: ['m.1', 'd.a110'], focus: ['m.1', 'd.a110'] },
        { say: 'The angles add to 180, so the angle at the top is 180 minus 18 minus 110, which is 52 degrees.', show: ['m.2', 'd.a52'], focus: ['m.2', 'd.a52'] },
      ],
    },
    {
      chapter: 'Step 2: Choose a law',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'pairs',
          head: ['Side', 'Angle across from it'],
          rows: [
            ['panel: $8$ ft', '$110^\\circ$'],
            ['support: $s$', '$18^\\circ$'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'A known side **and** its angle: the **sine law**.' },
      ],
      lines: [
        { say: 'Step two. The panel, 8 feet, is across from the 110 degree angle at the foot of the support.', show: 'pairs' },
        { say: 'The support, s, is across from the 18 degree angle at the bottom of the panel.' },
        { say: 'We know a side and the angle across from it, so the sine law can start.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{s}{\\sin 18^\\circ} = \\dfrac{8}{\\sin 110^\\circ}', 's = \\dfrac{8(0.3090)}{0.9397} \\approx 2.63', 's \\approx \\good{2.6 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. s over sine 18 degrees equals 8 over sine 110 degrees.', show: 'm.0' },
        { say: 'So s is 8 times sine 18 degrees, which is about 0.3090, divided by sine 110 degrees, about 0.9397. That is about 2.63.', show: 'm.1' },
        { say: 'To the nearest tenth, the support needs to be about 2.6 feet long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{panel top: } 8 \\sin 38^\\circ \\approx 4.93 \\text{ ft up}', '8 \\cos 38^\\circ \\approx 6.30 \\text{ ft across}', '\\text{roof there: } 6.30 \\tan 20^\\circ \\approx 2.29 \\text{ ft up}', '4.93 - 2.29 \\approx 2.6 \\text{ ft} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way, with right triangles. The top of the panel is 8 sine 38 degrees, about 4.93 feet, above the bottom of the panel.', show: 'm.0' },
        { say: 'And it is 8 cos 38 degrees, about 6.30 feet, across.', show: 'm.1' },
        { say: '6.30 feet across, the roof has risen 6.30 times tan 20 degrees, about 2.29 feet.', show: 'm.2' },
        { say: 'The gap between them is 4.93 minus 2.29, about 2.6 feet, the same answer. It checks out.', show: 'm.3', focus: 'm.3' },
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
            ['$8 \\sin 38^\\circ \\approx 4.9$', 'that is the height above the **horizontal**, not the roof'],
            ['$8 \\sin 18^\\circ \\approx 2.5$', 'the support is **vertical**, not at $90^\\circ$ to the roof'],
            ['$\\dfrac{8 \\sin 18^\\circ}{\\sin 52^\\circ} \\approx 3.1$', 'the panel is across from $110^\\circ$, not $52^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 sine 38 degrees, about 4.9 feet, is how high the top of the panel is above the horizontal. But the support stands on the roof, which has risen too.' },
        { say: 'Treating the support as square to the roof gives about 2.5 feet. It is vertical, so the angle at its foot is 110 degrees.' },
        { say: 'And the panel is across from the 110 degree angle. Pairing it with 52 degrees gives about 3.1 feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A triangular frame has sides of $7$ m and $9$ m with an angle of $40^\\circ$ between them. Which law finds the third side?',
          choices: ['the sine law', 'the cosine law', 'the Pythagorean theorem', 'neither: we need more information'],
          answer: 1,
          working: 'Two sides and the angle **between** them: $c^2 = 7^2 + 9^2 - 2(7)(9)\\cos 40^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular frame has sides of 7 metres and 9 metres, with an angle of 40 degrees between them. Which law finds the third side? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'We know two sides and the angle between them, but no side with the angle across from it. So it is the cosine law: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Turn angles to the horizontal into angles **inside** the triangle', 'Vertical means $90^\\circ$ to the **horizontal**', 'A side and its **opposite** angle: sine law', 'Two sides and the angle **between**: cosine law'] }],
      lines: [
        { say: 'Here is what to remember. Turn angles measured from the horizontal into angles inside the triangle.', show: 'sum.0' },
        { say: 'Vertical means a right angle with the horizontal.', show: 'sum.1' },
        { say: 'With a side and the angle across from it, use the sine law.', show: 'sum.2' },
        { say: 'With two sides and the angle between them, use the cosine law. For more on choosing a law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
