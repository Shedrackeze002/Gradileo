import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker, room } from './lib/c20-4b-figures.ts';

// Silver nitrate and sodium chloride solutions mixed: silver chloride settles on the bottom.
const precipitate = figure(
  'b',
  [
    beaker({ w: 3.8, h: 4.4, level: 3.4, label: '\\ce{AgNO3(aq)}\\text{ + }\\ce{NaCl(aq)}', solid: { height: 0.5, tex: '\\ce{AgCl(s)}' } }),
    room('pad', [-2.2, -1], [6.4, 5]),
  ],
  420,
);

const video: Explainer = {
  id: 'c20-4-5-d',
  lessonId: 'c20-4-5',
  title: 'Gas and Solution Stoichiometry, Part 4: Solution Stoichiometry',
  thumbnailTitle: 'Solution Stoichiometry',
  thumbnail: 'b',
  summary:
    'The amount of solute in a solution is n = cV, with the volume in litres, and the volume of a solution that holds an amount is V = n/c. 25.0 mL of 0.200 mol/L silver nitrate makes 0.717 g of silver chloride; 0.150 g of magnesium reacts with 49.4 mL of 0.250 mol/L hydrochloric acid; and 20.0 mL of 0.150 mol/L sulfuric acid needs 24.0 mL of 0.250 mol/L sodium hydroxide. The dilution formula leaves out the mole ratio, so it does not work for a reaction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Solution Stoichiometry', subtitle: 'Volume and concentration, in and out' }],
      lines: [
        { say: 'A reaction in solution is measured with a pipette or a burette, not a balance.', show: 'title' },
        { say: 'In this last part, you will use the volume and concentration of a solution in stoichiometry.' },
      ],
    },
    {
      chapter: 'Amount in a solution',
      layout: 'split',
      leftWidth: 520,
      left: [precipitate],
      right: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = cV', 'V = \\dfrac{n}{c}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Volume in litres', md: 'Divide millilitres by 1000 first: $25.0\\ \\text{mL} = 0.0250\\ \\text{L}$.' },
      ],
      lines: [
        { say: 'In a solution, the amount of solute is n equals c V, the concentration times the volume.', show: ['b', 'm.0'], focus: 'm.0' },
        { say: 'And the volume that holds a given amount is V equals n over c.', show: 'm.1', focus: 'm.1' },
        { say: 'The volume must be in litres, so divide millilitres by one thousand first.', show: 'tip' },
      ],
    },
    {
      chapter: 'A silver chloride precipitate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)}$. What mass of $\\ce{AgCl}$ forms from $25.0\\ \\text{mL}$ of $0.200\\ \\text{mol/L}$ $\\ce{AgNO3}$ and excess $\\ce{NaCl}$, to the nearest thousandth? Use Ag $107.87$ and Cl $35.45\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{AgNO3}) = cV = 0.200 \\times 0.0250 = 0.005000\\ \\text{mol}',
            'n(\\ce{AgCl}) = 0.005000 \\times \\dfrac{1}{1} = 0.005000\\ \\text{mol}',
            'M(\\ce{AgCl}) = 107.87 + 35.45 = 143.32\\ \\text{g/mol}',
            'm = 0.005000 \\times 143.32 = 0.7166\\ \\text{g} \\approx \\good{0.717\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Twenty-five point zero millilitres of zero point two zero zero moles per litre silver nitrate reacts with excess sodium chloride. What mass of silver chloride precipitates?', show: 'q' },
        { say: 'Zero point two zero zero times zero point zero two five zero litres is zero point zero zero five zero zero zero moles of silver nitrate.', show: 'm.0', focus: 'm.0' },
        { say: 'One to one, so the same amount of silver chloride. At one hundred forty-three point three two grams per mole, that is zero point seven one seven grams.', show: ['m.1', 'm.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'How much solution reacts?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{Mg + 2HCl -> MgCl2 + H2}$. What volume of $0.250\\ \\text{mol/L}$ $\\ce{HCl}$ reacts exactly with $0.150\\ \\text{g}$ of $\\ce{Mg}$, in millilitres to the nearest tenth? Use Mg $24.31\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['n(\\ce{Mg}) = \\dfrac{0.150}{24.31} = 0.006170\\ \\text{mol}', 'n(\\ce{HCl}) = 0.006170 \\times \\dfrac{2}{1} = 0.01234\\ \\text{mol}', 'V = \\dfrac{n}{c} = \\dfrac{0.01234}{0.250} = 0.04936\\ \\text{L} \\approx \\good{49.4\\ \\text{mL}}'],
        },
      ],
      lines: [
        { say: 'To find the volume of a solution that reacts exactly, find the moles of solute you need, then V equals n over c.' },
        { say: 'What volume of zero point two five zero moles per litre hydrochloric acid reacts exactly with zero point one five zero grams of magnesium?', show: 'q' },
        { say: 'The magnesium is zero point zero zero six one seven zero moles, and it needs twice as much acid: zero point zero one two three four moles.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Divide by the concentration: zero point zero four nine three six litres, which is forty-nine point four millilitres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two solutions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$. What volume of $0.250\\ \\text{mol/L}$ $\\ce{NaOH}$ reacts exactly with $20.0\\ \\text{mL}$ of $0.150\\ \\text{mol/L}$ $\\ce{H2SO4}$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['n(\\ce{H2SO4}) = 0.150 \\times 0.0200 = 0.003000\\ \\text{mol}', 'n(\\ce{NaOH}) = 0.003000 \\times \\dfrac{2}{1} = 0.006000\\ \\text{mol}', 'V = \\dfrac{0.006000}{0.250} = 0.02400\\ \\text{L} = \\good{24.0\\ \\text{mL}}'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'This is not a dilution', md: '$c_1V_1 = c_2V_2$ leaves out the mole ratio: $\\dfrac{0.150 \\times 20.0}{0.250} = 12.0\\ \\text{mL}$ is half the right answer.' },
      ],
      lines: [
        { say: 'When both substances are solutions, start with n equals c V, and end with V equals n over c. What volume of sodium hydroxide reacts exactly with twenty point zero millilitres of sulfuric acid?', show: 'q' },
        { say: 'The acid is zero point zero zero three zero zero zero moles. Each sulfuric acid needs two sodium hydroxide, so zero point zero zero six zero zero zero moles.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Over zero point two five zero moles per litre, that is twenty-four point zero millilitres.', show: 'm.2', focus: 'm.2' },
        { say: 'This is not a dilution. The dilution formula leaves out the mole ratio, and gives twelve point zero millilitres, half the right answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the reaction $\\ce{H3PO4 + 3KOH -> K3PO4 + 3H2O}$, what volume of $0.200\\ \\text{mol/L}$ potassium hydroxide reacts exactly with $15.0\\ \\text{mL}$ of $0.100\\ \\text{mol/L}$ phosphoric acid? Give the answer in millilitres, to the nearest tenth.',
          choices: ['$7.5\\ \\text{mL}$', '$22.5\\ \\text{mL}$', '$2.5\\ \\text{mL}$', '$45.0\\ \\text{mL}$'],
          answer: 1,
          working: '$n(\\ce{H3PO4}) = 0.100 \\times 0.0150 = 0.001500\\ \\text{mol}$, $n(\\ce{KOH}) = 0.001500 \\times \\dfrac{3}{1} = 0.004500\\ \\text{mol}$, and $V = \\dfrac{0.004500}{0.200} = 0.02250\\ \\text{L} = 22.5\\ \\text{mL}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What volume of zero point two zero zero moles per litre potassium hydroxide reacts exactly with fifteen point zero millilitres of zero point one zero zero moles per litre phosphoric acid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty-two point five millilitres. The acid is zero point zero zero one five zero zero moles, and it needs three times as much potassium hydroxide, divided by zero point two zero zero. Choice A uses the dilution formula, and choice C turns the ratio upside down.', show: 'q.answer' },
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
          items: ['A solution: $n = cV$ and $V = \\dfrac{n}{c}$, with $V$ in **litres**.', 'Two solutions: $n = cV$, the mole ratio, then $V = \\dfrac{n}{c}$.', '$c_1V_1 = c_2V_2$ is for dilution only: it leaves out the mole ratio.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a solution, n equals c V, and V equals n over c, with the volume in litres.', show: 'sum.0' },
        { say: 'With two solutions, n equals c V, the mole ratio, then V equals n over c.', show: 'sum.1' },
        { say: 'And the dilution formula is for dilutions only. That completes this lesson. Next, you will find out what happens when one reactant runs out first.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
