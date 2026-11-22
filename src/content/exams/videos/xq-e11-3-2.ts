import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 3.2 (ambition and character). An exam-style question we wrote, in the style of
// a Grade 11 reading test, on William Shakespeare's Macbeth (about 1606), which is in the public domain.
// The answer is D: Lady Macbeth fears her husband is too gentle to take the quickest way to the crown, by
// murder.

const LINES = ['**Lady Macbeth:** Glamis thou art, and Cawdor; and shalt be<br>What thou art promis’d. Yet do I fear thy nature;<br>It is too full o’ th’ milk of human kindness<br>To catch the nearest way.'];

export default englishExam({
  lesson: 'e11-3-2',
  ...ours('a Grade 11 reading test', 'the play is William Shakespeare’s Macbeth (about 1606), in the public domain'),
  title: 'What Does Lady Macbeth Fear About Her Husband?',
  thumbnailTitle: 'Lady Macbeth',
  subtitle: 'Ambition and character in Macbeth, step by step',
  summary:
    'An exam-style question on Macbeth, solved one small step at a time: Lady Macbeth reads her husband’s letter about the witches’ prophecy, and worries about his nature. We decode “the milk of human kindness” and “the nearest way”, and infer what she fears and what she wants.',
  intro: [
    'In this video, we solve an exam-style question about ambition and character in Macbeth. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Macbeth, Act 1, Scene 5',
    say: ['First, read Lady Macbeth’s lines. She has just read a letter from her husband: three witches have promised he will be king. Glamis thou art, and Cawdor; and shalt be what thou art promised. Yet do I fear thy nature; it is too full of the milk of human kindness to catch the nearest way.'],
  },
  question: {
    prompt: 'What does Lady Macbeth **fear** about her husband?',
    text: 'Read Lady Macbeth’s lines from Act 1. What does Lady Macbeth fear about her husband?',
    choices: [
      'He is too ambitious to be trusted.',
      'He is too cruel to be a good king.',
      'He does not believe the witches at all.',
      'He is too gentle to take the quickest way to the crown: murder.',
    ],
    answer: 3,
    working: '*too full o’ th’ milk of human kindness* = too **kind**; *the nearest way* = the **quickest** route, **killing** the king.',
    say: [
      'What does Lady Macbeth fear about her husband?',
      'A: He is too ambitious to be trusted. B: He is too cruel to be a good king. C: He does not believe the witches at all. D: He is too gentle to take the quickest way to the crown: murder.',
    ],
  },
  ask: [
    ['She says *I fear thy nature*', 'She says she fears his nature.'],
    ['What **about** his nature?', 'We need what exactly she fears.'],
  ],
  know: {
    title: 'The characters of Macbeth',
    md: '**Macbeth**: a brave soldier, Thane of **Glamis**, then **Cawdor**; three **witches** prophesy he will be **king**. **Lady Macbeth**: his wife, more ruthless at first, who drives him to **murder** King **Duncan**. **Banquo**: Macbeth’s fellow general, also given a prophecy, who stays **wary** and loyal. Key words: *thane* = a Scottish lord; *the nearest way* = the **quickest** route.',
    say: [
      'Here is the idea we need. Macbeth is a brave soldier, Thane of Glamis and then of Cawdor. A thane is a Scottish lord. Three witches prophesy that he will be king.',
      'Lady Macbeth, his wife, is more ruthless at first, and drives him to murder King Duncan. Banquo, Macbeth’s fellow general, is also given a prophecy, but stays wary and loyal.',
    ],
  },
  plan: [
    ['Decode the **image**', 'Here is the plan. First, decode the image.'],
    ['Decode **the nearest way**', 'Second, decode the nearest way.'],
    ['Infer her **fear**', 'Third, infer her fear.'],
  ],
  steps: [
    scene('Step 1: Decode', [table('t', ['Shakespeare', 'Meaning'], [['*shalt be / What thou art promis’d*', 'you **will** be king, as promised'], ['*the milk of human kindness*', 'gentleness, **kindness** (milk = soft, nourishing)'], ['*too full… To catch the nearest way*', 'too kind to take the **quickest** route']])], [
      { say: 'Step one. Shalt be what thou art promised: you will be king, as the witches promised.', show: 't.0' },
      { say: 'The milk of human kindness means gentleness. Milk is soft and nourishing, the opposite of violence.', show: 't.1' },
      { say: 'Too full to catch the nearest way: too kind to take the quickest route.', show: 't.2' },
    ]),
    scene('Step 2: Her fear', [quote('p', ['Yet do I [[bad:fear thy nature]];', 'It is [[theta:too full o’ th’ milk of human kindness]]', 'To catch [[bad:the nearest way]].']), text('a', 'He is too **gentle** to **murder** for the crown → **D**', 'lg')], [
      { say: 'Step two. The quickest way to the crown is to kill King Duncan. She fears Macbeth is too gentle to do it. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['She calls on spirits to *unsex* her and fill her with **cruelty**', 'Let us check. Moments later she calls on evil spirits to fill her with cruelty, to make up for his kindness.'],
    ['So she fears his **softness**, not his cruelty', 'So she fears his softness, not his cruelty. D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'She **wants** his ambition; she fears his **kindness**', 'Choice A is the trap. Ambition is the play’s theme, but she wants him ambitious. She fears his kindness.'],
      ['B', 'The **opposite** of *milk of human kindness*', 'Choice B is the opposite of the milk of human kindness.'],
      ['C', 'His letter shows he **does** believe them', 'Choice C: his letter shows he does believe them.'],
    ],
  },
  yourTurn: {
    prompt: 'Banquo also hears a prophecy, but does **not** act on it. Why?',
    choices: ['He does not hear it.', 'He is wary of evil and keeps his honour.', 'He is afraid of Lady Macbeth.', 'He is already king.'],
    answer: 1,
    working: 'He warns that the witches tell *truths* to **win us to our harm**.',
    ask: 'Banquo also hears a prophecy, but does not act on it. Why? A: He does not hear it. B: He is wary of evil and keeps his honour. C: He is afraid of Lady Macbeth. D: He is already king.',
    reveal: 'The answer is B. Banquo warns that the instruments of darkness tell us truths to win us to our harm, so he stays wary and honourable.',
  },
  sum: [
    ['Decode the **image** first', 'Here is what to remember. Decode the image first.'],
    ['Lady Macbeth fears her husband’s **kindness**', 'Lady Macbeth fears her husband’s kindness.'],
    ['**Banquo** is a foil: wary, not ambitious', 'And Banquo is a foil: wary, not ruthless. For more on ambition and character, watch this lesson’s explainer video on Gradileo.'],
  ],
});
