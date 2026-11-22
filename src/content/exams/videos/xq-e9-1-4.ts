import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 1.4 (style: diction and syntax). An exam-style question we wrote, in the
// style of a Grade 9 reading test, on the opening of Charles Dickens's Bleak House (1853), which is in
// the public domain. The answer is D: the fragment and the repeated "fog" make the fog feel like it
// fills everything.

const PASSAGE = ['Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great (and dirty) city.'];

export default englishExam({
  lesson: 'e9-1-4',
  ...ours('a Grade 9 reading test', 'the passage is from Charles Dickens’s Bleak House (1853), in the public domain'),
  title: 'What Is the Effect of the Sentences in Bleak House?',
  thumbnailTitle: 'Syntax and Effect',
  subtitle: 'Diction and syntax, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time, on the famous fog that opens Charles Dickens’s Bleak House. We look at the sentence that has no verb, the word that keeps coming back, and the loaded words, and explain the effect they create together.',
  intro: [
    'In this video, we solve an exam-style reading question about a writer’s style. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on the opening of Dickens’s Bleak House, which is in the public domain.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'Charles Dickens, Bleak House (1853)',
    say: ['First, read the passage. Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great, and dirty, city. An ait is a small island in a river.'],
  },
  question: {
    prompt: 'What is the main **effect** of Dickens’s sentence structure and repetition in this passage?',
    text: 'Read the opening of Bleak House. What is the main effect of Dickens’s sentence structure and repetition in this passage?',
    choices: [
      'It makes the fog sound light and pleasant.',
      'It explains scientifically how fog forms.',
      'It shows that the river is clean and peaceful.',
      'It makes the fog seem to fill every place, dirty and inescapable.',
    ],
    answer: 3,
    working: 'A verbless **fragment** and **fog… fog… fog** make it seem **everywhere**; *defiled*, *pollutions*, *dirty* make it **foul**.',
    say: [
      'What is the main effect of Dickens’s sentence structure and repetition in this passage?',
      'A: It makes the fog sound light and pleasant. B: It explains scientifically how fog forms. C: It shows that the river is clean and peaceful. D: It makes the fog seem to fill every place, dirty and inescapable.',
    ],
  },
  ask: [
    ['Look at **syntax** (sentence structure) and **repetition**', 'We need to look at the sentence structure, called syntax, and the repetition.'],
    ['What **effect** do they create?', 'Then say what effect they create.'],
  ],
  know: {
    title: 'Diction and syntax',
    md: '**Diction** is word choice: formal or informal, plain or loaded. **Syntax** is sentence structure: **length**, **fragments** (sentences with no main verb), **lists**, **repetition**. To analyse style, name the feature, give the **example**, and explain the **effect**.',
    say: [
      'Here is the idea we need. Diction is a writer’s word choice: formal or informal, plain or loaded. Syntax is sentence structure: the length of sentences, fragments with no main verb, lists and repetition.',
      'To analyse style, name the feature, give the example, and explain the effect.',
    ],
  },
  plan: [
    ['Look at the **first sentence**', 'Here is the plan. First, look at the first sentence.'],
    ['Find the **repetition**', 'Second, find the repetition.'],
    ['Note the **diction**', 'Third, note the word choice.'],
  ],
  steps: [
    scene('Step 1: Syntax and repetition', [quote('p', ['[[theta:Fog everywhere.]] [[theta:Fog]] up the river… [[theta:fog]] down the river, where it rolls [[bad:defiled]]… the waterside [[bad:pollutions]] of a great (and [[bad:dirty]]) city.']), table('t', ['Feature', 'Effect'], [['**Fog everywhere.** has no verb', 'a blunt **statement**: nothing moves, the fog just **is**'], ['**fog**… **fog**… **fog**', 'like the fog, the word **fills** every line'], ['*up* the river… *down* the river', 'it reaches **every direction**']])], [
      { say: 'Step one. Fog everywhere has no verb. It is a fragment, blunt and still, as if the fog simply is, and nothing can move.', show: ['p', 't.0'] },
      { say: 'Then fog repeats again and again. Like the fog, the word fills every line.', show: 't.1' },
      { say: 'Up the river, down the river: it reaches every direction.', show: 't.2' },
    ]),
    scene('Step 2: Diction and the answer', [text('d', '*defiled*, *pollutions*, *dirty* → the fog is **foul**', 'lg'), text('a', 'Everywhere + dirty + inescapable → **D**')], [
      { say: 'Step two. And the diction is loaded: defiled, pollutions, dirty. The fog is foul, not pleasant.', show: 'd' },
      { say: 'Together, the fog seems to fill every place, dirty and inescapable. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['The **green meadows** are covered too', 'Let us check. Even the green meadows are covered. Nowhere escapes.'],
    ['Structure, repetition and diction all agree', 'Structure, repetition and diction all point the same way. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**green aits and meadows** sound peaceful, but the river is **defiled**', 'Choice C is the trap. Green aits and meadows sound peaceful, but the same river rolls defiled among pollutions.'],
      ['A', '*dirty* and *pollutions* are not pleasant', 'Choice A: dirty and pollutions are not pleasant.'],
      ['B', 'Description, not **science**', 'Choice B: this is description, not science.'],
    ],
  },
  yourTurn: {
    prompt: '*She ran. Faster. Faster still. The gate was closing.* What is the main effect of the **short sentences**?',
    choices: ['They slow the story to a calm pace.', 'They explain the history of the gate.', 'They describe the setting in detail.', 'They create urgency and tension.'],
    answer: 3,
    working: 'Short, clipped sentences mimic **quick breaths** and **speed**.',
    ask: 'She ran. Faster. Faster still. The gate was closing. What is the main effect of the short sentences? A: They slow the story to a calm pace. B: They explain the history of the gate. C: They describe the setting in detail. D: They create urgency and tension.',
    reveal: 'The answer is D. The short, clipped sentences mimic quick breaths and speed, creating urgency and tension.',
  },
  sum: [
    ['**Diction** = word choice · **syntax** = sentence structure', 'Here is what to remember. Diction is word choice, and syntax is sentence structure.'],
    ['Watch for **fragments**, **repetition** and **length**', 'Watch for fragments, repetition and sentence length.'],
    ['Name the feature, quote it, explain the **effect**', 'Name the feature, quote it, and explain the effect. For more on style, watch this lesson’s explainer video on Gradileo.'],
  ],
});
