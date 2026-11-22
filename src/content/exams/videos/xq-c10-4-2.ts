import type { Explainer } from '@/video/script.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 10 lesson 4.2 (balancing equations): write balanced equations for
// four reactions described in words. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 5, section 4.1, CC BY-NC-SA 4.0). The book's answers:
// (a) CaCO3(s) -> CaO(s) + CO2(g); (b) 2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(g);
// (c) MgCl2(aq) + 2NaOH(aq) -> Mg(OH)2(s) + 2NaCl(aq); (d) 2H2O(g) + 2Na(s) -> 2NaOH(s) + H2(g).
//
// The pictures (src/video/molecules.ts): the atoms of parts (c) and (d) coming apart and joining
// up again as the products, with the atoms of each element counted on both sides, so a balanced
// equation is one where every atom is kept.

const QUESTION =
  'Write a balanced molecular equation describing each of the following chemical reactions. (a) Solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas. (b) Gaseous butane, C4H10, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor. (c) Aqueous solutions of magnesium chloride and sodium hydroxide react to produce solid magnesium hydroxide and aqueous sodium chloride. (d) Water vapor reacts with sodium metal to produce solid sodium hydroxide and hydrogen gas.';

const video: Explainer = {
  id: 'xq-c10-4-2',
  lessonId: '',
  exam: {
    lesson: 'c10-4-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 5, section 4.1, Writing and Balancing Chemical Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Writing Balanced Equations from Words. Balancing Chemical Equations',
  thumbnailTitle: 'From Words to Equations',
  thumbnail: 'na',
  summary:
    'A real test question, solved one small step at a time: we turn four reactions described in words into balanced equations with state symbols, from heating calcium carbonate to burning butane. We watch the atoms of two of the reactions rearrange, with every atom counted on both sides, so a balanced equation keeps every atom.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'From Words to Equations', subtitle: 'Balancing equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to turn four reactions described in words into balanced equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Write a balanced molecular equation describing each of the following chemical reactions.<br>(a) Solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas.<br>(b) Gaseous butane, C₄H₁₀, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor.<br>(c) Aqueous solutions of magnesium chloride and sodium hydroxide react to produce solid magnesium hydroxide and aqueous sodium chloride.<br>(d) Water vapor reacts with sodium metal to produce solid sodium hydroxide and hydrogen gas.',
          answer: 'Coefficients: (a) 1, 1, 1 (b) 2, 13, 8, 10 (c) 1, 2, 1, 2 (d) 2, 2, 2, 1',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Write a balanced molecular equation describing each of the following chemical reactions. Part a: solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas. Part b: gaseous butane, C four H ten, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor.', caption: 'Write a balanced molecular equation describing each of the following chemical reactions. Part (a): solid calcium carbonate is heated and decomposes to solid calcium oxide and carbon dioxide gas. Part (b): gaseous butane, C₄H₁₀, reacts with diatomic oxygen gas to yield gaseous carbon dioxide and water vapor.' },
        { say: 'Part c: aqueous solutions of magnesium chloride and sodium hydroxide react to produce solid magnesium hydroxide and aqueous sodium chloride. Part d: water vapor reacts with sodium metal to produce solid sodium hydroxide and hydrogen gas.' },
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
          items: ['Turn each **name** into a **formula**', 'Balance with numbers **in front** of the formulas', 'Add the **state symbols**: (s), (l), (g), (aq)'],
        },
      ],
      lines: [
        { say: 'Each part describes a reaction in words. First we turn each name into a formula.', show: 'ask.0' },
        { say: 'Then we balance the equation, by putting numbers in front of the formulas.', show: 'ask.1' },
        { say: 'And the words tell us each substance\'s state: solid, liquid, gas, or aqueous, which means dissolved in water. Those become the state symbols.', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        reaction('na', { from: [{ t: 'Na', n: 2 }, { t: 'H2O', n: 2 }], to: [{ t: 'NaOH', n: 2 }, { t: 'H2' }], counts: true }),
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Balancing', md: 'Change only the numbers **in front**. Changing a small number inside a formula makes a **different substance**.' },
      ],
      lines: [
        { say: 'Here is what we need. An equation is balanced when every atom on the left turns up on the right. Here is part d, sodium and water, with the atoms of each element counted.', show: 'na' },
        { say: 'Watch the atoms. The bonds break, and the same atoms join up again as sodium hydroxide and hydrogen. Two sodium, four hydrogen and two oxygen on each side.', play: 'na.go', playDelay: 0.3 },
        { say: 'To balance, we change only the numbers in front of the formulas, which say how many molecules there are. We never change a small number inside a formula, because that would make a different substance.', show: 'rule' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write every **formula** with its **state**', 'Balance the element in the **fewest** places first', 'Balance **H**, then **O** last, and check every count'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, write every formula with its state symbol.', show: 'plan.0' },
        { say: 'Second, balance an element that appears in only one substance on each side, such as carbon or a metal.', show: 'plan.1' },
        { say: 'Third, balance hydrogen, then leave oxygen to last, because it often turns up in several places. Then count every element again.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'lg',
          lines: ['\\ce{CaCO3(s) -> CaO(s) + CO2(g)}', '\\text{left: } \\adj{1\\ \\ce{Ca}},\\ \\hyp{1\\ \\ce{C}},\\ \\opp{3\\ \\ce{O}} \\qquad \\text{right: } \\adj{1\\ \\ce{Ca}},\\ \\hyp{1\\ \\ce{C}},\\ \\opp{1 + 2 = 3\\ \\ce{O}}'],
        },
      ],
      lines: [
        { say: 'Step one, part a. Calcium carbonate is C a C O three, a solid. It makes solid calcium oxide, C a O, and carbon dioxide gas, C O two.', show: 'a.0', caption: 'Step one, part (a). Calcium carbonate is CaCO₃, a solid. It makes solid calcium oxide, CaO, and carbon dioxide gas, CO₂.' },
        { say: 'Count the atoms. One calcium, one carbon and three oxygen on the left. On the right, one calcium, one carbon, and one plus two, which is three, oxygen. This one is balanced as it stands.', show: 'a.1' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'b',
          size: 'md',
          lines: [
            '\\ce{C4H10(g) + O2(g) -> CO2(g) + H2O(g)}',
            '\\hyp{\\text{C: } 4} \\Rightarrow \\ce{C4H10} + \\ce{O2} \\longrightarrow \\hyp{4}\\,\\ce{CO2} + \\ce{H2O}',
            '\\adj{\\text{H: } 10} \\Rightarrow \\ce{C4H10} + \\ce{O2} \\longrightarrow \\ce{4CO2} + \\adj{5}\\,\\ce{H2O}',
            '\\opp{\\text{O: } 8 + 5 = 13} \\Rightarrow \\ce{C4H10} + \\opp{\\tfrac{13}{2}}\\,\\ce{O2} \\longrightarrow \\ce{4CO2} + \\ce{5H2O}',
            '\\times 2: \\quad \\brand{2}\\,\\ce{C4H10(g)} + \\brand{13}\\,\\ce{O2(g)} \\longrightarrow \\brand{8}\\,\\ce{CO2(g)} + \\brand{10}\\,\\ce{H2O(g)}',
          ],
        },
      ],
      lines: [
        { say: 'Step two, part b. Butane is C four H ten, and diatomic oxygen is O two. They make carbon dioxide and water vapor, all gases.', show: 'b.0', caption: 'Step two, part (b). Butane is C₄H₁₀, and diatomic oxygen is O₂. They make carbon dioxide and water vapor, all gases.' },
        { say: 'Carbon first. There are four carbon atoms in butane, so we need four carbon dioxide molecules.', show: 'b.1' },
        { say: 'Then hydrogen. There are ten hydrogen atoms, and each water molecule holds two, so we need five water molecules.', show: 'b.2' },
        { say: 'Oxygen last. On the right there are eight oxygen atoms in the carbon dioxide and five in the water, thirteen in all. That would need thirteen halves of an oxygen molecule.', show: 'b.3' },
        { say: 'We cannot have half a molecule, so we double everything: two butane, thirteen oxygen, eight carbon dioxide and ten water.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [
        reaction('mg', { from: [{ t: 'MgCl2' }, { t: 'NaOH', n: 2 }], to: [{ t: 'MgOH2' }, { t: 'NaCl', n: 2 }], counts: true, height: 380 }),
        { kind: 'math', id: 'c', size: 'md', lines: ['\\ce{MgCl2(aq) + 2NaOH(aq) -> Mg(OH)2(s) + 2NaCl(aq)}'] },
      ],
      lines: [
        { say: 'Step three, part c. Magnesium chloride is M g C l two, and sodium hydroxide is N a O H. They make magnesium hydroxide, M g O H two in brackets, and sodium chloride.', show: 'mg', caption: 'Step three, part (c). Magnesium chloride is MgCl₂, and sodium hydroxide is NaOH. They make magnesium hydroxide, Mg(OH)₂, and sodium chloride.' },
        { say: 'Magnesium hydroxide needs two hydroxide groups, so we need two sodium hydroxide. That brings two sodium, which needs two sodium chloride, and that uses both chlorine atoms. Watch the ions swap partners.', play: 'mg.go', playDelay: 0.3 },
        { say: 'Magnesium chloride, sodium hydroxide and sodium chloride are dissolved, so aqueous. Magnesium hydroxide is the solid.', show: 'c' },
      ],
    },
    {
      chapter: 'Step 4: Part (d)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'd',
          size: 'lg',
          lines: ['\\ce{H2O(g) + Na(s) -> NaOH(s) + H2(g)}', '\\adj{\\text{H: } 2 \\text{ on the left, } 1 + 2 = 3 \\text{ on the right}}', '\\brand{2}\\,\\ce{H2O(g)} + \\brand{2}\\,\\ce{Na(s)} \\longrightarrow \\brand{2}\\,\\ce{NaOH(s)} + \\ce{H2(g)}'],
        },
      ],
      lines: [
        { say: 'Step four, part d. Water vapor is H two O, as a gas. Sodium metal is N a, a solid. They make solid sodium hydroxide and hydrogen gas, H two.', show: 'd.0', caption: 'Step four, part (d). Water vapor is H₂O, as a gas. Sodium metal is Na, a solid. They make solid sodium hydroxide and hydrogen gas, H₂.' },
        { say: 'Hydrogen does not balance: two on the left, but one plus two, three, on the right.', show: 'd.1' },
        { say: 'Two water molecules give four hydrogen atoms: two in two sodium hydroxide and two in one hydrogen molecule. Two sodium hydroxide need two sodium. That is the reaction we watched at the start.', show: 'd.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Balanced equation'],
          rows: [
            ['(a)', '$\\ce{CaCO3(s) -> CaO(s) + CO2(g)}$'],
            ['(b)', '$\\ce{2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(g)}$'],
            ['(c)', '$\\ce{MgCl2(aq) + 2NaOH(aq) -> Mg(OH)2(s) + 2NaCl(aq)}$'],
            ['(d)', '$\\ce{2H2O(g) + 2Na(s) -> 2NaOH(s) + H2(g)}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. It matches the book.', show: 'ans' },
        { say: 'A quick check on part b, the hardest one. Oxygen on the left: thirteen molecules of two, which is 26 atoms. On the right: eight times two is 16, plus ten, which is 26. It balances.' },
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
            ['$\\ce{Na + H2O -> NaOH + H}$', 'Hydrogen gas is **diatomic**: $\\ce{H2}$'],
            ['$\\ce{MgCl2 + NaOH -> MgOH + NaCl2}$', 'Changed the **formulas** to balance'],
            ['$\\ce{C4H10} + \\tfrac{13}{2}\\,\\ce{O2} \\longrightarrow \\ce{4CO2} + \\ce{5H2O}$', 'Left a **half** molecule in the answer'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Writing hydrogen gas as a single H. Hydrogen and oxygen gases are made of molecules of two atoms, H two and O two.', focus: 'traps.0', caption: 'Writing hydrogen gas as a single H. Hydrogen and oxygen gases are made of molecules of two atoms, H₂ and O₂.' },
        { say: 'Changing the formulas to make the numbers work. M g O H and N a C l two are not real substances. Only the numbers in front can change.', focus: 'traps.1', caption: 'Changing the formulas to make the numbers work. MgOH and NaCl₂ are not real substances. Only the numbers in front can change.' },
        { say: 'And leaving thirteen halves, or 6.5, in the final answer. Double everything to get whole numbers.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Balance: $\\square\\,\\ce{Al} + \\square\\,\\ce{O2} \\longrightarrow \\square\\,\\ce{Al2O3}$',
          choices: ['1, 1, 1', '2, 3, 1', '4, 6, 2', '4, 3, 2'],
          answer: 3,
          working: 'Oxygen: 3 O₂ gives 6 O, which is 2 Al₂O₃. That holds 4 Al, so 4 Al.',
        },
      ],
      lines: [
        { say: 'Your turn. Balance the equation: aluminum plus oxygen makes aluminum oxide, A l two O three. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Balance the equation: aluminum plus oxygen makes aluminum oxide, Al₂O₃. Pause the video and try it.' },
        { say: 'Oxygen comes in twos on the left and threes on the right, so make six of each: three oxygen molecules and two aluminum oxide. Those hold four aluminum atoms. So it is 4, 3, 2, choice D.', show: 'q2.answer' },
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
          items: ['Write every **formula** and **state** first', 'Change only the numbers **in front**', 'Balance oxygen **last**, then double any halves'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Turn the words into formulas and state symbols first.', show: 'sum.0' },
        { say: 'To balance, change only the numbers in front of the formulas, so that every atom is kept.', show: 'sum.1' },
        { say: 'And balance oxygen last, then double everything if you are left with a half. For more on balancing equations, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
