import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 2.4 (congruent triangles). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 10.3, Triangles, CC BY-NC-SA 4.0), with
// the book's figure description in brackets. Two pairs of angles are marked equal, and the marked
// side lies between them in each triangle, so the figure shows Angle-Side-Angle (ASA). The
// triangles are drawn as in the book; the corner letters are ours, to talk about them.

/** The book's two triangles: one arc at C and D, two arcs at B and E, and one tick on CB and DE. */
const pair = (height = 330) =>
  figure(
    'pr',
    [
      triangle({ name: 'p', A: [0, 0], B: [6.6, 0], C: [5.24, 9.2], names: ['A', 'B', 'C'], arcs: { C: 1, B: 2 }, ticks: { BC: 1 } }),
      triangle({ name: 'q', A: [12, 0], B: [17.5, 7.48], C: [22.2, 2.8], names: ['D', 'E', 'F'], arcs: { A: 1, B: 2 }, ticks: { AB: 1 } }),
    ],
    height,
  );

const SHAPES = ['pr.p-shape', 'pr.q-shape'];
const MARKS = ['pr.p-mC', 'pr.q-mA', 'pr.p-mB', 'pr.q-mB', 'pr.p-tBC', 'pr.q-tAB'];

const QUESTION =
  'What congruence theorem is being illustrated in the figure shown? [Two triangles. The top angle of the first triangle and the bottom-left angle of the second triangle are congruent. The bottom-right angle of the first triangle is congruent to the top angle of the second triangle. The right side of the first triangle is congruent with the left side of the second triangle.]';

const video: Explainer = {
  id: 'xq-m202-2-4',
  lessonId: '',
  exam: {
    lesson: 'm202-2-4',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.3, Triangles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles',
    question: QUESTION,
  },
  title: 'Exam Question: Which Congruence Theorem Is Shown? (Congruent Triangles)',
  thumbnailTitle: 'Which Congruence Theorem?',
  thumbnail: 'pr',
  summary:
    'A real test question, solved one small step at a time: two triangles have two pairs of angles and one pair of sides marked equal. Which congruence theorem does the figure show? We read the arcs and the tick marks, see that the marked side lies between the two marked angles, and find Angle-Side-Angle (ASA). Then we match up the corners and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Congruence Theorem?', subtitle: 'Congruent triangles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about congruent triangles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        pair(250),
        { kind: 'try', id: 'q', kicker: 'The question', prompt: 'What congruence theorem is being illustrated in the figure shown?', answer: 'Angle-Side-Angle (ASA)', working: 'Two pairs of equal angles, and the equal side lies **between** them.' },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: ['q', ...SHAPES, ...MARKS] },
        { say: 'Two triangles are drawn, with some angles marked by arcs and one side in each marked with a tick. What congruence theorem is being illustrated in the figure shown?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pair(), { kind: 'text', id: 't', size: 'md', md: 'Read the **marks**: which parts are equal, and **where** they are. We letter the corners so we can talk about them.' }],
      lines: [
        { say: 'Here are the two triangles. The arcs and the tick marks show which parts are equal.', show: [...SHAPES, ...MARKS] },
        { say: 'We need to decide which congruence condition those marks show. To talk about the corners, we have lettered them A, B, C and D, E, F.', show: ['pr.p-names', 'pr.q-names', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'conds',
          head: ['Condition', 'What is equal'],
          rows: [
            ['SSS', 'three pairs of **sides**'],
            ['SAS', 'two sides and the angle **between** them'],
            ['ASA', 'two angles and the side **between** them'],
          ],
        },
        { kind: 'callout', id: 'marks', tone: 'tip', title: 'Reading the marks', md: 'Sides with the **same number of ticks** are equal. Angles with the **same number of arcs** are equal.' },
      ],
      lines: [
        { say: 'Here is what we need. Each of these three conditions proves that two triangles are congruent.', show: 'conds' },
        { say: 'S S S: three pairs of equal sides. S A S: two sides and the angle between them. "A" S "A": two angles and the side between them.' },
        { say: 'And in a figure, sides with the same number of tick marks are equal, and angles with the same number of arcs are equal.', show: 'marks' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Match the **angle** marks', 'Match the **side** marks', 'Check **where** the side is'] }],
      lines: [
        { say: 'Here is the plan. First, match up the angles marked with arcs.', show: 'plan.0' },
        { say: 'Second, match up the sides marked with ticks.', show: 'plan.1' },
        { say: 'Third, check where the marked side is, compared with the marked angles.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The angles',
      layout: 'split',
      leftWidth: 700,
      left: [pair()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle C = \\angle D', '\\angle B = \\angle E'] }],
      lines: [
        { say: 'Step one. The single arcs are at C, the top of the first triangle, and at D, the bottom left of the second. So angle C equals angle D.', show: [...SHAPES, 'pr.p-names', 'pr.q-names', 'pr.p-mC', 'pr.q-mA', 'm.0'], focus: ['pr.p-mC', 'pr.q-mA'] },
        { say: 'The double arcs are at B and E. So angle B equals angle E. That is two pairs of equal angles.', show: ['pr.p-mB', 'pr.q-mB', 'm.1'], focus: ['pr.p-mB', 'pr.q-mB'] },
      ],
    },
    {
      chapter: 'Step 2: The side',
      layout: 'split',
      leftWidth: 700,
      left: [pair()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle C = \\angle D', '\\angle B = \\angle E', 'CB = DE'] }],
      lines: [
        { say: 'Step two. Here are the angle marks again.', show: [...SHAPES, 'pr.p-names', 'pr.q-names', 'pr.p-mC', 'pr.q-mA', 'pr.p-mB', 'pr.q-mB', 'm.0', 'm.1'] },
        { say: 'One tick mark is on side C B of the first triangle, and one is on side D E of the second. So C B equals D E.', show: ['pr.p-tBC', 'pr.q-tAB', 'm.2'], focus: ['pr.p-tBC', 'pr.q-tAB'] },
      ],
    },
    {
      chapter: 'Step 3: Where is the side?',
      layout: 'split',
      leftWidth: 700,
      left: [pair()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle C, \\ CB, \\ \\angle B', '\\good{\\text{ASA}}'] }],
      lines: [
        { say: 'Step three. Side C B joins corner C to corner B, and those are exactly the two marked corners. So the side is between the two angles.', show: [...SHAPES, 'pr.p-names', 'pr.q-names', ...MARKS], focus: ['pr.p-mC', 'pr.p-tBC', 'pr.p-mB'] },
        { say: 'In the second triangle, side D E joins the marked corners D and E, so it is between them too.', focus: ['pr.q-mA', 'pr.q-tAB', 'pr.q-mB'] },
        { say: 'Going along the side, we meet an angle, then the side, then an angle.', show: 'm.0' },
        { say: 'So the figure shows the Angle-Side-Angle congruence theorem: "A" S "A".', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C \\leftrightarrow D, \\quad B \\leftrightarrow E, \\quad A \\leftrightarrow F', '\\triangle CBA \\cong \\triangle DEF'] }],
      lines: [
        { say: 'Let us check by matching the corners. C goes with D, and B goes with E, so the last corners, "A" and F, go together.', show: 'm.0' },
        { say: 'So triangle C B "A" is congruent to triangle D E F. Every marked part lines up, so "A" S "A" fits.', show: 'm.1', focus: 'm.1' },
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
            ['SAS', 'only **one** pair of sides is marked'],
            ['AAA', 'angles alone do not prove congruence; the **side** matters'],
            ['$\\triangle ABC \\cong \\triangle DEF$', 'match corners by their **marks**, not by letter order'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'It is not S A S. S A S needs two pairs of equal sides, and only one pair is marked.' },
        { say: 'Two equal angles alone would only show the triangles have the same shape. It is the equal side that fixes the size.' },
        { say: 'And when you write the congruence, match the corners by their marks. "A" goes with F here, not with D.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In two triangles, all three pairs of sides are marked as equal, and no angles are marked. Which theorem proves they are congruent?',
          choices: ['SAS', 'ASA', 'SSS', 'AAA'],
          answer: 2,
          working: 'Three pairs of equal **sides**: Side-Side-Side.',
        },
      ],
      lines: [
        { say: 'Your turn. In two triangles, all three pairs of sides are marked as equal, and no angles are marked. Which theorem proves they are congruent? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Three pairs of equal sides is Side-Side-Side, S S S: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same **ticks**: equal sides; same **arcs**: equal angles', 'SAS: the angle is **between** the sides', 'ASA: the side is **between** the angles', 'Match corners by their **marks**'] }],
      lines: [
        { say: 'Here is what to remember. The same number of ticks means equal sides, and the same number of arcs means equal angles.', show: 'sum.0' },
        { say: 'In S A S, the equal angle is between the equal sides.', show: 'sum.1' },
        { say: 'In "A" S "A", the equal side is between the equal angles.', show: 'sum.2' },
        { say: 'And match the corners by their marks. For more on congruent triangles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
