import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-7-2',
  lessonId: 'e10-7-2',
  title: 'Punctuation',
  thumbnail: false,
  summary:
    'Use commas, apostrophes, semicolons and colons the way careful writers do: commas around non-essential information, apostrophes for possession, and colons only after a complete clause.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Punctuation', subtitle: 'Commas, apostrophes, semicolons and colons' }],
      lines: [
        { say: 'Compare “Let’s eat, Grandma!” with “Let’s eat Grandma!” One comma stands between a family dinner and a horror story.', show: 'title' },
        { say: 'Punctuation marks tell a reader where to pause, what belongs together and what is extra. In this lesson you will use four marks the way careful writers do.' },
      ],
    },
    {
      chapter: 'Commas',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['After an introduction: *When the bell rang, the students hurried out.*', 'Before a conjunction joining two independent clauses: *The road was icy, so the buses stayed in the depot.*', 'Around direct address: *Thank you for your help, Omar.*', 'Never between a subject and its verb'] },
        { kind: 'text', id: 'ans', md: 'Punctuate: *My oldest sister who is a nurse works night shifts.*\n\n*My oldest sister, who is a nurse, works night shifts.*', size: 'md' },
      ],
      lines: [
        { say: 'Most comma rules come down to a few uses. A comma follows an introduction, so the reader does not misread it.', show: 'b.0' },
        { say: 'A comma goes before a conjunction that joins two independent clauses, and around the name of the person you are speaking to.', show: ['b.1', 'b.2'] },
        { say: 'And never put a comma between a subject and its verb, however long the subject is.', show: 'b.3' },
        { say: 'Commas also set off non-essential information, which adds a detail about someone already identified. A person has only one oldest sister, so the clause “who is a nurse” is non-essential, and gets a comma at both ends.', hide: 'b', show: 'ans' },
      ],
    },
    {
      chapter: 'Apostrophes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Owner', 'Rule', 'Example'],
          rows: [
            ['singular noun', 'add ’s', 'the teacher’s desk'],
            ['plural ending in s', 'add ’ only', 'the teachers’ meeting'],
            ['plural not ending in s', 'add ’s', 'the children’s playground'],
          ],
        },
      ],
      lines: [
        { say: 'An apostrophe shows possession, or marks missing letters in a contraction. First, write the owner, then decide.', show: 't.0' },
        { say: 'For a singular owner, add apostrophe s: the teacher’s desk.', focus: 't.0' },
        { say: 'For a plural ending in s, add only the apostrophe: the teachers’ meeting.', show: 't.1', focus: 't.1' },
        { say: 'For a plural that does not end in s, add apostrophe s: the children’s playground. Plain plurals and words like its, their and whose never take an apostrophe.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Semicolons and colons',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Semicolon and colon', md: 'A **semicolon** joins two closely related independent clauses: *The first half was dull; the second half was thrilling.*\n\nA **colon** follows a complete clause and introduces a list or explanation: *Hana packed three things for the hike: a map, a compass and a water bottle.*' },
      ],
      lines: [
        { say: 'These two marks look alike, but do different jobs. A semicolon joins two closely related independent clauses.', show: 'def' },
        { say: 'A colon comes after a complete clause, and introduces a list or an explanation. Hana packed three things for the hike, and then the colon, and then the list.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'A colon after a verb', md: '*The recipe needs: flour, eggs and milk* is wrong, because *the recipe needs* is not a complete clause. Write *The recipe needs flour, eggs and milk*.' }],
      lines: [
        { say: 'A common mistake is putting a colon straight after a verb. On screen, the colon comes right after the word needs, but that part is not a complete clause.', show: 'm' },
        { say: 'Leave the colon out, or complete the clause before it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which phrase is correct for the toys that belong to several dogs?',
          choices: ['the dog’s toys', 'the dogs toy’s', 'the dogs’ toys', 'the dogs’s toys'],
          answer: 2,
          working: 'The owner is dogs, a plural ending in s, so add only an apostrophe after it.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four phrases is correct for the toys that belong to several dogs? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The owner is dogs, a plural ending in s, so we add only an apostrophe after it. Choice A would mean the toys of one dog.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Commas: after introductions, before conjunctions, around non-essential information and direct address.', 'Apostrophes show possession; write the owner first.', 'A semicolon joins related clauses; a colon follows a complete clause.'] }],
      lines: [
        { say: 'Let’s sum up. Commas go after introductions, before joining conjunctions, and around non-essential information and direct address.', show: 'sum.0' },
        { say: 'Apostrophes show possession, so write the owner first.', show: 'sum.1' },
        { say: 'And a semicolon joins related clauses, while a colon follows a complete clause.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
