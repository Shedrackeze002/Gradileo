import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-7-c',
  lessonId: 'c30-4-7',
  title: 'pH of Weak Acids and Bases, Part 3: When the Approximation Fails',
  thumbnailTitle: 'When the Approximation Fails',
  thumbnail: false,
  summary:
    'When an acid is fairly strong or very dilute, too much ionises for c − x ≈ c. Keep c − x, rearrange Ka = x²/(c − x) into x² + Ka x − Ka c = 0, and keep the positive root of the quadratic formula: 0.0100 mol/L hydrofluoric acid (Ka = 6.6 × 10⁻⁴) has [H₃O⁺] = 2.26 × 10⁻³ mol/L and a pH of 2.65, where the approximation would give 2.59.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'When the Approximation Fails', subtitle: 'Solving the quadratic' }],
      lines: [
        { say: 'The approximation, c minus x is about c, is quick, but it is not always good enough.', caption: 'The approximation, c − x ≈ c, is quick, but it is not always good enough.', show: 'title' },
        { say: 'This part solves the full equation, with the quadratic formula, for an acid that ionises too much.' },
      ],
    },
    {
      chapter: 'Too much ionises',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Solution', '$c \\div K_a$', 'Ionised'],
          rows: [
            ['$0.100\\ \\text{mol/L}$ acetic acid', 'about 5600', '1.3%'],
            ['$0.0100\\ \\text{mol/L}$ hydrofluoric acid', '15', '23%'],
          ],
        },
      ],
      lines: [
        {
          say: 'When an acid is fairly strong, or very dilute, c is no longer more than one thousand times K A, and too much of it ionises to ignore x.',
          caption: 'When an acid is fairly strong, or very dilute, c is no longer more than 1000 times Ka, and too much of it ionises to ignore x.',
        },
        {
          say: 'Compare c over K A. For zero point one zero zero moles per litre acetic acid, it is about five thousand six hundred. For zero point zero one zero zero moles per litre hydrofluoric acid, it is only fifteen.',
          caption: 'Compare c over Ka. For 0.100 mol/L acetic acid, it is about 5600. For 0.0100 mol/L hydrofluoric acid, it is only 15.',
          show: 't',
        },
        { say: 'Only one point three percent of the acetic acid ionises, but twenty-three percent of the hydrofluoric acid does.', caption: 'Only 1.3% of the acetic acid ionises, but 23% of the hydrofluoric acid does.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The quadratic',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['K_a = \\dfrac{x^2}{c - x}', 'x^2 + K_ax - K_ac = 0', 'x = \\dfrac{-K_a + \\sqrt{K_a^2 + 4K_ac}}{2}'] },
      ],
      lines: [
        {
          say: 'So keep c minus x. Multiply both sides by c minus x and rearrange: x squared, plus K A times x, minus K A times c, equals zero.',
          caption: 'So keep c − x. Multiply both sides by (c − x) and rearrange: x² + Ka·x − Ka·c = 0.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        {
          say: 'Solve it with the quadratic formula. The other root is negative, and a concentration cannot be negative, so keep the root with the plus sign.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Hydrofluoric acid',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'What is the pH of a $0.0100\\ \\text{mol/L}$ solution of hydrofluoric acid, to two decimal places? At $25^\\circ\\text{C}$, $K_a = 6.6 \\times 10^{-4}$. Solve the quadratic.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '6.6 \\times 10^{-4} = \\dfrac{x^2}{0.0100 - x}',
            'x^2 + 6.6 \\times 10^{-4}\\,x - 6.6 \\times 10^{-6} = 0',
            'x = \\dfrac{-6.6 \\times 10^{-4} + \\sqrt{(6.6 \\times 10^{-4})^2 + 4(6.6 \\times 10^{-6})}}{2}',
            '= 2.26 \\times 10^{-3}\\ \\text{mol/L} \\qquad \\text{pH} = -\\log(2.26 \\times 10^{-3}) = \\good{2.65}',
          ],
        },
      ],
      lines: [
        {
          say: 'Hydrofluoric acid at zero point zero one zero zero moles per litre, with a K A of six point six times ten to the minus four.',
          caption: 'Hydrofluoric acid at 0.0100 mol/L, with a Ka of 6.6 × 10⁻⁴.',
          show: ['q', 'm.0'],
        },
        {
          say: 'Rearrange: x squared, plus six point six times ten to the minus four times x, minus six point six times ten to the minus six, equals zero.',
          caption: 'Rearrange: x² + 6.6 × 10⁻⁴ x − 6.6 × 10⁻⁶ = 0.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Then use the quadratic formula, keeping the plus sign.', show: 'm.2', focus: 'm.2' },
        {
          say: 'The hydronium ion concentration is two point two six times ten to the minus three moles per litre, so the p H is two point six five.',
          caption: '[H₃O⁺] is 2.26 × 10⁻³ mol/L, so the pH is 2.65.',
          show: 'm.3',
          focus: 'm.3',
        },
        {
          say: 'The approximation would have given two point five nine. With twenty-three percent ionised, x is far too large to ignore.',
          caption: 'The approximation would have given 2.59. With 23% ionised, x is far too large to ignore.',
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
            'What is the pH of a $0.0200\\ \\text{mol/L}$ solution of nitrous acid, $\\ce{HNO2}$, to two decimal places? At $25^\\circ\\text{C}$, $K_a = 5.6 \\times 10^{-4}$. The acid ionises too much for the approximation, so solve the quadratic.',
          choices: ['$2.48$', '$1.70$', '$3.25$', '$2.51$'],
          answer: 3,
          working:
            '$x^2 + 5.6 \\times 10^{-4}x - 1.12 \\times 10^{-5} = 0$, so $x = \\dfrac{-5.6 \\times 10^{-4} + \\sqrt{(5.6 \\times 10^{-4})^2 + 4(1.12 \\times 10^{-5})}}{2} = 3.08 \\times 10^{-3}\\ \\text{mol/L}$ and $\\text{pH} = 2.51$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. What is the p H of zero point zero two zero zero moles per litre nitrous acid, with a K A of five point six times ten to the minus four? Solve the quadratic. Pause the video and try it.',
          caption: 'Your turn. What is the pH of 0.0200 mol/L nitrous acid, with a Ka of 5.6 × 10⁻⁴? Solve the quadratic. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, two point five one. The positive root is three point zero eight times ten to the minus three. Choice A, two point four eight, is what the approximation gives: about fifteen percent of this acid ionises, too much to ignore.',
          caption: 'The answer is D, 2.51. The positive root is 3.08 × 10⁻³ mol/L. Choice A, 2.48, is what the approximation gives: about 15% of this acid ionises, too much to ignore.',
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
            'When too much ionises ($c$ not more than $1000$ times $K_a$), keep $c - x$.',
            'Solve $x^2 + K_ax - K_ac = 0$: $x = \\dfrac{-K_a + \\sqrt{K_a^2 + 4K_ac}}{2}$.',
            'Keep the positive root: a concentration cannot be negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When too much of an acid ionises, keep c minus x.', caption: 'Let’s sum up. When too much of an acid ionises, keep c − x.', show: 'sum.0' },
        { say: 'Rearrange into a quadratic equation, and solve it with the quadratic formula.', show: 'sum.1' },
        {
          say: 'Keep the positive root, since a concentration cannot be negative. In part four, you will work backwards, from a measured p H to K A. See you there!',
          caption: 'Keep the positive root, since a concentration cannot be negative. In part four, you will work backwards, from a measured pH to Ka. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
