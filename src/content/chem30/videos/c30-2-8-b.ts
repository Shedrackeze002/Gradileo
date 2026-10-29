import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { electrolytic } from './lib/c30-2b-figures.ts';

// Aqueous potassium iodide: water is reduced to hydrogen at the cathode, and iodide ions are
// oxidised to iodine at the anode.
const iodide = figure(
  'e',
  [electrolytic({ solution: '\\ce{KI(aq)}', electrons: true, ions: { cation: '\\ce{K+}', anion: '\\ce{I-}' }, products: { cathode: '\\ce{H2(g)}', anode: '\\ce{I2}' } })],
  480,
);

// Aqueous copper(II) sulfate: copper plates onto the cathode, and water is oxidised to oxygen at the anode.
const sulfate = figure(
  'e',
  [electrolytic({ solution: '\\ce{CuSO4(aq)}', tone: 'adj', electrons: true, ions: { cation: '\\ce{Cu^2+}', anion: '\\ce{SO4^2-}' }, products: { cathode: '\\ce{Cu}', anode: '\\ce{O2(g)}' } })],
  480,
);
const cellParts = ['e.beaker', 'e.cathode', 'e.anode', 'e.supply', 'e.electrons', 'e.cat-ion', 'e.an-ion'];

const video: Explainer = {
  id: 'c30-2-8-b',
  lessonId: 'c30-2-8',
  title: "Electrolytic Cells and Faraday's Law, Part 2: Electrolysing Solutions",
  thumbnailTitle: 'Electrolysing Solutions',
  thumbnail: 'e',
  summary:
    'In an aqueous solution, water competes with the ions: it can be reduced to hydrogen at the cathode (−0.83 V) or oxidised to oxygen at the anode (+1.23 V). The strongest oxidising agent present is reduced and the strongest reducing agent oxidised, so potassium iodide solution gives hydrogen and iodine (at least 1.37 V), and copper(II) sulfate solution gives copper and oxygen (at least 0.89 V). Sulfate and nitrate ions are not oxidised.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'Electrolysing Solutions', subtitle: 'When water joins in' }],
      lines: [
        { say: 'Dissolve a salt in water, and electrolysis can give quite different products, because water itself can react at both electrodes.', show: 'title' },
        { say: 'In this part, you will predict the products of electrolysing a solution, and the minimum voltage it needs.' },
      ],
    },
    {
      chapter: 'Water competes',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{2H2O(l) + 2e- -> H2(g) + 2OH^-(aq)} \\qquad E^\\circ = -0.83\\ \\text{V}', '\\ce{O2(g) + 4H+(aq) + 4e- -> 2H2O(l)} \\qquad E^\\circ = +1.23\\ \\text{V}'],
        },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '[[adj:Cathode]]: the **strongest oxidising agent** present (highest on the left of the table) is reduced: the metal ion or water.',
            '[[opp:Anode]]: the **strongest reducing agent** present (lowest on the right) is oxidised: the anion or water.',
            'Sulfate and nitrate ions are not oxidised.',
          ],
        },
      ],
      lines: [
        { say: 'In a solution, water competes with the ions. Water can be reduced at the cathode, to hydrogen gas and hydroxide ions, at negative zero point eight three volts.', show: 'm.0', focus: 'm.0' },
        { say: 'And it can be oxidised at the anode, in the reverse of this half-reaction, at plus one point two three volts, giving oxygen gas.', show: 'm.1', focus: 'm.1' },
        { say: 'At the cathode, the strongest oxidising agent present, the one highest on the left of the table, is reduced: the metal ion or water.', show: 'b.0', focus: 'b.0' },
        { say: 'At the anode, the strongest reducing agent present, the one lowest on the right, is oxidised: the anion or water. Sulfate and nitrate ions are not oxidised.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Potassium iodide solution',
      layout: 'split',
      leftWidth: 540,
      left: [iodide],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Half-reaction', '$E^\\circ$ (V)'],
          rows: [
            ['$\\ce{O2 + 4H+ + 4e- -> 2H2O}$', '$+1.23$'],
            ['$\\ce{I2 + 2e- -> 2I-}$', '$+0.54$'],
            ['$\\ce{2H2O + 2e- -> H2 + 2OH-}$', '$-0.83$'],
            ['$\\ce{K+ + e- -> K}$', '$-2.93$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['E^\\circ_\\text{cell} = {-0.83} - (+0.54)', '= \\bad{-1.37\\ \\text{V}}'] },
      ],
      lines: [
        { say: 'Aqueous potassium iodide is electrolysed with inert electrodes. The table lists every species that could react.', show: [...cellParts, 't'] },
        {
          say: 'At the cathode, water, at negative zero point eight three volts, is a stronger oxidising agent than potassium ions, at negative two point nine three. So water is reduced: hydrogen gas forms, and the solution around the cathode becomes basic.',
          show: 'e.cat-product',
          focus: ['t.2', 't.3', 'e.cat-product'],
        },
        {
          say: 'At the anode, iodide ions, at plus zero point five four, are a stronger reducing agent than water, at plus one point two three. So iodide ions are oxidised, and the solution around the anode turns brown with iodine.',
          show: 'e.an-product',
          focus: ['t.0', 't.1', 'e.an-product'],
        },
        { say: 'The cell potential is negative zero point eight three, minus plus zero point five four: negative one point three seven volts. At least one point three seven volts is needed.', show: 'm', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Copper(II) sulfate solution',
      layout: 'split',
      leftWidth: 540,
      left: [sulfate],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Half-reaction', '$E^\\circ$ (V)'],
          rows: [
            ['$\\ce{O2 + 4H+ + 4e- -> 2H2O}$', '$+1.23$'],
            ['$\\ce{Cu^2+ + 2e- -> Cu}$', '$+0.34$'],
            ['$\\ce{2H2O + 2e- -> H2 + 2OH-}$', '$-0.83$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{\\ce{2H2O -> O2 + 4H+ + 4e-}}', 'E^\\circ_\\text{cell} = +0.34 - (+1.23)', '= \\bad{-0.89\\ \\text{V}}'] },
      ],
      lines: [
        { say: 'Now aqueous copper two sulfate, again with inert electrodes.', caption: 'Now aqueous copper(II) sulfate, again with inert electrodes.', show: [...cellParts, 't'] },
        {
          say: 'At the cathode, copper two ions, at plus zero point three four volts, are a stronger oxidising agent than water, at negative zero point eight three. So copper plates onto the cathode.',
          caption: 'At the cathode, copper(II) ions, at +0.34 volts, are a stronger oxidising agent than water, at −0.83. So copper plates onto the cathode.',
          show: 'e.cat-product',
          focus: ['t.1', 't.2', 'e.cat-product'],
        },
        { say: 'At the anode, sulfate ions are not oxidised, so water is. Oxygen gas bubbles off.', show: ['e.an-product', 'm.0'], focus: ['t.0', 'm.0', 'e.an-product'] },
        { say: 'The cell potential is plus zero point three four, minus plus one point two three: negative zero point eight nine volts. At least zero point eight nine volts is needed.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Chloride solutions',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'note',
          tone: 'tip',
          title: 'Chloride solutions',
          md: 'By the table, water, at $+1.23\\ \\text{V}$, should be oxidised before chloride ions, at $+1.36\\ \\text{V}$. In practice, concentrated chloride solutions release **chlorine** instead, because oxygen needs a noticeably higher voltage than its $E^\\circ$ suggests at most electrodes. This is how chlorine is made from brine. The questions here follow the table.',
        },
      ],
      lines: [
        { say: 'One surprise. By the table, water, at plus one point two three volts, should be oxidised before chloride ions, at plus one point three six.', show: 'note' },
        { say: 'In practice, concentrated chloride solutions release chlorine instead, because oxygen needs a noticeably higher voltage than its standard potential suggests, at most electrodes. That is how chlorine is made from brine. The questions here follow the table.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Aqueous nickel(II) iodide is electrolysed with inert electrodes. Use $\\ce{Ni^2+ + 2e- -> Ni}$, $-0.26\\ \\text{V}$; $\\ce{I2 + 2e- -> 2I-}$, $+0.54\\ \\text{V}$; and water, $-0.83\\ \\text{V}$ and $+1.23\\ \\text{V}$. What forms at the cathode and at the anode, and what is the minimum voltage?',
          choices: ['Hydrogen and iodine; $1.37\\ \\text{V}$', 'Nickel and oxygen; $1.49\\ \\text{V}$', 'Hydrogen and oxygen; $2.06\\ \\text{V}$', 'Nickel and iodine; $0.80\\ \\text{V}$'],
          answer: 3,
          working: 'Cathode: $\\ce{Ni^2+}$ ($-0.26$ V) beats water ($-0.83$ V). Anode: $\\ce{I-}$ ($+0.54$ V) beats water ($+1.23$ V). $E^\\circ_\\text{cell} = -0.26 - (+0.54) = -0.80\\ \\text{V}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Aqueous nickel two iodide is electrolysed with inert electrodes, with the potentials shown. What forms at the cathode and at the anode, and what is the minimum voltage? Pause the video and try it.',
          caption: 'Your turn. Aqueous nickel(II) iodide is electrolysed with inert electrodes, with the potentials shown. What forms at the cathode and at the anode, and what is the minimum voltage? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, nickel and iodine, with at least zero point eight zero volts. Nickel two ions beat water at the cathode, and iodide ions beat water at the anode. Choice A has water reduced, but nickel two ions are the stronger oxidising agent.',
          caption: 'The answer is D, nickel and iodine, with at least 0.80 volts. Nickel(II) ions beat water at the cathode, and iodide ions beat water at the anode. Choice A has water reduced, but nickel(II) ions are the stronger oxidising agent.',
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
            'In a solution, water can be reduced, at $-0.83\\ \\text{V}$, or oxidised, at $+1.23\\ \\text{V}$.',
            'Cathode: the strongest oxidising agent is reduced. Anode: the strongest reducing agent is oxidised.',
            'Minimum voltage: the size of $E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a solution, water can be reduced at the cathode, or oxidised at the anode.', show: 'sum.0' },
        { say: 'At the cathode, the strongest oxidising agent is reduced. At the anode, the strongest reducing agent is oxidised.', show: 'sum.1' },
        { say: 'And the minimum voltage is the size of the cathode potential minus the anode potential. In part three, you will plate metals, and start counting electrons with Faraday’s law. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
