import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 4.1 (spelling). An exam-style spelling question we wrote, in the style of a
// GCSE English Language exam. The answer is C: "their" shows that the bags belong to the students.

export default englishExam({
  lesson: 'ex-4-1',
  ...ours('a GCSE English Language exam'),
  title: 'Their, There or They’re?',
  thumbnailTitle: 'Homophones',
  subtitle: 'Choosing the right homophone, step by step',
  summary:
    'An exam-style spelling question, solved one small step at a time: “The students left ___ bags by the door.” We test each spelling with a quick check, and choose the one that shows the bags belong to the students.',
  intro: [
    'In this video, we solve an exam-style spelling question about homophones. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Language exam.',
  ],
  question: {
    prompt: 'Which word correctly completes the sentence?<br>*The students left ___ bags by the door.*',
    text: 'Which word correctly completes the sentence? The students left, blank, bags by the door.',
    choices: ['there', 'they’re', 'their', 'thier'],
    answer: 2,
    working: 'The bags **belong** to the students → **their** (possession).',
    say: [
      'Which word correctly completes the sentence? The students left, blank, bags by the door.',
      'A: there, t h e r e. B: they’re, t h e y apostrophe r e. C: their, t h e i r. D: t h i e r.',
    ],
  },
  ask: [
    ['These words **sound** the same', 'These words sound the same, but mean different things.'],
    ['Which one **fits**?', 'We need the one that fits this sentence.'],
  ],
  know: {
    title: 'Homophones and spelling rules',
    md: '**Homophones** sound the same but are spelt differently. **their** = belonging to them (*their bags*); **there** = a place (*over there*) or *there is*; **they’re** = **they are**. Others: **your / you’re**, **its / it’s**, **to / too / two**. Spelling rules help too: **i before e except after c** (with exceptions), and changing **y to i** before *-es* (*city → cities*).',
    say: [
      'Here is the idea we need. Homophones sound the same but are spelt differently. Their, t h e i r, means belonging to them, as in their bags. There, t h e r e, is a place, as in over there, or begins there is. And they’re, with an apostrophe, means they are.',
      'Other homophones include your and you’re, its and it’s, and to, too and two. Spelling rules help too, like i before e except after c, and changing y to i before e s, so city becomes cities.',
    ],
  },
  plan: [
    ['Test **they’re**', 'Here is the plan. First, test they’re by saying they are.'],
    ['Test **there**', 'Second, test there as a place.'],
    ['Check **ownership**', 'Third, check for ownership.'],
  ],
  steps: [
    scene('Step 1: Test each one', [table('t', ['Try', 'Makes sense?'], [['*The students left **they are** bags…*', '[[bad:✗]]'], ['*The students left **over there** bags…*', '[[bad:✗]]'], ['*The students left **the bags that belong to them**…*', '[[good:✓]]']])], [
      { say: 'Step one. Try they are: the students left they are bags. That makes no sense, so it is not they’re.', show: 't.0' },
      { say: 'Try a place: the students left over there bags. That makes no sense either.', show: 't.1' },
      { say: 'Try ownership: the students left the bags that belong to them. That works.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Spell it', [quote('p', ['The students left [[good:their]] bags by the door.']), text('n', '**their**: t h e i r (e before i, like **the** + **ir**)'), text('a', '**C**', 'lg')], [
      { say: 'Step two. Ownership needs their. The students left their bags by the door.', show: 'p' },
      { say: 'It is spelt t h e i r. A trick: it starts with the word the. The answer is C.', show: ['n', 'a'] },
    ]),
  ],
  check: [
    ['Swap in **our**: *we left **our** bags*', 'Let us check. Swap in another ownership word, our: we left our bags. It fits the same slot.'],
    ['so the slot needs an **ownership** word', 'So the slot needs an ownership word, their. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', '*thier* looks right but is a **misspelling**', 'Choice D is the trap. It looks almost right, but t h i e r is a common misspelling.'],
      ['A', '*there* is a **place**', 'Choice A: there is a place.'],
      ['B', '*they’re* = **they are**', 'Choice B: they’re means they are.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word is spelt **correctly**?',
    choices: ['necessary', 'neccessary', 'necesary', 'neccesary'],
    answer: 0,
    working: '**One c**, **two s**: n e **c** e **ss** a r y.',
    ask: 'Which word is spelt correctly? A: n e c e s s a r y. B: n e c c e s s a r y. C: n e c e s a r y. D: n e c c e s a r y.',
    reveal: 'The answer is A. Necessary has one c and two s’s. A trick: a shirt has one collar and two sleeves.',
  },
  sum: [
    ['**their** = belonging to them', 'Here is what to remember. Their means belonging to them.'],
    ['**there** = a place · **they’re** = they are', 'There is a place, and they’re means they are.'],
    ['Test by **swapping** in the meaning', 'Test by swapping in the meaning. For more on spelling, watch this lesson’s explainer video on Gradileo.'],
  ],
});
