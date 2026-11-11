import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-1-3',
  lessonId: 'ex-1-3',
  title: 'Comparing Writers’ Viewpoints and Methods',
  thumbnailTitle: 'Comparing Two Writers',
  thumbnail: false,
  summary:
    'A writer’s viewpoint is what the writer thinks and feels about the subject, and tone is the attitude the writing carries. The strongest comparison names each writer’s method, quotes it, says what it is used to do, and sets the two writers side by side with a comparing word.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Evaluating and Comparing Texts', title: 'Comparing Two Writers', subtitle: 'Viewpoints and methods' }],
      lines: [
        { say: 'Give two people the same rainy afternoon, and one will write about ruined plans, the other about the smell of wet earth. The rain is the same. What differs is how each person sees it.', show: 'title' },
        { say: 'In this lesson, you will compare two writers: what they think, and how they make you feel it.' },
      ],
    },
    {
      chapter: 'Viewpoint',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Viewpoint', md: 'What the writer **thinks and feels** about the subject: an opinion, and the attitude that goes with it.' },
        { kind: 'quote', id: 'a', size: 'md', lines: ['Winter is four months of scraping ice off a car in the dark. Who decided this was acceptable?'], by: 'Source A, a modern writer' },
        { kind: 'quote', id: 'b', size: 'md', lines: ['The frost has made a cathedral of our lane. Every twig is silvered, and the very air rings like a bell.'], by: 'Source B, a nineteenth-century writer' },
      ],
      lines: [
        { say: 'A writer’s viewpoint is what the writer thinks and feels about the subject: an opinion, and the attitude that goes with it.', show: 'def' },
        { say: 'Here are two sources about winter. Source A: winter is four months of scraping ice off a car in the dark. Who decided this was acceptable?', show: 'a' },
        { say: 'Source B: the frost has made a cathedral of our lane. Every twig is silvered, and the very air rings like a bell.', show: 'b' },
        { say: 'The writer of Source A sees winter as a miserable inconvenience, whereas the writer of Source B sees it as a time of beauty. That one sentence, with the comparing word whereas, compares the viewpoints.' },
      ],
    },
    {
      chapter: 'Tone',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tone', md: 'The **attitude that the writing carries**, as a tone of voice does in speech: angry, amused, admiring, bitter, hopeful.' },
        { kind: 'table', id: 't', head: ['', 'Tone', 'Words that carry it'], rows: [['Source A', 'Irritable and sarcastic', '“scraping”, “in the dark”'], ['Source B', 'Admiring and joyful', '“cathedral”, “silvered”, “rings”']] },
      ],
      lines: [
        { say: 'Tone is the attitude that the writing carries, as a tone of voice does in speech.', show: 'def' },
        { say: 'Two adjectives are usually more exact than one. Source A is irritable and sarcastic. You can hear it in scraping, in the dark, and in the sharp question.', show: 't.0', focus: 't.0' },
        { say: 'Source B is admiring and joyful, and the feeling is carried by cathedral, silvered and rings.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Methods',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Method', md: 'Anything a writer does **on purpose** to affect the reader: a choice of word, an image, a kind of sentence.' },
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'Example'],
          rows: [['Rhetorical question', '“Who decided this was acceptable?”'], ['Metaphor', '“The frost has made a cathedral of our lane”'], ['Simile', '“the very air rings like a bell”']],
        },
      ],
      lines: [
        { say: 'A method is anything a writer does on purpose to affect the reader: a choice of word, an image, or a kind of sentence.', show: 'def' },
        { say: 'Source A uses a rhetorical question, a question asked for effect, not for an answer. Source B uses a metaphor, which says one thing is another, and a simile, a comparison using like or as.', show: 't', focus: 't' },
        { say: 'Naming a method is only the start. A cathedral is vast, beautiful and a place of wonder. Calling the frozen lane a cathedral makes an ordinary place seem grand, so it shows that the writer looks at winter with awe.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Comparing the methods',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The writer of Source A uses a **rhetorical question** (“Who decided this was acceptable?”) to invite the reader to share his irritation, **whereas** the writer of Source B uses a **metaphor** (“a cathedral of our lane”) to present winter as a thing of wonder.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“It makes the reader want to read on”', md: 'A comment that could be written about any text explains nothing. Say what **this** method makes the reader feel about **this** subject.' },
      ],
      lines: [
        { say: 'The strongest comparison does four things in one sentence. It names each writer’s method, quotes it, says what it is used to do, and joins the two with a comparing word.', show: 'p' },
        { say: 'The writer of Source A uses a rhetorical question to invite the reader to share his irritation, whereas the writer of Source B uses a metaphor to present winter as a thing of wonder.', focus: 'p' },
        { say: 'Avoid comments that could be written about any text, such as, it makes the reader want to read on. Say what this method makes the reader feel about this subject.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which method is used in “the very air rings like a bell”?',
          choices: ['Metaphor', 'Rhetorical question', 'Simile', 'Direct address'],
          answer: 2,
          working: 'It compares the air to a bell using the word “like”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which method is used in, the very air rings like a bell? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, a simile. It compares the air to a bell using the word like. A metaphor, choice A, would say that the air is a bell.', show: 'q.answer' },
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
            'A viewpoint is what the writer thinks and feels; tone is the attitude the writing carries.',
            'Compare viewpoints in one sentence with a comparing word.',
            'Explain each method: what it makes the reader picture or feel.',
            'Name each method, quote it, give its purpose and set the writers side by side.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A writer’s viewpoint is what the writer thinks and feels about the subject, and the tone is the attitude the writing carries.', show: 'sum.0' },
        { say: 'Compare viewpoints in one sentence, with a comparing word such as whereas.', show: 'sum.1' },
        { say: 'Explain each method by saying what it makes the reader picture or feel.', show: 'sum.2' },
        { say: 'And the best comparison names each method, quotes it, gives its purpose, and sets the two writers side by side.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
