import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import dative from '@/content/chemmore/videos/cx-7-3.ts';

// Exam question for More Chemistry Topics lesson 7.3 (dative covalent bonds): how the dative bond
// in the ammonium ion forms, and the shapes and bond angles of NH₄⁺ and NH₃. Written by Gradileo in
// the style of an A level chemistry exam.
//
// The picture is the lesson's ammonia molecule taking a hydrogen ion from hydrogen chloride
// (src/video/molecules.ts).

const QUESTION = 'Ammonia, NH₃, reacts with hydrogen chloride to form ammonium chloride, NH₄Cl. (a) Explain how a dative covalent bond forms in the ammonium ion. (b) State the shape of the ammonium ion and its bond angle. (c) State the shape of an ammonia molecule and its bond angle, and explain why the angle is smaller than in the ammonium ion.';

const video: Explainer = {
  id: 'xq-cx-7-3',
  lessonId: '',
  exam: {
    lesson: 'cx-7-3',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Ammonia, Ammonium and a Lone Pair. Dative Covalent Bonds',
  thumbnailTitle: 'A Bond from One Side',
  thumbnail: 'pt',
  summary:
    'A test-style question, solved one small step at a time: how does the dative bond in the ammonium ion form, and what are the shapes of NH₄⁺ and NH₃? The nitrogen\'s lone pair is donated to a hydrogen ion, NH₄⁺ is tetrahedral at 109.5°, and NH₃ is pyramidal at about 107° because its lone pair repels more strongly than a bonding pair.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Bond from One Side', subtitle: 'Dative bonds and shapes' }],
      lines: [
        { say: 'In this video, we solve a test-style question about dative covalent bonds. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'N donates its lone pair to H⁺; tetrahedral, 109.5°; pyramidal, 107°, lone pair repels more' }],
      lines: [
        { say: 'Here is the question. Ammonia, N H three, reacts with hydrogen chloride to form ammonium chloride. Part a: explain how a dative covalent bond forms in the ammonium ion. Part b: state the shape of the ammonium ion and its bond angle. Part c: state the shape of an ammonia molecule and its bond angle, and explain why the angle is smaller than in the ammonium ion.', caption: 'Here is the question. Ammonia, NH₃, reacts with hydrogen chloride to form ammonium chloride, NH₄Cl. Part a: explain how a dative covalent bond forms in the ammonium ion. Part b: state the shape of the ammonium ion and its bond angle. Part c: state the shape of an ammonia molecule and its bond angle, and explain why the angle is smaller than in the ammonium ion.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find where the **shared pair** comes from, then count **electron pairs** around nitrogen' }],
      lines: [
        { say: 'In a dative bond, both shared electrons come from one atom. Then the shape depends on how many electron pairs surround the nitrogen, and what kind they are.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(dative, 'pt')],
      lines: [
        { say: 'Here is what we need. This is an ammonia molecule and a hydrogen chloride molecule, up close.', show: 'pt' },
        { say: 'The hydrogen ion leaves its chloride behind, and the nitrogen\'s lone pair forms the new bond to it. That is a dative bond, and the product is the ammonium ion.', play: 'pt.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Dative bond: a **lone pair** donated to an **empty orbital**', 'Four bonding pairs: **tetrahedral**, 109.5°', 'Lone pairs repel **more** than bonding pairs'] }],
      lines: [
        { say: 'Here is the plan. A dative bond forms when one atom donates a lone pair into an empty orbital on another.', show: 'plan.0' },
        { say: 'Four bonding pairs spread out into a tetrahedron, at 109.5 degrees.', caption: 'Four bonding pairs spread out into a tetrahedron, at 109.5°.', show: 'plan.1' },
        { say: 'And a lone pair repels more strongly than a bonding pair, squeezing the bonds closer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The dative bond',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{NH3 + H+ -> NH4+}', '\\text{N lone pair} \\rightarrow \\text{empty orbital of } \\ce{H+}', '\\good{\\text{both electrons from N}}'] }],
      lines: [
        { say: 'Step one. Ammonia takes a hydrogen ion from hydrogen chloride to become the ammonium ion.', show: 'm.0' },
        { say: 'The nitrogen has a lone pair, and the hydrogen ion has an empty orbital with no electrons at all.', show: 'm.1' },
        { say: 'The nitrogen donates its lone pair to the hydrogen ion, so both electrons in the new bond come from nitrogen. That is a dative covalent bond, and that is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The ammonium ion',
      layout: 'center',
      main: [{ kind: 'math', id: 'a', size: 'md', lines: ['\\ce{NH4+}: 4 \\text{ bonding pairs}, 0 \\text{ lone pairs}', '\\Rightarrow \\good{\\text{tetrahedral, } 109.5^\\circ}'] }],
      lines: [
        { say: 'Step two. Once formed, the dative bond is just like the other three. So the ammonium ion has four bonding pairs and no lone pairs.', show: 'a.0' },
        { say: 'Four equal pairs repel equally, giving a tetrahedral shape with bond angles of 109.5 degrees. That is part b.', caption: 'Four equal pairs repel equally, giving a tetrahedral shape with bond angles of 109.5°. That is part b.', show: 'a.1', focus: 'a.1' },
      ],
    },
    {
      chapter: 'Step 3: Ammonia',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'md', lines: ['\\ce{NH3}: 3 \\text{ bonding pairs}, 1 \\text{ lone pair}', '\\Rightarrow \\good{\\text{pyramidal, about } 107^\\circ}'] }],
      lines: [
        { say: 'Step three. Ammonia has three bonding pairs and one lone pair.', show: 'n.0' },
        { say: 'The lone pair is held closer to the nitrogen, so it repels more strongly than a bonding pair, and pushes the three bonds closer together. The shape is pyramidal, with a bond angle of about 107 degrees. That is part c.', caption: 'The lone pair is held closer to the nitrogen, so it repels more strongly than a bonding pair, and pushes the three bonds closer together. The shape is pyramidal, with a bond angle of about 107°. That is part c.', show: 'n.1', focus: 'n.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Nitrogen **donates its lone pair** to the **empty orbital** of H⁺. (b) **Tetrahedral, 109.5°**. (c) **Pyramidal, about 107°**: the **lone pair repels more** than bonding pairs.' },
      ],
      lines: [
        { say: 'Does it make sense? Turning the lone pair into a bond removes the extra repulsion, so the angle opens up from 107 to 109.5 degrees.', caption: 'Does it make sense? Turning the lone pair into a bond removes the extra repulsion, so the angle opens up from 107° to 109.5°.', show: 'ans' },
        { say: 'So the dative bond comes from nitrogen\'s lone pair, ammonium is tetrahedral, and ammonia is pyramidal.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['Each atom gives **one** electron', 'That is an **ordinary** covalent bond'],
            ['NH₄⁺ is **square planar**', 'Four pairs spread into a **tetrahedron**'],
            ['NH₃ is **trigonal planar**', 'The **lone pair** counts too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'In a dative bond, both electrons come from the same atom. The hydrogen ion has none to give.', focus: 'traps.0' },
        { say: 'Four pairs get furthest apart in three dimensions, as a tetrahedron, not flat.', focus: 'traps.1' },
        { say: 'And the lone pair on nitrogen takes up space, so ammonia is a pyramid, not flat.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these can accept a lone pair to form a dative covalent bond?',
          choices: ['NH₃', 'H₂O', 'BF₃', 'Cl⁻'],
          answer: 2,
          working: 'Boron in BF₃ has only six outer electrons, so it has an empty orbital to accept a pair. The others are donors.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these can accept a lone pair to form a dative covalent bond? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Boron in B F three has only six outer electrons, so it has an empty orbital: choice C. The others all have lone pairs to donate.', caption: 'Boron in BF₃ has only six outer electrons, so it has an empty orbital: choice C. The others all have lone pairs to donate.', show: 'q2.answer' },
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
          items: ['Dative bond: **both electrons** from one atom', 'NH₄⁺ **tetrahedral**, 109.5°', 'NH₃ **pyramidal**, 107°: lone pairs repel more'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a dative bond, both shared electrons come from one atom.', show: 'sum.0' },
        { say: 'The ammonium ion is tetrahedral, at 109.5 degrees.', caption: 'The ammonium ion is tetrahedral, at 109.5°.', show: 'sum.1' },
        { say: 'And ammonia is pyramidal, at about 107 degrees, because a lone pair repels more. For more, watch this lesson\'s explainer video on Gradileo.', caption: 'And ammonia is pyramidal, at about 107°, because a lone pair repels more. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
