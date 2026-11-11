import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-6-1',
  lessonId: 'e6-6-1',
  title: 'Pronouns: Subject, Object and Antecedent',
  thumbnailTitle: 'Pronouns',
  summary:
    'A pronoun takes the place of a noun. Use subject pronouns for subjects and object pronouns for objects and after prepositions, and make every pronoun agree with its antecedent and point to it clearly.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Pronouns', subtitle: 'Choosing the right one every time' }],
      lines: [
        { say: 'Pronouns are some of the shortest words in English, and some of the easiest to get wrong.', show: 'title' },
        { say: 'In this lesson, you will learn what pronouns are, how they change their form, and how to make them point clearly to the right noun.' },
      ],
    },
    {
      chapter: 'What is a pronoun?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pronoun', md: 'A **pronoun** is a word that takes the place of a noun: *I, you, he, she, it, we, they, me, him, her, us, them, my, your, his, its, our, their*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Without pronouns', 'With pronouns'],
          rows: [
            ['*Ana said Ana would bring Ana’s ball.*', '*Ana said **she** would bring **her** ball.*'],
            ['*Leo fed Leo’s cat.*', '*Leo fed **his** cat.*'],
            ['*The girls said the girls were tired.*', '*The girls said **they** were tired.*'],
          ],
        },
      ],
      lines: [
        { say: 'A pronoun is a word that takes the place of a noun: a person, place, thing or idea. Common pronouns are I, you, he, she, it, we and they, and me, him, her, us and them.', show: 'def' },
        { say: 'We use pronouns so we do not have to repeat the same noun again and again. Ana said Ana would bring Ana’s ball sounds strange.', show: 't', focus: 't.0' },
        { say: 'Instead, we say Ana said she would bring her ball. She and her both stand in for Ana, so the sentence is shorter and smoother.' },
        { say: 'In the same way, Leo fed his cat, and the girls said they were tired.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Subject and object pronouns',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Subject (does the action)', 'Object (receives it, or follows a preposition)', 'Possessive'],
          rows: [
            ['I', 'me', 'my, mine'],
            ['he, she', 'him, her', 'his, her, hers'],
            ['we', 'us', 'our, ours'],
            ['they', 'them', 'their, theirs'],
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Grandma made lunch for Leo and (I / me).'] },
      ],
      lines: [
        { say: 'Pronouns change their form depending on their job. A subject pronoun does the action. An object pronoun receives the action, or follows a preposition, like for, to or with.', show: 't' },
        { say: 'Which is right here, I or me? Use the cover-up test. Cover Leo and, and read: Grandma made lunch for I. That sounds wrong. Grandma made lunch for me sounds right.', show: 'q', focus: 'q' },
        { say: 'After the preposition for, we use an object pronoun. So Grandma made lunch for Leo and me.' },
      ],
    },
    {
      chapter: 'Common mistakes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“Me and her went” is not standard English', md: 'For subjects, use subject pronouns: *She and I went.* Put yourself last: *Leo and I*.' },
        { kind: 'callout', id: 'r', tone: 'tip', title: 'Reflexive pronouns', md: '*Kai taught* ***himself*** *to juggle.* But *Give the book to* ***me***, not *to myself*.' },
      ],
      lines: [
        { say: 'Here is a common mistake. When pronouns are the subject, use subject pronouns. Say she and I went, not me and her went. It is also polite to put yourself last: Leo and I, not I and Leo.', show: 'm' },
        { say: 'Reflexive pronouns, like myself, himself and themselves, are used when the subject acts on itself. Kai taught himself to juggle. They should not replace I or me. Say give the book to me, not to myself.', show: 'r', focus: 'r' },
      ],
    },
    {
      chapter: 'Pronouns and antecedents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Antecedent', md: 'The **antecedent** is the noun a pronoun refers to. In *The dog wagged its tail*, the antecedent of *its* is *the dog*. A pronoun must **agree** with it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Sentence', 'Why'],
          rows: [
            ['*The students handed in **their** projects.*', '*students* is plural'],
            ['*Each of the boys brought **his** own lunch.*', '*each* is singular'],
            ['*The team celebrated **its** victory.*', 'the team acts as one group'],
          ],
        },
      ],
      lines: [
        { say: 'The antecedent is the noun a pronoun refers to. In the dog wagged its tail, the antecedent of its is the dog.', show: 'def' },
        { say: 'A pronoun must agree with its antecedent: singular with singular, and plural with plural. Students is plural, so they handed in their projects.', show: 't', focus: 't.0' },
        { say: 'Each, every, either and neither are singular, so each of the boys brought his own lunch. When the person could be anyone, many writers use their: everyone brought their lunch.', focus: 't.1' },
        { say: 'And a pronoun must point clearly. In when the cup hit the plate, it broke, it could mean the cup or the plate. Rewrite it: the plate broke when the cup hit it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence uses pronouns correctly?',
          choices: [
            'Me and her walked to school.',
            'The coach gave the prize to Sam and I.',
            'She and I walked to school.',
            'Give the book to myself.',
          ],
          answer: 2,
          working: '“She and I” are the subject, so subject pronouns are right. B needs “me” after “to”, and D needs “me”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence uses pronouns correctly? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. She and I are the subject, so subject pronouns are right. Choice B needs me after to: cover Sam and, and you would never say to I. And Choice D needs me, not myself.', show: 'q2.answer' },
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
            'A **pronoun** takes the place of a noun.',
            '**Subject pronouns** for subjects; **object pronouns** for objects and after prepositions.',
            'Cover the other name in a pair to test which pronoun fits.',
            'A pronoun must agree with its **antecedent** and point to it clearly.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pronoun takes the place of a noun.', show: 'sum.0' },
        { say: 'Use subject pronouns for subjects, and object pronouns for objects and after prepositions.', show: 'sum.1' },
        { say: 'Cover the other name in a pair to test which pronoun fits.', show: 'sum.2' },
        { say: 'And a pronoun must agree with its antecedent, and point to it clearly.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
