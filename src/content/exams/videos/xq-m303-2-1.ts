import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 2.1 (the sine law). The question is an exercise from OpenStax
// Precalculus 2e, word for word (section 8.1, Non-right Triangles: Law of Sines, CC BY-NC-SA 4.0).
// The book prints no answer for it. Angle B = 180° − 101° − 53° = 26°, and the sine law pairs AB
// with the 53° angle at C and AC = 97 m with the 26° angle at B:
// AB = 97 sin 53° / sin 26° ≈ 176.7, so 177 m to the nearest metre.

const rad = (d: number) => (d * Math.PI) / 180;
const S = 0.1; // diagram units per metre
const B: [number, number] = [176.72 * S * Math.cos(rad(101)), 176.72 * S * Math.sin(rad(101))];
const MID: [number, number] = [B[0] / 2, B[1] / 2];

/** The lake: an oval around the middle of AB, long along AB. */
const LAKE: Record<string, [number, number]> = {};
for (let i = 0; i < 16; i++) {
  const t = (i / 16) * 2 * Math.PI;
  const u = 4.6 * Math.cos(t);
  const v = 2.4 * Math.sin(t);
  LAKE[`L${i}`] = [MID[0] + u * Math.cos(rad(101)) - v * Math.sin(rad(101)), MID[1] + u * Math.sin(rad(101)) + v * Math.cos(rad(101))];
}
const LAKE_IDS = Object.keys(LAKE);

/** Points A, B and C around the lake. `b` adds the 26° angle at B; `ab` is the label on AB. */
const lake = (o: { b?: boolean; ab?: string } = {}, height = 500): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'region', id: 'water', points: LAKE_IDS, tone: 'adj', shade: 0.18, group: 'lake' },
    { kind: 'curve', id: 'shore', points: LAKE_IDS, closed: true, tone: 'adj', group: 'lake' },
    { kind: 'line', id: 'ac', from: 'A', to: 'C', tone: 'ink', weight: 5, label: '97\\text{ m}', labelSide: 'right' },
    { kind: 'line', id: 'cb', from: 'C', to: 'B', tone: 'muted', weight: 3 },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'hyp', weight: 5, dashed: true, label: o.ab ?? 'x', labelSide: 'left' },
    { kind: 'angle', id: 'a101', at: 'A', from: 'C', to: 'B', tone: 'theta', label: '101^\\circ', r: 34, labelDist: 70 },
    { kind: 'angle', id: 'c53', at: 'C', from: 'A', to: 'B', tone: 'opp', label: '53^\\circ', r: 50, labelDist: 90 },
    { kind: 'label', id: 'al', at: 'A', tex: 'A', place: 'below left', dot: true },
    { kind: 'label', id: 'bl', at: 'B', tex: 'B', place: 'above', dot: true },
    { kind: 'label', id: 'cl', at: 'C', tex: 'C', place: 'below right', dot: true },
  ];
  if (o.b) items.push({ kind: 'angle', id: 'b26', at: 'B', from: 'A', to: 'C', tone: 'good', label: '26^\\circ', r: 60, labelDist: 100 });
  return { kind: 'diagram', id: 'd', height, points: { A: [0, 0], C: [9.7, 0], B, ...LAKE }, items };
};

const QUESTION =
  'Points A and B are on opposite sides of a lake. Point C is 97 meters from A. The measure of angle BAC is determined to be 101°, and the measure of angle ACB is determined to be 53°. What is the distance from A to B, rounded to the nearest whole meter?';

const video: Explainer = {
  id: 'xq-m303-2-1',
  lessonId: '',
  exam: {
    lesson: 'm303-2-1',
    source: 'OpenStax, Precalculus 2e, Exercise in section 8.1, Non-right Triangles: Law of Sines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/8-1-non-right-triangles-law-of-sines',
    question: QUESTION,
  },
  title: 'Exam Question: The Distance Across a Lake (The Sine Law)',
  thumbnailTitle: 'How Far Across the Lake?',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: points A and B are on opposite sides of a lake, C is 97 m from A, angle BAC is 101° and angle ACB is 53°. How far is it from A to B? We find the third angle (26°), match each side with the angle across from it, and use the sine law: AB = 97 sin 53° / sin 26°, about 177 m. Then we check the order of the sides and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Across the Lake?', subtitle: 'The sine law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Points $A$ and $B$ are on opposite sides of a lake. Point $C$ is $97$ meters from $A$. The measure of angle $BAC$ is determined to be $101^\\circ$, and the measure of angle $ACB$ is determined to be $53^\\circ$. What is the distance from $A$ to $B$, rounded to the nearest whole meter?',
          answer: 'about $177$ m',
          working: '$\\angle B = 26^\\circ$; $\\ AB = \\dfrac{97 \\sin 53^\\circ}{\\sin 26^\\circ} \\approx 176.7$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Points "A" and B are on opposite sides of a lake. Point C is 97 metres from "A". The measure of angle B "A" C is determined to be 101 degrees, and the measure of angle "A" C B is determined to be 53 degrees. What is the distance from "A" to B, rounded to the nearest whole metre?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [lake()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Nobody can stretch a tape across the water. We measure on **dry land** and let a **triangle** do the rest.' }],
      lines: [
        { say: 'Here is the picture. "A" and B are on opposite sides of the lake, so nobody can stretch a tape measure from one to the other.', show: ['d.lake', 'd.al', 'd.bl', 'd.ab'] },
        { say: 'Instead, a surveyor walks 97 metres on dry land, from "A" to C.', show: ['d.ac', 'd.cl'], focus: 'd.ac' },
        { say: 'At "A", the angle between C and B is 101 degrees. At C, the angle between "A" and B is 53 degrees.', show: ['d.a101', 'd.c53', 'd.cb'] },
        { say: 'Together they make a triangle, and we need the side x, from "A" to B.', show: 't', focus: 'd.ab' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}'] },
        { kind: 'callout', id: 'pair', tone: 'key', title: 'Matching pairs', md: 'Each side goes with the angle **across** from it. Side $AB$ is across from the angle at $C$.' },
      ],
      lines: [
        { say: 'Here is what we need. The sine law says that in any triangle, each side divided by the sine of the angle across from it gives the same number.', show: 'f' },
        { say: 'So each side goes with the angle across from it. For example, side "A" B is across from the angle at C.', show: 'pair' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **third angle**, at $B$', 'Match each side with the angle **across** from it', 'Use the **sine law** and round'] }],
      lines: [
        { say: 'Here is the plan. First, find the third angle, at B.', show: 'plan.0' },
        { say: 'Second, match each side with the angle across from it.', show: 'plan.1' },
        { say: 'Third, use the sine law, and round to the nearest metre.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The third angle',
      layout: 'split',
      leftWidth: 620,
      left: [lake({ b: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['180^\\circ - 101^\\circ - 53^\\circ', '= \\good{26^\\circ}'] }],
      lines: [
        { say: 'Step one. The angles in a triangle add to 180 degrees.', show: ['d.lake', 'd.ac', 'd.cb', 'd.ab', 'd.a101', 'd.c53', 'd.al', 'd.bl', 'd.cl', 'm.0'] },
        { say: '180 minus 101 minus 53 is 26 degrees. That is the angle at B.', show: ['m.1', 'd.b26'], focus: ['m.1', 'd.b26'] },
      ],
    },
    {
      chapter: 'Step 2: Matching pairs',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'pairs',
          head: ['Side', 'Angle across from it'],
          rows: [
            ['$AC = 97$ m', 'at $B$: $26^\\circ$'],
            ['$AB = x$', 'at $C$: $53^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The side we know, "A" C, is 97 metres, and the angle across from it is the 26 degrees at B.', show: 'pairs' },
        { say: 'The side we want, "A" B, is across from the 53 degrees at C. The 101 degree angle is not needed now: it is across from the side we are not asking about.' },
      ],
    },
    {
      chapter: 'Step 3: The sine law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{\\sin 53^\\circ} = \\dfrac{97}{\\sin 26^\\circ}', 'x = \\dfrac{97 \\sin 53^\\circ}{\\sin 26^\\circ} = \\dfrac{97(0.7986)}{0.4384}', 'x \\approx 176.7 \\approx \\good{177 \\text{ m}}'] }],
      lines: [
        { say: 'Step three. Put the two pairs into the sine law: x over sine 53 degrees equals 97 over sine 26 degrees.', show: 'm.0' },
        { say: 'Multiply both sides by sine 53 degrees. Sine 53 degrees is about 0.7986, and sine 26 degrees is about 0.4384.', show: 'm.1' },
        { say: 'That gives about 176.7, so the distance from "A" to B is about 177 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [lake({ b: true, ab: '177\\text{ m}' })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['26^\\circ < 53^\\circ < 101^\\circ', 'AC < AB < BC', '97 < 177 < 217 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. In a triangle, the bigger the angle, the longer the side across from it.', show: ['d.lake', 'd.ac', 'd.cb', 'd.ab', 'd.a101', 'd.c53', 'd.b26', 'd.al', 'd.bl', 'd.cl', 'm.0'] },
        { say: 'So "A" C, across from 26 degrees, should be the shortest, and B C, across from 101 degrees, the longest.', show: 'm.1' },
        { say: 'The sine law gives B C as about 217 metres, and our 177 sits between 97 and 217. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$\\dfrac{97 \\sin 53^\\circ}{\\sin 101^\\circ} \\approx 79$', '$97$ m is across from $B$, so find the **third angle** first'],
            ['$\\dfrac{97 \\sin 26^\\circ}{\\sin 53^\\circ} \\approx 53$', 'the fraction is **upside down**'],
            ['about $50$ m', 'the calculator is in **radians**: set it to degrees'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 97 metres is across from the angle at B, not the 101 degrees at "A". Pairing them gives about 79 metres. Find the third angle first.' },
        { say: 'Turning the fraction upside down gives about 53 metres. Keep each side over the sine of its own angle.' },
        { say: 'And if your calculator is in radians, you get about 50 metres. Make sure it is in degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In triangle $PQR$, $\\angle P = 40^\\circ$, $\\angle Q = 60^\\circ$, and side $p$, across from $P$, is $10$ m. How long is side $q$, across from $Q$?',
          choices: ['$7.4$ m', '$15.0$ m', '$6.4$ m', '$13.5$ m'],
          answer: 3,
          working: '$q = \\dfrac{10 \\sin 60^\\circ}{\\sin 40^\\circ} = \\dfrac{10(0.8660)}{0.6428} \\approx 13.5$ m',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle P Q R, angle P is 40 degrees, angle Q is 60 degrees, and side p, across from P, is 10 metres. How long is side q, across from Q? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'q over sine 60 degrees equals 10 over sine 40 degrees. So q is 10 times 0.8660, divided by 0.6428, which is about 13.5 metres: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The angles add to $180^\\circ$: find the **third** one', 'Each side goes with the angle **across** from it', '$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$', 'Check: the biggest angle faces the **longest** side'] }],
      lines: [
        { say: 'Here is what to remember. The angles of a triangle add to 180 degrees, so you can always find the third one.', show: 'sum.0' },
        { say: 'Each side goes with the angle across from it.', show: 'sum.1' },
        { say: 'The sine law sets those side over sine fractions equal.', show: 'sum.2' },
        { say: 'And check that the biggest angle faces the longest side. For more on the sine law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
