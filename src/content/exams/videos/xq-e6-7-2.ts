import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 7.2 (informational writing). An exam-style question we wrote, in the style
// of a Grade 6 writing test, on a short paragraph we wrote. The answer is B, "As a result": the second
// sentence is an effect of the first.

export default englishExam({
  lesson: 'e6-7-2',
  ...ours('a Grade 6 writing test', 'the paragraph is by Gradileo'),
  title: 'Which Transition Best Connects the Two Ideas?',
  thumbnailTitle: 'Transitions',
  subtitle: 'Connecting ideas in informational writing, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a paragraph about bees has a gap between two sentences, and we must choose the transition that connects them. We work out how the two ideas are related, sort transitions by their job, and test the best one in the gap.',
  intro: [
    'In this video, we solve an exam-style question about transitions in informational writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 writing test.',
  ],
  passage: {
    lines: ['Bees carry pollen from flower to flower, which helps plants make fruit and seeds. In many places, bee numbers are falling. ______, some farmers now have fewer fruits on their trees.'],
    by: 'A paragraph written for Gradileo',
    say: ['First, read the paragraph. Bees carry pollen from flower to flower, which helps plants make fruit and seeds. In many places, bee numbers are falling. Blank, some farmers now have fewer fruits on their trees.'],
  },
  question: {
    prompt: 'Which transition best fills the gap?',
    text: 'Read the paragraph about bees. Which transition best fills the gap?',
    choices: ['For example', 'As a result', 'On the other hand', 'First of all'],
    answer: 1,
    working: 'Fewer fruits is an **effect** of fewer bees, so we need a **cause and effect** transition.',
    say: ['Which transition best fills the gap? A: For example. B: As a result. C: On the other hand. D: First of all.'],
  },
  ask: [
    ['The gap sits **between two ideas**', 'The gap sits between two ideas: falling bee numbers, and fewer fruits.'],
    ['Which transition shows **how they connect**?', 'We need the transition that shows how those ideas connect.'],
  ],
  know: {
    title: 'Transitions and their jobs',
    md: 'A **transition** shows how two ideas are linked. **Cause and effect**: *as a result, so, therefore*. **Example**: *for example, for instance*. **Contrast**: *however, on the other hand*. **Order**: *first of all, next, finally*.',
    say: [
      'Here is the idea we need. A transition is a word or phrase that shows how two ideas are linked, and each one has a job.',
      'As a result, so and therefore show cause and effect. For example and for instance give an example. However and on the other hand show a contrast. First of all, next and finally show order.',
    ],
  },
  plan: [
    ['Work out how the **two ideas** relate', 'Here is the plan. First, work out how the two ideas relate.'],
    ['Pick the transition with that **job**', 'Second, pick the transition that does that job.'],
    ['Read it **in the gap**', 'Third, read it in the gap to check.'],
  ],
  steps: [
    scene('Step 1: How the ideas relate', [text('c', '**Cause:** bee numbers are falling', 'lg'), text('e', '**Effect:** fewer fruits on the trees', 'lg')], [
      { say: 'Step one. Bees help plants make fruit. So if there are fewer bees, there is less fruit.', show: 'c' },
      { say: 'Falling bee numbers is the cause, and fewer fruits is the effect.', show: 'e' },
    ]),
    scene('Step 2: The job of each transition', [table('t', ['Transition', 'Job', 'Fits?'], [['For example', 'gives an **example**', '[[bad:✗]]'], ['As a result', '**cause and effect**', '[[good:✓]]'], ['On the other hand', '**contrast**', '[[bad:✗]]'], ['First of all', '**order**', '[[bad:✗]]']])], [
      { say: 'Step two. For example gives an example, and on the other hand shows a contrast. Neither fits.', show: ['t.0', 't.2'] },
      { say: 'First of all starts a list, but we are in the middle of a paragraph.', show: 't.3' },
      { say: 'As a result shows cause and effect. That is the job we need.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 3: Read it in the gap', [quote('p', ['In many places, bee numbers are falling. [[good:As a result]], some farmers now have fewer fruits on their trees.']), text('a', 'The answer is **B, As a result**.')], [
      { say: 'Step three. In many places, bee numbers are falling. As a result, some farmers now have fewer fruits on their trees. It reads smoothly. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['The first sentence says bees **help plants make fruit**', 'Let us check. The first sentence told us bees help plants make fruit.'],
    ['So fewer bees **leads to** fewer fruits', 'So fewer bees leads to fewer fruits: a cause and its effect. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Fewer fruits is an **effect**, not an example', 'Choice A is the trap. Fewer fruits might look like an example of a problem, but it is caused by the falling bee numbers.'],
      ['C', 'There is **no contrast**', 'Choice C needs two ideas that pull in different directions.'],
      ['D', 'Belongs at the **start** of a list', 'Choice D belongs at the start of a list of steps or reasons.'],
    ],
  },
  yourTurn: {
    prompt: 'Which transition best fills the gap? *Many animals sleep through winter. ______, bears can sleep for up to seven months.*',
    choices: ['As a result', 'For example', 'However', 'Finally'],
    answer: 1,
    working: 'Bears are **one example** of animals that sleep through winter.',
    ask: 'Many animals sleep through winter. Blank, bears can sleep for up to seven months. Which transition best fills the gap? A: As a result. B: For example. C: However. D: Finally.',
    reveal: 'The answer is B, for example. Bears are one example of animals that sleep through winter.',
  },
  sum: [
    ['A **transition** shows how two ideas are **linked**', 'Here is what to remember. A transition shows how two ideas are linked.'],
    ['Know the jobs: **cause and effect**, **example**, **contrast**, **order**', 'Know their jobs: cause and effect, example, contrast and order.'],
    ['Find the link first, then **test** the transition in the gap', 'Find the link between the ideas first, then test the transition in the gap. For more on informational writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
