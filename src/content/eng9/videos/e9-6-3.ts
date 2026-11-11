import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-6-3',
  lessonId: 'e9-6-3',
  title: 'Agreement in Hard Cases',
  summary:
    'A verb agrees with its real subject: ignore phrases between them, treat each, every, either and neither as singular, and with neither … nor agree with the nearer subject. A pronoun must agree with its antecedent, the noun it refers back to, and point to it clearly; use me after a preposition, as in between you and me.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Agreement in Hard Cases', subtitle: 'Finding the real subject' }],
      lines: [
        { say: 'Most of the time, making verbs and pronouns agree is easy. The hard cases come when the real subject is hidden, or a pronoun could point in two directions.', show: 'title' },
        { say: 'In this video we handle agreement in tricky sentences, and make pronouns point clearly.' },
      ],
    },
    {
      chapter: 'Subject-verb agreement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subject-verb agreement', md: '**Subject-verb agreement** means a **singular** subject takes a singular verb (*the dog **barks***), and a **plural** subject takes a plural verb (*the dogs **bark***). The trick is to find the **real subject**.' },
      ],
      lines: [
        { say: 'Subject-verb agreement means a singular subject takes a singular verb, the dog barks, and a plural subject takes a plural verb, the dogs bark.', show: 'def' },
        { say: 'The trick, in hard cases, is to find the real subject.', focus: 'def' },
      ],
    },
    {
      chapter: 'Hard cases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Hard case', 'Example'],
          rows: [
            ['a phrase between subject and verb', 'The **box** of chocolates **is** on the table.'],
            ['*each*, *every*, *either*, *neither*: singular', '**Each** of the players **has** a shirt.'],
            ['*neither … nor*: agree with the nearer', 'Neither the teacher nor the **students are** ready.'],
            ['*there is / there are*: look after the verb', 'There **are** three **reasons**.'],
            ['singular nouns ending in -s', '**Mathematics is** my strongest subject.'],
          ],
        },
      ],
      lines: [
        { say: 'When a phrase sits between the subject and the verb, ignore the phrase. The box of chocolates is on the table, because the subject is box.', show: 't', focus: 't.0' },
        { say: 'Each, every, either and neither are singular: each of the players has a shirt.', focus: 't.1' },
        { say: 'With neither, nor, agree with the nearer subject: neither the teacher nor the students are ready.', focus: 't.2' },
        { say: 'With there is and there are, look at what comes after the verb: there are three reasons. And some nouns end in s but are singular: mathematics is my strongest subject.', focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Collective nouns',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Be consistent with collective nouns', md: 'A group acting as one is usually singular: *The **team is** celebrating **its** victory.* British English also allows *The team are arguing among themselves.* But *The team is celebrating their victory* mixes the two.' },
      ],
      lines: [
        { say: 'Collective nouns, like team, class and committee, are usually singular when the group acts as one: the team is celebrating its victory.', show: 'm' },
        { say: 'British English also allows a plural verb when the members act separately: the team are arguing among themselves. Whichever you choose, keep the verb and the pronoun consistent. The team is celebrating their victory mixes the two.', focus: 'm' },
      ],
    },
    {
      chapter: 'Pronouns and antecedents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Antecedent', md: 'An **antecedent** is the noun a pronoun refers back to. In *Leo lost his bag*, **Leo** is the antecedent of **his**.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Unclear:** When Lena met Ruth, she was nervous.',
            '**Clear:** When Lena met Ruth, Lena was nervous.',
            '*Everyone should bring **their** own lunch.*',
            'between you and **me**, not between you and I',
          ],
        },
      ],
      lines: [
        { say: 'An antecedent is the noun a pronoun refers back to. In Leo lost his bag, Leo is the antecedent of his. A pronoun must agree with its antecedent, and point clearly to it.', show: 'def' },
        { say: 'When Lena met Ruth, she was nervous. Who was nervous? It is unclear. So write: when Lena met Ruth, Lena was nervous.', show: ['b.0', 'b.1'] },
        { say: 'For words like everyone and somebody, singular they is widely accepted: everyone should bring their own lunch.', show: 'b.2' },
        { say: 'And after a preposition such as between, for or with, use the object pronoun: between you and me, not between you and I.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which verb completes the sentence? “The list of names ___ on the door.”',
          choices: [
            'is, because the subject is “list”',
            'are, because “names” is plural',
            'were, because there are many names',
            'be, because it is formal',
          ],
          answer: 0,
          working: 'Cross out the phrase “of names”. What is on the door? The list. “List” is singular, so: The list of names is on the door.',
        },
      ],
      lines: [
        { say: 'Your turn. The list of names, gap, on the door. Which verb completes the sentence? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". Cross out the phrase of names. What is on the door? The list. And list is singular, so: the list of names is on the door.', caption: 'The answer is A. Cross out the phrase of names. What is on the door? The list. And list is singular, so: the list of names is on the door.', show: 'q2.answer' },
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
            'Find the **real subject**; ignore phrases such as “of the players”.',
            '*Each* and *every* are singular; with *neither … nor*, agree with the nearer.',
            'Keep collective nouns consistent: *the team is … its*.',
            'A pronoun must point clearly to its **antecedent**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find the real subject, and ignore phrases such as of the players.', show: 'sum.0' },
        { say: 'Each and every are singular, and with neither, nor, agree with the nearer subject.', show: 'sum.1' },
        { say: 'Keep collective nouns consistent: the team is celebrating its victory.', show: 'sum.2' },
        { say: 'And a pronoun must agree with its antecedent, and point to it clearly.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
