import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 4.1 (advertising). An exam-style question we wrote, in the style of a
// Grade 6 reading test, on an advert we wrote for an invented drink. The answer is B, the bandwagon
// technique: "everyone is drinking it" and "don't be the only one" push you to join the crowd.

const AD = ['**ZOOM! The drink everyone is talking about!**', 'Join the millions who have already switched to ZOOM.', 'All your friends are drinking it. Don’t be the only one left out!'];

export default englishExam({
  lesson: 'e6-4-1',
  ...ours('a Grade 6 reading test', 'the advert and its drink are invented by Gradileo'),
  title: 'Which Persuasive Technique Does the Advert Use?',
  thumbnailTitle: 'Advertising Tricks',
  subtitle: 'Persuasive techniques, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: an advert for an invented drink called ZOOM uses one main persuasive technique. We learn the common advertising techniques, find the key phrases in the advert, and match them to bandwagon.',
  intro: [
    'In this video, we solve an exam-style question about advertising. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The advert, and the drink, are made up.',
  ],
  passage: {
    lines: AD,
    by: 'An advert invented for Gradileo',
    say: ['First, read the advert. ZOOM! The drink everyone is talking about! Join the millions who have already switched to ZOOM. All your friends are drinking it. Don’t be the only one left out!'],
  },
  question: {
    prompt: 'Which persuasive technique does this advert **mainly** use?',
    text: 'Read the advert for ZOOM. Which persuasive technique does this advert mainly use?',
    choices: ['expert opinion', 'bandwagon', 'facts and statistics', 'humour'],
    answer: 1,
    working: '“Everyone”, “millions”, “all your friends” and “don’t be left out” urge you to join the crowd.',
    say: ['Which persuasive technique does this advert mainly use? A: expert opinion. B: bandwagon. C: facts and statistics. D: humour.'],
  },
  ask: [
    ['Adverts use **techniques** to persuade', 'Adverts use persuasive techniques: tricks to make you want something.'],
    ['Which one does **this** advert **mainly** use?', 'The question asks which one this advert mainly uses.'],
  ],
  know: {
    title: 'Persuasive techniques in adverts',
    md: '**Bandwagon**: everyone is doing it, so you should too. **Expert opinion**: a doctor or scientist recommends it. **Facts and statistics**: numbers that can be checked. **Humour**: making you laugh so you remember it.',
    say: [
      'Here are four common techniques. Bandwagon says everyone is doing it, so you should join in. The name comes from jumping onto a wagon that everyone is following.',
      'Expert opinion uses a doctor or scientist to recommend the product. Facts and statistics give numbers that can be checked. And humour makes you laugh, so you remember the product.',
    ],
  },
  plan: [
    ['Find the **key phrases**', 'Here is the plan. First, find the key phrases in the advert.'],
    ['Ask what **feeling** or **reason** each one uses', 'Second, ask what feeling or reason each one uses.'],
    ['Match to a **technique**', 'Third, match them to a technique.'],
  ],
  steps: [
    scene('Step 1: The key phrases', [quote('p', ['**ZOOM! The drink [[theta:everyone]] is talking about!**', 'Join the [[theta:millions]] who have already switched to ZOOM.', '[[theta:All your friends]] are drinking it. [[theta:Don’t be the only one left out!]]']), text('n', 'Every phrase says: **everyone else** has it, so **join them**.')], [
      { say: 'Step one. Pause and find the phrases that do the persuading.', show: 'p', wait: 3 },
      { say: 'Everyone is talking about it. Join the millions. All your friends are drinking it. Do not be the only one left out.', focus: ['p.0', 'p.1', 'p.2'] },
      { say: 'Every phrase says the same thing: everyone else already has it, so you should join them. It even plays on the fear of being left out.', show: 'n' },
    ]),
    scene('Step 2: Match the technique', [table('t', ['Technique', 'In the advert?'], [['expert opinion', '[[bad:✗ no doctor or scientist]]'], ['bandwagon', '[[good:✓ everyone, millions, all your friends]]'], ['facts and statistics', '[[bad:✗ “millions” is vague, not a checkable fact]]'], ['humour', '[[bad:✗ no jokes]]']]), text('a', 'The answer is **B, bandwagon**.')], [
      { say: 'Step two. No expert appears. There are no jokes. And millions is not a real statistic: it is vague, and cannot be checked.', show: ['t.0', 't.2', 't.3'] },
      { say: 'Everything points to bandwagon. The answer is B.', show: ['t.1', 'a'] },
    ]),
  ],
  check: [
    ['The advert says **nothing** about taste, price or health', 'Let us check. The advert says nothing about the drink itself: not its taste, price or health. It only says other people have it.'],
    ['That is the mark of **bandwagon**', 'Relying only on what others do is the mark of bandwagon. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**millions** sounds like a statistic, but it is **vague**', 'Choice C is the trap. Millions sounds like a number, but a real statistic is exact and can be checked.'],
      ['A', 'Friends are not **experts**', 'Choice A: your friends are not experts.'],
      ['D', 'ZOOM! is **exciting**, but not funny', 'Choice D: the advert is loud and exciting, but not funny.'],
    ],
  },
  yourTurn: {
    prompt: '*“As a dentist, I recommend SparkleBrite to all my patients.” Dr Lee, dentist.* Which persuasive technique does this advert use?',
    choices: ['expert opinion', 'bandwagon', 'humour', 'facts and statistics'],
    answer: 0,
    working: 'A dentist is an expert on teeth.',
    ask: 'As a dentist, I recommend SparkleBrite to all my patients. Dr Lee, dentist. Which persuasive technique does this advert use?',
    reveal: 'The answer is A, expert opinion. A dentist is an expert on teeth, so the advert hopes you will trust her recommendation.',
  },
  sum: [
    ['**Bandwagon**: everyone has it, so join in', 'Here is what to remember. Bandwagon says everyone has it, so join in.'],
    ['Other techniques: **expert opinion**, **statistics**, **humour**', 'Other techniques include expert opinion, facts and statistics, and humour.'],
    ['Ask: what does the advert tell you about the **product itself**?', 'And ask what the advert tells you about the product itself: often, very little. For more on advertising, watch this lesson’s explainer video on Gradileo.'],
  ],
});
