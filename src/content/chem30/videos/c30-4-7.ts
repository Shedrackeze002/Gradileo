import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-7',
  lessonId: 'c30-4-7',
  title: 'pH of Weak Acids and Bases, Part 1: The pH of a Weak Acid',
  thumbnailTitle: 'The pH of a Weak Acid',
  thumbnail: false,
  summary:
    'A weak acid ionises only partly, so its pH comes from the equilibrium: an ICE table gives Ka = x²/(c − x), with x = [H₃O⁺]. When little ionises (c more than 1000 times Ka), c − x ≈ c and [H₃O⁺] = √(Ka c): 0.100 mol/L acetic acid, with Ka = 1.8 × 10⁻⁵, has [H₃O⁺] = 1.34 × 10⁻³ mol/L and a pH of 2.87.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'The pH of a Weak Acid', subtitle: 'An ICE table and one good approximation' }],
      lines: [
        {
          say: 'Vinegar is roughly zero point eight moles per litre acetic acid, yet its p H is about two point four. Hydrochloric acid at the same concentration would have a p H of about zero point one.',
          caption: 'Vinegar is roughly 0.8 mol/L acetic acid, yet its pH is about 2.4. Hydrochloric acid at the same concentration would have a pH of about 0.1.',
          show: 'title',
        },
        { say: 'That is about two hundred times as much hydronium ion, because a weak acid ionises only partly.' },
        {
          say: 'This part finds the p H of a weak acid from its equilibrium. Later parts do weak bases, salts, and more.',
          caption: 'This part finds the pH of a weak acid from its equilibrium. Later parts do weak bases, salts, and more.',
        },
      ],
    },
    {
      chapter: 'Setting up',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', '$[\\ce{HA}]$', '$[\\ce{H3O+}]$', '$[\\ce{A-}]$'],
          rows: [
            ['Initial', '$c$', '$0$', '$0$'],
            ['Change', '$-x$', '$+x$', '$+x$'],
            ['Equilibrium', '$c - x$', '$x$', '$x$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['K_a = \\dfrac{[\\ce{H3O+}][\\ce{A-}]}{[\\ce{HA}]} = \\dfrac{x^2}{c - x}'] },
      ],
      lines: [
        {
          say: 'For a weak acid, H A, with an initial concentration c, an ICE table gives the equilibrium concentrations, with x for the hydronium ion concentration.',
          caption: 'For a weak acid, HA, with an initial concentration c, an ICE table gives the equilibrium concentrations, with x for [H₃O⁺].',
          show: 't.0',
        },
        {
          say: 'At first there is no hydronium ion and no A minus. Then x of the acid ionises, making x of each.',
          caption: 'At first there is no H₃O⁺ and no A⁻. Then x of the acid ionises, making x of each.',
          show: ['t.1', 't.2'],
          focus: 't.2',
        },
        {
          say: 'Pure water holds a tiny one point zero times ten to the minus seven moles per litre of hydronium ion, too little to matter here.',
          caption: 'Pure water holds a tiny 1.0 × 10⁻⁷ mol/L of H₃O⁺, too little to matter here.',
        },
        {
          say: 'Substituting into the K A expression gives x squared over c minus x.',
          caption: 'Substituting into the Ka expression gives x² over (c − x).',
          show: 'm',
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'The approximation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['c - x \\approx c', 'K_a \\approx \\dfrac{x^2}{c} \\quad\\text{so}\\quad x = [\\ce{H3O+}] = \\sqrt{K_ac}'] },
        {
          kind: 'callout',
          id: 'rule',
          tone: 'definition',
          title: 'When to use it',
          md: 'Taking $c - x \\approx c$ works well when $c$ is more than $1000$ times $K_a$: then less than about 3% ionises, and the pH comes out within $0.01$ of the exact value. Questions say when to use it.',
        },
      ],
      lines: [
        {
          say: 'For most weak acids, so little ionises that x is tiny compared with c. Then c minus x is about c, and x is simply the square root of K A times c.',
          caption: 'For most weak acids, so little ionises that x is tiny compared with c. Then c − x ≈ c, and x is simply the square root of Ka times c.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        {
          say: 'As a rule, this works when c is more than one thousand times K A: less than about three percent ionises, and the p H is within zero point zero one. Questions say when to use it.',
          caption: 'As a rule, this works when c is more than 1000 times Ka: less than about 3% ionises, and the pH is within 0.01. Questions say when to use it.',
          show: 'rule',
        },
      ],
    },
    {
      chapter: 'Acetic acid',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'What is the pH of a $0.100\\ \\text{mol/L}$ solution of acetic acid, to two decimal places? At $25^\\circ\\text{C}$, $K_a = 1.8 \\times 10^{-5}$. Use the approximation.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{CH3COOH(aq) + H2O(l) <=> H3O+(aq) + CH3COO-(aq)}',
            'K_a = \\dfrac{x^2}{0.100 - x} \\approx \\dfrac{x^2}{0.100}',
            'x = \\sqrt{1.8 \\times 10^{-5} \\times 0.100} = 1.34 \\times 10^{-3}\\ \\text{mol/L}',
            '\\text{pH} = -\\log(1.34 \\times 10^{-3}) = \\good{2.87}',
          ],
        },
      ],
      lines: [
        {
          say: 'What is the p H of zero point one zero zero moles per litre acetic acid?',
          caption: 'What is the pH of 0.100 mol/L acetic acid?',
          show: ['q', 'm.0'],
        },
        {
          say: 'K A is x squared over zero point one zero zero minus x, or about x squared over zero point one zero zero.',
          caption: 'Ka is x² over (0.100 − x), or about x² over 0.100.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'So x is the square root of one point eight times ten to the minus five, times zero point one zero zero: one point three four times ten to the minus three moles per litre.',
          caption: 'So x is the square root of 1.8 × 10⁻⁵ × 0.100: 1.34 × 10⁻³ mol/L.',
          show: 'm.2',
          focus: 'm.2',
        },
        { say: 'The p H is the negative log of that: two point eight seven.', caption: 'The pH is the negative log of that: 2.87.', show: 'm.3', focus: 'm.3' },
        {
          say: 'Check: x is one point three percent of zero point one zero zero, so the approximation was fine.',
          caption: 'Check: x is 1.3% of 0.100, so the approximation was fine.',
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
            'What is the pH of a $0.200\\ \\text{mol/L}$ solution of benzoic acid, $\\ce{C6H5COOH}$, to two decimal places? At $25^\\circ\\text{C}$, $K_a = 6.3 \\times 10^{-5}$. Use the approximation; $\\text{pH} = -\\log[\\ce{H3O+}]$.',
          choices: ['$4.90$', '$2.45$', '$0.70$', '$11.55$'],
          answer: 1,
          working: '$[\\ce{H3O+}] = \\sqrt{6.3 \\times 10^{-5} \\times 0.200} = 3.55 \\times 10^{-3}\\ \\text{mol/L}$, so $\\text{pH} = -\\log(3.55 \\times 10^{-3}) = 2.45$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. What is the p H of zero point two zero zero moles per litre benzoic acid? Its K A is on the screen. Pause the video and try it.',
          caption: 'Your turn. What is the pH of 0.200 mol/L benzoic acid? Its Ka is on the screen. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, two point four five: the square root of K A times c is three point five five times ten to the minus three. Choice A forgets the square root.',
          caption: 'The answer is B, 2.45: the square root of Ka times c is 3.55 × 10⁻³ mol/L. Choice A forgets the square root.',
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
            'An ICE table gives $K_a = \\dfrac{x^2}{c - x}$, with $x = [\\ce{H3O+}]$.',
            'The approximation $c - x \\approx c$ gives $[\\ce{H3O+}] = \\sqrt{K_ac}$.',
            'It works when $c$ is more than $1000$ times $K_a$: check that $x$ is under about 3% of $c$.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. An ICE table gives K A equals x squared over c minus x, where x is the hydronium ion concentration.',
          caption: 'Let’s sum up. An ICE table gives Ka = x² / (c − x), where x is [H₃O⁺].',
          show: 'sum.0',
        },
        {
          say: 'When little ionises, c minus x is about c, so x is the square root of K A times c.',
          caption: 'When little ionises, c − x ≈ c, so x is the square root of Ka times c.',
          show: 'sum.1',
        },
        {
          say: 'Check that x is under about three percent of c. In part two, you will find the p H of weak bases and of salts. See you there!',
          caption: 'Check that x is under about 3% of c. In part two, you will find the pH of weak bases and of salts. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
