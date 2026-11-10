import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-3-1',
  lessonId: 'e8-3-1',
  title: 'Plot and Characters',
  summary:
    'A Midsummer Night’s Dream is a Shakespearean comedy in which four groups, the court, the lovers, the fairies and the mechanicals, collide in a magical wood over one night. Puck’s mix-up with a love potion tangles the lovers, and order is restored at dawn with a triple wedding.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Midsummer Night’s Dream', title: 'Plot and Characters', subtitle: 'Four groups, one confusing night' }],
      lines: [
        { say: 'One night, in a magical wood outside Athens, four young lovers, a fairy king and queen, and a group of workmen all get tangled up together.', show: 'title' },
        { say: 'In this video we meet the characters of A Midsummer Night’s Dream, and follow the plot act by act.' },
      ],
    },
    {
      chapter: 'What the play is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'A comedy', md: '*A Midsummer Night’s Dream* is a **comedy** by William Shakespeare, first performed in the mid-1590s. In a Shakespearean comedy, things go wrong in funny ways, but the play **ends happily**, usually with weddings.' },
      ],
      lines: [
        { say: 'A Midsummer Night’s Dream is a comedy by William Shakespeare, first performed in the mid fifteen nineties.', show: 'def' },
        { say: 'In a Shakespearean comedy, things go wrong in funny ways, but the play ends happily, usually with weddings. So as you read, watch how the confusion builds, and how it is finally untangled.', focus: 'def' },
      ],
    },
    {
      chapter: 'Four groups',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Group', 'Who', 'Their story'],
          rows: [
            ['**The court**', 'Theseus and Hippolyta', 'preparing for their wedding'],
            ['**The lovers**', 'Hermia, Lysander, Helena, Demetrius', 'a tangle of love in the woods'],
            ['**The fairies**', 'Oberon, Titania and Puck', 'a quarrel and a love potion'],
            ['**The mechanicals**', 'Bottom, Quince and friends', 'rehearsing a play for the wedding'],
          ],
        },
      ],
      lines: [
        { say: 'The play has four groups of characters. First, the court: Theseus, Duke of Athens, and Hippolyta, Queen of the Amazons, who are preparing for their wedding.', show: 't', focus: 't.0' },
        { say: 'Second, the lovers: four young Athenians called Hermia, Lysander, Helena and Demetrius, whose love goes badly wrong in the woods.', focus: 't.1' },
        { say: 'Third, the fairies: Oberon and Titania, the fairy king and queen, and Puck, Oberon’s mischievous servant.', focus: 't.2' },
        { say: 'And fourth, the mechanicals: Bottom, Quince and other workmen of Athens, who are rehearsing a play to perform at the Duke’s wedding.', focus: 't.3' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Act 1.** Hermia must marry Demetrius, but loves Lysander, so they plan to run away.',
            '**Act 2.** In the woods, Puck puts love juice on the wrong Athenian: Lysander.',
            '**Act 3.** Bottom gets an ass’s head; Titania falls for him; both men now love Helena.',
            '**Act 4.** At dawn the spells are undone, and Theseus lets both couples marry.',
            '**Act 5.** A triple wedding, and the mechanicals perform their play.',
          ],
        },
      ],
      lines: [
        { say: 'Act one. Hermia’s father wants her to marry Demetrius, but she loves Lysander, so the two plan to run away through the woods. Helena, who loves Demetrius, tells him, hoping to win him back.', show: 'b.0' },
        { say: 'Act two. In the woods, Oberon sends Puck for a flower whose juice makes a sleeper fall in love with the first creature they see. He tells Puck to charm the Athenian, meaning Demetrius, but Puck charms Lysander instead.', show: 'b.1' },
        { say: 'Act three. Puck gives Bottom the head of a donkey, and Titania, under the potion, falls in love with him. Now both young men love Helena, and Hermia is furious.', show: 'b.2' },
        { say: 'Act four. At dawn the spells are undone. Lysander loves Hermia again, Demetrius stays in love with Helena, and Theseus lets both couples marry.', show: 'b.3' },
        { say: 'Act five. At the triple wedding, the mechanicals perform their play, very badly, and the fairies bless the house.', show: 'b.4' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Two “Athenians”', md: 'Oberon tells Puck to charm the man in **Athenian clothes**. There are **two** Athenian men in the wood, so Puck charms the wrong one. Much of the comedy grows from this one mistake.' },
      ],
      lines: [
        { say: 'Students often wonder why Puck gets it wrong. Oberon only tells him to charm the man in Athenian clothes.', show: 'm' },
        { say: 'But there are two Athenian men in the wood, so Puck charms the wrong one. Much of the comedy grows from this one simple mistake.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Helena knows Demetrius loves Hermia. Why does she tell him that Hermia is running away?',
          choices: [
            'She wants Hermia to be caught and punished.',
            'She hopes to win his thanks and his love.',
            'Theseus orders her to tell him.',
            'Puck’s potion makes her do it.',
          ],
          answer: 1,
          working: 'Telling him seems to work against her, but she hopes he will be grateful, and that being near him in the wood will win him back.',
        },
      ],
      lines: [
        { say: 'Your turn. Helena knows Demetrius loves Hermia. So why does she tell him that Hermia is running away? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Telling him seems to work against her, but she hopes he will be grateful, and that being near him in the wood will win him back. Her desperate choice sets the whole chase in motion.', show: 'q2.answer' },
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
            'A **comedy**: things go wrong in funny ways, but it ends happily.',
            'Four groups: the **court**, the **lovers**, the **fairies** and the **mechanicals**.',
            'Puck’s potion mix-up makes both men love Helena; Titania loves Bottom.',
            'Order returns at dawn, ending in a triple wedding and the mechanicals’ play.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A Midsummer Night’s Dream is a comedy: things go wrong in funny ways, but it ends happily.', show: 'sum.0' },
        { say: 'It has four groups: the court, the lovers, the fairies and the mechanicals.', show: 'sum.1' },
        { say: 'Puck’s mix-up with the love potion makes both men love Helena, and Titania falls for Bottom.', show: 'sum.2' },
        { say: 'Order returns at dawn, and the play ends with a triple wedding and the mechanicals’ play.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
