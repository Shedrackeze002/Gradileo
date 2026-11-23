import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 5.1 (film techniques). An exam-style question we wrote, in the style of a
// Grade 8 media test, on a scene described in words. The answer is A: a low-angle shot looks up at
// the character, making them seem powerful and threatening.

const SCENE = ['**Shot:** The camera is placed near the floor, looking **up** at the headmaster as he stands in the doorway. Thunder rumbles; the hall light behind him leaves his face in shadow.'];

export default englishExam({
  lesson: 'e8-5-1',
  ...ours('a Grade 8 media test', 'the film scene is invented by Gradileo'),
  title: 'What Effect Does the Low-Angle Shot Create?',
  thumbnailTitle: 'Camera Angles',
  subtitle: 'Shots, angles, lighting and sound, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: a film shows a headmaster from a camera near the floor, lit from behind, with thunder on the soundtrack. We learn the main camera angles, work out how each choice makes us feel, and explain the effect of the low angle.',
  intro: [
    'In this video, we solve an exam-style media question about film techniques. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 media test. The film scene is made up.',
  ],
  passage: {
    lines: SCENE,
    by: 'A film scene described for Gradileo',
    say: ['First, read the description of the shot. The camera is placed near the floor, looking up at the headmaster as he stands in the doorway. Thunder rumbles; the hall light behind him leaves his face in shadow.'],
  },
  question: {
    prompt: 'What effect does the **low-angle shot** most likely create?',
    text: 'Read the description of the film shot. What effect does the low-angle shot most likely create?',
    choices: ['It makes the headmaster seem powerful and threatening.', 'It makes the headmaster seem small and weak.', 'It shows the whole school building.', 'It makes the scene feel calm and friendly.'],
    answer: 0,
    working: 'Looking **up** at someone makes them seem **bigger** and **stronger**; shadow and thunder add **threat**.',
    say: ['What effect does the low-angle shot most likely create? A: It makes the headmaster seem powerful and threatening. B: It makes the headmaster seem small and weak. C: It shows the whole school building. D: It makes the scene feel calm and friendly.'],
  },
  ask: [
    ['The camera looks **up** at the character', 'The camera looks up at the headmaster.'],
    ['What **effect** does that have?', 'We need the effect that creates.'],
  ],
  know: {
    title: 'Camera shots and angles',
    md: '**Close-up**: a face, to show **emotion**. **Long shot**: the whole figure and **setting**. **Low angle**: camera looks **up**, making a character seem **powerful**. **High angle**: camera looks **down**, making them seem **small** or **vulnerable**. **Lighting** and **sound** add to the mood.',
    say: [
      'Here is the idea we need. A close-up shows a face, to show emotion. A long shot shows the whole figure and the setting.',
      'A low angle looks up at a character, making them seem powerful. A high angle looks down, making them seem small or vulnerable. Lighting and sound add to the mood.',
    ],
  },
  plan: [
    ['Where is the **camera**?', 'Here is the plan. First, where is the camera?'],
    ['What do **lighting** and **sound** add?', 'Second, what do the lighting and sound add?'],
    ['Put it together: the **effect**', 'Third, put it together and name the effect.'],
  ],
  steps: [
    scene('Step 1: The choices the director made', [table('t', ['Technique', 'Effect on us'], [['camera near the floor, looking **up**', 'he looms **over** us: **powerful**'], ['face in **shadow**, light behind', 'we cannot read him: **mysterious**, **menacing**'], ['**thunder**', 'danger, **threat**']])], [
      { say: 'Step one. The camera is near the floor, looking up. He looms over us, so he seems powerful, and we feel small.', show: 't.0' },
      { say: 'His face is in shadow, so we cannot read his expression. That makes him mysterious and menacing.', show: 't.1' },
      { say: 'And thunder rumbles, adding a sense of danger.', show: 't.2' },
    ]),
    scene('Step 2: The effect', [text('a', 'Low angle + shadow + thunder → **powerful and threatening**: **A**', 'lg')], [
      { say: 'Step two. All three choices work together. The headmaster seems powerful and threatening. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['A **high** angle would do the **opposite**', 'Let us check. A high angle, looking down, would make him seem small. That is choice B, the opposite.'],
    ['The low angle points to **power**', 'The low angle points to power. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'That is the effect of a **high** angle', 'Choice B is the trap. It describes a high angle, looking down.'],
      ['C', 'That is a **long** shot of the setting', 'Choice C describes a long shot of the setting.'],
      ['D', 'Thunder and shadow are not **calm**', 'Choice D: thunder and shadow are anything but calm.'],
    ],
  },
  yourTurn: {
    prompt: 'A director wants the audience to see a character’s **tears** and fear clearly. Which shot is best?',
    choices: ['a close-up', 'a long shot', 'a high-angle shot of a crowd', 'an aerial shot of the city'],
    answer: 0,
    working: 'A **close-up** fills the screen with the **face**.',
    ask: 'A director wants the audience to see a character’s tears and fear clearly. Which shot is best? A: a close-up. B: a long shot. C: a high-angle shot of a crowd. D: an aerial shot of the city.',
    reveal: 'The answer is A, a close-up. It fills the screen with the face, so every tear and flicker of fear is visible.',
  },
  sum: [
    ['**Low angle** = powerful · **high angle** = small or vulnerable', 'Here is what to remember. A low angle makes a character seem powerful, and a high angle makes them seem small.'],
    ['**Close-up** for emotion · **long shot** for setting', 'A close-up shows emotion, and a long shot shows the setting.'],
    ['Explain how **camera**, **lighting** and **sound** work **together**', 'Explain how camera, lighting and sound work together. For more on film techniques, watch this lesson’s explainer video on Gradileo.'],
  ],
});
