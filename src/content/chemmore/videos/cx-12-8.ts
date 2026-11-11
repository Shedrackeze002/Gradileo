import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-8',
  lessonId: 'cx-12-8',
  title: 'NMR Spectroscopy and Chromatography',
  thumbnail: false,
  summary:
    'In NMR, each atom environment gives one peak, measured from TMS at δ = 0, with samples in solvents such as CDCl₃ that have no ¹H atoms. Carbon-13 NMR counts carbon environments; proton NMR adds the area ratio and the n + 1 splitting rule. Chromatography separates mixtures between a stationary and a mobile phase: TLC spots are identified by Rf values, and gas chromatography by retention times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'NMR and Chromatography', subtitle: 'Reading a molecule’s structure' }],
      lines: [
        { say: 'An M R I scanner in a hospital and an N M R spectrometer in a lab work the same way: nuclei in a magnetic field absorb radio waves, at frequencies that depend on their surroundings.', caption: 'An MRI scanner in a hospital and an NMR spectrometer in a lab work the same way: nuclei in a magnetic field absorb radio waves, at frequencies that depend on their surroundings.', show: 'title' },
        { say: 'In this lesson, you will interpret N M R spectra, and use chromatography to separate and identify substances.', caption: 'In this lesson, you will interpret NMR spectra, and use chromatography to separate and identify substances.' },
      ],
    },
    {
      chapter: 'NMR basics',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Each environment gives one peak, at a chemical shift δ', 'TMS is the standard at δ = 0', 'Solvents such as $\\ce{CDCl3}$ have no ¹H atoms', 'Carbon-13 NMR: count the carbon environments'] }],
      lines: [
        { say: 'Atoms in the same environment give one peak. Its position is the chemical shift, in parts per million.', show: 'b.0' },
        { say: 'T M S is the standard at zero. Its twelve hydrogens are all equivalent, giving one strong peak, and it is inert and easy to remove.', caption: 'TMS is the standard at δ = 0. Its twelve hydrogens are all equivalent, giving one strong peak, and it is inert and easy to remove.', show: 'b.1' },
        { say: 'Samples are dissolved in solvents with no ordinary hydrogen atoms, so the solvent gives no peaks of its own.', show: 'b.2' },
        { say: 'In carbon thirteen N M R, count the carbon environments. Ethanol has two.', caption: 'In carbon-13 NMR, count the carbon environments. Ethanol has two.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Proton NMR',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['H on the neighbouring carbon', '0', '1', '2', '3'], rows: [['Splitting', 'singlet', 'doublet', 'triplet', 'quartet']] },
        { kind: 'text', id: 'x', md: 'Ethyl ethanoate, $\\ce{CH3COOCH2CH3}$: singlet (3H), quartet (2H), triplet (3H).', size: 'md', align: 'center' },
      ],
      lines: [
        { say: 'In proton N M R, the number of peaks is the number of hydrogen environments, and the area under each peak shows how many hydrogens it has.', caption: 'In proton NMR, the number of peaks is the number of hydrogen environments, and the area under each peak shows how many hydrogens it has.' },
        { say: 'Each peak is split by the hydrogens on the next carbon. By the n plus one rule, n neighbouring hydrogens split it into n plus one lines.', caption: 'Each peak is split by the hydrogens on the next carbon. By the n + 1 rule, n neighbouring hydrogens split it into n + 1 lines.', show: 't', focus: 't' },
        { say: 'So ethyl ethanoate gives a singlet for the methyl next to the C double bond O, a quartet for the C H two, and a triplet for the end methyl, in the ratio three to two to three.', caption: 'So ethyl ethanoate gives a singlet for the CH₃ next to the C=O, a quartet for the CH₂, and a triplet for the end CH₃, in the ratio 3 : 2 : 3.', show: 'x' },
      ],
    },
    {
      chapter: 'Chromatography',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['R_f = \\dfrac{\\text{distance moved by the spot}}{\\text{distance moved by the solvent front}}', 'R_f = \\dfrac{3.4}{8.0} = 0.43'] }],
      lines: [
        { say: 'Chromatography separates a mixture between a stationary phase and a mobile phase. Each part is held back to a different extent.' },
        { say: 'In thin-layer chromatography, each spot is identified by its R f value: the distance the spot moved, divided by the distance the solvent moved.', caption: 'In thin-layer chromatography, each spot is identified by its Rf value: the distance the spot moved, divided by the distance the solvent moved.', show: 'm.0', focus: 'm.0' },
        { say: 'A spot that moves three point four centimetres while the solvent moves eight has an R f of zero point four three.', caption: 'A spot that moves 3.4 cm while the solvent moves 8.0 cm has an Rf of 0.43.', show: 'm.1', focus: 'm.1' },
        { say: 'Gas chromatography identifies each component by its retention time, the time it takes to pass through the column.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many peaks are there in the ¹H NMR spectrum of propanone, $\\ce{CH3COCH3}$?',
          choices: ['1', '2', '3', '6'],
          answer: 0,
          working: 'Both $\\ce{CH3}$ groups are in the **same environment**, so all six hydrogens give a single peak.',
        },
      ],
      lines: [
        { say: 'Your turn. How many peaks are there in the proton N M R spectrum of propanone? Pause the video and try it.', caption: 'Your turn. How many peaks are there in the ¹H NMR spectrum of propanone? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, one. Both methyl groups are in the same environment, so all six hydrogens give a single peak.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each environment gives one NMR peak; TMS is at δ = 0.', 'Proton NMR: peak areas and the n + 1 splitting rule.', 'Rf = spot distance ÷ solvent distance.', 'Gas chromatography separates by retention time.'] }],
      lines: [
        { say: 'Let’s sum up. Each environment gives one N M R peak, measured from T M S at zero.', caption: 'Let’s sum up. Each environment gives one NMR peak, measured from TMS at δ = 0.', show: 'sum.0' },
        { say: 'Proton N M R adds the peak areas and the n plus one splitting rule.', caption: 'Proton NMR adds the peak areas and the n + 1 splitting rule.', show: 'sum.1' },
        { say: 'An R f value is the spot distance divided by the solvent distance.', caption: 'An Rf value is the spot distance divided by the solvent distance.', show: 'sum.2' },
        { say: 'And gas chromatography separates components by their retention times.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
