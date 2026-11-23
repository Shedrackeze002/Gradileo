import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import words from '@/content/chem8/videos/c8-3-3.ts';

// Exam question for Chemistry 8 lesson 3.3 (word equations): iron burning to iron oxide, naming
// sodium chloride and zinc sulfide, and fixing a methane equation written backwards. Written by
// Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's methane molecule burning in oxygen, atom by atom
// (src/video/molecules.ts).

const QUESTION = 'Answer these questions about word equations. (a) Iron wool is heated in air. It glows and turns into a black powder called iron oxide. Write a word equation for this reaction. (b) Name the compound made when sodium reacts with chlorine, and the compound made when zinc reacts with sulfur. (c) Methane burns in a gas cooker to make carbon dioxide and water. A student writes: carbon dioxide + water → methane + oxygen. What mistake has the student made? Write the equation correctly.';

const video: Explainer = {
  id: 'xq-c8-3-3',
  lessonId: '',
  exam: {
    lesson: 'c8-3-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Iron Oxide, Sodium Chloride and a Backwards Equation. Word Equations',
  thumbnailTitle: 'Writing Word Equations',
  thumbnail: 'mb',
  summary:
    'A test-style question, solved one small step at a time: write the word equation for iron burning, name the compounds sodium and chlorine or zinc and sulfur make, and fix a methane equation written backwards. Iron plus oxygen makes iron oxide, the compounds are sodium chloride and zinc sulfide, and the student put the products on the left, so the correct equation is methane plus oxygen makes carbon dioxide plus water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Writing Word Equations', subtitle: 'Reactants, arrow, products' }],
      lines: [
        { say: 'In this video, we solve a test-style question about word equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Iron + oxygen → iron oxide; sodium chloride, zinc sulfide; it was backwards' }],
      lines: [
        { say: 'Here is the question. Part a: iron wool is heated in air. It glows and turns into a black powder called iron oxide. Write a word equation for this reaction. Part b: name the compound made when sodium reacts with chlorine, and the compound made when zinc reacts with sulfur. Part c: methane burns in a gas cooker to make carbon dioxide and water. A student writes: carbon dioxide plus water makes methane plus oxygen. What mistake has the student made? Write the equation correctly.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Write each reaction as **reactants → products**, and name the compounds' }],
      lines: [
        { say: 'Every part asks us to write a reaction in one line, with what goes in on the left and what comes out on the right, and to name the compounds properly.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(words, 'mb')],
      lines: [
        { say: 'Here is what we need. This is methane, the gas in a cooker, meeting oxygen from the air.', show: 'mb' },
        { say: 'Watch. The bonds break, and the same atoms join up in new ways. The carbon ends up in carbon dioxide, and the hydrogen ends up in water. Methane and oxygen go in, and carbon dioxide and water come out.', play: 'mb.burn' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Reactants** on the left, **products** on the right', 'Burning in air: **oxygen** is a reactant', 'Metal + non-metal: metal first, non-metal ends in **-ide**'] }],
      lines: [
        { say: 'Here is the plan. Reactants go on the left of the arrow, and products on the right.', show: 'plan.0' },
        { say: 'When something burns in air, oxygen is a reactant.', show: 'plan.1' },
        { say: 'And a metal and a non-metal make a compound named with the metal first, then the non-metal ending in i d e.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Iron burning',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{reactants: iron, oxygen from the air}', '\\good{\\text{iron} + \\text{oxygen} \\rightarrow \\text{iron oxide}}'] }],
      lines: [
        { say: 'Step one. The iron is heated in air, so it reacts with oxygen. Iron and oxygen are the reactants.', show: 'm.0' },
        { say: 'The product is the black powder, iron oxide. So the equation is iron plus oxygen makes iron oxide. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Naming compounds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal', 'Non-metal', 'Compound'],
          rows: [
            ['sodium', 'chlorine → chlor**ide**', '**sodium chloride**'],
            ['zinc', 'sulfur → sulf**ide**', '**zinc sulfide**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The metal keeps its name and goes first. Chlorine changes to chloride, so sodium and chlorine make sodium chloride, which is table salt.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Sulfur changes to sulfide, so zinc and sulfur make zinc sulfide. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: The backwards equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'w', size: 'md', lines: ['\\bad{\\text{carbon dioxide} + \\text{water} \\rightarrow \\text{methane} + \\text{oxygen}}', '\\good{\\text{methane} + \\text{oxygen} \\rightarrow \\text{carbon dioxide} + \\text{water}}'] }],
      lines: [
        { say: 'Step three. The student has the right four substances, but carbon dioxide and water are the products, and the student put them on the left. The equation runs backwards.', show: 'w.0', focus: 'w.0' },
        { say: 'Methane and oxygen from the air are what we start with, so they go on the left: methane plus oxygen makes carbon dioxide plus water. That is part c.', show: 'w.1', focus: 'w.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Iron + oxygen → **iron oxide**. (b) **Sodium chloride** and **zinc sulfide**. (c) The products were on the left. Methane + oxygen → **carbon dioxide + water**.' },
      ],
      lines: [
        { say: 'Does it make sense? Each equation starts with what we put in and ends with what was made, and each name tells us the two elements inside.', show: 'ans' },
        { say: 'So iron and oxygen make iron oxide, the compounds are sodium chloride and zinc sulfide, and the methane equation needed turning round.' },
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
            ['Iron → iron oxide', 'Forgot the **oxygen** from the air'],
            ['Sodium **chlorine**', 'Did not change the ending to **-ide**'],
            ['Sulfide zinc', 'Put the **non-metal** first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The oxygen in iron oxide has to come from somewhere. Nobody added it, but it is in the air, so it is a reactant.', focus: 'traps.0' },
        { say: 'In a compound\'s name, chlorine becomes chloride. Sodium chlorine is not the name of anything.', focus: 'traps.1' },
        { say: 'And the metal always comes first in the name, so it is zinc sulfide.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Copper is heated strongly in air and turns black. Which pair completes the word equation: copper + ___ → ___?',
          choices: ['air, copper', 'chlorine, copper chloride', 'oxygen, copper oxide', 'water, copper oxide'],
          answer: 2,
          working: 'Copper reacts with oxygen from the air, so both are reactants, and the black product is copper oxide.',
        },
      ],
      lines: [
        { say: 'Your turn. Copper is heated strongly in air and turns black. Which pair completes the word equation, copper plus something makes something? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Copper reacts with oxygen from the air, and the black product is copper oxide. So the pair is oxygen and copper oxide: choice C.', show: 'q2.answer' },
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
          items: ['**Reactants → products**, never the other way', 'Burning in air: **oxygen** is a reactant', 'Metal first, then non-metal ending in **-ide**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A word equation runs from reactants to products, never the other way.', show: 'sum.0' },
        { say: 'When something burns in air, oxygen is a reactant.', show: 'sum.1' },
        { say: 'And a metal and a non-metal make a compound named metal first, then the non-metal ending in i d e. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
