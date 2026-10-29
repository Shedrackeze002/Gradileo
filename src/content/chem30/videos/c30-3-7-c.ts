import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-3-7-c',
  lessonId: 'c30-3-7',
  title: 'Fossil Fuels and Combustion, Part 3: Combustion Equations',
  thumbnailTitle: 'Combustion Equations',
  thumbnail: false,
  summary:
    'In complete combustion, a fuel burns in plenty of oxygen to carbon dioxide and water; in incomplete combustion, some carbon ends up as carbon monoxide or soot. Balance carbon first, then hydrogen, then oxygen, counting any oxygen in the fuel, and double everything if oxygen needs half a molecule: 2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O, C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O and 2CH₄ + 3O₂ → 2CO + 4H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'Combustion Equations', subtitle: 'Carbon, then hydrogen, then oxygen' }],
      lines: [
        { say: 'A fuel that burns with a clean blue flame is getting plenty of oxygen. A yellow, smoky flame that leaves soot is not.', show: 'title' },
        { say: 'In this part, you will write balanced equations for the complete and incomplete combustion of hydrocarbons and alcohols.' },
      ],
    },
    {
      chapter: 'Complete and incomplete',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'full', tone: 'definition', title: 'Complete combustion', md: 'The fuel burns in **plenty of oxygen**. Every carbon atom ends up in carbon dioxide, and every hydrogen atom in water: fuel + oxygen → carbon dioxide + water.' },
        { kind: 'callout', id: 'part', tone: 'definition', title: 'Incomplete combustion', md: 'There is **not enough oxygen**. Some carbon ends up as carbon monoxide, $\\ce{CO}$, or as carbon itself, $\\ce{C}$ (soot). The flame is yellow and smoky, and less energy is released.' },
      ],
      lines: [
        { say: 'In complete combustion, a fuel burns in plenty of oxygen. Every carbon atom ends up in carbon dioxide, and every hydrogen atom in water.', show: 'full' },
        { say: 'In incomplete combustion, there is not enough oxygen. Some carbon ends up as carbon monoxide, or as carbon itself, which is soot.', show: 'part' },
        { say: 'The flame is yellow and smoky, and less energy is released.' },
      ],
    },
    {
      chapter: 'Burning octane',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Balancing a combustion equation', md: 'Balance **carbon** first, then **hydrogen**, and **oxygen** last. If oxygen needs half a molecule, double every coefficient.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{C8H18 + O2 -> CO2 + H2O}',
            '\\text{C: } \\ce{8CO2} \\qquad \\text{H: } \\ce{9H2O}',
            '\\text{O on the right: } 8 \\times 2 + 9 = 25 \\ \\Rightarrow\\ 12\\tfrac{1}{2}\\ \\ce{O2}',
            '\\ce{2C8H18 + 25O2 -> 16CO2 + 18H2O}',
          ],
        },
      ],
      lines: [
        { say: 'To balance a combustion equation, balance the carbon first, then the hydrogen, and the oxygen last.', show: 'tip' },
        { say: 'Take the complete combustion of octane. Eight carbon atoms make eight carbon dioxide molecules, and eighteen hydrogen atoms make nine water molecules.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Now count the oxygen on the right: eight times two, plus nine, is twenty-five atoms. That needs twelve and a half oxygen molecules.', show: 'm.2', focus: 'm.2' },
        { say: 'There is no such thing as half a molecule, so double everything: two octane and twenty-five oxygen give sixteen carbon dioxide and eighteen water.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Burning an alcohol',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{C2H5OH + O2 -> CO2 + H2O}',
            '\\text{C: } \\ce{2CO2} \\qquad \\text{H: 6 atoms, so } \\ce{3H2O}',
            '\\text{O on the right: } 2 \\times 2 + 3 = 7; \\ \\text{ethanol brings 1, so } \\ce{3O2}',
            '\\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}',
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The oxygen in an alcohol', md: 'Forgetting the O in the alcohol gives too much $\\ce{O2}$: $3\\tfrac{1}{2}\\ \\ce{O2}$ would put 8 oxygen atoms on the left and only 7 on the right.' },
      ],
      lines: [
        { say: 'Alcohols burn too. Balance the complete combustion of ethanol.', show: 'm.0' },
        { say: 'Carbon: two carbon dioxide. Hydrogen: six atoms in all, counting the one in the O H group, so three water.', caption: 'Carbon: two carbon dioxide. Hydrogen: six atoms in all, counting the one in the OH group, so three water.', show: 'm.1', focus: 'm.1' },
        { say: 'Oxygen on the right: two times two, plus three, is seven atoms. Ethanol already brings one of them, so oxygen gas must bring six: three oxygen molecules.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Do not forget the oxygen in the alcohol. Without it, you would use three and a half oxygen molecules, which puts eight oxygen atoms on the left and only seven on the right.', show: 'oops' },
      ],
    },
    {
      chapter: 'Incomplete combustion',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{CH4 + O2 -> CO + H2O}',
            '\\text{C: } \\ce{CO} \\qquad \\text{H: 4 atoms, so } \\ce{2H2O}',
            '\\text{O on the right: } 1 + 2 = 3 \\ \\Rightarrow\\ 1\\tfrac{1}{2}\\ \\ce{O2}',
            '\\ce{2CH4 + 3O2 -> 2CO + 4H2O}',
          ],
        },
      ],
      lines: [
        { say: 'Methane burns in a limited supply of oxygen, to form carbon monoxide and water. The same steps work.', show: 'm.0' },
        { say: 'Carbon: one carbon monoxide. Hydrogen: four atoms, so two water.', show: 'm.1', focus: 'm.1' },
        { say: 'Oxygen on the right: one plus two is three atoms, which needs one and a half oxygen molecules.', show: 'm.2', focus: 'm.2' },
        { say: 'Double everything: two methane and three oxygen give two carbon monoxide and four water.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ethane burns in a limited supply of oxygen, forming only carbon monoxide and water: $\\ce{C2H6 + O2 -> CO + H2O}$. Which coefficients, in order, balance it with the smallest whole numbers?',
          choices: ['$2,\\ 7,\\ 4,\\ 6$', '$1,\\ 5,\\ 2,\\ 3$', '$1,\\ 2\\tfrac{1}{2},\\ 2,\\ 3$', '$2,\\ 5,\\ 4,\\ 6$'],
          answer: 3,
          working: 'Carbon: $\\ce{2CO}$. Hydrogen: $\\ce{3H2O}$. Oxygen on the right: $2 + 3 = 5$ atoms, so $2\\tfrac{1}{2}\\ \\ce{O2}$. Doubling: $\\ce{2C2H6 + 5O2 -> 4CO + 6H2O}$. Check: C $4 = 4$, H $12 = 12$, O $10 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ethane burns in a limited supply of oxygen, forming only carbon monoxide and water. Which coefficients, in order, balance the equation with the smallest whole numbers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: two, five, four and six. Carbon gives two carbon monoxide, hydrogen gives three water, and the five oxygen atoms on the right need two and a half oxygen molecules, so double everything. Choice C still has the half, and choice A is the oxygen for complete combustion.', show: 'q.answer' },
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
            '**Complete combustion** gives carbon dioxide and water.',
            '**Incomplete combustion** gives carbon monoxide or soot as well, with a yellow, smoky flame.',
            'Balance carbon, then hydrogen, then oxygen; double everything to clear a half.',
            'Count the oxygen atom in an alcohol: $\\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Complete combustion gives carbon dioxide and water.', show: 'sum.0' },
        { say: 'Incomplete combustion gives carbon monoxide or soot as well, with a yellow, smoky flame.', show: 'sum.1' },
        { say: 'Balance carbon, then hydrogen, then oxygen, and double everything to clear a half.', show: 'sum.2' },
        { say: 'And count the oxygen atom in an alcohol. In part four, you will see what burning fossil fuels does to the air we breathe. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
