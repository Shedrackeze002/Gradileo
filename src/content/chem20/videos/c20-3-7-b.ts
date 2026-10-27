import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-7-b',
  lessonId: 'c20-3-7',
  title: 'pH and pOH, Part 2: From pH to Concentration',
  thumbnailTitle: 'From pH to Concentration',
  thumbnail: false,
  summary:
    'To undo the logarithm, raise ten to its power: [H₃O⁺] = 10^(−pH). A pH of 6.00 gives 1.0 × 10⁻⁶ mol/L, and a pH of 3.75 gives 1.8 × 10⁻⁴ mol/L; a pH with two decimal places gives a concentration with two significant figures. Keep the exponent negative: for any positive pH, the concentration is less than 1 mol/L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'From pH to Concentration', subtitle: 'Undoing the logarithm' }],
      lines: [
        { say: 'A p H meter reads three point seven five. What hydronium ion concentration does that mean?', caption: 'A pH meter reads 3.75. What hydronium ion concentration does that mean?', show: 'title' },
        { say: 'In part one, you found the p H from a concentration. In this part, you will go the other way, from the p H back to the hydronium ion concentration.', caption: 'In part one, you found the pH from a concentration. In this part, you will go the other way, from the pH back to the hydronium ion concentration.' },
      ],
    },
    {
      chapter: 'Undoing the logarithm',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pH} = -\\log[\\ce{H3O+}] \\quad \\Longrightarrow \\quad \\good{[\\ce{H3O+}] = 10^{-\\text{pH}}}', '\\text{pH} = 6.00: \\quad [\\ce{H3O+}] = 10^{-6.00} = 1.0 \\times 10^{-6}\\ \\text{mol/L}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Typing scientific notation', md: 'Type scientific notation like `4.7e-5` or `4.7*10^-5`. So $1.0 \\times 10^{-6}$ is typed as `1.0e-6` or `1.0*10^-6`.' },
      ],
      lines: [
        { say: 'A logarithm is a power of ten, so to undo it, raise ten to that power. Because the p H is the negative log of the concentration, the concentration is ten to the minus p H.', caption: 'A logarithm is a power of ten, so to undo it, raise ten to that power. Because pH = −log[H₃O⁺], the concentration is [H₃O⁺] = 10^(−pH).', show: 'm.0', focus: 'm.0' },
        { say: 'A solution has a p H of six point zero zero. Its hydronium ion concentration is ten to the minus six, or one point zero times ten to the minus six moles per litre.', caption: 'A solution has a pH of 6.00. Its hydronium ion concentration is 10⁻⁶, or 1.0 × 10⁻⁶ mol/L.', show: 'm.1', focus: 'm.1' },
        { say: 'When you type an answer like this, type one point zero, the letter e, minus six. Or type one point zero, times ten, caret, minus six.', caption: 'When you type an answer like this, type 1.0e-6, or 1.0*10^-6.', show: 'tip' },
      ],
    },
    {
      chapter: 'A pH with decimals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A solution has a pH of $3.75$. What is $[\\ce{H3O+}]$, in mol/L, to two significant figures?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['[\\ce{H3O+}] = 10^{-3.75} = 0.00017782...', '[\\ce{H3O+}] = \\good{1.8 \\times 10^{-4}\\ \\text{mol/L}}'] },
      ],
      lines: [
        { say: 'Back to the p H meter. A solution has a p H of three point seven five. What is its hydronium ion concentration?', caption: 'Back to the pH meter. A solution has a pH of 3.75. What is its hydronium ion concentration?', show: 'q' },
        { say: 'Use the ten to the x key on your calculator, with x equal to minus three point seven five. The calculator shows zero point zero zero zero one seven seven eight.', caption: 'Use the 10^x key on your calculator, with x = −3.75. The calculator shows 0.00017782…', show: 'm.0', focus: 'm.0' },
        { say: 'The significant-figure rule works in reverse. A p H with two decimal places gives a concentration with two significant figures: one point eight times ten to the minus four moles per litre.', caption: 'The significant-figure rule works in reverse. A pH with two decimal places gives a concentration with two significant figures: 1.8 × 10⁻⁴ mol/L.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Dropping the minus sign',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dropping the minus sign', md: '$10^{3.75}$ is about $5600$, far too large: no solution holds $5600\\ \\text{mol/L}$ of hydronium ions. For any positive pH, $[\\ce{H3O+}]$ must be less than $1\\ \\text{mol/L}$, so check that the exponent is negative.' },
      ],
      lines: [
        { say: 'A common slip is to drop the minus sign. Ten to the three point seven five is about five thousand six hundred.', caption: 'A common slip is to drop the minus sign. 10^3.75 is about 5600.', show: 'oops' },
        { say: 'That is far too large: no solution holds five thousand six hundred moles per litre of hydronium ions.', caption: 'That is far too large: no solution holds 5600 mol/L of hydronium ions.' },
        { say: 'For any positive p H, the hydronium ion concentration must be less than one mole per litre. So check that the exponent is negative.', caption: 'For any positive pH, [H₃O⁺] must be less than 1 mol/L. So check that the exponent is negative.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solution has a pH of $4.20$. What is $[\\ce{H3O+}]$, in mol/L, to two significant figures? $[\\ce{H3O+}] = 10^{-\\text{pH}}$.',
          choices: ['$1.6 \\times 10^{4}$', '$6.3 \\times 10^{-5}$', '$1.6 \\times 10^{-10}$', '$1.0 \\times 10^{-4}$'],
          answer: 1,
          working: '$[\\ce{H3O+}] = 10^{-4.20} = 0.0000631 = 6.3 \\times 10^{-5}\\ \\text{mol/L}$',
        },
      ],
      lines: [
        { say: 'Your turn. A solution has a p H of four point two zero. What is its hydronium ion concentration, to two significant figures? Pause the video and try it.', caption: 'Your turn. A solution has a pH of 4.20. What is its hydronium ion concentration, to two significant figures? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, six point three times ten to the minus five moles per litre: ten to the minus four point two zero. Choice A dropped the minus sign, and no solution is that concentrated.', caption: 'The answer is B, 6.3 × 10⁻⁵ mol/L: 10^(−4.20). Choice A dropped the minus sign, and no solution is that concentrated.', show: 'q.answer' },
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
            '$[\\ce{H3O+}] = 10^{-\\text{pH}}$: use the $10^x$ key with $x = -\\text{pH}$.',
            'A pH with two decimal places gives a concentration with two significant figures.',
            'For any positive pH, $[\\ce{H3O+}]$ is less than $1\\ \\text{mol/L}$: keep the exponent negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The hydronium ion concentration is ten to the minus p H. Use the ten to the x key.', caption: 'Let’s sum up. [H₃O⁺] = 10^(−pH). Use the 10^x key.', show: 'sum.0' },
        { say: 'A p H with two decimal places gives a concentration with two significant figures.', caption: 'A pH with two decimal places gives a concentration with two significant figures.', show: 'sum.1' },
        { say: 'And for any positive p H, the concentration is less than one mole per litre, so keep the exponent negative. In part three, you will meet the hydroxide ion’s own scale, p O H. See you there!', caption: 'And for any positive pH, the concentration is less than 1 mol/L, so keep the exponent negative. In part three, you will meet the hydroxide ion’s own scale, pOH. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
