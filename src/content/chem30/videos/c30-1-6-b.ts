import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-6-b',
  lessonId: 'c30-1-6',
  title: 'Enthalpies of Formation, Part 2: Writing Formation Equations',
  thumbnailTitle: 'Writing Formation Equations',
  thumbnail: false,
  summary:
    'To write a formation equation, count the atoms in one formula unit of the compound and take each element in its standard state: H₂(g) + ½O₂(g) → H₂O(l), 2Al(s) + 3/2 O₂(g) → Al₂O₃(s), 2C(s) + 3H₂(g) + ½O₂(g) → C₂H₅OH(l) and Ca(s) + C(s) + 3/2 O₂(g) → CaCO₃(s). Keep the fractions: clearing them makes more than one mole of the compound.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'Writing Formation Equations', subtitle: 'One mole of product, elements in their standard states' }],
      lines: [
        { say: 'A formation equation is like a recipe that makes exactly one serving. The product is fixed: one mole of the compound. The ingredients are its elements, each in its standard state.', show: 'title' },
        { say: 'In this part, you will write formation equations for two oxides, an alcohol and a carbonate.' },
      ],
    },
    {
      chapter: 'Two oxides',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write the formation equations of water, $\\ce{H2O(l)}$, and aluminium oxide, $\\ce{Al2O3(s)}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{H2O}\\text{: 2 H and 1 O}', '\\ce{H2(g) + 1/2 O2(g) -> H2O(l)}', '\\ce{Al2O3}\\text{: 2 Al and 3 O}', '\\ce{2Al(s) + 3/2 O2(g) -> Al2O3(s)}'] },
      ],
      lines: [
        { say: 'Start with water. One water molecule has two hydrogen atoms, which make one hydrogen molecule, and one oxygen atom, which is half an oxygen molecule.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'So hydrogen gas and half a mole of oxygen gas form one mole of liquid water.', caption: 'So H₂(g) + ½O₂(g) → H₂O(l).', show: 'm.1', focus: 'm.1' },
        { say: 'Aluminium oxide has two aluminium atoms and three oxygen atoms. Aluminium is a metal, written as solid atoms, and three oxygen atoms make three halves of an oxygen molecule.', show: 'm.2', focus: 'm.2' },
        { say: 'So two moles of aluminium and three halves of a mole of oxygen form one mole of aluminium oxide.', caption: 'So 2Al(s) + 3/2 O₂(g) → Al₂O₃(s).', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Three elements',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write the formation equations of ethanol, $\\ce{C2H5OH(l)}$, and calcium carbonate, $\\ce{CaCO3(s)}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{C2H5OH}\\text{: 2 C, 6 H and 1 O}', '\\ce{2C(s) + 3H2(g) + 1/2 O2(g) -> C2H5OH(l)}', '\\ce{CaCO3}\\text{: 1 Ca, 1 C and 3 O}', '\\ce{Ca(s) + C(s) + 3/2 O2(g) -> CaCO3(s)}'] },
      ],
      lines: [
        { say: 'Compounds of three elements work the same way. One molecule of ethanol has two carbon atoms, six hydrogen atoms and one oxygen atom.', show: ['q', 'm.0'], focus: 'm.0' },
        {
          say: 'Carbon is written as solid carbon, so that is two moles. Six hydrogen atoms make three hydrogen molecules, and one oxygen atom is half an oxygen molecule. Together they form one mole of liquid ethanol.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Calcium carbonate has one calcium, one carbon and three oxygen atoms. Calcium is a metal, written as a solid.', show: 'm.2', focus: 'm.2' },
        { say: 'So calcium, carbon and three halves of a mole of oxygen form one mole of calcium carbonate.', caption: 'So Ca(s) + C(s) + 3/2 O₂(g) → CaCO₃(s).', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Keep the fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Clearing the fractions spoils a formation equation', md: '$\\ce{2H2(g) + O2(g) -> 2H2O(l)}$ is balanced, but it makes **two** moles of water, so its enthalpy change is twice $\\Delta_f H^\\circ$. Keep the fractions.' },
        { kind: 'callout', id: 'states', tone: 'mistake', title: 'Watch the states', md: 'Hydrogen and oxygen are $\\ce{H2(g)}$ and $\\ce{O2(g)}$, not single atoms such as $\\ce{H(g)}$; bromine is $\\ce{Br2(l)}$, not a gas.' },
      ],
      lines: [
        {
          say: 'A common mistake is to clear the fractions. Two moles of hydrogen and one mole of oxygen forming two moles of water is balanced, but it is not a formation equation.',
          caption: 'A common mistake is to clear the fractions. 2H₂(g) + O₂(g) → 2H₂O(l) is balanced, but it is not a formation equation.',
          show: 'oops',
        },
        { say: 'That equation makes two moles of water, so its enthalpy change is twice the enthalpy of formation. Keep the fractions.' },
        { say: 'Watch the states as well. Hydrogen and oxygen must be written as diatomic gases, not as single atoms, and bromine as a liquid, not a gas.', show: 'states' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the formation equation of ammonia, $\\ce{NH3(g)}$?',
          choices: ['$\\ce{N2(g) + 3H2(g) -> 2NH3(g)}$', '$\\ce{N(g) + 3H(g) -> NH3(g)}$', '$\\ce{NH3(g) -> 1/2 N2(g) + 3/2 H2(g)}$', '$\\ce{1/2 N2(g) + 3/2 H2(g) -> NH3(g)}$'],
          answer: 3,
          working: 'One mole of $\\ce{NH3(g)}$ forms from the diatomic gases $\\ce{N2(g)}$ and $\\ce{H2(g)}$: one N atom is $\\tfrac{1}{2}$ of an $\\ce{N2}$ molecule, and three H atoms are $\\tfrac{3}{2}$ of an $\\ce{H2}$ molecule.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the formation equation of ammonia? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. One mole of ammonia forms from half a mole of nitrogen gas and three halves of a mole of hydrogen gas. Choice A is balanced, but it makes two moles, and choice B uses single atoms, which are not the standard states.', show: 'q.answer' },
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
            'Count the atoms of each element in **one** formula unit of the compound.',
            'Write each element in its standard state; a diatomic element needs half as many molecules as atoms.',
            'Keep the fractions, so that exactly **one mole** of the compound forms.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Count the atoms of each element in one formula unit of the compound.', show: 'sum.0' },
        { say: 'Write each element in its standard state. A diatomic element needs half as many molecules as atoms.', show: 'sum.1' },
        { say: 'And keep the fractions, so that exactly one mole of the compound forms. In part three, you will use enthalpies of formation to find delta H for a reaction. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
