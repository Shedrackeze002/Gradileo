import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import separating from '@/content/chem7/videos/c7-4-1.ts';

// Exam question for Chemistry 7 lesson 4.1 (sieving, magnets and filtering): a mixture of iron
// filings, sand and salt. A magnet removes the iron, then filtering the mixture in water leaves sand
// as the residue and gives salt water as the filtrate, because dissolved salt passes through the
// paper. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The pictures are the lesson's sieve, magnet and filter papers (src/video/particles.ts).

const QUESTION = 'A mixture contains iron filings, sand and salt. (a) How can the iron filings be removed, and what property of iron does this use? (b) The sand and salt are stirred into water, and the mixture is filtered. Name the residue and the filtrate. (c) Explain why the salt passes through the filter paper.';

const video: Explainer = {
  id: 'xq-c7-4-1',
  lessonId: '',
  exam: {
    lesson: 'c7-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Iron, Sand and Salt. Sieving, Magnets and Filtering',
  thumbnailTitle: 'Iron, Sand and Salt',
  thumbnail: 'mg',
  summary:
    'A test-style question, solved one small step at a time: how do you separate a mixture of iron filings, sand and salt? A magnet pulls out the iron because iron is magnetic, then filtering the rest in water leaves sand on the paper as the residue, while the dissolved salt passes through in the filtrate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Iron, Sand and Salt', subtitle: 'Separating a mixture, one property at a time' }],
      lines: [
        { say: 'In this video, we solve a test-style question about separating mixtures. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'A magnet (magnetism); residue sand, filtrate salt water; dissolved salt particles are tiny' }],
      lines: [
        { say: 'Here is the question. A mixture contains iron filings, sand and salt. Part a: how can the iron filings be removed, and what property of iron does this use? Part b: the sand and salt are stirred into water, and the mixture is filtered. Name the residue and the filtrate. Part c: explain why the salt passes through the filter paper.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Pull the three apart one at a time, each time using a **property** that only one of them has' }],
      lines: [
        { say: 'We separate a mixture by finding a property that is different for its parts. The question walks us through it one substance at a time.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(separating, 'sv')],
      lines: [
        { say: 'Here is what we need. These are large pieces of gravel mixed with small grains of sand, sitting on a sieve.', show: ['sv', 'sv.labels'] },
        { say: 'Watch it shake. The small grains fall through the holes and the big pieces are caught. A sieve uses size. Every method works like this, using one property that the parts do not share.', play: 'sv.go', focus: 'sv.a' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Iron is **magnetic**: use a magnet', 'Salt **dissolves** in water, sand does not', 'Filter: sand stays, salt water passes'] }],
      lines: [
        { say: 'Here is the plan. Iron is magnetic, and sand and salt are not, so a magnet comes first.', show: 'plan.0' },
        { say: 'Salt dissolves in water, but sand does not.', show: 'plan.1' },
        { say: 'So filtering stops the sand and lets the salt water through.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The magnet',
      layout: 'center',
      main: [pick(separating, 'mg')],
      lines: [
        { say: 'Step one. Here are iron filings, in pink, mixed with sand.', show: ['mg', 'mg.labels'] },
        { say: 'Hold a magnet over them. The iron is pulled up and out, and the sand stays behind. A magnet removes the iron because iron is magnetic. That is part a.', play: 'mg.go', focus: 'mg.a' },
      ],
    },
    {
      chapter: 'Step 2: Filtering',
      layout: 'center',
      main: [pick(separating, 'f')],
      lines: [
        { say: 'Step two. The sand and salt go into water, and the salt dissolves. Here is sand in water, on a filter paper.', show: ['f', 'f.labels'] },
        { say: 'The water passes through the tiny holes in the paper, and the sand is caught. What stays on the paper is the residue: the sand. What comes through is the filtrate: the salt water. That is part b.', play: 'f.pour' },
      ],
    },
    {
      chapter: 'Step 3: Why salt gets through',
      layout: 'center',
      main: [pick(separating, 's')],
      lines: [
        { say: 'Step three. Here is salt water on the same filter paper. The yellow particles are the dissolved salt.', show: ['s', 's.labels'] },
        { say: 'Watch. Dissolved salt is split into particles as small as water particles, so they slip through the holes along with the water. The salt water comes out just as salty. That is part c.', play: 's.pour' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) A **magnet**, because iron is **magnetic**. (b) Residue: **sand**. Filtrate: **salt water**. (c) The salt has **dissolved**, so its particles are small enough to pass through the paper with the water.' },
      ],
      lines: [
        { say: 'Does it make sense? Each step used a property only one substance had: magnetism for the iron, and dissolving for the salt.', show: 'ans' },
        { say: 'So a magnet removes the iron, the sand is the residue, the salt water is the filtrate, and the salt gets through because it has dissolved.' },
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
            ['**Sieve** out the iron', 'Iron filings and sand grains are a similar **size**'],
            ['Residue: **salt**', 'Forgot the salt has **dissolved**'],
            ['Filtrate: **pure water**', 'Dissolved salt passes **through** with the water'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A sieve will not work for the iron, because iron filings and sand grains are about the same size. Magnetism is what makes iron different.', focus: 'traps.0' },
        { say: 'The salt cannot be the residue, because once dissolved it goes through the paper.', focus: 'traps.1' },
        { say: 'And for the same reason, the filtrate is not pure water. It is salt water.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which mixture can be separated using a kitchen sieve?',
          choices: ['Gravel and sand', 'Salt and water', 'Sugar and water', 'Iron filings and sand'],
          answer: 0,
          working: 'Gravel and sand have pieces of very different sizes. Salt and sugar dissolve, and iron filings are the size of sand grains.',
        },
      ],
      lines: [
        { say: 'Your turn. Which mixture can be separated using a kitchen sieve? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Gravel and sand have pieces of very different sizes, so a sieve works: choice A. Salt and sugar dissolve, and iron filings are the same size as sand grains.', show: 'q2.answer' },
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
          items: ['Sieve: **size**. Magnet: **magnetic** metals', 'Filtering: **residue** stays, **filtrate** passes', 'Filtering cannot remove a **dissolved** solid'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A sieve separates by size, and a magnet pulls out magnetic metals like iron.', show: 'sum.0' },
        { say: 'Filtering keeps an undissolved solid on the paper as the residue, and lets the liquid through as the filtrate.', show: 'sum.1' },
        { say: 'And filtering cannot remove a solid that has dissolved. For more on separating mixtures, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
