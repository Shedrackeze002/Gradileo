import { englishExam, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 3.4 (fact, opinion and the author's purpose). An exam-style question we
// wrote, in the style of the key stage 2 English reading test, on a leaflet we wrote. The answer is
// B: "the most exciting day out in the whole county" is a judgement that cannot be checked.

const LEAFLET = [
  'Harbour Point Aquarium opened in 2015.',
  'It is the most exciting day out in the whole county!',
  'The aquarium is home to more than 300 kinds of sea creature.',
  'Tickets for children cost £8 on weekdays.',
];

export default englishExam({
  lesson: 'e5-3-4',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question and leaflet by Gradileo',
  verbatim: false,
  title: 'Which Sentence From the Leaflet Is an Opinion?',
  thumbnailTitle: 'Fact or Opinion?',
  subtitle: 'Can it be checked? Step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: four sentences from a leaflet about an aquarium, and only one is an opinion. We test each one by asking whether it could be checked, and spot the words that give opinions away.',
  intro: [
    'In this video, we solve an exam-style reading question about facts and opinions. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its leaflet ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  passage: {
    lines: LEAFLET,
    by: 'From a leaflet written for Gradileo',
    say: ['First, read these sentences from a leaflet. Harbour Point Aquarium opened in twenty fifteen. It is the most exciting day out in the whole county! The aquarium is home to more than 300 kinds of sea creature. Tickets for children cost eight pounds on weekdays.'],
  },
  question: {
    prompt: 'Which sentence from the leaflet is an **opinion**?',
    text: 'Read the sentences from the leaflet about Harbour Point Aquarium. Which sentence from the leaflet is an opinion?',
    choices: ['Harbour Point Aquarium opened in 2015.', 'It is the most exciting day out in the whole county!', 'The aquarium is home to more than 300 kinds of sea creature.', 'Tickets for children cost £8 on weekdays.'],
    answer: 1,
    working: '“Most exciting” is a judgement: people can disagree, and it cannot be checked.',
    say: ['Which sentence from the leaflet is an opinion? Each choice is one of the four sentences, in the same order.'],
  },
  ask: [
    ['Three sentences are **facts**, one is an **opinion**', 'Three of these sentences are facts, and one is an opinion.'],
    ['Find the **opinion**', 'We need to find the opinion.'],
  ],
  know: {
    title: 'Fact and opinion',
    md: 'A **fact** can be **checked** and proved true or false. An **opinion** is what someone **thinks or feels**; people can disagree. Words like **best**, **most exciting**, **beautiful** and **should** often signal opinions.',
    say: [
      'Here is the idea we need. A fact is something that can be checked, and proved true or false.',
      'An opinion is what someone thinks or feels. Other people can disagree with it, and it cannot be proved.',
      'Judging words, like best, most exciting, beautiful or should, often give away an opinion.',
    ],
  },
  plan: [
    ['Ask of each sentence: **could I check it?**', 'Here is the plan. For each sentence, ask: could I check this?'],
    ['Look for **judging words**', 'Then look for judging words.'],
    ['The one that cannot be checked is the **opinion**', 'The sentence that cannot be checked is the opinion.'],
  ],
  steps: [
    scene('Step 1: Could I check it?', [
      table('t', ['Sentence', 'How to check', 'Fact or opinion?'], [['opened in 2015', 'look up the opening date', 'fact'], ['**most exciting** day out', '[[bad:cannot be checked]]', '[[bad:opinion]]'], ['more than 300 kinds', 'count the kinds', 'fact'], ['£8 on weekdays', 'look at the price list', 'fact']]),
    ], [
      { say: 'Step one. Take each sentence and ask how you could check it. Pause and try.', wait: 3 },
      { say: 'Opened in twenty fifteen: you could look up the date. That is a fact.', show: 't.0' },
      { say: 'The most exciting day out in the whole county: how would you check that? You could not. Some people would love it, and others might prefer the beach. That is an opinion.', show: 't.1', focus: 't.1' },
      { say: 'More than 300 kinds of sea creature: you could count them. Fact.', show: 't.2' },
      { say: 'Children’s tickets cost eight pounds: you could check the price list. Fact.', show: 't.3' },
    ]),
    scene('Step 2: The judging words', [quote('p', ['It is the [[theta:most exciting]] day out in the whole county!']), text('n', '**most exciting** is a judgement → **B is the opinion**', 'lg')], [
      { say: 'Step two. The judging words are most exciting. Exciting is a feeling, and the exclamation mark adds to the excitement.', show: 'p' },
      { say: 'So the answer is B.', show: 'n' },
    ]),
  ],
  check: [
    ['Only **B** cannot be checked', 'Let us check. A, C and D can all be checked. Only B cannot.'],
    ['Leaflets mix facts with opinions to **persuade** you', 'This makes sense. A leaflet like this is written to persuade you to visit, so the writer slips in an opinion among the facts.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'A **big number** sounds like boasting', 'Choice C sounds like boasting, but a number can be counted. It is a fact, even if it is a proud one.'],
      ['D', 'Thinking a price is **too high** is an opinion, but the price **itself** is a fact', 'Choice D: you might think eight pounds is too much, which would be your opinion. But the price itself is a fact.'],
      ['A', 'A **date** can always be checked', 'Choice A is a date, and dates can always be checked.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is a **fact**?',
    choices: ['Football is the best sport in the world.', 'Everyone should learn to swim.', 'Summer is the nicest season.', 'Water freezes at 0 °C.'],
    answer: 3,
    working: 'The freezing point of water can be tested; the others are judgements.',
    ask: 'Which of these sentences is a fact?',
    reveal: 'The answer is D. Water freezes at zero degrees Celsius, and you can test it. Best, should and nicest are judging words, so the others are opinions.',
  },
  sum: [
    ['A **fact** can be checked; an **opinion** cannot', 'Here is what to remember. A fact can be checked, and an opinion cannot.'],
    ['Judging words (**best**, **most exciting**, **should**) signal opinions', 'Judging words, like best, most exciting and should, often signal opinions.'],
    ['Persuasive texts **mix** facts and opinions', 'And persuasive texts, like leaflets and adverts, mix facts and opinions together. For more on facts, opinions and the author’s purpose, watch this lesson’s explainer video on Gradileo.'],
  ],
});
