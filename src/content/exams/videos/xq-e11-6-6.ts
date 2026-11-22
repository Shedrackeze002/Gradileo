import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 6.6 (the timed literary essay). An exam-style question we wrote, in the style of
// a Grade 11 writing test. The answer is C: the plan covers every task in the prompt: ambition, how
// Shakespeare presents it, and both language and structure.

const PROMPT = ['*Prompt:* **How** does Shakespeare **present ambition** in *Macbeth*? Refer to his use of **language** and **structure**.'];

export default englishExam({
  lesson: 'e11-6-6',
  ...ours('a Grade 11 writing test', 'the prompt is our own'),
  title: 'Which Plan Answers the Whole Prompt?',
  thumbnailTitle: 'Timed Literary Essay',
  subtitle: 'Breaking a prompt into tasks, step by step',
  summary:
    'An exam-style question about the timed literary essay, solved one small step at a time: a prompt asks how Shakespeare presents ambition in Macbeth, through language and structure. We break the prompt into its tasks, test four plans, and choose the one that covers them all.',
  intro: [
    'In this video, we solve an exam-style question about the timed literary essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 writing test, and the prompt is our own.',
  ],
  passage: {
    lines: PROMPT,
    by: 'A timed essay prompt (our own)',
    say: ['First, read the prompt. How does Shakespeare present ambition in Macbeth? Refer to his use of language and structure.'],
  },
  question: {
    prompt: 'Which essay plan covers **every task** in the prompt?',
    text: 'Read the prompt. Which essay plan covers every task in the prompt?',
    choices: [
      '1: Retell Act 1. 2: Retell Act 3. 3: Retell Act 5.',
      '1: Lady Macbeth’s character. 2: The witches. 3: Banquo.',
      '1: Ambition in the imagery of *vaulting ambition*. 2: Ambition in the soliloquies. 3: How the play’s structure shows ambition rising, then falling.',
      '1: Why I enjoyed Macbeth. 2: My favourite scene.',
    ],
    answer: 2,
    working: 'Tasks: **ambition** + **how** (methods) + **language** + **structure**. Only C covers all four.',
    say: [
      'Which essay plan covers every task in the prompt?',
      'A: One, retell Act One. Two, retell Act Three. Three, retell Act Five. B: One, Lady Macbeth’s character. Two, the witches. Three, Banquo. C: One, ambition in the imagery of vaulting ambition. Two, ambition in the soliloquies. Three, how the play’s structure shows ambition rising, then falling. D: One, why I enjoyed Macbeth. Two, my favourite scene.',
    ],
  },
  ask: [
    ['A prompt contains **several tasks**', 'An essay prompt contains several tasks.'],
    ['Which plan covers **all** of them?', 'We need the plan that covers all of them.'],
  ],
  know: {
    title: 'The timed literary essay',
    md: 'Break the prompt into **tasks**: the **command** (*how* = analyse **methods**), the **focus** (*ambition*), and any **requirements** (*language and structure*). Make a quick **plan** that answers each task, with a **thesis** and two or three **points**, each with a short **quotation**. Then write, and save a few minutes to **check**.',
    say: [
      'Here is the idea we need. Break the prompt into tasks: the command, where how means analyse the writer’s methods; the focus, here ambition; and any requirements, here language and structure.',
      'Make a quick plan that answers each task, with a thesis and two or three points, each with a short quotation. Then write, and save a few minutes to check.',
    ],
  },
  plan: [
    ['Break the prompt into **tasks**', 'Here is the plan. First, break the prompt into its tasks.'],
    ['Test each **plan** against the tasks', 'Second, test each plan against the tasks.'],
  ],
  steps: [
    scene('Step 1: The tasks', [quote('p', ['[[theta:How]] does Shakespeare present [[theta:ambition]] in Macbeth? Refer to his use of [[theta:language]] and [[theta:structure]].']), table('t', ['Task', 'Meaning'], [['**How**', 'analyse **methods**, not plot'], ['**ambition**', 'the **focus** of every paragraph'], ['**language** and **structure**', 'cover **both**']])], [
      { say: 'Step one. Pause and find the tasks. How means analyse Shakespeare’s methods, not retell the plot.', show: ['p', 't.0'], wait: 2 },
      { say: 'Ambition is the focus of every paragraph. And language and structure must both be covered.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Test the plans', [table('c', ['Plan', 'Methods?', 'Ambition?', 'Language + structure?'], [['A', '[[bad:✗ retells]]', '?', '[[bad:✗]]'], ['B', '✗', '[[bad:✗ other topics]]', '✗'], ['C', '[[good:✓]]', '[[good:✓ every point]]', '[[good:✓ both]]'], ['D', '✗', '✗', '[[bad:✗ opinion]]']]), text('a', 'Only C covers **every** task → **C**', 'lg')], [
      { say: 'Step two. A only retells the plot. B drifts to other characters, not ambition. D is just personal opinion.', show: ['c.0', 'c.1', 'c.3'] },
      { say: 'C analyses ambition through imagery and soliloquies, which are language, and through the play’s rise and fall, which is structure. Only C covers every task. The answer is C.', show: ['c.2', 'a'], focus: 'c.2' },
    ]),
  ],
  check: [
    ['Tick each task against C: **all** four', 'Let us check by ticking each task against C. How, ambition, language and structure: all four.'],
    ['So C holds', 'So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Covers the **whole play**, but only **retells** it', 'Choice A is the trap. It covers the whole play, which feels thorough, but it only retells the plot.'],
      ['B', 'Strong topics, but **not ambition**', 'Choice B: these are real topics, but not ambition.'],
      ['D', '**Opinion**, not analysis', 'Choice D is opinion, not analysis.'],
    ],
  },
  yourTurn: {
    prompt: 'In a literary essay prompt, the word **“how”** asks you to…',
    choices: ['retell what happens', 'analyse the methods the writer uses', 'give your opinion of the writer', 'list the characters'],
    answer: 1,
    working: '**How** = the writer’s **methods**.',
    ask: 'In a literary essay prompt, the word how asks you to: A: retell what happens. B: analyse the methods the writer uses. C: give your opinion of the writer. D: list the characters.',
    reveal: 'The answer is B. How asks you to analyse the writer’s methods, such as language, imagery and structure.',
  },
  sum: [
    ['Break the prompt into **tasks**', 'Here is what to remember. Break the prompt into its tasks.'],
    ['**How** = analyse methods', 'How means analyse the writer’s methods.'],
    ['Check your plan covers **every** task', 'And check your plan covers every task. For more on the timed literary essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
