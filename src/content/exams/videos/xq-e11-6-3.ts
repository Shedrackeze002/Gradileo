import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 6.3 (using sources). An exam-style writing question we wrote, in the style of a
// Grade 11 writing test, on a source sentence we invented. The answer is D: it keeps the meaning, uses new
// words and structure, and credits the source.

const SOURCE = ['*Source (Lee, an invented sleep researcher):* “Regular sleep improves memory because the brain consolidates new learning during deep sleep.”'];

export default englishExam({
  lesson: 'e11-6-3',
  ...ours('a Grade 11 writing test', 'the source and its author are invented'),
  title: 'Which Is an Acceptable Paraphrase?',
  thumbnailTitle: 'Paraphrase, Not Plagiarism',
  subtitle: 'Using sources honestly, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a sentence from a sleep researcher, and four student versions of it. We learn what a fair paraphrase needs, test each version for copying, meaning and credit, and choose the acceptable one.',
  intro: [
    'In this video, we solve an exam-style question about using sources. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 writing test, and the source and its author are invented.',
  ],
  passage: {
    lines: SOURCE,
    by: 'An invented source',
    say: ['First, read the source. It is from an invented sleep researcher named Lee. Regular sleep improves memory because the brain consolidates new learning during deep sleep.'],
  },
  question: {
    prompt: 'Which is an **acceptable paraphrase** of the source?',
    text: 'Read the source. Which is an acceptable paraphrase of the source?',
    choices: [
      'Regular sleep improves memory because the brain consolidates new learning during deep sleep.',
      'Regular sleep boosts memory because the brain consolidates new learning during deep sleep (Lee).',
      'Sleep is the only thing that matters for students’ marks (Lee).',
      'According to Lee, a steady sleep routine helps us remember, since the brain strengthens what we have learned while we sleep deeply.',
    ],
    answer: 3,
    working: 'Same **meaning**, **own** words and structure, and **credit** to the source.',
    say: [
      'Which is an acceptable paraphrase of the source?',
      'A: Regular sleep improves memory because the brain consolidates new learning during deep sleep. B: Regular sleep boosts memory because the brain consolidates new learning during deep sleep, with Lee in brackets. C: Sleep is the only thing that matters for students’ marks, with Lee in brackets. D: According to Lee, a steady sleep routine helps us remember, since the brain strengthens what we have learned while we sleep deeply.',
    ],
  },
  ask: [
    ['A paraphrase **restates** a source', 'A paraphrase restates a source.'],
    ['Which version does it **honestly**?', 'We need the version that does it honestly.'],
  ],
  know: {
    title: 'Paraphrase, summary and synthesis',
    md: 'A **paraphrase** restates one idea in **your own words and structure**, keeps the **meaning**, and **credits** the source. A **summary** gives the main points **more briefly**. Copying words without quotation marks, or changing only **one or two** words, is **plagiarism**, even with a citation. **Synthesis** combines **several** sources to support **one** point.',
    say: [
      'Here is the idea we need. A paraphrase restates one idea in your own words and your own sentence structure, keeps the meaning, and credits the source. A summary gives the main points more briefly.',
      'Copying words without quotation marks, or changing only one or two words, is plagiarism, even with a citation. And synthesis combines several sources to support one point.',
    ],
  },
  plan: [
    ['Test each for **copying**', 'Here is the plan. First, test each version for copying.'],
    ['Test for **meaning** and **credit**', 'Second, test each for meaning and credit.'],
  ],
  steps: [
    scene('Step 1: Three tests', [table('t', ['Choice', 'Own words?', 'Same meaning?', 'Credit?'], [['A', '[[bad:✗ copied exactly]]', '✓', '[[bad:✗]]'], ['B', '[[bad:✗ one word changed]]', '✓', '✓'], ['C', '✓', '[[bad:✗ distorts it]]', '✓'], ['D', '[[good:✓]]', '[[good:✓]]', '[[good:✓ According to Lee]]']])], [
      { say: 'Step one. A copies the source word for word, with no credit. That is plagiarism.', show: 't.0' },
      { say: 'B changes only one word, improves to boosts, and copies the rest. Even with a citation, that is still plagiarism.', show: 't.1' },
      { say: 'C uses new words, but changes the meaning. The source never says sleep is the only thing that matters.', show: 't.2' },
      { say: 'D uses its own words and structure, keeps the meaning, and credits Lee.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The answer', [quote('p', ['[[good:According to Lee]], a steady sleep routine helps us remember, since the brain strengthens what we have learned while we sleep deeply.']), text('a', 'Own words + same meaning + credit → **D**', 'lg')], [
      { say: 'Step two. D passes all three tests. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Hide the source: could you **write** D from understanding?', 'Let us check. If you understood the idea and hid the source, could you write D? Yes.'],
    ['That is what real paraphrase **feels** like', 'That is what real paraphrase feels like. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'A **citation** does not fix **copied** wording', 'Choice B is the trap. It has a citation, but a citation does not fix copied wording.'],
      ['A', 'Copied, with **no credit**', 'Choice A is copied, with no credit at all.'],
      ['C', '**Distorts** the meaning', 'Choice C distorts the meaning.'],
    ],
  },
  yourTurn: {
    prompt: 'What does it mean to **synthesize** sources?',
    choices: ['copy the longest source', 'list each source separately, with no links', 'combine several sources to support one point', 'use only one source'],
    answer: 2,
    working: '**Several** sources, **one** point.',
    ask: 'What does it mean to synthesize sources? A: copy the longest source. B: list each source separately, with no links. C: combine several sources to support one point. D: use only one source.',
    reveal: 'The answer is C. Synthesis combines several sources, and shows how together they support one point.',
  },
  sum: [
    ['Paraphrase: **own words**, **same meaning**, **credit**', 'Here is what to remember. A paraphrase uses your own words, keeps the meaning, and gives credit.'],
    ['Changing a word or two is still **plagiarism**', 'Changing a word or two is still plagiarism.'],
    ['**Synthesis**: several sources, one point', 'And synthesis combines several sources for one point. For more on using sources, watch this lesson’s explainer video on Gradileo.'],
  ],
});
