import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-6-1',
  lessonId: 'e8-6-1',
  title: 'Active and Passive Voice',
  summary:
    'In the active voice the subject does the action; in the passive voice the subject receives it, using a form of be plus a past participle. Prefer the active for clarity, and use the passive when the doer is unknown or unimportant, or the action matters most. A passive with no agent can hide who is responsible.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Active and Passive Voice', subtitle: 'Who did what?' }],
      lines: [
        { say: 'The dog ate the cake. The cake was eaten by the dog. Both sentences describe the same event, but they point the reader in different directions.', show: 'title' },
        { say: 'In this video we tell active and passive apart, change one into the other, and choose the right voice.' },
      ],
    },
    {
      chapter: 'Active and passive',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Active and passive voice', md: 'In the **active voice**, the subject **does** the action: *Amara kicked the ball.* In the **passive voice**, the subject **receives** it: *The ball was kicked.* The passive uses a form of **be** plus a **past participle**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Active', 'Passive'],
          rows: [
            ['The dog ate the cake.', 'The cake was eaten by the dog.'],
            ['The mayor will open the library.', 'The library will be opened by the mayor.'],
            ['Someone broke a window.', 'A window was broken.'],
          ],
        },
      ],
      lines: [
        { say: 'In the active voice, the subject does the action: Amara kicked the ball. In the passive voice, the subject receives the action: the ball was kicked.', show: 'def' },
        { say: 'The passive uses a form of be, such as is, was, were or will be, plus a past participle, such as eaten, opened or broken.', focus: 'def' },
        { say: 'The dog ate the cake becomes the cake was eaten by the dog. The mayor will open the library becomes the library will be opened by the mayor.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'The doer in a passive sentence is called the agent. It can come after by, or be left out altogether: a window was broken.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Passive to active',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Start: *The match was won by our team in the last minute.*',
            'Find the doer: **our team**. Make it the subject.',
            'Change *was won* to *won*, and make *the match* the object.',
            '**Our team won the match in the last minute.**',
          ],
        },
      ],
      lines: [
        { say: 'Let’s change a passive sentence to active. Start with: the match was won by our team in the last minute.', show: 'b.0' },
        { say: 'Find the doer. It is our team, so make it the subject.', show: 'b.1' },
        { say: 'Change the verb from was won to won, and make the match the object.', show: 'b.2' },
        { say: 'Our team won the match in the last minute. The active version is shorter, and it puts the doer first.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Past tense is not passive', md: '*Amara was running* uses **was**, but Amara is still doing the running, so it is **active**. Ask: is the subject doing it, or having it done to them?' },
      ],
      lines: [
        { say: 'A common mistake is to think any sentence with was is passive. Amara was running uses was, but Amara is still doing the running, so it is active.', show: 'm' },
        { say: 'A sentence is passive only when the subject receives the action. So ask: is the subject doing it, or having it done to them?', focus: 'm' },
      ],
    },
    {
      chapter: 'Choosing a voice',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Use the passive when…', 'Example'],
          rows: [
            ['the doer is **unknown**', 'A window was broken at the school last night.'],
            ['the **action** matters most', 'The water was heated to 80 °C.'],
            ['the doer is **obvious**', 'The rubbish is collected on Mondays.'],
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Spot the hidden doer', md: '“Errors were made in your bill.” Who made them? The active would be “**We** made errors in your bill.”' },
      ],
      lines: [
        { say: 'Writers usually prefer the active voice, because it is clearer about who did what. But the passive is right when the doer is unknown: a window was broken last night.', show: 't', focus: 't.0' },
        { say: 'It also suits writing where the action matters more than the doer, as in a science method: the water was heated to eighty degrees. And it works when the doer is obvious: the rubbish is collected on Mondays.', focus: ['t.1', 't.2'] },
        { say: 'But the passive can also dodge responsibility. A company writes: errors were made in your bill. It never says who made them. The active would be: we made errors in your bill.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence is in the passive voice?',
          choices: [
            'The new bridge was opened by the mayor.',
            'Amara was running for the bus.',
            'The storm damaged three houses.',
            'Our team won the match.',
          ],
          answer: 0,
          working: 'In “The new bridge was opened by the mayor”, the subject (the bridge) receives the action, with was + opened. “Amara was running” is active: Amara does the running.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence is in the passive voice? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". The bridge receives the action, with was plus opened, and the mayor is the agent. Choice "B" is active: Amara is doing the running.', caption: 'The answer is A. The bridge receives the action, with was plus opened, and the mayor is the agent. Choice B is active: Amara is doing the running.', show: 'q2.answer' },
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
            '**Active**: the subject does it. **Passive**: the subject receives it.',
            'The passive uses *be* + a past participle.',
            'To make a passive active, make the doer the subject.',
            'Prefer the active; a passive with no agent can hide who is responsible.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In the active voice, the subject does the action. In the passive, the subject receives it.', show: 'sum.0' },
        { say: 'The passive uses a form of be, plus a past participle.', show: 'sum.1' },
        { say: 'To make a passive sentence active, make the doer the subject.', show: 'sum.2' },
        { say: 'Prefer the active for clarity, and remember that a passive with no agent can hide who is responsible.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
