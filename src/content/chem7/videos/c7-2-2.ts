import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts): heating them really melts and boils
// them, and cooling them really condenses and freezes them. The thermometer marks are where this
// simulation melts and boils.

const MARKS = { marks: [{ at: 0.33, label: 'melts' }, { at: 0.9, label: 'boils' }] };

/** One box of particles taken round the whole cycle: melt, boil, condense, freeze. */
const cycle: ParticlesEl = {
  kind: 'particles',
  id: 'p',
  boxes: [{ id: 'b', state: 'solid', n: 36, width: 10, height: 10, temp: 0.1 }],
  clips: {
    melt: { phases: [{ dur: 5, heat: { b: 0.5 } }, { dur: 1.5 }] },
    boil: { phases: [{ dur: 6, heat: { b: 2.5 } }, { dur: 1.5 }] },
    condense: { phases: [{ dur: 6, heat: { b: 0.5 } }, { dur: 1.5 }] },
    freeze: { phases: [{ dur: 6, heat: { b: 0.08 } }, { dur: 1.5 }] },
  },
  thermometers: MARKS,
  height: 520,
};

/** Water vapour in the air beside a cold can: the right-hand wall is the can, and it is cold. */
const can: ParticlesEl = {
  kind: 'particles',
  id: 'v',
  boxes: [{ id: 'b', state: 'gas', n: 30, width: 12, height: 10, temp: 2, bath: 'right', heatColor: [0.15, 2], label: 'air beside a cold can' }],
  clips: { cool: { phases: [{ dur: 1, heat: { b: 0.08 } }, { dur: 9 }] } },
  height: 560,
};

/** A box whose temperature is set below, between and above its melting and boiling points. */
const points: ParticlesEl = {
  kind: 'particles',
  id: 'm',
  boxes: [{ id: 'b', state: 'solid', n: 30, width: 9, height: 9, temp: 0.12 }],
  clips: {
    liquid: { phases: [{ dur: 3, heat: { b: 0.55 } }, { dur: 1 }] },
    gas: { phases: [{ dur: 3, heat: { b: 2.5 } }, { dur: 1 }] },
  },
  thermometers: MARKS,
  height: 500,
};

const video: Explainer = {
  id: 'c7-2-2',
  lessonId: 'c7-2-2',
  title: 'Changes of State',
  thumbnail: 'p',
  summary:
    'Melting, evaporating and sublimation need a substance to take in heat; freezing and condensation give heat out. A change of state does not make a new substance. Below its melting point a substance is solid, between its melting and boiling points it is liquid, and above its boiling point it is gas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Changes of State', subtitle: 'Melting, boiling, freezing and condensing' }],
      lines: [
        { say: 'An ice lolly drips on a hot day. A puddle disappears in the sun. A cold can of juice gets wet on the outside.', show: 'title' },
        { say: 'Each of these is a change of state. In this video, you will name the changes, and use melting and boiling points to predict a substance’s state.' },
      ],
    },
    {
      chapter: 'Melting and boiling',
      layout: 'split',
      leftWidth: 560,
      left: [cycle],
      right: [
        {
          kind: 'table',
          id: 'names',
          head: ['Change', 'States', 'Heat'],
          rows: [
            ['melting', 'solid → liquid', 'taken in'],
            ['evaporation, boiling', 'liquid → gas', 'taken in'],
            ['sublimation', 'solid → gas', 'taken in'],
            ['freezing', 'liquid → solid', 'given out'],
            ['condensation', 'gas → liquid', 'given out'],
          ],
        },
      ],
      lines: [
        { say: 'A change of state happens when a substance is heated or cooled enough for its particles to change how they are arranged. Here is a solid, with a thermometer beside it.', show: ['p', 'p.thermo'] },
        { say: 'Let’s heat it. The particles take in energy and vibrate harder and harder, until they break out of their rows and slide past one another. The solid has melted into a liquid.', play: 'p.melt', show: ['names', 'names.0'], focus: 'names.0' },
        { say: 'Keep heating. The particles move faster still, until they break away from one another completely and fly apart. The liquid has turned into a gas. This is evaporation, and when it happens all through the liquid, with bubbles, we call it boiling.', play: 'p.boil', show: 'names.1', focus: 'names.1' },
        { say: 'Sublimation turns a solid straight into a gas, without becoming a liquid first. Melting, evaporation and sublimation all need the particles to move apart, so the substance must take in heat.', show: 'names.2', focus: 'names.2' },
        { say: 'Now let’s cool the gas. The particles give out heat and slow down, and when they bump into one another they stick together. The gas condenses back into a liquid.', play: 'p.condense', show: 'names.4', focus: 'names.4' },
        { say: 'Cool it further, and the particles settle back into rows. The liquid freezes into a solid. Freezing and condensation both give out heat.', play: 'p.freeze', show: 'names.3', focus: 'names.3' },
        { say: 'Through all of this, the particles themselves never changed. Ice, water and steam are all still water, so a change of state never makes a new substance.', focus: 'p' },
      ],
    },
    {
      chapter: 'Water on a cold can',
      layout: 'split',
      leftWidth: 760,
      left: [can],
      right: [
        { kind: 'text', id: 'q0', md: 'Drops of water form on the **outside** of a cold can of juice. Where do they come from?' },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Condensation', md: 'Invisible **water vapour** in the air touches the cold can, gives out heat, and turns into liquid water.' },
      ],
      lines: [
        { say: 'Drops of water form on the outside of a cold can of juice. Where do they come from? They are not juice leaking out.', show: 'q0' },
        { say: 'The air always holds some invisible water vapour. Here are its particles, with their colour showing how fast they move. The wall on the right is the cold can.', show: ['v', 'v.labels'] },
        { say: 'Watch what happens when a particle hits the cold wall. It gives out heat and slows down, turning blue. Slow particles stick together, and drops of liquid water form and run down.', play: 'v.cool', focus: 'v.b' },
        { say: 'So the drops come from the air. Water vapour touches the cold can, gives out heat, and condenses into liquid water.', show: 'ans' },
      ],
    },
    {
      chapter: 'Melting and boiling points',
      layout: 'split',
      leftWidth: 620,
      left: [points],
      right: [
        { kind: 'table', id: 'mp', head: ['Substance', 'Melts at (°C)', 'Boils at (°C)'], rows: [['oxygen', '−218', '−183'], ['ethanol', '−114', '78'], ['water', '0', '100']] },
        { kind: 'bullets', id: 'rule', items: ['Below the melting point: **solid**.', 'Between the two: **liquid**.', 'Above the boiling point: **gas**.'] },
      ],
      lines: [
        { say: 'Each pure substance melts and boils at its own fixed temperatures, called its melting point and its boiling point.', show: ['mp', 'm', 'm.thermo'] },
        { say: 'Below its melting point, a substance is a solid.', show: 'rule.0' },
        { say: 'Between its melting and boiling points, it is a liquid.', show: 'rule.1', play: 'm.liquid' },
        { say: 'And above its boiling point, it is a gas.', show: 'rule.2', play: 'm.gas' },
        { say: 'Ethanol melts at minus one hundred and fourteen degrees and boils at seventy-eight. So at twenty degrees it is a liquid, and at ninety degrees it is a gas.', focus: 'mp.1' },
        { say: 'Take care with negative numbers. Minus one hundred and twenty is colder than minus one hundred and fourteen, so at minus one hundred and twenty, ethanol is a solid.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Oxygen melts at −218 °C and boils at −183 °C. What state is oxygen in at −200 °C?',
          choices: ['A liquid', 'A solid', 'A gas', 'A solid and a gas at once'],
          answer: 0,
          working: '−200 °C is warmer than −218 °C but colder than −183 °C, so it lies between the melting and boiling points: oxygen is a liquid.',
        },
      ],
      lines: [
        { say: 'Your turn. Oxygen melts at minus two hundred and eighteen degrees and boils at minus one hundred and eighty-three. What state is it in at minus two hundred? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Minus two hundred lies between the melting point and the boiling point, so oxygen is a liquid.', show: 'q.answer' },
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
            'Melting, evaporating and sublimation **take in heat**.',
            'Freezing and condensation **give out heat**.',
            'A change of state does not make a new substance.',
            'Solid below the melting point, liquid between, gas above the boiling point.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Melting, evaporation and sublimation need the substance to take in heat.', show: 'sum.0' },
        { say: 'Freezing and condensation give heat out.', show: 'sum.1' },
        { say: 'A change of state never makes a new substance.', show: 'sum.2' },
        { say: 'And a substance is solid below its melting point, liquid between, and gas above its boiling point. Next, you will find out what temperature and heat really are.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
