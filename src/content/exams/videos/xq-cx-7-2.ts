import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import shells from '@/content/chemmore/videos/cx-7-2.ts';

// Exam question for More Chemistry Topics lesson 7.2 (electron configurations and ionisation
// energies): the configurations of an iron atom and an iron(II) ion, and why potassium has a lower
// first ionisation energy than sodium. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's sodium and potassium atoms each losing an outer electron
// (src/video/atoms.ts).

const QUESTION = 'Iron has atomic number 26. (a) Give the full electron configuration of an iron atom. (b) Give the electron configuration of an Fe²⁺ ion. (c) Explain why the first ionisation energy of potassium is lower than that of sodium.';

const video: Explainer = {
  id: 'xq-cx-7-2',
  lessonId: '',
  exam: {
    lesson: 'cx-7-2',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Iron, the Iron(II) Ion and Sodium Against Potassium. Electron Configurations and Ionisation Energies',
  thumbnailTitle: 'Which Electron Goes First?',
  thumbnail: 'ie',
  summary:
    'A test-style question, solved one small step at a time: what is the electron configuration of iron and of the Fe²⁺ ion, and why is potassium\'s first ionisation energy lower than sodium\'s? Iron is 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s², Fe²⁺ loses its 4s electrons first to give 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶, and potassium\'s outer electron is further from the nucleus with more shielding.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Electron Goes First?', subtitle: 'Configurations and ionisation energy' }],
      lines: [
        { say: 'In this video, we solve a test-style question about electron configurations and ionisation energies. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²; 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶; further out, more shielding' }],
      lines: [
        { say: 'Here is the question. Iron has atomic number 26. Part a: give the full electron configuration of an iron atom. Part b: give the electron configuration of an F e two plus ion. Part c: explain why the first ionisation energy of potassium is lower than that of sodium.', caption: 'Here is the question. Iron has atomic number 26. Part a: give the full electron configuration of an iron atom. Part b: give the electron configuration of an Fe²⁺ ion. Part c: explain why the first ionisation energy of potassium is lower than that of sodium.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Fill the **sub-shells** in order, remove electrons in the **right** order, and compare two **outer electrons**' }],
      lines: [
        { say: 'We fill sub-shells in order of energy, remember which electrons leave first when an ion forms, and compare how tightly two atoms hold their outer electrons.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(shells, 'ie')],
      lines: [
        { say: 'Here is what we need, for part c. These are sodium and potassium, from the same group. Potassium has one more shell, so its outer electron is further from the nucleus, with more inner electrons shielding it.', show: ['ie', 'ie.labels', 'ie.arrangement'] },
        { say: 'So potassium\'s outer electron is pulled away more easily than sodium\'s.', show: 'ie.charges', play: 'ie.ion' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Fill order: 1s 2s 2p 3s 3p **4s** **3d**', 'd-block ions lose **4s** electrons **first**', 'Ionisation energy depends on **distance** and **shielding**'] }],
      lines: [
        { say: 'Here is the plan. Sub-shells fill in order of energy, and 4s fills before 3d.', show: 'plan.0' },
        { say: 'But when a d-block atom forms an ion, it loses its 4s electrons first.', show: 'plan.1' },
        { say: 'And how easily an outer electron leaves depends on its distance from the nucleus and the shielding by inner electrons.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The iron atom',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 + 2 + 6 + 2 + 6 = 18 \\quad (\\text{to } 3p)', '18 + 2\\,(4s) + 6\\,(3d) = 26', '\\good{1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^6\\,4s^2}'] }],
      lines: [
        { say: 'Step one. Filling 1s, 2s, 2p, 3s and 3p uses 18 electrons, the same as argon.', show: 'm.0' },
        { say: 'Then 4s takes 2, and the last 6 go into 3d, making 26.', show: 'm.1' },
        { say: 'So iron is 1s 2, 2s 2, 2p 6, 3s 2, 3p 6, 3d 6, 4s 2. That is part a.', caption: 'So iron is 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s². That is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The Fe²⁺ ion',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'md', lines: ['\\ce{Fe -> Fe^2+ + 2e-}: \\text{ the two } 4s \\text{ electrons leave}', '\\good{1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^6}'] }],
      lines: [
        { say: 'Step two. To form F e two plus, iron loses two electrons, and they come from 4s, not 3d.', caption: 'Step two. To form Fe²⁺, iron loses two electrons, and they come from 4s, not 3d.', show: 'f.0' },
        { say: 'So the ion is 1s 2, 2s 2, 2p 6, 3s 2, 3p 6, 3d 6. That is part b.', caption: 'So the ion is 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶. That is part b.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Step 3: Potassium and sodium',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Sodium', 'Potassium'],
          rows: [
            ['outer electron', '3s', '**4s**: one shell further out'],
            ['shielding', '10 inner electrons', '**18** inner electrons'],
            ['attraction to nucleus', 'stronger', '**weaker**, so easier to remove'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Potassium\'s outer electron is in 4s, one shell further from the nucleus than sodium\'s 3s electron.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'It also has more inner electrons shielding it from the nucleus.', show: 't.1', focus: 't.1' },
        { say: 'So, although potassium has more protons, its outer electron is attracted less strongly, and less energy is needed to remove it. That is part c.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²**. (b) **1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶**. (c) Potassium\'s outer electron is **further from the nucleus** and **more shielded**, so it is **less strongly attracted**.' },
      ],
      lines: [
        { say: 'Does it make sense? The superscripts in part a add up to 26, and in part b to 24, two fewer for a two plus ion.', show: 'ans' },
        { say: 'So iron ends 3d 6, 4s 2, its two plus ion loses the 4s electrons, and potassium\'s outer electron is further out and more shielded.', caption: 'So iron ends 3d⁶ 4s², its 2+ ion loses the 4s electrons, and potassium\'s outer electron is further out and more shielded.' },
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
            ['Fe²⁺: …3d⁴ 4s²', 'Took electrons from **3d**, not 4s'],
            ['…3p⁶ 3d⁸', 'Put all 8 in **3d**, skipping 4s'],
            ['K has **fewer protons**', 'It has **more**: shielding wins'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '4s fills first, but it also empties first. The ion keeps all six 3d electrons.', focus: 'traps.0' },
        { say: 'The atom needs 4s filled before 3d, so the 26 electrons end 3d 6, 4s 2.', caption: 'The atom needs 4s filled before 3d, so the 26 electrons end 3d⁶ 4s².', focus: 'traps.1' },
        { say: 'And potassium has more protons than sodium. Its electron is easier to remove because of distance and shielding.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The first five ionisation energies of element X, in kJ mol⁻¹, are 578, 1817, 2745, 11577 and 14842. Which group is X in?',
          choices: ['Group 2', 'Group 13 (3)', 'Group 14 (4)', 'Group 1'],
          answer: 1,
          working: 'The big jump comes after the third electron, so X has three outer electrons: Group 13.',
        },
      ],
      lines: [
        { say: 'Your turn. The first five ionisation energies of element X, in kilojoules per mole, are 578, 1,817, 2,745, 11,577 and 14,842. Which group is X in? Pause the video and try it.', caption: 'Your turn. The first five ionisation energies of element X, in kJ mol⁻¹, are 578, 1817, 2745, 11577 and 14842. Which group is X in? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The big jump comes after the third electron, when a new, inner shell is reached. So X has three outer electrons and is in Group 13: choice B.', show: 'q2.answer' },
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
          items: ['**4s** fills before **3d**', 'd-block ions lose **4s** electrons first', 'Further out and more shielded: **lower** ionisation energy'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. 4s fills before 3d.', show: 'sum.0' },
        { say: 'But d-block atoms lose their 4s electrons first when they form ions.', show: 'sum.1' },
        { say: 'And an electron further out and more shielded has a lower ionisation energy. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
