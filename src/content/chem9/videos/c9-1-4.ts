import type { AtomsEl, Explainer } from '@/video/script.ts';

// The atoms here are drawn by src/video/atoms.ts: electrons circle in shells; a clip takes one
// away or adds one, and the charge appears as the protons and electrons stop balancing.

/** A sodium atom that loses its outer electron, and a chlorine atom that gains one. */
const ions: AtomsEl = {
  kind: 'atoms',
  id: 'io',
  span: [13, 6.4],
  atoms: [
    { id: 'na', symbol: 'Na', protons: 11, at: [3.2, 3.2], tone: 'brand', name: 'sodium' },
    { id: 'cl', symbol: 'Cl', protons: 17, at: [9.6, 3.2], tone: 'good', name: 'chlorine' },
  ],
  clips: {
    lose: { phases: [{ dur: 1 }, { dur: 2.5, give: [{ from: 'na', to: null, n: 1 }] }] },
    gain: { phases: [{ dur: 1 }, { dur: 1.5, fill: { cl: 18 } }] },
  },
  poster: 'lose',
  height: 400,
};

const video: Explainer = {
  id: 'c9-1-4',
  lessonId: 'c9-1-4',
  title: 'Ions',
  thumbnail: 'io',
  summary:
    'An ion is an atom that has lost or gained electrons. Metals lose electrons to become positive ions and non-metals gain them to become negative ions, reaching a full outer shell. The charge follows from the group, protons never change, and electrons equal protons minus the charge.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic Structure', title: 'Ions', subtitle: 'Atoms that lose or gain electrons' }],
      lines: [
        { say: 'Table salt is not made of sodium atoms and chlorine atoms. It is made of charged particles called ions.', show: 'title' },
        { say: 'In this video, you will see how atoms become ions, work out the charge on an ion, and count the particles inside one.' },
      ],
    },
    {
      chapter: 'How ions form',
      layout: 'center',
      main: [
        ions,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ion', md: 'An atom that has **lost or gained electrons**, so it has a charge. Metals **lose** electrons: positive ions. Non-metals **gain** electrons: negative ions.' },
      ],
      lines: [
        { say: 'An ion is an atom that has lost or gained electrons, so it has an electric charge. Atoms do this to reach a full outer shell, like the nearest noble gas.', show: ['io', 'io.labels', 'io.arrangement', 'def'] },
        { say: 'Sodium is two, eight, one. It loses its one outer electron, leaving two, eight, a full shell like neon. Now it has eleven protons but only ten electrons, so it is N a plus.', play: 'io.lose', show: 'io.charges', focus: 'io.na' },
        { say: 'Chlorine is two, eight, seven. It gains one electron to make two, eight, eight, like argon. With seventeen protons and eighteen electrons, it is C l minus, a chloride ion.', play: 'io.gain', focus: 'io.cl' },
      ],
    },
    {
      chapter: 'Charges from the group',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'groups',
          head: ['Group', 'Outer electrons', 'Ion charge', 'Example'],
          rows: [
            ['1', '1', '1+', '$\\text{Na}^{+}$'],
            ['2', '2', '2+', '$\\text{Mg}^{2+}$'],
            ['13', '3', '3+', '$\\text{Al}^{3+}$'],
            ['16', '6', '2−', '$\\text{O}^{2-}$'],
            ['17', '7', '1−', '$\\text{Cl}^{-}$'],
          ],
        },
        { kind: 'math', id: 'count', size: 'md', lines: ['\\text{electrons} = \\text{protons} - \\text{charge}'] },
      ],
      lines: [
        { say: 'The charge on an ion follows from the group. Metals in groups one, two and thirteen lose one, two or three electrons, making ions of one plus, two plus and three plus.', show: ['groups', 'groups.0', 'groups.1', 'groups.2'], focus: 'groups.2' },
        { say: 'Non-metals in groups sixteen and seventeen gain two or one electrons, making ions of two minus and one minus. Negative ions of single elements end in i d e: oxide, sulfide, chloride.', show: ['groups.3', 'groups.4'], focus: 'groups.4' },
        { say: 'Forming an ion changes only the electrons. The protons, and so the element, stay the same. So electrons equal protons take away the charge.', show: 'count' },
        { say: 'For example, oxygen has eight protons. The oxide ion has a charge of minus two, so it has eight take away minus two, which is ten electrons.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Magnesium has atomic number 12. How many electrons are in a $\\text{Mg}^{2+}$ ion?',
          choices: ['12', '14', '10', '2'],
          answer: 2,
          working: 'Electrons = protons − charge = 12 − 2 = 10. The 12 protons do not change.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium has atomic number twelve. How many electrons are in an M g two plus ion? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Magnesium keeps its twelve protons, and loses two electrons. Twelve take away two is ten electrons.', show: 'q.answer' },
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
            'Metals lose electrons (positive ions); non-metals gain them (negative ions).',
            'Ions form to get a full outer shell.',
            'Groups 1, 2, 13: 1+, 2+, 3+. Groups 16, 17: 2−, 1−.',
            'Protons never change: electrons = protons − charge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Metals lose electrons to become positive ions, and non-metals gain electrons to become negative ions.', show: 'sum.0' },
        { say: 'They do this to get a full outer shell, like a noble gas.', show: 'sum.1' },
        { say: 'The charge follows from the group.', show: 'sum.2' },
        { say: 'And protons never change, so electrons equal protons take away the charge. Next, you will see how ions and shared electrons hold compounds together.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
