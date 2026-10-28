import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { phStrip } from './lib/c20-3b-figures.ts';

// The pH scale with the pOH under each pH: the two always add up to 14.
const strip = figure('s', [phStrip({ poh: true })], 260);

const SUM = 'At $25^\\circ\\text{C}$, $\\text{pH} + \\text{pOH} = 14.00$.';

const video: Explainer = {
  id: 'c20-3-7-c',
  lessonId: 'c20-3-7',
  title: 'pH and pOH, Part 3: pOH and the Hydroxide Ion',
  thumbnailTitle: 'pOH and the Hydroxide Ion',
  thumbnail: 's',
  summary:
    'At 25 °C, Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴ in any aqueous solution, so pH + pOH = 14.00, where pOH = −log[OH⁻] and [OH⁻] = 10^(−pOH). A solution with [OH⁻] = 2.5 × 10⁻³ mol/L has a pOH of 2.60 and a pH of 11.40; a pH of 9.30 means a pOH of 4.70 and [OH⁻] = 2.0 × 10⁻⁵ mol/L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'pOH and the Hydroxide Ion', subtitle: 'Two scales that add to 14' }],
      lines: [
        { say: 'Household ammonia is basic, so it is full of hydroxide ions. Yet it has a p H, which counts hydronium ions. How can that be?', caption: 'Household ammonia is basic, so it is full of hydroxide ions. Yet it has a pH, which counts hydronium ions. How can that be?', show: 'title' },
        { say: 'In this part, you will meet the p O H scale, and go between the p H and the hydroxide ion concentration.', caption: 'In this part, you will meet the pOH scale, and go between the pH and the hydroxide ion concentration.' },
      ],
    },
    {
      chapter: 'Ions in pure water',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2H2O(l) <=> H3O+(aq) + OH-(aq)}', '\\text{At } 25^\\circ\\text{C:} \\quad K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}'] },
      ],
      lines: [
        { say: 'Even pure water contains a few ions. A tiny fraction of its molecules pass a hydrogen ion to one another, making hydronium ions and hydroxide ions.', show: 'm.0', focus: 'm.0' },
        { say: 'In pure water at twenty-five degrees Celsius, each concentration is one point zero times ten to the minus seven moles per litre.', caption: 'In pure water at 25 °C, each concentration is 1.0 × 10⁻⁷ mol/L.' },
        { say: 'And in any aqueous solution at that temperature, the product of the two concentrations stays the same: K w equals one point zero times ten to the minus fourteen. K w changes with temperature, so the rules in this lesson hold at twenty-five degrees.', caption: 'And in any aqueous solution at that temperature, the product of the two concentrations stays the same: Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴. Kw changes with temperature, so the rules in this lesson hold at 25 °C.', show: 'm.1', focus: 'm.1' },
        { say: 'When one concentration goes up, the other goes down. So basic solutions still contain some hydronium ions, and acidic ones some hydroxide ions.' },
      ],
    },
    {
      chapter: 'The pOH scale',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'pOH', md: '$\\text{pOH} = -\\log[\\ce{OH-}]$, and in reverse, $[\\ce{OH-}] = 10^{-\\text{pOH}}$. ' + SUM },
        strip,
      ],
      lines: [
        { say: 'The hydroxide ion has its own logarithmic scale. The p O H is the negative log of the hydroxide ion concentration, and in reverse, the concentration is ten to the minus p O H.', caption: 'The hydroxide ion has its own logarithmic scale. The pOH is the negative log of the hydroxide ion concentration, and in reverse, [OH⁻] = 10^(−pOH).', show: 'def' },
        { say: 'Taking the negative log of both sides of K w turns the product into a sum. At twenty-five degrees Celsius, the p H plus the p O H equals fourteen point zero zero.', caption: 'Taking −log of both sides of Kw turns the product into a sum. At 25 °C, pH + pOH = 14.00.', show: ['s.scale', 's.acidic', 's.neutral', 's.basic', 's.poh'], focus: 's.poh' },
        { say: 'So you can always go from one scale to the other: a p H of two is a p O H of twelve.', caption: 'So you can always go from one scale to the other: a pH of 2 is a pOH of 12.' },
      ],
    },
    {
      chapter: 'From hydroxide to pH',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `A solution has $[\\ce{OH-}] = 2.5 \\times 10^{-3}\\ \\text{mol/L}$. What is its pH, to two decimal places? ${SUM}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pOH} = -\\log(2.5 \\times 10^{-3}) = 2.60', '\\text{pH} = 14.00 - 2.60 = \\good{11.40}'] },
      ],
      lines: [
        { say: 'A solution has a hydroxide ion concentration of two point five times ten to the minus three moles per litre. What is its p H?', caption: 'A solution has [OH⁻] = 2.5 × 10⁻³ mol/L. What is its pH?', show: 'q' },
        { say: 'Find the p O H first: the negative log of two point five times ten to the minus three is two point six zero.', caption: 'Find the pOH first: −log(2.5 × 10⁻³) = 2.60.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the p H is fourteen point zero zero minus two point six zero: eleven point four zero, a basic solution.', caption: 'Then the pH is 14.00 − 2.60 = 11.40, a basic solution.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Hydroxide from the pH',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `A solution has a pH of $9.30$. What is $[\\ce{OH-}]$, to two significant figures? ${SUM}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pOH} = 14.00 - 9.30 = 4.70', '[\\ce{OH-}] = 10^{-4.70} = \\good{2.0 \\times 10^{-5}\\ \\text{mol/L}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the pH for the wrong ion', md: '$10^{-9.30} = 5.0 \\times 10^{-10}\\ \\text{mol/L}$ is the **hydronium** ion concentration, not the hydroxide. Change the pH into a pOH first.' },
      ],
      lines: [
        { say: 'Now the other way. A solution has a p H of nine point three zero. What is its hydroxide ion concentration?', caption: 'Now the other way. A solution has a pH of 9.30. What is its hydroxide ion concentration?', show: 'q' },
        { say: 'The p O H is four point seven zero, so the hydroxide ion concentration is ten to the minus four point seven zero: two point zero times ten to the minus five moles per litre.', caption: 'The pOH is 14.00 − 9.30 = 4.70, so [OH⁻] = 10^(−4.70) = 2.0 × 10⁻⁵ mol/L.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Careful: ten to the minus nine point three zero is the hydronium ion concentration, not the hydroxide. Change the p H into a p O H first.', caption: 'Careful: 10^(−9.30) is the hydronium ion concentration, not the hydroxide. Change the pH into a pOH first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: `A solution has a pH of $10.60$. What is $[\\ce{OH-}]$, in mol/L, to two significant figures? ${SUM} $[\\ce{OH-}] = 10^{-\\text{pOH}}$.`,
          choices: ['$2.5 \\times 10^{-11}$', '$2.5 \\times 10^{3}$', '$4.0 \\times 10^{-4}$', '$3.4 \\times 10^{-4}$'],
          answer: 2,
          working: '$\\text{pOH} = 14.00 - 10.60 = 3.40$, so $[\\ce{OH-}] = 10^{-3.40} = 4.0 \\times 10^{-4}\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A solution has a p H of ten point six zero. What is its hydroxide ion concentration, to two significant figures? Pause the video and try it.', caption: 'Your turn. A solution has a pH of 10.60. What is its hydroxide ion concentration, to two significant figures? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The p O H is three point four zero, and ten to the minus three point four zero is four point zero times ten to the minus four. Choice A is the hydronium ion concentration.', caption: 'The answer is C. The pOH is 14.00 − 10.60 = 3.40, and 10^(−3.40) = 4.0 × 10⁻⁴. Choice A is 10^(−pH): the hydronium ion concentration.', show: 'q.answer' },
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
            'At $25^\\circ\\text{C}$, $K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}$.',
            '$\\text{pOH} = -\\log[\\ce{OH-}]$ and $[\\ce{OH-}] = 10^{-\\text{pOH}}$.',
            'At $25^\\circ\\text{C}$, $\\text{pH} + \\text{pOH} = 14.00$: change a pH into a pOH before finding $[\\ce{OH-}]$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At twenty-five degrees Celsius, the product of the two ion concentrations is one point zero times ten to the minus fourteen.', caption: 'Let’s sum up. At 25 °C, Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴.', show: 'sum.0' },
        { say: 'The p O H is the negative log of the hydroxide ion concentration.', caption: 'The pOH is the negative log of the hydroxide ion concentration.', show: 'sum.1' },
        { say: 'And at twenty-five degrees, the p H plus the p O H is fourteen. In part four, you will read the p H scale. See you there!', caption: 'And at 25 °C, pH + pOH = 14.00. In part four, you will read the pH scale. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
