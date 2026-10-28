import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-2-b',
  lessonId: 'c30-4-2',
  title: 'The Equilibrium Constant, Part 2: Solids, Liquids and the Size of K',
  thumbnailTitle: 'Solids, Liquids and the Size of K',
  thumbnail: false,
  summary:
    'Pure solids and pure liquids, including water as the solvent, have constant concentrations, so they are left out of the equilibrium law expression: for CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kc = [CO₂]. A Kc much greater than 1 means products are favoured, and much less than 1 means reactants are favoured. Reversing an equation inverts Kc, and multiplying its coefficients by n raises Kc to the power n.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'Solids, Liquids and the Size of K', subtitle: 'What goes in, and what K tells you' }],
      lines: [
        { say: 'Heat calcium carbonate in a closed container, and it reaches equilibrium with calcium oxide and carbon dye-oxide gas. Yet only one of the three appears in its equilibrium constant.', caption: 'Heat calcium carbonate in a closed container, and it reaches equilibrium with calcium oxide and carbon dioxide gas. Yet only one of the three appears in its equilibrium constant.', show: 'title' },
        { say: 'In this part, you will see what to leave out of the expression, and what the size of K C tells you.', caption: 'In this part, you will see what to leave out of the expression, and what the size of Kc tells you.' },
      ],
    },
    {
      chapter: 'Pure solids and liquids',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'What appears in K', md: 'Gases, $(g)$, and dissolved particles, $(aq)$, appear in the expression. **Pure solids, $(s)$, and pure liquids, $(l)$, are left out**, including water when it is the solvent.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CaCO3(s) <=> CaO(s) + CO2(g)} \\qquad K_c = [\\ce{CO2}]', '\\ce{CH3COOH(aq) + H2O(l) <=> H3O+(aq) + CH3COO-(aq)}', 'K_c = \\dfrac{[\\ce{H3O+}][\\ce{CH3COO-}]}{[\\ce{CH3COOH}]}'] },
      ],
      lines: [
        { say: 'The concentration of a pure solid cannot change: a lump of calcium carbonate has the same moles per litre of solid, however big it is. So does a pure liquid.' },
        { say: 'Because these concentrations are constant, they are left out of the expression: they are absorbed into the value of K C. Gases and dissolved particles stay in.', caption: 'Because these concentrations are constant, they are left out of the expression: they are absorbed into the value of Kc. Gases and dissolved particles stay in.', show: 'def' },
        { say: 'For calcium carbonate, both solids are left out. Only carbon dye-oxide gas remains, on top, and nothing is left for the bottom. So K C equals the concentration of carbon dye-oxide.', caption: 'For calcium carbonate, both solids are left out. Only carbon dioxide gas remains, on top, and nothing is left for the bottom. So Kc = [CO₂].', show: 'm.0', focus: 'm.0' },
        { say: 'Now acetic acid in water. Water is the solvent, a pure liquid, so it is left out too.', show: 'm.1', focus: 'm.1' },
        { say: 'K C is the concentration of H three O plus times the concentration of the acetate ion, over the concentration of acetic acid.', caption: 'Kc is [H₃O⁺] times [CH₃COO⁻], over [CH₃COOH].', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'What the size of K tells you',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Value of $K_c$', 'At equilibrium'],
          rows: [
            ['$K_c \\gg 1$ (such as $10^{5}$)', 'Mostly products: **products are favoured**.'],
            ['$K_c \\approx 1$', 'Significant amounts of both.'],
            ['$K_c \\ll 1$ (such as $10^{-5}$)', 'Mostly reactants: **reactants are favoured**.'],
          ],
        },
      ],
      lines: [
        { say: 'Products are on top, so when K C is much greater than one, such as ten to the fifth, the mixture is mostly products: products are favoured.', caption: 'Products are on top, so when Kc is much greater than one, such as 10⁵, the mixture is mostly products: products are favoured.', show: 'tb.0' },
        { say: 'Near one, there are significant amounts of both. Much less than one, such as ten to the minus five, means mostly reactants: reactants are favoured.', caption: 'Near one, there are significant amounts of both. Much less than one, such as 10⁻⁵, means mostly reactants: reactants are favoured.', show: ['tb.1', 'tb.2'] },
      ],
    },
    {
      chapter: 'Related equations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'r', size: 'md', lines: ['\\text{Reversed: } K_c\' = \\dfrac{1}{K_c} \\qquad \\text{Coefficients} \\times n\\text{: } K_c\' = K_c^{\\,n}'] },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{2SO2(g) + O2(g) <=> 2SO3(g)} \\qquad K_c = 2.5 \\times 10^{2}', '\\ce{2SO3(g) <=> 2SO2(g) + O2(g)}', 'K_c\' = \\dfrac{1}{2.5 \\times 10^{2}} = 4.0 \\times 10^{-3}'],
        },
      ],
      lines: [
        { say: 'Writing the equation differently changes K C predictably. Reversing it turns the expression upside down, so the new constant is one over the old one.', caption: 'Writing the equation differently changes Kc predictably. Reversing it turns the expression upside down, so the new constant is one over the old one.', show: 'r', focus: 'r' },
        { say: 'Multiplying every coefficient by a number n multiplies every power by n, so the new constant is the old one to the power n. Doubling the coefficients squares it.' },
        { say: 'At a certain temperature, the sulfur trioxide reaction has K C equal to two point five times ten squared, or two hundred fifty: much greater than one, so products are favoured.', caption: 'At a certain temperature, 2SO₂ + O₂ ⇌ 2SO₃ has Kc = 2.5 × 10², or 250: much greater than one, so products are favoured.', show: 'm.0', focus: 'm.0' },
        { say: 'The reversed equation has K C equal to one over two hundred fifty: four point zero times ten to the minus three. Much less than one, as expected for the reverse reaction.', caption: 'The reversed equation has Kc′ = 1 / 250 = 4.0 × 10⁻³. Much less than one, as expected for the reverse reaction.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the equilibrium law expression for $\\ce{C(s) + H2O(g) <=> CO(g) + H2(g)}$?',
          choices: ['$K_c = \\dfrac{[\\ce{CO}][\\ce{H2}]}{[\\ce{C}][\\ce{H2O}]}$', '$K_c = \\dfrac{[\\ce{H2O}]}{[\\ce{CO}][\\ce{H2}]}$', '$K_c = \\dfrac{[\\ce{CO}][\\ce{H2}]}{[\\ce{H2O}]}$', '$K_c = [\\ce{CO}][\\ce{H2}]$'],
          answer: 2,
          working: 'Carbon is a pure solid, so it is left out. The water is steam, $\\ce{H2O(g)}$, a gas, so it stays in, on the bottom.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the equilibrium law expression for solid carbon plus steam, in equilibrium with carbon monoxide and hydrogen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Carbon is a pure solid, so it is left out. But the water here is steam, a gas, so it stays in. Choice D leaves out the steam, and choice A keeps the solid.', show: 'q.answer' },
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
            'Leave **pure solids and pure liquids** out of the expression, including water as the solvent.',
            '$K_c \\gg 1$: products favoured. $K_c \\ll 1$: reactants favoured.',
            'Reversing an equation inverts $K_c$; multiplying the coefficients by $n$ raises it to the power $n$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Leave pure solids and pure liquids out of the expression, including water as the solvent.', show: 'sum.0' },
        { say: 'A K C much greater than one means products are favoured, and much less than one means reactants are favoured.', caption: 'A Kc much greater than one means products are favoured, and much less than one means reactants are favoured.', show: 'sum.1' },
        { say: 'Reversing an equation inverts K C. In part three, you will calculate K C from concentrations, using ICE tables. See you there!', caption: 'Reversing an equation inverts Kc. In part three, you will calculate Kc from concentrations, using ICE tables. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
