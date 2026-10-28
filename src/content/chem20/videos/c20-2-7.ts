import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, container, frame, tag } from './lib/c20-2b-figures.ts';

// One gas in one state, with its four quantities: pressure on the piston, volume, amount and temperature.
const state = figure(
  's',
  [
    container({ at: [0, 0], w: 3.6, h: 3.6, lid: 'piston', count: 7, seed: 12 }),
    arrow('p-arrow', [0.75, 5.9], [0.75, 3.95], { tone: 'opp', group: 'pres' }),
    tag('p-label', [0.75, 5.9], 'P', { place: 'above', tone: 'opp', group: 'pres' }),
    arrow('v-up', [4.3, 1.8], [4.3, 3.6], { tone: 'adj', weight: 2.5, group: 'vol' }),
    arrow('v-down', [4.3, 1.8], [4.3, 0], { tone: 'adj', weight: 2.5, group: 'vol' }),
    tag('v-label', [4.4, 1.8], 'V', { place: 'right', tone: 'adj', group: 'vol' }),
    tag('n-label', [1.8, -0.3], 'n\\ \\text{mol of gas}', { place: 'below', tone: 'good', group: 'amt' }),
    tag('t-label', [1.8, -1.0], 'T\\ \\text{in kelvins}', { place: 'below', tone: 'theta', group: 'temp' }),
    frame('room', [-0.6, -1.8], [5.4, 6.6]),
  ],
  520,
);

const video: Explainer = {
  id: 'c20-2-7',
  lessonId: 'c20-2-7',
  title: 'The Ideal Gas Law, Part 1: One Law for Four Quantities',
  thumbnailTitle: 'One Law for Four Quantities',
  thumbnail: 's',
  summary:
    "Boyle's, Charles's and Avogadro's laws together say that V is proportional to nT/P; the gas constant R = 8.314 kPa·L/(mol·K) turns this into the ideal gas law, PV = nRT, which links the pressure, volume, amount and Kelvin temperature of a gas in one state. It gives the molar volumes at STP and SATP, and rearranged, P = nRT/V finds a pressure.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'One Law for Four Quantities', subtitle: 'The ideal gas law' }],
      lines: [
        { say: 'Each gas law so far compares a gas before and after a change, while two of its quantities stay fixed.', show: 'title' },
        { say: 'The ideal gas law links all four quantities for a gas in one state, so you can find any one from the other three.' },
        { say: 'This part builds the law. Later parts use it to find each quantity and a molar mass, and show when real gases stop following it.' },
      ],
    },
    {
      chapter: 'Three laws, one equation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Law', 'Held constant', 'The volume of a gas is'],
          rows: [
            ["Boyle's law", '$n$ and $T$', 'inversely proportional to pressure: $V \\propto \\dfrac{1}{P}$'],
            ["Charles's law", '$n$ and $P$', 'directly proportional to Kelvin temperature: $V \\propto T$'],
            ["Avogadro's law", '$T$ and $P$', 'directly proportional to amount: $V \\propto n$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V \\propto \\dfrac{nT}{P}', 'V = \\dfrac{nRT}{P} \\quad \\Longrightarrow \\quad \\good{PV = nRT}'] },
      ],
      lines: [
        { say: 'Three gas laws describe how the volume depends on one quantity at a time. By Boyle’s law, it is inversely proportional to the pressure.', show: 't.0', focus: 't.0' },
        { say: 'By Charles’s law, it is directly proportional to the Kelvin temperature. And by Avogadro’s law, it is directly proportional to the amount of gas.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Put together, the volume is proportional to n times T, over P.', caption: 'Put together, the volume is proportional to nT/P.', show: 'm.0', focus: 'm.0' },
        { say: 'A constant, R, turns the proportion into an equation. Multiply both sides by P, and you have the ideal gas law: P V equals n R T.', caption: 'A constant, R, turns the proportion into an equation. Multiply both sides by P, and you have the ideal gas law: PV = nRT.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The gas constant',
      layout: 'split',
      leftWidth: 460,
      left: [state],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ideal gas law', md: 'For a gas in one state, $PV = nRT$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Symbol', 'Quantity', 'Unit'],
          rows: [
            ['$P$', 'pressure', 'kilopascals, $\\text{kPa}$'],
            ['$V$', 'volume', 'litres, $\\text{L}$'],
            ['$n$', 'amount of gas', 'moles, $\\text{mol}$'],
            ['$T$', 'temperature', 'kelvins, $\\text{K}$'],
            ['$R$', 'gas constant', '$8.314\\ \\text{kPa·L/(mol·K)}$'],
          ],
        },
      ],
      lines: [
        { say: 'Picture one gas in one state. P is its pressure, V its volume, n the amount of gas, and T its Kelvin temperature.', show: ['def', 's.box', 's.piston', 's.p', 's.pres', 's.vol', 's.amt', 's.temp', 't.0', 't.1', 't.2', 't.3'] },
        { say: 'R is the gas constant: eight point three one four kilopascal litres per mole kelvin. It is the same for every gas.', caption: 'R is the gas constant: 8.314 kPa·L/(mol·K). It is the same for every gas.', show: 't.4', focus: 't.4' },
        { say: 'Its units decide the units of everything else: pressure in kilopascals, volume in litres, amount in moles, and temperature in kelvins.', focus: ['t.0', 't.1', 't.2', 't.3'] },
      ],
    },
    {
      chapter: 'The molar volume again',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{STP: } V = \\dfrac{nRT}{P} = \\dfrac{1 \\times 8.314 \\times 273.15}{101.325} = \\good{22.4\\ \\text{L}}', '\\text{SATP: } V = \\dfrac{1 \\times 8.314 \\times 298.15}{100} = \\good{24.8\\ \\text{L}}'],
        },
        { kind: 'text', id: 'k', size: 'md', md: 'The ideal gas law contains both molar volumes.' },
      ],
      lines: [
        {
          say: 'Check it with one mole at S T P, two hundred seventy-three point one five kelvins and one hundred one point three two five kilopascals. V equals n R T over P: twenty-two point four litres, the molar volume.',
          caption: 'Check it with one mole at STP, 273.15 K and 101.325 kPa. V = nRT/P: 22.4 L, the molar volume.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'At S A T P, it gives twenty-four point eight litres. The ideal gas law contains both.', caption: 'At SATP, it gives 24.8 L. The ideal gas law contains both.', show: ['m.1', 'k'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the pressure',
      layout: 'split',
      leftWidth: 400,
      left: [
        {
          kind: 'table',
          id: 'r',
          head: ['To find', 'Use'],
          rows: [
            ['pressure', '$P = \\dfrac{nRT}{V}$'],
            ['volume', '$V = \\dfrac{nRT}{P}$'],
            ['amount', '$n = \\dfrac{PV}{RT}$'],
            ['temperature', '$T = \\dfrac{PV}{nR}$'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $15.0\\ \\text{L}$ container holds $1.20\\ \\text{mol}$ of gas at $350\\ \\text{K}$. What is the pressure of the gas, to the nearest whole number? Use $PV = nRT$ with $R = 8.314\\ \\text{kPa·L/(mol·K)}$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['P = \\dfrac{nRT}{V}', '= \\dfrac{1.20 \\times 8.314 \\times 350}{15.0}', '= 232.8 \\approx \\good{233\\ \\text{kPa}}'] },
      ],
      lines: [
        { say: 'To find one quantity, rearrange P V equals n R T for it, then substitute the other four.', caption: 'To find one quantity, rearrange PV = nRT for it, then substitute the other four.', show: 'r' },
        { say: 'A fifteen point zero litre container holds one point two zero moles of gas at three hundred fifty kelvins. What is the pressure of the gas?', caption: 'A 15.0 L container holds 1.20 mol of gas at 350 K. What is the pressure of the gas?', show: 'q' },
        { say: 'Solve for the pressure: P equals n R T over V.', caption: 'Solve for the pressure: P = nRT/V.', show: 'm.0', focus: ['m.0', 'r.0'] },
        {
          say: 'One point two zero, times eight point three one four, times three hundred fifty, divided by fifteen point zero, is two hundred thirty-two point eight: two hundred thirty-three kilopascals.',
          caption: '1.20 × 8.314 × 350 ÷ 15.0 = 232.8: 233 kPa.',
          show: ['m.1', 'm.2'],
          focus: 'm.2',
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
          prompt: 'A $12.0\\ \\text{L}$ container holds $0.75\\ \\text{mol}$ of gas at $320\\ \\text{K}$. What is the pressure of the gas, to the nearest whole number? Use $PV = nRT$ with $R = 8.314\\ \\text{kPa·L/(mol·K)}$.',
          choices: ['$222\\ \\text{kPa}$', '$166\\ \\text{kPa}$', '$1995\\ \\text{kPa}$', '$0.234\\ \\text{kPa}$'],
          answer: 1,
          working: '$P = \\dfrac{nRT}{V} = \\dfrac{0.75 \\times 8.314 \\times 320}{12.0} = 166.28\\ \\text{kPa}$, so $166\\ \\text{kPa}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A twelve point zero litre container holds zero point seven five moles of gas at three hundred twenty kelvins. What is the pressure of the gas? Pause the video and try it.',
          caption: 'Your turn. A 12.0 L container holds 0.75 mol of gas at 320 K. What is the pressure of the gas? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, one hundred sixty-six kilopascals: zero point seven five, times eight point three one four, times three hundred twenty, over twelve point zero. Choice C forgets to divide by the volume.',
          caption: 'The answer is B, 166 kPa: 0.75 × 8.314 × 320 ÷ 12.0. Choice C forgets to divide by the volume.',
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
            'The **ideal gas law**, $PV = nRT$, links pressure, volume, amount and temperature for a gas in one state.',
            'The **gas constant** is $R = 8.314\\ \\text{kPa·L/(mol·K)}$: use kPa, L, mol and K.',
            'Rearrange for the quantity you want: $P = \\dfrac{nRT}{V}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The ideal gas law, P V equals n R T, links pressure, volume, amount and temperature for a gas in one state.', caption: 'Let’s sum up. The ideal gas law, PV = nRT, links pressure, volume, amount and temperature for a gas in one state.', show: 'sum.0' },
        { say: 'The gas constant is eight point three one four, so use kilopascals, litres, moles and kelvins.', caption: 'The gas constant is 8.314 kPa·L/(mol·K), so use kilopascals, litres, moles and kelvins.', show: 'sum.1' },
        { say: 'Rearrange for the quantity you want. In part two, you will start from degrees Celsius. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
