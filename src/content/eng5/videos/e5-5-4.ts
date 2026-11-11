import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-5-4',
  lessonId: 'e5-5-4',
  title: 'Capital Letters and End Marks',
  summary:
    'Capitalize the first word of a sentence, the word I and proper nouns, but not seasons or common nouns. Statements end with a period, questions with a question mark and exclamations with an exclamation mark.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Capital Letters and End Marks', subtitle: 'The signposts of writing' }],
      lines: [
        { say: 'Capital letters and end marks are the signposts of writing.', show: 'title' },
        { say: 'A capital tells the reader that a sentence or a name is starting, and an end mark tells them that the sentence has finished, and how to read it. In this lesson, you will learn when to use each.' },
      ],
    },
    {
      chapter: 'Capital letters',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proper and common nouns', md: 'A **proper noun** names one particular person, place or thing, and takes a capital: *Ottawa*. A **common noun** names any one of a kind, and does not: *city*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Use a capital for', 'Example'],
          rows: [
            ['the first word of a sentence, and the word *I*', '**T**he game starts at noon. Mom and **I** went.'],
            ['names of people, pets and places', '**A**isha, **R**ex, **M**ain **S**treet'],
            ['days, months and holidays', '**M**onday, **J**uly, **T**hanksgiving'],
            ['titles of books and films', '**C**harlotte’s **W**eb'],
          ],
        },
      ],
      lines: [
        { say: 'A proper noun names one particular person, place or thing, and it takes a capital letter, like Ottawa. A common noun names any one of a kind, like city, and it does not.', show: 'def' },
        { say: 'Use a capital letter for the first word of a sentence, and for the word I.', show: 't', focus: 't.0' },
        { say: 'Use one for the names of people, pets and places, and for days, months and holidays.', focus: ['t.1', 't.2'] },
        { say: 'And use capitals for the main words in the titles of books and films.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Finding the missing capitals',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['last summer my family drove to paris in france.'] },
        { kind: 'text', id: 'ans', size: 'md', md: '**L**ast summer my family drove to **P**aris in **F**rance.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Seasons and general words stay small', md: '*spring*, *summer*, *school* and *river* get a capital only at the start of a sentence or as part of a name: *Riverside School*.' },
      ],
      lines: [
        { say: 'Which words in this sentence need capitals?', show: 'q' },
        { say: 'Last is the first word of the sentence. Paris and France are names of places. So all three need capitals.', show: 'ans', focus: 'ans' },
        { say: 'But summer is a season, and seasons are not capitalized. That is a common mistake. Spring, summer, school and river are common nouns. They get a capital only when they start a sentence, or are part of a name, like Riverside School.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Four kinds of sentences',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'What it does', 'End mark', 'Example'],
          rows: [
            ['**Statement**', 'tells something', '.', '*The library is closed today.*'],
            ['**Question**', 'asks something', '?', '*Is the library closed today?*'],
            ['**Command**', 'tells someone to do something', '. or !', '*Please close the door.*'],
            ['**Exclamation**', 'shows strong feeling', '!', '*What a huge wave that was!*'],
          ],
        },
      ],
      lines: [
        { say: 'There are four kinds of sentences, and each has its end mark.', show: 't' },
        { say: 'A statement tells something, and ends with a period.', focus: 't.0' },
        { say: 'A question asks something, and ends with a question mark.', focus: 't.1' },
        { say: 'A command tells someone to do something. It ends with a period, or with an exclamation mark if it is said strongly.', focus: 't.2' },
        { say: 'And an exclamation shows strong feeling, and ends with an exclamation mark.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“I wonder where my keys are” What kind of sentence is this, and how should it end?',
          choices: ['A question, with a question mark', 'A statement, with a period', 'An exclamation, with an exclamation mark', 'A command, with an exclamation mark'],
          answer: 1,
          working: 'It does not ask the reader anything; it tells what the speaker is wondering. So it is a statement and ends with a period.',
        },
      ],
      lines: [
        { say: 'Your turn. What kind of sentence is this, and how should it end? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. It does not ask the reader anything. It tells what the speaker is wondering, so it is a statement, and it ends with a period.', show: 'q2.answer' },
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
            'Capitalize the first word of a sentence, *I*, and **proper nouns**.',
            'Seasons and common nouns are not capitalized.',
            'Statements and most commands end with a period, questions with ?, exclamations with !',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Capitalize the first word of a sentence, the word I, and proper nouns: names of people, places, days, months and titles.', show: 'sum.0' },
        { say: 'Seasons and common nouns are not capitalized.', show: 'sum.1' },
        { say: 'And statements and most commands end with a period, questions with a question mark, and exclamations with an exclamation mark.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
