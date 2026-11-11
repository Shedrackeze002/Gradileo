import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-7-3',
  lessonId: 'cx-7-3',
  title: 'Dative Covalent Bonds',
  thumbnail: false,
  summary:
    'In a dative covalent bond both shared electrons come from one atom: a donor with a lone pair gives them to an acceptor with an empty orbital. Examples are the ammonium and oxonium ions, aluminium chloride and H3NBF3. Once formed, a dative bond is like any other covalent bond, and it counts as a bonding pair when working out shapes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Atoms and Physical Chemistry', title: 'Dative Covalent Bonds', subtitle: 'When one atom brings both electrons' }],
      lines: [
        { say: 'A hydrogen ion has no electrons at all, yet it bonds to ammonia to make the ammonium ion. How can it share electrons it does not have?', show: 'title' },
        { say: 'In this lesson, you will explain dative covalent bonds, and work out the shapes of the particles that contain them.' },
      ],
    },
    {
      chapter: 'What a dative bond is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dative covalent bond', md: 'A shared pair of electrons in which **both** electrons come from the same atom. It is drawn as an arrow from the donor to the acceptor.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{NH3 + H+ -> NH4+}'] },
      ],
      lines: [
        { say: 'In a dative covalent bond, both electrons of the shared pair come from the same atom. It is also called a coordinate bond.', show: 'def' },
        { say: 'The donor needs a lone pair, and the acceptor needs an empty orbital.' },
        { say: 'The nitrogen in ammonia has a lone pair, and a hydrogen ion has an empty orbital. So nitrogen donates its pair, making the ammonium ion.', caption: 'The nitrogen in ammonia has a lone pair, and H⁺ has an empty orbital. So nitrogen donates its pair, making NH₄⁺.', show: 'm', focus: 'm' },
        { say: 'Once it forms, the dative bond is just like the other three. All four N H bonds are identical.', caption: 'Once it forms, the dative bond is just like the other three. All four N–H bonds are identical.' },
      ],
    },
    {
      chapter: 'More examples',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['$\\ce{H3O+}$: water accepts $\\ce{H+}$', '$\\ce{H3NBF3}$: boron has only six outer electrons', '$\\ce{Al2Cl6}$: two dative bonds, Cl to Al', '$\\ce{CO}$: one of the three bonds is dative, O to C'] },
      ],
      lines: [
        { say: 'Water does the same thing with a hydrogen ion, making the oxonium ion.', caption: 'Water does the same thing with H⁺, making the oxonium ion, H₃O⁺.', show: 'b.0' },
        { say: 'Boron trifluoride has only six outer electrons on boron, so it accepts ammonia’s lone pair.', show: 'b.1' },
        { say: 'In aluminium chloride, a chlorine on each unit donates a lone pair to the other aluminium, giving two dative bonds.', show: 'b.2' },
        { say: 'And in carbon monoxide, one of the three bonds is a dative bond from oxygen to carbon.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Shapes',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Species', 'Pairs round the centre', 'Shape', 'Angle'], rows: [['$\\ce{NH3}$', '3 bonding, 1 lone', 'trigonal pyramidal', '107°'], ['$\\ce{NH4+}$', '4 bonding', 'tetrahedral', '109.5°'], ['$\\ce{BF3}$', '3 bonding', 'trigonal planar', '120°']] },
      ],
      lines: [
        { say: 'A dative bond counts as a bonding pair when you work out a shape.' },
        { say: 'Ammonia has three bonding pairs and a lone pair, so it is pyramidal, at one hundred seven degrees.', caption: 'Ammonia has three bonding pairs and a lone pair, so it is pyramidal, at 107°.', show: 't.0', focus: 't.0' },
        { say: 'In the ammonium ion, the lone pair has become a bonding pair. Four bonding pairs give a tetrahedron, at one hundred nine point five degrees.', caption: 'In the ammonium ion, the lone pair has become a bonding pair. Four bonding pairs give a tetrahedron, at 109.5°.', show: 't.1', focus: 't.1' },
        { say: 'Boron trifluoride, with three bonding pairs, is trigonal planar.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The arrow points to the acceptor', md: 'The arrow starts at the atom with the lone pair. In $\\ce{NH4+}$ it points from N to H, never from H to N.' }],
      lines: [{ say: 'A common mistake is to draw the arrow the wrong way. It starts at the atom with the lone pair. In the ammonium ion it points from nitrogen to hydrogen.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the shape of the oxonium ion, $\\ce{H3O+}$?',
          choices: ['Trigonal pyramidal', 'Tetrahedral', 'Trigonal planar', 'Bent'],
          answer: 0,
          working: 'Oxygen has three bonding pairs (one of them dative) and **one lone pair**, so the shape is trigonal pyramidal, about 107°.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the shape of the oxonium ion? Pause the video and try it.', caption: 'Your turn. What is the shape of the oxonium ion, H₃O⁺? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, trigonal pyramidal. Oxygen has three bonding pairs and one lone pair left, just like ammonia.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In a dative bond, both electrons come from one atom.', 'Donor: a lone pair. Acceptor: an empty orbital.', 'Once formed, it is like any other covalent bond.', 'It counts as a bonding pair for shapes.'] }],
      lines: [
        { say: 'Let’s sum up. In a dative covalent bond, both shared electrons come from one atom.', show: 'sum.0' },
        { say: 'The donor has a lone pair, and the acceptor has an empty orbital.', show: 'sum.1' },
        { say: 'Once formed, it is the same as any other covalent bond.', show: 'sum.2' },
        { say: 'And it counts as a bonding pair when you work out a shape.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
