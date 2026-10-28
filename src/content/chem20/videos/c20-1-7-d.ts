import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { streamTest, tag } from './lib/c20-1b-figures.ts';

// A burette letting a thin stream of liquid run into a beaker, and a charged plastic rod beside it:
// the stream runs straight down, or bends towards the rod.
const stream = figure('m', [
  streamTest(),
  tag({ id: 'rod-name', at: [3.1, 0], tex: '\\text{charged rod}', place: 'below', tone: 'muted' }),
  tag({ id: 'burette-name', at: [0.45, 4.4], tex: '\\text{burette}', place: 'right', tone: 'muted' }),
]);

const video: Explainer = {
  id: 'c20-1-7-d',
  lessonId: 'c20-1-7',
  title: 'Polar and Non-polar Molecules, Part 4: Testing for Polar Molecules',
  thumbnailTitle: 'Testing for Polar Molecules',
  thumbnail: 'm',
  summary:
    'Three questions decide whether a molecule is polar: does it have polar bonds, what is its shape, and is it symmetrical with identical outer atoms? A thin stream of a polar liquid such as water bends towards a charged rod, while a non-polar liquid such as hexane does not, and polar substances tend to dissolve in polar liquids: like dissolves like.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 4', title: 'Testing for Polar Molecules', subtitle: 'Three questions and a stream of liquid' }],
      lines: [
        { say: 'How can you tell whether a liquid is made of polar molecules? You can predict it, and you can test it.', show: 'title' },
        { say: 'In this part, you will decide polarity with three questions, and then see the evidence: a stream of liquid, and a charged rod.' },
      ],
    },
    {
      chapter: 'Three questions',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'q',
          items: [
            '1. **Does it have polar bonds?** With none at all, it is non-polar: $\\ce{N2}$, $\\ce{Cl2}$, $\\ce{CS2}$ (C and S are both $2.6$), $\\ce{CH4}$ (a difference of only $0.4$).',
            '2. **What is its shape?** Use VSEPR theory.',
            '3. **Is it symmetrical, with identical outer atoms?** If yes, it is non-polar. If not, it is polar.',
          ],
        },
      ],
      lines: [
        { say: 'To decide whether a molecule is polar, ask three questions. First: does it have polar bonds? A molecule with no polar bonds at all is non-polar, whatever its shape.', show: 'q.0' },
        { say: 'That includes nitrogen and chlorine, and also carbon disulfide, since carbon and sulfur are both two point six, and methane, where the carbon–hydrogen difference is only zero point four.', focus: 'q.0' },
        { say: 'Second: what is its shape? Use vesper theory.', caption: 'Second: what is its shape? Use VSEPR theory.', show: 'q.1' },
        { say: 'Third: is it symmetrical, with identical outer atoms? If yes, it is non-polar. If not, it is polar.', show: 'q.2' },
      ],
    },
    {
      chapter: 'The stream test',
      layout: 'split',
      leftWidth: 520,
      left: [stream],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A stream of **water** bends towards the rod: its polar molecules turn their oppositely charged ends to face it.',
            'It bends towards a positively charged rod **and** a negatively charged one.',
            'A stream of a **non-polar** liquid, such as hexane, does not bend noticeably.',
          ],
        },
      ],
      lines: [
        { say: 'Now the evidence. Charge a plastic rod by rubbing it with a cloth, then hold it near a thin, steady stream of liquid running from a burette.', show: ['m.burette', 'm.beaker', 'm.straight', 'm.rod', 'm.rod-name', 'm.burette-name'] },
        { say: 'A stream of water bends towards the rod. Its polar molecules turn so that their oppositely charged ends face the rod, and they are pulled towards it.', hide: 'm.straight', show: ['m.bent', 'b.0'], focus: ['m.bent', 'b.0'] },
        { say: 'The stream bends towards a positively charged rod, and towards a negatively charged one, because the molecules simply turn the other way round.', show: 'b.1', focus: 'b.1' },
        { say: 'A stream of a non-polar liquid, such as hexane, does not bend noticeably. Its molecules have no charged sides to turn towards the rod.', hide: 'm.bent', show: ['m.straight', 'b.2'], focus: ['m.straight', 'b.2'] },
      ],
    },
    {
      chapter: 'Predicting the stream test',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A charged rod is held near thin streams of $\\ce{CCl4}$ and $\\ce{CHCl3}$. Which stream bends towards the rod?' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$\\ce{CCl4}$: tetrahedral, four identical chlorines, so the pulls cancel: **non-polar**.',
            '$\\ce{CHCl3}$: tetrahedral, but one outer atom is hydrogen, so the pulls do not cancel: **polar**.',
            'The $\\ce{CHCl3}$ stream bends towards the rod; the $\\ce{CCl4}$ stream does not.',
          ],
        },
      ],
      lines: [
        { say: 'A charged rod is held near thin streams of two liquids, carbon tetrachloride and chloroform. Which stream bends towards the rod?', show: 'q' },
        { say: 'Carbon tetrachloride is tetrahedral, with four identical chlorines, so its pulls cancel: it is non-polar.', show: 'b.0' },
        { say: 'Chloroform is tetrahedral too, but one outer atom is hydrogen, so its pulls do not cancel: it is polar.', show: 'b.1' },
        { say: 'So the chloroform stream bends towards the rod, and the carbon tetrachloride stream does not.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Like dissolves like',
      layout: 'center',
      main: [{ kind: 'callout', id: 'like', tone: 'key', title: 'Like dissolves like', md: 'Polar substances tend to dissolve in polar liquids such as water, and non-polar substances in non-polar liquids. Oil, which is non-polar, does not mix with water.' }],
      lines: [
        { say: 'Polarity also helps explain what dissolves in what. Polar substances tend to dissolve in polar liquids such as water, and non-polar substances in non-polar liquids.', show: 'like' },
        { say: 'That is why oil, which is non-polar, does not mix with water. You will use this idea, like dissolves like, when you study solutions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A charged rod is held near thin streams of two liquids: phosphorus trichloride, $\\ce{PCl3}$ (trigonal pyramidal), and carbon tetrachloride, $\\ce{CCl4}$ (tetrahedral). Both have polar bonds. Which stream bends towards the rod?',
          choices: ['Only the $\\ce{CCl4}$ stream', 'Only the $\\ce{PCl3}$ stream', 'Both streams', 'Neither stream'],
          answer: 1,
          working: '$\\ce{PCl3}$ is trigonal pyramidal, so its pulls lean the same way and do not cancel: it is polar, and its stream bends. $\\ce{CCl4}$ is symmetrical, with four identical chlorines, so it is non-polar.',
        },
      ],
      lines: [
        { say: 'Your turn. A charged rod is held near thin streams of two liquids, phosphorus trichloride and carbon tetrachloride. Which stream bends towards the rod? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, only phosphorus trichloride. It is trigonal pyramidal, so its pulls do not cancel: it is polar. Carbon tetrachloride is symmetrical, so it is non-polar, and its stream does not bend.', show: 'q.answer' },
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
            'Ask: polar bonds? What shape? Symmetrical, with identical outer atoms?',
            'A stream of a polar liquid bends towards a charged rod, of either charge; a non-polar liquid does not.',
            'Like dissolves like: polar with polar, non-polar with non-polar.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Ask three questions: does it have polar bonds, what is its shape, and is it symmetrical, with identical outer atoms?', show: 'sum.0' },
        { say: 'A stream of a polar liquid bends towards a charged rod, of either charge. A stream of a non-polar liquid does not.', show: 'sum.1' },
        { say: 'And like dissolves like. Next, you will see how polarity affects the forces that hold molecules together in liquids and solids.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
