import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-3-2',
  lessonId: 'e5-3-2',
  title: 'Text Features',
  summary:
    'Text features such as headings, captions, diagrams, maps, timelines, the table of contents, the glossary and the index help you find information quickly without reading every word.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reading for Information', title: 'Text Features', subtitle: 'Finding things quickly' }],
      lines: [
        { say: 'Informational books and websites are built to help you find things quickly.', show: 'title' },
        { say: 'Headings, pictures, bold words, and the lists at the back of a book are called text features. Knowing what each one does saves you from reading every word to find one fact.' },
      ],
    },
    {
      chapter: 'What text features are',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Text features', md: '**Text features** are the parts of an informational text, beyond the main words, that help you find and understand information: headings, pictures, bold words and the lists at the back of a book.' },
        {
          kind: 'table',
          id: 't',
          head: ['Feature', 'What it does'],
          rows: [
            ['**Title** and **heading**', 'name the whole text, and one section of it'],
            ['**Bold** or *italic* words', 'mark important words, often defined nearby'],
            ['**Photograph** and **caption**', 'the caption explains what the picture shows'],
          ],
        },
      ],
      lines: [
        { say: 'Text features are the parts of an informational text, beyond the main words, that help you find and understand information.', show: 'def' },
        { say: 'The title names the whole text, and a heading names what one section is about.', show: 't', focus: 't.0' },
        { say: 'Bold or italic words mark important words, which are often defined nearby or in the glossary.', focus: 't.1' },
        { say: 'And a caption, under a photograph, explains what the picture shows.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Pictures that teach',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Feature', 'What it shows'],
          rows: [
            ['**Diagram** and **labels**', 'how something is built or works'],
            ['**Map**', 'where places are'],
            ['**Timeline**', 'events in the order they happened, with dates'],
          ],
        },
      ],
      lines: [
        { say: 'Some features teach with pictures.', show: 't' },
        { say: 'A diagram is a drawing with labelled parts. It shows how something is built, or how it works, like the parts of a flower.', focus: 't.0' },
        { say: 'A map shows where places are.', focus: 't.1' },
        { say: 'And a timeline shows events in the order they happened, with their dates.', focus: 't.2' },
      ],
    },
    {
      chapter: 'The front and back of a book',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Feature', 'Where', 'What it lists'],
          rows: [
            ['**Table of contents**', 'front', 'the chapters, and the pages they start on'],
            ['**Glossary**', 'back', 'important words and their **meanings**, in ABC order'],
            ['**Index**', 'back', 'topics in ABC order, with **every page** they appear on'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Glossary and index are both at the back', md: 'The **glossary** tells you what a word *means*. The **index** tells you *where* a topic is.' },
      ],
      lines: [
        { say: 'At the front of a book, the table of contents lists the chapters, and the pages they start on.', show: 't', focus: 't.0' },
        { say: 'At the back, the glossary lists important words and their meanings, in alphabetical order.', focus: 't.1' },
        { say: 'The index also sits at the back. It lists topics in alphabetical order, with every page they appear on.', focus: 't.2' },
        { say: 'Here is a common mistake: mixing these two up. If you want a meaning, use the glossary. If you want a page number, use the index.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Where would you look?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'md', md: 'What does *cartilage* mean? → the **glossary**' },
        { kind: 'text', id: 'b', size: 'md', md: 'Every page that mentions *penguins*? → the **index**' },
      ],
      lines: [
        { say: 'You are reading a book about the human body, and you want to know what the word cartilage means. It is a special science word, and lists of special words and their meanings are in the glossary.', show: 'a' },
        { say: 'Now you want every page in a book about animals that mentions penguins. The table of contents lists only chapters, such as Birds. The index lists small topics, such as penguins, with every page number. So use the index.', show: 'b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You want to see the order in which events happened in the history of flight, with their dates. Which text feature would help most?',
          choices: ['A glossary', 'A timeline', 'A caption', 'A map'],
          answer: 1,
          working: 'A timeline shows events in the order they happened, with dates.',
        },
      ],
      lines: [
        { say: 'Your turn. Which text feature would help most? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, a timeline. A timeline shows events in the order they happened, with their dates.', show: 'q2.answer' },
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
            '**Headings** name a section; **captions** explain pictures.',
            '**Diagrams** show parts; **maps** show places; **timelines** show events in order.',
            'The **table of contents** lists chapters; the **glossary** gives meanings; the **index** gives pages.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Headings tell you what a section is about, and captions explain pictures.', show: 'sum.0' },
        { say: 'Diagrams show parts, maps show places, and timelines show events in order.', show: 'sum.1' },
        { say: 'And the table of contents lists chapters, the glossary gives meanings, and the index lists the pages for each topic.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
