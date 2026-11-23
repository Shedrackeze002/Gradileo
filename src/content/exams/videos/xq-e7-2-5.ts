import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 2.5 (speaker and tone). An exam-style question we wrote, in the style of a
// Grade 7 reading test, on Emily Dickinson's "I'm nobody! Who are you?" in the text of Poems, Second
// Series (1891), which is in the public domain. The answer is D: the speaker playfully mocks fame.

const POEM = [
  'I’m nobody! Who are you?<br>Are you nobody, too?<br>Then there’s a pair of us — don’t tell!<br>They’d banish us, you know.',
  'How dreary to be somebody!<br>How public, like a frog<br>To tell your name the livelong day<br>To an admiring bog!',
];

export default englishExam({
  lesson: 'e7-2-5',
  ...ours('a Grade 7 reading test', 'the poem is Emily Dickinson’s “I’m nobody! Who are you?” (Poems, Second Series, 1891), in the public domain'),
  title: 'What Is the Tone of “I’m Nobody! Who Are You?”',
  thumbnailTitle: 'Tone in Poetry',
  subtitle: 'Speaker and tone, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Emily Dickinson’s “I’m nobody! Who are you?”. We meet the speaker, collect the words that carry the tone, and decide how the speaker feels about being somebody famous.',
  intro: [
    'In this video, we solve an exam-style poetry question about tone. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test, on Emily Dickinson’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Emily Dickinson, Poems, Second Series (1891)',
    say: [
      'First, read the poem. I’m nobody! Who are you? Are you nobody, too? Then there’s a pair of us, don’t tell! They’d banish us, you know.',
      'How dreary to be somebody! How public, like a frog, to tell your name the livelong day to an admiring bog!',
    ],
  },
  question: {
    prompt: 'Which word best describes the speaker’s **tone** towards being “somebody”?',
    text: 'Read the poem by Emily Dickinson. Which word best describes the speaker’s tone towards being “somebody”?',
    choices: ['jealous', 'respectful', 'frightened', 'playfully mocking'],
    answer: 3,
    working: 'Comparing a famous person to a **frog** croaking its name to a **bog** makes fame look **silly**.',
    say: ['Which word best describes the speaker’s tone towards being somebody? A: jealous. B: respectful. C: frightened. D: playfully mocking.'],
  },
  ask: [
    ['**Tone** is the speaker’s **attitude**', 'Tone is the speaker’s attitude towards their subject.'],
    ['How do they feel about being **somebody**?', 'We need their attitude towards being somebody, someone famous.'],
  ],
  know: {
    title: 'Speaker and tone',
    md: 'The **speaker** is the voice in the poem, which may differ from the **poet**. **Tone** is the speaker’s **attitude**: for example *playful*, *bitter*, *admiring* or *mocking*. Find it in **word choice**, **images** and **punctuation**.',
    say: [
      'Here is the idea we need. The speaker is the voice talking in the poem, and it is not always the poet.',
      'Tone is the speaker’s attitude, for example playful, bitter, admiring or mocking. We find it in the words they choose, their images and even their punctuation.',
    ],
  },
  plan: [
    ['Find the words about **somebody**', 'Here is the plan. First, find the words about being somebody.'],
    ['Picture the **image**', 'Second, picture the image the speaker uses.'],
    ['Name the **attitude**', 'Third, name the attitude.'],
  ],
  steps: [
    scene('Step 1: The words about somebody', [quote('p', ['How [[bad:dreary]] to be somebody!', 'How [[bad:public]], like a [[theta:frog]]', 'To tell your name the [[bad:livelong day]]', 'To an [[theta:admiring bog]]!'])], [
      { say: 'Step one. Pause and read the second stanza, about being somebody.', show: 'p', wait: 3 },
      { say: 'Dreary means dull. Public means always on show. And livelong day means all day long, over and over.', focus: ['p.0', 'p.1', 'p.2'] },
    ]),
    scene('Step 2: The image', [text('i', 'A famous person = a **frog** croaking its own **name** all day to a **bog** of admirers', 'lg'), text('n', 'Fame looks **silly**, and the tone is **light** and teasing.')], [
      { say: 'Step two. Picture it. A frog, croaking its own name all day, to a muddy bog that admires it. That is what being famous looks like to this speaker.', show: 'i' },
      { say: 'It makes fame look silly. And the exclamation marks and don’t tell! keep the tone light and teasing.', show: 'n' },
    ]),
    scene('Step 3: Match the choices', [table('t', ['Choice', 'Fits?'], [['jealous', '[[bad:✗ fame is dreary]]'], ['respectful', '[[bad:✗ a croaking frog]]'], ['frightened', '[[bad:✗ the tone is light]]'], ['playfully mocking', '[[good:✓ teases fame]]']])], [
      { say: 'Step three. The speaker is not jealous of fame or respectful of it, and the tone is too light to be frightened. The speaker is playfully mocking. The answer is D.', show: ['t.0', 't.1', 't.2', 't.3'], focus: 't.3' },
    ]),
  ],
  check: [
    ['The speaker is **happy** to be nobody', 'Let us check. The speaker is happy to be nobody, and even invites us to join.'],
    ['and **teases** those who are somebody', 'And teases those who are somebody. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**They’d banish us** sounds scary, but it is said with a **wink**', 'Choice C is the trap. They would banish us sounds frightening, but don’t tell! makes it a playful secret.'],
      ['A', 'The speaker does **not** want fame', 'Choice A: the speaker does not want fame at all.'],
      ['B', 'A **frog** in a **bog** is not respectful', 'Choice B: comparing someone to a frog in a bog is hardly respectful.'],
    ],
  },
  yourTurn: {
    prompt: 'Who is the **speaker** in *“I’m nobody! Who are you?”*',
    choices: ['a person who is not famous and is glad of it', 'a famous singer', 'a frog in a bog', 'a king who has lost his throne'],
    answer: 0,
    working: 'The speaker calls themselves **nobody** and enjoys it.',
    ask: 'Who is the speaker in I’m nobody! Who are you? A: a person who is not famous and is glad of it. B: a famous singer. C: a frog in a bog. D: a king who has lost his throne.',
    reveal: 'The answer is A. The speaker calls themselves nobody, and is glad of it. The frog is only an image for famous people.',
  },
  sum: [
    ['**Tone** is the speaker’s **attitude**', 'Here is what to remember. Tone is the speaker’s attitude.'],
    ['Find it in **word choice**, **images** and **punctuation**', 'Find it in word choice, images and punctuation.'],
    ['The **speaker** is the voice of the poem, not always the poet', 'And the speaker is the voice of the poem, which is not always the poet. For more on speaker and tone, watch this lesson’s explainer video on Gradileo.'],
  ],
});
