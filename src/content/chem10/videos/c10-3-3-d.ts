import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-3-3-d',
  lessonId: 'c10-3-3',
  title: 'Covalent Bonds and Molecular Names, Part 4: Naming Molecular Compounds',
  thumbnailTitle: 'Naming Molecular Compounds',
  thumbnail: false,
  summary:
    'Two non-metals can join in more than one way, so the name of a molecular compound counts its atoms with prefixes: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6. The first element never takes mono, the second ends in -ide and always has a prefix, and mono + oxide = monoxide: CO is carbon monoxide and N2O4 dinitrogen tetraoxide. Prefixes turn back into subscripts: nitrogen trifluoride is NF3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 4', title: 'Naming Molecular Compounds', subtitle: 'Prefixes that count atoms' }],
      lines: [
        { say: 'Carbon and oxygen make two very different gases: carbon dioxide, which you breathe out, and carbon monoxide, which is poisonous. Their names have to tell them apart.', show: 'title' },
        { say: 'In this last part, you will name compounds of two non-metals with counting prefixes, and write their formulas from their names.' },
      ],
    },
    {
      chapter: 'Counting prefixes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'why', size: 'md', align: 'center', md: 'Carbon and oxygen make both $\\ce{CO}$ and $\\ce{CO2}$, so the name of a molecular compound **counts its atoms** with a **prefix**.' },
        { kind: 'table', id: 't', head: ['Number of atoms', '1', '2', '3', '4', '5', '6'], rows: [['Prefix', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa']] },
      ],
      lines: [
        { say: 'Ion charges fix the formula of an ionic compound, so its name counts nothing. But two non-metals can often join in more than one way, so the name of a molecular compound counts its atoms with a prefix: a word part in front of the name of an element.', show: 'why' },
        { say: 'Mono means one, dye means two, tri three, tetra four, penta five, and hexa six.', caption: 'Mono means one, di means two, tri three, tetra four, penta five, and hexa six.', show: 't' },
      ],
    },
    {
      chapter: 'Three rules',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            'Name the **first** element in full. Add a prefix only for two or more atoms: **never** “mono”.',
            'Name the **second** element with **-ide**, always with a prefix, even “mono”.',
            '“mono” + “oxide” = **monoxide**.',
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CO}\\text{: carbon monoxide}', '\\ce{CCl4}\\text{: carbon tetrachloride}', '\\ce{N2O4}\\text{: dinitrogen tetraoxide}'] }],
      lines: [
        { say: 'Take the elements in the order the formula gives them. Name the first element in full, with a prefix only for two or more atoms: the first element never takes mono.', show: 'r.0' },
        { say: 'Give the second element the ending of oxide or chloride, and always a prefix, even mono. When mono meets oxide, the two vowels run together: monoxide.', show: ['r.1', 'r.2'] },
        { say: 'So C O is carbon monoxide: one carbon atom, just carbon, and one oxygen atom, monoxide.', caption: 'So CO is carbon monoxide: one carbon atom, just carbon, and one oxygen atom, monoxide.', show: 'm.0', focus: 'm.0' },
        { say: 'C C L four has four chlorine atoms: carbon tetrachloride.', caption: 'CCl₄ has four chlorine atoms: carbon tetrachloride.', show: 'm.1', focus: 'm.1' },
        { say: 'And N two O four has two nitrogen atoms and four oxygen atoms: dye-nitrogen tetraoxide.', caption: 'And N₂O₄ has two nitrogen atoms and four oxygen atoms: dinitrogen tetraoxide.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'More names',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Formula', 'Name', 'Formula', 'Name'],
          rows: [
            ['$\\ce{CO2}$', 'carbon dioxide', '$\\ce{PCl3}$', 'phosphorus trichloride'],
            ['$\\ce{SO2}$', 'sulfur dioxide', '$\\ce{PCl5}$', 'phosphorus pentachloride'],
            ['$\\ce{SO3}$', 'sulfur trioxide', '$\\ce{SF6}$', 'sulfur hexafluoride'],
            ['$\\ce{NO2}$', 'nitrogen dioxide', '$\\ce{N2O}$', 'dinitrogen monoxide'],
            ['$\\ce{SiCl4}$', 'silicon tetrachloride', '$\\ce{P2O5}$', 'diphosphorus pentaoxide'],
          ],
        },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Two spellings', md: 'Many books drop the last vowel of the prefix before “oxide”: tetroxide, pentoxide. Both spellings are accepted.' },
      ],
      lines: [
        { say: 'Here are some more. Phosphorus trichloride and phosphorus pentachloride show why the prefix matters: three chlorine atoms, or five.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Sulfur hexafluoride has six fluorine atoms, and dye-nitrogen monoxide has two nitrogen atoms and one oxygen atom.', caption: 'Sulfur hexafluoride has six fluorine atoms, and dinitrogen monoxide has two nitrogen atoms and one oxygen atom.', focus: ['t.2', 't.3'] },
                { say: 'Many books drop the last vowel of the prefix before oxide, as in dye-nitrogen tetroxide. Both spellings are accepted.', caption: 'Many books drop the last vowel of the prefix before oxide, as in dinitrogen tetroxide. Both spellings are accepted.', show: 'note', focus: 't' },
      ],
    },
    {
      chapter: 'From a name to a formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{nitrogen trifluoride} \\;\\Rightarrow\\; \\ce{NF3}', '\\text{dinitrogen pentaoxide} \\;\\Rightarrow\\; \\ce{N2O5}'] },
        { kind: 'text', id: 'keep', size: 'md', align: 'center', md: 'No charges to cancel, and **never simplify**: the formula gives the atoms in one molecule.' },
      ],
      lines: [
        { say: 'To write a formula from a name, turn each prefix back into a subscript. No prefix on the first element means one atom, and a one is never written.' },
        { say: 'Nitrogen trifluoride: no prefix, so one nitrogen atom, and tri, so three fluorine atoms. N F three.', caption: 'Nitrogen trifluoride: no prefix, so one nitrogen atom, and tri, so three fluorine atoms. NF₃.', show: 'm.0', focus: 'm.0' },
        { say: 'Dye-nitrogen pentaoxide: dye, so two nitrogen atoms, and penta, so five oxygen atoms. N two O five.', caption: 'Dinitrogen pentaoxide: di, so two nitrogen atoms, and penta, so five oxygen atoms. N₂O₅.', show: 'm.1', focus: 'm.1' },
        { say: 'There are no charges to cancel, and you must not simplify. The formula gives the actual atoms in one molecule.', show: 'keep' },
      ],
    },
    {
      chapter: 'Check the elements first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Prefixes are for non-metal compounds only', md: 'A metal with a non-metal is ionic: $\\ce{CaCl2}$ is calcium chloride. Non-metals only: $\\ce{SCl2}$ is sulfur dichloride. And $\\ce{CO}$ is carbon monoxide, not monocarbon monoxide.' },
      ],
      lines: [
        { say: 'Check the elements before you name anything. A metal with a non-metal is ionic, and takes no prefixes: C A C L two is calcium chloride.', caption: 'Check the elements before you name anything. A metal with a non-metal is ionic, and takes no prefixes: CaCl₂ is calcium chloride.', show: 'oops' },
        { say: 'Non-metals only means prefixes: S C L two is sulfur dye-chloride. And never put mono on the first element: C O is carbon monoxide, not monocarbon monoxide.', caption: 'Non-metals only means prefixes: SCl₂ is sulfur dichloride. And never put mono on the first element: CO is carbon monoxide, not monocarbon monoxide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Name the molecular compound $\\ce{N2O3}$.',
          choices: ['nitrogen trioxide', 'dinitrogen trioxide', 'nitrogen oxide', 'dinitrogen monoxide'],
          answer: 1,
          working: 'Two nitrogen atoms: “dinitrogen”. Three oxygen atoms: “trioxide”.',
        },
      ],
      lines: [
        { say: 'Your turn. Name the molecular compound N two O three. Pause the video and try it.', caption: 'Your turn. Name the molecular compound N₂O₃. Pause the video and try it.', show: 'q', wait: 6 },
                { say: 'The answer is B, dye-nitrogen trioxide: two nitrogen atoms and three oxygen atoms. Choice A leaves out the prefix on the first element, which is needed for two or more atoms.', caption: 'The answer is B, dinitrogen trioxide: two nitrogen atoms and three oxygen atoms. Choice A leaves out the prefix on the first element, which is needed for two or more atoms.', show: 'q.answer' },
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
            'Prefixes count the atoms in a molecular compound: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6.',
            'The first element never takes “mono”; the second ends in **-ide** and always has a prefix.',
            '“mono” + “oxide” = monoxide: $\\ce{CO}$ is carbon monoxide.',
            'Prefixes turn back into subscripts: nitrogen trifluoride is $\\ce{NF3}$. Never simplify.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Prefixes count the atoms in a molecular compound, from mono for one up to hexa for six.', show: 'sum.0' },
        { say: 'The first element never takes mono, and the second changes its ending and always has a prefix.', show: 'sum.1' },
        { say: 'Mono and oxide make monoxide.', show: 'sum.2' },
        { say: 'And prefixes turn back into subscripts, with no simplifying. That completes this lesson. Next, you will see how bonding explains the properties of substances.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
