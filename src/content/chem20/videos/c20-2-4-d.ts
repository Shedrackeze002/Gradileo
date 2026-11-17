import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The two worked examples, simulated (src/video/particles.ts): the Kelvin temperature is scaled so
// the gas starts at 1.5 and ends at the answer, with a thermometer mark there.

/** A gas under a free piston: 1.80 L at 293.15 K, warmed to 366.44 K, reaches 2.25 L. */
const piston: ParticlesEl = {
  kind: 'particles',
  id: 'pv',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 12, temp: 1.5, lid: 0.48, piston: true, kinds: [{ n: 12, bond: 0.15, heavy: 0 }] }],
  clips: { warm: { phases: [{ dur: 5, heat: { b: 1.875 }, lid: { b: 0.6 } }] } },
  volume: { box: 'b', start: 1.8, decimals: 2 },
  thermometers: { marks: [{ at: 1.875, label: '93 °C' }] },
  height: 500,
};

/** A sealed steel cylinder: 180 kPa at 288.15 K, warmed to 384.20 K, reaches 240 kPa. */
const steel: ParticlesEl = {
  kind: 'particles',
  id: 'cy',
  boxes: [{ id: 'b', state: 'gas', width: 7, height: 10, temp: 1.5, kinds: [{ n: 14, bond: 0.15, heavy: 0 }], label: 'sealed cylinder' }],
  clips: { warm: { phases: [{ dur: 5, heat: { b: 2 } }] } },
  gauge: { box: 'b', start: 180 },
  thermometers: { marks: [{ at: 2, label: '111 °C' }] },
  height: 480,
};

const video: Explainer = {
  id: 'c20-2-4-d',
  lessonId: 'c20-2-4',
  title: "Charles's Law and Gay-Lussac's Law, Part 4: Finding a Temperature",
  thumbnailTitle: 'Finding a Temperature',
  thumbnail: 'pv',
  summary:
    "To find a temperature with Charles's law or Gay-Lussac's law, change to kelvins, solve T₂ = T₁ × V₂/V₁ or T₂ = T₁ × P₂/P₁, then subtract 273.15 to give degrees Celsius. A gas at 1.80 L and 20 °C reaches 2.25 L at 93 °C; a cylinder at 180 kPa and 15 °C reaches 240 kPa at 111 °C.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Finding a Temperature', subtitle: 'Work in kelvins, answer in degrees Celsius' }],
      lines: [
        { say: 'How hot must a gas get to reach a certain volume, or a certain pressure? The same two laws answer that, worked backwards.', show: 'title' },
        { say: 'In this part, you will solve Charles’s law and Gay-Lussac’s law for a temperature, working in kelvins and changing back to degrees Celsius at the end.' },
      ],
    },
    {
      chapter: 'With Charles’s law',
      layout: 'split',
      leftWidth: 480,
      left: [piston],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas has a volume of $1.80\\ \\text{L}$ at $20^\\circ\\text{C}$. At the same pressure, at what temperature in degrees Celsius will its volume be $2.25\\ \\text{L}$? Round to the nearest degree. Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['T_1 = 20 + 273.15 = 293.15\\ \\text{K}', 'T_2 = T_1 \\times \\dfrac{V_2}{V_1}', '\\phantom{T_2} = 293.15 \\times \\dfrac{2.25}{1.80} = 366.44\\ \\text{K}', 'T_2 = 366.44 - 273.15 \\approx 93^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'A gas has a volume of one point eight zero litres at twenty degrees Celsius. At the same pressure, at what temperature, in degrees Celsius, will its volume be two point two five litres? Round to the nearest degree.', show: ['q', 'pv', 'pv.volume', 'pv.thermo'] },
        { say: 'First, change to kelvins. T one is twenty plus two hundred seventy-three point one five: two hundred ninety-three point one five kelvins.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve Charles’s law for the temperature: T two equals T one times V two over V one. Two hundred ninety-three point one five, times two point two five over one point eight zero, is three hundred sixty-six point four four kelvins.', caption: 'Solve Charles’s law for the temperature: T₂ = T₁ × V₂/V₁. 293.15 × 2.25/1.80 is 366.44 K.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The question asks for degrees Celsius, so change back: subtract two hundred seventy-three point one five, to get ninety-three point two nine. To the nearest degree, that is ninety-three degrees Celsius.', show: 'm.3', focus: 'm.3' },
        { say: 'Warm the gas to ninety-three degrees Celsius, and the piston slides out until the volume is two point two five litres.', play: 'pv.warm', focus: ['pv.thermo', 'pv.volume'] },
      ],
    },
    {
      chapter: 'With Gay-Lussac’s law',
      layout: 'split',
      leftWidth: 520,
      left: [steel],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The gas in a sealed steel gas cylinder is at $180\\ \\text{kPa}$ and $15^\\circ\\text{C}$. At what temperature in degrees Celsius will its pressure be $240\\ \\text{kPa}$? Round to the nearest degree. Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['T_1 = 15 + 273.15 = 288.15\\ \\text{K}', 'T_2 = T_1 \\times \\dfrac{P_2}{P_1}', '\\phantom{T_2} = 288.15 \\times \\dfrac{240}{180} = 384.20\\ \\text{K}', 'T_2 = 384.20 - 273.15 \\approx 111^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'Now a rigid container. The gas in a sealed steel gas cylinder is at one hundred eighty kilopascals and fifteen degrees Celsius. At what temperature, in degrees Celsius, will its pressure be two hundred forty kilopascals?', show: ['q', 'cy', 'cy.labels', 'cy.gauge', 'cy.thermo'] },
        { say: 'In kelvins, T one is two hundred eighty-eight point one five.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve Gay-Lussac’s law for the temperature: T two equals T one times P two over P one. Two hundred eighty-eight point one five, times two hundred forty over one hundred eighty, is three hundred eighty-four point two zero kelvins.', caption: 'Solve Gay-Lussac’s law for the temperature: T₂ = T₁ × P₂/P₁. 288.15 × 240/180 is 384.20 K.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Change back to degrees Celsius: one hundred eleven point zero five, or one hundred eleven degrees Celsius to the nearest degree.', show: 'm.3', focus: 'm.3' },
        { say: 'Heat the cylinder to one hundred eleven degrees Celsius, and its gauge climbs to two hundred forty kilopascals.', play: 'cy.warm', focus: ['cy.thermo', 'cy.gauge'] },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that the answer makes sense', md: 'A **higher pressure** in the same container needs a **higher** Kelvin temperature. A **larger volume** at the same pressure needs a **higher** Kelvin temperature. If your answer goes the other way, a fraction is upside down.' },
        { kind: 'text', id: 'end', size: 'md', align: 'center', md: 'Work in kelvins; subtract $273.15$ **at the end** for degrees Celsius.' },
      ],
      lines: [
        { say: 'Check that the answer makes sense. A higher pressure in the same container needs a higher Kelvin temperature. A larger volume at the same pressure needs a higher Kelvin temperature, too.', show: 'tip' },
        { say: 'In both examples, the gas had to get hotter, and it did. If your answer goes the other way, a fraction is upside down.' },
        { say: 'And remember the last step. The laws give a temperature in kelvins, so when the question asks for degrees Celsius, subtract two hundred seventy-three point one five at the end.', show: 'end' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas has a volume of $2.00\\ \\text{L}$ at $27^\\circ\\text{C}$. At the same pressure, at what temperature in degrees Celsius will its volume be $2.50\\ \\text{L}$? Round to the nearest degree. Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          choices: ['$34^\\circ\\text{C}$', '$375^\\circ\\text{C}$', '$-33^\\circ\\text{C}$', '$102^\\circ\\text{C}$'],
          answer: 3,
          working: '$T_1 = 300.15\\ \\text{K}$. $T_2 = 300.15 \\times \\dfrac{2.50}{2.00} = 375.19\\ \\text{K}$, and $375.19 - 273.15 = 102.04^\\circ\\text{C}$, or $102^\\circ\\text{C}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas has a volume of two point zero zero litres at twenty-seven degrees Celsius. At the same pressure, at what temperature in degrees Celsius will its volume be two point five zero litres? Round to the nearest degree. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred two degrees Celsius. T two is three hundred point one five times two point five zero over two point zero zero: three hundred seventy-five point one nine kelvins. Choice B forgets to change back to degrees Celsius, and choice A uses Celsius temperatures throughout.', show: 'q.answer' },
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
            'Charles’s law: $T_2 = T_1 \\times \\dfrac{V_2}{V_1}$. Gay-Lussac’s law: $T_2 = T_1 \\times \\dfrac{P_2}{P_1}$.',
            'Work in kelvins, then subtract $273.15$ at the end for degrees Celsius.',
            'A larger volume, or a higher pressure, needs a **higher** Kelvin temperature.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a temperature, use T two equals T one times V two over V one, or T one times P two over P one.', caption: 'Let’s sum up. To find a temperature, use T₂ = T₁ × V₂/V₁, or T₁ × P₂/P₁.', show: 'sum.0' },
        { say: 'Work in kelvins, then subtract two hundred seventy-three point one five at the end for degrees Celsius.', show: 'sum.1' },
        { say: 'And check the direction: a larger volume, or a higher pressure, needs a higher Kelvin temperature. That completes this lesson on Charles’s law and Gay-Lussac’s law. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
