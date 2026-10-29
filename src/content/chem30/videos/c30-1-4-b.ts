import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-4-b',
  lessonId: 'c30-1-4',
  title: 'Communicating Enthalpy Changes, Part 2: Molar Enthalpies from an Equation',
  thumbnailTitle: 'Molar Enthalpies from an Equation',
  thumbnail: false,
  summary:
    'ΔrH is the enthalpy change for the equation exactly as written. Divide it by a substance’s coefficient for that substance’s molar enthalpy: for 4NH₃ + 5O₂ → 4NO + 6H₂O, ΔrH = −902.0 kJ gives −225.5 kJ/mol of ammonia, −180.4 kJ/mol of oxygen and −150.3 kJ/mol of water. Multiply by the coefficient to go back: two moles of octane at −5074.1 kJ/mol give ΔrH = −10 148.2 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'Molar Enthalpies from an Equation', subtitle: 'Divide by the coefficient' }],
      lines: [
        { say: 'One reaction can have several molar enthalpies at once: one for each substance in its equation.', show: 'title' },
        { say: 'In this part, you will move between delta r H, for a whole equation, and the molar enthalpy of each substance in it.', caption: 'In this part, you will move between ΔrH, for a whole equation, and the molar enthalpy of each substance in it.' },
      ],
    },
    {
      chapter: 'The equation as written',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'For the equation as written', md: '$\\Delta_r H$ is the enthalpy change for the equation **exactly as written**, with the amounts given by its coefficients.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta_r H_m = \\dfrac{\\Delta_r H}{\\text{coefficient}}', '\\Delta_r H = \\text{coefficient} \\times \\Delta_r H_m'] },
      ],
      lines: [
        {
          say: 'Delta r H is the enthalpy change for the equation exactly as written, with the amounts given by its coefficients.',
          caption: 'ΔrH is the enthalpy change for the equation exactly as written, with the amounts given by its coefficients.',
          show: 'key',
        },
        { say: 'To find the molar enthalpy for one substance, divide delta r H by that substance’s coefficient.', caption: 'To find the molar enthalpy for one substance, divide ΔrH by that substance’s coefficient.', show: 'm.0', focus: 'm.0' },
        { say: 'Going the other way, multiply a molar enthalpy by the coefficient to get delta r H for the equation.', caption: 'Going the other way, multiply a molar enthalpy by the coefficient to get ΔrH for the equation.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One equation, three molar enthalpies',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\ce{4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)}', '\\Delta_r H = -902.0\\ \\text{kJ}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Per mole of', 'Moles in the equation', '$\\Delta_r H_m$ (kJ/mol)'],
          rows: [
            ['ammonia, $\\ce{NH3}$', '$4$', '$-902.0 \\div 4 = -225.5$'],
            ['oxygen, $\\ce{O2}$', '$5$', '$-902.0 \\div 5 = -180.4$'],
            ['water, $\\ce{H2O}$', '$6$', '$-902.0 \\div 6 = -150.3$'],
          ],
        },
      ],
      lines: [
        {
          say: 'Ammonia burns in oxygen to form nitrogen monoxide and water vapour, with delta r H equals negative nine hundred two point zero kilojoules.',
          caption: 'Ammonia burns in oxygen to form nitrogen monoxide and water vapour: 4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g), ΔrH = −902.0 kJ.',
          show: 'eq',
        },
        {
          say: 'That value is for four moles of ammonia, five moles of oxygen and six moles of water. Per mole of ammonia, divide by four: negative two hundred twenty-five point five kilojoules per mole.',
          caption: 'That value is for 4 mol of ammonia, 5 mol of oxygen and 6 mol of water. Per mole of ammonia, divide by 4: −225.5 kJ/mol.',
          show: 't.0',
        },
        { say: 'Per mole of oxygen, divide by five: negative one hundred eighty point four.', caption: 'Per mole of oxygen, divide by 5: −180.4 kJ/mol.', show: 't.1' },
        { say: 'Per mole of water, divide by six: negative one hundred fifty point three.', caption: 'Per mole of water, divide by 6: −150.3 kJ/mol.', show: 't.2' },
        { say: 'One reaction, but a different molar enthalpy for each substance. So always say which substance a molar enthalpy is for.', focus: 't' },
      ],
    },
    {
      chapter: 'From a molar enthalpy to the equation',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'The molar enthalpy of combustion of octane is $-5074.1\\ \\text{kJ/mol}$ (water vapour formed). Write $\\ce{2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(g)}$ with $\\Delta_r H$ beside it, and with an energy term.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\Delta_r H = 2 \\times (-5074.1) = -10\\,148.2\\ \\text{kJ}',
            '\\ce{2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(g)}',
            '\\Delta_r H = -10\\,148.2\\ \\text{kJ}',
            '\\begin{aligned} & \\ce{2C8H18(l) + 25O2(g)} \\\\ & \\qquad \\ce{-> 16CO2(g) + 18H2O(g)} + 10\\,148.2\\ \\text{kJ} \\end{aligned}',
          ],
        },
      ],
      lines: [
        {
          say: 'Now the other way. The molar enthalpy of combustion of octane is negative five thousand seventy-four point one kilojoules per mole, and its equation burns two moles of octane.',
          caption: 'Now the other way. The molar enthalpy of combustion of octane is −5074.1 kJ/mol, and its equation burns two moles of octane.',
          show: 'q',
        },
        {
          say: 'So delta r H is two times negative five thousand seventy-four point one: negative ten thousand one hundred forty-eight point two kilojoules.',
          caption: 'So ΔrH = 2 × (−5074.1) = −10 148.2 kJ.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Written beside the equation, that is delta r H equals negative ten thousand one hundred forty-eight point two kilojoules.', caption: 'Written beside the equation, that is ΔrH = −10 148.2 kJ.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The reaction is exothermic, so as an energy term, ten thousand one hundred forty-eight point two kilojoules goes with the products.', caption: 'The reaction is exothermic, so as an energy term, 10 148.2 kJ goes with the products.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $\\ce{2SO2(g) + O2(g) -> 2SO3(g)}$, $\\Delta_r H = -197.8\\ \\text{kJ}$. What is the molar enthalpy of reaction per mole of $\\ce{SO3}$ that forms?',
          choices: ['$-395.6\\ \\text{kJ/mol}$', '$+98.9\\ \\text{kJ/mol}$', '$-98.9\\ \\text{kJ/mol}$', '$-197.8\\ \\text{kJ/mol}$'],
          answer: 2,
          working: 'The equation forms $2\\ \\text{mol}$ of $\\ce{SO3}$: $\\Delta_r H_m = \\dfrac{-197.8\\ \\text{kJ}}{2\\ \\text{mol}} = -98.9\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. For sulfur dioxide and oxygen forming two moles of sulfur trioxide, delta r H is negative one hundred ninety-seven point eight kilojoules. What is the molar enthalpy per mole of sulfur trioxide? Pause the video and try it.',
          caption: 'Your turn. For 2SO₂(g) + O₂(g) → 2SO₃(g), ΔrH = −197.8 kJ. What is the molar enthalpy per mole of SO₃? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, negative ninety-eight point nine kilojoules per mole. The equation forms two moles of sulfur trioxide, so divide by two, and keep the sign. Choice A multiplies by two instead.',
          caption: 'The answer is C, −98.9 kJ/mol. The equation forms two moles of sulfur trioxide, so divide by two, and keep the sign. Choice A multiplies by two instead.',
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
            '$\\Delta_r H$ is for the equation exactly as written.',
            '$\\Delta_r H_m = \\dfrac{\\Delta_r H}{\\text{coefficient}}$: a different value for each substance.',
            '$\\Delta_r H = \\text{coefficient} \\times \\Delta_r H_m$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Delta r H is for the equation exactly as written.', caption: 'Let’s sum up. ΔrH is for the equation exactly as written.', show: 'sum.0' },
        { say: 'Divide by a substance’s coefficient for its molar enthalpy, which can differ from one substance to the next.', show: 'sum.1' },
        { say: 'And multiply a molar enthalpy by the coefficient to get delta r H. In part three, you will draw and read enthalpy diagrams. See you there!', caption: 'And multiply a molar enthalpy by the coefficient to get ΔrH. In part three, you will draw and read enthalpy diagrams. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
