import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-1-4',
  lessonId: 'e11-1-4',
  title: 'Symbol, Motif and Allegory',
  summary:
    'A symbol is real in the story and also stands for an idea, and its meaning can grow. A motif is a recurring image, and an allegory is a whole story whose characters, places and events stand for ideas.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Symbol, Motif and Allegory', subtitle: 'When one thing stands for another' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Swathed about his forehead, and hanging down over his face, so low as to be shaken by his breath, Mr. Hooper had on a black veil.'],
          by: 'Nathaniel Hawthorne, “The Minister’s Black Veil”',
        },
      ],
      lines: [
        { say: 'One Sunday, a well-liked minister, Mr. Hooper, walks into church looking as usual, except for a black veil.', show: 'title' },
        { say: 'He never explains it, and he never takes it off. His congregation spends the story asking what it means, and so do we. In this lesson, you will interpret symbols, trace motifs and read allegories.', show: 'q' },
      ],
    },
    {
      chapter: 'Symbols',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Symbol', md: 'Something that is real in the story and also stands for an idea or a feeling beyond itself.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['All through life that piece of crape had hung between him and the world: it had separated him from cheerful brotherhood and woman’s love, and kept him in that saddest of all prisons, his own heart;'],
          by: 'Nathaniel Hawthorne, “The Minister’s Black Veil”',
        },
      ],
      lines: [
        { say: 'A symbol is real in the story, and it also stands for an idea. The veil is a piece of real crape that flutters with the minister’s breath.', show: 'def' },
        { say: 'But its meaning grows. Here it is as the minister lies dying.', show: 'q' },
        { say: 'The veil began as a mystery. By the end it is a barrier and a prison. To read a symbol, check every appearance, what is happening to the characters, and the ending.', focus: 'q' },
      ],
    },
    {
      chapter: 'Motifs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Motif', md: 'An image, object or idea that recurs through a story. Each return adds meaning.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['But something fluttered lightly down through the air and caught on the branch of a tree. The young man seized it, and beheld a pink ribbon.'],
          by: 'Nathaniel Hawthorne, “Young Goodman Brown”',
        },
      ],
      lines: [
        { say: 'A motif is an image that recurs through a story. In “Young Goodman Brown”, the pink ribbons on Faith’s cap return at each turning point.', show: 'def' },
        { say: 'Deep in the forest, one comes fluttering down from the dark sky.', show: 'q' },
        { say: 'The ribbons stand for her innocence, and their journey raises the story’s great question: was she ever really in the forest at all?', focus: 'q' },
      ],
    },
    {
      chapter: 'Allegory',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Allegory', md: 'A story in which characters, places and events stand for ideas, so it works on two levels: the events, and the lesson.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['But the only thing about him that could be fixed upon as remarkable was his staff, which bore the likeness of a great black snake, so curiously wrought that it might almost be seen to twist and wriggle itself like a living serpent.'],
          by: 'Nathaniel Hawthorne, “Young Goodman Brown”',
        },
      ],
      lines: [
        { say: 'A symbol is one part of a story. In an allegory, the whole story forms a system of meanings.', show: 'def' },
        { say: 'Goodman Brown leaves the village and his wife, Faith, to walk into the dark forest. There he meets a traveller with a strange staff.', show: 'q' },
        { say: 'The snake points back to the serpent in the Garden of Eden, so the traveller is the devil. Brown’s night walk is every person’s meeting with temptation and doubt.', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Not everything is a symbol', md: 'A cup of tea is usually just tea. Treat something as a symbol when the story gives it weight through **repetition, emphasis or a key position**, and prove it with evidence.' },
      ],
      lines: [
        { say: 'Here is a common mistake. An object is not a symbol just because it is mentioned.', show: 'm' },
        { say: 'A cup of tea is usually just tea. Look for repetition, emphasis or a key position, and support your reading with evidence from the text.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Faith’s pink ribbons return at several turning points in the story. What does that make them?',
          choices: [
            'An allegory, because the whole story stands for an idea.',
            'A parable, because the ribbons teach a short moral lesson.',
            'A motif, because the image keeps coming back and adds meaning.',
            'A foil, because the ribbons contrast with another character.',
          ],
          answer: 2,
          working: 'An image that recurs through a story, adding meaning each time, is a motif. The other choices name different ideas.',
        },
      ],
      lines: [
        { say: 'Your turn. Faith’s pink ribbons return at several turning points in the story. What does that make them? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. An image that recurs through a story, adding meaning each time, is a motif. The other choices name different ideas.', show: 'q2.answer' },
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
            'A symbol is real and also stands for an idea; its meaning can grow.',
            'A motif is a recurring image that supports the theme.',
            'An allegory is a whole story whose parts stand for ideas.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A symbol is real in the story and also stands for an idea, and its meaning can grow.', show: 'sum.0' },
        { say: 'A motif is a recurring image that often supports the theme.', show: 'sum.1' },
        { say: 'And an allegory is a whole story whose characters, places and events stand for ideas.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
