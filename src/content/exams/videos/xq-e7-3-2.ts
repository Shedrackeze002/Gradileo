import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 3.2 (dialogue, asides and monologues). An exam-style question we wrote, in
// the style of a Grade 7 reading test, on a short script we wrote. The answer is A: Priya speaks to the
// audience, and the other character cannot hear her, so it is an aside.

const SCRIPT = [
  '**RAJ:** I made you a cake for your birthday! It’s my own recipe: banana and onion.',
  '**PRIYA:** *(to the audience)* Banana and onion? I would rather eat my shoe.',
  '**PRIYA:** *(to Raj, smiling)* Wow, Raj. What a… surprise.',
];

export default englishExam({
  lesson: 'e7-3-2',
  ...ours('a Grade 7 reading test', 'the script is by Gradileo'),
  title: 'Is Priya’s Line an Aside, a Monologue or a Soliloquy?',
  thumbnailTitle: 'Asides and Monologues',
  subtitle: 'Kinds of speech in a play, step by step',
  summary:
    'An exam-style drama question, solved one small step at a time: Raj bakes Priya a banana and onion cake, and Priya says what she really thinks to the audience. We learn the difference between an aside, a monologue and a soliloquy, check who can hear her, and name the device.',
  intro: [
    'In this video, we solve an exam-style drama question about asides, monologues and soliloquies. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its short script ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: SCRIPT,
    by: 'A script written for Gradileo',
    say: [
      'First, read the script. Raj: I made you a cake for your birthday! It’s my own recipe: banana and onion.',
      'Priya, to the audience: Banana and onion? I would rather eat my shoe. Priya, to Raj, smiling: Wow, Raj. What a… surprise.',
    ],
  },
  question: {
    prompt: 'Priya’s line *“Banana and onion? I would rather eat my shoe.”* is an example of:',
    text: 'Read the script. Priya’s line “Banana and onion? I would rather eat my shoe.” is an example of:',
    choices: ['an aside', 'a monologue', 'a soliloquy', 'a stage direction'],
    answer: 0,
    working: 'A **short** comment to the **audience** that **Raj cannot hear**: an **aside**.',
    say: ['Priya’s line, Banana and onion? I would rather eat my shoe, is an example of: A: an aside. B: a monologue. C: a soliloquy. D: a stage direction.'],
  },
  ask: [
    ['Priya says one thing to the **audience**, another to **Raj**', 'Priya says one thing to the audience, and something else to Raj.'],
    ['What do we **call** her first line?', 'We need the name for her first line.'],
  ],
  know: {
    title: 'Aside, monologue, soliloquy',
    md: 'An **aside** is a **short** comment to the **audience** that other characters on stage **cannot hear**. A **monologue** is a **long** speech by one character to **others**. A **soliloquy** is a long speech by a character **alone**, speaking their **thoughts** aloud.',
    say: [
      'Here is the idea we need. An aside is a short comment to the audience that the other characters on stage cannot hear.',
      'A monologue is a long speech by one character to other characters. A soliloquy is a long speech by a character who is alone, speaking their thoughts aloud.',
    ],
  },
  plan: [
    ['Is it **short** or **long**?', 'Here is the plan. First, is the line short or long?'],
    ['Who is it **spoken to**?', 'Second, who is it spoken to?'],
    ['Can others on stage **hear** it?', 'Third, can the other characters hear it?'],
  ],
  steps: [
    scene('Step 1: Test the line', [table('t', ['Question', 'Priya’s line'], [['short or long?', '**short**: two sentences'], ['spoken to?', '*(to the audience)*'], ['can Raj hear it?', '[[good:**no**: she smiles and says “What a… surprise”]]']])], [
      { say: 'Step one. The line is short, just two sentences.', show: 't.0' },
      { say: 'The stage direction says she speaks to the audience.', show: 't.1' },
      { say: 'And Raj cannot hear it. If he could, she would not then smile and pretend to be pleased.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Name it', [text('a', 'short + to the audience + unheard by others = **an aside**: **A**', 'lg')], [
      { say: 'Step two. Short, to the audience, unheard by the others: that is an aside. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['The aside lets us in on her **real** feelings', 'Let us check. The aside lets the audience in on Priya’s real feelings.'],
    ['That makes her polite reply **funny**', 'And that makes her polite reply to Raj funny. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'A **soliloquy** is long, and the character is **alone**', 'Choice C is the trap. A soliloquy also shares private thoughts, but it is a long speech by a character alone on stage. Raj is right there.'],
      ['B', 'A **monologue** is long and spoken **to others**', 'Choice B: a monologue is a long speech to other characters.'],
      ['D', 'The **brackets** are the stage direction, not the line', 'Choice D: the stage direction is the part in brackets, not the spoken line.'],
    ],
  },
  yourTurn: {
    prompt: 'A character stands **alone** on stage and speaks her private thoughts aloud for a whole page. This is:',
    choices: ['an aside', 'a soliloquy', 'dialogue', 'a cast list'],
    answer: 1,
    working: '**Alone**, **long**, private **thoughts**: a soliloquy.',
    ask: 'A character stands alone on stage and speaks her private thoughts aloud for a whole page. This is: A: an aside. B: a soliloquy. C: dialogue. D: a cast list.',
    reveal: 'The answer is B, a soliloquy. She is alone, the speech is long, and she is sharing her private thoughts.',
  },
  sum: [
    ['**Aside**: short, to the audience, unheard by others', 'Here is what to remember. An aside is short, spoken to the audience, and unheard by the other characters.'],
    ['**Monologue**: a long speech **to others**', 'A monologue is a long speech to other characters.'],
    ['**Soliloquy**: a long speech by a character **alone**', 'A soliloquy is a long speech by a character alone. For more on dialogue, asides and monologues, watch this lesson’s explainer video on Gradileo.'],
  ],
});
