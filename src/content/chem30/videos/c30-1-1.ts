import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { burnerCan, cup, join, room, systems } from './lib/c30-1a-figures.ts';

// Zinc powder in copper(II) sulfate solution in a polystyrene cup: the reacting particles are the
// system; the water, the cup, the thermometer and the air are the surroundings.
const zincCup = figure(
  'cup',
  [
    join([
      cup({
        lid: false,
        stirrer: false,
        level: 3.4,
        dots: [
          { id: 'zn', tone: 'muted', r: 0.2, at: [[-1.05, 0.3], [-0.6, 0.27], [-0.15, 0.3], [-0.82, 0.68]] },
          { id: 'cu', tone: 'adj', at: [[-1.15, 1.6], [-0.25, 1.3], [0.25, 2.3], [-0.75, 2.75], [1.2, 1.5], [0.15, 3.0]] },
        ],
        labels: { thermometer: '\\text{thermometer}', cups: '\\text{polystyrene cup}', liquid: '\\text{water}', air: '\\text{air}' },
        pointers: [{ id: 'system-tag', from: [-0.1, 0.3], to: [3.0, 0.6], tex: '\\text{system: } \\ce{Zn},\\ \\ce{Cu^2+}', tone: 'theta' }],
      }),
      room('space', [-2.6, 0], [8.6, 7.2]),
    ]),
  ],
  520,
);

// An open, a closed and an isolated system.
const kinds = figure('sys', [systems()], 420);

// Methane burning under a can of water.
const burner = figure(
  'burn',
  [join([burnerCan({ labels: { thermometer: '\\text{thermometer}', can: '\\text{can of water}', flame: '\\text{flame: } \\ce{CH4 + O2}', burner: '\\text{burner}' } }), room('space', [-2.0, 0], [7.4, 7.9])])],
  520,
);

const video: Explainer = {
  id: 'c30-1-1',
  lessonId: 'c30-1-1',
  title: 'Energy in Chemical Systems, Part 1: Systems and Surroundings',
  thumbnailTitle: 'Systems and Surroundings',
  thumbnail: 'cup',
  summary:
    'To follow an energy change, chemists divide the world into the chemical system, the substances that react and the products they form, and the surroundings, everything else that can exchange energy with them, including the water the chemicals are dissolved in. An open system exchanges matter and energy, a closed system only energy, and an isolated system neither.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'Systems and Surroundings', subtitle: 'Where does the energy go?' }],
      lines: [
        { say: 'Light a camping stove under a pot of water, and within minutes the water boils. Where did that energy come from, and where did it go?', show: 'title' },
        { say: 'In this lesson, you will follow energy through chemical changes. This first part splits the world in two: the system and its surroundings.' },
        { say: 'Later parts cover kinetic and potential energy, exothermic and endothermic changes, and the bonds that break and form.' },
      ],
    },
    {
      chapter: 'The system and the surroundings',
      layout: 'split',
      left: [zincCup],
      right: [
        { kind: 'callout', id: 'sys', tone: 'definition', title: 'Chemical system', md: 'The set of substances being studied: the **reactants** and the **products** they form.' },
        { kind: 'callout', id: 'sur', tone: 'definition', title: 'Surroundings', md: 'Everything else that can exchange energy with the system: the water, the container, the thermometer, the air.' },
      ],
      lines: [
        { say: 'The chemical system is the set of substances being studied: the reactants, and the products they form.', show: 'sys' },
        { say: 'The surroundings are everything else that can exchange energy with the system.', show: 'sur' },
        {
          say: 'For example, zinc powder is stirred into copper two sulfate solution in a polystyrene cup.',
          caption: 'For example, zinc powder is stirred into copper(II) sulfate solution in a polystyrene cup.',
          show: ['cup.cups', 'cup.liquid', 'cup.thermometer', 'cup.zn', 'cup.cu'],
        },
        {
          say: 'The system is the zinc atoms and copper two ions that react, and the zinc ions and copper metal they form.',
          caption: 'The system is the zinc atoms and copper(II) ions that react, and the zinc ions and copper metal they form.',
          show: 'cup.system-tag',
          focus: ['cup.zn', 'cup.cu', 'cup.system-tag'],
        },
        {
          say: 'The water that holds the ions in solution is part of the surroundings, along with the cup, the thermometer and the air.',
          show: ['cup.liquid-tag', 'cup.cups-tag', 'cup.thermometer-tag', 'cup.air-tag'],
          focus: ['cup.liquid', 'cup.cups', 'cup.thermometer'],
        },
        { say: 'So a thermometer in the solution reads the temperature of the surroundings.', focus: ['cup.thermometer', 'cup.thermometer-tag'] },
      ],
    },
    {
      chapter: 'Open, closed and isolated',
      layout: 'center',
      main: [kinds, { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'No real container is perfectly isolated, but a good **calorimeter** comes close.' }],
      lines: [
        { say: 'Systems are also described by what can cross their boundary.' },
        { say: 'In an open system, matter and energy both cross. Zinc reacting with acid in an open beaker is open: hydrogen bubbles away, and heat escapes.', show: ['sys.open', 'sys.open-matter', 'sys.open-energy'] },
        { say: 'In a closed system, only energy crosses. A reaction in a sealed flask that becomes warm is closed: heat passes through the glass, but nothing gets out.', show: ['sys.closed', 'sys.closed-energy'], focus: 'sys.closed-energy' },
        { say: 'In an isolated system, neither crosses: an ideal container, sealed and perfectly insulated.', show: 'sys.isolated', focus: 'sys.isolated' },
        { say: 'No real container is perfectly isolated, but a good calorimeter comes close.', show: 'note', focus: 'sys' },
      ],
    },
    {
      chapter: 'Naming the parts',
      layout: 'split',
      left: [burner],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Methane burns in a laboratory burner under a metal can of water. Name the chemical system, and three parts of the surroundings.' },
        { kind: 'text', id: 's1', size: 'md', md: '**System:** $\\ce{CH4}$ and $\\ce{O2}$, and the $\\ce{CO2}$ and $\\ce{H2O}$ vapour they make.' },
        { kind: 'text', id: 's2', size: 'md', md: '**Surroundings:** the water in the can, the can itself, the air in the room.' },
      ],
      lines: [
        { say: 'Try one. Methane burns in a burner under a metal can of water. Name the system, and three parts of the surroundings.', show: ['q', 'burn'] },
        {
          say: 'The system is the substances that react and form: methane and oxygen, and the carbon dioxide and water vapour they make.',
          caption: 'The system is the substances that react and form: methane and oxygen (CH₄ and O₂), and the carbon dioxide and water vapour they make (CO₂ and H₂O).',
          show: 's1',
          focus: ['burn.flame', 'burn.flame-tag'],
        },
        { say: 'The surroundings include the water in the can, the can itself, and the air in the room.', show: 's2', focus: ['burn.can', 'burn.can-tag'] },
        { say: 'Notice the two kinds of water. The water vapour made in the flame belongs to the system. The water in the can only takes in energy, so it is surroundings.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ammonium nitrate dissolves in the water of an instant cold pack. Which of these is part of the **chemical system**?',
          choices: ['The water in the pack', 'The ammonium nitrate', 'The plastic bag of the pack', 'The injured wrist the pack is held against'],
          answer: 1,
          working: 'The chemical system is the substance that changes: the ammonium nitrate (and the ions it releases). The water only holds the dissolved ions, so it belongs to the surroundings, with the bag and the wrist.',
        },
      ],
      lines: [
        { say: 'Your turn. Ammonium nitrate dissolves in the water of an instant cold pack. Which of these is part of the chemical system? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B, the ammonium nitrate: it is the substance that changes. Choice A is tempting, but the water only holds the dissolved ions, so it belongs to the surroundings.',
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
            'The **chemical system** is the substances that react and the products they form.',
            'The **surroundings** are everything else that can exchange energy with the system, including the water the chemicals are dissolved in.',
            '**Open**: matter and energy cross the boundary. **Closed**: only energy. **Isolated**: neither.',
            'A thermometer in the solution reads the temperature of the surroundings.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The chemical system is the substances that react, and the products they form.', show: 'sum.0' },
        { say: 'The surroundings are everything else, including the water the chemicals are dissolved in.', show: 'sum.1' },
        { say: 'An open system exchanges matter and energy, a closed system only energy, and an isolated system neither.', show: 'sum.2' },
        { say: 'And a thermometer in the solution reads the surroundings. In part two, you will meet the two kinds of energy a system holds. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
