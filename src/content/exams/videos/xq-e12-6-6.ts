import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 6.6 (the final examination essay). An exam-style question we wrote, in the
// style of a Grade 12 final examination, about planning an essay on Shakespeare's Hamlet. The answer is B:
// it takes a position on the statement, chooses evidence across the play, and tests the word "never".

export default englishExam({
  lesson: 'e12-6-6',
  ...ours('a Grade 12 final examination'),
  title: 'Which Plan Best Answers This Hamlet Essay Prompt?',
  thumbnailTitle: 'The Final Exam Essay',
  subtitle: 'Reading a prompt and planning, step by step',
  summary:
    'An exam-style question about the final examination essay, solved one small step at a time. The prompt says: “Appearance and reality are never the same in Hamlet. Discuss.” We decode the prompt, spot its key word, and choose the plan that answers it best.',
  intro: [
    'In this video, we solve an exam-style question about planning a final examination essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 final examination.',
  ],
  question: {
    prompt: 'An exam prompt says: *“Appearance and reality are never the same in Hamlet.” Discuss.* Which plan answers it **best**?',
    text: 'An exam prompt says: Appearance and reality are never the same in Hamlet. Discuss. Which plan answers it best?',
    choices: [
      'Retell the plot of Hamlet from beginning to end.',
      'Take a position on the statement, test it on key moments (Claudius’s smiles, Hamlet’s madness, the play within the play), and ask whether “never” goes too far.',
      'List every soliloquy in order and paraphrase each one.',
      'Write about appearance and reality in Macbeth instead.',
    ],
    answer: 1,
    working: '*Discuss* = **argue**; key word *never* = test it; choose **evidence** across the play.',
    say: [
      'An exam prompt says: Appearance and reality are never the same in Hamlet. Discuss. Which plan answers it best?',
      'A: Retell the plot of Hamlet from beginning to end. B: Take a position on the statement, test it on key moments, Claudius’s smiles, Hamlet’s madness, the play within the play, and ask whether never goes too far. C: List every soliloquy in order and paraphrase each one. D: Write about appearance and reality in Macbeth instead.',
    ],
  },
  ask: [
    ['A statement to **discuss**', 'We are given a statement to discuss.'],
    ['Which plan **answers** it?', 'We need the plan that answers it best.'],
  ],
  know: {
    title: 'The final examination essay',
    md: 'First, **decode the prompt**: the **command word** (*discuss*, *to what extent*, *compare*) and the **key words**, especially absolute ones like **never**, **always**, **only**. Choose the **text** and **evidence** that answer it best. Plan a **thesis** that takes a position, three or four **points** with quotations, and a **counter-point**. Leave time at the end to **check** your writing.',
    say: [
      'Here is the idea we need. First, decode the prompt: the command word, such as discuss, to what extent, or compare, and the key words, especially absolute ones like never, always or only.',
      'Choose the text and evidence that answer it best. Plan a thesis that takes a position, three or four points with quotations, and a counter-point. And leave time at the end to check your writing.',
    ],
  },
  plan: [
    ['Decode the **command word**', 'Here is the plan. First, decode the command word.'],
    ['Spot the **key word**', 'Second, spot the key word.'],
    ['Choose the **plan**', 'Third, choose the plan.'],
  ],
  steps: [
    scene('Step 1: Decode the prompt', [quote('p', ['“Appearance and reality are [[bad:never]] the same in Hamlet.” [[theta:Discuss.]]']), table('t', ['Word', 'Means'], [['*Discuss*', '**argue** a position, weighing both sides'], ['*never*', 'an **absolute**: test whether it always holds']])], [
      { say: 'Step one. Discuss means argue a position, weighing both sides. It does not mean retell.', show: ['p', 't.0'] },
      { say: 'Never is an absolute. A strong answer tests it. Is it true in every case, or does it go too far?', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Choose the plan', [table('c', ['Plan', 'Verdict'], [['A: retell the plot', '[[bad:no argument]]'], ['C: list soliloquies', '[[bad:not the question]]'], ['D: Macbeth', '[[bad:wrong text]]'], ['B: position + key moments + test *never*', '[[good:answers the prompt]]']]), text('a', 'Argue, choose evidence, test *never* → **B**', 'lg')], [
      { say: 'Step two. A retells, with no argument. C lists soliloquies, which is not the question. D writes about the wrong play.', show: ['c.0', 'c.1', 'c.2'] },
      { say: 'B takes a position, tests it on key moments across the play, and asks whether never goes too far. The answer is B.', show: ['c.3', 'a'], focus: 'c.3' },
    ]),
  ],
  check: [
    ['Some things **are** what they seem: Horatio’s loyalty', 'Let us check. Some things in Hamlet are what they seem, like Horatio’s loyalty.'],
    ['so testing *never* gives B a strong **counter-point**', 'So testing never gives plan B a strong counter-point. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Retelling shows **knowledge**, but makes **no argument**', 'Choice A is the trap. Retelling the plot shows you know the play, but it makes no argument.'],
      ['C', 'Not what the prompt **asks**', 'Choice C is not what the prompt asks.'],
      ['D', 'The **wrong** text', 'Choice D uses the wrong text.'],
    ],
  },
  yourTurn: {
    prompt: 'In a 60-minute examination essay, about how long should you spend **planning**?',
    choices: ['no time at all', 'about 5 to 10 minutes', 'about 30 minutes', 'about 50 minutes'],
    answer: 1,
    working: 'A short, clear **plan**, then most of the time **writing**, then a few minutes **checking**.',
    ask: 'In a sixty-minute examination essay, about how long should you spend planning? A: no time at all. B: about five to ten minutes. C: about thirty minutes. D: about fifty minutes.',
    reveal: 'The answer is B, about five to ten minutes. A short, clear plan, then most of the time writing, and a few minutes at the end to check.',
  },
  sum: [
    ['Decode the **command word** and **key words**', 'Here is what to remember. Decode the command word and the key words.'],
    ['Test **absolutes** like *never*', 'Test absolutes like never.'],
    ['Plan briefly, write, then **check**', 'Plan briefly, write, then check. For more on the final examination essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
