import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-5-2',
  lessonId: 'e9-5-2',
  title: 'Misinformation and Checking Sources',
  summary:
    'Misinformation is false or misleading information, shared whether or not people know it is false; disinformation is false on purpose. Watch for clickbait, manipulated images, strong emotion and missing sources. Check a claim with lateral reading, reverse image searches, fact-checks and independent sources before you share it.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'Misinformation and Checking Sources', subtitle: 'Check before you share' }],
      lines: [
        { say: 'False stories can travel around the world in minutes, while the truth is still checking its facts.', show: 'title' },
        { say: 'In this video we learn to recognise misinformation, and to check a claim before we trust it or share it.' },
      ],
    },
    {
      chapter: 'Misinformation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Misinformation and disinformation', md: '**Misinformation** is false or misleading information, shared whether or not people know it is false. **Disinformation** is false information spread **on purpose** to deceive.' },
        {
          kind: 'table',
          id: 't',
          head: ['Warning sign', 'What it looks like'],
          rows: [
            ['**Clickbait**', '“Scientists HATE this one weird trick!”'],
            ['**Manipulated images**', 'a photo that is edited, or from a different event'],
            ['**Strong emotion**', 'a post that makes you furious, so you share before thinking'],
            ['**No source**', 'a claim or quotation with no link to where it came from'],
          ],
        },
      ],
      lines: [
        { say: 'Misinformation is false or misleading information, shared whether or not people know it is false. Disinformation is false information spread on purpose, to deceive.', show: 'def' },
        { say: 'Watch for warning signs. Clickbait is a headline designed to make you click, often by exaggerating. And images can be edited, or taken from a different event.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'A post that makes you furious or frightened wants you to share it before you think. And a claim with no source should make you suspicious.', focus: ['t.2', 't.3'] },
        { say: 'Misinformation often spreads faster than corrections, because it is surprising or emotional. And an echo chamber, an online space where people mainly see views like their own, can let false claims go unchallenged.' },
      ],
    },
    {
      chapter: 'A viral photo',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'After a storm, a photo of a **shark swimming down a flooded street** is shared thousands of times.',
            'It is dramatic and surprising: a reason to **slow down**, not to share.',
            'A **reverse image search** shows where the photo first appeared.',
            'The number of shares proves **nothing** about whether it is real.',
          ],
        },
      ],
      lines: [
        { say: 'After a storm, a photo of a shark swimming down a flooded street is shared thousands of times.', show: 'b.0' },
        { say: 'The image is dramatic and surprising, which is a reason to slow down, not to share.', show: 'b.1' },
        { say: 'A reverse image search can show where the photo first appeared.', show: 'b.2' },
        { say: 'Many such photos turn out to be edited, or reused from somewhere else. So the number of shares proves nothing about whether it is real.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Checking a claim',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Lateral reading', md: 'Instead of judging a site by how it looks, open **new tabs** and check what **other sources** say about the site or the claim.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Find the source.** Who made the claim first?',
            '**Read laterally.** What do reliable, independent sources say?',
            '**Check the quote or image.** Search the exact words; reverse-search the image.',
            '**Look for fact-checks** of viral claims.',
          ],
        },
      ],
      lines: [
        { say: 'Start with one question: who is behind this, and what do they want? Then do what professional fact-checkers do, which is lateral reading. Instead of judging a site by how it looks, open new tabs and check what other sources say about it.', show: 'k' },
        { say: 'Find the source: who made the claim first, and is there a link? Then read laterally: what do reliable, independent sources say?', show: ['b.0', 'b.1'] },
        { say: 'Check the quote or image: search for the exact words, or do a reverse image search. And look for fact-checks, because fact-checking organisations investigate viral claims and show their evidence.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two websites report the same shocking claim, word for word. Does this confirm it is true?',
          choices: [
            'Yes, two sources always confirm a claim.',
            'Yes, if both websites look professional.',
            'Yes, if the claim has been shared many times.',
            'No: one may have copied the other, so look for independent confirmation.',
          ],
          answer: 3,
          working: 'Two copies are not two sources. Identical wording suggests copying, so look for independent confirmation from trustworthy sources.',
        },
      ],
      lines: [
        { say: 'Your turn. Two websites report the same shocking claim, word for word. Does this confirm it is true? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Two copies are not two sources. One website may simply have copied the other, so look for independent confirmation from trustworthy sources.', show: 'q2.answer' },
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
            '**Misinformation** is false or misleading; **disinformation** is false on purpose.',
            'Watch for clickbait, manipulated images, strong emotion and no source.',
            'Check with **lateral reading**, image searches and fact-checks.',
            'Look for **independent** sources before you share.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Misinformation is false or misleading, and disinformation is false on purpose.', show: 'sum.0' },
        { say: 'Watch for clickbait, manipulated images, strong emotion and missing sources.', show: 'sum.1' },
        { say: 'Check claims with lateral reading, image searches and fact-checks.', show: 'sum.2' },
        { say: 'And look for independent sources before you share anything.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
