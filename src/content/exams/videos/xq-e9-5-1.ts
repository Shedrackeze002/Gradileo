import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 5.1 (advertising and its audience). An exam-style question we wrote, in the
// style of a Grade 9 media test, on an advert we invented for a made-up energy bar. The answer is C:
// the advert targets young skaters through pro-skater endorsement, slang and the promise of belonging.

const AD = ['**ZOOMFUEL.** The bar the pros grab before every session.<br>Pro skaters Kai and Ruby land bigger tricks with ZoomFuel.<br>No boring stuff. Just pure energy.<br>**Join the crew.**'];

export default englishExam({
  lesson: 'e9-5-1',
  ...ours('a Grade 9 media test', 'the advert and its product are invented'),
  title: 'Who Is This Advert Really For?',
  thumbnailTitle: 'Advertising Audiences',
  subtitle: 'Techniques and target audience, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: an advert for an invented energy bar called ZoomFuel. We find each technique it uses, see who each one is aimed at, and name the advert’s target audience.',
  intro: [
    'In this video, we solve an exam-style question about advertising and its audience. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 media test, and the advert and its product are invented.',
  ],
  passage: {
    lines: AD,
    by: 'An advert for an invented energy bar',
    say: ['First, read the advert. ZoomFuel. The bar the pros grab before every session. Pro skaters Kai and Ruby land bigger tricks with ZoomFuel. No boring stuff. Just pure energy. Join the crew.'],
  },
  question: {
    prompt: 'Who is this advert **mainly** aimed at, and how does it appeal to them?',
    text: 'Read the advert for ZoomFuel. Who is this advert mainly aimed at, and how does it appeal to them?',
    choices: [
      'Parents, by promising healthy ingredients.',
      'Older adults, by promising a calm, relaxing snack.',
      'Young skaters, through pro-skater endorsement, casual slang and the promise of belonging.',
      'Professional chefs, by explaining how the bar is made.',
    ],
    answer: 2,
    working: '*pros*, *session*, *bigger tricks*, *No boring stuff*, *Join the crew*: all aimed at **young skaters**.',
    say: [
      'Who is this advert mainly aimed at, and how does it appeal to them?',
      'A: Parents, by promising healthy ingredients. B: Older adults, by promising a calm, relaxing snack. C: Young skaters, through pro-skater endorsement, casual slang and the promise of belonging. D: Professional chefs, by explaining how the bar is made.',
    ],
  },
  ask: [
    ['We need the **target audience**', 'We need the advert’s target audience.'],
    ['and **how** it appeals to them', 'And how it appeals to them.'],
  ],
  know: {
    title: 'Advertising techniques',
    md: '**Endorsement**: a celebrity or expert **uses** the product. **Bandwagon**: join everyone else, **belong**. **Emotive** or **slang** language to sound like the audience. **Glittering generalities**: vague, attractive words (*pure*, *amazing*). Every choice of image, word and person shows the **target audience**.',
    say: [
      'Here is the idea we need. An endorsement shows a celebrity or expert using the product. A bandwagon appeal invites you to join everyone else and belong.',
      'Adverts also use slang or emotive language to sound like their audience, and glittering generalities, vague attractive words like pure or amazing. Every choice of word, image and person shows who the target audience is.',
    ],
  },
  plan: [
    ['Find each **technique**', 'Here is the plan. First, find each technique.'],
    ['Ask **who** each one appeals to', 'Second, ask who each one appeals to.'],
    ['Name the **audience**', 'Third, name the audience.'],
  ],
  steps: [
    scene('Step 1: Techniques', [table('t', ['Words', 'Technique', 'Appeals to'], [['*Pro skaters Kai and Ruby*', 'endorsement', 'fans of **skating**'], ['*session*, *No boring stuff*', 'slang, casual tone', '**young** people'], ['*Join the crew*', 'bandwagon, **belonging**', 'people who want to **fit in**']])], [
      { say: 'Step one. Pro skaters Kai and Ruby: an endorsement, aimed at fans of skating.', show: 't.0' },
      { say: 'Session and no boring stuff: slang and a casual tone, which sound like young people talking.', show: 't.1' },
      { say: 'Join the crew: a bandwagon appeal, promising that you will belong.', show: 't.2' },
    ]),
    scene('Step 2: The audience', [quote('p', ['[[good:Pro skaters]]… land [[good:bigger tricks]]… [[good:Join the crew.]]']), text('a', 'Aimed at **young skaters** who want to **belong** → **C**', 'lg')], [
      { say: 'Step two. Every technique points the same way: to young skaters who want to improve and belong. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Nothing about **health**, **calm** or **recipes**', 'Let us check. The advert says nothing about health, calm or recipes.'],
    ['Only **energy**, **tricks** and **belonging**', 'Only energy, tricks and belonging. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Parents **buy** snacks, but no **health** claims here', 'Choice A is the trap. Parents may buy snacks, but the advert makes no health claims.'],
      ['B', '*pure energy* is the **opposite** of calm', 'Choice B: pure energy is the opposite of calm and relaxing.'],
      ['D', 'Nothing about how it is **made**', 'Choice D: nothing explains how the bar is made.'],
    ],
  },
  yourTurn: {
    prompt: 'An advert says: *“Nine out of ten dentists recommend Brightsmile toothpaste.”* Which technique is this?',
    choices: ['expert endorsement', 'bandwagon', 'humour', 'a slippery slope'],
    answer: 0,
    working: 'Experts (**dentists**) back the product: **expert endorsement**.',
    ask: 'An advert says: nine out of ten dentists recommend Brightsmile toothpaste. Which technique is this? A: expert endorsement. B: bandwagon. C: humour. D: a slippery slope.',
    reveal: 'The answer is A, expert endorsement. Dentists are experts on teeth, so their backing makes the toothpaste seem trustworthy.',
  },
  sum: [
    ['Find each **technique** in the advert', 'Here is what to remember. Find each technique in the advert.'],
    ['Ask **who** each one appeals to', 'Ask who each one appeals to.'],
    ['Together they reveal the **target audience**', 'Together, they reveal the target audience. For more on advertising and its audience, watch this lesson’s explainer video on Gradileo.'],
  ],
});
