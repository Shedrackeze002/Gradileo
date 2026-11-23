import type { DiagramItem, Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 8.3 (the fundamental theorem of calculus). The question is an
// exercise from OpenStax Calculus Volume 1 (section 5.3, The Fundamental Theorem of Calculus, CC
// BY-NC-SA 4.0): the book's instruction "In the following exercises, use a calculator to estimate
// the area under the curve by computing T10, the average of the left- and right-endpoint Riemann
// sums using N = 10 rectangles. Then, using the Fundamental Theorem of Calculus, Part 2, determine
// the exact area." is put with the one function it asks about, without the "[T]" mark.
// With Δx = 0.8, L10 ≈ 228.036 and R10 ≈ 293.636, so T10 ≈ 260.836; F(x) = (2/3)x^(3/2) + x³/3
// gives F(9) − F(1) = 261 − 1 = 260, as in the book's answers.

const QUESTION =
  'Use a calculator to estimate the area under the curve by computing T₁₀, the average of the left- and right-endpoint Riemann sums using N = 10 rectangles. Then, using the Fundamental Theorem of Calculus, Part 2, determine the exact area. y = √x + x² over [1, 9]';

const F = (x: number) => Math.sqrt(x) + x * x;
const g = plane({ x: [0, 10], y: [0, 100], xStep: 1, yStep: 10, every: 2, width: 8, height: 7 });

/** The area under the curve from 1 to 9, shaded. */
const area = () => {
  const ids: string[] = [];
  const points: Record<string, [number, number]> = { A0: g.map(1, 0), A1: g.map(9, 0) };
  for (let i = 0; i <= 40; i++) {
    const x = 9 - (8 * i) / 40;
    points[`c${i}`] = g.map(x, F(x));
    ids.push(`c${i}`);
  }
  const items: DiagramItem[] = [{ kind: 'region', id: 'area', points: ['A0', 'A1', ...ids], tone: 'theta', shade: 0.3 } as DiagramItem];
  return { points, items };
};

const graph = (height = 460) => figure('g', [g, area(), plot(g, { id: 'f', f: F, from: 0, to: 9.6, tone: 'adj' })], height);

const video: Explainer = {
  id: 'xq-m31-8-3',
  lessonId: '',
  exam: {
    lesson: 'm31-8-3',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 5.3, The Fundamental Theorem of Calculus',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus',
    question: QUESTION,
  },
  title: 'Exam Question: The Exact Area Under y = √x + x² from 1 to 9 (The Fundamental Theorem)',
  thumbnailTitle: 'From Rectangles to the Exact Area',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: for y = √x + x² over [1, 9], estimate the area with T₁₀, the average of the left and right Riemann sums with 10 rectangles, then find the exact area with the Fundamental Theorem of Calculus, Part 2. With a calculator, L₁₀ ≈ 228.036 and R₁₀ ≈ 293.636, so T₁₀ ≈ 260.836. An antiderivative is F(x) = (2/3)x^(3/2) + x³/3, and F(9) − F(1) = 261 − 1 = 260, the exact area. Then we compare the two and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'From Rectangles to the Exact Area', subtitle: 'The fundamental theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the fundamental theorem of calculus. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use a calculator to estimate the area under the curve by computing $T_{10}$, the average of the left- and right-endpoint Riemann sums using $N = 10$ rectangles. Then, using the Fundamental Theorem of Calculus, Part 2, determine the exact area. $y = \\sqrt{x} + x^2$ over $[1, 9]$',
          answer: '$T_{10} \\approx 260.836$; exact area $= 260$',
          working: '$F(x) = \\tfrac{2}{3}x^{3/2} + \\tfrac{1}{3}x^3$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Use a calculator to estimate the area under the curve with T 10, the average of the left and right Riemann sums with 10 rectangles. Then use the fundamental theorem of calculus, part 2, to find the exact area. The curve is y equals root x plus x squared, from 1 to 9.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'We want the shaded area: first **estimated** with rectangles, then **exactly** with an antiderivative.' }],
      lines: [
        { say: 'Here is the curve.', show: ['g.grid', 'g.axes', 'g.f'] },
        { say: 'We want the area under it from 1 to 9.', show: 'g.area' },
        { say: 'First we estimate it with rectangles. Then we find it exactly, with an antiderivative.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad F\' = f'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The Fundamental Theorem, Part 2', md: 'To find an exact area, find **any** antiderivative $F$, then take **top minus bottom**: $F(b) - F(a)$.' },
      ],
      lines: [
        { say: 'Here is what we need. The integral from "a" to b of f is F of b minus F of "a", where F is any antiderivative of f.', show: 'f' },
        { say: 'So for an exact area, find an antiderivative, and take the value at the top minus the value at the bottom.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['$\\Delta x = 0.8$: find $L_{10}$ and $R_{10}$, then **average**', 'Find an **antiderivative** $F$', 'Exact area $= F(9) - F(1)$'] }],
      lines: [
        { say: 'Here is the plan. With 10 strips, each is 0.8 wide. Find the left and right sums, and average them.', show: 'plan.0' },
        { say: 'Find an antiderivative.', show: 'plan.1' },
        { say: 'Then the exact area is F of 9 minus F of 1.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The estimate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta x = \\dfrac{9 - 1}{10} = 0.8', 'L_{10} \\approx 228.036, \\quad R_{10} \\approx 293.636', 'T_{10} = \\dfrac{228.036 + 293.636}{2} \\approx \\good{260.836}'] }],
      lines: [
        { say: 'Step one. Each strip is 9 minus 1, over 10, which is 0.8 wide.', show: 'm.0' },
        { say: 'With a calculator, the left sum, using x equals 1 up to 8.2, is about 228.036. The right sum, using 1.8 up to 9, is about 293.636.', show: 'm.1' },
        { say: 'The curve is rising, so the left sum is too small and the right sum is too big. Their average, T 10, is about 260.836.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: An antiderivative',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{x} = x^{1/2} \\to \\dfrac{x^{3/2}}{3/2} = \\dfrac{2}{3}x^{3/2}', 'x^2 \\to \\dfrac{x^3}{3}', '\\good{F(x) = \\dfrac{2}{3}x^{3/2} + \\dfrac{1}{3}x^3}'] }],
      lines: [
        { say: 'Step two. Root x is x to the one half. Add 1 to the power, making three halves, and divide by three halves: two thirds x to the three halves.', show: 'm.0' },
        { say: 'x squared becomes x cubed over 3.', show: 'm.1' },
        { say: 'So F of x is two thirds x to the three halves, plus one third x cubed. We do not need a plus C here: it would cancel.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The exact area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F(9) = \\dfrac{2}{3}(27) + \\dfrac{729}{3} = 18 + 243 = 261', 'F(1) = \\dfrac{2}{3} + \\dfrac{1}{3} = 1', '\\int_1^9 \\left(\\sqrt{x} + x^2\\right)dx = 261 - 1 = \\good{260}'] }],
      lines: [
        { say: 'Step three. 9 to the three halves is root 9, cubed, which is 27. So F of 9 is two thirds of 27, which is 18, plus 729 over 3, which is 243. That is 261.', show: 'm.0' },
        { say: 'F of 1 is two thirds plus one third, which is 1.', show: 'm.1' },
        { say: 'Top minus bottom: 261 minus 1. The exact area is 260.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['T_{10} \\approx 260.836 \\ \\text{vs exact } 260', '\\text{off by } 0.836, \\text{ about } 0.3\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us compare. The estimate was 260.836, and the exact area is 260.', show: 'm.0' },
        { say: 'They differ by 0.836, about 0.3 percent. The estimate is a little high, as it should be: straight tops on a curve that bends upward sit slightly above it. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\sqrt{x} \\to \\dfrac{1}{2\\sqrt{x}}$', 'that is the **derivative**: we need the **anti**derivative'],
            ['$F(1) - F(9)$', 'it is **top minus bottom**: $F(9) - F(1)$'],
            ['$F(1) = 0$', 'put $x = 1$ in: $F(1) = 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 over 2 root x is the derivative of root x. We need to go the other way: add 1 to the power and divide.' },
        { say: 'It is the value at the top limit minus the value at the bottom, not the other way round.' },
        { say: 'And F of 1 is not 0. Put 1 in: two thirds plus one third is 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Evaluate $\\displaystyle\\int_0^2 \\left(3x^2 + 1\\right)dx$.',
          choices: ['$12$', '$14$', '$8$', '$10$'],
          answer: 3,
          working: '$F(x) = x^3 + x$: $F(2) - F(0) = 10 - 0 = 10$',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the integral from 0 to 2 of 3 x squared plus 1. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'An antiderivative is x cubed plus x. At 2, that is 8 plus 2, which is 10. At 0, it is 0. So the integral is 10. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rectangles give an **estimate**', '$\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)$ gives the **exact** area', 'Antiderivative: **add 1** to the power, **divide** by it', 'Top **minus** bottom'] }],
      lines: [
        { say: 'Here is what to remember. Rectangles give an estimate of the area.', show: 'sum.0' },
        { say: 'The fundamental theorem gives the exact area: F of b minus F of "a".', show: 'sum.1' },
        { say: 'For a power of x, add 1 to the power and divide by the new power.', show: 'sum.2' },
        { say: 'And always take the top minus the bottom. For more on the fundamental theorem of calculus, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
