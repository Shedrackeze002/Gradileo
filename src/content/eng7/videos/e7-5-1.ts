import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-5-1',
  lessonId: 'e7-5-1',
  title: 'How News Reports Work',
  summary:
    'A news report has a headline, a lead, the five Ws, quotations and an inverted pyramid shape, with the most important facts first. Its angle is the focus the writer chooses, shaped by headlines, quotations, photographs and single words.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'How News Reports Work', subtitle: 'The shape and the angle of a story' }],
      lines: [
        { say: 'A news report looks simple, but every one is carefully built.', show: 'title' },
        { say: 'Reporters follow a pattern that gets the key facts to readers quickly, and the choices they make give each story its angle. In this video we look at both.' },
      ],
    },
    {
      chapter: 'A report',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Hundreds of volunteers cleared 2 tonnes of litter from Riverside Beach on Saturday morning.', 'The clean-up, organized by the local sailing club, began at 8 a.m. and ended at noon. “We were amazed by how many people came,” said club captain Ana Silva.', 'The council has promised new bins along the beach by the summer.'] },
      ],
      lines: [
        { say: 'Here is a short news report. Hundreds of volunteers cleared two tonnes of litter from Riverside Beach on Saturday morning.', show: 'q.0' },
        { say: 'The clean-up was organized by the local sailing club, and the club captain says they were amazed by how many people came.', show: 'q.1' },
        { say: 'And the council has promised new bins by the summer. Let’s see how it is built.', show: 'q.2' },
      ],
    },
    {
      chapter: 'Features of a news report',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'News report', md: 'A **news report** tells readers the facts of a recent event, quickly and clearly.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'the **headline** sums up the story in a few words',
            'the **lead**, the first sentence, gives the most important facts',
            'the **five Ws**: who, what, when, where and why (and often how)',
            '**quotations** add a human voice',
            'the **inverted pyramid**: most important facts first',
          ],
        },
      ],
      lines: [
        { say: 'A news report tells readers the facts of a recent event, quickly and clearly. It has five features.', show: 'def' },
        { say: 'The headline sums up the story in a few words. The lead is the first sentence or paragraph, and gives the most important facts.', show: ['b.0', 'b.1'] },
        { say: 'A report answers the five Ws: who, what, when, where and why, and often how. Quotations from people involved add a human voice.', show: ['b.2', 'b.3'] },
        { say: 'And it follows the inverted pyramid. The most important facts come first, and less important details later.', show: 'b.4' },
      ],
    },
    {
      chapter: 'The five Ws',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['W', 'In the report'],
          rows: [
            ['**Who**', 'hundreds of volunteers; the sailing club'],
            ['**What**', 'cleared 2 tonnes of litter'],
            ['**When**', 'Saturday morning, 8 a.m. to noon'],
            ['**Where**', 'Riverside Beach'],
            ['**Why**', 'to clean up the beach (implied)'],
          ],
        },
        { kind: 'text', id: 'a', size: 'md', md: 'Stop after one sentence and you **still know what happened**.' },
      ],
      lines: [
        { say: 'Here are the five Ws in the beach report. Who? Hundreds of volunteers and the sailing club. What? They cleared two tonnes of litter.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'When? Saturday morning, from eight until noon. Where? Riverside Beach. And why? To clean up the beach, which the report implies.', focus: ['t.2', 't.3', 't.4'] },
        { say: 'Because of the inverted pyramid, a reader who stops after one sentence still knows what happened. The promise of new bins, the least important detail, comes last.', show: 'a' },
      ],
    },
    {
      chapter: 'The angle of a story',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle', md: 'The **angle** is the focus or point of view a writer chooses: which facts lead, whom to quote first, which photograph to print, and which words to use.' },
        {
          kind: 'table',
          id: 't',
          head: ['Headline', 'Angle'],
          rows: [
            ['*Shop owners cheer new car park*', 'the joy of shop owners'],
            ['*Park lost to concrete as car park opens*', 'the loss of a green space'],
          ],
        },
      ],
      lines: [
        { say: 'The angle is the focus or point of view a writer chooses. Two reporters can describe the same event very differently.', show: 'def' },
        { say: 'They choose which facts go in the headline and lead, whom to quote first, which photograph to print, and which words to use.', focus: 'def' },
        { say: 'Shop owners cheer new car park, and park lost to concrete as car park opens, report the same opening. The first stresses the joy of shop owners, and the second the loss of a green space.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence suggests the mayor is owning up to a failure?',
          choices: ['The mayor said the plan was late.', 'The mayor explained the plan’s timetable.', 'The mayor admitted the plan was late.', 'The mayor described the plan.'],
          answer: 2,
          working: '“Said” is neutral, but “admitted” suggests owning up to something that went wrong. Single words shape the angle too.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence suggests the mayor is owning up to a failure? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Said is neutral, but admitted suggests owning up to something that went wrong. Even a single word can shape the angle.', show: 'q2.answer' },
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
            'A report has a **headline**, a **lead**, the **five Ws**, **quotations** and an **inverted pyramid**.',
            'The most important facts come first.',
            'A story’s **angle** is the focus the writer chooses.',
            'Headlines, quotations, photos and single words shape the angle.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A news report has a headline, a lead, the five Ws, quotations, and an inverted pyramid shape.', show: 'sum.0' },
        { say: 'So the most important facts come first.', show: 'sum.1' },
        { say: 'A story’s angle is the focus the writer chooses.', show: 'sum.2' },
        { say: 'And headlines, quotations, photographs, and single words such as admitted, all shape the angle.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
