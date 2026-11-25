import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pairEq } from '@/content/chem30/videos/lib/c30-4a-figures.ts';
import { ammoniaAndWater, hfAndWater } from '@/content/chem30/videos/lib/c30-protons.ts';

// Exam question for Chemistry 30 lesson 4.4 (Bronsted-Lowry acids and bases): label the acid, its
// conjugate base, the base and its conjugate acid in HNO3 + H2O -> H3O+ + NO3- and in
// CN- + H2O -> HCN + OH-. The question is parts (a) and (b) of OpenStax Chemistry 2e's
// end-of-chapter exercise 9, section 14.1 (CC BY-NC-SA 4.0), word for word. The answer, which
// matches the book's: (a) acid HNO3, conjugate base NO3-; base H2O, conjugate acid H3O+.
// (b) acid H2O, conjugate base OH-; base CN-, conjugate acid HCN.
//
// The pictures are the lesson's protons changing hands (src/video/molecules.ts): water taking a
// proton from hydrogen fluoride, and water giving one to ammonia.

const QUESTION = 'Identify and label the Brønsted-Lowry acid, its conjugate base, the Brønsted-Lowry base, and its conjugate acid in each of the following equations: (a) HNO3 + H2O ⟶ H3O+ + NO3− (b) CN− + H2O ⟶ HCN + OH−';

const ARROW = '\\longrightarrow';
const nitric = figure('a', [pairEq({ species: ['\\ce{HNO3}', '\\ce{H2O}', '\\ce{H3O+}', '\\ce{NO3-}'], roles: ['\\text{acid}', '\\text{base}', '\\text{conjugate acid}', '\\text{conjugate base}'], arrow: ARROW })], 300);
// In (b) the base comes first: CN- (base) + H2O (acid) -> HCN (conjugate acid) + OH- (conjugate base).
const cyanide = figure('b', [pairEq({ species: ['\\ce{CN-}', '\\ce{H2O}', '\\ce{HCN}', '\\ce{OH-}'], roles: ['\\text{base}', '\\text{acid}', '\\text{conjugate acid}', '\\text{conjugate base}'], arrow: ARROW, pairs: [[0, 2], [1, 3]] })], 300);
const ALL = (f: string) => [`${f}.s0`, `${f}.plus1`, `${f}.s1`, `${f}.arrow`, `${f}.s2`, `${f}.plus2`, `${f}.s3`];

const video: Explainer = {
  id: 'xq-c30-4-4',
  lessonId: '',
  exam: {
    lesson: 'c30-4-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 9, section 14.1, Brønsted-Lowry Acids and Bases',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/14-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Acids, Bases and Their Conjugates. Brønsted–Lowry Acids and Bases',
  thumbnailTitle: 'Acids, Bases and Conjugates',
  thumbnail: 'pt',
  summary:
    'A real test question, solved one small step at a time: label the acid, the base and their conjugates in HNO3 + H2O → H3O+ + NO3− and in CN− + H2O → HCN + OH−. We follow the proton each time, and find that water is the base in the first reaction and the acid in the second.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Acids, Bases and Conjugates', subtitle: 'Follow the proton' }],
      lines: [
        { say: 'In this video, we solve a real test question about Bronsted-Lowry acids and bases. We will take it one small step at a time, so that every step makes sense.', show: 'title', caption: 'In this video, we solve a real test question about Brønsted–Lowry acids and bases. We will take it one small step at a time, so that every step makes sense.' },
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
          prompt: 'Identify and label the Brønsted-Lowry acid, its conjugate base, the Brønsted-Lowry base, and its conjugate acid in each of the following equations: (a) $\\ce{HNO3 + H2O -> H3O+ + NO3-}$ (b) $\\ce{CN- + H2O -> HCN + OH-}$',
          answer: '(a) acid HNO₃, conjugate base NO₃⁻; base H₂O, conjugate acid H₃O⁺. (b) acid H₂O, conjugate base OH⁻; base CN⁻, conjugate acid HCN.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed, with the first two of its equations. Identify and label the Bronsted-Lowry acid, its conjugate base, the Bronsted-Lowry base, and its conjugate acid in each of the following equations. Part a: nitric acid and water give hydronium and nitrate. Part b: cyanide and water give hydrogen cyanide and hydroxide.', show: 'q', caption: 'Here is the question, exactly as it was printed, with the first two of its equations. Identify and label the Brønsted-Lowry acid, its conjugate base, the Brønsted-Lowry base, and its conjugate acid in each of the following equations: (a) HNO₃ + H₂O ⟶ H₃O⁺ + NO₃⁻ (b) CN⁻ + H₂O ⟶ HCN + OH⁻' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'In each reaction, **who gives** the proton, **who takes** it, and what does each **become**?' }],
      lines: [
        { say: 'Each reaction moves one proton from one particle to another. We need to say who gives it, who takes it, and what each one turns into.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [hfAndWater('pt'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{acid: gives } \\ce{H+} \\qquad \\text{base: takes } \\ce{H+}'] }],
      lines: [
        { say: 'Here is what we need. A hydrogen fluoride molecule and a water molecule. The green ball is the hydrogen that will move.', show: 'pt' },
        { say: 'Its hydrogen leaves as a bare proton and bonds to the oxygen of the water. Water becomes a hydronium ion, and a fluoride ion is left behind.', play: 'pt.go' },
        { say: 'Hydrogen fluoride gave the proton, so it is the Bronsted-Lowry acid. Water took it, so it is the base. What the acid becomes is its conjugate base, and what the base becomes is its conjugate acid.', show: 'k.0', caption: 'Hydrogen fluoride gave the proton, so it is the Brønsted–Lowry acid. Water took it, so it is the base. What the acid becomes is its conjugate base, and what the base becomes is its conjugate acid.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the particle that **loses** an H: the **acid**', 'The one that **gains** it is the **base**', 'Match each to what it **becomes**: its **conjugate**'] }],
      lines: [
        { say: 'Here is the plan, for each equation. Find the particle that loses a hydrogen: that is the acid.', show: 'plan.0' },
        { say: 'The particle that gains it is the base.', show: 'plan.1' },
        { say: 'Then match each one to what it becomes on the other side: its conjugate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Nitric acid and water',
      layout: 'center',
      main: [nitric],
      lines: [
        { say: 'Step one, part a. Nitric acid plus water gives hydronium plus nitrate.', show: ALL('a') },
        { say: 'H N O three loses a hydrogen and becomes N O three minus, so nitric acid is the acid, and nitrate is its conjugate base.', show: ['a.r0', 'a.r3', 'a.pair1'], focus: ['a.s0', 'a.s3', 'a.pair1'], caption: 'HNO₃ loses a hydrogen and becomes NO₃⁻, so nitric acid is the acid, and nitrate is its conjugate base.' },
        { say: 'Water gains it and becomes H three O plus, so water is the base, and hydronium is its conjugate acid.', show: ['a.r1', 'a.r2', 'a.pair2'], focus: ['a.s1', 'a.s2', 'a.pair2'], caption: 'Water gains it and becomes H₃O⁺, so water is the base, and hydronium is its conjugate acid.' },
      ],
    },
    {
      chapter: 'Step 2: Water can give a proton too',
      layout: 'center',
      main: [ammoniaAndWater('aw')],
      lines: [
        { say: 'Step two. Before part b, here is water meeting a base, ammonia, from the lesson. Watch which way the proton goes this time.', show: 'aw' },
        { say: 'Now water gives a proton to the ammonia, and becomes a hydroxide ion. With a base, water acts as the acid.', play: 'aw.go' },
      ],
    },
    {
      chapter: 'Step 3: Cyanide and water',
      layout: 'center',
      main: [cyanide],
      lines: [
        { say: 'Step three, part b. Cyanide plus water gives hydrogen cyanide plus hydroxide. This time the base is written first.', show: ALL('b') },
        { say: 'C N minus gains a hydrogen and becomes H C N, so cyanide is the base, and hydrogen cyanide is its conjugate acid.', show: ['b.r0', 'b.r2', 'b.pair1'], focus: ['b.s0', 'b.s2', 'b.pair1'], caption: 'CN⁻ gains a hydrogen and becomes HCN, so cyanide is the base, and hydrogen cyanide is its conjugate acid.' },
        { say: 'Water loses a hydrogen and becomes O H minus, so here water is the acid, and hydroxide is its conjugate base.', show: ['b.r1', 'b.r3', 'b.pair2'], focus: ['b.s1', 'b.s3', 'b.pair2'], caption: 'Water loses a hydrogen and becomes OH⁻, so here water is the acid, and hydroxide is its conjugate base.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\ce{HNO3}/\\ce{NO3-},\\ \\ce{H3O+}/\\ce{H2O},\\ \\ce{HCN}/\\ce{CN-},\\ \\ce{H2O}/\\ce{OH-}', '\\text{each pair differs by one } \\ce{H+}\\ \\checkmark'] },
        {
          kind: 'callout',
          id: 'ans',
          tone: 'key',
          title: 'The answer',
          md: '(a) Acid $\\ce{HNO3}$, conjugate base $\\ce{NO3-}$; base $\\ce{H2O}$, conjugate acid $\\ce{H3O+}$. (b) Acid $\\ce{H2O}$, conjugate base $\\ce{OH-}$; base $\\ce{CN-}$, conjugate acid $\\ce{HCN}$.',
        },
      ],
      lines: [
        { say: 'Does it check? Each conjugate pair should differ by exactly one proton, with one member on each side. Every pair here does.', show: ['x.0', 'x.1'] },
        { say: 'So in part a, nitric acid is the acid and nitrate its conjugate base, water is the base and hydronium its conjugate acid. In part b, water is the acid and hydroxide its conjugate base, cyanide is the base and hydrogen cyanide its conjugate acid. That matches the book.', show: 'ans' },
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
            ['Water is the **base** in (b)', 'Gave water the **same role** both times'],
            ['$\\ce{HNO3}$ and $\\ce{H2O}$ are a **pair**', 'Paired the two **reactants**'],
            ['$\\ce{CN-}$ is the **acid**', 'Assumed the **first** particle is the acid'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling water the base in part b gives it the same role both times. Water is amphiprotic: it takes a proton from an acid, and gives one to a base.', focus: 'traps.0' },
        { say: 'Pairing nitric acid with water pairs the two reactants. A conjugate pair always has one member on each side, differing by one proton.', focus: 'traps.1' },
        { say: 'And calling cyanide the acid assumes the first particle written is always the acid. Follow the proton instead: cyanide gains it.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\ce{HSO4- + OH- -> SO4^2- + H2O}$, which particle is the **conjugate acid** of $\\ce{OH-}$?',
          choices: ['$\\ce{SO4^2-}$', '$\\ce{HSO4-}$', '$\\ce{H3O+}$', '$\\ce{H2O}$'],
          answer: 3,
          working: '$\\ce{OH-}$ gains a proton, so it is the base, and it becomes $\\ce{H2O}$, its conjugate acid.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen sulfate plus hydroxide gives sulfate plus water. Which particle is the conjugate acid of hydroxide? Pause the video and try it.', caption: 'Your turn. In HSO₄⁻ + OH⁻ ⟶ SO₄²⁻ + H₂O, which particle is the conjugate acid of OH⁻? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Hydroxide gains a proton, so it is the base, and it becomes water. Water is its conjugate acid: choice D.', show: 'q2.answer' },
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
          items: ['**Acid** gives $\\ce{H+}$, **base** takes it', 'A **conjugate pair** differs by **one** $\\ce{H+}$, one on each side', 'Water can be **either**: it is amphiprotic'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A Bronsted-Lowry acid gives a proton, and a base takes it.', show: 'sum.0', caption: 'Here is what to remember. A Brønsted–Lowry acid gives a proton, and a base takes it.' },
        { say: 'A conjugate pair differs by exactly one proton, with one member on each side of the equation.', show: 'sum.1' },
        { say: 'And water can play either part, depending on what it meets. For more on Bronsted-Lowry acids and bases, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'And water can play either part, depending on what it meets. For more on Brønsted–Lowry acids and bases, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
