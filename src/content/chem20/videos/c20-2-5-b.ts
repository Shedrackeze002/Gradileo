import type { Explainer, ParticlesEl } from '@/video/script.ts';

/**
 * A worked example in a cylinder (simulated, src/video/particles.ts), one factor at a time: first
 * the new pressure at the old temperature (the piston pushed in), then the new temperature at the
 * new pressure (the piston moving with it). `t2` is the temperature ratio, `v2` the volume ratio.
 */
const example = (id: string, p1: number, v1: number, t2: number, v2: number, lid: number): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 11, temp: 1.5, lid, piston: true, kinds: [{ n: 14, bond: 0.15, heavy: 0 }] }],
  clips: {
    change: {
      phases: [
        { dur: 4, lid: { b: (lid * v2) / t2 } },
        { dur: 4, heat: { b: 1.5 * t2 }, lid: { b: lid * v2 } },
      ],
    },
  },
  gauge: { box: 'b', start: p1 },
  volume: { box: 'b', start: v1, decimals: 2 },
  thermometers: true,
  height: 480,
});
/** 5.0 L at 120 kPa and 300 K, to 200 kPa and 360 K: 3.60 L. */
const kelvins = example('k', 120, 5, 1.2, 0.72, 0.8);
/** 8.0 L at 100 kPa and 293.15 K, to 250 kPa and 263.15 K: 2.87 L. */
const celsius = example('c', 100, 8, 263.15 / 293.15, 0.4 * (263.15 / 293.15), 0.9);

const video: Explainer = {
  id: 'c20-2-5-b',
  lessonId: 'c20-2-5',
  title: 'The Combined Gas Law, Part 2: Finding a New Volume',
  thumbnailTitle: 'Finding a New Volume',
  thumbnail: 'k',
  summary:
    'Rearranged, the combined gas law gives V₂ = V₁ × (P₁/P₂) × (T₂/T₁). A rise in pressure must shrink the gas and a rise in temperature must expand it, which shows whether each fraction is the right way up. Two worked examples find a new volume, one with Kelvin temperatures and one with degrees Celsius changed to kelvins first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'Finding a New Volume', subtitle: 'Each fraction the right way up' }],
      lines: [
        { say: 'In part one, you met the combined gas law: P one V one over T one equals P two V two over T two.', caption: 'In part one, you met the combined gas law: P₁V₁/T₁ = P₂V₂/T₂.', show: 'title' },
        { say: 'In this part, you will use it to find a new volume, and check that each fraction is the right way up.' },
      ],
    },
    {
      chapter: 'Solving for one quantity',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['V_2 = V_1 \\times \\dfrac{P_1}{P_2} \\times \\dfrac{T_2}{T_1}', 'P_2 = P_1 \\times \\dfrac{V_1}{V_2} \\times \\dfrac{T_2}{T_1}', 'T_2 = T_1 \\times \\dfrac{P_2}{P_1} \\times \\dfrac{V_2}{V_1}'] },
      ],
      lines: [
        { say: 'Rearranging the combined gas law gives each quantity after a change. The new volume, V two, is V one, times P one over P two, times T two over T one.', caption: 'Rearranging the combined gas law gives each quantity after a change. The new volume, V₂, is V₁ × P₁/P₂ × T₂/T₁.', show: 'm.0', focus: 'm.0' },
        { say: 'The new pressure and the new temperature come out the same way. You will use them in part three.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'The right way up',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['V_2 = V_1 \\times \\dfrac{P_1}{P_2} \\times \\dfrac{T_2}{T_1}'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A rise in **pressure** must make the volume **smaller**, so the pressure fraction must then be less than 1: $\\dfrac{P_1}{P_2}$, not $\\dfrac{P_2}{P_1}$.',
            'A rise in **temperature** must make the volume **larger**, so the temperature fraction must then be more than 1: $\\dfrac{T_2}{T_1}$.',
          ],
        },
      ],
      lines: [
        { say: 'Each fraction corrects for one change, and you can check that it is the right way up.', show: 'm' },
        { say: 'If the pressure rises, the gas is squeezed, so the pressure fraction must be less than one: P one over P two, not P two over P one.', caption: 'If the pressure rises, the gas is squeezed, so the pressure fraction must be less than one: P₁/P₂, not P₂/P₁.', show: 'b.0', focus: 'b.0' },
        { say: 'If the temperature rises, the gas expands, so the temperature fraction must be more than one: T two over T one.', caption: 'If the temperature rises, the gas expands, so the temperature fraction must be more than one: T₂/T₁.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Kelvin temperatures',
      layout: 'split',
      leftWidth: 500,
      left: [kelvins],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas occupies $5.0\\ \\text{L}$ at $120\\ \\text{kPa}$ and $300\\ \\text{K}$. What volume does it occupy at $200\\ \\text{kPa}$ and $360\\ \\text{K}$, to the nearest hundredth?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{pressure up: } \\times \\dfrac{120}{200}', '\\text{temperature up: } \\times \\dfrac{360}{300}', 'V_2 = 5.0 \\times \\dfrac{120}{200} \\times \\dfrac{360}{300}', '= 5.0 \\times 0.6 \\times 1.2 = \\good{3.60\\ \\text{L}}'],
        },
      ],
      lines: [
        {
          say: 'A gas occupies five point zero litres at one hundred twenty kilopascals and three hundred kelvins. What volume does it occupy at two hundred kilopascals and three hundred sixty kelvins?',
          caption: 'A gas occupies 5.0 L at 120 kPa and 300 K. What volume does it occupy at 200 kPa and 360 K?',
          show: ['q', 'k', 'k.gauge', 'k.volume', 'k.thermo'],
        },
        { say: 'The pressure rises, which shrinks the gas, so multiply by one hundred twenty over two hundred. The temperature rises, which expands it, so multiply by three hundred sixty over three hundred. Watch the cylinder make both changes, one after the other.', caption: 'The pressure rises, which shrinks the gas, so multiply by 120/200. The temperature rises, which expands it, so multiply by 360/300. Watch the cylinder make both changes, one after the other.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'], play: 'k.change' },
        { say: 'So V two is five point zero, times zero point six, times one point two. That is three point six zero litres.', caption: 'So V₂ is 5.0 × 0.6 × 1.2. That is 3.60 L.', show: ['m.2', 'm.3'], focus: ['m.3', 'k.volume'] },
      ],
    },
    {
      chapter: 'Celsius temperatures',
      layout: 'split',
      leftWidth: 500,
      left: [celsius],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas occupies $8.0\\ \\text{L}$ at $100\\ \\text{kPa}$ and $20^\\circ\\text{C}$. What volume does it occupy at $250\\ \\text{kPa}$ and $-10^\\circ\\text{C}$, to the nearest hundredth? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['T_1 = 20 + 273.15 = 293.15\\ \\text{K}', 'T_2 = -10 + 273.15 = 263.15\\ \\text{K}', 'V_2 = 8.0 \\times \\dfrac{100}{250} \\times \\dfrac{263.15}{293.15}', 'V_2 = 2.872\\ldots = \\good{2.87\\ \\text{L}}'],
        },
      ],
      lines: [
        {
          say: 'Now with degrees Celsius. A gas occupies eight point zero litres at one hundred kilopascals and twenty degrees Celsius. What volume does it occupy at two hundred fifty kilopascals and minus ten degrees Celsius?',
          caption: 'Now with degrees Celsius. A gas occupies 8.0 L at 100 kPa and 20°C. What volume does it occupy at 250 kPa and −10°C?',
          show: ['q', 'c', 'c.gauge', 'c.volume', 'c.thermo'],
        },
        { say: 'First, add two hundred seventy-three point one five to change both temperatures to kelvins: two hundred ninety-three point one five, and two hundred sixty-three point one five.', caption: 'First, add 273.15 to change both temperatures to kelvins: 293.15 K, and 263.15 K.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Then substitute: eight point zero, times one hundred over two hundred fifty, times two hundred sixty-three point one five over two hundred ninety-three point one five.', caption: 'Then substitute: 8.0 × 100/250 × 263.15/293.15.', show: 'm.2', focus: 'm.2' },
        { say: 'That is two point eight seven litres. A higher pressure and a lower temperature both make the gas smaller. In the cylinder, the piston goes in, and then the cooling shrinks the gas further.', caption: 'That is 2.87 L. A higher pressure and a lower temperature both make the gas smaller. In the cylinder, the piston goes in, and then the cooling shrinks the gas further.', show: 'm.3', focus: ['m.3', 'c.volume'], play: 'c.change' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas occupies $4.0\\ \\text{L}$ at $200\\ \\text{kPa}$ and $27^\\circ\\text{C}$. What volume does it occupy at $100\\ \\text{kPa}$ and $127^\\circ\\text{C}$, to the nearest hundredth? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          choices: ['$10.67\\ \\text{L}$', '$2.67\\ \\text{L}$', '$37.63\\ \\text{L}$', '$6.00\\ \\text{L}$'],
          answer: 0,
          working: '$T_1 = 300.15\\ \\text{K}$ and $T_2 = 400.15\\ \\text{K}$, so $V_2 = 4.0 \\times \\dfrac{200}{100} \\times \\dfrac{400.15}{300.15} = 10.67\\ \\text{L}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A gas occupies four point zero litres at two hundred kilopascals and twenty-seven degrees Celsius. What volume does it occupy at one hundred kilopascals and one hundred twenty-seven degrees Celsius? Pause the video and try it.',
          caption: 'Your turn. A gas occupies 4.0 L at 200 kPa and 27°C. What volume does it occupy at 100 kPa and 127°C? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, ten point six seven litres. The pressure falls and the gas warms, so both fractions are more than one. Choice C uses degrees Celsius instead of kelvins.',
          caption: 'The answer is A, 10.67 L. The pressure falls and the gas warms, so both fractions are more than one. Choice C uses degrees Celsius instead of kelvins.',
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
            '$V_2 = V_1 \\times \\dfrac{P_1}{P_2} \\times \\dfrac{T_2}{T_1}$, with temperatures in kelvins.',
            'Check each fraction: a rise in pressure shrinks the gas, and a rise in temperature expands it.',
            'Change degrees Celsius to kelvins first: $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The new volume is V one, times P one over P two, times T two over T one.', caption: 'Let’s sum up. The new volume is V₁ × P₁/P₂ × T₂/T₁.', show: 'sum.0' },
        { say: 'Check each fraction: a rise in pressure shrinks the gas, and a rise in temperature expands it.', show: 'sum.1' },
        { say: 'And change degrees Celsius to kelvins first. In part three, you will find a new pressure and a new temperature. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
