import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import kinds from '@/content/chem8/videos/c8-1-3.ts';

// Exam question for Chemistry 8 lesson 1.3 (elements, compounds and mixtures): sorting air, table
// salt, copper and salt water, and what safe table salt made from sodium and chlorine shows about
// compounds. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's magnet over a mixture of iron and sulfur and over iron sulfide
// (src/video/particles.ts): the mixture's iron stays magnetic, the compound's does not.

const QUESTION = 'Sort each substance as an element, a compound or a mixture: (a) air, (b) table salt (sodium chloride), (c) copper, (d) salt water. (e) Sodium is a soft metal that reacts violently with water, and chlorine is a poisonous gas, yet sodium chloride is safe to eat. What does this show about compounds?';

const video: Explainer = {
  id: 'xq-c8-1-3',
  lessonId: '',
  exam: {
    lesson: 'c8-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sorting Substances. Elements, Compounds and Mixtures',
  thumbnailTitle: 'Sorting Substances',
  thumbnail: 'm',
  summary:
    'A test-style question, solved one small step at a time: sort air, table salt, copper and salt water into elements, compounds and mixtures, and explain how table salt can be safe when sodium and chlorine are dangerous. Air and salt water are mixtures, table salt is a compound and copper is an element, and a compound has new properties of its own.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sorting Substances', subtitle: 'Element, compound or mixture?' }],
      lines: [
        { say: 'In this video, we solve a test-style question about elements, compounds and mixtures. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Mixture, compound, element, mixture; a compound has new properties' }],
      lines: [
        { say: 'Here is the question. Sort each substance as an element, a compound or a mixture: part a, air; part b, table salt, which is sodium chloride; part c, copper; part d, salt water. Part e: sodium is a soft metal that reacts violently with water, and chlorine is a poisonous gas, yet sodium chloride is safe to eat. What does this show about compounds?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'For each one: how many **kinds** of atom, and are they **joined** or just **mixed**?' }],
      lines: [
        { say: 'To sort each substance, we ask two questions: how many kinds of atom does it have, and are they chemically joined or just mixed together?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(kinds, 'm')],
      lines: [
        { say: 'Here is what we need. On the left, grains of iron and sulfur are just stirred together, a mixture. On the right, in iron sulfide, every iron atom is joined to a sulfur atom, a compound.', show: ['m', 'm.labels', 'm.key'] },
        { say: 'Here comes a magnet. In the mixture, the iron keeps its own properties, so it jumps out. In the compound, the iron is joined to sulfur, and the compound is not magnetic, so nothing moves. A compound has new properties of its own.', play: 'm.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Element**: one kind of atom', '**Compound**: elements chemically **joined**', '**Mixture**: substances **not joined**, each keeps its properties'] }],
      lines: [
        { say: 'Here is the plan. An element has one kind of atom.', show: 'plan.0' },
        { say: 'A compound has two or more elements chemically joined.', show: 'plan.1' },
        { say: 'And a mixture has substances that are not joined, so each keeps its own properties.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sort them',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Substance', 'Inside it', 'So it is'], rows: [['air', 'nitrogen, oxygen and more, not joined', 'a **mixture**'], ['table salt', 'sodium and chlorine, **joined**', 'a **compound**'], ['copper', 'only copper atoms', 'an **element**'], ['salt water', 'salt and water, not joined', 'a **mixture**']] }],
      lines: [
        { say: 'Step one. Air is several gases, mostly nitrogen and oxygen, mixed but not joined. So air is a mixture. That is part a.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Table salt is sodium and chlorine chemically joined, so it is a compound. That is part b.', show: 't.1', focus: 't.1' },
        { say: 'Copper has only copper atoms, so it is an element. That is part c.', show: 't.2', focus: 't.2' },
        { say: 'And salt water is salt dissolved in water. The salt and the water are not joined to each other, and you can get the salt back by evaporating the water. So it is a mixture. That is part d.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Step 2: New properties',
      layout: 'center',
      main: [{ kind: 'table', id: 'p', head: ['Substance', 'Properties'], rows: [['sodium', 'soft metal, reacts **violently** with water'], ['chlorine', '**poisonous** green gas'], ['sodium chloride', 'white crystals, **safe** to eat']] }],
      lines: [
        { say: 'Step two. Here are the properties side by side. Sodium is a dangerous metal, and chlorine is a poisonous gas.', show: ['p', 'p.0', 'p.1'] },
        { say: 'But when they are chemically joined, they make sodium chloride, white crystals that we sprinkle on food. A compound has new properties, often nothing like the elements it is made from. That is part e.', show: 'p.2', focus: 'p.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) mixture (b) compound (c) element (d) mixture (e) A compound has **new properties**, different from those of its elements.' },
      ],
      lines: [
        { say: 'Does it make sense? The mixtures can be separated without a reaction, while the salt needs a chemical reaction to split it back into sodium and chlorine.', show: 'ans' },
        { say: 'So air and salt water are mixtures, table salt is a compound, copper is an element, and a compound has new properties of its own.' },
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
            ['Salt water is a **compound**', 'It **looks** like one substance'],
            ['Air is an **element**', 'Air is **several** gases'],
            ['Salt is a **mixture** of sodium and chlorine', 'Its elements are chemically **joined**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Salt water looks like one clear liquid, but the salt and the water are not joined, so it is a mixture.', focus: 'traps.0' },
        { say: 'Air is invisible and seems like one thing, but it is a mixture of nitrogen, oxygen and other gases.', focus: 'traps.1' },
        { say: 'And table salt is not a mixture. If it were, it would still be poisonous, because a mixture keeps the properties of its parts.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which statement is true of a **mixture** but not of a compound?',
          choices: ['It has new properties', 'Its parts are joined', 'Parts in any amount', 'Only a reaction can split it'],
          answer: 2,
          working: 'A mixture can have any amount of each part. A compound has fixed proportions, new properties, and needs a reaction to split it.',
        },
      ],
      lines: [
        { say: 'Your turn. Which statement is true of a mixture but not of a compound? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The parts of a mixture can be in any amount: choice C. A compound has fixed proportions, new properties, and needs a chemical reaction to split it.', show: 'q2.answer' },
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
          items: ['Element: one kind of atom', 'Compound: elements **joined**, with **new** properties', 'Mixture: **not joined**, each part keeps its properties'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An element has one kind of atom.', show: 'sum.0' },
        { say: 'A compound has elements chemically joined, and it has new properties of its own.', show: 'sum.1' },
        { say: 'And in a mixture, the parts are not joined, so each keeps its own properties. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
