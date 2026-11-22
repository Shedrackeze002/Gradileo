import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 4.4 (statistics, evidence and reasoning). An exam-style question we wrote, in
// the style of a Grade 12 reading test. The answer is D: ice cream sales and drownings rise together
// because both rise in hot weather, so correlation does not show causation.

export default englishExam({
  lesson: 'e12-4-4',
  ...ours('a Grade 12 reading test'),
  title: 'Does Ice Cream Cause Drowning?',
  thumbnailTitle: 'Correlation vs Causation',
  subtitle: 'Statistics and reasoning, step by step',
  summary:
    'An exam-style question on reasoning with statistics, solved one small step at a time. A blog notices that ice cream sales and drownings rise together, and decides one causes the other. We look for a hidden third factor and name the flaw.',
  intro: [
    'In this video, we solve an exam-style question about statistics and reasoning. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test.',
  ],
  question: {
    prompt: 'A blog notes that in one town, months with high ice cream sales also have more drownings. It concludes: *“Ice cream causes drowning.”* What is the **main flaw**?',
    text: 'A blog notes that in one town, months with high ice cream sales also have more drownings. It concludes: Ice cream causes drowning. What is the main flaw?',
    choices: [
      'The sample of months is too large.',
      'Ice cream sales cannot be measured.',
      'The blog should have used a bar graph.',
      'Both rise in hot weather, so a link between them does not show that one causes the other.',
    ],
    answer: 3,
    working: 'Hot weather → **more** ice cream **and** more swimming → more drownings: a **third factor**; **correlation ≠ causation**.',
    say: [
      'A blog notes that in one town, months with high ice cream sales also have more drownings. It concludes: ice cream causes drowning. What is the main flaw?',
      'A: The sample of months is too large. B: Ice cream sales cannot be measured. C: The blog should have used a bar graph. D: Both rise in hot weather, so a link between them does not show that one causes the other.',
    ],
  },
  ask: [
    ['Two things **rise together**', 'Two things rise together.'],
    ['Does one **cause** the other?', 'We need to decide whether one causes the other, and name the flaw.'],
  ],
  know: {
    title: 'Statistics and reasoning',
    md: '**Correlation** means two things change together; **causation** means one makes the other happen. A hidden **third factor** can cause both. Other traps: **cherry-picking** (choosing only the data that helps), ignoring the **base rate** (how common something is anyway), a **small** or **biased sample**, and graphs with a **truncated axis** that make small changes look huge.',
    say: [
      'Here is the idea we need. Correlation means two things change together. Causation means one makes the other happen. A hidden third factor can cause both.',
      'Other traps include cherry-picking, choosing only the data that helps; ignoring the base rate, how common something is anyway; a small or biased sample; and graphs with a cut-off axis that make small changes look huge.',
    ],
  },
  plan: [
    ['What **really** rises together?', 'Here is the plan. First, what really rises together?'],
    ['Look for a **third factor**', 'Second, look for a third factor.'],
    ['Name the **flaw**', 'Third, name the flaw.'],
  ],
  steps: [
    scene('Step 1: A third factor', [table('t', ['In hot months', 'Why'], [['more **ice cream** sold', 'people want to **cool down**'], ['more **swimming**', 'people go to the **water**'], ['more **drownings**', 'more people **in** the water']])], [
      { say: 'Step one. Which months have high ice cream sales? Hot ones. People want to cool down.', show: 't.0' },
      { say: 'And in hot months, more people swim, so sadly there are more drownings.', show: ['t.1', 't.2'], focus: 't.2' },
    ]),
    scene('Step 2: The flaw', [text('d', '**Hot weather** → ice cream ↑ and drownings ↑'), text('a', 'Correlation is **not** causation → **D**', 'lg')], [
      { say: 'Step two. Hot weather causes both. Ice cream and drowning are linked only because they share a cause.', show: 'd' },
      { say: 'So the flaw is mistaking correlation for causation. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Test it: would **banning** ice cream stop drownings?', 'Let us check. Would banning ice cream stop drownings? No. People would still swim in hot weather.'],
    ['No, so ice cream is **not** the cause', 'So ice cream is not the cause. D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A **larger** sample is **better**, not a flaw', 'Choice A is the trap. Sample size is a real issue, but a larger sample is better, not a flaw.'],
      ['B', 'Sales are **easy** to measure', 'Choice B: sales are easy to measure.'],
      ['C', 'The **reasoning**, not the chart, is wrong', 'Choice C: the reasoning is wrong, not the type of chart.'],
    ],
  },
  yourTurn: {
    prompt: 'A graph’s vertical axis starts at 48 instead of 0, so a rise from 50 to 52 looks enormous. What is the problem?',
    choices: ['The data is cherry-picked.', 'The sample is biased.', 'The base rate is ignored.', 'A truncated axis exaggerates a small difference.'],
    answer: 3,
    working: 'Cutting off the axis makes **2** look like a **huge** jump.',
    ask: 'A graph’s vertical axis starts at forty-eight instead of zero, so a rise from fifty to fifty-two looks enormous. What is the problem? A: The data is cherry-picked. B: The sample is biased. C: The base rate is ignored. D: A truncated axis exaggerates a small difference.',
    reveal: 'The answer is D. Cutting off the bottom of the axis makes a small rise of two look huge.',
  },
  sum: [
    ['**Correlation** is not **causation**', 'Here is what to remember. Correlation is not causation.'],
    ['Look for a hidden **third factor**', 'Look for a hidden third factor.'],
    ['Check graphs for **truncated** axes', 'And check graphs for cut-off axes. For more on statistics, evidence and reasoning, watch this lesson’s explainer video on Gradileo.'],
  ],
});
