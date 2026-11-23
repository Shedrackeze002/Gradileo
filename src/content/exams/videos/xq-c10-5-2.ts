import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import { flow } from '@/content/chem10/videos/lib/c10-5-figures.ts';

// Exam question for Chemistry 10 lesson 5.2 (moles, masses and mole ratios): the moles and mass of
// chlorine that react with 10.0 g of sodium. The question is OpenStax Chemistry 2e's own, word for
// word (end-of-chapter exercise 42, part (a), section 4.3, CC BY-NC-SA 4.0); exercise 43 then asks
// for the numbers. The book's answers (exercise 43 (a)): 2Na + Cl2 -> 2NaCl; 0.435 mol Na,
// 0.217 mol Cl2, 15.4 g Cl2.
//
// The pictures: two sodium atoms and one chlorine molecule becoming two units of sodium chloride,
// with every atom kept (src/video/molecules.ts), so the 2 to 1 ratio is something we can see, and
// the mass to moles to moles to mass chain filled in with the numbers.

const QUESTION =
  'Write the balanced equation, then outline the steps necessary to determine the information requested in each of the following: (a) The number of moles and the mass of chlorine, Cl2, required to react with 10.0 g of sodium metal, Na, to produce sodium chloride, NaCl.';

const chain = () =>
  figure(
    'w',
    [
      flow({
        nodes: [
          { id: 'm1', tex: '\\begin{gathered}\\text{mass}\\\\ \\ce{Na}\\end{gathered}', tone: 'opp', value: '10.0\\ \\text{g}' },
          { id: 'n1', tex: '\\begin{gathered}\\text{moles}\\\\ \\ce{Na}\\end{gathered}', tone: 'brand', value: '0.435\\ \\text{mol}' },
          { id: 'n2', tex: '\\begin{gathered}\\text{moles}\\\\ \\ce{Cl2}\\end{gathered}', tone: 'brand', value: '0.217\\ \\text{mol}' },
          { id: 'm2', tex: '\\begin{gathered}\\text{mass}\\\\ \\ce{Cl2}\\end{gathered}', tone: 'opp', value: '15.4\\ \\text{g}' },
        ],
        arrows: [
          { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 22.99', tone: 'good' },
          { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\tfrac{1}{2}', tone: 'theta' },
          { id: 'a3', from: 'n2', to: 'm2', tex: '\\times 70.90', tone: 'good' },
        ],
        width: 2.6,
        height: 1.9,
        gap: 2.4,
      }),
    ],
    230,
  );

const video: Explainer = {
  id: 'xq-c10-5-2',
  lessonId: '',
  exam: {
    lesson: 'c10-5-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercises 42 (a) and 43, section 4.3, Reaction Stoichiometry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Chlorine Reacts with 10.0 g of Sodium? Moles and Masses',
  thumbnailTitle: 'Grams to Moles and Back',
  thumbnail: 'na',
  summary:
    'A real test question, solved one small step at a time: what amount and what mass of chlorine react with 10.0 g of sodium? We balance the equation, watch two sodium atoms take one chlorine molecule, and go from grams to moles, through the mole ratio, and back to grams.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Grams to Moles and Back', subtitle: 'Reacting masses, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about how much chlorine reacts with a piece of sodium. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Write the balanced equation, then outline the steps necessary to determine the information requested in each of the following:<br>(a) The number of moles and the mass of chlorine, $\\ce{Cl2}$, required to react with $10.0\\ \\text{g}$ of sodium metal, $\\ce{Na}$, to produce sodium chloride, $\\ce{NaCl}$.',
          answer: '$\\ce{2Na + Cl2 -> 2NaCl}$; $0.217\\ \\text{mol}$, $15.4\\ \\text{g}$ of $\\ce{Cl2}$',
          working: 'grams of Na ÷ 22.99 → moles of Na × ½ → moles of Cl₂ × 70.90 → grams of Cl₂',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Write the balanced equation, then outline the steps necessary to determine the information requested. Part a: the number of moles and the mass of chlorine, C l two, required to react with 10.0 grams of sodium metal, N a, to produce sodium chloride, N a C l.', caption: 'Write the balanced equation, then outline the steps necessary to determine the information requested. Part (a): the number of moles and the mass of chlorine, Cl₂, required to react with 10.0 g of sodium metal, Na, to produce sodium chloride, NaCl.' },
        { say: 'The next exercise in the book asks us to work out the numbers too, so we will do both.' },
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
          items: ['**Given**: $10.0\\ \\text{g}$ of sodium', '**Wanted**: moles and grams of chlorine', 'A **balanced equation** links the two'],
        },
      ],
      lines: [
        { say: 'Let us sort it out. We are given a mass of sodium: 10.0 grams.', show: 'ask.0' },
        { say: 'We want two things about the chlorine that reacts with it: how many moles, and how many grams.', show: 'ask.1' },
        { say: 'The only link between sodium and chlorine is the balanced equation, so that comes first.', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'n', size: 'lg', lines: ['\\text{moles} = \\dfrac{\\text{mass}}{\\text{molar mass}}'] },
        { kind: 'callout', id: 'ratio', tone: 'key', title: 'The mole ratio', md: 'The numbers in front in a balanced equation give the ratio of **moles**, never of grams.' },
      ],
      lines: [
        { say: 'Here is what we need. To turn a mass into moles, divide the mass by the molar mass.', show: 'n' },
        { say: 'And the numbers in front in a balanced equation tell us how many moles of each substance react. They give a ratio of moles, never of grams.', show: 'ratio' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [chain()],
      lines: [
        { say: 'Here is the plan, the steps the question asks us to outline. We cannot go straight from grams of sodium to grams of chlorine, so we go through moles.', show: ['w.m1', 'w.m2'] },
        { say: 'First, mass of sodium to moles of sodium: divide by the molar mass of sodium.', show: ['w.a1', 'w.n1'], focus: 'w.a1' },
        { say: 'Second, moles of sodium to moles of chlorine: use the mole ratio from the equation.', show: ['w.a2', 'w.n2'], focus: 'w.a2' },
        { say: 'Third, moles of chlorine to mass of chlorine: multiply by the molar mass of chlorine.', show: 'w.a3', focus: 'w.a3' },
      ],
    },
    {
      chapter: 'Step 1: The balanced equation',
      layout: 'center',
      main: [
        reaction('na', { from: [{ t: 'Na', n: 2 }, { t: 'Cl2' }], to: [{ t: 'NaCl', n: 2 }], counts: true, height: 360 }),
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{2Na + Cl2 -> 2NaCl}'] },
      ],
      lines: [
        { say: 'Step one. Sodium, N a, reacts with chlorine, C l two, to make sodium chloride, N a C l. A chlorine molecule has two atoms, so it needs two sodium atoms.', show: 'na', caption: 'Step one. Sodium, Na, reacts with chlorine, Cl₂, to make sodium chloride, NaCl. A chlorine molecule has two atoms, so it needs two sodium atoms.' },
        { say: 'Watch them react. Each sodium atom hands an electron to a chlorine atom, and they become two units of sodium chloride.', play: 'na.go', playDelay: 0.3 },
        { say: 'So the balanced equation is: two N a plus C l two makes two N a C l. Two sodium for every one chlorine molecule.', show: 'eq', caption: 'So the balanced equation is 2Na + Cl₂ → 2NaCl. Two sodium for every one chlorine molecule.' },
      ],
    },
    {
      chapter: 'Step 2: The numbers',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{Na}) = \\dfrac{\\opp{10.0\\ \\text{g}}}{22.99\\ \\text{g/mol}} = \\brand{0.435\\ \\text{mol}}',
            'n(\\ce{Cl2}) = 0.435 \\times \\thc{\\tfrac{1}{2}} = \\brand{0.217\\ \\text{mol}}',
            'm(\\ce{Cl2}) = 0.217\\ \\text{mol} \\times 70.90\\ \\text{g/mol} = \\opp{15.4\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Step two: the numbers. 10.0 grams of sodium, divided by 22.99 grams per mole, is 0.435 moles of sodium.', show: 'm.0' },
        { say: 'The equation needs one chlorine molecule for every two sodium atoms, so we halve it: 0.217 moles of chlorine.', show: 'm.1' },
        { say: 'Chlorine gas is C l two, so its molar mass is two times 35.45, which is 70.90 grams per mole. 0.217 moles times 70.90 is 15.4 grams of chlorine.', show: 'm.2', caption: 'Chlorine gas is Cl₂, so its molar mass is 2 × 35.45, which is 70.90 g/mol. 0.217 mol × 70.90 g/mol is 15.4 g of chlorine.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [chain()],
      lines: [
        { say: 'Here is the whole answer, with the outline and the numbers together. 10.0 grams of sodium is 0.435 moles, which needs 0.217 moles of chlorine, which is 15.4 grams. That matches the book.', show: ['w.m1', 'w.m1-value', 'w.a1', 'w.n1', 'w.n1-value', 'w.a2', 'w.n2', 'w.n2-value', 'w.a3', 'w.m2', 'w.m2-value'] },
        { say: 'A quick check: 10.0 grams of sodium and 15.4 grams of chlorine should make 25.4 grams of sodium chloride. And 0.435 moles of sodium chloride, at 58.44 grams per mole, is 25.4 grams. It agrees.' },
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
            ['$7.71\\ \\text{g}$', 'Used 35.45 for chlorine gas, not **70.90**'],
            ['$30.8\\ \\text{g}$', 'Left out the mole **ratio**'],
            ['$5.00\\ \\text{g}$', 'Used the ratio on **grams**, not moles'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Getting 7.71 grams by using 35.45, the molar mass of a single chlorine atom. Chlorine gas is made of molecules of two atoms.', focus: 'traps.0' },
        { say: 'Getting 30.8 grams by leaving out the ratio. Two sodium atoms react with each chlorine molecule, so the moles of chlorine are half the moles of sodium.', focus: 'traps.1' },
        { say: 'And getting 5.00 grams by halving the 10.0 grams. The mole ratio works only on moles, so turn grams into moles first.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\ce{2H2 + O2 -> 2H2O}$, how many moles of water form from $3.0\\ \\text{mol}$ of $\\ce{O2}$?',
          choices: ['$6.0\\ \\text{mol}$', '$3.0\\ \\text{mol}$', '$1.5\\ \\text{mol}$', '$12\\ \\text{mol}$'],
          answer: 0,
          working: 'The ratio of O₂ to H₂O is 1 to 2, so 3.0 × 2 = 6.0 mol.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen burns in oxygen: two H two plus O two makes two H two O. How many moles of water form from 3.0 moles of oxygen? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Hydrogen burns in oxygen: 2H₂ + O₂ → 2H₂O. How many moles of water form from 3.0 mol of oxygen? Pause the video and try it.' },
        { say: 'One mole of oxygen makes two moles of water, so 3.0 moles of oxygen makes 6.0 moles of water: choice A.', show: 'q2.answer' },
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
          items: ['Balance the **equation** first', 'Grams → moles: **divide** by the molar mass', 'Use the **mole ratio**, then **multiply** by the molar mass'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Write and balance the equation first.', show: 'sum.0' },
        { say: 'Turn the mass you are given into moles, by dividing by its molar mass.', show: 'sum.1' },
        { say: 'Then use the mole ratio from the equation, and multiply by the molar mass of the substance you want. For more on moles and masses, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
