import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 7.3 (agreement). An exam-style grammar question we wrote, in the style of a
// Grade 10 language test. The answer is B: after the preposition "to", the pronoun must be in the object
// case, "me".

export default englishExam({
  lesson: 'e10-7-3',
  ...ours('a Grade 10 language test'),
  title: 'Sam and I, or Sam and Me?',
  thumbnailTitle: 'Pronoun Case',
  subtitle: 'Choosing I or me, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “The coach gave the trophy to Sam and ___.” We learn subject and object pronouns, use the cover-up test, and choose the right word.',
  intro: [
    'In this video, we solve an exam-style grammar question about pronoun case. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 language test.',
  ],
  question: {
    prompt: 'Which pronoun correctly completes the sentence?<br>*The coach gave the trophy to Sam and ___.*',
    text: 'Which pronoun correctly completes the sentence? The coach gave the trophy to Sam and, blank.',
    choices: ['I', 'me', 'myself', 'mine'],
    answer: 1,
    working: 'Cover *Sam and*: *gave the trophy to **me*** ✓, not *to I*.',
    say: [
      'Which pronoun correctly completes the sentence? The coach gave the trophy to Sam and, blank.',
      'A: I. B: me. C: myself. D: mine.',
    ],
  },
  ask: [
    ['**I** or **me**?', 'The choice is between I, me, myself and mine.'],
    ['Which is **correct** here?', 'We need the one that is correct here.'],
  ],
  know: {
    title: 'Pronoun case and agreement',
    md: '**Subject** pronouns do the action: **I**, he, she, we, they (*I won.*). **Object** pronouns receive it, or follow a **preposition** (*to*, *for*, *with*, *between*): **me**, him, her, us, them. **Myself** is only for when **I** am also the subject (*I hurt myself*). Test: **cover the other person** and read the sentence alone. Also keep **verb tense** consistent within a sentence.',
    say: [
      'Here is the idea we need. Subject pronouns do the action: I, he, she, we and they. Object pronouns receive the action, or follow a preposition like to, for, with or between: me, him, her, us and them.',
      'Myself is only used when I am also the subject, as in, I hurt myself. A quick test is to cover the other person and read the sentence alone. And remember to keep verb tense consistent within a sentence.',
    ],
  },
  plan: [
    ['**Cover** the other person', 'Here is the plan. First, cover the other person.'],
    ['Test **each** pronoun', 'Second, test each pronoun.'],
  ],
  steps: [
    scene('Step 1: Cover the other person', [quote('p', ['The coach gave the trophy [[theta:to]] ~~Sam and~~ ___.']), table('t', ['Try', 'Sounds right?'], [['*to **I***', '[[bad:✗]]'], ['*to **me***', '[[good:✓]]'], ['*to **myself***', '[[bad:✗ the coach is the subject]]'], ['*to **mine***', '[[bad:✗ shows ownership]]']])], [
      { say: 'Step one. Cover Sam and. Now the sentence is: the coach gave the trophy to, blank.', show: 'p' },
      { say: 'To I sounds wrong. To me sounds right. Myself does not work, because the coach, not I, is the subject. And mine shows ownership.', show: ['t.0', 't.1', 't.2', 't.3'], focus: 't.1' },
    ]),
    scene('Step 2: Why', [text('n', '*to* is a **preposition** → it takes an **object** pronoun: **me**'), text('a', '*…to Sam and **me**.* → **B**', 'lg')], [
      { say: 'Step two. To is a preposition, and a pronoun after a preposition must be an object pronoun. That is me.', show: 'n' },
      { say: 'The coach gave the trophy to Sam and me. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Would you say *gave it **to I***? No', 'Let us check. Would you ever say, gave it to I? No.'],
    ['Adding *Sam and* does not **change** the case', 'Adding Sam and does not change that. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '*Sam and I* sounds **polite**, but here it is wrong', 'Choice A is the trap. Sam and I sounds polite and formal, but after to, the pronoun must be me.'],
      ['C', '**Myself** needs *I* as the subject', 'Choice C: myself needs I as the subject.'],
      ['D', '**Mine** shows ownership', 'Choice D: mine shows ownership.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence keeps the **verb tense** consistent?',
    choices: ['She walks in and sat down.', 'He ran to the door and opens it.', 'They arrived early and found seats.', 'We eat dinner and watched TV.'],
    answer: 2,
    working: '*arrived*, *found*: **both past**.',
    ask: 'Which sentence keeps the verb tense consistent? A: She walks in and sat down. B: He ran to the door and opens it. C: They arrived early and found seats. D: We eat dinner and watched TV.',
    reveal: 'The answer is C. Arrived and found are both in the past tense.',
  },
  sum: [
    ['**I** for subjects, **me** for objects', 'Here is what to remember. Use I for subjects, and me for objects.'],
    ['After a **preposition**, use the object form', 'After a preposition, use the object form.'],
    ['Test: **cover** the other person', 'And test by covering the other person. For more on agreement, watch this lesson’s explainer video on Gradileo.'],
  ],
});
