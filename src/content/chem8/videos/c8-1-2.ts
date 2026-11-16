import { ATOM, hydrogenBurning } from '@/video/reactions.ts';
import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). Atoms joined into a molecule are held
// by bonds; in the reaction, molecules that hit hard enough swap partners.

const { H, O, C, Ne: NE } = ATOM;

/** Neon atoms, oxygen molecules and water molecules, side by side. */
const kinds: ParticlesEl = {
  kind: 'particles',
  id: 'm',
  boxes: [
    { id: 'ne', state: 'gas', width: 10, height: 8, temp: 0.8, kinds: [{ ...NE, n: 12 }], label: 'neon' },
    { id: 'o2', state: 'gas', width: 10, height: 8, temp: 0.8, kinds: [O], molecules: [{ atoms: [0, 0], n: 8 }], label: 'oxygen' },
    { id: 'w', state: 'gas', width: 10, height: 8, temp: 0.8, kinds: [O, H], molecules: [{ atoms: [0, 1, 1], n: 7, bent: true }], label: 'water' },
  ],
  clips: {},
  seed: 3,
  height: 400,
};

/** Hydrogen and oxygen, sparked, joining up as water. */
const burn: ParticlesEl = {
  kind: 'particles',
  id: 'r',
  boxes: [hydrogenBurning('b', { label: 'hydrogen and oxygen' })],
  clips: { spark: { phases: [{ dur: 1, heat: { b: 2 } }, { dur: 2 }, { dur: 1, heat: { b: 0.4 } }, { dur: 12 }] } },
  thermometers: true,
  seed: 3,
  height: 440,
};

/** Four boxes to read: atoms of an element, molecules of an element, a compound, and a mixture. */
const diagrams: ParticlesEl = {
  kind: 'particles',
  id: 'd',
  boxes: [
    { id: 'a', state: 'gas', width: 8, height: 7, temp: 0.8, kinds: [{ ...NE, n: 9 }], label: 'A' },
    { id: 'b', state: 'gas', width: 8, height: 7, temp: 0.8, kinds: [H], molecules: [{ atoms: [0, 0], n: 6 }], label: 'B' },
    { id: 'c', state: 'gas', width: 8, height: 7, temp: 0.8, kinds: [C, O], molecules: [{ atoms: [0, 1, 1], n: 5 }], label: 'C' },
    { id: 'd', state: 'gas', width: 8, height: 7, temp: 0.8, kinds: [O, { ...NE, n: 5 }], molecules: [{ atoms: [0, 0], n: 4 }], label: 'D' },
  ],
  clips: {},
  seed: 7,
  height: 300,
};

const video: Explainer = {
  id: 'c8-1-2',
  lessonId: 'c8-1-2',
  title: 'Compounds and Molecules',
  thumbnail: 'r',
  summary:
    'A compound is two or more elements chemically joined, and a molecule is a group of joined atoms. Some elements, such as oxygen gas, are made of molecules. A compound has its own properties, often nothing like its elements. In a particle diagram, identical particles mean one substance, and different particles mean a mixture.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Elements and Compounds', title: 'Compounds and Molecules', subtitle: 'When atoms of different elements join' }],
      lines: [
        { say: 'Sodium is a soft metal that fizzes violently in water. Chlorine is a poisonous green gas. Yet when they join, they make the salt you sprinkle on your food.', show: 'title' },
        { say: 'In this video, you will find out what compounds and molecules are, and how to read the particle diagrams chemists draw.' },
      ],
    },
    {
      chapter: 'Compounds and molecules',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Compound and molecule', md: 'A **compound** is two or more elements **chemically joined** together.\n\nA **molecule** is a group of two or more atoms joined together.' }],
      lines: [
        { say: 'A compound is a substance made of two or more elements chemically joined together. The atoms are held together by chemical bonds.', show: 'def' },
        { say: 'A molecule is a group of two or more atoms joined together. Let’s look at some up close.' },
      ],
    },
    {
      chapter: 'Atoms and molecules up close',
      layout: 'center',
      main: [kinds, { kind: 'callout', id: 'o2', tone: 'key', title: 'Molecules can be elements', md: 'What matters is how many **kinds** of atom are joined, not whether the atoms are joined.' }],
      lines: [
        { say: 'Here are three gases, drawn as particles. In neon, each particle is a single atom, and every atom is the same kind, so neon is an element.', show: ['m', 'm.labels'], focus: 'm.ne' },
        { say: 'In oxygen gas, each particle is a molecule of two oxygen atoms joined together. There is still only one kind of atom, so oxygen gas is an element too.', focus: 'm.o2' },
        { say: 'In water, each molecule is one red oxygen atom joined to two yellow hydrogen atoms. Two kinds of atom are chemically joined, so water is a compound.', focus: 'm.w' },
        { say: 'So being made of molecules does not make a substance a compound. What matters is how many kinds of atom are joined together.', show: 'o2' },
      ],
    },
    {
      chapter: 'New properties',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'props',
          head: ['Elements', 'Their properties', 'Compound', 'Its properties'],
          rows: [
            ['sodium + chlorine', 'reactive metal, poisonous gas', 'sodium chloride', 'white solid, safe to eat'],
            ['hydrogen + oxygen', 'gases; hydrogen burns', 'water', 'liquid that puts out fires'],
          ],
        },
      ],
      lines: [
        { say: 'A compound has its own properties, often nothing like those of the elements it is made from.', show: 'props' },
        { say: 'Sodium is a reactive metal and chlorine is a poisonous gas, but sodium chloride is a white solid that is safe to eat in small amounts.', show: 'props.0', focus: 'props.0' },
        { say: 'Hydrogen is a gas that burns, and oxygen helps things burn. Yet together they make water, a liquid that puts fires out.', show: 'props.1', focus: 'props.1' },
      ],
    },
    {
      chapter: 'Making a compound',
      layout: 'center',
      main: [burn],
      lines: [
        { say: 'Let’s watch hydrogen and oxygen join. Here is a mix of hydrogen molecules, in yellow, and oxygen molecules, in red. At room temperature, nothing happens: the molecules bounce off one another.', show: ['r', 'r.labels', 'r.thermo'] },
        { say: 'Now a spark heats the mix. Molecules that hit hard enough break apart, and their atoms join up in a new way, as water molecules. Each time, heat is given out, which keeps the rest reacting.', play: 'r.spark', show: 'r.tally' },
        { say: 'No atoms were made or lost. They were only joined differently, and the new substance, water, is nothing like the two gases it came from.' },
      ],
    },
    {
      chapter: 'Particle diagrams',
      layout: 'center',
      main: [
        diagrams,
        {
          kind: 'bullets',
          id: 'qs',
          items: [
            '**Are all the particles the same?** Yes: one substance. No: a **mixture**.',
            '**How many kinds of atom in each particle?** One: an **element**. Two or more: a **compound**.',
          ],
        },
      ],
      lines: [
        { say: 'In a particle diagram, each atom is drawn as a circle, and atoms that are joined touch. You can read any diagram with two questions.', show: ['d', 'd.labels', 'qs'] },
        { say: 'First, are all the particles the same? If they are, the box holds one pure substance. If there are different kinds of particle, it is a mixture.', show: 'qs.0', focus: 'qs.0' },
        { say: 'In boxes A, B and C, every particle is the same, so each holds one substance. Box D has two different particles, neon atoms and oxygen molecules, so it is a mixture.', focus: 'd.d' },
        { say: 'Second, how many kinds of atom does each particle have? One kind means an element. Two or more kinds joined together means a compound.', show: 'qs.1', focus: 'qs.1' },
        { say: 'So A, single neon atoms, and B, hydrogen molecules, are elements. In C, carbon and oxygen atoms are joined, so it is a compound: carbon dioxide.', focus: ['d.a', 'd.b', 'd.c'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box holds identical particles. Each is one carbon atom joined to two oxygen atoms. What does it show?',
          choices: ['a compound', 'an element', 'a mixture of two elements', 'a mixture of three substances'],
          answer: 0,
          working: 'All the particles are the same, so it is one substance. Each has two kinds of atom joined, so it is a compound: carbon dioxide.',
        },
      ],
      lines: [
        { say: 'Your turn. A box holds identical particles, and each one is one carbon atom joined to two oxygen atoms. What does the box show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. All the particles are the same, so it is one substance, and each has two kinds of atom joined, so it is a compound: carbon dioxide.', show: 'q.answer' },
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
            'A **compound** has two or more elements chemically joined.',
            'A **molecule** is a group of joined atoms; some elements are molecules.',
            'A compound has properties of its own.',
            'Identical particles: one substance. Different particles: a mixture.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A compound has two or more elements chemically joined.', show: 'sum.0' },
        { say: 'A molecule is a group of joined atoms, and some elements, like oxygen gas, are made of molecules.', show: 'sum.1' },
        { say: 'A compound has its own properties, often nothing like its elements.', show: 'sum.2' },
        { say: 'And in a particle diagram, identical particles mean one substance, while different particles mean a mixture. Next, you will compare compounds and mixtures.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
