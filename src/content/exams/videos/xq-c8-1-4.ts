import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import formulas from '@/content/chem8/videos/c8-1-4.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 8 lesson 1.4 (chemical formulas): glucose, C6H12O6, has three
// elements and 24 atoms; magnesium nitrate, Mg(NO3)2, has 9 atoms; and 3H2O is three water
// molecules with 6 hydrogen atoms. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The pictures are the lesson's loose atoms joining into carbon dioxide and water, and three water
// molecules built from six hydrogen and three oxygen atoms (src/content/chem10/videos/lib).

const QUESTION = 'Use these chemical formulas to answer the questions. (a) Glucose is C6H12O6. Name the elements in glucose, and find the total number of atoms in one molecule. (b) How many atoms of each element does the formula Mg(NO3)2 show? (c) What does 3H2O mean, and how many hydrogen atoms does it show?';

const video: Explainer = {
  id: 'xq-c8-1-4',
  lessonId: '',
  exam: {
    lesson: 'c8-1-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Counting Atoms. Chemical Formulas',
  thumbnailTitle: 'Counting Atoms',
  thumbnail: 'fj',
  summary:
    'A test-style question, solved one small step at a time: name the elements in glucose, C₆H₁₂O₆, and count its atoms, count the atoms in Mg(NO₃)₂, and read 3H₂O. Glucose has carbon, hydrogen and oxygen, 24 atoms in all; Mg(NO₃)₂ has 1 magnesium, 2 nitrogen and 6 oxygen atoms; and 3H₂O is three water molecules with 6 hydrogen atoms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Counting Atoms', subtitle: 'Subscripts, brackets and big numbers' }],
      lines: [
        { say: 'In this video, we solve a test-style question about chemical formulas. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Use these formulas to answer the questions. (a) Glucose is $\\ce{C6H12O6}$. Name its elements, and find the total number of atoms in one molecule. (b) How many atoms of each element does $\\ce{Mg(NO3)2}$ show? (c) What does $\\ce{3H2O}$ mean, and how many hydrogen atoms does it show?', answer: 'C, H, O and 24 atoms; 1 Mg, 2 N, 6 O; three water molecules, 6 H' }],
      lines: [
        { say: 'Here is the question. Part a: glucose is C six, H twelve, O six. Name the elements in glucose, and find the total number of atoms in one molecule. Part b: how many atoms of each element does M g, N O three in brackets, two, show? Part c: what does three H two O mean, and how many hydrogen atoms does it show?', caption: 'Here is the question. Part a: glucose is C₆H₁₂O₆. Name the elements in glucose, and find the total number of atoms in one molecule. Part b: how many atoms of each element does Mg(NO₃)₂ show? Part c: what does 3H₂O mean, and how many hydrogen atoms does it show?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Read each formula like a **recipe**: which atoms, and **how many** of each' }],
      lines: [
        { say: 'A formula is a recipe for one unit of a substance. We read the symbols to find the elements, and the numbers to count the atoms.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(formulas, 'fj')],
      lines: [
        { say: 'Here is what we need. These are loose atoms: one carbon, three oxygens and two hydrogens.', show: 'fj' },
        { say: 'Watch them join. One carbon and two oxygens make C O two, and two hydrogens and one oxygen make H two O. The small number after a symbol counts the atoms of that element, and no number means one.', caption: 'Watch them join. One carbon and two oxygens make CO₂, and two hydrogens and one oxygen make H₂O. The small number after a symbol counts the atoms of that element, and no number means one.', play: 'fj.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['A small number counts the atom **before** it', 'A number after a **bracket** multiplies everything inside', 'A big number **in front** counts whole molecules'] }],
      lines: [
        { say: 'Here is the plan. A small number after a symbol counts the atom just before it.', show: 'plan.0' },
        { say: 'A small number after a bracket multiplies everything inside the bracket.', show: 'plan.1' },
        { say: 'And a big number in front counts whole molecules.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Glucose',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{C6H12O6}: \\ \\text{C, H, O}', '6 + 12 + 6 = \\good{24\\ \\text{atoms}}'] }],
      lines: [
        { say: 'Step one. Each capital letter starts a new symbol, so glucose has carbon, hydrogen and oxygen.', show: 'm.0' },
        { say: 'It has six carbon atoms, twelve hydrogen atoms and six oxygen atoms. Six plus twelve plus six is twenty four atoms. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The bracket',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Mg(NO3)2}', '\\text{Mg: } 1 \\quad \\text{N: } 1 \\times 2 = 2 \\quad \\text{O: } 3 \\times 2 = 6', '1 + 2 + 6 = \\good{9\\ \\text{atoms}}'] }],
      lines: [
        { say: 'Step two. Magnesium has no number after it, so there is one magnesium atom.', show: ['m.0', 'm.1'] },
        { say: 'The two after the bracket doubles everything inside. One nitrogen times two is two, and three oxygens times two is six. So one magnesium, two nitrogens and six oxygens, nine atoms in all. That is part b.', show: 'm.2', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Three waters',
      layout: 'center',
      main: [reaction('w', { from: [{ t: 'H', n: 6, label: '6 H' }, { t: 'O', n: 3, label: '3 O' }], to: [{ t: 'H2O', n: 3, label: '3 H₂O' }], counts: true })],
      lines: [
        { say: 'Step three. The big three in front means three whole molecules of water. Here are six hydrogen atoms and three oxygen atoms.', show: 'w' },
        { say: 'Watch them join into three water molecules. Each has two hydrogen atoms, so three molecules have three times two, six hydrogen atoms. That is part c.', play: 'w.go' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Carbon, hydrogen and oxygen; **24** atoms. (b) **1** Mg, **2** N, **6** O. (c) **Three** water molecules, with **6** hydrogen atoms.' },
      ],
      lines: [
        { say: 'Does it check? Count again with your finger on each number, and remember that the bracket and the big number both multiply.', show: 'ans' },
        { say: 'So glucose has three elements and twenty four atoms, magnesium nitrate shows one magnesium, two nitrogens and six oxygens, and three H two O has six hydrogen atoms.', caption: 'So glucose has three elements and twenty four atoms, magnesium nitrate shows one magnesium, two nitrogens and six oxygens, and 3H₂O has six hydrogen atoms.' },
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
            ['$3$ atoms in glucose', 'Counted the **elements**, not the atoms'],
            ['$\\ce{Mg(NO3)2}$: 3 O', 'Forgot the **bracket** doubles the oxygens'],
            ['$\\ce{3H2O}$: 2 H', 'Forgot the **3** in front'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Three is the number of elements in glucose. The number of atoms is twenty four.', focus: 'traps.0' },
        { say: 'Three oxygens forgets that the two after the bracket doubles everything inside it.', focus: 'traps.1' },
        { say: 'And two hydrogens is one molecule\'s worth. The three in front means three molecules, so six.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many oxygen atoms does $\\ce{2CO2}$ show?',
          choices: ['$2$', '$3$', '$6$', '$4$'],
          answer: 3,
          working: 'Each $\\ce{CO2}$ has $2$ oxygen atoms, and there are $2$ molecules: $2 \\times 2 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many oxygen atoms does two C O two show? Pause the video and try it.', caption: 'Your turn. How many oxygen atoms does 2CO₂ show? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Each carbon dioxide molecule has two oxygen atoms, and there are two molecules. Two times two is four: choice D.', show: 'q2.answer' },
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
          items: ['A small number counts the atom **before** it', 'A number after a **bracket** multiplies all inside', 'A big number **in front** counts molecules'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A small number after a symbol counts the atom before it, and no number means one.', show: 'sum.0' },
        { say: 'A number after a bracket multiplies everything inside the bracket.', show: 'sum.1' },
        { say: 'And a big number in front counts whole molecules. For more on formulas, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
