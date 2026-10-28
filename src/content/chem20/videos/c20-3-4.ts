import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-4',
  lessonId: 'c20-3-4',
  title: 'Molar Concentration, Part 1: Moles per Litre',
  thumbnailTitle: 'Moles per Litre',
  thumbnail: false,
  summary:
    'Molar concentration is the amount of solute in moles divided by the volume of the solution in litres, c = n/V, in mol/L (also written M); square brackets mean "the molar concentration of". Rearranged, n = cV and V = n/c, always with the volume in litres.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'Moles per Litre', subtitle: 'Counting the solute in moles' }],
      lines: [
        { say: 'A percentage tells you the mass of solute in a solution. But chemical reactions happen particle by particle.', show: 'title' },
        { say: 'So chemists count the solute in moles, and give the concentration in moles per litre.' },
        { say: 'This first part covers the formula. Later parts start from a mass, make a solution of known concentration, and find the concentration of each ion.' },
      ],
    },
    {
      chapter: 'Molar concentration',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Molar concentration', md: '$c = \\dfrac{n}{V}$: the amount of solute, $n$, in moles, divided by the volume of the **solution**, $V$, in litres. Its unit is $\\text{mol/L}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.25\\ \\text{M} = 0.25\\ \\text{mol/L}', '[\\ce{NaCl}] = 0.25\\ \\text{mol/L}'] },
      ],
      lines: [
        { say: 'Molar concentration is the amount of solute, in moles, divided by the volume of the solution, in litres. In symbols, the formula c equals n over V. Its unit is moles per litre.', show: 'def' },
        { say: 'Many books write moles per litre as a capital M, read molar. So a zero point two five molar solution has a concentration of zero point two five moles per litre.', show: 'm.0', focus: 'm.0' },
        { say: 'Square brackets around a formula mean the molar concentration of. So this line says that each litre of the solution holds zero point two five moles of sodium chloride.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding a concentration',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$0.45\\ \\text{mol}$ of solute is dissolved to make $1.20\\ \\text{L}$ of solution. What is the molar concentration, to the nearest thousandth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['c = \\dfrac{n}{V} = \\dfrac{0.45\\ \\text{mol}}{1.20\\ \\text{L}} = 0.375\\ \\text{mol/L}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Litres, not millilitres', md: 'Divide millilitres by 1000 first: $250\\ \\text{mL} = 0.250\\ \\text{L}$. Dividing by $1200\\ \\text{mL}$ instead of $1.20\\ \\text{L}$ gives a concentration a thousand times too small.' },
      ],
      lines: [
        { say: 'Example. Zero point four five moles of solute is dissolved to make one point two zero litres of solution. What is the molar concentration, to the nearest thousandth?', show: 'q' },
        { say: 'Divide the amount by the volume. Zero point four five moles over one point two zero litres is zero point three seven five moles per litre.', show: 'm', focus: 'm' },
        { say: 'The volume must be in litres. Divide millilitres by one thousand first: two hundred fifty millilitres is zero point two five zero litres.', show: 'mis' },
      ],
    },
    {
      chapter: 'Rearranging',
      layout: 'split',
      leftWidth: 480,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['To find', 'Use', 'Unit'],
          rows: [
            ['the concentration', '$c = \\dfrac{n}{V}$', '$\\text{mol/L}$'],
            ['the amount of solute', '$n = cV$', '$\\text{mol}$'],
            ['the volume of solution', '$V = \\dfrac{n}{c}$', '$\\text{L}$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Let the units decide', md: '$\\text{mol/L} \\times \\text{L} = \\text{mol}$, and $\\text{mol} \\div \\text{mol/L} = \\text{L}$.' },
      ],
      right: [
        { kind: 'text', id: 'q1', size: 'md', md: 'How many moles are in $250\\ \\text{mL}$ of a $0.150\\ \\text{mol/L}$ solution?' },
        { kind: 'math', id: 'm1', size: 'md', align: 'left', lines: ['V = 250\\ \\text{mL} = 0.250\\ \\text{L}', 'n = 0.150 \\times 0.250 = 0.0375\\ \\text{mol}'] },
        { kind: 'text', id: 'q2', size: 'md', md: 'What volume of a $0.350\\ \\text{mol/L}$ solution contains $0.0840\\ \\text{mol}$?' },
        { kind: 'math', id: 'm2', size: 'md', align: 'left', lines: ['V = \\dfrac{0.0840}{0.350} = 0.240\\ \\text{L} = 240\\ \\text{mL}'] },
      ],
      lines: [
        { say: 'Rearranging the formula gives the amount or the volume, when you know the other two quantities. The amount is n equals c times V. The volume is V equals n over c.', show: 't' },
        { say: 'How many moles of solute are in two hundred fifty millilitres of a zero point one five zero moles per litre solution? First, change the volume to litres.', show: ['q1', 'm1.0'], focus: 'm1.0' },
        { say: 'Then the amount is zero point one five zero times zero point two five zero: zero point zero three seven five moles.', show: 'm1.1', focus: 'm1.1' },
        { say: 'What volume of a zero point three five zero moles per litre solution contains zero point zero eight four zero moles? Divide: zero point two four zero litres, or two hundred forty millilitres.', show: ['q2', 'm2'], focus: 'm2' },
        { say: 'Let the units decide: if the unit of your answer comes out wrong, the formula is upside down.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many moles of solute are in $400\\ \\text{mL}$ of a $0.250\\ \\text{mol/L}$ solution? Molar concentration is $c = \\dfrac{n}{V}$, in moles per litre.',
          choices: ['$0.100\\ \\text{mol}$', '$100\\ \\text{mol}$', '$1.60\\ \\text{mol}$', '$0.000625\\ \\text{mol}$'],
          answer: 0,
          working: '$V = 400\\ \\text{mL} = 0.400\\ \\text{L}$, so $n = cV = 0.250 \\times 0.400 = 0.100\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many moles of solute are in four hundred millilitres of a zero point two five zero moles per litre solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four hundred millilitres is zero point four zero zero litres, and zero point two five zero times zero point four zero zero is zero point one zero zero moles. Choice B forgets to change millilitres to litres.', show: 'q.answer' },
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
            '**Molar concentration**: $c = \\dfrac{n}{V}$, in $\\text{mol/L}$, also written $\\text{M}$.',
            '$[\\ce{NaCl}]$ means the molar concentration of sodium chloride.',
            'Rearranged: $n = cV$ and $V = \\dfrac{n}{c}$.',
            'The volume is the volume of the **solution**, in litres.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Molar concentration is moles of solute per litre of solution, also written as a capital M.', show: 'sum.0' },
        { say: 'Square brackets around a formula mean its molar concentration.', show: 'sum.1' },
        { say: 'Rearranged, the amount is c times V, and the volume is n over c.', show: 'sum.2' },
        { say: 'And the volume is always the volume of the solution, in litres. In part two, you will start from a mass of solid. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
