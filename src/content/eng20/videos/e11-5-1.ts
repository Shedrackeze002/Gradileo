import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-5-1',
  lessonId: 'e11-5-1',
  title: 'Framing in News Reports',
  thumbnailTitle: 'Framing in News Reports',
  thumbnail: false,
  summary:
    'Every news report involves choices: sources, omission, placement, word choice and image. Learn how those choices frame an event even when every fact is true, and how to compare headlines.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'News and Media', title: 'Framing in News Reports', subtitle: 'Same facts, different picture' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['*Hospital Workers Strike for One Day Over Pay*', '*Exhausted Hospital Staff Forced to Strike After Years of Pay Freezes*', '*Striking Staff Abandon Patients in Pay Grab*'],
        },
      ],
      lines: [
        { say: 'Three newspapers report the same morning: hospital cleaners and porters stopped work for one day in a dispute over pay. Here are their headlines.', show: ['title', 'b'] },
        { say: 'None of them is false. Yet a reader of each would come away with a different picture of the workers. Every report involves choices, and those choices frame the event. All the stories in this unit are invented.' },
      ],
    },
    {
      chapter: 'Framing',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Selection of sources**: which people and quotations to include',
            '**Omission**: which relevant facts to leave out',
            '**Placement**: what comes first, and what is buried at the end',
            '**Word choice**: neutral or loaded words for the same thing',
            '**Choice of image**: which photo readers see first',
          ],
        },
      ],
      lines: [
        { say: 'Framing is the way a report’s choices shape how readers understand an event, even when every fact in it is true.' },
        { say: 'There are five main choices. The first is selection of sources, such as a strike story that quotes four managers and no workers.', show: 'b.0', focus: 'b.0' },
        { say: 'Omission is leaving out relevant facts. Placement is what comes first, and what is buried at the end.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'Word choice means neutral or loaded words for the same thing, such as “passionate supporters” or “a rowdy mob”. And choice of image is which photo readers see first.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'What a report leaves out',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Bus passengers face a 20% fare hike in March, and some are already vowing to abandon the buses for their cars. Officials say the money will pay for forty new electric buses.'],
        },
        {
          kind: 'bullets',
          id: 'miss',
          items: ['Fares have not risen for eight years.', 'Students and pensioners will still travel free.'],
        },
      ],
      lines: [
        { say: 'Try a bus story. Fares will rise by twenty per cent in March, to pay for forty new electric buses. They have not risen for eight years, and students and pensioners still travel free.' },
        { say: 'Now read what one report says. It talks of a fare “hike”, and of passengers “vowing to abandon” the buses.', show: 'q', focus: 'q' },
        { say: 'Two facts are missing: the eight years without a rise, and the free travel. The loaded words do the rest.', show: 'miss' },
      ],
    },
    {
      chapter: 'Comparing headlines',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'h',
          items: [
            '*Mayor Raises Property Tax 3% to Fund Parks*: **neutral**',
            '*Mayor Invests in Greener Parks for Every Neighbourhood*: **favourable**',
            '*Mayor Hits Homeowners With Tax Hike*: **unfavourable**',
          ],
        },
      ],
      lines: [
        { say: 'Now compare headlines. Their few words often carry the whole frame.' },
        { say: '“Mayor Raises Property Tax three per cent to Fund Parks” is neutral. It states what happened in plain words.', show: 'h.0', focus: 'h.0' },
        { say: '“Mayor Invests in Greener Parks for Every Neighbourhood” is favourable, because “invests” and “greener” present a gift to the town.', show: 'h.1', focus: 'h.1' },
        { say: '“Mayor Hits Homeowners With Tax Hike” is unfavourable: “hits” and “hike” present an attack on people’s wallets.', show: 'h.2', focus: 'h.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: '“Biased” does not mean “false”',
          md: 'A framed report can be accurate in every sentence. Framing works through what is **chosen**, not through lies. Ask what else could have been said, and why it was not.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: thinking that a framed report must contain lies. It can be accurate in every sentence.', show: 'm' },
        { say: 'Framing works through what is chosen, so ask what else could have been said.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Riverside FC lost a cup final 2–1. Which headline is neutral?',
          choices: [
            'Riverside Crumble in Cup Final Flop',
            'Riverside FC Loses Cup Final 2–1',
            'Brave Riverside Robbed in the Final',
            'Riverside Shamed in Cup Final Fiasco',
          ],
          answer: 1,
          working: 'B states what happened in plain words. “Crumble”, “flop”, “robbed” and “shamed” all judge rather than report.',
        },
      ],
      lines: [
        { say: 'Your turn. Riverside lost a cup final, two goals to one. Which of these four headlines is neutral? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. It states what happened in plain words. The other three use words that judge, such as “flop”, “robbed” and “shamed”.', show: 'q2.answer' },
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
            'Framing is how a report’s choices shape understanding: sources, omission, placement, word choice and image.',
            'A framed report can be true in every sentence.',
            'Compare headlines by finding the words that judge rather than report.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Framing is how a report’s choices shape understanding: sources, omission, placement, word choice and image.', show: 'sum.0' },
        { say: 'A framed report can be true in every sentence, so look for what was chosen, left out, put first or buried.', show: 'sum.1' },
        { say: 'And compare headlines by finding the words that judge rather than report.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
