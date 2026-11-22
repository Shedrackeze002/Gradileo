import { englishExam, ks2, ks2Intro, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 4.1 (prefixes and suffixes). The Standards and Testing Agency's own
// question, word for word: 2025 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 1. The answer is "opposite": anticlockwise is the opposite direction to clockwise.

export default englishExam({
  lesson: 'e5-4-1',
  ...ks2(2025, 1),
  title: 'What Does the Prefix Anti- Mean in Anticlockwise?',
  thumbnailTitle: 'The Prefix Anti-',
  subtitle: 'Prefixes and meaning, step by step',
  summary:
    'A real test question, solved one small step at a time: what does the prefix anti- mean in the word anticlockwise? We split the word into its prefix and root word, test each choice in its place, and check the meaning with other anti- words.',
  intro: ks2Intro('prefixes'),
  question: {
    prompt: 'What does the prefix **anti-** mean in the word **anticlockwise**?',
    text: 'What does the prefix anti- mean in the word anticlockwise? Tick one.',
    choices: ['never', 'opposite', 'before', 'without'],
    answer: 1,
    working: '**Anticlockwise** means turning the **opposite** way to the hands of a clock.',
    say: ['What does the prefix anti mean in the word anticlockwise? Tick one. Never. Opposite. Before. Without.'],
  },
  ask: [
    ['**anti-** is a **prefix**', 'Anti is a prefix: a group of letters added to the start of a word.'],
    ['What **meaning** does it add to *clockwise*?', 'The question asks what meaning it adds when we put it in front of clockwise.'],
  ],
  know: {
    title: 'Prefixes',
    md: 'A **prefix** is added to the **start** of a root word to change its meaning: **un**happy (not happy), **re**build (build again), **pre**heat (heat before).',
    say: [
      'Here is the idea we need. A prefix is a group of letters added to the start of a root word, and it changes the meaning.',
      'For example, un means not, so unhappy means not happy. Re means again, so rebuild means build again. And pre means before, so preheat means heat before.',
    ],
  },
  plan: [
    ['Split the word: **prefix** + **root word**', 'Here is the plan. First, split the word into its prefix and its root word.'],
    ['Say what the **root word** means', 'Second, say what the root word means.'],
    ['Test each **choice** in place of the prefix', 'Third, test each choice in place of the prefix, and see which one gives the right meaning.'],
  ],
  steps: [
    scene('Step 1: Split the word', [text('w', '**anti** + **clockwise**', 'xl'), text('n', '*clockwise* = turning the same way as the hands of a clock')], [
      { say: 'Step one. Anticlockwise splits into the prefix anti and the root word clockwise.', show: 'w' },
      { say: 'Clockwise means turning the same way as the hands of a clock: from the top, round to the right.', show: 'n' },
    ]),
    scene('Step 2: Test each choice', [
      table('t', ['Choice', 'anticlockwise would mean…', 'Makes sense?'], [['never', 'never clockwise', '[[bad:✗]]'], ['opposite', 'the opposite of clockwise', '[[good:✓]]'], ['before', 'before clockwise', '[[bad:✗]]'], ['without', 'without clockwise', '[[bad:✗]]']]),
    ], [
      { say: 'Step two. Let us put each choice in place of anti. Pause and try it.', wait: 3 },
      { say: 'Never clockwise? That does not describe a direction.', show: 't.0' },
      { say: 'The opposite of clockwise? Yes. Anticlockwise means turning the other way, from the top round to the left.', show: 't.1', focus: 't.1' },
      { say: 'Before clockwise, and without clockwise, make no sense.', show: ['t.2', 't.3'] },
      { say: 'So anti means opposite. The answer is the second box, opposite.' },
    ]),
  ],
  check: [
    ['**anti**freeze works **against** freezing', 'Let us check with other anti words. Antifreeze is put in car engines to work against freezing.'],
    ['**anti**social goes **against** being social', 'And antisocial means against being friendly with others. Anti means opposite or against every time, so our answer holds.'],
  ],
  traps: {
    say: 'Each wrong answer is the meaning of a different prefix, which is what makes them tempting.',
    rows: [
      ['never', 'No common prefix means **never**', 'Never is a trap: no common prefix means never.'],
      ['before', 'That is **pre-** or **fore-**, as in *preview*', 'Before is the meaning of pre or fore, as in preview or forecast. Do not mix anti up with ante, which also means before.'],
      ['without', 'That is the suffix **-less**, as in *fearless*', 'Without is the meaning of the suffix less, as in fearless or careless.'],
    ],
  },
  yourTurn: {
    prompt: 'What does the prefix **re-** mean in the word **reheat**?',
    choices: ['again', 'not', 'under', 'after'],
    answer: 0,
    working: 'To **reheat** food is to heat it **again**.',
    ask: 'What does the prefix re mean in the word reheat?',
    reveal: 'The answer is A, again. To reheat food is to heat it again, just as to rebuild is to build again.',
  },
  sum: [
    ['A **prefix** goes at the start of a word and changes its meaning', 'Here is what to remember. A prefix goes at the start of a word and changes its meaning.'],
    ['Split the word, then test each meaning **in place** of the prefix', 'To find a prefix’s meaning, split the word, then test each choice in place of the prefix.'],
    ['**anti-** = opposite or against · **re-** = again · **pre-** = before', 'Anti means opposite or against, re means again and pre means before. For more on prefixes and suffixes, watch this lesson’s explainer video on Gradileo.'],
  ],
});
