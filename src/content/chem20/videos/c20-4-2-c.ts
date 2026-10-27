import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ionEq } from './lib/c20-4a-figures.ts';

// The total ionic equation for aluminium sulfate and barium nitrate, with strokes through the
// spectator ions (the group "x").
const total = figure(
  'te',
  [
    ionEq({
      rows: [
        [{ id: 'al', tex: '\\ce{2Al^3+(aq)}', strike: 'x' }, '+', { id: 'so4', tex: '\\ce{3SO4^2-(aq)}' }, '+', { id: 'ba', tex: '\\ce{3Ba^2+(aq)}' }, '+', { id: 'no3', tex: '\\ce{6NO3-(aq)}', strike: 'x' }],
        ['->', { id: 'baso4', tex: '\\ce{3BaSO4(s)}' }, '+', { id: 'al2', tex: '\\ce{2Al^3+(aq)}', strike: 'x' }, '+', { id: 'no32', tex: '\\ce{6NO3-(aq)}', strike: 'x' }],
      ],
    }),
  ],
  190,
);

const video: Explainer = {
  id: 'c20-4-2-c',
  lessonId: 'c20-4-2',
  title: 'Net Ionic Equations, Part 3: Lowest Terms, and Starting from Names',
  thumbnailTitle: 'Lowest Terms, and Starting from Names',
  thumbnail: 'te',
  summary:
    'After the spectators are crossed out, divide out any common factor, so 3Ba²⁺ + 3SO₄²⁻ → 3BaSO₄ becomes Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), and check the atoms and the charge: Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s). Given only names, the net ionic equation is the precipitate’s ions coming together in the ratio of its formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Lowest Terms, and Starting from Names', subtitle: 'Check the atoms and the charge' }],
      lines: [
        { say: 'Crossing out the spectators does not always finish the job. Sometimes every coefficient left shares a factor, and sometimes you are given only names.', show: 'title' },
        { say: 'In this part, you will write a net ionic equation in lowest terms, check that it balances, and write one from the names of the solutions.' },
      ],
    },
    {
      chapter: 'Lowest terms',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Solutions of aluminium sulfate and barium nitrate are mixed: $\\ce{Al2(SO4)3(aq) + 3Ba(NO3)2(aq) -> 3BaSO4(s) + 2Al(NO3)3(aq)}$.' },
        total,
        { kind: 'math', id: 'n', size: 'md', lines: ['\\ce{3Ba^2+(aq) + 3SO4^2-(aq) -> 3BaSO4(s)}', '\\div 3\\text{:} \\quad \\ce{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)}'] },
      ],
      lines: [
        { say: 'Solutions of aluminium sulfate and barium nitrate are mixed, and barium sulfate precipitates.', show: 'q' },
        { say: 'In the total ionic equation, aluminium sulfate gives two aluminium ions and three sulfate ions. Three units of barium nitrate give three barium ions and six nitrate ions.', show: ['te.row-0', 'te.row-1'] },
        { say: 'The aluminium ions and the nitrate ions are spectators. Cross them out.', show: 'te.x', focus: ['te.al', 'te.no3', 'te.al2', 'te.no32'] },
        { say: 'What is left: three barium ions plus three sulfate ions give three units of solid barium sulfate.', caption: 'What is left: 3Ba²⁺(aq) + 3SO₄²⁻(aq) → 3BaSO₄(s).', show: 'n.0', focus: 'n.0' },
        { say: 'Every coefficient divides by three, so divide them out. The barium ion plus the sulfate ion gives solid barium sulfate.', caption: 'Every coefficient divides by three, so divide them out: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).', show: 'n.1', focus: 'n.1' },
      ],
    },
    {
      chapter: 'Balance the net ionic equation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Balance the net ionic equation', md: 'Check the atoms and the charge. One $\\ce{OH-}$ cannot make a neutral solid with $\\ce{Fe^3+}$: it takes three.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{Fe^3+(aq) + OH-(aq) -> Fe(OH)3(s)} \\quad \\bad{\\times}', '\\ce{Fe^3+(aq) + 3OH-(aq) -> Fe(OH)3(s)} \\quad \\good{\\checkmark}', '\\text{Charge: } (3+) + 3(1-) = 0'],
        },
      ],
      lines: [
        { say: 'Always check the atoms and the charge. The iron three ion plus one hydroxide ion cannot give iron three hydroxide: the solid holds three hydroxide ions.', caption: 'Always check the atoms and the charge. Fe³⁺(aq) + OH⁻(aq) → Fe(OH)₃(s) is not balanced: the solid holds three hydroxide ions.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'One iron three ion needs three hydroxide ions to make a neutral solid. Plus three, and three times minus one, make zero.', caption: 'One Fe³⁺ ion needs three OH⁻ ions to make a neutral solid: Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s). (3+) + 3(1−) = 0.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Starting from names',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Solutions of aluminium nitrate and sodium hydroxide are mixed, and aluminium hydroxide precipitates. Write the net ionic equation, and name the spectator ions.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['The precipitate is $\\ce{Al(OH)3}$: three $\\ce{OH-}$ for each $\\ce{Al^3+}$.', 'The other ions, $\\ce{Na+}$ and $\\ce{NO3-}$, stay dissolved as sodium nitrate: they are the spectators.'],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Al^3+(aq) + 3OH-(aq) -> Al(OH)3(s)}'] },
      ],
      lines: [
        { say: 'Often you are told only the names. You do not need the whole formula equation: the net ionic equation of a precipitation is the precipitate’s own ions coming together, in the ratio its formula shows.' },
        { say: 'Solutions of aluminium nitrate and sodium hydroxide are mixed, and aluminium hydroxide precipitates.', show: 'q' },
        { say: 'Aluminium hydroxide holds three hydroxide ions for each aluminium ion.', show: 'b.0', focus: 'b.0' },
        { say: 'So the net ionic equation is: the aluminium ion plus three hydroxide ions gives solid aluminium hydroxide.', caption: 'So the net ionic equation is Al³⁺(aq) + 3OH⁻(aq) → Al(OH)₃(s).', show: 'm', focus: 'm' },
        { say: 'The other ions, sodium and nitrate, stay dissolved as sodium nitrate. They are the spectators.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'More precipitates',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Solutions mixed', 'Net ionic equation'],
          rows: [
            ['copper(II) sulfate and sodium hydroxide', '$\\ce{Cu^2+(aq) + 2OH-(aq) -> Cu(OH)2(s)}$'],
            ['calcium chloride and sodium carbonate', '$\\ce{Ca^2+(aq) + CO3^2-(aq) -> CaCO3(s)}$'],
            ['lead(II) nitrate and sodium chloride', '$\\ce{Pb^2+(aq) + 2Cl-(aq) -> PbCl2(s)}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are three more. In each, the precipitate’s ions come together in the ratio of its formula: two hydroxide ions for copper two hydroxide, one carbonate ion for calcium carbonate, and two chloride ions for lead two chloride.', caption: 'Here are three more. In each, the precipitate’s ions come together in the ratio of its formula: two hydroxide ions for Cu(OH)₂, one carbonate ion for CaCO₃, and two chloride ions for PbCl₂.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of silver nitrate and potassium chromate are mixed, and silver chromate precipitates. The chromate ion is $\\ce{CrO4^2-}$. Which is the net ionic equation? (State symbols are left out.)',
          choices: ['$\\ce{Ag+ + CrO4^2- -> Ag2CrO4}$', '$\\ce{K+ + NO3- -> KNO3}$', '$\\ce{Ag2^2+ + CrO4^2- -> Ag2CrO4}$', '$\\ce{2Ag+ + CrO4^2- -> Ag2CrO4}$'],
          answer: 3,
          working: 'Silver chromate is $\\ce{Ag2CrO4}$: two $\\ce{Ag+}$ for each $\\ce{CrO4^2-}$. Net: $\\ce{2Ag+(aq) + CrO4^2-(aq) -> Ag2CrO4(s)}$. The spectators are $\\ce{K+}$ and $\\ce{NO3-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of silver nitrate and potassium chromate are mixed, and silver chromate precipitates. The chromate ion has a charge of two minus. Which is the net ionic equation? Pause the video and try it.', caption: 'Your turn. Solutions of silver nitrate and potassium chromate are mixed, and silver chromate precipitates. The chromate ion is CrO₄²⁻. Which is the net ionic equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Silver chromate holds two silver ions for each chromate ion, so two silver ions react with one chromate ion. Choice A is not balanced, and choice C treats the two silver ions as one ion, but each silver ion is plus one.', show: 'q.answer' },
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
            'Divide out a common factor: a net ionic equation is written in **lowest terms**.',
            '**Check** the atoms and the charge: $\\ce{Fe^3+(aq) + 3OH-(aq) -> Fe(OH)3(s)}$.',
            'From names: the precipitate’s ions come together in the **ratio of its formula**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Divide out any common factor, so the net ionic equation is in lowest terms.', show: 'sum.0' },
        { say: 'Check every net ionic equation for atoms and for charge.', show: 'sum.1' },
        { say: 'And from names, the precipitate’s ions come together in the ratio of its formula. In part four, you will write the net ionic equation for a neutralisation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
