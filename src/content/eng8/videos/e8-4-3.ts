import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-4-3',
  lessonId: 'e8-4-3',
  title: 'Evaluating Sources and Reasoning',
  summary:
    'A primary source is first-hand and a secondary source interprets it later. Judge credibility by the author, purpose, date, evidence and agreement with other sources, and watch for conflicts of interest. A fallacy is a flaw in reasoning, such as bandwagon, false choice, hasty generalization or attack on the person.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Evaluating Sources and Reasoning', subtitle: 'Who to believe, and why' }],
      lines: [
        { say: 'Not every source deserves to be believed, and not every argument that sounds convincing is sound.', show: 'title' },
        { say: 'In this video we learn to judge whether a source is credible, and to spot fallacies, tricks of reasoning that fall apart when you look closely.' },
      ],
    },
    {
      chapter: 'Primary and secondary sources',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Primary and secondary sources', md: 'A **primary source** is a first-hand account or original record from the time: a diary, a letter, a photograph, an interview, experiment data. A **secondary source** describes or interprets primary sources later: a textbook, an encyclopedia article, a review.' },
      ],
      lines: [
        { say: 'A primary source is a first-hand account or original record from the time, such as a diary, a letter, a photograph, an interview, or the data from an experiment.', show: 'def' },
        { say: 'A secondary source describes or interprets primary sources later, such as a textbook, an encyclopedia article or a review.', focus: 'def' },
      ],
    },
    {
      chapter: 'Is it credible?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ask…', 'Look for…'],
          rows: [
            ['**Who wrote it?**', 'an expert, or an organisation with a good record'],
            ['**Why was it written?**', 'to inform, or to sell and persuade?'],
            ['**When was it published?**', 'recent enough for the topic'],
            ['**Does it show its evidence?**', 'sources and data you can check'],
            ['**Do other sources agree?**', 'the same findings from independent experts'],
          ],
        },
      ],
      lines: [
        { say: 'A credible source is one you can trust. To judge it, ask five questions. Who wrote it? Look for an expert, or an organisation with a good record.', show: 't', focus: 't.0' },
        { say: 'Why was it written? To inform you, or to sell you something? And when was it published? It should be recent enough for the topic.', focus: ['t.1', 't.2'] },
        { say: 'Does it show its evidence, with sources and data you can check? And do other good sources agree?', focus: ['t.3', 't.4'] },
        { say: 'A peer-reviewed journal is especially credible, because other experts checked the research before it was published. An anonymous forum post or an advert is much less so.' },
      ],
    },
    {
      chapter: 'Conflicts of interest',
      layout: 'center',
      main: [
        { kind: 'text', id: 'e', size: 'md', md: 'A study finds that energy drinks improve concentration. It was **paid for by an energy-drink company**.' },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Conflict of interest', md: 'The company gains if the results look good. The study is not automatically wrong, but **check it against independent research**.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Looks are not evidence', md: 'A smart design says nothing about accuracy. Expertise, date and evidence do.' },
      ],
      lines: [
        { say: 'Here is an example. A study finds that energy drinks improve concentration, but it was paid for by an energy-drink company.', show: 'e' },
        { say: 'The company has something to gain if the results look good, so there could be a conflict of interest. The study is not automatically wrong, but its results need checking against independent research.', show: 'k' },
        { say: 'A common mistake is to trust a website because it looks smart. Design says nothing about accuracy. Expertise, date and evidence do.', show: 'm' },
      ],
    },
    {
      chapter: 'Fallacies',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fallacy', md: 'A **fallacy** is a flaw in reasoning that makes an argument weak, even if it sounds convincing.' },
        {
          kind: 'table',
          id: 't',
          head: ['Fallacy', 'Example'],
          rows: [
            ['**Bandwagon**: popular, so right', '“Everyone is buying this phone, so it must be the best.”'],
            ['**False choice**: only two options', '“Either we ban all cars, or the air is poisoned forever.”'],
            ['**Hasty generalization**: too few cases', '“My two cousins hated the film, so everyone will.”'],
            ['**Attack on the person**', '“Why listen to her? She can’t keep her own garden tidy.”'],
          ],
        },
      ],
      lines: [
        { say: 'A fallacy is a flaw in reasoning that makes an argument weak, even if it sounds convincing.', show: 'def' },
        { say: 'Bandwagon says something is right because many people do it. Everyone is buying this phone, so it must be the best. But popularity is not evidence.', show: 't', focus: 't.0' },
        { say: 'A false choice offers only two options when there are more, so it hides the middle ground.', focus: 't.1' },
        { say: 'A hasty generalization judges a whole group from too few examples, like two cousins.', focus: 't.2' },
        { say: 'And an attack on the person goes after the speaker instead of their argument, so it never answers what they actually said.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“I met a rude tourist once, so tourists are all rude.” Which fallacy is this?',
          choices: [
            'Bandwagon',
            'Attack on the person',
            'Hasty generalization',
            'False choice',
          ],
          answer: 2,
          working: 'The speaker has one example, and from it judges a whole group of millions of people. One case is far too few to support a claim about everyone.',
        },
      ],
      lines: [
        { say: 'Your turn. I met a rude tourist once, so tourists are all rude. Which fallacy is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, a hasty generalization. The speaker has just one example, and from it judges a whole group of millions of people. One case is far too few.', show: 'q2.answer' },
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
            '**Primary** sources are first-hand; **secondary** sources interpret them later.',
            'Judge credibility by author, purpose, date, evidence and agreement.',
            'Watch for **conflicts of interest**; design is not evidence.',
            '**Fallacies**: bandwagon, false choice, hasty generalization, attack on the person.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Primary sources are first-hand, and secondary sources interpret them later.', show: 'sum.0' },
        { say: 'Judge a source’s credibility by its author, purpose, date, evidence, and whether other good sources agree.', show: 'sum.1' },
        { say: 'Watch for conflicts of interest, and remember that a smart design is not evidence.', show: 'sum.2' },
        { say: 'And look out for fallacies: bandwagon, false choice, hasty generalization, and attack on the person.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
