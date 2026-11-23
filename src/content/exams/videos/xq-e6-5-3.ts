import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 5.3 (idioms). An exam-style question we wrote, in the style of a Grade 6
// vocabulary test. The answer is B: to "bite off more than you can chew" means to take on more than
// you can manage, and the homework pile is the clue in the sentence.

export default englishExam({
  lesson: 'e6-5-3',
  ...ours('a Grade 6 vocabulary test'),
  title: 'What Does “Bit Off More Than He Could Chew” Mean?',
  thumbnailTitle: 'Idioms',
  subtitle: 'Literal and figurative meaning, step by step',
  summary:
    'An exam-style vocabulary question, solved one small step at a time: Sam sees a huge pile of homework and knows he has bitten off more than he could chew. We tell the literal meaning from the figurative one, use the clues in the sentence, and find what the idiom really means.',
  intro: [
    'In this video, we solve an exam-style question about idioms, the sayings that mean something different from their words. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 vocabulary test.',
  ],
  question: {
    prompt: '*When Sam saw the size of the homework pile, he knew he had **bitten off more than he could chew**.* What does the idiom mean?',
    text: 'When Sam saw the size of the homework pile, he knew he had bitten off more than he could chew. What does the idiom mean?',
    choices: ['He had eaten too much food at lunch.', 'He had taken on more work than he could manage.', 'He was too tired to finish his dinner.', 'He had bitten his pencil while he worked.'],
    answer: 1,
    working: 'The sentence is about **homework**, not food, so the idiom is figurative: Sam took on **more than he can manage**.',
    say: [
      'When Sam saw the size of the homework pile, he knew he had bitten off more than he could chew. What does the idiom mean?',
      'A: He had eaten too much food at lunch. B: He had taken on more work than he could manage. C: He was too tired to finish his dinner. D: He had bitten his pencil while he worked.',
    ],
  },
  ask: [
    ['The words talk about **biting** and **chewing**', 'The words of the idiom talk about biting and chewing.'],
    ['What does the saying **really** mean here?', 'But the question asks what the saying really means in this sentence.'],
  ],
  know: {
    title: 'Idioms',
    md: 'An **idiom** is a saying whose meaning is **different** from its words. The **literal** meaning is what the words say. The **figurative** meaning is what people mean. *Break a leg!* literally means hurt yourself, but figuratively means **good luck**.',
    say: [
      'Here is the idea we need. An idiom is a saying whose meaning is different from the meaning of its words.',
      'The literal meaning is exactly what the words say. The figurative meaning is what people actually mean. For example, break a leg literally means hurt yourself, but people say it to mean good luck.',
    ],
  },
  plan: [
    ['Ask: does the **literal** meaning fit?', 'Here is the plan. First, ask whether the literal meaning fits the sentence.'],
    ['Use the **clues** in the sentence', 'Second, use the clues in the sentence to find the figurative meaning.'],
    ['Test the meaning **in place of** the idiom', 'Third, put that meaning in place of the idiom and see if the sentence still makes sense.'],
  ],
  steps: [
    scene('Step 1: Literal or figurative?', [quote('p', ['When Sam saw the size of the [[theta:homework pile]], he knew he had [[bad:bitten off more than he could chew]].']), text('n', 'Nobody is eating here, so the idiom is **figurative**.')], [
      { say: 'Step one. Pause and ask: is Sam really biting and chewing anything?', show: 'p', wait: 3 },
      { say: 'No. The sentence is about a pile of homework, and nobody is eating. So the literal meaning does not fit. The idiom is figurative.', show: 'n', focus: 'p.0' },
    ]),
    scene('Step 2: The clues', [table('t', ['Clue', 'What it tells us'], [['**the size** of the pile', 'there is a **lot** of work'], ['**he knew**', 'Sam realises something worrying'], ['bite off **more than** you can chew', 'take on **more than you can manage**']])], [
      { say: 'Step two. The size of the pile tells us there is a lot of work.', show: 't.0' },
      { say: 'He knew tells us Sam has realised something worrying.', show: 't.1' },
      { say: 'Picture someone biting off a piece of food too big to chew. That is a picture of taking on more than you can manage.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 3: Test it in place', [quote('s', ['When Sam saw the size of the homework pile, he knew he had [[good:taken on more work than he could manage]].']), text('a', 'It makes sense. The answer is **B**.')], [
      { say: 'Step three. Let us put choice B in place of the idiom. When Sam saw the size of the homework pile, he knew he had taken on more work than he could manage.', show: 's' },
      { say: 'That makes perfect sense. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['B fits the **homework** clue', 'Let us check. Choice B fits the homework clue, and the size of the pile.'],
    ['The other choices are about **food** or **pencils**', 'The other choices take the words about biting and chewing literally. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Takes **bitten** and **chew** literally', 'Choice A is the biggest trap. It takes biting and chewing literally, as if Sam ate too much.'],
      ['C', 'Another **food** meaning, and not in the sentence', 'Choice C is another food meaning, and dinner is not mentioned at all.'],
      ['D', 'A **literal** bite, on a pencil', 'Choice D keeps the literal bite, just on a pencil instead of food.'],
    ],
  },
  yourTurn: {
    prompt: '*It’s **raining cats and dogs**, so take your umbrella.* What does the idiom mean?',
    choices: ['Animals are falling from the sky.', 'It is raining lightly.', 'It is raining very heavily.', 'The pets want to go outside.'],
    answer: 2,
    working: 'The umbrella is the clue: it is raining **very heavily**.',
    ask: 'It is raining cats and dogs, so take your umbrella. What does the idiom mean? A: Animals are falling from the sky. B: It is raining lightly. C: It is raining very heavily. D: The pets want to go outside.',
    reveal: 'The answer is C. Raining cats and dogs means raining very heavily, which is why you need your umbrella. Choice A takes the words literally.',
  },
  sum: [
    ['An **idiom** means something different from its words', 'Here is what to remember. An idiom means something different from its words.'],
    ['If the **literal** meaning does not fit, look for the **figurative** one', 'If the literal meaning does not fit the sentence, look for the figurative one.'],
    ['Use the **clues**, then test the meaning **in place**', 'Use the clues around the idiom, then test your meaning in its place. For more on idioms, watch this lesson’s explainer video on Gradileo.'],
  ],
});
