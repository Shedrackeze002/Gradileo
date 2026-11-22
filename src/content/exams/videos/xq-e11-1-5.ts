import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 1.5 (style: diction, syntax and tone). An exam-style question we wrote, in the
// style of a Grade 11 reading test, on a short passage of our own. The answer is D: after a long, calm
// sentence, a run of very short sentences creates sudden shock and tension.

const LINES = ['The afternoon drifted by slowly, the sun warm on the water, the boat rocking gently while the children laughed and trailed their hands in the lake. Then the engine coughed. It stopped. Silence.'];

export default englishExam({
  lesson: 'e11-1-5',
  ...ours('a Grade 11 reading test', 'the passage is our own'),
  title: 'Why Does the Passage Switch to Short Sentences?',
  thumbnailTitle: 'Syntax and Effect',
  subtitle: 'Sentence length and tone, step by step',
  summary:
    'An exam-style question on style, solved one small step at a time: a long, lazy sentence about a summer boat trip is followed by three very short ones. We compare the two kinds of sentence, and explain the effect of the switch.',
  intro: [
    'In this video, we solve an exam-style question about syntax and its effect. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, and the passage is our own.',
  ],
  passage: {
    lines: LINES,
    by: 'A short passage (our own)',
    say: ['First, read the passage. The afternoon drifted by slowly, the sun warm on the water, the boat rocking gently while the children laughed and trailed their hands in the lake. Then the engine coughed. It stopped. Silence.'],
  },
  question: {
    prompt: 'What is the main **effect** of the short sentences at the end: *“Then the engine coughed. It stopped. Silence.”*?',
    text: 'Read the passage. What is the main effect of the short sentences at the end: “Then the engine coughed. It stopped. Silence.”?',
    choices: [
      'They continue the calm, relaxed mood.',
      'They show that the children are bored.',
      'They make the passage easier to skim.',
      'They create sudden tension, breaking the calm mood.',
    ],
    answer: 3,
    working: '**Long**, flowing sentence = **calm**; then **short**, abrupt ones = **shock** and **tension**.',
    say: [
      'What is the main effect of the short sentences at the end: Then the engine coughed. It stopped. Silence?',
      'A: They continue the calm, relaxed mood. B: They show that the children are bored. C: They make the passage easier to skim. D: They create sudden tension, breaking the calm mood.',
    ],
  },
  ask: [
    ['The sentences suddenly get **short**', 'At the end, the sentences suddenly get very short.'],
    ['What is the **effect**?', 'We need the effect of that change.'],
  ],
  know: {
    title: 'Diction, syntax and tone',
    md: '**Diction** is word choice; **syntax** is sentence structure. **Long**, flowing sentences with many clauses can feel **calm**, **dreamy** or **overwhelming**. **Short** sentences and **fragments** feel **abrupt**, **tense** or **emphatic**. A sudden **change** in length signals a **change** in mood. Together, diction and syntax create **tone**.',
    say: [
      'Here is the idea we need. Diction is word choice, and syntax is sentence structure. Long, flowing sentences with many clauses can feel calm, dreamy or overwhelming.',
      'Short sentences and fragments feel abrupt, tense or emphatic. A sudden change in sentence length often signals a change in mood. Together, diction and syntax create tone.',
    ],
  },
  plan: [
    ['Describe the **long** sentence', 'Here is the plan. First, describe the long sentence.'],
    ['Describe the **short** ones', 'Second, describe the short ones.'],
    ['Explain the **switch**', 'Third, explain the switch.'],
  ],
  steps: [
    scene('Step 1: Two kinds of sentence', [table('t', ['Sentence', 'Length and words', 'Feeling'], [['*The afternoon drifted… trailed their hands in the lake.*', '**long**, flowing; *drifted*, *warm*, *gently*, *laughed*', '[[good:calm, lazy]]'], ['*Then the engine coughed. It stopped. Silence.*', '**short**, then a one-word **fragment**', '[[bad:abrupt, tense]]']])], [
      { say: 'Step one. The first sentence is long and flowing, full of soft words: drifted, warm, gently, laughed. It feels calm and lazy.', show: 't.0' },
      { say: 'Then come three short sentences, ending in a single word: silence. They feel abrupt and tense.', show: 't.1' },
    ]),
    scene('Step 2: The switch', [quote('p', ['[[bad:Then the engine coughed. It stopped. Silence.]]']), text('a', 'The calm **breaks**: sudden **tension** → **D**', 'lg')], [
      { say: 'Step two. The sudden switch from long to short breaks the calm, like the engine itself stopping. We feel a jolt of tension: what will happen now? The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['*Silence.* is a **fragment**: the sound simply **stops**', 'Let us check. Silence is a one-word fragment, so the sentence itself stops, like the engine.'],
    ['Form and meaning **match**', 'Form and meaning match. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The calm belongs to the **first** sentence', 'Choice A is the trap. The calm belongs to the first sentence, and the short ones break it.'],
      ['B', 'The children were **happy**', 'Choice B: the children were laughing, not bored.'],
      ['C', 'Style shapes **mood**, not skimming', 'Choice C: the change shapes mood, not how easily we skim.'],
    ],
  },
  yourTurn: {
    prompt: 'In *“The **so-called** expert lectured us for hours”*, what tone does *so-called* create?',
    choices: ['scornful', 'admiring', 'neutral', 'joyful'],
    answer: 0,
    working: '*So-called* doubts the title: **scornful**.',
    ask: 'In, the so-called expert lectured us for hours, what tone does so-called create? A: scornful. B: admiring. C: neutral. D: joyful.',
    reveal: 'The answer is A, scornful. So-called suggests the person does not deserve the title of expert.',
  },
  sum: [
    ['**Long** sentences: calm or overwhelming', 'Here is what to remember. Long sentences can feel calm or overwhelming.'],
    ['**Short** sentences: abrupt, tense, emphatic', 'Short sentences feel abrupt, tense or emphatic.'],
    ['A **change** in length signals a change in **mood**', 'And a change in length signals a change in mood. For more on diction, syntax and tone, watch this lesson’s explainer video on Gradileo.'],
  ],
});
