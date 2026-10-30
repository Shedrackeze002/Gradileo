import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-3-3',
  lessonId: 'e12-3-3',
  title: 'Hamlet: Dramatic Devices and Irony',
  thumbnailTitle: 'Hamlet: Devices',
  thumbnail: false,
  summary:
    'A soliloquy is spoken alone, an aside is heard only by the audience, a monologue is addressed to others. Learn the devices of Hamlet and what each does, and tell dramatic, verbal and situational irony apart.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Hamlet', title: 'Dramatic Devices and Irony', subtitle: 'What is said, who hears it, and what it does' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The play’s the thing', 'Wherein I’ll catch the conscience of the King.'],
          by: 'Hamlet, Act 2, Scene 2',
        },
      ],
      lines: [
        { say: 'Hamlet has promised the Ghost revenge, yet the King is still alive. Then a company of actors arrives, and Hamlet sees a way to find the truth.', show: ['title', 'q.0', 'q.1'] },
        { say: 'Shakespeare fills the delay with drama. In this lesson, you will recognize the play’s dramatic devices, explain what they do, and explain its ironies.' },
      ],
    },
    {
      chapter: 'Kinds of speech',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Soliloquy**: one character, alone on stage',
            '**Aside**: heard by the audience, not the other characters',
            '**Monologue**: a long speech to others on stage',
            '**Dialogue**: a conversation, in turns',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['O ’tis too true!', 'How smart a lash that speech doth give my conscience!'], by: 'Claudius, Act 3, Scene 1' },
      ],
      lines: [
        { say: 'Ask who hears the words. A soliloquy is spoken alone. An aside is a short remark that only the audience hears. A monologue is a long speech to other characters, and dialogue is a conversation.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'An aside can change everything we know. Polonius has just said that people hide wickedness behind a show of devotion, and Claudius, unheard by anyone on stage, answers.', show: ['q.0', 'q.1'] },
        { say: 'This is the first time we hear Claudius admit his guilt. Now the audience knows that the Ghost spoke the truth, while Hamlet is still waiting for his proof.', focus: ['q.0', 'q.1'] },
      ],
    },
    {
      chapter: 'The devices of Hamlet',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Play within a play**: the actors test Claudius',
            '**Feigned madness**: a mask that hides his purpose',
            '**Foil**: Laertes and Fortinbras act at once',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['That I essentially am not in madness,', 'But mad in craft.'], by: 'Hamlet, Act 3, Scene 4' },
      ],
      lines: [
        { say: 'The play is full of devices. The play within the play gives Hamlet his proof.', show: 'b.0' },
        { say: 'His feigned madness may be a mask that gives him time. When he tells his mother he is mad only in craft, we must decide whether to believe him.', show: ['b.1', 'q.0', 'q.1'] },
        { say: 'And his foils, Laertes and Fortinbras, act at once to avenge their fathers, so every time they act, Hamlet is measured against them. Naming a device is only the first step. Always ask what it does.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Irony',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Dramatic**: the audience knows more than a character',
            '**Verbal**: the speaker means something else',
            '**Situational**: the result is the opposite of the plan',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['My words fly up, my thoughts remain below.', 'Words without thoughts never to heaven go.'], by: 'Claudius, Act 3, Scene 3' },
      ],
      lines: [
        { say: 'Dramatic irony is when the audience knows something important that a character does not. Verbal irony is when a speaker says something different from what is meant. Situational irony is when what happens is the opposite of what was intended.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'The prayer scene is built on irony. Hamlet spares Claudius because a man killed at prayer might go to heaven. But we have just heard that Claudius cannot pray.', show: ['q.0', 'q.1'], focus: ['q.0', 'q.1'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A long speech is not always a soliloquy', md: 'A soliloquy is spoken **alone**. Ask who is on stage and who is meant to hear.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A speech is not a soliloquy just because it is long.', show: 'm' },
        { say: 'When Gertrude describes Ophelia’s drowning, she speaks at length, but to Claudius and Laertes, so it is a monologue.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Claudius says “O ’tis too true!” and nobody on stage hears him. What is this speech?',
          choices: [
            'An aside, because only the audience hears it.',
            'A soliloquy, because it shows his private thoughts.',
            'A monologue, because it is a long speech to others.',
            'Dialogue, because he answers what Polonius said.',
          ],
          answer: 0,
          working: 'Claudius is not alone on stage, so it is not a soliloquy. A short remark that only the audience hears is an aside.',
        },
      ],
      lines: [
        { say: 'Your turn. Claudius says, O ’tis too true, and nobody on stage hears him. What kind of speech is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. Claudius is not alone on stage, so it is not a soliloquy. A short remark that only the audience hears is an aside.', show: 'q2.answer' },
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
            'Soliloquy, aside, monologue and dialogue differ by who hears.',
            'Name each device, then ask what it does.',
            'Dramatic, verbal and situational irony.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A soliloquy is spoken alone, an aside is heard only by the audience, a monologue is a long speech to others, and dialogue is a conversation.', show: 'sum.0' },
        { say: 'Hamlet’s devices include the play within the play, feigned madness and foils. Always ask what a device does as well as what it is.', show: 'sum.1' },
        { say: 'And irony comes in three kinds: dramatic, verbal and situational.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
