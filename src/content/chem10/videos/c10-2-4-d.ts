import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

const METALS = ['Li', 'Be', 'Na', 'Mg', 'Al', 'K', 'Ca', 'Ga', 'Rb', 'Sr', 'In', 'Sn'];
const METALLOIDS = ['B', 'Si', 'Ge', 'As', 'Sb', 'Te'];
const NONMETALS = ['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar', 'Se', 'Br', 'Kr', 'I', 'Xe'];

// The main groups of periods 1 to 5: metals blue, metalloids yellow along the staircase, non-metals pink.
const table = () =>
  figure(
    'pt',
    [
      periodicTable({
        upTo: 54,
        highlights: [
          { id: 'metals', cells: METALS, tone: 'adj' },
          { id: 'metalloids', cells: METALLOIDS, tone: 'theta' },
          { id: 'nonmetals', cells: NONMETALS, tone: 'hyp' },
          { id: 'ga', cells: ['Ga'], tone: 'adj' },
          { id: 'ge', cells: ['Ge'], tone: 'theta' },
          { id: 'se', cells: ['Se'], tone: 'hyp' },
        ],
      }),
    ],
    480,
  );

const video: Explainer = {
  id: 'c10-2-4-d',
  lessonId: 'c10-2-4',
  title: 'The Periodic Table, Part 4: Metalloids and the Staircase',
  thumbnailTitle: 'Metalloids and the Staircase',
  thumbnail: 'pt',
  summary:
    'The metalloids boron, silicon, germanium, arsenic, antimony and tellurium lie on a staircase line between the metals and the non-metals. They look shiny but are brittle and conduct only a little, so silicon and germanium are used as semiconductors. Elements left of the line are metals and those right of it non-metals; elements become less metallic across a period and more metallic down a group.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 4', title: 'Metalloids and the Staircase', subtitle: 'Between metals and non-metals' }],
      lines: [
        { say: 'Most computer chips and solar cells are made from silicon. It looks like a metal, but it shatters like a non-metal.', show: 'title' },
        { say: 'In this part, you will meet the metalloids like silicon, find them in the periodic table, and use the table to classify an element.' },
      ],
    },
    {
      chapter: 'The staircase',
      layout: 'split',
      leftWidth: 640,
      left: [table()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Metalloid', md: 'An element with properties between those of metals and non-metals: shiny like a metal, but **brittle**, and it conducts electricity only a little.' },
        { kind: 'text', id: 'semi', size: 'md', md: 'Silicon and germanium are **semiconductors**, used in computer chips and solar cells.' },
      ],
      lines: [
        { say: 'Between the metals and the non-metals is a staircase-shaped line. The elements along it are the metalloids: boron, silicon, germanium, arsenic, antimony and tellurium.', show: ['pt.table', 'pt.metalloids'], focus: 'pt.metalloids' },
        { say: 'A metalloid has properties between those of metals and non-metals. Metalloids look shiny like metals, but they are brittle like non-metals, and they conduct electricity only a little, better as they get warmer.', show: 'def' },
        { say: 'Because their conductivity can be controlled, metalloids such as silicon and germanium are semiconductors, used to make computer chips and solar cells.', show: 'semi' },
      ],
    },
    {
      chapter: 'Left and right of the line',
      layout: 'split',
      leftWidth: 640,
      left: [table()],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Left of the line: [[adj:metals]]', 'Right of the line: [[hyp:non-metals]]', 'Across a period: **less** metallic', 'Down a group: **more** metallic'],
        },
      ],
      lines: [
        { say: 'Elements to the left of the staircase are metals, and elements to the right of it are non-metals.', show: ['pt.table', 'pt.metalloids', 'pt.metals', 'pt.nonmetals', 'b.0', 'b.1'] },
        { say: 'Moving across a period from left to right, the elements become less metallic.', show: 'b.2', focus: 'b.2' },
        { say: 'Moving down a group, they become more metallic. Group fourteen runs from carbon, a non-metal, through the metalloids silicon and germanium, to tin and lead, which are metals.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Classifying by place',
      layout: 'split',
      leftWidth: 640,
      left: [table()],
      right: [
        { kind: 'bullets', id: 'b', items: ['Germanium, $\\ce{Ge}$: on the line, a **metalloid**', 'Gallium, $\\ce{Ga}$: left of the line, a **metal**', 'Selenium, $\\ce{Se}$: right of the line, a **non-metal**'] },
      ],
      lines: [
        { say: 'Classify gallium, selenium and germanium, all in period four.', show: ['pt.table', 'pt.metalloids'] },
        { say: 'Germanium is one of the metalloids on the staircase line.', show: ['pt.ge', 'b.0'], focus: ['pt.ge', 'b.0'] },
        { say: 'Gallium is to the left of the line, below aluminium: a metal.', show: ['pt.ga', 'b.1'], focus: ['pt.ga', 'b.1'] },
        { say: 'Selenium is to the right of the line, below sulfur: a non-metal.', show: ['pt.se', 'b.2'], focus: ['pt.se', 'b.2'] },
      ],
    },
    {
      chapter: 'Classifying by properties',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A solid element is shiny and grey, conducts electricity only slightly, and shatters when hit with a hammer.' },
        {
          kind: 'table',
          id: 't',
          head: ['Property', 'Points to'],
          rows: [
            ['shiny', 'a metal'],
            ['conducts only slightly', 'a non-metal'],
            ['shatters (brittle)', 'a non-metal'],
          ],
        },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'A mixture of the two', md: 'Metal and non-metal properties together: a **metalloid** (it could be silicon).' },
      ],
      lines: [
        { say: 'Now by properties. A solid element is shiny and grey. It conducts electricity only slightly, and it shatters when hit with a hammer.', show: 'q' },
        { say: 'Shiny suggests a metal, but a metal would conduct well, and would flatten when hit.', show: 't.0', focus: 't.0' },
        { say: 'Brittle and a weak conductor are properties of a non-metal.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'A mixture of metal and non-metal properties means a metalloid. It could be silicon.', show: 'ans' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Three solid elements are tested. Q is shiny and silver-grey, conducts electricity well, and flattens when hit. R is dull and yellow, does not conduct, and shatters into powder. X is shiny and dark grey, conducts a little, and shatters. Which is most likely a metalloid?',
          choices: ['Q', 'R', 'Q and X', 'X'],
          answer: 3,
          working: 'Q is shiny, conducts well and is malleable: a metal. R is dull, does not conduct and is brittle: a non-metal. X is shiny like a metal, but brittle and only a weak conductor: a metalloid.',
        },
      ],
      lines: [
        { say: 'Your turn. Three solid elements, Q, R and X, are tested, and the results are on the screen. Which one is most likely a metalloid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, element X. It is shiny like a metal, but it conducts only a little and it shatters, like a non-metal. Choice C includes Q, which conducts well and flattens: a metal.', show: 'q.answer' },
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
            '**Metalloids**: boron, silicon, germanium, arsenic, antimony and tellurium, on the staircase line.',
            'Shiny but brittle, and weak conductors: **semiconductors** such as silicon.',
            'Left of the line: metals; right: non-metals. Less metallic across a period, more metallic down a group.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The metalloids, boron, silicon, germanium, arsenic, antimony and tellurium, lie on the staircase line.', show: 'sum.0' },
        { say: 'They are shiny but brittle, and conduct only a little, so silicon and germanium are used as semiconductors.', show: 'sum.1' },
        { say: 'Elements to the left of the line are metals, and to the right, non-metals. That completes this lesson. Next, you will meet the families of elements.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
