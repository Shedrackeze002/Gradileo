import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { bracket, tag } from './lib/c10-3-figures.ts';

// A potassium atom, 2,8,8,1, whose outer shell is taken away to leave the potassium ion.
const potassium = figure(
  'k',
  [
    atomShells({ at: [0, 0], nucleus: '19\\text{p}^{+}', shells: [2, 8, 8, 1], r: 1.7, gap: 1 }),
    bracket({ c: [0, 0], half: [5.0, 5.0], charge: '+' }),
    tag('name', [0, -6.4], '\\text{potassium atom: 2,8,8,1}'),
    tag('ion-name', [0, -6.4], '\\text{potassium ion: 2,8,8}'),
  ],
  520,
);

const video: Explainer = {
  id: 'c10-3-1-c',
  lessonId: 'c10-3-1',
  title: 'Ions, Part 3: Writing and Naming Ions',
  thumbnailTitle: 'Writing and Naming Ions',
  thumbnail: 'k',
  summary:
    'Write an ion’s charge at the top right of its symbol, number first and then the sign: Ca2+, N3-, and K+ for a charge of 1. A positive ion keeps its element’s name (the sodium ion); a negative ion ends in -ide (chloride, oxide, sulfide, nitride, phosphide). From the atomic number, potassium is 2,8,8,1, so it loses one electron to form K+.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 3', title: 'Writing and Naming Ions', subtitle: 'Symbols, charges and names' }],
      lines: [
        { say: 'A magnesium atom loses two electrons, and an oxygen atom gains two. But how do you write those ions, and what are they called?', show: 'title' },
        { say: 'In this part, you will write the symbol of an ion with its charge, name the ion, and find the ion an element forms from its atomic number alone.' },
      ],
    },
    {
      chapter: 'Writing the charge',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Ca^2+} \\qquad \\text{a charge of } 2{+}', '\\ce{N^3-} \\qquad \\text{a charge of } 3{-}', '\\ce{K+} \\qquad \\text{a charge of } 1{+}, \\text{ not } \\ce{K^1+}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign goes after the number', md: 'Write $\\ce{Mg^2+}$, not "Mg+2" or "Mg2". A positive ion has **lost** electrons; it has not gained protons.' },
      ],
      lines: [
        { say: 'Write the charge at the top right of the symbol: the number first, then the sign. C A two plus, the calcium ion, has a charge of two plus.', caption: 'Write the charge at the top right of the symbol: the number first, then the sign. Ca²⁺, the calcium ion, has a charge of 2+.', show: 'm.0', focus: 'm.0' },
        { say: 'N three minus, the nitride ion, has a charge of three minus.', caption: 'N³⁻, the nitride ion, has a charge of 3−.', show: 'm.1', focus: 'm.1' },
        { say: 'A charge of one is written with the sign alone. The potassium ion is K plus, not K one plus.', caption: 'A charge of one is written with the sign alone. The potassium ion is K⁺, not K¹⁺.', show: 'm.2', focus: 'm.2' },
        { say: 'Write M G two plus, not M G plus two, and never leave out the sign. The number says how many charges, and the sign says which kind.', caption: 'Write Mg²⁺, not Mg+2, and never leave out the sign. The number says how many charges, and the sign says which kind.', show: 'oops', focus: 'm' },
        { say: 'And remember how the charge arose. A positive ion has lost electrons. It has not gained protons.' },
      ],
    },
    {
      chapter: 'Naming ions',
      layout: 'split',
      leftWidth: 520,
      left: [
        { kind: 'callout', id: 'pos', tone: 'key', title: 'Positive ions', md: 'keep the name of the element: $\\ce{Na+}$ is the **sodium** ion, $\\ce{Al^3+}$ the **aluminium** ion (aluminum in North America).' },
        { kind: 'callout', id: 'neg', tone: 'key', title: 'Negative ions', md: 'change the end of the element’s name to **-ide**.' },
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Ion', 'Symbol'],
          rows: [
            ['chlorine', 'chloride', '$\\ce{Cl-}$'],
            ['oxygen', 'oxide', '$\\ce{O^2-}$'],
            ['sulfur', 'sulfide', '$\\ce{S^2-}$'],
            ['nitrogen', 'nitride', '$\\ce{N^3-}$'],
            ['phosphorus', 'phosphide', '$\\ce{P^3-}$'],
          ],
        },
      ],
      lines: [
        { say: 'Names follow two simple rules. A positive ion keeps the name of its element. N A plus is the sodium ion, and A L three plus is the aluminium ion.', caption: 'Names follow two simple rules. A positive ion keeps the name of its element. Na⁺ is the sodium ion, and Al³⁺ is the aluminium ion.', show: 'pos' },
        { say: 'A negative ion changes the ending of the element’s name. Chlorine becomes chloride, and oxygen becomes oxide.', show: ['neg', 't.0', 't.1'] },
        { say: 'Sulfur becomes sulfide, nitrogen becomes nitride, and phosphorus becomes phosphide.', show: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'From the atomic number',
      layout: 'split',
      leftWidth: 520,
      left: [potassium],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['19\\text{ electrons: 2,8,8,1}', '\\text{1 outer electron: a metal}', '\\text{loses 1, leaving 2,8,8}', '\\ce{K+}, \\text{ the potassium ion}'] }],
      lines: [
        { say: 'You can also find the ion from the atomic number alone. Potassium has atomic number nineteen.', show: ['k.nucleus', 'k.name'] },
        { say: 'Nineteen electrons fill the shells as two, eight, eight, one.', show: ['k.shell-1', 'k.shell-2', 'k.shell-3', 'k.shell-4', 'm.0'], focus: 'm.0' },
        { say: 'One outer electron means potassium is a metal in group one, so the atom loses that electron.', show: 'm.1', focus: ['m.1', 'k.shell-4'] },
        { say: 'It is left with two, eight, eight, a full outer shell like argon, and a charge of one plus.', hide: ['k.shell-4', 'k.name'], show: ['m.2', 'k.bracket', 'k.ion-name'], focus: ['m.2', 'k.shell-3'] },
        { say: 'So potassium forms K plus, the potassium ion.', caption: 'So potassium forms K⁺, the potassium ion.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nitrogen has atomic number $7$. Which ion does it form, and what is the ion called?',
          choices: ['$\\ce{N^3-}$, the nitride ion', '$\\ce{N^3-}$, the nitrogen ion', '$\\ce{N^5+}$, the nitrogen ion', '$\\ce{N^3+}$, the nitride ion'],
          answer: 0,
          working: '$7$ electrons: 2,5. A non-metal gains $8 - 5 = 3$ electrons, so the charge is 3−, and a negative ion ends in -ide: $\\ce{N^3-}$, the nitride ion.',
        },
      ],
      lines: [
        { say: 'Your turn. Nitrogen has atomic number seven. Which ion does it form, and what is the ion called? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Seven electrons are arranged two, five, so nitrogen is a non-metal that gains three electrons, a charge of three minus. A negative ion changes its ending, so it is the nitride ion. Choice B has the right symbol but the wrong name.', show: 'q.answer' },
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
            'Write the charge at the top right, number then sign: $\\ce{Mg^2+}$, $\\ce{N^3-}$. A charge of 1 is the sign alone: $\\ce{K+}$.',
            'A positive ion keeps the name of its element: the sodium ion.',
            'A negative ion ends in **-ide**: chloride, oxide, sulfide, nitride, phosphide.',
            'From the atomic number: write the arrangement, find the outer electrons, then decide whether the atom loses or gains.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write the charge at the top right of the symbol, the number and then the sign. A charge of one is just the sign.', show: 'sum.0' },
        { say: 'A positive ion keeps the name of its element, like the sodium ion.', show: 'sum.1' },
        { say: 'A negative ion changes its ending: chloride, oxide, sulfide, nitride and phosphide.', show: 'sum.2' },
        { say: 'And from the atomic number, write the arrangement, find the outer electrons, and decide whether the atom loses or gains. In part four, you will count the electrons in an ion. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
