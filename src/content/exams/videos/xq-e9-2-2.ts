import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 2.2 (the sonnet and its sounds). An exam-style question we wrote, in the style
// of a Grade 9 reading test, on William Shakespeare's Sonnet 130 (1609), which is in the public domain.
// The answer is B: after mocking the usual over-the-top comparisons, the couplet turns to declare that
// his love is as rare as any.

const LINES = [
  'My mistress’ eyes are nothing like the sun;<br>Coral is far more red than her lips’ red…',
  '…I grant I never saw a goddess go;<br>My mistress, when she walks, treads on the ground:',
  'And yet, by heaven, I think my love as rare<br>As any she belied with false compare.',
];

export default englishExam({
  lesson: 'e9-2-2',
  ...ours('a Grade 9 reading test', 'the poem is William Shakespeare’s Sonnet 130 (1609), in the public domain'),
  title: 'What Happens at the Volta of Sonnet 130?',
  thumbnailTitle: 'The Volta',
  subtitle: 'The turn in a sonnet, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Shakespeare’s Sonnet 130, “My mistress’ eyes are nothing like the sun”. We see what the first twelve lines do, find the turning point, and explain how the couplet changes everything before it.',
  intro: [
    'In this video, we solve an exam-style poetry question about the volta, the turn in a sonnet. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Shakespeare’s Sonnet 130, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Sonnet 130 (1609): lines 1 to 2, 11 to 12, and 13 to 14',
    say: [
      'First, read lines from the sonnet. It opens: My mistress’ eyes are nothing like the sun; coral is far more red than her lips’ red.',
      'Near the end: I grant I never saw a goddess go; my mistress, when she walks, treads on the ground.',
      'And the final couplet: And yet, by heaven, I think my love as rare as any she belied with false compare.',
    ],
  },
  question: {
    prompt: 'What happens at the **volta** (the turn) in the final couplet?',
    text: 'Read the lines from Shakespeare’s Sonnet 130. What happens at the volta (the turn) in the final couplet?',
    choices: [
      'The speaker admits he no longer loves her.',
      'After mocking exaggerated praise, the speaker declares his love is as rare as any.',
      'The speaker compares her to the sun after all.',
      'The poem changes from English into Latin.',
    ],
    answer: 1,
    working: 'Lines 1–12 **deny** the usual flattering comparisons; **“And yet”** turns: his love is **real** and **rare**.',
    say: [
      'What happens at the volta, the turn, in the final couplet?',
      'A: The speaker admits he no longer loves her. B: After mocking exaggerated praise, the speaker declares his love is as rare as any. C: The speaker compares her to the sun after all. D: The poem changes from English into Latin.',
    ],
  },
  ask: [
    ['The **volta** is the sonnet’s **turn**', 'The volta is the turn in a sonnet, where its direction changes.'],
    ['What **changes** in the couplet?', 'We need to say what changes in the couplet.'],
  ],
  know: {
    title: 'Sonnets and the volta',
    md: 'A **Shakespearean** sonnet: three quatrains + a couplet (ABAB CDCD EFEF GG); the **volta** usually comes at the **couplet**. A **Petrarchan** sonnet: an **octave** (8 lines) + a **sestet** (6 lines); the volta comes at **line 9**. Sound devices: **alliteration** (same first sounds), **assonance** (same vowel sounds), **sibilance** (repeated *s* sounds).',
    say: [
      'Here is the idea we need. A Shakespearean sonnet has three quatrains and a couplet, and the volta usually comes at the couplet. A Petrarchan sonnet has an octave of eight lines and a sestet of six, and the volta comes at line nine.',
      'Sonnets also use sound devices. Alliteration repeats first sounds, assonance repeats vowel sounds, and sibilance repeats s sounds.',
    ],
  },
  plan: [
    ['What do the **first twelve** lines do?', 'Here is the plan. First, what do the first twelve lines do?'],
    ['Find the **turning word**', 'Second, find the turning word.'],
    ['What does the couplet **claim**?', 'Third, what does the couplet claim?'],
  ],
  steps: [
    scene('Step 1: Before the turn', [table('t', ['Usual love-poem praise', 'Shakespeare says'], [['eyes like the **sun**', '[[bad:nothing like the sun]]'], ['lips red as **coral**', '[[bad:coral is far more red]]'], ['walks like a **goddess**', '[[bad:treads on the ground]]']])], [
      { say: 'Step one. Love poets of the time compared their lovers to the sun, to coral, to goddesses. Shakespeare says no to each one.', show: ['t.0', 't.1', 't.2'] },
      { say: 'Her eyes are nothing like the sun. Coral is redder than her lips. She walks on the ground like anyone else. He seems to be mocking her, or mocking the poets.' },
    ]),
    scene('Step 2: The turn', [quote('p', ['[[theta:And yet]], by heaven, I think my love as [[good:rare]]', 'As any she belied with [[bad:false compare]].']), text('a', 'His love is **real**, and as **rare** as any falsely flattered woman → **B**', 'lg')], [
      { say: 'Step two. And yet is the turning word. By heaven, he thinks his love is as rare as any woman who was belied, misrepresented, with false comparisons.', show: 'p' },
      { say: 'So the poem was mocking exaggerated praise, not her. His love is real, and rare. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The volta changes how we read **all** twelve lines', 'Let us check. The volta changes how we read all twelve lines before it.'],
    ['They were an attack on **false** praise', 'They were an attack on false praise, not on her. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Takes lines 1–12 at **face value**', 'Choice A is the trap. If you stop before the couplet, he seems to dislike her, but the volta reverses that.'],
      ['C', 'He never compares her to the **sun**', 'Choice C: he never gives in and compares her to the sun.'],
      ['D', 'No change of **language**', 'Choice D: nothing changes language.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sound device appears in *“the **s**oft **s**ea **s**ighed **s**lowly”*?',
    choices: ['assonance', 'sibilance', 'onomatopoeia', 'a volta'],
    answer: 1,
    working: 'Repeated **s** sounds: **sibilance**.',
    ask: 'Which sound device appears in, the soft sea sighed slowly? A: assonance. B: sibilance. C: onomatopoeia. D: a volta.',
    reveal: 'The answer is B, sibilance. The repeated s sounds create a soft, hushing effect, like the sea.',
  },
  sum: [
    ['The **volta** is the sonnet’s **turn**', 'Here is what to remember. The volta is the sonnet’s turn.'],
    ['Shakespearean: at the **couplet** · Petrarchan: at **line 9**', 'In a Shakespearean sonnet it comes at the couplet, and in a Petrarchan sonnet at line nine.'],
    ['Watch for turning words: *and yet*, *but*', 'Watch for turning words like and yet, or but. For more on the sonnet and its sounds, watch this lesson’s explainer video on Gradileo.'],
  ],
});
