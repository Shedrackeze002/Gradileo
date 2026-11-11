import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-2-1',
  lessonId: 'c9-2-1',
  title: 'Ionic and Covalent Bonding',
  thumbnail: 'props',
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
      chapter: 'Two kinds of bond',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ionic', tone: 'definition', title: 'Ionic bonding', md: '**Metal + non-metal.** Electrons are **transferred**, making positive and negative ions that attract.' },
        { kind: 'callout', id: 'cov', tone: 'definition', title: 'Covalent bonding', md: '**Non-metals only.** Atoms **share** pairs of electrons. Each shared pair is one bond.' },
      ],
      lines: [
        { say: 'Ionic bonding happens between a metal and a non-metal. The metal atoms transfer electrons to the non-metal atoms, making positive and negative ions, and opposite charges attract strongly.', show: 'ionic' },
        { say: 'For example, magnesium gives its two outer electrons to oxygen. Magnesium becomes M g two plus, and oxygen becomes O two minus.' },
        { say: 'Covalent bonding happens between non-metal atoms. Instead of transferring electrons, the atoms share pairs of them. Each shared pair is one covalent bond.', show: 'cov' },
        { say: 'In a water molecule, the oxygen atom shares a pair of electrons with each of two hydrogen atoms.' },
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
