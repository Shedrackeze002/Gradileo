import type { Explainer } from '@/video/script.ts';

const RATIO = 'n(\\text{wanted}) = n(\\text{given}) \\times \\dfrac{\\text{wanted coefficient}}{\\text{given coefficient}}';

const video: Explainer = {
  id: 'c20-4-4-b',
  lessonId: 'c20-4-4',
  title: 'Mole Ratios and Gravimetric Stoichiometry, Part 2: Using a Mole Ratio',
  thumbnailTitle: 'Using a Mole Ratio',
  thumbnail: false,
  summary:
    'To find the amount of one substance from the amount of another, multiply by the wanted coefficient over the given coefficient: in N₂ + 3H₂ → 2NH₃, 1.25 mol of N₂ makes 2.50 mol of NH₃. The larger coefficient takes part in the larger amount, the wanted coefficient always goes on top, and the equation must be balanced first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'Using a Mole Ratio', subtitle: 'Wanted over given' }],
      lines: [
        { say: 'If you know the amount of one substance in a reaction, the balanced equation gives you the amount of every other substance.', show: 'title' },
        { say: 'In this part, you will use mole ratios to find amounts in moles, forwards, backwards, and from an equation that is not yet balanced.' },
      ],
    },
    {
      chapter: 'Wanted over given',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: [RATIO] },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'In $\\ce{N2 + 3H2 -> 2NH3}$, how many moles of $\\ce{NH3}$ form from $1.25\\ \\text{mol}$ of $\\ce{N2}$, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Given: } \\ce{N2},\\ 1 \\qquad \\text{Wanted: } \\ce{NH3},\\ 2', 'n(\\ce{NH3}) = 1.25 \\times \\dfrac{2}{1} = \\good{2.50\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'To find the amount of one substance from the amount of another, multiply by the mole ratio, written as the wanted coefficient over the given coefficient.', show: 'f' },
        { say: 'In the reaction that makes ammonia, how many moles of ammonia form from one point two five moles of nitrogen?', show: 'q' },
        { say: 'The given substance is nitrogen, with a coefficient of one. The wanted substance is ammonia, with a coefficient of two.', show: 'm.0', focus: 'm.0' },
        { say: 'So one point two five times two over one is two point five zero moles of ammonia.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Burning butane',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'In $\\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$, how many moles of $\\ce{O2}$ react with $0.640\\ \\text{mol}$ of $\\ce{C4H10}$, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(\\ce{O2}) = 0.640 \\times \\dfrac{13}{2} = \\good{4.16\\ \\text{mol}}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'The substance with the larger coefficient takes part in the larger amount. $13 > 2$, so the answer must be more than $0.640\\ \\text{mol}$.' },
      ],
      lines: [
        { say: 'Butane burns in oxygen. How many moles of oxygen react with zero point six four zero moles of butane?', caption: 'Butane burns in oxygen: 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O. How many moles of oxygen react with 0.640 mol of butane?', show: 'q' },
        { say: 'Wanted: oxygen, thirteen. Given: butane, two. Zero point six four zero times thirteen over two is four point one six moles of oxygen.', show: 'm', focus: 'm' },
        { say: 'Does that make sense? Oxygen’s coefficient, thirteen, is bigger than butane’s, two, so the answer must be bigger than zero point six four zero moles. It is.', show: 'tip' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'In $\\ce{2Al2O3 -> 4Al + 3O2}$, how many moles of $\\ce{Al2O3}$ are needed to make $5.00\\ \\text{mol}$ of $\\ce{Al}$, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(\\ce{Al2O3}) = 5.00 \\times \\dfrac{2}{4} = \\good{2.50\\ \\text{mol}}', '5.00 \\times \\dfrac{4}{2} = 10.0\\ \\text{mol} \\quad \\bad{\\times}'] },
      ],
      lines: [
        { say: 'The ratio works backwards too. Aluminium oxide breaks down into aluminium and oxygen. How many moles of aluminium oxide are needed to make five point zero zero moles of aluminium?', show: 'q' },
        { say: 'Given: aluminium, four. Wanted: aluminium oxide, two. Five point zero zero times two over four is two point five zero moles.', show: 'm.0', focus: 'm.0' },
        { say: 'Turning the ratio upside down gives ten point zero moles: more aluminium oxide than aluminium, though each unit of aluminium oxide holds two aluminium atoms. The wanted coefficient always goes on top.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Balance first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'In $\\ce{Fe + Cl2 -> FeCl3}$ (not yet balanced), how many moles of $\\ce{Cl2}$ react with $0.840\\ \\text{mol}$ of $\\ce{Fe}$, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2Fe + 3Cl2 -> 2FeCl3}', 'n(\\ce{Cl2}) = 0.840 \\times \\dfrac{3}{2} = \\good{1.26\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'The coefficients are a mole ratio only when the equation is balanced. Iron reacts with chlorine to form iron three chloride, but this equation is not yet balanced.', caption: 'The coefficients are a mole ratio only when the equation is balanced. Iron reacts with chlorine to form iron(III) chloride, but this equation is not yet balanced.', show: 'q' },
        { say: 'Balanced, it is two iron, plus three chlorine, giving two iron three chloride. Iron: two on each side. Chlorine: six on each side.', caption: 'Balanced, it is 2Fe + 3Cl₂ → 2FeCl₃. Iron: two on each side. Chlorine: six on each side.', show: 'm.0', focus: 'm.0' },
        { say: 'Then zero point eight four zero times three over two is one point two six moles of chlorine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the reaction $\\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}$, how many moles of $\\ce{O2}$ react with $0.300\\ \\text{mol}$ of $\\ce{C2H6}$? Give the answer to the nearest hundredth.',
          choices: ['$0.09\\ \\text{mol}$', '$2.10\\ \\text{mol}$', '$1.05\\ \\text{mol}$', '$0.30\\ \\text{mol}$'],
          answer: 2,
          working: '$n(\\ce{O2}) = 0.300 \\times \\dfrac{7}{2} = 1.05\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ethane burns in oxygen. How many moles of oxygen react with zero point three zero zero moles of ethane? Pause the video and try it.', caption: 'Your turn. Ethane burns in oxygen: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. How many moles of oxygen react with 0.300 mol of ethane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one point zero five moles: zero point three zero zero times seven over two. Choice A has the ratio upside down, so it is smaller than zero point three zero zero, which cannot be right. Choice B multiplies by seven, but forgets to divide by two.', show: 'q.answer' },
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
          items: [`$${RATIO}$`, 'Check the direction: the larger coefficient takes part in the larger amount.', 'The coefficients are a mole ratio only when the equation is **balanced**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Multiply the given amount by the wanted coefficient over the given coefficient.', show: 'sum.0' },
        { say: 'Check the direction: the larger coefficient takes part in the larger amount.', show: 'sum.1' },
        { say: 'And balance the equation first. In part three, you will start from a mass, and find the mass of another substance. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
