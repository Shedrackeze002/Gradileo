import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import materials from '@/content/chemmore/videos/cx-6-1.ts';

// Exam question for More Chemistry Topics lesson 6.1 (corrosion, alloys and materials): which of
// three nails rusts, how zinc blocks protect a ship, and why brass is harder than copper. Written
// by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's pure copper and brass given the same push (src/video/particles.ts).

const QUESTION = 'A student sets up three test tubes, each with an iron nail. Tube A has the nail in tap water open to the air. Tube B has the nail in dry air, with a drying agent. Tube C has the nail in boiled water under a layer of oil. (a) In which tube does the nail rust? Explain why. (b) Blocks of zinc are fixed to the steel hulls of ships. Explain how this stops the steel rusting. (c) Brass, an alloy of copper and zinc, is harder than pure copper. Explain why.';

const video: Explainer = {
  id: 'xq-cx-6-1',
  lessonId: '',
  exam: {
    lesson: 'cx-6-1',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Three Nails, a Ship\'s Hull and Brass. Corrosion and Alloys',
  thumbnailTitle: 'Rust, Zinc and Brass',
  thumbnail: 'sl',
  summary:
    'A test-style question, solved one small step at a time: which of three nails rusts, how do zinc blocks protect a ship, and why is brass harder than copper? Only the nail with both water and air rusts, zinc is more reactive so it corrodes instead of the steel, and the different-sized zinc atoms in brass stop the layers sliding.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Rust, Zinc and Brass', subtitle: 'Corrosion and alloys' }],
      lines: [
        { say: 'In this video, we solve a test-style question about rusting and alloys. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'A, needs water and oxygen; zinc corrodes instead; different-sized atoms stop layers sliding' }],
      lines: [
        { say: 'Here is the question. A student sets up three test tubes, each with an iron nail. Tube A has the nail in tap water open to the air. Tube B has the nail in dry air, with a drying agent. Tube C has the nail in boiled water under a layer of oil. Part a: in which tube does the nail rust? Explain why. Part b: blocks of zinc are fixed to the steel hulls of ships. Explain how this stops the steel rusting. Part c: brass, an alloy of copper and zinc, is harder than pure copper. Explain why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find what rusting **needs**, how to **stop** it, and what an alloy\'s atoms **do**' }],
      lines: [
        { say: 'We need what iron must have to rust, how a more reactive metal can protect it, and how mixing in different atoms makes a metal harder.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(materials, 'sl')],
      lines: [
        { say: 'Here is what we need, for part c. This is pure copper above, and brass below, with bigger zinc atoms among the copper.', show: ['sl', 'sl.labels', 'sl.key'] },
        { say: 'Both get the same push. In copper the rows slide over one another, but in brass the zinc atoms jam the rows, so it hardly gives.', play: 'sl.push' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Rusting needs **water** and **oxygen**', 'A **more reactive** metal corrodes first', 'Different-sized atoms **jam** the layers'] }],
      lines: [
        { say: 'Here is the plan. Iron only rusts when it has both water and oxygen.', show: 'plan.0' },
        { say: 'A more reactive metal in contact with the iron corrodes first.', show: 'plan.1' },
        { say: 'And atoms of a different size jam the layers of a metal, so they cannot slide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Which nail rusts?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Tube', 'Water?', 'Oxygen?', 'Rusts?'],
          rows: [
            ['A', 'yes', 'yes', '**yes**'],
            ['B', '**no**: dried', 'yes', 'no'],
            ['C', 'yes', '**no**: boiled, oil on top', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. In tube A, the nail has both water and air, so it rusts.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'In tube B, the drying agent removes the water, so it does not rust.', show: 't.1', focus: 't.1' },
        { say: 'In tube C, boiling drove out the dissolved air and the oil keeps more out, so there is no oxygen. Only tube A rusts, because rusting needs both water and oxygen. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: Zinc blocks',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Zinc is **more reactive** than iron', 'So the zinc **loses electrons** and corrodes instead', 'This is **sacrificial protection**'] }],
      lines: [
        { say: 'Step two. Zinc is more reactive than iron.', show: 's.0' },
        { say: 'So the zinc is oxidised, losing electrons and corroding, instead of the iron in the steel.', show: 's.1' },
        { say: 'The zinc is sacrificed to protect the steel, so this is called sacrificial protection. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Brass',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Pure copper: atoms the **same size**, in regular layers', 'Brass: **bigger zinc atoms** distort the layers', 'The layers **cannot slide** so easily, so brass is harder'] }],
      lines: [
        { say: 'Step three. In pure copper, all the atoms are the same size, so the layers slide over each other easily.', show: 'b.0' },
        { say: 'In brass, the bigger zinc atoms distort the layers.', show: 'b.1' },
        { say: 'Just as we saw, the layers cannot slide so easily, so brass is harder. That is part c.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Tube A**: rusting needs both **water** and **oxygen**. (b) Zinc is **more reactive**, so it corrodes **instead** of the steel. (c) Different-sized atoms **distort the layers**, so they cannot slide.' },
      ],
      lines: [
        { say: 'Does it make sense? Each of tubes B and C takes away one of the two things rusting needs, and only A keeps both.', show: 'ans' },
        { say: 'So only tube A rusts, zinc sacrifices itself to protect the steel, and brass is harder because its layers cannot slide.' },
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
            ['Tube **C**, it is in water', 'The water has **no oxygen**'],
            ['Zinc is a **barrier**', 'The blocks do not **cover** the steel'],
            ['Brass has **stronger bonds**', 'It is about layers **sliding**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Water alone is not enough. Boiling and the oil keep oxygen away.', focus: 'traps.0' },
        { say: 'A few zinc blocks do not cover the hull, so they protect it by corroding first, not by keeping water out.', focus: 'traps.1' },
        { say: 'And brass is harder because its layers cannot slide, not because its bonds are stronger.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these protects an iron pipe by sacrificial protection?',
          choices: ['fixing magnesium to it', 'painting it', 'coating it with oil', 'wrapping it in plastic'],
          answer: 0,
          working: 'Magnesium is more reactive than iron, so it corrodes instead. The others are barriers.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these protects an iron pipe by sacrificial protection? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Magnesium is more reactive than iron, so it corrodes instead: choice A. The others are barrier methods.', show: 'q2.answer' },
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
          items: ['Rusting needs **water** and **oxygen**', 'Sacrificial protection: a **more reactive** metal corrodes first', 'Alloys are harder: layers **cannot slide**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Iron rusts only with both water and oxygen.', show: 'sum.0' },
        { say: 'In sacrificial protection, a more reactive metal corrodes instead of the iron.', show: 'sum.1' },
        { say: 'And alloys are harder because their layers cannot slide. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
