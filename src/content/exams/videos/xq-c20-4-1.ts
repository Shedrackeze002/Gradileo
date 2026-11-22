import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import burning from '@/content/chem20/videos/c20-4-1.ts';
import ethene from '@/content/chem20/videos/c20-4-1-c.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 20 lesson 4.1 (balancing equations and types of reaction): write
// balanced equations for calcium carbonate decomposing and for butane burning. The question is
// parts (a) and (b) of OpenStax Chemistry 2e's end-of-chapter exercise 5, section 4.1, word for word
// (CC BY-NC-SA 4.0); parts (c) and (d) are left out. The answers, which match the book's:
// (a) CaCO3(s) -> CaO(s) + CO2(g), a decomposition; (b) 2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(g),
// a combustion.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's methane burning,
// calcium carbonate coming apart into calcium oxide and carbon dioxide with the atoms counted on
// each side, and the lesson's ethene burning as a smaller model of the butane.

const decomposing = reaction('cd', { from: [{ t: 'CaCO3' }], to: [{ t: 'CaO' }, { t: 'CO2' }], counts: true });

const QUESTION =
  'Write a balanced molecular equation describing each of the following chemical reactions. (a) Solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas. (b) Gaseous butane, C4H10, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor.';

const video: Explainer = {
  id: 'xq-c20-4-1',
  lessonId: '',
  exam: {
    lesson: 'c20-4-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 5 (a) and (b), section 4.1, Writing and Balancing Chemical Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Balancing a Decomposition and a Combustion. Chemical Equations',
  thumbnailTitle: 'Balance These Two Equations',
  thumbnail: 'cd',
  summary:
    'A real test question, solved one small step at a time: write balanced equations for calcium carbonate decomposing and for butane burning. We turn words into formulas, balance carbon, hydrogen and then oxygen, and watch the atoms rearrange with none made or lost.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Balance These Two Equations', subtitle: 'A decomposition and a combustion, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about writing and balancing chemical equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Write a balanced molecular equation describing each of the following chemical reactions.<br>(a) Solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas.<br>(b) Gaseous butane, $\\ce{C4H10}$, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor.',
          answer: '(a) CaCO₃ → CaO + CO₂; (b) 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O',
        },
      ],
      lines: [
        { say: 'Here is the question, from the first two parts of the exercise. Write a balanced molecular equation describing each of the following chemical reactions.', show: 'q' },
        { say: 'Part a: solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas.', caption: '(a) Solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas.' },
        { say: 'Part b: gaseous butane, C four H ten, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapour.', caption: '(b) Gaseous butane, C₄H₁₀, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Turn each sentence into **formulas** with **states**, then add **coefficients** so every atom is counted on both sides' }],
      lines: [
        { say: 'In plain words, we turn each sentence into formulas, with their states, and then put numbers in front so the equation balances.', show: 'plain' },
        { say: 'Diatomic oxygen means oxygen as O two molecules.', caption: 'Diatomic oxygen means oxygen as O₂ molecules.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(burning, 'mb')],
      lines: [
        { say: 'Here is what we need. These are a methane molecule and two oxygen molecules.', show: 'mb' },
        { say: 'Watch them react. Every bond breaks, and the same atoms join up again as carbon dioxide and water. No atom is made, and none is lost.', play: 'mb.burn' },
        { say: 'So a balanced equation has the same number of each kind of atom on both sides. We balance it by changing the coefficients, the numbers in front, and never the subscripts inside a formula.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **formulas** and **states** from the words', 'Balance one **element** at a time, oxygen last', '**Count** every atom on both sides'] }],
      lines: [
        { say: 'Here is the plan. First, write the formulas and states from the words.', show: 'plan.0' },
        { say: 'Then balance one element at a time, leaving oxygen until last when it appears in several places.', show: 'plan.1' },
        { say: 'Then count every atom on both sides as a check.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [decomposing, { kind: 'math', id: 'a', size: 'md', lines: ['\\ce{CaCO3(s) -> CaO(s) + CO2(g)}'] }],
      lines: [
        { say: 'Step one, part a. Calcium carbonate is C a C O three, calcium oxide is C a O, and carbon dioxide is C O two.', show: 'cd', caption: 'Step one, part (a). Calcium carbonate is CaCO₃, calcium oxide is CaO, and carbon dioxide is CO₂.' },
        { say: 'Watch the calcium carbonate come apart when it is heated. One calcium, one carbon and three oxygen atoms on the left, and the same on the right.', play: 'cd.go' },
        { say: 'It already balances, so every coefficient is one. One substance breaking into simpler ones is a decomposition.', show: 'a.0', focus: 'a.0', caption: 'It already balances, so every coefficient is 1: CaCO₃(s) → CaO(s) + CO₂(g). One substance breaking into simpler ones is a decomposition.' },
      ],
    },
    {
      chapter: 'Step 2: Part (b), carbon and hydrogen',
      layout: 'center',
      main: [
        pick(ethene, 'eb'),
        { kind: 'math', id: 'b', size: 'md', lines: ['\\ce{C4H10 + O2 -> CO2 + H2O}', '4\\ \\ce{C} \\Rightarrow 4\\,\\ce{CO2} \\qquad 10\\ \\ce{H} \\Rightarrow 5\\,\\ce{H2O}'] },
      ],
      lines: [
        { say: 'Step two, part b. A fuel burning in oxygen is a combustion. Here is a smaller fuel, ethene, burning: its carbon atoms all end up in carbon dioxide, and its hydrogen atoms in water.', show: 'eb', play: 'eb.go' },
        { say: 'For butane, the skeleton is C four H ten plus O two gives C O two plus H two O.', show: 'b.0', caption: 'For butane, the skeleton is C₄H₁₀ + O₂ → CO₂ + H₂O.' },
        { say: 'Butane has four carbon atoms, so we need four carbon dioxide molecules.', show: 'b.1', caption: 'Butane has four carbon atoms, so we need 4CO₂.' },
        { say: 'It has ten hydrogen atoms, and each water molecule holds two, so we need five water molecules.', caption: 'It has ten hydrogen atoms, and each water molecule holds two, so we need 5H₂O.' },
      ],
    },
    {
      chapter: 'Step 3: Part (b), oxygen',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'o',
          size: 'md',
          lines: ['\\text{O on the right: } 4 \\times 2 + 5 \\times 1 = 13', '\\ce{C4H10} + \\tfrac{13}{2}\\,\\ce{O2 -> 4CO2 + 5H2O}', '\\times 2: \\quad \\good{\\ce{2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(g)}}'],
        },
      ],
      lines: [
        { say: 'Step three. Now oxygen. On the right there are four times two, plus five times one: thirteen oxygen atoms.', show: 'o.0', caption: 'Step three. Now oxygen. On the right there are 4 × 2 + 5 × 1 = 13 oxygen atoms.' },
        { say: 'Oxygen comes as O two, so we would need thirteen halves of an oxygen molecule.', show: 'o.1', caption: 'Oxygen comes as O₂, so we would need 13/2 of an oxygen molecule.' },
        { say: 'Coefficients should be whole numbers, so double everything: two C four H ten plus thirteen O two gives eight C O two plus ten H two O, all gases.', show: 'o.2', focus: 'o.2', caption: 'Coefficients should be whole numbers, so double everything: 2C₄H₁₀(g) + 13O₂(g) → 8CO₂(g) + 10H₂O(g).' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Atom', 'Left side', 'Right side'],
          rows: [
            ['C', '$2 \\times 4 = 8$', '$8 \\times 1 = 8$'],
            ['H', '$2 \\times 10 = 20$', '$10 \\times 2 = 20$'],
            ['O', '$13 \\times 2 = 26$', '$8 \\times 2 + 10 \\times 1 = 26$'],
          ],
        },
      ],
      lines: [
        { say: 'Check part b by counting. Carbon: two times four is eight on the left, and eight on the right.', show: ['k', 'k.0'], focus: 'k.0' },
        { say: 'Hydrogen: twenty on each side.', focus: 'k.1' },
        { say: 'Oxygen: thirteen times two is twenty six on the left, and sixteen plus ten is twenty six on the right. Every atom balances, and both equations match the book.', focus: 'k.2' },
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
            ['$\\ce{C4H10 + O2 -> CO2 + H2O}$', 'Left **unbalanced**: 4 C on the left, 1 on the right'],
            ['$\\ce{C4H10 + O13 -> 4CO2 + 5H2O}$', 'Changed a **subscript**; oxygen is always $\\ce{O2}$'],
            ['$\\ce{C4H10 + 9O2 -> 4CO2 + 5H2O}$', 'Counted **9** O atoms on the right, not 13'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Leaving the skeleton unbalanced. It has four carbon atoms on the left and only one on the right.', focus: 'traps.0' },
        { say: 'Changing a subscript, such as writing O thirteen. That is a different substance. Oxygen gas is always O two, so only its coefficient can change.', focus: 'traps.1', caption: 'Changing a subscript, such as writing O₁₃. That is a different substance. Oxygen gas is always O₂, so only its coefficient can change.' },
        { say: 'And miscounting the oxygen on the right. Each carbon dioxide holds two oxygen atoms, so four of them hold eight, plus five in the water: thirteen.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Balance the combustion of propane: $\\ce{C3H8 + O2 -> CO2 + H2O}$. What is the coefficient of $\\ce{O2}$ when the coefficients are the smallest whole numbers?',
          choices: ['$5$', '$3$', '$10$', '$7$'],
          answer: 0,
          working: '$\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$: $3 \\times 2 + 4 = 10$ oxygen atoms, so $5\\ \\ce{O2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Balance the combustion of propane, C three H eight. What is the coefficient of oxygen, when the coefficients are the smallest whole numbers? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Balance the combustion of propane: C₃H₈ + O₂ → CO₂ + H₂O. What is the coefficient of O₂ when the coefficients are the smallest whole numbers? Pause the video and try it.' },
        { say: 'Three carbon atoms make three C O two, and eight hydrogen atoms make four H two O. That is six plus four, ten oxygen atoms, so five O two: choice A.', show: 'q2.answer', caption: 'Three carbon atoms make 3CO₂, and eight hydrogen atoms make 4H₂O. That is 6 + 4 = 10 oxygen atoms, so 5O₂: choice A.' },
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
          items: ['Change **coefficients**, never subscripts', 'In a combustion, balance **C**, then **H**, then **O**', 'Clear a **half** by doubling every coefficient'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Balance an equation by changing coefficients, never the subscripts inside a formula.', show: 'sum.0' },
        { say: 'In a combustion, balance carbon first, then hydrogen, then oxygen.', show: 'sum.1' },
        { say: 'If oxygen ends up needing a half, double every coefficient. For more on balancing equations, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
