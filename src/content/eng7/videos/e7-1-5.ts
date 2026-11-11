import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-1-5',
  lessonId: 'e7-1-5',
  title: 'Theme and Symbol',
  summary:
    'A symbol is something concrete that stands for a bigger idea, and it is often repeated, linked to feelings and changed as the story changes. A theme is a full-sentence message about life that develops through how the main character changes.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Theme and Symbol', subtitle: 'The bigger ideas in a story' }],
      lines: [
        { say: 'A story can be about a girl who plants a tree, and also about something much bigger, like growing up, hope, or family.', show: 'title' },
        { say: 'Writers carry those bigger ideas through symbols, and the bigger message of the story is its theme. In this video we learn to read both.' },
      ],
    },
    {
      chapter: 'What a symbol is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Symbol', md: 'A **symbol** is something concrete (an object, a person, a place, an animal or even a colour) that stands for a bigger, abstract idea.' },
        {
          kind: 'table',
          id: 't',
          head: ['Symbol', 'Often stands for'],
          rows: [
            ['a white dove', 'peace'],
            ['a rising sun', 'a new beginning'],
            ['a storm', 'trouble'],
          ],
        },
        { kind: 'text', id: 'clues', size: 'md', md: 'Look for something that **keeps appearing**, is **linked to feelings**, or **changes** with the character.' },
      ],
      lines: [
        { say: 'A symbol is something concrete, such as an object, a person, a place, an animal or even a colour, that stands for a bigger, abstract idea.', show: 'def' },
        { say: 'Some symbols are shared by many cultures. A white dove stands for peace, a rising sun for a new beginning, and a storm for trouble.', show: 't' },
        { say: 'Others belong to one story. If a girl plants a tree when her brother is born, and it grows as he grows, the tree stands for his life.', focus: 'def' },
        { say: 'Writers rarely tell you that something is a symbol. So look for something that keeps appearing, that is linked to a character’s feelings, or that changes when the character changes.', show: 'clues', focus: 'clues' },
      ],
    },
    {
      chapter: 'Reading a symbol',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Every evening, Lucas stood at the locked gate of the big house and watched the children play on the lawn.', 'He could hear their laughter, but the bars were cold under his hands.'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The locked gate symbolizes Lucas being **shut out** of a life he wants.' },
      ],
      lines: [
        { say: 'Here is a symbol at work. Every evening, Lucas stands at the locked gate and watches the children play.', show: 'q.0' },
        { say: 'The gate keeps Lucas outside, while the laughter is inside. And the cold bars stress how shut out he feels.', show: 'q.1', focus: 'q.1' },
        { say: 'So the locked gate symbolizes Lucas being shut out of a life he wants.', show: 'a' },
      ],
    },
    {
      chapter: 'How a theme develops',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme', md: 'A **theme** is a message about life, stated as a full sentence. A **topic** is just a subject, such as *courage* or *greed*.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['At the start, Zara refused every offer of help: “I can do it myself.”', 'By the middle, her project was falling apart.', 'At the end, she finally asked Ben to help, and together they finished it in an afternoon.'] },
        { kind: 'text', id: 'a', size: 'md', md: '**Theme:** Asking for help is a strength, not a weakness.' },
      ],
      lines: [
        { say: 'A theme is a message about life, stated as a full sentence. A topic is just a subject. Courage is a topic. Courage means acting even when you are afraid is a theme.', show: 'def' },
        { say: 'A theme is not usually stated in one place. It develops across the story, mostly through how the main character changes. So compare the character at the start, the middle and the end.', show: 'q.0', focus: 'q.0' },
        { say: 'At the start, Zara will not accept help. By the middle, doing it alone is not working.', show: 'q.1', focus: 'q.1' },
        { say: 'At the end, she asks for help and succeeds.', show: 'q.2', focus: 'q.2' },
        { say: 'So the theme is that asking for help is a strength, not a weakness.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'After his mother died, Eli kept the curtains in her room closed. At the end of the story he opens them, and sunlight fills the room. What do the curtains most likely symbolize?',
          choices: ['The weather that day', 'Eli’s love of sunlight', 'A new house', 'His grief, and at the end his healing'],
          answer: 3,
          working: 'The closed curtains are linked to Eli’s feelings after the death, and they change when he changes: opening them shows the theme of healing.',
        },
      ],
      lines: [
        { say: 'Your turn. Eli keeps his mother’s curtains closed after she dies, and at the end he opens them. What do the curtains symbolize? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The curtains are linked to Eli’s grief, and they change when he changes. Opening them shows the theme of healing. Symbols and themes often work together like this.', show: 'q2.answer' },
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
            'A **symbol** is something concrete that stands for a bigger idea.',
            'Symbols repeat, link to feelings, and change as the story changes.',
            'A **theme** is a full-sentence message; a **topic** is one subject.',
            'Trace a theme by comparing the character at the start and the end.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A symbol is something concrete that stands for a bigger idea.', show: 'sum.0' },
        { say: 'Symbols are often repeated, linked to feelings, and change as the story changes.', show: 'sum.1' },
        { say: 'A theme is a full-sentence message about life, while a topic is a single subject.', show: 'sum.2' },
        { say: 'And you can trace a theme by comparing the main character at the start and at the end.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
