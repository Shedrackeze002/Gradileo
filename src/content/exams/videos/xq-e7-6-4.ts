import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 6.4 (agreement). An exam-style question we wrote, in the style of a Grade 7
// grammar test. The answer is A, "is": the subject is "box", which is singular; "of coloured pencils"
// is a phrase in between that does not change the verb.

export default englishExam({
  lesson: 'e7-6-4',
  ...ours('a Grade 7 grammar test'),
  title: 'Which Verb Agrees With the Subject?',
  thumbnailTitle: 'Subject–Verb Agreement',
  subtitle: 'Agreement with a phrase in between, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “The box of coloured pencils ___ on the teacher’s desk.” We find the real subject, set aside the phrase in between, and choose the verb that agrees with it.',
  intro: [
    'In this video, we solve an exam-style grammar question about subject and verb agreement. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 grammar test.',
  ],
  question: {
    prompt: 'Which verb correctly completes the sentence?<br>*The box of coloured pencils ______ on the teacher’s desk.*',
    text: 'Which verb correctly completes the sentence? “The box of coloured pencils ______ on the teacher’s desk.”',
    choices: ['is', 'are', 'were', 'have been'],
    answer: 0,
    working: 'The subject is **box** (one), so the verb is singular: **is**. *of coloured pencils* is just a phrase in between.',
    say: ['Which verb correctly completes the sentence? The box of coloured pencils, blank, on the teacher’s desk. A: is. B: are. C: were. D: have been.'],
  },
  ask: [
    ['The verb must **agree** with its **subject**', 'The verb must agree with its subject.'],
    ['But what **is** the subject?', 'So first we need to find the real subject.'],
  ],
  know: {
    title: 'Subject–verb agreement',
    md: 'A **singular** subject takes a **singular** verb (*the dog **is***); a **plural** subject takes a **plural** verb (*the dogs **are***). A **phrase** between the subject and verb (*of pencils*, *with his friends*) does **not** change the subject.',
    say: [
      'Here is the idea we need. A singular subject takes a singular verb, as in the dog is. A plural subject takes a plural verb, as in the dogs are.',
      'Watch out for a phrase between the subject and the verb, like of pencils or with his friends. It does not change the subject.',
    ],
  },
  plan: [
    ['**Cross out** the phrase in between', 'Here is the plan. First, cross out the phrase in between.'],
    ['Find the **real subject**', 'Second, find the real subject.'],
    ['Choose the verb that **agrees**', 'Third, choose the verb that agrees.'],
  ],
  steps: [
    scene('Step 1: Cross out the phrase', [quote('p', ['The [[good:box]] ~~of coloured pencils~~ ______ on the teacher’s desk.'])], [
      { say: 'Step one. Of coloured pencils is a phrase that tells us what kind of box. Let us cross it out.', show: 'p' },
      { say: 'Now we can see the real subject: the box. One box.' },
    ]),
    scene('Step 2: Choose the verb', [table('t', ['Verb', 'Singular or plural?', 'Tense', 'Fits?'], [['is', 'singular', 'present', '[[good:✓]]'], ['are', 'plural', 'present', '[[bad:✗ agrees with pencils]]'], ['were', 'plural', 'past', '[[bad:✗]]'], ['have been', 'plural', 'perfect', '[[bad:✗]]']]), text('a', 'The box **is** on the teacher’s desk. **A**', 'lg')], [
      { say: 'Step two. Box is singular, so we need a singular verb. Is is singular.', show: 't.0', focus: 't.0' },
      { say: 'Are, were and have been are all plural forms. They would agree with pencils, not box.', show: ['t.1', 't.2', 't.3'] },
      { say: 'The box is on the teacher’s desk. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['Read it without the phrase: *The box **is** on the desk.*', 'Let us check. Read it without the phrase: the box is on the desk. That sounds right.'],
    ['*The box **are** on the desk* sounds wrong', 'The box are on the desk sounds wrong. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Agrees with the **nearest** noun, *pencils*', 'Choice B is the trap. Pencils is right next to the gap, so are sounds natural, but pencils is not the subject.'],
      ['C', 'Plural, **and** the wrong tense', 'Choice C is plural, and in the past.'],
      ['D', 'Plural form', 'Choice D, have been, is a plural form too.'],
    ],
  },
  yourTurn: {
    prompt: 'Which pronoun correctly completes the sentence?<br>*Each of the girls brought ______ own lunch.*',
    choices: ['their', 'its', 'our', 'her'],
    answer: 3,
    working: '**Each** is singular and refers to one girl at a time, so **her**.',
    ask: 'Each of the girls brought, blank, own lunch. Which pronoun correctly completes the sentence? A: their. B: its. C: our. D: her.',
    reveal: 'The answer is D, her. Each is singular and means each girl, one at a time, so the pronoun is her. In everyday speech many people say their, but a formal test expects her.',
  },
  sum: [
    ['The verb agrees with the **subject**', 'Here is what to remember. The verb agrees with the subject.'],
    ['**Cross out** phrases between subject and verb', 'Cross out any phrase between the subject and the verb.'],
    ['Do not agree with the **nearest** noun', 'And do not be fooled by the nearest noun. For more on agreement, watch this lesson’s explainer video on Gradileo.'],
  ],
});
