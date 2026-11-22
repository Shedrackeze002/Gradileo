import { englishExam, quote, scene, text, bullets } from '../english.ts';

// Grade 5 English, lesson 2.2 (similes and metaphors). An exam-style question we wrote, in the
// style of the key stage 2 English reading test, on Robert Louis Stevenson's "The Moon" (A Child's
// Garden of Verses, 1885, public domain). The answer is B: a clock face in a hall is round and
// pale and looks down on everyone, as the full moon does.

const POEM = ['The moon has a face like the clock in the hall;', 'She shines on thieves on the garden wall,', 'On streets and fields and harbour quays,', 'And birdies asleep in the forks of the trees.'];

export default englishExam({
  lesson: 'e5-2-2',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question by Gradileo; the poem is Robert Louis Stevenson’s “The Moon” (1885, public domain)',
  verbatim: false,
  title: 'What Does the Simile in “The Moon” Tell Us?',
  thumbnailTitle: 'Explaining a Simile',
  subtitle: 'What a comparison means, step by step',
  summary:
    'An exam-style question on Robert Louis Stevenson’s poem “The Moon”, solved one small step at a time: the moon has a face like the clock in the hall, so what does that tell us? We spot the simile, list what the two things share, and choose the meaning that fits.',
  intro: [
    'In this video, we solve an exam-style question about a simile in a poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of the reading test that eleven-year-olds take in England. The poem is by Robert Louis Stevenson, from eighteen eighty-five.',
  ],
  passage: {
    lines: POEM,
    by: 'Robert Louis Stevenson, “The Moon” (first verse)',
    say: ['First, read the verse. The moon has a face like the clock in the hall; she shines on thieves on the garden wall, on streets and fields and harbour quays, and birdies asleep in the forks of the trees.'],
  },
  question: {
    prompt: '*The moon has a face like the clock in the hall.* What does this tell the reader about the moon?',
    text: 'Read the first verse of “The Moon” by Robert Louis Stevenson. “The moon has a face like the clock in the hall.” What does this tell the reader about the moon?',
    choices: ['It makes a ticking sound at night.', 'It is round and pale, and looks down on everything.', 'It hangs on the wall inside the house.', 'It tells people when to go to sleep.'],
    answer: 1,
    working: 'A clock face is round and pale, and it looks out over the whole hall; the full moon looks like that over the whole world.',
    say: [
      'The moon has a face like the clock in the hall. What does this tell the reader about the moon?',
      'A: It makes a ticking sound at night. B: It is round and pale, and looks down on everything. C: It hangs on the wall inside the house. D: It tells people when to go to sleep.',
    ],
  },
  ask: [
    ['The line **compares** the moon to a clock', 'The line compares two things: the moon and the clock in the hall.'],
    ['What do they have **in common**?', 'The question asks what that comparison tells us. In other words, in what way is the moon like that clock?'],
  ],
  know: {
    title: 'Simile and metaphor',
    md: 'A **simile** compares two different things using **like** or **as**: *her eyes shone like stars*. A **metaphor** says one thing **is** another: *her eyes were stars*.',
    say: [
      'Here is the idea we need. A simile compares two different things using the word like or as, such as: her eyes shone like stars.',
      'A metaphor makes the same kind of comparison without like or as. It says one thing is the other: her eyes were stars.',
    ],
    example: {
      md: 'To explain a comparison, ask: **in what way** are the two things alike?',
      say: 'The two things are different in most ways. To explain a simile or a metaphor, ask which one way they are alike. Her eyes are not really stars, but they shine.',
    },
  },
  plan: [
    ['Spot the **simile**', 'Here is the plan. First, spot the simile.'],
    ['List what the two things **share**', 'Second, list what the two things share.'],
    ['Choose the meaning that **fits**', 'Third, choose the answer that matches what they share.'],
  ],
  steps: [
    scene('Step 1: Spot the simile', [quote('p', POEM), text('n', 'The moon has a face **like** the clock in the hall → a **simile**')], [
      { say: 'Step one. The first line says the moon has a face like the clock in the hall.', show: 'p', focus: 'p.0' },
      { say: 'It uses the word like to compare two different things, so it is a simile.', show: 'n' },
    ]),
    scene('Step 2: What do they share?', [bullets('b', ['A clock face is **round**', 'It is **pale**, white or cream', 'It **looks out** over the whole hall', 'It is fixed **high up**'])], [
      { say: 'Step two. Picture an old clock in a hall. What is its face like? Pause and think.', wait: 3 },
      { say: 'It is round.', show: 'b.0' },
      { say: 'It is pale, usually white or cream.', show: 'b.1' },
      { say: 'It looks out over the whole hall, and it is fixed high up, where everyone can see it.', show: ['b.2', 'b.3'] },
      { say: 'Now look at the moon. The full moon is round and pale, and it hangs high up, shining on thieves, streets, fields, harbours and sleeping birds. It looks down on everything, just as the clock looks over the hall.' },
    ]),
    scene('Step 3: The answer', [text('ans', '**B.** It is round and pale, and looks down on everything.', 'lg')], [
      { say: 'Step three. The answer that matches what they share is B: it is round and pale, and looks down on everything.', show: 'ans' },
    ]),
  ],
  check: [
    ['The rest of the verse shows the moon **shining on everything**', 'Let us check against the rest of the verse. The moon shines on thieves, streets, fields, quays and trees. That is everything below it, so B fits the whole poem.'],
    ['The other answers take the clock **too literally**', 'The other answers treat the moon as if it really were a clock. A simile never means that.'],
  ],
  traps: {
    say: 'Each wrong answer takes the simile literally, as if the moon really were a clock.',
    rows: [
      ['A', 'Gives the moon a clock’s **ticking**', 'The moon makes no sound. The simile is about how the moon looks, not about every feature of a clock.'],
      ['C', 'Puts the moon **inside** the house', 'The moon is not in the hall. Only the clock is.'],
      ['D', 'Makes the moon **tell the time**', 'Nothing in the poem says the moon tells anyone when to sleep.'],
    ],
  },
  yourTurn: {
    prompt: '*The snow lay on the hills like a thick white blanket.* What does this simile suggest about the snow?',
    choices: ['It was warm to touch.', 'It covered the hills completely and smoothly.', 'It could be folded up.', 'It was made of wool.'],
    answer: 1,
    working: 'A blanket covers a bed all over, thickly and smoothly; the snow covers the hills that way.',
    ask: 'The snow lay on the hills like a thick white blanket. What does this simile suggest about the snow?',
    reveal: 'The answer is B. A blanket covers a whole bed, thickly and smoothly, so the snow covered the hills completely. The other answers take the blanket literally.',
  },
  sum: [
    ['A **simile** compares with *like* or *as*; a **metaphor** says one thing **is** another', 'Here is what to remember. A simile compares two things using like or as. A metaphor says one thing is another.'],
    ['Ask: **in what way** are the two things alike?', 'To explain one, ask in what way the two things are alike.'],
    ['Never take the comparison **literally**', 'And never take the comparison literally: the moon is not really a clock. For more on similes and metaphors, watch this lesson’s explainer video on Gradileo.'],
  ],
});
