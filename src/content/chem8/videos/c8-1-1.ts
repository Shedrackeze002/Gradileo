import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts): each box holds one kind of atom, at
// a temperature that makes it a solid, a liquid or a gas.

/** Three elements at room temperature: a solid, a liquid and a gas. */
const states: ParticlesEl = {
  kind: 'particles',
  id: 'e',
  boxes: [
    { id: 'fe', state: 'solid', n: 30, width: 8, height: 8, tone: 'hyp', label: 'iron: a solid' },
    { id: 'br', state: 'liquid', n: 30, width: 8, height: 8, tone: 'opp', label: 'bromine: a liquid' },
    { id: 'he', state: 'gas', n: 12, width: 8, height: 8, tone: 'good', label: 'helium: a gas' },
  ],
  clips: {},
  height: 380,
};

const video: Explainer = {
  id: 'c8-1-1',
  lessonId: 'c8-1-1',
  title: 'Atoms and Elements',
  thumbnail: 'syms',
  summary:
    'An atom is the smallest particle of an element, and an element contains only one kind of atom. There are about 118 elements, and none can be broken down by a chemical reaction. Each has a symbol: a capital letter, sometimes followed by a small letter. A few symbols come from Latin names, such as Na for sodium and Fe for iron.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Elements and Compounds', title: 'Atoms and Elements', subtitle: 'The building blocks, and their symbols' }],
      lines: [
        { say: 'The air you breathe, the water you drink and the screen you are watching are all built from tiny particles called atoms.', show: 'title' },
        { say: 'There are only about one hundred and eighteen kinds of atom, yet they combine to make millions of substances. In this video, you will meet atoms and elements, and the symbols chemists use to write them.' },
      ],
    },
    {
      chapter: 'Atoms and elements',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Atom and element', md: 'An **atom** is the smallest particle of an element.\n\nAn **element** is a substance made of only **one kind of atom**. It cannot be broken down by a chemical reaction.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not every substance is an element', md: 'Water and salt contain more than one kind of atom joined together, and air is a mixture of gases.' },
      ],
      lines: [
        { say: 'An atom is the smallest particle of an element. Atoms are far too small to see, even with an ordinary microscope. About ten million of them side by side would stretch just one millimetre.', show: 'def' },
        { say: 'An element is a substance made of only one kind of atom. Gold contains only gold atoms, and oxygen contains only oxygen atoms. No chemical reaction can break an element down into anything simpler.' },
        { say: 'So if you cut a gold ring in half, again and again, the smallest piece that is still gold is a single atom of gold.' },
        { say: 'Most elements are solids at room temperature, like iron and carbon. A few are gases, like oxygen and helium, and just two, mercury and bromine, are liquids.' },
        { say: 'Be careful: water, salt and air are not elements. Water and salt contain more than one kind of atom joined together, and air is a mixture of several gases.', show: 'oops' },
      ],
    },
    {
      chapter: 'Elements, up close',
      layout: 'center',
      main: [states],
      lines: [
        { say: 'Let’s look inside three elements. In each box, every particle is the same kind of atom: iron atoms on the left, bromine in the middle, and helium on the right.', show: ['e', 'e.labels'] },
        { say: 'Iron’s atoms are packed in rows and only vibrate, so iron is a solid. Bromine’s slide past one another, so it is a liquid.', focus: ['e.fe', 'e.br'] },
        { say: 'And helium’s atoms fly freely, far apart, so it is a gas. Three different states, but each one is a pure element, with just one kind of atom.', focus: 'e.he' },
      ],
    },
    {
      chapter: 'Chemical symbols',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'syms',
          head: ['Element', 'Symbol', 'Element', 'Symbol'],
          rows: [
            ['hydrogen', 'H', 'magnesium', 'Mg'],
            ['carbon', 'C', 'chlorine', 'Cl'],
            ['oxygen', 'O', 'calcium', 'Ca'],
          ],
        },
        {
          kind: 'table',
          id: 'latin',
          head: ['Element', 'Symbol', 'Latin name'],
          rows: [
            ['sodium', 'Na', 'natrium'],
            ['iron', 'Fe', 'ferrum'],
            ['gold', 'Au', 'aurum'],
          ],
        },
      ],
      lines: [
        { say: 'Every element has a chemical symbol of one or two letters, used by scientists all over the world. The first letter is always a capital, and a second letter, if there is one, is always small.', show: 'syms' },
        { say: 'Most symbols come from the English name. Hydrogen is capital H, carbon is capital C, and oxygen is capital O.', show: ['syms.0', 'syms.1', 'syms.2'], focus: 'syms.0' },
        { say: 'When two elements start with the same letter, a second letter tells them apart: magnesium is M g, chlorine is C l, and calcium is C a.', focus: 'syms.1' },
        { say: 'A few symbols come from old Latin names. Sodium is N a, from natrium. Iron is F e, from ferrum. And gold is A u, from aurum.', show: 'latin' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is written correctly as the symbol for a single element?',
          choices: ['CL', 'mg', 'Zn', 'CO'],
          answer: 2,
          working: 'A symbol is a capital letter, then a small letter if there is one. Zn is zinc. CO has two capitals, so it is two elements: carbon and oxygen.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is written correctly as the symbol for a single element? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Z n, with a capital Z and a small n, is zinc. C O has two capital letters, so it is two elements, carbon and oxygen, joined together.', show: 'q.answer' },
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
            'An **atom** is the smallest particle of an element.',
            'An **element** contains only one kind of atom.',
            'A **symbol** is a capital letter, sometimes with a small letter.',
            'Some symbols come from Latin: Na, K, Fe, Cu, Ag, Au, Pb.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An atom is the smallest particle of an element.', show: 'sum.0' },
        { say: 'An element contains only one kind of atom, and it cannot be broken down by a chemical reaction.', show: 'sum.1' },
        { say: 'Each element has a symbol: a capital letter, sometimes followed by a small letter.', show: 'sum.2' },
        { say: 'And a few symbols come from Latin names. Next, you will see what happens when atoms of different elements join.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
