import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import activation from '@/content/chem30/videos/c30-1-7.ts';
import catalysts from '@/content/chem30/videos/c30-1-7-c.ts';
import { peDiagram } from '@/content/chem30/videos/lib/c30-1b-figures.ts';

// Exam question for Chemistry 30 lesson 1.7 (activation energy and catalysts): from the potential
// energies of the reactants (80 kJ), the activated complex (205 kJ) and the products (35 kJ), find
// both activation energies and delta H, classify the reaction, then do the same with a catalyst that
// lowers the activated complex to 155 kJ. Gradileo's own question. The answer: Ea(fwd) = 125 kJ,
// Ea(rev) = 170 kJ, delta H = -45 kJ, exothermic; with the catalyst Ea(fwd) = 75 kJ, Ea(rev) = 120 kJ
// and delta H is still -45 kJ.
//
// The pictures are simulated particles (src/video/particles.ts) from the lesson: hydrogen and oxygen
// that only react once a spark gets collisions over the barrier, and the same mixture in two boxes
// where the one with the lower barrier makes water first; and the reaction's potential energy
// diagram, without and with the catalyst.

const LEVELS = { reactants: 80, products: 35, peak: 205, max: 250, step: 50, grid: 25 } as const;

/** The potential energy diagram without a catalyst. */
const plain = figure('e', [peDiagram({ ...LEVELS, labels: { fwd: '125\\ \\text{kJ}', rev: '170\\ \\text{kJ}', dh: '-45\\ \\text{kJ}' } })], 520);

/** The same diagram with the catalysed hump, reaching 155 kJ. */
const withCat = figure('c', [peDiagram({ ...LEVELS, catalyst: 155, places: { reactants: 'below right' }, labels: { catFwd: '75\\ \\text{kJ}', catRev: '120\\ \\text{kJ}' } })], 520);

const QUESTION =
  'In a reaction, the reactants have a potential energy of 80 kJ, the activated complex 205 kJ and the products 35 kJ. (a) Find the activation energy of the forward reaction, the activation energy of the reverse reaction, and ΔH. (b) Is the forward reaction exothermic or endothermic? (c) A catalyst lowers the activated complex to 155 kJ. Find the new forward and reverse activation energies, and ΔH with the catalyst.';

const video: Explainer = {
  id: 'xq-c30-1-7',
  lessonId: '',
  exam: {
    lesson: 'c30-1-7',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: What Does a Catalyst Change? Activation Energy and Catalysts',
  thumbnailTitle: 'What Does a Catalyst Change?',
  thumbnail: 'c',
  summary:
    'A test-style question, solved one small step at a time: from three potential energy levels we find both activation energies and ΔH, decide the reaction is exothermic, and see that a catalyst lowers both activation energies by the same amount while ΔH stays at −45 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does a Catalyst Change?', subtitle: 'Activation energies and ΔH from a potential energy diagram' }],
      lines: [
        { say: 'In this video, we solve a test-style question about activation energy and catalysts. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a high school chemistry unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt:
            'The reactants have a potential energy of $80\\ \\text{kJ}$, the activated complex $205\\ \\text{kJ}$ and the products $35\\ \\text{kJ}$. (a) Find $E_a(\\text{fwd})$, $E_a(\\text{rev})$ and $\\Delta H$. (b) Is the forward reaction exothermic or endothermic? (c) A catalyst lowers the activated complex to $155\\ \\text{kJ}$. Find the new $E_a(\\text{fwd})$ and $E_a(\\text{rev})$, and $\\Delta H$ with the catalyst.',
          answer: '(a) 125 kJ, 170 kJ, −45 kJ (b) exothermic (c) 75 kJ, 120 kJ, ΔH still −45 kJ',
        },
      ],
      lines: [
        { say: 'Here is the question. In a reaction, the reactants have a potential energy of eighty kilojoules, the activated complex two hundred and five, and the products thirty five.', show: 'q' },
        { say: 'Part a: find the forward and reverse activation energies, and delta H. Part b: is the forward reaction exothermic or endothermic? Part c: a catalyst lowers the activated complex to one hundred and fifty five kilojoules. Find the new activation energies, and delta H with the catalyst.', caption: '(a) Find Ea(fwd), Ea(rev) and ΔH. (b) Is the forward reaction exothermic or endothermic? (c) A catalyst lowers the activated complex to 155 kJ. Find the new Ea(fwd) and Ea(rev), and ΔH with the catalyst.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Three energy **levels** give three **differences**. Then see which ones a **catalyst** changes' }],
      lines: [
        { say: 'Every answer here is a difference between two of the energy levels. Then we lower the top level and see which differences change.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(activation, 'sk')],
      lines: [
        { say: 'Here is what we need. Hydrogen and oxygen at room temperature. They collide all the time, but almost every collision is too gentle to react. Now a spark heats them for a moment.', show: ['sk', 'sk.labels', 'sk.tally', 'sk.thermo'], play: 'sk.spark' },
        { say: 'The fastest molecules collide hard enough to get over the barrier, and water forms. That barrier is the activation energy: the climb from the reactants up to the activated complex at the top.' },
        { say: 'Going backwards, from the products, the climb to the same top is the reverse activation energy. And delta H is products minus reactants.', caption: 'Going backwards, from the products, the climb to the same top is the reverse activation energy. And ΔH is products minus reactants.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'math', id: 'plan', size: 'md', lines: ['E_a(\\text{fwd}) = \\text{complex} - \\text{reactants}', 'E_a(\\text{rev}) = \\text{complex} - \\text{products}', '\\Delta H = \\text{products} - \\text{reactants}'] }],
      lines: [
        { say: 'Here is the plan. The forward activation energy is the activated complex minus the reactants.', show: 'plan.0' },
        { say: 'The reverse activation energy is the activated complex minus the products.', show: 'plan.1' },
        { say: 'And delta H is the products minus the reactants. Then we repeat with the catalyst\'s lower complex.', show: 'plan.2', caption: 'And ΔH is the products minus the reactants. Then we repeat with the catalyst\'s lower complex.' },
      ],
    },
    {
      chapter: 'Step 1: Draw the diagram',
      layout: 'split',
      leftWidth: 560,
      left: [plain],
      right: [{ kind: 'math', id: 'a', size: 'md', lines: ['E_a(\\text{fwd}) = 205 - 80 = \\good{125\\ \\text{kJ}}', 'E_a(\\text{rev}) = 205 - 35 = \\good{170\\ \\text{kJ}}', '\\Delta H = 35 - 80 = \\good{-45\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step one. Here is the reaction\'s potential energy diagram: the reactants at eighty, the activated complex at two hundred and five, and the products at thirty five kilojoules.', show: ['e.axes', 'e.grid', 'e.curve', 'e.reactants', 'e.products', 'e.complex'] },
        { say: 'The forward climb is two hundred and five minus eighty: one hundred and twenty five kilojoules.', show: ['e.fwd', 'a.0'], focus: ['e.fwd', 'a.0'] },
        { say: 'The reverse climb, from the products, is two hundred and five minus thirty five: one hundred and seventy kilojoules.', show: ['e.rev', 'a.1'], focus: ['e.rev', 'a.1'] },
        { say: 'And delta H is thirty five minus eighty: minus forty five kilojoules.', show: ['e.dh', 'a.2'], focus: ['e.dh', 'a.2'], caption: 'And ΔH is 35 − 80 = −45 kJ.' },
      ],
    },
    {
      chapter: 'Step 2: Exothermic or endothermic?',
      layout: 'split',
      leftWidth: 560,
      left: [plain],
      right: [{ kind: 'math', id: 'b', size: 'md', lines: ['\\text{products below reactants}', '\\Delta H < 0 \\Rightarrow \\good{\\text{exothermic}}'] }],
      lines: [
        { say: 'Step two. The products sit below the reactants, so the reaction ends lower in energy than it starts. The difference is released.', show: ['e.axes', 'e.grid', 'e.curve', 'e.reactants', 'e.products', 'e.dh', 'b.0'], focus: 'e.dh' },
        { say: 'Delta H is negative, so the forward reaction is exothermic.', show: 'b.1', focus: 'b.1', caption: 'ΔH is negative, so the forward reaction is exothermic.' },
      ],
    },
    {
      chapter: 'Step 3: Add a catalyst',
      layout: 'center',
      main: [pick(catalysts, 'ct')],
      lines: [
        { say: 'Step three. Here is a mixture of hydrogen and oxygen in two boxes, at the same temperature. The right box has a lower barrier, as a catalyst gives. Watch the water count.', show: ['ct', 'ct.labels', 'ct.tally', 'ct.thermo'], play: 'ct.go' },
        { say: 'The particles move at the same speeds in both boxes, but on the right many more collisions get over the lower barrier. A catalyst gives the reaction a path with a lower activated complex.', focus: 'ct.tally' },
      ],
    },
    {
      chapter: 'Step 4: The new activation energies',
      layout: 'split',
      leftWidth: 560,
      left: [withCat],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['E_a(\\text{fwd}) = 155 - 80 = \\good{75\\ \\text{kJ}}', 'E_a(\\text{rev}) = 155 - 35 = \\good{120\\ \\text{kJ}}', '\\Delta H = 35 - 80 = \\good{-45\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step four. Here is the reaction without the catalyst, in grey, and with it, in green. The catalysed hump reaches only one hundred and fifty five kilojoules.', show: ['c.axes', 'c.grid', 'c.curve', 'c.cat-curve', 'c.reactants', 'c.products', 'c.no-cat', 'c.cat'], focus: 'c.cat-curve' },
        { say: 'The forward activation energy is now one hundred and fifty five minus eighty: seventy five kilojoules. The reverse one is one hundred and fifty five minus thirty five: one hundred and twenty.', show: ['c.cat-fwd', 'c.cat-rev', 'm.0', 'm.1'], focus: ['c.cat-fwd', 'c.cat-rev'] },
        { say: 'But the reactants and products have not moved, so delta H is still minus forty five kilojoules.', show: 'm.2', focus: 'm.2', caption: 'But the reactants and products have not moved, so ΔH is still −45 kJ.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['', 'No catalyst (kJ)', 'Catalyst (kJ)'],
          rows: [
            ['$E_a(\\text{fwd})$', '$125$', '$75$'],
            ['$E_a(\\text{rev})$', '$170$', '$120$'],
            ['$\\Delta H$', '$-45$', '$-45$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the answers side by side. Both activation energies fell by fifty kilojoules, the same amount, so the catalyst speeds up the forward and reverse reactions alike.', show: ['k', 'k.0', 'k.1'], focus: ['k.0', 'k.1'] },
        { say: 'Check: the forward activation energy minus the reverse one should equal delta H. One hundred and twenty five minus one hundred and seventy is minus forty five, and seventy five minus one hundred and twenty is too. Both agree.', show: 'k.2', focus: 'k.2', caption: 'Check: Ea(fwd) − Ea(rev) should equal ΔH. 125 − 170 = −45, and 75 − 120 = −45. Both agree.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['$E_a(\\text{fwd}) = 205\\ \\text{kJ}$', 'Read the **top level**, not the climb from the reactants'],
            ['$E_a(\\text{rev}) = 125\\ \\text{kJ}$', 'Measured the reverse climb from the **reactants**'],
            ['$\\Delta H$ becomes $-95\\ \\text{kJ}$', 'Thought the catalyst **changes** $\\Delta H$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Giving two hundred and five as the activation energy. That is the height of the complex. The activation energy is the climb from the reactants.', focus: 'traps.0' },
        { say: 'Measuring the reverse activation energy from the reactants. The reverse reaction starts from the products.', focus: 'traps.1' },
        { say: 'And changing delta H with the catalyst. A catalyst lowers the hump, but the reactants and products stay where they are.', focus: 'traps.2', caption: 'And changing ΔH with the catalyst. A catalyst lowers the hump, but the reactants and products stay where they are.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A reaction has $E_a(\\text{fwd}) = 60\\ \\text{kJ}$ and $\\Delta H = +25\\ \\text{kJ}$. What is $E_a(\\text{rev})$?',
          choices: ['$85\\ \\text{kJ}$', '$35\\ \\text{kJ}$', '$-35\\ \\text{kJ}$', '$25\\ \\text{kJ}$'],
          answer: 1,
          working: 'The products sit $25\\ \\text{kJ}$ above the reactants, so the climb back to the top is $60 - 25 = 35\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction has a forward activation energy of sixty kilojoules and a delta H of plus twenty five. What is the reverse activation energy? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A reaction has Ea(fwd) = 60 kJ and ΔH = +25 kJ. What is Ea(rev)? Pause the video and try it.' },
        { say: 'The products sit twenty five kilojoules above the reactants, so the climb from the products to the top is sixty minus twenty five, thirty five kilojoules: choice B.', show: 'q2.answer', caption: 'The products sit 25 kJ above the reactants, so the climb from the products to the top is 60 − 25 = 35 kJ: choice B.' },
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
          items: ['$E_a$ is the **climb** to the activated complex, forward or reverse', '$\\Delta H$ = **products minus reactants** $= E_a(\\text{fwd}) - E_a(\\text{rev})$', 'A catalyst lowers **both** $E_a$ by the same amount; $\\Delta H$ is **unchanged**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An activation energy is the climb to the activated complex, from the reactants going forward, or from the products going back.', show: 'sum.0' },
        { say: 'Delta H is products minus reactants, which also equals the forward activation energy minus the reverse one.', show: 'sum.1', caption: 'ΔH is products minus reactants, which also equals Ea(fwd) − Ea(rev).' },
        { say: 'A catalyst lowers both activation energies by the same amount, and leaves delta H unchanged. For more, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'A catalyst lowers both activation energies by the same amount, and leaves ΔH unchanged. For more, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
