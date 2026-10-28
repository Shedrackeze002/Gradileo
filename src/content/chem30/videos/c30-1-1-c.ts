import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cup, flow, join, room } from './lib/c30-1a-figures.ts';

// Energy flowing out of the system (exothermic) and into it (endothermic).
const flows = figure(
  'fl',
  [
    flow({ name: 'exo', out: true, title: '\\text{exothermic}', note: '\\Delta H \\text{ is negative}' }),
    flow({ name: 'endo', at: [9.0, 0], out: false, title: '\\text{endothermic}', note: '\\Delta H \\text{ is positive}' }),
  ],
  460,
);

// Ammonium nitrate dissolving in a polystyrene cup: the water (the surroundings) gets colder.
const coldCup = figure(
  'cup',
  [
    join([
      cup({
        reading: 1.6,
        dots: [{ id: 'salt', tone: 'theta', at: [[-0.9, 0.3], [-0.45, 0.28], [0.0, 0.3], [-0.65, 0.65], [-0.2, 1.2], [0.25, 1.9], [-1.1, 1.8], [1.2, 1.2]] }],
        labels: { thermometer: '21.4 \\to 14.9^\\circ\\text{C}', liquid: '\\text{water}' },
        pointers: [{ id: 'system-tag', from: [0.0, 0.3], to: [3.0, 0.6], tex: '\\ce{NH4NO3}', tone: 'theta' }],
      }),
      room('space', [-2.6, 0], [7.6, 7]),
    ]),
  ],
  500,
);

const video: Explainer = {
  id: 'c30-1-1-c',
  lessonId: 'c30-1-1',
  title: 'Energy in Chemical Systems, Part 3: Exothermic and Endothermic Changes',
  thumbnailTitle: 'Exothermic and Endothermic',
  thumbnail: 'fl',
  summary:
    'An exothermic change releases energy from the system to the surroundings, which warm up, and ΔH is negative. An endothermic change absorbs energy from the surroundings, which cool down or must keep supplying energy, and ΔH is positive. Melting, evaporating and subliming are endothermic, and freezing and condensing are exothermic; a cold pack does not give out cold, it takes in energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'Exothermic and Endothermic Changes', subtitle: 'Which way does the energy flow?' }],
      lines: [
        { say: 'Squeeze an instant cold pack, and it turns icy. Strike a match, and it bursts into flame. One change takes energy in; the other gives it out.', show: 'title' },
        { say: 'In this part, you will classify a change as exothermic or endothermic from what you observe, and give its delta H the right sign.', caption: 'In this part, you will classify a change as exothermic or endothermic from what you observe, and give its ΔH the right sign.' },
      ],
    },
    {
      chapter: 'Two directions',
      layout: 'split',
      leftWidth: 600,
      left: [flows],
      right: [
        { kind: 'callout', id: 'exo', tone: 'definition', title: 'Exothermic', md: 'Releases energy **from** the system **to** the surroundings. The surroundings warm up; $\\Delta H$ is negative.' },
        { kind: 'callout', id: 'endo', tone: 'definition', title: 'Endothermic', md: 'Absorbs energy **from** the surroundings **into** the system. The surroundings cool down; $\\Delta H$ is positive.' },
      ],
      lines: [
        { say: 'An exothermic change releases energy from the system to the surroundings.', show: ['exo', 'fl.exo-box', 'fl.exo-title', 'fl.exo-arrows'] },
        { say: 'The surroundings get warmer. And delta H is negative, because the system has lost energy.', caption: 'The surroundings get warmer. And ΔH is negative, because the system has lost energy.', show: 'fl.exo-note', focus: 'fl.exo-note' },
        { say: 'An endothermic change absorbs energy from the surroundings into the system.', show: ['endo', 'fl.endo-box', 'fl.endo-title', 'fl.endo-arrows'], focus: 'fl.endo-arrows' },
        {
          say: 'The surroundings get colder, or the change keeps going only while energy is supplied. Delta H is positive, because the system has gained energy.',
          caption: 'The surroundings get colder, or the change keeps going only while energy is supplied. ΔH is positive, because the system has gained energy.',
          show: 'fl.endo-note',
          focus: 'fl.endo-note',
        },
      ],
    },
    {
      chapter: 'Reading the signs',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Observation', 'Energy flows', 'The change is'],
          rows: [
            ['The solution, the container or the air warms up', 'out of the system', 'exothermic'],
            ['It gives out heat and light, as burning does', 'out of the system', 'exothermic'],
            ['The solution or the container cools down', 'into the system', 'endothermic'],
            ['It stops when heating, light or electricity stops', 'into the system', 'endothermic'],
          ],
        },
        { kind: 'text', id: 'states', size: 'md', align: 'center', md: '**Endothermic:** melting, evaporating, subliming. **Exothermic:** freezing, condensing.' },
      ],
      lines: [
        { say: 'You can classify a change from what you observe. If the solution, the container or the air warms up, energy flowed out of the system. The change is exothermic.', show: 't.0' },
        { say: 'A change that gives out heat and light, as burning does, is exothermic too.', show: 't.1' },
        { say: 'If the solution or the container cools down, energy flowed into the system. The change is endothermic.', show: 't.2' },
        { say: 'And a change that stops when heating, light or electricity stops is endothermic. It needs a steady supply of energy.', show: 't.3' },
        { say: 'Changes of state follow the same rule. Melting, evaporating and subliming absorb energy, so they are endothermic. Freezing and condensing release energy, so they are exothermic.', show: 'states' },
      ],
    },
    {
      chapter: 'Reading the surroundings',
      layout: 'split',
      left: [coldCup],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ammonium nitrate dissolves in water in a polystyrene cup. The water falls from $21.4^\\circ\\text{C}$ to $14.9^\\circ\\text{C}$. Exothermic or endothermic? What is the sign of $\\Delta H$?' },
        {
          kind: 'bullets',
          id: 's',
          items: ['The water, the **surroundings**, got colder.', 'Energy flowed from the water **into** the system.', '**Endothermic**: $\\Delta H$ is positive.'],
        },
      ],
      lines: [
        {
          say: 'Ammonium nitrate is dissolved in water in a polystyrene cup, and the temperature of the water falls from twenty-one point four to fourteen point nine degrees Celsius. Is the change exothermic or endothermic?',
          show: ['q', 'cup.cups', 'cup.lid', 'cup.liquid', 'cup.salt', 'cup.stirrer', 'cup.thermometer', 'cup.thermometer-tag'],
        },
        { say: 'The thermometer is in the water, and the water is part of the surroundings. So the surroundings got colder.', show: ['s.0', 'cup.liquid-tag'], focus: ['cup.thermometer', 'cup.liquid'] },
        { say: 'That means energy flowed from the water into the dissolving ammonium nitrate, which is the system.', show: ['s.1', 'cup.system-tag'], focus: ['cup.salt', 'cup.system-tag'] },
        { say: 'So the change is endothermic, and delta H is positive.', caption: 'So the change is endothermic, and ΔH is positive.', show: 's.2', focus: 'cup' },
      ],
    },
    {
      chapter: 'Cold does not flow',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'mis',
          tone: 'mistake',
          title: 'A cold pack does not give out cold',
          md: '"Cold" is not something that flows. An instant cold pack feels cold because the dissolving solid takes energy **from** your skin. Always describe the flow of energy: **into** the system for an endothermic change, **out of** the system for an exothermic one.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: saying that a cold pack gives out cold.', show: 'mis' },
        { say: 'Cold is not something that flows. The pack feels cold because the dissolving solid takes energy from your skin.' },
        { say: 'So always describe the flow of energy: into the system for an endothermic change, out of it for an exothermic one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ethanol evaporates from the skin, and the skin feels cool. How is the change classified?',
          choices: ['Endothermic, with $\\Delta H$ positive', 'Endothermic, with $\\Delta H$ negative', 'Exothermic, with $\\Delta H$ negative', 'Exothermic, with $\\Delta H$ positive'],
          answer: 0,
          working: 'Evaporating absorbs energy from the skin to separate the ethanol molecules. Energy flows into the system, so the change is endothermic and $\\Delta H$ is positive.',
        },
      ],
      lines: [
        { say: 'Your turn. Ethanol evaporates from the skin, and the skin feels cool. How is the change classified? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is A. Evaporating ethanol takes energy from the skin, so energy flows into the system: endothermic, with a positive delta H. Choice B has the right word, but the wrong sign.',
          caption: 'The answer is A. Evaporating ethanol takes energy from the skin, so energy flows into the system: endothermic, with a positive ΔH. Choice B has the right word, but the wrong sign.',
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
            '**Exothermic**: energy flows out of the system, the surroundings warm up, and $\\Delta H$ is negative.',
            '**Endothermic**: energy flows in, the surroundings cool down or energy must be supplied, and $\\Delta H$ is positive.',
            'Melting, evaporating and subliming are endothermic; freezing and condensing are exothermic.',
            'Describe the flow of energy, never a flow of cold.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In an exothermic change, energy flows out of the system, the surroundings warm up, and delta H is negative.', caption: 'Let’s sum up. In an exothermic change, energy flows out of the system, the surroundings warm up, and ΔH is negative.', show: 'sum.0' },
        {
          say: 'In an endothermic change, energy flows in, the surroundings cool down or energy must be supplied, and delta H is positive.',
          caption: 'In an endothermic change, energy flows in, the surroundings cool down or energy must be supplied, and ΔH is positive.',
          show: 'sum.1',
        },
        { say: 'Melting, evaporating and subliming are endothermic. Freezing and condensing are exothermic.', show: 'sum.2' },
        { say: 'And describe the flow of energy, never a flow of cold. In part four, you will see where the energy comes from: the bonds that break and form. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
