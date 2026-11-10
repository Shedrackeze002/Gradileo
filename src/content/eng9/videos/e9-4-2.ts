import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-4-2',
  lessonId: 'e9-4-2',
  title: 'Analysing a Speech',
  summary:
    'To analyse a speech, ask about its purpose, audience and context: who, where, when and why. Persuasive speeches often open with a hook, develop an argument and close with a peroration and a call to action. Lincoln’s Gettysburg Address moves from past to present to future, and good analysis explains how the structure builds the argument.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Analysing a Speech', subtitle: 'Purpose, audience, context and structure' }],
      lines: [
        { say: 'A speech is written for a particular audience, at a particular moment, to do a particular job.', show: 'title' },
        { say: 'In this video we analyse a speech’s situation, and see how the speaker builds it to persuade.' },
      ],
    },
    {
      chapter: 'The rhetorical situation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Purpose, audience and context', md: 'A speech’s **purpose** is what the speaker wants the audience to think, feel or do. Its **audience** is who listened, and what they already believed. Its **context** is when and where it was given, and what was happening.' },
      ],
      lines: [
        { say: 'To analyse a speech, start with three things. Its purpose is what the speaker wants the audience to think, feel or do.', show: 'def' },
        { say: 'Its audience is who the listeners were, and what they already believed. And its context is when and where it was given, and what was happening at the time.', focus: 'def' },
      ],
    },
    {
      chapter: 'The Gettysburg Address',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.'], by: 'Abraham Lincoln, the Gettysburg Address' },
        {
          kind: 'table',
          id: 't',
          head: ['', ''],
          rows: [
            ['**Context**', 'November 1863, the American Civil War; a new cemetery'],
            ['**Audience**', 'people honouring the dead, with the war’s outcome uncertain'],
            ['**Purpose**', 'honour the dead; recommit the living to their cause'],
          ],
        },
      ],
      lines: [
        { say: 'In November eighteen sixty-three, during the American Civil War, President Abraham Lincoln spoke at the opening of a cemetery for soldiers killed at Gettysburg.', show: 't', focus: 't.0' },
        { say: 'His audience had come to honour the dead, at a time when the war’s outcome was still uncertain.', focus: 't.1' },
        { say: 'He opens by recalling the nation’s founding. Four score and seven years means eighty-seven, because a score is twenty. The old, Bible-like phrase gives the occasion a solemn, timeless tone.', show: 'q' },
        { say: 'His purpose is to honour the dead and recommit the living to their cause. By echoing the Declaration of Independence, he roots that cause in the nation’s founding ideal.', focus: 't.2' },
      ],
    },
    {
      chapter: 'How a speech is structured',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Opening:** a hook, such as a story, a striking fact or a question.',
            '**Development:** the argument, with reasons, evidence and appeals.',
            '**Peroration:** a powerful closing that sums up and stirs.',
            '**Call to action:** what the audience should do or believe.',
          ],
        },
      ],
      lines: [
        { say: 'Many persuasive speeches follow a shape. The opening is a hook, such as a story, a striking fact or a question, that captures the audience.', show: 'b.0' },
        { say: 'The development is the argument, with reasons, evidence and appeals.', show: 'b.1' },
        { say: 'The peroration is a powerful closing section that sums up and stirs the audience.', show: 'b.2' },
        { say: 'And the call to action states clearly what the audience should do or believe.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Structure is not just order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Structure is not just order', md: '“First he talks about the past, then the present” **describes** the structure. Analysis explains **why**: how the order builds the argument and moves the audience.' },
      ],
      lines: [
        { say: 'A common mistake is to list the order and stop. First he talks about the past, then the present, only describes the structure.', show: 'm' },
        { say: 'Analysis explains why: how the order builds the argument, and moves the audience.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Lincoln ends: “government of the people, by the people, for the people, shall not perish from the earth.” Why end this way?',
          choices: [
            'To list events in order',
            'To change the subject',
            'To close on democracy as a call to action',
            'To make the speech longer',
          ],
          answer: 2,
          working: 'Past, present and future build to this vision, and the final tricolon gives it a memorable rhythm. The speech ends as a call to action for the living.',
        },
      ],
      lines: [
        { say: 'Your turn. The speech moves from the nation’s birth, to the present war, to its final words: government of the people, by the people, for the people, shall not perish from the earth. Why end this way? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Past, present and future build to this vision, and the final tricolon gives it a rhythm the audience will remember. The speech closes on its highest ideal, democracy, as a call to the living to finish the work of the dead.', show: 'q2.answer' },
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
            'Analyse **purpose**, **audience** and **context**: who, where, when and why.',
            'Context can make a speech powerful, as with Douglass on the Fourth of July.',
            'Speeches open with a hook, develop, then close with a **peroration** and a **call to action**.',
            'Explain how the structure builds the argument.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Analyse a speech’s purpose, audience and context: who, where, when and why.', show: 'sum.0' },
        { say: 'Context can make a speech powerful. Frederick Douglass used a Fourth of July celebration to expose the injustice of slavery, so the contradiction was impossible to ignore.', show: 'sum.1' },
        { say: 'Speeches often open with a hook, develop an argument, then close with a peroration and a call to action.', show: 'sum.2' },
        { say: 'And always explain how the structure builds the argument and moves the audience.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
