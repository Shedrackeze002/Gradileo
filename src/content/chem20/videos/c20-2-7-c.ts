import type { Explainer } from '@/video/script.ts';

const RULE = 'Use $PV = nRT$ with $R = 8.314\\ \\text{kPa·L/(mol·K)}$.';

const video: Explainer = {
  id: 'c20-2-7-c',
  lessonId: 'c20-2-7',
  title: 'The Ideal Gas Law, Part 3: Mass and Molar Mass',
  thumbnailTitle: 'Mass and Molar Mass',
  thumbnail: false,
  summary:
    'The ideal gas law gives an amount, n = PV/RT, and the molar mass turns it into a mass, m = n × M. Knowing the mass of a sample as well, M = m/n gives its molar mass, and the closest molar mass among the possible gases identifies it: a 2.746 g sample in 1.20 L at 80 kPa and 25 °C is 70.9 g/mol, chlorine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'Mass and Molar Mass', subtitle: 'Weighing a gas, and naming it' }],
      lines: [
        { say: 'The ideal gas law gives an amount in moles, and the molar mass turns moles into grams.', show: 'title' },
        { say: 'In this part, you will find the mass of a gas, then its molar mass, and use the molar mass to identify an unknown gas.' },
      ],
    },
    {
      chapter: 'Finding a mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `What mass of carbon dioxide, $\\ce{CO2}$, is in a $10.0\\ \\text{L}$ container at $150\\ \\text{kPa}$ and $25^\\circ\\text{C}$, to the nearest tenth? ${RULE} Use C $12.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.` },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'T = 25 + 273.15 = 298.15\\ \\text{K}',
            'n = \\dfrac{PV}{RT} = \\dfrac{150 \\times 10.0}{8.314 \\times 298.15} = 0.6051\\ \\text{mol}',
            'M = 12.01 + 2 \\times 16.00 = 44.01\\ \\text{g/mol}',
            'm = n \\times M = 0.6051 \\times 44.01 = 26.63 \\approx \\good{26.6\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'What mass of carbon dioxide is in a ten point zero litre container at one hundred fifty kilopascals and twenty-five degrees Celsius?', caption: 'What mass of carbon dioxide is in a 10.0 L container at 150 kPa and 25°C?', show: 'q' },
        { say: 'Kelvins first: two hundred ninety-eight point one five. Then the amount, n equals P V over R T: zero point six zero five one moles.', caption: 'Kelvins first: 298.15 K. Then the amount, n = PV/RT: 0.6051 mol.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The molar mass of carbon dioxide is forty-four point zero one grams per mole. The mass is the amount times the molar mass: twenty-six point six grams, to the nearest tenth.', caption: 'The molar mass of carbon dioxide is 44.01 g/mol. The mass is the amount times the molar mass: 26.6 g, to the nearest tenth.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Finding a molar mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `A $2.308\\ \\text{g}$ sample of a gas occupies $1.50\\ \\text{L}$ at $120\\ \\text{kPa}$ and $27^\\circ\\text{C}$. What is the molar mass of the gas, to the nearest tenth? ${RULE}` },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['T = 27 + 273.15 = 300.15\\ \\text{K}', 'n = \\dfrac{PV}{RT} = \\dfrac{120 \\times 1.50}{8.314 \\times 300.15} = 0.07213\\ \\text{mol}', 'M = \\dfrac{m}{n} = \\dfrac{2.308}{0.07213} = \\good{32.0\\ \\text{g/mol}}'],
        },
      ],
      lines: [
        { say: 'It works the other way too: if you also know the mass of a gas sample, you can find its molar mass.' },
        { say: 'A two point three zero eight gram sample of a gas occupies one point five zero litres at one hundred twenty kilopascals and twenty-seven degrees Celsius. What is its molar mass?', caption: 'A 2.308 g sample of a gas occupies 1.50 L at 120 kPa and 27°C. What is its molar mass?', show: 'q' },
        { say: 'First the amount: in kelvins, the temperature is three hundred point one five, and n equals P V over R T, zero point zero seven two one three moles.', caption: 'First the amount: in kelvins, the temperature is 300.15 K, and n = PV/RT, 0.07213 mol.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Molar mass is mass per mole: two point three zero eight divided by zero point zero seven two one three is thirty-two point zero grams per mole.', caption: 'Molar mass is mass per mole: 2.308 ÷ 0.07213 = 32.0 g/mol.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Identifying a gas',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gas', 'Molar mass', 'Gas', 'Molar mass'],
          rows: [
            ['hydrogen, $\\ce{H2}$', '$2.02\\ \\text{g/mol}$', 'nitrogen, $\\ce{N2}$', '$28.02\\ \\text{g/mol}$'],
            ['helium, $\\ce{He}$', '$4.00\\ \\text{g/mol}$', 'oxygen, $\\ce{O2}$', '$32.00\\ \\text{g/mol}$'],
            ['methane, $\\ce{CH4}$', '$16.05\\ \\text{g/mol}$', 'argon, $\\ce{Ar}$', '$39.95\\ \\text{g/mol}$'],
            ['ammonia, $\\ce{NH3}$', '$17.04\\ \\text{g/mol}$', 'carbon dioxide, $\\ce{CO2}$', '$44.01\\ \\text{g/mol}$'],
            ['sulfur dioxide, $\\ce{SO2}$', '$64.06\\ \\text{g/mol}$', 'chlorine, $\\ce{Cl2}$', '$70.90\\ \\text{g/mol}$'],
          ],
        },
        { kind: 'text', id: 'k', size: 'md', md: 'Compare a measured molar mass with the possible gases, and choose the **closest**.' },
      ],
      lines: [
        { say: 'Every gas has its own molar mass, so a measured molar mass can identify an unknown gas. Compare it with the molar masses of the possible gases, and choose the closest.', show: ['t', 'k'] },
      ],
    },
    {
      chapter: 'A gas to identify',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `A $2.746\\ \\text{g}$ sample of a gas occupies $1.20\\ \\text{L}$ at $80\\ \\text{kPa}$ and $25^\\circ\\text{C}$. What is its molar mass, to the nearest tenth? Is it argon, carbon dioxide, sulfur dioxide or chlorine? ${RULE}` },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'n = \\dfrac{PV}{RT} = \\dfrac{80 \\times 1.20}{8.314 \\times 298.15} = 0.03873\\ \\text{mol}',
            'M = \\dfrac{m}{n} = \\dfrac{2.746}{0.03873} = 70.9\\ \\text{g/mol}',
            '\\ce{Ar}\\ 39.95 \\quad \\ce{CO2}\\ 44.01 \\quad \\ce{SO2}\\ 64.06 \\quad \\good{\\ce{Cl2}\\ 70.90}',
          ],
        },
      ],
      lines: [
        {
          say: 'A two point seven four six gram sample of a gas occupies one point two zero litres at eighty kilopascals and twenty-five degrees Celsius. Is it argon, carbon dioxide, sulfur dioxide or chlorine?',
          caption: 'A 2.746 g sample of a gas occupies 1.20 L at 80 kPa and 25°C. Is it argon, carbon dioxide, sulfur dioxide or chlorine?',
          show: 'q',
        },
        { say: 'The amount is zero point zero three eight seven three moles, so the molar mass is seventy point nine grams per mole.', caption: 'The amount is 0.03873 mol, so the molar mass is 70.9 g/mol.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Chlorine, at seventy point nine zero grams per mole, is the closest match. The gas is chlorine.', caption: 'Chlorine, at 70.90 g/mol, is the closest match. The gas is chlorine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Round the amount with care',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round the amount with care', md: 'Keep at least four significant figures in $n$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\good{\\dfrac{2.746}{0.03873} = 70.9\\ \\text{g/mol}} \\qquad \\bad{\\dfrac{2.746}{0.039} = 70.4\\ \\text{g/mol}}'] },
      ],
      lines: [
        { say: 'Keep at least four significant figures in the amount. Rounding zero point zero three eight seven three to zero point zero three nine would give seventy point four grams per mole, instead of seventy point nine.', caption: 'Keep at least four significant figures in the amount. Rounding 0.03873 to 0.039 would give 70.4 g/mol, instead of 70.9 g/mol.', show: ['tip', 'm'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: `A $1.612\\ \\text{g}$ sample of a gas occupies $1.00\\ \\text{L}$ at $100\\ \\text{kPa}$ and $25^\\circ\\text{C}$. Which gas is it? ${RULE} Molar masses: $\\ce{N2}$ $28.02$, $\\ce{O2}$ $32.00$, $\\ce{Ar}$ $39.95$, $\\ce{CO2}$ $44.01\\ \\text{g/mol}$.`,
          choices: ['oxygen, $\\ce{O2}$', 'carbon dioxide, $\\ce{CO2}$', 'argon, $\\ce{Ar}$', 'nitrogen, $\\ce{N2}$'],
          answer: 2,
          working: '$n = \\dfrac{100 \\times 1.00}{8.314 \\times 298.15} = 0.04034\\ \\text{mol}$, so $M = \\dfrac{1.612}{0.04034} = 40.0\\ \\text{g/mol}$: closest to argon, $39.95\\ \\text{g/mol}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A one point six one two gram sample of a gas occupies one point zero zero litres at one hundred kilopascals and twenty-five degrees Celsius. Which gas is it? Pause the video and try it.',
          caption: 'Your turn. A 1.612 g sample of a gas occupies 1.00 L at 100 kPa and 25°C. Which gas is it? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, argon. The amount is zero point zero four zero three four moles, so the molar mass is forty point zero grams per mole. Choice B, carbon dioxide, is four grams per mole away.',
          caption: 'The answer is C, argon. The amount is 0.04034 mol, so the molar mass is 40.0 g/mol. Choice B, carbon dioxide, is four grams per mole away.',
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
            'Mass: $n = \\dfrac{PV}{RT}$, then $m = n \\times M$.',
            'Molar mass: $n = \\dfrac{PV}{RT}$, then $M = \\dfrac{m}{n}$.',
            'Identify a gas by the closest molar mass, keeping at least four significant figures in $n$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a mass, find the amount with the ideal gas law, then multiply by the molar mass.', show: 'sum.0' },
        { say: 'To find a molar mass, find the amount, then divide the mass by it.', show: 'sum.1' },
        { say: 'Identify a gas by the closest molar mass. In part four, you will see when real gases stop behaving like the ideal gas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
