import type { Explainer, ParticlesEl } from '@/video/script.ts';

// Exam question for Chemistry 20 lesson 2.7 (the ideal gas law): the volume of a weather balloon
// from its amount, pressure and temperature. The question is OpenStax Chemistry 2e's own, word for
// word (end-of-chapter exercise 31, section 9.2, CC BY-NC-SA 4.0). The book's answer: 217 L.
// With this course's R = 8.314 kPa·L/(mol·K): 0.992 atm = 100.51 kPa, 25 °C = 298.15 K,
// V = 8.80 × 8.314 × 298.15 / 100.51 = 217.0 L.
//
// The pictures are simulated particles (src/video/particles.ts): a gas under a free piston, first
// warmed (volume up), then with more gas (volume up), then squeezed (volume down), the three
// effects the ideal gas law combines, and finally the balloon's helium with its gauge, thermometer
// and volume.

const GAS = { bond: 0.15, heavy: 0 } as const;

/** One gas under a free piston, side by side with more of the same gas, each warmed at constant pressure. */
const effects: ParticlesEl = {
  kind: 'particles',
  id: 'ef',
  boxes: [
    { id: 'a', state: 'gas', width: 6, height: 12, temp: 1.4, lid: 0.35, piston: true, kinds: [{ n: 6, ...GAS }], label: 'n mol' },
    { id: 'b', state: 'gas', width: 6, height: 12, temp: 1.4, lid: 0.7, piston: true, kinds: [{ n: 12, ...GAS }], label: '2n mol' },
  ],
  clips: { warm: { phases: [{ dur: 5, heat: { a: 1.96, b: 1.96 }, lid: { a: 0.49, b: 0.98 } }] } },
  thermometers: true,
  height: 470,
};

/** The weather balloon's helium: 8.80 mol at 0.992 atm (100.51 kPa) and 25 °C, filling 217 L. */
const helium: ParticlesEl = {
  kind: 'particles',
  id: 'he',
  boxes: [{ id: 'g', state: 'gas', width: 9, height: 11, temp: 1.6, lid: 0.85, piston: true, kinds: [{ n: 16, tone: 'adj', ...GAS }], label: '8.80 mol of helium' }],
  clips: {},
  gauge: { box: 'g', start: 100.5, decimals: 1 },
  volume: { box: 'g', start: 217.0, decimals: 0 },
  thermometers: { marks: [{ at: 1.6, label: '25 °C' }] },
  height: 500,
};

const video: Explainer = {
  id: 'xq-c20-2-7',
  lessonId: '',
  exam: {
    lesson: 'c20-2-7',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 31, section 9.2, The Ideal Gas Law',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question: 'A weather balloon contains 8.80 moles of helium at a pressure of 0.992 atm and a temperature of 25 °C at ground level. What is the volume of the balloon under these conditions?',
  },
  title: 'Exam Question: The Volume of a Weather Balloon. The Ideal Gas Law',
  thumbnailTitle: 'How Big Is the Balloon?',
  thumbnail: 'he',
  summary:
    'A real test question, solved one small step at a time: a weather balloon holds 8.80 mol of helium at 0.992 atm and 25 °C. We change the pressure to kilopascals and the temperature to kelvins, rearrange the ideal gas law, PV = nRT, for the volume, and find 217 L, after watching how temperature, amount and pressure each change the volume of a gas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Big Is the Balloon?', subtitle: 'The ideal gas law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a weather balloon full of helium. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A weather balloon contains $8.80$ moles of helium at a pressure of $0.992\\ \\text{atm}$ and a temperature of $25\\ ^\\circ\\text{C}$ at ground level. What is the volume of the balloon under these conditions?', answer: '$217\\ \\text{L}$' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A weather balloon contains 8.80 moles of helium at a pressure of zero point nine nine two atmospheres and a temperature of 25 degrees Celsius at ground level. What is the volume of the balloon under these conditions?', caption: 'A weather balloon contains 8.80 moles of helium at a pressure of 0.992 atm and a temperature of 25 °C at ground level. What is the volume of the balloon under these conditions?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know $n$, $P$ and $T$ for **one state**: find $V$' }],
      lines: [
        { say: 'This time there is no before and after. The gas is in one state, and we know three things about it: the amount, the pressure and the temperature.', show: 'plain' },
        { say: 'We must find the fourth, the volume. That is a job for the ideal gas law.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 700,
      left: [effects],
      right: [{ kind: 'math', id: 'law', size: 'md', lines: ['V \\propto \\dfrac{nT}{P}', 'PV = nRT', 'R = 8.314\\ \\dfrac{\\text{kPa·L}}{\\text{mol·K}}'] }],
      lines: [
        { say: 'Here is what we need. On the right, twice as much gas as on the left, at the same temperature and pressure, fills twice the volume.', show: ['ef', 'ef.labels', 'ef.thermo'] },
        { say: 'Now warm both at constant pressure. The particles speed up and push the pistons out, so the volumes grow with the Kelvin temperature. And squeezing harder, a higher pressure, would make them smaller.', play: 'ef.warm' },
        { say: 'So the volume goes up with the amount and the temperature, and down with the pressure. The gas constant R turns that into the ideal gas law: P V equals n R T.', show: ['law.0', 'law.1'], caption: 'So the volume goes up with the amount and the temperature, and down with the pressure. The gas constant R turns that into the ideal gas law: PV = nRT.' },
        { say: 'With pressure in kilopascals and volume in litres, R is 8.314 kilopascal litres per mole kelvin.', show: 'law.2', caption: 'With pressure in kPa and volume in litres, R is 8.314 kPa·L/(mol·K).' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Pressure to **kilopascals**, temperature to **kelvins**', 'Rearrange: $V = \\dfrac{nRT}{P}$', 'Calculate, and check the size'] }],
      lines: [
        { say: 'Here is the plan. First, put every quantity in the units R uses: kilopascals and kelvins.', show: 'plan.0' },
        { say: 'Second, divide both sides of the law by P, so V equals n R T over P.', show: 'plan.1', caption: 'Second, divide both sides of the law by P, so V = nRT/P.' },
        { say: 'Third, calculate, and check that the size makes sense.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The right units',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'u',
          size: 'lg',
          lines: ['P = 0.992\\ \\cancel{\\text{atm}} \\times \\dfrac{101.325\\ \\text{kPa}}{1\\ \\cancel{\\text{atm}}} = \\adj{100.51\\ \\text{kPa}}', 'T = 25 + 273.15 = \\adj{298.15\\ \\text{K}}', 'n = 8.80\\ \\text{mol}'],
        },
      ],
      lines: [
        { say: 'Step one. The pressure is in atmospheres, so multiply by 101.325 kilopascals per atmosphere: zero point nine nine two atmospheres is 100.51 kilopascals.', show: 'u.0', caption: 'Step one. The pressure is in atm, so multiply by 101.325 kPa per atm: 0.992 atm is 100.51 kPa.' },
        { say: 'The temperature is 25 plus 273.15, which is 298.15 kelvins.', show: 'u.1', caption: 'The temperature is 25 + 273.15, which is 298.15 K.' },
        { say: 'And the amount is 8.80 moles, already in the right unit.', show: 'u.2', caption: 'And the amount is 8.80 mol, already in the right unit.' },
      ],
    },
    {
      chapter: 'Step 2: Calculate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'c',
          size: 'lg',
          lines: ['V = \\dfrac{nRT}{P} = \\dfrac{8.80 \\times 8.314 \\times 298.15}{100.51}', '= 217.0\\ \\text{L} \\approx \\good{217\\ \\text{L}}'],
        },
      ],
      lines: [
        { say: 'Step two. V equals 8.80, times 8.314, times 298.15, all divided by 100.51.', show: 'c.0', caption: 'Step two. V = 8.80 × 8.314 × 298.15 ÷ 100.51.' },
        { say: 'The moles, kelvins and kilopascals cancel, leaving litres. The answer is 217 litres to three significant figures.', show: 'c.1', focus: 'c.1', caption: 'The moles, kelvins and kPa cancel, leaving litres. The answer is 217 L to three significant figures.' },
      ],
    },
    {
      chapter: 'Step 3: The balloon',
      layout: 'center',
      main: [helium],
      lines: [
        { say: 'Here is the helium in the balloon, with its gauge and thermometer: about 100.5 kilopascals and 25 degrees Celsius.', show: ['he', 'he.labels', 'he.gauge', 'he.thermo'], caption: 'Here is the helium in the balloon, with its gauge and thermometer: about 100.5 kPa and 25 °C.' },
        { say: '8.80 moles of helium at that pressure and temperature fill 217 litres, about the size of a large bathtub of water.', show: 'he.volume', focus: 'he.volume' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'ch', size: 'lg', lines: ['V = \\good{217\\ \\text{L}}', '8.80\\ \\text{mol} \\times 24.8\\ \\text{L/mol} \\approx 218\\ \\text{L}\\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Here is the whole answer: 217 litres. That matches the book.', show: 'ch.0', caption: 'Here is the whole answer: 217 L. That matches the book.' },
        { say: 'A quick check: the conditions are close to S A T P, 25 degrees and 100 kilopascals, where one mole fills 24.8 litres. 8.80 moles would fill about 218 litres, very close to our answer.', show: 'ch.1', focus: 'ch.1', caption: 'A quick check: the conditions are close to SATP, 25 °C and 100 kPa, where one mole fills 24.8 L. 8.80 mol would fill about 218 L, very close to our answer.' },
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
            ['$18.2\\ \\text{L}$', 'Used **25**, the Celsius temperature'],
            ['$21\\,990\\ \\text{L}$', 'Used the pressure in **atm** with R in kPa'],
            ['$0.00461\\ \\text{L}$', 'Rearranged **upside down**: $V = P / nRT$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Using 25 for the temperature, which gives 18.2 litres. The law needs kelvins.', focus: 'traps.0' },
        { say: 'Using zero point nine nine two straight in, which gives nearly 22 thousand litres. This R needs the pressure in kilopascals.', focus: 'traps.1', caption: 'Using 0.992 straight in, which gives nearly 22 000 L. This R needs the pressure in kPa.' },
        { say: 'And rearranging upside down, P over n R T, which gives a tiny fraction of a litre. Check the size: 8.80 moles of gas is a lot of gas.', focus: 'traps.2', caption: 'And rearranging upside down, P/(nRT), which gives a tiny fraction of a litre. Check the size: 8.80 mol of gas is a lot of gas.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What pressure does $2.00\\ \\text{mol}$ of gas exert in a $20.0\\ \\text{L}$ container at $300\\ \\text{K}$? Use $R = 8.314\\ \\text{kPa·L/(mol·K)}$.',
          choices: ['$24.9\\ \\text{kPa}$', '$0.249\\ \\text{kPa}$', '$249\\ \\text{kPa}$', '$2490\\ \\text{kPa}$'],
          answer: 2,
          working: 'P = nRT / V = 2.00 × 8.314 × 300 ÷ 20.0 = 249 kPa.',
        },
      ],
      lines: [
        { say: 'Your turn. What pressure does two point zero zero moles of gas exert in a 20.0 litre container at 300 kelvins? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What pressure does 2.00 mol of gas exert in a 20.0 L container at 300 K? Pause the video and try it.' },
        { say: 'P equals n R T over V: two times 8.314 times 300, divided by 20.0, is 249 kilopascals, choice C.', show: 'q2.answer', caption: 'P = nRT/V: 2.00 × 8.314 × 300 ÷ 20.0 = 249 kPa, choice C.' },
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
          items: ['$PV = nRT$, with $R = 8.314\\ \\text{kPa·L/(mol·K)}$', 'Pressure in **kPa**, temperature in **kelvins**', 'Rearrange for the unknown: $V = nRT/P$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The ideal gas law is P V equals n R T, with R equal to 8.314.', show: 'sum.0', caption: 'Here is what to remember. The ideal gas law is PV = nRT, with R = 8.314 kPa·L/(mol·K).' },
        { say: 'Put the pressure in kilopascals and the temperature in kelvins.', show: 'sum.1' },
        { say: 'And rearrange for whatever you need: here, V equals n R T over P. For more on the ideal gas law, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'And rearrange for whatever you need: here, V = nRT/P. For more on the ideal gas law, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
