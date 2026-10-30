import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-3-4',
  lessonId: 'e12-3-4',
  title: 'Hamlet: Themes and Interpretations',
  thumbnailTitle: 'Hamlet: Themes',
  thumbnail: false,
  summary:
    'Hamlet is a revenge tragedy that questions revenge. Learn to state a theme as a general, supported sentence, to avoid mistaking a character’s opinion for the play’s message, and to weigh readings by evidence that supports or complicates them.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Hamlet', title: 'Themes and Interpretations', subtitle: 'What the play suggests, and how to argue it' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['But I do prophesy th’election lights', 'On Fortinbras. He has my dying voice.', 'So tell him, with the occurrents more and less,', 'Which have solicited. The rest is silence.'],
          by: 'Hamlet, Act 5, Scene 2',
        },
      ],
      lines: [
        { say: 'The fencing match is over. The Queen, Laertes and the King are dead, and Hamlet, wounded by the poisoned sword, has only moments left.', show: ['title', 'q.0', 'q.1'] },
        { say: 'He names Fortinbras as the next king, and then he falls silent.', show: ['q.2', 'q.3'] },
        { say: 'What does his story mean? In this lesson, you will state and support the themes of Hamlet, and weigh the different ways readers have interpreted it.' },
      ],
    },
    {
      chapter: 'Revenge tragedy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Revenge tragedy', md: 'A play in which a person sets out to avenge a terrible wrong, often at a ghost’s urging, and the bloodshed destroys the avenger as well as the guilty.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Something is rotten in the state of Denmark.'], by: 'Marcellus, Act 1, Scene 4' },
      ],
      lines: [
        { say: 'Hamlet is a revenge tragedy: a murder, a ghost, a delay, a madness and a stage full of bodies. But its hero questions revenge at every turn. The play keeps the shape, while asking what revenge is worth.', show: 'def' },
        { say: 'Its big ideas include thought and action, appearance and reality, death, and corruption. Marcellus puts the last one in a single line.', show: 'q' },
      ],
    },
    {
      chapter: 'Stating a theme',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme statement', md: 'A complete sentence about life or people in general: no character names, supported by the play, with no orders and no absolutes.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Topic**: death', '**Theme**: Corruption at the top of a state spreads to everyone around it.'],
        },
      ],
      lines: [
        { say: 'A theme statement is a complete sentence that says what the play suggests about life or people in general. A strong one is general, supported by the play, and free of orders and absolutes.', show: 'def' },
        { say: 'A topic, such as death, is not a theme. A theme says something about it, and so does not name any character.', show: ['b.0', 'b.1'] },
      ],
    },
    {
      chapter: 'Weighing interpretations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interpretation', md: 'An argument about what a play means. Evidence **supports** a reading or **complicates** it.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['That I essentially am not in madness,', 'But mad in craft.'], by: 'Hamlet, Act 3, Scene 4' },
      ],
      lines: [
        { say: 'An interpretation is an argument about what a play means. Evidence supports a reading when it makes it more likely, and complicates it when it gives a reason to doubt it, without simply disproving it.', show: 'def' },
        { say: 'Take the question of whether Hamlet’s madness is only an act. He tells his mother that he is mad in craft, which supports the reading.', show: ['q.0', 'q.1'] },
        { say: 'But he also leaps into Ophelia’s grave and grapples with Laertes. The aim is not to settle the question, but to state a view and deal honestly with the evidence against it.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Frailty, thy name is woman!'], by: 'Hamlet, Act 1, Scene 2' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A character’s opinion is not the play’s theme', md: 'Ask who says it, when, and whether the rest of the play agrees.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A character’s opinion is not the play’s theme.', show: 'q' },
        { say: 'Hamlet cries this in grief and disgust at his mother’s marriage. That is his view at one moment, not a message that the whole play endorses. Ask who says it, when, and whether the rest of the play agrees.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the best theme statement for Hamlet?',
          choices: [
            'Hamlet puts off his revenge until the last act.',
            'Death and revenge are the main topics of the play.',
            'Corruption at the top of a state spreads to those around it.',
            'Never trust a ghost, and never take revenge on anyone.',
          ],
          answer: 2,
          working: 'A theme is a general sentence supported by the play. A is plot, B is a list of topics, and D gives orders with an absolute.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of the four choices is the best theme statement for Hamlet? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. A theme is a general sentence supported by the play. A is plot, B is a list of topics, and D gives orders with an absolute.', show: 'q2.answer' },
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
            'Hamlet is a revenge tragedy that questions revenge.',
            'State a theme as a general, supported sentence.',
            'Weigh a reading by evidence that supports or complicates it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hamlet is a revenge tragedy that questions revenge: its hero doubts the Ghost, the act, and himself.', show: 'sum.0' },
        { say: 'State a theme as a complete, general sentence, and support it with the quotation that proves it most directly.', show: 'sum.1' },
        { say: 'And weigh a reading by the evidence that supports it and the evidence that complicates it.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
