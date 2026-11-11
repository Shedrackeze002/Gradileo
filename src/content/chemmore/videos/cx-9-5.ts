import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-9-5',
  lessonId: 'cx-9-5',
  title: 'Organic Analysis',
  thumbnail: false,
  summary:
    'Test-tube reactions identify functional groups: bromine water for alkenes, acidified dichromate for primary and secondary alcohols, Tollens’ and Fehling’s for aldehydes, and hydrogencarbonate for acids. Infrared spectra show bonds by their wavenumbers, with a broad O–H and a sharp C=O, and the fingerprint region identifies the compound. High-resolution mass spectrometry tells apart formulas with the same whole-number mass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Mechanisms and Analysis', title: 'Organic Analysis', subtitle: 'What is in the flask?' }],
      lines: [
        { say: 'A chemist has made a colourless liquid. Is it an alcohol, an aldehyde or an acid? What is its formula? Test tubes, an infrared spectrometer and a mass spectrometer answer each question in turn.', show: 'title' },
        { say: 'In this lesson, you will identify functional groups, and find formulas from precise masses.' },
      ],
    },
    {
      chapter: 'Test-tube reactions',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Group', 'Test', 'Positive result'], rows: [['Alkene', 'bromine water', 'orange to colourless'], ['Primary or secondary alcohol', 'acidified dichromate', 'orange to green'], ['Aldehyde', 'Tollens’ reagent', 'silver mirror'], ['Carboxylic acid', 'sodium hydrogencarbonate', 'fizzing']] },
      ],
      lines: [
        { say: 'An alkene decolourises orange bromine water.', show: 't.0', focus: 't.0' },
        { say: 'A primary or secondary alcohol turns acidified dichromate from orange to green.', show: 't.1', focus: 't.1' },
        { say: 'An aldehyde gives a silver mirror with Tollens’ reagent, and a brick-red precipitate with Fehling’s solution. Ketones give neither.', show: 't.2', focus: 't.2' },
        { say: 'And a carboxylic acid fizzes with sodium hydrogencarbonate, giving carbon dioxide.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Infrared spectra',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Bond', 'Wavenumber'], rows: [['O–H in an alcohol', '3230–3550 cm⁻¹, broad'], ['O–H in an acid', '2500–3000 cm⁻¹, very broad'], ['C=O', '1680–1750 cm⁻¹, sharp']] },
      ],
      lines: [
        { say: 'Bonds absorb infrared radiation at frequencies that make them vibrate. Each type of bond absorbs in its own range of wavenumbers.' },
        { say: 'An alcohol shows a broad O H dip between about thirty-two hundred and thirty-five hundred.', caption: 'An alcohol shows a broad O–H dip between about 3200 and 3500.', show: 't.0', focus: 't.0' },
        { say: 'A carboxylic acid’s O H is even broader, lower down, and a C double bond O gives a sharp dip near seventeen hundred.', caption: 'A carboxylic acid’s O–H is even broader, lower down, and a C=O gives a sharp dip near 1700.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Below about fifteen hundred is the fingerprint region, unique to each compound. Matching it to a database identifies the compound exactly.', caption: 'Below about 1500 is the fingerprint region, unique to each compound. Matching it to a database identifies the compound exactly.' },
      ],
    },
    {
      chapter: 'Precise masses',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CO2}: 43.9898', '\\ce{C3H8}: 44.0624', '\\ce{C2H4O}: 44.0261'] }],
      lines: [
        { say: 'In a mass spectrum, the molecular ion peak gives the relative molecular mass. But carbon dioxide, propane and ethanal all have a mass of forty-four.', caption: 'In a mass spectrum, the molecular ion peak gives the relative molecular mass. But CO₂, C₃H₈ and C₂H₄O all have a mass of 44.', show: 'm' },
        { say: 'Precise atomic masses are not whole numbers, so a high-resolution instrument tells them apart. A molecular ion at forty-four point zero two six one must be C two H four O.', caption: 'Precise atomic masses are not whole numbers, so a high-resolution instrument tells them apart. A molecular ion at 44.0261 must be C₂H₄O.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An infrared spectrum has a very broad dip from 2500 to 3000 cm⁻¹ and a sharp dip at 1710 cm⁻¹. What is the compound?',
          choices: ['An alcohol', 'An alkene', 'A carboxylic acid', 'A ketone'],
          answer: 2,
          working: 'A very broad O–H at 2500–3000 **and** a C=O near 1700 together show a **carboxylic acid**.',
        },
      ],
      lines: [
        { say: 'Your turn. An infrared spectrum has a very broad dip from twenty-five hundred to three thousand, and a sharp dip at seventeen hundred ten. What is the compound? Pause the video and try it.', caption: 'Your turn. An infrared spectrum has a very broad dip from 2500 to 3000 cm⁻¹, and a sharp dip at 1710 cm⁻¹. What is the compound? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, a carboxylic acid. It has both a very broad acid O H and a C double bond O.', caption: 'The answer is C, a carboxylic acid. It has both a very broad acid O–H and a C=O.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Bromine water, dichromate, Tollens’ and hydrogencarbonate identify groups.', 'IR: broad O–H, sharp C=O near 1700 cm⁻¹.', 'The fingerprint region identifies the exact compound.', 'Precise masses tell apart formulas of the same whole-number mass.'] }],
      lines: [
        { say: 'Let’s sum up. Bromine water, dichromate, Tollens’ reagent and hydrogencarbonate identify functional groups.', show: 'sum.0' },
        { say: 'In infrared, look for a broad O H and a sharp C double bond O.', caption: 'In infrared, look for a broad O–H and a sharp C=O.', show: 'sum.1' },
        { say: 'The fingerprint region identifies the exact compound.', show: 'sum.2' },
        { say: 'And precise masses tell apart formulas with the same whole-number mass.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
