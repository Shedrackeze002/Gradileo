import type { Explainer } from '@/video/script.ts';

const HEAD = ['', '$[\\ce{SO2}]$', '$[\\ce{O2}]$', '$[\\ce{SO3}]$'];

const video: Explainer = {
  id: 'c30-4-2-c',
  lessonId: 'c30-4-2',
  title: 'The Equilibrium Constant, Part 3: Calculating K with ICE Tables',
  thumbnailTitle: 'Calculating K with ICE Tables',
  thumbnail: false,
  summary:
    'When every equilibrium concentration is known, substitute them into the expression: for PCl₅ ⇌ PCl₃ + Cl₂, Kc = (0.0300)(0.0700) / 0.0500 = 0.0420. When only the starting amounts and one equilibrium amount are known, an ICE table of initial, change and equilibrium concentrations finds the rest: 0.600 mol of SO₂ and 0.400 mol of O₂ in 2.00 L, with 0.200 mol of SO₃ at equilibrium, give Kc = 1.67. Always use equilibrium concentrations, not moles or initial values.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Calculating K with ICE Tables', subtitle: 'Initial, change, equilibrium' }],
      lines: [
        { say: 'An equilibrium constant comes from measurements: the concentrations in a mixture that has reached equilibrium.', show: 'title' },
        { say: 'In this part, you will calculate K C from equilibrium concentrations, and use an ICE table when only some of them are known.', caption: 'In this part, you will calculate Kc from equilibrium concentrations, and use an ICE table when only some of them are known.' },
      ],
    },
    {
      chapter: 'K from equilibrium concentrations',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'At equilibrium: $[\\ce{PCl5}] = 0.0500$, $[\\ce{PCl3}] = 0.0300$ and $[\\ce{Cl2}] = 0.0700\\ \\text{mol/L}$. Find $K_c$ to three significant figures.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}', 'K_c = \\dfrac{[\\ce{PCl3}][\\ce{Cl2}]}{[\\ce{PCl5}]} = \\dfrac{(0.0300)(0.0700)}{0.0500} = 0.0420'] },
      ],
      lines: [
        { say: 'When every equilibrium concentration is known, substitute them into the expression. A flask holds phosphorus pentachloride, phosphorus trichloride and chlorine at equilibrium.', show: ['q', 'm.0'] },
        { say: 'K C is phosphorus trichloride times chlorine, over phosphorus pentachloride. That is zero point zero three, times zero point zero seven, over zero point zero five: zero point zero four two zero.', caption: 'Kc is [PCl₃][Cl₂] over [PCl₅]. That is 0.0300 × 0.0700 / 0.0500 = 0.0420.', show: 'm.1', focus: 'm.1' },
        { say: 'K C is less than one, so reactants are favoured.', caption: 'Kc is less than one, so reactants are favoured.' },
      ],
    },
    {
      chapter: 'ICE tables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'ICE table', md: 'A table of the **initial** concentrations, the **change** in each, and the **equilibrium** concentrations. The changes are in the ratio of the coefficients, written with an unknown $x$: reactants decrease and products increase.' },
        { kind: 'bullets', id: 'b', items: ['Change moles to concentrations: $c = \\dfrac{n}{V}$.', 'Fill in the initial row; products not yet present start at 0.', 'Write the changes with $x$, using the coefficients.', 'Use the known equilibrium concentration to find $x$.', 'Substitute the **equilibrium** concentrations into the expression.'] },
      ],
      lines: [
        { say: 'Usually, only the starting amounts are known, plus one equilibrium concentration. An ICE table organises the rest: rows for the initial concentrations, the change, and the equilibrium concentrations.', show: 'def' },
        { say: 'The changes follow the coefficients, with an unknown x. Convert to concentrations, fill in the table, find x, and substitute the equilibrium values.', show: ['b.0', 'b.1', 'b.2', 'b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Setting up the table',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$0.600\\ \\text{mol}$ of $\\ce{SO2}$ and $0.400\\ \\text{mol}$ of $\\ce{O2}$ go into an empty $2.00\\ \\text{L}$ flask: $\\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$. At equilibrium it holds $0.200\\ \\text{mol}$ of $\\ce{SO3}$. Find $K_c$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['[\\ce{SO2}]_0 = 0.600 \\div 2.00 = 0.300 \\qquad [\\ce{O2}]_0 = 0.400 \\div 2.00 = 0.200', '[\\ce{SO3}]_{eq} = 0.200 \\div 2.00 = 0.100'] },
        {
          kind: 'table',
          id: 'tb',
          head: HEAD,
          rows: [
            ['Initial', '0.300', '0.200', '0'],
            ['Change', '$-2x$', '$-x$', '$+2x$'],
            ['Equilibrium', '$0.300 - 2x$', '$0.200 - x$', '$2x$'],
          ],
        },
      ],
      lines: [
        { say: 'Sulfur dye-oxide and oxygen go into an empty two-litre flask, and at equilibrium it holds zero point two zero zero moles of sulfur trioxide.', caption: 'Sulfur dioxide and oxygen go into an empty 2.00 L flask, and at equilibrium it holds 0.200 mol of sulfur trioxide.', show: 'q' },
        { say: 'First, divide moles by volume: zero point three zero zero moles per litre of sulfur dye-oxide, zero point two zero zero of oxygen, and zero point one zero zero of sulfur trioxide at equilibrium.', caption: 'First, divide moles by volume: 0.300 mol/L of sulfur dioxide, 0.200 of oxygen, and 0.100 of sulfur trioxide at equilibrium.', show: 'm', focus: 'm' },
        { say: 'The initial row holds the starting concentrations, and zero for sulfur trioxide, which is not there yet.', show: 'tb.0', focus: 'tb.0' },
        { say: 'The changes follow the coefficients: minus two x, minus x, and plus two x. Adding each change to the start gives the equilibrium row.', show: ['tb.1', 'tb.2'], focus: ['tb.1', 'tb.2'] },
      ],
    },
    {
      chapter: 'Solving for K',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: HEAD,
          rows: [
            ['Initial', '0.300', '0.200', '0'],
            ['Change ($x = 0.0500$)', '$-0.100$', '$-0.0500$', '$+0.100$'],
            ['Equilibrium', '$\\good{0.200}$', '$\\good{0.150}$', '$\\good{0.100}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['K_c = \\dfrac{[\\ce{SO3}]^2}{[\\ce{SO2}]^2[\\ce{O2}]} = \\dfrac{(0.100)^2}{(0.200)^2(0.150)} = 1.67'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Equilibrium concentrations only', md: 'Moles instead of concentrations give $\\dfrac{(0.200)^2}{(0.400)^2(0.300)} = 0.833$: wrong.' },
      ],
      lines: [
        { say: 'Sulfur trioxide at equilibrium is two x, which is zero point one zero zero. So x is zero point zero five zero zero.', caption: 'Sulfur trioxide at equilibrium is 2x, which is 0.100. So x is 0.0500.', show: ['tb.0', 'tb.1'], focus: 'tb.1' },
        { say: 'Complete the equilibrium row: zero point two zero zero of sulfur dye-oxide, zero point one five zero of oxygen, and zero point one zero zero of sulfur trioxide.', caption: 'Complete the equilibrium row: 0.200 of sulfur dioxide, 0.150 of oxygen, and 0.100 of sulfur trioxide.', show: 'tb.2', focus: 'tb.2' },
        { say: 'Substitute them: zero point one squared, over zero point two squared times zero point one five. K C is one point six seven.', caption: 'Substitute them: 0.100² over 0.200² × 0.150. Kc is 1.67.', show: 'm.0', focus: 'm.0' },
        { say: 'Always use equilibrium concentrations. The amounts in moles, or the initial concentrations, give a wrong value.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sealed flask starts with $0.200\\ \\text{mol/L}$ each of $\\ce{H2}$ and $\\ce{I2}$: $\\ce{H2(g) + I2(g) <=> 2HI(g)}$. At equilibrium, $[\\ce{HI}] = 0.300\\ \\text{mol/L}$. What is $K_c$, to three significant figures?',
          choices: ['$2.25$', '$36.0$', '$120$', '$9.00$'],
          answer: 1,
          working: '$2x = 0.300$, so $x = 0.150$ and $[\\ce{H2}] = [\\ce{I2}] = 0.200 - 0.150 = 0.0500$. $K_c = \\dfrac{(0.300)^2}{(0.0500)(0.0500)} = 36.0$.',
        },
      ],
      lines: [
        { say: 'Your turn. A flask starts with zero point two zero zero moles per litre each of hydrogen and iodine. At equilibrium, hydrogen iodide is zero point three zero zero moles per litre. What is K C? Pause the video and try it.', caption: 'Your turn. A flask starts with 0.200 mol/L each of hydrogen and iodine. At equilibrium, [HI] is 0.300 mol/L. What is Kc? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Two x is zero point three, so x is zero point one five, and hydrogen and iodine each fall to zero point zero five. Zero point three squared over zero point zero five squared is thirty-six. Choice A uses the initial concentrations.', caption: 'The answer is B. 2x is 0.300, so x is 0.150, and hydrogen and iodine each fall to 0.0500. 0.300² over 0.0500² is 36.0. Choice A uses the initial concentrations.', show: 'q.answer' },
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
            'With every equilibrium concentration known, substitute into the expression.',
            '**ICE table**: initial, change (in the ratio of the coefficients) and equilibrium concentrations.',
            'Convert moles to mol/L first, and always use **equilibrium** concentrations.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When every equilibrium concentration is known, substitute them into the expression.', show: 'sum.0' },
        { say: 'Otherwise, an ICE table finds them: initial, change and equilibrium.', show: 'sum.1' },
        { say: 'Convert moles to concentrations first, and always use equilibrium concentrations. In part four, you will work backwards from K C to a concentration. See you there!', caption: 'Convert moles to concentrations first, and always use equilibrium concentrations. In part four, you will work backwards from Kc to a concentration. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
