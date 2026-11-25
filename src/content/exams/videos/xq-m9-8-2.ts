import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, arcOn, ln, ring } from '@/content/math9/videos/lib/m9-8-figures.ts';

// Exam question for Math 9 lesson 8.2 (inscribed and central angles). The free textbooks we use
// have no question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit
// test. An inscribed angle is half the central angle on the same arc: ∠ACB = 110° ÷ 2 = 55°, and
// every inscribed angle on the same arc is equal, so ∠ADB = 55° too. Check: 2 × 55° = 110°.

const QUESTION =
  'Points A, B, C and D lie on a circle with centre O. C and D are on the same side of chord AB, and the central angle ∠AOB is 110°. (a) What is the inscribed angle ∠ACB? (b) What is ∠ADB?';

const R = 4;

const circle = (id: string, solved: boolean) =>
  figure(
    id,
    [
      ring({ r: R, pts: { A: 215, B: 325, C: 110, D: 70 }, centrePlace: 'above' }),
      arcOn('arc', [0, 0], R, 215, 325, { label: '\\text{arc } AB', side: 'right' }),
      ln('oa', 'O', 'A', { tone: 'adj', group: 'central' }),
      ln('ob', 'O', 'B', { tone: 'adj', group: 'central' }),
      ang('ao', 'O', 'A', 'B', { tone: 'adj', r: 30, label: '110^\\circ', group: 'central' }),
      ln('ca', 'C', 'A', { tone: 'opp', group: 'inscribed' }),
      ln('cb', 'C', 'B', { tone: 'opp', group: 'inscribed' }),
      ang('ac', 'C', 'A', 'B', { tone: 'opp', r: 44, label: solved ? '55^\\circ' : '?', dist: 64, group: 'inscribed' }),
      ln('da', 'D', 'A', { tone: 'theta', group: 'second' }),
      ln('db', 'D', 'B', { tone: 'theta', group: 'second' }),
      ang('ad', 'D', 'A', 'B', { tone: 'theta', r: 44, label: solved ? '55^\\circ' : '?', dist: 64, group: 'second' }),
    ],
    440,
  );

const base = (id: string) => [`${id}.fill`, `${id}.outline`, `${id}.names`, `${id}.arc`];

const video: Explainer = {
  id: 'xq-m9-8-2',
  lessonId: '',
  exam: {
    lesson: 'm9-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Half the Central Angle (Inscribed and Central Angles)',
  thumbnailTitle: 'Half the Central Angle',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: points A, B, C and D lie on a circle with centre O. C and D are on the same side of chord AB, and the central angle ∠AOB is 110°. (a) What is the inscribed angle ∠ACB? (b) What is ∠ADB? An inscribed angle is half the central angle on the same arc, so ∠ACB = 110° ÷ 2 = 55°. Inscribed angles on the same arc are equal, so ∠ADB = 55° too. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Half the Central Angle', subtitle: 'Inscribed and central angles, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about inscribed and central angles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Points $A$, $B$, $C$ and $D$ lie on a circle with centre $O$. $C$ and $D$ are on the same side of chord $AB$, and the central angle $\\angle AOB$ is $110^\\circ$. (a) What is the inscribed angle $\\angle ACB$? (b) What is $\\angle ADB$?',
          answer: '(a) $55^\\circ$ (b) $55^\\circ$',
          working: '110 ÷ 2 = 55; same arc, same angle',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Points A, B, C and D lie on a circle with centre O. C and D are on the same side of the chord A B, and the central angle A O B is 110 degrees. Part a: what is the inscribed angle A C B? Part b: what is angle A D B?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [circle('ask', false)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two kinds of angle', md: 'A **central** angle has its vertex at the **centre**. An **inscribed** angle has its vertex **on the circle**. Both here stand on the same **arc** $AB$.' }],
      lines: [
        { say: 'Here is the circle, with the arc A B. The central angle A O B is 110 degrees.', show: [...base('ask'), 'ask.central'] },
        { say: 'The angle at C has its vertex on the circle, so it is an inscribed angle. It stands on the same arc, A B.', show: ['ask.inscribed', 'c'], focus: 'ask.inscribed' },
        { say: 'And the angle at D stands on the same arc too. We want both angles.', show: 'ask.second', focus: 'ask.second' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{inscribed angle} = \\tfrac{1}{2} \\times \\text{central angle}', '\\text{same arc} \\Rightarrow \\text{equal inscribed angles}'] }],
      lines: [
        { say: 'Here is what we need. An inscribed angle is half of the central angle that stands on the same arc.', show: 'm.0' },
        { say: 'And all the inscribed angles that stand on the same arc are equal.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **arc** both angles stand on', '(a) **Halve** the central angle', '(b) Same arc: the **same** angle'] }],
      lines: [
        { say: 'Here is the plan. Find the arc the angles stand on.', show: 'plan.0' },
        { say: 'For part a, halve the central angle.', show: 'plan.1' },
        { say: 'For part b, an inscribed angle on the same arc is the same size.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Halve it',
      layout: 'split',
      leftWidth: 600,
      left: [circle('st', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle AOB = 110^\\circ', '\\angle ACB = 110^\\circ \\div 2 = \\good{55^\\circ}', '\\angle ADB = \\angle ACB = \\good{55^\\circ}'] }],
      lines: [
        { say: 'Here is the circle again.', show: base('st') },
        { say: 'Step one. The central angle A O B stands on arc A B, and it is 110 degrees.', show: ['st.central', 'm.0'], focus: ['st.arc', 'st.central', 'm.0'] },
        { say: 'Step two, part a. Angle A C B stands on the same arc, with its vertex on the circle. So it is half the central angle: 110 divided by 2 is 55 degrees.', show: ['st.inscribed', 'm.1'], focus: ['st.inscribed', 'm.1'] },
        { say: 'Step three, part b. Angle A D B stands on the same arc too. Inscribed angles on the same arc are equal, so angle A D B is also 55 degrees.', show: ['st.second', 'm.2'], focus: ['st.second', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\times 55^\\circ = 110^\\circ \\ \\checkmark', '55^\\circ < 90^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Doubling the inscribed angle should give the central angle: 2 times 55 is 110. Yes.', show: 'm.0', focus: 'm.0' },
        { say: 'And a sense check: in the picture, the angles at C and D look smaller than the angle at O, and less than a right angle. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$220^\\circ$', '**doubled**: the inscribed angle is **half**'],
            ['$110^\\circ$', 'copied the central angle: the vertex is **on the circle**'],
            ['$35^\\circ$', 'found a base angle of triangle $OAB$, not $\\angle ACB$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '220 degrees doubles the central angle. It is the inscribed angle that is half, not the other way round.' },
        { say: '110 degrees copies the central angle. But C is on the circle, not at the centre, so the angle is smaller.' },
        { say: 'And 35 degrees is a base angle of the triangle O A B: 180 minus 110, then halved. That is a different angle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An inscribed angle is $35^\\circ$. What is the central angle that stands on the same arc?',
          choices: ['$17.5^\\circ$', '$35^\\circ$', '$145^\\circ$', '$70^\\circ$'],
          answer: 3,
          working: 'The central angle is twice the inscribed angle: 2 × 35° = 70°.',
        },
      ],
      lines: [
        { say: 'Your turn. An inscribed angle is 35 degrees. What is the central angle that stands on the same arc? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The inscribed angle is half the central angle, so the central angle is twice the inscribed angle: 2 times 35 is 70 degrees. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **arc** the angle stands on', 'Inscribed $=$ **half** the central angle', 'Same arc: **equal** inscribed angles', 'Check by **doubling**'] }],
      lines: [
        { say: 'Here is what to remember. Find the arc each angle stands on.', show: 'sum.0' },
        { say: 'An inscribed angle is half the central angle on the same arc.', show: 'sum.1' },
        { say: 'Inscribed angles on the same arc are equal.', show: 'sum.2' },
        { say: 'And check by doubling. For more on inscribed and central angles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
