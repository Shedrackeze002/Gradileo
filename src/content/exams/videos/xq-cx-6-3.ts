import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import cells from '@/content/chemmore/videos/cx-6-3.ts';

// Exam question for More Chemistry Topics lesson 6.3 (hydrogen fuel cells and batteries): the
// voltage of four cells in series, why a non-rechargeable cell stops, and the overall reaction and
// product of a hydrogen fuel cell. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's hydrogen fuel cell (src/video/molecules.ts).

const QUESTION = 'This question is about cells and fuel cells. (a) A battery is made of four 1.5 V cells connected in series. What is the voltage of the battery? (b) Why does a non-rechargeable cell eventually stop working? (c) A hydrogen fuel cell uses hydrogen and oxygen. Write a balanced equation for the overall reaction, and name the only product.';

const video: Explainer = {
  id: 'xq-cx-6-3',
  lessonId: '',
  exam: {
    lesson: 'cx-6-3',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Four Cells in Series and a Hydrogen Fuel Cell. Fuel Cells and Batteries',
  thumbnailTitle: 'Power from Hydrogen',
  thumbnail: 'fc',
  summary:
    'A test-style question, solved one small step at a time: what is the voltage of four 1.5 V cells in series, why does a non-rechargeable cell stop, and what does a hydrogen fuel cell make? The battery gives 6.0 V, a cell stops when one of its reactants is used up, and the fuel cell reaction is 2H₂ + O₂ → 2H₂O, with water the only product.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Power from Hydrogen', subtitle: 'Cells and fuel cells' }],
      lines: [
        { say: 'In this video, we solve a test-style question about cells and fuel cells. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '6.0 V; a reactant is used up; 2H₂ + O₂ → 2H₂O, water' }],
      lines: [
        { say: 'Here is the question. This question is about cells and fuel cells. Part a: a battery is made of four 1.5 volt cells connected in series. What is the voltage of the battery? Part b: why does a non-rechargeable cell eventually stop working? Part c: a hydrogen fuel cell uses hydrogen and oxygen. Write a balanced equation for the overall reaction, and name the only product.', caption: 'Here is the question. This question is about cells and fuel cells. Part a: a battery is made of four 1.5 V cells connected in series. What is the voltage of the battery? Part b: why does a non-rechargeable cell eventually stop working? Part c: a hydrogen fuel cell uses hydrogen and oxygen. Write a balanced equation for the overall reaction, and name the only product.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'A cell turns a **reaction** into **electricity**: add the cells, then follow the reactants' }],
      lines: [
        { say: 'Every cell makes electricity from a chemical reaction. We add up cells in a battery, then think about what happens to the reactants.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(cells, 'fc')],
      lines: [
        { say: 'Here is what we need. This is a hydrogen fuel cell up close, with hydrogen fed in on the left, at the negative electrode, and oxygen on the right, at the positive electrode.', show: 'fc' },
        { say: 'Each hydrogen molecule splits into two hydrogen ions. Their electrons leave through the wire, which is the current. The hydrogen ions cross the electrolyte to the oxygen side.', play: 'fc.cross' },
        { say: 'There, the oxygen molecule takes the electrons back from the wire and joins the hydrogen ions. Two water molecules form, the only product.', play: 'fc.water' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Cells in series: voltages **add**', 'A cell stops when a **reactant runs out**', 'Fuel cell: hydrogen + oxygen → **water**'] }],
      lines: [
        { say: 'Here is the plan. When cells are joined in series, their voltages add.', show: 'plan.0' },
        { say: 'A cell stops when one of its reactants runs out.', show: 'plan.1' },
        { say: 'And a hydrogen fuel cell combines hydrogen and oxygen to make water.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The battery',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4 \\times 1.5\\ \\text{V} = \\good{6.0\\ \\text{V}}'] }],
      lines: [
        { say: 'Step one. In series, the voltages of the cells add up. Four cells of 1.5 volts give 4 times 1.5, which is 6.0 volts. That is part a.', caption: 'Step one. In series, the voltages of the cells add up. 4 × 1.5 V = 6.0 V. That is part a.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Why a cell stops',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['The voltage comes from a **chemical reaction**', 'Eventually **one reactant is used up**', 'The reaction stops, so the current stops'] }],
      lines: [
        { say: 'Step two. The cell\'s voltage comes from a chemical reaction inside it.', show: 's.0' },
        { say: 'As it is used, the reactants are used up, and eventually one of them runs out.', show: 's.1' },
        { say: 'Then the reaction stops, and so does the current. A non-rechargeable cell cannot be reversed, so it is finished. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The fuel cell',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'md', lines: ['\\ce{H2 + O2 -> H2O}', '\\good{\\ce{2H2 + O2 -> 2H2O}}'] }],
      lines: [
        { say: 'Step three. Hydrogen and oxygen make water.', show: 'f.0' },
        { say: 'An oxygen molecule has two oxygen atoms, so it makes two water molecules, which need two hydrogen molecules. So two H two plus O two gives two H two O, and water is the only product. That is part c.', caption: 'An oxygen molecule has two oxygen atoms, so it makes two water molecules, which need two hydrogen molecules: 2H₂ + O₂ → 2H₂O, and water is the only product. That is part c.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **6.0 V**. (b) A **reactant is used up**, so the reaction stops. (c) **2H₂ + O₂ → 2H₂O**; the only product is **water**.' },
      ],
      lines: [
        { say: 'Does it make sense? In the fuel cell we watched, two hydrogen molecules and one oxygen molecule made two water molecules, which matches the equation.', show: 'ans' },
        { say: 'So the battery gives 6.0 volts, a cell stops when a reactant runs out, and a fuel cell makes only water.', caption: 'So the battery gives 6.0 V, a cell stops when a reactant runs out, and a fuel cell makes only water.' },
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
            ['**1.5 V**', 'In series, voltages **add**'],
            ['It runs out of **electricity**', 'It runs out of a **reactant**'],
            ['H₂ + O₂ → H₂O', 'Not **balanced**: count the O'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Cells in series add their voltages, so four cells give four times as much.', focus: 'traps.0' },
        { say: 'A cell does not store electricity. It makes it from a reaction, until a reactant runs out.', focus: 'traps.1' },
        { say: 'And H two plus O two gives H two O has two oxygens on the left and one on the right, so it needs balancing.', caption: 'And H₂ + O₂ → H₂O has two oxygens on the left and one on the right, so it needs balancing.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a hydrogen fuel cell, at which electrode is hydrogen oxidised?',
          choices: ['the positive electrode', 'both electrodes', 'the negative electrode', 'neither electrode'],
          answer: 2,
          working: 'Hydrogen loses electrons at the negative electrode; oxygen gains them at the positive electrode.',
        },
      ],
      lines: [
        { say: 'Your turn. In a hydrogen fuel cell, at which electrode is hydrogen oxidised? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Hydrogen loses its electrons at the negative electrode, where it is fed in: choice C. Oxygen is reduced at the positive electrode.', show: 'q2.answer' },
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
          items: ['Cells in series: voltages **add**', 'A cell stops when a **reactant** is used up', 'Fuel cell: 2H₂ + O₂ → 2H₂O, only **water**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Cells in series add their voltages.', show: 'sum.0' },
        { say: 'A non-rechargeable cell stops when a reactant is used up.', show: 'sum.1' },
        { say: 'And a hydrogen fuel cell makes only water. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
