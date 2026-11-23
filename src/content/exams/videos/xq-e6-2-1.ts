import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 2.1 (personification and hyperbole). An exam-style question we wrote, in
// the style of a Grade 6 reading test, on the second verse of William Wordsworth's "I wandered
// lonely as a Cloud" (1815 version, public domain). The answer is D: daffodils have no heads to
// toss and cannot dance, so the line gives them human actions.

const VERSE = ['Continuous as the stars that shine', 'And twinkle on the milky way,', 'They stretched in never-ending line', 'Along the margin of a bay:', 'Ten thousand saw I at a glance,', 'Tossing their heads in sprightly dance.'];

export default englishExam({
  lesson: 'e6-2-1',
  ...ours('a Grade 6 reading test', 'the poem is William Wordsworth’s “I wandered lonely as a Cloud” (public domain)'),
  title: 'Which Line of Wordsworth’s Daffodils Uses Personification?',
  thumbnailTitle: 'Personification',
  subtitle: 'Human actions for non-human things, step by step',
  summary:
    'An exam-style question on William Wordsworth’s poem about daffodils, solved one small step at a time: which line uses personification? We learn how personification differs from a simile and from hyperbole, and test each line to find the flowers behaving like people.',
  intro: [
    'In this video, we solve an exam-style question about personification in a poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The poem is William Wordsworth’s famous poem about daffodils.',
  ],
  passage: {
    lines: VERSE,
    by: 'William Wordsworth, “I wandered lonely as a Cloud” (second verse)',
    say: [
      'First, a little background. In the first verse, the poet is out walking and suddenly sees a crowd of golden daffodils beside a lake.',
      'Here is the second verse. Continuous as the stars that shine and twinkle on the milky way, they stretched in never-ending line along the margin of a bay: ten thousand saw I at a glance, tossing their heads in sprightly dance.',
    ],
  },
  question: {
    prompt: 'Which line from the verse uses **personification**?',
    text: 'Read the second verse of “I wandered lonely as a Cloud” by William Wordsworth. Which line from the verse uses personification?',
    choices: ['Continuous as the stars that shine', 'They stretched in never-ending line', 'Ten thousand saw I at a glance,', 'Tossing their heads in sprightly dance.'],
    answer: 3,
    working: 'Flowers do not have heads to toss, and they cannot dance: the line gives them human actions.',
    say: ['Which line from the verse uses personification? A: Continuous as the stars that shine. B: They stretched in never-ending line. C: Ten thousand saw I at a glance. D: Tossing their heads in sprightly dance.'],
  },
  ask: [
    ['**They** are the daffodils', 'First, notice that they, all through the verse, means the daffodils.'],
    ['Which line makes them act like **people**?', 'Personification is giving human qualities to something that is not human, so we need the line that makes the flowers act like people.'],
  ],
  know: {
    title: 'Personification and hyperbole',
    md: '**Personification** gives **human** actions or feelings to something **not human**: *The wind whispered.* **Hyperbole** is deliberate **exaggeration**: *I’ve told you a million times.* A **simile** compares with *like* or *as*.',
    say: [
      'Here is what we need. Personification gives human actions or feelings to something that is not human, as in: the wind whispered.',
      'Hyperbole is deliberate exaggeration, as in: I have told you a million times. And a simile compares two things with like or as.',
      'This verse has all three, so we must tell them apart.',
    ],
  },
  plan: [
    ['Name the **device** in each line', 'Here is the plan. Name the device in each line.'],
    ['Find the one where the flowers do something **only people do**', 'Then find the one where the flowers do something only people do.'],
  ],
  steps: [
    scene('Step 1: Name each device', [quote('p', VERSE), table('t', ['Line', 'Device'], [['Continuous **as** the stars', 'simile'], ['**never-ending** line', 'hyperbole'], ['**Ten thousand** at a glance', 'hyperbole'], ['**Tossing their heads** in sprightly **dance**', '[[good:personification]]']])], [
      { say: 'Step one. Pause and name the device in each line.', show: 'p', wait: 3 },
      { say: 'Continuous as the stars compares the flowers to stars, using as. That is a simile.', show: 't.0', focus: 'p.0' },
      { say: 'A never-ending line cannot be true, because the flowers must end somewhere. That is exaggeration: hyperbole.', show: 't.1', focus: 'p.2' },
      { say: 'Ten thousand at a glance is also hyperbole. Nobody could count ten thousand flowers in one look.', show: 't.2', focus: 'p.4' },
      { say: 'Tossing their heads in sprightly dance: flowers have no heads to toss, and they cannot dance. Those are things people do. That is personification.', show: 't.3', focus: 'p.5' },
    ]),
    scene('Step 2: What it suggests', [text('n', 'The daffodils seem **alive**, **cheerful** and full of **energy**, like dancers.', 'lg'), text('a', 'The answer is **D**.')], [
      { say: 'Step two. Why does Wordsworth do this? Sprightly means lively. Picturing the daffodils as dancers makes them seem alive and joyful, nodding in the wind.', show: 'n' },
      { say: 'So the line that uses personification is D: tossing their heads in sprightly dance.', show: 'a' },
    ]),
  ],
  check: [
    ['Swap in a **person**: *the children tossed their heads in dance* ✓ normal', 'Let us check. If we swap in people, the children tossed their heads in a lively dance, the line is perfectly normal. So it describes human actions.'],
    ['For flowers, it can only be **personification**', 'Given to flowers, those actions can only be personification.'],
  ],
  traps: {
    say: 'Each wrong answer is a real device, just not the one asked for.',
    rows: [
      ['A', 'A **simile**: it compares with *as*', 'Choice A compares the flowers to stars with as. That is a simile, not personification.'],
      ['C', '**Hyperbole**: an exaggerated number', 'Choice C is hyperbole. Seeing is something people do, but here it is the poet, a person, who sees.'],
      ['B', '**Hyperbole**: a line cannot be never-ending', 'Choice B is hyperbole too. Stretching is not only a human action; a road can stretch.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses **personification**?',
    choices: ['The old house groaned as the storm attacked its walls.', 'The house was as cold as a fridge.', 'This house is a million years old.', 'The house had five bedrooms.'],
    answer: 0,
    working: 'A house cannot groan, and a storm cannot attack: human actions.',
    ask: 'Which sentence uses personification?',
    reveal: 'The answer is A. Groaning and attacking are things people do, given to a house and a storm. B is a simile, C is hyperbole, and D is a plain fact.',
  },
  sum: [
    ['**Personification**: human actions for a non-human thing', 'Here is what to remember. Personification gives human actions or feelings to something that is not human.'],
    ['**Hyperbole**: deliberate exaggeration · **simile**: *like* or *as*', 'Hyperbole is deliberate exaggeration, and a simile compares with like or as.'],
    ['Test: would the action be normal for a **person**?', 'To test for personification, ask whether the action would be normal for a person. For more on personification and hyperbole, watch this lesson’s explainer video on Gradileo.'],
  ],
});
