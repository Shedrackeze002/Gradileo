import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

// Exam question for Math 30-1 lesson 4.3 (trigonometric ratios). The question is an exercise from
// OpenStax Precalculus 2e, word for word (section 5.3, The Other Trigonometric Functions,
// CC BY-NC-SA 4.0); it is complete on its own, so its set's instruction ("use reference angles
// to evaluate the expression") is left off. cos t = x/r = −1/3 gives x = −1, r = 3 and, in
// quadrant III, y = −2√2, so sin t = −2√2/3, sec t = −3, csc t = −3√2/4, tan t = 2√2 and
// cot t = √2/4, as in the book's answer. The arm is drawn at 180° + cos⁻¹(1/3) ≈ 250.5°.

const DEG = 180 + (Math.acos(1 / 3) * 180) / Math.PI;

/** The angle t in standard position, with the point P(−1, −2√2) and r = 3. */
const fig = (height = 420, y = '?') =>
  figure('sa', [standardAngle({ name: 's', deg: DEG, len: 4, drop: true, point: 'P', sides: { x: '-1', y, r: '3' }, compact: true })], height);

const BASE = ['sa.s-axes', 'sa.s-arm', 'sa.s-arc', 'sa.s-P'];

const QUESTION = 'If cos t = −1/3, and t is in quadrant III, find sin t, sec t, csc t, tan t, cot t.';

const video: Explainer = {
  id: 'xq-m301-4-3',
  lessonId: '',
  exam: {
    lesson: 'm301-4-3',
    source: 'OpenStax, Precalculus 2e, Exercise in section 5.3, The Other Trigonometric Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/5-3-the-other-trigonometric-functions',
    question: QUESTION,
  },
  title: 'Exam Question: All Six Trig Ratios From cos t = −1/3 (Trigonometric Ratios)',
  thumbnailTitle: 'Six Ratios From cos t = −1/3',
  thumbnail: 'sa',
  summary:
    'A real test question, solved one small step at a time: cos t = −1/3 and t is in quadrant III. Find sin t, sec t, csc t, tan t and cot t. We draw t with x = −1 and r = 3, use the Pythagorean theorem to get y = −2√2, and read off all five ratios. Then we check and look at the sign traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Six Ratios From cos t = −1/3', subtitle: 'Trigonometric ratios, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about trigonometric ratios. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If $\\cos t = -\\dfrac{1}{3}$, and $t$ is in quadrant III, find $\\sin t$, $\\sec t$, $\\csc t$, $\\tan t$, $\\cot t$.',
          answer: '$\\sin t = -\\dfrac{2\\sqrt{2}}{3}$, $\\sec t = -3$, $\\csc t = -\\dfrac{3\\sqrt{2}}{4}$, $\\tan t = 2\\sqrt{2}$, $\\cot t = \\dfrac{\\sqrt{2}}{4}$',
          working: '$x = -1$, $r = 3$, so $y = -\\sqrt{9 - 1} = -2\\sqrt{2}$ in quadrant III.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'If cos t equals negative one third, and t is in quadrant three, find sin t, sec t, csc t, tan t, and cot t.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We know **one** ratio and the **quadrant**. From those we can find a point on the terminal arm, and then **every** ratio.' }],
      lines: [
        { say: 'We know one ratio, the cosine, and which quadrant t is in.', show: 't' },
        { say: 'That is enough to find a point on the terminal arm, and from that point, every other ratio.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rat', tone: 'key', title: 'Ratios from a point', md: 'For $P(x, y)$ on the arm, $r = \\sqrt{x^2 + y^2}$: $\\sin t = \\dfrac{y}{r}$, $\\cos t = \\dfrac{x}{r}$, $\\tan t = \\dfrac{y}{x}$.' },
        { kind: 'callout', id: 'rec', tone: 'definition', title: 'Reciprocal ratios', md: '$\\csc t = \\dfrac{r}{y}$, $\\sec t = \\dfrac{r}{x}$, $\\cot t = \\dfrac{x}{y}$: each is $1$ over another ratio.' },
      ],
      lines: [
        { say: 'Here is what we need. For a point P, x, y, on the terminal arm, r is the distance to the origin. Then sine is y over r, cosine is x over r, and tangent is y over x.', show: 'rat' },
        { say: 'The reciprocal ratios flip these. Cosecant is r over y, secant is r over x, and cotangent is x over y.', show: 'rec' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read $x$ and $r$ from $\\cos t = \\dfrac{x}{r}$', 'Find $y$, with the **sign** for quadrant III', 'Write **all five** ratios'] }],
      lines: [
        { say: 'Here is the plan. First, read x and r from the cosine.', show: 'plan.0' },
        { say: 'Second, find y, with the right sign for quadrant three.', show: 'plan.1' },
        { say: 'Third, write all five ratios.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Draw t',
      layout: 'center',
      main: [fig(400), { kind: 'math', id: 'm', size: 'md', lines: ['\\cos t = \\dfrac{x}{r} = \\dfrac{-1}{3}: \\quad x = {-1}, \\ r = 3'] }],
      lines: [
        { say: 'Step one. Cosine is x over r, so take x equals negative 1 and r equals 3. r is a distance, so it is always positive.', show: 'm.0' },
        { say: 'Draw t in quadrant three, with the point P on its arm.', show: BASE, focus: 'sa.s-arm' },
        { say: 'Drop a line to the x-axis to make a right triangle: x is negative 1, and r is 3.', show: ['sa.s-tri', 'sa.s-x', 'sa.s-r'], focus: 'sa.s-tri' },
      ],
    },
    {
      chapter: 'Step 2: Find y',
      layout: 'center',
      main: [fig(380, '-2\\sqrt{2}'), { kind: 'math', id: 'm', size: 'md', lines: ['({-1})^2 + y^2 = 3^2 \\ \\Rightarrow \\ y^2 = 8 \\ \\Rightarrow \\ y = \\good{-2\\sqrt{2}}'] }],
      lines: [
        { say: 'Step two. Use the Pythagorean theorem: negative 1 squared, plus y squared, equals 3 squared. So y squared is 8.', show: [...BASE, 'sa.s-tri', 'sa.s-x', 'sa.s-r', 'm.0'] },
        { say: 'The square root of 8 is 2 root 2. In quadrant three, the point is below the x-axis, so y is negative: negative 2 root 2.', show: 'sa.s-y', focus: 'sa.s-y' },
      ],
    },
    {
      chapter: 'Step 3: All five ratios',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\sin t = \\dfrac{y}{r} = \\good{-\\dfrac{2\\sqrt{2}}{3}}, \\qquad \\csc t = \\dfrac{r}{y} = \\dfrac{3}{{-2\\sqrt{2}}} = \\good{-\\dfrac{3\\sqrt{2}}{4}}',
            '\\sec t = \\dfrac{r}{x} = \\dfrac{3}{{-1}} = \\good{-3}',
            '\\tan t = \\dfrac{y}{x} = \\dfrac{{-2\\sqrt{2}}}{{-1}} = \\good{2\\sqrt{2}}, \\qquad \\cot t = \\dfrac{x}{y} = \\dfrac{1}{2\\sqrt{2}} = \\good{\\dfrac{\\sqrt{2}}{4}}',
          ],
        },
      ],
      lines: [
        { say: 'Step three. Sine is y over r: negative 2 root 2 over 3. Cosecant flips it: 3 over negative 2 root 2. Multiply top and bottom by root 2 to get negative 3 root 2 over 4.', show: 'm.0' },
        { say: 'Secant is r over x: 3 over negative 1, which is negative 3.', show: 'm.1' },
        { say: 'Tangent is y over x. Two negatives make a positive: 2 root 2. Cotangent flips it: 1 over 2 root 2, which is root 2 over 4.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sin^2 t + \\cos^2 t = \\dfrac{8}{9} + \\dfrac{1}{9} = 1 \\ \\checkmark', '\\text{quadrant III: only } \\tan \\text{ and } \\cot \\text{ positive} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Sine squared plus cosine squared must be 1. 8 ninths plus 1 ninth is 1.', show: 'm.0' },
        { say: 'And in quadrant three, only tangent and its reciprocal, cotangent, are positive. That is just what we found. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$y = 2\\sqrt{2}$', 'in quadrant III the point is **below** the $x$-axis: $y < 0$'],
            ['$\\sec t = -\\dfrac{1}{3}$', 'secant is the **reciprocal** of cosine: $-3$'],
            ['$\\tan t = -2\\sqrt{2}$', '$\\dfrac{\\text{negative}}{\\text{negative}}$ is **positive**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The square root gives a positive number, but in quadrant three the point is below the x-axis, so y is negative.' },
        { say: 'Secant is the reciprocal of cosine, so flip negative one third to get negative 3.' },
        { say: 'And tangent is a negative over a negative, which is positive.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'If $\\sin\\theta = \\dfrac{3}{5}$ and $\\theta$ is in quadrant II, what is $\\tan\\theta$?',
          choices: ['$-\\dfrac{3}{4}$', '$\\dfrac{3}{4}$', '$-\\dfrac{4}{3}$', '$-\\dfrac{4}{5}$'],
          answer: 0,
          working: '$y = 3$, $r = 5$, so $x = -4$ in quadrant II, and $\\tan\\theta = \\dfrac{y}{x} = -\\dfrac{3}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. If sin theta is 3 fifths and theta is in quadrant two, what is tan theta? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'y is 3 and r is 5, so x is 4 in size, and negative in quadrant two. Tangent is y over x: negative 3 quarters, choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read $x$, $y$ or $r$ from the given ratio', 'Use $x^2 + y^2 = r^2$ for the missing one', 'The **quadrant** gives the signs; $r > 0$', 'Reciprocals: $\\csc = \\dfrac{r}{y}$, $\\sec = \\dfrac{r}{x}$, $\\cot = \\dfrac{x}{y}$'] }],
      lines: [
        { say: 'Here is what to remember. Read two of x, y and r from the ratio you are given.', show: 'sum.0' },
        { say: 'Use x squared plus y squared equals r squared to find the third.', show: 'sum.1' },
        { say: 'The quadrant gives the signs of x and y, and r is always positive.', show: 'sum.2' },
        { say: 'And the reciprocal ratios flip sine, cosine and tangent. For more on trigonometric ratios, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
