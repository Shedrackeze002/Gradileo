import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { energyFlow } from './lib/c10-4-figures.ts';

// Energy flowing out of a reaction (exothermic) and into one (endothermic).
const flow = figure(
  'f',
  [
    energyFlow({ name: 'exo', out: true, title: '\\text{exothermic}', note: '\\text{surroundings warm up}' }),
    energyFlow({ name: 'endo', at: [8.4, 0], out: false, title: '\\text{endothermic}', note: '\\text{surroundings cool down}' }),
  ],
  420,
);

const video: Explainer = {
  id: 'c10-4-4',
  lessonId: 'c10-4-4',
  title: 'Energy in Reactions, Part 1: Exothermic and Endothermic',
  thumbnailTitle: 'Exothermic and Endothermic',
  thumbnail: 'f',
  summary:
    'An exothermic change gives out energy to its surroundings, which get warmer, and its energy change is negative. An endothermic change takes energy in, so the surroundings get colder (or energy must be supplied), and its energy change is positive. The temperature change is the final temperature minus the initial temperature.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 1', title: 'Exothermic and Endothermic', subtitle: 'Energy out, energy in' }],
      lines: [
        { say: 'Snap a hand warmer, and it soon feels hot. Squeeze an instant cold pack, and it turns icy. Energy moves in both, but in opposite directions.', show: 'title' },
        { say: 'In this lesson, you will classify changes as exothermic or endothermic, explain them with bonds, and read energy level diagrams. This first part classifies a change from its temperature.' },
      ],
    },
    {
      chapter: 'Energy out, energy in',
      layout: 'center',
      main: [flow],
      lines: [
        { say: 'Chemists split the world in two. The system is the reacting substances. The surroundings are everything else: the water they are dissolved in, the container, the thermometer and the air.', show: ['f.exo-box', 'f.endo-box'] },
        { say: 'An exothermic change gives out energy to its surroundings, usually as heat. The surroundings get warmer, so the temperature of the mixture rises.', show: ['f.exo-arrows', 'f.exo-title', 'f.exo-note'], focus: 'f.exo-arrows' },
        { say: 'An endothermic change takes in energy from its surroundings. The surroundings get colder, so the temperature falls, or the change keeps going only while energy is supplied: by heating, light or electricity.', show: ['f.endo-arrows', 'f.endo-title', 'f.endo-note'], focus: 'f.endo-arrows' },
      ],
    },
    {
      chapter: 'Everyday examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Exothermic', 'Endothermic'],
          rows: [
            ['burning fuels (combustion)', 'photosynthesis (takes in light)'],
            ['respiration in living cells', 'thermal decomposition, such as heating calcium carbonate'],
            ['neutralization of an acid by an alkali', 'splitting water with an electric current'],
            ['a metal reacting with an acid', 'citric acid reacting with sodium hydrogen carbonate'],
            ['a hand warmer: iron reacting with oxygen', 'an instant cold pack: a solid dissolving in water'],
          ],
        },
      ],
      lines: [
        { say: 'Burning fuels, respiration, neutralizing an acid with an alkali, a metal reacting with an acid, and a hand warmer all give out energy. They are exothermic.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
        { say: 'Photosynthesis takes in light, and heating calcium carbonate or splitting water need energy supplied all the time. A cold pack gets cold. These are endothermic.' },
      ],
    },
    {
      chapter: 'The sign of the energy change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Energy change', md: 'The energy the **system gains**: **negative** for an exothermic reaction, which loses energy to its surroundings, and **positive** for an endothermic one.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-890\\ \\text{kJ} \\ \\text{means}\\ 890\\ \\text{kJ is given out}'] },
      ],
      lines: [
        { say: 'The energy change of a reaction is the energy the system gains. An exothermic reaction loses energy, so its energy change is negative. An endothermic reaction gains energy, so its energy change is positive.', show: 'k' },
        { say: 'So an energy change of negative 890 kilojoules means that 890 kilojoules is given out.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Reading a thermometer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{temperature change} = \\text{final temperature} - \\text{initial temperature}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Mixture', 'Temperatures', 'Change', 'Type'],
          rows: [
            ['citric acid and sodium hydrogen carbonate', '$21.0^\\circ\\text{C} \\to 14.5^\\circ\\text{C}$', '$-6.5^\\circ\\text{C}$', 'endothermic'],
            ['hydrochloric acid and sodium hydroxide', '$19.5^\\circ\\text{C} \\to 26.3^\\circ\\text{C}$', '$+6.8^\\circ\\text{C}$', 'exothermic'],
          ],
        },
      ],
      lines: [
        { say: 'Record the temperature before mixing, and the highest or lowest temperature after. A polystyrene cup with a lid keeps heat from leaking in or out.', show: 'f' },
        { say: 'Sodium hydrogen carbonate is stirred into citric acid, and the temperature falls from 21.0 to 14.5 degrees Celsius: a change of negative 6.5 degrees. Energy is taken in, so the reaction is endothermic.', show: 't.0', focus: 't.0' },
        { say: 'In a neutralization, the temperature rises from 19.5 to 26.3 degrees Celsius: 26.3 minus 19.5 is positive 6.8 degrees. The mixture got warmer, so it is exothermic.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Cold is not given out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cold is not “taking in cold”', md: 'An endothermic mixture feels cold because it takes heat **from** your hand and everything around it. Nothing called “cold” is given out.' }],
      lines: [
        { say: 'An endothermic mixture feels cold because it is taking heat from your hand, and from everything around it. Nothing called cold is given out.', show: 'oops' },
        { say: 'So always describe the energy flow: into the system for endothermic, and out of the system for exothermic.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two solutions are mixed in a polystyrene cup. A thermometer reads $22.4^\\circ\\text{C}$ at the start and $17.9^\\circ\\text{C}$ at the end. Find the temperature change and classify the change.',
          choices: ['$+4.5^\\circ\\text{C}$, exothermic', '$-4.5^\\circ\\text{C}$, exothermic', '$+4.5^\\circ\\text{C}$, endothermic', '$-4.5^\\circ\\text{C}$, endothermic'],
          answer: 3,
          working: '$17.9 - 22.4 = -4.5^\\circ\\text{C}$. The temperature fell, so energy was taken in: endothermic.',
        },
      ],
      lines: [
        { say: 'Your turn. Two solutions are mixed in a polystyrene cup. A thermometer reads 22.4 degrees Celsius at the start, and 17.9 at the end. Find the temperature change, and classify the change. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Final minus initial is 17.9 minus 22.4, or negative 4.5 degrees. The temperature fell, so energy was taken in: endothermic. Choice C has the right type, but the wrong sign.', show: 'q.answer' },
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
            '**Exothermic:** energy given out; the surroundings get warmer; the energy change is negative.',
            '**Endothermic:** energy taken in; the surroundings get colder; the energy change is positive.',
            'Temperature change $=$ final $-$ initial: a rise is exothermic, a fall endothermic.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An exothermic change gives out energy, the surroundings get warmer, and the energy change is negative.', show: 'sum.0' },
        { say: 'An endothermic change takes energy in, the surroundings get colder, and the energy change is positive.', show: 'sum.1' },
        { say: 'Temperature change is final minus initial. In part two, you will see why with bonds, and draw energy level diagrams. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
