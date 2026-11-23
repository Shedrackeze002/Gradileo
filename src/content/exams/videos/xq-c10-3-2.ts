import type { Explainer } from '@/video/script.ts';
import { redox } from '@/content/chem30/videos/lib/c30-atoms.ts';

// Exam question for Chemistry 10 lesson 3.2 (ionic compounds: names and formulas): write the
// formulas of eight compounds. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 53, section 2.7, CC BY-NC-SA 4.0). The book's answers: (a) RbBr,
// (b) MgSe, (c) Na2O, (d) CaCl2, (e) HF, (f) GaP, (g) AlBr3, (h) (NH4)2SO4.
//
// The pictures (src/video/atoms.ts): two sodium atoms each handing one electron to an oxygen atom,
// so it takes two sodium ions to balance one oxide ion (part c), then calcium handing one electron
// to each of two chlorine atoms (part d).

const QUESTION =
  'Write the formulas of the following compounds: (a) rubidium bromide (b) magnesium selenide (c) sodium oxide (d) calcium chloride (e) hydrogen fluoride (f) gallium phosphide (g) aluminum bromide (h) ammonium sulfate';

const sodiumOxide = redox(
  'nao',
  [
    { id: 'n1', symbol: 'Na', protons: 11, name: 'sodium', at: [3, 3.6], tone: 'brand' },
    { id: 'o', symbol: 'O', protons: 8, name: 'oxygen', at: [10, 3.6], tone: 'bad' },
    { id: 'n2', symbol: 'Na', protons: 11, name: 'sodium', at: [17, 3.6], tone: 'brand' },
  ],
  [
    { from: 'n1', to: 'o', n: 1 },
    { from: 'n2', to: 'o', n: 1 },
  ],
  [20, 7.2],
  400,
);

const calciumChloride = redox(
  'cacl',
  [
    { id: 'c1', symbol: 'Cl', protons: 17, name: 'chlorine', at: [3.2, 3.6], tone: 'good' },
    { id: 'ca', symbol: 'Ca', protons: 20, name: 'calcium', at: [10, 3.6], tone: 'opp' },
    { id: 'c2', symbol: 'Cl', protons: 17, name: 'chlorine', at: [16.8, 3.6], tone: 'good' },
  ],
  [
    { from: 'ca', to: 'c1', n: 1 },
    { from: 'ca', to: 'c2', n: 1 },
  ],
  [20, 7.2],
  400,
);

const video: Explainer = {
  id: 'xq-c10-3-2',
  lessonId: '',
  exam: {
    lesson: 'c10-3-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 53, section 2.7, Chemical Nomenclature',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Writing Formulas of Ionic Compounds from Their Names',
  thumbnailTitle: 'Make the Charges Cancel',
  thumbnail: 'nao',
  summary:
    'A real test question, solved one small step at a time: we write the formulas of eight compounds, from rubidium bromide to ammonium sulfate. We watch sodium hand electrons to oxygen, and see why the charges of the ions must cancel. Then we find each ion\'s charge from its group and balance the charges.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Make the Charges Cancel', subtitle: 'Formulas of ionic compounds, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to write the formulas of eight compounds from their names. We will take it one small step at a time.', show: 'title' },
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
          prompt: 'Write the formulas of the following compounds:<br>(a) rubidium bromide (b) magnesium selenide (c) sodium oxide (d) calcium chloride<br>(e) hydrogen fluoride (f) gallium phosphide (g) aluminum bromide (h) ammonium sulfate',
          answer: '(a) RbBr (b) MgSe (c) $\\ce{Na2O}$ (d) $\\ce{CaCl2}$ (e) HF (f) GaP (g) $\\ce{AlBr3}$ (h) $\\ce{(NH4)2SO4}$',
          working: 'Find each ion\'s charge, then take just enough of each ion for the charges to add up to zero.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Write the formulas of the following compounds. Rubidium bromide, magnesium selenide, sodium oxide, calcium chloride, hydrogen fluoride, gallium phosphide, aluminum bromide, and ammonium sulfate.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Name → **which ions**, and **how many of each**' }],
      lines: [
        { say: 'Each name tells us which two parts the compound is made of: the metal, or ammonium, first, and the non-metal part second, with its ending changed to ide, as in bromide.', show: 'plain' },
        { say: 'A formula also tells us how many of each part there are. That is what we must work out.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [sodiumOxide, { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times (\\opp{+1}) + 1 \\times (\\adj{-2}) = 0 \\ \\to\\ \\ce{Na2O}'] }],
      lines: [
        { say: 'Here is what we need. In an ionic compound, metal atoms hand electrons to non-metal atoms. Oxygen needs two more electrons to fill its outer shell, but each sodium atom has only one to give.', show: ['nao', 'nao.labels', 'nao.arrangement'] },
        { say: 'So it takes two sodium atoms. Watch each one hand over its electron. Now there are two sodium ions, each plus one, and one oxide ion, minus two.', show: 'nao.charges', play: 'nao.give', playDelay: 0.3 },
        { say: 'The charges add up to zero, as they must in every compound. So the formula is N a two O.', show: 'm.0', caption: 'The charges add up to zero, as they must in every compound. So the formula is Na₂O.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'plan', items: ['Find each ion\'s **charge** from its group', 'Take the **fewest** ions whose charges add to **zero**', 'Keep polyatomic ions whole, in **brackets** if there is more than one'] },
        { kind: 'table', id: 'ch', head: ['Group', '1', '2', '13', '15', '16', '17'], rows: [['Charge', '+1', '+2', '+3', '−3', '−2', '−1']] },
      ],
      lines: [
        { say: 'Here is the plan. First, find each ion\'s charge from its group: plus one, plus two and plus three for groups 1, 2 and 13, and minus three, minus two and minus one for groups 15, 16 and 17.', show: ['plan.0', 'ch'] },
        { say: 'Second, take the fewest ions whose charges add up to zero.', show: 'plan.1' },
        { say: 'Third, keep a polyatomic ion, like ammonium, whole, and put it in brackets if we need more than one.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: One to one',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } \\ce{Rb+} + \\ce{Br-} \\to \\good{\\ce{RbBr}}', '\\text{(b) } \\ce{Mg^{2+}} + \\ce{Se^{2-}} \\to \\good{\\ce{MgSe}}', '\\text{(e) } \\ce{H+} + \\ce{F-} \\to \\good{\\ce{HF}}', '\\text{(f) } \\ce{Ga^{3+}} + \\ce{P^{3-}} \\to \\good{\\ce{GaP}}'] }],
      lines: [
        { say: 'Step one: the easy ones, where the charges match. Rubidium is in group 1, so plus one, and bromine in group 17, minus one. One of each: R b B r.', show: 'm.0', caption: 'Step one: the easy ones, where the charges match. Rubidium is in group 1, so +1, and bromine in group 17, −1. One of each: RbBr.' },
        { say: 'Magnesium is plus two and selenium, in group 16, is minus two. One of each: M g S e.', show: 'm.1', caption: 'Magnesium is +2 and selenium, in group 16, is −2. One of each: MgSe.' },
        { say: 'Hydrogen fluoride is really a molecule, but the same counting works: hydrogen plus one, fluorine minus one, so H F. And gallium, in group 13, is plus three, while phosphorus is minus three: G a P.', show: ['m.2', 'm.3'], caption: 'Hydrogen fluoride is really a molecule, but the same counting works: hydrogen +1, fluorine −1, so HF. And gallium, in group 13, is +3, while phosphorus is −3: GaP.' },
      ],
    },
    {
      chapter: 'Step 2: Unequal charges',
      layout: 'center',
      main: [calciumChloride, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(c) } \\ce{Na2O}\\quad \\text{(d) } \\ce{Ca^{2+}} + 2\\,\\ce{Cl-} \\to \\good{\\ce{CaCl2}}', '\\text{(g) } \\ce{Al^{3+}} + 3\\,\\ce{Br-} \\to \\good{\\ce{AlBr3}}'] }],
      lines: [
        { say: 'Step two: the charges that do not match. Sodium oxide, we have already found: N a two O. Calcium chloride is the same idea turned around. Calcium has two electrons to give, and each chlorine takes one.', show: ['cacl', 'cacl.labels', 'cacl.arrangement', 'cacl.charges'], play: 'cacl.give', playDelay: 0.3, caption: 'Step two: the charges that do not match. Sodium oxide we have already found: Na₂O. Calcium chloride is the same idea turned around. Calcium has two electrons to give, and each chlorine takes one.' },
        { say: 'So one calcium ion, plus two, balances two chloride ions: C a C l two.', show: 'm.0', caption: 'So one calcium ion, +2, balances two chloride ions: CaCl₂.' },
        { say: 'Aluminum is plus three, so it needs three bromide ions: A l B r three.', show: 'm.1', caption: 'Aluminum is +3, so it needs three bromide ions: AlBr₃.' },
      ],
    },
    {
      chapter: 'Step 3: A polyatomic ion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{ammonium } \\ce{NH4+}\\qquad \\text{sulfate } \\ce{SO4^{2-}}', '2 \\times (+1) + (-2) = 0', '\\text{(h) } \\good{\\ce{(NH4)2SO4}}'] }],
      lines: [
        { say: 'Step three: ammonium sulfate. Both parts are polyatomic ions, groups of atoms with a charge. Ammonium, N H four, is plus one. Sulfate, S O four, is minus two.', show: 'm.0', caption: 'Step three: ammonium sulfate. Both parts are polyatomic ions, groups of atoms with a charge. Ammonium, NH₄⁺, is +1. Sulfate, SO₄²⁻, is −2.' },
        { say: 'So we need two ammonium ions for each sulfate.', show: 'm.1' },
        { say: 'To show two whole ammonium ions, we put N H four in brackets with a two after it: brackets N H four, two, S O four.', show: 'm.2', caption: 'To show two whole ammonium ions, we put NH₄ in brackets with a 2 after it: (NH₄)₂SO₄.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Compound', 'Formula', 'Charges'],
          rows: [
            ['(a) rubidium bromide', 'RbBr', '+1 − 1 = 0'],
            ['(b) magnesium selenide', 'MgSe', '+2 − 2 = 0'],
            ['(c) sodium oxide', '$\\ce{Na2O}$', '+2 − 2 = 0'],
            ['(d) calcium chloride', '$\\ce{CaCl2}$', '+2 − 2 = 0'],
            ['(e) hydrogen fluoride', 'HF', '+1 − 1 = 0'],
            ['(f) gallium phosphide', 'GaP', '+3 − 3 = 0'],
            ['(g) aluminum bromide', '$\\ce{AlBr3}$', '+3 − 3 = 0'],
            ['(h) ammonium sulfate', '$\\ce{(NH4)2SO4}$', '+2 − 2 = 0'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all eight formulas. To check, add up the charges in each one. Every compound comes to zero, and every formula uses the smallest numbers that do it. That matches the book.', show: 'ans' },
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
            ['$\\ce{Mg2Se2}$', 'Not the **smallest** numbers'],
            ['$\\ce{NaO2}$', 'Charges do **not** add to zero'],
            ['$\\ce{NH42SO4}$', 'Brackets **left out**: reads as 42 hydrogens'],
            ['$\\ce{CaCl}$', 'Forgot calcium is **+2**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Writing M g two S e two. The charges balance, but an ionic formula uses the smallest whole numbers.' },
        { say: 'Writing N a O two, with the two on the wrong side. Then the charges add to minus three, not zero.' },
        { say: 'Leaving out the brackets in ammonium sulfate, which makes it look like forty-two hydrogens. And forgetting that calcium is plus two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the formula of **magnesium nitride**? (Nitrogen is in group 15.)',
          choices: ['$\\ce{MgN}$', '$\\ce{MgN2}$', '$\\ce{Mg2N3}$', '$\\ce{Mg3N2}$'],
          answer: 3,
          working: '$\\ce{Mg^{2+}}$ and $\\ce{N^{3-}}$: three magnesium ions (+6) balance two nitride ions (−6).',
        },
      ],
      lines: [
        { say: 'Your turn. What is the formula of magnesium nitride? Nitrogen is in group 15. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Magnesium is plus two and nitride is minus three. Three magnesiums make plus six, and two nitrides make minus six: M g three N two, choice D.', show: 'q2.answer', caption: 'Magnesium is +2 and nitride is −3. Three magnesiums make +6, and two nitrides make −6: Mg₃N₂, choice D.' },
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
          items: ['Find each ion\'s **charge** from its group', 'The charges must add up to **zero**', 'Use the **smallest** whole numbers', 'Brackets round a polyatomic ion when there is more than one'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Find each ion\'s charge from its group.', show: 'sum.0' },
        { say: 'The charges in a compound must add up to zero.', show: 'sum.1' },
        { say: 'Use the smallest whole numbers that do it.', show: 'sum.2' },
        { say: 'And put brackets round a polyatomic ion when there is more than one. For more on ionic compounds, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
