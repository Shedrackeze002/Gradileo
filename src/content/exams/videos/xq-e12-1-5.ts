import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 1.5 (style and authorial voice). An exam-style question we wrote, in the style
// of a Grade 12 reading test, on Charles Dickens's Bleak House (1853), which is in the public domain. The
// answer is A: repeated "fog" in verbless fragments spreads the fog through every clause, as it spreads
// through London.

const LINES = ['Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great (and dirty) city.'];

export default englishExam({
  lesson: 'e12-1-5',
  ...ours('a Grade 12 reading test', 'the novel is Charles Dickens’s Bleak House (1853), in the public domain'),
  title: 'What Makes the Fog in Bleak House So Powerful?',
  thumbnailTitle: 'Authorial Style',
  subtitle: 'Style and authorial voice, step by step',
  summary:
    'An exam-style question on the famous opening of Charles Dickens’s Bleak House, solved one small step at a time. We look at how the sentences are built, notice one word that keeps coming back, and explain how the style makes the fog fill the page.',
  intro: [
    'In this video, we solve an exam-style question about an author’s style. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Dickens’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charles Dickens, Bleak House (1853), Chapter 1',
    say: ['First, read the opening of Bleak House, set in London. Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great, and dirty, city.'],
  },
  question: {
    prompt: 'Which feature of Dickens’s **style** does most to create the effect of fog filling the city?',
    text: 'Read the opening of Bleak House. Which feature of Dickens’s style does most to create the effect of fog filling the city?',
    choices: [
      'the word “fog” repeated at the start of verbless fragments, so it spreads through every clause',
      'long passages of dialogue between characters',
      'a first-person narrator describing his feelings',
      'a strict rhyme scheme',
    ],
    answer: 0,
    working: '*Fog everywhere.* has **no main verb**; *fog up… fog down…* **repeats**: the word itself is **everywhere**.',
    say: [
      'Which feature of Dickens’s style does most to create the effect of fog filling the city?',
      'A: the word fog repeated at the start of verbless fragments, so it spreads through every clause. B: long passages of dialogue between characters. C: a first-person narrator describing his feelings. D: a strict rhyme scheme.',
    ],
  },
  ask: [
    ['We need a feature of **style**', 'We need a feature of Dickens’s style.'],
    ['that creates the effect of **fog everywhere**', 'One that creates the effect of fog filling the city.'],
  ],
  know: {
    title: 'Style and authorial voice',
    md: '**Style** is how a writer uses language: **diction** (word choice), **syntax** (sentence structure), **imagery**, **rhythm** and **tone**. A writer’s **voice** is the personality we hear in that style. To analyse style, name the **feature**, quote it, and explain its **effect**. Watch for quiet **irony** in the narration, where the words say more than they seem to.',
    say: [
      'Here is the idea we need. Style is how a writer uses language: diction, which is word choice; syntax, which is sentence structure; imagery; rhythm; and tone. A writer’s voice is the personality we hear in that style.',
      'To analyse style, name the feature, quote it, and explain its effect. And watch for quiet irony in the narration, where the words say more than they seem to.',
    ],
  },
  plan: [
    ['Look at the **sentences**', 'Here is the plan. First, look at how the sentences are built.'],
    ['Find the **repetition**', 'Second, find the repetition.'],
    ['Explain the **effect**', 'Third, explain the effect.'],
  ],
  steps: [
    scene('Step 1: Syntax and repetition', [quote('p', ['[[theta:Fog]] everywhere. [[theta:Fog]] up the river…; [[theta:fog]] down the river…']), table('t', ['Feature', 'Evidence'], [['**verbless** fragment', '*Fog everywhere.* (no main verb)'], ['**repetition** at the start of clauses', '*Fog… Fog… fog…*']])], [
      { say: 'Step one. Fog everywhere has no main verb. It is a fragment, so the fog simply is, without any action or time.', show: ['p', 't.0'] },
      { say: 'And fog comes back at the start of each clause: fog up the river, fog down the river. That repetition at the start is called anaphora.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: The effect', [text('e', 'The **word** fills the passage as the **fog** fills London'), text('a', 'Repeated *fog* in verbless fragments → **A**', 'lg')], [
      { say: 'Step two. The word fog fills the sentences just as the fog fills London, up the river and down, everywhere at once.', show: 'e' },
      { say: 'So the repeated word in verbless fragments creates the effect. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['Notice the quiet **irony** too: *a great (and dirty) city*', 'Let us check. Notice the quiet irony in great, and dirty, city, hidden in brackets.'],
    ['but the **fog effect** comes from the repetition', 'That is Dickens’s voice, but the fog effect itself comes from the repetition. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'No **I**: the narrator is not a character here', 'Choice C is the trap. The voice feels personal, but there is no I. The narrator is not a character here.'],
      ['B', 'No **dialogue** at all', 'Choice B: there is no dialogue at all.'],
      ['D', 'It is **prose**, with no rhyme', 'Choice D: it is prose, with no rhyme scheme.'],
    ],
  },
  yourTurn: {
    prompt: '*“It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.”* (Jane Austen) The tone of this sentence is best described as:',
    choices: ['ironic', 'tragic', 'furious', 'scientific'],
    answer: 0,
    working: 'Grand words for **gossip**: the narrator **means less** than she says → **ironic**.',
    ask: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. This is from Jane Austen. The tone of this sentence is best described as: A: ironic. B: tragic. C: furious. D: scientific.',
    reveal: 'The answer is A, ironic. The grand phrase, a truth universally acknowledged, dresses up local gossip, and Austen means us to smile at it.',
  },
  sum: [
    ['Style = **diction**, **syntax**, **imagery**, **rhythm**, **tone**', 'Here is what to remember. Style is diction, syntax, imagery, rhythm and tone.'],
    ['Name the feature, **quote** it, explain its **effect**', 'Name the feature, quote it, and explain its effect.'],
    ['Listen for quiet **irony** in the narrator’s voice', 'And listen for quiet irony in the narrator’s voice. For more on style and authorial voice, watch this lesson’s explainer video on Gradileo.'],
  ],
});
