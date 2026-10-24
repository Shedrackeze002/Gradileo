import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, labels, mol, plus, row, stack } from './lib/c10-4-figures.ts';

// Magnesium burning: two magnesium atoms and an oxygen molecule become two units of magnesium oxide.
const burn = row({ terms: [stack(mol('mg1', ['Mg']), mol('mg2', ['Mg'])), plus('p'), mol('o2', ['O', 'O']), arrow('arr'), stack(mol('mgo1', ['Mg', 'O']), mol('mgo2', ['Mg', 'O']))] });
const burnLabels = labels([
  { id: 'reactants', at: [(burn.mid.mg1 + burn.mid.o2) / 2, -1.3], tex: '\\text{reactants}', tone: 'adj' },
  { id: 'products', at: [burn.mid.mgo1, -1.3], tex: '\\text{products}', tone: 'good' },
]);

const video: Explainer = {
  id: 'c10-4-1',
  lessonId: 'c10-4-1',
  title: 'Word Equations and Conservation of Mass, Part 1: Reactants, Products and Word Equations',
  thumbnailTitle: 'Reactants and Products',
  thumbnail: 'mg',
  summary:
    'In a chemical reaction the reactants are used up and new substances, the products, form, as the atoms are rearranged. A word equation names the reactants on the left of an arrow and the products on the right, and leaves out catalysts and energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 1', title: 'Reactants and Products', subtitle: 'Writing word equations' }],
      lines: [
        { say: 'Strike a match, and its head flares into flame, smoke and a little ash. It looks destroyed, but every atom that was in it is still there, joined to new partners.', show: 'title' },
        { say: 'In this lesson, you will write word equations and use the law of conservation of mass. This part names reactants and products; later parts test for products and find missing masses.' },
      ],
    },
    {
      chapter: 'Reactants and products',
      layout: 'split',
      leftWidth: 640,
      left: [figure('mg', [burn, burnLabels], 360)],
      right: [
        { kind: 'callout', id: 'rx', tone: 'definition', title: 'Chemical reaction', md: 'Substances change into **new substances** with different properties. The atoms are rearranged; none are made and none are destroyed.' },
        { kind: 'callout', id: 'rp', tone: 'definition', title: 'Reactants and products', md: 'The **reactants** are used up. The **products** are the new substances that form.' },
      ],
      lines: [
        { say: 'In a chemical reaction, substances change into new substances with different properties. The atoms are rearranged. None are made, and none are destroyed.', show: 'rx' },
        { say: 'When magnesium ribbon burns, it reacts with oxygen from the air and leaves a white powder of magnesium oxide.', show: ['mg.mg1', 'mg.mg2', 'mg.p', 'mg.o2', 'mg.arr', 'mg.mgo1', 'mg.mgo2'] },
        { say: 'Magnesium and oxygen are the reactants: the substances you start with, which are used up.', show: ['rp', 'mg.reactants'], focus: ['mg.mg1', 'mg.mg2', 'mg.o2'] },
        { say: 'Magnesium oxide is the product: the new substance that forms. The same atoms are there at the end, in new partnerships.', show: 'mg.products', focus: ['mg.mgo1', 'mg.mgo2'] },
      ],
    },
    {
      chapter: 'Word equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Word equation', md: 'The **reactants** on the left of an arrow and the **products** on the right, with a $+$ between substances on the same side. The arrow reads “react to form”.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{reactants} \\rightarrow \\text{products}', '\\text{magnesium} + \\text{oxygen} \\rightarrow \\text{magnesium oxide}'] },
      ],
      lines: [
        { say: 'A word equation names the reactants on the left of an arrow, and the products on the right, with a plus sign between substances on the same side. The arrow reads: react to form.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'So for burning magnesium, the word equation is magnesium plus oxygen gives magnesium oxide.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Zinc in acid',
      layout: 'split',
      leftWidth: 500,
      left: [
        {
          kind: 'bullets',
          id: 'steps',
          items: ['**Find the reactants:** the substances used up.', '**Find the products:** the new substances.', '**Leave out** catalysts and energy.', '**Write** reactants → products.'],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Zinc granules are dropped into dilute hydrochloric acid. They fizz as hydrogen gas bubbles off, and zinc chloride forms in the solution.' },
        { kind: 'table', id: 't', head: ['Reactants (used up)', 'Products (new)'], rows: [['zinc', 'zinc chloride'], ['hydrochloric acid', 'hydrogen']] },
        { kind: 'text', id: 'a', size: 'md', md: '**zinc + hydrochloric acid → zinc chloride + hydrogen**' },
      ],
      lines: [
        { say: 'To write a word equation from a description, find the reactants, which are used up, and the products, which are new.', show: ['steps.0', 'steps.1'] },
        { say: 'Leave out anything that is neither used up nor formed, such as a catalyst. Leave out energy too: heat and light are not substances.', show: ['steps.2', 'steps.3'] },
        { say: 'Zinc granules are dropped into dilute hydrochloric acid. They fizz as hydrogen bubbles off, and zinc chloride forms in the solution.', show: 'q' },
        { say: 'Zinc and hydrochloric acid are used up, so they are the reactants. Zinc chloride and hydrogen are new, so they are the products.', show: ['t.0', 't.1'], focus: 't' },
        { say: 'So zinc plus hydrochloric acid gives zinc chloride plus hydrogen.', show: 'a' },
      ],
    },
    {
      chapter: 'Heat and catalysts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{copper(II) carbonate} \\rightarrow \\text{copper(II) oxide} + \\text{carbon dioxide}'] },
        { kind: 'callout', id: 'cat', tone: 'mistake', title: 'A catalyst is not a reactant', md: 'Manganese(IV) oxide speeds up the breakdown of hydrogen peroxide but is still there, unchanged, at the end. The word equation is **hydrogen peroxide → water + oxygen**.' },
      ],
      lines: [
        { say: 'When green copper two carbonate is heated, it breaks down into black copper two oxide and carbon dioxide. Heat is not a substance, so there is one reactant.', caption: 'When green copper(II) carbonate is heated, it breaks down into black copper(II) oxide and carbon dioxide. Heat is not a substance, so there is one reactant.', show: 'm' },
        { say: 'A catalyst is left out as well. Manganese four oxide speeds up the breakdown of hydrogen peroxide, but it is still there, unchanged, at the end.', caption: 'A catalyst is left out as well. Manganese(IV) oxide speeds up the breakdown of hydrogen peroxide, but it is still there, unchanged, at the end.', show: 'cat' },
        { say: 'So it is neither a reactant nor a product: hydrogen peroxide gives water plus oxygen. Some books write a catalyst above the arrow, but never as a reactant.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An iron nail is placed in copper(II) sulfate solution. A coating of copper forms on the nail, and iron(II) sulfate forms in the solution. Which word equation describes the reaction?',
          choices: [
            'iron(II) sulfate + copper → iron + copper(II) sulfate',
            'iron + copper(II) sulfate → iron(II) sulfide + copper',
            'iron + copper(II) sulfate → iron(II) sulfate + copper',
            'iron + copper(II) sulfate + copper → iron(II) sulfate',
          ],
          answer: 2,
          working: 'Used up: iron and copper(II) sulfate, on the left. New: iron(II) sulfate and copper, on the right.',
        },
      ],
      lines: [
        { say: 'Your turn. An iron nail is placed in copper two sulfate solution. Copper coats the nail, and iron two sulfate forms. Which word equation describes the reaction? Pause the video and try it.', caption: 'Your turn. An iron nail is placed in copper(II) sulfate solution. Copper coats the nail, and iron(II) sulfate forms. Which word equation describes the reaction? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Iron and copper two sulfate are used up, so they go on the left. Iron two sulfate and copper are new, so they go on the right. Choice A has the arrow the wrong way round.', caption: 'The answer is C. Iron and copper(II) sulfate are used up, so they go on the left. Iron(II) sulfate and copper are new, so they go on the right. Choice A has the arrow the wrong way round.', show: 'q.answer' },
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
            'In a reaction, atoms are rearranged: the **reactants** are used up and the **products** form.',
            'A **word equation**: reactants → products, with $+$ between substances on the same side.',
            'Leave out catalysts and energy: they are not reactants or products.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a reaction, atoms are rearranged into new substances. The reactants are used up, and the products form.', show: 'sum.0' },
        { say: 'A word equation puts the reactants on the left of the arrow and the products on the right.', show: 'sum.1' },
        { say: 'Leave out catalysts and energy. In part two, you will identify products with simple tests. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
