import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 5.3 (advertising). An exam-style question we wrote, in the style of a Grade 10
// media test, on an invented advert. The answer is A: "Only 50 left" and "ends at midnight" create
// scarcity and urgency, pushing people to buy before they think.

const AD = ['**AURA X2 HEADPHONES**<br>**Only 50 left!** Offer **ends at midnight.**<br>Don’t miss out. Order **now**.'];

export default englishExam({
  lesson: 'e10-5-3',
  ...ours('a Grade 10 media test', 'the advert and product are invented'),
  title: 'Which Technique Does This Advert Use?',
  thumbnailTitle: 'Scarcity and Urgency',
  subtitle: 'Persuasive techniques in advertising, step by step',
  summary:
    'An exam-style media question, solved one small step at a time, on an invented advert for headphones: only fifty left, and the offer ends at midnight. We find the key phrases, name the technique, and explain why it works on buyers.',
  intro: [
    'In this video, we solve an exam-style question about advertising techniques. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 media test, and the advert and product are invented.',
  ],
  passage: {
    lines: AD,
    by: 'An invented advert',
    say: ['First, read the advert. Aura X two headphones. Only fifty left! Offer ends at midnight. Don’t miss out. Order now.'],
  },
  question: {
    prompt: 'Which persuasive technique does this advert **mainly** use?',
    text: 'Read the advert. Which persuasive technique does this advert mainly use?',
    choices: ['scarcity and urgency', 'celebrity endorsement', 'humour', 'expert testimony'],
    answer: 0,
    working: '*Only 50 left*, *ends at midnight*, *now*: **few** left and **little time**: **scarcity** and **urgency**.',
    say: ['Which persuasive technique does this advert mainly use? A: scarcity and urgency. B: celebrity endorsement. C: humour. D: expert testimony.'],
  },
  ask: [
    ['Adverts use **techniques** to persuade', 'Adverts use techniques to persuade us.'],
    ['Which one does **this** advert use?', 'We need the main one in this advert.'],
  ],
  know: {
    title: 'Advertising techniques',
    md: '**Scarcity**: *only a few left*. **Urgency**: *ends today*, *act now*. **Bandwagon**: *everyone has one*. **Endorsement**: a **celebrity** or **expert** recommends it. **Emotional appeal**: links the product to happiness, love, fear. **Glittering generalities**: vague praise (*amazing*, *the best*). Every advert has a **target audience**, shown by its images, words and where it appears.',
    say: [
      'Here is the idea we need. Scarcity says only a few are left. Urgency says act now, or the offer ends today. A bandwagon appeal says everyone has one. An endorsement has a celebrity or expert recommend the product.',
      'An emotional appeal links the product to happiness, love or fear, and glittering generalities use vague praise like amazing or the best. Every advert has a target audience, shown by its images, words and where it appears.',
    ],
  },
  plan: [
    ['Find the **key phrases**', 'Here is the plan. First, find the key phrases.'],
    ['Name the **technique**', 'Second, name the technique.'],
    ['Explain **why** it works', 'Third, explain why it works.'],
  ],
  steps: [
    scene('Step 1: Key phrases', [quote('p', ['[[bad:Only 50 left!]] Offer [[bad:ends at midnight.]]', 'Don’t miss out. Order [[bad:now]].']), table('t', ['Phrase', 'Message'], [['*Only 50 left*', 'there are **few** (scarcity)'], ['*ends at midnight*, *now*', 'there is **little time** (urgency)']])], [
      { say: 'Step one. Only fifty left tells us there are few. That is scarcity.', show: ['p', 't.0'] },
      { say: 'Ends at midnight, and order now, tell us there is little time. That is urgency.', show: 't.1' },
    ]),
    scene('Step 2: Why it works', [text('n', 'Fear of **missing out** pushes people to buy **before thinking**'), text('a', 'Scarcity and urgency → **A**', 'lg')], [
      { say: 'Step two. Why does this work? We fear missing out, so we rush to buy before we have time to think about whether we need it.', show: 'n' },
      { say: 'The technique is scarcity and urgency. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['No **person**, **joke** or **expert** appears', 'Let us check. No person, joke or expert appears in the advert.'],
    ['Only **limits** on number and time', 'Only limits on number and time. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'No **celebrity** is named', 'Choice B is the trap. Celebrity adverts are common for headphones, but no celebrity appears here.'],
      ['C', 'Nothing **funny**', 'Choice C: nothing here is funny.'],
      ['D', 'No **expert** is quoted', 'Choice D: no expert is quoted.'],
    ],
  },
  yourTurn: {
    prompt: 'An advert says: *“Retire in comfort. Plan your pension with us today.”* Who is its **target audience**?',
    choices: ['teenagers', 'young children', 'people nearing retirement', 'university students'],
    answer: 2,
    working: '*Retire*, *pension*: people **close to retiring**.',
    ask: 'An advert says: Retire in comfort. Plan your pension with us today. Who is its target audience? A: teenagers. B: young children. C: people nearing retirement. D: university students.',
    reveal: 'The answer is C. Words like retire and pension are aimed at people nearing retirement.',
  },
  sum: [
    ['**Scarcity**: few left · **Urgency**: little time', 'Here is what to remember. Scarcity says few are left, and urgency says there is little time.'],
    ['They work through fear of **missing out**', 'They work through the fear of missing out.'],
    ['Words and images reveal the **target audience**', 'And an advert’s words and images reveal its target audience. For more on advertising, watch this lesson’s explainer video on Gradileo.'],
  ],
});
