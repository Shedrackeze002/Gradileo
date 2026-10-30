import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-3-3',
  lessonId: 'e10-3-3',
  title: 'Soliloquy and Dramatic Irony',
  thumbnail: false,
  summary:
    'A play has no narrator, so playwrights use devices such as the soliloquy, the aside, foreshadowing and dramatic irony to show what characters think and what is to come.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare', title: 'Soliloquy and Dramatic Irony', subtitle: 'What the audience knows' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['My dismal scene I needs must act alone.', 'Come, vial.', 'What if this mixture do not work at all?'] },
      ],
      lines: [
        { say: 'Juliet is alone in her room at night, holding a vial that Friar Lawrence has given her. She says: My dismal scene I needs must act alone.', show: ['title', 'q'] },
        { say: 'She speaks to no one, yet the audience hears every fear. A play has no narrator, so playwrights use dramatic devices to show what is going on inside a character. In this lesson, you will learn to recognize them and explain their effect.' },
      ],
    },
    {
      chapter: 'Who is listening?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of speech', 'Who hears it'],
          rows: [
            ['Dialogue', 'a conversation between characters'],
            ['Monologue', 'a long speech to other characters, who listen'],
            ['Soliloquy', 'a character alone, thinking aloud; only the audience hears'],
            ['Aside', 'a short remark the other characters on stage do not hear'],
          ],
        },
      ],
      lines: [
        { say: 'To tell the kinds of speech apart, ask who is on stage and who can hear the words.', show: 't.0' },
        { say: 'A monologue is a long speech to other characters, who listen. Mercutio’s speech about Queen Mab is one.', show: 't.1', focus: 't.1' },
        { say: 'A soliloquy is spoken by a character who is alone, so only the audience hears. Juliet’s speech with the vial is a soliloquy.', show: 't.2', focus: 't.2' },
        { say: 'An aside is a quick, secret remark. The other characters on stage do not hear it.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Foreshadowing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Foreshadowing', md: 'A **hint** of what will happen later in the play.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['O God! I have an ill-divining soul!', 'Methinks I see thee, now thou art so low,', 'As one dead in the bottom of a tomb.'] },
      ],
      lines: [
        { say: 'Foreshadowing is a hint of what will happen later, and Romeo and Juliet is full of it.', show: 'def' },
        { say: 'As Romeo leaves her at dawn, Juliet looks down at him and sees a terrible picture.', show: 'q' },
        { say: 'Methinks I see thee, now thou art so low, as one dead in the bottom of a tomb. The audience will soon watch exactly that.', focus: 'q' },
      ],
    },
    {
      chapter: 'Dramatic irony',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dramatic irony', md: 'The **audience** knows something important that a character on stage does not.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Death lies on her like an untimely frost', 'Upon the sweetest flower of all the field.'], by: 'Capulet, Act 4, Scene 5' },
        { kind: 'text', id: 'ans', size: 'md', md: 'We know she is **only asleep**, from the Friar’s potion.' },
      ],
      lines: [
        { say: 'Dramatic irony happens when the audience knows something important that a character on stage does not.', show: 'def' },
        { say: 'On her wedding morning, Juliet’s family find her cold on her bed. Capulet grieves: Death lies on her like an untimely frost upon the sweetest flower of all the field.', show: 'q' },
        { say: 'But we know she is only asleep, because of the Friar’s potion. Their grief is painful to watch, and we wait anxiously to see whether the Friar’s plan will work.', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Three kinds of irony', md: '**Dramatic:** the audience knows more than a character.\n\n**Verbal:** saying the opposite of what you mean.\n\n**Situational:** an outcome opposite to what was expected.' },
      ],
      lines: [
        { say: 'Students often mix up the kinds of irony. Dramatic irony is about what the audience knows that a character does not.', show: 'mis' },
        { say: 'Verbal irony is saying the opposite of what you mean. Situational irony is an outcome that is the opposite of what was expected.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a play, a father weeps over his daughter’s body, but the audience knows she is only asleep. What is the effect called?',
          choices: [
            'Dramatic irony: the audience knows what he does not',
            'Verbal irony: he says the opposite of what he means',
            'Situational irony: an outcome opposite to expectation',
            'Foreshadowing: a hint of something that comes later',
          ],
          answer: 0,
          working: 'The audience knows something important that the character does not. That is dramatic irony.',
        },
      ],
      lines: [
        { say: 'Your turn. A father weeps over his daughter’s body, but the audience knows she is only asleep. What is the effect called? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, dramatic irony. The audience knows something important that the character does not.', show: 'q.answer' },
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
            'A **soliloquy** is spoken alone; an **aside** is a quick remark others do not hear.',
            '**Foreshadowing** hints at what is to come.',
            '**Dramatic irony** is a gap between what the audience knows and what a character believes.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A soliloquy is spoken alone, and an aside is a quick remark the other characters do not hear.', show: 'sum.0' },
        { say: 'Foreshadowing hints at what is to come.', show: 'sum.1' },
        { say: 'And dramatic irony is a gap between what the audience knows and what a character believes. It creates tension, suspense and pity.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
