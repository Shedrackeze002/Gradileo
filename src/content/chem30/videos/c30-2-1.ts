import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gift, nailBeaker } from './lib/c30-2a-figures.ts';

// Each magnesium atom gives two electrons to an oxygen atom, as magnesium burns.
const burn = figure('g', [gift({ giver: '\\ce{Mg}', taker: '\\ce{O}', giverAfter: '\\ce{Mg^2+}', takerAfter: '\\ce{O^2-}', electrons: '\\ce{2e-}', words: false })], 460);

// An iron nail in blue copper(II) sulfate solution, coated with copper.
const nail = figure('n', [nailBeaker()], 520);

const video: Explainer = {
  id: 'c30-2-1',
  lessonId: 'c30-2-1',
  title: 'Oxidation and Reduction, Part 1: Losing and Gaining Electrons',
  thumbnailTitle: 'Losing and Gaining Electrons',
  thumbnail: 'n',
  summary:
    'Oxidation is a loss of electrons and reduction is a gain of electrons (OIL RIG), and the two always happen together in a redox reaction. An iron nail in copper(II) sulfate solution is oxidised to iron(II) ions while copper(II) ions are reduced to copper; follow the charges to tell which is which.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'Losing and Gaining Electrons', subtitle: 'What oxidation and reduction mean' }],
      lines: [
        {
          say: 'Drop an iron nail into blue copper two sulfate solution. Within minutes, the nail wears a coat of reddish-brown copper.',
          caption: 'Drop an iron nail into blue copper(II) sulfate solution. Within minutes, the nail wears a coat of reddish-brown copper.',
          show: 'title',
        },
        { say: 'Rusting iron, a battery and bleach are the same kind of chemistry: electrons move from one substance to another.' },
        { say: 'This part defines oxidation and reduction. Later parts write half-reactions, name the oxidising and reducing agents, and balance the electrons.' },
      ],
    },
    {
      chapter: 'Older than the electron',
      layout: 'split',
      leftWidth: 520,
      left: [burn],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{2Mg + O2 -> 2MgO}', '\\ce{MgO}\\text{: } \\ce{Mg^2+} \\text{ and } \\ce{O^2-}', '\\text{Mg gives } \\thc{\\ce{2e-}} \\text{ to O}'],
        },
      ],
      lines: [
        {
          say: 'The words are older than the electron. Oxidation first meant combining with oxygen, as when magnesium burns. Reduction meant taking the oxygen out of a metal ore.',
          show: 'm.0',
        },
        {
          say: 'But magnesium oxide is made of ions: magnesium ions, M G two plus, and oxide ions, O two minus.',
          caption: 'But magnesium oxide is made of ions: magnesium ions, Mg²⁺, and oxide ions, O²⁻.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'So as magnesium burns, each magnesium atom gives two electrons to an oxygen atom.', show: ['g.giver', 'g.taker', 'g.e', 'g.giver-after', 'g.taker-after', 'm.2'], focus: ['g.e', 'm.2'] },
        { say: 'Chemists now define oxidation and reduction by electrons, which covers many reactions with no oxygen at all.', focus: 'g' },
      ],
    },
    {
      chapter: 'Loss and gain',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ox', tone: 'definition', title: 'Oxidation', md: '**Oxidation** is a [[opp:loss]] of electrons. A substance that loses electrons is **oxidised**.' },
        { kind: 'callout', id: 'red', tone: 'definition', title: 'Reduction', md: '**Reduction** is a [[adj:gain]] of electrons. A substance that gains electrons is **reduced**.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'OIL RIG', md: '**O**xidation **I**s **L**oss, **R**eduction **I**s **G**ain (of electrons).' },
      ],
      lines: [
        { say: 'Oxidation is a loss of electrons. A substance that loses electrons is oxidised: magnesium was oxidised.', show: 'ox' },
        { say: 'Reduction is a gain of electrons. A substance that gains electrons is reduced: oxygen was reduced.', show: 'red' },
        { say: 'To remember which is which, think of oil rig. Oxidation is loss, reduction is gain, of electrons.', caption: 'To remember which is which, think of OIL RIG. Oxidation Is Loss, Reduction Is Gain, of electrons.', show: 'tip' },
      ],
    },
    {
      chapter: 'The iron nail',
      layout: 'split',
      leftWidth: 500,
      left: [nail],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Redox reaction', md: 'Electrons are transferred from one substance to another. Oxidation and reduction always happen **together**.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{Fe + Cu^2+ -> Fe^2+ + Cu}', '\\ce{Fe}\\text{: } 0 \\to 2{+} \\quad \\opp{\\text{loses } \\ce{2e-}}', '\\ce{Cu^2+}\\text{: } 2{+} \\to 0 \\quad \\adj{\\text{gains } \\ce{2e-}}'],
        },
      ],
      lines: [
        { say: 'Back to the iron nail. Oxidation and reduction always happen together: the electrons lost by one substance are gained by another. That is a redox reaction.', show: ['n.beaker', 'n.solution', 'n.nail', 'def'] },
        { say: 'Iron plus copper two ions gives iron two ions plus copper.', caption: 'Fe + Cu²⁺ → Fe²⁺ + Cu', show: 'm.0' },
        { say: 'Each iron atom, with no charge, becomes an ion with a charge of two plus. It has lost two electrons, so iron is oxidised.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Each copper two ion becomes a neutral atom. It has gained two electrons, so the copper two ions are reduced, and form the coat on the nail.',
          caption: 'Each copper(II) ion becomes a neutral atom. It has gained two electrons, so the copper(II) ions are reduced, and form the coat on the nail.',
          show: ['m.2', 'n.coat'],
          focus: ['m.2', 'n.coat'],
        },
        { say: 'The sulfate ions do not change. They are spectators, and are left out of the equation.', focus: 'n.solution' },
      ],
    },
    {
      chapter: 'Follow the charges',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A strip of zinc is placed in lead(II) nitrate solution. Which substance is oxidised, and which is reduced?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Zn(s) + Pb^2+(aq) -> Zn^2+(aq) + Pb(s)}',
            '\\ce{Zn}\\text{: } 0 \\to 2{+} \\quad \\text{loses } \\ce{2e-} \\quad \\opp{\\text{oxidised}}',
            '\\ce{Pb^2+}\\text{: } 2{+} \\to 0 \\quad \\text{gains } \\ce{2e-} \\quad \\adj{\\text{reduced}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Try one. Zinc is placed in lead two nitrate solution: zinc plus lead two ions gives zinc ions and lead. What is oxidised, and what is reduced?',
          caption: 'Try one. Zinc is placed in lead(II) nitrate solution: Zn(s) + Pb²⁺(aq) → Zn²⁺(aq) + Pb(s). What is oxidised, and what is reduced?',
          show: ['q', 'm.0'],
        },
        { say: 'Zinc atoms, charge zero, become zinc ions, charge two plus. Each loses two electrons, so zinc is oxidised.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Lead two ions, charge two plus, become lead atoms, charge zero. Each gains two electrons, so the lead two ions are reduced.',
          caption: 'Lead(II) ions, charge 2+, become lead atoms, charge 0. Each gains two electrons, so the lead(II) ions are reduced.',
          show: 'm.2',
          focus: 'm.2',
        },
        { say: 'A charge that goes up means electrons were lost. A charge that goes down means electrons were gained.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A piece of magnesium is placed in a solution of copper(II) ions: $\\ce{Mg(s) + Cu^2+(aq) -> Mg^2+(aq) + Cu(s)}$. Which substance is **oxidised**?',
          choices: ['$\\ce{Mg(s)}$', '$\\ce{Cu^2+(aq)}$', '$\\ce{Mg^2+(aq)}$', '$\\ce{Cu(s)}$'],
          answer: 0,
          working: 'Each magnesium atom goes from a charge of 0 to $2+$: it loses two electrons, so magnesium is oxidised. The copper(II) ions gain two electrons each: they are reduced.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Magnesium is placed in a solution of copper two ions, and forms magnesium ions and copper. Which substance is oxidised? Pause the video and try it.',
          caption: 'Your turn. Magnesium is placed in a solution of copper(II) ions, and forms magnesium ions and copper. Which substance is oxidised? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, magnesium. Each magnesium atom goes from a charge of zero to two plus, so it loses two electrons. Choice B is wrong: the copper two ions gain electrons, so they are reduced.',
          caption: 'The answer is A, magnesium. Each magnesium atom goes from a charge of 0 to 2+, so it loses two electrons. Choice B is wrong: the copper(II) ions gain electrons, so they are reduced.',
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
            '**Oxidation** is a loss of electrons; **reduction** is a gain of electrons (OIL RIG).',
            'They always happen together, in a **redox reaction**.',
            'Follow the charges: a charge that goes up means electrons were lost.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Oxidation is a loss of electrons, and reduction is a gain: oil rig.', caption: 'Let’s sum up. Oxidation is a loss of electrons, and reduction is a gain: OIL RIG.', show: 'sum.0' },
        { say: 'They always happen together, in a redox reaction.', show: 'sum.1' },
        { say: 'And follow the charges. In part two, you will write each change as a half-reaction, with its electrons. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
