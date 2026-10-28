import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { potentials } from './lib/c30-2b-figures.ts';

// Copper in acid on a scale of reduction potentials: from the anode (copper) to the cathode
// (hydrogen) is down, so the potential is negative.
const copper = figure(
  's',
  [
    potentials({
      min: -0.25,
      max: 0.5,
      per: 8,
      points: [
        { id: 'cu', value: 0.34, tex: '\\ce{Cu^2+/Cu}\\quad {+0.34}\\ \\text{V}', tone: 'opp' },
        { id: 'h', value: 0, tex: '\\ce{H+/H2}\\quad {0.00}\\ \\text{V}', tone: 'adj' },
      ],
      spans: [{ id: 'e', from: 0.34, to: 0, tex: '{-0.34}\\ \\text{V}', tone: 'bad' }],
    }),
  ],
  520,
);

// Permanganate and chloride: from the anode (chloride) up to the cathode (permanganate), positive.
const chlorine = figure(
  's',
  [
    potentials({
      min: 1.25,
      max: 1.6,
      step: 0.05,
      per: 16,
      points: [
        { id: 'mn', value: 1.51, tex: '\\ce{MnO4^-/Mn^2+}\\quad {+1.51}\\ \\text{V}', tone: 'adj' },
        { id: 'cl', value: 1.36, tex: '\\ce{Cl2/Cl-}\\quad {+1.36}\\ \\text{V}', tone: 'opp' },
      ],
      spans: [{ id: 'e', from: 1.36, to: 1.51, tex: '+0.15\\ \\text{V}', tone: 'good' }],
      room: 6.2,
    }),
  ],
  520,
);

const video: Explainer = {
  id: 'c30-2-7-d',
  lessonId: 'c30-2-7',
  title: 'Standard Cell Potentials, Part 4: Potentials and Spontaneity',
  thumbnailTitle: 'Potentials and Spontaneity',
  thumbnail: 's',
  summary:
    'Any redox reaction can be treated as a cell: the species reduced is at the cathode, the species oxidised at the anode, and E° = E°cathode − E°anode. A reaction is spontaneous when E° is positive and non-spontaneous when it is negative: copper in acid gives −0.34 V, so copper does not dissolve in hydrochloric acid, while permanganate and chloride give +0.15 V, which is why permanganate titrations use sulfuric acid. Standard potentials describe a cell at the start, at 1.0 mol/L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 4', title: 'Potentials and Spontaneity', subtitle: 'The sign says it all' }],
      lines: [
        { say: 'Does copper dissolve in hydrochloric acid? Can permanganate attack chloride ions? A cell potential answers both questions, even when no cell is ever built.', show: 'title' },
        { say: 'In this part, you will use the sign of a potential to decide whether a redox reaction is spontaneous.' },
      ],
    },
    {
      chapter: 'Any reaction as a cell',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 't',
          size: 'md',
          align: 'center',
          md: 'For the reaction **as written**: the species reduced is at the [[adj:cathode]], the species oxidised is at the [[opp:anode]], and $E^\\circ = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$.',
        },
        {
          kind: 'callout',
          id: 'def',
          tone: 'key',
          title: 'Spontaneity from the cell potential',
          md: 'A redox reaction is **spontaneous** when its $E^\\circ$ is **positive**. When $E^\\circ$ is **negative**, it is non-spontaneous: its reverse is the spontaneous one, and it runs only if energy is supplied, as in an electrolytic cell.',
        },
      ],
      lines: [
        { say: 'Any redox reaction can be treated as a cell, whether or not anyone builds one. For the reaction as written, the species reduced is at the cathode, and the species oxidised is at the anode.', show: 't' },
        { say: 'A redox reaction is spontaneous when its E naught is positive.', show: 'def' },
        { say: 'When E naught is negative, the reaction is non-spontaneous. Its reverse is the spontaneous one, and it runs only if energy is supplied, as in the electrolytic cells of the next lesson.' },
        { say: 'This is the rule you already know, in numbers. An oxidising agent above the reducing agent in the table means a higher cathode potential, and a positive difference.' },
      ],
    },
    {
      chapter: 'Copper in acid',
      layout: 'split',
      leftWidth: 520,
      left: [copper],
      right: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'Is $\\ce{Cu(s) + 2H+(aq) -> Cu^2+(aq) + H2(g)}$ spontaneous? Use $E^\\circ = +0.34\\ \\text{V}$ for $\\ce{Cu^2+/Cu}$ and $0.00\\ \\text{V}$ for $\\ce{H+/H2}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\adj{\\text{Cathode: }} \\ce{H+} \\quad \\opp{\\text{Anode: }} \\ce{Cu}', 'E^\\circ = 0.00 - (+0.34)', '= \\bad{-0.34\\ \\text{V}}'],
        },
        { kind: 'text', id: 'v', size: 'md', md: 'Negative, so **non-spontaneous**: copper does not dissolve in acids such as hydrochloric acid.' },
      ],
      lines: [
        { say: 'Is the reaction of copper with hydrogen ions spontaneous? As written, hydrogen ions are reduced, so they are at the cathode, and copper is oxidised at the anode.', show: ['q', 'm.0', 's.axis', 's.cu', 's.h'], focus: 'm.0' },
        { say: 'Zero point zero zero, minus plus zero point three four, is negative zero point three four volts. On the scale, the cathode is below the anode.', show: ['m.1', 'm.2', 's.e'], focus: ['m.2', 's.e'] },
        { say: 'The potential is negative, so the reaction is non-spontaneous. Copper does not dissolve in acids such as hydrochloric acid.', show: 'v' },
      ],
    },
    {
      chapter: 'Permanganate and chloride',
      layout: 'split',
      leftWidth: 520,
      left: [chlorine],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\ce{2MnO4^- + 10Cl^- + 16H+}',
            '\\qquad \\ce{-> 2Mn^2+ + 5Cl2 + 8H2O}',
            '\\adj{\\text{Cathode: }} \\ce{MnO4^-} \\quad \\opp{\\text{Anode: }} \\ce{Cl^-}',
            'E^\\circ = +1.51 - (+1.36)',
            '= \\good{+0.15\\ \\text{V}}',
          ],
        },
        { kind: 'text', id: 'v', size: 'md', md: 'Positive, so **spontaneous**: permanganate titrations are acidified with sulfuric acid, not hydrochloric acid.' },
      ],
      lines: [
        { say: 'Now permanganate and chloride ions, in acid. Permanganate is reduced, at plus one point five one volts, and chloride ions are oxidised, at plus one point three six volts.', show: ['m.0', 'm.1', 'm.2', 's.axis', 's.mn', 's.cl'], focus: 'm.2' },
        { say: 'Plus one point five one, minus plus one point three six, is plus zero point one five volts. This time the cathode is above the anode.', show: ['m.3', 'm.4', 's.e'], focus: ['m.4', 's.e'] },
        { say: 'The potential is positive, so the reaction is spontaneous. That is why permanganate titrations are acidified with sulfuric acid, not hydrochloric acid.', show: 'v' },
      ],
    },
    {
      chapter: 'Not standard conditions',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'note',
          tone: 'tip',
          title: 'Not standard conditions',
          md: 'Real cells rarely run at standard conditions. As a battery is used, the concentrations in it change and its voltage slowly falls. Standard potentials describe the start, with every solution at $1.0\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'One last note. Real cells rarely run at standard conditions.', show: 'note' },
        { say: 'As a battery is used, the concentrations in it change, and its voltage slowly falls. Standard potentials describe the start, with every solution at one point zero moles per litre.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Consider $\\ce{2Ag(s) + Cu^2+(aq) -> 2Ag+(aq) + Cu(s)}$. Use $E^\\circ = +0.80\\ \\text{V}$ for $\\ce{Ag+/Ag}$ and $+0.34\\ \\text{V}$ for $\\ce{Cu^2+/Cu}$. What is $E^\\circ$ for the reaction, and is it spontaneous?',
          choices: ['$E^\\circ = +0.46\\ \\text{V}$, spontaneous', '$E^\\circ = +0.46\\ \\text{V}$, non-spontaneous', '$E^\\circ = -0.46\\ \\text{V}$, non-spontaneous', '$E^\\circ = -0.46\\ \\text{V}$, spontaneous'],
          answer: 2,
          working: 'Copper(II) ions are reduced (cathode) and silver is oxidised (anode): $E^\\circ = +0.34 - (+0.80) = -0.46\\ \\text{V}$, so the reaction is non-spontaneous.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Silver metal and copper two ions react to give silver ions and copper, with the potentials shown. What is E naught for the reaction, and is it spontaneous? Pause the video and try it.',
          caption: 'Your turn. Silver metal and copper(II) ions react to give silver ions and copper, with the potentials shown. What is E° for the reaction, and is it spontaneous? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, negative zero point four six volts, so it is non-spontaneous. Copper two ions are reduced, so copper is the cathode: zero point three four minus zero point eight zero. Choice A swaps the cathode and the anode.',
          caption: 'The answer is C, −0.46 volts, so it is non-spontaneous. Copper(II) ions are reduced, so copper is the cathode: 0.34 − 0.80. Choice A swaps the cathode and the anode.',
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
            'For a reaction as written, $E^\\circ = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$, with the species reduced at the cathode.',
            '**Positive**: spontaneous. **Negative**: non-spontaneous; it runs only with energy supplied.',
            'Standard potentials describe the start, with every solution at $1.0\\ \\text{mol/L}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a reaction as written, E naught is the cathode potential minus the anode potential, with the species reduced at the cathode.', show: 'sum.0' },
        { say: 'A positive potential means spontaneous. A negative one means non-spontaneous: the reaction runs only with energy supplied.', show: 'sum.1' },
        { say: 'And standard potentials describe the start, at one point zero moles per litre. That completes this lesson. Next, you will use electricity to drive reactions that are not spontaneous. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
