import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-1-3-c',
  lessonId: 'c20-1-3',
  title: 'Molecular Compounds and Acids, Part 3: Formulas and Common Names',
  thumbnailTitle: 'Formulas and Common Names',
  thumbnail: false,
  summary:
    'To write the formula of a molecular compound, turn each prefix back into a subscript: phosphorus pentachloride is PCl5 and tetraphosphorus decaoxide is P4O10. Never simplify a molecular formula, because N2O4 and NO2 are different compounds. Some compounds keep common names: water, ammonia, methane, hydrogen peroxide, ozone, methanol, ethanol, propane, glucose and sucrose.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Formulas and Common Names', subtitle: 'From a name back to a formula' }],
      lines: [
        { say: 'The name of a molecular compound tells you its formula exactly, with no charges to balance. And a few compounds go by names that follow no rules at all.', show: 'title' },
        { say: 'In this part, you will turn names back into formulas, and learn the common names.' },
      ],
    },
    {
      chapter: 'From name to formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Prefixes become subscripts', md: 'No prefix on the first element means **one** atom, and a subscript of 1 is never written. There are no charges to balance: the name tells you everything.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{phosphorus pentachloride} \\;\\Rightarrow\\; \\ce{PCl5}', '\\text{tetraphosphorus decaoxide} \\;\\Rightarrow\\; \\ce{P4O10}'] },
      ],
      lines: [
        { say: 'To write a formula, turn each prefix back into a subscript. No prefix on the first element means one atom, and a subscript of one is never written.', show: 'key' },
        { say: 'There are no charges to balance: the name tells you everything.' },
        { say: 'Phosphorus pentachloride: no prefix, so one phosphorus atom, and penta, so five chlorine atoms. P C L five.', caption: 'Phosphorus pentachloride: no prefix, so one phosphorus atom, and penta, so five chlorine atoms. PCl₅.', show: 'm.0', focus: 'm.0' },
        { say: 'Tetraphosphorus decaoxide: tetra, so four phosphorus atoms, and deca, so ten oxygen atoms. P four O ten.', caption: 'Tetraphosphorus decaoxide: tetra, so four phosphorus atoms, and deca, so ten oxygen atoms. P₄O₁₀.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Never simplify',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{N2O4}\\text{: dinitrogen tetraoxide}', '\\ce{NO2}\\text{: nitrogen dioxide}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Never simplify a molecular formula', md: 'It gives the actual atoms in **one molecule**. An ionic formula is a ratio, so it is reduced; a molecular formula is not.' },
      ],
      lines: [
        { say: 'Never simplify a molecular formula. It gives the actual atoms in one molecule.', show: 'oops' },
        { say: 'Dye-nitrogen tetraoxide and nitrogen dioxide have the same ratio of atoms, one nitrogen to two oxygen. But they are two different compounds, with different molecules.', caption: 'Dinitrogen tetraoxide and nitrogen dioxide have the same ratio of atoms, one nitrogen to two oxygen. But they are two different compounds, with different molecules.', show: 'm', focus: 'm' },
        { say: 'That is the opposite of an ionic formula, which gives only a ratio of ions, and is always reduced.' },
      ],
    },
    {
      chapter: 'Common names',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Name', 'Formula', 'Name', 'Formula'],
          rows: [
            ['water', '$\\ce{H2O}$', 'methanol', '$\\ce{CH3OH}$'],
            ['ammonia', '$\\ce{NH3}$', 'ethanol', '$\\ce{C2H5OH}$'],
            ['methane', '$\\ce{CH4}$', 'propane', '$\\ce{C3H8}$'],
            ['hydrogen peroxide', '$\\ce{H2O2}$', 'glucose', '$\\ce{C6H12O6}$'],
            ['ozone', '$\\ce{O3}$', 'sucrose', '$\\ce{C12H22O11}$'],
          ],
        },
      ],
      lines: [
        { say: 'Some molecular substances were known long before the naming rules, and everyone still uses their common names. Learn these as they are.', show: 't' },
        { say: 'Water. Ammonia, in cleaning products and fertilisers. Methane, in natural gas. And hydrogen peroxide, in bleaches and disinfectants.' },
        { say: 'Ozone, which forms the ozone layer. Methanol, a fuel and solvent. Ethanol, in alcoholic drinks and fuels. And propane, a fuel for barbecues and heaters.' },
        { say: 'Glucose, the sugar carried in your blood, and sucrose, which is table sugar.' },
      ],
    },
    {
      chapter: 'Alcohols and ozone',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oh', tone: 'tip', title: 'Written with OH at the end', md: 'Methanol is written $\\ce{CH3OH}$ and ethanol $\\ce{C2H5OH}$: the OH shows the group of atoms that makes them **alcohols**.' },
        { kind: 'callout', id: 'o3', tone: 'key', title: 'Ozone is an element', md: 'Ozone, $\\ce{O3}$, contains only oxygen atoms: it is a form of the element oxygen, not a compound. Its molecules have three atoms; the oxygen you breathe, $\\ce{O2}$, has two.' },
      ],
      lines: [
        { say: 'Chemists write methanol as C H three O H, and ethanol as C two H five O H. The O H at the end shows the group of atoms that makes them alcohols.', caption: 'Chemists write methanol as CH₃OH, and ethanol as C₂H₅OH. The OH at the end shows the group of atoms that makes them alcohols.', show: 'oh' },
        { say: 'Ozone contains only oxygen atoms, so strictly it is a form of the element oxygen, not a compound. Its molecules have three atoms, while the oxygen you breathe has two.', show: 'o3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the formula of tetraphosphorus trisulfide?',
          choices: ['$\\ce{P3S4}$', '$\\ce{P4S3}$', '$\\ce{PS}$', '$\\ce{P4S}$'],
          answer: 1,
          working: 'Tetra: four phosphorus atoms. Tri: three sulfur atoms. $\\ce{P4S3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the formula of tetraphosphorus trisulfide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, P four S three. Tetra gives four phosphorus atoms, and tri gives three sulfur atoms. Choice A swaps the prefixes between the elements.', caption: 'The answer is B, P₄S₃. Tetra gives four phosphorus atoms, and tri gives three sulfur atoms. Choice A swaps the prefixes between the elements.', show: 'q.answer' },
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
            'Turn each prefix into a subscript; no prefix on the first element means one atom.',
            'Never simplify a molecular formula: $\\ce{N2O4}$ and $\\ce{NO2}$ are different compounds.',
            'Learn the common names: water, ammonia, methane, hydrogen peroxide, ozone, methanol, ethanol, propane, glucose, sucrose.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write a formula, turn each prefix into a subscript. No prefix on the first element means one atom.', show: 'sum.0' },
        { say: 'Never simplify a molecular formula, because it shows the atoms in one molecule.', show: 'sum.1' },
        { say: 'And learn the common names as they are. In part four, you will name acids. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
