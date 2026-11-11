import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-1-2',
  lessonId: 'c8-1-2',
  title: 'Compounds and Molecules',
  thumbnail: 'props',
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
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Compound and molecule', md: 'A **compound** is two or more elements **chemically joined** together.\n\nA **molecule** is a group of two or more atoms joined together.' },
        { kind: 'callout', id: 'o2', tone: 'key', title: 'Oxygen gas is still an element', md: 'Each molecule is two oxygen atoms, $\\ce{O2}$. There is only one kind of atom.' },
      ],
      lines: [
        { say: 'A compound is a substance made of two or more elements chemically joined together. The atoms are held together by chemical bonds.', show: 'def' },
        { say: 'A molecule is a group of two or more atoms joined together. Each water molecule is two hydrogen atoms joined to one oxygen atom, so water is a compound.' },
        { say: 'But molecules can be elements too. Oxygen gas is made of molecules of two oxygen atoms. Because there is only one kind of atom, oxygen gas is still an element.', show: 'o2' },
        { say: 'So being made of molecules does not make a substance a compound. What matters is how many kinds of atom it has.' },
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
      chapter: 'Particle diagrams',
      layout: 'center',
      main: [
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
        { say: 'In a particle diagram, each atom is drawn as a circle, and atoms that are joined touch. You can read any diagram with two questions.', show: 'qs' },
        { say: 'First, are all the particles the same? If they are, the box holds one pure substance. If there are different kinds of particle, it is a mixture.', show: 'qs.0', focus: 'qs.0' },
        { say: 'Second, how many kinds of atom does each particle have? One kind means an element. Two or more kinds joined together means a compound.', show: 'qs.1', focus: 'qs.1' },
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
