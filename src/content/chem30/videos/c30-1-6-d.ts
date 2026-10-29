import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-6-d',
  lessonId: 'c30-1-6',
  title: 'Enthalpies of Formation, Part 4: Signs, States and Working Backwards',
  thumbnailTitle: 'Signs, States and Working Backwards',
  thumbnail: false,
  summary:
    'In a blast furnace, Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g) has ΔrH° = −1180.5 − (−1155.7) = −24.8 kJ. Subtract products minus reactants, multiply every enthalpy of formation by its coefficient, and use the right state of water. Most compounds have negative enthalpies of formation, and the same equation can be solved for an unknown one: propane’s is −103.8 kJ/mol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Signs, States and Working Backwards', subtitle: 'Using enthalpies of formation with care' }],
      lines: [
        { say: 'In a blast furnace, carbon monoxide takes the oxygen from iron ore to make iron. Does that reaction release energy or absorb it? A table of enthalpies of formation answers in a few lines.', show: 'title' },
        { say: 'In this part, you will work it out, avoid three common slips, and work backwards to an unknown enthalpy of formation.' },
      ],
    },
    {
      chapter: 'Smelting iron',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: '$\\ce{Fe2O3(s) + 3CO(g) -> 2Fe(s) + 3CO2(g)}$' },
        {
          kind: 'table',
          id: 't',
          head: ['Substance', '$\\Delta_f H^\\circ$ (kJ/mol)', 'Substance', '$\\Delta_f H^\\circ$ (kJ/mol)'],
          rows: [
            ['$\\ce{Fe2O3(s)}$', '$-824.2$', '$\\ce{CO(g)}$', '$-110.5$'],
            ['$\\ce{Fe(s)}$', '$0$', '$\\ce{CO2(g)}$', '$-393.5$'],
          ],
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Products: } 2(0) + 3(-393.5) = -1180.5\\ \\text{kJ}',
            '\\text{Reactants: } (-824.2) + 3(-110.5) = -1155.7\\ \\text{kJ}',
            '\\Delta_r H^\\circ = -1180.5 - (-1155.7) = -24.8\\ \\text{kJ}',
          ],
        },
      ],
      lines: [
        { say: 'Carbon monoxide reduces iron three oxide to iron, and forms carbon dioxide. Here are the values you need.', caption: 'Carbon monoxide reduces iron(III) oxide to iron, and forms carbon dioxide. Here are the values you need.', show: ['q', 't'] },
        { say: 'Products: two moles of iron, an element, count as zero. Three moles of carbon dioxide give negative one thousand one hundred eighty point five kilojoules.', show: 'm.0', focus: ['m.0', 't.1'] },
        { say: 'Reactants: iron three oxide, plus three moles of carbon monoxide, give negative one thousand one hundred fifty-five point seven.', caption: 'Reactants: iron(III) oxide, plus three moles of carbon monoxide, give −1155.7 kJ.', show: 'm.1', focus: ['m.1', 't.0'] },
        { say: 'Products minus reactants: delta H is negative twenty-four point eight kilojoules. The reaction is slightly exothermic.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Three slips',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Subtract **products − reactants**. The other way round gives the right size with the wrong sign.',
            'Multiply **every** $\\Delta_f H^\\circ$ by its coefficient before adding.',
            'Use the value for the right **state**: $\\ce{H2O(l)}$ $-285.8$ and $\\ce{H2O(g)}$ $-241.8\\ \\text{kJ/mol}$ differ by $44.0\\ \\text{kJ/mol}$.',
          ],
        },
      ],
      lines: [
        { say: 'Three slips are common. First, subtract in the order products minus reactants. The other way round gives the right size, but the wrong sign.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, multiply every enthalpy of formation by its coefficient before adding.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, use the value for the right state. Liquid water and water vapour differ by forty-four kilojoules per mole: the energy absorbed when one mole of liquid water evaporates.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'What the sign says',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta_f H^\\circ(\\ce{CO2(g)}) = -393.5\\ \\text{kJ/mol}', '\\Delta_f H^\\circ(\\ce{C2H2(g)}) = +227.4\\ \\text{kJ/mol}'] },
        { kind: 'callout', id: 'note', tone: 'key', title: 'The sign of an enthalpy of formation', md: 'Negative: the compound is **lower** in enthalpy than its elements. Positive: it holds **more** enthalpy than its elements.' },
      ],
      lines: [
        { say: 'Most compounds have negative enthalpies of formation. Forming them from their elements releases energy, so they are lower in enthalpy than their elements.', show: ['m.0', 'note'], focus: 'm.0' },
        { say: 'A few, such as ethyne, have positive values. Ethyne holds more enthalpy than its elements, which is one reason it burns with such a hot flame.', caption: 'A few, such as ethyne, C₂H₂, have positive values. Ethyne holds more enthalpy than its elements, which is one reason it burns with such a hot flame.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'For $\\ce{C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)}$, $\\Delta_r H^\\circ = -2043.9\\ \\text{kJ}$. Find $\\Delta_f H^\\circ$ of propane, using $-393.5\\ \\text{kJ/mol}$ for $\\ce{CO2(g)}$ and $-241.8\\ \\text{kJ/mol}$ for $\\ce{H2O(g)}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Products: } 3(-393.5) + 4(-241.8) = -2147.7\\ \\text{kJ}',
            '-2043.9 = -2147.7 - x, \\quad x = \\Delta_f H^\\circ(\\ce{C3H8(g)})',
            'x = -2147.7 + 2043.9 = -103.8\\ \\text{kJ/mol}',
          ],
        },
      ],
      lines: [
        { say: 'The same equation can be solved for an unknown enthalpy of formation, once delta H has been measured, usually in a bomb calorimeter.' },
        { say: 'Burning propane has a delta H of negative two thousand forty-three point nine kilojoules. Find the enthalpy of formation of propane.', show: 'q' },
        { say: 'Products: three moles of carbon dioxide and four moles of water vapour give negative two thousand one hundred forty-seven point seven kilojoules.', show: 'm.0', focus: 'm.0' },
        { say: 'Call propane’s value x. Oxygen counts as zero, so delta H equals the products minus x.', show: 'm.1', focus: 'm.1' },
        { say: 'Solving, x equals negative two thousand one hundred forty-seven point seven, plus two thousand forty-three point nine. That is negative one hundred three point eight kilojoules per mole.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'For $\\ce{C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)}$, $\\Delta_r H^\\circ = -1366.8\\ \\text{kJ}$. Using $-393.5\\ \\text{kJ/mol}$ for $\\ce{CO2(g)}$ and $-285.8\\ \\text{kJ/mol}$ for $\\ce{H2O(l)}$, find $\\Delta_f H^\\circ$ of ethanol.',
          choices: ['$+277.6\\ \\text{kJ/mol}$', '$-3011.2\\ \\text{kJ/mol}$', '$-277.6\\ \\text{kJ/mol}$', '$+294.0\\ \\text{kJ/mol}$'],
          answer: 2,
          working: 'Products: $2(-393.5) + 3(-285.8) = -1644.4\\ \\text{kJ}$. Then $-1366.8 = -1644.4 - x$, so $x = -1644.4 + 1366.8 = -277.6\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Burning ethanol has the delta H on the screen. Find the standard enthalpy of formation of ethanol. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C, negative two hundred seventy-seven point six kilojoules per mole. The products add to negative one thousand six hundred forty-four point four, and that minus x equals delta H. Choice A has the right size, but the wrong sign.',
          show: 'q.answer',
        },
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
            'Products **minus** reactants, with **every** coefficient and the right **state** of each substance.',
            'Most compounds have negative $\\Delta_f H^\\circ$: they are lower in enthalpy than their elements.',
            'With a measured $\\Delta_r H^\\circ$, the same equation gives an unknown $\\Delta_f H^\\circ$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subtract products minus reactants, with every coefficient, and the right state of each substance.', show: 'sum.0' },
        { say: 'Most compounds have negative enthalpies of formation: they are lower in enthalpy than their elements.', show: 'sum.1' },
        { say: 'And with a measured delta H, the same equation gives an unknown enthalpy of formation. That completes this lesson. Next, you will look at activation energy and catalysts.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
