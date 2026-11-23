import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import chroma from '@/content/chem7/videos/c7-4-3.ts';

// Exam question for Chemistry 7 lesson 4.3 (chromatography): matching the ink on a note to one of
// three pens. The note and pen P both give spots at 2 cm and 6 cm, so pen P wrote it; pen Q's ink
// has three dyes; and the start line is drawn in pencil because pencil does not dissolve in the
// solvent. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The picture is the lesson's three strips of chromatography paper (src/video/particles.ts): the
// solvent carries each dye up at its own speed, so a mixed ink splits into spots.

const QUESTION = 'A note is written in black ink. A student runs paper chromatography on the ink from the note and from three pens. The results are: note, spots at 2 cm and 6 cm; pen P, spots at 2 cm and 6 cm; pen Q, spots at 2 cm, 4 cm and 6 cm; pen R, one spot at 6 cm. (a) Which pen wrote the note? (b) How many dyes are in the ink of pen Q? (c) Why must the start line be drawn in pencil and not in pen?';

const video: Explainer = {
  id: 'xq-c7-4-3',
  lessonId: '',
  exam: {
    lesson: 'c7-4-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Which Pen Wrote the Note? Chromatography',
  thumbnailTitle: 'Which Pen Wrote the Note?',
  thumbnail: 'ch',
  summary:
    'A test-style question, solved one small step at a time: chromatography of the ink on a note and of three pens. Which pen wrote the note, how many dyes are in pen Q, and why is the start line drawn in pencil? Pen P matches the note spot for spot, pen Q has three dyes, and pencil does not dissolve in the solvent, so it cannot run up the paper.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Pen Wrote the Note?', subtitle: 'Matching inks by chromatography' }],
      lines: [
        { say: 'In this video, we solve a test-style question about chromatography. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A note is written in black ink. Paper chromatography is run on the note\'s ink and on three pens. Note: spots at $2$ cm and $6$ cm. Pen P: $2$ cm and $6$ cm. Pen Q: $2$ cm, $4$ cm and $6$ cm. Pen R: one spot at $6$ cm. (a) Which pen wrote the note? (b) How many dyes are in pen Q\'s ink? (c) Why must the start line be drawn in pencil and not in pen?', answer: 'Pen P; three dyes; pencil does not dissolve' }],
      lines: [
        { say: 'Here is the question. A note is written in black ink. A student runs paper chromatography on the ink from the note and from three pens. The note gives spots at two centimetres and six centimetres. Pen P gives spots at two and six centimetres. Pen Q gives spots at two, four and six centimetres. Pen R gives one spot at six centimetres. Part a: which pen wrote the note? Part b: how many dyes are in the ink of pen Q? Part c: why must the start line be drawn in pencil and not in pen?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find the pen whose spots **match** the note **exactly**, count the spots, and think about the **start line**' }],
      lines: [
        { say: 'Each spot is one dye, so matching inks means matching spots. Then we count spots, and think about what would happen to a start line drawn in ink.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(chroma, 'ch')],
      lines: [
        { say: 'Here is what we need. These are three strips of paper, each with a dot on the start line: an ink called X, and two pure dyes, A and B. The bottom of each strip stands in a solvent.', show: ['ch', 'ch.labels'] },
        { say: 'Watch the solvent soak up the paper. It carries each dye up at its own speed, so ink X splits into two spots, one level with dye A and one level with dye B. Each spot is one dye, and a dye always travels the same distance in the same test.', play: 'ch.run', focus: 'ch.x' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Same inks give the **same spots**, no more and no fewer', 'Number of spots = number of **dyes**', 'The start line must **not dissolve** in the solvent'] }],
      lines: [
        { say: 'Here is the plan. Two samples of the same ink give exactly the same spots, no more and no fewer.', show: 'plan.0' },
        { say: 'The number of spots is the number of dyes.', show: 'plan.1' },
        { say: 'And the start line must be drawn with something that will not dissolve in the solvent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Match the spots',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Sample', 'Spots at', 'Matches the note?'], rows: [['note', '2 cm, 6 cm', ''], ['pen P', '2 cm, 6 cm', '**yes**'], ['pen Q', '2 cm, 4 cm, 6 cm', 'no, one spot **too many**'], ['pen R', '6 cm', 'no, one spot **missing**']] }],
      lines: [
        { say: 'Step one. The note has spots at two and six centimetres.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Pen P has exactly the same two spots, so pen P wrote the note. That is part a.', show: 't.1', focus: 't.1' },
        { say: 'Pen Q has an extra dye at four centimetres that the note does not have, and pen R is missing the dye at two centimetres. So neither of them matches.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Step 2: Count the dyes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pen Q: } 2,\\ 4,\\ 6\\ \\text{cm}', '3\\ \\text{spots} \\Rightarrow \\good{3\\ \\text{dyes}}'] }],
      lines: [
        { say: 'Step two. Pen Q gives spots at two, four and six centimetres.', show: 'm.0' },
        { say: 'Each spot is one dye, so three spots means three dyes. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Why pencil?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'pen', items: ['Ink **dissolves** in the solvent and would **run** up the paper', 'Its dyes would **mix** with the spots being tested', 'Pencil is graphite, which does **not** dissolve, so it stays put'] }],
      lines: [
        { say: 'Step three. A line drawn in ink is made of dyes, and they would dissolve in the solvent and run up the paper.', show: 'pen.0' },
        { say: 'Those extra spots would mix with the spots we are testing, and spoil the results.', show: 'pen.1' },
        { say: 'Pencil is made of graphite, which does not dissolve, so the line stays where it is. That is part c.', show: 'pen.2', focus: 'pen.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Pen P**. (b) **Three** dyes. (c) Pencil **does not dissolve** in the solvent, so it will not run up the paper and mix with the spots.' },
      ],
      lines: [
        { say: 'Does it make sense? A match must be exact, and only pen P has the same spots as the note, with nothing extra and nothing missing.', show: 'ans' },
        { say: 'So pen P wrote the note, pen Q has three dyes, and pencil is used because it does not dissolve.' },
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
            ['**Pen Q**', 'It has both spots, but also an **extra** dye'],
            ['**Pen R**', 'It shares only **one** of the two spots'],
            ['Pencil is easier to **rub out**', 'The reason is that pencil **does not dissolve**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Pen Q does contain both of the note\'s dyes, but it also has a third. The note would show that third spot too if pen Q had written it.', focus: 'traps.0' },
        { say: 'Pen R shares the spot at six centimetres, but it is missing the one at two.', focus: 'traps.1' },
        { say: 'And pencil is not chosen because it rubs out. It is chosen because it does not dissolve in the solvent.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these gives only **one** spot in paper chromatography?',
          choices: ['Black felt-tip ink', 'Green made of blue and yellow', 'A pure dye', 'A mixture of two dyes'],
          answer: 2,
          working: 'A pure dye is one substance, so it gives one spot. The others are mixtures of dyes.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these gives only one spot in paper chromatography? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A pure dye is one substance, so it gives one spot: choice C. The others are all mixtures of dyes.', show: 'q2.answer' },
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
          items: ['Each spot is **one dye**', 'Same ink gives **exactly** the same spots', 'Start line in **pencil**: it does not dissolve'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In paper chromatography, each spot is one dye.', show: 'sum.0' },
        { say: 'Two samples of the same ink give exactly the same spots, with nothing extra and nothing missing.', show: 'sum.1' },
        { say: 'And the start line is drawn in pencil, because pencil does not dissolve in the solvent. For more on chromatography, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
