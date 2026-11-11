import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-11-2',
  lessonId: 'cx-11-2',
  title: 'Transition Metals: Complex Ions, Colour and Catalysts',
  thumbnail: false,
  summary:
    'Ligands donate lone pairs to a central metal ion, forming complexes whose shape depends on the coordination number: octahedral for six, tetrahedral or square planar for four, linear for two. Complexes are coloured because d electrons absorb visible light, ΔE = hν, and the colour changes with the ligand, coordination number and oxidation state. Vanadium shows four oxidation states, and transition metals are good catalysts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Period 3 and Transition Metals', title: 'Transition Metal Complexes', subtitle: 'Ligands, colour and catalysts' }],
      lines: [
        { say: 'Copper sulfate solution is blue. Add ammonia and it turns a deep royal blue. Add hydrochloric acid instead and it turns yellow-green. Each colour is a different complex ion.', show: 'title' },
        { say: 'In this lesson, you will describe complex ions and their shapes, explain their colours, and see why transition metals make good catalysts.' },
      ],
    },
    {
      chapter: 'Ligands',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ligand', md: 'A molecule or ion that donates a **lone pair** to a central metal ion, forming a coordinate bond.' },
        { kind: 'bullets', id: 'b', items: ['Monodentate: $\\ce{H2O}$, $\\ce{NH3}$, $\\ce{Cl-}$', 'Bidentate: ethane-1,2-diamine, ethanedioate', 'Multidentate: $\\ce{EDTA^4-}$, with six bonds'] },
      ],
      lines: [
        { say: 'A ligand donates a lone pair to a metal ion, forming a coordinate bond. The number of these bonds is the coordination number.', show: 'def' },
        { say: 'Water, ammonia and chloride each form one bond.', show: 'b.0' },
        { say: 'Bidentate ligands form two, and E D T A forms six.', caption: 'Bidentate ligands form two, and EDTA forms six.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Shapes',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Coordination number', 'Shape', 'Example'], rows: [['6', 'octahedral', '$\\ce{[Cu(H2O)6]^2+}$'], ['4', 'tetrahedral', '$\\ce{[CuCl4]^2-}$'], ['4', 'square planar', 'cisplatin'], ['2', 'linear', '$\\ce{[Ag(NH3)2]+}$']] }],
      lines: [
        { say: 'Six small ligands, such as water, give an octahedral complex.', show: 't.0', focus: 't.0' },
        { say: 'Chloride ions are larger, so only four fit, in a tetrahedron. Platinum complexes such as cisplatin are square planar instead.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'And silver forms linear complexes with two ligands, as in Tollens’ reagent.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Colour',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta E = h\\nu'] },
        { kind: 'table', id: 't', head: ['Vanadium', '+5', '+4', '+3', '+2'], rows: [['Colour', 'yellow', 'blue', 'green', 'violet']] },
      ],
      lines: [
        { say: 'The ligands split the d orbitals into two levels. A d electron absorbs visible light to jump the gap, and we see the colours that are not absorbed.', show: 'm', focus: 'm' },
        { say: 'Changing the ligand, the coordination number or the oxidation state changes the gap, and so the colour.' },
        { say: 'Zinc in acid reduces vanadium step by step: yellow at plus five, blue at plus four, green at plus three, and violet at plus two.', caption: 'Zinc in acid reduces vanadium step by step: yellow at +5, blue at +4, green at +3, and violet at +2.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Catalysts',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Heterogeneous: iron in the Haber process, $\\ce{V2O5}$ in the Contact process', 'Homogeneous: $\\ce{Fe^2+}$ with peroxodisulfate and iodide', 'Autocatalysis: $\\ce{Mn^2+}$ with manganate(VII)'] }],
      lines: [
        { say: 'Heterogeneous catalysts are in a different phase. Reactants adsorb onto their surface, which can be poisoned by impurities.', show: 'b.0' },
        { say: 'Homogeneous catalysts work because transition metal ions can change oxidation state and change back.', show: 'b.1' },
        { say: 'And in autocatalysis, a product catalyses its own reaction.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the oxidation state of cobalt in $\\ce{[CoCl4]^2-}$, and what is its shape?',
          choices: ['+4, octahedral', '+2, octahedral', '+6, tetrahedral', '+2, tetrahedral'],
          answer: 3,
          working: 'Four $\\ce{Cl-}$ give −4, so cobalt is +2 to make −2 overall. Four large chloride ligands: **tetrahedral**.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the oxidation state of cobalt in C o C l four two minus, and what is its shape? Pause the video and try it.', caption: 'Your turn. What is the oxidation state of cobalt in [CoCl₄]²⁻, and what is its shape? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Four chloride ions give minus four, so cobalt is plus two, and four large ligands make it tetrahedral.', caption: 'The answer is D. Four chloride ions give −4, so cobalt is +2, and four large ligands make it tetrahedral.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Ligands donate lone pairs to a metal ion.', 'Six ligands: octahedral; four: tetrahedral or square planar.', 'Colour: d electrons absorb light, ΔE = hν.', 'Variable oxidation states make transition metals good catalysts.'] }],
      lines: [
        { say: 'Let’s sum up. Ligands donate lone pairs to a central metal ion.', show: 'sum.0' },
        { say: 'Six ligands give an octahedron, and four give a tetrahedron, or a square plane for platinum.', show: 'sum.1' },
        { say: 'Complexes are coloured because d electrons absorb visible light.', show: 'sum.2' },
        { say: 'And variable oxidation states make transition metals good catalysts.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
