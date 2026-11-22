import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 6.3 (agreement in hard cases). An exam-style grammar question we wrote, in the
// style of a Grade 9 language test. The answer is B: with "neither… nor", the verb agrees with the
// nearer subject, "the players", which is plural.

export default englishExam({
  lesson: 'e9-6-3',
  ...ours('a Grade 9 language test'),
  title: 'Neither the Coach Nor the Players “Is” or “Are”?',
  thumbnailTitle: 'Neither… Nor Agreement',
  subtitle: 'Subject-verb agreement in hard cases, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “Neither the coach nor the players ___ ready.” We learn the nearer-subject rule for either, or, neither and nor, find the subject closest to the verb, and choose the verb that agrees.',
  intro: [
    'In this video, we solve an exam-style grammar question about subject-verb agreement. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 language test.',
  ],
  question: {
    prompt: 'Which verb correctly completes the sentence?<br>Neither the coach nor the players ___ ready for the match.',
    text: 'Which verb correctly completes the sentence? Neither the coach nor the players, blank, ready for the match.',
    choices: ['is', 'are', 'was', 'has been'],
    answer: 1,
    working: 'With *neither… nor*, the verb agrees with the **nearer** subject: *the players* (plural) → **are**.',
    say: [
      'Which verb correctly completes the sentence? Neither the coach nor the players, blank, ready for the match.',
      'A: is. B: are. C: was. D: has been.',
    ],
  },
  ask: [
    ['Two subjects: **coach** and **players**', 'There are two subjects: the coach and the players.'],
    ['Which one does the verb **agree** with?', 'We need to know which one the verb agrees with.'],
  ],
  know: {
    title: 'Agreement in hard cases',
    md: 'Subjects joined by **and** take a **plural** verb (*Sam **and** Li **are**…*). With **or**, **either… or**, **neither… nor**, the verb agrees with the subject **nearer** to it. **Ignore** phrases between subject and verb (*The box **of chocolates** **is**…*). *Each*, *every*, *everyone* take a **singular** verb.',
    say: [
      'Here is the idea we need. Subjects joined by and take a plural verb: Sam and Li are here.',
      'But with or, either or, and neither nor, the verb agrees with the subject nearer to it. Also ignore phrases that come between the subject and the verb, and remember that each, every and everyone take a singular verb.',
    ],
  },
  plan: [
    ['Spot the **neither… nor**', 'Here is the plan. First, spot the neither, nor.'],
    ['Find the **nearer** subject', 'Second, find the subject nearer to the verb.'],
    ['Choose the verb that **agrees**', 'Third, choose the verb that agrees with it.'],
  ],
  steps: [
    scene('Step 1: The nearer subject', [quote('p', ['Neither the coach nor [[good:the players]] ___ ready for the match.']), table('t', ['Subject', 'Number', 'Distance from verb'], [['the coach', 'singular', 'far'], ['the players', 'plural', '[[good:next to the verb]]']])], [
      { say: 'Step one. The subjects are joined by neither, nor. So the verb agrees with the nearer subject.', show: 'p' },
      { say: 'The coach is singular, but it is further away. The players is plural, and it sits right next to the verb.', show: ['t.0', 't.1'], focus: 't.1' },
    ]),
    scene('Step 2: Choose the verb', [text('n', '*the players* → plural → **are** (present, to match *ready for the match*)'), text('a', 'Neither the coach nor the players **are** ready → **B**', 'lg')], [
      { say: 'Step two. The players is plural, so we need a plural verb: are.', show: 'n' },
      { say: 'Neither the coach nor the players are ready for the match. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Swap the order: *Neither the players nor the coach **is** ready*', 'Let us check. Swap the order: neither the players nor the coach is ready. Now the coach is nearer, so the verb is singular.'],
    ['The **nearer** subject decides', 'The nearer subject decides. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**is** agrees with *coach*, the **far** subject', 'Choice A is the trap. Is agrees with the coach, but the coach is the subject further from the verb.'],
      ['C', '**was** is singular, and past', 'Choice C: was is singular, and in the past tense.'],
      ['D', '**has been** is singular', 'Choice D: has been is singular too.'],
    ],
  },
  yourTurn: {
    prompt: 'Which verb is correct? *The box of chocolates ___ on the table.*',
    choices: ['are', 'were', 'is', 'be'],
    answer: 2,
    working: 'The subject is **box** (singular); *of chocolates* is in between → **is**.',
    ask: 'Which verb is correct? The box of chocolates, blank, on the table. A: are. B: were. C: is. D: be.',
    reveal: 'The answer is C, is. The subject is the box, which is singular. Of chocolates is just a phrase in between.',
  },
  sum: [
    ['**And** → plural verb', 'Here is what to remember. Subjects joined by and take a plural verb.'],
    ['**Or**, **nor** → agree with the **nearer** subject', 'With or and nor, the verb agrees with the nearer subject.'],
    ['Ignore phrases **between** subject and verb', 'And ignore phrases between the subject and the verb. For more on agreement in hard cases, watch this lesson’s explainer video on Gradileo.'],
  ],
});
