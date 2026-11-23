import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import organizing from '@/content/chem8/videos/c8-2-1.ts';

// Exam question for Chemistry 8 lesson 2.1 (organizing the elements): the element after oxygen
// (atomic number 8) is fluorine, number 9, with 9 protons; fluorine and chlorine share a group, so
// they have similar properties; and Mendeleev's gaps let him predict elements not yet found.
// Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's period two, lithium to neon, filling with electrons one atom at a
// time (src/video/atoms.ts).

const QUESTION = 'Answer these questions about the periodic table. (a) Oxygen has atomic number 8. What is the atomic number of the next element along the same period, and how many protons are in each of its atoms? (b) Fluorine and chlorine are in the same group. Would you expect their chemical properties to be similar or different? Explain. (c) When Mendeleev made his table in 1869, he left gaps in it. Why was this a clever idea?';

const video: Explainer = {
  id: 'xq-c8-2-1',
  lessonId: '',
  exam: {
    lesson: 'c8-2-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Reading the Periodic Table. Organizing the Elements',
  thumbnailTitle: 'Reading the Periodic Table',
  thumbnail: 'p2',
  summary:
    'A test-style question, solved one small step at a time: what comes after oxygen in its period, would fluorine and chlorine behave alike, and why did Mendeleev leave gaps in his table? The next element is number 9 with 9 protons, elements in the same group have similar properties, and the gaps let Mendeleev predict elements that were found later.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Reading the Periodic Table', subtitle: 'Periods, groups and Mendeleev\'s gaps' }],
      lines: [
        { say: 'In this video, we solve a test-style question about organizing the elements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Answer these questions about the periodic table. (a) Oxygen has atomic number $8$. What is the atomic number of the next element along the same period, and how many protons are in each of its atoms? (b) Fluorine and chlorine are in the same group. Would you expect their chemical properties to be similar or different? (c) When Mendeleev made his table in $1869$, he left gaps in it. Why was this a clever idea?', answer: '9 and 9 protons; similar; he could predict missing elements' }],
      lines: [
        { say: 'Here is the question. Part a: oxygen has atomic number eight. What is the atomic number of the next element along the same period, and how many protons are in each of its atoms? Part b: fluorine and chlorine are in the same group. Would you expect their chemical properties to be similar or different? Explain. Part c: when Mendeleev made his table in eighteen sixty nine, he left gaps in it. Why was this a clever idea?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'How is the table **ordered**, what do **groups** share, and what did the **gaps** let Mendeleev do?' }],
      lines: [
        { say: 'Each part tests one idea behind the periodic table: the order of the elements, what a group means, and how the table was built.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(organizing, 'p2')],
      lines: [
        { say: 'Here is what we need. This is period two, a row of the table, from lithium to neon, drawn as atoms.', show: ['p2', 'p2.labels'] },
        { say: 'Watch the electrons arrive. Each atom along the row has one more proton, and one more electron, than the one before it. The atomic number, the number of protons, goes up by one at every step.', play: 'p2.fill', show: 'p2.arrangement' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Atomic number = number of **protons**, up **one** at each step', 'A **group** is a column: **similar** properties', 'Mendeleev\'s gaps were for elements **not yet found**'] }],
      lines: [
        { say: 'Here is the plan. The atomic number is the number of protons, and it goes up by one at each step along a period.', show: 'plan.0' },
        { say: 'A group is a column, and elements in a group have similar properties.', show: 'plan.1' },
        { say: 'And Mendeleev left gaps for elements that had not been found yet.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: After oxygen',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{oxygen: } 8 \\quad \\to \\quad 8 + 1 = \\good{9}', '\\text{atomic number } 9 \\Rightarrow \\good{9\\ \\text{protons}}'] }],
      lines: [
        { say: 'Step one. Along a period, the atomic number goes up by one, so the element after oxygen has atomic number eight plus one, nine. It is fluorine.', show: 'm.0' },
        { say: 'The atomic number is the number of protons, so each fluorine atom has nine protons. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Same group',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'g', items: ['Same **group** = same **column**', 'Elements in a group have **similar** chemical properties', 'Fluorine and chlorine both react **strongly**, with metals for example'] }],
      lines: [
        { say: 'Step two. Fluorine and chlorine are in the same group, the same column of the table.', show: 'g.0' },
        { say: 'Elements in the same group have similar chemical properties, so we expect them to behave in similar ways. That is part b.', show: 'g.1', focus: 'g.1' },
        { say: 'And they do: both are very reactive gases that join with metals to make salts.', show: 'g.2' },
      ],
    },
    {
      chapter: 'Step 3: The gaps',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Property', 'Mendeleev predicted (1871)', 'Germanium (found 1886)'], rows: [['atomic mass', 'about 72', '72.6'], ['density', 'about 5.5 g/cm³', '5.3 g/cm³'], ['colour', 'grey metal', 'grey metal']] }],
      lines: [
        { say: 'Step three. Mendeleev grouped elements with similar properties. Where no known element fitted, he left a gap instead of forcing one in.', show: 't' },
        { say: 'Then he used the elements around each gap to predict what the missing element would be like. Fifteen years later, germanium was found, and it matched his predictions closely. So the gaps let him predict elements that had not been discovered yet. That is part c.', focus: ['t.0', 't.1', 't.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Atomic number **9**, so **9 protons**. (b) **Similar**, because they are in the same group. (c) The gaps were for elements **not yet discovered**, so he could **predict** their properties.' },
      ],
      lines: [
        { say: 'Does it make sense? The table is ordered by protons, its columns hold families of similar elements, and that pattern is what let Mendeleev see where elements were missing.', show: 'ans' },
        { say: 'So the next element is number nine with nine protons, fluorine and chlorine behave alike, and the gaps let Mendeleev predict new elements.' },
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
            ['Atomic number **16**', 'Went **down** the group to sulfur'],
            ['**Different** properties', 'Mixed up **groups** and **periods**'],
            ['The gaps were **mistakes**', 'They were for elements **not yet found**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sixteen is sulfur, below oxygen in the same group. The question asks for the next element along the period.', focus: 'traps.0' },
        { say: 'Elements in a period, a row, have different properties. Elements in a group, a column, have similar ones.', focus: 'traps.1' },
        { say: 'And the gaps were not mistakes. They were the cleverest part of the table, because they were later filled by new elements.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which pair of elements would you expect to have the most similar properties?',
          choices: ['Na and K, group 1', 'Na and Cl, period 3', 'C and Ne, period 2', 'H and He, period 1'],
          answer: 0,
          working: 'Sodium and potassium share a group, so they have similar properties. The other pairs only share a period.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair of elements would you expect to have the most similar properties? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Sodium and potassium share a group, so they have similar properties: choice A. The other pairs only share a period, a row.', show: 'q2.answer' },
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
          items: ['Ordered by **atomic number**: up one at each step', '**Group** (column): similar properties', 'Mendeleev\'s gaps **predicted** new elements'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The periodic table is in order of atomic number, which goes up by one at each step.', show: 'sum.0' },
        { say: 'Elements in the same group, a column, have similar properties.', show: 'sum.1' },
        { say: 'And Mendeleev\'s gaps let him predict elements that were found later. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
