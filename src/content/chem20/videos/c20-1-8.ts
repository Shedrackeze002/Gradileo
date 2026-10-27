import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { link, pointer, tag, water } from './lib/c20-1b-figures.ts';

// Three water molecules: covalent bonds inside each, and dashed attractions between them.
const between = figure('m', [
  link({ id: 'f1', from: 'w1-H1', to: 'w2-O' }),
  link({ id: 'f2', from: 'w1-H2', to: 'w3-O' }),
  water({ name: 'w1', at: [0, 1.2], group: 'mol' }),
  water({ name: 'w2', at: [-2.1, -1.5], turn: -40, group: 'mol' }),
  water({ name: 'w3', at: [2.1, -1.5], turn: 40, group: 'mol' }),
  pointer({ id: 'intra', from: [-0.6, 0.8], to: [-2.3, 2.3], tex: '\\begin{gathered}\\text{covalent bond}\\\\ \\text{(intramolecular)}\\end{gathered}', place: 'above' }),
  pointer({ id: 'inter', from: [1.55, -0.6], to: [2.6, 1.3], tex: '\\begin{gathered}\\text{intermolecular}\\\\ \\text{force}\\end{gathered}', place: 'above', tone: 'good' }),
]);

// Steam: the same molecules, far apart, each still whole.
const steam = figure('m', [
  water({ name: 's1', at: [0, 1.8], turn: 15, group: 'mol' }),
  water({ name: 's2', at: [-2.6, -0.5], turn: -40, group: 'mol' }),
  water({ name: 's3', at: [2.5, -0.3], turn: 60, group: 'mol' }),
  tag({ id: 'name', at: [0, -3.1], tex: '\\text{steam: whole } \\ce{H2O} \\text{ molecules}', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'c20-1-8',
  lessonId: 'c20-1-8',
  title: 'Intermolecular Forces, Part 1: Forces Between Molecules',
  thumbnailTitle: 'Forces Between Molecules',
  thumbnail: 'm',
  summary:
    'Intramolecular bonds are the covalent bonds inside a molecule; intermolecular forces are the much weaker attractions between molecules. Boiling overcomes only the intermolecular forces, so steam is still made of whole H2O molecules, and the stronger the forces, the higher the boiling point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Forces Between Molecules', subtitle: 'What boiling really overcomes' }],
      lines: [
        { say: 'At room temperature, methane is a gas: it boils at about minus one hundred sixty-two degrees Celsius. Water is a liquid that boils at one hundred degrees.', caption: 'At room temperature, methane is a gas: it boils at about −162 °C. Water is a liquid that boils at 100 °C.', show: 'title' },
        { say: 'Yet the two molecules are about the same size, and each has ten electrons. Why do water molecules cling to each other so much more tightly?' },
        { say: 'The answer lies in the attractions between molecules. This first part separates them from the bonds inside molecules. Then you will meet London dispersion forces, dipole–dipole forces and hydrogen bonds, and compare boiling points.' },
      ],
    },
    {
      chapter: 'Inside and between',
      layout: 'split',
      leftWidth: 580,
      left: [between],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Intramolecular** bonds: the covalent bonds that hold the atoms together *inside* each molecule.', '**Intermolecular forces**: attractions that act *between* neighbouring molecules.'],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Intermolecular force', md: 'An attraction between neighbouring molecules, much weaker than the covalent bonds inside them.' },
      ],
      lines: [
        { say: 'Two different kinds of attraction hold a molecular substance together.', show: ['m.w1-mol', 'm.w2-mol', 'm.w3-mol'] },
        { say: 'Intramolecular bonds are the covalent bonds that hold the atoms together inside each molecule.', show: ['m.intra', 'b.0'], focus: ['m.intra', 'b.0'] },
        { say: 'Intermolecular forces are attractions that act between neighbouring molecules.', show: ['m.f1', 'm.f2', 'm.inter', 'b.1'], focus: ['m.f1', 'm.f2', 'b.1'] },
        { say: 'An intermolecular force is much weaker than the covalent bonds inside the molecules.', show: 'def' },
      ],
    },
    {
      chapter: 'What boiling overcomes',
      layout: 'split',
      leftWidth: 580,
      left: [steam],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Boiling does not break molecules apart', md: 'When water boils, its molecules do **not** split into hydrogen and oxygen. Only the attractions *between* the molecules are overcome.' },
      ],
      lines: [
        { say: 'When water boils, its molecules move apart from one another, but each molecule stays whole. Steam is still made of H two O molecules.', caption: 'When water boils, its molecules move apart from one another, but each molecule stays whole. Steam is still made of H₂O molecules.', show: 'm' },
        { say: 'Boiling overcomes only the intermolecular forces. Breaking all the oxygen–hydrogen bonds in some water would take more than twenty times as much energy as boiling it.' },
        { say: 'So when water boils, its molecules do not split into hydrogen and oxygen. Only the attractions between the molecules are overcome. The bonds inside them stay as they were.', show: 'oops' },
      ],
    },
    {
      chapter: 'Boiling point',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Boiling point', md: 'The temperature at which bubbles of a liquid’s gas form throughout the liquid. **Stronger** intermolecular forces mean a **higher** boiling point.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{CH4}\\text{: about } {-162}\\ ^\\circ\\text{C} \\qquad \\ce{H2O}\\text{: } 100\\ ^\\circ\\text{C}'] },
        { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'Boiling points in this lesson are for normal air pressure.' },
      ],
      lines: [
        { say: 'The boiling point of a liquid is the temperature at which bubbles of its gas form throughout the liquid.', show: 'def' },
        { say: 'The stronger the intermolecular forces, the more energy the molecules need to escape from one another, so the higher the boiling point.' },
        { say: 'So the forces between water molecules must be much stronger than those between methane molecules. The boiling points in this lesson are all for normal air pressure.', show: ['m', 'note'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'When liquid bromine, $\\ce{Br2}$, boils, what is overcome?',
          choices: ['The covalent bonds inside the $\\ce{Br2}$ molecules', 'Both the bonds inside the molecules and the forces between them', 'The ionic bonds between bromide ions', 'The intermolecular forces between $\\ce{Br2}$ molecules'],
          answer: 3,
          working: 'Boiling moves the molecules apart, but each $\\ce{Br2}$ molecule stays whole: bromine gas is still made of $\\ce{Br2}$ molecules. Only the intermolecular forces are overcome.',
        },
      ],
      lines: [
        { say: 'Your turn. When liquid bromine boils, what is overcome? Pause the video and try it.', caption: 'Your turn. When liquid bromine, Br₂, boils, what is overcome? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: the intermolecular forces between the bromine molecules. The molecules move apart, but each one stays whole. Choice A, breaking the bonds inside the molecules, is the common mistake.', show: 'q.answer' },
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
            '**Intramolecular** bonds hold atoms together inside a molecule; **intermolecular forces** act between molecules and are much weaker.',
            'Boiling overcomes only the intermolecular forces: the molecules stay whole.',
            'Stronger intermolecular forces mean a **higher boiling point**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Intramolecular bonds hold the atoms together inside a molecule. Intermolecular forces act between molecules, and are much weaker.', show: 'sum.0' },
        { say: 'Boiling overcomes only the intermolecular forces, so the molecules stay whole.', show: 'sum.1' },
        { say: 'And the stronger the forces, the higher the boiling point. In part two, you will meet the first two of these forces. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
