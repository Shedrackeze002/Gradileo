import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 2.4 (the sonnet and free verse). An exam-style question we wrote, in the
// style of a Grade 7 reading test, on William Shakespeare's Sonnet 18 (1609), which is in the public
// domain. The answer is C: the final rhyming couplet claims the poem will keep the beloved alive.

const LINES = [
  'Shall I compare thee to a summer’s day?<br>Thou art more lovely and more temperate:<br>Rough winds do shake the darling buds of May,<br>And summer’s lease hath all too short a date…',
  '…So long as men can breathe, or eyes can see,<br>So long lives this, and this gives life to thee.',
];

export default englishExam({
  lesson: 'e7-2-4',
  ...ours('a Grade 7 reading test', 'the poem is William Shakespeare’s Sonnet 18 (1609), in the public domain'),
  title: 'What Does the Final Couplet of Sonnet 18 Say?',
  thumbnailTitle: 'The Sonnet',
  subtitle: 'The parts of a Shakespearean sonnet, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Shakespeare’s Sonnet 18, “Shall I compare thee to a summer’s day?”. We learn the parts of a Shakespearean sonnet, find the final couplet, and put its meaning into plain words.',
  intro: [
    'In this video, we solve an exam-style poetry question about the sonnet. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test, on Shakespeare’s Sonnet 18, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Sonnet 18 (1609): the first four lines and the last two',
    say: [
      'First, read the opening of the sonnet. Shall I compare thee to a summer’s day? Thou art more lovely and more temperate: rough winds do shake the darling buds of May, and summer’s lease hath all too short a date.',
      'And here are its last two lines. So long as men can breathe, or eyes can see, so long lives this, and this gives life to thee.',
    ],
  },
  question: {
    prompt: 'In the sonnet’s **final couplet**, what does the speaker claim?',
    text: 'Read the lines from Shakespeare’s Sonnet 18. In the sonnet’s final couplet, what does the speaker claim?',
    choices: [
      'Summer is the best season of the year.',
      'The person he loves will soon grow old and be forgotten.',
      'This poem will keep the person he loves alive for as long as people read it.',
      'Rough winds will destroy the buds of May.',
    ],
    answer: 2,
    working: '*So long lives **this*** (the poem), *and **this** gives life to **thee***: the poem keeps the beloved alive.',
    say: [
      'In the sonnet’s final couplet, what does the speaker claim?',
      'A: Summer is the best season of the year. B: The person he loves will soon grow old and be forgotten. C: This poem will keep the person he loves alive for as long as people read it. D: Rough winds will destroy the buds of May.',
    ],
  },
  ask: [
    ['The **final couplet** is the last **two lines**', 'The final couplet is the last two lines of the sonnet.'],
    ['What do they **claim**?', 'We need to put their claim into plain words.'],
  ],
  know: {
    title: 'The Shakespearean sonnet',
    md: 'A **Shakespearean sonnet** has **14 lines**: **three quatrains** (four-line sections) and a final rhyming **couplet**. Rhyme scheme: **ABAB CDCD EFEF GG**. The couplet often **sums up** the poem or gives it a **twist**.',
    say: [
      'Here is the idea we need. A Shakespearean sonnet has fourteen lines. They make three quatrains, which are four-line sections, followed by a final rhyming couplet.',
      'The rhyme scheme is A B A B, C D C D, E F E F, G G. The couplet often sums up the poem, or gives it a twist.',
    ],
  },
  plan: [
    ['Find the **couplet**', 'Here is the plan. First, find the couplet.'],
    ['Work out what **this** and **thee** mean', 'Second, work out what this and thee mean.'],
    ['Put it in **plain words**', 'Third, put it into plain words.'],
  ],
  steps: [
    scene('Step 1: The couplet', [quote('p', ['So long as men can breathe, or eyes can [[theta:see]],', 'So long lives [[good:this]], and [[good:this]] gives life to [[good:thee]].'])], [
      { say: 'Step one. The last two lines rhyme, see and thee, so they are the couplet.', show: 'p' },
      { say: 'Pause and think: what could this mean?', wait: 3 },
    ]),
    scene('Step 2: This and thee', [table('t', ['Word', 'Meaning'], [['**thee**', 'you: the person he loves'], ['**this**', 'this **poem**'], ['so long as men can breathe', 'as long as there are **people**'], ['so long lives this', 'the poem will **live** that long']])], [
      { say: 'Step two. Thee means you, the person the speaker loves. This means this poem, the one we are reading.', show: ['t.0', 't.1'] },
      { say: 'As long as people are alive to read, the poem lives, and the poem gives life to the person it describes.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 3: In plain words', [text('a', '**C.** As long as people read this poem, you will live on in it.', 'lg')], [
      { say: 'Step three. In plain words: as long as people read this poem, you will live on in it. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Summer **fades**; the poem **does not**', 'Let us check. The first quatrain says summer is too short. The couplet gives the twist: the poem lasts forever.'],
    ['That is the typical **job** of a couplet', 'That twist is the typical job of a Shakespearean couplet. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The **opposite** of the claim', 'Choice B is the trap. The poem says the beloved will never be forgotten.'],
      ['D', 'From the **first quatrain**, not the couplet', 'Choice D comes from the first quatrain, not the couplet.'],
      ['A', 'The speaker says the person is **better** than summer', 'Choice A: the speaker says the person is better than a summer’s day.'],
    ],
  },
  yourTurn: {
    prompt: 'A poem has no regular rhyme scheme and no fixed rhythm, and its lines are different lengths. What form is it?',
    choices: ['a Shakespearean sonnet', 'a ballad', 'a limerick', 'free verse'],
    answer: 3,
    working: 'No set rhyme, rhythm or line length → **free verse**.',
    ask: 'A poem has no regular rhyme scheme and no fixed rhythm, and its lines are different lengths. What form is it? A: a Shakespearean sonnet. B: a ballad. C: a limerick. D: free verse.',
    reveal: 'The answer is D, free verse. It follows no set rhyme, rhythm or line length.',
  },
  sum: [
    ['Shakespearean sonnet: **14 lines**, **3 quatrains** + a **couplet**', 'Here is what to remember. A Shakespearean sonnet has fourteen lines: three quatrains and a couplet.'],
    ['Rhyme scheme **ABAB CDCD EFEF GG**', 'Its rhyme scheme is A B A B, C D C D, E F E F, G G.'],
    ['The **couplet** sums up or gives a **twist**', 'The couplet sums up or gives a twist. For more on the sonnet and free verse, watch this lesson’s explainer video on Gradileo.'],
  ],
});
