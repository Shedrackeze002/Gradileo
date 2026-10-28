import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-2-d',
  lessonId: 'c30-4-2',
  title: 'The Equilibrium Constant, Part 4: Working Backwards from K',
  thumbnailTitle: 'Working Backwards from K',
  thumbnail: false,
  summary:
    'With Kc known, an ICE table and the expression give an unknown equilibrium concentration. When both sides are perfect squares, take square roots: with 0.500 mol/L each of H₂ and I₂ and Kc = 49.0, 7.00 = 2x / (0.500 − x), so [HI] = 0.778 mol/L. When Kc is very small, treat x as negligible next to the starting concentration: x² / 0.500 = 8.0 × 10⁻⁷ gives [CO] = 6.3 × 10⁻⁴ mol/L, and the check shows x is only about 0.1% of 0.500.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 4', title: 'Working Backwards from K', subtitle: 'Square roots and a very small K' }],
      lines: [
        { say: 'Once K C is known, it can predict what a flask will hold at equilibrium, before anyone measures it.', caption: 'Once Kc is known, it can predict what a flask will hold at equilibrium, before anyone measures it.', show: 'title' },
        { say: 'In this part, you will solve for an unknown concentration in two kinds of problem with short algebra: a perfect square, and a very small K C.', caption: 'In this part, you will solve for an unknown concentration in two kinds of problem with short algebra: a perfect square, and a very small Kc.' },
      ],
    },
    {
      chapter: 'A perfect square',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$0.500\\ \\text{mol/L}$ each of $\\ce{H2}$ and $\\ce{I2}$ go into an empty flask where $K_c = 49.0$ for $\\ce{H2(g) + I2(g) <=> 2HI(g)}$. Find $[\\ce{HI}]$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['[\\ce{H2}] = [\\ce{I2}] = 0.500 - x \\qquad [\\ce{HI}] = 2x', '49.0 = \\dfrac{(2x)^2}{(0.500 - x)^2}'],
        },
      ],
      lines: [
        { say: 'Zero point five zero zero moles per litre each of hydrogen and iodine go into an empty flask, where K C is forty-nine point zero. What is the equilibrium concentration of hydrogen iodide?', caption: '0.500 mol/L each of hydrogen and iodine go into an empty flask, where Kc is 49.0. What is the equilibrium concentration of hydrogen iodide?', show: 'q' },
        { say: 'From an ICE table, hydrogen and iodine each fall to zero point five zero zero minus x, and hydrogen iodide rises to two x.', caption: 'From an ICE table, hydrogen and iodine each fall to 0.500 − x, and hydrogen iodide rises to 2x.', show: 'm.0', focus: 'm.0' },
        { say: 'So forty-nine equals two x, all squared, over zero point five zero zero minus x, all squared. Top and bottom are both perfect squares.', caption: 'So 49.0 = (2x)² over (0.500 − x)². Top and bottom are both perfect squares.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Taking square roots',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\sqrt{49.0} = 7.00 = \\dfrac{2x}{0.500 - x}',
            '2x = 3.50 - 7.00x \\quad \\Rightarrow \\quad 9.00x = 3.50',
            'x = 0.3889',
            '[\\ce{HI}] = 2x = \\good{0.778\\ \\text{mol/L}}',
            '[\\ce{H2}] = [\\ce{I2}] = 0.500 - 0.3889 = 0.111\\ \\text{mol/L}',
          ],
        },
      ],
      lines: [
        { say: 'Take the square root of both sides: seven equals two x over zero point five zero zero minus x.', caption: 'Take the square root of both sides: 7.00 = 2x over (0.500 − x).', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply out: two x equals three point five minus seven x. So nine x equals three point five, and x is zero point three eight eight nine.', caption: 'Multiply out: 2x = 3.50 − 7.00x. So 9.00x = 3.50, and x is 0.3889.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Hydrogen iodide is two x: zero point seven seven eight moles per litre. Hydrogen and iodine are each zero point one one one.', caption: 'Hydrogen iodide is 2x: 0.778 mol/L. Hydrogen and iodine are each 0.111.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'A very small K',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$0.500\\ \\text{mol/L}$ of $\\ce{COCl2}$ goes into an empty flask where $K_c = 8.0 \\times 10^{-7}$ for $\\ce{COCl2(g) <=> CO(g) + Cl2(g)}$. Find $[\\ce{CO}]$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '[\\ce{COCl2}] = 0.500 - x \\qquad [\\ce{CO}] = [\\ce{Cl2}] = x',
            '8.0 \\times 10^{-7} = \\dfrac{x^2}{0.500 - x} \\approx \\dfrac{x^2}{0.500}',
            'x = \\sqrt{8.0 \\times 10^{-7} \\times 0.500} = \\good{6.3 \\times 10^{-4}\\ \\text{mol/L}}',
            '\\text{Check: } \\dfrac{6.3 \\times 10^{-4}}{0.500} \\approx 0.1\\%',
          ],
        },
      ],
      lines: [
        { say: 'When K C is tiny, so little reacts that the change x is negligible next to the starting concentration.', caption: 'When Kc is tiny, so little reacts that the change x is negligible next to the starting concentration.' },
        { say: 'Take zero point five zero zero moles per litre of C O C L two, where K C is eight point zero times ten to the minus seven. Find the concentration of carbon monoxide.', caption: 'Take 0.500 mol/L of COCl₂, where Kc is 8.0 × 10⁻⁷. Find the concentration of carbon monoxide.', show: 'q' },
        { say: 'The ICE table gives zero point five zero zero minus x for C O C L two, and x each for carbon monoxide and chlorine.', caption: 'The ICE table gives 0.500 − x for COCl₂, and x each for carbon monoxide and chlorine.', show: 'm.0', focus: 'm.0' },
        { say: 'K C is tiny, so replace zero point five zero zero minus x by zero point five zero zero. Then x squared over zero point five zero zero equals eight point zero times ten to the minus seven.', caption: 'Kc is tiny, so replace 0.500 − x by 0.500. Then x² over 0.500 equals 8.0 × 10⁻⁷.', show: 'm.1', focus: 'm.1' },
        { say: 'So x is the square root of eight point zero times ten to the minus seven, times zero point five zero zero: six point three times ten to the minus four moles per litre.', caption: 'So x is the square root of 8.0 × 10⁻⁷ × 0.500: 6.3 × 10⁻⁴ mol/L.', show: 'm.2', focus: 'm.2' },
        { say: 'Now check: x is only about zero point one percent of zero point five zero zero, so the approximation was fine.', caption: 'Now check: x is only about 0.1% of 0.500, so the approximation was fine.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$0.200\\ \\text{mol/L}$ each of $\\ce{H2}$ and $\\ce{Br2}$ are put into an empty flask at a temperature where $K_c = 16.0$ for $\\ce{H2(g) + Br2(g) <=> 2HBr(g)}$. What is the equilibrium concentration of $\\ce{HBr}$, to three significant figures?',
          choices: ['$0.133\\ \\text{mol/L}$', '$0.0667\\ \\text{mol/L}$', '$0.160\\ \\text{mol/L}$', '$0.267\\ \\text{mol/L}$'],
          answer: 3,
          working: '$\\sqrt{16.0} = 4.00 = \\dfrac{2x}{0.200 - x}$, so $2x = 0.800 - 4.00x$, $6.00x = 0.800$ and $x = 0.1333$. $[\\ce{HBr}] = 2x = 0.267\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen and bromine start at zero point two zero zero moles per litre each, and K C is sixteen point zero. What is the equilibrium concentration of hydrogen bromide? Pause the video and try it.', caption: 'Your turn. Hydrogen and bromine start at 0.200 mol/L each, and Kc is 16.0. What is the equilibrium concentration of hydrogen bromide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The square root of sixteen is four, so four equals two x over zero point two zero zero minus x. Then six x equals zero point eight, x is zero point one three three, and hydrogen bromide is two x: zero point two six seven. Choice A stops at x.', caption: 'The answer is D. The square root of 16.0 is 4.00, so 4.00 = 2x over (0.200 − x). Then 6.00x = 0.800, x is 0.133, and hydrogen bromide is 2x: 0.267. Choice A stops at x.', show: 'q.answer' },
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
            'Set up an ICE table with $x$, then solve the expression for $x$.',
            'Both sides perfect squares: take the **square root** of both sides.',
            'A very small $K_c$: replace $c - x$ by $c$, then **check** that $x$ really is tiny.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To work backwards, set up an ICE table with x, then solve the expression for x.', show: 'sum.0' },
        { say: 'When both sides are perfect squares, take the square root of both sides.', show: 'sum.1' },
        { say: 'When K C is very small, treat x as negligible next to the starting concentration, and check afterwards. That completes this lesson. Next, you will see how an equilibrium responds when its conditions change.', caption: 'When Kc is very small, treat x as negligible next to the starting concentration, and check afterwards. That completes this lesson. Next, you will see how an equilibrium responds when its conditions change.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
