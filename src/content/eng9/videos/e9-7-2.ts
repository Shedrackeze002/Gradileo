import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-7-2',
  lessonId: 'e9-7-2',
  title: 'The Personal Essay',
  summary:
    'A personal essay is non-fiction that explores the writer’s own experience and what it means, often through an anecdote, a short real story, told in the writer’s own voice and focused on one vivid moment. Reflection explains what the experience meant and how it changed you; avoid ready-made morals and reach for a specific insight.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Personal Essay', subtitle: 'A real moment, and what it meant' }],
      lines: [
        { say: 'A personal essay starts with something that really happened to you, and then asks what it meant.', show: 'title' },
        { say: 'In this video we shape a personal essay around a vivid moment, and write reflection that reaches a real insight.' },
      ],
    },
    {
      chapter: 'The personal essay',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Personal essay', md: 'A **personal essay** is non-fiction that explores the writer’s **own experience** and what it **means**. It combines storytelling with reflection.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**A focused moment.** One afternoon in vivid detail beats a whole year.',
            '**An anecdote.** A short, real story used to make a point.',
            '**Your own voice.** Honest and personal, not stiff or borrowed.',
          ],
        },
      ],
      lines: [
        { say: 'A personal essay is non-fiction that explores the writer’s own experience and what it means. It combines storytelling with reflection.', show: 'def' },
        { say: 'Three things make it work. First, a focused moment. One afternoon can be shown in vivid detail, but a whole year usually cannot. Depth beats breadth.', show: 'b.0' },
        { say: 'Second, an anecdote, a short, real story used to make a point. Don’t confuse it with an antidote, which cures a poison.', show: 'b.1' },
        { say: 'And third, your own voice: honest and personal, not stiff like a science report, or borrowed from a famous author.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Reflection',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection', md: '**Reflection** is thinking about what an experience **meant** and how it **changed** you. Narration says what happened; reflection says what you understand about it **now**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Narration', 'Reflection'],
          rows: [
            ['My brother slammed the door and ran off into the rain.', 'I realise now that I was not angry with my brother, but afraid of losing him.'],
          ],
        },
      ],
      lines: [
        { say: 'Reflection is thinking about what an experience meant, and how it changed you. Narration says what happened. Reflection says what you understand about it now.', show: 'def' },
        { say: 'My brother slammed the door and ran off into the rain is narration. I realise now that I was not angry with my brother, but afraid of losing him, is reflection.', show: 't' },
        { say: 'Reflection is usually woven through the essay, as the writer moves between then and now, and it is strongest near the end.' },
      ],
    },
    {
      chapter: 'Avoid the ready-made moral',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Avoid the ready-made moral', md: '“I learned to never give up” could end a thousand essays. Reach for the **specific, surprising** thing you discovered: “Losing the race taught me that I had been running for my father’s pride, not my own joy.”' },
      ],
      lines: [
        { say: 'A common mistake is to end with a ready-made moral. I learned to never give up could end a thousand essays, so it tells the reader nothing about yours.', show: 'm' },
        { say: 'Reach for the specific, surprising thing you discovered. Losing the race taught me that I had been running for my father’s pride, not my own joy.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the stronger opening for a personal essay about moving to a new country?',
          choices: [
            '“This essay is about moving to a new country.”',
            '“The first English word I learned was ‘sorry’.”',
            '“Many people move to new countries.”',
            '“I will now describe my move.”',
          ],
          answer: 1,
          working: 'It gives a specific, surprising detail that drops the reader into the experience and hints at what the essay will explore: the feeling of not belonging.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the stronger opening for a personal essay about moving to a new country? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Instead of announcing the topic, it gives a specific, surprising detail. It drops the reader into the experience, and hints at what the essay will explore: the feeling of not belonging.', show: 'q2.answer' },
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
            'A **personal essay** explores a real experience and what it means.',
            'Focus on one vivid moment, often told as an **anecdote**, in your own voice.',
            '**Reflection** says what the experience meant and how it changed you.',
            'Avoid clichés; aim for a specific insight.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A personal essay explores a real experience, and what it means.', show: 'sum.0' },
        { say: 'Focus on one vivid moment, often told as an anecdote, in your own voice.', show: 'sum.1' },
        { say: 'Reflection says what the experience meant, and how it changed you.', show: 'sum.2' },
        { say: 'And avoid clichés. Aim for a specific insight that only your essay could reach.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
