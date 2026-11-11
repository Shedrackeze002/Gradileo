import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-7-1',
  lessonId: 'ex-7-1',
  title: 'Much Ado About Nothing',
  thumbnail: false,
  summary:
    'Shakespeare’s comedy follows two love stories driven by overhearing: Claudio and Hero, tricked apart by Don John, and Beatrice and Benedick, tricked together by their friends. Its key lines show love, deception, honour and the limits placed on women, through quick prose wit and formal verse.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Shakespeare: Comedy, Justice and Tragedy', title: 'Much Ado About Nothing', subtitle: 'William Shakespeare, about 1598' }],
      lines: [
        { say: 'Soldiers return from war to Messina. Two of them fall in love, one at first sight, and one after insisting he never will. Shakespeare’s comedy was first performed in about fifteen ninety-eight.', caption: 'Soldiers return from war to Messina. Two of them fall in love, one at first sight, and one after insisting he never will. Shakespeare’s comedy was first performed in about 1598.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, read its key lines, and see the play in its time.' },
      ],
    },
    {
      chapter: 'Two love stories',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c1', tone: 'key', title: 'Claudio and Hero', md: 'They fall in love at once, and are **tricked apart** by the villain Don John.' },
        { kind: 'callout', id: 'c2', tone: 'key', title: 'Beatrice and Benedick', md: 'They swear they will never marry, and are **tricked together** by their friends.' },
      ],
      lines: [
        { say: 'Claudio falls in love with Hero at first sight. But Don John tricks him into believing she is unfaithful, and Claudio shames her at the altar.', show: 'c1' },
        { say: 'Beatrice and Benedick fight a merry war of insults. Their friends let each overhear that the other is in love, and the trick works.', show: 'c2' },
      ],
    },
    {
      chapter: 'Wit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“I had rather hear my dog bark at a crow than a man swear he loves me.”*' },
        { kind: 'text', id: 'q2', md: '*“What! my dear Lady Disdain, are you yet living?”*' },
      ],
      lines: [
        { say: 'Beatrice mocks romantic vows as empty noise. She presents herself as too clever to be fooled by love.', show: 'q1' },
        { say: 'Benedick turns her scorn into a mocking title: Lady Disdain. Their quick prose shows the merry war of wit between them.', show: 'q2' },
      ],
    },
    {
      chapter: 'Honour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '*“Give not this rotten orange to your friend;*\n*She’s but the sign and semblance of her honour.”*' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Her father', md: '*“Do not live, Hero; do not ope thine eyes;”*' },
      ],
      lines: [
        { say: 'At the altar, Claudio calls Hero a rotten orange: perfect outside, rotten inside. He shames her in public, on the strength of a trick.', show: 'q' },
        { say: 'Her own father wishes her dead. The family’s honour matters more to him than his daughter.', show: 'c' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A woman’s honour', md: 'In Shakespeare’s time, a woman’s reputation for chastity was seen as her **family’s** honour, so a false accusation could destroy her.' }],
      lines: [
        { say: 'In Shakespeare’s time, a woman’s reputation was seen as her family’s honour, so a false accusation could destroy her.', show: 'c' },
        { say: 'Beatrice is furious that she cannot fight for her cousin herself. O God, that I were a man, she cries, and she asks Benedick to kill Claudio.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'It is not all light comedy', md: 'Hero is publicly shamed and her father wishes her dead. The **darkness** makes the happy ending feel earned.' }],
      lines: [{ say: 'A common mistake is to treat the play as light all the way through. Hero is publicly shamed, and her father wishes her dead. That darkness makes the happy ending feel earned.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Benedick has just overheard that Beatrice loves him. He says: *“No; the world must be peopled.”* What is the effect?',
          choices: ['He gives a serious speech about the falling population', 'He still refuses to marry, and mocks Claudio', 'He comically argues his way out of his old vow', 'He mourns a friend who died a bachelor'],
          answer: 2,
          working: 'He swore he would die a bachelor; now he finds a grand reason to change his mind.',
        },
      ],
      lines: [
        { say: 'Your turn. Benedick has just overheard that Beatrice loves him. He says, no, the world must be peopled. What is the effect? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. He swore he would die a bachelor. Now he finds a grand excuse to change his mind, and the joke is on him.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two love stories, both driven by overhearing.', 'Wit: the merry war of Beatrice and Benedick.', 'Honour: Hero shamed on a false accusation.', 'A comedy with a dark middle.'] }],
      lines: [
        { say: 'Let’s sum up. Two love stories are both driven by overhearing: one couple tricked apart, the other tricked together.', show: 'sum.0' },
        { say: 'Beatrice and Benedick fight a merry war of wit.', show: 'sum.1' },
        { say: 'Hero is shamed on a false accusation, because a woman’s honour was her family’s.', show: 'sum.2' },
        { say: 'And the comedy ends in marriage, after a dark middle.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
