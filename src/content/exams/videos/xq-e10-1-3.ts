import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 1.3 (setting and mood). An exam-style question we wrote, in the style of a
// Grade 10 reading test, on the opening of Edgar Allan Poe's "The Fall of the House of Usher" (1839),
// which is in the public domain. The answer is B: the setting's words create a gloomy, oppressive mood.

const LINES = ['During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively low in the heavens, I had been passing alone, on horseback, through a singularly dreary tract of country; and at length found myself, as the shades of the evening drew on, within view of the melancholy House of Usher.'];

export default englishExam({
  lesson: 'e10-1-3',
  ...ours('a Grade 10 reading test', 'the story is Edgar Allan Poe’s “The Fall of the House of Usher” (1839), in the public domain'),
  title: 'What Mood Does Poe Create at the House of Usher?',
  thumbnailTitle: 'Setting and Mood',
  subtitle: 'How setting creates mood, step by step',
  summary:
    'An exam-style question on the opening of Edgar Allan Poe’s “The Fall of the House of Usher”, solved one small step at a time: a lone rider approaches a house on a dark autumn evening. We collect the setting words, see the feeling they share, and name the mood.',
  intro: [
    'In this video, we solve an exam-style question about setting and mood. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Poe’s story, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Edgar Allan Poe, “The Fall of the House of Usher” (1839), opening sentence',
    say: ['First, read the opening sentence of the story. During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively low in the heavens, I had been passing alone, on horseback, through a singularly dreary tract of country; and at length found myself, as the shades of the evening drew on, within view of the melancholy House of Usher.'],
  },
  question: {
    prompt: 'What **mood** does the opening sentence create?',
    text: 'Read the opening of “The Fall of the House of Usher”. What mood does the opening sentence create?',
    choices: ['cheerful and lively', 'gloomy and oppressive', 'calm and hopeful', 'funny and playful'],
    answer: 1,
    working: '*dull, dark, and soundless*, *oppressively low*, *dreary*, *shades of the evening*, *melancholy*: **gloom** and **heaviness**.',
    say: ['What mood does the opening sentence create? A: cheerful and lively. B: gloomy and oppressive. C: calm and hopeful. D: funny and playful.'],
  },
  ask: [
    ['**Mood** is the feeling the **reader** gets', 'Mood is the feeling the reader gets from a passage.'],
    ['Which feeling does Poe **build**?', 'We need the feeling Poe builds here.'],
  ],
  know: {
    title: 'Setting, mood and tone',
    md: '**Setting** is the **time**, **place** and **conditions** of a story (weather, light, sound). **Mood** is the **feeling** a passage creates in the **reader** (tense, gloomy, peaceful). **Tone** is the **writer’s** or narrator’s **attitude** (mocking, serious, admiring). Writers build mood through the **details** and **word choices** of the setting.',
    say: [
      'Here is the idea we need. Setting is the time, place and conditions of a story, such as weather, light and sound. Mood is the feeling a passage creates in the reader, such as tense, gloomy or peaceful.',
      'Tone is different. It is the writer’s or narrator’s attitude, such as mocking, serious or admiring. Writers build mood through the details and word choices of the setting.',
    ],
  },
  plan: [
    ['Collect the **setting** words', 'Here is the plan. First, collect the setting words.'],
    ['Find the feeling they **share**', 'Second, find the feeling they share.'],
    ['Name the **mood**', 'Third, name the mood.'],
  ],
  steps: [
    scene('Step 1: Setting words', [table('t', ['Detail', 'Words', 'Feeling'], [['time', '*autumn*, *shades of the evening*', 'things **ending**, growing **dark**'], ['weather', '*clouds hung oppressively low*', '**heavy**, pressing down'], ['place', '*singularly dreary tract*, *melancholy House*', '**dull**, **sad**'], ['sound', '*soundless*', '**eerie** silence']])], [
      { say: 'Step one. Collect the setting words. The time is autumn, at evening, as the light fades: things ending and growing dark.', show: 't.0' },
      { say: 'The clouds hang oppressively low, heavy, as if pressing down.', show: 't.1' },
      { say: 'The country is dreary, the house is melancholy, and the whole day is soundless, an eerie silence.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 2: The mood', [quote('p', ['…a [[bad:dull, dark, and soundless]] day… clouds hung [[bad:oppressively]] low… a singularly [[bad:dreary]] tract… the [[bad:melancholy]] House of Usher.']), text('a', 'Every detail is dark and heavy → **gloomy and oppressive** → **B**', 'lg')], [
      { say: 'Step two. Every detail is dark, heavy and sad. Together, they make us feel gloom and a sense of dread. The mood is gloomy and oppressive. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Not one **bright** or **lively** word', 'Let us check. There is not one bright or lively word in the sentence.'],
    ['so B fits **every** detail', 'So B fits every detail, and it holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'It is **quiet**, but *dreary* and *melancholy* are not **hopeful**', 'Choice C is the trap. The scene is quiet, but dreary and melancholy are not calm or hopeful.'],
      ['A', 'Nothing **lively** here', 'Choice A: nothing here is lively.'],
      ['D', 'Nothing **funny** here', 'Choice D: nothing here is funny.'],
    ],
  },
  yourTurn: {
    prompt: 'What is the difference between **mood** and **tone**? Mood is…',
    choices: ['the writer’s attitude', 'the time and place of the story', 'the feeling the reader gets', 'the main character’s goal'],
    answer: 2,
    working: '**Mood** = the **reader’s** feeling; **tone** = the **writer’s** attitude.',
    ask: 'What is the difference between mood and tone? Mood is: A: the writer’s attitude. B: the time and place of the story. C: the feeling the reader gets. D: the main character’s goal.',
    reveal: 'The answer is C. Mood is the feeling the reader gets, while tone is the writer’s attitude.',
  },
  sum: [
    ['**Mood**: the feeling the reader gets', 'Here is what to remember. Mood is the feeling the reader gets.'],
    ['Find it in the **setting’s** details and words', 'Find it in the details and words of the setting.'],
    ['**Tone** is the writer’s **attitude**', 'And tone is the writer’s attitude. For more on setting and mood, watch this lesson’s explainer video on Gradileo.'],
  ],
});
