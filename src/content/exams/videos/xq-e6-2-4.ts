import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 2.4 (mood). An exam-style question we wrote, in the style of a Grade 6
// reading test, on the first stanza of Edgar Allan Poe's "The Raven" (1845, public domain). The
// answer is C, eerie: midnight, dreariness, weariness and a mysterious tapping at the door.

const STANZA = [
  'Once upon a midnight dreary, while I pondered, weak and weary,',
  'Over many a quaint and curious volume of forgotten lore—',
  'While I nodded, nearly napping, suddenly there came a tapping,',
  'As of some one gently rapping, rapping at my chamber door.',
  '“’Tis some visitor,” I muttered, “tapping at my chamber door—',
  'Only this and nothing more.”',
];

export default englishExam({
  lesson: 'e6-2-4',
  ...ours('a Grade 6 reading test', 'the poem is Edgar Allan Poe’s “The Raven” (1845, public domain)'),
  title: 'What Is the Mood of the First Stanza of The Raven?',
  thumbnailTitle: 'Finding the Mood',
  subtitle: 'How a poem makes you feel, step by step',
  summary:
    'An exam-style question on Edgar Allan Poe’s poem “The Raven”, solved one small step at a time: which word best describes the mood of the first stanza? We collect the words about time, place and sound, see what feeling they build together, and test each choice.',
  intro: [
    'In this video, we solve an exam-style question about the mood of a poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The poem is Edgar Allan Poe’s The Raven, from eighteen forty-five.',
  ],
  passage: {
    lines: STANZA,
    by: 'Edgar Allan Poe, “The Raven” (first stanza)',
    say: [
      'First, read the stanza. Once upon a midnight dreary, while I pondered, weak and weary, over many a quaint and curious volume of forgotten lore.',
      'While I nodded, nearly napping, suddenly there came a tapping, as of some one gently rapping, rapping at my chamber door. “’Tis some visitor,” I muttered, “tapping at my chamber door. Only this and nothing more.”',
    ],
  },
  question: {
    prompt: 'Which word best describes the **mood** of this stanza?',
    text: 'Read the first stanza of “The Raven” by Edgar Allan Poe. Which word best describes the mood of this stanza?',
    choices: ['cheerful', 'peaceful', 'eerie', 'excited'],
    answer: 2,
    working: 'Midnight, “dreary”, “weary”, “forgotten” and a mysterious tapping build a strange, uneasy feeling.',
    say: ['Which word best describes the mood of this stanza? A: cheerful. B: peaceful. C: eerie. D: excited.'],
  },
  ask: [
    ['**Mood** is how the poem makes the **reader** feel', 'Mood is the feeling a poem creates in the reader.'],
    ['Which word names **that** feeling?', 'So we need the word that best names the feeling this stanza gives us.'],
  ],
  know: {
    title: 'Mood',
    md: '**Mood** is the **feeling** a text creates in the **reader**: gloomy, eerie, joyful, tense. Writers build it from the **setting**, **word choice** and **sounds**. **Eerie** means strange and slightly frightening.',
    say: [
      'Here is the idea we need. Mood is the feeling a text creates in the reader, such as gloomy, eerie, joyful or tense.',
      'Writers build mood from the setting, the words they choose and even the sounds. Eerie means strange in a way that makes you a little frightened.',
    ],
  },
  plan: [
    ['Collect words about **time** and **place**', 'Here is the plan. First, collect words about the time and place.'],
    ['Collect words about the **speaker** and the **sounds**', 'Second, collect words about the speaker and the sounds.'],
    ['Name the **feeling** they build together', 'Third, name the feeling they build together.'],
  ],
  steps: [
    scene('Step 1: Collect the clues', [quote('p', STANZA), table('t', ['Clue', 'What it adds'], [['**midnight dreary**', 'dark, dull, gloomy'], ['**weak and weary**, nearly napping', 'tired, alone'], ['**forgotten** lore', 'old, mysterious'], ['**suddenly** a **tapping**, rapping', 'an unexplained sound in the dark']])], [
      { say: 'Step one. Pause and collect the words that set the feeling.', show: 'p', wait: 3 },
      { say: 'It is midnight, and dreary: dark and gloomy.', show: 't.0', focus: 'p.0' },
      { say: 'The speaker is weak and weary, nearly falling asleep, alone with his books.', show: 't.1' },
      { say: 'He is reading forgotten lore: old, strange knowledge.', show: 't.2', focus: 'p.1' },
      { say: 'Then, suddenly, there is a tapping at his door. Who knocks at midnight? He tries to calm himself: only a visitor, nothing more. But that makes us more uneasy, not less.', show: 't.3', focus: ['p.2', 'p.3', 'p.4', 'p.5'] },
    ]),
    scene('Step 2: Name the feeling', [text('n', 'gloomy midnight + tired, alone + a **mysterious knock** → **strange and uneasy**', 'lg'), text('a', 'The answer is **C, eerie**.')], [
      { say: 'Step two. A gloomy midnight, a tired man alone, and a mysterious knock at the door. Together, they make us feel that something strange is about to happen.', show: 'n' },
      { say: 'That feeling is eerie. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The **sounds** help too: *tapping, rapping*', 'Let us check with the sounds. The repeated tapping, rapping, rapping is like a knock that will not stop, which adds to the eerie mood.'],
    ['Nothing in the stanza is **happy** or **calm** for long', 'And nothing in the stanza is happy, or calm for long. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Quiet and sleepy **at first**, but the tapping breaks the calm', 'Choice B is tempting for the first lines, where the speaker is nodding off. But the sudden tapping breaks that calm, and mood is about the whole stanza.'],
      ['D', 'Something **happens**, but it is not a happy excitement', 'Choice D: something happens, but excited suggests a happy thrill. This feeling is uneasy.'],
      ['A', '**No** cheerful words at all', 'Choice A has no evidence: dreary, weary and forgotten are not cheerful words.'],
    ],
  },
  yourTurn: {
    prompt: '*Sunlight danced on the water, children laughed on the swings, and the smell of fresh bread drifted from the bakery.* Which word best describes the mood?',
    choices: ['tense', 'gloomy', 'frightening', 'joyful'],
    answer: 3,
    working: 'Dancing sunlight, laughter and fresh bread build a happy feeling.',
    ask: 'Sunlight danced on the water, children laughed on the swings, and the smell of fresh bread drifted from the bakery. Which word best describes the mood?',
    reveal: 'The answer is D, joyful. Dancing sunlight, laughing children and the smell of fresh bread all build a happy feeling.',
  },
  sum: [
    ['**Mood** is the feeling a text creates in the **reader**', 'Here is what to remember. Mood is the feeling a text creates in the reader.'],
    ['Collect clues from the **setting**, **words** and **sounds**', 'Collect the clues from the setting, the word choices and the sounds.'],
    ['Name the feeling of the **whole** passage, not one line', 'And name the feeling of the whole passage, not just one line. For more on mood, watch this lesson’s explainer video on Gradileo.'],
  ],
});
