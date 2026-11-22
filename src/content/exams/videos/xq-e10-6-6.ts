import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 6.6 (writing under a time limit). An exam-style question we wrote, in the
// style of a Grade 10 writing test. The answer is C: read and plan briefly, spend most of the time writing,
// and keep a few minutes to check.

export default englishExam({
  lesson: 'e10-6-6',
  ...ours('a Grade 10 writing test'),
  title: 'How Should You Spend 45 Minutes on an Essay?',
  thumbnailTitle: 'Timed Essays',
  subtitle: 'Planning a timed essay, step by step',
  summary:
    'An exam-style question about timed writing, solved one small step at a time: a student has forty-five minutes for an essay. We see what each stage needs, test four plans, and choose the most sensible way to use the time.',
  intro: [
    'In this video, we solve an exam-style question about writing under a time limit. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 writing test.',
  ],
  question: {
    prompt: 'You have **45 minutes** to write an essay. Which plan is **most sensible**?',
    text: 'You have 45 minutes to write an essay. Which plan is most sensible?',
    choices: [
      'Start writing at once, with no plan, for all 45 minutes.',
      'Plan for 30 minutes, then write for 15.',
      'Read the prompt and plan for about 5 to 10 minutes, write for about 30, and check for the last 5.',
      'Write the conclusion first, then decide what the topic is.',
    ],
    answer: 2,
    working: '**Short plan** → **most** of the time **writing** → a few minutes to **check**.',
    say: [
      'You have forty-five minutes to write an essay. Which plan is most sensible?',
      'A: Start writing at once, with no plan, for all forty-five minutes. B: Plan for thirty minutes, then write for fifteen. C: Read the prompt and plan for about five to ten minutes, write for about thirty, and check for the last five. D: Write the conclusion first, then decide what the topic is.',
    ],
  },
  ask: [
    ['Time is **limited**', 'In a timed essay, time is limited.'],
    ['Which plan uses it **best**?', 'We need the plan that uses it best.'],
  ],
  know: {
    title: 'Writing under a time limit',
    md: 'Three stages. **Read and plan** (about 10–20% of the time): underline the **key words** of the prompt, write a **thesis**, and jot **two or three points** with evidence. **Write** (most of the time): introduction, body paragraphs, conclusion. **Check** (the last few minutes): fix **errors** and unclear sentences. A short plan **saves** time, because you never get stuck.',
    say: [
      'Here is the idea we need. A timed essay has three stages. First, read and plan, for about a tenth to a fifth of the time. Underline the key words of the prompt, write a thesis, and jot down two or three points with evidence.',
      'Second, write, for most of the time: an introduction, body paragraphs and a conclusion. Third, check, in the last few minutes, fixing errors and unclear sentences. A short plan saves time, because you never get stuck.',
    ],
  },
  plan: [
    ['What does each stage **need**?', 'Here is the plan. First, ask what each stage needs.'],
    ['Test each **plan**', 'Second, test each plan.'],
  ],
  steps: [
    scene('Step 1: Test each plan', [table('t', ['Choice', 'Plan?', 'Enough writing time?', 'Check?'], [['A', '[[bad:✗ none]]', '✓', '[[bad:✗]]'], ['B', '✓ (too long)', '[[bad:✗ only 15 min]]', '[[bad:✗]]'], ['C', '[[good:✓ 5–10 min]]', '[[good:✓ about 30 min]]', '[[good:✓ 5 min]]'], ['D', '[[bad:✗ no topic yet]]', '?', '[[bad:✗]]']])], [
      { say: 'Step one. A has no plan, so the essay may wander, and there is no time to check.', show: 't.0' },
      { say: 'B plans for thirty minutes, leaving only fifteen to write. That is far too little.', show: 't.1' },
      { say: 'D writes a conclusion before even choosing a topic, which cannot work.', show: 't.3' },
      { say: 'C plans briefly, writes for most of the time, and keeps five minutes to check.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', 'Plan **briefly**, write **most**, **check** at the end → **C**', 'lg')], [
      { say: 'Step two. C balances all three stages. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['5 to 10 + 30 + 5 = **40 to 45** minutes', 'Let us check the sums. Five to ten, plus thirty, plus five, makes forty to forty-five minutes.'],
    ['It fits the time **exactly**', 'It fits the time. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Feels **fast**, but an essay with no plan **wanders**', 'Choice A is the trap. Starting at once feels fast, but without a plan the essay wanders.'],
      ['B', 'Planning is good, but **30** minutes is too long', 'Choice B: planning matters, but thirty minutes is too long.'],
      ['D', 'You need a **topic** first', 'Choice D: you need a topic first.'],
    ],
  },
  yourTurn: {
    prompt: 'A prompt says: *“**Compare** the two poems’ attitudes to war.”* What must the essay do?',
    choices: ['Discuss only the first poem.', 'Show similarities and differences between both poems.', 'Summarise both poems.', 'Give your own opinion of war.'],
    answer: 1,
    working: '**Compare** = find **similarities** and **differences**, in **both**.',
    ask: 'A prompt says: Compare the two poems’ attitudes to war. What must the essay do? A: Discuss only the first poem. B: Show similarities and differences between both poems. C: Summarise both poems. D: Give your own opinion of war.',
    reveal: 'The answer is B. Compare means show the similarities and differences, and it covers both poems.',
  },
  sum: [
    ['**Plan** briefly: key words, thesis, points', 'Here is what to remember. Plan briefly, with the key words, a thesis and your points.'],
    ['Spend **most** of the time writing', 'Spend most of the time writing.'],
    ['Keep a few minutes to **check**', 'And keep a few minutes to check. For more on writing under a time limit, watch this lesson’s explainer video on Gradileo.'],
  ],
});
