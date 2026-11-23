import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 2.4 (reading a poem closely). An exam-style question we wrote, in the style of
// a Grade 10 reading test, on Percy Bysshe Shelley's "Ozymandias" (1818), which is in the public domain.
// The answer is D: the king's boast is followed by "Nothing beside remains", so his power has vanished and
// the boast is now ironic.

const POEM = ['And on the pedestal, these words appear:<br>My name is Ozymandias, King of Kings;<br>Look on my Works, ye Mighty, and despair!<br>Nothing beside remains. Round the decay<br>Of that colossal Wreck, boundless and bare<br>The lone and level sands stretch far away.'];

export default englishExam({
  lesson: 'e10-2-4',
  ...ours('a Grade 10 reading test', 'the poem is Percy Bysshe Shelley’s “Ozymandias” (1818), in the public domain'),
  title: 'What Happens to the King’s Boast in “Ozymandias”?',
  thumbnailTitle: 'Ozymandias',
  subtitle: 'Speaker, tone and shift, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the end of Shelley’s sonnet “Ozymandias”. A traveller describes a broken statue in the desert. We read the king’s proud words, then the shift that follows, and explain what the ending suggests.',
  intro: [
    'In this video, we solve an exam-style question about reading a poem closely. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Shelley’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Percy Bysshe Shelley, “Ozymandias” (1818), lines 9 to 14',
    say: ['First, read the end of the poem. A traveller describes a huge, broken statue of an ancient king lying in the desert. And on the pedestal, these words appear: My name is Ozymandias, King of Kings; Look on my Works, ye Mighty, and despair! Nothing beside remains. Round the decay of that colossal Wreck, boundless and bare the lone and level sands stretch far away.'],
  },
  question: {
    prompt: 'What do the **last three lines** suggest about the king’s boast?',
    text: 'Read the end of “Ozymandias”. What do the last three lines suggest about the king’s boast?',
    choices: [
      'His works are still as great as he claimed.',
      'The sand has protected his works for ever.',
      'The poet agrees that everyone should fear him.',
      'His power has vanished, so the boast is now empty and ironic.',
    ],
    answer: 3,
    working: 'He boasts of his **Works**; then *Nothing beside remains*, just **sand**: the boast is **ironic**.',
    say: [
      'What do the last three lines suggest about the king’s boast?',
      'A: His works are still as great as he claimed. B: The sand has protected his works for ever. C: The poet agrees that everyone should fear him. D: His power has vanished, so the boast is now empty and ironic.',
    ],
  },
  ask: [
    ['The king **boasts** about his works', 'The king boasts about his great works.'],
    ['What do the **last lines** do to that boast?', 'We need what the last lines do to that boast.'],
  ],
  know: {
    title: 'Reading a poem closely',
    md: 'Ask: **who** is speaking? What is the **tone** (the speaker’s attitude)? Where does the poem **shift**, often at a word like *but*, *yet*, or a sudden change of subject? Then support each claim with the poem’s **exact words**. In a sonnet, the **volta** (turn) often brings the shift.',
    say: [
      'Here is the idea we need. To read a poem closely, ask who is speaking, and what the tone is, meaning the speaker’s attitude.',
      'Then find where the poem shifts, often at a word like but or yet, or at a sudden change of subject. Support each claim with the poem’s exact words. In a sonnet, the turn often brings the shift.',
    ],
  },
  plan: [
    ['Read the **boast**', 'Here is the plan. First, read the boast.'],
    ['Find the **shift**', 'Second, find the shift.'],
    ['Say what the ending **suggests**', 'Third, say what the ending suggests.'],
  ],
  steps: [
    scene('Step 1: The boast', [quote('p', ['My name is Ozymandias, [[theta:King of Kings]];', '[[theta:Look on my Works, ye Mighty, and despair!]]']), text('n', 'Tone: **arrogant**: even mighty kings should despair at his greatness')], [
      { say: 'Step one. The king calls himself King of Kings, and tells even mighty rulers to look at his works and despair.', show: 'p' },
      { say: 'The tone is arrogant. He is sure his works will always outshine everyone else’s.', show: 'n' },
    ]),
    scene('Step 2: The shift', [table('t', ['The words', 'What they show'], [['*Nothing beside remains.*', '[[bad:his **Works** are gone]]'], ['*colossal Wreck*', '[[bad:the statue is **broken**]]'], ['*lone and level sands stretch far away*', '[[bad:empty desert, **forever**]]']]), text('a', 'The boast is now **empty** and **ironic** → **D**', 'lg')], [
      { say: 'Step two. Then comes the shift. Nothing beside remains. His works are gone. Only a colossal wreck is left.', show: ['t.0', 't.1'] },
      { say: 'All around, the lone and level sands stretch far away. Look on my works now means look at nothing. The boast has become empty and ironic. The answer is D.', show: ['t.2', 'a'] },
    ]),
  ],
  check: [
    ['The short sentence *Nothing beside remains* **cuts** the boast off', 'Let us check. The short sentence, nothing beside remains, cuts the boast off sharply.'],
    ['Time has **defeated** even the King of Kings', 'Time has defeated even the King of Kings. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Takes the **boast** at face value', 'Choice A is the trap. It takes the king’s boast at face value, but nothing beside remains.'],
      ['B', 'The sand **surrounds** a **wreck**', 'Choice B: the sand surrounds a wreck, not protected works.'],
      ['C', 'The poem **mocks** his pride', 'Choice C: the poem mocks his pride.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word best describes the **tone** of *“Look on my Works, ye Mighty, and despair!”*?',
    choices: ['humble', 'gentle', 'uncertain', 'arrogant'],
    answer: 3,
    working: 'Ordering the mighty to **despair** at his greatness: **arrogant**.',
    ask: 'Which word best describes the tone of: Look on my Works, ye Mighty, and despair? A: humble. B: gentle. C: uncertain. D: arrogant.',
    reveal: 'The answer is D, arrogant. The king orders even mighty rulers to despair at his greatness.',
  },
  sum: [
    ['Ask who speaks, and the **tone**', 'Here is what to remember. Ask who is speaking, and what the tone is.'],
    ['Find the **shift**', 'Find the shift.'],
    ['Support each claim with the poem’s **words**', 'And support each claim with the poem’s exact words. For more on reading a poem closely, watch this lesson’s explainer video on Gradileo.'],
  ],
});
