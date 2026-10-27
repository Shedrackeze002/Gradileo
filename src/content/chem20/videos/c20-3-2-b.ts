import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-2-b',
  lessonId: 'c20-3-2',
  title: 'Solubility and Precipitates, Part 2: The Solubility Rules',
  thumbnailTitle: 'The Solubility Rules',
  thumbnail: false,
  summary:
    'The solubility rules sort ionic compounds by their anion into high and low solubility, and list the cations that are exceptions. Find the anion’s row first, then check whether the cation is an exception; compounds of group 1 ions and ammonium, and all nitrates and acetates, have high solubility.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'The Solubility Rules', subtitle: 'High or low solubility?' }],
      lines: [
        { say: 'A litre of water dissolves hundreds of grams of some ionic compounds, and only a tiny trace of others.', show: 'title' },
        { say: 'In this part, you will use the solubility rules to decide whether an ionic compound has high or low solubility in water.' },
      ],
    },
    {
      chapter: 'The solubility rules',
      layout: 'center',
      main: [
        { kind: 'text', id: 'hl', size: 'md', align: 'center', md: '**High solubility:** a lot dissolves. **Low solubility:** only a tiny amount dissolves.' },
        {
          kind: 'table',
          id: 't',
          head: ['Anion', 'High solubility', 'Low solubility'],
          rows: [
            ['nitrate, $\\ce{NO3-}$', 'all', 'none'],
            ['acetate, $\\ce{CH3COO-}$', 'all', 'none'],
            ['chloride $\\ce{Cl-}$, bromide $\\ce{Br-}$, iodide $\\ce{I-}$', 'most', 'those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$'],
            ['sulfate, $\\ce{SO4^2-}$', 'most', 'those of $\\ce{Ca^2+}$, $\\ce{Sr^2+}$, $\\ce{Ba^2+}$, $\\ce{Pb^2+}$ and $\\ce{Ag+}$'],
          ],
        },
      ],
      lines: [
        { say: 'In this course, an ionic compound has either high solubility, when a lot of it dissolves, or low solubility, when only a tiny amount dissolves.', show: 'hl' },
        { say: 'Low solubility does not mean none at all. But it is so little that when its ions meet in a solution, nearly all of them come out as a solid.' },
        { say: 'The solubility rules sort ionic compounds by their anion. Nitrates and acetates all have high solubility, with no exceptions.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Chlorides, bromides and iodides mostly have high solubility, except those of silver, lead two and copper one.', caption: 'Chlorides, bromides and iodides mostly have high solubility, except those of Ag⁺, Pb²⁺ and Cu⁺.', show: 't.2', focus: 't.2' },
        { say: 'Sulfates mostly have high solubility, except those of calcium, strontium, barium, lead two and silver.', caption: 'Sulfates mostly have high solubility, except those of Ca²⁺, Sr²⁺, Ba²⁺, Pb²⁺ and Ag⁺.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Rows that run the other way',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Anion', 'High solubility', 'Low solubility'],
          rows: [
            ['hydroxide, $\\ce{OH-}$', 'those of group 1 ions, $\\ce{NH4+}$, $\\ce{Sr^2+}$ and $\\ce{Ba^2+}$', 'most'],
            ['carbonate $\\ce{CO3^2-}$, phosphate $\\ce{PO4^3-}$', 'those of group 1 ions and $\\ce{NH4+}$', 'most'],
            ['sulfide, $\\ce{S^2-}$', 'those of group 1 and group 2 ions and $\\ce{NH4+}$', 'most'],
          ],
        },
      ],
      lines: [
        { say: 'The last rows run the other way. Most hydroxides, carbonates, phosphates and sulfides have low solubility, and the exceptions are the compounds with high solubility.', show: 't' },
      ],
    },
    {
      chapter: 'Always high solubility',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'note', tone: 'key', title: 'Always high solubility', md: 'Compounds of the **group 1 ions** ($\\ce{Li+}$, $\\ce{Na+}$, $\\ce{K+}$, $\\ce{Rb+}$, $\\ce{Cs+}$) and of the **ammonium ion**, $\\ce{NH4+}$, and all **nitrates** and **acetates**.' },
        { kind: 'callout', id: 'how', tone: 'tip', title: 'Two steps', md: '**1.** Find the row for the compound’s **anion**. **2.** Check whether its **cation** is one of the exceptions in that row.' },
      ],
      lines: [
        { say: 'Look along the rows, and one pattern stands out. In every row, compounds of the group one ions, and of the ammonium ion, have high solubility.', show: 'note' },
        { say: 'So do all nitrates and all acetates. A compound that contains any of these ions has high solubility.' },
        { say: 'For any other compound, use two steps. First, find the row for the compound’s anion. Then check whether its cation is one of the exceptions in that row.', show: 'how' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'split',
      leftWidth: 544,
      left: [
        { kind: 'text', id: 'h1', size: 'md', md: '**Lead(II) chloride**, $\\ce{PbCl2}$' },
        { kind: 'bullets', id: 'a', items: ['Anion: chloride. High, except those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$.', 'Cation: $\\ce{Pb^2+}$, an exception.', '**Low solubility**'] },
      ],
      right: [
        { kind: 'text', id: 'h2', size: 'md', md: '**Barium hydroxide**, $\\ce{Ba(OH)2}$' },
        { kind: 'bullets', id: 'b', items: ['Anion: hydroxide. Low, except those of group 1 ions, $\\ce{NH4+}$, $\\ce{Sr^2+}$ and $\\ce{Ba^2+}$.', 'Cation: $\\ce{Ba^2+}$, an exception.', '**High solubility**'] },
      ],
      lines: [
        { say: 'Does lead two chloride have high or low solubility? The anion is chloride, and chlorides have high solubility, except those of silver, lead two and copper one.', caption: 'Does lead(II) chloride, PbCl₂, have high or low solubility? The anion is chloride, and chlorides have high solubility, except those of Ag⁺, Pb²⁺ and Cu⁺.', show: ['h1', 'a.0'] },
        { say: 'The cation is the lead two ion, one of the exceptions. So lead two chloride has low solubility.', caption: 'The cation is Pb²⁺, one of the exceptions. So lead(II) chloride has low solubility.', show: ['a.1', 'a.2'], focus: 'a.2' },
        { say: 'Now barium hydroxide. Hydroxides have low solubility, except those of group one ions, ammonium, strontium and barium.', show: ['h2', 'b.0'] },
        { say: 'The cation is the barium ion, one of the exceptions. So barium hydroxide has high solubility.', show: ['b.1', 'b.2'], focus: 'b.2' },
      ],
    },
    {
      chapter: 'Start with the anion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Start with the anion', md: 'Silver nitrate, $\\ce{AgNO3}$, has **high** solubility: all nitrates do. And for hydroxides, carbonates, phosphates and sulfides, the exceptions have **high** solubility.' },
        {
          kind: 'table',
          id: 't',
          head: ['Compound', 'Row', 'Exception?', 'Solubility'],
          rows: [
            ['$\\ce{CaSO4}$', 'sulfate', 'yes, $\\ce{Ca^2+}$', 'low'],
            ['$\\ce{MgSO4}$', 'sulfate', 'no', 'high'],
            ['$\\ce{Cu(OH)2}$', 'hydroxide', 'no', 'low'],
            ['$\\ce{(NH4)3PO4}$', 'phosphate', 'yes, $\\ce{NH4+}$', 'high'],
          ],
        },
      ],
      lines: [
        { say: 'Silver appears among the exceptions in several rows, but silver nitrate has high solubility, because all nitrates do. So always find the anion’s row first, and notice which way the row runs.', show: 'mis' },
        { say: 'Calcium sulfate is an exception in the sulfate row, so it has low solubility. Magnesium sulfate is not, so it has high solubility.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Copper two hydroxide is not an exception, so, like most hydroxides, it has low solubility. Ammonium phosphate is an exception, so it has high solubility.', caption: 'Copper(II) hydroxide is not an exception, so, like most hydroxides, it has low solubility. Ammonium phosphate is an exception, so it has high solubility.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which compound has **low** solubility in water? Sulfates have high solubility, except those of $\\ce{Ca^2+}$, $\\ce{Sr^2+}$, $\\ce{Ba^2+}$, $\\ce{Pb^2+}$ and $\\ce{Ag+}$, which have low solubility.',
          choices: ['$\\ce{BaSO4}$', '$\\ce{Na2SO4}$', '$\\ce{CuSO4}$', '$\\ce{MgSO4}$'],
          answer: 0,
          working: 'All four are sulfates. Only $\\ce{Ba^2+}$ is one of the exceptions, so barium sulfate has low solubility; the others have high solubility.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound has low solubility in water? The sulfate rule is on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, barium sulfate. All four are sulfates, and only the barium ion is one of the exceptions. Sodium sulfate has high solubility, as every compound of a group one ion does.', show: 'q.answer' },
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
            'The solubility rules sort ionic compounds by **anion** into high and low solubility.',
            'Find the anion’s row first, then check whether the cation is an exception.',
            'Group 1 ions, $\\ce{NH4+}$, nitrates and acetates: always high solubility.',
            'For hydroxides, carbonates, phosphates and sulfides, the exceptions have **high** solubility.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The solubility rules sort ionic compounds by their anion, into high and low solubility.', show: 'sum.0' },
        { say: 'Find the anion’s row first, then check whether the cation is an exception.', show: 'sum.1' },
        { say: 'Compounds of group one ions and ammonium, and all nitrates and acetates, always have high solubility.', show: 'sum.2' },
        { say: 'And for hydroxides, carbonates, phosphates and sulfides, the exceptions have high solubility. In part three, you will use them to predict precipitates. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
