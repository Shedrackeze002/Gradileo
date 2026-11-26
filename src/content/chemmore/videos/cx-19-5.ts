import type { Explainer } from '@/video/script.ts';
import { chromatography, still } from '../../chem10/videos/lib/c10-particles.ts';

const video: Explainer = {
  id: 'cx-19-5',
  lessonId: 'cx-19-5',
  title: 'Purifying and Analysing Organic Compounds',
  thumbnail: 'cr',
  summary:
    'An organic compound is purified by distillation, fractional distillation, recrystallisation, solvent extraction, chromatography or steam distillation, and a pure solid melts sharply while impurities lower and widen its melting range. Lassaigne’s test detects nitrogen as Prussian blue, sulfur as black lead sulfide and halogens as silver halide precipitates. In combustion analysis, carbon is found from the carbon dioxide (× 12/44), hydrogen from the water (× 2/18) and oxygen by difference, giving the empirical formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Organic Chemistry and Biochemistry', title: 'Purifying and Analysing Organic Compounds', subtitle: 'Is it pure, and what is it made of?' }],
      lines: [
        { say: 'A chemist who makes a new compound has two questions. Is it pure, and what is it made of?', show: 'title' },
        { say: 'In this lesson, you will choose a way to purify an organic compound, test its purity, detect the elements in it, and find its empirical formula by burning it.' },
      ],
    },
    {
      chapter: 'Distillation up close',
      layout: 'center',
      main: [still('di', 380)],
      lines: [
        { say: 'Simple distillation separates a liquid from a substance that does not boil. Here the flask is heated on the left, and the condenser is cooled on the right.', show: 'di' },
        { say: 'The liquid boils, its molecules escape over the top, and they condense on the cold side, while the dissolved solid stays behind.', play: 'di.boil' },
      ],
    },
    {
      chapter: 'Choosing a method',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'Used to'],
          rows: [
            ['Simple distillation', 'get a liquid from a non-volatile impurity'],
            ['Fractional distillation', 'separate liquids with close boiling points'],
            ['Recrystallisation', 'purify a solid with a little soluble impurity'],
            ['Solvent extraction', 'move a compound from water into a better solvent'],
            ['Steam distillation', 'extract oils from plants below their boiling point'],
          ],
        },
      ],
      lines: [
        { say: 'Fractional distillation separates liquids with close boiling points. Solvent extraction moves a compound out of water into a solvent it dissolves in better, and steam distillation extracts oils from plants.', show: ['t.0', 't.1', 't.3', 't.4'] },
        { say: 'In recrystallisation, the solid is dissolved in the least hot solvent. As it cools, the compound crystallises, while the small amount of impurity stays dissolved. The crystals are filtered, washed with a little cold solvent, and dried.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Chromatography and purity',
      layout: 'center',
      main: [chromatography('cr', 380)],
      lines: [
        { say: 'Chromatography separates the parts of a mixture. Each dye is carried up the paper by the solvent at its own speed, so ink X splits into two spots, matching dyes A and B.', show: 'cr', play: 'cr.run' },
        { say: 'A pure substance gives one spot. A pure solid also melts sharply, at a fixed temperature, while impurities lower its melting point and make it melt over a range.' },
      ],
    },
    {
      chapter: 'Detecting the elements',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Element', 'Test on the sodium fusion extract', 'Result'], rows: [['Nitrogen', 'iron(II) sulfate, then acid', 'Prussian blue'], ['Sulfur', 'lead(II) ethanoate', 'black precipitate'], ['Halogen', 'boil with HNO₃, then AgNO₃', 'white, cream or yellow']] },
      ],
      lines: [
        { say: 'Carbon and hydrogen are shown by heating the compound with copper two oxide: the carbon dioxide turns limewater milky, and the water turns white copper sulfate blue.', caption: 'Carbon and hydrogen are shown by heating the compound with copper(II) oxide: the carbon dioxide turns limewater milky, and the water turns white copper sulfate blue.' },
        { say: 'In Lassaigne’s test, the compound is heated with sodium, which turns nitrogen into cyanide, sulfur into sulfide, and halogens into halides. Nitrogen then gives Prussian blue, and sulfur a black precipitate.', show: ['t.0', 't.1'] },
        { say: 'For a halogen, the extract is boiled with nitric acid first, to remove cyanide and sulfide ions, then silver nitrate gives a white, cream or yellow precipitate.', show: 't.2' },
      ],
    },
    {
      chapter: 'Combustion analysis',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '0.600 g of a compound of C, H and O gives 0.880 g of CO₂ and 0.360 g of water.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{C} = 0.880 \\times \\tfrac{12}{44} = 0.240 \\qquad \\text{H} = 0.360 \\times \\tfrac{2}{18} = 0.040', '\\text{O} = 0.600 - 0.240 - 0.040 = 0.320\\ \\text{g}', '0.020 : 0.040 : 0.020 = 1 : 2 : 1 \\;\\Rightarrow\\; \\ce{CH2O}'] },
      ],
      lines: [
        { say: 'In combustion analysis, a weighed sample is burned completely, and the carbon dioxide and water are weighed. Here, zero point six grams of a compound gives zero point eight eight zero grams of carbon dioxide and zero point three six zero grams of water.', caption: 'In combustion analysis, a weighed sample is burned completely, and the carbon dioxide and water are weighed. Here, 0.600 g of a compound gives 0.880 g of carbon dioxide and 0.360 g of water.', show: 'q' },
        { say: 'Carbon is twelve forty-fourths of the carbon dioxide, zero point two four zero grams, and hydrogen is two eighteenths of the water, zero point zero four zero grams.', caption: 'Carbon is 12/44 of the carbon dioxide, 0.240 g, and hydrogen is 2/18 of the water, 0.040 g.', show: 'm.0', focus: 'm.0' },
        { say: 'Oxygen is found by difference: zero point three two zero grams.', caption: 'Oxygen is found by difference: 0.320 g.', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing by the atomic masses gives a ratio of one to two to one, so the empirical formula is C H two O.', caption: 'Dividing by the atomic masses gives a ratio of 1 : 2 : 1, so the empirical formula is CH₂O.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hydrocarbon burns to give 0.880 g of $\\ce{CO2}$ and 0.540 g of water. What is its empirical formula?',
          choices: ['$\\ce{CH2}$', '$\\ce{CH4}$', '$\\ce{C2H5}$', '$\\ce{CH3}$'],
          answer: 3,
          working: 'C $= 0.880 \\times 12 \\div 44 = 0.240$ g $= 0.020$ mol; H $= 0.540 \\times 2 \\div 18 = 0.060$ g $= 0.060$ mol; ratio $1 : 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A hydrocarbon burns to give zero point eight eight zero grams of carbon dioxide and zero point five four zero grams of water. What is its empirical formula? Pause the video and try it.', caption: 'Your turn. A hydrocarbon burns to give 0.880 g of carbon dioxide and 0.540 g of water. What is its empirical formula? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, C H three. The carbon is zero point zero two zero moles and the hydrogen zero point zero six zero moles, a ratio of one to three.', caption: 'The answer is D, CH₃. The carbon is 0.020 mol and the hydrogen 0.060 mol, a ratio of 1 : 3.', show: 'q.answer' },
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
            'Choose distillation, recrystallisation, extraction or chromatography by the mixture.',
            'Pure solids melt sharply; impurities lower and widen the melting range.',
            'Lassaigne: N gives Prussian blue, S black PbS, halogens silver halides.',
            'Combustion: C from CO₂ (× 12/44), H from H₂O (× 2/18), O by difference.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Choose distillation, recrystallisation, extraction or chromatography to suit the mixture.', show: 'sum.0' },
        { say: 'A pure solid melts sharply, and impurities lower and widen the melting range.', show: 'sum.1' },
        { say: 'In Lassaigne’s test, nitrogen gives Prussian blue, sulfur black lead sulfide, and halogens silver halide precipitates.', show: 'sum.2' },
        { say: 'And in combustion analysis, carbon comes from the carbon dioxide, hydrogen from the water, and oxygen by difference.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
