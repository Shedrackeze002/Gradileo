import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-10-3',
  lessonId: 'cx-10-3',
  title: 'Rate Equations and the Arrhenius Equation',
  thumbnail: false,
  summary:
    'A rate equation, rate = k[A]^m[B]^n, is found by experiment: doubling a concentration leaves the rate unchanged (order 0), doubles it (order 1) or quadruples it (order 2). The units of k come from rearranging the rate equation. The rate equation contains the species in the rate-determining step, and the Arrhenius equation, k = Ae^(−Ea/RT), gives a straight line of ln k against 1/T with gradient −Ea/R.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Physical Chemistry', title: 'Rate Equations', subtitle: 'And the Arrhenius equation' }],
      lines: [
        { say: 'Double the concentration of one reactant, and a reaction might go twice as fast, four times as fast, or no faster at all. Which one happens tells you about the steps the molecules take.', show: 'title' },
        { say: 'In this lesson, you will find orders of reaction, calculate the rate constant, and use the Arrhenius equation.' },
      ],
    },
    {
      chapter: 'Orders of reaction',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rate} = k[\\ce{A}]^m[\\ce{B}]^n'] },
        { kind: 'table', id: 't', head: ['Order', 'Double the concentration, and the rate…'], rows: [['0', 'stays the same'], ['1', 'doubles'], ['2', 'quadruples']] },
      ],
      lines: [
        { say: 'A rate equation is found by experiment. The powers m and n are the orders with respect to A and B, and k is the rate constant.', caption: 'A rate equation is found by experiment. The powers m and n are the orders with respect to A and B, and k is the rate constant.', show: 'm' },
        { say: 'If doubling a concentration leaves the rate unchanged, the order is zero.', show: 't.0', focus: 't.0' },
        { say: 'If the rate doubles, it is first order, and if it quadruples, it is second order.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Finding k',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k = \\dfrac{\\text{rate}}{[\\ce{A}]^2[\\ce{B}]} = \\dfrac{4.0 \\times 10^{-4}}{0.20^2 \\times 0.10} = 0.10', '\\text{units: mol}^{-2}\\text{ dm}^{6}\\text{ s}^{-1}'] }],
      lines: [
        { say: 'To find k, rearrange the rate equation. Here the rate is four times ten to the minus four, and the concentrations are zero point two and zero point one. So k is zero point one.', caption: 'To find k, rearrange the rate equation. Here the rate is 4.0 × 10⁻⁴, and the concentrations are 0.20 and 0.10. So k is 0.10.', show: 'm.0', focus: 'm.0' },
        { say: 'For the units, put the units into the same rearrangement. A third-order reaction gives mol to the minus two, d m cubed to the power six, per second.', caption: 'For the units, put the units into the same rearrangement. A third-order reaction gives mol⁻² dm⁶ s⁻¹.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The Arrhenius equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k = Ae^{-E_a/RT}', '\\ln k = \\ln A - \\dfrac{E_a}{RT}', '\\text{gradient of } \\ln k \\text{ against } 1/T = -\\dfrac{E_a}{R}'] }],
      lines: [
        { say: 'The rate-determining step is the slowest step, and the rate equation contains the species that take part in it.' },
        { say: 'The rate constant rises with temperature, as the Arrhenius equation shows.', show: 'm.0', focus: 'm.0' },
        { say: 'Taking natural logs gives a straight line. Plot natural log k against one over T, and the gradient is minus the activation energy over R.', caption: 'Taking natural logs gives a straight line. Plot ln k against 1/T, and the gradient is −Ea/R.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Kelvin and joules', md: 'Use $T$ in **kelvin** and $E_a$ in **J** mol⁻¹, then convert back to kJ at the end.' }],
      lines: [{ say: 'A common mistake is to use degrees Celsius, or kilojoules. In the Arrhenius equation, use kelvin, and joules per mole.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph of ln k against 1/T has a gradient of −6000 K. With R = 8.31 J K⁻¹ mol⁻¹, what is the activation energy?',
          choices: ['49.9 kJ mol⁻¹', '722 kJ mol⁻¹', '6.0 kJ mol⁻¹', '0.72 kJ mol⁻¹'],
          answer: 0,
          working: '$E_a = 6000 \\times 8.31 = 49\\,860$ J mol⁻¹, which is 49.9 kJ mol⁻¹.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph of natural log k against one over T has a gradient of minus six thousand kelvin. Using R equals eight point three one, what is the activation energy? Pause the video and try it.', caption: 'Your turn. A graph of ln k against 1/T has a gradient of −6000 K. Using R = 8.31, what is the activation energy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A. Six thousand times eight point three one is about forty-nine thousand, nine hundred joules, which is forty-nine point nine kilojoules per mole.', caption: 'The answer is choice A. 6000 × 8.31 is about 49 860 J, which is 49.9 kJ mol⁻¹.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Orders come from experiment, not the equation.', 'Order 0: no change; 1: doubles; 2: quadruples.', 'The rate equation shows the rate-determining step.', 'The gradient of ln k against 1/T is −Ea/R.'] }],
      lines: [
        { say: 'Let’s sum up. Orders of reaction come from experiment, not from the balanced equation.', show: 'sum.0' },
        { say: 'When a concentration doubles, order zero means no change, first order doubles the rate, and second order quadruples it.', show: 'sum.1' },
        { say: 'The rate equation shows which species are in the rate-determining step.', show: 'sum.2' },
        { say: 'And the gradient of natural log k against one over T is minus the activation energy over R.', caption: 'And the gradient of ln k against 1/T is −Ea/R.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
