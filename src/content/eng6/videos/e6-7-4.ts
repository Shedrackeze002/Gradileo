import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-7-4',
  lessonId: 'e6-7-4',
  title: 'Revising for Style',
  summary:
    'Revising for style means replacing vague words with precise ones, cutting wordy phrases and varying sentences. Mix long and short sentences, and start them with phrases, adverbs and dependent clauses.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Revising for Style', subtitle: 'Precise words and sentence variety' }],
      lines: [
        { say: 'Revising means making your writing better, not just fixing mistakes.', show: 'title' },
        { say: 'Two of the quickest improvements are choosing precise words, and giving your sentences variety. Small changes like these can make a piece of writing feel completely different.' },
      ],
    },
    {
      chapter: 'Precise words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Vague and precise words', md: '**Vague** words such as *nice*, *good*, *thing*, *stuff*, *went* and *got* tell the reader very little. **Precise** words paint an exact picture.' },
        {
          kind: 'table',
          id: 't',
          head: ['Vague', 'Precise'],
          rows: [
            ['*The dog went across the field.*', '*The terrier sprinted across the meadow.*'],
            ['*We had a nice time.*', '*We had a relaxing afternoon.*'],
            ['*The food was really very good.*', '*The soup was rich and creamy.*'],
          ],
        },
      ],
      lines: [
        { say: 'Vague words such as nice, good, thing, stuff, went and got tell the reader very little. Precise words paint an exact picture.', show: 'def' },
        { say: 'The dog went across the field is vague. The terrier sprinted across the meadow tells us the kind of dog, how it moved, and where.', show: 't', focus: 't.0' },
        { say: 'We had a nice time becomes we had a relaxing afternoon. And the food was really very good becomes the soup was rich and creamy.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Cutting weak words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“Very” does not fix a vague word', md: 'Instead of adding *very*, replace the weak word: *very big* → *enormous*; *very tired* → *exhausted*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Wordy', 'Concise'],
          rows: [
            ['*We made the decision that we would leave early.*', '*We decided to leave early.*'],
            ['*at this point in time*', '*now*'],
            ['*due to the fact that*', '*because*'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Very good and really nice are still vague. Instead of adding very, replace the weak word. Very big becomes enormous, and very tired becomes exhausted.', show: 'm' },
        { say: 'Revising also means cutting wordy phrases that add no meaning. We made the decision that we would leave early says no more than we decided to leave early.', show: 't', focus: 't.0' },
        { say: 'At this point in time just means now, and due to the fact that just means because.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Sentence variety',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'Example'],
          rows: [
            ['Mix long and short', '*We searched the cave for an hour, our torches flickering on the wet walls. Nothing.*'],
            ['Start with a phrase', '*After breakfast, we set off.*'],
            ['Start with an adverb', '*Slowly, the door creaked open.*'],
            ['Start with a dependent clause', '*Although the cave was dark and cold, we went in anyway.*'],
          ],
        },
      ],
      lines: [
        { say: 'Writing in which every sentence is the same length, and starts the same way, quickly becomes dull. So vary your sentences.', show: 't' },
        { say: 'Mix long and short. We searched the cave for an hour, our torches flickering on the wet walls. Nothing. A short sentence after long ones adds emphasis.', focus: 't.0' },
        { say: 'Start with a phrase: after breakfast, we set off. Or with an adverb: slowly, the door creaked open.', focus: ['t.1', 't.2'] },
        { say: 'Or start with a dependent clause: although the cave was dark and cold, we went in anyway.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“I woke up. I got dressed. I ate breakfast.” Which is the best revision?',
          choices: [
            'I woke up and I got dressed and I ate breakfast.',
            'I woke up. I got dressed. I ate a very good breakfast.',
            'When I woke up, I got dressed. After breakfast, I left for school.',
            'I woke up, I got dressed, I ate breakfast.',
          ],
          answer: 2,
          working: 'C joins the ideas and varies the openings. A is still repetitive, B adds a vague “very good”, and D is a string of comma splices.',
        },
      ],
      lines: [
        { say: 'Your turn. Every sentence here is short and starts with I. Which is the best revision? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It joins the ideas and varies the openings, with a dependent clause and a phrase. Choice A is still repetitive, Choice B adds a vague very good, and Choice D is a string of comma splices.', show: 'q2.answer' },
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
            'Replace vague words with precise ones, and cut wordy phrases.',
            'Don’t fix a weak word with *very*; choose a stronger word.',
            'Vary sentence length and openings: phrases, adverbs and dependent clauses.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Replace vague words with precise ones, and cut wordy phrases.', show: 'sum.0' },
        { say: 'Don’t fix a weak word with very. Choose a stronger word.', show: 'sum.1' },
        { say: 'And vary sentence length and openings, with phrases, adverbs and dependent clauses.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
