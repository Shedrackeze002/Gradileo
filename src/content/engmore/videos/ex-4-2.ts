import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-4-2',
  lessonId: 'ex-4-2',
  title: 'Spoken Language: Presenting and Answering Questions',
  thumbnail: false,
  summary:
    'A good presentation grabs attention, says what it will cover, makes signposted points, sums up and thanks the audience. It is delivered from prompt cards with eye contact, varied pace and pauses, in standard English, which can be spoken in any accent. Questions are answered politely, honestly and directly, with a reason.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Spelling and Spoken Language', title: 'Presenting and Answering Questions', subtitle: 'Writing for listeners, not readers' }],
      lines: [
        { say: 'Many English courses ask you to speak, not only to write: to give a short presentation, and then answer questions from your audience.', show: 'title' },
        { say: 'In this lesson, you will plan a presentation that holds an audience, use standard English, and answer questions well.' },
      ],
    },
    {
      chapter: 'Planning it',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Presentation', md: 'A prepared talk to an audience on a chosen subject, usually followed by questions.' },
        { kind: 'bullets', id: 'b', items: ['Grab attention: a question, a story, a picture in words', 'Say what you will cover', 'Make each point, with signposts: “First…”, “Finally…”', 'Sum up, and end with a clear message', 'Thank the audience, and invite questions'] },
      ],
      lines: [
        { say: 'A presentation is a prepared talk to an audience. Listeners cannot look back up a page, so it needs a clear structure.', show: 'def' },
        { say: 'Open by grabbing attention. For a talk on learning to swim: hands up if you can swim. Now imagine falling into deep water and not being able to.', show: 'b.0' },
        { say: 'Tell the audience what you will cover, then make each point in turn, with signposts such as first, my second point, and finally.', caption: 'Tell the audience what you will cover, then make each point in turn, with signposts such as “first”, “my second point” and “finally”.', show: ['b.1', 'b.2'] },
        { say: 'Sum up with a clear final message, then thank the audience and invite their questions.', show: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Delivering it',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Use prompt cards, not a full script', 'Make eye contact around the room', 'Vary your pace, and pause after key points'] }],
      lines: [
        { say: 'Use short prompt cards, rather than a full script, so that you speak to the audience instead of reading at them.', show: 'b.0' },
        { say: 'Make eye contact with different parts of the room.', show: 'b.1' },
        { say: 'And vary your pace and tone. A pause after an important point gives it time to sink in.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Standard English',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard English', md: 'The form of English used in formal speech and writing. It can be spoken in **any accent**.' },
        { kind: 'table', id: 't', head: ['Non-standard', 'Standard'], rows: [['We was surprised.', 'We were surprised.'], ['I done the research.', 'I did the research.'], ['Them figures show…', 'Those figures show…']] },
      ],
      lines: [
        { say: 'Standard English is the form used in formal speech and writing. It is about grammar and words, not accent: you can speak it in any accent.', show: 'def' },
        { say: 'So in a presentation, say we were, not we was. I did, not I done. And those figures, not them figures.', caption: 'So in a presentation, say “we were”, not “we was”; “I did”, not “I done”; and “those figures”, not “them figures”.', show: 't' },
      ],
    },
    {
      chapter: 'Answering questions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'ex', md: '**Question:** *“Wouldn’t a later school day clash with after-school clubs?”*\n\n**Answer:** *“It could, yes, so clubs might run at lunchtime or start a little later.”*' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Don’t dismiss the questioner', md: '“That isn’t what my talk was about” loses the audience. If you don’t know, say so, and offer to find out.' },
      ],
      lines: [
        { say: 'A good answer is polite, honest and direct. Here, the speaker accepts the point fairly, and then answers it with a solution.', show: 'ex' },
        { say: 'Never dismiss the person asking. If you do not know the answer, say so honestly, and offer to find out.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which sentence is in **standard English**?',
          choices: ['We was surprised by the results.', 'We were surprised by the results.', 'Us lot was surprised by the results.', 'We was well surprised by the results.'],
          answer: 1,
          working: '“We **were**” is the standard form of the verb.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence is in standard English? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. We were is the standard form. The others all use we was, or us lot was, which are not standard.', caption: 'The answer is B. “We were” is the standard form. The others all use “we was” or “us lot was”, which are not standard.', show: 'q.answer' },
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
          items: ['Grab attention, signpost your points, sum up, thank the audience.', 'Use prompt cards, eye contact, varied pace and pauses.', 'Use standard English; it can be spoken in any accent.', 'Answer questions politely, honestly and directly.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Grab attention, signpost your points, sum up, and thank the audience.', show: 'sum.0' },
        { say: 'Deliver it with prompt cards, eye contact, varied pace and pauses.', show: 'sum.1' },
        { say: 'Use standard English, in whatever accent you speak.', show: 'sum.2' },
        { say: 'And answer questions politely, honestly and directly.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
