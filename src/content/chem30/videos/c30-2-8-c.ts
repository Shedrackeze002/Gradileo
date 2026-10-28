import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { electrolytic } from './lib/c30-2b-figures.ts';

// Silver-plating a spoon: the spoon is the cathode, a bar of silver the anode, in silver nitrate solution.
const plating = figure(
  'e',
  [electrolytic({ solution: '\\ce{AgNO3(aq)}', cathode: '\\text{spoon}\\ (-)', anode: '\\text{silver}\\ (+)', electrons: true, ions: { cation: '\\ce{Ag+}', anion: '\\ce{NO3^-}' }, products: { cathode: '\\ce{Ag}', anode: '\\ce{Ag+}' } })],
  500,
);

const video: Explainer = {
  id: 'c30-2-8-c',
  lessonId: 'c30-2-8',
  title: "Electrolytic Cells and Faraday's Law, Part 3: Electroplating and Faraday's Law",
  thumbnailTitle: "Electroplating and Faraday's Law",
  thumbnail: 'e',
  summary:
    "In electroplating, the object is the cathode, the plating metal is the anode, and the electrolyte holds ions of the plating metal, so silver moves from the bar to the spoon while the solution's concentration stays the same. The charge passed is Q = It, with the time in seconds, and Faraday's law gives the amount of electrons, n = It/F, with F = 9.65 × 10⁴ C/mol: 2.50 A for 30.0 min moves 0.0466 mol of electrons.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: "Electroplating and Faraday's Law", subtitle: 'Coating metal, counting electrons' }],
      lines: [
        { say: 'Chromium-plated taps and silver-plated cutlery are coated by electrolysis. To plate the right amount of metal, you need to count the electrons.', show: 'title' },
        { say: 'In this part, you will see how electroplating works, and use Faraday’s law to find the amount of electrons a current carries.' },
      ],
    },
    {
      chapter: 'Electroplating',
      layout: 'split',
      leftWidth: 600,
      left: [plating],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Electroplating', md: 'Coating an object with a thin layer of metal by electrolysis. The **object** is the cathode, the **plating metal** is the anode, and the electrolyte contains ions of the plating metal.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{Cathode: }} \\ce{Ag+ + e- -> Ag}', '\\opp{\\text{Anode: }} \\ce{Ag -> Ag+ + e-}'] },
      ],
      lines: [
        {
          say: 'Electroplating uses electrolysis to coat an object with a thin layer of metal. To silver-plate a spoon, the spoon is the cathode, a bar of silver is the anode, and the electrolyte contains silver ions.',
          show: ['e.beaker', 'e.cathode', 'e.anode', 'e.supply', 'e.electrons', 'e.cat-ion', 'e.an-ion', 'def'],
        },
        { say: 'At the cathode, silver ions are reduced, and a layer of silver builds up on the spoon.', show: ['m.0', 'e.cat-product'], focus: ['m.0', 'e.cat-product'] },
        { say: 'The silver anode is not inert. Silver atoms are the strongest reducing agent present, so they are oxidised, and replace the silver ions plated onto the spoon.', show: ['m.1', 'e.an-product'], focus: ['m.1', 'e.an-product'] },
        { say: 'So the concentration of the solution stays the same, while silver moves from the bar to the spoon.', focus: 'e' },
      ],
    },
    {
      chapter: 'Charge and the Faraday constant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'q', size: 'lg', lines: ['Q = It'] },
        { kind: 'callout', id: 'f', tone: 'definition', title: 'Faraday constant', md: 'The charge of one mole of electrons: $F = 9.65 \\times 10^4\\ \\text{C/mol}$.' },
        { kind: 'callout', id: 'law', tone: 'key', title: 'Faraday’s law', md: 'The amount of electrons that passes through a cell is $n_{e^-} = \\dfrac{It}{F}$, with $I$ in amperes and $t$ in seconds. The half-reaction then gives the amount of product.' },
      ],
      lines: [
        { say: 'The more electrons pass through a cell, the more product forms. A current is a flow of charge: a current of one ampere carries one coulomb of charge each second.' },
        { say: 'So the charge, Q, is the current, I, times the time, t, in seconds.', show: 'q', focus: 'q' },
        { say: 'The Faraday constant, F, is the charge of one mole of electrons: nine point six five times ten to the fourth coulombs per mole.', show: 'f' },
        { say: 'Faraday’s law puts them together. The amount of electrons is I t over F, and the half-reaction then gives the amount of product.', show: 'law' },
      ],
    },
    {
      chapter: 'Moles of electrons',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A current of $2.50\\ \\text{A}$ flows through a cell for $30.0\\ \\text{min}$. What amount of electrons passes through it? Use $F = 9.65 \\times 10^4\\ \\text{C/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['t = 30.0 \\times 60 = 1800\\ \\text{s}', 'Q = It = 2.50 \\times 1800 = 4500\\ \\text{C}', 'n_{e^-} = \\dfrac{Q}{F} = \\dfrac{4500}{9.65 \\times 10^4} = \\good{0.0466\\ \\text{mol}}'],
        },
      ],
      lines: [
        { say: 'A current of two point five zero amperes flows through a cell for thirty point zero minutes. What amount of electrons passes through it?', show: 'q' },
        { say: 'First, change the time to seconds. Thirty point zero times sixty is one thousand eight hundred seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'The charge is two point five zero times one thousand eight hundred: four thousand five hundred coulombs.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by the Faraday constant: zero point zero four six six moles of electrons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A current of $1.50\\ \\text{A}$ flows through an electrolytic cell for $20.0\\ \\text{min}$. Using $F = 9.65 \\times 10^4\\ \\text{C/mol}$, what amount of electrons passes through the cell?',
          choices: ['$0.0187\\ \\text{mol}$', '$3.11 \\times 10^{-4}\\ \\text{mol}$', '$0.0373\\ \\text{mol}$', '$1.80 \\times 10^{3}\\ \\text{mol}$'],
          answer: 0,
          working: '$t = 20.0 \\times 60 = 1200\\ \\text{s}$, $Q = 1.50 \\times 1200 = 1800\\ \\text{C}$, and $n_{e^-} = 1800 \\div (9.65 \\times 10^4) = 0.0187\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A current of one point five zero amperes flows through an electrolytic cell for twenty point zero minutes. What amount of electrons passes through the cell? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, zero point zero one eight seven moles. Twenty minutes is one thousand two hundred seconds, so the charge is one thousand eight hundred coulombs. Choice B leaves the time in minutes.', show: 'q.answer' },
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
            '**Electroplating**: the object is the cathode, the plating metal the anode, in a solution of its ions.',
            '$Q = It$, with $t$ in seconds, and $F = 9.65 \\times 10^4\\ \\text{C/mol}$.',
            '**Faraday’s law**: $n_{e^-} = \\dfrac{It}{F}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In electroplating, the object is the cathode, and the plating metal is the anode, in a solution of its ions.', show: 'sum.0' },
        { say: 'The charge is the current times the time in seconds, and the Faraday constant is the charge of one mole of electrons.', show: 'sum.1' },
        { say: 'Faraday’s law gives the amount of electrons: I t over F. In part four, you will turn electrons into a mass of metal, and work out plating times. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
