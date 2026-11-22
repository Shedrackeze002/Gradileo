import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 5.3 (propaganda and misinformation). An exam-style media question we wrote,
// in the style of a Grade 12 media test, on a wartime poster slogan we made up. The answer is A: "Join the
// millions…" is the bandwagon technique.

export default englishExam({
  lesson: 'e12-5-3',
  ...ours('a Grade 12 media literacy test'),
  title: 'Which Propaganda Technique Is “Join the Millions”?',
  thumbnailTitle: 'Propaganda Techniques',
  subtitle: 'Propaganda and misinformation, step by step',
  summary:
    'An exam-style media question, solved one small step at a time. A wartime poster tells readers to join the millions who have already bought war bonds. We look at what the slogan appeals to, and name the propaganda technique.',
  intro: [
    'In this video, we solve an exam-style question about propaganda. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 media literacy test.',
  ],
  question: {
    prompt: 'A wartime poster says: *“Join the millions of loyal citizens who have already bought war bonds!”* Which **propaganda technique** does it mainly use?',
    text: 'A wartime poster says: Join the millions of loyal citizens who have already bought war bonds! Which propaganda technique does it mainly use?',
    choices: ['bandwagon', 'testimonial', 'name-calling', 'card stacking'],
    answer: 0,
    working: '*Join the millions… already*: **everyone** is doing it, so you should too → **bandwagon**.',
    say: [
      'A wartime poster says: Join the millions of loyal citizens who have already bought war bonds! Which propaganda technique does it mainly use?',
      'A: bandwagon. B: testimonial. C: name-calling. D: card stacking.',
    ],
  },
  ask: [
    ['A poster wants people to **act**', 'The poster wants people to buy war bonds.'],
    ['Which **technique** does it use?', 'We need to name the propaganda technique.'],
  ],
  know: {
    title: 'Propaganda techniques',
    md: '**Propaganda** spreads ideas to sway people, often by emotion rather than evidence. **Bandwagon**: everyone is doing it, so join in. **Testimonial**: a famous or trusted person endorses it. **Name-calling**: attach a negative label to opponents. **Glittering generalities**: vague, feel-good words (*freedom*, *honour*). **Card stacking**: show only the facts that help. **Fear**: warn of disaster unless you act.',
    say: [
      'Here is the idea we need. Propaganda spreads ideas to sway people, often by emotion rather than evidence. Bandwagon says everyone is doing it, so join in. Testimonial uses a famous or trusted person to endorse it. Name-calling attaches a negative label to opponents.',
      'Glittering generalities use vague, feel-good words like freedom or honour. Card stacking shows only the facts that help. And fear warns of disaster unless you act.',
    ],
  },
  plan: [
    ['Find the **key words**', 'Here is the plan. First, find the key words.'],
    ['What do they **appeal** to?', 'Second, what do they appeal to?'],
    ['Name the **technique**', 'Third, name the technique.'],
  ],
  steps: [
    scene('Step 1: Key words', [quote('p', ['[[good:Join the millions]] of loyal citizens who have [[good:already]] bought war bonds!']), table('t', ['Words', 'Suggests'], [['*Join*', 'become part of a **group**'], ['*the millions*', '**everyone** is doing it'], ['*already*', 'you are **behind**']])], [
      { say: 'Step one. Join: become part of a group. The millions: everyone is doing it.', show: ['p', 't.0', 't.1'] },
      { say: 'Already: they have done it, and you have not yet. You are falling behind.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The technique', [text('e', 'Appeal: **don’t be left out**; follow the crowd'), text('a', 'Everyone is doing it → **bandwagon** → **A**', 'lg')], [
      { say: 'Step two. The appeal is to our wish to belong and not be left out. It gives no evidence, just the crowd.', show: 'e' },
      { say: 'That is the bandwagon technique. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['No famous **person**, no **insults**, no selected **facts**', 'Let us check. There is no famous person, no insult, and no selected facts.'],
    ['just the **crowd**', 'Just the crowd. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '*loyal citizens* are a **crowd**, not one trusted person', 'Choice B is the trap. Loyal citizens sounds like an endorsement, but it is a crowd, not one trusted person.'],
      ['C', 'Nobody is **insulted**', 'Choice C: nobody is insulted.'],
      ['D', 'No **facts** are presented at all', 'Choice D: no facts are presented at all.'],
    ],
  },
  yourTurn: {
    prompt: 'A viral photo claims to show *last week’s* flood, but a reverse image search finds it posted online five years ago. What does this show?',
    choices: ['The flood never happened anywhere.', 'The photo is a painting.', 'The photo is real but has been taken out of context.', 'Reverse image search does not work.'],
    answer: 2,
    working: 'A **real** photo, a **false** date: **out of context**.',
    ask: 'A viral photo claims to show last week’s flood, but a reverse image search finds it posted online five years ago. What does this show? A: The flood never happened anywhere. B: The photo is a painting. C: The photo is real but has been taken out of context. D: Reverse image search does not work.',
    reveal: 'The answer is C. The photo is real, but it shows an older event. Using it for last week’s flood takes it out of context, a common kind of misinformation.',
  },
  sum: [
    ['**Bandwagon**: everyone is doing it', 'Here is what to remember. Bandwagon says everyone is doing it.'],
    ['Propaganda uses **emotion** over **evidence**', 'Propaganda uses emotion over evidence.'],
    ['Test a claim: **source**, **evidence**, **context**', 'And test a claim in digital media by its source, evidence and context. For more on propaganda and misinformation, watch this lesson’s explainer video on Gradileo.'],
  ],
});
