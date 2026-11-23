import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import changes from '@/content/chem8/videos/c8-3-1.ts';

// Exam question for Chemistry 8 lesson 3.1 (physical and chemical changes): sort four kitchen
// changes into physical and chemical, and explain why dissolving sugar is a physical change.
// Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's water boiling next to hydrogen and oxygen reacting, up close
// (src/video/particles.ts).

const QUESTION = 'Jo notices four changes while making breakfast: butter melting in a hot pan, bread turning black in the toaster, sugar dissolving in tea, and an egg being fried. (a) Which two of these are physical changes? (b) Which two are chemical changes? (c) Jo says the sugar must have had a chemical change, because it has disappeared. Explain why Jo is wrong, and say how the sugar could be got back.';

const video: Explainer = {
  id: 'xq-c8-3-1',
  lessonId: '',
  exam: {
    lesson: 'c8-3-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Melting, Toasting, Dissolving and Frying. Physical and Chemical Changes',
  thumbnailTitle: 'Physical or Chemical?',
  thumbnail: 'pc',
  summary:
    'A test-style question, solved one small step at a time: which kitchen changes are physical and which are chemical, and is dissolving sugar a chemical change? Melting butter and dissolving sugar make no new substance, so they are physical, while burnt toast and a fried egg are new substances, so those changes are chemical. The sugar is still there in the tea and comes back if the water is evaporated.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Physical or Chemical?', subtitle: 'Four changes at breakfast' }],
      lines: [
        { say: 'In this video, we solve a test-style question about physical and chemical changes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Physical: butter, sugar; chemical: toast, egg; the sugar is still there' }],
      lines: [
        { say: 'Here is the question. Jo notices four changes while making breakfast: butter melting in a hot pan, bread turning black in the toaster, sugar dissolving in tea, and an egg being fried. Part a: which two of these are physical changes? Part b: which two are chemical changes? Part c: Jo says the sugar must have had a chemical change, because it has disappeared. Explain why Jo is wrong, and say how the sugar could be got back.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'For each change, ask one question: has a **new substance** been made?' }],
      lines: [
        { say: 'Every part of this question comes down to one test. For each change, we ask whether a new substance has been made.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(changes, 'pc')],
      lines: [
        { say: 'Here is what we need. On the left is liquid water. On the right is a mix of hydrogen and oxygen gas.', show: ['pc', 'pc.labels', 'pc.thermo'] },
        { say: 'Watch the water boil. Its molecules spread out into a gas, but every one is still a water molecule. No new substance is made, so this is a physical change.', play: 'pc.boil', focus: 'pc.w' },
        { say: 'Now a spark sets off the gases. The atoms join up in a new way, as water molecules that were not there before. A new substance is made, so this is a chemical change.', play: 'pc.spark', show: 'pc.tally', focus: 'pc.h' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**No new substance**: a physical change', '**New substance made**: a chemical change', 'A physical change can usually be **undone**'] }],
      lines: [
        { say: 'Here is the plan. If no new substance is made, the change is physical.', show: 'plan.0' },
        { say: 'If a new substance is made, the change is chemical.', show: 'plan.1' },
        { say: 'And a physical change can usually be undone, which helps with the last part.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sort the changes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'New substance?', 'Kind'],
          rows: [
            ['butter melting', 'no, still butter', '**physical**'],
            ['sugar dissolving', 'no, still sugar', '**physical**'],
            ['bread turning black', 'yes, black carbon', '**chemical**'],
            ['egg frying', 'yes, cooked egg', '**chemical**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Melted butter is still butter, and it sets again when it cools. No new substance, so it is a physical change.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Dissolved sugar is still sugar, spread through the tea. That is a physical change too. These two are part a.', show: 't.1', focus: 't.1' },
        { say: 'Now the black on burnt toast is a new substance, mostly carbon, and it will never turn back into bread. That is a chemical change.', show: 't.2', focus: 't.2' },
        { say: 'And a fried egg has changed for good: heat makes new substances in it, so it can never be runny again. These two are part b.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Step 2: Where did the sugar go?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['The sugar breaks into particles too small to **see**', 'It is still **there**: the tea tastes sweet', 'No new substance, so it is **physical**'] }],
      lines: [
        { say: 'Step two. When sugar dissolves, it breaks up into particles far too small to see, which spread out among the water particles.', show: 's.0' },
        { say: 'But it has not gone. Taste the tea, and it is sweet, so the sugar is still there.', show: 's.1' },
        { say: 'Nothing new has been made, so Jo is wrong: dissolving is a physical change.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Getting it back',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{heat the solution} \\to \\text{water evaporates}', '\\good{\\text{sugar is left behind}}'] }],
      lines: [
        { say: 'Step three. A physical change can usually be undone. Heat the sugar solution gently, and the water evaporates.', show: 'm.0' },
        { say: 'The sugar is left behind in the dish. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Butter melting** and **sugar dissolving**. (b) **Bread turning black** and **the egg frying**. (c) The sugar is still there, so no new substance is made; **evaporate the water** to get it back.' },
      ],
      lines: [
        { say: 'Does it make sense? The two physical changes can be undone, and the two chemical changes cannot, which is just what we expect.', show: 'ans' },
        { say: 'So melting and dissolving are physical, toasting and frying are chemical, and the sugar comes back when the water evaporates.' },
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
            ['Dissolving is **chemical**', 'Thought **out of sight** meant gone'],
            ['Melting is **chemical**', 'The butter **looks** different'],
            ['Frying is **physical**', 'Thought heating is just a **change of state**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sugar you cannot see is still there. Out of sight does not mean a new substance.', focus: 'traps.0' },
        { say: 'Melted butter looks different, but a change in state or shape is still physical.', focus: 'traps.1' },
        { say: 'And heating does not always just melt or boil something. The egg turns into new substances, so frying is chemical.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a physical change?',
          choices: ['A puddle freezing', 'A candle wick burning', 'A bike chain rusting', 'A cake baking'],
          answer: 0,
          working: 'Ice is still water, so freezing makes no new substance. The other three all make new substances.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a physical change? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Ice is still water, so a puddle freezing makes no new substance: choice A. Burning, rusting and baking all make new substances.', show: 'q2.answer' },
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
          items: ['Ask: has a **new substance** been made?', '**Physical**: melting, dissolving. **Chemical**: burning, cooking', 'A dissolved solid is still **there**, and comes back on evaporating'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. To decide, ask whether a new substance has been made.', show: 'sum.0' },
        { say: 'Melting and dissolving are physical changes, and burning and cooking are chemical changes.', show: 'sum.1' },
        { say: 'And a dissolved solid is still there, so it comes back when the water evaporates. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
