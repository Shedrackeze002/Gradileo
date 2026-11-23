import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { twoShare } from '@/content/chem10/videos/lib/c10-atoms.ts';
import { redox } from '@/content/chem30/videos/lib/c30-atoms.ts';

// Exam question for Chemistry 10 lesson 3.3 (covalent bonds and molecular names): decide whether six
// chlorides are ionic or covalent. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 45, section 2.6, CC BY-NC-SA 4.0). The book's answer: ionic KCl and
// MgCl2; covalent NCl3, ICl, PCl5 and CCl4.
//
// The pictures (src/video/atoms.ts): potassium handing its outer electron to chlorine (an ionic
// bond), and nitrogen and chlorine sliding together to share a pair (a covalent bond); then the
// main-group table with the metals and non-metals of the question lit.

const QUESTION =
  'Using the periodic table, predict whether the following chlorides are ionic or covalent: KCl, NCl3, ICl, MgCl2, PCl5, and CCl4.';

const kcl = redox(
  'kcl',
  [
    { id: 'k', symbol: 'K', protons: 19, name: 'potassium', at: [4, 3.6], tone: 'brand' },
    { id: 'cl', symbol: 'Cl', protons: 17, name: 'chlorine', at: [12, 3.6], tone: 'good' },
  ],
  [{ from: 'k', to: 'cl', n: 1 }],
  [16, 7.2],
  420,
);

const ncl = twoShare('ncl', { symbol: 'N', protons: 7, name: 'nitrogen', tone: 'adj' }, { symbol: 'Cl', protons: 17, name: 'chlorine', tone: 'good' }, 3.2, 1, 420);

const table = figure(
  'pt',
  [
    periodicTable({
      upTo: 54,
      highlights: [
        { id: 'met', cells: ['K', 'Mg'], tone: 'opp' },
        { id: 'non', cells: ['N', 'I', 'P', 'C'], tone: 'adj' },
        { id: 'cl', cells: ['Cl'], tone: 'good' },
      ],
    }),
  ],
  500,
);

const video: Explainer = {
  id: 'xq-c10-3-3',
  lessonId: '',
  exam: {
    lesson: 'c10-3-3',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 45, section 2.6, Ionic and Molecular Compounds',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Ionic or Covalent? Six Chlorides and the Periodic Table',
  thumbnailTitle: 'Ionic or Covalent?',
  thumbnail: 'ncl',
  summary:
    'A real test question, solved one small step at a time: are KCl, NCl3, ICl, MgCl2, PCl5 and CCl4 ionic or covalent? We watch potassium hand an electron to chlorine and nitrogen share a pair with it, then use the periodic table: a metal with a non-metal makes an ionic compound, and two non-metals make a covalent one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ionic or Covalent?', subtitle: 'Bond types from the periodic table, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks whether six compounds are ionic or covalent. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Using the periodic table, predict whether the following chlorides are ionic or covalent: KCl, $\\ce{NCl3}$, ICl, $\\ce{MgCl2}$, $\\ce{PCl5}$, and $\\ce{CCl4}$.',
          answer: 'Ionic: KCl, $\\ce{MgCl2}$. Covalent: $\\ce{NCl3}$, ICl, $\\ce{PCl5}$, $\\ce{CCl4}$.',
          working: 'Metal + non-metal: ionic. Non-metal + non-metal: covalent.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Using the periodic table, predict whether the following chlorides are ionic or covalent: K C l, N C l three, iodine monochloride, I C l, M g C l two, P C l five, and C C l four.', caption: 'Using the periodic table, predict whether the following chlorides are ionic or covalent: KCl, NCl₃, ICl, MgCl₂, PCl₅, and CCl₄.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Every compound contains **chlorine**. What is its **partner**?' }],
      lines: [
        { say: 'All six compounds are chlorides: each one contains chlorine joined to one other element.', show: 'plain' },
        { say: 'So the question comes down to the partner. Is it the kind of element that gives chlorine an electron, or the kind that shares with it?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [kcl],
      lines: [
        { say: 'Here is what we need. First, potassium, a metal, and chlorine, a non-metal. Watch: potassium hands its one outer electron to chlorine.', show: ['kcl', 'kcl.labels', 'kcl.arrangement', 'kcl.charges'], play: 'kcl.give', playDelay: 0.3 },
        { say: 'Now there is a positive ion and a negative ion, held together by their opposite charges. That is an ionic bond. Metals give electrons away easily, so a metal with a non-metal makes an ionic compound.' },
      ],
    },
    {
      layout: 'center',
      main: [ncl],
      lines: [
        { say: 'Now nitrogen and chlorine, two non-metals. Both want to gain electrons, so neither gives one away. Instead they slide together and share a pair.', show: ['ncl', 'ncl.labels', 'ncl.arrangement'], play: 'ncl.share', playDelay: 0.3 },
        { say: 'That shared pair is a covalent bond. So two non-metals make a covalent compound.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find chlorine\'s **partner** in each formula', 'Find the partner on the periodic table: **metal** or **non-metal**?', 'Metal: **ionic**. Non-metal: **covalent**'] }],
      lines: [
        { say: 'Here is the plan. First, pick out the element joined to chlorine in each formula.', show: 'plan.0' },
        { say: 'Second, find it on the periodic table, and decide whether it is a metal or a non-metal.', show: 'plan.1' },
        { say: 'Third, a metal partner means ionic, and a non-metal partner means covalent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The partners',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{KCl}: \\text{ potassium}\\qquad \\ce{NCl3}: \\text{ nitrogen}\\qquad \\ce{ICl}: \\text{ iodine}', '\\ce{MgCl2}: \\text{ magnesium}\\qquad \\ce{PCl5}: \\text{ phosphorus}\\qquad \\ce{CCl4}: \\text{ carbon}'] }],
      lines: [
        { say: 'Step one. The partners are potassium, nitrogen and iodine,', show: 'm.0' },
        { say: 'then magnesium, phosphorus and carbon.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Metal or non-metal?',
      layout: 'center',
      main: [table],
      lines: [
        { say: 'Step two. Here is the periodic table, with chlorine in green. The metals are on the left, and the non-metals on the right, beyond the staircase.', show: ['pt.table', 'pt.cl'] },
        { say: 'Potassium, in group 1, and magnesium, in group 2, are metals, far over on the left.', show: 'pt.met' },
        { say: 'Nitrogen, phosphorus, carbon and iodine are all non-metals, over on the right, the same side as chlorine.', show: 'pt.non' },
      ],
    },
    {
      chapter: 'Step 3: Decide',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Chloride', 'Partner', 'Type of element', 'Bonding'],
          rows: [
            ['KCl', 'potassium', 'metal', '**ionic**'],
            ['$\\ce{NCl3}$', 'nitrogen', 'non-metal', '**covalent**'],
            ['ICl', 'iodine', 'non-metal', '**covalent**'],
            ['$\\ce{MgCl2}$', 'magnesium', 'metal', '**ionic**'],
            ['$\\ce{PCl5}$', 'phosphorus', 'non-metal', '**covalent**'],
            ['$\\ce{CCl4}$', 'carbon', 'non-metal', '**covalent**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. The two metal partners give ionic compounds: potassium chloride and magnesium chloride.', show: ['ans', 'ans.0', 'ans.3'] },
        { say: 'The four non-metal partners give covalent compounds: nitrogen trichloride, iodine monochloride, phosphorus pentachloride and carbon tetrachloride.', show: ['ans.1', 'ans.2', 'ans.4', 'ans.5'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'chk', check: true, items: ['Ionic: **KCl**, **MgCl₂**', 'Covalent: **NCl₃**, **ICl**, **PCl₅**, **CCl₄**', 'The covalent ones use **prefixes** in their names: tri-, mono-, penta-, tetra-'] }],
      lines: [
        { say: 'So the ionic chlorides are K C l and M g C l two.', show: 'chk.0', caption: 'So the ionic chlorides are KCl and MgCl₂.' },
        { say: 'And the covalent ones are N C l three, I C l, P C l five and C C l four. That matches the book.', show: 'chk.1', caption: 'And the covalent ones are NCl₃, ICl, PCl₅ and CCl₄. That matches the book.' },
        { say: 'Here is a check: the covalent compounds are the ones whose names need prefixes, nitrogen trichloride, iodine monochloride, phosphorus pentachloride and carbon tetrachloride, because two non-metals can join in more than one ratio.', show: 'chk.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it is wrong'],
          rows: [
            ['ICl is ionic: it is "iodide chloride"', 'Iodine is a **non-metal**, like chlorine'],
            ['$\\ce{PCl5}$ is ionic: it has many chlorines', 'The **number** of atoms does not decide it'],
            ['$\\ce{MgCl2}$ is covalent: Mg is not in group 1', 'Group 2 is metals too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling iodine monochloride ionic. Iodine sits in group 17 with chlorine: two non-metals share.' },
        { say: 'Deciding by how many atoms there are. P C l five has five chlorines, but what matters is that phosphorus is a non-metal.', caption: 'Deciding by how many atoms there are. PCl₅ has five chlorines, but what matters is that phosphorus is a non-metal.' },
        { say: 'And forgetting that group 2 elements, like magnesium, are metals too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these compounds is **covalent**?',
          choices: ['$\\ce{SO2}$', '$\\ce{Na2O}$', '$\\ce{CaO}$', '$\\ce{Al2O3}$'],
          answer: 0,
          working: 'Sulfur and oxygen are both non-metals, so they share electrons. Sodium, calcium and aluminium are metals.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these compounds is covalent: S O two, N a two O, C a O, or A l two O three? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Which of these compounds is covalent: SO₂, Na₂O, CaO, or Al₂O₃? Pause the video and try it.' },
        { say: 'The answer is choice A, sulfur dioxide. Sulfur and oxygen are both non-metals. The other three each have a metal, so they are ionic.', show: 'q2.answer' },
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
          items: ['**Metal + non-metal**: electrons handed over, ionic', '**Non-metal + non-metal**: electrons shared, covalent', 'Metals on the left of the table, non-metals on the right', 'Covalent names use prefixes: mono-, di-, tri-, tetra-, penta-'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A metal with a non-metal hands over electrons: ionic.', show: 'sum.0' },
        { say: 'Two non-metals share electrons: covalent.', show: 'sum.1' },
        { say: 'Metals are on the left of the table, and non-metals on the right.', show: 'sum.2' },
        { say: 'And covalent compounds are named with prefixes. For more on covalent bonds and naming, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
