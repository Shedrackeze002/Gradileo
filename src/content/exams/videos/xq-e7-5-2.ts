import { englishExam, ours, scene, table } from '../english.ts';

// Grade 7 English, lesson 5.2 (reliable sources online). An exam-style question we wrote, in the style
// of a Grade 7 media test. The answer is C: a dated page from a national science agency, citing its
// data, is far more reliable than an anonymous post, an advert or an old forum reply. The sources are
// described in general terms and are not real websites.

export default englishExam({
  lesson: 'e7-5-2',
  ...ours('a Grade 7 media test', 'the sources described are invented'),
  title: 'Which Online Source Is Most Reliable?',
  thumbnailTitle: 'Reliable Sources',
  subtitle: 'Judging online sources, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: a student researching how much sleep teenagers need finds four online sources. We learn the questions to ask of any source, test each one, and pick the most reliable.',
  intro: [
    'In this video, we solve an exam-style question about judging sources online. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 media test. The sources described are made up.',
  ],
  question: {
    prompt: 'A student is researching **how much sleep teenagers need**. Which source is **most reliable**?',
    text: 'A student is researching how much sleep teenagers need. Which source is most reliable?',
    choices: [
      'an anonymous social media post with lots of likes',
      'a sponsored post by a mattress company',
      'a page from a national health agency, updated this year, that lists its research sources',
      'a forum reply from ten years ago signed “SleepyGuy”',
    ],
    answer: 2,
    working: 'C has a **known**, **expert** author, is **up to date**, and **shows its evidence**; it is not **selling** anything.',
    say: [
      'A student is researching how much sleep teenagers need. Which source is most reliable?',
      'A: an anonymous social media post with lots of likes. B: a sponsored post by a mattress company. C: a page from a national health agency, updated this year, that lists its research sources. D: a forum reply from ten years ago signed SleepyGuy.',
    ],
  },
  ask: [
    ['Four sources, all **online**', 'The student has found four sources, all online.'],
    ['Which one can we **trust** most?', 'We need the one we can trust most.'],
  ],
  know: {
    title: 'Judging a source',
    md: 'Ask four questions. **Who** wrote it, and are they an **expert**? **When** was it written or updated? **Why** was it written: to **inform**, or to **sell**? Does it show its **evidence**? Popularity (**likes**) is not the same as reliability.',
    say: [
      'Here is the idea we need. To judge a source, ask four questions. Who wrote it, and are they an expert? When was it written or updated?',
      'Why was it written: to inform, or to sell something? And does it show its evidence? Remember, lots of likes is not the same as being reliable.',
    ],
  },
  plan: [
    ['Ask the **four questions** of each source', 'Here is the plan. Ask the four questions of each source.'],
    ['Pick the one that passes **all four**', 'Then pick the one that passes all four.'],
  ],
  steps: [
    scene('Step 1: Test each source', [table('t', ['Source', 'Who?', 'When?', 'Why?', 'Evidence?'], [['A: anonymous post', '[[bad:unknown]]', '?', '?', '[[bad:✗]]'], ['B: mattress company', 'a business', 'recent', '[[bad:to **sell**]]', '?'], ['C: health agency', '[[good:experts]]', '[[good:this year]]', '[[good:to inform]]', '[[good:✓ lists sources]]'], ['D: old forum reply', '[[bad:unknown]]', '[[bad:ten years old]]', '?', '[[bad:✗]]']])], [
      { say: 'Step one. A is anonymous, so we do not know who wrote it, and likes do not make it true.', show: 't.0' },
      { say: 'B is sponsored by a mattress company. Its purpose is to sell mattresses, so it may twist the facts.', show: 't.1' },
      { say: 'D is ten years old, by someone called SleepyGuy. Unknown, and out of date.', show: 't.3' },
      { say: 'C passes every test: expert authors, updated this year, written to inform, and it shows its sources. The answer is C.', show: 't.2', focus: 't.2' },
    ]),
  ],
  check: [
    ['C is the **only** one we could **check**', 'Let us check. C is the only source whose evidence we could follow and check.'],
    ['and the only one with a **known expert** author', 'And it is the only one with a known, expert author. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Likes** show popularity, not **truth**', 'Choice A is the trap. Lots of likes makes a post feel trustworthy, but likes show popularity, not truth.'],
      ['B', '**Sponsored** means it is trying to **sell**', 'Choice B: sponsored means it is an advert.'],
      ['D', 'Old and **anonymous**', 'Choice D is old, and we do not know who wrote it.'],
    ],
  },
  yourTurn: {
    prompt: 'A video says, “Doctors hate this one trick!” and ends with a link to buy a supplement. What is its **main purpose**?',
    choices: ['to inform viewers about medicine', 'to sell a product', 'to entertain with a story', 'to report the news'],
    answer: 1,
    working: 'It ends with a **link to buy**: its purpose is to **sell**.',
    ask: 'A video says, doctors hate this one trick! and ends with a link to buy a supplement. What is its main purpose? A: to inform viewers about medicine. B: to sell a product. C: to entertain with a story. D: to report the news.',
    reveal: 'The answer is B, to sell a product. The link to buy gives it away, and the dramatic claim is there to grab attention.',
  },
  sum: [
    ['Ask: **who**, **when**, **why**, and what **evidence**?', 'Here is what to remember. Ask who wrote it, when, why, and what evidence it shows.'],
    ['Watch for **sponsored** posts that are really **adverts**', 'Watch for sponsored posts that are really adverts.'],
    ['**Likes** are not **evidence**', 'And remember that likes are not evidence. For more on reliable sources online, watch this lesson’s explainer video on Gradileo.'],
  ],
});
