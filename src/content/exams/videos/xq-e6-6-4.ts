import { englishExam, ks2, ks2Intro, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 6.4 (commas and apostrophes). The question is the Standards and Testing
// Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling test,
// Paper 1, question 6, reused under the Open Government Licence v3.0. The answer is "The car’s horn
// beeps loudly.": one car owns the horn, so the apostrophe goes before the s.

export default englishExam({
  lesson: 'e6-6-4',
  ...ks2(2024, 6),
  title: 'Which Sentence Uses an Apostrophe Correctly?',
  thumbnailTitle: 'Apostrophes',
  subtitle: 'Apostrophes for possession, step by step',
  summary:
    'A real test question, solved one small step at a time: four versions of a sentence about a car horn, each with the apostrophe in a different place. We learn the two jobs of an apostrophe, work out who owns the horn, and find the one place it belongs.',
  intro: ks2Intro('apostrophes'),
  question: {
    prompt: 'Which sentence uses an **apostrophe** correctly?',
    text: 'Which sentence uses an apostrophe correctly? Tick one.',
    choices: ['The car’s horn beeps loudly.', 'The cars’ horn beeps loudly.', 'The cars horn beep’s loudly.', 'The cars horn beeps’ loudly.'],
    answer: 0,
    working: '**One** car owns the horn, so the apostrophe goes **before** the s: *car’s*.',
    say: [
      'Which sentence uses an apostrophe correctly? Tick one.',
      'A: The car apostrophe s horn beeps loudly. B: The cars apostrophe horn beeps loudly. C: The cars horn beep apostrophe s loudly. D: The cars horn beeps apostrophe loudly.',
    ],
  },
  ask: [
    ['The words are the **same**', 'The four sentences use the same words.'],
    ['Only the **apostrophe** moves', 'Only the apostrophe moves, so we must decide where it belongs.'],
  ],
  know: {
    title: 'The two jobs of an apostrophe',
    md: '**Contraction**: it shows missing letters (*do not* → *don’t*). **Possession**: it shows that something **belongs** to someone. **One** owner: add **’s** (*the dog’s bowl*). **More than one** owner ending in s: add **’** after the s (*the dogs’ bowls*). Verbs and plain plurals **never** take an apostrophe.',
    say: [
      'Here is the idea we need. An apostrophe has two jobs. In a contraction, it shows where letters are missing, as in don’t for do not.',
      'For possession, it shows that something belongs to someone. With one owner, we add apostrophe s, as in the dog’s bowl. With more than one owner ending in s, we add just the apostrophe after the s, as in the dogs’ bowls. Verbs and ordinary plurals never take an apostrophe.',
    ],
  },
  plan: [
    ['Find what is **owned**, and by **whom**', 'Here is the plan. First, find what is owned, and who owns it.'],
    ['Decide: **one** owner or **more**?', 'Second, decide whether there is one owner or more than one.'],
    ['Check where each apostrophe sits', 'Third, check where each sentence puts its apostrophe.'],
  ],
  steps: [
    scene('Step 1: Who owns what?', [text('w', 'the **horn** belongs to the **car**', 'xl'), text('n', 'One horn, so **one** car: the owner is singular → **car’s**')], [
      { say: 'Step one. What belongs to what? The horn belongs to the car.', show: 'w' },
      { say: 'And the sentence says the horn, just one, so it is one car. One owner means apostrophe s: car’s.', show: 'n' },
    ]),
    scene('Step 2: Check each sentence', [table('t', ['Sentence', 'Apostrophe', 'Right?'], [['A: The car’s horn…', 'one car owns the horn', '[[good:✓]]'], ['B: The cars’ horn…', 'many cars share **one** horn', '[[bad:✗]]'], ['C: …beep’s…', 'on a **verb**', '[[bad:✗]]'], ['D: …beeps’…', 'on a **verb**', '[[bad:✗]]']])], [
      { say: 'Step two. A writes car’s: one car owns the horn. That is right.', show: 't.0', focus: 't.0' },
      { say: 'B writes cars’: many cars owning one horn. That makes no sense.', show: 't.1' },
      { say: 'C and D put the apostrophe on beeps, which is a verb. Verbs never take an apostrophe, and they leave cars with none.', show: ['t.2', 't.3'] },
      { say: 'The answer is A.', focus: 't.0' },
    ]),
  ],
  check: [
    ['Say it as **the horn of the car**', 'Let us check. The car’s horn means the horn of the car.'],
    ['One owner, so **’s**', 'One owner, so apostrophe s. A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Treats the owner as **many** cars', 'Choice B is the closest trap. It puts the apostrophe after the s, which is for more than one owner.'],
      ['C', 'Puts it on the **verb**', 'Choice C puts the apostrophe on the verb, beeps.'],
      ['D', 'Also on the **verb**, after the s', 'Choice D also puts it on the verb, just after the s.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses an **apostrophe** correctly?',
    choices: ['The girls’s coats were wet.', 'The girl’s were wet.', 'The girls coat’s were wet.', 'The girls’ coats were wet.'],
    answer: 3,
    working: 'More than one girl ending in s → **girls’**.',
    ask: 'Which sentence uses an apostrophe correctly? A: The girls apostrophe s coats were wet. B: The girl apostrophe s were wet. C: The girls coat apostrophe s were wet. D: The girls apostrophe coats were wet.',
    reveal: 'The answer is D. There are many girls and many coats, so the apostrophe goes after the s of girls. Coats is just a plural, so it needs no apostrophe.',
  },
  sum: [
    ['Apostrophes show **missing letters** or **possession**', 'Here is what to remember. Apostrophes show missing letters, or possession.'],
    ['**One** owner → **’s** · **many** owners ending in s → **s’**', 'With one owner, add apostrophe s. With many owners ending in s, add the apostrophe after the s.'],
    ['Never on a **verb** or a plain **plural**', 'And never put an apostrophe on a verb or a plain plural. For more on commas and apostrophes, watch this lesson’s explainer video on Gradileo.'],
  ],
});
