import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 2.4 (the unseen poem). An exam-style question we wrote, in the style of a
// Grade 12 reading test, on Emily Dickinson's "Because I could not stop for Death" (published 1890), which
// is in the public domain. The answer is C: Death is personified as a courteous gentleman who calmly
// takes the speaker for a carriage ride.

const POEM = ['Because I could not stop for Death –<br>He kindly stopped for me –<br>The Carriage held but just Ourselves –<br>And Immortality.'];

export default englishExam({
  lesson: 'e12-2-4',
  ...ours('a Grade 12 reading test', 'the poem is Emily Dickinson’s “Because I could not stop for Death” (published 1890), in the public domain'),
  title: 'How Is Death Presented in Dickinson’s Poem?',
  thumbnailTitle: 'The Unseen Poem',
  subtitle: 'Reading a poem for the first time, step by step',
  summary:
    'An exam-style question on a poem you may never have seen, solved one small step at a time: the opening of Emily Dickinson’s “Because I could not stop for Death”. We ask who is speaking and what is happening, look closely at how Death behaves, and name the effect.',
  intro: [
    'In this video, we solve an exam-style question on an unseen poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Dickinson’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Emily Dickinson, “Because I could not stop for Death” (published 1890), lines 1 to 4',
    say: ['First, read the opening stanza. Because I could not stop for Death, he kindly stopped for me. The carriage held but just ourselves, and immortality.'],
  },
  question: {
    prompt: 'How is **Death** presented in this stanza?',
    text: 'Read the opening stanza of Because I could not stop for Death. How is Death presented in this stanza?',
    choices: [
      'as a terrifying monster chasing the speaker',
      'as an illness the speaker is fighting',
      'as a polite gentleman who calmly takes the speaker for a carriage ride',
      'as a reward the speaker has worked hard for',
    ],
    answer: 2,
    working: '*He* = **personified**; *kindly stopped* = **courteous**; *Carriage… Ourselves* = a calm **ride** together.',
    say: [
      'How is Death presented in this stanza?',
      'A: as a terrifying monster chasing the speaker. B: as an illness the speaker is fighting. C: as a polite gentleman who calmly takes the speaker for a carriage ride. D: as a reward the speaker has worked hard for.',
    ],
  },
  ask: [
    ['We have never seen this poem **before**', 'This may be a poem we have never seen before.'],
    ['How is **Death** shown?', 'We need to say how Death is presented.'],
  ],
  know: {
    title: 'Reading an unseen poem',
    md: 'Work through five questions. **Speaker**: who is talking? **Situation**: what is happening? **Structure**: how is it shaped, and where does it change? **Imagery**: what pictures and comparisons stand out? **Turn**: where does the thought or feeling shift? Then judge the **effect** on the reader, and quote briefly for each point.',
    say: [
      'Here is the idea we need. When you meet an unseen poem, work through five questions. Speaker: who is talking? Situation: what is happening? Structure: how is it shaped, and where does it change? Imagery: what pictures and comparisons stand out? And turn: where does the thought or feeling shift?',
      'Then judge the effect on the reader, and quote briefly for each point.',
    ],
  },
  plan: [
    ['**Speaker** and **situation**', 'Here is the plan. First, the speaker and the situation.'],
    ['How does Death **behave**?', 'Second, how does Death behave?'],
    ['Name the **effect**', 'Third, name the effect.'],
  ],
  steps: [
    scene('Step 1: Speaker and situation', [table('t', ['Question', 'Answer'], [['speaker', '**I**: someone too busy to *stop for Death*'], ['situation', 'Death **stops** for her; they ride in a **carriage**'], ['who else rides?', '*Immortality*: life after death']])], [
      { say: 'Step one. The speaker is I, someone who was too busy to stop for Death.', show: 't.0' },
      { say: 'So Death stops for her instead, and they ride together in a carriage, with Immortality as the only other passenger.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Death’s manners', [quote('p', ['Because I could not stop for Death –', '[[good:He kindly stopped]] for me –', 'The [[good:Carriage]] held but just Ourselves –']), text('a', 'Personified as a **courteous** gentleman caller → **C**', 'lg')], [
      { say: 'Step two. Death is he, a person. He kindly stopped, like a polite gentleman offering a lift. The ride is calm, almost like a date.', show: 'p' },
      { say: 'So Death is personified as a courteous gentleman, which makes dying feel gentle rather than frightening. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['*kindly*: no **fear** or struggle', 'Let us check. Kindly: there is no fear or struggle anywhere in the stanza.'],
    ['and a **carriage** is a calm, social ride', 'And a carriage is a calm, social ride. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Death is usually feared, but here he is **kind**', 'Choice A is the trap. We usually expect Death to be frightening, but here he is kind.'],
      ['B', 'No **illness** or fighting', 'Choice B: there is no illness and no fight.'],
      ['D', 'She **could not stop**: she was not seeking it', 'Choice D: she could not stop for Death. She was not working towards it.'],
    ],
  },
  yourTurn: {
    prompt: 'When you meet an unseen poem in an exam, which question is the best one to ask **first**?',
    choices: ['How many lines does it have?', 'What year was it written?', 'Which words are hardest to spell?', 'Who is speaking, and in what situation?'],
    answer: 3,
    working: 'Start with the **speaker** and the **situation**.',
    ask: 'When you meet an unseen poem in an exam, which question is the best one to ask first? A: How many lines does it have? B: What year was it written? C: Which words are hardest to spell? D: Who is speaking, and in what situation?',
    reveal: 'The answer is D. Knowing who is speaking, and what is happening, gives you a firm base for every other point.',
  },
  sum: [
    ['Start with **speaker** and **situation**', 'Here is what to remember. Start an unseen poem with the speaker and the situation.'],
    ['Then **structure**, **imagery** and the **turn**', 'Then look at structure, imagery and the turn.'],
    ['Judge the **effect**, quoting briefly', 'And judge the effect, quoting briefly. For more on reading an unseen poem, watch this lesson’s explainer video on Gradileo.'],
  ],
});
