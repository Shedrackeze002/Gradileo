import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balls } from './lib/c10-3-figures.ts';

// The sulfate ion: one sulfur atom and four oxygen atoms, with one charge of 2− for the group.
const sulfate = figure(
  'so4',
  [
    balls({
      atoms: [
        { id: 's', symbol: 'S', at: [0, 0], r: 0.62, tone: 'theta' },
        { id: 'o1', symbol: 'O', at: [0, 1.45], tone: 'bad' },
        { id: 'o2', symbol: 'O', at: [1.45, 0], tone: 'bad' },
        { id: 'o3', symbol: 'O', at: [0, -1.45], tone: 'bad' },
        { id: 'o4', symbol: 'O', at: [-1.45, 0], tone: 'bad' },
      ],
      bonds: [['s', 'o1'], ['s', 'o2'], ['s', 'o3'], ['s', 'o4']],
      charge: '2{-}',
      half: [2.25, 2.25],
    }),
  ],
  440,
);

// Calcium hydroxide: one Ca²⁺ ion and two OH⁻ ions.
const limewater = figure(
  'caoh',
  [
    balls({ name: 'ca', atoms: [{ id: 'ca', symbol: 'Ca', at: [0, 0], r: 0.7, tone: 'opp' }], charge: '2{+}', half: [1.05, 1.05] }),
    balls({ name: 'oh1', atoms: [{ id: 'o', symbol: 'O', at: [3.3, 1.5], tone: 'bad' }, { id: 'h', symbol: 'H', at: [4.35, 1.5], r: 0.38, tone: 'adj' }], bonds: [['o', 'h']], charge: '-', half: [1.35, 0.85] }),
    balls({ name: 'oh2', atoms: [{ id: 'o', symbol: 'O', at: [3.3, -1.5], tone: 'bad' }, { id: 'h', symbol: 'H', at: [4.35, -1.5], r: 0.38, tone: 'adj' }], bonds: [['o', 'h']], charge: '-', half: [1.35, 0.85] }),
  ],
  440,
);

const video: Explainer = {
  id: 'c10-3-2-d',
  lessonId: 'c10-3-2',
  title: 'Ionic Compounds: Names and Formulas, Part 4: Polyatomic Ions',
  thumbnailTitle: 'Polyatomic Ions',
  thumbnail: 'so4',
  summary:
    'A polyatomic ion is a group of bonded atoms with an overall charge, such as sulfate, SO4 2-. The five common ones are ammonium NH4+, hydroxide OH-, nitrate NO3-, sulfate SO4 2- and carbonate CO3 2-; they keep their names in compounds (calcium carbonate, ammonium chloride). More than one of a polyatomic ion goes in brackets: Ca(OH)2 and (NH4)2SO4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 4', title: 'Polyatomic Ions', subtitle: 'Groups of atoms with one charge' }],
      lines: [
        { say: 'Chalk, Epsom salts and many fertilizers contain ions made of several atoms joined together.', show: 'title' },
        { say: 'In this last part, you will meet five of these ions, name their compounds, and write their formulas, with brackets where they are needed.' },
      ],
    },
    {
      chapter: 'A group with one charge',
      layout: 'split',
      left: [sulfate],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Polyatomic ion', md: 'A group of atoms, bonded together, that carries an overall charge. The sulfate ion, $\\ce{SO4^2-}$, is one sulfur atom and four oxygen atoms with a total charge of 2−.' }],
      lines: [
        { say: 'A polyatomic ion is a group of atoms, bonded together, that carries an overall charge.', show: 'def' },
        { say: 'The sulfate ion, S O four, two minus, is one sulfur atom and four oxygen atoms, with a total charge of two minus.', caption: 'The sulfate ion, SO₄²⁻, is one sulfur atom and four oxygen atoms, with a total charge of 2−.', show: ['so4.model', 'so4.bracket'] },
        { say: 'The whole group carries the charge and stays together through reactions, so you treat it as a single ion.', focus: 'so4.bracket' },
      ],
    },
    {
      chapter: 'Five common ions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Name', 'Formula', 'Charge', 'Found in'],
          rows: [
            ['ammonium', '$\\ce{NH4+}$', '1+', 'fertilizers, such as ammonium nitrate'],
            ['hydroxide', '$\\ce{OH-}$', '1−', 'sodium hydroxide, used in soap-making'],
            ['nitrate', '$\\ce{NO3-}$', '1−', 'fertilizers'],
            ['sulfate', '$\\ce{SO4^2-}$', '2−', 'Epsom salts, magnesium sulfate'],
            ['carbonate', '$\\ce{CO3^2-}$', '2−', 'chalk and limestone, calcium carbonate'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Endings', md: '**-ide** usually means one atom ($\\ce{S^2-}$, sulfide); **-ate** means the ion also contains oxygen ($\\ce{SO4^2-}$, sulfate). Hydroxide is the exception.' },
      ],
      lines: [
        { say: 'These five are the ones you will meet most often. Ammonium, N H four plus, is the only positive one. It takes the place of a metal ion, so its compounds are ionic even though they contain no metal.', caption: 'These five are the ones you will meet most often. Ammonium, NH₄⁺, is the only positive one. It takes the place of a metal ion, so its compounds are ionic even though they contain no metal.', show: 't.0', focus: 't.0' },
        { say: 'Hydroxide, O H minus, is in sodium hydroxide, used in soap-making. Nitrate, N O three minus, is in fertilizers.', caption: 'Hydroxide, OH⁻, is in sodium hydroxide, used in soap-making. Nitrate, NO₃⁻, is in fertilizers.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Sulfate, two minus, is in Epsom salts, magnesium sulfate. And carbonate, C O three, two minus, is in chalk and limestone, calcium carbonate.', caption: 'Sulfate, 2−, is in Epsom salts, magnesium sulfate. And carbonate, CO₃²⁻, is in chalk and limestone, calcium carbonate.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'Watch the endings. Sulfide is one sulfur atom, while sulfate and nitrate also contain oxygen. Hydroxide is the exception: it ends like sulfide, but has two atoms.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Names and brackets',
      layout: 'split',
      leftWidth: 500,
      left: [limewater],
      right: [
        { kind: 'math', id: 'n', size: 'md', align: 'left', lines: ['\\ce{NaOH}\\text{: sodium hydroxide}', '\\ce{NH4Cl}\\text{: ammonium chloride}'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Ca^2+} \\text{ needs two } \\ce{OH-}', '\\ce{Ca(OH)2}', '\\text{two } \\ce{NH4+} \\text{ for one } \\ce{SO4^2-}', '\\ce{(NH4)2SO4}'] },
      ],
      lines: [
        { say: 'A polyatomic ion keeps its name in a compound. N A O H is sodium hydroxide, and N H four C L is ammonium chloride.', caption: 'A polyatomic ion keeps its name in a compound. NaOH is sodium hydroxide, and NH₄Cl is ammonium chloride.', show: 'n' },
        { say: 'To write a formula, cancel the charges as before. For calcium hydroxide, one calcium ion gives two plus, so it needs two hydroxide ions.', show: ['caoh.ca-model', 'caoh.ca-bracket', 'caoh.oh1-model', 'caoh.oh1-bracket', 'caoh.oh2-model', 'caoh.oh2-bracket', 'm.0'], focus: 'm.0' },
        { say: 'When you need more than one of a polyatomic ion, put it in brackets, with the number after the bracket. Calcium hydroxide is written C A, then O H in brackets, then a small two.', caption: 'When you need more than one of a polyatomic ion, put it in brackets, with the number after the bracket. Calcium hydroxide is written Ca(OH)₂.', show: 'm.1', focus: 'm.1' },
        { say: 'For ammonium sulfate, two ammonium ions give two plus, which cancels one sulfate ion.', show: 'm.2', focus: 'm.2' },
        { say: 'The two ammonium ions go in brackets. There is only one sulfate ion, so it needs none: N H four in brackets, two, S O four.', caption: 'The two ammonium ions go in brackets. There is only one sulfate ion, so it needs none: (NH₄)₂SO₄.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Keep the ion whole',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep a polyatomic ion whole', md: '$\\ce{CaOH2}$ would mean one oxygen atom and two hydrogen atoms. Two hydroxide ions hold two of each: $\\ce{Ca(OH)2}$.' },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Metals with more than one charge', md: 'A few metals, such as iron and copper, form ions with different charges. Their names carry a Roman numeral, such as iron(III) oxide. The questions here use only metals with one ion.' },
      ],
      lines: [
        { say: 'Never write C A O H two: that means one oxygen atom and two hydrogen atoms. Never change the numbers inside a polyatomic ion. Brackets show how many of the whole ion there are.', caption: 'Never write CaOH₂: that means one oxygen atom and two hydrogen atoms. Never change the numbers inside a polyatomic ion. Brackets show how many of the whole ion there are.', show: 'oops' },
        { say: 'One last note: a few metals, such as iron and copper, form ions with different charges, so their names carry a Roman numeral, as in iron three oxide. Those names come in a later course.', caption: 'One last note: a few metals, such as iron and copper, form ions with different charges, so their names carry a Roman numeral, as in iron(III) oxide. Those names come in a later course.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the formula of magnesium nitrate? (Magnesium is in group $2$, and the nitrate ion is $\\ce{NO3-}$.)',
          choices: ['$\\ce{MgNO3}$', '$\\ce{Mg2NO3}$', '$\\ce{Mg(NO3)2}$', '$\\ce{Mg3N2}$'],
          answer: 2,
          working: 'The ions are $\\ce{Mg^2+}$ and $\\ce{NO3-}$, so one magnesium ion needs two nitrate ions, and more than one goes in brackets.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the formula of magnesium nitrate? Magnesium is in group two, and the nitrate ion is N O three minus. Pause the video and try it.', caption: 'Your turn. Which is the formula of magnesium nitrate? Magnesium is in group two, and the nitrate ion is NO₃⁻. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. One magnesium ion needs two nitrate ions, and more than one goes in brackets. Choice D is magnesium nitride: nitrate and nitride are different ions.', show: 'q.answer' },
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
            'A **polyatomic ion** is a group of bonded atoms with an overall charge. It keeps its name in compounds.',
            'Ammonium $\\ce{NH4+}$, hydroxide $\\ce{OH-}$, nitrate $\\ce{NO3-}$, sulfate $\\ce{SO4^2-}$, carbonate $\\ce{CO3^2-}$.',
            'More than one of a polyatomic ion goes in brackets: $\\ce{Ca(OH)2}$, $\\ce{(NH4)2SO4}$.',
            'Never change the numbers inside a polyatomic ion.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A polyatomic ion is a group of bonded atoms with an overall charge, and it keeps its name in compounds.', show: 'sum.0' },
        { say: 'Learn these five: ammonium, hydroxide, nitrate, sulfate and carbonate.', show: 'sum.1' },
        { say: 'When there is more than one of a polyatomic ion, put it in brackets.', show: 'sum.2' },
        { say: 'And never change the numbers inside it. That completes this lesson on ionic compounds. Next, you will see how non-metal atoms bond by sharing electrons.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
