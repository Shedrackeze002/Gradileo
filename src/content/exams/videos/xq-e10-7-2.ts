import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 7.2 (punctuation). An exam-style grammar question we wrote, in the style of a
// Grade 10 language test. The answer is B: "students'" is a plural noun ending in s, so the apostrophe goes
// after the s.

export default englishExam({
  lesson: 'e10-7-2',
  ...ours('a Grade 10 language test'),
  title: 'Which Sentence Uses Apostrophes Correctly?',
  thumbnailTitle: 'Apostrophes',
  subtitle: 'Possession and contractions, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: four sentences, each with an apostrophe. We learn the rules for possession and contractions, test each sentence, and find the one that is correct.',
  intro: [
    'In this video, we solve an exam-style grammar question about apostrophes. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 language test.',
  ],
  question: {
    prompt: 'Which sentence uses **apostrophes** correctly?',
    text: 'Which sentence uses apostrophes correctly?',
    choices: [
      'The dog wagged it’s tail.',
      'The students’ lockers were painted over the summer.',
      'The childrens’ toys were everywhere.',
      'Its’ going to rain later.',
    ],
    answer: 1,
    working: '*students* is plural and ends in **s**, so the apostrophe goes **after** the s: **students’**.',
    say: [
      'Which sentence uses apostrophes correctly?',
      'A: The dog wagged it’s tail, with an apostrophe before the s. B: The students’ lockers were painted over the summer, with an apostrophe after students. C: The childrens’ toys were everywhere, with an apostrophe after childrens. D: Its’ going to rain later, with an apostrophe after its.',
    ],
  },
  ask: [
    ['Apostrophes show **possession** or a **contraction**', 'Apostrophes show possession, or a contraction.'],
    ['Which sentence gets them **right**?', 'We need the sentence that gets them right.'],
  ],
  know: {
    title: 'Apostrophes',
    md: '**Contraction**: the apostrophe replaces missing letters (*it’s* = **it is**). **Possession**: singular noun → **’s** (*the dog’s bowl*); plural ending in **s** → **s’** (*the students’ lockers*); plural **not** ending in s → **’s** (*the children’s toys*). **Its** (no apostrophe) = **belonging to it**, like *his* and *hers*.',
    say: [
      'Here is the idea we need. In a contraction, the apostrophe replaces missing letters: it’s means it is.',
      'For possession, a singular noun takes apostrophe s: the dog’s bowl. A plural ending in s takes s apostrophe: the students’ lockers. A plural that does not end in s takes apostrophe s: the children’s toys. And its, with no apostrophe, means belonging to it, like his and hers.',
    ],
  },
  plan: [
    ['Is each one **possession** or a **contraction**?', 'Here is the plan. First, decide whether each one is possession or a contraction.'],
    ['Apply the **rule**', 'Second, apply the rule.'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Choice', 'Meaning', 'Correct form'], [['A *it’s tail*', '**belonging to it**', '[[bad:its tail]]'], ['B *students’ lockers*', 'lockers of the **students** (plural, ends in s)', '[[good:students’ ✓]]'], ['C *childrens’ toys*', 'toys of the **children** (plural, no s)', '[[bad:children’s]]'], ['D *Its’ going*', '**it is** going', '[[bad:It’s]]']])], [
      { say: 'Step one. In A, the tail belongs to the dog. Belonging to it is its, with no apostrophe. So it’s is wrong.', show: 't.0' },
      { say: 'In C, children is already plural without an s, so it takes apostrophe s: children’s.', show: 't.2' },
      { say: 'In D, the meaning is it is going, so we need it’s. Its apostrophe is not a word.', show: 't.3' },
      { say: 'In B, the lockers belong to many students. Students is plural and ends in s, so the apostrophe goes after the s.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: The answer', [text('a', '*The **students’** lockers…* → **B**', 'lg')], [
      { say: 'Step two. Only B is correct. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Test *it’s*: say **it is**', 'Let us check with a quick test. Whenever you write it’s, say it is. The dog wagged it is tail makes no sense.'],
    ['B is the only correct sentence', 'So A is wrong, and B is the only correct sentence. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Possession usually takes **’s**, but **its** never does', 'Choice A is the trap. Possession usually takes apostrophe s, but its, meaning belonging to it, never does.'],
      ['C', '*children* has no s: **children’s**', 'Choice C: children has no s, so it is children’s.'],
      ['D', '*it is* → **it’s**', 'Choice D: it is becomes it’s.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses **commas** correctly?',
    choices: ['After lunch we, went outside.', 'After lunch, we went outside.', 'After, lunch we went outside.', 'After lunch we went, outside.'],
    answer: 1,
    working: 'A comma goes **after** an introductory phrase: *After lunch,*',
    ask: 'Which sentence uses commas correctly? A: After lunch we, comma, went outside. B: After lunch, comma, we went outside. C: After, comma, lunch we went outside. D: After lunch we went, comma, outside.',
    reveal: 'The answer is B. The comma goes after the introductory phrase, after lunch.',
  },
  sum: [
    ['**it’s** = it is; **its** = belonging to it', 'Here is what to remember. It’s means it is, and its means belonging to it.'],
    ['Plural ending in s → **s’**', 'A plural ending in s takes s apostrophe.'],
    ['Plural without s → **’s**', 'And a plural without an s takes apostrophe s. For more on punctuation, watch this lesson’s explainer video on Gradileo.'],
  ],
});
