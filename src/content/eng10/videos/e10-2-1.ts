import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-2-1',
  lessonId: 'e10-2-1',
  title: 'Imagery and Figurative Language',
  thumbnailTitle: 'Imagery and Figures of Speech',
  summary:
    'Imagery appeals to the senses, and figurative language such as similes, metaphors, personification, hyperbole and understatement says more than its literal meaning. A strong answer explains what a comparison suggests.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Imagery and Figurative Language', subtitle: 'Words that make you see' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['He clasps the crag with crooked hands;', 'Close to the sun in lonely lands,', 'Ring’d with the azure world, he stands.'], by: 'Alfred, Lord Tennyson, “The Eagle”' },
      ],
      lines: [
        { say: 'Tennyson puts an eagle on its cliff so clearly that you can almost feel the wind.', show: ['title', 'q.0', 'q.1', 'q.2'] },
        { say: 'But an eagle does not have hands. Tennyson is using figurative language, words that mean more than their literal meaning, along with imagery, words that let us see the blue world around the bird. In this lesson, you will learn to name the main figures of speech.' },
      ],
    },
    {
      chapter: 'Imagery',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Imagery', md: 'Language that appeals to the senses: sight, sound, smell, taste and touch.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['There will come soft rains and the smell of the ground,', 'And swallows circling with their shimmering sound;'], by: 'Sara Teasdale, “There Will Come Soft Rains”' },
      ],
      lines: [
        { say: 'Imagery is language that appeals to the senses: sight, sound, smell, taste and touch. An image lets the reader experience something, not just be told about it.', show: 'def' },
        { say: 'Sara Teasdale opens a poem with a smell and a sound.', show: 'q' },
        { say: 'The smell of the ground appeals to smell, and the swallows’ shimmering sound appeals to hearing. To find the sense, imagine yourself in the scene and ask what you would sense.', focus: 'q' },
      ],
    },
    {
      chapter: 'Similes and metaphors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Simile and metaphor', md: 'A **simile** compares using “like” or “as”: *Her hands were as cold as ice.* A **metaphor** says one thing **is** the other: *Her hands were ice.*' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Personification**: human actions for a non-human thing',
            '**Hyperbole**: deliberate, extreme exaggeration',
            '**Understatement**: making something sound smaller than it is',
          ],
        },
      ],
      lines: [
        { say: 'Both similes and metaphors compare two things that are different in most ways but alike in one.', show: 'def' },
        { say: 'A simile uses like or as. A metaphor says that one thing is the other.', focus: 'def' },
        { say: 'Personification gives human actions to something that is not human, as when the wind whispers through the pines.', show: 'b.0', focus: 'b.0' },
        { say: 'Hyperbole is deliberate, extreme exaggeration, and understatement makes something sound much smaller than it is.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'What a comparison suggests',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Day after day, day after day,', 'We stuck, nor breath nor motion;', 'As idle as a painted ship', 'Upon a painted ocean.'], by: 'Samuel Taylor Coleridge, “The Rime of the Ancient Mariner”' },
        { kind: 'text', id: 'ans', size: 'md', md: 'A painted ship can never move, so the real ship is **completely, hopelessly still**.' },
      ],
      lines: [
        { say: 'Naming a device is only the first step. The real question is what the comparison suggests. Here the wind has dropped and the ship cannot move.', show: ['q.0', 'q.1'] },
        { say: 'The simile compares the real ship to a ship in a painting.', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
        { say: 'A painted ship can never move, and its sea never changes. Carry those qualities back, and the real ship is utterly still, and the sailors are trapped.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Not every “like” makes a simile', md: '“I like mangoes” uses *like* as a verb. “The lake lay still, like a sheet of glass” compares two **different** things.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Not every like makes a simile.', show: 'm' },
        { say: 'In “I like mangoes”, the word like is a verb. A simile compares two different kinds of things, such as a lake and a sheet of glass.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these sentences contains a metaphor?',
          choices: [
            'The lake lay still, like a sheet of clear glass.',
            'Her hands were as cold as the winter ice itself.',
            'Her hands were ice in the cold winter air.',
            'I have told you a million times to stop it.',
          ],
          answer: 2,
          working: 'A metaphor says one thing is another. Choices A and B are similes, and Choice D is hyperbole.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these sentences contains a metaphor? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It says her hands were ice, without like or as. Choices A and B are similes, and Choice D is hyperbole.', show: 'q2.answer' },
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
            'Imagery appeals to the senses.',
            'A simile uses “like” or “as”; a metaphor says one thing is another.',
            'Explain what a figure of speech suggests, not just its name.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Imagery appeals to the senses of sight, sound, smell, taste and touch.', show: 'sum.0' },
        { say: 'A simile uses like or as, and a metaphor says that one thing is another.', show: 'sum.1' },
        { say: 'After naming a device, always explain what it suggests about the thing being described.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
