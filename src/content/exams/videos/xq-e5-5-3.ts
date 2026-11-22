import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 5.3 (agreement and verb tense). The Standards and Testing Agency's own
// question, word for word: 2026 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 13 (each underlined verb has a box under it). The answer is "built": the sentence is in
// the present tense, so it should be "build".

const SENTENCE = 'When you <u>use</u> watercolour paints, it <u>is</u> important that you <u>begin</u> with lighter shades and <u>built</u> up colour gradually.';

export default englishExam({
  lesson: 'e5-5-3',
  ...ks2(2026, 13),
  title: 'Which Verb Is in the Wrong Tense?',
  thumbnailTitle: 'The Wrong Tense',
  subtitle: 'Keeping verbs in one tense, step by step',
  summary:
    'A real test question, solved one small step at a time: four underlined verbs in a sentence about watercolour paints, and one is in the wrong tense. We find the tense of each verb, see that the sentence is in the present, and spot the one verb that has slipped into the past.',
  intro: ks2Intro('verb tenses'),
  question: {
    prompt: `Tick one box to show which verb is in the wrong **tense** in the sentence below.<br>${SENTENCE}`,
    text: 'Tick one box to show which verb is in the wrong tense in the sentence below. When you use watercolour paints, it is important that you begin with lighter shades and built up colour gradually. (The verbs use, is, begin and built are underlined, each with a box.)',
    choices: ['use', 'is', 'begin', 'built'],
    answer: 3,
    working: 'The sentence is in the **present** tense; **built** is past. It should be **build**.',
    say: ['Tick one box to show which verb is in the wrong tense in the sentence below. When you use watercolour paints, it is important that you begin with lighter shades and built up colour gradually.', 'The four underlined verbs are use, is, begin and built.'],
  },
  ask: [
    ['Four underlined **verbs**', 'There are four underlined verbs: use, is, begin and built.'],
    ['One is in the **wrong tense**', 'One of them is in the wrong tense, meaning it does not match the time the rest of the sentence is set in.'],
  ],
  know: {
    title: 'Verb tense',
    md: 'The **tense** of a verb shows **when** something happens. **Present**: *I walk*, *I build*. **Past**: *I walked*, *I built*. Within one sentence about the same time, the verbs should stay in the **same tense**.',
    say: [
      'Here is the idea we need. The tense of a verb tells us when something happens. In the present tense: I walk, I build. In the past tense: I walked, I built.',
      'When a sentence talks about one time, its verbs should stay in the same tense. Jumping from present to past by mistake is a common error.',
    ],
  },
  plan: [
    ['Find the **tense** of each underlined verb', 'Here is the plan. First, find the tense of each underlined verb.'],
    ['Decide which tense the **sentence** is in', 'Second, decide which tense the sentence is mostly in.'],
    ['Spot the verb that does **not match**', 'Third, spot the verb that does not match.'],
  ],
  steps: [
    scene('Step 1: The tense of each verb', [
      quote('p', [SENTENCE]),
      table('t', ['Verb', 'Tense'], [['use', 'present'], ['is', 'present'], ['begin', 'present'], ['built', '[[bad:past]]']]),
    ], [
      { say: 'Step one. Pause and work out the tense of each underlined verb.', show: 'p', wait: 3 },
      { say: 'Use is present tense: when you use them.', show: 't.0' },
      { say: 'Is is present tense too: it is important.', show: 't.1' },
      { say: 'Begin is present: that you begin.', show: 't.2' },
      { say: 'But built is past tense. Today I build, yesterday I built.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Spot the odd one out', [text('n', 'The sentence gives **advice** that is always true → **present** tense'), text('fix', '…you begin with lighter shades and **build** up colour gradually.', 'lg')], [
      { say: 'Step two. The sentence gives advice about painting, which is true at any time, so it is in the present tense. Three verbs are present, and one is past.', show: 'n' },
      { say: 'Built is the odd one out. The sentence should say: you begin with lighter shades and build up colour gradually. So we tick the box under built.', show: 'fix' },
    ]),
  ],
  check: [
    ['*you begin … and **build** up* : both present ✓', 'Let us check by reading the corrected sentence. You begin with lighter shades and build up colour. Begin and build are both present, joined by and, so they match.'],
    ['*begin … built* sounds **wrong** when you read it aloud', 'And reading the original aloud, begin and built side by side sound wrong. Our answer holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['is', 'A small word, but a **present** tense verb', 'Is is a short word that people forget is a verb. It is present tense, and it fits.'],
      ['begin', 'An **irregular** verb, but present here', 'Begin is an irregular verb, which can feel unsafe. But begin is present tense; its past would be began.'],
      ['use', 'Correct: *when you use* paints', 'Use is correct: when you use watercolour paints.'],
    ],
  },
  yourTurn: {
    prompt: 'Which verb is in the wrong tense? *Every morning, Ana **wakes** early, **eats** her breakfast and **ran** to the bus before it **leaves**.*',
    choices: ['wakes', 'eats', 'ran', 'leaves'],
    answer: 2,
    working: 'Every morning → present tense. **ran** is past; it should be **runs**.',
    ask: 'Every morning, Ana wakes early, eats her breakfast and ran to the bus before it leaves. Which verb is in the wrong tense?',
    reveal: 'The answer is C, ran. Every morning tells us it is a habit, so the sentence is in the present tense. Ran is past, so it should be runs.',
  },
  sum: [
    ['**Tense** shows **when** something happens', 'Here is what to remember. The tense of a verb shows when something happens.'],
    ['Find the tense of **every** verb, then the sentence’s tense', 'Find the tense of every verb, then the tense of the whole sentence.'],
    ['The verb that **does not match** is wrong', 'The verb that does not match is the one in the wrong tense. For more on agreement and verb tense, watch this lesson’s explainer video on Gradileo.'],
  ],
});
