import type { Explainer } from '@/video/script.ts';

const RULE = 'Use $PV = nRT$ with $R = 8.314\\ \\text{kPa·L/(mol·K)}$.';

const video: Explainer = {
  id: 'c20-2-7-b',
  lessonId: 'c20-2-7',
  title: 'The Ideal Gas Law, Part 2: Kelvins First',
  thumbnailTitle: 'Kelvins First',
  thumbnail: false,
  summary:
    'Most questions give a temperature in degrees Celsius, and PV = nRT needs kelvins, so add 273.15 first: 0.45 mol at 120 kPa and 35 °C occupies 9.61 L, not the 1.09 L that 35 would give. Rearranged, n = PV/RT finds an amount and T = PV/nR finds a temperature, which comes out in kelvins: subtract 273.15 for degrees Celsius.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'Kelvins First', subtitle: 'Finding a volume, an amount or a temperature' }],
      lines: [
        { say: 'In part one, you found a pressure with P V equals n R T, from a temperature in kelvins.', caption: 'In part one, you found a pressure with PV = nRT, from a temperature in kelvins.', show: 'title' },
        { say: 'Most questions give the temperature in degrees Celsius. In this part, you will find a volume, an amount and a temperature, changing to kelvins first.' },
      ],
    },
    {
      chapter: 'Finding the volume',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `What volume does $0.45\\ \\text{mol}$ of gas occupy at $120\\ \\text{kPa}$ and $35^\\circ\\text{C}$, to the nearest hundredth? ${RULE}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['T = 35 + 273.15 = 308.15\\ \\text{K}', 'V = \\dfrac{nRT}{P} = \\dfrac{0.45 \\times 8.314 \\times 308.15}{120} = 9.607\\ \\text{L}', 'V = \\good{9.61\\ \\text{L}}'] },
      ],
      lines: [
        { say: 'What volume does zero point four five moles of gas occupy at one hundred twenty kilopascals and thirty-five degrees Celsius?', caption: 'What volume does 0.45 mol of gas occupy at 120 kPa and 35°C?', show: 'q' },
        { say: 'The ideal gas law needs kelvins, so change the temperature first. Thirty-five plus two hundred seventy-three point one five is three hundred eight point one five kelvins.', caption: 'The ideal gas law needs kelvins, so change the temperature first. 35 + 273.15 = 308.15 K.', show: 'm.0', focus: 'm.0' },
        { say: 'Then V equals n R T over P: nine point six zero seven, or nine point six one litres to the nearest hundredth.', caption: 'Then V = nRT/P: 9.607, or 9.61 L to the nearest hundredth.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Degrees Celsius in the law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Temperature in degrees Celsius', md: 'Using $35$ instead of $308.15$ gives a volume nearly **nine times too small**. At $0^\\circ\\text{C}$ it would even give a volume of zero. Always change the temperature to kelvins before you use $PV = nRT$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{in kelvins: } \\good{\\dfrac{0.45 \\times 8.314 \\times 308.15}{120} = 9.61\\ \\text{L}}', '\\text{in degrees Celsius: } \\bad{\\dfrac{0.45 \\times 8.314 \\times 35}{120} = 1.09\\ \\text{L}}'] },
      ],
      lines: [
        { say: 'Using thirty-five instead of three hundred eight point one five gives one point zero nine litres, nearly nine times too small.', caption: 'Using 35 instead of 308.15 gives 1.09 L, nearly nine times too small.', show: ['oops', 'm'] },
        { say: 'At zero degrees Celsius, it would even give a volume of zero. Always change the temperature to kelvins before you use the ideal gas law.' },
      ],
    },
    {
      chapter: 'Finding the amount',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `How many moles of gas are in a $20.0\\ \\text{L}$ tank at $250\\ \\text{kPa}$ and $18^\\circ\\text{C}$? Give the answer to the nearest hundredth. ${RULE}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['T = 18 + 273.15 = 291.15\\ \\text{K}', 'n = \\dfrac{PV}{RT} = \\dfrac{250 \\times 20.0}{8.314 \\times 291.15} = 2.066\\ \\text{mol}', 'n = \\good{2.07\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'How many moles of gas are in a twenty point zero litre tank at two hundred fifty kilopascals and eighteen degrees Celsius?', caption: 'How many moles of gas are in a 20.0 L tank at 250 kPa and 18°C?', show: 'q' },
        { say: 'Kelvins first: two hundred ninety-one point one five.', caption: 'Kelvins first: 291.15 K.', show: 'm.0', focus: 'm.0' },
        { say: 'Then n equals P V over R T. Two hundred fifty times twenty point zero, divided by eight point three one four times two hundred ninety-one point one five, is two point zero seven moles, to the nearest hundredth.', caption: 'Then n = PV/RT. 250 × 20.0, divided by 8.314 × 291.15, is 2.07 mol, to the nearest hundredth.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding the temperature',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `$0.85\\ \\text{mol}$ of gas in a $15.0\\ \\text{L}$ container has a pressure of $180\\ \\text{kPa}$. What is its temperature in degrees Celsius? Round to the nearest degree. ${RULE}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['T = \\dfrac{PV}{nR} = \\dfrac{180 \\times 15.0}{0.85 \\times 8.314} = 382.1\\ \\text{K}', 'T = 382.1 - 273.15 \\approx \\good{109^\\circ\\text{C}}'] },
      ],
      lines: [
        { say: 'Zero point eight five moles of gas in a fifteen point zero litre container has a pressure of one hundred eighty kilopascals. What is its temperature in degrees Celsius?', caption: '0.85 mol of gas in a 15.0 L container has a pressure of 180 kPa. What is its temperature in degrees Celsius?', show: 'q' },
        { say: 'Solve for T: P V over n R. That gives three hundred eighty-two point one kelvins.', caption: 'Solve for T: PV/nR. That gives 382.1 K.', show: 'm.0', focus: 'm.0' },
        { say: 'Solving for T always gives kelvins. The question asks for degrees Celsius, so subtract two hundred seventy-three point one five at the end: one hundred nine degrees Celsius, to the nearest degree.', caption: 'Solving for T always gives kelvins. The question asks for degrees Celsius, so subtract 273.15 at the end: 109°C, to the nearest degree.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: `How many moles of gas are in a $25.0\\ \\text{L}$ tank at $200\\ \\text{kPa}$ and $27^\\circ\\text{C}$? Give the answer to the nearest hundredth. ${RULE} Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.`,
          choices: ['$22.27\\ \\text{mol}$', '$0.50\\ \\text{mol}$', '$601.40\\ \\text{mol}$', '$2.00\\ \\text{mol}$'],
          answer: 3,
          working: '$T = 27 + 273.15 = 300.15\\ \\text{K}$, so $n = \\dfrac{PV}{RT} = \\dfrac{200 \\times 25.0}{8.314 \\times 300.15} = 2.00\\ \\text{mol}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. How many moles of gas are in a twenty-five point zero litre tank at two hundred kilopascals and twenty-seven degrees Celsius? Pause the video and try it.',
          caption: 'Your turn. How many moles of gas are in a 25.0 L tank at 200 kPa and 27°C? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, two point zero zero moles. The temperature is three hundred point one five kelvins, and n equals P V over R T. Choice A uses twenty-seven degrees Celsius instead of kelvins.',
          caption: 'The answer is D, 2.00 mol. The temperature is 300.15 K, and n = PV/RT. Choice A uses 27°C instead of kelvins.',
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
            'Change degrees Celsius to kelvins first: $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
            '$V = \\dfrac{nRT}{P}$, $\\ n = \\dfrac{PV}{RT}$ and $T = \\dfrac{PV}{nR}$.',
            'Solving for $T$ gives kelvins: subtract $273.15$ for degrees Celsius.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Change degrees Celsius to kelvins first, by adding two hundred seventy-three point one five.', caption: 'Let’s sum up. Change degrees Celsius to kelvins first, by adding 273.15.', show: 'sum.0' },
        { say: 'Rearrange P V equals n R T for the volume, the amount or the temperature.', caption: 'Rearrange PV = nRT for the volume, the amount or the temperature.', show: 'sum.1' },
        { say: 'Solving for T gives kelvins, so subtract two hundred seventy-three point one five for degrees Celsius. In part three, you will find the mass and the molar mass of a gas. See you there!', caption: 'Solving for T gives kelvins, so subtract 273.15 for degrees Celsius. In part three, you will find the mass and the molar mass of a gas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
