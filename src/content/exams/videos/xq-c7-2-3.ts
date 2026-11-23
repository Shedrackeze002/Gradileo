import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import heat from '@/content/chem7/videos/c7-2-3.ts';

// Exam question for Chemistry 7 lesson 2.3 (temperature and heat): a mug of cocoa at 80 C in a room
// at 20 C. Heat flows from the cocoa to the room, the cocoa's particles slow down as it cools, and
// heat travels along the metal spoon by conduction. Written by Gradileo in the style of a Grade 7
// science unit test.
//
// The pictures are the lesson's particles (src/video/particles.ts): a warm hand holding ice, hot
// water beside cold water, and a metal bar heated at one end.

const QUESTION = 'A mug of hot cocoa at 80 °C is left on a table in a room at 20 °C, with a metal spoon standing in it. (a) Does heat flow from the cocoa to the room, or from the room to the cocoa? (b) What happens to the speed of the particles in the cocoa as it cools? (c) The handle of the spoon soon feels hot. Name the way heat travels along the spoon.';

const video: Explainer = {
  id: 'xq-c7-2-3',
  lessonId: '',
  exam: {
    lesson: 'c7-2-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: A Mug of Cocoa. Temperature and Heat',
  thumbnailTitle: 'A Mug of Cocoa',
  thumbnail: 'w',
  summary:
    'A test-style question, solved one small step at a time: a mug of cocoa at 80 °C cools in a room at 20 °C, with a metal spoon in it. Which way does heat flow, what happens to the cocoa\'s particles, and how does heat reach the spoon\'s handle? Heat flows from the cocoa to the room, its particles slow down, and heat travels along the spoon by conduction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Mug of Cocoa', subtitle: 'Which way heat flows, and how' }],
      lines: [
        { say: 'In this video, we solve a test-style question about temperature and heat. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A mug of hot cocoa at $80$ °C is left on a table in a room at $20$ °C, with a metal spoon standing in it. (a) Does heat flow from the cocoa to the room, or from the room to the cocoa? (b) What happens to the speed of the particles in the cocoa as it cools? (c) The handle of the spoon soon feels hot. Name the way heat travels along the spoon.', answer: 'Cocoa to room, they slow down, conduction' }],
      lines: [
        { say: 'Here is the question. A mug of hot cocoa at eighty degrees Celsius is left on a table in a room at twenty degrees, with a metal spoon standing in it. Part a: does heat flow from the cocoa to the room, or from the room to the cocoa? Part b: what happens to the speed of the particles in the cocoa as it cools? Part c: the handle of the spoon soon feels hot. Name the way heat travels along the spoon.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Which way does **heat** go, what do the **particles** do, and how does heat get up the **spoon**?' }],
      lines: [
        { say: 'All three parts are about one mug of cocoa cooling down. We need the direction of the heat, what the particles do, and the name of the way heat moves through the spoon.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(heat, 'i')],
      lines: [
        { say: 'Here is what we need. These are the particles of a warm hand, next to the particles of an ice cube. The colours show how fast they move: red is fast and blue is slow.', show: ['i', 'i.labels', 'i.thermo'] },
        { say: 'Watch. Heat flows out of the warm hand and into the ice, never the other way. The hand\'s particles slow down, and the ice\'s particles speed up. Heat always flows from the hotter thing to the cooler one.', play: 'i.go', show: 'i.flow' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Heat flows from **hotter** to **cooler**', 'Temperature = how **fast** the particles move', 'Heat through a solid: **conduction**'] }],
      lines: [
        { say: 'Here is the plan. Heat always flows from the hotter thing to the cooler one.', show: 'plan.0' },
        { say: 'Temperature tells us how fast the particles are moving.', show: 'plan.1' },
        { say: 'And heat passing through a solid, particle to particle, is called conduction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Which way',
      layout: 'center',
      main: [pick(heat, 'w')],
      lines: [
        { say: 'Step one. Here is something hot beside something cold, just like the hot cocoa beside the cooler air of the room.', show: ['w', 'w.labels', 'w.thermo'] },
        { say: 'The fast particles of the hot side knock into the slow ones and pass on energy. So heat flows from the cocoa, at eighty degrees, to the room, at twenty. That is part a.', play: 'w.go', show: 'w.flow' },
      ],
    },
    {
      chapter: 'Step 2: The particles',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'p', items: ['The cocoa **gives away** energy', 'Its particles **slow down**', 'Its temperature **falls**, towards 20 °C'] }],
      lines: [
        { say: 'Step two. As heat flows out, the cocoa gives away energy.', show: 'p.0' },
        { say: 'With less energy, its particles slow down. That is part b.', show: 'p.1', focus: 'p.1' },
        { say: 'Slower particles mean a lower temperature, so the cocoa cools, until it reaches the room\'s twenty degrees and the flow stops.', show: 'p.2' },
      ],
    },
    {
      chapter: 'Step 3: Up the spoon',
      layout: 'center',
      main: [pick(heat, 'r')],
      lines: [
        { say: 'Step three. Here are the particles of a metal bar, like the spoon, about to be heated at one end, where it sits in the cocoa.', show: ['r', 'r.labels'] },
        { say: 'The hot end\'s particles vibrate faster and knock into their neighbours, which knock into theirs. Heat passes along the metal, particle to particle, until the handle is hot. This is conduction. That is part c.', play: 'r.heat' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) From the **cocoa** to the **room** (b) They **slow down** (c) **Conduction**' },
      ],
      lines: [
        { say: 'Does it make sense? A hot drink left out always ends up at room temperature, and never gets hotter by itself, so the heat must be leaving it.', show: 'ans' },
        { say: 'So heat flows from the cocoa to the room, the cocoa\'s particles slow down, and heat travels along the spoon by conduction.' },
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
            ['**Cold** flows into the cocoa', 'Thought cold is something that moves'],
            ['The particles **shrink**', 'Mixed up slowing down with getting smaller'],
            ['**Convection**', 'Convection needs a liquid or gas to **move**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Cold does not flow. Only heat flows, and always from hot to cold. Something cools because heat leaves it.', focus: 'traps.0' },
        { say: 'Particles never change size. When something cools, its particles slow down.', focus: 'traps.1' },
        { say: 'And convection is heat carried by a moving liquid or gas. The spoon is a solid, and it does not flow, so heat passes along it by conduction.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which material is best for the handle of a saucepan, so that it stays cool to hold?',
          choices: ['Copper', 'Aluminium', 'Wood', 'Iron'],
          answer: 2,
          working: 'Wood is an insulator, so heat passes through it slowly. The other three are metals, which conduct heat well.',
        },
      ],
      lines: [
        { say: 'Your turn. Which material is best for the handle of a saucepan, so that it stays cool to hold? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Wood is an insulator, so heat passes through it slowly: choice C. Copper, aluminium and iron are all metals, and metals conduct heat well.', show: 'q2.answer' },
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
          items: ['Heat flows from **hotter** to **cooler**, never the other way', 'Cooling = particles **slowing down**', 'Through a solid, heat moves by **conduction**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Heat always flows from the hotter thing to the cooler one.', show: 'sum.0' },
        { say: 'When something cools, its particles slow down.', show: 'sum.1' },
        { say: 'And heat passes through a solid, particle to particle, by conduction, best of all in metals. For more on temperature and heat, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
