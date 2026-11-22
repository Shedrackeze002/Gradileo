import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 4.1 (rhetorical devices). An exam-style question we wrote, in the style of a
// Grade 9 reading test, on the opening of Charles Dickens's A Tale of Two Cities (1859), which is in the
// public domain. The answer is C: each pair sets opposite ideas side by side, which is antithesis.

const LINES = ['It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair…'];

export default englishExam({
  lesson: 'e9-4-1',
  ...ours('a Grade 9 reading test', 'the passage is the opening of Charles Dickens’s A Tale of Two Cities (1859), in the public domain'),
  title: 'Which Device Opens A Tale of Two Cities?',
  thumbnailTitle: 'Antithesis',
  subtitle: 'Rhetorical devices, step by step',
  summary:
    'An exam-style question on one of the most famous openings in English, solved one small step at a time: Dickens pairs best with worst, wisdom with foolishness, hope with despair. We tell antithesis from anaphora, name the device the question asks about, and explain its effect.',
  intro: [
    'In this video, we solve an exam-style question about rhetorical devices. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on the opening of a novel by Charles Dickens, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charles Dickens, A Tale of Two Cities (1859), opening sentence',
    say: ['First, read the opening of the novel. It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.'],
  },
  question: {
    prompt: 'Dickens sets **opposite** ideas side by side: *best / worst*, *wisdom / foolishness*, *hope / despair*. What is this device called?',
    text: 'Read the opening of A Tale of Two Cities. Dickens sets opposite ideas side by side: best and worst, wisdom and foolishness, hope and despair. What is this device called?',
    choices: ['a rhetorical question', 'a simile', 'antithesis', 'onomatopoeia'],
    answer: 2,
    working: 'Opposites placed in **balanced**, matching phrases: **antithesis**.',
    say: ['Dickens sets opposite ideas side by side: best and worst, wisdom and foolishness, hope and despair. What is this device called? A: a rhetorical question. B: a simile. C: antithesis. D: onomatopoeia.'],
  },
  ask: [
    ['The pairs are **opposites**', 'The pairs in this sentence are opposites.'],
    ['What is the **name** for that?', 'We need the name of the device that sets them side by side.'],
  ],
  know: {
    title: 'Four rhetorical devices',
    md: '**Anaphora**: the **same words** start several phrases (*it was… it was…*). **Tricolon**: a group of **three** (*of the people, by the people, for the people*). **Antithesis**: **opposite** ideas in **balanced** phrases (*best of times / worst of times*). **Rhetorical question**: a question asked for **effect**, not for an answer.',
    say: [
      'Here is the idea we need. Anaphora repeats the same words at the start of several phrases. A tricolon is a group of three.',
      'Antithesis places opposite ideas in balanced, matching phrases. And a rhetorical question is asked for effect, not for an answer.',
    ],
  },
  plan: [
    ['Look at each **pair**', 'Here is the plan. First, look at each pair.'],
    ['Separate **repetition** from **contrast**', 'Second, separate the repetition from the contrast.'],
    ['Name the device and its **effect**', 'Third, name the device and its effect.'],
  ],
  steps: [
    scene('Step 1: The pairs', [table('t', ['First half', 'Second half'], [['the **best** of times', 'the **worst** of times'], ['the age of **wisdom**', 'the age of **foolishness**'], ['the spring of **hope**', 'the winter of **despair**']])], [
      { say: 'Step one. Look at each pair. The best of times, the worst of times. Best and worst are opposites.', show: 't.0' },
      { say: 'Wisdom and foolishness are opposites too. And the spring of hope against the winter of despair.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Repetition or contrast?', [quote('p', ['[[theta:it was]] the [[good:best]] of times, [[theta:it was]] the [[bad:worst]] of times']), table('d', ['Feature', 'Device'], [['*it was… it was…* repeated at the start', 'anaphora'], ['**opposites** in matching phrases', '[[good:antithesis]]']]), text('a', 'The question asks about the **opposites** → **C**', 'lg')], [
      { say: 'Step two. There are two things going on. The repeated it was, at the start of each phrase, is anaphora.', show: ['p', 'd.0'] },
      { say: 'But the opposites, placed in matching phrases, are antithesis. The question asks about the opposites, so the answer is C.', show: ['d.1', 'a'] },
    ]),
  ],
  check: [
    ['The effect: a time of **extremes**', 'Let us check. The effect is to show a time of extremes, when everything seemed both wonderful and terrible.'],
    ['That fits **antithesis**', 'That is exactly what antithesis does. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'No **question** is asked', 'Choice A is the trap. The sentence is dramatic, but it asks no question at all.'],
      ['B', 'No **like** or **as** comparison', 'Choice B: there is no comparison using like or as.'],
      ['D', 'No word that **sounds** like its meaning', 'Choice D: no word imitates a sound.'],
    ],
  },
  yourTurn: {
    prompt: 'Which device is the repeated *“it was…”* at the **start** of each phrase?',
    choices: ['anaphora', 'antithesis', 'a tricolon', 'a rhetorical question'],
    answer: 0,
    working: 'The **same words** starting each phrase: **anaphora**.',
    ask: 'Which device is the repeated, it was, at the start of each phrase? A: anaphora. B: antithesis. C: a tricolon. D: a rhetorical question.',
    reveal: 'The answer is A, anaphora. The same words, it was, start phrase after phrase, which builds a strong rhythm.',
  },
  sum: [
    ['**Antithesis**: opposites in balanced phrases', 'Here is what to remember. Antithesis places opposites in balanced phrases.'],
    ['**Anaphora**: the same words start each phrase', 'Anaphora repeats the same words at the start of each phrase.'],
    ['Read the question to see **which** feature it means', 'And read the question carefully to see which feature it means. For more on rhetorical devices, watch this lesson’s explainer video on Gradileo.'],
  ],
});
