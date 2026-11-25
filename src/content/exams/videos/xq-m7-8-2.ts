import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 7 lesson 8.2 (perpendicular bisectors and angle bisectors), written by
// Gradileo in the style of a Grade 7 unit test. A perpendicular bisector cuts a segment into two
// equal halves (AM = 12 ÷ 2 = 6 cm), and every point on it is the same distance from both ends
// (PB = PA = 10 cm). An angle bisector cuts an angle into two equal angles (76° ÷ 2 = 38°).

const QUESTION =
  'Line ℓ is the perpendicular bisector of segment AB, which is 12 cm long, and it meets AB at M. Point P is on ℓ, and PA = 10 cm. (a) Find AM. (b) Find PB. (c) Ray BD bisects ∠ABC, which measures 76°. Find ∠ABD.';

type P = [number, number];

/** Segment AB (12 cm, drawn 6 long), its perpendicular bisector ℓ through M, and P on ℓ. */
const lengths = (): Part => {
  const points: Record<string, P> = { A: [-3, 0], B: [3, 0], M: [0, 0], P: [0, 4], L0: [0, -0.7], L1: [0, 5], W: [3.3, 0] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'am', from: 'A', to: 'M', tone: 'adj', weight: 4.5 },
    { kind: 'line', id: 'mb', from: 'M', to: 'B', tone: 'adj', weight: 4.5 },
    { kind: 'line', id: 'am6', from: 'A', to: 'M', tone: 'adj', weight: 4.5, label: '6 \\text{ cm}', labelSide: 'right' },
    { kind: 'line', id: 'mb6', from: 'M', to: 'B', tone: 'adj', weight: 4.5, label: '6 \\text{ cm}', labelSide: 'right' },
    { kind: 'label', id: 'whole', at: 'W', tex: 'AB = 12 \\text{ cm}', tone: 'adj', place: 'right' },
    { kind: 'line', id: 'l', from: 'L0', to: 'L1', tone: 'good', weight: 3.5, label: '\\ell', labelSide: 'left' },
    { kind: 'right', id: 'sq', at: 'M', from: 'B', to: 'L1' },
    { kind: 'line', id: 'pa', from: 'A', to: 'P', tone: 'opp', weight: 3.5, dashed: true, label: '10 \\text{ cm}', labelSide: 'left' },
    { kind: 'line', id: 'pb', from: 'P', to: 'B', tone: 'opp', weight: 3.5, dashed: true, label: '10 \\text{ cm}', labelSide: 'left' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'below left', dot: true },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below right', dot: true },
    { kind: 'label', id: 'nM', at: 'M', tex: 'M', place: 'above left', dot: true },
    { kind: 'label', id: 'nP', at: 'P', tex: 'P', place: 'above right', dot: true },
  ];
  return { points, items };
};

const deg = (a: number, r: number): P => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)];

/** Angle ABC of 76° at B, and the ray BD that bisects it into two angles of 38°. */
const angle = (): Part => {
  const points: Record<string, P> = { B: [0, 0], A: deg(0, 4.4), C: deg(76, 4.4), D: deg(38, 4.4) };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'ba', from: 'B', to: 'A', tone: 'ink', weight: 4 },
    { kind: 'line', id: 'bc', from: 'B', to: 'C', tone: 'ink', weight: 4 },
    { kind: 'line', id: 'bd', from: 'B', to: 'D', tone: 'good', weight: 4, arrow: true },
    { kind: 'angle', id: 'abc', at: 'B', from: 'A', to: 'C', tone: 'theta', label: '76^\\circ', r: 46, labelDist: 70 },
    { kind: 'angle', id: 'abd', at: 'B', from: 'A', to: 'D', tone: 'adj', label: '38^\\circ', r: 90, labelDist: 118 },
    { kind: 'angle', id: 'dbc', at: 'B', from: 'D', to: 'C', tone: 'opp', label: '38^\\circ', r: 90, labelDist: 118 },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below left', dot: true },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'right' },
    { kind: 'label', id: 'nC', at: 'C', tex: 'C', place: 'above' },
    { kind: 'label', id: 'nD', at: 'D', tex: 'D', place: 'above right', tone: 'good' },
  ];
  return { points, items };
};

const seg = (id: string) => figure(id, [lengths()], 460);
const ang = (id: string) => figure(id, [angle()], 460);

const video: Explainer = {
  id: 'xq-m7-8-2',
  lessonId: '',
  exam: {
    lesson: 'm7-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Using a Perpendicular Bisector and an Angle Bisector (Perpendicular Bisectors and Angle Bisectors)',
  thumbnailTitle: 'Using the Bisectors',
  thumbnail: 'sg',
  summary:
    'An exam-style question, solved one small step at a time: line ℓ is the perpendicular bisector of the 12 cm segment AB and meets it at M, and P is a point on ℓ with PA = 10 cm. Find (a) AM and (b) PB. (c) Ray BD bisects the 76° angle ABC: find angle ABD. A bisector cuts into two equal parts, so AM = 6 cm and angle ABD = 38°, and every point on a perpendicular bisector is the same distance from both ends, so PB = PA = 10 cm. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Using the Bisectors', subtitle: 'Perpendicular bisectors and angle bisectors, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about perpendicular bisectors and angle bisectors. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'Line $\\ell$ is the perpendicular bisector of segment $AB$, which is $12$ cm long, and it meets $AB$ at $M$. Point $P$ is on $\\ell$, and $PA = 10$ cm. (a) Find $AM$. (b) Find $PB$. (c) Ray $BD$ bisects $\\angle ABC$, which measures $76^\\circ$. Find $\\angle ABD$.',
          answer: '(a) $6$ cm (b) $10$ cm (c) $38^\\circ$',
          working: 'AM = 12 ÷ 2; PB = PA; ∠ABD = 76° ÷ 2',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Line "l" is the perpendicular bisector of segment A B, which is 12 centimetres long, and it meets A B at M. Point P is on line "l", and P A is 10 centimetres. Part a: find A M. Part b: find P B. Part c: ray B D bisects angle A B C, which measures 76 degrees. Find angle A B D.', caption: 'Line ℓ is the perpendicular bisector of segment AB, which is 12 cm long, and it meets AB at M. Point P is on ℓ, and PA = 10 cm. (a) Find AM. (b) Find PB. (c) Ray BD bisects ∠ABC, which measures 76°. Find ∠ABD.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Bisect', md: 'To **bisect** means to cut into **two equal parts**. A **perpendicular bisector** cuts a segment in half at a **right angle**. An **angle bisector** is a ray that cuts an angle into two **equal angles**.' }],
      lines: [
        { say: 'To bisect means to cut into two equal parts.', show: 'c' },
        { say: 'A perpendicular bisector cuts a segment in half, at a right angle. An angle bisector is a ray that cuts an angle into two equal angles.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['It meets the segment at its **midpoint**: the two halves are **equal**', 'Every point on it is the **same distance** from **both ends**', 'An angle bisector makes **two equal angles**'] }],
      lines: [
        { say: 'Here is what we need. A perpendicular bisector meets the segment at its midpoint, so the two halves are equal.', show: 'k.0' },
        { say: 'Every point on a perpendicular bisector is the same distance from both ends of the segment.', show: 'k.1' },
        { say: 'And an angle bisector makes two equal angles.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Halve** the segment', '(b) Use **same distance from both ends**', '(c) **Halve** the angle'] }],
      lines: [
        { say: 'Here is the plan. For part a, halve the segment.', show: 'plan.0' },
        { say: 'For part b, use the fact that P is the same distance from both ends.', show: 'plan.1' },
        { say: 'For part c, halve the angle.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The segment',
      layout: 'split',
      leftWidth: 620,
      left: [seg('sg')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AM = 12 \\div 2', '= \\good{6 \\text{ cm}}', 'PB = PA = \\good{10 \\text{ cm}}'] }],
      lines: [
        { say: 'Here is segment A B, 12 centimetres long, with its perpendicular bisector, line "l", crossing at M at a right angle.', show: ['sg.am', 'sg.mb', 'sg.whole', 'sg.l', 'sg.sq', 'sg.nA', 'sg.nB', 'sg.nM'] },
        { say: 'Step one. A bisector cuts A B into two equal halves, so M is the midpoint. A M is 12 divided by 2, which is 6 centimetres.', show: ['sg.am6', 'sg.mb6', 'm.0', 'm.1'], hide: ['sg.am', 'sg.mb', 'sg.whole'], focus: 'm.1' },
        { say: 'Step two. P is on line "l", 10 centimetres from A. Every point on the perpendicular bisector is the same distance from both ends, so P B is also 10 centimetres.', show: ['sg.nP', 'sg.pa', 'sg.pb', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The angle',
      layout: 'split',
      leftWidth: 560,
      left: [ang('an')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle ABD = 76^\\circ \\div 2', '= \\good{38^\\circ}'] }],
      lines: [
        { say: 'Step three. Here is angle A B C, 76 degrees.', show: ['an.ba', 'an.bc', 'an.abc', 'an.nB', 'an.nA', 'an.nC'] },
        { say: 'Ray B D bisects it, so it cuts the angle into two equal angles. Angle A B D is 76 divided by 2, which is 38 degrees.', show: ['an.bd', 'an.nD', 'an.abd', 'an.dbc', 'm.0', 'm.1'], hide: 'an.abc', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['AM + MB = 6 + 6 = 12 \\text{ cm} \\ \\checkmark', '\\angle ABD + \\angle DBC = 38^\\circ + 38^\\circ = 76^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The two halves of the segment, 6 and 6, add back to 12 centimetres.', show: 'm.0' },
        { say: 'And the two halves of the angle, 38 and 38 degrees, add back to 76 degrees. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$AM = 12$ cm', 'that is all of $AB$: $M$ is the **midpoint**'],
            ['$PB = 6$ cm', 'mixed up $PB$ with $MB$: $P$ is the same distance from **both ends**'],
            ['$\\angle ABD = 152^\\circ$', 'doubled the angle: a bisector **halves** it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A M equals 12 is the whole segment. M is the midpoint, halfway along.' },
        { say: 'P B equals 6 mixes up P B with M B. P is up on the bisector, and it is the same distance from A as from B: 10 centimetres.' },
        { say: 'And 152 degrees doubles the angle. A bisector cuts the angle in half.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ray $QS$ bisects $\\angle PQR$. If $\\angle PQS = 29^\\circ$, what is $\\angle PQR$?',
          choices: ['$58^\\circ$', '$29^\\circ$', '$14.5^\\circ$', '$61^\\circ$'],
          answer: 0,
          working: 'The bisector makes two equal angles of 29°, so ∠PQR = 2 × 29° = 58°.',
        },
      ],
      lines: [
        { say: 'Your turn. Ray Q S bisects angle P Q R. If angle P Q S is 29 degrees, what is angle P Q R? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The bisector makes two equal angles of 29 degrees, so the whole angle is 2 times 29, which is 58 degrees. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Bisect**: cut into two **equal** parts', 'Perpendicular bisector: through the **midpoint**, at $90^\\circ$', 'Points on it are **equally far** from both ends', 'Angle bisector: **half** the angle each side'] }],
      lines: [
        { say: 'Here is what to remember. To bisect is to cut into two equal parts.', show: 'sum.0' },
        { say: 'A perpendicular bisector goes through the midpoint, at a right angle.', show: 'sum.1' },
        { say: 'Every point on it is equally far from both ends.', show: 'sum.2' },
        { say: 'And an angle bisector leaves half the angle on each side. For more on perpendicular bisectors and angle bisectors, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
