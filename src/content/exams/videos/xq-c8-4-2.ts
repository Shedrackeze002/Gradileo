import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import rusting from '@/content/chem8/videos/c8-4-2.ts';

// Exam question for Chemistry 8 lesson 4.2 (rusting and corrosion): three nails in dry air, in
// water and air, and in boiled water under oil; what iron needs to rust; and why railings by the
// sea rust faster. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's three pieces of iron with water and oxygen, oxygen only and water
// only, rusting up close (src/video/particles.ts).

const QUESTION = 'Maya leaves three iron nails in test tubes for a week. Tube 1: the nail is in dry air, with a drying agent and a stopper. Tube 2: the nail is half in tap water, open to the air. Tube 3: the nail is covered by water that was boiled, with a layer of oil on top. (a) Which nail rusts? (b) What two things does iron need in order to rust? Use the tubes to explain. (c) Iron railings near the sea rust faster than railings far inland. Suggest why.';

const video: Explainer = {
  id: 'xq-c8-4-2',
  lessonId: '',
  exam: {
    lesson: 'c8-4-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Three Nails and a Seaside Railing. Rusting and Corrosion',
  thumbnailTitle: 'Which Nail Rusts?',
  thumbnail: 'r',
  summary:
    'A test-style question, solved one small step at a time: which of three nails rusts, what does iron need in order to rust, and why do railings by the sea rust faster? Only the nail in water and air rusts, because iron needs both water and oxygen, as the dry tube and the oiled tube show. Salt from the sea speeds rusting up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Nail Rusts?', subtitle: 'What iron needs to rust' }],
      lines: [
        { say: 'In this video, we solve a test-style question about rusting. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Tube 2; water and oxygen; salt speeds up rusting' }],
      lines: [
        { say: 'Here is the question. Maya leaves three iron nails in test tubes for a week. In tube one, the nail is in dry air, with a drying agent and a stopper. In tube two, the nail is half in tap water, open to the air. In tube three, the nail is covered by water that was boiled, with a layer of oil on top. Part a: which nail rusts? Part b: what two things does iron need in order to rust? Use the tubes to explain. Part c: iron railings near the sea rust faster than railings far inland. Suggest why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Each tube takes something **away**. Find what is **missing** where the nail stays shiny' }],
      lines: [
        { say: 'Each tube is set up to take something away from the nail. If a nail does not rust, whatever is missing from its tube must be needed for rusting.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(rusting, 'r')],
      lines: [
        { say: 'Here is what we need. Three pieces of iron, in blue, up close and sped up. The first has water and oxygen round it, the second only oxygen, and the third only water.', show: ['r', 'r.labels', 'r.tally'], play: 'r.go' },
        { say: 'Only the first rusts. Water settles on the iron, then oxygen joins on, turning it into rust, shown in orange.', focus: 'r.a' },
        { say: 'Without water, or without oxygen, the iron stays as it is.', focus: ['r.b', 'r.c'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['A drying agent removes **water**', 'Boiling removes **air**, and oil keeps it out', '**Salt** speeds rusting up'] }],
      lines: [
        { say: 'Here is the plan. A drying agent soaks up water vapour, so it keeps the air dry.', show: 'plan.0' },
        { say: 'Boiling drives the dissolved air out of water, and the oil stops fresh air getting back in.', show: 'plan.1' },
        { say: 'And salt makes iron rust faster.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The three tubes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Tube', 'Water?', 'Oxygen?', 'Rusts?'],
          rows: [
            ['1: dry air', '**no**', 'yes', 'no'],
            ['2: water and air', 'yes', 'yes', '**yes**'],
            ['3: boiled water, oil', 'yes', '**no**', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. In tube one, the drying agent takes the water out of the air. There is oxygen, but no water, and the nail stays shiny.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'In tube two, the nail has both water and air, and it rusts.', show: 't.1', focus: 't.1' },
        { say: 'In tube three, there is water, but boiling removed the air and the oil keeps it out, so there is no oxygen. No rust. So only the nail in tube two rusts. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: What iron needs',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{no water} \\Rightarrow \\text{no rust}, \\quad \\text{no oxygen} \\Rightarrow \\text{no rust}', '\\text{iron} + \\good{\\text{water}} + \\good{\\text{oxygen}} \\rightarrow \\text{rust}'] }],
      lines: [
        { say: 'Step two. Tube one shows that without water, iron does not rust. Tube three shows that without oxygen, it does not rust either.', show: 'm.0' },
        { say: 'So iron needs both water and oxygen to rust, as tube two shows. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: By the sea',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Sea spray carries **salt** onto the railings', 'Salty water makes iron rust **faster**', 'The air by the sea is also **damp**'] }],
      lines: [
        { say: 'Step three. Near the sea, the wind carries salty spray onto the railings.', show: 's.0' },
        { say: 'Salt dissolved in the water makes iron rust faster.', show: 's.1', focus: 's.1' },
        { say: 'And the air by the sea is often damp, so the railings are wet more of the time. That is part c.', show: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The nail in **tube 2**. (b) **Water** and **oxygen**: tube 1 has no water and tube 3 has no oxygen, and neither nail rusts. (c) **Salt** from sea spray speeds rusting up, and the air is damp.' },
      ],
      lines: [
        { say: 'Does it make sense? Rust is iron joined to oxygen, made with the help of water, so it needs both.', show: 'ans' },
        { say: 'So only tube two rusts, iron needs water and oxygen, and the salt by the sea speeds rusting up.' },
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
            ['Tube 3 rusts', 'Thought **water alone** is enough'],
            ['Iron needs **air** and **salt**', 'Salt **speeds it up**, but is not needed'],
            ['The sea is **colder**', 'Cold slows reactions; the cause is **salt**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The nail in tube three is under water, but the water has no oxygen in it, so it does not rust.', focus: 'traps.0' },
        { say: 'Salt makes rusting faster, but iron rusts without it too, as tube two shows.', focus: 'traps.1' },
        { say: 'And cold would slow rusting down, so it cannot explain the faster rusting. The salt is the reason.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which method still protects a steel bucket where its coating has been scratched?',
          choices: ['Painting it', 'Galvanizing it with zinc', 'Oiling it', 'Wrapping it in plastic'],
          answer: 1,
          working: 'Zinc is more reactive than iron, so it reacts instead of the iron, even at a scratch.',
        },
      ],
      lines: [
        { say: 'Your turn. Which method still protects a steel bucket where its coating has been scratched? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Zinc is more reactive than iron, so it reacts instead of the iron, even at a scratch: choice B, galvanizing.', show: 'q2.answer' },
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
          items: ['Iron rusts only with **water** and **oxygen** together', 'Remove one in a tube, and the nail stays **shiny**', '**Salt** makes rusting faster'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Iron rusts only when water and oxygen are both there.', show: 'sum.0' },
        { say: 'Take one away in a test tube, and the nail stays shiny.', show: 'sum.1' },
        { say: 'And salt makes rusting faster. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
