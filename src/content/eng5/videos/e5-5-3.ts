import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-5-3',
  lessonId: 'e5-5-3',
  title: 'Subject-Verb Agreement and Verb Tense',
  thumbnailTitle: 'Agreement and Verb Tense',
  summary:
    'A verb must agree with its subject: a singular subject takes a present verb ending in -s, and a plural subject takes it without. A verb’s tense, past, present or future, tells when something happens, and irregular verbs have their own past forms.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Agreement and Verb Tense', subtitle: 'Who, and when' }],
      lines: [
        { say: 'Verbs change their form to match who is doing something, and when it happens.', show: 'title' },
        { say: 'The dog barks. The dogs bark. The dog barked. The verb changes each time. In this lesson, you will learn to make verbs agree with their subjects, and to use the right tense.' },
      ],
    },
    {
      chapter: 'Agreement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Agreement', md: 'A verb must **agree** with its subject. In the present tense, a **singular** subject takes a verb ending in **-s**: *The bird* ***sings***. A **plural** subject takes it **without -s**: *The birds* ***sing***.' },
        {
          kind: 'table',
          id: 't',
          head: ['Singular', 'Plural'],
          rows: [
            ['The puppy **runs**.', 'The puppies **run**.'],
            ['She **is** ready.', 'They **are** ready.'],
            ['My friend **has** a bike.', 'My friends **have** bikes.'],
          ],
        },
      ],
      lines: [
        { say: 'A verb must agree with its subject. In the present tense, a singular subject, meaning one, takes a verb ending in S. The bird sings.', caption: 'A verb must agree with its subject. In the present tense, a singular subject, meaning one, takes a verb ending in -s. The bird sings.', show: 'def' },
        { say: 'A plural subject, meaning more than one, takes the verb without S. The birds sing.', caption: 'A plural subject, meaning more than one, takes the verb without -s. The birds sing.', focus: 'def' },
        { say: 'The puppy runs, but the puppies run. I and you take the form without S, too: I sing, you sing.', caption: 'The puppy runs, but the puppies run. I and you take the form without -s, too: I sing, you sing.', show: 't', focus: 't.0' },
        { say: 'Some verbs have their own forms. She is ready, they are ready. My friend has a bike, my friends have bikes.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Finding the real subject',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The box of crayons (is / are) on the shelf.'] },
        { kind: 'text', id: 'ans', size: 'lg', md: 'The **box** of crayons **is** on the shelf.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Two subjects joined by “and”', md: 'Two subjects joined by *and* make a plural: *Ana and Ben* ***are*** *here*.' },
      ],
      lines: [
        { say: 'Which verb fits here, is or are?', show: 'q' },
        { say: 'Find the subject. What is on the shelf? The box is. Of crayons only describes the box. Box is singular, so the box of crayons is on the shelf.', show: 'ans', focus: 'ans' },
        { say: 'Here is a common mistake. Two subjects joined by and make a plural. Ana and Ben are here, not Ana and Ben is here.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Verb tense',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Verb tense', md: 'The **tense** of a verb tells **when** something happens: past, present or future.' },
        {
          kind: 'table',
          id: 't',
          head: ['Tense', 'Example'],
          rows: [
            ['Past', '*We* ***walked*** *to school.*'],
            ['Present', '*We* ***walk*** *to school.*'],
            ['Future', '*We* ***will walk*** *to school.*'],
          ],
        },
      ],
      lines: [
        { say: 'The tense of a verb tells when something happens.', show: 'def' },
        { say: 'The past tense is for what already happened: we walked to school. The present is happening now, or usually: we walk to school. And the future will happen: we will walk to school.', show: 't' },
      ],
    },
    {
      chapter: 'Irregular verbs',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Present', 'Past'], rows: [['go', 'went'], ['eat', 'ate'], ['catch', 'caught'], ['bring', 'brought'], ['write', 'wrote']] },
      ],
      lines: [
        { say: 'Most verbs form the past by adding E D. Walk becomes walked.', caption: 'Most verbs form the past by adding -ed. Walk becomes walked.' },
        { say: 'Irregular verbs change in other ways, and they have to be learned. Go becomes went, eat becomes ate, catch becomes caught, bring becomes brought, and write becomes wrote.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Yesterday Kai (catch) a huge fish.” Which form of the verb is correct?',
          choices: ['catches', 'catched', 'caught', 'will catch'],
          answer: 2,
          working: '“Yesterday” tells us it is the past, and catch is irregular: its past form is “caught”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which form of the verb catch is correct? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, caught. Yesterday tells us it is the past, and catch is irregular, so its past form is not catched.', show: 'q2.answer' },
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
            'A singular subject takes a present verb with *-s*; a plural subject takes it without.',
            'Find the real subject, skipping words such as *of crayons*.',
            '**Past**, **present** and **future** tense tell when something happens.',
            'Irregular verbs have their own past forms: *went, ate, caught*.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A singular subject takes a present verb ending in S, and a plural subject takes it without.', caption: 'Let’s sum up. A singular subject takes a present verb ending in -s, and a plural subject takes it without.', show: 'sum.0' },
        { say: 'Find the real subject, skipping words such as of crayons that come between.', show: 'sum.1' },
        { say: 'Past, present and future tense tell when something happens.', show: 'sum.2' },
        { say: 'And irregular verbs have their own past forms, like went, ate and caught.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
