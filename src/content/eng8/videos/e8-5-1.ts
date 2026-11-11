import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-5-1',
  lessonId: 'e8-5-1',
  title: 'Film Techniques',
  summary:
    'Film techniques are the choices a director makes to tell a story with pictures and sound. Close-ups show emotion, long and establishing shots show setting, low angles make a subject powerful and high angles make it vulnerable. Lighting sets the mood, diegetic sound is heard by the characters and non-diegetic sound is added for the audience, and fast editing builds tension.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'Film Techniques', subtitle: 'How a scene makes us feel' }],
      lines: [
        { say: 'A film director cannot write, she felt lonely. Instead, they show it, through the camera, the lighting, the sound and the editing.', show: 'title' },
        { say: 'In this video we learn the language of film, so you can explain how a scene shapes what an audience feels.' },
      ],
    },
    {
      chapter: 'What film techniques are',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Film techniques', md: '**Film techniques** are the choices a director makes to tell a story with pictures and sound: **camera** shots and angles, **lighting**, **sound** and **editing**. Each one shapes what the audience feels.' },
      ],
      lines: [
        { say: 'Film techniques are the choices a director makes to tell a story with pictures and sound.', show: 'def' },
        { say: 'They include camera shots and angles, lighting, sound and editing, and each one shapes what the audience feels. Let’s take them one at a time.', focus: 'def' },
      ],
    },
    {
      chapter: 'Shots and angles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shot or angle', 'What we see', 'Usual effect'],
          rows: [
            ['**Close-up**', 'a face or object fills the screen', 'shows emotion or a detail'],
            ['**Long shot**', 'a whole figure in a wide setting', 'shows the setting, or how small they are'],
            ['**Establishing shot**', 'a wide shot at the start of a scene', 'shows where we are'],
            ['**Low angle**', 'the camera looks up', 'the subject seems powerful'],
            ['**High angle**', 'the camera looks down', 'the subject seems small or vulnerable'],
          ],
        },
      ],
      lines: [
        { say: 'In a close-up, a face or object fills the screen, so it shows emotion or an important detail.', show: 't', focus: 't.0' },
        { say: 'A long shot shows a whole figure in a wide setting, so we see the place, or how small the character is in it. An establishing shot is a wide shot at the start of a scene, like a city skyline, that shows where we are.', focus: ['t.1', 't.2'] },
        { say: 'Angles matter too. In a low angle, the camera looks up at the subject, so they seem powerful or threatening.', focus: 't.3' },
        { say: 'In a high angle, the camera looks down, so the subject seems small or vulnerable.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Name it, then explain it',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Name it, then explain it', md: '“This is a close-up” is only half an answer. Say what it shows and how it makes us feel: “The close-up of her **trembling hands** shows how frightened she is, even though she is smiling.”' },
      ],
      lines: [
        { say: 'A common mistake is to name a shot and stop. This is a close-up is only half an answer.', show: 'm' },
        { say: 'Say what the shot shows and how it makes the audience feel. For example: the close-up of her trembling hands shows how frightened she is, even though she is smiling.', focus: 'm' },
      ],
    },
    {
      chapter: 'Lighting, sound and editing',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Lighting:** bright feels safe; **low-key** lighting, with deep shadows, feels mysterious or dangerous.',
            'Warm golden light suggests comfort; cold blue light suggests sadness.',
            '**Diegetic** sound is heard by the characters; **non-diegetic** sound, like the soundtrack, is for us.',
            '**Editing:** fast cuts create tension; a **montage** shows time passing.',
          ],
        },
      ],
      lines: [
        { say: 'Lighting sets the mood. Bright, even lighting feels safe and cheerful. Low-key lighting, with deep shadows, creates mystery or danger, which is why thrillers use it.', show: 'b.0' },
        { say: 'Colour matters too. Warm golden light suggests comfort, and cold blue light suggests sadness or distance.', show: 'b.1' },
        { say: 'Sound comes in two kinds. Diegetic sound comes from inside the story, so the characters can hear it, like a door slamming. Non-diegetic sound, like the soundtrack, is added for the audience only. Tense music that grows louder tells us danger is near.', show: 'b.2' },
        { say: 'Editing is how shots are cut together. Fast cuts during a chase create speed and tension. And a montage is a series of short shots that shows time passing, like weeks of training in a minute.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Early in a film, a family eats dinner in warm, golden light. Later, the same house is shown empty, in cold blue light. What does the change suggest?',
          choices: [
            'The film was shot at a different time of year.',
            'The family has moved to a bigger house.',
            'Nothing: lighting has no meaning.',
            'The family’s happiness has been lost.',
          ],
          answer: 3,
          working: 'Warm golden light suggests comfort; cold blue light suggests sadness or distance. The change shows the mood has turned for the worse.',
        },
      ],
      lines: [
        { say: 'Your turn. Early in a film, a family eats dinner in warm, golden light. Later, the same house is shown empty, in cold blue light. What does the change suggest? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Warm light suggests comfort, and cold blue light suggests sadness. So the change of lighting shows that the family’s happiness has been lost.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            '**Close-ups** show emotion; **long** and **establishing** shots show setting.',
            '**Low angles** make subjects powerful; **high angles** make them vulnerable.',
            '**Low-key** lighting creates danger; warm and cold colours set the mood.',
            '**Diegetic** sound is heard by characters; fast editing builds tension.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Close-ups show emotion, while long shots and establishing shots show the setting.', show: 'sum.0' },
        { say: 'Low angles make a subject seem powerful, and high angles make them seem small or vulnerable.', show: 'sum.1' },
        { say: 'Low-key lighting creates mystery or danger, and warm and cold colours set the mood.', show: 'sum.2' },
        { say: 'Diegetic sound is heard by the characters, non-diegetic sound is for us, and fast editing builds tension.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
