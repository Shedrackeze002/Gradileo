import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-4-2',
  lessonId: 'e7-4-2',
  title: 'Persuasive Techniques',
  summary:
    'Persuasive techniques include rhetorical questions, the rule of three, emotive language, direct address and repetition, and anaphora repeats words at the start of sentences. To explain a technique, say how it makes the reader feel or think.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Persuasive Techniques', subtitle: 'How words move the reader' }],
      lines: [
        { say: 'Arguments do not only use reasons and evidence. They also use the way words are put together to move the reader.', show: 'title' },
        { say: 'These choices are called persuasive techniques. Once you can spot them, you can decide for yourself whether to be persuaded.' },
      ],
    },
    {
      chapter: 'What a technique is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Persuasive technique', md: 'A **persuasive technique** is a way of using words to move the reader to agree or act.' },
      ],
      lines: [
        { say: 'A persuasive technique is a way of using words to move the reader to agree or act.', show: 'def' },
        { say: 'Reasons and evidence give a reader something to think about. Techniques work on how the reader feels, and how well they remember. Here are five of the most common.', focus: 'def' },
      ],
    },
    {
      chapter: 'Five techniques',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'What it is', 'Example'],
          rows: [
            ['**Rhetorical question**', 'a question asked for effect', '*Do we really want our children breathing dirty air?*'],
            ['**Rule of three**', 'three ideas in a row', '*Our new park will be safe, green and free.*'],
            ['**Emotive language**', 'words that stir strong feelings', '*Helpless puppies abandoned on freezing streets*'],
            ['**Direct address**', 'speaking to the reader as *you*', '*You can make a difference.*'],
            ['**Repetition**', 'repeating words for emphasis', '*We will rebuild. We will recover. We will return.*'],
          ],
        },
      ],
      lines: [
        { say: 'A rhetorical question is asked for effect, with an obvious expected answer. Do we really want our children breathing dirty air?', show: 't', focus: 't.0' },
        { say: 'The rule of three puts three ideas in a row, which sounds complete and memorable: safe, green and free. Emotive language stirs strong feelings, like helpless puppies abandoned on freezing streets.', focus: ['t.1', 't.2'] },
        { say: 'Direct address speaks straight to the reader as you. And repetition repeats words for emphasis.', focus: ['t.3', 't.4'] },
        { say: 'Repeating the same words at the start of sentences, as in we will, we will, we will, has a special name: anaphora. Speech writers love it.', caption: 'Repeating the same words at the start of sentences, as in we will, we will, we will, has a special name: anaphora. Speech writers love it.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Naming the technique',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Is it fair that some students have no books at home? Is it fair that the library is closing? Of course it is not.'] },
        { kind: 'text', id: 'a', size: 'md', md: '**Rhetorical questions**, with **repetition** of *Is it fair*' },
      ],
      lines: [
        { say: 'Which technique is this writer using?', show: 'q' },
        { say: 'The writer asks questions but answers them at once. The questions are not really asking; they lead the reader to the answer no.', focus: 'q' },
        { say: 'So these are rhetorical questions, and the repeated words, is it fair, add repetition too.', show: 'a' },
      ],
    },
    {
      chapter: 'The effect on the reader',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'Effect on the reader'],
          rows: [
            ['rhetorical question', 'they feel they reached the answer themselves'],
            ['emotive language', 'they feel worried, angry or sorry, so they want to act'],
            ['inclusive *we* and direct address', 'they feel part of the writer’s side'],
            ['repetition and rule of three', 'ideas stick and sound strong'],
            ['a single story', 'one person moves readers more than a number'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Feelings are not proof', md: 'When a text makes you feel strongly, notice the feeling, then ask: **what reasons and evidence back this up?**' },
      ],
      lines: [
        { say: 'To explain a technique, do not just name it. Say what it makes the reader feel or think.', show: 't' },
        { say: 'A rhetorical question leads readers to the answer the writer wants, so they feel they reached it themselves. Emotive language makes readers feel worried, angry or sorry, so they want to act.', focus: ['t.0', 't.1'] },
        { say: 'Inclusive we and direct address make readers feel part of the writer’s side. Repetition and the rule of three make ideas stick.', focus: ['t.2', 't.3'] },
        { say: 'And a single story about one person moves readers more than a number does.', focus: 't.4' },
        { say: 'Emotion is not wrong in persuasion, but it is not evidence. So notice the feeling, then ask what reasons and evidence back it up.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A charity letter describes one named child’s day in detail instead of giving figures. What is the most likely effect?',
          choices: [
            'Readers trust the figures more.',
            'Readers find the letter too long.',
            'Readers feel nothing, because there are no facts.',
            'Readers care more about one person, so they are more likely to give.',
          ],
          answer: 3,
          working: 'Readers find it easier to care about one person than about a statistic, so the single story makes them feel more.',
        },
      ],
      lines: [
        { say: 'Your turn. A charity letter describes one named child’s day in detail, instead of giving figures. What is the most likely effect? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Readers find it easier to care about one person than about a statistic, so the single story makes them feel more, and more likely to give.', show: 'q2.answer' },
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
            '**Rhetorical questions**, **rule of three**, **emotive language**, **direct address**, **repetition**.',
            '**Anaphora** repeats words at the start of sentences.',
            'Explain a technique by its effect on the reader.',
            'Notice the feeling, then check the evidence.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Persuasive techniques include rhetorical questions, the rule of three, emotive language, direct address and repetition.', show: 'sum.0' },
        { say: 'Anaphora is repeating words at the start of sentences.', show: 'sum.1' },
        { say: 'To explain a technique, say how it makes the reader feel or think.', show: 'sum.2' },
        { say: 'And a careful reader notices the feeling, then checks the evidence.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
