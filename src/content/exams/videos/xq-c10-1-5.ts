import type { Explainer } from '@/video/script.ts';
import { acidMeetsWater, corrosiveAcid } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 1.5 (lab safety and hazard symbols): how to dilute a
// concentrated acid that carries the corrosive symbol. OpenStax Chemistry 2e has no lab safety
// questions, so Gradileo wrote this one in the style of a high-school chemistry unit test (our own
// wording). Answer C: goggles and gloves, and add the acid slowly to the water while stirring.
//
// The pictures are the lesson's simulated particles: a corrosive acid eating a metal away particle
// by particle, and concentrated acid meeting water, where every meeting gives out heat and the
// thermometer climbs.

const CHOICES = [
  'Wear safety goggles and pour water quickly into the acid.',
  'Wear gloves and pour the acid quickly into the water.',
  'Wear safety goggles and gloves, and add the acid slowly to the water while stirring.',
  'Wear safety goggles and gloves, and add the water slowly to the acid while stirring.',
];

const video: Explainer = {
  id: 'xq-c10-1-5',
  lessonId: '',
  exam: {
    lesson: 'c10-1-5',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: 'A bottle of concentrated sulfuric acid carries the corrosive hazard symbol. A student needs to make a dilute solution of the acid. Which of the following is the safest way to do this?',
    choices: CHOICES,
  },
  title: 'Exam Question: Diluting a Corrosive Acid Safely. Lab Safety and Hazard Symbols',
  thumbnailTitle: 'Acid to Water, or Water to Acid?',
  thumbnail: 'mx',
  summary:
    'An exam-style question, solved one small step at a time: what is the safest way to dilute concentrated sulfuric acid that carries the corrosive symbol? We watch a corrosive acid eat into metal, then watch acid meet water and heat up, to see why we protect our eyes and hands and always add the acid slowly to the water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Acid to Water, or Water to Acid?', subtitle: 'Lab safety, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about diluting a dangerous acid safely. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A bottle of concentrated sulfuric acid carries the corrosive hazard symbol. A student needs to make a dilute solution of the acid. Which of the following is the safest way to do this?',
          choices: CHOICES,
          answer: 2,
          working: 'Corrosive: protect eyes and skin. Mixing gives out heat, so add the acid slowly to plenty of water, stirring.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A bottle of concentrated sulfuric acid carries the corrosive hazard symbol. A student needs to make a dilute solution of the acid. Which of the following is the safest way to do this?' },
        { say: 'Choice A: wear safety goggles and pour water quickly into the acid. B: wear gloves and pour the acid quickly into the water. C: wear safety goggles and gloves, and add the acid slowly to the water while stirring. D: wear safety goggles and gloves, and add the water slowly to the acid while stirring.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'ask', items: ['**What to wear**: goggles, gloves, or both?', '**Which way round**: acid into water, or water into acid?', '**How fast**: quickly, or slowly while stirring?'] }],
      lines: [
        { say: 'The four choices differ in three ways, so the question is really asking three smaller questions.', show: 'ask.0' },
        { say: 'Which way round should the liquids go?', show: 'ask.1' },
        { say: 'And how fast? If we can answer all three, only one choice will be left.', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [corrosiveAcid('ca', 400), { kind: 'callout', id: 'def', tone: 'definition', title: 'Corrosive', md: 'Attacks and destroys **skin, eyes and metals** on contact.' }],
      lines: [
        { say: 'Here is what we need: what corrosive means. This is a concentrated acid on a piece of metal.', show: ['ca', 'ca.labels', 'def'] },
        { say: 'Each acid particle that hits the metal reacts and carries a piece away, so the metal is eaten away, particle by particle. The same thing happens to skin and to the surface of the eye.', play: 'ca.fizz', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Decide what to **wear**', 'Decide **which liquid goes into which**', 'Decide **how fast**, then pick the choice'] }],
      lines: [
        { say: 'Here is the plan. First, decide what to wear.', show: 'plan.0' },
        { say: 'Second, decide which liquid goes into which.', show: 'plan.1' },
        { say: 'Third, decide how fast, and then pick the one choice that gets all three right.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: What to wear',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{corrosive} \\to \\text{protect eyes } \\good{\\text{and}} \\text{ skin}', '\\text{A: goggles only}\\quad \\text{B: gloves only}\\quad \\bad{\\text{out}}'] }],
      lines: [
        { say: 'Step one. A corrosive acid damages both eyes and skin. A splash in the eye can blind, so we need goggles. A drip on the hand burns, so we need gloves as well.', show: 'm.0' },
        { say: 'Choice A has only goggles, and choice B has only gloves. Both leave something unprotected, so A and B are out. That leaves C and D.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Which way round',
      layout: 'center',
      main: [acidMeetsWater('mx', 420)],
      lines: [
        { say: 'Step two. C and D differ only in which liquid goes into which. Watch what happens when concentrated acid meets water.', show: ['mx', 'mx.labels', 'mx.thermo', 'mx.key'] },
        { say: 'Wherever an acid particle meets a water particle, the two cling together and give out heat. Watch the thermometer climb.', play: 'mx.mix', playDelay: 0.3 },
        { say: 'Now picture a little water poured onto a lot of acid. All that heat goes into the first few drops of water, which can boil at once and spit hot acid out. Pour acid into plenty of water, and the large amount of water soaks up the heat safely. So the acid goes into the water, and D is out.' },
      ],
    },
    {
      chapter: 'Step 3: How fast',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{slowly} + \\text{stirring} \\to \\text{heat given out a little at a time, spread out}'] }],
      lines: [
        { say: 'Step three. Even acid into water gives out heat. Adding it slowly gives out the heat a little at a time, and stirring spreads it through all the water, so no part gets hot enough to boil.', show: 'm.0' },
        { say: 'Choice C has all three right: goggles and gloves, acid into water, slowly while stirring.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Choice', 'Wear', 'Which way', 'How fast', ''],
          rows: [
            ['A', 'Goggles only', 'Water into acid', 'Quickly', '✗'],
            ['B', 'Gloves only', 'Acid into water', 'Quickly', '✗'],
            ['C', 'Both', 'Acid into water', 'Slowly, stirring', '**✓**'],
            ['D', 'Both', 'Water into acid', 'Slowly, stirring', '✗'],
          ],
        },
      ],
      lines: [
        { say: 'Here is every choice checked against our three answers. Only C gets all three right, so the answer is C.', show: 'ans' },
        { say: 'Choice A is the most dangerous of all: water poured quickly into acid, with bare hands.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting choice', 'Why it is wrong'],
          rows: [
            ['D: it says slowly and stirring', 'Still water **into** acid: it can boil and spit'],
            ['B: acid into water is right', 'Quickly, and **no goggles**'],
            ['"Water is safe, so add it to the acid"', 'The **heat** is the danger, not the water'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Choice D sounds careful, because it says slowly and stirring. But it still puts water into acid, which can boil and spit.' },
        { say: 'Choice B gets the order right, but it pours quickly and leaves the eyes unprotected.' },
        { say: 'And thinking water is harmless, so it should go in. The danger is the heat given out when they mix. A memory aid: do as you oughta, add acid to water.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bottle shows a **flame** hazard symbol. Which is the safest way to use the liquid?',
          choices: ['Heat it directly over a Bunsen burner', 'Keep it well away from any flame', 'Store it beside a hot plate', 'Pour leftovers down the sink'],
          answer: 1,
          working: 'The flame symbol means flammable: it catches fire easily, so keep it away from flames, sparks and heat.',
        },
      ],
      lines: [
        { say: 'Your turn. A bottle shows a flame hazard symbol. Which is the safest way to use the liquid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B: keep it well away from any flame. The flame symbol means flammable, so flames, sparks and heat must stay away from it.', show: 'q2.answer' },
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
          items: ['**Corrosive**: protect eyes **and** skin', 'Mixing acid and water gives out **heat**', 'Add the **acid to the water**, never water to acid', 'Slowly, while stirring'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Corrosive means it attacks eyes and skin, so wear goggles and gloves.', show: 'sum.0' },
        { say: 'Mixing concentrated acid with water gives out heat.', show: 'sum.1' },
        { say: 'So always add the acid to the water, never water to acid.', show: 'sum.2' },
        { say: 'And add it slowly, while stirring. For more on lab safety, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
