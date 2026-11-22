import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import bonds from '@/content/chem20/videos/c20-1-7.ts';
import { co2, co2Atoms, h2o, pair, waterAtoms } from '@/content/chem20/videos/c20-1-7-b.ts';

// Exam question for Chemistry 20 lesson 1.7 (polar and non-polar molecules): how a molecule with
// polar bonds can be non-polar. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 89, section 7.6, CC BY-NC-SA 4.0). The book's answer: the polar bonds
// are arranged symmetrically, so their dipoles cancel, as in CO2 (and BF3 or CCl4).
//
// The pictures are the lessons' own: hydrogen chloride's shared pair pulled towards chlorine
// (src/video/atoms.ts), carbon dioxide and water as atoms sharing and pulling, then as models with
// their pulls drawn as arrows, and boron trifluoride beside ammonia.

const video: Explainer = {
  id: 'xq-c20-1-7',
  lessonId: '',
  exam: {
    lesson: 'c20-1-7',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 89, section 7.6, Molecular Structure and Polarity',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/7-exercises',
    question: 'Explain how a molecule that contains polar bonds can be nonpolar.',
  },
  title: 'Exam Question: Polar Bonds in a Non-polar Molecule. Polar and Non-polar Molecules',
  thumbnailTitle: 'Polar Bonds, Non-polar Molecule?',
  thumbnail: 'ca',
  summary:
    'A real test question, solved one small step at a time: how can a molecule have polar bonds and still be non-polar? We watch oxygen pull the shared electrons in carbon dioxide and in water, draw each pull as an arrow, and see that the pulls cancel when the molecule is symmetrical, as in CO2 and BF3, and add up when it is not, as in water and ammonia.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Polar Bonds, Non-polar Molecule?', subtitle: 'Shape and symmetry, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about polar bonds and polar molecules. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Explain how a molecule that contains polar bonds can be nonpolar.', answer: 'The bond pulls cancel by symmetry' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Explain how a molecule that contains polar bonds can be nonpolar.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Each bond is polar, yet the **whole molecule** has no charged side: how?' }],
      lines: [
        { say: 'A polar bond has a slightly negative end and a slightly positive end.', show: 'plain' },
        { say: 'The question asks how a molecule built from such bonds can end up with no negative side and no positive side at all.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(bonds, 'hc')],
      lines: [
        { say: 'Here is what we need. Hydrogen and chlorine share a pair of electrons.', show: ['hc', 'hc.labels'], play: 'hc.share' },
        { say: 'Chlorine is more electronegative, so it pulls the pair closer. Chlorine becomes slightly negative, delta minus, and hydrogen slightly positive, delta plus. That is a polar bond.', caption: 'Chlorine is more electronegative, so it pulls the pair closer. Chlorine becomes slightly negative, δ−, and hydrogen slightly positive, δ+. That is a polar bond.', show: 'hc.charges', play: 'hc.pull' },
        { say: 'We can picture each polar bond as a rope in a tug of war, pulling electron charge towards one end.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Picture each polar bond as a **pull**', 'Find the **shape** of the molecule', 'Equal pulls in opposite directions **cancel**'] }],
      lines: [
        { say: 'Here is the plan. First, picture each polar bond as a pull towards its more electronegative atom.', show: 'plan.0' },
        { say: 'Second, find the shape of the molecule, because the shape decides which way each pull points.', show: 'plan.1' },
        { say: 'Third, add up the pulls. If they are equal and point in balanced directions, they cancel.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two molecules up close',
      layout: 'split',
      left: [co2Atoms],
      right: [waterAtoms],
      lines: [
        { say: 'Step one. Here are carbon dioxide and water. Both have polar bonds to oxygen. In carbon dioxide, each oxygen shares two pairs with the carbon atom.', show: 'ca', play: 'ca.share' },
        { say: 'Each oxygen pulls its shared pairs towards itself, one to the left and one to the right.', show: 'ca.charges', play: 'ca.pull' },
        { say: 'In water, oxygen shares a pair with each hydrogen, and pulls both pairs towards itself. But both hydrogen atoms are on the same side.', show: ['wa', 'wa.labels'], play: 'wa.share' },
        { say: 'So both of water\'s pulls lean the same way, towards the oxygen.', show: 'wa.charges', play: 'wa.pull' },
      ],
    },
    {
      chapter: 'Step 2: The pulls cancel',
      layout: 'split',
      leftWidth: 560,
      left: [co2],
      right: [{ kind: 'math', id: 's', size: 'md', align: 'left', lines: ['\\text{O } 3.4,\\ \\text{C } 2.6\\text{: polar bonds}', '\\text{linear: opposite pulls}', '\\good{\\text{they cancel: non-polar}}'] }],
      lines: [
        { say: 'Step two: carbon dioxide. Oxygen, at three point four, pulls harder than carbon, at two point six, so both bonds are polar.', caption: 'Step two: carbon dioxide. Oxygen, at 3.4, pulls harder than carbon, at 2.6, so both bonds are polar.', show: ['m.shape', 'm.charges', 's.0'], focus: 's.0' },
        { say: 'The molecule is linear, so the two pulls point in exactly opposite directions.', show: ['m.pulls', 's.1'], focus: ['m.pulls', 's.1'] },
        { say: 'They are equal, so they cancel, like two people pulling a rope equally hard from either end. Carbon dioxide is non-polar, even though both of its bonds are polar.', show: ['m.verdict', 's.2'], focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: When they do not cancel',
      layout: 'split',
      leftWidth: 560,
      left: [h2o],
      right: [{ kind: 'math', id: 's', size: 'md', align: 'left', lines: ['\\text{O } 3.4,\\ \\text{H } 2.2\\text{: polar bonds}', '\\text{V-shaped: same-way pulls}', '\\bad{\\text{no cancelling: polar}}'] }],
      lines: [
        { say: 'Step three: compare water. Its bonds are polar too, because oxygen pulls harder than hydrogen.', show: ['m.shape', 's.0'], focus: 's.0' },
        { say: 'But water is V-shaped, so both pulls lean up towards the oxygen at the point of the V.', show: ['m.pulls', 's.1'], focus: ['m.pulls', 's.1'] },
        { say: 'They add together, so water is polar, with a negative oxygen side and a positive hydrogen side.', show: ['m.charges', 'm.verdict', 's.2'], focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 4: Symmetry',
      layout: 'center',
      main: [pair],
      lines: [
        { say: 'Step four: the same idea with three bonds. Boron trifluoride and ammonia each have three identical, polar bonds.', show: ['m.b-shape', 'm.n-shape'] },
        { say: 'Boron trifluoride is a flat triangle. Three equal pulls spread evenly, 120 degrees apart, cancel, so it is non-polar.', show: ['m.b-pulls', 'm.b-verdict'], focus: 'm.b-pulls' },
        { say: 'Ammonia is a pyramid, and its three pulls all lean up towards the nitrogen, so they add up. Ammonia is polar.', show: ['m.n-pulls', 'm.n-verdict'], focus: 'm.n-pulls' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'ans',
          tone: 'key',
          title: 'The answer',
          md: 'Each polar bond pulls electron charge towards its more electronegative atom. When identical polar bonds are arranged **symmetrically** around the central atom, as in linear $\\ce{CO2}$, trigonal planar $\\ce{BF3}$ or tetrahedral $\\ce{CCl4}$, their pulls are equal and balanced, so they **cancel**, and the molecule has no positive or negative side.',
        },
      ],
      lines: [
        { say: 'Here is the whole answer. Each polar bond pulls electron charge towards its more electronegative atom.', show: 'ans' },
        { say: 'When identical polar bonds are arranged symmetrically around the central atom, as in carbon dioxide, boron trifluoride or carbon tetrachloride, the pulls are equal and balanced, so they cancel, and the molecule is non-polar. That matches the book.' },
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
            ['"Polar bonds always make a polar molecule"', 'Forgot that **shape** can make the pulls cancel'],
            ['"Water is non-polar: its two bonds match"', 'Matching bonds cancel only when they point **opposite** ways'],
            ['"$\\ce{CHCl3}$ is tetrahedral, so non-polar"', 'Symmetry also needs **identical** outer atoms'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Thinking polar bonds always make a polar molecule. Carbon dioxide shows that the shape can make the pulls cancel.', focus: 'traps.0' },
        { say: 'Thinking water is non-polar because its two bonds are the same. In a V shape, the pulls lean the same way and add up.', focus: 'traps.1' },
        { say: 'And calling chloroform, C H C l three, non-polar because it is tetrahedral. One hydrogen in place of a chlorine breaks the balance, so it is polar.', focus: 'traps.2', caption: 'And calling chloroform, CHCl₃, non-polar because it is tetrahedral. One hydrogen in place of a chlorine breaks the balance, so it is polar.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which molecule is **non-polar**, even though its bonds are polar?',
          choices: ['$\\ce{H2O}$', '$\\ce{NH3}$', '$\\ce{CCl4}$', '$\\ce{HCl}$'],
          answer: 2,
          working: 'CCl₄ is tetrahedral with four identical C–Cl bonds, so the four pulls cancel.',
        },
      ],
      lines: [
        { say: 'Your turn. Which molecule is non-polar, even though its bonds are polar: water, ammonia, carbon tetrachloride, or hydrogen chloride? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Carbon tetrachloride is tetrahedral, with four identical carbon to chlorine bonds spread evenly, so the four pulls cancel: choice C.', show: 'q2.answer' },
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
          items: ['A polar bond **pulls** charge towards one atom', 'Symmetrical shape, identical outer atoms: pulls **cancel**', 'Pulls that lean one way: a **polar** molecule'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A polar bond pulls electron charge towards its more electronegative atom.', show: 'sum.0' },
        { say: 'In a symmetrical molecule with identical outer atoms, the pulls cancel, so the molecule is non-polar.', show: 'sum.1' },
        { say: 'And when the pulls lean the same way, as in water and ammonia, the molecule is polar. For more on polar and non-polar molecules, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
