import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 2.2 (sound devices). An exam-style question we wrote, in the style of a
// Grade 6 reading test, on a verse of Alfred, Lord Tennyson's "The Brook" (1855, public domain).
// The answer is B, onomatopoeia: chatter, bubble and babble sound like the noises they name.

const VERSE = ['I chatter over stony ways,', 'In little sharps and trebles,', 'I bubble into eddying bays,', 'I babble on the pebbles.'];

export default englishExam({
  lesson: 'e6-2-2',
  ...ours('a Grade 6 reading test', 'the poem is Alfred, Lord Tennyson’s “The Brook” (1855, public domain)'),
  title: 'Which Sound Device Do Chatter, Bubble and Babble Show?',
  thumbnailTitle: 'Sound Devices',
  subtitle: 'Onomatopoeia and alliteration, step by step',
  summary:
    'An exam-style question on Alfred, Lord Tennyson’s poem “The Brook”, solved one small step at a time: the words chatter, bubble and babble are examples of which sound device? We hear each word, learn how onomatopoeia, alliteration, assonance and rhyme differ, and match the words to one of them.',
  intro: [
    'In this video, we solve an exam-style question about sound devices in a poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The poem is by Alfred, Lord Tennyson, and the speaker is a brook, a small stream, talking about itself.',
  ],
  passage: {
    lines: VERSE,
    by: 'Alfred, Lord Tennyson, “The Brook”',
    say: ['First, read the verse, and listen to it. I chatter over stony ways, in little sharps and trebles, I bubble into eddying bays, I babble on the pebbles.'],
  },
  question: {
    prompt: 'The words **chatter**, **bubble** and **babble** are examples of which sound device?',
    text: 'Read the verse from “The Brook” by Alfred, Lord Tennyson. The words chatter, bubble and babble are examples of which sound device?',
    choices: ['rhyme', 'onomatopoeia', 'alliteration', 'assonance'],
    answer: 1,
    working: 'Each word **sounds like** the noise it names: water chattering, bubbling and babbling.',
    say: ['The words chatter, bubble and babble are examples of which sound device? A: rhyme. B: onomatopoeia. C: alliteration. D: assonance.'],
  },
  ask: [
    ['Three **separate words**', 'The question picks out three separate words from different lines.'],
    ['What do they **each** do with **sound**?', 'So we need the device that each word shows on its own, through its sound.'],
  ],
  know: {
    title: 'Sound devices',
    md: '**Onomatopoeia**: a word that **sounds like** what it means (*buzz*, *splash*). **Alliteration**: the **same first sound** in words close together (*slippery snake*). **Assonance**: repeated **vowel** sounds (*the rain in Spain*). **Rhyme**: matching **end** sounds.',
    say: [
      'Here is what we need. Onomatopoeia is a word that sounds like what it means, like buzz or splash.',
      'Alliteration is the same first sound in words close together, like slippery snake. Assonance is a repeated vowel sound inside words, like the rain in Spain. And rhyme is matching end sounds.',
    ],
  },
  plan: [
    ['**Say** each word aloud', 'Here is the plan. First, say each word aloud.'],
    ['Ask: does it **sound like** its meaning?', 'Second, ask whether it sounds like what it means.'],
    ['Rule out the **other** devices', 'Third, rule out the other devices.'],
  ],
  steps: [
    scene('Step 1: Hear each word', [quote('p', ['I [[theta:chatter]] over stony ways,', 'In little sharps and trebles,', 'I [[theta:bubble]] into eddying bays,', 'I [[theta:babble]] on the pebbles.']), table('t', ['Word', 'The sound it names'], [['chatter', 'quick, light, busy noise'], ['bubble', 'popping, gurgling'], ['babble', 'a steady, murmuring flow']])], [
      { say: 'Step one. Say them aloud: chatter, bubble, babble.', show: 'p' },
      { say: 'Chatter is a quick, light, busy noise, like water rushing over stones.', show: 't.0' },
      { say: 'Bubble pops and gurgles as you say it.', show: 't.1' },
      { say: 'Babble murmurs on and on, like a stream that never stops.', show: 't.2' },
      { say: 'Each word sounds like the noise of the water. That is onomatopoeia.' },
    ]),
    scene('Step 2: Rule out the others', [table('r', ['Device', 'Fits the three words?'], [['rhyme', '[[bad:✗ chatter, bubble, babble do not rhyme]]'], ['alliteration', '[[bad:✗ chatter starts with ch]]'], ['assonance', '[[bad:✗ the vowels differ]]'], ['onomatopoeia', '[[good:✓ each sounds like its meaning]]']]), text('a', 'The answer is **B, onomatopoeia**.')], [
      { say: 'Step two. Let us rule out the others. The three words do not rhyme with each other.', show: 'r.0' },
      { say: 'They do not all start with the same sound: chatter starts with ch. So it is not alliteration.', show: 'r.1' },
      { say: 'Their vowel sounds are different, so it is not assonance.', show: 'r.2' },
      { say: 'Only onomatopoeia fits all three. The answer is B.', show: ['r.3', 'a'] },
    ]),
  ],
  check: [
    ['A brook **makes** these noises', 'Let us check. A brook really does chatter, bubble and babble, so the words imitate its sounds.'],
    ['The speaker **is** the brook, so it describes itself in its own sounds', 'And since the speaker is the brook, it describes itself in its own noises, which makes onomatopoeia the perfect choice.'],
  ],
  traps: {
    say: 'This verse is full of sound devices, which is what makes the traps tempting.',
    rows: [
      ['C', '**bubble** and **babble** alliterate, but **chatter** does not', 'Choice C is the big trap. Bubble and babble both start with b, and there is alliteration in babble on the pebbles. But the question is about all three words, and chatter starts with ch.'],
      ['A', 'The **line endings** rhyme, not these words', 'Choice A: the line endings rhyme, ways with bays, trebles with pebbles. But chatter, bubble and babble do not.'],
      ['D', 'The **vowels** are different', 'Choice D: the vowels in the three words are all different.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses **alliteration**?',
    choices: ['The bee buzzed by the window.', 'Seven silver swans swam silently.', 'The bell rang loudly.', 'The cat sat on the mat.'],
    answer: 1,
    working: 'The **s** sound starts every word: alliteration.',
    ask: 'Which sentence uses alliteration?',
    reveal: 'The answer is B. Seven silver swans swam silently: every word starts with the same s sound. A has onomatopoeia, buzzed, and D has rhyme.',
  },
  sum: [
    ['**Onomatopoeia**: a word that sounds like its meaning', 'Here is what to remember. Onomatopoeia is a word that sounds like its meaning.'],
    ['**Alliteration**: same first sounds · **assonance**: same vowels · **rhyme**: same endings', 'Alliteration repeats first sounds, assonance repeats vowel sounds, and rhyme matches end sounds.'],
    ['Say the words **aloud**, and check **every** word in the question', 'Say the words aloud, and check that your answer fits every word in the question. For more on sound devices, watch this lesson’s explainer video on Gradileo.'],
  ],
});
