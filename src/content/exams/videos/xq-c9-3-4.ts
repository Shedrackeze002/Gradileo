import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import rates from '@/content/chem9/videos/c9-3-4.ts';

// Exam question for Chemistry 9 lesson 3.4 (rates of reaction): the mean rate of marble chips
// fizzing in acid, and collision theory for warmer and more concentrated acid. Written by Gradileo
// in the style of a Grade 9 science unit test.
//
// The pictures are the lesson's cold and hot boxes of reacting gases, and its low and high
// concentration boxes, with new molecules counted (src/video/particles.ts).

const QUESTION = 'Marble chips react with hydrochloric acid, giving off carbon dioxide gas. (a) In the first 30 seconds, 90 cm³ of gas is collected. Calculate the mean rate of reaction in cm³ per second. (b) The experiment is repeated with warmer acid. Use collision theory to explain why the reaction is faster. (c) The experiment is repeated with more concentrated acid, at the first temperature. Use collision theory to explain why this is also faster.';

const video: Explainer = {
  id: 'xq-c9-3-4',
  lessonId: '',
  exam: {
    lesson: 'c9-3-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Marble Chips, Warm Acid and Strong Acid. Rates of Reaction',
  thumbnailTitle: 'Speeding Up a Reaction',
  thumbnail: 'tp',
  summary:
    'A test-style question, solved one small step at a time: what is the mean rate when 90 cm³ of gas comes off in 30 s, and why do warmer and more concentrated acid speed the reaction up? The mean rate is 3 cm³/s. Warmer particles move faster, so they collide more often and more collisions have enough energy, and a higher concentration packs more particles into the same space, so they collide more often.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Speeding Up a Reaction', subtitle: 'Rates and collision theory' }],
      lines: [
        { say: 'In this video, we solve a test-style question about rates of reaction. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '3 cm³/s; faster, harder collisions; more crowded, more collisions' }],
      lines: [
        { say: 'Here is the question. Marble chips react with hydrochloric acid, giving off carbon dioxide gas. Part a: in the first thirty seconds, ninety cubic centimetres of gas is collected. Calculate the mean rate of reaction in cubic centimetres per second. Part b: the experiment is repeated with warmer acid. Use collision theory to explain why the reaction is faster. Part c: the experiment is repeated with more concentrated acid, at the first temperature. Use collision theory to explain why this is also faster.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find **how fast** gas comes off, then explain each change by **collisions**' }],
      lines: [
        { say: 'First we turn the gas and time into a rate. Then we explain each change by what it does to the collisions between particles.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(rates, 'tp')],
      lines: [
        { say: 'Here is what we need. The same two gases react in two boxes, one cold and one hot. When a blue and a yellow particle collide hard enough, they join into a new molecule. Watch the counts.', show: ['tp', 'tp.labels', 'tp.tally', 'tp.thermo'], play: 'tp.go' },
        { say: 'In the hot box, the particles move faster, collide more often, and hit harder, so new molecules form much faster.', focus: 'tp.b' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Mean rate = **amount** of product ÷ **time**', 'Particles react only when they **collide** with **enough energy**', 'More **successful collisions** each second: a faster rate'] }],
      lines: [
        { say: 'Here is the plan. The mean rate is the amount of product made, divided by the time taken.', show: 'plan.0' },
        { say: 'Collision theory says particles react only when they collide with enough energy.', show: 'plan.1' },
        { say: 'So anything that makes successful collisions more frequent makes the reaction faster.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mean rate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean rate} = \\dfrac{90 \\text{ cm}^3}{30 \\text{ s}}', '= \\good{3 \\text{ cm}^3/\\text{s}}'] }],
      lines: [
        { say: 'Step one. Ninety cubic centimetres of gas came off in thirty seconds.', show: 'm.0' },
        { say: 'Ninety divided by thirty is three, so the mean rate is three cubic centimetres per second. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Warmer acid',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Warmer particles move **faster**', 'They collide **more often**', 'And **more** collisions have **enough energy** to react'] }],
      lines: [
        { say: 'Step two. In warmer acid, the acid particles have more energy and move faster, just like the hot box.', show: 's.0' },
        { say: 'Moving faster, they collide with the marble more often.', show: 's.1' },
        { say: 'And a bigger share of those collisions have enough energy to react. Both mean more successful collisions each second, so the reaction is faster. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Stronger acid',
      layout: 'center',
      main: [pick(rates, 'cc')],
      lines: [
        { say: 'Step three. Now both boxes are at the same temperature, but the one on the right has more particles in the same space: a higher concentration.', show: ['cc', 'cc.labels', 'cc.tally'], play: 'cc.go' },
        { say: 'More acid particles in the same volume collide with the marble more often, so there are more successful collisions each second, and the reaction is faster. The energy of each collision is the same as before. That is part c.', focus: 'cc.b' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **3 cm³/s**. (b) Particles move **faster**, so they collide **more often** and **more collisions have enough energy**. (c) **More particles** in the same volume, so they collide **more often**.' },
      ],
      lines: [
        { say: 'Does it make sense? Both changes give more successful collisions each second, and that is exactly what a faster rate means.', show: 'ans' },
        { say: 'So the mean rate is three cubic centimetres per second, warmer acid collides more often and harder, and stronger acid collides more often.' },
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
            ['Rate = **2700**', '**Multiplied** instead of dividing'],
            ['"Particles **react more**"', 'Must say **collisions**, more often'],
            ['Stronger acid hits **harder**', 'Only temperature changes **energy**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A rate is the amount divided by the time, so ninety divided by thirty, not times.', focus: 'traps.0' },
        { say: 'In an explanation, saying the particles react more is not enough. Say they collide more often, and with enough energy.', focus: 'traps.1' },
        { say: 'And a higher concentration does not make the particles hit harder. Only a higher temperature does that. Concentration just makes collisions more frequent.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which change would NOT make marble chips react faster with acid?',
          choices: ['Warming the acid', 'Crushing the chips', 'Stronger acid', 'A bigger flask'],
          answer: 3,
          working: 'A bigger flask does not change how often or how hard particles collide.',
        },
      ],
      lines: [
        { say: 'Your turn. Which change would not make marble chips react faster with acid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A bigger flask changes nothing about how often or how hard the particles collide, so it is choice D. The other three all give more successful collisions.', show: 'q2.answer' },
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
          items: ['Mean rate = **amount** ÷ **time**', 'Hotter: **more often** and **harder** collisions', 'More concentrated: **more often** collisions'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The mean rate is the amount of product divided by the time.', show: 'sum.0' },
        { say: 'A higher temperature makes collisions both more frequent and more energetic.', show: 'sum.1' },
        { say: 'And a higher concentration makes collisions more frequent. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
