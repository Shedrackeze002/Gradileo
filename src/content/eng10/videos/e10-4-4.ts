import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-4-4',
  lessonId: 'e10-4-4',
  title: 'Bias and Reliable Sources',
  thumbnail: false,
  summary:
    'Spot logical fallacies, recognize bias and loaded language, and judge whether a source is reliable by asking who made it, what its evidence is, when it was made and why.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction and Persuasion', title: 'Bias and Reliable Sources', subtitle: 'Can you trust what you read?' }],
      lines: [
        { say: 'Two newspapers report the same event. One headline reads: Hundreds Gather to Protest New Tax. The other reads: Angry Mob Swarms City Hall.', show: 'title' },
        { say: 'Same people, same place, same afternoon, yet very different pictures. In this lesson, you will learn to spot faulty reasoning, recognize bias, and decide which sources to trust.' },
      ],
    },
    {
      chapter: 'Logical fallacies',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Fallacy', 'What goes wrong'],
          rows: [
            ['Ad hominem', 'attacks the person, not the argument'],
            ['Bandwagon', 'says it is right because many people do it'],
            ['False dilemma', 'offers only two choices when there are more'],
            ['Straw man', 'twists the other side’s view into a weaker one'],
          ],
        },
      ],
      lines: [
        { say: 'A logical fallacy is a flaw in reasoning that makes an argument seem stronger than it really is. Here are four common ones.', show: 't.0' },
        { say: 'Ad hominem attacks the person instead of the argument. Bandwagon says something is right because many people do it.', show: 't.1', focus: ['t.0', 't.1'] },
        { say: 'A false dilemma offers only two choices when there are more. A straw man twists the other side’s view into a weaker one, then attacks that.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Bias and loaded language',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'b',
          head: ['Neutral', 'Loaded'],
          rows: [
            ['gathered', 'swarmed, mobbed, invaded'],
            ['criticized', 'slammed, savaged, tore apart'],
            ['rose', 'skyrocketed, exploded'],
          ],
        },
      ],
      lines: [
        { say: 'Bias is a leaning toward one side that prevents a fair view. A biased text may contain true facts, but it chooses them to push the reader one way.', show: 'b.0' },
        { say: 'The clearest sign is loaded language, words with strong feelings attached. Gathered is neutral, but swarmed and mobbed make the same people sound dangerous.', focus: 'b.0' },
        { say: 'Criticized is neutral, but slammed and savaged add drama. Rose is neutral, but skyrocketed exaggerates.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Reliable sources',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'q',
          items: ['**Who** made it? Real expertise?', '**What** is the evidence? Can it be checked?', '**When** was it made? Recent enough?', '**Why** was it made? Does it gain from persuading you?'],
        },
      ],
      lines: [
        { say: 'Before you trust a source, ask four questions.', show: 'q.0' },
        { say: 'Who made it? Does the writer have real expertise? And what is the evidence? Can it be checked?', show: 'q.1', focus: ['q.0', 'q.1'] },
        { say: 'When was it made? It must be recent enough for your question. And why was it made? Does it gain money or votes by persuading you?', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Calling every bad argument a fallacy', md: 'An argument you disagree with is not automatically a fallacy. Name a fallacy only when you can **point to the flaw** in the reasoning.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Students call every argument they dislike a fallacy.', show: 'mis' },
        { say: 'The bridge has failed two safety inspections, so engineers recommend closing it, is perfectly reasonable. The conclusion follows from relevant evidence. Name a fallacy only when you can point to the flaw.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You want to know how many hours of sleep teenagers need. Which source is the most reliable?',
          choices: [
            'A blog post by a company that sells mattresses to teenagers',
            'A magazine article about sleep that was written fifty years ago',
            'A video about sleep by a very popular online personality',
            'A recent report by children’s doctors reviewing many studies',
          ],
          answer: 3,
          working: 'The doctors are experts, the report rests on many studies, and it is recent. The others gain from selling, are out of date, or lack evidence.',
        },
      ],
      lines: [
        { say: 'Your turn. You want to know how many hours of sleep teenagers need. Which of the four sources is the most reliable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The doctors are experts, the report rests on many studies, and it is recent. Choice A comes from a company that wants to sell you a bed.', show: 'q.answer' },
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
            'A **logical fallacy** is a flaw in reasoning that makes an argument look stronger than it is.',
            '**Bias** leans to one side; look for loaded language and missing facts.',
            'Judge a source by who, what evidence, when and why.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A logical fallacy is a flaw in reasoning that makes an argument look stronger than it is.', show: 'sum.0' },
        { say: 'Bias leans toward one side. Look for loaded language, one-sided sources and missing facts.', show: 'sum.1' },
        { say: 'And judge a source by who made it, what its evidence is, when it was made and why.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
