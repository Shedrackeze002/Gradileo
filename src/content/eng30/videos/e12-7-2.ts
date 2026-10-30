import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-7-2',
  lessonId: 'e12-7-2',
  title: 'Advanced Grammar in Complex Sentences',
  thumbnailTitle: 'Advanced Grammar',
  thumbnail: false,
  summary:
    'One wrong verb, a list that changes shape or a phrase that describes the wrong person can make a strong argument look careless. Learn tricky agreement, parallel structure, logical comparisons and dangling modifiers.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Language', title: 'Advanced Grammar in Complex Sentences', subtitle: 'Agreement, parallelism, comparison and modifiers' }],
      lines: [
        { say: 'A reader trusts a careful writer. One wrong verb, or an opening phrase that seems to describe the wrong person, can make a strong argument look careless.', show: 'title' },
        { say: 'In this lesson you will apply the rules that matter most in long sentences: agreement in tricky places, parallel structure, logical comparisons, and clear modification and reference.' },
      ],
    },
    {
      chapter: 'Agreement in tricky places',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'a',
          items: [
            '*The number of applicants **has** risen.*',
            '*A number of applicants **have** withdrawn.*',
            '*Neither the principal nor the teachers **have** signed.*',
            '*This is one of the books that **have** changed the way I think.*',
          ],
        },
      ],
      lines: [
        { say: 'A verb agrees with its subject, but sometimes the subject is hard to find. The number of is one number, so it takes a singular verb. A number of means several, so it takes a plural verb.', show: ['a.0', 'a.1'] },
        { say: 'With either or and neither nor, the verb agrees with the nearer subject. Put the plural subject second, and the sentence sounds natural too.', show: 'a.2', focus: 'a.2' },
        { say: 'In one of those who, ask what that refers to. It refers to the books, not to one, so the verb is plural.', show: 'a.3', focus: 'a.3' },
      ],
    },
    {
      chapter: 'Parallel structure and comparisons',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'p',
          items: [
            '**Broken**: *The job involves answering the phone, filing reports and to greet visitors.*',
            '**Parallel**: *answering, filing and greeting*',
          ],
        },
        {
          kind: 'bullets',
          id: 'c',
          items: [
            '**Mismatched**: *The climate of Lagos is warmer than Toronto.*',
            '**Matched**: *warmer than that of Toronto*',
          ],
        },
      ],
      lines: [
        { say: 'Items in a series should share one grammatical form. Here the first two duties end in i n g, so the third must too.', show: 'p' },
        { say: 'A comparison must compare like with like. This sentence compares a climate with a city. Name both sides, and add that of, or those for a plural.', hide: 'p', show: 'c' },
        { say: 'Also form a comparative once, with the ending e r or with the word more, never with both.' },
      ],
    },
    {
      chapter: 'Dangling modifiers',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'd',
          items: [
            '**Dangling**: *When only five, Diego’s family moved to Nairobi.*',
            '**Fixed**: *When Diego was only five, his family moved to Nairobi.*',
          ],
        },
      ],
      lines: [
        { say: 'A dangling modifier is an opening phrase that does not describe the subject that follows it. Readers attach it to that subject anyway, with absurd results.', show: 'd.0', focus: 'd.0' },
        { say: 'Here the whole family seems to be five years old. Name Diego in the clause, and the problem is solved.', show: 'd.1', focus: 'd.1' },
        { say: 'Placement matters for single words too. The word only goes right before what it limits, and moving it changes the meaning.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'Breaking the pattern late',
          md: 'Long series fail late, because the writer forgets how the list began. Keep one form to the end: *and **that the herons were nesting again***.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. In a long series, the writer forgets how the list began.', show: 'm' },
        { say: 'The report began with two that clauses, then ended with a noun phrase. Keep the pattern to the very end.', focus: 'm' },
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
          choices: [
            'The number of applicants have risen sharply since last spring.',
            'Neither the principal nor the teachers have signed the form yet.',
            'The climate of Lagos is warmer than Toronto in the same month.',
            'When only five, Diego’s family moved to Nairobi last spring.',
          ],
          answer: 1,
          working: 'B agrees with the nearer subject, the teachers. A needs has, C compares a climate with a city, and D dangles.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence is correct? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The verb agrees with the nearer subject, the teachers. A needs has, C compares a climate with a city, and D dangles.', show: 'q2.answer' },
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
            'Find the true subject, and agree with the nearer one.',
            'Keep one grammatical form in a series, and compare like with like.',
            'An opening phrase must describe the subject that follows it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find the true subject for agreement, and with either or and neither nor, use the nearer one.', show: 'sum.0' },
        { say: 'Keep one grammatical form in a series, to the end, and compare like with like.', show: 'sum.1' },
        { say: 'And make sure an opening phrase describes the subject that follows it.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
