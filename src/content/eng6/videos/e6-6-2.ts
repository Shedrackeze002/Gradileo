import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-6-2',
  lessonId: 'e6-6-2',
  title: 'Progressive and Perfect Verb Tenses',
  thumbnailTitle: 'Verb Tenses',
  summary:
    'Progressive tenses, made with be and -ing, show actions in progress, and perfect tenses, made with have, has or had and a past participle, show actions completed before a time. Keep tenses consistent unless the time really changes.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Verb Tenses', subtitle: 'In progress, and completed' }],
      lines: [
        { say: 'Verbs tell us not only what happens, but when.', show: 'title' },
        { say: 'In this lesson, you will learn tenses that show an action in progress, or an action completed before a certain time, and how to keep your tenses steady.' },
      ],
    },
    {
      chapter: 'Tense and helping verbs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tense', md: 'The **tense** of a verb shows **when** an action happens. *I walked*, *I walk* and *I will walk* are the three simple tenses.' },
        { kind: 'callout', id: 'h', tone: 'key', title: 'Helping verb', md: 'A **helping verb** (*am, is, was, have, had, will*) comes before the main verb and helps show its time: *She* ***has*** *finished*.' },
      ],
      lines: [
        { say: 'The tense of a verb shows when an action happens: in the past, the present or the future. I walked, I walk and I will walk are the three simple tenses.', show: 'def' },
        { say: 'Many tenses are built with a helping verb, also called an auxiliary verb. It comes before the main verb and helps show its time. In she has finished, has is the helping verb, and finished is the main verb.', show: 'h' },
      ],
    },
    {
      chapter: 'Progressive tenses',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Tense', 'Form', 'Example'],
          rows: [
            ['Present progressive', 'am / is / are + -ing', '*She **is reading**.*'],
            ['Past progressive', 'was / were + -ing', '*She **was reading** when the phone rang.*'],
            ['Future progressive', 'will be + -ing', '*She **will be reading** at eight.*'],
          ],
        },
      ],
      lines: [
        { say: 'A progressive tense shows an action that is, or was, or will be, still going on. It is made with a form of be, and a verb ending in I N G.', caption: 'A progressive tense shows an action that is, or was, or will be, still going on. It is made with a form of be, and a verb ending in -ing.', show: 't' },
        { say: 'She is reading means it is happening right now.', focus: 't.0' },
        { say: 'She was reading when the phone rang means the reading was in progress at a moment in the past.', focus: 't.1' },
        { say: 'And she will be reading at eight means it will be in progress at a moment in the future.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Perfect tenses',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Tense', 'Form', 'Example'],
          rows: [
            ['Present perfect', 'has / have + past participle', '*We **have visited** the coast twice.*'],
            ['Past perfect', 'had + past participle', '*The film **had started** when we arrived.*'],
            ['Future perfect', 'will have + past participle', '*I **will have finished** by tomorrow.*'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“Since” and the present perfect', md: '*I* ***have lived*** *here since I was six*, not *I live here since I was six*.' },
      ],
      lines: [
        { say: 'A perfect tense shows an action that is completed before a certain time. It is made with have, has or had, and a past participle, like visited or started.', show: 't' },
        { say: 'The present perfect connects a past action to now. We have visited the coast twice.', focus: 't.0' },
        { say: 'The past perfect shows an action completed before another past event. The film had started when we arrived. The film started first.', focus: 't.1' },
        { say: 'And the future perfect shows an action completed before a future time. I will have finished by tomorrow.', focus: 't.2' },
        { say: 'Here is a common mistake. Use the present perfect with since and for, when the action continues up to now. I have lived here since I was six, not I live here since I was six.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Keeping tenses consistent',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shifts in error', 'Consistent'],
          rows: [
            ['*The wind howled, the rain fell, and the trees **bend**.*', '*The wind howled, the rain fell, and the trees **bent**.*'],
            ['*She **runs** to the stop, but the bus left.*', '*She **ran** to the stop, but the bus **had left**.*'],
          ],
        },
      ],
      lines: [
        { say: 'When you tell a story or describe events, keep the verbs in the same tense, unless the time really changes. A sudden, unnecessary shift confuses the reader.', show: 't' },
        { say: 'The wind howled, the rain fell, and the trees bend, shifts into the present for no reason. The trees bent keeps it in the past.', focus: 't.0' },
        { say: 'A change of tense is right when the time changes. Yesterday I was nervous, but today I feel confident.', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“By the time we reached the station, the train ____.” Which verb is correct?',
          choices: ['leaves', 'had left', 'is leaving', 'will leave'],
          answer: 1,
          working: 'There are two past events, and the train left first, so it needs the past perfect: “had left”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which verb correctly completes the sentence? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, had left. There are two past events: the train left, and we reached the station. The train left first, so it needs the past perfect.', show: 'q2.answer' },
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
            '**Progressive** tenses (be + -ing) show actions in progress.',
            '**Perfect** tenses (have, has, had + past participle) show completed actions.',
            'Use the **past perfect** for the earlier of two past events.',
            'Keep tenses consistent unless the time really changes.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Progressive tenses, made with be and I N G, show actions in progress.', caption: 'Let’s sum up. Progressive tenses, made with be and -ing, show actions in progress.', show: 'sum.0' },
        { say: 'Perfect tenses, made with have, has or had and a past participle, show actions completed before a time.', show: 'sum.1' },
        { say: 'Use the past perfect for the earlier of two past events.', show: 'sum.2' },
        { say: 'And keep tenses consistent, unless the time really changes.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
