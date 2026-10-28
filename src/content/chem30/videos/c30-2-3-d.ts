import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder, type LadderRow } from './lib/c30-2a-figures.ts';

const ROWS: Record<string, LadderRow> = {
  o2: { id: 'o2', oa: '\\ce{O2 + 4H+}', e: '\\ce{4e-}', ra: '\\ce{2H2O}', E: '+1.23' },
  fe3: { id: 'fe3', oa: '\\ce{Fe^3+}', e: '\\ce{e-}', ra: '\\ce{Fe^2+}', E: '+0.77' },
  cu: { id: 'cu', oa: '\\ce{Cu^2+}', e: '\\ce{2e-}', ra: '\\ce{Cu}', E: '+0.34' },
  ni: { id: 'ni', oa: '\\ce{Ni^2+}', e: '\\ce{2e-}', ra: '\\ce{Ni}', E: '-0.26' },
  fe2: { id: 'fe2', oa: '\\ce{Fe^2+}', e: '\\ce{2e-}', ra: '\\ce{Fe}', E: '-0.45' },
  zn: { id: 'zn', oa: '\\ce{Zn^2+}', e: '\\ce{2e-}', ra: '\\ce{Zn}', E: '-0.76' },
  w: { id: 'w', oa: '\\ce{2H2O}', e: '\\ce{2e-}', ra: '\\ce{H2 + 2OH-}', E: '-0.83' },
};
const rows = (...ids: string[]) => ids.map((id) => ROWS[id]);
const wide = { width: 1100, oaW: 175, raW: 195 };

// The table rows for a strip of nickel in a solution of copper(II) and zinc ions.
const nickel = figure('t', [ladder({ ...wide, rowH: 46, rows: rows('o2', 'cu', 'ni', 'zn', 'w') })], 380);
// Water and iron(II) ions, each on both sides of the table.
const both = figure('t', [ladder({ ...wide, rows: rows('o2', 'fe3', 'fe2', 'w') })], 350);

const video: Explainer = {
  id: 'c30-2-3-d',
  lessonId: 'c30-2-3',
  title: 'Predicting Redox Reactions, Part 4: Predicting Reactions in Mixtures',
  thumbnailTitle: 'Predicting Reactions in Mixtures',
  thumbnail: false,
  summary:
    'To predict the reaction in a mixture, list every species (including water), label each as an oxidising agent, a reducing agent or both, and find the strongest oxidising agent (highest on the left) and the strongest reducing agent (lowest on the right); they react if the oxidising agent is above. A strip of nickel in copper(II) and zinc ions gives Ni + Cu²⁺ → Ni²⁺ + Cu.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 4', title: 'Predicting Reactions in Mixtures', subtitle: 'Which pair reacts, in four steps' }],
      lines: [
        { say: 'A beaker often holds more than two species: a metal strip, several kinds of ions, and the water itself. Which pair reacts?', show: 'title' },
        { say: 'In this part, you will predict the reaction in a mixture, in four steps.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '**1. List every species:** atoms, molecules and separate ions. In a solution, include water.',
            '**2. Label** each: oxidising agent (left), reducing agent (right), or both.',
            '**3. Find** the strongest oxidising agent (highest on the left) and the strongest reducing agent (lowest on the right).',
            '**4. React?** Yes if the oxidising agent is above the reducing agent. Combine their half-reactions.',
          ],
        },
      ],
      lines: [
        { say: 'Step one: list every species present: atoms, molecules, and the separate ions of ionic compounds. In an aqueous solution, include water.', show: 'steps.0' },
        { say: 'Step two: label each one as an oxidising agent, on the left of the table, a reducing agent, on the right, or both.', show: 'steps.1' },
        { say: 'Step three: find the strongest oxidising agent, the highest on the left, and the strongest reducing agent, the lowest on the right.', show: 'steps.2' },
        { say: 'Step four: if that oxidising agent is above that reducing agent, they react. Combine their half-reactions.', show: 'steps.3' },
      ],
    },
    {
      chapter: 'A strip of nickel',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Nickel in a solution of $\\ce{Cu^2+}$ and $\\ce{Zn^2+}$: $\\ce{Ni(s)}$, $\\ce{Cu^2+(aq)}$, $\\ce{Zn^2+(aq)}$, $\\ce{H2O(l)}$' },
        nickel,
        { kind: 'math', id: 'ans', size: 'md', lines: ['\\ce{Ni(s) + Cu^2+(aq) -> Ni^2+(aq) + Cu(s)}'] },
      ],
      lines: [
        {
          say: 'A strip of nickel is placed in a solution of copper two ions and zinc ions; the nitrate ions with them do not react. The species are nickel, copper two ions, zinc ions, and water.',
          caption: 'A strip of nickel is placed in a solution of copper(II) ions and zinc ions; the nitrate ions with them do not react. The species are Ni(s), Cu²⁺(aq), Zn²⁺(aq) and H₂O(l).',
          show: ['q', 't.head', 't.o2', 't.cu', 't.ni', 't.zn', 't.w'],
        },
        {
          say: 'Label them. Copper two ions, zinc ions and water are on the left: oxidising agents. Nickel is on the right, a reducing agent, and so is water, in the oxygen half-reaction.',
          caption: 'Label them. Cu²⁺, Zn²⁺ and H₂O are on the left: oxidising agents. Ni is on the right, a reducing agent, and so is H₂O, in the oxygen half-reaction.',
          show: ['t.cu-oa-box', 't.zn-oa-box', 't.w-oa-box', 't.ni-ra-box', 't.o2-ra-box'],
        },
        {
          say: 'The strongest oxidising agent is the highest on the left: copper two ions. The strongest reducing agent is the lowest on the right: nickel. Water, as a reducing agent, is far higher.',
          caption: 'The strongest oxidising agent is the highest on the left: Cu²⁺. The strongest reducing agent is the lowest on the right: Ni. Water, as a reducing agent, is far higher.',
          focus: ['t.cu-oa-box', 't.ni-ra-box'],
        },
        {
          say: 'Copper two ions are above nickel, so they react: nickel plus copper two ions gives nickel two ions plus copper. The zinc ions stay in solution, unchanged.',
          caption: 'Cu²⁺ is above Ni, so they react: Ni(s) + Cu²⁺(aq) → Ni²⁺(aq) + Cu(s). The zinc ions stay in solution, unchanged.',
          show: 'ans',
          focus: 'ans',
        },
      ],
    },
    {
      chapter: 'Both sides of the table',
      layout: 'center',
      main: [
        both,
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Water in the table', md: 'Only reducing agents below the water reduction, such as sodium and lithium, release hydrogen from water. Only strong oxidising agents, such as $\\ce{F2}$, take electrons from water.' },
      ],
      lines: [
        {
          say: 'Some species appear on both sides of the table. Water is on the left of the water reduction, as an oxidising agent, and on the right of the oxygen half-reaction, as a reducing agent.',
          show: ['t.head', 't.o2', 't.fe3', 't.fe2', 't.w', 't.w-oa-box', 't.o2-ra-box'],
          focus: ['t.w-oa-box', 't.o2-ra-box'],
        },
        {
          say: 'Iron two ions are on the left of the iron two row, and on the right of the iron three row. Check both places before deciding.',
          caption: 'Iron(II) ions are on the left of the Fe²⁺ row, and on the right of the Fe³⁺ row. Check both places before deciding.',
          show: ['t.fe2-oa-box', 't.fe3-ra-box'],
          focus: ['t.fe2-oa-box', 't.fe3-ra-box'],
        },
        {
          say: 'The water reduction is low, so only reducing agents below it, such as sodium and lithium, react with water to release hydrogen. Magnesium and aluminium are below it too, but a thin oxide layer makes them react only very slowly.',
          show: 'note',
        },
        { say: 'The oxidation of water is high in the table, so only strong oxidising agents, such as fluorine, can take electrons from it.' },
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
            'A beaker contains $\\ce{Mg^2+(aq)}$, $\\ce{Zn(s)}$, $\\ce{Cu^2+(aq)}$ and $\\ce{Ag(s)}$. Use: $\\ce{Ag+}$, $+0.80$ V; $\\ce{Cu^2+}$, $+0.34$ V; $\\ce{Zn^2+}$, $-0.76$ V; $\\ce{Mg^2+}$, $-2.37$ V. Which reaction occurs spontaneously?',
          choices: ['$\\ce{2Ag + Cu^2+ -> 2Ag+ + Cu}$', '$\\ce{Zn + Mg^2+ -> Zn^2+ + Mg}$', '$\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$', '$\\ce{2Ag + Mg^2+ -> 2Ag+ + Mg}$'],
          answer: 2,
          working: 'Oxidising agents present: $\\ce{Cu^2+}$ ($+0.34$ V) and $\\ce{Mg^2+}$ ($-2.37$ V); the strongest is $\\ce{Cu^2+}$. Reducing agents: $\\ce{Ag}$ ($+0.80$ V) and $\\ce{Zn}$ ($-0.76$ V); the strongest is $\\ce{Zn}$. $\\ce{Cu^2+}$ is above $\\ce{Zn}$, so they react.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A beaker contains magnesium ions, zinc, copper two ions and silver. Which reaction occurs spontaneously? Pause the video and try it.',
          caption: 'Your turn. A beaker contains Mg²⁺(aq), Zn(s), Cu²⁺(aq) and Ag(s). Which reaction occurs spontaneously? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C. The strongest oxidising agent is the copper two ion, and the strongest reducing agent is zinc, which is below it, so they react. Choice A pairs copper two ions with silver, which is above them: no reaction.',
          caption: 'The answer is C. The strongest oxidising agent is Cu²⁺, and the strongest reducing agent is Zn, which is below it, so they react. Choice A pairs Cu²⁺ with silver, which is above it: no reaction.',
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
            'List every species, including water, and label each oxidising agent and reducing agent.',
            'The strongest oxidising agent reacts with the strongest reducing agent if it is **above** it.',
            'Water, iron(II) ions and tin(II) ions can act as oxidising agents **and** as reducing agents.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. List every species, including water, and label the oxidising and reducing agents.', show: 'sum.0' },
        { say: 'The strongest oxidising agent reacts with the strongest reducing agent if it is above it in the table.', show: 'sum.1' },
        { say: 'Some species, such as water, iron two ions and tin two ions, appear on both sides. Next, you will balance redox equations with half-reactions. See you there!', caption: 'Some species, such as water, iron(II) ions and tin(II) ions, appear on both sides. Next, you will balance redox equations with half-reactions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
