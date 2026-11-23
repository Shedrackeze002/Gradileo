import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import changes from '@/content/chem7/videos/c7-2-2.ts';

// Exam question for Chemistry 7 lesson 2.2 (changes of state): bromine melts at -7 C and boils at
// 59 C, so it is a liquid at 20 C and a solid at -10 C, and bromine gas turning to liquid is
// condensation, which gives out heat. Written by Gradileo in the style of a Grade 7 science unit
// test.
//
// The pictures are the lesson's particles (src/video/particles.ts): one box heated and cooled round
// the whole cycle, a box held between its melting and boiling points, and water vapour condensing
// on a cold can.

const QUESTION = 'Bromine melts at −7 °C and boils at 59 °C. (a) What state is bromine in at 20 °C? (b) What state is it in at −10 °C? (c) Bromine gas cools and turns into a liquid. What is this change of state called, and does the bromine take in heat or give out heat?';

const video: Explainer = {
  id: 'xq-c7-2-2',
  lessonId: '',
  exam: {
    lesson: 'c7-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The States of Bromine. Changes of State',
  thumbnailTitle: 'The States of Bromine',
  thumbnail: 'p',
  summary:
    'A test-style question, solved one small step at a time: bromine melts at −7 °C and boils at 59 °C. What state is it in at 20 °C and at −10 °C, and what is it called when bromine gas turns to liquid? It is a liquid at 20 °C and a solid at −10 °C, and the change is condensation, which gives out heat.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The States of Bromine', subtitle: 'Melting points, boiling points and condensing' }],
      lines: [
        { say: 'In this video, we solve a test-style question about changes of state. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Bromine melts at $-7$ °C and boils at $59$ °C. (a) What state is bromine in at $20$ °C? (b) What state is it in at $-10$ °C? (c) Bromine gas cools and turns into a liquid. What is this change called, and does the bromine take in heat or give out heat?', answer: 'Liquid, solid, and condensation, which gives out heat' }],
      lines: [
        { say: 'Here is the question. Bromine melts at minus seven degrees Celsius and boils at fifty nine degrees. Part a: what state is bromine in at twenty degrees? Part b: what state is it in at minus ten degrees? Part c: bromine gas cools and turns into a liquid. What is this change called, and does the bromine take in heat or give out heat?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Place each temperature against the **melting point** and the **boiling point**, then name a change of state' }],
      lines: [
        { say: 'The first two parts ask where each temperature sits compared with the melting point and the boiling point. The last part asks us to name a change of state and say which way the heat goes.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ ...(pick(changes, 'p') as ParticlesEl), height: 480 }],
      lines: [
        { say: 'Here is what we need. This is a solid, with a thermometer beside it marked where it melts and where it boils.', show: ['p', 'p.thermo'] },
        { say: 'Heat it past its melting point, and the particles break out of their rows. It melts into a liquid.', play: 'p.melt' },
        { say: 'Heat it past its boiling point, and the particles fly apart. It is a gas.', play: 'p.boil' },
        { say: 'Now cool it. The particles give out heat, slow down and stick together again. The gas turns back into a liquid.', play: 'p.condense' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Below the melting point: **solid**', 'Between the two: **liquid**', 'Above the boiling point: **gas**'] }],
      lines: [
        { say: 'Here is the rule we will use. Below the melting point, a substance is a solid.', show: 'plan.0' },
        { say: 'Between the melting point and the boiling point, it is a liquid.', show: 'plan.1' },
        { say: 'Above the boiling point, it is a gas.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: At 20 °C',
      layout: 'split',
      leftWidth: 560,
      left: [{ ...(pick(changes, 'm') as ParticlesEl), height: 440 }],
      right: [{ kind: 'math', id: 'm1', size: 'md', lines: ['-7 < 20 < 59', '\\text{between, so } \\good{\\text{liquid}}'] }],
      lines: [
        { say: 'Step one. Twenty degrees is above the melting point of minus seven, and below the boiling point of fifty nine.', show: ['m', 'm.thermo', 'm1.0'] },
        { say: 'So it sits between the two, and bromine is a liquid. That is part a. In fact, bromine is one of only two elements that are liquid at room temperature.', show: 'm1.1', play: 'm.liquid', focus: 'm1.1' },
      ],
    },
    {
      chapter: 'Step 2: At −10 °C',
      layout: 'center',
      main: [{ kind: 'math', id: 'm2', size: 'lg', lines: ['-10 < -7', '\\text{below the melting point, so } \\good{\\text{solid}}'] }],
      lines: [
        { say: 'Step two. Take care with negative numbers. Minus ten is colder than minus seven, because it is further below zero.', show: 'm2.0' },
        { say: 'So minus ten is below the melting point, and bromine is a solid. That is part b.', show: 'm2.1', focus: 'm2.1' },
      ],
    },
    {
      chapter: 'Step 3: Gas to liquid',
      layout: 'center',
      main: [pick(changes, 'v')],
      lines: [
        { say: 'Step three. Here are gas particles beside a cold wall, coloured by how fast they move.', show: ['v', 'v.labels'] },
        { say: 'When a particle hits the cold wall, it gives out heat and slows down. Slow particles stick together, and drops of liquid form. A gas turning into a liquid is called condensation, and it gives out heat. That is part c.', play: 'v.cool', focus: 'v.b' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **liquid** (b) **solid** (c) **condensation**, and the bromine **gives out** heat' },
      ],
      lines: [
        { say: 'Does it make sense? Condensation happens on cooling, and cooling means heat leaves the substance, so giving out heat fits.', show: 'ans' },
        { say: 'So bromine is a liquid at twenty degrees and a solid at minus ten, and gas turning to liquid is condensation, which gives out heat.' },
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
            ['Liquid at $-10$ °C', 'Thought $-10$ is warmer than $-7$'],
            ['Evaporation', 'Named the change the **wrong way** round'],
            ['Takes in heat', 'Mixed up **cooling** with heating'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Ten is bigger than seven, but minus ten is colder than minus seven. So at minus ten, bromine is below its melting point, and solid.', focus: 'traps.0' },
        { say: 'Evaporation is liquid to gas. Gas to liquid is the reverse, condensation.', focus: 'traps.1' },
        { say: 'And the bromine is cooling, so heat leaves it. Melting and evaporating take in heat, while freezing and condensation give it out.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Gallium melts at $30$ °C and boils at $2400$ °C. What state is gallium in at $50$ °C?',
          choices: ['Solid', 'Liquid', 'Gas', 'Solid and gas'],
          answer: 1,
          working: '$50$ °C is between $30$ °C and $2400$ °C, so gallium is a liquid.',
        },
      ],
      lines: [
        { say: 'Your turn. Gallium melts at thirty degrees and boils at two thousand four hundred degrees. What state is gallium in at fifty degrees? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Fifty degrees is between thirty and two thousand four hundred, so gallium is a liquid: choice B. It melts at just above room temperature, so it would melt in your hand.', show: 'q2.answer' },
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
          items: ['Below melting point **solid**, between **liquid**, above boiling point **gas**', 'With negatives, **further below zero** is colder', 'Condensing and freezing **give out** heat'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Below its melting point a substance is solid, between its melting and boiling points it is liquid, and above its boiling point it is gas.', show: 'sum.0' },
        { say: 'With negative temperatures, the number further below zero is the colder one.', show: 'sum.1' },
        { say: 'And condensing and freezing give out heat, while melting and evaporating take it in. For more on changes of state, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
