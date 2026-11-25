import type { Explainer } from '@/video/script.ts';
import { redox } from '../../chem30/videos/lib/c30-atoms.ts';

// Exam question for Chemistry 9 lesson 2.2 (formulas of ionic compounds): the formulas of sodium
// oxide, aluminium chloride and calcium hydroxide from the charges on their ions. Written by
// Gradileo in the style of a Grade 9 science unit test.
//
// The picture is an oxygen atom between two sodium atoms, taking one electron from each, drawn the
// same way as the lesson's magnesium chloride (src/content/chem30/videos/lib/c30-atoms.ts).

const QUESTION = 'Use the charges on the ions to write the formula of each ionic compound. Sodium ion: Na⁺. Aluminium ion: Al³⁺. Calcium ion: Ca²⁺. Oxide ion: O²⁻. Chloride ion: Cl⁻. Hydroxide ion: OH⁻. (a) Sodium oxide. (b) Aluminium chloride. (c) Calcium hydroxide. Explain why brackets are needed in this formula.';

const video: Explainer = {
  id: 'xq-c9-2-2',
  lessonId: '',
  exam: {
    lesson: 'c9-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sodium Oxide, Aluminium Chloride and Calcium Hydroxide. Formulas of Ionic Compounds',
  thumbnailTitle: 'Balancing the Charges',
  thumbnail: 'no',
  summary:
    'A test-style question, solved one small step at a time: what are the formulas of sodium oxide, aluminium chloride and calcium hydroxide? The charges must cancel, so two Na⁺ balance one O²⁻ to give Na₂O, three Cl⁻ balance one Al³⁺ to give AlCl₃, and two OH⁻ balance one Ca²⁺ to give Ca(OH)₂, with brackets because the 2 applies to the whole hydroxide ion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Balancing the Charges', subtitle: 'Writing ionic formulas' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the formulas of ionic compounds. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Na₂O; AlCl₃; Ca(OH)₂' }],
      lines: [
        { say: 'Here is the question. Use the charges on the ions to write the formula of each ionic compound. The sodium ion is N a plus, the aluminium ion is A l three plus, and the calcium ion is C a two plus. The oxide ion is O two minus, the chloride ion is C l minus, and the hydroxide ion is O H minus. Part a: sodium oxide. Part b: aluminium chloride. Part c: calcium hydroxide. Explain why brackets are needed in this formula.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find how many of each ion make the **charges cancel**' }],
      lines: [
        { say: 'An ionic compound has no overall charge. So for each one, we find how many of each ion we need for the positive and negative charges to cancel.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [redox('no', [{ id: 'n1', symbol: 'Na', protons: 11, name: 'sodium', at: [4, 3.6], tone: 'brand' }, { id: 'o', symbol: 'O', protons: 8, name: 'oxygen', at: [10, 3.6], tone: 'bad' }, { id: 'n2', symbol: 'Na', protons: 11, name: 'sodium', at: [16, 3.6], tone: 'brand' }], [{ from: 'n1', to: 'o', n: 1 }, { from: 'n2', to: 'o', n: 1 }])],
      lines: [
        { say: 'Here is what we need. An oxygen atom sits between two sodium atoms. Oxygen needs two more electrons, but each sodium atom has only one to give.', show: ['no', 'no.labels', 'no.arrangement'] },
        { say: 'Watch the electrons move: one from each sodium atom to the oxygen.', play: 'no.give' },
        { say: 'Now there are two sodium ions, each one plus, and one oxide ion, two minus. The charges cancel, so it takes two sodium ions for every oxide ion.', show: 'no.charges' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Total **positive** = total **negative**', 'Use the **fewest** ions that balance', 'More than one **polyatomic** ion: put it in **brackets**'] }],
      lines: [
        { say: 'Here is the plan. The total positive charge must equal the total negative charge.', show: 'plan.0' },
        { say: 'We use the fewest ions that make them balance.', show: 'plan.1' },
        { say: 'And when we need more than one of an ion made of several atoms, it goes in brackets.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sodium oxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 \\times (+1) = +2, \\quad 1 \\times (-2) = -2', '\\good{\\ce{Na2O}}'] }],
      lines: [
        { say: 'Step one. One oxide ion is minus two, so we need plus two from the sodium ions. Each is plus one, so we need two.', show: 'm.0' },
        { say: 'Two sodium ions and one oxide ion: the formula is N a two O. That is part a.', caption: 'Two sodium ions and one oxide ion: the formula is Na₂O. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Aluminium chloride',
      layout: 'center',
      main: [{ kind: 'math', id: 'a', size: 'md', lines: ['1 \\times (+3) = +3, \\quad 3 \\times (-1) = -3', '\\good{\\ce{AlCl3}}'] }],
      lines: [
        { say: 'Step two. One aluminium ion is plus three. Each chloride ion is minus one, so it takes three of them to balance.', show: 'a.0' },
        { say: 'The formula is A l C l three. That is part b.', caption: 'The formula is AlCl₃. That is part b.', show: 'a.1', focus: 'a.1' },
      ],
    },
    {
      chapter: 'Step 3: Calcium hydroxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'md', lines: ['1 \\times (+2) = +2, \\quad 2 \\times (-1) = -2', '\\good{\\ce{Ca(OH)2}}', '\\ce{CaOH2} \\text{ would mean only one O}'] }],
      lines: [
        { say: 'Step three. One calcium ion is plus two, and each hydroxide ion is minus one, so we need two hydroxide ions.', show: 'c.0' },
        { say: 'The formula is C a, O H in brackets, two.', caption: 'The formula is Ca(OH)₂.', show: 'c.1', focus: 'c.1' },
        { say: 'Hydroxide is one ion made of two atoms, oxygen and hydrogen. The brackets show that the two applies to the whole ion. Without them, C a O H two would mean one oxygen and two hydrogens. That is part c.', caption: 'Hydroxide is one ion made of two atoms. The brackets show that the 2 applies to the whole ion. Without them, CaOH₂ would mean one O and two H. That is part c.', show: 'c.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Na₂O**. (b) **AlCl₃**. (c) **Ca(OH)₂**: the brackets show that **two whole hydroxide ions** are needed.' },
      ],
      lines: [
        { say: 'Does it make sense? Check each one: two times plus one and minus two make zero, plus three and three times minus one make zero, and plus two and two times minus one make zero.', show: 'ans' },
        { say: 'So the formulas are N a two O, A l C l three, and C a, O H in brackets, two.', caption: 'So the formulas are Na₂O, AlCl₃ and Ca(OH)₂.' },
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
            ['NaO', 'Did not **balance** the charges'],
            ['Al₃Cl', 'Put the 3 on the **wrong** ion'],
            ['CaOH₂', 'Left out the **brackets**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'N a O would have plus one and minus two, which does not cancel.', caption: 'NaO would have +1 and −2, which does not cancel.', focus: 'traps.0' },
        { say: 'Aluminium is plus three, so it is the chloride ions we need three of, not aluminium ions.', focus: 'traps.1' },
        { say: 'And without brackets, the two belongs only to the hydrogen, which is a different substance.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Magnesium forms Mg²⁺ ions and nitrogen forms N³⁻ ions. What is the formula of magnesium nitride?',
          choices: ['MgN', 'Mg₃N₂', 'Mg₂N₃', 'MgN₂'],
          answer: 1,
          working: 'The lowest common multiple of 2 and 3 is 6: three Mg²⁺ give +6 and two N³⁻ give −6.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium forms M g two plus ions and nitrogen forms N three minus ions. What is the formula of magnesium nitride? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The lowest common multiple of two and three is six. Three magnesium ions give plus six, and two nitride ions give minus six, so it is M g three N two: choice B.', caption: 'The lowest common multiple of 2 and 3 is 6. Three Mg²⁺ give +6, and two N³⁻ give −6, so it is Mg₃N₂: choice B.', show: 'q2.answer' },
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
          items: ['Positive and negative charges must **cancel**', 'Use the **fewest** ions that balance', 'Brackets round a **polyatomic** ion when you need more than one'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In an ionic compound, the positive and negative charges cancel.', show: 'sum.0' },
        { say: 'Use the fewest ions that make them balance.', show: 'sum.1' },
        { say: 'And put brackets round a polyatomic ion when you need more than one of it. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
