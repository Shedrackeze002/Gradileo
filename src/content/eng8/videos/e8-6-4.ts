import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-6-4',
  lessonId: 'e8-6-4',
  title: 'Semicolons and Colons',
  summary:
    'A semicolon joins two closely related complete sentences, comes before words like however, and separates list items that already contain commas. A colon follows a complete sentence and introduces a list, an explanation or a quotation. Never put a colon straight after a verb, and check that both sides of a semicolon are sentences.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Semicolons and Colons', subtitle: 'Two marks, two different jobs' }],
      lines: [
        { say: 'The semicolon and the colon look alike, but they do different jobs. Used well, they let you link ideas with precision.', show: 'title' },
        { say: 'In this video we learn when to use each one.' },
      ],
    },
    {
      chapter: 'The semicolon',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Semicolon ( ; )', md: 'A **semicolon** joins two closely related **complete sentences**. Each side should be able to stand alone as a sentence.' },
        { kind: 'text', id: 'e', size: 'lg', md: 'It rained all day; the match was cancelled.' },
      ],
      lines: [
        { say: 'A semicolon joins two closely related complete sentences. Each side should be able to stand alone as a sentence.', show: 'def' },
        { say: 'It rained all day, semicolon, the match was cancelled. A full stop would also be correct, but the semicolon shows that the two ideas are closely linked.', show: 'e' },
      ],
    },
    {
      chapter: 'More uses',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Use', 'Example'],
          rows: [
            ['fix a comma splice', 'The bell rang; everyone left the room.'],
            ['before *however*', 'Leo studied hard; however, the test was difficult.'],
            ['a list with commas', 'Lagos, Nigeria; Accra, Ghana; and Nairobi, Kenya'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Both sides must be sentences', md: '*We bought; apples, pears and plums* is wrong: *We bought* cannot stand alone.' },
      ],
      lines: [
        { say: 'A comma splice is two sentences wrongly joined by only a comma: the bell rang, everyone left the room. A semicolon is one way to fix it. You could also add and, or use a full stop.', show: 't', focus: 't.0' },
        { say: 'Semicolons often come before words like however, therefore and meanwhile. Put the semicolon before the word, and a comma after it.', focus: 't.1' },
        { say: 'And semicolons separate items in a list when the items already contain commas, as in this list of cities and their countries.', focus: 't.2' },
        { say: 'But check both sides. We bought, semicolon, apples, pears and plums is wrong, because we bought cannot stand alone as a sentence.', show: 'm' },
      ],
    },
    {
      chapter: 'The colon',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Colon ( : )', md: 'A **colon** comes after a **complete sentence** and announces that something follows which explains or completes it: a **list**, an **explanation** or a **quotation**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Use', 'Example'],
          rows: [
            ['a list', 'Bring three things: a pen, a ruler and a calculator.'],
            ['an explanation', 'Leo had one reason for leaving: he was exhausted.'],
            ['emphasis', 'One word sums up the day: chaos.'],
            ['a quotation', 'Puck sums it up: “Lord, what fools these mortals be!”'],
          ],
        },
      ],
      lines: [
        { say: 'A colon comes after a complete sentence, and announces that something follows which explains or completes it.', show: 'def' },
        { say: 'It can introduce a list: bring three things, colon, a pen, a ruler and a calculator. Or an explanation: Leo had one reason for leaving. He was exhausted.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'It can add emphasis: one word sums up the day. Chaos. And it can introduce a quotation, such as Puck’s line: Lord, what fools these mortals be.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'No colon straight after a verb', md: '*My favourite subjects are: art and music* is wrong, because *My favourite subjects are* is not a complete sentence.\n\n**Fix:** *My favourite subjects are art and music.* Or: *I have two favourite subjects: art and music.*' },
      ],
      lines: [
        { say: 'A common mistake is to put a colon straight after a verb. My favourite subjects are, colon, art and music, is wrong, because my favourite subjects are is not a complete sentence.', show: 'm' },
        { say: 'Either drop the colon, or complete the sentence first: I have two favourite subjects, colon, art and music.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The sign gave one clear warning ___ the bridge was closed.” Which mark fits the gap best?',
          choices: [
            'a semicolon ( ; )',
            'a colon ( : )',
            'a comma ( , )',
            'no mark at all',
          ],
          answer: 1,
          working: 'The second part tells us what the warning was, so it explains the first part. A colon announces an explanation: “The sign gave one clear warning: the bridge was closed.”',
        },
      ],
      lines: [
        { say: 'Your turn. The sign gave one clear warning, gap, the bridge was closed. Which mark fits the gap best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, a colon. The second part tells us what the warning was, so it explains the first part, and a colon announces an explanation.', show: 'q2.answer' },
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
            'A **semicolon** joins two related complete sentences.',
            'It also comes before *however*, and separates list items with commas.',
            'A **colon** follows a complete sentence: a list, explanation or quotation.',
            'No colon after a verb; both sides of a semicolon must be sentences.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A semicolon joins two closely related complete sentences.', show: 'sum.0' },
        { say: 'It also comes before words like however, and separates list items that already contain commas.', show: 'sum.1' },
        { say: 'A colon follows a complete sentence, and introduces a list, an explanation or a quotation.', show: 'sum.2' },
        { say: 'Never put a colon straight after a verb, and check that both sides of a semicolon are sentences.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
