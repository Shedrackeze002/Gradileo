import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

// Exam question for Math 30-1 lesson 4.4 (introduction to trigonometric equations). The question
// is an exercise from OpenStax Precalculus 2e, word for word (section 7.5, Solving Trigonometric
// Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it. cos θ = √2/2 has
// reference angle π/4, and cosine is positive in quadrants I and IV, so θ = π/4 and 7π/4, as in
// the book's answer. Both points of the unit circle with x = √2/2 are drawn.

/** The line x = √2/2 (`xline`), through the two points of the circle where cos θ = √2/2. */
const xline: Part = { points: {}, items: [{ kind: 'line', id: 'xline', from: 'u-p45', to: 'u-p315', tone: 'adj', dashed: true, weight: 3, label: 'x = \\tfrac{\\sqrt{2}}{2}', labelSide: 'right', labelAt: 0.3 }] };

const circle = (height = 440) =>
  figure(
    'uc',
    [
      unitCircle({ name: 'u', points: [{ deg: 45, tex: '\\tfrac{\\pi}{4}', tone: 'good' }, { deg: 315, tex: '\\tfrac{7\\pi}{4}', tone: 'good' }] }),
      xline,
    ],
    height,
  );

const QUESTION = 'Solve exactly on [0, 2π). 2cos θ = √2';

const video: Explainer = {
  id: 'xq-m301-4-4',
  lessonId: '',
  exam: {
    lesson: 'm301-4-4',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.5, Solving Trigonometric Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-5-solving-trigonometric-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 2cos θ = √2 on [0, 2π) (Introduction to Trigonometric Equations)',
  thumbnailTitle: 'Solve 2cos θ = √2',
  thumbnail: 'uc',
  summary:
    'A real test question, solved one small step at a time: solve 2cos θ = √2 exactly on [0, 2π). We get cos θ = √2/2, so the reference angle is π/4, and cosine is positive in quadrants I and IV, which gives θ = π/4 and θ = 7π/4. Then we check on the unit circle and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 2cos θ = √2', subtitle: 'Introduction to trigonometric equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about trigonometric equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve exactly on $[0, 2\\pi)$. $2\\cos\\theta = \\sqrt{2}$',
          answer: '$\\theta = \\dfrac{\\pi}{4}$ and $\\theta = \\dfrac{7\\pi}{4}$',
          working: '$\\cos\\theta = \\dfrac{\\sqrt{2}}{2}$: reference angle $\\dfrac{\\pi}{4}$, in quadrants I and IV.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve exactly on the interval from 0 to 2 pi, including 0 but not 2 pi. 2 cos theta equals root 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find **every** angle in **one full turn**, from $0$ up to (not including) $2\\pi$, that makes the equation true. **Exactly** means in terms of $\\pi$, not decimals.' }],
      lines: [
        { say: 'We need every angle in one full turn, from 0 up to but not including 2 pi, that makes the equation true.', show: 't' },
        { say: 'Exactly means the answers are written with pi, not as decimals from a calculator.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'cos', tone: 'key', title: 'Cosine on the unit circle', md: '$\\cos\\theta$ is the **$x$-coordinate** of the point on the unit circle. It is **positive** in quadrants **I** and **IV**.' },
        { kind: 'callout', id: 'two', tone: 'tip', title: 'Usually two answers', md: 'In one turn, most values of $\\cos\\theta$ happen at **two** angles with the same reference angle.' },
      ],
      lines: [
        { say: 'Here is what we need. Cos theta is the x-coordinate of the point on the unit circle, so it is positive on the right side: quadrants one and four.', show: 'cos' },
        { say: 'And in one full turn, most values of cosine happen at two different angles, with the same reference angle.', show: 'two' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Isolate** $\\cos\\theta$', 'Find the **reference angle**', 'Find **every** quadrant where $\\cos\\theta > 0$'] }],
      lines: [
        { say: 'Here is the plan. First, get cos theta on its own.', show: 'plan.0' },
        { say: 'Second, find the reference angle.', show: 'plan.1' },
        { say: 'Third, find every quadrant where cosine is positive, and the angle in each.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Isolate cos θ',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\cos\\theta = \\sqrt{2}', '\\cos\\theta = \\good{\\dfrac{\\sqrt{2}}{2}}'] }],
      lines: [
        { say: 'Step one. Start with 2 cos theta equals root 2.', show: 'm.0' },
        { say: 'Divide both sides by 2: cos theta equals root 2 over 2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Reference angle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}', '\\text{reference angle } = \\good{\\dfrac{\\pi}{4}}'] }],
      lines: [
        { say: 'Step two. Root 2 over 2 is a special value: it is the cosine of pi over 4, or 45 degrees.', show: 'm.0' },
        { say: 'So the reference angle is pi over 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Both quadrants',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{I: } \\theta = \\good{\\dfrac{\\pi}{4}}', '\\text{IV: } \\theta = 2\\pi - \\dfrac{\\pi}{4} = \\good{\\dfrac{7\\pi}{4}}'] }],
      lines: [
        { say: 'Step three. Cosine is positive in quadrant one, where the angle is just the reference angle, pi over 4.', show: 'm.0' },
        { say: 'It is also positive in quadrant four, where the angle is a full turn minus the reference angle: 2 pi minus pi over 4, which is 7 pi over 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [circle(430), { kind: 'math', id: 'm', size: 'md', lines: ['2\\cos\\dfrac{7\\pi}{4} = 2 \\cdot \\dfrac{\\sqrt{2}}{2} = \\sqrt{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on the unit circle. Cos theta is the x-coordinate, so we want the points where x is root 2 over 2.', show: ['uc.u-axes', 'uc.u-circle', 'uc.u-one', 'uc.xline'] },
        { say: 'The line x equals root 2 over 2 cuts the circle at exactly two points: at pi over 4 and at 7 pi over 4. So there are two answers.', show: 'uc.u-pts', focus: 'uc.u-pts' },
        { say: 'And 2 times the cosine of 7 pi over 4 is 2 times root 2 over 2, which is root 2. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['only $\\dfrac{\\pi}{4}$', 'the question asks for **every** angle in $[0, 2\\pi)$'],
            ['$\\dfrac{3\\pi}{4}$', 'cosine is **negative** in quadrant II'],
            ['$-\\dfrac{\\pi}{4}$', 'it is not in $[0, 2\\pi)$: use $\\dfrac{7\\pi}{4}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not stop at pi over 4. The calculator gives one angle, but the question asks for every angle in the interval.' },
        { say: '3 pi over 4 has the right reference angle, but it is in quadrant two, where cosine is negative.' },
        { say: 'And negative pi over 4 is the right direction, but it is outside the interval. Go round the other way: 7 pi over 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $2\\sin\\theta = 1$ exactly on $[0, 2\\pi)$.',
          choices: ['$\\dfrac{\\pi}{6}$ only', '$\\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$', '$\\dfrac{\\pi}{3}$ and $\\dfrac{2\\pi}{3}$', '$\\dfrac{\\pi}{6}$ and $\\dfrac{11\\pi}{6}$'],
          answer: 1,
          working: '$\\sin\\theta = \\dfrac{1}{2}$: reference angle $\\dfrac{\\pi}{6}$, and sine is positive in quadrants I and II, so $\\dfrac{\\pi}{6}$ and $\\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 2 sin theta equals 1 exactly, from 0 up to 2 pi. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Sin theta is one half, so the reference angle is pi over 6. Sine is positive in quadrants one and two, which gives pi over 6 and 5 pi over 6: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Isolate** the trig ratio', 'Find the **reference angle**', 'Use the **signs** to find every quadrant', 'Keep answers inside the **interval**'] }],
      lines: [
        { say: 'Here is what to remember. Isolate the trig ratio first.', show: 'sum.0' },
        { say: 'Find the reference angle from the special values.', show: 'sum.1' },
        { say: 'Use the signs to find every quadrant the answer can be in.', show: 'sum.2' },
        { say: 'And keep every answer inside the interval. For more on trigonometric equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
