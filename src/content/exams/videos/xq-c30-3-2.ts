import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import naming from '@/content/chem30/videos/c30-3-2.ts';
import hexanes from '@/content/chem30/videos/c30-3-3-c.ts';
import { numberLabels, skeleton, step, zigzag, type SkBond } from '@/content/chem30/videos/lib/c30-3a-figures.ts';

// Exam question for Chemistry 30 lesson 3.2 (naming hydrocarbons): name
// CH3-CH(CH3)-CH2-CH(CH2CH3)-CH3. Gradileo wrote the question in the style of a unit test. The
// trap is that the longest chain runs into the ethyl group: six carbons, not five. The answer:
// numbered from the end nearer the first branch, the methyl groups are on carbons 2 and 4, so
// 2,4-dimethylhexane (not 4-ethyl-2-methylpentane).
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's chain growing from
// methane to butane, and hexane's carbons moving to make branches; and the molecule as a line
// formula (src/video/solids.ts), as written and with its longest chain picked out.

const QUESTION = 'Give the IUPAC name of the alkane CH₃–CH(CH₃)–CH₂–CH(CH₂CH₃)–CH₃.';

const a = zigzag('a', 5);
const m1 = step(a.a2, 90);
const b1 = step(a.a4, 90);
const b2 = step(b1, 30);
const carbons = { ...a, m1, b1, b2 };
const bond = (from: string, to: string, group: string, tone?: 'good'): SkBond => ({ from, to, group, ...(tone ? { tone } : {}) });

const written = figure('w', [skeleton({ carbons, bonds: [bond('a1', 'a2', 'mol'), bond('a2', 'a3', 'mol'), bond('a3', 'a4', 'mol'), bond('a4', 'a5', 'mol'), bond('a2', 'm1', 'mol'), bond('a4', 'b1', 'mol'), bond('b1', 'b2', 'mol')] })], 300);
const longest = figure(
  'l',
  [
    skeleton({
      carbons,
      bonds: [bond('a1', 'a2', 'chain', 'good'), bond('a2', 'a3', 'chain', 'good'), bond('a3', 'a4', 'chain', 'good'), bond('a4', 'b1', 'chain', 'good'), bond('b1', 'b2', 'chain', 'good'), bond('a2', 'm1', 'branch'), bond('a4', 'a5', 'branch')],
      labels: numberLabels(['a1', 'a2', 'a3', 'a4', 'b1', 'b2'], ['below', 'below', 'below', 'below', 'left', 'above']),
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'xq-c30-3-2',
  lessonId: '',
  exam: {
    lesson: 'c30-3-2',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Hidden Longest Chain. Naming Hydrocarbons',
  thumbnailTitle: 'The Hidden Longest Chain',
  thumbnail: 'hi',
  summary:
    'A test-style question, solved one small step at a time: name CH₃–CH(CH₃)–CH₂–CH(CH₂CH₃)–CH₃. The formula is written as a five-carbon chain, but the longest chain runs into the ethyl group and has six carbons. Numbered from the end nearer the first branch, it is 2,4-dimethylhexane.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Hidden Longest Chain', subtitle: 'Naming a branched alkane' }],
      lines: [
        { say: 'In this video, we solve a test-style question about naming hydrocarbons. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Give the IUPAC name of the alkane $\\ce{CH3-CH(CH3)-CH2-CH(CH2CH3)-CH3}$.', answer: '2,4-dimethylhexane' }],
      lines: [
        { say: 'Here is the question. Give the IUPAC name of the alkane C H three, C H with a C H three branch, C H two, C H with a C H two C H three branch, C H three.', show: 'q', caption: 'Here is the question. Give the IUPAC name of the alkane CH₃–CH(CH₃)–CH₂–CH(CH₂CH₃)–CH₃.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find the **longest chain**, wherever it runs, then name the **branches** on it' }],
      lines: [
        { say: 'The name is built on the longest continuous chain of carbons. The way the formula is written does not have to show that chain in a straight line, so we have to look for it.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(naming, 'gc'), { kind: 'math', id: 'k', size: 'md', lines: ['1 \\text{ meth} \\quad 2 \\text{ eth} \\quad 3 \\text{ prop} \\quad 4 \\text{ but} \\quad 5 \\text{ pent} \\quad 6 \\text{ hex}'] }],
      lines: [
        { say: 'Here is what we need. A chain of carbons growing one at a time: methane, ethane, propane, butane.', show: 'gc', play: 'gc.grow' },
        { say: 'Each length has its own prefix: meth for one carbon, eth for two, prop for three, but for four, pent for five and hex for six. A branch takes the same prefix with y l: a one-carbon branch is methyl, a two-carbon branch is ethyl.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **longest** continuous chain: the **parent**', 'Number from the end **nearer** the first branch', 'Name the branches with **numbers**, and **di-** for two alike'] }],
      lines: [
        { say: 'Here is the plan. First, find the longest continuous chain. It gives the parent name.', show: 'plan.0' },
        { say: 'Then number the chain from the end nearer the first branch.', show: 'plan.1' },
        { say: 'Then name each branch with the number of its carbon, using di when two branches are the same.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The longest chain',
      layout: 'center',
      main: [written],
      lines: [
        { say: 'Step one. Here is the molecule as a line formula, drawn the way it is written: five carbons along the bottom, a methyl branch on the second, and an ethyl branch on the fourth. Each corner and each end is a carbon.', show: 'w.mol' },
      ],
    },
    {
      chapter: 'Step 1: Tracing every path',
      layout: 'center',
      main: [pick(hexanes, 'hi'), { kind: 'math', id: 'h', size: 'md', lines: ['\\text{a branch can be part of the longest chain}'] }],
      lines: [
        { say: 'The longest chain does not have to be the straight run along the bottom. Watch hexane\'s six carbons rearrange into branches.', show: 'hi', play: 'hi.one' },
        { say: 'The carbons are the same; only the path through them changes. So we trace every path from one end to another and count.', show: 'h.0' },
      ],
    },
    {
      chapter: 'Step 2: Number the chain',
      layout: 'center',
      main: [longest, { kind: 'math', id: 'n', size: 'md', lines: ['\\text{6 carbons: } \\good{\\text{hexane}} \\qquad \\text{methyls on } \\good{2 \\text{ and } 4}'] }],
      lines: [
        { say: 'Here is the longest chain, in green. It starts at the left, runs along to the fourth carbon, and turns up into the ethyl group. That is six carbons, so the parent is hexane.', show: ['l.chain', 'l.branch'] },
        { say: 'Now two methyl branches are left: the old methyl on one side, and the old end carbon on the other. Numbering from the left puts them on carbons two and four. From the other end they would be on three and five, which is higher, so we number from the left.', show: ['l.n', 'n.0'], focus: 'n.0' },
      ],
    },
    {
      chapter: 'Step 3: The name',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{2-methyl} + \\text{4-methyl} \\to \\text{2,4-dimethyl}', '\\good{\\text{2,4-dimethylhexane}}'] }],
      lines: [
        { say: 'Step three. Two methyl groups make dimethyl, with a number for each: two comma four dimethyl.', show: 'm.0', caption: 'Step three. Two methyl groups make dimethyl, with a number for each: 2,4-dimethyl.' },
        { say: 'Join it straight onto the parent: two comma four dimethylhexane.', show: 'm.1', focus: 'm.1', caption: 'Join it straight onto the parent: 2,4-dimethylhexane.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{name: } 6 + 1 + 1 = 8\\ \\ce{C}', '\\text{formula: } 1 + 1 + 1 + 1 + 2 + 1 + 1 = 8\\ \\ce{C}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**2,4-dimethylhexane**' },
      ],
      lines: [
        { say: 'Does it make sense? The name has six carbons in hexane and one in each methyl group, eight in all. The formula has eight carbons too, so nothing was lost or counted twice.', show: ['x.0', 'x.1'], caption: 'Does it make sense? The name has 6 carbons in hexane and 1 in each methyl, 8 in all. The formula has 8 carbons too, so nothing was lost or counted twice.' },
        { say: 'So the name is two comma four dimethylhexane.', show: 'ans', caption: 'So the name is 2,4-dimethylhexane.' },
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
            ['4-ethyl-2-methylpentane', 'Took the chain **as written**; the longest runs into the **ethyl**'],
            ['3,5-dimethylhexane', 'Numbered from the **wrong end**'],
            ['2,4-methylhexane', 'Left out **di-** for two methyl groups'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Four ethyl two methylpentane names the five-carbon chain as written. An ethyl group on carbon four of five always means a longer chain is hiding there.', focus: 'traps.0', caption: '4-ethyl-2-methylpentane names the five-carbon chain as written. An ethyl group on carbon 4 of 5 always means a longer chain is hiding there.' },
        { say: 'Three comma five dimethylhexane numbers from the other end. Two and four are lower, so they win.', focus: 'traps.1', caption: '3,5-dimethylhexane numbers from the other end. 2 and 4 are lower, so they win.' },
        { say: 'And two comma four methylhexane forgets the di that says there are two methyl groups.', focus: 'traps.2', caption: 'And 2,4-methylhexane forgets the di- that says there are two methyl groups.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Name $\\ce{CH3-CH2-CH(CH3)-CH(CH3)-CH2-CH3}$.',
          choices: ['2,3-diethylbutane', '3,4-dimethylhexane', '3,4-methylhexane', '4,3-dimethylhexane'],
          answer: 1,
          working: 'The longest chain is the six carbons as written: hexane. Methyls on carbons 3 and 4 from either end: 3,4-dimethylhexane.',
        },
      ],
      lines: [
        { say: 'Your turn. Name C H three, C H two, C H with a methyl, C H with a methyl, C H two, C H three. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Name CH₃–CH₂–CH(CH₃)–CH(CH₃)–CH₂–CH₃. Pause the video and try it.' },
        { say: 'The longest chain is the six carbons as written, so the parent is hexane. The two methyl groups are on carbons three and four from either end: three comma four dimethylhexane, choice B.', show: 'q2.answer', caption: 'The longest chain is the six carbons as written: hexane. The methyls are on carbons 3 and 4 from either end: 3,4-dimethylhexane, choice B.' },
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
          items: ['The parent is the **longest** chain, even through a branch', 'Number from the end **nearer** the first branch', 'Use **di-**, **tri-** with a number for every branch'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The parent is the longest continuous chain, even when it runs through what is written as a branch.', show: 'sum.0' },
        { say: 'Number from the end nearer the first branch.', show: 'sum.1' },
        { say: 'And use di or tri for branches that repeat, with a number for every one. For more on naming hydrocarbons, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
