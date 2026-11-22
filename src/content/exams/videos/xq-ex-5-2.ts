import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 5.2 (The Strange Case of Dr Jekyll and Mr Hyde). An exam-style question we
// wrote, in the style of a GCSE English Literature exam, on Robert Louis Stevenson's novella (1886), which
// is in the public domain. The answer is C: "calmly" shows that Hyde feels no guilt or pity.

const LINES = ['…and then came the horrible part of the thing; for the man trampled calmly over the child’s body and left her screaming on the ground.'];

export default englishExam({
  lesson: 'ex-5-2',
  ...ours('a GCSE English Literature exam', 'the novella is Robert Louis Stevenson’s The Strange Case of Dr Jekyll and Mr Hyde (1886), in the public domain'),
  title: 'What Does “Calmly” Reveal About Mr Hyde?',
  thumbnailTitle: 'Jekyll and Hyde',
  subtitle: 'Hyde’s first appearance, step by step',
  summary:
    'An exam-style question on Jekyll and Hyde, solved one small step at a time. In the novella’s first chapter, a man collides with a young girl in the street. We look closely at one adverb, and explain what it reveals about Hyde.',
  intro: [
    'In this video, we solve an exam-style question about The Strange Case of Dr Jekyll and Mr Hyde. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Stevenson’s novella, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Robert Louis Stevenson, The Strange Case of Dr Jekyll and Mr Hyde (1886), Chapter 1',
    say: ['First, the context. Mr Enfield tells his friend Utterson about a night when a man and a young girl collided at a street corner. And then came the horrible part of the thing; for the man trampled calmly over the child’s body and left her screaming on the ground.'],
  },
  question: {
    prompt: 'What does the word **“calmly”** suggest about Hyde?',
    text: 'Read the passage from Jekyll and Hyde. What does the word calmly suggest about Hyde?',
    choices: [
      'He did not notice the child at all.',
      'He was too frightened to move quickly.',
      'He feels no guilt or pity: his cruelty is cold and untroubled.',
      'He was trying to help the child up.',
    ],
    answer: 2,
    working: '*trampled* (violent) + *calmly* (no emotion) = cruelty **without** guilt: **inhuman**.',
    say: [
      'What does the word calmly suggest about Hyde?',
      'A: He did not notice the child at all. B: He was too frightened to move quickly. C: He feels no guilt or pity: his cruelty is cold and untroubled. D: He was trying to help the child up.',
    ],
  },
  ask: [
    ['One **adverb**: *calmly*', 'We focus on one adverb: calmly.'],
    ['What does it **reveal**?', 'We need to say what it reveals about Hyde.'],
  ],
  know: {
    title: 'Dr Jekyll and Mr Hyde',
    md: 'The lawyer **Utterson** investigates the brutal **Mr Hyde**, who seems to have a hold over the respected **Dr Jekyll**. In the end, Jekyll’s own statement reveals that Hyde **is** Jekyll, transformed by a potion that releases his evil side. Themes: **duality** (good and evil in one person), **respectability** and **secrecy** in **Victorian** London, and **science** pushed too far.',
    say: [
      'Here is the idea we need. The lawyer Utterson investigates the brutal Mr Hyde, who seems to have a hold over the respected Dr Jekyll. In the end, Jekyll’s own statement reveals that Hyde is Jekyll, transformed by a potion that releases his evil side.',
      'The themes include duality, good and evil in one person; respectability and secrecy in Victorian London; and science pushed too far.',
    ],
  },
  plan: [
    ['Look at the **verb**', 'Here is the plan. First, look at the verb.'],
    ['Add the **adverb**', 'Second, add the adverb.'],
    ['Say what it **reveals**', 'Third, say what it reveals.'],
  ],
  steps: [
    scene('Step 1: Verb and adverb', [quote('p', ['…the man [[bad:trampled]] [[theta:calmly]] over the child’s body and left her [[bad:screaming]] on the ground.']), table('t', ['Word', 'Suggests'], [['*trampled*', 'heavy, **violent**, like an animal'], ['*calmly*', 'no **hurry**, no **emotion**'], ['*left her screaming*', 'no **pity**: he walks on']])], [
      { say: 'Step one. Trampled is violent, like an animal crushing something underfoot.', show: ['p', 't.0'] },
      { say: 'Calmly adds no hurry and no emotion. And he left her screaming. He walks on, with no pity.', show: ['t.1', 't.2'], focus: 't.1' },
    ]),
    scene('Step 2: What it reveals', [text('e', '**Violence** + **calm** = a shocking **contrast**'), text('a', 'No guilt, no pity: cold cruelty → **C**', 'lg')], [
      { say: 'Step two. Violence done calmly is a shocking contrast. A normal person would panic, or stop, or help.', show: 'e' },
      { say: 'Hyde feels no guilt or pity. His cruelty is cold and untroubled. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Enfield calls it *the **horrible** part*', 'Let us check. Enfield calls it the horrible part, so the calm is what horrifies him.'],
    ['a sign Hyde is **less than human**', 'It is an early sign that Hyde is less than human. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'He **left** her screaming: he knew', 'Choice A is the trap. Calmly might suggest he did not notice, but he left her screaming, so he knew.'],
      ['B', 'Calm is the **opposite** of frightened', 'Choice B: calm is the opposite of frightened.'],
      ['D', 'He **trampled** her, then left', 'Choice D: he trampled her, then left.'],
    ],
  },
  yourTurn: {
    prompt: 'Which character, a **lawyer**, investigates Hyde through most of the novella?',
    choices: ['Dr Jekyll', 'Mr Utterson', 'Poole', 'Dr Lanyon'],
    answer: 1,
    working: 'The lawyer is **Utterson**.',
    ask: 'Which character, a lawyer, investigates Hyde through most of the novella? A: Dr Jekyll. B: Mr Utterson. C: Poole. D: Dr Lanyon.',
    reveal: 'The answer is B, Mr Utterson. He is Jekyll’s lawyer and friend, and we follow his investigation.',
  },
  sum: [
    ['Look at **verbs** and **adverbs** together', 'Here is what to remember. Look at verbs and adverbs together.'],
    ['*trampled calmly*: violence **without** feeling', 'Trampled calmly shows violence without feeling.'],
    ['Theme: **duality**, good and evil in one man', 'And the novella’s great theme is duality, good and evil in one man. For more on Jekyll and Hyde, watch this lesson’s explainer video on Gradileo.'],
  ],
});
