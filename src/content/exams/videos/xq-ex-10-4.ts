import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 10.4 (Animal Farm). An exam-style question we wrote, in the style of a GCSE
// English Literature exam. George Orwell's novella is still in copyright in some countries, so it is
// described in our own words and not quoted. The answer is A: those in power rewrite the rules, and the
// past, to keep control.

export default englishExam({
  lesson: 'ex-10-4',
  ...ours('a GCSE English Literature exam', 'the novella is George Orwell’s Animal Farm (1945), still in copyright in some countries, so it is described in our own words and not quoted'),
  title: 'Why Do the Pigs Change the Commandments?',
  thumbnailTitle: 'Animal Farm',
  subtitle: 'Power and propaganda, step by step',
  summary:
    'An exam-style question on Animal Farm, solved one small step at a time. After the revolution, the animals paint seven commandments on the barn wall. We track how the pigs secretly change them, and explain what this shows about power.',
  intro: [
    'In this video, we solve an exam-style question about Animal Farm. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam. The novella is still in copyright in some countries, so we describe it in our own words.',
  ],
  question: {
    prompt: 'After the revolution, the animals paint seven commandments on the barn wall. Over time, the pigs **secretly change** them, for example adding words so that sleeping in beds is allowed. What does this mainly show?',
    text: 'After the revolution, the animals paint seven commandments on the barn wall. Over time, the pigs secretly change them, for example adding words so that sleeping in beds is allowed. What does this mainly show?',
    choices: [
      'Those in power rewrite the rules, and even the past, to keep control and their privileges.',
      'The pigs are poor at spelling.',
      'The animals voted to change the rules together.',
      'The rules were never important to anyone.',
    ],
    answer: 0,
    working: 'The pigs break a rule → **change** the rule → animals **doubt** their memory: power **rewrites** truth.',
    say: [
      'After the revolution, the animals paint seven commandments on the barn wall. Over time, the pigs secretly change them, for example adding words so that sleeping in beds is allowed. What does this mainly show?',
      'A: Those in power rewrite the rules, and even the past, to keep control and their privileges. B: The pigs are poor at spelling. C: The animals voted to change the rules together. D: The rules were never important to anyone.',
    ],
  },
  ask: [
    ['The pigs **secretly** change the rules', 'The pigs secretly change the rules.'],
    ['What does this **show**?', 'We need to say what this shows.'],
  ],
  know: {
    title: 'Animal Farm',
    md: 'The animals of Manor Farm overthrow **Mr Jones**, inspired by **Old Major’s** dream of equality. The pigs take charge. **Napoleon** uses his dogs to drive out **Snowball**, and **Squealer** twists the truth with **propaganda**. The loyal horse **Boxer** works himself to collapse and is sold. By the end, the pigs walk on two legs and cannot be told apart from humans. Orwell wrote it as an **allegory** of the **Russian Revolution** and **Stalin**. Themes: **power**, **corruption**, **propaganda**.',
    say: [
      'Here is the idea we need. The animals of Manor Farm overthrow Mr Jones, inspired by Old Major’s dream of equality, and the pigs take charge. Napoleon uses his dogs to drive out Snowball, and Squealer twists the truth with propaganda. The loyal horse Boxer works himself to collapse and is sold.',
      'By the end, the pigs walk on two legs and cannot be told apart from the humans. Orwell wrote the story as an allegory of the Russian Revolution and Stalin. Its themes are power, corruption and propaganda.',
    ],
  },
  plan: [
    ['**Why** do the pigs change them?', 'Here is the plan. First, why do the pigs change the commandments?'],
    ['How do the animals **react**?', 'Second, how do the animals react?'],
    ['What does it **show**?', 'Third, what does it show?'],
  ],
  steps: [
    scene('Step 1: Why and how', [table('t', ['Step', 'What happens'], [['1', 'the pigs **break** a rule (sleeping in beds)'], ['2', 'they **add words** to the rule so it fits'], ['3', 'the animals think they must have **remembered wrongly**']])], [
      { say: 'Step one. The pigs break a commandment, for example by sleeping in beds.', show: 't.0' },
      { say: 'Instead of stopping, they add words to the rule, so that what they did is now allowed.', show: 't.1' },
      { say: 'And the animals, who cannot read well, decide they must have remembered wrongly.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: What it shows', [text('m', 'Change the **rules**, then change what people **remember**'), text('a', 'Power rewrites rules and the **past** → **A**', 'lg')], [
      { say: 'Step two. By changing the written rules, the pigs also change what the animals believe about the past.', show: 'm' },
      { say: 'Those in power rewrite the rules, and even history, to keep control and their privileges. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['By the end, only **one** commandment is left, about some animals being **more equal**', 'Let us check. By the end, a single rule remains, which says some animals are more equal than others.'],
    ['the **opposite** of the revolution’s aim', 'That is the opposite of the revolution’s aim. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'The changes are **secret**, not voted on', 'Choice C is the trap. Rules can change fairly by vote, but these changes are secret.'],
      ['B', 'The changes are **deliberate**', 'Choice B: the changes are deliberate, not spelling mistakes.'],
      ['D', 'The rules **mattered**, which is why they were changed', 'Choice D: the rules mattered, which is exactly why the pigs changed them.'],
    ],
  },
  yourTurn: {
    prompt: 'Which character is chased off the farm by Napoleon’s dogs?',
    choices: ['Boxer', 'Squealer', 'Benjamin', 'Snowball'],
    answer: 3,
    working: 'Napoleon’s rival, **Snowball**.',
    ask: 'Which character is chased off the farm by Napoleon’s dogs? A: Boxer. B: Squealer. C: Benjamin. D: Snowball.',
    reveal: 'The answer is D, Snowball. Napoleon then blames him for everything that goes wrong on the farm.',
  },
  sum: [
    ['The pigs **rewrite** the rules to suit themselves', 'Here is what to remember. The pigs rewrite the rules to suit themselves.'],
    ['Changing the rules changes **memory**', 'Changing the rules changes what the animals remember.'],
    ['Themes: **power**, **corruption**, **propaganda**', 'And the novella’s themes are power, corruption and propaganda. For more on Animal Farm, watch this lesson’s explainer video on Gradileo.'],
  ],
});
