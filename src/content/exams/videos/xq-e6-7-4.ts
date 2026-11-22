import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 7.4 (revising for style). An exam-style question we wrote, in the style of
// a Grade 6 writing test. The answer is A: "sprinted" and "pounding" replace the vague "went" and
// "nice" with precise, vivid words.

export default englishExam({
  lesson: 'e6-7-4',
  ...ours('a Grade 6 writing test'),
  title: 'Which Revision Uses the Most Precise Words?',
  thumbnailTitle: 'Precise Words',
  subtitle: 'Revising vague words, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student wrote “The dog went across the nice park,” and we choose the revision with the most precise words. We find the vague words, test each choice for what it lets us picture, and pick the clearest.',
  intro: [
    'In this video, we solve an exam-style question about revising for style. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 writing test.',
  ],
  question: {
    prompt: 'A student wrote: *The dog went across the nice park.* Which revision uses the most **precise** words?',
    text: 'A student wrote: “The dog went across the nice park.” Which revision uses the most precise words?',
    choices: [
      'The greyhound sprinted across the frosty park.',
      'The dog went across the really nice park.',
      'The dog moved across the good park.',
      'The animal went across the place.',
    ],
    answer: 0,
    working: '**greyhound**, **sprinted** and **frosty** replace the vague *dog*, *went* and *nice*.',
    say: [
      'A student wrote: The dog went across the nice park. Which revision uses the most precise words?',
      'A: The greyhound sprinted across the frosty park. B: The dog went across the really nice park. C: The dog moved across the good park. D: The animal went across the place.',
    ],
  },
  ask: [
    ['The sentence is correct, but **vague**', 'The student’s sentence is correct, but it is vague.'],
    ['Which revision is most **precise**?', 'We need the revision with the most precise words.'],
  ],
  know: {
    title: 'Precise words',
    md: '**Vague** words (*went*, *nice*, *good*, *thing*) could mean many things. **Precise** words tell the reader **exactly** what to picture: *went* → *sprinted, crept, wandered*. Adding *really* or *very* does not make a word more precise.',
    say: [
      'Here is the idea we need. Vague words, like went, nice, good or thing, could mean many different things.',
      'Precise words tell the reader exactly what to picture. Instead of went, a writer could choose sprinted, crept or wandered. Adding really or very does not make a vague word precise.',
    ],
  },
  plan: [
    ['Find the **vague** words', 'Here is the plan. First, find the vague words in the original.'],
    ['Check what each revision **replaces** them with', 'Second, check what each revision replaces them with.'],
    ['Pick the one we can **picture** most clearly', 'Third, pick the one we can picture most clearly.'],
  ],
  steps: [
    scene('Step 1: The vague words', [quote('p', ['The [[bad:dog]] [[bad:went]] across the [[bad:nice]] park.']), text('n', 'Which dog? How did it move? What kind of nice?')], [
      { say: 'Step one. Pause and find the vague words.', show: 'p', wait: 3 },
      { say: 'Went could mean walked, ran or crawled. Nice could mean sunny, green or anything at all. Even dog could be more exact.', show: 'n' },
    ]),
    scene('Step 2: Test each revision', [table('t', ['Revision', 'What changed', 'More precise?'], [['A', '**greyhound**, **sprinted**, **frosty**', '[[good:✓ we can picture it]]'], ['B', 'added **really**', '[[bad:✗ still vague]]'], ['C', '**moved**, **good**', '[[bad:✗ just as vague]]'], ['D', '**animal**, **place**', '[[bad:✗ even vaguer]]']])], [
      { say: 'Step two. A replaces all three: a greyhound, which sprinted, across a frosty park. We can see it.', show: 't.0', focus: 't.0' },
      { say: 'B only adds really. Really nice is still nice.', show: 't.1' },
      { say: 'C swaps went for moved, and nice for good. Those are just as vague.', show: 't.2' },
      { say: 'D is even vaguer: animal and place tell us less than dog and park. The answer is A.', show: 't.3' },
    ]),
  ],
  check: [
    ['Close your eyes: A gives a **clear picture**', 'Let us check. Close your eyes and picture each sentence. Only A gives a clear picture.'],
    ['The others could be **anywhere**, at **any** speed', 'The others could be any dog, anywhere, at any speed. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '**really** adds force, not **detail**', 'Choice B is the trap. Really makes the word stronger, but not more exact.'],
      ['C', 'Changes words, but to **other vague** ones', 'Choice C changes the words, but swaps them for other vague ones.'],
      ['D', 'Makes it **less** precise', 'Choice D makes the sentence less precise.'],
    ],
  },
  yourTurn: {
    prompt: 'Which revision best **varies** the sentences? *The storm came. The wind blew. The trees shook.*',
    choices: ['The storm came. The wind blew hard. The trees shook.', 'The storm came, and the wind blew, and the trees shook.', 'Storm. Wind. Trees.', 'As the storm swept in, the wind howled. Trees shook.'],
    answer: 3,
    working: 'D mixes a **long** sentence with a **short** one, and starts in a new way.',
    ask: 'The storm came. The wind blew. The trees shook. Which revision best varies the sentences? A: The storm came. The wind blew hard. The trees shook. B: The storm came, and the wind blew, and the trees shook. C: Storm. Wind. Trees. D: As the storm swept in, the wind howled. Trees shook.',
    reveal: 'The answer is D. It opens with as, mixes a long sentence with a short one, and swaps in precise verbs like swept and howled. B just joins everything with and.',
  },
  sum: [
    ['Replace **vague** words with **precise** ones', 'Here is what to remember. Replace vague words with precise ones.'],
    ['*really* and *very* do not add **detail**', 'Really and very do not add detail.'],
    ['Ask: can the reader **picture** it?', 'And ask whether the reader can picture it. For more on revising for style, watch this lesson’s explainer video on Gradileo.'],
  ],
});
