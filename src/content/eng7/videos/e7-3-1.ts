import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-3-1',
  lessonId: 'e7-3-1',
  title: 'Reading a Script',
  summary:
    'A script is the written text of a play, written by a playwright. It has a cast list, acts and scenes, dialogue and stage directions, and the stage directions set the scene, show actions and sounds, and show how lines are spoken.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Drama', title: 'Reading a Script', subtitle: 'A play on the page' }],
      lines: [
        { say: 'A play is written to be performed, not just read.', show: 'title' },
        { say: 'Its text is a set of instructions for actors, directors and designers, and it looks quite different from a story on the page. In this video we learn how to read one.' },
      ],
    },
    {
      chapter: 'The parts of a script',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Script', md: 'A **script** is the written text of a play. It is written by a **playwright** (*-wright* means maker, as in *shipwright*).' },
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'What it is'],
          rows: [
            ['**Cast list**', 'the characters, often with a short description of each'],
            ['**Acts and scenes**', 'large and small divisions; a new scene often means a new place or time'],
            ['**Dialogue**', 'the words spoken, each line after the speaker’s name'],
            ['**Stage directions**', 'setting, actions, sounds and how lines are spoken, in brackets or italics'],
          ],
        },
      ],
      lines: [
        { say: 'A script is the written text of a play. It is written by a playwright. The ending wright means maker, as in shipwright, so a playwright is a maker of plays.', show: 'def' },
        { say: 'A script starts with a cast list, the characters in the play, often with a short description of each.', show: 't', focus: 't.0' },
        { say: 'It is divided into acts, the large parts, and scenes, the smaller parts inside them. A new scene usually means a new place or time.', focus: 't.1' },
        { say: 'Dialogue is the words the characters speak, each line after the speaker’s name. And stage directions give the setting, actions, sounds, and how lines are spoken.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'A scene on the page',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: [
            'Scene 2. An attic, dusty and dim. A single window. A large trunk stands in the corner.',
            '(Mira enters, holding a torch. Jonah follows, close behind.)',
            'MIRA: (whispering) Grandma said never to open the trunk.',
            'JONAH: Then why are we here?',
            'MIRA: (kneeling by the trunk) Because she never said why.',
            '(A floorboard creaks downstairs. They both freeze.)',
          ],
        },
        { kind: 'text', id: 'a', size: 'md', md: 'No quotation marks, no “she said”, and **no narrator**.' },
      ],
      lines: [
        { say: 'Here is the start of a scene written for this unit. It opens with the setting: an attic, dusty and dim, with a large trunk in the corner.', show: ['q.0', 'q.1'] },
        { say: 'Then the dialogue begins. Each line comes after the speaker’s name, with stage directions in brackets.', show: ['q.2', 'q.3', 'q.4', 'q.5'] },
        { say: 'Notice what is missing. There are no quotation marks, no she said, and no narrator telling us what Mira is thinking. Everything we learn comes from the dialogue and the stage directions.', show: 'a' },
      ],
    },
    {
      chapter: 'What stage directions do',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Job', 'Example', 'What it tells us'],
          rows: [
            ['**Set the scene**', '*An attic, dusty and dim*', 'what to build, and the mood'],
            ['**Show actions**', '*Jonah follows, close behind*', 'he is nervous about being left alone'],
            ['**Show how to speak**', '*(whispering)*', 'Mira is afraid of being heard'],
            ['**Add sounds and effects**', '*A floorboard creaks downstairs*', 'it builds suspense'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Do not skip the brackets', md: 'A reader cannot see the stage. The stage directions supply the actions, sounds and tones of voice that **complete the meaning**.' },
      ],
      lines: [
        { say: 'Stage directions do several jobs at once. They set the scene. An attic, dusty and dim, tells the designer what to build, and gives the reader the setting and the mood.', show: 't', focus: 't.0' },
        { say: 'They show actions. Jonah follows close behind, which shows that he is nervous about being left alone.', focus: 't.1' },
        { say: 'They show how to speak. Whispering tells the actor how to say the line, and tells us that Mira is afraid of being heard. And they add sounds, like a floorboard creaking downstairs, which builds suspense.', focus: ['t.2', 't.3'] },
        { say: 'So do not skip the brackets. A reader cannot see the stage, and the stage directions complete the meaning.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Mira says “Because she never said why” while kneeling by the trunk. What does the stage direction show?',
          choices: ['Mira is tired and needs to rest.', 'Mira is going to open the trunk.', 'Mira has dropped her torch.', 'Mira wants to leave the attic.'],
          answer: 1,
          working: 'Kneeling by the trunk as she speaks shows that she means to look inside: the direction shows her decision in action.',
        },
      ],
      lines: [
        { say: 'Your turn. Mira says, because she never said why, while kneeling by the trunk. What does the stage direction show? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Kneeling by the trunk as she speaks shows that she means to look inside. The direction shows her decision in action.', show: 'q2.answer' },
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
            'A **script** is the text of a play, written by a **playwright**.',
            'It has a cast list, acts and scenes, dialogue and stage directions.',
            'Each line follows the speaker’s name, with no quotation marks.',
            'Stage directions set the scene, show actions and sounds, and show how to speak.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A script is the written text of a play, written by a playwright.', show: 'sum.0' },
        { say: 'It has a cast list, acts and scenes, dialogue, and stage directions.', show: 'sum.1' },
        { say: 'Each line of dialogue follows the speaker’s name, and there are no quotation marks.', show: 'sum.2' },
        { say: 'And stage directions set the scene, show actions and sounds, and show how lines are spoken.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
