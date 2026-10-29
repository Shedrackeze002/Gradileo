import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder, type LadderRow } from './lib/c30-2a-figures.ts';

const ROWS: LadderRow[] = [
  { id: 'ag', oa: '\\ce{Ag+}', e: '\\ce{e-}', ra: '\\ce{Ag}', E: '+0.80' },
  { id: 'cu', oa: '\\ce{Cu^2+}', e: '\\ce{2e-}', ra: '\\ce{Cu}', E: '+0.34' },
  { id: 'h', oa: '\\ce{2H+}', e: '\\ce{2e-}', ra: '\\ce{H2}', E: '0.00' },
  { id: 'zn', oa: '\\ce{Zn^2+}', e: '\\ce{2e-}', ra: '\\ce{Zn}', E: '-0.76' },
];
// Four rows of the lesson's table: silver, copper, hydrogen and zinc.
const table = figure('t', [ladder({ width: 1100, rows: ROWS })], 350);

const video: Explainer = {
  id: 'c30-2-3-c',
  lessonId: 'c30-2-3',
  title: 'Predicting Redox Reactions, Part 3: Spontaneous or Not',
  thumbnailTitle: 'Spontaneous or Not',
  thumbnail: false,
  summary:
    'A redox reaction is spontaneous when the oxidising agent is above the reducing agent in the redox table; otherwise no reaction occurs. Silver ions are above copper, so Cu + 2Ag⁺ → Cu²⁺ + 2Ag happens, but hydrogen ions are below copper, so copper does not dissolve in hydrochloric acid. Two oxidising agents cannot react with each other.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Spontaneous or Not', subtitle: 'Oxidising agent above reducing agent' }],
      lines: [
        { say: 'Drop a piece of copper into hydrochloric acid, and nothing happens. Drop in a piece of zinc, and bubbles of hydrogen stream off.', show: 'title' },
        { say: 'A reaction needs an oxidising agent to take electrons and a reducing agent to give them. In this part, you will use their places in the table to predict whether a redox reaction is spontaneous.' },
      ],
    },
    {
      chapter: 'Copper and silver ions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Predicting spontaneity', md: 'A redox reaction is **spontaneous** when the oxidising agent is **above** the reducing agent in the table. Otherwise, no reaction occurs.' },
        table,
      ],
      lines: [
        { say: 'Here is the rule. A redox reaction is spontaneous when the oxidising agent is above the reducing agent in the table. When the oxidising agent is below the reducing agent, no reaction occurs.', show: ['rule', 't.head', 't.ag', 't.cu', 't.h', 't.zn'] },
        {
          say: 'Will copper react spontaneously with silver ions? The oxidising agent is the silver ion, at plus zero point eight zero volts. The reducing agent is copper, on the right of the copper row, at plus zero point three four.',
          caption: 'Will copper react spontaneously with silver ions? The oxidising agent is Ag⁺, at +0.80 V. The reducing agent is Cu, on the right of the copper row, at +0.34 V.',
          show: ['t.ag-oa-box', 't.cu-ra-box'],
          focus: ['t.ag-oa-box', 't.cu-ra-box'],
        },
        { say: 'The silver ion is above copper, so the reaction is spontaneous.' },
      ],
    },
    {
      chapter: 'Combining the halves',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\opp{\\text{Oxidation: }} \\ce{Cu(s) -> Cu^2+(aq) + 2e-}',
            '\\adj{\\text{Reduction: }} 2 \\times [\\ce{Ag+(aq) + e- -> Ag(s)}]',
            '\\ce{Cu(s) + 2Ag+(aq) -> Cu^2+(aq) + 2Ag(s)}',
          ],
        },
      ],
      lines: [
        {
          say: 'To write the reaction, combine the half-reactions. Copper is oxidised: the copper row read backwards. Copper gives copper two ions plus two electrons.',
          caption: 'To write the reaction, combine the half-reactions. Copper is oxidised: the copper row read backwards. Cu(s) → Cu²⁺(aq) + 2e⁻.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Silver ions are reduced. Each takes one electron, so the silver half-reaction is used twice.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Copper plus two silver ions gives copper two ions plus two silver, just as the experiment with the copper wire showed.',
          caption: 'Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s), just as the experiment with the copper wire showed.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Copper in hydrochloric acid',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Hydrochloric acid contains $\\ce{H+(aq)}$ and $\\ce{Cl-(aq)}$. Will copper react with it?' }, table],
      lines: [
        { say: 'Will copper react with hydrochloric acid, which contains hydrogen ions and chloride ions?', show: ['q', 't.head', 't.ag', 't.cu', 't.h', 't.zn'] },
        {
          say: 'The oxidising agent is the hydrogen ion, at zero volts. The reducing agent is copper, at plus zero point three four. Hydrogen ions are below copper, so there is no reaction: copper does not dissolve in hydrochloric acid.',
          caption: 'The oxidising agent is H⁺, at 0.00 V. The reducing agent is Cu, at +0.34 V. Hydrogen ions are below copper, so there is no reaction: copper does not dissolve in hydrochloric acid.',
          show: ['t.h-oa-box', 't.cu-ra-box'],
          focus: ['t.h-oa-box', 't.cu-ra-box'],
        },
        {
          say: 'Metals below hydrogen in the table, such as zinc and iron, do react with acids. Hydrogen ions are above zinc, so they take its electrons, and hydrogen gas bubbles off.',
          show: 't.zn-ra-box',
          focus: ['t.h-oa-box', 't.zn-ra-box'],
        },
      ],
    },
    {
      chapter: 'Two oxidising agents',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Two oxidising agents cannot react',
          md: '"Will $\\ce{Zn^2+}$ react with $\\ce{Cu^2+}$?" Both are oxidising agents: each can only **take** electrons. A redox reaction always needs one oxidising agent **and** one reducing agent.',
        },
      ],
      lines: [
        { say: 'Watch out for a trick question: will zinc ions react with copper two ions?', caption: 'Watch out for a trick question: will Zn²⁺ react with Cu²⁺?', show: 'oops' },
        { say: 'Both are oxidising agents. Each can only take electrons, and neither has electrons to give. A redox reaction always needs one oxidising agent and one reducing agent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'Which metal reacts spontaneously with iron(II) sulfate solution? Use: $\\ce{Ag+ + e- -> Ag}$, $+0.80$ V; $\\ce{Cu^2+ + 2e- -> Cu}$, $+0.34$ V; $\\ce{Ni^2+ + 2e- -> Ni}$, $-0.26$ V; $\\ce{Fe^2+ + 2e- -> Fe}$, $-0.45$ V; $\\ce{Zn^2+ + 2e- -> Zn}$, $-0.76$ V.',
          choices: ['Zinc', 'Copper', 'Silver', 'Nickel'],
          answer: 0,
          working: 'The oxidising agent is $\\ce{Fe^2+}$, at $-0.45$ V. Only a metal below it is oxidised by it: zinc, at $-0.76$ V. $\\ce{Zn(s) + Fe^2+(aq) -> Zn^2+(aq) + Fe(s)}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Which metal reacts spontaneously with iron two sulfate solution: zinc, copper, silver or nickel? Pause the video and try it.',
          caption: 'Your turn. Which metal reacts spontaneously with iron(II) sulfate solution: zinc, copper, silver or nickel? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, zinc. The oxidising agent is the iron two ion, at minus zero point four five volts. Only zinc, at minus zero point seven six, is below it. Choice C, silver, is the highest: iron two ions cannot take its electrons.',
          caption: 'The answer is A, zinc. The oxidising agent is Fe²⁺, at −0.45 V. Only zinc, at −0.76 V, is below it. Choice C, silver, is the highest: iron(II) ions cannot take its electrons.',
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
            'Spontaneous when the oxidising agent is **above** the reducing agent; otherwise no reaction.',
            'Combine the half-reactions so the electrons match.',
            'A redox reaction needs one oxidising agent **and** one reducing agent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A redox reaction is spontaneous when the oxidising agent is above the reducing agent in the table. Otherwise, no reaction occurs.', show: 'sum.0' },
        { say: 'To write the reaction, combine the half-reactions so the electrons match.', show: 'sum.1' },
        { say: 'And a reaction needs one of each kind of agent. In part four, you will predict what happens in a mixture of several species. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
