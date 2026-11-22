import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 7.3 (timed writing). An exam-style question we wrote, in the style of a Grade
// 9 writing test, on unpicking a timed-essay prompt. The answer is C: the command word is "evaluate",
// and the prompt asks for both sides and a final judgement.

export default englishExam({
  lesson: 'e9-7-3',
  ...ours('a Grade 9 writing test'),
  title: 'What Is This Essay Prompt Really Asking?',
  thumbnailTitle: 'Timed Writing',
  subtitle: 'Unpicking an exam prompt, step by step',
  summary:
    'An exam-style question about timed writing, solved one small step at a time: a prompt asks students to evaluate whether schools should start later in the morning. We find the command word, the topic and the hidden instructions, and decide what a full answer must do.',
  intro: [
    'In this video, we solve an exam-style question about timed writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 writing test.',
  ],
  question: {
    prompt: 'Read this prompt: *“**Evaluate** the claim that schools should start later in the morning. Consider **both sides** before reaching a **judgement**.”* What must the essay do?',
    text: 'Read this prompt: Evaluate the claim that schools should start later in the morning. Consider both sides before reaching a judgement. What must the essay do?',
    choices: [
      'Tell a story about a morning at school.',
      'Argue only for a later start.',
      'Weigh the arguments for and against a later start, then give a clear judgement.',
      'Describe what a school morning looks like.',
    ],
    answer: 2,
    working: '**Evaluate** + *both sides* + *judgement* = weigh **for and against**, then **decide**.',
    say: [
      'Read this prompt: Evaluate the claim that schools should start later in the morning. Consider both sides before reaching a judgement. What must the essay do?',
      'A: Tell a story about a morning at school. B: Argue only for a later start. C: Weigh the arguments for and against a later start, then give a clear judgement. D: Describe what a school morning looks like.',
    ],
  },
  ask: [
    ['A timed prompt has **instructions** hidden in it', 'A timed essay prompt has instructions hidden in it.'],
    ['What must the essay **do**?', 'We need to work out what the essay must do.'],
  ],
  know: {
    title: 'Command words and timing',
    md: 'The **command word** says what to do: **describe** (say what something is like), **explain** (say how or why), **argue** or **persuade** (one side, strongly), **evaluate** or **discuss** (weigh **both sides**, then **judge**). Underline the **command word**, the **topic** and any **extra instructions**. In a timed essay, spend about **5 minutes** planning before you write.',
    say: [
      'Here is the idea we need. The command word says what to do. Describe means say what something is like. Explain means say how or why. Argue or persuade means take one side, strongly. And evaluate or discuss means weigh both sides, then judge.',
      'Underline the command word, the topic and any extra instructions. And in a timed essay, spend about five minutes planning before you write.',
    ],
  },
  plan: [
    ['Find the **command word**', 'Here is the plan. First, find the command word.'],
    ['Find the **topic** and **extra instructions**', 'Second, find the topic and any extra instructions.'],
    ['Decide what the essay must **do**', 'Third, decide what the essay must do.'],
  ],
  steps: [
    scene('Step 1: Unpick the prompt', [quote('p', ['[[theta:Evaluate]] the claim that [[good:schools should start later in the morning]]. Consider [[theta:both sides]] before reaching a [[theta:judgement]].']), table('t', ['Part', 'Words', 'Meaning'], [['command word', '**Evaluate**', 'weigh **both sides**, then **judge**'], ['topic', '*schools should start later*', 'a **claim** to test'], ['extra instructions', '*both sides*, *judgement*', 'for **and** against, then a **decision**']])], [
      { say: 'Step one. Pause and find the command word. It is evaluate, which means weigh both sides, then judge.', show: ['p', 't.0'], wait: 2 },
      { say: 'The topic is the claim that schools should start later in the morning.', show: 't.1' },
      { say: 'And the extra instructions repeat it: consider both sides, then reach a judgement.', show: 't.2' },
    ]),
    scene('Step 2: What the essay must do', [text('a', 'Arguments **for**, arguments **against**, then a **clear judgement** → **C**', 'lg')], [
      { say: 'Step two. So the essay must weigh the arguments for and against a later start, then give a clear judgement. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Does C cover **every** part of the prompt?', 'Let us check. Does C cover every part of the prompt?'],
    ['**Both sides**, ✓ and a **judgement**, ✓', 'Both sides, yes, and a judgement, yes. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Only **one** side: misses *consider both sides*', 'Choice B is the trap. Arguing for a later start sounds like an essay, but it ignores consider both sides.'],
      ['A', 'A **story** answers no command word here', 'Choice A: a story does not answer the prompt.'],
      ['D', '**Describe** is not **evaluate**', 'Choice D: describing is not evaluating.'],
    ],
  },
  yourTurn: {
    prompt: 'A prompt says: *“**Explain** why sleep is important for teenagers.”* What does **explain** ask you to do?',
    choices: ['Argue against sleep.', 'Tell a funny story.', 'Give reasons showing how or why sleep matters.', 'List types of beds.'],
    answer: 2,
    working: '**Explain** = say **how** or **why**.',
    ask: 'A prompt says: explain why sleep is important for teenagers. What does explain ask you to do? A: Argue against sleep. B: Tell a funny story. C: Give reasons showing how or why sleep matters. D: List types of beds.',
    reveal: 'The answer is C. Explain means give reasons that show how or why, here why sleep matters for teenagers.',
  },
  sum: [
    ['Underline the **command word** first', 'Here is what to remember. Underline the command word first.'],
    ['**Evaluate**: both sides, then a **judgement**', 'Evaluate means weigh both sides, then give a judgement.'],
    ['**Plan** for about five minutes before writing', 'And plan for about five minutes before writing. For more on timed writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
