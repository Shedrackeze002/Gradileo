import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 2.2 (form and metre). An exam-style question we wrote, in the style of a
// Grade 8 reading test, on the first line of William Shakespeare's Sonnet 18 (1609), which is in the
// public domain. The answer is A: five iambs (da-DUM) make iambic pentameter.

export default englishExam({
  lesson: 'e8-2-2',
  ...ours('a Grade 8 reading test', 'the line is from William Shakespeare’s Sonnet 18 (1609), in the public domain'),
  title: 'What Is the Metre of “Shall I Compare Thee to a Summer’s Day?”',
  thumbnailTitle: 'Iambic Pentameter',
  subtitle: 'Feet and metre, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the first line of Shakespeare’s Sonnet 18. We count the syllables, mark which ones are stressed, group them into feet, and name the metre.',
  intro: [
    'In this video, we solve an exam-style poetry question about metre. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on a line from Shakespeare, which is in the public domain.',
  ],
  question: {
    prompt: 'What is the **metre** of this line from Shakespeare’s Sonnet 18?<br>*Shall I compare thee to a summer’s day?*',
    text: 'What is the metre of this line from Shakespeare’s Sonnet 18? “Shall I compare thee to a summer’s day?”',
    choices: ['iambic pentameter', 'trochaic tetrameter', 'iambic tetrameter', 'free verse'],
    answer: 0,
    working: '10 syllables in **5** da-**DUM** feet: **iambic pentameter**.',
    say: ['What is the metre of this line from Shakespeare’s Sonnet 18? Shall I compare thee to a summer’s day? A: iambic pentameter. B: trochaic tetrameter. C: iambic tetrameter. D: free verse.'],
  },
  ask: [
    ['**Metre** is the **regular** pattern of beats', 'Metre is the regular pattern of beats in a line of poetry.'],
    ['Name the **kind** of foot and **how many**', 'We need to name the kind of foot, and how many there are.'],
  ],
  know: {
    title: 'Feet and metre',
    md: 'A **foot** is a small group of syllables. An **iamb** is da-**DUM** (unstressed, stressed). A **trochee** is **DUM**-da. The number of feet in a line: **tetrameter** = 4, **pentameter** = 5. So **iambic pentameter** = five da-DUMs, ten syllables.',
    say: [
      'Here is the idea we need. A foot is a small group of syllables. An iamb is da DUM: an unstressed syllable, then a stressed one. A trochee is the reverse, DUM da.',
      'Then we count the feet in a line. Four feet is tetrameter, and five feet is pentameter. So iambic pentameter is five da DUMs, which makes ten syllables.',
    ],
  },
  plan: [
    ['**Count** the syllables', 'Here is the plan. First, count the syllables.'],
    ['Mark the **stresses**', 'Second, mark the stressed syllables.'],
    ['Group into **feet** and name the metre', 'Third, group them into feet and name the metre.'],
  ],
  steps: [
    scene('Step 1: Count and stress', [text('s', 'shall **I** | com**PARE** | thee **TO** | a **SUM** | mer’s **DAY**', 'xl'), text('n', '10 syllables · stress on every **second** one')], [
      { say: 'Step one. Say the line slowly and count. Shall, I, com, pare, thee, to, a, sum, mer’s, day. Ten syllables.', show: 's' },
      { say: 'Now listen for the stresses: shall I, com PARE, thee TO, a SUM, mer’s DAY. The stress falls on every second syllable.', show: 'n' },
    ]),
    scene('Step 2: Name the metre', [table('t', ['Question', 'Answer'], [['kind of foot', 'da-**DUM** → **iamb**'], ['how many feet', '**5** → **pentameter**'], ['metre', '[[good:**iambic pentameter**]]']])], [
      { say: 'Step two. Each foot is da DUM, so it is an iamb.', show: 't.0' },
      { say: 'There are five feet, so it is pentameter.', show: 't.1' },
      { say: 'Iambic pentameter. The answer is A.', show: 't.2', focus: 't.2' },
    ]),
  ],
  check: [
    ['**Sonnets** are usually written in iambic pentameter', 'Let us check. Shakespeare’s sonnets are written in iambic pentameter, so this fits.'],
    ['It sounds like a **heartbeat**: da-DUM, da-DUM', 'And it sounds like a heartbeat: da DUM, da DUM. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '**Shall I** can sound stressed at first, but the pattern is da-**DUM**', 'Choice B is the trap. If you stress Shall, it sounds like a trochee at first, but the rest of the line is clearly da DUM.'],
      ['C', '**Four** feet would be only **eight** syllables', 'Choice C: tetrameter would be only eight syllables.'],
      ['D', 'The beat is **regular**', 'Choice D: free verse has no regular beat, but this line does.'],
    ],
  },
  yourTurn: {
    prompt: 'What is the metre of William Blake’s line *“Tyger Tyger, burning bright”*?',
    choices: ['iambic pentameter', 'trochaic tetrameter', 'iambic tetrameter', 'free verse'],
    answer: 1,
    working: '**TY**-ger **TY**-ger **BURN**-ing **BRIGHT**: **DUM**-da feet, four beats.',
    ask: 'What is the metre of William Blake’s line, Tyger Tyger, burning bright? A: iambic pentameter. B: trochaic tetrameter. C: iambic tetrameter. D: free verse.',
    reveal: 'The answer is B, trochaic tetrameter. TY ger, TY ger, BURN ing, BRIGHT: four strong beats, each starting a DUM da foot. The last foot is cut short.',
  },
  sum: [
    ['**Iamb** = da-DUM · **trochee** = DUM-da', 'Here is what to remember. An iamb is da DUM, and a trochee is DUM da.'],
    ['**Tetrameter** = 4 feet · **pentameter** = 5 feet', 'Tetrameter means four feet, and pentameter means five.'],
    ['Count syllables, mark stresses, then **group** into feet', 'Count the syllables, mark the stresses, then group them into feet. For more on form and metre, watch this lesson’s explainer video on Gradileo.'],
  ],
});
