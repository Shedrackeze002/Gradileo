import { englishExam, ks2, ks2Intro, scene, text, bullets } from '../english.ts';

// Grade 5 English, lesson 5.4 (capital letters and end marks). The question is the Standards and
// Testing Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling
// test, Paper 1, question 13. The key stage 2 grammar tests hold no third-party material, so they
// may be reused under the Open Government Licence v3.0. The answer is the third sentence: "July"
// and "Newcastle" are proper nouns, and "grandparents" is a common noun.

const CHOICES = [
  'In July, I will visit my grandparents in newcastle.',
  'In July, I will visit my Grandparents in Newcastle.',
  'In July, I will visit my grandparents in Newcastle.',
  'In july, I will visit my grandparents in Newcastle.',
];

export default englishExam({
  lesson: 'e5-5-4',
  ...ks2(2024, 13),
  title: 'Which Sentence Uses Capital Letters Correctly?',
  thumbnailTitle: 'Capital Letters',
  subtitle: 'Proper nouns, step by step',
  summary:
    'A real test question, solved one small step at a time: four sentences about a visit to grandparents in July, and only one uses capital letters correctly. We check every word that could need a capital, sort proper nouns from common nouns, and find the one sentence that gets them all right.',
  intro: ks2Intro('capital letters'),
  question: {
    prompt: 'Which sentence uses capital letters correctly?',
    text: 'Which sentence uses capital letters correctly? Tick one.',
    choices: CHOICES,
    answer: 2,
    working: '**July** and **Newcastle** are proper nouns, so they take capitals; **grandparents** is a common noun, so it does not.',
    say: [
      'Which sentence uses capital letters correctly? Tick one.',
      'Here are the four sentences. Read them carefully, because they look almost the same.',
    ],
  },
  ask: [
    ['Four sentences with the **same words**', 'Look closely, and you will see that all four sentences use exactly the same words.'],
    ['Only the **capital letters** change', 'The only thing that changes is which words start with a capital letter.'],
    ['Find the **one** sentence that gets every capital right', 'Our job is to find the one sentence where every capital letter is in the right place, with none missing and none extra.'],
  ],
  know: {
    title: 'When a word needs a capital letter',
    md: 'Use a capital letter to **start a sentence**, for the word **I**, and for **proper nouns**: the names of particular people, places, days and months.',
    say: [
      'Here is the rule we need. A capital letter goes at the start of every sentence, and on the word I when it means me.',
      'It also goes on proper nouns. A proper noun is the name of one particular person, place, day or month, like Amira, London, Monday or June.',
    ],
    example: {
      md: 'a **city** → common noun · **Newcastle** → proper noun',
      say: 'A common noun is a general word for any one of a kind, like city or cousin. It only gets a capital when it starts a sentence. Newcastle is the name of one particular city, so it always gets a capital.',
    },
  },
  plan: [
    ['List the words that **might** need a capital', 'Here is the plan. First, list every word that might need a capital letter.'],
    ['Decide: **proper** or **common** noun?', 'Second, decide for each one whether it is a proper noun or a common noun.'],
    ['Check each sentence against the list', 'Third, check each of the four sentences against our list.'],
  ],
  steps: [
    scene('Step 1: The words to check', [bullets('w', ['**In**: the first word of the sentence', '**I**: the word I', '**July**: a month', '**grandparents**: family members', '**Newcastle**: a city'])], [
      { say: 'Step one. Which words could need a capital? Pause and try to spot them.', wait: 3 },
      { say: 'In starts the sentence, so it needs a capital. All four sentences get that right.', show: 'w.0' },
      { say: 'The word I always needs a capital, and all four get that right too.', show: 'w.1' },
      { say: 'That leaves three words that change between the sentences: July, grandparents and Newcastle.', show: ['w.2', 'w.3', 'w.4'] },
    ]),
    scene('Step 2: Proper or common?', [bullets('pc', ['**July** is the name of one month: proper noun, so **J**', '**grandparents** is a word for any grandparents: common noun, so **g**', '**Newcastle** is the name of one city: proper noun, so **N**'])], [
      { say: 'Step two. July is the name of a particular month. Months are proper nouns, so July needs a capital J.', show: 'pc.0' },
      { say: 'Grandparents is a general word. Everyone can have grandparents, and it is not anyone’s name. So it is a common noun, and it takes a small g.', show: 'pc.1' },
      { say: 'Newcastle is the name of one particular city, so it is a proper noun and needs a capital N.', show: 'pc.2' },
    ]),
    scene('Step 3: Check each sentence', [
      {
        kind: 'table',
        id: 't',
        head: ['Sentence', 'July', 'grandparents', 'Newcastle'],
        rows: [
          ['A', 'J ✓', 'g ✓', '[[bad:n ✗]]'],
          ['B', 'J ✓', '[[bad:G ✗]]', 'N ✓'],
          ['C', 'J ✓', 'g ✓', 'N ✓'],
          ['D', '[[bad:j ✗]]', 'g ✓', 'N ✓'],
        ],
      },
    ], [
      { say: 'Step three. Now we check each sentence against our three words.', show: 't.0' },
      { say: 'Sentence A writes newcastle with a small n. That is wrong.', focus: 't.0' },
      { say: 'Sentence B gives grandparents a capital G, but it is a common noun. Wrong again.', show: 't.1', focus: 't.1' },
      { say: 'Sentence C has a capital J for July, a small g for grandparents and a capital N for Newcastle. All three are right.', show: 't.2', focus: 't.2' },
      { say: 'Sentence D writes july with a small j. Wrong.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 4: The answer', [text('ans', '**C.** In July, I will visit my grandparents in Newcastle.', 'lg')], [
      { say: 'Step four. Only sentence C gets every capital letter right. So the answer is C: In July, I will visit my grandparents in Newcastle.', show: 'ans' },
    ]),
  ],
  check: [
    ['Capitals on **In**, **I**, **July** and **Newcastle**', 'Let us check. Sentence C has capitals on In, I, July and Newcastle, which are the start of the sentence, the word I, a month and a city.'],
    ['No capital on **grandparents**', 'And it leaves grandparents with a small letter, because it is a common noun. Every word is right, so our answer holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Forgot that a **city name** is a proper noun', 'In sentence A, the trap is forgetting that the name of a town or city always takes a capital.'],
      ['B', 'Gave a **family word** a capital', 'In sentence B, grandparents feels important, but family words only take a capital when they are used as a name, as in “Hello, Grandma!”.'],
      ['D', 'Forgot that **months** are proper nouns', 'In sentence D, the trap is forgetting that the months of the year always take a capital.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses capital letters correctly?',
    choices: ['On monday, my uncle drove us to Cardiff.', 'On Monday, my Uncle drove us to Cardiff.', 'On Monday, my uncle drove us to cardiff.', 'On Monday, my uncle drove us to Cardiff.'],
    answer: 3,
    working: '**Monday** and **Cardiff** are proper nouns; **uncle** is a common noun here.',
    ask: 'Which of these sentences uses capital letters correctly?',
    reveal: 'The answer is D. Monday is a day and Cardiff is a city, so both are proper nouns. Uncle is a common noun here, so it takes a small u.',
  },
  sum: [
    ['Capitals start a sentence and go on the word **I**', 'Here is what to remember. A capital letter starts every sentence, and the word I always takes one.'],
    ['**Proper nouns** (names of people, places, days, months) take capitals', 'Proper nouns, the names of particular people, places, days and months, always take capitals.'],
    ['**Common nouns** like *grandparents* or *city* do not', 'Common nouns, like grandparents or city, do not, unless they start the sentence.'],
    ['Compare the choices word by word', 'And when the choices look the same, compare them word by word. For more on capital letters and end marks, watch this lesson’s explainer video on Gradileo.'],
  ],
});
