import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 1.3 (point of view). An exam-style question we wrote, in the style of a
// Grade 6 reading test, on a passage we wrote. The answer is D: the narrator is outside the story
// ("she", "he") and tells us what both Rosa and Mr Hale secretly think.

const PASSAGE = [
  'Rosa handed in her test and tried to look calm, though she was sure she had failed the last question.',
  'At his desk, Mr Hale glanced at her answer and hid a smile. It was the cleverest solution he had seen all year, and he decided not to tell her until Friday.',
];

export default englishExam({
  lesson: 'e6-1-3',
  ...ours('a Grade 6 reading test', 'the passage is by Gradileo'),
  title: 'From Which Point of View Is the Passage Told?',
  thumbnailTitle: 'Point of View',
  subtitle: 'Who is telling the story? Step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Rosa hands in a test, and Mr Hale reads it. We look at the pronouns the narrator uses and whose thoughts we are told, to tell first person, third person limited and third person omniscient apart.',
  intro: [
    'In this video, we solve an exam-style reading question about point of view. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Rosa handed in her test and tried to look calm, though she was sure she had failed the last question.',
      'At his desk, Mr Hale glanced at her answer and hid a smile. It was the cleverest solution he had seen all year, and he decided not to tell her until Friday.',
    ],
  },
  question: {
    prompt: 'From which point of view is this passage told?',
    text: 'Read the passage about Rosa and Mr Hale. From which point of view is this passage told?',
    choices: ['first person', 'second person', 'third person limited', 'third person omniscient'],
    answer: 3,
    working: 'The narrator says “she” and “he”, and tells us the private thoughts of **both** Rosa and Mr Hale.',
    say: ['From which point of view is this passage told? A: first person. B: second person. C: third person limited. D: third person omniscient.'],
  },
  ask: [
    ['**Who** is telling the story?', 'Point of view is about who is telling the story.'],
    ['And **how much** does the narrator know?', 'And how much the narrator knows about what the characters think.'],
  ],
  know: {
    title: 'Point of view',
    md: '**First person**: a character tells it, using **I** and **we**. **Second person**: **you**. **Third person limited**: an outside narrator (**he**, **she**) who knows **one** character’s thoughts. **Third person omniscient**: an outside narrator who knows **every** character’s thoughts.',
    say: [
      'Here is what we need. In first person, a character tells the story, using I and we. Second person speaks to the reader as you, and is rare in stories.',
      'In third person, the narrator is outside the story and uses he, she and they. A third person limited narrator knows the thoughts of only one character.',
      'A third person omniscient narrator knows everything, including the thoughts of every character. Omniscient means all-knowing.',
    ],
  },
  plan: [
    ['Look at the **pronouns**: I or he and she?', 'Here is the plan. First, look at the pronouns. Is it I, or he and she?'],
    ['Whose **thoughts** are we told?', 'Second, whose thoughts are we told: one character’s, or more than one?'],
  ],
  steps: [
    scene('Step 1: The pronouns', [quote('p', ['Rosa handed in [[theta:her]] test and tried to look calm, though [[theta:she]] was sure [[theta:she]] had failed the last question.', 'At [[theta:his]] desk, Mr Hale glanced at her answer and hid a smile. It was the cleverest solution [[theta:he]] had seen all year, and [[theta:he]] decided not to tell her until Friday.']), text('n', '**she**, **he**, never **I** → third person')], [
      { say: 'Step one. Pause and look at the pronouns.', show: 'p', wait: 3 },
      { say: 'The narrator says her, she, his and he. There is no I. So the narrator is outside the story: this is third person.', show: 'n' },
      { say: 'That rules out first person and second person.' },
    ]),
    scene('Step 2: Whose thoughts?', [table('t', ['Character', 'Private thought we are told'], [['Rosa', 'she was **sure she had failed**'], ['Mr Hale', 'the **cleverest** solution all year; he **decided** not to tell her']]), text('n', '**Two** characters’ thoughts → **omniscient**')], [
      { say: 'Step two. Whose private thoughts are we told? Rosa’s: she is sure she has failed. She does not say this aloud; we are inside her head.', show: 't.0' },
      { say: 'And Mr Hale’s: he thinks it is the cleverest solution all year, and he secretly decides to wait until Friday.', show: 't.1' },
      { say: 'A narrator who knows the thoughts of two characters is all-knowing. So the answer is D, third person omniscient.', show: 'n' },
    ]),
  ],
  check: [
    ['Third person ✓ (*she*, *he*)', 'Let us check. The narrator uses she and he, so it is third person.'],
    ['We know a secret **neither** character knows about the other', 'And we, the readers, know something neither character knows: Rosa thinks she failed, but Mr Hale thinks she was brilliant. Only an all-knowing narrator can show us both.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Read only the **first** sentence', 'Choice C is the trap if you stop after the first sentence, which is only Rosa’s thoughts. The second sentence takes us into Mr Hale’s head too.'],
      ['A', 'Confused a character’s **thoughts** with **I**', 'Choice A: we hear Rosa’s thoughts, but the narrator never says I.'],
      ['B', '**You** never appears', 'Choice B needs the word you, which never appears.'],
    ],
  },
  yourTurn: {
    prompt: '*I pressed my ear to the door. Somewhere inside, a clock was ticking, and I wondered who had wound it.* From which point of view is this told?',
    choices: ['third person limited', 'third person omniscient', 'first person', 'second person'],
    answer: 2,
    working: 'The narrator uses **I**: a character is telling the story.',
    ask: 'I pressed my ear to the door. Somewhere inside, a clock was ticking, and I wondered who had wound it. From which point of view is this told?',
    reveal: 'The answer is C, first person. The narrator uses I, so a character inside the story is telling it.',
  },
  sum: [
    ['**I** → first person · **he/she** → third person', 'Here is what to remember. A narrator who says I is first person. One who says he and she is third person.'],
    ['Third person **limited**: one character’s thoughts', 'Third person limited knows one character’s thoughts.'],
    ['Third person **omniscient**: every character’s thoughts', 'Third person omniscient knows every character’s thoughts, so read the whole passage before you decide. For more on point of view, watch this lesson’s explainer video on Gradileo.'],
  ],
});
