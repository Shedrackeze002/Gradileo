import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-1-4',
  lessonId: 'e5-1-4',
  title: 'Fables, Folk Tales and Their Lessons',
  thumbnailTitle: 'Fables and Their Morals',
  summary:
    'A fable is a short story, often with talking animals, that teaches a moral: a lesson about how to live. Fairy tales, folk tales, myths and tall tales are other kinds of traditional tales, each with its own features.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Fables, Folk Tales and Their Lessons', subtitle: 'Stories passed down for centuries' }],
      lines: [
        { say: 'Long before there were books, people told stories aloud, around fires and at bedtime. Many of those stories were passed down for hundreds of years.', show: 'title' },
        { say: 'In this lesson, you will meet the main kinds of traditional tales, and learn to find the lesson that a fable teaches.' },
      ],
    },
    {
      chapter: 'Fables and morals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fable and moral', md: 'A **fable** is a short story, often with animals that talk and act like people, that teaches a **moral**: a lesson about how to live.' },
      ],
      lines: [
        { say: 'A fable is a short story, often with animals that talk and act like people, that teaches a moral.', show: 'def' },
        { say: 'A moral is a lesson about how to live. The most famous fables are said to have been told by Aesop, a storyteller in ancient Greece.', focus: 'def' },
      ],
    },
    {
      chapter: 'The Fox and the Grapes',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['A hungry fox saw a bunch of grapes hanging high on a vine.', 'He jumped and jumped but could not reach them.', 'At last he walked away, saying, “I’m sure they were sour anyway.”'], by: 'retold from Aesop' },
        { kind: 'text', id: 'ans', size: 'md', md: '**Moral:** people often pretend they do not want what they cannot have.' },
      ],
      lines: [
        { say: 'Here is a fable retold from Aesop. What is its lesson?', show: ['q.0', 'q.1', 'q.2'] },
        { say: 'First, what does the fox want, and does he get it? He wants the grapes, but he cannot reach them.', focus: ['q.0', 'q.1'] },
        { say: 'Then, what does he do? He pretends he never wanted them, by saying they were sour.', focus: 'q.2' },
        { say: 'So the moral is that people often pretend they do not want what they cannot have.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A moral is a lesson, not a fact', md: '“Foxes like grapes” is a fact about this story. A moral is a lesson for **people**: it would still be true in your own life.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Foxes like grapes is a fact about this story, but it is not the moral.', show: 'm' },
        { say: 'A moral is a lesson for people. To check, ask yourself whether it would still be true in your own life, with no foxes or grapes in sight.', focus: 'm' },
      ],
    },
    {
      chapter: 'Kinds of traditional tales',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'What it is like'],
          rows: [
            ['**Fable**', 'Short, often with talking animals; teaches a moral'],
            ['**Fairy tale**', 'Magic, royalty, good and evil; “Once upon a time”'],
            ['**Folk tale**', 'Passed down by people telling it aloud'],
            ['**Myth**', 'Explains how something in nature began'],
            ['**Tall tale**', 'A larger-than-life hero with hugely exaggerated deeds'],
          ],
        },
      ],
      lines: [
        { say: 'Fables are one kind of traditional tale. Here are the others.', show: 't' },
        { say: 'A fairy tale has magic, royalty, and good and evil, and often begins, once upon a time. The Elves and the Shoemaker, by the Brothers Grimm, is one.', focus: 't.1' },
        { say: 'A folk tale was passed down by people telling it aloud, like Stone Soup.', focus: 't.2' },
        { say: 'A myth explains how something in nature began, often with gods or heroes, like the Greek myths of the seasons.', focus: 't.3' },
        { say: 'And a tall tale has a larger-than-life hero whose deeds are hugely exaggerated, like a farmer who digs a lake with one scoop.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A lion lets a tiny mouse go free. Later, the mouse chews through a net to save the lion. What is the best moral?',
          choices: [
            'Lions are stronger than mice.',
            'Even the small can help the great.',
            'Mice have sharp teeth.',
            'Nets are made of rope.',
          ],
          answer: 1,
          working: 'A moral is a lesson for people. Choices A, C and D are facts, not lessons about how to live.',
        },
      ],
      lines: [
        { say: 'Your turn. Read the fable, and choose the best moral. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Even the small can help the great. That is a lesson for people. Choices A, C and D are only facts, not lessons about how to live.', show: 'q2.answer' },
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
            'A **fable** is a short tale, often with animals, that teaches a **moral**.',
            'A moral is a lesson for life, not a fact from the story.',
            '**Fairy tales** have magic; **myths** explain nature; **tall tales** exaggerate.',
            '**Folk tales** were passed down by telling them aloud.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A fable is a short tale, often with animals, that teaches a moral.', show: 'sum.0' },
        { say: 'A moral is a lesson for life, not just a fact from the story.', show: 'sum.1' },
        { say: 'Fairy tales have magic, myths explain nature, and tall tales exaggerate.', show: 'sum.2' },
        { say: 'And folk tales were passed down by people telling them aloud.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
