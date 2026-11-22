import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 2.1 (the ode and the Romantic lyric). An exam-style question we wrote, in the
// style of a Grade 12 reading test, on John Keats's "Ode on a Grecian Urn" (1819), which is in the public
// domain. The answer is C: the speaker addresses the urn directly, as if it could hear, which is the
// typical address of an ode.

const POEM = ['Thou still unravish’d bride of quietness,<br>Thou foster-child of silence and slow time,<br>Sylvan historian, who canst thus express<br>A flowery tale more sweetly than our rhyme…'];

export default englishExam({
  lesson: 'e12-2-1',
  ...ours('a Grade 12 reading test', 'the poem is John Keats’s “Ode on a Grecian Urn” (1819), in the public domain'),
  title: 'Who Is Keats Speaking To in “Ode on a Grecian Urn”?',
  thumbnailTitle: 'The Ode',
  subtitle: 'The ode and the Romantic lyric, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the opening of John Keats’s “Ode on a Grecian Urn”. We work out who “thou” is, decode the three names the speaker gives it, and see how the ode’s address works.',
  intro: [
    'In this video, we solve an exam-style poetry question about the ode. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Keats’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'John Keats, “Ode on a Grecian Urn” (1819), lines 1 to 4',
    say: ['First, read the opening of the poem. The speaker is looking at an ancient Greek vase, an urn, painted with scenes. Thou still unravished bride of quietness, thou foster-child of silence and slow time, sylvan historian, who canst thus express a flowery tale more sweetly than our rhyme.'],
  },
  question: {
    prompt: 'What is the speaker **doing** in these opening lines?',
    text: 'Read the opening lines of Ode on a Grecian Urn. What is the speaker doing in these opening lines?',
    choices: [
      'describing a wedding he has attended',
      'speaking to a child who has lost its parents',
      'addressing the urn directly, as if it could hear, and praising it',
      'complaining that ancient art is too quiet',
    ],
    answer: 2,
    working: '*Thou* = the **urn**; *bride*, *foster-child*, *historian* are **names** for it: a direct **address** (apostrophe), typical of the **ode**.',
    say: [
      'What is the speaker doing in these opening lines?',
      'A: describing a wedding he has attended. B: speaking to a child who has lost its parents. C: addressing the urn directly, as if it could hear, and praising it. D: complaining that ancient art is too quiet.',
    ],
  },
  ask: [
    ['The speaker says **thou**', 'The speaker says thou, which means you.'],
    ['**Who** is thou, and what is he doing?', 'We need to work out who thou is, and what the speaker is doing.'],
  ],
  know: {
    title: 'The ode and the Romantic lyric',
    md: 'An **ode** is a serious, formal lyric that **addresses** someone or something, often an object or an idea, and praises or meditates on it. Speaking to something that cannot answer is called **apostrophe**. The **Romantic lyric** often begins with something in the **world** (an urn, a bird, a mountain) and turns **inward** to the speaker’s **mind**, ending in a new thought or a question.',
    say: [
      'Here is the idea we need. An ode is a serious, formal lyric that addresses someone or something, often an object or an idea, and praises or thinks deeply about it. Speaking to something that cannot answer is called apostrophe.',
      'The Romantic lyric often begins with something in the world, like an urn, a bird or a mountain, and turns inward to the speaker’s mind, ending in a new thought or a question.',
    ],
  },
  plan: [
    ['Find who **thou** is', 'Here is the plan. First, find who thou is.'],
    ['Decode the **names** he gives it', 'Second, decode the names he gives it.'],
    ['Name what he is **doing**', 'Third, name what he is doing.'],
  ],
  steps: [
    scene('Step 1: Three names for the urn', [table('t', ['Name', 'Meaning'], [['*still **unravish’d bride** of quietness*', '**untouched**, married to silence: still **unchanged**'], ['*foster-child of **silence and slow time***', 'raised by **centuries** of stillness'], ['***Sylvan historian***', 'a **storyteller** of country scenes, in pictures']])], [
      { say: 'Step one. Thou is the urn. The speaker gives it three names. Still unravished bride of quietness: untouched, married to silence, unchanged after all these years.', show: 't.0' },
      { say: 'Foster-child of silence and slow time: raised by centuries of stillness.', show: 't.1' },
      { say: 'Sylvan historian: a storyteller of country scenes, telling its tale in pictures, more sweetly than our rhyme.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: What he is doing', [quote('p', ['[[good:Thou]] still unravish’d bride of quietness,', '[[good:Thou]] foster-child of silence and slow time…']), text('a', 'Speaking **to** the urn and **praising** it: the ode’s **address** → **C**', 'lg')], [
      { say: 'Step two. Thou, thou: the speaker talks to the urn as if it could hear, and every name is praise.', show: 'p' },
      { say: 'Addressing and praising an object is exactly what an ode does. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The urn **cannot** answer: this is **apostrophe**', 'Let us check. The urn cannot answer. Speaking to it anyway is apostrophe.'],
    ['and **praise** fits the ode’s serious tone', 'And praise fits the ode’s serious, formal tone. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '*bride* is a **metaphor** for the urn, not a real wedding', 'Choice A is the trap. Bride sounds like a wedding, but it is a metaphor for the untouched urn.'],
      ['B', '*foster-child* is another **metaphor**', 'Choice B: foster-child is another metaphor for the urn.'],
      ['D', 'He **praises** its quiet; *more sweetly than our rhyme*', 'Choice D: he praises its quiet. It tells its tale more sweetly than our rhyme.'],
    ],
  },
  yourTurn: {
    prompt: 'Keats’s “Ode to a Nightingale” ends: *“Was it a vision, or a waking dream? / Fled is that music:—Do I wake or sleep?”* What does this ending suggest?',
    choices: ['The speaker is unsure what was real.', 'The speaker has caught the bird.', 'The speaker is angry at the bird.', 'The speaker has fallen asleep and stopped thinking.'],
    answer: 0,
    working: 'Two **questions**, no answer: the speaker’s **mind** is left uncertain.',
    ask: 'Keats’s Ode to a Nightingale ends: Was it a vision, or a waking dream? Fled is that music. Do I wake or sleep? What does this ending suggest? A: The speaker is unsure what was real. B: The speaker has caught the bird. C: The speaker is angry at the bird. D: The speaker has fallen asleep and stopped thinking.',
    reveal: 'The answer is A. The poem turns from the bird to the speaker’s mind, and ends unsure whether the experience was real.',
  },
  sum: [
    ['An **ode** addresses and praises its subject', 'Here is what to remember. An ode addresses its subject and praises or thinks deeply about it.'],
    ['Speaking to what cannot answer = **apostrophe**', 'Speaking to something that cannot answer is apostrophe.'],
    ['The Romantic lyric turns from the **world** to the **mind**', 'And the Romantic lyric turns from the world to the mind. For more on the ode and the Romantic lyric, watch this lesson’s explainer video on Gradileo.'],
  ],
});
