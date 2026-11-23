import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 6.2 (narrative writing). An exam-style question we wrote, in the style of
// a Grade 5 writing and editing test. The answer is D: shaking hands and a dry mouth show the reader
// that Leo is nervous, without naming the feeling.

export default englishExam({
  lesson: 'e5-6-2',
  ...ours('a Grade 5 writing and editing test'),
  title: 'Which Sentence Best Shows That Leo Is Nervous?',
  thumbnailTitle: 'Show, Don’t Tell',
  subtitle: 'Narrative writing, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a story writer wants to show that Leo is nervous before a concert. We learn the difference between telling and showing, test each sentence, and pick the one that lets the reader see the nerves.',
  intro: [
    'In this video, we solve an exam-style writing question about stories. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 5 writing and editing test.',
  ],
  question: {
    prompt: 'Mia is writing a story about Leo playing the piano in a school concert. She wants to **show** the reader that Leo is nervous, without using the word *nervous*. Which sentence does this best?',
    text: 'Mia is writing a story about Leo playing the piano in a school concert. She wants to show the reader that Leo is nervous, without using the word nervous. Which sentence does this best?',
    choices: ['Leo was very, very worried about the concert.', 'Leo walked onto the stage.', 'Leo felt nervous about playing the piano.', 'Leo’s hands trembled, and his mouth felt as dry as sand.'],
    answer: 3,
    working: 'Trembling hands and a dry mouth are what nerves look and feel like: the reader works out the feeling.',
    say: [
      'Mia is writing a story about Leo playing the piano in a school concert. She wants to show the reader that Leo is nervous, without using the word nervous. Which sentence does this best?',
      'A: Leo was very, very worried about the concert. B: Leo walked onto the stage. C: Leo felt nervous about playing the piano. D: Leo’s hands trembled, and his mouth felt as dry as sand.',
    ],
  },
  ask: [
    ['**Show** the feeling, do not **name** it', 'Mia wants to show the feeling, not name it.'],
    ['Without the word *nervous*', 'And she does not want to use the word nervous at all.'],
  ],
  know: {
    title: 'Show, don’t tell',
    md: '**Telling** names a feeling: *Sam was angry.* **Showing** gives the **actions**, **body** and **words** that let the reader work it out: *Sam slammed the door so hard the windows rattled.*',
    say: [
      'Here is the idea we need. Telling names a feeling, as in Sam was angry.',
      'Showing gives the reader the actions, body language and words that let them work out the feeling for themselves, as in Sam slammed the door so hard the windows rattled. Showing pulls the reader into the story.',
    ],
  },
  plan: [
    ['Sort each sentence: **telling**, **showing**, or **neither**', 'Here is the plan. First, sort each sentence: does it tell a feeling, show a feeling, or neither?'],
    ['Check the **rule**: no word *nervous*', 'Second, check it follows Mia’s rule: no word nervous.'],
  ],
  steps: [
    scene('Step 1: Telling or showing?', [
      table('t', ['Sentence', 'Telling or showing?'], [['A: very, very **worried**', 'telling: names a feeling'], ['B: **walked** onto the stage', 'neither: no feeling at all'], ['C: felt **nervous**', 'telling, and breaks the rule'], ['D: hands **trembled**, mouth **dry as sand**', '[[good:showing]]']]),
    ], [
      { say: 'Step one. Pause and sort the sentences.', wait: 3 },
      { say: 'A says Leo was very, very worried. It names a feeling, so it is telling, even though it avoids the word nervous.', show: 't.0' },
      { say: 'B says Leo walked onto the stage. It tells us what happened, but nothing about how he felt.', show: 't.1' },
      { say: 'C names the feeling, and uses the very word Mia wanted to avoid.', show: 't.2' },
      { say: 'D gives us trembling hands and a mouth as dry as sand. Those are what nerves feel like in the body. The reader works out that Leo is nervous without being told.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The answer', [text('ans', '**D.** Leo’s hands trembled, and his mouth felt as dry as sand.', 'lg'), text('n', 'The simile *as dry as sand* makes the feeling even stronger.')], [
      { say: 'Step two. D shows the feeling and follows the rule. The answer is D.', show: 'ans' },
      { say: 'Notice the simile too: as dry as sand. It helps the reader feel just how dry his mouth is.', show: 'n' },
    ]),
  ],
  check: [
    ['No word *nervous* ✓', 'Let us check. There is no word nervous in D.'],
    ['A reader can **picture** it and **work out** the feeling ✓', 'And a reader can picture it and work out the feeling. Both parts of the task are met.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Swaps the word, but still **tells**', 'Sentence A is the clever trap. It avoids nervous by using worried, but it still names the feeling. Very, very does not turn telling into showing.'],
      ['C', 'Uses the **forbidden** word', 'Sentence C uses the word Mia wanted to avoid.'],
      ['B', 'An action, but it shows **no** feeling', 'Sentence B is an action, but walking shows no feeling at all.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence best **shows** that Grandma is happy to see Zara?',
    choices: ['Grandma was really pleased.', 'Grandma flung her arms wide and laughed as Zara ran up the path.', 'Grandma felt happy that day.', 'Grandma lived at the end of the path.'],
    answer: 1,
    working: 'Flinging her arms wide and laughing show the joy without naming it.',
    ask: 'Which sentence best shows that Grandma is happy to see Zara?',
    reveal: 'The answer is B. Flinging her arms wide and laughing show us that Grandma is happy, without naming the feeling. A and C tell, and D shows nothing.',
  },
  sum: [
    ['**Telling** names a feeling; **showing** lets the reader work it out', 'Here is what to remember. Telling names a feeling. Showing lets the reader work it out.'],
    ['Show with **actions**, **body** and **words**', 'Show feelings through actions, body language and what characters say.'],
    ['Swapping in a **synonym** is still telling', 'And swapping in a synonym, like worried for nervous, is still telling. For more on narrative writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
