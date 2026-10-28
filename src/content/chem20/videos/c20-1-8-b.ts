import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cloud, link, model, tag } from './lib/c20-1b-figures.ts';

// Two chlorine molecules as electron clouds: spread evenly, then pushed to one side for an instant
// (δ+ and δ−), the first disturbing the second so that the two attract.
const clouds = figure(
  'm',
  [
    cloud({ name: 'a', at: [-2.4, 0], symbols: ['Cl', 'Cl'] }),
    cloud({ name: 'b', at: [2.4, 0], symbols: ['Cl', 'Cl'] }),
    tag({ id: 'attract', at: [0.45, -1.35], tex: '\\delta^-\\ \\text{attracts}\\ \\delta^+', tone: 'good' }),
  ],
  300,
);

// Hydrogen chloride molecules lined up so that the δ+ end of one is next to the δ− end of the
// next, with the attractions between them dashed.
const hcl = (name: string, h: [number, number], cl: [number, number], up: boolean) =>
  model({
    name,
    atoms: [
      { id: 'H', symbol: 'H', at: h },
      { id: 'Cl', symbol: 'Cl', at: cl },
    ],
    bonds: [{ from: 'H', to: 'Cl' }],
    charges: [
      { atom: 'H', sign: '+', place: up ? 'above' : 'below' },
      { atom: 'Cl', sign: '-', place: up ? 'above' : 'below' },
    ],
    group: 'mol',
  });
const dipoles = figure('m', [
  link({ id: 'f1', from: 'p-Cl', to: 'q-H' }),
  link({ id: 'f2', from: 'r-H', to: 's-Cl' }),
  link({ id: 'f3', from: 'p-H', to: 'r-Cl' }),
  link({ id: 'f4', from: 'q-Cl', to: 's-H' }),
  hcl('p', [-2.7, 1.1], [-1.2, 1.1], true),
  hcl('q', [0.6, 1.1], [2.1, 1.1], true),
  hcl('r', [-1.2, -1.1], [-2.7, -1.1], false),
  hcl('s', [2.1, -1.1], [0.6, -1.1], false),
]);

const video: Explainer = {
  id: 'c20-1-8-b',
  lessonId: 'c20-1-8',
  title: 'Intermolecular Forces, Part 2: London and Dipole–Dipole Forces',
  thumbnailTitle: 'London and Dipole–Dipole Forces',
  thumbnail: 'm',
  summary:
    'London dispersion forces come from short-lived dipoles as electrons move; they act between all molecules and are stronger when molecules have more electrons, so the halogens boil higher from F2 to I2. Dipole–dipole forces act between polar molecules on top of London forces, so HCl boils higher than F2, which has the same 18 electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'London and Dipole–Dipole Forces', subtitle: 'Flickering dipoles and permanent ones' }],
      lines: [
        { say: 'Chlorine is a gas at room temperature, but iodine is a solid. Both are made of non-polar molecules, so what holds iodine molecules together?', show: 'title' },
        { say: 'In this part, you will meet the force that acts between all molecules, and an extra force that acts between polar ones.' },
      ],
    },
    {
      chapter: 'Flickering dipoles',
      layout: 'center',
      main: [clouds, { kind: 'callout', id: 'def', tone: 'definition', title: 'London dispersion force', md: 'A weak attraction caused by short-lived dipoles as electrons move. It acts between **all** molecules, and is **stronger with more electrons**.' }],
      lines: [
        { say: 'The electrons in a molecule are always moving. On average, they are spread evenly.', show: ['m.a-atoms', 'm.a-even', 'm.b-atoms', 'm.b-even'] },
        { say: 'But at any instant, a few more of them may happen to be on one side than the other. That gives the molecule a tiny, short-lived dipole.', hide: 'm.a-even', show: ['m.a-shifted', 'm.a-charges'], focus: 'm.a-charges' },
        { say: 'That dipole disturbs the electrons of a neighbouring molecule, giving it a dipole too, and the two molecules attract.', hide: 'm.b-even', show: ['m.b-shifted', 'm.b-charges', 'm.attract'], focus: ['m.b-charges', 'm.attract'] },
        { say: 'These flickering attractions are called London dispersion forces, after the physicist Fritz London. They act between all molecules, polar or non-polar, and they are stronger when the molecules have more electrons.', show: 'def' },
      ],
    },
    {
      chapter: 'More electrons, stronger forces',
      layout: 'center',
      main: [
        { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'Electrons in a molecule: add up the atomic numbers of its atoms.' },
        {
          kind: 'table',
          id: 't',
          head: ['Molecule', 'Electrons', 'Boiling point', 'State at room temperature'],
          rows: [
            ['$\\ce{F2}$', '$2 \\times 9 = 18$', 'about $-188\\ ^\\circ\\text{C}$', 'gas'],
            ['$\\ce{Cl2}$', '$2 \\times 17 = 34$', 'about $-34\\ ^\\circ\\text{C}$', 'gas'],
            ['$\\ce{Br2}$', '$2 \\times 35 = 70$', 'about $59\\ ^\\circ\\text{C}$', 'liquid'],
            ['$\\ce{I2}$', '$2 \\times 53 = 106$', 'about $184\\ ^\\circ\\text{C}$', 'solid'],
          ],
        },
      ],
      lines: [
        { say: 'More electrons make a larger electron cloud that is more easily pushed out of shape, so the short-lived dipoles are bigger.' },
        { say: 'To count the electrons in a molecule, add up the atomic numbers of its atoms. The halogens show the pattern clearly.', show: 'note' },
        { say: 'Fluorine, with eighteen electrons, boils at about minus one hundred eighty-eight degrees Celsius, and chlorine, with thirty-four, at about minus thirty-four. Both are gases.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Bromine, with seventy, is a liquid that boils at about fifty-nine degrees. And iodine, with one hundred six, is a solid that boils at about one hundred eighty-four.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Dipole–dipole forces',
      layout: 'split',
      leftWidth: 560,
      left: [dipoles],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Dipole–dipole force', md: 'The attraction between the $\\delta+$ end of one polar molecule and the $\\delta-$ end of a neighbour. It acts only between **polar** molecules, on top of London forces.' }],
      lines: [
        { say: 'Polar molecules have permanent dipoles. Neighbouring polar molecules tend to line up so that the delta plus end of one is close to the delta minus end of the next, and these opposite charges attract.', caption: 'Polar molecules have permanent dipoles. Neighbouring polar molecules tend to line up so that the δ+ end of one is close to the δ− end of the next, and these opposite charges attract.', show: ['m.p-mol', 'm.q-mol', 'm.r-mol', 'm.s-mol', 'm.p-charges', 'm.q-charges', 'm.r-charges', 'm.s-charges', 'm.f1', 'm.f2', 'm.f3', 'm.f4'] },
        { say: 'This is a dipole–dipole force. It acts only between polar molecules, as an extra attraction, on top of the London forces that every molecule has.', show: 'def' },
      ],
    },
    {
      chapter: 'Same electrons, different polarity',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{HCl}\\text{: } 1 + 17 = 18 \\qquad \\ce{F2}\\text{: } 2 \\times 9 = 18', '\\ce{HCl}\\text{: polar, about } {-85}\\ ^\\circ\\text{C}', '\\ce{F2}\\text{: non-polar, about } {-188}\\ ^\\circ\\text{C}'],
        },
      ],
      lines: [
        { say: 'Hydrogen chloride and fluorine each have eighteen electrons, so their London forces are similar.', show: 'm.0', focus: 'm.0' },
        { say: 'But hydrogen chloride is made of two different atoms, so it is polar, with dipole–dipole forces as well. Fluorine has two identical atoms: London forces only.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So hydrogen chloride boils higher, at about minus eighty-five degrees Celsius, against about minus one hundred eighty-eight for fluorine.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which has the higher boiling point, propane, $\\ce{C3H8}$, or methane, $\\ce{CH4}$, and why? (Atomic numbers: H 1, C 6.)',
          choices: ['$\\ce{CH4}$: more electrons, so stronger London forces', '$\\ce{C3H8}$: its molecules form hydrogen bonds', '$\\ce{C3H8}$: more electrons, so stronger London forces', '$\\ce{CH4}$: its molecules form hydrogen bonds'],
          answer: 2,
          working: 'Both are non-polar, so only London forces act. $\\ce{C3H8}$ has $3 \\times 6 + 8 \\times 1 = 26$ electrons and $\\ce{CH4}$ has $6 + 4 \\times 1 = 10$. Propane boils at about $-42\\ ^\\circ\\text{C}$, methane at about $-162\\ ^\\circ\\text{C}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which has the higher boiling point, propane or methane, and why? Pause the video and try it.', caption: 'Your turn. Which has the higher boiling point, propane, C₃H₈, or methane, CH₄, and why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Propane has three times six plus eight: twenty-six electrons, against ten in methane, so its London forces are stronger. Neither forms hydrogen bonds, so choice B gives the wrong reason.', show: 'q.answer' },
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
            '**London dispersion forces** come from short-lived dipoles. They act between all molecules and are stronger with more electrons.',
            '**Dipole–dipole forces** act between polar molecules, on top of London forces.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. London dispersion forces come from short-lived dipoles. They act between all molecules, and are stronger with more electrons.', show: 'sum.0' },
        { say: 'Dipole–dipole forces act between polar molecules, on top of London forces. In part three, you will meet the strongest of the three: the hydrogen bond. See you there!', show: 'sum.1' },
      ],
    },
  ],
};

export default video;
