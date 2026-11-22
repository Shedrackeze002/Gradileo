import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 2.2 (sound and rhythm). An exam-style question we wrote, in the style of a
// Grade 7 reading test, on the opening of Alfred, Lord Tennyson's "The Charge of the Light Brigade"
// (1854), which is in the public domain. The answer is A: the strong DUM-da-da beat sounds like
// galloping horses.

const POEM = ['Half a league, half a league,<br>Half a league onward,<br>All in the valley of Death<br>Rode the six hundred.'];

export default englishExam({
  lesson: 'e7-2-2',
  ...ours('a Grade 7 reading test', 'the poem is Alfred, Lord Tennyson’s “The Charge of the Light Brigade” (1854), in the public domain'),
  title: 'What Does the Rhythm of “The Charge of the Light Brigade” Suggest?',
  thumbnailTitle: 'Rhythm in Poetry',
  subtitle: 'Hearing stressed syllables, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the opening of Tennyson’s “The Charge of the Light Brigade”. We clap out the stressed and unstressed syllables, hear the pattern they make, and match the rhythm to the poem’s meaning.',
  intro: [
    'In this video, we solve an exam-style poetry question about rhythm. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test, on Tennyson’s poem The Charge of the Light Brigade, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Alfred, Lord Tennyson, “The Charge of the Light Brigade” (1854)',
    say: ['First, read the opening of the poem. It describes soldiers on horseback charging into battle. Half a league, half a league, half a league onward, all in the valley of Death rode the six hundred.'],
  },
  question: {
    prompt: 'The poem describes soldiers charging on horseback. What does the **rhythm** of these lines most suggest?',
    text: 'Read the opening of “The Charge of the Light Brigade”. The poem describes soldiers charging on horseback. What does the rhythm of these lines most suggest?',
    choices: ['horses galloping forward', 'a slow, peaceful walk', 'a quiet conversation', 'waves gently lapping'],
    answer: 0,
    working: 'The beat goes **DUM**-da-da, **DUM**-da-da, like **hooves** pounding: a gallop.',
    say: ['The poem describes soldiers charging on horseback. What does the rhythm of these lines most suggest? A: horses galloping forward. B: a slow, peaceful walk. C: a quiet conversation. D: waves gently lapping.'],
  },
  ask: [
    ['**Rhythm** is the **beat** of a poem', 'Rhythm is the beat of a poem, the pattern of strong and weak sounds.'],
    ['What does **this** beat suggest?', 'We need to hear this beat and say what it suggests.'],
  ],
  know: {
    title: 'Stress and rhythm',
    md: 'Every word has **stressed** (strong) and **unstressed** (weak) syllables: **HAP**-py, a-**BOUT**. The pattern of stresses makes the **rhythm**. Poets often match the rhythm to the **meaning**: fast for action, slow for calm.',
    say: [
      'Here is the idea we need. Every word has stressed syllables, which are strong, and unstressed syllables, which are weak. Happy is HAP py. About is a BOUT.',
      'The pattern of stresses makes the rhythm. Poets often match the rhythm to the meaning: a fast beat for action, a slow one for calm.',
    ],
  },
  plan: [
    ['**Clap** the stresses', 'Here is the plan. First, clap out the stresses.'],
    ['Hear the **pattern**', 'Second, hear the pattern they make.'],
    ['Match it to the **meaning**', 'Third, match it to the poem’s meaning.'],
  ],
  steps: [
    scene('Step 1: Clap the stresses', [quote('p', ['[[theta:HALF]] a league, [[theta:HALF]] a league,', '[[theta:HALF]] a league [[theta:ON]]ward,'])], [
      { say: 'Step one. Say the line aloud and clap on the strong beats. HALF a league, HALF a league, HALF a league ONward.', show: 'p', wait: 2 },
      { say: 'The pattern is one strong beat, then two weak ones. DUM da da, DUM da da.', focus: ['p.0', 'p.1'] },
    ]),
    scene('Step 2: Match the meaning', [table('t', ['Choice', 'Fits the beat?'], [['A: horses galloping', '[[good:✓ DUM-da-da like hooves]]'], ['B: a slow walk', '[[bad:✗ the beat is fast]]'], ['C: quiet talk', '[[bad:✗ it is pounding and regular]]'], ['D: lapping waves', '[[bad:✗ too gentle]]']]), text('a', 'The answer is **A**.')], [
      { say: 'Step two. A strong beat followed by two quick weak ones sounds like hooves: da-da-DUM, da-da-DUM. That is a gallop.', show: 't.0', focus: 't.0' },
      { say: 'And the poem is about a cavalry charge, so the rhythm matches the meaning. The answer is A.', show: ['t.1', 't.2', 't.3', 'a'] },
    ]),
  ],
  check: [
    ['**Repetition** of *half a league* drives the poem **onward**', 'Let us check. The repetition of half a league also drives the poem onward, like the charging horses.'],
    ['Rhythm and meaning **match**', 'Rhythm and meaning match. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '**Valley of Death** sounds sombre, but the beat is **fast**', 'Choice B is the trap. The valley of Death sounds solemn, but the beat itself is fast and driving.'],
      ['D', '**Waves** have a softer, more even beat', 'Choice D: waves would have a softer beat.'],
      ['C', 'Speech is **irregular**', 'Choice C: ordinary talk does not have such a regular, pounding beat.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sound devices does the line *“Half a league, half a league, Half a league onward”* use?',
    choices: ['onomatopoeia', 'alliteration and repetition', 'a simile', 'rhyme in every line'],
    answer: 1,
    working: '*Half … half … half* repeats the opening **h** sound and the whole phrase.',
    ask: 'Look at the line half a league, half a league, half a league onward. Which sound device does it use? A: onomatopoeia. B: alliteration and repetition. C: a simile. D: rhyme in every line.',
    reveal: 'The answer is B, alliteration and repetition. The h sound is repeated, and so is the whole phrase half a league.',
  },
  sum: [
    ['**Rhythm** is the pattern of **stressed** and **unstressed** syllables', 'Here is what to remember. Rhythm is the pattern of stressed and unstressed syllables.'],
    ['Say the lines **aloud** and **clap** the strong beats', 'Say the lines aloud and clap the strong beats.'],
    ['Ask how the beat **matches** the meaning', 'Then ask how the beat matches the meaning. For more on sound and rhythm, watch this lesson’s explainer video on Gradileo.'],
  ],
});
