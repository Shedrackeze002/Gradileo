import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 6.2 (the comparative essay). An exam-style writing question we wrote, in the
// style of a Grade 11 writing test, about comparing two poems on London. The answer is C: each paragraph
// compares both poems on one point, which is point-by-point organisation.

export default englishExam({
  lesson: 'e11-6-2',
  ...ours('a Grade 11 writing test'),
  title: 'Which Essay Plan Is Point by Point?',
  thumbnailTitle: 'The Comparative Essay',
  subtitle: 'Block and point-by-point plans, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: four plans for an essay comparing Wordsworth’s and Blake’s poems about London. We learn the block and point-by-point methods, test each plan, and find the point-by-point one.',
  intro: [
    'In this video, we solve an exam-style question about organising a comparative essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 writing test.',
  ],
  question: {
    prompt: 'A student is comparing Wordsworth’s and Blake’s poems about **London**. Which body-paragraph plan is organised **point by point**?',
    text: 'A student is comparing Wordsworth’s and Blake’s poems about London. Which body-paragraph plan is organised point by point?',
    choices: [
      '1: Wordsworth’s poem. 2: Blake’s poem.',
      '1: Wordsworth’s life. 2: Blake’s life. 3: Which poet is better.',
      '1: Imagery in both poems. 2: Tone in both poems. 3: Form in both poems.',
      '1: A summary of both poems. 2: My opinion.',
    ],
    answer: 2,
    working: '**Point by point**: each paragraph takes **one feature** and discusses **both** poems.',
    say: [
      'A student is comparing Wordsworth’s and Blake’s poems about London. Which body-paragraph plan is organised point by point?',
      'A: One, Wordsworth’s poem. Two, Blake’s poem. B: One, Wordsworth’s life. Two, Blake’s life. Three, which poet is better. C: One, imagery in both poems. Two, tone in both poems. Three, form in both poems. D: One, a summary of both poems. Two, my opinion.',
    ],
  },
  ask: [
    ['Two ways to **organise** a comparison', 'There are two main ways to organise a comparison.'],
    ['Which plan is **point by point**?', 'We need the point-by-point plan.'],
  ],
  know: {
    title: 'The comparative essay',
    md: '**Block** (subject by subject): all of text A, then all of text B. Simple, but the comparison can get lost. **Point by point**: each paragraph takes **one** feature (imagery, tone, form) and compares **both** texts. Harder, but the comparison is **constant**. A comparative **thesis** says not only that the texts differ, but **why the comparison matters**.',
    say: [
      'Here is the idea we need. The block method, or subject by subject, discusses all of text A, then all of text B. It is simple, but the comparison can get lost.',
      'The point-by-point method gives each paragraph one feature, such as imagery, tone or form, and compares both texts in it. It is harder, but the comparison never stops. And a comparative thesis says not only that the texts differ, but why the comparison matters.',
    ],
  },
  plan: [
    ['What does **each paragraph** cover?', 'Here is the plan. First, ask what each paragraph covers.'],
    ['**One** poem or **both**?', 'Second, ask whether it covers one poem or both.'],
  ],
  steps: [
    scene('Step 1: Test each plan', [table('t', ['Choice', 'Each paragraph covers…', 'Organisation'], [['A', '**one** poem', 'block'], ['B', 'the poets’ **lives**, then a ranking', 'off topic'], ['C', '**one feature** in **both** poems', '[[good:point by point]]'], ['D', 'a summary, then opinion', 'no real comparison']])], [
      { say: 'Step one. In A, each paragraph covers one whole poem. That is the block method.', show: 't.0' },
      { say: 'B discusses the poets’ lives and ranks them: off the topic. D summarises, then gives an opinion: no real comparison.', show: ['t.1', 't.3'] },
      { say: 'In C, each paragraph takes one feature, imagery, tone or form, and discusses both poems.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', 'One feature, both poems, in every paragraph → **C**', 'lg')], [
      { say: 'Step two. That is point by point. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['In C, **every** paragraph compares', 'Let us check. In C, every single paragraph compares the two poems.'],
    ['That is the mark of point by point', 'That is the mark of point by point. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A real method, but it is **block**', 'Choice A is the trap. It is a real way to organise, but it is the block method.'],
      ['B', 'The poets’ **lives**, not the poems', 'Choice B is about the poets’ lives, not the poems.'],
      ['D', 'Summary is not **comparison**', 'Choice D: summary is not comparison.'],
    ],
  },
  yourTurn: {
    prompt: 'Which **comparative thesis** says why the comparison matters?',
    choices: [
      'Both poems are about London.',
      'Wordsworth and Blake both describe London, but their opposite views show how the same city can mean beauty or suffering depending on who looks, and when.',
      'Blake wrote his poem before Wordsworth.',
      'I will compare two poems.',
    ],
    answer: 1,
    working: 'It names the difference **and** what it **shows**.',
    ask: 'Which comparative thesis says why the comparison matters? A: Both poems are about London. B: Wordsworth and Blake both describe London, but their opposite views show how the same city can mean beauty or suffering depending on who looks, and when. C: Blake wrote his poem before Wordsworth. D: I will compare two poems.',
    reveal: 'The answer is B. It names the difference, and explains what the comparison reveals.',
  },
  sum: [
    ['**Block**: one text, then the other', 'Here is what to remember. The block method covers one text, then the other.'],
    ['**Point by point**: one feature, both texts', 'Point by point covers one feature in both texts.'],
    ['Say **why** the comparison matters', 'And say why the comparison matters. For more on the comparative essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
