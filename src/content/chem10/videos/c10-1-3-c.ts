import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chromatogram, chromatographyTank } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-3-c',
  lessonId: 'c10-1-3',
  title: 'Separating Mixtures, Part 3: Paper Chromatography',
  thumbnailTitle: 'Paper Chromatography',
  thumbnail: 'cg',
  summary:
    'Paper chromatography separates the dissolved substances in a mixture, such as the dyes in an ink. Spots go on a pencil baseline, the paper stands in a little solvent below the baseline, and the solvent carries each substance a different distance. A pure substance gives one spot; a mixture gives a spot for each substance.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 3', title: 'Paper Chromatography', subtitle: 'Pulling apart the dyes in an ink' }],
      lines: [
        { say: 'A forensic scientist who wants to know which pen wrote a note needs to pull apart the dyes in its ink.', show: 'title' },
        { say: 'In this part, you will see how paper chromatography separates the dissolved substances in a mixture, and how to read the result.' },
      ],
    },
    {
      chapter: 'Setting up',
      layout: 'split',
      leftWidth: 600,
      left: [figure('tk', [chromatographyTank()])],
      right: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Draw a **pencil baseline** about $1\\ \\text{cm}$ above the bottom of the paper.',
            'Put a small spot of each sample on the baseline.',
            'Stand the paper in a little solvent, **below the baseline**, with a lid on.',
          ],
        },
      ],
      lines: [
        { say: 'Paper chromatography separates and identifies the dissolved substances in a mixture, such as the dyes in an ink or a food colouring.' },
        { say: 'First, a line called the baseline is drawn in pencil, about one centimetre above the bottom of a strip of chromatography paper. Pencil is used because graphite does not dissolve and run.', show: ['tk.paper', 'tk.paper-l', 'tk.baseline', 'tk.baseline-l', 'steps.0'] },
        { say: 'A small spot of each sample is placed on the baseline.', show: ['tk.spots', 'steps.1'], focus: 'tk.spots' },
        { say: 'The paper is stood in a container with a little solvent in the bottom, often water. The solvent must be below the baseline, or the spots would dissolve into it. A lid stops the solvent evaporating.', show: ['tk.tank', 'tk.lid-l', 'tk.solvent', 'tk.solvent-l', 'steps.2'], focus: 'tk.solvent' },
      ],
    },
    {
      chapter: 'Running it',
      layout: 'split',
      leftWidth: 620,
      left: [figure('cg', [chromatogram()])],
      right: [
        { kind: 'callout', id: 'why', tone: 'key', title: 'Why the spots separate', md: 'Substances that **dissolve better** in the solvent, or **stick less** to the paper, travel further.' },
        { kind: 'text', id: 'front', size: 'md', align: 'left', md: 'Take the paper out before the solvent reaches the top, and mark the **solvent front** in pencil. The pattern of spots is a **chromatogram**.' },
      ],
      lines: [
        { say: 'The solvent soaks up the paper, carrying the dissolved substances with it. Substances that dissolve better in the solvent, or stick less to the paper, travel further.', show: ['cg.paper', 'cg.baseline', 'cg.names', 'why'] },
        { say: 'Before the solvent reaches the top, the paper is taken out, and the furthest point the solvent reached, called the solvent front, is marked in pencil.', show: ['cg.front', 'front'], focus: 'cg.front' },
        { say: 'The pattern of spots is called a chromatogram. This one has an ink, X, and two dyes, A and B.', show: ['cg.x-spots', 'cg.a-spot', 'cg.b-spot'], focus: 'cg' },
      ],
    },
    {
      chapter: 'Reading a chromatogram',
      layout: 'split',
      leftWidth: 620,
      left: [figure('cg', [chromatogram()])],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'One spot or more?', md: 'A **pure substance** gives **one** spot. A **mixture** gives a spot for **each** substance in it.' },
        { kind: 'bullets', id: 'read', items: ['Ink X gives two spots: a mixture.', 'Its lower spot is level with dye A, its upper spot with dye B.', 'So ink X contains dyes A and B.'] },
      ],
      lines: [
        { say: 'A pure substance gives one spot. A mixture gives a spot for each substance in it.', show: ['cg.paper', 'cg.baseline', 'cg.front', 'cg.names', 'cg.x-spots', 'cg.a-spot', 'cg.b-spot', 'rule'] },
        { say: 'Ink X gives two spots, so it is a mixture. Dye A and dye B each give one spot.', show: 'read.0', focus: 'cg.x-spots' },
        { say: 'The lower spot of ink X is level with the spot of dye A, and its upper spot is level with the spot of dye B.', show: 'read.1', focus: ['cg.x-spots', 'cg.a-spot', 'cg.b-spot'] },
        { say: 'So ink X is a mixture of dyes A and B. In part four, you will measure the spots, to make this kind of match exact.', show: 'read.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In paper chromatography, why must the solvent in the container start **below** the baseline?',
          choices: ['Otherwise the spots would dissolve into the solvent in the container.', 'So that the solvent evaporates more slowly.', 'So that the pencil line does not run.', 'Because the solvent must never touch the paper.'],
          answer: 0,
          working: 'If the solvent covered the baseline, the samples would wash off into the solvent in the container instead of being carried up the paper. The solvent has to touch the paper, below the baseline, so that it can soak up the paper.',
        },
      ],
      lines: [
        { say: 'Your turn. In paper chromatography, why must the solvent in the container start below the baseline? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. If the solvent covered the baseline, the spots would dissolve into the solvent in the container, instead of being carried up the paper. Choice D is wrong: the solvent has to touch the paper, so that it can soak up the paper.', show: 'q.answer' },
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
            'Spots go on a **pencil baseline**; the solvent starts **below** it.',
            'The solvent carries each dissolved substance a different distance.',
            'A pure substance gives **one** spot; a mixture gives a spot for each substance.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In paper chromatography, the spots go on a pencil baseline, and the solvent starts below it.', show: 'sum.0' },
        { say: 'The solvent soaks up the paper, and carries each dissolved substance a different distance.', show: 'sum.1' },
        { say: 'A pure substance gives one spot, and a mixture gives a spot for each substance in it. In part four, you will measure the spots and work out R f values. See you there!', caption: 'A pure substance gives one spot, and a mixture gives a spot for each substance in it. In part four, you will measure the spots and work out Rf values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
