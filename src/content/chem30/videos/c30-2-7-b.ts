import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { potentials } from './lib/c30-2b-figures.ts';

// The zinc–copper cell on a scale of reduction potentials: the cell potential is the distance
// from the anode (zinc, −0.76 V) up to the cathode (copper, +0.34 V).
const scale = figure(
  's',
  [
    potentials({
      min: -1,
      max: 0.5,
      per: 4,
      points: [
        { id: 'cu', value: 0.34, tex: '\\ce{Cu^2+/Cu}\\quad {+0.34}\\ \\text{V}', tone: 'adj' },
        { id: 'zn', value: -0.76, tex: '\\ce{Zn^2+/Zn}\\quad {-0.76}\\ \\text{V}', tone: 'opp' },
      ],
      spans: [{ id: 'cell', from: -0.76, to: 0.34, tex: '1.10\\ \\text{V}' }],
    }),
  ],
  540,
);

const video: Explainer = {
  id: 'c30-2-7-b',
  lessonId: 'c30-2-7',
  title: 'Standard Cell Potentials, Part 2: Calculating a Cell Potential',
  thumbnailTitle: 'Calculating a Cell Potential',
  thumbnail: 's',
  summary:
    'The standard cell potential is E°cell = E°cathode − E°anode, using reduction potentials exactly as the table gives them: the distance from the anode up to the cathode. The zinc–copper cell gives +0.34 − (−0.76) = +1.10 V, and a silver–aluminium cell +0.80 − (−1.66) = +2.46 V. The half-cell higher in the table is the cathode, and potentials are never multiplied by the coefficients of the cell reaction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'Calculating a Cell Potential', subtitle: 'Cathode minus anode' }],
      lines: [
        { say: 'Once every half-cell has a reduction potential, the voltage of any cell can be worked out on paper, before anyone builds it.', show: 'title' },
        { say: 'In this part, you will calculate standard cell potentials, and avoid two common mistakes.' },
      ],
    },
    {
      chapter: 'Cathode minus anode',
      layout: 'split',
      leftWidth: 520,
      left: [scale],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Standard cell potential',
          md: '$E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$, where both values are standard **reduction** potentials, exactly as the table gives them.',
        },
        { kind: 'text', id: 'dist', size: 'md', md: 'On a scale of reduction potentials, it is the distance from the [[opp:anode]] up to the [[adj:cathode]].' },
      ],
      lines: [
        { say: 'The potential of a cell is the difference between the reduction potentials of its two half-cells.', show: ['s.axis', 's.cu', 's.zn'] },
        { say: 'The standard cell potential, E naught cell, equals E naught of the cathode, minus E naught of the anode. Both are standard reduction potentials, exactly as the table gives them.', show: 'def' },
        { say: 'On a scale of reduction potentials, the cell potential is the distance from the anode up to the cathode.', show: ['s.cell', 'dist'], focus: 's.cell' },
      ],
    },
    {
      chapter: 'The zinc–copper cell',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'Find $E^\\circ_\\text{cell}$ for $\\ce{Zn(s)} \\mid \\ce{Zn^2+(aq)} \\parallel \\ce{Cu^2+(aq)} \\mid \\ce{Cu(s)}$. Use $\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34\\ \\text{V}$, and $\\ce{Zn^2+ + 2e- -> Zn}$, $E^\\circ = -0.76\\ \\text{V}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\adj{\\text{Cathode: }} \\ce{Cu^2+} \\text{ reduced} \\qquad \\opp{\\text{Anode: }} \\ce{Zn} \\text{ oxidised}', 'E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode} = +0.34 - ({-0.76})', '= \\good{+1.10\\ \\text{V}}'],
        },
      ],
      lines: [
        {
          say: 'Try the zinc-copper cell. Copper two ions are reduced at the cathode, at plus zero point three four volts. Zinc is oxidised at the anode, at negative zero point seven six volts.',
          caption: 'Try the zinc–copper cell. Copper(II) ions are reduced at the cathode, at +0.34 volts. Zinc is oxidised at the anode, at −0.76 volts.',
          show: ['q', 'm.0'],
          focus: 'm.0',
        },
        { say: 'Cathode minus anode: plus zero point three four, minus negative zero point seven six.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtracting a negative is adding, so the cell potential is plus one point one zero volts, the voltage a real zinc-copper cell makes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Which is the cathode?',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Not told which is which?',
          md: 'The half-cell **higher in the table** is the cathode: its oxidising agent is the stronger, so it is reduced. A voltaic cell always has a **positive** potential.',
        },
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A standard cell is made from $\\ce{Al^3+ + 3e- -> Al}$, $E^\\circ = -1.66\\ \\text{V}$, and $\\ce{Ag+ + e- -> Ag}$, $E^\\circ = +0.80\\ \\text{V}$.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Al(s) + 3Ag+(aq) -> Al^3+(aq) + 3Ag(s)}', 'E^\\circ_\\text{cell} = +0.80 - ({-1.66}) = \\good{+2.46\\ \\text{V}}'] },
      ],
      lines: [
        { say: 'When you are given two half-cells but not told which is which, the one higher in the table is the cathode. Its oxidising agent is the stronger, so it is reduced. A voltaic cell always has a positive potential.', show: 'key' },
        { say: 'Here, an aluminium half-cell is joined to a silver half-cell. Silver is higher in the table, so silver ions are reduced at the cathode, and aluminium is oxidised at the anode.', show: 'q' },
        { say: 'The cell reaction takes three silver ions for each aluminium atom, but the potentials are not multiplied by the coefficients.', show: 'm.0', focus: 'm.0' },
        { say: 'Plus zero point eight zero, minus negative one point six six, is plus two point four six volts.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two mistakes',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Multiplying potentials, or changing their signs',
          md: 'A potential measures how strongly each electron is pushed, not how many electrons move, so it does **not** change when a half-reaction is multiplied. And do not change the sign of the anode’s potential by hand: the subtraction does that.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\bad{3(+0.80) - ({-1.66}) = 4.06\\ \\text{V}} \\quad \\bad{\\times}', '\\bad{+0.80 - (+1.66) = -0.86\\ \\text{V}} \\quad \\bad{\\times}', '\\good{+0.80 - ({-1.66}) = +2.46\\ \\text{V}} \\quad \\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Two mistakes are common. The first multiplies the silver potential by three, because the equation has three silver ions. That gives four point zero six volts.', show: 'm.0', focus: 'm.0' },
        { say: 'But a potential measures how strongly each electron is pushed, not how many electrons move, so it does not change when a half-reaction is multiplied.', show: 'oops' },
        { say: 'The second changes the sign of the anode’s potential by hand, and then subtracts as well, giving negative zero point eight six volts. The subtraction in the formula already changes the sign.', show: 'm.1', focus: 'm.1' },
        { say: 'Use the potentials straight from the table, and the answer is plus two point four six volts.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A standard voltaic cell is made from a nickel half-cell, $\\ce{Ni^2+ + 2e- -> Ni}$, $E^\\circ = -0.26\\ \\text{V}$, and a silver half-cell, $\\ce{Ag+ + e- -> Ag}$, $E^\\circ = +0.80\\ \\text{V}$. What is its standard cell potential?',
          choices: ['$+0.54\\ \\text{V}$', '$+1.86\\ \\text{V}$', '$-1.06\\ \\text{V}$', '$+1.06\\ \\text{V}$'],
          answer: 3,
          working: 'Silver is higher in the table, so it is the cathode: $E^\\circ_\\text{cell} = +0.80 - ({-0.26}) = +1.06\\ \\text{V}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A standard cell is made from a nickel half-cell, at negative zero point two six volts, and a silver half-cell, at plus zero point eight zero volts. What is its standard cell potential? Pause the video and try it.',
          caption: 'Your turn. A standard cell is made from a nickel half-cell, at −0.26 volts, and a silver half-cell, at +0.80 volts. What is its standard cell potential? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, plus one point zero six volts. Silver is higher, so it is the cathode: zero point eight zero minus negative zero point two six. Choice B doubles the silver potential, and choice A just adds the two potentials.',
          caption: 'The answer is D, +1.06 volts. Silver is higher, so it is the cathode: 0.80 − (−0.26). Choice B doubles the silver potential, and choice A just adds the two potentials.',
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
            '$E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$, with reduction potentials straight from the table.',
            'The half-cell higher in the table is the cathode, and a voltaic cell’s potential is positive.',
            'Never multiply a potential by a coefficient.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The standard cell potential is E naught of the cathode minus E naught of the anode, with reduction potentials straight from the table.', show: 'sum.0' },
        { say: 'The half-cell higher in the table is the cathode, and a voltaic cell’s potential is positive.', show: 'sum.1' },
        { say: 'And never multiply a potential by a coefficient. In part three, you will run the formula backwards, to find an unknown reduction potential. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
