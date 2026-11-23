import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import compounds from '@/content/chem8/videos/c8-1-2.ts';

// Exam question for Chemistry 8 lesson 1.2 (compounds and molecules): carbon dioxide is a compound,
// its molecule has 3 atoms, and oxygen gas is made of molecules but is still an element, because
// both its atoms are oxygen. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The pictures are the lesson's neon, oxygen and water as particles, and its four particle
// diagrams (src/video/particles.ts).

const QUESTION = 'Carbon dioxide is made when carbon burns in oxygen. Each carbon dioxide molecule has one carbon atom joined to two oxygen atoms. (a) Is carbon dioxide an element or a compound? Explain. (b) How many atoms are in one molecule of carbon dioxide? (c) Oxygen gas is also made of molecules, each of two oxygen atoms. Is oxygen gas an element or a compound? Explain.';

const video: Explainer = {
  id: 'xq-c8-1-2',
  lessonId: '',
  exam: {
    lesson: 'c8-1-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Carbon Dioxide and Oxygen. Compounds and Molecules',
  thumbnailTitle: 'Carbon Dioxide and Oxygen',
  thumbnail: 'm',
  summary:
    'A test-style question, solved one small step at a time: is carbon dioxide an element or a compound, how many atoms are in its molecule, and is oxygen gas an element or a compound? Carbon dioxide is a compound of two elements with 3 atoms in each molecule, and oxygen gas is an element even though it is made of molecules, because its atoms are all oxygen.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Carbon Dioxide and Oxygen', subtitle: 'Molecules of elements and of compounds' }],
      lines: [
        { say: 'In this video, we solve a test-style question about compounds and molecules. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'A compound; 3 atoms; an element' }],
      lines: [
        { say: 'Here is the question. Carbon dioxide is made when carbon burns in oxygen. Each carbon dioxide molecule has one carbon atom joined to two oxygen atoms. Part a: is carbon dioxide an element or a compound? Explain. Part b: how many atoms are in one molecule of carbon dioxide? Part c: oxygen gas is also made of molecules, each of two oxygen atoms. Is oxygen gas an element or a compound? Explain.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Look inside each molecule: how many atoms, and how many **kinds** of atom?' }],
      lines: [
        { say: 'Both substances are made of molecules, so having molecules cannot be what decides it. We need to look at the kinds of atom inside each molecule.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(compounds, 'm')],
      lines: [
        { say: 'Here is what we need. These are three gases, drawn as particles. Neon is single atoms, all the same kind, so it is an element.', show: ['m', 'm.labels'], focus: 'm.ne' },
        { say: 'Oxygen is molecules, pairs of joined atoms, but every atom is oxygen, so it is still an element.', focus: 'm.o2' },
        { say: 'Water is molecules too, but each holds two kinds of atom, hydrogen and oxygen, chemically joined. That makes water a compound.', focus: 'm.w' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**One** kind of atom: an **element**', '**Two or more** kinds, chemically joined: a **compound**', 'A **molecule** is any group of joined atoms'] }],
      lines: [
        { say: 'Here is the plan. If all the atoms are one kind, it is an element.', show: 'plan.0' },
        { say: 'If two or more kinds of atom are chemically joined, it is a compound.', show: 'plan.1' },
        { say: 'And a molecule is any group of joined atoms, in an element or a compound.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Carbon dioxide',
      layout: 'center',
      main: [pick(compounds, 'd')],
      lines: [
        { say: 'Step one. Here are four particle diagrams. Box C shows carbon dioxide: each molecule is one carbon atom joined to two oxygen atoms.', show: ['d', 'd.labels'], focus: 'd.c' },
        { say: 'There are two kinds of atom, carbon and oxygen, chemically joined. So carbon dioxide is a compound. That is part a.', focus: 'd.c' },
      ],
    },
    {
      chapter: 'Step 2: Count the atoms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\text{carbon} + 2\\ \\text{oxygen}', '= \\good{3\\ \\text{atoms}}'] }],
      lines: [
        { say: 'Step two. One molecule has one carbon atom and two oxygen atoms.', show: 'm.0' },
        { say: 'One plus two is three atoms in each molecule. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Oxygen gas',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'o', items: ['Each molecule: **two** atoms joined', 'Both atoms are **oxygen**: only **one kind**', 'So oxygen gas is an **element**'] }],
      lines: [
        { say: 'Step three. A molecule of oxygen gas is two atoms joined together.', show: 'o.0' },
        { say: 'But both atoms are oxygen, so there is only one kind of atom.', show: 'o.1' },
        { say: 'So oxygen gas is an element, even though it is made of molecules. That is part c.', show: 'o.2', focus: 'o.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) A **compound**: carbon and oxygen atoms chemically joined. (b) **3** atoms. (c) An **element**: its molecules contain only **oxygen** atoms.' },
      ],
      lines: [
        { say: 'Does it make sense? Oxygen is on the periodic table and carbon dioxide is not, which fits one being an element and the other a compound.', show: 'ans' },
        { say: 'So carbon dioxide is a compound with three atoms in each molecule, and oxygen gas is an element.' },
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
            ['Oxygen gas is a **compound**', 'Thought every **molecule** is a compound'],
            ['**2** atoms in carbon dioxide', 'Counted the **kinds** of atom, not the atoms'],
            ['Carbon dioxide is a **mixture**', 'Its atoms are chemically **joined**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Molecules are not only found in compounds. Oxygen, hydrogen and nitrogen gases are all elements made of molecules.', focus: 'traps.0' },
        { say: 'Two is the number of kinds of atom. The number of atoms is three, because there are two oxygens.', focus: 'traps.1' },
        { say: 'And carbon dioxide is not a mixture of carbon and oxygen. Its atoms are chemically joined into new molecules.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a compound?',
          choices: ['Neon', 'Water', 'Oxygen gas', 'Iron'],
          answer: 1,
          working: 'Water has hydrogen and oxygen atoms chemically joined. The other three each have only one kind of atom.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a compound? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Water has hydrogen and oxygen atoms chemically joined, so it is a compound: choice B. Neon, oxygen gas and iron each have only one kind of atom.', show: 'q2.answer' },
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
          items: ['Element: **one** kind of atom', 'Compound: **two or more** kinds, chemically **joined**', 'Elements can be made of **molecules** too'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An element has only one kind of atom.', show: 'sum.0' },
        { say: 'A compound has two or more kinds of atom, chemically joined.', show: 'sum.1' },
        { say: 'And elements can be made of molecules too, like oxygen gas. For more on compounds and molecules, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
