import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stateChanges } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-1-c',
  lessonId: 'c10-1-1',
  title: 'States of Matter and the Particle Model, Part 3: Changes of State',
  thumbnailTitle: 'Changes of State',
  thumbnail: 'cs',
  summary:
    'The six changes of state: melting, freezing, evaporation or boiling, condensation, sublimation and deposition. Melting, evaporation, boiling and sublimation take in energy; freezing, condensation and deposition give it out. Dew, frost and dry ice are everyday examples.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 3', title: 'Changes of State', subtitle: 'Six changes, and where the energy goes' }],
      lines: [
        { say: 'Dew on the grass, frost on a car window, steam from a kettle: each one is a substance changing state.', show: 'title' },
        { say: 'In this part, you will name all six changes of state, and see which ones take in energy.' },
      ],
    },
    {
      chapter: 'Six changes of state',
      layout: 'center',
      main: [figure('cs', [stateChanges()], 600)],
      lines: [
        { say: 'Heating gives the particles more energy, so they move faster. With enough energy, they overcome some of the forces between them, and the substance changes state. Cooling does the reverse.', show: ['cs.solid', 'cs.liquid', 'cs.gas'] },
        { say: 'Melting turns a solid into a liquid. Freezing, also called solidifying, turns a liquid into a solid.', show: ['cs.melt', 'cs.freeze'], focus: ['cs.melt', 'cs.freeze'] },
        { say: 'Evaporation turns a liquid into a gas from its surface, at any temperature. Boiling is the same change all through the liquid, with bubbles forming inside it, at one temperature: the boiling point.', show: 'cs.evap', focus: 'cs.evap' },
        { say: 'Condensation turns a gas into a liquid.', show: 'cs.cond', focus: 'cs.cond' },
        { say: 'Sublimation turns a solid straight into a gas, without becoming a liquid first. Deposition is the reverse: a gas turns straight into a solid.', show: ['cs.subl', 'cs.depo'], focus: ['cs.subl', 'cs.depo'] },
      ],
    },
    {
      chapter: 'Energy in or out',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'From → to', 'Energy'],
          rows: [
            ['melting', 'solid → liquid', '[[opp:taken in]]'],
            ['evaporation or boiling', 'liquid → gas', '[[opp:taken in]]'],
            ['sublimation', 'solid → gas', '[[opp:taken in]]'],
            ['freezing', 'liquid → solid', '[[adj:given out]]'],
            ['condensation', 'gas → liquid', '[[adj:given out]]'],
            ['deposition', 'gas → solid', '[[adj:given out]]'],
          ],
        },
      ],
      lines: [
        { say: 'To move the particles apart, and let them move more freely, energy must be taken in to overcome the forces between them.' },
        { say: 'So melting, evaporation, boiling and sublimation take in energy: the orange arrows.', show: ['t.0', 't.1', 't.2'], focus: ['t.0', 't.1', 't.2'] },
        { say: 'When the particles come back together, the same energy is given out to the surroundings. So freezing, condensation and deposition give out energy: the blue arrows.', show: ['t.3', 't.4', 't.5'], focus: ['t.3', 't.4', 't.5'] },
      ],
    },
    {
      chapter: 'Everyday changes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ex',
          items: [
            'Droplets on a glass of iced water: **condensation**, giving out energy to the cold glass.',
            'The water left in the glass slowly disappears: **evaporation**.',
            'Dry ice, solid carbon dioxide ($\\ce{CO2}$), turns straight into a gas: **sublimation**.',
            'Frost forms on a cold surface straight from water vapour: **deposition**.',
          ],
        },
      ],
      lines: [
        { say: 'Now the glass of iced water. Water vapour in the air touches the cold glass, gives out energy to it, and condenses into droplets.', show: 'ex.0' },
        { say: 'And the water in the glass slowly evaporates, as the fastest particles at its surface escape into the air.', show: 'ex.1' },
        { say: 'Dry ice, solid carbon dioxide, sublimes: it turns straight into a gas without melting.', show: 'ex.2' },
        { say: 'Frost is the opposite: on a freezing night, water vapour turns straight into ice crystals on a cold surface, by deposition.', show: 'ex.3' },
      ],
    },
    {
      chapter: 'Dew on the grass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'On a cool morning, drops of dew form on the grass from the water vapour in the air. Name the change of state, and say whether energy is taken in or given out by the water.' },
        { kind: 'bullets', id: 'steps', items: ['The water starts as a gas (water vapour) and ends as a liquid (dew).', 'Gas → liquid is **condensation**.', 'The particles come closer together and move less freely, so energy is **given out**.'] },
      ],
      lines: [
        { say: 'On a cool morning, dew forms on the grass from the water vapour in the air. Name the change of state, and say whether energy is taken in or given out by the water.', show: 'q' },
        { say: 'First, find the starting and final states: the water starts as a gas and ends as a liquid.', show: 'steps.0' },
        { say: 'Gas to liquid is condensation.', show: 'steps.1' },
        { say: 'The particles come closer together and move less freely, so energy is given out.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Iodine crystals are warmed gently and give off a purple gas without melting. Name the change of state, and say whether the iodine takes in or gives out energy.',
          choices: ['Sublimation; energy is taken in.', 'Sublimation; energy is given out.', 'Evaporation; energy is taken in.', 'Deposition; energy is given out.'],
          answer: 0,
          working: 'Solid → gas without melting is sublimation. The particles end up far apart and moving freely, so energy is taken in.',
        },
      ],
      lines: [
        { say: 'Your turn. Iodine crystals are warmed gently, and give off a purple gas without melting. Name the change, and say whether the iodine takes in or gives out energy. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Solid to gas, without melting, is sublimation, and moving the particles apart takes in energy. Evaporation starts from a liquid, so C is wrong.', show: 'q.answer' },
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
            '**Melting** and **freezing**; **evaporation** or **boiling** and **condensation**.',
            '**Sublimation**: solid → gas. **Deposition**: gas → solid. Neither passes through the liquid state.',
            'Melting, evaporation, boiling and sublimation **take in** energy.',
            'Freezing, condensation and deposition **give out** energy.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Melting and freezing go between solid and liquid. Evaporation or boiling, and condensation, go between liquid and gas.', show: 'sum.0' },
        { say: 'Sublimation and deposition go straight between solid and gas.', show: 'sum.1' },
        { say: 'Melting, evaporation, boiling and sublimation take in energy.', show: 'sum.2' },
        { say: 'Freezing, condensation and deposition give it out. In part four, melting and boiling points tell you the state of a substance at any temperature. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
