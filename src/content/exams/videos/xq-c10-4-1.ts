import type { Explainer } from '@/video/script.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import { openClosed } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 4.1 (word equations and conservation of mass): heat
// calcium carbonate in an open tube, write the word equation, find the mass of carbon dioxide and
// explain why the mass fell. OpenStax Chemistry 2e has no conservation-of-mass question with a
// gas escaping, so Gradileo wrote this one in the style of a high-school chemistry unit test.
// Answers: (a) calcium carbonate -> calcium oxide + carbon dioxide; (b) 10.0 - 5.6 = 4.4 g;
// (c) the carbon dioxide is a gas that escaped from the open tube, so in a sealed tube the total
// mass would stay 10.0 g.
//
// The pictures: the atoms of calcium carbonate coming apart into calcium oxide and carbon
// dioxide with every atom kept (src/video/molecules.ts), then marble chips fizzing in an open
// beaker and a sealed flask with every particle counted, so the gas leaving the open one shows.

const QUESTION =
  'A student heats 10.0 g of calcium carbonate in an open test tube until its mass stops changing. 5.6 g of calcium oxide is left in the tube. (a) Write a word equation for the reaction. (b) Calculate the mass of carbon dioxide produced. (c) The student says that the mass went down, so mass was not conserved. Explain why the student is wrong.';

const video: Explainer = {
  id: 'xq-c10-4-1',
  lessonId: '',
  exam: {
    lesson: 'c10-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Heating Calcium Carbonate. Word Equations and Conservation of Mass',
  thumbnailTitle: 'Where Did the Mass Go?',
  thumbnail: 'cc',
  summary:
    'An exam-style question, solved one small step at a time: 10.0 g of calcium carbonate is heated in an open tube and only 5.6 g of calcium oxide is left. We write the word equation, watch the atoms rearrange with none lost, find the 4.4 g of carbon dioxide and see why the balance reading fell even though mass is conserved.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Did the Mass Go?', subtitle: 'Conservation of mass, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about heating calcium carbonate. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'A student heats $10.0\\ \\text{g}$ of calcium carbonate in an open test tube until its mass stops changing. $5.6\\ \\text{g}$ of calcium oxide is left in the tube.<br>(a) Write a word equation for the reaction.<br>(b) Calculate the mass of carbon dioxide produced.<br>(c) The student says that the mass went down, so mass was not conserved. Explain why the student is wrong.',
          answer: '(a) calcium carbonate → calcium oxide + carbon dioxide (b) $4.4\\ \\text{g}$ (c) the carbon dioxide gas escaped from the open tube',
          working: 'Total mass of products = mass of reactants, so carbon dioxide = 10.0 − 5.6.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A student heats 10.0 grams of calcium carbonate in an open test tube until its mass stops changing. 5.6 grams of calcium oxide is left in the tube. Part a: write a word equation for the reaction. Part b: calculate the mass of carbon dioxide produced. Part c: the student says that the mass went down, so mass was not conserved. Explain why the student is wrong.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ask',
          items: ['**One** reactant: calcium carbonate', '**Two** products: calcium oxide, which stays, and carbon dioxide', 'The tube is **open**'],
        },
      ],
      lines: [
        { say: 'Let us sort out what we are told. There is one reactant, calcium carbonate, and we know its mass: 10.0 grams.', show: 'ask.0' },
        { say: 'There are two products. Calcium oxide is the solid left in the tube, and the question itself names the other one, carbon dioxide.', show: 'ask.1' },
        { say: 'And the tube is open. Keep that in mind, because carbon dioxide is a gas.', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        reaction('cc', { from: [{ t: 'CaCO3' }], to: [{ t: 'CaO' }, { t: 'CO2' }], counts: true, foot: { before: '10.0 g', after: '5.6 g + ? g' } }),
        { kind: 'callout', id: 'law', tone: 'key', title: 'Conservation of mass', md: 'Atoms are only **rearranged**, so the products have the same total mass as the reactants.' },
      ],
      lines: [
        { say: 'Here is what we need. When calcium carbonate is heated, its atoms come apart and join up again in a new way. Watch them.', show: 'cc' },
        { say: 'The calcium and one oxygen become calcium oxide. The carbon and the other two oxygens become carbon dioxide. Every atom on the left turns up on the right.', play: 'cc.go', playDelay: 0.3 },
        { say: 'This is the law of conservation of mass. No atoms are made or lost, so the products have the same total mass as the reactants.', show: 'law' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **word equation**: reactants → products', 'Use **mass in = mass out** to find the carbon dioxide', 'Say where that mass **went**'] }],
      lines: [
        { say: 'Here is the plan. First, write the word equation, with the reactant on the left of the arrow and the products on the right.', show: 'plan.0' },
        { say: 'Second, use the idea that the mass in equals the mass out, to find the mass of carbon dioxide.', show: 'plan.1' },
        { say: 'Third, say where that mass went.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The word equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'we', size: 'md', lines: ['\\adj{\\text{calcium carbonate}} \\;\\longrightarrow\\; \\good{\\text{calcium oxide}} + \\good{\\text{carbon dioxide}}'] }],
      lines: [
        { say: 'Step one. The reactant, calcium carbonate, goes on the left. The arrow means reacts to make. The two products go on the right, joined by a plus sign.', show: 'we' },
        { say: 'So the word equation is: calcium carbonate makes calcium oxide plus carbon dioxide. That is part a.' },
      ],
    },
    {
      chapter: 'Step 2: The mass of carbon dioxide',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\text{mass of reactants} = \\text{mass of products}',
            '\\adj{10.0\\ \\text{g}} = \\good{5.6\\ \\text{g}} + \\text{mass of carbon dioxide}',
            '\\text{mass of carbon dioxide} = 10.0 - 5.6 = \\brand{4.4\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Step two. The mass of the reactants equals the mass of the products.', show: 'm.0' },
        { say: 'We had 10.0 grams of calcium carbonate, and it made 5.6 grams of calcium oxide plus some carbon dioxide.', show: 'm.1' },
        { say: 'So the carbon dioxide has a mass of 10.0 minus 5.6, which is 4.4 grams. That is part b.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Where the mass went',
      layout: 'split',
      leftWidth: 620,
      left: [openClosed('oc', 420)],
      right: [
        { kind: 'callout', id: 'why', tone: 'key', title: 'Part (c)', md: 'The carbon dioxide is a **gas**, and it **escaped** from the open tube. In a sealed tube the total mass would stay $10.0\\ \\text{g}$.' },
      ],
      lines: [
        { say: 'Step three. Carbon dioxide is a gas. Here is the same kind of reaction, calcium carbonate fizzing, in an open beaker and in a sealed flask, with every particle counted.', show: ['oc', 'oc.labels', 'oc.tally'] },
        { say: 'In the open beaker, the gas drifts out of the top, and the count falls. In the sealed flask, the gas is trapped, and the count stays the same.', play: 'oc.fizz' },
        { say: 'So for part c: the mass was conserved. The 4.4 grams of carbon dioxide is a gas that escaped from the open tube. In a sealed tube, the total mass would have stayed at 10.0 grams.', show: 'why' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Answer'],
          rows: [
            ['(a)', 'calcium carbonate → calcium oxide + carbon dioxide'],
            ['(b)', '**4.4 g** of carbon dioxide'],
            ['(c)', 'The carbon dioxide gas **escaped** from the open tube'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'A quick check: 5.6 grams of calcium oxide plus 4.4 grams of carbon dioxide is 10.0 grams, which is exactly what we started with.' },
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
            ['(b) 15.6 g', 'Added the masses instead of **subtracting**'],
            ['(c) "Mass was destroyed"', 'Forgot that a gas **has mass**'],
            ['(a) calcium + carbonate → …', 'Split the **name** instead of writing the substance'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Adding 10.0 and 5.6 to get 15.6 grams. The calcium oxide came out of the calcium carbonate, so its mass is part of the 10.0 grams, and we subtract.', focus: 'traps.0' },
        { say: 'Saying the mass was destroyed. A gas is made of particles, and particles have mass, even when we cannot see them.', focus: 'traps.1' },
        { say: 'And writing calcium and carbonate as two reactants. Calcium carbonate is one substance, a single compound.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$2.4\\ \\text{g}$ of magnesium burns in oxygen to make $4.0\\ \\text{g}$ of magnesium oxide. What mass of **oxygen** reacted?',
          choices: ['$6.4\\ \\text{g}$', '$1.6\\ \\text{g}$', '$2.4\\ \\text{g}$', '$4.0\\ \\text{g}$'],
          answer: 1,
          working: 'Mass of reactants = mass of products, so oxygen = 4.0 − 2.4 = 1.6 g.',
        },
      ],
      lines: [
        { say: 'Your turn. 2.4 grams of magnesium burns in oxygen to make 4.0 grams of magnesium oxide. What mass of oxygen reacted? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'This time the oxygen is a reactant, so the product is heavier. The oxygen is 4.0 minus 2.4, which is 1.6 grams, choice B.', show: 'q2.answer' },
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
          items: ['Word equation: **reactants → products**', 'Mass of reactants = **mass of products**', 'In an open container, a gas can **escape**, so the reading falls'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A word equation puts the reactants on the left of the arrow and the products on the right.', show: 'sum.0' },
        { say: 'Atoms are only rearranged, so the mass of the reactants equals the mass of the products.', show: 'sum.1' },
        { say: 'And in an open container, a gas can escape, so the reading falls even though no mass is destroyed. For more on conservation of mass, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
