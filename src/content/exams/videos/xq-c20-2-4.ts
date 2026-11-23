import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import charles from '@/content/chem20/videos/c20-2-4-b.ts';

// Exam question for Chemistry 20 lesson 2.4 (Charles's law and Gay-Lussac's law): a new volume
// after warming at constant pressure. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 29, section 9.2, CC BY-NC-SA 4.0). The book's answer: 12.1 L.
// V2 = 2.50 L × 373.15 K / 77.15 K = 12.09 L.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's balloon warmed from
// 300 K to 360 K, then the hydrogen itself, warmed from 77 K to 373 K at constant pressure, its
// piston sliding out to 12.09 L while the gauge stays put.

const RATIO = 373.15 / 77.15;

/** The hydrogen: 2.50 L at 77 K, warmed at constant pressure to 373 K. */
const hydrogen: ParticlesEl = {
  kind: 'particles',
  id: 'hy',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 12.5, temp: 0.4, lid: 0.2, piston: true, kinds: [{ n: 10, bond: 0.1, heavy: 0 }] }],
  clips: { warm: { phases: [{ dur: 6, heat: { b: 0.4 * RATIO }, lid: { b: 0.2 * RATIO } }, { dur: 1 }] } },
  gauge: { box: 'b', start: 100 },
  volume: { box: 'b', start: 2.5, decimals: 2 },
  thermometers: { marks: [{ at: 0.4, label: '77 K' }, { at: 0.4 * RATIO, label: '373 K' }] },
  height: 520,
};

const video: Explainer = {
  id: 'xq-c20-2-4',
  lessonId: '',
  exam: {
    lesson: 'c20-2-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 29, section 9.2, The Ideal Gas Law',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question: 'A 2.50-L volume of hydrogen measured at –196 °C is warmed to 100 °C. Calculate the volume of the gas at the higher temperature, assuming no change in pressure.',
  },
  title: "Exam Question: Warming Very Cold Hydrogen. Charles's Law",
  thumbnailTitle: 'Warm the Cold Hydrogen',
  thumbnail: 'hy',
  summary:
    "A real test question, solved one small step at a time: 2.50 L of hydrogen at −196 °C is warmed to 100 °C at constant pressure. We change both temperatures to kelvins, use Charles's law, V1/T1 = V2/T2, to find the new volume, 12.1 L, and watch the gas push its piston out as its particles speed up.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Warm the Cold Hydrogen', subtitle: "Charles's law, step by step" }],
      lines: [
        { say: 'In this video, we solve a real test question about warming some very cold hydrogen. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A $2.50$-L volume of hydrogen measured at $-196\\ ^\\circ\\text{C}$ is warmed to $100\\ ^\\circ\\text{C}$. Calculate the volume of the gas at the higher temperature, assuming no change in pressure.', answer: '$12.1\\ \\text{L}$' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A two point five zero litre volume of hydrogen measured at minus 196 degrees Celsius is warmed to 100 degrees Celsius. Calculate the volume of the gas at the higher temperature, assuming no change in pressure.', caption: 'A 2.50-L volume of hydrogen measured at −196 °C is warmed to 100 °C. Calculate the volume of the gas at the higher temperature, assuming no change in pressure.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Same gas, same pressure, **much warmer**: find the **new volume**' }],
      lines: [
        { say: 'The hydrogen starts extremely cold, at minus 196 degrees, and is warmed to the boiling point of water.', show: 'plain' },
        { say: 'The pressure stays the same, so only the volume and the temperature change. We must find the new volume.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(charles, 'v')],
      lines: [
        { say: 'Here is what we need. A gas sits under a piston that can slide freely, so the pressure stays the same. It starts at two point four zero litres and 300 kelvins.', show: ['v', 'v.thermo', 'v.volume', 'v.gauge'], caption: 'Here is what we need. A gas sits under a piston that can slide freely, so the pressure stays the same. It starts at 2.40 L and 300 K.' },
        { say: 'Warm it to 360 kelvins. The particles move faster and hit the piston harder, so it slides out until the pressure is back where it was. The volume grows to two point eight eight litres.', play: 'v.warm', focus: ['v.thermo', 'v.volume'], caption: 'Warm it to 360 K. The particles move faster and hit the piston harder, so it slides out until the pressure is back where it was. The volume grows to 2.88 L.' },
        { say: 'The volume and the Kelvin temperature grew by the same factor, one point two. That is Charles\'s law: V one over T one equals V two over T two, with temperatures in kelvins.', caption: 'The volume and the Kelvin temperature grew by the same factor, 1.2. That is Charles\'s law: V₁/T₁ = V₂/T₂, with temperatures in kelvins.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change both temperatures to **kelvins**', 'Rearrange $V_1/T_1 = V_2/T_2$ for $V_2$', 'Calculate, then check the **direction**'] }],
      lines: [
        { say: 'Here is the plan. First, change both temperatures to kelvins by adding 273.15.', show: 'plan.0' },
        { say: 'Second, rearrange Charles\'s law to give V two.', show: 'plan.1', caption: 'Second, rearrange Charles\'s law to give V₂.' },
        { say: 'Third, calculate, and check that warming made the gas bigger.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Into kelvins',
      layout: 'center',
      main: [{ kind: 'math', id: 'k', size: 'lg', lines: ['T_1 = -196 + 273.15 = \\adj{77.15\\ \\text{K}}', 'T_2 = 100 + 273.15 = \\opp{373.15\\ \\text{K}}', 'V_1 = 2.50\\ \\text{L} \\qquad V_2 = \\ ?'] }],
      lines: [
        { say: 'Step one. T one is minus 196 plus 273.15, which is 77.15 kelvins.', show: 'k.0', caption: 'Step one. T₁ is −196 + 273.15, which is 77.15 K.' },
        { say: 'T two is 100 plus 273.15, which is 373.15 kelvins.', show: 'k.1', caption: 'T₂ is 100 + 273.15, which is 373.15 K.' },
        { say: 'V one is two point five zero litres, and V two is what we want.', show: 'k.2', caption: 'V₁ is 2.50 L, and V₂ is what we want.' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange and calculate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'c',
          size: 'lg',
          lines: ['V_2 = V_1 \\times \\dfrac{T_2}{T_1}', 'V_2 = 2.50\\ \\text{L} \\times \\dfrac{\\opp{373.15\\ \\cancel{\\text{K}}}}{\\adj{77.15\\ \\cancel{\\text{K}}}}', '= 12.09\\ \\text{L} \\approx \\good{12.1\\ \\text{L}}'],
        },
      ],
      lines: [
        { say: 'Step two. Multiply both sides of Charles\'s law by T two, and V two equals V one times T two over T one.', show: 'c.0', caption: 'Step two. Multiply both sides of Charles\'s law by T₂, and V₂ = V₁ × T₂/T₁.' },
        { say: 'Put in the numbers: two point five zero litres times 373.15 kelvins over 77.15 kelvins. The kelvins cancel.', show: 'c.1', caption: 'Put in the numbers: 2.50 L × 373.15 K / 77.15 K. The kelvins cancel.' },
        { say: 'That is 12.09 litres, or 12.1 litres to three significant figures.', show: 'c.2', focus: 'c.2', caption: 'That is 12.09 L, or 12.1 L to three significant figures.' },
      ],
    },
    {
      chapter: 'Step 3: Watch it happen',
      layout: 'center',
      main: [hydrogen],
      lines: [
        { say: 'Step three: watch the hydrogen. At 77 kelvins its particles move slowly, and they fill two point five zero litres.', show: ['hy', 'hy.thermo', 'hy.volume', 'hy.gauge'], caption: 'Step three: watch the hydrogen. At 77 K its particles move slowly, and they fill 2.50 L.' },
        { say: 'Warm it to 373 kelvins. The particles speed up and push the piston out, while the gauge stays the same. The volume reads 12.09 litres: almost five times as big.', play: 'hy.warm', focus: ['hy.thermo', 'hy.volume'], caption: 'Warm it to 373 K. The particles speed up and push the piston out, while the gauge stays the same. The volume reads 12.09 L: almost five times as big.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'ch', size: 'lg', lines: ['V_2 = \\good{12.1\\ \\text{L}}', '\\dfrac{373.15}{77.15} = 4.84 \\qquad \\dfrac{12.09}{2.50} = 4.84 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Here is the whole answer: 12.1 litres. That matches the book.', show: 'ch.0', caption: 'Here is the whole answer: 12.1 L. That matches the book.' },
        { say: 'A quick check: the Kelvin temperature grew by a factor of 4.84, and so did the volume. Warming made the gas bigger, which is the right direction.', show: 'ch.1', focus: 'ch.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['$-1.28\\ \\text{L}$', 'Used **degrees Celsius**: a volume cannot be negative'],
            ['$0.517\\ \\text{L}$', 'Fraction **upside down**: warming must **expand** the gas'],
            ['$4.84\\ \\text{L}$', 'Found the factor $T_2/T_1$ but did not multiply by $V_1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Using degrees Celsius: two point five zero times 100 over minus 196 gives minus one point two eight litres. A volume cannot be negative. Charles\'s law only works in kelvins, which start at absolute zero.', focus: 'traps.0', caption: 'Using degrees Celsius: 2.50 × 100 / (−196) gives −1.28 L. A volume cannot be negative. Charles\'s law only works in kelvins, which start at absolute zero.' },
        { say: 'Turning the fraction upside down, which gives zero point five one seven litres. The gas was warmed, so it must get bigger.', focus: 'traps.1', caption: 'Turning the fraction upside down, which gives 0.517 L. The gas was warmed, so it must get bigger.' },
        { say: 'And stopping at the factor, 4.84. That is how many times bigger the gas gets; multiply it by the starting volume.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A gas occupies $2.0\\ \\text{L}$ at $300\\ \\text{K}$. At constant pressure, it is heated to $450\\ \\text{K}$. What is its new volume?',
          choices: ['$1.3\\ \\text{L}$', '$2.0\\ \\text{L}$', '$4.5\\ \\text{L}$', '$3.0\\ \\text{L}$'],
          answer: 3,
          working: 'V₂ = 2.0 L × 450 K / 300 K = 3.0 L.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas occupies two point zero litres at 300 kelvins. At constant pressure, it is heated to 450 kelvins. What is its new volume? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A gas occupies 2.0 L at 300 K. At constant pressure, it is heated to 450 K. What is its new volume? Pause the video and try it.' },
        { say: 'The temperatures are already in kelvins. Two point zero times 450 over 300 is three point zero litres, choice D.', show: 'q2.answer', caption: 'The temperatures are already in kelvins. 2.0 × 450 / 300 = 3.0 L, choice D.' },
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
          items: ["Charles's law: $V_1/T_1 = V_2/T_2$, at constant pressure", 'Always use **kelvins**: add 273.15', 'Warmer gas, **bigger** volume'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For a fixed amount of gas at constant pressure, V one over T one equals V two over T two.', show: 'sum.0', caption: 'Here is what to remember. For a fixed amount of gas at constant pressure, V₁/T₁ = V₂/T₂.' },
        { say: 'Always change temperatures to kelvins, by adding 273.15.', show: 'sum.1' },
        { say: 'And a warmer gas takes up more room. For more on Charles\'s law and Gay-Lussac\'s law, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
