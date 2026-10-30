import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-1-3',
  lessonId: 'e10-1-3',
  title: 'Setting and Mood',
  summary:
    'Setting is the time, place and social world of a story. Writers use diction, sensory detail, imagery and rhythm to build mood, the feeling a passage creates in the reader, which is different from tone, the narrator’s attitude.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Setting and Mood', subtitle: 'How a place makes you feel' }],
      lines: [
        { say: 'Before anything happens in Edgar Allan Poe’s “The Fall of the House of Usher”, you already know that something terrible will.', show: 'title' },
        { say: 'No ghost has appeared and no one has been hurt. The feeling comes entirely from the setting and the words chosen to describe it. In this lesson, you will learn how writers use setting to create mood.' },
      ],
    },
    {
      chapter: 'Setting and mood',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'set', tone: 'definition', title: 'Setting', md: 'Where and when a story takes place: the place, the time and the social world of the characters.' },
        { kind: 'callout', id: 'mood', tone: 'definition', title: 'Mood', md: 'The feeling a passage creates in the **reader**. It is also called the atmosphere.' },
      ],
      lines: [
        { say: 'The setting is where and when a story takes place: the place, the time, and the social world the characters live in.', show: 'set' },
        { say: 'Setting is more than a backdrop. In “To Build a Fire”, the Yukon cold is the force the main character struggles against, so the setting acts almost like an antagonist.', focus: 'set' },
        { say: 'Mood is the feeling a passage creates in the reader, such as gloom, fear, calm or joy.', show: 'mood', focus: 'mood' },
      ],
    },
    {
      chapter: 'How writers build mood',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Diction**: word choice, such as “dreary” and “gloom”',
            '**Sensory details**: sights, sounds, smells, touch and taste',
            '**Imagery and setting**: weather, light, time of day',
            '**Sentence rhythm**: long and slow, or short and sharp',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Name the mood with a feeling', md: '“Rainy” describes the setting. “Gloomy” describes the mood.' },
      ],
      lines: [
        { say: 'Writers build mood in four main ways. The first is diction, the choice of words, like dreary, melancholy and gloom in Poe’s opening.', show: 'b.0', focus: 'b.0' },
        { say: 'The second is sensory detail, what can be seen, heard, smelled, felt and tasted.', show: 'b.1', focus: 'b.1' },
        { say: 'The third is imagery and setting, such as the weather and the light. The fourth is sentence rhythm.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
        { say: 'When you name a mood, use a word for a feeling. Rainy describes the setting, but gloomy describes the mood.', show: 'tip', focus: 'tip' },
      ],
    },
    {
      chapter: 'Which word creates the mood?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['She stood by the window and looked out dully at a gray cat walking a gray fence in a gray backyard.'], by: 'O. Henry, “The Gift of the Magi”' },
        { kind: 'text', id: 'ans', size: 'md', md: '“Gray” is repeated three times, so it creates the **dreary** mood.' },
      ],
      lines: [
        { say: 'Della has only one dollar and eighty-seven cents to buy a present. She looks out of her window.', show: 'q' },
        { say: 'Which word does the most to create the dreary mood: window, cat, gray or fence?' },
        { say: 'Window, cat and fence only name things. But gray is repeated three times in one short phrase, draining the view of colour.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Mixing up tone and mood', md: '**Tone** is the narrator’s attitude: how the narrator sounds. **Mood** is how the reader feels. A calm narrator can leave the reader horrified.' },
      ],
      lines: [
        { say: 'Here is a common mistake: mixing up tone and mood.', show: 'm' },
        { say: 'Tone is the narrator’s attitude. Mood is how the reader feels. Montresor in “The Cask of Amontillado” describes his revenge calmly, yet the reader is chilled. The calmer he sounds, the more frightening he becomes.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A narrator describes a cruel plan in a calm, satisfied voice, and the reader feels chilled. What word names the narrator’s calm attitude?',
          choices: ['Tone', 'Mood', 'Setting', 'Theme'],
          answer: 0,
          working: 'The narrator’s attitude is the tone. The chill the reader feels is the mood.',
        },
      ],
      lines: [
        { say: 'Your turn. A narrator describes a cruel plan in a calm, satisfied voice, and the reader feels chilled. What word names the narrator’s calm attitude? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, tone. The narrator’s attitude is the tone, and the chill the reader feels is the mood.', show: 'q2.answer' },
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
            'Setting is the time, place and social world of a story.',
            'Mood is the reader’s feeling, built from diction, sensory detail, imagery and rhythm.',
            'Tone is the narrator’s attitude, and it can differ from the mood.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Setting is the time, place and social world of a story.', show: 'sum.0' },
        { say: 'Mood is the feeling a passage creates in the reader, and you can point to the exact words that carry it.', show: 'sum.1' },
        { say: 'Tone is the narrator’s attitude, and it can be very different from the mood.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
