import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import formulae from '@/content/chemmore/videos/cx-3-1.ts';

// Exam question for More Chemistry Topics lesson 3.1 (empirical and molecular formulae): the
// empirical formula of a hydrocarbon from its percentages, its molecular formula from Mr = 56, and
// why ethene has the same empirical formula. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's two carbon atoms and four hydrogen atoms joining into ethene
// (src/video/reactions.ts).

const QUESTION = 'A hydrocarbon contains 85.7% carbon and 14.3% hydrogen by mass. Relative atomic masses: C = 12, H = 1. (a) Calculate the empirical formula of the hydrocarbon. (b) Its relative formula mass is 56. Find its molecular formula. (c) Ethene, C₂H₄, has the same empirical formula. Explain why.';

const video: Explainer = {
  id: 'xq-cx-3-1',
  lessonId: '',
  exam: {
    lesson: 'cx-3-1',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: 85.7% Carbon, a Formula Mass of 56 and Ethene. Empirical and Molecular Formulae',
  thumbnailTitle: 'Find the Formula',
  thumbnail: 'et',
  summary:
    'A test-style question, solved one small step at a time: what is the empirical formula of a hydrocarbon that is 85.7% carbon, what is its molecular formula if its Mr is 56, and why does ethene share the empirical formula? The empirical formula is CH₂, the molecular formula is C₄H₈, and ethene, C₂H₄, has the same one-to-two ratio of carbon to hydrogen.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Formula', subtitle: 'Empirical and molecular' }],
      lines: [
        { say: 'In this video, we solve a test-style question about empirical and molecular formulae. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'CH₂; C₄H₈; same 1 : 2 ratio of C to H' }],
      lines: [
        { say: 'Here is the question. A hydrocarbon contains 85.7 percent carbon and 14.3 percent hydrogen by mass. The relative atomic masses are carbon 12 and hydrogen 1. Part a: calculate the empirical formula of the hydrocarbon. Part b: its relative formula mass is 56. Find its molecular formula. Part c: ethene, C two H four, has the same empirical formula. Explain why.', caption: 'Here is the question. A hydrocarbon contains 85.7% carbon and 14.3% hydrogen by mass. The relative atomic masses are C = 12 and H = 1. Part a: calculate the empirical formula of the hydrocarbon. Part b: its relative formula mass is 56. Find its molecular formula. Part c: ethene, C₂H₄, has the same empirical formula. Explain why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Turn masses into a **ratio of atoms**, then scale it up to the **real molecule**' }],
      lines: [
        { say: 'The percentages tell us masses, but a formula counts atoms. So we turn the masses into a ratio of atoms, then scale that ratio up to fit the real molecule.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(formulae, 'et')],
      lines: [
        { say: 'Here is what we need. These are two carbon atoms and four hydrogen atoms.', show: 'et' },
        { say: 'Watch them join into one molecule of ethene, C two H four.', caption: 'Watch them join into one molecule of ethene, C₂H₄.', play: 'et.go' },
        { say: 'The molecule holds two carbons and four hydrogens, but the simplest whole number ratio is one to two. So its molecular formula is C two H four, and its empirical formula is C H two.', caption: 'The molecule holds two carbons and four hydrogens, but the simplest whole number ratio is one to two. So its molecular formula is C₂H₄, and its empirical formula is CH₂.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Divide each mass by its **Ar**', 'Divide by the **smallest** answer to get the ratio', 'Molecular formula = empirical × (**Mr** ÷ empirical mass)'] }],
      lines: [
        { say: 'Here is the plan. Divide each percentage by the element\'s relative atomic mass.', show: 'plan.0' },
        { say: 'Then divide by the smallest answer to get a whole number ratio.', show: 'plan.1' },
        { say: 'And to find the molecular formula, see how many empirical units fit into the relative formula mass.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The empirical formula',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Carbon', 'Hydrogen'],
          rows: [
            ['mass in 100 g', '85.7 g', '14.3 g'],
            ['÷ Ar', '85.7 ÷ 12 = **7.14**', '14.3 ÷ 1 = **14.3**'],
            ['÷ smallest (7.14)', '**1**', '**2**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. In 100 grams of the hydrocarbon there are 85.7 grams of carbon and 14.3 grams of hydrogen.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Dividing by the relative atomic masses gives 7.14 for carbon and 14.3 for hydrogen.', show: 't.1', focus: 't.1' },
        { say: 'Dividing both by the smallest, 7.14, gives one and two. So the empirical formula is C H two. That is part a.', caption: 'Dividing both by the smallest, 7.14, gives 1 and 2. So the empirical formula is CH₂. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: The molecular formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH2}: 12 + 2(1) = 14', '56 \\div 14 = 4', '4 \\times \\ce{CH2} = \\good{\\ce{C4H8}}'] }],
      lines: [
        { say: 'Step two. One C H two unit has a mass of 12 plus 2, which is 14.', caption: 'Step two. One CH₂ unit has a mass of 12 + 2 = 14.', show: 'm.0' },
        { say: 'The molecule has a mass of 56, and 56 divided by 14 is 4.', show: 'm.1' },
        { say: 'So the molecule holds four C H two units, and its molecular formula is C four H eight. That is part b.', caption: 'So the molecule holds four CH₂ units, and its molecular formula is C₄H₈. That is part b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Ethene',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\ce{C2H4}: 2 : 4', '= 1 : 2 \\Rightarrow \\good{\\ce{CH2}}'] }],
      lines: [
        { say: 'Step three. Ethene has two carbon atoms for every four hydrogen atoms.', show: 'e.0' },
        { say: 'Two to four simplifies to one to two, the same ratio as our hydrocarbon. So both have the empirical formula C H two, even though their molecules are different sizes. That is part c.', caption: 'Two to four simplifies to one to two, the same ratio as our hydrocarbon. So both have the empirical formula CH₂, even though their molecules are different sizes. That is part c.', show: 'e.1', focus: 'e.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **CH₂**. (b) **C₄H₈**. (c) Ethene\'s atoms are in the **same simplest ratio**, 1 carbon to 2 hydrogen.' },
      ],
      lines: [
        { say: 'Does it make sense? C four H eight has a mass of 4 times 12 plus 8, which is 56, as the question says.', caption: 'Does it make sense? C₄H₈ has a mass of 4 × 12 + 8 = 56, as the question says.', show: 'ans' },
        { say: 'So the empirical formula is C H two, the molecular formula is C four H eight, and ethene shares the same one to two ratio.', caption: 'So the empirical formula is CH₂, the molecular formula is C₄H₈, and ethene shares the same 1 : 2 ratio.' },
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
            ['**C₆H**', 'Used the **percentages** as the ratio'],
            ['**C₈H₁₆**', 'Divided 56 by **7**, not by 14'],
            ['Ethene is **C₂H₄**, so it differs', 'Mixed up **empirical** and **molecular**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A percentage is a share of the mass. We must divide by the relative atomic mass to count atoms.', focus: 'traps.0' },
        { say: 'The empirical unit C H two has a mass of 14, so 56 holds four of them.', caption: 'The empirical unit CH₂ has a mass of 14, so 56 holds four of them.', focus: 'traps.1' },
        { say: 'And two compounds with different molecular formulae can still share an empirical formula.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the empirical formula of hydrogen peroxide, H₂O₂?',
          choices: ['HO', 'H₂O', 'H₂O₂', 'HO₂'],
          answer: 0,
          working: 'H₂O₂ has hydrogen and oxygen in the ratio 2 : 2, which simplifies to 1 : 1, so HO.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the empirical formula of hydrogen peroxide, H two O two? Pause the video and try it.', caption: 'Your turn. What is the empirical formula of hydrogen peroxide, H₂O₂? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two to two simplifies to one to one, so the empirical formula is H O: choice A.', caption: 'Two to two simplifies to one to one, so the empirical formula is HO: choice A.', show: 'q2.answer' },
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
          items: ['Empirical formula: the **simplest** whole number ratio', 'Mass ÷ Ar, then ÷ the **smallest**', 'Mr ÷ empirical mass gives the **molecular** formula'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The empirical formula is the simplest whole number ratio of atoms.', show: 'sum.0' },
        { say: 'Divide each mass by its relative atomic mass, then by the smallest answer.', show: 'sum.1' },
        { say: 'And the relative formula mass divided by the empirical mass tells us how to scale up to the molecular formula. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
