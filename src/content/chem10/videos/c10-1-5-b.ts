import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-1-5-b',
  lessonId: 'c10-1-5',
  title: 'Lab Safety and Hazard Symbols, Part 2: Harm to People and the Environment',
  thumbnailTitle: 'Toxic, Corrosive or Harmful?',
  thumbnail: false,
  summary:
    'Five more hazard pictograms: corrosion (corrosive), skull and crossbones (acutely toxic), exclamation mark (harmful or irritant), health hazard (serious long-term harm) and environment (poisonous to water life). The exclamation mark warns of a less severe hazard than the skull. A methanol label shows the flame, the skull and the health hazard pictograms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 2', title: 'Harm to People and the Environment', subtitle: 'Five more pictograms' }],
      lines: [
        { say: 'A splash of one liquid can burn your skin. A few drops of another can kill if swallowed. Their labels have to tell them apart at a glance.', show: 'title' },
        { say: 'In this part, you will learn the five pictograms for harm to people and the environment, and read a real label.' },
      ],
    },
    {
      chapter: 'Five more pictograms',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Pictogram', 'What it shows', 'What it means'],
          rows: [
            ['corrosion', 'liquid eating a hand and a metal bar', '**corrosive**'],
            ['skull and crossbones', 'a skull and crossbones', '**acutely toxic**'],
            ['exclamation mark', 'an exclamation mark (!)', '**harmful** or **irritant**'],
            ['health hazard', 'a head and chest with a star-shaped burst', '**long-term** health hazard'],
            ['environment', 'a dead tree and a dead fish', 'harms **water life**'],
          ],
        },
      ],
      lines: [
        { say: 'The corrosion pictogram shows liquid dripping from two test tubes onto a hand and a metal bar, both being eaten away. A corrosive substance, such as a concentrated acid, destroys skin and metals on contact. Wear goggles and gloves, and wash off any splash at once.', show: 't.0', focus: 't.0' },
        { say: 'The skull and crossbones means acutely toxic. A toxic substance is a poison, and here even a small amount, swallowed, breathed in or absorbed through the skin, can kill. Methanol carries it. Avoid all contact.', show: 't.1', focus: 't.1' },
        { say: 'The exclamation mark means harmful or irritant: it irritates the skin, eyes or airways, or harms you in larger amounts. Keep it off your skin and out of your eyes.', show: 't.2', focus: 't.2' },
        { say: 'The health hazard pictogram shows a person’s head and chest, with a star-shaped burst on the chest. The substance may cause cancer, damage organs or cause breathing problems. Do not breathe in its dust or vapour.', show: 't.3', focus: 't.3' },
        { say: 'The environment pictogram shows a dead tree and a dead fish. The substance, such as copper two sulfate, is poisonous to fish and other water life, so never pour it down the sink.', caption: 'The environment pictogram shows a dead tree and a dead fish. The substance, such as copper(II) sulfate, is poisonous to fish and other water life, so never pour it down the sink.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Skull or exclamation mark?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The exclamation mark is not the skull', md: 'The exclamation mark warns of a **less** severe hazard. The skull and crossbones warns that even a **small** amount can kill. A bottle with no pictogram is not automatically harmless: read the label, and never taste or sniff to find out.' }],
      lines: [
        { say: 'Do not mix up these two. The exclamation mark warns of a less severe hazard: irritation, or harm from a larger amount. The skull and crossbones warns that even a small amount can kill.', show: 'oops' },
        { say: 'And a bottle with no pictogram is not automatically harmless. Still read the label, and never taste or sniff anything to find out.' },
      ],
    },
    {
      chapter: 'Reading a label',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A bottle of methanol shows three pictograms: a **flame**, a **skull and crossbones**, and a **head and chest with a star-shaped burst**. What hazards does it have?' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['Flame: **flammable**. Keep it away from flames and sparks.', 'Skull and crossbones: **acutely toxic**. Avoid all contact.', 'Health hazard: lasting harm, here to the eyes and nerves. Do not breathe in its vapour.', 'So: no flames nearby, gloves and goggles, and a fume cupboard.'],
        },
      ],
      lines: [
        { say: 'Now a real label. A bottle of methanol shows three pictograms: a flame, a skull and crossbones, and a person’s head and chest with a star-shaped burst. What hazards does methanol have?', show: 'q' },
        { say: 'The flame means methanol is flammable, so keep it away from flames and sparks.', show: 'steps.0' },
        { say: 'The skull and crossbones means it is acutely toxic: a small amount, swallowed or absorbed through the skin, can poison. Avoid all contact.', show: 'steps.1' },
        { say: 'The health hazard pictogram means it can cause lasting harm, here to the eyes and nerves. So: no flames nearby, gloves and goggles, and work in a fume cupboard.', show: ['steps.2', 'steps.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A label must warn that swallowing even a few drops of a liquid could kill. Which symbol should its red-bordered diamond show?',
          choices: ['an exclamation mark (!)', 'a dead tree and a dead fish', 'a skull and crossbones', 'a head and chest with a star-shaped burst'],
          answer: 2,
          working: 'The skull and crossbones pictogram means acutely toxic: a small amount can poison or kill. The exclamation mark warns of a less severe hazard.',
        },
      ],
      lines: [
        { say: 'Your turn. A label must warn that swallowing even a few drops of a liquid could kill. Which symbol should its red-bordered diamond show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the skull and crossbones, which means acutely toxic. Choice A, the exclamation mark, is the common mix-up: it warns of a less severe hazard.', show: 'q.answer' },
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
            'Corrosion: **corrosive**. Skull and crossbones: **acutely toxic**.',
            'Exclamation mark: **harmful or irritant**, less severe than the skull.',
            'Health hazard: **long-term harm**. Environment: **poisonous to water life**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The corrosion pictogram means corrosive, and the skull and crossbones means acutely toxic.', show: 'sum.0' },
        { say: 'The exclamation mark means harmful or irritant, a less severe hazard than the skull.', show: 'sum.1' },
        { say: 'The health hazard pictogram warns of long-term harm, and the environment pictogram of harm to water life. In part three, you will learn how to work safely in the laboratory. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
