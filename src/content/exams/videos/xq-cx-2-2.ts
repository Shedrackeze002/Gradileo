import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import ions from '@/content/chemmore/videos/cx-2-2.ts';

// Exam question for More Chemistry Topics lesson 2.2 (identifying ions): naming a compound from a
// lilac flame and a cream precipitate, the metal ion behind a blue precipitate, and naming a
// compound that also gives a white precipitate with barium chloride. Written by Gradileo in the
// style of a GCSE chemistry exam.
//
// The picture is the lesson's copper ions picking up hydroxide ions to make the blue precipitate
// (src/video/particles.ts).

const QUESTION = 'A student tests two solutions, X and Y. (a) X gives a lilac flame in a flame test. With dilute nitric acid and silver nitrate solution it gives a cream precipitate. Name compound X. (b) Y gives a blue precipitate with sodium hydroxide solution. Which metal ion is in Y? (c) Y also gives a white precipitate with dilute hydrochloric acid and barium chloride solution. Name compound Y.';

const video: Explainer = {
  id: 'xq-cx-2-2',
  lessonId: '',
  exam: {
    lesson: 'cx-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: A Lilac Flame and a Blue Precipitate. Identifying Ions',
  thumbnailTitle: 'Name the Compound',
  thumbnail: 'cu',
  summary:
    'A test-style question, solved one small step at a time: which compound gives a lilac flame and a cream precipitate with silver nitrate, which metal ion gives a blue precipitate with sodium hydroxide, and which compound also gives a white precipitate with barium chloride? X is potassium bromide, the blue precipitate shows copper(II) ions, and Y is copper(II) sulfate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Name the Compound', subtitle: 'Flames and precipitates' }],
      lines: [
        { say: 'In this video, we solve a test-style question about identifying ions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Potassium bromide; Cu²⁺; copper(II) sulfate' }],
      lines: [
        { say: 'Here is the question. A student tests two solutions, X and Y. Part a: X gives a lilac flame in a flame test. With dilute nitric acid and silver nitrate solution it gives a cream precipitate. Name compound X. Part b: Y gives a blue precipitate with sodium hydroxide solution. Which metal ion is in Y? Part c: Y also gives a white precipitate with dilute hydrochloric acid and barium chloride solution. Name compound Y.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use one test for the **metal ion** and one for the **other ion**, then put the names together' }],
      lines: [
        { say: 'Each compound has a metal ion and a non-metal ion. One test names each, and together they name the compound.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(ions, 'cu')],
      lines: [
        { say: 'Here is what we need. This is copper two sulfate solution and sodium hydroxide solution, just mixed, up close.', caption: 'Here is what we need. This is copper(II) sulfate solution and sodium hydroxide solution, just mixed, up close.', show: ['cu', 'cu.labels', 'cu.key'], play: 'cu.mix' },
        { say: 'Each copper ion picks up hydroxide ions one at a time. When it holds two, the unit is neutral and it sinks as blue copper two hydroxide, the precipitate. The sodium and sulfate ions stay dissolved.', caption: 'Each copper ion picks up hydroxide ions one at a time. When it holds two, the unit is neutral and it sinks as blue copper(II) hydroxide, the precipitate. The sodium and sulfate ions stay dissolved.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'plan',
          head: ['Test', 'Result', 'Ion'],
          rows: [
            ['flame test', '**lilac**', 'K⁺'],
            ['sodium hydroxide', '**blue** precipitate', 'Cu²⁺'],
            ['silver nitrate', 'white / **cream** / yellow', 'Cl⁻ / **Br⁻** / I⁻'],
            ['barium chloride', '**white** precipitate', 'SO₄²⁻'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. A lilac flame shows potassium ions.', show: ['plan', 'plan.0'], focus: 'plan.0' },
        { say: 'A blue precipitate with sodium hydroxide shows copper two ions.', caption: 'A blue precipitate with sodium hydroxide shows copper(II) ions.', show: 'plan.1', focus: 'plan.1' },
        { say: 'With silver nitrate, chloride gives white, bromide cream and iodide yellow.', show: 'plan.2', focus: 'plan.2' },
        { say: 'And a white precipitate with barium chloride shows sulfate ions.', show: 'plan.3', focus: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Compound X',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{lilac flame} \\Rightarrow \\ce{K+}', '\\text{cream precipitate} \\Rightarrow \\ce{Br-}', '\\good{\\text{potassium bromide}}'] }],
      lines: [
        { say: 'Step one. A lilac flame means X contains potassium ions.', show: 'm.0' },
        { say: 'A cream precipitate with silver nitrate means bromide ions.', show: 'm.1' },
        { say: 'So X is potassium bromide. That is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The blue precipitate',
      layout: 'center',
      main: [{ kind: 'math', id: 'b', size: 'md', lines: ['\\ce{Cu^2+ + 2OH- -> Cu(OH)2}', '\\text{blue} \\Rightarrow \\good{\\ce{Cu^2+}}'] }],
      lines: [
        { say: 'Step two. Just as we saw, copper two ions join two hydroxide ions to make a blue solid, copper two hydroxide.', caption: 'Step two. Just as we saw, copper(II) ions join two hydroxide ions to make a blue solid, copper(II) hydroxide.', show: 'b.0' },
        { say: 'So the metal ion in Y is the copper two ion. That is part b.', caption: 'So the metal ion in Y is the copper(II) ion, Cu²⁺. That is part b.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Step 3: Compound Y',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'md', lines: ['\\text{white with barium chloride} \\Rightarrow \\ce{SO4^2-}', '\\good{\\text{copper(II) sulfate}}'] }],
      lines: [
        { say: 'Step three. A white precipitate with acidified barium chloride means sulfate ions.', show: 'c.0' },
        { say: 'Copper two ions and sulfate ions make copper two sulfate. That is part c.', caption: 'Copper(II) ions and sulfate ions make copper(II) sulfate. That is part c.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Potassium bromide**. (b) The **copper(II) ion, Cu²⁺**. (c) **Copper(II) sulfate**.' },
      ],
      lines: [
        { say: 'Does it make sense? Copper two sulfate solution is blue, which fits a copper compound, and each compound has one metal ion and one other ion.', caption: 'Does it make sense? Copper(II) sulfate solution is blue, which fits a copper compound, and each compound has one metal ion and one other ion.', show: 'ans' },
        { say: 'So X is potassium bromide, Y contains copper two ions, and Y is copper two sulfate.', caption: 'So X is potassium bromide, Y contains copper(II) ions, and Y is copper(II) sulfate.' },
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
            ['Potassium **chloride**', 'Chloride gives a **white** precipitate'],
            ['**Sodium** in Y', 'Sodium came from the **test** solution'],
            ['Copper **chloride**', 'The chloride came from the **reagents**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'With silver nitrate, a white precipitate means chloride. Cream means bromide.', focus: 'traps.0' },
        { say: 'The sodium ions came from the sodium hydroxide we added, so they tell us nothing about Y.', focus: 'traps.1' },
        { say: 'And the chloride came from the hydrochloric acid and barium chloride we added. The white precipitate shows sulfate.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which ion gives a yellow precipitate with dilute nitric acid and silver nitrate solution?',
          choices: ['chloride', 'iodide', 'bromide', 'sulfate'],
          answer: 1,
          working: 'Chloride gives white, bromide cream and iodide yellow.',
        },
      ],
      lines: [
        { say: 'Your turn. Which ion gives a yellow precipitate with dilute nitric acid and silver nitrate solution? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Chloride gives white, bromide cream, and iodide yellow, so it is iodide: choice B.', show: 'q2.answer' },
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
          items: ['Flame colours and hydroxide precipitates name **metal ions**', 'Silver nitrate: **white**, **cream**, **yellow** for Cl⁻, Br⁻, I⁻', 'Barium chloride: **white** precipitate for sulfate'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Flame colours and the precipitates with sodium hydroxide name metal ions.', show: 'sum.0' },
        { say: 'With silver nitrate, chloride, bromide and iodide give white, cream and yellow precipitates.', show: 'sum.1' },
        { say: 'And barium chloride gives a white precipitate with sulfate ions. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
