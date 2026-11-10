import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-4-3',
  lessonId: 'e7-4-3',
  title: 'Fact, Opinion and Bias',
  summary:
    'A fact can be checked and an opinion is a judgement people can disagree with. Bias is an unfair lean towards one side, shown by what is left out, loaded words or who is writing, and comparing sources helps to check for it.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Fact, Opinion and Bias', subtitle: 'What can be checked, and who is leaning' }],
      lines: [
        { say: 'Some sentences can be checked, and others are judgements. Some writers tell both sides, and others lean heavily towards one.', show: 'title' },
        { say: 'Telling fact from opinion, and spotting bias, are two of the most useful reading skills you can have. Let’s learn both.' },
      ],
    },
    {
      chapter: 'Fact and opinion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fact and opinion', md: 'A **fact** can be checked and proved true or false: *Water freezes at 0 °C at sea level.* An **opinion** is a judgement people can disagree with: *Winter is the best season of the year.*' },
        {
          kind: 'table',
          id: 't',
          head: ['Often signals an opinion', 'Often signals a fact'],
          rows: [['*best, worst, should, beautiful, terrible, a waste*', '*measured, recorded, counted*, specific numbers and dates']],
        },
      ],
      lines: [
        { say: 'A fact is a statement that can be checked and proved true or false. Water freezes at zero degrees Celsius at sea level.', caption: 'A fact is a statement that can be checked and proved true or false. Water freezes at 0 °C at sea level.', show: 'def' },
        { say: 'An opinion is a judgement or belief that people can disagree with. Winter is the best season of the year. It can never be proved, only argued for.', focus: 'def' },
        { say: 'A statement of fact does not even have to be true. The stadium cost thirty million dollars can be checked against records, even if the figure turns out to be wrong.', focus: 'def' },
        { say: 'Words like best, worst, should and terrible often signal an opinion. Words like measured, recorded and counted, and specific numbers, often signal a fact.', show: 't' },
      ],
    },
    {
      chapter: 'Opinions dressed up as facts',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Clearly, everyone agrees that homework is pointless.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Opinions dressed up as facts', md: 'Words like *clearly*, *obviously* and *everyone agrees* do **not** turn a judgement into a fact.' },
      ],
      lines: [
        { say: 'Writers sometimes make an opinion sound like a fact. Clearly, everyone agrees that homework is pointless.', show: 'q' },
        { say: 'Pointless is a judgement, and not everyone agrees. Words like clearly, obviously and everyone agrees do not turn a judgement into a fact.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Bias',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bias', md: 'A text is **biased** when it favours one side unfairly. A **balanced** text gives more than one side fairly.' },
        {
          kind: 'table',
          id: 't',
          head: ['Bias shows in…', 'Example'],
          rows: [
            ['**what is left out**', 'an article on a new road lists only its benefits, not the noise or lost trees'],
            ['**how things are worded**', 'one group is “protesters”, another doing the same is “thugs”'],
            ['**who is writing**', 'a review of a phone written by the company that makes it'],
          ],
        },
      ],
      lines: [
        { say: 'A text is biased when it favours one side unfairly. A balanced text gives more than one side fairly.', show: 'def' },
        { say: 'Bias can show in three ways. The first is what is included and left out. An article that lists only the benefits of a new road, and none of the noise or lost trees, is one-sided.', show: 't', focus: 't.0' },
        { say: 'The second is how things are worded. Calling one group protesters and another thugs, for doing the same thing, reveals the writer’s view.', focus: 't.1' },
        { say: 'The third is who is writing. A review of a phone written by the company that makes it has a reason to praise it.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which headline is most balanced?',
          choices: ['Heartless council destroys our beloved pool', 'Council votes 5–4 to close the old pool', 'Council finally rids town of useless pool', 'Pool lovers betrayed by greedy council'],
          answer: 1,
          working: 'A, C and D use loaded words (heartless, beloved, useless, greedy). B simply states what happened.',
        },
      ],
      lines: [
        { say: 'Your turn. Which headline about the town pool is most balanced? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The others use loaded words, such as heartless, useless and greedy. B simply states what happened. To check for bias, compare a text with other sources: what one leaves out, another may include.', show: 'q2.answer' },
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
            'A **fact** can be checked; an **opinion** is a judgement.',
            '*Best*, *should* and *clearly* often signal opinions.',
            '**Bias** shows in what is left out, loaded words, or who is writing.',
            'Compare sources to check for bias.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A fact can be checked, and an opinion is a judgement that people can disagree with.', show: 'sum.0' },
        { say: 'Words like best, should and clearly often signal opinions.', show: 'sum.1' },
        { say: 'Bias is an unfair lean towards one side. It shows in what is left out, in loaded words, or in who is writing.', show: 'sum.2' },
        { say: 'And to check for bias, compare sources.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
