import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 4.2 (persuasive techniques). An exam-style question we wrote, in the style
// of a Grade 7 reading test, on a short speech we wrote. The answer is C, a rhetorical question: it is
// asked for effect, and the speaker expects every listener to answer it the same way.

const SPEECH = [
  'Every day, our park fills with litter. Plastic bottles. Crisp packets. Broken glass where small children play.',
  'Do we really want our little brothers and sisters to grow up surrounded by rubbish? Of course not. So let us act, and let us act today.',
];

export default englishExam({
  lesson: 'e7-4-2',
  ...ours('a Grade 7 reading test', 'the speech is by Gradileo'),
  title: 'Which Persuasive Technique Does the Speaker Use?',
  thumbnailTitle: 'Persuasive Techniques',
  subtitle: 'Rhetorical questions and their effect, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a student speech about litter in the park asks the audience a question it does not expect them to answer. We learn the common persuasive techniques, find the one in the underlined sentence, and explain its effect.',
  intro: [
    'In this video, we solve an exam-style question about persuasive techniques. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its speech ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: SPEECH,
    by: 'A speech written for Gradileo',
    say: [
      'First, read the speech. Every day, our park fills with litter. Plastic bottles. Crisp packets. Broken glass where small children play.',
      'Do we really want our little brothers and sisters to grow up surrounded by rubbish? Of course not. So let us act, and let us act today.',
    ],
  },
  question: {
    prompt: 'Which technique does the speaker use in *“Do we really want our little brothers and sisters to grow up surrounded by rubbish?”*',
    text: 'Read the speech about litter. Which technique does the speaker use in “Do we really want our little brothers and sisters to grow up surrounded by rubbish?”',
    choices: ['a statistic', 'an expert opinion', 'a rhetorical question', 'a counterclaim'],
    answer: 2,
    working: 'A question asked for **effect**: the only possible answer is **“no”**, and the speaker even gives it: *Of course not.*',
    say: ['Which technique does the speaker use in, Do we really want our little brothers and sisters to grow up surrounded by rubbish? A: a statistic. B: an expert opinion. C: a rhetorical question. D: a counterclaim.'],
  },
  ask: [
    ['The sentence is a **question**', 'The sentence is a question.'],
    ['Which **technique** is it?', 'We need to name the persuasive technique it uses.'],
  ],
  know: {
    title: 'Persuasive techniques',
    md: 'A **rhetorical question** is asked for **effect**, not for an answer: the answer seems **obvious**. **Repetition** drives a point home. **Emotive language** stirs feelings (*little brothers and sisters*). Others include **statistics** and **expert** opinion.',
    say: [
      'Here is the idea we need. A rhetorical question is asked for effect, not to get an answer, because the answer seems obvious.',
      'Repetition drives a point home. Emotive language stirs up feelings. And statistics and expert opinions give facts and authority.',
    ],
  },
  plan: [
    ['Does the speaker **want** an answer?', 'Here is the plan. First, ask whether the speaker really wants an answer.'],
    ['What **effect** does it have?', 'Second, ask what effect the sentence has.'],
  ],
  steps: [
    scene('Step 1: Is an answer wanted?', [quote('p', ['[[theta:Do we really want]] our [[bad:little brothers and sisters]] to grow up surrounded by rubbish? [[good:Of course not.]]'])], [
      { say: 'Step one. Pause and answer the question yourself.', show: 'p', wait: 3 },
      { say: 'The only sensible answer is no. The speaker even answers it: Of course not. So the question is not really asking. It is a rhetorical question.', focus: 'p.0' },
    ]),
    scene('Step 2: Check the others', [table('t', ['Choice', 'In the sentence?'], [['a statistic', '[[bad:✗ no numbers]]'], ['an expert opinion', '[[bad:✗ no expert]]'], ['a rhetorical question', '[[good:✓ the answer is obvious]]'], ['a counterclaim', '[[bad:✗ no other side]]']]), text('a', 'The answer is **C**.')], [
      { say: 'Step two. There are no numbers and no expert, and the speaker does not mention the other side.', show: ['t.0', 't.1', 't.3'] },
      { say: 'It is a rhetorical question. Its effect is to make every listener agree in their head. The answer is C.', show: ['t.2', 'a'], focus: 't.2' },
    ]),
  ],
  check: [
    ['Listeners answer **“no”** in their heads', 'Let us check. Every listener answers no in their head, so they find themselves agreeing.'],
    ['That leads straight into **let us act**', 'That leads straight into the call to act. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'A **counterclaim** answers the **other side**', 'Choice D is the trap. A counterclaim gives the other side’s view, but nobody here argues for litter.'],
      ['A', 'No **numbers**', 'Choice A: there are no numbers.'],
      ['B', 'No **expert**', 'Choice B: no expert is quoted.'],
    ],
  },
  yourTurn: {
    prompt: 'Which technique is used in *“Let us act, and let us act today”*?',
    choices: ['a statistic', 'repetition', 'an anecdote', 'humour'],
    answer: 1,
    working: '*let us act* is **repeated** to drive the point home.',
    ask: 'Which technique is used in, let us act, and let us act today? A: a statistic. B: repetition. C: an anecdote. D: humour.',
    reveal: 'The answer is B, repetition. Let us act is said twice, which makes the call to action stronger and easier to remember.',
  },
  sum: [
    ['A **rhetorical question** has an **obvious** answer', 'Here is what to remember. A rhetorical question has an obvious answer.'],
    ['It makes listeners **agree** without noticing', 'It makes listeners agree without noticing.'],
    ['Also watch for **repetition** and **emotive** language', 'Also watch for repetition and emotive language. For more on persuasive techniques, watch this lesson’s explainer video on Gradileo.'],
  ],
});
