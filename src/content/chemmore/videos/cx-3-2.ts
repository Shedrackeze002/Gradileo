import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-3-2',
  lessonId: 'cx-3-2',
  title: 'Atom Economy',
  thumbnail: false,
  summary:
    'Atom economy is the percentage of the mass of the reactants that ends up in the desired product: the total relative formula mass of the desired product divided by that of all the reactants, times 100. It comes from the balanced equation alone, while percentage yield comes from what is actually collected.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulae and Atom Economy', title: 'Atom Economy', subtitle: 'How much ends up in the product?' }],
      lines: [
        { say: 'A factory can run a reaction perfectly, losing not one gram, and still turn half of what it buys into waste. The reason is in the equation itself.', show: 'title' },
        { say: 'In this lesson, you will calculate the atom economy of a reaction, and see how it differs from the yield.' },
      ],
    },
    {
      chapter: 'What atom economy measures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Atom economy', md: 'The **percentage of the mass of the reactants** that ends up in the **desired product**. It is worked out from the balanced equation alone.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{atom economy} = \\dfrac{\\text{total } M_r \\text{ of the desired product}}{\\text{total } M_r \\text{ of all the reactants}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'The atom economy of a reaction is the percentage of the mass of the reactants that ends up in the desired product. It is worked out from the balanced equation alone.', show: 'def' },
        { say: 'Divide the total relative formula mass of the desired product by the total for all the reactants, and multiply by one hundred.', caption: 'Divide the total relative formula mass of the desired product by the total for all the reactants, and multiply by 100.', show: 'm', focus: 'm' },
        { say: 'A reaction with only one product has an atom economy of one hundred percent, because every atom of the reactants ends up in that product.', caption: 'A reaction with only one product has an atom economy of 100%, because every atom of the reactants ends up in that product.' },
      ],
    },
    {
      chapter: 'Calculating it',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{CH4 + H2O -> CO + 3H2}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{reactants} = 16 + 18 = 34', '\\text{hydrogen} = 3 \\times 2 = 6', '\\dfrac{6}{34} \\times 100 = 17.6\\%'] },
      ],
      lines: [
        { say: 'Hydrogen is made from methane and steam. The other product is carbon monoxide. What is the atom economy for making hydrogen?', caption: 'Hydrogen is made from methane and steam: CH₄ + H₂O → CO + 3H₂. What is the atom economy for making hydrogen?', show: 'eq' },
        { say: 'Methane has a relative formula mass of sixteen, and water eighteen, so the reactants total thirty-four.', caption: 'Methane has a relative formula mass of 16, and water 18, so the reactants total 34.', show: 'm.0', focus: 'm.0' },
        { say: 'The equation makes three molecules of hydrogen, each with a mass of two, so the desired product totals six.', caption: 'The equation makes 3H₂, each with a mass of 2, so the desired product totals 6.', show: 'm.1', focus: 'm.1' },
        { say: 'Six over thirty-four, times one hundred, is seventeen point six percent. The rest of the mass leaves as carbon monoxide.', caption: '6 ÷ 34 × 100 = 17.6%. The rest of the mass leaves as carbon monoxide.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Count the big numbers', md: 'In $\\ce{2PbO + C -> 2Pb + CO2}$, the lead counts as $2 \\times 207 = 414$, not $207$.' }],
      lines: [
        { say: 'The commonest slip is to forget the number in front of a formula. When an equation makes two atoms of lead, the lead counts as two times two hundred seven, which is four hundred fourteen.', caption: 'The commonest slip is to forget the number in front of a formula. In 2PbO + C → 2Pb + CO₂, the lead counts as 2 × 207 = 414.', show: 'm' },
      ],
    },
    {
      chapter: 'Atom economy and yield',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percentage yield', md: 'The mass of product **actually collected**, as a percentage of the greatest mass that could have been made.' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Atom economy', 'Percentage yield'],
          rows: [['Found from', 'The balanced equation', 'Measurements in an experiment'], ['Raised by', 'Choosing a different reaction', 'Carrying out the reaction more carefully']],
        },
      ],
      lines: [
        { say: 'Percentage yield is a different measure. It compares the mass of product actually collected with the greatest mass that could have been made.', show: 'def' },
        { say: 'Atom economy is fixed by the equation. Yield depends on how the reaction is carried out, because product is lost when a reaction does not finish, or when the product is separated.', show: 't.0', focus: 't.0' },
        { say: 'So you raise the atom economy by choosing a different reaction, or by finding a use for the other products. You raise the yield by carrying out the reaction more carefully.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\ce{2PbO + C -> 2Pb + CO2}$ the reactants total 458 and the lead totals 414. What is the atom economy for making lead?',
          choices: ['90.4%', '45.2%', '9.6%', '110.6%'],
          answer: 0,
          working: '$\\dfrac{414}{458} \\times 100 = 90.4\\%$',
        },
      ],
      lines: [
        { say: 'Your turn. Lead is extracted by heating lead two oxide with carbon. The reactants have a total relative formula mass of four hundred fifty-eight, and the lead has a total of four hundred fourteen. What is the atom economy for making lead? Pause the video and try it.', caption: 'Your turn. In 2PbO + C → 2Pb + CO₂, the reactants total 458, and the lead totals 414. What is the atom economy for making lead? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, ninety point four percent. Four hundred fourteen over four hundred fifty-eight, times one hundred. Choice B uses only one atom of lead.', caption: 'The answer is A, 90.4%. That is 414 ÷ 458 × 100. Choice B uses only one atom of lead.', show: 'q.answer' },
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
            'Atom economy = desired product ÷ all reactants × 100%, using total $M_r$.',
            'Count the numbers in front of the formulae.',
            'A reaction with one product has an atom economy of 100%.',
            'Atom economy comes from the equation; yield from what is collected.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Atom economy is the total relative formula mass of the desired product, over the total for all the reactants, times one hundred.', caption: 'Let’s sum up. Atom economy is the total relative formula mass of the desired product, over the total for all the reactants, times 100.', show: 'sum.0' },
        { say: 'Count the numbers in front of the formulae.', show: 'sum.1' },
        { say: 'A reaction with one product has an atom economy of one hundred percent.', caption: 'A reaction with one product has an atom economy of 100%.', show: 'sum.2' },
        { say: 'And atom economy comes from the equation, while yield comes from what is actually collected. A higher atom economy means less waste.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
