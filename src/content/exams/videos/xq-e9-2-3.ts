import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 2.3 (metre and rhythm). An exam-style question we wrote, in the style of a
// Grade 9 reading test, on the opening of Robert Browning's "My Last Duchess" (1842), which is in the
// public domain. The answer is C: "I call / That piece a wonder" runs over the line break, which is
// enjambment.

const POEM = ['That’s my last Duchess painted on the wall,<br>Looking as if she were alive. I call<br>That piece a wonder, now: Fra Pandolf’s hands<br>Worked busily a day, and there she stands.'];

export default englishExam({
  lesson: 'e9-2-3',
  ...ours('a Grade 9 reading test', 'the poem is Robert Browning’s “My Last Duchess” (1842), in the public domain'),
  title: 'What Happens Between “I Call” and “That Piece a Wonder”?',
  thumbnailTitle: 'Enjambment and Caesura',
  subtitle: 'How lines and pauses shape a poem, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the opening of Robert Browning’s “My Last Duchess”. We see where sentences stop and where lines end, tell enjambment from caesura, and explain how they make the Duke sound like he is talking.',
  intro: [
    'In this video, we solve an exam-style poetry question about enjambment and caesura. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Browning’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Robert Browning, “My Last Duchess” (1842), lines 1 to 4',
    say: ['First, read the opening of the poem. A duke is showing a visitor a painting of his late wife. That’s my last Duchess painted on the wall, looking as if she were alive. I call that piece a wonder, now: Fra Pandolf’s hands worked busily a day, and there she stands.'],
  },
  question: {
    prompt: 'The sentence *“I call / That piece a wonder”* runs from line 2 into line 3 **without a pause**. What is this technique called?',
    text: 'Read the opening of “My Last Duchess”. The sentence “I call that piece a wonder” runs from line 2 into line 3 without a pause. What is this technique called?',
    choices: ['caesura', 'a rhyming couplet', 'enjambment', 'a refrain'],
    answer: 2,
    working: 'A sentence that **runs over** the end of a line into the next is **enjambment**.',
    say: ['The sentence, I call that piece a wonder, runs from line two into line three without a pause. What is this technique called? A: caesura. B: a rhyming couplet. C: enjambment. D: a refrain.'],
  },
  ask: [
    ['The sentence **crosses** a line break', 'The sentence crosses a line break.'],
    ['What is that **called**?', 'We need the name for that technique.'],
  ],
  know: {
    title: 'Enjambment, caesura and rhythm',
    md: '**Enjambment**: a sentence **runs on** past the end of a line, with no punctuation there. **Caesura**: a **pause** in the **middle** of a line, usually at a full stop, comma or colon. **End-stopped**: the line ends with punctuation. Together they control the poem’s **rhythm**.',
    say: [
      'Here is the idea we need. Enjambment is when a sentence runs on past the end of a line, with no punctuation there.',
      'A caesura is a pause in the middle of a line, usually at a full stop, comma or colon. A line that ends with punctuation is end-stopped. Together, they control the rhythm of a poem.',
    ],
  },
  plan: [
    ['Look at the **end** of line 2', 'Here is the plan. First, look at the end of line two.'],
    ['Look **inside** line 2', 'Second, look inside line two.'],
    ['Name each technique', 'Third, name each technique.'],
  ],
  steps: [
    scene('Step 1: End and middle of line 2', [quote('p', ['Looking as if she were alive[[theta:.]] I call', 'That piece a wonder, now…']), table('t', ['Where', 'What happens', 'Name'], [['**end** of line 2 (*I call / That piece*)', 'no punctuation; sentence **runs on**', '[[good:enjambment]]'], ['**middle** of line 2 (*alive. I*)', 'a full stop: a **pause**', 'caesura']])], [
      { say: 'Step one. Pause and look at the end of line two. I call, and then there is no punctuation. The sentence carries straight on: that piece a wonder.', show: 'p', wait: 2 },
      { say: 'A sentence running over the line break is enjambment. The answer is C.', show: 't.0', focus: 't.0' },
      { say: 'Notice the full stop in the middle of line two, after alive. That mid-line pause is a caesura.', show: 't.1' },
    ]),
    scene('Step 2: The effect', [text('a', 'Enjambment + caesura → sounds like **natural speech**: the Duke is **talking**', 'lg')], [
      { say: 'Step two. Why does Browning do this? Sentences that stop mid-line and run over line ends sound like natural speech. We hear the Duke talking to his visitor, not reciting a neat poem.', show: 'a' },
    ]),
  ],
  check: [
    ['No punctuation after **call**', 'Let us check. There is no punctuation after call, so the sentence must continue.'],
    ['That is the definition of **enjambment**', 'That is the definition of enjambment. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The **caesura** is after *alive*, not across the line', 'Choice A is the trap. There is a caesura in line two, after alive, but the question asks about the sentence running across the line break.'],
      ['B', 'The lines **rhyme** (wall/call), but that is not the question', 'Choice B: wall and call do rhyme, but that is not what the question asks.'],
      ['D', 'Nothing is **repeated**', 'Choice D: nothing is repeated.'],
    ],
  },
  yourTurn: {
    prompt: 'In *“Looking as if she were alive. I call”*, what is the **full stop after “alive”** an example of?',
    choices: ['enjambment', 'a volta', 'a caesura', 'alliteration'],
    answer: 2,
    working: 'A **pause** in the **middle** of a line: a **caesura**.',
    ask: 'In, looking as if she were alive. I call, what is the full stop after alive an example of? A: enjambment. B: a volta. C: a caesura. D: alliteration.',
    reveal: 'The answer is C, a caesura. It is a pause in the middle of the line.',
  },
  sum: [
    ['**Enjambment**: a sentence runs over the line end', 'Here is what to remember. Enjambment is when a sentence runs over the end of a line.'],
    ['**Caesura**: a pause **inside** a line', 'A caesura is a pause inside a line.'],
    ['Both shape **rhythm**, often to sound like **speech**', 'Both shape the rhythm, often to sound like natural speech. For more on metre and rhythm, watch this lesson’s explainer video on Gradileo.'],
  ],
});
