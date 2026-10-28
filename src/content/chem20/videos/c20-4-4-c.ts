import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow, type FlowNode } from './lib/c20-4a-figures.ts';

const two = (top: string, bottom: string) => `\\begin{gathered}\\text{${top}}\\\\ ${bottom}\\end{gathered}`;

/** The four boxes of a mass-to-mass problem, given substance first. */
const boxes = (given: string, wanted: string, values?: [string, string, string, string]): FlowNode[] => [
  { id: 'm1', tex: two('mass', given), tone: 'opp', ...(values ? { value: values[0] } : {}) },
  { id: 'n1', tex: two('moles', given), tone: 'brand', ...(values ? { value: values[1] } : {}) },
  { id: 'n2', tex: two('moles', wanted), tone: 'brand', ...(values ? { value: values[2] } : {}) },
  { id: 'm2', tex: two('mass', wanted), tone: 'opp', ...(values ? { value: values[3] } : {}) },
];

// The plan: mass to moles, the mole ratio, moles to mass.
const plan = figure(
  'f',
  [
    flow({
      nodes: boxes('\\text{given}', '\\text{wanted}'),
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div M', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times\\ \\text{ratio}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times M', tone: 'good' },
      ],
      width: 2.9,
      height: 1.9,
      gap: 3.3,
    }),
  ],
  240,
);

// The thermite example worked through the same boxes.
const thermite = figure(
  'w',
  [
    flow({
      nodes: boxes('\\ce{Fe2O3}', '\\ce{Fe}', ['50.0\\ \\text{g}', '0.3131\\ \\text{mol}', '0.6262\\ \\text{mol}', '34.97\\ \\text{g}']),
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 159.70', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\dfrac{2}{1}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times 55.85', tone: 'good' },
      ],
      width: 2.9,
      height: 1.9,
      gap: 3.3,
    }),
  ],
  240,
);

const video: Explainer = {
  id: 'c20-4-4-c',
  lessonId: 'c20-4-4',
  title: 'Mole Ratios and Gravimetric Stoichiometry, Part 3: Gravimetric Stoichiometry',
  thumbnailTitle: 'Gravimetric Stoichiometry',
  thumbnail: 'w',
  summary:
    'Gravimetric stoichiometry finds the mass of one substance in a reaction from the mass of another, through moles: write the balanced equation, change the given mass to moles (n = m/M), use the mole ratio, then change the wanted amount to a mass (m = nM). In the thermite reaction, 50.0 g of Fe₂O₃ is 0.3131 mol, which makes 0.6262 mol, or 35.0 g, of iron.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Gravimetric Stoichiometry', subtitle: 'From a mass to a mass, through moles' }],
      lines: [
        { say: 'A balance measures mass, not moles. So to find the mass of iron a reaction makes from a mass of iron oxide, you pass through moles on the way.', show: 'title' },
        { say: 'In this part, you will find the mass of one substance in a reaction, from the amount or the mass of another.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Gravimetric stoichiometry', md: 'Finding the mass of one substance in a reaction from the mass of another. **Gravimetric** means measured by mass.' },
        plan,
      ],
      lines: [
        { say: 'Gravimetric stoichiometry finds the mass of one substance in a reaction from the mass of another. Gravimetric means measured by mass.', show: 'def' },
        { say: 'Step one: write the balanced equation.', show: ['f.m1', 'f.m2'] },
        { say: 'Step two: change the given mass to moles, by dividing by its molar mass.', show: ['f.a1', 'f.n1'], focus: 'f.a1' },
        { say: 'Step three: use the mole ratio, the wanted coefficient over the given coefficient.', show: ['f.a2', 'f.n2'], focus: 'f.a2' },
        { say: 'Step four: change the wanted amount to a mass, by multiplying by its molar mass. When the given amount is already in moles, skip step two.', show: 'f.a3', focus: 'f.a3' },
      ],
    },
    {
      chapter: 'From moles to a mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'In $\\ce{2Al + 3CuCl2 -> 2AlCl3 + 3Cu}$, what mass of $\\ce{Cu}$ forms from $0.500\\ \\text{mol}$ of $\\ce{Al}$, to the nearest tenth? Use Cu $63.55\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(\\ce{Cu}) = 0.500 \\times \\dfrac{3}{2} = 0.750\\ \\text{mol}', 'm = nM = 0.750 \\times 63.55 = 47.66\\ \\text{g} \\approx \\good{47.7\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'Aluminium reacts with copper two chloride. What mass of copper forms from zero point five zero zero moles of aluminium?', caption: 'Aluminium reacts with copper(II) chloride. What mass of copper forms from 0.500 mol of aluminium?', show: 'q' },
        { say: 'The amount is already in moles, so go straight to the ratio. Zero point five zero zero times three over two is zero point seven five zero moles of copper.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by copper’s molar mass. Zero point seven five zero times sixty-three point five five is forty-seven point six six, or forty-seven point seven grams of copper.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Iron from thermite',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The thermite reaction: $\\ce{2Al + Fe2O3 -> Al2O3 + 2Fe}$. What mass of $\\ce{Fe}$ forms from $50.0\\ \\text{g}$ of $\\ce{Fe2O3}$, to the nearest tenth? Use Fe $55.85$ and O $16.00\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['M(\\ce{Fe2O3}) = 2(55.85) + 3(16.00) = 159.70\\ \\text{g/mol}'] },
        thermite,
        { kind: 'math', id: 'a', size: 'md', lines: ['m(\\ce{Fe}) = 34.97\\ \\text{g} \\approx \\good{35.0\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'The thermite reaction, used to weld steel rails, makes molten iron. What mass of iron forms from fifty point zero grams of iron three oxide?', caption: 'The thermite reaction, used to weld steel rails, makes molten iron. What mass of iron forms from 50.0 g of iron(III) oxide?', show: ['q', 'w.m1', 'w.m1-value'] },
        { say: 'The equation is balanced. The molar mass of iron three oxide is two times fifty-five point eight five, plus three times sixteen: one hundred fifty-nine point seven zero grams per mole.', caption: 'The equation is balanced. The molar mass of iron(III) oxide is 2(55.85) + 3(16.00) = 159.70 g/mol.', show: 'm', focus: 'm' },
        { say: 'So fifty point zero grams is fifty point zero over one hundred fifty-nine point seven zero: zero point three one three one moles.', show: ['w.a1', 'w.n1', 'w.n1-value'], focus: 'w.a1' },
        { say: 'Two iron atoms for each unit of iron three oxide: the ratio is two over one, so zero point six two six two moles of iron.', show: ['w.a2', 'w.n2', 'w.n2-value'], focus: 'w.a2' },
        { say: 'Times fifty-five point eight five, that is thirty-four point nine seven, or thirty-five point zero grams of iron.', show: ['w.a3', 'w.m2', 'w.m2-value', 'a'], focus: ['w.a3', 'a'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the reaction $\\ce{2Mg + O2 -> 2MgO}$, what mass of $\\ce{MgO}$ forms from $6.08\\ \\text{g}$ of $\\ce{Mg}$? Give the answer to the nearest tenth. Use these molar masses: Mg $24.31\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.',
          choices: ['$6.1\\ \\text{g}$', '$10.1\\ \\text{g}$', '$5.0\\ \\text{g}$', '$20.2\\ \\text{g}$'],
          answer: 1,
          working: '$n(\\ce{Mg}) = \\dfrac{6.08}{24.31} = 0.2501\\ \\text{mol}$, so $n(\\ce{MgO}) = 0.2501 \\times \\dfrac{2}{2} = 0.2501\\ \\text{mol}$. $M(\\ce{MgO}) = 40.31\\ \\text{g/mol}$, so $m = 0.2501 \\times 40.31 = 10.08\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium burns in oxygen to form magnesium oxide. What mass of magnesium oxide forms from six point zero eight grams of magnesium? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, ten point one grams. Six point zero eight over twenty-four point three one is zero point two five zero one moles of magnesium, which makes the same amount of magnesium oxide, at forty point three one grams per mole. Choice A puts the grams straight through the ratio.', show: 'q.answer' },
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
          items: ['**Gravimetric stoichiometry**: given mass → moles → mole ratio → moles wanted → mass.', '$n = \\dfrac{m}{M}$ on the way in, and $m = nM$ on the way out.', 'Given an amount in moles? Go straight to the mole ratio.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To go from one mass to another, pass through moles and the mole ratio.', show: 'sum.0' },
        { say: 'Divide by the molar mass on the way in, and multiply by a molar mass on the way out.', show: 'sum.1' },
        { say: 'And when you are given moles, go straight to the ratio. In part four, you will avoid a common slip, and analyse a solution in the lab. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
