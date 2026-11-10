import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-7-3',
  lessonId: 'e7-7-3',
  title: 'Showing and Pacing',
  summary:
    'Telling names a feeling, while showing reveals it through actions and details, so show the important moments and tell to skip over time. Pacing is how fast a story moves: short sentences and summary speed it up, and detail and close scenes slow it down.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Showing and Pacing', subtitle: 'Where you spend your words' }],
      lines: [
        { say: 'Two skills separate a story that is told from a story that is lived: showing instead of telling, and controlling the pace.', show: 'title' },
        { say: 'Both are about where you spend your words. In this video we learn how to use each one.' },
      ],
    },
    {
      chapter: 'Show, don’t tell',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Show, don’t tell', md: '**Telling** names a feeling or fact: *Kemi was nervous.* **Showing** gives actions and details that let the reader work it out: *Kemi’s hands trembled as she opened the letter.*' },
        {
          kind: 'table',
          id: 't',
          head: ['Telling', 'Showing'],
          rows: [
            ['*The room was messy.*', '*Socks hung from the lamp, and pizza boxes towered beside the bed.*'],
            ['*Leo was happy.*', '*Leo burst through the door, grinning, and spun his little brother round.*'],
            ['*The house had been empty for years.*', '*A spider had strung its web across the front door.*'],
          ],
        },
      ],
      lines: [
        { say: 'Telling names a feeling or a fact. Kemi was nervous.', show: 'def' },
        { say: 'Showing gives actions and details that let the reader work it out. Kemi’s hands trembled as she opened the letter. Showing pulls readers into the scene, because they experience it instead of being informed about it.', focus: 'def' },
        { say: 'The room was messy tells. Socks hanging from the lamp and pizza boxes towering beside the bed show it.', show: 't', focus: 't.0' },
        { say: 'Leo bursting through the door, grinning, shows that he is happy. And a spider’s web across the front door shows that a house has been empty for years.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'When to tell',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Telling has its place', md: 'Show the **important moments**. For dull stretches of time, telling is better: *Three weeks passed.* Showing every minute would bore the reader.' },
      ],
      lines: [
        { say: 'But do not show everything. Showing is best for important moments.', show: 'm' },
        { say: 'For dull stretches of time, telling is better. Three weeks passed. Showing every minute of those weeks would bore the reader.', focus: 'm' },
      ],
    },
    {
      chapter: 'Pacing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pacing', md: '**Pacing** is how fast or slowly a story moves.' },
        {
          kind: 'table',
          id: 't',
          head: ['To speed up', 'To slow down'],
          rows: [
            ['short sentences and quick action', 'long sentences and detailed description'],
            ['**summary**: a lot of time in one sentence', '**scene**: one moment, second by second'],
            ['skip unimportant events', 'add thoughts, senses and small actions'],
          ],
        },
      ],
      lines: [
        { say: 'Pacing is how fast or slowly a story moves.', show: 'def' },
        { say: 'To speed up, use short sentences and quick action. To slow down, use long sentences and detailed description.', show: 't', focus: 't.0' },
        { say: 'Summary covers a lot of time in a sentence: over the next month, she practised every day. A scene shows a single moment closely, second by second.', focus: 't.1' },
        { say: 'And you can skip unimportant events to speed up, or add thoughts, senses and small actions to slow down. A well-paced story moves quickly through the parts that matter less, and slows down for the parts that matter most, especially the climax.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A story is about a rescue at sea. How should the writer pace it?',
          choices: [
            'Show the trip out in detail, and summarize the rescue.',
            'Summarize the trip out, and slow down for the storm and the rescue.',
            'Tell everything in one paragraph.',
            'Give every part exactly the same number of words.',
          ],
          answer: 1,
          working: 'The trip out is not where the drama is, so summarize it. The storm and the rescue are the heart of the story, so slow down and show them.',
        },
      ],
      lines: [
        { say: 'Your turn. A story is about a rescue at sea. How should the writer pace it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The trip out is not where the drama is, so summarize it. The storm and the rescue are the heart of the story, so slow down and show them in detail.', show: 'q2.answer' },
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
            '**Telling** names a feeling; **showing** reveals it through actions and details.',
            'Show the important moments; tell to skip over time.',
            '**Pacing** is how fast a story moves.',
            'Short sentences and summary speed up; detail and close scenes slow down.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Telling names a feeling, and showing reveals it through actions and details.', show: 'sum.0' },
        { say: 'Show the important moments, and tell to skip quickly over time.', show: 'sum.1' },
        { say: 'Pacing is how fast a story moves.', show: 'sum.2' },
        { say: 'Short sentences and summary speed it up, and detail and close scenes slow it down.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
