import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-3-1',
  lessonId: 'cx-3-1',
  title: 'Empirical and Molecular Formulae',
  thumbnail: false,
  summary:
    'The empirical formula is the simplest whole-number ratio of the atoms in a compound. Divide each mass or percentage by the relative atomic mass, divide by the smallest answer, and multiply up to whole numbers. The relative formula mass then turns the empirical formula into the molecular formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulae and Atom Economy', title: 'Empirical and Molecular Formulae', subtitle: 'The simplest ratio' }],
      lines: [
        { say: 'Glucose and the acid in vinegar taste nothing alike. Yet an analysis of each gives exactly the same answer: one carbon atom and one oxygen atom for every two hydrogen atoms.', show: 'title' },
        { say: 'In this lesson, you will work out an empirical formula from masses, and turn it into a molecular formula.' },
      ],
    },
    {
      chapter: 'Two kinds of formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'emp', tone: 'definition', title: 'Empirical formula', md: 'The **simplest whole-number ratio** of the atoms of each element in a compound.' },
        { kind: 'callout', id: 'mol', tone: 'definition', title: 'Molecular formula', md: 'The **actual number** of atoms of each element in one molecule.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{C6H12O6} \\rightarrow \\ce{CH2O}'] },
      ],
      lines: [
        { say: 'The empirical formula of a compound shows the simplest whole-number ratio of the atoms of each element in it.', show: 'emp' },
        { say: 'The molecular formula shows the actual number of atoms of each element in one molecule.', show: 'mol', focus: 'mol' },
        { say: 'Glucose has six carbon, twelve hydrogen and six oxygen atoms. All three numbers divide by six, so its empirical formula is C H two O.', caption: 'Glucose is C₆H₁₂O₆. All three numbers divide by 6, so its empirical formula is CH₂O.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From masses to a formula',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Write down the **mass** of each element.',
            'Divide each mass by the **relative atomic mass**.',
            'Divide every answer by the **smallest**.',
            'If needed, multiply up to **whole numbers**.',
          ],
        },
      ],
      lines: [
        { say: 'An experiment gives the mass of each element, but a formula counts atoms. So write down the mass of each element, and divide each one by the relative atomic mass of that element.', show: ['b.0', 'b.1'] },
        { say: 'That gives the moles of atoms. Then divide every answer by the smallest of them, and if the numbers are not whole, multiply them all up until they are.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'A worked example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A compound contains $5.4\\ \\text{g}$ of aluminium and $4.8\\ \\text{g}$ of oxygen. (Al = 27, O = 16)' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Aluminium', 'Oxygen'],
          rows: [['Mass ÷ $A_r$', '$5.4 \\div 27 = 0.2$', '$4.8 \\div 16 = 0.3$'], ['÷ smallest', '$1$', '$1.5$'], ['× 2', '$2$', '$3$']],
        },
        { kind: 'math', id: 'ans', size: 'lg', lines: ['\\ce{Al2O3}'] },
      ],
      lines: [
        { say: 'A compound contains five point four grams of aluminium, and four point eight grams of oxygen.', caption: 'A compound contains 5.4 g of aluminium, and 4.8 g of oxygen.', show: 'q' },
        { say: 'Divide by the relative atomic masses. Five point four divided by twenty-seven is zero point two. Four point eight divided by sixteen is zero point three.', caption: 'Divide by the relative atomic masses. 5.4 ÷ 27 = 0.2. And 4.8 ÷ 16 = 0.3.', show: 't.0', focus: 't.0' },
        { say: 'Divide both by the smallest, zero point two. That gives one for aluminium, and one point five for oxygen.', caption: 'Divide both by the smallest, 0.2. That gives 1 for aluminium, and 1.5 for oxygen.', show: 't.1', focus: 't.1' },
        { say: 'One point five is not a whole number, so multiply both by two. The ratio is two to three, and the empirical formula is A L two, O three.', caption: '1.5 is not a whole number, so multiply both by 2. The ratio is 2 : 3, and the empirical formula is Al₂O₃.', show: ['t.2', 'ans'], focus: ['t.2', 'ans'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Do not round 1.5 to 2', md: 'A value ending in $.5$ means **multiply everything by 2**. Round only when a number is very close to a whole number, such as $1.99$ or $3.02$.' }],
      lines: [
        { say: 'Here is a common mistake: rounding one point five up to two. A value ending in point five means multiply everything by two. Round only when a number is very close to a whole number, such as one point nine nine.', caption: 'Here is a common mistake: rounding 1.5 up to 2. A value ending in .5 means multiply everything by 2. Round only when a number is very close to a whole number, such as 1.99.', show: 'm' },
      ],
    },
    {
      chapter: 'The molecular formula',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Empirical formula $\\ce{C2H5}$, relative formula mass 58. (C = 12, H = 1)' },
        { kind: 'math', id: 'm', size: 'md', lines: ['M_r(\\ce{C2H5}) = (2 \\times 12) + (5 \\times 1) = 29', '58 \\div 29 = 2', '\\ce{C4H10}'] },
      ],
      lines: [
        { say: 'One more fact gives the molecular formula: the relative formula mass. A compound has the empirical formula C two, H five, and a relative formula mass of fifty-eight.', caption: 'One more fact gives the molecular formula: the relative formula mass. A compound has the empirical formula C₂H₅, and a relative formula mass of 58.', show: 'q' },
        { say: 'The empirical formula has a mass of two times twelve, plus five times one, which is twenty-nine.', caption: 'The empirical formula has a mass of (2 × 12) + (5 × 1) = 29.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifty-eight divided by twenty-nine is two. So multiply every number in the empirical formula by two. The molecular formula is C four, H ten, which is butane.', caption: '58 ÷ 29 = 2. So multiply every number in the empirical formula by 2. The molecular formula is C₄H₁₀, which is butane.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A compound contains $4.8\\ \\text{g}$ of magnesium and $3.2\\ \\text{g}$ of oxygen. What is its empirical formula? (Mg = 24, O = 16)',
          choices: ['$\\ce{Mg2O}$', '$\\ce{MgO2}$', '$\\ce{MgO}$', '$\\ce{Mg3O2}$'],
          answer: 2,
          working: 'Mg: $4.8 \\div 24 = 0.2$. O: $3.2 \\div 16 = 0.2$. The ratio is $1 : 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. A compound contains four point eight grams of magnesium, and three point two grams of oxygen. What is its empirical formula? Pause the video and try it.', caption: 'Your turn. A compound contains 4.8 g of magnesium, and 3.2 g of oxygen. What is its empirical formula? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Four point eight divided by twenty-four is zero point two, and three point two divided by sixteen is also zero point two. The ratio is one to one, so the formula is M G O.', caption: 'The answer is C. 4.8 ÷ 24 = 0.2, and 3.2 ÷ 16 is also 0.2. The ratio is 1 : 1, so the formula is MgO.', show: 'q.answer' },
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
            'The empirical formula is the simplest whole-number ratio of the atoms.',
            'Divide each mass by the relative atomic mass, then by the smallest answer.',
            'Multiply up to reach whole numbers; do not round 1.5.',
            'Molecular formula = empirical formula × a whole number, found from $M_r$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The empirical formula is the simplest whole-number ratio of the atoms in a compound.', show: 'sum.0' },
        { say: 'To find it, divide each mass by the relative atomic mass, then divide by the smallest answer.', show: 'sum.1' },
        { say: 'Multiply up to reach whole numbers, and never round one point five.', caption: 'Multiply up to reach whole numbers, and never round 1.5.', show: 'sum.2' },
        { say: 'And the molecular formula is the empirical formula times a whole number, which you find from the relative formula mass.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
