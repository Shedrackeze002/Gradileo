import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { arrow, chain, motionBox, tag } from './lib/c30-1a-figures.ts';

// The same water cool and hot: the particles move faster when it is hotter.
const motion = figure(
  'mo',
  [
    motionBox({ name: 'cool', speed: 0.35, seed: 4, label: '\\text{cool water}' }),
    motionBox({ name: 'hot', at: [7.5, 0], speed: 1.0, seed: 4, tone: 'opp', label: '\\text{hot water}' }),
  ],
  480,
);

// Ice melting at 0 °C: the particles stay as fast, but move apart.
const melting = figure(
  'ice',
  [
    particles({ name: 'solid', state: 'solid', size: 5 }),
    tag('solid-name', [2.5, -0.3], '\\text{ice, } 0^\\circ\\text{C}', { place: 'below', group: 'solid-box' }),
    arrow('in', [5.7, 2.5], [8.3, 2.5], { tone: 'adj', group: 'energy' }),
    tag('in-text', [7.0, 2.75], '\\text{energy}', { place: 'above', tone: 'adj', group: 'energy' }),
    particles({ name: 'liquid', state: 'liquid', size: 5, at: [9, 0], seed: 11 }),
    tag('liquid-name', [11.5, -0.3], '\\text{water, } 0^\\circ\\text{C}', { place: 'below', group: 'liquid-box' }),
  ],
  420,
);

// Burning propane: potential energy in the reactants becomes kinetic energy around them.
const stove = figure(
  'st',
  [
    chain({ boxes: ['\\ce{C3H8 + O2}', '\\ce{CO2 + H2O}', '\\text{surroundings}'], arrows: ['\\text{burning}', '\\text{released}'], w: 6.2, gap: 3.0, tones: ['theta', 'theta', 'opp'] }),
    tag('pe-hi', [0, -0.9], '\\text{more potential energy}', { place: 'below', tone: 'muted', group: 'b0' }),
    tag('pe-lo', [9.2, -0.9], '\\text{less potential energy}', { place: 'below', tone: 'muted', group: 'b1' }),
    tag('ke', [18.4, -0.9], '\\text{more kinetic energy}', { place: 'below', tone: 'muted', group: 'b2' }),
  ],
  300,
);

const video: Explainer = {
  id: 'c30-1-1-b',
  lessonId: 'c30-1-1',
  title: 'Energy in Chemical Systems, Part 2: Kinetic and Potential Energy',
  thumbnailTitle: 'Kinetic and Potential Energy',
  thumbnail: 'ice',
  summary:
    'Kinetic energy is the energy of moving particles, and temperature measures its average. Potential energy is stored in chemical bonds and in the attractions between particles: while ice melts at 0 °C, the energy absorbed raises the potential energy of the water molecules, not their kinetic energy. Enthalpy, H, is the total of both; only its change, ΔH, can be measured.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'Kinetic and Potential Energy', subtitle: 'Energy of motion, energy of position' }],
      lines: [
        { say: 'Before propane burns in a camping stove, the energy it will release is already there, though nothing is hot or moving. What kind of energy is it?', show: 'title' },
        { say: 'In this part, you will meet the two kinds of energy a chemical system holds, and their total, called enthalpy.' },
      ],
    },
    {
      chapter: 'Kinetic energy',
      layout: 'split',
      leftWidth: 560,
      left: [motion],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Kinetic energy', md: 'The energy of motion. Particles move from place to place, spin and vibrate.' },
        { kind: 'callout', id: 'temp', tone: 'key', title: 'Temperature', md: 'Temperature measures the **average** kinetic energy of the particles.' },
      ],
      lines: [
        { say: 'The first kind of energy is kinetic energy, the energy of motion.', show: 'def' },
        { say: 'Particles move from place to place, spin and vibrate. Each arrow shows a particle on the move.', show: ['mo.cool-box', 'mo.cool-balls', 'mo.cool-arrows'] },
        { say: 'Temperature measures their average kinetic energy. The hotter a substance, the faster its particles move.', show: ['temp', 'mo.hot-box', 'mo.hot-balls', 'mo.hot-arrows'], focus: 'mo.hot-arrows' },
        { say: 'So when water warms up, its molecules move faster on average: their kinetic energy goes up.' },
      ],
    },
    {
      chapter: 'Potential energy',
      layout: 'split',
      leftWidth: 600,
      left: [melting],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Potential energy', md: 'Stored energy that depends on position: held in the **chemical bonds** within particles and in the **attractions** between particles.' }],
      lines: [
        { say: 'The second kind is potential energy: stored energy that depends on position. In chemistry, it is held in the chemical bonds within particles, and in the attractions between particles.', show: 'def' },
        { say: 'It changes when bonds break and form, or when particles move apart or come together.' },
        {
          say: 'A change of state shows the two kinds apart. While ice melts at zero degrees Celsius, the temperature stays at zero degrees, so the average kinetic energy of the molecules does not change.',
          show: ['ice.solid-box', 'ice.solid-p', 'ice.energy', 'ice.liquid-box', 'ice.liquid-p'],
        },
        { say: 'Instead, the energy absorbed pulls the molecules partly apart, against their attractions. That raises their potential energy.', focus: ['ice.energy', 'ice.liquid-p'] },
      ],
    },
    {
      chapter: 'Enthalpy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Enthalpy', md: 'The **enthalpy**, $H$, of a system is its total kinetic and potential energy at constant pressure. $H$ itself cannot be measured, but its change, $\\Delta H$, can: it is the energy the system gains or loses.' },
        { kind: 'callout', id: 'law', tone: 'key', title: 'Energy is conserved', md: 'Potential energy the system loses becomes kinetic energy of the particles around it; energy it gains comes from them.' },
      ],
      lines: [
        { say: 'The enthalpy of a system, H, is its total kinetic and potential energy, at constant pressure.', show: 'def' },
        { say: 'The total enthalpy cannot be measured. But its change, delta H, can: it is the energy the system gains or loses.', caption: 'The total enthalpy cannot be measured. But its change, ΔH, can: it is the energy the system gains or loses.' },
        { say: 'In a reaction, the atoms of the reactants are rearranged into the products, so the chemical potential energy of the system changes.' },
        { say: 'And energy is conserved. Whatever potential energy the system loses becomes kinetic energy of the particles around it, and whatever it gains comes from them.', show: 'law' },
      ],
    },
    {
      chapter: 'Energy in a stove',
      layout: 'center',
      main: [stove, { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'No energy is created: potential energy of the system becomes kinetic energy of the surroundings.' }],
      lines: [
        { say: 'Now back to the stove. Before propane burns, the energy it will release is potential energy, held in the bonds and the arrangement of the propane and oxygen molecules.', show: 'st.b0' },
        { say: 'Burning rearranges the atoms into carbon dioxide and water, which have less potential energy.', show: ['st.a0', 'st.b1'] },
        { say: 'The difference raises the kinetic energy of the hot gases in the flame, and then of the pot and the water.', show: ['st.a1', 'st.b2'] },
        { say: 'No energy is created: it only changes form, and moves from the system to the surroundings.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The water in a calorimeter warms from $20.0^\\circ\\text{C}$ to $26.5^\\circ\\text{C}$. What has increased?',
          choices: [
            'The potential energy stored in the bonds of the water molecules',
            'The number of water molecules',
            'The strength of the bonds inside each water molecule',
            'The average kinetic energy of the water molecules',
          ],
          answer: 3,
          working: 'Temperature measures the average kinetic energy of the particles, so a rise in temperature means the water molecules are moving faster.',
        },
      ],
      lines: [
        { say: 'Your turn. The water in a calorimeter warms from twenty point zero to twenty-six point five degrees Celsius. What has increased? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D. Temperature measures average kinetic energy, so warmer water means faster molecules. Choice A is tempting, but the bonds inside the water molecules have not changed.',
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
            '**Kinetic energy** is the energy of moving particles; temperature measures its average.',
            '**Potential energy** is held in bonds and in the attractions between particles.',
            '**Enthalpy**, $H$, is the total. Only its change, $\\Delta H$, can be measured.',
            'Energy is conserved: what the system loses, the surroundings gain.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Kinetic energy is the energy of moving particles, and temperature measures its average.', show: 'sum.0' },
        { say: 'Potential energy is held in chemical bonds, and in the attractions between particles.', show: 'sum.1' },
        { say: 'Enthalpy, H, is the total of the two. Only its change, delta H, can be measured.', caption: 'Enthalpy, H, is the total of the two. Only its change, ΔH, can be measured.', show: 'sum.2' },
        { say: 'And energy is conserved. In part three, you will classify changes as exothermic or endothermic. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
