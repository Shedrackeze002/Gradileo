import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 2.3 (tone and shifts). An exam-style question we wrote, in the style of a
// Grade 8 reading test, on a short poem we wrote. The answer is B: the tone shifts at "But" in line 5,
// from carefree joy to quiet sadness.

const POEM = [
  'All summer long we raced the tide,<br>We built our castles, shouted, swam;<br>The sun stayed up, the days were wide,<br>And every evening tasted of jam.',
  'But now the beach is grey and still,<br>The castles gone without a trace;<br>I walk alone along the hill<br>And cannot quite recall your face.',
];

export default englishExam({
  lesson: 'e8-2-3',
  ...ours('a Grade 8 reading test', 'the poem is by Gradileo'),
  title: 'Where Does the Tone of the Poem Shift?',
  thumbnailTitle: 'Tone Shifts',
  subtitle: 'Finding and explaining a shift in tone, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time: a poem about a childhood summer at the beach turns at one word. We describe the tone of each stanza precisely, find the turning point, and explain what changes.',
  intro: [
    'In this video, we solve an exam-style poetry question about shifts in tone. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its poem ourselves, in the style of a Grade 8 reading test.',
  ],
  passage: {
    lines: POEM,
    by: 'A poem written for Gradileo',
    say: [
      'First, read the poem. All summer long we raced the tide, we built our castles, shouted, swam; the sun stayed up, the days were wide, and every evening tasted of jam.',
      'But now the beach is grey and still, the castles gone without a trace; I walk alone along the hill and cannot quite recall your face.',
    ],
  },
  question: {
    prompt: 'Where does the poem’s **tone shift**, and how?',
    text: 'Read the poem about the beach. Where does the poem’s tone shift, and how?',
    choices: [
      'In line 2, from calm to angry.',
      'In line 5, at “But”, from joyful to sad and lonely.',
      'In line 8, from sad to hopeful.',
      'The tone never changes.',
    ],
    answer: 1,
    working: 'Stanza 1 is **joyful** (*raced*, *shouted*, *jam*); at **“But now”** it turns **sad and lonely** (*grey*, *gone*, *alone*).',
    say: [
      'Where does the poem’s tone shift, and how?',
      'A: In line two, from calm to angry. B: In line five, at but, from joyful to sad and lonely. C: In line eight, from sad to hopeful. D: The tone never changes.',
    ],
  },
  ask: [
    ['**Tone** is the speaker’s **attitude**', 'Tone is the speaker’s attitude or feeling.'],
    ['**Where** does it change, and **how**?', 'We need where it changes, and how.'],
  ],
  know: {
    title: 'Tone and shifts',
    md: 'Describe tone with **precise** words: *nostalgic*, *bitter*, *playful*, *wistful*, rather than just *happy* or *sad*. A **shift** is a turn in tone. Look for **turning words** (*but*, *yet*, *now*, *then*), a change in **tense**, or a new **stanza**.',
    say: [
      'Here is the idea we need. Describe tone with precise words, like nostalgic, bitter, playful or wistful, rather than just happy or sad.',
      'A shift is a turn in tone. Look for turning words like but, yet, now or then, a change in tense, or a new stanza.',
    ],
  },
  plan: [
    ['Describe the tone of **stanza 1**', 'Here is the plan. First, describe the tone of stanza one.'],
    ['Describe the tone of **stanza 2**', 'Second, describe the tone of stanza two.'],
    ['Find the **turning point**', 'Third, find the turning point.'],
  ],
  steps: [
    scene('Step 1: The two tones', [table('t', ['', 'Key words', 'Tone'], [['Stanza 1', '*raced*, *shouted*, *swam*, *the days were wide*, *jam*', '[[good:joyful, carefree]]'], ['Stanza 2', '*grey*, *still*, *gone*, *alone*, *cannot recall*', '[[bad:sad, lonely, wistful]]']])], [
      { say: 'Step one. Stanza one is full of energy: raced, shouted, swam. The days were wide, and evenings tasted of jam. The tone is joyful and carefree.', show: 't.0' },
      { say: 'Stanza two is grey and still. The castles are gone, the speaker is alone, and cannot recall a face. The tone is sad, lonely and wistful.', show: 't.1' },
    ]),
    scene('Step 2: The turning point', [quote('p', ['[[theta:But now]] the beach is grey and still,']), text('a', '**But** turns the poem; **now** moves from past to present → **B**', 'lg')], [
      { say: 'Step two. The turn comes at the first word of line five: but. And now moves us from the happy past to the lonely present.', show: 'p' },
      { say: 'So the tone shifts in line five, at but, from joyful to sad and lonely. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The **tense** changes too: *raced* → *is*', 'Let us check. The tense changes at the same moment: raced and swam become is and walk.'],
    ['Past joy, present loss', 'Past joy turns to present loss. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'The ending is **sadder**, not hopeful', 'Choice C is the trap. The last line is the saddest of all: the speaker cannot even recall the face.'],
      ['A', '**Shouted** is play, not **anger**', 'Choice A: shouted here is children playing, not anger.'],
      ['D', 'The two stanzas feel **opposite**', 'Choice D: the two stanzas feel opposite.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word describes the tone of stanza 2 **most precisely**?',
    choices: ['bad', 'happy', 'wistful', 'angry'],
    answer: 2,
    working: '**Wistful** means sadly longing for something lost: exactly stanza 2.',
    ask: 'Which word describes the tone of stanza two most precisely? A: bad. B: happy. C: wistful. D: angry.',
    reveal: 'The answer is C, wistful. It means sadly longing for something that has gone, which is exactly how the speaker feels about that summer.',
  },
  sum: [
    ['Describe tone with **precise** words', 'Here is what to remember. Describe tone with precise words.'],
    ['Look for **turning words**, **tense** changes and new **stanzas**', 'Look for turning words, changes of tense, and new stanzas.'],
    ['Say **where** the tone shifts, **from** what, **to** what', 'And say where the tone shifts, from what, and to what. For more on tone and shifts, watch this lesson’s explainer video on Gradileo.'],
  ],
});
