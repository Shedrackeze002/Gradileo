import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 9.3 (Love and Relationships: the modern poems). An exam-style question we
// wrote, in the style of a GCSE English Literature exam. The modern poems are still in copyright, so they
// are described in our own words and not quoted. The answer is A: Mother, any distance, by Simon Armitage.

export default englishExam({
  lesson: 'ex-9-3',
  ...ours('a GCSE English Literature exam', 'the poems named are still in copyright, so they are described in our own words and not quoted'),
  title: 'Which Poem Shows a Son Measuring a House With His Mother?',
  thumbnailTitle: 'Love and Relationships: Modern',
  subtitle: 'Knowing the modern poems, step by step',
  summary:
    'An exam-style question on the modern Love and Relationships poems, solved one small step at a time. We match a description of a son measuring his new home, with his mother holding the tape, to the right poem, by sorting the poems by who they are about.',
  intro: [
    'In this video, we solve an exam-style question about the modern Love and Relationships poems. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam. The poems are still in copyright, so we describe them in our own words.',
  ],
  question: {
    prompt: 'In which poem does a son measure his new home while his **mother** holds the end of the **tape**, so that the tape becomes a link he is ready to let go of?',
    text: 'In which poem does a son measure his new home while his mother holds the end of the tape, so that the tape becomes a link he is ready to let go of?',
    choices: ['Mother, any distance', 'Follower', 'Walking Away', 'Eden Rock'],
    answer: 0,
    working: 'A **son**, his **mother**, a **tape measure**, growing **independence**: **Mother, any distance** (Simon Armitage).',
    say: [
      'In which poem does a son measure his new home while his mother holds the end of the tape, so that the tape becomes a link he is ready to let go of?',
      'A: Mother, any distance. B: Follower. C: Walking Away. D: Eden Rock.',
    ],
  },
  ask: [
    ['A **son**, his **mother**, and a **tape**', 'We are looking for a son, his mother, and a tape measure.'],
    ['Which **poem**?', 'We need to name the poem.'],
  ],
  know: {
    title: 'The modern Love and Relationships poems',
    md: '**Mother, any distance** (Simon Armitage): a son measuring his first home, his mother holding the tape: **independence** and the **bond** between them. **Follower** (Seamus Heaney): a boy follows his father ploughing; now the roles are **reversed**. **Walking Away** (Cecil Day Lewis): a father remembers watching his son walk away to school: **letting go**. **Eden Rock** (Charles Causley): a vision of his young parents beckoning him: **memory** and **death**.',
    say: [
      'Here is the idea we need. In Mother, any distance, by Simon Armitage, a son measures his first home while his mother holds the tape: a poem about independence and the bond between them. In Follower, by Seamus Heaney, a boy follows his father as he ploughs, and now their roles are reversed.',
      'In Walking Away, by Cecil Day Lewis, a father remembers watching his son walk away to school, and learning to let go. And in Eden Rock, by Charles Causley, the speaker sees his young parents beckoning him: a poem about memory and death.',
    ],
  },
  plan: [
    ['Who is the poem **about**?', 'Here is the plan. First, who is each poem about?'],
    ['What **object** links them?', 'Second, what object links the people?'],
    ['Match the **description**', 'Third, match the description.'],
  ],
  steps: [
    scene('Step 1: Sort the poems', [table('t', ['Poem', 'Who'], [['Follower', 'a son and his **father**, ploughing'], ['Walking Away', 'a **father** watching his son leave'], ['Eden Rock', 'a son and his **young parents**, in a vision'], ['Mother, any distance', 'a son and his **mother**, measuring a home']])], [
      { say: 'Step one. Follower is about a son and his father, ploughing. Walking Away is spoken by a father.', show: ['t.0', 't.1'] },
      { say: 'Eden Rock shows a vision of young parents. Mother, any distance is about a son and his mother, measuring his new home.', show: ['t.2', 't.3'], focus: 't.3' },
    ]),
    scene('Step 2: The match', [text('m', 'Son + mother + **tape measure** = **Mother, any distance**'), text('e', 'The tape: their **bond**, and his wish to be **free**'), text('a', '**A**', 'lg')], [
      { say: 'Step two. A son, his mother, and a tape measure. That is Mother, any distance, by Simon Armitage.', show: 'm' },
      { say: 'The tape links them, and as it stretches, he gets ready to let go. The answer is A.', show: ['e', 'a'] },
    ]),
  ],
  check: [
    ['Its form is often read as a **stretched sonnet**', 'Let us check. Its form is often read as a stretched sonnet, a love poem form pulled longer, as he reaches away.'],
    ['love and **independence** together', 'Love and independence together. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Also about **letting go**, but from a **father’s** view', 'Choice C is the trap. Walking Away is also about letting go, but it is told by a father, about a son walking to school.'],
      ['B', 'A son and his **father**', 'Choice B is about a son and his father.'],
      ['D', 'A **vision** of his parents', 'Choice D is a vision of his parents.'],
    ],
  },
  yourTurn: {
    prompt: 'Who wrote **Follower**, about a boy following his father as he ploughs?',
    choices: ['Simon Armitage', 'Daljit Nagra', 'Seamus Heaney', 'Owen Sheers'],
    answer: 2,
    working: 'Follower: **Seamus Heaney**.',
    ask: 'Who wrote Follower, about a boy following his father as he ploughs? A: Simon Armitage. B: Daljit Nagra. C: Seamus Heaney. D: Owen Sheers.',
    reveal: 'The answer is C, Seamus Heaney.',
  },
  sum: [
    ['Know **who** each poem is about', 'Here is what to remember. Know who each poem is about.'],
    ['Mother, any distance: **love** and **independence**', 'Mother, any distance is about love and independence.'],
    ['Match each poem to its **poet**', 'And match each poem to its poet. For more on the modern Love and Relationships poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
