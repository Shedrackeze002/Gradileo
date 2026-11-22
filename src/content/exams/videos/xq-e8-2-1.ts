import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 2.1 (figurative language). An exam-style question we wrote, in the style of
// a Grade 8 reading test, on Emily Dickinson's "Hope is the thing with feathers" in the text of Poems,
// Second Series (1891), which is in the public domain. The answer is C: hope is compared to a small bird
// all through the poem, an extended metaphor.

const POEM = [
  'Hope is the thing with feathers<br>That perches in the soul,<br>And sings the tune without the words,<br>And never stops at all,',
  'And sweetest in the gale is heard;<br>And sore must be the storm<br>That could abash the little bird<br>That kept so many warm.',
  'I’ve heard it in the chillest land,<br>And on the strangest sea;<br>Yet, never, in extremity,<br>It asked a crumb of me.',
];

export default englishExam({
  lesson: 'e8-2-1',
  ...ours('a Grade 8 reading test', 'the poem is Emily Dickinson’s “Hope is the thing with feathers” (Poems, Second Series, 1891), in the public domain'),
  title: 'What Extended Metaphor Runs Through “Hope Is the Thing With Feathers”?',
  thumbnailTitle: 'Extended Metaphor',
  subtitle: 'Following a metaphor through a poem, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Emily Dickinson’s “Hope is the thing with feathers”. We find the first metaphor, trace it through all three stanzas, and explain what the comparison says about hope.',
  intro: [
    'In this video, we solve an exam-style poetry question about extended metaphor. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on Emily Dickinson’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Emily Dickinson, Poems, Second Series (1891)',
    say: [
      'First, read the poem. Hope is the thing with feathers that perches in the soul, and sings the tune without the words, and never stops at all,',
      'and sweetest in the gale is heard; and sore must be the storm that could abash the little bird that kept so many warm.',
      'I’ve heard it in the chillest land, and on the strangest sea; yet, never, in extremity, it asked a crumb of me.',
    ],
  },
  question: {
    prompt: 'Which **extended metaphor** runs through the whole poem?',
    text: 'Read “Hope is the thing with feathers”. Which extended metaphor runs through the whole poem?',
    choices: ['Hope is compared to a storm at sea.', 'The soul is compared to a house.', 'Hope is compared to a small bird.', 'Life is compared to a song.'],
    answer: 2,
    working: '*feathers*, *perches*, *sings*, *little bird*, *a crumb*: hope is a **bird** in every stanza.',
    say: ['Which extended metaphor runs through the whole poem? A: Hope is compared to a storm at sea. B: The soul is compared to a house. C: Hope is compared to a small bird. D: Life is compared to a song.'],
  },
  ask: [
    ['An **extended** metaphor lasts **many lines**', 'An extended metaphor is a comparison that lasts for many lines, or a whole poem.'],
    ['Which one runs through **this** poem?', 'We need the one that runs through this poem.'],
  ],
  know: {
    title: 'Figurative language',
    md: '**Simile**: a comparison with *like* or *as*. **Metaphor**: says one thing **is** another. **Personification**: human qualities for things. **Hyperbole**: deliberate exaggeration. An **extended metaphor** keeps one comparison going across **many lines**, adding new details.',
    say: [
      'Here is the idea we need. A simile compares using like or as. A metaphor says one thing is another. Personification gives human qualities to things, and hyperbole is deliberate exaggeration.',
      'An extended metaphor keeps one comparison going across many lines, adding new details as it goes.',
    ],
  },
  plan: [
    ['Find the **first** metaphor', 'Here is the plan. First, find the first metaphor.'],
    ['**Trace** it through each stanza', 'Second, trace it through each stanza.'],
    ['Say what it shows about **hope**', 'Third, say what it shows about hope.'],
  ],
  steps: [
    scene('Step 1: Trace the bird', [table('t', ['Stanza', 'Bird words', 'What it says about hope'], [['1', '**feathers**, **perches**, **sings**', 'hope lives inside us and never stops'], ['2', '**little bird**, kept so many **warm**', 'hope comforts us most in hard times (**the gale**)'], ['3', 'never asked a **crumb**', 'hope asks **nothing** in return']])], [
      { say: 'Step one. Pause and look for bird words in each stanza.', wait: 3 },
      { say: 'Stanza one: hope has feathers, perches in the soul and sings. Hope is a bird living inside us, singing without stopping.', show: 't.0' },
      { say: 'Stanza two: it sounds sweetest in the gale, and it is a little bird that kept so many warm. Hope comforts us most in hard times.', show: 't.1' },
      { say: 'Stanza three: it never asked a crumb of me. Like a bird that needs no feeding, hope asks nothing in return.', show: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', 'Hope = a **small bird**, all the way through → **C**', 'lg')], [
      { say: 'Step two. The comparison to a small bird runs through all three stanzas. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The **storm** and **sea** are places **the bird** survives', 'Let us check. The storm and the sea are not the metaphor. They are the hard places where the bird keeps singing.'],
    ['The bird is the comparison in **every** stanza', 'The bird is the comparison in every stanza. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The **storm** is where hope is **tested**, not what it is', 'Choice A is the trap. The storm appears, but it is what hope survives, not what hope is.'],
      ['D', '**Sings** is one detail of the **bird**', 'Choice D picks out one detail, singing, and misses the bird.'],
      ['B', 'The soul is a **perch**, not a house', 'Choice B: the soul is where the bird perches, not a house.'],
    ],
  },
  yourTurn: {
    prompt: '*I have told you a million times to tidy your room!* Which device is this?',
    choices: ['hyperbole', 'simile', 'personification', 'extended metaphor'],
    answer: 0,
    working: '*a million times* is a deliberate **exaggeration**.',
    ask: 'I have told you a million times to tidy your room! Which device is this? A: hyperbole. B: simile. C: personification. D: extended metaphor.',
    reveal: 'The answer is A, hyperbole. Nobody has said it a million times. The exaggeration shows frustration.',
  },
  sum: [
    ['**Metaphor** says one thing **is** another', 'Here is what to remember. A metaphor says one thing is another.'],
    ['An **extended** metaphor keeps going across **many lines**', 'An extended metaphor keeps going across many lines.'],
    ['Trace it **stanza by stanza** and say what each detail adds', 'Trace it stanza by stanza, and say what each new detail adds. For more on figurative language, watch this lesson’s explainer video on Gradileo.'],
  ],
});
