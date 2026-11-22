import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 2.3 (form). An exam-style question we wrote, in the style of a Grade 10
// reading test, on a limerick from Edward Lear's A Book of Nonsense (1846), which is in the public
// domain. The answer is C: five lines, AABBA, a bouncy rhythm and a comic ending make a limerick.

const POEM = ['There was an Old Man with a beard,<br>Who said, “It is just as I feared!—<br>Two Owls and a Hen,<br>Four Larks and a Wren,<br>Have all built their nests in my beard!”'];

export default englishExam({
  lesson: 'e10-2-3',
  ...ours('a Grade 10 reading test', 'the poem is from Edward Lear’s A Book of Nonsense (1846), in the public domain'),
  title: 'What Form Is Edward Lear’s “Old Man with a Beard”?',
  thumbnailTitle: 'Poetic Forms',
  subtitle: 'Recognising a poem’s form, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on one of Edward Lear’s nonsense poems. We count the lines, find the rhyme scheme, listen to the rhythm and tone, and name the form.',
  intro: [
    'In this video, we solve an exam-style poetry question about form. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Edward Lear’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Edward Lear, A Book of Nonsense (1846)',
    say: ['First, read the poem. There was an Old Man with a beard, who said, It is just as I feared! Two Owls and a Hen, four Larks and a Wren, have all built their nests in my beard!'],
  },
  question: {
    prompt: 'What **form** is this poem?',
    text: 'Read Edward Lear’s poem. What form is this poem?',
    choices: ['a haiku', 'a sonnet', 'a limerick', 'an ode'],
    answer: 2,
    working: '**5** lines, **AABBA**, a bouncy rhythm and a **comic** ending: a **limerick**.',
    say: ['What form is this poem? A: a haiku. B: a sonnet. C: a limerick. D: an ode.'],
  },
  ask: [
    ['A poem’s **form** is its shape and rules', 'A poem’s form is its shape and its rules.'],
    ['Which form **fits** this poem?', 'We need the form that fits this poem.'],
  ],
  know: {
    title: 'Poetic forms',
    md: '**Sonnet**: 14 lines, often about love. **Haiku**: 3 lines of 5, 7, 5 syllables, often about nature. **Limerick**: 5 lines, **AABBA**, bouncy and **comic**. **Ballad**: a story in song-like **quatrains**. **Ode**: a serious poem of **praise**. **Elegy**: a poem of **mourning**. **Free verse**: no regular rhyme or metre. Stanzas: **couplet** (2), **tercet** (3), **quatrain** (4).',
    say: [
      'Here is the idea we need. A sonnet has fourteen lines. A haiku has three lines of five, seven and five syllables. A limerick has five lines that rhyme A A B B A, with a bouncy rhythm and a comic twist.',
      'A ballad tells a story in song-like quatrains. An ode is a serious poem of praise, and an elegy is a poem of mourning. Free verse has no regular rhyme or metre. And stanzas of two, three and four lines are called couplets, tercets and quatrains.',
    ],
  },
  plan: [
    ['Count the **lines**', 'Here is the plan. First, count the lines.'],
    ['Find the **rhyme scheme**', 'Second, find the rhyme scheme.'],
    ['Check the **tone**, then name the form', 'Third, check the tone, and name the form.'],
  ],
  steps: [
    scene('Step 1: Lines and rhymes', [table('t', ['Line', 'Last word', 'Rhyme'], [['1', '*beard*', '**A**'], ['2', '*feared*', '**A**'], ['3', '*Hen*', '**B**'], ['4', '*Wren*', '**B**'], ['5', '*beard*', '**A**']])], [
      { say: 'Step one. There are five lines. Beard and feared rhyme, so lines one and two are A.', show: ['t.0', 't.1'] },
      { say: 'Hen and Wren are a new rhyme, B. Then line five comes back to beard, A. So the rhyme scheme is A A B B A.', show: ['t.2', 't.3', 't.4'] },
    ]),
    scene('Step 2: Tone and form', [quote('p', ['[[good:Two Owls and a Hen]],', '[[good:Four Larks and a Wren]],', 'Have all built their nests [[good:in my beard!]]']), text('a', '5 lines + AABBA + a **comic** twist = **limerick** → **C**', 'lg')], [
      { say: 'Step two. The tone is silly and comic. Six birds have built nests in a man’s beard.', show: 'p' },
      { say: 'Five lines, A A B B A, and a comic twist. That is a limerick. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Lines 3 and 4 are **shorter**', 'Let us check. Lines three and four are shorter, which is typical of a limerick.'],
    ['Every feature **matches**', 'Every feature matches. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A haiku has **3** lines, not 5', 'Choice A is the trap. Both forms are short, but a haiku has only three lines and does not rhyme.'],
      ['B', 'A sonnet has **14** lines', 'Choice B: a sonnet has fourteen lines.'],
      ['D', 'An ode is **serious** praise', 'Choice D: an ode is serious praise, not a joke.'],
    ],
  },
  yourTurn: {
    prompt: 'What do we call a poem of **mourning** for someone who has died?',
    choices: ['a limerick', 'a ballad', 'an elegy', 'a haiku'],
    answer: 2,
    working: 'A poem of **mourning**: an **elegy**.',
    ask: 'What do we call a poem of mourning for someone who has died? A: a limerick. B: a ballad. C: an elegy. D: a haiku.',
    reveal: 'The answer is C, an elegy. An elegy mourns someone who has died.',
  },
  sum: [
    ['Count **lines**, find the **rhyme scheme**', 'Here is what to remember. Count the lines, and find the rhyme scheme.'],
    ['Check the **tone** and **subject**', 'Check the tone and the subject.'],
    ['Limerick: **5** lines, **AABBA**, comic', 'A limerick has five lines, rhymes A A B B A, and is comic. For more on poetic form, watch this lesson’s explainer video on Gradileo.'],
  ],
});
