import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-5-5',
  lessonId: 'e5-5-5',
  title: 'Commas and Quotation Marks',
  summary:
    'Commas go between list items, after introductory words and phrases, around the name of someone spoken to, in dates and places, and before and, but or so joining two sentences. Quotation marks go around a speaker’s exact words.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Commas and Quotation Marks', subtitle: 'Pauses and spoken words' }],
      lines: [
        { say: 'A comma helps the reader see which words belong together, and quotation marks show the exact words a character says.', show: 'title' },
        { say: 'In this lesson, you will learn the main comma rules, and how to punctuate dialogue.' },
      ],
    },
    {
      chapter: 'Commas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Comma', md: 'A **comma** (,) marks a short pause. It shows the reader which words belong together.' },
        {
          kind: 'table',
          id: 't',
          head: ['Use a comma', 'Example'],
          rows: [
            ['between items in a list', '*We bought apples, pears and grapes.*'],
            ['after an introductory word or phrase', '*Yes, I would like to come.* *After dinner, we played.*'],
            ['when speaking to someone by name', '*Lina, can you help me?*'],
            ['in a date, and between a city and its province', '*Saturday, June 14* · *Halifax, Nova Scotia*'],
            ['before *and*, *but* or *so* joining two sentences', '*I wanted to swim, but the pool was closed.*'],
          ],
        },
      ],
      lines: [
        { say: 'A comma marks a short pause. It shows the reader which words belong together.', show: 'def' },
        { say: 'Use a comma between the items in a list: apples, pears and grapes. In this course, we write lists without a comma before the final and.', show: 't', focus: 't.0' },
        { say: 'Use one after an introductory word or phrase, like yes, or after dinner.', focus: 't.1' },
        { say: 'Use one when speaking to someone by name. Lina, can you help me?', focus: 't.2' },
        { say: 'Use commas in a date, and between a city and its province or state, like Halifax, Nova Scotia.', focus: 't.3' },
        { say: 'And use one before and, but or so when they join two sentences.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Placing the commas',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['On Monday June 2 we will visit Victoria British Columbia.'] },
        { kind: 'text', id: 'ans', size: 'md', md: 'On Monday, June 2, we will visit Victoria, British Columbia.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Spoken to, or spoken about?', md: '*Lina can help me*: we talk **about** Lina, so no comma. *Lina, can you help me?*: we talk **to** her.' },
      ],
      lines: [
        { say: 'Where do the commas go in this sentence?', show: 'q' },
        { say: 'The date needs a comma after the day, Monday, and another after June 2, to close it off. Then the city and province need a comma between them: Victoria, British Columbia.', show: 'ans', focus: 'ans' },
        { say: 'Here is a common mistake. A name in a sentence is not always spoken to. In Lina can help me, we are talking about Lina, so no comma is needed. In Lina, can you help me, we are talking to her, so her name is set off with a comma.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Quotation marks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quotation marks', md: '**Quotation marks** (“ ”) go around the **exact words** a person says. The end mark of the spoken words goes **inside** the closing quotation mark.' },
        {
          kind: 'table',
          id: 't',
          head: ['Pattern', 'Example'],
          rows: [
            ['Speaker first', '*Dad said, “Dinner is ready.”*'],
            ['Speaker last', '*“Dinner is ready,” Dad said.*'],
            ['A question', '*“Is dinner ready?” asked Mia.*'],
          ],
        },
      ],
      lines: [
        { say: 'Quotation marks go around the exact words a person says. The end mark of the spoken words goes inside the closing quotation mark.', show: 'def' },
        { say: 'When the speaker comes first, put a comma after said, then the spoken words, with the period inside the marks.', show: 't', focus: 't.0' },
        { say: 'When the speaker comes last, the spoken words end with a comma inside the marks, not a period, because the whole sentence is not finished yet.', focus: 't.1' },
        { say: 'And a question keeps its question mark inside the marks.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the correct way to write Omar’s question?',
          choices: [
            '“Can we go to the park” asked Omar?',
            '“Can we go to the park?” asked Omar.',
            '“Can we go to the park.” asked Omar?',
            'Can we go to the park? “asked Omar.”',
          ],
          answer: 1,
          working: 'The exact words “Can we go to the park” ask a question, so the question mark goes inside the closing quotation mark, and the sentence ends with a period.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the correct way to write Omar’s question? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Omar’s exact words ask a question, so the question mark goes inside the closing quotation mark, and the whole sentence ends with a period.', show: 'q2.answer' },
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
            'Commas: lists, introductions, names spoken to, dates and places, and before *and*, *but*, *so* joining sentences.',
            'Quotation marks go around a speaker’s exact words.',
            'The end mark or comma of the spoken words goes inside the closing mark.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Commas go between list items, after introductions, around names of people spoken to, in dates and places, and before and, but or so joining two sentences.', show: 'sum.0' },
        { say: 'Quotation marks go around a speaker’s exact words.', show: 'sum.1' },
        { say: 'And the end mark or comma of the spoken words goes inside the closing quotation mark.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
