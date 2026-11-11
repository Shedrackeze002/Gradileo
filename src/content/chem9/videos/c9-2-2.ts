import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-2-2',
  lessonId: 'c9-2-2',
  title: 'Formulas of Ionic Compounds',
  thumbnail: 'poly',
  summary:
    'An ionic compound has no overall charge, so its total positive charge equals its total negative charge, using the fewest ions. Polyatomic ions such as hydroxide, nitrate, sulfate and carbonate are charged groups of atoms; when more than one is needed, the ion goes in brackets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulas and Names', title: 'Formulas of Ionic Compounds', subtitle: 'Balancing the charges' }],
      lines: [
        { say: 'Why is salt N a C l, but calcium chloride C a C l two?', show: 'title' },
        { say: 'An ionic compound has no overall charge, so its ions must come in just the right numbers. In this video, you will learn to write the formula of any ionic compound.' },
      ],
    },
    {
      chapter: 'Balancing the charges',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'definition', title: 'The rule', md: 'Total **positive** charge = total **negative** charge. Use the **fewest** ions.' },
        { kind: 'math', id: 'ex', size: 'md', lines: ['\\text{Ca}^{2+} + 2\\,\\text{Cl}^{-} \\;\\rightarrow\\; \\ce{CaCl2}', '2\\,\\text{Al}^{3+} + 3\\,\\text{O}^{2-} \\;\\rightarrow\\; \\ce{Al2O3}'] },
      ],
      lines: [
        { say: 'The formula of an ionic compound shows the ratio of its ions. The total positive charge must equal the total negative charge, so the compound is neutral. And we always use the fewest ions that work.', show: 'rule' },
        { say: 'Calcium forms C a two plus, a charge of plus two. Chloride is C l minus, so it takes two chloride ions to balance it. The formula is C a C l two.', show: 'ex.0' },
        { say: 'Aluminium oxide is harder. Aluminium is three plus and oxide is two minus. The lowest common multiple of three and two is six, so two aluminium ions give plus six, and three oxide ions give minus six. The formula is A l two O three.', show: 'ex.1' },
        { say: 'Always simplify. Magnesium two plus and oxide two minus make M g O, not M g two O two.' },
      ],
    },
    {
      chapter: 'Polyatomic ions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'poly',
          head: ['Ion', 'Formula', 'Charge'],
          rows: [
            ['hydroxide', '$\\ce{OH-}$', '1−'],
            ['nitrate', '$\\ce{NO3-}$', '1−'],
            ['sulfate', '$\\ce{SO4^2-}$', '2−'],
            ['carbonate', '$\\ce{CO3^2-}$', '2−'],
            ['ammonium', '$\\ce{NH4+}$', '1+'],
          ],
        },
        { kind: 'math', id: 'caoh', size: 'md', lines: ['\\text{Ca}^{2+} + 2\\,\\ce{OH-} \\;\\rightarrow\\; \\ce{Ca(OH)2}'] },
      ],
      lines: [
        { say: 'A polyatomic ion is a group of atoms joined together that carries a charge as a whole. Hydroxide and nitrate are one minus, sulfate and carbonate are two minus, and ammonium is one plus.', show: 'poly' },
        { say: 'We balance the charges in exactly the same way. Calcium two plus needs two hydroxide ions.', show: 'caoh' },
        { say: 'When you need more than one polyatomic ion, put it in brackets, with the number outside. So calcium hydroxide is C a, O H in brackets, two.' },
        { say: 'Never change the inside of a polyatomic ion. C a O H two without brackets would mean one oxygen and two hydrogens, which is wrong.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the formula of magnesium nitrate, made of $\\text{Mg}^{2+}$ and $\\ce{NO3-}$ ions?',
          choices: ['$\\ce{MgNO3}$', '$\\ce{Mg(NO3)2}$', '$\\ce{MgNO32}$', '$\\ce{Mg2NO3}$'],
          answer: 1,
          working: 'One $\\text{Mg}^{2+}$ needs two $\\ce{NO3-}$ ions, and two nitrate ions go in brackets.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the formula of magnesium nitrate, made of M g two plus and nitrate ions? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. One magnesium two plus needs two nitrate ions, each one minus. Two nitrate ions go in brackets: M g, N O three in brackets, two.', show: 'q.answer' },
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
            'Total positive charge = total negative charge.',
            'Use the fewest ions, and simplify.',
            'Polyatomic ions are charged groups of atoms.',
            'Bracket a polyatomic ion when there is more than one: $\\ce{Ca(OH)2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In an ionic compound, the total positive charge equals the total negative charge.', show: 'sum.0' },
        { say: 'Use the fewest ions that make the charges cancel, and simplify.', show: 'sum.1' },
        { say: 'Polyatomic ions, such as hydroxide and sulfate, are charged groups of atoms.', show: 'sum.2' },
        { say: 'And when you need more than one, put the polyatomic ion in brackets. Next, you will learn to name compounds from their formulas.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
