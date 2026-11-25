import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import atoms from '@/content/chem8/videos/c8-1-1.ts';
import compounds from '@/content/chem8/videos/c8-1-2.ts';

// Exam question for Chemistry 8 lesson 1.1 (atoms and elements): the symbols for sodium, potassium
// and iron (Na, K, Fe), why "CO" is wrong for cobalt (it means carbon and oxygen), and why water is
// not an element (it is hydrogen and oxygen joined). Written by Gradileo in the style of a Grade 8
// science unit test.
//
// The pictures are lesson 1.1's three elements as particles, and lesson 1.2's hydrogen and oxygen
// joining into water (src/video/particles.ts).

const QUESTION = 'Answer these questions about elements. (a) Write the chemical symbols for sodium, potassium and iron. (b) A student writes the symbol for cobalt as "CO". Explain what is wrong. (c) Water is made from hydrogen and oxygen. Is water an element? Explain your answer.';

const video: Explainer = {
  id: 'xq-c8-1-1',
  lessonId: '',
  exam: {
    lesson: 'c8-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Symbols for Elements. Atoms and Elements',
  thumbnailTitle: 'Symbols for Elements',
  thumbnail: 'e',
  summary:
    'A test-style question, solved one small step at a time: the symbols for sodium, potassium and iron, what is wrong with writing cobalt as "CO", and whether water is an element. The symbols are Na, K and Fe, "CO" means carbon and oxygen, and water is not an element because it is made of two kinds of atom joined together.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Symbols for Elements', subtitle: 'Writing symbols, and spotting an element' }],
      lines: [
        { say: 'In this video, we solve a test-style question about atoms and elements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Na, K, Fe; CO is carbon and oxygen; no, water has two kinds of atom' }],
      lines: [
        { say: 'Here is the question. Part a: write the chemical symbols for sodium, potassium and iron. Part b: a student writes the symbol for cobalt as capital C, capital O. Explain what is wrong. Part c: water is made from hydrogen and oxygen. Is water an element? Explain your answer.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Write three **symbols** correctly, spot a **capital letter** mistake, and decide whether water has only **one kind of atom**' }],
      lines: [
        { say: 'The first two parts test how symbols are written, especially the capital letters. The last part tests what an element really is.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(atoms, 'e')],
      lines: [
        { say: 'Here is what we need. These are three elements: iron, bromine and helium. In each box, every particle is the same kind of atom.', show: ['e', 'e.labels'] },
        { say: 'Iron is a solid, bromine a liquid and helium a gas, but each is an element, because it contains only one kind of atom. An element cannot be broken down into anything simpler by a chemical reaction.', focus: ['e.fe', 'e.br', 'e.he'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['A symbol is **one capital** letter, sometimes then a **small** one', 'A few symbols come from **Latin** names', 'An element has only **one kind** of atom'] }],
      lines: [
        { say: 'Here is the plan. A symbol is one capital letter, sometimes followed by one small letter.', show: 'plan.0' },
        { say: 'A few symbols come from old Latin names, so they do not match the English name.', show: 'plan.1' },
        { say: 'And an element has only one kind of atom.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The symbols',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Element', 'Symbol', 'From'], rows: [['sodium', '**Na**', 'Latin *natrium*'], ['potassium', '**K**', 'Latin *kalium*'], ['iron', '**Fe**', 'Latin *ferrum*']] }],
      lines: [
        { say: 'Step one. All three of these come from Latin names, which is why they are tricky. Sodium is N a, from the Latin natrium.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Potassium is capital K, from kalium.', show: 't.1', focus: 't.1' },
        { say: 'And iron is F e, from ferrum. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: Co or CO?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Co} = \\text{cobalt, one element}', '\\text{CO} = \\text{C} + \\text{O, carbon and oxygen}'] }],
      lines: [
        { say: 'Step two. Cobalt\'s symbol is capital C, small o.', show: 'm.0' },
        { say: 'Every capital letter starts a new symbol. So capital C, capital O means two elements, carbon and oxygen. That is carbon monoxide, not cobalt. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Is water an element?',
      layout: 'center',
      main: [pick(compounds, 'r')],
      lines: [
        { say: 'Step three. Here are hydrogen molecules, in yellow, and oxygen molecules, in red.', show: ['r', 'r.labels', 'r.thermo'] },
        { say: 'A spark makes them react, and their atoms join up as water molecules. Each water molecule holds two kinds of atom, hydrogen and oxygen, joined together. So water is not an element. It is a compound, and a reaction can split it back into hydrogen and oxygen. That is part c.', play: 'r.spark', show: 'r.tally' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Na**, **K**, **Fe**. (b) The second letter must be **small**: Co. "CO" means **carbon and oxygen**. (c) **No**: water has **two kinds** of atom joined, so it is a compound.' },
      ],
      lines: [
        { say: 'Does it make sense? Each symbol starts with one capital letter, and an element can never be made from two other elements.', show: 'ans' },
        { say: 'So the symbols are N a, K and F e, cobalt needs a small o, and water is a compound, not an element.' },
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
            ['**S** for sodium, **P** for potassium', 'S is sulfur and P is phosphorus'],
            ['**Ir** for iron', 'Ir is iridium; iron is Fe, from Latin'],
            ['Water is an element', 'It is **two** elements joined'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'S and P are already taken, by sulfur and phosphorus. Sodium and potassium use their Latin names.', focus: 'traps.0' },
        { say: 'I r is iridium, a different metal. Iron is F e.', focus: 'traps.1' },
        { say: 'And water feels basic, but it is made of hydrogen and oxygen atoms joined, so it is a compound.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the correct symbol for magnesium?',
          choices: ['Mg', 'MG', 'mg', 'M'],
          answer: 0,
          working: 'One capital letter, then one small letter: Mg. "MG" would be two elements, and "M" is not a symbol.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the correct symbol for magnesium? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'One capital letter, then one small letter: M g, choice A. Two capitals would mean two elements.', show: 'q2.answer' },
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
          items: ['A symbol: **one capital**, then maybe **one small** letter', 'Some symbols are **Latin**: Na, K, Fe', 'An element has only **one kind** of atom'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A symbol is one capital letter, sometimes followed by one small letter.', show: 'sum.0' },
        { say: 'Some symbols come from Latin names, such as N a for sodium, K for potassium and F e for iron.', show: 'sum.1' },
        { say: 'And an element has only one kind of atom. For more on atoms and elements, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
