import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import gravimetric from '@/content/chem20/videos/c20-4-4-c.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import { flow, type FlowNode } from '@/content/chem20/videos/lib/c20-4a-figures.ts';

// Exam question for Chemistry 20 lesson 4.4 (mole ratios and gravimetric stoichiometry): the moles
// and the mass of chlorine that react with 10.0 g of sodium. The question joins part (a) of
// OpenStax Chemistry 2e's end-of-chapter exercises 42 and 43, section 4.3 (CC BY-NC-SA 4.0): 42 (a)
// asks for the balanced equation and the steps, and 43 (a) for the numbers. The answer, which
// matches the book's: 2Na + Cl2 -> 2NaCl, 10.0 / 22.99 = 0.4350 mol Na, x 1/2 = 0.217 mol Cl2,
// x 70.90 g/mol = 15.4 g.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's magnesium burning
// to magnesium oxide, then two sodium atoms and a chlorine molecule coming apart and joining as two
// units of sodium chloride, and the chain mass -> moles -> moles -> mass.

const two = (top: string, bottom: string) => `\\begin{gathered}\\text{${top}}\\\\ ${bottom}\\end{gathered}`;

const nodes: FlowNode[] = [
  { id: 'm1', tex: two('mass', '\\ce{Na}'), tone: 'opp', value: '10.0\\ \\text{g}' },
  { id: 'n1', tex: two('moles', '\\ce{Na}'), tone: 'brand', value: '0.4350\\ \\text{mol}' },
  { id: 'n2', tex: two('moles', '\\ce{Cl2}'), tone: 'brand', value: '0.2175\\ \\text{mol}' },
  { id: 'm2', tex: two('mass', '\\ce{Cl2}'), tone: 'opp', value: '15.42\\ \\text{g}' },
];

/** The chain of conversions, mass of sodium to mass of chlorine. */
const chain = figure(
  'c',
  [
    flow({
      nodes,
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 22.99', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\tfrac{1}{2}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times 70.90', tone: 'good' },
      ],
      width: 2.9,
      height: 1.9,
      gap: 3.3,
    }),
  ],
  240,
);

/** Two sodium atoms and one chlorine molecule becoming two units of sodium chloride (clip `go`). */
const sodium = reaction('nc', { from: [{ t: 'Na', n: 2 }, { t: 'Cl2' }], to: [{ t: 'NaCl', n: 2 }], counts: true });

const QUESTION =
  'Write the balanced equation, then determine the number of moles and the mass of chlorine, Cl2, required to react with 10.0 g of sodium metal, Na, to produce sodium chloride, NaCl.';

const video: Explainer = {
  id: 'xq-c20-4-4',
  lessonId: '',
  exam: {
    lesson: 'c20-4-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercises 42 (a) and 43 (a), section 4.3, Reaction Stoichiometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Chlorine Reacts With Sodium? Gravimetric Stoichiometry',
  thumbnailTitle: 'How Much Chlorine Reacts With Sodium?',
  thumbnail: 'nc',
  summary:
    'A real test question, solved one small step at a time: how many moles, and what mass, of chlorine react with 10.0 g of sodium? We balance the equation, turn the mass of sodium into moles, use the mole ratio, and turn moles of chlorine back into a mass, to get 0.217 mol and 15.4 g.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Chlorine Reacts With Sodium?', subtitle: 'From a mass to a mass, through moles' }],
      lines: [
        { say: 'In this video, we solve a real test question about the mass of one substance that reacts with another. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            'Write the balanced equation, then determine the number of moles and the mass of chlorine, $\\ce{Cl2}$, required to react with $10.0\\ \\text{g}$ of sodium metal, $\\ce{Na}$, to produce sodium chloride, $\\ce{NaCl}$.',
          answer: '0.217 mol of Cl₂, with a mass of 15.4 g',
        },
      ],
      lines: [
        { say: 'Here is the question. Write the balanced equation, then determine the number of moles and the mass of chlorine, C l two, required to react with ten point zero grams of sodium metal, to produce sodium chloride.', show: 'q', caption: 'Here is the question. Write the balanced equation, then determine the number of moles and the mass of chlorine, Cl₂, required to react with 10.0 g of sodium metal, Na, to produce sodium chloride, NaCl.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'From a **mass of sodium** to the **moles** and the **mass** of chlorine it uses up' }],
      lines: [
        { say: 'We know the mass of sodium. We want two things about the chlorine that reacts with it: how many moles, and how many grams.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        pick(gravimetric, 'mg'),
        { kind: 'math', id: 'k', size: 'md', lines: ['n = \\dfrac{m}{M} \\qquad m = nM \\qquad \\text{ratio} = \\dfrac{\\text{wanted coefficient}}{\\text{given coefficient}}'] },
      ],
      lines: [
        { say: 'Here is what we need. Two magnesium atoms and one oxygen molecule react to make two units of magnesium oxide.', show: 'mg', play: 'mg.go' },
        { say: 'The coefficients count particles, so they also count moles. A balance measures mass, so we turn a mass into moles by dividing by the molar mass, and moles back into a mass by multiplying.', show: 'k.0', caption: 'The coefficients count particles, so they also count moles. A balance measures mass, so we turn a mass into moles with n = m ÷ M, and moles back into a mass with m = nM.' },
        { say: 'In between, the mole ratio takes us from the substance we know to the one we want: the wanted coefficient over the given coefficient.', focus: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [chain],
      lines: [
        { say: 'Here is the plan, as a chain. First, the mass of sodium to moles of sodium, dividing by its molar mass.', show: ['c.m1', 'c.n1', 'c.a1'], focus: 'c.a1' },
        { say: 'Then moles of sodium to moles of chlorine, using the mole ratio from the balanced equation.', show: ['c.n2', 'c.a2'], focus: 'c.a2' },
        { say: 'Then moles of chlorine to a mass, multiplying by the molar mass of chlorine.', show: ['c.m2', 'c.a3'], focus: 'c.a3' },
      ],
    },
    {
      chapter: 'Step 1: The balanced equation',
      layout: 'center',
      main: [sodium, { kind: 'math', id: 'e', size: 'lg', lines: ['\\ce{2Na + Cl2 -> 2NaCl}'] }],
      lines: [
        { say: 'Step one. Chlorine is a two atom molecule, so one chlorine molecule needs two sodium atoms, and makes two units of sodium chloride.', show: 'nc', play: 'nc.go' },
        { say: 'So the balanced equation is two N a plus C l two gives two N a C l. Two sodium and two chlorine on each side.', show: 'e.0', focus: 'e.0', caption: 'So the balanced equation is 2Na + Cl₂ → 2NaCl. Two Na and two Cl on each side.' },
      ],
    },
    {
      chapter: 'Step 2: Grams of sodium to moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['n(\\ce{Na}) = \\dfrac{10.0\\ \\text{g}}{22.99\\ \\text{g/mol}} = \\good{0.4350\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. The molar mass of sodium is twenty two point nine nine grams per mole. Ten point zero grams divided by that is zero point four three five zero moles of sodium.', show: 'n.0', focus: 'n.0', caption: 'Step two. The molar mass of sodium is 22.99 g/mol. n = 10.0 g ÷ 22.99 g/mol = 0.4350 mol of Na.' },
      ],
    },
    {
      chapter: 'Step 3: The mole ratio',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['n(\\ce{Cl2}) = 0.4350\\ \\text{mol} \\times \\dfrac{1}{2}', '= 0.2175\\ \\text{mol} \\approx \\good{0.217\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step three. In the equation, one chlorine reacts for every two sodium. Chlorine is wanted and sodium is given, so multiply by one over two.', show: 'r.0', caption: 'Step three. In the equation, one Cl₂ reacts for every two Na. Cl₂ is wanted and Na is given, so multiply by 1/2.' },
        { say: 'That is zero point two one seven five moles, or zero point two one seven moles of chlorine to three significant figures.', show: 'r.1', focus: 'r.1', caption: 'That is 0.2175 mol, or 0.217 mol of Cl₂ to three significant figures.' },
      ],
    },
    {
      chapter: 'Step 4: Moles of chlorine to grams',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['M(\\ce{Cl2}) = 2 \\times 35.45 = 70.90\\ \\text{g/mol}', 'm = 0.2175 \\times 70.90 = 15.42\\ \\text{g} \\approx \\good{15.4\\ \\text{g}}'] }],
      lines: [
        { say: 'Step four. Each chlorine molecule has two atoms, so its molar mass is two times thirty five point four five, which is seventy point nine zero grams per mole.', show: 'm.0', caption: 'Step four. Each Cl₂ molecule has two atoms, so its molar mass is 2 × 35.45 = 70.90 g/mol.' },
        { say: 'Multiply the moles by the molar mass, using the unrounded zero point two one seven five: fifteen point four two grams, or fifteen point four grams.', show: 'm.1', focus: 'm.1', caption: 'Multiply the moles by the molar mass, using the unrounded 0.2175: m = 0.2175 × 70.90 = 15.42 g, or 15.4 g.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        chain,
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$0.217\\ \\text{mol}$ of $\\ce{Cl2}$, with a mass of $15.4\\ \\text{g}$.' },
      ],
      lines: [
        { say: 'Here is the whole chain again, with the value under each box.', show: ['c', 'c.m1', 'c.n1', 'c.n2', 'c.m2', 'c.a1', 'c.a2', 'c.a3', 'c.m1-value', 'c.n1-value', 'c.n2-value', 'c.m2-value'] },
        { say: 'Does it make sense? There are half as many moles of chlorine as of sodium. But a chlorine molecule is about three times as heavy as a sodium atom, so the chlorine has the larger mass.', caption: 'Does it make sense? There are half as many moles of Cl₂ as of Na. But a Cl₂ molecule (70.90) is about three times as heavy as a Na atom (22.99), so the chlorine has the larger mass.' },
        { say: 'So zero point two one seven moles of chlorine, with a mass of fifteen point four grams. That matches the book.', show: 'ans', caption: 'So 0.217 mol of Cl₂, with a mass of 15.4 g. That matches the book.' },
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
            ['$0.435\\ \\text{mol}$', 'Left out the **mole ratio**'],
            ['$0.870\\ \\text{mol}$', 'Used the ratio **upside down**, 2 over 1'],
            ['$7.71\\ \\text{g}$', 'Used the molar mass of **one Cl atom**, 35.45'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point four three five moles is the amount of sodium. Without the mole ratio, you have not moved over to chlorine yet.', focus: 'traps.0', caption: '0.435 mol is the amount of sodium. Without the mole ratio, you have not moved over to chlorine yet.' },
        { say: 'Zero point eight seven zero moles comes from multiplying by two over one. Always put the wanted coefficient on top.', focus: 'traps.1', caption: '0.870 mol comes from multiplying by 2 over 1. Always put the wanted coefficient on top.' },
        { say: 'And seven point seven one grams comes from using the molar mass of one chlorine atom. Chlorine gas is made of two atom molecules, so use seventy point nine zero.', focus: 'traps.2', caption: 'And 7.71 g comes from using the molar mass of one Cl atom, 35.45. Chlorine gas is made of Cl₂ molecules, so use 70.90 g/mol.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Magnesium burns in oxygen: $\\ce{2Mg + O2 -> 2MgO}$. What mass of $\\ce{MgO}$ forms from $12.15\\ \\text{g}$ of $\\ce{Mg}$? Use Mg $24.31$ and O $16.00\\ \\text{g/mol}$.',
          choices: ['$10.1\\ \\text{g}$', '$8.00\\ \\text{g}$', '$40.3\\ \\text{g}$', '$20.1\\ \\text{g}$'],
          answer: 3,
          working: '$n(\\ce{Mg}) = \\dfrac{12.15}{24.31} = 0.4998\\ \\text{mol}$, the ratio is $\\tfrac{2}{2}$, and $0.4998 \\times 40.31 = 20.1\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium burns in oxygen to make magnesium oxide. What mass of magnesium oxide forms from twelve point one five grams of magnesium? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Magnesium burns in oxygen: 2Mg + O₂ → 2MgO. What mass of MgO forms from 12.15 g of Mg? Pause the video and try it.' },
        { say: 'Twelve point one five over twenty four point three one is zero point four nine nine eight moles of magnesium. The ratio is two to two, and magnesium oxide is forty point three one grams per mole, so the mass is twenty point one grams: choice D.', show: 'q2.answer', caption: '12.15 ÷ 24.31 = 0.4998 mol of Mg. The ratio is 2 to 2, and MgO is 40.31 g/mol, so the mass is 20.1 g: choice D.' },
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
          items: ['Start from the **balanced equation**', 'Mass to moles, **mole ratio**, moles to mass', 'Ratio: **wanted** coefficient over **given**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Start from the balanced equation, because its coefficients give the mole ratio.', show: 'sum.0' },
        { say: 'Then go from mass to moles, use the mole ratio, and go from moles back to mass.', show: 'sum.1' },
        { say: 'Put the wanted coefficient on top of the ratio. For more on gravimetric stoichiometry, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
