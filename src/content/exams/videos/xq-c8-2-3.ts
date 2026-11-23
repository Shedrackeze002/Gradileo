import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import families from '@/content/chem8/videos/c8-2-3.ts';

// Exam question for Chemistry 8 lesson 2.3 (families of elements): sodium and water give hydrogen
// and an alkaline solution, rubidium (below potassium) reacts even more violently, and argon fills
// light bulbs because noble gases are unreactive. Written by Gradileo in the style of a Grade 8
// science unit test.
//
// The picture is the lesson's lithium, sodium and potassium in water, up close
// (src/video/particles.ts).

const QUESTION = 'Answer these questions about families of elements. (a) A small piece of sodium is dropped into water. It fizzes and moves about. Name the gas given off, and say whether the solution left is acidic or alkaline. (b) Rubidium is just below potassium in group 1. Predict how rubidium reacts with water compared with potassium. (c) Argon is used inside some light bulbs, around the hot wire. Which group is argon in, and why is it a good choice?';

const video: Explainer = {
  id: 'xq-c8-2-3',
  lessonId: '',
  exam: {
    lesson: 'c8-2-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sodium, Rubidium and Argon. Families of Elements',
  thumbnailTitle: 'Sodium, Rubidium and Argon',
  thumbnail: 'g1',
  summary:
    'A test-style question, solved one small step at a time: what gas does sodium give off in water, how would rubidium react, and why is argon used in light bulbs? Sodium gives hydrogen and leaves an alkaline solution, rubidium reacts even more violently because the alkali metals get more reactive down the group, and argon is a noble gas, so it does not react with the hot wire.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sodium, Rubidium and Argon', subtitle: 'Alkali metals and noble gases' }],
      lines: [
        { say: 'In this video, we solve a test-style question about families of elements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Hydrogen, alkaline; more violently; group 18, unreactive' }],
      lines: [
        { say: 'Here is the question. Part a: a small piece of sodium is dropped into water. It fizzes and moves about. Name the gas given off, and say whether the solution left is acidic or alkaline. Part b: rubidium is just below potassium in group one. Predict how rubidium reacts with water compared with potassium. Part c: argon is used inside some light bulbs, around the hot wire. Which group is argon in, and why is it a good choice?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use what each **family** has in common, and the **trend** down the group' }],
      lines: [
        { say: 'Elements in a family share their properties, and those properties change steadily down the group. We use both ideas to answer about elements we may never have seen.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(families, 'g1')],
      lines: [
        { say: 'Here is what we need. These are lithium, sodium and potassium, the top three alkali metals in group one, each a small piece in the same amount of water.', show: ['g1', 'g1.labels', 'g1.thermo'] },
        { say: 'Watch. Where water meets the metal, hydrogen is set loose and bubbles away, and the metal dissolves. Lithium reacts slowly, sodium faster, and potassium fastest of all, with the most heat.', play: 'g1.drop', focus: 'g1.k' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Alkali metal + water → **hydrogen** + an **alkaline** solution', 'Alkali metals get **more reactive** down the group', 'Group 18, the **noble gases**, are very **unreactive**'] }],
      lines: [
        { say: 'Here is the plan. An alkali metal and water make hydrogen and an alkaline solution.', show: 'plan.0' },
        { say: 'The alkali metals get more reactive as you go down the group.', show: 'plan.1' },
        { say: 'And group eighteen, the noble gases, hardly react at all.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sodium and water',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{sodium} + \\text{water} \\to \\text{sodium hydroxide} + \\good{\\text{hydrogen}}', '\\text{sodium hydroxide solution is } \\good{\\text{alkaline}}'] }],
      lines: [
        { say: 'Step one. Sodium reacts with water to make sodium hydroxide and hydrogen. The fizzing is the hydrogen gas.', show: 'm.0' },
        { say: 'Sodium hydroxide dissolves to make an alkaline solution. That is why group one is called the alkali metals. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Rubidium',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Group 1 metal', 'In water'], rows: [['lithium', 'fizzes steadily'], ['sodium', 'fizzes fast, melts into a ball'], ['potassium', 'fizzes very fast, catches fire'], ['rubidium', '**even more violent**, can explode']] }],
      lines: [
        { say: 'Step two. Going down group one, each metal reacts more violently than the one above it.', show: ['t', 't.0', 't.1', 't.2'] },
        { say: 'Rubidium is below potassium, so it should react even more violently than potassium, and it does: it can explode. That is part b.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Step 3: Argon',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'ar', items: ['Argon is in **group 18**, the **noble gases**', 'Noble gases are very **unreactive**', 'So the hot wire does **not react** with the argon, and lasts longer'] }],
      lines: [
        { say: 'Step three. Argon is in group eighteen, with helium and neon. These are the noble gases.', show: 'ar.0' },
        { say: 'The noble gases are very unreactive.', show: 'ar.1' },
        { say: 'So the hot wire in the bulb does not react with the argon, as it would with the oxygen in air, and the bulb lasts longer. That is part c.', show: 'ar.2', focus: 'ar.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Hydrogen**; the solution is **alkaline**. (b) **More violently** than potassium. (c) **Group 18**, the noble gases: argon is **unreactive**, so the hot wire does not react.' },
      ],
      lines: [
        { say: 'Does it make sense? Each answer comes from a pattern in the family, which is exactly what the periodic table is for.', show: 'ans' },
        { say: 'So sodium gives hydrogen and an alkaline solution, rubidium is even more violent than potassium, and argon is an unreactive noble gas.' },
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
            ['**Oxygen** is given off', 'The gas is **hydrogen**, from the water'],
            ['Rubidium is **less** reactive', 'Mixed it up with the **halogens**'],
            ['Argon **conducts** electricity', 'Argon is chosen because it is **unreactive**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The gas is hydrogen, not oxygen. A lit splint gives a squeaky pop in it.', focus: 'traps.0' },
        { say: 'The halogens in group seventeen get less reactive down the group, but the alkali metals get more reactive. Rubidium is more reactive than potassium.', focus: 'traps.1' },
        { say: 'And argon is not there to carry the current. The wire does that. Argon is there because it does not react.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The halogens get less reactive down group 17. Which halogen is the most reactive?',
          choices: ['Iodine', 'Bromine', 'Fluorine', 'Chlorine'],
          answer: 2,
          working: 'Fluorine is at the top of group 17, so it is the most reactive halogen.',
        },
      ],
      lines: [
        { say: 'Your turn. The halogens get less reactive down group seventeen. Which halogen is the most reactive? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Fluorine is at the top of group seventeen, so it is the most reactive: choice C.', show: 'q2.answer' },
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
          items: ['Group 1 + water → **hydrogen** + **alkali**', 'Group 1: **more** reactive down. Group 17: **less** reactive down', 'Group 18, noble gases: **unreactive**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A group one metal and water make hydrogen and an alkaline solution.', show: 'sum.0' },
        { say: 'Group one gets more reactive down the group, and group seventeen gets less reactive.', show: 'sum.1' },
        { say: 'And the noble gases of group eighteen are very unreactive. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
