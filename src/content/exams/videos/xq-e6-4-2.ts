import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 4.2 (images and headlines). An exam-style question we wrote, in the style
// of a Grade 6 reading test, on two headlines we wrote about the same invented event. The answer is
// B: "chaos" and "storm" make a calm vote sound violent, so headline 2 creates a dramatic, negative feeling.

const HEADLINES = ['**Headline 1:** Council votes 7–5 to close Park Road pool for repairs', '**Headline 2:** POOL CHAOS! Fury as council slams doors on families', '**The facts:** At a calm meeting, the council voted 7 to 5 to close the pool for three months of repairs.'];

export default englishExam({
  lesson: 'e6-4-2',
  ...ours('a Grade 6 reading test', 'the headlines and the event are invented by Gradileo'),
  title: 'How Does Headline 2 Make Readers Feel About the Pool?',
  thumbnailTitle: 'Reading Headlines',
  subtitle: 'Loaded words in the news, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: two headlines report the same council vote on a swimming pool, and one makes it sound like a disaster. We compare the headlines with the facts, find the loaded words, and describe the feeling they create.',
  intro: [
    'In this video, we solve an exam-style question about how headlines shape what we think. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The headlines and the event are made up.',
  ],
  passage: {
    lines: HEADLINES,
    by: 'Headlines invented for Gradileo',
    say: [
      'First, read the two headlines about the same event. Headline 1: Council votes seven to five to close Park Road pool for repairs. Headline 2: Pool chaos! Fury as council slams doors on families.',
      'And here are the facts. At a calm meeting, the council voted seven to five to close the pool for three months of repairs.',
    ],
  },
  question: {
    prompt: 'How does **Headline 2** try to make readers feel about the council’s decision?',
    text: 'Read the two headlines and the facts about the Park Road pool. How does Headline 2 try to make readers feel about the council’s decision?',
    choices: ['calm and well informed', 'angry and alarmed', 'amused and cheerful', 'grateful to the council'],
    answer: 1,
    working: '“CHAOS”, “Fury” and “slams doors” turn a calm vote about repairs into a dramatic attack on families.',
    say: ['How does Headline 2 try to make readers feel about the council’s decision? A: calm and well informed. B: angry and alarmed. C: amused and cheerful. D: grateful to the council.'],
  },
  ask: [
    ['Both headlines report the **same** event', 'Both headlines report the same event.'],
    ['How does Headline 2’s **wording** shape our feelings?', 'So any difference in how we feel comes from the wording, and the question asks what feeling Headline 2 is aiming for.'],
  ],
  know: {
    title: 'Headlines and loaded words',
    md: 'A **headline** sums up a story and tries to grab attention. **Loaded words** carry strong feelings (*chaos*, *fury*, *slams*) where **neutral** words would not (*votes*, *closes*). Compare the headline with the **facts**.',
    say: [
      'Here is the idea we need. A headline sums up a news story in a few words and tries to grab your attention.',
      'Loaded words carry strong feelings, like chaos, fury or slams. Neutral words, like votes or closes, just report. To judge a headline, compare it with the facts.',
    ],
  },
  plan: [
    ['Compare the headlines with the **facts**', 'Here is the plan. First, compare each headline with the facts.'],
    ['Find the **loaded words** in Headline 2', 'Second, find the loaded words in Headline 2.'],
    ['Name the **feeling** they create', 'Third, name the feeling they create.'],
  ],
  steps: [
    scene('Step 1: Headlines against the facts', [table('t', ['', 'Headline 1', 'Headline 2', 'Facts'], [['the vote', '**votes 7–5**', '“**slams doors**”', 'a vote, 7 to 5'], ['the mood', 'neutral', '“**CHAOS**”, “**Fury**”', 'a **calm** meeting'], ['why', '**for repairs**', 'not given', 'three months of repairs']])], [
      { say: 'Step one. Let us line up the headlines with the facts.', show: 't.0' },
      { say: 'Headline 1 reports the vote exactly, and the reason, repairs. It is neutral.', focus: 't.0' },
      { say: 'Headline 2 calls the meeting chaos and fury, but the facts say it was calm.', show: 't.1', focus: 't.1' },
      { say: 'And Headline 2 leaves out why the pool is closing. Without repairs, it sounds like the council just wants to shut families out.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The loaded words', [quote('p', ['POOL [[bad:CHAOS!]] [[bad:Fury]] as council [[bad:slams doors]] on families']), text('n', 'Shouting **capitals** + loaded words + a missing reason → **angry and alarmed**', 'lg')], [
      { say: 'Step two. Chaos, fury and slams doors are loaded words. Slams doors makes us picture the council shutting families out on purpose, and the capital letters shout at us.', show: 'p' },
      { say: 'Together, they push the reader to feel angry and alarmed. The answer is B.', show: 'n' },
    ]),
  ],
  check: [
    ['Headline 1, with the **same** event, makes us feel **calm**', 'Let us check. Headline 1, about the very same event, makes us feel calm. So the anger comes from Headline 2’s wording, not from the event.'],
    ['Headline 2 **exaggerates** and **leaves out** the reason', 'Headline 2 exaggerates the mood and leaves out the reason. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'That describes **Headline 1**', 'Choice A describes Headline 1, not Headline 2.'],
      ['C', 'An exclamation mark is not **humour**', 'Choice C: an exclamation mark can make writing lively, but nothing here is a joke.'],
      ['D', 'The headline **attacks** the council', 'Choice D is the opposite: the headline attacks the council.'],
    ],
  },
  yourTurn: {
    prompt: 'Which headline is the most **neutral**?',
    choices: ['SHOCK as school bans phones!', 'School introduces new phone rules from Monday', 'Pupils FURIOUS over phone ban disaster', 'Phone ban madness hits school'],
    answer: 1,
    working: '“introduces new rules” just reports; the others use loaded words.',
    ask: 'Which of these headlines is the most neutral?',
    reveal: 'The answer is B. It simply reports what is happening. Shock, furious, disaster and madness are all loaded words.',
  },
  sum: [
    ['Headlines can **shape** how we feel about the same facts', 'Here is what to remember. Headlines can shape how we feel about the same facts.'],
    ['Spot **loaded words**, **capitals** and **missing** information', 'Look for loaded words, shouting capitals and missing information.'],
    ['Always compare the headline with the **facts**', 'And always compare the headline with the facts. For more on images and headlines, watch this lesson’s explainer video on Gradileo.'],
  ],
});
