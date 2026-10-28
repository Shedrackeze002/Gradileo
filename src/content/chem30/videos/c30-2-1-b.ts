import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gift } from './lib/c30-2a-figures.ts';

// An iron atom gives two electrons to a copper(II) ion: one is oxidised, the other reduced.
const nail = figure('g', [gift({ giver: '\\ce{Fe}', taker: '\\ce{Cu^2+}', giverAfter: '\\ce{Fe^2+}', takerAfter: '\\ce{Cu}', electrons: '\\ce{2e-}' })], 460);

const video: Explainer = {
  id: 'c30-2-1-b',
  lessonId: 'c30-2-1',
  title: 'Oxidation and Reduction, Part 2: Half-Reactions',
  thumbnailTitle: 'Half-Reactions',
  thumbnail: 'g',
  summary:
    'A half-reaction shows the oxidation or the reduction part of a redox reaction with its electrons: products in an oxidation (Fe → Fe²⁺ + 2e⁻), reactants in a reduction (Cu²⁺ + 2e⁻ → Cu). Each half-reaction balances in atoms and in charge, and adding the two cancels the electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'Half-Reactions', subtitle: 'Showing the electrons' }],
      lines: [
        {
          say: 'In the iron nail reaction, iron plus copper two ions gives iron two ions plus copper. Two electrons move from each iron atom, but no electron appears in the equation.',
          caption: 'In the iron nail reaction, Fe + Cu²⁺ → Fe²⁺ + Cu. Two electrons move from each iron atom, but no electron appears in the equation.',
          show: 'title',
        },
        { say: 'Every electron lost on one side is gained on the other, so they hide. In this part, you will write each half of the change separately, so the electrons show.' },
      ],
    },
    {
      chapter: 'Two halves',
      layout: 'split',
      leftWidth: 480,
      left: [nail],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Half-reaction', md: 'The **oxidation** or the **reduction** part of a redox reaction, with the electrons written as $\\ce{e-}$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Half-reaction', 'Equation'],
          rows: [
            ['[[opp:Oxidation]]', '$\\ce{Fe(s) -> Fe^2+(aq) + 2e-}$'],
            ['[[adj:Reduction]]', '$\\ce{Cu^2+(aq) + 2e- -> Cu(s)}$'],
          ],
        },
      ],
      lines: [
        { say: 'A half-reaction shows either the oxidation or the reduction part of a redox reaction, with the electrons written in.', show: ['def', 'g.giver', 'g.taker', 'g.e'] },
        {
          say: 'Iron loses two electrons. So in the oxidation half-reaction, the electrons are products: iron gives iron two ions plus two electrons.',
          caption: 'Iron loses two electrons. So in the oxidation half-reaction, the electrons are products: Fe(s) → Fe²⁺(aq) + 2e⁻.',
          show: ['t.0', 'g.giver-after'],
          focus: ['t.0', 'g.giver-after'],
        },
        {
          say: 'Copper two ions gain two electrons. So in the reduction half-reaction, the electrons are reactants: copper two ions plus two electrons give copper.',
          caption: 'Copper(II) ions gain two electrons. So in the reduction half-reaction, the electrons are reactants: Cu²⁺(aq) + 2e⁻ → Cu(s).',
          show: ['t.1', 'g.taker-after'],
          focus: ['t.1', 'g.taker-after'],
        },
      ],
    },
    {
      chapter: 'Atoms and charge',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Fe -> Fe^2+ + 2e-} \\qquad 0 = (+2) + (-2) \\ \\good{\\checkmark}',
            '\\ce{Cu^2+ + 2e- -> Cu} \\qquad (+2) + (-2) = 0 \\ \\good{\\checkmark}',
            '\\ce{Fe + Cu^2+ + $\\bad{\\cancel{2e^-}}$ -> Fe^2+ + Cu + $\\bad{\\cancel{2e^-}}$}',
            '\\ce{Fe + Cu^2+ -> Fe^2+ + Cu}',
          ],
        },
      ],
      lines: [
        { say: 'Each half-reaction balances, both in atoms and in charge. In the oxidation, the charge is zero on the left. On the right, plus two and minus two make zero.', show: 'm.0', focus: 'm.0' },
        { say: 'In the reduction, plus two and minus two make zero on the left, and the copper atom on the right has no charge.', show: 'm.1', focus: 'm.1' },
        { say: 'Now add the two half-reactions. Two electrons appear on each side, so they cancel.', show: 'm.2', focus: 'm.2' },
        { say: 'What is left is the redox equation you started with.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Chlorine and bromide',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Cl2(g) + 2Br^-(aq) -> 2Cl^-(aq) + Br2(l)}',
            '\\opp{\\text{Oxidation: }} \\ce{2Br^-(aq) -> Br2(l) + 2e-}',
            '\\text{Charge: } {-2} \\qquad 0 + (-2) = {-2} \\ \\good{\\checkmark}',
            '\\adj{\\text{Reduction: }} \\ce{Cl2(g) + 2e- -> 2Cl^-(aq)}',
            '\\text{Charge: } {-2} \\qquad {-2} \\ \\good{\\checkmark}',
          ],
        },
      ],
      lines: [
        {
          say: 'Now chlorine gas is bubbled through sodium bromide solution. Chlorine plus two bromide ions gives two chloride ions plus bromine.',
          caption: 'Now chlorine gas is bubbled through sodium bromide solution. Cl₂(g) + 2Br⁻(aq) → 2Cl⁻(aq) + Br₂(l).',
          show: 'm.0',
        },
        {
          say: 'Bromide ions, each minus one, become bromine molecules, with no charge, so they lose electrons. It takes two bromide ions to make one bromine molecule: two bromide ions give bromine plus two electrons.',
          caption: 'Bromide ions, each −1, become bromine molecules, with no charge, so they lose electrons. It takes two bromide ions to make one Br₂ molecule: 2Br⁻(aq) → Br₂(l) + 2e⁻.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Check the charge: minus two on the left, and minus two from the electrons on the right.', show: 'm.2', focus: 'm.2' },
        {
          say: 'Chlorine molecules, with no charge, become chloride ions, each minus one, so they gain electrons: chlorine plus two electrons gives two chloride ions. Minus two on both sides.',
          caption: 'Chlorine molecules, with no charge, become chloride ions, each −1, so they gain electrons: Cl₂(g) + 2e⁻ → 2Cl⁻(aq). −2 on both sides.',
          show: ['m.3', 'm.4'],
          focus: ['m.3', 'm.4'],
        },
      ],
    },
    {
      chapter: 'Electrons on the wrong side',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Electrons on the wrong side', md: 'Zinc **loses** electrons, so they are **products**. Always check that the total charge is the same on both sides.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\ce{Zn(s) + 2e- -> Zn^2+(aq)}} \\qquad {-2} \\ne {+2}', '\\good{\\ce{Zn(s) -> Zn^2+(aq) + 2e-}} \\qquad 0 = 0'] },
      ],
      lines: [
        { say: 'A common mistake: zinc plus two electrons gives zinc ions. The charge is minus two on the left and plus two on the right, so it does not balance.', show: 'm.0', focus: 'm.0' },
        { say: 'Zinc loses electrons, so they are products, on the right: zinc gives zinc ions plus two electrons. Now the charge is zero on both sides.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A piece of zinc is placed in copper(II) sulfate solution: $\\ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}$. Which is the **reduction** half-reaction?',
          choices: ['$\\ce{Cu^2+(aq) -> Cu(s) + 2e-}$', '$\\ce{Zn(s) -> Zn^2+(aq) + 2e-}$', '$\\ce{Cu^2+(aq) + 2e- -> Cu(s)}$', '$\\ce{Zn^2+(aq) + 2e- -> Zn(s)}$'],
          answer: 2,
          working: 'The copper(II) ions gain two electrons, so the electrons are reactants: $\\ce{Cu^2+(aq) + 2e- -> Cu(s)}$. The charge is 0 on both sides.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Zinc is placed in copper two sulfate solution, and forms zinc ions and copper. Which is the reduction half-reaction? Pause the video and try it.',
          caption: 'Your turn. Zinc is placed in copper(II) sulfate solution, and forms zinc ions and copper. Which is the reduction half-reaction? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C. The copper two ions gain two electrons, so the electrons are reactants. Choice A has them on the wrong side: its charge is plus two on the left and minus two on the right. Choice B is the oxidation.',
          caption: 'The answer is C. The copper(II) ions gain two electrons, so the electrons are reactants. Choice A has them on the wrong side: its charge is +2 on the left and −2 on the right. Choice B is the oxidation.',
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
            'A **half-reaction** shows the oxidation or the reduction, with its electrons.',
            'Oxidation: electrons are **products**. Reduction: electrons are **reactants**.',
            'Each half-reaction balances in **atoms** and in **charge**.',
            'Adding the two half-reactions cancels the electrons.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A half-reaction shows the oxidation or the reduction, with its electrons.', show: 'sum.0' },
        { say: 'In an oxidation, the electrons are products. In a reduction, they are reactants.', show: 'sum.1' },
        { say: 'Each half-reaction balances in atoms and in charge, so check the charge every time.', show: 'sum.2' },
        { say: 'Adding the two cancels the electrons. In part three, you will meet the oxidising agent and the reducing agent. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
