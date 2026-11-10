import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-1-1',
  lessonId: 'e5-1-1',
  title: 'Story Elements: Characters, Setting and Plot',
  thumbnailTitle: 'Characters, Setting and Plot',
  summary:
    'Every story is built from three elements: the characters it is about, the setting where and when it happens, and the plot, which is what happens. Clues in the text tell you the setting, and the narrator’s words tell you who is telling the story.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Stories', title: 'Story Elements', subtitle: 'Characters, setting and plot' },
        { kind: 'bullets', id: 'b', items: ['**Who** is it about?', '**Where** and **when** does it happen?', '**What** happens?'] },
      ],
      lines: [
        { say: 'Every story you have ever enjoyed, from a bedtime fable to a long adventure novel, is built from the same three parts.', show: 'title' },
        { say: 'The people or animals it is about, the place and time it happens, and the events that take place.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Readers call these the story elements. In this lesson, you will learn to find each one.' },
      ],
    },
    {
      chapter: 'The three story elements',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'The three story elements',
          md: '**Characters** are the people, animals or creatures in a story.\n\nThe **setting** is *where* and *when* the story happens.\n\nThe **plot** is *what happens*: the events, one after another.',
        },
      ],
      lines: [
        { say: 'Characters are the people, animals or creatures in a story. The main character is the one the story follows most closely.', show: 'def' },
        { say: 'The setting is where and when the story happens. It can be a place, a time of day, a season, or a time in history.', focus: 'def' },
        { say: 'The plot is what happens: the events of the story, one after another. We use these three elements to describe any story, short or long.' },
      ],
    },
    {
      chapter: 'Finding the elements',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Before the sun was up, Mei pulled on her boots and crunched across the frosty yard to the barn.', 'Snow lay on the fence posts, and the cows’ breath hung in clouds.'] },
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'In this passage'],
          rows: [
            ['Character', 'Mei (and the cows)'],
            ['Setting', 'A farm, early on a winter morning'],
            ['Plot', 'Mei goes out to the barn'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the opening of a short story. Let’s find each element.', show: ['q.0', 'q.1'] },
        { say: 'The characters are Mei, and the cows in the barn. Mei is the main character, because the story follows her.', show: 't', focus: 't' },
        { say: 'The setting is a farm, early on a winter morning. The sun is not up yet, there is frost and snow, and we can see the cows’ breath in the cold air.' },
        { say: 'And the plot so far is simple: Mei goes out to the barn.' },
      ],
    },
    {
      chapter: 'Who tells the story?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'The narrator', md: 'The **narrator** is the voice that tells the story. A narrator who says *I* and *my* is a character in the story.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['I will never forget the day my grandmother’s dog, Biscuit, ate my birthday cake.'] },
      ],
      lines: [
        { say: 'The voice that tells a story is called the narrator.', show: 'def' },
        { say: 'If the narrator uses I and my, the narrator is a character in the story. If the narrator uses he, she and they for everyone, the narrator is outside the story, watching.' },
        { say: 'Who is telling this story? Look for the words I and my. The person telling it was there, and it was their cake, so the narrator is a character in the story.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'Clues to the setting',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Red and gold leaves drifted down from the maple trees, and Kwame zipped up his jacket against the cool wind.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'The setting is more than a place', md: 'The setting is *where* **and** *when*. Look for clues to the time as well as the place.' },
      ],
      lines: [
        { say: 'Writers rarely say, the setting is a beach in summer. Instead, they leave clues: what the characters see, hear and wear, and what the weather is like.' },
        { say: 'When does this passage take place?', show: 'q' },
        { say: 'Red and gold leaves falling from the trees happen in one season, and a cool wind and a jacket fit the same season. So this passage takes place in autumn, also called fall.', focus: 'q' },
        { say: 'Here is a common mistake. The setting is not only a place. A city long ago, with horses and candles, feels very different from the same city today, so look for clues to the time as well.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The lanterns flickered as the knights rode across the castle bridge at midnight.” What is the setting?',
          choices: [
            'The knights and their horses',
            'A castle, at midnight, long ago',
            'The knights ride across a bridge',
            'A narrator who is one of the knights',
          ],
          answer: 1,
          working: 'The setting is where and when: a castle, at midnight, in a time of knights and lanterns. Choice A names characters, and Choice C is the plot.',
        },
      ],
      lines: [
        { say: 'Your turn. Read the sentence, and choose the setting. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The setting is where and when: a castle, at midnight, in a time of knights and lanterns. Choice A names the characters, and Choice C is the plot.', show: 'q2.answer' },
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
            '**Characters** are who the story is about.',
            'The **setting** is where and when it happens; find it from clues.',
            'The **plot** is what happens, event by event.',
            'A narrator who says *I* is a character in the story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Characters are who the story is about, and the main character is the one it follows most.', show: 'sum.0' },
        { say: 'The setting is where and when the story happens. Find it from clues in the text.', show: 'sum.1' },
        { say: 'The plot is what happens, event by event.', show: 'sum.2' },
        { say: 'And a narrator who says I is a character in the story.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
