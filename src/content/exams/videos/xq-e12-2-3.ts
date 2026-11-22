import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 2.3 (modern forms). An exam-style question we wrote, in the style of a Grade 12
// reading test, on Gerard Manley Hopkins's "Pied Beauty" (written 1877, published 1918), which is in the
// public domain. The answer is B: packed stresses and repeated sounds crowd many varied, bright things
// together, so the sound enacts the "dappled" variety the poem praises.

const POEM = ['Glory be to God for dappled things—<br>For skies of couple-colour as a brinded cow;<br>For rose-moles all in stipple upon trout that swim;<br>Fresh-firecoal chestnut-falls; finches’ wings…'];

export default englishExam({
  lesson: 'e12-2-3',
  ...ours('a Grade 12 reading test', 'the poem is Gerard Manley Hopkins’s “Pied Beauty” (published 1918), in the public domain'),
  title: 'How Does the Sound of “Pied Beauty” Match Its Sense?',
  thumbnailTitle: 'Sound and Sense',
  subtitle: 'Modern forms and sprung rhythm, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Gerard Manley Hopkins’s “Pied Beauty”. We read one crowded line aloud, count its stresses, hear its repeated sounds, and explain how sound and rhythm carry the poem’s meaning.',
  intro: [
    'In this video, we solve an exam-style poetry question about sound and rhythm. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Hopkins’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Gerard Manley Hopkins, “Pied Beauty” (published 1918), lines 1 to 4',
    say: ['First, read the opening of the poem. Pied and dappled both mean patched or spotted with different colours. Glory be to God for dappled things, for skies of couple-colour as a brinded cow; for rose-moles all in stipple upon trout that swim; fresh-firecoal chestnut-falls; finches’ wings.'],
  },
  question: {
    prompt: 'How does the **sound** of *“Fresh-firecoal chestnut-falls; finches’ wings”* reinforce the poem’s meaning?',
    text: 'Read the lines from Pied Beauty. How does the sound of “Fresh-firecoal chestnut-falls; finches’ wings” reinforce the poem’s meaning?',
    choices: [
      'Its smooth, even rhythm makes nature sound calm and orderly.',
      'Its packed stresses and repeated f sounds crowd many bright, varied things together, like the dappled world it praises.',
      'Its rhyme with the line before shows the poem is a sonnet.',
      'Its long vowels slow the line to express sadness.',
    ],
    answer: 1,
    working: '**Fresh-fire**coal **chest**nut-**falls**; **finch**es’ **wings**: stresses **pile up**, **f** sounds repeat → a crowd of **varied** things.',
    say: [
      'How does the sound of fresh-firecoal chestnut-falls; finches’ wings reinforce the poem’s meaning?',
      'A: Its smooth, even rhythm makes nature sound calm and orderly. B: Its packed stresses and repeated f sounds crowd many bright, varied things together, like the dappled world it praises. C: Its rhyme with the line before shows the poem is a sonnet. D: Its long vowels slow the line to express sadness.',
    ],
  },
  ask: [
    ['We need the **sound** of one line', 'We need to hear the sound of one line.'],
    ['and how it matches the **meaning**', 'And say how it matches the poem’s meaning.'],
  ],
  know: {
    title: 'Modern forms',
    md: '**Sprung rhythm** (Hopkins’s term) counts only the **stressed** syllables, so stresses can crowd together. **Imagism** presents one sharp **image** in few, precise words, without explaining it. **Free verse** has no fixed metre or rhyme; the **modern sonnet** bends the old form. In every case, ask how **sound** and **rhythm** reinforce **sense**.',
    say: [
      'Here is the idea we need. Sprung rhythm, Hopkins’s own term, counts only the stressed syllables, so stresses can crowd together. Imagism presents one sharp image in a few precise words, without explaining it.',
      'Free verse has no fixed metre or rhyme, and the modern sonnet bends the old form. In every case, ask how sound and rhythm reinforce the sense.',
    ],
  },
  plan: [
    ['Count the **stresses**', 'Here is the plan. First, count the stresses.'],
    ['Hear the **repeated sounds**', 'Second, hear the repeated sounds.'],
    ['Link sound to **sense**', 'Third, link the sound to the sense.'],
  ],
  steps: [
    scene('Step 1: Stress and sound', [quote('p', ['[[good:Fresh]]-[[good:fire]]coal [[good:chest]]nut-[[good:falls]]; [[good:finch]]es’ [[good:wings]]']), table('t', ['Feature', 'Evidence'], [['**stresses** crowd together', 'six strong beats in a short line'], ['**alliteration** of *f*', '*fresh, fire, falls, finches*'], ['no **verb**, just a list', 'one thing after another']])], [
      { say: 'Step one. Read it aloud: fresh-firecoal chestnut-falls; finches’ wings. Six strong beats crowd into a short line. That is sprung rhythm.', show: ['p', 't.0'] },
      { say: 'The f sound repeats: fresh, fire, falls, finches. And there is no verb, just one thing after another.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Sound and sense', [text('e', 'The poem praises **dappled**, varied things; the line **packs** varied things together'), text('a', 'Crowded stresses + repeated *f* → a crowd of bright, varied things → **B**', 'lg')], [
      { say: 'Step two. The poem praises dappled things, a world full of variety. This line packs chestnuts, fire and finches’ wings tight together, each with a strong beat.', show: 'e' },
      { say: 'So the sound enacts the sense: a crowded, bright, varied world. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The rhythm is **packed**, not smooth', 'Let us check. The rhythm is packed and bumpy, not smooth and even.'],
    ['and the mood is **joyful**: *Glory be*', 'And the mood is joyful: glory be to God. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The rhythm is **crowded**, not even', 'Choice A is the trap. Nature poems often sound calm, but this rhythm is crowded and uneven.'],
      ['C', '*wings* does not rhyme with *cow*', 'Choice C: wings does not rhyme with the line before.'],
      ['D', 'The mood is **joy**, not sadness', 'Choice D: the mood is joy, not sadness.'],
    ],
  },
  yourTurn: {
    prompt: 'A short poem presents one sharp image in a few precise words, without explaining its meaning. Which movement does it most likely belong to?',
    choices: ['Romanticism', 'the ballad tradition', 'Imagism', 'the epic'],
    answer: 2,
    working: 'One **sharp image**, few words, no explanation: **Imagism**.',
    ask: 'A short poem presents one sharp image in a few precise words, without explaining its meaning. Which movement does it most likely belong to? A: Romanticism. B: the ballad tradition. C: Imagism. D: the epic.',
    reveal: 'The answer is C, Imagism. Imagist poets presented a single clear image and trusted the reader to feel its meaning.',
  },
  sum: [
    ['**Sprung rhythm** lets stresses crowd together', 'Here is what to remember. Sprung rhythm lets stresses crowd together.'],
    ['**Imagism**: one sharp image, few words', 'Imagism presents one sharp image in few words.'],
    ['Always ask how **sound** reinforces **sense**', 'And always ask how sound reinforces sense. For more on modern forms, watch this lesson’s explainer video on Gradileo.'],
  ],
});
