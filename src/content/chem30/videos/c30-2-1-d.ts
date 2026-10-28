import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { electronCount } from './lib/c30-2a-figures.ts';

// Two aluminium atoms lose three electrons each; three copper(II) ions gain two each: six electrons.
const six = figure(
  'g',
  [electronCount({ giver: '\\ce{Al}', givers: 2, taker: '\\ce{Cu^2+}', takers: 3, electrons: '\\ce{6e-}', lost: '2 \\times 3 = 6\\ \\text{lost}', gained: '3 \\times 2 = 6\\ \\text{gained}' })],
  500,
);

const video: Explainer = {
  id: 'c30-2-1-d',
  lessonId: 'c30-2-1',
  title: 'Oxidation and Reduction, Part 4: Balancing the Electrons',
  thumbnailTitle: 'Balancing the Electrons',
  thumbnail: 'g',
  summary:
    'In a redox reaction the electrons lost equal the electrons gained. Aluminium loses three electrons and a copper(II) ion gains two, so the oxidation is multiplied by 2 and the reduction by 3: 2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu, with six electrons transferred. In Cu + 2Ag⁺ → Cu²⁺ + 2Ag, two electrons are transferred.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 4', title: 'Balancing the Electrons', subtitle: 'Electrons lost equal electrons gained' }],
      lines: [
        {
          say: 'Aluminium foil placed in copper two chloride solution dissolves, while copper metal forms.',
          caption: 'Aluminium foil placed in copper(II) chloride solution dissolves, while copper metal forms.',
          show: 'title',
        },
        { say: 'But each aluminium atom gives up three electrons, and each copper two ion takes only two. In this part, you will match the electrons lost with the electrons gained.', caption: 'But each aluminium atom gives up three electrons, and each copper(II) ion takes only two. In this part, you will match the electrons lost with the electrons gained.' },
      ],
    },
    {
      chapter: 'Making them match',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Electrons lost = electrons gained', md: 'When the half-reactions transfer different numbers of electrons, multiply each one until they match.' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Half-reaction', 'Multiply by', 'Electrons'],
          rows: [
            ['[[opp:Oxidation]]', '$\\ce{Al -> Al^3+ + 3e-}$', '$2$', '$6$'],
            ['[[adj:Reduction]]', '$\\ce{Cu^2+ + 2e- -> Cu}$', '$3$', '$6$'],
          ],
        },
      ],
      lines: [
        { say: 'Electrons cannot be left over. In a redox reaction, the electrons lost must equal the electrons gained.', show: 'key' },
        { say: 'The oxidation: aluminium gives aluminium ions plus three electrons.', caption: 'The oxidation: Al → Al³⁺ + 3e⁻.', show: 't.0' },
        { say: 'The reduction: copper two ions plus two electrons give copper.', caption: 'The reduction: Cu²⁺ + 2e⁻ → Cu.', show: 't.1' },
        { say: 'Three and two do not match. The smallest number both go into is six. So multiply the oxidation by two, and the reduction by three: six electrons each.', focus: 't' },
      ],
    },
    {
      chapter: 'Add and cancel',
      layout: 'split',
      leftWidth: 500,
      left: [six],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\ce{2Al -> 2Al^3+ + 6e-}',
            '\\ce{3Cu^2+ + 6e- -> 3Cu}',
            '\\ce{2Al + 3Cu^2+ -> 2Al^3+ + 3Cu}',
            '3(+2) = +6 \\qquad 2(+3) = +6 \\ \\good{\\checkmark}',
          ],
        },
      ],
      lines: [
        { say: 'Times two, the oxidation becomes two aluminium atoms giving two aluminium ions plus six electrons.', caption: 'Times two, the oxidation becomes 2Al → 2Al³⁺ + 6e⁻.', show: ['m.0', 'g.givers', 'g.lost'], focus: ['m.0', 'g.lost'] },
        { say: 'Times three, the reduction becomes three copper two ions plus six electrons giving three copper atoms.', caption: 'Times three, the reduction becomes 3Cu²⁺ + 6e⁻ → 3Cu.', show: ['m.1', 'g.takers', 'g.gained'], focus: ['m.1', 'g.gained'] },
        {
          say: 'Add them, and the six electrons cancel: two aluminium plus three copper two ions give two aluminium ions plus three copper. Six electrons are transferred.',
          caption: 'Add them, and the six electrons cancel: 2Al(s) + 3Cu²⁺(aq) → 2Al³⁺(aq) + 3Cu(s). Six electrons are transferred.',
          show: ['m.2', 'g.e'],
          focus: ['m.2', 'g.e'],
        },
        { say: 'Check the charge: three times plus two is plus six on the left, and two times plus three is plus six on the right.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Silver from copper',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Cu(s) + 2Ag^+(aq) -> Cu^2+(aq) + 2Ag(s)}',
            '\\opp{\\text{Oxidation: }} \\ce{Cu(s) -> Cu^2+(aq) + 2e-}',
            '\\adj{\\text{Reduction: }} \\ce{Ag^+(aq) + e- -> Ag(s)} \\quad \\times 2',
            '\\text{Electrons transferred: } 2',
          ],
        },
      ],
      lines: [
        {
          say: 'A copper wire is placed in silver nitrate solution. Copper plus two silver ions gives copper two ions plus two silver. How many electrons are transferred?',
          caption: 'A copper wire is placed in silver nitrate solution. Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s). How many electrons are transferred?',
          show: 'm.0',
        },
        { say: 'Oxidation: copper gives copper two ions plus two electrons.', caption: 'Oxidation: Cu(s) → Cu²⁺(aq) + 2e⁻.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Reduction: a silver ion plus one electron gives silver. Each silver ion gains only one electron, so the reduction is used twice. That is why the equation has two silver ions.',
          caption: 'Reduction: Ag⁺(aq) + e⁻ → Ag(s). Each silver ion gains only one electron, so the reduction is used twice. That is why the equation has two silver ions.',
          show: 'm.2',
          focus: 'm.2',
        },
        { say: 'So two electrons are transferred: one copper atom gives one electron to each of two silver ions.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Aluminium reacts with hydrochloric acid: $\\ce{2Al(s) + 6H^+(aq) -> 2Al^3+(aq) + 3H2(g)}$. How many electrons are transferred in the equation as written?',
          choices: ['$3$', '$2$', '$12$', '$6$'],
          answer: 3,
          working: 'Oxidation: $\\ce{Al -> Al^3+ + 3e-}$, used twice: 6 electrons lost. Reduction: $\\ce{2H+ + 2e- -> H2}$, used three times: 6 electrons gained.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Aluminium reacts with hydrochloric acid: two aluminium plus six hydrogen ions gives two aluminium ions plus three hydrogen molecules. How many electrons are transferred in the equation as written? Pause the video and try it.',
          caption: 'Your turn. Aluminium reacts with hydrochloric acid: 2Al(s) + 6H⁺(aq) → 2Al³⁺(aq) + 3H₂(g). How many electrons are transferred in the equation as written? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, six. Each aluminium atom loses three electrons, and there are two of them: six lost. And six hydrogen ions gain one electron each: six gained. Choice A, three, counts only one aluminium atom.',
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
            'The electrons lost **equal** the electrons gained.',
            'Multiply the half-reactions until their electrons match, then add them so the electrons cancel.',
            'Check the charge: $\\ce{2Al + 3Cu^2+ -> 2Al^3+ + 3Cu}$ has $+6$ on each side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a redox reaction, the electrons lost equal the electrons gained.', show: 'sum.0' },
        { say: 'Multiply the half-reactions until their electrons match, then add them so the electrons cancel.', show: 'sum.1' },
        {
          say: 'Check the charge at the end. That completes oxidation and reduction. In the next lesson, oxidation numbers follow electrons through molecules too. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
