import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-6-4',
  lessonId: 'e6-6-4',
  title: 'Commas and Apostrophes',
  summary:
    'Apostrophes show contractions and possession: dog’s for one owner, dogs’ for a plural ending in s, and children’s for a plural that does not. Commas go before FANBOYS joining two sentences, after introductory parts and on both sides of extra information.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Commas and Apostrophes', subtitle: 'Two small marks, many mistakes' }],
      lines: [
        { say: 'Two small marks cause a great many mistakes: the apostrophe and the comma.', show: 'title' },
        { say: 'In this lesson, you will learn exactly when each one is needed, and, just as important, when it is not.' },
      ],
    },
    {
      chapter: 'Two marks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Apostrophe and comma', md: 'An **apostrophe** ( ’ ) sits **above** the line: *don’t*, *Mia’s*. It shows missing letters or ownership. A **comma** ( , ) sits **on** the line. It marks a short pause and shows which words belong together.' },
      ],
      lines: [
        { say: 'An apostrophe is a raised mark that sits above the line, between letters, as in don’t and Mia’s. It shows that letters are missing, or that something belongs to someone.', show: 'def' },
        { say: 'A comma is a small mark that sits on the line. It tells the reader to make a short pause, and shows which words belong together in a sentence.', focus: 'def' },
      ],
    },
    {
      chapter: 'Apostrophes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Job', 'Rule', 'Examples'],
          rows: [
            ['**Contraction**', 'shows where letters are left out', '*do not* → *don’t*; *it is* → *it’s*'],
            ['**Possession**, one owner', 'add **’s**', '*the dog’s bone*; *Mia’s coat*'],
            ['**Possession**, plural ending in s', 'add only **’**', '*the girls’ coats*; *the dogs’ bowls*'],
            ['**Possession**, plural not ending in s', 'add **’s**', '*the children’s toys*; *the men’s team*'],
          ],
        },
      ],
      lines: [
        { say: 'An apostrophe has two jobs. In a contraction, it shows where letters are left out. Do not becomes don’t, and it is becomes it’s.', show: 't', focus: 't.0' },
        { say: 'It also shows possession. For one owner, add an apostrophe and S: the dog’s bone.', caption: 'It also shows possession. For one owner, add an apostrophe and s: the dog’s bone.', focus: 't.1' },
        { say: 'For a plural that ends in S, add only the apostrophe, after the S: the girls’ coats, when there are several girls.', caption: 'For a plural that ends in s, add only the apostrophe, after the s: the girls’ coats, when there are several girls.', focus: 't.2' },
        { say: 'And for a plural that does not end in S, add an apostrophe and S: the children’s toys.', caption: 'And for a plural that does not end in s, add an apostrophe and s: the children’s toys.', focus: 't.3' },
      ],
    },
    {
      chapter: 'It’s and its',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'It’s and its', md: '*It’s* always means *it is* or *it has*. *Its* means *belonging to it*. A plain plural never takes an apostrophe: *Fresh apples for sale*, not *apple’s*.' },
      ],
      lines: [
        { say: 'Here is a common mistake. I T apostrophe S always means it is, or it has. I T S, with no apostrophe, means belonging to it, like his and hers.', caption: 'Here is a common mistake. It’s always means it is, or it has. Its, with no apostrophe, means belonging to it, like his and hers.', show: 'm' },
        { say: 'And a plain plural never takes an apostrophe. Fresh apples for sale, not apple apostrophe S.', caption: 'And a plain plural never takes an apostrophe. Fresh apples for sale, not apple’s.', focus: 'm' },
      ],
    },
    {
      chapter: 'Commas in sentences',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Use a comma', 'Example'],
          rows: [
            ['before FANBOYS joining two sentences', '*I like apples, but my sister likes pears.*'],
            ['after an introductory word, phrase or clause', '*However, the bus was late.* *When the bell rang, we left.*'],
            ['around extra information', '*My cousin, who lives in Halifax, is visiting.*'],
            ['around a phrase that renames a noun', '*Sam, our team captain, scored twice.*'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'One subject, two verbs: no comma', md: '*The dog barked and wagged its tail* needs no comma before *and*.' },
      ],
      lines: [
        { say: 'Use a comma before a FANBOYS conjunction joining two independent clauses. I like apples, but my sister likes pears.', show: 't', focus: 't.0' },
        { say: 'Use one after an introductory word, phrase or clause, like however, or when the bell rang.', focus: 't.1' },
        { say: 'Use commas on both sides of extra information in the middle of a sentence. If the speaker has only one cousin, who lives in Halifax is extra, so it needs a comma on each side.', focus: 't.2' },
        { say: 'And use them around a phrase that renames a noun. Sam, our team captain, scored twice.', focus: 't.3' },
        { say: 'Here is another common mistake. The dog barked and wagged its tail has one subject doing two things, so it needs no comma before and. Use the comma only when and joins two complete sentences.', show: 'm', focus: 'm' },
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
          choices: [
            'The childrens’ coats were wet.',
            'The dog wagged it’s tail.',
            'The two girls’ bikes were by the gate.',
            'Fresh carrot’s for sale.',
          ],
          answer: 2,
          working: '“Girls” is a plural ending in s, so it takes only an apostrophe. A should be “children’s”, B “its”, and D “carrots”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence is punctuated correctly? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Girls is a plural that ends in S, so it takes only an apostrophe. Choice A should be children’s, Choice B should be its with no apostrophe, and Choice D is a plain plural.', caption: 'The answer is C. Girls is a plural that ends in s, so it takes only an apostrophe. Choice A should be children’s, Choice B should be its with no apostrophe, and Choice D is a plain plural.', show: 'q2.answer' },
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
            'Apostrophes show **contractions** and **possession**: *dog’s*, *dogs’*, *children’s*.',
            '*It’s* = it is; *its* = belonging to it; plurals take no apostrophe.',
            'Commas: before FANBOYS joining sentences, after introductions, around extra information.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Apostrophes show contractions and possession.', show: 'sum.0' },
        { say: 'It’s with an apostrophe means it is. Its without one means belonging to it. And plain plurals take no apostrophe.', caption: 'It’s means it is. Its means belonging to it. And plain plurals take no apostrophe.', show: 'sum.1' },
        { say: 'Use commas before FANBOYS joining two sentences, after introductory parts, and on both sides of extra information.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
