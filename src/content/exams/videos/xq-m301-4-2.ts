import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

// Exam question for Math 30-1 lesson 4.2 (the unit circle). The question is an exercise from
// OpenStax Precalculus 2e, word for word (section 5.2, Unit Circle: Sine and Cosine Functions,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. 7π/6 = π + π/6 is in quadrant III
// with reference angle π/6, so sin(7π/6) = −1/2 and cos(7π/6) = −√3/2, as in the book's answer.

/** The reference angle between the arm and the negative x-axis (`ref`). */
const ref: Part = {
  points: { 'u-near': [-4, 0] },
  items: [{ kind: 'angle', id: 'ref', at: 'u-O', from: 'u-near', to: 'u-P', tone: 'hyp', label: '\\tfrac{\\pi}{6}', r: 40, labelDist: 66 }],
};

/** The unit circle with the arm at 7π/6 (210°), its drop to the x-axis and the side lengths. */
const circle = (height = 440) =>
  figure(
    'uc',
    [
      unitCircle({ name: 'u', arm: 210, armLabel: '\\tfrac{7\\pi}{6}', drop: true, points: [{ deg: 210, tex: '\\left(-\\tfrac{\\sqrt{3}}{2}, -\\tfrac{1}{2}\\right)' }] }),
      ref,
    ],
    height,
  );

const BASE = ['uc.u-axes', 'uc.u-circle', 'uc.u-one'];

const QUESTION =
  'Find the reference angle, the quadrant of the terminal side, and the sine and cosine of each angle. If the angle is not one of the special angles on the unit circle, use a calculator and round to three decimal places. 7π/6';

const video: Explainer = {
  id: 'xq-m301-4-2',
  lessonId: '',
  exam: {
    lesson: 'm301-4-2',
    source: 'OpenStax, Precalculus 2e, Exercise in section 5.2, Unit Circle: Sine and Cosine Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/5-2-unit-circle-sine-and-cosine-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Sine and Cosine of 7π/6 on the Unit Circle (The Unit Circle)',
  thumbnailTitle: 'Sine and Cosine of 7π/6',
  thumbnail: 'uc',
  summary:
    'A real test question, solved one small step at a time: find the reference angle, the quadrant, and the sine and cosine of 7π/6. It is π/6 past π, so it is in quadrant III with reference angle π/6, and both sine and cosine are negative: sin(7π/6) = −1/2 and cos(7π/6) = −√3/2. Then we check on the unit circle and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sine and Cosine of 7π/6', subtitle: 'The unit circle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the unit circle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the reference angle, the quadrant of the terminal side, and the sine and cosine of each angle. If the angle is not one of the special angles on the unit circle, use a calculator and round to three decimal places. $\\dfrac{7\\pi}{6}$',
          answer: 'reference angle $\\dfrac{\\pi}{6}$, quadrant III, $\\sin\\dfrac{7\\pi}{6} = -\\dfrac{1}{2}$, $\\cos\\dfrac{7\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$',
          working: '$\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$, and in quadrant III sine and cosine are both negative.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the reference angle, the quadrant of the terminal side, and the sine and cosine of each angle. If the angle is not one of the special angles on the unit circle, use a calculator and round to three decimal places. The angle is 7 pi over 6.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Four answers: the **reference angle**, the **quadrant**, the **sine** and the **cosine**. $\\dfrac{7\\pi}{6}$ is built from $\\dfrac{\\pi}{6}$, a **special angle**, so the answers are exact.' }],
      lines: [
        { say: 'We need four answers: the reference angle, the quadrant, the sine and the cosine.', show: 't' },
        { say: '7 pi over 6 is built from pi over 6, one of the special angles, so we can give exact values. No calculator needed.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'uc', tone: 'key', title: 'The unit circle', md: 'The terminal arm of $\\theta$ meets the unit circle at $(\\cos\\theta, \\sin\\theta)$.' },
        { kind: 'callout', id: 'ref', tone: 'definition', title: 'Reference angle', md: 'The **acute** angle between the terminal arm and the **$x$-axis**. The quadrant decides the **signs**.' },
      ],
      lines: [
        { say: 'Here is what we need. The terminal arm of an angle theta meets the unit circle at the point cos theta, sin theta.', show: 'uc' },
        { say: 'The reference angle is the acute angle between the terminal arm and the x-axis. It gives the size of the sine and cosine, and the quadrant gives their signs.', show: 'ref' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **quadrant**', 'Find the **reference angle**', 'Use the special angle, then fix the **signs**'] }],
      lines: [
        { say: 'Here is the plan. First, find the quadrant.', show: 'plan.0' },
        { say: 'Second, find the reference angle.', show: 'plan.1' },
        { say: 'Third, use the special angle values, then give them the right signs.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The quadrant',
      layout: 'center',
      main: [circle(430), { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}: \\quad \\text{quadrant } \\good{\\text{III}}'] }],
      lines: [
        { say: 'Step one. 7 pi over 6 is pi plus pi over 6: half a turn, and then a little more.', show: [...BASE, 'm.0'] },
        { say: 'Half a turn brings the arm to the negative x-axis. A little more takes it below, into quadrant three.', show: ['uc.u-arm', 'uc.u-arc'], focus: 'uc.u-arm' },
      ],
    },
    {
      chapter: 'Step 2: Reference angle',
      layout: 'center',
      main: [circle(430), { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{7\\pi}{6} - \\pi = \\good{\\dfrac{\\pi}{6}}'] }],
      lines: [
        { say: 'Step two. The arm is past the negative x-axis by 7 pi over 6, minus pi.', show: [...BASE, 'uc.u-arm', 'uc.u-arc', 'm.0'] },
        { say: 'That is pi over 6, so the reference angle is pi over 6, or 30 degrees.', show: 'uc.ref', focus: 'uc.ref' },
      ],
    },
    {
      chapter: 'Step 3: Sine and cosine',
      layout: 'center',
      main: [circle(420), { kind: 'math', id: 'm', size: 'md', lines: ['\\cos\\dfrac{7\\pi}{6} = \\good{-\\dfrac{\\sqrt{3}}{2}}, \\quad \\sin\\dfrac{7\\pi}{6} = \\good{-\\dfrac{1}{2}}'] }],
      lines: [
        { say: 'Step three. For pi over 6, the cosine is root 3 over 2, and the sine is one half.', show: [...BASE, 'uc.u-arm', 'uc.u-arc', 'uc.ref'] },
        { say: 'In quadrant three, the point is to the left of the y-axis and below the x-axis, so both are negative.', show: ['uc.u-tri', 'uc.u-pts'], focus: 'uc.u-pts' },
        { say: 'So the cosine of 7 pi over 6 is negative root 3 over 2, and the sine is negative one half.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\left(-\\dfrac{\\sqrt{3}}{2}\\right)^2 + \\left(-\\dfrac{1}{2}\\right)^2 = \\dfrac{3}{4} + \\dfrac{1}{4} = 1 \\ \\checkmark', '\\dfrac{7\\pi}{6} = 210^\\circ, \\quad \\sin 210^\\circ = {-0.5} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The point must be on the unit circle, so its coordinates squared must add to 1. Three quarters plus one quarter is 1.', show: 'm.0' },
        { say: 'And 7 pi over 6 is 210 degrees. A calculator gives the sine of 210 degrees as negative 0.5. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\sin\\dfrac{7\\pi}{6} = \\dfrac{1}{2}$', 'in quadrant III, sine and cosine are both **negative**'],
            ['$\\sin\\dfrac{7\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$', 'swapped: for $\\dfrac{\\pi}{6}$, $\\sin = \\dfrac{1}{2}$ and $\\cos = \\dfrac{\\sqrt{3}}{2}$'],
            ['reference angle $\\dfrac{7\\pi}{6}$', 'it is the **acute** angle to the $x$-axis: $\\dfrac{\\pi}{6}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not forget the signs. In quadrant three, sine and cosine are both negative.' },
        { say: 'Do not swap them. For pi over 6, the sine is one half and the cosine is root 3 over 2.' },
        { say: 'And the reference angle is always acute, measured to the x-axis. It is pi over 6, not 7 pi over 6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The terminal arm of $\\theta = \\dfrac{2\\pi}{3}$ meets the unit circle at which point?',
          choices: ['$\\left(\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)$', '$\\left(-\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)$', '$\\left(-\\dfrac{1}{2}, -\\dfrac{\\sqrt{3}}{2}\\right)$', '$\\left(-\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)$'],
          answer: 3,
          working: '$\\dfrac{2\\pi}{3}$ is in quadrant II with reference angle $\\dfrac{\\pi}{3}$: $\\cos$ is $-\\dfrac{1}{2}$ and $\\sin$ is $\\dfrac{\\sqrt{3}}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The terminal arm of theta equals 2 pi over 3 meets the unit circle at which point? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '2 pi over 3 is in quadrant two, with reference angle pi over 3. The cosine is negative one half and the sine is positive root 3 over 2: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The arm meets the unit circle at $(\\cos\\theta, \\sin\\theta)$', 'The **reference angle** gives the sizes', 'The **quadrant** gives the signs', 'Check: $\\cos^2\\theta + \\sin^2\\theta = 1$'] }],
      lines: [
        { say: 'Here is what to remember. The terminal arm meets the unit circle at cos theta, sin theta.', show: 'sum.0' },
        { say: 'The reference angle gives the sizes of the sine and cosine.', show: 'sum.1' },
        { say: 'The quadrant gives their signs.', show: 'sum.2' },
        { say: 'And check that the coordinates squared add to 1. For more on the unit circle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
