import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import safety from '@/content/chem7/videos/c7-1-1.ts';

// Exam question for Chemistry 7 lesson 1.1 (working safely in the lab): what a bottle of ethanol's
// two hazard symbols warn, why it is warmed in hot water instead of over a flame, and two more
// safety rules. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The picture is the lesson's vapour leaving an open bottle (src/video/particles.ts): it spreads
// out on its own, which is why a flammable liquid's vapour can reach a flame.

const QUESTION = 'A student needs to warm some ethanol in a test tube. The ethanol bottle shows two hazard symbols: a flame, and an exclamation mark. (a) What does each symbol warn? (b) Why should the student warm the test tube in a beaker of hot water instead of over a burner flame? (c) Give two other safety rules the student should follow.';

const video: Explainer = {
  id: 'xq-c7-1-1',
  lessonId: '',
  exam: {
    lesson: 'c7-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Warming Ethanol Safely. Working Safely in the Lab',
  thumbnailTitle: 'Warming Ethanol Safely',
  thumbnail: 'v',
  summary:
    'A test-style question, solved one small step at a time: a bottle of ethanol shows a flame and an exclamation mark. What do they warn, why warm it in hot water instead of over a flame, and what other rules keep the student safe? The flame means flammable and the exclamation mark means irritant, and since the vapour spreads, an open flame could set it alight.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Warming Ethanol Safely', subtitle: 'Reading hazard symbols, and acting on them' }],
      lines: [
        { say: 'In this video, we solve a test-style question about working safely in the lab. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Flammable and irritant; its vapour could catch fire from a flame; for example goggles on, and point the tube away from everyone' }],
      lines: [
        { say: 'Here is the question. A student needs to warm some ethanol in a test tube. The ethanol bottle shows two hazard symbols: a flame, and an exclamation mark.', show: 'q' },
        { say: 'Part a: what does each symbol warn? Part b: why should the student warm the test tube in a beaker of hot water instead of over a burner flame? Part c: give two other safety rules the student should follow.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Read the **two symbols**, then use them to explain **how** to warm it safely' }],
      lines: [
        { say: 'First we read what the two symbols mean. Then we use those dangers to explain the safe way to warm it, and add two more rules.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(safety, 'syms')],
      lines: [
        { say: 'Here is what we need. Every hazard symbol is a small picture in a red diamond, and each picture warns of one kind of danger.', show: 'syms' },
        { say: 'A plain flame means flammable: it catches fire easily. A flame on top of a circle is different: that is an oxidizer.', focus: ['syms.0', 'syms.1'] },
        { say: 'And an exclamation mark means harmful or irritant.', focus: 'syms.4' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read each **symbol**', 'Think about what the **vapour** does near a flame', 'Pick two more **rules** for heating a test tube'] }],
      lines: [
        { say: 'Here is the plan. Read each symbol in turn.', show: 'plan.0' },
        { say: 'Then think about what the ethanol\'s vapour does near a flame.', show: 'plan.1' },
        { say: 'Then pick two more rules that fit heating a test tube.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two symbols',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Symbol', 'It warns'], rows: [['a flame', '**flammable**: it catches fire easily'], ['an exclamation mark', '**irritant**: it can irritate eyes, skin and lungs']] }],
      lines: [
        { say: 'Step one. A plain flame means ethanol is flammable: it catches fire easily.', show: 't.0', focus: 't.0' },
        { say: 'The exclamation mark means it is harmful or irritant: its vapour can sting the eyes, skin and lungs. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: The vapour',
      layout: 'center',
      main: [pick(safety, 'v')],
      lines: [
        { say: 'Step two. Warming ethanol makes it give off more vapour. Here are vapour particles leaving an open container.', show: ['v', 'v.labels', 'v.key'] },
        { say: 'Watch them. The vapour spreads out through the air on its own. Over a burner, it would drift straight into the flame, and because ethanol is flammable, it could catch fire.', play: 'v.open' },
        { say: 'Hot water warms the tube with no flame anywhere near it. That is part b.' },
      ],
    },
    {
      chapter: 'Step 3: Two more rules',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'r', items: ['**Goggles on** while anything is heated', 'Point the tube **away from everyone**', 'Never **sniff** it: **waft** instead'] }],
      lines: [
        { say: 'Step three. Any two sensible rules for this job will do. Wear goggles while anything is heated, because the irritant liquid could spit into your eyes.', show: 'r.0' },
        { say: 'Point the open end of the test tube away from everyone.', show: 'r.1' },
        { say: 'And never sniff the vapour directly. Waft it towards your nose, because it is an irritant. That is part c.', show: 'r.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The flame: **flammable**. The exclamation mark: **harmful or irritant**. (b) Its **vapour** spreads and could **catch fire** from a flame; hot water has no flame. (c) For example, wear **goggles**, and point the tube **away from everyone**.' },
      ],
      lines: [
        { say: 'Does it hang together? Each safety step answers one of the dangers on the label: no flame because it is flammable, and goggles and wafting because it is an irritant.', show: 'ans' },
        { say: 'So: the flame warns it is flammable, the exclamation mark that it is harmful or irritant. Warm it in hot water, because its vapour could catch fire from a flame. And wear goggles, and point the tube away from everyone.' },
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
            ['The flame means it is **hot**', 'The flame warns it **catches fire**'],
            ['It is an **oxidizer**', 'That needs a flame **on a circle**'],
            ['Smell it to **check**', 'Never sniff: **waft**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The flame does not mean the bottle is hot. It warns that the substance catches fire easily.', focus: 'traps.0' },
        { say: 'Oxidizer is a different symbol: a flame sitting on a circle. A plain flame means flammable.', focus: 'traps.1' },
        { say: 'And smelling the ethanol directly is never safe, especially for an irritant. Waft it instead.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which hazard symbol warns that a chemical attacks skin, eyes and metals?',
          choices: ['Liquid dripping onto a hand and a surface', 'A flame on top of a circle', 'An exclamation mark', 'A gas cylinder'],
          answer: 0,
          working: 'Liquid dripping onto a hand and a surface marks a corrosive substance.',
        },
      ],
      lines: [
        { say: 'Your turn. Which hazard symbol warns that a chemical attacks skin, eyes and metals? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Liquid dripping onto a hand and a surface marks a corrosive substance, one that attacks skin, eyes and metals: choice A.', show: 'q2.answer' },
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
          items: ['A plain **flame**: flammable. An **exclamation mark**: irritant', 'Warm flammable liquids **without a flame**', 'Goggles on, tube **pointed away**, and **waft**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A plain flame means flammable, and an exclamation mark means harmful or irritant.', show: 'sum.0' },
        { say: 'Warm a flammable liquid without a flame nearby, because its vapour spreads.', show: 'sum.1' },
        { say: 'And whenever you heat anything, wear goggles, point the tube away from everyone, and waft to smell. For more on working safely, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
