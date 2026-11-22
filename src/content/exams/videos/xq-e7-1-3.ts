import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 1.3 (setting and mood). An exam-style question we wrote, in the style of a
// Grade 7 reading test, on a passage we wrote. The answer is A: the cold, the empty platform and the
// flickering light create a lonely, uneasy mood.

const PASSAGE = [
  'The last train had gone. Rain dripped from the station roof onto the empty platform, and a single light flickered above the locked ticket office. Somewhere down the tracks, a dog barked once and then fell silent.',
];

export default englishExam({
  lesson: 'e7-1-3',
  ...ours('a Grade 7 reading test', 'the passage is by Gradileo'),
  title: 'What Mood Does the Station Setting Create?',
  thumbnailTitle: 'Setting and Mood',
  subtitle: 'How setting details create mood, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a passage describes an empty railway station at night, and we decide what mood the setting creates. We collect the details of time, place and weather, ask what feeling each gives, and name the mood they share.',
  intro: [
    'In this video, we solve an exam-style reading question about setting and mood. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: ['First, read the passage. The last train had gone. Rain dripped from the station roof onto the empty platform, and a single light flickered above the locked ticket office. Somewhere down the tracks, a dog barked once and then fell silent.'],
  },
  question: {
    prompt: 'Which word best describes the **mood** the setting creates?',
    text: 'Read the passage about the station. Which word best describes the mood the setting creates?',
    choices: ['lonely and uneasy', 'busy and exciting', 'warm and cosy', 'cheerful and hopeful'],
    answer: 0,
    working: '*last train had gone*, *empty*, *single light flickered*, *locked*, *fell silent*: alone, and slightly threatening.',
    say: ['Which word best describes the mood the setting creates? A: lonely and uneasy. B: busy and exciting. C: warm and cosy. D: cheerful and hopeful.'],
  },
  ask: [
    ['**Mood** is the feeling the **reader** gets', 'Mood is the feeling a passage gives the reader.'],
    ['Which feeling does **this setting** create?', 'We need the feeling this setting creates.'],
  ],
  know: {
    title: 'Setting and mood',
    md: 'The **setting** is **where** and **when** a story happens, including the **weather**, **light** and **sounds**. **Mood** is the **feeling** these details create in the reader. Writers choose details that all push towards one mood.',
    say: [
      'Here is the idea we need. The setting is where and when a story happens, including details like the weather, the light and the sounds.',
      'Mood is the feeling those details create in the reader. Writers usually choose details that all push towards one mood.',
    ],
  },
  plan: [
    ['Collect the **setting details**', 'Here is the plan. First, collect the setting details.'],
    ['Ask what **feeling** each one gives', 'Second, ask what feeling each one gives.'],
    ['Name the **shared** mood', 'Third, name the mood they share.'],
  ],
  steps: [
    scene('Step 1: The details and their feelings', [table('t', ['Detail', 'Feeling'], [['the **last train had gone**', 'stuck, **left behind**'], ['rain on an **empty** platform', '**alone**, cold'], ['a **single** light **flickered**', '**uneasy**, it might go out'], ['a **locked** office', 'no help'], ['a dog barked, then **fell silent**', '**something** is out there']])], [
      { say: 'Step one. Pause and pick out the details of the setting.', wait: 3 },
      { say: 'The last train had gone, so nobody can leave. Rain falls on an empty platform: cold and alone.', show: ['t.0', 't.1'] },
      { say: 'A single light flickers, as if it might go out. The ticket office is locked, so there is no help.', show: ['t.2', 't.3'] },
      { say: 'And a dog barks once, then falls silent. We wonder what stopped it.', show: 't.4', focus: 't.4' },
    ]),
    scene('Step 2: The shared mood', [text('a', 'alone + something not quite right → **lonely and uneasy**: **A**', 'lg')], [
      { say: 'Step two. The details share two feelings: being alone, and something not being quite right. Together, that is lonely and uneasy. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['No **people**, no **warmth**, no **noise** of a busy station', 'Let us check. There are no people, no warmth, and none of the noise of a busy station.'],
    ['Every detail pushes towards **lonely** and **uneasy**', 'Every detail pushes the same way. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Stations are often busy, but **this one** is empty', 'Choice B is the trap. Stations are often busy, but this one is empty.'],
      ['C', 'Rain and a light could be cosy **indoors**, not here', 'Choice C: rain and a lamp could feel cosy from inside a warm room, but here we are out in it.'],
      ['D', 'Nothing **hopeful** happens', 'Choice D: nothing hopeful happens.'],
    ],
  },
  yourTurn: {
    prompt: 'Which detail would best create a **peaceful** mood?',
    choices: ['Thunder crashed over the black hills.', 'Sirens wailed in the distance.', 'Sunlight drifted across the still, green lake.', 'Glass shattered somewhere downstairs.'],
    answer: 2,
    working: '*Sunlight*, *drifted*, *still* and *green* are all calm.',
    ask: 'Which detail would best create a peaceful mood? A: Thunder crashed over the black hills. B: Sirens wailed in the distance. C: Sunlight drifted across the still, green lake. D: Glass shattered somewhere downstairs.',
    reveal: 'The answer is C. Sunlight, drifting, a still and green lake: every word is calm. The others are loud or alarming.',
  },
  sum: [
    ['**Setting**: where, when, weather, light and sound', 'Here is what to remember. Setting includes where, when, the weather, the light and the sounds.'],
    ['**Mood** is the feeling those details create', 'Mood is the feeling those details create in the reader.'],
    ['Collect the details and find the feeling they **share**', 'Collect the details and find the feeling they share. For more on setting and mood, watch this lesson’s explainer video on Gradileo.'],
  ],
});
