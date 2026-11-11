import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-2-4',
  lessonId: 'e6-2-4',
  title: 'Mood',
  summary:
    'Mood is the feeling or atmosphere a text creates for the reader. Writers build mood with images, word choice, sound and sentence length, and the mood can change during a poem or story.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Mood', subtitle: 'How a text makes you feel' }],
      lines: [
        { say: 'Some poems make you feel calm. Others make you feel uneasy, excited or sad.', show: 'title' },
        { say: 'In this lesson, you will learn to describe the feeling a text creates, and to find the words that create it.' },
      ],
    },
    {
      chapter: 'What mood is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mood', md: '**Mood** is the feeling or atmosphere a text creates for the reader: cheerful, gloomy, peaceful, tense, mysterious, frightening.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Mood is not a character’s feeling', md: 'A character can be happy while the **reader** feels nervous, because the reader can see danger the character cannot.' },
      ],
      lines: [
        { say: 'Mood is the feeling or atmosphere a text creates for the reader. It might be cheerful, gloomy, peaceful, tense, mysterious or frightening.', show: 'def' },
        { say: 'Writers build mood carefully, through their images, their sounds, and even the length of their sentences.' },
        { say: 'Here is a common mistake. Mood is not the same as a character’s feelings. A character can be happy while the reader feels nervous, because the reader can see danger the character cannot.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Describing the mood',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The fog comes', 'on little cat feet.', 'It sits looking', 'over harbor and city', 'on silent haunches', 'and then moves on.'], by: 'Carl Sandburg, “Fog”' },
        { kind: 'text', id: 'ans', size: 'lg', md: 'Mood: **quiet and calm**' },
      ],
      lines: [
        { say: 'What is the mood of this poem?', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5'] },
        { say: 'The images are soft and slow: little cat feet, sitting, silent haunches. And nothing loud or sudden happens.', focus: ['q.1', 'q.4'] },
        { say: 'So the mood is quiet and calm.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'How words create mood',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Tool', 'How it builds mood', 'Example'],
          rows: [
            ['**Images**', 'what you see, hear and feel', '*a cold draught crept across the floor*'],
            ['**Word choice**', 'words with strong feelings attached', '*gloomy, sparkling, creaked, gently*'],
            ['**Sound**', 'harsh or soft sounds', '*crash, clatter* or *hush, murmur*'],
            ['**Sentence length**', 'short sentences create tension', '*Tap. Tap. Tap. Then silence.*'],
          ],
        },
      ],
      lines: [
        { say: 'Here are four tools writers use to build mood.', show: 't' },
        { say: 'Images are what the writer makes you see, hear and feel, like a cold draught creeping across the floor.', focus: 't.0' },
        { say: 'Word choice uses words with strong feelings attached, like gloomy or sparkling.', focus: 't.1' },
        { say: 'Sound can be harsh, like crash and clatter, or soft, like hush and murmur.', focus: 't.2' },
        { say: 'And sentence length matters. Short sentences create tension, while long ones can feel calm. Tap. Tap. Tap. Then silence.', focus: 't.3' },
        { say: 'Mood can also change. Wordsworth’s speaker begins lonely as a cloud, but the sight of the dancing daffodils fills him with delight.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The candle flickered and went out. Somewhere in the dark house a door creaked open, a cold draught crept across the floor, and the footsteps on the stairs stopped.” What is the mood?',
          choices: ['Cheerful', 'Peaceful', 'Frightening', 'Silly'],
          answer: 2,
          working: 'The dark, the creaking door, the cold draught that “crept” and the footsteps that suddenly stop all create a frightening mood.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the mood of this passage? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, frightening. The dark, the creaking door, a cold draught that crept as if something were sneaking up, and footsteps that suddenly stop, all create fear.', show: 'q2.answer' },
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
            '**Mood** is the feeling a text creates in the reader.',
            'Writers build mood with images, word choice, sound and sentence length.',
            'Mood can change during a poem or story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Mood is the feeling a text creates in the reader.', show: 'sum.0' },
        { say: 'Writers build mood with images, word choice, sound and sentence length.', show: 'sum.1' },
        { say: 'And mood can change during a poem or story.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
