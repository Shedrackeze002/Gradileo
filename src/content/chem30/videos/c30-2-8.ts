import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { electrolytic } from './lib/c30-2b-figures.ts';

// A general electrolytic cell: two electrodes in an electrolyte, joined to a power supply that
// pushes electrons onto the cathode and pulls them from the anode.
const general = figure('e', [electrolytic({ solution: '\\text{electrolyte}', electrons: true })], 520);

// Molten sodium chloride: sodium ions are reduced at the cathode and chloride ions oxidised at the anode.
const molten = figure(
  'e',
  [electrolytic({ solution: '\\ce{NaCl(l)}', tone: 'opp', electrons: true, ions: { cation: '\\ce{Na+}', anion: '\\ce{Cl-}' }, products: { cathode: '\\ce{Na}', anode: '\\ce{Cl2(g)}' } })],
  520,
);
const cellParts = ['e.beaker', 'e.cathode', 'e.anode', 'e.supply'];

const video: Explainer = {
  id: 'c30-2-8',
  lessonId: 'c30-2-8',
  title: "Electrolytic Cells and Faraday's Law, Part 1: Electrolytic Cells and Molten Salts",
  thumbnailTitle: 'Electrolytic Cells and Molten Salts',
  thumbnail: 'e',
  summary:
    'Electrolysis uses electrical energy to drive a non-spontaneous redox reaction in an electrolytic cell. Oxidation still happens at the anode, now positive, and reduction at the cathode, now negative. A molten salt gives the metal at the cathode and the non-metal at the anode: molten sodium chloride gives sodium and chlorine, with a cell potential of −4.07 V, so at least 4.07 V must be applied.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'Electrolytic Cells and Molten Salts', subtitle: 'Forcing a reaction to run' }],
      lines: [
        { say: 'Aluminium is the most common metal in the Earth’s crust, yet in the middle of the eighteen hundreds it was rarer and more precious than gold, because no affordable reducing agent could pull it out of its ore.', show: 'title' },
        { say: 'Since eighteen eighty-six, it has been made by electrolysis: an electric current forces aluminium ions to take electrons they would never take on their own.' },
        { say: 'In this lesson, you will predict the products of electrolysis and the voltage it needs, and use Faraday’s law. This part starts with molten salts. Later parts handle solutions, electroplating, and how much product a current makes.' },
      ],
    },
    {
      chapter: 'Electrolytic cells',
      layout: 'split',
      leftWidth: 600,
      left: [general],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Electrolysis and electrolytic cell',
          md: '**Electrolysis** uses electrical energy to drive a non-spontaneous redox reaction. An **electrolytic cell** is two electrodes in an electrolyte, connected to a power supply.',
        },
        { kind: 'bullets', id: 'b', items: ['Oxidation at the [[opp:anode]], now **positive**.', 'Reduction at the [[adj:cathode]], now **negative**.'] },
      ],
      lines: [
        {
          say: 'Electrolysis is the use of electrical energy to drive a non-spontaneous redox reaction. An electrolytic cell is where it happens: two electrodes in an electrolyte, connected to a power supply.',
          show: [...cellParts, 'def'],
        },
        { say: 'The names of the electrodes keep their meaning: oxidation happens at the anode, and reduction at the cathode.', focus: ['e.anode', 'e.cathode'] },
        { say: 'What changes is the push. The power supply pumps electrons onto the cathode, making it negative, and pulls them from the anode, making it positive.', show: ['e.electrons', 'b'], focus: 'e.electrons' },
      ],
    },
    {
      chapter: 'Voltaic and electrolytic',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Voltaic cell', 'Electrolytic cell'],
          rows: [
            ['Reaction', 'spontaneous', 'non-spontaneous'],
            ['$E^\\circ_\\text{cell}$', 'positive', 'negative'],
            ['Energy', 'chemical to electrical', 'electrical to chemical'],
            ['Anode', 'oxidation, negative', 'oxidation, positive'],
            ['Cathode', 'reduction, positive', 'reduction, negative'],
          ],
        },
      ],
      lines: [
        { say: 'Compare the two kinds of cell. A voltaic cell runs a spontaneous reaction, with a positive cell potential. An electrolytic cell runs a non-spontaneous one, with a negative cell potential.', show: ['t.0', 't.1'] },
        { say: 'A voltaic cell turns chemical energy into electrical energy. An electrolytic cell turns electrical energy into chemical energy.', show: 't.2', focus: 't.2' },
        { say: 'In both, oxidation happens at the anode, and reduction at the cathode. Only the signs of the electrodes swap.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Molten sodium chloride',
      layout: 'split',
      leftWidth: 600,
      left: [molten],
      right: [
        { kind: 'text', id: 'given', size: 'md', md: 'Use $\\ce{Na+ + e- -> Na}$, $E^\\circ = -2.71\\ \\text{V}$, and $\\ce{Cl2 + 2e- -> 2Cl-}$, $E^\\circ = +1.36\\ \\text{V}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\adj{\\text{Cathode: }} \\ce{Na+ + e- -> Na}', '\\opp{\\text{Anode: }} \\ce{2Cl- -> Cl2 + 2e-}', 'E^\\circ_\\text{cell} = {-2.71} - (+1.36)', '= \\bad{-4.07\\ \\text{V}}'],
        },
      ],
      lines: [
        {
          say: 'In a molten ionic compound, the only species are the metal ions and the non-metal ions. Molten sodium chloride holds sodium ions and chloride ions, and no water.',
          show: [...cellParts, 'e.electrons', 'e.cat-ion', 'e.an-ion', 'given'],
          focus: ['e.cat-ion', 'e.an-ion'],
        },
        { say: 'The cathode reduces the metal ions. Each sodium ion takes an electron, and sodium metal forms.', show: ['m.0', 'e.cat-product'], focus: ['m.0', 'e.cat-product'] },
        { say: 'The anode oxidises the anions. Chloride ions give up electrons, and chlorine gas forms.', show: ['m.1', 'e.an-product'], focus: ['m.1', 'e.an-product'] },
        { say: 'The cell potential is the cathode, negative two point seven one, minus the anode, plus one point three six. That is negative four point zero seven volts.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Minimum voltage',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Minimum voltage', md: 'The **minimum voltage** of an electrolytic cell is the size of its negative cell potential: the power supply must push at least that hard to make the reaction run.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['E^\\circ_\\text{cell} = -4.07\\ \\text{V} \\quad \\Longrightarrow \\quad \\text{apply at least } \\good{4.07\\ \\text{V}}'] },
      ],
      lines: [
        { say: 'The negative potential says the reaction is not spontaneous. It also says how hard the power supply must push.' },
        { say: 'The minimum voltage of an electrolytic cell is the size of its negative cell potential.', show: 'def' },
        { say: 'For molten sodium chloride, at least four point zero seven volts must be applied.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Molten potassium bromide, $\\ce{KBr(l)}$, is electrolysed with inert electrodes. Use $\\ce{K+ + e- -> K}$, $E^\\circ = -2.93\\ \\text{V}$, and $\\ce{Br2 + 2e- -> 2Br-}$, $E^\\circ = +1.07\\ \\text{V}$. What forms at the cathode and at the anode, and what is the minimum voltage?',
          choices: ['Bromine and potassium; $4.00\\ \\text{V}$', 'Potassium and bromine; $4.00\\ \\text{V}$', 'Potassium and bromine; $1.86\\ \\text{V}$', 'Hydrogen and bromine; $1.90\\ \\text{V}$'],
          answer: 1,
          working: 'Cathode: $\\ce{K+ + e- -> K}$. Anode: $\\ce{2Br- -> Br2 + 2e-}$. $E^\\circ_\\text{cell} = -2.93 - (+1.07) = -4.00\\ \\text{V}$, so at least $4.00\\ \\text{V}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Molten potassium bromide is electrolysed with inert electrodes, with the potentials shown. What forms at the cathode and at the anode, and what is the minimum voltage? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B. Potassium ions are reduced at the cathode, and bromide ions are oxidised at the anode. Negative two point nine three, minus plus one point zero seven, is negative four point zero zero volts, so at least four point zero zero volts. Choice D brings in water, but a molten salt has none.',
          caption: 'The answer is B. Potassium ions are reduced at the cathode, and bromide ions are oxidised at the anode. −2.93 − (+1.07) is −4.00 volts, so at least 4.00 volts. Choice D brings in water, but a molten salt has none.',
          show: 'q.answer',
        },
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
            'An **electrolytic cell** uses electrical energy to drive a non-spontaneous reaction.',
            'Oxidation at the anode (now **positive**); reduction at the cathode (now **negative**).',
            'A molten salt gives the metal at the cathode and the non-metal at the anode.',
            '**Minimum voltage**: the size of the negative $E^\\circ_\\text{cell}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An electrolytic cell uses electrical energy to drive a non-spontaneous reaction.', show: 'sum.0' },
        { say: 'Oxidation still happens at the anode, now positive, and reduction at the cathode, now negative.', show: 'sum.1' },
        { say: 'A molten salt gives the metal at the cathode, and the non-metal at the anode.', show: 'sum.2' },
        { say: 'And the minimum voltage is the size of the negative cell potential. In part two, you will electrolyse solutions, where water joins in. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
