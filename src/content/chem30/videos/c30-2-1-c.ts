import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gift } from './lib/c30-2a-figures.ts';

// Iron gives two electrons to a copper(II) ion: iron is the reducing agent, the copper(II) ion the oxidising agent.
const nail = figure('g', [gift({ giver: '\\ce{Fe}', taker: '\\ce{Cu^2+}', giverAfter: '\\ce{Fe^2+}', takerAfter: '\\ce{Cu}', electrons: '\\ce{2e-}' })], 420);

const video: Explainer = {
  id: 'c30-2-1-c',
  lessonId: 'c30-2-1',
  title: 'Oxidation and Reduction, Part 3: Oxidising and Reducing Agents',
  thumbnailTitle: 'Oxidising and Reducing Agents',
  thumbnail: 'g',
  summary:
    'The oxidising agent takes electrons from another substance and is itself reduced; the reducing agent gives electrons and is itself oxidised. In Mg + 2H⁺ → Mg²⁺ + H₂, the hydrogen ions are the oxidising agent and magnesium is the reducing agent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Oxidising and Reducing Agents', subtitle: 'What each reactant does to the other' }],
      lines: [
        { say: 'Bleach is called an oxidising agent. In every redox reaction, each reactant does something to the other: one takes electrons, and the other gives them.', show: 'title' },
        { say: 'In this part, you will name the oxidising agent and the reducing agent, and see why the oxidising agent is itself reduced.' },
      ],
    },
    {
      chapter: 'Two agents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oa', tone: 'definition', title: 'Oxidising agent', md: 'Takes electrons from another substance, causing it to be oxidised. The oxidising agent is itself [[adj:reduced]].' },
        { kind: 'callout', id: 'ra', tone: 'definition', title: 'Reducing agent', md: 'Gives electrons to another substance, causing it to be reduced. The reducing agent is itself [[opp:oxidised]].' },
      ],
      lines: [
        { say: 'An oxidising agent takes electrons from another substance, causing it to be oxidised. By taking electrons, the oxidising agent is itself reduced.', show: 'oa' },
        { say: 'A reducing agent gives electrons to another substance, causing it to be reduced. By giving electrons away, the reducing agent is itself oxidised.', show: 'ra' },
      ],
    },
    {
      chapter: 'The iron nail',
      layout: 'split',
      leftWidth: 420,
      left: [nail],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Electrons', 'Change', 'Role'],
          rows: [
            ['$\\ce{Fe}$', 'loses 2', '[[opp:oxidised]]', 'reducing agent'],
            ['$\\ce{Cu^2+}$', 'gains 2', '[[adj:reduced]]', 'oxidising agent'],
          ],
        },
      ],
      lines: [
        { say: 'In the iron nail reaction, each iron atom gives two electrons to a copper two ion.', caption: 'In the iron nail reaction, each iron atom gives two electrons to a copper(II) ion.', show: ['g.giver', 'g.taker', 'g.e'] },
        { say: 'Iron loses two electrons, so it is oxidised. Its electrons cause the copper two ions to be reduced, so iron is the reducing agent.', caption: 'Iron loses two electrons, so it is oxidised. Its electrons cause the copper(II) ions to be reduced, so iron is the reducing agent.', show: ['t.0', 'g.giver-after'], focus: ['t.0', 'g.giver-after'] },
        {
          say: 'The copper two ions gain two electrons, so they are reduced. They take electrons from iron, causing its oxidation, so they are the oxidising agent.',
          caption: 'The copper(II) ions gain two electrons, so they are reduced. They take electrons from iron, causing its oxidation, so they are the oxidising agent.',
          show: ['t.1', 'g.taker-after'],
          focus: ['t.1', 'g.taker-after'],
        },
        { say: 'So the reducing agent is the substance oxidised, and the oxidising agent is the substance reduced.', focus: 't' },
      ],
    },
    {
      chapter: 'Agents in an acid',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Mg(s) + 2H^+(aq) -> Mg^2+(aq) + H2(g)}',
            '\\opp{\\text{Oxidation: }} \\ce{Mg(s) -> Mg^2+(aq) + 2e-}',
            '\\adj{\\text{Reduction: }} \\ce{2H^+(aq) + 2e- -> H2(g)}',
            '\\text{Oxidising agent: } \\adj{\\ce{H^+(aq)}} \\qquad \\text{Reducing agent: } \\opp{\\ce{Mg(s)}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Magnesium ribbon reacts with hydrochloric acid. Magnesium plus two hydrogen ions gives magnesium ions plus hydrogen gas. Which is the oxidising agent?',
          caption: 'Magnesium ribbon reacts with hydrochloric acid. Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g). Which is the oxidising agent?',
          show: 'm.0',
        },
        { say: 'Oxidation: magnesium gives magnesium ions plus two electrons. Magnesium loses electrons, so it is oxidised.', caption: 'Oxidation: Mg(s) → Mg²⁺(aq) + 2e⁻. Magnesium loses electrons, so it is oxidised.', show: 'm.1', focus: 'm.1' },
        { say: 'Reduction: two hydrogen ions plus two electrons give hydrogen gas. The hydrogen ions gain electrons, so they are reduced.', caption: 'Reduction: 2H⁺(aq) + 2e⁻ → H₂(g). The hydrogen ions gain electrons, so they are reduced.', show: 'm.2', focus: 'm.2' },
        { say: 'So the oxidising agent is the hydrogen ion, and the reducing agent is magnesium. The chloride ions of the acid are spectators.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Not oxidised',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'The oxidising agent is not oxidised',
          md: 'The names describe what a substance does to the **other** reactant. "Copper(II) ions are the oxidising agent, so they are oxidised" mixes the two up: they are **reduced**.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Agent', 'Electrons', 'Is itself'],
          rows: [
            ['oxidising agent', 'takes them', '[[adj:reduced]]'],
            ['reducing agent', 'gives them', '[[opp:oxidised]]'],
          ],
        },
      ],
      lines: [
        { say: 'Watch out. The names describe what a substance does to the other reactant, not what happens to it.', show: 'oops' },
        {
          say: 'Saying that copper two ions are the oxidising agent, so they are oxidised, mixes the two up. The oxidising agent oxidises the other substance, and is itself reduced.',
          caption: 'Saying that copper(II) ions are the oxidising agent, so they are oxidised, mixes the two up. The oxidising agent oxidises the other substance, and is itself reduced.',
        },
        { say: 'So pair them up: the oxidising agent takes electrons and is reduced. The reducing agent gives electrons and is oxidised.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Chlorine is added to a solution of iodide ions: $\\ce{Cl2(g) + 2I^-(aq) -> 2Cl^-(aq) + I2(s)}$. Which substance is the **reducing agent**?',
          choices: ['$\\ce{Cl2(g)}$', '$\\ce{I^-(aq)}$', '$\\ce{Cl^-(aq)}$', '$\\ce{I2(s)}$'],
          answer: 1,
          working: 'Each iodide ion loses an electron as iodine forms: $\\ce{2I^-(aq) -> I2(s) + 2e-}$. The iodide ions are oxidised, so they are the reducing agent. Chlorine takes the electrons: it is the oxidising agent.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Chlorine is added to a solution of iodide ions. Chlorine plus two iodide ions gives two chloride ions plus iodine. Which substance is the reducing agent? Pause the video and try it.',
          caption: 'Your turn. Chlorine is added to a solution of iodide ions. Cl₂(g) + 2I⁻(aq) → 2Cl⁻(aq) + I₂(s). Which substance is the reducing agent? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, the iodide ions. Each iodide ion loses an electron as iodine forms, so the iodide ions are oxidised: they are the reducing agent. Choice A, chlorine, takes the electrons: it is the oxidising agent.',
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
            'The **oxidising agent** takes electrons and is itself **reduced**.',
            'The **reducing agent** gives electrons and is itself **oxidised**.',
            'Write the half-reactions to see which reactant loses electrons and which gains them.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The oxidising agent takes electrons, and is itself reduced.', show: 'sum.0' },
        { say: 'The reducing agent gives electrons, and is itself oxidised.', show: 'sum.1' },
        { say: 'Write the half-reactions to see which reactant loses electrons. In part four, you will balance the electrons when the two halves move different numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
