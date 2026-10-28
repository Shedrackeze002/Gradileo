import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cell, TONE } from './lib/c30-2b-figures.ts';

// A half-cell of an unknown metal M joined to a standard copper half-cell: the voltmeter reads
// 0.74 V, and electrons flow through the wire from M to copper.
const unknown = figure('c', [
  cell({
    left: { electrode: '\\text{M}', solution: '\\ce{M^2+(aq)}', role: '\\text{anode}', roleTone: TONE.anode },
    right: { electrode: '\\text{Cu}', solution: '\\ce{Cu^2+(aq)}', tone: 'adj', role: '\\text{cathode}', roleTone: TONE.cathode },
    bridge: '\\begin{gathered}\\text{salt bridge}\\\\ \\ce{KNO3(aq)}\\end{gathered}',
    electrons: 'right',
    reading: '0.74\\ \\text{V}',
  }),
]);

const video: Explainer = {
  id: 'c30-2-7-c',
  lessonId: 'c30-2-7',
  title: 'Standard Cell Potentials, Part 3: Finding an Unknown Potential',
  thumbnailTitle: 'Finding an Unknown Potential',
  thumbnail: 'c',
  summary:
    'E°cell = E°cathode − E°anode can be run backwards to find an unknown reduction potential from a measured cell potential. Electrons leave the anode, so the direction they flow says which half-cell is which: a metal M that sends electrons to a copper half-cell (+0.34 V) in a 0.74 V cell has E° = 0.34 − 0.74 = −0.40 V, the value for cadmium, and a metal that takes electrons from a nickel half-cell (−0.26 V) in a 0.60 V cell has E° = +0.34 V.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Finding an Unknown Potential', subtitle: 'Running the formula backwards' }],
      lines: [
        { say: 'Suppose a chemist has a metal that is not in the table. One cell, built with a half-cell that is in the table, and one voltmeter reading are enough to place it.', show: 'title' },
        { say: 'In this part, you will run the cell potential formula backwards, to find an unknown reduction potential.' },
      ],
    },
    {
      chapter: 'An unknown metal',
      layout: 'split',
      leftWidth: 640,
      left: [unknown],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Known: $\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34\\ \\text{V}$.',
            'The cell potential is $0.74\\ \\text{V}$.',
            'Electrons flow from M to copper.',
            'Find $E^\\circ$ for $\\ce{M^2+ + 2e- -> M}$.',
          ],
        },
      ],
      lines: [
        {
          say: 'A cell is made from a standard copper half-cell, at plus zero point three four volts, and a half-cell of an unknown metal M, in a solution of M two plus ions.',
          caption: 'A cell is made from a standard copper half-cell, at +0.34 volts, and a half-cell of an unknown metal M, in a solution of M²⁺ ions.',
          show: ['c.l-beaker', 'c.l-electrode', 'c.r-beaker', 'c.r-electrode', 'c.wire', 'c.bridge', 'b.0'],
        },
        { say: 'The cell potential is zero point seven four volts, and electrons flow through the wire from M to copper.', show: ['c.reading', 'c.electrons', 'b.1', 'b.2'], focus: ['c.reading', 'c.electrons'] },
        { say: 'Electrons leave the anode, so M is the anode, and copper is the cathode. What is the standard reduction potential of M?', show: ['c.l-role', 'c.r-role', 'b.3'], focus: ['c.l-role', 'c.r-role'] },
      ],
    },
    {
      chapter: 'Solve for the unknown',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}',
            '0.74 = +0.34 - E^\\circ_\\text{M}',
            'E^\\circ_\\text{M} = 0.34 - 0.74 = \\good{-0.40\\ \\text{V}}',
            '\\text{Check: } +0.34 - ({-0.40}) = 0.74\\ \\text{V} \\ \\good{\\checkmark}',
          ],
        },
      ],
      lines: [
        { say: 'Start from the formula, and put in what you know.', show: 'm.0', focus: 'm.0' },
        { say: 'The cell potential, zero point seven four, equals the cathode, plus zero point three four, minus the unknown potential of M.', show: 'm.1', focus: 'm.1' },
        { say: 'Rearrange. The unknown potential is zero point three four minus zero point seven four, which is negative zero point four zero volts, the value for cadmium.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it. Plus zero point three four, minus negative zero point four zero, is zero point seven four volts, the reading on the voltmeter.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'When the unknown is the cathode',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A standard nickel half-cell, $\\ce{Ni^2+ + 2e- -> Ni}$, $E^\\circ = -0.26\\ \\text{V}$, is joined to a half-cell of metal M in $\\ce{M^2+(aq)}$. The cell potential is $0.60\\ \\text{V}$, and electrons flow from nickel to M.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{Electrons flow to M, so M is the cathode.}', '0.60 = E^\\circ_\\text{M} - ({-0.26})', 'E^\\circ_\\text{M} = 0.60 + ({-0.26}) = \\good{+0.34\\ \\text{V}}'],
        },
      ],
      lines: [
        {
          say: 'The unknown can be the cathode as well. Here, a nickel half-cell, at negative zero point two six volts, is joined to metal M. The cell potential is zero point six zero volts, and electrons flow from nickel to M.',
          caption: 'The unknown can be the cathode as well. Here, a nickel half-cell, at −0.26 volts, is joined to metal M. The cell potential is 0.60 volts, and electrons flow from nickel to M.',
          show: 'q',
        },
        { say: 'Electrons flow toward the cathode, so this time M is the cathode, and nickel is the anode.', show: 'm.0', focus: 'm.0' },
        { say: 'So zero point six zero equals the unknown, minus negative zero point two six.', show: 'm.1', focus: 'm.1' },
        { say: 'The unknown is zero point six zero plus negative zero point two six: plus zero point three four volts, the value for copper.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A standard copper half-cell, $\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34\\ \\text{V}$, is joined to a half-cell of metal M in $\\ce{M^2+(aq)}$. The cell potential is $0.79\\ \\text{V}$, and electrons flow from M to copper. What is $E^\\circ$ for $\\ce{M^2+ + 2e- -> M}$?',
          choices: ['$-0.45\\ \\text{V}$', '$+1.13\\ \\text{V}$', '$+0.45\\ \\text{V}$', '$-1.13\\ \\text{V}$'],
          answer: 0,
          working: 'Electrons leave M, so M is the anode: $0.79 = +0.34 - E^\\circ_\\text{M}$, so $E^\\circ_\\text{M} = 0.34 - 0.79 = -0.45\\ \\text{V}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A standard copper half-cell, at plus zero point three four volts, is joined to a half-cell of metal M. The cell potential is zero point seven nine volts, and electrons flow from M to copper. What is the standard reduction potential of M? Pause the video and try it.',
          caption: 'Your turn. A standard copper half-cell, at +0.34 volts, is joined to a half-cell of metal M. The cell potential is 0.79 volts, and electrons flow from M to copper. What is the standard reduction potential of M? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, negative zero point four five volts, the value for iron. Electrons leave M, so M is the anode, and its potential is zero point three four minus zero point seven nine. Choice C would put M above copper, but the anode must be lower in the table.',
          caption: 'The answer is A, −0.45 volts, the value for iron. Electrons leave M, so M is the anode, and its potential is 0.34 − 0.79. Choice C would put M above copper, but the anode must be lower in the table.',
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
            'Electrons **leave** the anode: their direction says which half-cell is which.',
            'Put the known values into $E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$, and solve.',
            'Check by working the cell potential forwards.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Electrons leave the anode, so the direction they flow tells you which half-cell is which.', show: 'sum.0' },
        { say: 'Put the known values into the cell potential formula, and solve for the unknown.', show: 'sum.1' },
        { say: 'Then check by working the cell potential forwards. In part four, you will use the sign of a potential to decide whether a reaction is spontaneous. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
