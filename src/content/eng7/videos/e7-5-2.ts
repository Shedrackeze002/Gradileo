import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-5-2',
  lessonId: 'e7-5-2',
  title: 'Judging Sources Online',
  summary:
    'A source is reliable when it is accurate, up to date and honest about its purpose. Check who wrote it, when, how they know and whether other reliable sources agree, and notice whether an online text informs, persuades, sells or entertains.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'Judging Sources Online', subtitle: 'Can you trust what you read?' }],
      lines: [
        { say: 'Anyone can publish anything online.', show: 'title' },
        { say: 'That makes the internet wonderful for finding information, and risky too, because not everything you read is true, up to date, or honest about what it wants. In this video we learn to check a source and its purpose.' },
      ],
    },
    {
      chapter: 'Sources',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Source and reliable', md: 'A **source** is anywhere you get information from: a book, a website, an article, a video, an interview or a post. A source is **reliable** when it is accurate, up to date and honest about its purpose.' },
      ],
      lines: [
        { say: 'A source is anywhere you get information from: a book, a website, an article, a video, an interview or a post.', show: 'def' },
        { say: 'A source is reliable when you can trust it to be accurate, up to date, and honest about its purpose.', focus: 'def' },
      ],
    },
    {
      chapter: 'Four questions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Why it matters'],
          rows: [
            ['**Who wrote it?**', 'a named, qualified author or respected organization beats an anonymous post'],
            ['**When was it written?**', 'an old page about phones may describe phones that no longer exist'],
            ['**How do they know?**', 'good sources show their evidence: studies, data, named experts'],
            ['**Do other reliable sources agree?**', 'if several independent sources agree, it is more likely true'],
          ],
        },
        { kind: 'text', id: 'a', size: 'md', md: 'Comparing with other independent sources is **cross-checking**.' },
      ],
      lines: [
        { say: 'Ask four questions of any source. Who wrote it? A named author with the right qualifications, or a respected organization, is more trustworthy than an anonymous post.', show: 't', focus: 't.0' },
        { say: 'When was it written? A page about phones from many years ago may describe phones that no longer exist.', focus: 't.1' },
        { say: 'How do they know? Good sources show their evidence, such as studies, data and named experts.', focus: 't.2' },
        { say: 'And do other reliable sources agree? If several independent sources say the same, the fact is more likely to be true. This is called cross-checking.', show: 'a', focus: 't.3' },
        { say: 'The web address can be a clue too. Universities and governments often use special endings. But an address is only one clue, not proof.', focus: 'a' },
      ],
    },
    {
      chapter: 'A suspicious post',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Scientists prove chocolate cures colds!'] },
        { kind: 'text', id: 'a', size: 'md', md: 'No scientists named, no study linked: **treat it with doubt**.' },
      ],
      lines: [
        { say: 'A post says scientists prove chocolate cures colds. It names no scientists, and links to no study.', show: 'q' },
        { say: 'Who wrote it? We do not know. How do they know? No study is named, so the claim cannot be checked.', focus: 'q' },
        { say: 'So treat it with doubt until a reliable source confirms it.', show: 'a' },
      ],
    },
    {
      chapter: 'What does this text want?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Purpose', 'Example'],
          rows: [
            ['**inform**', '*Library opening hours: Monday to Friday, 9 a.m. to 6 p.m.*'],
            ['**persuade**', '*Write to your council today and demand safer crossings.*'],
            ['**sell**', '*Get 50% off all trainers this weekend only!*'],
            ['**entertain**', '*Ten photos of cats who think they are dogs*'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A review is not always a review', md: 'A friendly post praising *GlowSkin* cream with a discount code, labelled **Sponsored**, was paid for. Its real purpose is to **sell**.' },
      ],
      lines: [
        { say: 'Every online text has a purpose. Most aim to inform, persuade, sell or entertain. Library opening hours inform. Write to your council today persuades.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Fifty percent off all trainers this weekend sells, and ten photos of cats who think they are dogs entertains.', focus: ['t.2', 't.3'] },
        { say: 'Some texts hide their purpose. A post that looks like a friendly personal review may be paid for by a company. Look for labels such as sponsored, ad, or paid partnership, and for discount codes and buy now links.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You find a claim about sleep on an anonymous blog. What is the best way to check it?',
          choices: ['Trust it if it has lots of likes.', 'Cross-check it with reliable sources, such as a health organization.', 'Trust it because it is online.', 'Ask whether the blog looks colourful.'],
          answer: 1,
          working: 'Likes and looks do not prove anything. If independent, reliable sources say the same thing, the claim is more likely to be true.',
        },
      ],
      lines: [
        { say: 'Your turn. You find a claim about sleep on an anonymous blog. What is the best way to check it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Likes and looks prove nothing. Cross-check the claim with reliable, independent sources, such as a health organization.', show: 'q2.answer' },
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
            'Check **who** wrote it, **when**, **how they know**, and whether others **agree**.',
            '**Cross-checking** compares a fact with independent sources.',
            'Online texts **inform**, **persuade**, **sell** or **entertain**.',
            '*Sponsored* and *Ad* mean someone paid for the post.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Check who wrote a source, when, how they know, and whether other reliable sources agree.', show: 'sum.0' },
        { say: 'Cross-checking means comparing a fact with other independent sources.', show: 'sum.1' },
        { say: 'Online texts inform, persuade, sell or entertain.', show: 'sum.2' },
        { say: 'And labels like sponsored and ad mean that someone paid for the post.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
