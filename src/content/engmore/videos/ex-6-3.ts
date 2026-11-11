import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-6-3',
  lessonId: 'ex-6-3',
  title: 'Pride and Prejudice',
  thumbnail: false,
  summary:
    'Jane Austen’s novel of 1813 follows Elizabeth Bennet and Mr Darcy from a bad first impression to a marriage of two people who have both changed. Its key quotations show pride, prejudice, marriage and money, and class, through Austen’s irony and a world where daughters needed to marry well.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Shelley, Brontë, Austen and Conan Doyle', title: 'Pride and Prejudice', subtitle: 'Jane Austen, 1813' }],
      lines: [
        { say: 'Five sisters must marry well, because their father’s house will pass to a cousin. The second sister, Elizabeth, takes an instant dislike to the proud Mister Darcy. Jane Austen published the novel in eighteen thirteen.', caption: 'Five sisters must marry well, because their father’s house will pass to a cousin. The second sister, Elizabeth, takes an instant dislike to the proud Mr Darcy. Jane Austen published the novel in 1813.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see the novel in its time.' },
      ],
    },
    {
      chapter: 'The story',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Meryton: a bad first impression', 'Hunsford: a proposal refused', 'Pemberley: a changed Darcy', 'Longbourn: a second proposal'] }],
      lines: [
        { say: 'At a ball in Meryton, Darcy refuses to dance with Elizabeth, and she believes the charming Wickham’s lies about him.', show: 'b.0' },
        { say: 'At Hunsford, Darcy proposes, and she angrily refuses. His letter tells her the truth.', show: 'b.1' },
        { say: 'At Pemberley, his estate, she finds him changed. When her sister Lydia runs off with Wickham, Darcy secretly saves the family’s name.', show: 'b.2' },
        { say: 'Back at Longbourn, he proposes again, and she accepts.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Irony',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', md: '*“It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.”*' }],
      lines: [
        { say: 'The first sentence is famous for its irony. It claims that a rich single man must want a wife.', show: 'q' },
        { say: 'But really it is the families with daughters and little money who want the rich man. Austen’s narrator often says one thing and means another.' },
      ],
    },
    {
      chapter: 'Pride and prejudice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“She is tolerable: but not handsome enough to tempt me”*' },
        { kind: 'text', id: 'q2', md: '*“Till this moment, I never knew myself.”*' },
      ],
      lines: [
        { say: 'Darcy’s cold judgement at the ball, spoken where she can hear, shows his pride and wounds hers. This is where her prejudice begins.', show: 'q1' },
        { say: 'After reading his letter, Elizabeth sees how her own pride and prejudice blinded her: till this moment, I never knew myself.', show: 'q2' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The entail', md: 'The Bennets’ house can only pass to a **male** heir, so when Mr Bennet dies, his wife and daughters could be left with almost nothing.' }],
      lines: [
        { say: 'The Bennets’ house is entailed: it can only pass to a male heir, their cousin Mister Collins. Daughters of the gentry could not easily earn a living, so a good marriage was their security.', caption: 'The Bennets’ house is entailed: it can only pass to a male heir, their cousin Mr Collins. Daughters of the gentry could not easily earn a living, so a good marriage was their security.', show: 'c' },
        { say: 'That is why Charlotte Lucas accepts Mister Collins: she asks only a comfortable home.', caption: 'That is why Charlotte Lucas accepts Mr Collins: she asks only a comfortable home.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Pride is not only Darcy’s fault', md: 'Both are proud and both are prejudiced. Elizabeth prides herself on judging people, and **she** must change too.' }],
      lines: [{ say: 'A common mistake is to think Darcy is the only proud one. Elizabeth prides herself on judging people, and her prejudice is as strong as his pride. Both must change.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lady Catherine says Elizabeth is not Darcy’s equal. Elizabeth replies: *“He is a gentleman; I am a gentleman’s daughter; so far we are equal.”* What does this show?',
          choices: ['She agrees that she is below Darcy in rank', 'She boasts that her father is richer than Darcy', 'She and Darcy are cousins', 'She refuses to accept that rank makes her unworthy'],
          answer: 3,
          working: 'She answers Lady Catherine’s snobbery calmly, and claims equality with Darcy.',
        },
      ],
      lines: [
        { say: 'Your turn. Lady Catherine says Elizabeth is not Darcy’s equal. Elizabeth replies: he is a gentleman, I am a gentleman’s daughter, so far we are equal. What does this show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Elizabeth refuses to accept that rank makes her unworthy, and stands up to Lady Catherine as Darcy’s equal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From first impressions to a second proposal.', 'Irony: the narrator says one thing, means another.', 'Both are proud; both must change.', 'Context: the entail, and marriage as security.'] }],
      lines: [
        { say: 'Let’s sum up. The story moves from a bad first impression to a second proposal.', show: 'sum.0' },
        { say: 'Austen’s narrator is ironic: watch for the gap between what is said and what is meant.', show: 'sum.1' },
        { say: 'Darcy and Elizabeth are both proud and both prejudiced, and both must change.', show: 'sum.2' },
        { say: 'And the entail shows why marriage meant security for women like the Bennet sisters.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
