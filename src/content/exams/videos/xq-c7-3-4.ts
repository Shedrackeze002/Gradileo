import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import rate from '@/content/chem7/videos/c7-3-4.ts';

// Exam question for Chemistry 7 lesson 3.4 (how fast things dissolve): a fair test of whether
// stirring makes a sugar cube dissolve faster. Stirring is the independent variable, the time is the
// dependent variable, the sugar, water and temperature stay the same, and the stirred cube dissolves
// faster because fresh water keeps reaching it. Written by Gradileo in the style of a Grade 7
// science unit test.
//
// The pictures are the lesson's sugar lumps dropped into cold and hot water, and into still and
// stirred water (src/video/particles.ts).

const QUESTION = 'Ama wants to find out whether stirring makes sugar dissolve faster. She drops a 5 g sugar cube into 100 mL of water at 25 °C and times how long it takes to disappear. She does this once without stirring (180 s) and once while stirring (40 s). (a) What are the independent variable and the dependent variable? (b) Name two variables Ama must keep the same. (c) What can she conclude? Explain it using particles.';

const video: Explainer = {
  id: 'xq-c7-3-4',
  lessonId: '',
  exam: {
    lesson: 'c7-3-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Stirring Sugar. How Fast Things Dissolve',
  thumbnailTitle: 'Stirring Sugar',
  thumbnail: 's',
  summary:
    'A test-style question, solved one small step at a time: Ama times a sugar cube dissolving in still water (180 s) and in stirred water (40 s). What are her independent and dependent variables, what must stay the same, and what can she conclude? Stirring is what she changes, the time is what she measures, the sugar, water and temperature stay the same, and stirring makes sugar dissolve faster.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Stirring Sugar', subtitle: 'A fair test of dissolving' }],
      lines: [
        { say: 'In this video, we solve a test-style question about how fast things dissolve, and fair tests. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Ama wants to find out whether stirring makes sugar dissolve faster. She drops a $5$ g sugar cube into $100$ mL of water at $25$ °C and times how long it takes to disappear: once without stirring, taking $180$ s, and once while stirring, taking $40$ s. (a) What are the independent and dependent variables? (b) Name two variables she must keep the same. (c) What can she conclude? Explain it using particles.', answer: 'Stirring and time; sugar and water; stirring makes it dissolve faster' }],
      lines: [
        { say: 'Here is the question. Ama wants to find out whether stirring makes sugar dissolve faster. She drops a five gram sugar cube into one hundred millilitres of water at twenty five degrees, and times how long it takes to disappear. She does this once without stirring, which takes one hundred and eighty seconds, and once while stirring, which takes forty seconds. Part a: what are the independent variable and the dependent variable? Part b: name two variables Ama must keep the same. Part c: what can she conclude? Explain it using particles.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'What does Ama **change**, what does she **measure**, what must stay the **same**, and what do the results **show**?' }],
      lines: [
        { say: 'This is a question about planning a fair test. We need what Ama changes, what she measures, and what she keeps the same, and then what her results show and why.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(rate, 'h')],
      lines: [
        { say: 'Here is what we need. These are two identical lumps of sugar, one in cold water and one in hot water. Only one thing is different between the boxes: the temperature.', show: ['h', 'h.labels'] },
        { say: 'Watch the counts. The hot water\'s particles move faster and pull the sugar apart sooner. Because only the temperature was different, we know the temperature caused the difference. That is what makes a test fair.', play: 'h.go', show: 'h.count', focus: 'h.b' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Independent** variable: what you **change**', '**Dependent** variable: what you **measure**', '**Controlled** variables: everything kept the **same**'] }],
      lines: [
        { say: 'Here is the plan. The independent variable is the one thing you change on purpose.', show: 'plan.0' },
        { say: 'The dependent variable is what you measure, to see the effect.', show: 'plan.1' },
        { say: 'And the controlled variables are everything else, kept the same so the test is fair.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Change and measure',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Variable', 'In Ama\'s test'], rows: [['Independent (changed)', 'stirring or **not** stirring'], ['Dependent (measured)', 'the **time** to dissolve']] }],
      lines: [
        { say: 'Step one. Ama changes whether the water is stirred, so stirring is the independent variable.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'She measures the time the cube takes to disappear, so the time is the dependent variable. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Keep the same',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'same', items: ['The **mass** of sugar, a 5 g cube', 'The **volume** of water, 100 mL', 'The **temperature** of the water, 25 °C'] }],
      lines: [
        { say: 'Step two. Everything else must stay the same. The mass of sugar, a five gram cube each time.', show: 'same.0' },
        { say: 'The volume of water, one hundred millilitres.', show: 'same.1' },
        { say: 'And the temperature, twenty five degrees, because we just saw that temperature changes how fast sugar dissolves. Any two of these answer part b.', show: 'same.2' },
      ],
    },
    {
      chapter: 'Step 3: The conclusion',
      layout: 'center',
      main: [pick(rate, 's')],
      lines: [
        { say: 'Step three. Forty seconds is much less than one hundred and eighty, so stirring makes the sugar dissolve faster. Here is why, with two identical lumps, one stirred.', show: ['s', 's.labels'] },
        { say: 'Stirring sweeps fresh water particles past the lump and carries the dissolved sugar away, so the water keeps pulling off more sugar particles. The stirred lump dissolves much faster. That is part c.', play: 's.go', show: 's.count', focus: 's.b' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Independent: **stirring**. Dependent: the **time** to dissolve. (b) Any two of: mass of sugar, volume of water, temperature. (c) Stirring makes sugar dissolve **faster**, because it brings **fresh water particles** to the sugar.' },
      ],
      lines: [
        { say: 'Does it make sense? People stir sugar into tea for exactly this reason.', show: 'ans' },
        { say: 'So stirring is changed, time is measured, the sugar, water and temperature stay the same, and stirring makes sugar dissolve faster.' },
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
            ['Independent: the **time**', 'Swapped what is changed and what is measured'],
            ['Keep the **time** the same', 'The time is the **result**, it cannot be fixed'],
            ['More sugar can dissolve', 'Stirring changes the **speed**, not the total'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Ama does not choose the time. She chooses whether to stir, and the time is what happens, so the time is the dependent variable.', focus: 'traps.0' },
        { say: 'For the same reason, the time cannot be one of the things kept the same. It is the result she is measuring.', focus: 'traps.1' },
        { say: 'And stirring makes sugar dissolve faster, but it does not let more sugar dissolve in total. That is set by the solubility.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which change would **not** make a sugar cube dissolve faster?',
          choices: ['Stirring the water', 'Using hot water', 'Crushing the cube', 'Using colder water'],
          answer: 3,
          working: 'Colder water has slower particles, so the sugar dissolves more slowly. The other three all speed it up.',
        },
      ],
      lines: [
        { say: 'Your turn. Which change would not make a sugar cube dissolve faster? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Colder water has slower particles, so the sugar dissolves more slowly: choice D. Stirring, hot water and crushing the cube all make it dissolve faster.', show: 'q2.answer' },
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
          items: ['Independent: **change**. Dependent: **measure**', 'Keep everything else the **same**', 'Stirring, heating and smaller pieces dissolve a solid **faster**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The independent variable is what you change, and the dependent variable is what you measure.', show: 'sum.0' },
        { say: 'In a fair test, everything else stays the same.', show: 'sum.1' },
        { say: 'And stirring, heating the water and using smaller pieces all make a solid dissolve faster. For more on dissolving, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
