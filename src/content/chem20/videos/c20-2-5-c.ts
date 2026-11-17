import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The two worked examples, simulated (src/video/particles.ts): the Kelvin temperature is scaled
// so the gas starts at 1.5.

/** 5.0 L at 120 kPa and 288.15 K, squeezed to 3.0 L and then warmed to 333.15 K: 231 kPa. */
const squeeze: ParticlesEl = {
  kind: 'particles',
  id: 'sq',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 11, temp: 1.5, lid: 0.85, piston: true, kinds: [{ n: 14, bond: 0.15, heavy: 0 }] }],
  clips: {
    change: {
      phases: [
        { dur: 4, lid: { b: 0.85 * 0.6 } },
        { dur: 4, heat: { b: (1.5 * 333.15) / 288.15 } },
      ],
    },
  },
  gauge: { box: 'b', start: 120 },
  volume: { box: 'b', start: 5, decimals: 1 },
  thermometers: true,
  height: 480,
};

/** 4.0 L at 150 kPa and 298.15 K, to 6.5 L at 110 kPa: 355.30 K. */
const expand: ParticlesEl = {
  kind: 'particles',
  id: 'ex',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 11, temp: 1.5, lid: 0.5, piston: true, kinds: [{ n: 14, bond: 0.15, heavy: 0 }] }],
  clips: { change: { phases: [{ dur: 6, heat: { b: (1.5 * 355.3) / 298.15 }, lid: { b: 0.5 * 1.625 } }] } },
  gauge: { box: 'b', start: 150 },
  volume: { box: 'b', start: 4, decimals: 1 },
  thermometers: true,
  height: 480,
};

const video: Explainer = {
  id: 'c20-2-5-c',
  lessonId: 'c20-2-5',
  title: 'The Combined Gas Law, Part 3: A New Pressure or Temperature',
  thumbnailTitle: 'A New Pressure or Temperature',
  thumbnail: 'sq',
  summary:
    'The combined gas law also gives a new pressure, P₂ = P₁ × (V₁/V₂) × (T₂/T₁), or a new temperature, T₂ = T₁ × (P₂/P₁) × (V₂/V₁). Change degrees Celsius to kelvins first, check that each fraction moves the answer the right way, and change a Kelvin answer back to degrees Celsius when the question asks for it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'A New Pressure or Temperature', subtitle: 'The same equation, solved another way' }],
      lines: [
        { say: 'In part two, you used the combined gas law to find a new volume.', show: 'title' },
        { say: 'The same equation gives a new pressure or a new temperature. In this part, you will find each one, starting from degrees Celsius.' },
      ],
    },
    {
      chapter: 'A new pressure',
      layout: 'split',
      leftWidth: 500,
      left: [squeeze],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas occupies $5.0\\ \\text{L}$ at $120\\ \\text{kPa}$ and $15^\\circ\\text{C}$. It is moved into a $3.0\\ \\text{L}$ container and brought to $60^\\circ\\text{C}$. What is its new pressure, to the nearest whole number? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            'T_1 = 15 + 273.15 = 288.15\\ \\text{K}',
            'T_2 = 60 + 273.15 = 333.15\\ \\text{K}',
            'P_2 = 120 \\times \\dfrac{5.0}{3.0} \\times \\dfrac{333.15}{288.15}',
            'P_2 = 231.23\\ldots \\approx \\good{231\\ \\text{kPa}}',
          ],
        },
      ],
      lines: [
        {
          say: 'A gas occupies five point zero litres at one hundred twenty kilopascals and fifteen degrees Celsius. It is moved into a three point zero litre container and brought to sixty degrees Celsius. What is its new pressure?',
          caption: 'A gas occupies 5.0 L at 120 kPa and 15°C. It is moved into a 3.0 L container and brought to 60°C. What is its new pressure?',
          show: ['q', 'sq', 'sq.gauge', 'sq.volume', 'sq.thermo'],
        },
        { say: 'First, the temperatures in kelvins: two hundred eighty-eight point one five, and three hundred thirty-three point one five.', caption: 'First, the temperatures in kelvins: 288.15 K, and 333.15 K.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Now think about the direction. A smaller volume crowds the particles together, and a higher temperature makes them hit harder. Both raise the pressure, so both fractions must be more than one. Watch the gauge climb at each step.', play: 'sq.change', focus: 'sq.gauge' },
        { say: 'So P two is one hundred twenty, times five point zero over three point zero, times three hundred thirty-three point one five over two hundred eighty-eight point one five.', caption: 'So P₂ is 120 × 5.0/3.0 × 333.15/288.15.', show: 'm.2', focus: 'm.2' },
        { say: 'That is two hundred thirty-one kilopascals, to the nearest whole number. It is higher than one hundred twenty, as it should be.', caption: 'That is 231 kPa, to the nearest whole number. It is higher than 120 kPa, as it should be.', show: 'm.3', focus: ['m.3', 'sq.gauge'] },
      ],
    },
    {
      chapter: 'A new temperature',
      layout: 'split',
      leftWidth: 500,
      left: [expand],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas occupies $4.0\\ \\text{L}$ at $150\\ \\text{kPa}$ and $25^\\circ\\text{C}$. At what temperature in degrees Celsius will it occupy $6.5\\ \\text{L}$ at $110\\ \\text{kPa}$? Round to the nearest degree. Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            'T_1 = 25 + 273.15 = 298.15\\ \\text{K}',
            'T_2 = 298.15 \\times \\dfrac{110}{150} \\times \\dfrac{6.5}{4.0}',
            '\\phantom{T_2} = 355.30\\ \\text{K}',
            'T_2 = 355.30 - 273.15 \\approx \\good{82^\\circ\\text{C}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Now a new temperature. A gas occupies four point zero litres at one hundred fifty kilopascals and twenty-five degrees Celsius. At what temperature will it occupy six point five litres at one hundred ten kilopascals?',
          caption: 'Now a new temperature. A gas occupies 4.0 L at 150 kPa and 25°C. At what temperature will it occupy 6.5 L at 110 kPa?',
          show: ['q', 'ex', 'ex.gauge', 'ex.volume', 'ex.thermo'],
        },
        { say: 'Change the starting temperature to kelvins: two hundred ninety-eight point one five.', caption: 'Change the starting temperature to kelvins: 298.15 K.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Solve for T two: T one, times P two over P one, times V two over V one. That is three hundred fifty-five point three zero kelvins.',
          caption: 'Solve for T₂: T₁ × P₂/P₁ × V₂/V₁. That is 355.30 K.',
          show: ['m.1', 'm.2'],
          focus: ['m.1', 'm.2'],
        },
        {
          say: 'Solving for a temperature gives kelvins, but the question asks for degrees Celsius. So subtract two hundred seventy-three point one five: eighty-two degrees Celsius, to the nearest degree.',
          caption: 'Solving for a temperature gives kelvins, but the question asks for degrees Celsius. So subtract 273.15: 82°C, to the nearest degree.',
          show: 'm.3',
          focus: 'm.3',
        },
        { say: 'Check it in the cylinder. Warm the gas to eighty-two degrees Celsius while letting the piston out, and it reaches six point five litres at one hundred ten kilopascals.', play: 'ex.change', focus: ['ex.thermo', 'ex.volume', 'ex.gauge'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas occupies $2.0\\ \\text{L}$ at $100\\ \\text{kPa}$ and $27^\\circ\\text{C}$. At what temperature in degrees Celsius will it occupy $3.0\\ \\text{L}$ at $120\\ \\text{kPa}$? Round to the nearest degree. Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          choices: ['$540^\\circ\\text{C}$', '$49^\\circ\\text{C}$', '$-106^\\circ\\text{C}$', '$267^\\circ\\text{C}$'],
          answer: 3,
          working: '$T_2 = 300.15 \\times \\dfrac{120}{100} \\times \\dfrac{3.0}{2.0} = 540.27\\ \\text{K}$, and $540.27 - 273.15 = 267.12$, so $267^\\circ\\text{C}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A gas occupies two point zero litres at one hundred kilopascals and twenty-seven degrees Celsius. At what temperature in degrees Celsius will it occupy three point zero litres at one hundred twenty kilopascals? Pause the video and try it.',
          caption: 'Your turn. A gas occupies 2.0 L at 100 kPa and 27°C. At what temperature in degrees Celsius will it occupy 3.0 L at 120 kPa? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, two hundred sixty-seven degrees Celsius. In kelvins, the new temperature is five hundred forty point two seven. Choice A stops there, and forgets to change back to degrees Celsius.',
          caption: 'The answer is D, 267°C. In kelvins, the new temperature is 540.27 K. Choice A stops there, and forgets to change back to degrees Celsius.',
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
            'New pressure: $P_2 = P_1 \\times \\dfrac{V_1}{V_2} \\times \\dfrac{T_2}{T_1}$.',
            'New temperature: $T_2 = T_1 \\times \\dfrac{P_2}{P_1} \\times \\dfrac{V_2}{V_1}$, in kelvins.',
            'Check the direction: a smaller volume or a higher temperature raises the pressure.',
            'For degrees Celsius, subtract $273.15$ at the end.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The new pressure is P one, times V one over V two, times T two over T one.', caption: 'Let’s sum up. The new pressure is P₁ × V₁/V₂ × T₂/T₁.', show: 'sum.0' },
        { say: 'The new temperature is T one, times P two over P one, times V two over V one, in kelvins.', caption: 'The new temperature is T₁ × P₂/P₁ × V₂/V₁, in kelvins.', show: 'sum.1' },
        { say: 'Check the direction of each change.', show: 'sum.2' },
        { say: 'And for degrees Celsius, subtract two hundred seventy-three point one five at the end. In part four, you will predict how a gas changes, using simple factors. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
