import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-6-2',
  lessonId: 'ex-6-2',
  title: 'Jane Eyre',
  thumbnail: false,
  summary:
    'Charlotte Brontë’s novel of 1847 is told by Jane herself, through five homes from a cruel childhood to a marriage of equals. Its key quotations show her independence and her claim to equality, and the novel is shaped by the position of governesses and women in Victorian England.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Shelley, Brontë, Austen and Conan Doyle', title: 'Jane Eyre', subtitle: 'Charlotte Brontë, 1847' }],
      lines: [
        { say: 'An orphan tells her own life story: a cruel childhood, a harsh school, love for her employer, and the secret that drives her away. Charlotte Bronty published Jane Eyre in eighteen forty-seven.', caption: 'An orphan tells her own life story: a cruel childhood, a harsh school, love for her employer, and the secret that drives her away. Charlotte Brontë published Jane Eyre in 1847.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see the novel in its time.' },
      ],
    },
    {
      chapter: 'Five homes',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Gateshead: the red-room', 'Lowood: Helen Burns', 'Thornfield: Mr Rochester', 'Moor House: St John Rivers', 'Ferndean: marriage'] }],
      lines: [
        { say: 'At Gateshead, Jane is bullied by her cousin and locked in the red-room.', show: 'b.0' },
        { say: 'At Lowood School, her friend Helen Burns teaches her patience, and dies.', show: 'b.1' },
        { say: 'At Thornfield, as governess, she falls in love with Mister Rochester, but their wedding is stopped: he is already married.', caption: 'At Thornfield, as governess, she falls in love with Mr Rochester, but their wedding is stopped: he is already married.', show: 'b.2' },
        { say: 'At Moor House, her cousin St John asks her to marry him and become a missionary.', show: 'b.3' },
        { say: 'And at Ferndean, she returns to Rochester, now blinded, and marries him.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Equality',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', md: '*“Do you think, because I am poor, obscure, plain, and little, I am soulless and heartless?”*' }],
      lines: [
        { say: 'Believing that Rochester will marry someone else, Jane demands to know if he thinks that because she is poor, obscure, plain and little, she has no soul or heart.', show: 'q' },
        { say: 'She insists that her worth does not depend on money, rank or beauty. She claims to be his equal.' },
      ],
    },
    {
      chapter: 'Independence',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“I care for myself. The more solitary, the more friendless, the more unsustained I am, the more I will respect myself.”*' },
        { kind: 'text', id: 'q2', md: '*“Reader, I married him.”*' },
      ],
      lines: [
        { say: 'When she learns the truth, Jane leaves Thornfield, though no one would know if she stayed. She chooses her self-respect over love and comfort.', show: 'q1' },
        { say: 'And the last chapter begins: Reader, I married him. Jane is the one who acts.', show: 'q2' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The governess', md: 'Educated like a lady but paid like a servant, so she belonged neither **upstairs** nor **below**.' }],
      lines: [
        { say: 'A governess was educated like a lady but paid like a servant, so she belonged neither upstairs nor below.', show: 'c' },
        { say: 'Women had few rights in marriage and few ways to earn a living. Brontë even published under a name that could be a man’s, Currer Bell, so that her book would be taken seriously.', caption: 'Women had few rights in marriage and few ways to earn a living. Brontë even published under a name that could be a man’s, Currer Bell, so that her book would be taken seriously.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Jane does not simply give in to love', md: 'She leaves Rochester to keep her self-respect, refuses St John’s loveless offer, and marries only as an **equal**.' }],
      lines: [{ say: 'A common mistake is to read the novel as a simple romance. Jane leaves Rochester to keep her self-respect, refuses a marriage without love, and marries only as an equal.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Rochester tells Jane to be still, like a frantic bird. She replies: *“I am no bird; and no net ensnares me”*. What does this show?',
          choices: ['She thinks birds are ugly and foolish', 'She refuses to be trapped or owned by anyone', 'She wants to travel abroad', 'She has escaped from Lowood School'],
          answer: 1,
          working: 'A bird in a net is trapped; Jane rejects the image and names her own free will.',
        },
      ],
      lines: [
        { say: 'Your turn. Rochester tells Jane to be still, like a frantic bird. She replies, I am no bird, and no net ensnares me. What does this show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. A bird in a net is trapped and owned. Jane rejects the image: she is a free human being with an independent will.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Five homes, five stages of Jane’s growth.', 'Equality: poor and plain, but not soulless.', 'Independence: she leaves, and then she chooses.', 'Context: governesses and women’s lives.'] }],
      lines: [
        { say: 'Let’s sum up. Jane grows through five homes, from Gateshead to Ferndean.', show: 'sum.0' },
        { say: 'She claims equality: poor and plain, but not soulless and heartless.', show: 'sum.1' },
        { say: 'She keeps her independence, leaving when she must, and choosing when she can.', show: 'sum.2' },
        { say: 'And the novel is shaped by the narrow lives of governesses and women in Victorian England.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
