import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-7-b',
  lessonId: 'c30-4-7',
  title: 'pH of Weak Acids and Bases, Part 2: Weak Bases and Salts',
  thumbnailTitle: 'Weak Bases and Salts',
  thumbnail: false,
  summary:
    'A weak base makes hydroxide ions: with the approximation, [OH⁻] = √(Kb c), then the pOH, then pH = 14.00 − pOH at 25 °C, so 0.200 mol/L ammonia has a pH of 11.28. The anion of a weak acid is a weak base (Kb = Kw/Ka), so 0.100 mol/L sodium acetate has a pH of 8.87, and the cation of a weak base is a weak acid (Ka = Kw/Kb).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'Weak Bases and Salts', subtitle: 'Hydroxide first, then the pH' }],
      lines: [
        { say: 'Household ammonia is a weak base, and a solution of sodium acetate is basic as well.', show: 'title' },
        {
          say: 'This part finds the p H of weak bases, and of salts whose ions are weak acids or bases.',
          caption: 'This part finds the pH of weak bases, and of salts whose ions are weak acids or bases.',
        },
      ],
    },
    {
      chapter: 'Weak bases',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['K_b = \\dfrac{x^2}{c - x} \\approx \\dfrac{x^2}{c} \\quad\\text{so}\\quad [\\ce{OH-}] = \\sqrt{K_bc}', '\\text{pOH} = -\\log[\\ce{OH-}]', '\\text{pH} = 14.00 - \\text{pOH} \\ \\text{ at } 25^\\circ\\text{C}'],
        },
      ],
      lines: [
        {
          say: 'A weak base works the same way, except that it makes hydroxide ions. With x for the hydroxide concentration, the approximation makes the hydroxide concentration the square root of K B times c.',
          caption: 'A weak base works the same way, except that it makes hydroxide ions. With x for [OH⁻], the approximation makes [OH⁻] the square root of Kb times c.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'That gives the p O H. At twenty-five degrees Celsius, the p H is fourteen point zero zero minus the p O H.',
          caption: 'That gives the pOH. At 25 °C, the pH is 14.00 minus the pOH.',
          show: ['m.1', 'm.2'],
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Ammonia',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the pH of a $0.200\\ \\text{mol/L}$ solution of ammonia, to two decimal places? At $25^\\circ\\text{C}$, $K_b = 1.8 \\times 10^{-5}$. Use the approximation.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{NH3(aq) + H2O(l) <=> NH4+(aq) + OH-(aq)}',
            '[\\ce{OH-}] = \\sqrt{1.8 \\times 10^{-5} \\times 0.200} = 1.90 \\times 10^{-3}\\ \\text{mol/L}',
            '\\text{pOH} = -\\log(1.90 \\times 10^{-3}) = 2.72',
            '\\text{pH} = 14.00 - 2.72 = \\good{11.28}',
          ],
        },
      ],
      lines: [
        {
          say: 'Try zero point two zero zero moles per litre ammonia, with a K B of one point eight times ten to the minus five.',
          caption: 'Try 0.200 mol/L ammonia, with a Kb of 1.8 × 10⁻⁵.',
          show: ['q', 'm.0'],
        },
        {
          say: 'The hydroxide concentration is the square root of K B times c: one point nine zero times ten to the minus three moles per litre.',
          caption: '[OH⁻] is the square root of Kb times c: 1.90 × 10⁻³ mol/L.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'Its negative log is the p O H, two point seven two. So the p H is fourteen point zero zero minus two point seven two: eleven point two eight.',
          caption: 'Its negative log is the pOH, 2.72. So the pH is 14.00 − 2.72 = 11.28.',
          show: ['m.2', 'm.3'],
          focus: 'm.3',
        },
        {
          say: 'Do not stop at the p O H: two point seven two cannot be the p H of a basic solution.',
          caption: 'Do not stop at the pOH: 2.72 cannot be the pH of a basic solution.',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Salts',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The salt of a weak acid, such as sodium acetate, is **basic**: $\\ce{CH3COO-}$ is a weak base, with $K_b = \\dfrac{K_w}{K_a}$.',
            'The salt of a weak base, such as ammonium chloride, is **acidic**: $\\ce{NH4+}$ is a weak acid, with $K_a = \\dfrac{K_w}{K_b}$.',
          ],
        },
      ],
      lines: [
        {
          say: 'The salt of a weak acid, such as sodium acetate, is basic: the acetate ion is a weak base, with K B equal to K W over K A.',
          caption: 'The salt of a weak acid, such as sodium acetate, is basic: the acetate ion is a weak base, with Kb = Kw / Ka.',
          show: 'b.0',
        },
        {
          say: 'The salt of a weak base, such as ammonium chloride, is acidic: the ammonium ion is a weak acid, with K A equal to K W over K B.',
          caption: 'The salt of a weak base, such as ammonium chloride, is acidic: the ammonium ion is a weak acid, with Ka = Kw / Kb.',
          show: 'b.1',
        },
      ],
    },
    {
      chapter: 'Sodium acetate',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'What is the pH of a $0.100\\ \\text{mol/L}$ solution of sodium acetate? At $25^\\circ\\text{C}$, $K_a$ for acetic acid is $1.8 \\times 10^{-5}$ and $K_w = 1.0 \\times 10^{-14}$. Use the approximation.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{CH3COO-(aq) + H2O(l) <=> CH3COOH(aq) + OH-(aq)}',
            'K_b = \\dfrac{1.0 \\times 10^{-14}}{1.8 \\times 10^{-5}} = 5.56 \\times 10^{-10}',
            '[\\ce{OH-}] = \\sqrt{5.56 \\times 10^{-10} \\times 0.100} = 7.45 \\times 10^{-6}\\ \\text{mol/L}',
            '\\text{pOH} = 5.13 \\qquad \\text{pH} = 14.00 - 5.13 = \\good{8.87}',
          ],
        },
      ],
      lines: [
        {
          say: 'Now sodium acetate, at zero point one zero zero moles per litre. The sodium ion is a spectator; the acetate ion is the base.',
          caption: 'Now sodium acetate, at 0.100 mol/L. The sodium ion is a spectator; the acetate ion is the base.',
          show: ['q', 'm.0'],
        },
        {
          say: 'Its K B is K W over K A: five point five six times ten to the minus ten.',
          caption: 'Its Kb is Kw over Ka: 5.56 × 10⁻¹⁰.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'So the hydroxide concentration is seven point four five times ten to the minus six, and the p O H five point one three.',
          caption: 'So [OH⁻] is 7.45 × 10⁻⁶ mol/L, and the pOH 5.13.',
          show: ['m.2', 'm.3'],
          focus: 'm.2',
        },
        { say: 'The p H is eight point eight seven: slightly basic.', caption: 'The pH is 8.87: slightly basic.', focus: 'm.3' },
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
            'What is the pH of a $0.250\\ \\text{mol/L}$ solution of ammonium chloride, $\\ce{NH4Cl}$, to two decimal places? At $25^\\circ\\text{C}$, $K_b$ for ammonia is $1.8 \\times 10^{-5}$ and $K_w = 1.0 \\times 10^{-14}$. Use the approximation.',
          choices: ['$4.93$', '$9.07$', '$2.67$', '$11.33$'],
          answer: 0,
          working: 'The acid is $\\ce{NH4+}$: $K_a = \\dfrac{1.0 \\times 10^{-14}}{1.8 \\times 10^{-5}} = 5.56 \\times 10^{-10}$. $[\\ce{H3O+}] = \\sqrt{5.56 \\times 10^{-10} \\times 0.250} = 1.18 \\times 10^{-5}\\ \\text{mol/L}$, so $\\text{pH} = 4.93$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. What is the p H of zero point two five zero moles per litre ammonium chloride? Pause the video and try it.',
          caption: 'Your turn. What is the pH of 0.250 mol/L ammonium chloride? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, four point nine three. The ammonium ion is a weak acid, with K A equal to K W over K B. Choice C uses the K B of ammonia as if it were K A.',
          caption: 'The answer is A, 4.93. The ammonium ion is a weak acid, with Ka = Kw / Kb. Choice C uses the Kb of ammonia as if it were Ka.',
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
            'For a weak base: $[\\ce{OH-}] = \\sqrt{K_bc}$, then the pOH, then $\\text{pH} = 14.00 - \\text{pOH}$.',
            'The anion of a weak acid is a weak base: $K_b = K_w/K_a$.',
            'The cation of a weak base is a weak acid: $K_a = K_w/K_b$.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. For a weak base, the hydroxide concentration is the square root of K B times c. Then find the p O H, and finish with the p H.',
          caption: 'Let’s sum up. For a weak base, [OH⁻] is the square root of Kb times c. Then find the pOH, and finish with the pH.',
          show: 'sum.0',
        },
        {
          say: 'The anion of a weak acid is a weak base, and the cation of a weak base is a weak acid. K W gives the constant you need.',
          caption: 'The anion of a weak acid is a weak base, and the cation of a weak base is a weak acid. Kw gives the constant you need.',
          show: ['sum.1', 'sum.2'],
        },
        { say: 'In part three, you will see what to do when too much ionises for the approximation. See you there!' },
      ],
    },
  ],
};

export default video;
