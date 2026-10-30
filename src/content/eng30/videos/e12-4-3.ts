import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-4-3',
  lessonId: 'e12-4-3',
  title: 'Satire: Wilde, Pope and Swift',
  thumbnailTitle: 'Satire',
  thumbnail: false,
  summary:
    'Horatian satire laughs gently at folly; Juvenalian satire attacks vice with anger. Learn five tools of satire and how to find the target in Wilde, Pope and Swift.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Rhetoric and Argument', title: 'Satire: Wilde, Pope and Swift', subtitle: 'Modes, tools and targets' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['To lose one parent, Mr. Worthing, may be regarded as a misfortune; to lose both looks like carelessness.'],
          by: 'Lady Bracknell, in Oscar Wilde, The Importance of Being Earnest (1895)',
        },
      ],
      lines: [
        { say: 'On a winter evening in eighteen ninety-five, a London audience watched a grand lady interview a young man who wished to marry her daughter. He had lost both his parents. Her reply brought the house down.', show: ['title', 'q'] },
        { say: 'Lady Bracknell treats a family tragedy as a lapse in manners. In this lesson, you will tell two modes of satire apart, name five tools, and find the targets of Wilde, Alexander Pope and Jonathan Swift.' },
      ],
    },
    {
      chapter: 'Two modes of satire',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Horatian**: gentle and amused; laughs at folly', '**Juvenalian**: bitter and angry; attacks vice'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['… I cannot but conclude the bulk of your natives to be the most pernicious race of little odious vermin that nature ever suffered to crawl upon the surface of the earth.'],
          by: 'Jonathan Swift, Gulliver’s Travels (1726)',
        },
      ],
      lines: [
        { say: 'Horatian satire, named after the poet Horace, is gentle and amused. It laughs at folly, the silly and vain habits that people share. Wilde is Horatian.', show: 'b.0' },
        { say: 'Juvenalian satire, named after the poet Juvenal, is bitter and angry. It attacks vice that causes real harm.', show: 'b.1' },
        { say: 'In Gulliver’s Travels, the giant King of Brobdingnag hears Gulliver proudly describe his country, and gives his verdict. There is no gentleness here, and Swift means readers to feel the sting.', show: 'q' },
      ],
    },
    {
      chapter: 'Five tools of satire',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Epigram**: a short, witty saying',
            '**Mock-heroic**: something trivial in the grand style of an epic',
            '**Allegory**: a story that stands for real events',
            '**Caricature**: exaggerated features',
            '**Invective**: harsh, abusive denunciation',
          ],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Here thou, great Anna! whom three realms obey,', 'Dost sometimes counsel take—and sometimes tea.'],
          by: 'Alexander Pope, The Rape of the Lock (1714)',
        },
      ],
      lines: [
        { say: 'An epigram is a short, witty saying with a surprising twist. Mock-heroic describes something trivial in the grand style of an epic. An allegory is a story whose characters stand for real people or events.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Caricature exaggerates features to make them ridiculous, and invective is direct, harsh denunciation.', show: ['b.3', 'b.4'] },
        { say: 'Pope’s poem is mock-heroic, and here he mocks the Queen. The verb take governs both counsel and tea, which puts the business of three kingdoms on the same level as a tea party.', show: ['q.0', 'q.1'], focus: 'q.1' },
        { say: 'Wilde’s play is a comedy of manners: a play that satirizes the behaviour and values of a fashionable class, through witty dialogue. Its targets are snobbery, marriages arranged for money and rank, and putting style before sincerity.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'The literal target', md: 'The target of a satire is rarely what its words are about. Ask whose **attitudes or values** are made ridiculous.' },
      ],
      lines: [
        { say: 'Here is a common mistake. The target of a satire is rarely what its words are about.', show: 'm' },
        { say: 'Swift is not writing about eggs, Pope is not upset about tea, and Lady Bracknell’s real subject is not parents. Ask whose attitudes or values the passage makes ridiculous.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In Lilliput, wars are fought over which end of an egg to break. What is Swift’s target?',
          choices: [
            'The cooking habits of ordinary families in his England.',
            'The greedy merchants who sold eggs at high prices.',
            'The giant King and the strange laws of his land.',
            'The bitter wars between Catholics and Protestants.',
          ],
          answer: 3,
          working: 'Lilliput is an allegory. The quarrel over eggs stands for the bitter quarrels between Catholics and Protestants, and between Britain and France.',
        },
      ],
      lines: [
        { say: 'Your turn. In Lilliput, wars are fought over which end of an egg to break. What is Swift’s target? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Lilliput is an allegory. The quarrel over eggs stands for the bitter quarrels between Catholics and Protestants, and between Britain and France.', show: 'q2.answer' },
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
            'Horatian satire laughs at folly; Juvenalian attacks vice.',
            'Tools: epigram, mock-heroic, allegory, caricature, invective.',
            'The target is whose attitudes are made ridiculous.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Horatian satire laughs gently at folly, and Juvenalian satire attacks vice with anger and scorn.', show: 'sum.0' },
        { say: 'Five tools are the epigram, the mock-heroic, allegory, caricature and invective.', show: 'sum.1' },
        { say: 'And the target is rarely what the words are about. Ask whose attitudes or values are made ridiculous.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
