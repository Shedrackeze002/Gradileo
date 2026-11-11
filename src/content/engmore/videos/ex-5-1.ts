import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-5-1',
  lessonId: 'ex-5-1',
  title: 'A Christmas Carol',
  thumbnail: false,
  summary:
    'Dickens’s novella of 1843 follows Scrooge through five staves, from Marley’s warning to the three spirits and his change on Christmas morning. Its key quotations show greed, isolation, poverty and redemption, and Dickens wrote it to make comfortable readers feel responsible for the poor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Dickens and Stevenson', title: 'A Christmas Carol', subtitle: 'Charles Dickens, 1843' }],
      lines: [
        { say: 'A Christmas Carol is a ghost story, and an argument. Charles Dickens wrote it in eighteen forty-three to make comfortable readers look at the poor and feel responsible for them.', caption: 'A Christmas Carol is a ghost story, and an argument. Charles Dickens wrote it in 1843 to make comfortable readers look at the poor and feel responsible for them.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see the novella in its time.' },
      ],
    },
    {
      chapter: 'Five staves',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Stave 1: Marley’s ghost, in chains', 'Stave 2: the Ghost of Christmas Past', 'Stave 3: the Ghost of Christmas Present', 'Stave 4: the Ghost of Christmas Yet to Come', 'Stave 5: Christmas morning'],
        },
      ],
      lines: [
        { say: 'Dickens called his chapters staves, the verses of a song, because the book is a carol.', show: 'b' },
        { say: 'In Stave one, Scrooge turns away his nephew and two gentlemen collecting for the poor. Then Marley’s ghost appears in chains.', show: 'b.0' },
        { say: 'In Stave two, the first spirit shows him his lonely childhood, Fezziwig’s party, and Belle ending their engagement.', show: 'b.1' },
        { say: 'In Stave three, he watches the Cratchits’ small Christmas dinner, and meets two starving children called Ignorance and Want.', show: 'b.2' },
        { say: 'In Stave four, he sees a death that nobody mourns, and his own neglected grave.', show: 'b.3' },
        { say: 'And in Stave five, he wakes a changed man.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Greed and isolation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“a squeezing, wrenching, grasping, scraping, clutching, covetous, old sinner!”*' },
        { kind: 'text', id: 'q2', md: '*“secret, and self-contained, and solitary as an oyster.”*' },
      ],
      lines: [
        { say: 'The narrator introduces Scrooge with a list of grabbing verbs. They pile up to show that his whole life is spent getting and holding on to money.', show: 'q1' },
        { say: 'He is also solitary as an oyster: shut inside a hard shell, with no one allowed in.', show: 'q2' },
      ],
    },
    {
      chapter: 'Poverty and responsibility',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '*“they had better do it, and decrease the surplus population.”*' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'His own words, turned back', md: 'In Stave 3 the spirit repeats “surplus population” about **Tiny Tim**, and Scrooge “hung his head”.' },
      ],
      lines: [
        { say: 'Told that many poor people would rather die than go to the workhouse, Scrooge says they had better do it, and decrease the surplus population. He talks of people as numbers.', show: 'q' },
        { say: 'Later, the Ghost of Christmas Present uses the same words about Tiny Tim, and Scrooge hangs his head. Now the words mean the death of a child he cares about.', show: 'c' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The workhouse', md: 'Under the Poor Law of 1834, the destitute were sent to workhouses, where families were split up and life was made deliberately harsh.' }],
      lines: [
        { say: 'In the eighteen forties, many working people went hungry. Under the Poor Law, the destitute were sent to workhouses, where families were split up and life was made deliberately harsh.', caption: 'In the 1840s, many working people went hungry. Under the Poor Law, the destitute were sent to workhouses, where families were split up and life was made deliberately harsh.', show: 'c' },
        { say: 'When Scrooge asks, are there no prisons, he repeats what many comfortable people thought. Dickens wanted his readers to see the poor as people, and to act.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Scrooge is not simply a villain', md: 'The novella is about **change**. Stave 2 shows how a lonely boy became a cold man, so his redemption is believable.' }],
      lines: [{ say: 'A common mistake is to treat Scrooge as a simple villain. Stave two shows how a lonely boy became a cold man, so his change is believable, and the reader sees that anyone can change.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Marley’s ghost says: *“Mankind was my business.”* What does he mean?',
          choices: ['He was very successful in trade, and wants Scrooge to carry on the firm', 'His real duty was to other people, not to making money', 'His firm sold goods to the whole of mankind', 'People interfered in his business, and he warns Scrooge'],
          answer: 1,
          working: 'Scrooge has just praised him as “a good man of business”; Marley turns the word around.',
        },
      ],
      lines: [
        { say: 'Your turn. Marley’s ghost says, mankind was my business. What does he mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Scrooge has just praised Marley as a good man of business. Marley turns the word around: his real business, his duty, was other people.', show: 'q.answer' },
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
          items: ['Five staves: Marley, three spirits, Christmas morning.', 'Greed and isolation: grabbing verbs, the oyster.', 'Poverty: Scrooge’s own words turned back on him.', 'Context: hunger and the workhouses of the 1840s.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The story moves through five staves: Marley, three spirits, and Christmas morning.', show: 'sum.0' },
        { say: 'Scrooge’s greed and isolation are shown through grabbing verbs and cold, hard images.', show: 'sum.1' },
        { say: 'His words about the surplus population are turned back on him, to teach him responsibility for the poor.', show: 'sum.2' },
        { say: 'And Dickens wrote in a time of hunger and harsh workhouses, to make his readers act.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
