import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 5.2 (connotation). An exam-style question we wrote, in the style of a
// Grade 6 vocabulary test. The answer is D: "scrawny" means thin with a negative feeling, so it
// would make the reader feel sorry for, or look down on, the dog.

export default englishExam({
  lesson: 'e6-5-2',
  ...ours('a Grade 6 vocabulary test'),
  title: 'Which Word Gives the Most Negative Feeling?',
  thumbnailTitle: 'Connotation',
  subtitle: 'The feelings words carry, step by step',
  summary:
    'An exam-style vocabulary question, solved one small step at a time: slim, slender, thin and scrawny all mean much the same thing, but which one carries the most negative feeling? We separate what a word means from what it suggests, and place the four words on a scale.',
  intro: [
    'In this video, we solve an exam-style question about connotation, the feelings that words carry. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 vocabulary test.',
  ],
  question: {
    prompt: 'A writer is describing a dog. *The ______ dog waited by the gate.* Which word gives the most **negative** feeling?',
    text: 'A writer is describing a dog. “The ______ dog waited by the gate.” Which word gives the most negative feeling?',
    choices: ['slim', 'slender', 'thin', 'scrawny'],
    answer: 3,
    working: 'All four mean “not fat”, but **scrawny** suggests unhealthy and uncared for.',
    say: ['A writer is describing a dog. The blank dog waited by the gate. Which word gives the most negative feeling? A: slim. B: slender. C: thin. D: scrawny.'],
  },
  ask: [
    ['All four words mean **not fat**', 'All four words mean roughly the same thing: not fat.'],
    ['Which carries the most **negative** feeling?', 'But the question asks which one carries the most negative feeling.'],
  ],
  know: {
    title: 'Denotation and connotation',
    md: 'A word’s **denotation** is its dictionary **meaning**. Its **connotation** is the **feeling** it carries: **positive**, **neutral** or **negative**. *Thrifty* and *stingy* both mean careful with money, but *thrifty* sounds good and *stingy* sounds bad.',
    say: [
      'Here is the idea we need. A word’s denotation is its dictionary meaning. Its connotation is the feeling it carries, which can be positive, neutral or negative.',
      'For example, thrifty and stingy both mean careful with money. But thrifty sounds like a good habit, and stingy sounds mean.',
    ],
  },
  plan: [
    ['Picture the dog with **each** word', 'Here is the plan. First, picture the dog with each word.'],
    ['Place each word on a scale from **positive** to **negative**', 'Second, place each word on a scale from positive to negative.'],
  ],
  steps: [
    scene('Step 1: Picture each dog', [table('t', ['Word', 'What we picture', 'Feeling'], [['slim', 'fit and healthy', 'positive'], ['slender', 'graceful, elegant', 'positive'], ['thin', 'not much fat', 'neutral'], ['scrawny', 'bony, weak, **uncared for**', '[[bad:negative]]']])], [
      { say: 'Step one. Pause and picture the dog with each word.', wait: 3 },
      { say: 'A slim dog sounds fit and healthy. Positive.', show: 't.0' },
      { say: 'A slender dog sounds graceful, like a greyhound. Positive too.', show: 't.1' },
      { say: 'A thin dog just tells us it is not fat. That is close to neutral.', show: 't.2' },
      { say: 'A scrawny dog sounds bony, weak, perhaps hungry and uncared for. That is negative.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The scale', [text('s', 'slender · slim → thin → **scrawny**', 'xl'), text('n', 'positive → neutral → **negative** · The answer is **D, scrawny**.')], [
      { say: 'Step two. On a scale, slender and slim are at the positive end, thin is in the middle, and scrawny is at the negative end.', show: 's' },
      { say: 'So scrawny gives the most negative feeling. The answer is D.', show: 'n' },
    ]),
  ],
  check: [
    ['Swap test: *What a **slim** dog!* sounds like a **compliment**', 'Let us check with a swap. What a slim dog! sounds like a compliment.'],
    ['*What a **scrawny** dog!* sounds like **pity** or an insult', 'What a scrawny dog! sounds like pity, or even an insult. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Thin is plain and **neutral**, not the **most** negative', 'Choice C is the trap. Thin feels a little less kind than slim, but it is mostly neutral. Scrawny is much stronger.'],
      ['A', 'Sounds **healthy**: positive', 'Choice A, slim, sounds healthy.'],
      ['B', 'Sounds **graceful**: positive', 'Choice B, slender, sounds graceful.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word gives the most **positive** feeling? *My neighbour is very ______.*',
    choices: ['nosy', 'curious', 'interested', 'snoopy'],
    answer: 1,
    working: '**Curious** suggests a lively, healthy interest; *nosy* and *snoopy* are negative.',
    ask: 'Which word gives the most positive feeling? My neighbour is very blank. A: nosy. B: curious. C: interested. D: snoopy.',
    reveal: 'The answer is B, curious. It suggests a lively, healthy interest. Interested is fairly neutral, and nosy and snoopy suggest poking into other people’s business.',
  },
  sum: [
    ['**Denotation** = meaning · **connotation** = feeling', 'Here is what to remember. Denotation is a word’s meaning, and connotation is the feeling it carries.'],
    ['Picture the sentence with **each** word', 'To compare connotations, picture the sentence with each word.'],
    ['Place the words on a scale: **positive**, **neutral**, **negative**', 'Then place them on a scale from positive to negative. For more on connotation, watch this lesson’s explainer video on Gradileo.'],
  ],
});
