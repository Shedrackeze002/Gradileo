import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 3.1 (the sine law). The question is an exercise from OpenStax
// Precalculus 2e, word for word apart from "For the following exercises," (section 8.1, Non-right
// Triangles: Law of Sines, CC BY-NC-SA 4.0): with α = 35°, γ = 73° and c = 20, β = 72°,
// a = 20 sin 35° / sin 73° ≈ 12.0 and b = 20 sin 72° / sin 73° ≈ 19.9.

type Stage = 'given' | 'beta' | 'all';

/** The triangle to scale: A at the bottom left (α = 35°), B at the bottom right (β = 72°), C at the top (γ = 73°). */
const tri = (stage: Stage, height = 460) => {
  const t = triangle({
    A: [0, 0],
    B: [20, 0],
    C: [16.29, 11.41],
    names: ['A', 'B', 'C'],
    angles: { A: '\\alpha = 35^\\circ', B: stage === 'given' ? '\\beta' : '\\beta = 72^\\circ', C: '\\gamma = 73^\\circ' },
    sides: { AB: 'c = 20', BC: stage === 'all' ? 'a \\approx 12.0' : 'a', CA: stage === 'all' ? 'b \\approx 19.9' : 'b' },
  });
  const dist: Record<string, number> = { aA: 150, aB: 135, aC: 100 };
  return figure('tri', [{ ...t, items: t.items.map((it) => (it.kind === 'angle' && dist[it.id] ? { ...it, labelDist: dist[it.id] } : it)) }], height);
};

const SHAPE = ['tri.shape', 'tri.names'];

const QUESTION =
  'Assume α is opposite side a, β is opposite side b, and γ is opposite side c. Solve each triangle, if possible. Round each answer to the nearest tenth. α = 35°, γ = 73°, c = 20';

const video: Explainer = {
  id: 'xq-m202-3-1',
  lessonId: '',
  exam: {
    lesson: 'm202-3-1',
    source: 'OpenStax, Precalculus 2e, Exercise in section 8.1, Non-right Triangles: Law of Sines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/8-1-non-right-triangles-law-of-sines',
    question: QUESTION,
  },
  title: 'Exam Question: Solve the Triangle With α = 35°, γ = 73°, c = 20 (The Sine Law)',
  thumbnailTitle: 'Solve the Triangle',
  thumbnail: 'tri',
  summary:
    'A real test question, solved one small step at a time: solve the triangle with α = 35°, γ = 73° and c = 20, to the nearest tenth. We find β = 72° from the angle sum, then use the sine law with the pair c and γ to find a ≈ 12.0 and b ≈ 19.9. Then we check that the longest side is opposite the largest angle and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Triangle', subtitle: 'The sine law, step by step' }],
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
          prompt: 'Assume $\\alpha$ is opposite side $a$, $\\beta$ is opposite side $b$, and $\\gamma$ is opposite side $c$. Solve each triangle, if possible. Round each answer to the nearest tenth. $\\alpha = 35^\\circ$, $\\gamma = 73^\\circ$, $c = 20$',
          answer: '$\\beta = 72^\\circ$, $a \\approx 12.0$, $b \\approx 19.9$',
          working: '$\\beta = 180^\\circ - 35^\\circ - 73^\\circ$; then $\\dfrac{a}{\\sin 35^\\circ} = \\dfrac{b}{\\sin 72^\\circ} = \\dfrac{20}{\\sin 73^\\circ}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Assume alpha is opposite side "a", beta is opposite side b, and gamma is opposite side c. Solve each triangle, if possible. Round each answer to the nearest tenth.' },
        { say: 'Alpha is 35 degrees, gamma is 73 degrees, and c is 20.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 700,
      left: [tri('given')],
      right: [{ kind: 'text', id: 't', size: 'md', md: '**Solve** the triangle: find every part we do not know, $\\beta$, $a$ and $b$.' }],
      lines: [
        { say: 'Here is the triangle, drawn to scale. Alpha, at corner "A", is 35 degrees. Gamma, at corner C, is 73 degrees. And side c, opposite gamma, is 20.', show: [...SHAPE, 'tri.aA', 'tri.aC', 'tri.AB'] },
        { say: 'To solve a triangle means to find every part we do not know. Here, that is the angle beta, and the sides "a" and b.', show: ['tri.aB', 'tri.BC', 'tri.CA', 't'], focus: ['tri.aB', 'tri.BC', 'tri.CA'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'key', title: 'The sine law', md: '$\\dfrac{a}{\\sin \\alpha} = \\dfrac{b}{\\sin \\beta} = \\dfrac{c}{\\sin \\gamma}$: each side over the sine of its **opposite** angle.' },
        { kind: 'callout', id: 'sum', tone: 'definition', title: 'The angle sum', md: 'The angles of a triangle add to $180^\\circ$.' },
      ],
      lines: [
        { say: 'Here is what we need. The sine law says that each side, divided by the sine of the angle opposite it, gives the same number for all three pairs.', show: 'law' },
        { say: 'To use it, we need one complete pair: a side and its opposite angle. Here we have one: c is 20, and gamma is 73 degrees.' },
        { say: 'And the three angles of a triangle add to 180 degrees.', show: 'sum' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $\\beta$ from the **angle sum**', 'Find $a$ with the sine law and the pair $c$, $\\gamma$', 'Find $b$ the same way'] }],
      lines: [
        { say: 'Here is the plan. First, find beta from the angle sum.', show: 'plan.0' },
        { say: 'Second, find side "a" with the sine law, using the complete pair c and gamma.', show: 'plan.1' },
        { say: 'Third, find side b the same way.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The third angle',
      layout: 'split',
      leftWidth: 700,
      left: [tri('beta')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\beta = 180^\\circ - 35^\\circ - 73^\\circ', '\\beta = \\good{72^\\circ}'] }],
      lines: [
        { say: 'Step one. The angles add to 180 degrees, so beta is 180, minus 35, minus 73.', show: [...SHAPE, 'tri.aA', 'tri.aC', 'tri.AB', 'm.0'] },
        { say: 'That is 72 degrees.', show: ['m.1', 'tri.aB'], focus: ['m.1', 'tri.aB'] },
      ],
    },
    {
      chapter: 'Step 2: Side a',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{\\sin 35^\\circ} = \\dfrac{20}{\\sin 73^\\circ}', 'a = \\dfrac{20 \\sin 35^\\circ}{\\sin 73^\\circ}', 'a = \\dfrac{20(0.5736)}{0.9563} \\approx \\good{12.0}'] }],
      lines: [
        { say: 'Step two. Side "a" is opposite alpha, which is 35 degrees. Set "a" over sine 35 degrees equal to 20 over sine 73 degrees.', show: 'm.0' },
        { say: 'Multiply both sides by sine 35 degrees: "a" equals 20 sine 35 degrees, divided by sine 73 degrees.', show: 'm.1' },
        { say: 'Sine 35 degrees is about 0.5736, and sine 73 degrees is about 0.9563. That gives "a" is about 12.0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Side b',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{b}{\\sin 72^\\circ} = \\dfrac{20}{\\sin 73^\\circ}', 'b = \\dfrac{20 \\sin 72^\\circ}{\\sin 73^\\circ}', 'b = \\dfrac{20(0.9511)}{0.9563} \\approx \\good{19.9}'] }],
      lines: [
        { say: 'Step three. Side b is opposite beta, which is 72 degrees. Again use the complete pair: b over sine 72 degrees equals 20 over sine 73 degrees.', show: 'm.0' },
        { say: 'So b equals 20 sine 72 degrees, divided by sine 73 degrees.', show: 'm.1' },
        { say: 'Sine 72 degrees is about 0.9511, so b is about 19.9.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 700,
      left: [tri('all')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['35^\\circ < 72^\\circ < 73^\\circ', '12.0 < 19.9 < 20 \\ \\checkmark'] }],
      lines: [
        { say: 'Here is the solved triangle: beta is 72 degrees, "a" is about 12.0, and b is about 19.9.', show: [...SHAPE, 'tri.aA', 'tri.aB', 'tri.aC', 'tri.AB', 'tri.BC', 'tri.CA'] },
        { say: 'Let us check. The angles in order are 35, 72 and 73 degrees.', show: 'm.0' },
        { say: 'The sides opposite them are 12.0, 19.9 and 20, in the same order. The smallest side is opposite the smallest angle, and the largest side is opposite the largest angle, as it must be.', show: 'm.1', focus: 'm.1' },
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
            ['$\\sin 35 \\approx -0.43$', 'the calculator is in **radians**: switch to **degrees**'],
            ['$a = \\dfrac{20 \\sin 73^\\circ}{\\sin 35^\\circ}$', 'the ratio is **upside down**: keep side over sine of its angle'],
            ['stopping at $a$', 'solve **every** part: $\\beta$, $a$ and $b$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'If sine 35 comes out negative, your calculator is in radians. Switch it to degrees.' },
        { say: 'Keep each side over the sine of its own opposite angle. Flipping one ratio gives "a" is about 33.3, which is far too long.' },
        { say: 'And solving the triangle means finding every missing part: beta, "a" and b.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\triangle ABC$, $\\angle A = 50^\\circ$, $\\angle B = 60^\\circ$ and $a = 10$. Find $b$ to the nearest tenth.',
          choices: ['$11.3$', '$8.8$', '$12.6$', '$7.7$'],
          answer: 0,
          working: '$b = \\dfrac{10 \\sin 60^\\circ}{\\sin 50^\\circ} = \\dfrac{8.660}{0.766} \\approx 11.3$',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle "A" B C, angle "A" is 50 degrees, angle B is 60 degrees, and side "a" is 10. Find b to the nearest tenth. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'b over sine 60 degrees equals 10 over sine 50 degrees, so b is 10 sine 60 degrees divided by sine 50 degrees, which is about 11.3: choice A. Choice B, 8.8, comes from flipping the ratio.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find a missing angle with the **angle sum**', 'Use a **complete pair**: a side and its opposite angle', 'Each side over the sine of its **opposite** angle', 'Check: longest side opposite the **largest** angle'] }],
      lines: [
        { say: 'Here is what to remember. Find a missing angle with the angle sum.', show: 'sum.0' },
        { say: 'Use the sine law with a complete pair: a side and the angle opposite it.', show: 'sum.1' },
        { say: 'Keep each side over the sine of its own opposite angle.', show: 'sum.2' },
        { say: 'And check that the longest side is opposite the largest angle. For more on the sine law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
