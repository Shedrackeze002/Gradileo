import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import mixtures from '@/content/chem7/videos/c7-3-1.ts';
import changes from '@/content/chem7/videos/c7-2-2.ts';

// Exam question for Chemistry 7 lesson 3.1 (pure substances and mixtures): of two white solids, the
// one that melts sharply at 80 C is pure and the one that melts from 71 C to 77 C is a mixture; sea
// water is a mixture, a solution. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The pictures are lesson 2.2's box of particles melting as it passes its melting point, and lesson
// 3.1's pure water beside salt water (src/video/particles.ts).

const QUESTION = 'Two white solids are heated. Solid P melts at exactly 80 °C. Solid Q starts to melt at 71 °C and is not fully melted until 77 °C. (a) Which solid is pure, and how can you tell? (b) Sea water is clear and looks the same all the way through. Is it a pure substance or a mixture, and what type?';

const video: Explainer = {
  id: 'xq-c7-3-1',
  lessonId: '',
  exam: {
    lesson: 'c7-3-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Two White Solids. Pure Substances and Mixtures',
  thumbnailTitle: 'Two White Solids',
  thumbnail: 'p',
  summary:
    'A test-style question, solved one small step at a time: one white solid melts at exactly 80 °C and another melts from 71 °C to 77 °C. Which is pure, and is clear sea water a pure substance or a mixture? The solid with the sharp melting point is pure, and sea water is a mixture, a solution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two White Solids', subtitle: 'Telling pure substances from mixtures' }],
      lines: [
        { say: 'In this video, we solve a test-style question about pure substances and mixtures. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Two white solids are heated. Solid P melts at exactly $80$ °C. Solid Q starts to melt at $71$ °C and is not fully melted until $77$ °C. (a) Which solid is pure, and how can you tell? (b) Sea water is clear and looks the same all the way through. Is it a pure substance or a mixture, and what type?', answer: 'P is pure; sea water is a mixture, a solution' }],
      lines: [
        { say: 'Here is the question. Two white solids are heated. Solid P melts at exactly eighty degrees Celsius. Solid Q starts to melt at seventy one degrees and is not fully melted until seventy seven. Part a: which solid is pure, and how can you tell? Part b: sea water is clear and looks the same all the way through. Is it a pure substance or a mixture, and what type?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use the **melting** to spot the pure solid, then decide what **sea water** is' }],
      lines: [
        { say: 'Both solids look the same, so we cannot tell them apart by eye. The way they melt tells us which is pure. Then we sort sea water into the right group.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ ...(pick(changes, 'm') as ParticlesEl), height: 460 }],
      lines: [
        { say: 'Here is what we need. This is a pure solid, made of one kind of particle, with a thermometer marked at its melting point.', show: ['m', 'm.thermo'] },
        { say: 'Watch it warm up. All the particles are the same, so they all break out of their rows at the same temperature. A pure substance melts sharply, at one exact temperature.', play: 'm.liquid' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Pure: melts at **one exact** temperature', 'Mixture: melts over a **range**', 'Clear and the same all through: a **solution**'] }],
      lines: [
        { say: 'Here is the plan. A pure substance melts at one exact temperature.', show: 'plan.0' },
        { say: 'A mixture melts gradually, over a range of temperatures.', show: 'plan.1' },
        { say: 'And a mixture that is clear and the same all through is a solution.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The melting points',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Solid', 'Melts', 'So it is…'], rows: [['P', 'exactly at 80 °C', '**pure**'], ['Q', 'from 71 °C to 77 °C', 'a **mixture**']] }],
      lines: [
        { say: 'Step one. Solid P melts at exactly eighty degrees, one sharp temperature, so P is pure.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Solid Q melts over a range, from seventy one to seventy seven degrees, so Q is a mixture. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Sea water',
      layout: 'center',
      main: [pick(mixtures, 'p')],
      lines: [
        { say: 'Step two. Here are the particles of pure water beside salt water, which is what sea water mostly is.', show: ['p', 'p.labels'] },
        { say: 'In the pure water, every particle is a water particle. In the salt water, the yellow salt particles move about among the water particles, not joined to them. Two substances mixed together make a mixture.', focus: 'p.mix' },
        { say: 'The salt is spread evenly all the way through, too small to see, so the water looks clear. A clear mixture that is the same all through is a solution. That is part b.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **P** is pure, because it melts at **one exact** temperature. Q melts over a range, so it is a mixture. (b) Sea water is a **mixture**: a **solution**.' },
      ],
      lines: [
        { say: 'Does it make sense? If you boil sea water dry, salt is left behind, so there really were two substances in it.', show: 'ans' },
        { say: 'So P is pure because it melts sharply, and sea water is a mixture, a solution.' },
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
            ['Q is pure', 'Thought a **range** of temperatures is more exact'],
            ['Sea water is **pure**', 'It **looks** like one substance'],
            ['A **suspension**', 'Suspensions are **cloudy** and settle'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A range of temperatures is the sign of a mixture, never of a pure substance. Pure means one sharp melting point.', focus: 'traps.0' },
        { say: 'Sea water looks like one substance, but looking the same all through does not make it pure. The salt is just spread too finely to see.', focus: 'traps.1' },
        { say: 'And a suspension, like muddy water, is cloudy and settles. Sea water is clear and never settles, so it is a solution.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a pure substance?',
          choices: ['Distilled water', 'Sea water', 'Air', 'Milk'],
          answer: 0,
          working: 'Distilled water contains only water particles. Sea water, air and milk all contain two or more substances.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a pure substance? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Distilled water contains only water particles, so it is pure: choice A. Sea water, air and milk are all mixtures of two or more substances.', show: 'q2.answer' },
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
          items: ['Pure: melts at **one exact** temperature', 'Mixture: melts over a **range**', 'Clear and the same all through: a **solution**, still a mixture'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A pure substance melts sharply, at one exact temperature.', show: 'sum.0' },
        { say: 'A mixture melts over a range of temperatures.', show: 'sum.1' },
        { say: 'And a clear mixture that is the same all through is a solution, which is still a mixture. For more on pure substances and mixtures, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
