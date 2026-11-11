import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-10-2',
  lessonId: 'cx-10-2',
  title: 'Entropy and Gibbs Free Energy',
  thumbnail: false,
  summary:
    'Entropy measures the number of ways particles and their energy can be arranged; gases have far more than solids. The entropy change is the total for the products minus the total for the reactants. A reaction is feasible when the Gibbs free-energy change, ΔG = ΔH − TΔS, is zero or negative, with ΔS in kJ, and it becomes feasible at the temperature T = ΔH ÷ ΔS.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Physical Chemistry', title: 'Entropy and Gibbs Free Energy', subtitle: 'Why ice melts on a warm day' }],
      lines: [
        { say: 'Ice melts on a warm day, even though melting takes in energy. Enthalpy alone cannot explain it. Nature also favours spreading out, and chemists measure that with entropy.', show: 'title' },
        { say: 'In this lesson, you will calculate entropy changes, and combine them with enthalpy to decide whether a reaction can happen.' },
      ],
    },
    {
      chapter: 'Entropy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Entropy, S', md: 'A measure of the number of ways that particles and their energy can be arranged. Units: J K⁻¹ mol⁻¹.' },
        { kind: 'bullets', id: 'b', items: ['Gas > liquid > solid', 'Entropy rises when more moles of gas form'] },
      ],
      lines: [
        { say: 'Entropy measures the number of ways that particles and their energy can be arranged.', show: 'def' },
        { say: 'Gases have far more entropy than liquids, and liquids more than solids.', show: 'b.0' },
        { say: 'So entropy rises when a solid melts, when a liquid boils, or when a reaction makes more moles of gas than it uses.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Calculating ΔS',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta S = \\Sigma S(\\text{products}) - \\Sigma S(\\text{reactants})', '\\ce{N2 + 3H2 -> 2NH3}', '\\Delta S = 2(193) - [192 + 3(131)] = -199\\ \\text{J K}^{-1}\\text{ mol}^{-1}'] }],
      lines: [
        { say: 'The entropy change is the total entropy of the products, minus the total for the reactants.', show: 'm.0', focus: 'm.0' },
        { say: 'In the Haber process, four moles of gas become two.', show: 'm.1', focus: 'm.1' },
        { say: 'Two times one hundred ninety-three, minus the reactants’ five hundred eighty-five, gives minus one hundred ninety-nine. Negative, as we expected.', caption: '2 × 193, minus the reactants’ 585, gives −199 J K⁻¹ mol⁻¹. Negative, as we expected.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Feasibility',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta G = \\Delta H - T\\Delta S', '\\text{feasible when } \\Delta G \\le 0', 'T = \\dfrac{\\Delta H}{\\Delta S} = \\dfrac{178}{0.161} = 1105.6\\ \\text{K}'] }],
      lines: [
        { say: 'Enthalpy and entropy are combined in the Gibbs free-energy change. Delta G equals delta H, minus T times delta S.', caption: 'Enthalpy and entropy are combined in the Gibbs free-energy change: ΔG = ΔH − TΔS.', show: 'm.0', focus: 'm.0' },
        { say: 'A reaction is feasible when delta G is zero or negative.', caption: 'A reaction is feasible when ΔG is zero or negative.', show: 'm.1', focus: 'm.1' },
        { say: 'Calcium carbonate decomposes with delta H of plus one hundred seventy-eight and delta S of plus one hundred sixty-one joules. Divide, with delta S in kilojoules, and it becomes feasible above about eleven hundred six kelvin.', caption: 'Calcium carbonate decomposes with ΔH = +178 kJ mol⁻¹ and ΔS = +161 J K⁻¹ mol⁻¹. Divide, with ΔS in kJ, and it becomes feasible above about 1106 K.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Convert the entropy units', md: 'Divide $\\Delta S$ by 1000 to get kJ K⁻¹ mol⁻¹ before using it with $\\Delta H$ in kJ mol⁻¹.' }],
      lines: [{ say: 'A common mistake is to forget to convert delta S into kilojoules. Divide it by one thousand, or your answer is a thousand times too big. And remember, feasible does not mean fast.', caption: 'A common mistake is to forget to convert ΔS into kilojoules. Divide it by 1000, or your answer is a thousand times too big. And remember, feasible does not mean fast.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A reaction has $\\Delta H = -50$ kJ mol⁻¹ and $\\Delta S = -100$ J K⁻¹ mol⁻¹. What is $\\Delta G$ at 300 K?',
          choices: ['+29 950 kJ mol⁻¹', '−80 kJ mol⁻¹', '+50 kJ mol⁻¹', '−20 kJ mol⁻¹'],
          answer: 3,
          working: '$\\Delta G = -50 - 300 \\times (-0.100) = -50 + 30 = -20$ kJ mol⁻¹, so it is feasible.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction has delta H of minus fifty kilojoules per mole, and delta S of minus one hundred joules per kelvin per mole. What is delta G at three hundred kelvin? Pause the video and try it.', caption: 'Your turn. A reaction has ΔH = −50 kJ mol⁻¹ and ΔS = −100 J K⁻¹ mol⁻¹. What is ΔG at 300 K? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, minus twenty. Delta S is minus zero point one kilojoules, so T delta S is minus thirty, and minus fifty minus minus thirty is minus twenty.', caption: 'The answer is D, −20. ΔS is −0.100 kJ, so TΔS is −30, and −50 − (−30) = −20 kJ mol⁻¹.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Entropy: the number of ways to arrange particles and energy.', 'ΔS = products − reactants.', 'ΔG = ΔH − TΔS; feasible when ΔG ≤ 0.', 'ΔG = 0 at T = ΔH ÷ ΔS.'] }],
      lines: [
        { say: 'Let’s sum up. Entropy measures the number of ways to arrange particles and their energy.', show: 'sum.0' },
        { say: 'The entropy change is the products minus the reactants.', show: 'sum.1' },
        { say: 'Delta G equals delta H minus T delta S, and a reaction is feasible when delta G is zero or less.', caption: 'ΔG = ΔH − TΔS, and a reaction is feasible when ΔG is zero or less.', show: 'sum.2' },
        { say: 'And delta G is zero at the temperature delta H divided by delta S.', caption: 'And ΔG is zero at T = ΔH ÷ ΔS.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
