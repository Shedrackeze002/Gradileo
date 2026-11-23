import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import materials from '@/content/chem8/videos/c8-4-4.ts';

// Exam question for Chemistry 8 lesson 4.4 (polymers, ceramics and composites): sort a nylon rope,
// a brick and reinforced concrete into their families, explain why a plastic bowl bounces and a
// china bowl shatters, and choose a family for the lining of a pizza oven. Written by Gradileo in
// the style of a Grade 8 science unit test.
//
// The picture is the lesson's polymer chains and ceramic network pushed side by side
// (src/video/particles.ts).

const QUESTION = 'Answer these questions about materials. (a) Say whether each is a polymer, a ceramic or a composite: a nylon rope, a brick, reinforced concrete. (b) A plastic bowl and a china bowl are dropped on a hard floor. The plastic bowl bounces, but the china bowl shatters. Explain the difference in terms of the particles inside each material. (c) Which family of materials should the lining of a pizza oven come from? Give a reason.';

const video: Explainer = {
  id: 'xq-c8-4-4',
  lessonId: '',
  exam: {
    lesson: 'c8-4-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Rope, Brick, Two Bowls and a Pizza Oven. Polymers, Ceramics and Composites',
  thumbnailTitle: 'Polymer, Ceramic or Composite?',
  thumbnail: 'mat',
  summary:
    'A test-style question, solved one small step at a time: is a nylon rope, a brick or reinforced concrete a polymer, a ceramic or a composite, why does a plastic bowl bounce when a china bowl shatters, and what should line a pizza oven? Nylon is a polymer, brick a ceramic and reinforced concrete a composite. Polymer chains bend while a ceramic network cannot, and a ceramic lining resists the heat.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Polymer, Ceramic or Composite?', subtitle: 'Choosing materials' }],
      lines: [
        { say: 'In this video, we solve a test-style question about polymers, ceramics and composites. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Polymer, ceramic, composite; chains bend, a network cracks; a ceramic' }],
      lines: [
        { say: 'Here is the question. Part a: say whether each is a polymer, a ceramic or a composite: a nylon rope, a brick, and reinforced concrete. Part b: a plastic bowl and a china bowl are dropped on a hard floor. The plastic bowl bounces, but the china bowl shatters. Explain the difference in terms of the particles inside each material. Part c: which family of materials should the lining of a pizza oven come from? Give a reason.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Name each **family**, explain a property from the **particles**, then **choose** a material' }],
      lines: [
        { say: 'The question asks us to know the families of materials, to explain one of their properties from the particles inside, and to choose a material for a job.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(materials, 'mat')],
      lines: [
        { say: 'Here is what we need. On the left is a polymer, its atoms joined in long chains. On the right is a ceramic, every atom held firmly in a rigid network.', show: ['mat', 'mat.labels'] },
        { say: 'Now we push both. The polymer\'s chains bend and slide past one another, so it gives without breaking.', play: 'mat.push', focus: 'mat.poly' },
        { say: 'The ceramic\'s network only tips a little and springs back. It cannot bend, so a sharp blow makes it crack.', focus: 'mat.cer' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Polymers**: long chains, like plastics and nylon', '**Ceramics**: heated clay or minerals, like brick and china', '**Composites**: two materials combined'] }],
      lines: [
        { say: 'Here is the plan. Polymers are made of long chain molecules, like plastics and nylon.', show: 'plan.0' },
        { say: 'Ceramics are made by heating clay or minerals, like brick, china and glass.', show: 'plan.1' },
        { say: 'And composites combine two or more materials to get the best of each.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sort the materials',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Material', 'Made of', 'Family'],
          rows: [
            ['nylon rope', 'long chain molecules', '**polymer**'],
            ['brick', 'clay, heated in a kiln', '**ceramic**'],
            ['reinforced concrete', 'concrete with steel rods', '**composite**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Nylon is made of very long chain molecules, so a nylon rope is a polymer.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'A brick is clay fired at a high temperature, so it is a ceramic.', show: 't.1', focus: 't.1' },
        { say: 'Reinforced concrete is concrete with steel rods set inside, two materials working together, so it is a composite. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: The two bowls',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Plastic: long **chains** that bend and slide', 'So the plastic bowl **gives** a little, and bounces', 'China: a **rigid network** that cannot bend, so it **cracks**'] }],
      lines: [
        { say: 'Step two. The plastic bowl is a polymer, made of long chains.', show: 's.0' },
        { say: 'When it hits the floor, the chains bend and slide a little, so the bowl gives and bounces instead of breaking.', show: 's.1' },
        { say: 'The china bowl is a ceramic. Its atoms are held in a rigid network that cannot bend, so the sudden blow makes it crack, and it shatters. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The pizza oven',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{the job needs: } \\text{resists high temperatures}', '\\good{\\text{a ceramic, such as firebrick}}'] }],
      lines: [
        { say: 'Step three. First, the property the job needs most. A pizza oven gets extremely hot, so the lining must resist high temperatures.', show: 'm.0' },
        { say: 'Ceramics are made at high temperatures and resist heat, while most plastics would melt. So the lining should be a ceramic, such as firebrick. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Nylon rope: **polymer**; brick: **ceramic**; reinforced concrete: **composite**. (b) Plastic\'s **chains bend**, so it gives; china\'s **rigid network** cannot bend, so it cracks. (c) A **ceramic**: it resists heat.' },
      ],
      lines: [
        { say: 'Does it make sense? A brick is a lot like a pizza oven lining, both fired and both heat-proof, so a ceramic fits.', show: 'ans' },
        { say: 'So the rope, brick and concrete are a polymer, a ceramic and a composite, plastic chains bend while a ceramic network cracks, and the oven needs a ceramic.' },
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
            ['Reinforced concrete is a **ceramic**', 'Missed the **steel rods** inside'],
            ['China is **weak**', 'It is **hard**, but **brittle**'],
            ['Line the oven with **plastic**', 'Plastics **melt** when hot'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Plain concrete is a ceramic-like material, but reinforced concrete has steel rods inside, so it is a composite.', focus: 'traps.0' },
        { say: 'China is not weak. It is hard and holds heavy loads, but it is brittle, so it cracks instead of bending.', focus: 'traps.1' },
        { say: 'And most plastics soften and melt when heated, so they are no good inside an oven.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tennis racket frame must be strong, stiff and light. Which material is the best choice?',
          choices: ['Glass', 'Lead', 'China', 'Carbon fibre'],
          answer: 3,
          working: 'Carbon fibre is a composite that is strong and very light. Glass and china would shatter, and lead is far too heavy.',
        },
      ],
      lines: [
        { say: 'Your turn. A tennis racket frame must be strong, stiff and light. Which material is the best choice? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Carbon fibre is a composite that is strong and very light. Glass and china would shatter, and lead is far too heavy: choice D.', show: 'q2.answer' },
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
          items: ['**Polymers** bend; **ceramics** are hard but **brittle**', '**Composites** combine materials for the best of each', 'Choose by the **property** the job needs most'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Polymer chains bend, while ceramics are hard but brittle.', show: 'sum.0' },
        { say: 'Composites combine materials to get the best of each.', show: 'sum.1' },
        { say: 'And to choose a material, find the property the job needs most. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
