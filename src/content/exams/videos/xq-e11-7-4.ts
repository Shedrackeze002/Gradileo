import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 7.4 (usage and pronoun reference). An exam-style usage question we wrote, in
// the style of a Grade 11 language test. The answer is B: "whom", because the pronoun is the object of
// the preposition "to".

export default englishExam({
  lesson: 'e11-7-4',
  ...ours('a Grade 11 language test'),
  title: 'Who or Whom: “To ___ Did You Give the Letter?”',
  thumbnailTitle: 'Who or Whom?',
  subtitle: 'Standard usage, step by step',
  summary:
    'An exam-style usage question, solved one small step at a time: “To ___ did you give the letter?” We turn the question into a statement, try the he-or-him test, and see why the word after a preposition must be “whom”.',
  intro: [
    'In this video, we solve an exam-style usage question about who and whom. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 language test.',
  ],
  question: {
    prompt: 'Which word correctly completes the sentence?<br>*To ___ did you give the letter?*',
    text: 'Which word correctly completes the sentence? To, blank, did you give the letter?',
    choices: ['who', 'whom', 'whose', 'who’s'],
    answer: 1,
    working: 'Answer with *him*: *You gave the letter to **him***. *him* ↔ **whom**.',
    say: [
      'Which word correctly completes the sentence? To, blank, did you give the letter?',
      'A: who. B: whom. C: whose. D: who’s, with an apostrophe.',
    ],
  },
  ask: [
    ['The gap follows **to**', 'The gap comes straight after the word to.'],
    ['**Who** or **whom**?', 'We need to choose the right form.'],
  ],
  know: {
    title: 'Usage that exams test',
    md: '**Who** is a subject, like *he*; **whom** is an object, like *him*. Test it by answering with *he* or *him*. **Fewer** goes with things you **count** (*fewer students*); **less** with amounts (*less water*). **Lie** = recline (no object); **lay** = put something down. A pronoun must point **clearly** to one noun: in *Sam told Max he was late*, **he** is ambiguous.',
    say: [
      'Here is the idea we need. Who is a subject, like he. Whom is an object, like him. You can test it by answering the question with he or him.',
      'Fewer goes with things you can count, like fewer students, and less goes with amounts, like less water. Lie means to recline, and lay means to put something down. And a pronoun must point clearly to one noun: in, Sam told Max he was late, we cannot tell who he is.',
    ],
  },
  plan: [
    ['Turn it into a **statement**', 'Here is the plan. First, turn the question into a statement.'],
    ['Try **he** or **him**', 'Second, try he or him.'],
    ['Match **who** or **whom**', 'Third, match it to who or whom.'],
  ],
  steps: [
    scene('Step 1: The he-or-him test', [table('t', ['Try', 'Sounds right?'], [['*You gave the letter to **he**.*', '[[bad:✗]]'], ['*You gave the letter to **him**.*', '[[good:✓]]']]), text('n', 'After a **preposition** (*to*), we need the **object** form')], [
      { say: 'Step one. Turn the question into a statement and try he: you gave the letter to he. That sounds wrong.', show: 't.0' },
      { say: 'Now try him: you gave the letter to him. That sounds right. After a preposition like to, we need the object form.', show: ['t.1', 'n'] },
    ]),
    scene('Step 2: Match', [table('m', ['Subject', 'Object'], [['*he* ↔ **who**', '*him* ↔ **whom**']]), quote('p', ['To [[good:whom]] did you give the letter?']), text('a', '*him* → **whom** → **B**', 'lg')], [
      { say: 'Step two. He matches who, and him matches whom. Both object forms end in m.', show: 'm.0' },
      { say: 'Him was right, so the answer is whom. To whom did you give the letter? The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['*whom* is the **object** of *to*', 'Let us check. Whom is the object of the preposition to.'],
    ['and *you* is the subject of *did give*', 'And the subject of the verb is you, so the gap needs no subject form. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '*who* is a **subject** form; the gap is an **object**', 'Choice A is the trap. Who is common in speech, but the gap is the object of to, so formal writing needs whom.'],
      ['C', '*whose* shows **ownership**', 'Choice C: whose shows ownership, as in whose bag.'],
      ['D', '*who’s* = **who is**', 'Choice D: who’s means who is.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word completes the sentence? *There are ___ students in the class this year.*',
    choices: ['less', 'lesser', 'least', 'fewer'],
    answer: 3,
    working: 'Students can be **counted**: **fewer**.',
    ask: 'Which word completes the sentence? There are, blank, students in the class this year. A: less. B: lesser. C: least. D: fewer.',
    reveal: 'The answer is D, fewer. You can count students, so we use fewer. Less is for amounts, like less time.',
  },
  sum: [
    ['**who** = he (subject) · **whom** = him (object)', 'Here is what to remember. Who matches he, a subject, and whom matches him, an object.'],
    ['**Fewer** for things you count · **less** for amounts', 'Use fewer for things you can count, and less for amounts.'],
    ['Make every pronoun point to **one** noun', 'And make every pronoun point clearly to one noun. For more on usage and pronoun reference, watch this lesson’s explainer video on Gradileo.'],
  ],
});
