import type { AtomsEl, Explainer } from '@/video/script.ts';

// The atoms here are drawn by src/video/atoms.ts. Each electron keeps its atom's colour, so you can
// follow the ones magnesium gives to oxygen, and the ones water's atoms share.

/** Magnesium gives its two outer electrons to oxygen, and the two ions pull together. */
const ionic: AtomsEl = {
  kind: 'atoms',
  id: 'mg',
  span: [13, 6.4],
  atoms: [
    { id: 'mg', symbol: 'Mg', protons: 12, at: [3, 3.2], tone: 'theta', name: 'magnesium' },
    { id: 'o', symbol: 'O', protons: 8, at: [10, 3.2], tone: 'bad', name: 'oxygen' },
  ],
  clips: {
    give: { phases: [{ dur: 3.2, give: [{ from: 'mg', to: 'o', n: 2 }] }, { dur: 0.6 }, { dur: 1.6, move: { mg: [4.1, 3.2], o: [9, 3.2] } }] },
  },
  poster: 'give',
  height: 420,
};

/** Water: an oxygen atom shares a pair of electrons with each of two hydrogen atoms. */
const water: AtomsEl = {
  kind: 'atoms',
  id: 'w',
  span: [11, 6.8],
  atoms: [
    { id: 'o', symbol: 'O', protons: 8, at: [5.5, 3.2], tone: 'bad', name: 'oxygen', labelAbove: true },
    { id: 'h1', symbol: 'H', protons: 1, at: [1.4, 5.4], tone: 'adj', name: 'hydrogen' },
    { id: 'h2', symbol: 'H', protons: 1, at: [9.6, 5.4], tone: 'adj', name: 'hydrogen' },
  ],
  clips: {
    share: {
      phases: [
        { dur: 2, move: { h1: [3.76, 4.54], h2: [7.24, 4.54] } },
        { dur: 2, share: [{ a: 'o', b: 'h1', n: 1 }, { a: 'o', b: 'h2', n: 1 }] },
      ],
    },
  },
  poster: 'share',
  height: 420,
};

const video: Explainer = {
  id: 'c9-2-1',
  lessonId: 'c9-2-1',
  title: 'Ionic and Covalent Bonding',
  thumbnail: 'w',
  summary:
    'Ionic bonding joins a metal and a non-metal: electrons are transferred, making ions that attract. Covalent bonding joins non-metals, which share pairs of electrons. Ionic compounds have high melting points and conduct only when melted or dissolved; small covalent molecules melt easily and do not conduct.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulas and Names', title: 'Ionic and Covalent Bonding', subtitle: 'Transferring or sharing electrons' }],
      lines: [
        { say: 'Salt melts at over eight hundred degrees Celsius, but ice melts at zero. Both are compounds, so why are they so different?', show: 'title' },
        { say: 'The answer is the way their atoms are held together. In this video, you will meet the two main kinds of bond, and see how they explain a compound’s properties.' },
      ],
    },
    {
      chapter: 'Ionic bonding',
      layout: 'center',
      main: [ionic, { kind: 'callout', id: 'ionic', tone: 'definition', title: 'Ionic bonding', md: '**Metal + non-metal.** Electrons are **transferred**, making positive and negative ions that attract.' }],
      lines: [
        { say: 'Ionic bonding happens between a metal and a non-metal. The metal atoms transfer electrons to the non-metal atoms, making positive and negative ions, and opposite charges attract strongly.', show: ['ionic', 'mg', 'mg.labels', 'mg.arrangement'] },
        { say: 'For example, magnesium gives its two outer electrons to oxygen. Magnesium becomes M g two plus, and oxygen becomes O two minus, and the two ions pull together.', play: 'mg.give', show: 'mg.charges' },
      ],
    },
    {
      chapter: 'Covalent bonding',
      layout: 'center',
      main: [water, { kind: 'callout', id: 'cov', tone: 'definition', title: 'Covalent bonding', md: '**Non-metals only.** Atoms **share** pairs of electrons. Each shared pair is one bond.' }],
      lines: [
        { say: 'Covalent bonding happens between non-metal atoms. Instead of transferring electrons, the atoms share pairs of them. Each shared pair is one covalent bond.', show: ['cov', 'w', 'w.labels'] },
        { say: 'In a water molecule, the oxygen atom shares a pair of electrons with each of two hydrogen atoms. Now the oxygen has eight outer electrons, and each hydrogen has two: full shells for all three.', play: 'w.share', show: 'w.arrangement' },
      ],
    },
    {
      chapter: 'Bonding and properties',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'props',
          head: ['Property', 'Ionic (salt)', 'Covalent molecules (water)'],
          rows: [
            ['melting point', 'high (801 °C)', 'low (0 °C)'],
            ['conducts when solid?', 'no', 'no'],
            ['conducts when melted or dissolved?', 'yes', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Ionic compounds form a giant lattice of ions, held by strong forces in every direction. It takes a lot of energy to break them apart, so ionic compounds have high melting points.', show: ['props', 'props.0'], focus: 'props.0' },
        { say: 'Small covalent molecules have strong bonds inside each molecule, but only weak forces between molecules. So they melt and boil at low temperatures.' },
        { say: 'Solid salt does not conduct electricity, because its ions are locked in place.', show: 'props.1', focus: 'props.1' },
        { say: 'But when salt is melted or dissolved, its ions can move and carry a current. Covalent molecules have no ions, so they do not conduct at all.', show: 'props.2', focus: 'props.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A white solid melts at 770 °C, and its solution conducts electricity. What kind of bonding does it have?',
          choices: ['covalent', 'no bonding', 'metallic only', 'ionic'],
          answer: 3,
          working: 'A high melting point means strong forces in a lattice; conducting in solution means ions that can move.',
        },
      ],
      lines: [
        { say: 'Your turn. A white solid melts at seven hundred and seventy degrees Celsius, and its solution conducts electricity. What kind of bonding does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, ionic. The high melting point points to a lattice held by strong forces, and conducting in solution shows there are ions that can move.', show: 'q.answer' },
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
            '**Ionic**: metal + non-metal; electrons transferred.',
            '**Covalent**: non-metals; electrons shared in pairs.',
            'Ionic: high melting point; conducts only when melted or dissolved.',
            'Small covalent molecules: low melting point; do not conduct.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Ionic bonding joins a metal and a non-metal, by transferring electrons.', show: 'sum.0' },
        { say: 'Covalent bonding joins non-metals, which share pairs of electrons.', show: 'sum.1' },
        { say: 'Ionic compounds have high melting points, and conduct only when melted or dissolved.', show: 'sum.2' },
        { say: 'And small covalent molecules melt easily and do not conduct. Next, you will write the formulas of ionic compounds.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
