import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import standardStates from '@/content/chem30/videos/c30-1-6.ts';
import formationEquations from '@/content/chem30/videos/c30-1-6-b.ts';
import route from '@/content/chem30/videos/c30-1-6-c.ts';

// Exam question for Chemistry 30 lesson 1.6 (enthalpies of formation): write the formation equation
// for ethanol, then find the standard enthalpy of combustion of ethanol from the standard enthalpies
// of formation stated in the question. Gradileo's own question. The answer: 2C(s) + 3H2(g) +
// 1/2 O2(g) -> C2H5OH(l); and delta-rH° = [2(-393.5) + 3(-285.8)] - [(-277.6) + 0] = -1366.8 kJ.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts) from the lesson: hydrogen and
// oxygen, both elements in their standard states, joining as water; magnesium oxide forming from its
// elements; and methane burning, which the lesson takes apart into elements and builds back up.

const QUESTION =
  'Ethanol burns: C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l). The standard enthalpies of formation are C2H5OH(l) -277.6 kJ/mol, CO2(g) -393.5 kJ/mol and H2O(l) -285.8 kJ/mol. (a) Write the formation equation for ethanol. (b) Find the standard enthalpy change for the combustion of one mole of ethanol.';

const video: Explainer = {
  id: 'xq-c30-1-6',
  lessonId: '',
  exam: {
    lesson: 'c30-1-6',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Enthalpy of Burning Ethanol. Enthalpies of Formation',
  thumbnailTitle: 'The Enthalpy of Burning Ethanol',
  thumbnail: 'mb',
  summary:
    'A test-style question, solved one small step at a time: write the formation equation for ethanol, then use standard enthalpies of formation to find the enthalpy of combustion of ethanol. We take the products minus the reactants, each times its coefficient, with oxygen at zero, to get −1366.8 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Enthalpy of Burning Ethanol', subtitle: 'Enthalpies of formation, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about enthalpies of formation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Ethanol burns: $\\ce{C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)}$. The standard enthalpies of formation are $\\ce{C2H5OH(l)}$ $-277.6$, $\\ce{CO2(g)}$ $-393.5$ and $\\ce{H2O(l)}$ $-285.8\\ \\text{kJ/mol}$. (a) Write the formation equation for ethanol. (b) Find the standard enthalpy change for the combustion of one mole of ethanol.',
          answer: '(a) 2C(s) + 3H₂(g) + ½O₂(g) → C₂H₅OH(l) (b) −1366.8 kJ',
        },
      ],
      lines: [
        { say: 'Here is the question. Ethanol burns in oxygen to make carbon dioxide and liquid water.', show: 'q', caption: 'Here is the question. Ethanol burns: C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l).' },
        { say: 'The standard enthalpies of formation are minus two hundred and seventy seven point six kilojoules per mole for ethanol, minus three hundred and ninety three point five for carbon dioxide, and minus two hundred and eighty five point eight for liquid water.', caption: 'The standard enthalpies of formation are C₂H₅OH(l) −277.6, CO₂(g) −393.5 and H₂O(l) −285.8 kJ/mol.' },
        { say: 'Part a: write the formation equation for ethanol. Part b: find the standard enthalpy change for the combustion of one mole of ethanol.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Show how ethanol is built from its **elements**, then use the **formation enthalpies** to find the energy of **burning** it' }],
      lines: [
        { say: 'Part a wants one mole of ethanol made from its elements. Part b wants the enthalpy change for the whole combustion equation, built from the formation enthalpies we are given.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(formationEquations, 'mg'), { kind: 'math', id: 'k', size: 'md', lines: ['\\Delta_r H^\\circ = \\sum n\\,\\Delta_f H^\\circ(\\text{products}) - \\sum n\\,\\Delta_f H^\\circ(\\text{reactants})'] }],
      lines: [
        { say: 'Here is what we need. Magnesium atoms and an oxygen molecule, both elements in their standard states, join as magnesium oxide. Per mole of product, that is a formation equation.', show: 'mg', play: 'mg.go' },
        { say: 'A formation equation makes one mole of a compound from its elements in their standard states. An element in its standard state has a formation enthalpy of zero.' },
        { say: 'And the enthalpy change of any reaction is the sum of the products\' formation enthalpies, each times its coefficient, minus the same sum for the reactants.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Build **one mole** of ethanol from C(s), H₂(g) and O₂(g)', 'Add up $n\\,\\Delta_f H^\\circ$ for the **products**, then for the **reactants**', 'Subtract: **products minus reactants**'] }],
      lines: [
        { say: 'Here is the plan. For part a, build one mole of ethanol from carbon, hydrogen and oxygen in their standard states.', show: 'plan.0' },
        { say: 'For part b, add up n times delta f H for the products, and then for the reactants.', show: 'plan.1', caption: 'For part b, add up n × ΔfH° for the products, and then for the reactants.' },
        { say: 'Then subtract: products minus reactants.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The formation equation',
      layout: 'center',
      main: [pick(standardStates, 'hb'), { kind: 'math', id: 'a', size: 'lg', lines: ['\\ce{2C(s) + 3H2(g) + 1/2 O2(g) -> C2H5OH(l)}'] }],
      lines: [
        { say: 'Step one. Here, hydrogen and oxygen, as the diatomic gases they are at room conditions, join as water. Hydrogen and oxygen are written as H two and O two in formation equations.', show: 'hb', play: 'hb.go', caption: 'Step one. Here, hydrogen and oxygen, as the diatomic gases they are at room conditions, join as water. They are written as H₂(g) and O₂(g) in formation equations.' },
        { say: 'Ethanol, C two H five O H, has two carbon, six hydrogen and one oxygen atom. So two carbon, solid, three hydrogen molecules and half an oxygen molecule make one mole of liquid ethanol.', show: 'a.0', focus: 'a.0', caption: 'C₂H₅OH has 2 C, 6 H and 1 O. So 2C(s) + 3H₂(g) + ½O₂(g) → C₂H₅OH(l). The ½ keeps it to one mole of ethanol.' },
      ],
    },
    {
      chapter: 'Step 2: The products',
      layout: 'center',
      main: [{ kind: 'math', id: 'p', size: 'lg', lines: ['2(-393.5) + 3(-285.8)', '= -787.0 - 857.4 = \\good{-1644.4\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step two. The products are two carbon dioxide and three water. Multiply each formation enthalpy by its coefficient.', show: 'p.0' },
        { say: 'Minus seven hundred and eighty seven point zero, and minus eight hundred and fifty seven point four, make minus one thousand six hundred and forty four point four kilojoules.', show: 'p.1', focus: 'p.1', caption: '−787.0 − 857.4 = −1644.4 kJ for the products.' },
      ],
    },
    {
      chapter: 'Step 3: The reactants',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['1(-277.6) + 3(0) = \\good{-277.6\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step three. The reactants are one ethanol and three oxygen. Oxygen is an element in its standard state, so its formation enthalpy is zero. That leaves minus two hundred and seventy seven point six kilojoules.', show: 'r.0', focus: 'r.0', caption: 'Step three. The reactants are one C₂H₅OH and three O₂. O₂(g) is an element in its standard state, so its ΔfH° = 0. That leaves −277.6 kJ.' },
      ],
    },
    {
      chapter: 'Step 4: Products minus reactants',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'lg', lines: ['\\Delta_c H^\\circ = -1644.4 - (-277.6)', '= \\good{-1366.8\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step four. Products minus reactants: minus one thousand six hundred and forty four point four, minus minus two hundred and seventy seven point six.', show: 'h.0', caption: 'Step four. Products minus reactants: −1644.4 − (−277.6).' },
        { say: 'Subtracting a negative adds it, so the answer is minus one thousand three hundred and sixty six point eight kilojoules, for one mole of ethanol.', show: 'h.1', focus: 'h.1', caption: 'Subtracting a negative adds it, so ΔcH° = −1366.8 kJ, for one mole of ethanol.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        pick(route, 'mb'),
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $\\ce{2C(s) + 3H2(g) + 1/2 O2(g) -> C2H5OH(l)}$ (b) $\\Delta_c H^\\circ = -1366.8\\ \\text{kJ}$' },
      ],
      lines: [
        { say: 'Does it make sense? Here a methane molecule burns. Burning a fuel takes it apart and builds carbon dioxide and water, which are very low in enthalpy, so a lot of energy comes out.', show: 'mb', play: 'mb.burn' },
        { say: 'So a large negative value is what we expect for burning ethanol: minus one thousand three hundred and sixty six point eight kilojoules.', show: 'ans', caption: 'So a large negative value is what we expect for burning ethanol: ΔcH° = −1366.8 kJ.' },
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
            ['$+1366.8\\ \\text{kJ}$', 'Took **reactants minus products**'],
            ['$-401.7\\ \\text{kJ}$', 'Left out the **coefficients** 2 and 3'],
            ['$-1922.0\\ \\text{kJ}$', '**Added** the ethanol instead of subtracting it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Plus one thousand three hundred and sixty six point eight comes from subtracting the wrong way round. It is always products minus reactants.', focus: 'traps.0', caption: '+1366.8 kJ comes from subtracting the wrong way round. It is always products minus reactants.' },
        { say: 'Minus four hundred and one point seven comes from forgetting the coefficients. Two moles of carbon dioxide and three of water form.', focus: 'traps.1', caption: '−401.7 kJ comes from forgetting the coefficients. Two moles of CO₂ and three of H₂O form.' },
        { say: 'And minus one thousand nine hundred and twenty two comes from adding ethanol\'s formation enthalpy. The reactants are subtracted.', focus: 'traps.2', caption: 'And −1922.0 kJ comes from adding ethanol\'s formation enthalpy. The reactants are subtracted.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find $\\Delta_r H^\\circ$ for $\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$. Use $\\Delta_f H^\\circ$: $\\ce{CH4(g)}$ $-74.6$, $\\ce{CO2(g)}$ $-393.5$, $\\ce{H2O(l)}$ $-285.8\\ \\text{kJ/mol}$.',
          choices: ['$-890.5\\ \\text{kJ}$', '$-1039.7\\ \\text{kJ}$', '$+890.5\\ \\text{kJ}$', '$-604.7\\ \\text{kJ}$'],
          answer: 0,
          working: '$[-393.5 + 2(-285.8)] - [-74.6] = -965.1 + 74.6 = -890.5\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the standard enthalpy change for methane burning to carbon dioxide and liquid water. Methane is minus seventy four point six, carbon dioxide minus three hundred and ninety three point five, and liquid water minus two hundred and eighty five point eight kilojoules per mole. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Find ΔrH° for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l). Use ΔfH°: CH₄(g) −74.6, CO₂(g) −393.5, H₂O(l) −285.8 kJ/mol. Pause the video and try it.' },
        { say: 'The products add to minus nine hundred and sixty five point one. Subtract minus seventy four point six for the methane, and the answer is minus eight hundred and ninety point five kilojoules: choice A.', show: 'q2.answer', caption: 'The products add to −393.5 + 2(−285.8) = −965.1 kJ. Subtract −74.6 for the methane: −890.5 kJ, choice A.' },
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
          items: ['A formation equation makes **one mole** from **elements** in their standard states', 'Elements in their standard states: $\\Delta_f H^\\circ = 0$', '$\\Delta_r H^\\circ$ = **products minus reactants**, each times its coefficient'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A formation equation makes one mole of a compound from its elements in their standard states, even if that needs a fraction.', show: 'sum.0' },
        { say: 'An element in its standard state has a formation enthalpy of zero.', show: 'sum.1' },
        { say: 'And the enthalpy change of a reaction is the products minus the reactants, each times its coefficient. For more on enthalpies of formation, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
