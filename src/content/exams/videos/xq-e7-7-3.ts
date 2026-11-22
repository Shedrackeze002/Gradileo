import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 7.3 (narrative craft). An exam-style question we wrote, in the style of a
// Grade 7 writing test. The answer is B: it shows the nerves through the body and actions, instead of
// naming the feeling.

export default englishExam({
  lesson: 'e7-7-3',
  ...ours('a Grade 7 writing test'),
  title: 'Which Sentence Shows Rather Than Tells?',
  thumbnailTitle: 'Show, Don’t Tell',
  subtitle: 'Showing feelings in a story, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: four sentences describe Kofi waiting to give a speech, and only one shows his nerves instead of naming them. We learn the difference between showing and telling, test each sentence, and explain why showing works.',
  intro: [
    'In this video, we solve an exam-style writing question about showing rather than telling. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 writing test.',
  ],
  question: {
    prompt: 'Which sentence best **shows**, rather than tells, that Kofi is **nervous** before his speech?',
    text: 'Which sentence best shows, rather than tells, that Kofi is nervous before his speech?',
    choices: [
      'Kofi was very nervous.',
      'Kofi’s notes trembled in his damp hands, and he read the first line for the tenth time.',
      'Kofi felt nervousness before the speech.',
      'Kofi was nervous because he had a speech.',
    ],
    answer: 1,
    working: 'B shows nerves through **trembling**, **damp hands** and **re-reading**; the others just **name** the feeling.',
    say: [
      'Which sentence best shows, rather than tells, that Kofi is nervous before his speech?',
      'A: Kofi was very nervous. B: Kofi’s notes trembled in his damp hands, and he read the first line for the tenth time. C: Kofi felt nervousness before the speech. D: Kofi was nervous because he had a speech.',
    ],
  },
  ask: [
    ['All four tell us Kofi is **nervous**', 'All four sentences are about Kofi being nervous.'],
    ['Which one **shows** it?', 'We need the one that shows it, instead of telling us.'],
  ],
  know: {
    title: 'Showing and telling',
    md: '**Telling** names a feeling: *she was angry*. **Showing** lets the reader **see** it through **actions**, **body language**, **speech** and **senses**: *she slammed the door*. Showing pulls readers **into** the scene. Writers also control **pace**: slowing down for key moments with detail, and speeding up with summary.',
    say: [
      'Here is the idea we need. Telling names a feeling, as in she was angry. Showing lets the reader see it through actions, body language, speech and the senses, as in she slammed the door.',
      'Showing pulls readers into the scene. Writers also control pace: they slow down key moments with detail, and speed up less important parts with summary.',
    ],
  },
  plan: [
    ['Does the sentence **name** the feeling?', 'Here is the plan. First, does the sentence name the feeling?'],
    ['Or can we **see** it in actions and details?', 'Second, or can we see it through actions and details?'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Sentence', 'Names the feeling?', 'Shows it?'], [['A: was very nervous', '[[bad:✓ “nervous”]]', '[[bad:✗]]'], ['B: notes trembled… tenth time', '[[good:✗ never says it]]', '[[good:✓ trembling, damp, re-reading]]'], ['C: felt nervousness', '[[bad:✓ “nervousness”]]', '[[bad:✗]]'], ['D: nervous because…', '[[bad:✓ “nervous”]]', '[[bad:✗ explains, does not show]]']])], [
      { say: 'Step one. A, C and D all use the word nervous, or nervousness. They tell us the feeling.', show: ['t.0', 't.2', 't.3'] },
      { say: 'B never says nervous. Instead, we see his notes trembling, his damp hands, and him reading the first line for the tenth time. We work out the feeling ourselves.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: The answer', [text('a', '**B** shows the nerves through **actions** and **body**', 'lg')], [{ say: 'Step two. B shows rather than tells. The answer is B.', show: 'a' }]),
  ],
  check: [
    ['Picture B: we **see** Kofi', 'Let us check. Picture each sentence. With B, we can actually see Kofi.'],
    ['With A, C and D, we only **hear** a label', 'With A, C and D, we only hear a label. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Gives a **reason**, but still **tells**', 'Choice D is the trap. Adding a reason makes it longer, but it still tells.'],
      ['A', '**very** makes it stronger, not shown', 'Choice A: very makes the feeling stronger, but still only tells.'],
      ['C', 'A **noun** instead of an adjective: still telling', 'Choice C just turns the feeling into a noun.'],
    ],
  },
  yourTurn: {
    prompt: 'A writer wants to **slow down** the moment a goalkeeper faces a penalty. Which sentence does this best?',
    choices: ['The goalkeeper saved the penalty.', 'The game ended soon after.', 'The goalkeeper watched the striker’s eyes, felt the cold air in his chest, and waited for the first twitch of a foot.', 'Then they went home.'],
    answer: 2,
    working: 'C fills a **split second** with **sense details**, which slows the pace.',
    ask: 'A writer wants to slow down the moment a goalkeeper faces a penalty. Which sentence does this best? A: The goalkeeper saved the penalty. B: The game ended soon after. C: The goalkeeper watched the striker’s eyes, felt the cold air in his chest, and waited for the first twitch of a foot. D: Then they went home.',
    reveal: 'The answer is C. It fills a split second with sight and touch details, which slows the moment down and builds tension. A sums it up in a few words.',
  },
  sum: [
    ['**Telling** names a feeling; **showing** lets us **see** it', 'Here is what to remember. Telling names a feeling, and showing lets us see it.'],
    ['Show through **actions**, **body**, **speech** and **senses**', 'Show it through actions, body language, speech and the senses.'],
    ['Use **detail** to slow key moments; **summary** to speed up', 'Use detail to slow down key moments, and summary to speed up. For more on narrative craft, watch this lesson’s explainer video on Gradileo.'],
  ],
});
