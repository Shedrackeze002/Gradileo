import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 4.3 (satire). An exam-style question we wrote, in the style of a Grade 11
// reading test, on Jonathan Swift's "A Modest Proposal" (1729), which is in the public domain. The answer
// is D: Swift's monstrous, calmly argued proposal attacks the cruel indifference of the powerful towards
// Ireland's starving poor.

const LINES = ['I have been assured by a very knowing American of my acquaintance in London, that a young healthy child well nursed is at a year old a most delicious, nourishing, and wholesome food, whether stewed, roasted, baked, or boiled…'];

export default englishExam({
  lesson: 'e11-4-3',
  ...ours('a Grade 11 reading test', 'the essay is Jonathan Swift’s “A Modest Proposal” (1729), in the public domain'),
  title: 'What Is Swift Really Attacking in “A Modest Proposal”?',
  thumbnailTitle: 'Satire',
  subtitle: 'Reading satire, step by step',
  summary:
    'An exam-style question on Jonathan Swift’s “A Modest Proposal”, solved one small step at a time: in a calm, reasonable voice, Swift suggests that the poor of Ireland sell their babies as food. We spot the irony, the exaggeration and the deadpan tone, and name the real target.',
  intro: [
    'In this video, we solve an exam-style question about satire. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Swift’s essay, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Jonathan Swift, “A Modest Proposal” (1729)',
    say: ['First, the context. In seventeen twenty-nine, many poor families in Ireland were starving, while wealthy landlords, many living in England, did little to help. Swift’s essay offers a “modest proposal”. I have been assured by a very knowing American of my acquaintance in London, that a young healthy child well nursed is at a year old a most delicious, nourishing, and wholesome food, whether stewed, roasted, baked, or boiled.'],
  },
  question: {
    prompt: 'What is Swift **really** criticising?',
    text: 'Read the passage from “A Modest Proposal”. What is Swift really criticising?',
    choices: [
      'Irish cooking.',
      'Families who have too many children.',
      'Doctors who give bad advice.',
      'The cruel indifference of the rich and powerful towards Ireland’s starving poor.',
    ],
    answer: 3,
    working: 'A **monstrous** idea, argued **calmly**: Swift exaggerates the way the powerful already treat the poor as **things** to be used.',
    say: [
      'What is Swift really criticising?',
      'A: Irish cooking. B: Families who have too many children. C: Doctors who give bad advice. D: The cruel indifference of the rich and powerful towards Ireland’s starving poor.',
    ],
  },
  ask: [
    ['Swift does **not** mean what he says', 'Swift does not mean what he says.'],
    ['What is his **real** target?', 'We need his real target.'],
  ],
  know: {
    title: 'Satire and its tools',
    md: '**Satire** mocks a person, group or idea to expose a **fault** and push for **change**. Its tools: **irony** (saying the opposite of what is meant), **exaggeration** (pushing an idea to absurdity), **understatement** (making something serious sound small), and **parody** (imitating a style to mock it). A **deadpan** (calm, serious) voice makes a shocking idea even more shocking. Always ask: **who or what** is the target?',
    say: [
      'Here is the idea we need. Satire mocks a person, group or idea to expose a fault and push for change. Its tools are irony, saying the opposite of what is meant; exaggeration, pushing an idea to absurdity; understatement, making something serious sound small; and parody, imitating a style to mock it.',
      'A calm, serious, deadpan voice makes a shocking idea even more shocking. Always ask who or what the real target is.',
    ],
  },
  plan: [
    ['Spot the **tools**', 'Here is the plan. First, spot the satirical tools.'],
    ['Ask who **really** treats the poor this way', 'Second, ask who really treats the poor this way.'],
    ['Name the **target**', 'Third, name the target.'],
  ],
  steps: [
    scene('Step 1: The tools', [table('t', ['Words', 'Tool', 'Effect'], [['*a most delicious, nourishing, and wholesome food*', '**deadpan** tone', 'horror described like a **recipe**'], ['eating children to solve poverty', '**exaggeration**', 'an **absurd**, monstrous idea'], ['a *modest* proposal', '**irony**', 'nothing about it is modest']])], [
      { say: 'Step one. Swift writes delicious, nourishing and wholesome, as calmly as a recipe. That deadpan tone makes the horror worse.', show: 't.0' },
      { say: 'Eating children to solve poverty is an exaggeration, pushed to absurdity. And calling it modest is irony.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The target', [quote('p', ['…a young healthy child… [[bad:a most delicious, nourishing, and wholesome food]]…']), text('n', 'The powerful **already** treat the poor as **things** to use: Swift just says it **literally**.'), text('a', 'Target: the **cruel indifference** of the powerful → **D**', 'lg')], [
      { say: 'Step two. Who already treated the poor as things to be used? The landlords and the powerful, who took rents while families starved. Swift simply says it literally, to shock readers into seeing it.', show: ['p', 'n'] },
      { say: 'His target is the cruel indifference of the rich and powerful towards Ireland’s poor. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Swift says landlords have *already devoured* the parents', 'Let us check. Later, Swift says the landlords, who have already devoured most of the parents, seem to have the best title, meaning the best claim, to the children.'],
    ['The landlords are the **target**', 'So the landlords are the target. D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Reads the essay **literally**: Swift blames the **powerful**, not the poor', 'Choice B is the trap. It reads the essay literally, but Swift blames the powerful, not poor families.'],
      ['A', 'The recipe language is **ironic**', 'Choice A: the recipe language is ironic.'],
      ['C', 'The *American* is part of the **joke**', 'Choice C: the knowing American is part of the joke, not the target.'],
    ],
  },
  yourTurn: {
    prompt: 'A reporter calls a **hurricane** that flattened a town *“a bit of a breeze.”* Which satirical tool is this?',
    choices: ['hyperbole', 'parody', 'understatement', 'an allusion'],
    answer: 2,
    working: 'Making something **serious** sound **small**: **understatement**.',
    ask: 'A reporter calls a hurricane that flattened a town, a bit of a breeze. Which satirical tool is this? A: hyperbole. B: parody. C: understatement. D: an allusion.',
    reveal: 'The answer is C, understatement. It makes a disaster sound tiny, which highlights how serious it really was.',
  },
  sum: [
    ['Satire **mocks** to push for **change**', 'Here is what to remember. Satire mocks something to push for change.'],
    ['Tools: **irony**, **exaggeration**, **understatement**, **parody**', 'Its tools are irony, exaggeration, understatement and parody.'],
    ['Always find the **real target**', 'And always find the real target. For more on satire, watch this lesson’s explainer video on Gradileo.'],
  ],
});
