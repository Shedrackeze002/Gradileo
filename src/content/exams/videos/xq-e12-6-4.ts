import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 6.4 (reflective writing). An exam-style writing question we wrote, in the style
// of a Grade 12 writing test. The answer is A: it moves from a specific experience to an insight about the
// writer.

export default englishExam({
  lesson: 'e12-6-4',
  ...ours('a Grade 12 writing test'),
  title: 'Which Sentence Turns Experience Into Insight?',
  thumbnailTitle: 'Reflective Writing',
  subtitle: 'From experience to insight, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time. A student is writing a reflective piece about losing a race. We test four sentences: which tells what happened, which is vague, and which moves from the experience to a real insight?',
  intro: [
    'In this video, we solve an exam-style writing question about reflective writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 writing test.',
  ],
  question: {
    prompt: 'A student is writing a reflective piece about losing a race. Which sentence **best** moves from experience to **insight**?',
    text: 'A student is writing a reflective piece about losing a race. Which sentence best moves from experience to insight?',
    choices: [
      'Losing that race showed me I had been running to beat others, and I began running for myself.',
      'I lost the race by three seconds.',
      'The race was on a cold Saturday in March.',
      'Races are hard, and everyone loses sometimes.',
    ],
    answer: 0,
    working: 'A: **experience** (*losing that race*) → **insight** (*running to beat others*) → **change** (*running for myself*).',
    say: [
      'A student is writing a reflective piece about losing a race. Which sentence best moves from experience to insight?',
      'A: Losing that race showed me I had been running to beat others, and I began running for myself. B: I lost the race by three seconds. C: The race was on a cold Saturday in March. D: Races are hard, and everyone loses sometimes.',
    ],
  },
  ask: [
    ['Reflective writing needs **insight**', 'Reflective writing needs insight.'],
    ['Which sentence **moves** there?', 'We need the sentence that moves from experience to insight.'],
  ],
  know: {
    title: 'Reflective writing',
    md: 'Reflective writing moves from **experience** (what happened) to **insight** (what it means, and what it changed). It uses **specific detail** to make the experience real, and **honest** thought about the writer’s **self**. Avoid stopping at the event, and avoid **vague** general lessons (*everyone makes mistakes*) that could belong to anyone.',
    say: [
      'Here is the idea we need. Reflective writing moves from experience, what happened, to insight, what it means and what it changed. It uses specific detail to make the experience real, and honest thought about the writer’s self.',
      'So avoid stopping at the event, and avoid vague general lessons, like everyone makes mistakes, that could belong to anyone.',
    ],
  },
  plan: [
    ['Which only tell **what happened**?', 'Here is the plan. First, which sentences only tell what happened?'],
    ['Which are **vague**?', 'Second, which are vague?'],
    ['Which reach **insight**?', 'Third, which reaches insight?'],
  ],
  steps: [
    scene('Step 1: Test each one', [table('t', ['Sentence', 'Does'], [['B: *lost by three seconds*', '[[bad:event only]]'], ['C: *a cold Saturday in March*', '[[bad:setting only]]'], ['D: *Races are hard…*', '[[bad:vague]]: could be anyone'], ['A: *showed me… running for myself*', '[[good:experience → insight]]']])], [
      { say: 'Step one. B, I lost the race by three seconds, tells only what happened. C gives only the setting.', show: ['t.0', 't.1'] },
      { say: 'D, races are hard, and everyone loses sometimes, is a vague lesson that could belong to anyone.', show: 't.2' },
      { say: 'A goes further.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The insight', [table('i', ['Part of A', 'Does'], [['*Losing that race*', 'the **experience**'], ['*I had been running to beat others*', 'the **insight** about **self**'], ['*I began running for myself*', 'the **change**']]), text('a', 'Experience → insight → change → **A**', 'lg')], [
      { say: 'Step two. Losing that race is the experience. I had been running to beat others is an honest insight about the self.', show: ['i.0', 'i.1'] },
      { say: 'And I began running for myself is the change it led to. The answer is A.', show: ['i.2', 'a'] },
    ]),
  ],
  check: [
    ['A is **personal**: it could only be this writer', 'Let us check. A is personal. It could only belong to this writer.'],
    ['unlike D’s **general** lesson', 'Unlike the general lesson in D. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Sounds **wise**, but is **vague**', 'Choice D is the trap. It sounds like a lesson, but it is vague, and could belong to anyone.'],
      ['B', 'Tells the **event** only', 'Choice B tells the event only.'],
      ['C', 'Gives the **setting** only', 'Choice C gives the setting only.'],
    ],
  },
  yourTurn: {
    prompt: 'Which detail is the most **specific**?',
    choices: ['It was a nice day.', 'The weather was good.', 'Things were great.', 'Frost glittered on the bike rack.'],
    answer: 3,
    working: 'A **picture** the reader can **see**: *frost glittered on the bike rack*.',
    ask: 'Which detail is the most specific? A: It was a nice day. B: The weather was good. C: Things were great. D: Frost glittered on the bike rack.',
    reveal: 'The answer is D. Frost glittering on the bike rack is a picture the reader can see. The others are vague.',
  },
  sum: [
    ['Move from **experience** to **insight**', 'Here is what to remember. Reflective writing moves from experience to insight.'],
    ['Use **specific** detail', 'Use specific detail.'],
    ['Avoid **vague** lessons that fit anyone', 'And avoid vague lessons that could fit anyone. For more on reflective writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
