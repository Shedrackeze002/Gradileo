import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-3-2',
  lessonId: 'e9-3-2',
  title: 'Power, Freedom and Forgiveness',
  summary:
    'The Tempest’s themes are power and the right to rule, freedom, colonialism and forgiveness. Prospero decides that “the rarer action is / In virtue than in vengeance” and gives up his magic, which many read as Shakespeare’s farewell to the stage. Explain every key line in context: who speaks, when and to whom.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Tempest', title: 'Power, Freedom and Forgiveness', subtitle: 'The big questions of the play' }],
      lines: [
        { say: 'The Tempest asks big questions. Who has the right to rule? What does it mean to be free? Is revenge or mercy the stronger choice?', show: 'title' },
        { say: 'In this video we explore the play’s main themes, and explain what its most famous lines reveal.' },
      ],
    },
    {
      chapter: 'Themes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme', md: 'A **theme** is a big idea a play explores, such as power or freedom. A play does not state its themes; we find them in what characters **want**, **do** and **say**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Theme', 'In the play'],
          rows: [
            ['**Power**', 'Antonio stole a dukedom; two plots to kill rulers; Prospero rules by magic'],
            ['**Freedom**', 'Ariel longs to be free; Caliban resents being enslaved'],
            ['**Colonialism**', 'a newcomer takes an island and rules its native, Caliban'],
          ],
        },
      ],
      lines: [
        { say: 'A theme is a big idea a play explores, such as power or freedom. A play does not state its themes. We find them in what the characters want, do and say.', show: 'def' },
        { say: 'Power: almost every character struggles over it. Antonio stole Prospero’s dukedom, two plots try to kill rulers, and Prospero rules the island absolutely through magic.', show: 't', focus: 't.0' },
        { say: 'Freedom: Ariel longs to be free, and Caliban is enslaved and resents it. Even Prospero, in the epilogue, asks the audience to set him free.', focus: 't.1' },
        { say: 'Colonialism: many modern readers link the play to the age of European exploration. A newcomer takes an island and rules its native, which raises questions about who owns land, and who has the right to rule.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Forgiveness',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['The rarer action is', 'In virtue than in vengeance.'], by: 'Prospero, Act 5, Scene 1' },
        { kind: 'text', id: 'e', size: 'md', md: 'Mercy is a **rarer and nobler** act than revenge.' },
      ],
      lines: [
        { say: 'The fourth theme is forgiveness. With all his enemies at his mercy, Prospero decides: the rarer action is in virtue than in vengeance.', show: 'q' },
        { say: 'He means that mercy is a rarer and nobler act than revenge. So he forgives his enemies instead of punishing them.', show: 'e' },
        { say: 'Then he breaks his staff and drowns his book, giving up his magic. This suggests he accepts the limits of power. And because this is one of Shakespeare’s last plays, many readers see it as Shakespeare’s own farewell to the stage.' },
      ],
    },
    {
      chapter: 'Key lines',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Line', 'What it reveals'],
          rows: [
            ['“You taught me language, and my profit on’t / Is, I know how to curse.” (Caliban)', 'his bitterness towards his masters'],
            ['“We are such stuff / As dreams are made on, and our little life / Is rounded with a sleep.” (Prospero)', 'life is brief and unreal, like a dream'],
            ['“This thing of darkness I / Acknowledge mine.” (Prospero, of Caliban)', 'he accepts some responsibility'],
          ],
        },
      ],
      lines: [
        { say: 'Caliban says: you taught me language, and my profit on’t is, I know how to curse. The only use he has found for his masters’ language is to curse them.', show: 't', focus: 't.0' },
        { say: 'Prospero says: we are such stuff as dreams are made on, and our little life is rounded with a sleep. Life is brief and unreal, like a dream that ends in sleep.', focus: 't.1' },
        { say: 'And of Caliban, Prospero says: this thing of darkness I acknowledge mine. He accepts some responsibility for Caliban, and perhaps for his own darker side.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Who, when, to whom',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Who, when, to whom', md: 'A quotation means more in **context**. Before you explain a line, ask who is speaking, at what moment, and to whom. Caliban’s curse is spoken to the very people who **taught him language**.' },
      ],
      lines: [
        { say: 'A common mistake is to explain a line without its context.', show: 'm' },
        { say: 'Before you explain a line, ask who is speaking, at what moment, and to whom. Caliban’s curse, for example, is spoken to the very people who taught him language.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Miranda sees the lords, including Antonio and Sebastian, and cries: “O brave new world, / That has such people in’t!” Prospero replies: “’Tis new to thee.” What does his reply suggest?',
          choices: [
            'He agrees that the lords are all good.',
            'He knows these men are not as good as she thinks.',
            'He is angry that she has met Ferdinand.',
            'He does not hear what she says.',
          ],
          answer: 1,
          working: 'Brave means fine or splendid. Among the people she admires are men who plotted murder, so Prospero’s dry reply sets her innocence beside his experience.',
        },
      ],
      lines: [
        { say: 'Your turn. Miranda sees the lords, including Antonio and Sebastian, and cries: O brave new world, that has such people in’t. Prospero replies: ’tis new to thee. What does his reply suggest? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Here brave means fine or splendid. But among the people she admires are men who plotted murder. So Prospero’s dry reply reminds us that the new world is full of old wickedness, setting innocence beside experience.', show: 'q2.answer' },
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
            'Themes: **power**, **freedom**, **colonialism** and **forgiveness**.',
            '“The rarer action is / In virtue than in vengeance”: Prospero chooses mercy.',
            'Giving up his magic suggests accepting the limits of power.',
            'Explain every key line in context: who, when and to whom.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The play’s themes include power and the right to rule, freedom, colonialism and forgiveness.', show: 'sum.0' },
        { say: 'Prospero decides that the rarer action is in virtue than in vengeance, so he chooses mercy.', show: 'sum.1' },
        { say: 'Giving up his magic suggests he accepts the limits of power, and is often read as Shakespeare’s farewell.', show: 'sum.2' },
        { say: 'And explain every key line in context: who speaks, when, and to whom.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
