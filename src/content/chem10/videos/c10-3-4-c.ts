import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { graphite, metal } from './lib/c10-3-figures.ts';

// One layer of graphite: each carbon joined to three others, with electrons free to move.
const layer = figure('gr', [graphite({ cols: 4, rows: 3 })], 460);

// A metal: positive ions in a sea of moving electrons.
const copper = figure('met', [metal({ cols: 5, rows: 4 })], 440);

const video: Explainer = {
  id: 'c10-3-4-c',
  lessonId: 'c10-3-4',
  title: 'Bonding and Properties, Part 3: Graphite and Metals',
  thumbnailTitle: 'Graphite and Metals',
  thumbnail: 'met',
  summary:
    'Graphite is giant covalent, but each carbon atom bonds to only three others in flat layers, so its fourth electron is free to move and graphite conducts; its layers slide. Metallic bonding is the attraction between positive metal ions and a sea of moving electrons, so metals conduct as solids and when molten, are malleable, usually have high melting points and do not dissolve.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 3', title: 'Graphite and Metals', subtitle: 'Electrons that are free to move' }],
      lines: [
        { say: 'Electrical wires are made of copper, and the graphite in a pencil leaves a mark on paper. Both have electrons that are free to move.', show: 'title' },
        { say: 'In this part, you will see why graphite is the exception among giant covalent structures, and how metallic bonding explains the properties of metals. Then you will compare all four structures.' },
      ],
    },
    {
      chapter: 'Graphite',
      layout: 'split',
      leftWidth: 560,
      left: [layer],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Flat layers: each carbon atom is bonded to only **three** others.', 'The fourth outer electron is free to move along the layer: graphite **conducts**.', 'The layers are held to each other only weakly, so they **slide**.'],
        },
      ],
      lines: [
        { say: 'Graphite, the lead in a pencil, is also pure carbon. Its atoms form flat layers, in which each carbon atom is bonded to only three others.', show: ['gr.bonds', 'gr.atoms', 'b.0'] },
        { say: 'The fourth outer electron of every atom is free to move along the layer. So graphite conducts electricity.', show: ['gr.free', 'b.1'], focus: 'gr.free' },
        { say: 'The layers are held to each other only weakly, so they slide apart, and leave a mark on paper.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Metallic bonding',
      layout: 'split',
      leftWidth: 560,
      left: [copper],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Metallic bonding', md: 'The attraction between the **positive metal ions** and a **sea of electrons** that move freely through the whole metal.' }],
      lines: [
        { say: 'In a metal, the atoms give up their outer electrons into a sea of electrons, which move freely through the whole metal. What is left of each atom is a positive ion.', show: ['met.ions', 'met.sea'] },
        { say: 'Metallic bonding is the attraction between the positive metal ions and this sea of shared, moving electrons.', show: 'def', focus: 'met.sea' },
      ],
    },
    {
      chapter: 'Properties of metals',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Conduct** as solids and when molten: the free electrons carry the current.',
            '**Malleable:** layers of ions slide over each other, and the sea of electrons still holds them.',
            '**Usually high melting points:** iron melts at about 1540\u00a0°C, but mercury is a liquid at room temperature.',
            '**Insoluble in water**, though a few very reactive metals, such as sodium, react with it.',
          ],
        },
      ],
      lines: [
        { say: 'Metals conduct as solids and when molten, because the free electrons carry the current. That is why copper and aluminium are used for electrical wires.', show: 'b.0' },
        { say: 'Metals are malleable. Layers of metal ions can slide over each other without the metal breaking, because the sea of electrons still holds them together. So metals can be hammered into sheets and drawn into wires.', show: 'b.1' },
        { say: 'The attraction between the ions and the electron sea is strong, so melting points are usually high. Iron melts at about one thousand five hundred and forty degrees Celsius, though mercury is a liquid at room temperature.', show: 'b.2' },
        { say: 'And metals do not dissolve in water, although a few very reactive ones, such as sodium, react with it.', show: 'b.3' },
      ],
    },
    {
      chapter: 'All four structures',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Ionic', 'Simple molecular', 'Giant covalent', 'Metallic'],
          rows: [
            ['Particles', 'ions in a lattice', 'small molecules', 'atoms in a network', 'ions in a sea of electrons'],
            ['Melting point', 'high', 'low', 'very high', 'usually high'],
            ['Conducts as a solid?', 'no', 'no', 'no (except graphite)', 'yes'],
            ['Conducts when molten?', 'yes', 'no', 'no', 'yes'],
            ['Dissolves in water?', 'often; the solution conducts', 'some; the solution does not conduct', 'no', 'no'],
            ['Examples', '$\\ce{NaCl}$, $\\ce{MgO}$', '$\\ce{H2O}$, $\\ce{CO2}$, $\\ce{I2}$', 'diamond, $\\ce{SiO2}$', '$\\ce{Cu}$, $\\ce{Fe}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all four structures side by side: the particles each is made of, and their properties.', show: ['t.0', 't.5'] },
        { say: 'Ionic, giant covalent and most metallic substances have high melting points. Only simple molecular substances have low ones.', show: 't.1', focus: 't.1' },
        { say: 'Only metals, and graphite, conduct as solids. Ionic compounds conduct when molten, and simple molecular and giant covalent substances never do.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Many ionic compounds dissolve, and their solutions conduct. Some molecular substances dissolve, but the solutions do not conduct.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why can a metal be hammered into shape, while an ionic crystal shatters?',
          choices: [
            'Metal atoms are softer than ions.',
            'Metal layers slide and the sea of electrons still holds them; sliding an ionic crystal brings like charges together.',
            'Metals have weak bonds, while ionic bonds are too strong to bend.',
            'Ionic crystals contain free electrons that make them brittle.',
          ],
          answer: 1,
          working: 'In a metal, the electron sea holds the ions wherever the layers slide. In an ionic crystal, sliding puts ions of the same charge face to face, and they repel.',
        },
      ],
      lines: [
        { say: 'Your turn. Why can a metal be hammered into shape, while an ionic crystal shatters? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. When layers of metal ions slide, the sea of electrons still holds them together. When layers of an ionic crystal slide, ions of the same charge meet and repel. Choice D is wrong: ionic crystals have no free electrons.', show: 'q.answer' },
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
            'Graphite: layers in which each carbon bonds to three others; free electrons, so it conducts.',
            '**Metallic bonding:** positive metal ions in a sea of moving electrons.',
            'Metals conduct as solids and when molten, are malleable, and usually melt at high temperatures.',
            'Only metals and graphite conduct as solids.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In graphite, each carbon atom bonds to only three others, so it has free electrons and conducts.', show: 'sum.0' },
        { say: 'Metallic bonding is the attraction between positive metal ions and a sea of moving electrons.', show: 'sum.1' },
        { say: 'So metals conduct as solids and when molten, they are malleable, and their melting points are usually high.', show: 'sum.2' },
        { say: 'Only metals and graphite conduct as solids. In part four, you will use test results to identify a structure. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
