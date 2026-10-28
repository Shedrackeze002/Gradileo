import type { Explainer } from '@/video/script.ts';

const SUM = 'At $25^\\circ\\text{C}$, $\\text{pH} + \\text{pOH} = 14.00$.';

const video: Explainer = {
  id: 'c20-3-8-d',
  lessonId: 'c20-3-8',
  title: 'Strong and Weak Acids and Bases, Part 4: pH of Strong Acids and Bases',
  thumbnailTitle: 'pH of Strong Acids and Bases',
  thumbnail: false,
  summary:
    'A strong acid such as HNO₃ ionises completely, so [H₃O⁺] equals its concentration: 3.5 × 10⁻³ mol/L nitric acid has a pH of 2.46. For a group 1 hydroxide, [OH⁻] equals its concentration, and for barium or strontium hydroxide it is twice the concentration; find the pOH, then pH = 14.00 − pOH. 2.5 × 10⁻³ mol/L Ba(OH)₂ has a pH of 11.70.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'pH of Strong Acids and Bases', subtitle: 'From the concentration to the pH' }],
      lines: [
        { say: 'A bottle is labelled three point five times ten to the minus three moles per litre nitric acid. What is its p H?', caption: 'A bottle is labelled 3.5 × 10⁻³ mol/L nitric acid. What is its pH?', show: 'title' },
        { say: 'For a weak acid, you would need to know how much ionises. But a strong acid or a strong base gives up all of its ions, so the p H follows straight from the concentration. In this part, you will find it.', caption: 'For a weak acid, you would need to know how much ionises. But a strong acid or a strong base gives up all of its ions, so the pH follows straight from the concentration. In this part, you will find it.' },
      ],
    },
    {
      chapter: 'A strong acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the pH of a $3.5 \\times 10^{-3}\\ \\text{mol/L}$ solution of nitric acid, $\\ce{HNO3}$, to two decimal places? It is a strong acid, so $[\\ce{H3O+}]$ equals the acid’s concentration.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['[\\ce{H3O+}] = 3.5 \\times 10^{-3}\\ \\text{mol/L}', '\\text{pH} = -\\log(3.5 \\times 10^{-3}) = \\good{2.46}'] },
      ],
      lines: [
        { say: 'Because a strong acid ionises completely, each mole of an acid such as nitric acid makes one mole of hydronium ions. So the hydronium ion concentration equals the acid’s concentration.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Then the p H follows from lesson three point seven: the negative log of three point five times ten to the minus three is two point four six.', caption: 'Then the pH follows from lesson 3.7: −log(3.5 × 10⁻³) = 2.46.', show: 'm.1', focus: 'm.1' },
        { say: 'This works for hydrochloric, hydrobromic, hydroiodic, nitric and perchloric acid, which give up one hydrogen ion each. Sulfuric acid has two to give, and only the first goes completely, so its p H is not found as simply.', caption: 'This works for HCl, HBr, HI, HNO₃ and HClO₄, which give up one hydrogen ion each. Sulfuric acid has two to give, and only the first goes completely, so its pH is not found as simply.' },
      ],
    },
    {
      chapter: 'A group 1 hydroxide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `What is the pH of a $4.0 \\times 10^{-2}\\ \\text{mol/L}$ solution of potassium hydroxide, $\\ce{KOH}$, to two decimal places? It dissociates completely, so $[\\ce{OH-}]$ equals its concentration. ${SUM}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pOH} = -\\log(4.0 \\times 10^{-2}) = 1.40', '\\text{pH} = 14.00 - 1.40 = \\good{12.60}'] },
      ],
      lines: [
        { say: 'Now a strong base. What is the p H of four point zero times ten to the minus two moles per litre potassium hydroxide?', caption: 'Now a strong base. What is the pH of 4.0 × 10⁻² mol/L potassium hydroxide?', show: 'q' },
        { say: 'A group one hydroxide releases one hydroxide ion per formula unit, so the hydroxide ion concentration equals its concentration. The p O H is the negative log of that: one point four zero.', caption: 'A group 1 hydroxide releases one hydroxide ion per formula unit, so [OH⁻] equals its concentration. The pOH is −log(4.0 × 10⁻²) = 1.40.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the p H is fourteen point zero zero minus one point four zero: twelve point six zero.', caption: 'Then the pH is 14.00 − 1.40 = 12.60.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Barium hydroxide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `What is the pH of a $2.5 \\times 10^{-3}\\ \\text{mol/L}$ solution of barium hydroxide, $\\ce{Ba(OH)2}$, to two decimal places? It dissociates completely. ${SUM}` },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{Ba(OH)2(s) -> Ba^2+(aq) + 2OH-(aq)}', '[\\ce{OH-}] = 2 \\times 2.5 \\times 10^{-3} = 5.00 \\times 10^{-3}\\ \\text{mol/L}', '\\text{pOH} = -\\log(5.00 \\times 10^{-3}) = 2.30', '\\text{pH} = 14.00 - 2.30 = \\good{11.70}'],
        },
      ],
      lines: [
        { say: 'What is the p H of two point five times ten to the minus three moles per litre barium hydroxide?', caption: 'What is the pH of 2.5 × 10⁻³ mol/L barium hydroxide?', show: 'q' },
        { say: 'Write the dissociation equation first. Each formula unit releases two hydroxide ions.', show: 'm.0', focus: 'm.0' },
        { say: 'So the hydroxide ion concentration is two times two point five times ten to the minus three: five point zero zero times ten to the minus three.', caption: 'So [OH⁻] = 2 × 2.5 × 10⁻³ = 5.00 × 10⁻³ mol/L.', show: 'm.1', focus: 'm.1' },
        { say: 'The p O H is two point three zero, so the p H is fourteen point zero zero minus two point three zero: eleven point seven zero.', caption: 'The pOH is 2.30, so the pH is 14.00 − 2.30 = 11.70.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Forgetting the second hydroxide ion gives a p O H of two point six zero, and a p H of eleven point four zero, which is wrong. Multiply by the number of hydroxide ions in the formula.', caption: 'Forgetting the second hydroxide ion gives a pOH of 2.60, and a pH of 11.40, which is wrong. Multiply by the number of OH⁻ ions in the formula.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: `What is the pH of a $1.5 \\times 10^{-3}\\ \\text{mol/L}$ solution of barium hydroxide, $\\ce{Ba(OH)2}$, to two decimal places? It dissociates completely. ${SUM}`,
          choices: ['$11.18$', '$2.52$', '$2.82$', '$11.48$'],
          answer: 3,
          working: '$[\\ce{OH-}] = 2 \\times 1.5 \\times 10^{-3} = 3.0 \\times 10^{-3}\\ \\text{mol/L}$, so $\\text{pOH} = 2.52$ and $\\text{pH} = 14.00 - 2.52 = 11.48$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the p H of one point five times ten to the minus three moles per litre barium hydroxide? Pause the video and try it.', caption: 'Your turn. What is the pH of 1.5 × 10⁻³ mol/L barium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eleven point four eight. The hydroxide ion concentration is three point zero times ten to the minus three, so the p O H is two point five two. Choice A forgets the second hydroxide ion, and choice B stops at the p O H.', caption: 'The answer is D, 11.48. [OH⁻] = 3.0 × 10⁻³ mol/L, so the pOH is 2.52. Choice A forgets the second hydroxide ion, and choice B stops at the pOH.', show: 'q.answer' },
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
            'Strong acid: $[\\ce{H3O+}] = c$, then $\\text{pH} = -\\log[\\ce{H3O+}]$.',
            'Group 1 hydroxide: $[\\ce{OH-}] = c$. Barium or strontium hydroxide: $[\\ce{OH-}] = 2c$.',
            'For a base, find $\\text{pOH} = -\\log[\\ce{OH-}]$, then $\\text{pH} = 14.00 - \\text{pOH}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a strong acid, the hydronium ion concentration equals the acid’s concentration, and the p H is its negative log.', caption: 'Let’s sum up. For a strong acid, [H₃O⁺] equals the acid’s concentration, and the pH is its negative log.', show: 'sum.0' },
        { say: 'For a group one hydroxide, the hydroxide ion concentration equals the base’s concentration. For barium or strontium hydroxide, it is twice the concentration.', show: 'sum.1' },
        { say: 'For a base, find the p O H, then subtract it from fourteen. That completes this lesson on strong and weak acids and bases. Well done!', caption: 'For a base, find the pOH, then subtract it from 14.00. That completes this lesson on strong and weak acids and bases. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
