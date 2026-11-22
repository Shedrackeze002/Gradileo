import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 2.3 (voice and irony in poetry). An exam-style question we wrote, in the style
// of a Grade 11 reading test, on Robert Browning's "My Last Duchess" (1842), which is in the public
// domain. The answer is C: the Duke lets slip that he had his wife silenced, revealing jealousy and a
// chilling need for control.

const POEM = ['Oh sir, she smiled, no doubt,<br>Whene’er I passed her; but who passed without<br>Much the same smile? This grew; I gave commands;<br>Then all smiles stopped together. There she stands<br>As if alive.'];

export default englishExam({
  lesson: 'e11-2-3',
  ...ours('a Grade 11 reading test', 'the poem is Robert Browning’s “My Last Duchess” (1842), in the public domain'),
  title: 'What Does the Duke Reveal Without Meaning To?',
  thumbnailTitle: 'Dramatic Monologue',
  subtitle: 'Voice and irony in a poem, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Browning’s “My Last Duchess”. The Duke shows a visitor his late wife’s portrait and complains that she smiled at everyone. We read between his lines and explain what he reveals without meaning to.',
  intro: [
    'In this video, we solve an exam-style poetry question about the dramatic monologue. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Browning’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Robert Browning, “My Last Duchess” (1842), lines 43 to 47',
    say: ['First, read the lines. The Duke of Ferrara is showing a visitor a portrait of his late wife. He has been complaining that she smiled too freely, at everyone. Oh sir, she smiled, no doubt, whene’er I passed her; but who passed without much the same smile? This grew; I gave commands; then all smiles stopped together. There she stands as if alive.'],
  },
  question: {
    prompt: 'What does the Duke **reveal**, without meaning to, in *“I gave commands; / Then all smiles stopped together”*?',
    text: 'Read the lines from “My Last Duchess”. What does the Duke reveal, without meaning to, in “I gave commands; then all smiles stopped together”?',
    choices: [
      'He asked his wife to smile more often.',
      'He commissioned a new painting of her.',
      'He had his wife silenced, most likely killed, out of jealousy and a need for control.',
      'He forgave his wife for her behaviour.',
    ],
    answer: 2,
    working: 'Jealous that she smiled at **everyone**, he *gave commands*, and **all** her smiles **stopped**: she was silenced for ever.',
    say: [
      'What does the Duke reveal, without meaning to, in: I gave commands; then all smiles stopped together?',
      'A: He asked his wife to smile more often. B: He commissioned a new painting of her. C: He had his wife silenced, most likely killed, out of jealousy and a need for control. D: He forgave his wife for her behaviour.',
    ],
  },
  ask: [
    ['A **dramatic monologue**: one speaker, a silent listener', 'This is a dramatic monologue: one speaker, talking to a silent listener.'],
    ['What does the Duke **give away**?', 'We need what the Duke gives away, without meaning to.'],
  ],
  know: {
    title: 'Dramatic monologue and irony',
    md: 'In a **dramatic monologue**, one **speaker** talks to a **silent listener** at a key moment, and **reveals** more about themselves than they intend. Readers **infer** the truth from gaps, tone and slips. This creates **dramatic irony**: we understand what the speaker does not realise he is showing. **Verbal irony** in a poem says the opposite of what is meant.',
    say: [
      'Here is the idea we need. In a dramatic monologue, one speaker talks to a silent listener at a key moment, and reveals more about themselves than they intend.',
      'Readers infer the truth from gaps, tone and slips. This creates dramatic irony: we understand what the speaker does not realise he is showing. And verbal irony, in a poem, says the opposite of what is meant.',
    ],
  },
  plan: [
    ['What is the Duke’s **complaint**?', 'Here is the plan. First, what is the Duke’s complaint?'],
    ['What did he **do**?', 'Second, what did he do about it?'],
    ['What does that **reveal**?', 'Third, what does that reveal about him?'],
  ],
  steps: [
    scene('Step 1: Complaint and action', [table('t', ['Words', 'What they show'], [['*she smiled… but who passed without / Much the same smile?*', 'she smiled at **everyone**, not only him'], ['*This grew*', 'his **jealousy** grew'], ['*I gave commands*', 'he **ordered** something'], ['*Then all smiles stopped together*', '[[bad:she never smiled **again**]]']])], [
      { say: 'Step one. His complaint: she smiled at him, but she smiled at everyone else the same way.', show: 't.0' },
      { say: 'This grew: his jealousy grew. I gave commands: he ordered something.', show: ['t.1', 't.2'] },
      { say: 'Then all smiles stopped together. Every smile stopped at once, and for good. And now she is only a portrait, as if alive.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: What it reveals', [quote('p', ['…[[bad:I gave commands]];', '[[bad:Then all smiles stopped together]]. There she stands', '[[theta:As if alive]].']), text('a', 'He had her **silenced**, most likely killed: **jealousy** and **control** → **C**', 'lg')], [
      { say: 'Step two. He says it calmly, almost in passing, but he has revealed that he had his wife silenced, most likely killed. He is jealous and controlling, and he feels no guilt. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['He prefers the **portrait**: it smiles only when **he** chooses', 'Let us check. He prefers the portrait. It hides behind a curtain, and smiles only when he chooses to show it.'],
    ['Control is everything to him', 'Control is everything to him. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The **portrait** is there, but it was painted **before**', 'Choice B is the trap. A portrait is part of the scene, but it was painted while she was alive, not because of his commands.'],
      ['A', 'He wanted **fewer** smiles, not more', 'Choice A: he wanted fewer smiles, not more.'],
      ['D', 'No sign of **forgiveness**', 'Choice D: there is no sign of forgiveness.'],
    ],
  },
  yourTurn: {
    prompt: 'In Stephen Crane’s poem, the line *“Do not weep… **War is kind**”* is repeated beside images of soldiers dying. What is this?',
    choices: ['hyperbole', 'alliteration', 'verbal irony', 'a simile'],
    answer: 2,
    working: 'He **says** war is kind while **showing** its cruelty: **verbal irony**.',
    ask: 'In Stephen Crane’s poem, the line, Do not weep, war is kind, is repeated beside images of soldiers dying. What is this? A: hyperbole. B: alliteration. C: verbal irony. D: a simile.',
    reveal: 'The answer is C, verbal irony. The poem says war is kind while showing that it is cruel, so it means the opposite.',
  },
  sum: [
    ['**Dramatic monologue**: one speaker, a silent listener', 'Here is what to remember. A dramatic monologue has one speaker and a silent listener.'],
    ['Infer what the speaker **gives away**', 'Infer what the speaker gives away without meaning to.'],
    ['**Irony** says or shows the opposite', 'And irony says or shows the opposite of what is meant. For more on voice and irony in poetry, watch this lesson’s explainer video on Gradileo.'],
  ],
});
