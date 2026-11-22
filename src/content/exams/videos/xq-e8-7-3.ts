import { englishExam, ours, quote, scene, table } from '../english.ts';

// Grade 8 English, lesson 7.3 (narrative voice). An exam-style question we wrote, in the style of a
// Grade 8 writing test, on a short narrative we wrote. The answer is C: sentence 3 slips from the past
// tense into the present.

const PARA = ['(1) The storm hit just after midnight. (2) Ama woke to the sound of the shutters banging. (3) She runs to the window and sees the old oak bending in the wind. (4) Then the lights went out.'];

export default englishExam({
  lesson: 'e8-7-3',
  ...ours('a Grade 8 writing test', 'the narrative is by Gradileo'),
  title: 'Which Sentence Breaks the Tense?',
  thumbnailTitle: 'Consistent Tense',
  subtitle: 'Keeping tense and point of view consistent, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a short story about a storm slips into a different tense halfway through. We find the tense of each verb, spot the sentence that breaks the pattern, and fix it.',
  intro: [
    'In this video, we solve an exam-style writing question about narrative voice. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its narrative ourselves, in the style of a Grade 8 writing test.',
  ],
  passage: {
    lines: PARA,
    by: 'A narrative written for Gradileo',
    say: ['First, read the narrative. One: The storm hit just after midnight. Two: Ama woke to the sound of the shutters banging. Three: She runs to the window and sees the old oak bending in the wind. Four: Then the lights went out.'],
  },
  question: {
    prompt: 'Which sentence **shifts tense** and should be revised?',
    text: 'Read the narrative about the storm. Which sentence shifts tense and should be revised?',
    choices: ['sentence 1', 'sentence 2', 'sentence 3', 'sentence 4'],
    answer: 2,
    working: 'The story is in the **past** (*hit*, *woke*, *went*); sentence 3 uses the **present** (*runs*, *sees*).',
    say: ['Which sentence shifts tense and should be revised? A: sentence one. B: sentence two. C: sentence three. D: sentence four.'],
  },
  ask: [
    ['A narrative should keep **one tense**', 'A narrative should usually keep to one tense.'],
    ['Which sentence **breaks** it?', 'We need the sentence that breaks it.'],
  ],
  know: {
    title: 'Consistent tense and point of view',
    md: 'Choose a **tense** (usually **past**) and a **point of view** (*I* or *she/he*) and **keep them**. A sudden switch confuses readers. Check each **main verb**: *hit, woke* are past; *runs, sees* are present.',
    say: [
      'Here is the idea we need. Choose a tense, usually the past, and a point of view, I or she or he, and keep them. A sudden switch confuses readers.',
      'To check, look at each main verb. Hit and woke are past. Runs and sees are present.',
    ],
  },
  plan: [
    ['Find the **main verbs**', 'Here is the plan. First, find the main verbs.'],
    ['Name each **tense**', 'Second, name the tense of each.'],
    ['Spot the **odd one out**', 'Third, spot the odd one out.'],
  ],
  steps: [
    scene('Step 1: The verbs', [table('t', ['Sentence', 'Verbs', 'Tense'], [['(1)', '**hit**', 'past'], ['(2)', '**woke**', 'past'], ['(3)', '**runs**, **sees**', '[[bad:present]]'], ['(4)', '**went**', 'past']])], [
      { say: 'Step one. Pause and find the verbs.', wait: 3 },
      { say: 'Hit, woke and went are all past tense.', show: ['t.0', 't.1', 't.3'] },
      { say: 'But sentence three uses runs and sees: present tense. That is the slip. The answer is C.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Fix it', [quote('p', ['She [[good:ran]] to the window and [[good:saw]] the old oak bending in the wind.'])], [
      { say: 'Step two. Fixed: she ran to the window and saw the old oak bending in the wind. Now every sentence is in the past.', show: 'p' },
    ]),
  ],
  check: [
    ['Read the fixed story: it **flows**', 'Let us check. Read the story with the fix. It flows without a jolt.'],
    ['All four sentences now in the **past**', 'All four sentences are in the past. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', '**Then** sounds like a change, but **went** is past', 'Choice D is the trap. Then signals a change in events, but went is still past tense.'],
      ['B', '**banging** is part of a description, not the main verb', 'Choice B: banging describes the shutters; the main verb, woke, is past.'],
      ['A', '**hit** is past here', 'Choice A: hit is past tense here.'],
    ],
  },
  yourTurn: {
    prompt: 'Which line of **dialogue** best reveals that a character is **impatient**?',
    choices: ['“I am feeling impatient,” said Joe.', '“Hello,” said Joe.', '“Are we leaving or not? I’ve been waiting an hour!” Joe snapped.', '“It is Tuesday,” said Joe.'],
    answer: 2,
    working: 'The question, the complaint and **snapped** show impatience without naming it.',
    ask: 'Which line of dialogue best reveals that a character is impatient? A: I am feeling impatient, said Joe. B: Hello, said Joe. C: Are we leaving or not? I’ve been waiting an hour! Joe snapped. D: It is Tuesday, said Joe.',
    reveal: 'The answer is C. The sharp question, the complaint and the verb snapped all show impatience. A only tells us.',
  },
  sum: [
    ['Keep **one tense** and **one point of view**', 'Here is what to remember. Keep one tense and one point of view.'],
    ['Check each **main verb**', 'Check each main verb.'],
    ['Let **dialogue** reveal character', 'And let dialogue reveal character. For more on narrative voice, watch this lesson’s explainer video on Gradileo.'],
  ],
});
