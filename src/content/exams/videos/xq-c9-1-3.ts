import type { AtomsEl, Explainer } from '@/video/script.ts';

// Exam question for Chemistry 9 lesson 1.3 (electron arrangements): phosphorus's arrangement,
// magnesium's group and period from 2,8,2, and why argon (2,8,8) does not react. Written by
// Gradileo in the style of a Grade 9 science unit test.
//
// The picture fills the shells of phosphorus, magnesium and argon one by one, built the same way
// as the lesson's atoms (src/video/atoms.ts).

const QUESTION = 'Answer these questions about electron arrangements. (a) Phosphorus has atomic number 15. Write its electron arrangement. (b) Magnesium has the arrangement 2,8,2. Which group and which period of the periodic table is magnesium in? (c) Argon has the arrangement 2,8,8. Explain why argon hardly reacts at all.';

/** Phosphorus, magnesium and argon, each filled in turn. */
const shells: AtomsEl = {
  kind: 'atoms',
  id: 'e',
  span: [19, 6.4],
  atoms: [
    { id: 'p', symbol: 'P', protons: 15, electrons: 0, at: [3, 3.2], tone: 'adj', name: 'phosphorus' },
    { id: 'mg', symbol: 'Mg', protons: 12, electrons: 0, at: [9.3, 3.2], tone: 'brand', name: 'magnesium' },
    { id: 'ar', symbol: 'Ar', protons: 18, electrons: 0, at: [15.9, 3.2], tone: 'good', name: 'argon' },
  ],
  clips: {
    p: { phases: [{ dur: 0.8, fill: { p: 2 } }, { dur: 2, fill: { p: 10 } }, { dur: 1.4, fill: { p: 15 } }] },
    mg: { phases: [{ dur: 0.8, fill: { mg: 2 } }, { dur: 2, fill: { mg: 10 } }, { dur: 0.8, fill: { mg: 12 } }] },
    ar: { phases: [{ dur: 0.8, fill: { ar: 2 } }, { dur: 1.6, fill: { ar: 10 } }, { dur: 1.6, fill: { ar: 18 } }] },
  },
  height: 460,
};

const video: Explainer = {
  id: 'xq-c9-1-3',
  lessonId: '',
  exam: {
    lesson: 'c9-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Phosphorus, Magnesium and Argon. Electron Arrangements',
  thumbnailTitle: 'Filling the Shells',
  thumbnail: 'e',
  summary:
    'A test-style question, solved one small step at a time: what is the electron arrangement of phosphorus, where is magnesium in the periodic table, and why does argon hardly react? Phosphorus is 2,8,5, magnesium has three shells and two outer electrons so it is in period 3 and group 2, and argon has a full outer shell, which is very stable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Filling the Shells', subtitle: 'Electron arrangements and the periodic table' }],
      lines: [
        { say: 'In this video, we solve a test-style question about electron arrangements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '2,8,5; group 2, period 3; a full outer shell' }],
      lines: [
        { say: 'Here is the question. Part a: phosphorus has atomic number fifteen. Write its electron arrangement. Part b: magnesium has the arrangement two, eight, two. Which group and which period of the periodic table is magnesium in? Part c: argon has the arrangement two, eight, eight. Explain why argon hardly reacts at all.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Fill the **shells** in order, then read the **group** and **period** from the arrangement' }],
      lines: [
        { say: 'We fill the electron shells from the inside out, and then read off what the arrangement tells us about the element.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [shells],
      lines: [
        { say: 'Here is what we need. The first shell holds up to two electrons, the second up to eight, and the third up to eight. Here are three atoms with empty shells: phosphorus, magnesium and argon.', show: ['e', 'e.labels', 'e.arrangement'] },
        { say: 'Phosphorus has fifteen electrons. Two fill the first shell, eight fill the second, and the last five go into the third.', play: 'e.p', focus: 'e.p' },
        { say: 'Magnesium has twelve: two, then eight, then two in the third shell.', play: 'e.mg', focus: 'e.mg' },
        { say: 'And argon has eighteen: two, eight, and eight, which fills the third shell completely.', play: 'e.ar', focus: 'e.ar' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Shells hold **2**, then **8**, then **8**', 'Number of shells = **period**', 'Outer electrons give the **group**'] }],
      lines: [
        { say: 'Here is the plan. Shells hold two, then eight, then eight electrons, filling from the inside out.', show: 'plan.0' },
        { say: 'The number of occupied shells is the period.', show: 'plan.1' },
        { say: 'And the number of outer electrons gives the group.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Phosphorus',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['15 = 2 + 8 + 5', '\\text{phosphorus: } \\good{2,8,5}'] }],
      lines: [
        { say: 'Step one. Phosphorus has fifteen electrons. Two in the first shell and eight in the second make ten, which leaves five for the third.', show: 'm.0' },
        { say: 'So phosphorus is two, eight, five. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Magnesium',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Magnesium: 2,8,2', 'Read off', 'So'],
          rows: [
            ['three numbers', '3 occupied **shells**', '**period 3**'],
            ['last number is 2', '2 **outer** electrons', '**group 2**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Two, eight, two has three numbers, so magnesium has three occupied shells. That puts it in period three.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The last number is two, so it has two outer electrons, which puts it in group two. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: Argon',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Argon\'s third shell holds **8**: it is **full**', 'A full outer shell is very **stable**', 'Reactions change the **outer** electrons, so argon has no reason to react'] }],
      lines: [
        { say: 'Step three. Argon\'s third shell has eight electrons, which is as many as it can hold. Its outer shell is full.', show: 's.0' },
        { say: 'A full outer shell is very stable.', show: 's.1' },
        { say: 'When atoms react, their outer electrons are given, taken or shared. Argon\'s are already in a stable full shell, so it hardly reacts. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **2,8,5**. (b) **Group 2**, **period 3**. (c) Argon has a **full outer shell**, which is very **stable**, so it hardly reacts.' },
      ],
      lines: [
        { say: 'Does it make sense? The numbers in each arrangement add up to the atomic number: two plus eight plus five is fifteen, and two plus eight plus two is twelve.', show: 'ans' },
        { say: 'So phosphorus is two, eight, five, magnesium is in group two and period three, and argon\'s full outer shell keeps it from reacting.' },
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
            ['Phosphorus is **8,7**', 'Forgot the first shell holds only **2**'],
            ['Magnesium is in **group 3**', 'Counted the **shells**, not the outer electrons'],
            ['Argon has **no** electrons to react with', 'It has 18; its outer shell is **full**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The first shell takes only two electrons, so the arrangement always starts with two once there are more than two.', focus: 'traps.0' },
        { say: 'The shells give the period, and the outer electrons give the group. Mixing them up swaps the two answers.', focus: 'traps.1' },
        { say: 'And argon has plenty of electrons, eighteen of them. It does not react because its outer shell is full.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which element has the electron arrangement 2,8,1?',
          choices: ['Lithium', 'Neon', 'Sodium', 'Magnesium'],
          answer: 2,
          working: '2 + 8 + 1 = 11 electrons, so the atomic number is 11. That is sodium.',
        },
      ],
      lines: [
        { say: 'Your turn. Which element has the electron arrangement two, eight, one? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two plus eight plus one is eleven electrons, so the atomic number is eleven. That is sodium: choice C.', show: 'q2.answer' },
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
          items: ['Fill shells **2**, **8**, **8**, from the inside out', 'Shells give the **period**; outer electrons give the **group**', 'A **full** outer shell is stable and unreactive'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Fill the shells two, eight, eight, from the inside out.', show: 'sum.0' },
        { say: 'The number of shells gives the period, and the outer electrons give the group.', show: 'sum.1' },
        { say: 'And a full outer shell is very stable, so the noble gases hardly react. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
