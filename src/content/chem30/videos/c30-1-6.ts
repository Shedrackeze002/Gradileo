import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-6',
  lessonId: 'c30-1-6',
  title: 'Enthalpies of Formation, Part 1: Standard States',
  thumbnailTitle: 'Standard States',
  thumbnail: false,
  summary:
    'Tables give enthalpy changes at standard conditions, here SATP (25 °C and 100 kPa). The standard state of an element is its most stable form at SATP, such as O₂(g), Br₂(l), I₂(s), Hg(l), C(s) and Na(s). A formation equation makes one mole of a compound from its elements in their standard states, and its enthalpy change is the standard enthalpy of formation, which is zero for an element in its standard state.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'Standard States', subtitle: 'One number for each compound' }],
      lines: [
        { say: 'There are millions of possible reactions, and no data table could list the enthalpy change of every one. Instead, tables list one number for each compound: the energy change when it forms from its elements.', show: 'title' },
        { say: 'In this part, you will meet standard states, formation equations and standard enthalpies of formation. The later parts write formation equations, and use them to find delta H.' },
      ],
    },
    {
      chapter: 'Standard conditions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{SATP: } 25^\\circ\\text{C and } 100\\ \\text{kPa}', '\\Delta_r H^\\circ\\text{: the circle means standard conditions}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard state', md: 'The **standard state** of a substance is its most stable form at SATP: a solid, a liquid or a gas, and for an element, the form its atoms take, such as single atoms or diatomic molecules.' },
      ],
      lines: [
        {
          say: 'Enthalpy changes depend on conditions, so tables give them for standard conditions. In this unit, those are S A T P: twenty-five degrees Celsius and one hundred kilopascals.',
          caption: 'Enthalpy changes depend on conditions, so tables give them for standard conditions. In this unit, those are SATP: 25 °C and 100 kPa.',
          show: 'm.0',
        },
        { say: 'A small circle after delta H means the value is for standard conditions.', show: 'm.1', focus: 'm.1' },
        { say: 'The standard state of a substance is its most stable form at S A T P: a solid, a liquid or a gas. For an element, it is also the form its atoms take, such as single atoms or diatomic molecules.', caption: 'The standard state of a substance is its most stable form at SATP: a solid, a liquid or a gas. For an element, it is also the form its atoms take, such as single atoms or diatomic molecules.', show: 'def', focus: 'm' },
      ],
    },
    {
      chapter: 'The elements',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Standard state', 'Written as'],
          rows: [
            ['hydrogen, oxygen, nitrogen', 'diatomic gases', '$\\ce{H2(g)}$, $\\ce{O2(g)}$, $\\ce{N2(g)}$'],
            ['fluorine, chlorine', 'diatomic gases', '$\\ce{F2(g)}$, $\\ce{Cl2(g)}$'],
            ['bromine', 'a diatomic liquid', '$\\ce{Br2(l)}$'],
            ['iodine', 'a diatomic solid', '$\\ce{I2(s)}$'],
            ['mercury', 'a liquid', '$\\ce{Hg(l)}$'],
            ['carbon', 'a solid (graphite)', '$\\ce{C(s)}$'],
            ['the other metals', 'solids, as atoms', '$\\ce{Na(s)}$, $\\ce{Al(s)}$, $\\ce{Fe(s)}$'],
          ],
        },
      ],
      lines: [
        {
          say: 'Hydrogen, oxygen, nitrogen, fluorine and chlorine are diatomic gases, so each is written as a molecule of two atoms, in the gas state.',
          caption: 'Hydrogen, oxygen, nitrogen, fluorine and chlorine are diatomic gases, so each is written as a molecule of two atoms, in the gas state: H₂(g), O₂(g), N₂(g), F₂(g), Cl₂(g).',
          show: ['t.0', 't.1'],
          focus: ['t.0', 't.1'],
        },
        { say: 'Bromine is also diatomic, but a liquid, and iodine is a diatomic solid.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Mercury is a liquid metal, and carbon is a solid, in the form of graphite.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
        { say: 'The other metals are solids, written as single atoms, such as sodium, aluminium and iron.', show: 't.6', focus: 't.6' },
      ],
    },
    {
      chapter: 'Formation equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Formation equation', md: 'A **formation equation** shows **one mole** of a compound forming from its elements in their standard states. Fractions are often needed in front of the elements.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{H2(g) + 1/2 O2(g) -> H2O(l)}\\qquad \\Delta_f H^\\circ = -285.8\\ \\text{kJ/mol}'] },
        { kind: 'callout', id: 'dhf', tone: 'definition', title: 'Standard enthalpy of formation', md: 'The **standard enthalpy of formation**, $\\Delta_f H^\\circ$, of a compound is the enthalpy change of its formation equation at standard conditions, in $\\text{kJ/mol}$.' },
      ],
      lines: [
        { say: 'A formation equation shows one mole of a compound forming from its elements in their standard states.', show: 'def' },
        {
          say: 'For water, hydrogen gas and half a mole of oxygen gas form one mole of liquid water. One water molecule has only one oxygen atom, which is half an oxygen molecule, so fractions are often needed.',
          caption: 'For water, H₂(g) + ½O₂(g) → H₂O(l). One water molecule has only one oxygen atom, which is half an oxygen molecule, so fractions are often needed.',
          show: 'm',
        },
        {
          say: 'The standard enthalpy of formation is the enthalpy change of that equation at standard conditions, in kilojoules per mole. For liquid water, it is negative two hundred eighty-five point eight kilojoules per mole.',
          caption: 'The standard enthalpy of formation, ΔfH°, is the enthalpy change of that equation at standard conditions, in kJ/mol. For liquid water, it is −285.8 kJ/mol.',
          show: 'dhf',
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'Elements are zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Elements', md: 'For an element in its standard state, $\\Delta_f H^\\circ = 0$: nothing has to happen to form it.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta_f H^\\circ(\\ce{O2(g)}) = 0 \\qquad \\Delta_f H^\\circ(\\ce{Br2(l)}) = 0', '\\Delta_f H^\\circ(\\ce{Br2(g)}) \\neq 0 \\qquad \\Delta_f H^\\circ(\\ce{O(g)}) \\neq 0'] },
      ],
      lines: [
        { say: 'For an element in its standard state, the standard enthalpy of formation is zero, because nothing has to happen to form it.', show: 'key' },
        { say: 'Oxygen gas and liquid bromine both have zero.', show: 'm.0', focus: 'm.0' },
        { say: 'But bromine gas is not bromine’s standard state, and neither are single oxygen atoms, so their values are not zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At SATP, which of these has a standard enthalpy of formation, $\\Delta_f H^\\circ$, of zero?',
          choices: ['$\\ce{O3(g)}$', '$\\ce{I2(s)}$', '$\\ce{Hg(g)}$', '$\\ce{H(g)}$'],
          answer: 1,
          working: 'The standard state of iodine is a diatomic solid, $\\ce{I2(s)}$. Oxygen and hydrogen are diatomic gases, $\\ce{O2(g)}$ and $\\ce{H2(g)}$, and mercury is a liquid, $\\ce{Hg(l)}$.',
        },
      ],
      lines: [
        { say: 'Your turn. At S A T P, which of these has a standard enthalpy of formation of zero? Pause the video and try it.', caption: 'Your turn. At SATP, which of these has a standard enthalpy of formation of zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, solid iodine, because iodine’s standard state is a diatomic solid. Mercury’s standard state is a liquid, not a gas, and oxygen and hydrogen are diatomic gases, not ozone or single atoms.', show: 'q.answer' },
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
          items: [
            'Standard conditions here are SATP: $25^\\circ\\text{C}$ and $100\\ \\text{kPa}$. A circle, as in $\\Delta_r H^\\circ$, marks a standard value.',
            'The **standard state** is the most stable form at SATP: $\\ce{O2(g)}$, $\\ce{Br2(l)}$, $\\ce{I2(s)}$, $\\ce{Hg(l)}$, $\\ce{C(s)}$, $\\ce{Na(s)}$.',
            'A **formation equation** makes one mole of a compound from its elements in their standard states; $\\Delta_f H^\\circ$ is its enthalpy change, in $\\text{kJ/mol}$.',
            '$\\Delta_f H^\\circ = 0$ for an element in its standard state.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Standard conditions here are S A T P, and a small circle marks a standard value.', caption: 'Let’s sum up. Standard conditions here are SATP, and a small circle marks a standard value.', show: 'sum.0' },
        { say: 'The standard state is the most stable form at S A T P.', caption: 'The standard state is the most stable form at SATP.', show: 'sum.1' },
        { say: 'A formation equation makes one mole of a compound from its elements in their standard states. Its enthalpy change is the standard enthalpy of formation.', show: 'sum.2' },
        { say: 'For an element in its standard state, it is zero. In part two, you will write formation equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
