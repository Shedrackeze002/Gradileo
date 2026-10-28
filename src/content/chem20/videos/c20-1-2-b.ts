import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balls, tag } from './lib/c20-1a-figures.ts';

// The sulfate ion as a ball model: one sulfur atom bonded to four oxygen atoms, in brackets with 2−.
const sulfate = figure(
  'so4',
  [
    balls({
      atoms: [
        { id: 's', symbol: 'S', at: [0, 0], r: 0.6, tone: 'theta' },
        { id: 'o1', symbol: 'O', at: [0, 1.5], tone: 'bad' },
        { id: 'o2', symbol: 'O', at: [1.5, 0], tone: 'bad' },
        { id: 'o3', symbol: 'O', at: [0, -1.5], tone: 'bad' },
        { id: 'o4', symbol: 'O', at: [-1.5, 0], tone: 'bad' },
      ],
      bonds: [
        ['s', 'o1'],
        ['s', 'o2'],
        ['s', 'o3'],
        ['s', 'o4'],
      ],
      charge: '2{-}',
      half: [2.3, 2.3],
    }),
    tag('name', [0, -3.1], '\\text{sulfate, }\\ce{SO4^2-}', { tone: 'muted' }),
  ],
  480,
);

const video: Explainer = {
  id: 'c20-1-2-b',
  lessonId: 'c20-1-2',
  title: 'Ionic Compounds, Part 2: Polyatomic Ions',
  thumbnailTitle: 'Polyatomic Ions',
  thumbnail: 'so4',
  summary:
    'A polyatomic ion, such as sulfate (SO4 2-) or ammonium (NH4+), is a group of bonded atoms with an overall charge that acts as one ion. An -ate ion has one more oxygen than the -ite ion, and adding hydrogen makes the charge one less negative. When a formula needs more than one polyatomic ion, it goes in brackets: Ca(OH)2 and (NH4)3PO4; never change the subscripts inside the ion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'Polyatomic Ions', subtitle: 'Ions made of several atoms' }],
      lines: [
        { say: 'Baking soda, chalk and plaster are all ionic compounds, but some of their ions are small groups of atoms that carry one charge between them.', show: 'title' },
        { say: 'In this part, you will meet these polyatomic ions, see the patterns in their names, and write formulas that contain them.' },
      ],
    },
    {
      chapter: 'Ions made of several atoms',
      layout: 'split',
      leftWidth: 500,
      left: [sulfate],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Polyatomic ion', md: 'A group of bonded atoms that has an overall charge and **acts as one ion**. Sulfate, $\\ce{SO4^2-}$, is one sulfur atom and four oxygen atoms with a combined charge of 2−.' }],
      lines: [
        { say: 'Some ions are made of several atoms bonded together. The whole group carries the charge and stays together, so it is treated as a single ion.', show: 'so4.model' },
        { say: 'This is called a polyatomic ion: a group of bonded atoms that has an overall charge and acts as one ion.', show: 'def' },
        { say: 'Sulfate, S O four, two minus, is one sulfur atom and four oxygen atoms, with a combined charge of two minus.', caption: 'Sulfate, SO₄²⁻, is one sulfur atom and four oxygen atoms, with a combined charge of 2−.', show: ['so4.bracket', 'so4.name'], focus: 'so4.bracket' },
      ],
    },
    {
      chapter: 'Some common ones',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Name', 'Formula', 'Name', 'Formula'],
          rows: [
            ['ammonium', '$\\ce{NH4+}$', 'carbonate', '$\\ce{CO3^2-}$'],
            ['hydroxide', '$\\ce{OH-}$', 'hydrogen carbonate', '$\\ce{HCO3-}$'],
            ['nitrate', '$\\ce{NO3-}$', 'sulfate', '$\\ce{SO4^2-}$'],
            ['nitrite', '$\\ce{NO2-}$', 'sulfite', '$\\ce{SO3^2-}$'],
            ['acetate', '$\\ce{CH3COO-}$', 'phosphate', '$\\ce{PO4^3-}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some of the most common; the lesson lists more. Learn each one with its charge: most are one minus, some two minus, and phosphate three minus.', show: 't' },
        { say: 'Ammonium, N H four plus, is the only positive one. It takes the place of a metal ion, so its compounds are ionic even without a metal.', caption: 'Ammonium, NH₄⁺, is the only positive one. It takes the place of a metal ion, so its compounds are ionic even without a metal.', focus: 't.0' },
      ],
    },
    {
      chapter: 'Patterns in the names',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{nitrate } \\ce{NO3-} \\quad \\text{nitrite } \\ce{NO2-} \\qquad \\text{sulfate } \\ce{SO4^2-} \\quad \\text{sulfite } \\ce{SO3^2-}',
            '\\text{perchlorate } \\ce{ClO4-} \\qquad \\text{chlorate } \\ce{ClO3-}',
            '\\text{chlorite } \\ce{ClO2-} \\qquad \\text{hypochlorite } \\ce{ClO-}',
            '\\ce{CO3^2-} \\rightarrow \\ce{HCO3-} \\qquad \\ce{PO4^3-} \\rightarrow \\ce{HPO4^2-} \\rightarrow \\ce{H2PO4-}',
          ],
        },
      ],
      lines: [
        { say: 'The names follow patterns. A name ending like nitrate has one more oxygen atom than the matching name ending like nitrite. Nitrate has three oxygens and nitrite two; sulfate has four, and sulfite three.', show: 'm.0', focus: 'm.0' },
        { say: 'In the chlorine family, perchlorate has one more oxygen than chlorate, and hypochlorite has one fewer than chlorite.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Adding hydrogen adds one H and makes the charge one less negative. Carbonate, two minus, becomes hydrogen carbonate, one minus. Phosphate becomes hydrogen phosphate, then dye-hydrogen phosphate.', caption: 'Adding hydrogen adds one H and makes the charge one less negative. Carbonate, 2−, becomes hydrogen carbonate, 1−. Phosphate becomes hydrogen phosphate, then dihydrogen phosphate.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Brackets for more than one',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Ca^2+} + 2\\ \\ce{OH-} \\;\\Rightarrow\\; \\ce{Ca(OH)2}', '\\text{one ion: } \\ce{NaOH},\\ \\ce{CaCO3}', '\\ce{NH4+},\\ \\ce{PO4^3-}\\text{: LCM } 3', '3\\ \\ce{NH4+} \\text{ give } 3{+} \\;\\Rightarrow\\; \\ce{(NH4)3PO4}'] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the ion whole', md: '$\\ce{CaOH2}$ would mean one oxygen and two hydrogen atoms, not two hydroxide ions. Never change the subscripts **inside** a polyatomic ion.' }],
      lines: [
        { say: 'When a formula needs more than one of a polyatomic ion, put the ion in brackets with the number after them, as in calcium hydroxide.', show: 'm.0', focus: 'm.0' },
        { say: 'With only one polyatomic ion, leave the brackets out, as in sodium hydroxide and calcium carbonate.', show: 'm.1', focus: 'm.1' },
        { say: 'Now ammonium phosphate. Ammonium is one plus, and phosphate three minus. The lowest common multiple is three.', show: 'm.2', focus: 'm.2' },
        { say: 'Three ammonium ions give three plus, which cancels one phosphate ion. There is more than one ammonium ion, so it goes in brackets, with a three after it.', show: 'm.3', focus: 'm.3' },
        { say: 'Keep each ion whole. C A O H two would mean one oxygen and two hydrogen atoms, not two hydroxide ions.', caption: 'Keep each ion whole. CaOH₂ would mean one oxygen and two hydrogen atoms, not two hydroxide ions.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Aluminium forms $\\ce{Al^3+}$, and sulfate is $\\ce{SO4^2-}$. What is the formula of aluminium sulfate?',
          choices: ['$\\ce{Al2(SO4)3}$', '$\\ce{Al3(SO4)2}$', '$\\ce{AlSO4}$', '$\\ce{Al2S3O12}$'],
          answer: 0,
          working: 'The LCM of $3$ and $2$ is $6$: two $\\ce{Al^3+}$ give 6+ and three $\\ce{SO4^2-}$ give 6−. More than one sulfate, so it goes in brackets.',
        },
      ],
      lines: [
        { say: 'Your turn. Aluminium forms a three plus ion, and sulfate is two minus. What is the formula of aluminium sulfate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two aluminium ions give six plus, and three sulfate ions, in brackets, give six minus. Choice D has the right atoms, but it breaks the sulfate ions apart.', show: 'q.answer' },
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
            'A **polyatomic ion** is a group of bonded atoms with an overall charge, acting as one ion.',
            '-ate has one more oxygen than -ite; adding hydrogen makes the charge one less negative.',
            'More than one polyatomic ion: brackets, as in $\\ce{Ca(OH)2}$ and $\\ce{(NH4)3PO4}$.',
            'Never change the subscripts inside a polyatomic ion.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A polyatomic ion is a group of bonded atoms with an overall charge, and it acts as one ion.', show: 'sum.0' },
        { say: 'A name ending like nitrate means one more oxygen than one ending like nitrite, and adding hydrogen makes the charge one less negative.', show: 'sum.1' },
        { say: 'When a formula needs more than one polyatomic ion, put it in brackets.', show: 'sum.2' },
        { say: 'And never change the subscripts inside the ion. In part three, you will name ionic compounds. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
