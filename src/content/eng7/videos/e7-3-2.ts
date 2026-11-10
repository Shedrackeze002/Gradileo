import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-3-2',
  lessonId: 'e7-3-2',
  title: 'Dialogue, Asides and Monologues',
  summary:
    'Dialogue in a play reveals character and moves the action, and subtext is what characters mean but do not say. An aside is a quick word to the audience, a monologue is a long speech to others, and a soliloquy is a character alone, thinking aloud.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Drama', title: 'Dialogue, Asides and Monologues', subtitle: 'How a play shows what characters think' }],
      lines: [
        { say: 'In a story, a narrator can tell us what a character is thinking. In a play there is usually no narrator.', show: 'title' },
        { say: 'So playwrights use other tools: what characters say to each other, and special speeches in which they speak to the audience or to themselves. In this video we meet all of them.' },
      ],
    },
    {
      chapter: 'What dialogue does',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dialogue in a play', md: 'Dialogue does two jobs at once: it **reveals character** and it **moves the action**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Line', 'What it reveals', 'How it moves the action'],
          rows: [
            ['*Grandma said never to open the trunk.*', 'Mira knows the rule', 'sets up a rule about to be broken'],
            ['*Then why are we here?*', 'Jonah is unsure, maybe scared', 'raises the question of what they will do'],
            ['*Because she never said why.*', 'curiosity beats obedience', 'she is about to open the trunk'],
          ],
        },
      ],
      lines: [
        { say: 'Dialogue in a play does two jobs at once. It reveals character, because how people speak shows who they are. And it moves the action, because what they say sets up the next event.', show: 'def' },
        { say: 'Grandma said never to open the trunk shows that Mira knows the rule, and sets up a conflict: a rule about to be broken.', show: 't', focus: 't.0' },
        { say: 'Then why are we here? shows that Jonah is unsure, maybe scared, and raises the question of what they will do.', focus: 't.1' },
        { say: 'And because she never said why shows that Mira’s curiosity beats her obedience. She is about to open the trunk.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Subtext',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subtext', md: '**Subtext** is the real meaning under the words: what characters mean but **do not say**.' },
        { kind: 'text', id: 'a', size: 'md', md: 'Two characters chat about the **weather**, while one keeps glancing at a **letter** on the table.' },
      ],
      lines: [
        { say: 'Sometimes what matters most is not said at all. The real meaning under the words is called subtext.', show: 'def' },
        { say: 'Imagine two characters chatting about the weather, while one keeps glancing at a letter on the table.', show: 'a' },
        { say: 'Their words are about rain, but the real subject, unspoken, is the letter. That is subtext, and stage directions often show it.', focus: 'a' },
      ],
    },
    {
      chapter: 'Three special speeches',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Speech', 'What it is'],
          rows: [
            ['**Aside**', 'a short remark to the audience that the other characters do not hear'],
            ['**Monologue**', 'a long speech by one character **to other characters**'],
            ['**Soliloquy**', 'a speech by a character **alone**, thinking aloud'],
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['KING: Welcome, my loyal friend!', 'DUKE: (aside) Loyal? If only he knew what I have planned.'] },
      ],
      lines: [
        { say: 'Plays also use three special speeches. An aside is a short remark to the audience that the other characters on stage are taken not to hear.', show: 't', focus: 't.0' },
        { say: 'A monologue is a long speech by one character to other characters. A soliloquy is a speech a character makes alone, or believing they are alone, thinking aloud.', caption: 'A monologue is a long speech by one character to other characters. A soliloquy is a speech a character makes alone, or believing they are alone, thinking aloud.', focus: ['t.1', 't.2'] },
        { say: 'Here the King welcomes his loyal friend. But the Duke’s aside lets the audience in on his secret.', show: ['q.0', 'q.1'], focus: 'q.1' },
        { say: 'Now we know something the King does not. When the audience knows more than a character, it is called dramatic irony, and it makes us watch every scene with tension.', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Monologue or soliloquy?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['(The coach stands before the whole team.)', 'COACH: Listen, all of you. Last season we lost every game. Every single one. But this season, I promise you, things will be different…'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Monologue is not the same as soliloquy', md: 'A **monologue** is spoken *to others*; a **soliloquy** is spoken *alone*. Every soliloquy is a kind of monologue, but not every monologue is a soliloquy.' },
      ],
      lines: [
        { say: 'Is this a monologue or a soliloquy? One character gives a long speech.', show: ['q.0', 'q.1'] },
        { say: 'But the coach is talking to the whole team, not alone. So it is a monologue. If the coach were alone, thinking aloud, it would be a soliloquy.', focus: 'q.0' },
        { say: 'Both are long speeches by one character. The difference is who is listening.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Alone on stage at night, Lena paces and says, “Should I tell them the truth tomorrow? If I do, they may never trust me again.” What kind of speech is this?',
          choices: ['An aside', 'Dialogue', 'A soliloquy', 'A stage direction'],
          answer: 2,
          working: 'Lena is alone on stage, thinking aloud about a hard choice, so this is a soliloquy.',
        },
      ],
      lines: [
        { say: 'Your turn. Alone on stage at night, Lena paces and wonders aloud whether to tell the truth. What kind of speech is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, a soliloquy. Lena is alone on stage, thinking aloud about a hard choice.', show: 'q2.answer' },
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
            'Dialogue reveals character and moves the action.',
            '**Subtext** is what characters mean but do not say.',
            '**Aside**: to the audience. **Monologue**: to others. **Soliloquy**: alone.',
            '**Dramatic irony**: the audience knows something a character does not.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dialogue in a play reveals character and moves the action.', show: 'sum.0' },
        { say: 'Subtext is what characters mean but do not say.', show: 'sum.1' },
        { say: 'An aside is a quick word to the audience, a monologue is a long speech to others, and a soliloquy is a character alone, thinking aloud.', show: 'sum.2' },
        { say: 'And dramatic irony is when the audience knows something a character does not.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
