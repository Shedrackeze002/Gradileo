import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { periodTwo } from '@/content/chem10/videos/lib/c10-atoms.ts';

// Exam question for Chemistry 10 lesson 2.4 (the periodic table): name four elements from a family
// and a period. The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise
// 41, section 2.5, CC BY-NC-SA 4.0). The book's answers: (a) krypton, Kr; (b) calcium, Ca;
// (c) fluorine, F; (d) tellurium, Te.
//
// The pictures: period two filling its atoms one after another (each one more electron in the same
// two shells, src/video/atoms.ts), then the main-group table to xenon with each answer lit where
// its period meets its family. Cadmium is a transition metal, left out of this table, so the
// narration places it in period 5 by its atomic number.

const QUESTION =
  'Use the periodic table to give the name and symbol for each of the following elements: (a) the noble gas in the same period as germanium (b) the alkaline earth metal in the same period as selenium (c) the halogen in the same period as lithium (d) the chalcogen in the same period as cadmium';

const table = (height = 520) =>
  figure(
    'pt',
    [
      periodicTable({
        upTo: 54,
        numbers: true,
        highlights: [
          { id: 'g18', cells: ['He', 'Ne', 'Ar', 'Kr', 'Xe'], tone: 'adj' },
          { id: 'g2', cells: ['Be', 'Mg', 'Ca', 'Sr'], tone: 'adj' },
          { id: 'g17', cells: ['F', 'Cl', 'Br', 'I'], tone: 'adj' },
          { id: 'g16', cells: ['O', 'S', 'Se', 'Te'], tone: 'adj' },
          { id: 'ge', cells: ['Ge'], tone: 'opp' },
          { id: 'se', cells: ['Se'], tone: 'opp' },
          { id: 'li', cells: ['Li'], tone: 'opp' },
          { id: 'kr', cells: ['Kr'], tone: 'good' },
          { id: 'ca', cells: ['Ca'], tone: 'good' },
          { id: 'f', cells: ['F'], tone: 'good' },
          { id: 'te', cells: ['Te'], tone: 'good' },
        ],
      }),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-c10-2-4',
  lessonId: '',
  exam: {
    lesson: 'c10-2-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 41, section 2.5, The Periodic Table',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Element from Its Family and Period. The Periodic Table',
  thumbnailTitle: 'Family Meets Period',
  thumbnail: 'pt',
  summary:
    'A real test question, solved one small step at a time: we find the noble gas in germanium\'s period, the alkaline earth metal in selenium\'s, the halogen in lithium\'s and the chalcogen in cadmium\'s. Each answer sits where a row of the periodic table crosses a column, so we find the row, then the column.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Family Meets Period', subtitle: 'Reading the periodic table, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to find four elements on the periodic table. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the periodic table to give the name and symbol for each of the following elements:<br>(a) the noble gas in the same period as germanium<br>(b) the alkaline earth metal in the same period as selenium<br>(c) the halogen in the same period as lithium<br>(d) the chalcogen in the same period as cadmium',
          answer: '(a) krypton, Kr (b) calcium, Ca (c) fluorine, F (d) tellurium, Te',
          working: 'Find the row of the given element, then move along it to the family\'s column.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Use the periodic table to give the name and symbol for each of the following elements. The noble gas in the same period as germanium. The alkaline earth metal in the same period as selenium. The halogen in the same period as lithium. And the chalcogen in the same period as cadmium.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Each answer is where a **row** crosses a **column**' }],
      lines: [
        { say: 'Every part gives us two clues: a family, which is a column of the table, and an element whose period, or row, we must match.', show: 'plain' },
        { say: 'A row and a column cross in exactly one square, so each part has exactly one answer.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        periodTwo('p2', 250),
        {
          kind: 'table',
          id: 'fam',
          head: ['Family', 'Group'],
          rows: [
            ['Alkaline earth metals', '2'],
            ['Chalcogens', '16'],
            ['Halogens', '17'],
            ['Noble gases', '18'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A period is a row. Every element in a row uses the same number of electron shells. Watch period two fill: lithium to neon, each with one more electron in the same two shells.', show: ['p2', 'p2.labels', 'p2.arrangement'], play: 'p2.fill', playDelay: 0.3 },
        { say: 'And the families are columns, with names worth learning. The alkaline earth metals are group 2. The chalcogens are group 16, the oxygen family. The halogens are group 17, and the noble gases group 18.', show: 'fam' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the given element\'s **period** (row)', 'Find the family\'s **group** (column)', 'Read the element where they **cross**'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, find the period of the element we are given.', show: 'plan.0' },
        { say: 'Second, find the column of the family.', show: 'plan.1' },
        { say: 'Third, read off the element where the row and the column cross.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Parts (a) and (b)',
      layout: 'center',
      main: [table(520)],
      lines: [
        { say: 'Step one. Here are the main groups of the periodic table. Part a: germanium is number 32, in period 4.', show: ['pt.table', 'pt.ge'] },
        { say: 'Move along period 4 to the noble gases, the last column. The element there is krypton, K r.', show: ['pt.g18', 'pt.kr'], caption: 'Move along period 4 to the noble gases, the last column. The element there is krypton, Kr.' },
        { say: 'Part b: selenium, number 34, is also in period 4. The alkaline earth metals are group 2, and in period 4 that is calcium, C a.', show: ['pt.se', 'pt.g2', 'pt.ca'], caption: 'Part (b): selenium, number 34, is also in period 4. The alkaline earth metals are group 2, and in period 4 that is calcium, Ca.' },
      ],
    },
    {
      chapter: 'Step 2: Parts (c) and (d)',
      layout: 'center',
      main: [table(520)],
      lines: [
        { say: 'Step two. Part c: lithium is in period 2, the row we watched fill. The halogens are group 17, and in period 2 that is fluorine, F.', show: ['pt.table', 'pt.li', 'pt.g17', 'pt.f'] },
        { say: 'Part d: cadmium is number 48. It is a transition metal, so it is not drawn in this table, but 48 falls between strontium, 38, and xenon, 54. So cadmium is in period 5.' },
        { say: 'The chalcogens are group 16, under oxygen and sulfur. In period 5 that is tellurium, T e.', show: ['pt.g16', 'pt.te'], caption: 'The chalcogens are group 16, under oxygen and sulfur. In period 5 that is tellurium, Te.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Given element', 'Period', 'Family', 'Answer'],
          rows: [
            ['(a)', 'germanium, 32', '4', 'noble gas, 18', '**krypton, Kr**'],
            ['(b)', 'selenium, 34', '4', 'alkaline earth, 2', '**calcium, Ca**'],
            ['(c)', 'lithium, 3', '2', 'halogen, 17', '**fluorine, F**'],
            ['(d)', 'cadmium, 48', '5', 'chalcogen, 16', '**tellurium, Te**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer: krypton, calcium, fluorine and tellurium. That matches the book.', show: 'ans' },
        { say: 'A quick check: each answer must have the same number of shells as the given element. Krypton and germanium both have four shells, and fluorine and lithium both have two.' },
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
            ['(b) magnesium, Mg', 'Right family, **wrong row**'],
            ['(c) chlorine, Cl', 'The best-known halogen, but **period 3**'],
            ['(d) selenium, Se', 'Thought cadmium was in **period 4**'],
            ['(a) argon, Ar', 'Mixed up **period** and **group**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Picking the right family but the wrong row, like magnesium for part b, or chlorine for part c. Always match the period of the given element.' },
        { say: 'Placing cadmium in period 4 because it is hidden among the transition metals. Its atomic number, 48, puts it in period 5.' },
        { say: 'And mixing up periods, which are rows, with groups, which are columns.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which element is the **alkali metal** in the same period as chlorine?',
          choices: ['Lithium, Li', 'Sodium, Na', 'Potassium, K', 'Magnesium, Mg'],
          answer: 1,
          working: 'Chlorine is in period 3. The alkali metals are group 1, and in period 3 that is sodium.',
        },
      ],
      lines: [
        { say: 'Your turn. Which element is the alkali metal in the same period as chlorine? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Chlorine is in period 3. The alkali metals are group 1, so the answer is sodium, choice B. Magnesium is in period 3 too, but in group 2.', show: 'q2.answer' },
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
          items: ['A **period** is a row: same number of shells', 'A **group** or family is a column', 'Group 2 alkaline earth, 16 chalcogens, 17 halogens, 18 noble gases', 'Find the row, then the column, then read where they cross'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A period is a row, and its elements use the same number of shells.', show: 'sum.0' },
        { say: 'A group, or family, is a column.', show: 'sum.1' },
        { say: 'Group 2 is the alkaline earth metals, 16 the chalcogens, 17 the halogens and 18 the noble gases.', show: 'sum.2' },
        { say: 'And to find an element, find the row, then the column, and read where they cross. For more on the periodic table, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
