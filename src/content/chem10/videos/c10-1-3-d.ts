import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chromatogram } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-3-d',
  lessonId: 'c10-1-3',
  title: 'Separating Mixtures, Part 4: Rf Values',
  thumbnailTitle: 'Rf Values',
  thumbnail: 'cg',
  summary:
    'The Rf value of a substance is the distance its spot moves divided by the distance the solvent moves, both measured from the baseline. It has no unit and is less than 1. In the same solvent, a substance always has the same Rf value, so matching Rf values identifies the dyes in an ink; and distance moved by the spot = Rf × distance moved by the solvent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 4', title: '$R_f$ Values', subtitle: 'Measuring a chromatogram' }],
      lines: [
        { say: 'Two inks can look exactly the same, yet contain different dyes. Measuring how far each spot travels tells them apart.', show: 'title' },
        { say: 'In this part, you will calculate R f values, and use them to identify substances and predict distances.', caption: 'In this part, you will calculate Rf values, and use them to identify substances and predict distances.' },
      ],
    },
    {
      chapter: 'The Rf value',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rf', size: 'lg', lines: ['R_f = \\dfrac{\\text{distance moved by the spot}}{\\text{distance moved by the solvent}}'] },
        { kind: 'bullets', id: 'facts', items: ['Both distances are measured **from the baseline**.', 'No unit, and always **less than 1**.', 'In the same solvent and paper, a substance always has the **same** $R_f$ value.'] },
      ],
      lines: [
        { say: 'The R f value of a substance is the distance its spot moves, divided by the distance the solvent moves.', caption: 'The Rf value of a substance is the distance its spot moves, divided by the distance the solvent moves.', show: 'rf' },
        { say: 'Both distances are measured from the baseline, where the spots started.', show: 'facts.0' },
        { say: 'The R f value has no unit, and it is always less than one, because a spot can never travel further than the solvent.', caption: 'The Rf value has no unit, and it is always less than one, because a spot can never travel further than the solvent.', show: 'facts.1' },
        { say: 'In the same solvent, on the same kind of paper, a substance always has the same R f value, so the value can identify it.', caption: 'In the same solvent, on the same kind of paper, a substance always has the same Rf value, so the value can identify it.', show: 'facts.2' },
      ],
    },
    {
      chapter: 'Finding Rf values',
      layout: 'split',
      leftWidth: 620,
      left: [figure('cg', [chromatogram()])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{solvent: } 9 - 1 = 8\\text{ cm}', '\\text{lower: } \\dfrac{3 - 1}{8} = \\dfrac{2}{8} = 0.25', '\\text{upper: } \\dfrac{7 - 1}{8} = \\dfrac{6}{8} = 0.75'],
        },
        { kind: 'text', id: 'id', size: 'md', align: 'left', md: 'Dye A: $0.25$. Dye B: $0.75$. Ink X contains **A and B**.' },
      ],
      lines: [
        { say: 'Here is the chromatogram from part three. The baseline is one centimetre above the bottom edge, and the solvent front nine centimetres, so the solvent moved eight centimetres.', show: ['cg.paper', 'cg.baseline', 'cg.front', 'cg.names', 'cg.x-spots', 'cg.a-spot', 'cg.b-spot', 'cg.solvent', 'm.0'], focus: ['cg.solvent', 'm.0'] },
        { say: 'The lower spot of ink X is three centimetres above the edge, so it moved two centimetres. Its R f value is two over eight: zero point two five.', caption: 'The lower spot of ink X is three centimetres above the edge, so it moved two centimetres. Its Rf value is two over eight: 0.25.', show: ['cg.low', 'm.1'], focus: ['cg.low', 'm.1'] },
        { say: 'The upper spot moved six centimetres, so its R f value is six over eight: zero point seven five.', caption: 'The upper spot moved six centimetres, so its Rf value is six over eight: 0.75.', show: ['cg.high', 'm.2'], focus: ['cg.high', 'm.2'] },
        { say: 'Dye A has the same R f value as the lower spot, and dye B the same as the upper spot. So ink X is a mixture of dyes A and B.', caption: 'Dye A has the same Rf value as the lower spot, and dye B the same as the upper spot. So ink X is a mixture of dyes A and B.', show: 'id', focus: ['cg.a-spot', 'cg.b-spot'] },
      ],
    },
    {
      chapter: 'Finding a distance',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'In a certain solvent, a red dye has an $R_f$ value of $0.40$. If the solvent moves $9.5\\ \\text{cm}$ from the baseline, how far will the red spot move?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{spot distance} = R_f \\times \\text{solvent distance}', '= 0.40 \\times 9.5 = 3.8\\ \\text{cm}'] },
      ],
      lines: [
        { say: 'You can also predict a distance. In a certain solvent, a red dye has an R f value of zero point four zero. If the solvent moves nine point five centimetres from the baseline, how far will the red spot move?', caption: 'You can also predict a distance. In a certain solvent, a red dye has an Rf value of 0.40. If the solvent moves 9.5 centimetres from the baseline, how far will the red spot move?', show: 'q' },
        { say: 'Rearrange the formula: the distance moved by the spot is the R f value times the distance moved by the solvent.', caption: 'Rearrange the formula: the distance moved by the spot is the Rf value times the distance moved by the solvent.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point four zero times nine point five is three point eight. The red spot moves three point eight centimetres from the baseline.', caption: '0.40 times 9.5 is 3.8. The red spot moves 3.8 centimetres from the baseline.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Measuring carefully',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measure from the baseline', md: 'Measure both distances from the **baseline**, not the bottom edge, and to the **centre** of each spot. An $R_f$ greater than $1$ means you divided the wrong way round.' },
        { kind: 'callout', id: 'same', tone: 'tip', title: 'Same solvent', md: 'Compare $R_f$ values only for substances run **in the same solvent**: a substance’s $R_f$ value changes from one solvent to another.' },
      ],
      lines: [
        { say: 'Watch out: measure both distances from the baseline, not from the bottom edge, and to the centre of each spot. And if your R f value comes out greater than one, you have divided the wrong way round.', caption: 'Watch out: measure both distances from the baseline, not from the bottom edge, and to the centre of each spot. And if your Rf value comes out greater than one, you have divided the wrong way round.', show: 'oops' },
        { say: 'To identify an unknown substance, compare its R f value with those of known substances measured in the same solvent. In a different solvent, the values change.', caption: 'To identify an unknown substance, compare its Rf value with those of known substances measured in the same solvent. In a different solvent, the values change.', show: 'same' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a chromatogram of a food colouring, the solvent moved $7.5\\ \\text{cm}$ from the baseline, and the yellow spot moved $3.0\\ \\text{cm}$. What is the $R_f$ value of the yellow dye?',
          choices: ['$2.50$', '$0.30$', '$4.50$', '$0.40$'],
          answer: 3,
          working: '$R_f = \\dfrac{3.0}{7.5} = 0.40$. Dividing the other way round gives $2.50$, which is greater than $1$, so it cannot be an $R_f$ value.',
        },
      ],
      lines: [
        { say: 'Your turn. On a chromatogram of a food colouring, the solvent moved seven point five centimetres from the baseline, and the yellow spot moved three point zero centimetres. What is the R f value of the yellow dye? Pause the video and try it.', caption: 'Your turn. On a chromatogram of a food colouring, the solvent moved 7.5 centimetres from the baseline, and the yellow spot moved 3.0 centimetres. What is the Rf value of the yellow dye? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Three point zero divided by seven point five is zero point four zero. Choice A divides the wrong way round, and gives a value greater than one, which an R f value can never be.', caption: 'The answer is D. 3.0 divided by 7.5 is 0.40. Choice A divides the wrong way round, and gives a value greater than one, which an Rf value can never be.', show: 'q.answer' },
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
            '$R_f = \\dfrac{\\text{distance moved by the spot}}{\\text{distance moved by the solvent}}$, both from the baseline.',
            'An $R_f$ value has no unit and is less than $1$.',
            'Matching $R_f$ values in the same solvent identifies a substance.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The R f value is the distance moved by the spot, divided by the distance moved by the solvent, both measured from the baseline.', caption: 'Let’s sum up. The Rf value is the distance moved by the spot, divided by the distance moved by the solvent, both measured from the baseline.', show: 'sum.0' },
        { say: 'An R f value has no unit, and it is always less than one.', caption: 'An Rf value has no unit, and it is always less than one.', show: 'sum.1' },
        { say: 'And matching R f values in the same solvent identifies a substance. That completes this lesson on separating mixtures.', caption: 'And matching Rf values in the same solvent identifies a substance. That completes this lesson on separating mixtures.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
