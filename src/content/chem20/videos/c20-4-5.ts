import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4b-figures.ts';

const two = (top: string, bottom: string) => `\\begin{gathered}${top}\\\\ ${bottom}\\end{gathered}`;

// The path of every stoichiometry problem: into moles, the mole ratio, and out of moles.
const route = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'q1', tex: two('\\text{given}', '\\text{quantity}'), tone: 'opp' },
        { id: 'n1', tex: two('\\text{moles}', '\\text{given}') },
        { id: 'n2', tex: two('\\text{moles}', '\\text{wanted}') },
        { id: 'q2', tex: two('\\text{wanted}', '\\text{quantity}'), tone: 'opp' },
      ],
      arrows: [
        { id: 'a1', from: 'q1', to: 'n1', tex: '\\text{in}', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times\\ \\text{ratio}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'q2', tex: '\\text{out}', tone: 'good' },
      ],
      width: 3.8,
      height: 1.9,
      gap: 3.0,
    }),
  ],
  230,
);

// Nitrogen from 65.0 g of sodium azide at SATP, through the same boxes.
const airbag = figure(
  'w',
  [
    flow({
      nodes: [
        { id: 'm1', tex: two('\\text{mass}', '\\ce{NaN3}'), tone: 'opp', value: '65.0\\ \\text{g}' },
        { id: 'n1', tex: two('\\text{moles}', '\\ce{NaN3}'), value: '0.9997\\ \\text{mol}' },
        { id: 'n2', tex: two('\\text{moles}', '\\ce{N2}'), value: '1.500\\ \\text{mol}' },
        { id: 'v2', tex: two('\\text{volume}', '\\ce{N2}'), tone: 'adj', value: '37.2\\ \\text{L}' },
      ],
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 65.02', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\dfrac{3}{2}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'v2', tex: '\\times 24.8', tone: 'good' },
      ],
      width: 3.2,
      height: 1.9,
      gap: 3.4,
    }),
  ],
  250,
);

const video: Explainer = {
  id: 'c20-4-5',
  lessonId: 'c20-4-5',
  title: 'Gas and Solution Stoichiometry, Part 1: Gases at STP and SATP',
  thumbnailTitle: 'Gases at STP and SATP',
  thumbnail: 'w',
  summary:
    'Gases and solutions follow the same stoichiometry path as masses: change the given quantity to moles, use the mole ratio, then change the moles to the quantity you want. A gas at STP or SATP is changed with its molar volume, 22.4 L/mol at STP and 24.8 L/mol at SATP: 65.0 g of sodium azide in an airbag gives 37.2 L of nitrogen at SATP.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Gases at STP and SATP', subtitle: 'From grams of solid to litres of gas' }],
      lines: [
        { say: 'A car’s airbag fills in less than a tenth of a second, as a small charge of sodium azide breaks down into sodium and nitrogen gas.', show: 'title' },
        { say: 'Nobody can weigh the nitrogen as the bag fills, but its volume can be calculated.' },
        { say: 'In this lesson, you will do stoichiometry with gases and solutions. This part works with gases at S T P and S A T P. Later parts work backwards, use the ideal gas law, and use solutions.' },
      ],
    },
    {
      chapter: 'The same path through moles',
      layout: 'center',
      main: [
        route,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Gas and solution stoichiometry', md: '**Gas stoichiometry** uses a balanced equation to relate the volume of a gas to the amount, mass or volume of another substance. **Solution stoichiometry** does the same for the volume and concentration of a solution.' },
      ],
      lines: [
        { say: 'Every stoichiometry problem follows the same path: into moles, the mole ratio, and out of moles again.', show: 'f', focus: 'f.a2' },
        { say: 'Gases and solutions are measured by volume, not weighed, so only the first and last steps change.', focus: ['f.a1', 'f.a3'] },
        { say: 'With a gas volume, this is called gas stoichiometry. With the volume and concentration of a solution, it is solution stoichiometry.', show: 'def', focus: 'f' },
      ],
    },
    {
      chapter: 'Ways in and out of moles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Measured by', 'To find moles', 'From moles back'],
          rows: [
            ['mass', '$n = \\dfrac{m}{M}$', '$m = nM$'],
            ['a gas at STP or SATP', '$n = \\dfrac{V}{V_m}$', '$V = nV_m$'],
            ['a gas at other conditions', '$n = \\dfrac{PV}{RT}$', '$V = \\dfrac{nRT}{P}$'],
            ['a solution', '$n = cV$', '$V = \\dfrac{n}{c}$'],
          ],
        },
        { kind: 'callout', id: 'ex', tone: 'key', title: 'In excess', md: 'A reactant **in excess** never runs out, so the other reactant decides how much product forms.' },
      ],
      lines: [
        { say: 'Here are the ways in and out of moles. For a mass, n equals m over M.', show: 't.0', focus: 't.0' },
        { say: 'For a gas at S T P or S A T P, n equals V over the molar volume.', show: 't.1', focus: 't.1' },
        { say: 'At other conditions, use the ideal gas law. And for a solution, n equals c V.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'When a reactant is in excess, there is more than enough of it, so the other reactant decides how much product forms.', show: 'ex', focus: 't' },
      ],
    },
    {
      chapter: 'Molar volume',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{STP } (0^\\circ\\text{C},\\ 101.325\\ \\text{kPa})\\text{:} \\quad V_m = 22.4\\ \\text{L/mol}', '\\text{SATP } (25^\\circ\\text{C},\\ 100\\ \\text{kPa})\\text{:} \\quad V_m = 24.8\\ \\text{L/mol}', 'V = nV_m'],
        },
      ],
      lines: [
        { say: 'One mole of any gas fills the same volume at the same temperature and pressure: the molar volume.' },
        { say: 'At S T P, zero degrees Celsius and one hundred one point three two five kilopascals, it is twenty-two point four litres per mole.', show: 'm.0', focus: 'm.0' },
        { say: 'At S A T P, twenty-five degrees and one hundred kilopascals, it is twenty-four point eight.', show: 'm.1', focus: 'm.1' },
        { say: 'So the volume of a gas is its moles times the molar volume.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Filling an airbag',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'An airbag inflates: $\\ce{2NaN3 -> 2Na + 3N2}$. What volume of $\\ce{N2}$ at SATP forms from $65.0\\ \\text{g}$ of $\\ce{NaN3}$, to the nearest tenth? At SATP, $V_m = 24.8\\ \\text{L/mol}$. Use Na $22.99$ and N $14.01\\ \\text{g/mol}$.' },
        airbag,
        { kind: 'math', id: 'm', size: 'md', lines: ['M(\\ce{NaN3}) = 22.99 + 3(14.01) = 65.02\\ \\text{g/mol}'] },
      ],
      lines: [
        { say: 'Two units of sodium azide give two sodium atoms and three nitrogen molecules. What volume of nitrogen at S A T P forms from sixty-five point zero grams?', caption: '2NaN₃ → 2Na + 3N₂. What volume of nitrogen at SATP forms from 65.0 g of sodium azide?', show: ['q', 'w.m1', 'w.m1-value'] },
        { say: 'Sodium azide is sixty-five point zero two grams per mole, so that is zero point nine nine nine seven moles.', show: ['m', 'w.a1', 'w.n1', 'w.n1-value'], focus: 'w.a1' },
        { say: 'Nitrogen to sodium azide is three to two. Times three over two, that is one point five zero zero moles of nitrogen.', show: ['w.a2', 'w.n2', 'w.n2-value'], focus: 'w.a2' },
        { say: 'At S A T P, times twenty-four point eight: thirty-seven point two litres of gas, from sixty-five grams of solid.', show: ['w.a3', 'w.v2', 'w.v2-value'], focus: 'w.a3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Zinc reacts with excess hydrochloric acid: $\\ce{Zn + 2HCl -> ZnCl2 + H2}$. What volume of $\\ce{H2}$ at SATP forms from $6.54\\ \\text{g}$ of $\\ce{Zn}$? Give the answer to the nearest hundredth. At SATP, the molar volume of a gas is $24.8\\ \\text{L/mol}$. Use the molar mass Zn $65.38\\ \\text{g/mol}$.',
          choices: ['$2.24\\ \\text{L}$', '$4.96\\ \\text{L}$', '$2.48\\ \\text{L}$', '$162.19\\ \\text{L}$'],
          answer: 2,
          working: '$n(\\ce{Zn}) = \\dfrac{6.54}{65.38} = 0.1000\\ \\text{mol}$, so $n(\\ce{H2}) = 0.1000 \\times \\dfrac{1}{1} = 0.1000\\ \\text{mol}$, and $V = 0.1000 \\times 24.8 = 2.48\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Zinc reacts with excess hydrochloric acid. What volume of hydrogen at S A T P forms from six point five four grams of zinc? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two point four eight litres. Six point five four grams is zero point one zero zero zero moles of zinc, and so of hydrogen, times twenty-four point eight. Choice A uses the molar volume at S T P instead.', show: 'q.answer' },
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
            'Change the given quantity to **moles**, use the **mole ratio**, then change the moles to the quantity you want.',
            'A gas at STP or SATP: $n = \\dfrac{V}{V_m}$ and $V = nV_m$.',
            '$V_m = 22.4\\ \\text{L/mol}$ at STP and $24.8\\ \\text{L/mol}$ at SATP.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Into moles, the mole ratio, and out of moles.', show: 'sum.0' },
        { say: 'For a gas at S T P or S A T P, use the molar volume.', show: 'sum.1' },
        { say: 'The molar volume is twenty-two point four litres per mole at S T P, and twenty-four point eight at S A T P. In part two, you will work backwards, from a gas to a mass. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
