import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder, type LadderRow } from './lib/c30-2a-figures.ts';

/** Rows of the lesson's redox table, strongest oxidising agent first. */
const ROWS: Record<string, LadderRow> = {
  f: { id: 'f', oa: '\\ce{F2}', e: '\\ce{2e-}', ra: '\\ce{2F-}', E: '+2.87' },
  cl: { id: 'cl', oa: '\\ce{Cl2}', e: '\\ce{2e-}', ra: '\\ce{2Cl-}', E: '+1.36' },
  ag: { id: 'ag', oa: '\\ce{Ag+}', e: '\\ce{e-}', ra: '\\ce{Ag}', E: '+0.80' },
  cu: { id: 'cu', oa: '\\ce{Cu^2+}', e: '\\ce{2e-}', ra: '\\ce{Cu}', E: '+0.34' },
  h: { id: 'h', oa: '\\ce{2H+}', e: '\\ce{2e-}', ra: '\\ce{H2}', E: '0.00' },
  ni: { id: 'ni', oa: '\\ce{Ni^2+}', e: '\\ce{2e-}', ra: '\\ce{Ni}', E: '-0.26' },
  zn: { id: 'zn', oa: '\\ce{Zn^2+}', e: '\\ce{2e-}', ra: '\\ce{Zn}', E: '-0.76' },
  mg: { id: 'mg', oa: '\\ce{Mg^2+}', e: '\\ce{2e-}', ra: '\\ce{Mg}', E: '-2.37' },
  li: { id: 'li', oa: '\\ce{Li+}', e: '\\ce{e-}', ra: '\\ce{Li}', E: '-3.04' },
};
const rows = (...ids: string[]) => ids.map((id) => ROWS[id]);
const ALL = ['f', 'cl', 'ag', 'cu', 'h', 'ni', 'zn', 'mg', 'li'];

// Part of the lesson's table: nine reduction half-reactions with their potentials.
const table = figure('t', [ladder({ width: 1100, rowH: 46, arrows: true, rows: rows(...ALL) })], 560);
// The top and bottom of the table.
const ends = figure('t', [ladder({ width: 1100, arrows: true, rows: rows('f', 'ag', 'zn', 'li') })], 350);
// The four ions of the example.
const four = figure('t', [ladder({ width: 1100, rows: rows('ag', 'cu', 'ni', 'zn') })], 350);

const video: Explainer = {
  id: 'c30-2-3-b',
  lessonId: 'c30-2-3',
  title: 'Predicting Redox Reactions, Part 2: The Redox Table',
  thumbnailTitle: 'The Redox Table',
  thumbnail: false,
  summary:
    'A redox table lists reduction half-reactions in order of the strength of their oxidising agents, highest standard reduction potential first. Oxidising agents are on the left, strongest at the top (F₂); reducing agents are on the right, strongest at the bottom (Li). Of Zn²⁺, Ag⁺, Cu²⁺ and Ni²⁺, the strongest oxidising agent is Ag⁺, the highest in the table.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'The Redox Table', subtitle: 'Oxidising agents ranked from the strongest' }],
      lines: [
        { say: 'Testing every pair of metals and ions would take a long time. Instead, the results are collected in one table.', show: 'title' },
        { say: 'In this part, you will read a redox table, and find the strongest oxidising agent and the strongest reducing agent.' },
      ],
    },
    {
      chapter: 'Reading the table',
      layout: 'center',
      main: [table],
      lines: [
        { say: 'A redox table lists reduction half-reactions in order of the strength of their oxidising agents. Here are nine of them.', show: ['t.head', ...ALL.map((id) => `t.${id}`)] },
        { say: 'Each has a standard reduction potential, in volts. The higher the value, the stronger the oxidising agent. A later lesson explains where the values come from; for now, only the order matters.', focus: ['t.f-E', 't.li-E'] },
        { say: 'Oxidising agents are on the left: they take electrons. Read backwards, each half-reaction is an oxidation, so the species on the right give electrons: they are reducing agents.', focus: 't' },
        { say: 'The strongest oxidising agent is the highest one on the left: here, fluorine.', show: ['t.f-oa-box', 't.oa-arrow'], focus: 't.f-oa-box' },
        { say: 'The strongest reducing agent is the lowest one on the right: here, lithium.', show: ['t.li-ra-box', 't.ra-arrow'], focus: 't.li-ra-box' },
      ],
    },
    {
      chapter: 'Opposite directions',
      layout: 'center',
      main: [
        ends,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Opposite directions', md: 'The strongest oxidising agent, $\\ce{F2}$, sits beside the **weakest** reducing agent, $\\ce{F-}$.' },
      ],
      lines: [
        { say: 'Strength runs in opposite directions on the two sides.', show: ['t.head', 't.f', 't.ag', 't.zn', 't.li', 't.oa-arrow', 't.ra-arrow'] },
        { say: 'Fluorine is the strongest oxidising agent, and fluoride ions, beside it, are the weakest reducing agent. They hold their electrons so tightly that almost nothing can take them.', show: ['t.f-oa-box', 't.f-ra-box', 'key'], focus: ['t.f-oa-box', 't.f-ra-box'] },
        { say: 'At the bottom, lithium gives up electrons most easily, and lithium ions, beside it, are the weakest oxidising agent.', show: ['t.li-ra-box', 't.li-oa-box'], focus: ['t.li-ra-box', 't.li-oa-box'] },
      ],
    },
    {
      chapter: 'The strongest oxidising agent',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which is the strongest oxidising agent: $\\ce{Zn^2+}$, $\\ce{Ag+}$, $\\ce{Cu^2+}$ or $\\ce{Ni^2+}$?' },
        four,
      ],
      lines: [
        {
          say: 'Which is the strongest oxidising agent: zinc ions, silver ions, copper two ions or nickel two ions?',
          caption: 'Which is the strongest oxidising agent: Zn²⁺, Ag⁺, Cu²⁺ or Ni²⁺?',
          show: 'q',
        },
        { say: 'All four are on the left of the table, so all four are oxidising agents.', show: ['t.head', 't.ag', 't.cu', 't.ni', 't.zn'] },
        {
          say: 'In order from the top: silver ions at plus zero point eight zero volts, copper two ions at plus zero point three four, nickel two ions at minus zero point two six, and zinc ions at minus zero point seven six.',
          caption: 'In order from the top: Ag⁺ at +0.80 V, Cu²⁺ at +0.34 V, Ni²⁺ at −0.26 V, and Zn²⁺ at −0.76 V.',
          focus: ['t.ag-E', 't.cu-E', 't.ni-E', 't.zn-E'],
        },
        { say: 'The strongest is the highest in the table: silver ions.', show: 't.ag-oa-box', focus: 't.ag-oa-box' },
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
            'Use these reduction half-reactions: $\\ce{Ag+ + e- -> Ag}$, $+0.80$ V; $\\ce{Cu^2+ + 2e- -> Cu}$, $+0.34$ V; $\\ce{Zn^2+ + 2e- -> Zn}$, $-0.76$ V; $\\ce{Mg^2+ + 2e- -> Mg}$, $-2.37$ V. Which is the strongest **reducing agent**?',
          choices: ['$\\ce{Ag}$', '$\\ce{Cu}$', '$\\ce{Zn}$', '$\\ce{Mg}$'],
          answer: 3,
          working: 'Reducing agents are on the right of the half-reactions, and the strongest is the lowest one: $\\ce{Mg}$, at $-2.37$ V.',
        },
      ],
      lines: [
        { say: 'Your turn. Using these four half-reactions, which is the strongest reducing agent: silver, copper, zinc or magnesium? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, magnesium. Reducing agents are on the right, and the strongest is the lowest one in the table. Choice A, silver, is the weakest reducing agent here: it sits at the top, beside the strongest oxidising agent.', show: 'q.answer' },
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
            'A **redox table** lists reduction half-reactions, strongest oxidising agent first.',
            'Oxidising agents are on the **left**: the strongest is the **highest**.',
            'Reducing agents are on the **right**: the strongest is the **lowest**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A redox table lists reduction half-reactions, with the strongest oxidising agent first.', show: 'sum.0' },
        { say: 'Oxidising agents are on the left, and the strongest is the highest.', show: 'sum.1' },
        { say: 'Reducing agents are on the right, and the strongest is the lowest. In part three, you will use the table to predict whether a reaction is spontaneous. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
