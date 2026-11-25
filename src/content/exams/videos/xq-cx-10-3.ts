import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import rates from '@/content/chemmore/videos/cx-10-3.ts';

// Exam question for More Chemistry Topics lesson 10.3 (rate equations): finding the orders from
// initial-rate data, writing the rate equation, and calculating k with its units. Written by
// Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's two boxes, one with twice as much A (src/video/particles.ts).

const QUESTION = 'The initial rate of the reaction A + B → products was measured three times at the same temperature. Experiment 1: [A] = 0.10 mol dm⁻³, [B] = 0.10 mol dm⁻³, rate = 2.0 × 10⁻⁴ mol dm⁻³ s⁻¹. Experiment 2: [A] = 0.20 mol dm⁻³, [B] = 0.10 mol dm⁻³, rate = 4.0 × 10⁻⁴ mol dm⁻³ s⁻¹. Experiment 3: [A] = 0.10 mol dm⁻³, [B] = 0.20 mol dm⁻³, rate = 8.0 × 10⁻⁴ mol dm⁻³ s⁻¹. (a) Find the order of reaction with respect to A and with respect to B. (b) Write the rate equation. (c) Calculate the value of the rate constant, k, and give its units.';

const video: Explainer = {
  id: 'xq-cx-10-3',
  lessonId: '',
  exam: {
    lesson: 'cx-10-3',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Orders, the Rate Equation and k from Three Experiments. Rate Equations',
  thumbnailTitle: 'Rate Equations',
  thumbnail: 'da',
  summary:
    'A test-style question, solved one small step at a time: from three initial-rate experiments, what are the orders with respect to A and B, what is the rate equation, and what is k? Doubling [A] doubles the rate, so it is first order in A; doubling [B] quadruples it, so it is second order in B; rate = k[A][B]², and k = 2.0 × 10⁻⁴ ÷ (0.10 × 0.10²) = 0.20 mol⁻² dm⁶ s⁻¹.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Rate Equations', subtitle: 'Orders and k from initial rates' }],
      lines: [
        { say: 'In this video, we solve a test-style question about rate equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'First order in A, second in B; rate = k[A][B]²; k = 0.20 mol⁻² dm⁶ s⁻¹' }],
      lines: [
        { say: 'Here is the question. The initial rate of the reaction A plus B goes to products was measured three times at the same temperature. In experiment 1, A and B are both 0.10 moles per cubic decimetre, and the rate is 2.0 times 10 to the minus 4. In experiment 2, A is doubled to 0.20, B stays at 0.10, and the rate is 4.0 times 10 to the minus 4. In experiment 3, A is 0.10, B is doubled to 0.20, and the rate is 8.0 times 10 to the minus 4. Part a: find the order of reaction with respect to A and with respect to B. Part b: write the rate equation. Part c: calculate the value of the rate constant, k, and give its units.', caption: 'Here is the question. The initial rate of the reaction A + B → products was measured three times at the same temperature. Experiment 1: [A] = 0.10 mol dm⁻³, [B] = 0.10 mol dm⁻³, rate = 2.0 × 10⁻⁴ mol dm⁻³ s⁻¹. Experiment 2: [A] = 0.20, [B] = 0.10, rate = 4.0 × 10⁻⁴. Experiment 3: [A] = 0.10, [B] = 0.20, rate = 8.0 × 10⁻⁴. Part a: find the order with respect to A and B. Part b: write the rate equation. Part c: calculate k and give its units.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Change **one** concentration at a time and watch what the **rate** does' }],
      lines: [
        { say: 'In each pair of experiments, only one concentration changes. How much the rate changes tells us the order for that reactant.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(rates, 'da')],
      lines: [
        { say: 'Here is what we need. Each A particle that hits a B particle hard enough makes a new molecule. The right-hand box has twice as much A, and the same amount of B.', show: ['da', 'da.labels', 'da.key', 'da.tally'], play: 'da.go' },
        { say: 'With more A particles, more collisions happen each second. On average, twice as much A gives twice as many collisions and twice the rate, which is what first order means.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'plan',
          head: ['Concentration doubled', 'Rate', 'Order'],
          rows: [
            ['×2', 'unchanged', '0'],
            ['×2', '×2', '1'],
            ['×2', '×4', '2'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. If doubling a concentration leaves the rate unchanged, the order is zero.', show: ['plan', 'plan.0'] },
        { say: 'If it doubles the rate, the order is one.', show: 'plan.1' },
        { say: 'And if it quadruples the rate, the order is two, because two squared is four.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The orders',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Compare', 'Change', 'Rate', 'Order'],
          rows: [
            ['1 and 2', '[A] ×2, [B] same', '×2', '**first** in A'],
            ['1 and 3', '[B] ×2, [A] same', '×4', '**second** in B'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. From experiment 1 to 2, A doubles and B stays the same. The rate goes from 2.0 to 4.0, so it doubles, and the reaction is first order with respect to A.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'From experiment 1 to 3, B doubles and A stays the same. The rate goes from 2.0 to 8.0, four times bigger, so the reaction is second order with respect to B. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: The rate equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['\\good{\\text{rate} = k[\\text{A}][\\text{B}]^2}'] }],
      lines: [
        { say: 'Step two. Each concentration is raised to the power of its order: A to the power 1 and B to the power 2. So rate equals k times A times B squared. That is part b.', caption: 'Step two. Each concentration is raised to the power of its order: A to the power 1 and B to the power 2. So rate = k[A][B]². That is part b.', show: 'r.0', focus: 'r.0' },
      ],
    },
    {
      chapter: 'Step 3: k and its units',
      layout: 'center',
      main: [{ kind: 'math', id: 'k', size: 'md', lines: ['k = \\dfrac{\\text{rate}}{[\\text{A}][\\text{B}]^2} = \\dfrac{2.0 \\times 10^{-4}}{0.10 \\times 0.10^2}', '\\good{k = 0.20}', '\\text{units: } \\dfrac{\\text{mol dm}^{-3}\\text{ s}^{-1}}{(\\text{mol dm}^{-3})^3} = \\good{\\text{mol}^{-2}\\text{ dm}^{6}\\text{ s}^{-1}}'] }],
      lines: [
        { say: 'Step three. Rearranging, k is the rate divided by A times B squared. Using experiment 1, that is 2.0 times 10 to the minus 4, divided by 0.10 times 0.10 squared.', caption: 'Step three. Rearranging, k = rate ÷ [A][B]². Using experiment 1: 2.0 × 10⁻⁴ ÷ (0.10 × 0.10²).', show: 'k.0' },
        { say: 'The bottom is 0.10 times 0.010, which is 0.0010. So k is 0.20.', caption: 'The bottom is 0.10 × 0.010 = 0.0010. So k = 0.20.', show: 'k.1' },
        { say: 'For the units, moles per cubic decimetre per second is divided by moles per cubic decimetre, cubed. That leaves mol to the minus 2, d m to the 6, s to the minus 1. That is part c.', caption: 'For the units, mol dm⁻³ s⁻¹ is divided by (mol dm⁻³)³. That leaves mol⁻² dm⁶ s⁻¹. That is part c.', show: 'k.2', focus: 'k.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **First** order in A, **second** order in B. (b) **rate = k[A][B]²**. (c) **k = 0.20 mol⁻² dm⁶ s⁻¹**.' },
      ],
      lines: [
        { say: 'Does it make sense? Check with experiment 3: 0.20 times 0.10 times 0.20 squared is 8.0 times 10 to the minus 4, exactly the rate measured.', caption: 'Does it make sense? Check with experiment 3: 0.20 × 0.10 × 0.20² = 8.0 × 10⁻⁴, exactly the rate measured.', show: 'ans' },
        { say: 'So the reaction is first order in A and second order in B, and k is 0.20 with units of mol to the minus 2, d m to the 6, s to the minus 1.', caption: 'So the reaction is first order in A and second order in B, and k = 0.20 mol⁻² dm⁶ s⁻¹.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['Orders from the **equation**: 1 and 1', 'Orders come from **experiments**'],
            ['Rate ×4, so order **4**', '2 to the power **2** is 4'],
            ['k in **s⁻¹**', 'Units depend on the **overall order**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The balanced equation has one A and one B, but the orders can only be found by experiment.', focus: 'traps.0' },
        { say: 'A rate four times bigger when the concentration doubles means order two, because two squared is four.', focus: 'traps.1' },
        { say: 'And s to the minus 1 is the unit for a first order reaction overall. This one is third order overall.', caption: 'And s⁻¹ is the unit for a first order reaction overall. This one is third order overall.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A reaction is zero order in A. What happens to the rate when [A] is tripled?',
          choices: ['it triples', 'it rises nine times', 'it stays the same', 'it falls to a third'],
          answer: 2,
          working: 'Zero order means the rate does not depend on [A]: 3⁰ = 1, so the rate stays the same.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction is zero order in A. What happens to the rate when the concentration of A is tripled? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Zero order means the rate does not depend on A at all. Three to the power zero is one, so the rate stays the same: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Double a concentration: rate ×1, ×2, ×4 means order **0, 1, 2**', 'rate = k[A]ᵐ[B]ⁿ', 'Units of k from **rearranging** the rate equation'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Doubling a concentration leaves the rate the same, doubles it or quadruples it for orders zero, one and two.', show: 'sum.0' },
        { say: 'Each concentration in the rate equation is raised to the power of its order.', show: 'sum.1' },
        { say: 'And the units of k come from rearranging the rate equation. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
