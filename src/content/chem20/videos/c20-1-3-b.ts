import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-1-3-b',
  lessonId: 'c20-1-3',
  title: 'Molecular Compounds and Acids, Part 2: Naming with Prefixes',
  thumbnailTitle: 'Naming with Prefixes',
  thumbnail: false,
  summary:
    'Two non-metals can join in several ways, so a molecular compound’s name counts its atoms with prefixes: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6, hepta 7, octa 8, nona 9, deca 10. The first element never takes mono, the second ends in -ide and always has a prefix, and mono + oxide = monoxide: CO is carbon monoxide, CO2 carbon dioxide and N2O4 dinitrogen tetraoxide. Ionic compounds never take prefixes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'Naming with Prefixes', subtitle: 'Counting the atoms in a name' }],
      lines: [
        { say: 'Nitrogen and oxygen alone make at least four different compounds. A name like nitrogen oxide cannot tell them apart.', show: 'title' },
        { say: 'In this part, you will name molecular compounds with prefixes that count their atoms.' },
      ],
    },
    {
      chapter: 'Prefixes count atoms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NO} \\qquad \\ce{NO2} \\qquad \\ce{N2O} \\qquad \\ce{N2O4}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Prefix', 'Atoms', 'Prefix', 'Atoms'],
          rows: [
            ['mono', '1', 'hexa', '6'],
            ['di', '2', 'hepta', '7'],
            ['tri', '3', 'octa', '8'],
            ['tetra', '4', 'nona', '9'],
            ['penta', '5', 'deca', '10'],
          ],
        },
      ],
      lines: [
        { say: 'Ion charges fix the formula of an ionic compound, so its name does not need to count atoms. Non-metals are different: the same two elements can often join in several ways. Nitrogen and oxygen make all four of these.', show: 'm' },
        { say: 'So a molecular compound’s name counts its atoms with a prefix, a word part placed in front of an element’s name.' },
        { say: 'Mono means one, dye two, tri three, tetra four, penta five, hexa six, hepta seven, octa eight, nona nine, and deca ten.', caption: 'Mono means one, di two, tri three, tetra four, penta five, hexa six, hepta seven, octa eight, nona nine, and deca ten.', show: 't' },
      ],
    },
    {
      chapter: 'Three rules',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The first element takes a prefix only for two or more atoms: **never** "mono".',
            'The second element ends in **-ide**, always with a prefix, even "mono".',
            '"Mono" + "oxide" merge: **monoxide**.',
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CO}\\text{: carbon monoxide} \\qquad \\ce{CO2}\\text{: carbon dioxide}', '\\ce{N2O4}\\text{: dinitrogen tetraoxide}'] },
      ],
      lines: [
        { say: 'To name a compound of two non-metals, take the elements in the order the formula gives them. Name the first element, with a prefix only for two or more atoms. The first element never takes mono.', show: 'b.0', focus: 'b.0' },
        { say: 'Name the second element with its ending changed, as in oxide, chloride or sulfide, and always give it a prefix, even mono.', show: 'b.1', focus: 'b.1' },
        { say: 'When mono meets oxide, they merge into monoxide.', show: 'b.2', focus: 'b.2' },
        { say: 'So C O, with one carbon and one oxygen atom, is carbon monoxide. C O two is carbon dioxide.', caption: 'So CO, with one carbon and one oxygen atom, is carbon monoxide. CO₂ is carbon dioxide.', show: 'm.0', focus: 'm.0' },
        { say: 'And N two O four has two nitrogen atoms and four oxygen atoms: dye-nitrogen tetraoxide.', caption: 'And N₂O₄ has two nitrogen atoms and four oxygen atoms: dinitrogen tetraoxide.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'More examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Formula', 'Name', 'Formula', 'Name'],
          rows: [
            ['$\\ce{NO2}$', 'nitrogen dioxide', '$\\ce{PCl3}$', 'phosphorus trichloride'],
            ['$\\ce{N2O}$', 'dinitrogen monoxide', '$\\ce{PCl5}$', 'phosphorus pentachloride'],
            ['$\\ce{SO3}$', 'sulfur trioxide', '$\\ce{SF6}$', 'sulfur hexafluoride'],
            ['$\\ce{OF2}$', 'oxygen difluoride', '$\\ce{Cl2O7}$', 'dichlorine heptaoxide'],
          ],
        },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Shortened spellings', md: 'Gradileo writes the prefixes in full before "oxide": dinitrogen tetraoxide. Many books drop the last vowel: dinitrogen tetr**o**xide. Both are accepted.' },
      ],
      lines: [
        { say: 'Here are some more. Phosphorus trichloride and phosphorus pentachloride show why the prefix matters: three chlorine atoms, or five.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Sulfur hexafluoride has six fluorine atoms, and dye-nitrogen monoxide has two nitrogen atoms and one oxygen atom.', caption: 'Sulfur hexafluoride has six fluorine atoms, and dinitrogen monoxide has two nitrogen atoms and one oxygen atom.', focus: ['t.1', 't.2'] },
        { say: 'Here, the prefixes are written in full before oxide. Many books drop the prefix’s last vowel instead, as in dye-nitrogen tetroxide. Both spellings are accepted.', caption: 'Here, the prefixes are written in full before oxide. Many books drop the prefix’s last vowel instead, as in dinitrogen tetroxide. Both spellings are accepted.', show: 'note', focus: 't' },
      ],
    },
    {
      chapter: 'Molecular names only',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Prefixes belong to molecular compounds only', md: '"Monocarbon monoxide" is wrong: the first element never takes "mono". And ionic compounds never take prefixes: $\\ce{MgCl2}$ is magnesium chloride. A metal (or ammonium) means ionic naming; non-metals only means prefixes.' }],
      lines: [
        { say: 'Two mistakes to avoid. Monocarbon monoxide is wrong, because the first element never takes mono.', show: 'oops' },
        { say: 'And ionic compounds never take prefixes. M G C L two is magnesium chloride, not magnesium dye-chloride.', caption: 'And ionic compounds never take prefixes. MgCl₂ is magnesium chloride, not magnesium dichloride.' },
        { say: 'So check first. A metal, or ammonium, means ionic naming. Non-metals only means prefixes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Name the molecular compound $\\ce{Cl2O7}$.',
          choices: ['chlorine heptaoxide', 'dichlorine oxide', 'dichlorine heptaoxide', 'heptaoxygen dichloride'],
          answer: 2,
          working: 'Two chlorine atoms: dichlorine. Seven oxygen atoms: heptaoxide.',
        },
      ],
      lines: [
        { say: 'Your turn. Name the molecular compound C L two O seven. Pause the video and try it.', caption: 'Your turn. Name the molecular compound Cl₂O₇. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, dye-chlorine heptaoxide. Two chlorine atoms make dye-chlorine, and seven oxygen atoms make heptaoxide. Choice A leaves out the prefix on the first element, which is needed for two or more atoms.', caption: 'The answer is C, dichlorine heptaoxide. Two chlorine atoms make dichlorine, and seven oxygen atoms make heptaoxide. Choice A leaves out the prefix on the first element, which is needed for two or more atoms.', show: 'q.answer' },
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
            'Prefixes count atoms: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6, hepta 7, octa 8, nona 9, deca 10.',
            'The first element never takes "mono"; the second ends in -ide, always with a prefix.',
            '"Mono" + "oxide" = monoxide: $\\ce{CO}$ is carbon monoxide.',
            'Prefixes are for molecular compounds only, never ionic ones.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a molecular compound, prefixes count the atoms of each element.', show: 'sum.0' },
        { say: 'The first element never takes mono, and the second element changes its ending and always takes a prefix.', show: 'sum.1' },
        { say: 'Mono and oxide merge into monoxide.', show: 'sum.2' },
        { say: 'And prefixes are for molecular compounds only. In part three, you will turn names back into formulas, and meet compounds known by common names. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
