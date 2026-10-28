import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c10-5-figures.ts';

// The three steps from a mass of one substance to a mass of another.
const plan = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'm1', tex: '\\begin{gathered}\\text{mass}\\\\ \\text{given}\\end{gathered}', tone: 'opp' },
        { id: 'n1', tex: '\\begin{gathered}\\text{moles}\\\\ \\text{given}\\end{gathered}', tone: 'brand' },
        { id: 'n2', tex: '\\begin{gathered}\\text{moles}\\\\ \\text{wanted}\\end{gathered}', tone: 'brand' },
        { id: 'm2', tex: '\\begin{gathered}\\text{mass}\\\\ \\text{wanted}\\end{gathered}', tone: 'opp' },
      ],
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div M', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\text{ratio}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times M', tone: 'good' },
      ],
      width: 2.6,
      height: 1.9,
      gap: 2.4,
    }),
  ],
  230,
);

// The same steps for magnesium oxide made from 7.29 g of magnesium.
const worked = figure(
  'w',
  [
    flow({
      nodes: [
        { id: 'm1', tex: '\\begin{gathered}\\text{mass}\\\\ \\ce{Mg}\\end{gathered}', tone: 'opp', value: '7.29\\ \\text{g}' },
        { id: 'n1', tex: '\\begin{gathered}\\text{moles}\\\\ \\ce{Mg}\\end{gathered}', tone: 'brand', value: '0.30\\ \\text{mol}' },
        { id: 'n2', tex: '\\begin{gathered}\\text{moles}\\\\ \\ce{MgO}\\end{gathered}', tone: 'brand', value: '0.30\\ \\text{mol}' },
        { id: 'm2', tex: '\\begin{gathered}\\text{mass}\\\\ \\ce{MgO}\\end{gathered}', tone: 'opp', value: '12.09\\ \\text{g}' },
      ],
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 24.3', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\tfrac{2}{2}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times 40.3', tone: 'good' },
      ],
      width: 2.6,
      height: 1.9,
      gap: 2.4,
    }),
  ],
  230,
);

const video: Explainer = {
  id: 'c10-5-2-d',
  lessonId: 'c10-5-2',
  title: 'Moles, Mass and Particles, Part 4: From Mass to Mass',
  thumbnailTitle: 'From Mass to Mass',
  thumbnail: 'w',
  summary:
    'A balance measures grams, but an equation counts moles, so a mass-to-mass problem goes through moles in three steps: mass to moles, the mole ratio, and moles to mass. In 2Mg + O₂ → 2MgO, 7.29 g of magnesium is 0.30 mol, which makes 0.30 mol, or 12.1 g, of magnesium oxide. The conservation of mass checks the answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 4', title: 'From Mass to Mass', subtitle: 'Three steps through moles' }],
      lines: [
        { say: 'A balance measures grams, but a balanced equation counts moles. So how much product can you make from a mass of reactant?', show: 'title' },
        { say: 'In this last part, you will go from the mass of one substance to the mass of another, through moles, in three steps.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        plan,
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '**Mass to moles**: $n = \\dfrac{m}{M}$ for the substance you know.',
            '**Mole ratio**: use the coefficients to find the moles of the substance you want.',
            '**Moles to mass**: $m = n \\times M$ for the substance you want.',
          ],
        },
      ],
      lines: [
        { say: 'You cannot use the coefficients on grams. So start from the mass you know, and go through moles.', show: ['f.m1', 'f.m2'] },
        { say: 'Step one: mass to moles. Divide the mass you know by its molar mass.', show: ['f.n1', 'f.a1', 'steps.0'], focus: ['f.a1', 'steps.0'] },
        { say: 'Step two: the mole ratio. Use the coefficients to find the moles of the substance you want.', show: ['f.n2', 'f.a2', 'steps.1'], focus: ['f.a2', 'steps.1'] },
        { say: 'Step three: moles to mass. Multiply by the molar mass of the substance you want.', show: ['f.a3', 'steps.2'], focus: ['f.a3', 'steps.2'] },
      ],
    },
    {
      chapter: 'Magnesium oxide from magnesium',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Magnesium burns in oxygen: $\\ce{2Mg + O2 -> 2MgO}$. What mass of $\\ce{MgO}$ forms from $7.29\\ \\text{g}$ of $\\ce{Mg}$, to the nearest tenth? The molar masses are $\\ce{Mg}$ $24.3\\ \\text{g/mol}$ and $\\ce{MgO}$ $40.3\\ \\text{g/mol}$.' },
        worked,
        { kind: 'math', id: 'm', size: 'lg', lines: ['m(\\ce{MgO}) = 12.09\\ \\text{g} \\approx \\good{12.1\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'Magnesium burns in oxygen to make magnesium oxide. What mass of magnesium oxide forms from seven point two nine grams of magnesium?', show: ['q', 'w.m1', 'w.m1-value'] },
        { say: 'Step one: seven point two nine grams, divided by twenty-four point three grams per mole, is zero point three zero moles of magnesium.', show: ['w.a1', 'w.n1', 'w.n1-value'], focus: 'w.a1' },
        { say: 'Step two: the mole ratio of magnesium to magnesium oxide is two to two. So zero point three zero moles of magnesium makes zero point three zero moles of magnesium oxide.', show: ['w.a2', 'w.n2', 'w.n2-value'], focus: 'w.a2' },
        { say: 'Step three: zero point three zero moles, times forty point three grams per mole, is twelve point zero nine grams.', show: ['w.a3', 'w.m2', 'w.m2-value'], focus: 'w.a3' },
        { say: 'To the nearest tenth, twelve point one grams of magnesium oxide.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check with the conservation of mass',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with the conservation of mass', md: 'The mass of the reactants equals the mass of the products. Use $M(\\ce{O2}) = 32.0\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(\\ce{O2}) = 0.30 \\times \\dfrac{1}{2} = 0.15\\ \\text{mol}', 'm(\\ce{O2}) = 0.15 \\times 32.0 = 4.80\\ \\text{g}', '7.29 + 4.80 = 12.09\\ \\text{g} \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'You can check the answer with the conservation of mass, from lesson four point one.', show: 'tip' },
        { say: 'The oxygen used is half as many moles as the magnesium: zero point one five moles.', show: 'm.0', focus: 'm.0' },
        { say: 'Oxygen gas is thirty-two point zero grams per mole, so that is four point eight zero grams of oxygen.', show: 'm.1', focus: 'm.1' },
        { say: 'Together the reactants have a mass of seven point two nine plus four point eight zero, which is twelve point zero nine grams: exactly the mass of magnesium oxide formed. Mass is conserved.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hydrogen burns in oxygen to make water: $\\ce{2H2 + O2 -> 2H2O}$. What mass of $\\ce{H2O}$ forms from $4.0\\ \\text{g}$ of $\\ce{H2}$? The molar masses are $\\ce{H2}$ $2.0\\ \\text{g/mol}$ and $\\ce{H2O}$ $18.0\\ \\text{g/mol}$.',
          choices: ['$4.0\\ \\text{g}$', '$36.0\\ \\text{g}$', '$72.0\\ \\text{g}$', '$18.0\\ \\text{g}$'],
          answer: 1,
          working: '$n(\\ce{H2}) = \\dfrac{4.0}{2.0} = 2.0\\ \\text{mol}$; the ratio is $2 : 2$, so $n(\\ce{H2O}) = 2.0\\ \\text{mol}$; $m(\\ce{H2O}) = 2.0 \\times 18.0 = 36.0\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen burns in oxygen to make water. What mass of water forms from four point zero grams of hydrogen? Use the molar masses on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-six point zero grams. Four point zero over two point zero is two point zero moles of hydrogen, which makes two point zero moles of water, and two point zero times eighteen point zero is thirty-six point zero. Choice A treats the ratio as grams.', show: 'q.answer' },
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
            'Mass to mass in three steps: mass → moles, mole ratio, moles → mass.',
            '$7.29\\ \\text{g}$ of $\\ce{Mg}$ is $0.30\\ \\text{mol}$, which makes $0.30\\ \\text{mol}$ of $\\ce{MgO}$: $12.1\\ \\text{g}$.',
            'Check with the conservation of mass: the reactants and the products have the same mass.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To go from mass to mass, use three steps: mass to moles, the mole ratio, then moles to mass.', show: 'sum.0' },
        { say: 'Seven point two nine grams of magnesium is zero point three zero moles, which makes twelve point one grams of magnesium oxide.', show: 'sum.1' },
        { say: 'And you can check with the conservation of mass. Now you can turn any mass into moles, particles, or the mass of another substance. Thanks for watching!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
