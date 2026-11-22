import { englishExam, ours, scene, table } from '../english.ts';

// Grade 8 English, lesson 6.3 (parallel structure). An exam-style question we wrote, in the style of a
// Grade 8 grammar test. The answer is A: every item in the list is a verb ending in -ing.

export default englishExam({
  lesson: 'e8-6-3',
  ...ours('a Grade 8 grammar test'),
  title: 'Which Sentence Uses Parallel Structure?',
  thumbnailTitle: 'Parallel Structure',
  subtitle: 'Matching the items in a list, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: four versions of a sentence listing things Lena enjoys, and only one keeps the list parallel. We learn what parallel structure means, check the form of every item, and pick the list that matches.',
  intro: [
    'In this video, we solve an exam-style grammar question about parallel structure. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 grammar test.',
  ],
  question: {
    prompt: 'Which sentence uses **parallel structure** correctly?',
    text: 'Which sentence uses parallel structure correctly?',
    choices: [
      'Lena enjoys hiking, swimming and painting.',
      'Lena enjoys hiking, to swim and painting.',
      'Lena enjoys to hike, swimming and she paints.',
      'Lena enjoys hiking, swims and to paint.',
    ],
    answer: 0,
    working: '*hiking*, *swimming*, *painting*: every item has the **same form** (-ing).',
    say: [
      'Which sentence uses parallel structure correctly?',
      'A: Lena enjoys hiking, swimming and painting. B: Lena enjoys hiking, to swim and painting. C: Lena enjoys to hike, swimming and she paints. D: Lena enjoys hiking, swims and to paint.',
    ],
  },
  ask: [
    ['Each sentence lists **three** activities', 'Each sentence lists three activities.'],
    ['Which list is **parallel**?', 'We need the list where every item matches.'],
  ],
  know: {
    title: 'Parallel structure',
    md: '**Parallel structure** means items in a **list** or **comparison** have the **same grammatical form**: all *-ing* words (*hiking, swimming*), all *to* verbs (*to hike, to swim*), or all clauses. Mixing forms makes a sentence **clumsy**.',
    say: [
      'Here is the idea we need. Parallel structure means the items in a list or comparison have the same grammatical form.',
      'They might all be i n g words, like hiking and swimming, or all to verbs, like to hike and to swim, or all clauses. Mixing the forms makes a sentence clumsy.',
    ],
  },
  plan: [
    ['Write down the **form** of each item', 'Here is the plan. First, write down the form of each item.'],
    ['Find the list where they **all match**', 'Second, find the list where they all match.'],
  ],
  steps: [
    scene('Step 1: The form of each item', [table('t', ['Sentence', 'Item 1', 'Item 2', 'Item 3', 'Parallel?'], [['A', 'hiking', 'swimming', 'painting', '[[good:✓ all -ing]]'], ['B', 'hiking', '[[bad:to swim]]', 'painting', '[[bad:✗]]'], ['C', '[[bad:to hike]]', 'swimming', '[[bad:she paints]]', '[[bad:✗]]'], ['D', 'hiking', '[[bad:swims]]', '[[bad:to paint]]', '[[bad:✗]]']])], [
      { say: 'Step one. In A, every item ends in i n g: hiking, swimming, painting. They all match.', show: 't.0', focus: 't.0' },
      { say: 'B has to swim in the middle.', show: 't.1' },
      { say: 'C mixes to hike, swimming and a whole clause, she paints.', show: 't.2' },
      { say: 'D mixes hiking, swims and to paint. The answer is A.', show: 't.3' },
    ]),
  ],
  check: [
    ['Read A aloud: it has a smooth **rhythm**', 'Let us check. Read A aloud. It has a smooth, even rhythm.'],
    ['The others **stumble**', 'The others stumble where the form changes. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '**Two** items match; one does not', 'Choice B is the trap. Two items match, so it looks nearly right, but to swim breaks the pattern.'],
      ['C', 'Three **different** forms', 'Choice C uses three different forms.'],
      ['D', 'Three **different** forms', 'Choice D does too.'],
    ],
  },
  yourTurn: {
    prompt: 'Which revision makes the comparison **parallel**? *I would rather read a book than watching a film.*',
    choices: ['I would rather reading a book than watching a film.', 'I would rather read a book than to watching a film.', 'I would rather read a book than watch a film.', 'I would rather a book than watching a film.'],
    answer: 2,
    working: '*read* and *watch*: both plain verbs after *would rather… than*.',
    ask: 'I would rather read a book than watching a film. Which revision makes the comparison parallel? A: I would rather reading a book than watching a film. B: I would rather read a book than to watching a film. C: I would rather read a book than watch a film. D: I would rather a book than watching a film.',
    reveal: 'The answer is C. Read and watch are both plain verbs, so the two sides of the comparison match.',
  },
  sum: [
    ['Items in a list or comparison need the **same form**', 'Here is what to remember. Items in a list or comparison need the same form.'],
    ['Check each item: *-ing*, *to* verb, or clause?', 'Check each item: is it an i n g word, a to verb, or a clause?'],
    ['Change the odd one out to **match**', 'Then change the odd one out to match. For more on parallel structure, watch this lesson’s explainer video on Gradileo.'],
  ],
});
