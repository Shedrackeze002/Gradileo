import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 7.5 (word roots and precise diction). An exam-style vocabulary question we
// wrote, in the style of a Grade 11 language test. The answer is C: "benevolent" comes from the Latin
// bene (well) and volens (wishing), so it means kind and wishing to do good.

export default englishExam({
  lesson: 'e11-7-5',
  ...ours('a Grade 11 language test'),
  title: 'What Does “Benevolent” Mean? Using Word Roots',
  thumbnailTitle: 'Word Roots',
  subtitle: 'Roots, prefixes and precise words, step by step',
  summary:
    'An exam-style vocabulary question, solved one small step at a time: “The benevolent stranger paid for our meal.” We split the word into its Latin parts, build a meaning from them, and check it against the sentence.',
  intro: [
    'In this video, we solve an exam-style vocabulary question using word roots. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 language test.',
  ],
  question: {
    prompt: 'What does **benevolent** mean in this sentence?<br>*The benevolent stranger paid for our meal and left without a word.*',
    text: 'What does benevolent mean in this sentence? The benevolent stranger paid for our meal and left without a word.',
    choices: ['very wealthy', 'suspicious', 'kind and wishing to do good', 'loud and rude'],
    answer: 2,
    working: '**bene** = well, good + **vol** = wish → *wishing good*: **kind**.',
    say: [
      'What does benevolent mean in this sentence? The benevolent stranger paid for our meal and left without a word.',
      'A: very wealthy. B: suspicious. C: kind and wishing to do good. D: loud and rude.',
    ],
  },
  ask: [
    ['**Benevolent** may be a new word', 'Benevolent may be a word you have not met before.'],
    ['Its **parts** hold the meaning', 'We can work out its meaning from its parts.'],
  ],
  know: {
    title: 'Roots and precise diction',
    md: 'Many English words are built from **Greek** and **Latin** parts. Some useful ones: **bene** (well, good), **mal** (bad), **vol** (wish, will), **bio** (life), **chron** (time), **-ology** (study of). **Precise diction** means choosing the exact word: avoid vague words (*nice*, *thing*), **jargon** the reader will not know, **euphemism** that hides the truth (*passed away* for *died*), and **cliché** (*at the end of the day*).',
    say: [
      'Here is the idea we need. Many English words are built from Greek and Latin parts. Some useful ones are bene, meaning well or good; mal, meaning bad; vol, meaning wish or will; bio, meaning life; chron, meaning time; and ology, meaning the study of.',
      'Precise diction means choosing the exact word. Avoid vague words like nice or thing, jargon the reader will not know, euphemism that softens or hides the truth, like passed away for died, and cliché, like at the end of the day.',
    ],
  },
  plan: [
    ['Split the word into **parts**', 'Here is the plan. First, split the word into its parts.'],
    ['Build a **meaning**', 'Second, build a meaning from them.'],
    ['Check it in the **sentence**', 'Third, check it in the sentence.'],
  ],
  steps: [
    scene('Step 1: The parts', [table('t', ['Part', 'Meaning', 'Also in'], [['**bene**', 'well, good', '*benefit*'], ['**vol**', 'wish, will', '*volunteer*'], ['**-ent**', 'being, doing', '*different*']])], [
      { say: 'Step one. Bene means well or good, as in benefit.', show: 't.0' },
      { say: 'Vol means wish or will, as in volunteer, someone who acts by their own will.', show: 't.1' },
      { say: 'And the ending, e n t, makes it describe a person or thing.', show: 't.2' },
    ]),
    scene('Step 2: Build and check', [text('m', '**bene** + **vol** = *wishing good* → **kind**'), quote('p', ['The [[good:benevolent]] stranger [[good:paid for our meal]] and left without a word.']), text('a', 'Kind, wishing to do good → **C**', 'lg')], [
      { say: 'Step two. Put the parts together: wishing good. A benevolent person is kind and wants to do good for others.', show: 'm' },
      { say: 'Check it in the sentence. The stranger paid for our meal and asked for nothing back. That is a kind act. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Opposite: **mal**evolent = wishing **harm**', 'Let us check with the opposite. Malevolent, with mal for bad, means wishing harm.'],
    ['so **bene**volent = wishing **good**', 'So benevolent means wishing good. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Paying suggests **money**, but the root means **good will**', 'Choice A is the trap. Paying for a meal suggests money, but nothing in the word means rich. The root means wishing good.'],
      ['B', 'He acts **kindly**; nothing is suspicious', 'Choice B: the stranger acts kindly, and nothing in the sentence is suspicious.'],
      ['D', 'He leaves **quietly**, without a word', 'Choice D: the stranger leaves quietly, without a word.'],
    ],
  },
  yourTurn: {
    prompt: 'A news report says a famous actor *“passed away”* instead of *“died”*. What is this softer phrase called?',
    choices: ['a euphemism', 'a cliché', 'jargon', 'hyperbole'],
    answer: 0,
    working: 'A **gentler** word for something painful: a **euphemism**.',
    ask: 'A news report says a famous actor passed away instead of died. What is this softer phrase called? A: a euphemism. B: a cliché. C: jargon. D: hyperbole.',
    reveal: 'The answer is A, a euphemism. Passed away is a gentler way of saying died.',
  },
  sum: [
    ['Split a new word into its **roots**', 'Here is what to remember. Split a new word into its roots.'],
    ['**bene** = good · **mal** = bad · **vol** = wish', 'Bene means good, mal means bad, and vol means wish.'],
    ['Check the meaning **in the sentence**', 'And always check the meaning in the sentence. For more on word roots and precise diction, watch this lesson’s explainer video on Gradileo.'],
  ],
});
