import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import { redox } from '@/content/chem30/videos/lib/c30-atoms.ts';
import oxidation from '@/content/chem30/videos/c30-2-1.ts';

// Exam question for Chemistry 30 lesson 2.1 (oxidation and reduction): aluminium burns in oxygen,
// 4Al + 3O2 -> 2Al2O3. Write the half-reactions, name the oxidising and reducing agents, and count
// the electrons transferred. Gradileo wrote the question in the style of a unit test. The answer:
// Al -> Al3+ + 3e- (oxidation), O2 + 4e- -> 2O2- (reduction), O2 is the oxidising agent and Al the
// reducing agent, and 4 x 3 = 3 x 4 = 12 electrons are transferred.
//
// The pictures are atoms with their electrons in shells (src/video/atoms.ts): the lesson's
// magnesium atom giving two electrons to an oxygen atom, and two aluminium atoms giving their six
// outer electrons to three oxygen atoms (half the equation as written).

const QUESTION = 'Aluminium reacts with oxygen to form aluminium oxide: 4Al(s) + 3O₂(g) → 2Al₂O₃(s). (a) Write the oxidation and reduction half-reactions. (b) Identify the oxidising agent and the reducing agent. (c) How many electrons are transferred in the equation as written?';

const video: Explainer = {
  id: 'xq-c30-2-1',
  lessonId: '',
  exam: {
    lesson: 'c30-2-1',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Aluminium Meets Oxygen. Oxidation and Reduction',
  thumbnailTitle: 'Aluminium Meets Oxygen',
  thumbnail: 'ao',
  summary:
    'A test-style question, solved one small step at a time: aluminium reacts with oxygen to form aluminium oxide. We write the oxidation and reduction half-reactions, watch the electrons move from aluminium atoms to oxygen atoms to name the oxidising and reducing agents, and count the 12 electrons transferred in the equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Aluminium Meets Oxygen', subtitle: 'Half-reactions, agents and electrons transferred' }],
      lines: [
        { say: 'In this video, we solve a test-style question about oxidation and reduction. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Aluminium reacts with oxygen to form aluminium oxide: $\\ce{4Al(s) + 3O2(g) -> 2Al2O3(s)}$. (a) Write the oxidation and reduction half-reactions. (b) Identify the oxidising agent and the reducing agent. (c) How many electrons are transferred in the equation as written?',
          answer: 'Al → Al³⁺ + 3e⁻ and O₂ + 4e⁻ → 2O²⁻; O₂ oxidises, Al reduces; 12 electrons',
        },
      ],
      lines: [
        { say: 'Here is the question. Aluminium reacts with oxygen to form aluminium oxide: four aluminium plus three oxygen molecules give two aluminium oxide. Part a: write the oxidation and reduction half-reactions. Part b: identify the oxidising agent and the reducing agent. Part c: how many electrons are transferred in the equation as written?', show: 'q', caption: 'Here is the question. Aluminium reacts with oxygen: 4Al(s) + 3O₂(g) → 2Al₂O₃(s). (a) Write the oxidation and reduction half-reactions. (b) Identify the oxidising agent and the reducing agent. (c) How many electrons are transferred in the equation as written?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Follow the **electrons**: who **loses** them, who **gains** them, and **how many** move' }],
      lines: [
        { say: 'All three parts are about the electrons. Which atoms lose them, which atoms gain them, and how many move across in the whole equation.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(oxidation, 'mo'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{oxidation} = \\text{loss of } e^- \\qquad \\text{reduction} = \\text{gain of } e^-'] }],
      lines: [
        { say: 'Here is what we need. A magnesium atom meets an oxygen atom. Watch the two outer electrons of the magnesium atom.', show: ['mo', 'mo.labels', 'mo.arrangement'], play: 'mo.give' },
        { say: 'They move across to the oxygen atom. Magnesium loses electrons, so it is oxidised. Oxygen gains them, so it is reduced.', show: 'mo.charges' },
        { say: 'So oxidation is a loss of electrons and reduction is a gain of electrons, and the two always happen together.', show: 'k.0', caption: 'So oxidation is a loss of electrons and reduction is a gain of electrons, and the two always happen together.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write what happens to **one aluminium atom** and **one oxygen molecule**', 'The species that is **reduced** is the **oxidising agent**', 'Count the electrons for **4 Al** and for **3 O₂**'] }],
      lines: [
        { say: 'Here is the plan. First, write what happens to one aluminium atom and to one oxygen molecule.', show: 'plan.0' },
        { say: 'Then name the agents. The species that is reduced is the oxidising agent, and the species that is oxidised is the reducing agent.', show: 'plan.1' },
        { say: 'Then count the electrons for four aluminium atoms and for three oxygen molecules.', show: 'plan.2', caption: 'Then count the electrons for 4 Al and for 3 O₂.' },
      ],
    },
    {
      chapter: 'Step 1: The half-reactions',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'lg', lines: ['\\text{oxidation: } \\ce{Al -> Al^3+ + 3e^-}', '\\text{reduction: } \\ce{O2 + 4e^- -> 2O^2-}'] }],
      lines: [
        { say: 'Step one. Aluminium oxide is made of aluminium ions with a charge of three plus. So each aluminium atom loses three electrons: aluminium gives an aluminium three plus ion plus three electrons. That is the oxidation.', show: 'h.0', focus: 'h.0', caption: 'Step one. Aluminium oxide is made of Al³⁺ ions. So each aluminium atom loses three electrons: Al → Al³⁺ + 3e⁻. That is the oxidation.' },
        { say: 'The oxide ion has a charge of two minus, and an oxygen molecule has two oxygen atoms. So one oxygen molecule takes four electrons to become two oxide ions. That is the reduction.', show: 'h.1', focus: 'h.1', caption: 'The oxide ion is O²⁻, and O₂ has two oxygen atoms. So O₂ + 4e⁻ → 2O²⁻. That is the reduction.' },
      ],
    },
    {
      chapter: 'Step 2: The agents',
      layout: 'center',
      main: [
        redox('ao', [
          { id: 'o1', symbol: 'O', protons: 8, name: 'oxygen', at: [3, 3.6], tone: 'good' },
          { id: 'a1', symbol: 'Al', protons: 13, name: 'aluminium', at: [9, 3.6], tone: 'brand' },
          { id: 'o2', symbol: 'O', protons: 8, name: 'oxygen', at: [15, 3.6], tone: 'good' },
          { id: 'a2', symbol: 'Al', protons: 13, name: 'aluminium', at: [21, 3.6], tone: 'brand' },
          { id: 'o3', symbol: 'O', protons: 8, name: 'oxygen', at: [27, 3.6], tone: 'good' },
        ], [{ from: 'a1', to: 'o1', n: 2 }, { from: 'a1', to: 'o2', n: 1 }, { from: 'a2', to: 'o2', n: 1 }, { from: 'a2', to: 'o3', n: 2 }], [30, 7.2], 340),
        { kind: 'math', id: 'g', size: 'md', lines: ['\\text{oxidising agent: } \\good{\\ce{O2}} \\qquad \\text{reducing agent: } \\good{\\ce{Al}}'] },
      ],
      lines: [
        { say: 'Step two. Here are two aluminium atoms and three oxygen atoms. Each aluminium atom has three outer electrons, and each oxygen atom has six. Watch where the aluminium electrons go.', show: ['ao', 'ao.labels', 'ao.arrangement'], play: 'ao.give' },
        { say: 'They move across to the oxygen atoms. Every aluminium atom loses three electrons, and every oxygen atom gains two, so each one ends up with a full outer shell.', show: 'ao.charges' },
        { say: 'Oxygen takes the electrons, so oxygen is reduced, and it is the oxidising agent. Aluminium gives them, so aluminium is oxidised, and it is the reducing agent.', show: 'g.0', focus: 'g.0', caption: 'Oxygen takes the electrons, so O₂ is reduced, and it is the oxidising agent. Aluminium gives them, so Al is oxidised, and it is the reducing agent.' },
      ],
    },
    {
      chapter: 'Step 3: Count the electrons',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['\\text{lost: } 4\\ \\ce{Al} \\times 3e^- = 12e^-', '\\text{gained: } 3\\ \\ce{O2} \\times 4e^- = 12e^-', '\\text{transferred: } \\good{12\\ \\text{electrons}}'] }],
      lines: [
        { say: 'Step three. The picture showed six electrons moving, but it was only half of the equation. The equation has four aluminium atoms, and each loses three electrons, so twelve electrons are lost.', show: 'n.0', focus: 'n.0', caption: 'Step three. The picture showed six electrons, but it was only half of the equation. Four Al atoms each lose 3 electrons: 4 × 3 = 12 electrons lost.' },
        { say: 'Three oxygen molecules each gain four electrons, so twelve electrons are gained.', show: 'n.1', focus: 'n.1', caption: 'Three O₂ molecules each gain 4 electrons: 3 × 4 = 12 electrons gained.' },
        { say: 'So twelve electrons are transferred in the equation as written.', show: 'n.2', focus: 'n.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'c', size: 'md', lines: ['\\ce{4Al -> 4Al^3+ + 12e^-}', '\\ce{3O2 + 12e^- -> 6O^2-}', '\\ce{4Al + 3O2 -> 4Al^3+ + 6O^2-}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\ce{Al -> Al^3+ + 3e^-}$ and $\\ce{O2 + 4e^- -> 2O^2-}$. $\\ce{O2}$ is the oxidising agent, $\\ce{Al}$ the reducing agent, and **12 electrons** are transferred.' },
      ],
      lines: [
        { say: 'Does it make sense? Multiply the oxidation by four and the reduction by three, and both have twelve electrons.', show: ['c.0', 'c.1'] },
        { say: 'Add them, and the twelve electrons cancel. Four aluminium three plus ions and six oxide ions are exactly two formula units of aluminium oxide, so we get the equation we started with.', show: 'c.2', focus: 'c.2', caption: 'Add them, and the twelve electrons cancel. 4Al³⁺ and 6O²⁻ are exactly 2Al₂O₃, so we get the equation we started with.' },
        { say: 'So oxygen is the oxidising agent, aluminium is the reducing agent, and twelve electrons are transferred.', show: 'ans' },
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
            ['$3$ electrons', 'Counted **one** aluminium atom, not all **four**'],
            ['$6$ electrons', 'Gave each $\\ce{O2}$ **two** electrons, as if it were one atom'],
            ['$\\ce{Al}$ is the oxidising agent', 'Named the species that is **oxidised**; the agent is the other one'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Three electrons is what one aluminium atom loses. The equation has four of them.', focus: 'traps.0' },
        { say: 'Six electrons treats each oxygen molecule as a single atom. An oxygen molecule has two atoms, so it takes four electrons.', focus: 'traps.1' },
        { say: 'And calling aluminium the oxidising agent mixes up the names. Aluminium is oxidised, so it is the reducing agent: it does the reducing to oxygen.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\ce{2Na(s) + Cl2(g) -> 2NaCl(s)}$, how many electrons are transferred, and what is the oxidising agent?',
          choices: ['$2$, and $\\ce{Cl2}$', '$1$, and $\\ce{Cl2}$', '$2$, and $\\ce{Na}$', '$4$, and $\\ce{Cl2}$'],
          answer: 0,
          working: 'Each $\\ce{Na}$ loses one electron, and there are two: $2 \\times 1 = 2$. $\\ce{Cl2 + 2e^- -> 2Cl^-}$, so chlorine is reduced and is the oxidising agent.',
        },
      ],
      lines: [
        { say: 'Your turn. Two sodium plus chlorine gives two sodium chloride. How many electrons are transferred, and what is the oxidising agent? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. 2Na(s) + Cl₂(g) → 2NaCl(s). How many electrons are transferred, and what is the oxidising agent? Pause the video and try it.' },
        { say: 'Each sodium atom loses one electron, and there are two of them, so two electrons are transferred. Chlorine takes them, so chlorine is reduced, and it is the oxidising agent: choice A.', show: 'q2.answer' },
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
          items: ['Oxidation is a **loss** of electrons, reduction a **gain**', 'The species **reduced** is the **oxidising agent**', 'Electrons **lost** = electrons **gained** in the whole equation'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Oxidation is a loss of electrons, and reduction is a gain.', show: 'sum.0' },
        { say: 'The species that is reduced is the oxidising agent, and the species that is oxidised is the reducing agent.', show: 'sum.1' },
        { say: 'In the whole equation, the electrons lost equal the electrons gained, and that number is the electrons transferred. For more on oxidation and reduction, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
