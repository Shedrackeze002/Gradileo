import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-1-3',
  lessonId: 'e7-1-3',
  title: 'Setting and Mood',
  summary:
    'The setting is the time, place and society of a story. It can cause the conflict, decide what is possible and echo a character’s feelings, and details of the setting create the mood, the feeling a passage gives the reader.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Setting and Mood', subtitle: 'More than a background' }],
      lines: [
        { say: 'Where and when a story happens is never just a background.', show: 'title' },
        { say: 'In this video we see how the setting can shape everything that happens in a story, and how writers use its details to create a mood.' },
      ],
    },
    {
      chapter: 'What setting is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Setting', md: 'The **setting** is the time and place of a story. It includes the physical **place**, the **time** (night, winter, long ago) and the **society**: its rules and customs.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['It can **be the conflict**: a blizzard, a flood, a desert.', 'It **decides what is possible**: long ago, a stranded character could not phone for help.', 'It can **echo a feeling**: an empty grey beach mirrors loneliness.'],
        },
      ],
      lines: [
        { say: 'The setting is the time and place of a story. It includes the physical place, like a desert, a city or a ship, and the time: night, winter, or long ago.', show: 'def' },
        { say: 'It also includes the society the characters live in, with its rules and customs.', focus: 'def' },
        { say: 'A setting shapes a story in three main ways. First, it can be the conflict. A blizzard or a flood puts characters in danger.', show: 'b.0' },
        { say: 'Second, it decides what is possible. More than a hundred years ago there were no phones, so a character stranded on a farm could not just call for help.', show: 'b.1' },
        { say: 'And third, it can echo a character’s feelings. An empty grey beach can mirror a character’s loneliness.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Setting as the problem',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Nia shook the bottle. Empty.', 'In every direction the sand stretched to the horizon, shimmering in the heat. The nearest well was a day’s walk away.'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The setting **causes the conflict**: Nia must survive the desert.' },
      ],
      lines: [
        { say: 'Here is a setting at work. Nia’s bottle is empty.', show: 'q.0' },
        { say: 'The place is a desert, the heat is fierce, and the nearest well is a day’s walk away.', show: 'q.1', focus: 'q.1' },
        { say: 'So the setting itself is the danger. It causes the conflict: Nia against nature.', show: 'a' },
      ],
    },
    {
      chapter: 'Setting and mood',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mood', md: 'The **mood** of a passage is the feeling it gives the reader: peaceful, tense, gloomy, joyful or eerie.' },
        {
          kind: 'table',
          id: 't',
          head: ['Details', 'Mood they often create'],
          rows: [
            ['warm light, gentle sounds, slow water', 'peaceful'],
            ['silence, a flickering light, something moving', 'tense'],
            ['fog, bare trees, cold rain', 'gloomy'],
            ['music, laughter, bright colours', 'joyful'],
          ],
        },
      ],
      lines: [
        { say: 'The mood of a passage is the feeling it gives the reader. Writers create it mainly through the details of the setting.', show: 'def' },
        { say: 'Warm light and gentle sounds feel peaceful. Silence, a flickering light, and something moving in the dark feel tense.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Fog, bare trees and cold rain feel gloomy, and music, laughter and bright colours feel joyful.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Mood is not tone',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Mood is not tone', md: '**Mood** is how the passage makes the *reader* feel. **Tone** is the *writer’s* or speaker’s attitude.' },
      ],
      lines: [
        { say: 'Do not mix up mood and tone. Mood is how the passage makes the reader feel.', show: 'm' },
        { say: 'Tone is the writer’s or speaker’s attitude, which you will meet in the poetry unit.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Every clock in the house had stopped at seven minutes past four. Dust lay thick on the wedding cake, and the curtains had not been opened in years.” What is the mood?',
          choices: ['Gloomy and sad', 'Joyful and lively', 'Peaceful and calm', 'Funny and silly'],
          answer: 0,
          working: 'Stopped clocks suggest time froze at a terrible moment, and the dust and closed curtains suggest grief and neglect.',
        },
      ],
      lines: [
        { say: 'Your turn. Every clock has stopped, dust lies thick on a wedding cake, and the curtains have not been opened in years. What is the mood? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, gloomy and sad. The stopped clocks suggest time froze at a terrible moment, and the dust and closed curtains suggest grief and neglect.', show: 'q2.answer' },
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
            'The **setting** is the time, place and society of a story.',
            'It can cause the conflict, decide what is possible and echo feelings.',
            '**Mood** is the feeling a passage gives the reader.',
            'Look at light, sound, weather and colour to name the mood.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The setting is the time, place and society of a story.', show: 'sum.0' },
        { say: 'It can cause the conflict, decide what is possible, and echo the characters’ feelings.', show: 'sum.1' },
        { say: 'Mood is the feeling a passage gives the reader, and details of the setting create it.', show: 'sum.2' },
        { say: 'So to name the mood, look at the light, sound, weather and colour.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
