import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 6.3 (research writing). An exam-style research question we wrote, in the style
// of a Grade 12 writing test. The answer is B: a recent peer-reviewed study by sleep scientists has the
// most authority and evidence, and no reason to sell anything.

export default englishExam({
  lesson: 'e12-6-3',
  ...ours('a Grade 12 writing test'),
  title: 'Which Source Is Most Reliable for a Research Essay?',
  thumbnailTitle: 'Evaluating Sources',
  subtitle: 'Research writing, step by step',
  summary:
    'An exam-style research question, solved one small step at a time. A student is writing about social media and teenagers’ sleep, and has four possible sources. We test each one for authority, evidence, currency and purpose, and choose the most reliable.',
  intro: [
    'In this video, we solve an exam-style question about research writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 writing test.',
  ],
  question: {
    prompt: 'A student is writing a research essay on how social media affects teenagers’ sleep. Which source is **most reliable**?',
    text: 'A student is writing a research essay on how social media affects teenagers’ sleep. Which source is most reliable?',
    choices: [
      'an anonymous post on a forum, from a user who says they never sleep',
      'a peer-reviewed study in a sleep-science journal, published last year',
      'an advert for an app that promises better sleep',
      'a celebrity’s video about their bedtime routine',
    ],
    answer: 1,
    working: 'B: **expert** authors, **evidence** checked by other scientists, **recent**, and **nothing to sell**.',
    say: [
      'A student is writing a research essay on how social media affects teenagers’ sleep. Which source is most reliable?',
      'A: an anonymous post on a forum, from a user who says they never sleep. B: a peer-reviewed study in a sleep-science journal, published last year. C: an advert for an app that promises better sleep. D: a celebrity’s video about their bedtime routine.',
    ],
  },
  ask: [
    ['Four possible **sources**', 'The student has four possible sources.'],
    ['Which is most **reliable**?', 'We need the most reliable one.'],
  ],
  know: {
    title: 'Evaluating and using sources',
    md: 'Test a source four ways. **Authority**: who wrote it, and are they experts? **Evidence**: does it show data, and has it been checked (for example, **peer-reviewed**)? **Currency**: is it recent enough? **Purpose**: is it trying to inform, or to **sell** or **persuade**? Then **synthesize** sources in your own argument, and **attribute** every idea and figure to its source.',
    say: [
      'Here is the idea we need. Test a source four ways. Authority: who wrote it, and are they experts? Evidence: does it show data, and has it been checked, for example by peer review? Currency: is it recent enough? And purpose: is it trying to inform, or to sell or persuade?',
      'Then synthesize your sources in your own argument, and attribute every idea and figure to its source.',
    ],
  },
  plan: [
    ['Test **authority** and **evidence**', 'Here is the plan. First, test authority and evidence.'],
    ['Test **currency** and **purpose**', 'Second, test currency and purpose.'],
    ['Choose the **most reliable**', 'Third, choose the most reliable.'],
  ],
  steps: [
    scene('Step 1: Test each source', [table('t', ['Source', 'Authority', 'Purpose'], [['A: forum post', '[[bad:anonymous]]', 'opinion'], ['B: peer-reviewed study', '[[good:sleep scientists]]', '[[good:to inform]]'], ['C: app advert', 'a company', '[[bad:to sell]]'], ['D: celebrity video', '[[bad:not an expert]]', 'entertainment']])], [
      { say: 'Step one. A is anonymous. We cannot know who wrote it, and it is one person’s opinion.', show: 't.0' },
      { say: 'C is an advert. Its purpose is to sell an app. And D is a celebrity, not a sleep expert.', show: ['t.2', 't.3'] },
      { say: 'B is written by sleep scientists, and its purpose is to inform.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Evidence and currency', [table('e', ['Test', 'Source B'], [['evidence', '**data**, checked by other experts (**peer review**)'], ['currency', 'published **last year**']]), text('a', 'Expert, checked, recent, unbiased → **B**', 'lg')], [
      { say: 'Step two. B has data, checked by other experts before publication. That is peer review. And it was published last year, so it is current.', show: ['e.0', 'e.1'] },
      { say: 'B passes every test. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['B is the **only** one that passes all four tests', 'Let us check. B is the only source that passes all four tests.'],
    ['so it is the strongest **evidence** for an essay', 'So it gives the strongest evidence for an essay. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Famous is **not** the same as **expert**', 'Choice D is the trap. A celebrity is well known and easy to trust, but famous is not the same as expert.'],
      ['A', '**Anonymous** opinion', 'Choice A is anonymous opinion.'],
      ['C', 'Its purpose is to **sell**', 'Choice C: its purpose is to sell.'],
    ],
  },
  yourTurn: {
    prompt: 'You use a statistic from a government report in your essay. What must you do?',
    choices: ['change the numbers slightly', 'hide where it came from', 'attribute it to its source', 'write it in capital letters'],
    answer: 2,
    working: 'Every borrowed figure needs **attribution**.',
    ask: 'You use a statistic from a government report in your essay. What must you do? A: change the numbers slightly. B: hide where it came from. C: attribute it to its source. D: write it in capital letters.',
    reveal: 'The answer is C. Every borrowed idea or figure must be attributed to its source, so readers can check it, and so the work is honest.',
  },
  sum: [
    ['Test **authority**, **evidence**, **currency**, **purpose**', 'Here is what to remember. Test a source for authority, evidence, currency and purpose.'],
    ['**Peer-reviewed** research is checked by experts', 'Peer-reviewed research has been checked by other experts.'],
    ['**Attribute** every borrowed idea and figure', 'And attribute every borrowed idea and figure. For more on research writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
