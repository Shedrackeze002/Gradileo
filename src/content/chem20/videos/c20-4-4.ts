import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gives, mol, plus, row, stack, tag, water } from './lib/c20-4a-figures.ts';

// Hydrogen burning, as particles: two hydrogen molecules and one oxygen molecule make two water
// molecules, with each formula under its particles.
const burning = (() => {
  const r = row({ terms: [stack(mol('h2a', ['H', 'H']), mol('h2b', ['H', 'H'])), plus('p'), mol('o2', ['O', 'O']), gives('arr'), stack(water('w1'), water('w2'))] });
  return figure('r', [r, tag('f1', [r.mid.h2a, -1.45], '\\ce{2H2}', { place: 'below', tone: 'theta' }), tag('f2', [r.mid.o2, -1.45], '\\ce{O2}', { place: 'below', tone: 'theta' }), tag('f3', [r.mid.w1, -1.45], '\\ce{2H2O}', { place: 'below', tone: 'theta' })], 270);
})();

const video: Explainer = {
  id: 'c20-4-4',
  lessonId: 'c20-4-4',
  title: 'Mole Ratios and Gravimetric Stoichiometry, Part 1: Reading an Equation in Moles',
  thumbnailTitle: 'Reading an Equation in Moles',
  thumbnail: 'r',
  summary:
    'The coefficients of a balanced equation count particles, and so moles: in 2H₂ + O₂ → 2H₂O, 2 mol of hydrogen react with 1 mol of oxygen to make 2 mol of water. The masses, 4.04 g, 32.00 g and 36.04 g, obey the conservation of mass but are not in the ratio 2 : 1 : 2. A mole ratio is the ratio of two coefficients, and stoichiometry uses it to find the quantities in a reaction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Reading an Equation in Moles', subtitle: 'A balanced equation is a parts list' }],
      lines: [
        { say: 'A bicycle workshop needs exactly two wheels for every frame. To build fifty bicycles, it orders one hundred wheels and fifty frames: two to one by count, even though a frame weighs far more than a wheel.', show: 'title' },
        { say: 'A balanced equation is the same kind of parts list for a reaction, and chemists count its parts in moles.' },
        { say: 'This first part reads an equation in moles. Later parts use mole ratios, find the mass of one substance from the mass of another, and analyse a solution in the lab.' },
      ],
    },
    {
      chapter: 'Coefficients count moles',
      layout: 'center',
      main: [
        burning,
        {
          kind: 'table',
          id: 't',
          head: ['', 'hydrogen', 'oxygen', 'water'],
          rows: [
            ['Molecules', '$2$', '$1$', '$2$'],
            ['Moles', '$2\\ \\text{mol}$', '$1\\ \\text{mol}$', '$2\\ \\text{mol}$'],
            ['Mass', '$2(2.02) = 4.04\\ \\text{g}$', '$32.00\\ \\text{g}$', '$2(18.02) = 36.04\\ \\text{g}$'],
          ],
        },
      ],
      lines: [
        { say: 'The coefficients of a balanced equation count particles. Two hydrogen molecules react with one oxygen molecule, to make two water molecules.', caption: 'The coefficients of a balanced equation count particles. In 2H₂ + O₂ → 2H₂O, two hydrogen molecules react with one oxygen molecule, to make two water molecules.', show: ['r', 't.0'] },
        { say: 'Multiply every coefficient by Avogadro’s number, and the ratio stays the same. So the coefficients count moles as well: two moles of hydrogen react with one mole of oxygen, to make two moles of water.', show: 't.1', focus: 't.1' },
        { say: 'Now the masses. With hydrogen gas at two point zero two, oxygen at thirty-two point zero zero, and water at eighteen point zero two grams per mole, they are four point zero four, thirty-two point zero zero, and thirty-six point zero four grams.', caption: 'Now the masses. With H₂ at 2.02, O₂ at 32.00 and H₂O at 18.02 g/mol, they are 4.04 g, 32.00 g and 36.04 g.', show: 't.2', focus: 't.2' },
        { say: 'They obey the law of conservation of mass: four point zero four plus thirty-two point zero zero is thirty-six point zero four. But they are not in the ratio two to one to two. Only the amounts in moles follow the coefficients.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Stoichiometry and mole ratios',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'st', tone: 'definition', title: 'Stoichiometry', md: 'The calculation of the quantities of reactants and products in a chemical reaction, using the balanced equation.' },
        { kind: 'callout', id: 'mr', tone: 'definition', title: 'Mole ratio', md: 'The ratio of the coefficients of two substances in a balanced equation: the ratio of their amounts in moles.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2H2 + O2 -> 2H2O}\\text{:} \\quad n(\\ce{H2}) : n(\\ce{O2}) = 2 : 1'] },
      ],
      lines: [
        { say: 'Stoichiometry is the calculation of the quantities of reactants and products in a chemical reaction, using the balanced equation.', show: 'st' },
        { say: 'A mole ratio is the ratio of the coefficients of two substances in a balanced equation. It is the ratio of their amounts in moles.', show: 'mr' },
        { say: 'In hydrogen burning, the mole ratio of hydrogen to oxygen is two to one.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Coefficients are not grams',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\ \\text{mol} + 1\\ \\text{mol} \\to 2\\ \\text{mol} \\quad \\good{\\checkmark}', '2\\ \\text{g} + 1\\ \\text{g} \\to 2\\ \\text{g} \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Coefficients are not grams', md: 'A coefficient counts particles, and particles of different substances have different masses. To use a mole ratio, you need amounts in **moles**.' },
      ],
      lines: [
        { say: 'So the equation does not mean that two grams of hydrogen react with one gram of oxygen.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'A coefficient counts particles, and particles of different substances have different masses. To use a mole ratio, you need amounts in moles.', show: 'oops', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which statement about $\\ce{N2 + 3H2 -> 2NH3}$ is correct?',
          choices: [
            '$1\\ \\text{mol}$ of $\\ce{N2}$ reacts with $3\\ \\text{mol}$ of $\\ce{H2}$ to form $2\\ \\text{mol}$ of $\\ce{NH3}$.',
            '$1\\ \\text{g}$ of $\\ce{N2}$ reacts with $3\\ \\text{g}$ of $\\ce{H2}$ to form $2\\ \\text{g}$ of $\\ce{NH3}$.',
            'The mass of $\\ce{NH3}$ formed is twice the mass of $\\ce{N2}$ used.',
            'The mole ratio of $\\ce{H2}$ to $\\ce{NH3}$ is $2 : 3$.',
          ],
          answer: 0,
          working: 'The coefficients count moles, not grams: $1\\ \\text{mol}$ of $\\ce{N2}$, $3\\ \\text{mol}$ of $\\ce{H2}$ and $2\\ \\text{mol}$ of $\\ce{NH3}$. The mole ratio of $\\ce{H2}$ to $\\ce{NH3}$ is $3 : 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which statement about nitrogen and hydrogen forming ammonia is correct? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The coefficients count moles: one mole of nitrogen, three moles of hydrogen and two moles of ammonia. Choice B treats them as grams, and choice D turns the ratio upside down: hydrogen to ammonia is three to two.', show: 'q.answer' },
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
            'The coefficients of a balanced equation count particles, and so **moles**.',
            'A **mole ratio** is the ratio of two coefficients: $\\ce{H2}$ to $\\ce{O2}$ is $2 : 1$.',
            'Coefficients are **not** a ratio of masses.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The coefficients of a balanced equation count particles, and so they count moles.', show: 'sum.0' },
        { say: 'A mole ratio is the ratio of two coefficients. Hydrogen to oxygen is two to one.', show: 'sum.1' },
        { say: 'And coefficients are not a ratio of masses. In part two, you will use mole ratios to find the moles of one substance from another. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
