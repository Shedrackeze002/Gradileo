import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-7-2',
  lessonId: 'ex-7-2',
  title: 'The Merchant of Venice',
  thumbnail: false,
  summary:
    'Shakespeare’s play joins the bond of a pound of flesh in Venice to the casket test in Belmont. Its key speeches show the Christians’ prejudice and Shylock’s answer, mercy against strict justice, and appearance against reality, and modern audiences read Shylock in the light of the play’s antisemitism.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Shakespeare: Comedy, Justice and Tragedy', title: 'The Merchant of Venice', subtitle: 'William Shakespeare, about 1597' }],
      lines: [
        { say: 'A merchant borrows money from a man he has publicly insulted, and agrees that if he cannot repay, he will give a pound of his own flesh. Shakespeare’s play was first performed in about fifteen ninety-seven.', caption: 'A merchant borrows money from a man he has publicly insulted, and agrees that if he cannot repay, he will give a pound of his own flesh. Shakespeare’s play was first performed in about 1597.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, read its key speeches, and see the play in its time and ours.' },
      ],
    },
    {
      chapter: 'Two plots',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c1', tone: 'key', title: 'Venice: the bond', md: 'Antonio borrows from **Shylock**, on the bond of a pound of flesh, so that Bassanio can woo Portia.' },
        { kind: 'callout', id: 'c2', tone: 'key', title: 'Belmont: the caskets', md: '**Portia** must marry whoever chooses the right one of three caskets: gold, silver or lead.' },
      ],
      lines: [
        { say: 'In Venice, Antonio borrows three thousand ducats from Shylock, a Jewish moneylender, so that his friend Bassanio can woo Portia. When Antonio’s ships are lost, Shylock demands his bond.', show: 'c1' },
        { say: 'In Belmont, Portia must marry whoever chooses the right casket. Bassanio chooses plain lead, and wins her. Then Portia, disguised as a lawyer, comes to court to save Antonio.', show: 'c2' },
      ],
    },
    {
      chapter: 'Prejudice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“You call me misbeliever, cut-throat dog,*\n*And spet upon my Jewish gaberdine,”*' },
        { kind: 'text', id: 'q2', md: '*“If you prick us, do we not bleed? … And if you wrong us, shall we not revenge?”*' },
      ],
      lines: [
        { say: 'Shylock reminds Antonio of how he has abused him in public: calling him a dog, and spitting on his coat.', show: 'q1' },
        { say: 'Later, Shylock asks whether a Jew does not bleed like anyone else. He claims the same humanity as the Christians, then argues that revenge is what they have taught him.', show: 'q2' },
      ],
    },
    {
      chapter: 'Mercy and justice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '*“The quality of mercy is not strain’d,*\n*It droppeth as the gentle rain from heaven”*' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The twist', md: '*“This bond doth give thee here no jot of blood.”*' },
      ],
      lines: [
        { say: 'In court, Portia pleads that mercy must be given freely, like rain from heaven, and is higher than strict justice.', show: 'q' },
        { say: 'When Shylock refuses, she beats him with the exact words of his own bond. It gives him flesh, but no blood. The strict law he demanded is turned against him.', show: 'c' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Antisemitism', md: 'Jewish people had been expelled from England in 1290, and **prejudiced stereotypes** were common in Shakespeare’s time.' }],
      lines: [
        { say: 'Jewish people had been expelled from England in twelve ninety, so few in Shakespeare’s audience had met a Jewish person, and prejudiced stereotypes were common.', caption: 'Jewish people had been expelled from England in 1290, so few in Shakespeare’s audience had met a Jewish person, and prejudiced stereotypes were common.', show: 'c' },
        { say: 'Christians thought lending at interest was a sin, and Jews were barred from many trades. Since the Holocaust, productions have focused on the abuse Shylock suffers.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Shylock is not simply the villain', md: 'He is **wronged** as well as wronging, and the Christians who preach mercy show him little.' }],
      lines: [{ say: 'A common mistake is to see Shylock as simply the villain. He is wronged as well as wronging. Shakespeare gives him the play’s most powerful speech, and the Christians who preach mercy show him little.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The Prince of Morocco chooses the gold casket and reads: *“All that glisters is not gold”*. What does the scroll warn?',
          choices: ['That Portia is poorer than he thinks', 'That outward show can hide something worthless', 'That the casket is really made of brass', 'That he has chosen wisely'],
          answer: 1,
          working: 'Morocco judged by appearance; the gold casket holds a skull, not Portia’s picture.',
        },
      ],
      lines: [
        { say: 'Your turn. The Prince of Morocco chooses the gold casket, and reads, all that glisters is not gold. What does the scroll warn? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Morocco judged by appearance, and the gold casket holds a skull. Outward show can hide something worthless.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two plots: the bond and the caskets.', 'Prejudice, and Shylock’s answer to it.', 'Mercy against strict justice.', 'Context: antisemitism then, and how we see it now.'] }],
      lines: [
        { say: 'Let’s sum up. The play joins the bond in Venice to the caskets in Belmont.', show: 'sum.0' },
        { say: 'The Christians’ prejudice is open, and Shylock answers it with his claim to the same humanity.', show: 'sum.1' },
        { say: 'Portia’s plea for mercy meets Shylock’s demand for strict justice.', show: 'sum.2' },
        { say: 'And the play reflects the antisemitism of its time, which modern productions confront.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
