import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import limiting from '@/content/chem20/videos/c20-4-6.ts';
import { limitingBurn } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 4.6 (limiting and excess reagents): 4.00 g of hydrogen and
// 24.0 g of oxygen react to make water. Which is limiting, what mass of water forms, and what mass
// of the excess reagent is left? Gradileo's own question, with the molar masses it needs stated in
// it. The answer: 1.980 mol H2 and 0.750 mol O2; the oxygen needs only 1.500 mol H2, so O2 is
// limiting; 1.500 mol of water is 27.0 g; and 0.480 mol, or 0.97 g, of hydrogen is left over.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's eight hydrogen and
// six oxygen molecules burning until the hydrogen runs out, then this question's mixture in
// miniature, eight hydrogen and three oxygen molecules, burning until the oxygen runs out and two
// hydrogen molecules are left.

/** This question's mixture in miniature: the oxygen runs out first and two hydrogen molecules are left (clip `spark`). */
const mixture = limitingBurn('lb', [{ id: 'a', h2: 8, o2: 3, label: '8 hydrogen + 3 oxygen molecules' }], 4, 330);

const QUESTION =
  'A mixture of 4.00 g of hydrogen gas and 24.0 g of oxygen gas is sparked, and they react: 2H2(g) + O2(g) -> 2H2O(l). (a) Which reactant is the limiting reagent? (b) What mass of water forms? (c) What mass of the excess reagent is left over? Use H 1.01 g/mol and O 16.00 g/mol.';

const video: Explainer = {
  id: 'xq-c20-4-6',
  lessonId: '',
  exam: {
    lesson: 'c20-4-6',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Which Runs Out, Hydrogen or Oxygen? Limiting and Excess Reagents',
  thumbnailTitle: 'Which Runs Out, Hydrogen or Oxygen?',
  thumbnail: 'lb',
  summary:
    'A test-style question, solved one small step at a time: 4.00 g of hydrogen and 24.0 g of oxygen react to make water. We change both masses to moles, find that the oxygen runs out first, work out the 27.0 g of water it makes, and find the 0.97 g of hydrogen left over.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Runs Out, Hydrogen or Oxygen?', subtitle: 'Limiting and excess reagents, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about a reaction where one reactant runs out before the other. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'A mixture of $4.00\\ \\text{g}$ of hydrogen gas and $24.0\\ \\text{g}$ of oxygen gas is sparked, and they react: $\\ce{2H2(g) + O2(g) -> 2H2O(l)}$. (a) Which reactant is the limiting reagent? (b) What mass of water forms? (c) What mass of the excess reagent is left over? Use H $1.01$ and O $16.00\\ \\text{g/mol}$.',
          answer: '(a) O₂ (b) 27.0 g of water (c) 0.97 g of H₂',
        },
      ],
      lines: [
        { say: 'Here is the question. A mixture of four point zero zero grams of hydrogen gas and twenty four point zero grams of oxygen gas is sparked, and they react to make water.', show: 'q', caption: 'Here is the question. A mixture of 4.00 g of hydrogen gas and 24.0 g of oxygen gas is sparked, and they react: 2H₂(g) + O₂(g) → 2H₂O(l).' },
        { say: 'Part a: which reactant is the limiting reagent? Part b: what mass of water forms? Part c: what mass of the excess reagent is left over? The molar masses are one point zero one for hydrogen and sixteen point zero zero for oxygen.', caption: '(a) Which reactant is the limiting reagent? (b) What mass of water forms? (c) What mass of the excess reagent is left over? Use H 1.01 and O 16.00 g/mol.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find which reactant **runs out first**, then the **water** it makes and the **hydrogen or oxygen left over**' }],
      lines: [
        { say: 'Both reactants are given, so one of them will run out first and stop the reaction. That one is the limiting reagent.', show: 'plain' },
        { say: 'Then we want the water the reaction makes before it stops, and how much of the other reactant is still there.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(limiting, 'lr')],
      lines: [
        { say: 'Here is what we need. Eight hydrogen molecules and six oxygen molecules in a sealed box. Each oxygen molecule reacts with two hydrogen molecules.', show: ['lr', 'lr.labels', 'lr.thermo'] },
        { say: 'Light it, and watch the hydrogen and oxygen turn into water.', play: 'lr.spark', show: 'lr.tally', focus: 'lr.a' },
        { say: 'The reaction stops when the last hydrogen molecule is used up. Hydrogen is the limiting reagent, and the oxygen left over is the excess reagent. To decide which runs out, compare moles, using the coefficients.', focus: 'lr.a' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change both masses to **moles**', 'Find which reactant **runs out first**', 'Use the **limiting reagent** for the water, and **subtract** to find what is left'] }],
      lines: [
        { say: 'Here is the plan. First, change both masses to moles.', show: 'plan.0' },
        { say: 'Then use the mole ratio to find which reactant runs out first.', show: 'plan.1' },
        { say: 'Then work out the water from the limiting reagent, and subtract what reacts from what we started with to find what is left.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Both masses to moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['n(\\ce{H2}) = \\dfrac{4.00}{2.02} = 1.980\\ \\text{mol}', 'n(\\ce{O2}) = \\dfrac{24.0}{32.00} = 0.750\\ \\text{mol}'] }],
      lines: [
        { say: 'Step one. A hydrogen molecule has two atoms, so its molar mass is two point zero two grams per mole. Four point zero zero grams is one point nine eight zero moles.', show: 'n.0', caption: 'Step one. H₂ has two atoms, so M = 2.02 g/mol. n = 4.00 ÷ 2.02 = 1.980 mol of H₂.' },
        { say: 'An oxygen molecule is thirty two point zero zero grams per mole, so twenty four point zero grams is zero point seven five zero moles.', show: 'n.1', caption: 'O₂ is 32.00 g/mol, so n = 24.0 ÷ 32.00 = 0.750 mol of O₂.' },
      ],
    },
    {
      chapter: 'Step 2: Which runs out first?',
      layout: 'center',
      main: [{ kind: 'math', id: 'l', size: 'lg', lines: ['\\ce{H2}\\text{ needed} = 0.750 \\times \\dfrac{2}{1} = 1.500\\ \\text{mol}', '1.500 < 1.980 \\ \\Rightarrow\\ \\good{\\ce{O2}\\text{ is limiting}}'] }],
      lines: [
        { say: 'Step two. Each oxygen molecule needs two hydrogen molecules. So zero point seven five zero moles of oxygen needs one point five zero zero moles of hydrogen.', show: 'l.0', caption: 'Step two. Each O₂ needs two H₂. So 0.750 mol of O₂ needs 0.750 × 2 = 1.500 mol of H₂.' },
        { say: 'We have one point nine eight zero moles of hydrogen, more than enough. So the oxygen runs out first: oxygen is the limiting reagent, and hydrogen is in excess.', show: 'l.1', focus: 'l.1', caption: 'We have 1.980 mol of H₂, more than enough. So the oxygen runs out first: O₂ is the limiting reagent, and H₂ is in excess.' },
      ],
    },
    {
      chapter: 'Step 3: The water',
      layout: 'center',
      main: [{ kind: 'math', id: 'w', size: 'lg', lines: ['n(\\ce{H2O}) = 0.750 \\times \\dfrac{2}{1} = 1.500\\ \\text{mol}', 'm = 1.500 \\times 18.02 = 27.03\\ \\text{g} \\approx \\good{27.0\\ \\text{g}}'] }],
      lines: [
        { say: 'Step three. Work from the limiting reagent. One oxygen gives two water, so zero point seven five zero moles of oxygen gives one point five zero zero moles of water.', show: 'w.0', caption: 'Step three. Work from the limiting reagent. One O₂ gives two H₂O, so 0.750 mol of O₂ gives 1.500 mol of H₂O.' },
        { say: 'Water is eighteen point zero two grams per mole, so that is twenty seven point zero grams of water.', show: 'w.1', focus: 'w.1', caption: 'Water is 18.02 g/mol, so m = 1.500 × 18.02 = 27.03 g, or 27.0 g of water.' },
      ],
    },
    {
      chapter: 'Step 4: The hydrogen left over',
      layout: 'center',
      main: [{ kind: 'math', id: 'x', size: 'lg', lines: ['\\text{used: } 1.500 \\times 2.02 = 3.03\\ \\text{g}', '\\text{left: } 4.00 - 3.03 = \\good{0.97\\ \\text{g of }\\ce{H2}}'] }],
      lines: [
        { say: 'Step four. One point five zero zero moles of hydrogen react, and that is three point zero three grams.', show: 'x.0', caption: 'Step four. 1.500 mol of H₂ react, and that is 1.500 × 2.02 = 3.03 g.' },
        { say: 'We started with four point zero zero grams, so zero point nine seven grams of hydrogen is left over.', show: 'x.1', focus: 'x.1', caption: 'We started with 4.00 g, so 4.00 − 3.03 = 0.97 g of H₂ is left over.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        mixture,
        { kind: 'math', id: 'k', size: 'md', lines: ['4.00 + 24.0 = 28.0\\ \\text{g} \\qquad 27.03 + 0.97 = 28.0\\ \\text{g}\\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is the mixture in miniature: eight hydrogen molecules and three oxygen molecules, close to the same ratio as our moles.', show: ['lb', 'lb.labels', 'lb.thermo'] },
        { say: 'Spark it. The oxygen runs out after six water molecules, and two hydrogen molecules are left over, just as we found.', play: 'lb.spark', show: 'lb.tally', focus: 'lb.a' },
        { say: 'And the mass checks out. Twenty eight grams went in, and twenty seven point zero three grams of water plus zero point nine seven grams of hydrogen is twenty eight grams.', show: 'k.0', caption: 'And the mass checks out. 4.00 + 24.0 = 28.0 g went in, and 27.03 g of water + 0.97 g of hydrogen = 28.0 g.' },
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
            ['$\\ce{H2}$ is limiting', 'Picked the **smaller mass**; compare **moles**'],
            ['$35.7\\ \\text{g}$ of water', 'Worked from the **excess** hydrogen'],
            ['$13.5\\ \\text{g}$ of water', 'Used a **1 : 1** ratio for oxygen to water'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Picking hydrogen because its mass is smaller. Hydrogen molecules are so light that four grams is almost two moles, so compare moles, never grams.', focus: 'traps.0' },
        { say: 'Thirty five point seven grams of water comes from working from the hydrogen. The oxygen runs out first, so that much water can never form.', focus: 'traps.1', caption: '35.7 g of water comes from working from the hydrogen. The oxygen runs out first, so that much water can never form.' },
        { say: 'And thirteen point five grams comes from a one to one ratio. Each oxygen molecule makes two water molecules.', focus: 'traps.2', caption: 'And 13.5 g comes from a 1 : 1 ratio. Each O₂ molecule makes two H₂O molecules.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\ce{N2 + 3H2 -> 2NH3}$, $14.0\\ \\text{g}$ of $\\ce{N2}$ reacts with $4.04\\ \\text{g}$ of $\\ce{H2}$. What mass of $\\ce{NH3}$ forms? Use N $14.01$ and H $1.01\\ \\text{g/mol}$.',
          choices: ['$22.7\\ \\text{g}$', '$17.0\\ \\text{g}$', '$8.51\\ \\text{g}$', '$34.1\\ \\text{g}$'],
          answer: 1,
          working: '$0.4996\\ \\text{mol}$ of $\\ce{N2}$ needs $1.499\\ \\text{mol}$ of $\\ce{H2}$, and there are $2.000$, so $\\ce{N2}$ is limiting: $0.9993 \\times 17.04 = 17.0\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Fourteen point zero grams of nitrogen reacts with four point zero four grams of hydrogen to make ammonia. What mass of ammonia forms? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. In N₂ + 3H₂ → 2NH₃, 14.0 g of N₂ reacts with 4.04 g of H₂. What mass of NH₃ forms? Pause the video and try it.' },
        { say: 'Zero point four nine nine six moles of nitrogen needs one point four nine nine moles of hydrogen, and there are two, so nitrogen is limiting. It makes zero point nine nine nine three moles of ammonia, which is seventeen point zero grams: choice B.', show: 'q2.answer', caption: '0.4996 mol of N₂ needs 1.499 mol of H₂, and there are 2.000, so N₂ is limiting. It makes 0.9993 mol of NH₃, which is 17.0 g: choice B.' },
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
          items: ['Compare **moles** with the mole ratio, never grams', 'The **limiting reagent** decides the product', 'Left over = **started with** − **used**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. To find the limiting reagent, change to moles and compare them with the mole ratio, never the masses.', show: 'sum.0' },
        { say: 'Work out the product from the limiting reagent, because it decides when the reaction stops.', show: 'sum.1' },
        { say: 'And the excess left over is what you started with minus what reacted. For more on limiting reagents, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
