import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 3.1 (reading nineteenth-century non-fiction). An exam-style question we
// wrote, in the style of a GCSE English Language exam, on Florence Nightingale's Notes on Nursing (1859),
// which is in the public domain. The answer is B: "canon" here means a rule or principle.

const LINES = ['The very first canon of nursing, the first and the last thing upon which a nurse’s attention must be fixed, the first essential to a patient, without which all the rest you can do for him is as nothing, with which I had almost said you may leave all the rest alone, is this: TO KEEP THE AIR HE BREATHES AS PURE AS THE EXTERNAL AIR, WITHOUT CHILLING HIM.'];

export default englishExam({
  lesson: 'ex-3-1',
  ...ours('a GCSE English Language exam', 'the source is Florence Nightingale’s Notes on Nursing (1859), in the public domain'),
  title: 'What Does “Canon” Mean in Notes on Nursing?',
  thumbnailTitle: '19th-Century Non-fiction',
  subtitle: 'Older words in context, step by step',
  summary:
    'An exam-style question on nineteenth-century non-fiction, solved one small step at a time, on Florence Nightingale’s Notes on Nursing. We untangle one very long sentence, find its main point, and work out the meaning of an older word from its context.',
  intro: [
    'In this video, we solve an exam-style question about nineteenth-century non-fiction. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Language exam, on Nightingale’s book, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Florence Nightingale, Notes on Nursing (1859)',
    say: ['First, the context. Florence Nightingale nursed soldiers in the Crimean War and changed how hospitals were run. She wrote: The very first canon of nursing, the first and the last thing upon which a nurse’s attention must be fixed, the first essential to a patient, without which all the rest you can do for him is as nothing, with which I had almost said you may leave all the rest alone, is this: to keep the air he breathes as pure as the external air, without chilling him.'],
  },
  question: {
    prompt: 'What does the word **“canon”** most likely mean in this sentence?',
    text: 'Read the passage from Notes on Nursing. What does the word canon most likely mean in this sentence?',
    choices: ['a large gun', 'a rule or principle', 'a church official', 'a song sung in rounds'],
    answer: 1,
    working: '*first canon* = *first and last thing… must be fixed* = *first essential*: a **rule**.',
    say: [
      'What does the word canon most likely mean in this sentence?',
      'A: a large gun. B: a rule or principle. C: a church official. D: a song sung in rounds.',
    ],
  },
  ask: [
    ['**Canon** is an older word', 'Canon is an older word, and it has several meanings.'],
    ['What does it mean **here**?', 'We need the meaning that fits this sentence.'],
  ],
  know: {
    title: 'Reading nineteenth-century non-fiction',
    md: 'Nineteenth-century writers often use **long sentences** with many clauses. Find the **main clause** first (here, *The very first canon… is this:*), then read the extra parts. Work out **older words** from **context**: look for phrases nearby that **repeat** or **explain** the idea. Notice the writer’s **attitude**, and what the text shows about **its time**.',
    say: [
      'Here is the idea we need. Nineteenth-century writers often use long sentences with many clauses. Find the main clause first, here, the very first canon is this, then read the extra parts.',
      'Work out older words from their context, by looking for nearby phrases that repeat or explain the idea. And notice the writer’s attitude, and what the text shows about its time.',
    ],
  },
  plan: [
    ['Find the **main clause**', 'Here is the plan. First, find the main clause.'],
    ['Read the **phrases** around *canon*', 'Second, read the phrases around canon.'],
    ['Choose the **meaning**', 'Third, choose the meaning.'],
  ],
  steps: [
    scene('Step 1: The main clause', [quote('p', ['The very first [[theta:canon]] of nursing… [[good:is this]]: TO KEEP THE AIR HE BREATHES AS PURE AS THE EXTERNAL AIR…']), text('n', 'Main point: the first **canon** of nursing = **keep the air pure**')], [
      { say: 'Step one. Strip away the middle. The very first canon of nursing is this: to keep the air he breathes as pure as the air outside.', show: 'p' },
      { say: 'So the first canon of nursing is to keep the air pure.', show: 'n' },
    ]),
    scene('Step 2: Context clues', [table('t', ['Nearby phrase', 'Suggests'], [['*the first and the last thing upon which… attention must be fixed*', 'the most **important** thing to follow'], ['*the first essential*', 'a **basic requirement**']]), text('a', '*canon* = a **rule** or **principle** → **B**', 'lg')], [
      { say: 'Step two. The phrases after canon explain it. The first and the last thing a nurse must focus on. The first essential.', show: ['t.0', 't.1'] },
      { say: 'So a canon of nursing is a rule or principle of nursing. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Put it in: *the very first **rule** of nursing*', 'Let us check. Put it in the sentence: the very first rule of nursing. It makes perfect sense.'],
    ['and **capitals** show how important it is', 'And the capital letters show how important this rule is to her. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A gun is a **cannon**, with two *n*s', 'Choice A is the trap. A large gun sounds like canon, but it is spelt cannon, with two n’s, and makes no sense here.'],
      ['C', 'A real meaning, but not about **nursing**', 'Choice C is a real meaning of canon, but it does not fit nursing.'],
      ['D', 'A real meaning, but not about **air**', 'Choice D is also a real meaning, but it does not fit here.'],
    ],
  },
  yourTurn: {
    prompt: 'Nightingale writes the rule in **CAPITAL LETTERS**. What does this show about her attitude?',
    choices: ['She thinks pure air is the most important thing of all.', 'She is unsure whether fresh air matters.', 'She is joking.', 'She was writing in a hurry.'],
    answer: 0,
    working: 'Capitals = **emphasis**: the **most important** rule.',
    ask: 'Nightingale writes the rule in capital letters. What does this show about her attitude? A: She thinks pure air is the most important thing of all. B: She is unsure whether fresh air matters. C: She is joking. D: She was writing in a hurry.',
    reveal: 'The answer is A. The capital letters make the rule stand out, because she believes pure air matters more than anything else.',
  },
  sum: [
    ['Find the **main clause** of a long sentence', 'Here is what to remember. Find the main clause of a long sentence first.'],
    ['Use **context** for older words', 'Use the context to work out older words.'],
    ['Notice the writer’s **attitude**', 'And notice the writer’s attitude. For more on reading nineteenth-century non-fiction, watch this lesson’s explainer video on Gradileo.'],
  ],
});
