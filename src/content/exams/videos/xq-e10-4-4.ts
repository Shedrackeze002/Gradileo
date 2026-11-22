import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 4.4 (bias and reliable sources). An exam-style question we wrote, in the style
// of a Grade 10 reading test. The answer is C: a peer-reviewed study by university researchers is the
// most reliable source, because it is expert, checked by other experts, and has no product to sell.

export default englishExam({
  lesson: 'e10-4-4',
  ...ours('a Grade 10 reading test'),
  title: 'Which Source Is Most Reliable?',
  thumbnailTitle: 'Reliable Sources',
  subtitle: 'Judging a source, step by step',
  summary:
    'An exam-style question on reliable sources, solved one small step at a time: a student is researching how sugary drinks affect teenagers’ health. We test four sources for expertise, checking and bias, and choose the most reliable one.',
  intro: [
    'In this video, we solve an exam-style question about bias and reliable sources. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test.',
  ],
  question: {
    prompt: 'A student is researching how **sugary drinks** affect teenagers’ health. Which source is **most reliable**?',
    text: 'A student is researching how sugary drinks affect teenagers’ health. Which source is most reliable?',
    choices: [
      'An advert from a soft-drink company.',
      'An anonymous blog post titled “The TRUTH about sugar!”',
      'A peer-reviewed study by university health researchers.',
      'A celebrity’s social media post about her diet.',
    ],
    answer: 2,
    working: '**Experts**, **checked** by other experts (peer review), **nothing to sell**: most reliable.',
    say: [
      'A student is researching how sugary drinks affect teenagers’ health. Which source is most reliable?',
      'A: An advert from a soft-drink company. B: An anonymous blog post titled, The truth about sugar! C: A peer-reviewed study by university health researchers. D: A celebrity’s social media post about her diet.',
    ],
  },
  ask: [
    ['Some sources are more **trustworthy** than others', 'Some sources are more trustworthy than others.'],
    ['Which is **most** reliable here?', 'We need the most reliable one for this topic.'],
  ],
  know: {
    title: 'Bias and reliability',
    md: 'Ask four questions of a source. **Who** wrote it, and are they an **expert**? Was it **checked** (edited, fact-checked, **peer-reviewed**)? Does the author have a **reason to be biased** (something to **sell** or a side to push)? Is it **current** and backed by **evidence**? **Bias** often shows in **loaded language**: words with strong positive or negative feelings.',
    say: [
      'Here is the idea we need. Ask four questions of a source. Who wrote it, and are they an expert? Was it checked, by editing, fact-checking or peer review, where other experts examine the work?',
      'Does the author have a reason to be biased, such as something to sell or a side to push? And is it current, and backed by evidence? Bias often shows in loaded language, words with strong positive or negative feelings.',
    ],
  },
  plan: [
    ['Test each source for **expertise**', 'Here is the plan. First, test each source for expertise.'],
    ['Test for **checking** and **bias**', 'Second, test each one for checking and bias.'],
  ],
  steps: [
    scene('Step 1: Test each source', [table('t', ['Source', 'Expert?', 'Checked?', 'Bias?'], [['A drinks company advert', '✗', '✗', '[[bad:sells the drinks]]'], ['B anonymous blog', '[[bad:unknown author]]', '✗', '[[bad:loaded title]]'], ['C peer-reviewed study', '[[good:✓ researchers]]', '[[good:✓ peer review]]', '[[good:nothing to sell]]'], ['D celebrity post', '✗', '✗', '[[bad:personal opinion]]']])], [
      { say: 'Step one. The advert comes from a company that sells the drinks, so it has a strong reason to be biased.', show: 't.0' },
      { say: 'The blog has no named author, and a loaded, all-capitals title. The celebrity is not a health expert.', show: ['t.1', 't.3'] },
      { say: 'The study is by health researchers, checked by other experts through peer review, and has nothing to sell.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', 'Expert + checked + no reason for bias → **C**', 'lg')], [
      { say: 'Step two. Only the study passes every test. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Ask: who **gains** if I believe this?', 'Let us check with one more question: who gains if I believe this source?'],
    ['The researchers gain **nothing** from sales', 'The researchers gain nothing from drink sales. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A company **knows** its drinks, but wants to **sell** them', 'Choice A is the trap. The company knows its drinks well, but it wants to sell them, so it is biased.'],
      ['B', '*The TRUTH* is **loaded**, with no author', 'Choice B: the truth, in capitals, is loaded language, and there is no author.'],
      ['D', 'Fame is not **expertise**', 'Choice D: fame is not expertise.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is the most **neutral**, without loaded language?',
    choices: [
      'The reckless council wasted our money on a pointless bridge.',
      'The greedy council squandered funds on a bridge.',
      'The foolish council threw away cash on a bridge.',
      'The council spent two million dollars on a new bridge.',
    ],
    answer: 3,
    working: 'No **feeling** words (*reckless*, *greedy*, *wasted*): just the **facts**.',
    ask: 'Which sentence is the most neutral, without loaded language? A: The reckless council wasted our money on a pointless bridge. B: The greedy council squandered funds on a bridge. C: The foolish council threw away cash on a bridge. D: The council spent two million dollars on a new bridge.',
    reveal: 'The answer is D. It gives the facts with no feeling words like reckless, greedy or foolish.',
  },
  sum: [
    ['Ask **who** wrote it, and are they an **expert**', 'Here is what to remember. Ask who wrote a source, and whether they are an expert.'],
    ['Was it **checked**? Is there a reason for **bias**?', 'Ask whether it was checked, and whether there is a reason for bias.'],
    ['**Loaded language** is a sign of bias', 'And watch for loaded language, a sign of bias. For more on bias and reliable sources, watch this lesson’s explainer video on Gradileo.'],
  ],
});
