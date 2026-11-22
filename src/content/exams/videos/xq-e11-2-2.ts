import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 2.2 (the sonnet). An exam-style question we wrote, in the style of a Grade 11
// reading test, on John Milton's sonnet "When I consider how my light is spent" (1673), which is in the
// public domain. The answer is B: at "But Patience…" the poem turns from the speaker's anxious question
// to Patience's calming answer.

const POEM = ['“Doth God exact day-labour, light denied?”<br>I fondly ask. But Patience, to prevent<br>That murmur, soon replies: “God doth not need<br>Either man’s work or his own gifts; who best<br>Bear his mild yoke, they serve him best…'];

export default englishExam({
  lesson: 'e11-2-2',
  ...ours('a Grade 11 reading test', 'the poem is John Milton’s sonnet “When I consider how my light is spent” (1673), in the public domain'),
  title: 'Where Does Milton’s Sonnet Turn?',
  thumbnailTitle: 'The Petrarchan Volta',
  subtitle: 'The sonnet and its turn, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on John Milton’s sonnet about his blindness. We find the octave’s anxious question, the word that turns the poem, and the calm answer of the sestet.',
  intro: [
    'In this video, we solve an exam-style poetry question about the sonnet’s turn. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Milton’s sonnet, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'John Milton, “When I consider how my light is spent” (1673), lines 7 to 11',
    say: ['First, the context. Milton has gone blind, and fears he can no longer use his gift for writing to serve God. Then he asks: Doth God exact day-labour, light denied? I fondly ask. But Patience, to prevent that murmur, soon replies: God doth not need either man’s work or his own gifts; who best bear his mild yoke, they serve him best.'],
  },
  question: {
    prompt: 'What happens at the words *“But Patience, to prevent / That murmur, soon replies”*?',
    text: 'Read the lines from Milton’s sonnet. What happens at the words “But Patience, to prevent that murmur, soon replies”?',
    choices: [
      'The speaker gives up his faith.',
      'The poem turns from the speaker’s anxious complaint to Patience’s calming answer.',
      'The rhyme scheme stops completely.',
      'The speaker describes how he lost his sight.',
    ],
    answer: 1,
    working: '**But** marks the **volta**: from the speaker’s **question** (octave) to the **answer** (sestet).',
    say: [
      'What happens at the words: But Patience, to prevent that murmur, soon replies?',
      'A: The speaker gives up his faith. B: The poem turns from the speaker’s anxious complaint to Patience’s calming answer. C: The rhyme scheme stops completely. D: The speaker describes how he lost his sight.',
    ],
  },
  ask: [
    ['A sonnet has a **turn**: the **volta**', 'A sonnet has a turn, called the volta.'],
    ['What changes at **“But Patience”**?', 'We need what changes at the words, but Patience.'],
  ],
  know: {
    title: 'The two sonnet forms',
    md: '**Petrarchan** (Italian) sonnet: an **octave** (8 lines, ABBAABBA) poses a **problem** or question; a **sestet** (6 lines) gives a **response**. The **volta** comes around **line 9**. **Shakespearean** sonnet: three **quatrains** and a **couplet** (ABAB CDCD EFEF GG), with the turn often at the **couplet**. Both use **iambic pentameter**, sometimes **varied** for emphasis (a stressed syllable first: a **trochee**).',
    say: [
      'Here is the idea we need. A Petrarchan, or Italian, sonnet has an octave of eight lines that poses a problem or question, and a sestet of six lines that responds. The volta comes around line nine.',
      'A Shakespearean sonnet has three quatrains and a couplet, with the turn often at the couplet. Both use iambic pentameter, which poets sometimes vary for emphasis, for example by starting a line with a stressed syllable, a trochee.',
    ],
  },
  plan: [
    ['Find the **problem**', 'Here is the plan. First, find the problem.'],
    ['Find the **turning word**', 'Second, find the turning word.'],
    ['Find the **response**', 'Third, find the response.'],
  ],
  steps: [
    scene('Step 1: Problem and turn', [quote('p', ['“Doth God exact day-labour, light denied?”', 'I [[theta:fondly]] ask. [[good:But]] Patience, to prevent', 'That [[theta:murmur]]…']), table('t', ['Words', 'Meaning'], [['*Doth God exact day-labour, light denied?*', 'Does God demand **work** from a man who is **blind**?'], ['*fondly*', '**foolishly**'], ['*murmur*', '**complaint**']])], [
      { say: 'Step one. The problem: Doth God exact day-labour, light denied? Does God demand a full day’s work from a man who cannot see?', show: ['p', 't.0'] },
      { say: 'Fondly here means foolishly, and murmur means complaint. Then comes the turning word: but.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The response', [quote('r', ['“God doth [[good:not need]]', 'Either man’s work or his own gifts; who best', 'Bear his mild yoke, [[good:they serve him best]]…']), text('a', 'From **anxious question** to **calm answer** → **B**', 'lg')], [
      { say: 'Step two. Patience answers: God does not need our work. Those who patiently accept their burden serve him best.', show: 'r' },
      { say: 'So at but, the poem turns from the speaker’s anxious complaint to Patience’s calming answer. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The turn arrives in **line 8**, slightly **early**', 'Let us check. The turn arrives in the middle of line eight, slightly earlier than usual, as if Patience interrupts.'],
    ['The **mood** clearly changes', 'But the mood clearly changes, from worry to calm. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'His faith is **renewed**, not lost', 'Choice A is the trap. A turn means a change, but here his faith is renewed, not lost.'],
      ['C', 'The rhymes **continue**', 'Choice C: the rhymes continue.'],
      ['D', 'His blindness is the **context**, not described here', 'Choice D: his blindness is the context, but these lines do not describe it.'],
    ],
  },
  yourTurn: {
    prompt: 'Which pattern describes a **trochee**?',
    choices: ['da-DUM', 'DUM-da', 'DUM-DUM', 'da-da-DUM'],
    answer: 1,
    working: '**Stressed**, then **unstressed**: DUM-da, the reverse of an iamb.',
    ask: 'Which pattern describes a trochee? A: da-DUM. B: DUM-da. C: DUM-DUM. D: da-da-DUM.',
    reveal: 'The answer is B, DUM-da. A trochee is the reverse of an iamb: stressed, then unstressed.',
  },
  sum: [
    ['**Petrarchan**: octave + sestet, turn near **line 9**', 'Here is what to remember. A Petrarchan sonnet has an octave and a sestet, turning near line nine.'],
    ['**Shakespearean**: turn at the **couplet**', 'A Shakespearean sonnet often turns at the couplet.'],
    ['Look for turning words: *but*, *yet*', 'And look for turning words, like but and yet. For more on the sonnet, watch this lesson’s explainer video on Gradileo.'],
  ],
});
