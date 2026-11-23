import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import states from '@/content/chem7/videos/c7-2-1.ts';

// Exam question for Chemistry 7 lesson 2.1 (solids, liquids and gases): two sealed syringes, one
// of air and one of water, pushed with the same force. Only the air squashes, because gas particles
// have empty space between them. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The pictures are the lesson's three states (src/video/particles.ts) and its pistons pushed down
// onto a solid, a liquid and a gas.

const QUESTION = 'Two sealed syringes are the same size. One is full of air and the other is full of water. A student pushes each plunger in with the same force. (a) Which plunger moves further in? (b) Use the particle model to explain why.';

const video: Explainer = {
  id: 'xq-c7-2-1',
  lessonId: '',
  exam: {
    lesson: 'c7-2-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Two Syringes. Solids, Liquids and Gases',
  thumbnailTitle: 'Two Syringes',
  thumbnail: 'x',
  summary:
    'A test-style question, solved one small step at a time: two sealed syringes, one full of air and one full of water, are pushed with the same force. Which plunger moves further in, and why? The air squashes and the water hardly moves, because gas particles have empty space between them while liquid particles are already touching.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Syringes', subtitle: 'Squashing a gas and a liquid' }],
      lines: [
        { say: 'In this video, we solve a test-style question about solids, liquids and gases. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'The air syringe, because gas particles have space between them' }],
      lines: [
        { say: 'Here is the question. Two sealed syringes are the same size. One is full of air and the other is full of water. A student pushes each plunger in with the same force. Part a: which plunger moves further in? Part b: use the particle model to explain why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Which one **squashes**, air or water, and what are the **particles** doing that makes the difference?' }],
      lines: [
        { say: 'Sealed means nothing can escape, so the plunger only goes in if the stuff inside can be squashed into less space. The question asks which one squashes, and wants the reason in terms of particles.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ ...(pick(states, 'p') as ParticlesEl), height: 380 }],
      lines: [
        { say: 'Here is what we need. These are the same particles as a solid, a liquid and a gas.', show: ['p', 'p.labels'] },
        { say: 'In the solid and the liquid, the particles are touching. In the gas, they are far apart, with empty space between them. The particles themselves never change size.', focus: ['p.l', 'p.g'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Air is a **gas**, water is a **liquid**', 'Ask: is there **space** between the particles?', 'Only space can be squashed away'] }],
      lines: [
        { say: 'Here is the plan. First, name the states: air is a gas, and water is a liquid.', show: 'plan.0' },
        { say: 'Then ask whether there is empty space between the particles.', show: 'plan.1' },
        { say: 'Pushing can only take away empty space, because the particles cannot shrink.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Push them',
      layout: 'center',
      main: [pick(states, 'x')],
      lines: [
        { say: 'Step one. Here are a solid, a liquid and a gas, each under a piston, which works just like a plunger. Each gets the same push.', show: ['x', 'x.labels'] },
        { say: 'Watch. The gas squashes into a much smaller space. The liquid hardly moves at all. So the plunger on the air syringe moves further in. That is part a.', play: 'x.push', focus: 'x.g' },
      ],
    },
    {
      chapter: 'Step 2: The reason',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'why', items: ['Air: particles **far apart**, so the push closes up the **spaces**', 'Water: particles **already touching**, nowhere to go', 'The particles **never shrink**'] }],
      lines: [
        { say: 'Step two, the reason. In air, the particles are far apart, with empty space between them. The push moves them closer together, so the air takes up less space.', show: 'why.0' },
        { say: 'In water, the particles are already touching, so there is no space to close up, and the plunger hardly moves.', show: 'why.1' },
        { say: 'And in both, the particles stay the same size. Only the gaps change. That is part b.', show: 'why.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The **air** syringe. (b) Gas particles are far apart, so the push moves them closer together. Liquid particles are already touching, so there is no space to squash.' },
      ],
      lines: [
        { say: 'Does it make sense? Try it at home with a syringe and your finger over the end: air squashes, and water pushes straight back.', show: 'ans' },
        { say: 'So the air plunger moves further in, because gas particles have empty space between them, and liquid particles are already touching.' },
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
            ['The water, because it **flows**', 'Mixed up flowing with squashing'],
            ['Both the same', 'Thought the same **force** gives the same result'],
            ['The air particles **shrink**', 'Forgot particles never change size'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Water flows, but flowing is not squashing. Its particles slide past one another, still touching, so it keeps the same volume.', focus: 'traps.0' },
        { say: 'The same force does not give the same result, because the two states are packed differently.', focus: 'traps.1' },
        { say: 'And an explanation that says the air particles get smaller loses the mark. The particles stay the same size, and the spaces between them get smaller.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In which state are the particles packed in rows, vibrating on the spot without changing places?',
          choices: ['Solid', 'Liquid', 'Gas', 'All three'],
          answer: 0,
          working: 'Only in a solid are the particles held in rows. In a liquid they slide past one another, and in a gas they fly apart.',
        },
      ],
      lines: [
        { say: 'Your turn. In which state are the particles packed in rows, vibrating on the spot without changing places? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Only in a solid are the particles held in rows, shaking but staying put: choice A. In a liquid they slide past one another, and in a gas they fly apart.', show: 'q2.answer' },
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
          items: ['A **gas** squashes: its particles have space between them', 'Solids and liquids hardly squash: particles **touching**', 'Squashing closes the **spaces**, the particles never shrink'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A gas can be squashed, because its particles have empty space between them.', show: 'sum.0' },
        { say: 'Solids and liquids hardly squash at all, because their particles are already touching.', show: 'sum.1' },
        { say: 'And squashing only closes up the spaces. The particles never change size. For more on the three states, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
