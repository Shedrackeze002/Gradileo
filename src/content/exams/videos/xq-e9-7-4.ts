import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 7.4 (revising for style). An exam-style question we wrote, in the style of a
// Grade 9 writing test. The answer is D: it removes every redundancy ("personal opinion", "I think",
// "final ending", "unexpected and surprising") and keeps the meaning.

export default englishExam({
  lesson: 'e9-7-4',
  ...ours('a Grade 9 writing test'),
  title: 'Which Revision Cuts the Wordiness?',
  thumbnailTitle: 'Cutting Wordiness',
  subtitle: 'Revising for style, step by step',
  summary:
    'An exam-style question on revising for style, solved one small step at a time: a wordy sentence about a story’s ending says several things twice. We find every redundancy, cut it, and choose the revision that is shortest without losing the meaning.',
  intro: [
    'In this video, we solve an exam-style question about revising for style. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 writing test.',
  ],
  question: {
    prompt: 'Which revision of this sentence is **most concise** without losing its meaning?<br>*In my personal opinion, I think that the final ending of the story was very unexpected and surprising.*',
    text: 'Which revision of this sentence is most concise without losing its meaning? In my personal opinion, I think that the final ending of the story was very unexpected and surprising.',
    choices: [
      'In my opinion, I think the final ending was very unexpected and surprising.',
      'The ending of the story, in my personal opinion, was unexpected.',
      'I personally think that the ending was surprising and unexpected.',
      'I think the ending of the story was surprising.',
    ],
    answer: 3,
    working: 'Cut the **doubles**: *personal opinion* + *I think*, *final ending*, *unexpected and surprising*.',
    say: [
      'Which revision of this sentence is most concise without losing its meaning? In my personal opinion, I think that the final ending of the story was very unexpected and surprising.',
      'A: In my opinion, I think the final ending was very unexpected and surprising. B: The ending of the story, in my personal opinion, was unexpected. C: I personally think that the ending was surprising and unexpected. D: I think the ending of the story was surprising.',
    ],
  },
  ask: [
    ['The sentence says things **twice**', 'The sentence says several things twice.'],
    ['Which revision is **shortest**, with the **same meaning**?', 'We need the shortest revision that keeps the same meaning.'],
  ],
  know: {
    title: 'Cutting wordiness',
    md: '**Wordiness** uses more words than the meaning needs. **Redundancy** says the same thing twice: *personal opinion* (all opinions are personal), *final ending* (all endings are final), *unexpected and surprising* (one is enough). Also cut **empty** words (*very*, *really*, *that*) and choose **precise**, vivid words: *bolted* rather than *went quickly*.',
    say: [
      'Here is the idea we need. Wordiness uses more words than the meaning needs. Redundancy says the same thing twice: a personal opinion, since all opinions are personal; a final ending, since all endings are final; and unexpected and surprising, when one word is enough.',
      'Also cut empty words like very and really, and choose precise, vivid words, such as bolted rather than went quickly.',
    ],
  },
  plan: [
    ['Find every **redundancy**', 'Here is the plan. First, find every redundancy.'],
    ['Cut it to the **core** sentence', 'Second, cut the sentence to its core.'],
    ['Match a **choice**', 'Third, match a choice.'],
  ],
  steps: [
    scene('Step 1: The redundancies', [quote('p', ['In my [[bad:personal]] opinion, [[bad:I think that]] the [[bad:final]] ending of the story was [[bad:very]] unexpected [[bad:and surprising]].']), table('t', ['Wordy', 'Why', 'Keep'], [['*In my personal opinion, I think*', 'says **opinion** three times', '*I think*'], ['*final ending*', 'endings are **always** final', '*ending*'], ['*very unexpected and surprising*', '**two** words, one meaning', '*surprising*']])], [
      { say: 'Step one. Pause and look for words that repeat an idea.', show: 'p', wait: 3 },
      { say: 'In my personal opinion, I think: that says opinion three times. I think is enough.', show: 't.0' },
      { say: 'Final ending: every ending is final, so ending is enough.', show: 't.1' },
      { say: 'Very unexpected and surprising: two words with one meaning. Surprising is enough.', show: 't.2' },
    ]),
    scene('Step 2: The core sentence', [text('a', '*I think the ending of the story was surprising.* → **D**', 'lg')], [
      { say: 'Step two. Cut to the core: I think the ending of the story was surprising. That matches D. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Same **meaning**: an opinion about the ending', 'Let us check. The meaning is the same: an opinion that the ending was surprising.'],
    ['From 18 words to **9**', 'And the sentence goes from eighteen words to nine. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Shorter, but keeps *personally* and **both** adjectives', 'Choice C is the trap. It is shorter, but it keeps personally and both surprising and unexpected.'],
      ['A', 'Keeps *opinion* + *I think*, *final ending*', 'Choice A keeps opinion and I think, and final ending.'],
      ['B', 'Keeps *personal opinion*', 'Choice B keeps personal opinion.'],
    ],
  },
  yourTurn: {
    prompt: 'Which verb is the most **precise and vivid**? *The dog ___ across the yard.*',
    choices: ['went', 'moved', 'got', 'bolted'],
    answer: 3,
    working: '*Bolted* shows **speed** and **sudden** movement in one word.',
    ask: 'Which verb is the most precise and vivid? The dog, blank, across the yard. A: went. B: moved. C: got. D: bolted.',
    reveal: 'The answer is D, bolted. In one word it shows that the dog ran suddenly and very fast.',
  },
  sum: [
    ['Cut **redundancy**: say each thing **once**', 'Here is what to remember. Cut redundancy, and say each thing once.'],
    ['Cut **empty** words like *very*', 'Cut empty words like very.'],
    ['Choose **precise**, vivid words', 'And choose precise, vivid words. For more on revising for style, watch this lesson’s explainer video on Gradileo.'],
  ],
});
