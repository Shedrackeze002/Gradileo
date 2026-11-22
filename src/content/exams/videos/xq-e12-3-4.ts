import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 3.4 (themes and interpretations). An exam-style question we wrote, in the
// style of a Grade 12 reading test, on William Shakespeare's Hamlet (about 1600), which is in the public
// domain. The answer is C: "Something is rotten in the state of Denmark" introduces the theme of
// corruption spreading from the throne through the whole country.

const LINES = ['**Marcellus:** Something is rotten in the state of Denmark.'];

export default englishExam({
  lesson: 'e12-3-4',
  ...ours('a Grade 12 reading test', 'the play is William Shakespeare’s Hamlet (about 1600), in the public domain'),
  title: 'What Theme Does “Something Is Rotten in Denmark” Introduce?',
  thumbnailTitle: 'Themes of Hamlet',
  subtitle: 'Themes and interpretations, step by step',
  summary:
    'An exam-style question on Hamlet, solved one small step at a time. After the Ghost appears, a guard says “Something is rotten in the state of Denmark.” We decode the line, follow the image of rot through the play, and name the theme it opens.',
  intro: [
    'In this video, we solve an exam-style question about the themes of Hamlet. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Hamlet, Act 1, Scene 4',
    say: ['First, the context. The Ghost of the dead king has appeared on the castle walls and beckoned Hamlet away. Marcellus, a guard, says: Something is rotten in the state of Denmark.'],
  },
  question: {
    prompt: 'Which **theme** does this line most clearly introduce?',
    text: 'Read the line from Hamlet, Act 1. Which theme does this line most clearly introduce?',
    choices: [
      'young love between Hamlet and Ophelia',
      'the importance of farming and food in Denmark',
      'corruption at the top of the state, spreading through the whole country',
      'the dangers of travelling by sea',
    ],
    answer: 2,
    working: '*rotten* = **decay**; *the **state** of Denmark* = the **kingdom** and its rulers → **corruption** spreading from the throne.',
    say: [
      'Which theme does this line most clearly introduce?',
      'A: young love between Hamlet and Ophelia. B: the importance of farming and food in Denmark. C: corruption at the top of the state, spreading through the whole country. D: the dangers of travelling by sea.',
    ],
  },
  ask: [
    ['Something is **rotten**', 'Marcellus says something is rotten.'],
    ['Which **theme** does that open?', 'We need to name the theme this opens.'],
  ],
  know: {
    title: 'Themes of Hamlet',
    md: 'Key themes include **revenge** and **justice**; **corruption** and **decay** (images of rot, disease and poison); **appearance and reality** (smiling villains, feigned madness, a play that tells the truth); **mortality** (the gravediggers, Yorick’s skull); and **action and delay**. A strong interpretation states a theme and supports it with **evidence**, and weighs other readings **against the text**.',
    say: [
      'Here is the idea we need. Key themes in Hamlet include revenge and justice; corruption and decay, shown through images of rot, disease and poison; appearance and reality, with smiling villains, feigned madness, and a play that tells the truth; mortality, with the gravediggers and Yorick’s skull; and action and delay.',
      'A strong interpretation states a theme, supports it with evidence, and weighs other readings against the text.',
    ],
  },
  plan: [
    ['Decode the **line**', 'Here is the plan. First, decode the line.'],
    ['Follow the **image** through the play', 'Second, follow the image through the play.'],
    ['Name the **theme**', 'Third, name the theme.'],
  ],
  steps: [
    scene('Step 1: Decode', [quote('p', ['Something is [[bad:rotten]] in the [[theta:state]] of Denmark.']), table('t', ['Word', 'Meaning'], [['*rotten*', 'decaying from **inside**'], ['*state*', 'the **kingdom**, its government and its king']])], [
      { say: 'Step one. Rotten means decaying from the inside, like fruit that looks fine but has gone bad.', show: ['p', 't.0'] },
      { say: 'State means the kingdom itself, its government and its king. So the rot is at the top.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Rot through the play', [table('r', ['Image', 'Where'], [['**poison** in the old king’s ear', 'the Ghost’s story'], ['*an unweeded garden*', 'Hamlet on the world'], ['a king who **murdered** to rule', 'Claudius']]), text('a', 'Corruption at the **top** spreads through the **state** → **C**', 'lg')], [
      { say: 'Step two. The image returns again and again: poison poured in the old king’s ear, the world as an unweeded garden, and a king who murdered his way to the throne.', show: ['r.0', 'r.1', 'r.2'] },
      { say: 'The rot starts at the throne and spreads through the whole country. The theme is corruption. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The Ghost has just **appeared**: something is wrong at court', 'Let us check. The line comes right after the dead king’s Ghost appears. Something is deeply wrong at court.'],
    ['so *rotten* points to **corruption**', 'So rotten points to corruption in the state. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '*rotten* is a **metaphor**, not real food', 'Choice B is the trap. Rotten suggests food, but it is a metaphor for the state.'],
      ['A', 'Ophelia is not **mentioned**', 'Choice A: Ophelia is not mentioned.'],
      ['D', 'Nothing about the **sea**', 'Choice D: there is nothing about the sea.'],
    ],
  },
  yourTurn: {
    prompt: 'Near the end of the play, Hamlet says *“The readiness is all.”* What does this suggest he has come to feel?',
    choices: ['that he must plan a war against Norway', 'that he hates Horatio', 'that he is afraid of the sea', 'that he must accept whatever happens, when it comes'],
    answer: 3,
    working: '*readiness* = being **prepared** to accept what comes.',
    ask: 'Near the end of the play, Hamlet says, the readiness is all. What does this suggest he has come to feel? A: that he must plan a war against Norway. B: that he hates Horatio. C: that he is afraid of the sea. D: that he must accept whatever happens, when it comes.',
    reveal: 'The answer is D. After long delay and doubt, Hamlet comes to accept that what will happen will happen, and that being ready is all that matters.',
  },
  sum: [
    ['Hamlet’s themes: **revenge**, **corruption**, **appearance and reality**', 'Here is what to remember. Hamlet’s themes include revenge, corruption, and appearance and reality.'],
    ['Images of **rot** and **poison** show corruption', 'Images of rot and poison show corruption.'],
    ['Support a theme with **evidence** across the play', 'And support a theme with evidence from across the play. For more on the themes of Hamlet, watch this lesson’s explainer video on Gradileo.'],
  ],
});
