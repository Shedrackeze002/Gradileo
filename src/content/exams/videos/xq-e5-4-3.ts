import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 4.3 (context clues). The Standards and Testing Agency's own question,
// word for word: 2026 key stage 2 English grammar, punctuation and spelling test, Paper 1, question
// 8. The answer is "obvious": "It was apparent that Yasir had worked hard" means it was clear to see.

export default englishExam({
  lesson: 'e5-4-3',
  ...ks2(2026, 8),
  title: 'Which Word Is a Synonym of Apparent?',
  thumbnailTitle: 'Meaning From Context',
  subtitle: 'Context clues, step by step',
  summary:
    'A real test question, solved one small step at a time: in “It was apparent that Yasir had worked hard on his model”, which word means the same as apparent? We use the sentence around the word, swap each choice in, and keep the one that keeps the meaning.',
  intro: ks2Intro('the meaning of a word'),
  question: {
    prompt: 'Which word is a synonym of **apparent** in the sentence below?<br>*It was apparent that Yasir had worked hard on his model.*',
    text: 'Which word is a synonym of apparent in the sentence below? It was apparent that Yasir had worked hard on his model. Tick one.',
    choices: ['curious', 'surprising', 'exciting', 'obvious'],
    answer: 3,
    working: 'You could **see** that Yasir had worked hard: it was **obvious**.',
    say: ['Which word is a synonym of apparent in the sentence below? It was apparent that Yasir had worked hard on his model. Tick one. Curious. Surprising. Exciting. Obvious.'],
  },
  ask: [
    ['A **synonym**: a word with the **same** meaning', 'We need a synonym, a word with the same meaning as apparent.'],
    ['Use **this sentence** to work it out', 'And the question says in the sentence below, so the sentence itself can help us.'],
  ],
  know: {
    title: 'Context clues',
    md: 'The **context** is the words around a word. When you meet a hard word, use the context: what **must** it mean for the sentence to make sense? Then **swap** your guess in and check.',
    say: [
      'Here is the idea we need. The context of a word is the words around it.',
      'When you meet a hard word, ask: what must this word mean for the sentence to make sense? Then swap your answer into the sentence and check that the meaning stays the same.',
    ],
  },
  plan: [
    ['Read the **sentence** for clues', 'Here is the plan. First, read the sentence for clues.'],
    ['**Swap** each choice in for *apparent*', 'Second, swap each choice in place of apparent.'],
    ['Keep the one that keeps the **meaning**', 'Third, keep the one that keeps the meaning.'],
  ],
  steps: [
    scene('Step 1: Clues in the sentence', [quote('p', ['It was [[theta:apparent]] that Yasir had worked hard on his model.']), text('n', 'Looking at the model, you could **see** the hard work.')], [
      { say: 'Step one. Think about the sentence. How would anyone know that Yasir had worked hard? By looking at his model.', show: 'p' },
      { say: 'So apparent must mean something like: easy to see, or clear. The word appear is even hiding inside apparent.', show: 'n' },
    ]),
    scene('Step 2: Swap each choice in', [
      table('t', ['It was ___ that Yasir had worked hard', 'Same meaning?'], [['curious', '[[bad:✗ strange]]'], ['surprising', '[[bad:✗ unexpected]]'], ['exciting', '[[bad:✗ thrilling]]'], ['obvious', '[[good:✓ clear to see]]']]),
    ], [
      { say: 'Step two. Let us swap each word in.', show: 't.0' },
      { say: 'It was curious that Yasir had worked hard. That means it was strange. Not the same.', focus: 't.0' },
      { say: 'It was surprising that he worked hard. That means nobody expected it. Not the same either.', show: 't.1', focus: 't.1' },
      { say: 'It was exciting that he worked hard. That changes the meaning too.', show: 't.2', focus: 't.2' },
      { say: 'It was obvious that he worked hard. Yes: it was clear to see. The meaning stays the same. The answer is obvious.', show: 't.3', focus: 't.3' },
    ]),
  ],
  check: [
    ['*apparent* and *obvious*: both mean **clear to see**', 'Let us check. Apparent and obvious both mean clear to see, or easy to notice.'],
    ['Only *obvious* keeps the sentence’s **meaning**', 'And only obvious keeps the sentence meaning the same. So our answer holds.'],
  ],
  traps: {
    say: 'Each wrong answer would make a sensible sentence, which is the trap. The question asks for the same meaning, not just any word that fits.',
    rows: [
      ['surprising', 'Fits the sentence, but **changes** the meaning', 'Surprising is the strongest trap. It fits, but it changes the meaning: it says nobody expected Yasir to work hard.'],
      ['curious', 'Means **strange**, not clear', 'Curious can mean strange, which is a different idea.'],
      ['exciting', 'Adds a **feeling** that is not there', 'Exciting adds a feeling that the original sentence does not have.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word is a synonym of **fragile** in the sentence below?<br>*Carry the box gently, because the glasses inside are fragile.*',
    choices: ['heavy', 'expensive', 'easily broken', 'brand new'],
    answer: 2,
    working: '*Carry gently… glasses* → things that could **break**.',
    ask: 'Which word is a synonym of fragile in this sentence? Carry the box gently, because the glasses inside are fragile.',
    reveal: 'The answer is C, easily broken. The clues are carry it gently, and glasses, which can break.',
  },
  sum: [
    ['Use the **context**: the words around a hard word', 'Here is what to remember. Use the context, the words around a hard word, to work out its meaning.'],
    ['**Swap** each choice in and reread the sentence', 'Swap each choice into the sentence and reread it.'],
    ['Keep the one that keeps the **same meaning**, not just one that fits', 'Keep the one that keeps the same meaning, not just one that fits. For more on context clues, watch this lesson’s explainer video on Gradileo.'],
  ],
});
