import { englishExam, ks2, ks2Intro, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 6.4 (revising and editing). The Standards and Testing Agency's own
// question, word for word: 2026 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 6. The answer is "I am not as good at them tricks as Jay is.": Standard English says
// "those tricks", not "them tricks".

export default englishExam({
  lesson: 'e5-6-4',
  ...ks2(2026, 6),
  title: 'Which Sentence Is Not Written in Standard English?',
  thumbnailTitle: 'Editing for Standard English',
  subtitle: 'Spotting the error, step by step',
  summary:
    'A real test question, solved one small step at a time: four sentences about a trip to the skate park, and one is not in Standard English. We read each one like an editor, find the word that would be fine in chat but not in writing, and fix it.',
  intro: ks2Intro('editing for Standard English'),
  question: {
    prompt: 'Which sentence is **not** written in Standard English?',
    text: 'Which sentence is not written in Standard English? Tick one.',
    choices: ['We were all at the skate park yesterday evening.', 'Jay did a brilliant trick on his skateboard.', 'I am not as good at them tricks as Jay is.', 'Jay said he would show me how to improve.'],
    answer: 2,
    working: '*them tricks* is non-Standard: Standard English says **those tricks**.',
    say: ['Which sentence is not written in Standard English? Tick one.', 'We were all at the skate park yesterday evening. Jay did a brilliant trick on his skateboard. I am not as good at them tricks as Jay is. Jay said he would show me how to improve.'],
  },
  ask: [
    ['Three sentences are **Standard English**', 'Three of the sentences are written in Standard English.'],
    ['Find the **one** that is not', 'We need to find the one that is not, like an editor checking a piece of writing.'],
  ],
  know: {
    title: 'Standard English',
    md: '**Standard English** is the form of English used in most writing, schoolwork and formal speech. Common **non-Standard** forms: *them books* (those books), *we was* (we were), *I done it* (I did it), *ain’t* (isn’t).',
    say: [
      'Here is the idea we need. Standard English is the form of English used in most writing, in schoolwork and in formal speech.',
      'Many people use other forms when they chat, and that is fine there. But when we edit writing, we change them. Common ones are them books for those books, we was for we were, I done it for I did it, and ain’t for isn’t.',
    ],
  },
  plan: [
    ['Read each sentence like an **editor**', 'Here is the plan. Read each sentence like an editor.'],
    ['Check the **verbs** and **pronouns**', 'Check the verbs and the pronouns, where non-Standard forms usually hide.'],
    ['**Fix** the one that is wrong', 'Then fix the one that is wrong, to be sure.'],
  ],
  steps: [
    scene('Step 1: Check each sentence', [
      table('t', ['Sentence', 'Check', 'Standard?'], [['We **were** all at the skate park', '*we were* ✓', '✓'], ['Jay **did** a brilliant trick', '*did* (not *done*) ✓', '✓'], ['as good at **them** tricks', '*them* before a noun ✗', '[[bad:✗]]'], ['Jay said he **would** show me', '*would* ✓', '✓']]),
    ], [
      { say: 'Step one. Pause and read each sentence like an editor.', wait: 3 },
      { say: 'We were all at the skate park. We were is Standard. We was would not be.', show: 't.0' },
      { say: 'Jay did a brilliant trick. Did is Standard. Jay done a trick would not be.', show: 't.1' },
      { say: 'I am not as good at them tricks. Here is the problem. Them is a pronoun that stands on its own, as in I like them. It should not go in front of a noun like tricks.', show: 't.2', focus: 't.2' },
      { say: 'Jay said he would show me how to improve. That is Standard.', show: 't.3' },
    ]),
    scene('Step 2: Fix it', [text('w', 'I am not as good at ~~them~~ **those** tricks as Jay is.', 'lg'), text('n', 'The answer is the **third** sentence.')], [
      { say: 'Step two. To fix it, we change them to those: I am not as good at those tricks as Jay is.', show: 'w' },
      { say: 'So the sentence that is not in Standard English is the third one.', show: 'n' },
    ]),
  ],
  check: [
    ['Swap test: *those tricks* ✓ · *them tricks* ✗', 'Let us check. Those tricks is Standard, and them tricks is not.'],
    ['The other three need **no** changes', 'And the other three sentences need no changes at all. So our answer holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**were** is right: *we were*, never *we was*', 'Sentence A tempts people who are not sure about we were. We were is correct.'],
      ['B', '**brilliant** is chatty, but still **Standard**', 'Sentence B sounds chatty because of brilliant, but chatty words can still be Standard English.'],
      ['D', '**said … would** is correct reported speech', 'Sentence D is correct reported speech.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is **not** written in Standard English?',
    choices: ['They were late for the bus.', 'She did her homework early.', 'We have finished the puzzle.', 'He done his chores before tea.'],
    answer: 3,
    working: 'Standard English says **he did his chores** (or **he had done**).',
    ask: 'Which of these sentences is not written in Standard English?',
    reveal: 'The answer is D. He done his chores is non-Standard. In Standard English, it is he did his chores, or he had done his chores.',
  },
  sum: [
    ['**Standard English** is the English of writing and schoolwork', 'Here is what to remember. Standard English is the English of writing and schoolwork.'],
    ['Watch **verbs** and **pronouns**: *we was*, *I done*, *them books*', 'Non-Standard forms usually hide in verbs and pronouns: we was, I done, them books.'],
    ['Edit by **fixing** the word, then rereading', 'Edit by fixing the word, then rereading the sentence. For more on revising and editing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
