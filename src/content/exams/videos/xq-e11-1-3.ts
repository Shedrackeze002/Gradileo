import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 1.3 (narrative voice and perspective). An exam-style question we wrote, in the
// style of a Grade 11 reading test, on a short passage of our own. The answer is B: a third-person
// narrator slips into Anna's own thoughts and tone without quotation marks, which is free indirect style.

const LINES = ['Anna looked out at the grey sky. Of course it would rain today, the one day she had left her umbrella at home. Typical. She pulled up her collar and stepped out into the street.'];

export default englishExam({
  lesson: 'e11-1-3',
  ...ours('a Grade 11 reading test', 'the passage is our own'),
  title: 'Whose Voice Says “Typical”?',
  thumbnailTitle: 'Free Indirect Style',
  subtitle: 'Narrative voice, step by step',
  summary:
    'An exam-style question on narrative voice, solved one small step at a time: a third-person passage about Anna and the rain suddenly sounds like Anna herself. We find the pronouns, spot the lines that sound like her thoughts, and name the technique.',
  intro: [
    'In this video, we solve an exam-style question about narrative voice. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, and the passage is our own.',
  ],
  passage: {
    lines: LINES,
    by: 'A short passage (our own)',
    say: ['First, read the passage. Anna looked out at the grey sky. Of course it would rain today, the one day she had left her umbrella at home. Typical. She pulled up her collar and stepped out into the street.'],
  },
  question: {
    prompt: 'The narrator uses *she*, yet *“Of course it would rain today… **Typical.**”* sounds like Anna’s own thoughts. What is this technique called?',
    text: 'Read the passage. The narrator uses “she”, yet “Of course it would rain today… Typical.” sounds like Anna’s own thoughts. What is this technique called?',
    choices: ['first-person narration', 'free indirect style', 'omniscient commentary', 'a dramatic monologue'],
    answer: 1,
    working: 'Third person (*she*), but in **Anna’s voice** and **attitude**, with **no** quotation marks or *she thought*: **free indirect style**.',
    say: ['The narrator uses she, yet, Of course it would rain today, typical, sounds like Anna’s own thoughts. What is this technique called? A: first-person narration. B: free indirect style. C: omniscient commentary. D: a dramatic monologue.'],
  },
  ask: [
    ['Third person, but in **Anna’s voice**', 'The passage is in the third person, but parts of it sound like Anna.'],
    ['What is that **called**?', 'We need the name of that technique.'],
  ],
  know: {
    title: 'Narrative voice',
    md: '**Direct** thought: *“Typical,” she thought.* **Free indirect style**: the third-person narration slips into a character’s **own words** and **attitude**, with **no** quotation marks and no *she thought* (*Typical.*). It lets us hear a character’s mind while keeping the narrator’s distance. A narrator’s **voice** reveals attitude; judge a narrator’s **reliability** from evidence that contradicts them.',
    say: [
      'Here is the idea we need. Direct thought uses quotation marks: typical, she thought. Free indirect style lets the third-person narration slip into a character’s own words and attitude, with no quotation marks, and no she thought.',
      'It lets us hear a character’s mind, while the narrator keeps a little distance. A narrator’s voice reveals attitude, and we judge a narrator’s reliability from evidence that contradicts them.',
    ],
  },
  plan: [
    ['Check the **pronouns**', 'Here is the plan. First, check the pronouns.'],
    ['Find whose **voice** each line has', 'Second, find whose voice each line has.'],
    ['Name the **technique**', 'Third, name the technique.'],
  ],
  steps: [
    scene('Step 1: Pronouns and voice', [table('t', ['Line', 'Whose voice?'], [['*Anna looked out at the grey sky.*', 'the **narrator**: neutral'], ['*Of course it would rain today…*', '[[good:**Anna**: irritated]]'], ['*Typical.*', '[[good:**Anna**: a sigh, in one word]]'], ['*She pulled up her collar…*', 'the **narrator** again']])], [
      { say: 'Step one. The pronouns are she and her, so this is third person. Anna looked out at the grey sky is the narrator, neutral.', show: 't.0' },
      { say: 'But, of course it would rain today, and, typical, are Anna’s own irritated thoughts, in her own voice.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      { say: 'Then the narrator returns: she pulled up her collar.', show: 't.3' },
    ]),
    scene('Step 2: Name it', [quote('p', ['[[good:Of course it would rain today]], the one day she had left her umbrella at home. [[good:Typical.]]']), text('a', 'Third person + character’s voice, **no** quotation marks → **free indirect style** → **B**', 'lg')], [
      { say: 'Step two. The narration stays in the third person, but carries Anna’s voice, with no quotation marks and no she thought. That is free indirect style. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Rewrite as direct thought: *“Typical,” she thought.*', 'Let us check. As direct thought, it would be: typical, she thought, in quotation marks.'],
    ['The passage drops those **markers**', 'The passage drops those markers. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'It **feels** like *I*, but the pronoun is **she**', 'Choice A is the trap. The thoughts feel personal, like I, but the pronoun is still she.'],
      ['C', 'Omniscient commentary would be the **narrator’s** opinion', 'Choice C: omniscient commentary would be the narrator’s own opinion, not Anna’s.'],
      ['D', 'A dramatic monologue is a **poem** in one speaker’s voice', 'Choice D: a dramatic monologue is a poem spoken by one character.'],
    ],
  },
  yourTurn: {
    prompt: 'A narrator insists that everyone admires him, but every other character **avoids** him. This narrator is most likely…',
    choices: ['omniscient', 'reliable', 'unreliable', 'objective'],
    answer: 2,
    working: 'The **evidence** contradicts what he says: **unreliable**.',
    ask: 'A narrator insists that everyone admires him, but every other character avoids him. This narrator is most likely: A: omniscient. B: reliable. C: unreliable. D: objective.',
    reveal: 'The answer is C, unreliable. The evidence in the story contradicts what he tells us.',
  },
  sum: [
    ['**Free indirect style**: third person in a character’s voice', 'Here is what to remember. Free indirect style is third-person narration in a character’s own voice.'],
    ['No quotation marks, no *she thought*', 'There are no quotation marks, and no she thought.'],
    ['Judge **reliability** from evidence', 'And judge a narrator’s reliability from the evidence. For more on narrative voice and perspective, watch this lesson’s explainer video on Gradileo.'],
  ],
});
