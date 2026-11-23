import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 1.2 (complex characters). An exam-style question we wrote, in the style of a
// Grade 11 reading test, on Jane Austen's Pride and Prejudice (1813), which is in the public domain. The
// answer is A: after reading Darcy's letter, Elizabeth sees that her own pride and prejudice blinded her.

const LINES = ['“How despicably have I acted!” she cried; “I, who have prided myself on my discernment! … Till this moment I never knew myself.”'];

export default englishExam({
  lesson: 'e11-1-2',
  ...ours('a Grade 11 reading test', 'the novel is Jane Austen’s Pride and Prejudice (1813), in the public domain'),
  title: 'What Does Elizabeth Learn From Darcy’s Letter?',
  thumbnailTitle: 'A Character Changes',
  subtitle: 'Tracing how a character changes, step by step',
  summary:
    'An exam-style question on Pride and Prejudice, solved one small step at a time: Elizabeth Bennet reads Darcy’s letter, which proves she misjudged him. We decode her cry of shame, trace her change, and explain what it reveals.',
  intro: [
    'In this video, we solve an exam-style question about how a complex character changes. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Jane Austen’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Jane Austen, Pride and Prejudice (1813), Volume 2, Chapter 13',
    say: ['First, read Elizabeth’s words. She has always prided herself on judging people well, and she believed Darcy was cruel. Then his letter shows her the truth. How despicably have I acted! she cried; I, who have prided myself on my discernment! Till this moment I never knew myself.'],
  },
  question: {
    prompt: 'What does this moment **mainly** reveal about Elizabeth’s change?',
    text: 'Read Elizabeth’s words from Pride and Prejudice. What does this moment mainly reveal about Elizabeth’s change?',
    choices: [
      'She realises that her own pride and prejudice blinded her judgement.',
      'She decides she was right about Darcy all along.',
      'She becomes angry with her family.',
      'She stops caring what anyone thinks.',
    ],
    answer: 0,
    working: '*prided myself on my discernment* + *never knew myself*: she sees her **own** faults for the first time.',
    say: [
      'What does this moment mainly reveal about Elizabeth’s change?',
      'A: She realises that her own pride and prejudice blinded her judgement. B: She decides she was right about Darcy all along. C: She becomes angry with her family. D: She stops caring what anyone thinks.',
    ],
  },
  ask: [
    ['A turning point for **Elizabeth**', 'This is a turning point for Elizabeth.'],
    ['How does she **change**?', 'We need to say how she changes.'],
  ],
  know: {
    title: 'Complex characters',
    md: 'A **complex** (round) character has **mixed** or **hidden** motives and can **change**. To trace a change: compare the character **before** and **after**, find the **turning point** that causes it, and say what the change **reveals** (often about the **theme**). Key words: *discernment* = good **judgement**; *despicably* = **shamefully**.',
    say: [
      'Here is the idea we need. A complex, or round, character has mixed or hidden motives, and can change. To trace a change, compare the character before and after, find the turning point that causes it, and say what the change reveals, often about the theme.',
      'Two key words: discernment means good judgement, and despicably means shamefully.',
    ],
  },
  plan: [
    ['Elizabeth **before** the letter', 'Here is the plan. First, Elizabeth before the letter.'],
    ['Decode her **words** now', 'Second, decode her words now.'],
    ['Name the **change**', 'Third, name the change.'],
  ],
  steps: [
    scene('Step 1: Before and after', [table('t', ['Before the letter', 'After the letter'], [['sure of her **judgement**', '*I never knew myself*'], ['sure Darcy is **cruel**', 'sees she **misjudged** him'], ['**proud** of her discernment', '**ashamed**: *How despicably have I acted!*']])], [
      { say: 'Step one. Before the letter, Elizabeth is sure of her judgement, and sure that Darcy is cruel.', show: 't.0' },
      { say: 'After it, she sees she misjudged him. Her pride turns to shame.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The change', [quote('p', ['“I, who have [[bad:prided myself]] on my [[bad:discernment]]! … [[good:Till this moment I never knew myself.]]”']), text('a', 'She sees her **own** pride and prejudice → **A**', 'lg')], [
      { say: 'Step two. She had prided herself on her judgement. Now she says she never knew herself. She recognises her own pride, and her prejudice against Darcy.', show: 'p' },
      { say: 'That is the change: she sees her own faults. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['The title names **her** faults too', 'Let us check. The novel’s title, Pride and Prejudice, names faults that belong to Elizabeth as well as Darcy.'],
    ['This is where she **sees** them', 'This is the moment she sees them. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The **opposite**: she sees she was **wrong**', 'Choice B is the trap. It is the opposite of what happens. She sees she was wrong about Darcy.'],
      ['C', 'Her shame is about **herself**', 'Choice C: her shame is about herself, not her family.'],
      ['D', 'She cares **more**, not less', 'Choice D: she cares more about judging fairly, not less.'],
    ],
  },
  yourTurn: {
    prompt: 'A character gives money to charity only when **cameras** are present. What **hidden motive** does this suggest?',
    choices: ['true generosity', 'a wish to be seen as generous', 'fear of poverty', 'grief'],
    answer: 1,
    working: 'Giving only when **watched**: the real motive is **image**.',
    ask: 'A character gives money to charity only when cameras are present. What hidden motive does this suggest? A: true generosity. B: a wish to be seen as generous. C: fear of poverty. D: grief.',
    reveal: 'The answer is B. Giving only when watched suggests the real motive is to look generous.',
  },
  sum: [
    ['Compare the character **before** and **after**', 'Here is what to remember. Compare the character before and after.'],
    ['Find the **turning point**', 'Find the turning point.'],
    ['Say what the change **reveals**', 'And say what the change reveals. For more on complex characters, watch this lesson’s explainer video on Gradileo.'],
  ],
});
