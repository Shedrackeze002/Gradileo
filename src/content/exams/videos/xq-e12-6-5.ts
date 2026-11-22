import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 6.5 (style: precision, concision and voice). An exam-style revision question we
// wrote, in the style of a Grade 12 writing test. The answer is C: it cuts every redundant phrase and keeps
// the meaning.

export default englishExam({
  lesson: 'e12-6-5',
  ...ours('a Grade 12 writing test'),
  title: 'How Do You Make This Sentence Concise?',
  thumbnailTitle: 'Concision',
  subtitle: 'Precision, concision and voice, step by step',
  summary:
    'An exam-style revision question, solved one small step at a time: “In my personal opinion, I think that the poem is basically about the fact that time passes.” We find the words that add nothing, cut them, and keep the meaning.',
  intro: [
    'In this video, we solve an exam-style revision question about concision. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 writing test.',
  ],
  question: {
    prompt: 'Which revision of this sentence is the most **concise** and **precise**?<br>*In my personal opinion, I think that the poem is basically about the fact that time passes.*',
    text: 'Which revision of this sentence is the most concise and precise? In my personal opinion, I think that the poem is basically about the fact that time passes.',
    choices: [
      'In my opinion, I think the poem is basically about time passing.',
      'I personally think that the poem is about the fact that time is passing.',
      'The poem is about the passing of time.',
      'The poem is about time.',
    ],
    answer: 2,
    working: 'Cut *In my personal opinion*, *I think that*, *basically*, *the fact that* → **The poem is about the passing of time.**',
    say: [
      'Which revision of this sentence is the most concise and precise? In my personal opinion, I think that the poem is basically about the fact that time passes.',
      'A: In my opinion, I think the poem is basically about time passing. B: I personally think that the poem is about the fact that time is passing. C: The poem is about the passing of time. D: The poem is about time.',
    ],
  },
  ask: [
    ['The sentence is **wordy**', 'The sentence is wordy.'],
    ['Which revision is **concise** and **precise**?', 'We need the revision that is concise, and still precise.'],
  ],
  know: {
    title: 'Precision, concision and voice',
    md: '**Concision** means cutting words that add nothing: **redundancy** (*personal opinion*, *free gift*), **throat-clearing** (*I think that*, *In my opinion*), **fillers** (*basically*, *really*) and **empty phrases** (*the fact that*). **Precision** means keeping the **exact** meaning. Cut too far and you lose it. A consistent **voice** keeps the same level of formality throughout.',
    say: [
      'Here is the idea we need. Concision means cutting words that add nothing: redundancy, like personal opinion or free gift; throat-clearing, like I think that, or in my opinion; fillers, like basically or really; and empty phrases, like the fact that.',
      'Precision means keeping the exact meaning. If you cut too far, you lose it. And a consistent voice keeps the same level of formality throughout.',
    ],
  },
  plan: [
    ['Find the **empty** words', 'Here is the plan. First, find the empty words.'],
    ['Cut them', 'Second, cut them.'],
    ['Check the **meaning** survives', 'Third, check that the meaning survives.'],
  ],
  steps: [
    scene('Step 1: Empty words', [quote('p', ['[[bad:In my personal opinion, I think that]] the poem is [[bad:basically]] about [[bad:the fact that]] time passes.']), table('t', ['Words', 'Problem'], [['*In my personal opinion, I think that*', 'throat-clearing: we know it is **your** essay'], ['*basically*', 'a **filler**'], ['*the fact that*', 'an **empty** phrase']])], [
      { say: 'Step one. In my personal opinion, I think that: we already know the essay gives your view. That is throat-clearing.', show: ['p', 't.0'] },
      { say: 'Basically is a filler. And the fact that is an empty phrase.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Cut and check', [table('c', ['Revision', 'Result'], [['A', '[[bad:still wordy]]: *In my opinion, I think… basically*'], ['B', '[[bad:still wordy]]: *personally… the fact that*'], ['D: *about time*', '[[bad:too vague]]: meaning **lost**'], ['C: *the passing of time*', '[[good:concise and precise]]']]), text('a', '**The poem is about the passing of time.** → **C**', 'lg')], [
      { say: 'Step two. A and B keep some of the empty words.', show: ['c.0', 'c.1'] },
      { say: 'D cuts too far. About time could mean anything to do with time. The meaning, that time passes, is lost.', show: 'c.2' },
      { say: 'C keeps the exact meaning in eight words. The answer is C.', show: ['c.3', 'a'], focus: 'c.3' },
    ]),
  ],
  check: [
    ['From **seventeen** words to **eight**', 'Let us check. The sentence goes from seventeen words to eight.'],
    ['with **nothing** of the meaning lost', 'With nothing of the meaning lost. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Shortest, but **loses** the meaning', 'Choice D is the trap. It is the shortest, but it loses the meaning. Concise must stay precise.'],
      ['A', 'Keeps *I think* and *basically*', 'Choice A keeps I think and basically.'],
      ['B', 'Keeps *the fact that*', 'Choice B keeps the fact that.'],
    ],
  },
  yourTurn: {
    prompt: 'Which phrase is **redundant**?',
    choices: ['a free gift', 'a red car', 'a tall tree', 'a quick reply'],
    answer: 0,
    working: 'Every gift is **free**: *free* adds nothing.',
    ask: 'Which phrase is redundant? A: a free gift. B: a red car. C: a tall tree. D: a quick reply.',
    reveal: 'The answer is A, a free gift. A gift is free by definition, so free adds nothing.',
  },
  sum: [
    ['Cut **throat-clearing**, **fillers** and **empty phrases**', 'Here is what to remember. Cut throat-clearing, fillers and empty phrases.'],
    ['Keep the **exact** meaning', 'But keep the exact meaning.'],
    ['Concise **and** precise', 'Good style is concise and precise. For more on precision, concision and voice, watch this lesson’s explainer video on Gradileo.'],
  ],
});
