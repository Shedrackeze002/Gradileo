import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-4-6-b',
  lessonId: 'c20-4-6',
  title: 'Limiting and Excess Reagents, Part 2: A Shortcut, and Masses',
  thumbnailTitle: 'A Shortcut, and Masses',
  thumbnail: false,
  summary:
    'In the thermite reaction, 1.50 mol of aluminium needs only 0.750 mol of iron(III) oxide, so the aluminium runs out first even though there is more of it. A shortcut: divide the amount of each reactant by its coefficient, and the smaller result belongs to the limiting reagent. When the question gives masses, change both masses to moles first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'A Shortcut, and Masses', subtitle: 'Finding the limiting reagent quickly' }],
      lines: [
        { say: 'Thermite, a mixture of aluminium powder and iron oxide, burns hot enough to melt iron. If there are more moles of aluminium than of iron oxide, is the aluminium in excess?', show: 'title' },
        { say: 'In this part, you will answer questions like that with a quick shortcut, and start from masses.' },
      ],
    },
    {
      chapter: 'The thermite reaction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A mixture for $\\ce{2Al + Fe2O3 -> Al2O3 + 2Fe}$ holds $1.50\\ \\text{mol}$ of $\\ce{Al}$ and $1.00\\ \\text{mol}$ of $\\ce{Fe2O3}$. Which reactant is the limiting reagent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(\\ce{Fe2O3})\\text{ needed} = 1.50 \\times \\dfrac{1}{2} = 0.750\\ \\text{mol}', '1.00\\ \\text{mol} > 0.750\\ \\text{mol, so } \\good{\\ce{Al}\\text{ is limiting}}'] },
      ],
      lines: [
        { say: 'A thermite mixture holds one point five zero moles of aluminium and one point zero zero moles of iron three oxide. Which reactant is limiting?', caption: 'A thermite mixture holds 1.50 mol of aluminium and 1.00 mol of iron(III) oxide. Which reactant is limiting?', show: 'q' },
        { say: 'Two aluminium atoms react with each unit of iron three oxide. So one point five zero moles of aluminium needs half as much, zero point seven five zero moles of iron three oxide.', caption: 'Two aluminium atoms react with each unit of iron(III) oxide. So 1.50 mol of aluminium needs half as much, 0.750 mol of iron(III) oxide.', show: 'm.0', focus: 'm.0' },
        { say: 'There are one point zero zero moles, more than enough. So the aluminium runs out first, even though there is more of it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Divide by the coefficients', md: 'Divide the amount of each reactant by its coefficient. The reactant with the **smaller** result runs out first. Each result counts how many "rounds" of the reaction that reactant can supply.' },
        {
          kind: 'table',
          id: 't',
          head: ['Reaction', 'First reactant', 'Second reactant', 'Limiting'],
          rows: [
            ['$\\ce{N2 + 3H2 -> 2NH3}$', '$\\ce{N2}$: $\\dfrac{2.00}{1} = 2.00$', '$\\ce{H2}$: $\\dfrac{4.50}{3} = 1.50$', '$\\ce{H2}$'],
            ['$\\ce{2Al + Fe2O3 -> Al2O3 + 2Fe}$', '$\\ce{Al}$: $\\dfrac{1.50}{2} = 0.750$', '$\\ce{Fe2O3}$: $\\dfrac{1.00}{1} = 1.00$', '$\\ce{Al}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a shortcut. Divide the amount of each reactant by its coefficient. The reactant with the smaller result runs out first.', show: 'tip' },
        { say: 'Each result counts how many rounds of the reaction that reactant can supply.' },
        { say: 'For ammonia, two point zero zero for nitrogen, and four point five zero over three, one point five zero, for hydrogen. Hydrogen is limiting.', show: 't.0', focus: 't.0' },
        { say: 'For thermite, zero point seven five zero for aluminium, and one point zero zero for iron three oxide. Aluminium is limiting, as before.', caption: 'For thermite, 0.750 for aluminium, and 1.00 for iron(III) oxide. Aluminium is limiting, as before.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Starting from masses',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A mixture for $\\ce{2Al + 3CuCl2 -> 2AlCl3 + 3Cu}$ holds $5.40\\ \\text{g}$ of $\\ce{Al}$ and $30.0\\ \\text{g}$ of $\\ce{CuCl2}$. Which is limiting? Use Al $26.98$, Cu $63.55$ and Cl $35.45\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{Al}) = \\dfrac{5.40}{26.98} = 0.2001\\ \\text{mol}',
            'M(\\ce{CuCl2}) = 63.55 + 2(35.45) = 134.45\\ \\text{g/mol}',
            'n(\\ce{CuCl2}) = \\dfrac{30.0}{134.45} = 0.2231\\ \\text{mol}',
            '\\ce{Al}\\text{: } \\dfrac{0.2001}{2} = 0.1001 \\qquad \\ce{CuCl2}\\text{: } \\dfrac{0.2231}{3} = 0.07437',
            '\\good{\\ce{CuCl2}\\text{ is limiting, and }\\ce{Al}\\text{ is in excess}}',
          ],
        },
      ],
      lines: [
        { say: 'When the question gives masses, change both masses to moles first. Masses alone cannot be compared, because the substances have different molar masses.' },
        { say: 'This mixture holds five point four zero grams of aluminium and thirty point zero grams of copper two chloride. Which is limiting?', caption: 'This mixture holds 5.40 g of aluminium and 30.0 g of copper(II) chloride. Which is limiting?', show: 'q' },
        { say: 'Five point four zero grams of aluminium is zero point two zero zero one moles. Copper two chloride is one hundred thirty-four point four five grams per mole, so thirty point zero grams is zero point two two three one moles.', caption: '5.40 g of aluminium is 0.2001 mol. Copper(II) chloride is 134.45 g/mol, so 30.0 g is 0.2231 mol.', show: ['m.0', 'm.1', 'm.2'], focus: ['m.0', 'm.2'] },
        { say: 'Now divide by the coefficients: zero point one zero zero one for aluminium, and zero point zero seven four three seven for copper two chloride.', caption: 'Now divide by the coefficients: 0.1001 for aluminium, and 0.07437 for copper(II) chloride.', show: 'm.3', focus: 'm.3' },
        { say: 'The smaller one is copper two chloride, so it is limiting, and aluminium is in excess. A question that asks which reactant is in excess needs exactly the same working. Only the last line changes.', caption: 'The smaller one is copper(II) chloride, so it is limiting, and aluminium is in excess. A question that asks which reactant is in excess needs exactly the same working. Only the last line changes.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mixture for the reaction $\\ce{2Na + Cl2 -> 2NaCl}$ holds $4.60\\ \\text{g}$ of $\\ce{Na}$ and $10.0\\ \\text{g}$ of $\\ce{Cl2}$. Which reactant is in excess? Use these molar masses: Na $22.99\\ \\text{g/mol}$, Cl $35.45\\ \\text{g/mol}$.',
          choices: [
            '$\\ce{Cl2}$: there is $0.1410\\ \\text{mol}$, and the $\\ce{Na}$ needs $0.1000\\ \\text{mol}$',
            '$\\ce{Na}$: $0.2001\\ \\text{mol}$ is more than $0.1410\\ \\text{mol}$',
            '$\\ce{Na}$: it needs $0.4002\\ \\text{mol}$ of $\\ce{Cl2}$',
            'Neither: both are used up exactly',
          ],
          answer: 0,
          working: '$n(\\ce{Na}) = 4.60 \\div 22.99 = 0.2001\\ \\text{mol}$ and $n(\\ce{Cl2}) = 10.0 \\div 70.90 = 0.1410\\ \\text{mol}$. The $\\ce{Na}$ needs $0.2001 \\div 2 = 0.1000\\ \\text{mol}$ of $\\ce{Cl2}$, so $\\ce{Na}$ is limiting and $\\ce{Cl2}$ is in excess.',
        },
      ],
      lines: [
        { say: 'Your turn. A mixture holds four point six zero grams of sodium and ten point zero grams of chlorine gas. Which reactant is in excess? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, chlorine. The sodium is zero point two zero zero one moles, and the chlorine, at seventy point nine zero grams per mole, is zero point one four one zero moles. Sodium needs only half its amount of chlorine, so the chlorine is in excess. Choice B compares the amounts directly, and choice C turns the ratio upside down.', show: 'q.answer' },
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
          items: ['Shortcut: divide each amount by its coefficient; the **smaller** result belongs to the limiting reagent.', 'Given masses? Change **both** to moles first.', 'Which is in excess? The same working; only the last line changes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Divide each amount by its coefficient. The smaller result belongs to the limiting reagent.', show: 'sum.0' },
        { say: 'Given masses, change both to moles first.', show: 'sum.1' },
        { say: 'And to find the reactant in excess, do the same working. In part three, you will find how much product forms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
