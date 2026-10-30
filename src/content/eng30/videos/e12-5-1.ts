import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-5-1',
  lessonId: 'e12-5-1',
  title: 'Media Industries and Audiences',
  thumbnailTitle: 'Industries and Audiences',
  thumbnail: false,
  summary:
    'Every outlet is made by an industry that must pay its bills. Learn how funding, ownership and platforms shape what media make, and what audiences never get to see, with Ida B. Wells as a guide.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Media and Culture', title: 'Media Industries and Audiences', subtitle: 'Who pays, who owns, who decides' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The *Daily Commercial* and *Evening Scimitar* of Memphis, Tenn., are owned by leading business men of that city …'],
          by: 'Ida B. Wells, *Southern Horrors* (1892)',
        },
      ],
      lines: [
        { say: 'In eighteen ninety-two, a young journalist named Ida B. Wells asked a question that media students still ask. Who owns the press, and whose interests does it serve?', show: ['title', 'q'] },
        { say: 'She found that the city’s leading papers printed rumours as facts, and a mob destroyed her newspaper’s office. In this lesson, you will see how funding, ownership and platforms shape what media make.' },
      ],
    },
    {
      chapter: 'Who pays?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Advertising**: businesses buying the audience’s attention',
            '**Subscription**: readers or viewers who pay a fee',
            '**Public funding**: taxpayers or a licence fee, with a legal mission',
          ],
        },
      ],
      lines: [
        { say: 'Every outlet is paid for by someone, and content tends to drift towards whatever keeps the money coming.' },
        { say: 'Advertising sells the audience’s attention, so content is built for the audience advertisers want most.', show: 'b.0', focus: 'b.0' },
        { say: 'With subscription, readers pay a fee, so content is shaped to keep them, and may avoid what upsets them.', show: 'b.1', focus: 'b.1' },
        { say: 'Public funding carries a legal mission to serve the whole country.', show: 'b.2', focus: 'b.2' },
        { say: 'Free is never free. If a news site charges you nothing, what it sells to advertisers is you: your attention, your clicks and your data.' },
      ],
    },
    {
      chapter: 'Who owns?',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The Afro-American papers are the only ones which will print the truth, and they lack means to employ agents and detectives to get at the facts.'],
          by: 'Ida B. Wells, *Southern Horrors* (1892)',
        },
      ],
      lines: [
        { say: 'Ownership is who controls an outlet. Owners with other businesses or political interests can shape what it covers. Concentration means that a few companies own many outlets, so fewer voices decide what the public hears.' },
               { say: 'Wells noticed that the papers spreading false reports belonged to the city’s leading businessmen, while the Black press, which was willing to investigate, was too poor to do so. Her answer was about money. If readers supported their own papers, those papers could afford to find the facts.', show: 'q' },
      ],
    },
    {
      chapter: 'Platforms and gatekeepers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Gatekeeper', md: 'A gatekeeper decides which stories pass through to the audience and which are left out.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['The people must know before they can act, and there is no educator to compare with the press.'], by: 'Ida B. Wells, *Southern Horrors* (1892)' },
      ],
      lines: [
        { say: 'A gatekeeper decides which stories reach the audience. For most of the twentieth century, gatekeepers were editors and producers. Today they also include platforms, whose ranking rules, called algorithms, decide what each user sees first, or at all.', show: 'def' },
        { say: 'A story pushed far down the feed may reach almost no one, so a platform can be a gatekeeper without deleting a single post.' },
        { say: 'Wells understood why this matters.', show: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Conspiracy**: Someone secretly ordered the story to be dropped.', '**Pressure**: A newsroom with less money does fewer investigations.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: seeing a conspiracy everywhere.', show: 'b.0' },
        { say: 'Most influence is structural, not a secret plot. A site paid by clicks drifts towards drama, and a newsroom with less money does fewer investigations. Explain the pattern by the pressure that produces it.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A farming newsletter, paid for by reader fees, grows cautious about criticizing big farms. What shapes it?',
          choices: [
            'Subscription: it softens stories that upset its paying readers.',
            'Advertising: it avoids stories that offend its paying sponsors.',
            'Public funding: it must serve every region without controversy.',
            'Platform rules: its articles are pushed down by an algorithm.',
          ],
          answer: 0,
          working: 'Its income comes from readers, and many of them own large farms, so criticism costs subscribers. Subscription funding is shaping the content.',
        },
      ],
      lines: [
        { say: 'Your turn. A farming newsletter, paid for by reader fees, grows cautious about criticizing big farms. What shapes it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. Its income comes from readers, and many of them own large farms, so criticism costs subscribers.', show: 'q2.answer' },
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
            'Content is shaped by who pays, who owns and the platform.',
            'Gatekeepers decide what reaches the public.',
            'Explain influence by pressure, not by plots.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Media content is shaped by who pays, who owns the outlet, and the platform where it appears.', show: 'sum.0' },
        { say: 'Gatekeepers, once editors and now also algorithms, decide what reaches the public.', show: 'sum.1' },
        { say: 'And explain influence by the pressure that produces it, not by imagining a plot.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
