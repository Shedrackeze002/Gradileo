import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-6',
  lessonId: 'c30-4-6',
  title: 'Ka and Kb, Part 1: The Ionisation Constants',
  thumbnailTitle: 'The Ionisation Constants',
  thumbnail: false,
  summary:
    'A weak acid ionises only partly in water, so its ionisation is an equilibrium with a constant: Ka = [H₃O⁺][A⁻]/[HA], leaving out water, and the larger Ka, the stronger the acid. A weak base takes a proton from water, and Kb = [HB⁺][OH⁻]/[B]: for ammonia, Kb = [NH₄⁺][OH⁻]/[NH₃]. Every Kb expression has the hydroxide ion on top.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'The Ionisation Constants', subtitle: 'Measuring the strength of a weak acid or base' }],
      lines: [
        { say: 'Acetic acid in vinegar and hydrochloric acid in a laboratory bottle can have the same concentration. Yet one is safe to sprinkle on food, and the other burns skin.', show: 'title' },
        { say: 'Among weak acids, strength varies a million-fold, and chemists measure it with an equilibrium constant.' },
        {
          say: 'This part writes the acid and base ionisation constants, K A and K B. Part two links them through water, and part three uses them to compare acids and bases.',
          caption: 'This part writes the acid and base ionisation constants, Ka and Kb. Part two links them through water, and part three uses them to compare acids and bases.',
        },
      ],
    },
    {
      chapter: 'The acid ionisation constant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HA(aq) + H2O(l) <=> H3O+(aq) + A-(aq)}', 'K_a = \\dfrac{[\\ce{H3O+}][\\ce{A-}]}{[\\ce{HA}]}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Acid', '$K_a$ at $25^\\circ\\text{C}$', 'Strength'],
          rows: [
            ['hydrofluoric acid, $\\ce{HF}$', '$6.6 \\times 10^{-4}$', 'strongest of these three'],
            ['acetic acid, $\\ce{CH3COOH}$', '$1.8 \\times 10^{-5}$', ''],
            ['hydrocyanic acid, $\\ce{HCN}$', '$6.2 \\times 10^{-10}$', 'weakest of these three'],
          ],
        },
      ],
      lines: [
        {
          say: 'A weak acid, H A, ionises only partly in water. Its ionisation is an equilibrium, so it has an equilibrium constant.',
          caption: 'A weak acid, HA, ionises only partly in water. Its ionisation is an equilibrium, so it has an equilibrium constant.',
          show: 'm.0',
        },
        {
          say: 'The acid ionisation constant, K A, is the hydronium ion concentration times the concentration of A minus, over the concentration of H A.',
          caption: 'The acid ionisation constant, Ka, is the hydronium ion concentration times the concentration of A⁻, over the concentration of HA.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Water is the solvent, a pure liquid, so it is left out, as in lesson four point two.', caption: 'Water is the solvent, a pure liquid, so it is left out, as in lesson 4.2.' },
        {
          say: 'The larger K A is, the more the acid ionises, and the stronger it is. Of these three acids, hydrofluoric acid is the strongest, and hydrocyanic acid the weakest.',
          caption: 'The larger Ka is, the more the acid ionises, and the stronger it is. Of these three acids, hydrofluoric acid is the strongest, and hydrocyanic acid the weakest.',
          show: 't',
        },
      ],
    },
    {
      chapter: 'Nitrous acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write the equation for the ionisation of nitrous acid, $\\ce{HNO2}$, in water, and its $K_a$ expression.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HNO2(aq) + H2O(l) <=> H3O+(aq) + NO2-(aq)}', 'K_a = \\dfrac{[\\ce{H3O+}][\\ce{NO2-}]}{[\\ce{HNO2}]}'] },
      ],
      lines: [
        {
          say: 'Try nitrous acid, H N O two. It gives a proton to water, forming hydronium ions and nitrite ions.',
          caption: 'Try nitrous acid, HNO₂. It gives a proton to water, forming hydronium ions and nitrite ions.',
          show: ['q', 'm.0'],
          focus: 'm.0',
        },
        {
          say: 'Products over reactants, leaving out liquid water: K A is the hydronium times the nitrite concentration, over the nitrous acid concentration.',
          caption: 'Products over reactants, leaving out liquid water: Ka is the hydronium times the nitrite concentration, over the nitrous acid concentration.',
          show: 'm.1',
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'The base ionisation constant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{B(aq) + H2O(l) <=> HB+(aq) + OH-(aq)}', 'K_b = \\dfrac{[\\ce{HB+}][\\ce{OH-}]}{[\\ce{B}]}'] },
        { kind: 'callout', id: 'ex', tone: 'tip', title: 'Weak bases', md: 'Molecules such as ammonia, $\\ce{NH3}$, and the anions of weak acids, such as $\\ce{F-}$, $\\ce{CH3COO-}$ and $\\ce{CN-}$.' },
      ],
      lines: [
        { say: 'A weak base, B, takes a proton from water, making its conjugate acid and hydroxide ions.', show: 'm.0' },
        {
          say: 'Its base ionisation constant, K B, is the conjugate acid concentration times the hydroxide concentration, over the base concentration. The larger K B is, the stronger the base.',
          caption: 'Its base ionisation constant, Kb, is the conjugate acid concentration times the hydroxide concentration, over the base concentration. The larger Kb is, the stronger the base.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Weak bases include molecules such as ammonia, and the anions of weak acids, such as the fluoride, acetate and cyanide ions.', show: 'ex' },
      ],
    },
    {
      chapter: 'Ammonia and cyanide',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{NH3(aq) + H2O(l) <=> NH4+(aq) + OH-(aq)}',
            'K_b = \\dfrac{[\\ce{NH4+}][\\ce{OH-}]}{[\\ce{NH3}]}',
            '\\ce{CN-(aq) + H2O(l) <=> HCN(aq) + OH-(aq)}',
            'K_b = \\dfrac{[\\ce{HCN}][\\ce{OH-}]}{[\\ce{CN-}]}',
          ],
        },
      ],
      lines: [
        {
          say: 'Ammonia takes a proton from water, forming ammonium ions and hydroxide ions. K B is the ammonium times the hydroxide concentration, over the ammonia concentration.',
          caption: 'Ammonia takes a proton from water, forming ammonium ions and hydroxide ions. Kb is the ammonium times the hydroxide concentration, over the ammonia concentration.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        {
          say: 'The cyanide ion does the same, forming hydrocyanic acid. K B is the hydrocyanic acid times the hydroxide concentration, over the cyanide concentration.',
          caption: 'The cyanide ion does the same, forming hydrocyanic acid. Kb is the hydrocyanic acid times the hydroxide concentration, over the cyanide concentration.',
          show: ['m.2', 'm.3'],
          focus: 'm.3',
        },
      ],
    },
    {
      chapter: 'Hydroxide, not hydronium',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Hydroxide, not hydronium', md: 'A base in water makes $\\ce{OH-}$ ions, so $[\\ce{OH-}]$ belongs in every $K_b$ expression. Do not write $[\\ce{H3O+}]$, or put $[\\ce{H2O}]$ on the bottom.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{K_b = \\dfrac{[\\ce{NH4+}][\\ce{H3O+}]}{[\\ce{NH3}]}} \\qquad \\good{K_b = \\dfrac{[\\ce{NH4+}][\\ce{OH-}]}{[\\ce{NH3}]}}'] },
      ],
      lines: [
        {
          say: 'A base in water makes hydroxide ions, so the hydroxide concentration belongs in every K B expression.',
          caption: 'A base in water makes hydroxide ions, so the hydroxide concentration belongs in every Kb expression.',
          show: ['oops', 'm'],
        },
        { say: 'Writing the hydronium ion instead, or putting water on the bottom, is a common slip.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the base ionisation constant expression, $K_b$, for the fluoride ion, $\\ce{F-}$, acting as a base in water?',
          choices: [
            '$K_b = \\dfrac{[\\ce{HF}][\\ce{OH-}]}{[\\ce{F-}]}$',
            '$K_b = \\dfrac{[\\ce{HF}][\\ce{H3O+}]}{[\\ce{F-}]}$',
            '$K_b = \\dfrac{[\\ce{F-}]}{[\\ce{HF}][\\ce{OH-}]}$',
            '$K_b = \\dfrac{[\\ce{HF}][\\ce{OH-}]}{[\\ce{F-}][\\ce{H2O}]}$',
          ],
          answer: 0,
          working: '$\\ce{F-(aq) + H2O(l) <=> HF(aq) + OH-(aq)}$. Products over reactants, leaving out liquid water.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Which is the K B expression for the fluoride ion, acting as a base in water? Pause the video and try it.',
          caption: 'Your turn. Which is the Kb expression for the fluoride ion, acting as a base in water? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A. The fluoride ion takes a proton from water, forming hydrofluoric acid and hydroxide ions, and water is left out. Choice B has the hydronium ion, and choice D keeps water.',
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
            '$K_a = \\dfrac{[\\ce{H3O+}][\\ce{A-}]}{[\\ce{HA}]}$ for $\\ce{HA + H2O <=> H3O+ + A-}$.',
            '$K_b = \\dfrac{[\\ce{HB+}][\\ce{OH-}]}{[\\ce{B}]}$ for $\\ce{B + H2O <=> HB+ + OH-}$.',
            'Water is left out of both. A larger $K_a$ or $K_b$ means a stronger acid or base.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. K A is the equilibrium constant for the ionisation of an acid in water: products over reactants.',
          caption: 'Let’s sum up. Ka is the equilibrium constant for the ionisation of an acid in water: products over reactants.',
          show: 'sum.0',
        },
        {
          say: 'K B is the same for a base taking a proton from water, and it always has the hydroxide ion on top.',
          caption: 'Kb is the same for a base taking a proton from water, and it always has the hydroxide ion on top.',
          show: 'sum.1',
        },
        {
          say: 'Water is left out of both, and the larger the constant, the stronger the acid or base. In part two, you will see how K A and K B are linked. See you there!',
          caption: 'Water is left out of both, and the larger the constant, the stronger the acid or base. In part two, you will see how Ka and Kb are linked. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
