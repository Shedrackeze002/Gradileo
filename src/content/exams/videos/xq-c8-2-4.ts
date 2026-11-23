import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import patterns from '@/content/chem8/videos/c8-2-4.ts';

// Exam question for Chemistry 8 lesson 2.4 (patterns in the periodic table): the halogens' boiling
// points rise down group 17, so astatine, below iodine, should be a dark solid at room temperature
// and less reactive than iodine. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's four alkali metals warmed together (src/video/particles.ts): their
// atoms let go in turn, a steady trend down the group.

const QUESTION = 'The table shows the halogens in group 17, from the top. Fluorine: pale yellow gas, boiling point −188 °C. Chlorine: green gas, −34 °C. Bromine: red-brown liquid, 59 °C. Iodine: grey-black solid, 184 °C. (a) Describe the trend in boiling point down the group. (b) Astatine is below iodine. Predict its state at room temperature and its colour. (c) Predict whether astatine is more or less reactive than iodine.';

const video: Explainer = {
  id: 'xq-c8-2-4',
  lessonId: '',
  exam: {
    lesson: 'c8-2-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Predicting Astatine. Patterns in the Periodic Table',
  thumbnailTitle: 'Predicting Astatine',
  thumbnail: 'mt',
  summary:
    'A test-style question, solved one small step at a time: the halogens\' boiling points go from −188 °C for fluorine to 184 °C for iodine. What is the trend, and what can we predict about astatine, the next halogen down? The boiling point rises down the group, so astatine should be a solid, darker still, and less reactive than iodine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Predicting Astatine', subtitle: 'Using a trend down a group' }],
      lines: [
        { say: 'In this video, we solve a test-style question about patterns in the periodic table. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        { kind: 'table', id: 'h', head: ['Halogen', 'Appearance', 'Boiling point'], rows: [['fluorine', 'pale yellow gas', '−188 °C'], ['chlorine', 'green gas', '−34 °C'], ['bromine', 'red-brown liquid', '59 °C'], ['iodine', 'grey-black solid', '184 °C']] },
        { kind: 'text', id: 'qs', md: '(a) Describe the trend in boiling point down the group. (b) Astatine is below iodine: predict its state and colour. (c) Is astatine more or less reactive than iodine?' },
      ],
      lines: [
        { say: 'Here is the question. The table shows the halogens in group seventeen, from the top. Fluorine is a pale yellow gas that boils at minus one hundred and eighty eight degrees. Chlorine is a green gas, boiling at minus thirty four. Bromine is a red-brown liquid, boiling at fifty nine. Iodine is a grey-black solid, boiling at one hundred and eighty four.', show: 'h' },
        { say: 'Part a: describe the trend in boiling point down the group. Part b: astatine is below iodine. Predict its state at room temperature and its colour. Part c: predict whether astatine is more or less reactive than iodine.', show: 'qs' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Spot the **trend** in the table, then **continue** it one step further down' }],
      lines: [
        { say: 'We are asked about an element that is not in the table. The trick is to find the pattern down the group and carry it on by one more step.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(patterns, 'mt')],
      lines: [
        { say: 'Here is what we need. These are four alkali metals, lithium to rubidium, warmed together so they are always at the same temperature.', show: ['mt', 'mt.labels', 'mt.thermo'] },
        { say: 'Watch. Rubidium\'s atoms break out of their rows first, then potassium\'s, then sodium\'s, and lithium holds on longest. The property changes in a steady trend down the group, so we can predict the next element along.', play: 'mt.warm' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read the boiling points **top to bottom**', 'Carry the pattern **one step** further', 'Halogens get **less** reactive down the group'] }],
      lines: [
        { say: 'Here is the plan. Read the boiling points from the top of the group to the bottom.', show: 'plan.0' },
        { say: 'Carry each pattern one step further, to astatine.', show: 'plan.1' },
        { say: 'And remember that the halogens get less reactive down the group.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The trend',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-188 \\to -34 \\to 59 \\to 184', '\\text{boiling point } \\good{\\text{rises}} \\text{ down the group}'] }],
      lines: [
        { say: 'Step one. From fluorine down to iodine, the boiling points go from minus one hundred and eighty eight, to minus thirty four, to fifty nine, to one hundred and eighty four.', show: 'm.0' },
        { say: 'Each is higher than the one above, so the boiling point rises down the group. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Astatine\'s state and colour',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Down the group', 'State at 20 °C', 'Colour'], rows: [['fluorine', 'gas', 'pale yellow'], ['chlorine', 'gas', 'green'], ['bromine', 'liquid', 'red-brown'], ['iodine', 'solid', 'grey-black'], ['**astatine**', '**solid**', '**black**, darker still']] }],
      lines: [
        { say: 'Step two. Going down, the halogens change from gases to a liquid to a solid, and their colours get darker.', show: ['t', 't.0', 't.1', 't.2', 't.3'] },
        { say: 'Astatine should boil even higher than iodine, so it should be a solid at room temperature, and darker still, nearly black. That is part b.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Step 3: Reactivity',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['\\text{F} > \\text{Cl} > \\text{Br} > \\text{I} > \\good{\\text{At}}', '\\text{astatine is } \\good{\\text{less reactive}} \\text{ than iodine}'] }],
      lines: [
        { say: 'Step three. The halogens get less reactive down the group. Fluorine is the most reactive, then chlorine, bromine and iodine.', show: 'r.0' },
        { say: 'Astatine is below iodine, so it should be less reactive than iodine. That is part c.', show: 'r.1', focus: 'r.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The boiling point **rises** down the group. (b) A **solid**, **black** or very dark. (c) **Less** reactive than iodine.' },
      ],
      lines: [
        { say: 'Does it make sense? Each prediction just carries on a pattern that holds all the way down the table, which is what makes the periodic table so useful.', show: 'ans' },
        { say: 'So the boiling point rises down the group, astatine should be a dark solid, and it should be less reactive than iodine.' },
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
            ['Boiling point **falls**', 'Read **−188** as bigger than **−34**'],
            ['Astatine is a **gas**', 'Did not continue the trend'],
            ['Astatine is **more** reactive', 'Used the **alkali metal** trend'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Minus one hundred and eighty eight is a lower temperature than minus thirty four, so the boiling point is rising, not falling.', focus: 'traps.0' },
        { say: 'Astatine is not a gas. The trend goes from gas to liquid to solid, and astatine comes after a solid.', focus: 'traps.1' },
        { say: 'And the alkali metals get more reactive down their group, but the halogens get less reactive. Each group has its own trend.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The noble gases boil at: helium $-269$ °C, neon $-246$ °C, argon $-186$ °C. Which is the most likely boiling point of krypton, the next one down?',
          choices: ['$-300$ °C', '$-270$ °C', '$-250$ °C', '$-153$ °C'],
          answer: 3,
          working: 'The boiling point rises down the group, so krypton boils above $-186$ °C. Only $-153$ °C fits.',
        },
      ],
      lines: [
        { say: 'Your turn. The noble gases boil at: helium, minus two hundred and sixty nine degrees; neon, minus two hundred and forty six; argon, minus one hundred and eighty six. Which is the most likely boiling point of krypton, the next one down? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The boiling point rises down the group, so krypton should boil above minus one hundred and eighty six. Only minus one hundred and fifty three fits: choice D.', show: 'q2.answer' },
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
          items: ['Properties change in a **steady trend** down a group', 'Halogens: boiling point **rises**, reactivity **falls**', 'Continue the trend to **predict** the next element'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Properties change in a steady trend down a group.', show: 'sum.0' },
        { say: 'For the halogens, the boiling point rises and the reactivity falls as you go down.', show: 'sum.1' },
        { say: 'And you can continue a trend to predict an element you have never seen. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
