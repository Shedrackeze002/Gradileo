import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import signs from '@/content/chem8/videos/c8-3-2.ts';

// Exam question for Chemistry 8 lesson 3.2 (signs of a chemical reaction): zinc in acid fizzes
// and warms up, two clear solutions make a white solid, and boiling water bubbles without a
// reaction. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's zinc fizzing in acid and silver chloride forming as a precipitate,
// up close (src/video/particles.ts).

const QUESTION = 'A class does three experiments. (a) A piece of zinc is dropped into dilute acid. Bubbles form on the zinc and the test tube gets warm. Give two signs that a chemical reaction is happening. (b) Two clear, colourless solutions are mixed, and a white solid appears and sinks. What is a solid that forms like this called? (c) Kofi heats water in a beaker until it bubbles. He says the bubbles show a chemical reaction. Is Kofi right? Explain your answer.';

const video: Explainer = {
  id: 'xq-c8-3-2',
  lessonId: '',
  exam: {
    lesson: 'c8-3-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Fizzing, Precipitates and Boiling Water. Signs of a Chemical Reaction',
  thumbnailTitle: 'Is It a Reaction?',
  thumbnail: 'p',
  summary:
    'A test-style question, solved one small step at a time: what are the signs that zinc and acid are reacting, what is the white solid made when two solutions are mixed, and do the bubbles in boiling water show a reaction? The gas and the warming are two signs, the solid is a precipitate, and the bubbles in boiling water are only steam, so no new substance has been made and Kofi is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is It a Reaction?', subtitle: 'Reading the signs' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the signs of a chemical reaction. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'A gas and a temperature rise; a precipitate; no, the bubbles are steam' }],
      lines: [
        { say: 'Here is the question. A class does three experiments. Part a: a piece of zinc is dropped into dilute acid. Bubbles form on the zinc and the test tube gets warm. Give two signs that a chemical reaction is happening. Part b: two clear, colourless solutions are mixed, and a white solid appears and sinks. What is a solid that forms like this called? Part c: Kofi heats water in a beaker until it bubbles. He says the bubbles show a chemical reaction. Is Kofi right? Explain your answer.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Spot the **signs** of a reaction, and check that a **new substance** is behind each one' }],
      lines: [
        { say: 'We cannot see atoms rearranging, so we look for signs. But a sign only counts if a new substance could be causing it.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(signs, 'p')],
      lines: [
        { say: 'Here is what we need. On the left, a piece of zinc sits in acid. On the right, two solutions are kept apart for now.', show: ['p', 'p.labels'] },
        { say: 'Watch the zinc. Acid particles pull zinc atoms into the solution and are set free. Two of them join as a molecule of hydrogen gas, which rises as a bubble.', play: 'p.fizz', focus: 'p.z' },
        { say: 'Now we mix the solutions. Where a silver particle meets a chloride particle, they join, and the new solid clumps together and sinks.', play: 'p.mix', focus: 'p.s' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Signs: a **gas**, a **colour** change, a **solid**, a **temperature** change, **light**, a **smell**', 'A solid made from two solutions is a **precipitate**', 'A sign counts only if a **new substance** is made'] }],
      lines: [
        { say: 'Here is the plan. The signs of a reaction are a gas, a colour change, a solid appearing, a temperature change, light, or a new smell.', show: 'plan.0' },
        { say: 'A solid made when two solutions are mixed has its own name, a precipitate.', show: 'plan.1' },
        { say: 'And a sign only counts if a new substance has been made.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Zinc and acid',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What we see', 'Sign of a reaction'],
          rows: [
            ['bubbles on the zinc', 'a **gas** is given off'],
            ['the tube gets warm', 'a **temperature change**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The bubbles on the zinc show that a gas is being given off. That gas is hydrogen, a new substance.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'And nobody heated the tube, yet it got warm by itself. That temperature change is the second sign. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: The white solid',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{solution} + \\text{solution} \\to \\text{solid}', '\\text{the solid is a } \\good{\\text{precipitate}}'] }],
      lines: [
        { say: 'Step two. Two clear solutions went in, and a solid that was not there before came out. That is a new substance.', show: 'm.0' },
        { say: 'A solid that forms when two solutions are mixed is called a precipitate. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Boiling water',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['The bubbles are **steam**: water as a gas', 'Steam is still **water**, so nothing new is made', 'Boiling is a **physical** change, so Kofi is **wrong**'] }],
      lines: [
        { say: 'Step three. When water boils, the bubbles are steam, which is water as a gas.', show: 'b.0' },
        { say: 'Steam is still water. Cool it, and it turns back into liquid water, so no new substance has been made.', show: 'b.1' },
        { say: 'So boiling is a physical change, and Kofi is wrong. Bubbles are only a sign of a reaction when the gas is a new substance. That is part c.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) A **gas** is given off, and the **temperature rises**. (b) A **precipitate**. (c) **No**: the bubbles are steam, which is still water, so **no new substance** is made.' },
      ],
      lines: [
        { say: 'Does it make sense? In the first two experiments, new substances appeared. In the third, the water only changed state.', show: 'ans' },
        { say: 'So the zinc gives a gas and gets warm, the white solid is a precipitate, and Kofi\'s bubbles are only steam.' },
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
            ['The bubbles are **air**', 'The gas is new: **hydrogen**'],
            ['The solid is a **solute**', 'A solute **dissolves**; this solid **forms**'],
            ['Kofi is **right**', 'Counted **any** bubbles as a sign'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The bubbles are not air that was trapped in the acid. They are hydrogen, a new gas made by the reaction.', focus: 'traps.0' },
        { say: 'A solute is a substance that dissolves. A precipitate is the opposite: a solid that comes out of the solutions.', focus: 'traps.1' },
        { say: 'And not every bubble means a reaction. The bubbles in boiling water are just water as a gas.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Chalk fizzes in acid: calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide. Which gas makes the fizz?',
          choices: ['Hydrogen', 'Carbon dioxide', 'Oxygen', 'Steam'],
          answer: 1,
          working: 'The only gas among the products is carbon dioxide, so that is what makes the fizz.',
        },
      ],
      lines: [
        { say: 'Your turn. Chalk fizzes in acid. Calcium carbonate and hydrochloric acid make calcium chloride, water and carbon dioxide. Which gas makes the fizz? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The only gas among the products is carbon dioxide, so that makes the fizz: choice B.', show: 'q2.answer' },
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
          items: ['Signs: gas, colour, solid, **temperature**, light, smell', 'A solid from two solutions is a **precipitate**', 'A sign counts only if a **new substance** is made'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The signs of a reaction are a gas, a colour change, a solid, a temperature change, light or a new smell.', show: 'sum.0' },
        { say: 'A solid that forms when two solutions are mixed is a precipitate.', show: 'sum.1' },
        { say: 'And a sign only counts if a new substance has been made. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
