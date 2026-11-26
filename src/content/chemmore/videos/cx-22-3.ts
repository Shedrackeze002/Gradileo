import type { Explainer } from '@/video/script.ts';
import { stateCycle } from '../../chem10/videos/lib/c10-particles.ts';

const video: Explainer = {
  id: 'cx-22-3',
  lessonId: 'cx-22-3',
  title: 'Energy of Phase Changes',
  thumbnail: false,
  summary:
    'Melting and boiling take in energy to separate particles, and freezing and condensing give the same energy out. For a phase change q = nΔH, with ΔH of fusion or of vaporisation, and for warming one state q = mcΔT. On a heating curve the flat parts are phase changes and the sloped parts are one state warming, and boiling takes far longer than melting because ΔH of vaporisation is much larger.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Energy of Phase Changes', subtitle: 'Why the thermometer stops' }],
      lines: [
        { say: 'Put a pan of ice on the stove and watch a thermometer in it. The temperature climbs, then stops at zero while the ice melts, climbs again, and stops for a long time at one hundred while the water boils.', caption: 'Put a pan of ice on the stove and watch a thermometer in it. The temperature climbs, then stops at 0 °C while the ice melts, climbs again, and stops for a long time at 100 °C while the water boils.', show: 'title' },
        { say: 'In this lesson, you will calculate the energy of phase changes and read heating curves.' },
      ],
    },
    {
      chapter: 'A change of state, up close',
      layout: 'split',
      leftWidth: 520,
      left: [stateCycle('p', 500)],
      right: [{ kind: 'bullets', id: 'w', items: ['Heat a solid: it **melts**.', 'Keep heating: the liquid **boils**.', 'Cool the gas: it **condenses**.', 'Keep cooling: the liquid **freezes**.'] }],
      lines: [
        { say: 'Here are the particles of a solid, vibrating in rows, with a thermometer beside them.', show: ['p', 'p.thermo'] },
        { say: 'Heat it. The particles vibrate harder until they break out of their rows. Melting takes in energy to pull the particles apart.', show: 'w.0', play: 'p.melt' },
        { say: 'Keep heating. The particles escape from one another altogether. Boiling separates them completely, so it takes in much more energy than melting.', show: 'w.1', play: 'p.boil' },
        { say: 'Now cool it. As the gas condenses, the particles come back together and give out the same energy that boiling took in.', show: 'w.2', play: 'p.condense' },
        { say: 'And as the liquid freezes, it gives out the energy that melting took in.', show: 'w.3', play: 'p.freeze' },
      ],
    },
    {
      chapter: 'Enthalpies of fusion and vaporisation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['q = n\\,\\Delta H'] },
        { kind: 'bullets', id: 'b', items: ['Water: $\\Delta H_\\text{fus} = 6.01$ kJ/mol', 'Water: $\\Delta H_\\text{vap} = 40.7$ kJ/mol'] },
      ],
      lines: [
        { say: 'The energy to melt one mole of a solid is its molar enthalpy of fusion. The energy to boil one mole of a liquid is its molar enthalpy of vaporisation. For n moles, q equals n delta H.', caption: 'The energy to melt one mole of a solid is its molar enthalpy of fusion. The energy to boil one mole of a liquid is its molar enthalpy of vaporisation. For n moles, q = nΔH.', show: 'm' },
        { say: 'For water, the enthalpy of fusion is six point zero one kilojoules per mole.', caption: 'For water, ΔHfus = 6.01 kJ/mol.', show: 'b.0' },
        { say: 'And the enthalpy of vaporisation is forty point seven, almost seven times as much.', caption: 'And ΔHvap = 40.7 kJ/mol, almost seven times as much.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Reading a heating curve',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sloped** parts: one state warms, $q = mc\\Delta T$', '**Flat** parts: the state changes, $q = n\\,\\Delta H$', 'The boiling plateau is the longest'] }],
      lines: [
        { say: 'On a heating curve, the sloped parts are one state warming. The energy makes the particles move faster, and q equals m c delta T.', caption: 'On a heating curve, the sloped parts are one state warming. The energy makes the particles move faster, and q = mcΔT.', show: 'b.0' },
        { say: 'On the flat parts, the state is changing. All the energy goes into separating the particles, so the temperature stays still.', show: 'b.1' },
        { say: 'Because the enthalpy of vaporisation is so large, the boiling plateau is the longest part of the curve.', show: 'b.2' },
      ],
    },
    {
      chapter: 'From water to steam',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['10.0 \\times 4.18 \\times 50 = 2090\\ \\text{J} = 2.09\\ \\text{kJ}', '\\dfrac{10.0}{18.0} \\times 40.7 = 22.6\\ \\text{kJ}', '2.09 + 22.6 = 24.7\\ \\text{kJ}'] }],
      lines: [
        { say: 'How much energy turns ten grams of water at fifty degrees into steam at one hundred? First warm the water: ten times four point one eight times fifty is two point zero nine kilojoules.', caption: 'How much energy turns 10.0 g of water at 50 °C into steam at 100 °C? First warm the water: 10.0 × 4.18 × 50 = 2.09 kJ.', show: 'm.0', focus: 'm.0' },
        { say: 'Then boil it. Ten grams is ten over eighteen moles, times forty point seven, which is twenty-two point six kilojoules.', caption: 'Then boil it. 10.0 g is 10.0 ÷ 18.0 mol, times 40.7, which is 22.6 kJ.', show: 'm.1', focus: 'm.1' },
        { say: 'The total is twenty-four point seven kilojoules, and almost all of it went into boiling. Change both steps to the same unit before you add them.', caption: 'The total is 24.7 kJ, and almost all of it went into boiling. Change both steps to the same unit before you add them.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How much energy is needed to melt 36.0 g of ice at 0 °C? ($\\Delta H_\\text{fus} = 6.01$ kJ/mol, molar mass 18.0 g/mol)',
          choices: ['6.01 kJ', '12.0 kJ', '81.4 kJ', '216 kJ'],
          answer: 1,
          working: '$n = \\dfrac{36.0}{18.0} = 2.00$ mol, so $q = 2.00 \\times 6.01 = 12.0$ kJ.',
        },
      ],
      lines: [
        { say: 'Your turn. How much energy is needed to melt thirty-six grams of ice at zero degrees? The enthalpy of fusion is six point zero one kilojoules per mole. Pause the video and try it.', caption: 'Your turn. How much energy is needed to melt 36.0 g of ice at 0 °C? ΔHfus = 6.01 kJ/mol. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twelve point zero kilojoules. Thirty-six grams is two moles, and two times six point zero one is twelve point zero.', caption: 'The answer is B, 12.0 kJ. 36.0 g is 2.00 mol, and 2.00 × 6.01 = 12.0 kJ.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Melting and boiling take energy in; freezing and condensing give it out.', 'Phase change: q = nΔH. Warming: q = mcΔT.', 'Flat parts of a heating curve are phase changes.', 'ΔHvap is much larger than ΔHfus.'] }],
      lines: [
        { say: 'Let’s sum up. Melting and boiling take energy in, and freezing and condensing give the same energy out.', show: 'sum.0' },
        { say: 'For a phase change, q equals n delta H. For warming one state, q equals m c delta T.', caption: 'For a phase change, q = nΔH. For warming one state, q = mcΔT.', show: 'sum.1' },
        { say: 'The flat parts of a heating curve are the phase changes.', show: 'sum.2' },
        { say: 'And the enthalpy of vaporisation is much larger than the enthalpy of fusion, so boiling takes far longer.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
