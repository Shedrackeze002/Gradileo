import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

// Metals in blue and non-metals in pink; the metalloids between them are left grey.
const table = figure(
  'pt',
  [
    periodicTable({
      upTo: 36,
      highlights: [
        { id: 'metals', cells: ['Li', 'Be', 'Na', 'Mg', 'Al', 'K', 'Ca', 'Ga'], tone: 'adj' },
        { id: 'nonmetals', cells: ['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar', 'Se', 'Br', 'Kr'], tone: 'hyp' },
      ],
    }),
  ],
  440,
);

const video: Explainer = {
  id: 'c10-2-4-c',
  lessonId: 'c10-2-4',
  title: 'The Periodic Table, Part 3: Metals and Non-metals',
  thumbnailTitle: 'Metals and Non-metals',
  thumbnail: 'pt',
  summary:
    'Metals fill the left and middle of the periodic table; non-metals are on the right, with hydrogen. Metals are shiny, conduct electricity and heat, and are malleable and ductile; non-metals are usually dull, poor conductors and brittle. The state alone does not decide: mercury is a liquid metal and bromine a liquid non-metal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 3', title: 'Metals and Non-metals', subtitle: 'Telling them apart' }],
      lines: [
        { say: 'A copper wire carries electricity, and bends without breaking. A lump of sulfur crumbles to a yellow powder, and does not conduct at all.', show: 'title' },
        { say: 'Copper is a metal and sulfur is a non-metal. In this part, you will learn to tell them apart, by their place in the table and by their properties.' },
      ],
    },
    {
      chapter: 'Where they are',
      layout: 'split',
      leftWidth: 640,
      left: [table],
      right: [
        { kind: 'bullets', id: 'b', items: ['[[adj:Metals]]: the left-hand side and the middle', '[[hyp:Non-metals]]: the right-hand side, and hydrogen', 'Grey: the metalloids, between them'] },
      ],
      lines: [
        { say: 'More than three quarters of the elements are metals. They fill the left-hand side and the middle of the periodic table, including all the transition metals.', show: ['pt.table', 'pt.metals', 'b.0'], focus: 'b.0' },
        { say: 'The non-metals are on the right-hand side, with hydrogen as the one non-metal at the top left.', show: ['pt.nonmetals', 'b.1'], focus: 'b.1' },
        { say: 'The grey squares between them are the metalloids. You will meet them in part four.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Properties',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Property', 'Metals', 'Non-metals'],
          rows: [
            ['Appearance', 'shiny, especially when freshly cut or polished', 'usually dull'],
            ['Electricity and heat', 'good conductors', 'poor conductors or insulators'],
            ['When hit or bent (solids)', '**malleable** and **ductile**', '**brittle**: they break or crumble'],
            ['State at room temperature', 'solids, except mercury, a liquid', 'many are gases; bromine is a liquid; the rest are solids'],
            ['Melting point', 'usually high', 'usually low'],
          ],
        },
      ],
      lines: [
        { say: 'Metals are shiny, especially when freshly cut or polished. Non-metals are usually dull.', show: 't.0', focus: 't.0' },
        { say: 'Metals are good conductors of electricity and heat. Non-metals are poor conductors, or insulators.', show: 't.1', focus: 't.1' },
        { say: 'Solid metals are malleable: they can be hammered into shape. And they are ductile: they can be drawn into wires. Solid non-metals are brittle, so they break or crumble.', show: 't.2', focus: 't.2' },
        { say: 'Metals are solids at room temperature, except mercury, which is a liquid. Many non-metals are gases, bromine is a liquid, and the rest are solids.', show: 't.3', focus: 't.3' },
        { say: 'And metals usually have high melting points, while non-metals usually have low ones.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'State is not enough',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'State is not enough', md: 'Look at several properties together, or at the element’s place in the table.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Mercury: a liquid, but shiny and a good conductor, so a **metal**.', 'Bromine: a liquid, dull red-brown, does not conduct, so a **non-metal**.', 'Carbon, as graphite, conducts electricity, yet carbon is a **non-metal**.'],
        },
      ],
      lines: [
        { say: 'Do not decide from the state alone. Mercury is a liquid at room temperature, but it is shiny and conducts electricity well, so it is a metal.', show: ['oops', 'b.0'], focus: 'b.0' },
        { say: 'Bromine is also a liquid, but it is a dull red-brown and does not conduct, so it is a non-metal.', show: 'b.1', focus: 'b.1' },
        { say: 'And there are exceptions: carbon, as graphite, conducts electricity, yet carbon is a non-metal. Look at several properties together, or at the element’s place in the table.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An element is a liquid at room temperature. It is dark red-brown, gives off an orange vapour, and does not conduct electricity. Is it a metal, a non-metal or a metalloid?',
          choices: ['A metal', 'A metalloid', 'A non-metal', 'There is not enough information'],
          answer: 2,
          working: 'Being a liquid does not decide it. It is not shiny and does not conduct: those are the properties of a non-metal. (It is bromine.)',
        },
      ],
      lines: [
        { say: 'Your turn. An element is a liquid at room temperature. It is dark red-brown, gives off an orange vapour, and does not conduct electricity. Is it a metal, a non-metal or a metalloid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, a non-metal. Being a liquid does not decide it: it is dull and does not conduct, which are the properties of a non-metal. It is bromine. Choice A judges by the state alone.', show: 'q.answer' },
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
          items: [
            '**Metals** (left and middle): shiny, good conductors, malleable and ductile.',
            '**Non-metals** (right, and hydrogen): usually dull, poor conductors, brittle.',
            'Judge by several properties, not the state alone: mercury is a liquid metal.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Metals, on the left and in the middle of the table, are shiny, conduct electricity and heat, and are malleable and ductile.', show: 'sum.0' },
        { say: 'Non-metals, on the right, and hydrogen, are usually dull, poor conductors, and brittle.', show: 'sum.1' },
        { say: 'Look at several properties together, not the state alone. In part four, you will meet the metalloids, on the staircase between them. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
