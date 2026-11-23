import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import matter from '@/content/chem7/videos/c7-1-2.ts';

// Exam question for Chemistry 7 lesson 1.2 (what is matter?): sort air, a rock, sunlight, water
// vapour, sound and the helium in a balloon into matter and not matter, using the definition.
// Written by Gradileo in the style of a Grade 7 science unit test. Matter: air, the rock, water
// vapour, helium (each has mass and takes up space). Not matter: sunlight, sound (energy).
//
// The picture is the lesson's two boxes of gas, air and helium (src/video/particles.ts): their
// particles have mass, and a piston cannot squash them away to nothing.

const QUESTION = 'Matter is anything that has mass and takes up space. Which of these are matter: air, a rock, sunlight, water vapour, sound, the helium in a party balloon? Explain your choices.';

const video: Explainer = {
  id: 'xq-c7-1-2',
  lessonId: '',
  exam: {
    lesson: 'c7-1-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Matter or Not? What Is Matter?',
  thumbnailTitle: 'Matter or Not?',
  thumbnail: 'g',
  summary:
    'A test-style question, solved one small step at a time: which of air, a rock, sunlight, water vapour, sound and helium are matter? We test each against the definition, mass and space, and find that the gases are matter even though we cannot see them, while sunlight and sound are energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Matter or Not?', subtitle: 'Testing six things against one definition' }],
      lines: [
        { say: 'In this video, we solve a test-style question about what counts as matter. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Matter: air, the rock, water vapour, helium. Not matter: sunlight, sound.' }],
      lines: [
        { say: 'Here is the question. Matter is anything that has mass and takes up space. Which of these are matter: air, a rock, sunlight, water vapour, sound, the helium in a party balloon? Explain your choices.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'For each one: does it have **mass**, and does it take up **space**?' }],
      lines: [
        { say: 'The question gives us the test. For each of the six, we ask two things: does it have mass, and does it take up space? Only a yes to both makes it matter.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(matter, 'g')],
      lines: [
        { say: 'Here is what we need. Two boxes of gas, air on the left and helium on the right. The particles are far apart and fly in every direction.', show: ['g', 'g.labels'] },
        { say: 'Each particle has a little mass, so a gas has mass too. Now watch a piston push into each box. The particles crowd together and push back: they take up space.', play: 'g.push' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Test the **solid** and the **gases**', 'Test **sunlight** and **sound**', 'Sort them, with a **reason** for each'] }],
      lines: [
        { say: 'Here is the plan. Test the rock and the three gases first.', show: 'plan.0' },
        { say: 'Then test sunlight and sound.', show: 'plan.1' },
        { say: 'Then sort them into two groups, with a reason.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The rock and the gases',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['', 'Mass?', 'Space?'], rows: [['a rock', 'yes', 'yes'], ['air', 'yes', 'yes'], ['water vapour', 'yes', 'yes'], ['helium', 'yes', 'yes']] }],
      lines: [
        { say: 'Step one. A rock clearly has mass, and it takes up space. It is matter.', show: 't.0', focus: 't.0' },
        { say: 'Air, water vapour and helium are gases. We cannot see most of them, but they are made of particles, so they have mass, and they fill their container, so they take up space. They are matter too.', show: ['t.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'Helium is so light it lifts a balloon, but a full balloon still has more mass than an empty one.' },
      ],
    },
    {
      chapter: 'Step 2: Sunlight and sound',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['', 'Mass?', 'Space?'], rows: [['sunlight', 'no', 'no'], ['sound', 'no', 'no']] }, { kind: 'callout', id: 'e', tone: 'definition', title: 'Energy', md: 'Light, sound, heat and electricity are forms of **energy**, not matter.' }],
      lines: [
        { say: 'Step two. Sunlight has no mass, and it does not fill up a room the way air does. It is a form of energy.', show: 't.0', focus: 't.0' },
        { say: 'Sound is also energy, a vibration passing through matter. The sound itself has no mass and takes up no space.', show: 't.1', focus: 't.1' },
        { say: 'Light, sound, heat and electricity are all forms of energy, not matter.', show: 'e' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**Matter**: air, the rock, water vapour and helium, because each has **mass** and takes up **space**. **Not matter**: sunlight and sound, which are forms of **energy**.' },
      ],
      lines: [
        { say: 'Does it make sense? Every solid, liquid and gas is matter, and every form of energy is not. Our sorting follows that pattern exactly.', show: 'ans' },
        { say: 'So air, the rock, water vapour and helium are matter, because each has mass and takes up space. Sunlight and sound are not matter: they are forms of energy.' },
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
            ['Air is **not** matter', 'You cannot **see** it, but it has **mass**'],
            ['Helium is **not** matter', 'It is **light**, but not weightless'],
            ['Sunlight **is** matter', 'You can see it, but it is **energy**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Air is not matter because it is invisible: but being seen is not the test. Air has mass and takes up space.', focus: 'traps.0' },
        { say: 'Helium is not matter because it floats: helium is lighter than air, but it still has mass.', focus: 'traps.1' },
        { say: 'And sunlight is matter because we can see it: we see light, but it has no mass. It is energy.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a **quantitative** property of aluminium?',
          choices: ['It is shiny', 'It melts at $660\\ ^\\circ\\text{C}$', 'It is grey', 'It can be bent into shape'],
          answer: 1,
          working: 'A quantitative property is measured as a number: a melting point of 660 °C.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a quantitative property of aluminium? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A quantitative property is measured as a number. Melting at six hundred and sixty degrees Celsius is the only number here: choice B. The others are described in words, so they are qualitative.', show: 'q2.answer', caption: 'A quantitative property is measured as a number. Melting at 660 °C is the only number here: choice B. The others are described in words, so they are qualitative.' },
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
          items: ['Matter has **mass** and takes up **space**', 'Gases are matter, even **invisible** ones', 'Light, sound and heat are **energy**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Matter is anything with mass that takes up space.', show: 'sum.0' },
        { say: 'Every gas is matter, even the ones we cannot see.', show: 'sum.1' },
        { say: 'And light, sound, heat and electricity are forms of energy, not matter. For more on matter, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
