import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 7.2 (the personal essay). An exam-style writing question we wrote, in the
// style of a Grade 9 writing test, on a short personal essay extract of our own. The answer is A: the
// last sentence steps back from the event to reflect on what it meant.

const ESSAY = ['The night before the final, my grandmother handed me her old violin case. Inside, under the velvet, was a folded note in her neat handwriting: *Play for the joy, not the judges.* I lost the competition the next day. But I have never again walked on stage afraid, because I finally understood that the music was mine, not theirs.'];

export default englishExam({
  lesson: 'e9-7-2',
  ...ours('a Grade 9 writing test', 'the essay extract is our own'),
  title: 'Which Sentence Is the Reflection?',
  thumbnailTitle: 'Reflection in a Personal Essay',
  subtitle: 'Moment and meaning, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time, on a short personal essay about a grandmother’s note in a violin case. We separate what happened from what it meant, and find the sentence that reflects.',
  intro: [
    'In this video, we solve an exam-style question about the personal essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 writing test, and the essay extract is our own.',
  ],
  passage: {
    lines: ESSAY,
    by: 'An extract from a personal essay (our own)',
    say: ['First, read the extract from a personal essay. The night before the final, my grandmother handed me her old violin case. Inside, under the velvet, was a folded note in her neat handwriting: Play for the joy, not the judges. I lost the competition the next day. But I have never again walked on stage afraid, because I finally understood that the music was mine, not theirs.'],
  },
  question: {
    prompt: 'Which sentence **reflects** on what the experience meant to the writer?',
    text: 'Read the extract from a personal essay. Which sentence reflects on what the experience meant to the writer?',
    choices: [
      'But I have never again walked on stage afraid, because I finally understood that the music was mine, not theirs.',
      'The night before the final, my grandmother handed me her old violin case.',
      'Inside, under the velvet, was a folded note in her neat handwriting.',
      'I lost the competition the next day.',
    ],
    answer: 0,
    working: '**Reflection** steps back from events to say what they **meant**: *I finally understood…*',
    say: [
      'Which sentence reflects on what the experience meant to the writer?',
      'A: But I have never again walked on stage afraid, because I finally understood that the music was mine, not theirs. B: The night before the final, my grandmother handed me her old violin case. C: Inside, under the velvet, was a folded note in her neat handwriting. D: I lost the competition the next day.',
    ],
  },
  ask: [
    ['A personal essay has **events** and **reflection**', 'A personal essay has events, and reflection on them.'],
    ['Which sentence **reflects**?', 'We need the sentence that reflects.'],
  ],
  know: {
    title: 'The personal essay',
    md: 'A strong personal essay focuses on **one specific moment**, told with **sensory detail** (*the velvet*, *neat handwriting*). It then **reflects**: it steps back to explain what the moment **meant** and how the writer **changed**. Reflection often uses words like *understood*, *realised*, *since then*, *now I know*.',
    say: [
      'Here is the idea we need. A strong personal essay focuses on one specific moment, told with sensory detail, like the velvet and the neat handwriting.',
      'Then it reflects. It steps back to explain what the moment meant and how the writer changed. Reflection often uses words like understood, realised, since then, or now I know.',
    ],
  },
  plan: [
    ['Sort each sentence: **event** or **meaning**?', 'Here is the plan. First, sort each sentence into event or meaning.'],
    ['Find the **reflection** words', 'Second, find the reflection words.'],
  ],
  steps: [
    scene('Step 1: Event or meaning?', [table('t', ['Sentence', 'Type'], [['*my grandmother handed me her old violin case*', 'event'], ['*a folded note in her neat handwriting*', 'event (detail)'], ['*I lost the competition the next day*', 'event'], ['*I finally **understood** that the music was mine*', '[[good:meaning: reflection]]']])], [
      { say: 'Step one. Sort each sentence. The grandmother handing over the violin case is an event.', show: 't.0' },
      { say: 'The folded note is a detail of that event. Losing the competition is another event.', show: ['t.1', 't.2'] },
      { say: 'But I finally understood that the music was mine tells us what it all meant. That is reflection.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The reflection words', [quote('p', ['But I have [[good:never again]] walked on stage afraid, because I [[good:finally understood]] that the music was mine, not theirs.']), text('a', 'Steps back to say how the writer **changed** → **A**', 'lg')], [
      { say: 'Step two. Never again and finally understood step back from the events, to show how the writer changed. The answer is A.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['The writer **lost**, yet the lesson **lasted**', 'Let us check. The writer lost the competition, yet the lesson lasted.'],
    ['Only A explains **why it matters**', 'Only A explains why the moment matters. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'An important **event**, but no **meaning** yet', 'Choice D is the trap. Losing is an important event, but it does not say what it meant.'],
      ['B', 'Sets the **scene**', 'Choice B sets the scene.'],
      ['C', 'A sensory **detail**', 'Choice C is a sensory detail.'],
    ],
  },
  yourTurn: {
    prompt: 'Which topic would make the **strongest** personal essay?',
    choices: [
      'Everything that happened in my whole life',
      'The afternoon I got lost in a market and a stranger helped me',
      'All the sports I have ever played',
      'Every holiday my family has taken',
    ],
    answer: 1,
    working: 'One **specific moment** that can be told in **detail** and **reflected** on.',
    ask: 'Which topic would make the strongest personal essay? A: Everything that happened in my whole life. B: The afternoon I got lost in a market and a stranger helped me. C: All the sports I have ever played. D: Every holiday my family has taken.',
    reveal: 'The answer is B. It is one specific moment, so it can be told in detail, and then reflected on.',
  },
  sum: [
    ['Focus on **one specific moment**', 'Here is what to remember. Focus on one specific moment.'],
    ['Tell it with **sensory detail**', 'Tell it with sensory detail.'],
    ['Then **reflect**: what did it **mean**?', 'Then reflect on what it meant. For more on the personal essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
