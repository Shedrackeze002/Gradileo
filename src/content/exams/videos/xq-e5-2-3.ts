import { englishExam, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 2.3 (images and the senses). An exam-style question we wrote, in the
// style of the key stage 2 English reading test, on the second verse of Robert Louis Stevenson's
// "Windy Nights" (A Child's Garden of Verses, 1885, public domain). The answer is B, hearing:
// "crying aloud", "low and loud" and the gallop are sounds, heard in the dark.

const VERSE = ['Whenever the trees are crying aloud,', 'And ships are tossed at sea,', 'By, on the highway, low and loud,', 'By at the gallop goes he.', 'By at the gallop he goes, and then', 'By he comes back at the gallop again.'];

export default englishExam({
  lesson: 'e5-2-3',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question by Gradileo; the poem is Robert Louis Stevenson’s “Windy Nights” (1885, public domain)',
  verbatim: false,
  title: 'Which Sense Does “Windy Nights” Appeal To?',
  thumbnailTitle: 'Images and the Senses',
  subtitle: 'Sensory details, step by step',
  summary:
    'An exam-style question on Robert Louis Stevenson’s poem “Windy Nights”, solved one small step at a time: which sense does the second verse appeal to most? We sort each image by the sense it uses, count them, and see why a poem set in the dark leans on sound.',
  intro: [
    'In this video, we solve an exam-style question about images and the senses in a poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of the reading test that eleven-year-olds take in England. The poem is by Robert Louis Stevenson, from eighteen eighty-five.',
  ],
  passage: {
    lines: VERSE,
    by: 'Robert Louis Stevenson, “Windy Nights” (second verse)',
    say: [
      'First, a little background. In the first verse, a mysterious man rides by on a horse all night long, in the dark and wet, when the moon and stars are hidden.',
      'Here is the second verse. Whenever the trees are crying aloud, and ships are tossed at sea, by, on the highway, low and loud, by at the gallop goes he. By at the gallop he goes, and then by he comes back at the gallop again.',
    ],
  },
  question: {
    prompt: 'Which sense does the second verse of “Windy Nights” appeal to most?',
    text: 'Read the second verse of “Windy Nights” by Robert Louis Stevenson. Which sense does the second verse appeal to most?',
    choices: ['sight', 'hearing', 'touch', 'smell'],
    answer: 1,
    working: '“crying aloud”, “low and loud” and the repeated **gallop** are all sounds.',
    say: ['Which sense does the second verse of Windy Nights appeal to most? A: sight. B: hearing. C: touch. D: smell.'],
  },
  ask: [
    ['Poems make **images** for the senses', 'Poems paint pictures with words, called images, and each image works on one of our senses.'],
    ['Which sense does **this verse** use most?', 'The question asks which sense this verse uses the most.'],
  ],
  know: {
    title: 'Imagery',
    md: '**Imagery** is language that appeals to the **senses**: **sight**, **hearing**, **touch**, **taste** and **smell**. Ask: *if I were there, what would I see, hear, feel, taste or smell?*',
    say: [
      'Here is the idea we need. Imagery is language that appeals to the senses: sight, hearing, touch, taste and smell.',
      'To find the sense, imagine you are inside the poem, and ask what you would see, hear, feel, taste or smell.',
    ],
  },
  plan: [
    ['Find each **image** in the verse', 'Here is the plan. First, find each image in the verse.'],
    ['Sort each one by its **sense**', 'Second, sort each image by the sense it appeals to.'],
    ['See which sense comes up **most**', 'Third, see which sense comes up the most.'],
  ],
  steps: [
    scene('Step 1: Sort the images', [
      quote('p', VERSE),
      table('t', ['Image', 'Sense'], [['trees **crying aloud**', 'hearing'], ['ships **tossed** at sea', 'sight'], ['**low and loud**', 'hearing'], ['at the **gallop**, again and again', 'hearing']]),
    ], [
      { say: 'Step one. Pause and look for words about sound, sight or feeling.', show: 'p', wait: 3 },
      { say: 'The trees are crying aloud. That is the wind howling through them, so it is a sound.', show: 't.0', focus: 'p.0' },
      { say: 'Ships tossed at sea is something we could picture, so it is sight.', show: 't.1', focus: 'p.1' },
      { say: 'Low and loud tells us how the rider sounds as he passes.', show: 't.2', focus: 'p.2' },
      { say: 'And the gallop, repeated three times, is the drumming of hooves.', show: 't.3', focus: ['p.3', 'p.4', 'p.5'] },
    ]),
    scene('Step 2: Count and explain', [text('n', '**hearing** ×3 · sight ×1 → the verse is mostly about **sound**', 'lg'), text('w', 'It is **dark**: the moon and stars are hidden, so the speaker **hears** the rider instead of seeing him.')], [
      { say: 'Step two. Three images are sounds, and only one is something we see. So the verse appeals most to hearing.', show: 'n' },
      { say: 'This makes sense. The first verse told us the moon and stars are hidden. In the dark, you cannot see the rider. You can only hear him gallop past, and back again.', show: 'w' },
      { say: 'So the answer is B, hearing.' },
    ]),
  ],
  check: [
    ['“Crying aloud”, “loud”, “gallop”: all **sounds**', 'Let us check. The key words, crying aloud, loud and gallop, are all sounds.'],
    ['Nothing to **taste** or **smell**, and little to **see**', 'There is nothing to taste or smell, and only one thing to see. Hearing wins clearly.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Pictured the scene, but **missed** that it is dark', 'Choice A is tempting because we can imagine the scene. But the poem is set in the dark, and its words are about sound.'],
      ['C', 'Thought of being **tossed** about', 'Choice C grabs the word tossed. But it is the ships that are tossed, and we watch them; the speaker does not feel it.'],
      ['D', 'No word in the verse is about **smell**', 'Choice D has no evidence at all. Every answer must come from words in the poem.'],
    ],
  },
  yourTurn: {
    prompt: '*The bread came out of the oven, golden and warm, filling the kitchen with its sweet, yeasty scent.* Which sense does the word **scent** appeal to?',
    choices: ['hearing', 'touch', 'smell', 'taste'],
    answer: 2,
    working: 'A **scent** is something you smell.',
    ask: 'The bread came out of the oven, golden and warm, filling the kitchen with its sweet, yeasty scent. Which sense does the word scent appeal to?',
    reveal: 'The answer is C, smell. A scent is a smell. Golden appeals to sight, and warm to touch, but the question asks about scent.',
  },
  sum: [
    ['**Imagery** appeals to the five senses', 'Here is what to remember. Imagery appeals to the five senses.'],
    ['Sort each image: see, hear, touch, taste or smell?', 'To find the main sense, sort each image by the sense it uses.'],
    ['Use the **setting**: in the dark, we hear', 'And use the setting: in the dark, a poem leans on sound. For more on images and the senses, watch this lesson’s explainer video on Gradileo.'],
  ],
});
