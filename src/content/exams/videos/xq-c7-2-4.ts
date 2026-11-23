import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import spread from '@/content/chem7/videos/c7-2-4.ts';

// Exam question for Chemistry 7 lesson 2.4 (expansion and diffusion): hot water loosens a stuck
// metal lid because the metal expands, and food colouring spreads through still water by diffusion,
// faster when the water is warm. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The pictures are the lesson's particles (src/video/particles.ts): a solid and a gas heated and
// cooled, and two liquids mixing by their own movement when a divider is lifted.

const QUESTION = 'A metal lid is stuck tight on a glass jar. (a) Running the lid under hot water makes it easier to open. Use the particle model to explain why. (b) A drop of food colouring is put into a glass of still water. An hour later, the colour has spread evenly through the water without any stirring. Name this process, and say whether it would happen faster or slower in warm water.';

const video: Explainer = {
  id: 'xq-c7-2-4',
  lessonId: '',
  exam: {
    lesson: 'c7-2-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: A Stuck Lid. Expansion and Diffusion',
  thumbnailTitle: 'A Stuck Lid',
  thumbnail: 'd',
  summary:
    'A test-style question, solved one small step at a time: why does hot water help open a stuck metal lid, and what is it called when food colouring spreads through still water? Heating makes the metal\'s particles move more and take up more room, so the lid expands, and the colour spreads by diffusion, which is faster in warm water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Stuck Lid', subtitle: 'Expansion, and a spreading colour' }],
      lines: [
        { say: 'In this video, we solve a test-style question about expansion and diffusion. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'The lid expands; diffusion, faster in warm water' }],
      lines: [
        { say: 'Here is the question. A metal lid is stuck tight on a glass jar. Part a: running the lid under hot water makes it easier to open. Use the particle model to explain why. Part b: a drop of food colouring is put into a glass of still water. An hour later, the colour has spread evenly through the water without any stirring. Name this process, and say whether it would happen faster or slower in warm water.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'What does heat do to the **lid\'s particles**, and what makes the colour **spread** on its own?' }],
      lines: [
        { say: 'The first part wants an explanation in terms of particles, so we must say what heating does to the particles of the metal. The second part wants the name of the spreading, and how warmth changes its speed.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(spread, 'x')],
      lines: [
        { say: 'Here is what we need. These are the particles of a solid and of a gas, and the dashed lines mark where the solid ends now.', show: ['x', 'x.labels', 'x.thermo', 'x.width'] },
        { say: 'Watch them heat up. The solid\'s particles vibrate harder and push one another a little further apart, so the solid grows past the lines. The gas grows even more. Getting bigger when heated is called expansion.', play: 'x.heat' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Heat → particles move **more** → **expansion**', 'Particles spreading by their own movement: **diffusion**', 'Warmer → particles **faster**'] }],
      lines: [
        { say: 'Here is the plan. Heating makes particles move more, so they take up more room. That is expansion.', show: 'plan.0' },
        { say: 'Particles spreading out by their own movement is diffusion.', show: 'plan.1' },
        { say: 'And warmer particles move faster.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The lid',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'lid', items: ['The hot water heats the **metal** lid', 'Its particles vibrate **harder** and push **further apart**', 'The lid **expands**, and loosens on the jar'] }],
      lines: [
        { say: 'Step one. The hot water heats the metal lid.', show: 'lid.0' },
        { say: 'The particles of the metal vibrate harder, and push one another a little further apart.', show: 'lid.1' },
        { say: 'So the lid expands, and gets a little bigger than the neck of the jar. Metal expands more than glass, so the lid loosens. That is part a.', show: 'lid.2', focus: 'lid.2' },
      ],
    },
    {
      chapter: 'Step 2: The colour',
      layout: 'center',
      main: [pick(spread, 'd')],
      lines: [
        { say: 'Step two. Here are two gases and two liquids, each pair kept apart by a thin wall. The liquids are like the colouring and the water.', show: ['d', 'd.labels'] },
        { say: 'Let\'s lift the walls. Nobody stirs them, yet the two colours spread into each other, because every particle keeps moving at random. This spreading is diffusion. It is slower in the liquid than in the gas, which is why the colouring takes an hour.', play: 'd.lift', focus: 'd.l' },
      ],
    },
    {
      chapter: 'Step 3: Warm water',
      layout: 'center',
      main: [{ kind: 'math', id: 'w', size: 'lg', lines: ['\\text{warmer} \\Rightarrow \\text{particles move faster}', '\\Rightarrow \\good{\\text{diffusion is faster}}'] }],
      lines: [
        { say: 'Step three. In warm water, the particles move faster.', show: 'w.0' },
        { say: 'Faster particles spread out sooner, so diffusion happens faster in warm water. That finishes part b.', show: 'w.1', focus: 'w.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Heating makes the metal\'s particles vibrate harder and move **further apart**, so the lid **expands** and loosens. (b) **Diffusion**, and it is **faster** in warm water.' },
      ],
      lines: [
        { say: 'Does it make sense? A tea bag colours hot water much faster than cold water, which fits faster diffusion when it is warm.', show: 'ans' },
        { say: 'So the hot water makes the lid expand, and the colour spreads by diffusion, faster in warm water.' },
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
            ['The particles **get bigger**', 'Only the **spaces** between them grow'],
            ['**Dissolving** or **stirring**', 'Nothing stirs it: the particles move by themselves'],
            ['**Slower** in warm water', 'Warmer particles move **faster**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The most common one is saying the particles get bigger. They never change size. They move further apart, so the spaces between them grow.', focus: 'traps.0' },
        { say: 'Nothing stirs the water, so the answer is not stirring. The name for particles spreading by their own movement is diffusion.', focus: 'traps.1' },
        { say: 'And warmth speeds diffusion up, because the particles move faster.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why are long bridges built with small gaps between their sections?',
          choices: ['So rain can drain away', 'To use less metal', 'To make the bridge lighter', 'Room to expand on hot days'],
          answer: 3,
          working: 'On a hot day the sections expand. Without gaps, they would push on each other and bend.',
        },
      ],
      lines: [
        { say: 'Your turn. Why are long bridges built with small gaps between their sections? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'On a hot day, the sections expand. The gaps leave them room, so they do not push on each other and bend: choice D.', show: 'q2.answer' },
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
          items: ['Heating → particles move **further apart** → **expansion**', 'The particles themselves **never grow**', '**Diffusion** is particles spreading by their own movement, faster when **warm**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Heating makes particles move more and push further apart, so the substance expands.', show: 'sum.0' },
        { say: 'The particles themselves never grow. Only the spaces between them do.', show: 'sum.1' },
        { say: 'And diffusion is particles spreading out by their own movement, faster when it is warmer. For more on expansion and diffusion, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
