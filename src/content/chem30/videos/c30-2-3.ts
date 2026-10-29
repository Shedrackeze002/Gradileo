import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder, wireBeaker } from './lib/c30-2a-figures.ts';

// A copper wire in silver nitrate grows silver needles and the solution turns blue; a silver wire
// in copper(II) nitrate does not change.
const wires = figure(
  'b',
  [
    wireBeaker({ name: 'cu', at: [0, 0], tone: 'muted', clear: true, turns: 'adj', wire: 'opp', crystals: true, label: '\\begin{gathered}\\text{copper in}\\\\ \\ce{AgNO3(aq)}\\end{gathered}' }),
    wireBeaker({ name: 'ag', at: [6, 0], tone: 'adj', wire: 'muted', label: '\\begin{gathered}\\text{silver in}\\\\ \\ce{Cu(NO3)2(aq)}\\end{gathered}' }),
  ],
  480,
);

// Three oxidising agents put in order by such tests: silver ions, copper(II) ions, zinc ions.
const order = figure(
  't',
  [
    ladder({
      width: 1100,
      values: false,
      arrows: true,
      rows: [
        { id: 'ag', oa: '\\ce{Ag+}', e: '\\ce{e-}', ra: '\\ce{Ag}' },
        { id: 'cu', oa: '\\ce{Cu^2+}', e: '\\ce{2e-}', ra: '\\ce{Cu}' },
        { id: 'zn', oa: '\\ce{Zn^2+}', e: '\\ce{2e-}', ra: '\\ce{Zn}' },
      ],
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'c30-2-3',
  lessonId: 'c30-2-3',
  title: 'Predicting Redox Reactions, Part 1: Comparing Oxidising Agents',
  thumbnailTitle: 'Comparing Oxidising Agents',
  thumbnail: 'b',
  summary:
    'A copper wire in silver nitrate solution grows silver and turns the solution blue, but a silver wire in copper(II) nitrate does not change: silver ions are the stronger oxidising agent and copper the stronger reducing agent. Testing pairs like this puts oxidising agents in order. A spontaneous reaction happens on its own, with no continuous supply of energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'Comparing Oxidising Agents', subtitle: 'Which ions take electrons from which metals' }],
      lines: [
        { say: 'Copper pipes can carry water for decades, but a zinc coating on a steel bucket slowly dissolves away, and gold stays bright for thousands of years.', show: 'title' },
        { say: 'Some redox reactions happen as soon as the reactants meet; others do not happen at all. In this lesson, you will predict which is which. This part compares oxidising agents by experiment. Later parts use a table to predict reactions, even in mixtures.' },
      ],
    },
    {
      chapter: 'Two wires',
      layout: 'split',
      leftWidth: 560,
      left: [wires],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Cu + 2Ag+ -> Cu^2+ + 2Ag}', '\\ce{Ag + Cu^2+} \\text{: no change}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Stronger and weaker', md: '$\\ce{Ag+}$ is the **stronger oxidising agent**: it takes electrons from $\\ce{Cu}$. $\\ce{Cu}$ is the **stronger reducing agent**.' },
      ],
      lines: [
        { say: 'A classic experiment. Place a copper wire in colourless silver nitrate solution.', show: ['b.cu-beaker', 'b.cu-solution', 'b.cu-wire', 'b.cu-label'] },
        {
          say: 'Needles of silver grow on the wire, and the solution turns blue as copper two ions form. Copper plus two silver ions gives copper two ions plus two silver.',
          caption: 'Needles of silver grow on the wire, and the solution turns blue as copper(II) ions form. Cu + 2Ag⁺ → Cu²⁺ + 2Ag.',
          show: ['b.cu-crystals', 'b.cu-turns', 'm.0'],
          focus: 'b.cu-crystals',
        },
        { say: 'Now place a silver wire in blue copper two nitrate solution. Nothing happens at all.', caption: 'Now place a silver wire in blue copper(II) nitrate solution. Nothing happens at all.', show: ['b.ag-beaker', 'b.ag-solution', 'b.ag-wire', 'b.ag-label', 'm.1'], focus: 'm.1' },
        {
          say: 'So silver ions can take electrons from copper atoms, but copper two ions cannot take electrons from silver atoms. Silver ions are the stronger oxidising agent, and copper atoms the stronger reducing agent.',
          caption: 'So silver ions can take electrons from copper atoms, but copper(II) ions cannot take electrons from silver atoms. Silver ions are the stronger oxidising agent, and copper atoms the stronger reducing agent.',
          show: 'key',
        },
      ],
    },
    {
      chapter: 'Putting them in order',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Zn + Cu^2+ -> Zn^2+ + Cu} \\qquad \\ce{Cu + Zn^2+}\\text{: no change}'] },
        order,
      ],
      lines: [
        {
          say: 'Try another pair. Zinc in copper two sulfate solution gets a coat of copper, but copper in a solution of zinc ions does not change. So copper two ions are a stronger oxidising agent than zinc ions.',
          caption: 'Try another pair. Zinc in copper(II) sulfate solution gets a coat of copper, but copper in a solution of zinc ions does not change. So copper(II) ions are a stronger oxidising agent than zinc ions.',
          show: 'm',
        },
        { say: 'Testing pairs like this puts oxidising agents in order of strength: silver ions first, then copper two ions, then zinc ions.', caption: 'Testing pairs like this puts oxidising agents in order of strength: Ag⁺ first, then Cu²⁺, then Zn²⁺.', show: ['t.head', 't.ag', 't.cu', 't.zn', 't.oa-arrow'], focus: 't.oa-arrow' },
        { say: 'Beside each ion is the metal it becomes, and the metals run the other way. Zinc gives up electrons most easily, so it is the strongest reducing agent of the three.', show: 't.ra-arrow', focus: 't.ra-arrow' },
      ],
    },
    {
      chapter: 'Spontaneous',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Spontaneous reaction', md: 'Happens on its own once the reactants are mixed, with **no continuous supply of energy** from outside. A non-spontaneous reaction does not happen unless energy is put in.' },
      ],
      lines: [
        { say: 'Copper in silver nitrate is a spontaneous reaction. It happens on its own once the reactants are mixed, with no continuous supply of energy from outside.', show: 'def' },
        { say: 'Silver in copper two nitrate is non-spontaneous: it does not happen unless energy is put in.', caption: 'Silver in copper(II) nitrate is non-spontaneous: it does not happen unless energy is put in.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nickel placed in copper(II) nitrate solution gets a coat of copper. Copper placed in nickel(II) nitrate solution does not change. Which is the **stronger oxidising agent**?',
          choices: ['$\\ce{Ni^2+}$', '$\\ce{Cu^2+}$', '$\\ce{Ni}$', '$\\ce{Cu}$'],
          answer: 1,
          working: 'Copper(II) ions take electrons from nickel atoms, but nickel(II) ions cannot take electrons from copper atoms. So $\\ce{Cu^2+}$ is the stronger oxidising agent, and $\\ce{Ni}$ the stronger reducing agent.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Nickel placed in copper two nitrate solution gets a coat of copper. Copper placed in nickel two nitrate solution does not change. Which is the stronger oxidising agent? Pause the video and try it.',
          caption: 'Your turn. Nickel placed in copper(II) nitrate solution gets a coat of copper. Copper placed in nickel(II) nitrate solution does not change. Which is the stronger oxidising agent? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, copper two ions. They take electrons from nickel atoms, but nickel two ions cannot take electrons from copper. Choice C, nickel, is the stronger reducing agent, not an oxidising agent.',
          caption: 'The answer is B, Cu²⁺. Copper(II) ions take electrons from nickel atoms, but nickel(II) ions cannot take electrons from copper. Choice C, nickel, is the stronger reducing agent, not an oxidising agent.',
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
            '$\\ce{Ag+}$ takes electrons from $\\ce{Cu}$, but $\\ce{Cu^2+}$ cannot take them from $\\ce{Ag}$: $\\ce{Ag+}$ is the stronger oxidising agent.',
            'Testing pairs puts oxidising agents in order of strength.',
            'A **spontaneous** reaction happens on its own, with no continuous supply of energy.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Silver ions take electrons from copper, but copper two ions cannot take them from silver. Silver ions are the stronger oxidising agent.', caption: 'Let’s sum up. Silver ions take electrons from copper, but copper(II) ions cannot take them from silver. Silver ions are the stronger oxidising agent.', show: 'sum.0' },
        { say: 'Testing pairs puts oxidising agents in order of strength.', show: 'sum.1' },
        { say: 'A spontaneous reaction happens on its own. In part two, you will read these orders from a redox table. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
