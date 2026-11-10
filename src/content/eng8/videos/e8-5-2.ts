import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-5-2',
  lessonId: 'e8-5-2',
  title: 'News and Framing',
  summary:
    'A news report informs, an opinion column argues a writer’s view, an editorial gives the newspaper’s view and an advertisement sells. Framing is how a story is presented, through its headline, sources, images and captions, and it can steer readers towards a view even when every fact is true.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'News and Framing', subtitle: 'Same facts, different stories' }],
      lines: [
        { say: 'The news shapes how we see the world, so it matters how it is made.', show: 'title' },
        { say: 'In this video we tell news reports from opinion, and see how framing can steer readers towards a view, even in a report that sounds neutral.' },
      ],
    },
    {
      chapter: 'News and opinion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'News report', md: 'A **news report** informs. It gives facts (who, what, when and where) from several sources, with no “I think”.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind of text', 'Purpose', 'Clues'],
          rows: [
            ['**Opinion column**', 'argues a personal view', 'a named writer, “I believe”'],
            ['**Editorial**', 'the newspaper’s own view', '“we urge”; often unsigned'],
            ['**Advertisement**', 'sells or promotes', 'a brand, a call to buy'],
          ],
        },
      ],
      lines: [
        { say: 'A news report informs. It gives facts, who, what, when and where, from several sources, and it never says I think.', show: 'def' },
        { say: 'Other texts give views. An opinion column argues a personal view, so look for a named writer and phrases like I believe.', show: 't', focus: 't.0' },
        { say: 'An editorial gives the newspaper’s own view, with phrases like we urge, and it is often unsigned. And an advertisement sells or promotes a product or brand.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Telling them apart',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q1', size: 'md', lines: ['The city council voted 7–2 on Tuesday to build a new bridge over the river. Work will begin in March.'], by: 'News report' },
        { kind: 'quote', id: 'q2', size: 'md', lines: ['I have lived in this city for forty years, and I believe this bridge is a waste of our money.'], by: 'Opinion column' },
      ],
      lines: [
        { say: 'The city council voted seven to two on Tuesday to build a new bridge. Work will begin in March. This gives facts and no one’s view, so it is a news report.', show: 'q1' },
        { say: 'Compare this. I have lived in this city for forty years, and I believe this bridge is a waste of our money. The writer gives a personal view, so it is an opinion column.', show: 'q2' },
        { say: 'Clear labels, such as Opinion or Comment, help readers know when they are reading a view rather than a report.' },
      ],
    },
    {
      chapter: 'Framing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Framing', md: '**Framing** is how a story is presented, which shapes how readers see it: which **words** to use, which **facts** go first, whose **voices** are heard and which **image** is shown.' },
        {
          kind: 'table',
          id: 't',
          head: ['Choice', 'How it frames the story'],
          rows: [
            ['**Sources**', 'quoting three people against a new park, and none for it'],
            ['**Images**', 'a photo of the one person shouting at a calm protest'],
            ['**Captions**', '“Council’s failure leaves Main Street underwater” blames someone'],
          ],
        },
      ],
      lines: [
        { say: 'Framing is how a story is presented, which shapes how readers see it. Every report involves choices: which words to use, which facts go first, whose voices are heard, and which image is shown.', show: 'def' },
        { say: 'Sources frame a story. Quoting three people who oppose a new park, and nobody who supports it, frames the story against the park.', show: 't', focus: 't.0' },
        { say: 'Images frame it too. A photo of the one person shouting at a mostly peaceful protest makes the protest seem angrier than it was.', focus: 't.1' },
        { say: 'And captions. Floodwater covers Main Street on Monday morning is neutral. Council’s failure leaves Main Street underwater blames someone.', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Framing is not the same as lying', md: 'A framed story can be **entirely true**. Framing works through what is **chosen and stressed**, not false facts, which is why it is easy to miss. Ask: what does this story stress, and whose voices are heard?' },
      ],
      lines: [
        { say: 'A common mistake is to think framing means lying. A framed story can be entirely true.', show: 'm' },
        { say: 'Framing works through what is chosen and stressed, not through false facts, which is why it is easy to miss. So ask: what does this story stress, and whose voices are heard?', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two headlines report the same strike: “Workers fight for fair pay” and “Strike brings city to standstill”. How do they differ?',
          choices: [
            'One of them must be false.',
            'The first frames it as justice; the second as inconvenience.',
            'The first is an advert; the second is news.',
            'They frame the strike in exactly the same way.',
          ],
          answer: 1,
          working: '“Fair pay” puts the workers’ cause first; “standstill” puts the effect on everyone else first. Both may be accurate, but they lead readers to different feelings.',
        },
      ],
      lines: [
        { say: 'Your turn. Two headlines report the same strike. Workers fight for fair pay. And, strike brings city to standstill. How do they differ? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The first puts the workers’ cause first, with the positive word fair, so it frames the strike as a story of justice. The second puts the disruption first, as a story of inconvenience. Both may be true, but they lead to different feelings.', show: 'q2.answer' },
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
            'A **news report** informs; an **opinion column** and an **editorial** argue a view.',
            '**Framing** is how a story is presented.',
            'Headlines, sources, images and captions all frame a story.',
            'Framing can be true but one-sided: ask what is stressed, and who is heard.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A news report informs, while an opinion column and an editorial argue a view, and an advert sells.', show: 'sum.0' },
        { say: 'Framing is how a story is presented, which shapes how we see it.', show: 'sum.1' },
        { say: 'Headlines, sources, images and captions all frame a story.', show: 'sum.2' },
        { say: 'And framing can be true but one-sided, so always ask what is stressed, and whose voices are heard.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
