import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, mol, plus, row, stack, water } from './lib/c10-4-figures.ts';

// Hydrogen burning: two hydrogen molecules and one oxygen molecule become two water molecules.
const burn = row({ terms: [stack(mol('h1', ['H', 'H']), mol('h2', ['H', 'H'])), plus('p'), mol('o2', ['O', 'O']), arrow('arr'), stack(water('w1'), water('w2'))] });

const video: Explainer = {
  id: 'c10-4-1-c',
  lessonId: 'c10-4-1',
  title: 'Word Equations and Conservation of Mass, Part 3: The Law of Conservation of Mass',
  thumbnailTitle: 'Conservation of Mass',
  thumbnail: 'h',
  summary:
    'In a reaction the atoms are only rearranged, so the total mass of the products equals the total mass of the reactants. Use it to find a missing product or reactant, and remember that a reactant left over in excess is not part of the product.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 3', title: 'Conservation of Mass', subtitle: 'Finding a missing mass' }],
      lines: [
        { say: 'Burn hydrogen in oxygen, and all you see is a flash and a few drops of water. Yet if you weigh everything in a sealed container, before and after, the total does not change.', show: 'title' },
        { say: 'In this part, you will see why mass is conserved, and use it to find a missing mass, even when one reactant is left over.' },
      ],
    },
    {
      chapter: 'Atoms are rearranged',
      layout: 'split',
      leftWidth: 640,
      left: [figure('h', [burn], 360)],
      right: [{ kind: 'table', id: 't', head: ['Atoms', 'Before', 'After'], rows: [['hydrogen', '$4$', '$4$'], ['oxygen', '$2$', '$2$']] }],
      lines: [
        { say: 'When hydrogen burns, two hydrogen molecules and one oxygen molecule become two water molecules.', show: ['h.h1', 'h.h2', 'h.p', 'h.o2', 'h.arr', 'h.w1', 'h.w2'] },
        { say: 'Count the hydrogen atoms: four before the reaction, and four after.', show: 't.0', focus: ['t.0', 'h.h1', 'h.h2'] },
        { say: 'Count the oxygen atoms: two before, and two after.', show: 't.1', focus: ['t.1', 'h.o2'] },
        { say: 'In a reaction, the atoms of the reactants are only rearranged. Since the atoms are the same, so is their total mass.', focus: ['h.w1', 'h.w2'] },
      ],
    },
    {
      chapter: 'The law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'definition', title: 'Law of conservation of mass', md: 'In a chemical reaction, mass is neither created nor destroyed. The total mass of the products equals the total mass of the reactants.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{total mass of reactants} = \\text{total mass of products}'] },
      ],
      lines: [
        { say: 'This is the law of conservation of mass. In a chemical reaction, mass is neither created nor destroyed.', show: 'law' },
        { say: 'The total mass of the reactants equals the total mass of the products. If you know every mass but one, you can find the missing one.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A missing mass',
      layout: 'split',
      leftWidth: 544,
      left: [
        { kind: 'text', id: 'q1', size: 'md', md: 'In a sealed tube, $5.60\\ \\text{g}$ of iron and $3.21\\ \\text{g}$ of sulfur react completely, forming iron(II) sulfide. What mass forms?' },
        { kind: 'math', id: 'm1', size: 'md', lines: ['5.60 + 3.21 = m', 'm = 8.81\\ \\text{g}'] },
      ],
      right: [
        { kind: 'text', id: 'q2', size: 'md', md: 'Calcium carbonate is heated in a closed container until it has all broken down into $2.80\\ \\text{g}$ of calcium oxide and $2.20\\ \\text{g}$ of carbon dioxide. What mass was heated?' },
        { kind: 'math', id: 'm2', size: 'md', lines: ['m = 2.80 + 2.20', 'm = 5.00\\ \\text{g}'] },
      ],
      lines: [
        { say: 'In a sealed tube, 5.60 grams of iron and 3.21 grams of sulfur are heated and react completely, forming iron two sulfide. What mass of iron two sulfide forms?', caption: 'In a sealed tube, 5.60 grams of iron and 3.21 grams of sulfur are heated and react completely, forming iron(II) sulfide. What mass of iron(II) sulfide forms?', show: 'q1' },
        { say: 'Mass of reactants equals mass of products, so 5.60 plus 3.21 equals m: 8.81 grams of iron two sulfide.', caption: 'Mass of reactants equals mass of products, so 5.60 plus 3.21 equals m: 8.81 grams of iron(II) sulfide.', show: ['m1.0', 'm1.1'], focus: 'm1.1' },
        { say: 'It works the other way too. Calcium carbonate is heated in a closed container until it has all broken down into 2.80 grams of calcium oxide and 2.20 grams of carbon dioxide.', show: 'q2' },
        { say: 'Now the reactant is missing. Its mass is the total of the products: 2.80 plus 2.20, or 5.00 grams of calcium carbonate.', show: ['m2.0', 'm2.1'], focus: 'm2.1' },
      ],
    },
    {
      chapter: 'One reactant left over',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'In a sealed flask, $2.40\\ \\text{g}$ of magnesium burns in $2.00\\ \\text{g}$ of oxygen until all of the magnesium is used up. $0.42\\ \\text{g}$ of oxygen is left over. What mass of magnesium oxide forms?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{oxygen that reacted: } 2.00 - 0.42 = 1.58\\ \\text{g}', '\\text{magnesium oxide: } 2.40 + 1.58 = 3.98\\ \\text{g}'] },
      ],
      lines: [
        { say: 'The law counts only what actually reacts. If one reactant is in excess, some of it is left over at the end, and that part is not in the product.' },
        { say: 'In a sealed flask, 2.40 grams of magnesium burns in 2.00 grams of oxygen until all of the magnesium is used up. 0.42 grams of oxygen is left over.', show: 'q' },
        { say: 'First, find the oxygen that reacted: 2.00 minus 0.42 is 1.58 grams.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the masses that reacted: 2.40 plus 1.58 is 3.98 grams of magnesium oxide.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a stoppered flask, silver nitrate and $1.17\\ \\text{g}$ of sodium chloride react completely, forming $2.87\\ \\text{g}$ of silver chloride and $1.70\\ \\text{g}$ of sodium nitrate. What mass of silver nitrate reacted?',
          choices: ['$5.74\\ \\text{g}$', '$1.70\\ \\text{g}$', '$4.57\\ \\text{g}$', '$3.40\\ \\text{g}$'],
          answer: 3,
          working: '$m + 1.17 = 2.87 + 1.70 = 4.57$, so $m = 4.57 - 1.17 = 3.40\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a stoppered flask, silver nitrate and 1.17 grams of sodium chloride react completely, forming 2.87 grams of silver chloride and 1.70 grams of sodium nitrate. What mass of silver nitrate reacted? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 3.40 grams. The products total 4.57 grams, so the reactants do too, and 4.57 minus 1.17 is 3.40. Choice C, 4.57 grams, is both reactants together.', show: 'q.answer' },
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
            'In a reaction, atoms are only rearranged, so mass is conserved.',
            'Total mass of reactants $=$ total mass of products: use it to find a missing mass.',
            'A reactant left over in **excess** is not part of the product.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a reaction, the atoms are only rearranged, so mass is conserved.', show: 'sum.0' },
        { say: 'The total mass of the reactants equals the total mass of the products, so you can find a missing mass.', show: 'sum.1' },
        { say: 'Count only what reacts: a reactant left over in excess is not part of the product. In part four, you will see what happens in an open container. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
