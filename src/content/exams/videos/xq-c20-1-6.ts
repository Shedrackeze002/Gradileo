import type { Explainer, MoleculesEl } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import vsepr from '@/content/chem20/videos/c20-1-6.ts';

// Exam question for Chemistry 20 lesson 1.6 (shapes of molecules, VSEPR): why H2O is bent while
// BeH2 is linear. The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter
// exercise 85, section 7.6, CC BY-NC-SA 4.0). The book's answer: the beryllium atom has two
// electron groups (no lone pairs), which sit 180° apart, while the oxygen atom has four (two bonds,
// two lone pairs), arranged tetrahedrally, so the two O–H bonds are at an angle.
//
// The pictures: the lesson's electron groups spreading out (src/video/molecules.ts), then BeH2 and
// water side by side, crowded at first, spreading out (water's lone pairs as yellow balls marked
// ••), and finally named from the atoms only: linear and V-shaped (bent).

// BeH2 (left) and water (right): crowded, spread out, then the lone pairs faded to show the shape.
const pair: MoleculesEl = {
  kind: 'molecules',
  id: 'hb',
  atoms: { Be: { el: 'Be', tone: 'hyp' }, Ha: 'H', Hb: 'H', O: 'O', H1: 'H', H2: 'H', P1: { el: '••', tone: 'theta' }, P2: { el: '••', tone: 'theta' } },
  stages: {
    bunched: {
      at: { Be: [3.5, 2.3], Ha: [2.85, 1.17], Hb: [4.15, 1.17], O: [10.5, 2.3], P1: [9.95, 1.347], P2: [10.691, 1.217], H1: [9.278, 1.855], H2: [11.496, 1.464] },
      bonds: 'Be-Ha Be-Hb O-H1 O-H2',
      names: [
        { text: 'BeH₂: 2 bonds, no lone pairs', at: [3.5, 4.6] },
        { text: 'H₂O: 2 bonds, 2 lone pairs', at: [10.5, 4.6] },
      ],
    },
    spread: {
      at: { Be: [3.5, 2.3], Ha: [2.2, 2.3], Hb: [4.8, 2.3], O: [10.5, 2.3], P1: [10.5, 1.2], P2: [11.463, 2.547], H1: [9.275, 2.734], H2: [10.89, 3.34] },
      bonds: 'Be-Ha Be-Hb O-H1 O-H2',
      names: [
        { text: '2 groups: 180° apart', at: [3.5, 4.6] },
        { text: '4 groups: a tetrahedron', at: [10.5, 4.6] },
      ],
    },
    shape: {
      at: { Be: [3.5, 2.3], Ha: [2.2, 2.3], Hb: [4.8, 2.3], O: [10.5, 2.3], H1: [9.275, 2.734], H2: [10.89, 3.34] },
      bonds: 'Be-Ha Be-Hb O-H1 O-H2',
      names: [
        { text: 'linear', at: [3.5, 4.6], tone: 'good' },
        { text: 'V-shaped (bent)', at: [10.5, 4.6], tone: 'good' },
      ],
    },
  },
  start: 'bunched',
  clips: {
    spread: { phases: [{ dur: 0.6 }, { dur: 3, to: 'spread' }, { dur: 0.8 }] },
    name: { phases: [{ dur: 2, to: 'shape' }, { dur: 1 }] },
  },
  span: [14, 5.2],
  poster: 'spread',
  height: 420,
};

// The two Lewis structures side by side: H–Be–H with no lone pairs, H–O–H with two on oxygen.
const structures = figure(
  'm',
  [
    lewis({
      name: 'b',
      atoms: [
        { id: 'Be', symbol: 'Be', at: [-3.6, 0] },
        { id: 'H1', symbol: 'H', at: [-5.2, 0] },
        { id: 'H2', symbol: 'H', at: [-2, 0] },
      ],
      bonds: [
        { from: 'Be', to: 'H1' },
        { from: 'Be', to: 'H2' },
      ],
    }),
    lewis({
      name: 'w',
      atoms: [
        { id: 'O', symbol: 'O', at: [3.6, 0], dots: [2, 0, 2, 0] },
        { id: 'H1', symbol: 'H', at: [2, 0] },
        { id: 'H2', symbol: 'H', at: [5.2, 0] },
      ],
      bonds: [
        { from: 'O', to: 'H1' },
        { from: 'O', to: 'H2' },
      ],
    }),
  ],
  200,
);

const video: Explainer = {
  id: 'xq-c20-1-6',
  lessonId: '',
  exam: {
    lesson: 'c20-1-6',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 85, section 7.6, Molecular Structure and Polarity',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/7-exercises',
    question: 'Explain why the HOH molecule is bent, whereas the HBeH molecule is linear.',
  },
  title: 'Exam Question: Why Is Water Bent but BeH2 Linear? Shapes of Molecules',
  thumbnailTitle: 'Bent or Linear?',
  thumbnail: 'hb',
  summary:
    'A real test question, solved one small step at a time: why is a water molecule bent while BeH2 is linear? We draw both Lewis structures, count the electron groups around the central atom, and watch the groups push apart, two of them to opposite sides and four of them to the corners of a tetrahedron, before naming each shape from its atoms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Bent or Linear?', subtitle: 'Electron groups and shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the shapes of two small molecules. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Explain why the HOH molecule is bent, whereas the HBeH molecule is linear.', answer: 'O has 4 electron groups (2 lone pairs); Be has 2' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Explain why the H O H molecule is bent, whereas the H B e H molecule is linear.', caption: 'Explain why the HOH molecule is bent, whereas the HBeH molecule is linear.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Both are **H–X–H**, yet one bends: find the **difference** around the central atom' }],
      lines: [
        { say: 'Both molecules have the same pattern: a central atom with a hydrogen atom on each side.', show: 'plain' },
        { say: 'Yet water bends and B e H two stays straight. We must find what is different around the central atom, and explain how that changes the shape.', caption: 'Yet water bends and BeH₂ stays straight. We must find what is different around the central atom, and explain how that changes the shape.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(vsepr, 'sp')],
      lines: [
        { say: 'Here is what we need. Electron groups around a central atom repel each other. A group is a bonded atom, or a lone pair.', show: 'sp' },
        { say: 'So they spread out as far apart as they can. Watch: two groups end up on opposite sides, three in a flat triangle, and four at the corners of a tetrahedron.', play: 'sp.go' },
        { say: 'Then the shape is named from where the atoms are, leaving out the lone pairs.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Draw both **Lewis structures**', 'Count the **electron groups** on the central atom', 'Spread the groups out, then name the shape from the **atoms**'] }],
      lines: [
        { say: 'Here is the plan. First, draw both Lewis structures.', show: 'plan.0' },
        { say: 'Second, count the electron groups on each central atom: bonds and lone pairs.', show: 'plan.1' },
        { say: 'Third, spread the groups as far apart as possible, then name the shape from where the atoms end up.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Lewis structures',
      layout: 'center',
      main: [
        structures,
        { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{BeH2}: 2 + 2 \\times 1 = 4 \\text{ electrons} \\to \\adj{2 \\text{ bonds}}', '\\ce{H2O}: 6 + 2 \\times 1 = 8 \\text{ electrons} \\to \\adj{2 \\text{ bonds}} + \\thc{2 \\text{ lone pairs}}'] },
      ],
      lines: [
        { say: 'Step one. Beryllium, in group 2, has 2 valence electrons, and each hydrogen has 1, so B e H two has 4 electrons: just enough for two bonds, with nothing left over.', show: ['m.b-Be', 'm.b-H1', 'm.b-H2', 'm.b-bond-Be-H1', 'm.b-bond-Be-H2', 'e.0'], focus: 'e.0', caption: 'Step one. Beryllium, in group 2, has 2 valence electrons, and each hydrogen has 1, so BeH₂ has 4 electrons: just enough for two bonds, with nothing left over.' },
        { say: 'Oxygen, in group 16, has 6, so water has 8 electrons: two bonds, and two lone pairs left on the oxygen.', show: ['m.w-O', 'm.w-H1', 'm.w-H2', 'm.w-bond-O-H1', 'm.w-bond-O-H2', 'm.w-O-dots', 'e.1'], focus: 'e.1' },
      ],
    },
    {
      chapter: 'Step 2: Count the groups',
      layout: 'center',
      main: [{ kind: 'math', id: 'g', size: 'lg', lines: ['\\text{Be: } 2 \\text{ bonds} + 0 \\text{ lone pairs} = \\adj{2 \\text{ groups}}', '\\text{O: } 2 \\text{ bonds} + 2 \\text{ lone pairs} = \\opp{4 \\text{ groups}}'] }],
      lines: [
        { say: 'Step two: count the electron groups. Beryllium has two bonds and no lone pairs, so it has two groups.', show: 'g.0' },
        { say: 'Oxygen has two bonds and two lone pairs, so it has four groups. The written formulas look alike, but the central atoms are not.', show: 'g.1' },
      ],
    },
    {
      chapter: 'Step 3: Spread them out',
      layout: 'center',
      main: [pair],
      lines: [
        { say: 'Step three. Here are both molecules, with their electron groups crowded together. Water\'s two lone pairs are the yellow balls.', show: 'hb' },
        { say: 'The groups repel and spread out. Beryllium\'s two groups go to opposite sides, 180 degrees apart. Oxygen\'s four groups go to the corners of a tetrahedron.', play: 'hb.spread' },
        { say: 'Now we name the shapes from the atoms only. With the lone pairs left out, B e H two is a straight line, linear, while the two hydrogen atoms on water sit at an angle: bent.', play: 'hb.name', caption: 'Now we name the shapes from the atoms only. With the lone pairs left out, BeH₂ is a straight line, linear, while the two hydrogen atoms on water sit at an angle: bent.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Molecule', 'Groups on the centre', 'Arrangement', 'Shape'],
          rows: [
            ['$\\ce{BeH2}$', '2 bonds, 0 lone pairs', '180° apart', '**linear**'],
            ['$\\ce{H2O}$', '2 bonds, 2 lone pairs', 'tetrahedron', '**bent**, about 104.5°'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. Beryllium has only two electron groups, which repel to opposite sides, so B e H two is linear.', show: 'ans', focus: 'ans.0', caption: 'Here is the whole answer. Beryllium has only two electron groups, which repel to opposite sides, so BeH₂ is linear.' },
        { say: 'Oxygen has four, two bonds and two lone pairs, which spread into a tetrahedron. The lone pairs take two corners, so the two bonds are at an angle, and water is bent. That matches the book.', focus: 'ans.1' },
        { say: 'A quick check: water\'s angle is about 104.5 degrees, a little less than a tetrahedron\'s 109.5, because the lone pairs push the bonds slightly closer together.' },
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
            ['Water is linear', 'Counted only the **bonds** and missed the lone pairs'],
            ['Water is tetrahedral', 'Named the shape from the **groups**, lone pairs included'],
            ['"Oxygen is bigger than beryllium"', 'The angle comes from the number of electron **groups**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Saying water is linear, because it has two bonds like B e H two. The two lone pairs on oxygen count as groups too.', focus: 'traps.0', caption: 'Saying water is linear, because it has two bonds like BeH₂. The two lone pairs on oxygen count as groups too.' },
        { say: 'Calling water tetrahedral. The groups are arranged in a tetrahedron, but the shape is named from the three atoms only, and that is bent.', focus: 'traps.1' },
        { say: 'And explaining it by the size of the atoms. The shape comes from how many electron groups repel each other around the central atom.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Hydrogen sulfide, $\\ce{H2S}$, has two bonds and two lone pairs on sulfur. What is its shape?',
          choices: ['linear', 'bent', 'trigonal planar', 'tetrahedral'],
          answer: 1,
          working: 'Four groups make a tetrahedron, but with two lone pairs the atoms form a bent shape, like water.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen sulfide, H two S, has two bonds and two lone pairs on sulfur. What is its shape? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Hydrogen sulfide, H₂S, has two bonds and two lone pairs on sulfur. What is its shape? Pause the video and try it.' },
        { say: 'Sulfur has four electron groups, just like oxygen in water, and two of them are lone pairs. So the shape is bent: choice B.', show: 'q2.answer' },
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
          items: ['Count **bonds and lone pairs** on the central atom', '2 groups: **linear**; 4 groups: a **tetrahedron**', 'Name the shape from the **atoms**: water is **bent**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The shape depends on the electron groups around the central atom, counting lone pairs as well as bonds.', show: 'sum.0' },
        { say: 'Two groups sit on opposite sides, which is linear, and four groups make a tetrahedron.', show: 'sum.1' },
        { say: 'And the shape is named from the atoms, so water, with two lone pairs, is bent. For more on the shapes of molecules, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
