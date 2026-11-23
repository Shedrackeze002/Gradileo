import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import oxides from '@/content/chemmore/videos/cx-11-1.ts';

// Exam question for More Chemistry Topics lesson 11.1 (Period 3 elements and their oxides):
// sodium oxide and sulfur trioxide in water, and amphoteric aluminium oxide. Written by Gradileo in
// the style of an A level chemistry exam.
//
// The picture is the lesson's oxide ion taking a hydrogen ion from water (src/video/molecules.ts).

const QUESTION = 'This question is about the oxides of the Period 3 elements. (a) Sodium oxide is added to water. Write an equation for the reaction and give the approximate pH of the solution formed. (b) Sulfur trioxide is added to water. Write an equation for the reaction and give the approximate pH of the solution formed. (c) Aluminium oxide is amphoteric. State what this means, and write an equation for the reaction of aluminium oxide with hydrochloric acid.';

const video: Explainer = {
  id: 'xq-cx-11-1',
  lessonId: '',
  exam: {
    lesson: 'cx-11-1',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sodium Oxide, Sulfur Trioxide and Amphoteric Aluminium Oxide. Period 3 Oxides',
  thumbnailTitle: 'Period 3 Oxides',
  thumbnail: 'ox',
  summary:
    'A test-style question, solved one small step at a time: what do sodium oxide and sulfur trioxide make with water, and what does it mean that aluminium oxide is amphoteric? Na₂O + H₂O → 2NaOH gives a pH of about 14, SO₃ + H₂O → H₂SO₄ gives a pH of about 0, and aluminium oxide reacts with both acids and bases: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Period 3 Oxides', subtitle: 'Basic, acidic and amphoteric' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the oxides of Period 3. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Na₂O + H₂O → 2NaOH, pH 14; SO₃ + H₂O → H₂SO₄, pH 0; reacts with acids and bases' }],
      lines: [
        { say: 'Here is the question. This question is about the oxides of the Period 3 elements. Part a: sodium oxide is added to water. Write an equation for the reaction and give the approximate pH of the solution formed. Part b: sulfur trioxide is added to water. Write an equation for the reaction and give the approximate pH of the solution formed. Part c: aluminium oxide is amphoteric. State what this means, and write an equation for the reaction of aluminium oxide with hydrochloric acid.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'The **bonding** in each oxide decides whether it is **basic**, **acidic** or **both**' }],
      lines: [
        { say: 'Across Period 3, the oxides change from ionic to covalent. Ionic oxides are basic, covalent ones are acidic, and aluminium oxide, in between, behaves as both.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(oxides, 'ox')],
      lines: [
        { say: 'Here is what we need. This is why sodium oxide gives an alkaline solution. Its oxide ion meets a water molecule.', show: 'ox' },
        { say: 'The oxide ion takes a hydrogen ion from the water, and both become hydroxide ions. So the solution is alkaline.', play: 'ox.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Ionic oxide + water: **hydroxide**, alkaline', 'Simple covalent oxide + water: an **acid**', 'Amphoteric: reacts with **acids and bases**'] }],
      lines: [
        { say: 'Here is the plan. An ionic oxide reacts with water to give a hydroxide, an alkaline solution.', show: 'plan.0' },
        { say: 'A simple covalent oxide reacts with water to give an acid.', show: 'plan.1' },
        { say: 'And an amphoteric oxide reacts with both acids and bases.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sodium oxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Na2O + H2O -> 2NaOH}', '\\good{\\text{pH} \\approx 14}'] }],
      lines: [
        { say: 'Step one. Sodium oxide is ionic. Its oxide ions take hydrogen ions from water, so we get sodium hydroxide. N a two O plus H two O gives two N a O H.', caption: 'Step one. Sodium oxide is ionic. Its oxide ions take hydrogen ions from water, so we get sodium hydroxide: Na₂O + H₂O → 2NaOH.', show: 'm.0' },
        { say: 'Sodium hydroxide is a strong alkali, so the pH is about 14. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Sulfur trioxide',
      layout: 'center',
      main: [{ kind: 'math', id: 's', size: 'md', lines: ['\\ce{SO3 + H2O -> H2SO4}', '\\good{\\text{pH} \\approx 0}'] }],
      lines: [
        { say: 'Step two. Sulfur trioxide is a simple covalent molecule. It reacts with water to make sulfuric acid. S O three plus H two O gives H two S O four.', caption: 'Step two. Sulfur trioxide is a simple covalent molecule. It reacts with water to make sulfuric acid: SO₃ + H₂O → H₂SO₄.', show: 's.0' },
        { say: 'Sulfuric acid is a strong acid, so the pH is about 0. That is part b.', show: 's.1', focus: 's.1' },
      ],
    },
    {
      chapter: 'Step 3: Amphoteric aluminium oxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'a', size: 'md', lines: ['\\text{amphoteric: reacts with acids } \\textbf{and} \\text{ bases}', '\\good{\\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}}'] }],
      lines: [
        { say: 'Step three. Amphoteric means the oxide reacts with both acids and bases. Aluminium oxide is ionic but with some covalent character, so it can behave either way.', show: 'a.0' },
        { say: 'With hydrochloric acid, it acts as a base. A l two O three plus six H C l gives two A l C l three plus three H two O. That is part c.', caption: 'With hydrochloric acid, it acts as a base: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. That is part c.', show: 'a.1', focus: 'a.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Na₂O + H₂O → 2NaOH**, pH about **14**. (b) **SO₃ + H₂O → H₂SO₄**, pH about **0**. (c) It reacts with **both acids and bases**; **Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O**.' },
      ],
      lines: [
        { say: 'Does it make sense? Check the last equation: two aluminium, three oxygen, six hydrogen and six chlorine atoms on each side. And with sodium hydroxide, aluminium oxide acts as an acid instead.', show: 'ans' },
        { say: 'So the ionic oxide is basic, the covalent oxide is acidic, and aluminium oxide reacts with both.' },
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
            ['Na₂O + H₂O → **NaOH**', 'Two Na need **2NaOH**'],
            ['SO₃ gives **H₂SO₃**', 'SO₂ gives H₂SO₃; SO₃ gives **H₂SO₄**'],
            ['Amphoteric means **neutral**', 'It reacts with **both** acids and bases'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sodium oxide has two sodium atoms, so it makes two sodium hydroxide units.', focus: 'traps.0' },
        { say: 'Sulfur dioxide gives sulfurous acid, but sulfur trioxide gives sulfuric acid.', focus: 'traps.1' },
        { say: 'And amphoteric does not mean neutral. It means the oxide can react as an acid or as a base.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which Period 3 oxide has a giant covalent structure?',
          choices: ['SiO₂', 'MgO', 'P₄O₁₀', 'SO₂'],
          answer: 0,
          working: 'Silicon dioxide is a giant covalent lattice, like sand. MgO is ionic, and P₄O₁₀ and SO₂ are simple molecules.',
        },
      ],
      lines: [
        { say: 'Your turn. Which Period 3 oxide has a giant covalent structure? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Silicon dioxide forms a giant covalent lattice, like sand. Magnesium oxide is ionic, and the phosphorus and sulfur oxides are simple molecules: choice A.', show: 'q2.answer' },
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
          items: ['Ionic oxides: **basic**, alkaline in water', 'Simple covalent oxides: **acidic**', 'Al₂O₃: **amphoteric**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The ionic oxides of Period 3 are basic, and those that dissolve make alkaline solutions.', show: 'sum.0' },
        { say: 'The simple covalent oxides react with water to make acids.', show: 'sum.1' },
        { say: 'And aluminium oxide is amphoteric, reacting with acids and bases. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
