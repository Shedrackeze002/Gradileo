import { englishExam, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 2.4 (forms of poetry). An exam-style question we wrote, in the style of
// the key stage 2 English reading test, on Edward Lear's limerick "There was an Old Man with a
// beard" (A Book of Nonsense, 1846, public domain). The answer is B: five lines, rhyme pattern
// A A B B A, short lines 3 and 4, and a funny ending.

const POEM = ['There was an Old Man with a beard,', 'Who said, “It is just as I feared!—', 'Two Owls and a Hen,', 'Four Larks and a Wren,', 'Have all built their nests in my beard!”'];

export default englishExam({
  lesson: 'e5-2-4',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question by Gradileo; the poem is Edward Lear’s, from A Book of Nonsense (1846, public domain)',
  verbatim: false,
  title: 'What Kind of Poem Is “There Was an Old Man With a Beard”?',
  thumbnailTitle: 'Name That Poem Form',
  subtitle: 'Limericks, haiku and more, step by step',
  summary:
    'An exam-style question on Edward Lear’s poem about an old man with a beard, solved one small step at a time: what form of poem is it? We count the lines, find the rhyme pattern and the rhythm, and match them to the rules for a limerick, a haiku, an acrostic and free verse.',
  intro: [
    'In this video, we solve an exam-style question about forms of poetry. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of the reading test that eleven-year-olds take in England. The poem is by Edward Lear, from eighteen forty-six.',
  ],
  passage: {
    lines: POEM,
    by: 'Edward Lear, A Book of Nonsense',
    say: ['First, read the poem. There was an Old Man with a beard, who said, “It is just as I feared! Two Owls and a Hen, four Larks and a Wren, have all built their nests in my beard!”'],
  },
  question: {
    prompt: 'What form of poem is this?',
    text: 'Read the poem “There was an Old Man with a beard” by Edward Lear. What form of poem is this?',
    choices: ['a haiku', 'a limerick', 'an acrostic poem', 'free verse'],
    answer: 1,
    working: 'Five lines, rhyme pattern **A A B B A**, two short lines in the middle and a funny ending.',
    say: ['What form of poem is this? A: a haiku. B: a limerick. C: an acrostic poem. D: free verse.'],
  },
  ask: [
    ['Poems come in **forms**, each with its own rules', 'Poems come in different forms, and each form has its own rules.'],
    ['Which form’s rules does **this** poem follow?', 'The question asks which form this poem follows, so we need to check its features against the rules.'],
  ],
  know: {
    title: 'Four forms of poetry',
    md: '**Haiku**: 3 lines of 5, 7 and 5 syllables. **Limerick**: 5 funny lines rhyming **A A B B A**. **Acrostic**: the first letters spell a word. **Free verse**: no set rhyme or rhythm.',
    say: [
      'Here is what we need. A haiku has three lines, of five, seven and five syllables, often about nature.',
      'A limerick is a funny poem of five lines. Lines 1, 2 and 5 rhyme, and the two short lines in the middle rhyme with each other.',
      'In an acrostic poem, the first letters of the lines spell a word. And free verse has no fixed rhyme or rhythm at all.',
    ],
  },
  plan: [
    ['Count the **lines**', 'Here is the plan. First, count the lines.'],
    ['Find the **rhyme pattern**', 'Second, find the rhyme pattern.'],
    ['Match the features to a **form**', 'Third, match what we find to one of the forms.'],
  ],
  steps: [
    scene('Step 1: Count the lines', [quote('p', POEM), text('n', '**5 lines**, and lines 3 and 4 are **shorter**')], [
      { say: 'Step one. Pause and count the lines.', show: 'p', wait: 3 },
      { say: 'There are five lines. And notice that lines 3 and 4, two Owls and a Hen, four Larks and a Wren, are much shorter than the others.', show: 'n', focus: ['p.2', 'p.3'] },
      { say: 'Five lines already rules out a haiku, which has three.' },
    ]),
    scene('Step 2: The rhyme pattern', [table('t', ['Line', 'Last word', 'Letter'], [['1', 'beard', 'A'], ['2', 'feared', 'A'], ['3', 'Hen', 'B'], ['4', 'Wren', 'B'], ['5', 'beard', 'A']])], [
      { say: 'Step two. Beard and feared rhyme, so lines 1 and 2 are both A.', show: ['t.0', 't.1'] },
      { say: 'Hen and Wren rhyme with each other, but not with beard, so they are both B.', show: ['t.2', 't.3'] },
      { say: 'And line 5 ends with beard again, so it is A. The pattern is A, A, B, B, A.', show: 't.4' },
    ]),
    scene('Step 3: Match the form', [
      table('m', ['Form', 'Fits?'], [['haiku', '[[bad:✗ 3 lines]]'], ['limerick', '[[good:✓ 5 lines, A A B B A, funny]]'], ['acrostic', '[[bad:✗ T, W, T, F, H spell nothing]]'], ['free verse', '[[bad:✗ it rhymes in a fixed pattern]]']]),
    ], [
      { say: 'Step three. A haiku has three lines, so no.', show: 'm.0' },
      { say: 'A limerick has five lines, rhyming A A B B A, and it is funny. This poem fits every rule: an old man with birds nesting in his beard is certainly funny.', show: 'm.1', focus: 'm.1' },
      { say: 'The first letters spell nothing, so it is not an acrostic. And it rhymes in a fixed pattern, so it is not free verse. The answer is B, a limerick.', show: ['m.2', 'm.3'] },
    ]),
  ],
  check: [
    ['5 lines ✓ · A A B B A ✓ · short lines 3 and 4 ✓ · funny ✓', 'Let us check every rule of a limerick: five lines, yes. A A B B A, yes. Short middle lines, yes. Funny, yes.'],
    ['Edward Lear made limericks **famous**', 'In fact, Edward Lear, who wrote this poem, made limericks famous. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A haiku is **short**, but has **3** lines', 'Choice A is tempting because the poem is short. But a haiku has exactly three lines.'],
      ['C', 'Did not **check** the first letters', 'Choice C needs the first letters to spell a word. Read them down: T, W, T, F, H. They spell nothing.'],
      ['D', 'Free verse has **no** fixed rhyme', 'Choice D cannot be right, because this poem rhymes in a strict pattern.'],
    ],
  },
  yourTurn: {
    prompt: 'A haiku has three lines. How many syllables does each line have, in order?',
    choices: ['3, 5, 3', '7, 5, 7', '5, 5, 5', '5, 7, 5'],
    answer: 3,
    working: 'A haiku’s lines have **5**, then **7**, then **5** syllables.',
    ask: 'A haiku has three lines. How many syllables does each line have, in order?',
    reveal: 'The answer is D: five, seven, five. The middle line is the longest.',
  },
  sum: [
    ['Count the **lines** and find the **rhyme pattern**', 'Here is what to remember. To name a poem’s form, count its lines and find its rhyme pattern.'],
    ['Limerick: **5** lines, **A A B B A**, funny · haiku: **5-7-5**', 'A limerick has five funny lines rhyming A A B B A. A haiku has three lines of five, seven and five syllables.'],
    ['Acrostic: first letters spell a word · free verse: no fixed rhyme', 'In an acrostic, the first letters spell a word, and free verse has no fixed rhyme. For more on forms of poetry, watch this lesson’s explainer video on Gradileo.'],
  ],
});
