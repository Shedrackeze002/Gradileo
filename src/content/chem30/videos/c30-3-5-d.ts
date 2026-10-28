import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-3-5-d',
  lessonId: 'c30-3-5',
  title: 'Addition, Substitution and Elimination, Part 4: Telling Them Apart and Predicting Products',
  thumbnailTitle: 'Telling Them Apart',
  thumbnail: false,
  summary:
    'Count the molecules on each side: addition makes one product from two reactants, substitution two from two, and elimination two from one. Then compare the bonds, decide which reaction the reactants and conditions give, move the atoms and name the product: but-2-ene and bromine give 2,3-dibromobutane, and 1,2-dichloropropane comes from propene and chlorine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'Telling Them Apart', subtitle: 'And predicting the products' }],
      lines: [
        { say: 'You have now met all three kinds of organic reaction. Given an equation, can you tell which one it shows? Given the reactants, can you predict the product?', show: 'title' },
        { say: 'In this part, you will learn a quick way to classify a reaction. Then you will predict products, and even work backwards to the reactants.' },
      ],
    },
    {
      chapter: 'Count, then look at the bonds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Reaction', 'Reactants', 'Products', 'What changes'],
          rows: [
            ['addition', 'two', 'one', 'a double or triple bond opens'],
            ['substitution', 'two', 'two', 'one atom or group swaps for another'],
            ['elimination', 'one', 'two', 'a small molecule leaves; a double bond forms'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count, then look at the bonds', md: 'A multiple bond that becomes a single bond means **addition**. A new multiple bond means **elimination**. The same bonds with one atom swapped means **substitution**.' },
      ],
      lines: [
        { say: 'First, count the molecules on each side. In addition, two reactants make one product, as a double or triple bond opens.', show: 't.0', focus: 't.0' },
        { say: 'In substitution, two reactants make two products, as one atom or group swaps for another.', show: 't.1', focus: 't.1' },
        { say: 'In elimination, one reactant gives two products, as a small molecule leaves and a double bond forms.', show: 't.2', focus: 't.2' },
        { say: 'Then compare the organic reactant and product. A multiple bond that becomes single means addition; a new one means elimination; one atom swapped means substitution.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Classify three reactions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{CH3-CH2-CH3 + Br2 ->[{light}] CH3-CH2-CH2Br + HBr}',
            '\\good{\\Rightarrow\\ \\text{substitution}}',
            '\\ce{CH3-CH2-CH2-OH ->[H2SO4][{heat}] CH3-CH=CH2 + H2O}',
            '\\good{\\Rightarrow\\ \\text{elimination}}',
            '\\ce{CH2=CH-CH2-CH3 + H2 ->[Pt] CH3-CH2-CH2-CH3}',
            '\\good{\\Rightarrow\\ \\text{addition}}',
          ],
        },
      ],
      lines: [
        { say: 'Try three. Propane and bromine, in light, give one-bromo-propane and hydrogen bromide.', caption: 'Try three. Propane and bromine, in light, give 1-bromopropane and hydrogen bromide.', show: 'm.0', focus: 'm.0' },
        { say: 'Two reactants and two products, and a bromine atom has swapped for a hydrogen atom. That is substitution.', show: 'm.1', focus: 'm.1' },
        { say: 'Propan-one-ol, heated with sulfuric acid, gives propene and water. One reactant, two products, and a new double bond. That is elimination.', caption: 'Propan-1-ol, heated with sulfuric acid, gives propene and water. One reactant, two products, and a new double bond. That is elimination.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Bute-one-ene and hydrogen give butane. Two reactants, one product, and the double bond has become a single bond. That is addition.', caption: 'But-1-ene and hydrogen give butane. Two reactants, one product, and the double bond has become a single bond. That is addition.', show: ['m.4', 'm.5'], focus: ['m.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Predicting a product',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Addition**: a multiple bond with $\\ce{H2}$, a halogen, a hydrogen halide or water.',
            '**Substitution**: an alkane with a halogen in light, or a haloalkane with aqueous $\\ce{OH-}$.',
            '**Elimination**: an alcohol with hot concentrated sulfuric acid.',
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3-CH=CH-CH3 + Br2 -> CH3-CHBr-CHBr-CH3}', '\\text{2,3-dibromobutane}'] },
      ],
      lines: [
        { say: 'To predict a product, first decide which kind of reaction happens. A multiple bond with hydrogen, a halogen, a hydrogen halide or water means addition.', show: 'b.0' },
        { say: 'An alkane with a halogen in light, or a halo-alkane with aqueous hydroxide, means substitution. An alcohol with hot concentrated sulfuric acid means elimination.', caption: 'An alkane with a halogen in light, or a haloalkane with aqueous hydroxide, means substitution. An alcohol with hot concentrated sulfuric acid means elimination.', show: ['b.1', 'b.2'] },
        { say: 'Then move the atoms, and name the product. Take bute-two-ene with bromine. An alkene and a halogen: that is addition.', caption: 'Then move the atoms, and name the product. Take but-2-ene with bromine. An alkene and a halogen: that is addition.' },
        { say: 'One bromine atom adds to each carbon of the double bond, carbons two and three. The product is two, three dye-bromo-butane.', caption: 'One bromine atom adds to each carbon of the double bond, carbons 2 and 3. The product is 2,3-dibromobutane.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which alkene and which reagent form 1,2-dichloropropane, $\\ce{CH2Cl-CHCl-CH3}$, by addition?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Cl on carbons 1 and 2} \\ \\Rightarrow\\ \\ce{CH2=CH-CH3}\\ \\text{(propene)}',
            '\\text{two Cl atoms added} \\ \\Rightarrow\\ \\ce{Cl2}',
            '\\ce{CH2=CH-CH3 + Cl2 -> CH2Cl-CHCl-CH3}',
          ],
        },
      ],
      lines: [
        { say: 'You can also work backwards. Which alkene and which reagent form one, two dye-chloro-propane by addition?', caption: 'You can also work backwards. Which alkene and which reagent form 1,2-dichloropropane by addition?', show: 'q' },
        { say: 'The chlorine atoms are on neighbouring carbons, one and two, so the double bond was between them: the alkene is propene.', show: 'm.0', focus: 'm.0' },
        { say: 'Two chlorine atoms were added, so the reagent is chlorine. Hydrogen chloride would add only one chlorine atom.', show: 'm.1', focus: 'm.1' },
        { say: 'So propene and chlorine form one, two dye-chloro-propane.', caption: 'So propene and chlorine form 1,2-dichloropropane.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which reactants form 1,2-dibromobutane, $\\ce{CH2Br-CHBr-CH2-CH3}$, in an addition reaction?',
          choices: ['But-2-ene and bromine', 'But-1-ene and hydrogen bromide', 'But-1-ene and bromine', 'Butane and bromine'],
          answer: 2,
          working: 'The bromine atoms are on carbons 1 and 2, so the double bond was between them: but-1-ene. Two Br atoms were added, so the reagent is bromine: $\\ce{CH2=CH-CH2-CH3 + Br2 -> CH2Br-CHBr-CH2-CH3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which reactants form one, two dye-bromo-butane in an addition reaction? Pause the video and try it.', caption: 'Your turn. Which reactants form 1,2-dibromobutane in an addition reaction? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: bute-one-ene and bromine. The bromine atoms on carbons one and two show where the double bond was, and two bromine atoms means bromine itself. Choice D, butane, has no double bond to add to.', caption: 'The answer is C: but-1-ene and bromine. The bromine atoms on carbons 1 and 2 show where the double bond was, and two bromine atoms means bromine itself. Choice D, butane, has no double bond to add to.', show: 'q.answer' },
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
            'Count: addition, two reactants to one product; substitution, two to two; elimination, one to two.',
            'A multiple bond that opens means addition; a new one means elimination; one atom swapped means substitution.',
            'To predict a product, decide the reaction from the reactants and conditions, move the atoms, then name it.',
            'To work backwards, the new atoms show where the double bond was and which reagent added.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Count the molecules: addition goes from two to one, substitution from two to two, and elimination from one to two.', show: 'sum.0' },
        { say: 'Then look at the bonds: an opened multiple bond means addition, a new one elimination, and a swapped atom substitution.', show: 'sum.1' },
        { say: 'To predict a product, decide the kind of reaction from the reactants and conditions, move the atoms, then name the product.', show: 'sum.2' },
        { say: 'And to work backwards, the new atoms show where the double bond was. Now you can classify organic reactions and predict their products. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
