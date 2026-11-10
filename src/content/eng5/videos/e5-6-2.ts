import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-6-2',
  lessonId: 'e5-6-2',
  title: 'Narrative Writing: Time Order and Showing',
  thumbnailTitle: 'Narrative Writing',
  summary:
    'A narrative tells a story in order, with a beginning, a middle and an end. Time-order words such as first, then and finally show when events happen, and showing a feeling through actions and details brings characters to life.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Narrative Writing', subtitle: 'Time order, and show, don’t tell' }],
      lines: [
        { say: 'In this lesson, you will learn two tools that make stories better.', show: 'title' },
        { say: 'Time-order words, which move the story along, and showing, which brings the characters to life.' },
      ],
    },
    {
      chapter: 'What a narrative is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Narrative', md: 'A **narrative** is a piece of writing that tells a story, true or made up, with events in order: a **beginning**, a **middle** and an **end**.' },
      ],
      lines: [
        { say: 'A narrative is a piece of writing that tells a story. It can be true, like a story about your first day at a new school, or made up.', show: 'def' },
        { say: 'A narrative tells events in order, with a beginning, a middle and an end.', focus: 'def' },
      ],
    },
    {
      chapter: 'Time-order words',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Beginning', 'Middle', 'End'],
          rows: [['*First, One morning, At the start*', '*Next, Then, After that, Later, Meanwhile, Suddenly*', '*Finally, In the end, At last*']],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['_____, after three hours of searching, we found the lost kitten asleep in the laundry basket.'] },
      ],
      lines: [
        { say: 'Time-order words, also called transition words, tell the reader when each event happens.', show: 't' },
        { say: 'First and one morning start a story. Next, then, after that and later move it along. And finally, in the end, and at last bring it to a close.' },
        { say: 'Meanwhile means at the same time, somewhere else. Suddenly shows that something happened quickly, and by surprise.' },
        { say: 'Which word fits here: finally, first or meanwhile? The search took three hours, and this is when it ended. So the word must show the end of a series of events. Finally.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'Show, don’t tell',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Telling', 'Showing'],
          rows: [
            ['Leo was happy.', 'Leo grinned and punched the air.'],
            ['The room was messy.', 'Socks and comic books covered every inch of the floor.'],
            ['Grandma was tired.', 'Grandma yawned and sank into her chair.'],
          ],
        },
      ],
      lines: [
        { say: 'When a writer tells, they name a feeling. Ana was nervous.' },
        { say: 'When a writer shows, they describe what the character does, says and notices, so the reader works out the feeling. Ana’s hands shook as she stepped up to the microphone, and her voice came out as a whisper.' },
        { say: 'Leo was happy tells. Leo grinned and punched the air shows.', show: 't', focus: 't.0' },
        { say: 'The room was messy tells. Socks and comic books covered every inch of the floor shows. And Grandma yawned and sank into her chair shows that she was tired.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Showing is not adding the feeling word twice', md: '“Ben was very, very angry” still only **tells**. To show, replace the feeling word with actions, words and details.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Ben was very, very angry still only tells. Adding very does not show anything.', show: 'm' },
        { say: 'To show, replace the feeling word with actions, words and details that let the reader see it: a red face, a slammed door, or clenched fists.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence shows that Ben was angry, without telling?',
          choices: [
            'Ben was angry.',
            'Ben was very, very mad.',
            'Ben’s face turned red, and he slammed his book shut.',
            'Ben felt anger.',
          ],
          answer: 2,
          working: 'C describes actions (a red face, a slammed book) and lets the reader work out the feeling. The others name it.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence shows that Ben was angry, without telling? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It describes actions, a red face and a slammed book, and lets the reader work out the feeling. The other choices all name it.', show: 'q2.answer' },
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
            'A **narrative** tells events in order: beginning, middle and end.',
            '**Time-order words** (*first, then, later, finally*) show when events happen.',
            '**Show, don’t tell**: describe actions and details instead of naming the feeling.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A narrative tells events in order, with a beginning, a middle and an end.', show: 'sum.0' },
        { say: 'Time-order words such as first, then, later and finally show when events happen.', show: 'sum.1' },
        { say: 'And show, don’t tell. Describe actions and details, instead of naming the feeling.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
