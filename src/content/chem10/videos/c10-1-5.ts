import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hazardFrame } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-5',
  lessonId: 'c10-1-5',
  title: 'Lab Safety and Hazard Symbols, Part 1: Hazard Pictograms',
  thumbnailTitle: 'Hazard Pictograms',
  thumbnail: 'hz',
  summary:
    'Hazardous chemicals carry GHS hazard pictograms: black symbols on white inside red-bordered diamonds, one for each kind of hazard, with the signal word Danger or Warning. The flame means flammable, the flame over a circle an oxidizer, the exploding bomb explosive, and the gas cylinder a gas under pressure. A safety data sheet gives the full hazards of a chemical.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 1', title: 'Hazard Pictograms', subtitle: 'Fire, explosions and pressure' }],
      lines: [
        { say: 'Chemists work every day with substances that can burn, poison, explode or eat through metal, and accidents are rare. That is not luck: it comes from knowing exactly what each substance can do.', show: 'title' },
        { say: 'In this part, you will see how chemical labels warn of hazards, and learn the four pictograms for fire, explosions and pressure. Part two covers the other five.' },
      ],
    },
    {
      chapter: 'The red diamond',
      layout: 'split',
      leftWidth: 560,
      left: [figure('hz', [hazardFrame()])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hazard pictogram', md: 'A symbol on a chemical’s label that shows, at a glance, what kind of harm the substance can do. A label shows **one for each kind of hazard**.' },
        { kind: 'text', id: 'signal', size: 'md', align: 'left', md: 'Signal word: **Danger** for more severe hazards, **Warning** for less severe ones.' },
      ],
      lines: [
        { say: 'Most countries label hazardous chemicals with the same set of symbols, from the Globally Harmonized System, or G H S.', caption: 'Most countries label hazardous chemicals with the same set of symbols, from the Globally Harmonized System, or GHS.' },
        { say: 'Each hazard pictogram is a black symbol on a white background, inside a red-bordered diamond: a square standing on one corner.', show: ['hz', 'def'] },
        { say: 'A pictogram shows, at a glance, what kind of harm the substance can do. A label shows one pictogram for each kind of hazard, so a bottle may carry two or three.' },
        { say: 'The label also gives a signal word: Danger for the more severe hazards, or Warning for the less severe ones, and statements describing the hazards and the precautions to take.', show: 'signal' },
      ],
    },
    {
      chapter: 'Fire, explosion and pressure',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Pictogram', 'What it shows', 'What it means'],
          rows: [
            ['flame', 'a flame', '**flammable**: catches fire easily'],
            ['flame over circle', 'a flame above a circle', '**oxidizer**: makes things burn fiercely'],
            ['exploding bomb', 'a bomb bursting apart', '**explosive**'],
            ['gas cylinder', 'a gas cylinder', '**gas under pressure**'],
          ],
        },
      ],
      lines: [
        { say: 'The flame pictogram means the substance is flammable: it catches fire easily, like ethanol, hexane and methane. Keep it away from flames, sparks and hot surfaces.', show: 't.0', focus: 't.0' },
        { say: 'The flame over circle shows a flame above a circle. It marks an oxidizer, such as potassium nitrate. An oxidizer does not need to burn itself, but it releases oxygen that makes other materials burn faster and hotter. Store it away from paper, fuels and anything that burns.', show: 't.1', focus: 't.1' },
        { say: 'The exploding bomb shows a bomb bursting apart. The substance can explode if it is heated, struck or rubbed, like fireworks. Never heat, grind or strike it.', show: 't.2', focus: 't.2' },
        { say: 'The gas cylinder marks a gas under pressure, such as a cylinder of oxygen or carbon dioxide. The container may burst if heated, so keep it upright, secured, and away from heat.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Safety data sheets',
      layout: 'center',
      main: [{ kind: 'callout', id: 'sds', tone: 'definition', title: 'Safety data sheet (SDS)', md: 'Supplied with every hazardous chemical: its hazards, and full instructions for **using**, **storing** and **disposing** of it safely, and for **first aid**.' }],
      lines: [
        { say: 'A label gives the hazards at a glance. For the full story, every hazardous chemical comes with a safety data sheet, or S D S.', caption: 'A label gives the hazards at a glance. For the full story, every hazardous chemical comes with a safety data sheet, or SDS.', show: 'sds' },
        { say: 'The sheet describes the chemical’s hazards, and gives full instructions for using, storing and disposing of it safely, and for first aid. Your teacher checks it before an experiment is planned.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A chemical label shows a hazard pictogram: a red-bordered diamond containing a flame above a circle. What does it warn you about?',
          choices: [
            'Flammable: it catches fire easily.',
            'Oxidizer: it gives off oxygen and can make other materials burn fiercely.',
            'Explosive: it can explode if heated, struck or rubbed.',
            'Gas under pressure: the container may burst if heated.',
          ],
          answer: 1,
          working: 'The flame over circle pictogram marks an oxidizer: it gives off oxygen and makes other materials burn faster and hotter.',
        },
      ],
      lines: [
        { say: 'Your turn. A chemical label shows a red-bordered diamond containing a flame above a circle. What does it warn you about? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: it marks an oxidizer, which makes other materials burn fiercely. Choice A is tempting, but a flame on its own is the flammable pictogram. The circle under the flame makes it an oxidizer.', show: 'q.answer' },
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
            'Hazard pictograms: black symbols in red-bordered diamonds, one for each kind of hazard.',
            'Flame: **flammable**. Flame over circle: **oxidizer**.',
            'Exploding bomb: **explosive**. Gas cylinder: **gas under pressure**.',
            'A **safety data sheet** gives the full hazards and how to handle a chemical safely.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hazard pictograms are black symbols in red-bordered diamonds, one for each kind of hazard.', show: 'sum.0' },
        { say: 'The flame means flammable, and the flame over a circle means an oxidizer.', show: 'sum.1' },
        { say: 'The exploding bomb means explosive, and the gas cylinder means a gas under pressure.', show: 'sum.2' },
        { say: 'And a safety data sheet gives the full hazards of a chemical. In part two, you will learn the pictograms for harm to people and the environment. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
