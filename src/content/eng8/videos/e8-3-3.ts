import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-3-3',
  lessonId: 'e8-3-3',
  title: 'Comedy and the Play Within the Play',
  summary:
    'A Shakespearean comedy moves from confusion to order and ends with marriage. The mechanicals’ “Pyramus and Thisbe” is a play within a play: a tragic version of the lovers’ story, acted so badly it becomes funny. When you use a famous line, say who speaks it, when, and what it shows.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Midsummer Night’s Dream', title: 'Comedy and the Play Within the Play', subtitle: 'From confusion to order' }],
      lines: [
        { say: 'In Shakespeare’s time, a comedy meant more than something funny. It had a shape, and a set of features you can learn to spot.', show: 'title' },
        { say: 'In this video we look at what makes A Midsummer Night’s Dream a comedy, how the mechanicals’ play mirrors the main story, and what its famous lines reveal.' },
      ],
    },
    {
      chapter: 'What a comedy is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Shakespearean comedy', md: 'A **Shakespearean comedy** moves from **confusion to order** and usually ends with one or more **marriages**. A **tragedy** moves the other way, towards death.' },
        {
          kind: 'table',
          id: 't',
          head: ['Feature', 'In the play'],
          rows: [
            ['**Love and obstacles**', 'Hermia’s father and the law'],
            ['**Mistaken identity**', 'Puck charms the wrong Athenian'],
            ['**A “green world”**', 'the magical wood outside Athens'],
            ['**Order restored**', 'potions undone; Theseus overrules Egeus'],
            ['**A happy ending**', 'three couples marry'],
          ],
        },
      ],
      lines: [
        { say: 'A Shakespearean comedy moves from confusion to order, and usually ends with one or more marriages. A tragedy moves the other way, towards death.', show: 'def' },
        { say: 'Comedies share some features. There is love with obstacles: here, Hermia’s father and the law of Athens. And there is mistaken identity and confusion, when Puck charms the wrong Athenian.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'There is often an escape to a green world, a place where the city’s rules do not apply. Here, it is the magical wood.', focus: 't.2' },
        { say: 'Then order is restored: the potions are undone and Theseus overrules Egeus. And it all ends happily, with three couples marrying.', focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'The play within the play',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Play within a play', md: 'A **play within a play** is a play that characters perform inside the main play. Here, the mechanicals perform “Pyramus and Thisbe” at the Duke’s wedding.' },
        { kind: 'text', id: 'e', size: 'md', md: 'Two young lovers, kept apart by their parents, plan to meet at night. A lion frightens Thisbe away; Pyramus finds her cloak, thinks she is dead and kills himself, and so does she.' },
      ],
      lines: [
        { say: 'A play within a play is a play that characters perform inside the main play. Here, the mechanicals perform Pyramus and Thisbe at the Duke’s wedding.', show: 'def' },
        { say: 'Pyramus and Thisbe is meant to be a tragedy. Two young lovers, kept apart by their parents, plan to meet at night. A lion frightens Thisbe away, Pyramus finds her cloak and thinks she is dead, and both lovers die.', show: 'e' },
        { say: 'But the mechanicals act it so badly that it becomes absurd. One man plays the wall and holds up his fingers for the crack, and the lion explains to the ladies that he is not a real lion.', focus: 'e' },
      ],
    },
    {
      chapter: 'How it mirrors the main plot',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['“Pyramus and Thisbe”', 'Hermia and Lysander'],
          rows: [
            ['kept apart by their parents', 'kept apart by her father'],
            ['run away at night', 'run away at night'],
            ['end in death: a tragedy', 'end in marriage: a comedy'],
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Why it matters', md: 'The mechanicals’ play shows the **tragic version** of the lovers’ story, and laughing at it reminds us how close the main plot came to the same fate.' },
      ],
      lines: [
        { say: 'Now compare the two stories. In Pyramus and Thisbe, the lovers are kept apart by their parents. So are Hermia and Lysander.', show: 't', focus: 't.0' },
        { say: 'Both pairs of lovers run away at night.', focus: 't.1' },
        { say: 'But one story ends in death, and the other ends in marriage.', focus: 't.2' },
        { say: 'This means the mechanicals’ play shows the tragic version of the lovers’ story. Laughing at it reminds us how close the main plot came to the same fate.', show: 'k' },
      ],
    },
    {
      chapter: 'Puck’s epilogue',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['If we shadows have offended,', 'Think but this, and all is mended,', 'That you have but slumber’d here', 'While these visions did appear.'], by: 'Puck, Act 5, Scene 1' },
      ],
      lines: [
        { say: 'At the very end, Puck steps forward to speak the epilogue, a speech to the audience.', show: 'q' },
        { say: 'The shadows are the actors. If you did not like the play, Puck says, just think of it as a dream you had while you slept. So the play ends by blurring the line between the dream on stage and the audience’s own night.', focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'Quote, then explain',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Quote, then explain', md: 'Dropping a famous line into an answer is not enough. Say **who** speaks it, **when**, and what it **shows**.' },
        { kind: 'text', id: 'e', size: 'md', md: '“The course of true love never did run smooth.” Lysander says this in Act 1, as Hermia’s father blocks their love, so it sets up the play’s first big idea: **love always meets obstacles**.' },
      ],
      lines: [
        { say: 'A common mistake is to drop a famous line into an answer and move on. Always say who speaks it, when, and what it shows.', show: 'm' },
        { say: 'For example: the course of true love never did run smooth. Lysander says this in Act one, just as Hermia’s father blocks their love. So it sets up the play’s first big idea: love always meets obstacles.', show: 'e' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Helena says of Hermia: “And though she be but little, she is fierce.” What does the line reveal?',
          choices: [
            'Hermia is younger than Helena.',
            'Helena is afraid of the fairies.',
            'Hermia is gentle and shy.',
            'Hermia is small but has a fiery temper.',
          ],
          answer: 3,
          working: 'Helena says this in Act 3 when Hermia, furious that both men now love Helena, turns on her. Though Hermia is small, she is fierce.',
        },
      ],
      lines: [
        { say: 'Your turn. In Act three, Helena says of Hermia: and though she be but little, she is fierce. What does the line reveal? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Hermia is furious that both men now love Helena, and she turns on her old friend. Though Hermia is small, she has a fiery temper.', show: 'q2.answer' },
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
            'A **comedy** moves from confusion to order and ends with marriage.',
            'Its features: love and obstacles, mistaken identity, a green world, a happy ending.',
            '“Pyramus and Thisbe” is a **play within a play**: the tragic version, made funny.',
            'Quote, then say who speaks, when, and what it shows.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A Shakespearean comedy moves from confusion to order, and ends with marriage.', show: 'sum.0' },
        { say: 'Its features include love and obstacles, mistaken identity, an escape to a green world, and a happy ending.', show: 'sum.1' },
        { say: 'Pyramus and Thisbe is a play within a play: the tragic version of the lovers’ story, acted so badly it becomes funny.', show: 'sum.2' },
        { say: 'And when you quote a line, say who speaks it, when, and what it shows.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
