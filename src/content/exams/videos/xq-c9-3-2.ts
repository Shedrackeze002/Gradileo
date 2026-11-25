import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 9 lesson 3.2 (balancing equations): balance the equations for
// making ammonia and burning methane, and explain why changing H₂O to H₂O₂ is not allowed. Written
// by Gradileo in the style of a Grade 9 science unit test.
//
// The pictures are the two balanced reactions happening atom by atom, with the atoms counted
// on each side (src/content/chem10/videos/lib/c10-equations.ts).

const QUESTION = 'Balance each symbol equation. (a) N₂ + H₂ → NH₃. (b) CH₄ + O₂ → CO₂ + H₂O. (c) To balance H₂ + O₂ → H₂O, a student changes it to H₂ + O₂ → H₂O₂. Explain why this is wrong, and write the correctly balanced equation.';

const video: Explainer = {
  id: 'xq-c9-3-2',
  lessonId: '',
  exam: {
    lesson: 'c9-3-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Ammonia, Methane and a Wrong Formula. Balancing Equations',
  thumbnailTitle: 'Balancing Three Equations',
  thumbnail: 'am',
  summary:
    'A test-style question, solved one small step at a time: balance the equations for making ammonia and burning methane, and say why changing H₂O to H₂O₂ is wrong. The balanced equations are N₂ + 3H₂ → 2NH₃ and CH₄ + 2O₂ → CO₂ + 2H₂O. Changing a formula makes a different substance, hydrogen peroxide, so we change only the numbers in front: 2H₂ + O₂ → 2H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Balancing Three Equations', subtitle: 'Same atoms in, same atoms out' }],
      lines: [
        { say: 'In this video, we solve a test-style question about balancing equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'N₂ + 3H₂ → 2NH₃; CH₄ + 2O₂ → CO₂ + 2H₂O; 2H₂ + O₂ → 2H₂O' }],
      lines: [
        { say: 'Here is the question. Balance each symbol equation. Part a: N two plus H two makes N H three. Part b: C H four plus O two makes C O two plus H two O. Part c: to balance H two plus O two makes H two O, a student changes it to H two plus O two makes H two O two. Explain why this is wrong, and write the correctly balanced equation.', caption: 'Here is the question. Balance each symbol equation. (a) N₂ + H₂ → NH₃. (b) CH₄ + O₂ → CO₂ + H₂O. (c) To balance H₂ + O₂ → H₂O, a student changes it to H₂ + O₂ → H₂O₂. Explain why this is wrong, and write the correctly balanced equation.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Make every kind of atom appear the **same number of times** on both sides' }],
      lines: [
        { say: 'Atoms are never created or destroyed, so each kind of atom must appear the same number of times on both sides. We do that by changing how many molecules there are.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [reaction('am', { from: [{ t: 'N2' }, { t: 'H2', n: 3 }], to: [{ t: 'NH3', n: 2 }], counts: true })],
      lines: [
        { say: 'Here is what we need. One nitrogen molecule and three hydrogen molecules, with the atoms counted underneath: two nitrogen and six hydrogen.', show: 'am' },
        { say: 'Watch the bonds break and the atoms join up as ammonia. They make two ammonia molecules, and the count underneath is the same: two nitrogen and six hydrogen. Nothing is gained or lost.', play: 'am.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Count** each kind of atom on both sides', 'Change only the **big numbers** in front', '**Never** change a formula'] }],
      lines: [
        { say: 'Here is the plan. Count each kind of atom on both sides.', show: 'plan.0' },
        { say: 'Balance them by changing only the big numbers in front of the formulas, called coefficients.', show: 'plan.1' },
        { say: 'And never change the small numbers inside a formula.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Ammonia',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{N: } 2 \\text{ left, so } 2\\,\\ce{NH3}', '\\text{H: } 2 \\times 3 = 6 \\text{ right, so } 3\\,\\ce{H2}', '\\good{\\ce{N2 + 3H2 -> 2NH3}}'] }],
      lines: [
        { say: 'Step one. There are two nitrogen atoms on the left, so we need two ammonia molecules on the right.', show: 'm.0' },
        { say: 'Two ammonia molecules hold six hydrogen atoms, so we need three hydrogen molecules on the left.', show: 'm.1' },
        { say: 'So the balanced equation is N two plus three H two makes two N H three, just as the animation showed. That is part a.', caption: 'So the balanced equation is N₂ + 3H₂ → 2NH₃, just as the animation showed. That is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Methane',
      layout: 'center',
      main: [reaction('mb', { from: [{ t: 'CH4' }, { t: 'O2', n: 2 }], to: [{ t: 'CO2' }, { t: 'H2O', n: 2 }], counts: true })],
      lines: [
        { say: 'Step two. Carbon is already balanced, one on each side. Methane has four hydrogen atoms, so we need two water molecules on the right.', show: 'mb' },
        { say: 'Now the right has two oxygen atoms in carbon dioxide and two in the water, four in all, so we need two oxygen molecules. Watch it happen: C H four plus two O two makes C O two plus two H two O. That is part b.', caption: 'Now the right has two O in CO₂ and two in the water, four in all, so we need two O₂. Watch it happen: CH₄ + 2O₂ → CO₂ + 2H₂O. That is part b.', play: 'mb.go' },
      ],
    },
    {
      chapter: 'Step 3: The wrong formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'w', size: 'md', lines: ['\\bad{\\ce{H2O2}} \\text{ is hydrogen peroxide, not water}', '\\good{\\ce{2H2 + O2 -> 2H2O}}'] }],
      lines: [
        { say: 'Step three. Changing H two O to H two O two changes the substance. H two O two is hydrogen peroxide, a bleach, and not water at all.', caption: 'Step three. Changing H₂O to H₂O₂ changes the substance. H₂O₂ is hydrogen peroxide, a bleach, and not water at all.', show: 'w.0', focus: 'w.0' },
        { say: 'Instead, put a two in front of the water to balance the oxygen, then a two in front of the hydrogen. Two H two plus O two makes two H two O. That is part c.', caption: 'Instead, put a 2 in front of the water to balance the oxygen, then a 2 in front of the hydrogen: 2H₂ + O₂ → 2H₂O. That is part c.', show: 'w.1', focus: 'w.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **N₂ + 3H₂ → 2NH₃**. (b) **CH₄ + 2O₂ → CO₂ + 2H₂O**. (c) Changing the formula makes a **different substance**; balance with coefficients: **2H₂ + O₂ → 2H₂O**.' },
      ],
      lines: [
        { say: 'Does it make sense? Count each one again. In the methane equation, there is one carbon, four hydrogen and four oxygen on each side.', show: 'ans' },
        { say: 'So the balanced equations are N two plus three H two makes two N H three, C H four plus two O two makes C O two plus two H two O, and two H two plus O two makes two H two O.', caption: 'So the balanced equations are N₂ + 3H₂ → 2NH₃, CH₄ + 2O₂ → CO₂ + 2H₂O and 2H₂ + O₂ → 2H₂O.' },
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
            ['N₂ + H₂ → N₂H₂', 'Changed the **formula** of the product'],
            ['CH₄ + O₂ → CO₂ + 2H₂O', 'Forgot to **recount** the oxygen'],
            ['H₂ + O₂ → H₂O₂', 'Made **hydrogen peroxide**, not water'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'N two H two is not ammonia. The product must stay N H three.', caption: 'N₂H₂ is not ammonia. The product must stay NH₃.', focus: 'traps.0' },
        { say: 'After adding the two in front of the water, the oxygen on the right rises to four. Always recount every atom after each change.', focus: 'traps.1' },
        { say: 'And changing a small number changes the substance itself, so only the big numbers in front may change.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the correctly balanced equation for magnesium burning in oxygen?',
          choices: ['Mg + O₂ → MgO₂', '2Mg + O₂ → 2MgO', 'Mg + 2O₂ → MgO', 'Mg + O → MgO'],
          answer: 1,
          working: 'Two O on the left need 2MgO on the right, which needs 2Mg on the left.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the correctly balanced equation for magnesium burning in oxygen? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two oxygen atoms on the left need two magnesium oxides on the right, which need two magnesium atoms on the left: two M g plus O two makes two M g O, choice B.', caption: 'Two O on the left need 2MgO on the right, which need 2Mg on the left: 2Mg + O₂ → 2MgO, choice B.', show: 'q2.answer' },
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
          items: ['Same number of each atom on **both sides**', 'Change only the **coefficients**', '**Recount** after every change'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A balanced equation has the same number of each kind of atom on both sides.', show: 'sum.0' },
        { say: 'Balance by changing only the coefficients, never the formulas.', show: 'sum.1' },
        { say: 'And recount every atom after each change. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
