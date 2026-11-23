import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 6.1 (the literary analysis essay). An exam-style writing question we wrote, in
// the style of a Grade 11 writing test, about a thesis on Shelley's "Ozymandias" (1818). The answer is C:
// it names the method (the contrast) and the meaning it creates, so it explains how the poem works.

export default englishExam({
  lesson: 'e11-6-1',
  ...ours('a Grade 11 writing test'),
  title: 'Which Thesis Explains How the Poem Creates Meaning?',
  thumbnailTitle: 'Literary Analysis Thesis',
  subtitle: 'From what to how, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: four thesis statements about Shelley’s “Ozymandias”. We sort summary, opinion and announcement from analysis, and choose the thesis that explains how the poem makes its meaning.',
  intro: [
    'In this video, we solve an exam-style question about the literary analysis essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 writing test.',
  ],
  question: {
    prompt: 'Which is the strongest thesis for a **literary analysis** essay on Shelley’s *“Ozymandias”*?',
    text: 'Which is the strongest thesis for a literary analysis essay on Shelley’s “Ozymandias”?',
    choices: [
      '“Ozymandias” is about a broken statue in the desert.',
      'Shelley’s “Ozymandias” is a very good poem.',
      'Through the contrast between the king’s boastful inscription and the empty desert around it, Shelley shows that political power is temporary.',
      'In this essay, I will discuss the poem “Ozymandias”.',
    ],
    answer: 2,
    working: 'A literary thesis names **how** (*the contrast…*) and **what it means** (*power is temporary*).',
    say: [
      'Which is the strongest thesis for a literary analysis essay on Shelley’s Ozymandias?',
      'A: Ozymandias is about a broken statue in the desert. B: Shelley’s Ozymandias is a very good poem. C: Through the contrast between the king’s boastful inscription and the empty desert around it, Shelley shows that political power is temporary. D: In this essay, I will discuss the poem Ozymandias.',
    ],
  },
  ask: [
    ['A literary thesis says **how** a text means', 'A literary analysis thesis says how a text creates its meaning.'],
    ['Which one **does** that?', 'We need the thesis that does that.'],
  ],
  know: {
    title: 'The literary analysis thesis',
    md: 'A strong literary analysis thesis has two parts: the **method** (a technique, contrast, image or structure) and the **meaning** it creates (an arguable **interpretation**). A useful pattern: *Through [method], [writer] shows/suggests [meaning].* Body paragraphs then explain **how** and **why**, not just **what happens**.',
    say: [
      'Here is the idea we need. A strong literary analysis thesis has two parts: the method, such as a technique, contrast, image or structure, and the meaning it creates, an arguable interpretation.',
      'A useful pattern is: through a method, the writer shows a meaning. The body paragraphs then explain how and why, not just what happens.',
    ],
  },
  plan: [
    ['Does it name a **method**?', 'Here is the plan. First, check whether each thesis names a method.'],
    ['Does it name a **meaning**?', 'Second, check whether it names a meaning.'],
  ],
  steps: [
    scene('Step 1: Method and meaning', [table('t', ['Choice', 'Method?', 'Meaning?', 'Type'], [['A', '✗', '✗', 'summary'], ['B', '✗', '✗', 'opinion'], ['C', '[[good:✓ the contrast]]', '[[good:✓ power is temporary]]', '[[good:analysis]]'], ['D', '✗', '✗', 'announcement']])], [
      { say: 'Step one. A only says what the poem is about: summary. B gives an opinion with no reason. D only announces the topic.', show: ['t.0', 't.1', 't.3'] },
      { say: 'C names a method, the contrast between the boast and the empty desert, and a meaning: political power is temporary.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', '*Through [method], Shelley shows [meaning]* → **C**', 'lg')], [
      { say: 'Step two. C follows the pattern: through a method, Shelley shows a meaning. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Could someone **disagree**? Yes: some read it as about **art**', 'Let us check. Could someone disagree? Yes. Some readers argue the poem is about how art outlasts power.'],
    ['So C is **arguable**, as a thesis must be', 'So C is arguable, as a thesis must be. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Accurate, but only **what**, never **how**', 'Choice A is the trap. It is accurate, but it says only what the poem is about, never how it works.'],
      ['B', 'An **opinion** with no reason', 'Choice B is an opinion with no reason.'],
      ['D', 'An **announcement**', 'Choice D is an announcement.'],
    ],
  },
  yourTurn: {
    prompt: 'In a literary essay, **analysis** mainly explains…',
    choices: ['how and why the text creates meaning', 'what happens in the plot', 'the author’s life story', 'how many lines the poem has'],
    answer: 0,
    working: '**How** and **why**, not just **what**.',
    ask: 'In a literary essay, analysis mainly explains: A: how and why the text creates meaning. B: what happens in the plot. C: the author’s life story. D: how many lines the poem has.',
    reveal: 'The answer is A. Analysis explains how and why the text creates meaning.',
  },
  sum: [
    ['Thesis = **method** + **meaning**', 'Here is what to remember. A literary thesis names a method and a meaning.'],
    ['*Through [method], [writer] shows [meaning]*', 'Through a method, the writer shows a meaning.'],
    ['Analyse **how** and **why**', 'And analyse how and why. For more on the literary analysis essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
