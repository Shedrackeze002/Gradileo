import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-6-4',
  lessonId: 'e7-6-4',
  title: 'Agreement',
  summary:
    'A verb agrees with its subject in number, so a singular subject takes a singular verb and a plural subject a plural verb. A pronoun agrees with its antecedent, the noun it stands for, and should never point to more than one person.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Agreement', subtitle: 'Words that belong together must match' }],
      lines: [
        { say: 'In a correct sentence, words that belong together must agree.', show: 'title' },
        { say: 'Agreement is easy in short sentences and tricky in long ones, so in this video we focus on the tricky cases, for verbs and for pronouns.' },
      ],
    },
    {
      chapter: 'Subject–verb agreement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Agreement', md: 'A verb must **agree** with its subject in number: a **singular** subject takes a singular verb (*my sister plays*), and a **plural** subject takes a plural verb (*the dogs play*).' },
        {
          kind: 'table',
          id: 't',
          head: ['Tricky case', 'Example'],
          rows: [
            ['ignore phrases in between', 'The box *of chocolates* **is** on the table.'],
            ['*each, every, either, neither, one* are singular', 'Each of the players **gets** a medal.'],
            ['*neither… nor*: match the nearer subject', 'Neither the teacher nor the students **were** ready.'],
            ['a group acting as one is usually singular', 'The team **is** celebrating its win.'],
          ],
        },
      ],
      lines: [
        { say: 'A verb must agree with its subject in number. A singular subject takes a singular verb: my sister plays. A plural subject takes a plural verb: the dogs play.', show: 'def' },
        { say: 'The hard part is finding the real subject. Ignore phrases in between. In the box of chocolates is on the table, the subject is box, so the verb is is.', show: 't', focus: 't.0' },
        { say: 'Each, every, either, neither and one are singular. Each of the players gets a medal.', focus: 't.1' },
        { say: 'With neither and nor, match the nearer subject. Neither the teacher nor the students were ready. And a group acting as one unit is usually singular: the team is celebrating its win.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Finding the subject',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The list of names on the board ___ long.'] },
        { kind: 'text', id: 'a', size: 'lg', md: 'The **list** (of names on the board) **is** long.' },
      ],
      lines: [
        { say: 'Which verb fills the gap? The list of names on the board, blank, long.', show: 'q' },
        { say: 'Put brackets round the phrase of names on the board, and cross it out in your head. The subject is list, which is singular.', show: 'a' },
        { say: 'So the list of names on the board is long. The plural word names is not the subject, so it does not decide the verb.', focus: 'a' },
      ],
    },
    {
      chapter: 'Pronoun–antecedent agreement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Antecedent', md: 'The **antecedent** is the noun a pronoun stands for. In *The girls packed their bags*, *girls* is the antecedent of *their*.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['*The tree lost **its** leaves.* (one tree)', '*Neither of the boys remembered **his** coat.* (*neither* is singular)', '*Everyone should bring **their** own lunch.* (singular *they*)'],
        },
      ],
      lines: [
        { say: 'The antecedent is the noun a pronoun stands for. In the girls packed their bags, girls is the antecedent of their.', show: 'def' },
        { say: 'A pronoun must agree with its antecedent in number. The tree lost its leaves, because there is one tree.', show: 'b.0' },
        { say: 'Neither of the boys remembered his coat, because neither is singular.', show: 'b.1' },
        { say: 'For a word like everyone, when we do not know the person’s gender, singular they is widely accepted: everyone should bring their own lunch. His or her is also correct.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Unclear pronouns',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Unclear pronouns', md: '*When Tom met Jack, he smiled.* Who smiled? If a pronoun could point to two people, **name the person**: *When Tom met Jack, Jack smiled.*' },
      ],
      lines: [
        { say: 'Here is a common mistake. When Tom met Jack, he smiled. Who smiled, Tom or Jack?', show: 'm' },
        { say: 'If a pronoun could point to two people, name the person instead. When Tom met Jack, Jack smiled.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence is correct?',
          choices: ['The basket of apples are heavy.', 'The basket of apples is heavy.', 'The basket of apples were heavy.', 'The basket of apples be heavy.'],
          answer: 1,
          working: 'Cross out “of apples”: the subject is “basket”, which is singular, so the verb is “is”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence about the basket of apples is correct? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Cross out of apples, and the subject is basket, which is singular. So the verb is is.', show: 'q2.answer' },
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
            'A verb agrees with its subject: singular with singular, plural with plural.',
            'Ignore phrases in between; *each* and *every* are singular.',
            'A pronoun agrees with its **antecedent**, the noun it replaces.',
            'Avoid pronouns that could point to more than one person.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A verb agrees with its subject: singular with singular, and plural with plural.', show: 'sum.0' },
        { say: 'Ignore phrases between the subject and the verb, and remember that each and every are singular.', show: 'sum.1' },
        { say: 'A pronoun agrees with its antecedent, the noun it replaces.', show: 'sum.2' },
        { say: 'And avoid pronouns that could point to more than one person.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
