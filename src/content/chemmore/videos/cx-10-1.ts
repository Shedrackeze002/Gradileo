import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-10-1',
  lessonId: 'cx-10-1',
  title: 'Born–Haber Cycles and Lattice Enthalpies',
  thumbnail: false,
  summary:
    'A lattice enthalpy cannot be measured directly, so a Born–Haber cycle links it, by Hess’s law, to atomisation enthalpies, ionisation energies, electron affinities and the enthalpy of formation. Smaller, more highly charged ions give larger lattice and hydration enthalpies, a value larger than the perfect ionic model shows covalent character, and the enthalpy of solution is the lattice dissociation enthalpy plus the hydration enthalpies.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Physical Chemistry', title: 'Born–Haber Cycles', subtitle: 'Measuring what cannot be measured' }],
      lines: [
        { say: 'You cannot measure the lattice enthalpy of sodium chloride directly. Nobody can collect a mole of gaseous ions and let them crash together. So chemists build a cycle of steps they can measure.', show: 'title' },
        { say: 'In this lesson, you will build Born Haber cycles, calculate lattice enthalpies, and explain how ionic compounds dissolve.', caption: 'In this lesson, you will build Born–Haber cycles, calculate lattice enthalpies, and explain how ionic compounds dissolve.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lattice formation enthalpy', md: 'The enthalpy change when one mole of an ionic solid forms from its **gaseous ions**. It is always exothermic.' },
        { kind: 'table', id: 't', head: ['Step, for sodium chloride', 'Sign'], rows: [['Atomise sodium', 'endothermic'], ['Ionise sodium', 'endothermic'], ['Atomise chlorine', 'endothermic'], ['Add an electron to chlorine', 'exothermic']] },
      ],
      lines: [
        { say: 'The lattice formation enthalpy is the enthalpy change when one mole of solid forms from its gaseous ions. It is always exothermic.', show: 'def' },
        { say: 'To get from the elements to the gaseous ions, we atomise the sodium and ionise it. Both take in energy.', show: ['t.0', 't.1'] },
        { say: 'Then we atomise half a mole of chlorine molecules, and add an electron to each chlorine atom. That electron affinity gives out energy.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Calculating',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta_f H = (\\text{steps to the gaseous ions}) + \\Delta_{LE} H', '107 + 496 + 122 - 349 = 376', '\\Delta_{LE} H = -411 - 376 = -787\\ \\text{kJ mol}^{-1}'] }],
      lines: [
        { say: 'By Hess’s law, going straight from the elements to the solid equals going round the cycle through the gaseous ions.', show: 'm.0', focus: 'm.0' },
        { say: 'For sodium chloride, the steps to the gaseous ions add up to plus three hundred seventy-six kilojoules per mole.', caption: 'For sodium chloride, the steps to the gaseous ions add up to +376 kJ mol⁻¹.', show: 'm.1', focus: 'm.1' },
        { say: 'The enthalpy of formation is minus four hundred eleven, so the lattice enthalpy is minus four hundred eleven, minus three hundred seventy-six. That is minus seven hundred eighty-seven.', caption: 'The enthalpy of formation is −411, so the lattice enthalpy is −411 − 376 = −787 kJ mol⁻¹.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Size, charge and dissolving',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Smaller, more highly charged ions: larger lattice enthalpy', 'Born–Haber value far above the ionic model: covalent character', '$\\Delta_{sol} H = \\Delta_{LD} H + \\Delta_{hyd} H(\\text{ions})$'] },
      ],
      lines: [
        { say: 'Smaller, more highly charged ions attract each other more strongly, so magnesium oxide has a far larger lattice enthalpy than sodium chloride.', show: 'b.0' },
        { say: 'If the Born Haber value is much larger than a perfect ionic model predicts, the bonding has some covalent character.', caption: 'If the Born–Haber value is much larger than a perfect ionic model predicts, the bonding has some covalent character.', show: 'b.1' },
        { say: 'When a solid dissolves, the lattice breaks up and the ions are hydrated. So the enthalpy of solution is the lattice dissociation enthalpy, plus the hydration enthalpies of the ions.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Count every step', md: 'For $\\ce{MgCl2}$: **two** chlorine atomisations, **two** electron affinities, and both the first and second ionisation energies of magnesium.' }],
      lines: [{ say: 'A common mistake is to miss a doubled step. For magnesium chloride, you need two chlorine atomisations, two electron affinities, and two ionisation energies for magnesium.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which compound has the most exothermic lattice formation enthalpy?',
          choices: ['NaCl', 'MgO', 'NaI', 'KBr'],
          answer: 1,
          working: '$\\ce{Mg^2+}$ and $\\ce{O^2-}$ are small and **doubly charged**, so they attract each other most strongly.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound has the most exothermic lattice formation enthalpy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, magnesium oxide. Its ions are small and have charges of two, so they attract each other most strongly.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Lattice formation enthalpy: gaseous ions to one mole of solid.', 'A Born–Haber cycle finds it by Hess’s law.', 'Smaller, more charged ions give larger values.', 'Enthalpy of solution = lattice dissociation + hydration.'] }],
      lines: [
        { say: 'Let’s sum up. The lattice formation enthalpy is the change when gaseous ions form one mole of solid.', show: 'sum.0' },
        { say: 'A Born Haber cycle finds it using Hess’s law.', caption: 'A Born–Haber cycle finds it using Hess’s law.', show: 'sum.1' },
        { say: 'Smaller, more highly charged ions give larger lattice enthalpies.', show: 'sum.2' },
        { say: 'And the enthalpy of solution is the lattice dissociation enthalpy plus the hydration enthalpies.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
