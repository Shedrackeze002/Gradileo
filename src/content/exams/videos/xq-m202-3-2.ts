import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 3.2 (the cosine law). The question is an exercise from
// OpenStax Precalculus 2e, word for word (section 8.2, Non-right Triangles: Law of Cosines,
// CC BY-NC-SA 4.0), with the book's figure description in brackets. The tower is vertical and the
// hill rises at 34°, so the angle between the tower and the hill, uphill, is 90° − 34° = 56°, and
// w² = 113² + 98² − 2(113)(98) cos 56°, so w ≈ 99.9 ft.

const rad = (d: number) => (d * Math.PI) / 180;
const S = 0.1; // diagram units per foot
const at = (feet: number): [number, number] => [feet * S * Math.cos(rad(34)), feet * S * Math.sin(rad(34))];

/**
 * The hill (rising at 34° from the horizontal), the vertical tower from T to P, and the wire from
 * P to the anchor W, 98 ft uphill. `stage` adds the angle between the tower and the hill.
 */
const hill = (o: { angle?: boolean; wire?: string } = {}, height = 480): DiagramEl => ({
  kind: 'diagram',
  id: 'h',
  height,
  points: { G: at(-45), G2: [at(-45)[0] + 7, at(-45)[1]], T: [0, 0], P: [0, 11.3], W: at(98), E: at(125) },
  items: [
    { kind: 'line', id: 'ground', from: 'G', to: 'G2', tone: 'muted', dashed: true, group: 'slope' },
    { kind: 'line', id: 'hill', from: 'G', to: 'E', tone: 'ink', weight: 4, group: 'slope' },
    { kind: 'angle', id: 'a34', at: 'G', from: 'G2', to: 'E', label: '34^\\circ', r: 60, labelDist: 100, group: 'slope' },
    { kind: 'line', id: 'tower', from: 'T', to: 'P', tone: 'adj', weight: 5, label: '113\\text{ ft}', labelSide: 'left' },
    { kind: 'line', id: 'up', from: 'T', to: 'W', tone: 'opp', weight: 5, label: '98\\text{ ft}', labelSide: 'right' },
    { kind: 'line', id: 'wire', from: 'P', to: 'W', tone: 'hyp', dashed: true, label: o.wire ?? 'w', labelSide: 'left' },
    ...(o.angle ? [{ kind: 'angle' as const, id: 'a56', at: 'T', from: 'W', to: 'P', label: '56^\\circ', r: 50, labelDist: 95 }] : []),
  ],
});

const QUESTION =
  'A 113-foot tower is located on a hill that is inclined 34° to the horizontal, as shown in the figure. [Two triangles, one on top of the other. The bottom triangle is the hill inclined 34 degrees to the horizontal. The second is formed by the base of the tower on the incline of the hill, the top of the tower, and the wire anchor point uphill from the tower on the incline. The sides are the tower, the incline of the hill, and the wire. The tower side is 113 feet and the incline side is 98 feet.] A guy-wire is to be attached to the top of the tower and anchored at a point 98 feet uphill from the base of the tower. Find the length of wire needed.';

const video: Explainer = {
  id: 'xq-m202-3-2',
  lessonId: '',
  exam: {
    lesson: 'm202-3-2',
    source: 'OpenStax, Precalculus 2e, Exercise in section 8.2, Non-right Triangles: Law of Cosines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/8-2-non-right-triangles-law-of-cosines',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Guy-Wire on the Hill? (The Cosine Law)',
  thumbnailTitle: 'The Wire on the Hill',
  thumbnail: 'h',
  summary:
    'A real test question, solved one small step at a time: a 113-foot tower stands on a hill inclined at 34°, and a guy-wire runs from its top to a point 98 feet uphill. How long is the wire? We find the angle between the tower and the hill, 56°, and use the cosine law to get about 99.9 feet. Then we check it is a sensible length and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Wire on the Hill', subtitle: 'The cosine law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the cosine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A 113-foot tower is located on a hill that is inclined $34^\\circ$ to the horizontal. A guy-wire is to be attached to the top of the tower and anchored at a point 98 feet uphill from the base of the tower. Find the length of wire needed.',
          answer: 'about $99.9$ ft',
          working: 'The angle between the tower and the hill is $90^\\circ - 34^\\circ = 56^\\circ$; $w^2 = 113^2 + 98^2 - 2(113)(98)\\cos 56^\\circ$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A 113-foot tower is located on a hill that is inclined 34 degrees to the horizontal. A guy-wire is to be attached to the top of the tower and anchored at a point 98 feet uphill from the base of the tower. Find the length of wire needed.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [hill()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The tower, the hill and the wire make a **triangle**. We know two sides; find the **third**, $w$.' }],
      lines: [
        { say: 'Here is the picture. The hill rises at 34 degrees from the horizontal.', show: 'h.slope' },
        { say: 'The tower stands straight up from the hill, and it is 113 feet tall.', show: 'h.tower', focus: 'h.tower' },
        { say: 'The anchor point is 98 feet up the hill from the base of the tower.', show: 'h.up', focus: 'h.up' },
        { say: 'The wire joins the top of the tower to the anchor. The tower, the hill and the wire make a triangle, and we need the third side, w.', show: ['h.wire', 't'], focus: 'h.wire' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'key', title: 'The cosine law', md: '$c^2 = a^2 + b^2 - 2ab\\cos C$, where $C$ is the angle **between** sides $a$ and $b$.' },
        { kind: 'callout', id: 'vert', tone: 'tip', title: 'A vertical tower', md: 'A tower stands **straight up**: it makes $90^\\circ$ with the **horizontal**, not with the hill.' },
      ],
      lines: [
        { say: 'Here is what we need. When we know two sides and the angle between them, the cosine law gives the third side: c squared equals "a" squared plus b squared, minus 2 "a" b cos C.', show: 'law' },
        { say: 'And a tower stands straight up. It makes a right angle with the horizontal, not with the sloping hill.', show: 'vert' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **angle** between the tower and the hill', 'Use the **cosine law**', 'Take the **square root**'] }],
      lines: [
        { say: 'Here is the plan. First, find the angle between the tower and the hill, because it is between the two sides we know.', show: 'plan.0' },
        { say: 'Second, put the two sides and that angle into the cosine law.', show: 'plan.1' },
        { say: 'Third, take the square root to get the length of the wire.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The angle at the base',
      layout: 'split',
      leftWidth: 640,
      left: [hill({ angle: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['90^\\circ - 34^\\circ = \\good{56^\\circ}'] }, { kind: 'text', id: 't', size: 'md', md: 'The hill has **tipped up** $34^\\circ$ toward the tower, so the gap shrinks from $90^\\circ$.' }],
      lines: [
        { say: 'Step one. Here is the triangle again.', show: ['h.slope', 'h.tower', 'h.up', 'h.wire'] },
        { say: 'If the ground were flat, the tower would make a right angle with it. But the hill tips up 34 degrees on the uphill side, toward the tower.', show: 't' },
        { say: 'So the angle between the tower and the hill, uphill, is 90 minus 34, which is 56 degrees.', show: ['m.0', 'h.a56'], focus: ['h.a56', 'm.0'] },
      ],
    },
    {
      chapter: 'Step 2: The cosine law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['w^2 = 113^2 + 98^2 - 2(113)(98)\\cos 56^\\circ', 'w^2 = 12{,}769 + 9{,}604 - 22{,}148(0.5592)', 'w^2 \\approx 22{,}373 - 12{,}385 = 9{,}988'] }],
      lines: [
        { say: 'Step two. The angle of 56 degrees is between the 113 foot side and the 98 foot side, so w squared equals 113 squared, plus 98 squared, minus 2 times 113 times 98 times cos 56 degrees.', show: 'm.0' },
        { say: '113 squared is 12,769. 98 squared is 9,604. 2 times 113 times 98 is 22,148, and cos 56 degrees is about 0.5592.', show: 'm.1' },
        { say: 'So w squared is about 22,373 minus 12,385, which is about 9,988.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The square root',
      layout: 'split',
      leftWidth: 640,
      left: [hill({ angle: true, wire: 'w \\approx 99.9\\text{ ft}' })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['w \\approx \\sqrt{9{,}988}', 'w \\approx \\good{99.9 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. Take the square root of 9,988.', show: ['h.slope', 'h.tower', 'h.up', 'h.a56', 'm.0'] },
        { say: 'The wire needs to be about 99.9 feet long.', show: ['m.1', 'h.wire'], focus: ['m.1', 'h.wire'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{113^2 + 98^2} \\approx 149.6', '56^\\circ < 90^\\circ \\Rightarrow w < 149.6 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the length is sensible. If the angle were a right angle, Pythagoras would give the square root of 113 squared plus 98 squared, about 149.6 feet.', show: 'm.0' },
        { say: 'Our angle, 56 degrees, is smaller than a right angle, so the wire must be shorter than that. 99.9 feet is shorter. It also makes sense that it is close to 98 and 113, because the triangle is nearly equilateral.', show: 'm.1' },
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
            ['using $34^\\circ$', 'that angle is between the hill and the **horizontal**: $w \\approx 63.3$'],
            ['using $124^\\circ$', 'that is the **downhill** side of the tower: $w \\approx 186.4$'],
            ['$w = 9{,}988$', 'that is $w^2$: take the **square root**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 34 degree angle is between the hill and the horizontal, not between the two sides we know. Using it gives about 63.3 feet.' },
        { say: '90 plus 34, or 124 degrees, is the angle on the downhill side of the tower. The wire goes uphill, so that gives the wrong triangle.' },
        { say: 'And 9,988 is w squared. Remember to take the square root.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two sides of a triangle are $8$ cm and $5$ cm, and the angle between them is $60^\\circ$. How long is the third side?',
          choices: ['$9.4$ cm', '$7$ cm', '$49$ cm', '$6.2$ cm'],
          answer: 1,
          working: '$c^2 = 64 + 25 - 2(8)(5)(0.5) = 49$, so $c = 7$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. Two sides of a triangle are 8 centimetres and 5 centimetres, and the angle between them is 60 degrees. How long is the third side? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'c squared is 64 plus 25, minus 2 times 8 times 5 times cos 60 degrees, which is 0.5. That is 89 minus 40, which is 49. So c is 7 centimetres: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two sides and the angle **between** them: cosine law', 'Find the angle **inside** the triangle first', '$c^2 = a^2 + b^2 - 2ab\\cos C$', 'Take the **square root** at the end'] }],
      lines: [
        { say: 'Here is what to remember. When you know two sides and the angle between them, use the cosine law.', show: 'sum.0' },
        { say: 'Find the angle inside the triangle first. It may not be the angle you are given.', show: 'sum.1' },
        { say: 'c squared equals "a" squared plus b squared, minus 2 "a" b cos C.', show: 'sum.2' },
        { say: 'And take the square root at the end. For more on the cosine law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
