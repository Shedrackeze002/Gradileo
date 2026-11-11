import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-6-5',
  lessonId: 'e7-6-5',
  title: 'Punctuating Clauses and Dialogue',
  summary:
    'Use a comma after an opening dependent clause, before a conjunction joining two sentences, and on both sides of extra information. In dialogue, end punctuation goes inside the quotation marks, a comma separates speech from the tag, and each new speaker starts a new paragraph.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Punctuating Clauses and Dialogue', subtitle: 'Small marks that guide the reader' }],
      lines: [
        { say: 'Commas and quotation marks are small, but they tell a reader how to read a sentence: where to pause, which words are spoken, and who is speaking.', show: 'title' },
        { say: 'In this video we cover commas with clauses, and the rules for punctuating dialogue.' },
      ],
    },
    {
      chapter: 'Commas with clauses',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Comma', md: 'A **comma** marks a short pause and shows which words belong together.' },
        {
          kind: 'table',
          id: 't',
          head: ['Use a comma', 'Example'],
          rows: [
            ['after a dependent clause that **opens** a sentence', '*When the bell rang, we ran outside.*'],
            ['before *and, but, or, so* joining **two independent clauses**', '*It was cold, so we lit the fire.*'],
            ['around **extra information** in the middle', '*My uncle, who lives in Lagos, is visiting.*'],
          ],
        },
        { kind: 'text', id: 'a', size: 'md', md: 'Main clause first? Usually **no comma**: *We lit the fire because it was cold.*' },
      ],
      lines: [
        { say: 'A comma marks a short pause, and shows which words belong together. With clauses, there are three main rules.', show: 'def' },
        { say: 'Put a comma after a dependent clause that opens a sentence. When the bell rang, comma, we ran outside.', show: 't', focus: 't.0' },
        { say: 'Put one before and, but, or, or so when they join two independent clauses. It was cold, comma, so we lit the fire.', focus: 't.1' },
        { say: 'And put commas around extra information in the middle of a sentence. My uncle, who lives in Lagos, is visiting.', focus: 't.2' },
        { say: 'When the dependent clause comes after the main clause, a comma is usually not needed. We lit the fire because it was cold.', show: 'a' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Extra information needs two commas', md: '*My uncle, who lives in Lagos is visiting* is missing a comma. Information in the middle of a sentence needs a comma on **both** sides, like a pair of brackets.' },
      ],
      lines: [
        { say: 'A very common mistake is to use only one comma around extra information. My uncle, who lives in Lagos is visiting, is missing a comma.', show: 'm' },
        { say: 'Information in the middle of a sentence needs a comma on both sides, like a pair of brackets.', focus: 'm' },
      ],
    },
    {
      chapter: 'Punctuating dialogue',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Correct', 'Why'],
          rows: [
            ['“Wait for me,” called Leo.', 'comma inside the marks, before the tag'],
            ['Leo asked, “Where are you going?”', 'comma after the tag; question mark inside'],
            ['“Run!” shouted Leo. “The bridge is falling!”', '! inside; tag not capitalized'],
            ['“I can’t,” said Leo, “because I have to work.”', 'one sentence split by the tag: commas, no capital'],
          ],
        },
      ],
      lines: [
        { say: 'Now for dialogue. Put the spoken words inside quotation marks, and put the punctuation that ends the speech inside the closing mark.', show: 't' },
        { say: 'Use a comma between the speech and the dialogue tag, such as called Leo. Wait for me, comma, called Leo. If the tag comes first, the comma goes after it.', focus: ['t.0', 't.1'] },
        { say: 'If the speech ends with a question mark or an exclamation mark, there is no comma, and the tag is not capitalized. Run! shouted Leo.', focus: 't.2' },
        { say: 'When one spoken sentence is split by the tag, use commas, and no capital letter after the tag. And begin a new paragraph each time a new person speaks.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Direct and reported speech',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Direct and reported speech', md: '**Direct speech** gives a person’s exact words in quotation marks. **Reported speech** tells what they said without quoting it, and needs **no** quotation marks.' },
        {
          kind: 'table',
          id: 't',
          head: ['Direct', 'Reported'],
          rows: [['“I am hungry,” said Leo.', 'Leo said that he was hungry.']],
        },
      ],
      lines: [
        { say: 'Direct speech gives a person’s exact words in quotation marks.', show: 'def' },
        { say: 'Reported speech tells what they said without quoting it, so it needs no quotation marks. I am hungry, said Leo, becomes Leo said that he was hungry.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence is punctuated correctly?',
          choices: ['“Wait for me” called Leo.', '“Wait for me”, called Leo.', '“Wait for me,” called Leo.', '“Wait for me,” Called Leo.'],
          answer: 2,
          working: 'The comma goes inside the closing quotation mark, and the tag “called Leo” does not start with a capital letter.',
        },
      ],
      lines: [
        { say: 'Your turn. Which version of wait for me, called Leo, is punctuated correctly? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The comma goes inside the closing quotation mark, and the tag, called Leo, does not start with a capital letter.', show: 'q2.answer' },
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
            'Comma after an opening clause, before a joining conjunction, around extra information.',
            'End punctuation goes **inside** the quotation marks.',
            'Comma between speech and tag; new paragraph for each new speaker.',
            '**Reported speech** needs no quotation marks.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use a comma after an opening dependent clause, before a conjunction joining two sentences, and on both sides of extra information.', show: 'sum.0' },
        { say: 'In dialogue, end punctuation goes inside the quotation marks.', show: 'sum.1' },
        { say: 'Use a comma between the speech and the tag, and start a new paragraph for each new speaker.', show: 'sum.2' },
        { say: 'And reported speech needs no quotation marks.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
