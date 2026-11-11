import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-2-3',
  lessonId: 'c9-2-3',
  title: 'Naming Compounds',
  thumbnail: 'prefix',
  summary:
    'Ionic compounds are named with the positive ion first, then the negative ion, ending in -ide for a single element or keeping a polyatomic ion’s name, with no number prefixes. Covalent compounds use prefixes (mono, di, tri, tetra, penta) to count atoms, and the second element ends in -ide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulas and Names', title: 'Naming Compounds', subtitle: 'Ionic and covalent names' }],
      lines: [
        { say: 'Every compound has a name that tells a chemist what is in it.', show: 'title' },
        { say: 'Ionic and covalent compounds are named in slightly different ways. In this video, you will learn a few simple rules that name thousands of substances.' },
      ],
    },
    {
      chapter: 'Naming ionic compounds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ionic',
          head: ['Formula', 'Name'],
          rows: [
            ['$\\ce{NaCl}$', 'sodium chloride'],
            ['$\\ce{K2S}$', 'potassium sulfide'],
            ['$\\ce{CaCO3}$', 'calcium carbonate'],
            ['$\\ce{CaCl2}$', 'calcium chloride, not "dichloride"'],
          ],
        },
        { kind: 'callout', id: 'ide', tone: 'mistake', title: '-ide or -ate?', md: '**-ide**: just the element (sulfide, $\\text{S}^{2-}$). **-ate**: the element with oxygen (sulfate, $\\ce{SO4^2-}$).' },
      ],
      lines: [
        { say: 'To name an ionic compound, name the positive ion first, usually the metal, unchanged. Then name the negative ion.', show: 'ionic' },
        { say: 'A single non-metal ion ends in i d e. So N a C l is sodium chloride, and K two S is potassium sulfide.', show: ['ionic.0', 'ionic.1'], focus: 'ionic.1' },
        { say: 'A polyatomic ion keeps its own name, so C a C O three is calcium carbonate.', show: 'ionic.2', focus: 'ionic.2' },
        { say: 'The numbers in an ionic formula are not spoken in the name. C a C l two is just calcium chloride.', show: 'ionic.3', focus: 'ionic.3' },
        { say: 'Watch the ending. I d e means just the element: sulfide is sulfur alone. A t e means the element with oxygen: sulfate contains sulfur and oxygen.', show: 'ide' },
      ],
    },
    {
      chapter: 'Naming covalent compounds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'prefix',
          head: ['Number', '1', '2', '3', '4', '5'],
          rows: [['Prefix', 'mono', 'di', 'tri', 'tetra', 'penta']],
        },
        {
          kind: 'table',
          id: 'cov',
          head: ['Formula', 'Name'],
          rows: [
            ['$\\ce{CO}$', 'carbon monoxide'],
            ['$\\ce{CO2}$', 'carbon dioxide'],
            ['$\\ce{PCl5}$', 'phosphorus pentachloride'],
          ],
        },
      ],
      lines: [
        { say: 'Two non-metals can join in more than one ratio. Carbon and oxygen make both C O and C O two. So covalent names use prefixes to count the atoms: mono, di, tri, tetra and penta mean one to five.', show: 'prefix' },
        { say: 'The second element always takes a prefix and ends in i d e. C O is carbon monoxide, and C O two is carbon dioxide.', show: ['cov', 'cov.0', 'cov.1'], focus: 'cov.1' },
        { say: 'The first element takes a prefix only if there is more than one atom of it. So P C l five is phosphorus pentachloride, with no mono in front.', show: 'cov.2', focus: 'cov.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the formula of dinitrogen monoxide?',
          choices: ['$\\ce{N2O}$', '$\\ce{NO2}$', '$\\ce{N2O2}$', '$\\ce{NO}$'],
          answer: 0,
          working: '"Di" means 2 nitrogen atoms and "mono" means 1 oxygen atom.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the formula of dinitrogen monoxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Di means two nitrogen atoms, and mono means one oxygen atom: N two O.', show: 'q.answer' },
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
            'Ionic: positive ion first, then the negative ion.',
            'Single non-metal ions end in **-ide**; polyatomic ions keep their names.',
            'Covalent: prefixes count atoms; the second element ends in -ide.',
            'The first element never takes "mono".',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In an ionic name, the positive ion comes first, then the negative ion.', show: 'sum.0' },
        { say: 'A single non-metal ion ends in i d e, and a polyatomic ion keeps its own name.', show: 'sum.1' },
        { say: 'Covalent names use prefixes to count the atoms, and the second element ends in i d e.', show: 'sum.2' },
        { say: 'And the first element never takes mono. Next, you will work out how heavy a compound’s formula is.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
