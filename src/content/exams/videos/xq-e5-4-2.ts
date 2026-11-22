import { englishExam, ks2, ks2Intro, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 4.2 (synonyms, antonyms and shades of meaning). The Standards and Testing
// Agency's own question, word for word: 2024 key stage 2 English grammar, punctuation and spelling
// test, Paper 1, question 10. The answer is "miserable", the only word opposite in meaning to happy.

export default englishExam({
  lesson: 'e5-4-2',
  ...ks2(2024, 10),
  title: 'Which Word Is an Antonym of Happy?',
  thumbnailTitle: 'Antonym of Happy',
  subtitle: 'Synonyms and antonyms, step by step',
  summary:
    'A real test question, solved one small step at a time: which of contented, bored, cheerful and miserable is an antonym of happy? We sort each word into synonym, antonym or neither, and see why bored is a near miss.',
  intro: ks2Intro('antonyms'),
  question: {
    prompt: 'Tick the word that is an **antonym** of **happy**.',
    text: 'Tick the word that is an antonym of happy. Tick one.',
    choices: ['contented', 'bored', 'cheerful', 'miserable'],
    answer: 3,
    working: '**Miserable** means very unhappy: the opposite of happy.',
    say: ['Tick the word that is an antonym of happy. Tick one. Contented. Bored. Cheerful. Miserable.'],
  },
  ask: [
    ['An **antonym** is a word with the **opposite** meaning', 'An antonym is a word with the opposite meaning.'],
    ['Which word means the **opposite** of *happy*?', 'So we need the word that means the opposite of happy.'],
  ],
  know: {
    title: 'Synonyms and antonyms',
    md: 'A **synonym** has the **same** or nearly the same meaning: *big*, *large*. An **antonym** has the **opposite** meaning: *big*, *small*.',
    say: [
      'Here is the idea we need. A synonym is a word with the same, or nearly the same, meaning, like big and large.',
      'An antonym is a word with the opposite meaning, like big and small. A trick to remember: antonym and anti both start with a n t, and both are about opposites.',
    ],
  },
  plan: [
    ['Say what each word **means**', 'Here is the plan. First, say what each word means.'],
    ['Sort each one: **synonym**, **antonym** or **neither**', 'Second, sort each word: is it a synonym of happy, an antonym, or neither?'],
  ],
  steps: [
    scene('Step 1: Sort the words', [
      table('t', ['Word', 'Meaning', 'Compared with *happy*'], [['contented', 'pleased and satisfied', 'synonym'], ['bored', 'tired of having nothing interesting to do', 'neither'], ['cheerful', 'happy and bright', 'synonym'], ['miserable', 'very unhappy', '[[good:antonym]]']]),
    ], [
      { say: 'Step one. Let us go through the words one at a time. Pause and try to sort them yourself first.', wait: 3 },
      { say: 'Contented means pleased and satisfied. That is close to happy, so it is a synonym.', show: 't.0' },
      { say: 'Bored means tired of having nothing interesting to do. That is not a nice feeling, but it is not the opposite of happy either. Someone can be bored and still be fairly happy. So it is neither.', show: 't.1' },
      { say: 'Cheerful means happy and bright. Another synonym.', show: 't.2' },
      { say: 'Miserable means very unhappy. That is the opposite of happy: an antonym.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The answer', [text('ans', '**happy ⟷ miserable**', 'xl'), text('n', 'The answer is **miserable**.')], [
      { say: 'Step two. Happy and miserable are at opposite ends of the same scale of feelings. So the answer is miserable.', show: ['ans', 'n'] },
    ]),
  ],
  check: [
    ['Test: “I am **not** happy, I am miserable” ✓', 'Let us check with a test sentence. I am not happy, I am miserable. That works, because they are opposites.'],
    ['“I am **not** happy, I am cheerful” ✗', 'Try it with cheerful: I am not happy, I am cheerful. That sounds wrong, because they mean the same thing.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['contented', 'A **synonym**, not an antonym', 'Contented and cheerful are synonyms. The question asks for an antonym, so read that word carefully.'],
      ['cheerful', 'Mixed up **synonym** and **antonym**', 'If you picked cheerful, you probably mixed up synonym and antonym.'],
      ['bored', 'A **different** feeling, not the **opposite** one', 'Bored is the near miss. It is a different feeling from happy, but not the opposite one.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word is a **synonym** of **tired**?',
    choices: ['lively', 'exhausted', 'awake', 'eager'],
    answer: 1,
    working: '**Exhausted** means very tired; the others are closer to antonyms.',
    ask: 'Which word is a synonym of tired?',
    reveal: 'The answer is B, exhausted. It means very tired. Lively and awake are nearer to antonyms, and eager means keen.',
  },
  sum: [
    ['**Synonym** = same meaning · **antonym** = opposite meaning', 'Here is what to remember. A synonym has the same meaning, and an antonym has the opposite meaning.'],
    ['Sort every choice before you answer', 'Sort every choice before you answer.'],
    ['Test sentence: “not happy, but …”', 'And test with a sentence: not happy, but miserable. For more on synonyms and antonyms, watch this lesson’s explainer video on Gradileo.'],
  ],
});
