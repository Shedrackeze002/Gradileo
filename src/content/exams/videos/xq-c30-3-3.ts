import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import isomers from '@/content/chem30/videos/c30-3-3.ts';
import drawings from '@/content/chem30/videos/c30-3-3-d.ts';
import { skeleton, step, tag, zigzag, type SkBond } from '@/content/chem30/videos/lib/c30-3a-figures.ts';

// Exam question for Chemistry 30 lesson 3.3 (isomers): the structures and names of every isomer of
// C4H9Cl. The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 19,
// section 20.1, CC BY-NC-SA 4.0). The answer, which matches the book's: four isomers, two on the
// butane skeleton (1-chlorobutane, 2-chlorobutane) and two on the methylpropane skeleton
// (1-chloro-2-methylpropane, 2-chloro-2-methylpropane).
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's butane chain becoming
// methylpropane, and pentane bent (still pentane) and then rearranged (an isomer); and the four
// isomers as line formulas (src/video/solids.ts).

const QUESTION = 'Write Lewis structures and IUPAC names for all isomers of C4H9Cl.';

const b = (from: string, to: string, group: string): SkBond => ({ from, to, group });
const Cl = (group: string) => ({ symbol: 'Cl', tone: 'good' as const, group });

// 1-chlorobutane and 2-chlorobutane, on the top row; the two methylpropane isomers below.
const p = zigzag('p', 4, { at: [0, 0] });
const q = zigzag('q', 4, { at: [6.5, 0] });
const r = zigzag('r', 3, { at: [0.6, -4.3] });
const s = zigzag('s', 3, { at: [7.1, -4.3] });
const four = figure(
  'i',
  [
    skeleton({
      carbons: { ...p, pcl: step(p.p4, -30), ...q, qcl: step(q.q2, 90), ...r, rm: step(r.r2, 90), rcl: step(r.r1, 150), ...s, sm: step(s.s2, -90), scl: step(s.s2, 90) },
      bonds: [
        b('p1', 'p2', 'one'), b('p2', 'p3', 'one'), b('p3', 'p4', 'one'), b('p4', 'pcl', 'one'),
        b('q1', 'q2', 'two'), b('q2', 'q3', 'two'), b('q3', 'q4', 'two'), b('q2', 'qcl', 'two'),
        b('r1', 'r2', 'three'), b('r2', 'r3', 'three'), b('r2', 'rm', 'three'), b('r1', 'rcl', 'three'),
        b('s1', 's2', 'four'), b('s2', 's3', 'four'), b('s2', 'sm', 'four'), b('s2', 'scl', 'four'),
      ],
      atoms: { pcl: Cl('one'), qcl: Cl('two'), rcl: Cl('three'), scl: Cl('four') },
    }),
    tag('one-name', [1.7, -1.2], '\\text{1-chlorobutane}', { tone: 'good' }),
    tag('two-name', [7.8, -1.2], '\\text{2-chlorobutane}', { tone: 'good' }),
    tag('three-name', [1.5, -6.0], '\\begin{gathered}\\text{1-chloro-}\\\\ \\text{2-methylpropane}\\end{gathered}', { tone: 'good' }),
    tag('four-name', [7.95, -6.0], '\\begin{gathered}\\text{2-chloro-}\\\\ \\text{2-methylpropane}\\end{gathered}', { tone: 'good' }),
  ],
  520,
);

const video: Explainer = {
  id: 'xq-c30-3-3',
  lessonId: '',
  exam: {
    lesson: 'c30-3-3',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 19, section 20.1, Hydrocarbons',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/20-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Every Isomer of C₄H₉Cl. Isomers',
  thumbnailTitle: 'Every Isomer of C₄H₉Cl',
  thumbnail: 'bi',
  summary:
    'A real test question, solved one small step at a time: draw and name every isomer of C₄H₉Cl. Four carbons can make two skeletons, butane and methylpropane, and the chlorine can sit in two different places on each, so there are four isomers: 1-chlorobutane, 2-chlorobutane, 1-chloro-2-methylpropane and 2-chloro-2-methylpropane.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Every Isomer of C₄H₉Cl', subtitle: 'Counting structures without missing or repeating one' }],
      lines: [
        { say: 'In this video, we solve a real test question about isomers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Write Lewis structures and IUPAC names for all isomers of $\\ce{C4H9Cl}$.', answer: 'Four: 1-chlorobutane, 2-chlorobutane, 1-chloro-2-methylpropane, 2-chloro-2-methylpropane' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Write Lewis structures and IUPAC names for all isomers of C four H nine C l.', show: 'q', caption: 'Here is the question, exactly as it was printed. Write Lewis structures and IUPAC names for all isomers of C₄H₉Cl.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Same atoms, **different arrangements**. Find them **all**, and **none twice**' }],
      lines: [
        { say: 'Isomers have the same formula but their atoms are joined differently. The hard part is finding every one without drawing the same molecule twice in a different pose.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(drawings, 'bo'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{new isomer} = \\text{different bonds, not a different pose}'] }],
      lines: [
        { say: 'Here is what we need. Pentane. Bend the chain, and no bond breaks. It is still pentane, just drawn another way.', show: 'bo', play: 'bo.bend' },
        { say: 'But move a carbon so that one bond breaks and another forms, and you have a different compound: an isomer.', play: 'bo.iso' },
        { say: 'So two drawings are the same molecule if every atom has the same neighbours, however the chain is bent or flipped.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find every **carbon skeleton** of four carbons', 'Put the **Cl** on each **different kind** of carbon', 'Name each one, and check for **repeats**'] }],
      lines: [
        { say: 'Here is the plan. First, find every way to join four carbon atoms.', show: 'plan.0' },
        { say: 'Then, on each skeleton, put the chlorine on each different kind of carbon.', show: 'plan.1' },
        { say: 'Then name each one. Two drawings with the same name are the same molecule.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two skeletons',
      layout: 'center',
      main: [pick(isomers, 'bi'), { kind: 'math', id: 's', size: 'md', lines: ['\\text{butane} \\qquad \\text{methylpropane}'] }],
      lines: [
        { say: 'Step one. Here are four carbon atoms in a straight chain: butane.', show: 'bi' },
        { say: 'Move the end carbon to the middle of the chain. One bond breaks and a new one forms, and the same atoms now make methylpropane. There is no third way to join four carbons, so these are the only two skeletons.', play: 'bi.iso', show: 's.0' },
      ],
    },
    {
      chapter: 'Step 2: Place the chlorine',
      layout: 'center',
      main: [four],
      lines: [
        { say: 'Step two. On butane, the chlorine can go on an end carbon, or on a middle carbon. The other end and the other middle carbon give the same molecules, turned round.', show: ['i.one', 'i.two'] },
        { say: 'On methylpropane, three carbons are ends, all alike, and one is the centre. So the chlorine goes on an end carbon or on the centre carbon.', show: ['i.three', 'i.four'] },
      ],
    },
    {
      chapter: 'Step 3: The names',
      layout: 'center',
      main: [four],
      lines: [
        { say: 'Step three. The butane pair are one chlorobutane and two chlorobutane, numbered from the end nearer the chlorine.', show: ['i.one', 'i.two', 'i.one-name', 'i.two-name'], focus: ['i.one-name', 'i.two-name'], caption: 'Step three. The butane pair are 1-chlorobutane and 2-chlorobutane, numbered from the end nearer the chlorine.' },
        { say: 'On methylpropane, the parent chain is three carbons. With the chlorine on an end, it is one chloro two methylpropane. With it on the centre, it is two chloro two methylpropane.', show: ['i.three', 'i.four', 'i.three-name', 'i.four-name'], focus: ['i.three-name', 'i.four-name'], caption: 'On methylpropane, the parent chain is three carbons. With Cl on an end, it is 1-chloro-2-methylpropane. On the centre, it is 2-chloro-2-methylpropane.' },
        { say: 'A Lewis structure draws the same skeletons with every carbon to hydrogen bond shown: each carbon gets hydrogens until it has four bonds, nine in all.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['2 \\text{ skeletons} \\times 2 \\text{ kinds of carbon} = 4 \\text{ isomers}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'Four isomers: **1-chlorobutane**, **2-chlorobutane**, **1-chloro-2-methylpropane** and **2-chloro-2-methylpropane**.' },
      ],
      lines: [
        { say: 'Does it make sense? Two skeletons, each with two different kinds of carbon, give four isomers, and all four names are different, so none is a repeat.', show: 'x.0' },
        { say: 'So C four H nine C l has four isomers: one chlorobutane, two chlorobutane, one chloro two methylpropane and two chloro two methylpropane. That matches the book.', show: 'ans', caption: 'So C₄H₉Cl has four isomers: 1-chlorobutane, 2-chlorobutane, 1-chloro-2-methylpropane and 2-chloro-2-methylpropane. That matches the book.' },
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
            ['3-chlorobutane', 'The same as **2-chlorobutane**, numbered from the wrong end'],
            ['Only two isomers', 'Forgot the **branched** skeleton'],
            ['Six or more isomers', 'Counted a **bent** or **flipped** drawing as new'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Three chlorobutane is two chlorobutane counted from the other end. Number from the end nearer the chlorine, and it becomes two.', focus: 'traps.0', caption: '3-chlorobutane is 2-chlorobutane counted from the other end. Number from the end nearer the chlorine, and it becomes 2.' },
        { say: 'Only two isomers leaves out methylpropane. Always look for branched skeletons too.', focus: 'traps.1' },
        { say: 'And six or more counts the same molecule twice. A bent chain, or one turned round, has the same bonds, so it is not a new isomer.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many structural isomers does $\\ce{C3H7Br}$ have?',
          choices: ['$1$', '$3$', '$2$', '$4$'],
          answer: 2,
          working: 'Three carbons make only one skeleton, propane, with two kinds of carbon: 1-bromopropane and 2-bromopropane.',
        },
      ],
      lines: [
        { say: 'Your turn. How many structural isomers does C three H seven B r have? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. How many structural isomers does C₃H₇Br have? Pause the video and try it.' },
        { say: 'Three carbons can only make one skeleton, propane, and it has two kinds of carbon, an end and the middle. So there are two isomers, one bromopropane and two bromopropane: choice C.', show: 'q2.answer', caption: 'Three carbons can only make one skeleton, propane, with two kinds of carbon. So there are two isomers, 1-bromopropane and 2-bromopropane: choice C.' },
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
          items: ['First list every **carbon skeleton**', 'Then place the group on each **different kind** of carbon', 'Same **name** means the same molecule'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. First list every carbon skeleton, straight and branched.', show: 'sum.0' },
        { say: 'Then place the group on each different kind of carbon, skipping carbons that are alike.', show: 'sum.1' },
        { say: 'And if two drawings get the same name, they are the same molecule. For more on isomers, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
