import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 5.2 (film techniques). An exam-style question we wrote, in the style of a
// Grade 10 media test, on a film scene we describe in words. The answer is C: a low-angle shot looks up
// at the villain, making him seem powerful and threatening.

const SCENE = ['*A film scene:* The camera is placed **low**, near the floor, and **looks up** at the villain as he walks towards it. He seems to tower over the frame. Deep, slow **music** plays, which the characters cannot hear.'];

export default englishExam({
  lesson: 'e10-5-2',
  ...ours('a Grade 10 media test', 'the film scene is described in words, and invented'),
  title: 'Why Is the Camera Looking Up at the Villain?',
  thumbnailTitle: 'Camera Angles',
  subtitle: 'Shots, angles and sound, step by step',
  summary:
    'An exam-style media question, solved one small step at a time, on a film scene described in words: the camera sits near the floor and looks up at an approaching villain. We name the angle, compare it with a high angle, and explain its effect.',
  intro: [
    'In this video, we solve an exam-style question about film techniques. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 media test, and the film scene is described in words.',
  ],
  passage: {
    lines: SCENE,
    by: 'An invented film scene, described in words',
    say: ['First, picture the scene. The camera is placed low, near the floor, and looks up at the villain as he walks towards it. He seems to tower over the frame. Deep, slow music plays, which the characters cannot hear.'],
  },
  question: {
    prompt: 'What is the main effect of filming the villain from this **angle**?',
    text: 'Read the description of the film scene. What is the main effect of filming the villain from this angle?',
    choices: [
      'He seems small and weak.',
      'It shows the whole landscape around him.',
      'He seems powerful and threatening.',
      'It shows what he is thinking.',
    ],
    answer: 2,
    working: 'Camera **low**, looking **up** = a **low-angle** shot: the subject seems **powerful**.',
    say: [
      'What is the main effect of filming the villain from this angle?',
      'A: He seems small and weak. B: It shows the whole landscape around him. C: He seems powerful and threatening. D: It shows what he is thinking.',
    ],
  },
  ask: [
    ['The camera **looks up** at him', 'The camera looks up at the villain.'],
    ['What does that make us **feel** about him?', 'We need the effect of that angle.'],
  ],
  know: {
    title: 'Film techniques',
    md: '**Shots** (how much we see): **long** (a figure in a setting), **medium** (waist up), **close-up** (a face, emotion). **Angles**: **low** angle looks **up**, making a subject **powerful**; **high** angle looks **down**, making them **small** or **weak**; **eye level** is neutral. **Sound**: **diegetic** sound exists **in** the story’s world (a radio, footsteps); **non-diegetic** sound is added **for the audience** (a soundtrack, a narrator).',
    say: [
      'Here is the idea we need. Shots show how much we see: a long shot shows a figure in a setting, a medium shot from the waist up, and a close-up shows a face and its emotion.',
      'Angles matter too. A low angle looks up, making a subject seem powerful. A high angle looks down, making them seem small or weak. And sound can be diegetic, existing inside the story’s world, like a radio, or non-diegetic, added for the audience, like a soundtrack.',
    ],
  },
  plan: [
    ['Name the **angle**', 'Here is the plan. First, name the angle.'],
    ['Recall its **effect**', 'Second, recall its effect.'],
  ],
  steps: [
    scene('Step 1: Name the angle', [table('t', ['Angle', 'Camera', 'Subject seems…'], [['**low** angle', 'below, looking **up**', '[[good:powerful, threatening]]'], ['**high** angle', 'above, looking **down**', 'small, weak'], ['**eye level**', 'straight on', 'neutral']])], [
      { say: 'Step one. The camera is near the floor, looking up. That is a low-angle shot.', show: 't.0', focus: 't.0' },
      { say: 'Compare a high angle, looking down, which makes a subject seem small and weak. And eye level, which is neutral.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The effect', [text('n', 'He **towers** over the frame, and over **us**'), text('a', 'Low angle → **powerful** and **threatening** → **C**', 'lg')], [
      { say: 'Step two. Looking up, we see the villain tower over the frame, and over us, as he comes closer.', show: 'n' },
      { say: 'So the low angle makes him seem powerful and threatening. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The **deep, slow music** adds to the menace', 'Let us check. The deep, slow music adds to the sense of menace.'],
    ['Every choice points to **threat**', 'Every choice points to threat. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'That is a **high** angle, looking down', 'Choice A is the trap. Small and weak is the effect of a high angle, the opposite of this one.'],
      ['B', 'A **long** shot shows the landscape', 'Choice B: a long shot would show the landscape.'],
      ['D', 'An angle cannot show **thoughts**', 'Choice D: a camera angle cannot show his thoughts.'],
    ],
  },
  yourTurn: {
    prompt: 'Music playing from a **radio inside the scene**, which the characters can hear, is…',
    choices: ['non-diegetic sound', 'diegetic sound', 'a voice-over', 'a close-up'],
    answer: 1,
    working: 'It exists **in** the story’s world: **diegetic**.',
    ask: 'Music playing from a radio inside the scene, which the characters can hear, is: A: non-diegetic sound. B: diegetic sound. C: a voice-over. D: a close-up.',
    reveal: 'The answer is B, diegetic sound. It exists inside the story’s world, so the characters can hear it.',
  },
  sum: [
    ['**Low** angle → powerful; **high** angle → weak', 'Here is what to remember. A low angle makes a subject powerful, and a high angle makes them weak.'],
    ['**Close-ups** show emotion', 'Close-ups show emotion.'],
    ['**Diegetic** sound is in the story’s world', 'And diegetic sound is in the story’s world. For more on film techniques, watch this lesson’s explainer video on Gradileo.'],
  ],
});
