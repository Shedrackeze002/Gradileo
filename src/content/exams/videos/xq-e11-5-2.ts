import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 5.2 (documentary). An exam-style media question we wrote, in the style of a
// Grade 11 media test, on a documentary scene we describe in words. The answer is A: slow, sad music over
// empty buildings steers viewers to feel loss and sympathy before any facts are given.

const SCENE = ['*A documentary scene:* Slow, sad **piano music** plays over footage of an **empty factory**: broken windows, rusting machines, a calendar still showing the day it closed. A **voice-over** says: “Once, two thousand people worked here.”'];

export default englishExam({
  lesson: 'e11-5-2',
  ...ours('a Grade 11 media test', 'the documentary scene is described in words, and invented'),
  title: 'How Does This Documentary Steer Our Feelings?',
  thumbnailTitle: 'Documentary Techniques',
  subtitle: 'Music, footage and voice-over, step by step',
  summary:
    'An exam-style media question, solved one small step at a time, on a documentary scene described in words: sad piano music over an abandoned factory. We list the techniques, see what each one does, and explain their combined effect on viewers.',
  intro: [
    'In this video, we solve an exam-style question about documentary techniques. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 media test, and the documentary scene is described in words.',
  ],
  passage: {
    lines: SCENE,
    by: 'An invented documentary scene, described in words',
    say: ['First, picture the scene. Slow, sad piano music plays over footage of an empty factory: broken windows, rusting machines, a calendar still showing the day it closed. A voice-over says: Once, two thousand people worked here.'],
  },
  question: {
    prompt: 'What is the main **effect** of combining the sad **music** with this **footage**?',
    text: 'Read the description of the documentary scene. What is the main effect of combining the sad music with this footage?',
    choices: [
      'It makes viewers feel loss and sympathy before any facts are given.',
      'It gives a balanced view of why the factory closed.',
      'It proves that the factory was badly run.',
      'It entertains viewers with a cheerful mood.',
    ],
    answer: 0,
    working: 'Sad music + **ruins** + *Once…*: an **emotional** frame of **loss**, set **before** the argument.',
    say: [
      'What is the main effect of combining the sad music with this footage?',
      'A: It makes viewers feel loss and sympathy before any facts are given. B: It gives a balanced view of why the factory closed. C: It proves that the factory was badly run. D: It entertains viewers with a cheerful mood.',
    ],
  },
  ask: [
    ['Documentaries **persuade**, not only inform', 'Documentaries persuade, as well as inform.'],
    ['What do music and footage **do** here?', 'We need the effect of the music and footage together.'],
  ],
  know: {
    title: 'Documentary techniques',
    md: 'Documentaries shape viewers through **interviews** (whose voices we hear), **voice-over** (a narrator guiding interpretation), **archival footage** (real material from the past), **reconstruction** (actors re-enacting events), **music** (setting the mood), and **editing** (what is shown, in what order). Each choice can **persuade**, even when every fact is true.',
    say: [
      'Here is the idea we need. Documentaries shape viewers through interviews, which decide whose voices we hear; voice-over, a narrator guiding our interpretation; archival footage, real material from the past; reconstruction, actors re-enacting events; music, which sets the mood; and editing, what is shown and in what order.',
      'Each choice can persuade, even when every fact is true.',
    ],
  },
  plan: [
    ['List the **techniques**', 'Here is the plan. First, list the techniques.'],
    ['Find their **combined effect**', 'Second, find their combined effect.'],
  ],
  steps: [
    scene('Step 1: The techniques', [table('t', ['Technique', 'Detail', 'Effect'], [['music', 'slow, sad **piano**', 'mood of **sorrow**'], ['footage', '**broken** windows, **rusting** machines, an old **calendar**', '**decay**, time frozen'], ['voice-over', '*Once, two thousand people worked here.*', '**lost** jobs, lost lives']])], [
      { say: 'Step one. The slow, sad piano sets a mood of sorrow.', show: 't.0' },
      { say: 'The footage shows decay: broken windows, rusting machines, and a calendar frozen on the day it closed.', show: 't.1' },
      { say: 'And the voice-over, once, two thousand people worked here, reminds us of the jobs and lives lost.', show: 't.2' },
    ]),
    scene('Step 2: The combined effect', [text('a', 'We feel **loss** and **sympathy** before any argument → **A**', 'lg')], [
      { say: 'Step two. Together, they make us feel loss and sympathy before any facts or reasons are given. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['Have we been told **why** it closed? No', 'Let us check. Have we been told why the factory closed? No.'],
    ['Yet we already **feel** something: that is persuasion', 'Yet we already feel something. That is the persuasive power of the techniques. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Documentaries **seem** neutral, but music adds **emotion**', 'Choice B is the trap. Documentaries can seem neutral, but sad music adds emotion, not balance.'],
      ['C', 'No **evidence** about management', 'Choice C: there is no evidence about how it was run.'],
      ['D', 'The mood is **sad**', 'Choice D: the mood is sad, not cheerful.'],
    ],
  },
  yourTurn: {
    prompt: 'When a documentary uses **actors** to re-enact a past event, the technique is called…',
    choices: ['archival footage', 'reconstruction', 'voice-over', 'an interview'],
    answer: 1,
    working: 'Actors **rebuild** the event: **reconstruction**.',
    ask: 'When a documentary uses actors to re-enact a past event, the technique is called: A: archival footage. B: reconstruction. C: voice-over. D: an interview.',
    reveal: 'The answer is B, reconstruction. Actors re-create the event, which can be vivid, but is not real footage.',
  },
  sum: [
    ['Documentaries use **music**, **footage**, **voice-over**, **editing**', 'Here is what to remember. Documentaries use music, footage, voice-over and editing.'],
    ['Each can **persuade**', 'Each can persuade.'],
    ['Ask how you **feel**, and **why**', 'So ask how you feel, and why. For more on documentary, watch this lesson’s explainer video on Gradileo.'],
  ],
});
