import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gives, mol, plus, row, stack, star, tag, water } from './lib/c20-4a-figures.ts';

// Methane burning, as balls: CH₄ + 2O₂ → CO₂ + 2H₂O, with room for the second O₂ and the second
// water molecule, which are shown as the equation is balanced. "reactants" and "products" under it.
const burning = () => {
  const r = row({ terms: [star('ch4', 'C', ['H', 'H', 'H', 'H']), plus('p1'), stack(mol('o2a', ['O', 'O']), mol('o2b', ['O', 'O'])), gives('arr'), mol('co2', ['O', 'C', 'O']), plus('p2'), stack(water('w1'), water('w2'))] });
  const arrowStart = r.mid.arr - 0.6;
  const arrowEnd = r.mid.arr + 0.6;
  return figure('r', [r, tag('lab-r', [arrowStart / 2, -1.55], '\\text{reactants}', { place: 'below', tone: 'theta' }), tag('lab-p', [(arrowEnd + r.end) / 2, -1.55], '\\text{products}', { place: 'below', tone: 'theta' })], 300);
};
const unbalanced = ['r.ch4', 'r.p1', 'r.o2a', 'r.arr', 'r.co2', 'r.p2', 'r.w1'];

const video: Explainer = {
  id: 'c20-4-1',
  lessonId: 'c20-4-1',
  title: 'Balancing Equations and Types of Reactions, Part 1: Coefficients and Balanced Equations',
  thumbnailTitle: 'Coefficients and Balanced Equations',
  thumbnail: 'r',
  summary:
    'A chemical equation shows reactants turning into products, and because atoms are never created or destroyed, a balanced equation has the same number of atoms of each element on both sides. Coefficients count molecules, so CH₄ + O₂ → CO₂ + H₂O balances to CH₄ + 2O₂ → CO₂ + 2H₂O. Change the coefficients, never the subscripts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Coefficients and Balanced Equations', subtitle: 'Atoms are never made or destroyed' }],
      lines: [
        { say: 'A gas stove burns methane in oxygen, giving off carbon dye-oxide and water vapour. Not a single atom is made or destroyed: the atoms only change partners.', caption: 'A gas stove burns methane in oxygen, giving off carbon dioxide and water vapour. Not a single atom is made or destroyed: the atoms only change partners.', show: 'title' },
        { say: 'In this lesson, you will balance equations and sort reactions into types. This first part shows what a balanced equation is. Later parts balance step by step, balance burning fuels, and name five types of reactions.' },
      ],
    },
    {
      chapter: 'Reactants and products',
      layout: 'center',
      main: [
        burning(),
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{CH4 + O2 -> CO2 + H2O}'] },
        { kind: 'callout', id: 'law', tone: 'key', title: 'Law of conservation of mass', md: 'Atoms are rearranged, never created or destroyed, so the total mass of the products equals the total mass of the reactants.' },
      ],
      lines: [
        { say: 'A chemical equation describes a chemical change with formulas. Methane burning is: C H four, plus O two, gives C O two, plus H two O.', caption: 'A chemical equation describes a chemical change with formulas. Methane burning is CH₄ + O₂ → CO₂ + H₂O.', show: [...unbalanced, 'eq'] },
        { say: 'The reactants, on the left of the arrow, are the substances that react. The products, on the right, are the new substances that form.', show: ['r.lab-r', 'r.lab-p'], focus: ['r.lab-r', 'r.lab-p'] },
        { say: 'Atoms are rearranged, but none are created or destroyed. So the mass of the products equals the mass of the reactants: the law of conservation of mass.', show: 'law', focus: 'r' },
        { say: 'An equation must show this: each element needs the same number of atoms on both sides.' },
      ],
    },
    {
      chapter: 'Coefficients',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'coef', tone: 'definition', title: 'Coefficient', md: 'The whole number **in front of** a formula. It counts the molecules or formula units of that substance; a coefficient of 1 is not written.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2H2O}\\text{:} \\quad 2 \\times 2 = 4\\ \\text{H}, \\quad 2 \\times 1 = 2\\ \\text{O}'] },
        { kind: 'callout', id: 'bal', tone: 'definition', title: 'Balanced equation', md: 'Each element has the **same number of atoms** on both sides, with the **smallest whole-number** coefficients that do this.' },
      ],
      lines: [
        { say: 'A coefficient is the whole number in front of a formula. It counts molecules or formula units, and a coefficient of one is not written.', show: 'coef' },
        { say: 'Two H two O means two water molecules: two times two, or four hydrogen atoms, and two oxygen atoms.', caption: '2H₂O means two water molecules: 2 × 2, or four hydrogen atoms, and two oxygen atoms.', show: 'm', focus: 'm' },
        { say: 'An equation is balanced when each element has the same number of atoms on both sides, with the smallest whole-number coefficients that do this.', show: 'bal' },
      ],
    },
    {
      chapter: 'Balancing methane',
      layout: 'center',
      main: [
        burning(),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{C: } 1 = 1 \\qquad \\text{H: } 4 \\ne \\bad{2} \\qquad \\text{O: } 2 \\ne \\bad{2 + 1 = 3}',
            '\\ce{CH4 + 2O2 -> CO2 + 2H2O}',
            '\\text{Check: C } 1 = 1, \\quad \\text{H } 4 = 4, \\quad \\text{O } 4 = 4',
          ],
        },
      ],
      lines: [
        { say: 'Count the atoms. Carbon: one on each side. Hydrogen: four on the left, but two on the right. Oxygen: two on the left, and three on the right.', show: [...unbalanced, 'm.0'], focus: 'm.0' },
        { say: 'A two in front of H two O makes two water molecules, with four hydrogen atoms, so hydrogen matches.', caption: 'A 2 in front of H₂O makes two water molecules, with four hydrogen atoms, so hydrogen matches.', show: 'r.w2', focus: ['r.w1', 'r.w2'] },
        { say: 'But the right side now has two plus two, or four oxygen atoms. A two in front of O two puts four on the left as well.', caption: 'But the right side now has 2 + 2, or four oxygen atoms. A 2 in front of O₂ puts four on the left as well.', show: 'r.o2b', focus: ['r.o2a', 'r.o2b'] },
        { say: 'The balanced equation is C H four, plus two O two, gives C O two, plus two H two O, with one carbon, four hydrogen and four oxygen atoms on each side.', caption: 'The balanced equation is CH₄ + 2O₂ → CO₂ + 2H₂O, with one carbon, four hydrogen and four oxygen atoms on each side.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Never change a subscript',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H2 + O2 -> H2O2} \\quad \\bad{\\times}', '\\ce{2H2 + O2 -> 2H2O} \\quad \\good{\\checkmark}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Change coefficients, never subscripts', md: 'The subscripts say what a substance is. $\\ce{H2O2}$ is hydrogen peroxide, not water, so only the coefficients may change.' },
      ],
      lines: [
        { say: 'To balance H two plus O two gives H two O, you might be tempted to write H two O two on the right.', caption: 'To balance H₂ + O₂ → H₂O, you might be tempted to write H₂O₂ on the right.', show: 'm.0', focus: 'm.0' },
        { say: 'But H two O two is hydrogen peroxide, a different substance. Subscripts say what a substance is, so they never change. Only the coefficients do.', caption: 'But H₂O₂ is hydrogen peroxide, a different substance. Subscripts say what a substance is, so they never change. Only the coefficients do.', show: 'oops' },
        { say: 'Instead, a two in front of the water, then a two in front of the hydrogen: two H two, plus O two, gives two H two O.', caption: 'Instead, a 2 in front of the water, then a 2 in front of the hydrogen: 2H₂ + O₂ → 2H₂O.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nitrogen and hydrogen react to form ammonia, $\\ce{NH3}$. Which is the balanced equation, with the smallest whole-number coefficients?',
          choices: ['$\\ce{N2 + H2 -> 2NH3}$', '$\\ce{N2 + 3H2 -> 2NH3}$', '$\\ce{N2 + 3H2 -> N2H6}$', '$\\ce{2N2 + 6H2 -> 4NH3}$'],
          answer: 1,
          working: 'N: $2 = 2$. H: $3 \\times 2 = 6$ on the left and $2 \\times 3 = 6$ on the right. $\\ce{N2H6}$ changes a subscript, and every coefficient in $\\ce{2N2 + 6H2 -> 4NH3}$ divides by 2.',
        },
      ],
      lines: [
        { say: 'Your turn. Nitrogen and hydrogen react to form ammonia, N H three. Which is the balanced equation, with the smallest whole-number coefficients? Pause the video and try it.', caption: 'Your turn. Nitrogen and hydrogen react to form ammonia, NH₃. Which is the balanced equation, with the smallest whole-number coefficients? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: two nitrogen atoms and six hydrogen atoms on each side. Choice C changes a subscript, and choice D is balanced, but every coefficient divides by two.', show: 'q.answer' },
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
            'Atoms are rearranged, never created or destroyed, so each element has the **same number of atoms** on both sides.',
            'A **coefficient** counts molecules or formula units: $\\ce{2H2O}$ holds 4 H and 2 O.',
            'Balance with coefficients, **never subscripts**, using the smallest whole numbers.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Atoms are never created or destroyed, so each element has the same number of atoms on both sides.', show: 'sum.0' },
        { say: 'A coefficient counts molecules or formula units, so two H two O holds four hydrogen atoms.', caption: 'A coefficient counts molecules or formula units, so 2H₂O holds four hydrogen atoms.', show: 'sum.1' },
        { say: 'And balance with coefficients, never subscripts. In part two, you will balance harder equations, step by step. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
