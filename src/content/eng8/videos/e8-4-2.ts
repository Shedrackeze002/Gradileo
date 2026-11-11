import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-4-2',
  lessonId: 'e8-4-2',
  title: 'Ethos, Pathos and Logos',
  summary:
    'An appeal is a way of winning an audience over: ethos appeals to trust in the speaker, pathos to feelings and logos to reason. Good persuaders choose the appeal that suits their audience, and strong arguments usually combine all three.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Ethos, Pathos and Logos', subtitle: 'Three ways to persuade' }],
      lines: [
        { say: 'Over two thousand years ago, the Greek thinker Aristotle described three ways a speaker can persuade an audience. We still use his names for them today.', show: 'title' },
        { say: 'In this video we learn to spot ethos, pathos and logos, and explain why a writer chooses each one.' },
      ],
    },
    {
      chapter: 'What an appeal is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Appeal', md: 'In persuasion, an **appeal** is a way of reaching the audience to win them over: through their **trust** in the speaker (**ethos**), their **feelings** (**pathos**) or their **reason** (**logos**).' },
      ],
      lines: [
        { say: 'In persuasion, an appeal is a way of reaching the audience to win them over.', show: 'def' },
        { say: 'You can reach them through their trust in the speaker, which is ethos, through their feelings, which is pathos, or through their sense of reason, which is logos.', focus: 'def' },
      ],
    },
    {
      chapter: 'The three appeals',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Appeal', 'Appeals to', 'Example'],
          rows: [
            ['**Ethos**', 'trust', '“As a nurse for twenty years, I have seen what poor diets do to children.”'],
            ['**Pathos**', 'emotion', '“Imagine a child going to bed hungry, night after night.”'],
            ['**Logos**', 'logic', '“Cycling takes 15 minutes and costs nothing; driving takes 10 and costs £3 a day.”'],
          ],
        },
      ],
      lines: [
        { say: 'Ethos appeals to credibility and trust. It shows the speaker is expert, experienced or fair: as a nurse for twenty years, I have seen what poor diets do to children.', show: 't', focus: 't.0' },
        { say: 'Ethos can also come from other experts, such as scientists at three universities who reached the same conclusion.', focus: 't.0' },
        { say: 'Pathos appeals to emotion. It makes us feel pity, fear, anger, hope or pride: imagine a child going to bed hungry, night after night.', focus: 't.1' },
        { say: 'Logos appeals to logic, with facts, figures and step-by-step reasoning. Cycling takes fifteen minutes and costs nothing, while driving takes ten and costs three pounds a day.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Naming the appeal',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['If we do nothing, our grandchildren will ask us', 'why we stood by as the forests burned.'], by: 'A speech written for this lesson' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Numbers can hide in pathos', md: 'A single upsetting statistic (“one child every minute”) can be used for its **emotional punch**. Ask what the sentence mainly does: does it reason, or make you feel?' },
      ],
      lines: [
        { say: 'Let’s name the appeal in this sentence.', show: 'q' },
        { say: 'There are no facts or figures, and the speaker does not mention their expertise. Instead it makes us imagine our grandchildren blaming us, which stirs guilt and fear. So this is pathos.', focus: 'q' },
        { say: 'Be careful, though. A single upsetting statistic, like one child every minute, can be used for its emotional punch. So ask what the sentence mainly does: does it reason, or does it make you feel?', show: 'm' },
      ],
    },
    {
      chapter: 'Choosing for the audience',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Scientists:** logos, with clear data and reasoning.',
            '**A charity advert:** pathos, so viewers feel pity and donate.',
            '**A speaker’s own experience:** ethos, to build trust first.',
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Combine them', md: 'Too much pathos, and readers feel but are not convinced. Too much logos feels cold. Weak ethos, and no one trusts the facts. Strong speeches use **all three**.' },
      ],
      lines: [
        { say: 'Good persuaders think about who is listening. A group of scientists will be most persuaded by logos, with clear data and reasoning.', show: 'b.0' },
        { say: 'A charity advert with a shivering dog and soft music uses pathos, so viewers feel pity and donate.', show: 'b.1' },
        { say: 'And a speaker who mentions their own experience first uses ethos, to show they can be trusted.', show: 'b.2' },
        { say: 'Each appeal is risky alone. Too much pathos, and readers feel strongly but are not convinced. Too much logos feels cold. And with weak ethos, no one trusts the facts. So strong speeches combine all three.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A speech for cycle helmets begins: “As a paramedic, I have attended hundreds of cycling accidents.” Which appeal is this?',
          choices: [
            'Ethos: it shows the speaker can be trusted',
            'Pathos: it makes us feel pity',
            'Logos: it gives a statistic',
            'None of them',
          ],
          answer: 0,
          working: 'The speaker shows their own experience as a paramedic, so the audience trusts them on the subject. That is ethos.',
        },
      ],
      lines: [
        { say: 'Your turn. A speech for cycle helmets begins: as a paramedic, I have attended hundreds of cycling accidents. Which appeal is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A", ethos. The speaker shows their experience as a paramedic, so we trust them on the subject. The speech could then add logos, with figures on head injuries, and pathos, with the news no family wants to hear.', caption: 'The answer is A, ethos. The speaker shows their experience as a paramedic, so we trust them on the subject. The speech could then add logos, with figures on head injuries, and pathos, with the news no family wants to hear.', show: 'q2.answer' },
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
            'An **appeal** is a way of winning the audience over.',
            '**Ethos** appeals to trust, **pathos** to emotion, **logos** to logic.',
            'Choose the appeal that suits the audience.',
            'One appeal alone is risky; strong arguments combine all three.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An appeal is a way of winning the audience over.', show: 'sum.0' },
        { say: 'Ethos appeals to trust, pathos to emotion, and logos to logic.', show: 'sum.1' },
        { say: 'Choose the appeal that suits the audience: logos for experts, pathos to move people to act, and ethos to build trust.', show: 'sum.2' },
        { say: 'And relying on one appeal alone is risky, so strong arguments combine all three.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
