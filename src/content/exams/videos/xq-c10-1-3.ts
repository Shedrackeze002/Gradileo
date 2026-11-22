import type { Explainer } from '@/video/script.ts';
import { evaporatingDish, filterPaper } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 1.3 (separating mixtures): get dry sand and dry salt back
// from a mixture of sand, salt and water. OpenStax Chemistry 2e does not cover separation methods,
// so Gradileo wrote this one in the style of a high-school chemistry unit test (our own wording).
// Answer: filter (sand stays on the paper as the residue, salt water passes through as the
// filtrate), rinse and dry the sand, then evaporate the water from the filtrate to leave the salt.
//
// The pictures are the lesson's simulated particles: sand and water poured onto filter paper (the
// big grains stay), salt water poured onto it (the dissolved salt goes straight through), and salt
// water heated in a dish until only the salt is left, locking into a crystal as it cools.

const QUESTION =
  'A student has a beaker containing a mixture of sand, salt and water. Describe how the student could obtain a dry sample of the sand and a dry sample of the salt from the mixture. Explain why each method works.';

const video: Explainer = {
  id: 'xq-c10-1-3',
  lessonId: '',
  exam: {
    lesson: 'c10-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Separating Sand, Salt and Water. Filtration and Evaporation',
  thumbnailTitle: 'Sand, Salt and Water',
  thumbnail: 'fp',
  summary:
    'An exam-style question, solved one small step at a time: how do we get dry sand and dry salt back from a mixture of sand, salt and water? We watch the particles on filter paper, where the sand is too big to pass but the dissolved salt goes straight through, and then evaporate the water to leave the salt behind.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sand, Salt and Water', subtitle: 'Separating a mixture, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about separating a mixture of sand, salt and water. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '**Filter**: the sand stays on the paper; rinse and dry it. **Evaporate** the water from the filtrate: the salt is left.',
          working: 'Sand grains are too big to pass through the paper; dissolved salt particles are as small as water particles. Water evaporates when heated; salt does not.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A student has a beaker containing a mixture of sand, salt and water. Describe how the student could obtain a dry sample of the sand and a dry sample of the salt from the mixture. Explain why each method works.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ask',
          items: ['**Sand**: does not dissolve, sinks to the bottom', '**Salt**: dissolved in the water, invisible', 'We want both **dry**, and a reason for each method'],
        },
      ],
      lines: [
        { say: 'Let us picture the beaker. The sand does not dissolve, so it sits at the bottom.', show: 'ask.0' },
        { say: 'The salt has dissolved. We cannot see it, but it is spread all through the water.', show: 'ask.1' },
        { say: 'The question wants two dry solids at the end, and a reason why each method works. A method with no reason would lose marks.', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Method', 'Separates', 'Why it works'],
          rows: [
            ['**Filtration**', 'An undissolved solid from a liquid', 'Big grains cannot pass the tiny holes in the paper'],
            ['**Evaporation**', 'A dissolved solid from its solution', 'The liquid boils off; the solid does not'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Residue and filtrate', md: 'The **residue** stays on the filter paper. The **filtrate** is the liquid that passes through.' },
      ],
      lines: [
        { say: 'Here is what we need: two methods. Filtration separates a solid that has not dissolved from a liquid. The grains are too big to pass through the tiny holes in the paper.', show: ['tab', 'tab.0'] },
        { say: 'Evaporation gets a dissolved solid back. We heat the solution until the liquid has gone, and the solid is left behind.', show: 'tab.1' },
        { say: 'Two words help: the residue is what stays on the filter paper, and the filtrate is the liquid that passes through.', show: 'def' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Filter** the mixture to remove the sand', 'Rinse and **dry** the sand', '**Evaporate** the water from the filtrate to get the salt'] }],
      lines: [
        { say: 'Here is the plan. First, filter the mixture to take out the sand.', show: 'plan.0' },
        { say: 'Second, rinse the sand and let it dry.', show: 'plan.1' },
        { say: 'Third, evaporate the water from the filtrate, so the salt is left behind.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Filter',
      layout: 'center',
      main: [filterPaper('fp', false, 420)],
      lines: [
        { say: 'Step one. Pour the mixture through filter paper in a funnel. Watch the particles.', show: ['fp', 'fp.labels'] },
        { say: 'The water particles are tiny, and they slip through the holes. The sand grains are much bigger, so they are caught on the paper. The sand is the residue.', play: 'fp.pour', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: Rinse and dry the sand',
      layout: 'center',
      main: [filterPaper('fs', true, 420), { kind: 'text', id: 't', size: 'md', md: 'Rinse with **a little clean water**, then dry in a **warm place**' }],
      lines: [
        { say: 'Step two. The wet sand still has some salt water clinging to it. And here is why that matters: salt water goes straight through filter paper. Each dissolved salt particle is as small as a water particle.', show: ['fs', 'fs.labels'], play: 'fs.pour', playDelay: 0.3 },
        { say: 'So we rinse the sand with a little clean water, which washes the salt solution through, and then leave the sand to dry in a warm place or a low oven. Now we have dry sand.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Evaporate the water',
      layout: 'center',
      main: [evaporatingDish('ed', 420)],
      lines: [
        { say: 'Step three. All the salt is now in the filtrate, so we pour it into an evaporating dish and heat it.', show: ['ed', 'ed.labels'] },
        { say: 'The water particles gain energy and escape into the air. The salt particles hold on to one another far too strongly to leave, so they stay in the dish.', play: 'ed.heat', playDelay: 0.3 },
        { say: 'As the dish cools, the salt particles lock together into a crystal. Now we have dry salt.', play: 'ed.cool' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ans',
          check: true,
          items: [
            '**Filter**: sand grains are too big to pass the paper, so the sand is the residue',
            '**Rinse and dry** the sand to remove the salt water clinging to it',
            '**Evaporate** the filtrate: water escapes as vapour, the salt cannot, so it is left',
          ],
        },
      ],
      lines: [
        { say: 'Here is a full-mark answer. Filter the mixture: the sand grains are too big to pass through the paper, so the sand stays behind as the residue.', show: 'ans.0' },
        { say: 'Rinse the sand with a little water and dry it, to remove the salt water clinging to it.', show: 'ans.1' },
        { say: 'Then heat the filtrate in an evaporating dish: the water evaporates, but the salt does not, so dry salt is left. Each step has a method and a reason, as the question asked.', show: 'ans.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it is wrong'],
          rows: [
            ['Filter out the salt', 'Dissolved salt goes **through** the paper'],
            ['Evaporate first', 'You get sand and salt **mixed** together'],
            ['Use distillation for the salt', 'It works, but it is for getting the **water** back'],
            ['Skip the reasons', 'The question says **explain**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Saying that filtering removes the salt. Dissolved salt particles are as small as water particles, so they go straight through.' },
        { say: 'Evaporating first. That leaves the sand and the salt together in one dry heap, and then you are stuck.' },
        { say: 'Distillation also leaves the salt behind, but it is the method for collecting the water. And leaving out the reasons, when the question says explain.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Chalk powder is stirred into sugar water. Which method separates the chalk from the sugar water?',
          choices: ['Evaporation', 'Distillation', 'Filtration', 'Using a magnet'],
          answer: 2,
          working: 'Chalk does not dissolve, so its grains are caught by filter paper while the sugar water passes through.',
        },
      ],
      lines: [
        { say: 'Your turn. Chalk powder is stirred into sugar water. Which method separates the chalk from the sugar water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, filtration. Chalk does not dissolve, so its grains stay on the paper while the sugar water passes through. Evaporation would leave the chalk and sugar mixed.', show: 'q2.answer' },
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
          items: ['**Filtration** removes a solid that has **not dissolved**', 'A **dissolved** solid passes through the paper', '**Evaporation** gets a dissolved solid back', 'Order matters: filter **first**, then evaporate'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Filtration removes a solid that has not dissolved.', show: 'sum.0' },
        { say: 'A dissolved solid passes straight through the paper with the water.', show: 'sum.1' },
        { say: 'Evaporation gets a dissolved solid back from its solution.', show: 'sum.2' },
        { say: 'And the order matters: filter first, then evaporate. For more on separating mixtures, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
