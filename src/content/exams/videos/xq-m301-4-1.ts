import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 4.1 (angles and angle measure). The question is an exercise
// from OpenStax Precalculus 2e, word for word (section 5.1, Angles, CC BY-NC-SA 4.0), with its
// set's instruction in front of it (the book's "use to given information" kept as printed). 50° is
// 5π/18 radians, so the arc is 10 × 5π/18 = 25π/9 ≈ 8.73 cm, as in the book's answer.

const R = 5;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** The sector: the radii `OA` and `OB`, the 50° angle `ang` and the arc `arc`, labelled `a` once `solved`. */
function sector(solved: boolean): Part {
  const points: Record<string, [number, number]> = { O: [0, 0], A: [R, 0], B: [R * Math.cos(rad(50)), R * Math.sin(rad(50))] };
  const arc: string[] = [];
  for (let i = 0; i <= 25; i++) {
    points[`s${i}`] = [R * Math.cos(rad(2 * i)), R * Math.sin(rad(2 * i))];
    arc.push(`s${i}`);
  }
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fill', points: ['O', ...arc], tone: 'good', shade: 0.08 },
    { kind: 'line', id: 'OA', from: 'O', to: 'A', tone: 'adj', weight: 3, label: '10 \\text{ cm}', labelSide: 'right' },
    { kind: 'line', id: 'OB', from: 'O', to: 'B', tone: 'adj', weight: 3 },
    { kind: 'angle', id: 'ang', at: 'O', from: 'A', to: 'B', label: '50^\\circ', r: 46, labelDist: 76 },
    { kind: 'curve', id: 'arc', points: arc, tone: 'good', weight: 4, label: solved ? 'a \\approx 8.73 \\text{ cm}' : 'a = \\, ?', labelSide: 'right', labelAt: 0.55 },
  ];
  return { points, items };
}

const fig = (height = 340, solved = false) => figure('sc', [sector(solved)], height);
const PARTS = ['sc.fill', 'sc.OA', 'sc.OB', 'sc.ang', 'sc.arc'];

const QUESTION =
  'Use to given information to find the length of a circular arc. Round to two decimal places. Find the length of the arc of a circle of radius 10 centimeters intercepted by the central angle of 50°.';

const video: Explainer = {
  id: 'xq-m301-4-1',
  lessonId: '',
  exam: {
    lesson: 'm301-4-1',
    source: 'OpenStax, Precalculus 2e, Exercise in section 5.1, Angles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/5-1-angles',
    question: QUESTION,
  },
  title: 'Exam Question: The Arc Cut Off by a 50° Angle (Angles and Angle Measure)',
  thumbnailTitle: 'The Arc of a 50° Angle',
  thumbnail: 'sc',
  summary:
    'A real test question, solved one small step at a time: find the length of the arc of a circle of radius 10 cm cut off by a central angle of 50°, to two decimal places. We change 50° to 5π/18 radians, use a = rθ to get 25π/9, and round to 8.73 cm. Then we check with a fraction of the circumference and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Arc of a 50° Angle', subtitle: 'Angles and angle measure, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about radians and arc length. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use to given information to find the length of a circular arc. Round to two decimal places. Find the length of the arc of a circle of radius $10$ centimeters intercepted by the central angle of $50^\\circ$.',
          answer: '$\\dfrac{25\\pi}{9} \\approx 8.73$ cm',
          working: '$50^\\circ = \\dfrac{5\\pi}{18}$ radians, so $a = r\\theta = 10 \\times \\dfrac{5\\pi}{18} = \\dfrac{25\\pi}{9}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the given information to find the length of a circular arc. Round to two decimal places. Find the length of the arc of a circle of radius 10 centimetres intercepted by the central angle of 50 degrees.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [fig(340), { kind: 'text', id: 't', size: 'md', md: 'The **arc** is the curved piece of the circle between the two radii. We need its **length**.' }],
      lines: [
        { say: 'Here is the circle\'s centre, with two radii 10 centimetres long and a 50 degree angle between them.', show: ['sc.fill', 'sc.OA', 'sc.OB', 'sc.ang'] },
        { say: 'The angle cuts off a curved piece of the circle, the arc. We need its length.', show: ['sc.arc', 't'], focus: 'sc.arc' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'arc', tone: 'key', title: 'Arc length', md: '$a = r\\theta$, where $r$ is the radius and $\\theta$ is the central angle **in radians**.' },
        { kind: 'callout', id: 'conv', tone: 'tip', title: 'Degrees to radians', md: '$180^\\circ = \\pi$ radians, so multiply degrees by $\\dfrac{\\pi}{180}$.' },
      ],
      lines: [
        { say: 'Here is what we need. The arc length "a" equals r times theta, where r is the radius and theta is the central angle, measured in radians.', show: 'arc' },
        { say: 'And 180 degrees is pi radians, so to change degrees to radians, multiply by pi over 180.', show: 'conv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $50^\\circ$ to **radians**', 'Use $a = r\\theta$', '**Round** to two decimal places'] }],
      lines: [
        { say: 'Here is the plan. First, change 50 degrees to radians.', show: 'plan.0' },
        { say: 'Second, use "a" equals r theta.', show: 'plan.1' },
        { say: 'Third, round to two decimal places.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: To radians',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\theta = 50 \\times \\dfrac{\\pi}{180}', '\\theta = \\good{\\dfrac{5\\pi}{18}} \\text{ radians}'] }],
      lines: [
        { say: 'Step one. Multiply 50 degrees by pi over 180.', show: 'm.0' },
        { say: '50 over 180 simplifies to 5 over 18, so theta is 5 pi over 18 radians.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Arc length',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a = r\\theta = 10 \\times \\dfrac{5\\pi}{18}', 'a = \\dfrac{50\\pi}{18} = \\good{\\dfrac{25\\pi}{9}} \\text{ cm}'] }],
      lines: [
        { say: 'Step two. "a" equals r theta: 10 times 5 pi over 18.', show: 'm.0' },
        { say: 'That is 50 pi over 18, which simplifies to 25 pi over 9 centimetres. That is the exact answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Round',
      layout: 'center',
      main: [fig(300, true), { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{25\\pi}{9} \\approx 8.7266 \\approx \\good{8.73} \\text{ cm}'] }],
      lines: [
        { say: 'Step three. 25 pi over 9 is about 8.7266.', show: 'm.0' },
        { say: 'To two decimal places, the arc is 8.73 centimetres long.', show: PARTS, focus: 'sc.arc' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{circumference} = 2\\pi(10) \\approx 62.83 \\text{ cm}', '\\dfrac{50}{360} \\times 62.83 \\approx 8.73 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. The whole circle has a circumference of 2 pi times 10, about 62.83 centimetres.', show: 'm.0' },
        { say: '50 degrees is 50 three-hundred-and-sixtieths of the full turn, and that fraction of 62.83 is about 8.73. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$a = 10 \\times 50 = 500$', '$a = r\\theta$ needs $\\theta$ in **radians**'],
            ['$\\theta = 50 \\times \\dfrac{180}{\\pi}$', 'that is upside down: degrees $\\times \\dfrac{\\pi}{180}$'],
            ['$8.72$', '$8.7266$ rounds **up** to $8.73$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 times 50 is 500 centimetres, far too long. The formula only works with the angle in radians.' },
        { say: 'Do not flip the conversion. Degrees times pi over 180 gives radians.' },
        { say: 'And 8.7266 rounds up to 8.73, because the next digit is 6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A circle has a radius of $6$ cm. How long is the arc cut off by a central angle of $\\dfrac{\\pi}{3}$?',
          choices: ['$\\dfrac{\\pi}{18}$ cm', '$18$ cm', '$2\\pi$ cm', '$360$ cm'],
          answer: 2,
          working: 'The angle is already in radians: $a = r\\theta = 6 \\times \\dfrac{\\pi}{3} = 2\\pi$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a radius of 6 centimetres. How long is the arc cut off by a central angle of pi over 3? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The angle is already in radians, so "a" equals 6 times pi over 3, which is 2 pi centimetres: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Arc length: $a = r\\theta$', '$\\theta$ must be in **radians**', 'Degrees to radians: $\\times \\dfrac{\\pi}{180}$', 'Check with a fraction of the circumference'] }],
      lines: [
        { say: 'Here is what to remember. The arc length is "a" equals r theta.', show: 'sum.0' },
        { say: 'Theta must be in radians.', show: 'sum.1' },
        { say: 'To change degrees to radians, multiply by pi over 180.', show: 'sum.2' },
        { say: 'And check with a fraction of the circumference. For more on angles and angle measure, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
