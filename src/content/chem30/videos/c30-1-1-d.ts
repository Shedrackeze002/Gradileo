import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { levels } from './lib/c30-1a-figures.ts';

// Hydrogen and chlorine: breaking the bonds climbs 679 kJ to separate atoms, forming the bonds of
// 2HCl falls 864 kJ, and the products end 185 kJ below the reactants (1 unit is about 128 kJ).
const steps = figure(
  'bonds',
  [
    levels({
      height: 10.4,
      lines: [
        { id: 'r', y: 3.9, from: 0.4, to: 3.0, tex: '\\ce{H2(g) + Cl2(g)}', at: [0.5, 3.8], place: 'below right' },
        { id: 'atoms', y: 9.19, from: 2.2, to: 8.0, tex: '\\ce{2H(g) + 2Cl(g)}', at: [2.6, 9.31] },
        { id: 'p', y: 2.46, from: 7.2, to: 10.0, tex: '\\ce{2HCl(g)}', at: [7.7, 2.58] },
        { id: 'rx', y: 3.9, from: 3.0, to: 7.0, dashed: true, tone: 'muted' },
        { id: 'px', y: 2.46, from: 6.6, to: 7.2, dashed: true, tone: 'muted' },
      ],
      steps: [
        { id: 'break', x: 2.6, from: 3.9, to: 9.19, tex: '\\begin{gathered}\\text{break}\\\\ +679\\ \\text{kJ}\\end{gathered}', at: [2.75, 7.9] },
        { id: 'form', x: 7.6, from: 9.19, to: 2.46, tex: '\\begin{gathered}\\text{form}\\\\ -864\\ \\text{kJ}\\end{gathered}', at: [7.45, 5.6], place: 'left' },
        { id: 'dh', x: 6.8, from: 3.9, to: 2.46, tex: '\\Delta H = -185\\ \\text{kJ}', at: [6.8, 2.3], place: 'below', tone: 'good' },
      ],
    }),
  ],
);

const video: Explainer = {
  id: 'c30-1-1-d',
  lessonId: 'c30-1-1',
  title: 'Energy in Chemical Systems, Part 4: Bonds Broken and Bonds Formed',
  thumbnailTitle: 'Bonds Broken and Bonds Formed',
  thumbnail: 'bonds',
  summary:
    'Breaking a bond absorbs energy and forming a bond releases it, so ΔH = energy absorbed breaking bonds − energy released forming bonds. With average bond energies, H₂ + Cl₂ → 2HCl gives 679 − 864 = −185 kJ, and N₂ + 3H₂ → 2NH₃ gives 2253 − 2346 = −93 kJ: both exothermic. A fuel releases energy because the bonds of its products are stronger, not because its own bonds break.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Bonds Broken and Bonds Formed', subtitle: 'Where the energy of a reaction comes from' }],
      lines: [
        { say: 'Why do some reactions release energy, while others absorb it? The answer lies in the chemical bonds.', show: 'title' },
        { say: 'In this part, you will explain energy changes with the bonds that break and form, and estimate delta H from bond energies.', caption: 'In this part, you will explain energy changes with the bonds that break and form, and estimate ΔH from bond energies.' },
      ],
    },
    {
      chapter: 'Breaking and forming',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Breaking a bond absorbs energy**: the atoms are pulled apart against their attraction.', '**Forming a bond releases energy**: the atoms pull together.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\begin{aligned} \\Delta H = {} & \\text{energy absorbed breaking bonds} \\\\ & - \\text{energy released forming bonds} \\end{aligned}'] },
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'More released than absorbed: $\\Delta H$ negative, **exothermic**. More absorbed than released: $\\Delta H$ positive, **endothermic**.' },
      ],
      lines: [
        { say: 'A reaction breaks the bonds of the reactants and forms the bonds of the products. Breaking a bond absorbs energy: the atoms are pulled apart, against their attraction.', show: 'b.0' },
        { say: 'Forming a bond releases energy: the atoms pull together.', show: 'b.1' },
        { say: 'The enthalpy change is the balance of the two. Delta H equals the energy absorbed breaking bonds, minus the energy released forming bonds.', caption: 'The enthalpy change is the balance of the two. ΔH equals the energy absorbed breaking bonds, minus the energy released forming bonds.', show: 'm' },
        {
          say: 'If forming the new bonds releases more, delta H is negative: exothermic. If breaking the old bonds absorbs more, delta H is positive: endothermic.',
          caption: 'If forming the new bonds releases more, ΔH is negative: exothermic. If breaking the old bonds absorbs more, ΔH is positive: endothermic.',
          show: 't',
        },
      ],
    },
    {
      chapter: 'Hydrogen and chlorine',
      layout: 'split',
      left: [steps],
      right: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'Bond energies: $\\ce{H-H}$ $436$, $\\ce{Cl-Cl}$ $243$ and $\\ce{H-Cl}$ $432\\ \\text{kJ/mol}$. Estimate $\\Delta_r H$ for $\\ce{H2(g) + Cl2(g) -> 2HCl(g)}$.',
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{broken: } 436 + 243 = 679\\ \\text{kJ}', '\\text{formed: } 2(432) = 864\\ \\text{kJ}', '\\Delta_r H = 679 - 864 = -185\\ \\text{kJ}'] },
      ],
      lines: [
        {
          say: 'The bond energy is the energy needed to break one mole of a particular bond. Tables give average values, like these for hydrogen, chlorine and hydrogen chloride.',
          caption: 'The bond energy is the energy needed to break one mole of a particular bond. Tables give average values: 436 kJ/mol for H–H, 243 kJ/mol for Cl–Cl and 432 kJ/mol for H–Cl.',
          show: 'q',
        },
        {
          say: 'Estimate delta r H for hydrogen and chlorine reacting to form two moles of hydrogen chloride.',
          caption: 'Estimate ΔrH for H₂(g) + Cl₂(g) → 2HCl(g).',
          show: ['bonds.axis', 'bonds.r'],
        },
        {
          say: 'First, the bonds broken: one hydrogen–hydrogen bond and one chlorine–chlorine bond. That absorbs four hundred thirty-six plus two hundred forty-three, or six hundred seventy-nine kilojoules.',
          show: ['m.0', 'bonds.break', 'bonds.atoms'],
          focus: 'bonds.break',
        },
        { say: 'On the diagram, that is a climb up to separate atoms.', focus: 'bonds.atoms' },
        {
          say: 'Next, the bonds formed: two hydrogen–chlorine bonds. That releases two times four hundred thirty-two, or eight hundred sixty-four kilojoules.',
          show: ['m.1', 'bonds.form', 'bonds.p'],
          focus: 'bonds.form',
        },
        {
          say: 'So delta r H equals six hundred seventy-nine minus eight hundred sixty-four: negative one hundred eighty-five kilojoules. More is released than absorbed: exothermic.',
          caption: 'So ΔrH = 679 − 864 = −185 kJ. More is released than absorbed: exothermic.',
          show: ['m.2', 'bonds.rx', 'bonds.px', 'bonds.dh'],
          focus: 'bonds.dh',
        },
        {
          say: 'Bond energies are averages, so this is an estimate. The measured value, negative one hundred eighty-four point six kilojoules, is very close.',
          caption: 'Bond energies are averages, so this is an estimate. The measured value, ΔrH = −184.6 kJ, is very close.',
        },
      ],
    },
    {
      chapter: 'Making ammonia',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'Bond energies: $\\ce{N#N}$ $945$, $\\ce{H-H}$ $436$ and $\\ce{N-H}$ $391\\ \\text{kJ/mol}$. Estimate $\\Delta_r H$ for $\\ce{N2(g) + 3H2(g) -> 2NH3(g)}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{broken: } 945 + 3(436) = 2253\\ \\text{kJ}', '\\text{formed: } 2 \\times 3 = 6\\ \\ce{N-H} \\text{ bonds: } 6(391) = 2346\\ \\text{kJ}', '\\Delta_r H = 2253 - 2346 = -93\\ \\text{kJ}'],
        },
      ],
      lines: [
        { say: 'Now the reaction that makes ammonia: nitrogen and three moles of hydrogen form two moles of ammonia.', caption: 'Now the reaction that makes ammonia: N₂(g) + 3H₂(g) → 2NH₃(g).', show: 'q' },
        {
          say: 'Bonds broken: one nitrogen–nitrogen triple bond, at nine hundred forty-five, and three hydrogen–hydrogen bonds. That is two thousand two hundred fifty-three kilojoules absorbed.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'Bonds formed: each ammonia molecule has three nitrogen–hydrogen bonds, so two molecules have six. Six times three hundred ninety-one is two thousand three hundred forty-six kilojoules released.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'So delta r H is about negative ninety-three kilojoules. The reaction is exothermic.', caption: 'So ΔrH ≈ −93 kJ. The reaction is exothermic.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Breaking bonds never releases energy',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'mis',
          tone: 'mistake',
          title: 'Breaking bonds never releases energy',
          md: 'A fuel does not release "the energy stored in its bonds" as they break: breaking any bond **absorbs** energy. A fuel releases energy because the bonds of its products, carbon dioxide and water, are **stronger** than the bonds broken in the fuel and oxygen.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: saying that a fuel releases the energy stored in its bonds as they break.', show: 'mis' },
        { say: 'But breaking any bond absorbs energy. A fuel releases energy because the bonds of its products, carbon dioxide and water, are stronger: forming them releases more energy than breaking the old bonds took.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use the bond energies $\\ce{H-H}$ $436$, $\\ce{Br-Br}$ $193$ and $\\ce{H-Br}$ $366\\ \\text{kJ/mol}$ to estimate $\\Delta_r H$ for $\\ce{H2(g) + Br2(g) -> 2HBr(g)}$.',
          choices: ['$+103\\ \\text{kJ}$', '$+263\\ \\text{kJ}$', '$-103\\ \\text{kJ}$', '$-732\\ \\text{kJ}$'],
          answer: 2,
          working: 'Bonds broken: $436 + 193 = 629\\ \\text{kJ}$. Bonds formed: $2(366) = 732\\ \\text{kJ}$. $\\Delta_r H = 629 - 732 = -103\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Use the bond energies on the screen to estimate delta r H for hydrogen and bromine forming hydrogen bromide. Pause the video and try it.',
          caption: 'Your turn. Use the bond energies on the screen to estimate ΔrH for H₂(g) + Br₂(g) → 2HBr(g). Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C. Breaking the bonds absorbs four hundred thirty-six plus one hundred ninety-three, or six hundred twenty-nine kilojoules. Forming two hydrogen–bromine bonds releases seven hundred thirty-two. Choice B forgets that two molecules form.',
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
            'Breaking bonds **absorbs** energy; forming bonds **releases** energy.',
            '$\\Delta H$ = energy absorbed breaking bonds − energy released forming bonds.',
            'Count the bonds with the coefficients: for $\\ce{H2 + Cl2 -> 2HCl}$, $679 - 864 = -185\\ \\text{kJ}$.',
            'Bond energies are averages, so the result is an estimate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Breaking bonds absorbs energy, and forming bonds releases energy.', show: 'sum.0' },
        { say: 'Delta H is the energy absorbed breaking bonds, minus the energy released forming bonds.', caption: 'ΔH is the energy absorbed breaking bonds, minus the energy released forming bonds.', show: 'sum.1' },
        { say: 'Count the bonds using the coefficients, as for hydrogen and chlorine.', show: 'sum.2' },
        { say: 'And bond energies are averages, so the result is an estimate. That completes this lesson. Next, you will measure energy changes with a calorimeter.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
