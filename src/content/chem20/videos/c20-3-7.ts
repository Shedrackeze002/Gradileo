import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { twoScales } from './lib/c20-3b-figures.ts';

// Hydronium ion concentrations squashed against zero on an ordinary scale, and spread out on the pH scale.
const scales = figure('f', [twoScales()], 420);

const video: Explainer = {
  id: 'c20-3-7',
  lessonId: 'c20-3-7',
  title: 'pH and pOH, Part 1: A Scale of Powers of Ten',
  thumbnailTitle: 'A Scale of Powers of Ten',
  thumbnail: 'f',
  summary:
    'Hydronium ion concentrations run from about 1 mol/L down to about 10⁻¹⁴ mol/L, so chemists use a logarithmic scale: pH = −log[H₃O⁺], and each step of 1 on the pH scale is a factor of 10. A concentration of 1.0 × 10⁻⁴ mol/L has a pH of 4.00, and 3.2 × 10⁻⁵ mol/L a pH of 4.49: the decimal places in a pH equal the significant figures in the concentration.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'A Scale of Powers of Ten', subtitle: 'From concentration to pH' }],
      lines: [
        { say: 'Lemon juice, black coffee and household ammonia all contain hydronium ions, but in wildly different amounts.', show: 'title' },
        {
          say: 'Zero point one zero moles per litre hydrochloric acid has ten to the twelfth times as many hydronium ions as sodium hydroxide of the same concentration.',
          caption: '0.10 mol/L hydrochloric acid has [H₃O⁺] = 0.10 mol/L; 0.10 mol/L sodium hydroxide, at 25 °C, has 1.0 × 10⁻¹³ mol/L: 10¹² times less.',
        },
        { say: 'Comparing numbers like these is awkward, so chemists use the p H scale. This part finds the p H from a concentration. Later parts go the other way, bring in p O H, and read the scale.', caption: 'Comparing numbers like these is awkward, so chemists use the pH scale. This part finds the pH from a concentration. Later parts go the other way, bring in pOH, and read the scale.' },
      ],
    },
    {
      chapter: 'Squashed against zero',
      layout: 'center',
      main: [scales, { kind: 'math', id: 'm', size: 'md', lines: ['\\log 1000 = 3 \\qquad \\log 0.01 = -2 \\qquad \\log 10^{-5} = -5'] }],
      lines: [
        { say: 'Square brackets around a formula mean its concentration, in moles per litre. For hydronium ions, it runs from about one mole per litre down to about ten to the minus fourteen.', caption: 'Square brackets around a formula mean its concentration, in mol/L. [H₃O⁺] runs from about 1 mol/L down to about 10⁻¹⁴ mol/L.' },
        { say: 'On an ordinary scale, ten to the minus one sits at the right end, and ten to the minus two near the left. Everything smaller is squashed up against zero.', show: ['f.lin', 'f.lin-1', 'f.lin-2', 'f.lin-rest'], focus: 'f.lin-rest' },
        { say: 'A logarithm solves the problem. The base ten log of a number is the power of ten that gives the number. The log of one thousand is three, and the log of zero point zero one is negative two.', show: 'm', focus: 'm' },
        { say: 'Taking the log turns each power of ten into one step of one: a logarithmic scale. On the p H scale, the same solutions are spread out evenly.', caption: 'Taking the log turns each power of ten into one step of 1: a logarithmic scale. On the pH scale, the same solutions are spread out evenly.', show: ['f.log', 'f.log-1', 'f.log-2', 'f.log-3', 'f.log-7'], focus: ['f.log-1', 'f.log-2', 'f.log-3', 'f.log-7'] },
      ],
    },
    {
      chapter: 'The pH',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'pH', md: '$\\text{pH} = -\\log[\\ce{H3O+}]$. The pH scale is **logarithmic**: each step of 1 stands for a factor of 10.' },
        {
          kind: 'table',
          id: 't',
          head: ['$[\\ce{H3O+}]$ (mol/L)', '$1.0 \\times 10^{-1}$', '$1.0 \\times 10^{-3}$', '$1.0 \\times 10^{-7}$', '$1.0 \\times 10^{-11}$'],
          rows: [['pH', '1.00', '3.00', '7.00', '11.00']],
        },
      ],
      lines: [
        { say: 'The p H is the negative log of the hydronium ion concentration. The minus sign makes the p H of most solutions a positive number, usually between zero and fourteen.', caption: 'The pH is the negative log of the hydronium ion concentration. The minus sign makes the pH of most solutions a positive number, usually between 0 and 14.', show: 'def' },
        { say: 'So one point zero times ten to the minus one moles per litre has a p H of one point zero zero. Ten to the minus three gives three, and ten to the minus seven gives seven.', caption: 'So 1.0 × 10⁻¹ mol/L has a pH of 1.00. 10⁻³ gives 3.00, and 10⁻⁷ gives 7.00.', show: 't' },
      ],
    },
    {
      chapter: 'Any concentration',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pH} = -\\log(1.0 \\times 10^{-4}) = 4.00', '\\text{pH} = -\\log(3.2 \\times 10^{-5}) = 4.4948... = \\good{4.49}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Significant figures in a pH', md: 'The decimal places in a pH equal the significant figures in the concentration: $3.2 \\times 10^{-5}$ has two, so its pH, $4.49$, has two decimal places.' },
      ],
      lines: [
        { say: 'A solution has a hydronium ion concentration of one point zero times ten to the minus four. The log of ten to the minus four is negative four, so the p H is four point zero zero.', caption: 'A solution has [H₃O⁺] = 1.0 × 10⁻⁴ mol/L. The log of 10⁻⁴ is −4, so the pH is 4.00.', show: 'm.0', focus: 'm.0' },
        { say: 'For three point two times ten to the minus five, which is not a power of ten, use the log key, then change the sign: four point four nine.', caption: 'For 3.2 × 10⁻⁵, which is not a power of ten, use the log key, then change the sign: 4.49.', show: 'm.1', focus: 'm.1' },
        { say: 'The decimal places in a p H equal the significant figures in the concentration. Three point two has two significant figures, so the p H has two decimal places.', caption: 'The decimal places in a pH equal the significant figures in the concentration. 3.2 has two significant figures, so the pH has two decimal places.', show: 'tip' },
        { say: 'The digit before the decimal point only shows the power of ten. That is why one point zero times ten to the minus four gives four point zero zero, not four.', caption: 'The digit before the decimal point only shows the power of ten. That is why 1.0 × 10⁻⁴ gives 4.00, not 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solution has $[\\ce{H3O+}] = 4.5 \\times 10^{-6}\\ \\text{mol/L}$. What is its pH, to two decimal places? $\\text{pH} = -\\log[\\ce{H3O+}]$.',
          choices: ['$6.00$', '$-5.35$', '$8.65$', '$5.35$'],
          answer: 3,
          working: '$\\text{pH} = -\\log(4.5 \\times 10^{-6}) = 5.3468... = 5.35$',
        },
      ],
      lines: [
        { say: 'Your turn. A solution has a hydronium ion concentration of four point five times ten to the minus six moles per litre. What is its p H? Pause the video and try it.', caption: 'Your turn. A solution has [H₃O⁺] = 4.5 × 10⁻⁶ mol/L. What is its pH? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, five point three five. The log is negative five point three four seven, and the minus sign in the definition makes it positive. Choice B forgets that minus sign.', caption: 'The answer is D, 5.35. The log is −5.347, and the minus sign in the definition makes it positive. Choice B forgets that minus sign.', show: 'q.answer' },
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
            '$\\text{pH} = -\\log[\\ce{H3O+}]$, where $[\\ce{H3O+}]$ is the hydronium ion concentration in mol/L.',
            'The pH scale is logarithmic: each step of 1 is a factor of 10 in $[\\ce{H3O+}]$.',
            'The decimal places in a pH equal the significant figures in the concentration.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The p H is the negative log of the hydronium ion concentration, in moles per litre.', caption: 'Let’s sum up. The pH is the negative log of the hydronium ion concentration, in mol/L.', show: 'sum.0' },
        { say: 'The p H scale is logarithmic: each step of one is a factor of ten.', caption: 'The pH scale is logarithmic: each step of 1 is a factor of 10.', show: 'sum.1' },
        { say: 'And the decimal places in a p H equal the significant figures in the concentration. In part two, you will go back from the p H to the concentration. See you there!', caption: 'And the decimal places in a pH equal the significant figures in the concentration. In part two, you will go back from the pH to the concentration. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
