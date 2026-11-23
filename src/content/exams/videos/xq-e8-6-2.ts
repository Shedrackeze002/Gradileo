import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 6.2 (misplaced and dangling modifiers). An exam-style question we wrote, in
// the style of a Grade 8 grammar test. The answer is C: the opening phrase "Walking to school" must be
// followed by the person who was walking.

export default englishExam({
  lesson: 'e8-6-2',
  ...ours('a Grade 8 grammar test'),
  title: 'Which Sentence Fixes the Dangling Modifier?',
  thumbnailTitle: 'Dangling Modifiers',
  subtitle: 'Misplaced and dangling modifiers, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “Walking to school, the rain soaked my backpack” makes it sound as if the rain was walking. We learn what a dangling modifier is, find who was really walking, and choose the sentence that puts them right after the phrase.',
  intro: [
    'In this video, we solve an exam-style grammar question about dangling modifiers. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 grammar test.',
  ],
  question: {
    prompt: 'Which revision **fixes** the dangling modifier in *“Walking to school, the rain soaked my backpack.”*?',
    text: 'Which revision fixes the dangling modifier in “Walking to school, the rain soaked my backpack.”?',
    choices: [
      'Walking to school, my backpack was soaked by the rain.',
      'The rain soaked my backpack, walking to school.',
      'Walking to school, I got my backpack soaked by the rain.',
      'Walking to school, the rain was soaking.',
    ],
    answer: 2,
    working: 'The person **walking** (*I*) must come **straight after** the opening phrase.',
    say: [
      'Which revision fixes the dangling modifier in: walking to school, the rain soaked my backpack?',
      'A: Walking to school, my backpack was soaked by the rain. B: The rain soaked my backpack, walking to school. C: Walking to school, I got my backpack soaked by the rain. D: Walking to school, the rain was soaking.',
    ],
  },
  ask: [
    ['The sentence says the **rain** was walking', 'As written, the sentence says the rain was walking to school.'],
    ['Which revision **fixes** it?', 'We need the revision that fixes that.'],
  ],
  know: {
    title: 'Misplaced and dangling modifiers',
    md: 'A **modifier** describes something. An opening phrase like *Walking to school* describes **whatever comes right after the comma**. If the right word is **missing**, the modifier **dangles**. If it is in the **wrong place**, it is **misplaced** (*I saw a dog **with binoculars***). Fix it by putting the **doer** right after the phrase.',
    say: [
      'Here is the idea we need. A modifier is a word or phrase that describes something. An opening phrase like walking to school describes whatever comes right after the comma.',
      'If the right word is missing, the modifier dangles. If it is in the wrong place, it is misplaced, as in I saw a dog with binoculars. We fix it by putting the doer right after the phrase.',
    ],
  },
  plan: [
    ['Who was **really** walking?', 'Here is the plan. First, who was really walking?'],
    ['Which revision puts **that person** right after the comma?', 'Second, which revision puts that person right after the comma?'],
  ],
  steps: [
    scene('Step 1: Who was walking?', [quote('p', ['[[theta:Walking to school]], [[bad:the rain]] soaked my backpack.']), text('n', 'The rain cannot walk. The walker was **I**, the writer.')], [
      { say: 'Step one. Whatever comes after the comma is the one walking. Here that is the rain, which is silly.', show: 'p' },
      { say: 'The person who was really walking is the writer: I.', show: 'n' },
    ]),
    scene('Step 2: Test each revision', [table('t', ['Revision', 'Right after the comma', 'Fixed?'], [['A', '**my backpack**', '[[bad:✗ backpacks do not walk]]'], ['B', 'phrase moved to the **end**, after *backpack*', '[[bad:✗ still the backpack or rain]]'], ['C', '**I**', '[[good:✓ I was walking]]'], ['D', '**the rain**', '[[bad:✗ the rain again]]']])], [
      { say: 'Step two. A puts my backpack after the comma, so now the backpack is walking. Still wrong.', show: 't.0' },
      { say: 'B moves the phrase to the end, but it still seems to describe the backpack or the rain.', show: 't.1' },
      { say: 'D keeps the rain walking.', show: 't.3' },
      { say: 'C puts I right after the comma. I was walking to school. The answer is C.', show: 't.2', focus: 't.2' },
    ]),
  ],
  check: [
    ['Ask: **who** is walking to school?', 'Let us check. Read C and ask who is walking to school. The answer is I.'],
    ['That makes **sense**', 'That makes sense. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Swaps rain for **backpack**: still not the walker', 'Choice A is the trap. It sounds smoother, but now the backpack is walking.'],
      ['B', 'Moving the phrase does not add the **walker**', 'Choice B moves the phrase, but never adds the person who was walking.'],
      ['D', 'The **rain** still walks', 'Choice D: the rain is still walking.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence has a **misplaced** modifier?',
    choices: ['I almost ate the whole pizza.', 'She served cake to the children on paper plates.', 'Tired after the match, Leo fell asleep.', 'The dog with the red collar barked.'],
    answer: 1,
    working: '*on paper plates* seems to describe the **children**, not the cake.',
    ask: 'Which sentence has a misplaced modifier? A: I almost ate the whole pizza. B: She served cake to the children on paper plates. C: Tired after the match, Leo fell asleep. D: The dog with the red collar barked.',
    reveal: 'The answer is B. On paper plates sits next to the children, so it sounds as if the children were on the plates. Better: she served cake on paper plates to the children.',
  },
  sum: [
    ['An opening phrase describes what comes **right after** the comma', 'Here is what to remember. An opening phrase describes whatever comes right after the comma.'],
    ['**Dangling**: the right word is missing · **misplaced**: it is in the wrong spot', 'A modifier dangles when the right word is missing, and is misplaced when it is in the wrong spot.'],
    ['Fix it by putting the **doer** next to the modifier', 'Fix it by putting the doer next to the modifier. For more on misplaced and dangling modifiers, watch this lesson’s explainer video on Gradileo.'],
  ],
});
