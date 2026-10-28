import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-1-5-c',
  lessonId: 'c30-1-5',
  title: "Hess's Law, Part 3: Combining Two Equations",
  thumbnailTitle: 'Combining Two Equations',
  thumbnail: false,
  summary:
    "Five steps combine thermochemical equations with Hess's law: find each substance of the target in the given equations, reverse an equation if a substance is on the wrong side, multiply to match the coefficients, add the equations so everything else cancels, and add the enthalpy changes. From C(s) + O₂(g) → CO₂(g) (−393.5 kJ) and CO(g) + ½O₂(g) → CO₂(g) (−283.0 kJ), carbon burning to carbon monoxide has ΔH = −110.5 kJ.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'Combining Two Equations', subtitle: 'Five steps to a target equation' }],
      lines: [
        { say: 'In the last part, the enthalpy changes added up because the equations added up. But given equations rarely add up as they stand: some must be turned around or multiplied first.', show: 'title' },
        { say: 'In this part, you will learn five steps for combining equations, and use them to find delta H for carbon burning to carbon monoxide.' },
      ],
    },
    {
      chapter: 'Five steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**1. Find** each substance of the target in the given equations. Start with one that appears in only one of them.',
            '**2. Reverse** an equation if that substance is on the wrong side, and change the sign of its $\\Delta H$.',
            '**3. Multiply** the equation so the coefficient matches the target, and multiply its $\\Delta H$ too.',
            '**4. Add** the equations. What appears on both sides cancels; what is left must be the target.',
            '**5. Add** the enthalpy changes.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the steps. First, find each substance of the target equation in the given equations. Start with one that appears in only one of them, because then there is only one way to place it.', show: 's.0', focus: 's.0' },
        { say: 'Second, if that substance is on the wrong side, reverse the equation, and change the sign of its delta H.', show: 's.1', focus: 's.1' },
        { say: 'Third, multiply the equation so that the coefficient matches the target, and multiply its delta H by the same number.', show: 's.2', focus: 's.2' },
        { say: 'Fourth, add the equations. Substances that appear on both sides cancel, and what is left must be the target equation.', show: 's.3', focus: 's.3' },
        { say: 'Fifth, add the enthalpy changes.', show: 's.4', focus: 's.4' },
      ],
    },
    {
      chapter: 'Arranging the equations',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Target: $\\ce{C(s) + 1/2 O2(g) -> CO(g)}$' },
        {
          kind: 'table',
          id: 'g',
          head: ['', 'Given equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['(1)', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
            ['(2)', '$\\ce{CO(g) + 1/2 O2(g) -> CO2(g)}$', '$-283.0$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['(1)\\ \\text{keep}', '(2)\\ \\text{reverse: } {+283.0}\\ \\text{kJ}'] },
      ],
      lines: [
        {
          say: 'Find delta H for carbon burning to carbon monoxide, from these two equations that can be measured.',
          caption: 'Find ΔH for carbon burning to carbon monoxide, C(s) + ½O₂(g) → CO(g), from these two equations that can be measured.',
          show: ['q', 'g'],
        },
        { say: 'Carbon appears only in equation one, as a reactant, just as in the target. So keep equation one as it is.', show: 'm.0', focus: ['g.0', 'm.0'] },
        { say: 'Carbon monoxide appears only in equation two, as a reactant. In the target it is a product, so reverse equation two. Its delta H becomes positive two hundred eighty-three kilojoules.', show: 'm.1', focus: ['g.1', 'm.1'] },
        { say: 'Carbon and carbon monoxide each have a coefficient of one, as in the target, so no multiplying is needed.', focus: 'm' },
      ],
    },
    {
      chapter: 'Adding the equations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['(1) as given', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
            ['(2) reversed', '$\\ce{CO2(g) -> CO(g) + 1/2 O2(g)}$', '$+283.0$'],
            ['sum', '$\\ce{C(s) + 1/2 O2(g) -> CO(g)}$', '$-110.5$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CO2(g)}\\ \\text{cancels;}\\quad \\ce{O2(g)}\\text{: } 1 - \\tfrac{1}{2} = \\tfrac{1}{2}\\ \\text{mol on the left}', '\\Delta_r H = -393.5 + 283.0 = -110.5\\ \\text{kJ}'] },
      ],
      lines: [
        { say: 'Write the arranged equations one above the other: equation one as given, and equation two reversed.', show: ['t.0', 't.1'] },
        { say: 'Now add them. Carbon dioxide is made in one and used in the other, so it cancels. One mole of oxygen is used and half a mole is made, which leaves half a mole on the reactant side.', show: 'm.0', focus: 'm.0' },
        { say: 'What is left is exactly the target equation.', show: 't.2', focus: 't.2' },
        {
          say: 'So add the enthalpy changes. Negative three hundred ninety-three point five, plus two hundred eighty-three, is negative one hundred ten point five kilojoules: the same as the first step on the diagram in part two.',
          show: 'm.1',
          focus: 'm.1',
        },
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
            'Find $\\Delta_r H$ for $\\ce{CuO(s) + H2(g) -> Cu(s) + H2O(g)}$ from these equations: $\\begin{array}{llr} (1) & \\ce{Cu(s) + 1/2 O2(g) -> CuO(s)} & -157.3\\ \\text{kJ} \\\\ (2) & \\ce{H2(g) + 1/2 O2(g) -> H2O(g)} & -241.8\\ \\text{kJ} \\end{array}$',
          choices: ['$-399.1\\ \\text{kJ}$', '$+84.5\\ \\text{kJ}$', '$+399.1\\ \\text{kJ}$', '$-84.5\\ \\text{kJ}$'],
          answer: 3,
          working: '$\\ce{CuO(s)}$ is a reactant in the target but a product in (1): reverse (1), $+157.3\\ \\text{kJ}$. Keep (2). $\\ce{O2}$ cancels, and $\\Delta_r H = +157.3 + (-241.8) = -84.5\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Find delta H for copper two oxide reacting with hydrogen to form copper and water vapour, using the two equations on the screen. Pause the video and try it.',
          caption: 'Your turn. Find ΔH for copper(II) oxide reacting with hydrogen to form copper and water vapour, using the two equations on the screen. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, negative eighty-four point five kilojoules. Copper two oxide is a product in equation one, so reverse it, which makes its delta H positive. Keep equation two, and add. Choice A forgets to reverse equation one.',
          caption: 'The answer is D, −84.5 kJ. Copper(II) oxide is a product in equation one, so reverse it, which makes its ΔH positive. Keep equation two, and add. Choice A forgets to reverse equation one.',
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
            'Find each substance of the **target** in the given equations, starting with one that appears only once.',
            '**Reverse** or **multiply** each equation to match the target, and change its $\\Delta H$ to match.',
            'Add the equations so that everything else cancels, then add the $\\Delta H$ values.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find each substance of the target in the given equations, starting with one that appears only once.', show: 'sum.0' },
        { say: 'Reverse or multiply each equation to match the target, and change its delta H to match.', show: 'sum.1' },
        { say: 'Then add the equations so that everything else cancels, and add the enthalpy changes. In part four, you will combine three equations, some multiplied by fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
