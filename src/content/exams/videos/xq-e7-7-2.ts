import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 7.2 (the essay). An exam-style question we wrote, in the style of a Grade 7
// writing test. The answer is D: it takes a clear, arguable position and previews the reasons the
// essay will develop.

export default englishExam({
  lesson: 'e7-7-2',
  ...ours('a Grade 7 writing test'),
  title: 'Which Is the Strongest Thesis Statement?',
  thumbnailTitle: 'Thesis Statements',
  subtitle: 'Writing a clear thesis, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student is writing an essay about school uniforms, and we choose the strongest thesis statement. We learn what a thesis must do, test each sentence, and pick the one that takes a position and maps out the essay.',
  intro: [
    'In this video, we solve an exam-style writing question about thesis statements. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 writing test.',
  ],
  question: {
    prompt: 'A student is writing an essay about **school uniforms**. Which is the **strongest thesis statement**?',
    text: 'A student is writing an essay about school uniforms. Which is the strongest thesis statement?',
    choices: [
      'This essay is about school uniforms.',
      'Some schools have uniforms and some do not.',
      'School uniforms are a thing that many people talk about.',
      'Schools should require uniforms because they reduce pressure to wear expensive clothes, save time each morning, and build school spirit.',
    ],
    answer: 3,
    working: 'D takes a **position** (*should*) and **previews** three reasons, one for each body paragraph.',
    say: [
      'A student is writing an essay about school uniforms. Which is the strongest thesis statement?',
      'A: This essay is about school uniforms. B: Some schools have uniforms and some do not. C: School uniforms are a thing that many people talk about. D: Schools should require uniforms because they reduce pressure to wear expensive clothes, save time each morning, and build school spirit.',
    ],
  },
  ask: [
    ['A **thesis** is the essay’s **main argument**', 'A thesis statement is the main argument of an essay.'],
    ['Which one is **strongest**?', 'We need the strongest one.'],
  ],
  know: {
    title: 'Thesis statements and essay structure',
    md: 'A **thesis statement** gives the essay’s **position** in one sentence, usually at the end of the **introduction**. A strong thesis is **arguable** and **specific**, and often **previews** the reasons. Each **body paragraph** develops one reason; the **conclusion** sums up.',
    say: [
      'Here is the idea we need. A thesis statement gives the essay’s position in one sentence, usually at the end of the introduction.',
      'A strong thesis is arguable and specific, and often previews the reasons. Each body paragraph then develops one reason, and the conclusion sums up.',
    ],
  },
  plan: [
    ['Does it take a **position**?', 'Here is the plan. First, does each sentence take a position?'],
    ['Is it **specific**: does it give **reasons**?', 'Second, is it specific, and does it give reasons?'],
  ],
  steps: [
    scene('Step 1: Test each thesis', [table('t', ['Thesis', 'Position?', 'Reasons?'], [['A: This essay is about…', '[[bad:✗ an announcement]]', '[[bad:✗]]'], ['B: some do, some do not', '[[bad:✗ a fact]]', '[[bad:✗]]'], ['C: a thing people talk about', '[[bad:✗ vague]]', '[[bad:✗]]'], ['D: should require uniforms because…', '[[good:✓]]', '[[good:✓ three]]']])], [
      { say: 'Step one. A only announces the topic. It takes no position.', show: 't.0' },
      { say: 'B is a fact that nobody would argue with. C is so vague that it says almost nothing.', show: ['t.1', 't.2'] },
      { say: 'D takes a clear position, schools should require uniforms, and gives three reasons.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The essay it maps out', [table('m', ['Part', 'Content'], [['Introduction', 'ends with the **thesis**'], ['Body 1', 'less pressure over **expensive clothes**'], ['Body 2', '**saves time** each morning'], ['Body 3', 'builds **school spirit**'], ['Conclusion', 'sums up']]), text('a', 'The answer is **D**.')], [
      { say: 'Step two. D even gives us a plan for the essay: one body paragraph for each reason. The answer is D.', show: ['m.0', 'm.1', 'm.2', 'm.3', 'm.4', 'a'] },
    ]),
  ],
  check: [
    ['Someone could **disagree** with D', 'Let us check. Someone could disagree with D, so it is arguable.'],
    ['and D tells the reader **what is coming**', 'And it tells the reader exactly what is coming. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Names the **topic**, but no **position**', 'Choice A is the trap. It names the topic, which feels like a thesis, but it takes no position.'],
      ['B', 'A **fact**, not an argument', 'Choice B is a fact, not an argument.'],
      ['C', 'Too **vague**', 'Choice C is too vague.'],
    ],
  },
  yourTurn: {
    prompt: 'In an essay, where does the **thesis statement** usually go?',
    choices: ['in the middle of the second body paragraph', 'at the end of the introduction', 'in the conclusion only', 'in the title'],
    answer: 1,
    working: 'The introduction **leads up to** the thesis.',
    ask: 'In an essay, where does the thesis statement usually go? A: in the middle of the second body paragraph. B: at the end of the introduction. C: in the conclusion only. D: in the title.',
    reveal: 'The answer is B, at the end of the introduction. The introduction leads up to it, and the body paragraphs then prove it.',
  },
  sum: [
    ['A **thesis** states the essay’s **position**', 'Here is what to remember. A thesis states the essay’s position.'],
    ['Make it **arguable**, **specific**, and **preview** the reasons', 'Make it arguable and specific, and preview the reasons.'],
    ['Intro → **thesis**; body paragraphs → **reasons**; conclusion → **sum up**', 'It ends the introduction, the body paragraphs develop the reasons, and the conclusion sums up. For more on the essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
