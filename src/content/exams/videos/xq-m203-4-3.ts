import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 4.3 (problems with three right triangles). The free OpenStax
// books have no chain of three right triangles, so this one is written by Gradileo in the style of a
// Grade 11 workplace mathematics unit test. All three triangles share the 45 m height, opposite each
// angle, and each distance from the base is adjacent, so d = 45 ÷ tan θ: P 25.98 m, Q 53.63 m and
// R 96.50 m. Then PQ = 53.63 − 25.98 ≈ 27.6 m and QR = 96.50 − 53.63 ≈ 42.9 m.
// Check: 27.65 + 42.87 = 70.52 = 96.50 − 25.98, the distance from P to R.

const P = 25.98;
const Q = 53.63;
const R = 96.5;

/** The tower, the three stakes and their sight lines to the top, drawn to scale (the groups `p`, `q` and `r`). */
const scene = (height = 400): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height,
  points: { O: [0, 0], T: [0, 45], P: [P, 0], Q: [Q, 0], R: [R, 0], XL: [(P + Q) / 2, -7], YL: [(Q + R) / 2, -7] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'O' },
    { kind: 'thing', id: 'tower', type: 'tower', at: 'O', top: 'T' },
    { kind: 'line', id: 'h', from: 'O', to: 'T', tone: 'opp', weight: 6, label: '45 \\text{ m}', labelSide: 'left' },
    { kind: 'right', id: 'rt', at: 'O', from: 'T', to: 'R' },
    { kind: 'label', id: 'pl', at: 'P', tex: 'P', place: 'below', dot: true },
    { kind: 'label', id: 'ql', at: 'Q', tex: 'Q', place: 'below', dot: true },
    { kind: 'label', id: 'rl', at: 'R', tex: 'R', place: 'below', dot: true },
    { kind: 'line', id: 'sp', from: 'P', to: 'T', tone: 'theta', group: 'p' },
    { kind: 'angle', id: 'ap', at: 'P', from: 'T', to: 'O', tone: 'theta', label: '60^\\circ', r: 34, group: 'p' },
    { kind: 'line', id: 'sq', from: 'Q', to: 'T', tone: 'hyp', group: 'q' },
    { kind: 'angle', id: 'aq', at: 'Q', from: 'T', to: 'O', tone: 'hyp', label: '40^\\circ', r: 44, group: 'q' },
    { kind: 'line', id: 'sr', from: 'R', to: 'T', tone: 'adj', group: 'r' },
    { kind: 'angle', id: 'ar', at: 'R', from: 'T', to: 'O', tone: 'adj', label: '25^\\circ', r: 60, group: 'r' },
    { kind: 'label', id: 'x', at: 'XL', tex: 'x', place: 'below', group: 'gaps' },
    { kind: 'label', id: 'y', at: 'YL', tex: 'y', place: 'below', group: 'gaps' },
  ],
});
const PIC = ['pic', 'pic.ground', 'pic.tower', 'pic.h', 'pic.rt', 'pic.pl', 'pic.ql', 'pic.rl'];

const QUESTION =
  'A cell tower is 45 m tall. Survey stakes P, Q and R are in a straight line going away from the base of the tower. The angles of elevation to the top of the tower are 60° from P, 40° from Q and 25° from R. How far apart are stakes P and Q, and stakes Q and R, to the nearest tenth of a metre?';

const video: Explainer = {
  id: 'xq-m203-4-3',
  lessonId: '',
  exam: {
    lesson: 'm203-4-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Far Apart Are the Survey Stakes? (Three Right Triangles)',
  thumbnailTitle: 'Three Stakes, One Tower',
  thumbnail: 'pic',
  summary:
    'An exam-style question, solved one small step at a time: a cell tower is 45 m tall, and from survey stakes P, Q and R in a line away from it, the angles of elevation to its top are 60°, 40° and 25°. How far apart are the stakes? All three right triangles share the 45 m height, so each stake is 45 ÷ tan θ from the base: 25.98 m, 53.63 m and 96.50 m. Subtracting, P to Q is about 27.6 m and Q to R about 42.9 m. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Three Stakes, One Tower', subtitle: 'Three right triangles, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question with a chain of three right triangles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '$PQ \\approx 27.6$ m and $QR \\approx 42.9$ m', working: '$\\dfrac{45}{\\tan 40^\\circ} - \\dfrac{45}{\\tan 60^\\circ} \\approx 27.6$ and $\\dfrac{45}{\\tan 25^\\circ} - \\dfrac{45}{\\tan 40^\\circ} \\approx 42.9$' }],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A cell tower is 45 metres tall. Survey stakes P, Q and R are in a straight line going away from the base of the tower.' },
        { say: 'The angles of elevation to the top of the tower are 60 degrees from P, 40 degrees from Q and 25 degrees from R. How far apart are stakes P and Q, and stakes Q and R, to the nearest tenth of a metre?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [scene(), { kind: 'text', id: 't', size: 'md', md: 'Each stake makes a **right triangle** with the tower. All three **share** the $45$ m height.' }],
      lines: [
        { say: 'Here is the tower, 45 metres tall, with the three stakes in a line.', show: PIC },
        { say: 'From P, close to the tower, you look up steeply, at 60 degrees. That makes one right triangle.', show: 'pic.p' },
        { say: 'From Q, further away, the angle is 40 degrees, and from R, furthest away, it is 25 degrees. That is three right triangles.', show: ['pic.q', 'pic.r'] },
        { say: 'We want x, the gap from P to Q, and y, the gap from Q to R. All three triangles share the 45 metre height.', show: ['pic.gaps', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}} \\quad \\Rightarrow \\quad \\text{adjacent} = \\dfrac{\\text{opposite}}{\\tan\\theta}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Keep the digits', md: 'Find each stake\'s distance from the **base** first, then **subtract**. Keep **two decimals** until the very end, so the rounding does not pile up.' },
      ],
      lines: [
        { say: 'Here is what we need. In each triangle, the 45 metre height is opposite the angle, and the distance along the ground is adjacent. Tangent links them, so the adjacent side is the opposite side divided by tan theta.', show: 'f' },
        { say: 'Find each stake\'s distance from the base of the tower first, then subtract. And keep the decimals until the end, so the rounding does not pile up.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find how far **each stake** is from the base', '**Subtract** neighbours for $x$ and $y$', '**Round** at the end'] }],
      lines: [
        { say: 'Here is the plan. Find how far each stake is from the base of the tower.', show: 'plan.0' },
        { say: 'Subtract neighbouring distances to get x and y.', show: 'plan.1' },
        { say: 'Then round to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Three distances',
      layout: 'split',
      left: [scene(380)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['P: \\dfrac{45}{\\tan 60^\\circ} \\approx 25.98 \\text{ m}', 'Q: \\dfrac{45}{\\tan 40^\\circ} \\approx 53.63 \\text{ m}', 'R: \\dfrac{45}{\\tan 25^\\circ} \\approx 96.50 \\text{ m}'] }],
      lines: [
        { say: 'Step one. P is 45 divided by tan 60 degrees from the base: about 25.98 metres.', show: [...PIC, 'pic.p', 'm.0'], focus: 'm.0' },
        { say: 'Q is 45 divided by tan 40 degrees: about 53.63 metres.', show: ['pic.q', 'm.1'], focus: 'm.1' },
        { say: 'And R is 45 divided by tan 25 degrees: about 96.50 metres. The smaller the angle, the further away the stake.', show: ['pic.r', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Subtract',
      layout: 'split',
      left: [scene(380)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x \\approx 53.63 - 25.98 \\approx \\good{27.6 \\text{ m}}', 'y \\approx 96.50 - 53.63 \\approx \\good{42.9 \\text{ m}}'] }],
      lines: [
        { say: 'Step two. The gap from P to Q is 53.63 minus 25.98, which is about 27.65, so 27.6 metres.', show: [...PIC, 'pic.p', 'pic.q', 'pic.r', 'pic.gaps', 'm.0'], focus: 'm.0' },
        { say: 'The gap from Q to R is 96.50 minus 53.63, which is about 42.87, so 42.9 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['27.65 + 42.87 = 70.52', '96.50 - 25.98 = 70.52 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The two gaps together, 27.65 plus 42.87, make 70.52 metres.', show: 'm.0' },
        { say: 'And the whole distance from P to R is 96.50 minus 25.98, which is 70.52 too. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$40.2$ m and $16.8$ m', '**multiplied** by tan: the distance is adjacent, so **divide**'],
            ['$28.0$ m and $43.0$ m', 'rounded to $26$, $54$, $97$ **too early**'],
            ['$70.5$ m', 'that is **P to R**: the question asks for each gap'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '40.2 and 16.8 multiply 45 by the tangents. That finds an opposite side, but here the height is the opposite side, and the distances are adjacent. Divide.' },
        { say: '28.0 and 43.0 round the distances to whole metres before subtracting. The rounding piles up. Keep the decimals until the end.' },
        { say: 'And 70.5 is the whole distance from P to R. The question asks for each gap.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A flagpole is $30$ m tall. From stake A the angle of elevation to its top is $50^\\circ$, and from stake B, further away in a line, it is $30^\\circ$. How far apart are the stakes, to the nearest tenth of a metre?',
          choices: ['$26.8$ m', '$18.4$ m', '$77.1$ m', '$52.0$ m'],
          answer: 0,
          working: '$\\dfrac{30}{\\tan 30^\\circ} - \\dfrac{30}{\\tan 50^\\circ} \\approx 51.96 - 25.17 \\approx 26.8$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A flagpole is 30 metres tall. From stake A, the angle of elevation to its top is 50 degrees, and from stake B, further away in a line, it is 30 degrees. How far apart are the stakes, to the nearest tenth of a metre? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'B is 30 divided by tan 30 degrees, about 51.96 metres from the pole, and A is 30 divided by tan 50 degrees, about 25.17. The difference is about 26.8 metres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One right triangle **at a time**', 'Use the **shared side** in every triangle', 'Adjacent $= \\dfrac{\\text{opposite}}{\\tan\\theta}$', 'Keep the decimals, **round at the end**'] }],
      lines: [
        { say: 'Here is what to remember. Work one right triangle at a time.', show: 'sum.0' },
        { say: 'Use the side they share in every triangle, here the 45 metre height.', show: 'sum.1' },
        { say: 'When you know the opposite side, the adjacent side is the opposite side divided by tan theta.', show: 'sum.2' },
        { say: 'And keep the decimals, and round only at the end. For more on problems with three right triangles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
