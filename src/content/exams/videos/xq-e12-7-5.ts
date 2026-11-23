import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 7.5 (etymology and academic vocabulary). An exam-style vocabulary question we
// wrote, in the style of a Grade 12 language test. The answer is B: "ambivalent" comes from the Latin ambi-
// (both) and valens (being strong), so it means having strong feelings both ways.

export default englishExam({
  lesson: 'e12-7-5',
  ...ours('a Grade 12 language test'),
  title: 'What Does “Ambivalent” Mean? Using Etymology',
  thumbnailTitle: 'Etymology',
  subtitle: 'Word history and academic vocabulary, step by step',
  summary:
    'An exam-style vocabulary question, solved one small step at a time: “The narrator is ambivalent about leaving home.” We split the word into its Latin parts, build its meaning, and check it in the sentence.',
  intro: [
    'In this video, we solve an exam-style vocabulary question using etymology, the history of words. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 language test.',
  ],
  question: {
    prompt: 'What does **ambivalent** mean in this sentence?<br>*The narrator is ambivalent about leaving home: she longs for the city, yet dreads saying goodbye.*',
    text: 'What does ambivalent mean in this sentence? The narrator is ambivalent about leaving home: she longs for the city, yet dreads saying goodbye.',
    choices: ['completely certain', 'having mixed, opposing feelings', 'angry and resentful', 'not interested at all'],
    answer: 1,
    working: '**ambi-** = both + **valent** = being strong → strong feelings **both ways**: *longs* **and** *dreads*.',
    say: [
      'What does ambivalent mean in this sentence? The narrator is ambivalent about leaving home: she longs for the city, yet dreads saying goodbye.',
      'A: completely certain. B: having mixed, opposing feelings. C: angry and resentful. D: not interested at all.',
    ],
  },
  ask: [
    ['**Ambivalent**: a precise analytical word', 'Ambivalent is a precise word often used in analysis.'],
    ['What does it **mean**?', 'We need to work out what it means.'],
  ],
  know: {
    title: 'Etymology and academic vocabulary',
    md: '**Etymology** is a word’s history. Many academic words come from **Latin** and **Greek**: **ambi-** (both), **val** (strong, worth), **juxta** (beside), **pos** (place), **ironia** (pretended ignorance). In analysis, choose **precise** verbs and adjectives: *portrays*, *conveys*, *undermines*, *ambivalent*, *ironic*, rather than vague words like *shows* or *says*.',
    say: [
      'Here is the idea we need. Etymology is the history of a word. Many academic words come from Latin and Greek: ambi, meaning both; val, meaning strong or worth; juxta, meaning beside; and pos, meaning place.',
      'In analysis, choose precise verbs and adjectives, like portrays, conveys, undermines, ambivalent or ironic, rather than vague words like shows or says.',
    ],
  },
  plan: [
    ['Split the word into **parts**', 'Here is the plan. First, split the word into its parts.'],
    ['Build the **meaning**', 'Second, build the meaning.'],
    ['Check in the **sentence**', 'Third, check it in the sentence.'],
  ],
  steps: [
    scene('Step 1: The parts', [table('t', ['Part', 'Meaning', 'Also in'], [['**ambi-**', 'both', '*ambidextrous*: using both hands'], ['**valent**', 'being strong', '*valiant*, *value*']])], [
      { say: 'Step one. Ambi means both, as in ambidextrous, able to use both hands well.', show: 't.0' },
      { say: 'Valent comes from a Latin word meaning being strong, as in valiant.', show: 't.1' },
    ]),
    scene('Step 2: Build and check', [text('m', '**both** + **strong** → strong feelings **both ways**'), quote('p', ['…she [[good:longs]] for the city, yet [[bad:dreads]] saying goodbye.']), text('a', 'Mixed, opposing feelings → **B**', 'lg')], [
      { say: 'Step two. Put them together: strong feelings both ways. An ambivalent person is pulled in two directions at once.', show: 'm' },
      { say: 'Check in the sentence: she longs for the city, yet dreads saying goodbye. Two opposite feelings at once. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['*longs* **and** *dreads*: both feelings are **strong**', 'Let us check. Longs and dreads: both feelings are strong.'],
    ['so she is not **indifferent**; she is **torn**', 'So she is not indifferent. She is torn. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Ambivalent means **too much** feeling, not **none**', 'Choice D is the trap. Many people use ambivalent to mean not caring, but it means strong feelings both ways, not no feeling.'],
      ['A', 'She is **torn**, not certain', 'Choice A: she is torn, not certain.'],
      ['C', 'No **anger** in the sentence', 'Choice C: there is no anger in the sentence.'],
    ],
  },
  yourTurn: {
    prompt: 'Which verb is most **precise** for analysis? *The writer ___ the city as a trap.*',
    choices: ['portrays', 'does', 'makes', 'says'],
    answer: 0,
    working: '*portrays* = **presents** in a particular way: precise.',
    ask: 'Which verb is most precise for analysis? The writer, blank, the city as a trap. A: portrays. B: does. C: makes. D: says.',
    reveal: 'The answer is A, portrays. It says exactly what the writer does: presents the city in a particular way.',
  },
  sum: [
    ['Split a word into its **roots**', 'Here is what to remember. Split a word into its roots.'],
    ['**ambi-** = both · **ambivalent** = torn both ways', 'Ambi means both, and ambivalent means torn both ways.'],
    ['Choose **precise** words for analysis', 'And choose precise words for analysis. For more on etymology and academic vocabulary, watch this lesson’s explainer video on Gradileo.'],
  ],
});
