import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 1.2 (trigonometry for calculus). The question is an exercise
// from OpenStax Calculus Volume 1 (section 1.3, Trigonometric Functions, CC BY-NC-SA 4.0): the
// book's instruction "For the following exercises, solve the trigonometric equations on the
// interval 0 ≤ θ < 2π" is put with the one equation it asks about. sin θ (2 cos θ − 1) = 0, so
// sin θ = 0 (θ = 0, π) or cos θ = 1/2 (θ = π/3, 5π/3), as in the book's answers.

const QUESTION = 'Solve the trigonometric equation on the interval 0 ≤ θ < 2π: 2cos θ sin θ = sin θ.';

const PI = Math.PI;
const g = plane({ x: [0, 2 * PI], y: [-1.5, 1.5], xStep: PI / 3, yStep: 0.5, every: 1, width: 12, height: 5.5, xTex: piTex, xName: '\\theta' });

/** y = 2 cos θ sin θ and y = sin θ, meeting at the four answers. */
const graph = (height = 440) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'left', f: (t) => 2 * Math.cos(t) * Math.sin(t), from: 0, to: 2 * PI, tone: 'adj' }),
      plot(g, { id: 'right', f: (t) => Math.sin(t), from: 0, to: 2 * PI, tone: 'opp' }),
      dots(g, [
        { id: 'p0', x: 0, y: 0, tone: 'theta' },
        { id: 'p1', x: PI / 3, y: Math.sqrt(3) / 2, tone: 'theta' },
        { id: 'p2', x: PI, y: 0, tone: 'theta' },
        { id: 'p3', x: (5 * PI) / 3, y: -Math.sqrt(3) / 2, tone: 'theta' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-1-2',
  lessonId: '',
  exam: {
    lesson: 'm31-1-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 1.3, Trigonometric Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/1-3-trigonometric-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 2cos θ sin θ = sin θ on [0, 2π) (Trigonometric Equations)',
  thumbnailTitle: 'Do Not Divide by sin θ!',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: solve 2cos θ sin θ = sin θ on the interval 0 ≤ θ < 2π. Instead of dividing by sin θ, which loses answers, we move everything to one side and factor: sin θ (2cos θ − 1) = 0. So sin θ = 0, giving θ = 0 and π, or cos θ = 1/2, giving θ = π/3 and 5π/3. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Do Not Divide by sin θ!', subtitle: 'Trigonometric equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about trigonometric equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve the trigonometric equation on the interval $0 \\le \\theta < 2\\pi$: $2\\cos\\theta\\sin\\theta = \\sin\\theta$.',
          answer: '$\\theta = 0, \\dfrac{\\pi}{3}, \\pi, \\dfrac{5\\pi}{3}$',
          working: '$\\sin\\theta\\,(2\\cos\\theta - 1) = 0$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Solve the trigonometric equation on the interval from 0 up to, but not including, 2 pi: 2 cos theta sin theta equals sin theta.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['0 \\le \\theta < 2\\pi'] },
        { kind: 'text', id: 't', size: 'md', md: 'Find **every** angle in **one full turn** that makes the two sides equal. $2\\pi$ itself is left out, because it is the same angle as $0$.' },
      ],
      lines: [
        { say: 'Here is what it is asking. Theta goes from 0 up to 2 pi: one full turn of the unit circle.', show: 'm' },
        { say: 'We need every angle in that turn that makes the two sides equal. 2 pi itself is left out, because it is the same angle as 0.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['AB = 0 \\implies A = 0 \\ \\text{or} \\ B = 0'] },
        { kind: 'callout', id: 'div', tone: 'mistake', title: 'Never divide by the variable', md: 'Dividing both sides by $\\sin\\theta$ throws away every angle where $\\sin\\theta = 0$. **Move everything to one side and factor** instead.' },
      ],
      lines: [
        { say: 'Here is what we need. If a product is 0, then one of its factors is 0.', show: 'f' },
        { say: 'And never divide by something that could be 0. Dividing both sides by sin theta throws away every angle where sin theta is 0. Move everything to one side and factor instead.', show: 'div' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Move everything to **one side**', '**Factor** out $\\sin\\theta$', 'Set **each factor** to $0$ and solve on the unit circle'] }],
      lines: [
        { say: 'Here is the plan. Move everything to one side.', show: 'plan.0' },
        { say: 'Factor out sin theta.', show: 'plan.1' },
        { say: 'Then set each factor to 0, and find the angles on the unit circle.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\cos\\theta\\sin\\theta = \\sin\\theta', '2\\cos\\theta\\sin\\theta - \\sin\\theta = 0', '\\good{\\sin\\theta\\,(2\\cos\\theta - 1) = 0}'] }],
      lines: [
        { say: 'Step one. Start with the equation.', show: 'm.0' },
        { say: 'Subtract sin theta from both sides, so the right side is 0.', show: 'm.1' },
        { say: 'Both terms have sin theta, so factor it out: sin theta times the quantity 2 cos theta minus 1 equals 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The first factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sin\\theta = 0', '\\theta = \\good{0}, \\ \\good{\\pi}'] }],
      lines: [
        { say: 'Step two. Set the first factor to 0: sin theta equals 0.', show: 'm.0' },
        { say: 'Sine is the height on the unit circle. The height is 0 on the right, at angle 0, and on the left, at angle pi. 2 pi is not in the interval.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The second factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2\\cos\\theta - 1 = 0 \\implies \\cos\\theta = \\dfrac{1}{2}', '\\theta = \\good{\\dfrac{\\pi}{3}}, \\ \\good{2\\pi - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{3}}'] }],
      lines: [
        { say: 'Step three. Set the second factor to 0. Add 1 and divide by 2: cos theta equals one half.', show: 'm.0' },
        { say: 'Cosine is one half at pi over 3, in the first quarter. Cosine is also positive in the fourth quarter, at 2 pi minus pi over 3, which is 5 pi over 3. So we have four answers: 0, pi over 3, pi, and 5 pi over 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 720,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Blue: $y = 2\\cos\\theta\\sin\\theta$. Orange: $y = \\sin\\theta$. They cross **four** times in one turn: at $0$, $\\dfrac{\\pi}{3}$, $\\pi$ and $\\dfrac{5\\pi}{3}$.' }],
      lines: [
        { say: 'Let us check on a graph. Here is the left side, 2 cos theta sin theta.', show: ['g.grid', 'g.axes', 'g.left'] },
        { say: 'And here is the right side, sin theta.', show: 'g.right' },
        { say: 'They cross exactly four times in one turn: at 0, pi over 3, pi, and 5 pi over 3. It checks out.', show: ['g.p0', 'g.p1', 'g.p2', 'g.p3', 't'] },
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
            ['Divide by $\\sin\\theta$', 'loses $\\theta = 0$ and $\\theta = \\pi$'],
            ['Only $\\dfrac{\\pi}{3}$', 'cosine is also positive in the **fourth** quarter'],
            ['Include $2\\pi$', 'the interval stops **before** $2\\pi$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing both sides by sin theta gives only two answers. It loses 0 and pi, where sin theta is 0.' },
        { say: 'Cosine is one half twice in a turn, not once. The second angle is in the fourth quarter.' },
        { say: 'And 2 pi is not in the interval, because the interval stops just before it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $2\\sin\\theta\\cos\\theta = \\cos\\theta$ on $0 \\le \\theta < 2\\pi$.',
          choices: ['$\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$', '$\\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$', '$\\dfrac{\\pi}{6}, \\dfrac{\\pi}{2}, \\dfrac{5\\pi}{6}, \\dfrac{3\\pi}{2}$', '$\\dfrac{\\pi}{3}, \\dfrac{\\pi}{2}, \\dfrac{2\\pi}{3}, \\dfrac{3\\pi}{2}$'],
          answer: 2,
          working: '$\\cos\\theta\\,(2\\sin\\theta - 1) = 0$, so $\\cos\\theta = 0$ or $\\sin\\theta = \\dfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 2 sin theta cos theta equals cos theta, from 0 up to 2 pi. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Move cos theta over and factor: cos theta times the quantity 2 sin theta minus 1 equals 0. Cos theta is 0 at pi over 2 and 3 pi over 2, and sin theta is one half at pi over 6 and 5 pi over 6. All four: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Never divide** by a trig function: you lose answers', 'Move everything to one side and **factor**', 'Set **each factor** to $0$', 'Find **every** angle in the interval'] }],
      lines: [
        { say: 'Here is what to remember. Never divide by a trig function, or you lose answers.', show: 'sum.0' },
        { say: 'Move everything to one side and factor.', show: 'sum.1' },
        { say: 'Set each factor to 0.', show: 'sum.2' },
        { say: 'And find every angle in the interval. For more on trigonometry for calculus, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
