import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hydrated, ionRows, latticeBlock, tag } from './lib/c20-3a-figures.ts';

// A corner of a sodium chloride crystal with water molecules at its surface, and a positive and a
// negative ion that have left it, each surrounded by water molecules.
const dissolving = figure(
  'd',
  [
    latticeBlock({ name: 'lat', cols: 3, rows: 4, waters: [0, 1, 2, 3] }),
    hydrated({ name: 'cat', at: [5.9, 3.1], sign: '+', count: 5 }),
    hydrated({ name: 'an', at: [5.9, 0.1], sign: '-', turn: 60 }),
    tag('lat-name', [1.05, -1.0], '\\text{crystal}', { tone: 'muted', group: 'lat-ions' }),
  ],
  520,
);

// The ions in one formula unit of aluminium sulfate: two aluminium ions and three sulfate ions.
const ions = figure(
  'f',
  [
    ionRows({
      rows: [
        { id: 'al', count: 2, tex: '\\ce{Al^3+}', tone: 'opp' },
        { id: 'so4', count: 3, tex: '\\ce{SO4^2-}', tone: 'adj' },
      ],
    }),
  ],
  380,
);

const video: Explainer = {
  id: 'c20-3-1-c',
  lessonId: 'c20-3-1',
  title: 'Solutions, Electrolytes and Dissociation, Part 3: Dissociation Equations',
  thumbnailTitle: 'Dissociation Equations',
  thumbnail: 'd',
  summary:
    'In water, polar water molecules pull the ions of an ionic crystal apart: dissociation. A dissociation equation shows the solid on the left and its aqueous ions on the right, with the subscripts of the formula as coefficients, polyatomic ions kept whole, and charges that add up to zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Dissociation Equations', subtitle: 'How an ionic compound comes apart in water' }],
      lines: [
        { say: 'Solid sodium chloride does not conduct electricity, yet salt water does. Something happens to the crystal as it dissolves.', show: 'title' },
        { say: 'In this part, you will see a crystal come apart in water, and write dissociation equations that count the ions it releases.' },
      ],
    },
    {
      chapter: 'Pulling the lattice apart',
      layout: 'split',
      leftWidth: 600,
      left: [dissolving],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'In the solid, the ions are **locked in place** in a lattice.',
            'Polar water molecules crowd round the ions at the surface.',
            '**Oxygen** ends face the positive ions; **hydrogen** ends face the negative ions.',
            'Each ion moves off, **surrounded by water** molecules.',
          ],
        },
      ],
      lines: [
        { say: 'In the solid, the ions are locked in place in a crystal lattice, so they cannot carry a current.', show: ['d.lat-ions', 'b.0'] },
        { say: 'In water, polar water molecules crowd round the ions at the surface of the crystal.', show: ['d.lat-water', 'b.1'], focus: 'd.lat-water' },
        { say: 'The negative oxygen ends of the molecules face the positive ions, and the positive hydrogen ends face the negative ions.', show: 'b.2' },
        { say: 'They pull the ions away, one by one. Each ion then moves through the solution, surrounded by water molecules.', show: ['d.cat-ion', 'd.cat-water', 'd.an-ion', 'd.an-water', 'b.3'], focus: ['d.cat-water', 'd.an-water'] },
      ],
    },
    {
      chapter: 'Dissociation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dissociation', md: 'The separation of an ionic compound into its ions as it dissolves. A **dissociation equation** shows the solid compound on the left and the separate aqueous ions on the right.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NaCl(s) -> Na+(aq) + Cl-(aq)}'] },
        { kind: 'text', id: 'fu', size: 'md', align: 'center', md: 'One **formula unit** is the smallest group of ions the formula describes: one $\\ce{Na+}$ and one $\\ce{Cl-}$.' },
      ],
      lines: [
        { say: 'This separation of an ionic compound into its ions, as it dissolves, is called dissociation.', show: 'def' },
        { say: 'Its equation shows the solid on the left, and the separate aqueous ions on the right: solid sodium chloride gives aqueous sodium ions and chloride ions.', caption: 'Its equation shows the solid on the left, and the separate aqueous ions on the right: NaCl(s) → Na⁺(aq) + Cl⁻(aq).', show: 'm', focus: 'm' },
        { say: 'One formula unit is the smallest group of ions the formula describes. For sodium chloride, that is one sodium ion and one chloride ion.', show: 'fu' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'split',
      leftWidth: 460,
      left: [
        {
          kind: 'bullets',
          id: 'st',
          items: [
            '**Identify** the cation and the anion, with their charges.',
            '**Count** each ion in one formula unit; the counts become coefficients.',
            '**Keep polyatomic ions whole.**',
            '**Check** that the charges on the right add up to zero.',
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Ca^2+} \\text{ and } \\ce{Cl-}', '\\ce{CaCl2(s) -> Ca^2+(aq) + 2Cl-(aq)}', '(+2) + 2 \\times (-1) = 0', '1 + 2 = 3\\ \\text{ions}'] }],
      lines: [
        { say: 'To write a dissociation equation, follow four steps. Take calcium chloride.' },
        { say: 'Step one: identify the ions, with their charges: the calcium ion, two plus, and the chloride ion, minus.', show: ['st.0', 'm.0'], focus: 'm.0' },
        { say: 'Step two: count each ion in one formula unit, and write the counts as coefficients. The subscript two means two chloride ions.', show: ['st.1', 'm.1'], focus: 'm.1' },
        { say: 'Step three: keep polyatomic ions whole. There are none here.', show: 'st.2' },
        { say: 'Step four: check that the charges add up to zero. Plus two, and two times minus one, gives zero.', show: ['st.3', 'm.2'], focus: 'm.2' },
        { say: 'So each formula unit releases three ions.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Aluminium sulfate',
      layout: 'split',
      leftWidth: 420,
      left: [ions],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{Al^3+} \\text{ and } \\ce{SO4^2-}', '\\ce{Al2(SO4)3(s)}', '\\qquad \\ce{-> 2Al^3+(aq) + 3SO4^2-(aq)}', '2 \\times (+3) + 3 \\times (-2) = 0', '2 + 3 = 5\\ \\text{ions}'],
        },
      ],
      lines: [
        { say: 'Now aluminium sulfate. Its ions are the aluminium ion, three plus, and the polyatomic sulfate ion, S O four, two minus.', caption: 'Now aluminium sulfate, Al₂(SO₄)₃. Its ions are the aluminium ion, Al³⁺, and the polyatomic sulfate ion, SO₄²⁻.', show: 'm.0', focus: 'm.0' },
        { say: 'The subscript two gives two aluminium ions. The three after the bracket gives three sulfate ions, each kept whole.', show: ['f.al', 'f.so4', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Check: two times plus three is plus six, and three times minus two is minus six. They add up to zero.', show: 'm.3', focus: 'm.3' },
        { say: 'So each formula unit releases five ions in all.', show: 'm.4', focus: ['m.4', 'f'] },
      ],
    },
    {
      chapter: 'Polyatomic ions stay whole',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Polyatomic ions stay whole', md: 'Do not split $\\ce{SO4^2-}$ into sulfur and oxygen, or join three sulfate ions into one. Each ion keeps its own charge; the number of ions is a coefficient.' },
        {
          kind: 'table',
          id: 't',
          head: ['Compound', 'Dissociation equation', 'Ions'],
          rows: [
            ['magnesium nitrate', '$\\ce{Mg(NO3)2(s) -> Mg^2+(aq) + 2NO3-(aq)}$', '3'],
            ['ammonium sulfate', '$\\ce{(NH4)2SO4(s) -> 2NH4+(aq) + SO4^2-(aq)}$', '3'],
            ['potassium phosphate', '$\\ce{K3PO4(s) -> 3K+(aq) + PO4^3-(aq)}$', '4'],
          ],
        },
      ],
      lines: [
        { say: 'Do not split the sulfate ion into sulfur and oxygen, or join the three sulfate ions into one. Each ion keeps its own charge, and the number of ions becomes a coefficient.', show: 'mis' },
        { say: 'The same steps give these. Magnesium nitrate releases one magnesium ion and two nitrate ions.', show: 't.0', focus: 't.0' },
        { say: 'Ammonium sulfate releases two ammonium ions and one sulfate ion.', show: 't.1', focus: 't.1' },
        { say: 'And potassium phosphate releases three potassium ions and one phosphate ion.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Iron(III) nitrate, $\\ce{Fe(NO3)3}$, dissociates in water. Which is the right-hand side of its dissociation equation?',
          choices: ['$\\ce{Fe^3+(aq) + 3NO3-(aq)}$', '$\\ce{3Fe^3+(aq) + NO3-(aq)}$', '$\\ce{Fe^3+(aq) + (NO3)3^3-(aq)}$', '$\\ce{Fe(NO3)3(aq)}$'],
          answer: 0,
          working: 'One $\\ce{Fe^3+}$ ion and three nitrate ions, each kept whole with its own charge. Check: $(+3) + 3 \\times (-1) = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Iron three nitrate dissociates in water. Which is the right-hand side of its dissociation equation? Pause the video and try it.', caption: 'Your turn. Iron(III) nitrate, Fe(NO₃)₃, dissociates in water. Which is the right-hand side of its dissociation equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: one iron three ion and three nitrate ions, each kept whole. Choice C joins the nitrate ions into one, and Choice D shows the compound dissolving, but no ions.', caption: 'The answer is A: one Fe³⁺ ion and three nitrate ions, each kept whole. Choice C joins the nitrate ions into one, and Choice D shows the compound dissolving, but no ions.', show: 'q.answer' },
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
            'In water, polar water molecules pull the ions of a lattice apart: **dissociation**.',
            'The subscripts become coefficients: $\\ce{CaCl2(s) -> Ca^2+(aq) + 2Cl-(aq)}$.',
            'Polyatomic ions stay whole, and each ion keeps its own charge.',
            'Check that the charges on the right add up to zero.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In water, polar water molecules pull the ions of a lattice apart: dissociation.', show: 'sum.0' },
        { say: 'In a dissociation equation, the subscripts of the formula become coefficients.', show: 'sum.1' },
        { say: 'Polyatomic ions stay whole, and each ion keeps its own charge.', show: 'sum.2' },
        { say: 'And the charges always add up to zero. In part four, you will count moles of ions, and see how acids form ions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
