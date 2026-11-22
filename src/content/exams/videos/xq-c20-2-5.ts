import type { Explainer, ParticlesEl } from '@/video/script.ts';

// Exam question for Chemistry 20 lesson 2.5 (the combined gas law): the pressure around a balloon
// that rises over a mountain, growing and cooling. The question is OpenStax Chemistry 2e's own,
// word for word (end-of-chapter exercise 45, section 9.2, CC BY-NC-SA 4.0). The book's answer:
// 0.644 atm. P2 = 0.981 atm × (100.21 L / 144.53 L) × (278.39 K / 294.15 K) = 0.6437 atm.
//
// The pictures are simulated particles (src/video/particles.ts): the gas in the balloon, its
// piston standing in for the rubber, first squeezed and warmed one at a time to show what each
// change does, then taken up the mountain: it grows by a factor of 1.442 and cools a little, and
// the gauge falls from 0.981 atm to 0.644 atm.

const VOL = 144.53 / 100.21;
const TEMP = 278.39 / 294.15;

/** Each change on its own, from the same start: squeeze (pressure up), then warm (pressure up). */
const parts: ParticlesEl = {
  kind: 'particles',
  id: 'pr',
  boxes: [
    { id: 'v', state: 'gas', width: 7, height: 11, temp: 1.5, lid: 0.8, piston: true, kinds: [{ n: 12, bond: 0.15, heavy: 0 }], label: 'squeezed' },
    { id: 't', state: 'gas', width: 7, height: 11, temp: 1.5, kinds: [{ n: 12, bond: 0.15, heavy: 0 }], label: 'warmed, same volume' },
  ],
  clips: {
    squeeze: { phases: [{ dur: 4, lid: { v: 0.4 } }] },
    warm: { phases: [{ dur: 4, heat: { t: 2.6 } }] },
  },
  thermometers: true,
  height: 440,
};

/** The balloon over the mountain: 100.21 L at 21 °C and 0.981 atm, to 144.53 L at 5.24 °C. */
const balloon: ParticlesEl = {
  kind: 'particles',
  id: 'bl',
  boxes: [{ id: 'g', state: 'gas', width: 8, height: 12, temp: 1.5, lid: 0.55, piston: true, kinds: [{ n: 12, bond: 0.15, heavy: 0 }], label: 'gas in the balloon' }],
  clips: { climb: { phases: [{ dur: 7, heat: { g: 1.5 * TEMP }, lid: { g: 0.55 * VOL } }, { dur: 1 }] } },
  gauge: { box: 'g', start: 0.981, unit: 'atm', decimals: 3 },
  volume: { box: 'g', start: 100.21, decimals: 2 },
  thermometers: true,
  height: 520,
};

const video: Explainer = {
  id: 'xq-c20-2-5',
  lessonId: '',
  exam: {
    lesson: 'c20-2-5',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 45, section 9.2, The Ideal Gas Law',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question:
      'A balloon with a volume of 100.21 L at 21 °C and 0.981 atm is released and just barely clears the top of Mount Crumpit in British Columbia. If the final volume of the balloon is 144.53 L at a temperature of 5.24 °C, what is the pressure experienced by the balloon as it clears Mount Crumpit?',
  },
  title: 'Exam Question: A Balloon Over a Mountain. The Combined Gas Law',
  thumbnailTitle: 'A Balloon Over a Mountain',
  thumbnail: 'bl',
  summary:
    'A real test question, solved one small step at a time: a balloon rises from 100.21 L at 21 °C and 0.981 atm to 144.53 L at 5.24 °C over a mountain top. We use the combined gas law, P1V1/T1 = P2V2/T2, with temperatures in kelvins, to find the pressure up there, 0.644 atm, check each fraction moves the answer the right way, and watch the gauge fall as the balloon swells.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Balloon Over a Mountain', subtitle: 'The combined gas law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a balloon floating up over a mountain. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A balloon with a volume of $100.21\\ \\text{L}$ at $21\\ ^\\circ\\text{C}$ and $0.981\\ \\text{atm}$ is released and just barely clears the top of Mount Crumpit in British Columbia. If the final volume of the balloon is $144.53\\ \\text{L}$ at a temperature of $5.24\\ ^\\circ\\text{C}$, what is the pressure experienced by the balloon as it clears Mount Crumpit?',
          answer: '$0.644\\ \\text{atm}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        {
          say: 'A balloon with a volume of 100.21 litres at 21 degrees Celsius and zero point nine eight one atmospheres is released and just barely clears the top of Mount Crumpit in British Columbia. If the final volume of the balloon is 144.53 litres at a temperature of 5.24 degrees Celsius, what is the pressure experienced by the balloon as it clears Mount Crumpit?',
          caption: 'A balloon with a volume of 100.21 L at 21 °C and 0.981 atm is released and just barely clears the top of Mount Crumpit in British Columbia. If the final volume of the balloon is 144.53 L at a temperature of 5.24 °C, what is the pressure experienced by the balloon as it clears Mount Crumpit?',
        },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Volume **and** temperature both change: find the **new pressure**' }],
      lines: [
        { say: 'The same gas goes from one state to another: its volume grows, and its temperature falls.', show: 'plain' },
        { say: 'Two things change at once, so no single law will do. We need the combined gas law to find the new pressure.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [parts],
      lines: [
        { say: 'Here is what we need. Each change affects the pressure in its own way. On the left, squeeze a gas: less room means more hits on the walls, so the pressure rises.', show: ['pr', 'pr.labels', 'pr.thermo'], play: 'pr.squeeze', focus: 'pr.v' },
        { say: 'On the right, warm a gas that cannot expand: faster particles hit harder and more often, so the pressure rises too.', play: 'pr.warm', focus: 'pr.t' },
        { say: 'The combined gas law puts both effects together: P one V one over T one equals P two V two over T two, with temperatures in kelvins.', caption: 'The combined gas law puts both effects together: P₁V₁/T₁ = P₂V₂/T₂, with temperatures in kelvins.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change both temperatures to **kelvins**', 'Rearrange for $P_2$: $P_1 \\times \\dfrac{V_1}{V_2} \\times \\dfrac{T_2}{T_1}$', 'Check each fraction moves the answer the **right way**'] }],
      lines: [
        { say: 'Here is the plan. First, change both temperatures to kelvins.', show: 'plan.0' },
        { say: 'Second, rearrange the law: P two equals P one, times V one over V two, times T two over T one.', show: 'plan.1', caption: 'Second, rearrange the law: P₂ = P₁ × V₁/V₂ × T₂/T₁.' },
        { say: 'Third, check that each fraction pushes the pressure the right way before we multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: What we know',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'k',
          size: 'lg',
          lines: ['P_1 = 0.981\\ \\text{atm} \\qquad P_2 = \\ ?', 'V_1 = 100.21\\ \\text{L} \\qquad V_2 = 144.53\\ \\text{L}', 'T_1 = 21 + 273.15 = \\adj{294.15\\ \\text{K}}', 'T_2 = 5.24 + 273.15 = \\opp{278.39\\ \\text{K}}'],
        },
      ],
      lines: [
        { say: 'Step one. At the start, P one is zero point nine eight one atmospheres and V one is 100.21 litres. At the top, V two is 144.53 litres, and P two is what we want.', show: ['k.0', 'k.1'], caption: 'Step one. At the start, P₁ is 0.981 atm and V₁ is 100.21 L. At the top, V₂ is 144.53 L, and P₂ is what we want.' },
        { say: 'T one is 21 plus 273.15, which is 294.15 kelvins, and T two is 5.24 plus 273.15, which is 278.39 kelvins.', show: ['k.2', 'k.3'], caption: 'T₁ is 21 + 273.15 = 294.15 K, and T₂ is 5.24 + 273.15 = 278.39 K.' },
      ],
    },
    {
      chapter: 'Step 2: Check the fractions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'f',
          size: 'lg',
          lines: ['\\dfrac{V_1}{V_2} = \\dfrac{100.21}{144.53} = 0.6802', '\\text{bigger balloon: pressure down}', '\\dfrac{T_2}{T_1} = \\dfrac{278.39}{294.15} = 0.9464', '\\text{cooler gas: pressure down}'],
        },
      ],
      lines: [
        { say: 'Step two: check the fractions. The balloon got bigger, which spreads the particles out and lowers the pressure, so the volume fraction should be less than one. 100.21 over 144.53 is zero point six eight zero two. It is.', show: ['f.0', 'f.1'], caption: 'Step two: check the fractions. The balloon got bigger, which spreads the particles out and lowers the pressure, so the volume fraction should be less than one. 100.21 / 144.53 = 0.6802. It is.' },
        { say: 'The gas got cooler, which also lowers the pressure, so the temperature fraction should be less than one too. 278.39 over 294.15 is zero point nine four six four. It is.', show: ['f.2', 'f.3'], caption: 'The gas got cooler, which also lowers the pressure, so the temperature fraction should be less than one too. 278.39 / 294.15 = 0.9464. It is.' },
      ],
    },
    {
      chapter: 'Step 3: Calculate',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'lg', lines: ['P_2 = 0.981\\ \\text{atm} \\times 0.6802 \\times 0.9464', '= 0.6437\\ \\text{atm} \\approx \\good{0.644\\ \\text{atm}}'] }],
      lines: [
        { say: 'Step three. P two is zero point nine eight one atmospheres, times zero point six eight zero two, times zero point nine four six four.', show: 'c.0', caption: 'Step three. P₂ = 0.981 atm × 0.6802 × 0.9464.' },
        { say: 'That is zero point six four three seven, or zero point six four four atmospheres to three significant figures.', show: 'c.1', focus: 'c.1', caption: 'That is 0.6437, or 0.644 atm to three significant figures.' },
      ],
    },
    {
      chapter: 'Watch the climb',
      layout: 'center',
      main: [balloon],
      lines: [
        { say: 'Here is the gas in the balloon at the bottom: 100.21 litres, at zero point nine eight one atmospheres.', show: ['bl', 'bl.labels', 'bl.gauge', 'bl.volume', 'bl.thermo'], caption: 'Here is the gas in the balloon at the bottom: 100.21 L, at 0.981 atm.' },
        { say: 'As it rises, the air outside thins, so the balloon swells to 144.53 litres, and the gas cools a little. The particles are more spread out and slightly slower, so the gauge falls to zero point six four four atmospheres.', play: 'bl.climb', focus: ['bl.gauge', 'bl.volume'], caption: 'As it rises, the air outside thins, so the balloon swells to 144.53 L, and the gas cools a little. The particles are more spread out and slightly slower, so the gauge falls to 0.644 atm.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'ch', size: 'lg', lines: ['P_2 = \\good{0.644\\ \\text{atm}} \\;(65.2\\ \\text{kPa})', '\\text{before: } \\dfrac{0.981 \\times 100.21}{294.15} = 0.3342', '\\text{after: } \\dfrac{0.644 \\times 144.53}{278.39} = 0.3343 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Here is the whole answer: zero point six four four atmospheres, which is about 65.2 kilopascals. That matches the book.', show: 'ch.0', caption: 'Here is the whole answer: 0.644 atm, which is about 65.2 kPa. That matches the book.' },
        { say: 'A quick check: P V over T is zero point three three four before and after, so the combined gas law holds.', show: ['ch.1', 'ch.2'], focus: ['ch.1', 'ch.2'], caption: 'A quick check: PV/T is 0.334 before and after, so the combined gas law holds.' },
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
            ['$0.170\\ \\text{atm}$', 'Used **degrees Celsius**, 5.24 over 21'],
            ['$1.34\\ \\text{atm}$', 'Volume fraction **upside down**: a bigger balloon lowers the pressure'],
            ['$0.667\\ \\text{atm}$', 'Left out the **temperature** change'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Using degrees Celsius, 5.24 over 21. That makes the temperature fraction a quarter and gives zero point one seven zero atmospheres. Gas laws need kelvins.', focus: 'traps.0', caption: 'Using degrees Celsius, 5.24 over 21. That makes the temperature fraction a quarter and gives 0.170 atm. Gas laws need kelvins.' },
        { say: 'Turning the volume fraction upside down, which gives one point three four atmospheres. The balloon grew, so the pressure must fall, and this answer rose.', focus: 'traps.1', caption: 'Turning the volume fraction upside down, which gives 1.34 atm. The balloon grew, so the pressure must fall, and this answer rose.' },
        { say: 'And using Boyle\'s law alone, which gives zero point six six seven atmospheres. The temperature changed as well, so it must be in the calculation.', focus: 'traps.2', caption: 'And using Boyle\'s law alone, which gives 0.667 atm. The temperature changed as well, so it must be in the calculation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A gas occupies $2.0\\ \\text{L}$ at $100\\ \\text{kPa}$ and $300\\ \\text{K}$. Its pressure is raised to $200\\ \\text{kPa}$ and its temperature to $600\\ \\text{K}$. What is its new volume?',
          choices: ['$2.0\\ \\text{L}$', '$1.0\\ \\text{L}$', '$4.0\\ \\text{L}$', '$8.0\\ \\text{L}$'],
          answer: 0,
          working: 'V₂ = 2.0 L × (100/200) × (600/300) = 2.0 L: the two changes cancel.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas occupies two point zero litres at 100 kilopascals and 300 kelvins. Its pressure is raised to 200 kilopascals, and its temperature to 600 kelvins. What is its new volume? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A gas occupies 2.0 L at 100 kPa and 300 K. Its pressure is raised to 200 kPa, and its temperature to 600 K. What is its new volume? Pause the video and try it.' },
        { say: 'Doubling the pressure halves the volume, and doubling the Kelvin temperature doubles it, so the two cancel. The volume stays at two point zero litres: choice A.', show: 'q2.answer', caption: 'Doubling the pressure halves the volume, and doubling the Kelvin temperature doubles it, so the two cancel. The volume stays at 2.0 L: choice A.' },
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
          items: ['Combined gas law: $\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}$', 'Temperatures in **kelvins**', 'Check each fraction moves the answer the **right way**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For a fixed amount of gas, P one V one over T one equals P two V two over T two.', show: 'sum.0', caption: 'Here is what to remember. For a fixed amount of gas, P₁V₁/T₁ = P₂V₂/T₂.' },
        { say: 'Temperatures must be in kelvins.', show: 'sum.1' },
        { say: 'And check that each fraction pushes the answer the right way. For more on the combined gas law, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
