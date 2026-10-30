import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-5-3',
  lessonId: 'e11-5-3',
  title: 'Representation and Digital Media',
  thumbnailTitle: 'Representation and Digital Media',
  thumbnail: false,
  summary:
    'Media do not only report the world, they represent it. Learn what stereotypes are, whose voice is missing from a story, how algorithms, sponsored content and clickbait work, and how to check a viral claim.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'News and Media', title: 'Representation and Digital Media', subtitle: 'What are you being shown?' },
      ],
      lines: [
        { say: 'In a phone advert, a grandmother holds the phone upside down until her grandson rescues her. It is meant to be a gentle joke.', show: 'title' },
        { say: 'But if every advert shows older people baffled by technology, viewers absorb a picture that is simply untrue. Media do not only report the world. They represent it.' },
        { say: 'Today: how media represent people, and what decides what you see online.' },
      ],
    },
    {
      chapter: 'Stereotypes and voices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Stereotype', md: 'An oversimplified idea that all the members of a group are the same.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['A report on a strike by bus drivers quotes the bus company’s chief executive, a city councillor and two passengers.'],
        },
        { kind: 'bullets', id: 'b', items: ['**Most affected:** the drivers on strike', '**Quoted:** the company, a councillor and passengers', '**Missing:** the bus drivers'] },
      ],
      lines: [
        { say: 'Representation is the way media show people, groups, places and ideas. A stereotype is an oversimplified idea that all the members of a group are the same.', show: 'def' },
        { say: 'Stereotypes do harm even as jokes, because they shape how people see themselves.' },
        { say: 'Representation is also about who gets to speak. Take a report on a strike by bus drivers.', hide: 'def', show: 'q' },
        { say: 'It quotes the chief executive, a councillor and two passengers. The drivers, the people most affected, are missing.', show: 'b' },
      ],
    },
    {
      chapter: 'What decides what you see',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Recommendation algorithm**: picks what to show you next',
            '**Echo chamber**: you hear only views that match your own',
            '**Sponsored content**: paid promotion made to look ordinary',
            '**Clickbait**: a headline that teases, then fails to deliver',
            '**Misinformation**: false information that spreads',
          ],
        },
      ],
      lines: [
        { say: 'Online, much of what you see is chosen for you. A recommendation algorithm picks what to show you next from what you have already watched, clicked or bought.', show: 'b.0', focus: 'b.0' },
        { say: 'An echo chamber is a space where you hear only views that match your own.', show: 'b.1', focus: 'b.1' },
        { say: 'Sponsored content is paid promotion made to look ordinary. Clickbait teases to get clicks, then fails to deliver.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
        { say: 'And misinformation is false information that spreads, often because it is shocking and people share it without checking.', show: 'b.4', focus: 'b.4' },
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
          title: 'Disclosure hidden away is not disclosure',
          md: 'A clear disclosure appears in the post itself, at the start, in plain words:',
        },
        { kind: 'quote', id: 'ad', size: 'md', lines: ['Ad: Brightsmile paid me to try their toothpaste.'] },
      ],
      lines: [
        { say: 'Here is a common mistake. An influencer says, “my partnerships are listed in a link on my profile”.', show: 'm' },
        { say: 'That has not really told viewers that the post is paid. A clear disclosure appears in the post itself, at the start, in plain words, like this one.', show: 'ad', focus: 'ad' },
      ],
    },
    {
      chapter: 'Checking a viral claim',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Who made this?**', '**What do other reliable sources say?**', '**Is the photo or quotation really from where it claims to be?**'],
        },
      ],
      lines: [
        { say: 'When a shocking post goes viral, the instinct is to study the post itself. Professional fact-checkers do the opposite.' },
        { say: 'They read laterally. They leave the post and open new tabs, to see what trusted sources say about the claim.' },
        { say: 'Before you share, ask three quick questions. Who made this? What do other reliable sources say?', show: ['b.0', 'b.1'] },
        { say: 'And is the photo or quotation really from where it claims to be? A popular post is not the same as a true one.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A shocking post is going viral. What do fact-checkers do first?',
          choices: [
            'Leave the post and check what trusted sources say.',
            'Reread the post closely and count how many likes it has.',
            'Scan the comments to see whether other viewers believe it.',
            'Ask friends to share it so the claim can be debated.',
          ],
          answer: 0,
          working: 'Professional fact-checkers read laterally: they leave the post and see what reliable sources say about the claim and who is behind it.',
        },
      ],
      lines: [
        { say: 'Your turn. A shocking post is going viral. What do professional fact-checkers do first? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. They read laterally: they leave the post and see what reliable sources say about the claim.', show: 'q2.answer' },
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
            'A stereotype reduces a whole group to one trait; ask whose voice is missing.',
            'Algorithms and echo chambers narrow what you see; sponsored content must say it is paid.',
            'Check a viral claim by reading laterally.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A stereotype reduces a whole group to one trait, so ask whose voice is missing from a story.', show: 'sum.0' },
        { say: 'Algorithms and echo chambers narrow what you see, and sponsored content should say clearly that it is paid.', show: 'sum.1' },
        { say: 'And check a viral claim by reading laterally: leave the post, and see what reliable sources say.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
