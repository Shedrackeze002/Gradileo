import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-5-d',
  lessonId: 'c30-1-5',
  title: "Hess's Law, Part 4: Three Equations and Fractions",
  thumbnailTitle: 'Three Equations and Fractions',
  thumbnail: false,
  summary:
    "Three equations combine in the same way. From the combustions of carbon, hydrogen and methane, C(s) + 2H₂(g) → CH₄(g) has ΔH = −393.5 − 571.6 + 890.5 = −74.6 kJ. Equations can be multiplied by fractions: steam over hot coke, C(s) + H₂O(g) → CO(g) + H₂(g), has ΔH = +131.3 kJ. Before adding the enthalpy changes, check that the equations add up to exactly the target.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Three Equations and Fractions', subtitle: "Hess's law with combustion data" }],
      lines: [
        { say: 'Methane does not form cleanly from carbon and hydrogen, so its delta H cannot be measured that way. But carbon, hydrogen and methane all burn easily, and their combustions can be measured in a bomb calorimeter.', show: 'title' },
        { say: 'In this part, you will combine three equations, including some multiplied by fractions.' },
      ],
    },
    {
      chapter: 'Methane from its elements',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Target: $\\ce{C(s) + 2H2(g) -> CH4(g)}$' },
        {
          kind: 'table',
          id: 'g',
          head: ['', 'Given equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['(1)', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
            ['(2)', '$\\ce{H2(g) + 1/2 O2(g) -> H2O(l)}$', '$-285.8$'],
            ['(3)', '$\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$', '$-890.5$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['(1)\\ \\text{keep;}\\quad (2)\\ {\\times}\\, 2\\text{;}\\quad (3)\\ \\text{reverse}'] },
      ],
      lines: [
        {
          say: 'The target is carbon and two moles of hydrogen forming methane. Here are the three combustions.',
          caption: 'The target is C(s) + 2H₂(g) → CH₄(g). Here are the three combustions.',
          show: ['q', 'g'],
        },
        { say: 'Carbon is a reactant in equation one, as in the target, so keep equation one.', focus: 'g.0' },
        { say: 'The target has two moles of hydrogen, but equation two has one, so multiply equation two by two. Its delta H becomes negative five hundred seventy-one point six kilojoules.', focus: 'g.1' },
        { say: 'Methane is a product in the target, but a reactant in equation three, so reverse it. Its delta H becomes positive eight hundred ninety point five kilojoules.', show: 'm', focus: ['g.2', 'm'] },
      ],
    },
    {
      chapter: 'Adding three equations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['(1) as given', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
            ['(2) $\\times\\, 2$', '$\\ce{2H2(g) + O2(g) -> 2H2O(l)}$', '$-571.6$'],
            ['(3) reversed', '$\\ce{CO2(g) + 2H2O(l) -> CH4(g) + 2O2(g)}$', '$+890.5$'],
            ['sum', '$\\ce{C(s) + 2H2(g) -> CH4(g)}$', '$-74.6$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CO2},\\ \\ce{2H2O}\\ \\text{and}\\ \\ce{2O2}\\ \\text{cancel}', '\\Delta_r H = -393.5 - 571.6 + 890.5 = -74.6\\ \\text{kJ}'] },
      ],
      lines: [
        { say: 'Write the three arranged equations one above the other.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Carbon dioxide cancels, and so does the water. Oxygen: one mole in equation one and one mole in equation two make two moles, which cancel the two moles made in equation three.', show: 'm.0', focus: 'm.0' },
        { say: 'What is left is the target. Its delta H is the sum of the three: negative seventy-four point six kilojoules.', show: ['t.3', 'm.1'], focus: ['t.3', 'm.1'] },
      ],
    },
    {
      chapter: 'Fractions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Target: $\\ce{C(s) + H2O(g) -> CO(g) + H2(g)}$' },
        {
          kind: 'table',
          id: 'g',
          head: ['', 'Given equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['(1)', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
            ['(2)', '$\\ce{2CO(g) + O2(g) -> 2CO2(g)}$', '$-566.0$'],
            ['(3)', '$\\ce{2H2(g) + O2(g) -> 2H2O(g)}$', '$-483.6$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['(1)\\ \\text{keep;}\\quad (2)\\ \\text{reverse,}\\ {\\times}\\,\\tfrac{1}{2}\\text{;}\\quad (3)\\ \\text{reverse,}\\ {\\times}\\,\\tfrac{1}{2}'] },
      ],
      lines: [
        {
          say: 'Fractions work in the same way. When steam is passed over hot coke, a form of carbon, it makes a fuel gas of carbon monoxide and hydrogen.',
          caption: 'Fractions work in the same way. When steam is passed over hot coke, a form of carbon, it makes a fuel gas: C(s) + H₂O(g) → CO(g) + H₂(g).',
          show: ['q', 'g'],
        },
        { say: 'Keep equation one, for the carbon.', focus: 'g.0' },
        { say: 'The target makes one mole of carbon monoxide, but equation two uses two moles. So reverse it, and multiply it by one half: positive two hundred eighty-three kilojoules.', focus: 'g.1' },
        { say: 'The target uses one mole of steam, but equation three makes two moles of it. So reverse this one as well, and multiply it by one half: positive two hundred forty-one point eight kilojoules.', show: 'm', focus: ['g.2', 'm'] },
      ],
    },
    {
      chapter: 'Check before you add',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['(1) as given', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
            ['(2) reversed, $\\times\\, \\tfrac{1}{2}$', '$\\ce{CO2(g) -> CO(g) + 1/2 O2(g)}$', '$+283.0$'],
            ['(3) reversed, $\\times\\, \\tfrac{1}{2}$', '$\\ce{H2O(g) -> H2(g) + 1/2 O2(g)}$', '$+241.8$'],
            ['sum', '$\\ce{C(s) + H2O(g) -> CO(g) + H2(g)}$', '$+131.3$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta_r H = -393.5 + 283.0 + 241.8 = +131.3\\ \\text{kJ}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check before you add', md: 'Add the equations and cross out what cancels. If what is left is not exactly the target, a direction or a multiplier is wrong.' },
      ],
      lines: [
        { say: 'Add the arranged equations. Carbon dioxide cancels, and the one mole of oxygen used in equation one cancels the two half moles that are made.', show: ['t.0', 't.1', 't.2', 't.3'], focus: 't.3' },
        { say: 'So delta H is positive one hundred thirty-one point three kilojoules. The reaction is endothermic, so the coke must be kept hot.', show: 'm', focus: 'm' },
        { say: 'Here is a tip. Before adding the enthalpy changes, add the equations and cross out what cancels. If what is left is not exactly the target, a direction or a multiplier is wrong.', show: 'tip', focus: 't' },
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
            'Find $\\Delta_r H$ for $\\ce{2C(s) + H2(g) -> C2H2(g)}$ from these equations: $\\begin{array}{llr} (1) & \\ce{C(s) + O2(g) -> CO2(g)} & -393.5\\ \\text{kJ} \\\\ (2) & \\ce{H2(g) + 1/2 O2(g) -> H2O(l)} & -285.8\\ \\text{kJ} \\\\ (3) & \\ce{2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(l)} & -2600.4\\ \\text{kJ} \\end{array}$',
          choices: ['$+227.4\\ \\text{kJ}$', '$+1527.6\\ \\text{kJ}$', '$+620.9\\ \\text{kJ}$', '$-2373.0\\ \\text{kJ}$'],
          answer: 0,
          working: '(1) $\\times\\, 2$: $-787.0\\ \\text{kJ}$. (2) as given: $-285.8\\ \\text{kJ}$. (3) reversed and $\\times\\, \\tfrac{1}{2}$: $+1300.2\\ \\text{kJ}$. $\\Delta_r H = -787.0 - 285.8 + 1300.2 = +227.4\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Find delta H for carbon and hydrogen forming ethyne, using the three equations on the screen. Pause the video and try it.',
          caption: 'Your turn. Find ΔH for carbon and hydrogen forming ethyne, C₂H₂, using the three equations on the screen. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is A, positive two hundred twenty-seven point four kilojoules. Multiply equation one by two, keep equation two, and reverse equation three and multiply it by one half. Choice B forgets the one half.', show: 'q.answer' },
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
            'Three equations combine in the same way: reverse and multiply each to match the target, then add.',
            'Fractions such as $\\tfrac{1}{2}$ are allowed, and multiply $\\Delta H$ in the same way.',
            'Check that the equations add up to **exactly** the target before adding the $\\Delta H$ values.',
            "Hess's law finds $\\Delta H$ for reactions that are hard to measure, from ones that can be, such as combustions.",
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Three equations combine in the same way: reverse and multiply each one to match the target, then add.', show: 'sum.0' },
        { say: 'Fractions are allowed, and multiply delta H in the same way.', show: 'sum.1' },
        { say: 'Check that the equations add up to exactly the target before adding the enthalpy changes.', show: 'sum.2' },
        { say: "So Hess's law finds delta H for hard reactions from easy ones, such as combustions. That completes this lesson. Next, you will use enthalpies of formation to find delta H for almost any reaction.", show: 'sum.3' },
      ],
    },
  ],
};

export default video;
