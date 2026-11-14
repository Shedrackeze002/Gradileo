import type { AtomsEl, Explainer } from '@/video/script.ts';

// The atoms here are drawn by src/video/atoms.ts: electrons circle in shells, and a clip adds
// them one by one, filling each shell before the next.

/** Carbon and sodium, empty, to be filled. */
const first: AtomsEl = {
  kind: 'atoms',
  id: 'f',
  span: [12, 6.6],
  atoms: [
    { id: 'c', symbol: 'C', protons: 6, electrons: 0, at: [3, 3.3], tone: 'adj', name: 'carbon' },
    { id: 'na', symbol: 'Na', protons: 11, electrons: 0, at: [8.8, 3.3], tone: 'brand', name: 'sodium' },
  ],
  clips: {
    carbon: { phases: [{ dur: 1.6, fill: { c: 2 } }, { dur: 2.4, fill: { c: 6 } }] },
    sodium: { phases: [{ dur: 1.4, fill: { na: 2 } }, { dur: 3.6, fill: { na: 10 } }, { dur: 1.2, fill: { na: 11 } }] },
  },
  poster: 'sodium',
  height: 460,
};

/** Aluminium, chlorine and calcium, each filled in turn. */
const more: AtomsEl = {
  kind: 'atoms',
  id: 'm',
  span: [19, 6.4],
  atoms: [
    { id: 'al', symbol: 'Al', protons: 13, electrons: 0, at: [3, 3.2], tone: 'hyp', name: 'aluminium' },
    { id: 'cl', symbol: 'Cl', protons: 17, electrons: 0, at: [9.3, 3.2], tone: 'good', name: 'chlorine' },
    { id: 'ca', symbol: 'Ca', protons: 20, electrons: 0, at: [15.9, 3.2], tone: 'theta', name: 'calcium' },
  ],
  clips: {
    al: { phases: [{ dur: 0.8, fill: { al: 2 } }, { dur: 2, fill: { al: 10 } }, { dur: 1, fill: { al: 13 } }] },
    cl: { phases: [{ dur: 0.8, fill: { cl: 2 } }, { dur: 1.6, fill: { cl: 10 } }, { dur: 1.6, fill: { cl: 17 } }] },
    ca: { phases: [{ dur: 0.8, fill: { ca: 2 } }, { dur: 1.6, fill: { ca: 10 } }, { dur: 1.6, fill: { ca: 18 } }, { dur: 1, fill: { ca: 20 } }] },
  },
  height: 460,
};

/** Group 1: lithium, sodium and potassium, each with one outer electron. */
const group: AtomsEl = {
  kind: 'atoms',
  id: 'g',
  span: [17, 6.4],
  atoms: [
    { id: 'li', symbol: 'Li', protons: 3, at: [2.2, 3.2], tone: 'bad', name: 'lithium' },
    { id: 'na', symbol: 'Na', protons: 11, at: [7.6, 3.2], tone: 'brand', name: 'sodium' },
    { id: 'k', symbol: 'K', protons: 19, at: [13.9, 3.2], tone: 'adj', name: 'potassium' },
  ],
  clips: {},
  height: 420,
};

const video: Explainer = {
  id: 'c9-1-3',
  lessonId: 'c9-1-3',
  title: 'Electron Arrangements',
  thumbnail: 'f',
  summary:
    'For the first 20 elements, shells hold 2, then 8, then 8 electrons, filling from the inside out. The number of shells gives the period and the number of outer electrons gives the group. Elements in a group have the same number of outer electrons, so they react alike, and full outer shells make the noble gases unreactive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic Structure', title: 'Electron Arrangements', subtitle: 'How electrons fill their shells' }],
      lines: [
        { say: 'Why is sodium so like potassium, and why do the noble gases refuse to react?', show: 'title' },
        { say: 'The answer is in how an atom’s electrons are arranged. In this video, you will learn to write electron arrangements, and see how they explain the periodic table.' },
      ],
    },
    {
      chapter: 'Filling the shells',
      layout: 'split',
      leftWidth: 400,
      left: [{ kind: 'callout', id: 'rule', tone: 'definition', title: 'Shells fill from the inside out', md: 'First shell: up to **2**.\n\nSecond: up to **8**.\n\nThird: up to **8**.\n\nThen the fourth.' }],
      right: [first],
      lines: [
        { say: 'Electrons occupy shells around the nucleus. For the first twenty elements, the first shell holds up to two electrons, the second up to eight, and the third up to eight. Any more go into the fourth.', show: ['rule', 'f', 'f.labels'] },
        { say: 'Carbon has six electrons. The first two fill the first shell, and the other four go into the second. We write that as two, four.', play: 'f.carbon', show: 'f.arrangement', focus: 'f.c' },
        { say: 'Sodium has eleven. Two fill the first shell, eight fill the second, and the one left over starts a third shell. So sodium is two, eight, one.', play: 'f.sodium', focus: 'f.na' },
      ],
    },
    {
      chapter: 'More arrangements',
      layout: 'center',
      main: [more],
      lines: [
        { say: 'Aluminium has thirteen electrons: two, eight, and three in the third shell.', show: ['m', 'm.labels', 'm.arrangement'], play: 'm.al', focus: 'm.al' },
        { say: 'Chlorine has seventeen: two, eight, seven.', play: 'm.cl', focus: 'm.cl' },
        { say: 'And calcium, with twenty, fills the third shell with eight, then starts a fourth: two, eight, eight, two. A quick check: the numbers always add up to the atomic number.', play: 'm.ca', focus: 'm.ca' },
      ],
    },
    {
      chapter: 'Shells and the periodic table',
      layout: 'split',
      leftWidth: 420,
      left: [
        { kind: 'callout', id: 'per', tone: 'key', title: 'Period', md: 'The number of **occupied shells**.' },
        { kind: 'callout', id: 'grp', tone: 'key', title: 'Group', md: 'From the number of **outer electrons**: 1 → group 1, 2 → group 2, 3 to 8 → groups 13 to 18.' },
      ],
      right: [group],
      lines: [
        { say: 'An electron arrangement tells you where an element sits in the periodic table. The number of occupied shells is the period. Sodium has three shells, so it is in period three.', show: ['per', 'g', 'g.labels', 'g.arrangement'], focus: 'g.na' },
        { say: 'The number of outer electrons gives the group. Lithium, sodium and potassium each have one outer electron, so they are all in group one. One outer electron means group one, two means group two, and three to eight mean groups thirteen to eighteen.', show: 'grp', focus: ['g.li', 'g.na', 'g.k'] },
        { say: 'Reactions involve the outer electrons. Elements in the same group have the same number of outer electrons, so they react in similar ways. The noble gases have full outer shells, which are very stable, so they hardly react at all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An element has the arrangement 2, 8, 6. Which group and period is it in?',
          choices: ['group 16, period 3', 'group 6, period 2', 'group 3, period 6', 'group 18, period 3'],
          answer: 0,
          working: 'Three shells, so period 3. Six outer electrons, so group 16. It is sulfur.',
        },
      ],
      lines: [
        { say: 'Your turn. An element has the arrangement two, eight, six. Which group and period is it in? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It has three shells, so it is in period three. Six outer electrons put it in group sixteen. It is sulfur.', show: 'q.answer' },
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
            'Shells hold 2, then 8, then 8, filling from the inside out.',
            'Number of shells = **period**.',
            'Number of outer electrons gives the **group**.',
            'Same outer electrons, similar reactions; full shells are stable.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For the first twenty elements, shells hold two, then eight, then eight electrons, filling from the inside out.', show: 'sum.0' },
        { say: 'The number of shells gives the period.', show: 'sum.1' },
        { say: 'The number of outer electrons gives the group.', show: 'sum.2' },
        { say: 'And elements with the same number of outer electrons react alike, while full outer shells make the noble gases unreactive. Next, you will see atoms lose and gain electrons to become ions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
