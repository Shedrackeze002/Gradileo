import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { link, saturated, tag } from './lib/c30-4a-figures.ts';

// A sealed flask of saturated lead(II) iodide: radioactive solid is added, and radioactive iodide
// ions later turn up in the solution while the mass of solid stays the same.
const flask = figure('f', [saturated()], 470);

// Approaching from either side: flask 1 starts with 6 N₂O₄ (1.00 mol), flask 2 with 12 NO₂
// (2.00 mol), the same atoms; both reach the same mixture of 3 N₂O₄ and 6 NO₂.
const sides = figure(
  's',
  [
    particles({ name: 'a', size: 4.5, state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 6, atoms: 2 }], seed: 4 }),
    particles({ name: 'm', at: [7, 0], size: 4.5, state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 3, atoms: 2 }, { id: 'no2', tone: 'opp', count: 6 }], seed: 9 }),
    // An empty kind of pairs keeps these particles the same size as in the other two flasks.
    particles({ name: 'b', at: [14, 0], size: 4.5, state: 'gas', kinds: [{ id: 'no2', tone: 'opp', count: 12 }, { id: 'none', tone: 'muted', count: 0, atoms: 2 }], seed: 6 }),
    link('fwd', [5, 2.25], [6.6, 2.25], { arrow: true, tone: 'adj' }),
    link('rev', [13.5, 2.25], [11.9, 2.25], { arrow: true, tone: 'opp' }),
    tag('ta', [2.25, 4.7], '\\text{Flask 1}', { place: 'above' }),
    tag('tb', [16.25, 4.7], '\\text{Flask 2}', { place: 'above' }),
    tag('la', [2.25, -0.2], '1.00\\ \\text{mol } \\ce{N2O4}', { place: 'below' }),
    tag('lm', [9.25, -0.2], '\\text{same mixture}', { place: 'below', tone: 'theta' }),
    tag('lb', [16.25, -0.2], '2.00\\ \\text{mol } \\ce{NO2}', { place: 'below' }),
  ],
  330,
);

const video: Explainer = {
  id: 'c30-4-1-b',
  lessonId: 'c30-4-1',
  title: 'Dynamic Equilibrium, Part 2: Features of Equilibrium',
  thumbnailTitle: 'Features of Equilibrium',
  thumbnail: 's',
  summary:
    'At dynamic equilibrium the forward and reverse rates are equal, so concentrations and observable properties stay constant: constant, not equal, and not in the ratio of the coefficients. Radioactive iodide moving from solid lead(II) iodide into its saturated solution shows that the reactions never stop. Equilibria can be phase, solubility or chemical reaction equilibria, and the same equilibrium can be reached from either side.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'Features of Equilibrium', subtitle: 'Constant, not equal' }],
      lines: [
        { say: 'A flask at equilibrium looks perfectly still: its colour and its pressure never change. So what is really going on inside?', show: 'title' },
        { say: 'In this part: what is true of every equilibrium, how we know the reactions never stop, and three kinds of equilibrium.' },
      ],
    },
    {
      chapter: 'What is true at equilibrium',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['At dynamic equilibrium', 'Not true at equilibrium'],
          rows: [
            ['The forward and reverse rates are equal.', 'The reactions have stopped.'],
            ['Concentrations are **constant**.', 'Concentrations are **equal** to each other.'],
            ['Colour and pressure stay constant.', 'Concentrations are in the ratio of the coefficients.'],
            ['It can be reached from either side.', 'It can only be reached from the reactants.'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Equilibrium does not mean equal amounts', md: 'There might be $0.50\\ \\text{mol/L}$ of $\\ce{N2O4}$ and $0.60\\ \\text{mol/L}$ of $\\ce{NO2}$. What is equal is the **rate** of the forward and reverse reactions.' },
      ],
      lines: [
        { say: 'At dynamic equilibrium, the forward and reverse rates are equal. The reactions have not stopped.', show: 'tb.0' },
        { say: 'The concentrations of reactants and products are constant. They are not equal to each other, and not in the ratio of the coefficients.', show: ['tb.1', 'tb.2'], focus: 'tb.1' },
        { say: 'Colour and pressure stay constant. And the same equilibrium can be reached from either side.', show: 'tb.3', focus: ['tb.2', 'tb.3'] },
        { say: 'So equilibrium does not mean equal amounts. A tube might hold zero point five zero moles per litre of dye-nitrogen tetroxide and zero point six zero of nitrogen dioxide. What is equal is the rates.', caption: 'So equilibrium does not mean equal amounts. A tube might hold 0.50 mol/L of dinitrogen tetroxide and 0.60 of nitrogen dioxide. What is equal is the rates.', show: 'oops', focus: 'tb' },
      ],
    },
    {
      chapter: 'Evidence that it never stops',
      layout: 'split',
      leftWidth: 500,
      left: [flask],
      right: [
        { kind: 'math', id: 'eq', size: 'md', align: 'left', lines: ['\\ce{PbI2(s) <=> Pb^2+(aq) + 2I-(aq)}'] },
        { kind: 'bullets', id: 'b', items: ['The mass of solid stays the same.', 'Radioactive iodide ions appear in the solution.', 'Solid keeps dissolving, and ions keep crystallising, **at the same rate**.'] },
      ],
      lines: [
        { say: 'How do we know the reactions are still going, if nothing seems to change? A sealed flask holds a saturated solution of lead two iodide, with solid at the bottom.', caption: 'How do we know the reactions are still going, if nothing seems to change? A sealed flask holds a saturated solution of lead(II) iodide, with solid at the bottom.', show: ['f.flask', 'f.solution', 'f.solid', 'f.ions', 'eq'] },
        { say: 'A little solid lead two iodide, made with radioactive iodine, is added.', caption: 'A little solid lead(II) iodide, made with radioactive iodine, is added.', show: ['f.hot-solid', 'f.key'], focus: 'f.hot-solid' },
        { say: 'The mass of solid at the bottom stays the same. Yet radioactive iodide ions soon turn up in the solution.', show: ['b.0', 'b.1', 'f.hot-ions'], focus: 'f.hot-ions' },
        { say: 'So solid keeps dissolving and ions keep crystallising, at the same rate. The equilibrium is dynamic.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Three kinds of equilibrium',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Kind', 'Example', 'What is in balance'],
          rows: [
            ['Phase', '$\\ce{Br2(l) <=> Br2(g)}$', 'One substance in two states'],
            ['Solubility', '$\\ce{PbI2(s) <=> Pb^2+(aq) + 2I-(aq)}$', 'A solid and its saturated solution'],
            ['Chemical reaction', '$\\ce{N2O4(g) <=> 2NO2(g)}$', 'New substances form and react back'],
          ],
        },
      ],
      lines: [
        { say: 'Equilibria come in three kinds. In a phase equilibrium, one substance is present in two states.', show: 'k.0' },
        { say: 'In a sealed flask of liquid bromine, the orange-brown vapour stops getting darker: molecules now evaporate and condense at equal rates.', focus: 'k.0' },
        { say: 'In a solubility equilibrium, a solid is in contact with its saturated solution, like the lead two iodide.', caption: 'In a solubility equilibrium, a solid is in contact with its saturated solution, like the lead(II) iodide.', show: 'k.1', focus: 'k.1' },
        { say: 'In a chemical reaction equilibrium, new substances form and react back, like dye-nitrogen tetroxide and nitrogen dioxide.', caption: 'In a chemical reaction equilibrium, new substances form and react back, like dinitrogen tetroxide and nitrogen dioxide.', show: 'k.2', focus: 'k.2' },
      ],
    },
    {
      chapter: 'From either side',
      layout: 'center',
      main: [
        sides,
        { kind: 'text', id: 't', size: 'md', align: 'center', md: '$2.00\\ \\text{mol}$ of $\\ce{NO2}$ is exactly what $1.00\\ \\text{mol}$ of $\\ce{N2O4}$ would make: the same atoms, the same flask size, the same temperature.' },
      ],
      lines: [
        { say: 'Flask one starts with one mole of dye-nitrogen tetroxide. Flask two, the same size and temperature, starts with two moles of nitrogen dioxide.', caption: 'Flask 1 starts with 1.00 mol of dinitrogen tetroxide. Flask 2, the same size and temperature, starts with 2.00 mol of nitrogen dioxide.', show: ['s.a-box', 's.a-n2o4', 's.ta', 's.la', 's.b-box', 's.b-no2', 's.tb', 's.lb'] },
        { say: 'Two moles of nitrogen dioxide is exactly what one mole of dye-nitrogen tetroxide would make, so both flasks hold the same atoms.', caption: 'Two moles of nitrogen dioxide is exactly what one mole of dinitrogen tetroxide would make, so both flasks hold the same atoms.', show: 't' },
        { say: 'Flask one gets there by the forward reaction, and flask two by the reverse reaction. They end with the same mixture: an equilibrium can be approached from either side.', show: ['s.fwd', 's.rev', 's.m-box', 's.m-n2o4', 's.m-no2', 's.lm'], focus: ['s.m-box', 's.lm'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A reversible reaction in a sealed flask at constant temperature has reached dynamic equilibrium. Which statement is true?',
          choices: ['The forward and reverse reactions have stopped.', 'The concentrations of the reactants and products are equal.', 'Equilibrium can be reached only by starting from the reactants.', 'The forward and reverse reactions continue at equal rates.'],
          answer: 3,
          working: 'At dynamic equilibrium both reactions keep going at equal rates, so the concentrations stay constant, but not necessarily equal. It can be reached from either side.',
        },
      ],
      lines: [
        { say: 'Your turn. A reversible reaction in a sealed flask at constant temperature has reached dynamic equilibrium. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: both reactions continue, at equal rates. Choice B is the tempting one, but the concentrations are constant, not equal.', show: 'q.answer' },
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
            'At equilibrium the rates are equal, and concentrations are **constant**, not equal.',
            'Radioactive iodide moving into the solution shows that the reactions never stop.',
            'Equilibria can be **phase**, **solubility** or **chemical reaction** equilibria.',
            'The same equilibrium can be reached from the reactants or from the products.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At equilibrium, the forward and reverse rates are equal, and the concentrations are constant, not equal.', show: 'sum.0' },
        { say: 'Radioactive iodide in the solution shows that the reactions never stop. Equilibria can be phase, solubility or chemical reaction equilibria.', show: ['sum.1', 'sum.2'] },
        { say: 'And the same equilibrium can be reached from either side. In part three, you will read an equilibrium from a graph of concentration against time. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
