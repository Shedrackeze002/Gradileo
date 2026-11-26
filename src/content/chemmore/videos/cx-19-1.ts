import type { Explainer } from '@/video/script.ts';
import { hydrogenAddsTwice } from '../../chem30/videos/lib/c30-molecules.ts';

const video: Explainer = {
  id: 'cx-19-1',
  lessonId: 'cx-19-1',
  title: 'Alkynes and Ethyne',
  thumbnail: 'tw',
  summary:
    'Alkynes are hydrocarbons with a carbon–carbon triple bond and the general formula CₙH₂ₙ₋₂, named with the ending -yne. Ethyne is made from calcium carbide and water and burns in oxygen with a flame hot enough to cut steel. The triple bond adds two molecules of hydrogen, bromine or a hydrogen halide, and only terminal alkynes give precipitates with ammoniacal silver nitrate or copper(I) chloride, which tells them apart from alkenes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Organic Chemistry and Biochemistry', title: 'Alkynes and Ethyne', subtitle: 'The carbon–carbon triple bond' }],
      lines: [
        { say: 'The flame of an oxy-acetylene torch is hot enough to cut through steel. Its fuel is ethyne, the simplest alkyne.', show: 'title' },
        { say: 'In this lesson, you will name alkynes, describe how ethyne is made and used, predict their addition reactions, and tell alkenes and alkynes apart.' },
      ],
    },
    {
      chapter: 'Naming alkynes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Alkyne', md: 'A hydrocarbon with a carbon–carbon **triple bond**. General formula $\\mathrm{C}_n\\mathrm{H}_{2n-2}$.' },
        { kind: 'table', id: 't', head: ['Structure', 'Name'], rows: [['HC≡CH', 'ethyne'], ['HC≡C–CH₃', 'propyne'], ['HC≡C–CH₂–CH₃', 'but-1-yne'], ['CH₃–C≡C–CH₃', 'but-2-yne']] },
      ],
      lines: [
        { say: 'An alkyne is a hydrocarbon with a carbon to carbon triple bond. The alkynes have the general formula C n H two n minus two.', caption: 'An alkyne is a hydrocarbon with a carbon–carbon triple bond. The alkynes have the general formula CₙH₂ₙ₋₂.', show: 'def' },
        { say: 'Name the longest chain containing the triple bond, end it in y-n-e, and number from the end nearer the triple bond. So ethyne, propyne, and then but-one-yne and but-two-yne, depending on where the triple bond sits.', caption: 'Name the longest chain containing the triple bond, end it in -yne, and number from the end nearer the triple bond. So ethyne, propyne, and then but-1-yne and but-2-yne, depending on where the triple bond sits.', show: 't' },
      ],
    },
    {
      chapter: 'Making ethyne',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}'] },
        { kind: 'math', id: 'v', size: 'md', lines: ['6.4 \\div 64 = 0.10\\ \\text{mol} \\;\\Rightarrow\\; 0.10 \\times 24 = 2.40\\ \\text{dm}^3'] },
      ],
      lines: [
        { say: 'Ethyne is made by adding water to calcium carbide. It burns in oxygen with a very hot flame, used for welding and cutting metals, and in air with a smoky flame, because it is so rich in carbon.', show: 'm' },
        { say: 'Six point four grams of calcium carbide is zero point one zero moles, which gives zero point one zero moles of ethyne, or two point four cubic decimetres at room temperature and pressure.', caption: '6.4 g of calcium carbide is 0.10 mol, which gives 0.10 mol of ethyne, or 2.40 dm³ at room temperature and pressure.', show: 'v', focus: 'v' },
      ],
    },
    {
      chapter: 'Adding hydrogen twice',
      layout: 'center',
      main: [hydrogenAddsTwice('tw')],
      lines: [
        { say: 'The triple bond is one sigma bond and two pi bonds, so an alkyne can add two molecules of a reagent. Here is ethyne with hydrogen, over a nickel catalyst.', show: 'tw' },
        { say: 'The first hydrogen molecule adds across the triple bond, which becomes a double bond. That is ethene.', play: 'tw.first' },
        { say: 'The second hydrogen molecule adds across the double bond, which becomes a single bond. That is ethane, which is saturated.', play: 'tw.second' },
      ],
    },
    {
      chapter: 'Other additions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HC#CH + 2Br2 -> CHBr2-CHBr2}', '\\ce{HC#CH + HCl -> H2C=CHCl} \\quad \\text{(chloroethene)}'] },
      ],
      lines: [
        { say: 'Bromine adds twice too, so ethyne decolourises bromine water, and the product has four bromine atoms.', show: 'm.0' },
        { say: 'With one mole of hydrogen chloride, ethyne gives chloroethene, the monomer of P V C.', caption: 'With one mole of hydrogen chloride, ethyne gives chloroethene, the monomer of PVC.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Telling them apart',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Alkane', 'Alkene', 'Terminal alkyne'], rows: [['Bromine water', 'no change', 'decolourised', 'decolourised'], ['Ammoniacal AgNO₃', 'no change', 'no change', 'white precipitate']] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Terminal alkyne', md: 'A hydrogen on a triple-bond carbon. Ammoniacal copper(I) chloride gives a **red** precipitate. But-2-yne has no such hydrogen, so it gives none.' },
      ],
      lines: [
        { say: 'Alkenes and alkynes both decolourise bromine water, so another test is needed.', show: 't.0' },
        { say: 'A terminal alkyne has a hydrogen on a triple-bond carbon. It gives a white precipitate with ammoniacal silver nitrate, and a red one with ammoniacal copper one chloride. Alkenes give neither, and nor does but-two-yne.', caption: 'A terminal alkyne has a hydrogen on a triple-bond carbon. It gives a white precipitate with ammoniacal silver nitrate, and a red one with ammoniacal copper(I) chloride. Alkenes give neither, and nor does but-2-yne.', show: ['t.1', 'k'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which compound gives a white precipitate with ammoniacal silver nitrate?',
          choices: ['But-2-yne', 'Propyne', 'Propene', 'Ethane'],
          answer: 1,
          working: 'Propyne, $\\ce{HC#C-CH3}$, is a terminal alkyne: it has a hydrogen on a triple-bond carbon.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound gives a white precipitate with ammoniacal silver nitrate: but-two-yne, propyne, propene or ethane? Pause the video and try it.', caption: 'Your turn. Which compound gives a white precipitate with ammoniacal silver nitrate: but-2-yne, propyne, propene or ethane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, propyne. It is a terminal alkyne, with a hydrogen on a triple-bond carbon. But-two-yne has its triple bond in the middle, so it has no such hydrogen.', caption: 'The answer is B, propyne. It is a terminal alkyne, with a hydrogen on a triple-bond carbon. But-2-yne has its triple bond in the middle, so it has no such hydrogen.', show: 'q.answer' },
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
            'Alkynes have a C≡C triple bond and the formula CₙH₂ₙ₋₂; names end in -yne.',
            'Ethyne comes from calcium carbide and water; it is used for welding.',
            'Alkynes add two molecules of H₂, Br₂ or HBr across the triple bond.',
            'Only terminal alkynes give precipitates with ammoniacal AgNO₃ or CuCl.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Alkynes have a carbon to carbon triple bond, and their names end in y-n-e.', caption: 'Let’s sum up. Alkynes have a carbon–carbon triple bond, and their names end in -yne.', show: 'sum.0' },
        { say: 'Ethyne is made from calcium carbide and water, and it is used for welding.', show: 'sum.1' },
        { say: 'Alkynes add two molecules of hydrogen, bromine or a hydrogen halide across the triple bond.', show: 'sum.2' },
        { say: 'And only terminal alkynes give precipitates with ammoniacal silver nitrate or copper one chloride.', caption: 'And only terminal alkynes give precipitates with ammoniacal silver nitrate or copper(I) chloride.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
