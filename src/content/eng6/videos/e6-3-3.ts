import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-3-3',
  lessonId: 'e6-3-3',
  title: 'Claims and Evidence',
  summary:
    'A claim is a position an author argues for, a reason says why it is right, and evidence backs up the reason. Strong evidence is relevant, reliable and sufficient, while an anecdote from a few people is weak.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Claims and Evidence', subtitle: 'Is the argument any good?' }],
      lines: [
        { say: 'Much of what we read is trying to convince us of something: an article arguing for a new park, a letter asking for a longer lunch, or a website saying a product is the best.', show: 'title' },
        { say: 'In this lesson, you will learn to find an author’s main point, and to ask whether the evidence really supports it.' },
      ],
    },
    {
      chapter: 'Claim, reason and evidence',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Claim, reason and evidence', md: 'A **claim** is the main point an author argues for, which reasonable people could disagree with. A **reason** explains why the claim is right. **Evidence** backs up a reason with facts, statistics, examples or experts’ words.' },
        {
          kind: 'table',
          id: 't',
          head: ['Statement', 'Claim or fact?'],
          rows: [
            ['Our town should build a skate park.', 'Claim: people could disagree.'],
            ['Our town has two parks.', 'Fact: it can be checked.'],
          ],
        },
      ],
      lines: [
        { say: 'A claim is the main point an author argues for. It is something reasonable people could disagree with. Our school should have a longer lunch break.', show: 'def' },
        { say: 'A reason explains why the claim is right. Twenty minutes is not enough time to eat and exercise.', focus: 'def' },
        { say: 'And evidence backs up a reason with facts, statistics, examples, or the words of experts.' },
        { say: 'Our town should build a skate park is a claim, because people could disagree. Our town has two parks is a fact, because it can be checked.', show: 't' },
      ],
    },
    {
      chapter: 'Finding the claim',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Children should put screens away an hour before bed. Surveys show many children sleep less than nine hours, and the light from screens can make it harder to fall asleep. Sleep helps the brain store memories, so it matters for learning.'] },
        { kind: 'text', id: 'ans', size: 'md', md: '**Claim:** Children should put screens away an hour before bed.' },
      ],
      lines: [
        { say: 'What is the claim in this paragraph?', show: 'q' },
        { say: 'The surveys, the light from screens, and the brain storing memories are all facts. They support something. But what?', focus: 'q' },
        { say: 'They support the idea that screens should be put away before bed. So that is the claim.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Judging evidence',
      layout: 'center',
      main: [
        { kind: 'text', id: 'rrs', size: 'md', md: 'Strong evidence is **relevant**, **reliable** and **sufficient**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind of evidence', 'Example', 'How strong?'],
          rows: [
            ['**Statistic**', '*A survey of 500 pupils found 7 in 10 want a longer lunch.*', 'Strong, if the survey was fair'],
            ['**Expert**', '*A children’s doctor says exercise helps concentration.*', 'Strong'],
            ['**Study**', '*Scientists found plastic in the stomachs of many turtles.*', 'Strong'],
            ['**Anecdote**', '*My friend says she loves running at break.*', 'Weak: one person'],
          ],
        },
      ],
      lines: [
        { say: 'Strong evidence is relevant, which means it connects to the claim. It is reliable, which means it comes from a trustworthy source. And it is sufficient, which means there is enough of it.', show: 'rrs' },
        { say: 'A statistic, like a survey of five hundred pupils, is strong if the survey was fair.', show: 't', focus: 't.0' },
        { say: 'An expert, like a children’s doctor, is strong, because the expert knows the subject. So is a scientific study.', focus: ['t.1', 't.2'] },
        { say: 'But an anecdote, one person’s experience, is weak evidence.', focus: 't.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“Everyone I know” is not everyone', md: '“Everyone I know loves skating, so the town needs a skate park” is an anecdote from a small group. It cannot be checked, and may not represent the whole town.' },
      ],
      lines: [
        { say: 'Here is a common mistake. An author who writes, everyone I know loves skating, so the town needs a skate park, is using an anecdote from a small group.', show: 'm' },
        { say: 'It cannot be checked, and it may not represent the whole town. Everyone I know is not everyone.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Claim: “Our school should start later in the morning.” Which is the strongest evidence?',
          choices: [
            'My brother is always tired in the morning.',
            'Everyone in my class hates getting up early.',
            'A sleep researcher found that pupils who start later get better marks.',
            'Mornings are the worst part of the day.',
          ],
          answer: 2,
          working: 'C comes from an expert study and connects to the claim. A and B are anecdotes, and D is an opinion.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest evidence for this claim? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It comes from an expert’s research, and it connects to the claim. Choices A and B are anecdotes, and Choice D is just an opinion.', show: 'q2.answer' },
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
            'A **claim** is arguable; **reasons** say why; **evidence** backs up the reasons.',
            'Strong evidence is relevant, reliable and sufficient.',
            'Anecdotes from a few people are weak evidence.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A claim is an arguable position, reasons say why it is right, and evidence backs up the reasons.', show: 'sum.0' },
        { say: 'Strong evidence is relevant, reliable and sufficient, like statistics, experts and studies.', show: 'sum.1' },
        { say: 'And anecdotes from a few people are weak evidence.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
