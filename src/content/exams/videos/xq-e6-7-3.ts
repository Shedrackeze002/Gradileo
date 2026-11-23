import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 7.3 (persuasive writing). An exam-style question we wrote, in the style of
// a Grade 6 writing test. The answer is D: it takes a side that people could disagree with, and
// gives a reason. The others are a fact, a question, or a vague feeling.

export default englishExam({
  lesson: 'e6-7-3',
  ...ours('a Grade 6 writing test'),
  title: 'Which Sentence Is the Strongest Claim?',
  thumbnailTitle: 'Persuasive Claims',
  subtitle: 'Writing an arguable claim, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student is writing to persuade their school about recess, and we choose the strongest claim. We learn what makes a claim arguable, test each sentence, and find the one that takes a clear side with a reason.',
  intro: [
    'In this video, we solve an exam-style question about claims in persuasive writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 writing test.',
  ],
  question: {
    prompt: 'A student is writing to persuade their principal about recess. Which sentence is the **strongest claim**?',
    text: 'A student is writing to persuade their principal about recess. Which sentence is the strongest claim?',
    choices: [
      'Our school has a twenty-minute recess.',
      'Do students like recess?',
      'Recess is something that a lot of people have feelings about.',
      'Our school should make recess longer, because active breaks help students focus in class.',
    ],
    answer: 3,
    working: 'D takes a clear **side** that people could **disagree** with, and gives a **reason**.',
    say: [
      'A student is writing to persuade their principal about recess. Which sentence is the strongest claim?',
      'A: Our school has a twenty-minute recess. B: Do students like recess? C: Recess is something that a lot of people have feelings about. D: Our school should make recess longer, because active breaks help students focus in class.',
    ],
  },
  ask: [
    ['A **claim** is the main point of a persuasive piece', 'A claim is the main point a persuasive piece argues for.'],
    ['Which is the **strongest**?', 'We need the strongest one.'],
  ],
  know: {
    title: 'What makes a strong claim',
    md: 'A strong claim is **arguable**: a sensible person could **disagree**. It is **clear** about the writer’s **side**, often using *should*. It is not a **fact** that everyone accepts, or a **question**. A **reason** makes it stronger still.',
    say: [
      'Here is the idea we need. A strong claim is arguable, which means a sensible person could disagree with it. It is clear about which side the writer is on, and often uses a word like should.',
      'A fact that everyone accepts is not a claim, and neither is a question. Adding a reason makes a claim even stronger.',
    ],
  },
  plan: [
    ['Could someone **disagree**?', 'Here is the plan. First, ask whether someone could disagree with each sentence.'],
    ['Is the writer’s **side** clear?', 'Second, ask whether the writer’s side is clear.'],
    ['Is there a **reason**?', 'Third, ask whether there is a reason.'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Sentence', 'Arguable?', 'Clear side?', 'Reason?'], [['A: has a twenty-minute recess', '[[bad:✗ a fact]]', '[[bad:✗]]', '[[bad:✗]]'], ['B: Do students like recess?', '[[bad:✗ a question]]', '[[bad:✗]]', '[[bad:✗]]'], ['C: people have feelings about it', '[[bad:✗ too vague]]', '[[bad:✗]]', '[[bad:✗]]'], ['D: should make recess longer, because…', '[[good:✓]]', '[[good:✓ longer]]', '[[good:✓ focus]]']])], [
      { say: 'Step one. A is a fact that anyone could check. Nobody would argue with it.', show: 't.0' },
      { say: 'B is a question. It does not take a side at all.', show: 't.1' },
      { say: 'C is so vague that it says nothing. Which feelings? What should happen?', show: 't.2' },
      { say: 'D says recess should be longer, which some people could disagree with. Its side is clear, and it gives a reason: active breaks help students focus.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The answer', [text('a', '**D.** Our school should make recess longer, because active breaks help students focus in class.', 'lg')], [
      { say: 'Step two. Only D passes all three tests. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['A whole essay could **argue for** D', 'Let us check. A whole persuasive letter could argue for D, with evidence about focus and health.'],
    ['Nobody could argue for or against A, B or C', 'Nobody could argue for or against A, B or C in the same way. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Sounds **big**, but takes **no side**', 'Choice C is the trap. It sounds important, but it never says what the writer thinks.'],
      ['A', 'A **fact**, not a claim', 'Choice A is a fact, so there is nothing to argue about.'],
      ['B', 'A **question** can open an essay, but is not a claim', 'Choice B could make a good opening line, but a question is not a claim.'],
    ],
  },
  yourTurn: {
    prompt: 'A writer claims that students should not have homework on weekends. Which sentence best **answers a counterclaim**?',
    choices: ['Weekends are fun.', 'Homework is given by teachers.', 'Some say weekend work builds good habits, but daily practice during the week can do the same.', 'I do not like homework.'],
    answer: 2,
    working: 'C names the **other side** fairly, then **answers** it.',
    ask: 'A writer claims that students should not have homework on weekends. Which sentence best answers a counterclaim? A: Weekends are fun. B: Homework is given by teachers. C: Some say weekend work builds good habits, but daily practice during the week can do the same. D: I do not like homework.',
    reveal: 'The answer is C. It names what the other side would say, that weekend work builds good habits, and then answers it.',
  },
  sum: [
    ['A strong claim is **arguable**: someone could disagree', 'Here is what to remember. A strong claim is arguable, so someone could disagree with it.'],
    ['It takes a clear **side**, often with *should*', 'It takes a clear side, often with should.'],
    ['Facts and questions are **not** claims; a **reason** helps', 'Facts and questions are not claims, and a reason makes a claim stronger. For more on persuasive writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
